import type { DefSkenario } from "./skenario-umum";

/**
 * Skenario Kelas 5 Bab 1 (Bilangan Cacah sampai 100.000). Tanpa jaringan, tanpa model bahasa.
 * Kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k5b1.mjs (dihitung ulang dari data buku).
 *  - SKENARIO_K5B1A: Papan Data Desa (menulis, banyak digit, digit di satu tempat, nilai digit, nol penjaga)
 *  - SKENARIO_K5B1B: Lomba Dakon (tanda, memeriksa dari kiri, digit penentu, acuan, bilangan tengah, urut naik)
 *  - SKENARIO_K5B1C: Uang Asep dan Komang (bentuk panjang, suku, kartu yang diperlukan, menukar kartu)
 */

export const SKENARIO_K5B1A: DefSkenario = {
  id: "data-desa-k5b1",
  judul: "Papan Data Desa",
  latar: "Bantu Yohana menulis dan membaca data penduduk di papan desa.",
  tokoh: "👧",
  nama: "Yohana",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Yohana. Hari ini aku membantu Pak Kepala Desa menulis data penduduk di papan. Bilangannya besar, sampai puluhan ribu. Kita pakai tabel nilai tempat, ya.",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "tulis",
      jenis: "pilih",
      cerita: "Pak Kepala Desa berkata, banyak penduduk dua puluh enam ribu sembilan ratus tiga puluh dua orang. Bagaimana Yohana menulisnya?",
      opsi: [
        { teks: "2.693", benar: false, umpan: "Ada digit yang hilang. Dua puluh enam ribu berarti ada digit di puluh ribuan dan ribuan." },
        { teks: "26.932", benar: true, umpan: "Betul! Dua puluh enam ribu ditulis 26, lalu sembilan ratus tiga puluh dua ditulis 932." },
        { teks: "29.632", benar: false, umpan: "Digit ribuan dan ratusan tertukar. Periksa kolom demi kolom." },
      ],
    },
    {
      id: "digit",
      jenis: "hitung",
      cerita: "Penduduk perempuan ada 13.578 orang. Yohana menaruh satu stik untuk tiap digit yang ditulis.",
      tanya: "Ketuk semua stik. Ada berapa digit pada 13.578?",
      objek: "stik",
      jumlah: 5,
      sukses: "Betul! Lima digit: puluh ribuan, ribuan, ratusan, puluhan, dan satuan.",
      salah: "Hmm, ketuk tiap stik sekali saja, lalu hitung lagi.",
    },
    {
      id: "puluhan",
      jenis: "isi",
      cerita: "Penduduk laki-laki ada 13.354 orang. Masukkan stik sebanyak digit di tempat puluhan.",
      objek: "stik",
      target: 5,
      maks: 10,
      sukses: "Pas! Digit di tempat puluhan adalah 5, jadi nilainya 50.",
      kurang: "Stiknya masih kurang. Hitung tempat dari kanan: satuan, lalu puluhan.",
      lebih: "Stiknya kelebihan. Digit puluhan ada di tempat kedua dari kanan.",
    },
    {
      id: "nilai",
      jenis: "soal",
      cerita: "Yohana memeriksa nilai tiap digit di papan.",
      soal: [
        { teks: "Nilai digit 9 pada 26.932 …", jawaban: "900", opsi: ["9", "9.000", "900"] },
        { teks: "Digit di tempat puluh ribuan pada 13.578 …", jawaban: "1", opsi: ["3", "1", "5"] },
        { teks: "Nol pada 20.040 gunanya …", jawaban: "menjaga tempat", opsi: ["menjaga tempat", "dihapus saja", "diganti satu"] },
      ],
      sukses: "Hebat! Nilai digit bergantung pada tempatnya, dan nol menjaga tempat yang kosong.",
      salah: "Hmm, lihat lagi tempat digitnya. Coba lagi.",
    },
    {
      id: "nol",
      jenis: "pilih",
      cerita: "Teman Yohana mendengar empat puluh ribu tiga ratus lima puluh, lalu menulis 4.035. Apa yang benar?",
      opsi: [
        { teks: "4.035 sudah benar", benar: false, umpan: "4.035 dibaca empat ribu tiga puluh lima. Itu bilangan lain." },
        { teks: "Tulis 403.500", benar: false, umpan: "Itu terlalu besar, enam digit. Bilangan kita hanya puluhan ribu." },
        { teks: "Tulis 40.350, nol menjaga tempat", benar: true, umpan: "Betul! Nol di ribuan dan satuan membuat 4 tetap di puluh ribuan." },
      ],
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Papan desa sudah rapi. Tiap digit punya nilai menurut tempatnya, kita membaca per kelompok tiga digit, dan nol menjaga tempat agar digit tidak bergeser.",
    },
  ],
};

