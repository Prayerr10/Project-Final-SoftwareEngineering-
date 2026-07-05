import { describe, expect, it } from "vitest";
import worker from "../../worker";

const AUTH_SECRET = "test-only-secret-for-login-integration";

type UserRow = {
	id: string;
	username: string;
	password_hash: string;
	salt: string;
	role: string;
	display_name: string;
	created_at: string;
};

class FakeAuthD1Database {
	constructor(private readonly users: UserRow[]) {}

	prepare(sql: string) {
		const database = this;

		return {
			bind(...values: unknown[]) {
				return {
					async first() {
						if (sql.includes("FROM users")) {
							const [username] = values as string[];

							return (
								database.users.find((user) => user.username === username) ??
								null
							);
						}

						return null;
					},
				};
			},
		};
	}
}

const users: UserRow[] = [
	{
		id: "user-admin-demo",
		username: "admin_demo",
		password_hash: "ORSsibBNIr66H8qitNUnEy6WUueSZcu551wCkX3ODEA",
		salt: "XYdyt5D9Qb3Q_x1BBvGO-g",
		role: "administrator",
		display_name: "Administrator Demo",
		created_at: "2026-07-05T00:00:00.000Z",
	},
];

describe("POST /api/auth/login", () => {
	it("sets an httpOnly session cookie and returns only public user fields", async () => {
		const response = await worker.fetch(
			new Request("http://localhost/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: "admin_demo",
					password: "admin123",
				}),
			}),
			{
				DB: new FakeAuthD1Database(users),
				AUTH_SECRET,
			} as unknown as Env,
		);
		const body = await response.json();
		const serializedBody = JSON.stringify(body);

		expect(response.status).toBe(200);
		expect(response.headers.get("Set-Cookie")).toContain("csr_session=");
		expect(response.headers.get("Set-Cookie")).toContain("HttpOnly");
		expect(body).toMatchObject({
			data: {
				id: "user-admin-demo",
				username: "admin_demo",
				role: "administrator",
				appRole: "ADMINISTRATOR",
				displayName: "Administrator Demo",
			},
		});
		expect(serializedBody).not.toContain("password_hash");
		expect(serializedBody).not.toContain("salt");
	});

	it("returns a generic failure message for wrong credentials", async () => {
		const response = await worker.fetch(
			new Request("http://localhost/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: "admin_demo",
					password: "wrong-password",
				}),
			}),
			{
				DB: new FakeAuthD1Database(users),
				AUTH_SECRET,
			} as unknown as Env,
		);

		await expect(response.json()).resolves.toEqual({
			error: {
				code: "AUTHENTICATION_FAILED",
				message: "Username atau password salah.",
			},
		});
		expect(response.status).toBe(401);
	});

	it("uses the same generic failure message for unknown usernames", async () => {
		const response = await worker.fetch(
			new Request("http://localhost/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: "missing_user",
					password: "admin123",
				}),
			}),
			{
				DB: new FakeAuthD1Database(users),
				AUTH_SECRET,
			} as unknown as Env,
		);

		await expect(response.json()).resolves.toMatchObject({
			error: {
				code: "AUTHENTICATION_FAILED",
				message: "Username atau password salah.",
			},
		});
		expect(response.status).toBe(401);
	});
});
