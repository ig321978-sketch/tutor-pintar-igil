import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 5 Bab 8 (Data). Tanpa jaringan, tanpa model bahasa.
 * Kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k5b8.mjs (dihitung ulang mandiri).
 *  - SKENARIO_K5B8A: Anggi dan Donat (mengumpulkan data: data sebagai fakta, turus kelompok lima, frekuensi, jumlah frekuensi
 *    sama dengan banyak data, mode untuk keputusan)
 *  - SKENARIO_K5B8B: Anggi dan Kue Apem (piktogram: kunci, nilai dari banyak simbol dikali kunci, setengah simbol, cari kesalahan;
 *    menyentuh tabel frekuensi dari Sub-Bab A)
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

export const SKENARIO_K5B8B: DefSkenario = {
  id: "anggi-apem-k5b8",
  judul: "Anggi dan Kue Apem",
  latar: "Bantu Anggi menggambar dan memeriksa piktogram penjualan kue apem.",
  tokoh: "👩",
  nama: "Anggi",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Anggi lagi. Aku sudah punya tabel frekuensi penjualan kue apem. Sekarang aku ingin menggambarnya sebagai piktogram, supaya mudah dilihat sekilas. Ayo kita gambar dengan jujur!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "kunci",
      jenis: "pilih",
      cerita: "Anggi menulis di bawah piktogram: satu simbol sama dengan 4 kue. Apa gunanya keterangan itu?",
      opsi: [
        { teks: "menunjukkan nilai satu simbol, supaya gambar punya arti angka", benar: true, umpan: "Betul! Keterangan itu disebut kunci. Tanpa kunci, gambar tidak punya nilai angka." },
        { teks: "hanya untuk menghias gambar", benar: false, umpan: "Kunci bukan hiasan. Pembaca memakainya untuk mengubah banyak simbol menjadi nilai." },
        { teks: "mengganti judul piktogram", benar: false, umpan: "Judul tetap dibutuhkan. Kunci menjelaskan nilai tiap simbol." },
      ],
    },
    {
      id: "baca",
      jenis: "soal",
      cerita: "Pada piktogram Anggi, satu simbol sama dengan 4 kue. Hari Senin tergambar 3 simbol, dan hari Selasa 5 simbol.",
      soal: [
        { teks: "Kue apem yang terjual hari Senin adalah …", jawaban: "12", opsi: ["3", "7", "12"] },
        { teks: "Kue apem yang terjual hari Selasa adalah …", jawaban: "20", opsi: ["20", "9", "5"] },
      ],
      sukses: "Hebat! Nilai dibaca dari banyak simbol dikali kunci: 3 × 4 = 12 dan 5 × 4 = 20.",
      salah: "Hmm, jangan berhenti di banyak simbol. Kalikan banyak simbol dengan kunci, lalu coba lagi.",
    },
    {
      id: "simbol",
      jenis: "hitung",
      cerita: "Hari Rabu terjual 20 kue. Anggi ingin tahu berapa simbol yang harus digambar dengan kunci 4. Ia menempatkan satu stik untuk tiap simbol.",
      tanya: "Ketuk semua stik. Ada berapa simbol untuk hari Rabu?",
      objek: "stik",
      jumlah: 5,
      sukses: "Betul! 20 ÷ 4 = 5, jadi hari Rabu digambar 5 simbol.",
      salah: "Hmm, ketuk tiap stik sekali saja, lalu hitung lagi.",
    },
    {
      id: "kamis",
      jenis: "isi",
      cerita: "Hari Kamis terjual 16 kue, kunci masih 4. Masukkan satu stik untuk tiap simbol yang harus digambar, sesuai frekuensi pada tabel.",
      objek: "stik",
      target: 4,
      maks: 8,
      sukses: "Pas! 16 ÷ 4 = 4, jadi hari Kamis digambar 4 simbol.",
      kurang: "Stiknya masih kurang. Bagi 16 dengan kunci 4 untuk tahu banyak simbolnya.",
      lebih: "Stiknya kebanyakan. Bagi 16 dengan kunci 4, hasilnya kurang dari itu.",
    },
    {
      id: "setengah",
      jenis: "soal",
      cerita: "Hari Jumat terjual 10 kue. Dengan kunci 4, 10 ÷ 4 hasilnya 2 dan sisa 2. Sisa 2 tepat setengah dari kunci.",
      soal: [{ teks: "Sisa 2 digambar sebagai …", jawaban: "setengah simbol", opsi: ["satu simbol penuh", "tidak digambar", "setengah simbol"] }],
      sukses: "Tepat! Hari Jumat digambar 2 simbol dan satu setengah simbol, nilainya 2 × 4 + 2 = 10.",
      salah: "Hmm, sisa 2 adalah setengah dari kunci 4. Coba lagi.",
    },
    {
      id: "salah",
      jenis: "pilih",
      cerita: "Teman Anggi menggambar hari Sabtu: tabel menulis 12 kue, kunci 4, tetapi gambarnya 4 simbol. Apa kesalahannya?",
      opsi: [
        { teks: "tidak ada yang salah, 4 simbol cukup", benar: false, umpan: "Hitung dulu: 12 ÷ 4 = 3 simbol. Empat simbol berarti 16 kue, tidak cocok dengan tabel." },
        { teks: "kurang satu simbol, seharusnya 3", benar: false, umpan: "Seharusnya 3 simbol, jadi gambarnya kelebihan, bukan kurang." },
        { teks: "terlalu banyak satu simbol, seharusnya 3", benar: true, umpan: "Betul! 12 ÷ 4 = 3, jadi satu simbol harus dihapus supaya cocok dengan tabel." },
      ],
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Piktogram memakai kunci: satu simbol mewakili nilai tertentu. Nilai dibaca dari banyak simbol dikali kunci, setengah simbol bernilai setengah kunci, dan semua simbol harus seragam. Selalu cocokkan dengan tabel frekuensi.",
    },
  ],
};
