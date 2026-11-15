import type { AdeganStory } from "./logika-story";
import { W, WB, bentuk, cocok, emo, jam, jendela, judul, kartu, keranjang, kotak, pindah, pintu, teks, tidakCocok } from "./k1b4b-gambar";
import { bersih, hapus, hitungAksi, idx, k, sorotkan, tambah, ubah } from "./k1b4b-bantu";
import { NAMA_METODE_ID, WARNA_METODE, kepala } from "./k1b4b-luar-1";

/* ------------------------------ 4. Pilah Ciri: konsep ------------------------------ */
const SUARA_P1 = "Metode kedua, Pilah Ciri. Kita pilah benda menurut ciri sisinya, lengkung atau lurus.";
const SUARA_P2 = "Benda yang tepinya melengkung masuk keranjang lengkung. Benda yang sisinya lurus masuk keranjang lurus.";
const SUARA_P3 = "Cukup dua pilihan, jadi memilahnya mudah. Lihat sisinya saja: lengkung atau lurus.";
const SUARA_P4 = "Lingkaran tidak punya sisi lurus. Itulah cara Pilah Ciri: lihat sisinya, lalu pilah.";

export const ADEGAN_LUAR_PILAH: AdeganStory = {
  id: "luar-pilah",
  judul: "Pilah Ciri: sisi lengkung atau lurus",
  sumber: "Metode luar: Pilah Ciri",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, ...kepala(1)),
      tambah("benda", bentuk("lengkung", "pl0", 70, 82, 16, WB.coklat), bentuk("segitiga", "pl1", 150, 82, 16, WB.hijau), bentuk("segiempat", "pl2", 230, 82, 16, WB.merah)),
      tambah("lengkung", ...keranjang("ka", 18, 128, 124, 46), teks("kal", 80, 196, "lengkung", 9.6, W.coklat)),
      tambah("lurus.", ...keranjang("kb", 158, 128, 124, 46), teks("kbl", 220, 196, "lurus", 9.6, W.coklat)),
    ),
    k(
      SUARA_P2,
      sorotkan("melengkung", "pl0"),
      ubah(idx(SUARA_P2, "masuk", 1), pindah("lengkung", "pl0", 80, 154, 16), { id: "pl0", sorot: false }),
      sorotkan("lurus", "pl1", "pl2"),
      ubah(idx(SUARA_P2, "masuk", 2), pindah("segitiga", "pl1", 190, 154, 16), pindah("segiempat", "pl2", 240, 154, 16), { id: "pl1", sorot: false }, { id: "pl2", sorot: false }),
    ),
    k(SUARA_P3, sorotkan("dua", "ka", "kb"), tambah("pilihan,", teks("kd", 150, 96, "dua pilihan saja", 12, W.ungu))),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, ...kepala(1)),
      tambah("Lingkaran", emo("ow", 150, 96, "\u{1F989}", 46)),
      tambah("Itulah", ...kartu("pz", 40, 130, 220, 36, W.krem, ["lihat sisi, lalu pilah"], 11)),
    ),
  ],
};

/* ------------------------------ 5. Pilah Ciri: terapan ------------------------------ */
const SUARA_A1 = "Upe punya lima bentuk di layar. Seret setiap bentuk ke keranjang yang cocok.";
const SUARA_A2 = "Dua bentuk melengkung masuk keranjang lengkung. Tiga bentuk bersisi lurus masuk keranjang lurus.";
const SUARA_A3 = "Hitung keranjang lengkung. Satu, dua. Ada dua bentuk.";
const SUARA_A4 = "Hitung keranjang lurus. Satu, dua, tiga. Ada tiga bentuk. Hebat sekali!";
const AWAL = [
  { id: "pr0", b: "segitiga" as const, w: WB.hijau, x: 30 },
  { id: "pe0", b: "lengkung" as const, w: WB.coklat, x: 84 },
  { id: "pr1", b: "segiempat" as const, w: WB.biru, x: 138 },
  { id: "pe1", b: "lengkung" as const, w: WB.kuning, x: 192 },
  { id: "pr2", b: "segitiga" as const, w: WB.merah, x: 246 },
];
const TUJU = { pe0: 55, pe1: 105, pr0: 185, pr1: 225, pr2: 265 } as Record<string, number>;
const PTS_PE = [55, 105].map((x) => ({ x, y: 156 }));
const PTS_PR = [185, 225, 265].map((x) => ({ x, y: 156 }));

