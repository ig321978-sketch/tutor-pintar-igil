import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 4 Bab 5 (Bangun Datar). Tanpa jaringan, tanpa model bahasa.
 * Kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k4b5.mjs (dihitung ulang dari koordinat dan data).
 *  - SKENARIO_K4B5A: Papan Paku Helen (segi banyak, nama menurut sisi, segitiga siku-siku, persegi, sisi sejajar)
 *  - SKENARIO_K4B5B: Bengkel Kertas Helen (pencapaian bab: dekomposisi persegi, komposisi, segienam = 6 segitiga,
 *    trapesium dari 3 segitiga, rumah segilima, tangram 7 keping, peta sebagai dekomposisi)
 */

export const SKENARIO_K4B5A: DefSkenario = {
  id: "paku-helen-k4b5",
  judul: "Papan Paku Helen",
  latar: "Bantu Helen mengenali ciri bangun di papan paku dan karetnya.",
  tokoh: "👧",
  nama: "Helen",
  adegan: [
    { id: "buka", jenis: "narasi", cerita: "Halo! Aku Helen. Aku punya papan paku dan beberapa karet gelang. Kita bentuk bangun datar, lalu kenali cirinya. Bantu aku, ya.", tombol: "Ayo mulai! ➡" },
    {
      id: "segi",
      jenis: "pilih",
      cerita: "Helen menggambar tiga bentuk. Mana yang termasuk segi banyak?",
      opsi: [
        { teks: "Lingkaran yang rapi", benar: false, umpan: "Lingkaran tertutup, tetapi tepinya lengkung. Segi banyak dibatasi ruas garis lurus." },
        { teks: "Karet tertutup di tiga paku, tepinya lurus", benar: true, umpan: "Betul! Tertutup dan dibatasi tiga ruas lurus. Itu segi banyak, namanya segitiga." },
        { teks: "Tiga ruas lurus yang ujungnya tidak bertemu", benar: false, umpan: "Ujungnya terbuka. Segi banyak harus tertutup." },
      ],
    },
    {
      id: "enam",
      jenis: "hitung",
      cerita: "Helen memasang karet melewati enam paku sampai tertutup. Tiap stik di bawah ini satu sisi karet.",
      tanya: "Ketuk semua stik. Berapa sisi bangun Helen?",
      objek: "stik",
      jumlah: 6,
      sukses: "Betul! Enam sisi, jadi namanya segienam. Nama segi banyak mengikuti banyak sisinya.",
      salah: "Hmm, ketuk tiap stik satu kali, lalu hitung lagi.",
    },
    {
      id: "klm",
      jenis: "pilih",
      cerita: "Segitiga KLM punya satu sudut yang pas dengan pojok buku, yaitu sudut K. Apa jenis segitiga KLM?",
      opsi: [
        { teks: "Segitiga tumpul", benar: false, umpan: "Sudut tumpul lebih besar dari pojok buku. Sudut K pas dengan pojok buku." },
        { teks: "Segitiga lancip", benar: false, umpan: "Segitiga lancip semua sudutnya lebih kecil dari pojok buku. Sudut K tidak begitu." },
        { teks: "Segitiga siku-siku", benar: true, umpan: "Betul! Sudut yang pas dengan pojok buku adalah sudut siku-siku, besarnya 90 derajat." },
      ],
    },
    {
      id: "persegi",
      jenis: "soal",
      cerita: "Helen membentuk persegi dan persegi panjang di papan paku.",
      soal: [
        { teks: "Banyak sudut siku-siku pada persegi …", jawaban: "4", opsi: ["2", "4", "0"] },
        { teks: "Banyak pasang sisi sejajar pada persegi panjang …", jawaban: "2", opsi: ["2", "1", "0"] },
        { teks: "Banyak pasang sisi sejajar pada trapesium …", jawaban: "1", opsi: ["2", "0", "1"] },
      ],
      sukses: "Hebat! Persegi punya empat sudut siku-siku. Persegi panjang punya dua pasang sisi sejajar, trapesium hanya satu pasang.",
      salah: "Hmm, periksa sudut dengan pojok buku, dan cari sisi berhadapan yang tidak pernah bertemu. Coba lagi.",
    },
    {
      id: "karet",
      jenis: "isi",
      cerita: "Helen membuat satu persegi dan satu segitiga terpisah. Satu stik untuk satu sisi karet. Masukkan stik sebanyak semua sisinya.",
      objek: "stik",
      target: 7,
      maks: 12,
      sukses: "Pas! Persegi empat sisi, segitiga tiga sisi. Semuanya tujuh sisi.",
      kurang: "Stiknya masih kurang. Hitung sisi persegi, lalu sisi segitiga.",
      lebih: "Stiknya kelebihan. Persegi punya empat sisi dan segitiga tiga sisi.",
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Segi banyak tertutup dan dibatasi ruas lurus. Namanya mengikuti banyak sisi. Ciri sisi, sudut, dan sisi sejajar membantu kita memberi nama bangun." },
  ],
};

export const SKENARIO_K4B5B: DefSkenario = {
  id: "bengkel-helen-k4b5",
  judul: "Bengkel Kertas Helen",
  latar: "Bantu Helen menyusun dan mengurai bangun dari kertas lipat.",
  tokoh: "👧",
  nama: "Helen",
  adegan: [
    { id: "buka", jenis: "narasi", cerita: "Halo lagi! Hari ini aku membuat hiasan kelas dari kertas lipat. Ada yang perlu disusun, ada yang perlu diurai. Ayo bantu aku!", tombol: "Ayo mulai! ➡" },
    {
      id: "diagonal",
      jenis: "pilih",
      cerita: "Helen memotong kertas persegi dari pojok ke pojok seberangnya. Menjadi apa kertasnya?",
      opsi: [
        { teks: "Empat persegi kecil", benar: false, umpan: "Satu potongan lurus hanya membelah menjadi dua bagian." },
        { teks: "Tiga segitiga", benar: false, umpan: "Satu potongan lurus membuat dua bagian, bukan tiga." },
        { teks: "Dua segitiga siku-siku", benar: true, umpan: "Betul! Persegi diurai menjadi dua segitiga siku-siku. Ini dekomposisi." },
      ],
    },
    {
      id: "susun",
      jenis: "pilih",
      cerita: "Kedua segitiga itu Helen tempel lagi berdampingan menjadi satu bangun. Kegiatan ini disebut apa?",
      opsi: [
        { teks: "Komposisi", benar: true, umpan: "Betul! Menyusun beberapa bangun menjadi satu bangun baru disebut komposisi." },
        { teks: "Dekomposisi", benar: false, umpan: "Dekomposisi berarti mengurai. Helen justru menyusun." },
        { teks: "Pengukuran", benar: false, umpan: "Helen tidak mengukur panjang atau luas. Helen menyusun bangun." },
      ],
    },
    {
      id: "segienam",
      jenis: "hitung",
      cerita: "Hiasan segienam beraturan diurai dari titik tengah ke tiap pojoknya. Tiap stik di bawah ini satu segitiga hasil uraian.",
      tanya: "Ketuk semua stik. Berapa segitiga hasil uraiannya?",
      objek: "stik",
      jumlah: 6,
      sukses: "Betul! Segienam beraturan terurai menjadi enam segitiga sama sisi.",
      salah: "Hmm, ketuk tiap stik satu kali, lalu hitung lagi.",
    },
    {
      id: "trapesium",
      jenis: "isi",
      cerita: "Helen menyusun trapesium dari segitiga sama sisi: dua menghadap ke atas di bawah, satu terbalik di antaranya. Masukkan stik sebanyak segitiga yang dipakai.",
      objek: "stik",
      target: 3,
      maks: 10,
      sukses: "Pas! Tiga segitiga sama sisi tersusun menjadi trapesium.",
      kurang: "Masih kurang. Dua menghadap ke atas dan satu terbalik.",
      lebih: "Kelebihan. Trapesium Helen hanya memakai dua segitiga menghadap ke atas dan satu terbalik.",
    },
    {
      id: "ingat",
      jenis: "soal",
      cerita: "Helen mengingat lagi ciri bangun dan tangram.",
      soal: [
        { teks: "Rumah dari persegi dengan atap segitiga di atasnya punya … sisi", jawaban: "5", opsi: ["7", "5", "4"] },
        { teks: "Tiap segitiga dari kertas persegi tadi punya … sudut siku-siku", jawaban: "1", opsi: ["1", "2", "0"] },
        { teks: "Tangram punya … keping", jawaban: "7", opsi: ["5", "6", "7"] },
      ],
      sukses: "Hebat! Rumah itu segilima. Segitiga dari persegi punya satu sudut siku-siku. Tangram punya tujuh keping.",
      salah: "Hmm, hitung sisinya pelan-pelan, atau ingat keping tangram. Coba lagi.",
    },
    {
      id: "peta",
      jenis: "pilih",
      cerita: "Guru menggambar ulang peta sebuah pulau dengan potongan persegi, segitiga, dan trapesium. Itu contoh apa?",
      opsi: [
        { teks: "Pengukuran volume", benar: false, umpan: "Volume untuk ruang. Di sini peta dibagi menjadi bangun datar." },
        { teks: "Dekomposisi", benar: true, umpan: "Betul! Bentuk peta diurai menjadi bangun datar yang kita kenal." },
        { teks: "Pola bilangan", benar: false, umpan: "Tidak ada barisan bilangan di sini. Peta dibagi menjadi bangun datar." },
      ],
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Kita mengenali ciri bangun datar, menyusunnya menjadi bangun baru, dan mengurainya menjadi bagian. Satu bangun bisa disusun atau diurai dengan banyak cara. Kamu sudah menuntaskan bab ini!" },
  ],
};
