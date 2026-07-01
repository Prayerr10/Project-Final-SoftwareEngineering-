# Database and API Design

| Review Status | Draft - Needs Human Review |
| --- | --- |
| Skill AI | Skill 07 - Database dan API Design (`07-database-api-design`) |
| Human decision | Pending Human Review |

## Source Summary

Dokumen ini adalah output Skill 07. Isinya menggunakan requirement final dan arsitektur Skill 06 yang sudah `Human Reviewed & Approved`, tanpa mengubah requirement, user story, acceptance criteria, business rule, prioritas, change request, atau keputusan arsitektur.

| Source ID | Source | Usage |
| --- | --- | --- |
| DBAPI-SRC-01 | `instruksi-dosen.md` | Instruksi utama, template PR, template Human Review, template traceability, batas Cloudflare Workers dan D1. |
| DBAPI-SRC-02 | `CASE.md` | Studi kasus, aktor, fitur wajib, fitur tidak wajib, alur status, dan batasan teknis. |
| DBAPI-SRC-03 | `CONTEXT.md` | Istilah domain: Pelapor, Administrator, Teknisi, Manajer Fasilitas, Riwayat Status, Komentar Publik, Catatan Internal, Role-Based API Validation. |
| DBAPI-SRC-04 | `skills/06-architecture-design/SKILL.md` | Batas output Skill 06 dan larangan membuat detail database/API pada Skill 06. |
| DBAPI-SRC-05 | `docs/requirements/requirements.md` | FR-01 sampai FR-24, NFR-01 sampai NFR-09, BR-01 sampai BR-12, dan open question. |
| DBAPI-SRC-06 | `docs/requirements/user-stories.md` | US-01 sampai US-17 dan acceptance criteria. |
| DBAPI-SRC-07 | `docs/requirements/prioritization.md` | Prioritas Must/Should/Could dan dependency requirement. |
| DBAPI-SRC-08 | `docs/requirements/validation.md` | Validasi final dan open question yang tidak boleh diselesaikan sepihak. |
| DBAPI-SRC-09 | `docs/requirements/change-request.md` | CR-05-01 tentang marker non-status untuk konfirmasi Pelapor; belum menjadi requirement final baru. |
| DBAPI-SRC-10 | `docs/requirements/traceability.md` | Traceability sampai Skill 06 yang menjadi baseline update Skill 07. |
| DBAPI-SRC-11 | `docs/design/architecture.md` | Landasan utama: React frontend, Cloudflare Worker API boundary, Cloudflare D1, binding `DB`, strict 6 status, role/workflow validation. |
| DBAPI-SRC-12 | `evidence/human-review-architecture.md` | Bukti Skill 06 sudah `Disetujui`. |
| DBAPI-SRC-13 | `wrangler.jsonc` | Worker main `worker/index.ts`, D1 binding `DB`, database `campus-maintenance-db`, Cloudflare deployment settings. |
| DBAPI-SRC-14 | `package.json` | Stack project: React, Vite, Cloudflare plugin, Wrangler, TypeScript, Vitest. |
| DBAPI-SRC-15 | `database/migrations/0001_initial.sql` | Migration awal tutorial yang sudah ada; tidak diubah oleh Skill 07. |
| DBAPI-SRC-16 | `worker/index.ts` | API awal tutorial yang sudah ada; tidak diubah oleh Skill 07. |

## Scope and Non-Scope

Scope Skill 07:

- Merancang database Cloudflare D1 berbasis SQLite pada level design.
- Merancang kontrak API Cloudflare Workers secara contract-first.
- Menentukan role-based API validation, status workflow validation, response convention, error contract, dashboard data contract, dan traceability.
- Menandai `ASSUMPTION`, `OPEN QUESTION`, dan `Needs Human Review` tanpa membuat keputusan requirement baru.

Non-scope Skill 07:

- Tidak membuat migration SQL final di `database/migrations/`.
- Tidak menulis kode TypeScript, Worker handler, React component, test, UI flow, wireframe, design token, deployment, atau issue planning.
- Tidak menambah status workflow di luar `SUBMITTED`, `UNDER_REVIEW`, `ASSIGNED`, `IN_PROGRESS`, `RESOLVED`, dan `CLOSED`.
- Tidak menambah fitur out of scope seperti upload foto, email notification, Google login, QR code ruangan, AI kategori, inventory spare part, atau vendor management.

## API Contract-First Principles

1. Endpoint API menjadi kontrak utama antara React dan Cloudflare Workers sebelum implementasi SQL atau handler dibuat.
2. Frontend Role-Based UI hanya menyembunyikan aksi; Cloudflare Worker tetap memvalidasi role, action, status awal, status tujuan, required field, dan visibility data.
3. Semua perubahan status harus membuat record Riwayat Status.
4. API menggunakan field `camelCase` untuk response/request karena frontend React dan TypeScript lebih idiomatis memakai camelCase. Database tetap memakai `snake_case`.
5. Timestamp API menggunakan ISO string. Database menyimpan timestamp sebagai `TEXT` ISO-8601 compatible.
6. Enum role, status, priority, reporter_type, dan visibility menggunakan uppercase string agar konsisten dengan requirement.
7. Error response harus cukup eksplisit untuk UI state: validation error, forbidden, not found, conflict/invalid transition, empty list, dan server error.

## Database Design Overview

Cloudflare D1 memakai SQLite dan diakses dari Cloudflare Workers melalui binding `DB` dari `wrangler.jsonc`. Tabel dirancang sebagai sumber data untuk list, detail, workflow, komentar, catatan internal, konfirmasi Pelapor, assignment Teknisi, dan dashboard.

Design ID utama:

| Design ID | Area |
| --- | --- |
| DB-01 | `service_requests` sebagai aggregate utama laporan. |
| DB-02 | `technicians` sebagai referensi Teknisi untuk assignment dan dashboard workload. |
| DB-03 | `request_assignments` sebagai riwayat/record penugasan Teknisi. |
| DB-04 | `request_status_history` sebagai audit trail status. |
| DB-05 | `request_comments` sebagai Komentar Publik. |
| DB-06 | `request_internal_notes` sebagai Catatan Internal. |
| DB-07 | `reporter_confirmations` sebagai konfirmasi hasil oleh Pelapor. |

ASSUMPTION: User/account table tidak dirancang pada Skill 07 karena autentikasi penuh tidak menjadi requirement final. Role context disimulasikan dan divalidasi oleh API sebagai baseline project.

