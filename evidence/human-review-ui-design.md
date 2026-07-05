# Human Review

## Work Product

Nama file, issue, atau pull request:

- `docs/design/ui-flow.md`
- `docs/requirements/traceability.md`
- Pull Request Skill 08 ke `development`

## Skill AI

Nama skill:

Skill 08 - UI Design (`08-ui-design`)

## Masalah yang Ditemukan

1. Traceability awal di `docs/design/ui-flow.md` sudah menautkan UI-01 sampai UI-10 ke requirement, tetapi beberapa bagian masih memakai rentang agregat seperti `FR-01 sampai FR-24`, `BR-02 sampai BR-08`, dan `US-01 sampai US-17`. Ini membuat reviewer sulit mencocokkan satu per satu apakah setiap FR, NFR, BR, dan US benar-benar punya representasi UI berupa halaman, komponen, state, atau aksi.
2. NFR-02 sampai NFR-09 belum terlihat eksplisit pada coverage internal `docs/design/ui-flow.md`. NFR tersebut memang tidak semuanya berupa layar UI, tetapi tetap perlu dicatat agar desain UI menunjukkan batas React, ketergantungan pada Cloudflare Worker API, larangan akses langsung ke D1, kompatibilitas free tier, GitHub workflow, kesiapan future test/CI, traceability, human review evidence, dan secret safety.
3. Business rule BR-01 sampai BR-12 belum memiliki tabel cocok-cocokan eksplisit di `docs/design/ui-flow.md`. Beberapa rule sudah muncul di wireframe dan API-to-UI mapping, tetapi reviewer masih harus mencari manual apakah strict 6 status, review-before-assignment, controlled category/priority, status history, comment/note visibility, confirmation-before-close, dan reopen target status sudah tercermin.
4. User story US-01 sampai US-17 belum memiliki coverage matrix eksplisit di `docs/design/ui-flow.md`. Walaupun wireframe per view sudah menyebut user story terkait, reviewer masih perlu menelusuri banyak section untuk memastikan seluruh acceptance criteria memiliki representasi UI.
5. Page/View Inventory dan API-to-UI mapping sempat menyebut `ForbiddenState`, `NotFoundState`, dan `ServerErrorState`, sedangkan component inventory wajib hanya mendefinisikan `ErrorState`. Ini berpotensi terlihat seperti komponen baru yang tidak tercatat atau komponen wajib yang terpecah tidak konsisten.
6. UI State Coverage untuk loading awal hanya menyebut in-flight API-02 sampai API-17, sehingga `GET /api/health` sebagai API-01 belum terlihat sebagai bagian dari app readiness/loading/error handling walaupun sudah ada di API-to-UI mapping.

## Perbaikan

1. Menambahkan section `Full Requirements Coverage Matrix` di `docs/design/ui-flow.md` agar FR-01 sampai FR-24 dicocokkan satu per satu dengan representasi UI, komponen, endpoint/API, dan catatan open question yang relevan.
2. Menambahkan subsection `Non-Functional Requirement Coverage` di `docs/design/ui-flow.md` agar NFR-01 sampai NFR-09 punya representasi eksplisit pada desain UI atau batas proses yang relevan, termasuk React-ready design, API-to-UI mapping, tidak mengakses D1 langsung, no paid/out-of-scope UI, GitHub workflow, future automated test readiness, traceability, human review evidence, dan secret safety.
3. Menambahkan subsection `Business Rule Coverage` di `docs/design/ui-flow.md` agar BR-01 sampai BR-12 terlihat jelas hubungannya dengan StatusBadge, StatusHistoryTimeline, RequestForm, ActionPanel, CommentArea, InternalNoteArea, DashboardCards, dan endpoint terkait.
4. Menambahkan subsection `User Story Coverage` di `docs/design/ui-flow.md` agar US-01 sampai US-17 dapat dicocokkan langsung dengan view UI seperti Create Request, Request Workspace, Request Detail, Administrator action surface, Technician Tasks, Dashboard Summary, dan RoleSwitcher.
5. Merapikan Page/View Inventory UI-08 dan API-to-UI mapping agar memakai varian `ErrorState` untuk forbidden, not found, conflict, validation, dan server error, sehingga tetap konsisten dengan komponen wajib `ErrorState` dan tidak menciptakan komponen baru di luar inventory.
6. Memperluas UI State Coverage loading dari API-02 sampai API-17 menjadi API-01 sampai API-17 agar app readiness/health check juga tercakup dalam loading/error handling UI.

## Hasil Pemeriksaan

- [x] Sesuai requirement
- [x] Tidak menambah fitur di luar scope
- [ ] Test lulus
- [x] Tidak ada secret
- [x] Traceability diperbarui

Catatan: Test otomatis tidak dijalankan karena perubahan Skill 08 hanya pada dokumen UI design, traceability, evidence, dan Pull Request body. Pemeriksaan yang sudah dilakukan mencakup pencocokan FR-01 sampai FR-24, NFR-01 sampai NFR-09, BR-01 sampai BR-12, dan US-01 sampai US-17 terhadap `docs/design/ui-flow.md`; pemeriksaan konsistensi role-based UI untuk Pelapor, Administrator, Teknisi, dan Manajer Fasilitas terhadap batas arsitektur Skill 06; pemeriksaan bahwa UI tidak menggantikan Role-Based API Validation; pemeriksaan API-to-UI mapping untuk API-01 sampai API-17 dari Skill 07; pemeriksaan UI state loading, empty, success, validation error, forbidden, not found, conflict/invalid transition, dan server error; pemeriksaan OPEN-03, OPEN-05, OPEN-07, OPEN-10, dan OPEN-11 sebagai Needs Human Review; pemeriksaan seluruh komponen reusable wajib; pemeriksaan accessibility checklist; pemeriksaan format evidence enam section; dan pemeriksaan bahwa tidak ada kode React, CSS, HTML, TypeScript, API, database, test, deployment, atau dependency implementasi yang dibuat.

## Keputusan

- [x] Disetujui
- [ ] Perlu revisi
- [ ] Ditolak
- [ ] Terblokir
