import type { AdeganStory } from "./logika-story";
import { DERET, E, W, cincin, deret, emo, garis, gerobak, judul, kotak, labelDeret, lantai, papan, teks, tokoh, type OpsiDeret } from "./k5b2b-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k5b2b-bantu";

/*
 * Cerita orisinal IGIL "Dua Lonceng Pak Tarno" (Kelas 5 Bab 2 Sub-Bab B), video metode global.
 * Naskah suara dari naskah/story-naskah-k5b2b.md. Bagian ini: pembuka (gerobak Pak Tarno), List Both (Daftar Keduanya), dan terapannya.
 */

export const NAMA_METODE = ["List Both", "Spot the Match", "Meet Again"] as const;
export const NAMA_METODE_ID = ["Daftar Keduanya", "Cari yang Sama", "Bertemu Lagi"] as const;

/** Deret lebar sempit supaya sepuluh kotak muat pada lebar kanvas. */
export const DERET_SEMPIT: OpsiDeret = { ...DERET, cw: 26, gap: 2 };

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Di gerobak Pak Tarno, dua lonceng menunggu untuk bunyi bersama, dan kita harus mencari waktunya.";
const SUARA_O2 = "Ada tiga cara supaya kelipatan persekutuan dan KPK tidak salah dicari.";
const SUARA_O3 = "Tiga cara itu: List Both, Spot the Match, dan Meet Again.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Daftar Keduanya, Cari yang Sama, dan Bertemu Lagi.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Dua lonceng menunggu",
  sumber: "Metode global: pembuka",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Dua Lonceng Menunggu"), ...lantai("lt", 150)),
      tambah("gerobak", ...gerobak("gr", 128, 98)),
      tambah("Tarno", ...tokoh("pt", 262, 184, "Pak Tarno")),
      tambah("dua", emo("l1", 44, 90, E.lonceng, 26), emo("l2", 84, 90, E.lonceng, 26), teks("n2", 64, 62, "2 lonceng", 10, W.ungu, { z: 3 })),
      tambah("waktunya", emo("tn", 262, 134, E.tanya, 22), teks("kp", 64, 122, "kapan bersama?", 9, W.merah, { z: 3 })),
    ),
    k(
      SUARA_O2,
      tambah("tiga", teks("n3", 262, 44, "3 cara", 10, W.ungu, { z: 3 })),
      tambah("kelipatan", teks("b1", 262, 62, "kelipatan", 9, W.hijauTua, { z: 3 })),
      tambah("persekutuan", teks("b2", 262, 76, "persekutuan", 9, W.hijauTua, { z: 3 })),
      tambah("KPK", teks("b3", 262, 90, "KPK", 9, W.hijauTua, { z: 3 })),
      tambah("dicari", emo("ok", 262, 116, E.benar, 20)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara"), teks("n3", 260, 40, "3 cara", 10, W.ungu, { z: 3 })),
      tambah("List", teks("m0", 118, 70, "1. List Both", 10, W.biru, { z: 3 }), emo("i0", 28, 72, E.memo, 16)),
      tambah("Spot", teks("m1", 118, 120, "2. Spot the Match", 10, W.biru, { z: 3 }), emo("i1", 28, 122, E.cari, 16)),
      tambah("Meet", teks("m2", 118, 170, "3. Meet Again", 10, W.biru, { z: 3 }), emo("i2", 28, 172, E.ulang, 16)),
    ),
    k(
      SUARA_O4,
      tambah("Daftar", teks("g0", 244, 70, "Daftar Keduanya", 8, W.ungu, { z: 3 }), garis("l0", 160, 74, 22, 0, W.ungu, 1)),
      tambah("Cari", teks("g1", 244, 120, "Cari yang Sama", 8, W.ungu, { z: 3 }), garis("l1", 176, 124, 22, 0, W.ungu, 1)),
      tambah("Bertemu", teks("g2", 244, 170, "Bertemu Lagi", 8, W.ungu, { z: 3 }), garis("l2", 160, 174, 22, 0, W.ungu, 1)),
    ),
  ],
};

