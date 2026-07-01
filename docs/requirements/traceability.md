# Traceability Matrix

| Review Status | PASS for Issue #24 final traceability and evidence audit |
| --- | --- |
| Skill AI | Skill 03 through Skill 09 traceability updates, TDD audit test, Maker-Checker Split |
| Human decision | PASS |

Traceability ini mencatat relasi requirement ke user story dari Skill 03, prioritas Skill 04, validasi Skill 05, update design level Skill 06, update design level Skill 07, update design level Skill 08, issue planning Skill 09, implementasi Issue #13 sampai #24, serta audit Skill 11 Code Review. Kolom Kode dan Test diisi berdasarkan artefak implementasi dan verifikasi yang sudah tersedia di repositori.

## Skill 11 Code Review Links

| Review item | Evidence | Result |
| --- | --- | --- |
| Code review Issue #13 sampai #24 | `evidence/human-review-skill-11-code-review.md` | PASS; adversarial Checker found issues, scoped fixes were applied, test/build/secret scan passed, and re-review returned PASS |

| **Requirement** | **User Story** | **Design Skill 06** | **Design Skill 07** | **Design Skill 08** | **Issue** | **Kode** | **Test** | **Status** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FR-01 | US-01 | ARCH-03, ARCH-05 | DB-01, DB-04, API-03 | UI-03, UI-09 | #14 | `worker/index.ts`, `database/migrations/0002_create_request_identity_and_history.sql`, `src/App.tsx`, `src/App.css` | `tests/integration/request-create.test.ts`, `tests/integration/react-foundation.test.ts` | Selesai untuk Issue #14; create request stores complete report and starts `SUBMITTED` |
| FR-02 | US-01 | ARCH-03 | DB-01, API-03 | UI-03, UI-09 | #14 | `worker/index.ts`, `database/migrations/0002_create_request_identity_and_history.sql`, `src/App.tsx` | `tests/integration/request-create.test.ts`, `tests/integration/react-foundation.test.ts` | Selesai untuk Issue #14; reporter identity stored and required |
| FR-03 | US-02 | ARCH-01, ARCH-04 | DB-01, API-02 | UI-02, UI-09 | #15 | `worker/index.ts`, `src/App.tsx`, `src/App.css` | `tests/integration/request-workspace.test.ts`, `tests/integration/react-foundation.test.ts` | Selesai untuk Issue #15; stored requests display through Request Workspace list with empty-state metadata |
| FR-04 | US-03 | ARCH-01, ARCH-04 | DB-01, API-02 | UI-02, UI-09 | #15 | `worker/index.ts`, `src/App.tsx`, `src/App.css` | `tests/integration/request-workspace.test.ts`, `tests/integration/react-foundation.test.ts` | Selesai untuk Issue #15; keyword search returns matching reports and no-result empty state |
| FR-05 | US-04 | ARCH-01, ARCH-04 | DB-01, API-02 | UI-02, UI-09 | #15 | `worker/index.ts`, `src/App.tsx`, `src/App.css` | `tests/integration/request-workspace.test.ts`, `tests/integration/react-foundation.test.ts` | Selesai untuk Issue #15; status and priority filters can be combined on the request list |
| FR-06 | US-05 | ARCH-01, ARCH-04 | DB-01, DB-04, DB-05, DB-06, API-04 | UI-02, UI-04 | #15 | `worker/index.ts`, `src/App.tsx`, `src/App.css` | `tests/integration/request-workspace.test.ts`, `tests/integration/react-foundation.test.ts` | Selesai untuk Issue #15; selected report detail displays request data and detail empty/not-found states |
| FR-07 | US-06 | ARCH-02, ARCH-05 | DB-01, DB-04, API-05 | UI-05 | #16 | `worker/index.ts`, `src/App.tsx`, `src/App.css` | `tests/integration/admin-workflow.test.ts` | Selesai untuk Issue #16; Administrator moves `SUBMITTED` to `UNDER_REVIEW`, non-admin receives `FORBIDDEN` |
| FR-08 | US-07 | ARCH-02, ARCH-04, ARCH-14 | DB-01, API-06 | UI-05, UI-09 | #16 | `worker/index.ts`, `src/App.tsx`, `src/App.css` | `tests/integration/admin-workflow.test.ts` | Selesai untuk Issue #16; Administrator stores category from the fixed app list |
| FR-09 | US-07 | ARCH-02, ARCH-04, ARCH-14 | DB-01, API-06 | UI-05, UI-09 | #16 | `worker/index.ts`, `src/App.tsx`, `src/App.css` | `tests/integration/admin-workflow.test.ts` | Selesai untuk Issue #16; Administrator stores priority `LOW`, `MEDIUM`, `HIGH`, or `URGENT` |
| FR-10 | US-07 | ARCH-02, ARCH-04, ARCH-14 | DB-01, API-03, API-06 | UI-03, UI-05, UI-09 | #14, #16 | `worker/index.ts`, `database/migrations/0002_create_request_identity_and_history.sql`, `src/App.tsx`, `src/App.css` | `tests/integration/request-create.test.ts`, `tests/integration/admin-workflow.test.ts`, `tests/integration/react-foundation.test.ts` | Selesai untuk Issue #16 continuation; Lecturer `HIGH` suggestion remains separate while Administrator final priority is stored |
| FR-11 | US-08 | ARCH-02, ARCH-05 | DB-02, DB-03, DB-04, API-07 | UI-05 | #16 | `worker/index.ts`, `database/migrations/0003_create_technicians_and_assignments.sql`, `src/App.tsx`, `src/App.css` | `tests/integration/admin-workflow.test.ts` | Selesai untuk Issue #16; Administrator assigns active technician only after review and status becomes `ASSIGNED` |
| FR-12 | US-09 | ARCH-02, ARCH-04 | DB-02, DB-03, API-08 | UI-06 | #17 | `worker/index.ts`, `src/App.tsx`, `src/App.css` | `tests/integration/technician-workflow.test.ts`, `tests/integration/react-foundation.test.ts` | Selesai untuk Issue #17; Teknisi sees only assigned current task list for the active technician context |
| FR-13 | US-09 | ARCH-02, ARCH-05 | DB-03, API-09 | UI-06 | #17 | `worker/index.ts`, `src/App.tsx`, `src/App.css` | `tests/integration/technician-workflow.test.ts`, `tests/integration/react-foundation.test.ts` | Selesai untuk Issue #17; accept records `accepted_at` while status remains `ASSIGNED` and no reject/reassignment path is added |
| FR-14 | US-10 | ARCH-02, ARCH-05, ARCH-06 | DB-03, DB-04, API-10 | UI-06 | #17 | `worker/index.ts`, `src/App.tsx`, `src/App.css` | `tests/integration/technician-workflow.test.ts`, `tests/integration/react-foundation.test.ts` | Selesai untuk Issue #17; assigned technician moves `ASSIGNED` to `IN_PROGRESS` with status history |
| FR-15 | US-10 | ARCH-02, ARCH-05, ARCH-06 | DB-03, DB-04, API-11 | UI-06 | #17 | `worker/index.ts`, `src/App.tsx`, `src/App.css` | `tests/integration/technician-workflow.test.ts`, `tests/integration/react-foundation.test.ts` | Selesai untuk Issue #17; assigned technician moves `IN_PROGRESS` to `RESOLVED` without adding a seventh status |
| FR-16 | US-11 | ARCH-03, ARCH-07 | DB-05, API-12 | UI-04, UI-09 | #18 | `worker/index.ts`, `database/migrations/0004_create_request_comments_and_internal_notes.sql`, `src/App.tsx`, `src/App.css` | `tests/integration/request-workspace.test.ts`, `tests/integration/react-foundation.test.ts` | Selesai untuk Issue #18; public comments stored as `PUBLIC` and visible in request detail for REPORTER, ADMINISTRATOR, and TECHNICIAN |
| FR-17 | US-12 | ARCH-03, ARCH-07 | DB-06, API-13 | UI-04, UI-09 | #18 | `worker/index.ts`, `database/migrations/0004_create_request_comments_and_internal_notes.sql`, `src/App.tsx`, `src/App.css` | `tests/integration/request-workspace.test.ts`, `tests/integration/react-foundation.test.ts` | Selesai untuk Issue #18; internal notes stored as `INTERNAL`, hidden from REPORTER, and not granted to FACILITY_MANAGER while OPEN-10 remains unresolved |
| FR-18 | US-05, US-10 | ARCH-03, ARCH-06 | DB-04, API-03, API-05, API-07, API-10, API-11, API-15, API-16 | UI-02, UI-04, UI-05, UI-06 | #14, #15, #16, #17, #19 | `worker/index.ts`, `database/migrations/0002_create_request_identity_and_history.sql`, `database/migrations/0003_create_technicians_and_assignments.sql`, `src/App.tsx`, `src/App.css` | `tests/integration/request-create.test.ts`, `tests/integration/request-workspace.test.ts`, `tests/integration/admin-workflow.test.ts`, `tests/integration/technician-workflow.test.ts`, `tests/integration/resolution-close-reopen.test.ts`, `tests/integration/react-foundation.test.ts` | Selesai untuk Issue #19 slice; close and reopen append BR-08 Riwayat Status while confirmation remains a non-status event |
| FR-19 | US-13 | ARCH-02, ARCH-05 | DB-07, API-14 | UI-04, UI-09 | #19 | `worker/index.ts`, `database/migrations/0005_create_reporter_confirmations.sql`, `src/App.tsx`, `src/App.css` | `tests/integration/resolution-close-reopen.test.ts`, `tests/integration/request-workspace.test.ts`, `tests/integration/react-foundation.test.ts` | Selesai untuk Issue #19; Reporter confirms `RESOLVED` reports and confirmation is stored without adding a seventh status |
| FR-20 | US-14 | ARCH-02, ARCH-05 | DB-01, DB-07, DB-04, API-15 | UI-05, UI-09 | #19 | `worker/index.ts`, `database/migrations/0005_create_reporter_confirmations.sql`, `src/App.tsx`, `src/App.css` | `tests/integration/resolution-close-reopen.test.ts`, `tests/integration/react-foundation.test.ts` | Selesai untuk Issue #19; Administrator closes `RESOLVED` reports after confirmation or with required manual override data; OPEN-03/OPEN-11 preserved |
| FR-21 | US-15 | ARCH-02, ARCH-05 | DB-04, API-16 | UI-05, UI-09 | #19 | `worker/index.ts`, `src/App.tsx`, `src/App.css` | `tests/integration/resolution-close-reopen.test.ts`, `tests/integration/react-foundation.test.ts` | Selesai untuk Issue #19; Administrator reopens `CLOSED` reports to `UNDER_REVIEW` and status history is appended |
| FR-22 | US-16 | ARCH-03, ARCH-08 | DB-01, DB-02, DB-03, DB-04, API-17 | UI-07 | #20 | `worker/index.ts`, `src/App.tsx`, `src/App.css` | `tests/integration/dashboard-summary.test.ts`, `tests/integration/react-foundation.test.ts` | Selesai untuk Issue #20; Facility Manager and Administrator can view read-only operational report summary through `GET /api/dashboard/summary` |
| FR-23 | US-16 | ARCH-03, ARCH-08 | DB-02, DB-03, API-08, API-17 | UI-07 | #20 | `worker/index.ts`, `src/App.tsx`, `src/App.css` | `tests/integration/dashboard-summary.test.ts`, `tests/integration/react-foundation.test.ts` | Selesai untuk Issue #20; dashboard shows technician assignment source data while preserving OPEN-07 and excluding internal note content per OPEN-10 |
| FR-24 | US-17 | ARCH-01, ARCH-02, ARCH-09, ARCH-11 | API-02 sampai API-17 role validation | UI-01, UI-08, UI-09 | #21 | `src/App.tsx`, `src/App.css`, `worker/index.ts` | `tests/integration/react-foundation.test.ts`, `tests/integration/role-validation-states.test.ts` | Selesai untuk Issue #21; role simulator updates visible action summary while Worker enforces role/action validation |
| NFR-01 | Semua user story | ARCH-01, ARCH-09, ARCH-10, ARCH-11 | API response supports React data states | UI-01 sampai UI-10 | #13, #20, #21 | `src/App.tsx`, `src/App.css` | `tests/integration/react-foundation.test.ts`, `tests/integration/role-validation-states.test.ts` | Selesai; Issue #21 adds accessible role action summary and role-driven UI state |
| NFR-02 | Semua user story | ARCH-02, ARCH-12 | API-01 sampai API-17 | UI API-to-UI mapping | #13, #20, #21, #23 | `worker/index.ts`, `src/App.tsx`, `wrangler.jsonc`, `docs/deployment/deployment-readiness.md` | `tests/integration/worker-health.test.ts`, `tests/integration/dashboard-summary.test.ts`, `tests/integration/react-foundation.test.ts`, `tests/integration/role-validation-states.test.ts`, `tests/integration/deployment-readiness.test.ts` | Selesai untuk Issue #23; Worker entrypoint and PR deployment readiness are documented and tested |
| NFR-03 | Semua user story | ARCH-03, ARCH-12 | DB-01 sampai DB-07 | UI data display from DB/API contracts | #13, #20, #23 | `worker/index.ts`, `database/migrations/0001_initial.sql`, `database/migrations/0002_create_request_identity_and_history.sql`, `database/migrations/0003_create_technicians_and_assignments.sql`, `database/migrations/0004_create_request_comments_and_internal_notes.sql`, `database/migrations/0005_create_reporter_confirmations.sql`, `database/migrations/0006_enforce_request_status_priority.sql`, `wrangler.jsonc`, `docs/deployment/deployment-readiness.md` | `tests/integration/worker-health.test.ts`, `tests/integration/dashboard-summary.test.ts`, `tests/integration/deployment-readiness.test.ts` | Selesai untuk Issue #23; D1 binding and safe remote migration step are documented and tested, with Skill 11 adding D1 guard triggers for status/priority values |
| NFR-04 | Semua user story | ARCH-03, ARCH-12 | D1-only database design; no paid storage | UI excludes paid/out-of-scope features | #13, #23 | `wrangler.jsonc`, `worker/index.ts`, `src/App.tsx`, `docs/deployment/deployment-readiness.md` | `tests/integration/worker-health.test.ts`, `tests/integration/react-foundation.test.ts`, `tests/integration/deployment-readiness.test.ts` | Selesai untuk Issue #23; active deployment config uses Workers assets and D1 only |
| NFR-05 | Semua user story | ARCH-12 | Skill 07 branch and PR workflow | Skill 08 branch and PR workflow | #23 | `docs/deployment/deployment-readiness.md`, `.github/workflows/ci.yml`, `docs/requirements/traceability.md` | GitHub PR workflow for `feature/issue-23`, `npm test -- --run`, `npm run build` | Selesai untuk Issue #23; work remains branch/PR based and CI-gated |
| NFR-06 | Semua user story | ARCH-04 | Contract-first validation and error contracts | UI-08, UI-09 state/error design | #22 | `.github/workflows/ci.yml`, `docs/testing/automated-test-inventory.md`, `worker/index.ts`, `src/App.tsx` | `tests/unit/request-validation.test.ts`, `tests/integration/*.test.ts`, `npm test -- --run`, `npm run build` | Selesai untuk Issue #22; CI runs install, test, and build while inventory records 52 automated tests after Skill 11 regression review |
| NFR-07 | Semua user story | ARCH-13 | Skill 07 traceability links added | Skill 08 traceability links added | #22, #24 | `docs/requirements/traceability.md`, `docs/testing/automated-test-inventory.md`, `evidence/human-review-implementation-issue-22.md`, `evidence/human-review-implementation-issue-24.md` | `tests/integration/role-validation-states.test.ts`, `tests/integration/traceability-evidence.test.ts`, `npm test -- --run`, `npm run build` | Selesai untuk Issue #24; all FR, NFR, and BR rows are issue-linked and final audit evidence is recorded |
| NFR-08 | Semua user story | ARCH-13 | `evidence/human-review-database-api.md` | `evidence/human-review-ui-design.md` | #24 | `evidence/human-review-implementation-issue-13.md` through `evidence/human-review-implementation-issue-24.md`, `docs/requirements/traceability.md` | `tests/integration/traceability-evidence.test.ts`, `npm test -- --run`, `npm run build` | Selesai untuk Issue #24; human-review evidence exists for implementation issues with reviewer and PASS decision |
| NFR-09 | Semua user story | ARCH-12 | No secret-bearing design or config changes | No secret-bearing UI design changes | #13, #23 | `wrangler.jsonc`, `worker/index.ts`, `.gitignore`, `docs/deployment/deployment-readiness.md` | `tests/integration/deployment-readiness.test.ts`, tracked-file secret scan via `git grep` | Selesai untuk Issue #23; ignored secret files are protected and no credential values are added |

