# Bukti Penggunaan AI Skill dan Human Review

## Tujuan Dokumen

Dokumen ini menjelaskan penggunaan bantuan AI secara bertanggung jawab dalam proyek Campus Service Request and Maintenance System. Dokumen ini mencatat hubungan antara pekerjaan berbantuan AI, keputusan manusia, temuan review, automated test, GitHub Issues, Pull Requests, bukti deployment, dan akuntabilitas akhir.

Tujuan utama dokumen ini adalah transparansi. Dokumen ini tidak menyatakan bahwa output AI diterima secara otomatis. Setiap work product penting diperiksa, dikoreksi, diuji, atau didokumentasikan sebelum diperlakukan sebagai hasil final.

## Asal dan Penggunaan Skill

Proyek ini menggunakan workflow berbasis skill selama proses pengembangan. Workflow tersebut mencakup reusable skills eksternal dan proses internal yang disesuaikan dengan kebutuhan proyek. Bukti pada `evidence/`, `docs/`, GitHub Issues, Pull Requests, dan commit history menunjukkan penggunaan prompt terstruktur, maker-checker review, validasi bergaya TDD, human review, dan pemeriksaan deployment final.

Folder `skills/` pada repository saat ini berisi 15 skill akademik yang dipetakan ke tahapan Software Engineering sesuai kebutuhan tugas dosen. Skill tersebut berfungsi sebagai dokumentasi proses akademik reusable yang final untuk proyek ini.

Git history juga menunjukkan bahwa sebagian skill akademik baru dibuat, direview, atau diformalisasi setelah sebagian pekerjaan implementasi berjalan. Sebagai contoh, implementasi Issues #13 sampai #24 diselesaikan melalui feature branches dan PR, sedangkan commit dan PR berikutnya memformalkan Skill 11 sampai Skill 15 untuk code review, test planning, automated testing, acceptance testing, dan deployment documentation. Karena itu, repository ini tidak mengklaim bahwa seluruh 15 skill akademik dibuat sebelum coding dimulai.

Workflow eksternal yang reusable, termasuk pola TDD ala Matt Pocock, autonomous loop, maker-checker review, dan review/checker pattern, muncul pada bukti human review sebagai bantuan proses. Workflow tersebut diperlakukan sebagai referensi proses, bukan sebagai pengganti bukti untuk 15 skill akademik wajib.

Referensi desain TypeUI Premium disimpan di `docs/design/references/typeui-premium/` sebagai referensi UI eksternal. Referensi tersebut tidak dihitung sebagai salah satu dari 15 skill akademik di `skills/`.

## Pemetaan 15 Skill Akademik ke Bukti Proyek

