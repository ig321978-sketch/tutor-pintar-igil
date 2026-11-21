import type { AdeganStory } from "./logika-story";
import { E, W, batangTegak, diagramTegak, emo, garis, idBatangTegak, judul, kartu, kotak, lantai, papan, panah, sumbuTegak, skalaTegak, tenda, teks, tokoh, ujungTegak, type OpsiTegak } from "./k4b6b-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k4b6b-bantu";

/*
 * Cerita orisinal IGIL "Diagram Batang Pak Dodi" (Kelas 4 Bab 6 Sub-Bab B), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b6b.md. Bagian ini: pembuka (papan besar Pak Dodi), Follow the Line (Telusuri Garis), dan terapannya.
 */

export const NAMA_METODE = ["Follow the Line", "Bar Duel", "Flip the Chart"] as const;
export const NAMA_METODE_ID = ["Telusuri Garis", "Adu Batang", "Putar Diagram"] as const;

/** Diagram es teh: tingkat sepuluh, lima garis skala (satu tingkat 14 piksel), satu batang empat puluh gelas. */
export const ES10: OpsiTegak = { x0: 60, yb: 128, tinggi: 70, n: 5, tingkat: 10, data: [{ nama: "Es teh", banyak: 40 }], lebar: 40, jarak: 100 };
const PAPAN_ES = () => papan("pb", 36, 34, 150, 114);

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Sore itu, di tengah bazar, Pak Dodi menyiapkan papan besar untuk memajang diagram batang.";
const SUARA_O2 = "Ada tiga cara supaya batang mudah dibaca, tanpa salah angka dan tanpa salah banding.";
const SUARA_O3 = "Tiga cara itu: Follow the Line, Bar Duel, dan Flip the Chart.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Telusuri Garis, Adu Batang, dan Putar Diagram.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Papan besar Pak Dodi",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Sore di Tengah Bazar"), ...lantai("lt", 150)),
      tambah("bazar", ...tenda("td", 6, 60, 50)),
      tambah("Dodi", ...tokoh("pr", 262, 184, "Pak Dodi")),
      tambah("papan", papan("pb", 66, 36, 150, 104)),
      tambah("diagram", garis("sy", 88, 48, 0, 78, W.biru, 1.8, { z: 3 }), garis("sd", 88, 126, 112, 0, W.biru, 1.8, { z: 3 })),
    ),
    k(
      SUARA_O2,
      tambah("cara", teks("n3", 256, 44, "3 cara", 10, W.ungu)),
      tambah("dibaca", kotak("o0", 100, 76, 26, 50, "#F97316", W.biru, { rx: 2, z: 2 }), kotak("o1", 134, 96, 26, 30, "#22C55E", W.biru, { rx: 2, z: 2 }), kotak("o2", 168, 86, 26, 40, "#38BDF8", W.biru, { rx: 2, z: 2 })),
      tambah("salah", teks("sa1", 256, 70, "tanpa salah", 8, W.merah)),
      tambah("banding", emo("ok", 256, 100, E.benar, 22)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara"), teks("n3", 260, 40, "3 cara", 10, W.ungu)),
      tambah("Follow", teks("m0", 118, 70, "1. Follow the Line", 10, W.biru), emo("i0", 28, 72, E.penggaris, 16)),
      tambah("Bar", teks("m1", 118, 120, "2. Bar Duel", 10, W.biru), emo("i1", 28, 122, "\u{1F94A}", 16)),
      tambah("Flip", teks("m2", 118, 170, "3. Flip the Chart", 10, W.biru), emo("i2", 28, 172, E.putar, 16)),
    ),
    k(
      SUARA_O4,
      tambah("Telusuri", teks("g0", 244, 70, "Telusuri Garis", 8, W.ungu), garis("l0", 184, 74, 22, 0, W.ungu, 1)),
      tambah("Adu", teks("g1", 244, 120, "Adu Batang", 8, W.ungu), garis("l1", 184, 124, 22, 0, W.ungu, 1)),
      tambah("Putar", teks("g2", 244, 170, "Putar Diagram", 8, W.ungu), garis("l2", 184, 174, 22, 0, W.ungu, 1)),
    ),
  ],
};

