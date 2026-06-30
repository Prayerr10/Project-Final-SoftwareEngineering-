# Ringkasan Sesi Pertama

Dokumen ini merangkum seluruh percakapan dan pekerjaan dari sesi pertama project final Software Engineering. File ini dibuat sebagai acuan utama untuk sesi/chat baru agar agent berikutnya tidak perlu menebak ulang konteks, keputusan, status file, atau urutan kerja.

## 1. Konteks Tugas

### 1.1 Identitas Project

Project ini adalah tugas final mata kuliah **Software Engineering** dari dosen **Andrew Tanny Liem**. Bentuk tugas adalah proyek individu atau tim kecil. Media pengumpulan yang diminta adalah **GitHub + URL Cloudflare**.

Studi kasus yang ditetapkan dosen adalah:

**Campus Service Request and Maintenance System**

Aplikasi digunakan oleh mahasiswa atau dosen untuk melaporkan masalah fasilitas kampus, misalnya:

- Proyektor rusak.
- Internet bermasalah.
- AC tidak dingin.
- Kursi rusak.
- Alat laboratorium bermasalah.
- Ruangan kotor.

Alur umumnya:

1. Pelapor membuat laporan.
2. Administrator memeriksa laporan.
3. Administrator menentukan kategori, prioritas, dan menugaskan teknisi.
4. Teknisi memperbarui progres sampai pekerjaan selesai.
5. Pelapor dapat melihat perkembangan dan memberikan konfirmasi.
6. Administrator menutup laporan.

### 1.2 Tujuan Akhir Project

Project ini tidak hanya menilai aplikasi akhir. Dosen menilai proses software engineering dari awal sampai deployment. Tujuan akhir project adalah membuat aplikasi web yang:

- Berjalan secara lokal.
- Menyimpan data laporan ke database.
- Memiliki frontend, backend/API, dan database.
- Memiliki dokumentasi requirements dan design.
- Memiliki GitHub Issues, branch, commit, dan Pull Request.
- Memiliki automated tests.
- Memiliki traceability dari requirement sampai test.
- Menggunakan AI, tetapi tetap ada human review.
- Dideploy ke Cloudflare dengan URL publik.
- Tidak memakai layanan berbayar.

### 1.3 Poin Penting dari `instruksi-dosen.md`

File `instruksi-dosen.md` adalah patokan utama project. File ini berada di root repo lokal tetapi **sengaja belum di-commit** karena user ingin menyimpannya sebagai referensi kerja dulu.

Bagian penting dari instruksi dosen:

- Mahasiswa harus mengikuti urutan kerja, tidak langsung meminta AI membuat seluruh aplikasi.
- AI wajib digunakan, tetapi tidak boleh mengambil keputusan akhir.
- Output AI harus disimpan, diperiksa, dikoreksi, dan ada hasil final.
- Project wajib menggunakan:
  - React untuk frontend.
  - Cloudflare Workers untuk backend/API.
  - Cloudflare D1 untuk database.
  - Cloudflare untuk deployment.
  - GitHub untuk repository dan planning.
- Fitur wajib:
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
- Fitur tidak wajib:
  - Upload foto.
  - Email notification.
  - Login Google.
  - QR code ruangan.
  - AI untuk menentukan kategori.
  - Inventory spare part.
  - Vendor management.
- Status workflow dari dosen:
  - `Submitted`
  - `Under Review`
  - `Assigned`
  - `In Progress`
  - `Resolved`
  - `Closed`
- Minimum work product:
  - 12 functional requirements.
  - 6 non-functional requirements.
  - 5 business rules.
  - 10 user stories.
  - Minimal 2 acceptance criteria untuk setiap user story.
  - 10 GitHub Issues.
  - 6 Pull Request.
  - 20 automated tests.
  - 1 change request.
  - 1 URL publik deployment.
- Struktur repository wajib berisi:
  - `README.md`
  - `CASE.md`
  - `skills/`
  - `docs/requirements/`
  - `docs/design/`
  - `docs/testing/`
  - `docs/deployment/`
  - `src/`
  - `worker/`
  - `database/`
  - `tests/`
  - `evidence/`
  - `.github/`
  - `wrangler.jsonc`

### 1.4 Catatan Tentang Skills

Awalnya sempat diasumsikan bahwa 15 `SKILL.md` harus dibuat sendiri dari template dosen. User kemudian mengoreksi bahwa dosen mengarahkan penggunaan skills dari:

- Matt Pocock Skills repository: `https://github.com/mattpocock/skills`
- Repo lama user: `https://github.com/Prayerr10/se-ai-requirements-105022410099-PrayerKaawoan/tree/main/skills`
- ChromeDevToolsMCP untuk testing browser/UI.

Koreksi penting:

