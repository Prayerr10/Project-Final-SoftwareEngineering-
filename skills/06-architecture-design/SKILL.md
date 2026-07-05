---
name: 06-architecture-design
description: Membuat desain arsitektur untuk Campus Service Request and Maintenance System pada fase design. Gunakan skill ini saat perlu menentukan bagian utama aplikasi, batas frontend React, backend Cloudflare Workers, database Cloudflare D1, deployment layer Cloudflare, aliran data, keputusan arsitektur, dan checklist review sebelum lanjut ke desain database/API atau UI. Output utama adalah docs/design/architecture.md.
---

# Architecture Design

## Tujuan
Menyusun desain arsitektur aplikasi Campus Service Request and Maintenance System berdasarkan requirement final yang sudah direview manusia.

Skill ini menentukan bagian utama aplikasi, batas tanggung jawab setiap layer, aliran request/response, aliran status laporan, keputusan arsitektur, risiko teknis, dan checklist human review. Skill ini hanya untuk fase design dan tidak membuat kode, migration database, endpoint API, wireframe UI, test, deployment, atau requirement baru.

## Kapan Digunakan
Gunakan skill ini setelah Skill 01 sampai Skill 05 selesai dan requirement baseline sudah tersedia.

Gunakan skill ini ketika perlu membuat atau memperbarui:

- `docs/design/architecture.md`
- desain pembagian frontend, backend/API, database, dan deployment layer
- keputusan arsitektur untuk stack React, Cloudflare Workers, Cloudflare D1, dan Cloudflare deployment
- traceability design level untuk requirement seperti `FR-01`, `NFR-01`, atau `BR-01`

Jangan gunakan skill ini untuk:

- membuat skema tabel detail atau SQL migration
- membuat kontrak endpoint API detail
- membuat halaman, navigasi, flow UI, atau wireframe
- mengimplementasikan source code di `src/`, `worker/`, atau `database/`
- membuat test plan atau automated test

## Input
Baca file berikut sebelum membuat output:

- `instruksi-dosen.md`
- `CASE.md`
- `CONTEXT.md`
- `docs/requirements/inception.md`
- `docs/requirements/elicitation.md`
- `docs/requirements/requirements.md`
- `docs/requirements/user-stories.md`
- `docs/requirements/prioritization.md`
- `docs/requirements/validation.md`
- `docs/requirements/change-request.md`
- `docs/requirements/traceability.md`
- `wrangler.jsonc`
- `package.json`

Jika file berikut sudah ada, baca untuk mempertahankan keputusan yang masih valid:

- `docs/design/architecture.md`

## Langkah Kerja
1. Verifikasi bahwa requirement baseline berasal dari dokumen Skill 01 sampai Skill 05 dan sudah memiliki status human review atau validasi yang jelas.
2. Ringkas scope arsitektur dari input tanpa mengubah requirement: 4 aktor, fitur wajib, 6 status workflow, batasan React, Cloudflare Workers, Cloudflare D1, Cloudflare free tier, GitHub workflow, traceability, dan human review.
3. Identifikasi bagian utama aplikasi:
   - Frontend layer: React app di `src/`, role-based UI, state tampilan, form, list/detail, dashboard, loading/error state.
   - Backend/API layer: Cloudflare Workers di `worker/`, routing API, validasi role/action, validasi request, error response, integrasi D1.
   - Database layer: Cloudflare D1 dan migration di `database/migrations/`, hanya sebagai batas tanggung jawab dan data ownership, bukan detail skema final.
   - Deployment layer: Cloudflare Worker/Vite/Wrangler, environment local dan production, binding D1, build/deploy pipeline.
4. Tentukan batas tanggung jawab antar layer. Pastikan frontend tidak menjadi satu-satunya tempat validasi role atau workflow; keputusan penting workflow harus divalidasi di backend/API.
5. Buat aliran data utama untuk fitur wajib:
   - Pelapor membuat laporan baru.
   - Semua aktor melihat daftar, mencari, menyaring, dan melihat detail laporan.
   - Administrator melakukan review, kategori, prioritas, assignment, close, dan reopen.
   - Teknisi melihat tugas, menerima tugas jika requirement mengizinkan, memperbarui progres, dan menandai resolved.
   - Pelapor mengonfirmasi resolved work.
   - Manajer Fasilitas melihat dashboard operasional dan ringkasan.