## Table Specifications

### DB-01 - `service_requests`

Tujuan: Menyimpan data utama laporan fasilitas kampus, reporter identity yang sudah disetujui, controlled values, status saat ini, dan field pendukung workflow.

| Column | Type | Required | Default | Constraint / Notes |
| --- | --- | --- | --- | --- |
| `id` | TEXT | Yes | generated UUID | Primary key. |
| `request_number` | TEXT | Yes | generated | Unique human-readable number, contoh format implementasi dapat ditentukan nanti. |
| `title` | TEXT | Yes | none | Judul laporan. |
| `description` | TEXT | Yes | none | Deskripsi laporan; tutorial awal memakai minimal 20 karakter. |
| `location` | TEXT | Yes | none | Lokasi masalah. |
| `category` | TEXT | Yes | none | Controlled vocabulary; OPEN QUESTION: OPEN-05 untuk daftar final. |
| `priority` | TEXT | Yes | `MEDIUM` | `LOW`, `MEDIUM`, `HIGH`, `URGENT`. |
| `priority_suggestion` | TEXT | No | null | `HIGH` untuk `reporter_type = LECTURER`; saran, bukan keputusan final. |
| `status` | TEXT | Yes | `SUBMITTED` | Strict status: `SUBMITTED`, `UNDER_REVIEW`, `ASSIGNED`, `IN_PROGRESS`, `RESOLVED`, `CLOSED`. |
| `reporter_name` | TEXT | Yes | none | Approved reporter identity. |
| `reporter_type` | TEXT | Yes | none | `STUDENT` atau `LECTURER`. |
| `reviewed_at` | TEXT | No | null | Waktu review Administrator. |
| `reviewed_by_role` | TEXT | No | null | Harus `ADMINISTRATOR` jika terisi. |
| `closed_at` | TEXT | No | null | Waktu status menjadi `CLOSED`. |
| `closed_by_role` | TEXT | No | null | Harus `ADMINISTRATOR` jika terisi. |
| `manual_override_used` | INTEGER | Yes | `0` | Boolean SQLite 0/1; hanya relevan untuk close. |
| `manual_override_note` | TEXT | No | null | Required jika close memakai override. OPEN QUESTION: OPEN-03 untuk kondisi sah override. |
| `created_at` | TEXT | Yes | current timestamp | ISO-compatible timestamp. |
| `updated_at` | TEXT | Yes | current timestamp | Diubah setiap update command. |

Primary key: `id`.

Foreign key: none.

Constraints:

- `request_number` unique.
- `status` check terhadap 6 status strict.
- `priority` check terhadap 4 priority values.
- `reporter_type` check terhadap `STUDENT`, `LECTURER`.
- `manual_override_used` check 0/1.
- Jika `manual_override_used = 1`, `manual_override_note` wajib ada pada endpoint close.

Indexes:

- `idx_service_requests_status` on `status`.
- `idx_service_requests_priority` on `priority`.
- `idx_service_requests_category` on `category`.
- `idx_service_requests_created_at` on `created_at`.
- `idx_service_requests_reporter_type` on `reporter_type`.
- `idx_service_requests_search` design note: SQLite LIKE search can use title/location/request_number/category; final FTS is not required unless later approved.

Traceability: FR-01, FR-02, FR-03, FR-04, FR-05, FR-06, FR-08, FR-09, FR-10, FR-20, BR-01, BR-02, BR-04, BR-05, BR-06, BR-07, BR-11, US-01 sampai US-07, US-14.

### DB-02 - `technicians`

Tujuan: Menyimpan daftar Teknisi yang dapat ditugaskan dan dihitung workload-nya.

| Column | Type | Required | Default | Constraint / Notes |
| --- | --- | --- | --- | --- |
| `id` | TEXT | Yes | generated UUID | Primary key. |
| `name` | TEXT | Yes | none | Nama Teknisi. |
| `specialization` | TEXT | No | null | Membantu assignment; nilai final tidak menjadi requirement controlled vocabulary. |
| `is_active` | INTEGER | Yes | `1` | Boolean SQLite 0/1. |
| `created_at` | TEXT | Yes | current timestamp | ISO-compatible timestamp. |
| `updated_at` | TEXT | Yes | current timestamp | ISO-compatible timestamp. |

Primary key: `id`.

Foreign key: none.

Constraints:

- `is_active` check 0/1.

Indexes:

- `idx_technicians_active` on `is_active`.
- `idx_technicians_name` on `name`.

Traceability: FR-11, FR-12, FR-23, US-08, US-09, US-16.

### DB-03 - `request_assignments`

Tujuan: Menyimpan penugasan laporan ke Teknisi, termasuk acceptance oleh Teknisi.

| Column | Type | Required | Default | Constraint / Notes |
| --- | --- | --- | --- | --- |
| `id` | TEXT | Yes | generated UUID | Primary key. |
| `request_id` | TEXT | Yes | none | FK ke `service_requests.id`. |
| `technician_id` | TEXT | Yes | none | FK ke `technicians.id`. |
| `assigned_by_role` | TEXT | Yes | `ADMINISTRATOR` | Harus `ADMINISTRATOR`. |
| `assigned_at` | TEXT | Yes | current timestamp | Waktu assignment. |
| `accepted_at` | TEXT | No | null | Terisi saat Teknisi menerima tugas. |
| `is_current` | INTEGER | Yes | `1` | Boolean SQLite 0/1 untuk assignment aktif. |

Primary key: `id`.

Foreign keys:

- `request_id` references `service_requests(id)`.
- `technician_id` references `technicians(id)`.

Constraints:

- `assigned_by_role` check `ADMINISTRATOR`.
- `is_current` check 0/1.
- Satu request hanya boleh punya satu current assignment. Implementasi final dapat memakai unique partial index jika didukung D1/SQLite atau validasi API transaction.

Indexes:

- `idx_request_assignments_request_id` on `request_id`.
- `idx_request_assignments_technician_id` on `technician_id`.
- `idx_request_assignments_current` on `request_id, is_current`.
- `idx_request_assignments_workload` on `technician_id, is_current`.

Traceability: FR-11, FR-12, FR-13, FR-14, FR-23, BR-03, US-08, US-09, US-10, US-16.

OPEN QUESTION: OPEN-08 belum menentukan apakah Teknisi boleh menolak tugas. Karena itu desain hanya menyimpan acceptance, bukan rejection/reassignment policy.

