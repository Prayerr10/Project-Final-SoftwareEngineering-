**SOFTWARE ENGINEERING**

PROYEK SOFTWARE ENGINEERING  
DENGAN BANTUAN AI

Dari Requirements Engineering sampai Deployment ke Cloudflare

**Studi Kasus:  
Campus Service Request and Maintenance System**

| **Mata Kuliah**      | **Dosen**         | **Bentuk Tugas**               | **Media Pengumpulan**   |
|----------------------|-------------------|--------------------------------|-------------------------|
| Software Engineering | Andrew Tanny Liem | Proyek Individu atau Tim Kecil | GitHub + URL Cloudflare |

# Cara Menggunakan Dokumen Ini

Dokumen ini dibuat sebagai satu paket tugas dan tutorial. Bagian pertama menjelaskan apa yang harus dikerjakan. Bagian kedua menjelaskan cara membuat aplikasinya langkah demi langkah. Mahasiswa tidak perlu mengerjakan seluruh bagian sekaligus. Kerjakan sesuai urutan.

CATATAN: Jangan langsung meminta AI membuat seluruh aplikasi. Gunakan AI untuk satu pekerjaan kecil, periksa hasilnya, uji, lalu lanjut ke pekerjaan berikutnya.

## Urutan Belajar

1.  Pahami masalah dan stakeholder.

2.  Susun requirements.

3.  Buat desain sederhana.

4.  Ubah pekerjaan menjadi GitHub Issues.

5.  Buat aplikasi sedikit demi sedikit.

6.  Tulis dan jalankan test.

7.  Deploy ke Cloudflare.

8.  Lakukan pemeriksaan akhir dan dokumentasikan hasil.

## Istilah Penting

| **Istilah**  | **Arti Sederhana**                                                               |
|--------------|----------------------------------------------------------------------------------|
| Repository   | Folder proyek yang disimpan di GitHub.                                           |
| Commit       | Catatan perubahan yang disimpan ke Git.                                          |
| Branch       | Jalur kerja terpisah agar perubahan tidak langsung masuk ke versi utama.         |
| Pull Request | Permintaan untuk memeriksa dan menggabungkan perubahan.                          |
| API          | Jalur komunikasi antara halaman web dan server.                                  |
| Database     | Tempat menyimpan data aplikasi.                                                  |
| Deployment   | Proses mempublikasikan aplikasi ke internet.                                     |
| CI           | Pemeriksaan otomatis saat kode dikirim ke GitHub.                                |
| Skill AI     | Instruksi terstruktur agar AI mengerjakan satu jenis pekerjaan secara konsisten. |

# BAGIAN I — SPESIFIKASI TUGAS

# 1. Tujuan Tugas

Mahasiswa akan membuat satu aplikasi web dari awal sampai dapat dibuka melalui internet. Proyek ini tidak hanya menilai hasil akhir aplikasi. Mahasiswa juga harus menunjukkan proses berpikir, hubungan antar-dokumen, penggunaan AI, review manusia, testing, dan deployment.

- Menerapkan requirements engineering.

- Membuat desain aplikasi.

- Menggunakan GitHub untuk mengatur pekerjaan.

- Menggunakan AI melalui reusable skills.

- Membuat frontend, backend, dan database.

- Melakukan testing.

- Deploy ke Cloudflare tanpa layanan berbayar.

- Menjaga traceability dari requirement sampai test.

# 2. Studi Kasus

## Campus Service Request and Maintenance System

Aplikasi digunakan oleh mahasiswa atau dosen untuk melaporkan masalah fasilitas kampus. Contoh masalah adalah proyektor rusak, internet bermasalah, AC tidak dingin, kursi rusak, alat laboratorium bermasalah, atau ruangan kotor.

Laporan diperiksa oleh administrator. Setelah itu laporan diberikan kepada teknisi. Teknisi memperbarui progres sampai pekerjaan selesai. Pelapor dapat melihat perkembangan dan memberikan konfirmasi. Administrator kemudian menutup laporan.

## 2.1 Aktor Sistem

