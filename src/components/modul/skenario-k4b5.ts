import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 4 Bab 5 (Bangun Datar). Tanpa jaringan, tanpa model bahasa.
 * Kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k4b5.mjs (dihitung ulang dari koordinat dan data).
 *  - SKENARIO_K4B5A: Papan Paku Helen (segi banyak, nama menurut sisi, segitiga siku-siku, persegi, sisi sejajar)
 */

export const SKENARIO_K4B5A: DefSkenario = {
  id: "paku-helen-k4b5",
  judul: "Papan Paku Helen",
  latar: "Bantu Helen mengenali ciri bangun di papan paku dan karetnya.",
  tokoh: "👧",
  nama: "Helen",
  adegan: [
    { id: "buka", jenis: "narasi", cerita: "Halo! Aku Helen. Aku punya papan paku dan beberapa karet gelang. Kita bentuk bangun datar, lalu kenali cirinya. Bantu aku, ya.", tombol: "Ayo mulai! ➡" },
    {
      id: "segi",
      jenis: "pilih",
      cerita: "Helen menggambar tiga bentuk. Mana yang termasuk segi banyak?",
      opsi: [
        { teks: "Lingkaran yang rapi", benar: false, umpan: "Lingkaran tertutup, tetapi tepinya lengkung. Segi banyak dibatasi ruas garis lurus." },
        { teks: "Karet tertutup di tiga paku, tepinya lurus", benar: true, umpan: "Betul! Tertutup dan dibatasi tiga ruas lurus. Itu segi banyak, namanya segitiga." },
        { teks: "Tiga ruas lurus yang ujungnya tidak bertemu", benar: false, umpan: "Ujungnya terbuka. Segi banyak harus tertutup." },
      ],
    },
    {
      id: "enam",
      jenis: "hitung",
      cerita: "Helen memasang karet melewati enam paku sampai tertutup. Tiap stik di bawah ini satu sisi karet.",
      tanya: "Ketuk semua stik. Berapa sisi bangun Helen?",
      objek: "stik",
      jumlah: 6,
      sukses: "Betul! Enam sisi, jadi namanya segienam. Nama segi banyak mengikuti banyak sisinya.",
      salah: "Hmm, ketuk tiap stik satu kali, lalu hitung lagi.",
    },
    {
      id: "klm",
      jenis: "pilih",
      cerita: "Segitiga KLM punya satu sudut yang pas dengan pojok buku, yaitu sudut K. Apa jenis segitiga KLM?",
      opsi: [
        { teks: "Segitiga tumpul", benar: false, umpan: "Sudut tumpul lebih besar dari pojok buku. Sudut K pas dengan pojok buku." },
        { teks: "Segitiga lancip", benar: false, umpan: "Segitiga lancip semua sudutnya lebih kecil dari pojok buku. Sudut K tidak begitu." },
        { teks: "Segitiga siku-siku", benar: true, umpan: "Betul! Sudut yang pas dengan pojok buku adalah sudut siku-siku, besarnya 90 derajat." },
      ],
    },
    {
      id: "persegi",
      jenis: "soal",
      cerita: "Helen membentuk persegi dan persegi panjang di papan paku.",
      soal: [
        { teks: "Banyak sudut siku-siku pada persegi …", jawaban: "4", opsi: ["2", "4", "0"] },
        { teks: "Banyak pasang sisi sejajar pada persegi panjang …", jawaban: "2", opsi: ["2", "1", "0"] },
        { teks: "Banyak pasang sisi sejajar pada trapesium …", jawaban: "1", opsi: ["2", "0", "1"] },
      ],
      sukses: "Hebat! Persegi punya empat sudut siku-siku. Persegi panjang punya dua pasang sisi sejajar, trapesium hanya satu pasang.",
      salah: "Hmm, periksa sudut dengan pojok buku, dan cari sisi berhadapan yang tidak pernah bertemu. Coba lagi.",
    },
    {
      id: "karet",
      jenis: "isi",
      cerita: "Helen membuat satu persegi dan satu segitiga terpisah. Satu stik untuk satu sisi karet. Masukkan stik sebanyak semua sisinya.",
      objek: "stik",
      target: 7,
      maks: 12,
      sukses: "Pas! Persegi empat sisi, segitiga tiga sisi. Semuanya tujuh sisi.",
      kurang: "Stiknya masih kurang. Hitung sisi persegi, lalu sisi segitiga.",
      lebih: "Stiknya kelebihan. Persegi punya empat sisi dan segitiga tiga sisi.",
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Segi banyak tertutup dan dibatasi ruas lurus. Namanya mengikuti banyak sisi. Ciri sisi, sudut, dan sisi sejajar membantu kita memberi nama bangun." },
  ],
};
