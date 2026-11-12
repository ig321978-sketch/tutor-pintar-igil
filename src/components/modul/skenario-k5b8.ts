import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 5 Bab 8 (Data). Tanpa jaringan, tanpa model bahasa.
 * Kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k5b8.mjs (dihitung ulang mandiri).
 *  - SKENARIO_K5B8A: Anggi dan Donat (mengumpulkan data: data sebagai fakta, turus kelompok lima, frekuensi, jumlah frekuensi
 *    sama dengan banyak data, mode untuk keputusan)
 */

export const SKENARIO_K5B8A: DefSkenario = {
  id: "anggi-donat-k5b8",
  judul: "Anggi dan Donat",
  latar: "Bantu Anggi mengumpulkan data penjualan donatnya.",
  tokoh: "👩",
  nama: "Anggi",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Anggi, penjual donat. Aku ingin tahu rasa mana yang paling laris. Caranya: tanya, catat, ringkas, lalu baca maknanya. Ayo kita kumpulkan datanya!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "data",
      jenis: "pilih",
      cerita: "Anggi mencatat rasa donat yang dibeli pelanggan setiap hari. Catatan itu disebut data. Apa arti data?",
      opsi: [
        { teks: "tebakan tentang rasa yang disukai", benar: false, umpan: "Tebakan belum tentu benar. Data berasal dari fakta yang benar-benar dicatat." },
        { teks: "kumpulan fakta yang ditulis dengan kata, angka, atau tanda", benar: true, umpan: "Betul! Data adalah kumpulan fakta. Karena dicatat, kita tidak perlu menebak." },
        { teks: "hanya angka, kata tidak boleh", benar: false, umpan: "Data boleh berupa kata, kalimat, angka, atau tanda, asalkan itu fakta." },
      ],
    },
    {
      id: "turus",
      jenis: "soal",
      cerita: "Anggi mencatat dengan turus. Tiap pembeli satu garis, dan tiap lima garis dikelompokkan: empat garis tegak dan satu garis miring.",
      soal: [
        { teks: "Turus dikelompokkan lima supaya …", jawaban: "mudah dihitung lima-lima", opsi: ["mudah dihitung lima-lima", "terlihat lebih panjang", "tidak perlu dihitung"] },
        { teks: "Stroberi terjual 8 kali. Turusnya 1 kelompok lima dan … garis.", jawaban: "3", opsi: ["2", "3", "4"] },
      ],
      sukses: "Hebat! Kelompok lima memudahkan menghitung, dan 8 = 5 + 3, jadi turusnya satu kelompok lima ditambah 3 garis.",
      salah: "Hmm, ingat satu kelompok berisi lima garis. Sisanya adalah garis yang berdiri sendiri. Coba lagi.",
    },
    {
      id: "pembeli",
      jenis: "hitung",
      cerita: "Anggi menurus donat keju. Tiap pembeli keju diberi satu stik, supaya tidak ada yang terlewat atau terhitung dua kali.",
      tanya: "Ketuk semua stik. Ada berapa pembeli donat keju?",
      objek: "stik",
      jumlah: 5,
      sukses: "Betul! Ada 5 pembeli keju, tepat satu kelompok lima.",
      salah: "Hmm, ketuk tiap stik sekali saja, lalu hitung lagi.",
    },
    {
      id: "kacang",
      jenis: "isi",
      cerita: "Donat kacang hanya dibeli 2 kali. Masukkan satu stik untuk tiap pembeli donat kacang. Banyak stik itu adalah frekuensinya.",
      objek: "stik",
      target: 2,
      maks: 6,
      sukses: "Pas! Frekuensi donat kacang adalah 2.",
      kurang: "Stiknya masih kurang. Frekuensi sama dengan berapa kali donat kacang dibeli.",
      lebih: "Stiknya kebanyakan. Donat kacang hanya dibeli dua kali.",
    },
    {
      id: "tabel",
      jenis: "soal",
      cerita: "Tabel frekuensi Anggi: cokelat 7, keju 5, stroberi 3, kacang 2. Anggi memeriksanya sebelum mengambil keputusan.",
      soal: [
        { teks: "Jumlah semua frekuensi, yaitu banyak data, adalah …", jawaban: "17", opsi: ["15", "17", "19"] },
        { teks: "Rasa dengan frekuensi terbesar adalah …", jawaban: "cokelat", opsi: ["kacang", "keju", "cokelat"] },
      ],
      sukses: "Tepat! 7 + 5 + 3 + 2 = 17, dan cokelat yang terbesar, jadi cokelat adalah mode.",
      salah: "Hmm, jumlahkan semua frekuensi, lalu cari yang paling besar. Coba lagi.",
    },
    {
      id: "putus",
      jenis: "pilih",
      cerita: "Anggi punya bahan untuk menambah satu rasa saja. Ia membaca tabelnya dengan teliti. Keputusan apa yang terbaik?",
      opsi: [
        { teks: "tambah bahan cokelat, karena frekuensinya terbesar", benar: true, umpan: "Betul! Data menunjukkan cokelat paling laris, jadi keputusan punya alasan." },
        { teks: "tambah bahan kacang, karena frekuensinya terkecil", benar: false, umpan: "Kacang paling sedikit dibeli. Menambah bahannya belum tentu menambah penjualan." },
        { teks: "cukup menebak tanpa melihat tabel", benar: false, umpan: "Tebakan bisa meleset. Tabel sudah ada, jadi gunakan sebagai alasan." },
      ],
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Data adalah kumpulan fakta. Turus dikelompokkan lima, frekuensi menyatakan berapa kali muncul, dan jumlah frekuensi sama dengan banyak data. Frekuensi terbesar disebut mode dan menolong mengambil keputusan.",
    },
  ],
};
