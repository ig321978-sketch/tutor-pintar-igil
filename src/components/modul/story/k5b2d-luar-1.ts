import type { AdeganStory } from "./logika-story";
import { E, NAMA_METODE, NAMA_METODE_ID, W, bulat, deretKue, emo, judul, kardus, kartu, kartuFaktor, kotak, lantai, meja, panah, papanTulis, teks, tokoh } from "./k5b2d-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k5b2d-bantu";

/*
 * Cerita orisinal IGIL "Kotak Bingkisan Pak Joko" (Kelas 5 Bab 2 Sub-Bab D), Pasar Kuliner Malam.
 * Video kedua: tiga metode global (Two Lists, Share Equally, Biggest Match), terpisah dari video materi.
 * Naskah suara dari naskah/story-naskah-k5b2d.md. Bagian ini: pembuka di meja Pak Joko dan Two Lists (konsep dan terapan Bima).
 */

export { NAMA_METODE, NAMA_METODE_ID };
const X_KARTU = [8, 107, 206];

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_PEMBUKA1 = "Di meja Pak Joko, kue dan kotak menunggu dibagi, dan FPB harus ditemukan dengan benar.";
const SUARA_PEMBUKA2 = "Ada tiga cara supaya faktor persekutuan dan FPB tidak salah dicari.";
const SUARA_PEMBUKA3 = "Tiga cara itu: Two Lists, Share Equally, dan Biggest Match.";
const SUARA_PEMBUKA4 = "Nama dalam bahasa Indonesia: Dua Daftar, Bagi Sama Rata, dan Terbesar yang Sama.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Di meja Pak Joko",
  sumber: "Metode global: pembuka di meja Pak Joko",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_PEMBUKA1,
      tambah(0, judul("Di Meja Pak Joko"), ...lantai("lt", 150)),
      tambah("meja", ...meja("mj", 14, 112, 200)),
      tambah("Joko", ...tokoh("pj", 262, 184, "Pak Joko")),
      tambah("kue", ...deretKue("kl", 44, 98, 12, "klepon", 6, 9), ...deretKue("od", 110, 98, 6, "onde", 6, 9)),
      tambah("kotak", ...kardus("kt", 168, 92, 34, 20)),
      tambah("FPB", teks("fq", 120, 60, "FPB = ?", 14, W.merah)),
    ),
    k(
      SUARA_PEMBUKA2,
      bersih(0),
      tambah(0, judul("Tiga Cara Mencari"), ...lantai("lt", 150), ...tokoh("pj", 150, 184, "Pak Joko")),
      tambah("tiga", ...X_KARTU.flatMap((x, i) => kartu(`c${i + 1}`, x, 40, 86, 64, "#E5E7EB", ["?"], 20))),
      tambah("tidak", teks("tc", 150, 124, "3 cara", 13, W.ungu), emo("ms", 150, 142, E.kilau, 14)),
    ),
    k(
      SUARA_PEMBUKA3,
      ubah("Two", { id: "c1-t0", isi: NAMA_METODE[0], u: 9 }, { id: "c1-k", warna: "#DBEAFE" }),
      ubah("Share", { id: "c2-t0", isi: NAMA_METODE[1], u: 9 }, { id: "c2-k", warna: "#DCFCE7" }),
      ubah("Biggest", { id: "c3-t0", isi: NAMA_METODE[2], u: 9 }, { id: "c3-k", warna: "#FEF9C3" }),
    ),
    k(
      SUARA_PEMBUKA4,
      hapus("Nama", "tc", "ms"),
      tambah("Dua", teks("c1-i", 51, 90, NAMA_METODE_ID[0], 8, W.coklat)),
      tambah("Bagi", teks("c2-i", 150, 90, NAMA_METODE_ID[1], 8, W.coklat)),
      tambah("Terbesar", teks("c3-i", 249, 90, NAMA_METODE_ID[2], 8, W.coklat)),
    ),
  ],
};

/* ------------------------------ Two Lists: konsep ------------------------------ */
const SUARA_DAFTAR1 = "Cara pertama, Two Lists, atau Dua Daftar.";
const SUARA_DAFTAR2 = "Kita menulis semua faktor bilangan pertama, lalu semua faktor bilangan kedua.";
const SUARA_DAFTAR3 = "Bilangan yang muncul di kedua daftar adalah faktor persekutuan.";
const SUARA_DAFTAR4 = "Kita melingkari yang sama, dan daftar harus lengkap supaya tidak ada yang tertinggal.";

const chip = (awal: string, y: number, daftar: number[], warna: string) => daftar.map((f, i) => kartuFaktor(`${awal}${f}`, 14 + i * 25, y, f, warna));

