# Requirements Validation

| Review Status | Human Reviewed & Approved |
| --- | --- |
| Skill AI | Skill 05 - Validation dan Change (`requirements-validation-change-management`) |
| Human decision | Disetujui |

## Validation Scope

- Inputs reviewed: `instruksi-dosen.md`, `CASE.md`, `docs/requirements/inception.md`, `docs/requirements/elicitation.md`, `docs/requirements/requirements.md`, `docs/requirements/user-stories.md`, `docs/requirements/prioritization.md`, `docs/requirements/traceability.md`, `docs/requirements/grill-session-summary.md`, `evidence/human-review-inception.md`, `evidence/human-review-elicitation.md`, `evidence/human-review-specification.md`, and `evidence/human-review-prioritization.md`.
- Prerequisite review status: Skill 01, Skill 02, Skill 03, and Skill 04 are recorded as `Human Reviewed & Approved`, with evidence files showing `Disetujui`.
- Validation coverage rule: This Skill 05 draft validates every FR, NFR, BR, and US from `docs/requirements/requirements.md` and `docs/requirements/user-stories.md`.
- Baseline rule: This document does not directly change approved FR, NFR, BR, User Story, or Acceptance Criteria text. Proposed changes are isolated in `docs/requirements/change-request.md`.

## Selection Rationale

Skill 05 originally requires at least five requirements, but this project review requires full coverage. Therefore, validation covers:

- FR-01 through FR-24 from `docs/requirements/requirements.md`.
- NFR-01 through NFR-09 from `docs/requirements/requirements.md`.
- BR-01 through BR-12 from `docs/requirements/requirements.md`.
- US-01 through US-17 from `docs/requirements/user-stories.md`.

Items affected by unresolved policy or data questions are marked `OPEN QUESTION`, not rewritten.

## Validation Legend

- `PASS`: The item is clear enough, consistent with approved artifacts, feasible within known constraints, testable or reviewable through stated criteria, and traceable to related artifacts.
- `OPEN QUESTION`: The item is valid at the capability level, but one or more details remain unresolved in approved artifacts.
- `FAIL`: The item conflicts with approved artifacts or lacks a defensible trace. No `FAIL` remains after this draft; unresolved details are preserved as `OPEN QUESTION`.

## FR Validation Matrix

