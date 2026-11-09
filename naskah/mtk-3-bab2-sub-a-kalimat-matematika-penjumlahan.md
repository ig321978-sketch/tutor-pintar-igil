# Naskah Matematika Kelas 3 SD, Bab 2: Kalimat Matematika, Sub-Bab A: Kalimat Matematika Berkaitan dengan Penjumlahan Bilangan Cacah

Berkas ini ditulis dari satu sumber, `src/components/modul/naskah-k3b2.ts` dan `src/components/modul/data-k3b2.ts`, oleh `scripts/buat-naskah-md.mjs`. Isi mengikuti Buku Siswa Matematika Kelas III (Kemendikbudristek, Kurikulum Merdeka, Bab 2 hlm. 75–98) dan Buku Panduan Guru Bab 2, serta diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.

## 1. Identitas modul

- Kode bab: `k3-mat-bab2`, FASE_B, kelas 3.
- Judul: BAB 2: KALIMAT MATEMATIKA. Sub-Bab A: Kalimat Matematika Berkaitan dengan Penjumlahan Bilangan Cacah.
- Suara Guru: Web Speech API perangkat saja, laju 0.7 dan nada 1. Tanpa ElevenLabs.
- Isi: 3 video cerita (9 adegan), 8 langkah peta pikiran, 10 panel infografis, 30 permainan (10 Concrete, 10 Picture, 10 Abstract), 5 poin penting.

## 2. Tujuan belajar

Siswa menulis kalimat Matematika dari cerita penjumlahan yang salah satu bilangannya belum diketahui, mencari bilangan itu dengan mengurangkan jumlah dengan bilangan yang diketahui, memeriksa hasilnya dengan penjumlahan, dan menyebutkan beberapa kemungkinan pasangan bilangan untuk jumlah yang sama.

- Capaian Pembelajaran: Siswa menyelesaikan masalah yang berkaitan dengan kalimat Matematika berbentuk penjumlahan dan pengurangan bilangan cacah sampai 100. Pada sub-bab ini siswa mengisi nilai yang belum diketahui pada kalimat penjumlahan.
- Acuan: Buku Siswa Matematika Kelas III Kemendikbudristek (Bab 2: Kalimat Matematika, Sub-Bab A hlm. 77–86) dan Buku Panduan Guru Bab 2 Topik A.

## 3. Metode dari luar buku

- **Bagan bagian-keseluruhan (bar model)**: jumlah semua digambar sebagai batang atas dan dua bagian sebagai batang di bawahnya. Batang yang belum diketahui bertanda tanya. Dasar permainan Hitung Bagan dan Jodohkan Bagan dan Kalimat.
- **Operasi kebalikan**: jumlah dikurangi bagian yang diketahui sama dengan bagian yang belum diketahui. Penjumlahan dan pengurangan saling berkaitan, jadi hasilnya diperiksa dengan menjumlahkan lagi.
- **Kumpulan benda berbungkus sepuluh**: kalimat Matematika digambar sebagai kumpulan benda dengan kotak bertanda tanya. Permainan Rakit yang Belum Diketahui memakai penukaran sepuluh-ke-satu.
- **Titik-titik di depan atau di tengah**: Contoh buku memuat 8 + … = 19 dan … + 16 = 54. Permainan Pilah Bagan melatih membedakan letak titik-titik.
- **Banyak kemungkinan (Ayo Berpikir)**: bila hanya jumlahnya yang diketahui, banyak pasangan bilangan mungkin. Permainan Kemungkinan Pasangan Bilangan memakai buku di perpustakaan (100) dan tiket film (95).
- **Pengecoh dari kesalahan umum**: pilihan jawaban memuat salah sepuluh (lupa menyimpan atau meminjam) dan salah satu, serta kalimat yang menukar hasil dengan bilangan yang diketahui.

## 4. Tahap 1: Story (video cerita animasi SVG)

Tiap video diputar satu per satu saat siswa mengetuk Putar. Tidak ada yang berjalan sendiri. Kalimat dibacakan Suara Guru satu per satu (ketukan), dan gambar berubah mengikuti ketukan.

### K3B2A-V1. Bermain Kelereng (Kalimat Matematika dari cerita)

**K3B2A-V1-1. Kelereng Galih**

