# Requirements Validation

| Review Status | Human Review Pending |
| --- | --- |
| Skill AI | Skill 05 - Validation dan Change (`requirements-validation-change-management`) |
| Human decision | Pending |

## Validation Scope

- Inputs reviewed: `instruksi-dosen.md`, `CASE.md`, `docs/requirements/inception.md`, `docs/requirements/elicitation.md`, `docs/requirements/requirements.md`, `docs/requirements/user-stories.md`, `docs/requirements/prioritization.md`, `docs/requirements/traceability.md`, `docs/requirements/grill-session-summary.md`, `evidence/human-review-inception.md`, `evidence/human-review-elicitation.md`, `evidence/human-review-specification.md`, and `evidence/human-review-prioritization.md`.
- Prerequisite review status: Skill 01, Skill 02, Skill 03, and Skill 04 are recorded as `Human Reviewed & Approved`, with evidence decisions marked `Disetujui`.
- Selection rationale: Validation focuses on high-priority and higher-risk items from Skill 04, including core lifecycle requirements, controlled categories/priorities, reporter confirmation, close/reopen rules, dashboard workload, and role-based UI. These items were selected because they affect required scope, business rules, acceptance criteria, open questions, and future design/planning decisions.
- Baseline rule: This document validates existing requirements and proposes corrections only as validation findings. It does not directly change FR, NFR, BR, User Story, or Acceptance Criteria text.

## Validation Results

### FR-01

- Original statement: Sistem harus memungkinkan Pelapor membuat laporan masalah fasilitas kampus.
- Related artifacts: US-01; AC-01.1, AC-01.2, AC-01.3; BR-01; Priority Must.
- Clarity: PASS - Actor `Pelapor`, behavior `membuat laporan`, and object `laporan masalah fasilitas kampus` are explicit in `docs/requirements/requirements.md`.
- Completeness: PASS - US-01 and AC-01.1 through AC-01.3 define complete report submission, storage, initial status, and reporter identity storage.
- Consistency: PASS - Matches mandatory feature "Membuat laporan baru" in `instruksi-dosen.md` and status rule BR-01.
- Feasibility: PASS - No unsupported technology claim; implementation remains within React, Workers, and D1 constraints.
- Testability: PASS - AC-01.1 through AC-01.3 define observable storage, `SUBMITTED` status, and `reporter_name`/`reporter_type` persistence.
- Traceability: PASS - Linked in `traceability.md` to US-01 and in Skill 04 as Must.
- Proposed revision: None.
- Revision rationale: None.
- Affected artifacts: None.

### FR-08

- Original statement: Sistem harus memungkinkan Administrator menentukan kategori laporan dari fixed list sebagai controlled vocabulary.
- Related artifacts: US-07; AC-07.1; BR-06; OPEN-05; Priority Must.
- Clarity: PASS - Actor, behavior, and controlled-vocabulary boundary are explicit.
- Completeness: OPEN QUESTION - OPEN-05 states the final fixed category list is not yet defined.
- Consistency: PASS - Consistent with `instruksi-dosen.md`, `CASE.md`, and `grill-session-summary.md`, which require category assignment and fixed-list categories.
- Feasibility: PASS - A fixed list is feasible within the documented web application constraints.
- Testability: OPEN QUESTION - AC-07.1 is testable for fixed-list behavior, but final category values cannot be fully verified until OPEN-05 is resolved.
- Traceability: PASS - Linked to US-07, AC-07.1, BR-06, and Skill 04 Must priority.
- Proposed revision: None.
- Revision rationale: Final category values require reviewer or stakeholder decision; this validation cannot invent the list.
- Affected artifacts: OPEN-05; future database/API/UI design.

### FR-09

- Original statement: Sistem harus memungkinkan Administrator menentukan prioritas laporan.
- Related artifacts: US-07; AC-07.2; BR-04, BR-07; OPEN-06; Priority Must.
- Clarity: PASS - Actor and action are explicit.
- Completeness: OPEN QUESTION - OPEN-06 states the criteria for `LOW`, `MEDIUM`, `HIGH`, and `URGENT` are not yet defined.
- Consistency: PASS - Consistent with mandatory feature "Menentukan prioritas", BR-04, and BR-07.
- Feasibility: PASS - Priority selection with controlled values is feasible under the current constraints.
- Testability: PASS - AC-07.2 can verify storage of allowed values. Criteria quality remains an OPEN QUESTION but does not block basic value verification.
- Traceability: PASS - Linked to US-07, AC-07.2, BR-04, BR-07, and Skill 04 Must priority.
- Proposed revision: None.
- Revision rationale: Priority criteria need stakeholder clarification, but the existing requirement remains valid.
- Affected artifacts: OPEN-06; future UI copy, validation rules, and test cases.

