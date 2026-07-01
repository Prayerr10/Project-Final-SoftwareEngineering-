import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { readFileSync } from "node:fs";
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

	it("keeps Create Request bound to the selected Reporter role context", () => {
		const appSource = readFileSync("src/App.tsx", "utf8");
		const submitRequestSource = appSource.slice(
			appSource.indexOf("async function submitRequest"),
			appSource.indexOf("function clearFilters"),
		);

		expect(submitRequestSource).toContain('activeRole !== "REPORTER"');
		expect(submitRequestSource).toContain("role: activeRole");
		expect(submitRequestSource).not.toContain('role: "REPORTER",');
		expect(appSource).toContain('activeRole === "REPORTER" ?');
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

	it("renders public comment and internal note controls for the request detail surface", () => {
		const html = renderToString(createElement(App));

		expect(html).toContain("Komentar Publik");
		expect(html).toContain("Catatan Internal");
		expect(html).toContain("Tambah Komentar");
		expect(html).toContain("Tambah Catatan Internal");
	});

	it("renders the technician task lifecycle surface", () => {
		const html = renderToString(createElement(App));

		expect(html).toContain("Technician Tasks");
		expect(html).toContain("Daftar Tugas Teknisi");
		expect(html).toContain("Konteks Teknisi");
		expect(html).toContain("Catatan Progres atau Penyelesaian");
		expect(html).toContain("Tugas teknisi akan tampil sesuai assignment aktif.");
	});

	it("renders confirmation, close, and reopen workflow surfaces", () => {
		const html = renderToString(createElement(App));

		expect(html).toContain("Konfirmasi Pelapor");
		expect(html).toContain("Belum ada konfirmasi Pelapor");
		expect(html).toContain("Catatan Konfirmasi");
		expect(html).toContain("Catatan Close");
		expect(html).toContain("Manual override tanpa konfirmasi Pelapor");
		expect(html).toContain("Catatan Reopen");
	});

	it("renders the read-only operational dashboard surface with workload source-data guardrails", () => {
		const html = renderToString(createElement(App));

		expect(html).toContain("Dashboard Operasional");
		expect(html).toContain("Total Laporan");
		expect(html).toContain("Workload Source Data per Teknisi");
		expect(html).toContain("final workload formula remains OPEN-07");
		expect(html).toContain("OPEN-10: dashboard tidak menampilkan konten Catatan Internal");
		expect(html).toContain("Belum ada source data assignment aktif untuk Teknisi.");
	});
});