| ID | Related US/AC/BR | Priority | Clarity | Completeness | Consistency | Feasibility | Testability | Traceability | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| FR-01 | US-01; AC-01.1-AC-01.3; BR-01 | Must | PASS | PASS | PASS | PASS | PASS | PASS | Creation, storage, initial status, and reporter fields are covered. |
| FR-02 | US-01; AC-01.3; FR-10 | Must | PASS | OPEN QUESTION | PASS | PASS | PASS | PASS | Approved fields are `reporter_name` and `reporter_type`; OPEN-02 may add extra identity data later. |
| FR-03 | US-02; AC-02.1-AC-02.2 | Must | PASS | PASS | PASS | PASS | PASS | PASS | List behavior and empty state are covered. |
| FR-04 | US-03; AC-03.1-AC-03.2 | Should | PASS | PASS | PASS | PASS | PASS | PASS | Search is in scope and not treated as out-of-scope or optional outside the baseline. |
| FR-05 | US-04; AC-04.1-AC-04.3; BR-02, BR-07 | Should | PASS | PASS | PASS | PASS | PASS | PASS | Combined status and priority filtering is covered. |
| FR-06 | US-05; AC-05.1-AC-05.3 | Must | PASS | OPEN QUESTION | PASS | PASS | PASS | PASS | Detail view is covered; OPEN-10 affects Manajer Fasilitas detail/internal-note access boundaries. |
| FR-07 | US-06; AC-06.1-AC-06.2; BR-03 | Must | PASS | PASS | PASS | PASS | PASS | PASS | Review before assignment is explicit and role-restricted. |
| FR-08 | US-07; AC-07.1; BR-06 | Must | PASS | OPEN QUESTION | PASS | PASS | OPEN QUESTION | PASS | OPEN-05 leaves final category values undefined. |
| FR-09 | US-07; AC-07.2; BR-04, BR-07 | Must | PASS | OPEN QUESTION | PASS | PASS | PASS | PASS | OPEN-06 leaves priority criteria undefined, but allowed values are testable. |
| FR-10 | US-07; AC-07.3; BR-05 | Should | PASS | OPEN QUESTION | PASS | PASS | PASS | PASS | Lecturer HIGH suggestion is clear; OPEN-06 still affects priority-policy explanation. |
| FR-11 | US-08; AC-08.1-AC-08.2; BR-03 | Must | PASS | PASS | PASS | PASS | PASS | PASS | Assignment after review is covered. |
| FR-12 | US-09; AC-09.1 | Must | PASS | PASS | PASS | PASS | PASS | PASS | Technician task visibility is covered. |
| FR-13 | US-09; AC-09.2 | Should | PASS | OPEN QUESTION | PASS | PASS | PASS | PASS | OPEN-08 leaves rejection/reassignment behavior unresolved. |
| FR-14 | US-10; AC-10.1; BR-02, BR-08 | Must | PASS | PASS | PASS | PASS | PASS | PASS | Progress transition to `IN_PROGRESS` is covered. |
| FR-15 | US-10; AC-10.2; BR-02, BR-08 | Must | PASS | PASS | PASS | PASS | PASS | PASS | Resolution transition to `RESOLVED` is covered. |
| FR-16 | US-11; AC-11.1-AC-11.2; BR-09 | Should | PASS | PASS | PASS | PASS | PASS | PASS | Public-comment storage and visibility are covered. |
| FR-17 | US-12; AC-12.1-AC-12.3; BR-10 | Could | PASS | OPEN QUESTION | PASS | PASS | PASS | PASS | Internal-note visibility is covered for Pelapor/Admin/Teknisi; OPEN-10 affects Manajer Fasilitas access. |
| FR-18 | US-05, US-10; AC-05.2, AC-10.3; BR-08 | Must | PASS | PASS | PASS | PASS | PASS | PASS | Status-history fields are defined by BR-08. |
| FR-19 | US-13; AC-13.1-AC-13.2; BR-11 | Must | PASS | OPEN QUESTION | PASS | PASS | PASS | PASS | OPEN-11 leaves waiting-confirmation representation unresolved. |
| FR-20 | US-14; AC-14.1-AC-14.2; BR-11 | Must | PASS | OPEN QUESTION | PASS | PASS | PASS | PASS | OPEN-03 leaves manual override conditions unresolved; OPEN-11 affects confirmation state representation. |
| FR-21 | US-15; AC-15.1-AC-15.2; BR-12 | Should | PASS | OPEN QUESTION | PASS | PASS | PASS | PASS | OPEN-04 leaves reopen initiation unclear. |
| FR-22 | US-16; AC-16.1 | Should | PASS | OPEN QUESTION | PASS | PASS | PASS | PASS | Dashboard summary is covered; OPEN-10 may affect detail access. |
| FR-23 | US-16; AC-16.2 | Could | PASS | OPEN QUESTION | PASS | OPEN QUESTION | OPEN QUESTION | PASS | OPEN-07 leaves technician workload formula undefined. |
| FR-24 | US-17; AC-17.1-AC-17.2 | Must | PASS | PASS | PASS | PASS | PASS | PASS | Role-based UI is traceable to the approved role simulator decision. |

## NFR Validation Matrix

| ID | Priority | Clarity | Completeness | Consistency | Feasibility | Testability | Traceability | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| NFR-01 | Must | PASS | PASS | PASS | PASS | PASS | PASS | React frontend has location and build verification method. |
| NFR-02 | Must | PASS | PASS | PASS | PASS | PASS | PASS | Cloudflare Workers API has configuration and endpoint verification method. |
| NFR-03 | Must | PASS | PASS | PASS | PASS | PASS | PASS | Cloudflare D1 has binding and migration verification method. |
| NFR-04 | Must | PASS | PASS | PASS | PASS | PASS | PASS | Free-service constraint prevents mandatory paid-service dependencies. |
| NFR-05 | Must | PASS | PASS | PASS | PASS | PASS | PASS | GitHub branch/commit/PR workflow is observable. |
| NFR-06 | Must | PASS | OPEN QUESTION | PASS | PASS | PASS | PASS | Minimum 20 automated tests is clear, but final test inventory is future work. |
| NFR-07 | Must | PASS | PASS | PASS | PASS | PASS | PASS | Traceability matrix exists and is updated as stages progress. |
| NFR-08 | Must | PASS | PASS | PASS | PASS | PASS | PASS | Human review evidence exists for Skills 01-04 and Skill 05 evidence is prepared for review. |
| NFR-09 | Must | PASS | PASS | PASS | PASS | PASS | PASS | Secret safety is reviewable by repository scan/manual review. |

## BR Validation Matrix

