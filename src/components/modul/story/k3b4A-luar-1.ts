import type { AdeganStory } from "./logika-story";
import { E, W, bilah, emo, garis, judul, kartu, kotak, lengkung, berkelok, pondok, rumput, teks, tokoh } from "./k3b4A-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k3b4A-bantu";

/*
 * Cerita orisinal IGIL "Rangka Layang-layang Bu Ratih" (Kelas 3 Bab 4 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b4a.md. Bagian ini: pembuka (kotak perkakas), Odd One Out (Cari yang Beda), dan terapannya.
 */

export const NAMA_METODE = ["Odd One Out", "Measure Twice", "Label and Name"] as const;
export const NAMA_METODE_ID = ["Cari yang Beda", "Ukur Dua Kali", "Beri Nama Huruf"] as const;

const KUNING_KARTU = "#FEF3C7";
const BAMBU = "#D9B44A";

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Sore itu, di pondok bengkel, Bu Ratih membuka kotak perkakas yang tersimpan di rak.";
const SUARA_O2 = "Di dalamnya ada tiga cara untuk mengenali dan mengukur rangka layang-layang tanpa keliru.";
const SUARA_O3 = "Tiga cara itu: Odd One Out, Measure Twice, dan Label and Name.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Cari yang Beda, Ukur Dua Kali, dan Beri Nama Huruf.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Kotak perkakas Bu Ratih",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Pondok Bengkel"), ...rumput("rt", 150)),
      tambah("pondok", ...pondok("pd", 20, 96, 100, 54)),
      tambah("Ratih", ...tokoh("br", 176, 184, "Bu Ratih")),
      tambah("kotak", kotak("pt", 212, 120, 56, 20, "#C99A63", W.coklat, { rx: 3, z: 1 }), kotak("tt", 208, 110, 64, 10, "#A16207", W.coklat, { rx: 3, z: 2 })),
      tambah("rak", kotak("rk", 200, 140, 84, 5, "#B7814A", W.coklat, { rx: 1, z: 1 })),
    ),
    k(
      SUARA_O2,
      tambah("tiga", teks("n3", 236, 84, "3 cara", 10, W.ungu)),
      tambah("cara", ...[0, 1, 2].flatMap((i) => [kotak(`c${i}-k`, 198 + i * 26, 46, 24, 28, KUNING_KARTU, W.biru, { rx: 4 }), teks(`c${i}-t`, 210 + i * 26, 64, "cara", 6.4, W.biru)])),
      tambah("rangka", ...kartu("pn", 20, 30, 100, 24, "#FDE68A", ["rangka layang"], 9)),
      tambah("keliru.", emo("xs", 140, 46, E.salah, 18)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara"), teks("n3", 260, 40, "3 cara", 10, W.ungu)),
      tambah("Odd", teks("m0", 120, 70, "1. Odd One Out", 10, W.biru), emo("i0", 30, 72, E.mata, 16)),
      tambah("Measure", teks("m1", 120, 120, "2. Measure Twice", 10, W.biru), emo("i1", 30, 122, E.penggaris, 16)),
      tambah("Label", teks("m2", 120, 170, "3. Label and Name", 10, W.biru), emo("i2", 30, 172, E.catat, 16)),
    ),
    k(
      SUARA_O4,
      tambah("Cari", teks("g0", 244, 70, "Cari yang Beda", 8, W.ungu), garis("l0", 208, 75, 72, 0, W.ungu, 1)),
      tambah("Ukur", teks("g1", 244, 120, "Ukur Dua Kali", 8, W.ungu), garis("l1", 208, 125, 72, 0, W.ungu, 1)),
      tambah("Beri", teks("g2", 244, 170, "Beri Nama Huruf", 8, W.ungu), garis("l2", 208, 175, 72, 0, W.ungu, 1)),
    ),
  ],
};