- Jangan mengarang 15 skills sendiri dari nol.
- Gunakan skill yang sudah ada dari Matt Pocock dan repo user.
- Untuk project ini, user mengingat hanya perlu membuat 3 skill tambahan:
  - `06 Architecture Design`
  - `07 Database dan API Design`
  - `08 UI Design`
- 3 skill tambahan itu ingin dibuat **setelah tahap 01-05 selesai/valid**.
- Untuk testing browser/UI gunakan ChromeDevToolsMCP skill.

Skill yang sudah diinstall secara lokal ke Codex:

- `01-inception`
- `02-elicitation`
- `03-specification`
- `04-prioritization`
- `05-validation-change`
- `chrome-devtools`

Skill Matt Pocock yang sudah tersedia dari awal:

- `grill-me`
- `grill-with-docs`
- `to-prd`
- `to-issues`
- `tdd`

Setelah install skill, user diberi tahu bahwa Codex perlu di-restart agar skill baru terbaca aktif di sesi baru.

## 2. Progress Sejauh Ini

### 2.1 Kronologi Pekerjaan

1. User memberikan file instruksi dosen dalam bentuk Markdown dan meminta analisis strategi eksekusi project.
2. Isi dokumen dibaca dan dianalisis.
3. Dibuat strategi awal berisi:
   - Executive summary.
   - Requirements breakdown.
   - Roadmap.
   - Acceptance checklist.
   - Risk assessment.
   - Langkah pertama.
4. User memulai tahap persiapan sesuai instruksi dosen.
5. User menjalankan pengecekan versi:
   - `node --version` menghasilkan `v24.15.0`.
   - `npm --version` menghasilkan `11.12.1`.
   - `git --version` menghasilkan `git version 2.54.0.windows.1`.
6. User menjalankan:
   - `npm create cloudflare@latest -- campus-maintenance --framework=react`
7. Dalam prompt Cloudflare, user memilih:
   - React.
   - Workers with Assets.
   - TypeScript.
   - Install dependencies.
   - Git version control.
   - Tidak deploy dulu.
8. Project berhasil dibuat di:
   - `C:\Users\Asus\campus-maintenance`
9. User menjalankan:
   - `cd campus-maintenance`
   - `npm run dev`
10. Aplikasi lokal berhasil berjalan di:
    - `http://localhost:5173`
11. Browser menampilkan halaman default Cloudflare/Vite. Ini dinyatakan sesuai tahap awal.
12. User memberikan URL repository GitHub:
    - `https://github.com/Prayerr10/Project-Final-SoftwareEngineering-.git`
13. Remote GitHub ditambahkan ke repo lokal.
14. Struktur folder wajib dibuat:
    - `skills/`
    - `docs/requirements/`
    - `docs/design/`
    - `docs/testing/`
    - `docs/deployment/`
    - `database/migrations/`
    - `tests/unit/`
    - `tests/integration/`
    - `tests/acceptance/`
    - `evidence/`
    - `.github/`
15. `.gitkeep` ditambahkan ke folder kosong agar ikut masuk Git.
16. Commit dibuat:
    - `9139a8c chore: add project preparation folders`
17. Push ke `main` berhasil.
18. User meminta workflow profesional agar tidak langsung kerja di `main`.
19. Branch `development` dibuat dari `main`.
20. Branch `development` dipush ke GitHub.
21. Wrangler login dijalankan:
    - `npx wrangler login`
22. Login Cloudflare berhasil. `wrangler whoami` kemudian menunjukkan akun:
    - `pkaawoan24@gmail.com`
23. User membuat D1 database:
    - `campus-maintenance-db`
24. Cloudflare menghasilkan database ID:
    - `9e20f90b-c1c1-48b3-945b-3f4c051366b8`
25. `wrangler.jsonc` diedit manual agar memakai binding `DB`, bukan binding default `campus_maintenance_db`.
26. Commit dibuat:
    - `94204fc chore: configure Cloudflare D1 binding`
27. File migration dibuat:
    - `database/migrations/0001_initial.sql`
28. `src/App.tsx` diganti dari template Cloudflare menjadi halaman `Campus Service Request`.
29. `worker/index.ts` diganti dari API contoh menjadi API:
    - `GET /api/health`
    - `GET /api/requests`
    - `POST /api/requests`
30. `src/App.css` diganti dari styling default menjadi styling form/tabel aplikasi.
31. `npm run build` dijalankan dan berhasil.
32. Local D1 migration dijalankan:
    - `npx wrangler d1 execute campus-maintenance-db --local --file=database/migrations/0001_initial.sql`
33. Migration lokal berhasil dan tabel `service_requests` terbentuk.
34. Commit dibuat:
    - `b89434d feat: add basic service request app`
35. `CASE.md` dibuat berdasarkan `instruksi-dosen.md`.
36. Commit dibuat:
    - `9e762cf docs: add project case overview`
