import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 5 Bab 4 (Keliling Bangun Datar). Tanpa jaringan, tanpa model bahasa.
 * Kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k5b4.mjs (dihitung ulang mandiri).
 *  - SKENARIO_K5B4A: Pagar dan Bingkai (keliling sebagai jalur tepi, pagar, bingkai, dibedakan dari isi)
 *  - SKENARIO_K5B4B: Bendera Pita Segitiga (jumlah tiga sisi, sama sisi dikali 3, sama kaki tetap dijumlah)
 *  - SKENARIO_K5B4C: Kebun dan Papan Tulis (dua kali jumlah panjang dan lebar, empat kali sisi, bukan luas)
 *  - SKENARIO_K5B4D: Taman Segi Banyak (banyak sisi dikali sisi, sisi berbeda dijumlah, pola tabel)
 *  - SKENARIO_K5B4E: Denah Rumah Asep dan Komang (pencapaian bab: keliling bukan luas, segitiga, persegi panjang, segi banyak, sekat, bungkus, sisi hilang)
 */

export const SKENARIO_K5B4A: DefSkenario = {
  id: "pagar-bingkai-k5b4",
  judul: "Pagar dan Bingkai",
  latar: "Bantu Ayah dan Ibu menghitung panjang pagar dan bingkai.",
  tokoh: "👨",
  nama: "Ayah",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Ayah. Aku ingin memasang pagar di tepi kebun berbentuk persegi panjang, 6 m dan 4 m. Ibu juga sedang membuat bingkai foto. Ayo bantu kami menghitung kelilingnya!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "kayu",
      jenis: "pilih",
      cerita: "Ayah membeli kayu untuk pagar kebun. Panjang kayu yang dibutuhkan sama dengan …",
      opsi: [
        { teks: "banyak petak rumput di dalam kebun, yaitu isi", benar: false, umpan: "Petak rumput di dalam itu isi. Pagar dipasang di tepi, jadi yang dihitung panjang di tepi." },
        { teks: "banyak sudut kebun", benar: false, umpan: "Banyak sudut tidak memberi panjang kayu. Pagar memanjang di sepanjang tepi kebun." },
        { teks: "jumlah panjang semua sisi di tepi, yaitu keliling", benar: true, umpan: "Betul! Pagar mengelilingi tepi, jadi panjang kayunya sama dengan jumlah panjang semua sisi." },
      ],
    },
    {
      id: "hitung-pagar",
      jenis: "soal",
      cerita: "Ayah menghitung panjang pagar.",
      soal: [
        { teks: "Kebun Ayah 6 m dan 4 m. Panjang pagar seluruhnya adalah … meter.", jawaban: "20", opsi: ["10", "20", "24"] },
        { teks: "Kebun lain berbentuk persegi, sisinya 3 m. Panjang pagarnya adalah … meter.", jawaban: "12", opsi: ["9", "12", "6"] },
      ],
      sukses: "Hebat! Jumlahkan semua sisi di tepi sampai kembali ke awal.",
      salah: "Hmm, berjalanlah di tepi dan jumlahkan semua sisinya. Coba lagi.",
    },
    {
      id: "ruas",
      jenis: "hitung",
      cerita: "Pagar kebun 6 m dan 4 m dipasang dengan ruas sepanjang 1 meter. Tiap ruas diberi satu stik.",
      tanya: "Ketuk semua stik. Ada berapa ruas pagar yang mengelilingi kebun?",
      objek: "stik",
      jumlah: 20,
      sukses: "Betul! Ada 20 ruas, sama dengan 6 + 4 + 6 + 4 = 20 meter.",
      salah: "Hmm, ketuk tiap stik sekali saja, lalu hitung lagi.",
    },
    {
      id: "bingkai",
      jenis: "isi",
      cerita: "Ibu membuat bingkai foto berbentuk persegi, sisinya 3 cm. Masukkan satu stik untuk tiap sentimeter kayu bingkai di seluruh tepi.",
      objek: "stik",
      target: 12,
      maks: 20,
      sukses: "Pas! 3 + 3 + 3 + 3 = 12 cm kayu. Itulah keliling bingkai.",
      kurang: "Stiknya masih sedikit. Bingkai punya empat sisi, tiap sisi 3 cm.",
      lebih: "Stiknya kebanyakan. Jumlahkan empat sisi yang masing-masing 3 cm.",
    },
    {
      id: "bandingkan",
      jenis: "pilih",
      cerita: "Ibu menggambar dua bangun di kertas berpetak. Bangun pertama 5 petak panjang dan 3 petak lebar, bangun kedua 6 petak panjang dan 2 petak lebar. Jalur tepinya 16 cm dan 16 cm, isinya 15 petak dan 12 petak. Pernyataan yang benar adalah …",
      opsi: [
        { teks: "jalur tepinya sama, tetapi isinya berbeda", benar: true, umpan: "Betul! Jalur tepi dan isi adalah dua hal yang berbeda. Jalur sama belum tentu isinya sama." },
        { teks: "isinya sama karena jalur tepinya sama", benar: false, umpan: "Isinya 15 dan 12, jadi tidak sama. Jalur tepi tidak menentukan isi." },
        { teks: "jalur tepinya berbeda karena isinya berbeda", benar: false, umpan: "Jalur tepi keduanya 16 cm, sama. Jalur dihitung dari sisi di tepi, bukan dari isi." },
      ],
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Keliling adalah panjang jalur di tepi bangun, dihitung dengan menjumlah semua sisi sampai kembali ke awal. Pagar dan bingkai memakai keliling, sedangkan isi dihitung dengan petak di dalam.",
    },
  ],
};

