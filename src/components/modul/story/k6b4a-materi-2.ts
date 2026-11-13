import type { AdeganStory } from "./logika-story";
import { W, balon, bulat, emo, garis, kotak, panah, skala, teks } from "./k6b4a-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k6b4a-bantu";

/* ------------------------------ 4. Poster lomba dan Eksplorasi 4.1 (hlm. 105 dan 106) ------------------------------ */
const kartuPernyataan = (nomor: number, isi: string[]) => [
  kotak("kp", 20, 22, 260, 44, W.putih, W.biru, { rx: 8 }),
  teks("kp-n", 34, 40, `Pernyataan ${nomor}`, 8, W.ungu, { anchor: "start" }),
  ...isi.map((b, i) => teks(`kp-t${i}`, 34, 54 + i * 10, b, 8, W.biru, { anchor: "start" })),
];

export const ADEGAN_POSTER: AdeganStory = {
  id: "poster-eksplorasi",
  judul: "Poster lomba dan Eksplorasi 4.1",
  sumber: "Buku Siswa hlm. 105–106; Buku Panduan Guru hlm. 116–118",
  latar: "#FFE9EC",
  kutipan: ["Dhien terhentak ketika melihat poster lomba menyanyi", "Saat liburan sekolah, selalu turun hujan", "Besok, matahari pasti terbit"],
  ketukan: [
    k("Dhien terhentak melihat poster lomba menyanyi di sekolahnya. Menyanyi adalah hobinya sejak kecil.", tambah(0, emo("dhien", 52, 172, "👧", 28)), tambah("poster", kotak("poster", 96, 20, 108, 110, W.krem, W.biru, { rx: 6 }), teks("po1", 150, 44, "LOMBA", 14, W.merah), teks("po2", 150, 60, "MENYANYI", 11)), tambah("menyanyi@2", emo("mik", 150, 100, "🎤", 32)), tambah("hobinya", emo("hati", 100, 150, "❤️", 18))),
    k("Ayah Dhien dulu seorang pemusik. Tetapi Dhien masih ragu dengan kemampuan dan peluang menangnya.", tambah("pemusik", emo("ayah", 252, 172, "👨", 28), emo("gitar", 228, 172, "🎸", 20)), tambah("ragu", emo("ragu", 52, 138, "😟", 20)), tambah("peluang", balon("rg", 150, 142, ["peluang menang", "kecil?"], 82))),
    k(
      "Ia berpikir, jumlah siswa di sekolahnya tidak sedikit, dan ia terbilang cukup pemalu.",
      bersih(0),
      tambah("siswa", ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => bulat(`s1${i}`, 40 + i * 30, 50, 9, "#FDE68A"))),
      tambah("tidak", ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => bulat(`s2${i}`, 40 + i * 30, 76, 9, "#BBF7D0"))),
      tambah("sedikit", ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => bulat(`s3${i}`, 40 + i * 30, 102, 9, "#BFDBFE")), teks("byk", 150, 128, "banyak siswa", 9)),
      tambah("pemalu", emo("malu", 150, 176, "🙈", 32)),
    ),
    k(
      "Pertanyaan buku: apakah benar Dhien tidak punya peluang menang sama sekali? Atau ia sebenarnya mungkin menang?",
      bersih(0),
      tambah(0, teks("jud", 150, 26, "Menurut kalian bagaimana?", 11, W.ungu)),
      tambah("tidak", kotak("ka", 14, 50, 132, 80, "#FECACA", W.merah, { rx: 10 }), teks("ka-t", 80, 82, "tidak punya peluang", 8.5), teks("ka-u", 80, 96, "sama sekali", 8.5)),
      tambah("mungkin", kotak("kb", 154, 50, 132, 80, "#BBF7D0", W.hijau, { rx: 10 }), teks("kb-t", 220, 82, "mungkin", 11), teks("kb-u", 220, 96, "menang", 11)),
      tambah("menang@2", emo("tanya", 150, 168, "❓", 28)),
    ),
    k(
      "Buku Panduan Guru menjawab: tidak benar. Dhien sebenarnya punya peluang untuk menang, hanya saja ia merasa tidak punya peluang sama sekali.",
      tambah("benar", emo("x", 80, 156, "❌", 26)),
      tambah("sebenarnya", emo("ok", 220, 156, "✅", 26)),
      sorotkan("sebenarnya", "kb"),
      tambah("merasa", balon("rs", 80, 168, ["hanya merasa"], 80)),
    ),
    k("Eksplorasi 4.1: kelompok 3 sampai 4 siswa memutuskan setuju atau tidak setuju pada lima pernyataan. Perbedaan pendapat boleh didiskusikan.", bersih(0), tambah("lima", ...[1, 2, 3, 4, 5].map((n) => [kotak(`p${n}`, 14 + (n - 1) * 56, 50, 50, 60, W.putih, W.biru, { rx: 8 }), teks(`p${n}t`, 39 + (n - 1) * 56, 86, String(n), 20, W.ungu)]).flat(), teks("jud", 150, 30, "Eksplorasi 4.1: lima pernyataan", 11)), tambah("setuju", emo("jempol", 110, 150, "👍", 30)), tambah("tidak", emo("jempol2", 190, 150, "👎", 30))),
    k("Pernyataan 1: saat liburan sekolah, selalu turun hujan. Kita tidak setuju, karena hujan tidak selalu turun saat liburan.", bersih(0), tambah(0, kartuPernyataan(1, ["Saat liburan sekolah,", "selalu turun hujan."])), tambah("hujan", emo("hujan", 80, 126, "🌧️", 34)), tambah("setuju", emo("silang", 250, 52, "❌", 22)), tambah("karena", emo("cerah", 210, 126, "☀️", 34), teks("kr", 150, 168, "hujan tidak selalu turun", 9, W.merah))),
    k("Pernyataan 2: saat melempar koin, lebih mudah mendapat sisi gambar daripada sisi angka. Kita tidak setuju, karena sisinya sama dan lemparannya acak, jadi kemungkinannya sama.", bersih(0), tambah(0, kartuPernyataan(2, ["Melempar koin: lebih mudah", "mendapat gambar daripada angka."])), tambah("gambar", bulat("kg", 100, 120, 24, "#FDE68A"), teks("kgt", 100, 126, "G", 18)), tambah("angka", bulat("ka", 200, 120, 24, "#E5E7EB"), teks("kat", 200, 126, "A", 18)), tambah("setuju", emo("silang", 250, 52, "❌", 22)), tambah("sama", teks("sama", 150, 124, "=", 26, W.hijau), teks("sm", 150, 168, "kemungkinannya sama", 9, W.hijau))),
    k("Pernyataan 3: aku tidak mungkin bertemu presiden Indonesia. Kita tidak setuju, karena ada kemungkinan bertemu, hanya saja kemungkinannya kecil.", bersih(0), tambah(0, kartuPernyataan(3, ["Aku tidak mungkin bertemu", "presiden Indonesia."])), tambah("presiden", emo("istana", 210, 122, "🏛️", 34)), tambah("bertemu@1", emo("anak", 80, 126, "🧒", 28)), tambah("setuju", emo("silang", 250, 52, "❌", 22)), tambah("kecil", garis("jalan", 100, 124, 80, 0, W.hijau, 3, { putus: true }), teks("kc", 150, 168, "mungkin, tetapi kecil", 9, W.hijau))),
    k("Pernyataan 4: setiap orang yang ikut undian pasti menang sekali seumur hidup. Kita tidak setuju, karena tidak ada jaminan. Pernyataan 5: besok matahari pasti terbit. Kita setuju, karena itu fenomena alam.", bersih(0), tambah(0, kartuPernyataan(4, ["Setiap peserta undian pasti", "menang sekali seumur hidup."])), tambah("undian", emo("tiket", 70, 120, "🎟️", 30)), tambah("setuju", emo("silang", 250, 52, "❌", 22)), tambah("jaminan", teks("jm", 70, 152, "tidak ada jaminan", 8.5, W.merah)), tambah("pernyataan@2", kotak("k5", 20, 126, 260, 38, W.putih, W.hijau, { rx: 8 }), teks("k5t", 34, 142, "Pernyataan 5: besok matahari pasti terbit.", 8, W.biru, { anchor: "start" }), emo("matahari", 240, 156, "☀️", 22)), tambah("setuju@2", emo("centang", 262, 146, "✅", 18)), tambah("fenomena", teks("fn", 150, 182, "fenomena alam: pasti terjadi", 9, W.hijau))),
    k(
      "Pelajaran penting: kata pasti, selalu, dan tidak pernah jarang benar-benar terjadi, kecuali fenomena alam. Kejadian sehari-hari hampir selalu mungkin, hanya peluangnya bisa sangat kecil.",
      bersih(0),
      tambah("pasti", kotak("w1", 20, 40, 70, 26, "#FECACA", W.biru, { rx: 13 }), teks("w1t", 55, 57, "pasti", 10)),
      tambah("selalu", kotak("w2", 115, 40, 70, 26, "#FECACA", W.biru, { rx: 13 }), teks("w2t", 150, 57, "selalu", 10)),
      tambah("pernah", kotak("w3", 210, 40, 70, 26, "#FECACA", W.biru, { rx: 13 }), teks("w3t", 245, 57, "tidak pernah", 8.5)),
      tambah("jarang", garis("c1", 14, 53, 82, 0, W.merah, 3, { gambar: true }), garis("c2", 109, 53, 82, 0, W.merah, 3, { gambar: true }), garis("c3", 204, 53, 82, 0, W.merah, 3, { gambar: true })),
      tambah("kecuali", emo("alam", 150, 112, "🌅", 30), teks("al", 150, 134, "kecuali fenomena alam", 8.5, W.hijau)),
      tambah("hampir", teks("hm", 150, 164, "kejadian sehari-hari hampir selalu mungkin", 8, W.biru)),
      tambah("kecil", teks("kc", 150, 180, "hanya peluangnya bisa sangat kecil", 8, W.merah)),
    ),
    k("Dalam kelompok, tiap anggota punya peran: ketua, juru tulis, juru waktu, dan juru bicara.", bersih(0), ...[["ketua", "⭐", "ketua"], ["tulis", "✏️", "juru tulis"], ["waktu", "⏱️", "juru waktu"], ["bicara", "📣", "juru bicara"]].map(([kunci, e, label], i) => tambah(kunci, kotak(`r${i}`, 12 + i * 72, 64, 66, 80, W.putih, W.ungu, { rx: 10 }), emo(`ri${i}`, 45 + i * 72, 108, e, 26), teks(`rl${i}`, 45 + i * 72, 132, label, 8)))),
  ],
};

