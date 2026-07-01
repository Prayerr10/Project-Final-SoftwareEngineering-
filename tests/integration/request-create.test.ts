import { describe, expect, it, vi } from "vitest";
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
	created_at: string;
	updated_at: string;
};

type StoredStatusHistory = {
	request_id: string;
	from_status: string | null;
	to_status: string;
	changed_by_role: string;
	note: string;
};

class FakeD1Database {
	requests: StoredRequest[] = [];
	statusHistory: StoredStatusHistory[] = [];

	prepare(sql: string) {
		const database = this;

		return {
			bind(...values: unknown[]) {
				return {
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
								createdAt,
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
								created_at: createdAt ?? "",
								updated_at: updatedAt ?? "",
							});
						}

						if (sql.includes("INSERT INTO request_status_history")) {
							const [
								,
								requestId,
								fromStatus,
								toStatus,
								changedByRole,
								note,
							] = values as (string | null)[];

							database.statusHistory.push({
								request_id: requestId ?? "",
								from_status: fromStatus,
								to_status: toStatus ?? "",
								changed_by_role: changedByRole ?? "",
								note: note ?? "",
							});
						}

						return { success: true };
					},
				};
			},
			async all() {
				return {
					results: database.requests.map(
						({
							description: _description,
							created_at: _createdAt,
							updated_at: _updatedAt,
							...request
						}) => request,
					),
				};
			},
		};
	}
}

describe("POST /api/requests", () => {
	it("stores a complete Lecturer report with SUBMITTED status, HIGH suggestion, and initial status history", async () => {
		vi.spyOn(crypto, "randomUUID")
			.mockReturnValueOnce("request-1")
			.mockReturnValueOnce("history-1");
		const database = new FakeD1Database();

		const response = await worker.fetch(
			new Request("http://localhost/api/requests", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					role: "REPORTER",
					reporterName: "Dr. Mira Santoso",
					reporterType: "LECTURER",
					title: "Proyektor ruang 302 rusak",
					description: "Proyektor tidak menyala saat kelas pagi berlangsung.",
					location: "Gedung A, Ruang 302",
					category: "Peralatan Kelas",
				}),
			}),
			{ DB: database } as unknown as Env,
		);

		await expect(response.json()).resolves.toMatchObject({
			data: {
				id: "request-1",
				title: "Proyektor ruang 302 rusak",
				status: "SUBMITTED",
				priority: "MEDIUM",
				prioritySuggestion: "HIGH",
				reporterName: "Dr. Mira Santoso",
				reporterType: "LECTURER",
			},
		});
		expect(response.status).toBe(201);
		expect(database.requests).toHaveLength(1);
		expect(database.requests[0]).toMatchObject({
			id: "request-1",
			description: "Proyektor tidak menyala saat kelas pagi berlangsung.",
			priority: "MEDIUM",
			priority_suggestion: "HIGH",
			status: "SUBMITTED",
			reporter_name: "Dr. Mira Santoso",
			reporter_type: "LECTURER",
		});
		expect(database.statusHistory).toEqual([
			{
				request_id: "request-1",
				from_status: null,
				to_status: "SUBMITTED",
				changed_by_role: "REPORTER",
				note: "Laporan dibuat oleh Pelapor.",
			},
		]);
	});

	it("rejects missing reporter identity without storing a request or suggestion", async () => {
		const database = new FakeD1Database();

		const response = await worker.fetch(
			new Request("http://localhost/api/requests", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					role: "REPORTER",
					reporterType: "LECTURER",
					title: "AC ruang kelas tidak dingin",
					description: "AC menyala tetapi ruangan tetap panas sepanjang kuliah.",
					location: "Gedung B, Ruang 104",
					category: "AC",
				}),
			}),
			{ DB: database } as unknown as Env,
		);

		await expect(response.json()).resolves.toEqual({
			error: {
				code: "VALIDATION_ERROR",
				message: "Input tidak valid.",
				fields: {
					reporterName: "Nama pelapor wajib diisi.",
				},
			},
		});
		expect(response.status).toBe(422);
		expect(database.requests).toHaveLength(0);
		expect(database.statusHistory).toHaveLength(0);
	});
});
