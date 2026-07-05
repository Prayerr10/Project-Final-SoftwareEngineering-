---
name: 08-ui-design
description: Membuat desain UI flow, halaman, navigasi, form, wireframe deskriptif, component-driven UI, role-based UI, accessibility-first checklist, dan UI state coverage untuk Campus Service Request and Maintenance System pada fase design. Gunakan skill ini setelah Architecture Design dan Database/API Design disetujui. Output utama adalah docs/design/ui-flow.md.
---

# UI Design

## Tujuan
Menyusun desain UI flow untuk Campus Service Request and Maintenance System berdasarkan requirement final, batas arsitektur Skill 06, dan data/API contract Skill 07.

Skill ini menghasilkan desain halaman, navigasi, form, wireframe deskriptif, komponen reusable, role-based UI untuk 4 aktor, coverage state UI, dan checklist accessibility-first. Skill ini hanya untuk fase design dan tidak membuat kode React, CSS, component library, test, database, API, atau deployment.

## Kapan Digunakan
Gunakan skill ini setelah:

- Skill 01 sampai Skill 05 selesai dan requirement baseline sudah direview manusia.
- Skill 06 Architecture Design sudah disetujui.
- Skill 07 Database dan API Design sudah disetujui.

Gunakan skill ini ketika perlu membuat atau memperbarui:

- `docs/design/ui-flow.md`
- desain halaman dan navigasi aplikasi
- wireframe deskriptif untuk layar utama
- rancangan form dan validasi feedback
- component-driven UI plan
- role-based UI untuk Pelapor, Administrator, Teknisi, dan Manajer Fasilitas
- UI state untuk loading, empty, success, error, forbidden, not found, dan conflict
- accessibility checklist untuk semantic HTML, keyboard navigation, visible focus, accessible form errors, dan kontras WCAG AA

Jangan gunakan skill ini untuk:

- menulis kode React di `src/`
- menulis CSS atau design token implementasi
- memasang atau memilih dependency component library sebagai keputusan final
- membuat endpoint API atau migration database
- membuat test plan atau automated test
- melakukan deployment

## Input
Baca file berikut sebelum membuat output:

- `instruksi-dosen.md`
- `CASE.md`
- `CONTEXT.md`
- `skills/06-architecture-design/SKILL.md`
- `skills/07-database-api-design/SKILL.md`
- `docs/requirements/requirements.md`
- `docs/requirements/user-stories.md`
- `docs/requirements/prioritization.md`
- `docs/requirements/validation.md`
- `docs/requirements/change-request.md`
- `docs/requirements/traceability.md`

Jika file berikut sudah ada, baca untuk menjaga konsistensi design:

- `docs/design/architecture.md`
- `docs/design/database-api.md`
- `docs/design/ui-flow.md`

Gunakan referensi UI/UX berikut sebagai prinsip, bukan sebagai dependency implementasi wajib:

- `https://github.com/nextlevelbuilder/ui-ux-pro-max-skill`
- `https://www.figma.com/community`

Ambil prinsip yang relevan:

- accessibility-first
- mobile-first dan responsive layout
- component-driven design
- design token thinking untuk warna, typography, spacing, radius, shadow, dan state
- visible labels, error message dekat field, success/error feedback, dan empty state yang jelas
- navigation yang predictable dan tidak membingungkan
- loading skeleton/progress untuk data yang belum siap
- touch target dan keyboard interaction yang aman
- Figma Community boleh dijadikan acuan open design untuk wireframe, component library, dan design token, tetapi jangan menjadikannya dependency implementasi.

## Langkah Kerja
1. Verifikasi bahwa Skill 06 dan Skill 07 sudah disetujui. Jangan mengubah keputusan arsitektur, data model, atau API contract yang sudah ditetapkan.
2. Baca requirement, user story, business rule, dan open question. Jangan membuat requirement baru dan jangan menyelesaikan open question dengan karangan.
3. Ringkas scope UI dari requirement final:
   - Pelapor membuat laporan, melihat status, menambahkan komentar, dan mengonfirmasi hasil.
   - Administrator review laporan, menentukan kategori/prioritas, menugaskan Teknisi, menutup laporan, dan membuka kembali laporan.
   - Teknisi melihat tugas, menerima tugas jika didukung requirement, memperbarui progres, menandai resolved, menambahkan komentar/catatan.
   - Manajer Fasilitas melihat dashboard dan ringkasan operasional.
