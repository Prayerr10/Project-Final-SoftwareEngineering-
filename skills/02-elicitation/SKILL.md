---
name: 02-elicitation
description: Menjalankan elicitation kebutuhan untuk Campus Service Request and Maintenance System. Gunakan saat perlu menyusun pertanyaan stakeholder, temuan kebutuhan, gap, asumsi, dan catatan validasi awal sebelum requirement ditulis sebagai FR, NFR, BR, US, dan AC.
---

# 02 - Elicitation

## Tujuan
Menggali kebutuhan stakeholder berdasarkan inception agar kebutuhan yang masuk ke specification berasal dari pertanyaan dan temuan yang jelas.

## Kapan Digunakan
Gunakan setelah inception disetujui dan sebelum membuat functional requirement, user story, atau acceptance criteria.

## Input
- `docs/requirements/inception.md`
- `CASE.md`
- `instruksi-dosen.md`
- Catatan stakeholder atau sesi tanya jawab
- Open question dari Skill 01

## Langkah Kerja
1. Turunkan daftar pertanyaan untuk Pelapor, Administrator, Teknisi, dan Manajer Fasilitas.
2. Kelompokkan pertanyaan berdasarkan alur laporan, status, prioritas, assignment, komunikasi, dashboard, dan deployment.
3. Catat temuan kebutuhan yang sudah jelas sebagai FACT atau DECISION.
4. Catat informasi yang belum jelas sebagai OPEN QUESTION.
5. Jangan langsung mengubah temuan menjadi requirement final.
6. Pastikan temuan dapat ditelusuri ke sumber input.
7. Tulis hasil elicitation dan siapkan evidence human review.

## Output
- `docs/requirements/elicitation.md`
- Ringkasan pertanyaan dan temuan kebutuhan
- Open question yang diperbarui
- Evidence human review elicitation

## Aturan
- Jangan membuat FR, NFR, BR, US, atau AC final.
- Jangan menghapus open question tanpa keputusan manusia.
- Jangan menambahkan fitur yang tidak muncul dari kasus atau stakeholder.
- Gunakan bahasa yang dapat dipahami reviewer non-teknis.

## Quality Check
- Pertanyaan mencakup empat aktor.
- Temuan kebutuhan dipisahkan dari asumsi.
- Komentar publik, catatan internal, prioritas, assignment, dashboard, close, dan reopen dibahas.
- Output siap menjadi input Skill 03.

## Kondisi Gagal
Berhenti jika inception belum tersedia, stakeholder utama tidak dapat diidentifikasi, atau temuan bertentangan tanpa sumber prioritas yang jelas.

## Human Review
Manusia harus memastikan pertanyaan cukup lengkap, temuan masuk akal, dan semua ketidakjelasan tetap ditandai untuk specification atau validation.
