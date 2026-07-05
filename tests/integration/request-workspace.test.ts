import { describe, expect, it } from "vitest";
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
	created_at: string;
	updated_at: string;
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

type StoredComment = {
	id: string;
	request_id: string;
	author_role: string;
	body: string;
	visibility: string;
	created_at: string;
};

type StoredInternalNote = StoredComment;

type StoredReporterConfirmation = {
	id: string;
	request_id: string;
	confirmed_by_role: string;
	confirmation_note: string | null;
	confirmed_at: string;
};

class FakeWorkspaceD1Database {
	constructor(
		private requests: StoredRequest[],
		private statusHistory: StoredStatusHistory[] = [],
		private comments: StoredComment[] = [],
		private internalNotes: StoredInternalNote[] = [],
		private confirmations: StoredReporterConfirmation[] = [],
	) {}

	prepare(sql: string) {
		const database = this;

		return {
			bind(...values: unknown[]) {
				return {
					async all() {
						if (sql.includes("FROM request_status_history")) {
							const [requestId] = values as string[];

							return {
								results: database.statusHistory
									.filter((history) => history.request_id === requestId)
									.sort((left, right) =>
										left.created_at.localeCompare(right.created_at),
									),
							};
						}

						if (sql.includes("FROM request_comments")) {
							const [requestId] = values as string[];

							return {
								results: database.comments
									.filter((comment) => comment.request_id === requestId)
									.sort((left, right) =>
										left.created_at.localeCompare(right.created_at),
									),
							};
						}

						if (sql.includes("FROM request_internal_notes")) {
							const [requestId] = values as string[];

							return {
								results: database.internalNotes
									.filter((note) => note.request_id === requestId)
									.sort((left, right) =>
										left.created_at.localeCompare(right.created_at),
									),
							};
						}

						const search = values[0] as string | null;
						const status = values[6] as string | null;
						const priority = values[8] as string | null;

						return {
							results: database.filterRequests(search, status, priority),
						};
					},
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

						const [requestId] = values as string[];
						return (
							database.requests.find((request) => request.id === requestId) ??
							null
						);
					},
					async run() {
						if (sql.includes("INSERT INTO request_comments")) {
							const [id, requestId, authorRole, body, createdAt] =
								values as string[];
							database.comments.push({
								id,
								request_id: requestId,
								author_role: authorRole,
								body,
								visibility: "PUBLIC",
								created_at: createdAt,
							});
						}

						if (sql.includes("INSERT INTO request_internal_notes")) {
							const [id, requestId, authorRole, body, createdAt] =
								values as string[];
							database.internalNotes.push({
								id,
								request_id: requestId,
								author_role: authorRole,
								body,
								visibility: "INTERNAL",
								created_at: createdAt,
							});
						}

						return { success: true };
					},
				};
			},
			async all() {
				return {
					results: database.filterRequests(null, null, null),
				};
			},
		};
	}

	private filterRequests(
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
				const matchesStatus = !status || request.status === status;
				const matchesPriority = !priority || request.priority === priority;

				return matchesSearch && matchesStatus && matchesPriority;
			})
			.sort((left, right) => right.created_at.localeCompare(left.created_at))
			.map(
				({
					description: _description,
					created_at: _createdAt,
					updated_at: _updatedAt,
					...request
				}) => request,
			);
	}
}

const storedRequests: StoredRequest[] = [
	{
		id: "request-1",
		request_number: "CSR-001",
		title: "Proyektor ruang 302 rusak",
		description: "Proyektor tidak menyala saat kelas berlangsung.",
		location: "Gedung A, Ruang 302",
		category: "Peralatan Kelas",
		priority: "HIGH",
		priority_suggestion: "HIGH",
		status: "UNDER_REVIEW",
		reporter_name: "Dr. Mira Santoso",
		reporter_type: "LECTURER",
		created_at: "2026-07-01T02:00:00.000Z",
		updated_at: "2026-07-01T02:00:00.000Z",
	},
	{
		id: "request-2",
		request_number: "CSR-002",
		title: "AC ruang 104 tidak dingin",
		description: "AC menyala tetapi ruangan tetap panas.",
		location: "Gedung B, Ruang 104",
		category: "AC",
		priority: "LOW",
		priority_suggestion: null,
		status: "SUBMITTED",
		reporter_name: "Rafi Pratama",
		reporter_type: "STUDENT",
		created_at: "2026-07-01T01:00:00.000Z",
		updated_at: "2026-07-01T01:00:00.000Z",
	},
];

