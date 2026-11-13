import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 6 Bab 1 (Pecahan dan Desimal). Tanpa jaringan, tanpa model bahasa.
 * Kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k6b1.mjs (dihitung ulang mandiri).
 *  - SKENARIO_K6B1A: Agam dan Kebun Ayah (Area Model, Whole-as-Fraction, Panah Lurus, dan urutan kali)
 *  - SKENARIO_K6B1B: Agam, Gelas, dan Sirup (Partition Division, Reciprocal, Cross-Arrow Divide, dan Measurement Division)
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
