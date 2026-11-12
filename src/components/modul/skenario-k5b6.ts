import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 5 Bab 6 (Sudut). Tanpa jaringan, tanpa model bahasa.
 * Kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k5b6.mjs (dihitung ulang mandiri).
 *  - SKENARIO_K5B6A: Bingkai Pak Tukang (sudut siku-siku, patokan lipatan, membandingkan pojok dengan patokan)
 *  - SKENARIO_K5B6B: Yohana dan Kotak Pensil (titik sudut, kaki sudut, lancip, siku-siku, tumpul, sudut jarum jam)
 *  - SKENARIO_K5B6C: Kipas Tari Pakarena (satuan derajat, memasang dan membaca busur, sudut nol, lurus, penuh, releks)
 */

export const SKENARIO_K5B6A: DefSkenario = {
  id: "tukang-bingkai-k5b6",
  judul: "Bingkai Pak Tukang",
  latar: "Bantu Pak Tukang memeriksa pojok bingkai foto.",
  tokoh: "👷",
  nama: "Pak Tukang",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Pak Tukang. Hari ini aku membuat bingkai foto, dan pojoknya harus tepat siku-siku. Ayo bantu aku memeriksa pojok dengan patokan!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "arti",
      jenis: "pilih",
      cerita: "Pak Tukang bertanya, sudut siku-siku itu yang bagaimana?",
      opsi: [
        { teks: "pojok yang lebih sempit dari patokan", benar: false, umpan: "Pojok yang lebih sempit dari patokan belum siku-siku. Siku-siku itu tepat berimpit dengan patokan." },
        { teks: "pojok yang lebih lebar dari patokan", benar: false, umpan: "Pojok yang lebih lebar dari patokan juga belum siku-siku. Siku-siku itu tepat berimpit dengan patokan." },
        { teks: "pojok yang tepat berimpit dengan patokan, besarnya 90°", benar: true, umpan: "Betul! Sudut siku-siku besarnya 90° dan tepat berimpit dengan patokan." },
      ],
    },
    {
      id: "lipat",
      jenis: "soal",
      cerita: "Pak Tukang tidak membawa penggaris siku. Ia membuat patokan dari selembar kertas yang dilipat dua kali.",
      soal: [
        { teks: "Besar sudut siku-siku adalah … derajat.", jawaban: "90", opsi: ["45", "90", "180"] },
        { teks: "Lipatan kedua menimpa lipatan pertama sampai berimpit. Banyak lipatan yang dibutuhkan untuk patokan adalah … kali.", jawaban: "2", opsi: ["1", "2", "3"] },
      ],
      sukses: "Hebat! Dua lipatan yang berimpit rapi membuat pojok patokan siku-siku, besarnya 90°.",
      salah: "Hmm, ingat sudut siku-siku dan lipatan kertasnya. Coba lagi.",
    },
    {
      id: "bingkai",
      jenis: "hitung",
      cerita: "Bingkai foto berbentuk persegi panjang. Tiap pojok yang siku-siku diberi satu stik.",
      tanya: "Ketuk semua stik. Ada berapa pojok siku-siku pada bingkai itu?",
      objek: "stik",
      jumlah: 4,
      sukses: "Betul! Persegi panjang punya 4 pojok siku-siku, dan semuanya cocok dengan patokan.",
      salah: "Hmm, ketuk tiap stik sekali saja, lalu hitung lagi.",
    },
    {
      id: "segitiga",
      jenis: "isi",
      cerita: "Penggaris segitiga punya 3 pojok, dan hanya 1 pojok siku-siku. Masukkan satu stik untuk tiap pojok yang bukan siku-siku.",
      objek: "stik",
      target: 2,
      maks: 5,
      sukses: "Pas! 3 pojok dikurangi 1 pojok siku-siku, tinggal 2 pojok yang bukan siku-siku.",
      kurang: "Stiknya masih sedikit. Dari 3 pojok, 1 pojok siku-siku.",
      lebih: "Stiknya kebanyakan. Pojok siku-siku tidak ikut dihitung.",
    },
    {
      id: "cek",
      jenis: "pilih",
      cerita: "Pak Tukang menempelkan patokan di pojok bingkai yang miring. Sisi pojok itu masuk ke dalam patokan. Pojok itu …",
      opsi: [
        { teks: "lancip, karena lebih sempit dari patokan", benar: true, umpan: "Betul! Sisi yang masuk ke dalam patokan berarti lebih sempit, yaitu lancip. Pojok itu harus diganti." },
        { teks: "tumpul, karena lebih sempit dari patokan", benar: false, umpan: "Lebih sempit dari patokan itu lancip. Tumpul itu lebih lebar dari patokan." },
        { teks: "siku-siku, karena berimpit dengan patokan", benar: false, umpan: "Sisinya tidak berimpit, tetapi masuk ke dalam patokan. Jadi bukan siku-siku." },
      ],
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Sudut siku-siku besarnya 90° dan tepat berimpit dengan patokan. Pojok yang lebih sempit dari patokan disebut lancip, dan yang lebih lebar disebut tumpul. Periksa pojok dengan patokan lipatan atau penggaris siku, jangan hanya menebak.",
    },
  ],
};

