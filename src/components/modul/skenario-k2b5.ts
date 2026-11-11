import type { DefSkenario } from "./skenario-umum";

/**
 * Tiga skenario Kelas 2 Bab 5 (Pecahan). Tanpa jaringan, tanpa gambar benda (hanya teks), jadi tidak melanggar
 * batas Concrete dan Picture.
 *  - SKENARIO_K2B5A: Roti Bu Lili (Sub-Bab A, setengah dari benda utuh: dua bagian sama besar).
 *  - SKENARIO_K2B5B: Bagi Adil di Kebun Tika (Sub-Bab B, setengah dari kumpulan: genap bisa, ganjil tidak).
 *  - SKENARIO_K2B5C: Kue Ulang Tahun Upe (Sub-Bab C, seperempat; sub-bab akhir, ikut mengingat setengah).
 */

export const SKENARIO_K2B5A: DefSkenario = {
  id: "roti-bu-lili-k2b5",
  judul: "Roti Bu Lili",
  latar: "Bantu Bu Lili membagi roti dan kue menjadi dua bagian yang sama besar.",
  tokoh: "👩‍🍳",
  nama: "Bu Lili",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Bu Lili, pembuat roti. Hari ini ada dua anak yang minta roti. Aku ingin membaginya dengan adil. Mari bantu aku, ya.",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "adil",
      jenis: "pilih",
      cerita: "Aku punya satu roti utuh untuk dua anak. Cara memotong yang mana yang adil?",
      opsi: [
        { teks: "Dipotong dua, satu bagian besar dan satu bagian kecil", benar: false, umpan: "Anak yang mendapat bagian kecil pasti merasa tidak adil. Bagian yang adil harus sama besar." },
        { teks: "Dipotong menjadi dua bagian yang sama besar", benar: true, umpan: "Betul! Dua bagian sama besar disebut setengah. Setiap anak mendapat setengah roti." },
        { teks: "Dipotong menjadi tiga bagian", benar: false, umpan: "Untuk dua anak, kita butuh dua bagian. Tiga bagian akan membuat satu bagian berlebih." },
      ],
    },
    {
      id: "nama",
      jenis: "soal",
      cerita: "Sekarang kita pakai kata yang tepat. Ingat, dua bagian sama besar disebut setengah.",
      soal: [
        { teks: "Roti dibagi dua sama besar. Satu bagian disebut …", jawaban: "setengah", opsi: ["seperempat", "setengah", "satu utuh"] },
        { teks: "Dua bagian setengah disatukan lagi menjadi …", jawaban: "satu utuh", opsi: ["satu utuh", "seperempat", "tiga bagian"] },
        { teks: "Setengah ditulis dengan lambang …", jawaban: "½", opsi: ["¼", "1", "½"] },
      ],
      sukses: "Hebat! Setengah adalah satu dari dua bagian yang sama besar, dan dua setengah menjadi satu utuh lagi.",
      salah: "Hmm, ingat: dua bagian yang sama besar, satu bagiannya setengah. Coba lagi pelan-pelan.",
    },
    {
      id: "lipat",
      jenis: "pilih",
      cerita: "Bu Lili melipat selembar kertas pembungkus persegi, ujung bertemu ujung, lalu menggunting di lipatannya. Bagaimana kedua potongan kertas itu?",
      opsi: [
        { teks: "Sama besar, karena kalau ditumpuk akan pas", benar: true, umpan: "Betul! Lipatan yang tepat membuat dua bagian saling menutupi. Itu tandanya sama besar." },
        { teks: "Yang kiri lebih besar", benar: false, umpan: "Ujung kertas bertemu pas, jadi tidak ada sisi yang lebih besar. Coba tumpuk kedua potongan itu." },
        { teks: "Tidak bisa dibandingkan", benar: false, umpan: "Bisa! Tumpuk kedua potongan itu. Kalau pas, berarti sama besar." },
      ],
    },
    {
      id: "tidak-sama",
      jenis: "soal",
      cerita: "Kadang potongan tidak sama besar. Ayo periksa tiga kue ini.",
      soal: [
        { teks: "Kue dibagi dua, satu bagian lebih besar. Apakah keduanya setengah?", jawaban: "Bukan, bagiannya tidak sama besar", opsi: ["Ya, keduanya setengah", "Bukan, bagiannya tidak sama besar", "Ya, asal rasanya sama"] },
        { teks: "Kue dibagi empat sama besar. Apakah satu bagiannya setengah?", jawaban: "Bukan, bagiannya ada empat", opsi: ["Bukan, bagiannya ada empat", "Ya, satu bagian itu setengah", "Ya, karena sama besar"] },
        { teks: "Pizza dipotong lurus tepat lewat tengah menjadi dua bagian. Apakah setiap bagiannya setengah?", jawaban: "Ya, dua bagian sama besar", opsi: ["Bukan, pizza tidak bisa dibagi", "Ya, dua bagian sama besar", "Bukan, karena bulat"] },
      ],
      sukses: "Pintar! Setengah hanya untuk tepat dua bagian yang sama besar. Dua bagian tidak sama besar bukan setengah.",
      salah: "Hmm, periksa dua hal: ada dua bagian, dan keduanya sama besar. Coba lagi.",
    },
    {
      id: "akhir",
      jenis: "akhir",
      cerita: "Terima kasih! Berkat kamu, kedua anak mendapat roti yang adil. Kamu sudah paham: setengah adalah satu dari dua bagian yang sama besar.",
    },
  ],
};

