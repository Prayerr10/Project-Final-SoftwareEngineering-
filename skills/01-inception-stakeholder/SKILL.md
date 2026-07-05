---
name: 01-inception-stakeholder
description: Menjalankan fase inception dan stakeholder discovery untuk Campus Service Request and Maintenance System. Gunakan saat perlu memahami studi kasus, aktor, batas scope, tujuan awal, constraint teknis, asumsi, risiko, open question, dan bukti human review sebelum requirement dirinci.
---

# 01 - Inception dan Stakeholder

## Tujuan
Menyusun pemahaman awal proyek Campus Service Request and Maintenance System agar scope, aktor, tujuan, batasan, dan pertanyaan terbuka terdokumentasi sebelum fase elicitation.

## Kapan Digunakan
Gunakan pada awal proyek atau saat baseline inception perlu diaudit ulang sebelum lanjut ke requirement detail.

## Input
- `instruksi-dosen.md`
- `CASE.md`
- `CONTEXT.md` bila sudah ada
- Catatan diskusi awal dengan pemilik proyek atau dosen
- Template Human Review di `docs/templates/human-review-template.md`

## Langkah Kerja
1. Baca instruksi dosen dan studi kasus secara penuh.
2. Identifikasi masalah utama, tujuan sistem, batas scope, dan fitur yang tidak boleh ditambahkan.
3. Catat aktor utama: Pelapor, Administrator, Teknisi, dan Manajer Fasilitas.
4. Petakan kepentingan, kebutuhan awal, dan kekhawatiran setiap aktor.
5. Catat constraint teknis: React, Cloudflare Workers, Cloudflare D1, GitHub workflow, CI, testing, deployment, dan bukti AI.
6. Catat asumsi, risiko, dependency, dan open question dengan ID yang konsisten.
7. Tulis dokumen inception yang dapat menjadi dasar Skill 02 sampai Skill 15.
8. Siapkan human review agar keputusan awal tidak hanya berasal dari AI.

## Output
- `docs/requirements/inception.md`
- Evidence human review untuk inception di folder `evidence/`
- Daftar open question yang akan dibawa ke elicitation dan validation

## Aturan
- Jangan membuat requirement final pada fase ini.
- Jangan menambahkan fitur di luar studi kasus.
- Jangan menyelesaikan open question dengan karangan AI.
- Gunakan istilah domain yang konsisten.
- Setiap keputusan penting harus memiliki sumber atau alasan.

## Quality Check
- Dokumen menyebut tujuan sistem, scope, non-scope, aktor, constraint, risiko, asumsi, dan open question.
- Empat aktor wajib tercakup.
- Cloudflare Workers, D1, GitHub, testing, deployment, dan AI evidence tercatat sebagai constraint.
- Tidak ada fitur out of scope seperti login penuh, upload foto, notifikasi email, QR code, atau inventory spare part.

## Kondisi Gagal
Berhenti dan minta klarifikasi jika studi kasus tidak tersedia, aktor tidak jelas, atau ada konflik antara instruksi dosen dan permintaan proyek.

## Human Review
Manusia harus memeriksa apakah scope awal benar, aktor lengkap, open question tidak diabaikan, dan tidak ada fitur tambahan yang tidak diminta.
