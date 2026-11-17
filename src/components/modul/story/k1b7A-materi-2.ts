import type { AdeganStory } from "./logika-story";
import { E, W, WT, Y_TANAH, TIANG, emo, geserTiang, judul, kartu, orang, panah, putus, tali, tanah, teks, tiang } from "./k1b7A-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k1b7A-bantu";

/*
 * Cerita orisinal IGIL "Tiang dan Tangga" (Kelas 1 Bab 7 Sub-Bab A). Naskah suara dari naskah/story-naskah-k1b7a.md.
 * Bagian ini: sama tinggi (dengan tupai), paling tinggi dan paling pendek, dan menyusun tangga.
 */

/* ------------------------------ 4. Sama tinggi ------------------------------ */
const SUARA_S1 = "Tiang hijau diberdirikan. Ujungnya sejajar dengan tiang merah. Keduanya sama tinggi.";
const SUARA_S2 = "Abang menarik tali lurus di ujung keduanya. Pas! Tidak ada yang lebih tinggi.";
const SUARA_S3 = "Tiba-tiba seekor tupai melompat ke ujung tiang, mengerik, dan menyombong! Semua tertawa.";

export const ADEGAN_SAMA_TINGGI: AdeganStory = {
  id: "sama-tinggi",
  judul: "Sama tinggi dan tupai lucu",
  sumber: "Materi: sama tinggi",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_S1,
      bersih(0),
      tambah(0, judul("Sama tinggi?"), tanah("tn")),
      tambah("hijau", ...tiang("th", 190, Y_TANAH, 56, WT.hijau)),
      tambah("merah.", ...tiang("tm", 110, Y_TANAH, 56, WT.merah)),
      tambah("sejajar", putus("gu", 90, Y_TANAH - 56, 210, Y_TANAH - 56, W.biru, 1.6)),
      tambah("sama", ...kartu("st", 106, 34, 88, 22, WT.kuning, ["sama tinggi"], 10)),
    ),
    k(
      SUARA_S2,
      hapus(0, "gu"),
      tambah("Abang", ...orang("ab", 44, 176, E.abang, "Abang")),
      tambah("tali", tali("tl", 104, Y_TANAH - 59, 92, WT.tali)),
      tambah("Pas!", teks("ps", 150, 100, "pas!", 14, W.hijau)),
      tambah("lebih", teks("tt", 150, 168, "tidak ada yang lebih tinggi", 9, W.biru)),
    ),
    k(
      SUARA_S3,
      hapus(0, "ps", "st-k", "st-t0"),
      tambah("tupai", emo("tu", 252, 140, E.tupai, 22)),
      ubah("melompat", { id: "tu", x: 110, y: Y_TANAH - 62 }),
      tambah("mengerik,", ...kartu("ct", 128, 40, 64, 20, W.putih, ["cit cit!"], 9.4)),
      tambah("menyombong!", teks("sb", 150, 28, "tupai menyombong", 9, W.merah)),
      tambah("tertawa.", emo("tw0", 44, 150, E.tertawa, 24), emo("tw1", 256, 176, E.tertawa, 24)),
    ),
  ],
};

/* ------------------------------ 5. Paling tinggi dan paling pendek ------------------------------ */
const SUARA_M1 = "Sekarang ada empat tiang. Kuning lebih tinggi dari semua yang lain, jadi kuning paling tinggi.";
const SUARA_M2 = "Tiang biru lebih pendek dari semuanya, jadi biru paling pendek.";
const SUARA_M3 = "Dua benda memakai kata lebih. Tiga benda atau lebih memakai kata paling.";
const X5 = { tm: 80, tk: 120, th: 160, tb: 200 } as const;

