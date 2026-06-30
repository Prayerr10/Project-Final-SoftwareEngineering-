# Requirements Specification

| Review Status | Draft for Human Review |
| --- | --- |
| Skill AI | Skill 03 - Specification (`requirements-elaboration-and-specification`) |
| Human decision | Menunggu Human Review Skill 03 |

## Source Summary

Dokumen ini hanya mencakup Skill 03: Specification. Isi diturunkan dari sumber yang sudah tersedia dan tidak membuat prioritas, desain, issue planning, kode, test, deployment, atau change request.

| Source ID | Source | Usage |
| --- | --- | --- |
| SRC-01 | `instruksi-dosen.md` | Instruksi utama project, minimum work product, template, batas Skill 03, dan constraint penggunaan AI. |
| SRC-02 | `CASE.md` | Studi kasus, aktor, fitur wajib, fitur tidak wajib, alur status, batasan teknis, dan aturan bisnis awal. |
| SRC-03 | `docs/requirements/inception.md` | Inception yang sudah `Human Reviewed & Approved`, termasuk scope, stakeholder, assumptions, constraints, decisions, dan open questions. |
| SRC-04 | `docs/requirements/elicitation.md` | Elicitation yang sudah `Human Reviewed & Approved`, termasuk register pertanyaan dan gap yang masih terbuka. |
| SRC-05 | `evidence/human-review-inception.md` | Bukti Human Review Skill 01. |
| SRC-06 | `evidence/human-review-elicitation.md` | Bukti Human Review Skill 02. |
| SRC-07 | `docs/requirements/grill-session-summary.md` | Keputusan domain yang berstatus `Human Reviewed & Approved`. |

## Functional Requirements

### FR-01 - Create Service Request

- Statement: Sistem harus memungkinkan Pelapor membuat laporan masalah fasilitas kampus.
- Stakeholder: Pelapor
- Source: SRC-02, SRC-03
- Status: FACT

### FR-02 - Store Reporter Identity

- Statement: Sistem harus menyimpan `reporter_name` dan `reporter_type` pada laporan yang dibuat Pelapor.
- Stakeholder: Pelapor
- Source: SRC-07
- Status: FACT

### FR-03 - View Request List

- Statement: Sistem harus menampilkan daftar laporan fasilitas kampus yang tersimpan.
- Stakeholder: Pelapor, Administrator, Teknisi, Manajer Fasilitas
- Source: SRC-02, SRC-03
- Status: FACT

### FR-04 - Search Requests

- Statement: Sistem harus memungkinkan pengguna mencari laporan.
- Stakeholder: Pelapor, Administrator, Teknisi, Manajer Fasilitas
- Source: SRC-02, SRC-07
- Status: FACT

### FR-05 - Filter Requests

- Statement: Sistem harus memungkinkan pengguna menyaring laporan dengan kombinasi status dan prioritas.
- Stakeholder: Pelapor, Administrator, Teknisi, Manajer Fasilitas
- Source: SRC-02, SRC-07
- Status: FACT

### FR-06 - View Request Detail

- Statement: Sistem harus menampilkan detail laporan yang dipilih.
- Stakeholder: Pelapor, Administrator, Teknisi, Manajer Fasilitas
- Source: SRC-02, SRC-03
- Status: FACT

### FR-07 - Review Submitted Request

- Statement: Sistem harus memungkinkan Administrator memeriksa laporan yang masuk sebelum laporan ditugaskan kepada Teknisi.
- Stakeholder: Administrator
- Source: SRC-02, SRC-03
- Status: FACT

### FR-08 - Set Request Category

- Statement: Sistem harus memungkinkan Administrator menentukan kategori laporan dari fixed list sebagai controlled vocabulary.
- Stakeholder: Administrator
- Source: SRC-02, SRC-07
- Status: FACT

### FR-09 - Set Request Priority

- Statement: Sistem harus memungkinkan Administrator menentukan prioritas laporan.
- Stakeholder: Administrator
- Source: SRC-02, SRC-03
- Status: FACT

### FR-10 - Suggest Lecturer Priority

