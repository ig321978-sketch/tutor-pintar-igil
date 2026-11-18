import type { AdeganStory, Obj } from "./logika-story";
import { E, W, P, bg, emo, garis, judul, kartu, kotak, persegi, segiBanyak, teks, tokoh, type Titik } from "./k2b3B-gambar";
import { hapus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k2b3B-bantu";

/*
 * Video metode global Kelas 2 Bab 3 Sub-Bab B "Papan Puzzle yang Berantakan": Pattern Blocks (Pola Blok), Paper Folding (Lipat Kertas), Silhouette Puzzle (Teka-Teki Bayangan).
 * Naskah suara dari naskah/story-naskah-k2b3b.md. Bagian ini: pembuka (poster tua), Pola Blok dan terapannya, dan Lipat Kertas.
 */
export const NAMA_METODE = ["Pattern Blocks", "Paper Folding", "Silhouette Puzzle"] as const;
export const NAMA_METODE_ID = ["Pola Blok", "Lipat Kertas", "Teka-Teki Bayangan"] as const;

export const BLOK = { segitiga: "#86EFAC", segiEmpat: "#FDBA74", segiEnam: "#FDE047", belah: "#93C5FD" } as const;
const blok = (id: string, pts: Titik[], warna: string, o: Partial<Obj> = {}): Obj => bg(id, pts, warna, { z: 2, tebal: 2, ...o });

/* ------------------------------ Pembuka: poster tua ------------------------------ */
const SUARA_O1 = "Di dinding ruang seni, Nia menemukan poster tua yang terlipat dan memuat tiga cara bermain bentuk.";
const SUARA_O2 = "Bu Ratna tertawa. Itu poster guru seni zaman dulu, tersembunyi di balik lukisan!";
const SUARA_O3 = "Tiga cara itu: Pattern Blocks, Paper Folding, dan Silhouette Puzzle.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Pola Blok, Lipat Kertas, dan Teka-Teki Bayangan.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Poster tua di ruang seni",
  sumber: "Metode global: tiga cara bermain bentuk",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Poster Tua"), kotak("dn", 4, 26, 292, 130, "#FDE9C9", "#B45309", { rx: 4, tebal: 1.4, z: -3 }), kotak("lk", 214, 40, 64, 48, "#BAE6FD", "#92400E", { rx: 3, tebal: 3, z: -1 })),
      tambah(idx(SUARA_O1, "Nia"), ...tokoh("ni", 40, 168, "Nia")),
      tambah(idx(SUARA_O1, "poster"), kotak("ps", 100, 44, 90, 96, "#FFF7ED", "#92400E", { rx: 3, tebal: 2, z: 1 })),
      tambah(idx(SUARA_O1, "terlipat"), garis("pl1", 100, 76, 90, 0, "#B45309", 1.4, { putus: true, z: 2 }), garis("pl2", 100, 108, 90, 0, "#B45309", 1.4, { putus: true, z: 2 })),
      tambah(idx(SUARA_O1, "tiga"), teks("t3", 145, 96, "3 cara", 14, W.merah, { z: 3 })),
    ),
    k(
      SUARA_O2,
      tambah(idx(SUARA_O2, "Ratna"), ...tokoh("br", 262, 168, "Bu Ratna")),
      tambah(idx(SUARA_O2, "tertawa."), emo("tw", 232, 144, E.tertawa, 20)),
      ubah(idx(SUARA_O2, "tersembunyi"), { id: "ps", x: 26 }, { id: "pl1", x: 26 }, { id: "pl2", x: 26 }, { id: "t3", x: 26 }),
      tambah(idx(SUARA_O2, "lukisan!"), emo("ls", 246, 66, E.lukisan, 20, { z: 4 })),
    ),
    k(
      SUARA_O3,
      hapus(idx(SUARA_O3, "Tiga"), "ps", "pl1", "pl2", "t3", "lk", "ls", "br", "br-n", "br-kd", "br-ks", "tw"),
      tambah(idx(SUARA_O3, "Tiga"), teks("jm", 150, 44, "3 cara", 13, W.merah)),
      tambah(idx(SUARA_O3, "Pattern"), ...kartu("m0", 14, 56, 150, 28, "#BBF7D0", ["1. Pattern Blocks"], 10)),
      tambah(idx(SUARA_O3, "Paper"), ...kartu("m1", 14, 96, 150, 28, "#FDE68A", ["2. Paper Folding"], 10)),
      tambah(idx(SUARA_O3, "Silhouette"), ...kartu("m2", 14, 136, 150, 28, "#DDD6FE", ["3. Silhouette Puzzle"], 10)),
    ),
    k(
      SUARA_O4,
      tambah(idx(SUARA_O4, "Pola"), ...kartu("n0", 172, 56, 114, 28, "#DCFCE7", ["Pola Blok"], 10)),
      tambah(idx(SUARA_O4, "Lipat"), ...kartu("n1", 172, 96, 114, 28, "#FEF9C3", ["Lipat Kertas"], 10)),
      tambah(idx(SUARA_O4, "Teka-Teki"), ...kartu("n2", 172, 136, 114, 28, "#EDE9FE", ["Teka-Teki Bayangan"], 9)),
    ),
  ],
};

