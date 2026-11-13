import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 6 Bab 1 (Pecahan dan Desimal). Tanpa jaringan, tanpa model bahasa.
 * Kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k6b1.mjs (dihitung ulang mandiri).
 *  - SKENARIO_K6B1A: Agam dan Kebun Ayah (Area Model, Whole-as-Fraction, Panah Lurus, dan urutan kali)
 *  - SKENARIO_K6B1B: Agam, Gelas, dan Sirup (Partition Division, Reciprocal, Cross-Arrow Divide, dan Measurement Division)
 *  - SKENARIO_K6B1C: Agam, Timbangan, dan Lompat Jauh (Equivalent Fraction to Tenths/Hundredths, Grid Tenths-Hundredths Link, Decimal Place-Value Chart, dan Decimal Compare-and-Order)
 */

export const SKENARIO_K6B1A: DefSkenario = {
  id: "agam-kebun-k6b1",
  judul: "Agam dan Kebun Ayah",
  latar: "Bantu Agam menghitung air siraman kebun dengan perkalian pecahan.",
  tokoh: "👦",
  nama: "Agam",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Agam. Hari ini aku membantu Ayah menyiram kebun. Ember kecilku menyiram 3/5 meter persegi, artinya 3 kotak dari petak yang berisi 5 kotak sama besar. Ayo kita kalikan pecahan dengan model luas dan panah lurus!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "ember",
      jenis: "pilih",
      cerita: "Aku memakai 2 ember kecil. Tiap ember menyiram 3 kotak, jadi 2 × 3/5. Berapa meter persegi yang tersiram? Lihat petaknya: ukuran satu kotak tidak berubah.",
      opsi: [
        { teks: "6/10 meter persegi", benar: false, umpan: "Penyebut tidak ikut dikali. Kotaknya tetap sama besar, jadi tetap per lima." },
        { teks: "6/5 meter persegi", benar: true, umpan: "Betul! Area Model: 2 ember × 3 kotak = 6 kotak, ukuran kotak tetap per lima, jadi 6/5 meter persegi." },
        { teks: "5/5 meter persegi", benar: false, umpan: "Itu hasil menjumlah 2 dan 3. Dua ember mengisi 2 × 3 = 6 kotak." },
      ],
    },
    {
      id: "lima",
      jenis: "hitung",
      cerita: "Ayah memberi 5 ember kecil yang semuanya penuh. Satu stik mewakili satu ember.",
      tanya: "Ketuk semua stik. Ada berapa ember?",
      objek: "stik",
      jumlah: 5,
      sukses: "Betul! 5 ember: 5 × 3/5 = 15/5 = 3 meter persegi. Hasilnya utuh, yaitu 3 petak penuh.",
      salah: "Hmm, ketuk tiap stik sekali saja untuk satu ember, lalu hitung lagi.",
    },
    {
      id: "asli",
      jenis: "soal",
      cerita: "Whole-as-Fraction: bilangan asli ditulis sebagai pecahan berpenyebut 1 dan diberi kotak merah. Lalu Panah Lurus: atas dikali atas, bawah dikali bawah.",
      soal: [
        { teks: "Bilangan asli 2 ditulis sebagai pecahan …", jawaban: "2/1", opsi: ["2/1", "1/2", "2/2"] },
        { teks: "2/1 × 3/5 = (2×3)/(1×5) = …", jawaban: "6/5", opsi: ["6/10", "5/6", "6/5"] },
      ],
      sukses: "Hebat! 2 ditulis 2/1, lalu panah lurus memberi 6/5, sama dengan hasil Area Model.",
      salah: "Hmm, bilangan asli berpenyebut 1. Panah lurus mengalikan atas dengan atas dan bawah dengan bawah. Coba lagi.",
    },
    {
      id: "pohon",
      jenis: "soal",
      cerita: "Di kebun ada 15 pohon dan 2/3 di antaranya manalagi. Urutan kali boleh dibalik, hasilnya sama. Itu Commutative Multiply Check.",
      soal: [
        { teks: "2/3 × 15 = 2/3 × 15/1 = 30/3 = …", jawaban: "10", opsi: ["3", "10", "30"] },
        { teks: "1/4 × 20 = 20 × 1/4 = 20/4 = …", jawaban: "5", opsi: ["5", "20", "4"] },
      ],
      sukses: "Tepat! 30/3 = 10 pohon manalagi dan 20/4 = 5. Urutan tidak mengubah hasil kali.",
      salah: "Hmm, cari bilangan yang jika dikali penyebut hasilnya sama dengan pembilang. Coba lagi.",
    },
    {
      id: "gelas",
      jenis: "isi",
      cerita: "Aku menuang sirup 2/5 liter untuk tiap gelas. Ibu minta 4 gelas. Masukkan satu stik untuk tiap gelas. Nanti 4 × 2/5 = 8/5 liter.",
      objek: "stik",
      target: 4,
      maks: 8,
      sukses: "Betul! 4 gelas × 2/5 liter = 8/5 liter, lebih dari satu liter. Hasil boleh lebih dari 1.",
      kurang: "Gelasnya masih kurang. Tambah lagi sampai 4 gelas.",
      lebih: "Gelasnya kelebihan. Kurangi sampai 4 gelas.",
    },
    {
      id: "salah",
      jenis: "pilih",
      cerita: "Adikku menulis 2 × 3/5 = 6/10 di buku. Apa yang salah dari tulisannya?",
      opsi: [
        { teks: "Bilangan 2 harus ditulis 1/2", benar: false, umpan: "Bukan begitu. Bilangan asli ditulis berpenyebut 1, yaitu 2/1." },
        { teks: "Pembilang 6 harus diganti 5", benar: false, umpan: "Pembilangnya benar: 2 × 3 = 6. Periksa penyebutnya." },
        { teks: "Penyebut ikut dikali, padahal 1 × 5 = 5", benar: true, umpan: "Betul! Panah lurus mengalikan bawah dengan bawah: 1 × 5 = 5, jadi hasilnya 6/5." },
      ],
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Area Model: tiap ember menambah kotak terarsir, ukuran kotak tetap. Bilangan asli ditulis a/1, lalu Panah Lurus: atas dikali atas dan bawah dikali bawah. Urutan kali boleh dibalik, hasilnya sama, dan hasil boleh lebih dari 1.",
    },
  ],
};