1. Galih senang sekali mengumpulkan kelereng dengan berbagai warna. *(papan: Galih punya kelereng)*
2. Ia memiliki sejumlah kelereng yang disimpan di rumah. *(papan: Disimpan di rumah)*
3. Pada hari Minggu, Galih membeli 5 kelereng lagi. *(papan: Membeli 5 kelereng lagi)*
4. Jumlah kelerengnya kini menjadi 17 butir. *(papan: Jumlahnya kini 17)*

**K3B2A-V1-2. Berapa di rumah**

1. Banyak kelereng di rumah belum kita ketahui. *(papan: Belum diketahui)*
2. Kita tulis tanda titik-titik untuk bilangan yang belum diketahui. *(papan: Tulis titik-titik …)*
3. Kalimat Matematikanya adalah … + 5 = 17. *(papan: … + 5 = 17)*
4. Berapa kira-kira kelereng Galih yang disimpan di rumah? *(papan: Berapa kelereng di rumah?)*

**K3B2A-V1-3. Kalimat Matematika**

1. Bentuk penjumlahan seperti … + 5 = 17 disebut kalimat Matematika. *(papan: … + 5 = 17)*
2. Bilangan yang belum diketahui itulah yang akan kita cari. *(papan: Cari bilangan yang belum diketahui)*
3. Kita akan belajar caranya selangkah demi selangkah. *(papan: Belajar selangkah demi selangkah)*
4. Mulailah dari tabel kelereng dan bentuk penjumlahannya. *(papan: Mulai dari tabel kelereng)*

### K3B2A-V2. Kelereng Galih dan Andi (Mencari nilai yang belum diketahui)

**K3B2A-V2-1. Jumlah 50 butir**

1. Galih dan Andi membawa sejumlah kelereng masing-masing. *(papan: Galih dan Andi)*
2. Jika kelereng mereka digabungkan terkumpul 50 butir. *(papan: Digabung 50 butir)*
3. Banyak kelereng Galih adalah 30 butir. *(papan: Galih 30 butir)*
4. Dapatkah kalian menentukan banyak kelereng Andi? *(papan: Andi berapa butir?)*

**K3B2A-V2-2. Tulis kalimatnya**

1. Kita tulis dalam tabel: Galih 30 butir, Andi belum diketahui, jumlah semua 50 butir. *(papan: 30 butir, …, 50 butir)*
2. Kalimat Matematikanya adalah 30 + … = 50. *(papan: 30 + … = 50)*
3. Kita ingat bahwa 30 + 20 = 50. *(papan: 30 + 20 = 50)*
4. Bagaimana cara menentukan angka 20 itu? *(papan: Bagaimana mencari 20?)*

**K3B2A-V2-3. Bagan jumlah**

1. Gambar bagan: seluruh kelereng 50, bagian Galih 30, bagian Andi belum diketahui. *(papan: Bagan: 50 = 30 + ?)*
2. Untuk mencari bagian Andi, kurangi jumlah semua dengan bagian Galih. *(papan: Jumlah dikurangi bagian)*
3. Kita hitung 50 − 30 = 20. *(papan: 50 − 30 = 20)*
4. Jadi, kelereng Andi ada 20 butir. *(papan: Andi 20 butir)*

### K3B2A-V3. Contoh Kalimat Matematika (Mengisi nilai yang belum diketahui)

**K3B2A-V3-1. Contoh pertama**

1. Contoh pertama: 8 + … = 19. *(papan: 8 + … = 19)*
2. Bilangan yang diketahui adalah 8 dan 19. *(papan: Diketahui 8 dan 19)*
3. Kurangkan jumlahnya: 19 − 8 = 11. *(papan: 19 − 8 = 11)*
4. Jadi, 8 + 11 sama dengan 19. *(papan: 8 + 11 = 19)*

**K3B2A-V3-2. Contoh kedua**

1. Contoh kedua: 23 + … = 45. *(papan: 23 + … = 45)*
2. Kurangkan jumlahnya dengan bilangan yang diketahui. *(papan: Jumlah dikurangi bilangan)*
3. Hitung 45 − 23 sama dengan 22. *(papan: 45 − 23 = 22)*
4. Jadi, 23 + 22 sama dengan 45. *(papan: 23 + 22 = 45)*

**K3B2A-V3-3. Contoh ketiga**

