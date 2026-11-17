import type { AdeganStory } from "./logika-story";
import { E, KURANG, W, bulat, deret, deretEmo, emo, garis, judul, kalimatC, kartu, kotak, teks } from "./k1b3d-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k1b3d-bantu";
import { WARNA_METODE, kepala } from "./k1b3d-luar-1";

/* Video metode global Sub-Bab D: CUBES (Langkah CUBES), Draw a Picture (Gambar Sketsa), dan ringkasan. */

/* ------------------------------ 4. CUBES: konsep ------------------------------ */
const SUARA_C1 = "Metode kedua, CUBES, atau Langkah CUBES. Ada lima langkah untuk membaca cerita.";
const SUARA_C2 = "Lingkari bilangan, garis bawahi pertanyaan, lalu kotaki kata kuncinya.";
const SUARA_C3 = "Setelah itu pilih cara menghitung, kemudian selesaikan dan periksa.";
const SUARA_C4 = "Kata seperti dimakan, diberikan, dan pergi biasanya berarti berkurang.";

export const ADEGAN_LUAR_CUBES: AdeganStory = {
  id: "luar-cubes",
  judul: "CUBES: lima langkah membaca cerita",
  sumber: "Metode global: CUBES",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_C1, tambah("kedua,", ...kepala(1)), tambah("lima", teks("t5", 150, 72, "5 langkah", 14, W.ungu))),
    k(
      SUARA_C2,
      tambah("Lingkari", ...kartu("s1", 14, 88, 88, 26, W.putih, ["lingkari"], 10)),
      tambah("bawahi", ...kartu("s2", 106, 88, 88, 26, W.putih, ["garis bawahi"], 10)),
      tambah("kotaki", ...kartu("s3", 198, 88, 88, 26, W.putih, ["kotaki"], 10)),
    ),
    k(SUARA_C3, tambah("pilih", ...kartu("s4", 40, 122, 104, 26, W.putih, ["pilih cara"], 10)), tambah("periksa.", ...kartu("s5", 156, 122, 104, 26, W.putih, ["selesaikan"], 10))),
    k(SUARA_C4, tambah("dimakan,", ...kartu("w1", 14, 160, 88, 24, W.merahMuda, ["dimakan"], 10)), tambah("diberikan,", ...kartu("w2", 106, 160, 88, 24, W.merahMuda, ["diberikan"], 10)), tambah("pergi", ...kartu("w3", 198, 160, 88, 24, W.merahMuda, ["pergi"], 10))),
  ],
};

/* ------------------------------ 5. CUBES: terapan ------------------------------ */
const SUARA_D1 = "Ada tujuh rambutan di meja. Lima rambutan diberikan kepada Kaka. Berapa rambutan yang tinggal?";
const SUARA_D2 = "Lingkari tujuh dan lima. Garis bawahi pertanyaan berapa yang tinggal. Kotaki kata diberikan.";
const SUARA_D3 = "Kata diberikan berarti berkurang. Tujuh dikurangi lima sama dengan dua.";
const SUARA_D4 = "Periksa: dua ditambah lima sama dengan tujuh. Jadi, tinggal dua rambutan.";
const KARTU = [
  { id: "a7", x: 20, w: 34, isi: "7" },
  { id: "rb", x: 58, w: 88, isi: "rambutan," },
  { id: "a5", x: 150, w: 34, isi: "5" },
  { id: "db", x: 188, w: 96, isi: "diberikan" },
];

export const ADEGAN_LUAR_CUBES_TERAPAN: AdeganStory = {
  id: "luar-cubes-terapan",
  judul: "CUBES: rambutan di meja",
  sumber: "Metode global: CUBES, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_D1, tambah(0, ...kepala(1)), tambah("tujuh", ...deretEmo(E.rambutan, "rb", deret(7, 60, 30, 70), 20)), ubah("diberikan", ...[2, 3, 4, 5, 6].map((i) => ({ id: `rb${i}`, op: 0.3 }))), tambah("tinggal?", teks("tq", 150, 98, "berapa yang tinggal?", 10, W.merah))),
    k(
      SUARA_D2,
      bersih(0),
      tambah(0, ...kepala(1), ...KARTU.flatMap((c) => kartu(c.id, c.x, 62, c.w, 26, W.putih, [c.isi], 11))),
      tambah("Lingkari", bulat("l7", 37, 75, 18, "transparent", W.merah, { tebal: 2.4, z: 1 }), bulat("l5", 167, 75, 18, "transparent", W.merah, { tebal: 2.4, z: 1 })),
      tambah("bawahi", ...kartu("pt", 60, 104, 180, 24, W.putih, ["berapa yang tinggal?"], 10), garis("gb", 70, 130, 160, 0, W.ungu, 2.4)),
      tambah("Kotaki", kotak("kk", 184, 58, 104, 34, "transparent", W.hijau, { rx: 2, tebal: 3, z: 1 })),
    ),
    k(SUARA_D3, tambah("berkurang.", teks("tb", 150, 148, `diberikan: ${KURANG}`, 11, W.merah)), tambah("Tujuh", ...kalimatC("k1", 150, 172, ["7", KURANG, "5", "=", "2"], 16, 24))),
    k(SUARA_D4, tambah("ditambah", ...kalimatC("k2", 150, 196, ["2", "+", "5", "=", "7"], 14, 22)), sorotkan("rambutan.", "k14")),
  ],
};

