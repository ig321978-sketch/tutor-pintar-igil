import type { AdeganStory } from "./logika-story";
import { E, W, air, emo, garis, judul, kotak, papanNama, petak, tanah, teks, tokoh } from "./k4b4a-gambar";
import { k, sorotkan, tambah } from "./k4b4a-bantu";

/*
 * Cerita orisinal IGIL "Lantai Ubin Bu Sinta" (Kelas 4 Bab 4 Sub-Bab A, pengukuran luas), awal cerita Kolam Renang Tirta Ceria.
 * Naskah suara dari naskah/story-naskah-k4b4a.md. Bagian ini: tiba di kolam, satuan tidak baku, dan satuan baku.
 */

/* ------------------------------ 1. Kolam ------------------------------ */
const SUARA_K1 = "Pak Hendro mengajak Satria, Laras, dan Genta ke Kolam Renang Tirta Ceria untuk membantu Bu Sinta.";
const SUARA_K2 = "Lantai di tepi kolam sudah retak, dan Bu Sinta ingin memasang ubin baru.";
const SUARA_K3 = "Ia memegang papan jalan dan bertanya, berapa luas lantai yang harus ditutup?";

export const ADEGAN_KOLAM: AdeganStory = {
  id: "kolam",
  judul: "Tiba di Kolam Renang Tirta Ceria",
  sumber: "Materi: kolam renang",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Kolam Renang Tirta Ceria"), ...tanah("tn", 150)),
      tambah("Hendro", ...tokoh("ph", 28, 184, "Pak Hendro")),
      tambah("Satria,", ...tokoh("sa", 72, 184, "Satria")),
      tambah("Laras,", ...tokoh("lr", 108, 184, "Laras")),
      tambah("Genta", ...tokoh("ge", 144, 184, "Genta")),
      tambah("Kolam", ...papanNama("pn", 170, 40, 120)),
    ),
    k(
      SUARA_K2,
      tambah("Lantai", kotak("lt", 14, 96, 130, 46, "#E2E8F0", W.abu, { rx: 4, tebal: 1.6, z: 1 }), teks("lk", 79, 90, "lantai retak", 8.4, W.coklat)),
      tambah("retak,", garis("r1", 34, 104, 16, 14, W.merah, 1.6, { z: 2 }), garis("r2", 50, 118, 22, -8, W.merah, 1.6, { z: 2 }), garis("r3", 72, 110, 20, 22, W.merah, 1.6, { z: 2 })),
      tambah("kolam", ...air("aw", 170, 90, 120, 52), emo("rn", 230, 118, E.renang, 20)),
      tambah("baru.", teks("ub", 230, 84, "ubin baru", 8.4, W.ubinTua)),
    ),
    k(
      SUARA_K3,
      tambah(0, ...tokoh("bs", 214, 184, "Bu Sinta")),
      sorotkan("papan", "bs-pj"),
      tambah("bertanya,", emo("bc", 252, 160, E.bicara, 18)),
      tambah("luas", teks("lq", 79, 126, "luas?", 16, W.merah, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 2. Satuan tidak baku ------------------------------ */
const SUARA_T1 = "Satria menutup lantai maket dengan lembar kertas lipat yang besar, dan Laras memakai lembar yang kecil.";
const SUARA_T2 = "Satria mendapat enam lembar, sedangkan Laras mendapat dua puluh empat lembar.";
const SUARA_T3 = "Satuan yang ukurannya berbeda membuat hasil berbeda, sehingga kita perlu satuan baku.";
const IB = Array.from({ length: 6 }, (_, i) => `bs-c${i}`);
const IK = Array.from({ length: 24 }, (_, i) => `kc-c${i}`);

export const ADEGAN_TIDAK_BAKU: AdeganStory = {
  id: "tidak-baku",
  judul: "Lembar besar dan lembar kecil",
  sumber: "Materi: satuan tidak baku",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Lembar Besar, Lembar Kecil"), ...tanah("tn", 150)),
      tambah("Satria", ...tokoh("sa", 60, 184, "Satria")),
      tambah("maket", teks("m1", 60, 46, "maket", 8.4, W.coklat)),
      tambah("besar,", ...petak("bs", 24, 52, 2, 3, 24, "#FDE68A", W.coklat)),
      tambah("Laras", ...tokoh("lr", 206, 184, "Laras")),
      tambah("memakai", teks("m2", 206, 46, "maket", 8.4, W.coklat)),
      tambah("kecil.", ...petak("kc", 170, 52, 4, 6, 12, "#BBF7D0", W.hijauTua)),
    ),
    k(
      SUARA_T2,
      tambah("enam", teks("n1", 60, 118, "6 lembar", 11, W.coklat)),
      sorotkan("enam", ...IB),
      tambah("dua", teks("n2", 206, 118, "24 lembar", 11, W.hijauTua)),
      sorotkan("puluh", ...IK),
    ),
    k(
      SUARA_T3,
      tambah("berbeda", teks("bd", 133, 86, "6 ≠ 24", 11, W.merah)),
      tambah("hasil", teks("hb", 133, 100, "hasil beda", 8.4, W.merah)),
      tambah("baku.", teks("bk", 133, 140, "satuan baku", 10, W.hijauTua), emo("ok", 133, 166, E.benar, 18)),
    ),
  ],
};

/* ------------------------------ 3. Satuan baku ------------------------------ */
const SUARA_B1 = "Genta menggambar petak yang sisinya satu sentimeter.";
const SUARA_B2 = "Luas satu petak itu kita sebut satu sentimeter persegi, dan dapat dibaca siapa saja dengan sama.";
const SUARA_B3 = "Menutup lantai dengan petak seperti ini membuat hasilnya sama untuk semua orang.";

export const ADEGAN_BAKU: AdeganStory = {
  id: "baku",
  judul: "Petak satu sentimeter persegi",
  sumber: "Materi: satuan baku",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Petak Satu Sentimeter"), ...tanah("tn", 150)),
      tambah("Genta", ...tokoh("ge", 40, 184, "Genta")),
      tambah("petak", kotak("pt", 100, 56, 44, 44, W.ubin, W.ubinTua, { rx: 0, tebal: 1.6, z: 2 })),
      tambah("satu", teks("s1", 122, 50, "1 cm", 9, W.ubinTua)),
      tambah("sentimeter.", teks("s2", 162, 82, "1 cm", 9, W.ubinTua)),
    ),
    k(
      SUARA_B2,
      sorotkan("Luas", "pt"),
      tambah("sebut", teks("lb", 122, 82, "1 cm²", 12, W.biru, { z: 3 })),
      tambah("persegi,", teks("nm", 122, 118, "sentimeter persegi", 8.4, W.ubinTua)),
      tambah("dibaca", emo("my", 232, 74, E.mata, 20)),
    ),
    k(
      SUARA_B3,
      tambah("lantai", ...petak("g", 182, 56, 2, 3, 22, W.ubin, W.ubinTua)),
      tambah("hasilnya", emo("ok", 262, 78, E.benar, 20)),
      tambah("orang.", teks("sm", 214, 118, "hasil sama", 10, W.hijauTua), emo("jp", 262, 120, E.jempol, 18)),
    ),
  ],
};
