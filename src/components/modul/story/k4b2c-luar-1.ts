import type { AdeganStory } from "./logika-story";
import { E, K, W, emo, garis, idKain, judul, kainBar, kartu, kotak, bulat, lantai, meja, mesinJahit, papanTulis, pecahan, teks, tokoh } from "./k4b2c-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k4b2c-bantu";

/*
 * Cerita orisinal IGIL "Meja Jahit Kak Sekar" (Kelas 4 Bab 2 Sub-Bab C), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b2c.md. Bagian ini: pembuka (laci Kak Sekar), Area Model Match (Cocokkan Daerah), dan terapannya.
 */

export const NAMA_METODE = ["Area Model Match", "Multiply by One", "Divide Both"] as const;
export const NAMA_METODE_ID = ["Cocokkan Daerah", "Kali Bentuk Satu", "Bagi Keduanya"] as const;

const KUNING_KARTU = "#FEF3C7";

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Siang itu, di meja jahit, Kak Sekar membuka laci yang berisi cara-cara mencari pecahan yang sama besar.";
const SUARA_O2 = "Di dalamnya ada tiga cara supaya pecahan yang sama besar mudah dikenali, tanpa tertukar.";
const SUARA_O3 = "Tiga cara itu: Area Model Match, Multiply by One, dan Divide Both.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Cocokkan Daerah, Kali Bentuk Satu, dan Bagi Keduanya.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Laci meja jahit Kak Sekar",
  sumber: "Metode global: pembuka",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Siang di Meja Jahit"), ...lantai("lt", 150)),
      tambah("meja", ...meja("mj", 70, 118, 140, 24)),
      tambah("jahit,", ...mesinJahit("ms", 76, 94)),
      tambah("Sekar", ...tokoh("ks", 244, 184, "Kak Sekar")),
      tambah("laci", kotak("lc", 110, 125, 70, 12, "#C99A63", W.coklat, { rx: 2, z: 3 }), bulat("lcb", 145, 131, 2, "#FACC15", W.coklat, { tebal: 0.8, z: 4 })),
      tambah("berisi", ...[0, 1, 2].map((i) => kotak(`ks${i}`, 128 + i * 20, 106, 14, 10, KUNING_KARTU, W.coklat, { rx: 2, tebal: 1, z: 3 }))),
    ),
    k(
      SUARA_O2,
      tambah("tiga", teks("n3", 150, 40, "3 cara", 12, W.ungu)),
      tambah("cara", ...[0, 1, 2].map((i) => kartu(`c${i}`, 96 + i * 34, 52, 28, 26, KUNING_KARTU, ["cara"], 6.4)).flat()),
      tambah("dikenali,", emo("ok", 50, 70, E.benar, 20)),
      tambah("tertukar.", emo("xs", 250, 70, E.salah, 20)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara"), teks("n3", 260, 40, "3 cara", 10, W.ungu)),
      tambah("Area", teks("m0", 112, 70, "1. Area Model Match", 10, W.biru), emo("i0", 30, 74, "\u{1F4D0}", 18)),
      tambah("Multiply", teks("m1", 112, 120, "2. Multiply by One", 10, W.biru), emo("i1", 30, 124, "\u{1F522}", 18)),
      tambah("Divide", teks("m2", 112, 170, "3. Divide Both", 10, W.biru), emo("i2", 30, 174, "\u{2797}", 18)),
    ),
    k(
      SUARA_O4,
      tambah("Cocokkan", kotak("gk0", 190, 54, 92, 24, "#FEE2E2", W.merah, { rx: 6, z: -1 }), teks("g0", 236, 70, "Cocokkan Daerah", 9, W.merah)),
      tambah("Kali", kotak("gk1", 190, 104, 92, 24, "#FEE2E2", W.merah, { rx: 6, z: -1 }), teks("g1", 236, 120, "Kali Bentuk Satu", 9, W.merah)),
      tambah("Satu,", teks("bs", 236, 142, "2/2 = 1", 8, W.hijauTua)),
      tambah("Bagi", kotak("gk2", 190, 154, 92, 24, "#FEE2E2", W.merah, { rx: 6, z: -1 }), teks("g2", 236, 170, "Bagi Keduanya", 9, W.merah)),
    ),
  ],
};