| **Aktor**         | **Apa yang Dapat Dilakukan**                                                                     |
|-------------------|--------------------------------------------------------------------------------------------------|
| Pelapor           | Membuat laporan, melihat status, menambahkan komentar, dan mengonfirmasi hasil.                  |
| Administrator     | Memeriksa laporan, menentukan kategori dan prioritas, menugaskan teknisi, serta menutup laporan. |
| Teknisi           | Melihat tugas, menerima tugas, memperbarui progres, dan menandai pekerjaan selesai.              |
| Manajer Fasilitas | Melihat dashboard dan laporan ringkas.                                                           |

## 2.2 Fitur Wajib

- Membuat laporan baru.

- Melihat daftar laporan.

- Mencari dan menyaring laporan.

- Melihat detail laporan.

- Memeriksa laporan.

- Menentukan prioritas.

- Menugaskan teknisi.

- Mengubah status pekerjaan.

- Menambahkan komentar atau catatan.

- Menyimpan riwayat status.

- Menutup atau membuka kembali laporan.

- Menampilkan dashboard sederhana.

## 2.3 Fitur yang Tidak Wajib

- Upload foto.

- Email notification.

- Login menggunakan akun Google.

- QR code ruangan.

- AI untuk menentukan kategori.

- Inventory spare part.

- Vendor management.

CATATAN: Fitur upload foto tidak diwajibkan karena object storage dapat memerlukan aktivasi layanan tambahan. Proyek wajib cukup menggunakan Cloudflare Workers dan D1 pada paket gratis.

# 3. Alur Sistem

Submitted  
↓  
Under Review  
↓  
Assigned  
↓  
In Progress  
↓  
Resolved  
↓  
Closed

Mahasiswa boleh menambahkan status lain, tetapi harus dijelaskan di requirement dan business rules.

# 4. Penggunaan AI

AI wajib digunakan, tetapi AI tidak boleh mengambil keputusan akhir. Mahasiswa harus menyimpan output awal AI, menemukan kesalahan, memperbaiki, lalu menyimpan hasil final.

| **Tahap**                              | **Siapa yang Melakukan** |
|----------------------------------------|--------------------------|
| AI membuat draft                       | AI                       |
| Memeriksa fakta dan asumsi             | Mahasiswa                |
| Memperbaiki requirement atau kode      | Mahasiswa dan AI         |
| Menjalankan test                       | Mahasiswa                |
| Menyetujui hasil                       | Mahasiswa atau reviewer  |
| Bertanggung jawab terhadap hasil akhir | Mahasiswa                |

# 5. Skills AI yang dapat dibuat

Mahasiswa membuat 15 file SKILL.md. Setiap skill hanya menangani satu jenis pekerjaan.

| **No.** | **Nama Skill**            | **Tujuan**                                                                                       |
|---------|---------------------------|--------------------------------------------------------------------------------------------------|
| 01      | Inception dan Stakeholder | Memahami masalah, tujuan, stakeholder, scope, asumsi, dan pertanyaan terbuka.                    |
| 02      | Elicitation               | Menyusun pertanyaan dan menemukan kebutuhan stakeholder.                                         |
| 03      | Specification             | Membuat functional requirement, non-functional requirement, user story, dan acceptance criteria. |
| 04      | Prioritization            | Menentukan prioritas dan menyelesaikan konflik kebutuhan.                                        |
| 05      | Validation dan Change     | Memeriksa requirement dan menganalisis perubahan.                                                |
| 06      | Architecture Design       | Menentukan bagian utama aplikasi.                                                                |
| 07      | Database dan API Design   | Membuat tabel database dan endpoint API.                                                         |
| 08      | UI Design                 | Membuat halaman, navigasi, form, dan wireframe.                                                  |
| 09      | Issue Planning            | Mengubah requirement menjadi GitHub Issues.                                                      |
| 10      | Implementation            | Mengerjakan satu issue menjadi kode.                                                             |
| 11      | Code Review               | Memeriksa kode dan test.                                                                         |
| 12      | Test Planning             | Membuat rencana pengujian.                                                                       |
| 13      | Automated Testing         | Membuat unit test dan integration test.                                                          |
| 14      | Acceptance Testing        | Menguji alur lengkap pengguna.                                                                   |
| 15      | Deployment                | Mempublikasikan aplikasi dan memeriksa hasilnya.                                                 |

