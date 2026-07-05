---
name: 13-automated-testing
description: Menulis dan menjalankan automated tests untuk Campus Service Request and Maintenance System. Gunakan saat perlu membuat unit/integration tests minimal 20, menguji Worker API, D1 behavior, role validation, status workflow, UI rendering, dashboard, deployment readiness, dan traceability.
---

# 13 - Automated Testing

## Tujuan
Membuktikan implementasi secara otomatis melalui unit dan integration tests yang dapat berjalan lokal dan di GitHub Actions.

## Kapan Digunakan
Gunakan setelah test plan tersedia dan saat implementasi fitur sudah siap diuji otomatis.

## Input
- `docs/testing/test-plan.md`
- `docs/requirements/traceability.md`
- Kode di `src/`, `worker/`, `database/migrations/`
- Test existing di `tests/unit/` dan `tests/integration/`
- `.github/workflows/ci.yml`

## Langkah Kerja
1. Jalankan test existing untuk mengetahui baseline.
2. Tambahkan test untuk fitur yang belum tercakup.
3. Prioritaskan role validation, invalid status transition, create/list/detail, comments/notes, close/reopen, dashboard, D1 constraints, dan deployment readiness.
4. Pastikan setiap test penting memiliki komentar traceability `FR-XX` atau referensi requirement.
5. Jalankan `npm test -- --run`.
6. Jalankan `npm run build`.
7. Update inventory test dan traceability.
8. Siapkan evidence human review automated testing.

## Output
- File test di `tests/unit/` dan `tests/integration/`
- Update `docs/testing/automated-test-inventory.md`
- Update `docs/requirements/traceability.md`
- Evidence human review automated testing

## Aturan
- Minimal 20 automated tests gabungan unit dan integration.
- Jangan membuat test kosong atau smoke-only yang tidak memverifikasi behavior.
- Jangan menghapus test gagal tanpa memperbaiki penyebabnya.
- Jangan bergantung pada layanan berbayar atau secret.

## Quality Check
- `npm test -- --run` PASS.
- `npm run build` PASS.
- Jumlah test aktual tercatat.
- Test mencakup happy path dan negative path.
- CI dapat menjalankan command yang sama.

## Kondisi Gagal
Berhenti jika dependency tidak dapat dipasang, test tidak deterministik, atau ada failing test yang menunjukkan bug requirement.

## Human Review
Manusia harus memastikan test benar-benar memverifikasi requirement dan tidak hanya mengejar jumlah minimum.
