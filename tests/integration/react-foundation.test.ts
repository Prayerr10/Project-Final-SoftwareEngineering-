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

	it("renders request workspace search and filter controls", () => {
		const html = renderToString(createElement(App));

		expect(html).toContain("Request Workspace");
		expect(html).toContain("Cari laporan");
		expect(html).toContain("Filter Status");
		expect(html).toContain("Filter Prioritas");
		expect(html).toContain("Semua status");
		expect(html).toContain("Semua prioritas");
	});

	it("renders request detail and status history regions for selected reports", () => {
		const html = renderToString(createElement(App));

		expect(html).toContain("Detail Laporan");
		expect(html).toContain("Pilih laporan dari daftar untuk melihat detail.");
		expect(html).toContain("Riwayat Status");
	});

	it("renders the technician task lifecycle surface", () => {
		const html = renderToString(createElement(App));

		expect(html).toContain("Technician Tasks");
		expect(html).toContain("Daftar Tugas Teknisi");
		expect(html).toContain("Konteks Teknisi");
		expect(html).toContain("Catatan Progres atau Penyelesaian");
		expect(html).toContain("Tugas teknisi akan tampil sesuai assignment aktif.");
	});
});
