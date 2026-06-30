# Traceability Matrix

| Review Status | Human Reviewed Draft |
| --- | --- |
| AI assistance | Draft awal dibuat dengan bantuan AI dan diperiksa melalui sesi `grill-with-docs`, lalu diselaraskan setelah skill `03-specification` dan `05-validation-change`. |
| Human decision | Keputusan final tetap berada pada project owner. |

| Requirement | User Story | Design | Issue | Code | Test | Status |
| --- | --- | --- | --- | --- | --- | --- |
| FR-01 | US-01 | UI-01, API-01, DB-01 | TBD | `src/App.tsx`, `worker/index.ts`, `database/migrations/0001_initial.sql` | UT-01 | In Progress |
| FR-02 | US-01 | UI-01, API-01, DB-01 | TBD | TBD | TBD | Not Started |
| FR-03 | US-02 | UI-02, API-02, DB-01 | TBD | `src/App.tsx`, `worker/index.ts` | TBD | In Progress |
| FR-04 | US-03 | UI-03, API-03 | TBD | TBD | TBD | Not Started |
| FR-05 | US-04 | UI-04, API-04 | TBD | TBD | TBD | Not Started |
| FR-06 | US-05 | UI-05, API-05, DB-01 | TBD | TBD | TBD | Not Started |
| FR-07 | US-06 | UI-06, API-06, DB-03 | TBD | TBD | TBD | Not Started |
| FR-08 | US-07 | UI-07, API-07, DB-01 | TBD | TBD | TBD | Not Started |
| FR-09 | US-07 | UI-07, API-07, DB-01 | TBD | TBD | TBD | Not Started |
| FR-10 | US-08 | UI-08, API-08, DB-02 | TBD | TBD | TBD | Not Started |
| FR-11 | US-09 | UI-09, API-09, DB-03 | TBD | TBD | TBD | Not Started |
| FR-12 | US-10 | UI-10, API-10, DB-04 | TBD | TBD | TBD | Not Started |
| FR-13 | US-10 | UI-10, API-10, DB-04 | TBD | TBD | TBD | Not Started |
| FR-14 | US-05, US-06, US-08, US-09, US-11 | UI-05, API-11, DB-03 | TBD | TBD | TBD | Not Started |
| FR-15 | US-11 | UI-11, API-12, DB-03 | TBD | TBD | TBD | Not Started |
| FR-16 | US-11 | UI-11, API-13, DB-03 | TBD | TBD | TBD | Not Started |
| FR-17 | US-12 | UI-12, API-14, DB-01 | TBD | TBD | TBD | Not Started |
| FR-18 | US-12 | UI-12, API-14, DB-02 | TBD | TBD | TBD | Not Started |
| FR-19 | US-01, US-05, US-06, US-10 | UI-13 | TBD | TBD | TBD | Not Started |
| FR-20 | US-01, US-06, US-08, US-09, US-10, US-11 | API-15 | TBD | TBD | TBD | Not Started |
| NFR-01 | All | ARCH-01 | TBD | `src/App.tsx` | Build | In Progress |
| NFR-02 | All | ARCH-01 | TBD | `worker/index.ts` | Build, API health check | In Progress |
| NFR-03 | All | ARCH-01, DB-01 | TBD | `wrangler.jsonc`, `database/migrations/0001_initial.sql` | Local D1 check | In Progress |
| NFR-04 | All | DEPLOY-01 | TBD | `wrangler.jsonc` | Deployment checklist | Not Started |
| NFR-05 | All | PLAN-01 | TBD | `.github/` | GitHub inspection | In Progress |
| NFR-06 | All | TEST-01, CI-01 | TBD | `.github/workflows/ci.yml`, `vitest.config.ts` | UT-01 | In Progress |
| NFR-07 | All | TRACE-01 | TBD | `docs/requirements/traceability.md` | Traceability review | In Progress |
| NFR-08 | All | EVID-01 | TBD | `evidence/` | Human review evidence | In Progress |
| NFR-09 | All | SEC-01 | TBD | TBD | Secret scan/manual review | Not Started |

## Business Rule Links

| Business Rule | Related Requirement | Status |
| --- | --- | --- |
| BR-01 | FR-01 | In Progress |
| BR-02 | FR-07, FR-10, FR-11, FR-15, FR-16 | Not Started |
| BR-03 | FR-07, FR-10 | Not Started |
| BR-04 | FR-10 | Not Started |
| BR-05 | FR-08 | Not Started |
| BR-06 | FR-09 | Not Started |
| BR-07 | FR-14 | Not Started |
| BR-08 | FR-16 | Not Started |
| BR-09 | FR-12, FR-13 | Not Started |
| BR-10 | FR-19, FR-20 | Not Started |
| BR-11 | FR-02 | Not Started |
| BR-12 | FR-15 | Not Started |

## Test ID

| Test ID | File | Purpose |
| --- | --- | --- |
| UT-01 | `tests/unit/request-validation.test.ts` | Validates report description minimum length. |

## Notes

- Design IDs are placeholders until `docs/design/` is created.
- Issue IDs will be updated after GitHub Issues are created.
- Test IDs will expand toward the required minimum of 20 automated tests.