export const ADEGAN_PALING: AdeganStory = {
  id: "paling",
  judul: "Paling tinggi dan paling pendek",
  sumber: "Materi: paling, tiga benda atau lebih",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_M1,
      bersih(0),
      tambah(0, tanah("tn")),
      tambah("Sekarang", teks("jd", 150, 18, "Tiang yang mana paling tinggi?", 11, W.ungu)),
      tambah("empat", teks("em", 260, 130, "4 tiang", 10, W.biru)),
      tambah("tiang.", ...(Object.entries(TIANG) as [keyof typeof X5, { h: number; w: string }][]).flatMap(([id, t]) => tiang(id, X5[id], Y_TANAH, t.h, t.w))),
      sorotkan("Kuning", "tk"),
      tambah("paling", emo("mk", 120, 62, E.mahkota, 20)),
      tambah("tinggi.", ...kartu("pt", 62, 34, 116, 22, WT.kuning, ["kuning paling tinggi"], 9.4)),
    ),
    k(
      SUARA_M2,
      ubah(0, { id: "tk", sorot: false }),
      hapus(0, "mk", "pt-k", "pt-t0"),
      sorotkan("biru", "tb"),
      tambah("pendek", emo("ar", 200, 100, "\u{2B07}\u{FE0F}", 20)),
      tambah("paling", ...kartu("pp", 150, 34, 124, 22, "#BFDBFE", ["biru paling pendek"], 9.4)),
    ),
    k(
      SUARA_M3,
      bersih(0),
      tambah(0, judul("Lebih dan paling")),
      tambah("Dua", ...kartu("k2", 20, 36, 260, 40, W.krem, ["2 benda: kata lebih"], 12), ...tiang("a2", 60, 134, 44, WT.kuning), ...tiang("b2", 90, 134, 28, WT.merah)),
      tambah("Tiga", ...kartu("k3", 20, 96, 260, 40, W.pink, ["3 benda atau lebih: kata paling"], 11)),
    ),
  ],
};

/* ------------------------------ 6. Tangga ------------------------------ */
const SUARA_T1 = "Abang menyusun tangga. Dari paling pendek: biru, merah, hijau, lalu kuning.";
const SUARA_T2 = "Merah dan hijau sama tinggi, jadi boleh bertukar tempat.";
const SUARA_T3 = "Mamah mencoba menaiki tangga. Landai dan tidak goyang.";
const XT = { tb: 100, tm: 130, th: 160, tk: 190 } as const;

export const ADEGAN_TANGGA: AdeganStory = {
  id: "tangga",
  judul: "Menyusun tangga dari yang pendek",
  sumber: "Materi: urutan, tangga rumah pohon",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_T1,
      bersih(0),
      tambah(0, judul("Tangga rumah pohon"), tanah("tn")),
      tambah("Abang", ...orang("ab", 44, 176, E.abang, "Abang")),
      tambah("biru,", ...tiang("tb", XT.tb, Y_TANAH, 36, WT.biru)),
      tambah("merah,", ...tiang("tm", XT.tm, Y_TANAH, 56, WT.merah)),
      tambah("hijau,", ...tiang("th", XT.th, Y_TANAH, 56, WT.hijau)),
      tambah("kuning.", ...tiang("tk", XT.tk, Y_TANAH, 72, WT.kuning)),
      tambah("pendek:", panah("pa", 100, 172, 200, 172, W.merah), teks("pl", 150, 164, "dari paling pendek", 9, W.merah)),
    ),
    k(
      SUARA_T2,
      sorotkan("Merah", "tm"),
      sorotkan("hijau", "th"),
      tambah("bertukar", panah("p1", 138, 100, 152, 100, W.biru, { tebal: 2.4 }), panah("p2", 152, 108, 138, 108, W.biru, { tebal: 2.4 })),
      ubah("tempat.", ...geserTiang("tm", XT.th, Y_TANAH, 56), ...geserTiang("th", XT.tm, Y_TANAH, 56), { id: "tm", sorot: false }, { id: "th", sorot: false }),
      tambah("tempat.", teks("sm", 150, 38, "sama tinggi: boleh bertukar", 9.4, W.biru)),
    ),
    k(
      SUARA_T3,
      hapus(0, "p1", "p2", "sm", "pl", "pa"),
      tambah("Mamah", ...orang("mm", 70, 176, E.mamah, "Mamah")),
      ubah("menaiki", { id: "mm", x: 192, y: 72 }, { id: "mm-n", x: 192, y: 85 }),
      tambah("Landai", putus("ln", 100, Y_TANAH - 36, 190, Y_TANAH - 72, W.merah, 2), teks("lm", 100, 92, "landai", 9.4, W.merah)),
      tambah("goyang.", emo("ok", 236, 120, E.benar, 24), teks("tg", 236, 144, "tidak goyang", 9, W.hijau)),
    ),
  ],
};
