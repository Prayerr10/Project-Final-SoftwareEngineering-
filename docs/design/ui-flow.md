# UI Flow and Wireframe Design

| Review Status | Draft for Human Review |
| --- | --- |
| Skill AI | Skill 08 - UI Design (`08-ui-design`) |
| Human decision | Pending Human Review |

## Source Summary

Dokumen ini adalah output Skill 08. Isinya hanya membuat desain UI flow, navigasi, wireframe deskriptif, komponen reusable, state UI, feedback form, accessibility checklist, design token guidance, dan API-to-UI mapping. Dokumen ini tidak mengubah requirement final, arsitektur Skill 06, database/API contract Skill 07, status workflow, prioritas, business rule, atau change request.

| Source ID | Source | Usage |
| --- | --- | --- |
| UI-SRC-01 | `instruksi-dosen.md` | Instruksi utama, template Human Review, template PR, template traceability, batas work product fase design. |
| UI-SRC-02 | `CASE.md` | Studi kasus, aktor, fitur wajib, fitur tidak wajib, dan alur status. |
| UI-SRC-03 | `CONTEXT.md` | Istilah domain: Pelapor, Administrator, Teknisi, Manajer Fasilitas, Simulasi Role, Master-Detail View, Komentar Publik, Catatan Internal, Riwayat Status. |
| UI-SRC-04 | `docs/requirements/requirements.md` | FR-01 sampai FR-24, NFR-01 sampai NFR-09, BR-01 sampai BR-12, dan open question. |
| UI-SRC-05 | `docs/requirements/user-stories.md` | US-01 sampai US-17 dan acceptance criteria. |
| UI-SRC-06 | `docs/requirements/prioritization.md` | Prioritas dan dependency requirement. |
| UI-SRC-07 | `docs/requirements/validation.md` | Validasi final dan open question yang berdampak pada UI. |
| UI-SRC-08 | `docs/requirements/change-request.md` | CR-05-01 tentang marker non-status untuk konfirmasi Pelapor; belum menjadi requirement final baru. |
| UI-SRC-09 | `docs/requirements/traceability.md` | Traceability sampai Skill 07 dan baseline update Skill 08. |
| UI-SRC-10 | `docs/design/architecture.md` | Arsitektur approved: React SPA, role simulator, master-detail shell, accessibility-first, component-driven constraint. |
| UI-SRC-11 | `docs/design/database-api.md` | API contract dan data contract approved sebagai landasan utama data, state, error contract, role validation, dan workflow validation UI. |
| UI-SRC-12 | `evidence/human-review-architecture.md` | Bukti Skill 06 sudah Disetujui. |
| UI-SRC-13 | `evidence/human-review-database-api.md` | Bukti Skill 07 sudah Disetujui. |
| UI-SRC-14 | `https://www.figma.com/community` | Referensi prinsip open design, wireframe, component inventory, dan design token inspiration; bukan dependency implementasi. |
| UI-SRC-15 | `https://github.com/nextlevelbuilder/ui-ux-pro-max-skill` | Referensi prinsip accessibility, dashboard, responsive states, checklist UI; bukan dependency implementasi. |

## Scope and Non-Scope

Scope Skill 08:

- Struktur navigasi aplikasi dan RoleSwitcher untuk Pelapor, Administrator, Teknisi, dan Manajer Fasilitas.
- Page/view utama: Request Workspace, Create Request, Request Detail, Administrator Review/Classify/Assign, Technician Tasks, dan Dashboard Summary.
- Wireframe deskriptif berbentuk teks terstruktur, bukan gambar dan bukan kode.
- Component-driven UI plan untuk komponen reusable minimal yang diminta.
- Role-based UI matrix yang tetap mengakui API sebagai validasi akhir.
- UI state coverage untuk loading, empty, success, error, forbidden, not found, conflict/invalid transition, dan server error.
- Form dan feedback design untuk visible label, helper text, field error, form-level error, success feedback, dan disabled/loading submit.
- Accessibility-first checklist dan design token level deskriptif.
- API-to-UI mapping untuk endpoint Skill 07.

Non-scope Skill 08:

- Tidak menulis React, CSS, HTML, TypeScript, Worker, SQL, migration, test, atau deployment.
- Tidak memasang atau memilih component library sebagai keputusan final.
- Tidak membuat visual final yang mengunci warna, font, atau library.
- Tidak menambah fitur out of scope: upload foto, email notification, Google login, QR code ruangan, AI kategori, inventory spare part, atau vendor management.
- Tidak menambah status workflow selain `SUBMITTED`, `UNDER_REVIEW`, `ASSIGNED`, `IN_PROGRESS`, `RESOLVED`, dan `CLOSED`.

## UI Design Principles

1. Accessibility-first: semua layar harus dapat dipakai dengan keyboard, screen reader, visible focus, pesan error yang terhubung ke field, dan kontras minimal WCAG AA.
2. Contract-aware UI: setiap aksi dan state UI mengikuti response success/error dari `docs/design/database-api.md`.
3. Role-aware but API-trusted: Role-Based UI hanya mengatur visibilitas atau disabled state; Role-Based API Validation tetap sumber kebenaran.
4. Master-detail first: Request Workspace menjadi surface utama untuk list, filter, dan detail agar pengguna dapat memantau laporan tanpa berpindah konteks berlebihan.
5. Progressive disclosure: action panel menampilkan aksi yang relevan dengan role dan status saat ini, sementara aksi tidak relevan disembunyikan atau diberi disabled reason.
6. Status is text plus shape, not color only: StatusBadge dan PriorityBadge harus memakai label teks, bentuk, ikon/indikator, dan helper text, bukan warna saja.
7. Open design as inspiration: Figma Community dan UI UX Pro Max dipakai sebagai referensi prinsip untuk component-driven design, dashboard, responsive states, dan accessibility checklist; bukan dependency implementasi.

