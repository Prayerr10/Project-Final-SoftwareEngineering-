import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import App from "../../src/App";

describe("React foundation shell", () => {
	it("renders a frontend status surface for exercising the Worker health API", () => {
		const html = renderToString(createElement(App));

		expect(html).toContain("Status Fondasi");
		expect(html).toContain("Memeriksa koneksi API dan D1");
	});

	it("renders reporter identity fields and Lecturer priority suggestion guidance", () => {
		const html = renderToString(createElement(App));

		expect(html).toContain("Nama Pelapor");
		expect(html).toContain("Tipe Pelapor");
		expect(html).toContain("Dosen mendapat saran prioritas HIGH");
	});
});
