# Project Inception and Stakeholder Discovery

Status: Human Reviewed & Approved

Skill: 01 - Inception dan Stakeholder

Tanggal draft: 2026-07-01

Catatan batas kerja:

- Dokumen ini hanya mencakup tahap inception dan stakeholder discovery.
- Draft requirements lama di folder `docs/requirements/` sengaja tidak digunakan sebagai bukti utama.
- `skills/SKILL-01.md` di workspace aktif tidak ditemukan; instruksi Skill 01 yang digunakan adalah skill terinstal di `C:\Users\Asus\.codex\skills\01-inception\SKILL.md`.
- Review manusia untuk dokumen ini dicatat di `evidence/human-review-inception.md`.

## Evidence Summary

| Source | Evidence Used | Label |
|---|---|---|
| `CASE.md` | Sistem adalah aplikasi web untuk mahasiswa atau dosen melaporkan masalah fasilitas kampus. | FACT |
| `CASE.md` | Contoh masalah meliputi proyektor rusak, internet bermasalah, AC tidak dingin, kursi rusak, alat laboratorium bermasalah, dan ruangan kotor. | FACT |
| `CASE.md` | Laporan diperiksa administrator, diberi kategori dan prioritas, ditugaskan ke teknisi, diperbarui progresnya, dikonfirmasi pelapor, lalu ditutup administrator. | FACT |
| `CASE.md` | Aktor sistem adalah Pelapor, Administrator, Teknisi, dan Manajer Fasilitas. | FACT |
| `CASE.md` | Scope wajib mencakup pembuatan laporan, daftar laporan, pencarian/filter, detail, review, prioritas, assignment, status, komentar/catatan, status history, close/reopen, dan dashboard. | FACT |
| `CASE.md` | Upload foto, email notification, login Google, QR code ruangan, AI kategori, inventory spare part, dan vendor management tidak wajib. | FACT |
| `CASE.md` | Status tambahan boleh dibuat hanya jika dijelaskan dalam requirements dan business rules. | FACT |
| `CASE.md` | Teknologi dibatasi pada React, Cloudflare Workers, Cloudflare D1, Cloudflare deployment, GitHub, testing otomatis, dan GitHub Actions. | CONSTRAINT |
| `C:\Users\Asus\campus-maintenance\instruksi-dosen.md` | AI boleh membuat draft, tetapi mahasiswa/reviewer harus memeriksa, memperbaiki, dan menyetujui hasil. | CONSTRAINT |
| `ringkasan-sesi-pertama.md` | Project harus mengikuti urutan kerja dan tidak langsung membuat seluruh aplikasi. | CONSTRAINT |
| `docs/requirements/grill-session-summary.md` | Human review menyetujui role utama: Pelapor (Student/Lecturer), Administrator, Teknisi, dan Manajer Fasilitas. | FACT |
| `docs/requirements/grill-session-summary.md` | UI harus berubah dinamis berdasarkan role yang dipilih. | FACT |
| `docs/requirements/grill-session-summary.md` | Data pelapor disimpan sebagai `reporter_name` dan `reporter_type`. | FACT |
| `docs/requirements/grill-session-summary.md` | Status utama dibatasi pada SUBMITTED, UNDER_REVIEW, ASSIGNED, IN_PROGRESS, RESOLVED, dan CLOSED. | FACT |
| `docs/requirements/grill-session-summary.md` | Pelapor wajib konfirmasi hasil sebelum status CLOSED, dengan manual override oleh Administrator. | FACT |
| `docs/requirements/grill-session-summary.md` | Reopen mengembalikan laporan ke UNDER_REVIEW untuk validasi ulang Administrator. | FACT |
| `docs/requirements/grill-session-summary.md` | Dashboard harus mencakup beban tugas per teknisi. | FACT |
| `docs/requirements/grill-session-summary.md` | Komentar Publik dapat dilihat oleh Pelapor, Admin, dan Teknisi. | FACT |
| `docs/requirements/grill-session-summary.md` | Catatan Internal hanya dapat dilihat Admin/Teknisi. | FACT |
| `docs/requirements/grill-session-summary.md` | UI menggunakan Master-Detail View dalam Single Page App. | FACT |
| `docs/requirements/grill-session-summary.md` | Pencarian menggunakan debounced search dan advanced filtering multi-kombinasi status/prioritas. | FACT |
| `docs/requirements/grill-session-summary.md` | Kategori menggunakan fixed list sebagai controlled vocabulary. | FACT |
| `docs/requirements/grill-session-summary.md` | Prioritas adalah LOW, MEDIUM, HIGH, dan URGENT. | FACT |
| `docs/requirements/grill-session-summary.md` | Laporan dari LECTURER memberi saran prioritas HIGH, tetapi keputusan akhir tetap Administrator. | FACT |
| `docs/requirements/grill-session-summary.md` | Status history wajib mencatat `from_status`, `to_status`, `changed_by_role`, `timestamp`, dan `note`. | FACT |

