# User Stories

| Review Status | Draft for Human Review |
| --- | --- |
| Skill AI | Skill 03 - Specification (`requirements-elaboration-and-specification`) |
| Human decision | Menunggu Human Review Skill 03 |

## Source Summary

User stories dan acceptance criteria ini diturunkan dari `instruksi-dosen.md`, `CASE.md`, `docs/requirements/inception.md`, `docs/requirements/elicitation.md`, dan `docs/requirements/grill-session-summary.md`. Item yang bergantung pada informasi yang belum rinci tetap ditandai `ASSUMPTION` atau dicatat di bagian `Open Questions`.

## User Stories and Acceptance Criteria

### US-01 - Create Service Request

- Story: As a Pelapor, I want to create a service request, so that a campus facility problem can be recorded and processed.
- Supports: FR-01, FR-02, BR-01
- Source: SRC-02, SRC-03, SRC-07
- Status: FACT

#### Acceptance Criteria

- AC-01.1: Given the active role is Pelapor, when the Pelapor submits a complete report, then the system stores the report.
- AC-01.2: Given the system stores a new report, when the report is created, then the report status is `SUBMITTED`.
- AC-01.3: Given the report is created by a Pelapor, when the system stores the report, then `reporter_name` and `reporter_type` are stored with the report.

### US-02 - View Request List

- Story: As a user with an active role, I want to view service requests, so that I can monitor reports relevant to my work.
- Supports: FR-03
- Source: SRC-02, SRC-03
- Status: FACT

#### Acceptance Criteria

- AC-02.1: Given service requests exist, when the request list is opened, then the system displays the stored requests.
- AC-02.2: Given no service requests exist, when the request list is opened, then the system displays an empty state.

### US-03 - Search Requests

- Story: As a user with an active role, I want to search service requests, so that I can find a specific report.
- Supports: FR-04
- Source: SRC-02, SRC-07
- Status: FACT

#### Acceptance Criteria

- AC-03.1: Given a search keyword matches a stored report, when the search is applied, then matching reports are displayed.
- AC-03.2: Given a search keyword does not match any stored report, when the search is applied, then the system displays an empty result state.

### US-04 - Filter Requests

- Story: As a user with an active role, I want to filter service requests, so that I can narrow the list by status and priority.
- Supports: FR-05
- Source: SRC-02, SRC-07
- Status: FACT

#### Acceptance Criteria

- AC-04.1: Given a status filter is selected, when the request list is displayed, then only reports with that status are shown.
- AC-04.2: Given a priority filter is selected, when the request list is displayed, then only reports with that priority are shown.
- AC-04.3: Given status and priority filters are selected together, when the request list is displayed, then only reports matching both filters are shown.

### US-05 - View Request Detail

- Story: As a user with an active role, I want to view request detail, so that I can understand the context and current condition of a report.
- Supports: FR-06, FR-18
- Source: SRC-02, SRC-03, SRC-07
- Status: FACT

#### Acceptance Criteria

- AC-05.1: Given a report is selected, when the detail view is opened, then the system displays the report detail.
- AC-05.2: Given a report has status history, when the detail view is opened, then the system displays the status history.
- AC-05.3: Given a report has comments visible to the active role, when the detail view is opened, then the system displays those comments.

### US-06 - Review Submitted Request

- Story: As an Administrator, I want to review submitted reports, so that valid reports can move to the next workflow step.
- Supports: FR-07, BR-03
- Source: SRC-02, SRC-03
- Status: FACT

#### Acceptance Criteria

- AC-06.1: Given a report is `SUBMITTED`, when the Administrator reviews it, then the system allows the report to proceed through the workflow.
- AC-06.2: Given the active role is not Administrator, when a user attempts to perform Administrator review, then the system does not allow that action.

### US-07 - Set Category and Priority

