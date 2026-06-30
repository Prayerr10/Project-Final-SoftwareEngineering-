# Traceability Matrix

| Requirement | User Story | Design | Issue | Kode | Test | Status |
| --- | --- | --- | --- | --- | --- | --- |
| FR-01 | US-01 | UI-01, API-01, DB-01 | TBD | `src/App.tsx`, `worker/index.ts`, `database/migrations/0001_initial.sql` | UT-01 | In Progress |
| FR-02 | US-02 | UI-02, API-02, DB-01 | TBD | `src/App.tsx`, `worker/index.ts` | TBD | In Progress |
| FR-03 | US-03 | UI-03, API-03 | TBD | TBD | TBD | Not Started |
| FR-04 | US-04 | UI-04, API-04 | TBD | TBD | TBD | Not Started |
| FR-05 | US-05 | UI-05, API-05 | TBD | TBD | TBD | Not Started |
| FR-06 | US-06 | UI-06, API-06 | TBD | TBD | TBD | Not Started |
| FR-07 | US-06 | UI-06, API-06 | TBD | TBD | TBD | Not Started |
| FR-08 | US-07 | UI-07, API-07 | TBD | TBD | TBD | Not Started |
| FR-09 | US-08 | UI-08, API-08 | TBD | TBD | TBD | Not Started |
| FR-10 | US-09 | UI-09, API-09 | TBD | TBD | TBD | Not Started |
| FR-11 | US-10 | UI-10, API-10, DB-02 | TBD | TBD | TBD | Not Started |
| FR-12 | US-05, US-06, US-09 | API-11, DB-03 | TBD | TBD | TBD | Not Started |
| FR-13 | US-11 | UI-11, API-12 | TBD | TBD | TBD | Not Started |
| FR-14 | US-11 | UI-11, API-13 | TBD | TBD | TBD | Not Started |
| FR-15 | US-12 | UI-12, API-14 | TBD | TBD | TBD | Not Started |
| NFR-01 | All | ARCH-01 | TBD | `src/App.tsx` | Build | In Progress |
| NFR-02 | All | ARCH-01 | TBD | `worker/index.ts` | Build | In Progress |
| NFR-03 | All | ARCH-01, DB-01 | TBD | `wrangler.jsonc`, `database/migrations/0001_initial.sql` | Local D1 check | In Progress |
| NFR-06 | All | TEST-01, CI-01 | TBD | `.github/workflows/ci.yml`, `vitest.config.ts` | UT-01 | In Progress |

## Test ID

| Test ID | File | Tujuan |
| --- | --- | --- |
| UT-01 | `tests/unit/request-validation.test.ts` | Memvalidasi deskripsi laporan minimal 20 karakter. |

## Catatan

- Kolom Issue akan diperbarui setelah GitHub Issues dibuat.
- Kolom Design akan diperbarui setelah dokumen design selesai.
- Status `In Progress` digunakan untuk requirement yang sebagian sudah diimplementasikan pada aplikasi dasar.
