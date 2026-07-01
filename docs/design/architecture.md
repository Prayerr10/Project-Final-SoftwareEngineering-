# Architecture Design

| Review Status | Human Reviewed & Approved |
| --- | --- |
| Skill AI | Skill 06 - Architecture Design (`06-architecture-design`) |
| Human decision | Disetujui |

## Source Summary

Dokumen ini adalah output Skill 06. Isinya menggunakan baseline requirements yang sudah Human Reviewed & Approved dari Skill 01 sampai Skill 05, tanpa mengubah requirement final, user story, acceptance criteria, business rule, prioritas, atau change request.

| Source ID | Source | Usage |
| --- | --- | --- |
| ARCH-SRC-01 | `instruksi-dosen.md` | Instruksi utama, work product fase design, template traceability, template PR, template Human Review, batas teknologi React/Cloudflare Workers/D1/Cloudflare. |
| ARCH-SRC-02 | `CASE.md` | Studi kasus, aktor, fitur wajib, fitur tidak wajib, alur status, dan batasan teknis. |
| ARCH-SRC-03 | `CONTEXT.md` | Ubiquitous language: Pelapor, Administrator, Teknisi, Manajer Fasilitas, Riwayat Status, Komentar Publik, Catatan Internal, Simulasi Role, Role-Based UI, dan Role-Based API Validation. |
| ARCH-SRC-04 | `docs/requirements/inception.md` | Scope, stakeholder, keputusan awal, constraint, assumption, dan open question. |
| ARCH-SRC-05 | `docs/requirements/elicitation.md` | Register pertanyaan stakeholder dan open question yang masih perlu dibawa ke design. |
| ARCH-SRC-06 | `docs/requirements/requirements.md` | FR-01 sampai FR-24, NFR-01 sampai NFR-09, BR-01 sampai BR-12. |
| ARCH-SRC-07 | `docs/requirements/user-stories.md` | US-01 sampai US-17 dan acceptance criteria terkait. |
| ARCH-SRC-08 | `docs/requirements/prioritization.md` | Prioritas Must/Should/Could dan dependency requirement. |
| ARCH-SRC-09 | `docs/requirements/validation.md` | Validasi Skill 05, ambiguity, incompleteness, dan open question utama untuk design. |
| ARCH-SRC-10 | `docs/requirements/change-request.md` | CR-05-01 tentang marker non-status untuk konfirmasi Pelapor; statusnya `NEEDS CLARIFICATION`, bukan requirement final baru. |
| ARCH-SRC-11 | `docs/requirements/traceability.md` | Traceability baseline yang diperbarui dengan referensi Skill 06. |
| ARCH-SRC-12 | `docs/requirements/grill-session-summary.md` | Ground truth keputusan domain: strict 6 statuses, role simulator, master-detail view, komentar/catatan, dashboard beban Teknisi. |
| ARCH-SRC-13 | `evidence/human-review-inception.md` sampai `evidence/human-review-validation.md` | Bukti Skill 01 sampai Skill 05 sudah Disetujui. |
| ARCH-SRC-14 | `wrangler.jsonc` | Worker entrypoint, D1 binding `DB`, assets SPA handling, observability, compatibility date, dan Cloudflare deployment configuration. |
| ARCH-SRC-15 | `package.json` | Stack project: React, Vite, Cloudflare Vite plugin, Wrangler, TypeScript, Vitest, ESLint. |

## Architecture Goals

1. Mendukung seluruh fitur wajib dari FR-01 sampai FR-24 pada level arsitektur tanpa menambah scope baru.
2. Memisahkan frontend React, backend/API Cloudflare Workers, database Cloudflare D1, dan deployment Cloudflare agar Skill 07 dan Skill 08 dapat melanjutkan desain tanpa menebak boundary.
3. Menjaga strict 6 status workflow: `SUBMITTED`, `UNDER_REVIEW`, `ASSIGNED`, `IN_PROGRESS`, `RESOLVED`, dan `CLOSED`.
4. Memastikan Role-Based UI tidak menggantikan Role-Based API Validation.
5. Menjaga traceability dari FR/NFR/BR/US ke keputusan arsitektur.
6. Menyediakan tempat untuk component-driven frontend, accessibility-first UI, dan open design compatible references tanpa memaksa dependency implementasi.

