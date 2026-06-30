# Requirements Prioritization

| Review Status | Draft for Human Review |
| --- | --- |
| Skill AI | Skill 04 - Prioritization (`negotiation-and-prioritization`) |
| Human decision | Pending Human Review |

## Input Summary

Prioritization ini hanya mencakup Skill 04. Draft ini tidak membuat requirement baru, tidak mengubah FR/NFR/BR/User Story, tidak membuat design, issue planning, kode, test, deployment, change request, atau Skill 05.

| Source ID | Input File | Status Used |
| --- | --- | --- |
| PRIO-SRC-01 | `instruksi-dosen.md` | FACT / CONSTRAINT, template utama tugas |
| PRIO-SRC-02 | `CASE.md` | FACT / CONSTRAINT, studi kasus dan scope wajib |
| PRIO-SRC-03 | `docs/requirements/inception.md` | Human Reviewed & Approved |
| PRIO-SRC-04 | `docs/requirements/elicitation.md` | Human Reviewed & Approved |
| PRIO-SRC-05 | `docs/requirements/requirements.md` | Human Reviewed & Approved |
| PRIO-SRC-06 | `docs/requirements/user-stories.md` | Human Reviewed & Approved |
| PRIO-SRC-07 | `docs/requirements/traceability.md` | Human Reviewed & Approved |
| PRIO-SRC-08 | `docs/requirements/grill-session-summary.md` | Human Reviewed & Approved |
| PRIO-SRC-09 | `evidence/human-review-inception.md` | Skill 01 approved evidence |
| PRIO-SRC-10 | `evidence/human-review-elicitation.md` | Skill 02 approved evidence |
| PRIO-SRC-11 | `evidence/human-review-specification.md` | Skill 03 approved evidence |

Unresolved input gaps are preserved from Skill 03: OPEN-02, OPEN-03, OPEN-04, OPEN-05, OPEN-06, OPEN-07, OPEN-08, OPEN-10, and OPEN-11.

## Prioritization Criteria

MoSCoW categories used in this run:

- Must: indispensable for the core documented service request workflow, explicit mandatory scope from `instruksi-dosen.md` or `CASE.md`, a prerequisite for other in-scope FRs, or required by an approved business rule or CONSTRAINT.
- Should: high documented value in the approved scope, but a limited first iteration can still operate temporarily through another in-scope workflow or manual review.
- Could: documented value with lower urgency for the first prioritization baseline and no blocking dependency for core report lifecycle operation.
- Won't for now: explicitly out of current prioritization scope or deferred from this iteration. No approved FR in Skill 03 is classified as Won't for now because all FRs are in-scope requirements.

## Prioritized Functional Requirements