## Case Context

- `FACT` (`CASE.md`): Project ini adalah Campus Service Request and Maintenance System, yaitu aplikasi web untuk membantu mahasiswa atau dosen melaporkan masalah fasilitas kampus.
- `FACT` (`CASE.md`): Masalah fasilitas yang menjadi contoh kasus mencakup proyektor rusak, internet bermasalah, AC tidak dingin, kursi rusak, alat laboratorium bermasalah, dan ruangan kotor.
- `FACT` (`CASE.md`): Masalah utama yang ingin diselesaikan adalah pelaporan fasilitas yang sulit dilacak bila dilakukan secara manual atau tersebar di banyak media.
- `FACT` (`CASE.md`): Sistem harus membantu pelapor mengetahui status dan perkembangan laporan, membantu Administrator mengelola penanganan, membantu Teknisi melihat tugas dan memperbarui progres, serta membantu Manajer Fasilitas melihat ringkasan kondisi laporan.
- `FACT` (`CASE.md`): Project dinilai bukan hanya dari aplikasi akhir, tetapi juga requirements engineering, desain, GitHub planning, penggunaan AI, coding bertahap, testing, deployment Cloudflare, traceability, human review, dan dokumentasi akhir.
- `CONSTRAINT` (`C:\Users\Asus\campus-maintenance\instruksi-dosen.md`): AI wajib digunakan sebagai pembuat draft atau pendamping kerja, tetapi keputusan akhir tetap harus melalui pemeriksaan dan persetujuan manusia.

## Initial Objectives

- `FACT` (`CASE.md`): Memudahkan pelapor membuat laporan masalah fasilitas kampus.
- `FACT` (`CASE.md`): Menyediakan daftar laporan yang dapat dilihat dan dipantau.
- `FACT` (`CASE.md`): Membantu Administrator memeriksa laporan masuk.
- `FACT` (`CASE.md`): Membantu Administrator menentukan kategori dan prioritas laporan.
- `FACT` (`CASE.md`): Membantu Administrator menugaskan laporan kepada Teknisi.
- `FACT` (`CASE.md`): Membantu Teknisi melihat tugas dan memperbarui progres pekerjaan.
- `FACT` (`CASE.md`): Menyediakan riwayat status agar perubahan laporan dapat dilacak.
- `FACT` (`CASE.md`): Memungkinkan pelapor melihat perkembangan dan mengonfirmasi hasil.
- `FACT` (`CASE.md`): Memungkinkan Administrator menutup atau membuka kembali laporan.
- `FACT` (`CASE.md`): Menyediakan dashboard sederhana untuk Manajer Fasilitas.
- `FACT` (`CASE.md`): Menjaga traceability dari requirement sampai test.

## Stakeholder Analysis

### Pelapor

#### Needs

- `FACT` (`CASE.md`): Pelapor perlu membuat laporan masalah fasilitas kampus.
- `FACT` (`CASE.md`): Pelapor perlu melihat status atau perkembangan laporan.
- `FACT` (`CASE.md`): Pelapor perlu menambahkan komentar.
- `FACT` (`CASE.md`): Pelapor perlu mengonfirmasi hasil pekerjaan.
- `FACT` (`docs/requirements/grill-session-summary.md`): Pelapor dapat berupa Student atau Lecturer, dan data pelapor disimpan sebagai `reporter_name` dan `reporter_type`.
- `FACT` (`docs/requirements/grill-session-summary.md`): UI harus berubah dinamis berdasarkan role yang dipilih.

