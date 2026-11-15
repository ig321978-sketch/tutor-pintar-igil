import type { AdeganStory } from "./logika-story";
import { KUE, MEJA_X, W, WB, bentuk, cocok, emo, judul, kartu, keranjang, nampan, panel, pindah, teks, tidakCocok } from "./k1b4b-gambar";
import { bersih, hapus, hitungAksi, idx, k, redamkan, sorotkan, tambah, ubah } from "./k1b4b-bantu";

const S = 11;

/* ------------------------------ 1. Kue menurut warna ------------------------------ */
const SUARA_W1 = "Sekarang Wei dan Tika mengelompokkan kue yang sama. Tetapi aturannya lain, yaitu warna.";
const SUARA_W2 = "Nampan pertama untuk warna cokelat. Ada kue cucur, kue risol, dan bolu cokelat. Seret ketiganya ke nampan pertama.";
const SUARA_W3 = "Nampan kedua untuk warna hijau. Ada kue talam, kue lapis, dan kue lupis. Seret ketiganya ke nampan kedua.";
const SUARA_W4 = "Hitung anggota kelompok cokelat. Satu, dua, tiga. Ada tiga kue cokelat.";
const SUARA_W5 = "Hitung anggota kelompok hijau. Satu, dua, tiga. Ada tiga kue hijau.";
const SUARA_W6 = "Kue yang sama, tetapi aturannya berbeda. Hasilnya dua nampan, bukan tiga nampan.";

/** Nomor kue (dalam KUE) menurut warna: cokelat `kc0..2` = cucur, risol, bolu; hijau `kh0..2` = talam, lapis, lupis. */
const ID_W: Record<number, string> = { 0: "kc0", 2: "kc1", 5: "kc2", 1: "kh0", 4: "kh1", 3: "kh2" };
const NXW = [10, 154];
const SLOT_W = (n: number, j: number) => ({ x: NXW[n] + 28 + j * 40, y: 142 });
const GESER_W = (g: number, n: number, j: number) => {
  const p = SLOT_W(n, j);
  return [pindah(KUE[g].bentuk, ID_W[g], p.x, p.y, S), { id: `wm${g}`, x: p.x, y: 166 }];
};
const KUE_W = () => KUE.map((q, g) => bentuk(q.bentuk, ID_W[g], MEJA_X(g), 50, S, WB[q.warna]));
const NAMA_W = () => KUE.map((q, g) => teks(`wm${g}`, MEJA_X(g), 72, q.nama, 7.6, W.coklat));
const NAMPAN_W = () => [0, 1].flatMap((n) => nampan(`wp${n}`, NXW[n], 100, 136, 84, "?", W.krem));
const NAMA_ID_W = [0, 1, 2, 3, 4, 5].map((g) => `wm${g}`);

export const ADEGAN_WARNA: AdeganStory = {
  id: "warna",
  judul: "Kue menurut warna",
  sumber: "Materi: mengelompokkan menurut warna",
  latar: "#FEF3C7",
  ketukan: [
    k(SUARA_W1, tambah(0, judul("Kue menurut warna")), tambah("kue", ...KUE_W(), ...NAMA_W()), tambah("aturannya", ...NAMPAN_W())),
    k(
      SUARA_W2,
      ubah("cokelat.", { id: "wp0-t", isi: "cokelat" }),
      sorotkan("cucur,", "kc0"),
      sorotkan("risol,", "kc1"),
      sorotkan("bolu", "kc2"),
      redamkan("Seret", "kc0", "kc1", "kc2"),
      ubah("Seret", ...GESER_W(0, 0, 0), ...GESER_W(2, 0, 1), ...GESER_W(5, 0, 2)),
    ),
    k(
      SUARA_W3,
      ubah("hijau.", { id: "wp1-t", isi: "hijau" }),
      sorotkan("talam,", "kh0"),
      sorotkan("lapis,", "kh1"),
      sorotkan("lupis.", "kh2"),
      redamkan("Seret", "kh0", "kh1", "kh2"),
      ubah("Seret", ...GESER_W(1, 1, 0), ...GESER_W(4, 1, 1), ...GESER_W(3, 1, 2)),
    ),
    k(SUARA_W4, hapus(0, ...NAMA_ID_W), ...hitungAksi(SUARA_W4, "kc", [0, 1, 2].map((j) => SLOT_W(0, j)), "cokelat.")),
    k(SUARA_W5, hapus(0, "kcn0", "kcn1", "kcn2"), ...hitungAksi(SUARA_W5, "kh", [0, 1, 2].map((j) => SLOT_W(1, j)), "hijau.", true)),
    k(
      SUARA_W6,
      hapus(0, "tg", "khn0", "khn1", "khn2"),
      tambah("dua", teks("w2", 150, 54, "warna: 2 nampan", 14, W.ungu)),
      tambah("tiga", teks("w3", 150, 80, "bentuk: 3 nampan", 14, W.merah)),
    ),
  ],
};

