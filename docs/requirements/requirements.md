# Requirements Specification

| Review Status | Human Reviewed Draft |
| --- | --- |
| AI assistance | Draft awal dibuat dengan bantuan AI, diperiksa melalui sesi `grill-with-docs`, lalu dirapikan memakai skill `03-specification`. |
| Human decision | Keputusan final tetap berada pada project owner. |

## Source Summary

Specification ini diturunkan dari `docs/requirements/elicitation.md`, `CASE.md`, `instruksi-dosen.md`, dan hasil human review pada `evidence/2026-06-30-grill-with-docs-requirements-review.md`. Item berstatus `FACT` berasal dari instruksi resmi atau case. Item berstatus `ASSUMPTION` berasal dari keputusan human-reviewed yang masih perlu dijaga dalam validasi akhir.

## Functional Requirements

### FR-01 - Create Service Request

- Statement: Sistem harus memungkinkan Pelapor membuat laporan masalah fasilitas kampus.
- Stakeholder: Pelapor
- Source: EL-01
- Status: FACT

### FR-02 - Store Reporter Data

- Statement: Sistem harus menyimpan nama pelapor dan tipe pelapor pada laporan.
- Stakeholder: Pelapor
- Source: EL-04
- Status: ASSUMPTION

### FR-03 - View Request List

- Statement: Sistem harus menampilkan daftar laporan yang tersimpan.
- Stakeholder: Pelapor, Administrator, Teknisi, Manajer Fasilitas
- Source: EL-02, EL-05, EL-10, EL-13
- Status: FACT

### FR-04 - Search Requests

- Statement: Sistem harus memungkinkan pengguna mencari laporan berdasarkan nomor laporan, judul, lokasi, atau kategori.
- Stakeholder: Pelapor, Administrator, Teknisi, Manajer Fasilitas
- Source: EL-18
- Status: ASSUMPTION

### FR-05 - Filter Requests

- Statement: Sistem harus memungkinkan pengguna menyaring laporan dengan kombinasi status, kategori, prioritas, atau teknisi.
- Stakeholder: Pelapor, Administrator, Teknisi, Manajer Fasilitas
- Source: EL-18
- Status: ASSUMPTION

### FR-06 - View Request Detail

- Statement: Sistem harus menampilkan detail laporan yang dipilih, termasuk deskripsi, lokasi, kategori, prioritas, status, komentar, riwayat status, dan penugasan teknisi jika tersedia.
- Stakeholder: Pelapor, Administrator, Teknisi, Manajer Fasilitas
- Source: EL-02, EL-10, EL-13
- Status: FACT

### FR-07 - Review Submitted Request

- Statement: Sistem harus memungkinkan Administrator memeriksa laporan baru sebelum laporan diproses lanjut.
- Stakeholder: Administrator
- Source: EL-05
- Status: FACT

### FR-08 - Set Category

- Statement: Sistem harus memungkinkan Administrator menentukan kategori laporan dari controlled vocabulary.
- Stakeholder: Administrator
- Source: EL-06, EL-C-02
- Status: FACT

### FR-09 - Set Priority

- Statement: Sistem harus memungkinkan Administrator menentukan prioritas laporan dari controlled vocabulary.
- Stakeholder: Administrator
- Source: EL-06
- Status: FACT

### FR-10 - Assign Technician

- Statement: Sistem harus memungkinkan Administrator menugaskan laporan kepada teknisi yang terdaftar.
- Stakeholder: Administrator, Teknisi
- Source: EL-07, EL-C-04
- Status: FACT

### FR-11 - Update Work Status

- Statement: Sistem harus memungkinkan Teknisi memperbarui status pekerjaan menjadi in progress dan resolved sesuai alur kerja.
- Stakeholder: Teknisi
- Source: EL-11
- Status: FACT

### FR-12 - Add Public Comment

- Statement: Sistem harus memungkinkan pengguna menambahkan komentar publik pada laporan.
- Stakeholder: Pelapor, Administrator, Teknisi
- Source: EL-03, EL-12
- Status: FACT

### FR-13 - Add Internal Note

- Statement: Sistem harus memungkinkan Administrator dan Teknisi menambahkan catatan internal pada laporan.
- Stakeholder: Administrator, Teknisi
- Source: EL-12, EL-C-05
- Status: ASSUMPTION

### FR-14 - Record Status History

