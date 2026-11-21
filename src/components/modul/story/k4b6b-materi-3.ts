import type { AdeganStory } from "./logika-story";
import { DATAR_RINI, E, TEGAK_RINI, W, batangTegak, diagramDatar, diagramTegak, emo, garis, idDiagramDatar, idDiagramTegak, judul, kotak, lantai, panah, papan, papanData, satuanSumbu, skalaTegak, sumbuTegak, tenda, teks, tokoh, ujungTegak, WB, type DataBatang, type OpsiTegak } from "./k4b6b-gambar";
import { hapus, k, sorotkan, tambah } from "./k4b6b-bantu";

/*
 * Cerita orisinal IGIL "Diagram Batang Pak Dodi" (Kelas 4 Bab 6 Sub-Bab B), akhir cerita Bazar Kuliner Sekolah.
 * Naskah suara dari naskah/story-naskah-k4b6b.md. Bagian ini: membandingkan batang (tertinggi, terpendek, selisih, jumlah), diagram diputar menjadi mendatar, dan penutup di papan besar.
 */

const DASAR = (judulAdegan: string) => [judul(judulAdegan), ...lantai("lt", 150), papanData(), ...diagramTegak("dg", TEGAK_RINI), satuanSumbu()];
const [, Y_R] = ujungTegak(TEGAK_RINI, 0);

/* ------------------------------ 7. Membandingkan ------------------------------ */
const SUARA_B1 = "Genta membandingkan semua batang, dan risoles adalah yang tertinggi.";
const SUARA_B2 = "Lemper batang yang terpendek, dan selisihnya dengan risoles lima belas porsi.";
const SUARA_B3 = "Jumlah keempat batang, yaitu tiga puluh, dua puluh, lima belas, dan dua puluh lima, ialah sembilan puluh porsi.";

export const ADEGAN_BANDING: AdeganStory = {
  id: "banding",
  judul: "Membandingkan batang",
  sumber: "Materi: tertinggi, terpendek, selisih, dan jumlah",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, ...DASAR("Genta Membandingkan")),
      tambah(0, ...tokoh("ge", 36, 184, "Genta")),
      sorotkan("risoles", "dg-b0", "dg-n0"),
      tambah("tertinggi", teks("lh", 274, 64, "tertinggi", 8, W.merah), emo("tj", 274, 84, E.jempol, 18)),
    ),
    k(
      SUARA_B2,
      sorotkan("Lemper", "dg-b2", "dg-n2"),
      tambah("terpendek", teks("lp", 274, 106, "terpendek", 8, W.hijauTua)),
      tambah("selisihnya", garis("gb", 44, Y_R, 190, 0, W.merah, 1.6, { putus: true, z: 4 }), panah("br", 170, Y_R + 2, 0, 32, W.ungu, 2, { z: 6 })),
      tambah("risoles", teks("ls", 274, 124, "30 - 15 = 15", 7.5, W.ungu)),
    ),
    k(
      SUARA_B3,
      hapus(0, "lh", "tj", "lp", "gb", "br", "ls"),
      tambah("tiga", teks("c0", 70, 52, "3 puluh", 7.5, W.biru)),
      tambah("dua", teks("c1", 120, 76, "2 puluh", 7.5, W.biru)),
      tambah("lima", teks("c2", 170, 88, "15", 8, W.biru)),
      tambah("dua@2", teks("c3", 220, 64, "2 puluh 5", 7, W.biru)),
      tambah("sembilan", teks("jm0", 274, 76, "jumlah", 8, W.merah), teks("jm1", 274, 90, "9 puluh", 8, W.merah), teks("jm2", 274, 104, "= 90 porsi", 8, W.merah)),
    ),
  ],
};

/* ------------------------------ 8. Diagram mendatar ------------------------------ */
const SUARA_M1 = "Pak Dodi memutar kertas itu, sehingga batang-batangnya kini terbaring mendatar.";
const SUARA_M2 = "Sekarang panjang batang yang dibaca, dan angkanya ada di sumbu yang mendatar.";
const SUARA_M3 = "Dibaca tegak atau mendatar, batang tetap menyatakan banyak yang sama.";
const MINI = [36, 24, 18, 30];

