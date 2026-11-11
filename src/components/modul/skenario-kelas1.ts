import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario kontekstual Matematika Kelas 1. Tiap bab punya cerita, tokoh, angka, dan urutan pilihan sendiri.
 * Bab 8 punya skenario khusus (skenario-pesta-bab8.ts) karena memakai mesin data tersendiri.
 *
 * Aturan angka: Bab 1 sampai 10. Bab 2 dan 3 sampai 10. Bab 4 tanpa hitungan besar. Bab 6 sampai 20. Bab 7 satuan tak baku.
 * Diperiksa oleh scripts/uji-skenario-umum.mjs: jawaban ada di pilihan, hasil hitung benar, satu pilihan benar per adegan.
 */

export const SKENARIO_BAB1: DefSkenario = {
  id: "kasir-warung",
  judul: "Kasir Warung Bu Ani",
  latar: "Bantu Bu Ani melayani pembeli di warungnya.",
  tokoh: "👩‍🍳",
  nama: "Bu Ani",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Selamat datang di warung! Aku Bu Ani. Hari ini warungku ramai. Bantu aku menghitung dan menyiapkan pesanan, ya.",
      tombol: "Siap membantu! ➡",
    },
    {
      id: "hitung-apel",
      jenis: "hitung",
      cerita: "Pembeli pertama, Dina, membeli apel. Hitung apel di rak dengan menunjuknya satu per satu.",
      tanya: "Ada berapa apel di rak?",
      objek: "apel",
      jumlah: 7,
      sukses: "Betul, tujuh apel! Dina senang.",
    },
    {
      id: "isi-jeruk",
      jenis: "isi",
      cerita: "Pembeli kedua, Budi, minta 5 jeruk. Isi keranjangnya dengan 5 jeruk.",
      objek: "jeruk",
      target: 5,
      maks: 10,
      sukses: "Pas lima jeruk! Budi tersenyum.",
      kurang: "Jerukmu masih kurang. Budi menunggu, tambah lagi.",
      lebih: "Jerukmu kelebihan. Budi hanya minta lima, kurangi sedikit.",
    },
    {
      id: "banding-mangga",
      jenis: "pilih",
      cerita: "Dua kantong mangga sudah siap. Kantong merah berisi 6 mangga. Kantong biru berisi 9 mangga. Siti minta kantong yang isinya lebih banyak. Kantong mana yang kamu berikan?",
      opsi: [
        { teks: "Kantong merah, isi 6 mangga", benar: false, umpan: "Enam lebih sedikit dari sembilan. Siti ingin yang lebih banyak. Coba lagi." },
        { teks: "Kantong biru, isi 9 mangga", benar: true, umpan: "Betul! Sembilan lebih banyak dari enam. Siti senang." },
        { teks: "Dua-duanya sama saja", benar: false, umpan: "Isinya tidak sama: enam dan sembilan. Bandingkan lagi." },
      ],
    },
    {
      id: "urutan-rak",
      jenis: "soal",
      cerita: "Menjelang tutup, Bu Ani menempel nomor di rak buah, mulai dari 1.",
      soal: [
        { teks: "Setelah 6, nomor berapa yang berikutnya?", jawaban: "7", opsi: ["6", "7", "8"] },
        { teks: "Nomor berapa yang ada sebelum 9?", jawaban: "8", opsi: ["8", "10", "9"] },
        { teks: "Nomor berapa yang ada setelah 9?", jawaban: "10", opsi: ["8", "9", "10"] },
      ],
      sukses: "Bu Ani bertepuk tangan. Semua urutan nomornya benar.",
    },
    { id: "akhir", jenis: "akhir", cerita: "Warung sudah tutup. Terima kasih, kasir hebat! Kamu pandai membilang sampai sepuluh." },
  ],
};