1. Contoh ketiga: … + 16 = 54. *(papan: … + 16 = 54)*
2. Bilangan yang belum diketahui ada di depan. *(papan: Belum diketahui di depan)*
3. Kurangkan: 54 − 16 = 38. *(papan: 54 − 16 = 38)*
4. Jadi, 38 + 16 sama dengan 54. *(papan: 38 + 16 = 54)*

## 5. Tahap 2: Mind map (peta pikiran)

**1. Mengingat Penjumlahan** 🔙 (Mengingat penjumlahan → Bermain kelereng)

Penjumlahan berarti menggabungkan dua banyak benda. Dua bilangan yang dijumlahkan menghasilkan satu jumlah. Misalnya 30 kelereng ditambah 20 kelereng sama dengan 50 kelereng. Sebelum belajar kalimat Matematika, ingatlah cara menjumlahkan dua bilangan cacah sampai 100 dengan benar.

**2. Bermain Kelereng** 🎱 (Bermain kelereng → Tabel kelereng)

Galih memiliki sejumlah kelereng yang disimpan di rumah. Pada hari Minggu ia membeli 5 kelereng lagi, sehingga jumlahnya menjadi 17 butir. Banyak kelereng yang disimpan di rumah belum diketahui. Cerita seperti ini dapat dituliskan sebagai kalimat Matematika dengan titik-titik pada bilangan yang belum diketahui.

**3. Tabel Kelereng** 📋 (Tabel kelereng → Kalimat Matematika)

Pada Aktivitas 1, kelompok membuat tabel empat kolom: nomor, banyak kelereng anak pertama, banyak kelereng anak kedua, dan jumlah kelereng. Kolom yang belum terisi diisi kelereng agar jumlah anak pertama dan kedua sama dengan kolom terakhir. Lalu setiap baris ditulis sebagai bentuk penjumlahan, misalnya 1 + … = 3.

**4. Kalimat Matematika** ✍️ (Kalimat Matematika → Mencari nilai yang belum diketahui)

Bentuk penjumlahan bilangan yang memuat titik-titik, seperti 30 + … = 50 atau … + 16 = 54, disebut kalimat Matematika. Titik-titik menunjukkan bilangan yang belum diketahui. Tugas kita adalah mengisi titik-titik itu dengan bilangan yang membuat kalimat Matematika menjadi benar.

**5. Mencari Nilai yang Belum Diketahui** 🔎 (Mencari nilai yang belum diketahui → Bagan jumlah dan bagian)

Galih membawa 30 kelereng dan Andi membawa sejumlah kelereng. Jika digabung ada 50 butir. Kalimat Matematikanya 30 + … = 50. Kita ingat 30 + 20 = 50. Cara mencarinya: kurangi jumlah semua dengan bilangan yang diketahui, yaitu 50 − 30 = 20. Jadi, kelereng Andi ada 20 butir.

**6. Bagan Jumlah dan Bagian** 📊 (Bagan jumlah dan bagian → Contoh dan latihan)

Bagan membantu kita melihat jumlah dan bagian-bagiannya. Batang atas menunjukkan jumlah semua, yaitu 50. Dua batang di bawahnya menunjukkan bagian Galih 30 dan bagian Andi yang belum diketahui. Karena jumlah dikurangi bagian yang diketahui sama dengan bagian yang belum diketahui, kita hitung 50 − 30 = 20.

**7. Contoh dan Latihan** 📝 (Contoh dan latihan → Banyak kemungkinan)

Contoh dari buku: 8 + … = 19 dicari dengan 19 − 8 = 11, 23 + … = 45 dengan 45 − 23 = 22, … + 16 = 54 dengan 54 − 16 = 38, dan … + 36 = 68 dengan 68 − 36 = 32. Setelah mengisi, periksa dengan menjumlahkan: 8 + 11 = 19. Bilangan yang belum diketahui boleh berada di depan atau di tengah kalimat.

**8. Banyak Kemungkinan** 🔀 (Banyak kemungkinan → Siap menyelesaikan kalimat penjumlahan)

Pada Ayo Berpikir, perpustakaan punya 100 buku. Banyak buku yang dipinjam dan banyak buku yang tersisa bisa bermacam-macam asal jumlahnya 100, misalnya 60 + 40, 75 + 25, atau 55 + 45. Pada Latihan 1 nomor 5 ada 95 tiket yang terjual, dan siswa menuliskan lima kemungkinan penonton laki-laki dan perempuan.

