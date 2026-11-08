# Matematika Kelas 1 · Bab 4 · Mengenal Bentuk

Sumber: Buku Siswa Matematika SD/MI Kelas I (Kemendikbudristek 2022), Bab 4, Sub-Bab A "Mendeskripsikan Benda Berdasarkan Bentuk" (hlm. 117–126). Naskah ini ditulis ulang dari buku tersebut dan memperkaya isinya dengan metode dari luar buku. Modul lama Bab 4 dipindah ke `/ruang-belajar/mtk-1-bab4-lama` dan tidak dipakai lagi.

Semua tahap berjalan di peramban siswa. Tidak ada panggilan API saat belajar. Suara Guru memakai suara yang dipilih siswa di "Pilih Guru" (Web Speech `id-ID`). Kunci jawaban hanya ada di `src/content-master/kelas1-bab4.master.json` (tidak di-commit) dan `supabase/seed/02_kelas1_bab4_keys.sql`. Berkas publik `src/data/kelas1-bab4.json` tidak memuat `correct_index`, `correctAnswer`, maupun `explanation`.

## 1. Struktur bab

| Sub-bab | Judul | Isi |
|---|---|---|
| A | Mendeskripsikan Bentuk | Tiga bentuk: lengkung, segitiga, segi empat. Sisi dan sudut. Mencari, menamai, dan menghitung ciri benda. |
| B | Mengelompokkan Benda | Segera hadir. |
| C | Menyusun dan Mengurai Bentuk | Segera hadir. |

Sub-Bab A sudah dibuat. Sub-Bab B dan C tampil sebagai "segera hadir" dan dikerjakan satu per satu atas perintah Kapten. Selama itu, Latihan dan Ujian bab ini mencakup Sub-Bab A.

## 2. Sub-Bab A: Mendeskripsikan Benda Berdasarkan Bentuk

Tokoh: Igil si burung hantu dan teman-teman dari buku (Kira, Upe, Wei, Halim, Malosi, Tika).

Isi buku yang dipakai: Piknik Bersama, tiga bentuk, Ayo Mencoba (mencari benda), Ayo Berlatih (menjodohkan bentuk dan nama, menyambung garis putus-putus, melingkari bentuk, adegan kamar), Ayo Bermain (bentuk dari tubuh), dan Tahukah Kalian (kue tradisional: lupis, talam, cucur, bolu lapis).

Metode yang diadopsi dari luar buku:

- Tingkat berpikir geometri van Hiele (tingkat 0 visual dan tingkat 1 analisis). Anak mengenali bentuk dari rupa utuh dulu, lalu menghitung sisi dan sudutnya.
- Memilah menurut ciri dari Montessori dan Dienes. Benda dipilah ke keranjang berdasarkan satu ciri saja.
- Papan paku dan karet gelang dari Gattegno dan Froebel untuk merasakan sisi lurus dan sudut.
- Pencapaian konsep (concept attainment). Anak melihat contoh dan bukan contoh, lalu menebak aturannya (Detektif Bentuk Misterius).
- Berburu bentuk ("I Spy") di benda sekitar.
- Menjejak dan menggurat angka dengan jari.
- Concrete, Pictorial, Abstract dari Jerome Bruner.

Pegangan bahasa: bentuk lengkung tidak punya sisi lurus dan sudut. Segitiga punya 3 sisi lurus dan 3 sudut. Segi empat punya 4 sisi lurus dan 4 sudut. Bentuk tetap sama walau diputar, dibalik, atau berbeda ukuran. Irisan semangka dalam gambar buku dihitung segitiga.

### Tahap 1. Story
Enam adegan bergambar: piknik bersama, papan tulis Igil, bentuk lengkung, segitiga, segi empat, dan bermain bentuk dengan tubuh. Setiap adegan punya narasi panjang yang dibacakan Suara Guru.

### Tahap 2. Mind-Map
Enam langkah: amati bendanya, rasakan tepinya, hitung sisi dan sudut, beri nama bentuknya, kelompokkan, cek dari posisi lain.

### Tahap 3. Infografis
Sembilan poster untuk dibaca dan didengar, tanpa soal: bentuk benda, tiga bentuk di sekitar kita, ciri-ciri tiga bentuk, bentuk lengkung, segitiga selalu segitiga, segi empat dengan ukuran berbeda, benda dan bentuknya (tabel), cara mendeskripsikan benda, kue tradisional kita, dan bermain bentuk dengan tubuh. Ditutup blok INGAT (sisi dan sudut).

### Tahap 4. Concrete (4 permainan, benda nyata)
Batas: gambar benda berwarna hanya ada di tahap ini.

1. Keranjang Tiga Bentuk: seret atau ketuk benda ke keranjang lengkung, segitiga, atau segi empat. Dua ronde (6 dan 9 benda). Jawab dengan suara: banyak benda di keranjang lengkung.
2. Berburu Bentuk di Kamar: ketuk benda lengkung, lalu segitiga, lalu segi empat di kamar Kira. Tiga ronde. Jawab dengan suara: banyak benda segi empat.
3. Bayangan Siapa Ini?: tebak bentuk dari bayangan hitam sebuah benda. Empat ronde, tanpa jawaban suara.
4. Papan Paku dan Karet Gelang: bentangkan karet menjadi segitiga lalu segi empat di papan 5×5. Garis segaris dan karet bersilang ditolak. Jawab dengan suara: banyak sudut segi empat.

### Tahap 5. Picture (3 permainan, diagram saja)
Batas ketat: bentuk polos, tanpa gambar benda. Aturan lengkap ada di `.cursor/rules/batas-concrete-pictorial.mdc`.

5. Warnai Menurut Nama: pilih krayon, lalu warnai bentuk (kuning lengkung, merah muda segitiga, hijau segi empat). Bentuk miring dan terbalik ikut dipakai. Dua ronde. Jawab dengan suara: banyak segitiga.
6. Tabel Tally Bentuk: tandai bentuk satu per satu, lalu catat dengan goresan tally. Dua ronde. Jawab dengan suara: banyak bentuk semuanya.
7. Hubungkan Garis Putus-putus: sambung garis hingga menjadi lingkaran, segi empat, dan segitiga, lalu sebut namanya. Jawab dengan suara: banyak garis lurus pada segitiga.

### Tahap 6. Abstract (3 permainan)
Hanya kata dan angka.

8. Kartu Ciri-ciri: jodohkan kartu ciri dengan nama bentuk. Empat ronde. Jawab dengan suara: banyak sisi lurus bentuk lengkung.
9. Detektif Bentuk Misterius: baca petunjuk, tebak bentuknya. Empat ronde. Jawab dengan suara: banyak sudut.
10. Kanvas Guratan dan Suara: ucapkan banyak sudut, lalu guratkan angkanya di kanvas bertitik. Ronde 2 (Ayo Mencoba): anak memilih bentuk sendiri.

Penutup: Poin Penting (lima kartu bersuara), cara mendeskripsikan benda, tugas rumah, dan Catatanku.

## 3. Latihan dan Ujian

Latihan 10 soal (3 LOTS, 3 MOTS, 4 HOTS) dengan pembahasan, 30 Poin Kualifikasi. Ujian 10 soal, 70 Poin Kualifikasi, wajib 100%. Ujian punya tiga paket (`paket-1`, `paket-2`, `paket-3`) dengan soal berbeda, dipilih server. Soal dan pilihan ada di berkas publik. Kunci dan pembahasan hanya di server.