6. Petakan aliran status utama dengan 6 status strict:
   - `SUBMITTED`
   - `UNDER_REVIEW`
   - `ASSIGNED`
   - `IN_PROGRESS`
   - `RESOLVED`
   - `CLOSED`
7. Catat open question dari requirement sebagai risiko atau constraint desain, bukan sebagai keputusan baru. Jika keputusan desain bergantung pada open question, tandai sebagai `Needs Human Review`.
8. Terapkan prinsip arsitektur yang relevan:
   - Component-driven frontend: UI harus dirancang sebagai komponen reusable untuk role switcher, request form, request list, detail panel, status badge, action panel, comment/note area, dan dashboard cards.
   - Accessibility-first: arsitektur frontend harus memberi tempat untuk semantic HTML, keyboard navigation, visible focus state, accessible form errors, dan kontras yang dapat diverifikasi pada Skill 08.
   - Open design compatible: keputusan UI architecture boleh merekomendasikan penggunaan prinsip dari OpenUI, Radix UI, shadcn/ui, atau Figma Community sebagai referensi desain terbuka, tetapi tidak boleh menambahkan dependency implementasi tanpa keputusan terpisah.
   - Contract-aware boundaries: desain arsitektur harus memisahkan command/query API, validasi input, response shape, dan error handling agar Skill 07 dapat menyusun API contract tanpa menebak ulang arsitektur.
   - Traceability-first: setiap keputusan arsitektur penting harus menyebut requirement atau business rule yang mendasarinya.
9. Tulis `docs/design/architecture.md` dengan struktur minimum:
   - Judul dan review status.
   - Source summary.
   - Architecture goals.
   - Context and constraints.
   - Layer overview.
   - Component responsibility table.
   - Main data flow.
   - Status workflow architecture.
   - Role and authorization boundary.
   - Deployment architecture.
   - Architecture decisions.
   - Traceability links.
   - Risks, assumptions, and open questions.
   - Quality check.
   - Human review checklist.
10. Periksa hasil terhadap Quality Check pada skill ini.
11. Berhenti jika informasi tidak cukup, ada konflik antar dokumen, atau diperlukan keputusan manusia.

## Output
Buat atau perbarui file:

- `docs/design/architecture.md`

Output `docs/design/architecture.md` harus konkret, dapat direview, dan siap menjadi input untuk:

- Skill 07 Database dan API Design
- Skill 08 UI Design
- Skill 09 Issue Planning

Jangan membuat output lain kecuali diminta eksplisit oleh manusia.

## Aturan
- Jangan membuat requirement baru.
- Jangan mengubah requirement yang sudah final di Skill 01 sampai Skill 05.
- Jangan menghapus atau mengganti 6 status workflow utama.
- Jangan menambahkan fitur out of scope seperti upload foto, email notification, login Google, QR code ruangan, AI kategori, inventory spare part, atau vendor management.
- Jangan membuat detail tabel database final; simpan detail itu untuk Skill 07.
- Jangan membuat daftar endpoint API final; simpan detail itu untuk Skill 07.
- Jangan membuat wireframe, visual layout, halaman final, atau design token final; simpan detail itu untuk Skill 08.
- Gunakan istilah domain dari `CONTEXT.md`, seperti Pelapor, Administrator, Teknisi, Manajer Fasilitas, Riwayat Status, Komentar Publik, Catatan Internal, dan Simulasi Role.
- Gunakan ID requirement, user story, dan business rule dari dokumen requirements ketika menjelaskan keputusan.
- Tandai asumsi dengan label `ASSUMPTION`.
- Tandai ketidakjelasan dengan label `OPEN QUESTION` atau `Needs Human Review`.
- Pastikan keputusan arsitektur realistis untuk React, Cloudflare Workers, Cloudflare D1, dan Cloudflare free tier.
- Pastikan arsitektur mendukung accessibility-first dan component-driven design tanpa memaksa implementasi UI tertentu.
- Pastikan output tetap berupa dokumen design, bukan kode.