#### Interests

- `ASSUMPTION` (`CASE.md`): Pelapor berkepentingan agar laporan tidak hilang atau sulit dilacak setelah dikirim.
- `ASSUMPTION` (`CASE.md`): Pelapor berkepentingan memperoleh transparansi progres penanganan.
- `ASSUMPTION` (`docs/requirements/grill-session-summary.md`): Pelapor Lecturer kemungkinan membutuhkan perlakuan prioritas yang lebih tinggi, tetapi keputusan prioritas tetap berada pada Administrator.

#### Information Gaps

- `OPEN QUESTION` (`CASE.md`, `docs/requirements/grill-session-summary.md`): Format minimal data identitas pelapor selain `reporter_name` dan `reporter_type` belum dijelaskan.
- `OPEN QUESTION` (`CASE.md`): Batas kapan pelapor dapat menambahkan Komentar Publik belum dijelaskan.
- `OPEN QUESTION` (`docs/requirements/grill-session-summary.md`): Mekanisme konfirmasi hasil oleh Pelapor belum dijelaskan secara rinci.

### Administrator

#### Needs

- `FACT` (`CASE.md`): Administrator perlu memeriksa laporan yang masuk.
- `FACT` (`CASE.md`): Administrator perlu menentukan kategori dan prioritas laporan.
- `FACT` (`CASE.md`): Administrator perlu menugaskan laporan kepada Teknisi.
- `FACT` (`CASE.md`): Administrator perlu menutup laporan.
- `FACT` (`CASE.md`): Administrator perlu membuka kembali laporan jika diperlukan.
- `FACT` (`docs/requirements/grill-session-summary.md`): Administrator memiliki keputusan akhir atas prioritas, termasuk saat laporan dari Lecturer memberi saran prioritas HIGH.
- `FACT` (`docs/requirements/grill-session-summary.md`): Administrator memiliki manual override untuk menutup laporan ketika konfirmasi pelapor tidak tersedia atau perlu dilewati.
- `FACT` (`docs/requirements/grill-session-summary.md`): Administrator dapat melihat Catatan Internal.

#### Interests

- `ASSUMPTION` (`CASE.md`): Administrator berkepentingan menjaga alur penanganan laporan tetap tertib dari pemeriksaan sampai penutupan.
- `ASSUMPTION` (`CASE.md`): Administrator berkepentingan memiliki data kategori, prioritas, status, assignment, komentar, dan riwayat agar keputusan dapat dipertanggungjawabkan.
- `ASSUMPTION` (`docs/requirements/grill-session-summary.md`): Administrator berkepentingan memiliki controlled vocabulary agar kategori dan prioritas tidak berantakan.

#### Information Gaps

- `OPEN QUESTION` (`CASE.md`): Kriteria Administrator dalam menentukan prioritas belum dijelaskan.
- `OPEN QUESTION` (`CASE.md`): Aturan detail kapan laporan boleh dibuka kembali belum dijelaskan.
- `OPEN QUESTION` (`docs/requirements/grill-session-summary.md`): Kondisi yang membenarkan manual override oleh Administrator belum dijelaskan.

### Teknisi

#### Needs

- `FACT` (`CASE.md`): Teknisi perlu melihat tugas yang diberikan.
- `FACT` (`CASE.md`): Teknisi perlu menerima tugas.
- `FACT` (`CASE.md`): Teknisi perlu memperbarui progres pekerjaan.
- `FACT` (`CASE.md`): Teknisi perlu menandai pekerjaan selesai.
- `FACT` (`docs/requirements/grill-session-summary.md`): Dashboard harus mencakup beban tugas per Teknisi.
- `FACT` (`docs/requirements/grill-session-summary.md`): Teknisi dapat melihat Catatan Internal.

#### Interests