| FR ID | Summary | Stakeholder Evidence | Dependencies | MoSCoW | Rationale |
| --- | --- | --- | --- | --- | --- |
| FR-01 | Create service request | Student and Lecturer need to report campus facility problems; Administrator needs incoming reports to start the process. | None documented | Must | This is the entry point for the documented system objective and supports US-01 and BR-01. Without report creation, the maintenance workflow cannot operate. |
| FR-02 | Store `reporter_name` and `reporter_type` | Student and Lecturer identity data is approved in `grill-session-summary.md`; Administrator uses `reporter_type` for priority suggestion context. | Depends on FR-01 because reporter identity is stored on a created report. | Must | Approved domain decision requires these fields, and FR-10 depends on `reporter_type`. OPEN-02 affects extra identity data only, not these approved fields. |
| FR-03 | View request list | Student, Lecturer, Administrator, Teknisi, and Manajer Fasilitas need visibility into reports relevant to their work. | Depends on FR-01 because reports must exist before listing has value. | Must | Viewing stored reports is a required feature in `CASE.md` and a prerequisite for monitoring, search, filter, detail navigation, and operational workflow. |
| FR-04 | Search requests | Student, Lecturer, Administrator, Teknisi, and Manajer Fasilitas need to find specific reports. | Depends on FR-03 because search operates on the request list. | Should | Search is required scope, but the system can temporarily operate with a visible list while search is completed. It should follow the list capability. |
| FR-05 | Filter requests by status and priority | Student, Lecturer, Administrator, Teknisi, and Manajer Fasilitas need narrowed report lists. | Depends on FR-03 and the status/priority fields governed by BR-02 and BR-07. | Should | Filtering has approved value and supports operational focus, but it is not a prerequisite for creating, reviewing, assigning, or resolving reports. |
| FR-06 | View request detail | Student, Lecturer, Administrator, Teknisi, and Manajer Fasilitas need context for a selected report. | Depends on FR-01 and FR-03. Supports FR-16, FR-17, FR-18, FR-19, FR-20, and FR-21. | Must | Detail view is required for review, assignment, progress, comments, history, confirmation, close, and reopen decisions. |
| FR-07 | Review submitted request | Administrator needs to examine submitted reports before assignment. | Depends on FR-01 and FR-06. Prerequisite for FR-11 by BR-03. | Must | BR-03 requires review before assignment, so this blocks the approved workflow if missing. |
| FR-08 | Set request category | Administrator needs controlled classification of reports. | Depends on FR-07. Related to BR-06 and OPEN-05. | Must | `CASE.md` lists category determination as mandatory scope and BR-06 requires fixed-list categories. OPEN-05 affects final category values, not the need for category setting. |
| FR-09 | Set request priority | Administrator needs final priority control. | Depends on FR-07. Related to BR-04, BR-07, and OPEN-06. | Must | `CASE.md` lists priority determination as mandatory scope, and BR-04 assigns final priority decision to Administrator. OPEN-06 affects criteria details, not the need for priority setting. |
| FR-10 | Suggest Lecturer priority | Lecturer reports provide a HIGH priority suggestion; Administrator keeps final decision authority. | Depends on FR-02 and FR-09. Related to BR-05. | Should | Approved decision support improves priority consistency, but Administrator can still set priority manually while the suggestion is deferred. |
| FR-11 | Assign technician | Administrator needs to assign reviewed reports; Teknisi needs responsible work items. | Depends on FR-07, FR-08, and FR-09. Prerequisite for FR-12 and FR-13. | Must | Assignment is mandatory scope and the bridge from review to technician execution. Without it, the workflow cannot reach assigned technical work. |
| FR-12 | View assigned tasks | Teknisi needs to see tasks assigned to them. | Depends on FR-11. Prerequisite for FR-13, FR-14, and FR-15. | Must | Technician execution cannot be reliably performed if assigned tasks are not visible. This directly supports the core maintenance workflow. |
| FR-13 | Accept assigned task | Teknisi needs to accept assigned work. | Depends on FR-11 and FR-12. Related to OPEN-08. | Should | `CASE.md` documents task acceptance, but OPEN-08 leaves rejection or reassignment details unresolved. A first workflow can proceed from assignment to progress while acceptance behavior is clarified. |
| FR-14 | Update work progress | Teknisi needs to move work through progress. | Depends on FR-12. Related to BR-02 and FR-18. | Must | Status progress is required for the approved workflow from `ASSIGNED` to `IN_PROGRESS` and for transparent report tracking. |
| FR-15 | Mark work resolved | Teknisi needs to indicate completed work. | Depends on FR-14 and FR-18. Prerequisite for FR-19 and FR-20. | Must | The workflow cannot reach reporter confirmation or closure without a resolved state. |
| FR-16 | Add public comment | Student, Lecturer, Administrator, and Teknisi need visible communication about a report. | Depends on FR-06. Related to BR-09. | Should | Public comments are required scope and support communication, but the lifecycle can operate temporarily with status and detail data while comments are completed. |
| FR-17 | Add internal note | Administrator and Teknisi need private coordination notes. Student and Lecturer must not see internal notes. | Depends on FR-06 and FR-24. Related to BR-10. | Could | Internal notes have documented value, but they are not a prerequisite for the core lifecycle. Role-sensitive visibility makes this safer after role-based UI is stable. |
| FR-18 | Record status history | Student, Lecturer, Administrator, Teknisi, and Manajer Fasilitas need traceable status changes. | Depends on status-changing FRs: FR-07, FR-11, FR-14, FR-15, FR-20, FR-21. Supports FR-06. | Must | `CASE.md` requires status history, BR-08 defines required fields, and auditability is central to the project objective. |
| FR-19 | Confirm resolved work | Student and Lecturer need to confirm completed work before final closure. | Depends on FR-15 and FR-18. Prerequisite for normal FR-20 by BR-11. | Must | BR-11 requires reporter confirmation before `CLOSED` unless Administrator uses manual override. This makes confirmation part of the approved closure rule. |
| FR-20 | Close request | Administrator needs to close completed reports. | Depends on FR-15, FR-18, and FR-19 or manual override under BR-11. Related to OPEN-03 and OPEN-11. | Must | Closure is mandatory scope and finalizes the strict status workflow. OPEN-03 affects manual override conditions, not the need for closure. |
| FR-21 | Reopen request | Administrator needs to reopen reports when required. | Depends on FR-20 and FR-18. Related to BR-12 and OPEN-04. | Should | Reopen is mandatory scope, but it normally occurs after closure. OPEN-04 leaves request initiation unclear, so it should be prioritized after the normal lifecycle is stable. |
| FR-22 | View operational dashboard | Manajer Fasilitas needs a simple dashboard and report summary. Administrator also benefits from operational visibility. | Depends on FR-03 and accumulated report status/priority data. Related to OPEN-10. | Should | Dashboard is mandatory scope, but it summarizes workflow data and should follow the core report lifecycle. OPEN-10 limits detail access decisions. |
| FR-23 | View technician workload | Manajer Fasilitas and Administrator need workload visibility; Teknisi benefits from fair assignment context. | Depends on FR-11, FR-12, and report assignment data. Related to OPEN-07. | Could | Workload is approved dashboard content, but OPEN-07 leaves calculation unresolved. It should not block core report handling. |
| FR-24 | Apply role-based UI | Student, Lecturer, Administrator, Teknisi, and Manajer Fasilitas need role-appropriate actions. | Cross-cutting dependency for role-sensitive actions, especially FR-07, FR-11, FR-12, FR-16, FR-17, FR-19, FR-20, and FR-21. | Must | Approved decision requires dynamic UI by selected role. It prevents inappropriate actions and supports the no-complex-authentication approach. |

