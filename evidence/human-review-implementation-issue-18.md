# Human Review - Implementation Issue #18

## Work Product

Issue #18: Public comments and internal notes.

## Skill AI

Implementation with `tdd` skill.

## Scope Checked

- `POST /api/requests/:id/comments` stores public comments with `visibility: "PUBLIC"`.
- Public comments are returned in request detail for REPORTER, ADMINISTRATOR, and TECHNICIAN.
- `POST /api/requests/:id/internal-notes` stores internal notes with `visibility: "INTERNAL"`.
- Internal notes are returned in request detail only for ADMINISTRATOR and TECHNICIAN.
- REPORTER cannot create internal notes and does not receive `internalNotes` in request detail.
- FACILITY_MANAGER is not granted internal note access, preserving OPEN-10.
- Empty public comment and internal note bodies return validation errors.
- React detail UI includes public comment and internal note surfaces with role-based visibility.
- D1 forward migration creates `request_comments` and `request_internal_notes`.

## Masalah yang Ditemukan

1. Initial focused test execution could not run because dependencies were not installed in the Issue 18 worktree.
2. Request detail previously returned status history only, so comment and internal note collections had to be added to the detail response shape.
3. The React server render starts with no selected request, so the detail surface needed empty communication placeholders while endpoint tests cover stored comment/note behavior.

## Perbaikan

1. Ran `npm install` in the Issue 18 worktree to restore local test/build tooling.
2. Added focused API integration tests for public comment storage/detail visibility, internal note role visibility, forbidden internal-note roles, and empty body validation.
3. Added React render coverage for Komentar Publik and Catatan Internal controls.
4. Added migration `0004_create_request_comments_and_internal_notes.sql`.
5. Updated traceability rows for FR-16, FR-17, BR-09, and BR-10.

## Hasil Pemeriksaan

- [x] Sesuai requirement FR-16 and FR-17.
- [x] Sesuai business rules BR-09 and BR-10.
- [x] REPORTER cannot create or read internal notes.
- [x] FACILITY_MANAGER internal note access is not granted while OPEN-10 remains unresolved.
- [x] Empty body validation is implemented.
- [x] Tidak menambah fitur di luar scope.
- [x] Test lulus: `npm test -- --run`.
- [x] Build berhasil: `npm run build`.
- [x] Tidak ada secret.
- [x] Traceability diperbarui.

## Reviewer

Prayer Yosua Immanuel Kaawoan

## Keputusan

PASS
