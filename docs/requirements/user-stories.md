# User Stories

| Review Status | Human Reviewed Draft |
| --- | --- |
| AI assistance | Draft awal dibuat dengan bantuan AI, diperiksa melalui sesi `grill-with-docs`, lalu dirapikan memakai skill `03-specification`. |
| Human decision | Keputusan final tetap berada pada project owner. |

## US-01 - Create Service Request

- Story: As a Pelapor, I want to create a service request, so that campus facility problems can be recorded and processed.
- Supports: FR-01, FR-02, FR-19, FR-20
- Source: EL-01, EL-04, EL-15
- Status: FACT, ASSUMPTION

### Acceptance Criteria

- AC-US01-01: Given the active role is Pelapor, when the Pelapor submits a complete valid report, then the system stores the report with status `SUBMITTED`.
- AC-US01-02: Given required report fields are missing, when the Pelapor submits the form, then the system rejects the report and shows a validation message.
- AC-US01-03: Given a valid report is submitted, when the record is stored, then reporter name and reporter type are stored with the report.
- AC-US01-04: Given the active role is not Pelapor, when the user views the UI, then the create report action is not available and the API rejects create attempts.

## US-02 - View Request List

- Story: As a user with an active role, I want to view service requests, so that I can monitor reports relevant to my work.
- Supports: FR-03, FR-19
- Source: EL-02, EL-05, EL-10, EL-13, EL-15
- Status: FACT, ASSUMPTION

### Acceptance Criteria

- AC-US02-01: Given requests exist in the database, when the list is opened, then the system displays request number, title, location, category, priority, and status.
- AC-US02-02: Given no requests exist, when the list is opened, then the system displays an empty state.

## US-03 - Search Requests

- Story: As a user with an active role, I want to search service requests, so that I can find a specific report quickly.
- Supports: FR-04
- Source: EL-18
- Status: ASSUMPTION

### Acceptance Criteria

- AC-US03-01: Given a search keyword matches a request title, when the search is applied, then matching requests are shown.
- AC-US03-02: Given a search keyword matches a request number, location, or category, when the search is applied, then matching requests are shown.
- AC-US03-03: Given a search keyword matches no request, when the search is applied, then the system displays an empty result state.

## US-04 - Filter Requests

- Story: As a user with an active role, I want to filter service requests, so that I can narrow the list by operational criteria.
- Supports: FR-05
- Source: EL-18
- Status: ASSUMPTION

### Acceptance Criteria

- AC-US04-01: Given a status filter is selected, when the list is loaded, then only requests with that status are shown.
- AC-US04-02: Given category, priority, or technician filters are selected, when the list is loaded, then only matching requests are shown.
- AC-US04-03: Given a search keyword and filters are applied together, when the list is loaded, then only requests matching both the keyword and filters are shown.

## US-05 - View Request Detail

- Story: As a user with an active role, I want to view request detail, so that I can understand the full report context.
- Supports: FR-06, FR-14, FR-19
- Source: EL-02, EL-10, EL-13, EL-17
- Status: FACT, ASSUMPTION

### Acceptance Criteria

- AC-US05-01: Given a request is selected, when the detail panel opens, then the system displays description, location, category, priority, and status.
- AC-US05-02: Given a request has comments or status history, when the detail panel opens, then the system displays comments and status history.
- AC-US05-03: Given a request has an assigned technician, when the detail panel opens, then the assigned technician is displayed.

## US-06 - Review Submitted Request

- Story: As an Administrator, I want to review submitted reports, so that valid reports can proceed through the workflow.
- Supports: FR-07, FR-14, FR-19, FR-20
- Source: EL-05, EL-17
- Status: FACT, ASSUMPTION

### Acceptance Criteria

- AC-US06-01: Given the active role is Administrator and a report is `SUBMITTED`, when the Administrator reviews it, then the status changes to `UNDER_REVIEW`.
- AC-US06-02: Given a review status change succeeds, when the status history is inspected, then it contains status origin, target status, role, note, and timestamp.
- AC-US06-03: Given the active role is not Administrator, when a user attempts to review a report, then the API rejects the action.

## US-07 - Set Category and Priority

- Story: As an Administrator, I want to set category and priority, so that reports can be classified and ordered by urgency.
- Supports: FR-08, FR-09
- Source: EL-06, EL-C-02
- Status: FACT, ASSUMPTION

