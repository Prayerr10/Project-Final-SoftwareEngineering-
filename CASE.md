# Campus Service Request and Maintenance System

## 1. Ringkasan Studi Kasus

Project ini adalah aplikasi web untuk membantu mahasiswa atau dosen melaporkan masalah fasilitas kampus. Contoh masalah yang dapat dilaporkan meliputi proyektor rusak, internet bermasalah, AC tidak dingin, kursi rusak, alat laboratorium bermasalah, atau ruangan kotor.

Laporan yang masuk akan diperiksa oleh administrator. Setelah diperiksa, laporan dapat diberi kategori, prioritas, dan ditugaskan kepada teknisi. Teknisi kemudian memperbarui progres pekerjaan sampai masalah diselesaikan. Pelapor dapat melihat perkembangan laporan dan memberikan konfirmasi. Setelah proses selesai, administrator menutup laporan.

Project ini tidak hanya menilai aplikasi akhir, tetapi juga menilai proses software engineering dari requirements engineering, desain, GitHub planning, penggunaan AI, coding bertahap, testing, deployment ke Cloudflare, traceability, human review, sampai dokumentasi akhir.

## 2. Sumber Instruksi

Dokumen ini dibuat berdasarkan file `instruksi-dosen.md`, khususnya bagian:

- Tujuan Tugas
- Studi Kasus
- Aktor Sistem
- Fitur Wajib
- Fitur yang Tidak Wajib
- Alur Sistem
- Penggunaan AI
- Work Product
- Struktur Repository
- Ketentuan Minimum
- Tutorial pembuatan aplikasi
- Template issue, pull request, human review, dan traceability

Jika ada perbedaan antara dokumen ini dan `instruksi-dosen.md`, maka `instruksi-dosen.md` menjadi acuan utama.

## 3. Masalah yang Ingin Diselesaikan

Pelaporan masalah fasilitas kampus dapat menjadi sulit dilacak jika dilakukan secara manual atau tersebar di banyak media. Pelapor mungkin tidak mengetahui apakah laporan sudah diperiksa, siapa yang menangani, dan apakah pekerjaan sudah selesai. Administrator juga membutuhkan cara yang lebih terstruktur untuk memeriksa laporan, menentukan prioritas, menugaskan teknisi, dan menutup laporan.

Teknisi membutuhkan daftar tugas yang jelas serta cara untuk memperbarui progres pekerjaan. Manajer fasilitas membutuhkan ringkasan kondisi laporan agar dapat melihat jumlah laporan, status pekerjaan, dan gambaran umum masalah fasilitas kampus.

Sistem ini dibuat untuk menyediakan alur pelaporan dan pemeliharaan yang lebih terpusat, terdokumentasi, dan dapat diuji.

## 4. Tujuan Sistem

Tujuan utama sistem adalah:

- Memudahkan pelapor membuat laporan masalah fasilitas kampus.
- Menyediakan daftar laporan yang dapat dilihat dan dipantau.
- Membantu administrator memeriksa laporan masuk.
- Membantu administrator menentukan kategori dan prioritas laporan.
- Membantu administrator menugaskan laporan kepada teknisi.
- Membantu teknisi melihat tugas dan memperbarui progres pekerjaan.
- Menyediakan riwayat status agar perubahan laporan dapat dilacak.
- Memungkinkan pelapor melihat perkembangan dan mengonfirmasi hasil.
- Memungkinkan administrator menutup atau membuka kembali laporan.
- Menyediakan dashboard sederhana untuk manajer fasilitas.
- Menjaga traceability dari requirement sampai test.

## 5. Aktor Sistem

### 5.1 Pelapor

Pelapor adalah mahasiswa atau dosen yang menemukan masalah fasilitas kampus.

Pelapor dapat:

- Membuat laporan.
- Melihat status laporan.
- Menambahkan komentar.
- Mengonfirmasi hasil pekerjaan.

### 5.2 Administrator

Administrator adalah pihak yang memeriksa laporan masuk dan mengelola proses penanganan.

Administrator dapat:

- Memeriksa laporan.
- Menentukan kategori laporan.
- Menentukan prioritas laporan.
- Menugaskan teknisi.
- Menutup laporan.
- Membuka kembali laporan jika diperlukan.

### 5.3 Teknisi

Teknisi adalah pihak yang menangani pekerjaan perbaikan atau pemeliharaan fasilitas.

Teknisi dapat:

- Melihat tugas yang diberikan.
- Menerima tugas.
- Memperbarui progres pekerjaan.
- Menandai pekerjaan selesai.

### 5.4 Manajer Fasilitas

Manajer fasilitas adalah pihak yang memantau kondisi umum laporan dan pekerjaan fasilitas.

Manajer fasilitas dapat:

- Melihat dashboard.
- Melihat laporan ringkas.

## 6. Scope Sistem

Fitur yang termasuk scope wajib project:

- Membuat laporan baru.
- Melihat daftar laporan.
- Mencari laporan.
- Menyaring laporan.
- Melihat detail laporan.
- Memeriksa laporan.
- Menentukan prioritas.
- Menugaskan teknisi.
- Mengubah status pekerjaan.
- Menambahkan komentar atau catatan.
- Menyimpan riwayat status.
- Menutup laporan.
- Membuka kembali laporan.
- Menampilkan dashboard sederhana.

## 7. Out of Scope

Fitur berikut tidak wajib dikerjakan pada project ini:

- Upload foto.
- Email notification.
- Login menggunakan akun Google.
- QR code ruangan.
- AI untuk menentukan kategori.
- Inventory spare part.
- Vendor management.

Fitur out of scope tidak akan menjadi prioritas sampai seluruh fitur wajib, testing, dokumentasi, traceability, dan deployment selesai.

## 8. Alur Status Laporan

Alur status utama dari instruksi dosen:

```text
Submitted
Under Review
Assigned
In Progress
Resolved
Closed
```

Makna awal setiap status:

| Status | Makna |
| --- | --- |
| Submitted | Laporan baru dibuat oleh pelapor. |
| Under Review | Laporan sedang diperiksa administrator. |
| Assigned | Laporan sudah ditugaskan kepada teknisi. |
| In Progress | Teknisi sedang mengerjakan laporan. |
| Resolved | Teknisi menandai pekerjaan sudah selesai. |
| Closed | Administrator menutup laporan setelah hasil diterima. |

Status tambahan boleh dibuat hanya jika dijelaskan dalam requirements dan business rules.

## 9. Data Utama Sistem

Data awal yang perlu disimpan oleh sistem:

- Laporan layanan atau perbaikan.
- Nomor laporan.
- Judul laporan.
- Deskripsi laporan.
- Lokasi masalah.
- Kategori laporan.
- Prioritas laporan.
- Status laporan.
- Komentar atau catatan.
- Riwayat perubahan status.
- Teknisi yang ditugaskan.

Pada tahap tutorial awal, tabel pertama yang dibuat adalah `service_requests`.

## 10. Aturan Bisnis Awal

Aturan bisnis awal yang diturunkan dari instruksi project:

- Setiap laporan baru memiliki status awal `SUBMITTED`.
- Laporan wajib memiliki judul, deskripsi, lokasi, dan kategori.
- Deskripsi laporan pada tutorial awal minimal 20 karakter.
- Administrator memeriksa laporan sebelum laporan ditugaskan ke teknisi.
- Administrator menentukan kategori dan prioritas laporan.
- Teknisi memperbarui progres pekerjaan sampai selesai.
- Status laporan harus disimpan sebagai riwayat agar perubahan dapat dilacak.
- Laporan dapat ditutup oleh administrator.
- Laporan dapat dibuka kembali jika diperlukan.
- Jika ada status tambahan, status tersebut harus dijelaskan pada requirements dan business rules.

## 11. Batasan Teknis

Batasan teknis dari instruksi dosen:

- Aplikasi berbentuk web application.
- Frontend menggunakan React.
- Backend/API menggunakan Cloudflare Workers.
- Database menggunakan Cloudflare D1.
- Deployment menggunakan Cloudflare.
- Project menggunakan layanan gratis dan tidak menggunakan layanan berbayar.
- Repository disimpan di GitHub.
- Struktur repository mengikuti instruksi dosen.
- Testing otomatis wajib dibuat.
- GitHub Actions digunakan untuk pemeriksaan otomatis.

## 12. Struktur Repository yang Digunakan

Struktur repository mengikuti instruksi dosen:

```text
campus-maintenance/
README.md
CASE.md
skills/
docs/
docs/requirements/
docs/design/
docs/testing/
docs/deployment/
src/
worker/
database/
database/migrations/
tests/
tests/unit/
tests/integration/
tests/acceptance/
evidence/
.github/
wrangler.jsonc
```

Struktur boleh bertambah jika diperlukan, tetapi tidak boleh diubah tanpa alasan yang jelas.

## 13. Work Product yang Harus Dihasilkan

Project harus menghasilkan work product berikut:

| Tahap | Output Minimum |
| --- | --- |
| Requirements | Inception, elicitation, requirements, user stories, prioritas, validasi, change request, traceability. |
| Design | Architecture, database, API, UI flow, wireframe. |
| Planning | GitHub Issues dan rencana pengerjaan. |
| Coding | Source code, branch, commit, dan pull request. |
| Testing | Test plan, unit test, integration test, acceptance test. |
| Deployment | URL Cloudflare, bukti test, release note. |
| AI Evidence | Prompt/invocation, output AI, review manusia, hasil final. |

## 14. Ketentuan Minimum Project

Ketentuan minimum dari instruksi dosen:

| Item | Minimum |
| --- | --- |
| Functional requirement | 12 |
| Non-functional requirement | 6 |
| Business rule | 5 |
| User story | 10 |
| Acceptance criteria | 2 untuk setiap user story |
| GitHub Issues | 10 |
| Pull Request | 6 |
| Automated test | 20 |
| Change request | 1 |
| Deployment | 1 URL publik |

## 15. Penggunaan AI

AI wajib digunakan, tetapi AI tidak boleh mengambil keputusan akhir. Penggunaan AI harus terdokumentasi.

Alur penggunaan AI:

- AI membuat draft.
- Mahasiswa memeriksa fakta dan asumsi.
- Mahasiswa dan AI memperbaiki requirement atau kode.
- Mahasiswa menjalankan test.
- Mahasiswa atau reviewer menyetujui hasil.
- Mahasiswa bertanggung jawab terhadap hasil akhir.

Setiap output AI yang penting harus disimpan sebagai evidence. Output tersebut harus direview manusia, diperbaiki jika ada kesalahan, dan disimpan hasil finalnya.

## 16. Skills AI yang Akan Dibuat

Instruksi dosen meminta 15 file `SKILL.md`. Setiap skill hanya menangani satu jenis pekerjaan:

| No | Nama Skill | Tujuan |
| --- | --- | --- |
| 01 | Inception dan Stakeholder | Memahami masalah, tujuan, stakeholder, scope, asumsi, dan pertanyaan terbuka. |
| 02 | Elicitation | Menyusun pertanyaan dan menemukan kebutuhan stakeholder. |
| 03 | Specification | Membuat functional requirement, non-functional requirement, user story, dan acceptance criteria. |
| 04 | Prioritization | Menentukan prioritas dan menyelesaikan konflik kebutuhan. |
| 05 | Validation dan Change | Memeriksa requirement dan menganalisis perubahan. |
| 06 | Architecture Design | Menentukan bagian utama aplikasi. |
| 07 | Database dan API Design | Membuat tabel database dan endpoint API. |
| 08 | UI Design | Membuat halaman, navigasi, form, dan wireframe. |
| 09 | Issue Planning | Mengubah requirement menjadi GitHub Issues. |
| 10 | Implementation | Mengerjakan satu issue menjadi kode. |
| 11 | Code Review | Memeriksa kode dan test. |
| 12 | Test Planning | Membuat rencana pengujian. |
| 13 | Automated Testing | Membuat unit test dan integration test. |
| 14 | Acceptance Testing | Menguji alur lengkap pengguna. |
| 15 | Deployment | Mempublikasikan aplikasi dan memeriksa hasilnya. |

## 17. Asumsi Awal

Asumsi berikut dibuat untuk membantu implementasi awal. Asumsi ini harus divalidasi dan dapat berubah jika requirements final berubah.

- Pada versi awal, autentikasi penuh belum menjadi prioritas.
- Role pengguna dapat disimulasikan terlebih dahulu selama belum ada sistem login.
- Fokus implementasi awal adalah laporan dapat dibuat, disimpan, ditampilkan, dan diuji.
- Fitur wajib akan dikerjakan bertahap melalui GitHub Issues dan Pull Request.
- Deployment awal menggunakan domain Cloudflare Workers atau Pages yang disediakan Cloudflare.

## 18. Risiko Awal

Risiko yang perlu diperhatikan:

- Fitur berkembang keluar scope sebelum fitur wajib selesai.
- Traceability tidak diperbarui setelah requirement, kode, atau test berubah.
- Output AI langsung digunakan tanpa human review.
- Jumlah minimum test, issue, pull request, atau skill tidak terpenuhi.
- Migration D1 lokal berhasil, tetapi migration production lupa dijalankan.
- Binding D1 tidak konsisten dengan kode Worker.
- Secret, token, atau kredensial tidak sengaja masuk ke GitHub.

## 19. Indikator Keberhasilan Awal

Tahap awal dianggap berhasil jika:

- Project dapat dijalankan secara lokal.
- Form laporan dapat digunakan.
- API dapat menerima dan mengembalikan data.
- Data tersimpan di D1 lokal.
- Refresh halaman tidak menghapus data.
- `GET /api/health` mengembalikan status `ok`.
- Build berhasil dijalankan.
- Perubahan disimpan di branch kerja dan dipush ke GitHub.

## 20. Catatan Traceability

Setiap requirement, user story, issue, kode, dan test harus menggunakan ID yang konsisten. Contoh format ID:

- `FR-01` untuk functional requirement.
- `NFR-01` untuk non-functional requirement.
- `BR-01` untuk business rule.
- `US-01` untuk user story.
- `AC-01.1` untuk acceptance criteria.
- `UT-01` untuk unit test.
- `IT-01` untuk integration test.
- `AT-01` untuk acceptance test.

Traceability matrix harus diperbarui setiap kali ada requirement, issue, kode, atau test yang selesai.