## 5.1 Format Sederhana SKILL.md

\# Nama Skill  
  
\## Tujuan  
Jelaskan pekerjaan yang dilakukan skill.  
  
\## Kapan Digunakan  
Jelaskan kapan skill dijalankan.  
  
\## Input  
Daftar file yang harus dibaca.  
  
\## Langkah Kerja  
1. Baca input.  
2. Kerjakan tugas.  
3. Periksa hasil.  
4. Berhenti jika informasi tidak cukup.  
  
\## Output  
Tuliskan file yang harus dibuat.  
  
\## Aturan  
- Jangan membuat fakta baru.  
- Tandai asumsi.  
- Gunakan ID requirement.  
- Jangan melewati scope.  
  
\## Quality Check  
Daftar pemeriksaan hasil.  
  
\## Kondisi Gagal  
Kapan AI harus berhenti.  
  
\## Human Review  
Bagian yang harus diperiksa manusia.

CATATAN: Mahasiswa tidak harus menggunakan istilah bahasa Inggris pada isi skill. Nama file tetap SKILL.md.

# 6. Work Product

| **Tahap**    | **Output Minimum**                                                                                     |
|--------------|--------------------------------------------------------------------------------------------------------|
| Requirements | Inception, elicitation, requirements, user stories, prioritas, validasi, change request, traceability. |
| Design       | Architecture, database, API, UI flow, wireframe.                                                       |
| Planning     | GitHub Issues dan rencana pengerjaan.                                                                  |
| Coding       | Source code, branch, commit, dan pull request.                                                         |
| Testing      | Test plan, unit test, integration test, acceptance test.                                               |
| Deployment   | URL Cloudflare, bukti test, release note.                                                              |
| AI Evidence  | Prompt/invocation, output AI, review manusia, hasil final.                                             |

# 7. Struktur Repository

campus-service-project/  
├── README.md  
├── CASE.md  
├── skills/  
├── docs/  
│ ├── requirements/  
│ ├── design/  
│ ├── testing/  
│ └── deployment/  
├── src/  
├── worker/  
├── database/  
├── tests/  
├── evidence/  
├── .github/  
└── wrangler.jsonc

Struktur ini boleh bertambah, tetapi jangan diubah tanpa alasan yang jelas.

# 8. Ketentuan Minimum

| **Item**                   | **Minimum**               |
|----------------------------|---------------------------|
| Functional requirement     | 12                        |
| Non-functional requirement | 6                         |
| Business rule              | 5                         |
| User story                 | 10                        |
| Acceptance criteria        | 2 untuk setiap user story |
| GitHub Issues              | 10                        |
| Pull Request               | 6                         |
| Automated test             | 20                        |
| Change request             | 1                         |
| Deployment                 | 1 URL publik              |

# 9. Rubrik Penilaian

| **Komponen**                  | **Bobot** |
|-------------------------------|-----------|
| Requirements                  | 15%       |
| Design                        | 15%       |
| Skills AI                     | 15%       |
| GitHub dan planning           | 10%       |
| Coding                        | 15%       |
| Testing                       | 15%       |
| Traceability dan human review | 5%        |
| Deployment                    | 5%        |
| Reflection dan presentasi     | 5%        |
| TOTAL                         | 100%      |

# BAGIAN II — TUTORIAL 

# 1. Gambaran Tutorial

Pada tutorial ini kita akan membuat aplikasi paling dasar terlebih dahulu. Jangan langsung membuat semua fitur. Target awal adalah aplikasi dapat berjalan, menyimpan laporan, menampilkan laporan, dan dapat dibuka melalui internet.

CATATAN: Kerjakan tutorial sesuai urutan. Jangan melewati langkah walaupun AI menyarankan cara yang lebih kompleks.

# 2. Persiapan

## 2.1 Akun yang Dibutuhkan

- Akun GitHub.

- Akun Cloudflare.

- Email aktif.

## 2.2 Aplikasi yang Harus Diinstal

- Node.js.

- Git.

