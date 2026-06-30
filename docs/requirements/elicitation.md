# Requirements Elicitation

| Review Status | Human Reviewed Draft |
| --- | --- |
| AI assistance | Draft awal dibuat dengan bantuan AI, diperiksa melalui sesi `grill-with-docs`, lalu dirapikan memakai skill `02-elicitation`. |
| Human decision | Keputusan final tetap berada pada project owner. |

## Input Sources

| Source ID | File | Location or Interview Item | Evidence Label |
| --- | --- | --- | --- |
| EL-SRC-01 | `docs/requirements/inception.md` | Stakeholder analysis, scope boundaries, open questions, handoff to elicitation | FACT, ASSUMPTION, CONSTRAINT, OPEN QUESTION |
| EL-SRC-02 | `CASE.md` | Case context, actors, workflow, scope, technical constraints | FACT |
| EL-SRC-03 | `instruksi-dosen.md` | Official project specification and tutorial constraints | FACT |
| EL-SRC-04 | `evidence/2026-06-30-grill-with-docs-requirements-review.md` | Human-reviewed decisions from requirements grill session | ASSUMPTION, Human Reviewed |
| EL-SRC-05 | `CONTEXT.md` | Canonical domain terms agreed during review | Human Reviewed |

## Elicitation Approach

| Technique | Target | Purpose | Rationale |
| --- | --- | --- | --- |
| Document analysis | Official case and assignment instruction | Confirm project boundaries, actors, workflow, and minimum work products | The assignment is the authoritative source for scope and constraints. |
| Structured follow-up interview | Project owner acting as human reviewer | Resolve assumptions raised during inception and grill session | The project owner makes final decisions and reviews AI output. |
| Scenario walkthrough | Pelapor, Administrator, Teknisi, Manajer Fasilitas workflows | Clarify status transitions, comments, assignments, and dashboard needs | Workflow edge cases are easier to validate through concrete scenarios. |
| Glossary review | Project vocabulary | Keep terms consistent across requirements and future design | The project uses several role and workflow terms that must not drift. |

## Findings

| Finding ID | Stakeholder | Need or Observation | Explicit/Implicit | Evidence Label | Source ID | Confidence |
| --- | --- | --- | --- | --- | --- | --- |
| EL-01 | Pelapor | Needs to create reports for campus facility problems. | Explicit | FACT | EL-SRC-02 | High |
| EL-02 | Pelapor | Needs to see report status and progress. | Explicit | FACT | EL-SRC-02 | High |
| EL-03 | Pelapor | Can add public comments and confirm work results. | Explicit | FACT | EL-SRC-02 | High |
| EL-04 | Pelapor | Should provide name and reporter type because full authentication is out of initial scope. | Implicit | ASSUMPTION | EL-SRC-04 | Medium |
| EL-05 | Administrator | Needs to review submitted reports before they proceed. | Explicit | FACT | EL-SRC-02 | High |
| EL-06 | Administrator | Needs to determine category and priority. | Explicit | FACT | EL-SRC-02 | High |
| EL-07 | Administrator | Needs to assign technicians. | Explicit | FACT | EL-SRC-02 | High |
| EL-08 | Administrator | Needs to close reports and reopen them when needed. | Explicit | FACT | EL-SRC-02 | High |
| EL-09 | Administrator | Needs manual override for closing when reporter confirmation is unavailable, with a note. | Implicit | ASSUMPTION | EL-SRC-04 | Medium |
| EL-10 | Teknisi | Needs to see assigned tasks. | Explicit | FACT | EL-SRC-02 | High |
| EL-11 | Teknisi | Needs to update work progress and mark work as resolved. | Explicit | FACT | EL-SRC-02 | High |
| EL-12 | Teknisi | May need internal notes for coordination with Administrator. | Implicit | ASSUMPTION | EL-SRC-04 | Medium |
| EL-13 | Manajer Fasilitas | Needs dashboard and summary reports. | Explicit | FACT | EL-SRC-02 | High |
| EL-14 | Manajer Fasilitas | Needs operational summary by status, category, priority, and technician workload. | Implicit | ASSUMPTION | EL-SRC-04 | Medium |
| EL-15 | Semua role | Need role-based UI and API validation while authentication is simulated. | Implicit | ASSUMPTION | EL-SRC-04 | Medium |
| EL-16 | Semua role | Need the status workflow to remain limited to six official statuses. | Explicit | FACT | EL-SRC-03 | High |
| EL-17 | Semua role | Need status history to record status origin, target status, role, note, and timestamp. | Implicit | ASSUMPTION | EL-SRC-04 | Medium |
| EL-18 | Semua role | Search should target report number, title, location, and category; filtering should support combinations. | Implicit | ASSUMPTION | EL-SRC-04 | Medium |

## Conflicts and Dependencies

