---
name: 05-validation-change
description: Melakukan validation dan change management untuk requirement Campus Service Request and Maintenance System. Gunakan saat perlu memeriksa konsistensi requirement, menemukan ambiguity, mencatat change request, dan memastikan baseline siap masuk design.
---

# 05 - Validation dan Change

## Tujuan
Memvalidasi requirement baseline dan mengelola change request agar requirement yang masuk design sudah konsisten, dapat diuji, dan tidak bertentangan dengan instruksi dosen.

## Kapan Digunakan
Gunakan setelah specification dan prioritization disetujui, sebelum architecture design.

## Input
- `docs/requirements/requirements.md`
- `docs/requirements/user-stories.md`
- `docs/requirements/prioritization.md`
- `docs/requirements/traceability.md`
- `docs/requirements/inception.md`
- `docs/requirements/elicitation.md`
- `CASE.md`
- `instruksi-dosen.md`

## Langkah Kerja
1. Validasi semua FR, NFR, BR, US, dan AC terhadap sumber awal.
2. Periksa ambiguity, incompleteness, conflict, feasibility, dan testability.
3. Tandai item sebagai PASS, OPEN QUESTION, atau NEEDS CLARIFICATION.
4. Buat minimal satu change request jika ada kebutuhan perubahan atau klarifikasi.
5. Pastikan change request memiliki alasan, dampak, risiko, dan status keputusan.
6. Jangan mengubah baseline tanpa keputusan manusia.
7. Perbarui traceability dengan hasil validation.
8. Siapkan evidence human review.

## Output
- `docs/requirements/validation.md`
- `docs/requirements/change-request.md`
- Update `docs/requirements/traceability.md`
- Evidence human review validation

## Aturan
- Change request harus punya alasan perubahan yang jelas.
- Jangan langsung mengimplementasikan change request yang belum disetujui.
- Jangan menambah status workflow baru tanpa approval eksplisit.
- Semua open question harus tetap terlacak.

## Quality Check
- Semua FR/NFR/BR/US divalidasi.
- Minimal satu change request tersedia bila ada kebutuhan klarifikasi.
- Traceability mencatat hasil validation.
- Tidak ada keputusan produk baru yang tidak direview manusia.

## Kondisi Gagal
Berhenti jika dokumen requirement tidak lengkap, change request mengubah scope tanpa approval, atau konflik tidak dapat diselesaikan.

## Human Review
Manusia harus memeriksa hasil validation, status change request, dan apakah baseline sudah siap masuk fase design.
