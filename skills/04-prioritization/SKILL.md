---
name: 04-prioritization
description: Menjalankan prioritization untuk requirement Campus Service Request and Maintenance System. Gunakan saat perlu memberi prioritas MoSCoW, rationale, dependency, trade-off, dan keputusan sequencing terhadap FR, NFR, BR, dan user story sebelum validation dan design.
---

# 04 - Prioritization

## Tujuan
Menentukan prioritas implementasi dan urutan kerja requirement agar fitur wajib proyek dapat dikerjakan secara realistis tanpa menghapus scope yang diminta dosen.

## Kapan Digunakan
Gunakan setelah specification disetujui dan sebelum validation, design, issue planning, dan implementation.

## Input
- `docs/requirements/requirements.md`
- `docs/requirements/user-stories.md`
- `docs/requirements/traceability.md`
- `CASE.md`
- `instruksi-dosen.md`
- Evidence human review specification

## Langkah Kerja
1. Baca semua FR, NFR, BR, US, dan AC.
2. Tetapkan prioritas MoSCoW untuk setiap FR.
3. Catat rationale prioritas berdasarkan fitur wajib, dependency workflow, dan risiko submit.
4. Petakan dependency antar requirement.
5. Catat trade-off stakeholder jika ada kebutuhan yang bersaing.
6. Tandai open question yang memengaruhi prioritas.
7. Perbarui traceability dengan status prioritization.
8. Siapkan evidence human review.

## Output
- `docs/requirements/prioritization.md`
- Update `docs/requirements/traceability.md`
- Evidence human review prioritization

## Aturan
- Prioritas tidak boleh menghapus fitur wajib.
- Prioritas Should atau Could hanya berarti urutan pengerjaan, bukan scope removal.
- Jangan membuat requirement baru.
- Jangan mulai design atau kode.

## Quality Check
- Semua FR memiliki prioritas.
- Rationale dan dependency ditulis jelas.
- Fitur workflow inti tetap Must atau ditangani sebagai dependency utama.
- Open question tetap terlihat.

## Kondisi Gagal
Berhenti jika requirement belum lengkap, prioritas menghapus scope wajib, atau stakeholder conflict tidak dapat dijelaskan.

## Human Review
Manusia harus memeriksa apakah prioritas masuk akal, tidak mengurangi ketentuan dosen, dan dependency workflow sudah benar.