## Context and Constraints

| Constraint | Architecture impact | Traceability |
| --- | --- | --- |
| Frontend menggunakan React di `src/`. | UI aplikasi dibangun sebagai Single Page App dengan komponen reusable dan role simulator. | NFR-01, FR-24, US-17 |
| Backend/API menggunakan Cloudflare Workers di `worker/`. | Semua command penting harus melewati API Worker, termasuk role/action validation dan workflow validation. | NFR-02, FR-07, FR-11, FR-14, FR-15, FR-19, FR-20, FR-21 |
| Database menggunakan Cloudflare D1 dan migration di `database/migrations/`. | D1 menjadi storage utama untuk laporan, assignment, komentar/catatan, status history, dan data pendukung. Detail skema diserahkan ke Skill 07. | NFR-03, FR-01, FR-18 |
| Deployment menggunakan Cloudflare dan Wrangler. | Build Vite dan Worker deploy memakai konfigurasi `wrangler.jsonc`, termasuk D1 binding `DB`. | NFR-04, NFR-05, NFR-09 |
| Automated testing dan CI adalah requirement project, tetapi bukan output implementasi Skill 06. | Arsitektur harus memisahkan layer, command/query, dan validation boundary agar test otomatis dan GitHub Actions pada fase berikutnya dapat memeriksa behavior tanpa merombak desain. | NFR-06 |
| Traceability dan Human Review wajib dijaga. | Setiap keputusan arsitektur penting harus punya link ke FR/NFR/BR/US dan evidence Human Review Skill 06 harus tersedia sebelum lanjut Skill 07. | NFR-07, NFR-08 |
| Fitur out of scope tidak menjadi bagian arsitektur wajib. | Tidak ada upload foto, email notification, login Google, QR code ruangan, AI kategori, inventory spare part, atau vendor management. | CASE.md, Skill 05 validation |
| Requirements final tidak boleh diubah. | Open question dibawa sebagai risiko atau `Needs Human Review`, bukan diselesaikan sepihak. | NFR-08, OPEN-02 sampai OPEN-11 |

## Layer Overview

| Layer | Main location | Responsibility | Not responsible for |
| --- | --- | --- | --- |
| Frontend React | `src/` | Role simulator, master-detail experience, request form, list/search/filter controls, detail view, role-based action visibility, accessible form and feedback states, dashboard presentation. | Final authorization, trusted workflow transition, trusted data filtering, database access, API contract detail. |
| Backend/API Worker | `worker/` | API routing, request validation, role/action validation, workflow transition validation, command/query separation, error response shape, D1 access, response shaping for visible data. | React rendering, visual layout, database schema design details, final endpoint list in this document. |
| Database D1 | `database/migrations/` and Cloudflare D1 binding `DB` | Persistent data ownership for service requests, reporter identity, technician assignment, public comments, internal notes, status history, dashboard source data. | UI behavior, API routing, deployment secrets, detailed table/SQL design in Skill 06. |
| Deployment layer | `wrangler.jsonc`, Vite/Cloudflare plugin, GitHub workflow later | Local/production build boundary, Worker entrypoint, SPA asset handling, D1 binding, Cloudflare free-tier compatibility, secret safety. | Feature requirement decisions, database schema details, UI wireframes, production deployment execution in Skill 06. |

## Component Responsibility Table

