# Release Note

## Release

| Item | Value |
| --- | --- |
| Release date | 2026-07-02 Asia/Makassar |
| Environment | Cloudflare Workers + D1 |
| URL | `https://campus-maintenance.pkaawoan24.workers.dev` |
| Version ID | `b481daf5-b865-4830-a06c-234b8cb12d7f` |

## Changes Released

- Completed Skill 14 acceptance testing evidence.
- Fixed internal-note role visibility so Pelapor no longer sees internal-note controls.
- Preserved Administrator and Teknisi access to internal notes.
- Verified the full status workflow from `SUBMITTED` to `CLOSED`.
- Deployed the application to Cloudflare Workers with D1 production migrations applied.

## Validation Summary

| Check | Result |
| --- | --- |
| `npm test -- --run` | PASS: 13 test files, 81 tests |
| `npm run build` | PASS |
| Remote D1 migration | PASS |
| `npm run deploy` | PASS |
| Production `/api/health` | PASS |
| Production browser smoke test | PASS |

## Known Notes

- Production contains one dummy smoke-test request: `CSR-1782948495444`.
- No secret, token, password, API key, or production credential was added to the repository.
- Human review remains required before final academic submission.
