# Campus Service Request and Maintenance System

Glossary domain untuk menyamakan bahasa project Campus Service Request and Maintenance System. File ini hanya berisi istilah domain, bukan keputusan implementasi.

## Language

**Pelapor**:
Mahasiswa atau dosen yang membuat laporan masalah fasilitas kampus dan memantau progres penanganannya.
_Avoid_: User biasa, customer

**Administrator**:
Pihak yang memeriksa laporan masuk, menentukan prioritas, menugaskan teknisi, dan menutup laporan.
_Avoid_: Admin umum, operator

**Teknisi**:
Pihak yang menerima tugas perbaikan atau pemeliharaan fasilitas dan memperbarui progres pekerjaan.
_Avoid_: Worker, staff teknis

**Penugasan Teknisi**:
Hubungan antara satu laporan dengan teknisi yang bertanggung jawab menangani pekerjaan tersebut.
_Avoid_: Nama teknisi bebas, pemilik laporan

**Spesialisasi Teknisi**:
Bidang kemampuan teknisi yang membantu administrator memilih teknisi yang sesuai dengan kategori masalah.
_Avoid_: Skill teknis umum, jabatan

**Manajer Fasilitas**:
Pihak yang memantau ringkasan laporan dan kondisi umum pekerjaan fasilitas kampus.
_Avoid_: Manager umum, supervisor

**Dashboard Operasional**:
Ringkasan visual sederhana yang membantu Manajer Fasilitas memantau jumlah laporan dan distribusi pekerjaan.
_Avoid_: Laporan analitik penuh, business intelligence

**Beban Tugas Teknisi**:
Jumlah laporan aktif yang sedang ditangani atau telah ditugaskan kepada seorang teknisi.
_Avoid_: Performa personal, absensi teknisi

**Konfirmasi Pelapor**:
Pernyataan dari pelapor bahwa hasil pekerjaan pada laporan yang berstatus resolved sudah diterima atau masih bermasalah.
_Avoid_: Approval teknisi, review administrator

**Manual Override**:
Tindakan administrator untuk menutup laporan tanpa menunggu konfirmasi pelapor ketika kondisi operasional membutuhkan keputusan akhir.
_Avoid_: Bypass bebas, tutup paksa

**Buka Kembali Laporan**:
Tindakan administrator untuk mengaktifkan ulang laporan yang sudah ditutup ketika masalah belum selesai atau muncul kembali.
_Avoid_: Reopen bebas, status reset

**Workflow Skipping**:
Perpindahan status yang melewati tahap validasi penting dalam alur penanganan laporan.
_Avoid_: Percepatan workflow, shortcut status

**Komentar Publik**:
Pesan pada laporan yang dapat dilihat oleh pelapor, administrator, dan teknisi untuk menjaga transparansi progres.
_Avoid_: Chat umum, pesan bebas

**Catatan Internal**:
Catatan pada laporan yang hanya ditujukan untuk koordinasi administrator dan teknisi.
_Avoid_: Komentar rahasia, log sistem

**Kategori Laporan**:
Controlled vocabulary untuk mengelompokkan jenis masalah fasilitas kampus seperti Internet, AC, Peralatan Kelas, Kebersihan, dan Lainnya.
_Avoid_: Tag bebas, klasifikasi AI

**Prioritas Laporan**:
Controlled vocabulary yang menunjukkan tingkat urgensi penanganan laporan: LOW, MEDIUM, HIGH, atau URGENT.
_Avoid_: Skor bebas, ranking manual

**Saran Prioritas**:
Rekomendasi awal dari sistem untuk membantu administrator menentukan prioritas, tanpa menggantikan keputusan akhir administrator.
_Avoid_: Prioritas otomatis final, AI kategori

**Riwayat Status**:
Audit trail perubahan status laporan yang mencatat status asal, status tujuan, role pengubah, waktu perubahan, dan catatan perubahan.
_Avoid_: Log teknis, histori umum

**Status Workflow**:
Enam status utama laporan: SUBMITTED, UNDER_REVIEW, ASSIGNED, IN_PROGRESS, RESOLVED, dan CLOSED.
_Avoid_: Status tambahan untuk konfirmasi atau override

**Master-Detail View**:
Pola tampilan satu halaman yang menampilkan daftar laporan dan panel detail laporan yang dipilih.
_Avoid_: Multi-page routing, halaman terpisah

**Pencarian Laporan**:
Pencarian teks untuk menemukan laporan berdasarkan nomor laporan, judul, lokasi, atau kategori.
_Avoid_: Pencarian semua kolom, pencarian bebas tanpa batas

**Data Pelapor**:
Nama dan tipe pelapor yang dicatat pada laporan untuk menunjukkan siapa yang melaporkan masalah.
_Avoid_: Akun pelapor, profil pengguna

**Filter Kombinasi**:
Penyaringan daftar laporan menggunakan beberapa kriteria sekaligus seperti status, kategori, prioritas, dan teknisi.
_Avoid_: Filter tunggal saja, query acak

**Simulasi Role**:
Cara merepresentasikan peran pengguna tanpa autentikasi penuh agar alur kerja inti dapat diuji dan diselesaikan lebih dulu.
_Avoid_: Login palsu, autentikasi sementara

**Role-Based UI**:
Tampilan aplikasi yang menyesuaikan aksi dan informasi berdasarkan role aktif pada simulasi role.
_Avoid_: UI sama untuk semua role, hak akses tersembunyi

**Role-Based API Validation**:
Validasi API yang memastikan aksi pada laporan hanya dilakukan oleh role yang berwenang.
_Avoid_: Validasi frontend saja, akses bebas

**Autentikasi Penuh**:
Sistem login yang memverifikasi identitas pengguna sebelum memberikan akses berdasarkan peran.
_Avoid_: Login Google, sign in
