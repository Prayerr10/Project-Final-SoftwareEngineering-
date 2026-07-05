---
name: 03-specification
description: Menulis specification untuk Campus Service Request and Maintenance System. Gunakan saat perlu mengubah inception dan elicitation yang sudah direview menjadi functional requirements, non-functional requirements, business rules, user stories, acceptance criteria, open questions, dan traceability awal.
---

# 03 - Specification

## Tujuan
Menyusun requirement baseline yang lengkap, terukur, dan dapat diuji untuk seluruh fitur wajib Campus Service Request and Maintenance System.

## Kapan Digunakan
Gunakan setelah Skill 01 dan Skill 02 disetujui, sebelum prioritization, validation, design, issue planning, dan implementation.

## Input
- `docs/requirements/inception.md`
- `docs/requirements/elicitation.md`
- `docs/requirements/grill-session-summary.md`
- `CASE.md`
- `instruksi-dosen.md`
- Evidence human review Skill 01 dan Skill 02

## Langkah Kerja
1. Identifikasi functional requirement dengan format `FR-XX`.
2. Identifikasi non-functional requirement dengan format `NFR-XX`.
3. Identifikasi business rule dengan format `BR-XX`.
4. Tulis user story dengan format `US-XX`.
5. Tulis acceptance criteria minimal dua per user story dengan format `AC-XX.X`.
6. Pastikan 12 fitur wajib aplikasi tercakup.
7. Pastikan workflow status hanya memakai `SUBMITTED`, `UNDER_REVIEW`, `ASSIGNED`, `IN_PROGRESS`, `RESOLVED`, dan `CLOSED`.
8. Buat traceability awal dari requirement ke user story.
9. Simpan open question yang belum dapat diputuskan.

## Output
- `docs/requirements/requirements.md`
- `docs/requirements/user-stories.md`
- Update awal `docs/requirements/traceability.md`
- Evidence human review specification

## Aturan
- Minimal 12 FR, 6 NFR, 5 BR, 10 US, dan 2 AC per US.
- Jangan membuat design, issue, kode, test, atau deployment pada fase ini.
- Jangan menambahkan status ketujuh.
- Setiap requirement harus spesifik dan dapat diverifikasi.

## Quality Check
- Semua ID berformat konsisten.
- Tidak ada requirement duplikat yang membingungkan.
- Semua fitur wajib dan empat aktor tercakup.
- Acceptance criteria observable dan dapat diuji.
- Open question tidak ditutup tanpa human review.

## Kondisi Gagal
Berhenti jika sumber requirement belum direview, jumlah minimum tidak terpenuhi, atau requirement saling bertentangan.

## Human Review
Manusia harus memeriksa kelengkapan requirement, kejelasan AC, konsistensi scope, dan apakah requirement siap diprioritaskan.
