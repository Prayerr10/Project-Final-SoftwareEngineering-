import { describe, expect, it } from "vitest";

function validDescription(text: string) {
	return text.trim().length >= 20;
}

describe("validasi deskripsi laporan", () => {
	it("menolak deskripsi yang terlalu pendek", () => {
		expect(validDescription("rusak")).toBe(false);
	});

	it("menerima deskripsi minimal 20 karakter", () => {
		expect(validDescription("Proyektor tidak menyala sejak pagi.")).toBe(true);
	});
});
