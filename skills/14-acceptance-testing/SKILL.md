---
name: 14-acceptance-testing
description: Menjalankan acceptance testing untuk Campus Service Request and Maintenance System. Gunakan saat perlu menguji alur pengguna end-to-end, mengambil bukti screenshot, mencatat defect, memperbaiki gap, dan memastikan workflow Submitted sampai Closed lolos sebelum deployment.
---

# 14 - Acceptance Testing

## Tujuan
Memastikan aplikasi bekerja dari sudut pandang pengguna untuk alur lengkap Pelapor, Administrator, Teknisi, dan Manajer Fasilitas.

## Kapan Digunakan
Gunakan setelah automated tests lulus dan sebelum deployment final.

## Input
- `docs/testing/test-plan.md`
- `docs/requirements/user-stories.md`
- `docs/requirements/requirements.md`
- Aplikasi lokal atau staging
- Browser evidence atau screenshot
- Test result terbaru

## Langkah Kerja
1. Siapkan environment lokal atau staging dengan migration D1.
2. Jalankan skenario Pelapor membuat laporan.
3. Jalankan Administrator review, classification, priority, dan assignment.
4. Jalankan Teknisi accept, progress, dan resolve.
5. Jalankan Pelapor confirm resolved work.
6. Jalankan Administrator close dan bila perlu reopen.
7. Verifikasi list, detail, search, filter, comments, internal notes, status history, dan dashboard.
8. Ambil screenshot evidence untuk setiap skenario penting.
9. Catat defect dengan ID, requirement, evidence, dan status fix.
10. Update acceptance test result dan evidence.

## Output
- `docs/testing/acceptance-test-results.md`
- Screenshot atau bukti di `evidence/`
- Defect log dan hasil retest
- Evidence human review acceptance testing

## Aturan
- Acceptance testing harus memakai alur pengguna nyata.
- Jangan klaim PASS jika defect high belum diperbaiki.
- Bukti screenshot harus menunjukkan state penting, bukan hanya halaman kosong.
- Jangan memasukkan data sensitif ke production atau evidence.

## Quality Check
- Alur `SUBMITTED -> UNDER_REVIEW -> ASSIGNED -> IN_PROGRESS -> RESOLVED -> CLOSED` diuji.
- Empat aktor tercakup.
- Search/filter/dashboard diuji.
- Defect dan retest tercatat.
- Test/build otomatis tetap PASS.

## Kondisi Gagal
Berhenti jika aplikasi tidak dapat dijalankan, migration gagal, browser evidence tidak dapat dibuat, atau defect kritis belum selesai.

## Human Review
Manusia harus memeriksa evidence acceptance dan memutuskan apakah aplikasi layak deploy.