- Visual Studio Code atau yang sejenisnya – antigravity, codex, claude code, dsb

- Browser Chrome, Edge, Firefox, atau Safari.

## 2.3 Periksa Instalasi

Buka Terminal, lalu jalankan:

node --version  
npm --version  
git --version

Apabila setiap perintah menampilkan nomor versi, berarti instalasi berhasil.

JIKA ERROR: Jika muncul pesan 'command not found', tutup Terminal, buka kembali, lalu coba lagi. Jika masih gagal, instal ulang aplikasi yang belum terbaca.

# 3. Membuat Proyek

Di Terminal, jalankan perintah berikut:

npm create cloudflare@latest -- campus-maintenance --framework=react

Perintah ini meminta Cloudflare membuat folder proyek bernama campus-maintenance dengan React.

Jika muncul pertanyaan di Terminal:

- Pilih TypeScript.

- Pilih untuk menginstal dependency.

- Jika ditanya deploy sekarang, pilih No terlebih dahulu.

- Jika pilihan berbeda, pilih opsi yang paling dekat dengan React + Worker.

Masuk ke folder proyek:

cd campus-maintenance

Jalankan aplikasi:

npm run dev

Terminal akan menampilkan alamat lokal, misalnya http://localhost:5173. Buka alamat tersebut di browser.

CATATAN: Jangan menutup Terminal selama aplikasi lokal masih digunakan. Tekan Ctrl+C untuk menghentikan server.

# 4. Membuka Proyek di VS Code (Khusus bila menggunakan VS Code)

Dari folder proyek, jalankan:

code .

Tanda titik berarti membuka folder saat ini. Jika perintah code tidak tersedia, buka Visual Studio Code, pilih File \> Open Folder, lalu pilih folder campus-maintenance.

# 5. Mengenal Folder Utama

| **Folder/File** | **Fungsi**                               |
|-----------------|------------------------------------------|
| src/            | Halaman dan komponen React.              |
| worker/         | Kode backend/API.                        |
| wrangler.jsonc  | Konfigurasi Cloudflare.                  |
| package.json    | Daftar dependency dan perintah proyek.   |
| database/       | Migration dan file SQL yang akan dibuat. |
| tests/          | File pengujian.                          |

# 6. Membuat Struktur Folder

Buat folder berikut melalui VS Code. Klik kanan pada nama proyek lalu pilih New Folder.

skills  
docs  
docs/requirements  
docs/design  
docs/testing  
docs/deployment  
database  
database/migrations  
tests  
tests/unit  
tests/integration  
tests/acceptance  
evidence

Cara ini sengaja menggunakan VS Code agar lebih mudah bagi pemula. Mahasiswa yang sudah terbiasa boleh memakai Terminal.

# 7. Membuat Halaman Pertama

Buka file src/App.tsx. Hapus isi lama, lalu ganti dengan kode berikut.

import { useEffect, useState } from "react";  
  
type ServiceRequest = {  
id: string;  
request_number: string;  
title: string;  
location: string;  
category: string;  
priority: string;  
status: string;  
};  
  
