# Requirements Specification

## Functional Requirements

| ID | Requirement | Prioritas |
| --- | --- | --- |
| FR-01 | Pelapor dapat membuat laporan baru. | Must |
| FR-02 | Pengguna dapat melihat daftar laporan. | Must |
| FR-03 | Pengguna dapat mencari laporan. | Must |
| FR-04 | Pengguna dapat menyaring laporan berdasarkan status, kategori, atau prioritas. | Must |
| FR-05 | Pengguna dapat melihat detail laporan. | Must |
| FR-06 | Administrator dapat memeriksa laporan yang baru masuk. | Must |
| FR-07 | Administrator dapat menentukan kategori laporan. | Must |
| FR-08 | Administrator dapat menentukan prioritas laporan. | Must |
| FR-09 | Administrator dapat menugaskan teknisi. | Must |
| FR-10 | Teknisi dapat mengubah status pekerjaan. | Must |
| FR-11 | Pengguna dapat menambahkan komentar atau catatan pada laporan. | Must |
| FR-12 | Sistem menyimpan riwayat perubahan status laporan. | Must |
| FR-13 | Administrator dapat menutup laporan. | Must |
| FR-14 | Administrator dapat membuka kembali laporan. | Should |
| FR-15 | Manajer fasilitas dapat melihat dashboard sederhana. | Must |

## Non-Functional Requirements

| ID | Requirement | Prioritas |
| --- | --- | --- |
| NFR-01 | Aplikasi harus menggunakan React untuk frontend. | Must |
| NFR-02 | Aplikasi harus menggunakan Cloudflare Workers untuk backend/API. | Must |
| NFR-03 | Aplikasi harus menggunakan Cloudflare D1 untuk database. | Must |
| NFR-04 | Aplikasi harus dapat dideploy ke Cloudflare tanpa layanan berbayar. | Must |
| NFR-05 | Project harus disimpan di GitHub. | Must |
| NFR-06 | Project harus memiliki automated test dan GitHub Actions. | Must |
| NFR-07 | Project harus menjaga traceability dari requirement sampai test. | Must |
| NFR-08 | Project tidak boleh menyimpan token, password, atau secret di repository. | Must |

## Business Rules

| ID | Rule |
| --- | --- |
| BR-01 | Laporan baru selalu dimulai dengan status `SUBMITTED`. |
| BR-02 | Laporan hanya dapat diproses setelah administrator memeriksa laporan. |
| BR-03 | Laporan yang ditugaskan kepada teknisi harus memiliki prioritas. |
| BR-04 | Perubahan status harus dicatat dalam riwayat status. |
| BR-05 | Laporan dapat ditutup setelah pekerjaan selesai dan hasil dikonfirmasi. |
| BR-06 | Laporan yang sudah ditutup dapat dibuka kembali jika masih ada masalah. |

## Status Workflow

```text
SUBMITTED -> UNDER_REVIEW -> ASSIGNED -> IN_PROGRESS -> RESOLVED -> CLOSED
```

Status tambahan hanya boleh dibuat jika requirement dan business rule diperbarui.
