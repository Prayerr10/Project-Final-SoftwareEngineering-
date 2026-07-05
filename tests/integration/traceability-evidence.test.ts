import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const readText = (path: string) => readFileSync(path, "utf8");
const traceability = () => readText("docs/requirements/traceability.md");

const tableRowFor = (id: string) => {
	const row = traceability()
		.split(/\r?\n/)
		.find((line) => line.startsWith(`| ${id} |`));

	if (!row) {
		throw new Error(`Missing traceability row for ${id}`);
	}

	return row;
};

describe("final traceability and human review evidence", () => {
	it("links every FR and NFR row to a GitHub issue and completed status", () => {
		const requirementIds = [
			...Array.from({ length: 24 }, (_, index) => `FR-${String(index + 1).padStart(2, "0")}`),
			...Array.from({ length: 9 }, (_, index) => `NFR-${String(index + 1).padStart(2, "0")}`),
		];

		for (const id of requirementIds) {
			const row = tableRowFor(id);

			expect(row, id).toMatch(/#\d+/);
			expect(row, id).toContain("Selesai");
		}
	});

	it("links every business rule to at least one GitHub issue", () => {
		for (const id of Array.from({ length: 12 }, (_, index) => `BR-${String(index + 1).padStart(2, "0")}`)) {
			const row = tableRowFor(id);

			expect(row, id).toMatch(/#\d+/);
			expect(row, id).toContain("Selesai");
		}
	});

	it("keeps implementation evidence for issues 13 through 24 with exact reviewer and PASS decision", () => {
		for (const issueNumber of Array.from({ length: 12 }, (_, index) => index + 13)) {
			const evidence = readText(`evidence/human-review-implementation-issue-${issueNumber}.md`);

			expect(evidence, `issue ${issueNumber}`).toContain("Prayer Yosua Immanuel Kaawoan");
			expect(evidence, `issue ${issueNumber}`).toMatch(/(^|\r?\n)PASS(\r?\n|$)|- \[x\] PASS/);
		}
	});

	it("records the final traceability review as PASS", () => {
		const matrix = traceability();

		expect(matrix).toContain("| Review Status | PASS for Issue #24 final traceability and evidence audit |");
		expect(matrix).toContain("| Human decision | PASS |");
		expect(tableRowFor("NFR-07")).toContain("Selesai untuk Issue #24");
		expect(tableRowFor("NFR-08")).toContain("Selesai untuk Issue #24");
	});
});