export default function App() {  
const \[requests, setRequests\] = useState\<ServiceRequest\[\]\>(\[\]);  
const \[title, setTitle\] = useState("");  
const \[description, setDescription\] = useState("");  
const \[location, setLocation\] = useState("");  
const \[category, setCategory\] = useState("Internet");  
const \[message, setMessage\] = useState("");  
  
async function loadRequests() {  
const response = await fetch("/api/requests");  
const result = await response.json();  
setRequests(result.data ?? \[\]);  
}  
  
useEffect(() =\> {  
loadRequests();  
}, \[\]);  
  
async function submitRequest(event: React.FormEvent) {  
event.preventDefault();  
setMessage("");  
  
const response = await fetch("/api/requests", {  
method: "POST",  
headers: { "Content-Type": "application/json" },  
body: JSON.stringify({  
title,  
description,  
location,  
category,  
}),  
});  
  
const result = await response.json();  
  
if (!response.ok) {  
setMessage(result.error ?? "Laporan gagal dibuat.");  
return;  
}  
  
setMessage(\`Laporan berhasil dibuat: \${result.requestNumber}\`);  
setTitle("");  
setDescription("");  
setLocation("");  
await loadRequests();  
}  
  
return (  
\<main style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}\>  
\<h1\>Campus Service Request\</h1\>  
\<p\>Laporkan masalah fasilitas kampus.\</p\>  
  
\<form onSubmit={submitRequest}\>  
\<p\>  
\<label\>Judul\<br /\>  
\<input value={title} onChange={(e) =\> setTitle(e.target.value)} /\>  
\</label\>  
\</p\>  
  
\<p\>  
\<label\>Deskripsi\<br /\>  
\<textarea  
value={description}  
onChange={(e) =\> setDescription(e.target.value)}  
/\>  
\</label\>  
\</p\>  
  
\<p\>  
\<label\>Lokasi\<br /\>  
\<input value={location} onChange={(e) =\> setLocation(e.target.value)} /\>  
\</label\>  
\</p\>  
  
\<p\>  
\<label\>Kategori\<br /\>  
\<select value={category} onChange={(e) =\> setCategory(e.target.value)}\>  
\<option\>Internet\</option\>  
\<option\>AC\</option\>  
\<option\>Peralatan Kelas\</option\>  
\<option\>Kebersihan\</option\>  
\<option\>Lainnya\</option\>  
\</select\>  
\</label\>  
\</p\>  
  
\<button type="submit"\>Kirim Laporan\</button\>  
\</form\>  
  
{message && \<p\>{message}\</p\>}  
  
\<hr /\>  
  
\<h2\>Daftar Laporan\</h2\>  
  
{requests.length === 0 ? (  
\<p\>Belum ada laporan.\</p\>  
) : (  
\<table border={1} cellPadding={8}\>  
\<thead\>  
\<tr\>  
\<th\>Nomor\</th\>  
\<th\>Judul\</th\>  
\<th\>Lokasi\</th\>  
\<th\>Status\</th\>  
\</tr\>  
\</thead\>  
\<tbody\>  
{requests.map((item) =\> (  
\<tr key={item.id}\>  
\<td\>{item.request_number}\</td\>  
\<td\>{item.title}\</td\>  
\<td\>{item.location}\</td\>  
\<td\>{item.status}\</td\>  
\</tr\>  
))}  
\</tbody\>  
\</table\>  
)}  
\</main\>  
);  
}

Halaman ini memiliki form laporan dan tabel daftar laporan. Pada tahap ini halaman belum bekerja karena API dan database belum dibuat.

# 8. Membuat Database D1

Login ke Cloudflare melalui Terminal:

npx wrangler login

Browser akan terbuka. Login ke Cloudflare dan berikan izin kepada Wrangler.

Setelah berhasil, buat database:

npx wrangler d1 create campus-maintenance-db

Terminal akan menampilkan database_id. Salin nilainya karena akan dipakai pada langkah berikutnya.

CATATAN: Jangan menyalin tanda kutip tambahan. Salin hanya isi database_id.

# 9. Menghubungkan Database ke Proyek

Buka wrangler.jsonc. Tambahkan konfigurasi D1 berikut.

{  
"\$schema": "./node_modules/wrangler/config-schema.json",  
"name": "campus-maintenance",  
"main": "worker/index.ts",  
"compatibility_date": "2026-06-25",  
"assets": {  
"not_found_handling": "single-page-application"  
},  
"d1_databases": \[  
{  
"binding": "DB",  
"database_name": "campus-maintenance-db",  
"database_id": "PASTE_DATABASE_ID_DI_SINI"  
}  
\]  
}

CATATAN: Jangan menulis PASTE_DATABASE_ID_DI_SINI. Ganti bagian tersebut dengan database_id yang diberikan Cloudflare.

# 10. Membuat Tabel Database

Buat file database/migrations/0001_initial.sql. Isi dengan kode berikut.

CREATE TABLE service_requests (  
id TEXT PRIMARY KEY,  
request_number TEXT NOT NULL UNIQUE,  
title TEXT NOT NULL,  
description TEXT NOT NULL,  
location TEXT NOT NULL,  
category TEXT NOT NULL,  
priority TEXT NOT NULL DEFAULT 'MEDIUM',  
status TEXT NOT NULL DEFAULT 'SUBMITTED',  
created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP  
);

Jalankan migration untuk database lokal:

npx wrangler d1 execute campus-maintenance-db --local --file=database/migrations/0001_initial.sql

Jika berhasil, Terminal akan menampilkan bahwa query telah dijalankan.

# 11. Membuat API

Buka worker/index.ts. Ganti isinya dengan kode berikut.

interface Env {  
DB: D1Database;  
}  
  
function json(data: unknown, status = 200) {  
return Response.json(data, { status });  
}  
  
export default {  
async fetch(request: Request, env: Env): Promise\<Response\> {  
const url = new URL(request.url);  
  
if (url.pathname === "/api/health" && request.method === "GET") {  
return json({ status: "ok" });  
}  
  
if (url.pathname === "/api/requests" && request.method === "GET") {  
const result = await env.DB.prepare(\`  
SELECT id, request_number, title, location,  
category, priority, status  
FROM service_requests  
ORDER BY created_at DESC  
\`).all();  
  
return json({ data: result.results });  
}  
  
if (url.pathname === "/api/requests" && request.method === "POST") {  
const input = await request.json() as {  
title?: string;  
description?: string;  
location?: string;  
category?: string;  
};  
  
if (  
!input.title \|\|  
!input.description \|\|  
!input.location \|\|  
!input.category  
) {  
return json({ error: "Semua field wajib diisi." }, 422);  
}  
  
if (input.description.trim().length \< 20) {  
return json({  
error: "Deskripsi minimal 20 karakter."  
}, 422);  
}  
  
const id = crypto.randomUUID();  
const requestNumber = \`CSR-\${Date.now()}\`;  
  
await env.DB.prepare(\`  
INSERT INTO service_requests  
(id, request_number, title, description,  
location, category, priority, status)  
VALUES (?, ?, ?, ?, ?, ?, 'MEDIUM', 'SUBMITTED')  
\`).bind(  
id,  
requestNumber,  
input.title.trim(),  
input.description.trim(),  
input.location.trim(),  
input.category.trim()  
).run();  
  
return json({  
id,  
requestNumber,  
status: "SUBMITTED"  
}, 201);  
}  
  
return json({ error: "Alamat API tidak ditemukan." }, 404);  
}  
} satisfies ExportedHandler\<Env\>;

# 12. Menjalankan Aplikasi dengan Database Lokal

Hentikan server lama dengan Ctrl+C, lalu jalankan kembali:

npm run dev

Lakukan pengujian berikut:

1.  Buka aplikasi di browser.

<!-- -->

9.  Isi semua field.

10. Gunakan deskripsi lebih dari 20 karakter.

11. Klik Kirim Laporan.

12. Periksa apakah nomor laporan muncul.

13. Periksa apakah laporan tampil pada tabel.

14. Refresh halaman.

15. Pastikan data masih ada.

JIKA ERROR: Jika muncul error 'no such table', migration belum dijalankan pada database lokal. Jalankan kembali perintah migration lokal.

# 13. Menyimpan Proyek ke GitHub

Buat repository baru di GitHub. Jangan centang pilihan membuat README karena proyek sudah memiliki file.

Di Terminal, jalankan:

git init  
git add .  
git commit -m "chore: initialize campus maintenance project"  
git branch -M main  
git remote add origin https://github.com/USERNAME/NAMA-REPOSITORY.git  
git push -u origin main

CATATAN: Ganti USERNAME dan NAMA-REPOSITORY. Jangan menyalin contoh tersebut secara langsung.

# 14. Cara Kerja Menggunakan Branch

Untuk mengerjakan satu fitur baru:

git checkout -b feature/FR-01-create-request

Setelah perubahan selesai:

git add .  
git commit -m "feat(FR-01): add service request form"  
git push -u origin feature/FR-01-create-request

Buka GitHub, lalu buat Pull Request. Minta teman atau dosen memeriksa sebelum merge.

# 15. Membuat Test Pertama

Instal Vitest:

npm install -D vitest

Buat file tests/unit/request-validation.test.ts.

import { describe, expect, it } from "vitest";  
  
function validDescription(text: string) {  
return text.trim().length \>= 20;  
}  
  
describe("validasi deskripsi laporan", () =\> {  
it("menolak deskripsi yang terlalu pendek", () =\> {  
expect(validDescription("rusak")).toBe(false);  
});  
  
it("menerima deskripsi minimal 20 karakter", () =\> {  
expect(  
validDescription("Proyektor tidak menyala sejak pagi.")  
).toBe(true);  
});  
});

Buka package.json. Tambahkan script test jika belum ada.

{  
"scripts": {  
"test": "vitest"  
}  
}

Jalankan test:

npm test

Jika dua test lulus, Terminal akan menampilkan tanda PASS.

# 16. Membuat GitHub Actions Sederhana

Buat file .github/workflows/ci.yml.

name: Pemeriksaan Otomatis  
  
on:  
pull_request:  
push:  
branches: \[main\]  
  
jobs:  
test:  
runs-on: ubuntu-latest  
  
steps:  
- name: Ambil source code  
uses: actions/checkout@v4  
  
- name: Pasang Node.js  
uses: actions/setup-node@v4  
with:  
node-version: 22  
cache: npm  
  
- name: Instal dependency  
run: npm ci  
  
- name: Jalankan test  
run: npm test -- --run  
  
- name: Build aplikasi  
run: npm run build

Setelah file dikirim ke GitHub, buka tab Actions. GitHub akan menjalankan test dan build secara otomatis.

# 17. Membuat Database Production

Sebelum deployment, jalankan migration pada database Cloudflare.

npx wrangler d1 execute campus-maintenance-db --remote --file=database/migrations/0001_initial.sql

CATATAN: Pastikan perintah lokal sudah berhasil sebelum menjalankan --remote. Perintah --remote mengubah database production.

# 18. Deploy ke Cloudflare

Jalankan:

npm run build  
npm run deploy

Setelah selesai, Terminal akan menampilkan URL dengan domain workers.dev. Buka URL tersebut di browser.

Lakukan pemeriksaan:

1.  Halaman terbuka.

<!-- -->

16. Form dapat diisi.

17. Laporan dapat dikirim.

18. Data muncul dalam daftar.

19. Refresh tidak menghapus data.

20. Alamat /api/health menampilkan status ok.

# 19. Menghubungkan GitHub dengan Cloudflare

Langkah ini membuat deployment otomatis ketika perubahan di branch main sudah selesai.

1.  Login ke Cloudflare Dashboard.

<!-- -->

21. Buka Workers & Pages.

22. Pilih aplikasi yang sudah dibuat.

23. Buka bagian Settings atau Builds.

24. Pilih Connect to Git.

25. Pilih GitHub.

26. Berikan akses ke repository proyek.

27. Pilih branch main sebagai production branch.

28. Simpan pengaturan.

29. Lakukan satu perubahan kecil di GitHub untuk menguji deployment otomatis.

CATATAN: Nama menu Cloudflare dapat sedikit berubah. Jangan membuat proyek baru jika Worker yang sama sudah tersedia.

# 20. Checklist Setelah Deployment

**☐** Aplikasi dapat dibuka melalui URL publik.

**☐** Form laporan dapat digunakan.

**☐** API dapat menerima data.

**☐** Data tersimpan di D1.

**☐** Tidak ada token atau password di GitHub.

**☐** Test di GitHub Actions lulus.

**☐** README berisi URL aplikasi.

**☐** Traceability matrix diperbarui.

**☐** Release note dibuat.

**☐** Keterbatasan sistem dituliskan.

# 21. Error yang Sering Terjadi

| **Error**                  | **Penyebab Umum**                            | **Solusi Pemula**                                                           |
|----------------------------|----------------------------------------------|-----------------------------------------------------------------------------|
| node: command not found    | Node.js belum terbaca.                       | Instal Node.js, tutup Terminal, lalu buka kembali.                          |
| npm run dev gagal          | Dependency belum terinstal.                  | Jalankan npm install.                                                       |
| no such table              | Migration belum dijalankan.                  | Jalankan perintah D1 execute dengan --local atau --remote sesuai kebutuhan. |
| DB is undefined            | Binding D1 belum benar.                      | Periksa nama binding DB dan database_id di wrangler.jsonc.                  |
| 404 pada /api/requests     | Kode Worker belum memiliki route tersebut.   | Periksa worker/index.ts dan restart npm run dev.                            |
| Data hilang setelah deploy | Migration production belum dijalankan.       | Jalankan migration dengan --remote.                                         |
| Git push ditolak           | URL repository atau login salah.             | Periksa git remote -v dan login GitHub.                                     |
| GitHub Actions gagal       | Test atau build gagal.                       | Klik job yang merah dan baca langkah pertama yang gagal.                    |
| Deployment gagal           | Build error atau konfigurasi Wrangler salah. | Jalankan npm run build secara lokal terlebih dahulu.                        |

# BAGIAN III — TEMPLATE SEDERHANA

# 1. Template GitHub Issue

\# \[FR-XX\] Nama Fitur  
  
\## Requirement  
FR-XX:  
  
\## User Story  
US-XX:  
  
\## Acceptance Criteria  
- AC-XX:  
- AC-XX:  
  
\## Pekerjaan  
- \[ \] Buat tampilan  
- \[ \] Buat API  
- \[ \] Simpan data  
- \[ \] Buat test  
- \[ \] Update traceability  
  
\## Selesai Jika  
- \[ \] Acceptance criteria terpenuhi  
- \[ \] Test lulus  
- \[ \] Human review selesai

# 2. Template Pull Request

\## Issue  
Closes \#  
  
\## Requirement  
FR:  
AC:  
  
\## Perubahan  
Jelaskan perubahan yang dibuat.  
  
\## Test  
- \[ \] Test dijalankan  
- \[ \] Build berhasil  
- \[ \] Dicoba di browser  
  
\## Penggunaan AI  
Skill yang digunakan:  
Kesalahan AI yang ditemukan:  
Perbaikan manusia:  
  
\## Reviewer  
Nama:  
Keputusan:

# 3. Template Human Review

\# Human Review  
  
\## Work Product  
Nama file, issue, atau pull request:  
  
\## Skill AI  
Nama skill:  
  
\## Masalah yang Ditemukan  
1.  
2.  
3.  
  
\## Perbaikan  
1.  
2.  
3.  
  
\## Hasil Pemeriksaan  
- \[ \] Sesuai requirement  
- \[ \] Tidak menambah fitur di luar scope  
- \[ \] Test lulus  
- \[ \] Tidak ada secret  
- \[ \] Traceability diperbarui  
  
\## Keputusan  
- \[ \] Disetujui  
- \[ \] Perlu revisi  
- \[ \] Ditolak  
- \[ \] Terblokir

# 4. Template Traceability

| **Requirement** | **User Story** | **Design**    | **Issue** | **Kode**                 | **Test**     | **Status** |
|-----------------|----------------|---------------|-----------|--------------------------|--------------|------------|
| FR-01           | US-01          | UI-01, API-01 | \#12      | App.tsx, worker/index.ts | UT-01, AT-01 | Selesai    |
| FR-05           | US-04          | API-05        | \#18      | assignment.ts            | IT-05        | Belum      |

# 5. Pertanyaan Refleksi

1.  Bagian mana yang paling membantu ketika menggunakan AI?

<!-- -->

30. Kesalahan apa yang paling sering dibuat AI?

31. Fitur apa yang pernah dibuat AI tetapi tidak terdapat pada requirement?

32. Test apa yang gagal dan apa penyebabnya?

33. Perubahan apa yang dilakukan setelah human review?

34. Mengapa output AI tidak boleh langsung dianggap benar?

35. Bagaimana traceability membantu proyek?

36. Apa yang akan diperbaiki jika proyek diulang?

# 6. Format Pengumpulan

Nama:  
NIM:  
Kelas:  
Anggota tim:  
Repository URL:  
Cloudflare URL:  
Commit terakhir:  
Jumlah test:  
AI yang digunakan:  
Known limitations:
