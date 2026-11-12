import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 5 Bab 9 (Bilangan Cacah sampai 1.000.000). Tanpa jaringan, tanpa model bahasa.
 * Kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k5b9.mjs (dihitung ulang mandiri).
 *  - SKENARIO_K5B9A: Nisa dan Lemari Jepara (membaca, menulis, nilai tempat, nilai angka, dan satu juta)
 */

export const SKENARIO_K5B9A: DefSkenario = {
  id: "nisa-lemari-k5b9",
  judul: "Nisa dan Lemari Jepara",
  latar: "Bantu Nisa membaca dan menulis harga lemari Jepara.",
  tokoh: "👧",
  nama: "Nisa",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Nisa. Ibu dan aku melihat lemari Jepara yang harganya 979.875 rupiah. Bilangan sebesar itu harus dibaca dengan teliti. Ayo kita belajar membaca, menulis, dan memahami tempat tiap angkanya!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "baca",
      jenis: "pilih",
      cerita: "Harga lemari tertulis 979.875. Titik memisahkan ribuan supaya mudah dibaca. Bagaimana membacanya?",
      opsi: [
        { teks: "sembilan ratus tujuh puluh sembilan ribu delapan ratus tujuh puluh lima", benar: true, umpan: "Betul! Baca dari kiri: kelompok sebelum titik diikuti kata ribu, lalu kelompok sesudah titik." },
        { teks: "sembilan juta tujuh ratus delapan puluh lima", benar: false, umpan: "Itu terlalu besar. Bilangan ini belum sampai satu juta, dan kelompok sebelum titik berarti ribuan." },
        { teks: "sembilan ratus tujuh puluh sembilan delapan ratus tujuh puluh lima", benar: false, umpan: "Kata ribu terlewat. Kelompok di kiri titik harus diikuti kata ribu." },
      ],
    },
    {
      id: "digit",
      jenis: "hitung",
      cerita: "Nisa menandai tiap angka pada 979.875 dengan satu stik supaya tidak ada yang terlewat.",
      tanya: "Ketuk semua stik. Ada berapa angka pada 979.875?",
      objek: "stik",
      jumlah: 6,
      sukses: "Betul! Ada 6 angka, jadi ada 6 kolom tempat, dari ratus ribuan sampai satuan.",
      salah: "Hmm, ketuk tiap stik sekali saja untuk satu angka, lalu hitung lagi.",
    },
    {
      id: "tempat",
      jenis: "soal",
      cerita: "Nisa memasukkan 979.875 ke tabel nilai tempat. Enam kolomnya dari kiri: ratus ribuan, puluh ribuan, ribuan, ratusan, puluhan, satuan.",
      soal: [
        { teks: "Angka 7 pada 979.875 ada di tempat …", jawaban: "puluh ribuan", opsi: ["ratus ribuan", "puluh ribuan", "ribuan"] },
        { teks: "Angka 5 pada 979.875 ada di tempat …", jawaban: "satuan", opsi: ["satuan", "puluhan", "ratusan"] },
      ],
      sukses: "Hebat! Tiap angka mengisi tepat satu kolom, dan 7 ada di puluh ribuan.",
      salah: "Hmm, hitung kolom dari kiri atau dari kanan satu per satu. Coba lagi.",
    },
    {
      id: "nilai",
      jenis: "soal",
      cerita: "Nilai sebuah angka bergantung pada tempatnya: angka dikali nilai tempatnya.",
      soal: [
        { teks: "Nilai angka 9 yang paling kiri pada 979.875 adalah …", jawaban: "900.000", opsi: ["9", "90.000", "900.000"] },
        { teks: "Nilai angka 7 pada 979.875 adalah 7 × 10.000 = …", jawaban: "70.000", opsi: ["7.000", "70.000", "700.000"] },
      ],
      sukses: "Tepat! 9 × 100.000 = 900.000 dan 7 × 10.000 = 70.000.",
      salah: "Hmm, kalikan angkanya dengan nilai tempat kolomnya. Coba lagi.",
    },
    {
      id: "nol",
      jenis: "soal",
      cerita: "Kasir menulis harga sepeda motor: lima ratus ribu empat puluh rupiah. Ada kolom yang tidak diucapkan.",
      soal: [
        { teks: "Tulisan angkanya adalah …", jawaban: "500.040", opsi: ["540", "500.040", "50.040"] },
        { teks: "Nol pada 500.040 tetap ditulis supaya …", jawaban: "angka lain tidak bergeser dari tempatnya", opsi: ["angka lain tidak bergeser dari tempatnya", "bilangannya terlihat lebih panjang", "kasir tidak perlu menghitung"] },
      ],
      sukses: "Betul! Nol penyangga menjaga tiap angka tetap di tempatnya.",
      salah: "Hmm, isi enam kolom satu per satu. Kolom yang kosong diisi nol. Coba lagi.",
    },
    {
      id: "juta",
      jenis: "pilih",
      cerita: "Kalau 999.999 ditambah 1, semua kolom menjadi nol dan muncul angka 1 di kolom jutaan. Hasilnya 1.000.000. Bagaimana membacanya?",
      opsi: [
        { teks: "seratus ribu", benar: false, umpan: "Seratus ribu hanya punya lima nol. Hitung nolnya: ada enam nol." },
        { teks: "satu juta", benar: true, umpan: "Betul! 999.999 + 1 = 1.000.000, dibaca satu juta, batas bilangan bab ini." },
        { teks: "sepuluh juta", benar: false, umpan: "Sepuluh juta punya tujuh nol. Hitung nolnya lagi." },
      ],
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Bilangan dibaca dari kiri, kelompok sebelum titik diikuti kata ribu. Tiap angka mengisi satu kolom tempat, dan nol tetap ditulis. Nilai angka sama dengan angkanya dikali nilai tempat, dan 999.999 ditambah 1 menjadi satu juta.",
    },
  ],
};
