# Skill 14 Acceptance Test Results

| Item | Result |
| --- | --- |
| Test date | 2026-07-02 Asia/Makassar |
| Application URL | `http://localhost:5173` |
| Browser automation | MCP Chrome DevTools |
| Specification source | `docs/requirements/requirements.md` |
| Test plan source | `docs/testing/test-plan.md` |
| Traceability source | `docs/requirements/traceability.md` |
| Request under test | `CSR-1782947480480` |
| Overall result | PASS |

## 1. Executive Summary

Acceptance testing validated the main Campus Service Request lifecycle through the browser:

`SUBMITTED -> UNDER_REVIEW -> ASSIGNED -> IN_PROGRESS -> RESOLVED -> CLOSED`

The end-to-end workflow passed without API 404/500 errors after local D1 migrations were applied. UI feedback, request list updates, detail data, status history, comments, dashboard summary, search, filters, and role switching were observed through Chrome DevTools screenshots.

Initial acceptance was blocked by one requirement-level defect:

- **DEF-14-01 / FR-17, BR-10, AC-12.2, AC-12.3:** when the active role is Pelapor, the Request Detail UI exposed the `Catatan Internal` heading and input controls. The API did not expose the saved internal note content to Pelapor, but the UI affordance itself contradicted the expected role-based visibility rule that internal notes are only for Administrator and Teknisi.

DEF-14-01 was fixed and re-tested. The final acceptance result is **PASS**.

## 2. Environment and Setup Notes

The first browser load at `http://localhost:5173` was served by a different local project (`C:\Users\Asus\campus-maintenance`). That process was stopped and the dev server for this workspace was started on port 5173.

Local D1 initially returned `D1_ERROR: no such table: service_requests`. The repository stores migrations under `database/migrations`, while `wrangler d1 migrations apply` looked for the default `migrations/` folder. The local test database was prepared by applying the SQL files in order with `wrangler d1 execute --local --file`.

After migration setup:

- `GET /api/health` returned healthy API/D1 status.
- The browser flow completed without observed API 404/500 errors.
- `npm test -- --run` passed: 13 test files, 81 tests.
- `npm run build` passed.

## 3. Evidence Files

| Evidence | What it proves |
| --- | --- |
| `evidence/skill-14-01-baseline-empty-state.png` | Healthy UI baseline, role simulator, create form, empty request list, dashboard/empty states. |
| `evidence/skill-14-02-reporter-created-submitted.png` | Pelapor creates a request; success message and list row show `SUBMITTED`. |
| `evidence/skill-14-03-reporter-detail-history-comment-area.png` | Request detail shows reporter data, lecturer priority suggestion `HIGH`, initial history, public comment area; also shows the internal-note UI defect for Pelapor. |
| `evidence/skill-14-04-admin-assigned-history-internal-note.png` | Administrator sees internal note, reviews, classifies priority, assigns technician, and status becomes `ASSIGNED`. |
| `evidence/skill-14-05-technician-resolved-history.png` | Teknisi sees assigned task, accepts, starts progress, resolves, and history records technician transitions. |
| `evidence/skill-14-06-reporter-confirmed-resolved.png` | Pelapor confirms resolved work; confirmation is stored while status remains `RESOLVED`. |
| `evidence/skill-14-07-admin-closed-full-history.png` | Administrator closes after confirmation; detail history shows complete lifecycle through `CLOSED`. |
| `evidence/skill-14-08-search-filter-dashboard-closed.png` | Dashboard after refresh shows `CLOSED=1`, `URGENT=1`; search + status + priority filters return the matching request. |
| `evidence/skill-14-09-manager-dashboard-forbidden-detail.png` | Manajer Fasilitas can view dashboard/workload source data and receives forbidden message for request detail. |
| `evidence/skill-14-10-reporter-internal-note-hidden-after-fix.png` | Re-test evidence: Pelapor detail shows public comments and status history without `Catatan Internal` section, textarea, or internal-note submit button. |
| `evidence/skill-14-11-admin-internal-note-still-visible-after-fix.png` | Re-test evidence: Administrator still sees the saved internal note and can add internal notes after the fix. |

## 4. Acceptance Scenario Results