## Navigation Model

### Application Shell

| Region | Content | Notes |
| --- | --- | --- |
| Header | Nama aplikasi singkat, RoleSwitcher, global feedback region. | RoleSwitcher selalu terlihat agar simulasi role transparan. |
| Primary navigation | Requests, Create Request, Technician Tasks, Dashboard. | Item dapat hidden/disabled sesuai role, tetapi direct URL tetap harus menampilkan forbidden/not found state sesuai API. |
| Main area | View aktif. | Menggunakan heading hierarchy berurutan dan landmark yang jelas pada fase implementasi. |
| Detail/action side panel | RequestDetailPanel dan ActionPanel pada Request Workspace. | Pada mobile, panel detail dapat menjadi view bertingkat setelah memilih laporan. |
| Feedback region | Success/error/status message setelah command. | Harus dapat diumumkan screen reader dan tidak hanya berupa toast sementara. |

### Role-Specific Navigation

| Role | Default landing | Visible primary nav | Notes |
| --- | --- | --- | --- |
| Pelapor | Request Workspace | Requests, Create Request | Dapat melihat laporan, detail, komentar publik, dan aksi confirm resolution saat eligible. |
| Administrator | Request Workspace | Requests, Dashboard | Create Request dapat disembunyikan karena create hanya REPORTER pada API-03. Admin actions berada di ActionPanel/detail. |
| Teknisi | Technician Tasks | Technician Tasks, Requests | Requests dipakai untuk membuka detail tugas yang relevan; ActionPanel fokus accept/progress/resolve. |
| Manajer Fasilitas | Dashboard Summary | Dashboard, Requests summary | Detail access adalah Needs Human Review via OPEN-10; baseline UI harus membatasi ke summary-safe data. |

ASSUMPTION: RoleSwitcher adalah simulasi role untuk kebutuhan project karena autentikasi penuh tidak termasuk requirement final. UI tetap mengirim role context ke API sesuai Skill 07, dan API tetap memvalidasi role/action.

## Role-Based UI Matrix

| UI capability | Pelapor | Administrator | Teknisi | Manajer Fasilitas | API validation |
| --- | --- | --- | --- | --- | --- |
| Switch active role | Yes | Yes | Yes | Yes | Role context divalidasi oleh endpoint terkait. |
| Create request | Visible | Hidden/forbidden | Hidden/forbidden | Hidden/forbidden | API-03 only `REPORTER`. |
| View request list/search/filter | Visible | Visible | Visible | Summary-safe visible | API-02 all roles with role-aware shaping. |
| View request detail | Visible | Visible | Visible for relevant work | Needs Human Review | API-04 with OPEN-10 visibility constraints. |
| Review submitted request | Hidden | Visible when `SUBMITTED` | Hidden | Hidden | API-05 only `ADMINISTRATOR`. |
| Set category/priority | Hidden | Visible when `UNDER_REVIEW` | Hidden | Hidden | API-06 only `ADMINISTRATOR`. |
| Assign technician | Hidden | Visible when `UNDER_REVIEW` and classification ready | Hidden | Hidden | API-07 only `ADMINISTRATOR`. |
| View technician tasks | Hidden | Visible for planning | Visible | Hidden | API-08 `TECHNICIAN`, `ADMINISTRATOR`. |
| Accept assigned task | Hidden | Hidden | Visible when assigned/current | Hidden | API-09 only `TECHNICIAN`; OPEN-08 preserved. |
| Move to in progress | Hidden | Hidden | Visible when `ASSIGNED` | Hidden | API-10 only assigned `TECHNICIAN`. |
| Resolve work | Hidden | Hidden | Visible when `IN_PROGRESS` | Hidden | API-11 only assigned `TECHNICIAN`. |
| Add public comment | Visible | Visible | Visible | Hidden until OPEN-10 resolved | API-12 `REPORTER`, `ADMINISTRATOR`, `TECHNICIAN`. |
| Add internal note | Hidden | Visible | Visible | Hidden/Needs Human Review | API-13 only `ADMINISTRATOR`, `TECHNICIAN`; OPEN-10 preserved. |
| Confirm resolution | Visible when `RESOLVED` | Hidden | Hidden | Hidden | API-14 only `REPORTER`. |
| Close request | Hidden | Visible when `RESOLVED` | Hidden | Hidden | API-15 only `ADMINISTRATOR`; OPEN-03/OPEN-11 preserved. |
| Reopen request | Hidden; OPEN-04 may affect future request flow | Visible when eligible | Hidden | Hidden | API-16 only `ADMINISTRATOR` under current baseline. |
| Dashboard summary | Hidden | Visible | Hidden | Visible | API-17 `FACILITY_MANAGER`, `ADMINISTRATOR`. |

