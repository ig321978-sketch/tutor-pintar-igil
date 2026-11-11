import type { DefSkenario } from "./skenario-umum";

/**
 * Dua skenario Kelas 2 Bab 4. Tanpa jaringan, tanpa gambar benda (hanya teks), jadi tidak melanggar batas
 * Concrete dan Picture.
 *  - SKENARIO_K2B4A: Panen di Sawah Paman (Sub-Bab A, posisi benda).
 *  - SKENARIO_K2B4B: Pesta Pola di Desa (Sub-Bab B, pola; sub-bab akhir, ikut mengingat posisi benda).
 */

export const SKENARIO_K2B4A: DefSkenario = {
  id: "panen-sawah-paman-k2b4",
  judul: "Panen di Sawah Paman",
  latar: "Bantu Paman menceritakan letak benda di sawah dengan enam kata posisi.",
  tokoh: "👨‍🌾",
  nama: "Paman",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita:
        "Halo! Aku Paman. Hari ini kita memanen padi di sawah. Aku butuh bantuanmu. Kita akan menceritakan letak benda dengan kata atas, bawah, depan, belakang, kanan, dan kiri.",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "kupu",
      jenis: "pilih",
      cerita: "Seekor kupu-kupu hinggap di atas bunga di pematang. Kalimat mana yang benar tentang bunga itu?",
      opsi: [
        {
          teks: "Bunga ada di atas kupu-kupu",
          benar: false,
          umpan: "Kupu-kupu hinggap di atas bunga. Jadi bunganya yang ada di bawah, bukan di atas.",
        },
        {
          teks: "Bunga ada di bawah kupu-kupu",
          benar: true,
          umpan: "Betul! Kalau kupu-kupu di atas bunga, maka bunga ada di bawah kupu-kupu. Atas dan bawah berlawanan.",
        },
        {
          teks: "Bunga ada di sebelah kanan kupu-kupu",
          benar: false,
          umpan: "Kupu-kupu hinggap tepat di atas bunga, bukan di samping. Coba pikirkan lagi tinggi rendahnya.",
        },
      ],
    },
    {
      id: "lawan",
      jenis: "soal",
      cerita: "Ayo lengkapi kalimat dengan kata yang berlawanan. Ingat, ada tiga pasangan kata posisi.",
      soal: [
        { teks: "Burung berjalan di depan ulat. Jadi ulat ada di … burung.", jawaban: "belakang", opsi: ["atas", "belakang", "depan"] },
        { teks: "Kanan berlawanan dengan …", jawaban: "kiri", opsi: ["depan", "kiri", "atas"] },
        { teks: "Ember di bawah gerobak. Jadi gerobak ada di … ember.", jawaban: "atas", opsi: ["atas", "kanan", "belakang"] },
      ],
      sukses: "Hebat! Kata posisi berpasangan dengan lawannya: atas dengan bawah, depan dengan belakang, kanan dengan kiri.",
      salah: "Hmm, ingat tiga pasangan kata berlawanan. Coba lagi pelan-pelan.",
    },
    {
      id: "barisan",
      jenis: "soal",
      cerita: "Enam sekawan berdiri berderet di sawah. Dari kiri ke kanan: Upe, Lili, Halim, Kira, Malosi, dan Tika.",
      soal: [
        { teks: "Siapa yang di sebelah kanan Lili?", jawaban: "Halim", opsi: ["Upe", "Halim", "Kira"] },
        { teks: "Siapa yang di sebelah kiri Malosi?", jawaban: "Kira", opsi: ["Tika", "Halim", "Kira"] },
        { teks: "Siapa yang di sebelah kanan Kira?", jawaban: "Malosi", opsi: ["Malosi", "Tika", "Lili"] },
      ],
      sukses: "Tepat! Kamu membaca kanan dan kiri dari posisi kita yang melihat gambar.",
      salah: "Hmm, baca barisan dari kiri ke kanan lagi. Kanan dan kiri sesuai dengan posisi kita.",
    },
    {
      id: "sudut",
      jenis: "pilih",
      cerita:
        "Paman berdiri membelakangi kita dan berkata, ayam ada di sebelah kiri saya. Paman menghadap ke arah yang sama dengan kita. Di sebelah mana ayam itu menurut kita?",
      opsi: [
        {
          teks: "Di sebelah kanan kita, karena Paman membelakangi kita",
          benar: false,
          umpan: "Paman menghadap arah yang sama dengan kita. Jadi kiri Paman sama dengan kiri kita, tidak terbalik.",
        },
        {
          teks: "Di atas kita",
          benar: false,
          umpan: "Paman bicara tentang kiri, bukan atas. Kiri dan kanan menunjukkan letak di samping.",
        },
        {
          teks: "Di sebelah kiri kita, sama dengan kiri Paman",
          benar: true,
          umpan: "Betul! Anak atau orang yang membelakangi kita menghadap arah yang sama, jadi kiri dan kanannya sama dengan kiri dan kanan kita.",
        },
      ],
    },
    {
      id: "petunjuk",
      jenis: "soal",
      cerita: "Sekarang tebak benda di lumbung dengan menggabungkan petunjuk. Satu petunjuk kadang belum cukup.",
      soal: [
        {
          teks: "Caping, sabit, dan bakul berderet dari kiri ke kanan. Aku di sebelah kanan caping dan di sebelah kiri bakul. Aku apa?",
          jawaban: "sabit",
          opsi: ["sabit", "caping", "bakul"],
        },
        {
          teks: "Dari atas ke bawah ada burung, caping, dan ember. Aku di bawah burung dan di atas ember. Aku apa?",
          jawaban: "caping",
          opsi: ["ember", "burung", "caping"],
        },
      ],
      sukses: "Pintar! Dua petunjuk bisa membawa kita ke satu benda yang tepat.",
      salah: "Hmm, cocokkan kedua petunjuk sekaligus. Benda itu harus cocok dengan keduanya.",
    },
    {
      id: "akhir",
      jenis: "akhir",
      cerita: "Terima kasih! Berkat kamu panen hari ini rapi dan semua benda ada di tempatnya. Kamu sudah pandai menceritakan posisi benda.",
    },
  ],
};