describe("GET /api/requests workspace queries", () => {
	it("returns stored requests with list metadata", async () => {
		const response = await fetchWithSession(
			new Request("http://localhost/api/requests"),
			{ DB: new FakeWorkspaceD1Database(storedRequests) } as unknown as Env,
		);

		await expect(response.json()).resolves.toMatchObject({
			data: [
				{
					id: "request-1",
					requestNumber: "CSR-001",
					title: "Proyektor ruang 302 rusak",
					status: "UNDER_REVIEW",
					priority: "HIGH",
				},
				{
					id: "request-2",
					requestNumber: "CSR-002",
					title: "AC ruang 104 tidak dingin",
					status: "SUBMITTED",
					priority: "LOW",
				},
			],
			meta: {
				page: 1,
				pageSize: 20,
				total: 2,
				empty: false,
			},
		});
		expect(response.status).toBe(200);
	});

	it("applies search, status, and priority filters together and marks no-result queries empty", async () => {
		const database = new FakeWorkspaceD1Database(storedRequests);

		const matchedResponse = await fetchWithSession(
			new Request(
				"http://localhost/api/requests?search=proyektor&status=UNDER_REVIEW&priority=HIGH",
			),
			{ DB: database } as unknown as Env,
		);
		const noResultResponse = await fetchWithSession(
			new Request(
				"http://localhost/api/requests?search=proyektor&status=SUBMITTED&priority=HIGH",
			),
			{ DB: database } as unknown as Env,
		);

		await expect(matchedResponse.json()).resolves.toMatchObject({
			data: [
				{
					id: "request-1",
					requestNumber: "CSR-001",
					title: "Proyektor ruang 302 rusak",
				},
			],
			meta: {
				total: 1,
				empty: false,
			},
		});
		await expect(noResultResponse.json()).resolves.toEqual({
			data: [],
			meta: {
				page: 1,
				pageSize: 20,
				total: 0,
				empty: true,
			},
		});
	});
});