| Architecture component | Responsibility | Related requirements |
| --- | --- | --- |
| Role Simulator Shell | Holds selected role for UI rendering and sends active role context to API requests for validation in the no-full-auth baseline. | FR-24, US-17, NFR-01 |
| Request Creation Surface | Captures report data and reporter identity, then submits through Worker API. | FR-01, FR-02, BR-01, US-01 |
| Request List Query Surface | Displays list, empty state, debounced search input, and combined status/priority filters. | FR-03, FR-04, FR-05, US-02, US-03, US-04 |
| Request Detail Surface | Presents selected request, status history, visible comments, visible actions, and role-appropriate feedback. | FR-06, FR-18, US-05 |
| Workflow Action Surface | Exposes review, category/priority, assignment, progress, resolve, confirmation, close, and reopen actions based on selected role and current status. | FR-07 sampai FR-15, FR-19 sampai FR-21, BR-02, BR-03, BR-11, BR-12 |
| Comment and Note Surface | Separates Komentar Publik from Catatan Internal and reflects visibility boundaries. | FR-16, FR-17, BR-09, BR-10, US-11, US-12 |
| Dashboard Surface | Presents operational summary and technician workload from API query results. | FR-22, FR-23, US-16 |
| Worker Query Handlers | Return role-aware lists, detail data, status history, visible comments/notes, and dashboard summaries. | FR-03 sampai FR-06, FR-12, FR-22, FR-23 |
| Worker Command Handlers | Validate and apply state-changing actions, then write data and status history through D1. | FR-01, FR-07 sampai FR-21, BR-01 sampai BR-12 |
| D1 Data Store | Persists request lifecycle data and provides queryable source for lists/detail/dashboard. | NFR-03, FR-01, FR-18, FR-22, FR-23 |

## Main Data Flow

### Pelapor Creates Service Request

1. Pelapor selects role in the React role simulator.
2. Frontend collects required report fields and approved reporter fields `reporter_name` and `reporter_type`.
3. Frontend submits a create command to the Worker API.
4. Worker validates required input, role permission, controlled values available at this design level, and initial status rule.
5. Worker writes the new request in D1 with status `SUBMITTED`.
6. Worker records initial Riwayat Status according to BR-08.
7. Frontend refreshes list/detail state from query API.

Traceability: FR-01, FR-02, FR-18, BR-01, BR-08, US-01.

### All Actors View, Search, Filter, and Open Detail

1. React list surface sends query parameters for keyword, status, priority, and role context.
2. Worker query handler validates supported filters and applies role-aware data visibility.
3. D1 returns request summary data needed for list rendering.
4. React detail surface requests detail data for the selected report.
5. Worker returns report detail, status history, Komentar Publik, and only data visible to the active role.

Traceability: FR-03, FR-04, FR-05, FR-06, FR-18, BR-09, BR-10, US-02 sampai US-05.

### Administrator Reviews, Categorizes, Prioritizes, Assigns, Closes, and Reopens

1. Administrator opens a `SUBMITTED` or relevant detail record.
2. Frontend shows Administrator actions only when role and status allow the action.
3. Worker validates Administrator role before accepting review, category, priority, assignment, close, or reopen commands.
4. Worker validates workflow rule such as review before assignment and strict status transitions.
5. Worker writes request changes and appends Riwayat Status when status changes.
6. Worker returns updated request state for frontend refresh.

Traceability: FR-07, FR-08, FR-09, FR-10, FR-11, FR-18, FR-20, FR-21, BR-02 sampai BR-08, BR-11, BR-12, US-06, US-07, US-08, US-14, US-15.

### Teknisi Views Tasks, Accepts, Updates Progress, and Marks Resolved

1. Teknisi role opens assigned task list.
2. Worker returns tasks assigned to the selected Teknisi context.
3. Teknisi sends accept/progress/resolve commands through Worker API.
4. Worker validates Teknisi authorization, assignment relationship, and current status.
5. Worker changes status to `IN_PROGRESS` or `RESOLVED` only through allowed workflow transitions and records Riwayat Status.

Traceability: FR-12, FR-13, FR-14, FR-15, FR-18, BR-02, BR-08, US-09, US-10.

### Pelapor Confirms Resolved Work

1. Pelapor opens a report in `RESOLVED`.
2. Frontend shows confirmation action only for Pelapor when the report is eligible.
3. Worker validates Pelapor role and request state.
4. Worker records confirmation data needed by Administrator closure.
5. Administrator later closes the report after confirmation or manual override.