export const ADEGAN_LUAR_DAFTAR: AdeganStory = {
  id: "luar-daftar",
  judul: "Cara pertama: dua daftar",
  sumber: "Metode global: Two Lists, konsep",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_DAFTAR1,
      tambah(0, judul("Two Lists"), ...lantai("lt", 150), ...tokoh("pj", 262, 184, "Pak Joko")),
      tambah("pertama", emo("tg", 40, 74, "\u{1F4CB}", 26), teks("n1", 40, 96, "cara 1", 9, W.coklat)),
      tambah("Two", ...kartu("m", 70, 44, 190, 64, "#DBEAFE", [NAMA_METODE[0], NAMA_METODE_ID[0]], 12)),
      tambah("Daftar", emo("sa", 150, 134, E.kilau, 16)),
    ),
    k(
      SUARA_DAFTAR2,
      bersih(0),
      tambah(0, judul("Dua Daftar Faktor"), ...lantai("lt", 150), papanTulis("pn", 6, 28, 288, 114), ...tokoh("pj", 262, 184, "Pak Joko")),
      tambah("faktor", teks("l6", 14, 50, "Faktor 6", 9, W.kapur, { anchor: "start", z: 2 })),
      ...chip("d", 56, [1, 2, 3, 6], W.krem).map((c, i) => tambah([3, 4, 4, 5][i], ...c)),
      tambah("lalu", teks("l9", 14, 92, "Faktor 9", 9, W.kapur, { anchor: "start", z: 2 })),
      ...chip("e", 98, [1, 3, 9], "#DBEAFE").map((c, i) => tambah([7, 8, 9][i], ...c)),
    ),
    k(
      SUARA_DAFTAR3,
      sorotkan("muncul", "d1-k", "e1-k"),
      sorotkan("daftar", "d3-k", "e3-k"),
      tambah("persekutuan", teks("fp", 150, 136, "1 dan 3 sama", 10, W.kapur, { z: 2 })),
    ),
    k(
      SUARA_DAFTAR4,
      tambah("melingkari", bulat("g1", 25, 64, 13, undefined, W.emas, { tebal: 2.4, z: 4 }), bulat("g2", 75, 64, 13, undefined, W.emas, { tebal: 2.4, z: 4 }), bulat("g3", 25, 106, 13, undefined, W.emas, { tebal: 2.4, z: 4 }), bulat("g4", 75, 106, 13, undefined, W.emas, { tebal: 2.4, z: 4 })),
      tambah("lengkap", emo("ok", 240, 66, E.benar, 20), teks("lg", 240, 92, "lengkap", 10, W.kapur, { z: 2 })),
    ),
  ],
};

/* ------------------------------ Two Lists: terapan Bima ------------------------------ */
const SUARA_DAFTART1 = "Bima menulis faktor dua belas dan faktor dua puluh delapan.";
const SUARA_DAFTART2 = "Faktor dua belas ada enam, faktor dua puluh delapan ada enam juga.";
const SUARA_DAFTART3 = "Cocok untuk bilangan sedang, karena daftar faktornya masih pendek.";
const SUARA_DAFTART4 = "Kurang cocok untuk bilangan besar, karena faktornya sangat banyak.";

export const ADEGAN_LUAR_DAFTAR_TERAPAN: AdeganStory = {
  id: "luar-daftar-terapan",
  judul: "Bima menulis dua daftar",
  sumber: "Metode global: Two Lists, terapan Bima",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_DAFTART1,
      tambah(0, judul("Bima Menulis Dua Daftar"), ...lantai("lt", 150), papanTulis("pn", 6, 28, 288, 114)),
      tambah("Bima", ...tokoh("bi", 266, 184, "Bima")),
      tambah("dua", teks("l12", 14, 50, "Faktor 12", 9, W.kapur, { anchor: "start", z: 2 }), ...chip("g", 56, [1, 2, 3, 4, 6, 12], W.krem).flat()),
      tambah("faktor@2", teks("l28", 14, 92, "Faktor 28", 9, W.kapur, { anchor: "start", z: 2 }), ...chip("h", 98, [1, 2, 4, 7, 14, 28], "#DBEAFE").flat()),
    ),
    k(
      SUARA_DAFTART2,
      tambah("enam", teks("c12", 192, 68, "ada 6", 10, W.kapur, { z: 2 })),
      tambah("enam@2", teks("c28", 192, 110, "ada 6", 10, W.kapur, { z: 2 })),
      sorotkan("juga", "g12-k", "h28-k"),
    ),
    k(
      SUARA_DAFTART3,
      tambah("Cocok", emo("ok", 252, 64, E.benar, 20), teks("lb", 252, 90, "cocok", 11, W.kapur, { z: 2 })),
      tambah("pendek", panah("pd", 14, 128, 147, 0, W.emas, 2, { z: 3 }), teks("tp", 90, 139, "daftar pendek", 9, W.kapur, { z: 2 })),
    ),
    k(
      SUARA_DAFTART4,
      bersih(0),
      tambah(0, judul("Bilangan Besar"), ...lantai("lt", 150), papanTulis("pn", 6, 28, 288, 114), ...tokoh("bi", 266, 184, "Bima")),
      tambah("Kurang", emo("x1", 150, 128, E.salah, 18), teks("kc", 150, 112, "kurang cocok", 11, W.kapur, { z: 2 })),
      tambah("faktornya", ...[0, 1, 2].flatMap((r) => Array.from({ length: 12 }, (_, i) => kotak(`s${r}-${i}`, 14 + i * 23, 40 + r * 16, 18, 10, W.krem, W.biru, { rx: 2, tebal: 1, z: 1 })))),
      tambah("banyak", teks("by", 150, 92, "banyak sekali", 10, W.kapur, { z: 2 })),
    ),
  ],
};
