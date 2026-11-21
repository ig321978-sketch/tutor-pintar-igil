import type { AdeganStory } from "./logika-story";
import { E, W, WL, bulat, emo, idKartu, idLapisan, judul, kartu, kotak, kubus, lantai, lapisanKubus, panah, tangga, teks, tokoh } from "./k4b4b-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k4b4b-bantu";

/*
 * Cerita orisinal IGIL "Ember Pak Anto" (Kelas 4 Bab 4 Sub-Bab B), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b4b.md. Bagian ini: Layer Cubes (Susun Lapisan), Liter Ladder (Tangga Liter), terapannya, dan ringkasan.
 */

/* ------------------------------ Layer Cubes: konsep ------------------------------ */
const SUARA_Y1 = "Cara kedua, Layer Cubes, atau Susun Lapisan.";
const SUARA_Y2 = "Kita menyusun kubus satuan menjadi satu lapisan datar, lalu menumpuk lapisan itu ke atas.";
const SUARA_Y3 = "Banyak kubus tiap lapisan dikalikan dengan banyak lapisan adalah volumenya.";
const SUARA_Y4 = "Satuannya sentimeter kubik, karena kubus kecilnya bersisi satu sentimeter.";

export const ADEGAN_LUAR_LAPISAN: AdeganStory = {
  id: "luar-lapisan",
  judul: "Layer Cubes: Susun Lapisan",
  sumber: "Metode global: Layer Cubes (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_Y1,
      tambah(0, judul("Cara 2: Layer Cubes"), ...lantai("lt", 150)),
      tambah("Layer", emo("dd", 110, 112, E.dadu, 40)),
      tambah("Susun", teks("nm", 150, 140, "Susun Lapisan", 13, W.ungu)),
      tambah("Lapisan", ...lapisanKubus("L", 170, 88, 3, 2, 14)),
    ),
    k(
      SUARA_Y2,
      hapus(0, "dd", "nm", ...idLapisan("L", 3, 2)),
      tambah("kubus", kubus("ku", 40, 96, 18)),
      tambah("satu@2", ...lapisanKubus("A", 100, 100, 3, 2, 16), teks("s1", 124, 88, "1 lapisan", 11, W.coklat)),
      tambah("menumpuk", ...lapisanKubus("B", 108, 91, 3, 2, 16)),
      tambah("atas", panah("up", 250, 120, 0, -50, W.hijauTua, 2.6)),
    ),
    k(
      SUARA_Y3,
      sorotkan("kubus", ...idLapisan("A", 3, 2)),
      tambah("dikalikan", teks("kl", 200, 106, "×", 20, W.merah)),
      sorotkan("banyak@2", ...idLapisan("B", 3, 2)),
      tambah("volumenya", teks("vl", 224, 130, "= volume", 12, W.hijauTua)),
    ),
    k(
      SUARA_Y4,
      tambah("kubik", teks("cm", 60, 60, "cm³", 18, W.biru)),
      tambah("bersisi", { id: "bs", t: "garis", x: 40, y: 126, x2: 18, y2: 0, warna: W.merah, tebal: 2.4 }),
      tambah("satu@2", teks("sc", 49, 140, "1 cm", 11, W.merah)),
    ),
  ],
};

/* ------------------------------ Layer Cubes: terapan ------------------------------ */
const SUARA_Z1 = "Genta menyusun lapisan berisi dua kali tiga kubus, dengan tiga lapisan.";
const SUARA_Z2 = "Ia mengalikan enam dengan tiga dan mendapat delapan belas sentimeter kubik, yang juga sama dengan delapan belas mililiter.";
const SUARA_Z3 = "Cocok untuk wadah berbentuk kotak, karena lapisannya rata.";
const SUARA_Z4 = "Kurang cocok untuk benda bulat, karena kubus tidak bisa menutupnya rapi.";