export const SKENARIO_K2B4B: DefSkenario = {
  id: "pesta-pola-desa-k2b4",
  judul: "Pesta Pola di Desa",
  latar: "Bantu Kira menghias pesta panen dengan pola yang berulang dan teratur.",
  tokoh: "👧",
  nama: "Kira",
  adegan: [
    {
      id: "buka",
      jenis: "narasi",
      cerita:
        "Halo! Aku Kira. Desa kami mengadakan pesta panen. Semua hiasan memakai pola, yaitu hal yang berulang dan teratur. Ayo bantu aku menghias dan memeriksa polanya.",
      tombol: "Ayo mulai! ➡",
    },
    {
      id: "taplak",
      jenis: "soal",
      cerita: "Dua taplak meja punya pola bentuk. Lanjutkan polanya dengan melihat satuan yang berulang.",
      soal: [
        { teks: "Taplak pertama: bunga, persegi, bunga, persegi, bunga. Berikutnya apa?", jawaban: "persegi", opsi: ["bunga", "persegi", "hati"] },
        { teks: "Taplak kedua: hati, hati, segitiga, hati, hati, segitiga, hati, hati. Berikutnya apa?", jawaban: "segitiga", opsi: ["segitiga", "hati", "bunga"] },
      ],
      sukses: "Tepat! Cari dulu satuan polanya, lalu lanjutkan dengan urutan yang sama.",
      salah: "Hmm, cari kelompok yang berulang dari awal, lalu lanjutkan urutannya.",
    },
    {
      id: "kaus",
      jenis: "pilih",
      cerita: "Kaus panitia berpola merah, biru, merah, biru, merah, biru. Aku ingin menyebut satuan polanya. Yang mana yang benar?",
      opsi: [
        {
          teks: "Merah saja",
          benar: false,
          umpan: "Merah saja tidak cukup. Ada unsur biru yang juga berulang. Satuan harus memuat semua unsur dalam kelompoknya.",
        },
        {
          teks: "Merah, biru, merah",
          benar: false,
          umpan: "Kelompok itu terlalu panjang. Merah, biru sudah berulang, jadi satuan terpendeknya hanya merah dan biru.",
        },
        {
          teks: "Merah, biru",
          benar: true,
          umpan: "Betul! Satuan pola adalah kelompok terpendek yang berulang. Di sini satuannya merah, biru.",
        },
      ],
    },
    {
      id: "kode",
      jenis: "soal",
      cerita: "Pola bisa ditulis dengan huruf. Unsur yang sama memakai huruf yang sama.",
      soal: [
        { teks: "Kuning, kuning, ungu, kuning, kuning, ungu. Kode huruf satuannya?", jawaban: "A A B", opsi: ["A A B", "A B B", "A B C"] },
        { teks: "Satuan A B C diulang. Setelah A B C A B, huruf berikutnya?", jawaban: "C", opsi: ["A", "C", "B"] },
      ],
      sukses: "Pintar! Kode huruf memisahkan susunan pola dari isinya.",
      salah: "Hmm, beri huruf yang sama untuk unsur yang sama, lalu cari satuannya.",
    },
    {
      id: "bukan",
      jenis: "pilih",
      cerita: "Panitia menyusun gelang: lingkaran, segitiga, segitiga, lingkaran, segitiga, lingkaran. Apakah gelang itu berpola?",
      opsi: [
        {
          teks: "Ya, karena ada dua bentuk",
          benar: false,
          umpan: "Dua bentuk saja belum cukup. Kelompoknya juga harus berulang dengan teratur, dan di sini tidak.",
        },
        {
          teks: "Tidak, karena kelompoknya tidak berulang dengan teratur",
          benar: true,
          umpan: "Betul! Pola harus berulang dan teratur. Gelang ini susunannya berganti-ganti tanpa kelompok yang berulang.",
        },
        {
          teks: "Ya, karena semuanya segitiga",
          benar: false,
          umpan: "Tidak semuanya segitiga, ada lingkaran juga. Lagi pula barisan yang semuanya sama bukan pola.",
        },
      ],
    },
    {
      id: "gerak",
      jenis: "soal",
      cerita: "Penari dan penabuh memainkan pola gerakan dan pola suara. Lanjutkan pola mereka.",
      soal: [
        { teks: "Penari: membungkuk, berdiri, membungkuk, berdiri. Gerakan berikutnya?", jawaban: "membungkuk", opsi: ["berdiri", "tangan naik", "membungkuk"] },
        { teks: "Penabuh: keras, pelan, pelan, keras, pelan, pelan, keras. Tepukan berikutnya?", jawaban: "pelan", opsi: ["pelan", "keras", "diam"] },
      ],
      sukses: "Bagus! Gerakan dan suara yang berulang teratur juga membentuk pola.",
      salah: "Hmm, cari satuan yang berulang dari awal, lalu lanjutkan urutannya.",
    },
    {
      id: "kursi",
      jenis: "pilih",
      cerita:
        "Di panggung ada barisan kursi berpola merah, biru, merah, biru. Kursi biru berada di sebelah kanan kursi merah. Kursi merah itu ada di sebelah mana kursi biru?",
      opsi: [
        {
          teks: "Di sebelah kiri kursi biru",
          benar: true,
          umpan: "Tepat! Kalau biru di kanan merah, maka merah di kiri biru. Kanan dan kiri berlawanan, seperti yang kita pelajari di Sub-Bab A.",
        },
        {
          teks: "Di sebelah kanan kursi biru",
          benar: false,
          umpan: "Kalau biru ada di kanan merah, maka merahnya ada di kiri biru. Pakai kata lawan kanan.",
        },
        {
          teks: "Di atas kursi biru",
          benar: false,
          umpan: "Kursi-kursi itu berderet ke samping, bukan bertumpuk. Pakai kata kanan atau kiri.",
        },
      ],
    },
    {
      id: "akhir",
      jenis: "akhir",
      cerita: "Hore! Pesta panen meriah berkat polamu. Kamu pandai melanjutkan pola, mencari satuannya, dan memeriksa mana yang bukan pola.",
    },
  ],
};