### FR-13

- Original statement: Sistem harus memungkinkan Teknisi menerima tugas yang diberikan.
- Related artifacts: US-09; AC-09.2; OPEN-08; Priority Should.
- Clarity: PASS - Actor `Teknisi` and action `menerima tugas` are explicit.
- Completeness: OPEN QUESTION - OPEN-08 states whether Teknisi may reject tasks, request reassignment, or only accept/update tasks remains unresolved.
- Consistency: PASS - Consistent with `CASE.md`, which says Teknisi can accept tasks.
- Feasibility: PASS - Task acceptance can be represented without adding out-of-scope services.
- Testability: PASS - AC-09.2 provides an observable result: the system records that a task has been accepted.
- Traceability: PASS - Linked to US-09 and Skill 04 Should priority.
- Proposed revision: None.
- Revision rationale: No revision is supported until OPEN-08 is answered.
- Affected artifacts: OPEN-08; future assignment workflow and technician task UI.

### FR-18

- Original statement: Sistem harus menyimpan riwayat perubahan status laporan.
- Related artifacts: US-05, US-10; AC-05.2, AC-10.3; BR-08; Priority Must.
- Clarity: PASS - The stored object, status history, is explicit.
- Completeness: PASS - BR-08 defines required history fields: `from_status`, `to_status`, `changed_by_role`, `timestamp`, and `note`.
- Consistency: PASS - Consistent with mandatory feature "Menyimpan riwayat status" and strict 6 status workflow.
- Feasibility: PASS - Status history is feasible with D1 storage and does not require paid services.
- Testability: PASS - AC-10.3 verifies required fields after a status change.
- Traceability: PASS - Linked to US-05, US-10, BR-08, and Skill 04 Must priority.
- Proposed revision: None.
- Revision rationale: None.
- Affected artifacts: None.

### FR-20

- Original statement: Sistem harus memungkinkan Administrator menutup laporan.
- Related artifacts: US-14; AC-14.1, AC-14.2; BR-11; OPEN-03, OPEN-11; Priority Must.
- Clarity: PASS - Actor and action are explicit.
- Completeness: OPEN QUESTION - Normal close is covered by AC-14.1, but OPEN-03 leaves valid manual override conditions unresolved; OPEN-11 leaves representation of waiting confirmation unresolved.
- Consistency: PASS - Consistent with mandatory close feature and BR-11 requiring reporter confirmation or Administrator override.
- Feasibility: PASS - Closure and override note recording are feasible within existing constraints.
- Testability: PASS - AC-14.1 and AC-14.2 define observable closure behavior and override-note requirement.
- Traceability: PASS - Linked to US-14, BR-11, and Skill 04 Must priority.
- Proposed revision: None.
- Revision rationale: Override conditions require human or stakeholder decision before changing requirement text.
- Affected artifacts: OPEN-03, OPEN-11; future business rule detail and acceptance tests.

### FR-21

- Original statement: Sistem harus memungkinkan Administrator membuka kembali laporan jika diperlukan.
- Related artifacts: US-15; AC-15.1, AC-15.2; BR-12; OPEN-04; Priority Should.
- Clarity: PASS - Administrator is the actor, and reopen behavior is explicit.
- Completeness: OPEN QUESTION - OPEN-04 asks whether Pelapor can request reopen or only Administrator can initiate it.
- Consistency: PASS - Consistent with `CASE.md` and BR-12, which returns reopened reports to `UNDER_REVIEW`.
- Feasibility: PASS - Reopen behavior uses the existing strict status workflow and status history.
- Testability: PASS - AC-15.1 and AC-15.2 verify status change and history recording.
- Traceability: PASS - Linked to US-15, BR-12, and Skill 04 Should priority.
- Proposed revision: None.
- Revision rationale: Reopen trigger policy needs clarification; the Administrator reopen capability remains supported.
- Affected artifacts: OPEN-04; future UI and workflow rules.

### FR-23