/* ------------------------------ 5. Apa itu peluang? (hlm. 107) ------------------------------ */
const kartuMakanan = (id: string, x: number, y: number, e: string, nama: string, harga: string, asal: string) => [kotak(`${id}-k`, x, y, 88, 74, W.putih, W.biru, { rx: 8 }), emo(`${id}-e`, x + 44, y + 28, e, 26), teks(`${id}-n`, x + 44, y + 44, nama, 8), teks(`${id}-h`, x + 44, y + 55, harga, 7.5, W.merah), teks(`${id}-a`, x + 44, y + 66, asal, 6.2, W.ungu)];
const SK5 = skala("sk", 30, 52, 240);

export const ADEGAN_PELUANG: AdeganStory = {
  id: "apa-itu-peluang",
  judul: "Apa itu peluang?",
  sumber: "Buku Siswa hlm. 107",
  latar: "#E0F2FE",
  kutipan: ["Peluang adalah perhitungan tentang seberapa mungkin terjadinya suatu kejadian", "Tidak mungkin", "Sangat mungkin"],
  ketukan: [
    k("Setiap hari, sadar atau tidak, kita selalu membuat prediksi tentang apa yang akan terjadi.", tambah(0, emo("bola", 150, 96, "🔮", 46)), tambah("prediksi", teks("pr", 150, 150, "prediksi", 16, W.ungu)), tambah("terjadi", panah("p1", 150, 164, 0, 18, W.ungu, 3, { gambar: true }), teks("pq", 150, 198, "apa yang akan terjadi?", 9))),
    k("Contoh pertama: kamu memperkirakan apakah hari ini akan hujan, supaya bisa menyiapkan payung sebelum berangkat.", bersih(0), tambah("memperkirakan", emo("tanya", 52, 90, "🤔", 30)), tambah("hujan", emo("awan", 130, 70, "🌧️", 38)), tambah("payung", emo("payung", 200, 110, "☂️", 34)), tambah("berangkat", emo("tas", 252, 140, "🎒", 30), teks("tas-t", 252, 168, "berangkat", 8))),
    k("Contoh kedua: memperkirakan makanan yang paling digemari turis internasional. Misalnya rendang 30.000 rupiah dari Sumatra Barat, gudeg 25.000 rupiah dari Yogyakarta, dan papeda 30.000 rupiah dari Papua.", bersih(0), tambah(0, teks("jud", 150, 24, "Makanan khas favorit turis?", 10)), tambah("rendang", kartuMakanan("m1", 8, 40, "🍛", "RENDANG", "30.000", "Sumatra Barat")), tambah("gudeg", kartuMakanan("m2", 106, 40, "🍲", "GUDEG", "25.000", "Yogyakarta")), tambah("papeda", kartuMakanan("m3", 204, 40, "🥣", "PAPEDA", "30.000", "Papua"))),
    k("Ada juga ayam taliwang 25.000 rupiah dari Nusa Tenggara Barat, dan sop konro 25.000 rupiah dari Sulawesi Selatan. Mana yang paling digemari turis? Kita hanya bisa memperkirakan.", tambah("taliwang", kartuMakanan("m4", 56, 124, "🍗", "AYAM TALIWANG", "25.000", "Nusa Tenggara Barat")), tambah("konro", kartuMakanan("m5", 156, 124, "🍖", "SOP KONRO", "25.000", "Sulawesi Selatan")), tambah("paling", emo("q", 30, 170, "❓", 24))),
    k("Perkiraan yang kita lakukan setiap hari sebenarnya dapat dihitung secara matematis. Perhitungan perkiraan ini disebut peluang.", bersih(0), tambah("perkiraan", emo("ramal", 70, 90, "🔮", 40)), tambah("dihitung", panah("kal", 100, 90, 44, 0, W.biru, 4, { gambar: true }), emo("hitung", 180, 90, "🧮", 40)), tambah("disebut", teks("pel", 150, 170, "PELUANG", 28, W.biru, { garis: W.emas }))),
    k("Peluang adalah perhitungan tentang seberapa mungkin terjadinya suatu kejadian.", bersih(0), tambah(0, kotak("def", 20, 40, 260, 110, W.putih, W.emas, { rx: 14, tebal: 3 })), tambah("Peluang", teks("d1", 150, 70, "PELUANG", 22, W.biru)), tambah("perhitungan", teks("d2", 150, 94, "perhitungan tentang", 10)), tambah("seberapa", teks("d3", 150, 112, "seberapa mungkin", 12, W.merah)), tambah("kejadian", teks("d4", 150, 132, "terjadinya suatu kejadian", 10))),
    k(
      "Kejadian dikelompokkan ke dalam lima kategori. Tidak mungkin, kurang mungkin, mungkin, sangat mungkin, dan pasti.",
      bersih(0),
      tambah("lima", SK5.garisSkala),
      tambah(6, SK5.balonDi(0)),
      tambah(8, SK5.balonDi(1)),
      tambah(10, SK5.balonDi(2)),
      tambah(11, SK5.balonDi(3)),
      tambah(14, SK5.balonDi(4)),
    ),
    k("Kategori ini disusun dari kiri ke kanan seperti anak tangga. Makin ke kanan, makin mungkin terjadi.", tambah("tangga", ...[0, 1, 2, 3, 4].map((i) => kotak(`an${i}`, SK5.xs[i] - 14, 140 - i * 10, 28, 10 + i * 10, ["#FECACA", "#FED7AA", "#D9F99D", "#A5F3FC", "#BFDBFE"][i], W.biru, { rx: 2 }))), tambah("kanan@2", panah("arah", 40, 160, 220, 0, W.merah, 3, { gambar: true }), teks("mk", 150, 180, "makin ke kanan, makin mungkin", 9, W.merah))),
    k("Susunan kategori seperti ini disebut skala peluang. Skala peluang menolong kita menilai seberapa mungkin sesuatu terjadi.", tambah("disebut", teks("sp", 150, 28, "SKALA PELUANG", 18, W.biru, { garis: W.emas }), garis("sp-g", 70, 34, 160, 0, W.emas, 3, { gambar: true })), sorotkan("menolong", "sk-g"), tambah("menilai", emo("timbang", 150, 196, "⚖️", 16))),
  ],
};

