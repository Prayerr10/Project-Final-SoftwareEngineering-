# Skill 12 Test Plan

| Review Status | Draft for Human Review |
| --- | --- |
| Work Product | `docs/testing/test-plan.md` |
| Skill AI | Skill 12 - Test Planning (`12-test-planning`) |
| Scope baseline | Implementation Issue #13 through #24 and Skill 11 Code Review on `development` |
| Reviewer | Prayer Yosua Immanuel Kaawoan |

## 1. Work Product and Scope

Dokumen ini adalah rencana pengujian Skill 12 untuk Campus Service Request and Maintenance System setelah implementasi Issue #13 sampai #24 dan Skill 11 Code Review. Fokus Skill 12 adalah strategi, cakupan, prioritas risiko, dan traceability pengujian. Dokumen ini tidak menambah fitur, tidak mengubah requirement, tidak mengubah desain, dan tidak menulis automated test besar baru.

Sumber baseline yang dibaca:

- `instruksi-dosen.md`
- `CASE.md`
- `CONTEXT.md`
- `docs/requirements/inception.md`
- `docs/requirements/requirements.md`
- `docs/requirements/user-stories.md`
- `docs/requirements/prioritization.md`
- `docs/requirements/validation.md`
- `docs/requirements/change-request.md`
- `docs/requirements/traceability.md`
- `docs/design/architecture.md`
- `docs/design/database-api.md`
- `docs/design/ui-flow.md`
- `docs/testing/automated-test-inventory.md`
- `docs/deployment/deployment-readiness.md`
- `evidence/human-review-implementation-issue-13.md` through `evidence/human-review-implementation-issue-24.md`
- `evidence/human-review-skill-11-code-review.md`
- `tests/unit`, `tests/integration`, and `tests/acceptance`

Skill 12 installed input note: the installed skill asks for `docs/requirements/specification.md`; this repository uses `docs/requirements/requirements.md` as the approved requirements specification work product, so this test plan treats `requirements.md` as the specification source.

Current automated baseline:

| Area | Baseline |
| --- | --- |
| Test command | `npm test -- --run` |
| Current result | PASS: 16 test files, 90 tests |
| Build command | `npm run build` |
| Existing unit tests | `tests/unit/request-validation.test.ts`, `tests/unit/auth-password.test.ts` |
| Existing integration tests | 13 files under `tests/integration` |
| Existing acceptance tests | `tests/acceptance/role-authorization.test.ts` plus browser acceptance evidence in `docs/testing/acceptance-test-results.md` |
| CI evidence | `.github/workflows/ci.yml` runs install, test, and build |

## 2. Test Objectives

1. Verify every FR-01 through FR-24 has at least one existing automated test or planned test scenario.
2. Verify NFR-01 through NFR-09 are covered by build, CI, deployment readiness, traceability, human review, and secret-safety checks.
3. Verify BR-01 through BR-12 are covered by workflow, authorization, validation, visibility, history, and closure/reopen scenarios.
4. Verify US-01 through US-17 acceptance criteria have positive and negative test coverage where behavior is defined.
5. Protect high-risk workflow transitions, role boundaries, D1 persistence, and traceability from regression.
6. Preserve open questions as documented test assumptions instead of inventing new requirement behavior.

## 3. Test Levels

| Test level | Purpose | Existing coverage | Planned Skill 13/14 direction |
| --- | --- | --- | --- |
| Unit test | Validate isolated payload rules, field trimming, controlled values, password hashing, and helper behavior. | `tests/unit/request-validation.test.ts`, `tests/unit/auth-password.test.ts` | Add unit tests only for reusable validation/status/auth helpers if they become separate modules. |
| Integration test | Verify Worker API, auth login, role validation, D1-like persistence behavior, workflow commands, dashboard, and deployment guardrails. | `tests/integration/*.test.ts` | Keep this as the main automated safety net for Worker and API behavior. |
| Acceptance test | Verify user-story level flows by actor. | `tests/acceptance/role-authorization.test.ts` and browser acceptance evidence in `acceptance-test-results.md`. | Add more executable actor-flow acceptance tests if manual/browser findings need regression coverage. |
| Regression test | Protect issues found during Skill 11 and high-risk workflow/role behavior. | `role-validation-states`, `deployment-readiness`, `traceability-evidence`. | Add regression tests for any future bug found in review or CI. |
| Deployment readiness test | Verify Cloudflare Worker, D1 binding, free-tier boundary, migration guidance, and build readiness. | `deployment-readiness.test.ts`, `npm run build`. | Keep deployment checklist synced with final Cloudflare URL evidence. |
| Security/secret-safety check | Verify no credential-like values are stored in tracked files and sensitive local files stay ignored. | `deployment-readiness.test.ts`; tracked-file `git grep` scan. | Repeat before PR, final deployment, and release. |

## 4. Requirement-to-Test Strategy

### 4.1 Functional Requirements