Traceability: FR-19, FR-20, BR-11, US-13, US-14.

OPEN QUESTION: OPEN-11 and CR-05-01 leave the exact representation of "waiting for confirmation" unresolved. Skill 06 treats it as an architecture risk and must not create a seventh status.

### Manajer Fasilitas Views Operational Dashboard

1. Manajer Fasilitas role opens dashboard surface.
2. Frontend requests operational summary from Worker query handler.
3. Worker queries D1 for aggregate report counts and technician workload source data.
4. Frontend renders dashboard presentation using accessible, component-driven dashboard components.

Traceability: FR-22, FR-23, US-16.

OPEN QUESTION: OPEN-07 leaves technician workload formula undefined. OPEN-10 leaves Manajer Fasilitas detail/internal-note access boundary incomplete.

## Status Workflow Architecture

Strict status list from BR-02:

```text
SUBMITTED -> UNDER_REVIEW -> ASSIGNED -> IN_PROGRESS -> RESOLVED -> CLOSED
```

| Transition | Primary actor | API validation responsibility | History requirement | Traceability |
| --- | --- | --- | --- | --- |
| Create request -> `SUBMITTED` | Pelapor | Worker sets initial status; frontend cannot choose initial status. | Record initial status event. | FR-01, BR-01, BR-08 |
| `SUBMITTED` -> `UNDER_REVIEW` | Administrator | Worker validates Administrator role and current status. | Record from/to, role, timestamp, note. | FR-07, BR-02, BR-03, BR-08 |
| `UNDER_REVIEW` -> `ASSIGNED` | Administrator | Worker validates review completed, category/priority/technician assignment requirements at API level. | Record assignment transition. | FR-08, FR-09, FR-11, BR-03, BR-08 |
| `ASSIGNED` -> `IN_PROGRESS` | Teknisi | Worker validates assigned Teknisi context and action permission. | Record progress transition. | FR-12, FR-13, FR-14, BR-02, BR-08 |
| `IN_PROGRESS` -> `RESOLVED` | Teknisi | Worker validates assigned Teknisi context and completion action. | Record resolved transition. | FR-15, BR-02, BR-08 |
| `RESOLVED` -> `CLOSED` | Administrator | Worker validates Administrator role and BR-11: Pelapor confirmation exists or manual override note exists. | Record closure transition. | FR-19, FR-20, BR-11, BR-08 |
| Reopen -> `UNDER_REVIEW` | Administrator | Worker validates Administrator role and allowed reopen target status. | Record reopen transition. | FR-21, BR-12, BR-08 |

Needs Human Review: Whether any non-status marker from CR-05-01 should be accepted for confirmation tracking remains unresolved. The architecture leaves room for a non-status field or event, but does not approve it.

## Role and Authorization Boundary

| Actor | Frontend Role-Based UI | Backend/API Role-Based Validation | Data visibility |
| --- | --- | --- | --- |
| Pelapor | Can see create form, report status/detail, public comments, confirmation action when eligible. | Worker validates create, public comment, and confirmation commands. | Cannot see Catatan Internal. |
| Administrator | Can see review, category, priority, assignment, close, reopen, public comment, internal note actions. | Worker validates all Administrator-only commands and workflow transitions. | Can see Komentar Publik and Catatan Internal. |
| Teknisi | Can see assigned tasks, accept/progress/resolve actions, public comment, internal note actions. | Worker validates assignment relationship and Teknisi-only actions. | Can see Komentar Publik and Catatan Internal for relevant work. |
| Manajer Fasilitas | Can see dashboard and report summary. | Worker validates dashboard/read query access. | OPEN QUESTION: detail access and Catatan Internal visibility require Human Review via OPEN-10. |

ASSUMPTION: Because full authentication is not in the approved scope, role context is simulated in the UI and passed to API for validation. This follows the approved Simulasi Role decision, but it is not equivalent to production-grade identity verification.