/* ------------------------------ 2. Ganti aturan, ganti kelompok ------------------------------ */
const SUARA_G1 = "Perhatikan kue talam. Menurut bentuk, kue talam masuk kelompok lengkung.";
const SUARA_G2 = "Menurut warna, kue talam masuk kelompok hijau.";
const SUARA_G3 = "Kue yang sama bisa masuk kelompok yang berbeda, kalau aturannya berbeda.";
const SUARA_G4 = "Jadi tidak ada kelompok yang salah. Asal semua anggotanya cocok dengan aturannya.";
const SUARA_G5 = "Sekarang coba ganti aturan. Ketuk bentuk atau warna, lalu lihat nampannya berubah.";

export const ADEGAN_GANTI: AdeganStory = {
  id: "ganti",
  judul: "Ganti aturan, ganti kelompok",
  sumber: "Materi: aturan berganti, kelompok berganti",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Satu kue, dua aturan"), bentuk("lengkung", "gt", 150, 62, 22, WB.hijau), teks("gtn", 150, 104, "kue talam", 9, W.coklat)),
      tambah("bentuk,", ...kartu("gl", 14, 126, 130, 56, W.langit, ["menurut bentuk", "kelompok lengkung"], 9.6)),
    ),
    k(SUARA_G2, tambah("warna,", ...kartu("gr", 156, 126, 130, 56, W.hijauMuda, ["menurut warna", "kelompok hijau"], 9.6))),
    k(SUARA_G3, sorotkan("sama", "gl-k", "gr-k"), tambah("berbeda,", teks("gs", 150, 114, "kue sama, aturan beda", 9.6, W.ungu))),
    k(
      SUARA_G4,
      bersih(0),
      tambah(0, judul("Tidak ada yang salah"), emo("ow", 150, 76, "\u{1F989}", 44)),
      tambah("Asal", ...kartu("gz", 40, 112, 220, 34, W.emas, ["semua anggota cocok"], 11)),
      tambah("cocok", cocok("gy", 150, 176, 22)),
    ),
    k(
      SUARA_G5,
      bersih(0),
      tambah(0, judul("Ganti aturanmu")),
      tambah("bentuk", ...kartu("b1", 30, 44, 110, 44, W.langit, ["bentuk"], 13), emo("tg", 85, 112, "\u{1F446}", 26)),
      tambah("warna,", ...kartu("b2", 160, 44, 110, 44, W.hijauMuda, ["warna"], 13)),
      ubah("warna,", { id: "tg", x: 215 }),
      tambah("berubah.", ...kartu("b3", 40, 132, 220, 34, W.krem, ["aturan baru, nampan baru"], 10.5)),
    ),
  ],
};