| Requirement | Priority | Strategy | Existing test file / planned scenario |
| --- | --- | --- | --- |
| FR-01 | Must | Integration and acceptance: create complete request and persist it with initial status. | `request-create.test.ts`, `react-foundation.test.ts`, planned `AT-Pelapor-01` |
| FR-02 | Must | Integration and data validation: reporter name/type required and stored. | `request-create.test.ts`, planned negative invalid reporter data |
| FR-03 | Must | Integration and UI state: list stored requests and empty state. | `request-workspace.test.ts`, `react-foundation.test.ts`, planned `AT-AllRoles-List` |
| FR-04 | Should | Integration and UI state: search hit and no-result state. | `request-workspace.test.ts` |
| FR-05 | Should | Integration and UI state: status filter, priority filter, combined filter. | `request-workspace.test.ts` |
| FR-06 | Must | Integration and acceptance: detail view, not found state, visible related data. | `request-workspace.test.ts`, `react-foundation.test.ts` |
| FR-07 | Must | Integration negative/positive: Administrator review only. | `admin-workflow.test.ts`, `role-validation-states.test.ts` |
| FR-08 | Must | Integration and data validation: category from controlled list. | `admin-workflow.test.ts`, planned invalid category scenario |
| FR-09 | Must | Integration and D1 guard: priority is one of `LOW`, `MEDIUM`, `HIGH`, `URGENT`. | `admin-workflow.test.ts`, `deployment-readiness.test.ts` |
| FR-10 | Should | Integration/UI: lecturer gets `HIGH` suggestion but Administrator decision remains final. | `request-create.test.ts`, `admin-workflow.test.ts`, `react-foundation.test.ts` |
| FR-11 | Must | Integration: assignment after review only, active technician only. | `admin-workflow.test.ts` |
| FR-12 | Must | Integration: technician sees assigned task list for active technician context. | `technician-workflow.test.ts` |
| FR-13 | Should | Integration: technician accepts assigned task; no rejection path added. | `technician-workflow.test.ts` |
| FR-14 | Must | Integration: assigned technician moves `ASSIGNED` to `IN_PROGRESS`. | `technician-workflow.test.ts`, `role-validation-states.test.ts` |
| FR-15 | Must | Integration: assigned technician moves `IN_PROGRESS` to `RESOLVED`. | `technician-workflow.test.ts`, `role-validation-states.test.ts` |
| FR-16 | Should | Integration: public comment stored and visible to allowed roles. | `request-workspace.test.ts`, `react-foundation.test.ts` |
| FR-17 | Could | Integration negative/positive: internal note visible only to Administrator/Teknisi. | `request-workspace.test.ts`, planned Facility Manager visibility check if OPEN-10 is clarified |
| FR-18 | Must | Integration: status history records required fields on status changes. | `request-create.test.ts`, `technician-workflow.test.ts`, `resolution-close-reopen.test.ts` |
| FR-19 | Must | Integration: Reporter confirms resolved work without adding a seventh status. | `resolution-close-reopen.test.ts`, `request-workspace.test.ts` |
| FR-20 | Must | Integration negative/positive: Administrator closes after confirmation or override note. | `resolution-close-reopen.test.ts` |
| FR-21 | Should | Integration: Administrator reopens to `UNDER_REVIEW` and history records it. | `resolution-close-reopen.test.ts` |
| FR-22 | Should | Integration/UI: Facility Manager and Administrator see dashboard summary. | `dashboard-summary.test.ts`, `react-foundation.test.ts` |
| FR-23 | Could | Integration: dashboard exposes technician workload source data. | `dashboard-summary.test.ts` |
| FR-24 | Must | UI/integration negative/positive: role simulator changes visible actions; Worker validates role/action server-side. | `react-foundation.test.ts`, `role-validation-states.test.ts` |

### 4.2 Non-Functional Requirements

| Requirement | Strategy | Existing test file / check |
| --- | --- | --- |
| NFR-01 | Build React frontend and verify role/UI state behavior. | `npm run build`, `react-foundation.test.ts` |
| NFR-02 | Verify Worker entrypoint, health endpoint, and API contract behavior. | `worker-health.test.ts`, integration API tests |
| NFR-03 | Verify D1 binding, migrations, and DB guard constraints. | `worker-health.test.ts`, `deployment-readiness.test.ts`, migration review |
| NFR-04 | Verify only free Cloudflare Workers, D1, and assets are required. | `deployment-readiness.test.ts`, `deployment-readiness.md` review |
| NFR-05 | Verify branch/commit/PR workflow and CI gate. | Git history, PR, `.github/workflows/ci.yml` |
| NFR-06 | Verify at least 20 automated tests and CI test/build commands. | `automated-test-inventory.md`, `npm test -- --run` reports 90 tests |
| NFR-07 | Verify traceability from requirement to design, issue, code, and test. | `traceability-evidence.test.ts`, `docs/requirements/traceability.md` |
| NFR-08 | Verify human-review evidence for AI work products. | `traceability-evidence.test.ts`, evidence files |
| NFR-09 | Verify no tracked credential values and secret handling guidance. | `deployment-readiness.test.ts`, tracked-file secret scan |