/* ------------------------------ Area Model Match: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Area Model Match, atau Cocokkan Daerah.";
const SUARA_C2 = "Kita menggambar dua bangun yang sama besar, lalu membaginya dengan cara berbeda.";
const SUARA_C3 = "Bagian yang diarsir pada kedua bangun ditumpuk untuk melihat apakah luasnya sama.";
const SUARA_C4 = "Kalau luas arsirannya sama, kedua pecahan itu sama besar.";
const F_ATAS = pecahan("fa", 272, 76, 2, 4, 12, K.kapur);
const F_BAWAH = pecahan("fb", 272, 120, 4, 8, 12, K.kapur);

export const ADEGAN_LUAR_DAERAH: AdeganStory = {
  id: "luar-daerah",
  judul: "Area Model Match: Cocokkan Daerah",
  sumber: "Metode global: Area Model Match (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 1: Area Model Match"), ...papanTulis("pt", 8, 28, 284, 132)),
      tambah("Area", teks("nm", 150, 62, "Area Model Match", 13, K.kapurMerah)),
      tambah("Cocokkan", teks("ni", 150, 84, "Cocokkan Daerah", 11, K.kapur)),
      tambah("Daerah.", emo("ik", 150, 134, "\u{1F4D0}", 26)),
    ),
    k(
      SUARA_C2,
      hapus(0, "nm", "ni", "ik"),
      tambah("dua", teks("n2", 150, 52, "2 bangun", 10, K.kapur)),
      tambah("bangun", ...kainBar("r1", 60, 66, 180, 24, 1, 0), ...kainBar("r2", 60, 98, 180, 24, 1, 0)),
      tambah("besar,", teks("sm", 150, 140, "sama besar", 10, K.kapurBiru)),
      tambah("membaginya", ...kainBar("s1", 60, 66, 180, 24, 4, 0), ...kainBar("s2", 60, 98, 180, 24, 8, 0)),
    ),
    k(
      SUARA_C3,
      hapus(0, "sm", ...idKain("r1", 1), ...idKain("r2", 1)),
      ubah("diarsir", ...idKain("s1", 2).map((id) => ({ id, warna: W.arsir })), ...idKain("s2", 4).map((id) => ({ id, warna: W.arsir }))),
      tambah("ditumpuk", garis("gv", 150, 58, 0, 70, W.merah, 1.8, { putus: true, z: 5 })),
      tambah("luasnya", teks("lq", 150, 142, "luas arsiran?", 10, K.kapurMerah)),
    ),
    k(
      SUARA_C4,
      hapus(0, "gv", "lq"),
      tambah("sama,", emo("ok", 150, 148, E.benar, 20)),
      tambah("pecahan", ...F_ATAS, ...F_BAWAH),
      tambah("sama@2", teks("eq", 272, 100, "=", 14, K.kapurMerah)),
      sorotkan("besar.", ...idKain("s1", 4), ...idKain("s2", 8)),
    ),
  ],
};

/* ------------------------------ Area Model Match: terapan ------------------------------ */
const SUARA_D1 = "Laras menggambar dua persegi panjang, satu dibagi tiga dan satu dibagi enam.";
const SUARA_D2 = "Ia mengarsir satu bagian pada yang pertama dan dua bagian pada yang kedua, lalu keduanya cocok.";
const SUARA_D3 = "Cocok untuk melihat dengan mata mengapa dua pecahan sama besar.";
const SUARA_D4 = "Kurang cocok kalau pecahannya rumit, karena menggambar bagian yang banyak memakan waktu.";
const G_SATU = pecahan("ga", 272, 76, 1, 3, 12, K.kapur);
const G_DUA = pecahan("gb", 272, 120, 2, 6, 12, K.kapur);

export const ADEGAN_LUAR_DAERAH_TERAPAN: AdeganStory = {
  id: "luar-daerah-terapan",
  judul: "Cocokkan Daerah: kapan cocok",
  sumber: "Metode global: Area Model Match (terapan)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Daerah Laras"), ...papanTulis("pt", 8, 28, 284, 132), ...tokoh("lr", 40, 184, "Laras")),
      tambah("dua", teks("n2", 150, 50, "2 bangun", 10, K.kapur)),
      tambah("panjang,", ...kainBar("a", 60, 60, 180, 24, 3, 0), teks("ta", 34, 76, "bangun 1", 8, K.kapurBiru)),
      tambah("tiga", teks("ld1", 270, 76, "dibagi 3", 7, K.kapur)),
      tambah("satu@2", ...kainBar("b", 60, 96, 180, 24, 6, 0), teks("tb", 34, 112, "bangun 2", 8, K.kapurBiru)),
      tambah("enam.", teks("ld2", 270, 112, "dibagi 6", 7, K.kapur)),
    ),
    k(
      SUARA_D2,
      hapus(0, "ld1", "ld2"),
      ubah("satu", { id: "a-c0", warna: W.arsir }),
      tambah("satu", teks("t1", 100, 138, "1 bagian", 9, K.kapurMerah)),
      ubah("dua", { id: "b-c0", warna: W.arsir }, { id: "b-c1", warna: W.arsir }),
      tambah("dua", teks("t2", 200, 138, "2 bagian", 9, K.kapurMerah)),
      tambah("cocok.", garis("gv", 120, 54, 0, 72, W.merah, 1.8, { putus: true, z: 5 }), emo("ok", 262, 142, E.benar, 20)),
    ),
    k(
      SUARA_D3,
      hapus(0, "t1", "t2", "gv", "ok"),
      tambah("melihat", emo("mt", 215, 150, E.mata, 20)),
      tambah("dua", teks("n2b", 150, 140, "2 pecahan", 10, K.kapur)),
      tambah("pecahan", ...G_SATU, ...G_DUA),
      tambah("besar.", teks("eq", 272, 98, "=", 14, K.kapurMerah)),
    ),
    k(
      SUARA_D4,
      bersih(0),
      tambah(0, judul("Daerah Laras"), ...papanTulis("pt", 8, 28, 284, 132), ...tokoh("lr", 40, 184, "Laras")),
      tambah("rumit,", teks("ru", 150, 50, "rumit", 10, K.kapurMerah), ...kainBar("bx", 60, 58, 180, 14, 12, 7)),
      tambah("bagian", ...kainBar("by", 60, 80, 180, 14, 15, 9)),
      tambah("banyak", emo("kr", 80, 124, E.keringat, 20)),
      tambah("waktu.", emo("jm", 220, 124, "\u{23F0}", 20), teks("lm", 150, 142, "lama", 10, K.kapur)),
    ),
  ],
};