/* ------------------------------ Pola Blok: konsep ------------------------------ */
const SUARA_B1 = "Cara pertama, Pattern Blocks, atau Pola Blok.";
const SUARA_B2 = "Blok kayu berbentuk segitiga, segi empat, dan segi enam, yang bisa ditempelkan sisi ke sisi.";
const SUARA_B3 = "Kita menyusun blok sampai membentuk pola atau bentuk baru yang lebih besar.";
const SUARA_B4 = "Setiap blok punya bentuk tetap, jadi mudah dihitung dan diganti.";
const TRI = [P(46, 120), P(86, 120), P(66, 85)];
const SEG4 = persegi(116, 90, 34);
const HEX_B = segiBanyak(6, 222, 104, 24, 90);
const meja = kotak("mj", 14, 134, 272, 40, "#D6A15E", "#92400E", { rx: 5, tebal: 2, z: -2 });

export const ADEGAN_LUAR_BLOK: AdeganStory = {
  id: "luar-blok",
  judul: "Pattern Blocks: Pola Blok",
  sumber: "Metode global: Pola Blok",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("1. Pola Blok"), meja),
      tambah(idx(SUARA_B1, "pertama,"), ...kartu("kb", 60, 40, 180, 30, "#BBF7D0", ["Pattern Blocks"], 12)),
      tambah(idx(SUARA_B1, "Pola"), ...kartu("kc", 80, 78, 140, 26, "#DCFCE7", ["Pola Blok"], 11)),
    ),
    k(
      SUARA_B2,
      hapus(idx(SUARA_B2, "Blok"), "kb-k", "kb-t0", "kc-k", "kc-t0"),
      tambah(idx(SUARA_B2, "segitiga,"), blok("b0", TRI, BLOK.segitiga)),
      tambah(idx(SUARA_B2, "empat,"), blok("b1", SEG4, BLOK.segiEmpat)),
      tambah(idx(SUARA_B2, "enam,"), blok("b2", HEX_B, BLOK.segiEnam), teks("n6", 222, 156, "6 sisi", 11, W.merah)),
      sorotkan(idx(SUARA_B2, "ditempelkan"), "b0", "b1", "b2"),
    ),
    k(
      SUARA_B3,
      redamkan(idx(SUARA_B3, "Kita"), "b0", "b1", "b2"),
      hapus(idx(SUARA_B3, "Kita"), "n6"),
      ubah(idx(SUARA_B3, "menyusun"), { id: "b0", x: 66, y: -10 }, { id: "b1", x: -4, y: 0 }),
      ubah(idx(SUARA_B3, "pola"), { id: "b2", x: -78, y: 0 }),
      tambah(idx(SUARA_B3, "baru"), ...kartu("pl", 80, 44, 140, 26, W.krem, ["pola baru yang besar"], 10)),
    ),
    k(
      SUARA_B4,
      hapus(idx(SUARA_B4, "Setiap"), "pl-k", "pl-t0"),
      tambah(idx(SUARA_B4, "bentuk"), ...kartu("tt", 80, 44, 140, 26, W.langit, ["bentuk tetap"], 11)),
      tambah(idx(SUARA_B4, "dihitung"), emo("cn", 150, 188, E.benar, 16)),
      tambah(idx(SUARA_B4, "diganti."), emo("gn", 190, 188, "\u{1F501}", 16)),
    ),
  ],
};