## 6. Tahap 3: Infografis

1. **Kalimat Matematika** 📘: Bentuk penjumlahan yang memuat titik-titik disebut kalimat Matematika. Titik-titik menunjukkan bilangan yang belum diketahui.
2. **Bilangan Belum Diketahui** ❓: Bilangan yang belum diketahui ditulis dengan titik-titik. Bilangan itu boleh ada di depan atau di tengah kalimat.
3. **30 + … = 50** 🎱: Galih punya tiga puluh kelereng. Jumlah kelereng Galih dan Andi lima puluh. Kalimat Matematikanya tiga puluh tambah titik-titik sama dengan lima puluh.
4. **Bagan Jumlah** 📊: Batang atas menunjukkan jumlah semua. Dua batang di bawahnya menunjukkan dua bagian. Satu bagian bertanda tanya.
5. **Jumlah Dikurangi Bagian** ➖: Untuk mencari bagian yang belum diketahui, kurangi jumlah semua dengan bagian yang diketahui. Lima puluh dikurangi tiga puluh sama dengan dua puluh.
6. **8 + … = 19** 🔢: Delapan tambah titik-titik sama dengan sembilan belas. Sembilan belas dikurangi delapan sama dengan sebelas. Jadi delapan tambah sebelas sama dengan sembilan belas.
7. **… + 16 = 54** 🔎: Titik-titik tambah enam belas sama dengan lima puluh empat. Lima puluh empat dikurangi enam belas sama dengan tiga puluh delapan. Jadi tiga puluh delapan tambah enam belas sama dengan lima puluh empat.
8. **Memeriksa** ✅: Periksa hasilmu dengan menjumlahkan. Tiga puluh tambah dua puluh sama dengan lima puluh, jadi jawabannya benar.
9. **Banyak Kemungkinan** 🔀: Bila hanya jumlahnya yang diketahui, ada banyak kemungkinan. Enam puluh tambah empat puluh, atau tujuh puluh lima tambah dua puluh lima, sama-sama seratus.
10. **Cara Mengisi** 📝: Empat langkah. Satu, baca kalimat Matematikanya. Dua, lihat bilangan yang diketahui. Tiga, kurangkan jumlah dengan bilangan itu. Empat, periksa dengan menjumlahkan.

