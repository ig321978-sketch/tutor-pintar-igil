// Penulis berkas naskah Matematika (Materi saja) dari satu sumber naskah. Jalankan: node --no-warnings scripts/buat-naskah-md.mjs k3b1
// Membaca src/components/modul/naskah-<kode>.ts lalu menulis naskah/mtk-<kelas>-bab<N>-*.md. Tanpa jaringan dan tanpa API.
// Kunci Latihan dan Ujian tidak ada karena soalnya belum dibuat. Tambahkan satu entri di KONFIG untuk tiap bab baru.
import fs from "node:fs";

/** Tiap bab: kelas, nomor bab, judul bab, sumber buku, dan nama berkas tiap sub-bab. */
const KONFIG = {
  k3b1: {
    kelas: 3,
    bab: 1,
    judul: "Bilangan Cacah sampai 1.000",
    buku: "Buku Siswa Matematika Kelas III (Kemendikbudristek, Kurikulum Merdeka, Bab 1 hlm. 3–45) dan Buku Panduan Guru Bab 1",
    berkas: { A: "sub-a-bilangan-dan-lambang", B: "sub-b-nilai-tempat", C: "sub-c-membandingkan-mengurutkan", D: "sub-d-penjumlahan-sampai-100", E: "sub-e-pengurangan-sampai-100", F: "sub-f-perkalian-sampai-100", G: "sub-g-pembagian-sampai-100" },
    metodeLuar: {
      A: [
        "**Balok Dienes (blok satuan, batang puluhan, lempeng ratusan)**: bilangan dilihat sebagai benda yang bisa dihitung dan ditukar sepuluh-ke-satu. Dasar permainan Rakit Kemasan, Hitung Blok, dan Isi Tabel Blok.",
        "**Kemasan nyata (benda, bungkus, dus)**: satu bungkus berisi sepuluh benda dan satu dus berisi sepuluh bungkus. Penukaran otomatis saat siswa menekan tambah membuat aturan sepuluh-ke-satu terasa langsung.",
        "**Papan nilai tempat tiga kolom berwarna**: ratusan hijau, puluhan biru, satuan merah seperti di buku. Dasar permainan Papan dari Kumpulan, Papan dari Blok, dan Tulis Lambang di Papan.",
        "**Kartu angka (Montessori)**: siswa menyusun bilangan dengan tiga kartu pada tiga tempat. Dasar permainan Susun Tiga Kartu dan tantangan Ayo Berpikir (900 bilangan bila angka boleh berulang, 648 bila tidak).",
        "**Garis bilangan ratusan**: bilangan ditemukan pada garis berloncatan seratus atau sepuluh sebagai persiapan membandingkan dan mengurutkan.",
        "**Miskonsepsi angka nol**: Buku Panduan Guru menyebut kesalahan membaca nol di tempat ratusan atau puluhan. Pengecoh sengaja memuat 160 dan 106, 405 dan 450, 703 dan 730.",
      ],
      B: [
        "**Tiga kaleng dan kartu angka**: aktivitas buku diwujudkan dengan benda nyata (kaleng) dan kartu, lalu dipindah ke layar sebagai permainan Tiga Kaleng.",
        "**Nilai tempat dengan kemasan**: nilai sebuah angka dihitung dari banyak benda pada kemasan tempat angka itu berada (3 dus = 300 benda).",
        "**Menyusun dan mengurai (expanded form)**: dua arah yang saling membalik, 2 ratusan + 5 puluhan + 1 satuan = 251 dan 251 = 200 + 50 + 1.",
        "**Angka dan nilai tidak sama**: miskonsepsi dari Buku Panduan Guru (mengisi tabel dengan 900, 80, 7). Permainan Isi Tabel dan Benar atau Salah membahasnya langsung.",
        "**Garis bilangan nilai**: nilai sebuah angka diketuk pada garis 0 sampai 1.000 (langkah 100), 0 sampai 100 (langkah 10), atau 0 sampai 10.",
        "**Detektif nilai tempat**: dua petunjuk tentang nilai angka menyisakan satu bilangan, setiap soal diperiksa uji otomatis.",
      ],
      C: [
        "**Nilai tempat sebagai aturan membandingkan**: bilangan dibandingkan dari tempat paling kiri (ratusan), lalu puluhan, lalu satuan. Dasar permainan Tempat yang Menentukan dan Ratusan Sama, Lihat Berikutnya.",
        "**Tanda mulut buaya**: tanda lebih dari dan kurang dari seperti mulut yang terbuka ke arah bilangan yang lebih besar. Cara ini membantu siswa tidak menukar tanda.",
        "**Kumpulan benda dan model blok untuk perbandingan**: dus, bungkus, dan benda lepas (Concrete) serta lempeng, batang, dan kotak (Picture) membuat selisih terlihat sebelum ditulis dengan tanda.",
        "**Mengurutkan dengan memilih yang terkecil berulang**: cari yang paling kecil, lalu yang paling kecil dari sisanya. Dasar permainan Urutkan Kumpulan, Urutkan Blok, dan Urutkan Lambang.",
        "**Bilangan di antara dua bilangan**: siswa menemukan bilangan yang lebih dari batas bawah dan kurang dari batas atas (639 < 709 < 720).",
        "**Detektif perbandingan**: petunjuk lebih dari, kurang dari, dan angka tertentu menyisakan satu bilangan. Setiap soal diperiksa uji otomatis.",
      ],
      D: [
        "**Penukaran sepuluh ke satu saat menyimpan**: sepuluh benda lepas ditukar satu bungkus. Permainan Gabungkan Kumpulan memakai penukaran otomatis agar aturan menyimpan terlihat langsung.",
        "**Susun pendek dan susun panjang**: dua cara yang sama-sama dipakai di buku. Susun panjang menguraikan bilangan (54 = 50 + 4), susun pendek menuliskannya ke bawah.",
        "**Pilah soal menyimpan dan tanpa menyimpan**: siswa memeriksa satuan dulu. Bila berjumlah sepuluh atau lebih, soal itu perlu menyimpan.",
        "**Urutan langkah penjumlahan bersusun**: menyusun, menjumlahkan satuan, menyimpan, menjumlahkan puluhan, lalu memeriksa. Dasar permainan Urutkan Langkah Menjumlahkan.",
        "**Pengecoh dari kesalahan umum**: pilihan jawaban sengaja memuat hasil lupa menyimpan (kurang sepuluh) dan salah menyimpan (lebih sepuluh).",
        "**Soal cerita tiga bilangan**: Ayo Berlatih 5 dipakai langsung, termasuk menjumlahkan tiga bilangan dua-dua.",
      ],
      E: [
        "**Menukar satu puluhan menjadi sepuluh satuan**: bila benda lepas tidak cukup, satu bungkus dibuka menjadi sepuluh benda. Permainan Rakit Sisa dan Hitung Sisa memakai penukaran ini agar aturan mengambil terlihat langsung.",
        "**Susun pendek dan susun panjang pengurangan**: dua cara yang sama-sama dipakai di buku. Susun panjang menguraikan bilangan (45 = 30 + 15), susun pendek menuliskannya ke bawah dengan angka pinjaman merah.",
        "**Pilah soal mengambil dan tanpa mengambil**: siswa memeriksa satuan dulu. Bila satuan atas lebih kecil dari satuan bawah, soal itu perlu mengambil satu puluhan.",
        "**Memeriksa dengan penjumlahan (operasi kebalikan)**: hasil pengurangan ditambah bilangan pengurang harus sama dengan bilangan awal (26 + 19 = 45). Metode ini dipakai di video, poin penting, dan Peta Konsep.",
        "**Pengecoh dari kesalahan umum**: pilihan jawaban sengaja memuat hasil lupa mengambil (lebih sepuluh) dan salah mengambil (kurang sepuluh).",
        "**Soal cerita sisa dan selisih**: Ayo Berlatih 4 dipakai langsung. Selisih dua banyak benda juga dicari dengan pengurangan.",
      ],
      F: [
        "**Kelompok yang sama banyak (piring dan kotak titik)**: benda disusun pada piring dengan isi sama (Concrete), lalu diganti kotak berisi titik polos (Picture). Permainan Rakit Piring dan Rakit Kotak Titik memakai mesin yang sama dengan gambar berbeda.",
        "**Penjumlahan berulang sebagai dasar perkalian**: 5 × 2 ditulis 2 + 2 + 2 + 2 + 2. Permainan Tulis Penjumlahan Berulang dan Dari Penjumlahan ke Perkalian melatih perpindahan dua arah.",
        "**Loncatan pada garis bilangan**: k loncatan sama besar dari nol mendarat di k × n. Siswa mengetuk titik pendaratan pada garis enam titik.",
        "**Menukar tempat bilangan (sifat komutatif)**: 5 × 6 = 6 × 5. Dua susunan piring dibandingkan, lalu soal Tukar Faktor menguji hasilnya.",
        "**Banyak kelompok dan isi tiap kelompok**: bilangan pertama pada perkalian adalah banyak kelompok, bilangan kedua isi tiap kelompok. Pengecoh sengaja memuat satu kelompok lebih dan satu kelompok kurang.",
        "**Aktivitas 4 dengan gelas dan kerikil**: kegiatan buku diwujudkan dalam video (5 gelas × 4 kerikil dan 4 gelas × 7 kerikil) dan permainan Papan Hasil Kelompok.",
      ],
      G: [
        "**Bagikan bergiliran (Aktivitas 5)**: ketua membagikan satu benda ke tiap piring, lagi dan lagi, sampai tumpukan habis. Mesin Bagikan Bergiliran menampilkan kalimat pengurangan berulang yang bertambah panjang tiap putaran.",
        "**Pembagian sebagai pengurangan berulang**: 15 : 3 = 5 karena 15 − 3 − 3 − 3 − 3 − 3 = 0. Permainan Tulis Pengurangan Berulang dan Loncat Mundur pada Garis Bilangan melatih dua cara menulisnya.",
        "**Hubungan perkalian dan pembagian**: Catatan Penting buku (hasil bagi × pembagi = bilangan yang dibagi). Permainan Periksa dengan Perkalian dan Jodohkan Pembagian dan Perkalian memakai ini.",
        "**Rakit kotak sebagai pembagian terukur**: diketahui total titik dan isi tiap kotak, siswa mencari banyak kotak. Mesin yang sama dengan perkalian dipakai dengan arah berlawanan.",
        "**Pembagian khusus**: bilangan dibagi 1 tetap bilangan itu, dan bilangan dibagi bilangan yang sama hasilnya 1. Soal Ayo Berlatih 1 (4 : 1, 9 : 1, 10 : 10) dipakai langsung.",
        "**Pengecoh dari kesalahan umum**: pilihan jawaban memuat satu kali pengurangan lebih banyak atau lebih sedikit, serta hasil bagi satu lebih atau satu kurang.",
      ],
    },
  },
};

