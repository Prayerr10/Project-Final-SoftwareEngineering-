import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchWithSession } from "../helpers/auth";

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
	closed_at: string | null;
	closed_by_role: string | null;
	manual_override_used: number;
	manual_override_note: string | null;
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

type StoredHistory = {
	id: string;
	request_id: string;
	from_status: string | null;
	to_status: string;
	changed_by_role: string;
	note: string;
	created_at: string;
};

type StoredComment = {
	id: string;
	request_id: string;
	author_role: string;
	body: string;
	visibility: "PUBLIC" | "INTERNAL";
	created_at: string;
};

type StoredConfirmation = {
	id: string;
	request_id: string;
	confirmed_by_role: string;
	confirmation_note: string | null;
	confirmed_at: string;
};

const createdAt = "2026-07-01T02:00:00.000Z";

class Skill13D1Database {
	requests: StoredRequest[] = [];
	technicians: StoredTechnician[] = [
		{
			id: "tech-1",
			name: "Nadia Teknisi",
			specialization: "Audio visual",
			is_active: 1,
			created_at: createdAt,
			updated_at: createdAt,
		},
		{
			id: "tech-2",
			name: "Bima Teknisi",
			specialization: "Jaringan",
			is_active: 1,
			created_at: createdAt,
			updated_at: createdAt,
		},
		{
			id: "tech-inactive",
			name: "Teknisi Nonaktif",
			specialization: "AC",
			is_active: 0,
			created_at: createdAt,
			updated_at: createdAt,
		},
	];
	assignments: StoredAssignment[] = [];
	history: StoredHistory[] = [];
	comments: StoredComment[] = [];
	internalNotes: StoredComment[] = [];
	confirmations: StoredConfirmation[] = [];

	constructor(requests: StoredRequest[] = []) {
		this.requests = requests;
	}

	prepare(sql: string) {
		const database = this;
		const statement = {
			bind(...values: unknown[]) {
				return boundStatement(database, sql, values);
			},
			async first() {
				if (sql.includes("SELECT 1 AS ready")) {
					return { ready: 1 };
				}

				if (sql.includes("COUNT(*) AS total")) {
					return { total: database.requests.length };
				}

				return null;
			},
			async all() {
				if (sql.includes("GROUP BY status")) {
					return { results: groupCounts(database.requests, "status") };
				}

				if (sql.includes("GROUP BY priority")) {
					return { results: groupCounts(database.requests, "priority") };
				}

				if (sql.includes("GROUP BY category")) {
					return { results: groupCounts(database.requests, "category") };
				}

				if (sql.includes("FROM technicians") && sql.includes("request_assignments")) {
					return { results: database.workloadRows() };
				}

				return { results: database.listRequests(null, null, null) };
			},
		};

		return statement;
	}

	listRequests(
		search: string | null,
		status: string | null,
		priority: string | null,
	) {
		const normalizedSearch = search?.toLowerCase() ?? "";

		return this.requests
			.filter((request) => {
				const matchesSearch =
					normalizedSearch.length === 0 ||
					[
						request.request_number,
						request.title,
						request.location,
						request.category,
						request.reporter_name,
					]
						.join(" ")
						.toLowerCase()
						.includes(normalizedSearch);

				return (
					matchesSearch &&
					(!status || request.status === status) &&
					(!priority || request.priority === priority)
				);
			})
			.sort((left, right) => right.created_at.localeCompare(left.created_at));
	}

	workloadRows() {
		return this.technicians
			.filter((technician) => technician.is_active === 1)
			.sort((left, right) => left.name.localeCompare(right.name))
			.map((technician) => {
				const assignedRequests = this.assignments
					.filter(
						(assignment) =>
							assignment.technician_id === technician.id &&
							assignment.is_current === 1,
					)
					.map((assignment) =>
						this.requests.find((request) => request.id === assignment.request_id),
					)
					.filter(
						(request): request is StoredRequest =>
							Boolean(request) &&
							["ASSIGNED", "IN_PROGRESS", "RESOLVED"].includes(request.status),
					);

				return {
					technician_id: technician.id,
					technician_name: technician.name,
					specialization: technician.specialization,
					total_current_assignments: assignedRequests.length,
					assigned_count: assignedRequests.filter(
						(request) => request.status === "ASSIGNED",
					).length,
					in_progress_count: assignedRequests.filter(
						(request) => request.status === "IN_PROGRESS",
					).length,
					resolved_count: assignedRequests.filter(
						(request) => request.status === "RESOLVED",
					).length,
				};
			});
	}
}