## Deployment Architecture

| Area | Design |
| --- | --- |
| Local development | Vite dev server serves React assets and Cloudflare Worker integration according to project scripts. |
| Build | `npm run build` runs TypeScript build and Vite build from `package.json`. |
| Worker entrypoint | `wrangler.jsonc` uses `worker/index.ts` as Worker main file. |
| SPA handling | `wrangler.jsonc` configures assets with `not_found_handling: single-page-application`. |
| Database binding | D1 binding name is `DB`, database name is `campus-maintenance-db`. Worker architecture must access D1 only through this binding. |
| Deployment | `npm run deploy` builds then runs `wrangler deploy`, but Skill 06 does not execute deployment. |
| Observability | `wrangler.jsonc` enables observability. Architecture can rely on platform logs for operational troubleshooting later, without designing custom logging here. |
| Secret safety | No tokens/passwords should be stored in tracked files. Future secrets must use Cloudflare secrets, not repository files. |

Traceability: NFR-02, NFR-03, NFR-04, NFR-05, NFR-09.

## Architecture Decisions

| Decision ID | Decision | Rationale | Traceability |
| --- | --- | --- | --- |
| ARCH-01 | Use React SPA in `src/` with role simulator and master-detail application shell. | Matches approved role simulator and master-detail decision while staying within React constraint. | FR-03, FR-06, FR-24, NFR-01, US-17 |
| ARCH-02 | Put all trusted workflow and role/action validation in Cloudflare Worker, not only in frontend conditional rendering. | Prevents Role-Based UI from becoming the only access boundary. | FR-07, FR-11, FR-14, FR-15, FR-19, FR-20, FR-21, FR-24, BR-02, BR-03, BR-11, BR-12, NFR-02 |
| ARCH-03 | Treat D1 as the single persistent data store for reports, assignments, comments/notes, status history, and dashboard source data. | Meets D1 requirement and avoids paid/out-of-scope storage services. | FR-01, FR-16, FR-17, FR-18, FR-22, FR-23, NFR-03, NFR-04 |
| ARCH-04 | Separate query responsibilities from command responsibilities at the API design level. | Skill 07 can define contracts cleanly for list/detail/dashboard reads versus workflow-changing commands and future tests can verify reads separately from state-changing commands. | FR-03 sampai FR-06, FR-07 sampai FR-21, NFR-06 |
| ARCH-05 | Preserve strict 6 statuses and model unresolved confirmation detail only as `Needs Human Review`, not a seventh status. | Protects BR-02 and CR-05-01 conditions. | BR-02, BR-11, FR-19, FR-20, CR-05-01 |
| ARCH-06 | Use append-only Riwayat Status for every status transition. | Supports auditability and required history fields. | FR-18, BR-08, US-05, US-10 |
| ARCH-07 | Keep Komentar Publik and Catatan Internal as separate visibility concepts. | Supports approved public/internal communication boundary. | FR-16, FR-17, BR-09, BR-10, US-11, US-12 |
| ARCH-08 | Keep dashboard as read-only summary surface at architecture level. | Manajer Fasilitas actions beyond dashboard/ringkasan are unresolved. | FR-22, FR-23, OPEN-10 |
| ARCH-09 | Apply component-driven frontend design without final wireframes or design tokens. | Prepares Skill 08 while respecting Skill 06 boundary. | FR-24, NFR-01 |
| ARCH-10 | Apply accessibility-first constraints at architecture level. | Ensures Skill 08 has explicit accessibility input for forms, status feedback, filters, detail panel, and dashboard. | NFR-01, US-01 sampai US-17 |
| ARCH-11 | Stay open design compatible without adding UI dependencies in Skill 06. | Allows later reference to OpenUI, Radix UI, shadcn/ui, or Figma Community patterns without premature implementation decisions. | NFR-01, FR-24 |
| ARCH-12 | Use Cloudflare/Wrangler deployment boundary from `wrangler.jsonc`. | Keeps Worker entrypoint, SPA asset handling, D1 binding, free-tier compatibility, and secret safety visible before implementation/deployment phases. | NFR-02, NFR-03, NFR-04, NFR-05, NFR-09 |
| ARCH-13 | Treat traceability and Human Review as architecture quality gates. | Skill 06 must update traceability and remain pending until Human Review approves before Skill 07 starts. | NFR-07, NFR-08 |
| ARCH-14 | Keep Administrator as owner of category and priority decisions while Worker validates controlled values. | Supports Administrator final decision authority, Lecturer HIGH suggestion, fixed category vocabulary, and priority value constraints without deciding unresolved category list or priority criteria. | FR-08, FR-09, FR-10, BR-04, BR-05, BR-06, BR-07, OPEN-05, OPEN-06 |