Important boundary: disabled or hidden UI controls are usability support only. The UI must still handle `403 FORBIDDEN`, `409 INVALID_STATUS_TRANSITION`, `404 NOT_FOUND`, and `422 VALIDATION_ERROR` from the API.

## Page and View Inventory

| View ID | View | Primary roles | Main components | API contract |
| --- | --- | --- | --- | --- |
| UI-01 | Application Shell and RoleSwitcher | All roles | RoleSwitcher, FeedbackMessage, ErrorState | All endpoints role context |
| UI-02 | Request Workspace | All roles | RequestSearchFilter, RequestList, RequestDetailPanel, ActionPanel, EmptyState, LoadingState, ErrorState | API-02, API-04 |
| UI-03 | Create Request | Pelapor | RequestForm, FeedbackMessage, LoadingState, ErrorState | API-03 |
| UI-04 | Request Detail | All roles with visibility rules | RequestDetailPanel, StatusHistoryTimeline, CommentArea, InternalNoteArea, ActionPanel | API-04, API-12, API-13 |
| UI-05 | Administrator Review/Classify/Assign | Administrator | ActionPanel, PriorityBadge, StatusBadge, FeedbackMessage | API-05, API-06, API-07, API-15, API-16 |
| UI-06 | Technician Tasks | Teknisi, Administrator | RequestList, StatusBadge, PriorityBadge, ActionPanel | API-08, API-09, API-10, API-11 |
| UI-07 | Dashboard Summary | Manajer Fasilitas, Administrator | DashboardCards, StatusBadge, PriorityBadge, EmptyState, ErrorState | API-17 |
| UI-08 | Fallback Views | All roles | ForbiddenState, NotFoundState, ServerErrorState | Common error contract |

## Descriptive Wireframes

### UI-01 - Application Shell and RoleSwitcher

Purpose: Menyediakan kerangka navigasi aplikasi dan simulasi role untuk 4 aktor.

Actors: Pelapor, Administrator, Teknisi, Manajer Fasilitas.

Structured layout:

1. Header: application title, active role label, RoleSwitcher.
2. Navigation: role-aware links to Request Workspace, Create Request, Technician Tasks, Dashboard Summary.
3. Main: currently selected view.
4. Feedback region: persistent command result and error summary.

Data shown from Skill 07: active role value (`REPORTER`, `ADMINISTRATOR`, `TECHNICIAN`, `FACILITY_MANAGER`) and response feedback from the active endpoint.

Primary actions: switch role, navigate between allowed views.

Secondary actions: recover from forbidden or server error by returning to an allowed view.

State coverage: loading is not required for shell only; forbidden appears when a route is not allowed; error state appears when role context is invalid or API rejects a direct action.

Accessibility notes: RoleSwitcher must be keyboard operable, expose selected role, and move focus predictably after role change without trapping focus.

Traceability: FR-24, US-17, NFR-01.

### UI-02 - Request Workspace

Purpose: Menampilkan daftar laporan, pencarian, filter, dan detail laporan terpilih dalam pola master-detail.

Actors: all roles, with Facility Manager constrained by OPEN-10.

Structured layout:

1. Page heading: Request Workspace.
2. Filter/search toolbar: keyword, status filter, priority filter, clear filters.
3. List region: RequestList with request number, title, location, status, priority, category if available, assigned technician summary if available.
4. Detail region: selected RequestDetailPanel or EmptyState asking user to select a request.
5. Action region: ActionPanel rendered based on selected role and selected request status.

Data shown from Skill 07: API-02 request summaries with `meta.empty`; API-04 detail with status history, public comments, allowed internal notes, and confirmation summary.

Primary actions: search, filter by status and priority, select request, refresh list.

Secondary actions: clear search/filter, open create view for Pelapor, recover from API error.

State coverage:

- Loading: skeleton/progress for list and separate detail loading after selection.
- Empty: no requests yet; no result for search/filter.
- Success: list refreshed after create/update/comment/close/reopen.
- Error: validation error for invalid query, server error with retry.
- Forbidden: role cannot see selected detail/action per API.
- Not found: selected request was deleted or unavailable.
- Conflict: action in ActionPanel rejected because status changed since list loaded.

Accessibility notes: RequestList should be navigable by keyboard; selected item must be announced; filter controls need visible labels and clear button; list/detail should preserve heading order.

Traceability: FR-03, FR-04, FR-05, FR-06, FR-18, FR-24, US-02 sampai US-05, US-17.

### UI-03 - Create Request

Purpose: Memungkinkan Pelapor membuat laporan baru dengan reporter identity yang disetujui.

Actors: Pelapor. Other roles receive forbidden/hidden navigation but API remains final validator.

Structured layout:

1. Page heading: Create Request.
2. RequestForm fields: reporter name, reporter type, title, description, location, category.
3. Helper text: required fields and expected description clarity.
4. Form feedback: field errors near fields, form-level error summary, success message with request number/status.
5. Submit area: primary submit button with loading/disabled state and secondary reset/cancel action.

Data shown from Skill 07: create input for API-03; `prioritySuggestion` when `reporterType = LECTURER`; created request `status: SUBMITTED`.

Primary action: submit request to `POST /api/requests`.

Secondary actions: reset draft, return to Request Workspace.

State coverage:

- Loading: submit button disabled and labelled as in progress.
- Success: success feedback includes request number and link/command to view detail.
- Validation error: field errors for missing/invalid fields; category blocked if OPEN-05 values are not approved.
- Forbidden: non-Reporter direct access/action.
- Conflict: duplicate generated request number is rare but shown as retry-safe conflict.
- Server error: non-destructive retry message.

Accessibility notes: every field has visible label; error summary links to fields; required state is text-based; submit loading state must be announced.

OPEN QUESTION: OPEN-05 affects category options. UI must show category as controlled vocabulary placeholder or Needs Human Review list until final values are approved.

Traceability: FR-01, FR-02, FR-10, BR-01, BR-05, BR-06, US-01, US-07.

### UI-04 - Request Detail

Purpose: Menampilkan konteks lengkap laporan, status, riwayat, komentar publik, catatan internal jika role berwenang, dan aksi terkait.

Actors: Pelapor, Administrator, Teknisi; Manajer Fasilitas Needs Human Review via OPEN-10.

Structured layout:

1. Header summary: request number, title, StatusBadge, PriorityBadge, category, location.
2. Reporter and request metadata: reporter name, reporter type, created/updated timestamp.
3. Description section: problem description.
4. Assignment section: assigned technician and acceptance state if available.
5. StatusHistoryTimeline: ordered events with from/to status, changed role, note, timestamp.
6. CommentArea: public comments and add comment control for allowed roles.
7. InternalNoteArea: visible only to Administrator and Teknisi under current baseline.
8. ActionPanel: role/status-specific actions.

Data shown from Skill 07: API-04 detail response, DB-01 through DB-07 visibility rules.

Primary actions: add public comment, add internal note if allowed, execute role/status action from ActionPanel.

Secondary actions: copy/read request number, return to list, refresh detail.

State coverage: detail loading, no selected request, not found request, forbidden visibility, server error, action conflict after stale detail.

Accessibility notes: timeline must not rely on color; comments and notes require clear authorship and timestamp text; internal notes must be labelled as internal without exposing them to Pelapor.

Needs Human Review: OPEN-10 affects whether Facility Manager can open this view and whether any internal note content is visible.

Traceability: FR-06, FR-16, FR-17, FR-18, BR-09, BR-10, US-05, US-11, US-12.

### UI-05 - Administrator Review/Classify/Assign

Purpose: Memberi Administrator action surface untuk review, klasifikasi, prioritas, assignment, close, dan reopen tanpa mengubah kontrak API.

Actors: Administrator.

Structured layout:

1. Request context: compact summary of selected request and current status.
2. Review action: note field and review command when status `SUBMITTED`.
3. Classification action: category selection, priority selection, Lecturer priority suggestion callout when applicable.
4. Assignment action: technician selector and assignment note when status `UNDER_REVIEW`.
5. Closure action: close control when status `RESOLVED`, with confirmation design and override note field only if manual override is selected.
6. Reopen action: reopen note and confirmation design for eligible closed request.
7. Feedback area: success/error from each API command.

Data shown from Skill 07: API-05, API-06, API-07, API-15, API-16 contracts; priority values `LOW`, `MEDIUM`, `HIGH`, `URGENT`; status values strict 6.

Primary actions: review, set category/priority, assign technician, close, reopen.

Secondary actions: cancel action, clear action draft, refresh detail.

State coverage: action loading/disabled state, validation errors, forbidden, not found, invalid transition conflict, server error.

Accessibility notes: destructive or finalizing actions close/reopen/manual override require a confirmation design with clear focus movement and keyboard escape/cancel path.

OPEN QUESTION: OPEN-03 must remain Needs Human Review. UI may include an override note field because API-15 requires it when override is used, but UI must not define valid business conditions for override.

OPEN QUESTION: OPEN-05 affects category selection values.

OPEN QUESTION: OPEN-11 affects whether the detail/action panel displays a non-status "waiting confirmation" marker. UI must not add a seventh status.

Traceability: FR-07, FR-08, FR-09, FR-10, FR-11, FR-20, FR-21, BR-02 sampai BR-08, BR-11, BR-12, US-06 sampai US-08, US-14, US-15.

### UI-06 - Technician Tasks

Purpose: Menyediakan daftar tugas untuk Teknisi dan aksi accept/progress/resolve berdasarkan status dan assignment.

Actors: Teknisi, Administrator for planning/inspection.

Structured layout:

1. Page heading: Technician Tasks.
2. Technician context selector or active technician summary.
3. Task filters: status and accepted/unaccepted view.
4. Task list: request number, title, location, category, priority, status, assigned date, accepted state.
5. Detail/action panel: task detail and ActionPanel for accept, start progress, resolve.

Data shown from Skill 07: API-08 task list, API-09 accept, API-10 progress, API-11 resolve.

Primary actions: accept assigned task, move to `IN_PROGRESS`, move to `RESOLVED`.

Secondary actions: filter tasks, open request detail, add public comment/internal note if allowed from detail.

State coverage: loading task list, empty assigned tasks, forbidden technician mismatch, technician not found, invalid status transition, server error.

Accessibility notes: task list should support keyboard selection; accepted state must be text-based; action buttons must expose current status and required note fields.

OPEN QUESTION: OPEN-08 remains unresolved. UI must not add reject-task or reassignment flow until approved.