/* ------------------------------ 3. Buah besar dan kecil ------------------------------ */
const SUARA_F1 = "Malosi dan Halim melihat buah di meja. Ada semangka, melon, anggur, stroberi, ceri, dan jeruk.";
const SUARA_F2 = "Selain bentuk dan warna, benda juga bisa dikelompokkan menurut ukuran. Ada yang besar, ada yang kecil.";
const SUARA_F3 = "Semangka dan melon ukurannya besar. Seret keduanya ke keranjang besar.";
const SUARA_F4 = "Anggur, stroberi, ceri, dan jeruk ukurannya kecil. Seret keempatnya ke keranjang kecil.";
const SUARA_F5 = "Hitung anggota keranjang kecil. Satu, dua, tiga, empat. Ada empat buah kecil.";
const SUARA_F6 = "Besar atau kecil dilihat dengan membandingkan. Anggur kecil kalau berdekatan dengan melon.";
/** Buah berupa emoji: pusat (cx, cy), ukuran `u`; baris dasar teks = cy + 0.35 u. */
const BUAH: { id: string; e: string; x: number; besar: boolean }[] = [
  { id: "bb0", e: "\u{1F349}", x: 30, besar: true },
  { id: "bb1", e: "\u{1F348}", x: 78, besar: true },
  { id: "bk0", e: "\u{1F347}", x: 126, besar: false },
  { id: "bk1", e: "\u{1F353}", x: 174, besar: false },
  { id: "bk2", e: "\u{1F352}", x: 222, besar: false },
  { id: "bk3", e: "\u{1F34A}", x: 270, besar: false },
];
const BU = (b: { besar: boolean }) => (b.besar ? 32 : 18);
const buahObj = (b: (typeof BUAH)[number]) => emo(b.id, b.x, 60 + BU(b) * 0.35, b.e, BU(b));
const TUJU_KECIL = [170, 204, 238, 272];
const GESER_BUAH = (b: (typeof BUAH)[number], x: number, yb: number) => ({ id: b.id, x, y: yb });
const KECIL_PTS = TUJU_KECIL.map((x) => ({ x, y: 130 }));

export const ADEGAN_BESAR: AdeganStory = {
  id: "besar-kecil",
  judul: "Buah besar dan buah kecil",
  sumber: "Materi: mengelompokkan menurut ukuran",
  latar: "#ECFCCB",
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, judul("Buah di meja")),
      ...["semangka,", "melon,", "anggur,", "stroberi,", "ceri,", "jeruk."].map((t, i) => tambah(t, buahObj(BUAH[i]))),
    ),
    k(
      SUARA_F2,
      sorotkan("ukuran.", "bb0", "bb1"),
      tambah("besar,", teks("ub1", 54, 100, "besar", 10, W.merah)),
      redamkan("kecil.", "bb0", "bb1"),
      sorotkan("kecil.", "bk0", "bk1", "bk2", "bk3"),
      tambah("kecil.", teks("ub2", 198, 100, "kecil", 10, W.hijau)),
    ),
    k(
      SUARA_F3,
      redamkan(0, "bk0", "bk1", "bk2", "bk3"),
      tambah("ukurannya", ...keranjang("kb", 18, 120, 104, 44), ...keranjang("kk", 150, 120, 136, 44), teks("kbt", 70, 190, "besar", 9.6, W.coklat), teks("kkt", 218, 190, "kecil", 9.6, W.coklat)),
      hapus("Seret", "ub1"),
      ubah("Seret", GESER_BUAH(BUAH[0], 50, 158), GESER_BUAH(BUAH[1], 92, 158)),
    ),
    k(
      SUARA_F4,
      hapus(0, "ub2"),
      ...["Anggur,", "stroberi,", "ceri,", "jeruk"].map((t, i) => sorotkan(t, BUAH[i + 2].id)),
      redamkan("Seret", ...BUAH.slice(2).map((b) => b.id)),
      ubah("Seret", ...BUAH.slice(2).map((b, i) => GESER_BUAH(b, TUJU_KECIL[i], 150))),
    ),
    k(SUARA_F5, ...hitungAksi(SUARA_F5, "bk", KECIL_PTS, "kecil.")),
    k(
      SUARA_F6,
      bersih(0),
      tambah(0, judul("Membandingkan")),
      tambah("Besar", emo("fm", 100, 100 + 36 * 0.35, "\u{1F348}", 36), teks("fmt", 100, 140, "melon", 10, W.coklat)),
      tambah("Anggur", emo("fa", 200, 100 + 20 * 0.35, "\u{1F347}", 20), teks("fat", 200, 140, "anggur", 10, W.coklat)),
      tambah(idx(SUARA_F6, "berdekatan"), ...kartu("fb", 40, 156, 220, 30, W.krem, ["kecil atau besar: dibandingkan"], 10)),
    ),
  ],
};