## Business Rule Links

| Business Rule | Related Requirement | Design Skill 06 | Design Skill 07 | Design Skill 08 | Issue | Status |
| --- | --- | --- | --- | --- | --- | --- |
| BR-01 | FR-01 | ARCH-05 | DB-01, DB-04, API-03 | UI-03 | #14 | Selesai untuk Issue #14; new request status is `SUBMITTED` |
| BR-02 | FR-07, FR-11, FR-14, FR-15, FR-20, FR-21 | ARCH-02, ARCH-05 | DB-01, DB-04, API-03, API-05, API-07, API-10, API-11, API-15, API-16 | UI-04, UI-05, UI-06, UI-09 | #16, #17, #19 | Selesai untuk Issue #19 slice; confirmation is stored in `reporter_confirmations`, close uses `CLOSED`, reopen returns to `UNDER_REVIEW`, and no seventh status is added |
| BR-03 | FR-07, FR-11 | ARCH-02, ARCH-05 | DB-03, API-05, API-07 | UI-05 | #16 | Selesai untuk Issue #16; assignment is rejected until request is `UNDER_REVIEW` |
| BR-04 | FR-09 | ARCH-14 | DB-01, API-06 | UI-05 | #16 | Selesai untuk Issue #16; Administrator classification endpoint stores final priority |
| BR-05 | FR-10 | ARCH-14 | DB-01, API-03, API-06 | UI-03, UI-05 | #14, #16 | Selesai untuk Issue #16 continuation; Lecturer HIGH suggestion remains separate from Administrator priority |
| BR-06 | FR-08 | ARCH-14 | DB-01, API-06 | UI-03, UI-05, UI-09 | #16 | Selesai untuk Issue #16; category validation uses the fixed list already present in the app |
| BR-07 | FR-09 | ARCH-14 | DB-01, API-02, API-06 | UI-05, UI-09 | #16 | Selesai untuk Issue #16; API accepts only `LOW`, `MEDIUM`, `HIGH`, `URGENT` |
| BR-08 | FR-18 | ARCH-06 | DB-04, status-changing APIs | UI-04, UI-05, UI-06 | #14, #16, #17, #19 | Selesai untuk Issue #19 slice; close and reopen write from/to status, role `ADMINISTRATOR`, note, and timestamp |
| BR-09 | FR-16 | ARCH-07 | DB-05, API-04, API-12 | UI-04, UI-09 | #18 | Selesai untuk Issue #18; Komentar Publik uses `request_comments`, API-12, and API-04 detail visibility |
| BR-10 | FR-17 | ARCH-07 | DB-06, API-04, API-13 | UI-04, UI-09 | #18 | Selesai untuk Issue #18; Catatan Internal uses `request_internal_notes`, API-13, and API-04 role query for ADMINISTRATOR/TECHNICIAN only |
| BR-11 | FR-19, FR-20 | ARCH-02, ARCH-05 | DB-01, DB-07, API-14, API-15 | UI-04, UI-05, UI-09 | #19 | Selesai untuk Issue #19; normal close requires reporter confirmation, while close without confirmation requires `manualOverride: true` and `manualOverrideNote` without inventing override policy |
| BR-12 | FR-21 | ARCH-02, ARCH-05 | DB-04, API-16 | UI-05 | #19 | Selesai untuk Issue #19; reopen is Administrator-only and targets `UNDER_REVIEW` |