### Acceptance Criteria

- AC-US07-01: Given the active role is Administrator, when a valid category is selected, then the system stores the category on the report.
- AC-US07-02: Given the active role is Administrator, when a valid priority is selected, then the system stores the priority on the report.
- AC-US07-03: Given an invalid category or priority is submitted, when the API receives the request, then the API rejects the update.

## US-08 - Assign Technician

- Story: As an Administrator, I want to assign a technician, so that each report has a responsible handler.
- Supports: FR-10, FR-14, FR-20
- Source: EL-07, EL-C-04
- Status: FACT, ASSUMPTION

### Acceptance Criteria

- AC-US08-01: Given the active role is Administrator and a registered technician is selected, when the assignment is saved, then the report stores the technician assignment.
- AC-US08-02: Given a technician is assigned to a reviewed report, when the assignment succeeds, then the report status becomes `ASSIGNED`.
- AC-US08-03: Given an unknown technician is submitted, when the API receives the assignment, then the API rejects the assignment.

## US-09 - Update Work Progress

- Story: As a Teknisi, I want to update work progress, so that report handling status stays current.
- Supports: FR-11, FR-14, FR-20
- Source: EL-10, EL-11, EL-17
- Status: FACT, ASSUMPTION

### Acceptance Criteria

- AC-US09-01: Given the active role is Teknisi and a report is assigned, when work starts, then the status changes to `IN_PROGRESS`.
- AC-US09-02: Given the active role is Teknisi and work is complete, when the technician marks the work resolved, then the status changes to `RESOLVED`.
- AC-US09-03: Given a work status update succeeds, when status history is inspected, then the change is recorded.

## US-10 - Add Comments and Internal Notes

- Story: As a user with an active role, I want to add comments or notes, so that communication around a report is documented.
- Supports: FR-12, FR-13, FR-19, FR-20
- Source: EL-03, EL-12, EL-C-05
- Status: FACT, ASSUMPTION

### Acceptance Criteria

- AC-US10-01: Given a user adds a public comment to a request, when the comment is saved, then it appears in the request detail.
- AC-US10-02: Given Administrator or Teknisi adds an internal note, when the note is saved, then it appears only to Administrator and Teknisi.
- AC-US10-03: Given the active role is Pelapor, when request detail is displayed, then internal notes are not shown.

## US-11 - Close or Reopen Request

- Story: As an Administrator, I want to close or reopen reports, so that final report status can be managed accurately.
- Supports: FR-15, FR-16, FR-14, FR-20
- Source: EL-08, EL-09, EL-C-03
- Status: FACT, ASSUMPTION

### Acceptance Criteria

- AC-US11-01: Given a report is `RESOLVED` and reporter confirmation is recorded, when the Administrator closes it, then the status changes to `CLOSED`.
- AC-US11-02: Given reporter confirmation is unavailable, when the Administrator closes a resolved report with manual override, then the system requires an override note.
- AC-US11-03: Given a closed report needs to be reopened, when the Administrator reopens it, then the status changes to `UNDER_REVIEW`.
- AC-US11-04: Given close or reopen succeeds, when status history is inspected, then the change is recorded.

## US-12 - View Operational Dashboard

- Story: As a Manajer Fasilitas, I want to view an operational dashboard, so that I can monitor campus maintenance workload.
- Supports: FR-17, FR-18
- Source: EL-13, EL-14
- Status: FACT, ASSUMPTION

### Acceptance Criteria

- AC-US12-01: Given service requests exist, when the dashboard opens, then the system displays counts by status.
- AC-US12-02: Given service requests exist, when the dashboard opens, then the system displays summaries by category and priority.
- AC-US12-03: Given technicians have assigned reports, when the dashboard opens, then the system displays workload per technician.

## Open Questions

- OPEN QUESTION: Apakah Pelapor melihat semua laporan atau hanya laporan yang dibuat sendiri?
- OPEN QUESTION: Apakah role simulation perlu selalu ditampilkan sebagai known limitation pada README dan deployment docs?
- OPEN QUESTION: Fitur roadmap seperti suggested priority, SLA, dan personalized dashboard tetap dokumentasi-only atau sebagian diimplementasikan jika waktu cukup?
