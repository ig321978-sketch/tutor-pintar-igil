import type { AdeganStory } from "./logika-story";
import { E, W, bulat, emo, garis, judul, kapur, kartu, kotak, panah, papanKapur, teks, tokoh, tokoLatar } from "./k3b1E-gambar";
import { bersih, k, tambah, ubah } from "./k3b1E-bantu";

/*
 * Cerita orisinal IGIL "Sisa Stok Pak Anto" (Kelas 3 Bab 1 Sub-Bab E), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b1e.md. Bagian ini: pembuka (tiga catatan lama di laci kasir), Standard Subtraction (Pengurangan Bersusun), dan terapannya.
 */

export const NAMA_METODE = ["Standard Subtraction", "Counting Up", "Regrouping"] as const;
export const NAMA_METODE_ID = ["Pengurangan Bersusun", "Menghitung Naik", "Pinjam Puluhan"] as const;

/** Susunan angka kecil di papan kapur kiri (papan "pk" di (14, 34, 150, 120)): bilangan atas dan bawah sejajar kanan pada x=112. */
const susunKecil = (id: string, atas: string, bawah: string) => [
  kapur(`${id}-a`, 112, 76, atas, 26, { anchor: "end" }),
  kapur(`${id}-m`, 70, 106, "-", 26),
  kapur(`${id}-b`, 112, 106, bawah, 26, { anchor: "end" }),
  garis(`${id}-g`, 58, 113, 64, 0, "#F8FAFC", 1.8, { z: 3 }),
];

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Di laci kasir, Bima menemukan tiga catatan lama tentang cara menghitung sisa barang.";
const SUARA_O2 = "Pak Anto tersenyum. Itu tiga cara pedagang menghitung sisa dagangan dengan tepat.";
const SUARA_O3 = "Tiga cara itu: Standard Subtraction, Counting Up, dan Regrouping.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Pengurangan Bersusun, Menghitung Naik, dan Pinjam Puluhan.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga catatan lama di laci kasir",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      bersih(0),
      tambah(0, judul("Laci Kasir"), ...tokoLatar("tk"), kotak("mj", 14, 96, 160, 40, W.kayu, W.coklat, { rx: 3, tebal: 2, z: 0 })),
      tambah("kasir,", kotak("ms", 24, 68, 50, 28, "#94A3B8", W.tinta, { rx: 3, tebal: 1.6, z: 1 }), teks("mt", 49, 86, "KASIR", 7, W.putih, { z: 2 }), kotak("lc", 84, 106, 70, 22, "#E7C98A", W.coklat, { rx: 3, tebal: 1.6, z: 1 }), bulat("lh", 119, 117, 3, W.coklat, W.biru, { z: 2 })),
      tambah("Bima", ...tokoh("bm", 230, 172, "Bima")),
      tambah("tiga", teks("n3", 240, 50, "3 catatan", 10, W.ungu, { z: 2 }), ...[0, 1, 2].flatMap((i) => kartu(`c${i}`, 188 + i * 36, 60, 32, 40, W.krem, ["catatan"], 6))),
      ...[0, 1, 2].map((i) => ubah("lama", { id: `c${i}-k`, warna: W.kuning })),
    ),
    k(
      SUARA_O2,
      tambah("tersenyum.", ...tokoh("pa", 40, 172, "Pak Anto"), emo("sy", 66, 150, E.senyum, 16)),
      tambah("tiga", teks("t3", 100, 64, "3 cara", 10, W.ungu, { z: 2 })),
      tambah("pedagang", emo("kd", 100, 160, E.kardus, 20)),
      tambah("tepat.", emo("ok", 140, 160, E.benar, 20)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara Tadi"), ...tokoLatar("tk"), teks("n3", 252, 44, "3 cara", 10, W.ungu, { z: 2 })),
      tambah("Standard", teks("m0", 20, 62, "1. Standard Subtraction", 13, W.biru, { anchor: "start", z: 2 }), emo("i0", 270, 64, E.catat, 22)),
      tambah("Counting", teks("m1", 20, 108, "2. Counting Up", 13, W.biru, { anchor: "start", z: 2 }), emo("i1", 270, 110, "\u{1F4C8}", 22)),
      tambah("Regrouping.", teks("m2", 20, 154, "3. Regrouping", 13, W.biru, { anchor: "start", z: 2 }), emo("i2", 270, 156, E.kardus, 22)),
    ),
    k(
      SUARA_O4,
      tambah("Pengurangan", teks("q0", 20, 78, "Pengurangan Bersusun", 10, W.ungu, { anchor: "start", z: 2 })),
      tambah("Menghitung", teks("q1", 20, 124, "Menghitung Naik", 10, W.ungu, { anchor: "start", z: 2 })),
      tambah("Pinjam", teks("q2", 20, 170, "Pinjam Puluhan", 10, W.ungu, { anchor: "start", z: 2 })),
    ),
  ],
};

