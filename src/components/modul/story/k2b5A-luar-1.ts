import type { AdeganStory } from "./logika-story";
import { E, W, bulat, emo, garis, gerobak, judul, kartu, kotak, pagar, rumput, teks, tokoh } from "./k2b5A-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k2b5A-bantu";

/*
 * Cerita orisinal IGIL "Semangka Raksasa Pak Danu" (Kelas 2 Bab 5 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k2b5a.md. Bagian ini: pembuka (tiga kartu lusuh petani), Fair Sharing (Berbagi Adil), dan terapannya.
 */

export const NAMA_METODE = ["Fair Sharing", "Mirror Test", "Fraction Strips"] as const;
export const NAMA_METODE_ID = ["Berbagi Adil", "Uji Cermin", "Pita Pecahan"] as const;

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Di dasar gerobak, Chacha menemukan tiga kartu lusuh milik petani zaman dulu.";
const SUARA_O2 = "Pak Danu tertawa. Itu cara petani membagi hasil panen supaya tidak ada yang berebut!";
const SUARA_O3 = "Tiga cara itu: Fair Sharing, Mirror Test, dan Fraction Strips.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Berbagi Adil, Uji Cermin, dan Pita Pecahan.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga kartu lusuh petani",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Kartu Tua Petani"), rumput("rm", 134), ...pagar("pg", 8, 94, 284)),
      tambah("gerobak,", ...gerobak("gr", 30, 152)),
      tambah("Chacha", ...tokoh("ch", 150, 182, "Chacha")),
      tambah("tiga", teks("n3", 222, 56, "3 kartu", 10, W.ungu)),
      tambah("kartu", ...[0, 1, 2].flatMap((i) => kartu(`c${i}`, 160 + i * 42, 66, 36, 30, W.krem, ["kartu"], 8))),
      ubah("lusuh", ...[0, 1, 2].map((i) => ({ id: `c${i}-k`, warna: "#E7D3A8" }))),
    ),
    k(
      SUARA_O2,
      tambah("Danu", ...tokoh("pd", 252, 182, "Pak Danu")),
      ubah("tertawa.", { id: "pd", isi: E.tertawa }),
      sorotkan("cara", "c0-k", "c1-k", "c2-k"),
      tambah("hasil", emo("ja", 50, 150, E.jagung, 18), emo("jb", 72, 150, E.jagung, 18)),
      tambah("berebut!", emo("br", 112, 160, E.pusing, 20), emo("xr", 138, 148, E.salah, 18)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara Petani")),
      tambah("Tiga", teks("n3", 250, 40, "3 cara", 10, W.ungu)),
      tambah("Fair", teks("m0", 100, 70, "1. Fair Sharing", 13, W.biru), emo("i0", 246, 72, "\u{1F91D}", 22)),
      tambah("Mirror", teks("m1", 100, 116, "2. Mirror Test", 13, W.biru), kotak("i1", 240, 96, 7, 24, "#BAE6FD", "#0369A1", { rx: 2, tebal: 1.6 })),
      tambah("Fraction", teks("m2", 100, 162, "3. Fraction Strips", 13, W.biru), kotak("i2", 224, 152, 46, 12, "#F9A8D4", W.biru, { rx: 2, tebal: 1.4 }), garis("i2m", 247, 152, 0, 12, W.biru, 1)),
    ),
    k(
      SUARA_O4,
      tambah("Berbagi", teks("n0", 222, 86, "Berbagi Adil", 10, W.ungu)),
      tambah("Uji", teks("n1", 222, 132, "Uji Cermin", 10, W.ungu)),
      tambah("Pita", teks("n2", 222, 178, "Pita Pecahan", 10, W.ungu)),
    ),
  ],
};

/* ------------------------------ Fair Sharing: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Fair Sharing, atau Berbagi Adil.";
const SUARA_C2 = "Tanya dulu, hasil panen ini untuk berapa orang? Lalu potong supaya setiap orang mendapat bagian yang sama besar.";
const SUARA_C3 = "Untuk dua orang, potong menjadi dua bagian dan pastikan keduanya sama besar.";
const SUARA_C4 = "Periksa dengan menumpuk dua bagian itu, supaya terlihat pas atau tidak.";

export const ADEGAN_LUAR_ADIL: AdeganStory = {
  id: "luar-adil",
  judul: "Fair Sharing: Berbagi Adil",
  sumber: "Metode global: Fair Sharing (konsep)",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 1: Fair Sharing"), rumput("rm", 140)),
      tambah("Fair", emo("ha", 150, 112, "\u{1F91D}", 44)),
      tambah("Sharing,", ...kartu("gb", 84, 40, 132, 22, W.putih, ["bagian sama besar"], 9)),
      tambah("Berbagi", teks("nm", 150, 172, "Berbagi Adil", 11, W.ungu)),
    ),
    k(
      SUARA_C2,
      hapus(0, "ha", "gb-k", "gb-t0", "nm"),
      tambah("hasil", kotak("jg", 90, 104, 120, 22, "#FDE047", "#A16207", { rx: 10, tebal: 2 }), emo("jy", 150, 120, E.jagung, 16)),
      tambah("berapa", emo("tq", 150, 76, E.tanya, 28)),
      tambah("orang?", emo("o1", 190, 168, E.anak, 24), emo("o2", 224, 168, E.anak, 24)),
      tambah("potong", garis("gp", 150, 98, 0, 36, W.merah, 2.4, { putus: true, z: 3 })),
      tambah("sama", ...kartu("sm", 70, 40, 160, 22, W.hijauMuda, ["bagian sama besar"], 9)),
    ),
    k(
      SUARA_C3,
      hapus(0, "tq", "sm-k", "sm-t0", "jy"),
      tambah("dua", teks("n2", 207, 138, "2 orang", 9, W.ungu)),
      tambah("potong", kotak("b1", 90, 104, 60, 22, "#FDE047", "#A16207", { rx: 4, tebal: 2 }), kotak("b2", 150, 104, 60, 22, "#FDE047", "#A16207", { rx: 4, tebal: 2 })),
      tambah("dua@2", teks("n3", 150, 94, "2 bagian", 10, W.ungu)),
      tambah("sama", teks("sm2", 150, 142, "sama besar", 10, W.hijau), emo("ok", 150, 70, E.benar, 24)),
    ),
    k(
      SUARA_C4,
      hapus(0, "jg", "gp", "b1", "b2", "n2", "n3", "sm2", "ok", "o1", "o2"),
      tambah("menumpuk", kotak("s1", 100, 96, 100, 22, "#FDE047", "#A16207", { rx: 4, tebal: 2 }), kotak("s2", 102, 100, 100, 22, "#FCD34D", "#A16207", { rx: 4, tebal: 2, z: -1 })),
      tambah("dua", teks("n4", 150, 72, "2 bagian", 10, W.ungu)),
      tambah("pas", emo("ok2", 120, 150, E.benar, 22)),
      tambah("tidak.", emo("xs", 190, 150, E.salah, 22)),
    ),
  ],
};

/* ------------------------------ Fair Sharing: terapan ------------------------------ */
const SUARA_T1 = "Dika membelah jagung manis untuk dua petani. Ia menumpuk kedua belahan, dan keduanya pas.";
const SUARA_T2 = "Petani pertama memilih lebih dulu, dan tidak ada yang iri.";
const SUARA_T3 = "Cocok kalau bendanya bisa dipotong dan kita ingin semua orang puas.";
const SUARA_T4 = "Kurang cocok kalau bendanya tidak bisa dipotong, karena bagiannya tidak bisa ditumpuk.";

export const ADEGAN_LUAR_ADIL_TERAPAN: AdeganStory = {
  id: "luar-adil-terapan",
  judul: "Fair Sharing: Dika membelah jagung",
  sumber: "Metode global: Fair Sharing (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Dika Membelah Jagung"), rumput("rm", 140)),
      tambah("Dika", ...tokoh("dk", 40, 180, "Dika")),
      tambah("membelah", kotak("jg", 90, 100, 100, 18, "#FDE047", "#A16207", { rx: 8, tebal: 2 }), garis("gt", 140, 94, 0, 30, W.merah, 2.4, { putus: true, z: 3 })),
      sorotkan("jagung", "jg"),
      tambah("dua", teks("n2", 150, 76, "2 petani", 10, W.ungu), emo("p1", 232, 174, E.anak, 24), emo("p2", 266, 174, E.anak, 24)),
      hapus("menumpuk", "jg", "gt"),
      tambah("menumpuk", kotak("h1", 96, 108, 50, 18, "#FDE047", "#A16207", { rx: 6, tebal: 2 }), kotak("h2", 99, 111, 50, 18, "#FCD34D", "#A16207", { rx: 6, tebal: 2, z: -1 })),
      tambah("pas.", emo("ok", 150, 150, E.benar, 24)),
    ),
    k(
      SUARA_T2,
      hapus(0, "n2", "ok"),
      tambah("Petani", teks("lp1", 226, 150, "petani 1", 8, W.ungu), teks("lp2", 272, 150, "petani 2", 8, W.ungu)),
      tambah("memilih", emo("pn", 152, 180, "\u{1F449}", 20)),
      ubah("lebih", { id: "h1", x: 170, y: 168 }),
      ubah("iri.", { id: "p1", isi: E.senyum }, { id: "p2", isi: E.senyum }),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?")),
      tambah("Cocok", emo("ok", 236, 84, E.benar, 28)),
      tambah("dipotong", ...kartu("cc", 50, 70, 130, 24, W.hijauMuda, ["bisa dipotong"], 10), kotak("jj", 70, 106, 90, 16, "#FDE047", "#A16207", { rx: 7, tebal: 2 })),
      tambah("semua", emo("o1", 90, 160, E.senyum, 26), emo("o2", 130, 160, E.senyum, 26)),
      tambah("puas.", emo("o3", 170, 160, E.sorak, 26)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?")),
      tambah("Kurang", emo("xs", 236, 84, E.salah, 28)),
      tambah("tidak", ...kartu("kc", 40, 70, 150, 24, W.merahMuda, ["tidak bisa dipotong"], 10), bulat("ba", 90, 124, 14, "#9CA3AF", W.biru, { tebal: 2 })),
      tambah("dipotong,", teks("gu", 142, 128, "batu keras", 9, W.merah)),
      tambah("ditumpuk.", emo("tq", 90, 168, E.tanya, 28)),
    ),
  ],
};

