# User Stories dan Acceptance Criteria

## US-01 Membuat Laporan

Sebagai pelapor, saya ingin membuat laporan agar masalah fasilitas kampus dapat diproses.

- AC-01.1: Sistem menolak laporan jika field wajib kosong.
- AC-01.2: Sistem menyimpan laporan valid dengan status `SUBMITTED`.

## US-02 Melihat Daftar Laporan

Sebagai pengguna, saya ingin melihat daftar laporan agar dapat memantau laporan yang sudah dibuat.

- AC-02.1: Sistem menampilkan daftar laporan dari database.
- AC-02.2: Sistem menampilkan nomor, judul, lokasi, kategori, prioritas, dan status laporan.

## US-03 Mencari Laporan

Sebagai pengguna, saya ingin mencari laporan agar dapat menemukan laporan tertentu dengan cepat.

- AC-03.1: Sistem dapat mencari laporan berdasarkan judul.
- AC-03.2: Sistem dapat mencari laporan berdasarkan lokasi.

## US-04 Menyaring Laporan

Sebagai pengguna, saya ingin menyaring laporan agar daftar laporan lebih mudah dibaca.

- AC-04.1: Sistem dapat menyaring laporan berdasarkan status.
- AC-04.2: Sistem dapat menyaring laporan berdasarkan kategori atau prioritas.

## US-05 Melihat Detail Laporan

Sebagai pengguna, saya ingin melihat detail laporan agar memahami informasi lengkap laporan.

- AC-05.1: Sistem menampilkan deskripsi, lokasi, kategori, prioritas, dan status laporan.
- AC-05.2: Sistem menampilkan komentar dan riwayat status laporan.

## US-06 Memeriksa Laporan

Sebagai administrator, saya ingin memeriksa laporan agar laporan dapat diproses dengan benar.

- AC-06.1: Administrator dapat mengubah status dari `SUBMITTED` ke `UNDER_REVIEW`.
- AC-06.2: Sistem mencatat perubahan status ke riwayat status.

## US-07 Menentukan Prioritas

Sebagai administrator, saya ingin menentukan prioritas agar pekerjaan dapat diurutkan berdasarkan urgensi.

- AC-07.1: Administrator dapat memilih prioritas laporan.
- AC-07.2: Sistem menyimpan prioritas yang dipilih.

## US-08 Menugaskan Teknisi

Sebagai administrator, saya ingin menugaskan teknisi agar laporan memiliki penanggung jawab.

- AC-08.1: Administrator dapat memilih teknisi untuk laporan.
- AC-08.2: Sistem mengubah status laporan menjadi `ASSIGNED`.

## US-09 Memperbarui Progres

Sebagai teknisi, saya ingin memperbarui status pekerjaan agar pelapor mengetahui progres laporan.

- AC-09.1: Teknisi dapat mengubah status menjadi `IN_PROGRESS`.
- AC-09.2: Teknisi dapat mengubah status menjadi `RESOLVED` setelah pekerjaan selesai.

## US-10 Menambahkan Komentar

Sebagai pengguna, saya ingin menambahkan komentar agar komunikasi terkait laporan terdokumentasi.

- AC-10.1: Sistem menyimpan komentar pada laporan yang dipilih.
- AC-10.2: Sistem menampilkan komentar pada detail laporan.

## US-11 Menutup atau Membuka Kembali Laporan

Sebagai administrator, saya ingin menutup atau membuka kembali laporan agar status akhir laporan dapat dikelola.

- AC-11.1: Administrator dapat mengubah status laporan menjadi `CLOSED`.
- AC-11.2: Administrator dapat membuka kembali laporan jika masalah belum selesai.

## US-12 Melihat Dashboard

Sebagai manajer fasilitas, saya ingin melihat dashboard agar dapat memahami ringkasan laporan.

- AC-12.1: Sistem menampilkan jumlah laporan berdasarkan status.
- AC-12.2: Sistem menampilkan ringkasan laporan berdasarkan prioritas atau kategori.