## Skill 06 Architecture Design Links

Status: Human Reviewed & Approved. Link design berikut ditautkan dari `docs/design/architecture.md`. Update ini tidak mengubah requirement final dan tidak membuat detail database/API/UI yang menjadi scope Skill 07 atau Skill 08.

| Design ID | Design Area | Related Requirement / Rule | Status |
| --- | --- | --- | --- |
| ARCH-01 | React SPA, role simulator, master-detail shell | FR-03, FR-06, FR-24, NFR-01, US-02, US-05, US-17 | Approved Skill 06 |
| ARCH-02 | Cloudflare Worker API boundary and role/workflow validation | FR-07, FR-11, FR-14, FR-15, FR-19, FR-20, FR-21, FR-24, NFR-02, BR-02, BR-03, BR-11, BR-12 | Approved Skill 06 |
| ARCH-03 | Cloudflare D1 persistence boundary | FR-01, FR-02, FR-16, FR-17, FR-18, FR-22, FR-23, NFR-03 | Approved Skill 06 |
| ARCH-04 | Query/command API design boundary for later Skill 07 | FR-03 sampai FR-23 | Approved Skill 06 |
| ARCH-05 | Strict 6 status workflow architecture | BR-01, BR-02, BR-03, BR-11, BR-12, US-01, US-06, US-08, US-10, US-13, US-14, US-15 | Approved Skill 06 |
| ARCH-06 | Riwayat Status architecture | FR-18, BR-08, US-05, US-10 | Approved Skill 06 |
| ARCH-07 | Komentar Publik and Catatan Internal visibility boundary | FR-16, FR-17, BR-09, BR-10, US-11, US-12 | Approved Skill 06 |
| ARCH-08 | Dashboard and technician workload summary boundary | FR-22, FR-23, US-16 | Approved Skill 06 |
| ARCH-09 | Component-driven frontend constraint | FR-24, NFR-01 | Approved Skill 06 |
| ARCH-10 | Accessibility-first frontend constraint | NFR-01, US-01 sampai US-17 | Approved Skill 06 |
| ARCH-11 | Open design compatible frontend constraint | FR-24, NFR-01 | Approved Skill 06 |
| ARCH-12 | Cloudflare deployment architecture | NFR-02, NFR-03, NFR-04, NFR-05, NFR-09 | Approved Skill 06 |
| ARCH-13 | Traceability and Human Review quality gate | NFR-07, NFR-08 | Approved Skill 06 |
| ARCH-14 | Category, priority, and Lecturer priority suggestion decision boundary | FR-08, FR-09, FR-10, BR-04, BR-05, BR-06, BR-07, OPEN-05, OPEN-06 | Approved Skill 06 |

