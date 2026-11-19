import type { AdeganStory, Obj } from "./logika-story";
import { E, W, dermaga, emo, garis, judul, judulTempat, kartu, kotak, laut, panah, papanDermaga, teks, tempatAngka, tokoh } from "./k4b1c-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k4b1c-bantu";

/*
 * Cerita orisinal IGIL "Papan Dermaga Kak Tiara" (K4 Bab 1 Sub-Bab C), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b1c.md. Bagian ini: pembuka (tas pemandu), Left-to-Right Compare (Banding dari Kiri), dan terapannya.
 */

export const NAMA_METODE = ["Left-to-Right Compare", "Number Line", "Card Sort"] as const;
export const NAMA_METODE_ID = ["Banding dari Kiri", "Garis Bilangan", "Urut Kartu"] as const;

const KUNING_KARTU = "#FEF3C7";
const HIJAU_TEMPAT = "#86EFAC";

/** Papan besar sebagai latar tulisan: papan `pd` (lebar 284) pojok kiri-atas (8, 28), tinggi 112. */
const papan = (): Obj[] => papanDermaga("pd", 8, 28, 284, 112);

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Sore itu, di ujung dermaga, Kak Tiara membuka tas pemandunya yang penuh dengan papan dan kartu.";
const SUARA_O2 = "Di dalamnya ada tiga cara untuk membandingkan bilangan besar, supaya tidak ada yang tertukar.";
const SUARA_O3 = "Tiga cara itu: Left-to-Right Compare, Number Line, dan Card Sort.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Banding dari Kiri, Garis Bilangan, dan Urut Kartu.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tas pemandu Kak Tiara",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Ujung Dermaga"), ...laut("lt", 104), ...dermaga("dk", 2, 172, 296)),
      tambah("Kak", ...tokoh("kt", 60, 184, "Kak Tiara")),
      tambah("tas", kotak("ts", 100, 140, 40, 28, "#A16207", "#451A03", { rx: 4, z: 2 }), garis("tl", 108, 140, 24, 0, "#451A03", 2, { z: 3 })),
      tambah("papan", ...kartu("kp", 160, 62, 62, 30, KUNING_KARTU, ["papan"], 9)),
      tambah("kartu", ...kartu("kr", 232, 62, 56, 30, "#DBEAFE", ["kartu"], 9)),
    ),
    k(
      SUARA_O2,
      tambah("tiga", teks("n3", 150, 44, "3 cara", 13, W.ungu)),
      tambah("membandingkan", ...kartu("bb", 100, 82, 100, 30, "#BBF7D0", ["bilangan besar"], 9)),
      tambah("tidak", emo("xs", 220, 112, E.salah, 20)),
      tambah("tertukar.", emo("ok", 252, 112, E.benar, 20)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara"), teks("n3", 262, 40, "3 cara", 11, W.ungu), ...papan()),
      tambah("Compare,", teks("m0", 110, 66, "1. Left-to-Right Compare", 10, W.tinta), emo("i0", 26, 68, E.penggaris, 16)),
      tambah("Line,", teks("m1", 110, 98, "2. Number Line", 10, W.tinta), emo("i1", 26, 100, E.kartu, 16)),
      tambah("Sort.", teks("m2", 110, 130, "3. Card Sort", 10, W.tinta), emo("i2", 26, 132, E.catat, 16)),
    ),
    k(
      SUARA_O4,
      tambah("Kiri,", teks("g0", 236, 66, "Banding dari Kiri", 8, W.ungu), garis("l0", 196, 70, 80, 0, W.ungu, 1)),
      tambah("Bilangan,", teks("g1", 236, 98, "Garis Bilangan", 8, W.ungu), garis("l1", 196, 102, 80, 0, W.ungu, 1)),
      tambah("Kartu.", teks("g2", 236, 130, "Urut Kartu", 8, W.ungu), garis("l2", 196, 134, 80, 0, W.ungu, 1)),
    ),
  ],
};

/* ------------------------------ Left-to-Right Compare: konsep ------------------------------ */
const SUARA_L1 = "Cara pertama, Left-to-Right Compare, atau Banding dari Kiri.";
const SUARA_L2 = "Kita mulai dari tempat paling kiri, yaitu ribuan.";
const SUARA_L3 = "Kalau angkanya sama, kita pindah ke tempat di kanannya, sampai ketemu angka yang berbeda.";
const SUARA_L4 = "Angka berbeda pertama itulah yang menentukan bilangan mana yang lebih besar.";