function boundStatement(
	database: Skill13D1Database,
	sql: string,
	values: unknown[],
) {
	return {
		async first() {
			if (sql.includes("FROM reporter_confirmations")) {
				const [requestId] = values as string[];

				return (
					database.confirmations
						.filter((confirmation) => confirmation.request_id === requestId)
						.sort((left, right) =>
							right.confirmed_at.localeCompare(left.confirmed_at),
						)[0] ?? null
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
							technician.id === technicianId && technician.is_active === 1,
					) ?? null
				);
			}

			if (sql.includes("FROM service_requests")) {
				const [requestId] = values as string[];

				return database.requests.find((request) => request.id === requestId) ?? null;
			}

			return null;
		},
		async all() {
			if (sql.includes("FROM request_status_history")) {
				const [requestId] = values as string[];

				return {
					results: database.history
						.filter((history) => history.request_id === requestId)
						.sort((left, right) => left.created_at.localeCompare(right.created_at)),
				};
			}

			if (sql.includes("FROM request_comments")) {
				const [requestId] = values as string[];

				return {
					results: database.comments
						.filter((comment) => comment.request_id === requestId)
						.sort((left, right) => left.created_at.localeCompare(right.created_at)),
				};
			}

			if (sql.includes("FROM request_internal_notes")) {
				const [requestId] = values as string[];

				return {
					results: database.internalNotes
						.filter((note) => note.request_id === requestId)
						.sort((left, right) => left.created_at.localeCompare(right.created_at)),
				};
			}

			if (sql.includes("FROM technicians") && !sql.includes("request_assignments")) {
				return {
					results: database.technicians
						.filter((technician) => technician.is_active === 1)
						.sort((left, right) => left.name.localeCompare(right.name)),
				};
			}

			if (sql.includes("FROM request_assignments")) {
				const [technicianId, status] = values as (string | null)[];

				return {
					results: database.assignments
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
						.filter((row) => row && (!status || row.status === status)),
				};
			}

			const search = values[0] as string | null;
			const status = values[6] as string | null;
			const priority = values[8] as string | null;

			return { results: database.listRequests(search, status, priority) };
		},
		async run() {
			if (sql.includes("INSERT INTO service_requests")) {
				const [
					id,
					requestNumber,
					title,
					description,
					location,
					category,
					priority,
					prioritySuggestion,
					status,
					reporterName,
					reporterType,
					insertCreatedAt,
					updatedAt,
				] = values as (string | null)[];

				database.requests.push({
					id: id ?? "",
					request_number: requestNumber ?? "",
					title: title ?? "",
					description: description ?? "",
					location: location ?? "",
					category: category ?? "",
					priority: priority ?? "",
					priority_suggestion: prioritySuggestion,
					status: status ?? "",
					reporter_name: reporterName ?? "",
					reporter_type: reporterType ?? "",
					reviewed_at: null,
					reviewed_by_role: null,
					closed_at: null,
					closed_by_role: null,
					manual_override_used: 0,
					manual_override_note: null,
					created_at: insertCreatedAt ?? "",
					updated_at: updatedAt ?? "",
				});
			}

			if (sql.includes("UPDATE service_requests") && sql.includes("reviewed_at")) {
				const [reviewedAt, updatedAt, requestId] = values as string[];
				const request = database.requests.find((item) => item.id === requestId);

				if (request) {
					request.status = "UNDER_REVIEW";
					request.reviewed_at = reviewedAt;
					request.reviewed_by_role = "ADMINISTRATOR";
					request.updated_at = updatedAt;
				}
			}

			if (sql.includes("UPDATE service_requests") && sql.includes("category =")) {
				const [category, priority, updatedAt, requestId] = values as string[];
				const request = database.requests.find((item) => item.id === requestId);

				if (request) {
					request.category = category;
					request.priority = priority;
					request.updated_at = updatedAt;
				}
			}

			if (sql.includes("UPDATE request_assignments") && sql.includes("is_current = 0")) {
				const [requestId] = values as string[];

				for (const assignment of database.assignments) {
					if (assignment.request_id === requestId) {
						assignment.is_current = 0;
					}
				}
			}

			if (sql.includes("INSERT INTO request_assignments")) {
				const [id, requestId, technicianId, assignedAt] = values as string[];

				database.assignments.push({
					id,
					request_id: requestId,
					technician_id: technicianId,
					assigned_by_role: "ADMINISTRATOR",
					assigned_at: assignedAt,
					accepted_at: null,
					is_current: 1,
				});
			}

			if (sql.includes("UPDATE request_assignments") && sql.includes("accepted_at")) {
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

			updateStatus(database, sql, values);

			if (sql.includes("INSERT INTO request_status_history")) {
				const [
					id,
					requestId,
					fromStatus,
					toStatus,
					changedByRole,
					note,
					historyCreatedAt,
				] = values as [string, string, string | null, string, string, string, string];

				database.history.push({
					id,
					request_id: requestId,
					from_status: fromStatus,
					to_status: toStatus,
					changed_by_role: changedByRole,
					note,
					created_at: historyCreatedAt,
				});
			}

			if (sql.includes("INSERT INTO request_comments")) {
				const [id, requestId, authorRole, body, commentCreatedAt] =
					values as string[];

				database.comments.push({
					id,
					request_id: requestId,
					author_role: authorRole,
					body,
					visibility: "PUBLIC",
					created_at: commentCreatedAt,
				});
			}

			if (sql.includes("INSERT INTO request_internal_notes")) {
				const [id, requestId, authorRole, body, noteCreatedAt] =
					values as string[];

				database.internalNotes.push({
					id,
					request_id: requestId,
					author_role: authorRole,
					body,
					visibility: "INTERNAL",
					created_at: noteCreatedAt,
				});
			}

			if (sql.includes("INSERT INTO reporter_confirmations")) {
				const [id, requestId, confirmationNote, confirmedAt] = values as [
					string,
					string,
					string | null,
					string,
				];

				database.confirmations.push({
					id,
					request_id: requestId,
					confirmed_by_role: "REPORTER",
					confirmation_note: confirmationNote,
					confirmed_at: confirmedAt,
				});
			}

			return { success: true };
		},
	};
}

