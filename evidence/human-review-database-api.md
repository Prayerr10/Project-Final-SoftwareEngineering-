# Human Review

## Work Product

Nama file, issue, atau pull request:

- `docs/design/database-api.md`
- `docs/requirements/traceability.md`
- Pull Request Skill 07 ke `development`

## Skill AI

Nama skill:

Skill 07 - Database dan API Design (`07-database-api-design`)

## Masalah yang Ditemukan

1. Traceability awal di `docs/design/database-api.md` sudah mencakup FR-01 sampai FR-24, BR-01 sampai BR-12, dan US-01 sampai US-17, tetapi sebagian masih ditulis sebagai rentang agregat seperti `API-01 sampai API-17` atau `FR-01 sampai FR-24`. Ini membuat reviewer sulit mencocokkan satu per satu apakah setiap FR, NFR, BR, dan US benar-benar memiliki tabel atau endpoint pendukung.
2. NFR-01, NFR-04, NFR-05, NFR-06, NFR-07, NFR-08, dan NFR-09 belum terlihat eksplisit pada bagian `Traceability Links` di `docs/design/database-api.md`. NFR tersebut memang tidak selalu berupa tabel atau endpoint, tetapi tetap perlu dicatat sebagai coverage design agar traceability Skill 07 tidak lebih dangkal dari Skill 06.
3. Kontrak API-06 `PATCH /api/requests/:id/classification` memakai frasa "Current status should be `UNDER_REVIEW` before assignment." Kata "should" terlalu lemah untuk role/workflow validation. Karena classification adalah bagian dari proses sebelum assignment, kontrak API perlu menyatakan validasi status secara tegas agar tidak membuka celah workflow skipping.
4. Coverage user story di `docs/design/database-api.md` belum memiliki tabel cocok-cocokan eksplisit US-01 sampai US-17. Walaupun setiap endpoint detail sudah menuliskan user story terkait, reviewer masih harus mencari manual di banyak section.
5. Draft awal evidence Skill 07 masih berisi temuan generik dan bagian perbaikan `Pending Human Review`, sehingga belum setara kedalamannya dengan `evidence/human-review-architecture.md` yang mencatat temuan aktual dan perbaikan aktual.
6. Format evidence sudah memakai enam section Template Human Review dan tidak memiliki section tambahan di luar template, tetapi isi section "Masalah yang Ditemukan" dan "Perbaikan" perlu diperkuat agar menjadi draft Human Review yang dapat diperiksa manusia.

## Perbaikan

1. Menambahkan section `Full Requirements Coverage Matrix` di `docs/design/database-api.md` agar FR-01 sampai FR-24 dicocokkan satu per satu dengan tabel/design ID dan endpoint/API ID yang mendukungnya.
2. Menambahkan subsection `Non-Functional Requirement Coverage` di `docs/design/database-api.md` agar NFR-01 sampai NFR-09 punya coverage eksplisit, termasuk NFR yang bersifat process-level seperti GitHub workflow, traceability, human review evidence, dan secret safety.
3. Menambahkan subsection `Business Rule Coverage` di `docs/design/database-api.md` agar BR-01 sampai BR-12 terlihat jelas hubungannya dengan tabel, endpoint, controlled vocabulary, role validation, status workflow, status history, komentar publik, catatan internal, confirmation, close, dan reopen.
4. Menambahkan subsection `User Story Coverage` di `docs/design/database-api.md` agar US-01 sampai US-17 dapat dicocokkan langsung dengan tabel/design ID dan endpoint/API ID.
5. Mengubah validasi API-06 dari "Current status should be `UNDER_REVIEW` before assignment" menjadi "Current status must be `UNDER_REVIEW` before assignment" agar kontrak workflow validation lebih tegas dan konsisten dengan arsitektur Skill 06.
6. Mengisi ulang evidence Human Review Skill 07 dengan temuan aktual dan perbaikan aktual, tetap hanya menggunakan enam section Template Human Review: Work Product, Skill AI, Masalah yang Ditemukan, Perbaikan, Hasil Pemeriksaan, dan Keputusan.

## Hasil Pemeriksaan

- [x] Sesuai requirement
- [x] Tidak menambah fitur di luar scope
- [ ] Test lulus
- [x] Tidak ada secret
- [x] Traceability diperbarui

Catatan: Test otomatis tidak dijalankan karena perubahan Skill 07 hanya pada dokumen design, traceability, evidence, dan Pull Request body. Pemeriksaan yang sudah dilakukan mencakup pencocokan FR-01 sampai FR-24, NFR-01 sampai NFR-09, BR-01 sampai BR-12, dan US-01 sampai US-17 terhadap `docs/design/database-api.md`; pemeriksaan konsistensi dengan 4 layer, 4 aktor, strict 6 status workflow, dan role/workflow validation dari `docs/design/architecture.md`; pemeriksaan 7 tabel utama; pemeriksaan 17 endpoint wajib; pemeriksaan bahwa endpoint yang mengubah status mencatat status history; pemeriksaan open question Skill 05; pemeriksaan format evidence enam section; dan pemeriksaan bahwa tidak ada migration SQL final, kode Worker, kode React, UI flow, test, atau deployment yang dibuat.

## Keputusan

- [ ] Disetujui
- [ ] Perlu revisi
- [ ] Ditolak
- [ ] Terblokir