## Quality Check
Sebelum menyelesaikan output, periksa:

- `docs/design/architecture.md` memiliki review status dan source summary.
- Semua input wajib sudah dibaca atau alasan tidak dapat membacanya dicatat.
- Arsitektur memuat frontend, backend/API, database, dan deployment layer.
- Frontend layer menyebut React dan batas folder `src/`.
- Backend/API layer menyebut Cloudflare Workers dan batas folder `worker/`.
- Database layer menyebut Cloudflare D1 dan batas folder `database/migrations/`.
- Deployment layer menyebut Wrangler/Cloudflare dan `wrangler.jsonc`.
- 4 aktor tercakup: Pelapor, Administrator, Teknisi, Manajer Fasilitas.
- 6 status workflow tercakup tanpa tambahan status baru.
- Fitur wajib dari requirement final tercakup pada level arsitektur.
- Role-based UI tidak menggantikan role-based API validation.
- Riwayat status, komentar publik, catatan internal, dashboard, search, filter, dan detail view memiliki tempat dalam arsitektur.
- Keputusan arsitektur menyebut ID requirement atau business rule yang relevan.
- Open question dari requirement tidak dijawab dengan karangan baru.
- Prinsip component-driven, accessibility-first, dan open design compatible muncul sebagai constraint atau checklist.
- Tidak ada instruksi implementasi kode, test, migration detail, atau deployment production.
- Human review checklist jelas dan dapat dicek manusia.

## Kondisi Gagal
Berhenti dan minta klarifikasi manusia jika:

- Dokumen requirement final belum tersedia atau saling bertentangan.
- Status human review untuk requirement baseline tidak jelas.
- Ada permintaan untuk mengubah requirement final saat membuat arsitektur.
- Ada kebutuhan membuat keputusan produk baru yang tidak tertulis di requirement.
- Ada konflik antara `instruksi-dosen.md`, `CASE.md`, dan dokumen requirements yang tidak bisa diselesaikan dengan source priority.
- Ada permintaan membuat detail database/API/UI yang seharusnya dikerjakan Skill 07 atau Skill 08.
- Binding Cloudflare D1 atau konfigurasi deployment tidak dapat dipahami dari file yang tersedia dan keputusan arsitektur bergantung pada detail tersebut.

## Human Review
Manusia harus memeriksa `docs/design/architecture.md` sebelum desain dianggap final.

Checklist review manusia:

- Apakah arsitektur benar-benar mengikuti `instruksi-dosen.md`, `CASE.md`, dan requirements final?
- Apakah tidak ada requirement, fitur, status, aktor, atau scope baru yang ditambahkan?
- Apakah pembagian frontend, backend/API, database, dan deployment layer masuk akal untuk React, Cloudflare Workers, dan D1?
- Apakah semua fitur wajib punya tempat yang jelas di arsitektur?
- Apakah status workflow strict tetap 6 status dan tidak diubah?
- Apakah role-based UI dan role-based API validation sudah dipisahkan dengan jelas?
- Apakah keputusan arsitektur cukup konkret untuk menjadi input Skill 07 dan Skill 08?
- Apakah asumsi dan open question sudah ditandai, bukan diputuskan sepihak oleh AI?
- Apakah prinsip accessibility-first, component-driven design, dan open design compatible sudah cukup terlihat tanpa memaksa dependency implementasi?
- Apakah risiko Cloudflare free tier, D1 binding, secret safety, dan deployment sudah dicatat?
- Apakah traceability ke `FR-*`, `NFR-*`, `BR-*`, dan `US-*` sudah jelas?

Jika ada item checklist yang belum lolos, revisi `docs/design/architecture.md` sebelum lanjut ke Skill 07 atau Skill 08.