/* ------------------------------ 6. Contoh skala peluang Dhien (hlm. 108) ------------------------------ */
const SK6 = skala("s6", 30, 28, 240);
const CONTOH = [
  { id: "c0", e: "🤔", warna: "#FECACA", baris: ["Saya tidak", "mungkin", "berkurang", "usianya", "tahun depan"] },
  { id: "c1", e: "📦", warna: "#FED7AA", baris: ["Kami", "sekeluarga", "pindah", "rumah"] },
  { id: "c2", e: "🌧️", warna: "#D9F99D", baris: ["Hujan di", "sekitar", "rumah", "Dhien"] },
  { id: "c3", e: "🍽️", warna: "#A5F3FC", baris: ["Kami makan", "malam", "bersama-", "sama"] },
  { id: "c4", e: "☀️", warna: "#BFDBFE", baris: ["Matahari", "terbit", "besok", "pagi"] },
];
const kartuContoh = (i: number) => {
  const c = CONTOH[i];
  const x = SK6.xs[i];
  return [garis(`${c.id}-h`, x, 56, 0, 30, W.biru, 2, { gambar: true, putus: true }), emo(`${c.id}-e`, x, 108, c.e, 26), kotak(`${c.id}-k`, x - 26, 118, 52, 66, c.warna, W.biru, { rx: 6 }), ...c.baris.map((b, j) => teks(`${c.id}-t${j}`, x, 130 + j * 10, b, 6.3))];
};