## Prioritized Non-Functional Requirements

NFRs are treated as constraints and quality priorities, not as functional requirements.

| NFR ID | Priority | Rationale |
| --- | --- | --- |
| NFR-01 | Must | React frontend is a CONSTRAINT from `instruksi-dosen.md` and `CASE.md`. |
| NFR-02 | Must | Cloudflare Workers API is a CONSTRAINT for backend implementation. |
| NFR-03 | Must | Cloudflare D1 is a CONSTRAINT for database storage. |
| NFR-04 | Must | Free Cloudflare services are a CONSTRAINT and prevent out-of-scope paid dependencies. |
| NFR-05 | Must | GitHub branch, commit, and PR workflow is required by the assignment process. |
| NFR-06 | Must | Automated testing and CI are minimum project requirements before final submission. |
| NFR-07 | Must | Traceability is required across requirements, design, issue, code, and test artifacts. |
| NFR-08 | Must | AI output must have human review evidence before being treated as final. |
| NFR-09 | Must | Secret safety is required to protect repository and deployment configuration. |

## Prioritized Business Rules

Business rules are decision constraints that influence FR priority.

| BR ID | Priority | Rationale |
| --- | --- | --- |
| BR-01 | Must | Initial `SUBMITTED` status is required for FR-01 and the strict workflow. |
| BR-02 | Must | Strict 6 statuses constrain all status-changing FRs. |
| BR-03 | Must | Review before assignment makes FR-07 a prerequisite for FR-11. |
| BR-04 | Must | Administrator owns final priority decision for FR-09. |
| BR-05 | Should | Lecturer priority suggestion supports FR-10 but does not replace Administrator judgment. |
| BR-06 | Must | Controlled category vocabulary constrains FR-08. |
| BR-07 | Must | Controlled priority values constrain FR-09. |
| BR-08 | Must | Status history fields constrain FR-18. |
| BR-09 | Should | Public comment visibility constrains FR-16. |
| BR-10 | Could | Internal note visibility constrains FR-17 and should follow role-based UI stability. |
| BR-11 | Must | Reporter confirmation or override constrains FR-19 and FR-20. |
| BR-12 | Should | Reopen target status constrains FR-21 after normal closure exists. |

## Prioritized User Stories

User Story priority follows the highest-priority FR or BR it supports.