### 4.3 Business Rules

| Rule | Strategy | Existing test file / planned scenario |
| --- | --- | --- |
| BR-01 | New request always starts as `SUBMITTED`. | `request-create.test.ts` |
| BR-02 | Only six main statuses are accepted. | `deployment-readiness.test.ts`, `role-validation-states.test.ts` |
| BR-03 | Assignment requires Administrator review first. | `admin-workflow.test.ts` |
| BR-04 | Administrator owns final priority decision. | `admin-workflow.test.ts` |
| BR-05 | Lecturer priority suggestion does not override Administrator. | `request-create.test.ts`, `admin-workflow.test.ts` |
| BR-06 | Category must use controlled vocabulary. | `admin-workflow.test.ts`, planned invalid category negative |
| BR-07 | Priority must be `LOW`, `MEDIUM`, `HIGH`, or `URGENT`. | `admin-workflow.test.ts`, `deployment-readiness.test.ts` |
| BR-08 | Status history includes from/to role timestamp note. | `request-create.test.ts`, `technician-workflow.test.ts`, `resolution-close-reopen.test.ts` |
| BR-09 | Public comments visible to Pelapor, Administrator, and Teknisi. | `request-workspace.test.ts` |
| BR-10 | Internal notes visible only to Administrator and Teknisi. | `request-workspace.test.ts` |
| BR-11 | Closure requires reporter confirmation or Administrator override note. | `resolution-close-reopen.test.ts` |
| BR-12 | Reopen target is `UNDER_REVIEW`. | `resolution-close-reopen.test.ts` |

### 4.4 User Stories and Acceptance Criteria

| User story | Acceptance strategy | Existing/planned test |
| --- | --- | --- |
| US-01 | Pelapor creates complete report; system stores reporter data and `SUBMITTED`. | `request-create.test.ts`, planned `AT-Pelapor-01` |
| US-02 | All roles can view populated list and empty state. | `request-workspace.test.ts`, planned `AT-AllRoles-List` |
| US-03 | Search returns matching and no-result states. | `request-workspace.test.ts` |
| US-04 | Status/priority filters work alone and together. | `request-workspace.test.ts` |
| US-05 | Detail shows request, status history, and role-visible comments. | `request-workspace.test.ts`, `react-foundation.test.ts` |
| US-06 | Administrator reviews `SUBMITTED`; non-admin review forbidden. | `admin-workflow.test.ts`, `role-validation-states.test.ts` |
| US-07 | Administrator sets category/priority and sees lecturer suggestion. | `admin-workflow.test.ts`, `request-create.test.ts` |
| US-08 | Administrator assigns reviewed report and status becomes `ASSIGNED`. | `admin-workflow.test.ts` |
| US-09 | Technician sees and accepts assigned task. | `technician-workflow.test.ts` |
| US-10 | Technician progresses to `IN_PROGRESS`, resolves, and history is recorded. | `technician-workflow.test.ts` |
| US-11 | Public comment is stored and visible to allowed roles. | `request-workspace.test.ts` |
| US-12 | Internal note stored, visible to Admin/Teknisi, hidden from Pelapor. | `request-workspace.test.ts` |
| US-13 | Pelapor confirms `RESOLVED`; confirmation enables normal closure. | `resolution-close-reopen.test.ts` |
| US-14 | Administrator closes after confirmation or with override note. | `resolution-close-reopen.test.ts` |
| US-15 | Administrator reopens and history records transition. | `resolution-close-reopen.test.ts` |
| US-16 | Facility Manager views dashboard summary and workload source data. | `dashboard-summary.test.ts` |
| US-17 | Role-based UI actions update when role changes. | `react-foundation.test.ts`, `role-validation-states.test.ts` |

### 4.5 Acceptance Criteria Traceability