Traceability: FR-12, FR-13, FR-14, FR-15, FR-18, US-09, US-10.

### UI-07 - Dashboard Summary

Purpose: Menampilkan ringkasan operasional dan workload source data untuk Manajer Fasilitas dan Administrator.

Actors: Manajer Fasilitas, Administrator.

Structured layout:

1. Page heading: Dashboard Summary.
2. DashboardCards: total requests, by status, by priority, by category.
3. Workload summary: technician workload table/list with clear unresolved formula note.
4. Recent activity summary: summary-safe status activity if provided by API.
5. Open question notice: visible Needs Human Review note for formula/access limitations.

Data shown from Skill 07: API-17 fields `totalRequests`, `byStatus`, `byPriority`, `byCategory`, `technicianWorkload`, optional `recentActivity`, `openQuestions`.

Primary actions: refresh dashboard, adjust date range if supported by API query.

Secondary actions: navigate to summary-safe request list.

State coverage: loading cards, empty dashboard with zero counts, invalid date range validation, forbidden non-dashboard role, server error.

Accessibility notes: dashboard values need text equivalents; chart-like display must not rely on color alone; tables/lists need labels and captions.

OPEN QUESTION: OPEN-07 means workload formula is not final. UI may show source-data label, but must not present a formula as approved.

OPEN QUESTION: OPEN-10 means Manager detail/internal-note access must remain Needs Human Review.

Traceability: FR-22, FR-23, US-16.

### UI-08 - Fallback Views

Purpose: Menangani direct URL, stale selection, invalid role/action, dan server failure.

Actors: all roles.

Structured layout:

1. Forbidden: explain active role cannot access the view/action and offer role switch or safe navigation.
2. Not found: explain request/technician not found and offer return to list.
3. Conflict/invalid transition: show current status and allowed next action if API provides it.
4. Server error: explain retry path without exposing technical details.

Data shown from Skill 07: common error contract (`FORBIDDEN`, `NOT_FOUND`, `INVALID_STATUS_TRANSITION`, `VALIDATION_ERROR`, `SERVER_ERROR`).

Traceability: NFR-01, NFR-06, FR-24, all protected workflow endpoints.

## Component Inventory

| Component | Purpose | Input data | States | Role visibility | Accessibility requirement | Traceability/API |
| --- | --- | --- | --- | --- | --- | --- |
| RoleSwitcher | Switch simulated active role. | Current role, available roles. | Default, focus, changed, invalid role feedback. | All roles. | Keyboard operable segmented/radio pattern; selected role announced. | FR-24, US-17, all role context. |
| RequestForm | Create service request. | reporterName, reporterType, title, description, location, category. | Idle, submitting, field error, form error, success. | Pelapor; forbidden for others. | Visible labels, helper text, error summary, disabled submit announced. | API-03, FR-01, FR-02. |
| RequestList | Display request summaries. | requestNumber, title, location, status, priority, category, assignment summary. | Loading, empty, populated, selected, error. | All roles with role-shaped data. | Keyboard selection and clear selected state. | API-02, FR-03. |
| RequestSearchFilter | Search/filter list. | keyword, status, priority, page/pageSize. | Idle, applying, empty result, validation error. | All roles. | Labelled inputs and clear filters control. | API-02, FR-04, FR-05. |
| RequestDetailPanel | Display detail context. | request detail, history, comments, notes, confirmation. | Loading, empty selected, forbidden, not found, populated. | Based on API visibility; Facility Manager Needs Human Review. | Heading structure and text labels for status/priority. | API-04, FR-06. |
| StatusBadge | Show one of six statuses. | status enum, optional status helper. | Default, compact, unknown error. | All roles. | Text label required; no color-only meaning. | BR-02, API status fields. |
| PriorityBadge | Show priority. | LOW, MEDIUM, HIGH, URGENT; suggestion flag. | Default, suggested, unset/error. | All roles where priority visible. | Text label and non-color cue. | BR-07, FR-09, FR-10. |
| ActionPanel | Render role/status actions. | role, status, request, assignment, confirmation, endpoint errors. | Idle, disabled, loading, success, validation error, conflict. | Role/status-specific. | Focus management for action forms and confirmations. | API-05 sampai API-16. |
| CommentArea | Public comments. | comments, authorRole, body draft. | Loading, empty, posting, error, success. | Pelapor, Administrator, Teknisi. | Label textarea; announce new comment feedback. | API-12, FR-16, BR-09. |
| InternalNoteArea | Internal notes. | internal notes, authorRole, body draft. | Hidden, loading, empty, posting, error. | Administrator, Teknisi; Manager Needs Human Review. | Clear "internal" label; not exposed to Pelapor. | API-13, FR-17, BR-10, OPEN-10. |
| StatusHistoryTimeline | Status history. | fromStatus, toStatus, changedByRole, timestamp, note. | Loading, empty anomaly, populated. | Detail-visible roles. | Ordered list semantics; status text plus timestamp. | DB-04, FR-18, BR-08. |
| DashboardCards | Dashboard summary. | totalRequests, byStatus, byPriority, byCategory, technicianWorkload. | Loading, zero data, populated, error. | Facility Manager, Administrator. | Numeric summaries as text; chart alternatives. | API-17, FR-22, FR-23. |
| FeedbackMessage | Command feedback. | type, message, field refs if any. | Success, info, warning, error. | All roles. | Screen-reader announcement and visible text. | Common API success/error. |
| EmptyState | Meaningful empty state. | context, recovery action. | No data, no result, no selection. | All roles. | Text explains state and next safe action. | AC-02.2, AC-03.2. |
| LoadingState | Loading/progress state. | context label. | List loading, detail loading, action submitting. | All roles. | Announce busy state and keep layout stable. | All API reads/commands. |
| ErrorState | Error and recovery. | error code, message, retry action. | Forbidden, not found, conflict, validation, server error. | All roles. | Error text must be visible and recoverable. | Common API error contract. |

