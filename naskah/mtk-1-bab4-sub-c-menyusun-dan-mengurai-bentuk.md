# Matematika Kelas 1 · Bab 4 · Mengenal Bentuk

Sumber: Buku Siswa Matematika SD/MI Kelas I (Kemendikbudristek 2022), Bab 4, Sub-Bab C "Menyusun dan Mengurai Bentuk Bangun" (hlm. 134–139), ditambah Ayo Berkarya dan Catatanku di akhir bab (hlm. 140–144). Naskah ini ditulis ulang dari buku tersebut dan memperkaya isinya dengan metode dari luar buku.

Semua tahap berjalan di peramban siswa. Tidak ada panggilan API saat belajar. Suara Guru memakai suara yang dipilih siswa di "Pilih Guru" (Web Speech `id-ID`). Kunci jawaban hanya ada di `src/content-master/kelas1-bab4.master.json` (tidak di-commit) dan `supabase/seed/02_kelas1_bab4_keys.sql`. Berkas publik `src/data/kelas1-bab4.json` tidak memuat `correct_index`, `correctAnswer`, maupun `explanation`.

## 1. Struktur bab

| Sub-bab | Judul | Isi |
|---|---|---|
| A | Mendeskripsikan Bentuk | Sudah terbit. Bentuk lengkung, segitiga, segi empat, sisi dan sudut. |
| B | Mengelompokkan Benda | Sudah terbit. Mengelompokkan menurut bentuk, warna, dan ukuran. |
| C | Menyusun dan Mengurai Bentuk | Sudah terbit (naskah ini). Menggabungkan bentuk menjadi bangun baru dan menguraikannya kembali. |

## 2. Sub-Bab C: Menyusun dan Mengurai Bentuk Bangun

Tokoh: Igil si burung hantu dan teman-teman dari buku (Kira, Upe, Wei, Halim, Malosi, Tika).

Isi buku yang dipakai: menggabungkan dua keping kertas menjadi bangun baru, dua segitiga yang sama yang bisa menjadi segitiga lebih besar atau segi empat, bangun lain yang bisa digabung, kereta mainan dari beberapa bentuk, menguraikan rumah-rumahan menjadi bagian-bagiannya, menyebut jenis dan banyak bagian penyusun, Ayo Berkarya dengan potongan kertas, dan Catatanku.

Metode yang diadopsi dari luar buku:

- Komposisi dan dekomposisi bangun datar. Tingkat 2 dari van Hiele dan balok pola Froebel: anak menyusun bangun dari bagian, lalu mengurainya kembali.
- Tangram dari Tiongkok. Tujuh keping bangun datar disusun menjadi ribuan gambar. Dipakai sebagai kisah pengantar di poster Kreasi dari Bentuk.
- Segitiga konstruktif dan lemari geometri Montessori: memadankan bentuk dan besar potongan dengan bayangannya.
- Menyusun dari lidi yang sama panjang, sambil menghitung lidi (hitungan konkret sebelum penjumlahan).
- Kirigami dan kolase kertas untuk Ayo Berkarya.
- Concrete, Pictorial, Abstract dari Jerome Bruner. Sebuah bangun dihitung dulu dengan benda nyata, lalu dengan diagram polos, lalu dengan kata dan angka.

Pegangan bahasa: menyusun berarti menggabungkan, mengurai berarti memisahkan. Keduanya berlawanan arah. Bagian yang didapat dari mengurai sama dengan bagian yang dipakai saat menyusun. Cara menggabungkan menentukan bangun yang terbentuk (dua segitiga sama: segitiga besar atau segi empat). Menyusun menambah banyak bagian (penjumlahan), mengurai mengurangi banyak bagian (pengurangan).

### Tahap 1. Story
Enam adegan bergambar: dua segitiga kertas, dua cara menggabung, bangun yang baru, kereta dari balok, mengurai rumah mainan, dan rumah dari lidi. Setiap adegan punya narasi panjang yang dibacakan Suara Guru.

### Tahap 2. Mind-Map
Enam langkah: amati bagiannya, kenali tiap bentuk, gabungkan jadi bangun baru, beri nama bangun baru, uraikan kembali, hitung dan periksa.

### Tahap 3. Infografis
Sembilan poster untuk dibaca dan didengar, tanpa soal: menyusun dan mengurai, dua segitiga dua cara, bangun lain bisa digabung, kereta dari bentuk (tabel 5 + 1 + 3 = 9), rumah dan penyusunnya (1 segitiga + 3 segi empat), susun dan urai itu hitungan (5 + 1 + 3 = 9 dan 9 − 3 = 6), berapa lidi (3, 4, dan 6), kreasi dari bentuk (roket dan tangram), serta Ayo Berkarya. Ditutup blok INGAT ("Menyusun" dan "Mengurai").

