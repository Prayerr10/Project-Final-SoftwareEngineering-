# 15 - Deployment

## Tujuan
Mempublikasikan aplikasi ke Cloudflare dan memverifikasi hasilnya di lingkungan produksi.

Skill ini digunakan untuk memastikan aplikasi Campus Service Request yang sudah selesai diuji dapat dirilis ke Cloudflare, database production sudah diperbarui, URL publik dapat diakses, API utama berjalan, dan bukti deployment terdokumentasi.

## Kapan Digunakan
Gunakan skill ini setelah seluruh tahap pengujian selesai, yaitu Skill 12 sampai Skill 14, dan aplikasi siap dirilis.

Skill ini dijalankan ketika source code final sudah siap, hasil pengujian sudah lolos, dan deployment production perlu dilakukan atau diperbarui.

Jangan gunakan skill ini untuk:

- Menulis fitur baru.
- Mengubah requirement, desain, atau test plan.
- Melakukan deployment jika build lokal gagal.
- Menyimpan token, secret, API key, atau kredensial lain ke repositori.

## Input
Baca dan periksa file berikut sebelum deployment:

- Source code final aplikasi.
- `wrangler.jsonc`
- File database migrations di folder `database/migrations/`
- `package.json`
- Hasil pengujian dari Skill 12 sampai Skill 14 jika tersedia.

Jika file berikut tersedia, baca juga untuk memastikan release sesuai scope:

- `docs/testing/test-plan.md`
- `docs/testing/`
- `docs/design/architecture.md`
- `docs/design/database-api.md`
- `docs/design/ui-flow.md`

## Langkah Kerja
1. Verifikasi bahwa hasil pengujian Skill 12 sampai Skill 14 sudah selesai dan tidak ada blocker release.
2. Periksa konfigurasi deployment di `wrangler.jsonc`, termasuk nama project, binding database, environment, dan konfigurasi Cloudflare yang relevan.
3. Periksa file migration database di `database/migrations/` dan pastikan migration yang diperlukan sudah tersedia.
4. Pastikan tidak ada rahasia, token, API key, atau kredensial production yang tersimpan di repository.
5. Jalankan build aplikasi:

   ```bash
   npm run build
   ```

6. Jika build gagal, berhenti dan laporkan kondisi gagal. Jangan lanjut ke migration production atau deployment.
7. Jalankan migration database ke production menggunakan mode remote:

   ```bash
   npx wrangler d1 migrations apply <DATABASE_NAME> --remote
   ```

   Ganti `<DATABASE_NAME>` sesuai nama database D1 production yang digunakan di konfigurasi project.
8. Jika migration gagal, berhenti dan laporkan kondisi gagal. Jangan lanjut deployment sampai database production jelas statusnya.
9. Lakukan deployment menggunakan Wrangler:

   ```bash
   npm run deploy
   ```

10. Catat URL publik Cloudflare dari hasil deployment.
11. Verifikasi URL publik di browser dan pastikan aplikasi dapat dibuka.
12. Verifikasi API health check:

   ```text
   /api/health
   ```

   Pastikan response mengembalikan status `ok`.
13. Lakukan pengetesan fitur utama di browser pada URL production, minimal:
   - Membuka halaman utama aplikasi.
   - Membuat atau mensimulasikan akses laporan service request sesuai data production yang aman.
   - Melihat daftar atau detail laporan.
   - Memeriksa alur role utama jika tersedia.
   - Memastikan tidak ada error console atau error API yang menghambat fitur utama.
14. Kumpulkan bukti deployment, termasuk URL publik, hasil health check, ringkasan test produksi, tanggal deployment, versi/ringkasan perubahan, dan catatan masalah jika ada.
15. Buat atau perbarui file bukti deployment di folder `docs/deployment/`.

## Output
Buat atau perbarui file bukti deployment di folder berikut:

- `docs/deployment/`

Isi minimum dokumen deployment:

- URL Cloudflare production.
- Tanggal dan waktu deployment.
- Commit atau versi yang dideploy jika tersedia.
- Ringkasan hasil `npm run build`.
- Ringkasan hasil migration production.
- Ringkasan hasil `npm run deploy`.
- Bukti bahwa URL publik dapat diakses.
- Bukti bahwa `/api/health` mengembalikan status `ok`.
- Bukti test produksi untuk fitur utama.
- Release note.
- Catatan human review.

Nama file yang disarankan:

- `docs/deployment/deployment-evidence.md`
- `docs/deployment/release-note.md`

## Aturan
- Jangan menyimpan rahasia, token, API key, credential, atau file environment sensitif di repository.
- Pastikan database production sudah ter-update sebelum atau saat deployment sesuai urutan yang aman.
- Hanya lakukan deployment jika build lokal berhasil.
- Jangan deploy jika masih ada test blocker dari Skill 12 sampai Skill 14.
- Jangan menggunakan data sensitif nyata untuk bukti testing production.
- Jangan menghapus atau mengubah data production tanpa alasan yang jelas dan persetujuan manusia.
- Catat semua asumsi deployment, terutama jika nama database, environment, atau URL production belum jelas.
- Jika terjadi konflik konfigurasi antara `wrangler.jsonc` dan instruksi deployment, berhenti untuk human review.

## Quality Check
Pastikan hasil akhir memenuhi pemeriksaan berikut:

- `npm run build` berhasil.
- Migration database production dengan `--remote` berhasil atau statusnya jelas dan terdokumentasi.
- `npm run deploy` berhasil.
- URL publik Cloudflare dapat diakses.
- API `/api/health` mengembalikan status `ok`.
- Fitur utama aplikasi sudah dites di browser pada URL production.
- Bukti deployment tersimpan di `docs/deployment/`.
- Release note tersedia.
- Tidak ada rahasia, token, API key, atau credential yang tersimpan di repository.
- Tidak ada data sensitif yang terlihat di URL publik, response API, log, screenshot, atau dokumen bukti.

## Kondisi Gagal
Berhenti dan laporkan kondisi gagal jika:

- `npm run build` gagal.
- Migration database production gagal atau status database production tidak jelas.
- `npm run deploy` gagal.
- URL publik Cloudflare tidak dapat diakses.
- API `/api/health` tidak mengembalikan status `ok`.
- Ditemukan rahasia, token, API key, credential, atau data sensitif yang berisiko terekspos.
- Konfigurasi `wrangler.jsonc` tidak jelas atau tidak sesuai dengan environment production.

## Human Review
Manusia wajib memeriksa:

- Apakah tidak ada data sensitif yang terekspos di repository, URL publik, response API, log, screenshot, atau dokumen deployment.
- Apakah fitur utama sudah dikonfirmasi manual di URL publik.
- Apakah database production sudah berada pada versi migration yang benar.
- Apakah URL Cloudflare yang dicatat adalah URL production yang benar.
- Apakah release note sudah menjelaskan perubahan yang dirilis.
- Apakah deployment sudah layak dianggap final untuk presentasi atau penilaian.