## Form and Validation Feedback Design

| Form/action | Visible labels | Helper text | Field error | Form-level error | Success feedback | Disabled/loading submit |
| --- | --- | --- | --- | --- | --- | --- |
| Create Request | reporterName, reporterType, title, description, location, category. | Explain required fields and category controlled vocabulary. | Map API-03 `fields` errors to fields. | Show `VALIDATION_ERROR` or `FORBIDDEN`. | Created request number and `SUBMITTED` status. | Submit disabled while POST is pending. |
| Review | note. | Explain review moves `SUBMITTED` to `UNDER_REVIEW`. | Missing note. | Invalid transition/forbidden. | Updated status shown in StatusBadge and timeline. | Action disabled while PATCH is pending. |
| Classification | category, priority. | Category list Needs Human Review; priority values fixed. | Invalid category/priority. | Forbidden/not found. | Category/priority refreshed. | Submit disabled while PATCH is pending. |
| Assignment | technician, note. | Explain assignment moves reviewed request to `ASSIGNED`. | Missing technician/note. | Invalid transition. | Assignment summary and status update. | Submit disabled while pending. |
| Technician progress/resolve | note. | Explain required transition and status history. | Missing note. | Forbidden/conflict/not found. | Updated status and timeline event. | Button disabled while pending. |
| Public comment | body. | Public visibility is visible to Pelapor/Admin/Teknisi. | Empty body. | Forbidden/not found. | New comment appears and feedback message remains. | Submit disabled while posting. |
| Internal note | body. | Internal visibility limited to Admin/Teknisi. | Empty body. | Forbidden/not found. | New note appears to allowed roles. | Submit disabled while posting. |
| Confirm resolution | optional confirmationNote. | Confirmation does not change main status. | Invalid body if API rejects. | Conflict if not `RESOLVED`. | Confirmation summary appears. | Submit disabled while pending. |
| Close | note, manualOverride, manualOverrideNote when needed. | Normal close requires confirmation; override condition Needs Human Review. | Missing note/override note. | Conflict if not `RESOLVED`. | Status becomes `CLOSED`. | Confirmation action disabled while pending. |
| Reopen | note. | Reopen target status is `UNDER_REVIEW`. | Missing note. | Conflict/forbidden. | Status becomes `UNDER_REVIEW`. | Submit disabled while pending. |

## UI State Coverage

| State | UI behavior | API source |
| --- | --- | --- |
| Loading | Stable skeleton/progress for list/detail/dashboard; disabled submit for commands. | Pending API-02 sampai API-17. |
| Empty | RequestList empty, search/filter no result, dashboard zero data, comments/notes empty copy. | API-02 `meta.empty`, API-17 zero counts. |
| Success | FeedbackMessage plus refreshed list/detail/status timeline. | 200/201 success responses. |
| Validation error | Field errors near inputs plus form-level summary. | `422 VALIDATION_ERROR` with `fields`. |
| Error | Recoverable ErrorState for invalid query/action and unexpected command failure. | `400`, generic error contract. |
| Forbidden | Explain active role cannot access action/view; offer role switch or safe navigation. | `403 FORBIDDEN`. |
| Not found | Explain request/technician missing; offer return to list/task list. | `404 NOT_FOUND`. |
| Conflict/invalid transition | Show current status and allowed next status/action if provided; refresh detail. | `409 INVALID_STATUS_TRANSITION`. |
| Server error | Show retry and non-technical message; preserve user draft when possible. | `500 SERVER_ERROR`. |

## Accessibility Checklist

- [ ] Use semantic landmarks for header, nav, main, section, form, list/table, and dialog/confirmation in implementation.
- [ ] Maintain ordered heading hierarchy for shell, view, panel, and form sections.
- [ ] Ensure keyboard navigation for RoleSwitcher, nav, filters, RequestList selection, forms, action panels, confirmation dialogs, comments, and dashboard controls.
- [ ] Provide visible focus state for all interactive elements.
- [ ] Connect field errors to fields and provide form-level error summary.
- [ ] Announce loading and command result messages through accessible feedback regions.
- [ ] Preserve WCAG AA contrast for text, focus indicators, status, priority, and dashboard summaries.
- [ ] Do not use color as the only status, priority, or chart/dashboard differentiator.
- [ ] Maintain minimum 44px touch targets for buttons, role switches, list rows/actions, filters, and confirmation controls.
- [ ] Ensure text labels do not truncate critical status, priority, request number, or error message content.
- [ ] Keep destructive/final actions close/reopen/manual override confirmation keyboard accessible and cancellable.

## Design Token Guidance

These tokens are descriptive design guidance only, not implementation code and not final visual branding.

