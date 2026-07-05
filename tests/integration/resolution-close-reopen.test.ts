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

type StoredStatusHistory = {
	id: string;
	request_id: string;
	from_status: string | null;
	to_status: string;
	changed_by_role: string;
	note: string;
	created_at: string;
};

type StoredReporterConfirmation = {
	id: string;
	request_id: string;
	confirmed_by_role: string;
	confirmation_note: string | null;
	confirmed_at: string;
};

class FakeResolutionD1Database {
	statusHistory: StoredStatusHistory[] = [];
	confirmations: StoredReporterConfirmation[] = [];

	constructor(private requests: StoredRequest[]) {}

	prepare(sql: string) {
		const database = this;

		return {
			bind(...values: unknown[]) {
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

						if (sql.includes("FROM service_requests")) {
							const [requestId] = values as string[];
							return (
								database.requests.find((request) => request.id === requestId) ??
								null
							);
						}

						return null;
					},
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

						return { results: [] };
					},
					async run() {
						if (sql.includes("INSERT INTO reporter_confirmations")) {
							const [id, requestId, confirmationNote, confirmedAt] =
								values as [string, string, string | null, string];

							database.confirmations.push({
								id,
								request_id: requestId,
								confirmed_by_role: "REPORTER",
								confirmation_note: confirmationNote,
								confirmed_at: confirmedAt,
							});
						}

						if (
							sql.includes("UPDATE service_requests") &&
							sql.includes("status = 'CLOSED'")
						) {
							const [closedAt, manualOverrideUsed, manualOverrideNote, updatedAt, requestId] =
								values as [string, number, string | null, string, string];
							const storedRequest = database.requests.find(
								(request) => request.id === requestId,
							);

							if (storedRequest) {
								storedRequest.status = "CLOSED";
								storedRequest.closed_at = closedAt;
								storedRequest.closed_by_role = "ADMINISTRATOR";
								storedRequest.manual_override_used = manualOverrideUsed;
								storedRequest.manual_override_note = manualOverrideNote;
								storedRequest.updated_at = updatedAt;
							}
						}

						if (
							sql.includes("UPDATE service_requests") &&
							sql.includes("status = 'UNDER_REVIEW'")
						) {
							const [updatedAt, requestId] = values as string[];
							const storedRequest = database.requests.find(
								(request) => request.id === requestId,
							);

							if (storedRequest) {
								storedRequest.status = "UNDER_REVIEW";
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

function resolvedRequest(overrides: Partial<StoredRequest> = {}): StoredRequest {
	return {
		id: "request-1",
		request_number: "CSR-001",
		title: "Proyektor ruang 302 rusak",
		description: "Proyektor tidak menyala saat kelas berlangsung.",
		location: "Gedung A, Ruang 302",
		category: "Peralatan Kelas",
		priority: "HIGH",
		priority_suggestion: "HIGH",
		status: "RESOLVED",
		reporter_name: "Dr. Mira Santoso",
		reporter_type: "LECTURER",
		reviewed_at: "2026-07-01T02:10:00.000Z",
		reviewed_by_role: "ADMINISTRATOR",
		closed_at: null,
		closed_by_role: null,
		manual_override_used: 0,
		manual_override_note: null,
		created_at: "2026-07-01T02:00:00.000Z",
		updated_at: "2026-07-01T03:00:00.000Z",
		...overrides,
	};
}

describe("resolution confirmation, close, and reopen workflow", () => {
	it("lets Reporter confirm a RESOLVED report without changing the six-status workflow", async () => {
		vi.spyOn(crypto, "randomUUID").mockReturnValueOnce("confirmation-1");
		const database = new FakeResolutionD1Database([resolvedRequest()]);

		const response = await fetchWithSession(
			new Request(
				"http://localhost/api/requests/request-1/confirm-resolution",
				{
					method: "PATCH",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						role: "REPORTER",
						confirmationNote: "Hasil perbaikan sudah diterima.",
					}),
				},
			),
			{ DB: database } as unknown as Env,
		);

		await expect(response.json()).resolves.toMatchObject({
			data: {
				id: "confirmation-1",
				requestId: "request-1",
				confirmedByRole: "REPORTER",
				confirmationNote: "Hasil perbaikan sudah diterima.",
			},
		});
		expect(response.status).toBe(200);
		expect(database.requests[0].status).toBe("RESOLVED");
		expect(database.statusHistory).toHaveLength(0);
		expect(database.confirmations).toMatchObject([
			{
				id: "confirmation-1",
				request_id: "request-1",
				confirmed_by_role: "REPORTER",
				confirmation_note: "Hasil perbaikan sudah diterima.",
			},
		]);
	});

	it("lets Administrator close a RESOLVED report after Reporter confirmation and appends history", async () => {
		vi.spyOn(crypto, "randomUUID").mockReturnValueOnce("history-close");
		const database = new FakeResolutionD1Database([resolvedRequest()]);
		database.confirmations.push({
			id: "confirmation-1",
			request_id: "request-1",
			confirmed_by_role: "REPORTER",
			confirmation_note: "Hasil diterima.",
			confirmed_at: "2026-07-01T03:10:00.000Z",
		});

		const response = await fetchWithSession(
			new Request("http://localhost/api/requests/request-1/close", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					role: "ADMINISTRATOR",
					note: "Laporan ditutup setelah konfirmasi Pelapor.",
					manualOverride: false,
				}),
			}),
			{ DB: database } as unknown as Env,
		);

		await expect(response.json()).resolves.toMatchObject({
			data: {
				id: "request-1",
				status: "CLOSED",
			},
		});
		expect(response.status).toBe(200);
		expect(database.requests[0]).toMatchObject({
			status: "CLOSED",
			closed_by_role: "ADMINISTRATOR",
			manual_override_used: 0,
			manual_override_note: null,
		});
		expect(database.statusHistory).toMatchObject([
			{
				id: "history-close",
				from_status: "RESOLVED",
				to_status: "CLOSED",
				changed_by_role: "ADMINISTRATOR",
				note: "Laporan ditutup setelah konfirmasi Pelapor.",
			},
		]);
	});

	it("requires manual override data to close without Reporter confirmation", async () => {
		const missingOverrideResponse = await fetchWithSession(
			new Request("http://localhost/api/requests/request-1/close", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					role: "ADMINISTRATOR",
					note: "Tutup tanpa konfirmasi.",
					manualOverride: false,
				}),
			}),
			{ DB: new FakeResolutionD1Database([resolvedRequest()]) } as unknown as Env,
		);

