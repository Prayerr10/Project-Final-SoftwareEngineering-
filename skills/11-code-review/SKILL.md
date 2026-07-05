---
name: 11-code-review
description: Melakukan code review untuk Campus Service Request and Maintenance System. Gunakan saat perlu mengaudit perubahan implementasi terhadap requirement, role validation, workflow status, D1 schema, UI behavior, tests, secret safety, traceability, dan bukti human-in-the-loop.
---

# 11 - Code Review

## Tujuan
Memastikan implementasi tidak hanya lulus test, tetapi juga benar terhadap requirement, aman dari scope creep, dan memiliki bukti review manusia.

## Kapan Digunakan
Gunakan setelah beberapa issue implementasi selesai atau sebelum final testing/deployment.

## Input
- Diff atau PR yang akan direview
- GitHub Issues terkait
- `docs/requirements/requirements.md`
- `docs/design/*`
- `docs/testing/*`
- `tests/*`
- `evidence/*`

## Langkah Kerja
1. Identifikasi baseline review dan daftar file berubah.
2. Cocokkan perubahan dengan FR, NFR, BR, US, AC, dan issue terkait.
3. Cari bug pada role validation, workflow status, status history, visibility komentar/catatan, dashboard, dan D1 constraints.
4. Cari fitur yang tidak tercatat di requirement.
5. Periksa test coverage dan CI/build.
6. Jalankan secret scan pada tracked files.
7. Catat finding dengan severity dan lokasi file.
8. Pastikan finding diperbaiki atau dicatat sebagai risiko sebelum lanjut.

## Output
- Evidence code review di `evidence/`
- Finding review dan keputusan PASS atau perlu revisi
- Update test atau docs bila ada gap

## Aturan
- Prioritaskan bug dan risiko, bukan preferensi gaya.
- Jangan menghapus perubahan user tanpa alasan.
- Jangan approve jika ada akses role salah, status workflow bocor, secret, atau test kritis gagal.
- Review harus menyebut bukti AI error dan perbaikan manusia bila ada.

## Quality Check
- Semua fitur wajib direview.
- Role Pelapor, Administrator, Teknisi, dan Manajer Fasilitas diperiksa.
- Workflow enam status diperiksa.
- Secret scan dilakukan.
- Test/build dijalankan atau alasan tidak bisa menjalankan dicatat.

## Kondisi Gagal
Berhenti jika baseline review tidak jelas, PR tidak dapat diakses, atau ada blocker kritis yang belum diperbaiki.

## Human Review
Manusia harus memutuskan Disetujui, Perlu revisi, Ditolak, atau Terblokir berdasarkan finding review.
