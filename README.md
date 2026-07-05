# Campus Service Request and Maintenance System

Sistem pelaporan dan pemeliharaan fasilitas kampus berbasis React, Cloudflare Workers, dan Cloudflare D1. Proyek ini dibuat untuk tugas akhir mata kuliah Software Engineering dengan fokus pada requirement engineering, AI-assisted workflow, traceability, automated testing, acceptance testing, dan deployment Cloudflare.

## Ringkasan

Campus Service Request and Maintenance System membantu civitas kampus membuat laporan kerusakan atau kebutuhan layanan fasilitas, lalu memprosesnya melalui alur kerja Administrator dan Teknisi sampai laporan ditutup.

Alur status utama:

```text
SUBMITTED -> UNDER_REVIEW -> ASSIGNED -> IN_PROGRESS -> RESOLVED -> CLOSED
```

Status reopen kembali ke:

```text
CLOSED -> UNDER_REVIEW
```

## Deployment Publik

| Item | Nilai |
| --- | --- |
| URL aplikasi | https://campus-maintenance.pkaawoan24.workers.dev |
| Health check | https://campus-maintenance.pkaawoan24.workers.dev/api/health |
| Platform | Cloudflare Workers + Cloudflare D1 |
| Branch pengembangan | `development` |
| Branch final submit | `main` setelah final merge |

Contoh respons health check:

```json
{
  "status": "healthy",
  "service": "campus-maintenance",
  "checks": {
    "api": "ok",
    "d1": "ok"
  }
}
```

## Aktor

| Aktor | Kemampuan Utama |
| --- | --- |
| Pelapor | Membuat laporan, melihat daftar/detail laporan, menambahkan komentar publik, mengonfirmasi pekerjaan resolved. |
| Administrator | Review laporan, menentukan kategori dan prioritas, menugaskan Teknisi, menutup laporan, membuka kembali laporan. |
| Teknisi | Melihat tugas, menerima tugas, mengubah status pekerjaan, menandai resolved, menambahkan komentar publik dan catatan internal. |
| Manajer Fasilitas | Melihat dashboard operasional dan ringkasan beban kerja Teknisi. |

## Fitur Wajib

- Membuat laporan baru.
- Melihat daftar laporan.
- Mencari dan menyaring laporan.
- Melihat detail laporan.
- Memeriksa laporan oleh Administrator.
- Menentukan prioritas.
- Menugaskan Teknisi.
- Mengubah status pekerjaan.
- Menambahkan komentar publik dan catatan internal.
- Menyimpan riwayat status.
- Menutup atau membuka kembali laporan.
- Menampilkan dashboard sederhana.

## Stack Teknologi

| Layer | Teknologi | Lokasi |
| --- | --- | --- |
| Frontend | React, TypeScript, Vite | `src/` |
| Backend/API | Cloudflare Workers | `worker/` |
| Database | Cloudflare D1, SQLite migration | `database/migrations/` |
| Test | Vitest | `tests/` |
| CI | GitHub Actions | `.github/workflows/ci.yml` |
| Deployment | Wrangler | `wrangler.jsonc` |

## Struktur Repository

```text
.
├── README.md
├── CASE.md
├── skills/
│   ├── 01-inception-stakeholder/SKILL.md
│   ├── 02-elicitation/SKILL.md
│   ├── 03-specification/SKILL.md
│   ├── 04-prioritization/SKILL.md
│   ├── 05-validation-change/SKILL.md
│   ├── 06-architecture-design/SKILL.md
│   ├── 07-database-api-design/SKILL.md
│   ├── 08-ui-design/SKILL.md
│   ├── 09-issue-planning/SKILL.md
│   ├── 10-implementation/SKILL.md
│   ├── 11-code-review/SKILL.md
│   ├── 12-test-planning/SKILL.md
│   ├── 13-automated-testing/SKILL.md
│   ├── 14-acceptance-testing/SKILL.md
│   └── 15-deployment/SKILL.md
├── docs/
│   ├── requirements/
│   ├── design/
│   ├── testing/
│   └── deployment/
├── src/
├── worker/
├── database/
│   └── migrations/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── acceptance/
├── evidence/
├── .github/
└── wrangler.jsonc
```

## Requirement Summary

| Artefak | Jumlah |
| --- | ---: |
| Functional Requirements | 24 |
| Non-Functional Requirements | 9 |
| Business Rules | 12 |
| User Stories | 17 |
| Acceptance Criteria | 40 |
| Change Request | 1 |
| GitHub Issues | 12 |
| Pull Requests | 30 total, 29 merged |
| Automated Tests | 81 passing |

Dokumen utama:

- `docs/requirements/requirements.md`
- `docs/requirements/user-stories.md`
- `docs/requirements/prioritization.md`
- `docs/requirements/validation.md`
- `docs/requirements/change-request.md`
- `docs/requirements/traceability.md`
- `docs/design/architecture.md`
- `docs/design/database-api.md`
- `docs/design/ui-flow.md`

