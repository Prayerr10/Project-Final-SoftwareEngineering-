---
name: 12-test-planning
description: Membuat test plan untuk Campus Service Request and Maintenance System. Gunakan saat perlu memetakan FR, NFR, BR, US, dan AC ke unit test, integration test, acceptance test, risk-based testing, CI, data test, dan evidence sebelum automated testing.
---

# 12 - Test Planning

## Tujuan
Menyusun strategi pengujian yang memastikan fitur wajib, workflow status, validasi role, D1, UI state, dan deployment readiness dapat diverifikasi.

## Kapan Digunakan
Gunakan setelah implementation baseline tersedia dan sebelum menambah/melengkapi automated test serta acceptance test.

## Input
- `docs/requirements/requirements.md`
- `docs/requirements/user-stories.md`
- `docs/requirements/traceability.md`
- `docs/design/architecture.md`
- `docs/design/database-api.md`
- `docs/design/ui-flow.md`
- Kode dan test yang sudah ada

## Langkah Kerja
1. Petakan setiap FR, NFR, BR, US, dan AC ke jenis test.
2. Tentukan unit test untuk validasi kecil dan helper.
3. Tentukan integration test untuk Worker, D1, role validation, workflow, dashboard, dan error contract.
4. Tentukan acceptance scenario untuk alur end-to-end pengguna.
5. Catat skenario positif, negatif, dan edge case.
6. Pastikan target minimal 20 automated tests tercapai.
7. Petakan CI, build, secret scan, dan deployment readiness.
8. Tulis test plan dan update traceability.

## Output
- `docs/testing/test-plan.md`
- Update `docs/testing/automated-test-inventory.md`
- Update `docs/requirements/traceability.md`
- Evidence human review test planning

## Aturan
- Jangan menulis fitur baru.
- Jangan mengubah requirement untuk menyesuaikan test.
- Test plan harus mengutamakan risiko workflow, role, data, dan deployment.
- Acceptance testing harus mencerminkan alur pengguna nyata.

## Quality Check
- Semua FR/NFR/BR punya strategi test.
- Minimal 20 automated tests direncanakan atau sudah tersedia.
- CI menjalankan test dan build.
- Acceptance scenario mencakup `SUBMITTED` sampai `CLOSED`.

## Kondisi Gagal
Berhenti jika requirement tidak dapat ditelusuri, test existing tidak dapat dihitung, atau risiko kritis tidak memiliki rencana verifikasi.

## Human Review
Manusia harus memeriksa apakah test plan cukup untuk membuktikan kesiapan submit dan bukan hanya daftar test generik.
