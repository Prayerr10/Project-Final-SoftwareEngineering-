import { afterEach, describe, expect, it, vi } from "vitest";
import worker from "../../worker";

type StoredRequest = {
	id: string;
	request_number: string;
	title: string;
	description: string;
	location: string;
	category: string;
	priority: string;
	priority_suggestion: string | null;
	status: string;
	reporter_name: string;
	reporter_type: string;
	reviewed_at: string | null;
	reviewed_by_role: string | null;
	created_at: string;
	updated_at: string;
};

type StoredTechnician = {
	id: string;
	name: string;
	specialization: string | null;
	is_active: number;
	created_at: string;
	updated_at: string;
};

type StoredAssignment = {
	id: string;
	request_id: string;
	technician_id: string;
	assigned_by_role: string;
	assigned_at: string;
	is_current: number;
};

type StoredStatusHistory = {
	id: string;
	request_id: string;
	from_status: string | null;
	to_status: string;
	changed_by_role: string;
	note: string;
	created_at: string;
};

class FakeAdminD1Database {
	requests: StoredRequest[];
	technicians: StoredTechnician[];
	assignments: StoredAssignment[] = [];
	statusHistory: StoredStatusHistory[] = [];

	constructor(requests: StoredRequest[], technicians: StoredTechnician[] = []) {
		this.requests = requests;
		this.technicians = technicians;
	}

	prepare(sql: string) {
		const database = this;

		return {
			bind(...values: unknown[]) {
				return {
					async first() {
						if (sql.includes("FROM service_requests")) {
							const [requestId] = values as string[];
							return (
								database.requests.find((request) => request.id === requestId) ??
								null
							);
						}

						if (sql.includes("FROM technicians")) {
							const [technicianId] = values as string[];
							return (
								database.technicians.find(
									(technician) =>
										technician.id === technicianId &&
										technician.is_active === 1,
								) ?? null
							);
						}

						return null;
					},
					async run() {
						if (sql.includes("UPDATE service_requests") && sql.includes("reviewed_at")) {
							const [reviewedAt, updatedAt, requestId] = values as string[];
							const storedRequest = database.requests.find(
								(request) => request.id === requestId,
							);

							if (storedRequest) {
								storedRequest.status = "UNDER_REVIEW";
								storedRequest.reviewed_at = reviewedAt;
								storedRequest.reviewed_by_role = "ADMINISTRATOR";
								storedRequest.updated_at = updatedAt;
							}
						}

						if (sql.includes("UPDATE service_requests") && sql.includes("category =")) {
							const [category, priority, updatedAt, requestId] =
								values as string[];
							const storedRequest = database.requests.find(
								(request) => request.id === requestId,
							);

							if (storedRequest) {
								storedRequest.category = category;
								storedRequest.priority = priority;
								storedRequest.updated_at = updatedAt;
							}
						}

						if (sql.includes("UPDATE request_assignments")) {
							const [requestId] = values as string[];
							for (const assignment of database.assignments) {
								if (assignment.request_id === requestId) {
									assignment.is_current = 0;
								}
							}
						}

						if (sql.includes("INSERT INTO request_assignments")) {
							const [id, requestId, technicianId, assignedAt] =
								values as string[];
							database.assignments.push({
								id,
								request_id: requestId,
								technician_id: technicianId,
								assigned_by_role: "ADMINISTRATOR",
								assigned_at: assignedAt,
								is_current: 1,
							});
						}

						if (sql.includes("UPDATE service_requests") && sql.includes("status = 'ASSIGNED'")) {
							const [updatedAt, requestId] = values as string[];
							const storedRequest = database.requests.find(
								(request) => request.id === requestId,
							);

							if (storedRequest) {
								storedRequest.status = "ASSIGNED";
								storedRequest.updated_at = updatedAt;
							}
						}

						if (sql.includes("INSERT INTO request_status_history")) {
							const [
								id,
								requestId,
								fromStatus,
								toStatus,
								changedByRole,
								note,
								createdAt,
							] = values as string[];

							database.statusHistory.push({
								id,
								request_id: requestId,
								from_status: fromStatus,
								to_status: toStatus,
								changed_by_role: changedByRole,
								note,
								created_at: createdAt,
							});
						}

						return { success: true };
					},
				};
			},
		};
	}
}

afterEach(() => {
	vi.restoreAllMocks();
});

function submittedRequest(overrides: Partial<StoredRequest> = {}): StoredRequest {
	return {
		id: "request-1",
		request_number: "CSR-001",
		title: "Proyektor ruang 302 rusak",
		description: "Proyektor tidak menyala saat kelas berlangsung.",
		location: "Gedung A, Ruang 302",
		category: "Peralatan Kelas",
		priority: "MEDIUM",
		priority_suggestion: "HIGH",
		status: "SUBMITTED",
		reporter_name: "Dr. Mira Santoso",
		reporter_type: "LECTURER",
		reviewed_at: null,
		reviewed_by_role: null,
		created_at: "2026-07-01T02:00:00.000Z",
		updated_at: "2026-07-01T02:00:00.000Z",
		...overrides,
	};
}

