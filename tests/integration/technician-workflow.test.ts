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
	accepted_at: string | null;
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

class FakeTechnicianD1Database {
	requests: StoredRequest[];
	technicians: StoredTechnician[];
	assignments: StoredAssignment[];
	statusHistory: StoredStatusHistory[] = [];

	constructor(
		requests: StoredRequest[],
		technicians: StoredTechnician[],
		assignments: StoredAssignment[],
	) {
		this.requests = requests;
		this.technicians = technicians;
		this.assignments = assignments;
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

						if (sql.includes("FROM request_assignments")) {
							const [requestId, technicianId] = values as string[];
							return (
								database.assignments.find(
									(assignment) =>
										assignment.request_id === requestId &&
										assignment.technician_id === technicianId &&
										assignment.is_current === 1,
								) ?? null
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
					async all() {
						if (sql.includes("FROM request_assignments")) {
							const [technicianId, status] = values as (string | null)[];
							const rows = database.assignments
								.filter(
									(assignment) =>
										assignment.technician_id === technicianId &&
										assignment.is_current === 1,
								)
								.map((assignment) => {
									const request = database.requests.find(
										(item) => item.id === assignment.request_id,
									);
									const technician = database.technicians.find(
										(item) => item.id === assignment.technician_id,
									);

									if (!request || !technician) {
										return null;
									}

									return {
										...request,
										assignment_id: assignment.id,
										technician_id: technician.id,
										technician_name: technician.name,
										assigned_at: assignment.assigned_at,
										accepted_at: assignment.accepted_at,
									};
								})
								.filter((row) => row && (!status || row.status === status));

							return { results: rows };
						}

						return { results: [] };
					},
					async run() {
						if (sql.includes("UPDATE request_assignments")) {
							const [acceptedAt, requestId, technicianId] = values as string[];
							const assignment = database.assignments.find(
								(item) =>
									item.request_id === requestId &&
									item.technician_id === technicianId &&
									item.is_current === 1,
							);

							if (assignment) {
								assignment.accepted_at = acceptedAt;
							}
						}

						if (
							sql.includes("UPDATE service_requests") &&
							sql.includes("status = 'IN_PROGRESS'")
						) {
							const [updatedAt, requestId] = values as string[];
							const request = database.requests.find((item) => item.id === requestId);

							if (request) {
								request.status = "IN_PROGRESS";
								request.updated_at = updatedAt;
							}
						}

						if (
							sql.includes("UPDATE service_requests") &&
							sql.includes("status = 'RESOLVED'")
						) {
							const [updatedAt, requestId] = values as string[];
							const request = database.requests.find((item) => item.id === requestId);

							if (request) {
								request.status = "RESOLVED";
								request.updated_at = updatedAt;
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

function assignedRequest(overrides: Partial<StoredRequest> = {}): StoredRequest {
	return {
		id: "request-1",
		request_number: "CSR-001",
		title: "Proyektor ruang 302 rusak",
		description: "Proyektor tidak menyala saat kelas berlangsung.",
		location: "Gedung A, Ruang 302",
		category: "Peralatan Kelas",
		priority: "HIGH",
		priority_suggestion: "HIGH",
		status: "ASSIGNED",
		reporter_name: "Dr. Mira Santoso",
		reporter_type: "LECTURER",
		reviewed_at: "2026-07-01T02:10:00.000Z",
		reviewed_by_role: "ADMINISTRATOR",
		created_at: "2026-07-01T02:00:00.000Z",
		updated_at: "2026-07-01T02:20:00.000Z",
		...overrides,
	};
}

const technician: StoredTechnician = {
	id: "tech-1",
	name: "Nadia Teknisi",
	specialization: "Audio visual",
	is_active: 1,
	created_at: "2026-07-01T00:00:00.000Z",
	updated_at: "2026-07-01T00:00:00.000Z",
};

function currentAssignment(
	overrides: Partial<StoredAssignment> = {},
): StoredAssignment {
	return {
		id: "assignment-1",
		request_id: "request-1",
		technician_id: "tech-1",
		assigned_by_role: "ADMINISTRATOR",
		assigned_at: "2026-07-01T02:20:00.000Z",
		accepted_at: null,
		is_current: 1,
		...overrides,
	};
}

describe("Technician task lifecycle", () => {
	it("returns the assigned task list for the active technician only", async () => {
		const database = new FakeTechnicianD1Database(
			[
				assignedRequest(),
				assignedRequest({
					id: "request-2",
					request_number: "CSR-002",
					title: "Internet laboratorium lambat",
				}),
			],
			[technician],
			[
				currentAssignment(),
				currentAssignment({
					id: "assignment-2",
					request_id: "request-2",
					technician_id: "tech-other",
				}),
			],
		);

		const response = await worker.fetch(
			new Request(
				"http://localhost/api/technicians/tech-1/tasks?role=TECHNICIAN&technicianId=tech-1",
			),
			{ DB: database } as unknown as Env,
		);

		await expect(response.json()).resolves.toMatchObject({
			data: [
				{
					id: "request-1",
					status: "ASSIGNED",
					assignment: {
						id: "assignment-1",
						technicianId: "tech-1",
						technicianName: "Nadia Teknisi",
						acceptedAt: null,
					},
				},
			],
			meta: {
				total: 1,
				empty: false,
			},
		});
		expect(response.status).toBe(200);
	});

	it("records acceptedAt for an assigned technician without changing status or adding rejection behavior", async () => {
		const database = new FakeTechnicianD1Database(
			[assignedRequest()],
			[technician],
			[currentAssignment()],
		);

		const response = await worker.fetch(
			new Request("http://localhost/api/requests/request-1/accept", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					role: "TECHNICIAN",
					technicianId: "tech-1",
				}),
			}),
			{ DB: database } as unknown as Env,
		);

		await expect(response.json()).resolves.toMatchObject({
			data: {
				id: "assignment-1",
				technicianId: "tech-1",
				requestId: "request-1",
				acceptedAt: expect.any(String),
				requestStatus: "ASSIGNED",
			},
		});
		expect(response.status).toBe(200);
		expect(database.requests[0].status).toBe("ASSIGNED");
		expect(database.statusHistory).toHaveLength(0);
	});

	it("moves an assigned task to IN_PROGRESS and appends BR-08 status history", async () => {
		vi.spyOn(crypto, "randomUUID").mockReturnValueOnce("history-progress");
		const database = new FakeTechnicianD1Database(
			[assignedRequest()],
			[technician],
			[currentAssignment({ accepted_at: "2026-07-01T02:30:00.000Z" })],
		);

		const response = await worker.fetch(
			new Request("http://localhost/api/requests/request-1/progress", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					role: "TECHNICIAN",
					technicianId: "tech-1",
					note: "Mulai dikerjakan.",
				}),
			}),
			{ DB: database } as unknown as Env,
		);

		await expect(response.json()).resolves.toMatchObject({
			data: {
				id: "request-1",
				status: "IN_PROGRESS",
			},
		});
		expect(response.status).toBe(200);
		expect(database.statusHistory).toMatchObject([
			{
				id: "history-progress",
				request_id: "request-1",
				from_status: "ASSIGNED",
				to_status: "IN_PROGRESS",
				changed_by_role: "TECHNICIAN",
				note: "Mulai dikerjakan.",
			},
		]);
	});

	it("moves in-progress work to RESOLVED without adding a seventh status", async () => {
		vi.spyOn(crypto, "randomUUID").mockReturnValueOnce("history-resolved");
		const database = new FakeTechnicianD1Database(
			[assignedRequest({ status: "IN_PROGRESS" })],
			[technician],
			[currentAssignment({ accepted_at: "2026-07-01T02:30:00.000Z" })],
		);

		const response = await worker.fetch(
			new Request("http://localhost/api/requests/request-1/resolve", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					role: "TECHNICIAN",
					technicianId: "tech-1",
					note: "Pekerjaan selesai.",
				}),
			}),
			{ DB: database } as unknown as Env,
		);

		await expect(response.json()).resolves.toMatchObject({
			data: {
				id: "request-1",
				status: "RESOLVED",
			},
		});
		expect(response.status).toBe(200);
		expect(database.requests[0].status).toBe("RESOLVED");
		expect(database.statusHistory).toMatchObject([
			{
				id: "history-resolved",
				request_id: "request-1",
				from_status: "IN_PROGRESS",
				to_status: "RESOLVED",
				changed_by_role: "TECHNICIAN",
				note: "Pekerjaan selesai.",
			},
		]);
		expect(database.statusHistory[0].to_status).not.toBe("WAITING_CONFIRMATION");
	});

	it("rejects forbidden roles, wrong technician context, and invalid transitions", async () => {
		const reporterResponse = await worker.fetch(
			new Request("http://localhost/api/requests/request-1/progress", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					role: "REPORTER",
					technicianId: "tech-1",
					note: "Mulai.",
				}),
			}),
			{
				DB: new FakeTechnicianD1Database(
					[assignedRequest()],
					[technician],
					[currentAssignment()],
				),
			} as unknown as Env,
		);

		await expect(reporterResponse.json()).resolves.toMatchObject({
			error: { code: "FORBIDDEN" },
		});
		expect(reporterResponse.status).toBe(403);

		const wrongTechnicianResponse = await worker.fetch(
			new Request("http://localhost/api/requests/request-1/progress", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					role: "TECHNICIAN",
					technicianId: "tech-other",
					note: "Mulai.",
				}),
			}),
			{
				DB: new FakeTechnicianD1Database(
					[assignedRequest()],
					[technician],
					[currentAssignment()],
				),
			} as unknown as Env,
		);

		await expect(wrongTechnicianResponse.json()).resolves.toMatchObject({
			error: { code: "FORBIDDEN" },
		});
		expect(wrongTechnicianResponse.status).toBe(403);

		const invalidTransitionResponse = await worker.fetch(
			new Request("http://localhost/api/requests/request-1/resolve", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					role: "TECHNICIAN",
					technicianId: "tech-1",
					note: "Selesai.",
				}),
			}),
			{
				DB: new FakeTechnicianD1Database(
					[assignedRequest()],
					[technician],
					[currentAssignment()],
				),
			} as unknown as Env,
		);

		await expect(invalidTransitionResponse.json()).resolves.toMatchObject({
			error: {
				code: "INVALID_STATUS_TRANSITION",
				currentStatus: "ASSIGNED",
				allowedStatuses: ["RESOLVED"],
			},
		});
		expect(invalidTransitionResponse.status).toBe(409);
	});
});