export const SKENARIO_BAB2: DefSkenario = {
  id: "kantin",
  judul: "Kantin Sekolah Pak Rudi",
  latar: "Bantu Pak Rudi menjumlahkan jajanan di kantin sekolah.",
  tokoh: "👨‍🍳",
  nama: "Pak Rudi",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Pak Rudi, penjaga kantin. Ada anak-anak yang mau jajan. Bantu aku menjumlahkan jajanan mereka, ya.",
      tombol: "Ayo ke kantin! ➡",
    },
    {
      id: "gabung",
      jenis: "soal",
      cerita: "Rani membeli 4 kue lapis dan 3 kue talam.",
      soal: [{ teks: "4 kue ditambah 3 kue. Semuanya berapa kue?", jawaban: "7", opsi: ["6", "7", "8"] }],
      sukses: "Betul, tujuh kue. Rani membawanya ke meja.",
      salah: "Coba hitung dengan jarimu. Mulai dari 4, lalu maju 3 kali.",
    },
    {
      id: "isi-permen",
      jenis: "isi",
      cerita: "Dodi membeli permen: 5 permen merah dan 3 permen kuning. Isi keranjang dengan semua permen yang dibeli Dodi.",
      objek: "bola-merah",
      target: 8,
      maks: 10,
      sukses: "Lima ditambah tiga sama dengan delapan. Pas!",
      kurang: "Ingat, lima ditambah tiga. Permennya masih kurang.",
      lebih: "Permennya kelebihan. Lima ditambah tiga tidak sebanyak itu.",
    },
    {
      id: "cukup-uang",
      jenis: "pilih",
      cerita: "Ina membawa 8 koin. Roti harganya 3 koin, teh 4 koin, dan jus 6 koin. Ina ingin membeli dua barang, dan uangnya harus cukup. Pilih dua barang yang tepat.",
      opsi: [
        { teks: "Teh dan jus (4 + 6 = 10 koin)", benar: false, umpan: "Sepuluh koin lebih banyak dari delapan koin milik Ina. Uangnya tidak cukup." },
        { teks: "Roti dan teh (3 + 4 = 7 koin)", benar: true, umpan: "Cukup! Tujuh koin kurang dari delapan koin. Ina senang." },
        { teks: "Roti dan jus (3 + 6 = 9 koin)", benar: false, umpan: "Sembilan koin lebih banyak dari delapan koin milik Ina. Uangnya tidak cukup." },
      ],
    },
    {
      id: "uji",
      jenis: "soal",
      cerita: "Sebelum pulang, Pak Rudi menguji kamu.",
      soal: [
        { teks: "2 + 5 = …", jawaban: "7", opsi: ["7", "6", "8"] },
        { teks: "Dodi makan 3 kue, lalu makan 6 kue lagi. Semuanya berapa kue?", jawaban: "9", opsi: ["8", "10", "9"] },
        { teks: "5 + 5 = …", jawaban: "10", opsi: ["9", "10", "8"] },
      ],
      sukses: "Pak Rudi tersenyum. Semua jumlahnya benar.",
    },
    { id: "akhir", jenis: "akhir", cerita: "Kantin sudah rapi. Terima kasih, kasir kantin! Kamu pandai menjumlahkan." },
  ],
};

