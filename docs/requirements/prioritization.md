# Requirements Prioritization

| Review Status | Human Reviewed Draft |
| --- | --- |
| AI assistance | Draft awal dibuat dengan bantuan AI, diperiksa melalui sesi `grill-with-docs`, lalu dirapikan memakai skill `04-prioritization`. |
| Human decision | Keputusan final tetap berada pada project owner. |

## Input Summary

| Input | Scope Used | Notes |
| --- | --- | --- |
| `docs/requirements/requirements.md` | FR-01 through FR-20, NFRs, business rules, open questions | All FR IDs are unique and sequential. |
| `docs/requirements/user-stories.md` | US-01 through US-12 and acceptance criteria | Stories provide stakeholder value and testable outcomes. |
| `docs/requirements/elicitation.md` | Stakeholder findings, constraints, assumptions, conflicts | Used for evidence and dependency rationale. |
| `CASE.md` and `instruksi-dosen.md` | Official scope and assignment constraints | Used to distinguish required scope from future enhancements. |

Decision scope: prioritize the first complete implementation baseline before design, GitHub Issues, TDD implementation, testing expansion, and deployment.

Unresolved input gaps:

- `OPEN QUESTION`: Whether Pelapor sees all reports or only their own.
- `OPEN QUESTION`: Whether role simulation is always documented as a known limitation.
- `OPEN QUESTION`: Whether roadmap features are documentation-only or partially implemented if time remains.

## Prioritization Criteria

- **Must**: Required by official assignment scope, necessary for the core workflow, or a prerequisite for testing, traceability, deployment, or role-safe operation.
- **Should**: High value and supported by human review, but a first release can still satisfy official minimum scope with a simpler version.
- **Could**: Useful enhancement with documented value but not required for the first implementation baseline.
- **Won't (this iteration)**: Explicitly out of initial scope or deferred to roadmap; not rejected permanently.

## Prioritized Functional Requirements

| FR ID | Summary | Stakeholder Evidence | Dependencies | MoSCoW | Rationale |
| --- | --- | --- | --- | --- | --- |
| FR-01 | Create service request | Pelapor need in EL-01 | None | Must | Creating reports is the entry point of the official case workflow. |
| FR-02 | Store reporter data | Pelapor assumption in EL-04 | FR-01 | Must | Role simulation removes full authentication, so reports still need reporter identity fields for review and confirmation. |
| FR-03 | View request list | Multi-role evidence in EL-02, EL-05, EL-10, EL-13 | FR-01 | Must | Users cannot monitor or process reports if stored reports cannot be listed. |
| FR-04 | Search requests | Search finding in EL-18 | FR-03 | Must | Searching is explicitly included in the assignment's required features. |
| FR-05 | Filter requests | Filter finding in EL-18 | FR-03 | Must | Filtering is explicitly included in the assignment's required features and supports operational review. |
| FR-06 | View request detail | Multi-role evidence in EL-02, EL-10, EL-13 | FR-03 | Must | Detail is required before review, assignment, comments, status history, and closure can be understood. |
| FR-07 | Review submitted request | Administrator need in EL-05 | FR-01, FR-03, FR-06 | Must | Administrator review is the first processing step after submission in the official workflow. |
| FR-08 | Set category | Administrator need in EL-06 | FR-07 | Must | Category management is explicitly required and supports filtering/dashboard. |
| FR-09 | Set priority | Administrator need in EL-06 | FR-07 | Must | Priority management is explicitly required before organized technician assignment. |
| FR-10 | Assign technician | Administrator and Teknisi evidence in EL-07, EL-C-04 | FR-07, FR-08, FR-09 | Must | Technician assignment is core workflow and unlocks technician progress updates. |
| FR-11 | Update work status | Teknisi need in EL-11 | FR-10, FR-14 | Must | The official workflow requires progress updates through in-progress and resolved states. |
| FR-12 | Add public comment | Pelapor comment evidence in EL-03 | FR-06 | Must | Comments are explicitly required and support communication around reports. |
| FR-13 | Add internal note | Technician/Admin coordination in EL-12, EL-C-05 | FR-06, FR-19, FR-20 | Must | The assignment says komentar atau catatan; internal notes make the "catatan" portion testable and role-aware. |
| FR-14 | Record status history | Audit trail evidence in EL-17 | FR-07, FR-10, FR-11, FR-15, FR-16 | Must | Status history is explicitly required and is a prerequisite for workflow traceability tests. |
| FR-15 | Close request | Administrator close evidence in EL-08, EL-09 | FR-11, FR-14 | Must | Closing is the final official workflow step. |
| FR-16 | Reopen request | Reopen evidence in EL-08, EL-C-03 | FR-15, FR-14 | Must | The assignment explicitly includes closing or reopening reports. |
| FR-17 | Show operational dashboard | Manager need in EL-13 | FR-03 | Must | A simple dashboard is explicitly required by the assignment. |
| FR-18 | Show technician workload | Manager operational assumption in EL-14 | FR-10, FR-17 | Should | Technician workload improves dashboard value, but FR-17 can satisfy the simplest required dashboard first. |
| FR-19 | Apply role-based UI | Role simulation evidence in EL-15 | FR-01 through FR-18 | Must | Without role-based UI, simulated roles would not demonstrate actor-specific workflow clearly. |
| FR-20 | Apply role-based API validation | Role simulation evidence in EL-15 | FR-01 through FR-18 | Must | Frontend-only role checks are insufficient for a credible workflow; API validation makes role behavior testable. |

