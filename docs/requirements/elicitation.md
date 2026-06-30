# Requirements Elicitation

Status: Human Reviewed & Approved

Skill: 02 - Elicitation

Tanggal draft: 2026-07-01

Catatan batas kerja:

- Dokumen ini hanya mencakup tahap Skill 02: Elicitation.
- `docs/requirements/inception.md` sudah berstatus `Human Reviewed & Approved` dan menjadi dasar utama pertanyaan elicitation.
- Dokumen ini tidak menetapkan functional requirements, user stories, acceptance criteria, prioritas, design, issue, atau kode.
- Semua ketidakjelasan dari tahap inception dipertahankan sebagai `OPEN QUESTION` untuk Human Review dan wawancara/kuesioner stakeholder.

## Input Sources

| Source ID | File | Location or Item | Evidence Label |
|---|---|---|---|
| EL-SRC-00 | `instruksi-dosen.md` | Instruksi utama project, urutan kerja, definisi Skill 02, work product, dan template review | FACT / CONSTRAINT |
| EL-SRC-01 | `CASE.md` | Studi kasus, aktor, scope wajib, out of scope, alur status, data utama, aturan bisnis awal, batasan teknis | FACT / CONSTRAINT / ASSUMPTION |
| EL-SRC-02 | `ringkasan-sesi-pertama.md` | Ringkasan konteks project, instruksi dosen, status kerja, preferensi urutan skill | FACT / CONSTRAINT |
| EL-SRC-03 | `docs/requirements/grill-session-summary.md` | Keputusan domain yang sudah Human Reviewed & Approved | FACT / DECISION |
| EL-SRC-04 | `docs/requirements/inception.md` | Status approved, stakeholder analysis, scope boundary, `OPEN QUESTION`, handoff to elicitation | FACT / ASSUMPTION / CONSTRAINT / OPEN QUESTION |

## Elicitation Approach

| Technique | Target Stakeholder | Purpose | Rationale |
|---|---|---|---|
| Follow-up interview | Pelapor | Mengklarifikasi identitas pelapor, komentar publik, konfirmasi hasil, dan kemungkinan permintaan reopen | Pertanyaan bersifat pengalaman pengguna dan membutuhkan jawaban naratif. |
| Questionnaire | Pelapor | Mengumpulkan preferensi data identitas dan cara konfirmasi dari Student/Lecturer | Pelapor dapat berjumlah banyak, sehingga kuesioner membantu menemukan pola tanpa membuat keputusan awal. |
| Follow-up interview | Administrator/Admin | Mengklarifikasi manual override, prioritas, kategori, assignment, close, dan reopen | Administrator memiliki keputusan proses sehingga perlu penjelasan aturan kerja. |
| Workshop | Administrator/Admin dan Teknisi | Mengklarifikasi assignment, penerimaan/penolakan tugas, dan status pekerjaan | Alur assignment melibatkan dua stakeholder dan berpotensi memiliki konflik operasional. |
| Follow-up interview | Teknisi | Mengklarifikasi struktur data teknisi, status ketersediaan, kebutuhan informasi tugas, dan progres pekerjaan | Detail pekerjaan teknis belum cukup jelas dari dokumen inception. |
| Follow-up interview | Manajer Fasilitas | Mengklarifikasi metrik dashboard, akses detail laporan, dan batas akses Catatan Internal | Manajer Fasilitas terutama membutuhkan ringkasan dan batas hak akses yang jelas. |
| Document analysis | Semua stakeholder | Memastikan jawaban tetap konsisten dengan strict 6 statuses dan scope wajib | Sumber approved menetapkan batas yang tidak boleh dilewati tanpa change request. |

## Open Question Register from Inception