| Token group | Semantic roles |
| --- | --- |
| Color roles | `surface`, `surface-muted`, `surface-raised`, `text-primary`, `text-secondary`, `border-default`, `primary-action`, `danger-action`, `success-feedback`, `warning-feedback`, `info-feedback`, `focus-ring`, `disabled-surface`. |
| Status roles | `status-submitted`, `status-under-review`, `status-assigned`, `status-in-progress`, `status-resolved`, `status-closed`; each must include text/pattern cue beyond color. |
| Priority roles | `priority-low`, `priority-medium`, `priority-high`, `priority-urgent`; priority must include visible label and optional icon/shape cue. |
| Spacing | Small increments for dense operational UI: compact form gaps, list row spacing, panel spacing, dashboard card spacing, and confirmation dialog spacing. |
| Typography | Page title, section heading, panel heading, body text, metadata, field label, helper/error text, badge label, numeric dashboard value. |
| Radius | Modest radius for panels/cards/inputs; avoid excessive rounding for operational tool surfaces. |
| Elevation | Only for overlay/confirmation and raised panels when needed; avoid decorative depth. |
| State tokens | `hover`, `active`, `focus-visible`, `disabled`, `loading`, `error`, `success`, `selected`, `readonly`. |

Reference note: Figma Community and UI UX Pro Max may inspire component inventory, responsive behavior, dashboard patterns, and pre-delivery accessibility checks, but no dependency or visual system is chosen in Skill 08.

## API-to-UI Mapping

| UI action/view | Endpoint | UI component(s) | Success UI | Error UI |
| --- | --- | --- | --- | --- |
| Health check for app readiness | `GET /api/health` | Application Shell, ErrorState | App readiness indicator if used. | ServerErrorState. |
| List/search/filter requests | `GET /api/requests` | RequestWorkspace, RequestSearchFilter, RequestList | List populated or EmptyState. | ErrorState/ForbiddenState. |
| Create request | `POST /api/requests` | RequestForm, FeedbackMessage | Request number, `SUBMITTED`, list refresh. | Field errors, form error, forbidden, conflict. |
| Open request detail | `GET /api/requests/:id` | RequestDetailPanel, StatusHistoryTimeline, CommentArea, InternalNoteArea | Detail rendered by visibility. | Forbidden, not found, server error. |
| Review submitted request | `PATCH /api/requests/:id/review` | ActionPanel | StatusBadge `UNDER_REVIEW`, timeline update. | Validation/conflict/forbidden. |
| Set category/priority | `PATCH /api/requests/:id/classification` | ActionPanel, PriorityBadge | Category/priority refreshed. | Validation for category/priority; OPEN-05/OPEN-06 notes. |
| Assign technician | `PATCH /api/requests/:id/assignment` | ActionPanel | Assignment summary, status `ASSIGNED`. | Missing technician, conflict, not found. |
| View technician tasks | `GET /api/technicians/:id/tasks` | TechnicianTasks, RequestList | Task list or EmptyState. | Forbidden, technician not found, invalid filter. |
| Accept task | `PATCH /api/requests/:id/accept` | ActionPanel | Accepted state/timestamp shown. | Forbidden, conflict, missing technician. |
| Start progress | `PATCH /api/requests/:id/progress` | ActionPanel, StatusBadge | Status `IN_PROGRESS`, timeline update. | Invalid transition or missing note. |
| Resolve work | `PATCH /api/requests/:id/resolve` | ActionPanel, StatusBadge | Status `RESOLVED`, timeline update. | Invalid transition; OPEN-11 note remains. |
| Add public comment | `POST /api/requests/:id/comments` | CommentArea | Comment appended. | Empty body, forbidden, not found. |
| Add internal note | `POST /api/requests/:id/internal-notes` | InternalNoteArea | Internal note appended for allowed roles. | Forbidden for Pelapor/Manager; OPEN-10 note. |
| Confirm resolution | `PATCH /api/requests/:id/confirm-resolution` | ActionPanel, RequestDetailPanel | Confirmation summary shown; status unchanged. | Conflict if not `RESOLVED`. |
| Close request | `PATCH /api/requests/:id/close` | ActionPanel, StatusBadge | Status `CLOSED`, timeline update. | Missing note/override note, invalid transition; OPEN-03/OPEN-11 notes. |
| Reopen request | `PATCH /api/requests/:id/reopen` | ActionPanel, StatusBadge | Status `UNDER_REVIEW`, timeline update. | Missing note, invalid transition; OPEN-04 note. |
| Dashboard summary | `GET /api/dashboard/summary` | DashboardCards | Summary cards and workload source data. | Forbidden, invalid date range, server error; OPEN-07/OPEN-10 notes. |

## Traceability Links

