import type { AdeganStory } from "./logika-story";
import { W, bibit, cemara, deret, emo, garis, kotak, panah, pucukMerah, tabel, teks } from "./k6b2a-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k6b2a-bantu";

/* ------------------------------ 4. Eksplorasi 2.1 Membeli Bibit Pohon (hlm. 50 dan 51) ------------------------------ */
/** Satu paket bibit: latar, deret bibit, nama, jumlah, dan harga. Id latar: `${id}-bg`. */
const paket = (id: string, x0: number, huruf: string, n: number, harga: string, xBibit: number[]) => [
  kotak(`${id}-bg`, x0, 52, 110, 124, "#FFEDD5", W.coklat, { rx: 8 }),
  teks(`${id}-h`, x0 + 55, 72, `Paket ${huruf}`, 12, W.coklat),
  ...xBibit.flatMap((x, i) => bibit(`${id}b${i}`, x, 128)),
  teks(`${id}-n`, x0 + 55, 150, `${n} bibit`, 9),
  teks(`${id}-p`, x0 + 55, 168, harga, 10, W.merah),
];

export const ADEGAN_EKSPLORASI21: AdeganStory = {
  id: "eksplorasi21-paket",
  judul: "Eksplorasi 2.1 Membeli Bibit Pohon",
  sumber: "Buku Siswa hlm. 50–51 dan Buku Panduan Guru",
  latar: "#FFFBEB",
  kutipan: [
    "Jika terdapat dua paket bibit pohon dengan harga yang berbeda",
    "Artus, ketua kelas 6B, pergi ke toko untuk membeli bibit pohon yang akan ditanam di sekolah",
    "Paket mana yang memiliki jumlah bibit lebih banyak",
    "Paket mana yang harganya lebih murah",
    "paket bibit pohon mana yang sebaiknya dibeli oleh Artus",
    "dibutuhkan kemampuan dalam menerapkan operasi hitung perkalian dan pembagian",
    "berapa harga satu bibit pada kedua paket bibit pohon pada Gambar 2.4",
  ],
  ketukan: [
    k(
      "Sekolah Dasar Mentari akan menanam bibit pohon bersama. Siswa diminta membeli bibit dan membawanya ke sekolah.",
      tambah(0, teks("jud", 150, 24, "Eksplorasi 2.1 Membeli Bibit Pohon", 11, W.ungu)),
      tambah("Sekolah", emo("sk", 60, 100, "🏫", 36)),
      tambah("bibit", deret("bb", 130, 110, 3, 24, (id, x, y) => bibit(id, x, y))),
      tambah("membeli", emo("kr", 240, 110, "🛒", 34)),
      tambah("sekolah@2", panah("ps", 210, 150, -140, 0, W.hijau, 2.5, { gambar: true })),
    ),
    k(
      "Artus, ketua kelas enam B, pergi ke toko. Di sana ada dua paket bibit. Paket A berisi 4 bibit seharga lima puluh ribu rupiah, dan paket B berisi 3 bibit seharga empat puluh ribu rupiah.",
      bersih(0),
      tambah("Artus", emo("ar", 150, 36, "👦", 24), teks("art", 190, 32, "Artus, kelas 6B", 8)),
      tambah("paket", paket("pA", 20, "A", 4, "", [42, 62, 82, 102]), paket("pB", 170, "B", 3, "", [205, 225, 245])),
      tambah("lima", teks("pAh", 75, 190, "Rp50.000", 11, W.merah)),
      tambah("empat", teks("pBh", 225, 190, "Rp40.000", 11, W.merah)),
    ),
    k(
      "Pertanyaan a, paket mana yang jumlah bibitnya lebih banyak? Paket A, karena 4 bibit lebih banyak dari 3 bibit.",
      tambah("Pertanyaan", teks("qa", 150, 46, "a. jumlah bibit lebih banyak?", 9, W.ungu, { op: 1 })),
      sorotkan("Paket@2", "pA-bg"),
      tambah("karena", teks("ka", 8, 203, "4 bibit lebih banyak dari 3", 7.6, W.hijau, { anchor: "start" })),
    ),
    k(
      "Pertanyaan b, paket mana yang harganya lebih murah? Paket B, karena empat puluh ribu rupiah lebih murah dari lima puluh ribu rupiah.",
      hapus(0, "qa", "ka"),
      redamkan(0, "pA-bg"),
      tambah("Pertanyaan", teks("qb", 150, 46, "b. harga lebih murah?", 9, W.ungu)),
      sorotkan("Paket@2", "pB-bg"),
      tambah("empat", teks("kb", 8, 203, "Rp40.000 lebih murah", 7.6, W.hijau, { anchor: "start" })),
    ),
    k(
      "Pertanyaan c, paket mana yang sebaiknya dibeli Artus? Kalau hanya membandingkan bilangan banyak bibit dan harga, kita bisa salah memilih.",
      hapus(0, "qb", "kb"),
      redamkan(0, "pB-bg"),
      tambah("Pertanyaan", teks("qc", 150, 46, "c. sebaiknya beli yang mana?", 9, W.ungu)),
      ubah("membandingkan", { id: "pAh", isi: "4 bibit, Rp50.000?", u: 9 }, { id: "pBh", isi: "3 bibit, Rp40.000?", u: 9 }),
      tambah("salah", emo("sl", 150, 120, "⚠", 28)),
    ),
    k(
      "Buku mengajak kita mencari harga satu bibit di setiap paket, memakai perkalian dan pembagian.",
      bersih(0),
      tambah(0, teks("hj", 150, 34, "harga 1 bibit di tiap paket?", 12, W.ungu)),
      tambah("harga", kotak("hk", 60, 60, 180, 50, W.krem, W.biru, { rx: 10 }), teks("ht", 150, 92, "harga paket : jumlah bibit", 11)),
      tambah("perkalian", teks("hx", 100, 150, "kali", 16, W.merah), emo("hxe", 100, 178, "✖", 18)),
      tambah("pembagian", teks("hb", 200, 150, "bagi", 16, W.hijau), emo("hbe", 200, 178, "➗", 18)),
    ),
    k(
      "Paket A: lima puluh ribu dibagi 4, hasilnya dua belas ribu lima ratus rupiah. Paket B: empat puluh ribu dibagi 3, kira-kira tiga belas ribu tiga ratus tiga puluh tiga rupiah.",
      bersih(0),
      tambah("Paket", kotak("ca", 14, 30, 272, 70, "#DCFCE7", W.hijau, { rx: 8 }), teks("cat", 150, 52, "Paket A", 10, W.hijau)),
      tambah("dibagi", teks("cb", 150, 78, "50.000 : 4", 16, W.biru)),
      tambah("hasilnya", teks("cc", 150, 94, "= Rp12.500 per bibit", 10, W.hijau)),
      tambah("Paket@2", kotak("da", 14, 110, 272, 76, "#FEE2E2", W.merah, { rx: 8 }), teks("dat", 150, 132, "Paket B", 10, W.merah)),
      tambah("dibagi@2", teks("db", 150, 158, "40.000 : 3", 16, W.biru)),
      tambah("kira-kira", teks("dc", 150, 176, "≈ Rp13.333 per bibit", 10, W.merah)),
    ),
    k(
      "Jadi paket A lebih murah per bibit, sehingga paket A yang sebaiknya dibeli Artus. Panduan Guru mengingatkan, jangan hanya membandingkan bilangan secara langsung.",
      bersih(0),
      tambah("Jadi", teks("v1", 80, 60, "A: 12.500", 14, W.hijau), teks("v2", 220, 60, "B: 13.333", 14, W.merah), teks("v3", 150, 100, "12.500 lebih kecil", 12, W.hijau)),
      tambah("sebaiknya", emo("vok", 150, 148, "✅", 34), teks("v4", 150, 172, "beli paket A", 11, W.hijau)),
      tambah("Panduan", teks("v5", 150, 194, "jangan hanya banding bilangan langsung", 8, W.coklat)),
    ),
  ],
};