| User Story | Supports | MoSCoW | Rationale |
| --- | --- | --- | --- |
| US-01 | FR-01, FR-02, BR-01 | Must | Entry point for report creation and approved reporter identity fields. |
| US-02 | FR-03 | Must | Required visibility for stored reports. |
| US-03 | FR-04 | Should | Search improves use of lists but follows base listing. |
| US-04 | FR-05 | Should | Filter improves operational focus but follows base listing and status/priority data. |
| US-05 | FR-06, FR-18 | Must | Detail and status history are prerequisites for review, progress, and auditability. |
| US-06 | FR-07, BR-03 | Must | Review before assignment is a mandatory workflow rule. |
| US-07 | FR-08, FR-09, FR-10, BR-04, BR-05, BR-06, BR-07 | Must | Category and priority are mandatory; lecturer suggestion is Should but contained within the story. |
| US-08 | FR-11, BR-03 | Must | Assignment is required before technician work. |
| US-09 | FR-12, FR-13 | Must | Viewing assigned tasks is Must; acceptance remains Should because OPEN-08 affects details. |
| US-10 | FR-14, FR-15, FR-18, BR-02, BR-08 | Must | Progress, resolved status, and status history are core lifecycle items. |
| US-11 | FR-16, BR-09 | Should | Public comments support communication but do not block lifecycle flow. |
| US-12 | FR-17, BR-10 | Could | Internal notes have value but are deferrable after core role and workflow behavior. |
| US-13 | FR-19, BR-11 | Must | Confirmation is required before normal closure. |
| US-14 | FR-20, BR-11 | Must | Closure completes the workflow and depends on confirmation or override. |
| US-15 | FR-21, BR-12 | Should | Reopen is in scope but follows the normal lifecycle and has unresolved trigger details. |
| US-16 | FR-22, FR-23 | Should | Dashboard is required, but workload calculation is unresolved and follows workflow data. |
| US-17 | FR-24 | Must | Role-based UI is an approved cross-cutting decision. |

## Stakeholder Conflicts and Negotiation

| Conflict ID | Affected FRs | Lecturer impact | Student impact | Administrator impact | Evidence | Trade-off | Proposed outcome | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CF-01 | FR-09, FR-10 | Lecturer reports receive a HIGH suggestion. | Student reports do not receive the same automatic suggestion. | Administrator retains final decision. | BR-04 and BR-05 from Skill 03. | Support lecturer urgency without making priority automatic or unfairly overriding Administrator judgment. | Keep FR-09 as Must and FR-10 as Should; validate priority criteria in OPEN-06. | PROPOSED |
| CF-02 | FR-19, FR-20 | Lecturer must confirm resolved work before closure unless override is used. | Student must confirm resolved work before closure unless override is used. | Administrator may need to close reports when confirmation is unavailable. | BR-11 and OPEN-03. | Balance reporter acceptance with operational need to close stalled reports. | Keep confirmation and close as Must; keep manual override conditions as OPEN QUESTION before final validation. | PROPOSED |
| CF-03 | FR-17, FR-24 | Lecturer must not see Catatan Internal as Pelapor. | Student must not see Catatan Internal as Pelapor. | Administrator needs private coordination notes. | BR-10 and approved comment visibility decision. | Private technical coordination increases value but adds access-control risk in a role simulator UI. | Make role-based UI Must and internal notes Could until role visibility is stable. | PROPOSED |
| CF-04 | FR-21 | Lecturer may want reopened reports when result is unsatisfactory. | Student may want reopened reports when result is unsatisfactory. | Administrator is documented as the actor who reopens reports. | BR-12 and OPEN-04. | Allow review of unsatisfactory results without giving undocumented direct reopen authority. | Keep reopen as Should and preserve OPEN-04 for Human Review or stakeholder clarification. | PROPOSED |
| CF-05 | FR-22, FR-23 | No documented direct dashboard interest. | No documented direct dashboard interest. | Administrator benefits from workload visibility for assignment, but calculation is unresolved. | OPEN-07, OPEN-10, and dashboard decision in `grill-session-summary.md`. | Dashboard value depends on trustworthy workload calculation and access boundaries. | Keep dashboard as Should and technician workload as Could until calculation and access are clarified. | PROPOSED |

## Dependency Analysis