export const ADEGAN_LUAR_LAPISAN_TERAPAN: AdeganStory = {
  id: "luar-lapisan-terapan",
  judul: "Layer Cubes: terapan",
  sumber: "Metode global: Layer Cubes (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Genta Menyusun Lapisan"), ...lantai("lt", 150), ...tokoh("ge", 36, 184, "Genta")),
      tambah("lapisan", ...lapisanKubus("A", 110, 100, 3, 2, 16)),
      tambah("dua", teks("t23", 66, 110, "2 × 3", 14, W.biru)),
      tambah("tiga@2", ...lapisanKubus("B", 118, 91, 3, 2, 16), ...lapisanKubus("C", 126, 82, 3, 2, 16), teks("l3", 230, 100, "3 lapisan", 12, W.coklat)),
    ),
    k(
      SUARA_Z2,
      tambah("enam", teks("hk", 150, 56, "6 × 3", 14, W.biru)),
      ubah("delapan", { id: "hk", isi: "6 × 3 = 18 cm³", warna: W.merah }),
      tambah("juga", teks("hm", 150, 72, "= 18 ml", 12, W.hijauTua)),
      tambah("mililiter", emo("ok", 250, 60, E.benar, 22)),
    ),
    k(
      SUARA_Z3,
      hapus(0, "hk", "hm", "ok", "l3"),
      tambah("Cocok", emo("jp", 262, 140, E.jempol, 22)),
      tambah("kotak", kotak("wk", 190, 60, 70, 50, undefined, W.coklat, { rx: 2, tebal: 2, z: 1 })),
      tambah("lapisannya", { id: "lr1", t: "garis", x: 192, y: 85, x2: 66, y2: 0, warna: W.biru, tebal: 1.4 }),
      tambah("rata", emo("ok", 150, 60, E.benar, 22)),
    ),
    k(
      SUARA_Z4,
      hapus(0, "jp", "wk", "lr1", "ok"),
      tambah("Kurang", emo("xs", 262, 140, E.salah, 22)),
      tambah("bulat", bulat("bw", 230, 86, 28, WL.air, WL.airGaris, { tebal: 2, z: 1 })),
      tambah("kubus", kubus("k1", 208, 60, 16), kubus("k2", 224, 60, 16), kubus("k3", 240, 60, 16)),
      tambah("rapi", teks("cl", 230, 134, "ada celah", 11, W.merah)),
    ),
  ],
};

/* ------------------------------ Liter Ladder: konsep ------------------------------ */
const SUARA_L1 = "Cara ketiga, Liter Ladder, atau Tangga Liter.";
const SUARA_L2 = "Kita menyusun satuan volume dari mililiter sampai liter seperti anak tangga.";
const SUARA_L3 = "Satu liter sama dengan seribu mililiter, dan satu sentimeter kubik sama dengan satu mililiter.";
const SUARA_L4 = "Naik tangga berarti membagi seribu, dan turun tangga berarti mengalikan seribu.";

export const ADEGAN_LUAR_TANGGA: AdeganStory = {
  id: "luar-tangga",
  judul: "Liter Ladder: Tangga Liter",
  sumber: "Metode global: Liter Ladder (konsep)",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Cara 3: Liter Ladder"), ...lantai("lt", 150)),
      tambah("Liter", emo("tg", 110, 112, E.tangga, 40)),
      tambah("Tangga", teks("nm", 150, 140, "Tangga Liter", 13, W.ungu)),
    ),
    k(
      SUARA_L2,
      hapus(0, "tg", "nm"),
      tambah("satuan", tangga("st", 50, 64)),
      tambah("mililiter", kotak("bm", 160, 86, 70, 26, W.hijauMuda, W.hijauTua, { rx: 4, z: 1 }), teks("tm", 195, 103, "mililiter", 12, W.hijauTua, { z: 3 })),
      tambah("liter@2", kotak("bl", 60, 36, 70, 26, W.langit, W.biru, { rx: 4, z: 1 }), teks("tl", 95, 53, "liter", 13, W.biru, { z: 3 })),
      tambah("tangga", emo("st2", 110, 94, E.tangga, 22)),
    ),
    k(
      SUARA_L3,
      bersih(0),
      tambah(0, judul("Dua Kesamaan"), ...lantai("lt", 150)),
      tambah("seribu", ...kartu("c1", 40, 44, 220, 32, W.krem, ["1 l = 1.000 ml"], 14)),
      tambah("sentimeter", ...kartu("c2", 40, 92, 220, 32, W.hijauMuda, ["1 cm³ = 1 ml"], 14)),
      tambah("mililiter@2", emo("ok", 270, 112, E.benar, 22)),
    ),
    k(
      SUARA_L4,
      hapus(0, ...idKartu("c1", 1), ...idKartu("c2", 1), "ok"),
      tambah("Naik", { id: "up", t: "panah", x: 70, y: 120, x2: 0, y2: -60, warna: W.hijauTua, tebal: 3.2 }),
      tambah("membagi", teks("dv", 70, 40, "÷ 1.000", 13, W.hijauTua)),
      tambah("turun", { id: "dn", t: "panah", x: 230, y: 60, x2: 0, y2: 60, warna: W.merah, tebal: 3.2 }),
      tambah("mengalikan", teks("kl", 230, 138, "× 1.000", 13, W.merah)),
    ),
  ],
};

/* ------------------------------ Liter Ladder: terapan ------------------------------ */
const SUARA_T1 = "Satria mengubah tiga liter menjadi mililiter dengan menuruni tangga.";
const SUARA_T2 = "Tiga dikali seribu sama dengan tiga ribu mililiter, dan satuan mililiter ditulis di belakang bilangan itu.";
const SUARA_T3 = "Cocok untuk mengganti satuan volume dengan cepat dan tepat, asalkan kita ingat arah tangganya.";
const SUARA_T4 = "Kurang cocok kalau kita lupa bilangan seribu, karena hasilnya meleset jauh.";