| Open ID | OPEN QUESTION | Primary Target | Source ID | Urgency |
|---|---|---|---|---|
| OPEN-02 | Data identitas Pelapor apa saja yang wajib disimpan selain `reporter_name` dan `reporter_type`? | Pelapor | EL-SRC-04 | High |
| OPEN-03 | Apa kondisi sah Administrator memakai manual override untuk menutup laporan tanpa konfirmasi Pelapor? | Administrator/Admin | EL-SRC-04 | High |
| OPEN-04 | Apakah reopen hanya dapat dilakukan oleh Administrator, atau Pelapor juga dapat meminta reopen? | Pelapor, Administrator/Admin | EL-SRC-04 | High |
| OPEN-05 | Apa daftar final kategori fixed list yang akan digunakan? | Administrator/Admin | EL-SRC-04 | Medium |
| OPEN-06 | Apa kriteria prioritas LOW, MEDIUM, HIGH, dan URGENT? | Administrator/Admin | EL-SRC-04 | Medium |
| OPEN-07 | Bagaimana beban tugas per Teknisi dihitung untuk dashboard? | Teknisi, Manajer Fasilitas, Administrator/Admin | EL-SRC-04 | Medium |
| OPEN-08 | Apakah Teknisi boleh menolak tugas atau hanya menerima dan memperbarui tugas yang diberikan? | Teknisi, Administrator/Admin | EL-SRC-04 | Medium |
| OPEN-10 | Apakah Manajer Fasilitas hanya melihat dashboard/ringkasan, dapat membuka detail laporan, atau juga dapat melihat Catatan Internal? | Manajer Fasilitas | EL-SRC-04 | Low |
| OPEN-11 | Apakah enam status strict boleh memiliki sub-state non-status, seperti flag menunggu konfirmasi? | Administrator/Admin, Teknisi, Pelapor | EL-SRC-04 | Low |

## Draft Interview and Questionnaire Questions

### Pelapor

| Question ID | Related Open ID | Question | Technique | Status |
|---|---|---|---|---|
| EL-Q-01 | OPEN-02 | Selain `reporter_name` dan `reporter_type`, data identitas apa yang perlu dicatat saat Pelapor membuat laporan? | Follow-up interview | OPEN QUESTION |
| EL-Q-02 | OPEN-02 | Apakah kebutuhan data identitas berbeda antara Pelapor Student dan Lecturer? | Questionnaire | OPEN QUESTION |
| EL-Q-03 | OPEN-02 | Jika data kontak diperlukan, data kontak apa yang cukup untuk membantu tindak lanjut laporan? | Follow-up interview | OPEN QUESTION |
| EL-Q-04 | OPEN-04 | Dalam kondisi apa Pelapor perlu meminta laporan yang sudah selesai untuk dibuka kembali? | Follow-up interview | OPEN QUESTION |
| EL-Q-05 | OPEN-04 | Apakah Pelapor cukup mengirim permintaan reopen untuk ditinjau Administrator, atau Pelapor perlu dapat membuka kembali laporan secara langsung? | Follow-up interview | OPEN QUESTION |
| EL-Q-06 | OPEN-11 | Saat pekerjaan ditandai selesai, informasi apa yang perlu dilihat Pelapor sebelum memberi konfirmasi hasil? | Follow-up interview | OPEN QUESTION |
| EL-Q-07 | OPEN-11 | Apakah Pelapor perlu status visual atau penanda khusus ketika laporan menunggu konfirmasi hasil, tanpa menambah status utama baru? | Questionnaire | OPEN QUESTION |
| EL-Q-08 | OPEN-11 | Bagaimana Pelapor membedakan laporan yang masih dikerjakan, sudah selesai oleh Teknisi, dan masih menunggu konfirmasi Pelapor? | Follow-up interview | OPEN QUESTION |
| EL-Q-09 | OPEN-02 | Pada tahap status apa saja Pelapor perlu dapat menambahkan Komentar Publik pada laporan? | Follow-up interview | OPEN QUESTION |
| EL-Q-10 | OPEN-02 | Apakah Komentar Publik dari Pelapor perlu tetap dibuka setelah laporan `RESOLVED` atau `CLOSED`? | Follow-up interview | OPEN QUESTION |