| Acceptance criteria | Requirement / story | Test file / planned scenario |
| --- | --- | --- |
| AC-01.1 | FR-01, US-01 | `request-create.test.ts`, `AT-Pelapor-01` |
| AC-01.2 | FR-01, BR-01, US-01 | `request-create.test.ts`, `AT-Pelapor-01` |
| AC-01.3 | FR-02, US-01 | `request-create.test.ts`, `AT-Pelapor-01` |
| AC-02.1 | FR-03, US-02 | `request-workspace.test.ts`, `AT-Pelapor-02`, `AT-AllRoles-List` |
| AC-02.2 | FR-03, US-02 | `request-workspace.test.ts`, `AT-AllRoles-List` |
| AC-03.1 | FR-04, US-03 | `request-workspace.test.ts` |
| AC-03.2 | FR-04, US-03 | `request-workspace.test.ts` |
| AC-04.1 | FR-05, US-04 | `request-workspace.test.ts` |
| AC-04.2 | FR-05, US-04 | `request-workspace.test.ts` |
| AC-04.3 | FR-05, US-04 | `request-workspace.test.ts` |
| AC-05.1 | FR-06, US-05 | `request-workspace.test.ts`, `react-foundation.test.ts` |
| AC-05.2 | FR-18, US-05 | `request-workspace.test.ts`, `resolution-close-reopen.test.ts` |
| AC-05.3 | FR-16, FR-17, US-05 | `request-workspace.test.ts` |
| AC-06.1 | FR-07, US-06 | `admin-workflow.test.ts`, `AT-Admin-01` |
| AC-06.2 | FR-07, BR-03, US-06 | `admin-workflow.test.ts`, `role-validation-states.test.ts` |
| AC-07.1 | FR-08, BR-06, US-07 | `admin-workflow.test.ts`, `AT-Admin-02` |
| AC-07.2 | FR-09, BR-07, US-07 | `admin-workflow.test.ts`, `deployment-readiness.test.ts`, `AT-Admin-02` |
| AC-07.3 | FR-10, BR-05, US-07 | `request-create.test.ts`, `admin-workflow.test.ts` |
| AC-08.1 | FR-11, US-08 | `admin-workflow.test.ts`, `AT-Admin-03` |
| AC-08.2 | FR-11, BR-03, US-08 | `admin-workflow.test.ts`, `AT-Admin-03` |
| AC-09.1 | FR-12, US-09 | `technician-workflow.test.ts`, `AT-Teknisi-01` |
| AC-09.2 | FR-13, US-09 | `technician-workflow.test.ts`, `AT-Teknisi-01` |
| AC-10.1 | FR-14, US-10 | `technician-workflow.test.ts`, `AT-Teknisi-02` |
| AC-10.2 | FR-15, US-10 | `technician-workflow.test.ts`, `AT-Teknisi-02` |
| AC-10.3 | FR-18, BR-08, US-10 | `technician-workflow.test.ts`, `resolution-close-reopen.test.ts` |
| AC-11.1 | FR-16, US-11 | `request-workspace.test.ts`, `AT-Pelapor-03` |
| AC-11.2 | FR-16, BR-09, US-11 | `request-workspace.test.ts`, `AT-Pelapor-03` |
| AC-12.1 | FR-17, US-12 | `request-workspace.test.ts`, `AT-Teknisi-03` |
| AC-12.2 | FR-17, BR-10, US-12 | `request-workspace.test.ts`, `AT-Teknisi-03` |
| AC-12.3 | FR-17, BR-10, US-12 | `request-workspace.test.ts`, `AT-Manager-02` negative visibility |
| AC-13.1 | FR-19, US-13 | `resolution-close-reopen.test.ts`, `AT-Pelapor-04` |
| AC-13.2 | FR-19, FR-20, BR-11, US-13 | `resolution-close-reopen.test.ts`, `AT-Admin-04` |
| AC-14.1 | FR-20, BR-11, US-14 | `resolution-close-reopen.test.ts`, `AT-Admin-04` |
| AC-14.2 | FR-20, BR-11, US-14 | `resolution-close-reopen.test.ts`, `AT-Admin-04` |
| AC-15.1 | FR-21, BR-12, US-15 | `resolution-close-reopen.test.ts`, `AT-Admin-04` |
| AC-15.2 | FR-18, FR-21, US-15 | `resolution-close-reopen.test.ts`, `AT-Admin-04` |
| AC-16.1 | FR-22, US-16 | `dashboard-summary.test.ts`, `AT-Manager-01` |
| AC-16.2 | FR-23, US-16 | `dashboard-summary.test.ts`, `AT-Manager-01`; workload formula remains OPEN-07 |
| AC-17.1 | FR-24, US-17 | `react-foundation.test.ts`, `role-validation-states.test.ts` |
| AC-17.2 | FR-24, US-17 | `react-foundation.test.ts`, `role-validation-states.test.ts` |

## 5. Risk-Based Testing Priorities

| Priority | Risk | Why it matters | Required test response |
| --- | --- | --- | --- |
| Critical | Forbidden access or invalid role can change request state. | Breaks role boundary and assessment scope. | Negative integration tests for every protected command and UI forbidden state. |
| Critical | Invalid workflow transition bypasses strict status flow. | Breaks BR-02, status history, and traceability. | Transition matrix tests and conflict/error response tests. |
| High | D1 migration or guard mismatch allows invalid status/priority. | Data can drift from requirement even if UI looks correct. | Migration review plus D1 guard tests. |
| High | Closure/reopen behavior invents a seventh status or skips confirmation/override note. | Conflicts with BR-02, BR-11, CR-05-01. | Confirmation, manual override, close, reopen integration tests. |
| High | Dashboard leaks internal notes or uses undefined workload formula as fact. | OPEN-07 and OPEN-10 must remain bounded. | Dashboard summary tests and explicit assumption review. |
| Medium | Search/filter/detail empty states regress. | Common workflow usability issue. | Integration and UI state tests. |
| Medium | Traceability/evidence becomes stale after changes. | Project grading depends on process proof. | Traceability evidence test and manual audit. |
| Medium | Secret-like values committed during deployment. | Security and NFR-09 risk. | `git grep` secret scan and deployment readiness test. |
| Low | Documentation count mismatch for tests. | Can mislead reviewers. | Keep inventory/test-plan baseline synced with Vitest output. |