export const SKENARIO_K5B4B: DefSkenario = {
  id: "bendera-pita-k5b4",
  judul: "Bendera Pita Segitiga",
  latar: "Bantu Asep menghitung panjang pita di tepi bendera segitiga.",
  tokoh: "👦",
  nama: "Asep",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Asep. Aku membuat bendera berbentuk segitiga untuk lomba sekolah. Pita dipasang di tepi bendera. Ayo bantu aku menghitung panjang pita!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "hitung-pita",
      jenis: "soal",
      cerita: "Asep menghitung pita di tepi bendera.",
      soal: [
        { teks: "Bendera pertama bersisi 5 cm, 4 cm, dan 7 cm. Panjang pita di tepinya adalah … cm.", jawaban: "16", opsi: ["15", "16", "9"] },
        { teks: "Bendera sama sisi bersisi 5 cm. Panjang pita di tepinya adalah … cm.", jawaban: "15", opsi: ["10", "15", "25"] },
      ],
      sukses: "Hebat! Jumlahkan ketiga sisinya, atau kalikan 3 bila ketiga sisinya sama.",
      salah: "Hmm, berjalanlah di tepi dan jumlahkan ketiga sisinya. Coba lagi.",
    },
    {
      id: "alasan",
      jenis: "pilih",
      cerita: "Asep menghitung bendera sama sisi dengan 3 × 5. Mengapa boleh dikali 3?",
      opsi: [
        { teks: "karena ketiga sisinya sama panjang", benar: true, umpan: "Betul! Menjumlah tiga sisi yang sama panjang sama dengan mengalikannya dengan 3." },
        { teks: "karena segitiga hanya punya tiga sudut", benar: false, umpan: "Banyak sudut tidak menentukan cara hitung. Yang menentukan adalah panjang sisinya." },
        { teks: "karena semua segitiga boleh dikali 3", benar: false, umpan: "Tidak semua. Bila sisinya berbeda panjang, dikali 3 memberi hasil yang salah." },
      ],
    },
    {
      id: "pita-enam",
      jenis: "hitung",
      cerita: "Bendera sama sisi bersisi 6 cm. Tiap sentimeter pita diberi satu stik.",
      tanya: "Ketuk semua stik. Ada berapa sentimeter pita di tepi bendera?",
      objek: "stik",
      jumlah: 18,
      sukses: "Betul! Ada 18 sentimeter pita, sama dengan 3 × 6 = 18.",
      salah: "Hmm, ketuk tiap stik sekali saja, lalu hitung lagi.",
    },
    {
      id: "siku",
      jenis: "isi",
      cerita: "Bendera siku-siku bersisi 3 cm, 4 cm, dan 5 cm. Masukkan satu stik untuk tiap sentimeter pita di seluruh tepi.",
      objek: "stik",
      target: 12,
      maks: 20,
      sukses: "Pas! 3 + 4 + 5 = 12 cm pita. Itulah keliling bendera.",
      kurang: "Stiknya masih sedikit. Jumlahkan ketiga sisi: 3, 4, dan 5.",
      lebih: "Stiknya kebanyakan. Jumlahkan ketiga sisi: 3, 4, dan 5.",
    },
    {
      id: "kaki",
      jenis: "pilih",
      cerita: "Bendera sama kaki bersisi 6 cm, 6 cm, dan 4 cm. Asep ingin langsung dikali 3. Bagaimana yang benar?",
      opsi: [
        { teks: "boleh dikali 3 karena ada sisi yang sama", benar: false, umpan: "Dikali 3 memberi 18, padahal sisi ketiga hanya 4 cm. Hanya dua sisi yang sama." },
        { teks: "cukup mengambil satu sisi saja", benar: false, umpan: "Satu sisi bukan seluruh pita. Pita melewati ketiga sisi." },
        { teks: "tidak boleh, jumlahkan ketiga sisinya satu per satu", benar: true, umpan: "Betul! Sama kaki tetap dijumlahkan: kelilingnya 16 cm." },
      ],
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Keliling segitiga adalah jumlah ketiga sisinya. Bila ketiga sisi sama panjang, boleh dikali 3. Pada segitiga sama kaki tetap dijumlahkan, dan sisi yang belum diketahui diukur dulu sebelum dijumlahkan.",
    },
  ],
};

