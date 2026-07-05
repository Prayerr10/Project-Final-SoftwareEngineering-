---
name: 10-implementation
description: Menjalankan implementasi fitur Campus Service Request and Maintenance System berdasarkan issue, requirement, design, dan test. Gunakan saat perlu menulis atau memperbarui React UI, Cloudflare Worker API, D1 migration, validasi role, workflow status, dan traceability tanpa keluar scope.
---

# 10 - Implementation

## Tujuan
Mengimplementasikan fitur yang sudah direncanakan di GitHub Issues dengan menjaga traceability, scope, dan kualitas kode.

## Kapan Digunakan
Gunakan setelah issue planning selesai dan saat mengerjakan branch fitur.

## Input
- GitHub issue yang sedang dikerjakan
- `docs/requirements/requirements.md`
- `docs/requirements/user-stories.md`
- `docs/design/architecture.md`
- `docs/design/database-api.md`
- `docs/design/ui-flow.md`
- `docs/requirements/traceability.md`
- Kode di `src/`, `worker/`, dan `database/migrations/`

## Langkah Kerja
1. Pastikan bekerja di branch fitur, bukan langsung ke `main`.
2. Baca issue, requirement, design, dan acceptance criteria terkait.
3. Implementasikan perubahan paling kecil yang memenuhi acceptance criteria.
4. Tambahkan atau perbarui migration D1 jika data model berubah.
5. Pastikan Worker memvalidasi role, input, dan status workflow.
6. Pastikan React UI menampilkan state loading, empty, success, error, forbidden, not found, dan conflict yang relevan.
7. Tambahkan test sesuai risiko perubahan.
8. Perbarui traceability dan evidence human review issue.

## Output
- Kode React di `src/`
- Kode Worker di `worker/`
- Migration SQL di `database/migrations/` bila diperlukan
- Test di `tests/unit/` atau `tests/integration/`
- Update traceability dan evidence

## Aturan
- Jangan menambah fitur out of scope.
- Jangan menjadikan UI sebagai satu-satunya validasi role.
- Jangan menambah status workflow ketujuh.
- Jangan commit secret, token, atau credential.
- Setiap status-changing endpoint wajib mencatat riwayat status.

## Quality Check
- Acceptance criteria issue terpenuhi.
- Test relevan ditambahkan atau alasan tidak menambah test dicatat.
- `npm test -- --run` dan `npm run build` lulus sebelum PR.
- Traceability mengarah ke kode dan test.

## Kondisi Gagal
Berhenti jika issue ambigu, design bertentangan dengan requirement, migration berisiko merusak data tanpa review, atau test/build gagal dan belum dapat diperbaiki.

## Human Review
Manusia harus memeriksa diff, test, traceability, dan evidence sebelum PR dianggap siap merge.