### Tahap 4. Concrete (4 permainan, benda nyata)
Batas: gambar benda berwarna dan tindakan memindahkan benda hanya ada di tahap ini.

1. Gabung Dua Keping Kertas: tiga ronde. Anak menyeret (atau mengetuk) keping kertas ke papan yang membuat bentuk sesuai target: segitiga, persegi panjang dari dua segitiga, dan persegi panjang dari dua persegi. Kertas boleh diputar dan dibalik. Jawab dengan suara: banyak keping yang digabung (2).
2. Pas atau Tidak?: empat ronde (roti, bolu, keju, rumah kardus). Anak memilih potongan yang pas bentuk dan besarnya. Jawab dengan suara: banyak sisi lurus pada atap segitiga (3).
3. Bangun Kereta Balok: satu ronde, sembilan balok (5 segi empat, 1 segitiga, 3 lengkung) diseret ke bayangan kereta. Roda boleh saling tukar. Jawab dengan suara: banyak balok segi empat (5).
4. Susun Lidi: tiga ronde (segitiga, segi empat, rumah). Anak mengetuk garis putus-putus untuk meletakkan lidi. Rumah memakai 6 lidi karena dasar atap sama dengan sisi atas dinding. Jawab dengan suara: banyak lidi rumah (6).

### Tahap 5. Picture (3 permainan, diagram saja)
Batas ketat: bentuk polos, tanpa gambar benda. Aturan lengkap ada di `.cursor/rules/batas-concrete-pictorial.mdc`.

5. Garis Potong: tiga ronde. Target uraian (dua segitiga, dua persegi panjang sama, empat persegi kecil). Anak memilih bangun yang garis putus-putusnya tepat. Jawab dengan suara: banyak bagian yang dihasilkan (4).
6. Jodohkan Keping dan Bangun: dua ronde, masing-masing tiga pasang. Anak mengetuk sepasang keping polos di kolom kiri, lalu bangun gabungannya di kolom kanan. Jawab dengan suara: banyak keping di kolom kiri (6).
7. Tunjuk dan Hitung: dua bangun gabungan polos. Anak memilih jenis bentuk (segi empat, segitiga, lengkung), lalu mengetuk semua bagian dengan jenis itu. Bangun 2 punya 7 bagian. Jawab dengan suara: banyak bagian semuanya (7).

### Tahap 6. Abstract (3 permainan)
Hanya kata dan angka.

8. Benar atau Salah: lima kalimat tentang menyusun dan mengurai. Anak mengetuk Benar atau Salah dan mendengar alasannya. Jawab dengan suara: banyak bagian kereta semuanya (9).
9. Hitung Keping: tiga cerita angka (3 + 3, 8 − 3, 3 + 4) dengan papan angka 0–9. Menyusun berarti menjumlahkan, mengurai berarti mengurangi. Jawab dengan suara: banyak lidi semuanya (7).
10. Kanvas Guratan dan Suara: ucapkan banyaknya, lalu guratkan angkanya di kanvas bertitik. Ronde 1 lidi untuk segi empat (4). Ronde 2 (Ayo Mencoba): anak memilih sendiri satu hitungan (lidi segitiga 3, lidi rumah 6, atau segi empat pada kereta 5).

Penutup: Poin Penting (lima kartu bersuara), cara menyebutkan susunan, tugas rumah (Ayo Berkarya dengan kertas), dan Catatanku (lima pernyataan yang dicentang anak).

## 3. Latihan dan Ujian

Latihan dan Ujian bab ini mencakup Sub-Bab A, B, dan C. Latihan 10 soal (3 LOTS, 3 MOTS, 4 HOTS) dengan pembahasan, 30 Poin Kualifikasi: 3 soal Sub-Bab A, 3 soal Sub-Bab B, dan 4 soal Sub-Bab C. Ujian 10 soal, 70 Poin Kualifikasi, wajib 100%. Ujian punya tiga paket (`paket-1`, `paket-2`, `paket-3`), masing-masing 3 soal Sub-Bab A, 3 soal Sub-Bab B, dan 4 soal Sub-Bab C, dengan soal berbeda yang dipilih server. Soal dan pilihan ada di berkas publik. Kunci dan pembahasan hanya di server.