- Statement: Sistem harus menyimpan riwayat setiap perubahan status, termasuk status asal, status tujuan, role pengubah, catatan, dan waktu perubahan.
- Stakeholder: Semua role
- Source: EL-17
- Status: ASSUMPTION

### FR-15 - Close Request

- Statement: Sistem harus memungkinkan Administrator menutup laporan setelah pekerjaan selesai dan hasil dikonfirmasi atau melalui manual override dengan catatan.
- Stakeholder: Administrator, Pelapor
- Source: EL-08, EL-09
- Status: ASSUMPTION

### FR-16 - Reopen Request

- Statement: Sistem harus memungkinkan Administrator membuka kembali laporan yang sudah ditutup dan mengembalikannya ke status under review.
- Stakeholder: Administrator
- Source: EL-08, EL-C-03
- Status: ASSUMPTION

### FR-17 - Show Operational Dashboard

- Statement: Sistem harus menampilkan dashboard operasional berisi ringkasan laporan.
- Stakeholder: Manajer Fasilitas
- Source: EL-13
- Status: FACT

### FR-18 - Show Technician Workload

- Statement: Sistem harus menampilkan beban tugas per teknisi pada dashboard.
- Stakeholder: Manajer Fasilitas
- Source: EL-14, EL-C-04
- Status: ASSUMPTION

### FR-19 - Apply Role-Based UI

- Statement: Sistem harus menyesuaikan aksi dan informasi pada UI berdasarkan role aktif pada simulasi role.
- Stakeholder: Semua role
- Source: EL-15
- Status: ASSUMPTION

### FR-20 - Apply Role-Based API Validation

- Statement: API harus menolak aksi yang tidak sesuai dengan role aktif pada simulasi role.
- Stakeholder: Semua role
- Source: EL-15
- Status: ASSUMPTION

## Non-Functional Requirements

### NFR-01 - React Frontend

- Statement: Frontend aplikasi harus dibangun menggunakan React.
- Measure and threshold: Source code UI utama berada di `src/` dan build client berhasil.
- Operating context: Local development and production build.
- Verification method: `npm run build`.
- Source: EL-CON-01
- Status: CONSTRAINT

### NFR-02 - Cloudflare Worker API

- Statement: Backend/API aplikasi harus berjalan menggunakan Cloudflare Workers.
- Measure and threshold: Worker entrypoint dikonfigurasi di `wrangler.jsonc` dan API health mengembalikan status ok.
- Operating context: Local Worker dev server and Cloudflare deployment.
- Verification method: `npm run build` and `GET /api/health`.
- Source: EL-CON-02
- Status: CONSTRAINT

### NFR-03 - Cloudflare D1 Database

- Statement: Data aplikasi harus disimpan menggunakan Cloudflare D1.
- Measure and threshold: Binding D1 tersedia sebagai `DB` dan migration database dapat dijalankan.
- Operating context: Local D1 and production D1.
- Verification method: Wrangler D1 execute command and integration test.
- Source: EL-CON-03
- Status: CONSTRAINT

### NFR-04 - Free Cloudflare Deployment

- Statement: Aplikasi harus dapat dideploy ke Cloudflare tanpa layanan berbayar.
- Measure and threshold: Deployment menghasilkan URL publik Cloudflare dan tidak memerlukan layanan berbayar.
- Operating context: Final deployment.
- Verification method: Deployment checklist and public URL verification.
- Source: EL-CON-04
- Status: CONSTRAINT

### NFR-05 - GitHub Repository and Planning

- Statement: Project harus disimpan dan dikelola melalui GitHub.
- Measure and threshold: Repository publik atau terakses dosen tersedia, dengan issue, branch, commit, pull request, dan CI.
- Operating context: Development workflow.
- Verification method: GitHub repository inspection.
- Source: EL-CON-05, EL-CON-06
- Status: CONSTRAINT

### NFR-06 - Automated Tests and CI

- Statement: Project harus memiliki automated tests dan GitHub Actions.
- Measure and threshold: Minimal 20 automated tests tersedia sebelum final submission dan CI menjalankan test serta build.
- Operating context: Pull request and push workflow.
- Verification method: `npm test -- --run`, `npm run build`, and GitHub Actions result.
- Source: EL-CON-06
- Status: CONSTRAINT

### NFR-07 - Traceability