37. Audit persiapan nomor 1-21 dilakukan.
38. User menjalankan aplikasi lokal dan menguji form laporan.
39. Screenshot menunjukkan aplikasi berhasil:
    - Form tampil.
    - Laporan tersimpan.
    - Tabel menampilkan laporan dengan status `SUBMITTED`.
40. API diverifikasi:
    - `GET /api/health` mengembalikan `{"status":"ok"}`.
    - `GET /api/requests` mengembalikan laporan user:
      - `request_number`: `CSR-1782820276619`
      - `title`: `Proyektor`
      - `location`: `gk1, 201`
      - `category`: `Peralatan Kelas`
      - `priority`: `MEDIUM`
      - `status`: `SUBMITTED`
41. Step 15 tutorial dikerjakan:
    - `vitest` diinstall.
    - Script `test` ditambahkan.
    - Unit test pertama dibuat.
42. Step 16 tutorial dikerjakan:
    - GitHub Actions CI dibuat.
43. Saat `npm test -- --run` pertama kali dijalankan, muncul error konflik Vitest dengan Cloudflare Vite plugin.
44. Solusi dibuat:
    - Tambah `vitest.config.ts`.
    - Ubah script `test` menjadi `vitest --config vitest.config.ts`.
45. Test berhasil:
    - 1 test file passed.
    - 2 tests passed.
46. Build tetap berhasil.
47. Commit dibuat:
    - `c602e0e test: add initial validation test and CI`
48. Bagian III template sederhana dari `instruksi-dosen.md` dibaca.
49. Template project dibuat:
    - GitHub issue template.
    - Pull request template.
    - Human review template.
    - Reflection doc.
    - Submission info doc.
50. Draft awal requirements dibuat:
    - `inception.md`
    - `elicitation.md`
    - `requirements.md`
    - `user-stories.md`
    - `prioritization.md`
    - `validation-change.md` (draft lama; sudah diarsipkan ke `evidence/archive/obsolete-validation-change-draft.md`)
    - `traceability.md`
51. User mengoreksi bahwa requirements tersebut bukan final dan skills harus mengikuti arahan Matt Pocock/repo user.
52. Skill installer digunakan untuk install skill dari GitHub.
53. Skill repo user diperiksa:
    - Branch `development` repo `se-ai-requirements-105022410099-PrayerKaawoan` berisi:
      - `skills/01-inception/SKILL.md`
      - `skills/02-elicitation/SKILL.md`
      - `skills/03-specification/SKILL.md`
      - `skills/04-prioritization/SKILL.md`
      - `skills/05-validation-change/SKILL.md`
54. Skill ChromeDevToolsMCP diinstall dari:
    - `ChromeDevTools/chrome-devtools-mcp`
    - path `skills/chrome-devtools`
55. User bertanya apakah semua skill sudah terinstall dan apakah skill user bisa dipakai.
56. Dijelaskan bahwa skill 01-05 user bisa dipakai untuk tahap requirements dan hanya 3 skill tambahan yang perlu dibuat nanti:
    - `06 Architecture Design`
    - `07 Database dan API Design`
    - `08 UI Design`
57. User meminta dibuat file ringkasan sesi pertama ini.

### 2.2 File yang Sudah Dibuat atau Diubah

#### Root Repo

- `README.md`
  - File bawaan template Cloudflare, belum dirapikan untuk project final.
  - Nanti harus berisi cara menjalankan project, repository URL, Cloudflare URL, jumlah test, known limitations, dan informasi final.

- `CASE.md`
  - Sudah dibuat.
  - Berisi konteks studi kasus berdasarkan `instruksi-dosen.md`.
  - Mencakup ringkasan studi kasus, aktor, scope, out of scope, alur status, data utama, aturan bisnis awal, batasan teknis, struktur repo, work product, AI usage, daftar skill, asumsi, risiko, indikator keberhasilan, dan traceability note.
  - Status: draft cukup lengkap, sudah di-commit.

- `instruksi-dosen.md`
  - Berisi instruksi utama dari dosen.
  - Status: masih untracked, sengaja tidak di-commit.
  - User ingin file ini tetap ada dulu sebagai patokan dan baru dihapus saat final jika perlu.

- `package.json`
  - Sudah berubah dari template awal.
  - Script penting saat ini:
    - `dev`: `vite`
    - `build`: `tsc -b && vite build`
    - `lint`: `eslint .`
    - `test`: `vitest --config vitest.config.ts`
    - `preview`: `npm run build && vite preview`
    - `deploy`: `npm run build && wrangler deploy`
    - `cf-typegen`: `wrangler types`
  - Dependency utama:
    - `react`
    - `react-dom`
  - Dev dependency penting:
    - `@cloudflare/vite-plugin`
    - `@vitejs/plugin-react`
    - `vite`
    - `typescript`
    - `wrangler`
    - `vitest`

- `package-lock.json`
  - Berubah karena install `vitest`.