- Story: As an Administrator, I want to set category and priority, so that reports can be classified and handled according to campus maintenance needs.
- Supports: FR-08, FR-09, FR-10, BR-04, BR-05, BR-06, BR-07
- Source: SRC-02, SRC-03, SRC-07
- Status: FACT

#### Acceptance Criteria

- AC-07.1: Given the active role is Administrator, when a category from the fixed list is selected, then the system stores the selected category on the report.
- AC-07.2: Given the active role is Administrator, when a priority value is selected, then the system stores `LOW`, `MEDIUM`, `HIGH`, or `URGENT` on the report.
- AC-07.3: Given a report has `reporter_type` `LECTURER`, when priority is being decided, then the system provides a `HIGH` priority suggestion while leaving the final decision to Administrator.

### US-08 - Assign Technician

- Story: As an Administrator, I want to assign a technician, so that the report has a responsible handler.
- Supports: FR-11, BR-03
- Source: SRC-02, SRC-03
- Status: FACT

#### Acceptance Criteria

- AC-08.1: Given a report has been reviewed, when the Administrator assigns it to a Teknisi, then the system stores the technician assignment.
- AC-08.2: Given a report is assigned to a Teknisi, when the assignment is saved, then the report can move to `ASSIGNED`.

### US-09 - View and Accept Assigned Tasks

- Story: As a Teknisi, I want to view and accept assigned tasks, so that I know which maintenance work I am responsible for.
- Supports: FR-12, FR-13
- Source: SRC-02, SRC-03
- Status: FACT

#### Acceptance Criteria

- AC-09.1: Given tasks have been assigned to a Teknisi, when the Teknisi opens the task list, then the system displays those assigned tasks.
- AC-09.2: Given a task is assigned to a Teknisi, when the Teknisi accepts the task, then the system records that the task has been accepted.

### US-10 - Update Work Progress

- Story: As a Teknisi, I want to update work progress, so that the report status reflects current maintenance work.
- Supports: FR-14, FR-15, FR-18, BR-02, BR-08
- Source: SRC-02, SRC-03, SRC-07
- Status: FACT

#### Acceptance Criteria

- AC-10.1: Given a report is assigned, when the Teknisi starts work, then the report can move to `IN_PROGRESS`.
- AC-10.2: Given the work is completed, when the Teknisi marks the work as finished, then the report can move to `RESOLVED`.
- AC-10.3: Given a status change occurs, when the system records the change, then status history includes `from_status`, `to_status`, `changed_by_role`, `timestamp`, and `note`.

### US-11 - Add Public Comment

- Story: As a Pelapor, Administrator, or Teknisi, I want to add a public comment, so that communication about a report is documented.
- Supports: FR-16, BR-09
- Source: SRC-02, SRC-07
- Status: FACT

#### Acceptance Criteria

- AC-11.1: Given a user adds a Komentar Publik to a report, when the comment is saved, then the comment is stored with the report.
- AC-11.2: Given a Komentar Publik exists, when Pelapor, Administrator, or Teknisi opens the report, then the comment is visible.

### US-12 - Add Internal Note

- Story: As an Administrator or Teknisi, I want to add an internal note, so that technical coordination can be documented separately from public comments.
- Supports: FR-17, BR-10
- Source: SRC-02, SRC-07
- Status: FACT

#### Acceptance Criteria

- AC-12.1: Given Administrator or Teknisi adds a Catatan Internal, when the note is saved, then the note is stored with the report.
- AC-12.2: Given a Catatan Internal exists, when Administrator or Teknisi opens the report, then the note is visible.
- AC-12.3: Given a Catatan Internal exists, when Pelapor opens the report, then the note is not visible.

### US-13 - Confirm Resolved Work

- Story: As a Pelapor, I want to confirm resolved work, so that the result can be accepted before the report is closed.
- Supports: FR-19, BR-11
- Source: SRC-02, SRC-07
- Status: FACT

#### Acceptance Criteria

