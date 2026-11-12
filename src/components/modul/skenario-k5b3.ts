import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 5 Bab 3 (Bilangan Pecahan). Tanpa jaringan, tanpa model bahasa.
 * Kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k5b3.mjs (dihitung ulang mandiri).
 *  - SKENARIO_K5B3A: Lompat Jauh Yohana (campuran ke biasa, potongan sama panjang, banding, lompatan terjauh)
 *  - SKENARIO_K5B3B: Martabak dan Wingko Komang (penjumlahan penyebut sama dan beda, KPK, menyederhanakan)
 */

export const SKENARIO_K5B3A: DefSkenario = {
  id: "lompat-yohana-k5b3",
  judul: "Lompat Jauh Yohana",
  latar: "Bantu Yohana membandingkan tiga lompatannya di lomba lompat jauh.",
  tokoh: "👧",
  nama: "Yohana",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Yohana. Di lomba lompat jauh, aku melompat tiga kali: 2 3/4 meter, 3 1/2 meter, dan 7/8 meter. Ayo bantu aku membandingkan lompatanku!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "biasa",
      jenis: "pilih",
      cerita: "Lompatan pertama Yohana 2 3/4 meter. Diubah menjadi pecahan biasa, hasilnya yang mana?",
      opsi: [
        { teks: "6/4, sebab 2 dikali 3", benar: false, umpan: "2 dikali 3 bukan banyak bagian. Tiap bulat dibagi 4 bagian, jadi 2 bulat berisi 8 bagian." },
        { teks: "11/4, sebab 2 bulat berisi 8 bagian dan masih ada 3 bagian", benar: true, umpan: "Betul! 2 kali 4 sama dengan 8 bagian, lalu 3 bagian pecahannya, jadi 11 bagian per 4." },
        { teks: "5/4, sebab 2 dan 3 digabung", benar: false, umpan: "Menggabung angka tidak memberi banyak bagian. Hitung bagian dari tiap bulat." },
      ],
    },
    {
      id: "potong",
      jenis: "hitung",
      cerita: "Lompatan 2 3/4 meter sama dengan potongan seperempat meter. Tiap potongan diberi satu stik.",
      tanya: "Ketuk semua stik. Ada berapa potongan seperempat meter?",
      objek: "stik",
      jumlah: 11,
      sukses: "Betul! Ada 11 potongan seperempat meter, jadi 2 3/4 sama dengan 11/4.",
      salah: "Hmm, ketuk tiap stik sekali saja, lalu hitung lagi.",
    },
    {
      id: "setengah",
      jenis: "isi",
      cerita: "Lompatan kedua Yohana 3 1/2 meter. Garis dibagi tiap setengah meter. Masukkan satu stik untuk tiap potongan setengah meter.",
      objek: "stik",
      target: 7,
      maks: 10,
      sukses: "Pas! Ada 7 potongan setengah meter, jadi 3 1/2 sama dengan 7/2.",
      kurang: "Stiknya masih sedikit. Tiap bulat berisi 2 potongan setengah, hitung dari nol.",
      lebih: "Stiknya kebanyakan. 3 bulat berisi 6 potongan, lalu 1 potongan lagi.",
    },
    {
      id: "banding",
      jenis: "soal",
      cerita: "Yohana membandingkan pecahan di papan tulis.",
      soal: [
        { teks: "Yang lebih besar: 1/2 atau 1/5?", jawaban: "1/2", opsi: ["1/5", "1/2", "sama besar"] },
        { teks: "Penyebut yang sama untuk 1/2 dan 3/5 adalah …", jawaban: "10", opsi: ["7", "10", "5"] },
        { teks: "3/8 dibanding 5/8, tandanya …", jawaban: "<", opsi: [">", "<", "="] },
      ],
      sukses: "Hebat! Bagian yang sama besar membuat pecahan mudah dibandingkan.",
      salah: "Hmm, samakan penyebutnya atau lihat letaknya di garis bilangan. Coba lagi.",
    },
    {
      id: "terjauh",
      jenis: "pilih",
      cerita: "Dari tiga lompatan, 7/8 meter, 11/4 meter, dan 7/2 meter, mana yang paling jauh?",
      opsi: [
        { teks: "2 3/4 meter, sebab 11/4 paling besar", benar: false, umpan: "11/4 lebih kecil dari 14/4, yaitu 7/2. Letakkan di garis bilangan." },
        { teks: "7/8 meter, sebab penyebutnya paling besar", benar: false, umpan: "Penyebut besar berarti tiap bagian kecil, dan 7/8 belum sampai 1 bulat." },
        { teks: "3 1/2 meter, sebab 7/2 paling kanan di garis bilangan", benar: true, umpan: "Betul! 7/2 sama dengan 14/4, paling jauh dari nol. Makin ke kanan, makin besar." },
      ],
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Pecahan dibandingkan dengan menyamakan penyebut atau melihat letaknya di garis bilangan. Pecahan campuran bisa diubah ke pecahan biasa: bulat dikali penyebut, lalu bagian pecahannya.",
    },
  ],
};