- `vite.config.ts`
  - Masih memakai plugin React dan Cloudflare:
    - `react()`
    - `cloudflare()`
  - Jangan dipakai langsung untuk Vitest karena menyebabkan konflik.

- `vitest.config.ts`
  - Dibuat untuk memisahkan config test dari Cloudflare Vite plugin.
  - Isi penting:
    - `include: ["tests/**/*.test.ts"]`

- `wrangler.jsonc`
  - Sudah dikonfigurasi untuk Cloudflare Worker + Assets dan D1.
  - Name:
    - `campus-maintenance`
  - Main:
    - `worker/index.ts`
  - Compatibility date:
    - `2026-06-30`
  - D1 binding:
    - `binding`: `DB`
    - `database_name`: `campus-maintenance-db`
    - `database_id`: `9e20f90b-c1c1-48b3-945b-3f4c051366b8`
  - Alasan binding harus `DB`: kode Worker menggunakan `env.DB`.

#### Source Code

- `src/App.tsx`
  - Sudah diganti dari halaman default Cloudflare menjadi halaman awal aplikasi.
  - Type penting:
    - `ServiceRequest`
      - `id`
      - `request_number`
      - `title`
      - `location`
      - `category`
      - `priority`
      - `status`
  - State penting:
    - `requests`
    - `title`
    - `description`
    - `location`
    - `category`
    - `message`
  - Fungsi penting:
    - `loadRequests()`
      - Fetch `GET /api/requests`.
      - Mengisi `requests`.
    - `submitRequest(event)`
      - Submit form ke `POST /api/requests`.
      - Mengirim `title`, `description`, `location`, `category`.
      - Menampilkan pesan berhasil/gagal.
      - Reset form setelah berhasil.
      - Memanggil ulang `loadRequests()`.
  - UI:
    - Header `Campus Service Request`.
    - Form `Buat Laporan Baru`.
    - Tabel `Daftar Laporan`.
  - Status: aplikasi dasar berjalan.

- `src/App.css`
  - Styling aplikasi dasar.
  - Class penting:
    - `.app-shell`
    - `.page-header`
    - `.eyebrow`
    - `.content-grid`
    - `.request-form`
    - `.request-list`
    - `.form-message`
    - `.empty-state`
    - `.table-wrap`
  - Status: cukup untuk tahap awal, belum final UI design.

- `worker/index.ts`
  - Backend/API Cloudflare Worker.
  - Interface:
    - `Env { DB: D1Database }`
  - Helper:
    - `json(data: unknown, status = 200)`
  - Route:
    - `GET /api/health`
      - Return `{ status: "ok" }`
    - `GET /api/requests`
      - Query:
        - `SELECT id, request_number, title, location, category, priority, status FROM service_requests ORDER BY created_at DESC`
      - Return `{ data: result.results }`
    - `POST /api/requests`
      - Input JSON:
        - `title`
        - `description`
        - `location`
        - `category`
      - Validasi:
        - Semua field wajib ada.
        - `description.trim().length >= 20`
      - Generate:
        - `id = crypto.randomUUID()`
        - `requestNumber = CSR-${Date.now()}`
      - Insert default:
        - `priority = MEDIUM`
        - `status = SUBMITTED`
      - Return:
        - `id`
        - `requestNumber`
        - `status: "SUBMITTED"`
    - Fallback:
      - 404 `{ error: "Alamat API tidak ditemukan." }`
  - Status: API dasar berjalan.

#### Database

- `database/migrations/0001_initial.sql`
  - Membuat tabel `service_requests`.
  - Kolom:
    - `id TEXT PRIMARY KEY`
    - `request_number TEXT NOT NULL UNIQUE`
    - `title TEXT NOT NULL`
    - `description TEXT NOT NULL`
    - `location TEXT NOT NULL`
    - `category TEXT NOT NULL`
    - `priority TEXT NOT NULL DEFAULT 'MEDIUM'`
    - `status TEXT NOT NULL DEFAULT 'SUBMITTED'`
    - `created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP`
  - Sudah dijalankan untuk local D1.
  - Belum dijalankan untuk remote/production D1.

#### Tests

- `tests/unit/request-validation.test.ts`
  - Unit test pertama sesuai tutorial dosen.
  - Fungsi lokal:
    - `validDescription(text: string)`
      - Return `text.trim().length >= 20`
  - Test:
    - Menolak deskripsi terlalu pendek.
    - Menerima deskripsi minimal 20 karakter.
  - Status: lulus.

- `tests/integration/.gitkeep`
  - Placeholder folder integration test.

- `tests/acceptance/.gitkeep`
  - Placeholder folder acceptance test.

#### GitHub

- `.github/workflows/ci.yml`
  - GitHub Actions sederhana.
  - Trigger:
    - `pull_request`
    - `push` ke `main` dan `development`
  - Job:
    - Checkout source code.
    - Setup Node.js 22.
    - `npm ci`
    - `npm test -- --run`
    - `npm run build`
  - Status lokal: test/build lulus. Status di GitHub perlu dicek di tab Actions.