## 7. Tahap 4: Concrete (benda nyata)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 1 | Rakit yang Belum Diketahui | `build-unknown` | hlm. 79–82 (Aktivitas 1: kelereng Galih dan Andi) | Merakit kumpulan benda yang belum diketahui pada kalimat Matematika penjumlahan, termasuk menukar sepuluh benda menjadi satu bungkus. | Tiga ronde, tiap ronde dua soal. Siswa membaca cerita dan melihat gambar kumpulan yang diketahui, lalu merakit kumpulan yang belum diketahui dengan tombol tambah dan kurang. Sepuluh benda otomatis ditukar satu bungkus. |
| 2 | Hitung yang Belum Diketahui | `count-unknown` | hlm. 79–82 (Aktivitas 1: kelereng Galih dan Andi) | Menghitung banyak benda yang belum diketahui dari gambar kumpulan dan memilih hasilnya. | Tiga ronde, tiap ronde dua soal. Gambar kumpulan ditampilkan dengan kotak tanda tanya pada bagian yang belum diketahui. Siswa memilih satu dari tiga nilai. Pengecoh salah sepuluh atau salah satu. |
| 3 | Tulis Kalimat Matematika | `write-sentence` | hlm. 79–82 (Aktivitas 1: kelereng Galih dan Andi) | Memilih kalimat Matematika penjumlahan yang sesuai dengan gambar kumpulan benda. | Tiga ronde, tiap ronde dua soal. Siswa melihat gambar kumpulan, lalu memilih satu dari tiga kalimat Matematika. Pengecoh menukar hasil dengan bilangan yang diketahui atau membalik tanda. |
| 4 | Jodohkan Gambar dan Kalimat | `match-picture-sentence` | hlm. 79–82 (Aktivitas 1: kelereng Galih dan Andi) | Menjodohkan gambar kumpulan benda dengan kalimat Matematikanya. | Tiga ronde, tiap ronde tiga gambar dan tiga kalimat Matematika. Siswa mengetuk gambar, lalu mengetuk kalimat yang cocok. |
| 5 | Memori Gambar dan Nilai | `memory-picture-value` | hlm. 79–82 (Aktivitas 1: kelereng Galih dan Andi) | Mencocokkan gambar kumpulan benda dengan nilai yang belum diketahui lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): gambar kumpulan dan nilainya. Siswa membalik dua kartu dan mencari pasangannya. |
| 6 | Ketuk Gambar dengan Nilai | `tap-picture-value` | hlm. 79–82 (Aktivitas 1: kelereng Galih dan Andi) | Menemukan gambar yang nilai belum diketahuinya sama dengan bilangan yang diminta. | Tiga ronde, tiap ronde tiga gambar dan dua pertanyaan. Siswa mengetuk gambar yang nilai belum diketahuinya sama dengan bilangan yang disebut. |
| 7 | Ketuk Semua Nilai Lebih atau Kurang | `tap-all-value-compare` | hlm. 79–82 (Aktivitas 1: kelereng Galih dan Andi) | Menemukan semua gambar yang nilai belum diketahuinya lebih atau kurang dari bilangan acuan. | Tiga ronde, tiap ronde empat gambar dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. |
| 8 | Cerita Kalimat Matematika | `story-sentence` | hlm. 77 dan 81 (Bermain Kelereng; Galih dan Andi) | Menyelesaikan cerita penjumlahan dengan bilangan yang belum diketahui dan gambar kumpulan benda. | Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita, melihat gambar kumpulan, lalu memilih nilai yang belum diketahui. |
| 9 | Papan Nilai Kumpulan | `board-value-collection` | hlm. 79–82 (Aktivitas 1: kelereng Galih dan Andi) | Menulis nilai yang belum diketahui pada papan puluhan dan satuan. | Tiga ronde, tiap ronde dua soal. Siswa menghitung nilai yang belum diketahui dari gambar kumpulan, lalu mengatur angka puluhan dan satuan pada papan dan menekan Periksa. |
| 10 | Urutkan Gambar menurut Nilai | `order-picture-value` | hlm. 79–82 (Aktivitas 1: kelereng Galih dan Andi) | Mengurutkan tiga gambar menurut nilai yang belum diketahuinya. | Tiga ronde, tiap ronde tiga gambar bertanda huruf. Siswa mengetuk gambar satu per satu dari nilai paling kecil atau paling besar. |