- Original statement: Sistem harus menampilkan beban tugas per Teknisi pada dashboard.
- Related artifacts: US-16; AC-16.2; OPEN-07; Priority Could.
- Clarity: PASS - Dashboard content and subject `beban tugas per Teknisi` are explicit.
- Completeness: OPEN QUESTION - OPEN-07 states the workload calculation formula is not defined.
- Consistency: PASS - Consistent with approved `grill-session-summary.md`, which requires dashboard workload visibility.
- Feasibility: OPEN QUESTION - Display is feasible, but formula feasibility and data requirements cannot be confirmed until OPEN-07 is resolved.
- Testability: OPEN QUESTION - AC-16.2 verifies display exists, but correctness of workload values cannot be verified without a formula.
- Traceability: PASS - Linked to US-16 and Skill 04 Could priority.
- Proposed revision: None.
- Revision rationale: Workload formula requires stakeholder or reviewer decision.
- Affected artifacts: OPEN-07; future dashboard design, database fields, and tests.

### FR-24

- Original statement: Sistem harus mengubah tampilan dan aksi UI secara dinamis berdasarkan role yang dipilih.
- Related artifacts: US-17; AC-17.1, AC-17.2; Priority Must.
- Clarity: PASS - Behavior and trigger are explicit: UI changes by selected role.
- Completeness: PASS - AC-17.1 and AC-17.2 cover visible actions and role switching behavior.
- Consistency: PASS - Consistent with approved `grill-session-summary.md` role simulator decision and avoids adding full authentication.
- Feasibility: PASS - Role-based conditional UI is feasible in React without paid services.
- Testability: PASS - Acceptance criteria define observable visible actions before and after role changes.
- Traceability: PASS - Linked to US-17 and Skill 04 Must priority.
- Proposed revision: None.
- Revision rationale: None.
- Affected artifacts: None.

## Coverage Against Mandatory Features

| Mandatory feature from `instruksi-dosen.md` | Covered by | Validation result |
| --- | --- | --- |
| Membuat laporan baru | FR-01, FR-02, US-01 | Covered |
| Melihat daftar laporan | FR-03, US-02 | Covered |
| Mencari dan menyaring laporan | FR-04, FR-05, US-03, US-04 | Covered |
| Melihat detail laporan | FR-06, US-05 | Covered |
| Memeriksa laporan | FR-07, US-06 | Covered |
| Menentukan prioritas | FR-09, FR-10, US-07 | Covered; priority criteria remain OPEN-06 |
| Menugaskan teknisi | FR-11, US-08 | Covered |
| Mengubah status pekerjaan | FR-14, FR-15, US-10 | Covered |
| Menambahkan komentar atau catatan | FR-16, FR-17, US-11, US-12 | Covered |
| Menyimpan riwayat status | FR-18, US-05, US-10, BR-08 | Covered |
| Menutup atau membuka kembali laporan | FR-20, FR-21, US-14, US-15 | Covered; override and reopen trigger remain OPEN-03 and OPEN-04 |
| Menampilkan dashboard sederhana | FR-22, FR-23, US-16 | Covered; workload formula remains OPEN-07 |

Out-of-scope features from `instruksi-dosen.md` were not validated as mandatory: upload foto, email notification, Google login, QR code ruangan, AI category, inventory spare part, and vendor management.

## Priority Validation

- PASS - Must priorities in Skill 04 align with core workflow prerequisites: create, list/detail, review, category/priority, assignment, technician visibility, progress/resolved, status history, confirmation, close, and role-based UI.
- PASS - Should priorities are defensible for features that are in scope but can follow the first core lifecycle slice: search, filter, Lecturer priority suggestion, task acceptance detail, public comments, reopen, and dashboard summary.
- PASS - Could priorities are defensible where unresolved access or calculation detail increases risk: internal notes and technician workload.
- OPEN QUESTION - Some mandatory-scope features are prioritized as Should/Could for sequencing rather than exclusion. Human Review should confirm this sequencing is acceptable because the features remain in scope and are not removed.

## Contradictions, Ambiguities, Incompleteness, and Unverifiable Items

