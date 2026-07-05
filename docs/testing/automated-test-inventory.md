# Automated Test Inventory

## Scope

Dokumen ini menjadi bukti Issue #22 untuk NFR-06 Automated Testing and CI dan diperbarui kembali pada Fase 2 setelah login role sungguhan, auth Worker, dan authorization tests ditambahkan.

## Local Verification

| Command | Result |
| --- | --- |
| `npm test -- --run` | PASS: 16 test files, 90 tests |
| `npm run build` | PASS |

Catatan: baseline Skill 11 sebelumnya lebih kecil. Setelah acceptance coverage dan Fase 2 auth ditambahkan, baseline automated test saat ini adalah 16 test files / 90 tests.

## CI Workflow

| File | Coverage |
| --- | --- |
| `.github/workflows/ci.yml` | Runs on pull request and push to `main` or `development` |
| `.github/workflows/ci.yml` | Installs dependencies with `npm ci` |
| `.github/workflows/ci.yml` | Runs `npm test -- --run` |
| `.github/workflows/ci.yml` | Runs `npm run build` |

## Test Coverage Inventory

| Test File | Main Coverage |
| --- | --- |
| `tests/unit/request-validation.test.ts` | Request payload validation and error messages |
| `tests/unit/auth-password.test.ts` | PBKDF2-SHA256 password hashing and verification helper behavior |
| `tests/integration/worker-health.test.ts` | Worker health endpoint and D1 binding readiness |
| `tests/integration/auth-login.test.ts` | Login success/failure behavior, generic error message, httpOnly cookie, and no password hash/salt leakage |
| `tests/integration/request-create.test.ts` | Request creation, reporter identity, and initial status |
| `tests/integration/request-workspace.test.ts` | List, search, filter, detail, public comments, and internal notes |
| `tests/integration/admin-workflow.test.ts` | Administrator review, categorization, priority, and assignment flow |
| `tests/integration/technician-workflow.test.ts` | Technician assignment visibility and status transitions |
| `tests/integration/resolution-close-reopen.test.ts` | Reporter confirmation, close, reopen, and status history behavior |
| `tests/integration/dashboard-summary.test.ts` | Facility Manager and Administrator dashboard summary |
| `tests/integration/deployment-readiness.test.ts` | Deployment readiness, secret-safety guardrails, and D1 status/priority guard migration |
| `tests/integration/role-validation-states.test.ts` | Invalid role, forbidden action, invalid status transition, and UI error state |
| `tests/integration/react-foundation.test.ts` | React navigation, role context, forms, and visible application states |
| `tests/integration/traceability-evidence.test.ts` | Final traceability and human-review evidence audit |
| `tests/acceptance/role-authorization.test.ts` | Actor-level authorization: roles cannot call protected endpoints for other roles even with direct URLs or forged payloads |

## Acceptance Criteria Mapping

| Acceptance Criteria | Evidence |
| --- | --- |
| AC-NFR-06.1: CI runs test and build automatically for PRs | `.github/workflows/ci.yml` has `pull_request`, `npm test -- --run`, and `npm run build` |
| AC-NFR-06.2: At least 20 automated tests exist before final submission | Local run shows 90 automated tests |
| AC-NFR-06.3: Workflow transition or role-protected action changes are tested | `tests/integration/role-validation-states.test.ts`, `tests/acceptance/role-authorization.test.ts`, `tests/integration/admin-workflow.test.ts`, `tests/integration/technician-workflow.test.ts`, and `tests/integration/resolution-close-reopen.test.ts` |
