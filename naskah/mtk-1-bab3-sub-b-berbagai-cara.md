# Matematika Kelas 1 · Bab 3 · Sub-Bab B: Berbagai Cara Melakukan Pengurangan

Sumber: Buku Siswa Matematika SD/MI Kelas I (Kemendikbudristek 2022), Bab 3, hlm. 82-99. Naskah ini ditulis ulang dari buku dan diperkaya metode dari luar buku. Struktur bab dan aturan kunci jawaban sama dengan `mtk-1-bab3-sub-a-cerita-pengurangan.md`.

Semua tahap berjalan di peramban siswa. Tidak ada panggilan API saat belajar. Suara Guru memakai suara yang dipilih siswa di Pilih Guru. Kunci jawaban hanya ada di `src/content-master/kelas1-bab3.master.json` (tidak di-commit) dan `supabase/seed/02_kelas1_bab3_keys.sql`. Berkas publik `src/data/kelas1-bab3.json` tidak memuat `correct_index`, `correctAnswer`, maupun `explanation`.

Tokoh: Igil si burung hantu, Upe, Kira, Wei.

Metode yang diadopsi dari luar buku:

- Bagan pasangan (gabungan dan sebagian) dari Matematika Singapura (number bond). Satu bagan melahirkan dua kalimat pengurangan.
- Menghitung mundur pada garis bilangan sebagai strategi "count back" untuk pengurangan kecil.
- Pasangan sepuluh dan bingkai sepuluh (ten frame) untuk pengurangan dari 10.
- Concrete, Pictorial, Abstract dari Jerome Bruner. Concrete memakai benda, Picture hanya diagram (aturan di `.cursor/rules/batas-concrete-pictorial.mdc`).
- Memeriksa jawaban dengan menggabung kembali sebagian dan sebagian.

## Tahap 1. Story (6 adegan)

| Kode | Adegan | Kalimat |
|---|---|---|
| B3-S1 | Telur utuh, telur pecah | `6 − 2 = 4` |
| B3-S2 | Balon merah dan kuning, bagan pasangan | `7 − 5 = 2` |
| B3-S3 | Mobil tanpa penumpang | `3 − 3 = 0`, `3 − 0 = 3` |
| B3-S4 | Igil melompat mundur tiga kali | `3 − 2 = 1` |
| B3-S5 | Lompat mundur lima kali pada garis bilangan | `5 − 3 = 2` |
| B3-S6 | Sepuluh bola, pasangan sepuluh | `10 − 7 = 3`, `10 − 3 = 7` |

## Tahap 2. Mind-Map (6 langkah)

1. Pisahkan gabungan. 2. Gambar bagan pasangan. 3. Satu bagan, dua pengurangan. 4. Hitung mundur. 5. Nol dan bilangan yang sama. 6. Pengurangan dari 10.

## Tahap 3. Infografis (8 poster, tanpa soal)

Pasangan bilangan, satu bagan dua pengurangan, menghitung mundur, tiga langkah mundur, nol dan bilangan yang sama, pengurangan dari 10, pasangan sepuluh, tiga cara mengurangkan.

## Tahap 4. Concrete (4 permainan, benda nyata)

1. Telur Utuh, Telur Pecah: ketuk telur untuk memecahkan, hitung yang utuh. Ronde `6 − 2` dan `8 − 3 = 5` (jawab dengan suara).
2. Balon ke Dua Keranjang: seret balon merah dan kuning ke keranjang masing-masing. Ronde `7 − 5` dan `9 − 6 = 3` (jawab dengan suara).
3. Lompat Mundur di Batu: anak melompat mundur pada batu bernomor. Ronde `3 − 2` (Upe), `5 − 3` (Kira), `7 − 4 = 3` (Wei).
4. Kantong Sepuluh Bola: ambil bola merah dari kantong, hitung yang tinggal. Ronde `10 − 7`, `10 − 0 = 10` (kantong penuh), `10 − 4 = 6`.

## Tahap 5. Picture (3 permainan, diagram saja)

5. Bagan Pasangan: Cari Sebagian: gabungan dan satu sebagian diketahui, pilih sebagian yang hilang. Ronde `6/4/2`, `7/2/5`, `3/3/0`, `8/5/3` (sebagian pertama hilang).
6. Garis Bilangan: Lompat ke Belakang: ketuk angka satu langkah ke kiri, berulang. Ronde `5 − 1`, `6 − 3`, `9 − 4 = 5`.
7. Bingkai Sepuluh: Warnai yang Kosong: titik merah menunjukkan yang ada, warnai petak kosong sampai penuh. Ronde terisi `6`, `4`, `9`, jawaban akhir `10 − 9 = 1`.

## Tahap 6. Abstract (3 permainan)

8. Dua Kalimat dari Satu Bagan: pilih dua kartu kalimat yang benar dari empat. Ronde `6-4-2`, `7-5-2`, `3-3-0`, `10-7-3`. Pada `3-3-0` kartu pengecoh adalah `3 − 3 = 1` dan `3 − 0 = 0` (tidak ada kartu ganda).
9. Hitung Mundur Berantai: pilih angka yang tepat satu lebih kecil, lagi dan lagi. Ronde `5 − 2`, `8 − 3`, `10 − 4 = 6`.
10. Kanvas Guratan dan Suara: ronde 1 `10 − 6 = 4`, ronde 2 Ayo Mencoba (anak memilih `a` 1 sampai 10 dan `b` 0 sampai `a`, lalu mengucapkan hasilnya dan menggurat angkanya).

Penutup: Poin Penting (enam kartu bersuara termasuk pasangan sepuluh) dan Catatanku.

## Latihan dan Ujian

Sub-Bab A dan B memakai satu bank soal bab (Latihan 10 soal, 30 Poin Kualifikasi; Ujian 10 soal, 70 Poin Kualifikasi, wajib 100%). Latihan 5 dan 6 serta Ujian 3, 6, dan 7 menggunakan bagan pasangan dan menghitung mundur dari Sub-Bab B. Sub-Bab C dan D masih "segera hadir" dan tidak menahan Latihan dan Ujian.
