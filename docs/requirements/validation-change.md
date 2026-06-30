# Requirements Validation and Change Management

| Review Status | Human Reviewed Draft |
| --- | --- |
| AI assistance | Draft awal dibuat dengan bantuan AI, diperiksa melalui sesi `grill-with-docs`, lalu dirapikan memakai skill `05-validation-change`. |
| Human decision | Keputusan final tetap berada pada project owner. |

## Validation Scope

- Inputs reviewed:
  - `docs/requirements/requirements.md`
  - `docs/requirements/user-stories.md`
  - `docs/requirements/prioritization.md`
  - `docs/requirements/elicitation.md`
  - `CASE.md`
  - `instruksi-dosen.md`
- Selection rationale:
  - Validasi difokuskan pada requirement yang berisiko tinggi, menjadi dependency utama, atau berasal dari human-reviewed assumption: report creation, technician assignment, status history, close/reopen, role-based access, dashboard workload, dan testing/CI.

## Minimum Work Product Check

| Item | Minimum | Current Draft | Status |
| --- | --- | --- | --- |
| Functional requirement | 12 | 20 | PASS |
| Non-functional requirement | 6 | 9 | PASS |
| Business rule | 5 | 12 | PASS |
| User story | 10 | 12 | PASS |
| Acceptance criteria | 2 per user story | Minimum 2 for every story | PASS |
| Change request | 1 | CR-01 | PASS |
| Automated test | 20 | 2 existing tests; additional tests pending | OPEN QUESTION |
| GitHub Issues | 10 | Pending | OPEN QUESTION |
| Pull Request | 6 | Pending | OPEN QUESTION |
| Deployment URL | 1 | Pending | OPEN QUESTION |

## Validation Results

### FR-01

- Original statement: Sistem harus memungkinkan Pelapor membuat laporan masalah fasilitas kampus.
- Clarity: PASS - Actor and behavior are explicit.
- Completeness: PASS - Supported by US-01 and validation criteria for successful and failed submission.
- Consistency: PASS - Matches official case and current initial implementation.
- Feasibility: PASS - Basic implementation already exists in `src/App.tsx`, `worker/index.ts`, and D1 migration.
- Testability: PASS - AC-US01-01 through AC-US01-04 define observable outcomes.
- Traceability: PASS - Linked to US-01, EL-01, priority Must, and existing code.
- Proposed revision: None.
- Revision rationale: None.
- Affected artifacts: None.

### FR-10

- Original statement: Sistem harus memungkinkan Administrator menugaskan laporan kepada teknisi yang terdaftar.
- Clarity: PASS - Actor, object, and boundary are explicit.
- Completeness: PASS - Defines registered technician boundary and assignment outcome.
- Consistency: PASS - Matches technician entity decision and official assignment workflow.
- Feasibility: PASS - Requires new technician data model and assignment endpoint, but fits Cloudflare D1 and Workers constraints.
- Testability: PASS - AC-US08-01 through AC-US08-03 cover valid and invalid assignment.
- Traceability: PASS - Linked to US-08, EL-07, EL-C-04, BR-04, and priority Must.
- Proposed revision: None.
- Revision rationale: None.
- Affected artifacts: None.

### FR-14

- Original statement: Sistem harus menyimpan riwayat setiap perubahan status, termasuk status asal, status tujuan, role pengubah, catatan, dan waktu perubahan.
- Clarity: PASS - Required fields are explicit.
- Completeness: PASS - Captures actor role, transition, note, and timestamp.
- Consistency: PASS - Supports official workflow and avoids unsupported status additions.
- Feasibility: PASS - Requires status history table and status-changing API paths.
- Testability: PASS - AC-US06-02, AC-US09-03, and AC-US11-04 define verification points.
- Traceability: PASS - Linked to US-05, US-06, US-08, US-09, US-11, BR-07, and priority Must.
- Proposed revision: None.
- Revision rationale: None.
- Affected artifacts: None.

### FR-15