## 6. Acceptance Test Scenarios by Actor

| Scenario ID | Actor | Requirement / AC | Preconditions | Steps | Expected result | Type |
| --- | --- | --- | --- | --- | --- | --- |
| AT-Pelapor-01 | Pelapor | FR-01, FR-02, BR-01, AC-01.1-AC-01.3 | Active role Pelapor. | Submit valid title, description, location, category, reporter name/type. | Request is stored with reporter identity and status `SUBMITTED`. | Acceptance |
| AT-Pelapor-02 | Pelapor | FR-03, FR-04, FR-05, FR-06, US-02-US-05 | At least one request exists. | Open list, search, filter, select detail. | Matching list/detail data displays with correct empty states when no result exists. | Acceptance |
| AT-Pelapor-03 | Pelapor | FR-16, BR-09, US-11 | Request detail is open. | Add public comment. | Comment is stored and visible as public communication. | Acceptance |
| AT-Pelapor-04 | Pelapor | FR-19, BR-11, US-13 | Request is `RESOLVED`. | Confirm result. | Confirmation record exists and status remains one of six strict statuses. | Acceptance |
| AT-Admin-01 | Administrator | FR-07, BR-03, US-06 | Request is `SUBMITTED`. | Review request. | Status becomes `UNDER_REVIEW`; history records transition. | Acceptance |
| AT-Admin-02 | Administrator | FR-08, FR-09, FR-10, US-07 | Request is under review. | Select category and priority after lecturer/student context is visible. | Controlled category and priority are stored; lecturer `HIGH` suggestion remains advisory. | Acceptance |
| AT-Admin-03 | Administrator | FR-11, BR-03, US-08 | Request is `UNDER_REVIEW`. | Assign active technician. | Assignment is stored and status becomes `ASSIGNED`. | Acceptance |
| AT-Admin-04 | Administrator | FR-20, FR-21, BR-11, BR-12 | Request is `RESOLVED` or `CLOSED`. | Close after confirmation or override; reopen if needed. | Closure follows BR-11; reopen returns to `UNDER_REVIEW`; history is appended. | Acceptance |
| AT-Teknisi-01 | Teknisi | FR-12, FR-13, US-09 | Request assigned to active technician. | Open task list and accept task. | Only assigned tasks are shown; acceptance is recorded. | Acceptance |
| AT-Teknisi-02 | Teknisi | FR-14, FR-15, FR-18, US-10 | Request is assigned and accepted. | Start progress, then resolve. | Status moves to `IN_PROGRESS`, then `RESOLVED`; history records BR-08 fields. | Acceptance |
| AT-Teknisi-03 | Teknisi | FR-16, FR-17, BR-09, BR-10 | Request detail is open. | Add public comment and internal note. | Public comment is generally visible; internal note is restricted to Administrator/Teknisi. | Acceptance |
| AT-Manager-01 | Manajer Fasilitas | FR-22, FR-23, US-16 | Requests and assignments exist. | Open dashboard. | Summary and technician workload source data display without mutating data. | Acceptance |
| AT-Manager-02 | Manajer Fasilitas | FR-24, OPEN-10 | Active role Manajer Fasilitas. | Attempt protected workflow action. | Action is hidden or rejected; no internal-note access is granted unless requirement is clarified. | Negative acceptance |

## 7. Workflow Transition Test Matrix

| Current status | Action | Actor allowed | Target status | Positive test | Negative tests |
| --- | --- | --- | --- | --- | --- |
| None | Create request | Pelapor | `SUBMITTED` | Valid report creates initial status. | Missing fields, short description, invalid reporter type, caller not allowed. |
| `SUBMITTED` | Review | Administrator | `UNDER_REVIEW` | Admin review succeeds and history records BR-08 fields. | Pelapor/Teknisi/Manager forbidden; review from non-`SUBMITTED` rejected. |
| `UNDER_REVIEW` | Classify and assign | Administrator | `ASSIGNED` | Category/priority/technician stored and status changes. | Assignment before review, invalid category, invalid priority, inactive technician, non-admin forbidden. |
| `ASSIGNED` | Accept/start work | Assigned Teknisi | `IN_PROGRESS` | Assigned technician accepts and starts work. | Wrong technician, admin/reporter/manager action, start from wrong status. |
| `IN_PROGRESS` | Resolve | Assigned Teknisi | `RESOLVED` | Resolution succeeds and history records transition. | Resolve from `ASSIGNED`, non-assigned technician, missing note if required by contract. |
| `RESOLVED` | Confirm result | Pelapor | `RESOLVED` | Confirmation stored as non-status event. | Confirmation before `RESOLVED`, non-reporter forbidden. |
| `RESOLVED` | Close after confirmation | Administrator | `CLOSED` | Close succeeds after confirmation. | Close without confirmation and without override note rejected; non-admin forbidden. |
| `RESOLVED` | Close with manual override | Administrator | `CLOSED` | Close succeeds only when override flag and note are present. | Override without note rejected; override policy remains OPEN-03. |
| `CLOSED` | Reopen | Administrator | `UNDER_REVIEW` | Reopen succeeds and history records BR-12. | Non-admin forbidden; reopen target cannot be any other status. |