/* ------------------------------ Standard Subtraction: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Standard Subtraction, atau Pengurangan Bersusun.";
const SUARA_C2 = "Bilangan ditulis bersusun, puluhan lurus dengan puluhan dan satuan lurus dengan satuan.";
const SUARA_C3 = "Kurangi dari satuan, lalu puluhan.";
const SUARA_C4 = "Hasilnya adalah sisa.";

export const ADEGAN_LUAR_SUSUN: AdeganStory = {
  id: "luar-susun",
  judul: "Standard Subtraction: Pengurangan Bersusun",
  sumber: "Metode global: Standard Subtraction (konsep)",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_C1,
      bersih(0),
      tambah(0, judul("Cara Pertama"), ...tokoLatar("tk")),
      tambah("Standard", ...kartu("nm", 50, 42, 200, 30, W.krem, ["Standard Subtraction"], 13)),
      tambah("Pengurangan", teks("nid", 150, 108, "Pengurangan Bersusun", 12, W.ungu, { z: 2 })),
      tambah("Bersusun.", emo("ic", 150, 154, E.catat, 34)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Susun ke Bawah"), ...tokoLatar("tk"), ...papanKapur("pk", 14, 34, 150, 120)),
      tambah("bersusun,", ...susunKecil("sn", "47", "23")),
      tambah("puluhan", kotak("cp", 82, 56, 16, 62, "#FACC15", undefined, { op: 0.3, putus: true, z: 2 }), ...kartu("kp", 176, 50, 118, 30, W.kuning, ["puluhan lurus"], 12)),
      tambah("satuan", kotak("cs", 98, 56, 15, 62, "#F97316", undefined, { op: 0.3, putus: true, z: 2 }), ...kartu("ks", 176, 100, 118, 30, W.hijauMuda, ["satuan lurus"], 12)),
    ),
    k(
      SUARA_C3,
      tambah("satuan,", bulat("n1", 105, 44, 8, W.merah, W.merahTua, { z: 4 }), teks("n1t", 105, 47.5, "1", 10, W.putih, { z: 5 })),
      tambah("puluhan.", bulat("n2", 86, 44, 8, W.hijau, W.hijauTua, { z: 4 }), teks("n2t", 86, 47.5, "2", 10, W.putih, { z: 5 }), panah("pn", 97, 44, -3, 0, W.kapur, 1.6)),
    ),
    k(
      SUARA_C4,
      tambah(0, kapur("hs", 112, 142, "24", 26, { anchor: "end", warna: "#FDE047" })),
      tambah("sisa.", emo("ok", 230, 150, E.benar, 24)),
    ),
  ],
};

/* ------------------------------ Standard Subtraction: terapan ------------------------------ */
const SUARA_T1 = "Raka mengurangi delapan puluh sembilan dengan lima puluh tiga. Sembilan dikurangi tiga enam; delapan dikurangi lima tiga.";
const SUARA_T2 = "Sisanya tiga puluh enam.";
const SUARA_T3 = "Cocok kalau tiap angka atas lebih besar atau sama dengan angka bawahnya.";
const SUARA_T4 = "Kurang cocok kalau ada angka atas yang lebih kecil, karena harus meminjam.";

export const ADEGAN_LUAR_SUSUN_TERAPAN: AdeganStory = {
  id: "luar-susun-terapan",
  judul: "Raka mengurangi delapan puluh sembilan dengan lima puluh tiga",
  sumber: "Metode global: Standard Subtraction (terapan)",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_T1,
      bersih(0),
      tambah(0, judul("Raka Mengurangi"), ...tokoLatar("tk"), ...papanKapur("pk", 14, 34, 150, 120), ...tokoh("rk", 246, 172, "Raka")),
      tambah("delapan", kapur("sn-a", 112, 76, "89", 26, { anchor: "end" })),
      tambah("lima", kapur("sn-m", 70, 106, "-", 26), kapur("sn-b", 112, 106, "53", 26, { anchor: "end" }), garis("sn-g", 58, 113, 64, 0, "#F8FAFC", 1.8, { z: 3 })),
      tambah("Sembilan", ...kartu("k1", 176, 50, 118, 28, W.kuning, ["9 - 3 = 6"], 13)),
      tambah("delapan@2", ...kartu("k2", 176, 90, 118, 28, W.hijauMuda, ["8 - 5 = 3"], 13)),
    ),
    k(
      SUARA_T2,
      tambah(0, emo("tz", 206, 140, E.tanya, 20)),
      tambah("enam.", kapur("hs", 112, 142, "36", 26, { anchor: "end", warna: "#FDE047" }), emo("ok", 262, 140, E.benar, 20)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...tokoLatar("tk"), ...kartu("cc", 80, 38, 140, 26, W.hijauMuda, ["Cocok"], 13)),
      tambah("tiap", ...papanKapur("pk", 70, 72, 160, 90), kapur("sn-a", 170, 108, "89", 26, { anchor: "end" }), kapur("sn-b", 170, 138, "53", 26, { anchor: "end" })),
      tambah("lebih", emo("c1", 138, 84, E.benar, 16), emo("c2", 158, 84, E.benar, 16)),
      tambah("bawahnya.", emo("sy", 262, 130, E.senyum, 24)),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?"), ...tokoLatar("tk"), ...kartu("kc", 70, 38, 160, 26, W.merahMuda, ["Kurang cocok"], 13)),
      tambah("angka", ...papanKapur("pk", 70, 72, 160, 90), kapur("sn-a", 170, 108, "71", 26, { anchor: "end" }), kapur("sn-b", 170, 138, "28", 26, { anchor: "end" })),
      tambah("kecil,", emo("x1", 160, 84, E.salah, 18)),
      tambah("meminjam.", panah("pj", 244, 110, 0, -26, W.merah, 2.4), ...kartu("kj", 216, 120, 78, 24, W.krem, ["pinjam"], 10)),
    ),
  ],
};