- Original statement: Sistem harus memungkinkan Administrator menutup laporan setelah pekerjaan selesai dan hasil dikonfirmasi atau melalui manual override dengan catatan.
- Clarity: PASS - Actor and two closure paths are explicit.
- Completeness: PASS - Includes normal confirmation and override path.
- Consistency: PASS - Does not introduce extra statuses and matches accepted workflow decision.
- Feasibility: PASS - Requires confirmation/override fields or action metadata during close.
- Testability: PASS - AC-US11-01 and AC-US11-02 define testable closure paths.
- Traceability: PASS - Linked to US-11, EL-08, EL-09, BR-12, and priority Must.
- Proposed revision: None.
- Revision rationale: None.
- Affected artifacts: None.

### FR-16

- Original statement: Sistem harus memungkinkan Administrator membuka kembali laporan yang sudah ditutup dan mengembalikannya ke status under review.
- Clarity: PASS - Source status, actor, and target status are explicit.
- Completeness: PASS - Reopen action and target state are defined.
- Consistency: PASS - Aligns with six-status workflow and accepted anti-workflow-skipping decision.
- Feasibility: PASS - Requires status update endpoint and history record.
- Testability: PASS - AC-US11-03 and AC-US11-04 verify status and history.
- Traceability: PASS - Linked to US-11, EL-C-03, BR-08, and priority Must.
- Proposed revision: None.
- Revision rationale: None.
- Affected artifacts: None.

### FR-19

- Original statement: Sistem harus menyesuaikan aksi dan informasi pada UI berdasarkan role aktif pada simulasi role.
- Clarity: PASS - UI behavior and role simulation boundary are explicit.
- Completeness: OPEN QUESTION - Pelapor report visibility is still unresolved.
- Consistency: PASS - Matches CR-01 and avoids full authentication scope.
- Feasibility: PASS - Can be implemented with UI state and conditional rendering.
- Testability: PASS - AC-US01-04, AC-US06-03, and other role-aware ACs support verification.
- Traceability: PASS - Linked to US-01, US-05, US-06, US-10, CR-01, and priority Must.
- Proposed revision: None.
- Revision rationale: Visibility detail should be finalized during UI/API design without changing the main requirement.
- Affected artifacts: UI design and API design.

### FR-20

- Original statement: API harus menolak aksi yang tidak sesuai dengan role aktif pada simulasi role.
- Clarity: PASS - API responsibility is explicit.
- Completeness: OPEN QUESTION - Transport mechanism for active role must be designed.
- Consistency: PASS - Complements FR-19 and CR-01.
- Feasibility: PASS - Can be implemented through request payload/header validation in Worker routes for this non-authenticated scope.
- Testability: PASS - Role rejection can be tested with API/unit/integration tests.
- Traceability: PASS - Linked to role-aware user stories, CR-01, and priority Must.
- Proposed revision: None.
- Revision rationale: Implementation mechanism belongs in API design.
- Affected artifacts: `docs/design/database-api.md`, Worker routes, integration tests.

### FR-18

- Original statement: Sistem harus menampilkan beban tugas per teknisi pada dashboard.
- Clarity: PASS - Metric and stakeholder are explicit.
- Completeness: PASS - Dependency on technician assignment is documented.
- Consistency: PASS - Classified as Should, so it does not block minimum dashboard if sequencing requires delay.
- Feasibility: PASS - Requires aggregation query over assigned requests.
- Testability: PASS - AC-US12-03 defines observable result.
- Traceability: PASS - Linked to US-12, EL-14, FR-10, FR-17, and priority Should.
- Proposed revision: None.
- Revision rationale: None.
- Affected artifacts: None.

### NFR-06