### DB-04 - `request_status_history`

Tujuan: Menyimpan Riwayat Status append-only untuk setiap status awal dan transisi.

| Column | Type | Required | Default | Constraint / Notes |
| --- | --- | --- | --- | --- |
| `id` | TEXT | Yes | generated UUID | Primary key. |
| `request_id` | TEXT | Yes | none | FK ke `service_requests.id`. |
| `from_status` | TEXT | No | null | Null hanya untuk initial creation event. |
| `to_status` | TEXT | Yes | none | Salah satu 6 status strict. |
| `changed_by_role` | TEXT | Yes | none | `REPORTER`, `ADMINISTRATOR`, atau `TECHNICIAN`. |
| `note` | TEXT | Yes | none | Catatan perubahan status. |
| `created_at` | TEXT | Yes | current timestamp | Timestamp perubahan. |

Primary key: `id`.

Foreign key:

- `request_id` references `service_requests(id)`.

Constraints:

- `from_status` nullable hanya untuk initial `SUBMITTED`.
- `to_status` check terhadap 6 status strict.
- `changed_by_role` check terhadap role API.
- `note` required agar BR-08 terpenuhi.

Indexes:

- `idx_status_history_request_id` on `request_id`.
- `idx_status_history_created_at` on `created_at`.
- `idx_status_history_to_status` on `to_status`.

Traceability: FR-18, BR-01, BR-02, BR-08, US-05, US-10, US-15.

### DB-05 - `request_comments`

Tujuan: Menyimpan Komentar Publik yang dapat dilihat Pelapor, Administrator, dan Teknisi.

| Column | Type | Required | Default | Constraint / Notes |
| --- | --- | --- | --- | --- |
| `id` | TEXT | Yes | generated UUID | Primary key. |
| `request_id` | TEXT | Yes | none | FK ke `service_requests.id`. |
| `author_role` | TEXT | Yes | none | `REPORTER`, `ADMINISTRATOR`, atau `TECHNICIAN`. |
| `body` | TEXT | Yes | none | Isi komentar. |
| `visibility` | TEXT | Yes | `PUBLIC` | Controlled vocabulary comment visibility. |
| `created_at` | TEXT | Yes | current timestamp | ISO-compatible timestamp. |

Primary key: `id`.

Foreign key:

- `request_id` references `service_requests(id)`.

Constraints:

- `visibility` harus `PUBLIC`.
- `author_role` check terhadap role yang diizinkan.
- `body` wajib non-empty pada validasi API.

Indexes:

- `idx_request_comments_request_id` on `request_id`.
- `idx_request_comments_created_at` on `created_at`.

Traceability: FR-16, BR-09, US-11.

### DB-06 - `request_internal_notes`

Tujuan: Menyimpan Catatan Internal untuk koordinasi Administrator dan Teknisi.

| Column | Type | Required | Default | Constraint / Notes |
| --- | --- | --- | --- | --- |
| `id` | TEXT | Yes | generated UUID | Primary key. |
| `request_id` | TEXT | Yes | none | FK ke `service_requests.id`. |
| `author_role` | TEXT | Yes | none | `ADMINISTRATOR` atau `TECHNICIAN`. |
| `body` | TEXT | Yes | none | Isi catatan internal. |
| `visibility` | TEXT | Yes | `INTERNAL` | Controlled vocabulary comment visibility. |
| `created_at` | TEXT | Yes | current timestamp | ISO-compatible timestamp. |

Primary key: `id`.

Foreign key:

- `request_id` references `service_requests(id)`.

Constraints:

- `visibility` harus `INTERNAL`.
- `author_role` check `ADMINISTRATOR`, `TECHNICIAN`.
- `body` wajib non-empty pada validasi API.

Indexes:

- `idx_internal_notes_request_id` on `request_id`.
- `idx_internal_notes_created_at` on `created_at`.

Traceability: FR-17, BR-10, US-12.

OPEN QUESTION: OPEN-10 belum menentukan apakah Manajer Fasilitas boleh melihat Catatan Internal. Baseline desain API tidak memberi akses Catatan Internal kepada Manajer Fasilitas sampai ada Human Review.

### DB-07 - `reporter_confirmations`

Tujuan: Menyimpan konfirmasi Pelapor bahwa pekerjaan yang `RESOLVED` sudah diterima.

| Column | Type | Required | Default | Constraint / Notes |
| --- | --- | --- | --- | --- |
| `id` | TEXT | Yes | generated UUID | Primary key. |
| `request_id` | TEXT | Yes | none | FK ke `service_requests.id`. |
| `confirmed_by_role` | TEXT | Yes | `REPORTER` | Harus `REPORTER`. |
| `confirmation_note` | TEXT | No | null | Catatan Pelapor. |
| `confirmed_at` | TEXT | Yes | current timestamp | Timestamp konfirmasi. |

Primary key: `id`.

Foreign key:

- `request_id` references `service_requests(id)`.

Constraints:

- `confirmed_by_role` check `REPORTER`.
- Satu request normalnya hanya butuh satu confirmation aktif. Implementasi final dapat memakai unique index pada `request_id`.

Indexes:

- `idx_reporter_confirmations_request_id` on `request_id`.
- `idx_reporter_confirmations_confirmed_at` on `confirmed_at`.

Traceability: FR-19, FR-20, BR-11, US-13, US-14.

OPEN QUESTION: OPEN-11 dan CR-05-01 belum menyetujui marker non-status untuk "waiting confirmation". Desain ini menyimpan event confirmation tanpa menambah status ketujuh.

## Relationship Model

| Relationship | Cardinality | Notes |
| --- | --- | --- |
| `service_requests` to `request_status_history` | One-to-many | Satu laporan memiliki banyak riwayat status. |
| `service_requests` to `request_comments` | One-to-many | Satu laporan memiliki banyak Komentar Publik. |
| `service_requests` to `request_internal_notes` | One-to-many | Satu laporan memiliki banyak Catatan Internal. |
| `service_requests` to `request_assignments` | One-to-many over time; one current assignment | Riwayat assignment dapat disimpan; API menjaga satu assignment aktif. |
| `technicians` to `request_assignments` | One-to-many | Satu Teknisi dapat punya banyak assignment. |
| `service_requests` to `reporter_confirmations` | One-to-one for normal closure; one-to-many only if future review approves repeated confirmation | Baseline memakai satu confirmation untuk close normal. |

