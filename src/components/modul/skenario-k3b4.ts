import type { DefSkenario } from "./skenario-umum";

/**
 * Tiga skenario Kelas 3 Bab 4 (Unsur-Unsur Bangun Datar). Tanpa jaringan, tanpa panggilan model bahasa.
 * Bilangan dan kunci dicek di scripts/uji-skenario-umum.mjs dan scripts/uji-lab-k3b4.mjs.
 *  - SKENARIO_K3B4A: Peta Alfa     (Sub-Bab A, ruas garis, mengukur dalam cm dan mm, sisi bangun datar)
 *  - SKENARIO_K3B4B: Pintu Meutia  (Sub-Bab B, sudut dan jenis-jenisnya, busur derajat)
 *  - SKENARIO_K3B4C: Pagar Taman   (Sub-Bab C, garis tegak lurus dan sejajar; sekaligus mengulang seluruh bab)
 */

export const SKENARIO_K3B4A: DefSkenario = {
  id: "peta-alfa-k3b4",
  judul: "Peta Alfa",
  latar: "Bantu Alfa menggambar peta: mengenali garis, mengukur ruas garis, dan menghitung sisi bangun.",
  tokoh: "🧒",
  nama: "Alfa",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Alfa. Aku sedang menggambar peta kampungku dengan penggaris. Bantu aku mengenali garis, mengukur panjangnya, dan menghitung sisi bangun, ya.",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "jenis",
      jenis: "pilih",
      cerita: "Senterku menyala dari satu titik dan sinarnya menuju satu arah. Garis apa yang paling mirip dengan sinar senter?",
      opsi: [
        { teks: "Ruas garis", benar: false, umpan: "Ruas garis punya dua titik ujung dan panjang tetap. Sinar senter berpangkal di satu titik dan terus ke satu arah." },
        { teks: "Sinar garis", benar: true, umpan: "Betul! Sinar garis berpangkal di satu titik dan hanya dapat diperpanjang ke satu sisi." },
        { teks: "Garis", benar: false, umpan: "Garis dapat diperpanjang ke kedua sisi dan tidak punya ujung. Sinar senter berpangkal di satu titik." },
      ],
    },
    {
      id: "satuan",
      jenis: "soal",
      cerita: "Penggaris pendekku punya garis-garis kecil. Kita periksa tiga hal.",
      soal: [
        { teks: "Satu sentimeter sama dengan … milimeter.", jawaban: "10", opsi: ["10", "1", "100"] },
        { teks: "Lima milimeter sama dengan … sentimeter.", jawaban: "0,5", opsi: ["5", "50", "0,5"] },
        { teks: "Ruas garis memiliki … titik ujung.", jawaban: "dua", opsi: ["satu", "dua", "tak terhingga"] },
      ],
      sukses: "Hebat! Satu sentimeter sama dengan sepuluh milimeter, dan lima milimeter sama dengan nol koma lima sentimeter.",
      salah: "Hmm, ingat: garis kecil membagi satu sentimeter menjadi sepuluh bagian. Coba lagi pelan-pelan.",
    },
    {
      id: "hitung-sisi",
      jenis: "hitung",
      cerita: "Di petaku ada kolam berbentuk segienam. Tiap stik di bawah ini mewakili satu sisi kolam.",
      tanya: "Ketuk semua sisinya. Ada berapa sisi?",
      objek: "stik",
      jumlah: 6,
      sukses: "Betul! Segienam memiliki enam sisi, yaitu enam ruas garis pembatas.",
      salah: "Hmm, ketuk tiap sisi satu kali, lalu hitung lagi.",
    },
    {
      id: "nol",
      jenis: "pilih",
      cerita: "Temanku meletakkan titik M ruas garis MN di angka 2, lalu membaca titik N di angka 7 dan menulis MN = 7 cm. Apa yang kurang tepat?",
      opsi: [
        { teks: "Tidak ada yang salah, MN = 7 cm", benar: false, umpan: "Titik M ada di angka 2, bukan 0. Bacaan 7 bukan panjang MN. Dari angka 0 panjangnya hanya 5 cm." },
        { teks: "Harus diganti dengan milimeter", benar: false, umpan: "Satuannya boleh sentimeter. Yang salah adalah tempat mulainya. Titik awal harus di angka 0." },
        { teks: "Titik M harus tepat di angka 0", benar: true, umpan: "Betul! Mengukur selalu dimulai dari angka 0. Dari angka 2 ke 7, panjang MN sebenarnya 5 cm." },
      ],
    },
    {
      id: "isi-ruas",
      jenis: "isi",
      cerita: "Jalan di petaku berupa ruas garis sepanjang 12 cm. Isi keranjang dengan stik sepanjang 1 cm sebanyak panjang ruas itu.",
      objek: "stik",
      target: 12,
      maks: 20,
      sukses: "Pas! Dua belas stik satu sentimeter panjangnya 12 cm.",
      kurang: "Stiknya masih kurang. Ruas garisnya 12 cm, jadi butuh 12 stik.",
      lebih: "Stiknya kelebihan. Ruas garisnya 12 cm, jadi cukup 12 stik.",
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Petaku selesai. Ingat: ruas garis diukur dari angka 0, dan ruas garis pembatas bangun datar dinamakan sisi." },
  ],
};