export const SKENARIO_BAB3: DefSkenario = {
  id: "pesta-jeruk",
  judul: "Pesta Jeruk Tika",
  latar: "Bantu Bu Lina menghitung sisa jeruk di pesta ulang tahun.",
  tokoh: "👩",
  nama: "Bu Lina",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Hari ini Tika berulang tahun. Aku Bu Lina. Teman-teman Tika mengambil jeruk dari meja. Bantu aku menghitung sisa jeruknya, ya.",
      tombol: "Mulai pesta! ➡",
    },
    {
      id: "sisa",
      jenis: "soal",
      cerita: "Di meja ada 9 jeruk. Teman-teman Tika mengambil 4 jeruk.",
      soal: [{ teks: "9 jeruk, diambil 4 jeruk. Sisanya berapa jeruk?", jawaban: "5", opsi: ["6", "4", "5"] }],
      sukses: "Betul, sisa lima jeruk.",
      salah: "Bayangkan sembilan jeruk, lalu coret empat. Berapa yang tersisa?",
    },
    {
      id: "hitung-sisa",
      jenis: "hitung",
      cerita: "Bu Lina memindahkan jeruk yang masih utuh ke piring besar. Hitung dengan menunjuknya.",
      tanya: "Berapa jeruk di piring besar?",
      objek: "jeruk",
      jumlah: 6,
      sukses: "Betul, enam jeruk. Piringnya siap dibawa ke tamu.",
    },
    {
      id: "isi-sisa",
      jenis: "isi",
      cerita: "Dari 10 jeruk, 7 jeruk sudah dimakan. Isi keranjang dengan jeruk yang tersisa.",
      objek: "jeruk",
      target: 3,
      maks: 10,
      sukses: "Sepuluh dikurangi tujuh sama dengan tiga. Pas!",
      kurang: "Masih kurang. Sepuluh dikurangi tujuh, sisanya berapa?",
      lebih: "Terlalu banyak. Sepuluh dikurangi tujuh, sisanya lebih sedikit.",
    },
    {
      id: "kalimat",
      jenis: "pilih",
      cerita: "Bu Lina punya 8 jeruk. Sebanyak 5 jeruk diberikan kepada tamu. Pilih kalimat pengurangan yang cocok dengan cerita ini.",
      opsi: [
        { teks: "8 − 3 = 6", benar: false, umpan: "Delapan dikurangi tiga bukan enam. Lagi pula, jeruk yang diberikan ada lima." },
        { teks: "5 − 3 = 2", benar: false, umpan: "Itu cerita yang lain. Di sini jeruk Bu Lina ada delapan." },
        { teks: "8 − 5 = 3", benar: true, umpan: "Betul! Delapan jeruk, diberikan lima, tersisa tiga." },
      ],
    },
    {
      id: "uji",
      jenis: "soal",
      cerita: "Sebelum pesta selesai, Bu Lina menguji kamu.",
      soal: [
        { teks: "7 − 2 = …", jawaban: "5", opsi: ["4", "5", "6"] },
        { teks: "Ada 6 balon, 4 balon pecah. Sisa berapa balon?", jawaban: "2", opsi: ["3", "2", "1"] },
        { teks: "10 − 6 = …", jawaban: "4", opsi: ["4", "5", "3"] },
      ],
      sukses: "Bu Lina bertepuk tangan. Semua jawabanmu benar.",
    },
    { id: "akhir", jenis: "akhir", cerita: "Pesta selesai. Terima kasih, anak pintar! Kamu pandai mengurangi." },
  ],
};

export const SKENARIO_BAB4: DefSkenario = {
  id: "arsitek-cilik",
  judul: "Arsitek Cilik",
  latar: "Bantu Pak Arsitek membangun rumah mainan dari berbagai bentuk.",
  tokoh: "👷",
  nama: "Pak Arsitek",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Pak Arsitek. Aku membangun rumah mainan dari berbagai bentuk. Bantu aku memilih bentuk yang tepat, ya.",
      tombol: "Ayo membangun! ➡",
    },
    {
      id: "atap",
      jenis: "pilih",
      cerita: "Untuk atap rumah, aku butuh bentuk yang punya 3 sisi lurus dan 3 sudut. Bentuk apa itu?",
      opsi: [
        { teks: "Persegi", benar: false, umpan: "Persegi punya empat sisi. Atap kita butuh tiga sisi. Coba lagi." },
        { teks: "Segitiga", benar: true, umpan: "Betul! Segitiga punya tiga sisi dan tiga sudut. Cocok untuk atap." },
        { teks: "Lingkaran", benar: false, umpan: "Lingkaran tidak punya sisi lurus dan sudut. Coba lagi." },
      ],
    },
    {
      id: "jendela",
      jenis: "pilih",
      cerita: "Untuk jendela, aku butuh bentuk yang punya 4 sisi sama panjang dan 4 sudut. Bentuk apa itu?",
      opsi: [
        { teks: "Persegi panjang", benar: false, umpan: "Persegi panjang punya empat sisi, tetapi dua sisinya lebih panjang. Kita butuh empat sisi yang sama panjang." },
        { teks: "Segitiga", benar: false, umpan: "Segitiga hanya punya tiga sisi. Coba lagi." },
        { teks: "Persegi", benar: true, umpan: "Betul! Persegi punya empat sisi sama panjang dan empat sudut." },
      ],
    },
    {
      id: "ciri",
      jenis: "soal",
      cerita: "Aku memeriksa ciri bentuk di rumah ini.",
      soal: [
        { teks: "Berapa jumlah sisi segitiga?", jawaban: "3", opsi: ["4", "3", "5"] },
        { teks: "Berapa jumlah sudut persegi?", jawaban: "4", opsi: ["3", "4", "0"] },
        { teks: "Bentuk apa yang tidak punya sudut?", jawaban: "Lingkaran", opsi: ["Lingkaran", "Persegi", "Segitiga"] },
      ],
      sukses: "Pak Arsitek mengacungkan jempol. Semua ciri bentuknya benar.",
    },
    {
      id: "gabung-bentuk",
      jenis: "pilih",
      cerita: "Aku punya dua segitiga siku-siku yang sama besar. Jika sisi miringnya direkatkan menjadi satu, bentuk baru apa yang terjadi?",
      opsi: [
        { teks: "Lingkaran", benar: false, umpan: "Segitiga hanya punya sisi lurus. Gabungannya tidak bisa melengkung." },
        { teks: "Bentuk dengan sisi melengkung", benar: false, umpan: "Sisi segitiga lurus semua. Gabungannya juga bersisi lurus." },
        { teks: "Persegi panjang atau persegi", benar: true, umpan: "Betul! Dua segitiga siku-siku yang sama bisa menjadi persegi panjang atau persegi." },
      ],
    },
    { id: "akhir", jenis: "akhir", cerita: "Rumah mainan selesai. Terima kasih, arsitek cilik! Kamu pandai mengenali bentuk." },
  ],
};