- Statement: Project harus menjaga traceability dari requirement sampai user story, design, issue, code, dan test.
- Measure and threshold: Traceability matrix memuat ID requirement dan status terkait untuk work product yang selesai.
- Operating context: Requirements, design, implementation, and testing.
- Verification method: Review `docs/requirements/traceability.md`.
- Source: EL-CON-06
- Status: CONSTRAINT

### NFR-08 - AI Human Review Evidence

- Statement: Output AI penting harus disimpan dan diperiksa manusia sebelum dianggap final.
- Measure and threshold: Evidence file mencatat skill/prompt, keputusan manusia, koreksi, dan file yang berubah.
- Operating context: Requirements, design, coding, and testing.
- Verification method: Review files in `evidence/` and human review documents.
- Source: EL-CON-06, EL-CON-07
- Status: CONSTRAINT

### NFR-09 - Secret Safety

- Statement: Repository tidak boleh menyimpan token, password, atau secret.
- Measure and threshold: No known secret value appears in tracked files.
- Operating context: Source control and deployment configuration.
- Verification method: Manual review and repository search before submission.
- Source: CASE.md technical risk, EL-CON-06
- Status: ASSUMPTION

## Business Rules

### BR-01 - Initial Status

- Rule: Laporan baru selalu dimulai dengan status `SUBMITTED`.
- Source: EL-16
- Status: FACT

### BR-02 - Official Status Workflow

- Rule: Status workflow hanya menggunakan `SUBMITTED`, `UNDER_REVIEW`, `ASSIGNED`, `IN_PROGRESS`, `RESOLVED`, dan `CLOSED`.
- Source: EL-16, EL-C-03
- Status: FACT

### BR-03 - Review Before Assignment

- Rule: Laporan harus diperiksa Administrator sebelum ditugaskan kepada Teknisi.
- Source: EL-05, EL-07
- Status: FACT

### BR-04 - Registered Technician Assignment

- Rule: Laporan hanya dapat ditugaskan kepada teknisi yang terdaftar.
- Source: EL-07, EL-C-04
- Status: ASSUMPTION

### BR-05 - Controlled Category

- Rule: Kategori laporan harus berasal dari controlled vocabulary yang ditentukan sistem.
- Source: EL-C-02
- Status: ASSUMPTION

### BR-06 - Controlled Priority

- Rule: Prioritas laporan harus bernilai `LOW`, `MEDIUM`, `HIGH`, atau `URGENT`, dengan default `MEDIUM` untuk laporan baru.
- Source: EL-06, EL-SRC-04
- Status: ASSUMPTION

### BR-07 - Status History Required

- Rule: Setiap perubahan status harus membuat entri riwayat status.
- Source: EL-17
- Status: ASSUMPTION

### BR-08 - Reopen Target Status

- Rule: Laporan yang dibuka kembali dari `CLOSED` harus kembali ke status `UNDER_REVIEW`.
- Source: EL-C-03
- Status: ASSUMPTION

### BR-09 - Comment Visibility

- Rule: Komentar publik dapat dilihat semua role, sedangkan catatan internal hanya dapat dilihat Administrator dan Teknisi.
- Source: EL-12, EL-C-05
- Status: ASSUMPTION

### BR-10 - Role Simulation Scope

- Rule: Simulasi role hanya menggunakan Pelapor, Administrator, Teknisi, dan Manajer Fasilitas.
- Source: EL-15
- Status: ASSUMPTION

### BR-11 - Reporter Data

- Rule: Laporan harus mencatat nama pelapor dan tipe pelapor.
- Source: EL-04
- Status: ASSUMPTION

### BR-12 - Close with Confirmation or Override

- Rule: Laporan berstatus `RESOLVED` sebaiknya dikonfirmasi Pelapor sebelum ditutup, kecuali Administrator menggunakan manual override dengan catatan.
- Source: EL-09
- Status: ASSUMPTION

## Open Questions

- OPEN QUESTION: Apakah Pelapor melihat semua laporan atau hanya laporan yang dibuat sendiri?
- OPEN QUESTION: Apakah role simulation perlu selalu ditampilkan sebagai known limitation pada README dan deployment docs?
- OPEN QUESTION: Fitur roadmap seperti suggested priority, SLA, dan personalized dashboard tetap dokumentasi-only atau sebagian diimplementasikan jika waktu cukup?
