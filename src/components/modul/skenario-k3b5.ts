import type { DefSkenario } from "./skenario-umum";

/**
 * Dua skenario Kelas 3 Bab 5 (Penyajian Data dalam Tabel). Tanpa jaringan, tanpa panggilan model bahasa.
 * Bilangan dan kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k3b5.mjs.
 *  - SKENARIO_K3B5A: Pemilihan Ketua Kelas (Sub-Bab A: mengurutkan, terkecil, terbesar, jangkauan, selisih)
 *  - SKENARIO_K3B5B: Laporan Kelas         (Sub-Bab B: turus kelompok lima dan tabel; sekaligus mengulang seluruh bab)
 * Data suara: Alen 7, Citra 4, Beni 9, Dewi 5. Data nilai: nilai ulangan buku (20 siswa; nilai 5 ada 1, 6 ada 4,
 * 7 ada 5, 8 ada 3, 9 ada 5, 10 ada 2).
 */

export const SKENARIO_K3B5A: DefSkenario = {
  id: "ketua-kelas-k3b5",
  judul: "Pemilihan Ketua Kelas",
  latar: "Bantu Galih menghitung, mengurutkan, dan membandingkan suara calon ketua kelas.",
  tokoh: "🧒",
  nama: "Galih",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Galih. Hari ini kelasku memilih ketua kelas. Calonnya Alen, Citra, Beni, dan Dewi. Bantu aku menghitung dan membandingkan suaranya, ya.",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "suara-beni",
      jenis: "hitung",
      cerita: "Setiap suara untuk Beni dicatat dengan satu stik.",
      tanya: "Ketuk semua stik. Ada berapa suara untuk Beni?",
      objek: "stik",
      jumlah: 9,
      sukses: "Betul! Beni mendapat sembilan suara. Satu stik untuk satu suara.",
      salah: "Hmm, ketuk tiap stik satu kali, lalu hitung lagi.",
    },
    {
      id: "urut",
      jenis: "soal",
      cerita: "Suara keempat calon: Alen 7, Citra 4, Beni 9, dan Dewi 5. Ayo urutkan dan bandingkan.",
      soal: [
        { teks: "Diurutkan dari terkecil: 4, 5, 7, …", jawaban: "9", opsi: ["7", "9", "4"] },
        { teks: "Suara paling sedikit adalah …", jawaban: "4", opsi: ["5", "7", "4"] },
        { teks: "Jangkauan suara: 9 − 4 = …", jawaban: "5", opsi: ["5", "13", "4"] },
      ],
      sukses: "Hebat! Urutannya 4, 5, 7, 9. Terkecil 4, terbesar 9, dan jangkauannya 9 − 4 = 5.",
      salah: "Hmm, urutkan dulu dari yang paling kecil. Jangkauan adalah terbesar dikurangi terkecil. Coba lagi.",
    },
    {
      id: "ketua",
      jenis: "pilih",
      cerita: "Siapa yang terpilih menjadi ketua kelas?",
      opsi: [
        { teks: "Alen, karena namanya disebut pertama", benar: false, umpan: "Urutan nama tidak menentukan ketua. Yang menang adalah calon dengan suara terbanyak." },
        { teks: "Citra, karena suaranya 4", benar: false, umpan: "Empat adalah suara paling sedikit. Ketua kelas dipilih dari suara paling banyak." },
        { teks: "Beni, karena suaranya paling banyak", benar: true, umpan: "Betul! Beni mendapat 9 suara, data terbesar. Beni menjadi ketua kelas." },
      ],
    },
    {
      id: "jangkauan-salah",
      jenis: "pilih",
      cerita: "Dewi berkata, \"Jangkauan suaranya 9 + 4 = 13.\" Bagaimana menurutmu?",
      opsi: [
        { teks: "Keliru. Jangkauan = 9 − 4 = 5", benar: true, umpan: "Betul! Jangkauan adalah selisih, jadi data terbesar dikurangi data terkecil." },
        { teks: "Benar, jangkauannya 13", benar: false, umpan: "Tiga belas didapat dari menjumlahkan. Jangkauan adalah selisih: 9 − 4 = 5." },
        { teks: "Keliru. Jangkauan = 9 − 7 = 2", benar: false, umpan: "Tujuh adalah suara Alen yang disebut pertama, bukan suara terkecil. Suara terkecil 4, jadi 9 − 4 = 5." },
      ],
    },
    {
      id: "selisih",
      jenis: "isi",
      cerita: "Beni mendapat 9 suara dan Citra 4 suara. Berapa suara lebih banyak yang didapat Beni? Masukkan stik sebanyak selisihnya.",
      objek: "stik",
      target: 5,
      maks: 12,
      sukses: "Pas! 9 − 4 = 5. Beni mendapat 5 suara lebih banyak daripada Citra.",
      kurang: "Stiknya masih kurang. Hitung 9 − 4.",
      lebih: "Stiknya kelebihan. Selisihnya 9 − 4.",
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Beni menjadi ketua kelas. Ingat: urutkan data dulu, lalu cari terkecil, terbesar, dan jangkauannya." },
  ],
};

