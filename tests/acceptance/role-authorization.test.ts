import { describe, expect, it } from "vitest";
import { fetchWithSession } from "../helpers/auth";

class NoDbShouldBeUsed {
	prepare() {
		throw new Error("DB should not be reached before authorization rejects.");
	}
}

describe("acceptance: backend role authorization", () => {
	it("blocks Reporter from reviewing even when the payload claims Administrator", async () => {
		const response = await fetchWithSession(
			new Request("http://localhost/api/requests/request-1/review", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					role: "ADMINISTRATOR",
					note: "Coba akses endpoint admin.",
				}),
			}),
			{ DB: new NoDbShouldBeUsed() } as unknown as Env,
			"REPORTER",
		);

		await expect(response.json()).resolves.toMatchObject({
			error: { code: "FORBIDDEN" },
		});
		expect(response.status).toBe(403);
	});

	it("blocks Technician from opening another technician task URL", async () => {
		const response = await fetchWithSession(
			new Request(
				"http://localhost/api/technicians/tech-other/tasks?technicianId=tech-1",
			),
			{ DB: new NoDbShouldBeUsed() } as unknown as Env,
			"TECHNICIAN",
		);

		await expect(response.json()).resolves.toMatchObject({
			error: { code: "FORBIDDEN" },
		});
		expect(response.status).toBe(403);
	});

	it("blocks Administrator from reporter-only resolution confirmation", async () => {
		const response = await fetchWithSession(
			new Request("http://localhost/api/requests/request-1/confirm-resolution", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					role: "REPORTER",
					confirmationNote: "Payload mencoba mengaku Pelapor.",
				}),
			}),
			{ DB: new NoDbShouldBeUsed() } as unknown as Env,
			"ADMINISTRATOR",
		);

		await expect(response.json()).resolves.toMatchObject({
			error: { code: "FORBIDDEN" },
		});
		expect(response.status).toBe(403);
	});
});