- `ASSUMPTION` (`CASE.md`): Teknisi berkepentingan mendapat daftar tugas yang jelas dan dapat diprioritaskan.
- `ASSUMPTION` (`docs/requirements/grill-session-summary.md`): Teknisi berkepentingan agar beban tugas terlihat supaya assignment lebih seimbang.
- `ASSUMPTION` (`docs/requirements/grill-session-summary.md`): Teknisi berkepentingan memisahkan Catatan Internal dari Komentar Publik agar koordinasi teknis tidak selalu tampil ke Pelapor.

#### Information Gaps

- `OPEN QUESTION` (`CASE.md`): Struktur data Teknisi, seperti nama, spesialisasi, dan status ketersediaan, belum dijelaskan.
- `OPEN QUESTION` (`CASE.md`): Apakah Teknisi boleh menolak tugas atau hanya menerima tugas belum dijelaskan.
- `OPEN QUESTION` (`docs/requirements/grill-session-summary.md`): Cara menghitung beban tugas per Teknisi belum dijelaskan.

### Manajer Fasilitas

#### Needs

- `FACT` (`CASE.md`): Manajer Fasilitas perlu melihat dashboard.
- `FACT` (`CASE.md`): Manajer Fasilitas perlu melihat laporan ringkas.
- `FACT` (`docs/requirements/grill-session-summary.md`): Dashboard perlu mencakup beban tugas per Teknisi.

#### Interests

- `ASSUMPTION` (`CASE.md`): Manajer Fasilitas berkepentingan memahami kondisi umum laporan dan pekerjaan fasilitas kampus.
- `ASSUMPTION` (`CASE.md`): Manajer Fasilitas berkepentingan memantau jumlah laporan, status pekerjaan, dan gambaran umum masalah fasilitas.
- `ASSUMPTION` (`docs/requirements/grill-session-summary.md`): Manajer Fasilitas berkepentingan melihat utilitas Teknisi agar dapat menilai distribusi pekerjaan.

#### Information Gaps

- `OPEN QUESTION` (`CASE.md`): Metrik dashboard yang wajib ditampilkan selain ringkasan laporan dan beban Teknisi belum lengkap.
- `OPEN QUESTION` (`CASE.md`, `docs/requirements/grill-session-summary.md`): Apakah Manajer Fasilitas dapat melihat detail laporan dan Catatan Internal belum dijelaskan.
- `OPEN QUESTION` (`CASE.md`): Apakah Manajer Fasilitas dapat mengambil tindakan di sistem atau hanya memantau belum dijelaskan.

## Scope Boundaries

### In Scope

- `FACT` (`CASE.md`): Membuat laporan baru.
- `FACT` (`CASE.md`): Melihat daftar laporan.
- `FACT` (`CASE.md`): Mencari laporan.
- `FACT` (`CASE.md`): Menyaring laporan.
- `FACT` (`CASE.md`): Melihat detail laporan.
- `FACT` (`CASE.md`): Memeriksa laporan.
- `FACT` (`CASE.md`): Menentukan prioritas.
- `FACT` (`CASE.md`): Menugaskan Teknisi.
- `FACT` (`CASE.md`): Mengubah status pekerjaan.
- `FACT` (`CASE.md`): Menambahkan komentar atau catatan.
- `FACT` (`CASE.md`): Menyimpan riwayat status.
- `FACT` (`CASE.md`): Menutup laporan.
- `FACT` (`CASE.md`): Membuka kembali laporan.
- `FACT` (`CASE.md`): Menampilkan dashboard sederhana.
- `FACT` (`docs/requirements/grill-session-summary.md`): UI harus berubah dinamis berdasarkan role yang dipilih.
- `FACT` (`docs/requirements/grill-session-summary.md`): Master-Detail View dalam Single Page App termasuk pendekatan UI yang disetujui.
- `FACT` (`docs/requirements/grill-session-summary.md`): Debounced search dan advanced filtering multi-kombinasi status/prioritas termasuk keputusan yang disetujui.
- `FACT` (`docs/requirements/grill-session-summary.md`): Komentar Publik dapat dilihat oleh Pelapor, Admin, dan Teknisi; Catatan Internal hanya dapat dilihat oleh Admin dan Teknisi.
- `FACT` (`docs/requirements/grill-session-summary.md`): Status history harus mencatat `from_status`, `to_status`, `changed_by_role`, `timestamp`, dan `note`.