export const SKENARIO_K5B6B: DefSkenario = {
  id: "yohana-pensil-k5b6",
  judul: "Yohana dan Kotak Pensil",
  latar: "Bantu Yohana mengenali bagian dan jenis sudut.",
  tokoh: "👧",
  nama: "Yohana",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Yohana. Aku bertanya-tanya, apakah pojok kotak pensilku termasuk sudut? Ayo kita cari tahu bagian dan jenis sudut bersama!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "arti",
      jenis: "pilih",
      cerita: "Yohana bertanya, sudut itu apa?",
      opsi: [
        { teks: "garis yang melengkung panjang", benar: false, umpan: "Garis yang melengkung bukan sudut. Sudut dibentuk oleh dua garis yang bertemu di satu titik." },
        { teks: "daerah yang dibentuk dua garis yang bertemu di satu titik", benar: true, umpan: "Betul! Sudut adalah daerah yang dibentuk oleh dua garis yang bertemu di satu titik." },
        { teks: "satu titik tanpa garis", benar: false, umpan: "Satu titik saja belum sudut. Sudut punya titik sudut dan dua garis, yaitu kaki sudut." },
      ],
    },
    {
      id: "bagian",
      jenis: "soal",
      cerita: "Yohana menggambar huruf V. Dua garisnya bertemu di bagian bawah huruf.",
      soal: [
        { teks: "Titik tempat dua garis bertemu disebut titik …", jawaban: "sudut", opsi: ["tengah", "sudut", "ujung"] },
        { teks: "Dua garis yang membentuk sudut disebut … sudut.", jawaban: "kaki", opsi: ["kaki", "tangan", "sisi"] },
      ],
      sukses: "Hebat! Titik pertemuan disebut titik sudut, dan dua garisnya disebut kaki sudut.",
      salah: "Hmm, ingat huruf V: titik di bawah dan dua garis. Coba lagi.",
    },
    {
      id: "kaki",
      jenis: "hitung",
      cerita: "Gunting yang terbuka punya 2 kaki sudut, dan jam dinding juga punya 2 kaki sudut dari dua jarumnya. Tiap kaki sudut diberi satu stik.",
      tanya: "Ketuk semua stik. Ada berapa kaki sudut pada gunting dan jam dinding seluruhnya?",
      objek: "stik",
      jumlah: 4,
      sukses: "Betul! 2 kaki sudut ditambah 2 kaki sudut, seluruhnya 4 kaki sudut.",
      salah: "Hmm, ketuk tiap stik sekali saja, lalu hitung lagi.",
    },
    {
      id: "segitiga",
      jenis: "isi",
      cerita: "Yohana menggambar segitiga. Di setiap pojok segitiga ada satu titik sudut. Masukkan satu stik untuk tiap titik sudut.",
      objek: "stik",
      target: 3,
      maks: 6,
      sukses: "Pas! Segitiga punya 3 pojok, jadi ada 3 titik sudut.",
      kurang: "Stiknya masih sedikit. Hitung semua pojok segitiga.",
      lebih: "Stiknya kebanyakan. Satu pojok hanya punya satu titik sudut.",
    },
    {
      id: "jam",
      jenis: "pilih",
      cerita: "Yohana melihat jam dinding pukul dua. Sudut antara kedua jarum lebih sempit dari patokan siku-siku. Sudut itu …",
      opsi: [
        { teks: "tumpul, karena lebih lebar dari patokan", benar: false, umpan: "Lebih sempit dari patokan itu lancip, bukan tumpul. Tumpul itu lebih lebar dari patokan." },
        { teks: "siku-siku, karena berimpit dengan patokan", benar: false, umpan: "Sudutnya lebih sempit dari patokan, tidak berimpit. Jadi bukan siku-siku." },
        { teks: "lancip, karena lebih sempit dari patokan", benar: true, umpan: "Betul! Sudut yang lebih sempit dari patokan siku-siku disebut lancip." },
      ],
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Sudut punya satu titik sudut dan dua kaki sudut. Sudut yang lebih sempit dari siku-siku disebut lancip, yang tepat siku-siku besarnya 90°, dan yang lebih lebar disebut tumpul.",
    },
  ],
};