## Controlled Vocabularies

| Vocabulary | Values | Source / Notes |
| --- | --- | --- |
| `status` | `SUBMITTED`, `UNDER_REVIEW`, `ASSIGNED`, `IN_PROGRESS`, `RESOLVED`, `CLOSED` | BR-02 strict. Tidak ada status tambahan. |
| `role` API | `REPORTER`, `ADMINISTRATOR`, `TECHNICIAN`, `FACILITY_MANAGER` | Dari aktor sistem; role context disimulasikan. |
| `priority` | `LOW`, `MEDIUM`, `HIGH`, `URGENT` | BR-07. OPEN-06 untuk kriteria. |
| `reporter_type` | `STUDENT`, `LECTURER` | FR-02 dan FR-10. |
| `comment visibility` | `PUBLIC`, `INTERNAL` | `PUBLIC` untuk Komentar Publik; `INTERNAL` untuk Catatan Internal. |
| `category` | OPEN QUESTION: OPEN-05 | Harus fixed list, tetapi daftar final belum disetujui. API menolak nilai di luar daftar yang dikonfigurasi setelah Human Review. |

## API Response Conventions

Success single object:

```json
{
  "data": {}
}
```

Success list:

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "pageSize": 20,
    "total": 0,
    "empty": true
  }
}
```

Validation error:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Input tidak valid.",
    "fields": {
      "title": "Judul wajib diisi."
    }
  }
}
```

Forbidden:

```json
{
  "error": {
    "code": "FORBIDDEN",
    "message": "Role aktif tidak boleh melakukan aksi ini."
  }
}
```

