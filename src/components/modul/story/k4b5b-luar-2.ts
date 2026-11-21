import type { AdeganStory } from "./logika-story";
import { E, G, W, emo, garis, garisKeSudut, idIrisan, idKartu, irisan, judul, kartu, kotak, lantai, meja, poli, teks, titikBeraturan, titikPusat, tokoh, type Tt } from "./k4b5b-gambar";
import { hapus, k, pudarkan, redamkan, sorotkan, tambah } from "./k4b5b-bantu";

/*
 * Cerita orisinal IGIL "Mosaik Pak Rudi" (Kelas 4 Bab 5 Sub-Bab B), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b5b.md. Bagian ini: Cut Into Triangles (Bagi Jadi Segitiga), Many Ways Mosaic (Mosaik Banyak Cara), terapannya, dan ringkasan.
 */

const SEGITIGA_E = "\u{1F53A}";

/* ------------------------------ Cut Into Triangles: konsep ------------------------------ */
const SUARA_Y1 = "Cara kedua, Cut Into Triangles, atau Bagi Jadi Segitiga.";
const SUARA_Y2 = "Kita menarik garis dari satu titik ke sudut-sudut sebuah bangun, sehingga bangun terbagi menjadi segitiga.";
const SUARA_Y3 = "Dari titik tengah, banyak segitiga sama dengan banyak sisi bangun beraturan itu.";
const SUARA_Y4 = "Dari satu sudut, segiempat terbagi menjadi dua segitiga.";
const PUSAT_ENAM: Tt = [150, 86];
const ENAM: Tt[] = titikBeraturan(PUSAT_ENAM[0], PUSAT_ENAM[1], 30, 6, 0);
const SEGIEMPAT: Tt[] = [[112, 70], [196, 64], [204, 108], [118, 110]];

export const ADEGAN_LUAR_BAGI: AdeganStory = {
  id: "luar-bagi",
  judul: "Cut Into Triangles: Bagi Jadi Segitiga",
  sumber: "Metode global: Cut Into Triangles (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_Y1,
      tambah(0, judul("Cara 2: Cut Into Triangles"), ...lantai("lt", 150)),
      tambah("Cut", emo("gt", 110, 112, E.gunting, 40)),
      tambah("Bagi", teks("nm", 150, 140, "Bagi Jadi Segitiga", 13, W.ungu)),
      tambah("Segitiga", emo("sg", 190, 104, SEGITIGA_E, 28)),
    ),
    k(
      SUARA_Y2,
      hapus(0, "gt", "nm", "sg"),
      tambah(0, poli("hx", ENAM, G.hijau)),
      tambah("satu", teks("n1", 72, 64, "1 titik", 11, W.merah)),
      tambah("titik", titikPusat("ct", PUSAT_ENAM)),
      tambah("sudut-sudut", ...garisKeSudut("g", PUSAT_ENAM, ENAM)),
      hapus("terbagi", "hx"),
      tambah("terbagi", ...irisan("t", PUSAT_ENAM, ENAM)),
    ),
    k(
      SUARA_Y3,
      tambah("segitiga", ...kartu("kc", 10, 96, 100, 26, W.krem, ["segitiga = sisi"], 10)),
      sorotkan("sisi", ...idIrisan("t", 6)),
    ),
    k(
      SUARA_Y4,
      hapus(0, ...idIrisan("t", 6), ...idIrisan("g", 6), "ct", "n1", ...idKartu("kc", 1)),
      tambah("satu", teks("n1", 70, 64, "1 sudut", 11, W.merah), titikPusat("vp", SEGIEMPAT[0], 3)),
      tambah("segiempat", poli("qd", SEGIEMPAT, G.biru)),
      tambah("terbagi", garis("dg", SEGIEMPAT[0][0], SEGIEMPAT[0][1], SEGIEMPAT[2][0] - SEGIEMPAT[0][0], SEGIEMPAT[2][1] - SEGIEMPAT[0][1], W.merah, 2, { z: 6 })),
      hapus("menjadi", "qd"),
      tambah("menjadi", poli("q0", [SEGIEMPAT[0], SEGIEMPAT[1], SEGIEMPAT[2]], G.kuning), poli("q1", [SEGIEMPAT[0], SEGIEMPAT[2], SEGIEMPAT[3]], G.hijau)),
      tambah("dua", teks("n2", 232, 50, "2 segitiga", 11, W.merah)),
    ),
  ],
};