describe("GET /api/requests/:id detail", () => {
	it("returns selected request detail with ordered status history", async () => {
		const response = await fetchWithSession(
			new Request("http://localhost/api/requests/request-1"),
			{
				DB: new FakeWorkspaceD1Database(storedRequests, [
					{
						id: "history-2",
						request_id: "request-1",
						from_status: "SUBMITTED",
						to_status: "UNDER_REVIEW",
						changed_by_role: "ADMINISTRATOR",
						note: "Administrator mulai meninjau laporan.",
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
				]),
			} as unknown as Env,
		);

		await expect(response.json()).resolves.toEqual({
			data: {
				id: "request-1",
				requestNumber: "CSR-001",
				title: "Proyektor ruang 302 rusak",
				description: "Proyektor tidak menyala saat kelas berlangsung.",
				location: "Gedung A, Ruang 302",
				category: "Peralatan Kelas",
				priority: "HIGH",
				prioritySuggestion: "HIGH",
				status: "UNDER_REVIEW",
				reporterName: "Dr. Mira Santoso",
				reporterType: "LECTURER",
				reviewedAt: null,
				reviewedByRole: null,
				createdAt: "2026-07-01T02:00:00.000Z",
				updatedAt: "2026-07-01T02:00:00.000Z",
				statusHistory: [
					{
						id: "history-1",
						fromStatus: null,
						toStatus: "SUBMITTED",
						changedByRole: "REPORTER",
						note: "Laporan dibuat oleh Pelapor.",
						createdAt: "2026-07-01T02:00:00.000Z",
					},
					{
						id: "history-2",
						fromStatus: "SUBMITTED",
						toStatus: "UNDER_REVIEW",
						changedByRole: "ADMINISTRATOR",
						note: "Administrator mulai meninjau laporan.",
						createdAt: "2026-07-01T02:10:00.000Z",
					},
				],
				comments: [],
				confirmation: null,
			},
		});
		expect(response.status).toBe(200);
	});

	it("stores a public comment and returns it in request detail for Reporter", async () => {
		const database = new FakeWorkspaceD1Database(storedRequests);

		const commentResponse = await fetchWithSession(
			new Request("http://localhost/api/requests/request-1/comments", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					role: "REPORTER",
					body: "Mohon update setelah teknisi memeriksa proyektor.",
				}),
			}),
			{ DB: database } as unknown as Env,
		);

		await expect(commentResponse.json()).resolves.toMatchObject({
			data: {
				requestId: "request-1",
				authorRole: "REPORTER",
				body: "Mohon update setelah teknisi memeriksa proyektor.",
				visibility: "PUBLIC",
			},
		});
		expect(commentResponse.status).toBe(201);

		const detailResponse = await fetchWithSession(
			new Request("http://localhost/api/requests/request-1?role=REPORTER"),
			{ DB: database } as unknown as Env,
		);

		await expect(detailResponse.json()).resolves.toMatchObject({
			data: {
				comments: [
					{
						requestId: "request-1",
						authorRole: "REPORTER",
						body: "Mohon update setelah teknisi memeriksa proyektor.",
						visibility: "PUBLIC",
					},
				],
			},
		});

		for (const role of ["ADMINISTRATOR", "TECHNICIAN"]) {
			const roleDetailResponse = await fetchWithSession(
				new Request(`http://localhost/api/requests/request-1?role=${role}`),
				{ DB: database } as unknown as Env,
			);

			await expect(roleDetailResponse.json()).resolves.toMatchObject({
				data: {
					comments: [
						{
							requestId: "request-1",
							authorRole: "REPORTER",
							body: "Mohon update setelah teknisi memeriksa proyektor.",
							visibility: "PUBLIC",
						},
					],
				},
			});
		}
	});

	it("stores an internal note for Administrator and hides it from Reporter detail", async () => {
		const database = new FakeWorkspaceD1Database(storedRequests);

		const noteResponse = await fetchWithSession(
			new Request("http://localhost/api/requests/request-1/internal-notes", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					role: "ADMINISTRATOR",
					body: "Teknisi perlu cek kabel HDMI sebelum mengganti proyektor.",
				}),
			}),
			{ DB: database } as unknown as Env,
		);

		await expect(noteResponse.json()).resolves.toMatchObject({
			data: {
				requestId: "request-1",
				authorRole: "ADMINISTRATOR",
				body: "Teknisi perlu cek kabel HDMI sebelum mengganti proyektor.",
				visibility: "INTERNAL",
			},
		});
		expect(noteResponse.status).toBe(201);

		const adminDetailResponse = await fetchWithSession(
			new Request("http://localhost/api/requests/request-1?role=ADMINISTRATOR"),
			{ DB: database } as unknown as Env,
		);

		await expect(adminDetailResponse.json()).resolves.toMatchObject({
			data: {
				internalNotes: [
					{
						requestId: "request-1",
						authorRole: "ADMINISTRATOR",
						body: "Teknisi perlu cek kabel HDMI sebelum mengganti proyektor.",
						visibility: "INTERNAL",
					},
				],
			},
		});

		const reporterDetailResponse = await fetchWithSession(
			new Request("http://localhost/api/requests/request-1?role=REPORTER"),
			{ DB: database } as unknown as Env,
		);

		await expect(reporterDetailResponse.json()).resolves.not.toHaveProperty(
			"data.internalNotes",
		);
	});

	it("rejects Facility Manager full detail while OPEN-10 remains unresolved", async () => {
		const response = await fetchWithSession(
			new Request("http://localhost/api/requests/request-1?role=FACILITY_MANAGER"),
			{ DB: new FakeWorkspaceD1Database(storedRequests) } as unknown as Env,
		);

		await expect(response.json()).resolves.toEqual({
			error: {
				code: "FORBIDDEN",
				message: "Role aktif tidak boleh melakukan aksi ini.",
			},
		});
		expect(response.status).toBe(403);
	});

	it("validates empty bodies and rejects Reporter or Facility Manager internal notes", async () => {
		const database = new FakeWorkspaceD1Database(storedRequests);

		const emptyCommentResponse = await fetchWithSession(
			new Request("http://localhost/api/requests/request-1/comments", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					role: "TECHNICIAN",
					body: "   ",
				}),
			}),
			{ DB: database } as unknown as Env,
		);

		await expect(emptyCommentResponse.json()).resolves.toMatchObject({
			error: {
				code: "VALIDATION_ERROR",
				fields: {
					body: "Komentar publik wajib diisi.",
				},
			},
		});
		expect(emptyCommentResponse.status).toBe(422);

		const emptyInternalNoteResponse = await fetchWithSession(
			new Request("http://localhost/api/requests/request-1/internal-notes", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					role: "ADMINISTRATOR",
					body: "",
				}),
			}),
			{ DB: database } as unknown as Env,
		);

		await expect(emptyInternalNoteResponse.json()).resolves.toMatchObject({
			error: {
				code: "VALIDATION_ERROR",
				fields: {
					body: "Catatan internal wajib diisi.",
				},
			},
		});
		expect(emptyInternalNoteResponse.status).toBe(422);

		for (const role of ["REPORTER", "FACILITY_MANAGER"]) {
			const forbiddenResponse = await fetchWithSession(
				new Request("http://localhost/api/requests/request-1/internal-notes", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						role,
						body: "Catatan ini tidak boleh tersimpan.",
					}),
				}),
				{ DB: database } as unknown as Env,
			);

			await expect(forbiddenResponse.json()).resolves.toMatchObject({
				error: { code: "FORBIDDEN" },
			});
			expect(forbiddenResponse.status).toBe(403);
		}
	});

	it("returns not found when the selected request does not exist", async () => {
		const response = await fetchWithSession(
			new Request("http://localhost/api/requests/missing-request"),
			{ DB: new FakeWorkspaceD1Database(storedRequests) } as unknown as Env,
		);

		await expect(response.json()).resolves.toEqual({
			error: {
				code: "NOT_FOUND",
				message: "Laporan tidak ditemukan.",
			},
		});
		expect(response.status).toBe(404);
	});
});