## Skill 07 Database/API Design Links

Status: Human Reviewed & Approved. Link design berikut ditautkan dari `docs/design/database-api.md`. Update ini tidak mengubah requirement final, tidak mengubah arsitektur Skill 06, dan tidak membuat migration SQL final, kode Worker, UI, test, atau deployment.

| Design ID | Design Area | Related Requirement / Rule | Status |
| --- | --- | --- | --- |
| DB-01 | `service_requests` aggregate, reporter identity, controlled values, current status | FR-01, FR-02, FR-03, FR-04, FR-05, FR-06, FR-08, FR-09, FR-10, FR-20, BR-01, BR-02, BR-04, BR-05, BR-06, BR-07, BR-11 | Approved Skill 07 |
| DB-02 | `technicians` reference data | FR-11, FR-12, FR-23 | Approved Skill 07 |
| DB-03 | `request_assignments` assignment and acceptance data | FR-11, FR-12, FR-13, FR-14, FR-23, BR-03 | Approved Skill 07 |
| DB-04 | `request_status_history` audit trail | FR-18, BR-01, BR-02, BR-08 | Approved Skill 07 |
| DB-05 | `request_comments` public comments | FR-16, BR-09 | Approved Skill 07 |
| DB-06 | `request_internal_notes` internal notes | FR-17, BR-10, OPEN-10 | Approved Skill 07 |
| DB-07 | `reporter_confirmations` reporter confirmation event | FR-19, FR-20, BR-11, OPEN-11 | Approved Skill 07 |
| API-01 | `GET /api/health` | NFR-02 | Approved Skill 07 |
| API-02 | `GET /api/requests` list/search/filter | FR-03, FR-04, FR-05 | Approved Skill 07 |
| API-03 | `POST /api/requests` create request | FR-01, FR-02, FR-10, FR-18, BR-01, BR-05, BR-08 | Approved Skill 07 |
| API-04 | `GET /api/requests/:id` detail | FR-06, FR-18, BR-09, BR-10, OPEN-10 | Approved Skill 07 |
| API-05 | `PATCH /api/requests/:id/review` | FR-07, FR-18, BR-02, BR-03, BR-08 | Approved Skill 07 |
| API-06 | `PATCH /api/requests/:id/classification` | FR-08, FR-09, FR-10, BR-04, BR-05, BR-06, BR-07, OPEN-05, OPEN-06 | Approved Skill 07 |
| API-07 | `PATCH /api/requests/:id/assignment` | FR-11, FR-18, BR-02, BR-03, BR-08 | Approved Skill 07 |
| API-08 | `GET /api/technicians/:id/tasks` | FR-12, FR-23 | Approved Skill 07 |
| API-09 | `PATCH /api/requests/:id/accept` | FR-13, OPEN-08 | Approved Skill 07 |
| API-10 | `PATCH /api/requests/:id/progress` | FR-14, FR-18, BR-02, BR-08 | Approved Skill 07 |
| API-11 | `PATCH /api/requests/:id/resolve` | FR-15, FR-18, BR-02, BR-08, OPEN-11 | Approved Skill 07 |
| API-12 | `POST /api/requests/:id/comments` | FR-16, BR-09 | Approved Skill 07 |
| API-13 | `POST /api/requests/:id/internal-notes` | FR-17, BR-10, OPEN-10 | Approved Skill 07 |
| API-14 | `PATCH /api/requests/:id/confirm-resolution` | FR-19, BR-11, OPEN-11 | Approved Skill 07 |
| API-15 | `PATCH /api/requests/:id/close` | FR-20, FR-18, BR-02, BR-08, BR-11, OPEN-03, OPEN-11 | Approved Skill 07 |
| API-16 | `PATCH /api/requests/:id/reopen` | FR-21, FR-18, BR-12, BR-08, OPEN-04 | Approved Skill 07 |
| API-17 | `GET /api/dashboard/summary` | FR-22, FR-23, OPEN-07, OPEN-10 | Approved Skill 07 |

