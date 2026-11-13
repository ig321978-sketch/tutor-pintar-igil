import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 6 Bab 3 (Kubus dan Balok). Tanpa jaringan, tanpa model bahasa.
 * Kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k6b3.mjs (dihitung ulang mandiri).
 *  - SKENARIO_K6B3A: Tigor dan Tenri Susun Rumah Kubus (Construct-Decompose Protocol, Layer Counting Method, dan Hidden Support Rule)
 */

export const SKENARIO_K6B3A: DefSkenario = {
  id: "tigor-rumah-k6b3",
  judul: "Tigor dan Tenri Susun Rumah Kubus",
  latar: "Bantu Tigor dan Tenri menyusun, menghitung, dan mengurai rumah kubus.",
  tokoh: "👦",
  nama: "Tigor",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Tigor, dan ini temanku Tenri. Kami menyusun kubus menjadi rumah kecil. Kubus bisa dipasang berdampingan atau ditumpuk, lalu diurai lagi. Ayo kita susun, hitung lantai demi lantai, dan jaga agar tidak ada kubus yang melayang!",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "susun",
      jenis: "pilih",
      cerita: "Construct-Decompose Protocol: bangun lalu urai kembali. Aku ingin membuat bentuk L dari tiga kubus: dua kubus mendatar dan satu kubus naik di atasnya. Susunan mana yang benar?",
      opsi: [
        { teks: "Tiga kubus berdampingan dalam satu garis", benar: false, umpan: "Itu garis lurus, bukan bentuk L. Bentuk L punya satu kubus yang naik." },
        { teks: "Tiga kubus ditumpuk lurus ke atas", benar: false, umpan: "Itu menara lurus, bukan bentuk L. Bentuk L punya dua kubus mendatar." },
        { teks: "Dua kubus berdampingan, satu kubus ditaruh di atas salah satunya", benar: true, umpan: "Betul! Dua kubus mendatar ditambah satu kubus yang naik membentuk bentuk L." },
      ],
    },
    {
      id: "hitung",
      jenis: "hitung",
      cerita: "Bentuk L itu kubus per kubus kuberi tanda. Satu stik mewakili satu kubus.",
      tanya: "Ketuk semua stik. Ada berapa kubus pada bentuk L?",
      objek: "stik",
      jumlah: 3,
      sukses: "Betul! Dua kubus mendatar ditambah satu kubus yang naik, seluruhnya 3 kubus.",
      salah: "Hmm, ketuk tiap stik sekali saja untuk satu kubus, lalu hitung lagi.",
    },
    {
      id: "lapisan",
      jenis: "soal",
      cerita: "Layer Counting Method: hitung lantai dasar dulu, lalu semua lantai. Rumah kecil kami berbentuk balok penuh berukuran 3 × 2, setinggi 2 lantai.",
      soal: [
        { teks: "Satu lantai berukuran 3 × 2 berisi … kubus.", jawaban: "6", opsi: ["5", "6", "8"] },
        { teks: "Dua lantai penuh berisi … kubus, termasuk yang tertutup.", jawaban: "12", opsi: ["6", "10", "12"] },
      ],
      sukses: "Hebat! Lantai dasar 3 × 2 = 6 kubus, dua lantai penuh 6 × 2 = 12 kubus. Hitung lantai demi lantai, jangan hanya yang kelihatan.",
      salah: "Hmm, kalikan dulu kedua ukuran lantai, lalu kalikan dengan banyak lantai. Coba lagi.",
    },
    {
      id: "isi",
      jenis: "isi",
      cerita: "Tenri menyiapkan lantai kedua. Lantai itu penuh, berukuran 3 × 2. Masukkan satu stik untuk tiap kubus yang dibutuhkan.",
      objek: "stik",
      target: 6,
      maks: 12,
      sukses: "Betul! Lantai kedua butuh 3 × 2 = 6 kubus, sama banyak dengan lantai dasar.",
      kurang: "Kubusnya masih kurang. Tambah lagi sampai pas satu lantai penuh.",
      lebih: "Kubusnya kelebihan. Kurangi sampai pas satu lantai penuh.",
    },
    {
      id: "penyangga",
      jenis: "pilih",
      cerita: "Hidden Support Rule: kubus di lantai atas tidak boleh melayang. Tenri meletakkan satu kubus di lantai kedua tepat di atas petak yang kosong di lantai dasar. Apa yang harus dilakukan?",
      opsi: [
        { teks: "Tambah satu kubus penyangga di bawahnya lebih dulu", benar: true, umpan: "Betul! Kubus lantai kedua harus bertumpu pada kubus di bawahnya, jadi penyangga ditambah dulu." },
        { teks: "Biarkan saja, kubus kecil tidak berat", benar: false, umpan: "Kubus tidak boleh melayang, sekecil apa pun. Harus ada penyangga di bawahnya." },
        { teks: "Pindahkan lantai dasar ke atas", benar: false, umpan: "Lantai dasar harus tetap di bawah sebagai penopang. Yang perlu ditambah adalah penyangganya." },
      ],
    },
    {
      id: "urai",
      jenis: "soal",
      cerita: "Menara dua lantai: lantai dasar berisi 4 kubus dan lantai teratas berisi 2 kubus, semuanya bertumpu dengan baik.",
      soal: [
        { teks: "Seluruh kubus menara, termasuk yang tertutup, ada … kubus.", jawaban: "6", opsi: ["2", "4", "6"] },
        { teks: "Lantai teratas diurai. Kubus yang masih tersusun ada … kubus.", jawaban: "4", opsi: ["4", "6", "2"] },
      ],
      sukses: "Betul! Seluruhnya 4 + 2 = 6 kubus. Setelah lantai teratas dilepas, tersisa 4 kubus.",
      salah: "Hmm, jumlahkan kubus kedua lantai dulu, lalu kurangi lantai teratas yang dilepas.",
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Construct-Decompose Protocol: susun atau urai kubus, jumlahnya tetap bisa dihitung. Layer Counting Method: hitung lantai dasar dulu, lalu semua lantai, termasuk yang tertutup. Hidden Support Rule: kubus lantai kedua selalu punya kubus penyangga di bawahnya.",
    },
  ],
};