| ID | Type | Affected items | Finding | Status |
| --- | --- | --- | --- | --- |
| VAL-01 | Incompleteness | FR-08, BR-06, US-07 | Final category fixed list is not defined. | OPEN QUESTION via OPEN-05 |
| VAL-02 | Incompleteness | FR-09, FR-10, BR-04, BR-05, BR-07, US-07 | Criteria for LOW, MEDIUM, HIGH, and URGENT are not defined. | OPEN QUESTION via OPEN-06 |
| VAL-03 | Ambiguity | FR-20, BR-11, US-14 | Valid conditions for Administrator manual override are not defined. | OPEN QUESTION via OPEN-03 |
| VAL-04 | Ambiguity | FR-21, BR-12, US-15 | Reopen initiation is unclear: Administrator-only action or Pelapor request plus Administrator decision. | OPEN QUESTION via OPEN-04 |
| VAL-05 | Unverifiable detail | FR-23, US-16 | Technician workload display cannot be correctness-tested until workload formula is defined. | OPEN QUESTION via OPEN-07 |
| VAL-06 | Ambiguity | FR-13, US-09 | Technician acceptance is defined, but rejection/reassignment handling is unresolved. | OPEN QUESTION via OPEN-08 |
| VAL-07 | Ambiguity | FR-19, FR-20, US-13, US-14 | Waiting-for-confirmation representation without adding a seventh status remains unclear. | OPEN QUESTION via OPEN-11 |

## Requirements Needing Revision

No existing FR, NFR, BR, User Story, or Acceptance Criteria is changed by this validation. Current issues are handled as `OPEN QUESTION` items because available evidence is insufficient to rewrite requirement text safely.

Potential future revisions after Human Review:

1. Add approved category values to the specification, design, and tests after OPEN-05 is answered.
2. Add priority criteria after OPEN-06 is answered.
3. Add manual override conditions for close after OPEN-03 is answered.
4. Clarify reopen initiation and decision authority after OPEN-04 is answered.
5. Define technician workload formula after OPEN-07 is answered.
6. Clarify whether task rejection or reassignment exists after OPEN-08 is answered.
7. Decide how to represent waiting reporter confirmation without adding a status after OPEN-11 is answered.

## Unresolved Open Questions

| Open ID | Question | Validation impact |
| --- | --- | --- |
| OPEN-02 | Data identitas Pelapor apa saja yang wajib disimpan selain `reporter_name` dan `reporter_type`? | Does not invalidate FR-02; may affect future data model and UI. |
| OPEN-03 | Apa kondisi sah Administrator memakai manual override untuk menutup laporan tanpa konfirmasi Pelapor? | Affects completeness of FR-20, BR-11, US-14. |
| OPEN-04 | Apakah reopen hanya dapat dilakukan oleh Administrator, atau Pelapor juga dapat meminta reopen? | Affects completeness of FR-21 and US-15. |
| OPEN-05 | Apa daftar final kategori fixed list yang akan digunakan? | Affects completeness and test data for FR-08 and US-07. |
| OPEN-06 | Apa kriteria prioritas `LOW`, `MEDIUM`, `HIGH`, dan `URGENT`? | Affects priority policy for FR-09 and FR-10. |
| OPEN-07 | Bagaimana beban tugas per Teknisi dihitung untuk dashboard? | Affects verifiability of FR-23 and AC-16.2. |
| OPEN-08 | Apakah Teknisi boleh menolak tugas atau hanya menerima dan memperbarui tugas yang diberikan? | Affects scope of FR-13 and US-09. |
| OPEN-10 | Apakah Manajer Fasilitas hanya melihat dashboard/ringkasan, dapat membuka detail laporan, atau juga dapat melihat Catatan Internal? | Affects access boundaries for FR-06, FR-17, and FR-22. |
| OPEN-11 | Apakah enam status strict boleh memiliki sub-state non-status, seperti flag menunggu konfirmasi? | Affects representation of FR-19 and FR-20 without violating BR-02. |

## Validation Summary

- Minimum validation requirement met: 9 functional requirements were validated across clarity, completeness, consistency, feasibility, testability, and traceability.
- Coverage result: Mandatory features from `instruksi-dosen.md` are covered by the approved FR/User Story set.
- Priority result: Skill 04 priorities are internally consistent with dependencies and do not move out-of-scope features into mandatory scope.
- Main validation risk: Several requirements are valid at the capability level but need policy detail before design, implementation, and testing can be fully precise.
- Baseline readiness: Ready for Human Review as a validation draft. Not ready to be treated as a final baseline until the reviewer decides whether the listed open questions can remain deferred or must be answered before Skill 06.

## Human Review Status

- Status: Pending Human Review.
- Required reviewer action: approve, request revision, reject, or mark blocked before Skill 06 begins.
- This document does not approve any requirement change by itself.