export const SKENARIO_K3B4B: DefSkenario = {
  id: "pintu-meutia-k3b4",
  judul: "Pintu Meutia",
  latar: "Bantu Meutia memahami sudut pada pintu dan gunting, dan mengukurnya dengan busur derajat.",
  tokoh: "👧",
  nama: "Meutia",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Hai! Aku Meutia. Di rumahku ada pintu, gunting, dan buku yang bisa dibuka. Bantu aku memahami sudut dan mengukurnya dengan busur derajat, ya.",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "buka-pintu",
      jenis: "pilih",
      cerita: "Pintu rumahku dibuka makin lebar. Apa yang terjadi pada sudut bukaan pintu?",
      opsi: [
        { teks: "Sudutnya makin kecil", benar: false, umpan: "Makin lebar pintu dibuka, makin besar sudutnya, bukan makin kecil." },
        { teks: "Sudutnya tetap sama", benar: false, umpan: "Sudut bukaan berubah mengikuti lebar bukaan. Makin lebar, makin besar." },
        { teks: "Sudutnya makin besar", benar: true, umpan: "Betul! Makin lebar pintu dibuka, makin besar sudut yang terbentuk." },
      ],
    },
    {
      id: "jenis",
      jenis: "soal",
      cerita: "Sekarang kita periksa ukuran beberapa sudut.",
      soal: [
        { teks: "Sudut siku-siku ukurannya … derajat.", jawaban: "90", opsi: ["45", "90", "180"] },
        { teks: "Sudut lurus ukurannya … derajat.", jawaban: "180", opsi: ["90", "360", "180"] },
        { teks: "Sudut refleks 300° berpasangan dengan sudut … derajat.", jawaban: "60", opsi: ["60", "120", "30"] },
      ],
      sukses: "Tepat! Siku-siku 90°, lurus 180°, dan sudut refleks berpasangan dengan sudut lain sehingga jumlahnya 360°.",
      salah: "Hmm, ingat: siku-siku tepat 90°, lurus 180°, dan sepasang sudut jumlahnya 360°. Coba lagi.",
    },
    {
      id: "hitung-irisan",
      jenis: "hitung",
      cerita: "Aku menutup sudut siku-siku 90° dengan irisan kecil yang masing-masing 15°. Tiap stik di bawah ini satu irisan kecil.",
      tanya: "Ketuk semua irisan. Ada berapa irisan kecil?",
      objek: "stik",
      jumlah: 6,
      sukses: "Betul! Enam irisan kecil, karena 6 × 15° = 90°. Dengan irisan besar 30°, cukup tiga irisan.",
      salah: "Hmm, ketuk tiap irisan satu kali, lalu hitung lagi.",
    },
    {
      id: "busur",
      jenis: "pilih",
      cerita: "Kaki OA berimpit dengan garis nol skala luar busur derajat. Kaki OB melewati angka 50 pada skala luar dan 130 pada skala dalam. Berapa derajat sudut AOB?",
      opsi: [
        { teks: "130°", benar: false, umpan: "Angka 130 ada pada skala dalam, yang dimulai dari ujung yang lain. Garis nolnya ada di kaki OA pada skala luar." },
        { teks: "180°", benar: false, umpan: "180° adalah sudut lurus, yaitu ujung busur derajat. Kaki OB hanya sampai angka 50 pada skala luar." },
        { teks: "50°", benar: true, umpan: "Betul! Baca skala yang dimulai dari garis nol di kaki OA. Sudut AOB berukuran 50°, yaitu sudut lancip." },
      ],
    },
    {
      id: "isi-irisan",
      jenis: "isi",
      cerita: "Sekarang aku menutup sudut siku-siku 90° dengan irisan besar yang masing-masing 30°. Isi keranjang dengan irisan sebanyak yang diperlukan.",
      objek: "stik",
      target: 3,
      maks: 10,
      sukses: "Pas! Tiga irisan besar, karena 3 × 30° = 90°. Sudut yang sama bisa 3 irisan besar atau 6 irisan kecil.",
      kurang: "Irisannya masih kurang. Hitung 90° dibagi 30°.",
      lebih: "Irisannya kelebihan. Hitung 90° dibagi 30°.",
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Kamu pandai membaca dan membandingkan sudut. Ingat: bandingkan dengan 90° dan 180°, dan pakai satuan baku, yaitu derajat." },
  ],
};

