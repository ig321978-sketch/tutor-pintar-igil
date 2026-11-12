import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 4 Bab 1 untuk operasi hitung (Sub-Bab E dan F). Tanpa jaringan, tanpa model bahasa.
 * Bilangan dan kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k4b1.mjs.
 *  - SKENARIO_K4B1E: Jeruk Pak Toni     (penjumlahan bersusun, menyimpan, tiga bilangan)
 *  - SKENARIO_K4B1F: Buku Perpustakaan  (pengurangan bersusun, mengambil, memeriksa dengan penjumlahan)
 */

export const SKENARIO_K4B1E: DefSkenario = {
  id: "jeruk-pak-toni-k4b1",
  judul: "Jeruk Pak Toni",
  latar: "Bantu Pak Toni menjumlahkan pohon dan jeruk dengan cara bersusun.",
  tokoh: "👨‍🌾",
  nama: "Pak Toni",
  adegan: [
    { id: "buka", jenis: "narasi", cerita: "Halo! Aku Pak Toni, petani jeruk. Aku punya 131 pohon di Jember dan 321 pohon di Banyuwangi. Bantu aku menjumlahkan, ya.", tombol: "Ayo mulai! ➡" },
    {
      id: "pohon",
      jenis: "soal",
      cerita: "Kita jumlahkan dari satuan.",
      soal: [
        { teks: "131 + 321 = …", jawaban: "452", opsi: ["442", "452", "462"] },
        { teks: "9 + 5 = …", jawaban: "14", opsi: ["14", "4", "13"] },
        { teks: "328 + 579 = …", jawaban: "907", opsi: ["897", "817", "907"] },
      ],
      sukses: "Hebat! 131 + 321 = 452 tanpa menyimpan, dan 328 + 579 = 907 dengan menyimpan.",
      salah: "Hmm, mulai dari satuan, dan ingat simpanannya. Coba lagi.",
    },
    {
      id: "simpan",
      jenis: "pilih",
      cerita: "Pedagang membawa 189 dan 245 jeruk. Kolom satuan: 9 + 5 = 14. Apa yang ditulis?",
      opsi: [
        { teks: "Tulis 14 di satuan", benar: false, umpan: "Satu kolom hanya berisi satu angka. Tulis 4 dan simpan 1 ke puluhan." },
        { teks: "Tulis 4, simpan 1 ke puluhan", benar: true, umpan: "Betul! Sepuluh satuan menjadi 1 puluhan yang disimpan." },
        { teks: "Tulis 4, simpanannya dibuang", benar: false, umpan: "Simpanan tidak boleh dibuang. Simpanan 1 ikut dijumlahkan di kolom puluhan." },
      ],
    },
    {
      id: "sisa-satuan",
      jenis: "hitung",
      cerita: "Dari 14 satuan, sepuluh ditukar menjadi 1 puluhan. Tiap stik di bawah ini satu satuan yang tersisa.",
      tanya: "Ketuk semua stik. Berapa satuan yang ditulis?",
      objek: "stik",
      jumlah: 4,
      sukses: "Betul! Tulis 4 di satuan, dan 1 puluhan disimpan.",
      salah: "Hmm, ketuk tiap stik satu kali, lalu hitung lagi.",
    },
    {
      id: "puluhan",
      jenis: "isi",
      cerita: "Kolom puluhan: 8 + 4 + simpanan 1 = 13. Masukkan stik sebanyak angka yang ditulis di puluhan.",
      objek: "stik",
      target: 3,
      maks: 10,
      sukses: "Pas! Tulis 3 di puluhan, simpan 1 ke ratusan.",
      kurang: "Stiknya masih kurang. Tiga belas: tulis satuannya.",
      lebih: "Stiknya kelebihan. Yang ditulis hanya satuan dari tiga belas.",
    },
    {
      id: "hasil",
      jenis: "pilih",
      cerita: "Kolom ratusan: 1 + 2 + simpanan 1. Berapa jumlah semua jeruk itu?",
      opsi: [
        { teks: "324 jeruk", benar: false, umpan: "Itu hasil bila simpanan dilupakan. Simpanan harus ikut dijumlahkan." },
        { teks: "334 jeruk", benar: false, umpan: "Simpanan di kolom puluhan sudah benar, tetapi simpanan ke ratusan terlupa." },
        { teks: "434 jeruk", benar: true, umpan: "Betul! 189 dan 245 berjumlah 434 jeruk." },
      ],
    },
    {
      id: "tiga",
      jenis: "soal",
      cerita: "Sekolah mengumpulkan buku dari tiga kelas: 124, 411, dan 363 buku.",
      soal: [
        { teks: "124 + 411 + 363 = …", jawaban: "898", opsi: ["898", "888", "798"] },
        { teks: "117 + 105 + 242 = …", jawaban: "464", opsi: ["454", "464", "364"] },
        { teks: "Tiga bilangan boleh dijumlahkan …", jawaban: "dua-dua dulu", opsi: ["dua-dua dulu", "dari ratusan", "tanpa menyimpan"] },
      ],
      sukses: "Tepat! Tiga bilangan boleh dijumlahkan bertahap, dua-dua dulu.",
      salah: "Hmm, jumlahkan dua bilangan dulu, lalu tambahkan bilangan ketiga. Coba lagi.",
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Semua sudah dijumlahkan. Ingat: mulai dari satuan, dan simpanan selalu ikut dijumlahkan." },
  ],
};

export const SKENARIO_K4B1F: DefSkenario = {
  id: "buku-perpustakaan-k4b1",
  judul: "Buku Perpustakaan",
  latar: "Bantu Drio menghitung buku yang tersisa di perpustakaan.",
  tokoh: "🧒",
  nama: "Drio",
  adegan: [
    { id: "buka", jenis: "narasi", cerita: "Hai! Aku Drio, petugas perpustakaan kelas. Ada 265 buku, lalu 132 buku dipinjam. Bantu aku menghitung sisanya, ya.", tombol: "Ayo mulai! ➡" },
    {
      id: "sisa",
      jenis: "soal",
      cerita: "Kurangkan bersusun dari satuan.",
      soal: [
        { teks: "265 − 132 = …", jawaban: "133", opsi: ["133", "137", "397"] },
        { teks: "241 − 129 = …", jawaban: "112", opsi: ["128", "112", "122"] },
        { teks: "253 − 176 = …", jawaban: "77", opsi: ["123", "87", "77"] },
      ],
      sukses: "Hebat! 133, 112, dan 77. Kadang perlu mengambil sekali, kadang dua kali.",
      salah: "Hmm, bila angka atas kurang, ambil 1 dari kiri. Jangan dibalik. Coba lagi.",
    },
    {
      id: "ambil",
      jenis: "pilih",
      cerita: "241 − 129. Kolom satuan: 1 kurang dari 9. Apa yang dilakukan?",
      opsi: [
        { teks: "Balik saja menjadi 9 − 1", benar: false, umpan: "Angka bawah dikurangkan dari angka atas. Membalik membuat hasilnya 128, keliru." },
        { teks: "Ambil 1 puluhan, satuan menjadi 11", benar: true, umpan: "Betul! 1 puluhan menjadi 10 satuan. 11 − 9 = 2." },
        { teks: "Tulis 0 karena tidak cukup", benar: false, umpan: "Satuan tidak cukup, jadi ambil 1 puluhan dulu. Hasilnya bukan 0." },
      ],
    },
    {
      id: "sebelas",
      jenis: "hitung",
      cerita: "Satuan menjadi 11, lalu dikurangi 9. Tiap stik di bawah ini satu satuan yang tersisa.",
      tanya: "Ketuk semua stik. Berapa satuan yang tersisa?",
      objek: "stik",
      jumlah: 2,
      sukses: "Betul! 11 − 9 = 2. Puluhan tinggal 3 karena 1 sudah diambil.",
      salah: "Hmm, ketuk tiap stik satu kali, lalu hitung lagi.",
    },
    {
      id: "dua-kali",
      jenis: "pilih",
      cerita: "253 − 176. Berapa kali kita perlu mengambil?",
      opsi: [
        { teks: "Sekali, di satuan saja", benar: false, umpan: "Setelah satuan mengambil, puluhan tinggal 4. Empat kurang dari 7, jadi puluhan juga mengambil." },
        { teks: "Tidak perlu mengambil", benar: false, umpan: "Satuan 3 kurang dari 6, jadi perlu mengambil." },
        { teks: "Dua kali, di satuan dan puluhan", benar: true, umpan: "Betul! Mengambil di satuan, lalu di puluhan. Hasilnya 77." },
      ],
    },
    {
      id: "puluhan-66",
      jenis: "isi",
      cerita: "241 − 175 = 66. Masukkan stik sebanyak angka puluhan pada hasil itu.",
      objek: "stik",
      target: 6,
      maks: 10,
      sukses: "Pas! Puluhan pada 66 adalah 6.",
      kurang: "Stiknya masih kurang. Lihat angka puluhan pada 66.",
      lebih: "Stiknya kelebihan. Lihat angka puluhan pada 66.",
    },
    {
      id: "periksa",
      jenis: "pilih",
      cerita: "Drio memeriksa hasil 241 − 129 = 112 dengan menjumlahkan 112 dan 129. Hasil benar bila jumlahnya…",
      opsi: [
        { teks: "Sama dengan 241, bilangan awal", benar: true, umpan: "Betul! 112 + 129 = 241, jadi hasil pengurangannya benar." },
        { teks: "Sama dengan 129, bilangan pengurang", benar: false, umpan: "Jumlah hasil dan pengurang harus kembali ke bilangan awal, yaitu 241." },
        { teks: "Sama dengan 112, hasilnya", benar: false, umpan: "112 + 129 pasti lebih dari 112. Bandingkan dengan bilangan awal." },
      ],
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Catatan perpustakaan sudah rapi. Ingat: bila tidak cukup, ambil 1 dari kiri, dan periksa dengan penjumlahan." },
  ],
};
