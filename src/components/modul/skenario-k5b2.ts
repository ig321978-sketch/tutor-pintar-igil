import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 5 Bab 2 (KPK dan FPB). Tanpa jaringan, tanpa model bahasa.
 * Kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k5b2.mjs (dihitung ulang mandiri).
 *  - SKENARIO_K5B2A: Tepuk Kelipatan Nisa (tepuk saat kelipatan, banyak tepukan, kelipatan berikutnya, cek sisa)
 */

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