| Source FR | Dependency Type | Target FR | Effect | Evidence |
| --- | --- | --- | --- | --- |
| FR-02 | Data prerequisite | FR-01 | Reporter identity is stored on a created report. | US-01, FR-02 |
| FR-03 | Data prerequisite | FR-01 | The request list displays reports that have been created and stored. | US-02 |
| FR-04 | Functional prerequisite | FR-03 | Search applies to the request list. | US-03 |
| FR-05 | Functional prerequisite | FR-03 | Filter applies to the request list. | US-04 |
| FR-06 | Functional prerequisite | FR-01, FR-03 | Detail requires created/listed reports. | US-05 |
| FR-07 | Workflow prerequisite | FR-01, FR-06 | Administrator reviews a submitted report. | BR-03, US-06 |
| FR-08 | Workflow prerequisite | FR-07 | Category is set during or after review. | US-07 |
| FR-09 | Workflow prerequisite | FR-07 | Priority is set during or after review. | BR-04, US-07 |
| FR-10 | Data and decision dependency | FR-02, FR-09 | Lecturer suggestion requires reporter type and priority decision flow. | BR-05, US-07 |
| FR-11 | Workflow prerequisite | FR-07, FR-18 | Assignment occurs after review and the status transition must be recorded. | BR-03, BR-08, US-08 |
| FR-12 | Workflow prerequisite | FR-11 | Technician task list requires assignment. | US-09 |
| FR-13 | Workflow dependency | FR-12 | Task acceptance requires visible assigned task. | US-09 |
| FR-14 | Workflow prerequisite | FR-12, FR-18 | Progress update requires assigned task visibility and status-history recording. | BR-02, BR-08, US-10 |
| FR-15 | Workflow prerequisite | FR-14, FR-18 | Resolution follows work progress and must be auditable. | BR-02, BR-08, US-10 |
| FR-16 | UI/context dependency | FR-06 | Comments attach to report detail. | US-11 |
| FR-17 | UI/context dependency | FR-06, FR-24 | Internal notes require report context and role-sensitive visibility. | BR-10, US-12 |
| FR-18 | Audit prerequisite | BR-08 | Status history must exist as an audit capability for status-changing workflow actions. | BR-08, US-05, US-10 |
| FR-19 | Workflow prerequisite | FR-15 | Confirmation follows resolved work. | BR-11, US-13 |
| FR-20 | Workflow prerequisite | FR-19 or manual override, FR-18 | Normal closure follows confirmation and must be recorded; override remains constrained by OPEN-03. | BR-08, BR-11, US-14 |
| FR-21 | Workflow dependency | FR-20, FR-18 | Reopen applies after closure or when needed and must record status history. | BR-12, US-15 |
| FR-22 | Data dependency | FR-03 | Dashboard summarizes report data. | US-16 |
| FR-23 | Data dependency | FR-11, FR-12 | Workload uses assignment and technician task data. | US-16, OPEN-07 |
| FR-24 | Cross-cutting dependency | FR-07, FR-11, FR-12, FR-16, FR-17, FR-19, FR-20, FR-21 | Role-specific actions depend on selected role behavior. | `grill-session-summary.md`, US-17 |

## Decision Log

| Decision ID | Affected IDs | Original State | Proposed Change | Rationale | Status | Decision Source |
| --- | --- | --- | --- | --- | --- | --- |
| D-04-01 | FR-01 through FR-24 | Skill 03 had no MoSCoW priorities. | Assign exactly one MoSCoW category to every FR. | Skill 04 requires transparent prioritization before validation. | PROPOSED | This Skill 04 draft |
| D-04-02 | NFR-01 through NFR-09 | Skill 03 listed NFRs without priority. | Treat all NFRs as Must constraints. | Each NFR is tied to assignment constraints, traceability, AI evidence, testing, or repository safety. | PROPOSED | `instruksi-dosen.md`, `CASE.md`, Skill 03 |
| D-04-03 | BR-01 through BR-12 | Skill 03 listed BRs without priority. | Use BRs as priority evidence and classify their urgency. | BRs determine workflow order and role constraints without changing requirement text. | PROPOSED | Skill 03 |
| D-04-04 | Out-of-scope features | Out-of-scope items are not FRs in Skill 03. | Keep upload photo, email notification, Google login, QR code room, AI category, inventory spare part, and vendor management outside Must priority. | `CASE.md` states these are not mandatory. | PROPOSED | `instruksi-dosen.md`, `CASE.md` |

No requirement wording changes are proposed in this Skill 04 draft.

## ASSUMPTIONS