## 8. Tahap 5: Picture (diagram)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 11 | Hitung Bagan | `count-bar` | hlm. 79–82 (Aktivitas 1: kelereng Galih dan Andi) | Menghitung nilai yang belum diketahui dari bagan bagian dan keseluruhan. | Tiga ronde, tiap ronde dua soal. Bagan batang menampilkan keseluruhan dan dua bagian, salah satunya bertanda tanya. Siswa memilih satu dari tiga nilai. |
| 12 | Lengkapi Kalimat dari Bagan | `complete-sentence-bar` | hlm. 83 (Contoh: 8 + … = 19, 23 + … = 45, … + 16 = 54) | Melengkapi langkah mencari nilai yang belum diketahui: kurangi jumlah dengan bilangan yang diketahui, mengisi kalimat, lalu memeriksa. | Tiga soal, tiap soal tiga kalimat, misalnya cari dengan operasi kebalikan, isi kalimat Matematika, lalu periksa. Siswa memilih satu dari tiga angka untuk bagian kosong. |
| 13 | Jodohkan Bagan dan Kalimat | `match-bar-sentence` | hlm. 79–82 (Aktivitas 1: kelereng Galih dan Andi) | Menjodohkan bagan dengan kalimat Matematikanya. | Tiga ronde, tiap ronde tiga bagan dan tiga kalimat Matematika. Siswa mengetuk bagan, lalu mengetuk kalimat yang cocok. |
| 14 | Memori Bagan dan Nilai | `memory-bar-value` | hlm. 79–82 (Aktivitas 1: kelereng Galih dan Andi) | Mencocokkan bagan dengan nilai yang belum diketahui lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang). Siswa membalik dua kartu dan mencari pasangannya. |
| 15 | Isi Tabel Kalimat Matematika | `fill-sentence-table` | hlm. 83 (Contoh: 8 + … = 19, 23 + … = 45, … + 16 = 54) | Melengkapi tabel kalimat Matematika dan nilai yang belum diketahui. | Tiga tabel dengan empat baris. Siswa mengetuk baris, lalu mengetuk kartu nilai yang tepat. Ada satu kartu pengecoh. |
| 16 | Ketuk Semua Bagan Lebih atau Kurang | `tap-all-bar-compare` | hlm. 85–86 (Latihan 1) | Menemukan semua bagan yang nilai belum diketahuinya lebih atau kurang dari bilangan acuan. | Tiga ronde, tiap ronde empat bagan dan satu perintah. Siswa mengetuk semua yang cocok, lalu menekan Periksa. |
| 17 | Pilah Bagan: Depan atau Tengah | `sort-bar-position` | hlm. 83 (Contoh: 8 + … = 19, 23 + … = 45, … + 16 = 54) | Memilah bagan menjadi yang bilangan belum diketahuinya di depan dan yang di tengah kalimat. | Tiga ronde, tiap ronde enam bagan dan dua kotak. Siswa menyeret atau mengetuk bagan ke kotak yang tepat. |
| 18 | Urutkan Langkah Mencari Nilai | `order-find-steps` | hlm. 83 (Contoh: 8 + … = 19, 23 + … = 45, … + 16 = 54) | Mengurutkan langkah mencari nilai yang belum diketahui pada kalimat Matematika. | Tiga ronde, tiap ronde empat langkah. Siswa mengetuk langkah satu per satu menurut urutan yang benar. Letak jawaban berpindah. |
| 19 | Papan Nilai dari Bagan | `board-value-bar` | hlm. 85–86 (Latihan 1) | Menulis nilai yang belum diketahui dari bagan pada papan puluhan dan satuan. | Tiga ronde, tiap ronde dua soal. Siswa membaca bagan, lalu mengatur angka puluhan dan satuan pada papan dan menekan Periksa. |
| 20 | Kemungkinan Pasangan Bilangan | `possible-pairs` | hlm. 84 (Ayo Berpikir: buku di perpustakaan) | Menemukan semua pasangan bilangan yang mungkin untuk keseluruhan yang sama. | Tiga ronde, tiap ronde empat pasangan dan satu perintah. Siswa mengetuk semua pasangan yang jumlahnya sama dengan keseluruhan, lalu menekan Periksa. |

## 9. Tahap 6: Abstract (kata dan angka)

| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |
|---|---|---|---|---|---|
| 21 | Isi Nilai yang Belum Diketahui | `fill-unknown` | hlm. 83 (Contoh: 8 + … = 19, 23 + … = 45, … + 16 = 54) | Mencari nilai yang belum diketahui pada kalimat Matematika penjumlahan dan memilihnya dari tiga pilihan. | Tiga ronde, tiap ronde dua soal, misalnya 8 + … = 19 dan … + 16 = 54. Pengecoh salah sepuluh atau salah satu. |
| 22 | Papan Nilai | `board-value` | hlm. 85–86 (Latihan 1) | Menulis nilai yang belum diketahui pada papan puluhan dan satuan. | Tiga ronde, tiap ronde dua soal. Siswa mengatur angka puluhan dan satuan lalu menekan Periksa. |
| 23 | Langkah Menyelesaikan | `solve-steps` | hlm. 83 (Contoh: 8 + … = 19, 23 + … = 45, … + 16 = 54) | Melengkapi langkah mencari nilai, mengisi kalimat, dan memeriksa hasilnya. | Tiga soal, tiap soal tiga kalimat, misalnya cari dengan operasi kebalikan. Siswa memilih satu dari tiga angka. |
| 24 | Jodohkan Kalimat dan Nilai | `match-sentence-value` | hlm. 85–86 (Latihan 1) | Menjodohkan kalimat Matematika dengan nilai yang belum diketahuinya. | Tiga ronde, tiap ronde tiga kalimat dan tiga nilai. Siswa mengetuk kalimat, lalu mengetuk nilai yang cocok. |
| 25 | Memori Kalimat dan Nilai | `memory-sentence-value` | hlm. 85–86 (Latihan 1) | Mencocokkan kalimat Matematika dengan nilainya lewat permainan memori. | Tiga ronde, tiap ronde delapan kartu tertutup (empat pasang): kalimat dan nilai. Siswa membalik dua kartu dan mencari pasangannya. |
| 26 | Benar atau Salah: Kalimat Matematika | `true-false-sentence` | hlm. 83 (Contoh: 8 + … = 19, 23 + … = 45, … + 16 = 54) | Menilai pernyataan tentang kalimat Matematika dan cara mencari nilainya. | Dua ronde, tiap ronde lima pernyataan. Siswa memilih Benar atau Salah. Tiap jawaban diberi penjelasan. |
| 27 | Detektif Kalimat Matematika | `detective-sentence` | hlm. 83 (Contoh: 8 + … = 19, 23 + … = 45, … + 16 = 54) | Menemukan bilangan yang belum diketahui dari dua petunjuk. | Empat soal. Siswa membaca petunjuk seperti nilai pada sebuah kalimat Matematika dan satu ciri bilangan, lalu memilih satu dari tiga bilangan. Hanya satu yang cocok. |
| 28 | Peta Konsep Kalimat Matematika | `concept-map-sentence` | hlm. 76 (peta konsep: kalimat Matematika) | Melengkapi peta konsep kalimat Matematika penjumlahan dan cara mencari nilainya. | Dua peta konsep, tiap peta empat kotak. Siswa memilih kartu yang tepat untuk kotak yang menyala. |
| 29 | Soal Cerita Kalimat Matematika | `story-sentence-abstract` | hlm. 85–86 (Latihan 1) | Menyelesaikan soal cerita penjumlahan dengan bilangan yang belum diketahui. | Tiga ronde, tiap ronde dua cerita. Siswa membaca cerita lalu memilih satu dari tiga nilai. Pengecoh salah sepuluh atau salah satu. |
| 30 | Susun Kata Kalimat Matematika | `sentence-words` | hlm. 77 dan 81 (Bermain Kelereng; Galih dan Andi) | Menyusun kalimat tentang kalimat Matematika dari kartu kata. | Empat kalimat. Siswa mengetuk kartu kata satu per satu menurut urutan kalimat yang benar. Ada satu kartu pengecoh. |

