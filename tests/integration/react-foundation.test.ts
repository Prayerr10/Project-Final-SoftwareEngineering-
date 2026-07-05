import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import App from "../../src/App";

describe("React login and role-gated shell", () => {
	it("renders the protected login landing before a session exists", () => {
		const html = renderToString(createElement(App));

		expect(html).toContain("Campus Service Request");
		expect(html).toContain("Memeriksa sesi login dan koneksi aplikasi.");
		expect(html).not.toContain("Simulasi Role");
	});

	it("defines a real login surface with four role entry points", () => {
		const appSource = readFileSync("src/App.tsx", "utf8");

		expect(appSource).toContain("Login sebagai apa?");
		expect(appSource).toContain("Form Login");
		expect(appSource).toContain("selectedLoginRole");
		expect(appSource).toContain("/api/auth/login");
		expect(appSource).toContain("pelapor");
		expect(appSource).toContain("administrator");
		expect(appSource).toContain("teknisi");
		expect(appSource).toContain("manajer_fasilitas");
	});

	it("keeps Create Request protected by Reporter session without sending role in payload", () => {
		const appSource = readFileSync("src/App.tsx", "utf8");
		const submitRequestSource = appSource.slice(
			appSource.indexOf("async function submitRequest"),
			appSource.indexOf("function clearFilters"),
		);

		expect(submitRequestSource).toContain('activeRole !== "REPORTER"');
		expect(submitRequestSource).toContain('credentials: "same-origin"');
		expect(submitRequestSource).not.toContain("role: activeRole");
		expect(submitRequestSource).not.toContain('role: "REPORTER"');
		expect(appSource).toContain('activeRole === "REPORTER" &&');
	});

	it("uses auth session endpoints and visible logout instead of role simulation", () => {
		const appSource = readFileSync("src/App.tsx", "utf8");

		expect(appSource).toContain("/api/auth/me");
		expect(appSource).toContain("/api/auth/logout");
		expect(appSource).toContain("Sesi Aktif");
		expect(appSource).toContain("Logout");
		expect(appSource).not.toContain("Role aktif mengatur tampilan aksi");
	});

	it("renders request workspace controls only behind role-gated source", () => {
		const appSource = readFileSync("src/App.tsx", "utf8");

		expect(appSource).toContain("Request Workspace");
		expect(appSource).toContain("Cari laporan");
		expect(appSource).toContain("Filter Status");
		expect(appSource).toContain("Filter Prioritas");
		expect(appSource).toContain('hidden={activeRole === "FACILITY_MANAGER"}');
	});

	it("keeps request detail, status history, and comments in the authenticated workspace", () => {
		const appSource = readFileSync("src/App.tsx", "utf8");

		expect(appSource).toContain("Detail Laporan");
		expect(appSource).toContain("Pilih laporan dari daftar untuk melihat detail.");
		expect(appSource).toContain("Riwayat Status");
		expect(appSource).toContain("Komentar Publik");
		expect(appSource).toContain("Tambah Komentar");
	});

	it("gates internal notes by Administrator or Technician session", () => {
		const appSource = readFileSync("src/App.tsx", "utf8");

		expect(appSource).toContain("const canUseInternalNotes");
		expect(appSource).toContain('activeRole === "ADMINISTRATOR"');
		expect(appSource).toContain('activeRole === "TECHNICIAN"');
		expect(appSource).toContain("canUseInternalNotes &&");
		expect(appSource).toContain("Tambah Catatan Internal");
	});

	it("keeps Technician task lifecycle bound to the logged-in technician account", () => {
		const appSource = readFileSync("src/App.tsx", "utf8");

		expect(appSource).toContain("Technician Tasks");
		expect(appSource).toContain("Daftar Tugas Teknisi");
		expect(appSource).toContain("Tugas ditampilkan untuk akun teknisi yang sedang login");
		expect(appSource).toContain("Catatan Progres atau Penyelesaian");
		expect(appSource).not.toContain("technicianContextOptions");
	});

	it("keeps dashboard, confirmation, close, and reopen surfaces role-gated", () => {
		const appSource = readFileSync("src/App.tsx", "utf8");

		expect(appSource).toContain("Dashboard Operasional");
		expect(appSource).toContain("Total Laporan");
		expect(appSource).toContain("Beban Kerja Teknisi");
		expect(appSource).toContain("Konfirmasi Pelapor");
		expect(appSource).toContain("Catatan Close");
		expect(appSource).toContain("Catatan Reopen");
	});
});