		await expect(missingOverrideResponse.json()).resolves.toMatchObject({
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
		expect(missingOverrideResponse.status).toBe(422);

		const missingNoteResponse = await fetchWithSession(
			new Request("http://localhost/api/requests/request-1/close", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					role: "ADMINISTRATOR",
					note: "Tutup tanpa konfirmasi.",
					manualOverride: true,
					manualOverrideNote: " ",
				}),
			}),
			{ DB: new FakeResolutionD1Database([resolvedRequest()]) } as unknown as Env,
		);

		await expect(missingNoteResponse.json()).resolves.toMatchObject({
			error: {
				code: "VALIDATION_ERROR",
				fields: {
					manualOverrideNote: "Catatan manual override wajib diisi.",
				},
			},
		});
		expect(missingNoteResponse.status).toBe(422);
	});

	it("lets Administrator close without confirmation only when manual override data is supplied", async () => {
		vi.spyOn(crypto, "randomUUID").mockReturnValueOnce("history-override-close");
		const database = new FakeResolutionD1Database([resolvedRequest()]);

		const response = await fetchWithSession(
			new Request("http://localhost/api/requests/request-1/close", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					role: "ADMINISTRATOR",
					note: "Laporan ditutup dengan override manual.",
					manualOverride: true,
					manualOverrideNote: "Pelapor tidak merespons setelah follow-up manual.",
				}),
			}),
			{ DB: database } as unknown as Env,
		);

		await expect(response.json()).resolves.toMatchObject({
			data: {
				status: "CLOSED",
			},
		});
		expect(response.status).toBe(200);
		expect(database.requests[0]).toMatchObject({
			status: "CLOSED",
			manual_override_used: 1,
			manual_override_note: "Pelapor tidak merespons setelah follow-up manual.",
		});
		expect(database.statusHistory).toMatchObject([
			{
				id: "history-override-close",
				from_status: "RESOLVED",
				to_status: "CLOSED",
				changed_by_role: "ADMINISTRATOR",
			},
		]);
	});

	it("reopens a CLOSED report to UNDER_REVIEW and appends BR-08 status history", async () => {
		vi.spyOn(crypto, "randomUUID").mockReturnValueOnce("history-reopen");
		const database = new FakeResolutionD1Database([
			resolvedRequest({
				status: "CLOSED",
				closed_at: "2026-07-01T03:20:00.000Z",
				closed_by_role: "ADMINISTRATOR",
			}),
		]);

		const response = await fetchWithSession(
			new Request("http://localhost/api/requests/request-1/reopen", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					role: "ADMINISTRATOR",
					note: "Masalah muncul kembali dan perlu ditinjau ulang.",
				}),
			}),
			{ DB: database } as unknown as Env,
		);

		await expect(response.json()).resolves.toMatchObject({
			data: {
				id: "request-1",
				status: "UNDER_REVIEW",
			},
		});
		expect(response.status).toBe(200);
		expect(database.statusHistory).toMatchObject([
			{
				id: "history-reopen",
				request_id: "request-1",
				from_status: "CLOSED",
				to_status: "UNDER_REVIEW",
				changed_by_role: "ADMINISTRATOR",
				note: "Masalah muncul kembali dan perlu ditinjau ulang.",
			},
		]);
	});

	it("covers forbidden roles and invalid transitions for Issue 19 endpoints", async () => {
		const administratorConfirmResponse = await fetchWithSession(
			new Request(
				"http://localhost/api/requests/request-1/confirm-resolution",
				{
					method: "PATCH",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						role: "ADMINISTRATOR",
						confirmationNote: "Admin tidak boleh konfirmasi sebagai Pelapor.",
					}),
				},
			),
			{ DB: new FakeResolutionD1Database([resolvedRequest()]) } as unknown as Env,
		);

		await expect(administratorConfirmResponse.json()).resolves.toMatchObject({
			error: { code: "FORBIDDEN" },
		});
		expect(administratorConfirmResponse.status).toBe(403);

		const reporterCloseResponse = await fetchWithSession(
			new Request("http://localhost/api/requests/request-1/close", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					role: "REPORTER",
					note: "Pelapor tidak boleh close.",
				}),
			}),
			{ DB: new FakeResolutionD1Database([resolvedRequest()]) } as unknown as Env,
		);

		await expect(reporterCloseResponse.json()).resolves.toMatchObject({
			error: { code: "FORBIDDEN" },
		});
		expect(reporterCloseResponse.status).toBe(403);

		const reporterReopenResponse = await fetchWithSession(
			new Request("http://localhost/api/requests/request-1/reopen", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					role: "REPORTER",
					note: "Pelapor tidak diberi kewenangan reopen langsung.",
				}),
			}),
			{ DB: new FakeResolutionD1Database([resolvedRequest({ status: "CLOSED" })]) } as unknown as Env,
		);

		await expect(reporterReopenResponse.json()).resolves.toMatchObject({
			error: { code: "FORBIDDEN" },
		});
		expect(reporterReopenResponse.status).toBe(403);

		const confirmWrongStatusResponse = await fetchWithSession(
			new Request(
				"http://localhost/api/requests/request-1/confirm-resolution",
				{
					method: "PATCH",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						role: "REPORTER",
						confirmationNote: "Belum resolved.",
					}),
				},
			),
			{ DB: new FakeResolutionD1Database([resolvedRequest({ status: "IN_PROGRESS" })]) } as unknown as Env,
		);

		await expect(confirmWrongStatusResponse.json()).resolves.toMatchObject({
			error: {
				code: "INVALID_STATUS_TRANSITION",
				currentStatus: "IN_PROGRESS",
				allowedStatuses: ["RESOLVED"],
			},
		});
		expect(confirmWrongStatusResponse.status).toBe(409);

		const closeWrongStatusResponse = await fetchWithSession(
			new Request("http://localhost/api/requests/request-1/close", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					role: "ADMINISTRATOR",
					note: "Tidak boleh tutup sebelum resolved.",
					manualOverride: true,
					manualOverrideNote: "Override tetap butuh status RESOLVED.",
				}),
			}),
			{ DB: new FakeResolutionD1Database([resolvedRequest({ status: "IN_PROGRESS" })]) } as unknown as Env,
		);

		await expect(closeWrongStatusResponse.json()).resolves.toMatchObject({
			error: {
				code: "INVALID_STATUS_TRANSITION",
				currentStatus: "IN_PROGRESS",
				allowedStatuses: ["RESOLVED"],
			},
		});
		expect(closeWrongStatusResponse.status).toBe(409);

		const reopenWrongStatusResponse = await fetchWithSession(
			new Request("http://localhost/api/requests/request-1/reopen", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					role: "ADMINISTRATOR",
					note: "Belum closed.",
				}),
			}),
			{ DB: new FakeResolutionD1Database([resolvedRequest()]) } as unknown as Env,
		);

		await expect(reopenWrongStatusResponse.json()).resolves.toMatchObject({
			error: {
				code: "INVALID_STATUS_TRANSITION",
				currentStatus: "RESOLVED",
				allowedStatuses: ["CLOSED"],
			},
		});
		expect(reopenWrongStatusResponse.status).toBe(409);
	});
});