export const SKENARIO_K3B5B: DefSkenario = {
  id: "laporan-kelas-k3b5",
  judul: "Laporan Kelas",
  latar: "Bantu Citra menyajikan nilai ulangan dua puluh siswa dalam tabel dan membacanya.",
  tokoh: "👧",
  nama: "Citra",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Hai! Aku Citra. Bu Guru memberiku nilai ulangan dua puluh siswa. Aku harus membuat tabel dan laporan untuk kelas. Bantu aku, ya.",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "ujung",
      jenis: "soal",
      cerita: "Nilai sudah kuurutkan dari terkecil: 5, 6, 6, 6, 6, 7, sampai 10, 10.",
      soal: [
        { teks: "Nilai terkecil adalah …", jawaban: "5", opsi: ["5", "6", "10"] },
        { teks: "Nilai terbesar adalah …", jawaban: "10", opsi: ["9", "10", "5"] },
        { teks: "10 − 5 = …", jawaban: "5", opsi: ["15", "4", "5"] },
      ],
      sukses: "Hebat! Terkecil 5, terbesar 10, dan jangkauannya 10 − 5 = 5.",
      salah: "Hmm, data terkecil ada di ujung awal dan terbesar di ujung akhir. Jangkauan adalah selisihnya. Coba lagi.",
    },
    {
      id: "turus-9",
      jenis: "hitung",
      cerita: "Aku mencacah nilai 9. Tiap stik satu garis turus.",
      tanya: "Ketuk semua stik. Berapa siswa bernilai 9?",
      objek: "stik",
      jumlah: 5,
      sukses: "Betul! Lima siswa bernilai 9. Turusnya empat garis tegak dan satu garis miring.",
      salah: "Hmm, ketuk tiap stik satu kali, lalu hitung lagi.",
    },
    {
      id: "kelima",
      jenis: "pilih",
      cerita: "Untuk nilai 7 aku sudah menulis empat garis tegak. Siswa kelima juga bernilai 7. Bagaimana menulis garis kelima?",
      opsi: [
        { teks: "Garis tegak kelima di sebelahnya", benar: false, umpan: "Lima garis tegak berjajar sulit dihitung. Garis kelima dicoret miring agar menjadi kelompok lima." },
        { teks: "Garis miring mencoret empat garis tegak", benar: true, umpan: "Betul! Empat tegak dicoret satu miring menjadi kelompok lima. Mudah dihitung." },
        { teks: "Tulis angka 5 di kolom turus", benar: false, umpan: "Kolom turus diisi garis. Angka ditulis di kolom banyak." },
      ],
    },
    {
      id: "tabel",
      jenis: "soal",
      cerita: "Tabelku punya tiga kolom: nilai, turus, dan banyak.",
      soal: [
        { teks: "Turus 卌 卌 ||| menyatakan …", jawaban: "13", opsi: ["11", "13", "5"] },
        { teks: "Kolom ketiga tabel berisi …", jawaban: "banyak", opsi: ["turus", "nilai", "banyak"] },
        { teks: "Huruf T pada kata STATISTIKA muncul … kali.", jawaban: "3", opsi: ["3", "2", "1"] },
      ],
      sukses: "Tepat! Dua kelompok lima dan tiga garis sama dengan 13, kolom ketiga berisi banyak, dan T muncul tiga kali.",
      salah: "Hmm, satu kelompok lima nilainya 5. Kolom tabel: nilai, turus, banyak. Coba lagi.",
    },
    {
      id: "lebih-7",
      jenis: "pilih",
      cerita: "Bu Guru bertanya: berapa siswa bernilai lebih dari 7? Di tabelku: nilai 7 ada 5, nilai 8 ada 3, nilai 9 ada 5, dan nilai 10 ada 2.",
      opsi: [
        { teks: "3 siswa, karena ada tiga baris", benar: false, umpan: "Tiga adalah banyak baris, bukan banyak siswa. Jumlahkan angka di kolom banyak: 3 + 5 + 2 = 10." },
        { teks: "15 siswa: nilai 7, 8, 9, dan 10", benar: false, umpan: "Nilai 7 ikut terhitung. Lebih dari 7 berarti 8, 9, dan 10 saja: 3 + 5 + 2 = 10." },
        { teks: "10 siswa: nilai 8, 9, dan 10", benar: true, umpan: "Betul! Lebih dari 7 adalah nilai 8, 9, dan 10: 3 + 5 + 2 = 10. Nilai 7 sendiri tidak ikut." },
      ],
    },
    {
      id: "kurang-7",
      jenis: "isi",
      cerita: "Sekarang siswa bernilai kurang dari 7: nilai 5 ada 1 dan nilai 6 ada 4. Masukkan stik sebanyak siswanya.",
      objek: "stik",
      target: 5,
      maks: 12,
      sukses: "Pas! 1 + 4 = 5 siswa bernilai kurang dari 7.",
      kurang: "Stiknya masih kurang. Jumlahkan 1 + 4.",
      lebih: "Stiknya kelebihan. Kurang dari 7 hanya nilai 5 dan 6: 1 + 4.",
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Laporanku selesai. Ingat: urutkan data, cacah dengan turus kelompok lima, tulis banyaknya di tabel, lalu baca tabelnya." },
  ],
};
