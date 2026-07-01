import { describe, expect, it } from "vitest";
import worker from "../../worker";

describe("GET /api/health", () => {
	it("returns an explicit healthy response after checking the D1 binding", async () => {
		const statements: string[] = [];
		const env = {
			DB: {
				prepare(sql: string) {
					statements.push(sql);
					return {
						first: async () => ({ ready: 1 }),
					};
				},
			},
		};

		const response = await worker.fetch(
			new Request("http://localhost/api/health"),
			env as Env,
		);

		await expect(response.json()).resolves.toEqual({
			status: "healthy",
			service: "campus-maintenance",
			checks: {
				api: "ok",
				d1: "ok",
			},
		});
		expect(response.status).toBe(200);
		expect(statements).toEqual(["SELECT 1 AS ready"]);
	});
});