export const SKENARIO_K6B1B: DefSkenario = {
  id: "agam-sirup-k6b1",
  judul: "Agam, Gelas, dan Sirup",
  latar: "Bantu Agam membagi sirup ke gelas dengan pembagian pecahan.",
  tokoh: "👦",
  nama: "Agam",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Agam. Hari ini Ibu membuat sirup dan aku membantu menuangnya ke gelas. Ada 1/2 liter sirup untuk 3 gelas. Pembagian pecahan bisa dikerjakan dengan memotong, dengan kebalikan, dan dengan menghitung berapa kali muat. Ayo mulai!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "gelas",
      jenis: "pilih",
      cerita: "Partition Division: 1/2 liter dibagi untuk 3 gelas sama banyak. Tiap potongan dipotong lagi menjadi 3 bagian sama. Berapa liter tiap gelas?",
      opsi: [
        { teks: "3/2 liter", benar: false, umpan: "Itu lebih dari satu liter. Membagi menghasilkan bagian yang lebih kecil, bukan lebih besar." },
        { teks: "1/6 liter", benar: true, umpan: "Betul! 1/2 dipotong menjadi 3 bagian sama, potongan baru berukuran 1/6, jadi 1/2 : 3 = 1/6 liter." },
        { teks: "1/5 liter", benar: false, umpan: "Penyebutnya dijumlah. Potongan dipotong 3 kali lebih kecil, jadi penyebutnya dikali: 2 × 3 = 6." },
      ],
    },
    {
      id: "tiga",
      jenis: "hitung",
      cerita: "Ibu menaruh 3 gelas di meja. Satu stik mewakili satu gelas.",
      tanya: "Ketuk semua stik. Ada berapa gelas?",
      objek: "stik",
      jumlah: 3,
      sukses: "Betul! 3 gelas, jadi 1/2 : 3 = 1/2 × 1/3 = 1/6 liter tiap gelas.",
      salah: "Hmm, ketuk tiap stik sekali saja untuk satu gelas, lalu hitung lagi.",
    },
    {
      id: "balik",
      jenis: "soal",
      cerita: "Reciprocal: kebalikan menukar pembilang dan penyebut. Cross-Arrow Divide Protocol: pembagian diganti perkalian dengan kebalikan.",
      soal: [
        { teks: "Kebalikan 3/1 adalah …", jawaban: "1/3", opsi: ["1/3", "3/1", "3/3"] },
        { teks: "1/2 : 3 = 1/2 × 1/3 = …", jawaban: "1/6", opsi: ["1/5", "1/6", "3/2"] },
      ],
      sukses: "Hebat! Kebalikan 3 adalah 1/3, lalu 1/2 × 1/3 = 1/6.",
      salah: "Hmm, tukar pembilang dan penyebut pembagi, lalu kalikan atas dengan atas dan bawah dengan bawah. Coba lagi.",
    },
    {
      id: "muat",
      jenis: "soal",
      cerita: "Measurement Division: berapa kali pembagi muat pada bilangan awal? Pembagi lebih kecil dari satu, jadi hasilnya lebih besar dari bilangan awal.",
      soal: [
        { teks: "3 liter air : 1/4 liter tiap gelas = 3 × 4/1 = …", jawaban: "12", opsi: ["3/4", "7", "12"] },
        { teks: "6 : 3/4 = 6 × 4/3 = 24/3 = …", jawaban: "8", opsi: ["8", "18", "9/2"] },
      ],
      sukses: "Tepat! 3 : 1/4 = 12 gelas dan 6 : 3/4 = 8.",
      salah: "Hmm, balik pembagi menjadi kebalikannya, kalikan, lalu sederhanakan. Coba lagi.",
    },
    {
      id: "bolu",
      jenis: "isi",
      cerita: "Ibu punya 6 loyang bolu dan tiap pembeli mendapat 3/4 loyang. Masukkan satu stik untuk tiap pembeli. Nanti 6 : 3/4 = 8 pembeli.",
      objek: "stik",
      target: 8,
      maks: 12,
      sukses: "Betul! 6 : 3/4 = 6 × 4/3 = 8 pembeli.",
      kurang: "Pembelinya masih kurang. Tambah lagi sampai 8 pembeli.",
      lebih: "Pembelinya kelebihan. Kurangi sampai 8 pembeli.",
    },
    {
      id: "salah",
      jenis: "pilih",
      cerita: "Adikku menulis 3 : 1/4 = 3/4. Apa yang salah? Cek dengan perkalian: 12 × 1/4 = 3.",
      opsi: [
        { teks: "Pembagi tidak boleh pecahan", benar: false, umpan: "Pembagi boleh pecahan. Yang perlu dilakukan adalah membalik pembagi." },
        { teks: "Hasilnya harus lebih kecil dari 3", benar: false, umpan: "Pembagi 1/4 kurang dari satu, jadi hasilnya justru lebih besar dari 3." },
        { teks: "Pembagi 1/4 belum dibalik menjadi 4/1", benar: true, umpan: "Betul! 3 : 1/4 = 3 × 4/1 = 12, dan cek 12 × 1/4 = 3 cocok dengan bilangan awal." },
      ],
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Pecahan dibagi bilangan asli dipotong lagi, penyebutnya dikali. Pembagi dibalik, pembagian menjadi perkalian, atas dikali atas dan bawah dikali bawah. Bilangan asli dibagi pecahan muat lebih banyak kali, jadi hasilnya membesar, dan hasil bisa dicek dengan perkalian.",
    },
  ],
};