export const SKENARIO_K2B5B: DefSkenario = {
  id: "bagi-adil-kebun-k2b5",
  judul: "Bagi Adil di Kebun Tika",
  latar: "Bantu Tika membagi hasil kebun menjadi dua kelompok sama banyak. Kadang bisa, kadang tidak.",
  tokoh: "👧",
  nama: "Tika",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Tika. Hari ini aku memetik buah dan sayur di kebun. Aku ingin membagi hasilnya untuk dua adikku, supaya sama banyak. Mari bantu aku.",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "cara",
      jenis: "pilih",
      cerita: "Aku punya 8 apel untuk dua adik. Cara membagi yang paling mudah dicek adalah …",
      opsi: [
        { teks: "Memberikan semuanya untuk adik yang paling kecil", benar: false, umpan: "Itu tidak adil. Kita ingin dua kelompok sama banyak." },
        { teks: "Membagi satu-satu bergantian untuk adik pertama dan adik kedua", benar: true, umpan: "Betul! Bagi satu-satu bergantian. Kalau semua habis dan sama banyak, itulah setengahnya." },
        { teks: "Menaruh sebanyak mungkin di satu kantong", benar: false, umpan: "Cara itu membuat satu kantong lebih banyak. Bagi satu-satu bergantian saja." },
      ],
    },
    {
      id: "setengah",
      jenis: "soal",
      cerita: "Dua kelompok sama banyak. Jumlah di satu kelompok adalah setengah dari semuanya.",
      soal: [
        { teks: "Setengah dari 10 jeruk adalah …", jawaban: "5", opsi: ["4", "5", "6"] },
        { teks: "Setengah dari 12 pensil adalah …", jawaban: "6", opsi: ["6", "5", "7"] },
        { teks: "Setengah dari 2 balon adalah …", jawaban: "1", opsi: ["0", "2", "1"] },
      ],
      sukses: "Tepat! Setengah dari kumpulan adalah banyak benda di satu kelompok, kalau dibagi dua sama banyak.",
      salah: "Hmm, bagi dua sama banyak. Cari bilangan yang kalau dijumlahkan dengan dirinya sendiri sama dengan semuanya.",
    },
    {
      id: "ganjil",
      jenis: "pilih",
      cerita: "Aku punya 9 jeruk. Bisakah aku membaginya untuk dua adik dengan sama banyak? Mana yang benar?",
      opsi: [
        { teks: "Setiap adik 5 jeruk", benar: false, umpan: "Dua kali 5 adalah 10, padahal jeruknya hanya 9." },
        { teks: "Setiap adik 4 jeruk, tidak ada yang tersisa", benar: false, umpan: "Dua kali 4 adalah 8, bukan 9. Masih ada satu jeruk yang belum terbagi." },
        { teks: "Setiap adik 4 jeruk, dan 1 jeruk tersisa, karena 9 ganjil", benar: true, umpan: "Betul! Bilangan ganjil tidak bisa dibagi dua sama banyak. Selalu ada satu yang tersisa." },
      ],
    },
    {
      id: "genap-ganjil",
      jenis: "soal",
      cerita: "Terakhir, periksa kumpulan mana yang bisa dibagi dua sama banyak.",
      soal: [
        { teks: "Mana yang bisa dibagi dua sama banyak?", jawaban: "8 pensil", opsi: ["7 pensil", "9 pensil", "8 pensil"] },
        { teks: "Mana yang tidak bisa dibagi dua sama banyak?", jawaban: "11 balon", opsi: ["10 balon", "11 balon", "12 balon"] },
      ],
      sukses: "Pintar! Bilangan genap bisa dibagi dua sama banyak. Bilangan ganjil selalu tersisa satu.",
      salah: "Hmm, coba pasangkan bendanya satu-satu. Kalau ada yang tidak punya pasangan, berarti ganjil.",
    },
    {
      id: "akhir",
      jenis: "akhir",
      cerita: "Terima kasih! Berkat kamu, adik-adikku mendapat bagian yang adil. Setengah dari kumpulan ada bila bendanya bisa dibagi dua sama banyak.",
    },
  ],
};