4. Tentukan struktur navigasi aplikasi. Minimal bahas:
   - role switcher atau simulasi role
   - halaman laporan atau master-detail request workspace
   - halaman/detail laporan
   - form laporan baru
   - panel aksi berdasarkan role
   - area komentar publik
   - area catatan internal untuk role yang berwenang
   - dashboard Manajer Fasilitas
   - fallback not found/forbidden/error
5. Tentukan halaman atau view utama. Minimal bahas:
   - Request Workspace atau daftar laporan
   - Create Request
   - Request Detail
   - Administrator Review/Classify/Assign view
   - Technician Tasks view
   - Dashboard Summary
6. Buat wireframe deskriptif untuk setiap view. Wireframe harus berupa teks terstruktur, bukan gambar wajib dan bukan kode. Untuk setiap view, tulis:
   - tujuan layar
   - aktor yang menggunakan
   - komponen utama
   - data yang ditampilkan dari Skill 07
   - aksi utama dan aksi sekunder
   - state loading, empty, success, error, forbidden, dan not found yang relevan
   - accessibility notes
7. Terapkan component-driven UI approach. Rancang komponen reusable minimal:
   - `RoleSwitcher`
   - `RequestForm`
   - `RequestList`
   - `RequestSearchFilter`
   - `RequestDetailPanel`
   - `StatusBadge`
   - `PriorityBadge`
   - `ActionPanel`
   - `CommentArea`
   - `InternalNoteArea`
   - `StatusHistoryTimeline`
   - `DashboardCards`
   - `FeedbackMessage`
   - `EmptyState`
   - `LoadingState`
   - `ErrorState`
8. Untuk setiap komponen reusable, tulis:
   - tujuan
   - input data
   - state yang harus didukung
   - role visibility jika ada
   - accessibility requirement
   - requirement/API contract terkait
9. Rancang role-based UI tanpa menggantikan validasi API:
   - UI hanya menyembunyikan atau menonaktifkan aksi yang tidak relevan.
   - API tetap menjadi sumber validasi role dan workflow sesuai Skill 07.
   - Forbidden state harus tetap dirancang untuk respons `403`.
10. Petakan aksi UI ke endpoint Skill 07. Minimal hubungkan:
   - create request ke `POST /api/requests`
   - list/search/filter ke `GET /api/requests`
   - detail ke `GET /api/requests/:id`
   - review ke `PATCH /api/requests/:id/review`
   - classification ke `PATCH /api/requests/:id/classification`
   - assignment ke `PATCH /api/requests/:id/assignment`
   - technician tasks ke `GET /api/technicians/:id/tasks`
   - accept/progress/resolve ke endpoint Teknisi
   - comments dan internal notes ke endpoint terkait
   - confirmation, close, reopen ke endpoint terkait
   - dashboard ke `GET /api/dashboard/summary`
11. Rancang form dan feedback:
   - setiap field memiliki label terlihat, helper text bila perlu, dan pesan error dekat field
   - validation error dari API dapat ditampilkan sebagai field error atau form-level error
   - success state menjelaskan aksi berhasil tanpa membuat workflow baru
   - destructive atau irreversible action seperti close/reopen/manual override perlu confirmation design
12. Rancang UI state coverage sesuai Skill 07:
   - loading: skeleton/progress/disabled submit
   - empty: daftar kosong, hasil pencarian kosong, dashboard tanpa data
   - success: create/update/comment/confirm/close/reopen berhasil
   - validation error: field error dan error summary
   - forbidden: role tidak berwenang
   - not found: laporan atau teknisi tidak ditemukan
   - conflict/invalid transition: status workflow tidak valid
   - server error: retry atau instruksi pemulihan