## Skill 08 UI Design Links

Status: Human Reviewed & Approved. Link design berikut ditautkan dari `docs/design/ui-flow.md`. Update ini tidak mengubah requirement final, tidak mengubah arsitektur Skill 06, tidak mengubah database/API Skill 07, dan tidak membuat kode React, CSS, HTML, TypeScript, test, API, database, atau deployment.

| Design ID | Design Area | Related Requirement / Rule | Status |
| --- | --- | --- | --- |
| UI-01 | Application shell, navigation, and RoleSwitcher | FR-24, US-17, NFR-01 | Approved through Skill 08 |
| UI-02 | Request Workspace list, search, filter, detail selection | FR-03, FR-04, FR-05, FR-06, FR-18, US-02, US-03, US-04, US-05 | Approved through Skill 08 |
| UI-03 | Create Request form and feedback | FR-01, FR-02, FR-10, BR-01, BR-05, US-01 | Approved through Skill 08 |
| UI-04 | Request Detail, comments, internal notes, and status history | FR-06, FR-16, FR-17, FR-18, BR-09, BR-10, US-05, US-11, US-12, OPEN-10 | Approved through Skill 08 |
| UI-05 | Administrator review, classify, assign, close, and reopen actions | FR-07, FR-08, FR-09, FR-10, FR-11, FR-20, FR-21, BR-02, BR-03, BR-04, BR-05, BR-06, BR-07, BR-08, BR-11, BR-12, OPEN-03, OPEN-05, OPEN-11 | Approved through Skill 08 |
| UI-06 | Technician Tasks and technician workflow actions | FR-12, FR-13, FR-14, FR-15, FR-18, US-09, US-10, OPEN-08 | Approved through Skill 08 |
| UI-07 | Dashboard Summary and workload source display | FR-22, FR-23, US-16, OPEN-07, OPEN-10 | Approved through Skill 08 |
| UI-08 | Fallback views for forbidden, not found, conflict, and server error | FR-24, NFR-01, NFR-06, API error contract | Approved through Skill 08 |
| UI-09 | Component inventory and form/feedback design | FR-01 through FR-24, NFR-01, NFR-06, NFR-07 | Approved through Skill 08 |
| UI-10 | Accessibility-first checklist and design token guidance | NFR-01, NFR-07, US-01 through US-17 | Approved through Skill 08 |

