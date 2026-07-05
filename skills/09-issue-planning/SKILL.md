---
name: 09-issue-planning
description: Mengubah requirement dan design Campus Service Request and Maintenance System menjadi rencana GitHub Issues. Gunakan saat perlu membuat issue dengan format FR/NFR, user story, acceptance criteria, checklist pekerjaan, dependency, traceability, dan bukti human review.
---

# 09 - Issue Planning

## Tujuan
Membuat rencana implementasi berbasis GitHub Issues yang dapat ditelusuri dari requirement, user story, design, kode, test, dan evidence.

## Kapan Digunakan
Gunakan setelah requirement dan design disetujui, sebelum coding dimulai.

## Input
- `docs/requirements/requirements.md`
- `docs/requirements/user-stories.md`
- `docs/requirements/traceability.md`
- `docs/design/architecture.md`
- `docs/design/database-api.md`
- `docs/design/ui-flow.md`
- GitHub issue template di `.github/ISSUE_TEMPLATE/`

## Langkah Kerja
1. Kelompokkan requirement menjadi slice implementasi kecil.
2. Buat issue minimal untuk foundation, create request, list/search/filter/detail, admin workflow, technician workflow, comments/notes, close/reopen, dashboard, role validation, testing, deployment, dan traceability.
3. Pastikan setiap issue memiliki Requirement, User Story, Acceptance Criteria, checklist pekerjaan, dependency, dan selesai jika.
4. Hubungkan issue ke FR, NFR, BR, US, dan AC.
5. Perbarui traceability dengan nomor issue.
6. Siapkan evidence human review planning.

## Output
- GitHub Issues dengan format sesuai template
- Update `docs/requirements/traceability.md`
- Evidence human review planning

## Aturan
- Minimal 10 issue.
- Judul issue harus menyebut `[FR-XX]` atau `[NFR-XX]` yang relevan.
- Jangan membuat issue tanpa acceptance criteria.
- Jangan menggabungkan terlalu banyak fitur dalam satu issue jika menyulitkan review.

## Quality Check
- Semua fitur wajib punya issue.
- Issue memiliki checklist pekerjaan nyata.
- Dependency antar issue jelas.
- Traceability mengarah ke issue yang benar.

## Kondisi Gagal
Berhenti jika GitHub tidak dapat diakses, requirement belum stabil, atau issue tidak dapat ditelusuri ke requirement.

## Human Review
Manusia harus memeriksa apakah issue cukup kecil, lengkap, dan siap dikerjakan melalui branch serta pull request.
