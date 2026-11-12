import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 5 Bab 6 (Sudut). Tanpa jaringan, tanpa model bahasa.
 * Kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k5b6.mjs (dihitung ulang mandiri).
 *  - SKENARIO_K5B6A: Bingkai Pak Tukang (sudut siku-siku, patokan lipatan, membandingkan pojok dengan patokan)
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
