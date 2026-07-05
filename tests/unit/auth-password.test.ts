import { describe, expect, it } from "vitest";
import {
	PASSWORD_HASH_ALGORITHM,
	PASSWORD_HASH_ITERATIONS,
	hashPassword,
	verifyPassword,
} from "../../worker/auth";

describe("auth password hashing", () => {
	it("uses PBKDF2-SHA256 with the configured iteration count", () => {
		expect(PASSWORD_HASH_ALGORITHM).toBe("PBKDF2-SHA256");
		expect(PASSWORD_HASH_ITERATIONS).toBe(100_000);
	});

	it("hashes and verifies a password with a per-user salt", async () => {
		const salt = "unit-test-salt";
		const expectedHash = await hashPassword("demo-password", salt);

		await expect(
			verifyPassword("demo-password", salt, expectedHash),
		).resolves.toBe(true);
		await expect(
			verifyPassword("wrong-password", salt, expectedHash),
		).resolves.toBe(false);
	});

	it("produces different hashes for different salts", async () => {
		const firstHash = await hashPassword("same-password", "salt-a");
		const secondHash = await hashPassword("same-password", "salt-b");

		expect(firstHash).not.toBe(secondHash);
	});
});
