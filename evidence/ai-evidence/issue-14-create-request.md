# AI Evidence - Issue #14 Create Request

## Prompt
Implementasikan Pelapor membuat laporan, reporter identity, initial status, dan lecturer priority suggestion.

## Output Awal AI
`POST /api/requests`, form React, D1 storage, dan initial status history.

## Kesalahan
Validasi reporter identity perlu dipertegas agar suggestion tidak dibuat dari data invalid.

## Revisi Manusia
Validation test dan evidence Issue #14 diperbarui.

## Final
Create request berjalan dengan status `SUBMITTED` dan riwayat awal.