- Original statement: Project harus memiliki automated tests dan GitHub Actions.
- Clarity: PASS - Target and verification method are explicit.
- Completeness: OPEN QUESTION - Current project has only initial tests; remaining test plan is pending.
- Consistency: PASS - Matches official minimum of 20 automated tests and existing CI.
- Feasibility: PASS - Vitest and GitHub Actions are already configured.
- Testability: PASS - Can be verified with `npm test -- --run`, `npm run build`, and GitHub Actions.
- Traceability: PASS - Linked to testing docs, CI workflow, and traceability matrix.
- Proposed revision: None.
- Revision rationale: Additional tests are implementation backlog, not requirement wording issue.
- Affected artifacts: `tests/`, `docs/testing/`, `.github/workflows/ci.yml`.

## Unresolved Open Questions

- `OQ-01`: Should Pelapor see all reports or only reports they created?
- `OQ-02`: Should role simulation be documented as a known limitation in README and deployment docs?
- `OQ-03`: Are roadmap items documentation-only unless all Must and Should items are complete?
- `OQ-04`: What exact request mechanism will carry the active simulated role to the Worker API?

## Validation Summary

- The requirements set satisfies the numeric minimum for FR, NFR, BR, user stories, and acceptance criteria.
- The prioritized baseline is internally consistent with the six-status workflow and role simulation change request.
- The main remaining risks are implementation and documentation risks, not blockers for moving into design.
- Requirements are ready for design work with open questions carried forward into architecture, database/API, and UI design.

## Human Review Status

- Status: Human Reviewed Draft.
- Human decision still required before marking this requirements baseline final.

---

# Requirement Change Request

## CR-01 - Simulasi Role untuk Versi Awal

## Change Description

Gunakan simulasi role melalui UI dan API validation untuk merepresentasikan Pelapor, Administrator, Teknisi, dan Manajer Fasilitas tanpa membuat autentikasi penuh atau Login Google pada scope awal.

## Reason and Source

- Login Google secara eksplisit termasuk fitur yang tidak wajib dalam instruksi dosen.
- Sistem tetap memiliki aktor yang berbeda, sehingga role-based UI dan API validation dibutuhkan agar workflow dapat diuji.
- Human reviewer menyetujui simulasi role sebagai strategi untuk memprioritaskan core workflow.

## Classification

- Evidence labels: FACT, ASSUMPTION, CONSTRAINT

## Affected Artifacts

- Requirements: FR-02, FR-19, FR-20
- User stories: US-01, US-05, US-06, US-10
- Business rules: BR-10, BR-11
- NFR: NFR-08
- Future docs: README, deployment notes, known limitations, UI design, API design, tests

## Impact Analysis

- Scope: Reduces authentication scope while preserving role-specific workflow behavior.
- Consistency: Consistent with the instruction that Login Google is not required.
- Feasibility: Feasible in React and Cloudflare Workers through simulated active role state and API checks.
- Testability: Improves testability because role permissions can be tested without external identity provider setup.
- Traceability: Must be linked from requirements to UI/API design, tests, and known limitations.
- Stakeholder interests: Pelapor, Administrator, Teknisi, and Manajer Fasilitas can still exercise their workflows in the system.
- Dependencies and priorities: Supports FR-19 and FR-20 as Must; full authentication remains future enhancement.

## Risks and Uncertainties

- Risk: Users may misinterpret role simulation as real authentication if not documented.
- Risk: API role validation mechanism must be designed carefully to avoid claiming real security.
- Uncertainty: Whether final README should label this as known limitation or accepted design simplification.

## Decision

- Recommendation: ACCEPT
- Rationale: The change is consistent with official scope, avoids a non-required authentication feature, and enables role-based workflow testing.
- Conditions:
  - Document role simulation as an accepted change and known limitation.
  - Do not claim production-grade authentication.
  - Keep full authentication as future enhancement only.
  - Ensure UI and API tests cover role-based allowed and rejected actions.

## Required Follow-up Updates

- Add role simulation details to design docs.
- Add role-based tests during implementation.
- Mention role simulation in README and deployment/submission known limitations.
- Keep `CR-01` linked in traceability and evidence.

## Human Approval Status

- Status: Accepted by project owner during requirements review session.