function updateStatus(
	database: Skill13D1Database,
	sql: string,
	values: unknown[],
) {
	const statusMatch = sql.match(/status = '([^']+)'/);

	if (!sql.includes("UPDATE service_requests") || !statusMatch) {
		return;
	}

	const nextStatus = statusMatch[1];

	if (nextStatus === "CLOSED") {
		const [
			closedAt,
			manualOverrideUsed,
			manualOverrideNote,
			updatedAt,
			requestId,
		] = values as [string, number, string | null, string, string];
		const request = database.requests.find((item) => item.id === requestId);

		if (request) {
			request.status = "CLOSED";
			request.closed_at = closedAt;
			request.closed_by_role = "ADMINISTRATOR";
			request.manual_override_used = manualOverrideUsed;
			request.manual_override_note = manualOverrideNote;
			request.updated_at = updatedAt;
		}

		return;
	}

	const [updatedAt, requestId] = values as string[];
	const request = database.requests.find((item) => item.id === requestId);

	if (request) {
		request.status = nextStatus;
		request.updated_at = updatedAt;
	}
}

function groupCounts(
	requests: StoredRequest[],
	key: "status" | "priority" | "category",
) {
	const counts = new Map<string, number>();

	for (const request of requests) {
		counts.set(request[key], (counts.get(request[key]) ?? 0) + 1);
	}

	return Array.from(counts, ([label, total]) => ({ label, total }));
}

function requestFixture(overrides: Partial<StoredRequest> = {}): StoredRequest {
	return {
		id: "request-1",
		request_number: "CSR-001",
		title: "Proyektor ruang 302 rusak",
		description: "Proyektor tidak menyala saat kelas berlangsung.",
		location: "Gedung A, Ruang 302",
		category: "Peralatan Kelas",
		priority: "MEDIUM",
		priority_suggestion: null,
		status: "SUBMITTED",
		reporter_name: "Rafi Pratama",
		reporter_type: "STUDENT",
		reviewed_at: null,
		reviewed_by_role: null,
		closed_at: null,
		closed_by_role: null,
		manual_override_used: 0,
		manual_override_note: null,
		created_at: createdAt,
		updated_at: createdAt,
		...overrides,
	};
}

async function jsonBody(response: Response) {
	return response.json() as Promise<Record<string, unknown>>;
}