### Administrator/Admin

| Question ID | Related Open ID | Question | Technique | Status |
|---|---|---|---|---|
| EL-Q-11 | OPEN-03 | Dalam kondisi apa Administrator boleh menutup laporan tanpa konfirmasi Pelapor? | Follow-up interview | OPEN QUESTION |
| EL-Q-12 | OPEN-03 | Data atau catatan apa yang harus dicatat ketika Administrator memakai manual override? | Follow-up interview | OPEN QUESTION |
| EL-Q-13 | OPEN-04 | Siapa yang boleh memicu proses reopen, dan siapa yang mengambil keputusan akhir untuk membuka kembali laporan? | Follow-up interview | OPEN QUESTION |
| EL-Q-14 | OPEN-04 | Informasi apa yang perlu diperiksa Administrator sebelum laporan yang diminta reopen dikembalikan ke `UNDER_REVIEW`? | Follow-up interview | OPEN QUESTION |
| EL-Q-15 | OPEN-05 | Apa daftar kategori final yang perlu digunakan sebagai fixed list untuk laporan fasilitas? | Workshop | OPEN QUESTION |
| EL-Q-16 | OPEN-05 | Apakah daftar kategori perlu mencakup contoh masalah dari kasus seperti internet, AC, proyektor, kursi, laboratorium, dan kebersihan, atau ada kategori lain yang lebih tepat? | Workshop | OPEN QUESTION |
| EL-Q-17 | OPEN-06 | Apa kriteria yang membedakan prioritas LOW, MEDIUM, HIGH, dan URGENT? | Follow-up interview | OPEN QUESTION |
| EL-Q-18 | OPEN-06 | Bagaimana Administrator menggunakan informasi `reporter_type` Lecturer sebagai saran prioritas HIGH tanpa menjadikannya keputusan otomatis? | Follow-up interview | OPEN QUESTION |
| EL-Q-19 | OPEN-07 | Informasi beban tugas Teknisi apa yang perlu dilihat Administrator sebelum menugaskan laporan? | Workshop | OPEN QUESTION |
| EL-Q-20 | OPEN-08 | Jika Teknisi tidak dapat menangani tugas, apakah prosesnya berupa penolakan tugas, permintaan reassignment, atau catatan kepada Administrator? | Workshop | OPEN QUESTION |
| EL-Q-21 | OPEN-11 | Apakah kebutuhan menunggu konfirmasi Pelapor cukup dicatat sebagai flag, timestamp, atau catatan tanpa menambah status utama baru? | Follow-up interview | OPEN QUESTION |
| EL-Q-22 | OPEN-08 | Data minimum Teknisi apa yang perlu tersedia agar Administrator dapat menugaskan laporan dengan tepat? | Follow-up interview | OPEN QUESTION |

### Teknisi

| Question ID | Related Open ID | Question | Technique | Status |
|---|---|---|---|---|
| EL-Q-23 | OPEN-07 | Beban tugas Teknisi sebaiknya dihitung dari jumlah tugas aktif, prioritas tugas, status tugas, atau kombinasi lain? | Follow-up interview | OPEN QUESTION |
| EL-Q-24 | OPEN-07 | Status tugas apa saja yang sebaiknya dihitung sebagai beban aktif Teknisi? | Follow-up interview | OPEN QUESTION |
| EL-Q-25 | OPEN-07 | Apakah tugas dengan prioritas berbeda perlu memiliki bobot berbeda dalam perhitungan beban tugas? | Follow-up interview | OPEN QUESTION |
| EL-Q-26 | OPEN-08 | Setelah menerima assignment dari Administrator, aksi apa yang perlu dilakukan Teknisi sebelum mulai memperbarui progres? | Follow-up interview | OPEN QUESTION |
| EL-Q-27 | OPEN-08 | Apakah Teknisi perlu dapat menolak tugas, meminta reassignment, atau hanya memberi catatan bahwa tugas tidak dapat dikerjakan? | Workshop | OPEN QUESTION |
| EL-Q-28 | OPEN-08 | Jika tugas tidak dapat dikerjakan oleh Teknisi yang ditugaskan, informasi apa yang perlu dikirim kembali ke Administrator? | Workshop | OPEN QUESTION |
| EL-Q-29 | OPEN-11 | Apakah Teknisi perlu melihat penanda bahwa laporan sedang menunggu konfirmasi Pelapor setelah ditandai `RESOLVED`? | Follow-up interview | OPEN QUESTION |
| EL-Q-30 | OPEN-11 | Informasi apa yang perlu dicatat Teknisi ketika menandai pekerjaan selesai agar Pelapor dan Administrator dapat meninjau hasil? | Follow-up interview | OPEN QUESTION |
| EL-Q-31 | OPEN-08 | Data profil apa yang perlu dicatat untuk Teknisi, seperti nama, spesialisasi, dan status ketersediaan? | Follow-up interview | OPEN QUESTION |
| EL-Q-32 | OPEN-08 | Bagaimana Teknisi menyatakan status ketersediaan saat sedang dapat menerima tugas atau sedang tidak tersedia? | Follow-up interview | OPEN QUESTION |

### Manajer Fasilitas

| Question ID | Related Open ID | Question | Technique | Status |
|---|---|---|---|---|
| EL-Q-33 | OPEN-07 | Definisi beban tugas Teknisi seperti apa yang paling membantu Manajer Fasilitas memantau distribusi pekerjaan? | Follow-up interview | OPEN QUESTION |
| EL-Q-34 | OPEN-07 | Apakah Manajer Fasilitas perlu melihat beban tugas berdasarkan jumlah laporan, status laporan, prioritas, kategori, atau periode waktu? | Follow-up interview | OPEN QUESTION |
| EL-Q-35 | OPEN-10 | Apakah Manajer Fasilitas hanya membutuhkan dashboard dan laporan ringkas, atau perlu membuka detail setiap laporan? | Follow-up interview | OPEN QUESTION |
| EL-Q-36 | OPEN-10 | Jika Manajer Fasilitas dapat membuka detail laporan, bagian informasi apa yang boleh dilihat? | Follow-up interview | OPEN QUESTION |
| EL-Q-37 | OPEN-10 | Apakah Manajer Fasilitas boleh melihat Catatan Internal, atau Catatan Internal tetap dibatasi untuk Admin dan Teknisi? | Follow-up interview | OPEN QUESTION |
| EL-Q-38 | OPEN-10 | Apakah Manajer Fasilitas perlu mengambil tindakan di sistem, atau hanya memantau kondisi laporan? | Follow-up interview | OPEN QUESTION |
| EL-Q-39 | OPEN-10 | Metrik dashboard apa saja yang wajib ditampilkan selain ringkasan laporan dan beban tugas Teknisi? | Follow-up interview | OPEN QUESTION |
| EL-Q-40 | OPEN-10 | Apakah Manajer Fasilitas perlu melihat ringkasan berdasarkan status, kategori, prioritas, lokasi, atau periode waktu? | Follow-up interview | OPEN QUESTION |

## Cross-Stakeholder Follow-up Questions

| Question ID | Target Stakeholders | Related Open ID | Question | Technique | Status |
|---|---|---|---|---|---|
| EL-Q-41 | Pelapor, Administrator/Admin | OPEN-04 | Bagaimana alur komunikasi yang diharapkan ketika Pelapor tidak puas dengan hasil dan laporan perlu ditinjau ulang? | Follow-up interview | OPEN QUESTION |
| EL-Q-42 | Administrator/Admin, Teknisi | OPEN-08 | Bagaimana assignment berubah jika Teknisi tidak tersedia atau tidak sesuai dengan jenis masalah? | Workshop | OPEN QUESTION |
| EL-Q-43 | Administrator/Admin, Teknisi, Manajer Fasilitas | OPEN-07 | Rumus beban tugas apa yang adil untuk assignment harian dan tetap mudah dipahami di dashboard? | Workshop | OPEN QUESTION |
| EL-Q-44 | Pelapor, Administrator/Admin, Teknisi | OPEN-11 | Informasi apa yang perlu ditampilkan untuk membedakan tahap `RESOLVED`, menunggu konfirmasi Pelapor, dan `CLOSED` tanpa menambah status utama? | Workshop | OPEN QUESTION |
| EL-Q-45 | Administrator/Admin, Manajer Fasilitas | OPEN-10 | Apakah kebutuhan audit atau supervisi membuat Manajer Fasilitas perlu melihat detail laporan tertentu? | Follow-up interview | OPEN QUESTION |

## Constraints

| Item ID | CONSTRAINT | Source ID |
|---|---|---|
| EL-C-01 | Pertanyaan elicitation tidak boleh mengubah strict 6 statuses menjadi status baru tanpa change request resmi. | EL-SRC-03 / EL-SRC-04 |
| EL-C-02 | Output AI harus diperiksa, diperbaiki bila perlu, dan disetujui manusia sebelum dipakai sebagai dasar tahap berikutnya. | EL-SRC-02 / EL-SRC-04 |
| EL-C-03 | Tahap ini tidak boleh menghasilkan functional requirements, user stories, acceptance criteria, prioritas, design, issue, atau kode. | EL-SRC-04 |
| EL-C-04 | Fitur out of scope seperti upload foto, email notification, login Google, QR code ruangan, AI kategori, inventory spare part, dan vendor management tidak menjadi fokus elicitation tahap ini kecuali muncul sebagai batasan atau klarifikasi scope. | EL-SRC-01 / EL-SRC-04 |

## Assumptions Requiring Validation

| Item ID | ASSUMPTION | Source ID | Validation Question |
|---|---|---|---|
| EL-A-01 | Data identitas tambahan Pelapor mungkin diperlukan selain `reporter_name` dan `reporter_type`. | EL-SRC-04 | EL-Q-01 |
| EL-A-02 | Manual override oleh Administrator perlu alasan atau catatan audit. | EL-SRC-03 / EL-SRC-04 | EL-Q-12 |
| EL-A-03 | Permintaan reopen dari Pelapor mungkin perlu ditinjau Administrator sebelum status berubah. | EL-SRC-04 | EL-Q-05 |
| EL-A-04 | Beban tugas Teknisi mungkin tidak cukup dihitung hanya dari jumlah assignment. | EL-SRC-03 / EL-SRC-04 | EL-Q-23 |
| EL-A-05 | Kebutuhan menunggu konfirmasi Pelapor mungkin dapat diwakili oleh flag atau catatan tanpa menambah status utama. | EL-SRC-03 / EL-SRC-04 | EL-Q-21 |
| EL-A-06 | Manajer Fasilitas mungkin memerlukan akses detail laporan tertentu untuk fungsi monitoring. | EL-SRC-04 | EL-Q-35 |

## Elicitation Summary

- Confirmed basis: Skill 01 `docs/requirements/inception.md` sudah `Human Reviewed & Approved`, dengan open question utama OPEN-02, OPEN-03, OPEN-04, OPEN-05, OPEN-06, OPEN-07, OPEN-08, OPEN-10, dan OPEN-11.
- Elicitation output: 45 pertanyaan follow-up untuk Pelapor, Administrator/Admin, Teknisi, Manajer Fasilitas, dan sesi lintas stakeholder.
- Unresolved OPEN QUESTION items: semua item pada Open Question Register masih `OPEN QUESTION` sampai Human Review atau jawaban stakeholder tersedia.
- Human Review: disetujui oleh Prayer Yosua Immanuel Kaawoan.
- Handoff notes for Skill 3: Gunakan pertanyaan dan gap ini sebagai dasar specification setelah jawaban stakeholder atau keputusan reviewer tersedia.