export const SKENARIO_BAB6: DefSkenario = {
  id: "pasar-malam",
  judul: "Loket Pasar Malam",
  latar: "Bantu Kak Tiket menghitung tiket di pasar malam.",
  tokoh: "🧑‍🔧",
  nama: "Kak Tiket",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Selamat datang di pasar malam! Aku Kak Tiket. Banyak tiket yang dibeli dan dipakai hari ini. Bantu aku menghitungnya, ya.",
      tombol: "Buka loket! ➡",
    },
    {
      id: "jumlah",
      jenis: "soal",
      cerita: "Dina membeli 8 tiket wahana dan 5 tiket permainan.",
      soal: [{ teks: "8 + 5 = …", jawaban: "13", opsi: ["12", "13", "14"] }],
      sukses: "Betul, tiga belas tiket!",
      salah: "Coba genapkan dulu ke sepuluh: 8 ditambah 2 jadi 10, lalu tambah 3 lagi.",
    },
    {
      id: "cara",
      jenis: "pilih",
      cerita: "Kak Tiket ingin menghitung 9 + 6 dengan cepat dan pasti. Cara mana yang paling tepat?",
      opsi: [
        { teks: "Menebak saja, mungkin 17", benar: false, umpan: "Menebak belum tentu benar. Pakai cara yang pasti." },
        { teks: "Menghitung 6 saja, hasilnya 6", benar: false, umpan: "Sembilan juga harus dihitung. Tambahkan 9 dan 6." },
        { teks: "9 + 1 = 10, lalu 10 + 5 = 15", benar: true, umpan: "Betul! Genapkan 9 jadi 10 dulu, lalu tambahkan sisanya." },
      ],
    },
    {
      id: "isi-bola",
      jenis: "isi",
      cerita: "Pak Joko membeli 15 bola hadiah: 9 bola dari kotak biru dan 6 bola dari kotak merah. Isi keranjang dengan semua bolanya.",
      objek: "bola-biru",
      target: 15,
      maks: 20,
      sukses: "Sembilan ditambah enam sama dengan lima belas. Pas!",
      kurang: "Bolanya masih kurang. Sembilan ditambah enam, jumlahnya berapa?",
      lebih: "Bolanya kelebihan. Sembilan ditambah enam tidak sebanyak itu.",
    },
    {
      id: "kurang",
      jenis: "soal",
      cerita: "Setelah wahana selesai, tiket yang tersisa dihitung.",
      soal: [
        { teks: "15 − 6 = …", jawaban: "9", opsi: ["8", "9", "10"] },
        { teks: "13 − 5 = …", jawaban: "8", opsi: ["9", "7", "8"] },
        { teks: "Selisih 17 dan 12 adalah …", jawaban: "5", opsi: ["6", "5", "4"] },
      ],
      sukses: "Kak Tiket mengacungkan jempol. Semua hitunganmu benar.",
    },
    {
      id: "selisih",
      jenis: "pilih",
      cerita: "Kemarin terjual 12 tiket. Hari ini terjual 18 tiket. Kak Tiket ingin tahu, hari ini lebih banyak berapa tiket. Pilih kalimat yang tepat.",
      opsi: [
        { teks: "18 − 12 = 6, lebih banyak 6 tiket", benar: true, umpan: "Betul! Selisihnya 6. Hari ini 6 tiket lebih banyak." },
        { teks: "12 − 18 = 6", benar: false, umpan: "Bilangan yang dikurangi harus bilangan yang lebih besar. 12 lebih kecil dari 18." },
        { teks: "18 − 12 = 5", benar: false, umpan: "Hitung lagi. Delapan belas dikurangi dua belas bukan lima." },
      ],
    },
    { id: "akhir", jenis: "akhir", cerita: "Loket sudah ditutup. Terima kasih, penjaga loket! Kamu pandai menghitung sampai dua puluh." },
  ],
};

