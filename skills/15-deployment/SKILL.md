---
name: 15-deployment
description: Melakukan deployment final Campus Service Request and Maintenance System ke Cloudflare Workers dan D1. Gunakan saat perlu menjalankan build, migration remote, deploy Wrangler, health check production, smoke test, secret scan, release note, dan submission info.
---

# 15 - Deployment

## Tujuan
Mempublikasikan aplikasi yang sudah diuji ke Cloudflare Workers + D1 dan mendokumentasikan bukti deployment untuk submit tugas akhir.

## Kapan Digunakan
Gunakan setelah automated testing dan acceptance testing lulus, serta sebelum final submission.

## Input
- Source code final di branch submit-ready
- `wrangler.jsonc`
- `database/migrations/`
- `package.json`
- `docs/testing/acceptance-test-results.md`
- `docs/testing/automated-test-inventory.md`
- Secret scan dan test/build result terbaru

## Langkah Kerja
1. Pastikan working tree bersih atau perubahan deployment docs dipahami.
2. Jalankan `npm test -- --run`.
3. Jalankan `npm run build`.
4. Periksa `wrangler.jsonc` memakai Cloudflare Workers dan D1 free-tier-compatible service.
5. Pastikan tidak ada credential di tracked files.
6. Jalankan migration remote D1 bila ada migration baru.
7. Jalankan `npm run deploy`.
8. Cek URL Cloudflare dan endpoint `/api/health`.
9. Lakukan production smoke test non-sensitive.
10. Update deployment evidence, release note, dan submission info.

## Output
- Aplikasi terdeploy di URL `workers.dev`
- `docs/deployment/deployment-evidence.md`
- `docs/deployment/release-note.md`
- `docs/deployment/submission-info.md`
- Evidence smoke test bila diperlukan

## Aturan
- Jangan menyimpan API key, token, password, atau secret ke repo.
- Jangan deploy jika test atau build gagal.
- Jangan menggunakan layanan Cloudflare berbayar.
- Data smoke test harus dummy dan tidak sensitif.
- Catat commit dan version ID deployment.

## Quality Check
- `npm test -- --run` PASS.
- `npm run build` PASS.
- `npm run deploy` PASS.
- `/api/health` production mengembalikan status sehat.
- README dan release note memuat URL publik.
- Deployment evidence mencatat tanggal, commit, URL, D1, dan hasil verifikasi.

## Kondisi Gagal
Berhenti jika login Cloudflare tidak tersedia, D1 migration gagal, deploy gagal, health check gagal, atau secret ditemukan.

## Human Review
Manusia harus memeriksa URL final, bukti deployment, release note, dan memastikan deployment sesuai instruksi dosen sebelum submit.
