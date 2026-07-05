---
name: 07-database-api-design
description: Membuat desain database Cloudflare D1 dan kontrak API Cloudflare Workers untuk Campus Service Request and Maintenance System pada fase design. Gunakan skill ini setelah Architecture Design disetujui untuk merancang tabel SQLite, relasi, constraint, indeks, endpoint API, input/output setiap endpoint, error contract, role validation, status workflow validation, dan traceability. Output utama adalah docs/design/database-api.md.
---

# Database dan API Design

## Tujuan
Menyusun desain database dan kontrak API untuk Campus Service Request and Maintenance System berdasarkan requirement final dan arsitektur Skill 06 yang sudah disetujui.

Skill ini menghasilkan rancangan tabel Cloudflare D1 berbasis SQLite, relasi antar tabel, aturan validasi data, kontrak endpoint Cloudflare Workers, bentuk request/response, bentuk error, otorisasi role, dan traceability ke requirement. Skill ini hanya untuk fase design dan tidak membuat kode Worker, migration production, UI, test, atau deployment.

## Kapan Digunakan
Gunakan skill ini setelah:

- Skill 01 sampai Skill 05 selesai dan requirement baseline sudah direview manusia.
- Skill 06 Architecture Design sudah disetujui.

Gunakan skill ini ketika perlu membuat atau memperbarui:

- `docs/design/database-api.md`
- rancangan tabel Cloudflare D1 untuk data laporan, teknisi, assignment, komentar, catatan internal, riwayat status, konfirmasi pelapor, dan data dashboard
- relasi antar tabel dan ownership data
- kontrak endpoint API untuk Cloudflare Workers
- input, output, validasi, role yang boleh mengakses, dan error setiap endpoint
- peta traceability database/API ke `FR-*`, `US-*`, `BR-*`, dan `NFR-*`

Jangan gunakan skill ini untuk:

- membuat migration SQL final di `database/migrations/`
- menulis kode di `worker/`
- menulis kode frontend di `src/`
- membuat UI flow, wireframe, komponen visual, atau design token
- membuat test plan atau automated test
- melakukan deployment atau konfigurasi production

## Input
Baca file berikut sebelum membuat output:

- `instruksi-dosen.md`
- `CASE.md`
- `CONTEXT.md`
- `skills/06-architecture-design/SKILL.md`
- `docs/requirements/requirements.md`
- `docs/requirements/user-stories.md`
- `docs/requirements/prioritization.md`
- `docs/requirements/validation.md`
- `docs/requirements/change-request.md`
- `docs/requirements/traceability.md`
- `wrangler.jsonc`
- `package.json`
- `database/migrations/0001_initial.sql`
- `worker/index.ts`

Jika file berikut sudah ada, baca untuk mempertahankan keputusan design yang masih valid:

- `docs/design/architecture.md`
- `docs/design/database-api.md`

Gunakan referensi desain yang relevan dari `https://github.com/nextlevelbuilder/ui-ux-pro-max-skill` hanya sebagai prinsip pendukung, terutama:

- contract yang mendukung loading, empty, success, dan error state yang jelas
- error message yang dapat dipulihkan oleh pengguna
- data list dan dashboard yang efisien untuk UI React
- aksesibilitas melalui response yang menyediakan label/status eksplisit dan tidak bergantung pada warna saja

## Langkah Kerja
1. Verifikasi bahwa Skill 06 sudah disetujui dan output Skill 07 tidak bertentangan dengan batas arsitektur frontend, backend/API, database, dan deployment layer.
2. Baca requirement, user story, business rule, dan open question. Jangan menjawab open question dengan keputusan baru; tandai dampaknya di desain.
3. Gunakan pendekatan API contract-first:
   - Tentukan resource API dari kebutuhan pengguna dan data domain.
   - Tentukan endpoint, method, role yang boleh mengakses, request body/query, response success, response error, dan status code sebelum memikirkan implementasi SQL atau kode Worker.
   - Pastikan setiap endpoint punya relasi ke requirement atau business rule.
   - Pastikan response mendukung UI state: loading, empty result, validation error, forbidden, not found, dan success.