// Kelas 3 Bab 2 (Kalimat Matematika): dua sub-bab.
KONFIG.k3b2 = {
  kelas: 3,
  bab: 2,
  judul: "Kalimat Matematika",
  buku: "Buku Siswa Matematika Kelas III (Kemendikbudristek, Kurikulum Merdeka, Bab 2 hlm. 75–98) dan Buku Panduan Guru Bab 2",
  berkas: { A: "sub-a-kalimat-matematika-penjumlahan", B: "sub-b-kalimat-matematika-pengurangan" },
  metodeLuar: {
    A: [
      "**Bagan bagian-keseluruhan (bar model)**: jumlah semua digambar sebagai batang atas dan dua bagian sebagai batang di bawahnya. Batang yang belum diketahui bertanda tanya. Dasar permainan Hitung Bagan dan Jodohkan Bagan dan Kalimat.",
      "**Operasi kebalikan**: jumlah dikurangi bagian yang diketahui sama dengan bagian yang belum diketahui. Penjumlahan dan pengurangan saling berkaitan, jadi hasilnya diperiksa dengan menjumlahkan lagi.",
      "**Kumpulan benda berbungkus sepuluh**: kalimat Matematika digambar sebagai kumpulan benda dengan kotak bertanda tanya. Permainan Rakit yang Belum Diketahui memakai penukaran sepuluh-ke-satu.",
      "**Titik-titik di depan atau di tengah**: Contoh buku memuat 8 + … = 19 dan … + 16 = 54. Permainan Pilah Bagan melatih membedakan letak titik-titik.",
      "**Banyak kemungkinan (Ayo Berpikir)**: bila hanya jumlahnya yang diketahui, banyak pasangan bilangan mungkin. Permainan Kemungkinan Pasangan Bilangan memakai buku di perpustakaan (100) dan tiket film (95).",
      "**Pengecoh dari kesalahan umum**: pilihan jawaban memuat salah sepuluh (lupa menyimpan atau meminjam) dan salah satu, serta kalimat yang menukar hasil dengan bilangan yang diketahui.",
    ],
    B: [
      "**Bagan bilangan awal dan bagian**: pada pengurangan, batang atas adalah bilangan awal, dan dua batang di bawahnya adalah bagian yang dikurangkan serta sisa. Dasar permainan Hitung Bagan dan Papan Nilai dari Bagan.",
      "**Dua arah operasi kebalikan**: mencari bilangan yang dikurangkan dengan mengurangkan bilangan awal dengan sisa (80 − 45 = 35), dan mencari bilangan awal dengan menambahkan (45 + 27 = 72).",
      "**Kumpulan benda berbungkus sepuluh**: kumpulan awal, bagian yang diambil, dan sisa digambar sebagai kumpulan benda dengan kotak bertanda tanya.",
      "**Titik-titik di depan atau di tengah**: 32 − … = 15 (titik-titik di tengah) dan … − 12 = 26 (titik-titik di depan) memakai cara berbeda. Permainan Pilah Bagan dan Langkah Menyelesaikan melatihnya.",
      "**Banyak kemungkinan (Ayo Berpikir)**: telur di pasar (100) dan televisi di toko (40). Bila hanya bilangan awal yang diketahui, ada banyak pasangan terjual dan sisa yang mungkin.",
      "**Pengecoh dari kesalahan umum**: pilihan jawaban memuat salah sepuluh dan salah satu, serta kalimat yang menukar hasil dengan bilangan yang diketahui atau membalik tanda.",
    ],
  },
};