| No | Academic Skill | Tahap Proyek / Bukti Aktual | Dokumen / Issue / PR / Test Terkait | Keputusan atau Review Manusia |
| --- | --- | --- | --- | --- |
| 01 | Inception and Stakeholder | Perumusan masalah, identifikasi stakeholder, scope, asumsi, dan open questions. | `docs/requirements/inception.md`, `evidence/2026-07-01-human-review-skill-01-inception.md`, PR #1. | Human review menyetujui pekerjaan inception dan mempertahankan item yang belum selesai sebagai open questions. |
| 02 | Elicitation | Pertanyaan lanjutan dan rencana elicitation untuk Pelapor, Administrator, Teknisi, dan Manajer Fasilitas. | `docs/requirements/elicitation.md`, `evidence/human-review-elicitation.md`, PR #2, PR #3, PR #4. | Human review merapikan template elicitation dan menyelaraskannya dengan instruksi dosen. |
| 03 | Specification | Functional requirements, non-functional requirements, business rules, user stories, dan acceptance criteria. | `docs/requirements/requirements.md`, `docs/requirements/user-stories.md`, `evidence/human-review-specification.md`, PR #6. | Human review menyetujui baseline specification dan traceability links yang diperbarui kemudian. |
| 04 | Prioritization | Prioritas requirement serta penanganan konflik dan prioritas. | `docs/requirements/prioritization.md`, `evidence/human-review-prioritization.md`, PR #7. | Human review menyetujui prioritization dan mempertahankan unresolved questions tanpa mengarang jawaban. |
| 05 | Validation and Change | Validasi penuh untuk FR, NFR, BR, user stories, dan change request CR-05-01. | `docs/requirements/validation.md`, `docs/requirements/change-request.md`, `evidence/human-review-validation.md`, PR #8. | Human review menemukan draft validation yang belum lengkap dan meminta full coverage sebelum disetujui. |
| 06 | Architecture Design | Arsitektur Worker/React/D1, role boundaries, workflow transitions, dan status rules. | `docs/design/architecture.md`, `evidence/human-review-architecture.md`, PR #10. | Human review menyetujui architecture dan mempertahankan manager/detail access yang belum jelas sebagai open question. |
| 07 | Database and API Design | Tabel D1, migration plan, API endpoints, dan auth API addendum. | `docs/design/database-api.md`, `database/migrations/`, `evidence/human-review-database-api.md`, PR #11, Issue #47. | Human review menyetujui database/API design dan update traceability auth berikutnya. |
| 08 | UI Design | UI flow, tampilan sesuai role, konsep wireframe, dan referensi Premium UI. | `docs/design/ui-flow.md`, `docs/design/design-system.md`, `docs/design/references/typeui-premium/`, `evidence/human-review-ui-design.md`, PR #12, PR #49. | Human review menyetujui UI design; TypeUI Premium didokumentasikan sebagai referensi eksternal, bukan skill akademik. |
| 09 | Issue Planning | Konversi requirement menjadi GitHub Issues dan branch/PR workflow. | GitHub Issues #13-#24, `docs/requirements/traceability.md`, `evidence/human-review-planning.md`, PR #25. | Human review menerima issue plan sebelum branch implementasi digabungkan. |
| 10 | Implementation | Implementasi fitur melalui issue branches untuk foundation, request, admin workflow, technician workflow, comments, close/reopen, dashboard, role validation, deployment readiness, dan traceability. | Issues #13-#24, PR #26-#37, `src/`, `worker/`, `database/migrations/`, `tests/integration/`, `evidence/human-review-implementation-issue-13.md` sampai `issue-24.md`. | Setiap implementation issue memiliki human review evidence dan keputusan PASS setelah koreksi. |
| 11 | Code Review | Review pekerjaan implementasi setelah Issues #13-#24, termasuk temuan adversarial checker. | `evidence/human-review-skill-11-code-review.md`, PR #38, `database/migrations/0006_enforce_request_status_priority.sql`, related regression tests. | Human review menemukan Facility Manager detail leakage, create UI yang misleading terhadap role, dan belum adanya D1 status/priority guards; perbaikan diterapkan dan direview ulang. |
| 12 | Test Planning | Test plan memetakan FR/NFR/BR/US/AC ke automated tests dan planned tests. | `docs/testing/test-plan.md`, `evidence/human-review-skill-12-test-planning.md`, PR #39. | Human review menemukan mapping acceptance criteria yang belum lengkap dan meminta strategi AC coverage eksplisit. |
| 13 | Automated Testing | Automated integration/unit/acceptance tests dan perluasan CI. | `tests/`, `docs/testing/automated-test-inventory.md`, `evidence/ai-evidence/skill-13-automated-testing.md`, PR #40, GitHub Actions. | Automated tests meningkat menjadi 90 tests dalam 16 files pada final submission; CI memvalidasi test dan build. |
| 14 | Acceptance Testing | Bukti browser/screenshot dan acceptance checks untuk end-to-end workflows dan UI state. | `docs/testing/acceptance-test-results.md`, `tests/acceptance/role-authorization.test.ts`, `evidence/skill-14-*.png`, PR #41, PR #42. | Human review mengidentifikasi internal-note visibility dan memverifikasi perbaikannya dengan bukti tambahan. |
| 15 | Deployment | Deployment Cloudflare Workers + D1, health checks, release note, dan final submission evidence. | `docs/deployment/deployment-readiness.md`, `docs/deployment/deployment-evidence.md`, `docs/deployment/release-note.md`, `evidence/ai-evidence/skill-15-deployment.md`, PR #42, PR #50. | Human review dan final audit mengonfirmasi URL, health check, D1, auth, tests, build, dan known lint limitation. |

## Output AI, Risiko, dan Keputusan Manusia

### Requirements dan validation

Draft berbantuan AI membantu penyusunan inception, elicitation, requirements, prioritization, dan validation artifacts. Human review menemukan bahwa draft Skill 05 validation pada awalnya hanya mencakup beberapa functional requirements terpilih, bukan keseluruhan FR/NFR/BR/user-story set. Keputusan manusia adalah memperluas validation menjadi FR-01 sampai FR-24, NFR-01 sampai NFR-09, BR-01 sampai BR-12, dan US-01 sampai US-17. Bukti: `evidence/human-review-validation.md`, `docs/requirements/validation.md`, dan `docs/requirements/traceability.md`.

### Code review dan kontrol scope

Review Skill 11 menggunakan proses adversarial checker. Review tersebut menemukan bahwa akses Facility Manager ke full request detail terlalu luas saat OPEN-10 masih belum terselesaikan, create request UI misleading untuk role non-Pelapor, dan D1 belum memiliki status/priority guards. Keputusan manusia adalah menerapkan perbaikan yang scoped saja: melarang unsafe detail access, membuat create UI role-aware, dan menambahkan D1 guard triggers. Bukti: `evidence/human-review-skill-11-code-review.md`, `tests/integration/role-validation-states.test.ts`, `tests/integration/react-foundation.test.ts`, dan `database/migrations/0006_enforce_request_status_priority.sql`.

