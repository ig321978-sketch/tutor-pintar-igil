import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 5 Bab 9 (Bilangan Cacah sampai 1.000.000). Tanpa jaringan, tanpa model bahasa.
 * Kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k5b9.mjs (dihitung ulang mandiri).
 *  - SKENARIO_K5B9A: Nisa dan Lemari Jepara (membaca, menulis, nilai tempat, nilai angka, dan satu juta)
 *  - SKENARIO_K5B9B: Lukas dan Sepatu (membandingkan dari kolom paling kiri, geser bila sama, mengurutkan, dan tanda; menyentuh nilai tempat dari A)
 *  - SKENARIO_K5B9C: Nisa dan Harga Komputer (menyusun bagian nilai tempat, nol penyangga, menguraikan, memecah satu tempat menjadi sepuluh di kanannya;
 *    pencapaian bab, menyentuh membaca dari A dan membandingkan dari B)
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

export const SKENARIO_K5B9B: DefSkenario = {
  id: "lukas-sepatu-k5b9",
  judul: "Lukas dan Sepatu",
  latar: "Bantu Lukas membandingkan dan mengurutkan harga sepatu.",
  tokoh: "👦",
  nama: "Lukas",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Lukas. Aku, Komang, dan Nisa membeli sepatu. Harganya bilangan besar, jadi kita harus pintar membandingkan. Ingat tabel nilai tempat dari tadi? Kita akan memakainya!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "mulai",
      jenis: "pilih",
      cerita: "Harga sepatuku 432.543 dan harga sepatu Komang 342.231. Dari kolom mana kita mulai membandingkan?",
      opsi: [
        { teks: "dari kolom satuan, paling kanan", benar: false, umpan: "Satuan nilainya paling kecil, jadi belum tentu menentukan. Mulailah dari kolom paling kiri." },
        { teks: "dari kolom paling kiri, yaitu ratus ribuan", benar: true, umpan: "Betul! Kolom paling kiri nilainya paling besar, jadi dibandingkan lebih dulu." },
        { teks: "dari kolom mana saja, bebas", benar: false, umpan: "Kalau asal memilih, hasilnya bisa keliru. Selalu mulai dari kolom paling kiri." },
      ],
    },
    {
      id: "sepatu",
      jenis: "soal",
      cerita: "Harga tiga sepatu: Lukas 432.543, Komang 342.231, dan Nisa 232.231. Angka ratus ribuannya 4, 3, dan 2.",
      soal: [
        { teks: "Sepatu yang paling mahal milik …", jawaban: "Lukas", opsi: ["Komang", "Nisa", "Lukas"] },
        { teks: "Sepatu yang paling murah milik …", jawaban: "Nisa", opsi: ["Nisa", "Komang", "Lukas"] },
      ],
      sukses: "Tepat! Ratus ribuan 4 paling besar dan 2 paling kecil, jadi Lukas paling mahal dan Nisa paling murah.",
      salah: "Hmm, lihat angka di kolom ratus ribuan masing-masing. Coba lagi.",
    },
    {
      id: "kolom",
      jenis: "hitung",
      cerita: "Dua ponsel berharga 599.198 dan 599.047. Ketuk satu stik untuk tiap kolom yang diperiksa dari kiri sampai ketemu kolom yang berbeda, termasuk kolom yang berbeda itu.",
      tanya: "Ketuk semua stik. Ada berapa kolom yang diperiksa?",
      objek: "stik",
      jumlah: 4,
      sukses: "Betul! Ratus ribuan, puluh ribuan, dan ribuan sama, lalu ratusan berbeda: 1 lawan 0. Jadi ada 4 kolom yang diperiksa.",
      salah: "Hmm, periksa dari kiri: tiga kolom pertama sama, kolom keempat berbeda. Hitung lagi.",
    },
    {
      id: "beda",
      jenis: "soal",
      cerita: "Pada 599.198 dan 599.047, kolom ratusan berbeda: 1 dan 0.",
      soal: [
        { teks: "Bilangan yang lebih besar adalah …", jawaban: "599.198", opsi: ["599.198", "599.047", "sama besar"] },
        { teks: "Kolom yang menentukan adalah …", jawaban: "ratusan", opsi: ["satuan", "ribuan", "ratusan"] },
      ],
      sukses: "Hebat! 599.198 lebih besar dari 599.047, karena di kolom ratusan 1 lebih besar dari 0.",
      salah: "Hmm, cari kolom pertama yang berbeda dari kiri. Coba lagi.",
    },
    {
      id: "puluhan",
      jenis: "pilih",
      cerita: "Nomor undian 789.876 dan 789.867. Satuannya 6 dan 7, jadi Nisa mengira 789.867 lebih besar. Benarkah?",
      opsi: [
        { teks: "salah, karena puluhan 7 lebih besar dari 6, jadi 789.876 lebih besar", benar: true, umpan: "Betul! Kolom pertama yang berbeda dari kiri adalah puluhan: 7 lebih besar dari 6." },
        { teks: "benar, karena satuan 7 lebih besar dari 6", benar: false, umpan: "Satuan bukan penentu. Kolom puluhan lebih dulu berbeda dari kiri." },
        { teks: "sama besar, karena enam angka pertamanya mirip", benar: false, umpan: "Mirip belum tentu sama. Puluhannya berbeda, jadi besarnya berbeda." },
      ],
    },
    {
      id: "urut",
      jenis: "soal",
      cerita: "Lukas mengurutkan harga sepatu dari yang paling murah: Nisa 232.231, Komang 342.231, Lukas 432.543. Ia membandingkan dua bilangan bertetangga berulang kali.",
      soal: [
        { teks: "Urutan naik, dari paling kecil ke paling besar, adalah …", jawaban: "232.231, 342.231, 432.543", opsi: ["432.543, 342.231, 232.231", "232.231, 342.231, 432.543", "342.231, 232.231, 432.543"] },
        { teks: "Tanda yang tepat untuk 342.231 … 432.543 adalah …", jawaban: "lebih kecil dari", opsi: ["lebih besar dari", "sama dengan", "lebih kecil dari"] },
      ],
      sukses: "Betul! Urut naik berarti dari kecil ke besar, dan 342.231 lebih kecil dari 432.543.",
      salah: "Hmm, bandingkan dari kolom paling kiri yang berbeda. Coba lagi.",
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Bandingkan mulai dari kolom paling kiri dan geser ke kanan bila angkanya sama. Kolom pertama yang berbeda menentukan bilangan yang lebih besar. Dengan membandingkan berulang, bilangan bisa diurutkan naik atau turun.",
    },
  ],
};

