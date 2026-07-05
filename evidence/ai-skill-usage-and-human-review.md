# AI Skill Usage and Human Review Evidence

## Purpose

This document explains how AI assistance was used responsibly in the Campus Service Request and Maintenance System project. It records the relationship between AI-assisted work, human decisions, review findings, automated tests, GitHub Issues, Pull Requests, deployment evidence, and final accountability.

The purpose is transparency. This document does not claim that AI output was accepted automatically. Each major work product was reviewed, corrected, tested, or documented before being treated as final.

## Skill Provenance

The project used a skill-based workflow during development. That workflow included reusable external skills and project-specific internal processes. Evidence in `evidence/`, `docs/`, GitHub Issues, Pull Requests, and commit history shows repeated use of structured prompts, maker-checker review, TDD-style validation, human review, and final deployment checks.

The repository folder `skills/` now contains 15 academic skills mapped to the instructor's required Software Engineering stages. These skills are the final reusable academic process documentation for the project.

The Git history also shows that some academic skills were drafted, reviewed, or formalized after implementation work had already started. For example, implementation Issues #13 through #24 were completed through feature branches and PRs, while later commits and PRs formalized Skill 11 through Skill 15 review, test planning, automated testing, acceptance testing, and deployment documentation. Therefore, this repository does not claim that all 15 academic skills were created before coding began.

External reusable workflows, including Matt Pocock-style TDD, autonomous loops, maker-checker review, and review/checker patterns, appear in the human review evidence as process aids. They are treated as process references, not as replacement evidence for the 15 required academic skills.

The TypeUI Premium design reference is stored under `docs/design/references/typeui-premium/` as an external UI design reference. It is not counted as one of the 15 academic skills in `skills/`.

## Mapping of Academic Skills to Actual Project Evidence

| No | Academic Skill | Project Stage / Actual Evidence | Related Documents / Issue / PR / Test | Human Decision or Review |
| --- | --- | --- | --- | --- |
| 01 | Inception and Stakeholder | Problem framing, stakeholder identification, scope, assumptions, and open questions. | `docs/requirements/inception.md`, `evidence/2026-07-01-human-review-skill-01-inception.md`, PR #1. | Human review approved the inception work and kept unresolved items marked as open questions. |
| 02 | Elicitation | Follow-up questions and elicitation plan for Pelapor, Administrator, Teknisi, and Manajer Fasilitas. | `docs/requirements/elicitation.md`, `evidence/human-review-elicitation.md`, PR #2, PR #3, PR #4. | Human review refined the elicitation template and aligned it with instructor instructions. |
| 03 | Specification | Functional requirements, non-functional requirements, business rules, user stories, and acceptance criteria. | `docs/requirements/requirements.md`, `docs/requirements/user-stories.md`, `evidence/human-review-specification.md`, PR #6. | Human review approved the specification baseline and later traceability links. |
| 04 | Prioritization | Prioritized requirements and conflict/priority handling. | `docs/requirements/prioritization.md`, `evidence/human-review-prioritization.md`, PR #7. | Human review approved prioritization and preserved unresolved questions instead of inventing answers. |
| 05 | Validation and Change | Full validation of FR, NFR, BR, user stories, and change request CR-05-01. | `docs/requirements/validation.md`, `docs/requirements/change-request.md`, `evidence/human-review-validation.md`, PR #8. | Human review found incomplete draft validation and required full coverage before approval. |
| 06 | Architecture Design | Worker/React/D1 architecture, role boundaries, workflow transitions, and status rules. | `docs/design/architecture.md`, `evidence/human-review-architecture.md`, PR #10. | Human review approved the architecture and kept unresolved manager/detail access as an open question. |
| 07 | Database and API Design | D1 tables, migration plan, API endpoints, and auth API addendum. | `docs/design/database-api.md`, `database/migrations/`, `evidence/human-review-database-api.md`, PR #11, Issue #47. | Human review approved database/API design and later auth traceability updates. |
| 08 | UI Design | UI flow, role-specific views, wireframe concepts, and Premium UI reference. | `docs/design/ui-flow.md`, `docs/design/design-system.md`, `docs/design/references/typeui-premium/`, `evidence/human-review-ui-design.md`, PR #12, PR #49. | Human review approved UI design; TypeUI Premium is documented as an external reference, not an academic skill. |
| 09 | Issue Planning | Conversion of requirements into GitHub Issues and branch/PR workflow. | GitHub Issues #13-#24, `docs/requirements/traceability.md`, `evidence/human-review-planning.md`, PR #25. | Human review accepted the issue plan before implementation branches were merged. |
| 10 | Implementation | Feature implementation through issue branches for foundation, requests, admin workflow, technician workflow, comments, close/reopen, dashboard, role validation, deployment readiness, and traceability. | Issues #13-#24, PR #26-#37, `src/`, `worker/`, `database/migrations/`, `tests/integration/`, `evidence/human-review-implementation-issue-13.md` through `issue-24.md`. | Each implementation issue includes human review evidence and PASS decisions after corrections. |
| 11 | Code Review | Review of implementation work after Issues #13-#24, including adversarial checker findings. | `evidence/human-review-skill-11-code-review.md`, PR #38, `database/migrations/0006_enforce_request_status_priority.sql`, related regression tests. | Human review found Facility Manager detail leakage, role-misleading create UI, and missing D1 status/priority guards; fixes were applied and re-reviewed. |
| 12 | Test Planning | Test plan mapped FR/NFR/BR/US/AC to automated and planned tests. | `docs/testing/test-plan.md`, `evidence/human-review-skill-12-test-planning.md`, PR #39. | Human review found incomplete acceptance criteria mapping and required explicit AC coverage strategy. |
| 13 | Automated Testing | Automated integration/unit/acceptance tests and CI expansion. | `tests/`, `docs/testing/automated-test-inventory.md`, `evidence/ai-evidence/skill-13-automated-testing.md`, PR #40, GitHub Actions. | Automated tests increased to 90 tests in 16 files by final submission; CI validates test and build. |
| 14 | Acceptance Testing | Browser/screenshot evidence and acceptance checks for end-to-end workflows and UI state. | `docs/testing/acceptance-test-results.md`, `tests/acceptance/role-authorization.test.ts`, `evidence/skill-14-*.png`, PR #41, PR #42. | Human review identified internal-note visibility and verified the fix with additional evidence. |
| 15 | Deployment | Cloudflare Workers + D1 deployment, health checks, release note, and final submission evidence. | `docs/deployment/deployment-readiness.md`, `docs/deployment/deployment-evidence.md`, `docs/deployment/release-note.md`, `evidence/ai-evidence/skill-15-deployment.md`, PR #42, PR #50. | Human review and final audit confirmed URL, health check, D1, auth, tests, build, and known lint limitation. |