| ID | Priority | Clarity | Completeness | Consistency | Feasibility | Testability | Traceability | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BR-01 | Must | PASS | PASS | PASS | PASS | PASS | PASS | Initial `SUBMITTED` status is covered by US-01. |
| BR-02 | Must | PASS | PASS | PASS | PASS | PASS | PASS | Strict 6 statuses are consistent with `CASE.md` and `grill-session-summary.md`. |
| BR-03 | Must | PASS | PASS | PASS | PASS | PASS | PASS | Review before assignment is covered by US-06 and US-08. |
| BR-04 | Must | PASS | PASS | PASS | PASS | PASS | PASS | Administrator owns final priority decision. |
| BR-05 | Should | PASS | OPEN QUESTION | PASS | PASS | PASS | PASS | Lecturer suggestion is clear; OPEN-06 affects priority criteria context. |
| BR-06 | Must | PASS | OPEN QUESTION | PASS | PASS | OPEN QUESTION | PASS | Controlled vocabulary is clear; OPEN-05 leaves values undefined. |
| BR-07 | Must | PASS | PASS | PASS | PASS | PASS | PASS | Priority values are enumerated. |
| BR-08 | Must | PASS | PASS | PASS | PASS | PASS | PASS | Required status-history fields are enumerated. |
| BR-09 | Should | PASS | PASS | PASS | PASS | PASS | PASS | Public-comment visibility is explicit. |
| BR-10 | Could | PASS | OPEN QUESTION | PASS | PASS | PASS | PASS | Admin/Teknisi visibility is explicit; OPEN-10 affects Manajer Fasilitas boundary. |
| BR-11 | Must | PASS | OPEN QUESTION | PASS | PASS | PASS | PASS | OPEN-03 and OPEN-11 affect override conditions and waiting-confirmation representation. |
| BR-12 | Should | PASS | OPEN QUESTION | PASS | PASS | PASS | PASS | Reopen target status is explicit; OPEN-04 affects trigger/initiator. |

## User Story Validation Matrix

| ID | Supports | Priority | Clarity | Completeness | Consistency | Feasibility | Testability | Traceability | Finding |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| US-01 | FR-01, FR-02, BR-01 | Must | PASS | OPEN QUESTION | PASS | PASS | PASS | PASS | ACs cover creation and reporter fields; OPEN-02 may add extra identity data. |
| US-02 | FR-03 | Must | PASS | PASS | PASS | PASS | PASS | PASS | List and empty state are covered. |
| US-03 | FR-04 | Should | PASS | PASS | PASS | PASS | PASS | PASS | Search result and empty result are observable. |
| US-04 | FR-05 | Should | PASS | PASS | PASS | PASS | PASS | PASS | Status, priority, and combined filters are covered. |
| US-05 | FR-06, FR-18 | Must | PASS | OPEN QUESTION | PASS | PASS | PASS | PASS | Detail/history are covered; OPEN-10 affects Manajer Fasilitas visibility. |
| US-06 | FR-07, BR-03 | Must | PASS | PASS | PASS | PASS | PASS | PASS | Administrator review and role restriction are covered. |
| US-07 | FR-08, FR-09, FR-10, BR-04, BR-05, BR-06, BR-07 | Must | PASS | OPEN QUESTION | PASS | PASS | OPEN QUESTION | PASS | OPEN-05 and OPEN-06 affect category values and priority criteria. |
| US-08 | FR-11, BR-03 | Must | PASS | PASS | PASS | PASS | PASS | PASS | Assignment after review and `ASSIGNED` transition are covered. |
| US-09 | FR-12, FR-13 | Must | PASS | OPEN QUESTION | PASS | PASS | PASS | PASS | Viewing and accepting tasks are covered; OPEN-08 affects rejection/reassignment. |
| US-10 | FR-14, FR-15, FR-18, BR-02, BR-08 | Must | PASS | PASS | PASS | PASS | PASS | PASS | Progress, resolution, and history fields are covered. |
| US-11 | FR-16, BR-09 | Should | PASS | PASS | PASS | PASS | PASS | PASS | Public-comment storage and visibility are covered. |
| US-12 | FR-17, BR-10 | Could | PASS | OPEN QUESTION | PASS | PASS | PASS | PASS | Internal-note visibility is covered for named roles; OPEN-10 affects Manajer Fasilitas boundary. |
| US-13 | FR-19, BR-11 | Must | PASS | OPEN QUESTION | PASS | PASS | PASS | PASS | Confirmation is covered; OPEN-11 affects waiting-confirmation representation. |
| US-14 | FR-20, BR-11 | Must | PASS | OPEN QUESTION | PASS | PASS | PASS | PASS | Closure and override note are covered; OPEN-03 and OPEN-11 remain unresolved. |
| US-15 | FR-21, BR-12 | Should | PASS | OPEN QUESTION | PASS | PASS | PASS | PASS | Reopen behavior is covered; OPEN-04 affects initiator/trigger. |
| US-16 | FR-22, FR-23 | Should | PASS | OPEN QUESTION | PASS | OPEN QUESTION | OPEN QUESTION | PASS | Dashboard summary is covered; OPEN-07 and OPEN-10 affect workload formula and access boundaries. |
| US-17 | FR-24 | Must | PASS | PASS | PASS | PASS | PASS | PASS | Role-based action visibility and role switching are covered. |