- `.github/ISSUE_TEMPLATE/feature.md`
  - Template GitHub Issue dari instruksi dosen.
  - Berisi:
    - Requirement.
    - User Story.
    - Acceptance Criteria.
    - Pekerjaan.
    - Selesai Jika.
  - Status: template, sudah di-commit.

- `.github/pull_request_template.md`
  - Template Pull Request dari instruksi dosen.
  - Berisi:
    - Issue.
    - Requirement.
    - Perubahan.
    - Test.
    - Penggunaan AI.
    - Reviewer.
  - Status: template, sudah di-commit.

#### Docs

- `docs/templates/human-review-template.md`
  - Template Human Review dari instruksi dosen.
  - Status: template, sudah di-commit.

- `docs/reflection.md`
  - Berisi pertanyaan refleksi dari instruksi dosen.
  - Jawaban belum diisi karena refleksi dilakukan di akhir project.
  - Status: template akhir/reflection placeholder.

- `docs/deployment/submission-info.md`
  - Format pengumpulan.
  - Sudah berisi repository URL:
    - `https://github.com/Prayerr10/Project-Final-SoftwareEngineering-`
  - Masih kosong:
    - Nama.
    - NIM.
    - Kelas.
    - Anggota tim.
    - Cloudflare URL.
    - Commit terakhir.
    - Jumlah test.
    - AI yang digunakan.
    - Known limitations.
  - Status: placeholder.

- `docs/requirements/inception.md`
  - Draft awal inception.
  - Berisi:
    - Tujuan.
    - Masalah utama.
    - Stakeholder.
    - Scope awal.
    - Out of scope.
    - Asumsi awal.
    - Pertanyaan terbuka.
  - Status: draft v1, bukan final.

- `docs/requirements/elicitation.md`
  - Draft awal elicitation.
  - Berisi pertanyaan untuk:
    - Pelapor.
    - Administrator.
    - Teknisi.
    - Manajer fasilitas.
  - Juga berisi hasil elicitation awal.
  - Status: draft v1, bukan final.

- `docs/requirements/requirements.md`
  - Draft awal specification.
  - Berisi:
    - Functional requirements `FR-01` sampai `FR-15`.
    - Non-functional requirements `NFR-01` sampai `NFR-08`.
    - Business rules `BR-01` sampai `BR-06`.
    - Status workflow.
  - Status: draft v1, bukan final.
  - Catatan: user mengoreksi bahwa tahap requirement harus dijalankan memakai skill yang benar, bukan sekadar hasil karangan bebas.

- `docs/requirements/user-stories.md`
  - Draft awal user stories.
  - Berisi `US-01` sampai `US-12`.
  - Setiap user story punya minimal 2 acceptance criteria.
  - Status: draft v1, bukan final.

- `docs/requirements/prioritization.md`
  - Draft awal prioritas.
  - Menggunakan Must/Should/Could/Won't.
  - Status: draft v1, bukan final.

- `evidence/archive/obsolete-validation-change-draft.md`
  - Arsip draft awal validation dan change; bukan artefak aktif Skill 05.
  - Berisi checklist validasi.
  - Berisi change request:
    - `CR-01 Simulasi Role untuk Versi Awal`
  - Status: draft v1, bukan final.

- Artefak aktif Skill 05 setelah Human Review:
  - `docs/requirements/validation.md`
  - `docs/requirements/change-request.md`
  - `evidence/human-review-validation.md`

- `docs/requirements/traceability.md`
  - Draft awal traceability matrix.
  - Beberapa kolom masih `TBD` karena design, issue, dan test lengkap belum dibuat.
  - Status: draft v1, bukan final.

#### Skills Folder dalam Repo Project

- `skills/.gitkeep`
  - Folder skills repo project masih kosong kecuali `.gitkeep`.
  - Belum ada `06`, `07`, `08` di repo project.
  - Skill 01-05 terinstall ke Codex user directory, bukan disalin ke repo project ini.

#### Evidence

- `evidence/.gitkeep`
  - Folder evidence masih kosong.
  - Belum ada dokumentasi prompt/invocation/output AI/human review final.

### 2.3 Keputusan Teknis Penting

1. **Menggunakan branch `development` untuk kerja harian**
   - Alasan: lebih profesional; `main` dianggap stabil/production.
   - Current branch: `development`.

2. **Binding D1 dibuat `DB`**
   - Alasan: kode tutorial dosen dan Worker menggunakan `env.DB`.
   - Wrangler sempat menawarkan binding `campus_maintenance_db`, tetapi kita pilih manual agar konsisten.

3. **Tidak deploy saat create project**
   - Alasan: sesuai instruksi dosen, deploy dilakukan nanti setelah aplikasi, test, dan docs siap.

