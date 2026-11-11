import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Jambu dan Burung — Kelas 2 Bab 2 Sub-Bab C (soal cerita).
 * Kata kunci + langkah diketahui–ditanya–solusi–kesimpulan. Tanpa jaringan.
 */

export const SKENARIO_K2B2: DefSkenario = {
  id: "jambu-burung-k2b2",
  judul: "Jambu dan Burung",
  latar: "Bantu Tika menyelesaikan soal cerita penjumlahan dan pengurangan.",
  tokoh: "👧",
  nama: "Tika",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita:
        "Halo! Aku Tika. Hari ini ada jambu air dan burung di halaman. Ayo selesaikan soal ceritanya langkah demi langkah: diketahui, ditanya, solusi, lalu kesimpulan.",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "kata-kunci",
      jenis: "pilih",
      cerita: "Kira punya 7 jambu. Aku punya 5 jambu lebih banyak dari Kira. Kata mana yang menandakan penjumlahan?",
      opsi: [
        {
          teks: "Lebih banyak → jumlahkan 7 + 5",
          benar: true,
          umpan: "Betul! Lebih banyak berarti ditambah. Aku punya 7 + 5 jambu.",
        },
        {
          teks: "Lebih banyak → kurangkan 7 − 5",
          benar: false,
          umpan: "Lebih banyak bukan pengurangan. Kalau lebih banyak, jumlahnya bertambah.",
        },
        {
          teks: "Abaikan kata lebih banyak, tebak saja 7",
          benar: false,
          umpan: "Kata kunci penting. Jangan menebak tanpa membaca ceritanya.",
        },
      ],
    },
    {
      id: "langkah",
      jenis: "pilih",
      cerita: "Urutan mengerjakan soal cerita yang tepat adalah…",
      opsi: [
        {
          teks: "Langsung jawab angka, lalu baca ceritanya",
          benar: false,
          umpan: "Cerita dibaca dulu. Baru diketahui, ditanya, solusi, dan kesimpulan.",
        },
        {
          teks: "Kesimpulan dulu, baru diketahui",
          benar: false,
          umpan: "Kesimpulan ditulis paling akhir, setelah solusi.",
        },
        {
          teks: "Diketahui → ditanya → solusi → kesimpulan",
          benar: true,
          umpan: "Tepat! Empat langkah berurutan membuat jawaban jelas.",
        },
      ],
    },
    {
      id: "jambu",
      jenis: "soal",
      cerita: "Diketahui: Kira 7 jambu, Tika 5 lebih banyak. Ditanya: berapa jambu Tika?",
      soal: [
        {
          teks: "7 + 5 = …",
          jawaban: "12",
          opsi: ["11", "13", "12"],
        },
        {
          teks: "Kesimpulan yang tepat: Tika punya … jambu",
          jawaban: "12",
          opsi: ["12", "7", "5"],
        },
      ],
      sukses: "Hebat! Solusi 7 + 5 = 12, kesimpulan: Tika punya 12 jambu.",
      salah: "Cek lagi: lebih banyak berarti ditambah.",
    },
    {
      id: "burung",
      jenis: "hitung",
      cerita:
        "Di dahan ada burung hijau. Lalu beberapa terbang pergi. Hitung burung yang masih tinggal. Ketuk satu per satu.",
      tanya: "Ada berapa burung yang tinggal?",
      objek: "kelereng-hijau",
      jumlah: 8,
      sukses: "Ada delapan burung yang tinggal.",
      salah: "Hitung lagi burung yang masih di dahan.",
    },
    {
      id: "selisih",
      jenis: "pilih",
      cerita: "Tadi ada 14 burung. Sekarang tinggal 8. Selisihnya berapa, dan operasi apa?",
      opsi: [
        {
          teks: "14 − 8 = 6, itu selisihnya",
          benar: true,
          umpan: "Betul! Selisih memakai pengurangan. Enam burung sudah terbang.",
        },
        {
          teks: "14 + 8 = 22, itu selisihnya",
          benar: false,
          umpan: "Selisih bukan penjumlahan. Kurangkan bilangan yang lebih besar.",
        },
        {
          teks: "8 − 14 = 6",
          benar: false,
          umpan: "Bilangan yang dikurangi harus yang lebih besar: 14 − 8.",
        },
      ],
    },
    {
      id: "awal",
      jenis: "pilih",
      cerita:
        "Halim memberikan 4 jeruk kepada Lili. Sekarang jeruk Halim tersisa 12. Berapa jeruk Halim semula? Cara mana yang tepat untuk mencari bilangan awal?",
      opsi: [
        {
          teks: "Kurangkan lagi: 12 − 4 = 8",
          benar: false,
          umpan: "Jeruk sudah diberikan, jadi jumlah semula pasti lebih banyak dari sisanya. 8 malah lebih sedikit dari 12.",
        },
        {
          teks: "Balik operasinya: 12 + 4 = 16",
          benar: true,
          umpan: "Betul! Yang diberikan dikembalikan dengan menambah. Periksa: 16 − 4 = 12, cocok dengan sisanya.",
        },
        {
          teks: "Ambil sisanya saja, yaitu 12",
          benar: false,
          umpan: "12 adalah sisanya, bukan jumlah semula. Jeruk yang diberikan harus ikut dihitung.",
        },
      ],
    },
    {
      id: "akhir",
      jenis: "akhir",
      cerita:
        "Terima kasih! Kamu sudah memakai kata kunci, langkah berurutan, dan operasi yang tepat, bahkan untuk mencari bilangan awal. Main lagi kalau mau latihan soal cerita lain.",
    },
  ],
};
