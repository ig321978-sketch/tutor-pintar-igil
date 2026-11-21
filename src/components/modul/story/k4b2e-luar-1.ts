import type { AdeganStory } from "./logika-story";
import { E, W, emo, garis, idDari, judul, kartu, halaman, kotak, panah, papanPameran, teks, tokoh } from "./k4b2e-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k4b2e-bantu";

/*
 * Cerita orisinal IGIL "Papan Pameran Bu Tuti" (Kelas 4 Bab 2 Sub-Bab E), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b2e.md. Bagian ini: pembuka (map Bu Tuti), Percent as Hundredths (Persen Perseratusan), dan terapannya.
 */

export const NAMA_METODE = ["Percent as Hundredths", "Hundred Grid", "Decimal Percent Bridge"] as const;
export const NAMA_METODE_ID = ["Persen Perseratusan", "Kisi Seratus", "Jembatan Persen"] as const;

const KUNING_KARTU = "#FEF3C7";

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Malam itu, di dekat papan pameran, Bu Tuti membuka map berisi cara-cara menulis persen.";
const SUARA_O2 = "Di dalamnya ada tiga cara supaya desimal dan persen mudah diubah, tanpa tertukar.";
const SUARA_O3 = "Tiga cara itu: Percent as Hundredths, Hundred Grid, dan Decimal Percent Bridge.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Persen Perseratusan, Kisi Seratus, dan Jembatan Persen.";
const MAP = [kotak("mp", 78, 104, 62, 40, "#C99A63", W.coklat, { rx: 3, z: 1 }), kotak("mt", 74, 96, 70, 10, "#A16207", W.coklat, { rx: 3, z: 2 }), ...[0, 1, 2].map((i) => kotak(`ml${i}`, 86 + i * 18, 76, 14, 22, W.putih, W.biru, { rx: 2, z: 2 }))];

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Map Bu Tuti",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Malam di Pameran"), ...halaman("hl", 150)),
      tambah("papan", ...papanPameran("pp", 180, 48, 100, 70, "PAPAN", 150, 9)),
      tambah("Tuti", ...tokoh("bt", 52, 184, "Bu Tuti")),
      tambah("map", ...MAP),
      tambah("persen", teks("pm", 111, 66, "%", 16, W.merah)),
    ),
    k(
      SUARA_O2,
      hapus(0, ...idDari(MAP), "pm"),
      tambah("tiga", teks("n3", 236, 138, "3 cara", 11, W.ungu)),
      tambah("desimal", ...kartu("cd", 14, 54, 70, 34, KUNING_KARTU, ["desimal"], 10)),
      tambah("persen", ...kartu("cp", 100, 54, 60, 34, KUNING_KARTU, ["persen"], 10)),
      tambah("tertukar", emo("ok", 130, 112, E.benar, 20), teks("tl", 80, 130, "tidak tertukar", 9, W.hijauTua)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara"), teks("n3", 260, 40, "3 cara", 10, W.ungu)),
      tambah("Percent", teks("m0", 118, 70, "1. Percent as Hundredths", 10, W.biru), emo("i0", 28, 72, E.seratus, 16)),
      tambah("Grid", teks("m1", 118, 120, "2. Hundred Grid", 10, W.biru), emo("i1", 28, 122, E.palet, 16)),
      tambah("Decimal", teks("m2", 118, 170, "3. Decimal Percent Bridge", 10, W.biru), emo("i2", 28, 172, E.jembatan, 16)),
    ),
    k(
      SUARA_O4,
      tambah("Persen", teks("g0", 244, 70, "Persen Perseratusan", 8, W.ungu), garis("l0", 204, 74, 80, 0, W.ungu, 1)),
      tambah("Kisi", teks("g1", 244, 120, "Kisi Seratus", 8, W.ungu), garis("l1", 204, 124, 80, 0, W.ungu, 1)),
      tambah("Jembatan", teks("g2", 244, 170, "Jembatan Persen", 8, W.ungu), garis("l2", 204, 174, 80, 0, W.ungu, 1)),
    ),
  ],
};

