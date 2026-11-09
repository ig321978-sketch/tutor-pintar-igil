# Video cerita Kelas 2 Bab 7 (Tahap 1: Story)

Status: aktif untuk Sub-Bab A dan B. Video animasi HTML/SVG **menggantikan sistem slide** di Tahap 1 Story. Daftar isi tiap sub-bab dan kalimatnya ada di naskah per sub-bab.

## Prinsip

- **Putar satu per satu saat diketuk.** `DaftarVideoCerita` (`src/components/modul/video-k2b2-umum.tsx`, dipakai bersama) menampilkan tiga kartu video. Tidak ada video yang berjalan sendiri saat halaman dibuka. Mengetuk ▶ Putar memasang pemutar `VideoCerita` dengan `mulaiLangsung`. Hanya satu video yang terpasang pada satu waktu. Memutar video lain menggantikan yang sedang berjalan dan menghentikan suaranya.
- **Gratis dan tanpa API.** Gambar bergerak memakai SVG dan CSS di perangkat siswa. Tidak ada berkas video dan tidak ada layanan berbayar.
- **Naskah satu sumber.** Kalimat tiap adegan dan papan judul ada di `src/components/modul/naskah-k2b7.ts`. Mengubah kalimat di sana mengubah suara, teks layar, naskah markdown, dan JSON bab sekaligus.
- **Suara.** `speakGuru` modul dengan Web Speech API perangkat, laju 0,70 dan nada 1 (`suaraLaju` dan `suaraNada` di JSON bab). Ucapan dipecah per kalimat supaya tidak berhenti sendiri di Chrome.
- **Wadah sepuluh dan garis angka bergerak.** Bungkus, kantong, dan keranjang berisi sepuluh benda digambar dari data (`WadahSvg`), dan penanda kupu-kupu atau capung meluncur di garis angka (`StripSvg`) mengikuti kalimat yang dibacakan.
- **Tema warna** biru ungu royal, kuning emas, putih.

## Isi video

### Sub-Bab A: Menghitung, Membaca, dan Menulis Bilangan sampai 100

1. **Kue Cubit Pak Ahmad** (Menghitung puluhan sampai seratus): Penjual kue cubit (4); Satu bungkus, satu puluhan (4); Sampai seratus (4).
2. **Rambutan dan Kelereng** (Puluhan dan satuan): Rambutan Halim (4); Kelereng ayah Malosi (4); Dua cara menulis (4).
3. **Tebak Banyak Ikan** (Memperkirakan lalu menghitung): Menebak banyak ikan (3); Kelompok sepuluh (4); Tebakan siapa yang dekat? (4).

### Sub-Bab B: Membandingkan Bilangan

1. **Kupu-kupu dan Capung** (Lebih dari dan kurang dari): Kupu-kupu di bilangan 58 (4); Capung di bilangan 75 (4); Lebih dari dan kurang dari (4).
2. **Kelereng Halim dan Malosi** (Siapa yang lebih banyak?): Lima puluh enam dan enam puluh lima (4); Puluhan yang sama (4); Kata perbandingan (4).
3. **Mengurutkan Bilangan** (Dari yang paling kecil): Tiga bilangan (4); Dari yang paling kecil (4); Teka-teki Kira (4).

## Berkas

- Mesin: `src/components/modul/video-cerita.tsx` (tidak berubah).
- Gambar bersama: `src/components/modul/video-k2b7-umum.tsx` (wadah berisi sepuluh benda, garis angka kotak, papan nilai tempat, ikan bertebaran).
- Adegan: `video-k2b7a.tsx` dan `video-k2b7b.tsx`.
- Pemasangan: `MODUL_SUBBAB` di `src/components/IgilModulePlayer.tsx`, kunci `mtk-2-bab7-A` dan `-B`, bidang `Cerita`.
- Uji: `scripts/uji-data-k2b7.mjs` dan `scripts/uji-statis-k2b7.mjs`.