export const ADEGAN_LUAR_TANGGA_TERAPAN: AdeganStory = {
  id: "luar-tangga-terapan",
  judul: "Liter Ladder: terapan",
  sumber: "Metode global: Liter Ladder (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Satria Menuruni Tangga"), ...lantai("lt", 150), ...tokoh("sa", 36, 184, "Satria")),
      tambah("tiga", tangga("st", 70, 60), teks("a3", 100, 52, "3 l", 14, W.biru)),
      tambah("mililiter", teks("q", 210, 102, "? ml", 14, W.merah)),
      tambah("menuruni", { id: "dn", t: "panah", x: 165, y: 62, x2: 0, y2: 40, warna: W.merah, tebal: 3 }),
    ),
    k(
      SUARA_T2,
      tambah("dikali", teks("hk", 150, 84, "3 × 1.000", 13, W.biru)),
      ubah("ribu", { id: "q", isi: "3.000 ml", warna: W.hijauTua }),
      tambah("satuan", emo("ok", 230, 72, E.benar, 22)),
      tambah("ditulis", { id: "ul", t: "garis", x: 190, y: 108, x2: 46, y2: 0, warna: W.hijauTua, tebal: 2.5 }),
    ),
    k(
      SUARA_T3,
      hapus(0, "hk", "ok", "ul"),
      tambah("Cocok", emo("jp", 262, 140, E.jempol, 22)),
      tambah("cepat", emo("ce", 150, 130, "\u{26A1}", 22)),
      tambah("tepat", emo("tp", 190, 130, E.benar, 22)),
      tambah("arah", teks("ah", 100, 96, "turun / naik", 10, W.ungu)),
    ),
    k(
      SUARA_T4,
      hapus(0, "jp", "ce", "tp", "ah", "dn"),
      tambah("Kurang", emo("xs", 262, 140, E.salah, 22)),
      tambah("lupa", teks("lp", 150, 84, "lupa 1.000", 13, W.merah)),
      ubah("hasilnya", { id: "q", isi: "300 ml", warna: W.merah }),
      tambah("jauh", emo("bm", 250, 100, E.tabrak, 22)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita pelajari bersama Pak Anto. Mana yang pas tergantung keadaan.";
const SUARA_R2 = "Ingin mengukur air langsung, pakai Isi dan Tuang. Ingin menghitung kubus, pakai Susun Lapisan.";
const SUARA_R3 = "Ingin mengganti satuan, pakai Tangga Liter. Apa pun caranya, tulis satuan di belakang bilangannya.";
const SUARA_R4 = "Menurutmu, untuk mengukur air di kolam besar, cara mana yang paling pas?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Ringkasan metode global",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tiga Cara Pak Anto"), ...lantai("lt", 150), teks("n3", 260, 40, "3 cara", 10, W.ungu)),
      tambah("pelajari", ...kartu("r0", 20, 48, 130, 28, W.langit, ["Isi dan Tuang"], 11), ...kartu("r1", 20, 84, 130, 28, W.hijauMuda, ["Susun Lapisan"], 11), ...kartu("r2", 20, 120, 130, 28, W.krem, ["Tangga Liter"], 11)),
      tambah("Anto", ...tokoh("pa", 252, 184, "Pak Anto")),
      tambah("pas", emo("tn", 230, 100, E.tanya, 28)),
    ),
    k(
      SUARA_R2,
      sorotkan("Isi", "r0-k"),
      tambah("Isi", emo("e1", 200, 62, E.gelas, 22)),
      redamkan("Susun", "r0-k"),
      sorotkan("Susun", "r1-k"),
      tambah("kubus", emo("e2", 200, 98, E.dadu, 22)),
    ),
    k(
      SUARA_R3,
      hapus(0, "tn"),
      redamkan("Tangga", "r1-k"),
      sorotkan("Tangga", "r2-k"),
      tambah("pakai", emo("e3", 200, 134, E.tangga, 22)),
      tambah("tulis", teks("sn", 236, 70, "24 cm³", 13, W.hijauTua)),
      tambah("belakang", teks("sn2", 236, 90, "5 ml", 13, W.hijauTua)),
    ),
    k(
      SUARA_R4,
      hapus(0, "sn", "sn2", "e1", "e2", "e3"),
      tambah("kolam", kotak("kl", 170, 70, 110, 50, WL.air, WL.airGaris, { rx: 6, tebal: 2, z: -1 })),
      sorotkan("cara", "r0-k", "r1-k", "r2-k"),
      tambah("pas", teks("qq", 225, 58, "cara mana?", 12, W.merah)),
    ),
  ],
};