### Out of Scope

- `FACT` (`CASE.md`): Upload foto tidak wajib.
- `FACT` (`CASE.md`): Email notification tidak wajib.
- `FACT` (`CASE.md`): Login menggunakan akun Google tidak wajib.
- `FACT` (`CASE.md`): QR code ruangan tidak wajib.
- `FACT` (`CASE.md`): AI untuk menentukan kategori tidak wajib.
- `FACT` (`CASE.md`): Inventory spare part tidak wajib.
- `FACT` (`CASE.md`): Vendor management tidak wajib.
- `CONSTRAINT` (`CASE.md`): Fitur out of scope tidak diprioritaskan sampai seluruh fitur wajib, testing, dokumentasi, traceability, dan deployment selesai.

### Unresolved

- `OPEN QUESTION` (`CASE.md`): Apakah fitur reopen dapat dilakukan oleh Administrator saja atau juga dipicu oleh Pelapor.
- `OPEN QUESTION` (`CASE.md`, `docs/requirements/grill-session-summary.md`): Apakah Manajer Fasilitas dapat melihat detail laporan dan Catatan Internal.
- `OPEN QUESTION` (`CASE.md`): Apakah enam status strict perlu didukung sub-state non-status, seperti flag menunggu konfirmasi.

## FACT

- `FACT` (`CASE.md`): Sistem adalah aplikasi web Campus Service Request and Maintenance System.
- `FACT` (`CASE.md`): Pelapor adalah mahasiswa atau dosen yang menemukan masalah fasilitas kampus.
- `FACT` (`CASE.md`): Administrator memeriksa laporan, menentukan kategori dan prioritas, menugaskan Teknisi, serta menutup laporan.
- `FACT` (`CASE.md`): Teknisi melihat tugas, menerima tugas, memperbarui progres, dan menandai pekerjaan selesai.
- `FACT` (`CASE.md`): Manajer Fasilitas melihat dashboard dan laporan ringkas.
- `FACT` (`CASE.md`): Status utama dari instruksi dosen adalah Submitted, Under Review, Assigned, In Progress, Resolved, dan Closed.
- `FACT` (`CASE.md`): `CASE.md` menyatakan status tambahan boleh dibuat hanya jika dijelaskan dalam requirements dan business rules.
- `FACT` (`docs/requirements/grill-session-summary.md`): Status utama disepakati dalam format strict 6: SUBMITTED, UNDER_REVIEW, ASSIGNED, IN_PROGRESS, RESOLVED, dan CLOSED.
- `FACT` (`docs/requirements/grill-session-summary.md`): UI harus berubah dinamis berdasarkan role yang dipilih.
- `FACT` (`docs/requirements/grill-session-summary.md`): Pelapor wajib mengonfirmasi hasil sebelum CLOSED, kecuali Administrator memakai manual override.
- `FACT` (`docs/requirements/grill-session-summary.md`): Reopen mengembalikan laporan ke UNDER_REVIEW.
- `FACT` (`docs/requirements/grill-session-summary.md`): Kategori menggunakan fixed list sebagai controlled vocabulary.
- `FACT` (`docs/requirements/grill-session-summary.md`): Prioritas yang digunakan adalah LOW, MEDIUM, HIGH, dan URGENT.
- `FACT` (`docs/requirements/grill-session-summary.md`): Laporan dari LECTURER memberi saran prioritas HIGH, tetapi keputusan akhir tetap Administrator.
- `FACT` (`docs/requirements/grill-session-summary.md`): Komentar Publik dapat dilihat oleh Pelapor, Admin, dan Teknisi.
- `FACT` (`docs/requirements/grill-session-summary.md`): Catatan Internal hanya dapat dilihat oleh Admin dan Teknisi.

## ASSUMPTION