export const ADEGAN_CONTOH: AdeganStory = {
  id: "contoh-skala",
  judul: "Lima kejadian pada skala peluang Dhien",
  sumber: "Buku Siswa hlm. 108; Buku Panduan Guru hlm. 117–118",
  latar: "#FFF7CC",
  kutipan: ["Saya tidak mungkin berkurang usianya tahun depan", "Kami Sekeluarga pindah rumah", "Matahari terbit besok pagi"],
  ketukan: [
    k("Sekarang kita letakkan lima kejadian dari kehidupan Dhien pada skala peluang.", tambah(0, SK6.semua)),
    k("Pertama: saya tidak mungkin berkurang usianya tahun depan. Kejadian ini di ujung kiri, tidak mungkin.", tambah("saya", kartuContoh(0)), sorotkan("kiri", "s6-b0-k")),
    k("Kedua: kami sekeluarga pindah rumah. Peluangnya kecil, jadi kejadian ini kurang mungkin.", redamkan(0, "s6-b0-k"), tambah("sekeluarga", kartuContoh(1)), sorotkan("kurang", "s6-b1-k")),
    k("Ketiga: hujan di sekitar rumah Dhien. Bisa terjadi, bisa juga tidak, jadi kejadian ini mungkin.", redamkan(0, "s6-b1-k"), tambah("hujan", kartuContoh(2)), sorotkan("jadi", "s6-b2-k")),
    k("Keempat: kami makan malam bersama-sama. Biasanya terjadi, jadi kejadian ini sangat mungkin.", redamkan(0, "s6-b2-k"), tambah("makan", kartuContoh(3)), sorotkan("sangat", "s6-b3-k")),
    k("Kelima: matahari terbit besok pagi. Pasti terjadi, jadi kejadian ini ada di ujung kanan, yaitu pasti.", redamkan(0, "s6-b3-k"), tambah("matahari", kartuContoh(4)), sorotkan("kanan", "s6-b4-k")),
    k("Ujung kiri dan ujung kanan punya arti khusus. Ujung kiri berarti tidak mungkin sama sekali. Ujung kanan berarti pasti terjadi.", redamkan(0, "s6-b4-k"), sorotkan("kiri@2", "s6-b0-k", "c0-k"), redamkan("kanan@2", "s6-b0-k", "c0-k"), sorotkan("kanan@2", "s6-b4-k", "c4-k")),
    k(
      "Buku Panduan Guru menambahkan: kategori boleh ditambah atau dikurangi. Yang harus ada hanya titik pasti dan titik tidak mungkin di kedua ujung garis.",
      bersih(0),
      tambah(0, teks("jud", 150, 26, "Skala boleh lebih banyak atau lebih sedikit", 9.5, W.ungu), garis("gl", 30, 100, 240, 0, W.biru, 2.5, { gambar: true })),
      tambah("ditambah", ...[0, 1, 2, 3, 4, 5, 6].map((i) => garis(`tk${i}`, 30 + i * 40, 94, 0, 12, W.biru, 2))),
      tambah("dikurangi", teks("sdk", 150, 64, "bisa dikurangi menjadi tiga titik", 8.5)),
      hapus("dikurangi", "tk1", "tk2", "tk4", "tk5"),
      tambah("pasti", kotak("ujung-p", 232, 120, 52, 22, "#BFDBFE", W.biru, { rx: 6 }), teks("ujung-pt", 258, 135, "pasti", 8.5)),
      tambah("tidak", kotak("ujung-t", 16, 120, 64, 22, "#FECACA", W.biru, { rx: 6 }), teks("ujung-tt", 48, 135, "tidak mungkin", 7.5)),
      ubah("ujung", { id: "gl", tebal: 3 }),
    ),
  ],
};