## Traceability Links

| Design ID | Covers | Requirement links |
| --- | --- | --- |
| ARCH-01 | Frontend React application shell, role simulator, master-detail structure. | FR-03, FR-06, FR-24, NFR-01, US-02, US-05, US-17 |
| ARCH-02 | Backend/API boundary and validation responsibility. | FR-07, FR-11, FR-14, FR-15, FR-19, FR-20, FR-21, FR-24, NFR-02, BR-02, BR-03, BR-11, BR-12 |
| ARCH-03 | D1 persistence boundary. | FR-01, FR-02, FR-16, FR-17, FR-18, FR-22, FR-23, NFR-03 |
| ARCH-04 | Query/command split for future API design and testable API behavior. | FR-03 sampai FR-23, NFR-06 |
| ARCH-05 | Strict workflow status architecture. | BR-01, BR-02, BR-03, BR-11, BR-12, US-01, US-06, US-08, US-10, US-13, US-14, US-15 |
| ARCH-06 | Status history architecture. | FR-18, BR-08, US-05, US-10 |
| ARCH-07 | Public comment and internal note boundary. | FR-16, FR-17, BR-09, BR-10, US-11, US-12 |
| ARCH-08 | Dashboard and workload summary boundary. | FR-22, FR-23, US-16 |
| ARCH-09 | Component-driven frontend constraint. | FR-24, NFR-01 |
| ARCH-10 | Accessibility-first frontend constraint. | NFR-01, US-01 sampai US-17 |
| ARCH-11 | Open design compatible constraint. | FR-24, NFR-01 |
| ARCH-12 | Cloudflare deployment architecture. | NFR-02, NFR-03, NFR-04, NFR-05, NFR-09 |
| ARCH-13 | Traceability and Human Review quality gate. | NFR-07, NFR-08 |
| ARCH-14 | Category, priority, and Lecturer priority suggestion decision boundary. | FR-08, FR-09, FR-10, BR-04, BR-05, BR-06, BR-07, OPEN-05, OPEN-06 |

## Risks, Assumptions, and Open Questions

