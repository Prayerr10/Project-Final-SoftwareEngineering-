# 12 - Test Planning

## Tujuan
Membuat rencana pengujian yang komprehensif untuk sistem Campus Service Request.

Skill ini digunakan untuk menyusun strategi pengujian berdasarkan requirement, user stories, dan acceptance criteria yang sudah disepakati. Output skill ini adalah dokumen test plan yang memetakan setiap functional requirement ke jenis pengujian, skenario positif, skenario negatif, data uji, dan kebutuhan human review.

## Kapan Digunakan
Gunakan skill ini setelah desain sistem selesai dan sebelum mulai menulis kode pengujian pada Skill 13.

Skill ini dijalankan ketika dokumen requirement sudah tersedia dan rencana pengujian perlu dibuat sebelum implementasi unit test, integration test, atau acceptance test.

Jangan gunakan skill ini untuk:

- Menulis kode automated test.
- Mengubah requirement atau user story.
- Menambahkan fitur baru di luar scope Campus Service Request.
- Mengubah desain arsitektur, database, API, atau UI.

## Input
Baca file berikut sebelum membuat output:

- `docs/requirements/inception.md`
- `docs/requirements/specification.md`
- Dokumen user stories yang tersedia di folder `docs/requirements/`
- Dokumen acceptance criteria yang tersedia di folder `docs/requirements/`

Jika file berikut tersedia, baca juga untuk menjaga konsistensi dengan desain sistem:

- `docs/design/architecture.md`
- `docs/design/database-api.md`
- `docs/design/ui-flow.md`
- `docs/requirements/traceability.md`

## Langkah Kerja
1. Baca seluruh functional requirement dengan ID `FR-XX`.
2. Baca seluruh user stories dan acceptance criteria yang berhubungan dengan setiap `FR-XX`.
3. Verifikasi bahwa ID requirement jelas dan konsisten. Jika ID `FR-XX` tidak ditemukan atau requirement tidak jelas, berhenti dan laporkan kondisi gagal.
4. Petakan setiap `FR-XX` ke strategi pengujian yang sesuai:
   - Unit Test untuk logic kecil, validasi input, helper, formatter, atau aturan status yang dapat diuji terpisah.
   - Integration Test untuk alur antar modul, API, database, autentikasi role, dan perubahan status.
   - Acceptance Test untuk alur end-to-end berdasarkan user story dan acceptance criteria.
5. Tentukan skenario pengujian positif untuk setiap fitur wajib.
6. Tentukan skenario pengujian negatif untuk setiap fitur wajib, termasuk input tidak valid, role tidak berwenang, data tidak ditemukan, status tidak sesuai, dan pelanggaran workflow.
7. Pastikan fitur wajib berikut memiliki rencana test case:
   - Pembuatan laporan service request.
   - Review laporan oleh administrator.
   - Penugasan teknisi.
   - Perubahan status dari `Submitted` sampai `Closed`.
   - Pembaruan progres oleh teknisi.
   - Konfirmasi atau penutupan laporan.
   - Tampilan daftar dan detail laporan sesuai role.
   - Dashboard atau ringkasan untuk pihak yang berwenang.
8. Tentukan data uji yang diperlukan untuk setiap skenario, termasuk:
   - Role pengguna.
   - Data laporan.
   - Status awal.
   - Status tujuan.
   - Teknisi yang ditugaskan.
   - Data kategori, prioritas, lokasi, deskripsi, dan lampiran jika requirement mendukung.
9. Tandai asumsi secara eksplisit jika data uji belum didefinisikan di requirement atau desain.
10. Susun output dalam format test plan yang mudah ditelusuri dari requirement ke skenario pengujian.
11. Pastikan setiap skenario mencantumkan ID requirement `FR-XX`.
12. Tambahkan bagian human review untuk memeriksa cakupan workflow status dari `Submitted` sampai `Closed`.

## Output
Buat atau perbarui file berikut:

- `docs/testing/test-plan.md`

Isi minimum file `docs/testing/test-plan.md`:

- Ringkasan tujuan test plan.
- Daftar sumber requirement yang dibaca.
- Daftar asumsi dan batasan.
- Matriks requirement ke strategi pengujian.
- Daftar test case positif dan negatif.
- Data uji yang diperlukan.
- Cakupan status workflow dari `Submitted` sampai `Closed`.
- Checklist quality check.
- Catatan human review.

## Aturan
- Gunakan ID requirement `FR-XX` untuk setiap skenario pengujian.
- Jangan membuat fitur di luar scope requirement Campus Service Request.
- Jangan mengubah isi requirement, user story, acceptance criteria, atau desain sistem.
- Tandai asumsi jika data uji belum didefinisikan.
- Setiap test case harus memiliki tujuan, precondition, langkah pengujian, expected result, jenis test, dan requirement terkait.
- Prioritaskan fitur wajib dan acceptance criteria sebelum skenario tambahan.
- Jika ada konflik antara requirement dan desain, catat sebagai isu untuk human review, bukan membuat keputusan sendiri.

## Quality Check
Pastikan hasil akhir memenuhi pemeriksaan berikut:

- Semua functional requirement `FR-XX` sudah terbaca dan masuk ke matriks test plan.
- Setiap fitur wajib memiliki minimal satu rencana test case.
- Total 12 functional requirement wajib memiliki minimal satu test case masing-masing.
- Setiap test case mencantumkan ID `FR-XX`.
- Setiap test case diberi jenis pengujian: Unit, Integration, atau Acceptance Test.
- Skenario positif dan negatif tersedia untuk fitur utama seperti pembuatan laporan dan penugasan teknisi.
- Data uji yang diperlukan sudah dicatat atau diberi tanda asumsi.
- Alur status dari `Submitted` sampai `Closed` tercakup.
- Tidak ada fitur baru yang ditambahkan di luar scope.

## Kondisi Gagal
Berhenti dan laporkan kondisi gagal jika:

- File requirement utama tidak ditemukan.
- ID functional requirement `FR-XX` tidak ditemukan.
- Requirement tidak jelas sehingga tidak dapat dibuat skenario pengujian yang dapat diverifikasi.
- Jumlah 12 functional requirement wajib tidak dapat dikonfirmasi dari dokumen requirement.
- User stories atau acceptance criteria tidak tersedia untuk fitur wajib dan tidak ada dokumen lain yang dapat menjelaskan expected behavior.

## Human Review
Manusia harus memeriksa:

- Apakah cakupan pengujian sudah mencakup seluruh alur status dari `Submitted` sampai `Closed`.
- Apakah semua 12 functional requirement wajib sudah memiliki minimal satu test case.
- Apakah skenario positif dan negatif sudah realistis untuk Campus Service Request.
- Apakah data uji dan asumsi sudah sesuai dengan scope proyek.
- Apakah tidak ada fitur tambahan yang dibuat di luar requirement.