export const SKENARIO_K3B4C: DefSkenario = {
  id: "pagar-taman-k3b4",
  judul: "Pagar Taman (pencapaian bab)",
  latar: "Bantu Alfa dan Meutia membuat pagar taman: garis sejajar, garis tegak lurus, dan bangun datar.",
  tokoh: "🧒",
  nama: "Alfa",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita: "Halo! Aku Alfa. Aku dan Meutia membuat pagar taman. Pagar itu penuh garis dan sudut. Bantu kami memeriksanya, ya.",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "tiang",
      jenis: "pilih",
      cerita: "Tiang pagar berdiri tegak dan palangnya mendatar. Keduanya bertemu pada sudut siku-siku. Apa hubungan tiang dan palang?",
      opsi: [
        { teks: "Tegak lurus", benar: true, umpan: "Betul! Dua garis yang bertemu pada sudut siku-siku adalah garis tegak lurus, ditulis dengan lambang ⊥." },
        { teks: "Sejajar", benar: false, umpan: "Garis sejajar tidak pernah bertemu. Tiang dan palang bertemu pada sudut siku-siku, jadi tegak lurus." },
        { teks: "Bukan keduanya", benar: false, umpan: "Tiang dan palang bertemu pada sudut siku-siku. Itu ciri garis tegak lurus." },
      ],
    },
    {
      id: "lambang",
      jenis: "soal",
      cerita: "Kita periksa lambang dan ciri bangun datar.",
      soal: [
        { teks: "AB // CD dibaca AB … CD.", jawaban: "sejajar", opsi: ["tegak lurus", "sejajar", "berimpit"] },
        { teks: "AB ⊥ BC dibaca AB … BC.", jawaban: "tegak lurus", opsi: ["sejajar", "tegak lurus", "sama dengan"] },
        { teks: "Persegi memiliki … sisi yang sama panjang.", jawaban: "4", opsi: ["4", "2", "3"] },
      ],
      sukses: "Tepat! ⊥ dibaca tegak lurus, // dibaca sejajar, dan persegi punya empat sisi sama panjang.",
      salah: "Hmm, ingat: ⊥ tegak lurus, // sejajar. Coba lagi pelan-pelan.",
    },
    {
      id: "hitung-tiang",
      jenis: "hitung",
      cerita: "Pagar tamanku punya beberapa tiang. Tiap stik di bawah ini satu tiang.",
      tanya: "Ketuk semua tiangnya. Ada berapa tiang?",
      objek: "stik",
      jumlah: 5,
      sukses: "Betul! Lima tiang, dan antara tiang-tiang itu ada empat pasang yang berdekatan.",
      salah: "Hmm, ketuk tiap tiang satu kali, lalu hitung lagi.",
    },
    {
      id: "jarak",
      jenis: "pilih",
      cerita: "Dua palang pagar ditarik pada kertas berpetak. Jarak keduanya di ujung kiri 2 petak dan di ujung kanan 4 petak. Apakah keduanya sejajar?",
      opsi: [
        { teks: "Sejajar, karena tidak bertemu", benar: false, umpan: "Garis sejajar jaraknya selalu sama. Jarak 2 petak dan 4 petak berbeda, jadi keduanya bukan garis sejajar." },
        { teks: "Bukan sejajar, karena jaraknya berbeda", benar: true, umpan: "Betul! Garis sejajar jaraknya selalu sama. Karena 2 petak dan 4 petak berbeda, keduanya bukan garis sejajar." },
        { teks: "Tegak lurus, karena jaraknya berbeda", benar: false, umpan: "Tegak lurus berarti bertemu pada sudut siku-siku, bukan soal jarak yang berbeda." },
      ],
    },
    {
      id: "ukur",
      jenis: "pilih",
      cerita: "Meutia mengukur palang dengan penggaris. Ujung kiri palang di angka 0 dan ujung kanan di angka 5 cm 5 mm. Panjang palang dalam milimeter?",
      opsi: [
        { teks: "505 mm", benar: false, umpan: "Itu seolah-olah 1 cm = 100 mm. Satu sentimeter sama dengan 10 milimeter, jadi 5 cm = 50 mm." },
        { teks: "5,5 mm", benar: false, umpan: "5,5 adalah ukuran dalam sentimeter. Dalam milimeter, 5 cm 5 mm = 50 mm + 5 mm." },
        { teks: "55 mm", benar: true, umpan: "Betul! 5 cm = 50 mm, ditambah 5 mm menjadi 55 mm, sama dengan 5,5 cm." },
      ],
    },
    {
      id: "sudut",
      jenis: "pilih",
      cerita: "Sambungan pagar membentuk sudut yang ukurannya tepat 90°. Sudut jenis apa itu?",
      opsi: [
        { teks: "Lancip", benar: false, umpan: "Sudut lancip kurang dari 90°. Sudut ini tepat 90°." },
        { teks: "Siku-siku", benar: true, umpan: "Betul! Sudut yang tepat 90° adalah sudut siku-siku. Itulah sebabnya tiang dan palang tegak lurus." },
        { teks: "Tumpul", benar: false, umpan: "Sudut tumpul lebih dari 90° dan kurang dari 180°. Sudut ini tepat 90°." },
      ],
    },
    { id: "tutup", jenis: "akhir", cerita: "Terima kasih! Pagarnya selesai. Kamu menguasai ruas garis, sudut, garis sejajar, dan garis tegak lurus." },
  ],
};