## Skill 09 Issue Planning Links

Status: PASS for Issue #24 final traceability and evidence audit. Link issue berikut dibuat di GitHub Issues untuk mengubah requirement dan design yang sudah disetujui menjadi rencana pekerjaan, lalu diperbarui saat implementasi Issue #13 sampai #24 selesai melalui branch, PR, CI, dan evidence review.

| Issue | Planning slice | Related requirement / rule | Status |
| --- | --- | --- | --- |
| #13 | React, Worker, D1 foundation | NFR-01, NFR-02, NFR-03, NFR-04, NFR-09 | Selesai; PR #26 merged and evidence recorded |
| #14 | Create service request with reporter identity | FR-01, FR-02, FR-10, FR-18, BR-01, BR-05, BR-08 | Selesai; PR #27 merged and evidence recorded |
| #15 | Request workspace list, search, filter, and detail | FR-03, FR-04, FR-05, FR-06, FR-18, FR-24 | Selesai; PR #28 merged and evidence recorded |
| #16 | Administrator review, classify, and assign workflow | FR-07, FR-08, FR-09, FR-10, FR-11, FR-18, BR-02, BR-03, BR-04, BR-05, BR-06, BR-07, BR-08 | Selesai; PR #29 merged and evidence recorded |
| #17 | Technician task lifecycle | FR-12, FR-13, FR-14, FR-15, FR-18, BR-02, BR-08 | Selesai; PR #30 merged and evidence recorded |
| #18 | Public comments and internal notes | FR-16, FR-17, BR-09, BR-10 | Implemented with Worker API, D1 migration, React detail communication UI, integration tests, and human review evidence |
| #19 | Confirmation, close, and reopen workflow | FR-19, FR-20, FR-21, FR-18, BR-02, BR-08, BR-11, BR-12 | Implemented with Worker API, D1 reporter confirmation migration, React detail actions, integration tests, and human review evidence |
| #20 | Operational dashboard and technician workload summary | FR-22, FR-23, NFR-01, NFR-02, NFR-03 | Implemented with Worker dashboard summary API, read-only React dashboard, integration tests, and human review evidence |
| #21 | Role-based UI and API validation states | FR-24, NFR-01, NFR-02, NFR-06, NFR-07 | Selesai; PR #34 merged and evidence recorded |
| #22 | Automated testing and GitHub Actions CI | NFR-06, NFR-07 | Selesai; PR #35 merged and evidence recorded |
| #23 | Cloudflare deployment and secret-safety checks | NFR-02, NFR-03, NFR-04, NFR-05, NFR-09 | Selesai; PR #36 merged and evidence recorded |
| #24 | Traceability and human review evidence | NFR-07, NFR-08, FR-01 sampai FR-24, BR-01 sampai BR-12 | Selesai; final traceability/evidence audit covered by `tests/integration/traceability-evidence.test.ts` |