- Statement: Sistem harus memberikan saran prioritas `HIGH` untuk laporan dengan `reporter_type` bernilai `LECTURER`, tanpa mengubah keputusan akhir Administrator.
- Stakeholder: Administrator, Pelapor
- Source: SRC-07
- Status: FACT

### FR-11 - Assign Technician

- Statement: Sistem harus memungkinkan Administrator menugaskan laporan kepada Teknisi.
- Stakeholder: Administrator, Teknisi
- Source: SRC-02, SRC-03
- Status: FACT

### FR-12 - View Assigned Tasks

- Statement: Sistem harus memungkinkan Teknisi melihat tugas yang diberikan.
- Stakeholder: Teknisi
- Source: SRC-02, SRC-03
- Status: FACT

### FR-13 - Accept Assigned Task

- Statement: Sistem harus memungkinkan Teknisi menerima tugas yang diberikan.
- Stakeholder: Teknisi
- Source: SRC-02, SRC-03
- Status: FACT

### FR-14 - Update Work Progress

- Statement: Sistem harus memungkinkan Teknisi memperbarui progres pekerjaan.
- Stakeholder: Teknisi
- Source: SRC-02, SRC-03
- Status: FACT

### FR-15 - Mark Work Resolved

- Statement: Sistem harus memungkinkan Teknisi menandai pekerjaan selesai.
- Stakeholder: Teknisi
- Source: SRC-02, SRC-03
- Status: FACT

### FR-16 - Add Public Comment

- Statement: Sistem harus memungkinkan Pelapor, Administrator, dan Teknisi menambahkan Komentar Publik pada laporan.
- Stakeholder: Pelapor, Administrator, Teknisi
- Source: SRC-02, SRC-07
- Status: FACT

### FR-17 - Add Internal Note

- Statement: Sistem harus memungkinkan Administrator dan Teknisi menambahkan Catatan Internal pada laporan.
- Stakeholder: Administrator, Teknisi
- Source: SRC-02, SRC-07
- Status: FACT

### FR-18 - Record Status History

- Statement: Sistem harus menyimpan riwayat perubahan status laporan.
- Stakeholder: Pelapor, Administrator, Teknisi, Manajer Fasilitas
- Source: SRC-02, SRC-07
- Status: FACT

### FR-19 - Confirm Resolved Work

- Statement: Sistem harus memungkinkan Pelapor mengonfirmasi hasil pekerjaan yang sudah diselesaikan.
- Stakeholder: Pelapor
- Source: SRC-02, SRC-07
- Status: FACT

### FR-20 - Close Request

- Statement: Sistem harus memungkinkan Administrator menutup laporan.
- Stakeholder: Administrator
- Source: SRC-02, SRC-03
- Status: FACT

### FR-21 - Reopen Request

- Statement: Sistem harus memungkinkan Administrator membuka kembali laporan jika diperlukan.
- Stakeholder: Administrator
- Source: SRC-02, SRC-03, SRC-07
- Status: FACT

### FR-22 - View Operational Dashboard

- Statement: Sistem harus menampilkan dashboard sederhana dan laporan ringkas.
- Stakeholder: Manajer Fasilitas
- Source: SRC-02, SRC-03
- Status: FACT

### FR-23 - View Technician Workload

- Statement: Sistem harus menampilkan beban tugas per Teknisi pada dashboard.
- Stakeholder: Manajer Fasilitas, Administrator, Teknisi
- Source: SRC-07
- Status: FACT

### FR-24 - Apply Role-Based UI

- Statement: Sistem harus mengubah tampilan dan aksi UI secara dinamis berdasarkan role yang dipilih.
- Stakeholder: Pelapor, Administrator, Teknisi, Manajer Fasilitas
- Source: SRC-07
- Status: FACT

## Non-Functional Requirements

### NFR-01 - React Frontend

- Statement: Frontend aplikasi harus menggunakan React.
- Measure and threshold: Source code frontend berada di folder `src/` dan build frontend berhasil.
- Operating context: Local development dan production build.
- Verification method: Pemeriksaan repository dan perintah build pada tahap testing/deployment.
- Source: SRC-01, SRC-02
- Status: CONSTRAINT