/* ------------------------------ 6. Draw a Picture: konsep ------------------------------ */
const SUARA_F1 = "Metode ketiga, Draw a Picture, atau Gambar Sketsa. Gambar cerita dengan bentuk sederhana.";
const SUARA_F2 = "Gambar lingkaran untuk tiap benda. Lalu coret benda yang pergi.";
const SUARA_F3 = "Kalau berkurang dua kali, coret dua kali dengan warna berbeda.";
const SUARA_F4 = "Lingkaran yang tidak dicoret adalah sisanya.";
const L6 = deret(6, 50, 40, 100);
const coret = (id: string, x: number, y: number, warna: string) => garis(id, x - 10, y - 10, 20, 20, warna, 3);

export const ADEGAN_LUAR_SKETSA: AdeganStory = {
  id: "luar-sketsa",
  judul: "Draw a Picture: gambar sketsa",
  sumber: "Metode global: Draw a Picture",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_F1, tambah("ketiga,", ...kepala(2)), tambah("sederhana.", emo("ps", 150, 80, "\u{270F}\u{FE0F}", 30))),
    k(SUARA_F2, ubah(0, { id: "ps", x: 262, y: 64, u: 20 }), tambah("lingkaran", ...L6.map((p, i) => bulat(`o${i}`, p.x, p.y, 13, W.putih, W.biru, { tebal: 2 }))), tambah("coret", coret("c5", L6[5].x, L6[5].y, W.merah))),
    k(SUARA_F3, tambah("dua", coret("c4", L6[4].x, L6[4].y, W.merah)), tambah("berbeda.", coret("c3", L6[3].x, L6[3].y, W.biru))),
    k(SUARA_F4, sorotkan("tidak", "o0", "o1", "o2"), tambah("sisanya.", teks("ss", 90, 140, "sisa", 12, W.hijau))),
  ],
};

/* ------------------------------ 7. Draw a Picture: terapan ------------------------------ */
const SUARA_G1 = "Di halaman Nenek ada sepuluh ayam. Tiga ayam masuk kandang, lalu dua ayam pergi ke sawah.";
const SUARA_G2 = "Abang menggambar sepuluh lingkaran. Ia mencoret tiga dengan warna merah.";
const SUARA_G3 = "Lalu ia mencoret dua lagi dengan warna biru.";
const SUARA_G4 = "Yang tidak dicoret ada lima. Sepuluh dikurangi tiga, dikurangi dua, sama dengan lima.";
const L10 = Array.from({ length: 10 }, (_, i) => ({ x: 46 + (i % 5) * 52, y: 76 + Math.floor(i / 5) * 40 }));

export const ADEGAN_LUAR_SKETSA_TERAPAN: AdeganStory = {
  id: "luar-sketsa-terapan",
  judul: "Draw a Picture: ayam Nenek",
  sumber: "Metode global: Draw a Picture, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_G1, tambah(0, ...kepala(2)), tambah("sepuluh", ...L10.map((p, i) => emo(`ay${i}`, p.x, p.y, "\u{1F414}", 20))), tambah("kandang,", teks("tk", 70, 170, "masuk kandang 3", 9, W.merah)), tambah("sawah.", teks("ts", 230, 170, "ke sawah 2", 9, W.biru))),
    k(SUARA_G2, bersih(0), tambah(0, ...kepala(2)), tambah("lingkaran.", ...L10.map((p, i) => bulat(`o${i}`, p.x, p.y, 13, W.putih, W.biru, { tebal: 2 }))), tambah("merah.", ...[9, 8, 7].map((i) => coret(`cm${i}`, L10[i].x, L10[i].y, W.merah)))),
    k(SUARA_G3, tambah("biru.", ...[6, 5].map((i) => coret(`cb${i}`, L10[i].x, L10[i].y, W.biru)))),
    k(SUARA_G4, sorotkan("lima.", "o0", "o1", "o2", "o3", "o4"), tambah("dikurangi", ...kalimatC("kl", 150, 170, ["10", KURANG, "3", KURANG, "2", "=", "5"], 16, 26))),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_Z1 = "Kita sudah melihat tiga metode global untuk cerita hitungan pengurangan.";
const SUARA_Z2 = "Bar Model: gambar batang, lalu cari bagian yang bertanda tanya.";
const SUARA_Z3 = "CUBES: lingkari bilangan, garis bawahi pertanyaan, kotaki kata kunci, lalu selesaikan dan periksa.";
const SUARA_Z4 = "Draw a Picture: gambar lingkaran, coret yang pergi, lalu hitung yang tersisa.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode global",
  sumber: "Ringkasan metode global",
  latar: "#FEF9C3",
  ketukan: [
    k(SUARA_Z1, tambah(0, judul("Ringkasan")), tambah("tiga", emo("rk", 150, 96, E.bintang, 44)), tambah("pengurangan.", ...kartu("rt", 60, 124, 180, 26, W.emas, ["3 metode global"], 10))),
    k(SUARA_Z2, bersih(0), tambah(0, judul("Ringkasan")), tambah("Bar", ...kartu("r0", 14, 34, 272, 44, WARNA_METODE[0], ["Bar Model", "batang, cari bagian bertanda tanya"], 9.4))),
    k(SUARA_Z3, tambah("CUBES:", ...kartu("r1", 14, 86, 272, 44, WARNA_METODE[1], ["CUBES", "lingkari, garis bawahi, kotaki, periksa"], 9.4))),
    k(SUARA_Z4, tambah("Draw", ...kartu("r2", 14, 138, 272, 44, WARNA_METODE[2], ["Draw a Picture", "gambar, coret yang pergi, hitung"], 9.4))),
  ],
};