export const SKENARIO_K5B4C: DefSkenario = {
  id: "kebun-papan-k5b4",
  judul: "Kebun dan Papan Tulis",
  latar: "Bantu Komang menghitung keliling kebun dan bingkai papan tulis.",
  tokoh: "🧒",
  nama: "Komang",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Komang. Sekolahku punya kebun berbentuk persegi panjang dan papan kecil berbentuk persegi yang akan diberi bingkai. Ayo bantu aku menghitung kelilingnya!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "hitung-keliling",
      jenis: "soal",
      cerita: "Komang menghitung keliling bangun di sekolah.",
      soal: [
        { teks: "Kebun Komang panjangnya 5 m dan lebarnya 3 m. Keliling kebun adalah … meter.", jawaban: "16", opsi: ["8", "15", "16"] },
        { teks: "Taman berbentuk persegi, sisinya 3 m. Keliling taman adalah … meter.", jawaban: "12", opsi: ["9", "12", "6"] },
      ],
      sukses: "Hebat! Persegi panjang dihitung dengan dua kali jumlah panjang dan lebar, persegi dengan empat kali sisi.",
      salah: "Hmm, ingat ada dua panjang dan dua lebar, dan panjang dikali lebar adalah luas. Coba lagi.",
    },
    {
      id: "alasan",
      jenis: "pilih",
      cerita: "Komang menghitung keliling kebun dengan 2 × (5 + 3). Mengapa jumlah panjang dan lebar dikali 2?",
      opsi: [
        { teks: "karena kebun punya dua sudut", benar: false, umpan: "Banyak sudut tidak menentukan cara hitung. Yang menentukan adalah panjang sisinya." },
        { teks: "karena ada dua panjang dan dua lebar", benar: true, umpan: "Betul! Sisi yang berhadapan sama panjang, jadi jalur tepi punya dua panjang dan dua lebar." },
        { teks: "karena luas harus dikali 2", benar: false, umpan: "Ini keliling, bukan luas. Dikali 2 karena sisinya berpasangan." },
      ],
    },
    {
      id: "ruas",
      jenis: "hitung",
      cerita: "Pagar kebun lain, 7 m dan 2 m, dipasang dengan ruas sepanjang 1 meter. Tiap ruas diberi satu stik.",
      tanya: "Ketuk semua stik. Ada berapa ruas pagar yang mengelilingi kebun?",
      objek: "stik",
      jumlah: 18,
      sukses: "Betul! Ada 18 ruas, sama dengan 2 × (7 + 2) = 18 meter.",
      salah: "Hmm, ketuk tiap stik sekali saja, lalu hitung lagi.",
    },
    {
      id: "bingkai",
      jenis: "isi",
      cerita: "Papan persegi itu bersisi 5 dm. Masukkan satu stik untuk tiap desimeter kayu bingkai di seluruh tepi.",
      objek: "stik",
      target: 20,
      maks: 20,
      sukses: "Pas! 4 × 5 = 20 dm kayu. Itulah keliling bingkai persegi.",
      kurang: "Stiknya masih sedikit. Persegi punya empat sisi sama panjang, tiap sisi 5 dm.",
      lebih: "Stiknya kebanyakan. Persegi punya empat sisi sama panjang, tiap sisi 5 dm.",
    },
    {
      id: "luas",
      jenis: "pilih",
      cerita: "Komang menghitung keliling kebun 8 m dan 4 m dengan 8 × 4 = 32. Apakah hitungannya benar?",
      opsi: [
        { teks: "benar, panjang dikali lebar adalah keliling", benar: false, umpan: "Panjang dikali lebar adalah luas, banyak petak di dalam, bukan jalur di tepi." },
        { teks: "salah, kelilingnya 12 m karena hanya panjang ditambah lebar", benar: false, umpan: "Panjang ditambah lebar baru setengah jalur. Masih harus dikali 2." },
        { teks: "salah, itu luas, kelilingnya 24 m", benar: true, umpan: "Betul! 32 adalah luas. Keliling kebun adalah 2 × (8 + 4) = 24 meter." },
      ],
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Keliling persegi panjang adalah dua kali jumlah panjang dan lebar, dan keliling persegi adalah empat kali sisi. Panjang dikali lebar adalah luas, bukan keliling.",
    },
  ],
};