### NFR-02 - Cloudflare Workers API

- Statement: Backend/API aplikasi harus menggunakan Cloudflare Workers.
- Measure and threshold: Worker entrypoint terkonfigurasi di project dan endpoint API dapat dijalankan.
- Operating context: Local development dan Cloudflare deployment.
- Verification method: Pemeriksaan konfigurasi Worker dan API pada tahap testing/deployment.
- Source: SRC-01, SRC-02
- Status: CONSTRAINT

### NFR-03 - Cloudflare D1 Database

- Statement: Database aplikasi harus menggunakan Cloudflare D1.
- Measure and threshold: Binding D1 tersedia dan migration database dapat dijalankan.
- Operating context: Local D1 dan production D1.
- Verification method: Pemeriksaan konfigurasi D1 dan eksekusi migration pada tahap database/deployment.
- Source: SRC-01, SRC-02
- Status: CONSTRAINT

### NFR-04 - Free Cloudflare Services

- Statement: Project harus menggunakan Cloudflare Workers dan D1 pada paket gratis tanpa layanan berbayar.
- Measure and threshold: Tidak ada fitur wajib yang membutuhkan layanan Cloudflare berbayar.
- Operating context: Perencanaan fitur, implementasi, dan deployment.
- Verification method: Review konfigurasi dan checklist deployment.
- Source: SRC-01, SRC-02
- Status: CONSTRAINT

### NFR-05 - GitHub Workflow

- Statement: Project harus dikelola melalui GitHub dengan branch, commit, dan pull request.
- Measure and threshold: Perubahan pekerjaan disimpan di branch terpisah dan diajukan melalui Pull Request.
- Operating context: Semua tahap project.
- Verification method: Pemeriksaan history Git dan Pull Request.
- Source: SRC-01, SRC-02
- Status: CONSTRAINT

### NFR-06 - Automated Testing and CI

- Statement: Project harus memiliki automated test dan GitHub Actions.
- Measure and threshold: Minimal 20 automated tests tersedia sebelum final submission, dan CI menjalankan test serta build.
- Operating context: Pull Request dan final submission.
- Verification method: Pemeriksaan test suite dan hasil GitHub Actions.
- Source: SRC-01, SRC-02
- Status: CONSTRAINT

### NFR-07 - Traceability

- Statement: Project harus menjaga traceability dari requirement sampai test.
- Measure and threshold: Traceability matrix memuat hubungan requirement, user story, design, issue, code, test, dan status ketika item tersebut tersedia.
- Operating context: Requirements, design, planning, coding, dan testing.
- Verification method: Review `docs/requirements/traceability.md`.
- Source: SRC-01, SRC-02
- Status: CONSTRAINT

### NFR-08 - AI Human Review Evidence

- Statement: Output AI penting harus disimpan, diperiksa, diperbaiki bila perlu, dan disetujui manusia sebelum dianggap final.
- Measure and threshold: Evidence Human Review tersedia untuk work product yang dibuat dengan bantuan AI.
- Operating context: Semua tahap yang menggunakan AI.
- Verification method: Review file di folder `evidence/`.
- Source: SRC-01, SRC-03, SRC-04, SRC-05, SRC-06
- Status: CONSTRAINT

### NFR-09 - Secret Safety

- Statement: Repository tidak boleh menyimpan token, password, atau secret.
- Measure and threshold: Tidak ada token, password, atau secret yang diketahui di tracked files.
- Operating context: Source control dan deployment configuration.
- Verification method: Manual review dan pencarian repository sebelum submission.
- Source: SRC-01, SRC-02
- Status: CONSTRAINT

## Business Rules

### BR-01 - Initial Status

- Rule: Setiap laporan baru harus dimulai dengan status `SUBMITTED`.
- Source: SRC-02, SRC-03
- Status: FACT

### BR-02 - Strict Status Workflow

- Rule: Status utama laporan hanya menggunakan `SUBMITTED`, `UNDER_REVIEW`, `ASSIGNED`, `IN_PROGRESS`, `RESOLVED`, dan `CLOSED`.
- Source: SRC-02, SRC-07
- Status: FACT