## Stakeholder Conflicts and Negotiation

| Conflict ID | Affected FRs | Pelapor impact | Administrator impact | Teknisi impact | Manajer Fasilitas impact | Evidence | Trade-off | Proposed outcome | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CF-01 | FR-02, FR-19, FR-20 | No full login, but still identifies reporter data | Can process reports without account management | No direct impact | No direct impact | EL-C-01, EL-A-01 | Avoid authentication scope while preserving role behavior | Use role simulation plus reporter fields | ACCEPTED |
| CF-02 | FR-13, FR-19, FR-20 | Internal notes are hidden from Pelapor | Gains coordination space | Gains coordination space | No direct impact | EL-C-05, BR-09 | Balance transparency with operational coordination | Separate public comments and internal notes | ACCEPTED |
| CF-03 | FR-15, FR-16 | Confirmation protects reporter feedback | Manual override supports operational closure | No direct impact | Dashboard remains clean if statuses stay controlled | EL-C-03 | Avoid extra statuses while supporting real closure cases | Store confirmation/override/reopen as action or metadata | ACCEPTED |
| CF-04 | FR-17, FR-18 | No direct impact | Assignment data must be clean | Workload is visible | Better operational monitoring | EL-C-04, EL-A-03 | More dashboard value adds design and testing work | Prioritize basic dashboard as Must and workload as Should | PROPOSED |

## Dependency Analysis

| Source FR | Dependency Type | Target FR | Effect | Evidence |
| --- | --- | --- | --- | --- |
| FR-03 | Data prerequisite | FR-01 | Lists need stored reports. | EL-01, EL-02 |
| FR-04 | UI/API prerequisite | FR-03 | Search works on the request list. | EL-18 |
| FR-05 | UI/API prerequisite | FR-03 | Filters work on the request list. | EL-18 |
| FR-06 | UI prerequisite | FR-03 | Detail view is reached from a selected report. | US-05 |
| FR-07 | Workflow prerequisite | FR-01, FR-06 | Review starts after report submission and detail inspection. | EL-05 |
| FR-10 | Workflow prerequisite | FR-07, FR-08, FR-09 | Assignment follows review, category, and priority decisions. | EL-07 |
| FR-11 | Workflow prerequisite | FR-10 | Technician updates depend on assignment. | EL-10, EL-11 |
| FR-14 | Audit prerequisite | FR-07, FR-10, FR-11, FR-15, FR-16 | Status-changing actions must create history. | EL-17 |
| FR-15 | Workflow prerequisite | FR-11, FR-14 | Closure follows resolution and records status history. | EL-08, EL-09 |
| FR-16 | Workflow prerequisite | FR-15, FR-14 | Reopen applies after closure and must record history. | EL-C-03 |
| FR-18 | Analytics prerequisite | FR-10, FR-17 | Workload dashboard depends on technician assignments. | EL-C-04 |
| FR-19 | Access prerequisite | FR-01 through FR-18 | UI actions depend on active role. | EL-15 |
| FR-20 | Access prerequisite | FR-01 through FR-18 | API actions must enforce active role. | EL-15 |

