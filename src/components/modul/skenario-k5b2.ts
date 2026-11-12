import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 5 Bab 2 (KPK dan FPB). Tanpa jaringan, tanpa model bahasa.
 * Kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k5b2.mjs (dihitung ulang mandiri).
 *  - SKENARIO_K5B2A: Tepuk Kelipatan Nisa (tepuk saat kelipatan, banyak tepukan, kelipatan berikutnya, cek sisa)
 *  - SKENARIO_K5B2B: Jadwal Renang Yohana (dua daftar, kelipatan persekutuan, KPK, tanggal bertemu lagi)
 */

export const SKENARIO_K5B2B: DefSkenario = {
  id: "jadwal-renang-k5b2",
  judul: "Jadwal Renang Yohana",
  latar: "Bantu Yohana mencari kapan ia dan Nisa berenang pada hari yang sama.",
  tokoh: "👧",
  nama: "Yohana",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Yohana. Aku berenang tiap 4 hari, dan temanku Nisa berenang tiap 3 hari. Hari ini kami berenang pada hari yang sama. Kapan kami berenang bersama lagi? Ayo kita cari!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "daftar",
      jenis: "pilih",
      cerita: "Yohana menulis dua daftar. Kelipatan 3: 3, 6, 9, 12. Kelipatan 4: 4, 8, 12. Bilangan mana yang ada di kedua daftar?",
      opsi: [
        { teks: "8", benar: false, umpan: "8 hanya ada di daftar kelipatan 4. Daftar kelipatan 3 tidak memuat 8." },
        { teks: "12", benar: true, umpan: "Betul! 12 ada di kedua daftar, jadi 12 adalah kelipatan persekutuan 3 dan 4." },
        { teks: "6", benar: false, umpan: "6 hanya ada di daftar kelipatan 3. Daftar kelipatan 4 melompati 6." },
      ],
    },
    {
      id: "yohana",
      jenis: "hitung",
      cerita: "Dalam 12 hari, Yohana berenang pada hari ke-4, ke-8, dan ke-12. Setiap hari renang diberi satu stik.",
      tanya: "Ketuk semua stik. Berapa kali Yohana berenang dalam 12 hari?",
      objek: "stik",
      jumlah: 3,
      sukses: "Betul! Tiga kali, dan hari terakhirnya hari ke-12.",
      salah: "Hmm, ketuk tiap stik sekali saja, lalu hitung lagi.",
    },
    {
      id: "nisa",
      jenis: "isi",
      cerita: "Dalam 12 hari, Nisa berenang tiap 3 hari. Masukkan stik sebanyak hari renang Nisa.",
      objek: "stik",
      target: 4,
      maks: 6,
      sukses: "Pas! Nisa berenang empat kali, pada hari ke-3, 6, 9, dan 12.",
      kurang: "Stiknya masih kurang. Lompat 3 demi 3 sampai hari ke-12.",
      lebih: "Stiknya kelebihan. Lompatan 3 demi 3 berhenti di hari ke-12.",
    },
    {
      id: "periksa",
      jenis: "soal",
      cerita: "Yohana memeriksa jadwalnya. Hari ini tanggal 3 Agustus.",
      soal: [
        { teks: "KPK dari 3 dan 4 adalah …", jawaban: "12", opsi: ["7", "12", "24"] },
        { teks: "Yohana dan Nisa berenang bersama lagi pada …", jawaban: "15 Agustus", opsi: ["12 Agustus", "15 Agustus", "10 Agustus"] },
        { teks: "Kelipatan persekutuan 3 dan 4 yang kedua adalah …", jawaban: "24", opsi: ["16", "20", "24"] },
      ],
      sukses: "Hebat! KPK adalah kelipatan persekutuan yang terkecil, dan dari situ jadwal bertemu lagi bisa dihitung.",
      salah: "Hmm, lihat lagi kedua daftar kelipatan. Coba lagi.",
    },
    {
      id: "tebak",
      jenis: "pilih",
      cerita: "Seorang teman berkata, KPK dari 3 dan 4 adalah 7, karena 3 ditambah 4. Apa jawaban Yohana?",
      opsi: [
        { teks: "Benar, KPK adalah jumlah dua bilangan", benar: false, umpan: "KPK bukan jumlah. 7 tidak ada di daftar kelipatan 3, jadi bukan kelipatan persekutuan." },
        { teks: "Salah, KPK adalah 24", benar: false, umpan: "24 memang kelipatan persekutuan, tetapi ada yang lebih kecil, yaitu 12." },
        { teks: "Salah, KPK adalah 12", benar: true, umpan: "Betul! 12 adalah kelipatan persekutuan 3 dan 4 yang paling pertama muncul." },
      ],
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Kelipatan persekutuan adalah bilangan yang ada di daftar kelipatan kedua bilangan. Yang terkecil disebut KPK, dan KPK menunjukkan kapan dua jadwal bertemu lagi.",
    },
  ],
};