## Coverage Against Mandatory Features

| Mandatory feature from `instruksi-dosen.md` | Covered by | Validation result |
| --- | --- | --- |
| Membuat laporan baru | FR-01, FR-02, US-01 | Covered; OPEN-02 only affects extra identity data. |
| Melihat daftar laporan | FR-03, US-02 | Covered. |
| Mencari dan menyaring laporan | FR-04, FR-05, US-03, US-04 | Covered. |
| Melihat detail laporan | FR-06, US-05 | Covered; OPEN-10 affects access boundary. |
| Memeriksa laporan | FR-07, US-06 | Covered. |
| Menentukan prioritas | FR-09, FR-10, US-07 | Covered; OPEN-06 affects criteria. |
| Menugaskan teknisi | FR-11, US-08 | Covered. |
| Mengubah status pekerjaan | FR-14, FR-15, US-10 | Covered. |
| Menambahkan komentar atau catatan | FR-16, FR-17, US-11, US-12 | Covered; OPEN-10 affects Manajer Fasilitas internal-note boundary. |
| Menyimpan riwayat status | FR-18, US-05, US-10, BR-08 | Covered. |
| Menutup atau membuka kembali laporan | FR-20, FR-21, US-14, US-15 | Covered; OPEN-03, OPEN-04, and OPEN-11 remain. |
| Menampilkan dashboard sederhana | FR-22, FR-23, US-16 | Covered; OPEN-07 and OPEN-10 remain. |

Out-of-scope features from `instruksi-dosen.md` were not validated as mandatory: upload foto, email notification, Google login, QR code ruangan, AI category, inventory spare part, and vendor management.

## Priority Validation Against Skill 04

- PASS - Every FR-01 through FR-24 has a Skill 04 priority and is validated above.
- PASS - Every NFR-01 through NFR-09 is treated as a Must constraint and is validated above.
- PASS - Every BR-01 through BR-12 has a Skill 04 priority and is validated above.
- PASS - Every US-01 through US-17 has a Skill 04 priority and is validated above.
- OPEN QUESTION - Skill 04 sequences some mandatory-scope features as Should or Could for delivery order, not scope removal. Human Review should confirm that sequencing remains acceptable before Skill 06.

## Contradictions, Ambiguities, Incompleteness, and Unverifiable Items

| ID | Type | Affected items | Finding | Status |
| --- | --- | --- | --- | --- |
| VAL-01 | Incompleteness | FR-02, US-01 | Extra reporter identity data beyond `reporter_name` and `reporter_type` remains undefined. | OPEN QUESTION via OPEN-02 |
| VAL-02 | Incompleteness | FR-08, BR-06, US-07 | Final category fixed list is not defined. | OPEN QUESTION via OPEN-05 |
| VAL-03 | Incompleteness | FR-09, FR-10, BR-04, BR-05, BR-07, US-07 | Criteria for `LOW`, `MEDIUM`, `HIGH`, and `URGENT` are not defined. | OPEN QUESTION via OPEN-06 |
| VAL-04 | Ambiguity | FR-13, US-09 | Technician acceptance is defined, but rejection/reassignment handling is unresolved. | OPEN QUESTION via OPEN-08 |
| VAL-05 | Ambiguity | FR-20, BR-11, US-14 | Valid conditions for Administrator manual override are not defined. | OPEN QUESTION via OPEN-03 |
| VAL-06 | Ambiguity | FR-21, BR-12, US-15 | Reopen initiation is unclear: Administrator-only action or Pelapor request plus Administrator decision. | OPEN QUESTION via OPEN-04 |
| VAL-07 | Unverifiable detail | FR-23, US-16 | Technician workload display cannot be correctness-tested until workload formula is defined. | OPEN QUESTION via OPEN-07 |
| VAL-08 | Ambiguity | FR-06, FR-17, FR-22, US-05, US-12, US-16 | Manajer Fasilitas detail access and Catatan Internal visibility are not fully defined. | OPEN QUESTION via OPEN-10 |
| VAL-09 | Ambiguity | FR-19, FR-20, US-13, US-14 | Waiting-for-confirmation representation without adding a seventh status remains unclear. | OPEN QUESTION via OPEN-11 |