| Scenario | Requirement / AC | Result | Evidence |
| --- | --- | --- | --- |
| AT-Pelapor-01 - Create report | FR-01, FR-02, FR-10, BR-01, AC-01.1-AC-01.3 | PASS | `skill-14-02`, `skill-14-03` |
| AT-Pelapor-02 - List/detail/search/filter | FR-03, FR-04, FR-05, FR-06, AC-02.1-AC-05.3 | PASS | `skill-14-02`, `skill-14-03`, `skill-14-08` |
| AT-Pelapor-03 - Public comment | FR-16, BR-09, AC-11.1-AC-11.2 | PASS | `skill-14-03`, `skill-14-04` |
| AT-Pelapor-04 - Confirm resolved work | FR-19, BR-11, AC-13.1-AC-13.2 | PASS | `skill-14-06` |
| AT-Admin-01 - Review submitted report | FR-07, FR-18, BR-03, AC-06.1-AC-06.2 | PASS | `skill-14-04` |
| AT-Admin-02 - Category and priority | FR-08, FR-09, FR-10, BR-04-BR-07, AC-07.1-AC-07.3 | PASS | `skill-14-04` |
| AT-Admin-03 - Assign technician | FR-11, BR-03, AC-08.1-AC-08.2 | PASS | `skill-14-04` |
| AT-Teknisi-01 - View/accept task | FR-12, FR-13, AC-09.1-AC-09.2 | PASS | `skill-14-05` |
| AT-Teknisi-02 - Progress and resolve | FR-14, FR-15, FR-18, BR-02, BR-08, AC-10.1-AC-10.3 | PASS | `skill-14-05` |
| AT-Teknisi-03 - Internal note visibility | FR-17, BR-10, AC-12.1-AC-12.3 | PASS after fix | `skill-14-10`, `skill-14-11` |
| AT-Admin-04 - Close after confirmation | FR-20, BR-11, AC-14.1-AC-14.2 | PASS | `skill-14-07` |
| AT-Manager-01 - Dashboard/workload | FR-22, FR-23, AC-16.1-AC-16.2 | PASS | `skill-14-08`, `skill-14-09` |
| AT-Manager-02 - Role-based restriction | FR-24, AC-17.1-AC-17.2 | PASS | `skill-14-09`, `skill-14-10`, `skill-14-11` |

## 5. Checker Review

Maker vs Checker result on the first run: **Checker FAIL**.

The Checker confirmed that the screenshot evidence supports the happy-path workflow:

- Reporter creates request.
- Administrator reviews, classifies, and assigns.
- Technician accepts, progresses, and resolves.
- Reporter confirms.
- Administrator closes.
- Search/filter/dashboard evidence exists.
- Manager dashboard/read-only behavior is partially supported.

The Checker rejected the first full PASS claim because `skill-14-03-reporter-detail-history-comment-area.png` and `skill-14-06-reporter-confirmed-resolved.png` show active role `Pelapor` with visible `Catatan Internal`, `Tambah Catatan Internal`, textarea, and `Simpan Catatan Internal` controls. This contradicted FR-17, BR-10, US-12, and AC-12.

Re-test after fix:

1. Pelapor detail with no internal-note content and no internal-note input controls: PASS, `skill-14-10-reporter-internal-note-hidden-after-fix.png`.
2. Administrator can still see/add internal notes: PASS, `skill-14-11-admin-internal-note-still-visible-after-fix.png`.
3. Manajer Fasilitas dashboard/read-only behavior without internal-note access: PASS, `skill-14-09-manager-dashboard-forbidden-detail.png`.

## 6. Requirement Coverage Summary

| Requirement group | Result |
| --- | --- |
| FR-01-FR-06 request creation/list/search/filter/detail | PASS |
| FR-07-FR-11 admin review/classify/assign | PASS |
| FR-12-FR-15 technician task lifecycle | PASS |
| FR-16 public comments | PASS |
| FR-17 internal notes | PASS after DEF-14-01 fix |
| FR-18 status history | PASS |
| FR-19-FR-21 confirmation/close/reopen family | PASS for confirmation and close; reopen button observed after close but reopen was not executed because requested stop condition was final `CLOSED` |
| FR-22-FR-23 dashboard/workload | PASS |
| FR-24 role-based UI/API validation | PASS |
| BR-01-BR-09, BR-11 | PASS |
| BR-10 internal note visibility | PASS after DEF-14-01 fix |
| BR-12 reopen target | NOT EXECUTED in this run; covered by automated tests per traceability |

## 7. Defect Log

| Defect ID | Severity | Requirement | Description | Evidence | Expected fix |
| --- | --- | --- | --- | --- | --- |
| DEF-14-01 | High | FR-17, BR-10, FR-24, AC-12.2, AC-12.3 | Pelapor could see the `Catatan Internal` section and input controls in request detail. | `skill-14-03-reporter-detail-history-comment-area.png`, `skill-14-06-reporter-confirmed-resolved.png` | FIXED. The internal note panel now renders only when active role is `ADMINISTRATOR` or `TECHNICIAN`; role-change communication state is cleared. Re-test evidence: `skill-14-10`, `skill-14-11`. |

## 8. Verification Commands

```text
npm test -- --run
Result: PASS, 13 test files, 81 tests

npm run build
Result: PASS
```

## 9. Final Decision

The primary end-to-end status workflow is accepted as working:

`SUBMITTED -> UNDER_REVIEW -> ASSIGNED -> IN_PROGRESS -> RESOLVED -> CLOSED`

The Skill 14 acceptance result is **PASS** after DEF-14-01 was fixed and re-tested.