## Skill 04 Prioritization Links

Status: Human Reviewed & Approved. Prioritas berikut ditautkan dari `docs/requirements/prioritization.md` dan sudah disetujui melalui Human Review Skill 04.

| Requirement | User Story | Skill 04 Priority | Status |
| --- | --- | --- | --- |
| FR-01 | US-01 | Must | Approved Skill 04 |
| FR-02 | US-01 | Must | Approved Skill 04 |
| FR-03 | US-02 | Must | Approved Skill 04 |
| FR-04 | US-03 | Should | Approved Skill 04 |
| FR-05 | US-04 | Should | Approved Skill 04 |
| FR-06 | US-05 | Must | Approved Skill 04 |
| FR-07 | US-06 | Must | Approved Skill 04 |
| FR-08 | US-07 | Must | Approved Skill 04 |
| FR-09 | US-07 | Must | Approved Skill 04 |
| FR-10 | US-07 | Should | Approved Skill 04 |
| FR-11 | US-08 | Must | Approved Skill 04 |
| FR-12 | US-09 | Must | Approved Skill 04 |
| FR-13 | US-09 | Should | Approved Skill 04 |
| FR-14 | US-10 | Must | Approved Skill 04 |
| FR-15 | US-10 | Must | Approved Skill 04 |
| FR-16 | US-11 | Should | Approved Skill 04 |
| FR-17 | US-12 | Could | Approved Skill 04 |
| FR-18 | US-05, US-10 | Must | Approved Skill 04 |
| FR-19 | US-13 | Must | Approved Skill 04 |
| FR-20 | US-14 | Must | Approved Skill 04 |
| FR-21 | US-15 | Should | Approved Skill 04 |
| FR-22 | US-16 | Should | Approved Skill 04 |
| FR-23 | US-16 | Could | Approved Skill 04 |
| FR-24 | US-17 | Must | Approved Skill 04 |

## Skill 05 Validation Links

Status: Human Reviewed & Approved. Validasi Skill 05 ditautkan dari `docs/requirements/validation.md` dan change request ditautkan dari `docs/requirements/change-request.md`. Tabel ini tidak mengubah requirement final; `CR-05-01` tetap berupa analisis change request dan tidak langsung mengubah baseline requirement.

### Functional Requirement Validation Links

| Requirement | User Story | Skill 05 Validation | Change Request | Status |
| --- | --- | --- | --- | --- |
| FR-01 | US-01 | PASS | None | Approved Skill 05 |
| FR-02 | US-01 | OPEN QUESTION: OPEN-02 | None | Approved Skill 05 |
| FR-03 | US-02 | PASS | None | Approved Skill 05 |
| FR-04 | US-03 | PASS | None | Approved Skill 05 |
| FR-05 | US-04 | PASS | None | Approved Skill 05 |
| FR-06 | US-05 | OPEN QUESTION: OPEN-10 | None | Approved Skill 05 |
| FR-07 | US-06 | PASS | None | Approved Skill 05 |
| FR-08 | US-07 | OPEN QUESTION: OPEN-05 | None | Approved Skill 05 |
| FR-09 | US-07 | OPEN QUESTION: OPEN-06 | None | Approved Skill 05 |
| FR-10 | US-07 | OPEN QUESTION: OPEN-06 | None | Approved Skill 05 |
| FR-11 | US-08 | PASS | None | Approved Skill 05 |
| FR-12 | US-09 | PASS | None | Approved Skill 05 |
| FR-13 | US-09 | OPEN QUESTION: OPEN-08 | None | Approved Skill 05 |
| FR-14 | US-10 | PASS | None | Approved Skill 05 |
| FR-15 | US-10 | PASS | None | Approved Skill 05 |
| FR-16 | US-11 | PASS | None | Approved Skill 05 |
| FR-17 | US-12 | OPEN QUESTION: OPEN-10 | None | Approved Skill 05 |
| FR-18 | US-05, US-10 | PASS | None | Approved Skill 05 |
| FR-19 | US-13 | OPEN QUESTION: OPEN-11 | CR-05-01 | Approved Skill 05 |
| FR-20 | US-14 | OPEN QUESTION: OPEN-03, OPEN-11 | CR-05-01 | Approved Skill 05 |
| FR-21 | US-15 | OPEN QUESTION: OPEN-04 | None | Approved Skill 05 |
| FR-22 | US-16 | OPEN QUESTION: OPEN-10 | None | Approved Skill 05 |
| FR-23 | US-16 | OPEN QUESTION: OPEN-07 | None | Approved Skill 05 |
| FR-24 | US-17 | PASS | None | Approved Skill 05 |