## 8. Role and Authorization Negative Tests

| Protected behavior | Unauthorized role(s) | Expected result |
| --- | --- | --- |
| Review submitted report | Pelapor, Teknisi, Manajer Fasilitas | `FORBIDDEN` or UI action hidden; request unchanged. |
| Set category/priority | Pelapor, Teknisi, Manajer Fasilitas | `FORBIDDEN`; classification unchanged. |
| Assign technician | Pelapor, Teknisi, Manajer Fasilitas | `FORBIDDEN`; no assignment or status change. |
| Accept/start/resolve work | Pelapor, Administrator, Manajer Fasilitas, wrong Teknisi | `FORBIDDEN` or conflict; request unchanged. |
| Add internal note | Pelapor, Manajer Fasilitas | `FORBIDDEN`; note not stored or visible. |
| Confirm resolution | Administrator, Teknisi, Manajer Fasilitas | `FORBIDDEN`; confirmation not recorded. |
| Close/reopen | Pelapor, Teknisi, Manajer Fasilitas | `FORBIDDEN`; status unchanged. |
| Dashboard mutation | Manajer Fasilitas | No mutating dashboard action exists. |

## 9. Data Validation Tests

| Data area | Positive data | Negative data |
| --- | --- | --- |
| Request creation | Non-empty title, description, location, category, reporter name, valid reporter type. | Missing field, blank string, too-short description, invalid reporter type. |
| Category | Value from current fixed app list. | Unknown category or empty category. |
| Priority | `LOW`, `MEDIUM`, `HIGH`, `URGENT`. | Any other value, lowercase if contract is strict, blank value. |
| Status | `SUBMITTED`, `UNDER_REVIEW`, `ASSIGNED`, `IN_PROGRESS`, `RESOLVED`, `CLOSED`. | Seventh status such as `WAITING_CONFIRMATION`; skipped transition. |
| Technician | Active technician id from seed/reference data. | Missing id, inactive/unknown id, wrong assigned technician. |
| Comments/notes | Non-empty public comment/internal note where actor is allowed. | Empty text, unauthorized role, note visible to wrong role. |
| Closure | Confirmation exists or manual override note exists. | Close without confirmation and without override note. |

## 10. D1 and Database Tests

| Area | Test strategy |
| --- | --- |
| Migration order | Review migration files `0001` through `0006` apply in order and preserve required tables/columns. |
| D1 binding | `wrangler.jsonc` contains binding `DB` and Worker expects D1 environment. |
| Status/priority guard | Migration guard prevents invalid main status and priority values. |
| Status history | Every status-changing API writes `request_status_history` with BR-08 fields. |
| Assignment integrity | Assignment references a valid request and technician. |
| Comment visibility | Public comments and internal notes remain separate storage/visibility concepts. |
| Confirmation event | Reporter confirmation is stored without adding a seventh status. |
| Dashboard source | Dashboard reads request/assignment/status source data without exposing internal notes. |

## 11. UI State Tests

| UI area | States to test |
| --- | --- |
| Role simulator | Pelapor, Administrator, Teknisi, Manajer Fasilitas selected; visible actions update on role change. |
| Request form | Empty, valid input, validation error, submit success, submit failure. |
| Request list | Loading, populated, empty, search no-result, filter no-result. |
| Request detail | Selected, not found, role-visible comments, hidden internal notes, status history. |
| Workflow action panel | Available action by role/status, forbidden action hidden, conflict/error feedback. |
| Technician task view | No assignments, assigned task list, accepted task, progress/resolved feedback. |
| Dashboard | Empty data, populated summary, workload source data, read-only behavior. |
| Error state | Forbidden, invalid transition/conflict, validation error, server error. |

## 12. Deployment Readiness Checks

| Check | Method |
| --- | --- |
| Build succeeds | `npm run build` |
| Tests pass | `npm test -- --run` |
| Worker entrypoint configured | Inspect `wrangler.jsonc` and `worker/index.ts`; `worker-health.test.ts` |
| D1 binding configured | Inspect `wrangler.jsonc`; `deployment-readiness.test.ts` |
| Free-tier boundary preserved | Review `docs/deployment/deployment-readiness.md` and dependencies |
| Migration commands documented | Review deployment readiness documentation |
| GitHub Actions enabled | Review `.github/workflows/ci.yml` |
| Secret-safety scan | `git grep` tracked-file scan and `.gitignore` guard test |
| Traceability updated | Review `docs/requirements/traceability.md` and run `traceability-evidence.test.ts` |
| Human review evidence present | Review `evidence/human-review-skill-12-test-planning.md` |

