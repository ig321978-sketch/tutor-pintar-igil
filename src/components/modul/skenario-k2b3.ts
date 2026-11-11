import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Toko Mainan Upe: Kelas 2 Bab 3 Sub-Bab C (pencapaian misi).
 * Menyatukan tiga sub-bab: menamai bangun datar dari sisinya, mengurai bangun, lalu mengenal
 * bangun ruang lewat gelinding dan cetak permukaan. Tanpa jaringan.
 */

export const SKENARIO_K2B3: DefSkenario = {
  id: "toko-mainan-k2b3",
  judul: "Toko Mainan Upe",
  latar: "Bantu Upe membereskan toko mainan dengan ilmu bentuk.",
  tokoh: "🧒",
  nama: "Upe",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita:
        "Halo! Aku Upe. Hari ini aku membereskan toko mainan Paman. Ayo bantu aku. Kita akan menamai bentuk dari sisinya, mengurai sebuah bangun, lalu mencoba menggelindingkan benda.",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "ubin",
      jenis: "pilih",
      cerita: "Lantai toko dipasang ubin yang tepinya garis lurus semua. Aku menghitung sisinya, ada enam. Apa nama bentuk ubin itu?",
      opsi: [
        {
          teks: "Segi lima, karena punya lima sisi",
          benar: false,
          umpan: "Hitung lagi sisinya. Ubin ini punya enam sisi lurus, bukan lima.",
        },
        {
          teks: "Segi enam, karena punya enam sisi lurus",
          benar: true,
          umpan: "Betul! Banyak sisi menentukan nama. Enam sisi lurus berarti segi enam, seperti sarang lebah.",
        },
        {
          teks: "Lingkaran, karena sisinya banyak sekali",
          benar: false,
          umpan: "Lingkaran dibatasi garis lengkung dan tidak punya sisi lurus. Ubin ini tepinya lurus semua.",
        },
      ],
    },
    {
      id: "urai",
      jenis: "pilih",
      cerita: "Aku punya selembar kertas persegi. Aku ingin menguraikannya menjadi dua segitiga. Garis mana yang harus kugunting?",
      opsi: [
        {
          teks: "Garis miring dari pojok ke pojok seberang",
          benar: true,
          umpan: "Tepat! Satu garis miring dari pojok ke pojok membagi persegi menjadi dua segitiga yang sama.",
        },
        {
          teks: "Garis lurus dari tengah sisi ke tengah sisi seberang",
          benar: false,
          umpan: "Garis itu membuat dua segi empat, bukan segitiga. Cara mengurai memengaruhi hasilnya.",
        },
        {
          teks: "Dua garis miring yang bersilangan di tengah",
          benar: false,
          umpan: "Dua garis miring membuat empat segitiga. Kita hanya butuh dua segitiga, jadi satu garis saja.",
        },
      ],
    },
    {
      id: "pola",
      jenis: "soal",
      cerita: "Paman menantang aku dengan sebuah segi enam. Kita urai menjadi segitiga dengan dua cara. Jawab dulu ya.",
      soal: [
        {
          teks: "Dari satu pojok, segi enam menjadi … segitiga (6 − 2)",
          jawaban: "4",
          opsi: ["6", "4", "5"],
        },
        {
          teks: "Dari titik tengah ke setiap pojok, segi enam menjadi … segitiga",
          jawaban: "6",
          opsi: ["4", "5", "6"],
        },
      ],
      sukses: "Hebat! Dari satu pojok ada empat segitiga, dari titik tengah ada enam segitiga. Cara beda, hasil beda.",
      salah: "Cek lagi. Dari satu pojok, banyak sisi dikurangi dua. Dari titik tengah, banyaknya sama dengan banyak sisi.",
    },
    {
      id: "gelinding",
      jenis: "pilih",
      cerita: "Aku ingin membuat jalan gelinding di rak bawah. Benda mana yang cocok dilepas di lereng sampai menggelinding?",
      opsi: [
        {
          teks: "Dadu, karena permukaannya datar",
          benar: false,
          umpan: "Permukaan datar menahan benda supaya diam. Dadu tidak menggelinding di lereng.",
        },
        {
          teks: "Kotak sepatu, karena punya enam permukaan",
          benar: false,
          umpan: "Kotak sepatu berbentuk balok. Permukaannya datar, jadi diam dan mudah ditumpuk.",
        },
        {
          teks: "Bola, karena seluruh permukaannya lengkung",
          benar: true,
          umpan: "Betul! Permukaan lengkung bisa berguling terus, dan bola tidak punya bagian datar sama sekali.",
        },
      ],
    },
    {
      id: "cetak",
      jenis: "soal",
      cerita: "Sekarang aku mencetak permukaan mainan dengan cat di kertas. Bangun datar apa yang muncul? Jawab dulu ya.",
      soal: [
        {
          teks: "Alas kaleng yang dicetak menghasilkan bentuk …",
          jawaban: "Lingkaran",
          opsi: ["Segitiga", "Lingkaran", "Segi empat"],
        },
        {
          teks: "Satu permukaan dadu yang dicetak menghasilkan bentuk …",
          jawaban: "Segi empat",
          opsi: ["Segi empat", "Lingkaran", "Segi enam"],
        },
      ],
      sukses: "Tepat! Alas kaleng menghasilkan lingkaran dan permukaan dadu menghasilkan segi empat. Bangun datar ada di permukaan bangun ruang.",
      salah: "Cek lagi. Alas kaleng bulat, dan permukaan dadu punya empat sisi lurus.",
    },
    {
      id: "bola",
      jenis: "hitung",
      cerita: "Di rak paling atas ada bola-bola. Ketuk tiap bola satu kali, lalu pilih banyaknya.",
      tanya: "Ada berapa bola di rak?",
      objek: "bola-merah",
      jumlah: 7,
      sukses: "Ada tujuh bola di rak. Semuanya bangun ruang yang mudah menggelinding.",
      salah: "Hitung lagi pelan-pelan. Ketuk tiap bola satu kali.",
    },
    {
      id: "akhir",
      jenis: "akhir",
      cerita:
        "Terima kasih! Kamu sudah menamai bentuk dari sisinya, mengurai bangun dengan garis, dan membedakan benda yang menggelinding dari yang diam. Main lagi kalau mau mencoba pilihan lain.",
    },
  ],
};
