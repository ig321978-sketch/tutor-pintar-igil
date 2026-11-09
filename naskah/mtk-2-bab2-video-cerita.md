# Video cerita Kelas 2 Bab 2 (Tahap 1: Story)

Status: aktif untuk Sub-Bab A, B, dan C. Video animasi HTML/SVG **menggantikan sistem slide** di Tahap 1 Story. Daftar isi tiap sub-bab dan kalimatnya ada di naskah per sub-bab.

## Prinsip

- **Putar satu per satu saat diketuk.** `DaftarVideoCerita` (`src/components/modul/video-k2b2-umum.tsx`) menampilkan tiga kartu video. Tidak ada video yang berjalan sendiri saat halaman dibuka. Mengetuk ▶ Putar memasang pemutar `VideoCerita` dengan `mulaiLangsung`. Hanya satu video yang terpasang pada satu waktu. Memutar video lain menggantikan yang sedang berjalan dan menghentikan suaranya.
- **Gratis dan tanpa API.** Gambar bergerak memakai SVG dan CSS di perangkat siswa. Tidak ada berkas video dan tidak ada layanan berbayar.
- **Naskah satu sumber.** Kalimat tiap adegan dan papan judul ada di `src/components/modul/naskah-k2b2.ts`. Mengubah kalimat di sana mengubah suara, teks layar, naskah markdown, dan JSON bab sekaligus.
- **Suara.** `speakGuru` modul dengan Web Speech API perangkat, laju 0,70 dan nada 1 (`suaraLaju` dan `suaraNada` di JSON bab). Ucapan dipecah per kalimat supaya tidak berhenti sendiri di Chrome.
- **Tema warna** biru ungu royal, kuning emas, putih.

## Isi video

### Sub-Bab A: Berbagai Cara Melakukan Penjumlahan

1. **Panen Jambu Air** (Cerita Tika dan Kira): Pohon jambu di halaman Tika (4); Tika dan Kira memetik (4); Dua pertanyaan (7).
2. **Tiga Cara Menjumlahkan 12 + 6** (Maju, bersusun, dan pasangan bilangan): Cara 1: Menghitung maju (6); Cara 2: Penjumlahan bersusun (7); Cara 3: Pasangan bilangan (6).
3. **Sepuluh Satuan Pindah ke Puluhan** (18 ditambah 2): Kira memetik dua lagi (4); Pasangan bilangan dan pindah (8); Ingat: pindah sepuluh (3).

### Sub-Bab B: Berbagai Cara Melakukan Pengurangan

1. **Selisih Jambu Air** (Jambu Tika dan Kira dipasangkan): Jambu Tika dan Kira (6); Menemukan jawaban dengan mengurangkan (4).
2. **Tiga Cara Mengurangkan 18 − 12** (Mundur, bersusun, dan pasangan bilangan): Cara 1: Menghitung mundur (5); Cara 2: Pengurangan bersusun (6); Cara 3: Pasangan bilangan (6).
3. **Urai Satu Puluhan: 12 − 8** (Saat satuan tidak cukup): Tika memberi jambu (4); Urai dan kurangi (6); Periksa dengan penjumlahan (3).

### Sub-Bab C: Soal Cerita Penjumlahan dan Pengurangan

1. **Kata Kunci Soal Cerita** (Burung hijau dan burung merah): Burung hijau dan burung merah (7); Empat kata kunci (4).
2. **Donat Tika dan Malosi** (Diketahui, ditanya, solusi, kesimpulan): Donat di meja (4); Diketahui dan ditanya (4); Solusi dan kesimpulan (4).
3. **Jeruk Halim dan Boneka Tiga Sahabat** (Bilangan awal dan tiga bilangan): Keranjang jeruk Halim (6); Boneka tiga sahabat (6); Soal cerita buatan sendiri (4).

## Berkas

- Mesin: `src/components/modul/video-cerita.tsx` (mendapat `mulaiLangsung` dan `onSelesai`, bawaan tidak berubah untuk modul lain).
- Daftar dan gambar bersama: `src/components/modul/video-k2b2-umum.tsx` (jambu air, burung, donat, jeruk, boneka, jalur kotak, tabel susun, bagan pasangan).
- Adegan: `video-k2b2a.tsx`, `video-k2b2b.tsx`, `video-k2b2c.tsx`.
- Pemasangan: `MODUL_SUBBAB` di `src/components/IgilModulePlayer.tsx`, kunci `mtk-2-bab2-A`, `-B`, `-C`, bidang `Cerita`.
- Uji: `scripts/uji-data-k2b2.mjs` dan `scripts/uji-statis-k2b2.mjs`.