4. **Step 17-20 ditunda**
   - Step 17: migration production.
   - Step 18: deploy Cloudflare.
   - Step 19: connect GitHub ke Cloudflare.
   - Step 20: checklist setelah deployment.
   - Alasan: ini tahap production/deployment, sebaiknya setelah requirements dan design minimal siap.

5. **`instruksi-dosen.md` tetap lokal dan belum di-commit**
   - Alasan: user ingin menjadikannya patokan dulu dan mungkin menghapusnya saat final.

6. **Vitest menggunakan `vitest.config.ts` terpisah**
   - Alasan: config utama `vite.config.ts` memakai Cloudflare Vite plugin dan menyebabkan startup error saat Vitest.

7. **Draft requirements yang sudah dibuat dianggap draft v1, bukan final**
   - Alasan: user mengoreksi bahwa proses requirements/design harus memakai skill yang benar.

8. **Skill tambahan 06-08 belum dibuat sekarang**
   - Alasan: user ingin membuatnya setelah tahap 01-05 selesai/valid.

## 3. Preferensi & Konvensi

### 3.1 Preferensi User

- User ingin pekerjaan mengikuti `instruksi-dosen.md` secara teliti dan tidak ada syarat terlewat.
- User ingin proses rapi, profesional, dan tidak langsung kerja di `main`.
- User ingin `development` sebagai branch kerja.
- User ingin setiap tahap dicek satu per satu terhadap instruksi dosen.
- User ingin `instruksi-dosen.md` tetap menjadi patokan.
- User tidak ingin deployment dilakukan terlalu cepat sebelum requirements/design minimal siap.
- User ingin skills yang digunakan mengikuti arahan dosen, terutama Matt Pocock skills dan skill dari repo lama user.
- User ingin agent berhenti dan memberi tahu urutan yang benar sebelum mengerjakan hal besar berikutnya jika ada koreksi arah.

### 3.2 Konvensi Teknis

- Project path:
  - `C:\Users\Asus\campus-maintenance`
- Remote GitHub:
  - `https://github.com/Prayerr10/Project-Final-SoftwareEngineering-.git`
- Branch kerja:
  - `development`
- Production/stable branch:
  - `main`
- Framework:
  - React + TypeScript.
- Backend:
  - Cloudflare Worker.
- Database:
  - Cloudflare D1.
- D1 binding:
  - `DB`
- D1 database name:
  - `campus-maintenance-db`
- D1 database ID:
  - `9e20f90b-c1c1-48b3-945b-3f4c051366b8`
- Testing:
  - Vitest untuk unit test.
  - ChromeDevToolsMCP untuk testing browser/UI nanti.
- Formatting file:
  - Markdown untuk docs.
  - TypeScript untuk frontend/backend.
  - SQL migration untuk database.

### 3.3 Hal yang Pernah Ditolak atau Direvisi

- Jangan menganggap 15 `SKILL.md` harus dibuat bebas dari template dosen.
- Jangan mengarang skill sendiri jika dosen mengarahkan penggunaan Matt Pocock skills/repo user.
- Jangan lanjut membuat design/requirements final tanpa memakai urutan skill yang benar.
- Jangan mengerjakan Step 17-20 terlalu cepat.
- Jangan commit `instruksi-dosen.md` dulu.
- Jangan langsung kerja di `main`.
- Jangan memakai binding D1 selain `DB` untuk kode saat ini.

## 4. Kendala & Solusi

### 4.1 Wrangler Menawarkan Binding Otomatis

Saat D1 dibuat, Wrangler menampilkan snippet dengan binding:

```json
"binding": "campus_maintenance_db"
```

Masalah:

- Kode tutorial dosen memakai `env.DB`.
- Jika binding dibiarkan `campus_maintenance_db`, kode `env.DB` akan gagal.

Solusi:

- Pilih `n` saat Wrangler bertanya apakah ingin menambahkan otomatis.
- Edit `wrangler.jsonc` manual.
- Gunakan binding:

```jsonc
"binding": "DB"
```

### 4.2 Vitest Konflik dengan Cloudflare Vite Plugin

Saat menjalankan:

```bash
npm test -- --run
```

Terjadi error startup:

```text
The following environment options are incompatible with the Cloudflare Vite plugin:
resolve.external [...]
```

Penyebab:

- Vitest mencoba memakai `vite.config.ts`.
- `vite.config.ts` memuat `@cloudflare/vite-plugin`.
- Plugin Cloudflare tidak cocok dengan environment unit test Vitest default.

Solusi:

- Buat `vitest.config.ts`.
- Ubah script test di `package.json` menjadi:

```json
"test": "vitest --config vitest.config.ts"
```

Isi `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
  },
});
```

Hasil:

- `npm test -- --run` berhasil.
- 1 test file passed.
- 2 tests passed.

### 4.3 API Tidak Bisa Dicek Saat Server Dev Tidak Aktif

Pada satu titik API dicek dengan:

```powershell
Invoke-RestMethod -Uri 'http://localhost:5173/api/health'
```

Hasil:

```text
Unable to connect to the remote server
```

Penyebab:

- `npm run dev` tidak sedang aktif.

Solusi:

- Jalankan lagi:

```bash
npm run dev
```

Setelah user menjalankan dev server dan mengisi form, API berhasil dicek.

### 4.4 Production D1 Masih `num_tables = 0`

Saat menjalankan:

```bash
npx wrangler d1 list
```

Database production `campus-maintenance-db` menunjukkan:

```text
num_tables 0
```

Ini bukan error saat ini.

Penyebab:

- Migration baru dijalankan lokal, belum remote.

Solusi nanti:

```bash
npx wrangler d1 execute campus-maintenance-db --remote --file=database/migrations/0001_initial.sql
```

Catatan:

- Ini ditunda sampai Step 17 karena remote migration mengubah database production.

### 4.5 Skill dari Repo User Tidak Ada di `main`

Saat mengecek repo:

```text
https://github.com/Prayerr10/se-ai-requirements-105022410099-PrayerKaawoan
```

Branch `main` hanya menunjukkan `skills/.gitkeep`.

Penyebab:

- Skill 01-05 berada di branch `development` dan branch feature, bukan di `main`.

Solusi:

- Install skill dari repo user dengan ref `development`.
- Skill yang ditemukan:
  - `skills/01-inception/SKILL.md`
  - `skills/02-elicitation/SKILL.md`
  - `skills/03-specification/SKILL.md`
  - `skills/04-prioritization/SKILL.md`
  - `skills/05-validation-change/SKILL.md`

### 4.6 Hal yang Sudah Dicoba tapi Tidak Perlu Diulang

- Jangan mencoba install Matt Pocock skills yang sudah tersedia:
  - `grill-me`
  - `grill-with-docs`
  - `to-prd`
  - `to-issues`
  - `tdd`
- Jangan pakai `vite.config.ts` langsung untuk Vitest.
- Jangan menjalankan migration remote sampai siap Step 17.
- Jangan deploy sampai requirements dan design minimal selesai.
- Jangan commit `instruksi-dosen.md` tanpa izin user.

## 5. Status Terkini

### 5.1 Git dan Branch

Current branch:

```text
development
```

Remote:

```text
origin https://github.com/Prayerr10/Project-Final-SoftwareEngineering-.git
```

Commit terbaru di `development` sebelum file ringkasan ini:

```text
18e71b8 docs: add requirement artifacts and project templates
```

Log penting:

```text
18e71b8 docs: add requirement artifacts and project templates
c602e0e test: add initial validation test and CI
9e762cf docs: add project case overview
b89434d feat: add basic service request app
94204fc chore: configure Cloudflare D1 binding
9139a8c chore: add project preparation folders
29db023 Initialize web application via create-cloudflare CLI
```

Working tree sebelum file ini dibuat:

```text
?? instruksi-dosen.md
```

Setelah file ini dibuat, akan ada:

```text
?? ringkasan-sesi-pertama.md
```

### 5.2 Verifikasi Terakhir

Sudah berhasil:

```bash
npm test -- --run
```

Hasil:

- 1 test file passed.
- 2 tests passed.

Sudah berhasil:

```bash
npm run build
```

Hasil:

- Worker build sukses.
- Client build sukses.

Sudah berhasil local D1 check:

```bash
npx wrangler d1 execute campus-maintenance-db --local --command="SELECT name FROM sqlite_master WHERE type='table';"
```

Hasil:

- `service_requests`
- `_cf_METADATA`

Sudah berhasil API check saat dev server aktif:

```text
GET /api/health -> {"status":"ok"}
GET /api/requests -> data laporan user
```

### 5.3 Yang Final vs Draft

#### Relatif Aman / Fondasi Final Sementara

- Struktur folder repo.
- Branch `development`.
- Remote GitHub.
- D1 binding `DB`.
- Migration lokal `0001_initial.sql`.
- API dasar create/list/health.
- UI dasar form laporan dan tabel.
- Vitest setup.
- GitHub Actions CI.
- Template issue/PR/human review.

#### Draft / Belum Final

- `CASE.md`
  - Cukup lengkap, tetapi masih bisa direview.
- Semua file di `docs/requirements/`
  - Draft v1.
  - Perlu dijalankan ulang/dirapikan memakai skill yang benar.
- `docs/reflection.md`
  - Belum diisi.
- `docs/deployment/submission-info.md`
  - Belum lengkap.
- `README.md`
  - Masih bawaan template Cloudflare, perlu rewrite nanti.
- UI styling
  - Cukup untuk tutorial awal, belum final design.

#### Belum Selesai / Bolong

- Belum membuat 3 skill tambahan:
  - `06 Architecture Design`
  - `07 Database dan API Design`
  - `08 UI Design`