/* ------------------------------ 4. Kotak mainan Tika: tiga ciri ------------------------------ */
const SUARA_K1 = "Tika punya kotak mainan. Isinya bola merah yang besar, kotak hadiah biru, topi pesta hijau, dan bola kuning yang kecil.";
const SUARA_K2 = "Setiap benda punya tiga ciri. Bentuk, warna, dan ukuran. Bola merah itu bulat, merah, dan besar.";
const SUARA_K3 = "Kita pilih satu ciri saja untuk jadi aturan. Misalnya aturannya bentuk bulat.";
const SUARA_K4 = "Periksa tiap benda. Bola merah bulat, cocok. Kotak hadiah tidak bulat, tidak cocok.";
const SUARA_K5 = "Topi pesta tidak bulat, tidak cocok. Bola kuning bulat, cocok.";
const SUARA_K6 = "Jadi kelompok bulat punya dua anggota, yaitu bola merah dan bola kuning. Seret kedua bola itu ke nampan bulat.";
const MX = [45, 115, 185, 255];
const MAINAN = () => [
  bentuk("lengkung", "m0", MX[0], 70, 16, WB.merah),
  bentuk("segiempat", "m1", MX[1], 70, 13, WB.biru),
  bentuk("segitiga", "m2", MX[2], 70, 13, WB.hijau),
  bentuk("lengkung", "m3", MX[3], 70, 9, WB.kuning),
];
const NAMA_MAINAN = ["bola merah", "kotak hadiah", "topi pesta", "bola kuning"];

export const ADEGAN_MAINAN: AdeganStory = {
  id: "mainan",
  judul: "Kotak mainan Tika",
  sumber: "Materi: tiga ciri dan satu aturan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Kotak mainan Tika")),
      tambah("merah", MAINAN()[0], teks("tk0", MX[0], 100, NAMA_MAINAN[0], 8, W.coklat)),
      tambah("biru,", MAINAN()[1], teks("tk1", MX[1], 100, NAMA_MAINAN[1], 8, W.coklat)),
      tambah("hijau,", MAINAN()[2], teks("tk2", MX[2], 100, NAMA_MAINAN[2], 8, W.coklat)),
      tambah("kuning", MAINAN()[3], teks("tk3", MX[3], 100, NAMA_MAINAN[3], 8, W.coklat)),
    ),
    k(
      SUARA_K2,
      sorotkan("Bola", "m0"),
      tambah("bulat,", ...kartu("q1", 14, 130, 86, 26, W.langit, ["bentuk: bulat"], 9)),
      tambah(idx(SUARA_K2, "merah", 2), ...kartu("q2", 107, 130, 86, 26, W.hijauMuda, ["warna: merah"], 9)),
      tambah("besar.", ...kartu("q3", 200, 130, 86, 26, W.pink, ["ukuran: besar"], 9)),
    ),
    k(
      SUARA_K3,
      redamkan(0, "m0"),
      hapus(0, "q1-k", "q1-t0", "q2-k", "q2-t0", "q3-k", "q3-t0"),
      tambah("Misalnya", ...kartu("q4", 50, 130, 200, 30, W.emas, ["aturan: bentuk bulat"], 11)),
    ),
    k(
      SUARA_K4,
      sorotkan("Bola", "m0"),
      tambah("cocok.", cocok("md0", MX[0], 40)),
      redamkan("Kotak", "m0"),
      sorotkan("Kotak", "m1"),
      tambah(idx(SUARA_K4, "cocok", 2), tidakCocok("md1", MX[1], 44)),
    ),
    k(
      SUARA_K5,
      redamkan(0, "m1"),
      sorotkan("Topi", "m2"),
      tambah("cocok.", tidakCocok("md2", MX[2], 44)),
      redamkan(idx(SUARA_K5, "Bola"), "m2"),
      sorotkan("Bola", "m3"),
      tambah(idx(SUARA_K5, "cocok", 2), cocok("md3", MX[3], 44)),
    ),
    k(
      SUARA_K6,
      redamkan(0, "m3"),
      hapus(0, "md0", "md1", "md2", "md3", "tk0", "tk1", "tk2", "tk3", "q4-k", "q4-t0"),
      ubah(0, { id: "m1", op: 0.3 }, { id: "m2", op: 0.3 }),
      tambah("kelompok", ...nampan("mp", 80, 116, 140, 70, "bulat", W.krem)),
      ubah("Seret", pindah("lengkung", "m0", 115, 154, 16), pindah("lengkung", "m3", 185, 154, 9)),
      tambah("dua", teks("m2t", 150, 198, "2 anggota", 9, W.ungu)),
    ),
  ],
};