// Kelas 3 Bab 3 (Pengukuran Panjang dan Berat): Sub-Bab A dan B (panjang), C dan D (berat).
KONFIG.k3b3 = {
  kelas: 3,
  bab: 3,
  judul: "Pengukuran Panjang dan Berat",
  buku: "Buku Siswa Matematika Kelas III (Kemendikbudristek, Kurikulum Merdeka, Bab 3 hlm. 105–140) dan Buku Panduan Guru Bab 3",
  berkas: { A: "sub-a-pengukuran-panjang-satuan-baku", B: "sub-b-hubungan-satuan-panjang", C: "sub-c-pengukuran-berat-satuan-baku", D: "sub-d-hubungan-satuan-berat" },
  metodeLuar: {
    C: [
      "**Timbangan digital dengan benda di atasnya**: telur, stroberi, pensil, buku, permen, dan kunci digambar di atas timbangan dengan layar bertulis gram. Dasar permainan Baca Timbangan Digital dan Papan Berat dalam Gram.",
      "**Timbangan duduk berjarum**: jarum polos dengan satu putaran 5 kg, garis besar tiap kilogram dan garis sedang tiap 500 g. Dasar permainan Baca Timbangan Jarum dan Baca Jarum dalam Kilogram.",
      "**Mulai dari angka nol (miskonsepsi Buku Panduan Guru)**: permainan Timbangan yang Siap dan Ketuk Semua Jarum yang Siap melatih memeriksa jarum di angka 0 sebelum menimbang.",
      "**Gram untuk benda ringan, kilogram untuk benda berat**: benda sehari-hari dipilah ke satuan yang tepat. Pengecoh memakai satuan panjang (sentimeter dan meter) agar siswa membedakan berat dari panjang.",
      "**Memilih timbangan**: timbangan digital, timbangan duduk, dan timbangan badan dihubungkan dengan benda yang ditimbang (sayuran dan buah, berat badan, bahan kue).",
      "**Layar polos di tahap Picture**: benda diganti layar timbangan dan jarum polos tanpa gambar benda. Selisih dua layar memakai soal stroberi 100 g dan 500 g (Ayo Berlatih 2).",
    ],
    D: [
      "**Bandul timbangan kodok**: lima jenis bandul (1/2 ons, 1 ons, 2 ons, 1/2 kg, 1 kg) digambar sebagai logam kuning bertulisan. Mesin Rakit Bandul menjumlahkan beratnya pada layar, banyak jalan benar.",
      "**Kilogram, ons, dan gram**: 1 kg = 1.000 g = 10 ons dan 1 ons = 100 g (kotak ringkasan buku). Permainan Ubah Ons ke Gram memakai papan ratusan, puluhan, dan satuan.",
      "**Mengalikan dan membagi dengan 1.000**: kilogram ke gram dikalikan 1.000, gram ke kilogram dengan mengambil tiap 1.000 g. Pengecoh sengaja memuat lupa mengalikan (× 100) dan salah kali (× 10.000).",
      "**Memecah gram (Pengamatan 2)**: 1.753 g = 1.000 g + 753 g = 1 kg 753 g. Soal 1.200 g = 1 kg 200 g, 3.000 g = 3 kg, dan 4 kg 150 g = 4.150 g (Ayo Berlatih 1) dipakai langsung.",
      "**Garis berat**: batang berwarna pada garis 0 sampai 4 kg dengan penanda tiap 500 g, mirip garis meteran pada Sub-Bab B. Dipakai untuk menghitung, menyelisihkan, dan menyambung berat.",
      "**Soal cerita Ayo Berlatih 2 dan 3**: mangga 8.000 g dijual 4 kg dan dua kantong jeruk 500 g dipakai langsung, ditambah soal beras dan tepung yang menjumlahkan serta mengurangkan kilogram dan gram.",
    ],
    A: [
      "**Penggaris dengan benda nyata di atasnya**: pensil, krayon, penghapus, sendok, dan sikat gigi digambar di atas penggaris 0 sampai 15 cm. Dasar permainan Baca Panjang Benda dan Papan Panjang Benda.",
      "**Geser ke angka nol (Aktivitas 1, langkah 4 dan 5)**: siswa menggeser benda sampai ujung kirinya tepat di angka 0, baru membaca angka di ujung yang lain. Mesin Geser Ukur menolak jawaban sebelum benda sejajar, supaya kesalahan umum (mulai dari angka selain nol) terlihat langsung.",
      "**Batang polos di tahap Picture**: benda diganti batang berwarna tanpa gambar benda. Aturan membaca panjangnya tetap sama sehingga siswa memindahkan keterampilan dari benda ke diagram.",
      "**Memilih alat ukur**: benda sehari-hari (pensil, pintu, jalan, televisi) dipilah ke penggaris atau meteran. Batas 30 cm dipakai pada permainan Pilah Panjang. Timbangan sengaja dipakai sebagai pengecoh agar siswa membedakan panjang dari berat.",
      "**Selisih dua batang**: dua batang pada satu penggaris dibandingkan dan dikurangkan, seperti soal tinggi tanaman (Ayo Berlatih 3).",
      "**Pengecoh dari kesalahan umum**: pilihan jawaban memuat angka di ujung kanan sebelum digeser, satu lebih, dan satu kurang.",
    ],
    B: [
      "**Meteran sebagai garis bilangan**: batang berwarna pada garis meteran 0 sampai 4 m dengan penanda tiap 50 cm. Dasar permainan Hitung Garis Meteran dan Jodohkan Garis dan Ukuran.",
      "**Pita dari potongan meter, sepuluh sentimeter, dan sentimeter**: tiga jenis potongan (merah 100 cm, biru 10 cm, kuning 1 cm) ditukar sepuluh-ke-satu pada mesin Rakit. Cara ini sama dengan tiga kemasan pada Bab 1, sehingga siswa memakai kembali aturan penukaran yang sudah dikenal.",
      "**Mengalikan dan membagi dengan 100**: meter ke sentimeter dikalikan 100, sentimeter ke meter dibagi 100. Pengecoh sengaja memuat lupa mengalikan (×10) dan salah kali (×1.000).",
      "**Tabel tinggi badan (Ayo Berlatih 2)**: tabel Azizah, Ubay, Fatim, Lilik, Eri, dan Sanam dipakai langsung pada permainan Isi Tabel Ubah Ukuran.",
      "**Menjumlahkan dan mengurangkan ukuran gabungan (Ayo Berlatih 3 dan 4)**: meter dijumlahkan atau dikurangkan dengan meter, sentimeter dengan sentimeter. Soal pita 4 m 37 cm dan 7 m 43 cm serta kain katun 75 m 80 cm dipakai langsung.",
      "**Ukuran yang sama ditulis dengan beberapa cara**: 2 m, 200 cm, dan 1 m 100 cm sama panjangnya. Permainan Ketuk Semua yang Sama melatih mengenalinya.",
    ],
  },
};

