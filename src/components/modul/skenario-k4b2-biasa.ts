import type { DefSkenario } from "./skenario-umum";

/**
 * Tiga skenario Kelas 4 Bab 2 untuk pecahan biasa (Sub-Bab A, B, C). Tanpa jaringan, tanpa model bahasa.
 * Kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k4b2.mjs.
 *  - SKENARIO_K4B2A: Pizza Tiara (satu per n, bagian harus sama besar, makin besar penyebut makin kecil bagian)
 *  - SKENARIO_K4B2B: Kebun Slamet (penyebut sama, banding pembilang, urutan, penyebut berbeda ditolak)
 *  - SKENARIO_K4B2C: Cokelat Helen (pecahan senilai, kali dan bagi sama, paling sederhana)
 */

export const SKENARIO_K4B2A: DefSkenario = {
  id: "pizza-tiara-k4b2",
  judul: "Pizza Tiara",
  latar: "Bantu Tiara membagi pizza dan roti menjadi bagian sama besar.",
  tokoh: "👧",
  nama: "Tiara",
  adegan: [
    { id: "buka", jenis: "narasi", cerita: "Halo! Aku Tiara. Hari ini aku membagi pizza dan roti untuk teman-teman. Bantu aku menuliskan bagiannya sebagai pecahan, ya.", tombol: "Ayo mulai! ➡" },
    {
      id: "potong",
      jenis: "hitung",
      cerita: "Pizza dipotong menjadi bagian-bagian sama besar. Tiap stik di bawah ini satu potongan.",
      tanya: "Ketuk semua stik. Ada berapa potongan?",
      objek: "stik",
      jumlah: 4,
      sukses: "Betul! Ada empat potongan sama besar. Satu potongan ditulis 1/4.",
      salah: "Hmm, ketuk tiap stik satu kali, lalu hitung lagi.",
    },
    {
      id: "baca",
      jenis: "soal",
      cerita: "Aku menulis pecahan untuk satu potongan pizza.",
      soal: [
        { teks: "Pada 1/4, pembilangnya adalah …", jawaban: "1", opsi: ["4", "1", "2"] },
        { teks: "Pada 1/4, penyebutnya adalah …", jawaban: "4", opsi: ["1", "3", "4"] },
        { teks: "Satu bagian dari 8 bagian sama besar ditulis …", jawaban: "1/8", opsi: ["8/1", "1/8", "1/7"] },
      ],
      sukses: "Hebat! Pembilang ditulis di atas, yaitu bagian yang diarsir. Penyebut di bawah, yaitu semua bagian.",
      salah: "Hmm, pembilang di atas dan penyebut di bawah. Coba lagi.",
    },
    {
      id: "tidak-sama",
      jenis: "pilih",
      cerita: "Roti dipotong menjadi 4 bagian, tetapi ada yang besar dan ada yang kecil. Apakah satu potongan boleh disebut 1/4?",
      opsi: [
        { teks: "Boleh, karena ada 4 potongan", benar: false, umpan: "Banyak potongan saja belum cukup. Bagiannya harus sama besar." },
        { teks: "Tidak boleh, bagiannya harus sama besar", benar: true, umpan: "Betul! Pecahan 1/4 hanya untuk 4 bagian yang sama besar." },
        { teks: "Boleh, karena yang kecil juga bagian", benar: false, umpan: "Bagian yang besar dan kecil tidak bisa disebut sama. Potong sama besar dulu." },
      ],
    },
    {
      id: "banding",
      jenis: "pilih",
      cerita: "Mana yang lebih besar, 1/2 pizza atau 1/4 pizza?",
      opsi: [
        { teks: "1/2, karena dibagi 2 bagian, jadi tiap bagian lebih besar", benar: true, umpan: "Betul! Makin sedikit pembagiannya, makin besar tiap bagian." },
        { teks: "1/4, karena angka 4 lebih besar dari 2", benar: false, umpan: "Penyebut yang lebih besar berarti bagian lebih banyak, sehingga tiap bagian lebih kecil." },
        { teks: "Sama besar", benar: false, umpan: "Tidak sama. Pizza yang dibagi 2 punya bagian lebih besar daripada yang dibagi 4." },
      ],
    },
    {
      id: "kue",
      jenis: "isi",
      cerita: "Kue dipotong menjadi sepuluh bagian sama besar, dan satu bagian untukku. Masukkan stik sebanyak penyebutnya. Satu stik satu bagian.",
      objek: "stik",
      target: 10,
      maks: 12,
      sukses: "Pas! Sepuluh bagian sama besar, jadi satu bagian ditulis 1/10.",
      kurang: "Stiknya masih kurang. Penyebut adalah banyak seluruh bagian.",
      lebih: "Stiknya kelebihan. Penyebut adalah banyak seluruh bagian, yaitu sepuluh.",
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Pizza dan rotiku terbagi rata. Ingat: bagiannya harus sama besar, pembilang di atas, penyebut di bawah, dan makin besar penyebut makin kecil tiap bagian." },
  ],
};

export const SKENARIO_K4B2B: DefSkenario = {
  id: "kebun-slamet-k4b2",
  judul: "Kebun Slamet",
  latar: "Bantu Slamet membandingkan bagian kebun yang penyebutnya sama.",
  tokoh: "🧒",
  nama: "Slamet",
  adegan: [
    { id: "buka", jenis: "narasi", cerita: "Hai! Aku Slamet. Kebunku dibagi menjadi beberapa bedeng sama besar, dan tiap tanaman menempati beberapa bedeng. Bantu aku membandingkan bagiannya, ya.", tombol: "Ayo mulai! ➡" },
    {
      id: "baca",
      jenis: "soal",
      cerita: "Cabai memakai 2/5 kebun, dan terong memakai 4/5 kebun.",
      soal: [
        { teks: "2/5 dibaca dua per …", jawaban: "lima", opsi: ["dua", "lima", "tiga"] },
        { teks: "Pada 4/5, pembilangnya adalah …", jawaban: "4", opsi: ["5", "4", "1"] },
        { teks: "2/5 … 4/5", jawaban: "<", opsi: [">", "=", "<"] },
      ],
      sukses: "Tepat! Penyebutnya sama, jadi cukup lihat pembilangnya: 2 kurang dari 4.",
      salah: "Hmm, penyebutnya sama. Bandingkan pembilangnya. Coba lagi.",
    },
    {
      id: "besar",
      jenis: "pilih",
      cerita: "Bawang memakai 3/6 kebun, dan bayam memakai 2/6 kebun. Mana yang lebih luas?",
      opsi: [
        { teks: "Bayam, karena 2 lebih kecil", benar: false, umpan: "Pembilang yang lebih besar berarti bagian yang diambil lebih banyak. 3 lebih besar dari 2." },
        { teks: "Sama luas", benar: false, umpan: "Pembilangnya berbeda, 3 dan 2, jadi tidak sama luas." },
        { teks: "Bawang, karena pembilang 3 lebih dari 2", benar: true, umpan: "Betul! Penyebutnya sama, jadi bedeng sama besar. Pembilang 3 lebih dari 2." },
      ],
    },
    {
      id: "beda-penyebut",
      jenis: "pilih",
      cerita: "Adi membandingkan 1/2 dan 3/8 hanya dengan melihat pembilang. Katanya 3/8 lebih besar karena 3 lebih dari 1. Benarkah cara Adi?",
      opsi: [
        { teks: "Benar, pembilang 3 lebih dari 1", benar: false, umpan: "Penyebutnya berbeda, jadi bagiannya tidak sama besar. Pembilang saja tidak cukup." },
        { teks: "Belum bisa, penyebutnya berbeda sehingga bagiannya tidak sama besar", benar: true, umpan: "Betul! Pembilang hanya bisa dibandingkan bila penyebutnya sama." },
        { teks: "Benar, karena penyebut 8 lebih besar", benar: false, umpan: "Penyebut yang lebih besar tidak membuat pecahan lebih besar. Penyebutnya harus sama dulu." },
      ],
    },
    {
      id: "arsir",
      jenis: "hitung",
      cerita: "Satu bedeng dibagi 8 bagian sama besar, dan 5 bagian ditanami jagung. Tiap stik di bawah ini satu bagian yang ditanami.",
      tanya: "Ketuk semua stik. Ada berapa bagian yang ditanami?",
      objek: "stik",
      jumlah: 5,
      sukses: "Betul! Lima bagian dari delapan, ditulis 5/8.",
      salah: "Hmm, ketuk tiap stik satu kali, lalu hitung lagi.",
    },
    {
      id: "urut",
      jenis: "pilih",
      cerita: "Panen: 4/7, 1/7, dan 6/7 karung. Urutan naik dari yang terkecil adalah…",
      opsi: [
        { teks: "6/7, 4/7, 1/7", benar: false, umpan: "Itu urutan turun. Urutan naik dimulai dari pembilang paling kecil." },
        { teks: "4/7, 1/7, 6/7", benar: false, umpan: "Pembilang 1 lebih kecil dari 4. Urutkan pembilangnya: 1, 4, 6." },
        { teks: "1/7, 4/7, 6/7", benar: true, umpan: "Betul! Penyebutnya sama, jadi urutkan pembilangnya: 1, 4, 6." },
      ],
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Kebunku jadi rapi. Ingat: bila penyebut sama, bandingkan pembilangnya. Bila penyebut berbeda, bagiannya tidak sama besar." },
  ],
};

export const SKENARIO_K4B2C: DefSkenario = {
  id: "cokelat-helen-k4b2",
  judul: "Cokelat Helen",
  latar: "Bantu Helen menemukan pecahan yang senilai pada batang cokelat.",
  tokoh: "👧",
  nama: "Helen",
  adegan: [
    { id: "buka", jenis: "narasi", cerita: "Hai! Aku Helen. Aku punya dua batang cokelat yang sama panjang. Batang pertama dibagi 3 bagian, batang kedua dibagi 6 bagian. Bantu aku mencari pecahan yang sama luasnya, ya.", tombol: "Ayo mulai! ➡" },
    {
      id: "gambar",
      jenis: "hitung",
      cerita: "Satu bagian dari batang yang dibagi 3 sama luas dengan beberapa bagian dari batang yang dibagi 6. Tiap stik di bawah ini satu bagian dari batang yang dibagi 6.",
      tanya: "Ketuk semua stik. Ada berapa bagian yang sama luas dengan 1/3?",
      objek: "stik",
      jumlah: 2,
      sukses: "Betul! Dua bagian dari enam sama luas dengan satu bagian dari tiga. Jadi 1/3 = 2/6.",
      salah: "Hmm, ketuk tiap stik satu kali, lalu hitung lagi.",
    },
    {
      id: "isi",
      jenis: "soal",
      cerita: "Kalikan atau bagi pembilang dan penyebut dengan bilangan yang sama.",
      soal: [
        { teks: "1/3 = …/6", jawaban: "2", opsi: ["1", "2", "3"] },
        { teks: "1/4 = …/16", jawaban: "4", opsi: ["1", "16", "4"] },
        { teks: "6/12 = …/2", jawaban: "1", opsi: ["6", "2", "1"] },
      ],
      sukses: "Hebat! Pembilang dan penyebut diubah dengan bilangan yang sama, jadi nilainya tidak berubah.",
      salah: "Hmm, lihat penyebutnya berubah dikali atau dibagi berapa. Pembilangnya diubah sama. Coba lagi.",
    },
    {
      id: "satu-saja",
      jenis: "pilih",
      cerita: "Dewi mengubah 1/3 menjadi 2/3 dengan mengalikan pembilangnya dengan 2 saja. Benarkah 2/3 senilai dengan 1/3?",
      opsi: [
        { teks: "Benar, karena pembilangnya dikali 2", benar: false, umpan: "Bila hanya pembilang yang dikali, arsirnya bertambah luas. 2/3 lebih besar dari 1/3." },
        { teks: "Benar, karena penyebutnya tetap", benar: false, umpan: "Penyebut tetap, tetapi pembilang berubah, jadi luas arsir berubah." },
        { teks: "Salah, pembilang dan penyebut harus sama-sama dikali 2", benar: true, umpan: "Betul! 1/3 senilai dengan 2/6, karena keduanya dikali 2." },
      ],
    },
    {
      id: "fpb",
      jenis: "isi",
      cerita: "Aku ingin menyederhanakan 6/12. Pembilang dan penyebut dibagi FPB-nya. Masukkan stik sebanyak FPB dari 6 dan 12. Satu stik satu.",
      objek: "stik",
      target: 6,
      maks: 12,
      sukses: "Pas! FPB 6 dan 12 adalah 6. 6/12 dibagi 6/6 menjadi 1/2.",
      kurang: "Stiknya masih kurang. FPB adalah bilangan terbesar yang membagi 6 dan 12.",
      lebih: "Stiknya kelebihan. FPB adalah bilangan terbesar yang membagi 6 dan 12.",
    },
    {
      id: "sederhana",
      jenis: "pilih",
      cerita: "Bentuk paling sederhana dari 4/16 adalah…",
      opsi: [
        { teks: "2/8", benar: false, umpan: "2/8 senilai dengan 4/16, tetapi masih bisa dibagi 2. Belum paling sederhana." },
        { teks: "1/4", benar: true, umpan: "Betul! FPB 4 dan 16 adalah 4. 4/16 dibagi 4/4 menjadi 1/4." },
        { teks: "1/16", benar: false, umpan: "Hanya pembilangnya yang dibagi. Penyebut juga harus dibagi 4, hasilnya 1/4." },
      ],
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Cokelatku sudah rapi. Ingat: pecahan senilai dibuat dengan mengubah pembilang dan penyebut sama-sama, dan paling sederhana dengan membagi FPB." },
  ],
};
