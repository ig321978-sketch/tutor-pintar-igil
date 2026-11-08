# Matematika Kelas 1 · Bab 3 · Sub-Bab D: Soal Cerita Pengurangan

Sumber: Buku Siswa Matematika SD/MI Kelas I (Kemendikbudristek 2022), Bab 3, bagian soal cerita pengurangan (lembar PDF 118–120 dan 125–126 pada berkas `bahan-sd/Matematika-BS-KLS-I.pdf`). Naskah ini ditulis ulang dari buku dan diperkaya metode dari luar buku. Struktur bab dan aturan kunci jawaban sama dengan Sub-Bab A, B, dan C (`mtk-1-bab3-sub-a-cerita-pengurangan.md`, `mtk-1-bab3-sub-b-berbagai-cara.md`, `mtk-1-bab3-sub-c-hubungan.md`).

Semua tahap berjalan di peramban siswa. Tidak ada panggilan API saat belajar. Suara Guru memakai suara yang dipilih siswa di Pilih Guru. Kunci jawaban hanya ada di `src/content-master/kelas1-bab3.master.json` (tidak di-commit) dan `supabase/seed/02_kelas1_bab3_keys.sql`. Berkas publik `src/data/kelas1-bab3.json` tidak memuat `correct_index`, `correctAnswer`, maupun `explanation`.

Tokoh: Igil si burung hantu, Wei, Tika, Malosi, dan anak-anak dalam buku.

Metode yang diadopsi dari luar buku:

- Model batang (bar model) dari Matematika Singapura. Satu batang utuh dibagi menjadi bagian yang pergi dan bagian yang tersisa. Bagian yang dicari tampil sebagai sel putus-putus bertanda "?".
- Langkah kata kunci bergaya CUBES: lingkari angka, kotaki kata kunci, tulis kalimat matematika, periksa jawaban, tulis kalimat jawaban.
- Jenis cerita (schema): yang dicari bisa hasil akhir, perubahan, atau jumlah mula-mula. Sub-Bab D memakai jenis hasil dan perubahan.
- Pengurangan dua kali, dan cara lain "gabung dulu" (`2 + 4 = 6`, lalu `9 − 6 = 3`).
- Periksa dengan operasi kebalikan (dari Sub-Bab C).
- Concrete, Pictorial, Abstract dari Jerome Bruner. Concrete memakai benda, Picture hanya diagram (aturan di `.cursor/rules/batas-concrete-pictorial.mdc`).

## Tahap 1. Story (6 adegan)

| Kode | Adegan | Kalimat |
|---|---|---|
| D3-S1 | Burung di pohon, sebagian terbang | `8 − 2 = 6` |
| D3-S2 | Kepik di daun, sebagian terbang | `10 − 2 = 8` |
| D3-S3 | Siswa di kelas, sebagian pulang | `7 − 5 = 2` |
| D3-S4 | Bola di dalam kardus, sebagian diambil | `10 − 3 = 7` |
| D3-S5 | Bilangan yang dicari (`10 − ... = 6`) | jawab 4 |
| D3-S6 | Malosi memberi kelereng dua kali | `9 − 2 − 4 = 3` |

## Tahap 2. Mind-Map

Peta pikiran soal cerita pengurangan: baca cerita, lingkari angka, kotaki kata kunci, tulis kalimat, hitung, periksa, tulis kalimat jawaban.

## Tahap 3. Infografis (8 poster, tanpa soal)

Mula-mula, pergi, sisa; kata kunci; lima langkah; model batang; apa yang dicari; kurangi dua kali; kalimat jawaban; ayo berkarya. Ditutup kartu INGAT (kata kunci dan periksa).

## Tahap 4. Concrete (4 permainan, benda nyata)

1. Burung Terbang: ketuk burung yang terbang, hitung yang tinggal. Jawaban akhir 5.
2. Siswa Pergi dari Kelas: ketuk siswa yang pulang, hitung yang masih di kelas. Jawaban akhir 5.
3. Bola ke Dalam Kardus: seret bola ke kardus, hitung yang masuk dan yang tinggal. Jawaban akhir 3.
4. Kelereng untuk Dua Teman: beri kelereng dua kali, hitung sisa. Jawaban akhir 1.

## Tahap 5. Picture (3 permainan, diagram saja)

5. Batang Cerita: warnai bagian batang sesuai cerita, isi bagian yang dicari. Jawaban akhir 5.
6. Jodohkan Cerita dan Batang: jodohkan cerita dengan model batang yang tepat. Jawaban akhir 7.
7. Dua Lompatan Mundur: dua busur mundur pada garis bilangan. Jawaban akhir 1.

## Tahap 6. Abstract (3 permainan)

8. Detektif Kata Kunci: kotaki kata yang menunjukkan pengurangan, lalu pilih kalimat. Jawaban akhir 5.
9. Isi Kotak Penyelesaian: lima ronde mengisi kotak diketahui, kalimat, hasil, dan kalimat jawaban. Ronde akhir dijawab dengan suara (3).
10. Soal Ceritaku: anak memilih topik dan menyusun soal cerita sendiri. Dua ronde, jawaban akhir 7.

Penutup: Poin Penting (enam kartu bersuara) dan Catatanku (tujuh butir).

## Latihan dan Ujian

Satu bank soal bab (Latihan 10 soal, 30 Poin Kualifikasi; Ujian 10 soal, 70 Poin Kualifikasi, wajib 100%). Soal bagian Sub-Bab D:

- Latihan 2: kata kunci yang menunjukkan pengurangan pada cerita burung terbang (`8 − 2 = 6`).
- Ujian 5: Malosi memberi 2 dan 4 kelereng dari 9 kelereng, sisa 3 (`9 − 2 = 7`, `7 − 4 = 3`).

Dengan Sub-Bab D aktif, Latihan terbuka setelah keempat sub-bab (A, B, C, D) selesai.
