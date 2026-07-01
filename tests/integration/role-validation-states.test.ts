import { describe, expect, it } from "vitest";
import worker from "../../worker";

class ReviewConflictD1 {
	prepare(sql: string) {
		return {
			bind() {
				return {
					async first() {
						if (sql.includes("FROM service_requests")) {
							return {
								id: "request-1",
								request_number: "CSR-1",
								title: "AC tidak dingin",
								location: "Gedung B",
								category: "AC",
								priority: "MEDIUM",
								priority_suggestion: null,
								status: "ASSIGNED",
								reporter_name: "Budi",
								reporter_type: "STUDENT",
								reviewed_at: null,
								reviewed_by_role: null,
							};
						}

						return null;
					},
				};
			},
		};
	}
}

describe("role-based API validation states", () => {
	it("returns forbidden when an unsupported role opens the dashboard", async () => {
		const response = await worker.fetch(
			new Request("http://localhost/api/dashboard/summary?role=REPORTER"),
			{} as Env,
		);

		await expect(response.json()).resolves.toEqual({
			error: {
				code: "FORBIDDEN",
				message: "Role aktif tidak boleh melakukan aksi ini.",
			},
		});
		expect(response.status).toBe(403);
	});

	it("returns validation fields before creating a request with missing reporter identity", async () => {
		const response = await worker.fetch(
			new Request("http://localhost/api/requests", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					role: "REPORTER",
					title: "Internet putus",
					description: "Internet ruang kelas tidak dapat digunakan.",
					location: "Gedung A",
					category: "Internet",
				}),
			}),
			{} as Env,
		);

		await expect(response.json()).resolves.toMatchObject({
			error: {
				code: "VALIDATION_ERROR",
				fields: {
					reporterName: "Nama pelapor wajib diisi.",
					reporterType: "Tipe pelapor harus STUDENT atau LECTURER.",
				},
			},
		});
		expect(response.status).toBe(422);
	});

	it("returns invalid transition conflict for a role-valid but status-invalid action", async () => {
		const response = await worker.fetch(
			new Request("http://localhost/api/requests/request-1/review", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					role: "ADMINISTRATOR",
					note: "Coba review ulang.",
				}),
			}),
			{ DB: new ReviewConflictD1() } as unknown as Env,
		);

		await expect(response.json()).resolves.toMatchObject({
			error: {
				code: "INVALID_STATUS_TRANSITION",
				currentStatus: "ASSIGNED",
				allowedStatuses: ["UNDER_REVIEW"],
			},
		});
		expect(response.status).toBe(409);
	});
});
