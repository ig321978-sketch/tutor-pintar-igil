# Matematika Kelas 2 · Bab 1 · Simulasi SMISCPA (pola hibrida)

Komponen: `src/components/modul/SimulasiK2Bab1.tsx` (di dalam Materi, tahap 4 SMISCPA), misi di `misi-k2bab1.ts`, lab di `SimulasiLab50.tsx` + `lab-bilangan-k2b1.ts`, mesin di `SimulasiMesinTukar.tsx`, skenario di `skenario-k2b1.ts`. Didaftarkan di `SIMULASI_MATERI` + `RINGKAS_BAB` (`registri-simulasi.ts`). Mind-Map dan Infografis memakai `kelas2-bab1-ringkas.json`. Tanpa jaringan, tanpa skor, tanpa Poin Kualifikasi. Suara: `speakGuru`.

## Penilaian metode

| Metode | Cocok? | Alasan |
|--------|--------|--------|
| PhET | Tinggi | Satu bilangan 0–50 menggerakkan batang, satuan, tabel, garis, dan banding |
| Mesin keadaan | Tinggi | Menulis ulang bilangan (ikat 10 satuan) berurutan dengan syarat |
| Skenario | Tinggi | Cerita stoples permen Sub-Bab C (tebak, hitung, banding, urut) |
| Lab 2D | Tidak | Bukan ukur/susun di kanvas |
| Lab 3D | Tidak | Bukan bangun ruang |

## Pola hibrida

Satu laboratorium bilangan yang alatnya bertambah per sub-bab. Gerbang lanjut: semua misi wajib, atau **Lewati misi** setelah menyentuh sekali.

| Sub-bab | Alat laboratorium | Misi wajib (ringkas) | Tantangan bebas |
|---------|-------------------|----------------------|-----------------|
| A · Menghitung, membaca, menulis | Lab50: batang, satuan, kalimat, garis | 26 dengan batang; 40; 50; ketuk 30 di garis | Kalimat 35; buat 21 |
| B · Nilai tempat | Lab50 + tabel; tab Mesin Tukar | Tabel 26; tabel 11; tabel 50; tuntas Mesin Tukar | Tabel 34; ingat 26 batang |
| C · Membandingkan (pencapaian misi) | Semua Lab50 + Bandingkan; tab Mesin Tukar; tab Stoples Permen | Banding 32↔26; 28↔25; 26=26; tuntas Stoples | Selisih puluhan ≥3; ingat Mesin Tukar |

Keadaan awal lab: `n=12`, `m=18` (bukan target misi). Alat melapor lewat `onKeadaan`; mesin/skenario lewat `onTuntas` → `{alat:"selesai", id}`.

## Alur satu layar

Satu simulasi per sub-bab di dalam Materi (`dalamPopup`). LANJUTKAN KE CONCRETE aktif bila misi wajib tercapai atau dilewati. Reset Semua di Lab50. Tanpa LLM/jaringan.

## Uji

- `node --no-warnings scripts/uji-lab-k2b1.mjs` — logika lab + mesin
- `node --no-warnings scripts/uji-lab-kelas2.mjs` — misi hibrida Bab 1
- `node --no-warnings scripts/uji-peta-konsep.mjs` / `uji-infografis-ringkas.mjs` — data ringkas