/* ------------------------------ 5. Merapikan kamar Kira ------------------------------ */
const SUARA_M1 = "Kamar Kira berantakan. Mainannya tersebar di lantai.";
const SUARA_M2 = "Kira merapikan mainan dengan satu aturan, yaitu warna. Rak pertama untuk mainan merah. Seret mainan merah ke rak pertama.";
const SUARA_M3 = "Rak kedua untuk mainan kuning. Seret mainan kuning ke rak kedua.";
const SUARA_M4 = "Rak ketiga untuk mainan biru. Seret mainan biru ke rak ketiga.";
const SUARA_M5 = "Sekarang hitung anggota tiap rak. Rak merah ada tiga. Rak kuning ada dua. Rak biru ada empat.";
const SUARA_M6 = "Sekarang kamar Kira rapi, dan mainan mudah dicari. Mengelompokkan membantu kita merapikan, mencari, dan menghitung dengan cepat.";
type Mainan = { id: string; b: "lengkung" | "segitiga" | "segiempat"; w: string; x: number; y: number; rak: number; j: number };
const TOKO: Mainan[] = [
  { id: "mm0", b: "lengkung", w: WB.merah, x: 35, y: 52, rak: 0, j: 0 },
  { id: "mm1", b: "segitiga", w: WB.merah, x: 130, y: 88, rak: 0, j: 1 },
  { id: "mm2", b: "segiempat", w: WB.merah, x: 255, y: 58, rak: 0, j: 2 },
  { id: "my0", b: "lengkung", w: WB.kuning, x: 82, y: 70, rak: 1, j: 0 },
  { id: "my1", b: "segiempat", w: WB.kuning, x: 205, y: 92, rak: 1, j: 1 },
  { id: "mb0", b: "lengkung", w: WB.biru, x: 175, y: 46, rak: 2, j: 0 },
  { id: "mb1", b: "segitiga", w: WB.biru, x: 62, y: 100, rak: 2, j: 1 },
  { id: "mb2", b: "segiempat", w: WB.biru, x: 232, y: 56, rak: 2, j: 2 },
  { id: "mb3", b: "lengkung", w: WB.biru, x: 285, y: 96, rak: 2, j: 3 },
];
const RX = [4, 103, 202];
const RAK_SLOT = (rak: number, j: number) => ({ x: RX[rak] + 16 + j * 22, y: 156 });
const geserMainan = (rak: number) => TOKO.filter((m) => m.rak === rak).map((m) => pindah(m.b, m.id, RAK_SLOT(rak, m.j).x, RAK_SLOT(rak, m.j).y, 8));
const WARNA_RAK = [W.merahMuda, "#FEF08A", W.langit];