## Requirements Needing Revision

No existing FR, NFR, BR, User Story, or Acceptance Criteria is changed by this validation. Current issues are handled as `OPEN QUESTION` items because available evidence is insufficient to rewrite requirement text safely.

Potential future revisions after Human Review:

1. Add approved category values after OPEN-05 is answered.
2. Add priority criteria after OPEN-06 is answered.
3. Add manual override conditions for close after OPEN-03 is answered.
4. Clarify reopen initiation and decision authority after OPEN-04 is answered.
5. Define technician workload formula after OPEN-07 is answered.
6. Clarify task rejection or reassignment after OPEN-08 is answered.
7. Clarify Manajer Fasilitas access boundaries after OPEN-10 is answered.
8. Decide how to represent waiting reporter confirmation without adding a status after OPEN-11 is answered.

## Change Request Check

- PASS - `docs/requirements/change-request.md` contains `CR-05-01`.
- PASS - `CR-05-01` separates proposed change, reason/rationale, affected artifacts, impact analysis, risks, decision recommendation, conditions, follow-up updates, and human approval status.
- PASS - The decision recommendation is `NEEDS CLARIFICATION`, so the proposed change is not treated as accepted or implemented.
- PASS - The change request preserves BR-02 strict statuses and does not add out-of-scope features.

## Unresolved Open Questions

| Open ID | Question | Validation impact |
| --- | --- | --- |
| OPEN-02 | Data identitas Pelapor apa saja yang wajib disimpan selain `reporter_name` dan `reporter_type`? | Affects FR-02 and US-01 future data model detail. |
| OPEN-03 | Apa kondisi sah Administrator memakai manual override untuk menutup laporan tanpa konfirmasi Pelapor? | Affects FR-20, BR-11, and US-14 completeness. |
| OPEN-04 | Apakah reopen hanya dapat dilakukan oleh Administrator, atau Pelapor juga dapat meminta reopen? | Affects FR-21, BR-12, and US-15 completeness. |
| OPEN-05 | Apa daftar final kategori fixed list yang akan digunakan? | Affects FR-08, BR-06, US-07, test data, and UI values. |
| OPEN-06 | Apa kriteria prioritas `LOW`, `MEDIUM`, `HIGH`, dan `URGENT`? | Affects FR-09, FR-10, BR-04, BR-05, BR-07, and US-07 policy detail. |
| OPEN-07 | Bagaimana beban tugas per Teknisi dihitung untuk dashboard? | Affects FR-23 and AC-16.2 verifiability. |
| OPEN-08 | Apakah Teknisi boleh menolak tugas atau hanya menerima dan memperbarui tugas yang diberikan? | Affects FR-13 and US-09 workflow scope. |
| OPEN-10 | Apakah Manajer Fasilitas hanya melihat dashboard/ringkasan, dapat membuka detail laporan, atau juga dapat melihat Catatan Internal? | Affects FR-06, FR-17, FR-22, US-05, US-12, and US-16 access boundaries. |
| OPEN-11 | Apakah enam status strict boleh memiliki sub-state non-status, seperti flag menunggu konfirmasi? | Affects FR-19, FR-20, US-13, US-14, and CR-05-01. |

## Validation Summary

- Coverage result: PASS after revision. FR-01 through FR-24, NFR-01 through NFR-09, BR-01 through BR-12, and US-01 through US-17 are all validated in this document.
- Mandatory feature result: PASS. Required features from `instruksi-dosen.md` are covered and out-of-scope features are not validated as mandatory.
- Priority result: PASS with one reviewer-facing open question about whether Skill 04 sequencing of some mandatory-scope items as Should/Could remains acceptable.
- Change management result: PASS for minimum artifact presence. `CR-05-01` exists and is marked `NEEDS CLARIFICATION`, not accepted.
- Baseline readiness: Ready for Human Review as a complete Skill 05 draft. This document does not approve the requirements baseline by itself.

## Human Review Status

- Status: Human Reviewed & Approved.
- Human decision: Disetujui melalui `evidence/human-review-validation.md` dan Pull Request Skill 05.
- This document does not approve any requirement change by itself.