/* ------------------------------ 5. Eksplorasi 2.2 Menanam Pohon di Kebun Sekolah (hlm. 52 dan 53) ------------------------------ */
const PM = [30, 55, 80, 105];
const CM = [160, 182, 204, 226, 248, 270];
const pm = (i: number) => pucukMerah(`pm${i}`, PM[i], 150);
const cm = (i: number) => cemara(`cm${i}`, CM[i], 150);

export const ADEGAN_EKSPLORASI22: AdeganStory = {
  id: "eksplorasi22-kebun",
  judul: "Eksplorasi 2.2 Menanam Pohon di Kebun Sekolah",
  sumber: "Buku Siswa hlm. 52–53 dan Buku Panduan Guru",
  latar: "#F0FDF4",
  kutipan: [
    "untuk setiap dua pohon pucuk merah, terdapat tiga pohon cemara",
    "Perbandingan dua besaran disebut rasio",
    "Rasio dapat dinyatakan dengan beberapa cara",
    "Keduanya dibaca rasio a terhadap b",
    "Pada besaran yang sama, rasio dituliskan tidak menggunakan satuan",
    "Rasio jumlah pohon pucuk merah dan cemara adalah 4 : 6",
    "memiliki arti bahwa setiap 4 pohon pucuk merah terdapat 6 pohon cemara",
    "Maka bentuk paling sederhana dari rasio 4 : 6 adalah 2 : 3",
    "Rasio a : b akan berbeda artinya dengan b : a",
    "Jika lahan diperluas dan akan ditanam pohon pucuk merah sebanyak 14 pohon, berapa pohon cemara yang ditanam",
  ],
  ketukan: [
    k(
      "Guru mengajak siswa menanam pohon di kebun sekolah. Di sisi sebelah kiri kebun ditanam pucuk merah, dan di sisi kanan ditanam cemara.",
      tambah(0, teks("jud", 150, 24, "Eksplorasi 2.2 Kebun Sekolah", 12, W.ungu), kotak("tanah", 0, 152, 300, 22, "#A16207", "#78350F", { rx: 0 })),
      tambah("kiri", pm(3), teks("lk", 68, 190, "kiri: pucuk merah", 8.6, W.merah)),
      tambah("kanan", cm(0), teks("lr", 225, 190, "kanan: cemara", 8.6, W.hijau)),
    ),
    k(
      "Pucuk merah tumbuh besar dan butuh lahan lebih luas. Prinsipnya, untuk setiap 2 pohon pucuk merah, terdapat 3 pohon cemara.",
      sorotkan("besar", "pm3-m"),
      redamkan("setiap", "pm3-m"),
      tambah("2", pm(2), teks("n2", 92, 112, "2", 20, W.merah)),
      tambah("3", cm(1), cm(2), teks("n3", 182, 112, "3", 20, W.hijau)),
    ),
    k(
      "Pertanyaan a, jenis pohon apa yang lebih banyak ditanam? Pada gambar buku, pohon cemara lebih banyak.",
      hapus(0, "n2", "n3"),
      tambah("gambar", pm(0), pm(1)),
      tambah("cemara", cm(3), cm(4), cm(5)),
      sorotkan("banyak@2", "cm0-c", "cm1-c", "cm2-c", "cm3-c", "cm4-c", "cm5-c"),
    ),
    k(
      "Banyak pucuk merah ada 4, dan banyak cemara ada 6. Hitung satu per satu.",
      redamkan(0, "cm0-c", "cm1-c", "cm2-c", "cm3-c", "cm4-c", "cm5-c"),
      tambah("pucuk", teks("c4", 68, 112, "4", 30, W.merah)),
      tambah("cemara", teks("c6", 220, 112, "6", 30, W.hijau)),
    ),
    k(
      "Perbandingan dua besaran disebut rasio. Rasio pucuk merah dan cemara adalah 4 banding 6, ditulis 4 titik dua 6.",
      hapus(0, "c4", "c6"),
      tambah("rasio.", teks("r1", 150, 44, "rasio", 11, W.ungu)),
      tambah("banding", teks("r46", 110, 82, "4 : 6", 22, W.biru)),
    ),
    k(
      "Rasio 4 banding 6 berarti setiap 4 pucuk merah ada 6 cemara. Bentuk paling sederhana diperoleh dengan membagi keduanya dengan 2, yaitu 2 banding 3.",
      hapus(0, "lk", "lr"),
      tambah("berarti", teks("bt", 150, 190, "setiap 4 pucuk merah ada 6 cemara", 8.4, W.biru)),
      tambah("membagi", teks("bg", 150, 58, "dibagi 2", 9, W.merah)),
      tambah("yaitu", teks("r23", 205, 82, "= 2 : 3", 22, W.hijau)),
    ),
    k(
      "Rasio cemara terhadap pucuk merah adalah 6 banding 4, atau 3 banding 2. Rasio a banding b berbeda artinya dengan b banding a.",
      hapus(0, "r46", "r23", "bg", "bt", "r1"),
      tambah("cemara", teks("c7a", 150, 44, "cemara terhadap pucuk merah", 9, W.ungu)),
      tambah("6", teks("c7b", 100, 82, "6 : 4", 22, W.biru)),
      tambah("3", teks("c7c", 200, 82, "= 3 : 2", 22, W.hijau)),
      tambah("berbeda", teks("c7d", 150, 116, "a : b tidak sama dengan b : a", 9, W.merah)),
    ),
    k(
      "Rasio dapat ditulis dengan titik dua, atau sebagai pecahan a per b. Keduanya dibaca rasio a terhadap b, dan untuk besaran sejenis tidak memakai satuan.",
      hapus(0, "c7a", "c7b", "c7c", "c7d"),
      tambah("titik", teks("w1", 80, 70, "a : b", 22, W.biru)),
      tambah("pecahan", teks("w2", 200, 62, "a", 20, W.biru), garis("w3", 186, 68, 28, 0, W.biru, 2), teks("w4", 200, 90, "b", 20, W.biru)),
      tambah("Keduanya", teks("w5", 150, 116, "dibaca: a terhadap b", 10, W.hijau)),
      tambah("satuan.", teks("w6", 150, 40, "besaran sejenis: tanpa satuan", 9, W.ungu)),
    ),
    k(
      "Ayo bekerja sama. Jika lahan diperluas dan ditanam 14 pucuk merah, berapa cemara? Dua pucuk selalu bersama tiga cemara, jadi 14 dibagi 2, dikali 3, yaitu 21 cemara.",
      bersih(0),
      tambah("Jika", tabel("tb", 70, 40, 80, [["pucuk merah", "cemara"], ["2", "3"], ["14", "?"]], 9)),
      tambah("dibagi", teks("t7", 150, 140, "14 : 2 = 7 kelompok", 10, W.merah)),
      tambah("dikali", teks("t8", 150, 160, "7 x 3 = 21", 12, W.hijau)),
      ubah("21", { id: "tb-t21", isi: "21", warna: W.hijau }),
    ),
    k(
      "Kita simpulkan, jika pucuk merah bertambah 2, cemara bertambah 3. Jika cemara diketahui, bagi dengan 3 lalu kalikan 2.",
      bersih(0),
      tambah(0, teks("s0", 150, 28, "hubungan pucuk merah dan cemara", 10, W.ungu)),
      tambah("bertambah", teks("s1", 150, 62, "pucuk +2  →  cemara +3", 13, W.merah)),
      tambah("cemara@2", kotak("s2", 40, 90, 220, 56, W.krem, W.biru, { rx: 10 })),
      tambah("bagi", teks("s3", 150, 124, "cemara : 3 x 2 = pucuk", 12, W.hijau)),
      tambah("kalikan", ...deret("sp", 90, 180, 2, 30, (id, x, y) => pucukMerah(id, x, y)), ...deret("sc", 180, 180, 3, 26, (id, x, y) => cemara(id, x, y))),
    ),
  ],
};