// Kelas 3 Bab 4 (Unsur-Unsur Bangun Datar): Sub-Bab A (sisi pada bangun datar).
KONFIG.k3b4 = {
  kelas: 3,
  bab: 4,
  judul: "Unsur-Unsur Bangun Datar",
  buku: "Buku Siswa Matematika Kelas III (Kemendikbudristek, Kurikulum Merdeka, Bab 4 hlm. 143–185) dan Buku Panduan Guru Bab 4",
  berkas: { A: "sub-a-sisi-bangun-datar", B: "sub-b-sudut-bidang-datar", C: "sub-c-garis-tegak-lurus-sejajar" },
  metodeLuar: {
    C: [
      "**Benda bergaris**: tangga, pagar, rumah, jendela, rel kereta api, dan tiang bendera digambar dari ruas garis, dengan dua garis disorot merah dan biru. Hubungan dua garis (sejajar, tegak lurus, atau bukan keduanya) DIHITUNG dari koordinat ruas, bukan ditulis tangan.",
      "**Kertas lipat berpetak (Aktivitas 5)**: bekas lipatan merah, biru, hijau, dan kuning digambar pada kertas berpetak. Siswa menentukan hubungan dua lipatan, mengurutkan kertas menurut banyak lipatan, dan menamai bangun di tengah kertas (persegi atau persegi panjang, dihitung dari lebar dan tingginya).",
      "**Kertas berpetak polos di tahap Picture**: sepasang garis merah dan biru pada petak 5 x 5 dengan tanda kotak siku-siku dan anak panah sejajar. Permainan Periksa Jarak Petak meniru contoh buku (jarak 2 petak dan 4 petak): sejajar bila jarak di kedua ujung sama.",
      "**Lambang ⊥ dan //**: AB ⊥ BC dan EF // GH ditulis dari pasangan garis berhuruf. Pengecoh memuat lambang yang tertukar dan pilihan bukan keduanya.",
      "**Bangun datar sederhana (bagian 3 buku)**: segitiga, persegi, persegi panjang, segilima, dan lingkaran digambar polos. Ciri dan banyak sisi serta sudut dihitung dari data, termasuk lingkaran yang dibatasi garis lengkung dan tanpa sudut.",
      "**Garis sejajar dan tegak lurus di sekitar**: soal cerita memakai pagar (lima tiang membentuk empat pasang), tangga, dan persegi panjang. Soal 'berapa petak di ujung kanan' menegaskan jarak garis sejajar selalu sama.",
    ],
    B: [
      "**Strip sudut dari karton (Aktivitas 2)**: dua strip dengan pengait diputar dengan tombol atau penggeser. Acuan berupa garis putus agar siswa membandingkan sudut lebih besar atau lebih kecil tanpa angka. Mesin PutarSudut memeriksa syarat, bukan angka bebas.",
      "**Pojok kertas lipat (Aktivitas 3)**: sudut siku-siku dibentuk dengan menempatkan strip tepat pada pojok kertas yang dilipat dua kali. Sudut lurus dibentuk dari dua sudut siku-siku sehingga kedua strip menjadi satu garis.",
      "**Benda yang dibuka**: buku, pintu, dan gunting digambar membuka pada berbagai sudut. Dipakai untuk membandingkan bukaan, mengurutkan, dan menentukan jenis sudut sebelum siswa memakai angka derajat.",
      "**Irisan pizza sebagai satuan tidak baku**: sudut yang sama ditutupi irisan besar (3 satuan) lalu irisan kecil (6 satuan), sesuai gambar buku, supaya terasa perlunya satuan baku (derajat).",
      "**Busur derajat polos di tahap Picture**: busur dengan skala luar dan skala dalam, kaki OA di kanan atau kiri. Pengecoh sengaja memuat bacaan dari skala yang salah (180° dikurangi kunci) dan kunci lebih 10°.",
      "**Menggambar sudut dan pasangan 360°**: permainan Gambar Sudut dengan Busur Derajat meniru contoh sudut 50° di buku. Soal cerita memuat sudut lurus 180°, dua sudut siku-siku, dan pasangan sudut refleks yang berjumlah 360°.",
    ],
    A: [
      "**Benda nyata yang menyerupai bangun datar**: buku, bingkai foto, kartu, televisi, ponsel, penggaris segitiga, rambu, dan rambu berhenti dipakai untuk menghitung sisi. Benda bundar (jam, kue, papan sasaran) sengaja dipakai sebagai pengecoh karena tidak punya sisi lurus.",
      "**Titik, garis, sinar garis, ruas garis, dan kurva**: sinar senter, rel kereta api, pensil, penggaris, dan pelangi dihubungkan dengan jenisnya. Di tahap Picture hanya gambar garis polos berhuruf yang dipakai.",
      "**Mengukur ruas garis dalam cm dan mm**: penggaris dengan garis milimeter dipakai untuk membaca panjang seperti 5 cm 5 mm. Panjang benda dan ruas garis dibatasi kelipatan 5 mm dan paling banyak 14,5 cm agar mudah dibaca.",
      "**Hubungan 1 cm = 10 mm**: dipakai untuk mengubah 5 cm 5 mm menjadi 55 mm atau 5,5 cm. Pengecoh sengaja memuat salah seratus (1 cm = 100 mm) dan salah nol (3 cm 7 mm = 3,07 cm).",
      "**Sisi bangun datar bernama huruf**: segitiga EFG memiliki sisi EF, FG, dan EG. Permainan Sisi Bangun Datar melatih menyebut semua sisi dengan titik sudut yang bersebelahan.",
      "**Bangun datar polos di tahap Picture**: segitiga, persegi, segilima, segienam, dan segidelapan digambar sebagai diagram polos tanpa gambar benda. Tabel dan ketuk bangun melatih banyak sisi.",
    ],
  },
};

