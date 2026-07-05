# Final Deployment Evidence

| Item | Result |
| --- | --- |
| Evidence date | 2026-07-06 Asia/Makassar |
| Cloudflare URL | `https://campus-maintenance.pkaawoan24.workers.dev` |
| Worker name | `campus-maintenance` |
| Source branch | `development` |
| Final runtime commit verified | `4a61cf6` |
| D1 database | `campus-maintenance-db` |
| Deployment status | PASS |

## Public URL

```text
https://campus-maintenance.pkaawoan24.workers.dev
```

The public application opens successfully and serves the deployed Campus Service Request and Maintenance System.

## Production Health Check

URL:

```text
https://campus-maintenance.pkaawoan24.workers.dev/api/health
```

Expected result: HTTP 200 with healthy API and D1 status.

Result: PASS.

## Authentication and Session Verification

The deployed application was verified with the documented demo accounts.

| Flow | Result |
| --- | --- |
| Login page opens | PASS |
| Pelapor login succeeds | PASS |
| `/api/auth/me` returns the active session after login | PASS |
| Role dashboard opens after login | PASS |
| Remote D1 request data loads | PASS |
| Logout succeeds | PASS |
| `/api/auth/me` no longer returns an active session after logout | PASS |
| No auth configuration error appears | PASS |
| No PBKDF2 runtime error appears | PASS |

## Build and Test Evidence

| Check | Result |
| --- | --- |
| `npm test -- --run` | PASS: 16 test files, 90 tests |
| `npx tsc -b` | PASS |
| `npm run build` | PASS |
| `git diff --check` | PASS |

## D1 Remote Evidence

- Remote D1 contains demo accounts for Pelapor, Administrator, Teknisi, and Manajer Fasilitas.
- Remote D1 serves request data for dashboard and request-list views.
- No production credential or sensitive environment value is documented here.

## Known Limitation

`npm run lint` still reports baseline/pre-existing findings in older files and generated files. This does not block the current passing test suite, TypeScript build, production build, CI, or deployed application.

## Notes

- The final source of truth for production submission is the merge from `development` to `main`.
- Documentation-only changes after commit `4a61cf6` do not change backend, database schema, API contract, auth logic, role permissions, UI behavior, or business logic.

## Verifikasi GitHub Integration

Cloudflare Workers telah terhubung ke repository GitHub dengan branch `main` sebagai production branch. Deployment otomatis diverifikasi melalui perubahan dokumentasi ini. Perubahan yang telah di-merge ke `main` harus memicu Workers Builds tanpa menjalankan deployment manual dari terminal.