## AI Outputs, Risks, and Human Decisions

### Requirements and validation

AI-assisted drafts helped create inception, elicitation, requirements, prioritization, and validation artifacts. Human review found that the Skill 05 validation draft initially covered only selected functional requirements, not the full FR/NFR/BR/user-story set. The human decision was to expand validation to FR-01 through FR-24, NFR-01 through NFR-09, BR-01 through BR-12, and US-01 through US-17. Evidence: `evidence/human-review-validation.md`, `docs/requirements/validation.md`, and `docs/requirements/traceability.md`.

### Code review and scope control

The Skill 11 review used an adversarial checker process. It found that Facility Manager access to full request detail was too broad while OPEN-10 remained unresolved, that the create request UI was misleading for non-Pelapor roles, and that D1 lacked status/priority guards. The human decision was to apply scoped fixes only: forbid unsafe detail access, make create UI role-aware, and add D1 guard triggers. Evidence: `evidence/human-review-skill-11-code-review.md`, `tests/integration/role-validation-states.test.ts`, `tests/integration/react-foundation.test.ts`, and `database/migrations/0006_enforce_request_status_priority.sql`.

### Premium UI redesign

AI was used to guide a Premium UI redesign. The project separated UI/design reference work from backend, database, auth, and business logic changes. The TypeUI Premium reference is preserved under `docs/design/references/typeui-premium/`, and final hygiene work clarified that it is not one of the 15 academic skills. Evidence: `docs/design/design-system.md`, `docs/design/references/typeui-premium/README.md`, PR #49, and PR #51.

### Authentication and Cloudflare runtime risk

AI-assisted implementation added real role login, session cookies, authorization, and demo accounts. A later Cloudflare runtime issue required a PBKDF2 compatibility fix. The human decision was to verify login, `/api/auth/me`, logout, D1 demo accounts, and deployment after the fix. Evidence: Issue #47, PR #48, commit `4a61cf6`, `tests/unit/auth-password.test.ts`, `tests/integration/auth-login.test.ts`, `tests/acceptance/role-authorization.test.ts`, and `docs/deployment/release-note.md`.

### Deployment and migration handling

AI-assisted deployment evidence initially needed adjustment because Wrangler's default migration lookup did not match the repository's `database/migrations/` folder. The human decision was to run remote D1 SQL files explicitly with `wrangler d1 execute --remote --file` and document the deployment result. Evidence: `evidence/ai-evidence/skill-15-deployment.md`, `docs/deployment/deployment-evidence.md`, and `docs/deployment/deployment-readiness.md`.

### Lint limitation interpretation

Final validation recorded that `npm run lint` still reports baseline/pre-existing findings, while `npm test -- --run`, `npx tsc -b`, `npm run build`, `git diff --check`, GitHub Actions, and deployment verification pass. The human decision was to document lint honestly as a known limitation rather than silently claiming a full lint pass. Evidence: `README.md`, `docs/deployment/release-note.md`, and final audit results.

## Evidence Locations

- `skills/`: 15 academic skill definitions required by the assignment.
- `evidence/`: human review records, AI evidence summaries, acceptance screenshots, and final audit material.
- `evidence/ai-evidence/`: prompt/output/risk/revision/final summaries for skills and implementation issues.
- `docs/requirements/`: inception, elicitation, requirements, user stories, prioritization, validation, change request, and traceability.
- `docs/design/`: architecture, database/API design, UI flow, design system, and TypeUI Premium reference.
- `docs/testing/`: test plan, automated test inventory, and acceptance test results.
- `docs/deployment/`: deployment readiness, deployment evidence, release note, and submission info.
- GitHub Issues: #13 through #24 and #47 show scoped work items and final auth closure.
- Pull Requests: PR #1 through #51 show branch-based work, human review, CI, final merge, and hygiene updates.
- GitHub Actions: CI verifies test and build on PRs and branch pushes.
- Commit history: shows which skills and documents were drafted, formalized, reviewed, implemented, and merged over time.

## Transparency Limits

This repository contains final academic skill documentation and evidence summaries, but it does not contain every raw AI chat transcript from every development step. Where only final evidence summaries exist, this document identifies the available artifact rather than claiming a more detailed record.

Some academic skills were formalized after implementation had already started or after related work was completed. This is documented as a provenance limitation, not hidden. The final `skills/` folder should be read as reusable academic process documentation aligned to the instructor's required stages, not as proof that all 15 skill files existed before the first code commit.

## Final Accountability

AI assisted with drafting, review, implementation planning, testing strategy, and documentation. Final accountability remains with the student/project owner. Human decisions controlled requirement interpretation, scope boundaries, corrections to AI output, test execution, review outcomes, deployment verification, and final submission readiness.