// Kelas 3 Bab 5 (Penyajian Data dalam Tabel): Sub-Bab A dan B.
KONFIG.k3b5 = {
  kelas: 3,
  bab: 5,
  judul: "Penyajian Data dalam Tabel",
  buku: "Buku Siswa Matematika Kelas III (Kemendikbudristek, Kurikulum Merdeka, Bab 5 hlm. 195–212) dan Buku Panduan Guru Bab 5",
  berkas: { A: "sub-a-mengurutkan-membandingkan-data", B: "sub-b-menyajikan-data-bentuk-tabel" },
  metodeLuar: {
    A: [
      "**Jangkauan (range)**: data terbesar dikurangi data terkecil, diperkaya dari istilah statistik dasar sebelum rata-rata diajarkan.",
      "**Turus/tally marks**: mengingat turus Kelas 2, lalu dipakai untuk mencacah frekuensi nilai ulangan.",
      "**Frekuensi nilai**: berapa kali sebuah nilai muncul (misalnya nilai 9 muncul lima kali) sebelum masuk tabel lengkap.",
      "**Mengurutkan data**: dari terkecil ke terbesar memudahkan mencari data terkecil, terbesar, dan jangkauan.",
      "**Perbandingan tumpukan benda**: anak dengan banyak benda berbeda dipakai sebagai model konkret sebelum turus dan angka.",
      "**Pilah menurut ambang**: sedikit (<5), sedang (5–7), banyak (>7) melatih membandingkan tanpa menghitung jangkauan dulu.",
    ],
    B: [
      "**Turus kelompok lima**: empat garis tegak dicoret satu garis miring (standar tally marks internasional).",
      "**Tabel tiga kolom**: kategori/nilai, turus, dan banyak — pola standar penyajian frekuensi di SD.",
      "**Dari benda ke tabel**: lidi dan manik dicacah dulu, lalu diganti turus dan angka.",
      "**Tabel huruf**: kata STATISTIKA dan MATEMATIKA dari buku dipakai untuk melatih frekuensi huruf.",
      "**Membaca tabel**: pertanyaan lebih dari, kurang dari, terbanyak, dan tersedikit dijawab dari kolom banyak.",
      "**Titik kelompok lima**: diagram titik polos (Picture) tanpa gambar benda, mengikuti batas Concrete–Picture.",
    ],
  },
};

