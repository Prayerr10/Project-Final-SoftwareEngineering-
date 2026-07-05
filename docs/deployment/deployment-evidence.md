# Skill 15 Deployment Evidence

| Item | Result |
| --- | --- |
| Deployment date | 2026-07-05 Asia/Makassar |
| Cloudflare URL | `https://campus-maintenance.pkaawoan24.workers.dev` |
| Worker name | `campus-maintenance` |
| Cloudflare version ID | `cdf32974-c66c-45f3-b51b-54b27559e826` |
| Source branch before final main merge | `codex/fix-submission-gaps`, based on `origin/development` |
| Deployed source commit | `1e1cf37c023f80d3eb39e4f8037117e2493a8534` |
| D1 database | `campus-maintenance-db` |
| Deployment result | PASS |

## Preconditions

- Skill 14 acceptance report is PASS after DEF-14-01 was fixed.
- Branch `codex/fix-submission-gaps` was created from latest `origin/development`.
- Application source deployed from commit `1e1cf37c023f80d3eb39e4f8037117e2493a8534`.
- Working tree contains documentation, skills, and evidence fixes for final submission readiness; no application runtime code changed after `1e1cf37`.
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

No new migration files were added for the 2026-07-05 redeploy. Production D1 already uses the migration set stored in `database/migrations/`:

1. `database/migrations/0001_initial.sql`
2. `database/migrations/0002_create_request_identity_and_history.sql`
3. `database/migrations/0003_create_technicians_and_assignments.sql`
4. `database/migrations/0004_create_request_comments_and_internal_notes.sql`
5. `database/migrations/0005_create_reporter_confirmations.sql`
6. `database/migrations/0006_enforce_request_status_priority.sql`

Result: PASS - no remote schema change required for this redeploy.

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
Current Version ID: cdf32974-c66c-45f3-b51b-54b27559e826
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

## Production Root Check

URL:

```text
https://campus-maintenance.pkaawoan24.workers.dev
```

Response:

```text
HTTP 200
Content-Type: text/html
```

Result: PASS.

## Production Smoke Test History

The 2026-07-05 redeploy used non-mutating checks only: root URL HTTP 200 and `/api/health` PASS. No new production dummy request was created.

Previous Skill 15 browser smoke test created one non-sensitive dummy request:

```text
CSR-1782948495444
```

Evidence:

- `evidence/skill-15-production-smoke-create-list.png`

Historical result: PASS.

## Notes and Follow-Up

- The production smoke request from the previous deploy is dummy non-sensitive data and can remain as demo data unless the project owner wants production D1 cleaned manually.
- Future deployment quality improvement: add `migrations_dir = "database/migrations"` or equivalent Wrangler-supported configuration if the project wants to use `wrangler d1 migrations apply` directly instead of `wrangler d1 execute --file`.
- Human review should verify that the Cloudflare URL is the final URL intended for submission.
