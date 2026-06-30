# Validation dan Change

## Validation Checklist

- [ ] Requirement berasal dari `instruksi-dosen.md`.
- [ ] Setiap requirement memiliki ID.
- [ ] Tidak ada fitur out of scope yang masuk ke fitur utama.
- [ ] Minimal ada 12 functional requirement.
- [ ] Minimal ada 6 non-functional requirement.
- [ ] Minimal ada 5 business rule.
- [ ] Minimal ada 10 user story.
- [ ] Setiap user story memiliki minimal 2 acceptance criteria.
- [ ] Traceability matrix diperbarui.
- [ ] Human review dilakukan sebelum requirement dianggap final.

## Hasil Validasi Awal

| Area | Status | Catatan |
| --- | --- | --- |
| Functional requirement | Valid awal | Sudah lebih dari minimum 12. |
| Non-functional requirement | Valid awal | Sudah lebih dari minimum 6. |
| Business rule | Valid awal | Sudah lebih dari minimum 5. |
| User story | Valid awal | Sudah lebih dari minimum 10. |
| Acceptance criteria | Valid awal | Setiap user story memiliki minimal 2 AC. |
| Scope | Perlu review manusia | Pastikan tidak ada fitur tambahan yang tidak diminta. |

## Change Request

### CR-01 Simulasi Role untuk Versi Awal

## Latar Belakang

Instruksi dosen tidak mewajibkan login Google dan fitur autentikasi penuh. Namun sistem memiliki beberapa aktor: pelapor, administrator, teknisi, dan manajer fasilitas.

## Usulan Perubahan

Pada versi awal, role pengguna dapat disimulasikan melalui pilihan peran di UI atau data contoh, tanpa membuat sistem login penuh.

## Dampak

- Implementasi lebih sederhana.
- Fokus tetap pada requirement utama.
- Tidak menambahkan layanan autentikasi eksternal.
- Perlu dijelaskan sebagai asumsi dan known limitation.

## Keputusan

Status: Proposed

Keputusan final membutuhkan human review.
