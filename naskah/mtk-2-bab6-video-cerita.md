# Video cerita Kelas 2 Bab 6 (Tahap 1: Story)

Status: aktif untuk Sub-Bab A dan B. Video animasi HTML/SVG **menggantikan sistem slide** di Tahap 1 Story. Daftar isi tiap sub-bab dan kalimatnya ada di naskah per sub-bab.

## Prinsip

- **Putar satu per satu saat diketuk.** `DaftarVideoCerita` (`src/components/modul/video-k2b2-umum.tsx`, dipakai bersama) menampilkan tiga kartu video. Tidak ada video yang berjalan sendiri saat halaman dibuka. Mengetuk ▶ Putar memasang pemutar `VideoCerita` dengan `mulaiLangsung`. Hanya satu video yang terpasang pada satu waktu. Memutar video lain menggantikan yang sedang berjalan dan menghentikan suaranya.
- **Gratis dan tanpa API.** Gambar bergerak memakai SVG dan CSS di perangkat siswa. Tidak ada berkas video dan tidak ada layanan berbayar.
- **Naskah satu sumber.** Kalimat tiap adegan dan papan judul ada di `src/components/modul/naskah-k2b6.ts`. Mengubah kalimat di sana mengubah suara, teks layar, naskah markdown, dan JSON bab sekaligus.
- **Suara.** `speakGuru` modul dengan Web Speech API perangkat, laju 0,70 dan nada 1 (`suaraLaju` dan `suaraNada` di JSON bab). Ucapan dipecah per kalimat supaya tidak berhenti sendiri di Chrome.
- **Neraca dan jam bergerak.** Neraca (`NeracaSvg`) dan jam (`IsiJam`) digambar dari data, dan miringnya neraca serta posisi jarum berubah halus mengikuti kalimat yang dibacakan. Matahari bergeser menurut bagian hari (`LangitHari`).
- **Tema warna** biru ungu royal, kuning emas, putih.

## Isi video

### Sub-Bab A: Berat

1. **Piket Membersihkan Kelas** (Enam sekawan mengangkat benda): Giliran piket (4); Berat atau ringan? (4); Bercerita dengan kata berat (4).
2. **Tiga Cara Membandingkan Berat** (Jungkat-jungkit, gantungan baju, dua tangan): Timbangan jungkat-jungkit (4); Gantungan baju dan dua tangan (4); Paling berat, paling ringan (4).
3. **Tika Mengukur Berat Boneka** (Memakai satuan tidak baku): Satuan tidak baku (4); Satu, dua, tiga, empat (4); Alat ukur yang berbeda (4).

### Sub-Bab B: Waktu

1. **Jam dan Jarumnya** (Halim bangun tidur pukul lima): Bagian-bagian jam (3); Pukul lima tepat (4); Membaca pukul tepat (4).
2. **Kegiatan Tika Sehari-hari** (Pagi, siang, sore, dan malam): Pagi hari (3); Siang dan sore (4); Malam hari (4).
3. **Olahraga Hari Minggu** (Lebih lama atau lebih sebentar): Kira berolahraga (4); Lebih lama atau lebih sebentar? (4); Membandingkan waktu (4).

## Berkas

- Mesin: `src/components/modul/video-cerita.tsx` (tidak berubah).
- Gambar bersama: `src/components/modul/video-k2b6-umum.tsx` (neraca dan gantungan, jam dinding, satuan tidak baku, ruang kelas, langit satu hari, batang lama kegiatan, kemoceng).
- Adegan: `video-k2b6a.tsx` dan `video-k2b6b.tsx`.
- Pemasangan: `MODUL_SUBBAB` di `src/components/IgilModulePlayer.tsx`, kunci `mtk-2-bab6-A` dan `-B`, bidang `Cerita`.
- Uji: `scripts/uji-data-k2b6.mjs` dan `scripts/uji-statis-k2b6.mjs`.