export const SKENARIO_K5B4D: DefSkenario = {
  id: "taman-segibanyak-k5b4",
  judul: "Taman Segi Banyak",
  latar: "Bantu Ibu menghitung keliling taman dan kolam berbentuk segi banyak.",
  tokoh: "👩",
  nama: "Ibu",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Ibu. Taman sekolah punya kolam dan petak berbentuk segi banyak. Sebagian sisinya sama panjang, sebagian berbeda. Ayo bantu aku menghitung kelilingnya!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "hitung-keliling",
      jenis: "soal",
      cerita: "Ibu menghitung keliling segi banyak beraturan.",
      soal: [
        { teks: "Petak segi lima beraturan, tiap sisinya 3 m. Kelilingnya adalah … meter.", jawaban: "15", opsi: ["8", "15", "9"] },
        { teks: "Kolam segi enam beraturan, tiap sisinya 4 m. Kelilingnya adalah … meter.", jawaban: "24", opsi: ["10", "16", "24"] },
      ],
      sukses: "Hebat! Bila semua sisi sama panjang, keliling adalah banyak sisi dikali panjang sisi.",
      salah: "Hmm, kalikan banyak sisi dengan panjang satu sisi. Coba lagi.",
    },
    {
      id: "beda",
      jenis: "pilih",
      cerita: "Sebuah petak segi lima punya sisi 2 m, 3 m, 4 m, 5 m, dan 6 m. Ibu ingin menghitungnya dengan 5 × 2. Apakah benar?",
      opsi: [
        { teks: "benar, segi lima selalu dikali 5", benar: false, umpan: "Dikali 5 hanya bila kelima sisi sama panjang. Di sini sisinya berbeda." },
        { teks: "salah, sisinya berbeda jadi semua sisi dijumlah", benar: true, umpan: "Betul! Sisinya tidak sama panjang, jadi 2 + 3 + 4 + 5 + 6 = 20 meter." },
        { teks: "salah, cukup menjumlah dua sisi", benar: false, umpan: "Dua sisi baru sebagian jalur. Segi lima punya lima sisi, semuanya dijumlah." },
      ],
    },
    {
      id: "pagar",
      jenis: "hitung",
      cerita: "Taman segi enam beraturan bersisi 3 m dipagari. Tiap meter pagar diberi satu stik.",
      tanya: "Ketuk semua stik. Ada berapa meter pagar yang mengelilingi taman?",
      objek: "stik",
      jumlah: 18,
      sukses: "Betul! Ada 18 meter pagar, sama dengan 6 × 3 = 18.",
      salah: "Hmm, ketuk tiap stik sekali saja, lalu hitung lagi.",
    },
    {
      id: "lampu",
      jenis: "isi",
      cerita: "Kolam segi delapan beraturan bersisi 2 m dihias lampu. Masukkan satu stik untuk tiap meter tepi kolam.",
      objek: "stik",
      target: 16,
      maks: 20,
      sukses: "Pas! 8 × 2 = 16 meter tepi kolam. Itulah kelilingnya.",
      kurang: "Stiknya masih sedikit. Kolam punya delapan sisi, tiap sisi 2 m.",
      lebih: "Stiknya kebanyakan. Kolam punya delapan sisi, tiap sisi 2 m.",
    },
    {
      id: "pola",
      jenis: "pilih",
      cerita: "Ibu mengisi tabel keliling segi beraturan bersisi 2 m: segi lima 10 m, segi enam 12 m, segi delapan 16 m. Pola apa yang terlihat?",
      opsi: [
        { teks: "keliling sama dengan banyak sisi dikali panjang sisi", benar: true, umpan: "Betul! Tiap bertambah satu sisi, keliling bertambah 2 meter." },
        { teks: "keliling sama dengan banyak sisi ditambah panjang sisi", benar: false, umpan: "Segi lima menjadi 5 + 2 = 7, padahal kelilingnya 10 meter." },
        { teks: "keliling selalu sama berapa pun banyak sisinya", benar: false, umpan: "Keliling 10, 12, dan 16 berbeda. Makin banyak sisi, makin panjang kelilingnya." },
      ],
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Pada segi banyak beraturan, keliling adalah banyak sisi dikali panjang sisi. Bila sisinya tidak sama panjang, jumlahkan semua sisinya satu per satu.",
    },
  ],
};

