# Video cerita Kelas 2 Bab 5 (Tahap 1: Story)

Status: aktif untuk Sub-Bab A, B, dan C. Video animasi HTML/SVG **menggantikan sistem slide** di Tahap 1 Story. Daftar isi tiap sub-bab dan kalimatnya ada di naskah per sub-bab.

## Prinsip

- **Putar satu per satu saat diketuk.** `DaftarVideoCerita` (`src/components/modul/video-k2b2-umum.tsx`, dipakai bersama) menampilkan tiga kartu video. Tidak ada video yang berjalan sendiri saat halaman dibuka. Mengetuk ▶ Putar memasang pemutar `VideoCerita` dengan `mulaiLangsung`. Hanya satu video yang terpasang pada satu waktu. Memutar video lain menggantikan yang sedang berjalan dan menghentikan suaranya.
- **Gratis dan tanpa API.** Gambar bergerak memakai SVG dan CSS di perangkat siswa. Tidak ada berkas video dan tidak ada layanan berbayar.
- **Naskah satu sumber.** Kalimat tiap adegan dan papan judul ada di `src/components/modul/naskah-k2b5.ts`. Mengubah kalimat di sana mengubah suara, teks layar, naskah markdown, dan JSON bab sekaligus.
- **Suara.** `speakGuru` modul dengan Web Speech API perangkat, laju 0,70 dan nada 1 (`suaraLaju` dan `suaraNada` di JSON bab). Ucapan dipecah per kalimat supaya tidak berhenti sendiri di Chrome.
- **Gambar dibangkitkan dari data.** Benda yang dipotong dan bangun yang dilipat digambar dari koordinat di `data-k2b5.ts`, sehingga gambar di video sama dengan yang diperiksa mesin permainan.
- **Tema warna** biru ungu royal, kuning emas, putih.

## Isi video

### Sub-Bab A: Setengah dari Benda Utuh

1. **Berbagi Martabak** (Adil dan sama besar): Oleh-oleh martabak (4); Pesan Ibu (3); Bagaimana memotongnya? (3).
2. **Apa Itu Setengah?** (Dua bagian sama besar): Memotong menjadi dua (4); Setengah di sekitar kita (5); Ayo melipat kertas (4).
3. **Sama Besar atau Tidak?** (Hanya yang sama besar adalah setengah): Memotong lingkaran (3); Memotong segi empat (3); Gambar A dan gambar B (4).

### Sub-Bab B: Setengah dari Kumpulan Benda

1. **Kelereng Malosi** (Bagi sama banyak): Malosi dan Upe bermain (4); Membagi bergantian (4); Jadi, setengahnya (3).
2. **Ikan di Akuarium** (Setengah dan bukan setengah): Halim dan enam ikan (3); Setengah dari 6 ikan (3); Bukan setengah (4).
3. **Ayo Berbagi Lagi** (Pola setengah): Delapan pensil Tika (3); Mencari pola (4); Kalau banyaknya ganjil (4).

### Sub-Bab C: Seperempat dari Benda Utuh

1. **Martabak untuk Empat Sahabat** (Empat bagian sama besar): Kira ingin berbagi (4); Memotong menjadi empat (3); Seperempat (3).
2. **Utuh, Setengah, Seperempat** (Potong dua kali): Apel yang dipotong (3); Dua kali memotong (4); Seperempat di sekitar (4).
3. **Melipat dan Berkarya** (Seperempat dengan kertas): Lipat menjadi empat (3); Banyak cara (4); Ayo Berkarya (4).

## Berkas

- Mesin: `src/components/modul/video-cerita.tsx` (tidak berubah).
- Gambar bersama: `src/components/modul/video-k2b5-umum.tsx` (benda yang dipotong, benda satuan, bangun berbagi bagian, pisau aman, gelang kelompok, gelas, sendok).
- Adegan: `video-k2b5a.tsx`, `video-k2b5b.tsx`, `video-k2b5c.tsx`.
- Pemasangan: `MODUL_SUBBAB` di `src/components/IgilModulePlayer.tsx`, kunci `mtk-2-bab5-A`, `-B`, `-C`, bidang `Cerita`.
- Uji: `scripts/uji-data-k2b5.mjs` dan `scripts/uji-statis-k2b5.mjs`.