describe("Administrator review, classify, and assign workflow", () => {
	it("moves a submitted request under review and appends status history only for Administrator", async () => {
		vi.spyOn(crypto, "randomUUID").mockReturnValueOnce("history-review");
		const database = new FakeAdminD1Database([submittedRequest()]);

		const response = await worker.fetch(
			new Request("http://localhost/api/requests/request-1/review", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					role: "ADMINISTRATOR",
					note: "Administrator mulai meninjau laporan.",
				}),
			}),
			{ DB: database } as unknown as Env,
		);

		await expect(response.json()).resolves.toMatchObject({
			data: {
				id: "request-1",
				status: "UNDER_REVIEW",
				reviewedByRole: "ADMINISTRATOR",
			},
		});
		expect(response.status).toBe(200);
		expect(database.statusHistory).toMatchObject([
			{
				id: "history-review",
				request_id: "request-1",
				from_status: "SUBMITTED",
				to_status: "UNDER_REVIEW",
				changed_by_role: "ADMINISTRATOR",
				note: "Administrator mulai meninjau laporan.",
			},
		]);

		const forbiddenResponse = await worker.fetch(
			new Request("http://localhost/api/requests/request-1/review", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					role: "REPORTER",
					note: "Saya coba review.",
				}),
			}),
			{ DB: new FakeAdminD1Database([submittedRequest()]) } as unknown as Env,
		);

		await expect(forbiddenResponse.json()).resolves.toMatchObject({
			error: { code: "FORBIDDEN" },
		});
		expect(forbiddenResponse.status).toBe(403);
	});

	it("stores Administrator category and priority without replacing Lecturer suggestion", async () => {
		const database = new FakeAdminD1Database([
			submittedRequest({ status: "UNDER_REVIEW" }),
		]);

		const response = await worker.fetch(
			new Request("http://localhost/api/requests/request-1/classification", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					role: "ADMINISTRATOR",
					category: "AC",
					priority: "URGENT",
				}),
			}),
			{ DB: database } as unknown as Env,
		);

		await expect(response.json()).resolves.toMatchObject({
			data: {
				category: "AC",
				priority: "URGENT",
				prioritySuggestion: "HIGH",
				status: "UNDER_REVIEW",
			},
		});
		expect(response.status).toBe(200);
		expect(database.requests[0]).toMatchObject({
			category: "AC",
			priority: "URGENT",
			priority_suggestion: "HIGH",
		});
	});

	it("assigns an active technician after review and records ASSIGNED history", async () => {
		vi.spyOn(crypto, "randomUUID")
			.mockReturnValueOnce("assignment-1")
			.mockReturnValueOnce("history-assigned");
		const database = new FakeAdminD1Database(
			[submittedRequest({ status: "UNDER_REVIEW", priority: "HIGH" })],
			[
				{
					id: "tech-1",
					name: "Nadia Teknisi",
					specialization: "Audio visual",
					is_active: 1,
					created_at: "2026-07-01T00:00:00.000Z",
					updated_at: "2026-07-01T00:00:00.000Z",
				},
			],
		);

		const response = await worker.fetch(
			new Request("http://localhost/api/requests/request-1/assignment", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					role: "ADMINISTRATOR",
					technicianId: "tech-1",
					note: "Ditugaskan ke teknisi audio visual.",
				}),
			}),
			{ DB: database } as unknown as Env,
		);

		await expect(response.json()).resolves.toMatchObject({
			data: {
				id: "request-1",
				status: "ASSIGNED",
				assignment: {
					id: "assignment-1",
					technicianId: "tech-1",
					technicianName: "Nadia Teknisi",
				},
			},
		});
		expect(response.status).toBe(200);
		expect(database.assignments).toMatchObject([
			{
				id: "assignment-1",
				request_id: "request-1",
				technician_id: "tech-1",
				assigned_by_role: "ADMINISTRATOR",
				is_current: 1,
			},
		]);
		expect(database.statusHistory).toMatchObject([
			{
				id: "history-assigned",
				from_status: "UNDER_REVIEW",
				to_status: "ASSIGNED",
				changed_by_role: "ADMINISTRATOR",
				note: "Ditugaskan ke teknisi audio visual.",
			},
		]);
	});

	it("rejects invalid classification values and assignment before review", async () => {
		const invalidClassificationResponse = await worker.fetch(
			new Request("http://localhost/api/requests/request-1/classification", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					role: "ADMINISTRATOR",
					category: "Invented Category",
					priority: "CRITICAL",
				}),
			}),
			{
				DB: new FakeAdminD1Database([
					submittedRequest({ status: "UNDER_REVIEW" }),
				]),
			} as unknown as Env,
		);

		await expect(invalidClassificationResponse.json()).resolves.toMatchObject({
			error: {
				code: "VALIDATION_ERROR",
				fields: {
					category: "Kategori harus memakai daftar tetap yang tersedia.",
					priority: "Prioritas harus LOW, MEDIUM, HIGH, atau URGENT.",
				},
			},
		});
		expect(invalidClassificationResponse.status).toBe(422);

		const assignmentBeforeReviewResponse = await worker.fetch(
			new Request("http://localhost/api/requests/request-1/assignment", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					role: "ADMINISTRATOR",
					technicianId: "tech-1",
					note: "Coba tugaskan sebelum review.",
				}),
			}),
			{
				DB: new FakeAdminD1Database(
					[submittedRequest()],
					[
						{
							id: "tech-1",
							name: "Nadia Teknisi",
							specialization: "Audio visual",
							is_active: 1,
							created_at: "2026-07-01T00:00:00.000Z",
							updated_at: "2026-07-01T00:00:00.000Z",
						},
					],
				),
			} as unknown as Env,
		);

		await expect(assignmentBeforeReviewResponse.json()).resolves.toMatchObject({
			error: {
				code: "INVALID_STATUS_TRANSITION",
				currentStatus: "SUBMITTED",
				allowedStatuses: ["ASSIGNED"],
			},
		});
		expect(assignmentBeforeReviewResponse.status).toBe(409);
	});
});
