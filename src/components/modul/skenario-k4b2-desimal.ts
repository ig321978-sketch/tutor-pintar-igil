import type { DefSkenario } from "./skenario-umum";

/**
 * Dua skenario Kelas 4 Bab 2 untuk desimal dan persen (Sub-Bab D dan E). Tanpa jaringan, tanpa model bahasa.
 * Kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k4b2.mjs.
 *  - SKENARIO_K4B2D: Roti dan Biskuit Ibu (persepuluhan, perseratusan, banyak angka di belakang koma)
 *  - SKENARIO_K4B2E: Pameran Pecahan Kelas 4 (pencapaian bab: pecahan, senilai, desimal, persen)
 */

export const SKENARIO_K4B2D: DefSkenario = {
  id: "roti-biskuit-k4b2",
  judul: "Roti dan Biskuit Ibu",
  latar: "Bantu Ibu menuliskan pecahan persepuluhan dan perseratusan sebagai desimal.",
  tokoh: "👩",
  nama: "Ibu",
  adegan: [
    { id: "buka", jenis: "narasi", cerita: "Halo, Nak! Ibu sedang menyiapkan sepuluh roti dan seratus biskuit untuk acara kampung. Bantu Ibu menuliskan bagiannya sebagai desimal, ya.", tombol: "Ayo mulai! ➡" },
    {
      id: "roti",
      jenis: "hitung",
      cerita: "Dari sepuluh roti, beberapa dilapisi selai cokelat. Tiap stik di bawah ini satu roti berselai.",
      tanya: "Ketuk semua stik. Ada berapa roti berselai?",
      objek: "stik",
      jumlah: 3,
      sukses: "Betul! Tiga dari sepuluh roti, ditulis 3/10 atau 0,3.",
      salah: "Hmm, ketuk tiap stik satu kali, lalu hitung lagi.",
    },
    {
      id: "tulis",
      jenis: "soal",
      cerita: "Sekarang Ibu menulis pecahan sebagai desimal.",
      soal: [
        { teks: "3/10 ditulis desimal …", jawaban: "0,3", opsi: ["0,3", "0,03", "3,0"] },
        { teks: "1/100 ditulis desimal …", jawaban: "0,01", opsi: ["0,1", "0,01", "0,001"] },
        { teks: "0,25 ditulis pecahan …", jawaban: "25/100", opsi: ["25/10", "2/5", "25/100"] },
      ],
      sukses: "Hebat! Satu angka di belakang koma berarti penyebut 10, dua angka berarti penyebut 100.",
      salah: "Hmm, hitung banyak angka di belakang koma dulu. Coba lagi.",
    },
    {
      id: "biskuit",
      jenis: "pilih",
      cerita: "Dari seratus biskuit, 7 biskuit berselai. Pecahan 7/100 ditulis desimal…",
      opsi: [
        { teks: "0,7", benar: false, umpan: "0,7 sama dengan 7/10. Penyebut 100 butuh dua angka di belakang koma." },
        { teks: "0,07", benar: true, umpan: "Betul! Dua angka di belakang koma, dan nol di depan tetap ditulis: 0,07." },
        { teks: "0,007", benar: false, umpan: "Itu tiga angka di belakang koma. Penyebut 100 berarti dua angka." },
      ],
    },
    {
      id: "angka",
      jenis: "pilih",
      cerita: "Pada 0,25, berapa angka di belakang koma, dan berapa penyebutnya?",
      opsi: [
        { teks: "Dua angka, penyebutnya 100", benar: true, umpan: "Betul! Dua angka di belakang koma berarti penyebut 100: 25/100." },
        { teks: "Satu angka, penyebutnya 10", benar: false, umpan: "Di belakang koma ada dua angka, yaitu 2 dan 5. Jadi penyebutnya 100." },
        { teks: "Dua angka, penyebutnya 10", benar: false, umpan: "Dua angka berarti penyebut 100, bukan 10." },
      ],
    },
    {
      id: "pembilang",
      jenis: "isi",
      cerita: "Aku memberi Adi 0,4 bagian roti. 0,4 sama dengan 4/10. Masukkan stik sebanyak pembilangnya. Satu stik satu bagian.",
      objek: "stik",
      target: 4,
      maks: 10,
      sukses: "Pas! Pembilang 4/10 adalah 4, sama dengan angka di belakang koma 0,4.",
      kurang: "Stiknya masih kurang. Pembilang adalah angka di belakang koma pada 0,4.",
      lebih: "Stiknya kelebihan. Pembilang adalah angka di belakang koma pada 0,4.",
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Acara kampung siap. Ingat: satu angka di belakang koma berarti per sepuluh, dua angka berarti per seratus, dan nol di depan tetap ditulis." },
  ],
};

export const SKENARIO_K4B2E: DefSkenario = {
  id: "pameran-pecahan-k4b2",
  judul: "Pameran Pecahan Kelas 4",
  latar: "Pencapaian bab: gunakan semua yang kamu pelajari tentang pecahan, desimal, dan persen di pameran sekolah.",
  tokoh: "🧑‍🏫",
  nama: "Bu Guru",
  adegan: [
    { id: "buka", jenis: "narasi", cerita: "Selamat datang di Pameran Pecahan Kelas 4! Bu Guru menyiapkan beberapa tantangan dari seluruh bab. Ayo tunjukkan yang sudah kamu pelajari.", tombol: "Ayo mulai! ➡" },
    {
      id: "rekap",
      jenis: "soal",
      cerita: "Pos pertama mengulang pecahan biasa.",
      soal: [
        { teks: "1/4 … 1/5", jawaban: ">", opsi: ["<", ">", "="] },
        { teks: "2/5 … 4/5", jawaban: "<", opsi: [">", "=", "<"] },
        { teks: "3/6 = …/2", jawaban: "1", opsi: ["3", "2", "1"] },
      ],
      sukses: "Tepat! Penyebut besar membuat bagian kecil, penyebut sama banding pembilang, dan senilai diubah sama-sama.",
      salah: "Hmm, ingat: bagian harus sama besar. Coba lagi.",
    },
    {
      id: "desimal",
      jenis: "pilih",
      cerita: "Pos kedua: pecahan 7/100 ditulis desimal sebagai…",
      opsi: [
        { teks: "0,7", benar: false, umpan: "Penyebut 100 berarti dua angka di belakang koma. 0,7 sama dengan 7/10." },
        { teks: "0,07", benar: true, umpan: "Betul! Dua angka di belakang koma, nol di depan tetap ditulis." },
        { teks: "0,007", benar: false, umpan: "Itu tiga angka di belakang koma. Penyebut 100 berarti dua angka." },
      ],
    },
    {
      id: "bekal",
      jenis: "hitung",
      cerita: "Pos ketiga: dari 10 siswa, ada yang membawa bekal. Tiap stik di bawah ini satu siswa yang membawa bekal.",
      tanya: "Ketuk semua stik. Ada berapa siswa yang membawa bekal?",
      objek: "stik",
      jumlah: 5,
      sukses: "Betul! Lima dari sepuluh siswa, 5/10 = 50/100 = 50%.",
      salah: "Hmm, ketuk tiap stik satu kali, lalu hitung lagi.",
    },
    {
      id: "persen",
      jenis: "pilih",
      cerita: "Pos keempat: diskon di toko sebesar 0,25 dari harga. Ditulis persen…",
      opsi: [
        { teks: "2,5%", benar: false, umpan: "Koma digeser dua kali ke kanan, bukan satu kali: 0,25 menjadi 25." },
        { teks: "0,25%", benar: false, umpan: "0,25 dikali 100% menghasilkan 25%, bukan 0,25%." },
        { teks: "25%", benar: true, umpan: "Betul! 0,25 = 25/100 = 25%." },
      ],
    },
    {
      id: "lebih",
      jenis: "pilih",
      cerita: "Pos kelima: pita Pak Toni 2,46 kali pita pendek. Ditulis persen…",
      opsi: [
        { teks: "24,6%", benar: false, umpan: "Koma harus digeser dua kali ke kanan. Hasilnya 246, bukan 24,6." },
        { teks: "246%", benar: true, umpan: "Betul! 2,46 × 100% = 246%. Persen boleh lebih dari 100%." },
        { teks: "0,246%", benar: false, umpan: "Itu menggeser koma ke arah yang salah. Dari desimal ke persen, geser ke kanan." },
      ],
    },
    {
      id: "pengali",
      jenis: "isi",
      cerita: "Pos terakhir: 20 dari 50 siswa ikut olahraga. Agar penyebutnya 100, kalikan 50 dengan berapa? Satu stik satu.",
      objek: "stik",
      target: 2,
      maks: 10,
      sukses: "Pas! 50 × 2 = 100, jadi 20/50 = 40/100 = 40%.",
      kurang: "Stiknya masih kurang. Berapa kali 50 sama dengan 100?",
      lebih: "Stiknya kelebihan. 50 dikali 2 sudah 100.",
    },
    { id: "tutup", jenis: "akhir", cerita: "Selamat! Kamu menuntaskan Pameran Pecahan Kelas 4. Ingat: bagian harus sama besar, penyebut sama banding pembilang, senilai diubah sama-sama, dua angka di belakang koma berarti per seratus, dan persen artinya per seratus." },
  ],
};