export const ADEGAN_RAPI: AdeganStory = {
  id: "rapi",
  judul: "Merapikan kamar Kira",
  sumber: "Materi: merapikan mainan menurut warna",
  latar: "#F0F9FF",
  ketukan: [
    k(SUARA_M1, tambah(0, judul("Kamar Kira berantakan")), tambah("Mainannya", ...TOKO.map((m) => bentuk(m.b, m.id, m.x, m.y, 8, m.w)))),
    k(
      SUARA_M2,
      tambah("Rak", ...[0, 1, 2].flatMap((n) => nampan(`rk${n}`, RX[n], 118, 94, 60, "?", WARNA_RAK[n], 9))),
      ubah("merah.", { id: "rk0-t", isi: "merah" }),
      ubah("Seret", ...geserMainan(0)),
    ),
    k(SUARA_M3, ubah("kuning.", { id: "rk1-t", isi: "kuning" }), ubah("Seret", ...geserMainan(1))),
    k(SUARA_M4, ubah("biru.", { id: "rk2-t", isi: "biru" }), ubah("Seret", ...geserMainan(2))),
    k(
      SUARA_M5,
      tambah("tiga.", teks("rc0", RX[0] + 47, 192, "3 mainan", 9.6, W.merah)),
      tambah("dua.", teks("rc1", RX[1] + 47, 192, "2 mainan", 9.6, "#B45309")),
      tambah("empat.", teks("rc2", RX[2] + 47, 192, "4 mainan", 9.6, W.biru)),
    ),
    k(
      SUARA_M6,
      bersih(0),
      tambah(0, judul("Kamar Kira rapi"), emo("bn", 150, 76, "\u{1F9F8}", 44)),
      tambah("merapikan,", ...kartu("r1", 20, 104, 80, 30, W.langit, ["merapikan"], 9.4)),
      tambah("mencari,", ...kartu("r2", 110, 104, 80, 30, W.hijauMuda, ["mencari"], 9.4)),
      tambah("menghitung", ...kartu("r3", 200, 104, 80, 30, W.pink, ["menghitung"], 9.4)),
    ),
  ],
};

/* ------------------------------ 6. Langkah mengelompokkan ------------------------------ */
const SUARA_L1 = "Mari ingat langkah mengelompokkan. Langkah pertama, amati semua benda. Langkah kedua, pilih satu aturan.";
const SUARA_L2 = "Langkah ketiga, periksa tiap benda, cocok atau tidak. Langkah keempat, beri nama lalu hitung anggotanya.";
const SUARA_L3 = "Kalau aturannya diganti, kelompoknya ikut berganti. Tidak ada kelompok yang salah.";

export const ADEGAN_LANGKAH: AdeganStory = {
  id: "langkah",
  judul: "Empat langkah mengelompokkan",
  sumber: "Materi: langkah mengelompokkan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Empat langkah")),
      tambah("pertama,", ...kartu("l1", 20, 34, 260, 32, W.langit, ["1. amati semua benda"], 10)),
      tambah("kedua,", ...kartu("l2", 20, 76, 260, 32, W.hijauMuda, ["2. pilih satu aturan"], 10)),
    ),
    k(
      SUARA_L2,
      tambah("ketiga,", ...kartu("l3", 20, 118, 260, 32, W.pink, ["3. periksa tiap benda"], 10)),
      tambah("keempat,", ...kartu("l4", 20, 160, 260, 32, W.krem, ["4. beri nama, hitung"], 10)),
    ),
    k(
      SUARA_L3,
      bersih(0),
      tambah(0, judul("Ganti aturan"), ...panel("ga", 20, 40, 110, 70, W.langit, "aturan baru", 10), ...panel("gb", 170, 40, 110, 70, W.hijauMuda, "kelompok baru", 10)),
      tambah("diganti,", teks("gp", 150, 82, "\u{27A1}", 22, W.ungu)),
      tambah("Tidak", ...kartu("gc", 50, 130, 200, 36, W.emas, ["tidak ada yang salah"], 11)),
    ),
  ],
};