| ID | Type | Description | Architecture impact |
| --- | --- | --- | --- |
| RISK-01 | Risk | Cloudflare free tier must remain sufficient for Workers, D1, and deployment. | Avoid paid dependencies and out-of-scope storage services. |
| RISK-02 | Risk | D1 binding mismatch would break API/database integration. | Worker architecture must rely on `DB` binding from `wrangler.jsonc`. |
| RISK-03 | Risk | Role simulator can be mistaken for real authentication. | Document as simulated role context; Worker still validates role/action, but this is not full identity security. |
| RISK-04 | Risk | Manual override behavior is incomplete. | Close workflow must stay review-sensitive until OPEN-03 is resolved. |
| RISK-05 | Risk | Waiting confirmation representation could become an accidental seventh status. | Keep strict 6 statuses; CR-05-01 is `NEEDS CLARIFICATION`. |
| ASSUMPTION-01 | ASSUMPTION | Role context is selected in UI for the project baseline because full authentication is not required. | API validation checks role/action but does not provide real user identity assurance. |
| ASSUMPTION-02 | ASSUMPTION | Dashboard can be built from D1 report and assignment data without separate analytics storage. | Supports Cloudflare free-tier constraint and Skill 07 later designs query shape. |
| OPEN-02 | OPEN QUESTION | Extra reporter identity beyond `reporter_name` and `reporter_type` is undefined. | Skill 07 must not require extra identity fields unless approved. |
| OPEN-03 | OPEN QUESTION | Valid manual override conditions are undefined. | Worker closure validation needs review-ready logic later, not invented policy in Skill 06. |
| OPEN-04 | OPEN QUESTION | Reopen initiation is unclear. | Architecture keeps Administrator as the actor that performs reopen per current FR/BR, while trigger details need Human Review. |
| OPEN-05 | OPEN QUESTION | Final fixed category list is undefined. | Architecture supports controlled vocabulary but does not define final values. |
| OPEN-06 | OPEN QUESTION | Priority criteria are undefined. | Architecture supports controlled priority values and Lecturer HIGH suggestion, but not detailed policy. |
| OPEN-07 | OPEN QUESTION | Technician workload formula is undefined. | Dashboard architecture reserves workload summary but does not define formula. |
| OPEN-08 | OPEN QUESTION | Technician rejection/reassignment behavior is unresolved. | Architecture supports accept task; rejection/reassignment must not be added without approved requirement change. |
| OPEN-10 | OPEN QUESTION | Manajer Fasilitas detail and Catatan Internal access boundary is incomplete. | Architecture treats dashboard/ringkasan as safe baseline and marks detail/internal-note access as Needs Human Review. |
| OPEN-11 | OPEN QUESTION | Confirmation marker without seventh status is unresolved. | Architecture reserves room for non-status representation only if later approved. |

## Quality Check

| Check | Result |
| --- | --- |
| Review status and source summary are present. | PASS |
| Required inputs were read, including `CONTEXT.md`, `wrangler.jsonc`, and `package.json`. | PASS |
| Frontend, backend/API, database, and deployment layers are covered. | PASS |
| Frontend layer mentions React and `src/`. | PASS |
| Backend/API layer mentions Cloudflare Workers and `worker/`. | PASS |
| Database layer mentions Cloudflare D1 and `database/migrations/`. | PASS |
| Deployment layer mentions Wrangler/Cloudflare and `wrangler.jsonc`. | PASS |
| Four actors are covered. | PASS |
| Six statuses are covered without adding another main status. | PASS |
| Mandatory features have architecture-level place. | PASS |
| Role-Based UI is separated from Role-Based API Validation. | PASS |
| Riwayat Status, Komentar Publik, Catatan Internal, dashboard, search, filter, and detail view have architecture placement. | PASS |
| Architecture decisions cite FR/NFR/BR/US where relevant. | PASS |
| Open questions are not answered with new invented decisions. | PASS |
| Component-driven, accessibility-first, and open design compatible constraints are included. | PASS |
| No SQL schema detail, endpoint list detail, wireframe, code, test, or deployment execution is included. | PASS |

## Human Review Checklist

- [ ] Arsitektur mengikuti `instruksi-dosen.md`, `CASE.md`, dan requirements final.
- [ ] Tidak ada requirement, fitur, status, aktor, atau scope baru.
- [ ] Pembagian frontend, backend/API, database, dan deployment layer masuk akal untuk React, Cloudflare Workers, dan D1.
- [ ] Semua fitur wajib punya tempat jelas pada level arsitektur.
- [ ] Strict 6 statuses tetap terjaga.
- [ ] Role-Based UI dan Role-Based API Validation dipisahkan.
- [ ] Keputusan arsitektur cukup konkret untuk Skill 07 dan Skill 08.
- [ ] ASSUMPTION, OPEN QUESTION, dan Needs Human Review sudah ditandai.
- [ ] Accessibility-first, component-driven, dan open design compatible sudah terlihat tanpa memaksa dependency implementasi.
- [ ] Risiko Cloudflare free tier, D1 binding, secret safety, dan deployment sudah dicatat.
- [ ] Traceability ke FR, NFR, BR, dan US sudah jelas.
