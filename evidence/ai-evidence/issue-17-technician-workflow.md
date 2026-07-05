# AI Evidence - Issue #17 Technician Workflow

## Prompt
Buat daftar tugas Teknisi, accept task, progress, resolve, dan status history.

## Output Awal AI
Endpoint task list, accept, progress, resolve, dan UI Technician Tasks.

## Kesalahan
Teknisi harus dibatasi pada assignment miliknya dan tidak boleh mengubah status tidak valid.

## Revisi Manusia
Forbidden tests dan invalid transition tests ditambahkan.

## Final
Teknisi dapat menjalankan `ASSIGNED -> IN_PROGRESS -> RESOLVED`.