## 10. Poin penting, cara, kegiatan di rumah, dan refleksi

- 📘 **Kalimat Matematika**: 30 + … = 50. *Suara:* Bentuk penjumlahan yang memuat titik-titik disebut kalimat Matematika.
- ❓ **Belum diketahui**: ditulis …. *Suara:* Bilangan yang belum diketahui ditulis dengan titik-titik. Ia boleh ada di depan atau di tengah kalimat.
- ➖ **Jumlah dikurangi bagian**: 50 − 30 = 20. *Suara:* Untuk mencari bilangan yang belum diketahui, kurangi jumlah dengan bilangan yang diketahui.
- ✅ **Periksa**: 30 + 20 = 50. *Suara:* Periksa jawabanmu dengan menjumlahkan. Hasilnya harus sama dengan jumlah semula.
- 🔀 **Banyak kemungkinan**: 60 + 40, 75 + 25. *Suara:* Bila hanya jumlah yang diketahui, ada banyak pasangan bilangan yang mungkin.

Ringkasan suara: Ingat selalu! Kalimat Matematika penjumlahan memuat titik-titik untuk bilangan yang belum diketahui. Untuk mencarinya, kurangi jumlah dengan bilangan yang diketahui. Lalu periksa dengan menjumlahkan. Bila hanya jumlah yang diketahui, ada banyak kemungkinan pasangan bilangan.

Cara menyebutkan: Cara mengisi. Baca kalimat Matematikanya. Lihat bilangan yang diketahui. Kurangkan jumlah dengan bilangan itu. Lalu periksa dengan menjumlahkan. (baca kalimat, lihat yang diketahui, kurangkan jumlah, periksa jumlah)

Ayo Mencoba di rumah: siapkan 20 kancing atau biji. Sembunyikan sebagian di tangan, lalu tunjukkan sisanya dan jumlah seluruhnya kepada temanmu. Tulis kalimat Matematikanya dengan titik-titik, cari bilangan yang disembunyikan dengan mengurangkan, lalu buka tanganmu untuk memeriksa.

Refleksi:
- Aku dapat menulis kalimat Matematika dari cerita penjumlahan.
- Aku dapat mencari bilangan yang belum diketahui dengan mengurangkan.
- Aku memeriksa jawabanku dengan menjumlahkan.
- Aku dapat menyebutkan beberapa kemungkinan pasangan bilangan.