- AC-13.1: Given a report is `RESOLVED`, when the Pelapor confirms the result, then the system records the confirmation.
- AC-13.2: Given Pelapor confirmation has been recorded, when Administrator closes the report, then the system allows the report to move to `CLOSED`.

### US-14 - Close Request

- Story: As an Administrator, I want to close resolved reports, so that completed maintenance work has a final status.
- Supports: FR-20, BR-11
- Source: SRC-02, SRC-03, SRC-07
- Status: FACT

#### Acceptance Criteria

- AC-14.1: Given a report is `RESOLVED` and Pelapor confirmation exists, when Administrator closes the report, then the report status becomes `CLOSED`.
- AC-14.2: Given Pelapor confirmation is not available, when Administrator uses manual override to close the report, then the system requires an override note.

### US-15 - Reopen Request

- Story: As an Administrator, I want to reopen a report when needed, so that the report can be reviewed again.
- Supports: FR-21, BR-12
- Source: SRC-02, SRC-03, SRC-07
- Status: FACT

#### Acceptance Criteria

- AC-15.1: Given a report needs to be reopened, when Administrator reopens it, then the report status becomes `UNDER_REVIEW`.
- AC-15.2: Given a report is reopened, when the system records the status change, then the status history records the change.

### US-16 - View Operational Dashboard

- Story: As a Manajer Fasilitas, I want to view an operational dashboard, so that I can monitor the condition of campus maintenance reports.
- Supports: FR-22, FR-23
- Source: SRC-02, SRC-03, SRC-07
- Status: FACT

#### Acceptance Criteria

- AC-16.1: Given reports exist, when Manajer Fasilitas opens the dashboard, then the system displays a report summary.
- AC-16.2: Given technicians have assigned work, when Manajer Fasilitas opens the dashboard, then the system displays workload per Teknisi.

### US-17 - Use Role-Based Interface

- Story: As a user with an active role, I want the interface to adjust based on the selected role, so that I only see actions relevant to that role.
- Supports: FR-24
- Source: SRC-07
- Status: FACT

#### Acceptance Criteria

- AC-17.1: Given a role is selected, when the UI is displayed, then the visible actions match the selected role.
- AC-17.2: Given the selected role changes, when the UI refreshes its available actions, then the visible actions update for the new role.

## Open Questions

| Open ID | Open Question | Affected Stories |
| --- | --- | --- |
| OPEN-02 | Data identitas Pelapor apa saja yang wajib disimpan selain `reporter_name` dan `reporter_type`? | US-01 |
| OPEN-03 | Apa kondisi sah Administrator memakai manual override untuk menutup laporan tanpa konfirmasi Pelapor? | US-14 |
| OPEN-04 | Apakah reopen hanya dapat dilakukan oleh Administrator, atau Pelapor juga dapat meminta reopen? | US-15 |
| OPEN-05 | Apa daftar final kategori fixed list yang akan digunakan? | US-07 |
| OPEN-06 | Apa kriteria prioritas `LOW`, `MEDIUM`, `HIGH`, dan `URGENT`? | US-07 |
| OPEN-07 | Bagaimana beban tugas per Teknisi dihitung untuk dashboard? | US-16 |
| OPEN-08 | Apakah Teknisi boleh menolak tugas atau hanya menerima dan memperbarui tugas yang diberikan? | US-09 |
| OPEN-10 | Apakah Manajer Fasilitas hanya melihat dashboard/ringkasan, dapat membuka detail laporan, atau juga dapat melihat Catatan Internal? | US-05, US-16 |
| OPEN-11 | Apakah enam status strict boleh memiliki sub-state non-status, seperti flag menunggu konfirmasi? | US-13, US-14 |

## Quality Check

- Minimum 10 user stories: terpenuhi dengan 17 user stories.
- Minimum 2 acceptance criteria per user story: terpenuhi.
- Acceptance criteria menggunakan format ID `AC-01.1`.
- Tidak ada prioritas MoSCoW.
- Tidak ada design, issue planning, kode, test, deployment, atau change request.