## Decision Log

| Decision ID | Affected IDs | Original State | Proposed Change | Rationale | Status | Decision Source |
| --- | --- | --- | --- | --- | --- | --- |
| D-01 | FR-19, FR-20 | Authentication unresolved | Use role simulation with UI and API validation | Login Google is not required, but role behavior is central to the workflow. | ACCEPTED | Human review in grill session |
| D-02 | FR-18 | Dashboard initially simple | Include technician workload as Should | Valuable for Manajer Fasilitas but not required to satisfy the simplest dashboard. | PROPOSED | Human review in grill session |
| D-03 | Roadmap | Suggested priority considered as requirement | Move suggested priority to future enhancement | Avoid scope creep and keep Administrator decision authority. | ACCEPTED | Human review in grill session |
| D-04 | Status workflow | Confirmation/reopen/override could become statuses | Keep six official statuses only | Preserves official workflow and simplifies automated tests. | ACCEPTED | Human review in grill session |

## ASSUMPTIONS

- `ASSUMPTION A-01`: Role simulation remains acceptable for final submission if documented as accepted change request and known limitation. Validation owner: project owner.
- `ASSUMPTION A-02`: Technician workload can be implemented after the basic dashboard without violating the required dashboard feature. Validation method: design review.
- `ASSUMPTION A-03`: Pelapor visibility rules can be finalized during UI/API design without changing core FR wording. Validation method: stakeholder review.

## OPEN QUESTIONS

- `OPEN QUESTION OQ-01`: Should Pelapor see all reports or only reports they created? Affects FR-03, FR-04, FR-05, FR-06, FR-19, FR-20. Intended respondent: project owner. Blocking effect: role-based visibility details.
- `OPEN QUESTION OQ-02`: Should role simulation be documented as a known limitation in README and deployment docs? Affects FR-19, FR-20, NFR-08. Intended respondent: project owner. Blocking effect: final documentation wording.
- `OPEN QUESTION OQ-03`: Are roadmap items documentation-only unless all Must and Should items are complete? Affects future enhancement scope. Intended respondent: project owner. Blocking effect: final roadmap wording.

## Future Enhancement

| Feature | Decision |
| --- | --- |
| Upload foto | Won't (this iteration); explicitly not required. |
| Email notification | Won't (this iteration); explicitly not required. |
| Login Google | Won't (this iteration); explicitly not required. |
| QR code ruangan | Won't (this iteration); explicitly not required. |
| AI untuk menentukan kategori | Won't (this iteration); explicitly not required. |
| Inventory spare part | Won't (this iteration); explicitly not required. |
| Vendor management | Won't (this iteration); explicitly not required. |
| Suggested priority | Could in future roadmap; not part of first implementation baseline. |
| SLA tracking | Could in future roadmap after workflow and status history are stable. |
| Personalized dashboard | Could in future roadmap if reporter data is normalized later. |

## Quality Check Results

| Check | Result | Evidence |
| --- | --- | --- |
| Coverage | Pass | FR-01 through FR-20 appear exactly once. |
| Classification | Pass | Every FR has one MoSCoW category. |
| Evidence | Pass | Rationales cite stakeholder findings, dependencies, assignment constraints, or human-reviewed assumptions. |
| Consistency | Pass | Workflow-related priorities follow six official statuses and accepted role simulation decision. |
| Dependency integrity | Pass | Dependency direction is listed for workflow, dashboard, and access-control requirements. |
| Conflict visibility | Pass | Role simulation, internal notes, close/reopen, and dashboard workload trade-offs are documented. |
| Decision integrity | Pass | Suggested priority was moved to future enhancement through an accepted decision. |
| Terminology | Pass | Uses project stakeholders from reviewed elicitation: Pelapor, Administrator, Teknisi, Manajer Fasilitas. |
| Clarity and testability | Pass | Rationale avoids unsupported deadlines or cost claims. |
| Continuity | Pass | FR IDs are preserved for validation and traceability. |
