# Design System - Campus Service Request

Dokumen ini menjadi acuan Fase 1 redesign UI. Scope-nya hanya visual: warna, tipografi, spacing, radius, shadow, dan state interaktif. Dokumen ini tidak mengubah requirement, struktur data, endpoint API, role validation, atau flow bisnis.

## Palet Warna

| Token | Nilai | Pemakaian |
| --- | --- | --- |
| Primary | `#2f5fd0` | Aksi utama, active role, focus, highlight navigasi. |
| Secondary | `#0e9f88` | Aksen operasional, status sehat, ilustrasi ringan. |
| Accent | `#f97316` | Informasi prioritas/saran dan penekanan non-kritis. |
| Neutral 900 | `#0f172a` | Heading dan teks utama. |
| Neutral 600 | `#475569` | Deskripsi, helper text, metadata. |
| Neutral 200 | `#e2e8f0` | Border dan divider. |
| Neutral 50 | `#f8fafc` | Background panel lembut. |

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
| H1 | `2.85rem` | 840 | Judul utama hero. |
| H2 | `1.38rem` | 760 | Judul section/panel. |
| H3 | `1.12rem` | 760 | Judul subsection/card. |
| Body | `1rem` | 400 | Konten utama. |
| Small | `0.875rem` | 600 | Label field dan metadata. |
| Caption | `0.78rem` | 760 | Eyebrow, badge, helper kecil. |

## Spacing

Spacing memakai kelipatan 4px/8px melalui token `--space-1` sampai `--space-10`. Panel utama memakai `24px`, gap antar card memakai `16px`, dan field form memakai `8px-12px`.

## Radius dan Shadow

| Token | Nilai | Pemakaian |
| --- | ---: | --- |
| `--radius-md` | `8px` | Input, tombol kecil. |
| `--radius-lg` | `8px` | Card kecil dan list row. |
| `--radius-xl` | `8px` | Panel utama. |
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
- Tidak ada dependency UI baru pada Fase 1.
