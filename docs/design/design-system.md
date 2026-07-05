# Design System - Campus Operations

Dokumen ini menjadi acuan visual untuk redesign UI. Scope-nya hanya presentasi: warna, tipografi, spacing, radius, shadow, komponen, icon, dan state interaktif. Dokumen ini tidak mengubah requirement, struktur data, endpoint API, role validation, autentikasi, atau flow bisnis.

## Fase Premium UI

Redesign premium mengikuti TypeUI Premium skill:

- Mission: UI modern, polished, token-first, dan konsisten.
- Accessibility: WCAG 2.2 AA, keyboard-first interactions, visible focus states.
- Component rules: setiap komponen wajib punya state default, hover, focus-visible, disabled/loading/error bila relevan.
- Anti-pattern: hindari low contrast, spacing acak, label ambigu, shadow berat, dan card generik yang tidak punya hierarchy.

Identitas visual aplikasi diposisikan sebagai **Campus Operations**: sistem operasional kampus yang tenang, rapi, profesional, dan mudah dipindai oleh Pelapor, Administrator, Teknisi, dan Manajer.

## Palet Warna

| Token | Nilai | Pemakaian |
| --- | --- | --- |
| Primary | `#3454d1` | Aksi utama, active role, focus, highlight navigasi. |
| Primary Dark | `#10194b` | Heading besar dan identitas Campus Operations. |
| Secondary | `#2563eb` | Aksen operasional ringan. |
| Accent | `#d97706` | Informasi prioritas/saran dan penekanan non-kritis. |
| Neutral 900 | `#111827` | Heading dan teks utama. |
| Neutral 600 | `#475569` | Deskripsi, helper text, metadata. |
| Neutral 200 | `#dde5ef` | Border dan divider. |
| Neutral 50 | `#f7f9fc` | Background panel lembut. |

## Warna Status

| Status | Warna visual |
| --- | --- |
| `SUBMITTED` | Info blue. |
| `UNDER_REVIEW` | Warning amber. |
| `ASSIGNED` | Accent orange. |
| `IN_PROGRESS` | Primary blue. |
| `RESOLVED` | Success green. |
| `CLOSED` | Neutral gray. |

Prioritas memakai pola yang sama: `LOW` hijau, `MEDIUM` amber, `HIGH` orange, `URGENT` merah.

## Tipografi

| Level | Ukuran | Weight | Pemakaian |
| --- | ---: | ---: | --- |
| H1 | `clamp(2.35rem, 5vw, 4.35rem)` | 840 | Judul utama hero. |
| H2 | `1.5rem` | 760 | Judul section/panel. |
| H3 | `1.125rem` | 760 | Judul subsection/card. |
| Body | `1rem` | 400 | Konten utama. |
| Small | `0.875rem` | 650 | Label field dan metadata. |
| Caption | `0.75rem` | 840 | Eyebrow, badge, helper kecil. |

## Spacing

Spacing memakai kelipatan 4px/8px melalui token `--space-1` sampai `--space-16`. Panel utama memakai `24px-40px`, gap antar card memakai `12px-16px`, dan field form memakai `8px-12px`.

## Radius dan Shadow

| Token | Nilai | Pemakaian |
| --- | ---: | --- |
| `--radius-md` | `8px` | Input, tombol kecil. |
| `--radius-lg` | `10px` | Card kecil dan list row. |
| `--radius-xl` | `12px` | Panel utama. |
| `--shadow-sm` | soft | Card kecil. |
| `--shadow-md` | medium | Hero dan panel utama. |

## State Interaktif

- Hover: border lebih tegas, background sedikit lebih terang, dan shadow naik tipis.
- Focus: outline visual memakai `--shadow-focus`, tidak hanya perubahan warna.
- Disabled: background netral, teks lebih redup, cursor `not-allowed`.
- Loading/message: memakai panel feedback hijau/info dengan border jelas.
- Invalid field: border merah, background merah lembut, dan helper error kecil.

## Aturan Konsistensi

- Semua card memakai radius dan shadow token yang sama.
- Badge tidak mengandalkan warna saja; teks status/prioritas tetap selalu terlihat.
- Warna abu-abu untuk teks sekunder, border, dan background harus berasal dari neutral scale.
- Icon UI memakai `lucide-react` sebagai dependency presentasional ringan.
- Tidak ada perubahan backend/API/auth/business logic pada redesign premium.