export const ADEGAN_LUAR_PILAH_TERAPAN: AdeganStory = {
  id: "luar-pilah-terapan",
  judul: "Pilah Ciri: lima bentuk Upe",
  sumber: "Metode luar: Pilah Ciri, terapan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, ...kepala(1)),
      tambah("lima", ...AWAL.map((a) => bentuk(a.b, a.id, a.x, 82, 11, a.w))),
      tambah("keranjang", ...keranjang("ka", 18, 128, 124, 46), teks("kal", 80, 199.5, "lengkung", 9.6, W.coklat), ...keranjang("kb", 158, 128, 124, 46), teks("kbl", 220, 199.5, "lurus", 9.6, W.coklat)),
    ),
    k(
      SUARA_A2,
      ubah(idx(SUARA_A2, "masuk", 1), ...AWAL.filter((a) => a.id.startsWith("pe")).map((a) => pindah(a.b, a.id, TUJU[a.id], 156, 11))),
      ubah(idx(SUARA_A2, "masuk", 2), ...AWAL.filter((a) => a.id.startsWith("pr")).map((a) => pindah(a.b, a.id, TUJU[a.id], 156, 11))),
    ),
    k(SUARA_A3, ...hitungAksi(SUARA_A3, "pe", PTS_PE, "lengkung.")),
    k(SUARA_A4, hapus(0, "pen0", "pen1"), ...hitungAksi(SUARA_A4, "pr", PTS_PR, "lurus.", true)),
  ],
};

/* ------------------------------ 6. Bentuk di Sekitar: konsep ------------------------------ */
const SUARA_E1 = "Metode ketiga, Bentuk di Sekitar. Kita cari bentuk pada benda sehari-hari.";
const SUARA_E2 = "Lihat benda di layar. Jam dinding berbentuk lingkaran. Jendela berbentuk segi empat. Topi pesta berbentuk segitiga.";
const SUARA_E3 = "Kita sebut bentuk tiap benda. Jam, lingkaran. Jendela, segi empat. Topi, segitiga.";
const SUARA_E4 = "Bentuk ada di mana-mana. Kalau kita teliti, benda di sekitar kita punya bentuk yang kita kenal.";
const EX = [60, 150, 240];

export const ADEGAN_LUAR_SEKITAR: AdeganStory = {
  id: "luar-sekitar",
  judul: "Bentuk di Sekitar: cari bentuk pada benda",
  sumber: "Metode luar: Bentuk di Sekitar",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_E1, tambah(0, ...kepala(2)), tambah("cari", emo("lp", 150, 110, "\u{1F50D}", 50))),
    k(
      SUARA_E2,
      hapus(0, "lp"),
      tambah("Jam", ...jam("ea", EX[0], 94, 16), teks("en0", EX[0], 132, "jam dinding", 8.6, W.coklat)),
      tambah("Jendela", ...jendela("eb", EX[1] - 20, 78, 40, 34), teks("en1", EX[1], 132, "jendela", 8.6, W.coklat)),
      tambah("Topi", bentuk("segitiga", "ec", EX[2], 94, 16, WB.hijau), teks("en2", EX[2], 132, "topi pesta", 8.6, W.coklat)),
    ),
    k(
      SUARA_E3,
      sorotkan("Jam,", "ea"),
      tambah("lingkaran.", teks("et0", EX[0], 150, "lingkaran", 9.4, W.hijau)),
      ubah("Jendela,", { id: "ea", sorot: false }, { id: "eb", sorot: true }),
      tambah("empat.", teks("et1", EX[1], 150, "segi empat", 9.4, W.hijau)),
      ubah("Topi,", { id: "eb", sorot: false }, { id: "ec", sorot: true }),
      tambah("segitiga.", teks("et2", EX[2], 150, "segitiga", 9.4, W.hijau)),
    ),
    k(
      SUARA_E4,
      bersih(0),
      tambah(0, ...kepala(2)),
      tambah("Bentuk", emo("ow", 150, 100, "\u{1F989}", 50)),
      tambah("Kalau", ...kartu("ez", 40, 140, 220, 36, W.krem, ["bentuk ada di sekitarmu"], 11)),
    ),
  ],
};

/* ------------------------------ 7. Bentuk di Sekitar: terapan ------------------------------ */
const SUARA_B1 = "Kira melihat ruangan di layar. Ada jam, pintu, topi pesta, jendela, dan bingkai foto. Ketuk semua benda segi empat.";
const SUARA_B2 = "Pintu berbentuk segi empat, cocok. Jendela juga segi empat, cocok. Bingkai foto juga, cocok.";
const SUARA_B3 = "Jam dinding berbentuk lingkaran, tidak cocok. Topi pesta berbentuk segitiga, tidak cocok.";
const SUARA_B4 = "Hitung benda segi empat. Satu, dua, tiga. Ada tiga benda. Hebat sekali!";
const BINGKAI = (id: string, x: number, y: number, w: number, h: number) => [kotak(id, x, y, w, h, "#FBCFE8", W.coklat, { rx: 2, tebal: 1.8 }), kotak(`${id}-x`, x + 6, y + 6, w - 12, h - 12, W.putih, W.coklat, { rx: 1, tebal: 1.2 })];
const RPT = [{ x: 78, y: 80 }, { x: 186, y: 80 }, { x: 249, y: 80 }];