KONFIG.k4b1 = {
  kelas: 4,
  bab: 1,
  judul: "Bilangan Cacah sampai 10.000",
  buku: "Buku Siswa Matematika Kelas IV (Kemendikbudristek, Kurikulum Merdeka, Bab 1 hlm. 4–24) Sub-Bab A–C",
  berkas: { A: "sub-a-membaca-menulis", B: "sub-b-nilai-tempat", C: "sub-c-membandingkan-mengurutkan" },
  metodeLuar: {
    A: [
      "**Balok Dienes empat tingkat**: peti (1.000), dus (100), bungkus (10), benda (1) memperluas model Kelas 3 ke ribuan.",
      "**Papan nilai tempat empat kolom berwarna**: ribuan ungu, ratusan hijau, puluhan biru, satuan merah.",
      "**Kartu angka empat digit**: menyusun lambang bilangan dengan empat kartu pada empat tempat.",
      "**Miskonsepsi nol di tengah**: 7.003, 1.025, 6.570 dilatih agar nol menjaga tempat tanpa dibaca.",
      "**Penukaran sepuluh dus = satu peti**: aturan ribuan tampak langsung saat merakit.",
      "**Contoh kontekstual buku**: harga minimarket 6.750, jarak 3.286 m, tinggi Gunung Semeru 3.676 m.",
    ],
    B: [
      "**Expanded form empat suku**: 2.150 = 2.000 + 100 + 50 + 0.",
      "**Angka vs nilai tempat**: 2 di ribuan bernilai 2.000, bukan 2.",
      "**Tabel nilai tempat**: mengisi nilai tiap kolom dari model blok.",
      "**Detektif nilai tempat**: petunjuk nilai menyisakan satu bilangan.",
      "**Garis bilangan nilai**: mengetuk nilai angka pada garis skala ribuan.",
      "**Uraian kata**: dari uraian ke lambang dan sebaliknya.",
    ],
    C: [
      "**Bandingkan dari kiri (ribuan dulu)**: aturan place-value comparison standar.",
      "**Tanda mulut buaya**: > dan < menghadap bilangan lebih besar.",
      "**Urut naik/turun empat bilangan**: memilih terkecil berulang.",
      "**Gunung Semeru dan saudara**: 2.460, 3.676, 3.726 dari buku.",
      "**Tempat yang menentukan**: bila ribuan sama, lihat ratusan, lalu puluhan.",
      "**Detektif perbandingan**: petunjuk lebih/kurang menyisakan satu bilangan.",
    ],
  },
};

