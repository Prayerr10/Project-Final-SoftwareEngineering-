# Skill 15 Deployment Evidence

| Item | Result |
| --- | --- |
| Deployment date | 2026-07-02 Asia/Makassar |
| Cloudflare URL | `https://campus-maintenance.pkaawoan24.workers.dev` |
| Worker name | `campus-maintenance` |
| Cloudflare version ID | `b481daf5-b865-4830-a06c-234b8cb12d7f` |
| GitHub PR merged before deploy | PR #41, merge commit `9feba3e387338783f25ab0f561602bfa27ca39b0` |
| Deployed local tree commit | `01977677a7cd6a6a9fb9879f9f961ce7a9ca7d65` |
| D1 database | `campus-maintenance-db` |
| Deployment result | PASS |

## Preconditions

- Skill 14 acceptance report is PASS after DEF-14-01 was fixed.
- PR #41 was merged into `development`.
- Local working tree was clean before Skill 15 deployment evidence files were created.
- `npm test -- --run` passed: 13 test files, 81 tests.
- `npm run build` passed.
- Secret scan found only documentation/comment/test references to secret/token wording; no credential value was identified.

## Build

Command:

```text
npm run build
```

Result: PASS.

The build produced Worker and client bundles under `dist/`.

## Production D1 Migration

Wrangler's migration command looked for a default `migrations/` folder, while this repository stores migrations in `database/migrations/`. Remote D1 was checked before migration and only contained `_cf_KV`.

The following SQL files were applied to remote D1 in order using `wrangler d1 execute --remote --file`:

1. `database/migrations/0001_initial.sql`
2. `database/migrations/0002_create_request_identity_and_history.sql`
3. `database/migrations/0003_create_technicians_and_assignments.sql`
4. `database/migrations/0004_create_request_comments_and_internal_notes.sql`
5. `database/migrations/0005_create_reporter_confirmations.sql`
6. `database/migrations/0006_enforce_request_status_priority.sql`

Result: PASS.

Remote D1 verification after migration:

```text
request_count = 0
technician_count = 3
```

## Cloudflare Deploy

Command:

```text
npm run deploy
```

Result: PASS.

Wrangler output:

```text
Uploaded campus-maintenance
Deployed campus-maintenance triggers
https://campus-maintenance.pkaawoan24.workers.dev
Current Version ID: b481daf5-b865-4830-a06c-234b8cb12d7f
```

## Production Health Check

URL:

```text
https://campus-maintenance.pkaawoan24.workers.dev/api/health
```

Response:

```json
{"status":"healthy","service":"campus-maintenance","checks":{"api":"ok","d1":"ok"}}
```

Result: PASS.

## Production Browser Smoke Test

Browser automation: MCP Chrome DevTools.

Smoke test steps:

1. Opened `https://campus-maintenance.pkaawoan24.workers.dev`.
2. Verified the main UI loaded and displayed `API dan D1 siap digunakan`.
3. Created one non-sensitive dummy request:
   - Reporter: `Deployment Tester`
   - Title: `Deployment smoke test request`
   - Location: `Gedung Demo, Ruang Smoke`
   - Category: `Lainnya`
4. Verified the request appeared in the list as `SUBMITTED`.

Production smoke request:

```text
CSR-1782948495444
```

Evidence:

- `evidence/skill-15-production-smoke-create-list.png`

Result: PASS.

## Notes and Follow-Up

- The production smoke request is dummy non-sensitive data and can remain as demo data unless the project owner wants production D1 cleaned manually.
- Future deployment quality improvement: add `migrations_dir = "database/migrations"` or equivalent Wrangler-supported configuration if the project wants to use `wrangler d1 migrations apply` directly instead of `wrangler d1 execute --file`.
- Human review should verify that the Cloudflare URL is the final URL intended for submission.
