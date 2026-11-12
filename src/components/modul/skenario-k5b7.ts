import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 5 Bab 7 (Membandingkan Ciri-Ciri Bangun Datar). Tanpa jaringan, tanpa model bahasa.
 * Kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k5b7.mjs (dihitung ulang mandiri).
 *  - SKENARIO_K5B7A: Yohana di Candi Sewu (syarat sisi segitiga, jumlah sudut 180, simetri lipat, hierarki sama sisi dan sama kaki)
 */

export const SKENARIO_K5B7A: DefSkenario = {
  id: "yohana-candi-k5b7",
  judul: "Yohana di Candi Sewu",
  latar: "Bantu Yohana membandingkan ciri segitiga pada hiasan candi.",
  tokoh: "👧",
  nama: "Yohana",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Yohana. Hari ini aku belajar di Candi Sewu, Yogyakarta. Banyak hiasan candi berbentuk segitiga. Ayo kita cari ciri-cirinya dengan teliti!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "syarat",
      jenis: "pilih",
      cerita: "Yohana menyusun tiga sedotan yang panjangnya 5, 4, dan 12. Apakah ketiganya bisa menutup menjadi segitiga?",
      opsi: [
        { teks: "bisa, karena ada tiga sedotan", benar: false, umpan: "Tiga sedotan saja belum cukup. Jumlah dua sisi harus lebih panjang dari sisi ketiga." },
        { teks: "bisa, karena 5 + 4 lebih dari 12", benar: false, umpan: "Jumlah 5 dan 4 hanya 9, tidak lebih dari 12. Ujinya gagal." },
        { teks: "tidak bisa, karena 5 + 4 = 9 kurang dari 12", benar: true, umpan: "Betul! Dua sedotan pendek tidak sampai menutup sedotan terpanjang, jadi tidak bisa menjadi segitiga." },
      ],
    },
    {
      id: "jumlah",
      jenis: "soal",
      cerita: "Yohana memotong ketiga sudut sebuah segitiga, lalu mengimpitkannya sampai rapat. Hasilnya berupa sudut lurus.",
      soal: [
        { teks: "Jumlah tiga sudut dalam segitiga adalah … derajat.", jawaban: "180", opsi: ["90", "180", "360"] },
        { teks: "Dua sudut sebuah segitiga 50° dan 60°. Sudut ketiganya … derajat.", jawaban: "70", opsi: ["70", "110", "10"] },
      ],
      sukses: "Hebat! Jumlah tiga sudut segitiga selalu 180°, jadi sudut ketiganya 180° − 50° − 60° = 70°.",
      salah: "Hmm, ingat jumlah tiga sudut segitiga, lalu kurangkan sudut yang diketahui. Coba lagi.",
    },
    {
      id: "lipat",
      jenis: "hitung",
      cerita: "Yohana melipat segitiga sama sisi dari kertas. Segitiga itu bisa dilipat tepat menjadi dua bagian yang sama, dan tiap cara melipat diberi satu stik.",
      tanya: "Ketuk semua stik. Ada berapa simetri lipat pada segitiga sama sisi?",
      objek: "stik",
      jumlah: 3,
      sukses: "Betul! Segitiga sama sisi punya 3 simetri lipat.",
      salah: "Hmm, ketuk tiap stik sekali saja, lalu hitung lagi.",
    },
    {
      id: "kaki",
      jenis: "isi",
      cerita: "Segitiga sama kaki hanya bisa dilipat tepat menjadi dua bagian dengan satu cara. Masukkan satu stik untuk tiap simetri lipat segitiga sama kaki.",
      objek: "stik",
      target: 1,
      maks: 4,
      sukses: "Pas! Segitiga sama kaki punya 1 simetri lipat.",
      kurang: "Stiknya masih kosong. Segitiga sama kaki punya satu simetri lipat.",
      lebih: "Stiknya kebanyakan. Segitiga sama kaki hanya punya satu simetri lipat.",
    },
    {
      id: "hierarki",
      jenis: "pilih",
      cerita: "Komang berkata segitiga sama sisi bukan segitiga sama kaki. Nisa tidak setuju. Siapa yang benar?",
      opsi: [
        { teks: "Komang benar, sama sisi bukan sama kaki", benar: false, umpan: "Segitiga sama sisi punya dua sisi sama panjang, bahkan tiga. Jadi ia memenuhi ciri sama kaki." },
        { teks: "Nisa benar, sama sisi juga sama kaki", benar: true, umpan: "Betul! Segitiga sama sisi memiliki semua ciri sama kaki, jadi digolongkan juga sebagai sama kaki." },
        { teks: "sama kaki pasti sama sisi", benar: false, umpan: "Dibalik tidak berlaku. Sama kaki cukup dua sisi sama, ketiganya belum tentu sama." },
      ],
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Tiga sedotan bisa menjadi segitiga bila jumlah dua sisi selalu lebih dari sisi ketiga. Jumlah tiga sudut segitiga 180°. Segitiga sama sisi juga sama kaki, tetapi sama kaki belum tentu sama sisi.",
    },
  ],
};