/* ------------------------------ Odd One Out: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Odd One Out, atau Cari yang Beda.";
const SUARA_C2 = "Kita memandang beberapa gambar, lalu mencari satu yang tidak sama jenisnya dengan yang lain.";
const SUARA_C3 = "Misalnya tiga ruas garis dan satu benang melengkung. Yang berbeda adalah kurva.";
const SUARA_C4 = "Dengan menyebut alasannya, kita jadi hafal ciri tiap jenis garis.";
const FRAME = [14, 82, 150, 218];

export const ADEGAN_LUAR_BEDA: AdeganStory = {
  id: "luar-beda",
  judul: "Odd One Out: Cari yang Beda",
  sumber: "Metode global: Odd One Out (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 1: Odd One Out"), ...rumput("rt", 150)),
      tambah("Odd", emo("jr", 150, 100, E.mata, 36)),
      tambah("Cari", teks("nm", 150, 140, "Cari yang Beda", 13, W.ungu)),
    ),
    k(
      SUARA_C2,
      hapus(0, "jr", "nm"),
      tambah("beberapa", ...FRAME.map((x, i) => kotak(`fr${i}`, x, 70, 56, 48, W.putih, W.biru, { rx: 5, z: 1 }))),
      tambah("satu", teks("c1", 150, 50, "cari 1 yang beda", 10, W.merah)),
      sorotkan("lain", "fr2"),
    ),
    k(
      SUARA_C3,
      hapus(0, "c1"),
      tambah("tiga", garis("s1", 24, 94, 36, 0, BAMBU, 5, { z: 2 }), garis("s2", 92, 94, 36, 0, BAMBU, 5, { z: 2 }), garis("s4", 228, 94, 36, 0, BAMBU, 5, { z: 2 }), teks("t3", 76, 136, "3 ruas garis", 9, W.ungu)),
      tambah("satu", teks("t1", 178, 136, "1 benang", 9, W.merah)),
      tambah("melengkung.", lengkung("kv", 160, 196, 100, 18, W.merah)),
      tambah("kurva.", teks("kr", 178, 152, "kurva", 12, W.merah), emo("ok", 262, 50, E.benar, 20)),
    ),
    k(
      SUARA_C4,
      tambah("alasannya,", teks("as", 150, 172, "karena melengkung", 10, W.hijauTua)),
      tambah("hafal", emo("ct", 262, 96, E.catat, 22)),
      tambah("garis.", teks("jg", 150, 28, "ciri tiap jenis", 10, W.ungu)),
    ),
  ],
};

/* ------------------------------ Odd One Out: terapan ------------------------------ */
const SUARA_T1 = "Salsa melihat tiga bilah bambu lurus dan satu benang berkelok.";
const SUARA_T2 = "Ia menunjuk benang itu, karena bilah punya dua ujung dan lurus, sedangkan benang melengkung.";
const SUARA_T3 = "Cocok untuk membedakan sinar garis, garis, ruas garis, dan kurva.";
const SUARA_T4 = "Kurang cocok kalau semua gambar sama jenisnya, karena tidak ada yang berbeda.";

export const ADEGAN_LUAR_BEDA_TERAPAN: AdeganStory = {
  id: "luar-beda-terapan",
  judul: "Odd One Out: bilah dan benang",
  sumber: "Metode global: Odd One Out (terapan)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Mana yang Beda?")),
      tambah("melihat", ...tokoh("sl", 40, 184, "Salsa")),
      tambah("tiga", ...bilah("bl1", 80, 62, 120, 8), ...bilah("bl2", 80, 82, 120, 8), ...bilah("bl3", 80, 102, 120, 8), teks("n3", 245, 86, "3 bilah", 10, W.ungu)),
      tambah("satu", berkelok("bw", 80, 200, 132, 12, W.merah), teks("n1", 245, 136, "1 benang", 10, W.merah)),
    ),
    k(
      SUARA_T2,
      tambah("menunjuk", emo("jr", 60, 136, E.jari, 18)),
      sorotkan("benang", "bw"),
      tambah("dua", teks("u2", 150, 46, "2 ujung", 11, W.hijauTua)),
      tambah("melengkung.", teks("ml", 150, 158, "melengkung", 10, W.merah)),
    ),
    k(
      SUARA_T3,
      hapus(0, "n3", "n1", "u2", "ml", "jr"),
      tambah("Cocok", emo("ok", 262, 40, E.benar, 24)),
      tambah(3, teks("c1", 245, 66, "sinar garis", 9, W.ungu)),
      tambah(5, teks("c2", 245, 86, "garis", 9, W.ungu)),
      tambah(6, teks("c3", 245, 106, "ruas garis", 9, W.ungu)),
      tambah(9, teks("c4", 245, 126, "kurva", 9, W.ungu)),
    ),
    k(
      SUARA_T4,
      hapus(0, "ok", "c1", "c2", "c3", "c4", "bw"),
      tambah("Kurang", emo("xs", 262, 40, E.salah, 24)),
      tambah("sama", ...bilah("bl4", 80, 122, 120, 8)),
      tambah("berbeda.", teks("tb", 245, 100, "tidak ada yang beda", 8, W.merah)),
    ),
  ],
};