| Design ID | Design area | Related requirement/rule/story |
| --- | --- | --- |
| UI-01 | Application shell, navigation, RoleSwitcher | FR-24, US-17, NFR-01 |
| UI-02 | Request Workspace list/search/filter/detail | FR-03, FR-04, FR-05, FR-06, FR-18, US-02 sampai US-05 |
| UI-03 | Create Request form and feedback | FR-01, FR-02, FR-10, BR-01, BR-05, US-01 |
| UI-04 | Request Detail, comments, notes, status history | FR-06, FR-16, FR-17, FR-18, BR-09, BR-10, US-05, US-11, US-12 |
| UI-05 | Administrator review/classify/assign/close/reopen actions | FR-07, FR-08, FR-09, FR-10, FR-11, FR-20, FR-21, BR-02 sampai BR-08, BR-11, BR-12, US-06 sampai US-08, US-14, US-15 |
| UI-06 | Technician Tasks and technician workflow actions | FR-12, FR-13, FR-14, FR-15, FR-18, US-09, US-10 |
| UI-07 | Dashboard Summary | FR-22, FR-23, US-16 |
| UI-08 | Fallback state design | NFR-01, NFR-06, FR-24, all protected workflow actions |
| UI-09 | Component inventory and form feedback design | NFR-01, NFR-06, NFR-07, FR-01 sampai FR-24 |
| UI-10 | Accessibility-first and design token guidance | NFR-01, NFR-07, US-01 sampai US-17 |

## Risks, Assumptions, and Open Questions

| ID | Type | UI impact |
| --- | --- | --- |
| ASSUMPTION-08-01 | ASSUMPTION | RoleSwitcher is used for role simulation because full authentication is not in the approved scope. |
| ASSUMPTION-08-02 | ASSUMPTION | Request Workspace uses master-detail layout because Skill 06 approved this application shell direction. |
| ASSUMPTION-08-03 | ASSUMPTION | Dashboard can show summary-safe operational data without exposing internal note content until OPEN-10 is resolved. |
| OPEN-02 | OPEN QUESTION | Create Request only includes approved `reporter_name` and `reporter_type`; extra reporter fields must wait for Human Review. |
| OPEN-03 | OPEN QUESTION / Needs Human Review | Administrator close UI may collect override note if override is selected, but must not decide valid manual override conditions. |
| OPEN-04 | OPEN QUESTION | Reopen UI is Administrator-only under current baseline; Pelapor request-to-reopen is not added. |
| OPEN-05 | OPEN QUESTION / Needs Human Review | Category dropdown/options cannot be final; UI must mark category list as pending approved controlled vocabulary. |
| OPEN-06 | OPEN QUESTION | Priority criteria helper text cannot define final criteria; UI can show allowed values only. |
| OPEN-07 | OPEN QUESTION / Needs Human Review | Dashboard workload display must not claim a final formula; show source-data or Needs Human Review limitation. |
| OPEN-08 | OPEN QUESTION | Technician Tasks must not include reject-task/reassignment UI. |
| OPEN-10 | OPEN QUESTION / Needs Human Review | Facility Manager detail and internal-note access remains unresolved; UI baseline shows dashboard/ringkasan only. |
| OPEN-11 | OPEN QUESTION / Needs Human Review | StatusBadge and StatusHistoryTimeline must keep strict 6 statuses; any waiting-confirmation marker remains non-status and pending Human Review. |

## Quality Check

| Check | Result |
| --- | --- |
| Review status and source summary are present. | PASS |
| Required inputs were read, including approved architecture and approved database/API design. | PASS |
| UI covers four actors: Pelapor, Administrator, Teknisi, Manajer Fasilitas. | PASS |
| Navigation model and RoleSwitcher are documented. | PASS |
| Required views are documented: Request Workspace, Create Request, Request Detail, Administrator Review/Classify/Assign, Technician Tasks, Dashboard Summary. | PASS |
| Wireframes are descriptive text, not images or code. | PASS |
| Required reusable components are covered. | PASS |
| Role-based UI matrix does not replace API validation. | PASS |
| API-to-UI mapping covers API-01 through API-17. | PASS |
| UI state coverage includes loading, empty, success, error, forbidden, not found, conflict/invalid transition, and server error. | PASS |
| Form feedback covers visible labels, helper text, field error, form-level error, success feedback, and disabled/loading submit. | PASS |
| Accessibility checklist includes semantic structure, keyboard navigation, visible focus, accessible form errors, WCAG AA contrast, and 44px touch target. | PASS |
| Design token guidance is descriptive and does not lock final color/font/library. | PASS |
| Open questions are marked and not decided by Skill 08. | PASS |
| Strict 6 status workflow is preserved without adding a seventh status. | PASS |
| No React, CSS, HTML, TypeScript, SQL, API implementation, test, or deployment is added. | PASS |

## Human Review Checklist

- [ ] UI design follows `instruksi-dosen.md`, `CASE.md`, final requirements, Skill 06, and Skill 07.
- [ ] No new requirement, feature, status, actor, or scope is added.
- [ ] Navigation and RoleSwitcher are clear for 4 actors.
- [ ] Required views and wireframes are clear enough for later implementation planning.
- [ ] Component inventory is sufficient and reusable.
- [ ] Every UI action maps to the correct Skill 07 endpoint.
- [ ] Role-Based UI still treats API validation as final authority.
- [ ] Loading, empty, success, validation error, forbidden, not found, conflict, and server error states are covered.
- [ ] Form design supports visible labels, helper text, field errors, form-level errors, success feedback, and disabled/loading submit.
- [ ] Accessibility checklist is strong enough for implementation review.
- [ ] Status and priority are not color-only.
- [ ] OPEN-03, OPEN-05, OPEN-07, OPEN-10, and OPEN-11 are kept as Needs Human Review.
- [ ] Document remains design-only and does not write React, CSS, component library implementation, test, API, database, or deployment work.