export const SKENARIO_K5B9C: DefSkenario = {
  id: "nisa-komputer-k5b9",
  judul: "Nisa dan Harga Komputer",
  latar: "Bantu Nisa menyusun dan menguraikan harga komputer.",
  tokoh: "👧",
  nama: "Nisa",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Nisa lagi. Di toko komputer, harga ditulis dengan bagian nilai tempat, misalnya 3 ratus ribuan, 2 puluh ribuan, dan seterusnya. Kita akan menyusun bagian-bagian itu menjadi satu bilangan, lalu menguraikannya kembali. Kita juga memakai bacaan dan perbandingan dari tadi!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "arti",
      jenis: "pilih",
      cerita: "Menyusun bagian-bagian nilai tempat menjadi satu bilangan disebut komposisi. Lalu apa arti menguraikan bilangan, atau dekomposisi?",
      opsi: [
        { teks: "menguraikan bilangan menjadi jumlah nilai tiap tempatnya", benar: true, umpan: "Betul! Komposisi menyusun bagian menjadi bilangan, dekomposisi menguraikan bilangan menjadi bagian. Keduanya saling mengecek." },
        { teks: "menghapus angka di kolom paling kiri", benar: false, umpan: "Menghapus angka mengubah bilangannya. Menguraikan menjaga totalnya tetap sama." },
        { teks: "membaca bilangan dari kanan ke kiri", benar: false, umpan: "Itu bukan menguraikan. Menguraikan memecah bilangan menjadi nilai tiap tempat." },
      ],
    },
    {
      id: "bagian",
      jenis: "hitung",
      cerita: "Harga komputer: 3 ratus ribuan, 2 puluh ribuan, 7 ribuan, dan 1 ratusan. Ketuk satu stik untuk tiap bagian yang disebut.",
      tanya: "Ketuk semua stik. Ada berapa bagian yang disebut?",
      objek: "stik",
      jumlah: 4,
      sukses: "Betul! Ada 4 bagian. Puluhan dan satuan tidak disebut, jadi nanti diisi nol.",
      salah: "Hmm, hitung bagian yang disebut saja, satu stik untuk satu bagian. Coba lagi.",
    },
    {
      id: "susun",
      jenis: "soal",
      cerita: "Nisa menyusun bagian-bagian itu ke enam kolom. Tempat yang tidak disebut diisi nol.",
      soal: [
        { teks: "3 ratus ribuan + 2 puluh ribuan + 7 ribuan + 1 ratusan tersusun menjadi …", jawaban: "327.100", opsi: ["3.271", "327.100", "327.010"] },
        { teks: "Kasir menyusun 2 ratus ribuan + 3 ribuan + 3 ratusan + 5 satuan. Hasilnya …", jawaban: "203.305", opsi: ["203.305", "2.335", "230.305"] },
      ],
      sukses: "Tepat! Nol penyangga menjaga tiap angka tetap di tempatnya, jadi 203.305 dan bukan 2.335.",
      salah: "Hmm, isi enam kolom satu per satu. Kolom yang tidak disebut diisi 0. Coba lagi.",
    },
    {
      id: "urai",
      jenis: "soal",
      cerita: "Sekarang sebaliknya. Nisa menguraikan harga televisi 599.198 menjadi jumlah nilai tiap tempat.",
      soal: [
        { teks: "599.198 = 500.000 + 90.000 + 9.000 + 100 + 90 + …", jawaban: "8", opsi: ["8", "80", "800"] },
        { teks: "Setelah diuraikan, uraian itu dijumlahkan kembali supaya …", jawaban: "hasilnya sama dengan bilangan awal", opsi: ["hasilnya menjadi lebih kecil", "hasilnya sama dengan bilangan awal", "angkanya dihapus satu"] },
      ],
      sukses: "Hebat! 500.000 + 90.000 + 9.000 + 100 + 90 + 8 = 599.198. Menyusun dan menguraikan saling mengecek.",
      salah: "Hmm, kalikan tiap angka dengan nilai tempatnya, lalu jumlahkan kembali. Coba lagi.",
    },
    {
      id: "pecah",
      jenis: "isi",
      cerita: "Cara lain menguraikan: 1 ratus ribuan dipecah menjadi puluh ribuan. Masukkan satu stik untuk tiap puluh ribuan hasil pemecahannya.",
      objek: "stik",
      target: 10,
      maks: 12,
      sukses: "Pas! 1 ratus ribuan sama dengan 10 puluh ribuan, dan total bilangannya tetap sama.",
      kurang: "Stiknya masih kurang. Satu ratus ribuan sama dengan sepuluh puluh ribuan.",
      lebih: "Stiknya kebanyakan. Satu ratus ribuan sama dengan tepat sepuluh puluh ribuan.",
    },
    {
      id: "cek",
      jenis: "soal",
      cerita: "Nisa memakai hasil susunnya untuk dua cek: membandingkan dan membaca.",
      soal: [
        { teks: "327.100 … 203.305. Hubungan yang tepat adalah …", jawaban: "lebih besar dari", opsi: ["lebih kecil dari", "sama dengan", "lebih besar dari"] },
        { teks: "203.305 dibaca …", jawaban: "dua ratus tiga ribu tiga ratus lima", opsi: ["dua ratus tiga ribu tiga ratus lima", "dua ratus tiga puluh ribu tiga ratus lima", "dua ratus tiga ribu tiga puluh lima"] },
      ],
      sukses: "Betul! Ratus ribuan 3 lebih besar dari 2, dan nol di puluh ribuan tidak diucapkan.",
      salah: "Hmm, bandingkan dari kolom paling kiri dan baca dari kiri. Coba lagi.",
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Komposisi menyusun bagian nilai tempat menjadi bilangan, dan nol penyangga tetap ditulis. Dekomposisi menguraikan bilangan menjadi jumlah nilai tempat, dan jumlahnya kembali ke bilangan awal. Satu tempat bisa dipecah menjadi sepuluh tempat di kanannya tanpa mengubah total.",
    },
  ],
};