export const SKENARIO_K2B5C: DefSkenario = {
  id: "kue-ulang-tahun-upe-k2b5",
  judul: "Kue Ulang Tahun Upe",
  latar: "Bantu Upe memotong kue ulang tahun untuk empat teman, dengan bagian sama besar.",
  tokoh: "🧒",
  nama: "Upe",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Upe, hari ini aku berulang tahun. Ada satu kue bulat untuk empat teman. Aku ingin setiap teman mendapat bagian yang sama besar. Ayo bantu aku.",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "potong",
      jenis: "pilih",
      cerita: "Bagaimana cara memotong kue supaya empat teman mendapat bagian yang sama besar?",
      opsi: [
        { teks: "Dipotong menjadi empat bagian dengan ukuran berbeda-beda", benar: false, umpan: "Teman yang mendapat bagian kecil tidak akan senang. Bagiannya harus sama besar." },
        { teks: "Dipotong dua bagian saja", benar: false, umpan: "Dua bagian hanya cukup untuk dua teman. Kita butuh empat bagian." },
        { teks: "Dipotong menjadi empat bagian yang sama besar", benar: true, umpan: "Betul! Satu dari empat bagian sama besar disebut seperempat." },
      ],
    },
    {
      id: "nama",
      jenis: "soal",
      cerita: "Mari beri nama pada bagian kue. Ingat, empat bagian sama besar, satu bagiannya seperempat.",
      soal: [
        { teks: "Satu dari empat bagian sama besar disebut …", jawaban: "seperempat", opsi: ["setengah", "satu utuh", "seperempat"] },
        { teks: "Seperempat ditulis dengan lambang …", jawaban: "¼", opsi: ["½", "¼", "4"] },
        { teks: "Empat bagian seperempat disatukan menjadi …", jawaban: "satu utuh", opsi: ["satu utuh", "setengah", "dua bagian"] },
      ],
      sukses: "Hebat! Seperempat adalah satu dari empat bagian yang sama besar, dan empat seperempat menjadi satu utuh.",
      salah: "Hmm, hitung dulu ada berapa bagian, lalu lihat apakah sama besar. Coba lagi.",
    },
    {
      id: "dua",
      jenis: "pilih",
      cerita: "Kue itu dipotong empat bagian sama besar. Upe dan Kira masing-masing memakan satu bagian. Berapa kue yang sudah dimakan mereka berdua?",
      opsi: [
        { teks: "Setengah kue, karena dua seperempat sama dengan satu setengah", benar: true, umpan: "Betul! Dua seperempat sama dengan satu setengah. Dua dari empat bagian sama besar adalah setengah." },
        { teks: "Seperempat kue", benar: false, umpan: "Satu bagian saja baru seperempat. Mereka memakan dua bagian, jadi lebih banyak dari seperempat." },
        { teks: "Satu kue utuh", benar: false, umpan: "Satu kue utuh berarti empat bagian. Mereka baru memakan dua dari empat." },
      ],
    },
    {
      id: "periksa",
      jenis: "soal",
      cerita: "Terakhir, periksa tiga potongan kue ini dengan teliti.",
      soal: [
        { teks: "Kue dipotong empat bagian, tetapi satu bagian jauh lebih kecil. Apakah bagian itu seperempat?", jawaban: "Bukan, bagiannya tidak sama besar", opsi: ["Ya, ada empat bagian", "Bukan, bagiannya tidak sama besar", "Ya, asal bulat"] },
        { teks: "Kue dipotong dua bagian sama besar. Satu bagiannya …", jawaban: "setengah", opsi: ["seperempat", "setengah", "satu utuh"] },
        { teks: "Setengah kue dipotong lagi menjadi dua bagian sama besar. Setiap bagian baru adalah …", jawaban: "seperempat", opsi: ["setengah", "satu utuh", "seperempat"] },
      ],
      sukses: "Pintar! Seperempat hanya untuk empat bagian sama besar. Memotong setengah menjadi dua bagian sama besar menghasilkan seperempat.",
      salah: "Hmm, periksa dua hal: banyak bagian dan apakah sama besar. Coba lagi.",
    },
    {
      id: "akhir",
      jenis: "akhir",
      cerita: "Terima kasih! Semua temanku mendapat kue yang adil. Kamu sudah paham setengah dan seperempat.",
    },
  ],
};