4. Tentukan resource utama yang harus dicakup:
   - service request
   - reporter identity
   - technician
   - assignment
   - status history
   - public comment
   - internal note
   - reporter confirmation
   - dashboard summary
5. Rancang tabel database Cloudflare D1 SQLite pada level design. Minimal bahas tabel berikut jika sesuai requirement:
   - `service_requests`
   - `technicians`
   - `request_assignments`
   - `request_status_history`
   - `request_comments`
   - `request_internal_notes`
   - `reporter_confirmations`
6. Untuk setiap tabel, tulis:
   - tujuan tabel
   - kolom
   - tipe SQLite
   - primary key
   - foreign key
   - nilai default
   - nullable atau required
   - constraint atau controlled vocabulary
   - indeks yang dibutuhkan
   - requirement yang didukung
7. Pastikan desain database mendukung aturan wajib:
   - laporan baru mulai dari `SUBMITTED`
   - status utama hanya `SUBMITTED`, `UNDER_REVIEW`, `ASSIGNED`, `IN_PROGRESS`, `RESOLVED`, dan `CLOSED`
   - prioritas hanya `LOW`, `MEDIUM`, `HIGH`, atau `URGENT`
   - kategori berasal dari fixed list, tetapi jika daftar final belum tersedia tandai sebagai `OPEN QUESTION: OPEN-05`
   - riwayat status menyimpan `from_status`, `to_status`, `changed_by_role`, `timestamp`, dan `note`
   - komentar publik dapat dilihat Pelapor, Administrator, dan Teknisi
   - catatan internal hanya untuk Administrator dan Teknisi
   - Pelapor confirmation diperlukan sebelum close kecuali manual override
   - reopen mengarah ke `UNDER_REVIEW`
8. Rancang relasi antar tabel dalam bentuk tabel relasi atau diagram teks. Jelaskan cardinality seperti one-to-many atau many-to-one.
9. Rancang kontrak endpoint API Cloudflare Workers. Minimal bahas endpoint yang mencakup:
   - `GET /api/health`
   - `GET /api/requests`
   - `POST /api/requests`
   - `GET /api/requests/:id`
   - `PATCH /api/requests/:id/review`
   - `PATCH /api/requests/:id/classification`
   - `PATCH /api/requests/:id/assignment`
   - `GET /api/technicians`
   - `GET /api/technicians/:id/tasks`
   - `PATCH /api/requests/:id/accept`
   - `PATCH /api/requests/:id/progress`
   - `PATCH /api/requests/:id/resolve`
   - `POST /api/requests/:id/comments`
   - `POST /api/requests/:id/internal-notes`
   - `PATCH /api/requests/:id/confirm-resolution`
   - `PATCH /api/requests/:id/close`
   - `PATCH /api/requests/:id/reopen`
   - `GET /api/dashboard/summary`
10. Untuk setiap endpoint, tulis kontrak konkret:
   - method dan path
   - tujuan
   - role yang boleh mengakses
   - query parameter bila ada
   - request body bila ada
   - response success
   - response error
   - status code
   - validasi role dan status workflow
   - requirement dan business rule yang didukung
11. Definisikan bentuk response standar:
   - success single object
   - success list dengan `data` dan `meta`
   - validation error
   - forbidden
   - not found
   - conflict atau invalid transition
   - server error
12. Definisikan aturan naming dan format data:
   - gunakan `snake_case` untuk field database
   - gunakan satu gaya field API secara konsisten; jika memilih `camelCase` atau `snake_case`, tulis alasannya
   - gunakan timestamp ISO string
   - gunakan enum uppercase untuk status, priority, role, dan reporter_type