/* ------------------------------ Pola Blok: terapan ------------------------------ */
const SUARA_P1 = "Dika menyusun enam blok segitiga yang sama, dan jadilah satu segi enam yang besar.";
const SUARA_P2 = "Lalu ia mengganti enam segitiga itu dengan tiga blok segi empat miring, dan bentuk besarnya tetap sama.";
const SUARA_P3 = "Cocok kalau kita ingin mencoba banyak susunan dengan cepat.";
const SUARA_P4 = "Kurang cocok kalau tidak ada blok yang bentuknya pas untuk lubangnya.";
const PC = P(200, 100);
const HEX_G = segiBanyak(6, PC.x, PC.y, 52, 0);
const SEGITIGA_G = HEX_G.map((v, i) => [PC, v, HEX_G[(i + 1) % 6]]);
const BELAH_G = [0, 2, 4].map((i) => [PC, HEX_G[i], HEX_G[i + 1], HEX_G[(i + 2) % 6]]);

export const ADEGAN_LUAR_BLOK_TERAPAN: AdeganStory = {
  id: "luar-blok-terapan",
  judul: "Pola Blok: menyusun segi enam",
  sumber: "Metode global: Pola Blok dipakai",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Pola Blok Dipakai"), ...tokoh("dk", 40, 168, "Dika")),
      tambah(idx(SUARA_P1, "enam"), ...SEGITIGA_G.map((t, i) => blok(`s${i}`, t, BLOK.segitiga, { op: i === 0 ? 1 : 0.95 })), teks("c6", 60, 100, "6 segitiga", 11, W.merah)),
      tambah(idx(SUARA_P1, "satu"), teks("c1", 60, 120, "1 segi enam", 11, W.ungu)),
      sorotkan(idx(SUARA_P1, "besar."), ...SEGITIGA_G.map((_, i) => `s${i}`)),
    ),
    k(
      SUARA_P2,
      redamkan(idx(SUARA_P2, "Lalu"), ...SEGITIGA_G.map((_, i) => `s${i}`)),
      hapus(idx(SUARA_P2, "mengganti"), ...SEGITIGA_G.map((_, i) => `s${i}`)),
      tambah(idx(SUARA_P2, "mengganti"), ...BELAH_G.map((t, i) => blok(`r${i}`, t, BLOK.belah))),
      ubah(idx(SUARA_P2, "tiga"), { id: "c6", isi: "3 segi empat miring", x: 62 }),
      tambah(idx(SUARA_P2, "tetap"), emo("sm", 262, 40, E.benar, 20)),
    ),
    k(
      SUARA_P3,
      hapus(idx(SUARA_P3, "Cocok"), "c6", "c1", "sm"),
      tambah(idx(SUARA_P3, "Cocok"), emo("ok", 40, 100, E.benar, 24)),
      tambah(idx(SUARA_P3, "banyak"), ...kartu("cc", 14, 124, 110, 30, W.hijauMuda, ["banyak susunan"], 9.4)),
      tambah(idx(SUARA_P3, "cepat."), emo("cp", 60, 60, "\u{1F680}", 20)),
    ),
    k(
      SUARA_P4,
      hapus(idx(SUARA_P4, "Kurang"), "ok", "cc-k", "cc-t0", "cp", ...BELAH_G.map((_, i) => `r${i}`)),
      tambah(idx(SUARA_P4, "Kurang"), emo("xs", 40, 100, E.salah, 24)),
      tambah(idx(SUARA_P4, "lubangnya."), bg("lb", [P(160, 60), P(250, 70), P(240, 140), P(176, 150), P(150, 110)], "#E2E8F0", { z: 1, putus: true, tebal: 1.8 })),
      tambah(idx(SUARA_P4, "pas"), blok("sx", [P(60, 150), P(96, 150), P(78, 120)], BLOK.segitiga), emo("qm", 205, 104, E.tanya, 24)),
      tambah(idx(SUARA_P4, "blok"), ...kartu("kk", 156, 160, 130, 26, W.merahMuda, ["tidak ada blok pas"], 9)),
    ),
  ],
};