/* ------------------------------ Cut Into Triangles: terapan ------------------------------ */
const SUARA_B1 = "Genta membelah keramik segilima beraturan dari titik tengahnya.";
const SUARA_B2 = "Segilima punya lima sisi, sehingga ia mendapat lima segitiga yang sama besar.";
const SUARA_B3 = "Cocok untuk memahami bangun rumit, karena segitiga adalah bagian yang paling sederhana.";
const SUARA_B4 = "Kurang cocok kalau titiknya tidak tepat di tengah, karena segitiganya jadi tidak sama besar.";
const PUSAT_LIMA: Tt = [150, 84];
export const SEGILIMA: Tt[] = titikBeraturan(PUSAT_LIMA[0], PUSAT_LIMA[1], 34, 5, -90);
const TITIK_MELESET: Tt = [170, 92];

export const ADEGAN_LUAR_BAGI_TERAPAN: AdeganStory = {
  id: "luar-bagi-terapan",
  judul: "Cut Into Triangles: terapan",
  sumber: "Metode global: Cut Into Triangles (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Genta Membelah Segilima"), ...lantai("lt", 150), ...meja("mj", 14, 232)),
      tambah("Genta", ...tokoh("ge", 36, 184, "Genta")),
      tambah("segilima", poli("pn", SEGILIMA, G.pink)),
      tambah("titik", titikPusat("ct", PUSAT_LIMA)),
      tambah("tengahnya", ...garisKeSudut("g", PUSAT_LIMA, SEGILIMA)),
    ),
    k(
      SUARA_B2,
      tambah("lima@2", teks("a5", 72, 64, "5 sisi", 11, W.merah)),
      hapus("lima@3", "pn"),
      tambah("lima@3", ...irisan("t", PUSAT_LIMA, SEGILIMA)),
      tambah("segitiga", teks("b5", 228, 64, "5 segitiga", 11, W.merah)),
    ),
    k(
      SUARA_B3,
      tambah("Cocok", emo("jp", 262, 140, E.jempol, 22)),
      sorotkan("segitiga", "t-0"),
      tambah("sederhana", teks("sd", 150, 134, "bagian paling sederhana", 9, W.hijauTua)),
    ),
    k(
      SUARA_B4,
      hapus(0, "jp", ...idIrisan("t", 5), ...idIrisan("g", 5), "ct", "a5", "b5", "sd"),
      tambah("Kurang", emo("xs", 262, 140, E.salah, 22)),
      tambah("titiknya", titikPusat("cp", TITIK_MELESET)),
      tambah("tengah", ...irisan("u", TITIK_MELESET, SEGILIMA, [G.biru, G.hijau, G.kuning, G.ungu, G.oranye])),
      tambah("besar", teks("nb", 150, 134, "tidak sama besar", 9, W.merah)),
    ),
  ],
};

/* ------------------------------ Many Ways Mosaic: konsep ------------------------------ */
const SUARA_M1 = "Cara ketiga, Many Ways Mosaic, atau Mosaik Banyak Cara.";
const SUARA_M2 = "Kita mencari sebanyak mungkin susunan dari keping yang sama, lalu memilih yang paling indah.";
const SUARA_M3 = "Satu bangun bisa disusun dari bagian yang berbeda-beda, dan hasilnya tetap sama besar.";
const SUARA_M4 = "Mencoba banyak susunan melatih mata kita melihat hubungan antar bangun.";
const KS = 20;
const YB = 112;
const PUSAT_KIRI: Tt = [80, 90];
const PUSAT_KANAN: Tt = [220, 90];
const HEX_KIRI: Tt[] = titikBeraturan(PUSAT_KIRI[0], PUSAT_KIRI[1], 24, 6, 0);
const HEX_KANAN: Tt[] = titikBeraturan(PUSAT_KANAN[0], PUSAT_KANAN[1], 24, 6, 0);
const BELAH_ID = ["a0", "a1", "b0", "b1", "c0", "c1"];