const kode = process.argv[2];
if (!kode || !KONFIG[kode]) {
  console.error(`Pakai: node --no-warnings scripts/buat-naskah-md.mjs <${Object.keys(KONFIG).join("|")}>`);
  process.exit(1);
}
const cfg = KONFIG[kode];
const KODE = kode.toUpperCase();
const N = await import(`../src/components/modul/naskah-${kode}.ts`);
const meta = N[`${KODE}_META`];
const subBab = N[`SUB_BAB_${KODE}`];
const awalan = `mtk-${cfg.kelas}-bab${cfg.bab}`;

function tulisSub(s) {
  const L = [];
  const jumlahAdegan = s.videos.reduce((n, v) => n + v.adegan.length, 0);
  L.push(`# Naskah Matematika Kelas ${cfg.kelas} SD, Bab ${cfg.bab}: ${cfg.judul}, ${s.fullTitle}`);
  L.push("");
  L.push(`Berkas ini ditulis dari satu sumber, \`src/components/modul/naskah-${kode}.ts\` dan \`src/components/modul/data-${kode}.ts\`, oleh \`scripts/buat-naskah-md.mjs\`. Isi mengikuti ${cfg.buku}, serta diperkaya dengan metode dari luar buku. **Hanya Materi.** Soal Latihan, soal Ujian, dan Simulasi sengaja belum dibuat atas instruksi pemilik; keduanya akan ditugaskan terpisah. Kunci jawaban Latihan dan Ujian tidak ada di berkas ini.`);
  L.push("");
  L.push("## 1. Identitas modul");
  L.push("");
  L.push(`- Kode bab: \`${meta.chapterId}\`, ${meta.phaseCode}, kelas ${meta.grade}.`);
  L.push(`- Judul: ${meta.title}. ${s.fullTitle}.`);
  L.push(`- Suara Guru: Web Speech API perangkat saja, laju ${meta.suaraLaju} dan nada ${meta.suaraNada}. Tanpa ElevenLabs.`);
  L.push(`- Isi: ${s.videos.length} video cerita (${jumlahAdegan} adegan), ${s.mindMaps.length} langkah peta pikiran, ${s.infografis.length} panel infografis, ${s.games.length} permainan (10 Concrete, 10 Picture, 10 Abstract), ${s.poin.length} poin penting.`);
  L.push("");
  L.push("## 2. Tujuan belajar");
  L.push("");
  L.push(s.targetDescription);
  L.push("");
  L.push(`- Capaian Pembelajaran: ${s.silabus.cp}`);
  L.push(`- Acuan: ${s.silabus.referensi}`);
  L.push("");
  L.push("## 3. Metode dari luar buku");
  L.push("");
  for (const m of cfg.metodeLuar[s.id]) L.push(`- ${m}`);
  L.push("");
  L.push("## 4. Tahap 1: Story (video cerita animasi SVG)");
  L.push("");
  L.push("Tiap video diputar satu per satu saat siswa mengetuk Putar. Tidak ada yang berjalan sendiri. Kalimat dibacakan Suara Guru satu per satu (ketukan), dan gambar berubah mengikuti ketukan.");
  L.push("");
  for (const v of s.videos) {
    L.push(`### ${v.id}. ${v.judul} (${v.subjudul})`);
    L.push("");
    for (const a of v.adegan) {
      L.push(`**${a.id}. ${a.judul}**`);
      L.push("");
      a.ketukan.forEach((k, i) => L.push(`${i + 1}. ${k} *(papan: ${a.papan[i]})*`));
      L.push("");
    }
  }
  L.push("## 5. Tahap 2: Mind map (peta pikiran)");
  L.push("");
  for (const m of s.mindMaps) {
    L.push(`**${m.stepTitle}** ${m.icon} (${m.flowFrom} → ${m.flowTo})`);
    L.push("");
    L.push(m.stepDesc);
    L.push("");
  }
  L.push("## 6. Tahap 3: Infografis");
  L.push("");
  s.infografis.forEach((p, i) => {
    L.push(`${i + 1}. **${p.judul}** ${p.emoji}: ${p.suara}`);
  });
  L.push("");
  const tahap = [["Concrete", "7. Tahap 4: Concrete (benda nyata)"], ["Picture", "8. Tahap 5: Picture (diagram)"], ["Abstract", "9. Tahap 6: Abstract (kata dan angka)"]];
  let nomor = 1;
  for (const [st, judul] of tahap) {
    L.push(`## ${judul}`);
    L.push("");
    L.push("| No | Permainan | Jenis | Acuan buku | Tujuan | Cara main |");
    L.push("|---|---|---|---|---|---|");
    for (const g of s.games.filter((x) => x.stage === st)) {
      L.push(`| ${nomor} | ${g.title} | \`${g.gameType}\` | ${g.bookReference} | ${g.objective} | ${g.mechanicDescription} |`);
      nomor += 1;
    }
    L.push("");
  }
  L.push("## 10. Poin penting, cara, kegiatan di rumah, dan refleksi");
  L.push("");
  for (const p of s.poin) L.push(`- ${p.ikon} **${p.nama}**: ${p.isi}. *Suara:* ${p.suara}`);
  L.push("");
  L.push(`Ringkasan suara: ${s.poinSuara}`);
  L.push("");
  L.push(`Cara menyebutkan: ${s.cara.suara} (${s.cara.potongan.map((x) => x.teks).join(", ")})`);
  L.push("");
  L.push(`Ayo Mencoba di rumah: ${s.rumah.replace(/^Ayo Mencoba di rumah:\s*/, "")}`);
  L.push("");
  L.push("Refleksi:");
  for (const r of s.refleksi) L.push(`- ${r}`);
  L.push("");
  return L.join("\n");
}

