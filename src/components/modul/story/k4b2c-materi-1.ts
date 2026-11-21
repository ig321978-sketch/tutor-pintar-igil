import type { AdeganStory } from "./logika-story";
import { E, W, benang, emo, idKain, judul, kainBar, lantai, meja, mesinJahit, panah, pecahan, garis, teks, tokoh } from "./k4b2c-gambar";
import { hapus, k, sorotkan, tambah, ubah } from "./k4b2c-bantu";

/*
 * Cerita orisinal IGIL "Meja Jahit Kak Sekar" (Kelas 4 Bab 2 Sub-Bab C, pecahan yang sama besar), cerita Sanggar Batik Kampung Mekar.
 * Naskah suara dari naskah/story-naskah-k4b2c.md. Bagian ini: meja jahit, satu per dua, dua per empat.
 */

/* ------------------------------ 1. Meja jahit ------------------------------ */
const SUARA_J1 = "Kak Sekar, penjahit sanggar, mengajak Satria, Laras, dan Genta ke meja jahit di serambi.";
const SUARA_J2 = "Di meja itu ada mesin jahit, gulungan benang, dan potongan kain berbagai ukuran.";
const SUARA_J3 = "Kak Sekar bilang, ada dua potongan yang bagiannya berbeda, tetapi besarnya sama.";

export const ADEGAN_JAHIT: AdeganStory = {
  id: "jahit",
  judul: "Meja jahit di serambi",
  sumber: "Materi: meja jahit",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, judul("Meja Jahit Kak Sekar"), ...lantai("lt", 150)),
      tambah("Sekar,", ...tokoh("ks", 244, 184, "Kak Sekar")),
      tambah("Satria,", ...tokoh("sa", 40, 184, "Satria")),
      tambah("Laras,", ...tokoh("lr", 82, 184, "Laras")),
      tambah("Genta", ...tokoh("ge", 124, 184, "Genta")),
    ),
    k(
      SUARA_J2,
      tambah("meja", ...meja("mj", 120, 120, 120, 22)),
      tambah("mesin", ...mesinJahit("ms", 126, 96)),
      tambah("benang,", ...benang("bn1", 178, 112, 8, "#F43F5E"), ...benang("bn2", 194, 114, 6, "#3B82F6")),
      tambah("kain", ...kainBar("k1", 206, 106, 30, 10, 1, 0), ...kainBar("k2", 206, 117, 22, 3, 1, 0)),
    ),
    k(
      SUARA_J3,
      tambah("dua", teks("n2", 150, 44, "2 potongan", 10, W.ungu)),
      tambah("bagiannya", ...kainBar("ba", 70, 56, 160, 14, 3, 0)),
      tambah("berbeda,", ...kainBar("bb", 70, 76, 160, 14, 6, 0)),
      tambah("sama.", teks("sm", 250, 76, "=", 18, W.merah)),
      sorotkan("sama.", ...idKain("ba", 3), ...idKain("bb", 6)),
    ),
  ],
};

/* ------------------------------ 2. Satu per dua ------------------------------ */
const SUARA_S1 = "Kak Sekar menunjukkan kain yang dibagi dua, dan satu bagiannya diarsir.";
const SUARA_S2 = "Pecahannya adalah satu per dua.";
const SUARA_S3 = "Laras menyimpan potongan itu di sebelah kiri meja untuk dibandingkan.";
const PC_SETENGAH = pecahan("pc", 150, 152, 1, 2, 22);

export const ADEGAN_SETENGAH: AdeganStory = {
  id: "setengah",
  judul: "Kain dibagi dua",
  sumber: "Materi: satu per dua",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Satu Per Dua"), ...tokoh("ks", 40, 184, "Kak Sekar")),
      tambah("kain", ...kainBar("kb", 80, 56, 160, 28, 2, 0)),
      tambah("dua,", teks("nd", 160, 102, "2 bagian", 10, W.ungu)),
      ubah("satu", { id: "kb-c0", warna: W.arsir }),
      tambah("diarsir.", teks("ns", 160, 118, "1 diarsir", 10, W.arsirTua)),
    ),
    k(
      SUARA_S2,
      tambah(0, PC_SETENGAH[1]),
      tambah("satu", PC_SETENGAH[0]),
      tambah("dua.", PC_SETENGAH[2]),
      sorotkan("dua.", "kb-c0"),
    ),
    k(
      SUARA_S3,
      tambah("Laras", ...tokoh("lr", 84, 184, "Laras")),
      tambah("potongan", ...meja("mj", 8, 118, 60, 24)),
      tambah("kiri", ...kainBar("kl", 14, 106, 44, 10, 2, 1), panah("ar", 78, 78, -22, 26, W.merah, 2)),
      tambah("dibandingkan.", emo("ct", 124, 168, E.catat, 16)),
    ),
  ],
};

/* ------------------------------ 3. Dua per empat ------------------------------ */
const SUARA_E1 = "Genta menunjukkan kain yang dibagi empat, dan dua bagiannya diarsir.";
const SUARA_E2 = "Pecahannya adalah dua per empat.";
const SUARA_E3 = "Ketika dua potongan itu ditumpuk, bagian yang diarsir ternyata sama besar.";
const PC_DUA_EMPAT = pecahan("pc", 150, 152, 2, 4, 22);

export const ADEGAN_DUA_PER_EMPAT: AdeganStory = {
  id: "dua-per-empat",
  judul: "Kain dibagi empat",
  sumber: "Materi: dua per empat",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Dua Per Empat"), ...tokoh("ge", 40, 184, "Genta")),
      tambah("kain", ...kainBar("kb", 80, 56, 160, 28, 4, 0)),
      tambah("empat,", teks("nd", 160, 102, "4 bagian", 10, W.ungu)),
      ubah("dua", { id: "kb-c0", warna: W.arsir }, { id: "kb-c1", warna: W.arsir }),
      tambah("diarsir.", teks("ns", 160, 118, "2 diarsir", 10, W.arsirTua)),
    ),
    k(
      SUARA_E2,
      tambah(0, PC_DUA_EMPAT[1]),
      tambah("dua", PC_DUA_EMPAT[0]),
      tambah("empat.", PC_DUA_EMPAT[2]),
      sorotkan("empat.", "kb-c0", "kb-c1"),
    ),
    k(
      SUARA_E3,
      hapus(0, ...idKain("kb", 4), "nd", "ns", "pc-p", "pc-g", "pc-q"),
      tambah("dua", teks("n2", 150, 40, "2 potongan", 10, W.ungu)),
      tambah("ditumpuk,", ...kainBar("ta", 80, 52, 160, 22, 2, 1), ...kainBar("tb", 80, 78, 160, 22, 4, 2)),
      tambah("sama", garis("gv", 160, 46, 0, 62, W.merah, 1.8, { putus: true, z: 5 })),
      tambah("besar.", teks("sm", 262, 80, "=", 20, W.merah)),
    ),
  ],
};