export const SKENARIO_K5B6C: DefSkenario = {
  id: "pakarena-k5b6",
  judul: "Kipas Tari Pakarena",
  latar: "Bantu Sitti mengukur sudut kipas dengan busur derajat.",
  tokoh: "💃",
  nama: "Sitti",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Sitti, penari Pakarena dari Sulawesi Selatan. Kipas lipatku bisa dibuka sempit atau lebar. Ayo kita ukur sudut kipas dengan busur derajat!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "satuan",
      jenis: "pilih",
      cerita: "Sitti bertanya, satuan apa yang dipakai untuk mengukur besar sudut?",
      opsi: [
        { teks: "derajat, ditulis dengan tanda °", benar: true, umpan: "Betul! Besar sudut diukur dalam derajat, ditulis dengan tanda °." },
        { teks: "sentimeter, ditulis cm", benar: false, umpan: "Sentimeter dipakai untuk panjang. Besar sudut diukur dalam derajat." },
        { teks: "liter, ditulis L", benar: false, umpan: "Liter dipakai untuk isi. Besar sudut diukur dalam derajat." },
      ],
    },
    {
      id: "busur",
      jenis: "soal",
      cerita: "Sitti memasang busur derajat pada sudut kipasnya. Ia mengikuti urutan pemasangan dengan teliti.",
      soal: [
        { teks: "Pusat busur diletakkan tepat pada … sudut.", jawaban: "titik", opsi: ["kaki", "titik", "daerah"] },
        { teks: "Garis dasar busur berimpit dengan salah satu … sudut.", jawaban: "kaki", opsi: ["titik", "kaki", "daerah"] },
      ],
      sukses: "Hebat! Pusat busur di titik sudut, dan garis dasarnya berimpit dengan kaki pertama.",
      salah: "Hmm, ingat urutan memasang busur: pusat di titik sudut, dasar berimpit kaki. Coba lagi.",
    },
    {
      id: "baca",
      jenis: "soal",
      cerita: "Kaki pertama berimpit pada angka nol. Sitti membaca angka yang ditunjuk kaki kedua pada skala yang mulai dari nol.",
      soal: [
        { teks: "Kaki kedua kipas menunjuk 125. Ukuran sudut kipas adalah … derajat.", jawaban: "125", opsi: ["55", "125", "180"] },
        { teks: "Pada jam pukul tiga, sudut antara kedua jarum adalah … derajat.", jawaban: "90", opsi: ["30", "90", "180"] },
      ],
      sukses: "Betul! Ukuran sudut dibaca dari nol di kaki pertama, dan pukul tiga tepat siku-siku, 90°.",
      salah: "Hmm, baca angka dari nol di kaki pertama. Coba lagi.",
    },
    {
      id: "patokan",
      jenis: "hitung",
      cerita: "Sitti menandai sudut patokan dengan stik: 0°, 90°, 180°, dan 360°. Tiap patokan satu stik.",
      tanya: "Ketuk semua stik. Ada berapa sudut patokan yang Sitti tandai?",
      objek: "stik",
      jumlah: 4,
      sukses: "Betul! Ada 4 sudut patokan: nol, siku-siku, lurus, dan penuh.",
      salah: "Hmm, ketuk tiap stik sekali saja, lalu hitung lagi.",
    },
    {
      id: "penuh",
      jenis: "isi",
      cerita: "Sudut penuh 360° terbentuk dari sudut lurus 180°. Masukkan satu stik untuk tiap sudut lurus yang membentuk satu sudut penuh.",
      objek: "stik",
      target: 2,
      maks: 5,
      sukses: "Pas! 180° ditambah 180° sama dengan 360°, jadi 2 sudut lurus membentuk satu sudut penuh.",
      kurang: "Stiknya masih sedikit. Hitung berapa 180° yang dibutuhkan sampai 360°.",
      lebih: "Stiknya kebanyakan. 180° ditambah 180° sudah 360°.",
    },
    {
      id: "releks",
      jenis: "pilih",
      cerita: "Sitti membuka kipas sangat lebar sampai sudutnya 270°. Sudut itu lebih dari 180° dan kurang dari 360°. Sudut itu disebut …",
      opsi: [
        { teks: "sudut tumpul", benar: false, umpan: "Tumpul itu kurang dari 180°. Sudut 270° lebih dari 180°, jadi releks." },
        { teks: "sudut lurus", benar: false, umpan: "Sudut lurus tepat 180°. Sudut 270° lebih besar, jadi releks." },
        { teks: "sudut releks, bukan tumpul", benar: true, umpan: "Betul! Lebih dari 180° dan kurang dari 360° adalah sudut releks. Tumpul masih kurang dari 180°." },
      ],
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Sudut diukur dengan busur derajat dalam satuan derajat. Pasang pusat busur di titik sudut, dasar berimpit dengan kaki pertama, lalu baca angka kaki kedua dari nol. Ingat patokan 0°, 90°, 180°, dan 360°, dan sudut releks di antara 180° dan 360°.",
    },
  ],
};