/* ------------------------------ Lipat Kertas: konsep ------------------------------ */
const SUARA_L1 = "Cara kedua, Paper Folding, atau Lipat Kertas.";
const SUARA_L2 = "Kertas dilipat dulu, dan bekas lipatannya menjadi garis untuk mengurai.";
const SUARA_L3 = "Gunting sepanjang bekas lipatan, dan kertas terurai menjadi bagian-bagian yang sama persis.";
const SUARA_L4 = "Dua bagian yang sama bisa ditumpuk untuk memeriksa apakah ukurannya pas.";
const KERTAS = persegi(110, 56, 80);

export const ADEGAN_LUAR_LIPAT: AdeganStory = {
  id: "luar-lipat",
  judul: "Paper Folding: Lipat Kertas",
  sumber: "Metode global: Lipat Kertas",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("2. Lipat Kertas")),
      tambah(idx(SUARA_L1, "kedua,"), ...kartu("kb", 60, 40, 180, 30, "#FDE68A", ["Paper Folding"], 12)),
      tambah(idx(SUARA_L1, "Lipat"), ...kartu("kc", 80, 84, 140, 26, "#FEF9C3", ["Lipat Kertas"], 11), bg("kr", persegi(112, 124, 76, 56), "#FFFFFF", { z: 1, tebal: 2 })),
    ),
    k(
      SUARA_L2,
      hapus(idx(SUARA_L2, "Kertas"), "kb-k", "kb-t0", "kc-k", "kc-t0", "kr"),
      tambah(idx(SUARA_L2, "Kertas"), bg("kt", KERTAS, "#FFFFFF", { z: 1, tebal: 2.2 })),
      tambah(idx(SUARA_L2, "dilipat"), garis("fl", 110, 56, 80, 80, "#2563EB", 2.4, { putus: true, z: 4 })),
      tambah(idx(SUARA_L2, "bekas"), emo("lp", 224, 70, "\u{1F4D0}", 20)),
      tambah(idx(SUARA_L2, "garis"), teks("gl", 150, 160, "bekas lipatan = garis", 10, W.biru)),
    ),
    k(
      SUARA_L3,
      hapus(idx(SUARA_L3, "Gunting"), "lp", "gl"),
      tambah(idx(SUARA_L3, "Gunting"), emo("gt", 96, 120, E.gunting, 22, { z: 6 })),
      ubah(idx(SUARA_L3, "terurai"), { id: "kt", op: 0.2 }, { id: "gt", x: 214, y: 56 }),
      tambah(idx(SUARA_L3, "menjadi"), bg("g0", [P(110, 56), P(190, 56), P(190, 136)], "#FEF9C3", { z: 3, x: 14, y: -4 }), bg("g1", [P(110, 56), P(190, 136), P(110, 136)], "#FDE68A", { z: 3, x: -14, y: 4 })),
      tambah(idx(SUARA_L3, "persis."), teks("sm", 150, 172, "sama persis", 11, W.ungu)),
    ),
    k(
      SUARA_L4,
      hapus(idx(SUARA_L4, "Dua"), "gt", "kt", "fl", "sm"),
      tambah(idx(SUARA_L4, "Dua"), teks("d2", 240, 100, "2 bagian", 11, W.merah)),
      ubah(idx(SUARA_L4, "ditumpuk"), { id: "g0", x: -28, y: 22 }, { id: "g1", x: -10, y: 0 }),
      tambah(idx(SUARA_L4, "pas."), emo("ok", 150, 180, E.benar, 20), bg("tp", [P(110, 56), P(190, 136), P(110, 136)], "none", { z: 5, tebal: 2.4, x: -10 })),
    ),
  ],
};
