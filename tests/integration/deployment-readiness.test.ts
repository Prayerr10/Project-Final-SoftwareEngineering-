import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const readText = (path: string) => readFileSync(path, "utf8");
const activeConfigText = (path: string) =>
	readText(path)
		.split(/\r?\n/)
		.filter((line) => !line.trimStart().startsWith("//"))
		.join("\n");

describe("deployment readiness", () => {
	it("keeps Wrangler configured for the approved Worker entrypoint, assets, and D1 binding", () => {
		const wranglerConfig = readText("wrangler.jsonc");

		expect(wranglerConfig).toContain('"name": "campus-maintenance"');
		expect(wranglerConfig).toContain('"main": "worker/index.ts"');
		expect(wranglerConfig).toContain('"not_found_handling": "single-page-application"');
		expect(wranglerConfig).toContain('"binding": "DB"');
		expect(wranglerConfig).toContain('"database_name": "campus-maintenance-db"');
	});

	it("keeps deployment on free-tier-compatible Cloudflare services only", () => {
		const wranglerConfig = activeConfigText("wrangler.jsonc");

		expect(wranglerConfig).not.toMatch(/"r2_buckets"\s*:/);
		expect(wranglerConfig).not.toMatch(/"queues"\s*:/);
		expect(wranglerConfig).not.toMatch(/"services"\s*:\s*\[/);
		expect(wranglerConfig).not.toMatch(/"analytics_engine_datasets"\s*:/);
	});

	it("enforces strict request status and priority values at the D1 layer", () => {
		const migration = readText(
			"database/migrations/0006_enforce_request_status_priority.sql",
		);

		expect(migration).toContain(
			"trg_service_requests_status_priority_insert",
		);
		expect(migration).toContain(
			"trg_service_requests_status_priority_update",
		);
		expect(migration).toContain(
			"'SUBMITTED', 'UNDER_REVIEW', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'",
		);
		expect(migration).toContain("'LOW', 'MEDIUM', 'HIGH', 'URGENT'");
		expect(migration).toContain("RAISE(ABORT");
	});

	it("protects local secret files from being committed", () => {
		const gitignore = readText(".gitignore");

		expect(gitignore).toContain(".wrangler");
		expect(gitignore).toContain(".dev.vars*");
		expect(gitignore).toContain(".env*");
		expect(gitignore).toContain("!.dev.vars.example");
		expect(gitignore).toContain("!.env.example");
	});

	it("documents safe deployment readiness steps", () => {
		const readiness = readText("docs/deployment/deployment-readiness.md");

		expect(readiness).toContain("npm test -- --run");
		expect(readiness).toContain("npm run build");
		expect(readiness).toContain("wrangler d1 migrations apply campus-maintenance-db --remote");
		expect(readiness).toContain("wrangler secret put");
		expect(readiness).toContain("Secret Scan Result");
	});
});
