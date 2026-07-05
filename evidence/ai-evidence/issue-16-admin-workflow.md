# AI Evidence - Issue #16 Admin Workflow

## Prompt
Implementasikan review Administrator, classification, priority, assignment Teknisi, dan status history.

## Output Awal AI
Endpoint review, classification, assignment, migration teknisi/assignment, dan UI action panel.

## Kesalahan
Assignment harus ditolak sebelum status `UNDER_REVIEW` dan role non-admin harus forbidden.

## Revisi Manusia
Negative tests dan workflow validation diperkuat.

## Final
Admin workflow memindahkan `SUBMITTED -> UNDER_REVIEW -> ASSIGNED`.