### BR-03 - Review Before Assignment

- Rule: Laporan harus diperiksa Administrator sebelum ditugaskan kepada Teknisi.
- Source: SRC-02, SRC-03
- Status: FACT

### BR-04 - Administrator Owns Priority Decision

- Rule: Administrator menentukan prioritas akhir laporan.
- Source: SRC-02, SRC-07
- Status: FACT

### BR-05 - Lecturer Priority Suggestion

- Rule: Laporan dari `LECTURER` memberikan saran prioritas `HIGH`, tetapi keputusan akhir tetap berada pada Administrator.
- Source: SRC-07
- Status: FACT

### BR-06 - Controlled Category Vocabulary

- Rule: Kategori laporan harus berasal dari fixed list sebagai controlled vocabulary.
- Source: SRC-07
- Status: FACT

### BR-07 - Controlled Priority Values

- Rule: Prioritas laporan harus menggunakan nilai `LOW`, `MEDIUM`, `HIGH`, atau `URGENT`.
- Source: SRC-07
- Status: FACT

### BR-08 - Status History Fields

- Rule: Status history harus mencatat `from_status`, `to_status`, `changed_by_role`, `timestamp`, dan `note`.
- Source: SRC-07
- Status: FACT

### BR-09 - Public Comment Visibility

- Rule: Komentar Publik dapat dilihat oleh Pelapor, Administrator, dan Teknisi.
- Source: SRC-07
- Status: FACT

### BR-10 - Internal Note Visibility

- Rule: Catatan Internal hanya dapat dilihat oleh Administrator dan Teknisi.
- Source: SRC-07
- Status: FACT

### BR-11 - Reporter Confirmation Before Closed

- Rule: Pelapor wajib mengonfirmasi hasil sebelum laporan menjadi `CLOSED`, kecuali Administrator menggunakan manual override.
- Source: SRC-07
- Status: FACT

### BR-12 - Reopen Target Status

- Rule: Laporan yang dibuka kembali harus kembali ke status `UNDER_REVIEW` untuk validasi ulang Administrator.
- Source: SRC-07
- Status: FACT

## Open Questions

| Open ID | Open Question | Source |
| --- | --- | --- |
| OPEN-02 | Data identitas Pelapor apa saja yang wajib disimpan selain `reporter_name` dan `reporter_type`? | SRC-03, SRC-04 |
| OPEN-03 | Apa kondisi sah Administrator memakai manual override untuk menutup laporan tanpa konfirmasi Pelapor? | SRC-03, SRC-04 |
| OPEN-04 | Apakah reopen hanya dapat dilakukan oleh Administrator, atau Pelapor juga dapat meminta reopen? | SRC-03, SRC-04 |
| OPEN-05 | Apa daftar final kategori fixed list yang akan digunakan? | SRC-03, SRC-04 |
| OPEN-06 | Apa kriteria prioritas `LOW`, `MEDIUM`, `HIGH`, dan `URGENT`? | SRC-03, SRC-04 |
| OPEN-07 | Bagaimana beban tugas per Teknisi dihitung untuk dashboard? | SRC-03, SRC-04 |
| OPEN-08 | Apakah Teknisi boleh menolak tugas atau hanya menerima dan memperbarui tugas yang diberikan? | SRC-03, SRC-04 |
| OPEN-10 | Apakah Manajer Fasilitas hanya melihat dashboard/ringkasan, dapat membuka detail laporan, atau juga dapat melihat Catatan Internal? | SRC-03, SRC-04 |
| OPEN-11 | Apakah enam status strict boleh memiliki sub-state non-status, seperti flag menunggu konfirmasi? | SRC-03, SRC-04 |

## Quality Check

- Minimum 12 functional requirements: terpenuhi dengan 24 FR.
- Minimum 6 non-functional requirements: terpenuhi dengan 9 NFR.
- Minimum 5 business rules: terpenuhi dengan 12 BR.
- Tidak ada prioritas MoSCoW.
- Tidak ada design, issue planning, kode, test, deployment, atau change request.
- Item yang belum jelas tetap dicatat sebagai `OPEN QUESTION`.