| Item ID | Related Finding IDs | Description | Status |
| --- | --- | --- | --- |
| EL-C-01 | EL-04, EL-15 | Authentication is out of initial scope, but the system still needs role-based behavior. | Resolved by role simulation, pending final validation. |
| EL-C-02 | EL-06, EL-18 | Categories need consistency for filtering, but the case does not require a database table for categories. | Resolved as controlled vocabulary, pending design confirmation. |
| EL-C-03 | EL-08, EL-09, EL-16 | Closing, confirmation, manual override, and reopen could create extra statuses if not controlled. | Resolved by keeping six statuses and treating those items as actions or metadata. |
| EL-C-04 | EL-07, EL-14 | Technician assignment affects dashboard and database design. | Dependency for database/API design. |
| EL-C-05 | EL-12, EL-15 | Internal notes require visibility rules by role. | Dependency for API and UI validation. |

## Information Gaps and Follow-up Questions

| Question ID | Target Stakeholder | Related Finding ID | Question | Technique | Status |
| --- | --- | --- | --- | --- | --- |
| EL-Q-01 | Pelapor | EL-02 | Should a Pelapor see all reports or only reports they created? | Follow-up interview | OPEN QUESTION |
| EL-Q-02 | Pelapor | EL-03 | What exact action should count as confirming work results? | Scenario walkthrough | Human reviewed, needs final wording |
| EL-Q-03 | Administrator | EL-09 | In what conditions may Administrator close a report using manual override? | Scenario walkthrough | Human reviewed, needs final wording |
| EL-Q-04 | Teknisi | EL-12 | What information should be visible in internal notes? | Follow-up interview | OPEN QUESTION |
| EL-Q-05 | Manajer Fasilitas | EL-14 | Which dashboard summary is the minimum acceptable for first release? | Follow-up interview | Human reviewed, needs final wording |
| EL-Q-06 | Administrator | EL-07 | What minimum technician data is needed for assignment and specialization? | Document analysis and follow-up interview | Human reviewed, needs final wording |
| EL-Q-07 | Project owner | EL-15 | Should simulated role be presented as known limitation in README and deployment documentation? | Document review | OPEN QUESTION |

## Constraints

| Item ID | CONSTRAINT | Source ID |
| --- | --- | --- |
| EL-CON-01 | Must use React for frontend. | EL-SRC-03 |
| EL-CON-02 | Must use Cloudflare Workers for backend/API. | EL-SRC-03 |
| EL-CON-03 | Must use Cloudflare D1 for database. | EL-SRC-03 |
| EL-CON-04 | Must deploy to Cloudflare without paid services. | EL-SRC-03 |
| EL-CON-05 | Must use GitHub for repository and planning. | EL-SRC-03 |
| EL-CON-06 | Must document AI usage, human review, traceability, tests, and deployment. | EL-SRC-03 |
| EL-CON-07 | Must not treat AI output as final without human review. | EL-SRC-03 |
| EL-CON-08 | Production deployment and remote migration should wait until requirements and design are sufficiently ready. | EL-SRC-01 |

## Assumptions Requiring Validation

| Item ID | ASSUMPTION | Source ID | Validation Question |
| --- | --- | --- | --- |
| EL-A-01 | Simulated roles are acceptable for initial scope. | EL-SRC-04 | Should this be documented as a known limitation and accepted change request? |
| EL-A-02 | Technicians should be stored as a simple database entity. | EL-SRC-04 | What fields are mandatory for technician records? |
| EL-A-03 | Dashboard should include technician workload in addition to status, category, and priority counts. | EL-SRC-04 | Is technician workload required for first release or a high-value extension? |
| EL-A-04 | Public comments and internal notes need separate visibility rules. | EL-SRC-04 | Which roles can create and view each comment type? |
| EL-A-05 | Reporter data can be stored directly on reports for the initial scope. | EL-SRC-04 | Should reporter normalization be listed only as roadmap? |
| EL-A-06 | Search and filter can be combined in the report list. | EL-SRC-04 | Which combinations must be tested for first release? |

## Elicitation Summary

- Confirmed findings:
  - The system serves Pelapor, Administrator, Teknisi, and Manajer Fasilitas.
  - The core workflow follows the official six statuses only.
  - Upload photo, email notification, Login Google, QR code, AI category, inventory, and vendor management are not required for initial scope.
  - Role simulation is accepted for initial scope through human review.
  - Technician assignment, status history, comments/notes, search/filter, and dashboard need more detailed specification.
- Unresolved OPEN QUESTION items:
  - Visibility of reports for Pelapor.
  - Exact wording of confirmation, manual override, internal notes, dashboard minimum, and role simulation limitation.
  - Whether optional roadmap features stay documentation-only.
- Handoff notes for Skill 3:
  - Convert confirmed findings into functional requirements, non-functional requirements, business rules, user stories, and acceptance criteria.
  - Keep assumptions visibly marked unless already accepted by human review.
  - Do not introduce out-of-scope features as required items.
  - Preserve the six official status values and controlled vocabularies.