- `ASSUMPTION` (`CASE.md`): Fokus implementasi awal adalah laporan dapat dibuat, disimpan, ditampilkan, dan diuji sebelum fitur workflow lengkap.
- `ASSUMPTION` (`CASE.md`): Teknisi dapat direpresentasikan sebagai data aplikasi tanpa integrasi sistem pegawai kampus eksternal.
- `ASSUMPTION` (`CASE.md`): Dashboard sederhana cukup untuk mendukung pemantauan awal Manajer Fasilitas selama metriknya masih sesuai scope.
- `ASSUMPTION` (`docs/requirements/grill-session-summary.md`): Fixed list kategori dapat disusun dari contoh masalah di kasus, tetapi daftar final perlu dikonfirmasi pada elicitation.

## CONSTRAINT

- `CONSTRAINT` (`CASE.md`): Frontend menggunakan React.
- `CONSTRAINT` (`CASE.md`): Backend/API menggunakan Cloudflare Workers.
- `CONSTRAINT` (`CASE.md`): Database menggunakan Cloudflare D1.
- `CONSTRAINT` (`CASE.md`): Deployment menggunakan Cloudflare.
- `CONSTRAINT` (`CASE.md`): Project menggunakan layanan gratis dan tidak menggunakan layanan berbayar.
- `CONSTRAINT` (`CASE.md`): Repository disimpan di GitHub.
- `CONSTRAINT` (`CASE.md`): Testing otomatis wajib dibuat.
- `CONSTRAINT` (`CASE.md`): GitHub Actions digunakan untuk pemeriksaan otomatis.
- `CONSTRAINT` (`C:\Users\Asus\campus-maintenance\instruksi-dosen.md`): Output AI harus diperiksa, diperbaiki bila perlu, dan disetujui manusia.
- `CONSTRAINT` (`ringkasan-sesi-pertama.md`): Tahap berikutnya tidak boleh dilanjutkan sebelum human review menyetujui tahap ini.

## Resolved Decisions

- `DECISION` (`docs/requirements/grill-session-summary.md`): UI akan menggunakan simulator role dinamis untuk berpindah antar aktor (Pelapor, Admin, Teknisi, Manajer) tanpa autentikasi kompleks sesuai kesepakatan di `grill-session-summary.md`.
- `DECISION` (`docs/requirements/grill-session-summary.md`): Komentar Publik dapat dilihat oleh Pelapor, Admin, dan Teknisi. Catatan Internal hanya dapat dilihat oleh Admin dan Teknisi.
- `DECISION` (`docs/requirements/grill-session-summary.md`): Dashboard akan mencakup utilitas Teknisi untuk memenuhi kriteria kompleksitas desain.
- `DECISION` (`CASE.md`, `docs/requirements/grill-session-summary.md`, `C:\Users\Asus\campus-maintenance\instruksi-dosen.md`): Strict 6 Statuses (SUBMITTED, UNDER_REVIEW, ASSIGNED, IN_PROGRESS, RESOLVED, CLOSED) ditetapkan sebagai basis utama. Penambahan status di masa depan harus melalui Change Request resmi sesuai `instruksi-dosen.md`.

## OPEN QUESTION