function tulisVideo() {
  const L = [];
  L.push(`# Video cerita Matematika Kelas ${cfg.kelas} SD, Bab ${cfg.bab}: ${cfg.judul}`);
  L.push("");
  L.push(`Daftar semua video cerita animasi HTML/SVG gratis (tanpa berkas video, tanpa API). Ditulis dari \`src/components/modul/naskah-${kode}.ts\` oleh \`scripts/buat-naskah-md.mjs\`. Tiap video diputar satu per satu saat siswa mengetuk Putar.`);
  L.push("");
  for (const s of subBab) {
    L.push(`## ${s.fullTitle}`);
    L.push("");
    L.push("| Video | Judul | Subjudul | Adegan |");
    L.push("|---|---|---|---|");
    for (const v of s.videos) L.push(`| ${v.id} | ${v.judul} | ${v.subjudul} | ${v.adegan.map((a) => a.judul).join("; ")} |`);
    L.push("");
  }
  return L.join("\n");
}

fs.mkdirSync("naskah", { recursive: true });
for (const s of subBab) {
  const nama = `naskah/${awalan}-${cfg.berkas[s.id]}.md`;
  fs.writeFileSync(nama, tulisSub(s));
  console.log(`tulis ${nama}`);
}
const namaVideo = `naskah/${awalan}-video-cerita.md`;
fs.writeFileSync(namaVideo, tulisVideo());
console.log(`tulis ${namaVideo}`);
