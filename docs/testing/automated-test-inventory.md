# Automated Test Inventory

## Scope

Dokumen ini menjadi bukti Issue #22 untuk NFR-06 Automated Testing and CI. Inventory dicatat setelah menjalankan test lokal pada worktree Issue #22.

## Local Verification

| Command | Result |
| --- | --- |
| `npm test -- --run` | PASS: 10 test files, 41 tests |
| `npm run build` | PASS |

Catatan: percobaan pertama `npm test -- --run` gagal karena dependency worktree belum dipasang dan `vitest` belum tersedia. Setelah `npm ci`, test berjalan PASS.

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
| `tests/integration/worker-health.test.ts` | Worker health endpoint and D1 binding readiness |
| `tests/integration/request-create.test.ts` | Request creation, reporter identity, and initial status |
| `tests/integration/request-workspace.test.ts` | List, search, filter, detail, public comments, and internal notes |
| `tests/integration/admin-workflow.test.ts` | Administrator review, categorization, priority, and assignment flow |
| `tests/integration/technician-workflow.test.ts` | Technician assignment visibility and status transitions |
| `tests/integration/resolution-close-reopen.test.ts` | Reporter confirmation, close, reopen, and status history behavior |
| `tests/integration/dashboard-summary.test.ts` | Facility Manager and Administrator dashboard summary |
| `tests/integration/role-validation-states.test.ts` | Invalid role, forbidden action, invalid status transition, and UI error state |
| `tests/integration/react-foundation.test.ts` | React navigation, role context, forms, and visible application states |

## Acceptance Criteria Mapping

| Acceptance Criteria | Evidence |
| --- | --- |
| AC-NFR-06.1: CI runs test and build automatically for PRs | `.github/workflows/ci.yml` has `pull_request`, `npm test -- --run`, and `npm run build` |
| AC-NFR-06.2: At least 20 automated tests exist before final submission | Local run shows 41 automated tests |
| AC-NFR-06.3: Workflow transition or role-protected action changes are tested | `tests/integration/role-validation-states.test.ts`, `tests/integration/admin-workflow.test.ts`, `tests/integration/technician-workflow.test.ts`, and `tests/integration/resolution-close-reopen.test.ts` |