export const SKENARIO_K5B1B: DefSkenario = {
  id: "lomba-dakon-k5b1",
  judul: "Lomba Dakon",
  latar: "Bantu Lukas membandingkan dan mengurutkan skor lomba dakon.",
  tokoh: "👦",
  nama: "Lukas",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Lukas. Kelas kami mengadakan lomba dakon. Skornya ribuan, ada 56.560, 65.750, 57.000, dan 75.360. Bantu aku menentukan juaranya, ya.",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "banding",
      jenis: "pilih",
      cerita: "Skor tim Lukas 56.560, skor tim Komang 57.000. Mana kalimat yang benar?",
      opsi: [
        { teks: "56.560 < 57.000", benar: true, umpan: "Betul! Puluh ribuan sama-sama 5. Di ribuan, 6 lebih kecil dari 7." },
        { teks: "56.560 > 57.000", benar: false, umpan: "Bandingkan dari kiri, bukan dari kanan. Di ribuan ada 6 dan 7." },
        { teks: "56.560 = 57.000", benar: false, umpan: "Kedua bilangan tidak sama. Digit di ribuan sudah berbeda." },
      ],
    },
    {
      id: "periksa",
      jenis: "hitung",
      cerita: "Lukas memeriksa 56.560 dan 57.000 dari kiri, satu tempat demi satu tempat, sampai ketemu digit yang berbeda. Satu stik untuk tiap tempat yang diperiksa.",
      tanya: "Ketuk semua stik. Berapa tempat yang diperiksa?",
      objek: "stik",
      jumlah: 2,
      sukses: "Betul! Puluh ribuan sama, lalu di ribuan sudah berbeda. Tempat di kanannya tidak perlu dilihat.",
      salah: "Hmm, ketuk tiap stik sekali saja, lalu hitung lagi.",
    },
    {
      id: "penentu",
      jenis: "isi",
      cerita: "Skor 75.360 dan 65.750 berbeda sejak puluh ribuan. Masukkan stik sebanyak digit puluh ribuan milik 75.360.",
      objek: "stik",
      target: 7,
      maks: 10,
      sukses: "Pas! Digit penentunya 7 dan 6, jadi 75.360 lebih besar dari 65.750.",
      kurang: "Stiknya masih kurang. Lihat digit paling kiri dari 75.360.",
      lebih: "Stiknya kelebihan. Lihat digit paling kiri dari 75.360.",
    },
    {
      id: "baca",
      jenis: "soal",
      cerita: "Lukas menjawab pertanyaan teman-temannya.",
      soal: [
        { teks: "Skor dakon paling besar …", jawaban: "75.360", opsi: ["65.750", "75.360", "57.000"] },
        { teks: "45.230 … 46.001", jawaban: "<", opsi: [">", "=", "<"] },
        { teks: "Dengan acuan 50.000, skor 43.217 ada di sebelah … 50.000", jawaban: "kiri", opsi: ["kiri", "kanan", "tepat di"] },
        { teks: "Bilangan tengah dari 85.350, 85.550, dan 85.450 …", jawaban: "85.450", opsi: ["85.350", "85.450", "85.550"] },
      ],
      sukses: "Hebat! Bandingkan dari kiri, dan di garis bilangan yang lebih kanan lebih besar.",
      salah: "Hmm, bandingkan digit dari tempat terbesar. Coba lagi.",
    },
    {
      id: "urut",
      jenis: "pilih",
      cerita: "Panitia menulis skor dakon dari yang terkecil sampai yang terbesar. Mana urutan naik yang benar?",
      opsi: [
        { teks: "75.360, 65.750, 57.000, 56.560", benar: false, umpan: "Itu urutan turun, dari yang terbesar. Panitia meminta urutan naik." },
        { teks: "57.000, 56.560, 65.750, 75.360", benar: false, umpan: "57.000 lebih besar dari 56.560, jadi tidak boleh di depannya." },
        { teks: "56.560, 57.000, 65.750, 75.360", benar: true, umpan: "Betul! Urut naik, dan juaranya skor 75.360." },
      ],
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Juaranya sudah ketemu. Kita membandingkan dari tempat terbesar di kiri, memakai tanda lebih kecil, lebih besar, atau sama dengan, dan mengurutkan naik atau turun dengan teliti.",
    },
  ],
};

