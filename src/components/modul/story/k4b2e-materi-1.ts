import type { AdeganStory, Obj } from "./logika-story";
import { E, W, emo, garis, judul, kartu, halaman, kisi, lampion, papanPameran, teks, tokoh, warnai } from "./k4b2e-gambar";
import { hapus, k, sorotkan, tambah, ubah } from "./k4b2e-bantu";

/*
 * Cerita orisinal IGIL "Papan Pameran Bu Tuti" (Kelas 4 Bab 2 Sub-Bab E, desimal perseratusan dan persen), akhir cerita Sanggar Batik Kampung Mekar.
 * Naskah suara dari naskah/story-naskah-k4b2e.md. Bagian ini: hari pameran, arti persen, dan desimal sebagai persen (nol koma tujuh lima sama dengan tujuh puluh lima persen).
 */

/** Tali lampion di atas halaman: tali `${id}-tl` dan `n` lampion `${id}0`, `${id}1`, ... (padam atau menyala), mulai x = 34, selang 46. */
export const taliLampion = (id: string, y: number, n: number, nyala = false): Obj[] => [
  garis(`${id}-tl`, 20, y - 12, 260, 0, W.coklat, 1.4, { z: 1 }),
  ...Array.from({ length: n }, (_, i) => lampion(`${id}${i}`, 34 + i * 46, y, nyala)).flat(),
];

/* ------------------------------ 1. Hari pameran ------------------------------ */
const SUARA_P1 = "Hari pameran hampir tiba, dan Bu Tuti, panitia pameran, memanggil Satria, Laras, dan Genta.";
const SUARA_P2 = "Di halaman sanggar berdiri papan besar yang masih kosong, untuk menulis kain yang terjual.";
const SUARA_P3 = "Bu Tuti ingin angkanya ditulis dalam persen, supaya mudah dibaca pengunjung.";

export const ADEGAN_PAMERAN: AdeganStory = {
  id: "pameran",
  judul: "Hari pameran hampir tiba",
  sumber: "Materi: hari pameran",
  latar: "#F7FEE7",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Hari Pameran"), ...halaman("hl", 150)),
      tambah("hampir", ...taliLampion("lp", 48, 6, false)),
      tambah("Tuti", ...tokoh("bt", 262, 184, "Bu Tuti")),
      tambah("memanggil", emo("pg", 214, 150, E.lambai, 20)),
      tambah("Satria", ...tokoh("sa", 36, 184, "Satria")),
      tambah("Laras", ...tokoh("la", 84, 184, "Laras")),
      tambah("Genta", ...tokoh("ge", 132, 184, "Genta")),
    ),
    k(
      SUARA_P2,
      tambah("papan", ...papanPameran("pp", 70, 60, 160, 72, "PAPAN PAMERAN", 150, 10)),
      tambah("kosong", teks("ks", 150, 104, "?", 30, W.abu)),
      tambah("terjual", teks("tj", 150, 124, "kain terjual", 10, W.coklat)),
    ),
    k(
      SUARA_P3,
      tambah(0, teks("an", 120, 104, "angka", 16, W.biru)),
      hapus(0, "ks"),
      tambah("persen", teks("pc", 190, 106, "%", 30, W.merah)),
      tambah("pengunjung", emo("pj", 150, 148, E.orang, 20)),
    ),
  ],
};

/* ------------------------------ 2. Arti persen ------------------------------ */
const SUARA_R1 = "Bu Tuti menjelaskan, persen berarti per seratus.";
const SUARA_R2 = "Tujuh puluh lima persen berarti tujuh puluh lima bagian dari seratus bagian.";
const SUARA_R3 = "Tanda persen kita tulis setelah angkanya, jadi lima persen artinya lima per seratus.";

export const ADEGAN_PERSEN: AdeganStory = {
  id: "persen",
  judul: "Persen berarti per seratus",
  sumber: "Materi: arti persen",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Arti Persen"), ...halaman("hl", 150), ...tokoh("bt", 36, 184, "Bu Tuti")),
      tambah("persen", teks("pc", 150, 80, "%", 40, W.merah)),
      tambah("berarti", teks("br", 150, 100, "berarti", 10, W.coklat)),
      tambah("seratus", ...kartu("sr", 100, 110, 100, 26, W.krem, ["per 100"], 12)),
    ),
    k(
      SUARA_R2,
      hapus(0, "pc", "br", "sr-k", "sr-t0"),
      tambah(0, ...kisi("ks", 24, 34, 0), teks("n75", 220, 70, "75%", 26, W.merah)),
      ubah("bagian", ...warnai("ks", 0, 75)),
      tambah("seratus", teks("d100", 220, 100, "dari 100", 11, W.coklat)),
      tambah("bagian@2", teks("bg2", 220, 118, "bagian", 11, W.coklat)),
    ),
    k(
      SUARA_R3,
      hapus(0, "n75", "d100", "bg2"),
      tambah(0, teks("tn", 210, 112, "tanda persen", 11, W.coklat)),
      tambah("tulis", teks("a75", 196, 84, "75", 30, W.biru), teks("tp", 228, 84, "%", 30, W.merah)),
      sorotkan("angkanya", "a75", "tp"),
      tambah("artinya", teks("l5", 150, 142, "5% = 5/100", 12, W.biru)),
    ),
  ],
};

/* ------------------------------ 3. Desimal ------------------------------ */
const SUARA_D1 = "Laras menulis tujuh puluh lima per seratus sebagai desimal, yaitu nol koma tujuh lima.";
const SUARA_D2 = "Dua angka di belakang koma menunjukkan perseratusan.";
const SUARA_D3 = "Jadi nol koma tujuh lima sama dengan tujuh puluh lima persen.";

export const ADEGAN_DESIMAL: AdeganStory = {
  id: "desimal",
  judul: "Nol koma tujuh lima",
  sumber: "Materi: desimal dan persen",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Pecahan ke Desimal"), ...halaman("hl", 150), ...tokoh("la", 36, 184, "Laras")),
      tambah("tujuh", teks("fa", 100, 60, "75", 18, W.biru), garis("fg", 78, 66, 44, 0, W.biru, 2), teks("fb", 100, 86, "100", 18, W.biru)),
      tambah("sebagai", teks("sm", 150, 72, "=", 18, W.biru)),
      tambah("nol", teks("d1", 205, 72, "0,75", 20, W.merah)),
    ),
    k(
      SUARA_D2,
      tambah(0, teks("n2", 190, 136, "2 angka", 11, W.merah)),
      tambah("belakang", ...kartu("b7", 178, 94, 24, 26, W.hijauMuda, ["7"], 14), ...kartu("b5", 206, 94, 24, 26, W.hijauMuda, ["5"], 14)),
      tambah("perseratusan", teks("ps", 100, 118, "perseratus", 11, W.coklat)),
      sorotkan("koma", "d1"),
    ),
    k(
      SUARA_D3,
      hapus(0, "n2", "ps", "b7-k", "b7-t0", "b5-k", "b5-t0"),
      tambah("nol", teks("e1", 100, 116, "0,75", 20, W.merah)),
      tambah("sama", teks("sd", 150, 116, "=", 22, W.biru)),
      tambah("persen", teks("e2", 205, 116, "75%", 20, W.merah)),
    ),
  ],
};
