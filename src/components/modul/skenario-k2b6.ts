import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 2 Bab 6 (Pengukuran: Berat dan Waktu). Tanpa jaringan, tanpa gambar benda (hanya teks),
 * jadi tidak melanggar batas Concrete dan Picture.
 *  - SKENARIO_K2B6B: Hari Minggu Kira (Sub-Bab B, sub-bab akhir): satu hari yang memuat jam, urutan, lama kegiatan,
 *    lalu menimbang di pasar. Mengulang konsep bab: besar belum tentu berat, satuan yang lebih ringan butuh lebih banyak,
 *    pukul tepat dibaca dari jarum dan bagian hari, dan lama kegiatan bukan urutan kejadian.
 */

export const SKENARIO_K2B6B: DefSkenario = {
  id: "hari-minggu-kira-k2b6",
  judul: "Hari Minggu Kira",
  latar: "Ikuti satu hari Minggu Kira: berolahraga pagi, lalu menimbang di pasar bersama Ibu.",
  tokoh: "👧",
  nama: "Kira",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Kira. Hari Minggu aku berolahraga pagi, lalu ke pasar bersama Ibu. Aku harus membaca jam dan menimbang belanjaan. Bantu aku, ya.",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "jam",
      jenis: "soal",
      cerita: "Matahari baru terbit. Jarum pendek jam di angka 6, jarum panjang di angka 12. Aku mulai berlari.",
      soal: [
        { teks: "Pukul berapa Kira mulai berlari?", jawaban: "Pukul 6 pagi", opsi: ["Pukul 12 siang", "Pukul 6 pagi", "Pukul 6 sore"] },
        { teks: "Jam digital menulis pukul 6 pagi sebagai …", jawaban: "06.00", opsi: ["06.00", "16.00", "12.00"] },
        { teks: "Kira selesai berlari pukul 7. Berapa jam Kira berlari?", jawaban: "1 jam", opsi: ["7 jam", "1 jam", "6 jam"] },
      ],
      sukses: "Tepat! Jarum pendek di 6 dan jarum panjang di 12 berarti pukul 6. Dari pukul 6 sampai pukul 7 lamanya satu jam.",
      salah: "Hmm, lihat jarum pendek dulu, lalu bagian harinya. Jarum pendek bergerak satu angka untuk setiap satu jam.",
    },
    {
      id: "lama",
      jenis: "pilih",
      cerita: "Setelah berlari satu jam, aku mandi lima belas menit. Mana yang benar tentang lamanya?",
      opsi: [
        { teks: "Mandi lebih lama dari berlari", benar: false, umpan: "Lima belas menit kurang dari satu jam, jadi mandi lebih sebentar." },
        { teks: "Mandi lebih sebentar dari berlari", benar: true, umpan: "Betul! Lima belas menit lebih sebentar daripada satu jam, yaitu enam puluh menit." },
        { teks: "Mandi dan berlari sama lama", benar: false, umpan: "Satu jam sama dengan enam puluh menit. Lima belas menit jauh lebih sedikit." },
      ],
    },
    {
      id: "urut",
      jenis: "pilih",
      cerita: "Jadwalku hari ini: berlari pukul 6 pagi, mandi pukul 7 pagi, ke pasar pukul 9 pagi, tidur siang pukul 1 siang. Kegiatan mana yang terjadi paling awal?",
      opsi: [
        { teks: "Berlari", benar: true, umpan: "Betul! Pukul 6 pagi adalah waktu yang paling awal di antara semuanya." },
        { teks: "Ke pasar", benar: false, umpan: "Pukul 9 pagi masih datang sesudah pukul 6 dan pukul 7." },
        { teks: "Tidur siang", benar: false, umpan: "Pukul 1 siang adalah yang paling akhir di jadwal ini." },
      ],
    },
    {
      id: "pasar",
      jenis: "narasi",
      cerita: "Di pasar, Ibu menimbang belanjaan memakai neraca besar. Aku sudah belajar membaca neraca, jadi aku ikut membantu.",
      tombol: "Lihat neracanya ➡",
    },
    {
      id: "neraca",
      jenis: "pilih",
      cerita: "Ibu menaruh semangka di satu piringan dan apel di piringan yang lain. Piringan semangka turun. Apa artinya?",
      opsi: [
        { teks: "Apel lebih berat dari semangka", benar: false, umpan: "Piringan yang turun berisi benda yang lebih berat. Yang turun berisi semangka." },
        { teks: "Semangka dan apel sama berat", benar: false, umpan: "Kalau sama berat, neraca seimbang dan kedua piringan sama tinggi." },
        { teks: "Semangka lebih berat dari apel", benar: true, umpan: "Betul! Piringan yang turun berisi benda yang lebih berat." },
      ],
    },
    {
      id: "satuan",
      jenis: "soal",
      cerita: "Penjual menimbang boneka dengan bola tenis dan kelereng. Satu boneka sama berat dengan 4 bola tenis. Balon besar dan batu kecil juga ditimbang.",
      soal: [
        { teks: "Kelereng lebih ringan dari bola tenis. Memakai kelereng, banyaknya satuan akan …", jawaban: "lebih banyak", opsi: ["lebih sedikit", "sama banyak", "lebih banyak"] },
        { teks: "Balon besar dan batu kecil ditimbang. Mana yang benar?", jawaban: "Timbang dulu, besar belum tentu berat", opsi: ["Yang besar pasti lebih berat", "Timbang dulu, besar belum tentu berat", "Yang kecil pasti lebih ringan"] },
      ],
      sukses: "Hebat! Satuan yang lebih ringan butuh lebih banyak, dan berat harus ditimbang, bukan ditebak dari ukuran.",
      salah: "Hmm, ingat: satuan ringan perlu banyak supaya seimbang, dan benda besar belum tentu berat. Coba lagi.",
    },
    {
      id: "akhir",
      jenis: "akhir",
      cerita: "Terima kasih! Hari Minggu-ku seru. Aku bisa membaca jam, tahu mana yang lebih lama, dan menimbang dengan neraca. Kamu sudah menyelesaikan misi Bab 6!",
    },
  ],
};
