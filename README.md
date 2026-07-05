# Campus Service Request and Maintenance System

[![CI](https://github.com/Prayerr10/Project-Final-SoftwareEngineering-/actions/workflows/ci.yml/badge.svg?branch=development)](https://github.com/Prayerr10/Project-Final-SoftwareEngineering-/actions/workflows/ci.yml)
[![Deployment](https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare&logoColor=white)](https://campus-maintenance.pkaawoan24.workers.dev)
[![Tests](https://img.shields.io/badge/Tests-90%20passing-2ea44f)](./tests)

Sistem pelaporan dan pemeliharaan fasilitas kampus berbasis web untuk membuat, meninjau, menugaskan, mengerjakan, dan menutup laporan kerusakan fasilitas. Proyek ini dibuat untuk tugas akhir mata kuliah Software Engineering dengan dokumentasi requirements, design, testing, deployment, traceability, dan AI-assisted workflow.

## URL Aplikasi

https://campus-maintenance.pkaawoan24.workers.dev

Health check:

https://campus-maintenance.pkaawoan24.workers.dev/api/health

Repository:

https://github.com/Prayerr10/Project-Final-SoftwareEngineering-

## Fitur Utama

- Pelaporan kerusakan fasilitas kampus.
- Daftar, pencarian, filter, dan detail laporan.
- Review admin, prioritas, dan assignment teknisi.
- Update status pekerjaan dan riwayat perubahan status.
- Komentar publik dan catatan internal sesuai role.
- Dashboard untuk Pelapor, Administrator, Teknisi, dan Manajer Fasilitas.
- Premium UI redesign.
- Login berbasis role dengan session cookie.
- Logout dan endpoint `/api/auth/me` untuk validasi sesi aktif.

## Akun Demo

| Role | Username | Password |
|---|---|---|
| Pelapor | pelapor_demo | pelapor123 |
| Administrator | admin_demo | admin123 |
| Teknisi | teknisi_demo | teknisi123 |
| Manajer Fasilitas | manajer_demo | manajer123 |

Akun ini hanya digunakan untuk demonstrasi tugas. Jangan gunakan ulang password ini untuk sistem nyata.

## Menjalankan Secara Lokal

1. Install dependency:

   ```bash
   npm install
   ```

2. Buat file `.dev.vars` lokal berisi `AUTH_SECRET`.

   Jangan commit `.dev.vars` dan jangan menulis nilai rahasia di README.

3. Jalankan migration lokal yang diperlukan sesuai urutan file di `database/migrations/`.

   ```bash
   npx wrangler d1 execute campus-maintenance-db --local --file=database/migrations/0001_initial.sql
   ```

   Ulangi untuk migration berikutnya bila database lokal masih kosong.

4. Jalankan aplikasi:

   ```bash
   npm run dev
   ```

5. Buka URL lokal yang ditampilkan terminal.

## Testing dan Validasi

Hasil validasi terbaru:

- 90 automated tests dalam 16 test files.
- `npm test -- --run`: PASS.
- `npx tsc -b`: PASS.
- `npm run build`: PASS.
- `git diff --check`: PASS.

CI GitHub Actions menjalankan test dan build pada pull request serta branch utama proyek.

## Known Limitation

`npm run lint` masih memiliki temuan baseline/pre-existing pada beberapa file lama dan generated file. Hal ini tidak menghambat test, build, CI, atau deployment saat ini.

## Status Implementasi

- Authentication/login/logout/auth-me: selesai dan deployed.
- Premium UI redesign: selesai.
- Cloudflare Workers + D1 deployment: selesai.
- URL publik telah diverifikasi.

## Teknologi

| Area | Teknologi |
|---|---|
| Frontend | React, TypeScript, Vite |
| Backend/API | Cloudflare Workers |
| Database | Cloudflare D1 |
| Testing | Vitest |
| CI/CD | GitHub Actions, Wrangler |

## API Utama

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/health` | Health check API dan D1. |
| POST | `/api/auth/login` | Login username/password dan membuat session cookie. |
| POST | `/api/auth/logout` | Logout dan menghapus session cookie. |
| GET | `/api/auth/me` | Mengembalikan user, role, dan display name dari session aktif. |
| GET | `/api/requests` | Daftar laporan dengan search dan filter. |
| POST | `/api/requests` | Membuat laporan baru. |
| GET | `/api/requests/:id` | Detail laporan, status history, komentar, dan catatan sesuai role. |
| PATCH | `/api/requests/:id/review` | Review laporan oleh Administrator. |
| PATCH | `/api/requests/:id/assignment` | Menugaskan Teknisi. |
| PATCH | `/api/requests/:id/progress` | Mengubah status pengerjaan. |
| PATCH | `/api/requests/:id/resolve` | Menandai laporan selesai dikerjakan. |
| PATCH | `/api/requests/:id/close` | Menutup laporan. |
| GET | `/api/dashboard/summary` | Ringkasan dashboard sesuai role. |

## Dokumentasi Proyek

- Requirements: `docs/requirements/`
- Design: `docs/design/`
- Testing: `docs/testing/`
- Deployment: `docs/deployment/`
- AI evidence dan human review: `evidence/`
- Reusable AI skills: `skills/`

## Catatan Keamanan

- `.dev.vars` tidak boleh di-commit.
- Secret environment production disimpan di Cloudflare, bukan di repository.
- Dokumentasi ini hanya mencantumkan akun demo untuk kebutuhan penilaian.