/* ------------------------------ Follow the Line: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Follow the Line, atau Telusuri Garis.";
const SUARA_C2 = "Kita menarik garis lurus dari ujung batang sampai bertemu sumbu angka.";
const SUARA_C3 = "Angka yang ditunjuk garis itu adalah banyak data pada batang tersebut.";
const SUARA_C4 = "Lihat dulu tingkatan sumbu, apakah satu, dua, lima, atau sepuluh, supaya angkanya tidak keliru.";
const [, Y_ES] = ujungTegak(ES10, 0);

export const ADEGAN_LUAR_GARIS: AdeganStory = {
  id: "luar-garis",
  judul: "Follow the Line: Telusuri Garis",
  sumber: "Metode global: Follow the Line (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 1: Follow the Line"), ...lantai("lt", 150)),
      tambah("Follow", emo("pg", 110, 112, E.penggaris, 40)),
      tambah("Telusuri", teks("nm", 150, 140, "Telusuri Garis", 13, W.ungu), emo("kl", 190, 104, E.kilau, 28)),
    ),
    k(
      SUARA_C2,
      hapus(0, "pg", "nm", "kl"),
      tambah(0, PAPAN_ES(), ...sumbuTegak("dg", ES10), ...skalaTegak("dg", ES10)),
      tambah("ujung", ...batangTegak("dg", ES10)),
      tambah("bertemu", garis("gb", 60, Y_ES, 48, 0, W.merah, 2, { putus: true, z: 6 })),
      sorotkan("angka", "dg-a4"),
    ),
    k(
      SUARA_C3,
      sorotkan("ditunjuk", "dg-a4"),
      tambah("banyak", teks("lv", 232, 70, "= 40", 11, W.merah)),
      tambah("data", emo("ks", 232, 96, E.kilau, 22)),
    ),
    k(
      SUARA_C4,
      tambah("tingkatan", teks("tt", 232, 50, "tingkat?", 9, W.ungu)),
      tambah("satu", ...kartu("c1", 6, 156, 66, 26, W.krem, ["naik 1"], 9)),
      tambah("dua", ...kartu("c2", 78, 156, 66, 26, W.krem, ["naik 2"], 9)),
      tambah("lima", ...kartu("c3", 150, 156, 66, 26, W.krem, ["naik 5"], 9)),
      tambah("sepuluh", ...kartu("c4", 222, 156, 66, 26, "#BBF7D0", ["naik 10"], 9)),
    ),
  ],
};

/* ------------------------------ Follow the Line: terapan ------------------------------ */
const SUARA_T1 = "Laras menelusuri batang es teh yang ujungnya tepat di garis empat puluh.";
const SUARA_T2 = "Tingkatan sumbu itu sepuluh, dan garis yang ditunjuk berada di tingkat keempat, jadi hasilnya empat puluh gelas.";
const SUARA_T3 = "Cocok untuk membaca angka dari batang, karena garis membantu mata tidak bergeser.";
const SUARA_T4 = "Kurang cocok kalau ujung batang berada di antara dua garis, karena angkanya harus diperkirakan.";

export const ADEGAN_LUAR_GARIS_TERAPAN: AdeganStory = {
  id: "luar-garis-terapan",
  judul: "Follow the Line: terapan",
  sumber: "Metode global: Follow the Line (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Laras Menelusuri Batang"), ...lantai("lt", 150), PAPAN_ES(), ...sumbuTegak("dg", ES10), ...skalaTegak("dg", ES10), ...tokoh("la", 36, 184, "Laras")),
      tambah("batang", ...batangTegak("dg", ES10)),
      tambah("ujungnya", garis("gb", 60, Y_ES, 48, 0, W.merah, 2, { putus: true, z: 6 })),
      tambah("empat", teks("l40", 232, 70, "40 = 4 puluh", 8, W.merah)),
    ),
    k(
      SUARA_T2,
      sorotkan("sepuluh", "dg-a1"),
      tambah("sepuluh", teks("lt", 232, 92, "naik 10", 8, W.ungu)),
      tambah("keempat", teks("lk", 232, 106, "garis ke 4", 8, W.hijauTua)),
      tambah("hasilnya", teks("lh", 232, 122, "40 gelas", 9, W.hijauTua)),
    ),
    k(
      SUARA_T3,
      tambah("Cocok", emo("jp", 262, 56, E.jempol, 24)),
      tambah("garis", panah("pr", 108, Y_ES, -44, 0, W.ungu, 1.8, { z: 6 })),
      tambah("mata", emo("mt", 236, 150, E.mata, 18)),
    ),
    k(
      SUARA_T4,
      hapus(0, "jp", "mt", "pr", "dg-b0", "dg-n0", "gb", "l40", "lt", "lk", "lh"),
      tambah("ujung", ...batangTegak("bx", { ...ES10, data: [{ nama: "Es teh", banyak: 35 }] })),
      tambah("dua", teks("l2", 232, 80, "di antara 2 garis", 8, W.merah)),
      tambah("diperkirakan", emo("xs", 262, 56, E.salah, 24), teks("lq", 232, 104, "35?", 10, W.merah)),
    ),
  ],
};
void diagramTegak;
void idBatangTegak;