export const SKENARIO_K5B3B: DefSkenario = {
  id: "martabak-wingko-k5b3",
  judul: "Martabak dan Wingko Komang",
  latar: "Bantu Komang menjumlahkan potongan martabak dan wingko yang dimakan bersama Lukas.",
  tokoh: "👦",
  nama: "Komang",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Komang. Aku dan Lukas berbagi martabak dan wingko. Kami ingin tahu berapa bagian yang sudah kami makan bersama. Ayo bantu aku menjumlahkannya!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "martabak",
      jenis: "pilih",
      cerita: "Martabak dibagi 8 potong sama besar. Lukas makan 1/8 dan Komang makan 2/8. Berapa bagian martabak yang mereka makan bersama?",
      opsi: [
        { teks: "3/16, sebab penyebutnya juga dijumlahkan", benar: false, umpan: "Potongannya tetap sama besar, yaitu per 8. Penyebut tidak dijumlahkan." },
        { teks: "2/8, sebab pembilangnya dikalikan", benar: false, umpan: "Pembilang dijumlahkan, bukan dikalikan. 1 potong dan 2 potong menjadi 3 potong." },
        { teks: "3/8, sebab penyebut tetap 8 dan pembilang dijumlahkan", benar: true, umpan: "Betul! 1 potong dan 2 potong menjadi 3 potong dari 8 potong." },
      ],
    },
    {
      id: "potong",
      jenis: "hitung",
      cerita: "Lukas makan 1 potong dan Komang 2 potong dari 8 potong. Setiap potong yang dimakan diberi satu stik.",
      tanya: "Ketuk semua stik. Berapa potong martabak yang sudah dimakan bersama?",
      objek: "stik",
      jumlah: 3,
      sukses: "Betul! Ada 3 potong dari 8 potong, jadi 3/8 martabak.",
      salah: "Hmm, ketuk tiap stik sekali saja, lalu hitung lagi.",
    },
    {
      id: "wingko",
      jenis: "isi",
      cerita: "Wingko dibagi 6 potong sama besar. Lukas makan 1/2, yaitu 3 potong, dan Komang makan 1/3, yaitu 2 potong. Masukkan satu stik untuk tiap potong yang mereka makan bersama.",
      objek: "stik",
      target: 5,
      maks: 8,
      sukses: "Pas! Mereka makan 5 potong dari 6 potong, jadi 1/2 + 1/3 = 5/6.",
      kurang: "Stiknya masih sedikit. Lukas makan 3 potong dan Komang 2 potong.",
      lebih: "Stiknya kebanyakan. Semuanya ada 3 potong dan 2 potong.",
    },
    {
      id: "hitung",
      jenis: "soal",
      cerita: "Komang menjumlahkan pecahan di papan tulis.",
      soal: [
        { teks: "1/2 + 1/3 = …", jawaban: "5/6", opsi: ["2/5", "5/6", "1/6"] },
        { teks: "KPK dari 4 dan 6 adalah …", jawaban: "12", opsi: ["10", "12", "24"] },
        { teks: "1/4 + 1/6 = …", jawaban: "5/12", opsi: ["2/10", "5/12", "2/12"] },
      ],
      sukses: "Hebat! Samakan penyebut dengan KPK, lalu jumlahkan pembilangnya.",
      salah: "Hmm, samakan penyebutnya dulu dengan KPK. Coba lagi.",
    },
    {
      id: "sederhana",
      jenis: "pilih",
      cerita: "Komang menjumlahkan 4/9 dan 2/9 dan mendapat 6/9. Apa yang sebaiknya Komang lakukan dengan hasilnya?",
      opsi: [
        { teks: "Membiarkannya, sebab 6/9 sudah paling sederhana", benar: false, umpan: "6 dan 9 sama-sama bisa dibagi 3, jadi 6/9 masih bisa disederhanakan." },
        { teks: "Menyederhanakannya menjadi 2/3, dibagi 3", benar: true, umpan: "Betul! 6 dibagi 3 menjadi 2, dan 9 dibagi 3 menjadi 3. Hasilnya 2/3." },
        { teks: "Membagi pembilangnya saja menjadi 2/9", benar: false, umpan: "Pembilang dan penyebut harus dibagi dengan bilangan yang sama." },
      ],
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Pecahan berpenyebut sama dijumlahkan pada pembilangnya, dan penyebutnya tetap. Bila penyebutnya berbeda, samakan dengan KPK dahulu. Setelah itu sederhanakan hasilnya.",
    },
  ],
};