export const ADEGAN_LUAR_KIRI: AdeganStory = {
  id: "luar-kiri",
  judul: "Left-to-Right Compare: Banding dari Kiri",
  sumber: "Metode global: Left-to-Right Compare (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Cara 1: Left-to-Right Compare"), ...papan()),
      tambah("Left-to-Right", teks("nm", 150, 62, "Left-to-Right Compare", 14, W.tinta)),
      tambah("Banding", teks("ni", 150, 86, "Banding dari Kiri", 11, W.merah)),
      tambah("Kiri.", panah("ak", 50, 114, 200, 0, W.merah, 3)),
    ),
    k(
      SUARA_L2,
      bersih(0),
      tambah(0, judul("Mulai dari Kiri"), ...papan()),
      tambah("tempat", ...judulTempat("ht", 82, 56), ...tempatAngka("pp", 82, 62, 7218)),
      sorotkan("kiri,", "pp-k0"),
      tambah("kiri,", panah("ak", 97, 124, 0, -22, W.merah, 2.6)),
      tambah("ribuan.", teks("rr", 97, 136, "ribuan", 9, W.merah)),
    ),
    k(
      SUARA_L3,
      tambah("sama,", emo("ok", 262, 62, E.benar, 20)),
      ubah("pindah", { id: "ak", x: 131 }, { id: "rr", x: 131, isi: "ratusan" }, { id: "pp-k0", warna: HIJAU_TEMPAT }),
      sorotkan("kanannya,", "pp-k1"),
      tambah("berbeda.", emo("xs", 262, 104, E.salah, 20)),
    ),
    k(
      SUARA_L4,
      ubah("pertama", { id: "pp-k2", warna: "#FECACA" }),
      tambah("menentukan", teks("mn", 238, 84, "menentukan", 9, W.merah)),
      tambah("lebih", teks("bs", 238, 118, "yang lebih besar", 8, W.ungu)),
      ubah("besar.", { id: "ak", x: 165 }, { id: "rr", x: 165, isi: "puluhan" }),
    ),
  ],
};

/* ------------------------------ Left-to-Right Compare: terapan ------------------------------ */
const SUARA_P1 = "Laras membandingkan enam ribu tujuh ratus dengan enam ribu tujuh puluh.";
const SUARA_P2 = "Ribuan sama dan ratusan berbeda, tujuh lebih besar daripada nol, jadi pemenangnya enam ribu tujuh ratus.";
const SUARA_P3 = "Cocok untuk membandingkan dua bilangan dengan cepat tanpa menghitung.";
const SUARA_P4 = "Kurang cocok kalau ada banyak bilangan, karena kita harus membandingkan satu per satu.";
/** Delapan kartu bilangan kecil yang harus dibandingkan satu per satu. */
const BANYAK = Array.from({ length: 8 }, (_, i) => kartu(`bk${i}`, 20 + i * 34, 60, 30, 28, "#FFFFFF", [String(i + 1)], 11, { z: 2 })).flat();

export const ADEGAN_LUAR_KIRI_TERAPAN: AdeganStory = {
  id: "luar-kiri-terapan",
  judul: "Banding dari Kiri: kapan cocok",
  sumber: "Metode global: Left-to-Right Compare (terapan)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Laras Membandingkan"), ...papan(), ...tokoh("lr", 40, 184, "Laras")),
      tambah("membandingkan", teks("la", 80, 54, "pertama", 9, W.tinta), teks("lb", 220, 54, "kedua", 9, W.tinta)),
      tambah("ratus", teks("a1", 80, 90, "6.700", 22, W.biru)),
      tambah("dengan", teks("vs", 150, 92, "?", 24, W.merah)),
      tambah("puluh.", teks("b1", 220, 90, "6.070", 22, W.biru)),
    ),
    k(
      SUARA_P2,
      tambah("sama", teks("e0", 150, 118, "ribuan =", 9, W.hijau)),
      tambah("tujuh", teks("d7", 80, 124, "7", 20, W.hijau)),
      tambah("nol,", teks("d0", 220, 124, "0", 20, W.merah)),
      ubah("pemenangnya", { id: "a1", warna: W.hijau }),
      tambah("ratus.", emo("mk", 80, 40, E.mahkota, 18)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Cocok untuk Dua Bilangan"), ...papan(), ...tokoh("lr", 40, 184, "Laras")),
      tambah("Cocok", emo("ok", 262, 52, E.benar, 20)),
      tambah("dua", teks("n2", 150, 66, "2 bilangan", 13, W.tinta)),
      tambah("cepat", teks("cp", 150, 100, "cepat", 12, W.merah)),
      tambah("menghitung.", teks("th", 150, 124, "tanpa menghitung", 10, W.tinta)),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Banyak Bilangan"), ...papan(), ...tokoh("lr", 40, 184, "Laras")),
      tambah("Kurang", emo("xs", 262, 52, E.salah, 20)),
      tambah("banyak", ...BANYAK),
      tambah("membandingkan", teks("pb", 150, 112, "bandingkan satu-satu", 10, W.merah)),
      tambah("satu", teks("sr", 150, 130, "1 per 1", 11, W.tinta)),
    ),
  ],
};