export const SKENARIO_K5B1C: DefSkenario = {
  id: "uang-asep-k5b1",
  judul: "Uang Asep dan Komang",
  latar: "Bantu Asep menguraikan dan menyusun uang tabungan dari kartu.",
  tokoh: "🧒",
  nama: "Asep",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Asep. Bersama Komang, aku menghitung uang tabungan. Uangnya berupa kartu 10.000, 1.000, dan 100. Kita uraikan dan susun, ya.",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "asep",
      jenis: "pilih",
      cerita: "Asep punya 3 kartu 10.000, 8 kartu 1.000, dan 6 kartu 100. Berapa uang Asep?",
      opsi: [
        { teks: "36.800", benar: false, umpan: "Digit 8 dan 6 tertukar tempat. 8 kartu 1.000 bernilai 8.000, dan 6 kartu 100 bernilai 600." },
        { teks: "48.600", benar: false, umpan: "3 kartu 10.000 bernilai 30.000, bukan 40.000." },
        { teks: "38.600", benar: true, umpan: "Betul! 30.000 + 8.000 + 600 = 38.600." },
      ],
    },
    {
      id: "lukas",
      jenis: "hitung",
      cerita: "Uang Lukas 63.500. Bentuk panjangnya 60.000 + 3.000 + 500. Satu stik untuk tiap suku.",
      tanya: "Ketuk semua stik. Ada berapa suku?",
      objek: "stik",
      jumlah: 3,
      sukses: "Betul! Tiga suku: 60.000, 3.000, dan 500.",
      salah: "Hmm, ketuk tiap stik sekali saja, lalu hitung lagi.",
    },
    {
      id: "komang",
      jenis: "isi",
      cerita: "Komang butuh 45.600. Ia sudah punya 3 kartu 10.000 dan 6 kartu 100. Masukkan stik sebanyak kartu 1.000 yang masih diperlukan.",
      objek: "stik",
      target: 15,
      maks: 20,
      sukses: "Pas! 3 kartu 10.000 + 15 kartu 1.000 + 6 kartu 100 = 45.600.",
      kurang: "Stiknya masih kurang. Hitung nilai kartu yang sudah ada, lalu cari sisanya sampai 45.600.",
      lebih: "Stiknya kelebihan. Jumlah semua kartu harus tepat 45.600.",
    },
    {
      id: "tukar",
      jenis: "pilih",
      cerita: "Komang menukar uangnya menjadi 2 kartu 10.000, 25 kartu 1.000, dan 6 kartu 100. Apakah jumlahnya masih 45.600?",
      opsi: [
        { teks: "Ya, totalnya tetap 45.600", benar: true, umpan: "Betul! 20.000 + 25.000 + 600 = 45.600. Menukar kartu hanya mengganti bentuknya." },
        { teks: "Tidak, harus 4 kartu 10.000", benar: false, umpan: "Ada banyak cara menyusun jumlah yang sama. Kartu 10.000 tidak harus empat." },
        { teks: "Tidak, hanya 4.560", benar: false, umpan: "Itu terlalu kecil. Jumlahkan nilai tiap kartu, jangan hanya menghitung kartunya." },
      ],
    },
    {
      id: "baca",
      jenis: "soal",
      cerita: "Asep menjawab pertanyaan Komang.",
      soal: [
        { teks: "Bentuk panjang 63.500 …", jawaban: "60.000 + 3.000 + 500", opsi: ["6.000 + 300 + 50", "60.000 + 3.000 + 500", "60 + 3 + 5"] },
        { teks: "2 kartu 10.000 + 25 kartu 1.000 + 6 kartu 100 = …", jawaban: "45.600", opsi: ["45.600", "27.600", "55.600"] },
        { teks: "1 kartu 10.000 ditukar kartu 1.000. Kartu 1.000 yang didapat …", jawaban: "10", opsi: ["1", "100", "10"] },
      ],
      sukses: "Hebat! Uraikan tiap digit dengan nilai tempatnya, dan jumlahkan lagi untuk kembali ke bilangan semula.",
      salah: "Hmm, ingat nilai tempat tiap digit. Coba lagi.",
    },
    {
      id: "tutup",
      jenis: "akhir",
      cerita: "Terima kasih! Bilangan bisa diuraikan menjadi suku nilai tempat dan disusun kembali dari kartu. Ada banyak cara menyusun jumlah yang sama, dan saat kartu ditukar, jumlahnya tetap.",
    },
  ],
};