async function patch(
	database: Skill13D1Database,
	path: string,
	body: Record<string, unknown>,
) {
	return fetchWithSession(
		new Request(`http://localhost${path}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		}),
		{ DB: database } as unknown as Env,
	);
}

async function post(
	database: Skill13D1Database,
	path: string,
	body: Record<string, unknown>,
) {
	return fetchWithSession(
		new Request(`http://localhost${path}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		}),
		{ DB: database } as unknown as Env,
	);
}

afterEach(() => {
	vi.restoreAllMocks();
});

describe("Skill 13 automated workflow coverage from docs/testing/test-plan.md", () => {
	// FR-01, FR-02, BR-01: valid Student reports persist with reporter identity and SUBMITTED status.
	it("creates a Student report with no lecturer priority suggestion", async () => {
		vi.spyOn(crypto, "randomUUID")
			.mockReturnValueOnce("request-student")
			.mockReturnValueOnce("history-student");
		const database = new Skill13D1Database();

		const response = await post(database, "/api/requests", {
			role: "REPORTER",
			reporterName: "Rafi Pratama",
			reporterType: "STUDENT",
			title: "AC ruang kelas tidak dingin",
			description: "AC menyala tetapi ruangan tetap panas sepanjang kuliah.",
			location: "Gedung B, Ruang 104",
			category: "AC",
		});

		expect(response.status).toBe(201);
		await expect(jsonBody(response)).resolves.toMatchObject({
			data: {
				id: "request-student",
				status: "SUBMITTED",
				priority: "MEDIUM",
				prioritySuggestion: null,
				reporterName: "Rafi Pratama",
				reporterType: "STUDENT",
			},
		});
		expect(database.requests[0]).toMatchObject({
			id: "request-student",
			status: "SUBMITTED",
			priority_suggestion: null,
			reporter_name: "Rafi Pratama",
		});
		expect(database.history).toMatchObject([
			{
				request_id: "request-student",
				from_status: null,
				to_status: "SUBMITTED",
				changed_by_role: "REPORTER",
			},
		]);
	});

	// FR-01, FR-10, BR-05: Lecturer reports get a HIGH suggestion while final priority remains MEDIUM.
	it("creates a Lecturer report with advisory HIGH priority suggestion", async () => {
		vi.spyOn(crypto, "randomUUID")
			.mockReturnValueOnce("request-lecturer")
			.mockReturnValueOnce("history-lecturer");
		const database = new Skill13D1Database();

		const response = await post(database, "/api/requests", {
			role: "REPORTER",
			reporterName: "Dr. Mira Santoso",
			reporterType: "LECTURER",
			title: "Proyektor ruang 302 rusak",
			description: "Proyektor tidak menyala saat kelas pagi berlangsung.",
			location: "Gedung A, Ruang 302",
			category: "Peralatan Kelas",
		});

		expect(response.status).toBe(201);
		await expect(jsonBody(response)).resolves.toMatchObject({
			data: {
				priority: "MEDIUM",
				prioritySuggestion: "HIGH",
				reporterType: "LECTURER",
			},
		});
		expect(database.requests[0]).toMatchObject({
			priority: "MEDIUM",
			priority_suggestion: "HIGH",
		});
	});

	// FR-02, FR-01: invalid reporter/request data is rejected before any persistence occurs.
	it("rejects incomplete create payloads without storing request or history", async () => {
		const database = new Skill13D1Database();

		const response = await post(database, "/api/requests", {
			role: "REPORTER",
			reporterName: " ",
			reporterType: "GUEST",
			title: "",
			description: "terlalu pendek",
			location: "",
			category: "",
		});

		expect(response.status).toBe(422);
		await expect(jsonBody(response)).resolves.toMatchObject({
			error: {
				code: "VALIDATION_ERROR",
				fields: {
					reporterName: "Nama pelapor wajib diisi.",
					reporterType: "Tipe pelapor harus STUDENT atau LECTURER.",
					title: "Judul wajib diisi.",
					description: "Deskripsi minimal 20 karakter.",
					location: "Lokasi wajib diisi.",
					category: "Kategori wajib diisi.",
				},
			},
		});
		expect(database.requests).toHaveLength(0);
		expect(database.history).toHaveLength(0);
	});

	// FR-03, FR-04, FR-05: list queries combine search, status, and priority with empty metadata.
	it("filters request list by search, status, and priority and reports empty state", async () => {
		const database = new Skill13D1Database([
			requestFixture({
				id: "request-1",
				title: "Proyektor ruang 302 rusak",
				status: "UNDER_REVIEW",
				priority: "HIGH",
				reporter_name: "Dr. Mira Santoso",
			}),
			requestFixture({
				id: "request-2",
				title: "Internet laboratorium lambat",
				category: "Internet",
				status: "SUBMITTED",
				priority: "LOW",
				reporter_name: "Rafi Pratama",
			}),
		]);

		const matchedResponse = await fetchWithSession(
			new Request(
				"http://localhost/api/requests?search=mira&status=UNDER_REVIEW&priority=HIGH",
			),
			{ DB: database } as unknown as Env,
		);
		const emptyResponse = await fetchWithSession(
			new Request(
				"http://localhost/api/requests?search=mira&status=SUBMITTED&priority=HIGH",
			),
			{ DB: database } as unknown as Env,
		);

		expect(matchedResponse.status).toBe(200);
		await expect(jsonBody(matchedResponse)).resolves.toMatchObject({
			data: [{ id: "request-1", status: "UNDER_REVIEW", priority: "HIGH" }],
			meta: { total: 1, empty: false },
		});
		await expect(jsonBody(emptyResponse)).resolves.toMatchObject({
			data: [],
			meta: { total: 0, empty: true },
		});
	});

	// FR-05, BR-02, BR-07: unsupported list filters are rejected instead of silently widening results.
	it("rejects invalid status and priority filters", async () => {
		const response = await fetchWithSession(
			new Request("http://localhost/api/requests?status=WAITING&priority=CRITICAL"),
			{ DB: new Skill13D1Database([requestFixture()]) } as unknown as Env,
		);

		expect(response.status).toBe(422);
		await expect(jsonBody(response)).resolves.toMatchObject({
			error: {
				code: "VALIDATION_ERROR",
				fields: {
					status: "Status filter tidak didukung.",
					priority: "Priority filter tidak didukung.",
				},
			},
		});
	});

	// FR-06, FR-18: detail returns request data with ordered status history.
	it("returns detail with ordered status history for the selected request", async () => {
		const database = new Skill13D1Database([requestFixture()]);
		database.history.push(
			{
				id: "history-2",
				request_id: "request-1",
				from_status: "SUBMITTED",
				to_status: "UNDER_REVIEW",
				changed_by_role: "ADMINISTRATOR",
				note: "Review dimulai.",
				created_at: "2026-07-01T02:10:00.000Z",
			},
			{
				id: "history-1",
				request_id: "request-1",
				from_status: null,
				to_status: "SUBMITTED",
				changed_by_role: "REPORTER",
				note: "Laporan dibuat oleh Pelapor.",
				created_at: "2026-07-01T02:00:00.000Z",
			},
		);

		const response = await fetchWithSession(
			new Request("http://localhost/api/requests/request-1?role=REPORTER"),
			{ DB: database } as unknown as Env,
		);

		expect(response.status).toBe(200);
		await expect(jsonBody(response)).resolves.toMatchObject({
			data: {
				id: "request-1",
				description: "Proyektor tidak menyala saat kelas berlangsung.",
				statusHistory: [
					{ id: "history-1", fromStatus: null, toStatus: "SUBMITTED" },
					{ id: "history-2", fromStatus: "SUBMITTED", toStatus: "UNDER_REVIEW" },
				],
			},
		});
	});

	// FR-24, FR-17: Facility Manager cannot open full detail while OPEN-10 is unresolved.
	it("rejects Facility Manager full request detail access", async () => {
		const response = await fetchWithSession(
			new Request("http://localhost/api/requests/request-1?role=FACILITY_MANAGER"),
			{ DB: new Skill13D1Database([requestFixture()]) } as unknown as Env,
		);

		expect(response.status).toBe(403);
		await expect(jsonBody(response)).resolves.toMatchObject({
			error: { code: "FORBIDDEN" },
		});
	});

	// FR-07, FR-18: Administrator review moves SUBMITTED to UNDER_REVIEW and records history.
	it("lets Administrator review a submitted request and append status history", async () => {
		vi.spyOn(crypto, "randomUUID").mockReturnValueOnce("history-review");
		const database = new Skill13D1Database([requestFixture()]);

		const response = await patch(database, "/api/requests/request-1/review", {
			role: "ADMINISTRATOR",
			note: "Administrator mulai meninjau laporan.",
		});

		expect(response.status).toBe(200);
		await expect(jsonBody(response)).resolves.toMatchObject({
			data: { id: "request-1", status: "UNDER_REVIEW" },
		});
		expect(database.requests[0]).toMatchObject({
			status: "UNDER_REVIEW",
			reviewed_by_role: "ADMINISTRATOR",
		});
		expect(database.history).toMatchObject([
			{
				id: "history-review",
				from_status: "SUBMITTED",
				to_status: "UNDER_REVIEW",
				changed_by_role: "ADMINISTRATOR",
			},
		]);
	});

	// FR-07, FR-24: non-admin actors cannot review or mutate request state.
	it("forbids non-admin review and leaves request unchanged", async () => {
		const database = new Skill13D1Database([requestFixture()]);

		const response = await patch(database, "/api/requests/request-1/review", {
			role: "TECHNICIAN",
			note: "Tidak boleh review.",
		});

		expect(response.status).toBe(403);
		await expect(jsonBody(response)).resolves.toMatchObject({
			error: { code: "FORBIDDEN" },
		});
		expect(database.requests[0].status).toBe("SUBMITTED");
		expect(database.history).toHaveLength(0);
	});

	// FR-08, FR-09, BR-06, BR-07: classification accepts only controlled category and priority values.
	it("rejects invalid classification values", async () => {
		const database = new Skill13D1Database([
			requestFixture({ status: "UNDER_REVIEW" }),
		]);

		const response = await patch(database, "/api/requests/request-1/classification", {
			role: "ADMINISTRATOR",
			category: "Lift",
			priority: "CRITICAL",
		});

		expect(response.status).toBe(422);
		await expect(jsonBody(response)).resolves.toMatchObject({
			error: {
				code: "VALIDATION_ERROR",
				fields: {
					category: "Kategori harus memakai daftar tetap yang tersedia.",
					priority: "Prioritas harus LOW, MEDIUM, HIGH, atau URGENT.",
				},
			},
		});
		expect(database.requests[0]).toMatchObject({
			category: "Peralatan Kelas",
			priority: "MEDIUM",
		});
	});

	// FR-08, FR-09, FR-10: Administrator classification stores final category/priority without changing lecturer suggestion.
	it("stores Administrator classification while preserving lecturer priority suggestion", async () => {
		const database = new Skill13D1Database([
			requestFixture({
				status: "UNDER_REVIEW",
				reporter_type: "LECTURER",
				priority_suggestion: "HIGH",
			}),
		]);

		const response = await patch(database, "/api/requests/request-1/classification", {
			role: "ADMINISTRATOR",
			category: "AC",
			priority: "URGENT",
		});

		expect(response.status).toBe(200);
		await expect(jsonBody(response)).resolves.toMatchObject({
			data: {
				category: "AC",
				priority: "URGENT",
				prioritySuggestion: "HIGH",
				status: "UNDER_REVIEW",
			},
		});
		expect(database.requests[0]).toMatchObject({
			category: "AC",
			priority: "URGENT",
			priority_suggestion: "HIGH",
		});
	});

	// FR-11, BR-03: assignment requires reviewed state and an active technician.
	it("rejects assignment to inactive technician", async () => {
		const database = new Skill13D1Database([
			requestFixture({ status: "UNDER_REVIEW" }),
		]);

		const response = await patch(database, "/api/requests/request-1/assignment", {
			role: "ADMINISTRATOR",
			technicianId: "tech-inactive",
			note: "Coba tugaskan teknisi nonaktif.",
		});

		expect(response.status).toBe(422);
		await expect(jsonBody(response)).resolves.toMatchObject({
			error: {
				code: "VALIDATION_ERROR",
				fields: { technicianId: "Teknisi aktif tidak ditemukan." },
			},
		});
		expect(database.assignments).toHaveLength(0);
		expect(database.requests[0].status).toBe("UNDER_REVIEW");
	});

	// FR-11, FR-18: assignment after review creates current assignment, ASSIGNED status, and history.
	it("assigns an active technician after review and records ASSIGNED transition", async () => {
		vi.spyOn(crypto, "randomUUID")
			.mockReturnValueOnce("assignment-1")
			.mockReturnValueOnce("history-assigned");
		const database = new Skill13D1Database([
			requestFixture({ status: "UNDER_REVIEW" }),
		]);

		const response = await patch(database, "/api/requests/request-1/assignment", {
			role: "ADMINISTRATOR",
			technicianId: "tech-1",
			note: "Ditugaskan ke teknisi audio visual.",
		});

		expect(response.status).toBe(200);
		await expect(jsonBody(response)).resolves.toMatchObject({
			data: {
				status: "ASSIGNED",
				assignment: { id: "assignment-1", technicianId: "tech-1" },
			},
		});
		expect(database.assignments).toMatchObject([
			{ id: "assignment-1", request_id: "request-1", is_current: 1 },
		]);
		expect(database.history).toMatchObject([
			{
				id: "history-assigned",
				from_status: "UNDER_REVIEW",
				to_status: "ASSIGNED",
				changed_by_role: "ADMINISTRATOR",
			},
		]);
	});

	// FR-12, FR-24: technician task list is scoped to the active technician context.
	it("forbids technician task list access with the wrong active technician context", async () => {
		const response = await fetchWithSession(
			new Request(
				"http://localhost/api/technicians/tech-1/tasks?role=TECHNICIAN&technicianId=tech-2",
			),
			{ DB: new Skill13D1Database([requestFixture({ status: "ASSIGNED" })]) } as unknown as Env,
		);

		expect(response.status).toBe(403);
		await expect(jsonBody(response)).resolves.toMatchObject({
			error: { code: "FORBIDDEN" },
		});
	});

	// FR-13: accepting a task records acceptedAt but does not invent rejection/status behavior.
	it("records technician acceptance without changing request status", async () => {
		const database = new Skill13D1Database([
			requestFixture({ status: "ASSIGNED" }),
		]);
		database.assignments.push({
			id: "assignment-1",
			request_id: "request-1",
			technician_id: "tech-1",
			assigned_by_role: "ADMINISTRATOR",
			assigned_at: createdAt,
			accepted_at: null,
			is_current: 1,
		});

		const response = await patch(database, "/api/requests/request-1/accept", {
			role: "TECHNICIAN",
			technicianId: "tech-1",
		});

		expect(response.status).toBe(200);
		await expect(jsonBody(response)).resolves.toMatchObject({
			data: {
				id: "assignment-1",
				acceptedAt: expect.any(String),
				requestStatus: "ASSIGNED",
			},
		});
		expect(database.requests[0].status).toBe("ASSIGNED");
		expect(database.history).toHaveLength(0);
	});

	// FR-14: progress requires a meaningful technician note.
	it("rejects progress without note and leaves status history untouched", async () => {
		const database = new Skill13D1Database([
			requestFixture({ status: "ASSIGNED" }),
		]);

		const response = await patch(database, "/api/requests/request-1/progress", {
			role: "TECHNICIAN",
			technicianId: "tech-1",
			note: " ",
		});

		expect(response.status).toBe(422);
		await expect(jsonBody(response)).resolves.toMatchObject({
			error: {
				code: "VALIDATION_ERROR",
				fields: { note: "Catatan progres wajib diisi." },
			},
		});
		expect(database.requests[0].status).toBe("ASSIGNED");
		expect(database.history).toHaveLength(0);
	});

	// FR-14, FR-18: assigned technician can move ASSIGNED to IN_PROGRESS with BR-08 history.
	it("moves ASSIGNED work to IN_PROGRESS with status history", async () => {
		vi.spyOn(crypto, "randomUUID").mockReturnValueOnce("history-progress");
		const database = new Skill13D1Database([
			requestFixture({ status: "ASSIGNED" }),
		]);
		database.assignments.push({
			id: "assignment-1",
			request_id: "request-1",
			technician_id: "tech-1",
			assigned_by_role: "ADMINISTRATOR",
			assigned_at: createdAt,
			accepted_at: createdAt,
			is_current: 1,
		});

		const response = await patch(database, "/api/requests/request-1/progress", {
			role: "TECHNICIAN",
			technicianId: "tech-1",
			note: "Mulai dikerjakan.",
		});

		expect(response.status).toBe(200);
		await expect(jsonBody(response)).resolves.toMatchObject({
			data: { status: "IN_PROGRESS" },
		});
		expect(database.history).toMatchObject([
			{
				id: "history-progress",
				from_status: "ASSIGNED",
				to_status: "IN_PROGRESS",
				changed_by_role: "TECHNICIAN",
				note: "Mulai dikerjakan.",
			},
		]);
	});

	// FR-15, BR-02: resolve from the wrong status is rejected and cannot skip the workflow.
	it("rejects resolve before work is in progress", async () => {
		const database = new Skill13D1Database([
			requestFixture({ status: "ASSIGNED" }),
		]);
		database.assignments.push({
			id: "assignment-1",
			request_id: "request-1",
			technician_id: "tech-1",
			assigned_by_role: "ADMINISTRATOR",
			assigned_at: createdAt,
			accepted_at: createdAt,
			is_current: 1,
		});

		const response = await patch(database, "/api/requests/request-1/resolve", {
			role: "TECHNICIAN",
			technicianId: "tech-1",
			note: "Langsung selesai.",
		});

		expect(response.status).toBe(409);
		await expect(jsonBody(response)).resolves.toMatchObject({
			error: {
				code: "INVALID_STATUS_TRANSITION",
				currentStatus: "ASSIGNED",
				allowedStatuses: ["RESOLVED"],
			},
		});
		expect(database.requests[0].status).toBe("ASSIGNED");
	});

	// FR-15, FR-18, OPEN-11: resolving work appends history and does not add a seventh status.
	it("moves IN_PROGRESS work to RESOLVED without adding a seventh status", async () => {
		vi.spyOn(crypto, "randomUUID").mockReturnValueOnce("history-resolved");
		const database = new Skill13D1Database([
			requestFixture({ status: "IN_PROGRESS" }),
		]);
		database.assignments.push({
			id: "assignment-1",
			request_id: "request-1",
			technician_id: "tech-1",
			assigned_by_role: "ADMINISTRATOR",
			assigned_at: createdAt,
			accepted_at: createdAt,
			is_current: 1,
		});

		const response = await patch(database, "/api/requests/request-1/resolve", {
			role: "TECHNICIAN",
			technicianId: "tech-1",
			note: "Pekerjaan selesai.",
		});

		expect(response.status).toBe(200);
		await expect(jsonBody(response)).resolves.toMatchObject({
			data: { status: "RESOLVED" },
		});
		expect(database.requests[0].status).toBe("RESOLVED");
		expect(database.history[0]).toMatchObject({
			from_status: "IN_PROGRESS",
			to_status: "RESOLVED",
		});
		expect(database.history[0].to_status).not.toBe("WAITING_CONFIRMATION");
	});

	// FR-16, BR-09: public comments are stored and visible in request detail.
	it("stores public comment and returns it in Reporter detail", async () => {
		vi.spyOn(crypto, "randomUUID").mockReturnValueOnce("comment-1");
		const database = new Skill13D1Database([requestFixture()]);

		const response = await post(database, "/api/requests/request-1/comments", {
			role: "REPORTER",
			body: "Mohon update setelah teknisi memeriksa proyektor.",
		});
		const detailResponse = await fetchWithSession(
			new Request("http://localhost/api/requests/request-1?role=REPORTER"),
			{ DB: database } as unknown as Env,
		);

		expect(response.status).toBe(201);
		await expect(jsonBody(detailResponse)).resolves.toMatchObject({
			data: {
				comments: [
					{
						id: "comment-1",
						authorRole: "REPORTER",
						visibility: "PUBLIC",
					},
				],
			},
		});
	});

	// FR-17, BR-10: internal notes are stored for allowed roles and hidden from Reporter detail.
	it("stores internal note for Administrator and hides it from Reporter", async () => {
		vi.spyOn(crypto, "randomUUID").mockReturnValueOnce("note-1");
		const database = new Skill13D1Database([requestFixture()]);

		const response = await post(database, "/api/requests/request-1/internal-notes", {
			role: "ADMINISTRATOR",
			body: "Teknisi perlu cek kabel HDMI sebelum mengganti proyektor.",
		});
		const adminDetailResponse = await fetchWithSession(
			new Request("http://localhost/api/requests/request-1?role=ADMINISTRATOR"),
			{ DB: database } as unknown as Env,
		);
		const reporterDetailResponse = await fetchWithSession(
			new Request("http://localhost/api/requests/request-1?role=REPORTER"),
			{ DB: database } as unknown as Env,
		);

		expect(response.status).toBe(201);
		await expect(jsonBody(adminDetailResponse)).resolves.toMatchObject({
			data: {
				internalNotes: [
					{
						id: "note-1",
						authorRole: "ADMINISTRATOR",
						visibility: "INTERNAL",
					},
				],
			},
		});
		await expect(jsonBody(reporterDetailResponse)).resolves.not.toHaveProperty(
			"data.internalNotes",
		);
	});

	// FR-17, FR-24: Reporter and Facility Manager cannot add internal notes.
	it("forbids unauthorized internal note creation", async () => {
		const database = new Skill13D1Database([requestFixture()]);

		for (const role of ["REPORTER", "FACILITY_MANAGER"]) {
			const response = await post(database, "/api/requests/request-1/internal-notes", {
				role,
				body: "Catatan ini tidak boleh tersimpan.",
			});

			expect(response.status).toBe(403);
			await expect(jsonBody(response)).resolves.toMatchObject({
				error: { code: "FORBIDDEN" },
			});
		}

		expect(database.internalNotes).toHaveLength(0);
	});

	// FR-19, OPEN-11: Reporter confirmation is a non-status event on RESOLVED reports.
	it("records Reporter confirmation without changing RESOLVED status", async () => {
		vi.spyOn(crypto, "randomUUID").mockReturnValueOnce("confirmation-1");
		const database = new Skill13D1Database([
			requestFixture({ status: "RESOLVED" }),
		]);

		const response = await patch(database, "/api/requests/request-1/confirm-resolution", {
			role: "REPORTER",
			confirmationNote: "Perbaikan sudah diterima.",
		});

		expect(response.status).toBe(200);
		await expect(jsonBody(response)).resolves.toMatchObject({
			data: {
				id: "confirmation-1",
				confirmedByRole: "REPORTER",
				confirmationNote: "Perbaikan sudah diterima.",
			},
		});
		expect(database.requests[0].status).toBe("RESOLVED");
		expect(database.history).toHaveLength(0);
	});

	// FR-19, FR-24: non-reporters cannot confirm resolution.
	it("forbids non-reporter resolution confirmation", async () => {
		const database = new Skill13D1Database([
			requestFixture({ status: "RESOLVED" }),
		]);

		const response = await patch(database, "/api/requests/request-1/confirm-resolution", {
			role: "ADMINISTRATOR",
			confirmationNote: "Admin tidak boleh konfirmasi sebagai Pelapor.",
		});

		expect(response.status).toBe(403);
		await expect(jsonBody(response)).resolves.toMatchObject({
			error: { code: "FORBIDDEN" },
		});
		expect(database.confirmations).toHaveLength(0);
	});

	// FR-20, BR-11: close without confirmation requires explicit manual override data.
	it("rejects close without confirmation or manual override", async () => {
		const database = new Skill13D1Database([
			requestFixture({ status: "RESOLVED" }),
		]);

		const response = await patch(database, "/api/requests/request-1/close", {
			role: "ADMINISTRATOR",
			note: "Tutup tanpa konfirmasi.",
			manualOverride: false,
		});

		expect(response.status).toBe(422);
		await expect(jsonBody(response)).resolves.toMatchObject({
			error: {
				code: "VALIDATION_ERROR",
				fields: {
					manualOverride:
						"Close tanpa konfirmasi Pelapor membutuhkan manualOverride true.",
					manualOverrideNote:
						"Close tanpa konfirmasi Pelapor membutuhkan catatan manual override.",
				},
			},
		});
		expect(database.requests[0].status).toBe("RESOLVED");
	});

	// FR-20, BR-11: manual override close stores audit note and CLOSED status.
	it("closes RESOLVED report only when manual override note is supplied", async () => {
		vi.spyOn(crypto, "randomUUID").mockReturnValueOnce("history-close");
		const database = new Skill13D1Database([
			requestFixture({ status: "RESOLVED" }),
		]);

		const response = await patch(database, "/api/requests/request-1/close", {
			role: "ADMINISTRATOR",
			note: "Laporan ditutup dengan override manual.",
			manualOverride: true,
			manualOverrideNote: "Pelapor tidak merespons setelah follow-up manual.",
		});

		expect(response.status).toBe(200);
		await expect(jsonBody(response)).resolves.toMatchObject({
			data: { status: "CLOSED" },
		});
		expect(database.requests[0]).toMatchObject({
			status: "CLOSED",
			closed_by_role: "ADMINISTRATOR",
			manual_override_used: 1,
			manual_override_note: "Pelapor tidak merespons setelah follow-up manual.",
		});
		expect(database.history).toMatchObject([
			{
				id: "history-close",
				from_status: "RESOLVED",
				to_status: "CLOSED",
				changed_by_role: "ADMINISTRATOR",
			},
		]);
	});

	// FR-21, BR-12: reopen always targets UNDER_REVIEW and records history.
	it("reopens CLOSED report to UNDER_REVIEW", async () => {
		vi.spyOn(crypto, "randomUUID").mockReturnValueOnce("history-reopen");
		const database = new Skill13D1Database([
			requestFixture({
				status: "CLOSED",
				closed_at: "2026-07-01T03:20:00.000Z",
				closed_by_role: "ADMINISTRATOR",
			}),
		]);

		const response = await patch(database, "/api/requests/request-1/reopen", {
			role: "ADMINISTRATOR",
			note: "Masalah muncul kembali dan perlu ditinjau ulang.",
		});

		expect(response.status).toBe(200);
		await expect(jsonBody(response)).resolves.toMatchObject({
			data: { status: "UNDER_REVIEW" },
		});
		expect(database.history).toMatchObject([
			{
				id: "history-reopen",
				from_status: "CLOSED",
				to_status: "UNDER_REVIEW",
				changed_by_role: "ADMINISTRATOR",
			},
		]);
	});

	// FR-22, FR-23, FR-17: dashboard shows source data without exposing internal notes.
	it("summarizes dashboard workload source data without leaking internal notes", async () => {
		const database = new Skill13D1Database([
			requestFixture({ id: "request-1", status: "ASSIGNED", priority: "HIGH" }),
			requestFixture({
				id: "request-2",
				status: "IN_PROGRESS",
				category: "Internet",
				priority: "URGENT",
			}),
		]);
		database.assignments.push(
			{
				id: "assignment-1",
				request_id: "request-1",
				technician_id: "tech-1",
				assigned_by_role: "ADMINISTRATOR",
				assigned_at: createdAt,
				accepted_at: null,
				is_current: 1,
			},
			{
				id: "assignment-2",
				request_id: "request-2",
				technician_id: "tech-1",
				assigned_by_role: "ADMINISTRATOR",
				assigned_at: createdAt,
				accepted_at: createdAt,
				is_current: 1,
			},
		);
		database.internalNotes.push({
			id: "note-secret",
			request_id: "request-1",
			author_role: "ADMINISTRATOR",
			body: "Catatan internal tidak boleh muncul di dashboard.",
			visibility: "INTERNAL",
			created_at: createdAt,
		});

		const response = await fetchWithSession(
			new Request("http://localhost/api/dashboard/summary?role=FACILITY_MANAGER"),
			{ DB: database } as unknown as Env,
		);
		const body = await jsonBody(response);
		const data = body.data as {
			totalRequests: number;
			technicianWorkload: unknown[];
			workloadBasis: string;
		};

		expect(response.status).toBe(200);
		expect(data.totalRequests).toBe(2);
		expect(data.workloadBasis).toContain("OPEN-07");
		expect(data.technicianWorkload).toEqual(
			expect.arrayContaining([
				{
					technicianId: "tech-1",
					technicianName: "Nadia Teknisi",
					specialization: "Audio visual",
					sourceData: {
						totalCurrentAssignments: 2,
						byActiveStatus: { assigned: 1, inProgress: 1, resolved: 0 },
					},
				},
			]),
		);
		expect(JSON.stringify(body)).not.toContain("Catatan internal");
		expect(JSON.stringify(body)).not.toContain("internalNotes");
	});

	// FR-22, FR-24: operational roles cannot access manager dashboard summary.
	it("forbids dashboard access for operational roles", async () => {
		for (const role of ["REPORTER", "TECHNICIAN"]) {
			const response = await fetchWithSession(
				new Request(`http://localhost/api/dashboard/summary?role=${role}`),
				{ DB: new Skill13D1Database() } as unknown as Env,
			);

			expect(response.status).toBe(403);
			await expect(jsonBody(response)).resolves.toMatchObject({
				error: { code: "FORBIDDEN" },
			});
		}
	});
});