export const ADEGAN_LUAR_SEKITAR_TERAPAN: AdeganStory = {
  id: "luar-sekitar-terapan",
  judul: "Bentuk di Sekitar: ruangan Kira",
  sumber: "Metode luar: Bentuk di Sekitar, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, ...kepala(2)),
      tambah("jam,", ...jam("ra0", 30, 94, 12), teks("rn0", 30, 132, "jam", 8, W.coklat)),
      tambah("pintu,", ...pintu("rs0", 66, 72, 24, 44), teks("rn1", 78, 132, "pintu", 8, W.coklat)),
      tambah("topi", bentuk("segitiga", "ra1", 135, 94, 13, WB.hijau), teks("rn2", 135, 132, "topi pesta", 8, W.coklat)),
      tambah("jendela,", ...jendela("rs1", 168, 79, 36, 30), teks("rn3", 186, 132, "jendela", 8, W.coklat)),
      tambah("bingkai", ...BINGKAI("rs2", 232, 78, 34, 32), teks("rn4", 249, 132, "bingkai foto", 8, W.coklat)),
    ),
    k(
      SUARA_B2,
      tambah(idx(SUARA_B2, "cocok", 1), cocok("mc0", RPT[0].x, 68)),
      tambah(idx(SUARA_B2, "cocok", 2), cocok("mc1", RPT[1].x, 68)),
      tambah(idx(SUARA_B2, "cocok", 3), cocok("mc2", RPT[2].x, 68)),
    ),
    k(SUARA_B3, tambah(idx(SUARA_B3, "cocok", 1), tidakCocok("mx0", 30, 68)), tambah(idx(SUARA_B3, "cocok", 2), tidakCocok("mx1", 135, 68))),
    k(SUARA_B4, hapus(0, "mc0", "mc1", "mc2", "mx0", "mx1"), ...hitungAksi(SUARA_B4, "rs", RPT, "empat."), tambah("Hebat", emo("ow", 150, 180, "\u{1F989}", 26))),
  ],
};

/* ------------------------------ 8. Ringkasan metode luar ------------------------------ */
const SUARA_R1 = "Mari kita ingat tiga metode dari luar. Kenali Bentuk, Pilah Ciri, dan Bentuk di Sekitar.";
const SUARA_R2 = "Kenali Bentuk: kita lihat wujud benda, lalu menyebut namanya.";
const SUARA_R3 = "Pilah Ciri: kita pilah benda menurut sisinya, lengkung atau lurus. Bentuk di Sekitar: kita cari bentuk pada benda sehari-hari.";
const SUARA_R4 = "Boleh memilih cara yang paling kamu suka. Semuanya membantu kita mengelompokkan benda. Hebat sekali!";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Metode luar: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tiga metode dari luar")),
      ...NAMA_METODE_ID.map((m, i) => tambah(["Kenali", "Pilah", "Sekitar."][i], ...kartu(`r${i}`, 20, 38 + i * 46, 260, 36, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, judul("Kenali Bentuk"), emo("ra", 150, 80, "\u{1F441}", 44)),
      tambah("wujud", ...kartu("rb", 20, 108, 260, 50, W.hijauMuda, ["lihat wujud benda", "lalu sebut namanya"], 10.5)),
    ),
    k(
      SUARA_R3,
      bersih(0),
      tambah(0, judul("Dua metode lagi")),
      tambah("Pilah", ...kartu("rc", 20, 38, 260, 50, W.langit, ["Pilah Ciri", "sisi lengkung atau lurus"], 10.5)),
      tambah("Sekitar:", ...kartu("rd", 20, 108, 260, 50, W.pink, ["Bentuk di Sekitar", "cari bentuk pada benda sehari-hari"], 10.5)),
    ),
    k(SUARA_R4, bersih(0), tambah(0, judul("Pilih yang kamu suka"), emo("ow", 150, 92, "\u{1F989}", 54)), tambah("Hebat", ...kartu("rh", 60, 130, 180, 34, W.emas, ["hasilnya sama"], 12))),
  ],
};