### Non-Functional Requirement and Business Rule Validation Links

| Item | Related Artifact | Skill 05 Validation | Change Request | Status |
| --- | --- | --- | --- | --- |
| NFR-01 | All user stories | PASS | None | Approved Skill 05 |
| NFR-02 | All user stories | PASS | None | Approved Skill 05 |
| NFR-03 | All user stories | PASS | None | Approved Skill 05 |
| NFR-04 | All user stories | PASS | None | Approved Skill 05 |
| NFR-05 | All user stories | PASS | None | Approved Skill 05 |
| NFR-06 | All user stories | PASS after Issue #22 automated test inventory | None | Approved Skill 05 and closed by Issue #22 |
| NFR-07 | All user stories | PASS | None | Approved Skill 05 |
| NFR-08 | All user stories | PASS | None | Approved Skill 05 |
| NFR-09 | All user stories | PASS | None | Approved Skill 05 |
| BR-01 | FR-01 | PASS | None | Approved Skill 05 |
| BR-02 | FR-07, FR-11, FR-14, FR-15, FR-20, FR-21 | PASS | CR-05-01 protects strict statuses | Approved Skill 05 |
| BR-03 | FR-07, FR-11 | PASS | None | Approved Skill 05 |
| BR-04 | FR-09 | PASS | None | Approved Skill 05 |
| BR-05 | FR-10 | OPEN QUESTION: OPEN-06 | None | Approved Skill 05 |
| BR-06 | FR-08 | OPEN QUESTION: OPEN-05 | None | Approved Skill 05 |
| BR-07 | FR-09 | PASS | None | Approved Skill 05 |
| BR-08 | FR-18 | PASS | None | Approved Skill 05 |
| BR-09 | FR-16 | PASS | None | Approved Skill 05 |
| BR-10 | FR-17 | OPEN QUESTION: OPEN-10 | None | Approved Skill 05 |
| BR-11 | FR-19, FR-20 | OPEN QUESTION: OPEN-03, OPEN-11 | CR-05-01 | Approved Skill 05 |
| BR-12 | FR-21 | OPEN QUESTION: OPEN-04 | None | Approved Skill 05 |

### User Story Validation Links

| User Story | Supports | Skill 05 Validation | Change Request | Design Skill 07 | Design Skill 08 | Status |
| --- | --- | --- | --- | --- | --- | --- |
| US-01 | FR-01, FR-02, BR-01 | OPEN QUESTION: OPEN-02 | None | DB-01, DB-04, API-03 | UI-03 | Approved through Skill 08 |
| US-02 | FR-03 | PASS | None | DB-01, API-02 | UI-02 | Approved through Skill 08 |
| US-03 | FR-04 | PASS | None | DB-01, API-02 | UI-02 | Approved through Skill 08 |
| US-04 | FR-05 | PASS | None | DB-01, API-02 | UI-02 | Approved through Skill 08 |
| US-05 | FR-06, FR-18 | OPEN QUESTION: OPEN-10 | None | DB-01, DB-04, DB-05, DB-06, API-04 | UI-02, UI-04 | Approved through Skill 08 |
| US-06 | FR-07, BR-03 | PASS | None | DB-01, DB-04, API-05 | UI-05 | Approved through Skill 08 |
| US-07 | FR-08, FR-09, FR-10, BR-04, BR-05, BR-06, BR-07 | OPEN QUESTION: OPEN-05, OPEN-06 | None | DB-01, API-06 | UI-05 | Approved through Skill 08 |
| US-08 | FR-11, BR-03 | PASS | None | DB-02, DB-03, DB-04, API-07 | UI-05 | Approved through Skill 08 |
| US-09 | FR-12, FR-13 | OPEN QUESTION: OPEN-08 | None | DB-02, DB-03, API-08, API-09 | UI-06 | Approved through Skill 08 |
| US-10 | FR-14, FR-15, FR-18, BR-02, BR-08 | PASS | None | DB-03, DB-04, API-10, API-11 | UI-04, UI-06 | Approved through Skill 08 |
| US-11 | FR-16, BR-09 | PASS | None | DB-05, API-12 | UI-04 | Approved through Skill 08 |
| US-12 | FR-17, BR-10 | OPEN QUESTION: OPEN-10 | None | DB-06, API-13 | UI-04 | Approved through Skill 08 |
| US-13 | FR-19, BR-11 | OPEN QUESTION: OPEN-11 | CR-05-01 | DB-07, API-14 | UI-04, UI-05 | Approved through Skill 08 |
| US-14 | FR-20, BR-11 | OPEN QUESTION: OPEN-03, OPEN-11 | CR-05-01 | DB-01, DB-04, DB-07, API-15 | UI-05 | Approved through Skill 08 |
| US-15 | FR-21, BR-12 | OPEN QUESTION: OPEN-04 | None | DB-04, API-16 | UI-05 | Approved through Skill 08 |
| US-16 | FR-22, FR-23 | OPEN QUESTION: OPEN-07, OPEN-10 | None | DB-01, DB-02, DB-03, DB-04, API-17 | UI-07 | Approved through Skill 08 |
| US-17 | FR-24 | PASS | None | API-02 sampai API-17 role validation | UI-01, UI-08 | Approved through Skill 08 |