13. Rancang accessibility-first checklist:
   - semantic landmark seperti header, nav, main, section, form, table/list
   - heading hierarchy berurutan
   - keyboard navigation untuk role switcher, filter, list, form, action panel, dialog/confirmation
   - visible focus state
   - form error dapat diumumkan screen reader
   - warna tidak menjadi satu-satunya pembeda status atau prioritas
   - kontras warna minimal WCAG AA
   - touch target minimum 44px
   - text tidak terlalu kecil dan tidak terpotong
14. Rancang design token level deskriptif, bukan implementasi:
   - semantic color roles seperti surface, text, primary, danger, success, warning, info
   - spacing scale
   - typography roles
   - radius dan elevation
   - state token untuk focus, hover, disabled, error, success
   - referensi open design seperti Figma Community, OpenUI, Radix UI, atau shadcn/ui boleh dicatat sebagai inspirasi, bukan keputusan dependency
15. Catat open question dan dampaknya pada UI:
   - `OPEN-02` data Pelapor tambahan
   - `OPEN-03` manual override close
   - `OPEN-04` hak reopen
   - `OPEN-05` daftar kategori final
   - `OPEN-06` kriteria prioritas
   - `OPEN-07` rumus workload dashboard
   - `OPEN-08` accept/reject tugas Teknisi
   - `OPEN-10` akses Manajer Fasilitas terhadap detail/catatan internal
   - `OPEN-11` sub-state non-status
16. Tulis `docs/design/ui-flow.md` dengan struktur minimum:
   - Judul dan review status
   - Source summary
   - Scope dan non-scope
   - UI design principles
   - Navigation model
   - Role-based UI matrix
   - Page/view inventory
   - Descriptive wireframes
   - Component inventory
   - Form and validation feedback design
   - UI state coverage
   - Accessibility checklist
   - Design token guidance
   - API-to-UI mapping
   - Traceability links
   - Risks, assumptions, and open questions
   - Quality check
   - Human review checklist
17. Periksa hasil terhadap Quality Check pada skill ini.
18. Berhenti jika informasi tidak cukup, ada konflik antar dokumen, atau diperlukan keputusan manusia.

## Output
Buat atau perbarui file:

- `docs/design/ui-flow.md`

Output `docs/design/ui-flow.md` harus konkret, dapat direview, dan siap menjadi input untuk:

- Skill 09 Issue Planning
- fase implementation React
- fase acceptance testing dan accessibility review

Jangan membuat output lain kecuali diminta eksplisit oleh manusia.

## Aturan
- Jangan membuat requirement baru.
- Jangan mengubah requirement yang sudah final di Skill 01 sampai Skill 05.
- Jangan mengubah keputusan arsitektur Skill 06.
- Jangan mengubah keputusan database/API Skill 07.
- Jangan menambahkan status workflow baru.
- Jangan menambahkan fitur out of scope seperti upload foto, email notification, login Google, QR code ruangan, AI kategori, inventory spare part, atau vendor management.
- Jangan menulis kode React, CSS, HTML, TypeScript, Worker, SQL, atau test.
- Jangan memasang component library atau dependency.
- Jangan membuat desain visual final yang mengunci warna, font, atau library tanpa human review.
- Gunakan istilah domain dari `CONTEXT.md`.
- Gunakan ID requirement, user story, acceptance criteria, dan business rule saat menjelaskan layar, komponen, dan aksi.
- Tandai asumsi dengan label `ASSUMPTION`.
- Tandai ketidakjelasan dengan label `OPEN QUESTION` atau `Needs Human Review`.
- Pastikan role-based UI tidak menggantikan role-based API validation.
- Pastikan setiap state dari kontrak API Skill 07 punya representasi UI.
- Pastikan accessibility-first menjadi constraint utama, bukan tambahan akhir.
- Pastikan Figma Community dan open design resources disebut sebagai referensi/inspirasi, bukan dependency implementasi wajib.

## Quality Check
Sebelum menyelesaikan output, periksa:

- `docs/design/ui-flow.md` memiliki review status dan source summary.
- Semua input wajib sudah dibaca atau alasan tidak dapat membacanya dicatat.
- Dokumen mencakup halaman, navigasi, form, dan wireframe deskriptif.
- UI dirancang untuk 4 aktor: Pelapor, Administrator, Teknisi, Manajer Fasilitas.
- Role-based UI matrix tersedia dan tidak menggantikan validasi API.
- Komponen reusable minimal tercakup: role switcher, request form, request list, detail panel, status badge, action panel, comment area, dashboard cards.
- Component-driven UI approach jelas.
- Data dan error contract dari Skill 07 dipakai sebagai dasar UI state.
- UI state mencakup loading, empty, success, error, forbidden, not found, dan conflict/invalid transition.
- Form design mencakup visible label, helper text, field error, form-level error, success feedback, dan disabled/loading submit.
- Accessibility checklist mencakup semantic HTML, keyboard navigation, visible focus, accessible form errors, dan WCAG AA contrast.
- Status dan priority tidak hanya dibedakan dengan warna.
- Figma Community dan open design resources diposisikan sebagai acuan, bukan dependency.
- Open question tidak dijawab dengan karangan baru.
- Tidak ada kode React, CSS, HTML, API, SQL, test, atau deployment.
- Human review checklist jelas dan dapat dicek manusia.

## Kondisi Gagal
Berhenti dan minta klarifikasi manusia jika:

- Skill 06 atau Skill 07 belum disetujui atau bertentangan dengan requirement final.
- Requirement final tidak tersedia atau saling bertentangan.
- Ada permintaan untuk mengubah requirement final saat membuat desain UI.
- Ada kebutuhan membuat keputusan produk baru yang tidak tertulis di requirement.
- Ada konflik antara `instruksi-dosen.md`, `CASE.md`, Skill 06, Skill 07, dan dokumen requirements yang tidak bisa diselesaikan dengan source priority.
- Open question memblokir desain UI inti dan tidak ada cara aman untuk menandainya sebagai asumsi.
- Ada permintaan menulis kode React, CSS, component library implementation, SQL, API, test, atau deployment.
- Data atau error contract dari Skill 07 tidak cukup untuk mendesain state UI utama.

## Human Review
Manusia harus memeriksa `docs/design/ui-flow.md` sebelum desain UI dianggap final.

Checklist review manusia:

- Apakah desain UI mengikuti `instruksi-dosen.md`, `CASE.md`, requirements final, Skill 06, dan Skill 07?
- Apakah tidak ada requirement, fitur, status, aktor, atau scope baru yang ditambahkan?
- Apakah semua halaman dan flow utama untuk Pelapor, Administrator, Teknisi, dan Manajer Fasilitas sudah tercakup?
- Apakah navigasi dan role switcher mudah dipahami?
- Apakah wireframe deskriptif cukup jelas untuk implementasi berikutnya?
- Apakah komponen reusable sudah tepat dan tidak terlalu banyak atau terlalu sedikit?
- Apakah setiap aksi UI terhubung ke endpoint/API contract yang benar?
- Apakah loading, empty, success, validation error, forbidden, not found, conflict, dan server error sudah dirancang?
- Apakah desain form mendukung error yang jelas dan dapat dipulihkan pengguna?
- Apakah status workflow strict tetap 6 status dan tidak diubah?
- Apakah role-based UI tetap mengakui bahwa validasi final dilakukan API?
- Apakah accessibility checklist sudah cukup untuk semantic HTML, keyboard navigation, focus state, form error, dan WCAG AA contrast?
- Apakah warna tidak menjadi satu-satunya pembeda status, prioritas, atau chart/dashboard?
- Apakah open question sudah ditandai dan dampaknya pada UI sudah jelas?
- Apakah dokumen tetap berada pada fase design dan belum masuk ke kode React, CSS, component library, test, API, database, atau deployment?

Jika ada item checklist yang belum lolos, revisi `docs/design/ui-flow.md` sebelum lanjut ke planning atau implementation.
