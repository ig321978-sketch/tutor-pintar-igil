# Video cerita Kelas 2 Bab 3 (Tahap 1: Story)

Status: aktif untuk Sub-Bab A, B, dan C. Video animasi HTML/SVG **menggantikan sistem slide** di Tahap 1 Story. Daftar isi tiap sub-bab dan kalimatnya ada di naskah per sub-bab.

## Prinsip

- **Putar satu per satu saat diketuk.** `DaftarVideoCerita` (`src/components/modul/video-k2b2-umum.tsx`, dipakai bersama) menampilkan tiga kartu video. Tidak ada video yang berjalan sendiri saat halaman dibuka. Mengetuk ▶ Putar memasang pemutar `VideoCerita` dengan `mulaiLangsung`. Hanya satu video yang terpasang pada satu waktu. Memutar video lain menggantikan yang sedang berjalan dan menghentikan suaranya.
- **Gratis dan tanpa API.** Gambar bergerak memakai SVG dan CSS di perangkat siswa. Tidak ada berkas video dan tidak ada layanan berbayar.
- **Naskah satu sumber.** Kalimat tiap adegan dan papan judul ada di `src/components/modul/naskah-k2b3.ts`. Mengubah kalimat di sana mengubah suara, teks layar, naskah markdown, dan JSON bab sekaligus.
- **Suara.** `speakGuru` modul dengan Web Speech API perangkat, laju 0,70 dan nada 1 (`suaraLaju` dan `suaraNada` di JSON bab). Ucapan dipecah per kalimat supaya tidak berhenti sendiri di Chrome.
- **Gambar dibangkitkan dari data.** Bangun terurai, keping tangram, dan bentuk gabungan digambar dari koordinat di `data-k2b3.ts`, sehingga gambar di video sama dengan yang diperiksa mesin permainan.
- **Tema warna** biru ungu royal, kuning emas, putih.

## Isi video

### Sub-Bab A: Bangun Datar

1. **Sarang Lebah Upe** (Bentuk segi enam yang unik): Paman membawa madu (4); Permukaan segi enam (4); Ayo cari bentuk (3).
2. **Segi Banyak dan Bentuk Lengkung** (Lihat tepinya): Tiga bentuk dasar (4); Garis lurus dan sisi (4); Kurva dan bentuk lengkung (4).
3. **Menamai Segi Banyak** (Banyak sisi menentukan nama): Hitung sisinya (4); Segi lima dan segi enam (5); Lingkaran (4).

### Sub-Bab B: Mengurai dan Menyusun Bangun Datar

1. **Mengurai Bangun Datar** (Satu bangun menjadi banyak bagian): Satu bangun, banyak bagian (4); Dua segitiga dan satu segi empat (4); Cara memengaruhi hasil (4).
2. **Menyusun Bangun Datar** (Banyak bangun menjadi satu): Beberapa bangun jadi satu (4); Dua segitiga dan satu segi empat (4); Cara memengaruhi hasil (4).
3. **Bermain Tangram** (Tujuh keping, seribu bentuk): Mengenal tangram (4); Aturan main (4); Mengurai dan menyusun berkaitan (4).

### Sub-Bab C: Bangun Ruang

1. **Bangun Datar dan Bangun Ruang** (Apa bedanya?): Benda di sekitar kita (4); Bangun datar (4); Bangun ruang (4).
2. **Menggelinding atau Tidak?** (Permukaan datar dan lengkung): Gelindingkan benda (4); Permukaan lengkung dan datar (4); Mengapa? (4).
3. **Lima Bangun Ruang** (Kubus, balok, tabung, kerucut, bola): Kubus dan balok (4); Tabung, kerucut, dan bola (4); Cari bangun ruang (4).

## Berkas

- Mesin: `src/components/modul/video-cerita.tsx` (tidak berubah).
- Gambar bersama: `src/components/modul/video-k2b3-umum.tsx` (bentuk, benda datar dan ruang, bangun terurai, tangram, sarang lebah, kaca pembesar, panah).
- Adegan: `video-k2b3a.tsx`, `video-k2b3b.tsx`, `video-k2b3c.tsx`.
- Pemasangan: `MODUL_SUBBAB` di `src/components/IgilModulePlayer.tsx`, kunci `mtk-2-bab3-A`, `-B`, `-C`, bidang `Cerita`.
- Uji: `scripts/uji-data-k2b3.mjs` dan `scripts/uji-statis-k2b3.mjs`.