### Premium UI redesign

AI digunakan untuk membantu arahan Premium UI redesign. Proyek memisahkan pekerjaan referensi UI/design dari perubahan backend, database, auth, dan business logic. Referensi TypeUI Premium dipertahankan di `docs/design/references/typeui-premium/`, dan hygiene final memperjelas bahwa referensi tersebut bukan salah satu dari 15 skill akademik. Bukti: `docs/design/design-system.md`, `docs/design/references/typeui-premium/README.md`, PR #49, dan PR #51.

### Authentication dan risiko Cloudflare runtime

Implementasi berbantuan AI menambahkan real role login, session cookies, authorization, dan demo accounts. Setelah itu, issue runtime Cloudflare membutuhkan PBKDF2 compatibility fix. Keputusan manusia adalah memverifikasi login, `/api/auth/me`, logout, D1 demo accounts, dan deployment setelah fix tersebut. Bukti: Issue #47, PR #48, commit `4a61cf6`, `tests/unit/auth-password.test.ts`, `tests/integration/auth-login.test.ts`, `tests/acceptance/role-authorization.test.ts`, dan `docs/deployment/release-note.md`.

### Deployment dan migration handling

Deployment evidence berbantuan AI pada awalnya perlu disesuaikan karena default lookup migration Wrangler tidak cocok dengan folder `database/migrations/` pada repository ini. Keputusan manusia adalah menjalankan file SQL D1 remote secara eksplisit dengan `wrangler d1 execute --remote --file` dan mendokumentasikan hasil deployment. Bukti: `evidence/ai-evidence/skill-15-deployment.md`, `docs/deployment/deployment-evidence.md`, dan `docs/deployment/deployment-readiness.md`.

### Interpretasi lint limitation

Validasi final mencatat bahwa `npm run lint` masih melaporkan baseline/pre-existing findings, sedangkan `npm test -- --run`, `npx tsc -b`, `npm run build`, `git diff --check`, GitHub Actions, dan deployment verification lulus. Keputusan manusia adalah mendokumentasikan lint secara jujur sebagai known limitation, bukan mengklaim lint sepenuhnya PASS. Bukti: `README.md`, `docs/deployment/release-note.md`, dan hasil final audit.

## Lokasi Bukti

- `skills/`: 15 definisi academic skills yang diwajibkan dalam tugas.
- `evidence/`: catatan human review, AI evidence summaries, acceptance screenshots, dan final audit material.
- `evidence/ai-evidence/`: ringkasan prompt/output/risk/revision/final untuk skills dan implementation issues.
- `docs/requirements/`: inception, elicitation, requirements, user stories, prioritization, validation, change request, dan traceability.
- `docs/design/`: architecture, database/API design, UI flow, design system, dan TypeUI Premium reference.
- `docs/testing/`: test plan, automated test inventory, dan acceptance test results.
- `docs/deployment/`: deployment readiness, deployment evidence, release note, dan submission info.
- GitHub Issues: #13 sampai #24 dan #47 menunjukkan scoped work items dan final auth closure.
- Pull Requests: PR #1 sampai #51 menunjukkan branch-based work, human review, CI, final merge, dan hygiene updates.
- GitHub Actions: CI memverifikasi test dan build pada PR serta branch pushes.
- Commit history: menunjukkan skill dan dokumen mana yang didraft, diformalisasi, direview, diimplementasikan, dan digabungkan dari waktu ke waktu.

## Keterbatasan Transparansi

Repository ini berisi dokumentasi skill akademik final dan evidence summaries, tetapi tidak berisi seluruh raw AI chat transcript dari setiap langkah pengembangan. Jika yang tersedia hanya final evidence summaries, dokumen ini menyebut artefak yang tersedia tersebut dan tidak mengklaim adanya catatan yang lebih detail.

Sebagian academic skills diformalisasi setelah implementasi sudah dimulai atau setelah pekerjaan terkait selesai. Hal ini dicatat sebagai keterbatasan provenance, bukan disembunyikan. Folder final `skills/` harus dibaca sebagai dokumentasi proses akademik reusable yang diselaraskan dengan tahapan wajib dosen, bukan sebagai bukti bahwa seluruh 15 skill files sudah ada sebelum commit kode pertama.

## Akuntabilitas Akhir Mahasiswa

AI membantu proses drafting, review, implementation planning, testing strategy, dan documentation. Akuntabilitas akhir tetap berada pada mahasiswa/pemilik proyek. Keputusan manusia mengendalikan interpretasi requirement, batas scope, koreksi terhadap output AI, eksekusi test, hasil review, verifikasi deployment, dan kesiapan final submission.
