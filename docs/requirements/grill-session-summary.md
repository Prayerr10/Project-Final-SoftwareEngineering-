# Rangkuman Sesi Grill-with-Docs: Keputusan Domain & Arsitektur

## Metadata

- **Status:** Human Reviewed & Approved
- **Tujuan:** Menjadi referensi utama (Ground Truth) untuk pengerjaan Skill 01-15.
- **Referensi Utama:** instruksi-dosen.md

## 1. Aktor dan Role (Ref: Pertanyaan 1, 12, 13)

- **Aktor Utama:** Pelapor (Student/Lecturer), Administrator, Teknisi, Manajer Fasilitas.
- **Role Simulator:** UI harus berubah dinamis berdasarkan role yang dipilih.
- **Data Pelapor:** Disimpan sebagai `reporter_name` dan `reporter_type` (STUDENT/LECTURER) di tabel laporan.

## 2. Alur Kerja & Status (Ref: Pertanyaan 4, 5, 18)

- **Status Utama (Strict 6):** SUBMITTED, UNDER_REVIEW, ASSIGNED, IN_PROGRESS, RESOLVED, CLOSED.
- **Business Rule Konfirmasi:** Pelapor WAJIB konfirmasi hasil sebelum status menjadi CLOSED (Admin memiliki manual override).
- **Logika Reopen:** Jika laporan dibuka kembali, status kembali ke UNDER_REVIEW untuk validasi ulang oleh Admin.

## 3. Fitur Kompleks & UI (Ref: Pertanyaan 3, 6, 10, 11)

- **Dashboard:** Harus mencakup beban tugas per teknisi (utilitas teknisi).
- **Komentar:** Dibedakan antara Komentar Publik (bisa dilihat Pelapor) dan Catatan Internal (hanya Admin/Teknisi).
- **UI Architecture:** Menggunakan Master-Detail View (Conditional Rendering) dalam Single Page App.
- **Pencarian:** Implementasi Debounced Search dan Advanced Filtering (multi-kombinasi status/prioritas).

## 4. Manajemen Data (Ref: Pertanyaan 7, 8, 9, 14)

- **Kategori:** Fixed list (Internet, AC, dsb) sebagai controlled vocabulary.
- **Prioritas:** LOW, MEDIUM, HIGH, URGENT.
- **Decision Support:** Laporan dari LECTURER memberikan saran prioritas HIGH, namun keputusan akhir tetap di Admin.
- **Status History:** Wajib mencatat `from_status`, `to_status`, `changed_by_role`, `timestamp`, dan `note`.

## 5. Strategi Pengerjaan (Ref: Pertanyaan 15, 16, 17)

- **Requirement:** Fokus pada fitur wajib dosen. Fitur tambahan sebagai future enhancement.
- **Evidence:** Dokumentasi Human Review dilakukan secara real-time di folder `evidence/`.