1. `ASSUMPTION A-04-01`: The first prioritization baseline may sequence some mandatory-scope features as Should or Could when the approved workflow can temporarily operate without them. Validate with reviewer during Human Review Skill 04.
2. `ASSUMPTION A-04-02`: Search and filter can be implemented after base list/detail without invalidating the service request lifecycle. Validate against lecturer/reviewer expectations for "fitur wajib".
3. `ASSUMPTION A-04-03`: Internal notes can be deferred until role-based UI visibility is stable because incorrect visibility would create a higher review risk. Validate with Administrator and Teknisi.

## OPEN QUESTIONS

| ID | Question | Affected IDs | Intended Respondent | Blocking Effect |
| --- | --- | --- | --- | --- |
| OPEN-02 | Data identitas Pelapor apa saja yang wajib disimpan selain `reporter_name` dan `reporter_type`? | FR-02, US-01 | Pelapor, reviewer | Does not block FR-02 Must because approved fields are fixed; blocks extra identity detail. |
| OPEN-03 | Apa kondisi sah Administrator memakai manual override untuk menutup laporan tanpa konfirmasi Pelapor? | FR-20, US-14, BR-11 | Administrator, reviewer | Blocks final override policy, not the need for close workflow. |
| OPEN-04 | Apakah reopen hanya dapat dilakukan oleh Administrator, atau Pelapor juga dapat meminta reopen? | FR-21, US-15, BR-12 | Pelapor, Administrator, reviewer | Keeps reopen as Should pending trigger clarification. |
| OPEN-05 | Apa daftar final kategori fixed list yang akan digunakan? | FR-08, US-07, BR-06 | Administrator, reviewer | Blocks final category values, not controlled vocabulary behavior. |
| OPEN-06 | Apa kriteria prioritas `LOW`, `MEDIUM`, `HIGH`, dan `URGENT`? | FR-09, FR-10, US-07, BR-04, BR-05, BR-07 | Administrator, reviewer | Blocks detailed priority policy; priority assignment remains Must. |
| OPEN-07 | Bagaimana beban tugas per Teknisi dihitung untuk dashboard? | FR-23, US-16 | Teknisi, Manajer Fasilitas, Administrator | Keeps workload as Could until calculation is approved. |
| OPEN-08 | Apakah Teknisi boleh menolak tugas atau hanya menerima dan memperbarui tugas yang diberikan? | FR-13, US-09 | Teknisi, Administrator | Keeps acceptance/reassignment details as Should pending clarification. |
| OPEN-10 | Apakah Manajer Fasilitas hanya melihat dashboard/ringkasan, dapat membuka detail laporan, atau juga dapat melihat Catatan Internal? | FR-06, FR-17, FR-22, US-05, US-16 | Manajer Fasilitas, reviewer | Blocks dashboard/detail access boundaries. |
| OPEN-11 | Apakah enam status strict boleh memiliki sub-state non-status, seperti flag menunggu konfirmasi? | FR-19, FR-20, US-13, US-14 | Administrator, Teknisi, Pelapor, reviewer | Blocks exact representation of waiting confirmation without adding status. |

## Quality Check Results

| Check | Result | Evidence |
| --- | --- | --- |
| Coverage | PASS | FR-01 through FR-24 appear exactly once in `Prioritized Functional Requirements`. |
| Classification | PASS | Each FR has one category: Must, Should, Could, or Won't for now. |
| Evidence | PASS | Each rationale cites stakeholder need, approved source, dependency, BR, NFR, or CONSTRAINT. Unsupported sequencing notes are labeled ASSUMPTION. |
| Consistency | PASS | Priorities respect BR-01 through BR-12 and known workflow dependencies. |
| Dependency integrity | PASS | Dependency direction is explicit in the dependency table. No circular dependency is recorded. |
| Conflict visibility | PASS | Stakeholder trade-offs are listed in CF-01 through CF-05 without fabricating consensus. |
| Decision integrity | PASS | No requirement wording changes are applied or proposed as accepted. |
| Terminology | PASS | `FACT`, `ASSUMPTION`, `CONSTRAINT`, and `OPEN QUESTION` labels are preserved where relevant. |
| Clarity and testability | PASS | Rationale avoids undefined measures such as "fast" or "easy". |
| Continuity | PASS | FR, NFR, BR, US, and AC identifiers from Skill 03 are preserved for Skill 05 review later. |