## API Utama

| Method | Endpoint | Fungsi |
| --- | --- | --- |
| GET | `/api/health` | Health check API dan D1. |
| GET | `/api/requests` | List, search, dan filter laporan. |
| POST | `/api/requests` | Membuat laporan baru. |
| GET | `/api/requests/:id` | Detail laporan, riwayat status, komentar, dan catatan sesuai role. |
| GET | `/api/technicians` | Daftar Teknisi aktif untuk Administrator. |
| GET | `/api/technicians/:id/tasks` | Daftar tugas Teknisi. |
| PATCH | `/api/requests/:id/review` | Review laporan oleh Administrator. |
| PATCH | `/api/requests/:id/classification` | Menentukan kategori dan prioritas. |
| PATCH | `/api/requests/:id/assignment` | Menugaskan Teknisi. |
| PATCH | `/api/requests/:id/accept` | Teknisi menerima tugas. |
| PATCH | `/api/requests/:id/progress` | Mengubah status ke `IN_PROGRESS`. |
| PATCH | `/api/requests/:id/resolve` | Mengubah status ke `RESOLVED`. |
| POST | `/api/requests/:id/comments` | Menambahkan komentar publik. |
| POST | `/api/requests/:id/internal-notes` | Menambahkan catatan internal. |
| PATCH | `/api/requests/:id/confirm-resolution` | Pelapor mengonfirmasi pekerjaan resolved. |
| PATCH | `/api/requests/:id/close` | Administrator menutup laporan. |
| PATCH | `/api/requests/:id/reopen` | Administrator membuka kembali laporan. |
| GET | `/api/dashboard/summary` | Dashboard operasional. |

## Cara Menjalankan Lokal

Prasyarat:

- Node.js 22 atau lebih baru.
- npm.
- Akun Cloudflare untuk deployment.

Install dependency:

```bash
npm ci
```

Jalankan development server:

```bash
npm run dev
```

Jalankan test:

```bash
npm test -- --run
```

Build production:

```bash
npm run build
```

Deploy ke Cloudflare:

```bash
npm run deploy
```

## Database

Migration D1 berada di `database/migrations/`:

- `0001_initial.sql`
- `0002_create_request_identity_and_history.sql`
- `0003_create_technicians_and_assignments.sql`
- `0004_create_request_comments_and_internal_notes.sql`
- `0005_create_reporter_confirmations.sql`
- `0006_enforce_request_status_priority.sql`

Binding D1 di `wrangler.jsonc`:

```jsonc
"d1_databases": [
  {
    "binding": "DB",
    "database_name": "campus-maintenance-db"
  }
]
```

## Testing dan CI

Test suite menggunakan Vitest dan dibagi menjadi:

- `tests/unit/`
- `tests/integration/`
- `tests/acceptance/`

CI GitHub Actions menjalankan:

```bash
npm ci
npm test -- --run
npm run build
```

Workflow CI:

- Pull request.
- Push ke `main`.
- Push ke `development`.

## AI-Assisted Engineering Evidence

Proyek ini menggunakan AI sebagai asisten, bukan pengganti review manusia. Bukti penggunaan AI disimpan di:

- `skills/`
- `evidence/`
- `docs/templates/human-review-template.md`
- Pull request body GitHub
- Human Review documents

Setiap work product penting harus mencatat:

- Prompt yang dipakai.
- Output awal AI.
- Kesalahan yang ditemukan.
- Revisi manusia.
- Hasil final.
- Keputusan human review.

## Branch dan Pull Request Workflow

Workflow yang digunakan:

1. Requirement dan design dibuat melalui branch feature.
2. Implementasi dikerjakan melalui issue-based branch.
3. Pull request dibuat ke `development`.
4. CI menjalankan test dan build otomatis.
5. Human review dicatat di PR dan folder `evidence/`.
6. Setelah semua gap selesai, `development` dapat di-merge ke `main` untuk final submission.

## Catatan Submit

Sebelum submit akhir:

- Pastikan `development` sudah final.
- Pastikan `main` sudah menerima merge final dari `development`.
- Pastikan README mencantumkan URL Cloudflare aktif.
- Pastikan `npm test -- --run` PASS.
- Pastikan `npm run build` PASS.
- Pastikan CI terakhir PASS.
- Pastikan tidak ada secret, token, password, atau API key di repository.
- Pastikan folder `skills/` berisi 15 `SKILL.md`.

## Lisensi dan Konteks Akademik

Repository ini dibuat untuk kebutuhan akademik mata kuliah Software Engineering. Semua data dummy yang dipakai pada testing dan deployment smoke test tidak berisi data pribadi atau credential production.