- Belum ada design docs:
  - Architecture.
  - Database/API design.
  - UI flow/wireframe.
- Belum ada GitHub Issues final minimal 10.
- Belum ada Pull Request minimal 6.
- Belum ada automated test minimal 20.
- Baru ada 2 test.
- Belum ada integration test.
- Belum ada acceptance test.
- Belum ada status history table.
- Belum ada comments table.
- Belum ada technician assignment.
- Belum ada dashboard.
- Belum ada search/filter.
- Belum ada detail report page.
- Belum ada close/reopen flow.
- Belum ada production migration.
- Belum deploy ke Cloudflare.
- Belum connect GitHub ke Cloudflare.
- Belum ada Cloudflare URL.
- Belum ada release note.
- Belum ada AI evidence lengkap.
- Belum ada human review dokumen/kode yang terisi.

### 5.4 Skill Status

Installed in local Codex skills directory:

- `01-inception`
- `02-elicitation`
- `03-specification`
- `04-prioritization`
- `05-validation-change`
- `chrome-devtools`

Already available before:

- `grill-me`
- `grill-with-docs`
- `to-prd`
- `to-issues`
- `tdd`

Important:

- Codex should be restarted after skill installation so new skills are active in a new session.

## 6. Next Steps

### 6.1 Prioritas Langsung Setelah Sesi Ini

1. **Restart Codex**
   - Alasan: skill baru `01-05` dan `chrome-devtools` baru diinstall.
   - Setelah restart, cek apakah skill muncul aktif.

2. **Gunakan `grill-with-docs` terlebih dahulu**
   - Tujuan: menguji ulang pemahaman project terhadap:
     - `instruksi-dosen.md`
     - `CASE.md`
     - draft docs requirements
   - Jangan langsung coding.

3. **Jalankan tahap 01-05 memakai skill yang benar**
   - `01-inception`
   - `02-elicitation`
   - `03-specification`
   - `04-prioritization`
   - `05-validation-change`
   - Tujuan: memperbaiki/menyetujui docs requirements yang sudah ada.
   - Output harus jelas mana draft AI, mana hasil review, dan mana final.

4. **Setelah tahap 5 valid, baru buat 3 skill tambahan**
   - `06 Architecture Design`
   - `07 Database dan API Design`
   - `08 UI Design`
   - Skill ini harus disesuaikan dengan format dosen dan kemungkinan gaya Matt Pocock/repo user.

5. **Buat design docs**
   - Setelah skill 06-08 siap, buat:
     - `docs/design/architecture.md`
     - `docs/design/database-api.md`
     - `docs/design/ui-flow.md`
     - Wireframe sederhana.

6. **Gunakan `to-issues` untuk GitHub Issues**
   - Setelah requirements/design jelas.
   - Target minimal 10 GitHub Issues.

7. **Gunakan `tdd` untuk implementasi fitur berikutnya**
   - Implement fitur dengan red-green-refactor.
   - Target bertahap menuju minimal 20 automated tests.

8. **Gunakan `chrome-devtools` untuk testing browser/UI**
   - Setelah UI lebih lengkap atau sebelum acceptance test.

9. **Baru kerjakan Step 17-20**
   - Step 17: remote migration production.
   - Step 18: deploy Cloudflare.
   - Step 19: connect GitHub to Cloudflare.
   - Step 20: checklist setelah deployment.

### 6.2 Pertanyaan atau Keputusan yang Masih Menggantung

User perlu memutuskan:

1. Apakah `instruksi-dosen.md` akan tetap lokal sampai final, atau nanti ikut di-commit sebagai referensi?
2. Apakah draft docs requirements yang sudah dibuat boleh diperbaiki langsung oleh skill 01-05, atau perlu disimpan sebagai "AI draft awal" di folder `evidence/` dulu?
3. Apakah role pengguna cukup disimulasikan di UI atau perlu sistem login sederhana?
4. Apakah teknisi cukup berupa nama statis/data seed, atau perlu tabel teknisi?
5. Apakah dashboard sederhana cukup menampilkan jumlah laporan per status/kategori/prioritas?
6. Apakah 3 skill tambahan 06-08 dibuat di repo project `skills/`, atau di Codex local skills directory juga?
7. Apakah semua pekerjaan berikutnya wajib dibuat lewat GitHub Issues dan Pull Request, atau boleh commit langsung ke `development` sampai planning siap?

### 6.3 Urutan yang Jangan Dilanggar

- Jangan deploy production sebelum requirements/design minimal siap.
- Jangan membuat 06-08 sebelum tahap 01-05 selesai/valid, sesuai preferensi user.
- Jangan menghapus `instruksi-dosen.md` sekarang.
- Jangan commit `instruksi-dosen.md` tanpa izin.
- Jangan membuat fitur out of scope sebelum semua fitur wajib selesai.
- Jangan lanjut coding besar tanpa issues/TDD setelah tahap planning dimulai.