export const SKENARIO_K5B2A: DefSkenario = {
  id: "tepuk-kelipatan-k5b2",
  judul: "Tepuk Kelipatan Nisa",
  latar: "Bantu Nisa memainkan tepuk kelipatan tiga bersama teman-temannya.",
  tokoh: "👧",
  nama: "Nisa",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Nisa. Di halaman sekolah kami bermain tepuk kelipatan. Kita menghitung 1, 2, 3, dan seterusnya, dan bertepuk setiap kali bilangannya kelipatan 3. Ayo bantu aku!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "tepuk",
      jenis: "pilih",
      cerita: "Teman-teman menghitung 9, 10, 11, 12, 13. Pada bilangan mana saja Nisa harus bertepuk?",
      opsi: [
        { teks: "Di 10 dan 13", benar: false, umpan: "10 dan 13 tidak habis dibagi 3, jadi bukan kelipatan 3. Lompat 3 demi 3 untuk memeriksanya." },
        { teks: "Di 9 dan 12", benar: true, umpan: "Betul! 9 dan 12 adalah kelipatan 3, karena 3 × 3 = 9 dan 3 × 4 = 12." },
        { teks: "Di 11 dan 13", benar: false, umpan: "11 dan 13 jatuh di antara kelipatan 3. Hitung lompatannya: 9, lalu 12." },
      ],
    },
    {
      id: "banyak",
      jenis: "hitung",
      cerita: "Nisa bertepuk pada 3, 6, 9, 12, 15, dan 18. Setiap tepukan diberi satu stik.",
      tanya: "Ketuk semua stik. Berapa kali Nisa bertepuk?",
      objek: "stik",
      jumlah: 6,
      sukses: "Betul! Enam tepukan, dan bilangan terakhirnya 18.",
      salah: "Hmm, ketuk tiap stik sekali saja, lalu hitung lagi.",
    },
    {
      id: "tiga-puluh",
      jenis: "isi",
      cerita: "Permainan berlanjut sampai bilangan 30. Masukkan stik sebanyak tepukan Nisa, satu stik untuk tiap kelipatan 3.",
      objek: "stik",
      target: 10,
      maks: 12,
      sukses: "Pas! Kelipatan 3 sampai 30 ada sepuluh, dan yang terakhir 30.",
      kurang: "Stiknya masih kurang. Lompat 3 demi 3 sampai 30 dan hitung pendaratannya.",
      lebih: "Stiknya kelebihan. Lompatan 3 demi 3 berhenti di 30.",
    },
    {
      id: "periksa",
      jenis: "soal",
      cerita: "Nisa memeriksa kelipatan 3 di papan tulis.",
      soal: [
        { teks: "3 × 7 = …", jawaban: "21", opsi: ["21", "10", "24"] },
        { teks: "Kelipatan 3 setelah 12 adalah …", jawaban: "15", opsi: ["13", "14", "15"] },
        { teks: "14 dibagi 3 bersisa …", jawaban: "2", opsi: ["0", "1", "2"] },
      ],
      sukses: "Hebat! Kelipatan habis dibagi tanpa sisa, dan setiap lompatan menambah jarak yang sama.",
      salah: "Hmm, lompat atau bagi lagi. Coba lagi.",
    },
    {
      id: "tebak",
      jenis: "pilih",
      cerita: "Seorang teman berkata, 14 juga kelipatan 3. Apa jawaban Nisa?",
      opsi: [
        { teks: "Bukan, 14 dibagi 3 bersisa 2", benar: true, umpan: "Betul! Ada sisa 2, jadi 14 bukan kelipatan 3." },
        { teks: "Benar, 14 bilangan genap", benar: false, umpan: "Genap atau ganjil tidak menentukan kelipatan 3. Periksa sisa pembagiannya." },
        { teks: "Benar, 3 × 5 = 14", benar: false, umpan: "3 × 5 = 15, bukan 14. Jadi 14 tidak jatuh di lompatan 3 demi 3." },
      ],
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Kelipatan adalah bilangan yang kita dapat dengan melompat dengan jarak yang sama dari nol. Kita bisa memeriksanya di tabel seratus atau dengan melihat sisa pembagian.",
    },
  ],
};
