# AI Evidence - Grill with Docs Requirements Review

## Metadata

| Item | Value |
| --- | --- |
| Date | 2026-06-30 |
| Work product | Requirements review and domain clarification |
| AI skill used | `grill-with-docs` |
| Skill source | `C:\Users\Asus\.codex\skills\grill-with-docs\SKILL.md` |
| Main reference documents | `ringkasan-sesi-pertama.md`, `instruksi-dosen.md`, `CASE.md`, `docs/requirements/*` |
| Human reviewer | Project owner |

## Purpose

Sesi ini digunakan untuk menguji ulang draft requirements terhadap instruksi dosen, studi kasus, kode awal, dan batas scope project. AI mengajukan pertanyaan satu per satu, lalu project owner memberikan keputusan akhir sebelum dokumen diperbarui.

## AI Draft and Human Review Summary

| Topic | AI recommendation | Human review decision | Result |
| --- | --- | --- | --- |
| Role simulation | Gunakan simulasi role, bukan autentikasi penuh. | Accepted. Login Google tidak wajib, simulasi role dipakai untuk memprioritaskan core workflow. | `CR-01` accepted. |
| Technician data | Buat entitas teknisi sederhana di database. | Accepted. Teknisi perlu relasional untuk assignment, status history, spesialisasi, dan dashboard. | Added technician-related domain language and business rule. |
| Dashboard | Tampilkan jumlah laporan per status, kategori, prioritas, dan beban tugas teknisi. | Accepted. Beban teknisi memberi nilai nyata untuk Manajer Fasilitas. | Added `FR-16` and `AC-12.3`. |
| Closing workflow | Pelapor mengonfirmasi hasil sebelum admin menutup laporan, dengan manual override. | Accepted. Manual override harus memakai catatan. | Added confirmation and override rules. |
| Reopen workflow | Reopened report kembali ke `UNDER_REVIEW`. | Accepted. Ini mencegah workflow skipping. | Added reopen rule and acceptance criterion. |
| Comments and notes | Bedakan komentar publik dan catatan internal. | Accepted. Ini mendukung transparansi dan koordinasi teknis. | Added visibility rule for comments. |
| Categories | Gunakan fixed list sebagai controlled vocabulary. | Accepted. Ini menjaga scope dan integritas data. | Added category business rule. |
| Priority levels | Gunakan `LOW`, `MEDIUM`, `HIGH`, `URGENT`, default `MEDIUM`. | Accepted. Sesuai database/API awal dan mendukung review admin. | Added priority business rule. |
| Status history | Simpan `from_status`, `to_status`, `changed_by_role`, `note`, dan waktu. | Accepted. Ini dibutuhkan untuk audit trail dan acceptance testing. | Expanded `FR-12`. |
| Detail view | Gunakan master-detail view dalam SPA. | Accepted. Fokus pada kedalaman fitur, bukan routing kompleks. | Added detail acceptance criteria. |
| Search and filter | Search nomor, judul, lokasi, kategori; filter kombinasi status, kategori, prioritas, teknisi. | Accepted. Debounced search dan highlighting dicatat sebagai enhancement. | Refined `FR-03` and `FR-04`. |
| Reporter data | Simpan `reporter_name` dan `reporter_type` di laporan. | Accepted. Entitas reporter terpisah ditunda sebagai pengembangan lanjutan. | Added reporter business rule. |
| Role-based access | Gunakan empat role sesuai aktor dosen dan validasi UI/API. | Accepted. Role simulator harus mengikuti aktor sistem. | Added `NFR-09` and `BR-15`. |
| Suggested priority | Jadikan future enhancement, bukan requirement utama. | Accepted. Ini menghindari scope creep dan menjaga fokus fitur wajib. | Moved to prioritization roadmap. |
| Status workflow | Tetap gunakan enam status utama dari instruksi dosen. | Accepted. Konfirmasi, manual override, dan reopen menjadi metadata/aksi/catatan, bukan status tambahan. | Added workflow business rule. |

## Human Corrections and Scope Control

- AI sempat mengusulkan `FR-08A` untuk saran prioritas awal.
- Human reviewer menyetujui ide sebagai visi jangka panjang, tetapi memutuskan fitur tersebut tidak masuk scope awal.
- Requirement utama tetap menjaga keputusan prioritas pada Administrator sesuai spesifikasi tugas.
- Fitur AI category, autentikasi penuh, personalized dashboard, dan SLA tracking dicatat sebagai potensi lanjutan, bukan fitur wajib.

## Files Updated

- `CONTEXT.md`
- `docs/requirements/elicitation.md`
- `docs/requirements/requirements.md`
- `docs/requirements/user-stories.md`
- `docs/requirements/prioritization.md`
- `docs/requirements/traceability.md`
- `docs/requirements/validation-change.md`
- `evidence/2026-06-30-grill-with-docs-requirements-review.md`

## Review Result

- [x] Output AI diperiksa oleh manusia.
- [x] Keputusan akhir dibuat oleh manusia.
- [x] Scope wajib tetap mengacu pada instruksi dosen.
- [x] Fitur tambahan ditandai sebagai future enhancement.
- [x] Dokumen requirements diperbarui sesuai keputusan review.

## Next Review Items

- Jalankan skill `01-inception` sampai `05-validation-change` untuk merapikan dokumen final requirements.
- Pastikan terminology pada `CONTEXT.md` konsisten dengan requirements final.
- Buat human review formal untuk requirements setelah tahap 01-05 selesai.
