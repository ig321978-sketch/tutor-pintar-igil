# Video Story Kelas 6 Bab 3 Kubus dan Balok (Sub-Bab A, B, C): mesin Story baru

Tiap sub-bab memuat **dua video terpisah**: **Video Materi Kurikulum** (isi Buku Siswa, dilengkapi Buku Panduan Guru) dan **Video Metode Luar**. Mesin sama dengan Bab 4 (`story/logika-story.ts` dan `story/mesin-story.tsx`, lihat `naskah/story-video-k6b4a.md`). Gambar dirancang khusus tiap sub-bab dan tidak dipakai bab lain: `story/k6b3a-*`, `k6b3b-*`, `k6b3c-*`. Pembungkus: `video-k6b3a.tsx`, `video-k6b3b.tsx`, `video-k6b3c.tsx`.

Uji (masing-masing memeriksa pemicu kata, sinkron angka suara dan gambar, perubahan gambar tiap ketukan, keunikan gambar akhir adegan, batas kanvas, pemisahan materi dan metode luar, kutipan buku terhadap teks PDF, hitungan mandiri, emoji paling tinggi Emoji 12, kemurnian berkas):
- `node --no-warnings scripts/uji-story-k6b3a.mjs`
- `node --no-warnings scripts/uji-story-k6b3b.mjs`
- `node --no-warnings scripts/uji-story-k6b3c.mjs`

Halaman buku = halaman PDF dikurangi 14. Bab 3 ada di hlm. 76–98 (PDF 90–112); Sub-Bab A hlm. 80–85, Sub-Bab B hlm. 85–90, Sub-Bab C hlm. 91–98. Pembuka bab (hlm. 76–79) masuk Video Materi Sub-Bab A.

## Sub-Bab A (Mengonstruksi dan Mengurai) dan pembuka bab
- Video Materi (7 adegan, sekitar 7 menit suara): Tigor, Tenri, Fort Rotterdam dan petak C2; tujuan, pertanyaan pemantik, peta konsep, mengingat kembali; perpustakaan kontainer; Eksplorasi 3.1 dua dan tiga kubus (bentuk lurus dan siku); dua balok dan pembahasan; Latihan 3.1 nomor 1 sampai 4; soal tantangan Pak Hasan dan refleksi.
- Video Metode Luar (8 adegan, sekitar 6 menit): Layer Counting (konsep dan penerapan), Hidden Support Rule, Rotational Equivalence Check, Minimal Footprint Packing (konsep dan tiga cara menegakkan kardus), ringkasan.

## Sub-Bab B (Visualisasi Spasial)
- Video Materi (7 adegan, sekitar 7 menit): arsitek dan gambar tampak, Eksplorasi 3.2 gambar Anike (tampak depan berbentuk T, kanan 2 tinggi, atas 3 melebar, 4 kubus), menggambar, bertukar dan merekonstruksi, pembahasan dan perspektif, Latihan 3.2, dadu (sisi berlawanan berjumlah 7), Uji Kompetensi dan refleksi.
- Video Metode Luar (6 adegan, sekitar 6 menit): Orthographic Projection, Height-Matrix Silhouette, Occlusion Max Rule, Reconstruction from Views, ringkasan.

## Sub-Bab C (Lokasi)
- Video Materi (8 adegan, sekitar 9 menit): petak C2 di peta, Eksplorasi 3.3 (garis bernama huruf dan bilangan), permainan tiga segaris, Latihan 3.3, Eksplorasi 3.4 pesan berantai, pembahasan P ke Q, Latihan 3.4 (kubus direbahkan 3 kali), refleksi, Uji Kompetensi dan Pengayaan (35 cara).
- Video Metode Luar (10 adegan, sekitar 9 menit): Grid Reference Pair, Manhattan Distance, Monotone Lattice Path, Pascal Counting Recurrence (tiap metode dengan konsep dan penerapan), ringkasan.

## Catatan temuan buku
- Naskah lama menulis Bab 3 di hlm. 89–112. Halaman buku yang benar hlm. 76–98 (PDF 90–112). Video baru memakai nomor yang benar.
- Latihan 3.1 nomor 5 (Pak Hasan): Buku Panduan Guru menyuruh rusuk terpanjang menjadi sisi tegak agar lantai sekecil mungkin. Hasil 3.000 cm persegi (0,3 meter persegi) benar, tetapi tiga cara menegakkan kardus (rusuk 20, 30, atau 50) sama-sama menghasilkan 3.000 cm persegi karena 300 habis dibagi 20, 30, dan 50. Video metode luar menjelaskannya.
- Latihan 3.1 nomor 3 (8 kardus): gambar di video dibuat ulang sebagai 6 kubus terlihat dan 2 kubus penyangga tersembunyi (sesuai kunci Buku Panduan Guru); jumlah mengikuti kunci, bentuk gambar bukan salinan gambar buku. Nomor 2 dan nomor 4 juga digambar ulang sesuai jumlah pada kunci.
- Peta pembuka (hlm. 76) memberi nama petak (C2), sedangkan Eksplorasi 3.3 memberi nama garis. Video materi Sub-Bab C menjelaskan keduanya; Buku Panduan Guru menegaskan yang bernama adalah garis.
- Uji Kompetensi nomor 2 (hlm. 97): kunci Buku Panduan Guru menyebut sisi 5 dan 1 tetapi gambar buku berupa dadu bergambar segitiga, persegi, dan lingkaran; video memakai gambar buku. Latihan 3.2 nomor 3 sampai 5 (gambar isometrik) tidak dipakai karena gambar buku kosong dan kunci berupa gambar.
- Latihan 3.4 nomor 3c: jawaban bergantung jalur, tanpa hitungan pasti. Latihan 3.3 nomor 3 (kubus (C,0), bola (E,1), kerucut (D,2)) memakai kunci Buku Panduan Guru tanpa verifikasi gambar isometrik. Uji Kompetensi nomor 3: "persis di belakang" ditafsirkan satu baris, cocok dengan kunci (D,4).
- Naskah video lama dihapus: `videos` pada `SUB_A63`, `SUB_B63`, `SUB_C63` (kini `[]`), `videos` dan `stories` pada `kelas6-bab3.json`, cabang `k6b3` di `video-visual-k6.tsx`. Bila generator `src/content-master/buat-k6-bab3.mjs` dijalankan lagi, isinya akan kembali dan harus dibuang lagi.