export const ADEGAN_MENDATAR: AdeganStory = {
  id: "mendatar",
  judul: "Diagram diputar mendatar",
  sumber: "Materi: batang tegak diputar menjadi mendatar",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, ...DASAR("Pak Dodi Memutar Kertas"), ...tokoh("pr", 262, 184, "Pak Dodi")),
      tambah("memutar", emo("pt", 274, 64, E.putar, 22)),
      hapus("terbaring", ...idDiagramTegak("dg", 6, 4), "su"),
      tambah("terbaring", ...diagramDatar("dd", DATAR_RINI), teks("sx", 246, 138, "porsi", 8, W.merah, { anchor: "start" })),
    ),
    k(
      SUARA_M2,
      tambah("panjang", teks("lk", 274, 84, "panjang", 8, W.merah)),
      sorotkan("dibaca", "dd-b0", "dd-n0"),
      tambah("dibaca", panah("pj", 86, 58, 146, 0, W.merah, 2, { z: 6 })),
      sorotkan("angkanya", ...Array.from({ length: 7 }, (_, i) => `dd-a${i}`)),
      tambah("mendatar", teks("lm", 274, 102, "angka: bawah", 7.5, W.hijauTua)),
    ),
    k(
      SUARA_M3,
      hapus(0, "lk", "lm", "pt"),
      tambah("tegak", ...MINI.map((h, i) => kotak(`mb${i}`, 252 + i * 12, 128 - h, 9, h, WB[i], W.biru, { rx: 1, tebal: 1.2, z: 5 })), teks("mt", 270, 86, "tegak", 8, W.biru)),
      tambah("batang", teks("sm", 274, 66, "banyak sama", 7.5, W.hijauTua)),
      sorotkan("sama", "mb0", "mb1", "mb2", "mb3", "dd-b0", "dd-b1", "dd-b2", "dd-b3"),
    ),
  ],
};
void idDiagramDatar;

/* ------------------------------ 9. Penutup di papan besar ------------------------------ */
const SUARA_P1 = "Diagram batang selesai dan dipajang di papan besar di tengah bazar.";
const SUARA_P2 = "Pak Hendro berkata, dengan batang, kita bisa membandingkan banyak data dalam satu pandangan.";
const SUARA_P3 = "Menurutmu, data apa lagi di bazar ini yang bisa kita gambar? Terima kasih, Satria, Laras, Genta, Pak Hendro, Bu Rini, dan Pak Dodi!";

const PEN_DATA: DataBatang[] = [
  { nama: "Risoles", banyak: 30 },
  { nama: "Pisang", banyak: 20 },
  { nama: "Lemper", banyak: 15 },
  { nama: "Cincau", banyak: 25 },
];
const PEN: OpsiTegak = { x0: 96, yb: 128, tinggi: 72, n: 6, tingkat: 5, data: PEN_DATA, lebar: 24, jarak: 34 };

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Papan besar di tengah bazar",
  sumber: "Materi: diagram batang dipajang di bazar",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Papan Besar di Bazar"), ...lantai("lt", 150), papan("pb", 72, 34, 160, 114), ...sumbuTegak("pd", PEN), ...skalaTegak("pd", PEN), teks("su2", 98, 43, "porsi", 8, W.merah, { anchor: "start" })),
      tambah("selesai", ...batangTegak("pd", PEN)),
      tambah("dipajang", emo("kl", 150, 28, E.kilau, 12)),
      tambah("bazar", ...tenda("td1", 8, 60, 56), ...tenda("td2", 236, 60, 56)),
    ),
    k(
      SUARA_P2,
      tambah("Hendro", ...tokoh("ph", 168, 184, "Pak Hendro")),
      sorotkan("membandingkan", "pd-b0", "pd-b1", "pd-b2", "pd-b3"),
      tambah("satu", teks("l1", 274, 128, "1 pandangan", 8, W.merah)),
    ),
    k(
      SUARA_P3,
      tambah("Menurutmu", emo("tn", 28, 128, E.tanya, 20)),
      tambah("Satria", ...tokoh("sa", 24, 184, "Satria")),
      tambah("Laras", ...tokoh("la", 72, 184, "Laras")),
      tambah("Genta", ...tokoh("ge", 120, 184, "Genta")),
      tambah("Rini", ...tokoh("br", 216, 184, "Bu Rini")),
      tambah("Dodi", ...tokoh("pr", 264, 184, "Pak Dodi"), emo("kf", 150, 160, E.konfeti, 18)),
    ),
  ],
};
void diagramTegak;
void batangTegak;