export const SKENARIO_BAB7: DefSkenario = {
  id: "pita-kado",
  judul: "Pita untuk Kado",
  latar: "Bantu Kak Dewi mengukur dan memilih pita untuk kado.",
  tokoh: "🧑‍🎨",
  nama: "Kak Dewi",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Kak Dewi. Aku mau membungkus kado dan butuh pita yang panjangnya tepat. Bantu aku mengukur dan memilih, ya.",
      tombol: "Ayo mengukur! ➡",
    },
    {
      id: "banding",
      jenis: "soal",
      cerita: "Kotak kado panjangnya 6 stik. Pita biru panjangnya 4 stik. Pita merah panjangnya 6 stik. Pita hijau panjangnya 9 stik.",
      soal: [
        { teks: "Pita mana yang paling pendek?", jawaban: "Biru", opsi: ["Merah", "Biru", "Hijau"] },
        { teks: "Pita mana yang sama panjang dengan kotak?", jawaban: "Merah", opsi: ["Hijau", "Biru", "Merah"] },
        { teks: "Pita hijau lebih panjang berapa stik dari pita merah?", jawaban: "3", opsi: ["4", "3", "2"] },
      ],
      sukses: "Kak Dewi tersenyum. Semua perbandingannya benar.",
    },
    {
      id: "cara-ukur",
      jenis: "pilih",
      cerita: "Kak Dewi mengukur pita dengan stik es krim. Bagaimana cara menyusun stik yang benar?",
      opsi: [
        { teks: "Stik ditumpuk agar cepat", benar: false, umpan: "Stik yang bertumpuk membuat hasil ukur tidak tepat. Letakkan berderet." },
        { teks: "Stik dimulai dari ujung pita dan disusun rapat tanpa celah", benar: true, umpan: "Betul! Mulai dari ujung, rapat, tidak bertumpuk, tanpa celah." },
        { teks: "Stik dimulai dari tengah pita", benar: false, umpan: "Kalau mulai dari tengah, bagian ujung tidak terukur. Mulailah dari ujung." },
      ],
    },
    {
      id: "hitung-stik",
      jenis: "hitung",
      cerita: "Pita hias diukur dengan stik yang berderet rapat. Hitung stiknya dengan menunjuk satu per satu.",
      tanya: "Berapa stik panjang pita hias?",
      objek: "stik",
      jumlah: 8,
      sukses: "Betul, panjang pita hias delapan stik.",
    },
    {
      id: "isi-stik",
      jenis: "isi",
      cerita: "Pita kecil harus sama panjang dengan 7 stik. Susun stik di keranjang sampai 7.",
      objek: "stik",
      target: 7,
      maks: 10,
      sukses: "Tujuh stik, panjangnya pas!",
      kurang: "Stiknya masih kurang. Tambah lagi.",
      lebih: "Stiknya kelebihan. Kurangi sedikit.",
    },
    {
      id: "pilih-pita",
      jenis: "pilih",
      cerita: "Kotak kado panjangnya 6 stik. Pita harus sedikit lebih panjang dari kotak agar bisa disimpul. Pita A panjangnya 5 stik, pita B 8 stik, pita C 6 stik. Pita mana yang kamu pilih?",
      opsi: [
        { teks: "Pita B, panjangnya 8 stik", benar: true, umpan: "Betul! Delapan stik lebih panjang dari kotak. Cukup untuk simpul." },
        { teks: "Pita A, panjangnya 5 stik", benar: false, umpan: "Lima stik lebih pendek dari kotak. Pitanya tidak cukup." },
        { teks: "Pita C, panjangnya 6 stik", benar: false, umpan: "Enam stik sama dengan kotak. Tidak ada sisa untuk simpul." },
      ],
    },
    { id: "akhir", jenis: "akhir", cerita: "Kado sudah dibungkus rapi. Terima kasih, tukang ukur! Kamu pandai membandingkan dan mengukur panjang." },
  ],
};
