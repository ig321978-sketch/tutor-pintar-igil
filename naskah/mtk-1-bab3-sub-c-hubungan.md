# Matematika Kelas 1 · Bab 3 · Sub-Bab C: Hubungan Penjumlahan dan Pengurangan

Sumber: Buku Siswa Matematika SD/MI Kelas I (Kemendikbudristek 2022), Bab 3, hlm. 101-105. Naskah ini ditulis ulang dari buku dan diperkaya metode dari luar buku. Struktur bab dan aturan kunci jawaban sama dengan `mtk-1-bab3-sub-a-cerita-pengurangan.md` dan `mtk-1-bab3-sub-b-berbagai-cara.md`.

Semua tahap berjalan di peramban siswa. Tidak ada panggilan API saat belajar. Suara Guru memakai suara yang dipilih siswa di Pilih Guru. Kunci jawaban hanya ada di `src/content-master/kelas1-bab3.master.json` (tidak di-commit) dan `supabase/seed/02_kelas1_bab3_keys.sql`. Berkas publik `src/data/kelas1-bab3.json` tidak memuat `correct_index`, `correctAnswer`, maupun `explanation`.

Tokoh: Igil si burung hantu, Wei, Tika, dan anak-anak dalam buku.

Metode yang diadopsi dari luar buku:

- Segitiga fakta (fact triangle) dan keluarga fakta (fact family) dari Matematika Singapura dan Everyday Mathematics. Tiga bilangan di satu segitiga melahirkan dua penjumlahan dan dua pengurangan.
- Operasi kebalikan (inverse operation). Pengurangan membatalkan penjumlahan, sehingga jawaban bisa diperiksa dengan operasi lawannya.
- Sifat tukar tempat pada penjumlahan (komutatif), dan perbedaannya dengan pengurangan yang tidak boleh ditukar.
- Mencari bilangan yang hilang (missing number) dengan operasi kebalikan.
- Concrete, Pictorial, Abstract dari Jerome Bruner. Concrete memakai benda, Picture hanya diagram (aturan di `.cursor/rules/batas-concrete-pictorial.mdc`).

## Tahap 1. Story (6 adegan)

| Kode | Adegan | Kalimat |
|---|---|---|
| C3-S1 | Kelinci cokelat dan hitam digabung | `4 + 3 = 7`, `3 + 4 = 7` |
| C3-S2 | Kelinci hitam atau cokelat pergi | `7 − 3 = 4`, `7 − 4 = 3` |
| C3-S3 | Kaos kuning dan merah muda di jemuran | `3 + 2 = 5`, `5 − 2 = 3`, `5 − 3 = 2` |
| C3-S4 | Kepik terbang dari daun | `3 + 1 = 4`, `4 − 1 = 3` |
| C3-S5 | Papan tulis Wei, bilangan hilang | `6 + ? = 9`, `9 − 6 = 3` |
| C3-S6 | Tika, teman, dan sepeda | `6 + 2 = 8`, `8 − 2 = 6` |

## Tahap 2. Mind-Map (6 langkah)

1. Gabungkan dua kelompok. 2. Tukar tempat. 3. Pisahkan salah satu. 4. Dua kalimat pengurangan. 5. Kebalikan. 6. Periksa dan cari yang hilang.

## Tahap 3. Infografis (8 poster, tanpa soal)

Keluarga bilangan, dua tambah dua kurang, kebalikan (garis bilangan pergi dan pulang), tukar tempat, periksa dengan kebalikan, cari yang hilang, pilih tanda, ayo mencoba bersama teman. Ditutup kartu INGAT.

## Tahap 4. Concrete (4 permainan, benda nyata)

1. Kelinci Masuk Kandang: ketuk kelinci masuk kandang, tukar tempat dua kelompok, lihat jumlahnya tetap. Ronde `4 + 3` dan `5 + 3 = 8` (jawab dengan suara).
2. Kaos Diambil dan Dikembalikan: ambil kaos merah muda dari tali, hitung yang tinggal, lalu gantung kembali dan periksa dengan penjumlahan. Ronde `5 − 2` dan `8 − 3`, jawaban akhir 8.
3. Seret Kartu ke Kandang: seret empat kartu ke dua kandang penjumlahan dan dua kandang pengurangan. Ronde `4, 3, 7` dan `5, 3, 8` (satu kartu `8 − 3 = ?`, jawab 5 dengan suara).
4. Gelas Penutup: sebagian kelereng tertutup gelas. Hitung yang terlihat, pakai kebalikan, lalu angkat gelas. Ronde `8, 5`, `6, 2`, `9, 4`, jawaban akhir 5.

## Tahap 5. Picture (3 permainan, diagram saja)

5. Segitiga Keluarga: isi sudut kosong segitiga (puncak = gabungan). Empat ronde: `7`, `5/3/8` (sebagian hilang), `6/3/9` (sebagian hilang), `6 + 4 = 10`. Pada ronde akhir anak memilih puncak, lalu mengucapkan `10 − 4 = 6`.
6. Garis Bilangan: Pergi dan Pulang: maju sejumlah langkah, lalu mundur sama banyak. Ronde mulai 4 maju 3, mulai 2 maju 5, mulai 5 maju 4. Jawaban akhir `9 − 4 = 5`.
7. Tabel Empat Kalimat: isi sel kosong tabel dua penjumlahan dan dua pengurangan. Ronde `4, 3, 7`, `6, 3, 9`, `2, 6, 8` (jawab `8 − 6 = 2` dengan suara).

## Tahap 6. Abstract (3 permainan)

8. Lingkari Hasil yang Sama: lingkari semua kartu operasi yang hasilnya sama dengan target. Ronde target 5, 4, dan 8. Jawaban akhir: banyak kartu yang dilingkari (4).
9. Cari yang Hilang (papan tulis Wei): satu bilangan hilang pada kalimat tambah atau kurang, dicari dengan operasi kebalikan. Enam ronde: `2 + 6`, `? + 4 = 10`, `6 + ? = 9`, `9 − ? = 7`, `? − 5 = 2`, `3 + ? = 8`. Ronde akhir dijawab dengan suara (5).
10. Tanda dan Susun Kalimat: ronde 1 memilih tanda `+` atau `−` untuk empat kalimat; ronde 2 sampai 4 menyusun ubin angka dan tanda menjadi kalimat benar. Ronde akhir `9 − 6 = ?`, jawaban 3.

Penutup: Poin Penting (enam kartu bersuara: keluarga empat kalimat, tukar tempat, kebalikan, periksa jawaban, cari yang hilang, pilih tanda) dan Catatanku.

## Latihan dan Ujian

Satu bank soal bab (Latihan 10 soal, 30 Poin Kualifikasi; Ujian 10 soal, 70 Poin Kualifikasi, wajib 100%). Soal bagian Sub-Bab C:

- Latihan 7: `4 + 3 = 7`, kalimat pengurangan yang berhubungan (`7 − 3 = 4`).
- Latihan 9: `6 + ... = 9` (jawaban 3, dicari dengan `9 − 6`).
- Ujian 4: tanda yang tepat untuk `7 ○ 2 = 9` (`+`).
- Ujian 7: `... + 4 = 9` (jawaban 5).

Sub-Bab D (Soal Cerita Pengurangan) masih "segera hadir" dan tidak menahan Latihan dan Ujian.