/* ------------------------------ Percent as Hundredths: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Percent as Hundredths, atau Persen Perseratusan.";
const SUARA_C2 = "Persen artinya per seratus, jadi setiap persen adalah satu bagian dari seratus bagian.";
const SUARA_C3 = "Kita menulis pecahan dengan penyebut seratus, lalu pembilangnya menjadi angka persen.";
const SUARA_C4 = "Penyebut seratus memberi kita jalan pintas langsung ke persen.";

export const ADEGAN_LUAR_PERSERATUS: AdeganStory = {
  id: "luar-perseratus",
  judul: "Percent as Hundredths: Persen Perseratusan",
  sumber: "Metode global: Percent as Hundredths (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 1: Percent as Hundredths"), ...halaman("hl", 150)),
      tambah("Percent", emo("jr", 150, 104, E.seratus, 36)),
      tambah("Persen", teks("nm", 150, 140, "Persen Perseratusan", 13, W.ungu)),
    ),
    k(
      SUARA_C2,
      hapus(0, "jr", "nm"),
      tambah(0, teks("pc", 60, 70, "%", 30, W.merah)),
      tambah("seratus", ...kartu("sk", 110, 40, 100, 26, W.krem, ["per 100"], 12)),
      tambah("jadi", teks("e1", 150, 100, "1%", 24, W.biru)),
      tambah("satu", teks("e2", 150, 124, "= 1 bagian dari 100", 11, W.coklat)),
    ),
    k(
      SUARA_C3,
      hapus(0, "pc", "e1", "e2", "sk-k", "sk-t0"),
      tambah("pecahan", teks("fa", 90, 66, "p", 18, W.biru), garis("fg", 70, 72, 40, 0, W.biru, 2)),
      tambah("penyebut", teks("fb", 90, 92, "100", 18, W.merah)),
      tambah("pembilangnya", teks("ar", 150, 84, "=", 18, W.biru)),
      sorotkan("pembilangnya", "fa"),
      tambah("persen", teks("pp", 200, 84, "p%", 22, W.merah)),
    ),
    k(
      SUARA_C4,
      tambah("memberi", teks("pn", 150, 40, "penyebut 100", 11, W.coklat)),
      tambah("jalan", panah("jp", 112, 118, 66, 0, W.merah, 2.4, { z: 4 })),
      tambah("pintas", emo("pt", 150, 140, E.petir, 24)),
      sorotkan("persen", "pp"),
    ),
  ],
};

/* ------------------------------ Percent as Hundredths: terapan ------------------------------ */
const SUARA_P1 = "Laras mengubah tiga puluh per seratus menjadi persen.";
const SUARA_P2 = "Pembilangnya tiga puluh, jadi hasilnya tiga puluh persen.";
const SUARA_P3 = "Cocok untuk pecahan yang penyebutnya sudah seratus, karena tinggal menyalin pembilangnya.";
const SUARA_P4 = "Kurang cocok untuk pecahan dengan penyebut lain, karena harus diubah dulu menjadi per seratus.";

export const ADEGAN_LUAR_PERSERATUS_TERAPAN: AdeganStory = {
  id: "luar-perseratus-terapan",
  judul: "Percent as Hundredths: terapan",
  sumber: "Metode global: Percent as Hundredths (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Tiga Puluh per Seratus"), ...halaman("hl", 150), ...tokoh("la", 36, 184, "Laras")),
      tambah("tiga", teks("fa", 120, 60, "30", 20, W.biru), garis("fg", 98, 66, 44, 0, W.biru, 2), teks("fb", 120, 90, "100", 20, W.biru)),
      tambah("menjadi", panah("ar", 152, 78, 24, 0, W.merah, 2.4, { z: 4 })),
      tambah("persen", teks("p30", 212, 80, "?%", 24, W.merah)),
    ),
    k(
      SUARA_P2,
      sorotkan("Pembilangnya", "fa"),
      ubah("jadi", { id: "p30", isi: "30%" }),
      tambah("hasilnya", teks("tx", 150, 112, "pembilang = persen", 10, W.coklat)),
      tambah("persen", emo("ok", 262, 80, E.benar, 20)),
    ),
    k(
      SUARA_P3,
      hapus(0, "tx"),
      tambah("Cocok", emo("jp", 262, 130, E.jempol, 22)),
      tambah("penyebutnya", teks("tb", 200, 122, "penyebut 100", 10, W.hijauTua)),
      tambah("menyalin", teks("sa", 90, 122, "salin 30", 10, W.coklat)),
    ),
    k(
      SUARA_P4,
      hapus(0, "jp", "tb", "sa"),
      tambah(0, emo("xs", 262, 130, E.salah, 22)),
      tambah("penyebut", teks("q1", 215, 110, "1/4", 18, W.biru)),
      tambah("diubah", teks("q2", 215, 136, "harus jadi ?/100", 10, W.merah)),
    ),
  ],
};