/* ------------------------------ List Both: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, List Both, atau Daftar Keduanya.";
const SUARA_C2 = "Kita menulis kelipatan bilangan pertama, lalu menulis kelipatan bilangan kedua tepat di bawahnya.";
const SUARA_C3 = "Dua daftar itu harus cukup panjang, supaya bilangan yang sama punya kesempatan muncul.";
const SUARA_C4 = "Daftar yang rapi membuat bilangan yang sama mudah dilihat.";

const CA = deret("da", 14, 56, [3, 6, 9, 12, 15, 18], W.jingga);
const CB = deret("db", 14, 104, [4, 8, 12, 16, 20, 24], W.tosca);

export const ADEGAN_LUAR_DAFTAR: AdeganStory = {
  id: "luar-daftar",
  judul: "List Both: Daftar Keduanya",
  sumber: "Metode global: List Both (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 1: List Both"), ...lantai("lt", 150)),
      tambah("List", emo("pg", 110, 112, E.memo, 40)),
      tambah("Daftar", teks("nm", 150, 140, "Daftar Keduanya", 13, W.ungu, { z: 3 }), emo("kl", 190, 104, E.kilau, 28)),
    ),
    k(
      SUARA_C2,
      hapus(0, "pg", "nm", "kl"),
      tambah(0, papan("dp", 10, 28, 280, 114)),
      tambah("pertama", labelDeret("la", 14, 56, "Kelipatan bilangan pertama"), ...CA),
      tambah("kedua", labelDeret("lb", 14, 104, "Kelipatan bilangan kedua"), ...CB),
    ),
    k(
      SUARA_C3,
      tambah("Dua", teks("n2", 262, 44, "2 daftar", 9, W.ungu, { z: 3 })),
      tambah("panjang", teks("pj", 240, 134, "cukup panjang", 9, W.merah, { z: 3 })),
      tambah("sama", cincin("rg1", 14, 56, 3), cincin("rg2", 14, 104, 2)),
      tambah("muncul", emo("kc", 262, 80, E.kilau, 20)),
    ),
    k(
      SUARA_C4,
      hapus(0, "pj", "n2", "kc"),
      tambah("rapi", teks("rp", 250, 44, "rapi", 11, W.hijauTua, { z: 3 })),
      sorotkan("sama", "rg1", "rg2"),
      tambah("dilihat", emo("my", 232, 92, E.mata, 26)),
    ),
  ],
};

/* ------------------------------ List Both: terapan ------------------------------ */
const SUARA_T1 = "Bima menulis kelipatan empat dan kelipatan lima untuk dua lonceng baru.";
const SUARA_T2 = "Kelipatan empat sampai empat puluh dan kelipatan lima sampai empat puluh lima.";
const SUARA_T3 = "Cocok untuk bilangan kecil, karena dua daftarnya pendek dan mudah ditulis.";
const SUARA_T4 = "Kurang cocok untuk bilangan besar, karena daftarnya menjadi sangat panjang.";

const TA = deret("xa", 10, 60, [4, 8, 12, 16, 20, 24, 28, 32, 36, 40], W.jingga, DERET_SEMPIT);
const TB = deret("xb", 10, 100, [5, 10, 15, 20, 25, 30, 35, 40, 45], W.tosca, DERET_SEMPIT);
const MINI = Array.from({ length: 14 }, (_, i) => kotak(`dm${i}`, 14 + i * 18, 126, 14, 8, W.biruMuda, W.biru, { rx: 2, tebal: 1, z: 1 }));

export const ADEGAN_LUAR_DAFTAR_TERAPAN: AdeganStory = {
  id: "luar-daftar-terapan",
  judul: "List Both: terapan",
  sumber: "Metode global: List Both (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Bima Menulis Dua Daftar"), ...lantai("lt", 150), ...tokoh("bi", 36, 184, "Bima")),
      tambah("empat", teks("t4", 76, 62, "kelipatan 4", 11, W.hijauTua, { z: 3 })),
      tambah("lima", teks("t5", 76, 88, "kelipatan 5", 11, W.hijauTua, { z: 3 })),
      tambah("dua", emo("l1", 200, 70, E.lonceng, 24), emo("l2", 236, 70, E.lonceng, 24), teks("n2", 218, 100, "2 lonceng", 10, W.ungu, { z: 3 })),
    ),
    k(
      SUARA_T2,
      hapus(0, "t4", "t5", "l1", "l2", "n2"),
      tambah("empat", labelDeret("la", 10, 60, "Kelipatan 4"), ...TA),
      tambah("lima@2", labelDeret("lb", 10, 100, "Kelipatan 5"), ...TB),
    ),
    k(
      SUARA_T3,
      tambah("Cocok", emo("jp", 262, 142, E.jempol, 22)),
      tambah("dua", teks("n2", 150, 42, "2 daftar pendek", 10, W.hijauTua, { z: 3 })),
      tambah("mudah", emo("kl", 232, 142, E.kilau, 18)),
    ),
    k(
      SUARA_T4,
      hapus(0, "jp", "n2", "kl"),
      tambah("Kurang", emo("xs", 262, 142, E.salah, 22)),
      tambah("besar", teks("bs", 150, 42, "bilangan besar", 10, W.merah, { z: 3 })),
      tambah("panjang", ...MINI, teks("ds", 150, 146, "dan seterusnya", 9, W.merah, { z: 3 })),
    ),
  ],
};
