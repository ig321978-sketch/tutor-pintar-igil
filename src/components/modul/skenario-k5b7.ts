import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 5 Bab 7 (Membandingkan Ciri-Ciri Bangun Datar). Tanpa jaringan, tanpa model bahasa.
 * Kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k5b7.mjs (dihitung ulang mandiri).
 *  - SKENARIO_K5B7A: Yohana di Candi Sewu (syarat sisi segitiga, jumlah sudut 180, simetri lipat, hierarki sama sisi dan sama kaki)
 *  - SKENARIO_K5B7B: Denah Candi Sewu (pencapaian bab: trapesium inklusif, ciri jajargenjang dan persegi panjang, diagonal persegi menjadi segitiga, hierarki persegi)
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

export const SKENARIO_K5B7B: DefSkenario = {
  id: "denah-candi-k5b7",
  judul: "Denah Candi Sewu",
  latar: "Bantu Asep dan Lukas membandingkan ciri segi empat pada denah candi.",
  tokoh: "👦",
  nama: "Asep",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Asep. Bersama Lukas, aku mengamati denah Candi Sewu. Ada bentuk persegi, persegi panjang, dan banyak bentuk lain yang punya empat sisi. Ayo kita bandingkan ciri-cirinya, bukan hanya namanya!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "trapesium",
      jenis: "pilih",
      cerita: "Lukas bertanya, bangun apa yang disebut trapesium menurut buku kita?",
      opsi: [
        { teks: "bangun dengan empat sisi sama panjang", benar: false, umpan: "Empat sisi sama panjang adalah ciri belah ketupat. Trapesium dilihat dari sisi sejajarnya." },
        { teks: "bangun dengan setidaknya sepasang sisi sejajar", benar: true, umpan: "Betul! Trapesium punya setidaknya sepasang sisi sejajar, jadi jajargenjang juga termasuk trapesium." },
        { teks: "bangun dengan tepat satu pasang sisi sejajar saja", benar: false, umpan: "Buku kita memakai definisi yang lebih luas: setidaknya sepasang, bukan tepat sepasang." },
      ],
    },
    {
      id: "ciri",
      jenis: "soal",
      cerita: "Asep memeriksa dua bangun pada denah. Ia mencatat ciri-cirinya dengan teliti.",
      soal: [
        { teks: "Jajargenjang punya … pasang sisi berhadapan yang sejajar.", jawaban: "2", opsi: ["1", "2", "3"] },
        { teks: "Persegi panjang punya … sudut siku-siku.", jawaban: "4", opsi: ["2", "3", "4"] },
      ],
      sukses: "Hebat! Jajargenjang punya 2 pasang sisi sejajar, dan persegi panjang punya 4 sudut siku-siku.",
      salah: "Hmm, periksa lagi ciri jajargenjang dan persegi panjang. Coba lagi.",
    },
    {
      id: "diagonal",
      jenis: "hitung",
      cerita: "Lukas menarik satu diagonal pada denah berbentuk persegi. Persegi itu terbelah menjadi segitiga-segitiga, dan tiap segitiga diberi satu stik.",
      tanya: "Ketuk semua stik. Ada berapa segitiga siku-siku sama kaki hasil satu diagonal persegi?",
      objek: "stik",
      jumlah: 2,
      sukses: "Betul! Satu diagonal membelah persegi menjadi 2 segitiga siku-siku sama kaki.",
      salah: "Hmm, ketuk tiap stik sekali saja, lalu hitung lagi.",
    },
    {
      id: "sudut",
      jenis: "soal",
      cerita: "Salah satu segitiga hasil diagonal punya satu sudut siku-siku, 90°, dan dua sudut lain sama besar. Jumlah tiga sudut segitiga 180°.",
      soal: [{ teks: "Tiap sudut lainnya … derajat.", jawaban: "45", opsi: ["45", "90", "60"] }],
      sukses: "Tepat! 180° − 90° = 90°, dibagi dua sudut sama besar, tiap sudutnya 45°.",
      salah: "Hmm, kurangi 180° dengan 90°, lalu bagi dua. Coba lagi.",
    },
    {
      id: "sisi",
      jenis: "isi",
      cerita: "Lukas menggambar belah ketupat. Masukkan satu stik untuk tiap sisi yang sama panjang pada belah ketupat itu.",
      objek: "stik",
      target: 4,
      maks: 6,
      sukses: "Pas! Belah ketupat punya 4 sisi sama panjang.",
      kurang: "Stiknya masih kurang. Belah ketupat punya empat sisi, semuanya sama panjang.",
      lebih: "Stiknya kebanyakan. Segi empat hanya punya empat sisi.",
    },
    {
      id: "hierarki",
      jenis: "pilih",
      cerita: "Lukas berkata persegi bukan persegi panjang. Asep tidak setuju. Siapa yang benar?",
      opsi: [
        { teks: "Asep benar, persegi juga persegi panjang", benar: true, umpan: "Betul! Persegi punya semua ciri persegi panjang, jadi persegi juga persegi panjang. Tetapi persegi panjang belum tentu persegi." },
        { teks: "Lukas benar, persegi bukan persegi panjang", benar: false, umpan: "Persegi punya empat sudut siku-siku dan dua pasang sisi sejajar, jadi memenuhi ciri persegi panjang." },
        { teks: "persegi panjang pasti persegi", benar: false, umpan: "Dibalik tidak berlaku. Persegi panjang belum tentu punya empat sisi sama panjang." },
      ],
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Trapesium punya setidaknya sepasang sisi sejajar. Persegi panjang, belah ketupat, dan persegi termasuk jajargenjang, dan persegi ada di pusat banyak golongan. Bandingkan ciri satu per satu, jangan menghafal nama saja.",
    },
  ],
};
