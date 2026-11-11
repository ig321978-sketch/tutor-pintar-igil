# Peta `IgilModulePlayer.tsx`

Jangan baca seluruh file (±4000 baris) kecuali sedang menyentuh bagian yang relevan.
Registri simulasi ada di `src/components/modul/registri-simulasi.ts` — bab baru didaftarkan di sana, bukan di pemutar.

| Rentang (kira-kira) | Isi |
|---|---|
| 1–120 | Import (data bab, komponen sub-bab, suara, gaya) |
| 296–400 | Tipe tab, kode sub-bab, daftar bab yang bisa diputar |
| 428–560 | `MATERI_BAB` (teks/materi Kelas 1–2 lama) |
| 577–890 | `MODUL_SUBBAB` (paket Kelas 3–6, lazy) |
| 895–973 | Gaya tombol tab |
| 975–994 | `TAHAP_SILABUS` / `TAHAP_SILABUS_SMISCPA` (daftar tahap di Silabus) |
| — | Registri: lihat `registri-simulasi.ts` (`SIMULASI_MATERI`, `RINGKAS_BAB`, `SIMULASI_BAB`, `TAHAP_SIMULASI`) |
| 1052–1488 | State, efek, handler progres / suara / kunci tahap |
| 1489–1576 | Kerangka halaman utama modul |
| 1577–1639 | Banner judul |
| 1640–1694 | Tombol tab utama (Silabus / Materi / Simulasi / Latihan / Ujian) |
| 1695–2056 | Halaman Silabus |
| 2057–2140 | Halaman Materi (tab sub-bab) |
| 2141–2263 | Story |
| 2264–2328 | Mind-Map (`PetaKonsep` bila ada `RINGKAS_BAB`) |
| 2329–2528 | Infografis (`InfografisRingkas` bila ada ringkas) |
| 2529–2564 | Simulasi di dalam Materi (SMISCPA) |
| 2565–3016 | Concrete |
| 3017–3488 | Pictorial / Picture |
| 3489–3789 | Abstract |
| 3790–4029 | Tab Simulasi (bab belum migrasi) |
| 4030–akhir | Latihan & Ujian |

Saat menambah bab SMISCPA: tulis komponen `SimulasiBabN` / `SimulasiK2BabN`, JSON `kelas*-bab*-ringkas.json`, daftarkan di `registri-simulasi.ts`. Jangan menambah entri di `IgilModulePlayer` kecuali mengubah kerangka UI bersama.

Migrasi Kelas 2: Bab 1 sudah di `SIMULASI_MATERI` + `RINGKAS_BAB`. Bab 2–3 masih di `SIMULASI_BAB` (tab terpisah). Bab 4–8 belum punya simulasi.