13. Catat desain validasi role dan workflow:
   - frontend role-based UI hanya menyembunyikan aksi
   - API tetap memvalidasi role, status awal, status tujuan, dan required note
   - setiap status transition yang mengubah status harus membuat status history
14. Catat open question dan dampaknya:
   - `OPEN-02` untuk data identitas Pelapor tambahan
   - `OPEN-03` untuk kondisi manual override
   - `OPEN-04` untuk hak reopen
   - `OPEN-05` untuk daftar kategori final
   - `OPEN-06` untuk kriteria prioritas
   - `OPEN-07` untuk rumus workload dashboard
   - `OPEN-08` untuk accept atau reject tugas Teknisi
   - `OPEN-10` untuk akses Manajer Fasilitas terhadap detail/catatan internal
   - `OPEN-11` untuk sub-state non-status
15. Tulis `docs/design/database-api.md` dengan struktur minimum:
   - Judul dan review status
   - Source summary
   - Scope dan non-scope
   - API contract-first principles
   - Database design overview
   - Table specifications
   - Relationship model
   - Controlled vocabularies
   - API response conventions
   - Endpoint contract table
   - Endpoint detail sections
   - Role and workflow validation rules
   - Dashboard data contract
   - Traceability links
   - Risks, assumptions, and open questions
   - Quality check
   - Human review checklist
16. Periksa hasil terhadap Quality Check pada skill ini.
17. Berhenti jika informasi tidak cukup, ada konflik antar dokumen, atau diperlukan keputusan manusia.

## Output
Buat atau perbarui file:

- `docs/design/database-api.md`

Output `docs/design/database-api.md` harus konkret, dapat direview, dan siap menjadi input untuk:

- pembuatan migration database pada fase implementation
- pembuatan endpoint Worker pada fase implementation
- Skill 08 UI Design agar UI tahu data, state, dan error yang harus ditampilkan
- Skill 09 Issue Planning

Jangan membuat output lain kecuali diminta eksplisit oleh manusia.

## Aturan
- Jangan membuat requirement baru.
- Jangan mengubah requirement yang sudah final di Skill 01 sampai Skill 05.
- Jangan mengubah keputusan arsitektur Skill 06 yang sudah disetujui.
- Jangan menambahkan status workflow baru.
- Jangan menambahkan fitur out of scope seperti upload foto, email notification, login Google, QR code ruangan, AI kategori, inventory spare part, atau vendor management.
- Jangan membuat migration SQL final di `database/migrations/`.
- Jangan menulis kode TypeScript, Worker handler, React component, atau test.
- Jangan melakukan deployment atau mengubah `wrangler.jsonc`.
- Gunakan Cloudflare D1 sebagai SQLite database.
- Gunakan Cloudflare Workers sebagai API boundary.
- Gunakan ID requirement, user story, business rule, dan acceptance criteria saat menjelaskan tabel dan endpoint.
- Tandai asumsi dengan label `ASSUMPTION`.
- Tandai ketidakjelasan dengan label `OPEN QUESTION` atau `Needs Human Review`.
- Jangan menyelesaikan open question dengan karangan baru.
- Pastikan desain API mendukung UI state yang baik: empty, validation error, forbidden, not found, conflict, loading, dan success.
- Pastikan response error punya pesan jelas dan field error bila validasi field gagal.
- Pastikan setiap endpoint yang mengubah status menyebut aturan status history.
- Pastikan setiap endpoint protected menyebut role yang boleh mengakses dan alasan requirement-nya.

## Quality Check
Sebelum menyelesaikan output, periksa:

- `docs/design/database-api.md` memiliki review status dan source summary.
- Semua input wajib sudah dibaca atau alasan tidak dapat membacanya dicatat.
- Dokumen menyebut Cloudflare D1, SQLite, Cloudflare Workers, dan binding `DB`.
- Tabel utama untuk laporan, teknisi, assignment, status history, komentar publik, catatan internal, dan konfirmasi pelapor sudah dibahas.
- Setiap tabel memiliki tujuan, kolom, tipe, primary key, foreign key, required/nullable, constraint, indeks, dan traceability.
- Relasi antar tabel dijelaskan dengan cardinality.
- Controlled vocabulary untuk status, role, priority, reporter_type, comment visibility, dan kategori dibahas.
- Kategori final tidak dikarang jika masih `OPEN-05`.
- Semua 6 status workflow tercakup dan tidak ada status utama tambahan.
- API contract-first approach dijelaskan.
- Setiap endpoint memiliki method, path, role, input, output, status code, error, validasi, dan traceability.
- Endpoint mencakup create, list, search, filter, detail, review, classification, assignment, task list, accept, progress, resolve, comment, internal note, confirm, close, reopen, dashboard, dan health.
- Role-based API validation tidak digantikan oleh role-based UI.
- Status transition invalid menghasilkan error contract yang jelas.
- Setiap status-changing endpoint menyimpan status history.
- Manual override close tidak diputuskan detailnya jika `OPEN-03` atau `OPEN-11` masih belum final.
- Dashboard summary menyebut dampak `OPEN-07`.
- Tidak ada kode implementasi, migration production, UI, test, atau deployment.
- Human review checklist jelas dan dapat dicek manusia.

## Kondisi Gagal
Berhenti dan minta klarifikasi manusia jika:

- Skill 06 belum disetujui atau bertentangan dengan requirement final.
- Requirement final tidak tersedia atau saling bertentangan.
- Ada permintaan untuk mengubah requirement final saat membuat desain database/API.
- Ada kebutuhan membuat keputusan produk baru yang tidak tertulis di requirement.
- Ada konflik antara `instruksi-dosen.md`, `CASE.md`, Skill 06, dan dokumen requirements yang tidak bisa diselesaikan dengan source priority.
- Open question memblokir desain tabel atau endpoint inti dan tidak ada cara aman untuk menandainya sebagai asumsi.
- Ada permintaan menulis migration SQL final, kode Worker, kode React, test, atau deployment.
- Binding D1 atau konfigurasi Worker tidak bisa dipahami dari file yang tersedia dan desain bergantung pada detail tersebut.

## Human Review
Manusia harus memeriksa `docs/design/database-api.md` sebelum desain database/API dianggap final.

Checklist review manusia:

- Apakah desain database/API mengikuti `instruksi-dosen.md`, `CASE.md`, requirements final, dan Skill 06?
- Apakah tidak ada requirement, fitur, status, aktor, atau scope baru yang ditambahkan?
- Apakah tabel dan relasi cukup untuk mendukung semua fitur wajib?
- Apakah desain tabel realistis untuk Cloudflare D1 SQLite?
- Apakah kontrak endpoint realistis untuk Cloudflare Workers?
- Apakah setiap endpoint memiliki input, output, error, role, status code, dan traceability yang jelas?
- Apakah role-based API validation sudah cukup jelas dan tidak hanya bergantung pada UI?
- Apakah semua status transition mengikuti 6 status strict?
- Apakah setiap perubahan status menghasilkan status history?
- Apakah komentar publik dan catatan internal punya batas visibilitas yang benar?
- Apakah manual override, reopen, kategori, prioritas, workload dashboard, dan akses Manajer Fasilitas yang masih terbuka sudah ditandai sebagai open question?
- Apakah response error cukup jelas untuk UI accessible dan form feedback pada Skill 08?
- Apakah traceability ke `FR-*`, `US-*`, `AC-*`, `BR-*`, dan `NFR-*` sudah cukup?
- Apakah dokumen tetap berada pada fase design dan belum masuk ke implementasi kode, migration production, UI, test, atau deployment?

Jika ada item checklist yang belum lolos, revisi `docs/design/database-api.md` sebelum lanjut ke Skill 08 atau implementation.