## 13. Test Data Strategy

| Data set | Purpose |
| --- | --- |
| Reporter Student | Validate normal request creation and no lecturer priority suggestion. |
| Reporter Lecturer | Validate `HIGH` suggestion while final priority remains Administrator-owned. |
| Administrator | Validate review, classification, assignment, close, reopen. |
| Technician A | Validate assigned technician happy path. |
| Technician B | Validate wrong-technician forbidden/negative scenarios. |
| Facility Manager | Validate read-only dashboard and forbidden workflow mutation. |
| Request per status | Seed or create one request at each status for transition and UI state checks. |
| Comment/note pair | Validate public/internal visibility boundaries. |
| Confirmed resolved request | Validate normal close. |
| Unconfirmed resolved request | Validate close rejection or manual override note requirement. |

Open-question dependent test data remains explicitly bounded:

- OPEN-02: only `reporter_name` and `reporter_type` are mandatory until extra identity fields are approved.
- OPEN-03: manual override requires a note, but policy conditions are not invented.
- OPEN-05: category tests use the implemented fixed list; final official list remains a review item.
- OPEN-06: priority values are tested; policy criteria are not invented.
- OPEN-07: workload source data is tested; final formula remains open.
- OPEN-10: Manajer Fasilitas detail/internal-note access remains conservative and does not grant internal-note access.
- OPEN-11: confirmation remains a non-status event/marker; no seventh main status is introduced.

## 14. Entry, Exit, Suspension, and Resumption Criteria

Entry criteria:

- Requirements, user stories, validation, design, traceability, and automated test inventory are available.
- Issue #13 through #24 implementation evidence exists.
- Skill 11 code review evidence exists.
- Local dependency installation can run `npm test -- --run` and `npm run build`.

Exit criteria:

- `docs/testing/test-plan.md` covers FR-01 through FR-24, NFR-01 through NFR-09, BR-01 through BR-12, and US-01 through US-17.
- Risk-based, workflow, role-negative, data validation, D1, UI state, deployment, and secret-safety checks are documented.
- `docs/requirements/traceability.md` references Skill 12 test planning.
- `evidence/human-review-skill-12-test-planning.md` records reviewer, findings, fixes, results, and PASS decision.
- `npm test -- --run`, `npm run build`, traceability audit, inventory audit, and tracked-file secret scan pass.
- Checker/adversarial review returns PASS.

Suspension criteria:

- Requirement IDs are missing or inconsistent.
- Test/build cannot run because the repo is not installable.
- A real credential-like secret is found in tracked files.
- Draft test plan conflicts with `instruksi-dosen.md`, CASE, requirements, or design.
- A high-risk coverage gap remains unresolved.

Resumption criteria:

- Missing or inconsistent baseline documents are restored.
- Test/build dependency issue is resolved.
- Secret is removed and history handling is decided by owner if needed.
- Checker findings are fixed or documented as approved open questions.

## 15. Defect Severity Categories

| Severity | Definition | Examples |
| --- | --- | --- |
| Critical | Data integrity, authorization, secret safety, or workflow correctness is broken. | Non-admin closes request; seventh status accepted; credential committed. |
| High | Must-have requirement or acceptance criterion is missing or incorrectly tested. | FR-20 close path lacks negative test; status history missing BR-08 fields. |
| Medium | Should/Could feature or UI state coverage is incomplete but core workflow remains safe. | Search empty state not tested; dashboard workload formula noted but not executable. |
| Low | Documentation, naming, or traceability wording is unclear but not behavior-breaking. | Test inventory count not repeated in test plan. |

## 16. Traceability Matrix