export const SKENARIO_K6B1C: DefSkenario = {
  id: "agam-timbangan-k6b1",
  judul: "Agam, Timbangan, dan Lompat Jauh",
  latar: "Bantu Agam membaca desimal di timbangan pasar dan lomba lompat jauh.",
  tokoh: "👦",
  nama: "Agam",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Agam. Di pasar, timbangan menulis 0,50 untuk 1/2 kilogram jeruk. Desimal hanyalah cara lain menulis pecahan. Ayo ubah pecahan menjadi desimal, baca tempatnya, lalu bandingkan dan urutkan!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "setengah",
      jenis: "pilih",
      cerita: "Equivalent Fraction to Tenths: 1/2 × 5/5 = 5/10. Penyebut 10 berarti satu angka di belakang koma. Bagaimana menulis 5/10 sebagai desimal?",
      opsi: [
        { teks: "5,0", benar: false, umpan: "Itu bilangan lima. 5/10 kurang dari satu, jadi bagian bulatnya nol." },
        { teks: "0,5", benar: true, umpan: "Betul! 1/2 = 5/10 = 0,5. Satu angka di belakang koma karena penyebutnya 10." },
        { teks: "0,05", benar: false, umpan: "Itu perseratusan. Penyebut 10 berarti persepuluhan, bukan perseratusan." },
      ],
    },
    {
      id: "kisi",
      jenis: "hitung",
      cerita: "Grid Tenths-Hundredths Link: satu utuh dibagi menjadi 10 bagian sama. Satu stik mewakili satu bagian.",
      tanya: "Ketuk semua stik. Ada berapa bagian sama dalam satu utuh?",
      objek: "stik",
      jumlah: 10,
      sukses: "Betul! 10 bagian sama, tiap bagian 1/10 = 0,1. Lima bagian terarsir sama dengan 5/10 = 0,5.",
      salah: "Hmm, ketuk tiap stik sekali saja untuk satu bagian, lalu hitung lagi.",
    },
    {
      id: "tempat",
      jenis: "soal",
      cerita: "Decimal Place-Value Chart: kolomnya satuan, koma, persepuluhan, dan perseratusan. Pada 3,7 ada 3 satuan dan 7 persepuluhan.",
      soal: [
        { teks: "Pada 3,7, angka 7 ada di tempat …", jawaban: "persepuluhan", opsi: ["satuan", "persepuluhan", "perseratusan"] },
        { teks: "0,25 dibaca …", jawaban: "nol koma dua lima", opsi: ["nol koma dua lima", "nol koma dua puluh lima", "dua puluh lima koma nol"] },
      ],
      sukses: "Hebat! 7 ada di persepuluhan, bernilai 7 × 1/10 = 7/10, dan 0,25 dibaca nol koma dua lima.",
      salah: "Hmm, kiri koma adalah satuan, lalu persepuluhan, lalu perseratusan. Baca angka di belakang koma satu per satu. Coba lagi.",
    },
    {
      id: "ubah",
      jenis: "soal",
      cerita: "Pecahan dengan penyebut 2, 5, atau kelipatannya mudah diubah ke penyebut 10 atau 100 dengan mengalikan pembilang dan penyebut.",
      soal: [
        { teks: "1/5 = 1/5 × 2/2 = 2/10 = …", jawaban: "0,2", opsi: ["2,0", "0,02", "0,2"] },
        { teks: "1/4 = 1/4 × 25/25 = 25/100 = …", jawaban: "0,25", opsi: ["0,25", "2,5", "0,025"] },
      ],
      sukses: "Tepat! 1/5 = 0,2 dan 1/4 = 0,25. Penyebut 10 memberi satu angka, penyebut 100 memberi dua angka di belakang koma.",
      salah: "Hmm, ubah penyebut menjadi 10 atau 100, lalu hitung angka di belakang koma. Coba lagi.",
    },
    {
      id: "lompat",
      jenis: "isi",
      cerita: "Didi melompat 4,05 meter. Angka 5 ada di tempat perseratusan, jadi ada 5 perseratusan. Masukkan satu stik untuk tiap perseratusan.",
      objek: "stik",
      target: 5,
      maks: 9,
      sukses: "Betul! 4,05 punya 4 satuan, 0 persepuluhan, dan 5 perseratusan.",
      kurang: "Perseratusannya masih kurang. Tambah lagi sampai 5.",
      lebih: "Perseratusannya kelebihan. Kurangi sampai 5.",
    },
    {
      id: "banding",
      jenis: "pilih",
      cerita: "Decimal Compare-and-Order: Arman melompat 4,5 meter dan Bayu 4,05 meter. Samakan dulu angka di belakang koma: 4,5 = 4,50. Siapa melompat lebih jauh?",
      opsi: [
        { teks: "Arman, karena 4,50 lebih besar dari 4,05", benar: true, umpan: "Betul! Bandingkan dari kiri: satuan sama, persepuluhan 5 lebih besar dari 0. Jadi 4,5 > 4,05." },
        { teks: "Bayu, karena 4,05 punya angka lebih panjang", benar: false, umpan: "Panjang angka bukan besar nilai. Samakan 4,5 menjadi 4,50 lalu bandingkan dari kiri." },
        { teks: "Sama jauh", benar: false, umpan: "Tidak sama. 4,5 sama dengan 4,50, sedangkan 4,05 berbeda di persepuluhan." },
      ],
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Pecahan diubah ke penyebut 10 atau 100 lalu ditulis sebagai desimal. Kolom desimal: satuan, persepuluhan, perseratusan, dan dibaca angka demi angka setelah koma. Untuk membandingkan, samakan banyak angka di belakang koma lalu bandingkan dari kiri.",
    },
  ],
};