| ID | Question | Urgency | Rationale | Source Gap |
|---|---|---|---|---|
| OPEN-02 | Data identitas Pelapor apa saja yang wajib disimpan selain `reporter_name` dan `reporter_type`? | High | Data ini memengaruhi struktur laporan dan tampilan detail. | `docs/requirements/grill-session-summary.md` hanya menetapkan dua field. |
| OPEN-03 | Apa kondisi sah Administrator memakai manual override untuk menutup laporan tanpa konfirmasi Pelapor? | High | Aturan ini memengaruhi penutupan laporan dan audit proses. | `docs/requirements/grill-session-summary.md` menyebut manual override tetapi belum merinci kondisinya. |
| OPEN-04 | Apakah reopen hanya dapat dilakukan oleh Administrator, atau Pelapor juga dapat meminta reopen? | High | `CASE.md` mengindikasikan Administrator dapat membuka kembali laporan, tetapi pemicu dan aturan detailnya perlu dikonfirmasi eksplisit. | `CASE.md` menyebut membuka kembali laporan; aktor pemicu belum dijelaskan rinci. |
| OPEN-05 | Apa daftar final kategori fixed list yang akan digunakan? | Medium | Controlled vocabulary perlu jelas sebelum specification dan database/API design. | `docs/requirements/grill-session-summary.md` baru memberi contoh "Internet, AC, dsb" dan belum daftar lengkap. |
| OPEN-06 | Apa kriteria prioritas LOW, MEDIUM, HIGH, dan URGENT? | Medium | Administrator membutuhkan dasar konsisten untuk menentukan prioritas. | `CASE.md` dan `docs/requirements/grill-session-summary.md` menyebut prioritas, tetapi kriteria belum didefinisikan. |
| OPEN-07 | Bagaimana beban tugas per Teknisi dihitung untuk dashboard? | Medium | Dashboard wajib mencakup utilitas Teknisi, tetapi rumusnya belum jelas. | `docs/requirements/grill-session-summary.md` menyebut beban tugas per Teknisi tanpa definisi metrik. |
| OPEN-08 | Apakah Teknisi boleh menolak tugas atau hanya menerima dan memperbarui tugas yang diberikan? | Medium | Ini memengaruhi workflow assignment. | `CASE.md` menyebut menerima tugas, tetapi tidak menyebut penolakan. |
| OPEN-10 | Apakah Manajer Fasilitas hanya melihat dashboard/ringkasan, dapat membuka detail laporan, atau juga dapat melihat Catatan Internal? | Low | Hak akses Manajer Fasilitas perlu jelas sebelum UI design. | `CASE.md` hanya menyebut dashboard dan laporan ringkas; `docs/requirements/grill-session-summary.md` membatasi Catatan Internal untuk Admin/Teknisi. |
| OPEN-11 | Apakah enam status strict boleh memiliki sub-state non-status, seperti flag menunggu konfirmasi? | Low | Keputusan strict 6 perlu dijaga tanpa menghilangkan kebutuhan konfirmasi. | `docs/requirements/grill-session-summary.md` menetapkan strict 6; kebutuhan konfirmasi sebelum CLOSED tetap ada. |

## Contradictions and Risks

- `CONSTRAINT` (`CASE.md`, `docs/requirements/grill-session-summary.md`, `C:\Users\Asus\campus-maintenance\instruksi-dosen.md`): Sumber terbaru yang sudah human reviewed menetapkan Strict 6 Statuses sebagai basis utama. Risiko tahap berikutnya adalah menambah status baru tanpa Change Request resmi.
- `ASSUMPTION` (`CASE.md`): Role simulator sudah diputuskan untuk UI, tetapi detail hak aksi per role tetap perlu dijaga konsisten di specification dan design.
- `CONSTRAINT` (`C:\Users\Asus\campus-maintenance\instruksi-dosen.md`): Output AI tidak boleh langsung dianggap final. Risiko ini ditangani melalui human review yang dicatat di evidence.
- `CONSTRAINT` (`CASE.md`): Fitur out of scope tidak boleh menggeser prioritas fitur wajib. Risiko: upload foto, email, login Google, QR code, AI kategori, inventory, atau vendor management dapat menghabiskan waktu bila dimasukkan terlalu cepat.

## Handoff to Elicitation

- Investigasi ke Pelapor tentang data identitas tambahan selain `reporter_name` dan `reporter_type`, cara memantau perkembangan, kebutuhan Komentar Publik, dan mekanisme konfirmasi hasil.
- Investigasi ke Administrator tentang aturan review, kategori, prioritas, assignment, manual override, close, dan reopen.
- Investigasi ke Teknisi tentang alur menerima tugas, kemungkinan menolak tugas, memperbarui progres, menandai selesai, Catatan Internal, dan kebutuhan informasi tugas.
- Investigasi ke Manajer Fasilitas tentang metrik dashboard, rumus beban tugas Teknisi, akses detail laporan, dan batas akses terhadap Catatan Internal.
- Kunci daftar kategori, kriteria prioritas, aturan status history, aturan sub-state non-status, dan batas status strict 6 sebelum masuk specification.