| Item | Test file / planned scenario |
| --- | --- |
| FR-01, FR-02, BR-01, US-01 | `request-create.test.ts`, `react-foundation.test.ts`, `AT-Pelapor-01` |
| FR-03, FR-04, FR-05, US-02, US-03, US-04 | `request-workspace.test.ts`, `AT-Pelapor-02`, `AT-AllRoles-List` |
| FR-06, FR-18, US-05 | `request-workspace.test.ts`, `react-foundation.test.ts` |
| FR-07, BR-03, US-06 | `admin-workflow.test.ts`, `role-validation-states.test.ts`, `AT-Admin-01` |
| FR-08, FR-09, FR-10, BR-04, BR-05, BR-06, BR-07, US-07 | `admin-workflow.test.ts`, `request-create.test.ts`, `react-foundation.test.ts`, `AT-Admin-02` |
| FR-11, US-08 | `admin-workflow.test.ts`, `AT-Admin-03` |
| FR-12, FR-13, US-09 | `technician-workflow.test.ts`, `AT-Teknisi-01` |
| FR-14, FR-15, FR-18, BR-02, BR-08, US-10 | `technician-workflow.test.ts`, `role-validation-states.test.ts`, `AT-Teknisi-02` |
| FR-16, BR-09, US-11 | `request-workspace.test.ts`, `react-foundation.test.ts`, `AT-Pelapor-03`, `AT-Teknisi-03` |
| FR-17, BR-10, US-12 | `request-workspace.test.ts`, `AT-Teknisi-03`, `AT-Manager-02` negative visibility |
| FR-19, BR-11, US-13 | `resolution-close-reopen.test.ts`, `request-workspace.test.ts`, `AT-Pelapor-04` |
| FR-20, US-14 | `resolution-close-reopen.test.ts`, `AT-Admin-04` |
| FR-21, BR-12, US-15 | `resolution-close-reopen.test.ts`, `AT-Admin-04` |
| FR-22, FR-23, US-16 | `dashboard-summary.test.ts`, `react-foundation.test.ts`, `AT-Manager-01` |
| FR-24, US-17 | `react-foundation.test.ts`, `role-validation-states.test.ts`, `AT-Manager-02` |
| NFR-01 | `npm run build`, `react-foundation.test.ts` |
| NFR-02 | `worker-health.test.ts`, integration API tests |
| NFR-03 | `worker-health.test.ts`, `deployment-readiness.test.ts`, migration review |
| NFR-04 | `deployment-readiness.test.ts`, dependency/config review |
| NFR-05 | Git branch/commit/PR review, CI review |
| NFR-06 | `automated-test-inventory.md`, `.github/workflows/ci.yml`, `npm test -- --run` |
| NFR-07 | `traceability-evidence.test.ts`, `docs/requirements/traceability.md` |
| NFR-08 | Evidence files, `traceability-evidence.test.ts` |
| NFR-09 | `deployment-readiness.test.ts`, tracked-file secret scan |

## 17. Gaps, Assumptions, and Open Questions

| ID | Type | Description | Test planning response |
| --- | --- | --- | --- |
| GAP-01 | Gap | No executable file exists yet under `tests/acceptance`. | Acceptance scenarios are planned here for Skill 14; current coverage comes from integration/UI state tests. |
| GAP-02 | Gap | Category final official list remains OPEN-05. | Use implemented controlled list for tests; do not invent new category policy. |
| GAP-03 | Gap | Priority policy criteria remain OPEN-06. | Test allowed priority values and Administrator ownership, not business criteria. |
| GAP-04 | Gap | Workload formula remains OPEN-07. | Test dashboard source data and display, not a formula that is not approved. |
| GAP-05 | Gap | Manual override policy remains OPEN-03. | Test required override note; do not invent acceptable reasons. |
| GAP-06 | Gap | Manajer Fasilitas detail/internal-note access remains OPEN-10. | Keep internal notes restricted and dashboard read-only unless requirement changes. |
| GAP-07 | Gap | Confirmation waiting representation remains OPEN-11. | Treat confirmation as non-status event; verify no seventh main status. |
| ASM-01 | Assumption | Role simulator remains acceptable because full login is out of current baseline. | Test role context and server-side role validation. |
| ASM-02 | Assumption | Skill 12 does not add major automated tests. | Keep changes documentation-only unless verification blockers are found. |

## 18. Quality Checklist

| Check | Result |
| --- | --- |
| FR-01 through FR-24 covered | PASS |
| NFR-01 through NFR-09 covered | PASS |
| BR-01 through BR-12 covered | PASS |
| US-01 through US-17 covered | PASS |
| Positive and negative scenarios included | PASS |
| Actor acceptance scenarios included | PASS |
| Acceptance criteria AC-01.1 through AC-17.2 explicitly mapped | PASS |
| Workflow transition matrix included | PASS |
| Role/authorization negative tests included | PASS |
| Data validation tests included | PASS |
| D1/database tests included | PASS |
| UI state tests included | PASS |
| Deployment readiness checks included | PASS |
| Test data strategy included | PASS |
| Entry/exit/suspension/resumption criteria included | PASS |
| Defect severity categories included | PASS |
| Existing 16 test files / 90 tests recorded | PASS |
| Open questions preserved as assumptions/gaps | PASS |
| No application code changes required | PASS |

## 19. Human Review Notes

Human review should verify that this plan:

1. Covers all requirement and acceptance criteria IDs without changing their meaning.
2. Matches `instruksi-dosen.md`, CASE, requirements, design, deployment, and traceability documents.
3. Keeps Skill 12 scoped to test planning.
4. Correctly records current automated baseline as 16 test files and 90 tests.
5. Includes role validation, workflow transition, forbidden access, invalid transitions, D1 guard, dashboard, traceability, evidence, deployment readiness, and secret-safety checks.
6. Preserves open questions instead of inventing new facts.