export const ADEGAN_LUAR_MOSAIK: AdeganStory = {
  id: "luar-mosaik",
  judul: "Many Ways Mosaic: Mosaik Banyak Cara",
  sumber: "Metode global: Many Ways Mosaic (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Cara 3: Many Ways Mosaic"), ...lantai("lt", 150)),
      tambah("Many", emo("pl", 110, 112, E.palet, 40)),
      tambah("Mosaik", teks("nm", 150, 140, "Mosaik Banyak Cara", 13, W.ungu)),
      tambah("Banyak", emo("kl", 190, 104, E.kilau, 28)),
    ),
    k(
      SUARA_M2,
      hapus(0, "pl", "nm", "kl"),
      tambah(0, ...meja("mj", 14, 260)),
      tambah("mencari", poli("a0", [[40, YB], [40 + KS, YB], [40, YB - KS]], G.biru), poli("a1", [[40 + KS, YB - KS], [40 + KS, YB], [40, YB - KS]], G.kuning)),
      tambah("sebanyak", poli("b0", [[120, YB], [120 + KS, YB], [120 + KS, YB - KS]], G.biru), poli("b1", [[120 + KS, YB], [120 + 2 * KS, YB - KS], [120 + KS, YB - KS]], G.kuning)),
      tambah("susunan", poli("c0", [[220, YB], [220 + KS, YB], [220 + KS, YB - KS]], G.biru), poli("c1", [[220 + KS, YB], [220 + 2 * KS, YB], [220 + KS, YB - KS]], G.kuning)),
      tambah("sama,", teks("ks", 150, 54, "keping yang sama", 10, W.hijauTua)),
      sorotkan("memilih", "b0", "b1"),
      tambah("indah", emo("ht", 140, 88, E.hati, 22)),
    ),
    k(
      SUARA_M3,
      hapus(0, ...BELAH_ID, "ks", "ht"),
      tambah("Satu", teks("n1", 150, 44, "1 bangun", 11, W.merah)),
      tambah("disusun", poli("hx", HEX_KIRI, undefined), ...irisan("h", PUSAT_KIRI, HEX_KIRI)),
      tambah(
        "berbeda-beda",
        poli("r0", [PUSAT_KANAN, HEX_KANAN[0], HEX_KANAN[1], HEX_KANAN[2]], G.biru),
        poli("r1", [PUSAT_KANAN, HEX_KANAN[2], HEX_KANAN[3], HEX_KANAN[4]], G.hijau),
        poli("r2", [PUSAT_KANAN, HEX_KANAN[4], HEX_KANAN[5], HEX_KANAN[0]], G.pink),
      ),
      tambah("sama", teks("eq", 150, 98, "=", 20, W.merah)),
    ),
    k(
      SUARA_M4,
      hapus(0, "hx", ...idIrisan("h", 6), "r0", "r1", "r2", "n1", "eq"),
      tambah("Mencoba", emo("pz", 66, 86, E.puzzle, 26), emo("ps", 234, 86, E.palet, 26)),
      tambah("mata", emo("my", 150, 92, E.mata, 40)),
      tambah("hubungan", teks("hb", 150, 134, "hubungan antar bangun", 9, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ Many Ways Mosaic: terapan ------------------------------ */
const SUARA_Z1 = "Satria menyusun persegi dari dua segitiga, lalu dari empat segitiga yang lebih kecil.";
const SUARA_Z2 = "Kedua susunan itu berbeda, tetapi sama-sama membentuk persegi yang utuh.";
const SUARA_Z3 = "Cocok untuk membuat pola lantai dan dinding, karena pilihan susunannya banyak.";
const SUARA_Z4 = "Kurang cocok kalau kita berhenti pada satu cara saja, karena kita melewatkan susunan lain.";
const KIRI: Tt[] = [[78, 68], [122, 68], [122, 112], [78, 112]];
const PK: Tt = [192, 90];
const KANAN: Tt[] = [[170, 68], [214, 68], [214, 112], [170, 112]];
const PAL = [[G.biru, G.kuning], [G.hijau, G.pink], [G.ungu, G.oranye]] as const;
/** Pola lantai: `n` ubin persegi (dua segitiga tiap ubin) berderet, ubin ke-i berid `pl-i-a` dan `pl-i-b`. */
const polaLantai = (n: number, x: number, y: number, s: number): ReturnType<typeof poli>[] =>
  Array.from({ length: n }, (_, i) => {
    const a = x + i * s;
    const [wa, wb] = PAL[i % PAL.length];
    return i % 2 === 0
      ? [poli(`pl-${i}-a`, [[a, y], [a + s, y], [a + s, y + s]], wa), poli(`pl-${i}-b`, [[a, y], [a + s, y + s], [a, y + s]], wb)]
      : [poli(`pl-${i}-a`, [[a, y], [a + s, y], [a, y + s]], wa), poli(`pl-${i}-b`, [[a + s, y], [a + s, y + s], [a, y + s]], wb)];
  }).flat();
const idPola = (n: number): string[] => Array.from({ length: n }, (_, i) => [`pl-${i}-a`, `pl-${i}-b`]).flat();

export const ADEGAN_LUAR_MOSAIK_TERAPAN: AdeganStory = {
  id: "luar-mosaik-terapan",
  judul: "Many Ways Mosaic: terapan",
  sumber: "Metode global: Many Ways Mosaic (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Satria Menyusun Persegi"), ...lantai("lt", 150), ...meja("mj", 14, 260)),
      tambah("Satria", ...tokoh("sa", 36, 184, "Satria")),
      tambah("dua", poli("d0", [KIRI[0], KIRI[1], KIRI[2]], G.biru), poli("d1", [KIRI[0], KIRI[2], KIRI[3]], G.kuning), teks("n2", 100, 56, "2 segitiga", 11, W.merah)),
      tambah(
        "empat",
        poli("e0", [KANAN[0], KANAN[1], PK], G.hijau),
        poli("e1", [KANAN[1], KANAN[2], PK], G.pink),
        poli("e2", [KANAN[2], KANAN[3], PK], G.ungu),
        poli("e3", [KANAN[3], KANAN[0], PK], G.oranye),
        teks("n4", 192, 56, "4 segitiga", 11, W.merah),
      ),
    ),
    k(
      SUARA_Z2,
      sorotkan("berbeda", "d0", "d1"),
      tambah("membentuk", poli("o1", KIRI, undefined, W.ungu, { tebal: 2.6, z: 5 }), poli("o2", KANAN, undefined, W.ungu, { tebal: 2.6, z: 5 })),
      tambah("utuh", emo("ok", 146, 92, E.benar, 22), teks("sp", 150, 134, "sama-sama persegi", 9, W.hijauTua)),
    ),
    k(
      SUARA_Z3,
      tambah("Cocok", emo("jp", 262, 140, E.jempol, 22)),
      tambah("pola", ...polaLantai(9, 70, 156, 20)),
      tambah("banyak", emo("kl", 262, 100, E.kilau, 22)),
    ),
    k(
      SUARA_Z4,
      hapus(0, "jp", "kl", "ok", "sp", ...idPola(9)),
      tambah("Kurang", emo("xs", 262, 140, E.salah, 22)),
      tambah("satu", teks("n1", 150, 134, "1 cara saja", 10, W.merah)),
      pudarkan("melewatkan", "e0", "e1", "e2", "e3", "n4", "o2"),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita pelajari bersama Pak Rudi. Mana yang pas tergantung keadaan.";
const SUARA_R2 = "Ingin membuat bangun baru, pakai Pasang Keping. Ingin membagi bangun rumit, pakai Bagi Jadi Segitiga.";
const SUARA_R3 = "Ingin mencari pola yang indah, pakai Mosaik Banyak Cara. Apa pun caranya, periksa bahwa tidak ada celah.";
const SUARA_R4 = "Menurutmu, untuk menghias dinding yang luas, cara mana yang paling pas?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Ringkasan metode global",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tiga Cara Pak Rudi"), ...lantai("lt", 150), teks("n3", 260, 40, "3 cara", 10, W.ungu)),
      tambah("pelajari", ...kartu("r0", 20, 48, 130, 28, G.biru, ["Pasang Keping"], 11), ...kartu("r1", 20, 84, 130, 28, G.hijau, ["Bagi Jadi Segitiga"], 11), ...kartu("r2", 20, 120, 130, 28, W.krem, ["Mosaik Banyak Cara"], 11)),
      tambah("Rudi", ...tokoh("pr", 252, 184, "Pak Rudi")),
      tambah("pas", emo("tn", 230, 100, E.tanya, 28)),
    ),
    k(
      SUARA_R2,
      sorotkan("Pasang", "r0-k"),
      tambah("Pasang", emo("e1", 200, 62, E.puzzle, 22)),
      redamkan("Bagi", "r0-k"),
      sorotkan("Bagi", "r1-k"),
      tambah("membagi", emo("e2", 200, 98, E.gunting, 22)),
    ),
    k(
      SUARA_R3,
      hapus(0, "tn"),
      redamkan("Mosaik", "r1-k"),
      sorotkan("Mosaik", "r2-k"),
      tambah("pakai", emo("e3", 200, 134, E.palet, 22)),
      tambah("celah", teks("tc", 252, 76, "tanpa celah", 11, W.hijauTua), emo("ok", 252, 106, E.benar, 22)),
    ),
    k(
      SUARA_R4,
      hapus(0, "tc", "ok", "e1", "e2", "e3", "n3"),
      tambah("dinding", kotak("dn", 172, 56, 110, 60, "#E0F2FE", W.coklat, { rx: 2, tebal: 2.4, z: -1 })),
      sorotkan("cara", "r0-k", "r1-k", "r2-k"),
      tambah("pas", teks("qq", 227, 44, "cara mana?", 12, W.merah)),
    ),
  ],
};