Not found:

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Laporan tidak ditemukan."
  }
}
```

Conflict / invalid transition:

```json
{
  "error": {
    "code": "INVALID_STATUS_TRANSITION",
    "message": "Status laporan tidak dapat diubah dari ASSIGNED ke CLOSED.",
    "currentStatus": "ASSIGNED",
    "allowedStatuses": ["IN_PROGRESS"]
  }
}
```

Server error:

```json
{
  "error": {
    "code": "SERVER_ERROR",
    "message": "Terjadi kesalahan server."
  }
}
```

Common status codes: `200 OK`, `201 Created`, `400 Bad Request`, `403 Forbidden`, `404 Not Found`, `409 Conflict`, `422 Unprocessable Entity`, `500 Internal Server Error`.

## Endpoint Contract Table

| API ID | Method | Path | Roles | Purpose | Traceability |
| --- | --- | --- | --- | --- | --- |
| API-01 | GET | `/api/health` | Public/system | Health check. | NFR-02 |
| API-02 | GET | `/api/requests` | All roles | List, search, filter requests. | FR-03, FR-04, FR-05 |
| API-03 | POST | `/api/requests` | REPORTER | Create request. | FR-01, FR-02, BR-01 |
| API-04 | GET | `/api/requests/:id` | All roles with visibility rules | Request detail. | FR-06, FR-18, BR-09, BR-10 |
| API-05 | PATCH | `/api/requests/:id/review` | ADMINISTRATOR | Move `SUBMITTED` to `UNDER_REVIEW`. | FR-07, BR-03 |
| API-06 | PATCH | `/api/requests/:id/classification` | ADMINISTRATOR | Set category/priority and suggestion context. | FR-08, FR-09, FR-10 |
| API-07 | PATCH | `/api/requests/:id/assignment` | ADMINISTRATOR | Assign technician and move to `ASSIGNED`. | FR-11, BR-03 |
| API-08 | GET | `/api/technicians/:id/tasks` | TECHNICIAN, ADMINISTRATOR | View assigned tasks. | FR-12 |
| API-09 | PATCH | `/api/requests/:id/accept` | TECHNICIAN | Accept assigned task. | FR-13 |
| API-10 | PATCH | `/api/requests/:id/progress` | TECHNICIAN | Move to `IN_PROGRESS`. | FR-14 |
| API-11 | PATCH | `/api/requests/:id/resolve` | TECHNICIAN | Move to `RESOLVED`. | FR-15 |
| API-12 | POST | `/api/requests/:id/comments` | REPORTER, ADMINISTRATOR, TECHNICIAN | Add public comment. | FR-16, BR-09 |
| API-13 | POST | `/api/requests/:id/internal-notes` | ADMINISTRATOR, TECHNICIAN | Add internal note. | FR-17, BR-10 |
| API-14 | PATCH | `/api/requests/:id/confirm-resolution` | REPORTER | Record reporter confirmation. | FR-19, BR-11 |
| API-15 | PATCH | `/api/requests/:id/close` | ADMINISTRATOR | Close resolved request after confirmation or override. | FR-20, BR-11 |
| API-16 | PATCH | `/api/requests/:id/reopen` | ADMINISTRATOR | Reopen to `UNDER_REVIEW`. | FR-21, BR-12 |
| API-17 | GET | `/api/dashboard/summary` | FACILITY_MANAGER, ADMINISTRATOR | Operational summary and workload source data. | FR-22, FR-23 |

## Endpoint Detail Sections

### API-01 - `GET /api/health`

Role: Public/system.

Input: none.

Success `200`:

```json
{ "data": { "status": "ok" } }
```

Errors: `500 SERVER_ERROR`.

Validation: Does not expose sensitive data.

Traceability: NFR-02.

### API-02 - `GET /api/requests`

Role: `REPORTER`, `ADMINISTRATOR`, `TECHNICIAN`, `FACILITY_MANAGER`.

Query:

| Field | Required | Notes |
| --- | --- | --- |
| `role` | Yes | Simulated role context. |
| `q` | No | Search `requestNumber`, `title`, `location`, `category`. |
| `status` | No | One of 6 status values. |
| `priority` | No | `LOW`, `MEDIUM`, `HIGH`, `URGENT`. |
| `technicianId` | No | Relevant for Teknisi/Admin filters. |
| `page` | No | Default 1. |
| `pageSize` | No | Default 20. |

Success `200`: list of request summaries with `meta.empty`.

Errors: `400` invalid query, `403` invalid role.

Role validation: All roles can list, but API must shape data by role. `FACILITY_MANAGER` receives summary-safe fields only until OPEN-10 is resolved.

Traceability: FR-03, FR-04, FR-05, US-02, US-03, US-04.

### API-03 - `POST /api/requests`

Role: `REPORTER`.

Request body:

```json
{
  "role": "REPORTER",
  "title": "Proyektor tidak menyala",
  "description": "Proyektor ruang A tidak menyala sejak pagi.",
  "location": "Ruang A",
  "category": "OPEN-05 category value",
  "reporterName": "Nama Pelapor",
  "reporterType": "STUDENT"
}
```

Success `201`: created request with `status: "SUBMITTED"`, `prioritySuggestion` when applicable.

Errors: `422` missing/invalid fields, `403` non-reporter role, `409` duplicate generated request number if collision occurs.

Validation:

- API sets status to `SUBMITTED`; client cannot choose status.
- `reporterType` must be `STUDENT` or `LECTURER`.
- `prioritySuggestion` is `HIGH` for `LECTURER`, but priority final remains Administrator-owned.
- Creates initial `request_status_history` event with `from_status = null`, `to_status = SUBMITTED`, `changed_by_role = REPORTER`.

Traceability: FR-01, FR-02, FR-10, FR-18, BR-01, BR-05, BR-08, US-01.

### API-04 - `GET /api/requests/:id`

Role: all roles with visibility rules.

Query: `role` required.

Success `200`: request detail, status history, public comments, internal notes only if role allowed, confirmation summary if relevant.

Errors: `403` forbidden visibility, `404` request not found.

Role validation:

- `REPORTER`: sees request detail, status history, public comments, confirmation state; no internal notes.
- `ADMINISTRATOR`: sees detail, comments, internal notes, assignment, confirmation data.
- `TECHNICIAN`: sees detail for assigned work, comments, internal notes.
- `FACILITY_MANAGER`: Needs Human Review for detail/internal-note access via OPEN-10. Baseline returns summary-safe detail only or forbids detail depending implementation decision later; Skill 07 does not decide this.

Traceability: FR-06, FR-18, BR-09, BR-10, US-05, OPEN-10.

### API-05 - `PATCH /api/requests/:id/review`

Role: `ADMINISTRATOR`.

Request body: `{ "role": "ADMINISTRATOR", "note": "Laporan diperiksa." }`

Success `200`: updated request with `status: "UNDER_REVIEW"`.

Errors: `403`, `404`, `409 INVALID_STATUS_TRANSITION`, `422` missing note.

Workflow validation:

- Current status must be `SUBMITTED`.
- Target status is `UNDER_REVIEW`.
- Append status history.

Traceability: FR-07, FR-18, BR-02, BR-03, BR-08, US-06.

### API-06 - `PATCH /api/requests/:id/classification`

Role: `ADMINISTRATOR`.

Request body:

```json
{
  "role": "ADMINISTRATOR",
  "category": "OPEN-05 category value",
  "priority": "HIGH",
  "note": "Kategori dan prioritas ditetapkan."
}
```

Success `200`: updated category, priority, and priority suggestion context.

Errors: `403`, `404`, `422` invalid category/priority.

Validation:

- Current status must be `UNDER_REVIEW` before assignment.
- Priority must be one of `LOW`, `MEDIUM`, `HIGH`, `URGENT`.
- Category must come from final fixed list after OPEN-05 is answered.
- Does not change status by itself unless implementation combines with assignment later; this contract keeps classification separate for reviewability.

Traceability: FR-08, FR-09, FR-10, BR-04, BR-05, BR-06, BR-07, US-07, OPEN-05, OPEN-06.

### API-07 - `PATCH /api/requests/:id/assignment`

Role: `ADMINISTRATOR`.

Request body:

```json
{
  "role": "ADMINISTRATOR",
  "technicianId": "tech-uuid",
  "note": "Ditugaskan ke teknisi."
}
```

Success `200`: request status `ASSIGNED` and assignment record.

Errors: `403`, `404` request/technician not found, `409 INVALID_STATUS_TRANSITION`, `422` missing technician or note.

Workflow validation:

- Current status must be `UNDER_REVIEW`.
- Category and priority must already be present.
- Technician must be active.
- Creates `request_assignments` current record.
- Changes status to `ASSIGNED` and appends status history.

Traceability: FR-11, FR-18, BR-02, BR-03, BR-08, US-08.

### API-08 - `GET /api/technicians/:id/tasks`

Role: `TECHNICIAN`, `ADMINISTRATOR`.

Query: `role`, optional `status`, `page`, `pageSize`.

Success `200`: tasks assigned to technician, including request summary, assignment accepted state, and current status.

Errors: `403`, `404` technician not found, `422` invalid filter.

Validation:

- `TECHNICIAN` may only request own `technicianId` in simulated context.
- `ADMINISTRATOR` may inspect tasks for assignment planning.

Traceability: FR-12, FR-23, US-09, US-16.

### API-09 - `PATCH /api/requests/:id/accept`

Role: `TECHNICIAN`.

Request body: `{ "role": "TECHNICIAN", "technicianId": "tech-uuid" }`

Success `200`: assignment with `acceptedAt`.

Errors: `403`, `404`, `409` if not assigned/current, `422` missing technicianId.

Validation:

- Request must have current assignment to this technician.
- Current status remains `ASSIGNED`; acceptance is not a main status transition.
- OPEN QUESTION: OPEN-08 means rejection is not designed here.

Traceability: FR-13, US-09, OPEN-08.

### API-10 - `PATCH /api/requests/:id/progress`

Role: `TECHNICIAN`.

Request body: `{ "role": "TECHNICIAN", "technicianId": "tech-uuid", "note": "Mulai dikerjakan." }`

Success `200`: updated request with `status: "IN_PROGRESS"`.

Errors: `403`, `404`, `409 INVALID_STATUS_TRANSITION`, `422` missing note.

Workflow validation:

- Current status must be `ASSIGNED`.
- Request must be assigned to this technician.
- Changes status to `IN_PROGRESS` and appends status history.

Traceability: FR-14, FR-18, BR-02, BR-08, US-10.

### API-11 - `PATCH /api/requests/:id/resolve`

Role: `TECHNICIAN`.

Request body: `{ "role": "TECHNICIAN", "technicianId": "tech-uuid", "note": "Pekerjaan selesai." }`

Success `200`: updated request with `status: "RESOLVED"`.

Errors: `403`, `404`, `409 INVALID_STATUS_TRANSITION`, `422` missing note.

Workflow validation:

- Current status must be `IN_PROGRESS`.
- Request must be assigned to this technician.
- Changes status to `RESOLVED` and appends status history.
- Does not create a seventh waiting-confirmation status.

Traceability: FR-15, FR-18, BR-02, BR-08, US-10, OPEN-11.

### API-12 - `POST /api/requests/:id/comments`

Role: `REPORTER`, `ADMINISTRATOR`, `TECHNICIAN`.

Request body: `{ "role": "REPORTER", "body": "Komentar publik." }`

Success `201`: created public comment with `visibility: "PUBLIC"`.

Errors: `403`, `404`, `422` empty body.

Validation:

- Stores only public visibility.
- Visible to Reporter, Administrator, and Technician.

Traceability: FR-16, BR-09, US-11.

### API-13 - `POST /api/requests/:id/internal-notes`

Role: `ADMINISTRATOR`, `TECHNICIAN`.

Request body: `{ "role": "ADMINISTRATOR", "body": "Catatan internal." }`

Success `201`: created internal note with `visibility: "INTERNAL"`.

Errors: `403`, `404`, `422` empty body.

Validation:

- Reporter cannot create or read internal notes.
- Facility Manager access is not granted in baseline because OPEN-10 remains unresolved.

Traceability: FR-17, BR-10, US-12, OPEN-10.

### API-14 - `PATCH /api/requests/:id/confirm-resolution`

Role: `REPORTER`.

Request body: `{ "role": "REPORTER", "confirmationNote": "Hasil sudah diterima." }`

Success `200`: confirmation record.

Errors: `403`, `404`, `409` if status is not `RESOLVED`, `422` invalid body.

Workflow validation:

- Current status must be `RESOLVED`.
- Creates `reporter_confirmations`.
- Does not change status.

Traceability: FR-19, BR-11, US-13, OPEN-11.

### API-15 - `PATCH /api/requests/:id/close`

Role: `ADMINISTRATOR`.

Request body:

```json
{
  "role": "ADMINISTRATOR",
  "note": "Ditutup setelah konfirmasi.",
  "manualOverride": false,
  "manualOverrideNote": null
}
```

Success `200`: updated request with `status: "CLOSED"`.

Errors: `403`, `404`, `409 INVALID_STATUS_TRANSITION`, `422` missing note or override note.

Workflow validation:

- Current status must be `RESOLVED`.
- Normal close requires reporter confirmation.
- Manual override requires `manualOverride = true` and `manualOverrideNote`.
- OPEN QUESTION: OPEN-03 means valid business conditions for override are Needs Human Review; API contract only states data required if override is used.
- Changes status to `CLOSED` and appends status history.

Traceability: FR-20, FR-18, BR-02, BR-08, BR-11, US-14, OPEN-03, OPEN-11.

### API-16 - `PATCH /api/requests/:id/reopen`

Role: `ADMINISTRATOR`.

Request body: `{ "role": "ADMINISTRATOR", "note": "Dibuka kembali untuk review ulang." }`

Success `200`: updated request with `status: "UNDER_REVIEW"`.

Errors: `403`, `404`, `409 INVALID_STATUS_TRANSITION`, `422` missing note.

Workflow validation:

- Target status must be `UNDER_REVIEW`.
- Baseline role is Administrator per FR-21 and BR-12.
- OPEN QUESTION: OPEN-04 leaves whether Reporter may request reopen unresolved; this API does not add Reporter reopen authority.
- Appends status history.

Traceability: FR-21, FR-18, BR-12, BR-08, US-15, OPEN-04.

### API-17 - `GET /api/dashboard/summary`

Role: `FACILITY_MANAGER`, `ADMINISTRATOR`.

Query: `role`, optional date range.

Success `200`:

```json
{
  "data": {
    "totalRequests": 0,
    "byStatus": [],
    "byPriority": [],
    "byCategory": [],
    "technicianWorkload": [],
    "openQuestions": ["OPEN-07", "OPEN-10"]
  }
}
```

Errors: `403`, `422` invalid date range.

Validation:

- Dashboard is read-only.
- Workload uses assignment/request source data, but formula remains OPEN QUESTION: OPEN-07.
- Facility Manager detail/internal-note visibility remains OPEN QUESTION: OPEN-10.

Traceability: FR-22, FR-23, US-16, OPEN-07, OPEN-10.

## Role and Workflow Validation Rules

| Action | Allowed role | Required current status | Target status | History required |
| --- | --- | --- | --- | --- |
| Create request | REPORTER | none | SUBMITTED | Yes |
| Review | ADMINISTRATOR | SUBMITTED | UNDER_REVIEW | Yes |
| Classify | ADMINISTRATOR | UNDER_REVIEW | unchanged | No status history unless status changes. |
| Assign | ADMINISTRATOR | UNDER_REVIEW | ASSIGNED | Yes |
| Accept | TECHNICIAN | ASSIGNED | unchanged | No status history; acceptance is not a main status. |
| Progress | TECHNICIAN | ASSIGNED | IN_PROGRESS | Yes |
| Resolve | TECHNICIAN | IN_PROGRESS | RESOLVED | Yes |
| Confirm resolution | REPORTER | RESOLVED | unchanged | No status history; confirmation event stored separately. |
| Close | ADMINISTRATOR | RESOLVED | CLOSED | Yes |
| Reopen | ADMINISTRATOR | CLOSED or Needs Human Review if broader | UNDER_REVIEW | Yes |

ASSUMPTION: Reopen normally applies to `CLOSED` reports because closure is final workflow state. If Human Review allows reopen from `RESOLVED` or other states, this table must be revised before implementation.

## Dashboard Data Contract

Dashboard summary is read-only and generated from D1 tables:

| Field | Type | Source tables | Notes |
| --- | --- | --- | --- |
| `totalRequests` | number | `service_requests` | Total count under optional filter. |
| `byStatus` | array | `service_requests.status` | Counts for all 6 statuses, including zero counts for empty states. |
| `byPriority` | array | `service_requests.priority` | Counts for LOW/MEDIUM/HIGH/URGENT. |
| `byCategory` | array | `service_requests.category` | Category values depend on OPEN-05 final list. |
| `technicianWorkload` | array | `technicians`, `request_assignments`, `service_requests` | OPEN QUESTION: OPEN-07 formula unresolved. |
| `recentActivity` | array | `request_status_history` | Optional summary-safe status events; no internal note content. |

Needs Human Review:

- OPEN-07: workload formula. Candidate source data can count current assignments by active statuses, but Skill 07 does not choose final formula.
- OPEN-10: Facility Manager detail/internal-note access. Baseline dashboard excludes internal note content.

## Traceability Links

| Design ID | Covers | Requirement links |
| --- | --- | --- |
| DB-01 | Service request aggregate and controlled values. | FR-01, FR-02, FR-03, FR-04, FR-05, FR-06, FR-08, FR-09, FR-10, FR-20, BR-01, BR-02, BR-04, BR-05, BR-06, BR-07, BR-11 |
| DB-02 | Technician reference data. | FR-11, FR-12, FR-23 |
| DB-03 | Assignment data and acceptance marker. | FR-11, FR-12, FR-13, FR-14, FR-23, BR-03 |
| DB-04 | Status history audit trail. | FR-18, BR-01, BR-02, BR-08 |
| DB-05 | Public comments. | FR-16, BR-09 |
| DB-06 | Internal notes. | FR-17, BR-10 |
| DB-07 | Reporter confirmation. | FR-19, FR-20, BR-11 |
| API-01 sampai API-17 | API contract-first endpoints for all required workflows. | FR-01 sampai FR-24, NFR-02, NFR-03, BR-01 sampai BR-12, US-01 sampai US-17 |

## Full Requirements Coverage Matrix

Bagian ini menuliskan cakupan eksplisit agar reviewer dapat mencocokkan setiap FR, NFR, BR, dan US tanpa bergantung pada rentang ID agregat.

### Functional Requirement Coverage

| Requirement | Covered by table/design | Covered by endpoint | Notes |
| --- | --- | --- | --- |
| FR-01 | DB-01, DB-04 | API-03 | Create request and initial status history. |
| FR-02 | DB-01 | API-03 | `reporter_name` and `reporter_type`; OPEN-02 preserved for extra fields. |
| FR-03 | DB-01 | API-02 | Request list source and list contract. |
| FR-04 | DB-01 | API-02 | Search over request summary fields. |
| FR-05 | DB-01 | API-02 | Status and priority filters. |
| FR-06 | DB-01, DB-04, DB-05, DB-06, DB-07 | API-04 | Detail includes history, comments, notes by visibility, and confirmation summary. |
| FR-07 | DB-01, DB-04 | API-05 | Review transition from `SUBMITTED` to `UNDER_REVIEW`. |
| FR-08 | DB-01 | API-06 | Category controlled vocabulary; OPEN-05 preserved. |
| FR-09 | DB-01 | API-06 | Priority controlled values; OPEN-06 preserved. |
| FR-10 | DB-01 | API-03, API-06 | Lecturer HIGH suggestion without replacing Administrator final decision. |
| FR-11 | DB-02, DB-03, DB-04 | API-07 | Assignment and status transition to `ASSIGNED`. |
| FR-12 | DB-02, DB-03 | API-08 | Technician assigned task list. |
| FR-13 | DB-03 | API-09 | Acceptance timestamp; OPEN-08 preserved for rejection. |
| FR-14 | DB-03, DB-04 | API-10 | Progress transition to `IN_PROGRESS`. |
| FR-15 | DB-03, DB-04 | API-11 | Resolve transition to `RESOLVED`. |
| FR-16 | DB-05 | API-12 | Public comments. |
| FR-17 | DB-06 | API-13 | Internal notes. |
| FR-18 | DB-04 | API-03, API-05, API-07, API-10, API-11, API-15, API-16 | Every status-changing endpoint appends status history. |
| FR-19 | DB-07 | API-14 | Reporter confirmation event. |
| FR-20 | DB-01, DB-04, DB-07 | API-15 | Close after confirmation or manual override note; OPEN-03 and OPEN-11 preserved. |
| FR-21 | DB-04 | API-16 | Reopen target `UNDER_REVIEW`; OPEN-04 preserved. |
| FR-22 | DB-01, DB-02, DB-03, DB-04 | API-17 | Dashboard summary. |
| FR-23 | DB-02, DB-03 | API-08, API-17 | Technician workload source data; OPEN-07 preserved. |
| FR-24 | API role validation convention | API-02 sampai API-17 | Role-Based UI remains frontend concern; API validates role/action separately. |

### Non-Functional Requirement Coverage

| Requirement | Covered by table/design | Covered by endpoint | Notes |
| --- | --- | --- | --- |
| NFR-01 | API response conventions and camelCase contract | API-02 sampai API-17 | Supports React data states without designing UI. |
| NFR-02 | Cloudflare Workers API boundary | API-01 sampai API-17 | Worker endpoint contract. |
| NFR-03 | DB-01 sampai DB-07 | API handlers use D1 binding `DB` by design | Cloudflare D1 SQLite storage. |
| NFR-04 | D1-only design; no paid storage tables | API contract avoids paid services | Cloudflare free-tier compatibility. |
| NFR-05 | Branch/PR workflow captured in traceability and evidence | Not an endpoint concern | GitHub workflow is process-level, not data schema. |
| NFR-06 | Contract-first validation and error responses | API-01 sampai API-17 | Supports future automated API tests without writing tests in Skill 07. |
| NFR-07 | Traceability links and coverage matrix | All API IDs and DB IDs | Requirement-to-design traceability updated. |
| NFR-08 | Human review checklist and evidence file | Not an endpoint concern | Human review evidence is prepared separately. |
| NFR-09 | No secret-bearing schema/config changes | API contract exposes no secret data | Secret safety preserved. |

### Business Rule Coverage

| Business Rule | Covered by table/design | Covered by endpoint | Notes |
| --- | --- | --- | --- |
| BR-01 | DB-01, DB-04 | API-03 | New request starts `SUBMITTED`. |
| BR-02 | DB-01, DB-04 controlled status | API-03, API-05, API-07, API-10, API-11, API-15, API-16 | Strict 6 statuses only. |
| BR-03 | DB-03 assignment depends on reviewed request | API-05, API-07 | Review before assignment. |
| BR-04 | DB-01 priority final value | API-06 | Administrator owns final priority. |
| BR-05 | DB-01 `priority_suggestion` | API-03, API-06 | Lecturer HIGH suggestion only. |
| BR-06 | DB-01 category | API-06 | Controlled category vocabulary; OPEN-05 preserved. |
| BR-07 | DB-01 priority check | API-02, API-06 | LOW/MEDIUM/HIGH/URGENT. |
| BR-08 | DB-04 status history fields | Status-changing APIs | `from_status`, `to_status`, `changed_by_role`, timestamp, and note. |
| BR-09 | DB-05 public visibility | API-04, API-12 | Public comments visible to Reporter, Administrator, Technician. |
| BR-10 | DB-06 internal visibility | API-04, API-13 | Internal notes only Administrator and Technician; OPEN-10 preserved for Facility Manager. |
| BR-11 | DB-01 override fields, DB-07 confirmation | API-14, API-15 | Confirmation before close or manual override note. |
| BR-12 | DB-04 status transition record | API-16 | Reopen target `UNDER_REVIEW`. |

### User Story Coverage

| User Story | Covered by table/design | Covered by endpoint | Notes |
| --- | --- | --- | --- |
| US-01 | DB-01, DB-04 | API-03 | Create request, reporter fields, initial status. |
| US-02 | DB-01 | API-02 | List and empty state metadata. |
| US-03 | DB-01 | API-02 | Search and empty result metadata. |
| US-04 | DB-01 | API-02 | Status/priority combined filters. |
| US-05 | DB-01, DB-04, DB-05, DB-06 | API-04 | Detail, status history, visible comments. |
| US-06 | DB-01, DB-04 | API-05 | Administrator review and forbidden non-admin action. |
| US-07 | DB-01 | API-06 | Category, priority, Lecturer suggestion. |
| US-08 | DB-02, DB-03, DB-04 | API-07 | Assignment and transition to `ASSIGNED`. |
| US-09 | DB-02, DB-03 | API-08, API-09 | View and accept assigned tasks. |
| US-10 | DB-03, DB-04 | API-10, API-11 | Progress/resolved transitions and status history. |
| US-11 | DB-05 | API-12 | Public comment storage and visibility. |
| US-12 | DB-06 | API-13 | Internal note storage and visibility. |
| US-13 | DB-07 | API-14 | Reporter confirmation. |
| US-14 | DB-01, DB-04, DB-07 | API-15 | Close after confirmation or override note. |
| US-15 | DB-04 | API-16 | Reopen and status history. |
| US-16 | DB-01, DB-02, DB-03, DB-04 | API-17 | Dashboard summary and workload source data. |
| US-17 | Role validation convention | API-02 sampai API-17 | API validates role/action while UI controls visible actions. |

## Risks, Assumptions, and Open Questions

| ID | Type | Description | Database/API impact |
| --- | --- | --- | --- |
| ASSUMPTION-07-01 | ASSUMPTION | Role context is simulated because full authentication is not in final requirements. | API validates role/action but does not provide production identity assurance. |
| ASSUMPTION-07-02 | ASSUMPTION | Reopen normally starts from `CLOSED` and returns to `UNDER_REVIEW`. | API-16 should be reviewed if Human Review allows other source statuses. |
| OPEN-02 | OPEN QUESTION | Extra reporter identity beyond `reporter_name` and `reporter_type`. | `service_requests` should not require extra reporter fields yet. |
| OPEN-03 | OPEN QUESTION | Valid manual override conditions. | API-15 requires override note but does not decide valid conditions. |
| OPEN-04 | OPEN QUESTION | Whether Reporter can request reopen. | API-16 remains Administrator action only under current baseline. |
| OPEN-05 | OPEN QUESTION | Final category fixed list. | DB/API define controlled vocabulary behavior but not final values. |
| OPEN-06 | OPEN QUESTION | Priority criteria. | DB/API enforce values but do not invent criteria. |
| OPEN-07 | OPEN QUESTION | Workload formula. | Dashboard returns source-ready workload data; final formula Needs Human Review. |
| OPEN-08 | OPEN QUESTION | Whether Technician can reject tasks. | API-09 supports accept only; no rejection contract added. |
| OPEN-10 | OPEN QUESTION | Facility Manager detail/internal-note access. | Baseline dashboard excludes internal notes and detail access is Needs Human Review. |
| OPEN-11 | OPEN QUESTION | Non-status confirmation marker. | Design stores confirmation event without adding seventh status. |

## Quality Check

| Check | Result |
| --- | --- |
| Review status and source summary are present. | PASS |
| Required inputs were read, including Skill 06, approved architecture, D1 migration, and Worker file. | PASS |
| Cloudflare D1, SQLite, Cloudflare Workers, and binding `DB` are mentioned. | PASS |
| Main tables for requests, technicians, assignments, status history, public comments, internal notes, and reporter confirmation are specified. | PASS |
| Each table has purpose, columns, type, key/constraint/index notes, and traceability. | PASS |
| Relationships and cardinality are documented. | PASS |
| Controlled vocabularies cover status, role, priority, reporter_type, comment visibility, and category. | PASS |
| Category final list is not invented; OPEN-05 is preserved. | PASS |
| Six status workflow values are preserved without new main status. | PASS |
| Contract-first API approach is documented. | PASS |
| Endpoints cover health, create, list, search, filter, detail, review, classification, assignment, task list, accept, progress, resolve, comment, internal note, confirm, close, reopen, and dashboard. | PASS |
| Role-based API validation is explicit and separate from Role-Based UI. | PASS |
| Invalid status transition error contract is documented. | PASS |
| Every status-changing endpoint states status history requirement. | PASS |
| Manual override, reopen, category, priority, workload, Facility Manager access, and confirmation marker remain open where required. | PASS |
| No implementation code, migration production SQL, UI, test, or deployment work is included. | PASS |

## Human Review Checklist

- [ ] Database/API design follows `instruksi-dosen.md`, `CASE.md`, final requirements, and approved Skill 06 architecture.
- [ ] No new requirement, feature, status, actor, or scope is added.
- [ ] Tables and relationships are sufficient for mandatory workflow.
- [ ] Table design is realistic for Cloudflare D1 SQLite.
- [ ] Endpoint contracts are realistic for Cloudflare Workers.
- [ ] Each endpoint has input, output, error, role, status code, validation, and traceability.
- [ ] Role-Based API Validation is clear and not replaced by Role-Based UI.
- [ ] Strict 6 status workflow is preserved.
- [ ] Every status transition creates Riwayat Status.
- [ ] Komentar Publik and Catatan Internal visibility is correct.
- [ ] Manual override, reopen, category, priority, workload dashboard, Facility Manager access, and confirmation marker are marked as open question where unresolved.
- [ ] Error responses support accessible UI feedback for Skill 08.
- [ ] Traceability to FR, US, AC, BR, and NFR is sufficient.
- [ ] Document remains design-only and does not create migration, code, UI, test, or deployment work.
