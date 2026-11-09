# Video cerita Kelas 2 Bab 8 (Tahap 1: Story)

Status: aktif untuk Sub-Bab A dan B. Video animasi HTML/SVG **menggantikan sistem slide** di Tahap 1 Story. Daftar isi tiap sub-bab dan kalimatnya ada di naskah per sub-bab.

## Prinsip

- **Putar satu per satu saat diketuk.** `DaftarVideoCerita` (`src/components/modul/video-k2b2-umum.tsx`, dipakai bersama) menampilkan tiga kartu video. Tidak ada video yang berjalan sendiri saat halaman dibuka. Mengetuk ▶ Putar memasang pemutar `VideoCerita` dengan `mulaiLangsung`. Hanya satu video yang terpasang pada satu waktu. Memutar video lain menggantikan yang sedang berjalan dan menghentikan suaranya.
- **Gratis dan tanpa API.** Gambar bergerak memakai SVG dan CSS di perangkat siswa. Tidak ada berkas video dan tidak ada layanan berbayar.
- **Naskah satu sumber.** Kalimat tiap adegan dan papan judul ada di `src/components/modul/naskah-k2b8.ts`. Mengubah kalimat di sana mengubah suara, teks layar, naskah markdown, dan JSON bab sekaligus.
- **Suara.** `speakGuru` modul dengan Web Speech API perangkat, laju 0,70 dan nada 1 (`suaraLaju` dan `suaraNada` di JSON bab). Ucapan dipecah per kalimat supaya tidak berhenti sendiri di Chrome.
- **Turus dan lambang bergerak.** Turus (`TurusSvg`) digambar dari data dengan goresan kelima mencoret miring, tabel diagram (`TabelSvg`) menampilkan baris satu per satu, dan lambang polos (`LambangVideo`) disusun mengikuti kalimat yang dibacakan.
- **Tema warna** biru ungu royal, kuning emas, putih.

## Isi video

### Sub-Bab A: Diagram Turus

1. **Hari Buah** (Apa itu diagram turus?): Hari buah di kantin (4); Data buah Lili dan teman (4); Mengenal turus (4).
2. **Turus Hewan Paman Halim** (Membuat dan membaca diagram turus): Peternakan Paman Halim (4); Membuat diagram turus (4); Membaca diagram turus (4).
3. **Mengumpulkan Data Sendiri** (Bertanya, mencatat, dan membaca): Bertanya kepada teman (4); Data mainan Kira (4); Data sayur dan bunga (4).

### Sub-Bab B: Diagram Gambar

1. **Bintang untuk Buah** (Dari turus ke diagram gambar): Mengingat data buah (4); Satu bintang, satu buah (4); Gambar lain pun boleh (4).
2. **Rangkaian Bunga Tika** (Membuat dan membaca diagram gambar): Tika merangkai bunga (4); Membuat diagram bunga (4); Membaca diagram bunga (4).
3. **Kue, Permainan, dan Pelari** (Membaca berbagai diagram gambar): Kue kesukaan (4); Permainan tradisional (4); Para pelari (4).

## Berkas

- Mesin: `src/components/modul/video-cerita.tsx` (tidak berubah).
- Gambar bersama: `src/components/modul/video-k2b8-umum.tsx` (turus, lambang, tabel diagram, awan data, baris gambar benda).
- Adegan: `video-k2b8a.tsx` dan `video-k2b8b.tsx`.
- Pemasangan: `MODUL_SUBBAB` di `src/components/IgilModulePlayer.tsx`, kunci `mtk-2-bab8-A` dan `-B`, bidang `Cerita`.
- Uji: `scripts/uji-data-k2b8.mjs` dan `scripts/uji-statis-k2b8.mjs`.

