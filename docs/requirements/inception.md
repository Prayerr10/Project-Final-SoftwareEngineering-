# Inception dan Stakeholder

## Tujuan

Dokumen ini menjelaskan pemahaman awal project Campus Service Request and Maintenance System berdasarkan `instruksi-dosen.md`.

## Masalah Utama

Mahasiswa atau dosen membutuhkan cara terstruktur untuk melaporkan masalah fasilitas kampus. Administrator membutuhkan sistem untuk memeriksa laporan, menentukan prioritas, dan menugaskan teknisi. Teknisi membutuhkan daftar tugas dan cara memperbarui progres. Manajer fasilitas membutuhkan dashboard dan laporan ringkas.

## Stakeholder

| Stakeholder | Kepentingan |
| --- | --- |
| Pelapor | Membuat laporan, melihat status, menambahkan komentar, dan mengonfirmasi hasil. |
| Administrator | Memeriksa laporan, menentukan kategori dan prioritas, menugaskan teknisi, serta menutup laporan. |
| Teknisi | Melihat tugas, menerima tugas, memperbarui progres, dan menandai pekerjaan selesai. |
| Manajer Fasilitas | Melihat dashboard dan laporan ringkas. |
| Dosen | Menilai proses software engineering, penggunaan AI, testing, traceability, dan deployment. |

## Scope Awal

Scope awal mengikuti fitur wajib pada `instruksi-dosen.md`:

- Membuat laporan baru.
- Melihat daftar laporan.
- Mencari dan menyaring laporan.
- Melihat detail laporan.
- Memeriksa laporan.
- Menentukan prioritas.
- Menugaskan teknisi.
- Mengubah status pekerjaan.
- Menambahkan komentar atau catatan.
- Menyimpan riwayat status.
- Menutup atau membuka kembali laporan.
- Menampilkan dashboard sederhana.

## Out of Scope

- Upload foto.
- Email notification.
- Login menggunakan akun Google.
- QR code ruangan.
- AI untuk menentukan kategori.
- Inventory spare part.
- Vendor management.

## Asumsi Awal

- Sistem awal dapat menggunakan simulasi peran sebelum autentikasi penuh tersedia.
- Deployment menggunakan paket gratis Cloudflare Workers dan D1.
- Prioritas utama adalah memenuhi requirement wajib, traceability, testing, dan deployment.

## Pertanyaan Terbuka

- Apakah role pengguna perlu login penuh atau cukup disimulasikan untuk tugas ini?
- Apakah teknisi perlu memiliki data profil lengkap atau cukup nama teknisi?
- Apakah dashboard cukup berisi jumlah laporan per status dan prioritas?
