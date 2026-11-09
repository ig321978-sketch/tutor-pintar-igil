# Video cerita Kelas 2 Bab 4 (Tahap 1: Story)

Status: aktif untuk Sub-Bab A, B, dan C. Video animasi HTML/SVG **menggantikan sistem slide** di Tahap 1 Story. Daftar isi tiap sub-bab dan kalimatnya ada di naskah per sub-bab.

## Prinsip

- **Satu layar seperti Kelas 2 Bab 1.** `VideoCeritaSatuLayar` (`src/components/modul/video-k2b2-umum.tsx`, dipakai bersama) memasang satu pemutar `VideoCerita` per sub-bab dengan layar judul dan tombol ▶ Mulai, nomor adegan, Jeda, Ulang, dan Suara. Ketiga cerita disusun berurutan sebagai satu rangkaian adegan bernomor. Tidak ada adegan yang berjalan sendiri saat halaman dibuka. Video baru berjalan setelah siswa mengetuk Mulai.
- **Gratis dan tanpa API.** Gambar bergerak memakai SVG dan CSS di perangkat siswa. Tidak ada berkas video dan tidak ada layanan berbayar.
- **Naskah satu sumber.** Kalimat tiap adegan dan papan judul ada di `src/components/modul/naskah-k2b4.ts`. Mengubah kalimat di sana mengubah suara, teks layar, naskah markdown, dan JSON bab sekaligus.
- **Suara.** `speakGuru` modul dengan Web Speech API perangkat, laju 0,70 dan nada 1 (`suaraLaju` dan `suaraNada` di JSON bab). Ucapan dipecah per kalimat supaya tidak berhenti sendiri di Chrome.
- **Gambar dibangkitkan dari data.** Benda dan bangun digambar dari koordinat di `data-k2b4.ts`, sehingga gambar di video sama dengan yang diperiksa mesin permainan.
- **Tema warna** biru ungu royal, kuning emas, putih.

## Isi video

### Sub-Bab A: Posisi Benda

1. **Waktu Panen Telah Tiba** (Kira dan teman membantu Paman): Ke sawah bersama Paman (3); Padi dan nasi (4); Siapa di sebelah mana? (4).
2. **Atas, Bawah, Depan, Belakang** (Posisi benda di sekitar kita): Kupu-kupu dan bunga (3); Burung dan ulat (3); Kata yang berlawanan (4).
3. **Kanan dan Kiri** (Sesuai posisi pembaca): Burung dan rumput (3); Anak yang membelakangi kita (4); Ayo bermain petunjuk (4).

### Sub-Bab B: Pola

1. **Enam Sekawan Memanen** (Hal yang berulang dan teratur): Berbaris di sawah (3); Laki-laki dan perempuan (4); Mencari pola (3).
2. **Pola Bentuk dan Pola Warna** (Pola di taplak meja dan kaus): Taplak meja (3); Kaus dan gelas (3); Pola atau bukan? (4).
3. **Pola Gerakan dan Pola Suara** (Bergerak dan bertepuk tangan): Gerakan berpola (3); Tepuk tangan (3); Pola di sekitar kita (4).

## Berkas

- Mesin: `src/components/modul/video-cerita.tsx` (sama dengan yang dipakai Kelas 2 Bab 1).
- Pemutar satu layar: `VideoCeritaSatuLayar` di `src/components/modul/video-k2b2-umum.tsx` (dipakai bersama).
- Gambar bersama: `src/components/modul/video-k2b4-umum.tsx` (orang dengan caping, benda dari perpustakaan benda, padi, mangkuk nasi, baris unsur pola, panah, tanda benar-salah).
- Adegan: `video-k2b4a.tsx`, `video-k2b4b.tsx`, `video-k2b4c.tsx`.
- Pemasangan: `MODUL_SUBBAB` di `src/components/IgilModulePlayer.tsx`, kunci `mtk-2-bab4-A`, `-B`, `-C`, bidang `Cerita`.
- Uji: `scripts/uji-data-k2b4.mjs` dan `scripts/uji-statis-k2b4.mjs`.