export const SKENARIO_K5B4E: DefSkenario = {
  id: "denah-rumah-k5b4",
  judul: "Denah Rumah Asep dan Komang",
  latar: "Bantu Asep dan Komang menghitung keliling denah rumah, pencapaian Bab Keliling.",
  tokoh: "👦",
  nama: "Asep",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Asep, dan ini temanku Komang. Kami menggambar denah rumah dari beberapa bangun datar yang digabung. Ayo bantu kami menghitung keliling, dari bangun sederhana sampai denah gabungan!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "pagar",
      jenis: "pilih",
      cerita: "Komang ingin memasang pagar mengelilingi rumah. Panjang pagar yang dibutuhkan sama dengan …",
      opsi: [
        { teks: "banyak petak lantai rumah, yaitu luas", benar: false, umpan: "Petak lantai di dalam itu luas. Pagar dipasang di tepi, jadi yang dihitung panjang di tepi." },
        { teks: "panjang jalur di batas luar, yaitu keliling", benar: true, umpan: "Betul! Pagar mengelilingi batas luar, jadi panjangnya sama dengan keliling." },
        { teks: "banyak sudut denah", benar: false, umpan: "Banyak sudut tidak memberi panjang pagar. Pagar mengikuti jalur di tepi." },
      ],
    },
    {
      id: "bangun",
      jenis: "soal",
      cerita: "Asep dan Komang menghitung keliling bangun penyusun denah.",
      soal: [
        { teks: "Bendera segitiga sama sisi bersisi 5 m. Kelilingnya adalah … meter.", jawaban: "15", opsi: ["10", "15", "25"] },
        { teks: "Meja persegi panjang 5 m dan 3 m. Kelilingnya adalah … meter.", jawaban: "16", opsi: ["8", "15", "16"] },
        { teks: "Kolam segi enam beraturan bersisi 4 m. Kelilingnya adalah … meter.", jawaban: "24", opsi: ["10", "16", "24"] },
      ],
      sukses: "Hebat! Segitiga sama sisi dikali 3, persegi panjang dua kali jumlah panjang dan lebar, segi enam beraturan dikali 6.",
      salah: "Hmm, ingat cara tiap bangun: jumlahkan sisi, atau kalikan bila sisinya sama. Coba lagi.",
    },
    {
      id: "sekat",
      jenis: "pilih",
      cerita: "Denah rumah berbentuk L punya sekat dalam antar kamar. Apakah sekat ikut dijumlah ke keliling rumah?",
      opsi: [
        { teks: "ya, semua garis di denah dijumlah", benar: false, umpan: "Sekat dalam bukan batas luar. Bila ikut dijumlah, hasilnya terlalu panjang." },
        { teks: "ya, tetapi hanya sekat yang pendek", benar: false, umpan: "Sekat sepanjang apa pun tetap berada di dalam denah, jadi tidak dijumlah." },
        { teks: "tidak, sekat bukan batas luar", benar: true, umpan: "Betul! Keliling gabungan hanya menjumlah sisi luar, sekat dalam diabaikan." },
      ],
    },
    {
      id: "luar",
      jenis: "hitung",
      cerita: "Denah rumah Komang dibungkus persegi panjang 10 m dan 5 m dan tidak punya lekukan ke dalam. Tiap meter batas luar diberi satu stik.",
      tanya: "Ketuk semua stik. Ada berapa meter batas luar rumah?",
      objek: "stik",
      jumlah: 30,
      sukses: "Betul! Ada 30 meter, sama dengan 2 × (10 + 5) = 30.",
      salah: "Hmm, ketuk tiap stik sekali saja, lalu hitung lagi.",
    },
    {
      id: "hilang",
      jenis: "isi",
      cerita: "Pada denah L, sisi atas 12 m sejajar dengan sisi bawah 6 m. Sisi yang hilang adalah selisihnya. Masukkan satu stik untuk tiap meter sisi yang hilang.",
      objek: "stik",
      target: 6,
      maks: 12,
      sukses: "Pas! 12 − 6 = 6 m. Setelah sisi hilang dilengkapi, semua sisi luar dijumlah.",
      kurang: "Stiknya masih sedikit. Sisi hilang adalah sisi besar 12 dikurangi sisi kecil 6.",
      lebih: "Stiknya kebanyakan. Sisi hilang adalah sisi besar 12 dikurangi sisi kecil 6.",
    },
    {
      id: "jumlah",
      jenis: "soal",
      cerita: "Sekarang semua sisi luar denah L sudah lengkap: 12 m, 4 m, 6 m, 2 m, 6 m, dan 6 m.",
      soal: [
        { teks: "Jumlah semua sisi luar denah L adalah … meter.", jawaban: "36", opsi: ["28", "36", "46"] },
        { teks: "Denah L dibungkus persegi panjang 12 m dan 6 m. Keliling pembungkusnya … meter.", jawaban: "36", opsi: ["18", "36", "72"] },
      ],
      sukses: "Hebat! Denah L tidak punya lekukan ke dalam, jadi kelilingnya sama dengan keliling pembungkus, 36 meter.",
      salah: "Hmm, jumlahkan sisi luar saja, atau hitung dengan pembungkus. Coba lagi.",
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Keliling adalah jalur di batas luar, bukan luas. Segitiga sama sisi dikali 3, persegi panjang dua kali jumlah panjang dan lebar, segi beraturan dikali banyak sisi. Pada denah gabungan, jumlahkan hanya sisi luar, abaikan sekat dalam, lengkapi sisi hilang dengan selisih, dan bungkus bila tidak ada lekukan ke dalam.",
    },
  ],
};
