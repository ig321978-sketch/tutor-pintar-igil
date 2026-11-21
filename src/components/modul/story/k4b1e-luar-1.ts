import type { AdeganStory } from "./logika-story";
import { E, W, angka, emo, garis, garisTambah, judul, kartu, kotak, lantai, meja, panah, pusatKolom, sorotKolom, teks, tokoh } from "./k4b1e-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k4b1e-bantu";

/*
 * Cerita orisinal IGIL "Meja Resepsi Bu Rina" (Kelas 4 Bab 1 Sub-Bab E), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b1e.md. Bagian ini: pembuka (laci Bu Rina), Column Add (Susun ke Bawah), dan terapannya.
 */

export const NAMA_METODE = ["Column Add", "Place Add", "Round and Adjust"] as const;
export const NAMA_METODE_ID = ["Susun ke Bawah", "Tambah Per Tempat", "Genapkan Dulu"] as const;

const KUNING_KARTU = "#FEF3C7";
const XL = 150;
const YA = 88;
const YB = 116;
const YG = 124;
const YH = 150;

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Sore itu, di meja resepsi, Bu Rina membuka laci yang penuh kertas hitungan.";
const SUARA_O2 = "Di dalamnya ada tiga cara untuk menjumlahkan bilangan besar, supaya jumlahnya selalu tepat.";
const SUARA_O3 = "Tiga cara itu: Column Add, Place Add, dan Round and Adjust.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Susun ke Bawah, Tambah Per Tempat, dan Genapkan Dulu.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Laci Bu Rina",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Sore di Meja Resepsi"), ...lantai("lt", 150)),
      tambah("meja", ...meja("mj", 150, 126, 130)),
      tambah("Bu", ...tokoh("br", 60, 184, "Bu Rina")),
      tambah("laci", kotak("lc", 196, 132, 54, 14, "#A16207", W.coklat, { rx: 2, z: 2 })),
      tambah("kertas", ...[0, 1, 2].map((i) => kotak(`kr${i}`, 200 + i * 5, 112 - i * 5, 40, 18, KUNING_KARTU, W.biru, { rx: 2, z: 3 + i }))),
      tambah("hitungan.", teks("ht", 246, 100, "hitungan", 8, W.biru, { z: 6 })),
    ),
    k(
      SUARA_O2,
      tambah("tiga", teks("n3", 260, 40, "3 cara", 10, W.ungu)),
      tambah("cara", ...[0, 1, 2].flatMap((i) => [kotak(`c${i}-k`, 198 + i * 26, 48, 24, 28, KUNING_KARTU, W.biru, { rx: 4 }), teks(`c${i}-t`, 210 + i * 26, 66, "cara", 6.4, W.biru)])),
      tambah("besar,", teks("bb", 100, 70, "bilangan besar", 9, W.merah)),
      tambah("tepat.", emo("ok", 130, 100, E.benar, 18)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara"), teks("n3", 260, 40, "3 cara", 10, W.ungu)),
      tambah("Column", teks("m0", 112, 70, "1. Column Add", 10, W.biru), emo("i0", 30, 72, E.catat, 16)),
      tambah("Place", teks("m1", 112, 120, "2. Place Add", 10, W.biru), emo("i1", 30, 122, E.mata, 16)),
      tambah("Round", teks("m2", 130, 170, "3. Round and Adjust", 10, W.biru), emo("i2", 30, 172, E.ulang, 16)),
    ),
    k(
      SUARA_O4,
      tambah("Susun", teks("g0", 240, 70, "Susun ke Bawah", 8, W.ungu), garis("l0", 204, 75, 72, 0, W.ungu, 1)),
      tambah("Tambah", teks("g1", 240, 120, "Tambah Per Tempat", 8, W.ungu), garis("l1", 200, 125, 80, 0, W.ungu, 1)),
      tambah("Genapkan", teks("g2", 240, 170, "Genapkan Dulu", 8, W.ungu), garis("l2", 204, 175, 72, 0, W.ungu, 1)),
    ),
  ],
};

/* ------------------------------ Column Add: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Column Add, atau Susun ke Bawah.";
const SUARA_C2 = "Bilangan ditulis ke bawah, satuan di bawah satuan, puluhan di bawah puluhan.";
const SUARA_C3 = "Kita menjumlahkan dari kanan, dan menyimpan bila hasilnya sepuluh atau lebih.";
const SUARA_C4 = "Simpanan itu dibawa ke tempat di kirinya dan ikut dijumlahkan, bisa sekali, bisa dua kali.";

export const ADEGAN_LUAR_SUSUN: AdeganStory = {
  id: "luar-susun",
  judul: "Column Add: Susun ke Bawah",
  sumber: "Metode global: Column Add",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara Pertama"), teks("nm", 150, 52, "Column Add", 17, W.ungu)),
      tambah("Susun", teks("ni", 150, 76, "Susun ke Bawah", 12, W.biru)),
      tambah("Bawah.", ...kartu("cn", 104, 96, 92, 56, KUNING_KARTU, ["189", "+ 245"], 14), emo("pk", 150, 176, E.catat, 18)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Ditulis ke Bawah"), kotak("ks", 30, 30, 240, 132, W.kertas, W.coklat, { rx: 6, tebal: 1.6, z: -1 })),
      tambah("Bilangan", angka("a1", XL, YA, 189)),
      tambah("bawah,", angka("a2", XL, YB, 245), teks("pl", XL - 66, YB, "+", 16, W.biru, { z: 4 }), garisTambah("gt", XL - 64, XL + 4, YG)),
      tambah("satuan", sorotKolom("s0", XL, 0, 56, 100, W.satuan)),
      tambah("puluhan", sorotKolom("s1", XL, 1, 56, 100, W.puluhan)),
    ),
    k(
      SUARA_C3,
      tambah("menjumlahkan", panah("pk", 200, 44, -62, 0, W.merah, 2, { z: 4 })),
      tambah("kanan,", teks("kn", 236, 48, "dari kanan", 9, W.merah, { z: 4 })),
      tambah("sepuluh", teks("sp", 236, 104, "10 atau lebih", 9, W.biru, { z: 4 })),
      tambah("lebih.", teks("sm", pusatKolom(XL, 1), 66, "1", 11, W.merah, { z: 5 })),
    ),
    k(
      SUARA_C4,
      tambah("dibawa", panah("sb", 158, 62, -12, 0, W.merah, 2, { z: 4 })),
      ubah("kirinya", { id: "s1", warna: "#93C5FD" }),
      tambah("ikut", teks("ik", 236, 134, "ikut ditambah", 9, W.hijauTua, { z: 4 })),
      tambah("dijumlahkan", emo("ok", 236, 160, E.benar, 18)),
      tambah("dua", teks("dk", 236, 80, "2 kali simpan", 11, W.merah, { z: 4 }), teks("sm2", pusatKolom(XL, 2), 66, "1", 11, W.merah, { z: 5 })),
    ),
  ],
};

/* ------------------------------ Column Add: terapan ------------------------------ */
const SUARA_T1 = "Laras menjumlahkan tiga ratus dua puluh enam dan dua ratus lima puluh sembilan.";
const SUARA_T2 = "Enam ditambah sembilan lima belas, ia menulis lima dan menyimpan satu, hanya satu kali menyimpan.";
const SUARA_T3 = "Cocok untuk bilangan besar, karena langkahnya rapi dan bisa diperiksa.";
const SUARA_T4 = "Kurang cocok kalau kita lupa menyimpan, karena hasilnya bisa meleset.";

export const ADEGAN_LUAR_SUSUN_TERAPAN: AdeganStory = {
  id: "luar-susun-terapan",
  judul: "Column Add: Laras menjumlahkan",
  sumber: "Metode global: Column Add terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Laras Menjumlahkan"), kotak("ks", 30, 30, 240, 132, W.kertas, W.coklat, { rx: 6, tebal: 1.6, z: -1 }), ...tokoh("lr", 36, 184, "Laras")),
      tambah("enam", angka("a1", XL, YA, 326)),
      tambah("sembilan.", angka("a2", XL, YB, 259), teks("pl", XL - 66, YB, "+", 16, W.biru, { z: 4 }), garisTambah("gt", XL - 64, XL + 4, YG)),
    ),
    k(
      SUARA_T2,
      tambah("Enam", sorotKolom("s0", XL, 0, 56, 100, W.satuan)),
      tambah("sembilan", teks("eq", 236, YA, "6 + 9 = 15", 10, W.biru, { z: 4 })),
      tambah("menulis", angka("h5", XL, YH, 5, 22, W.hijauTua)),
      tambah("satu,", teks("sm", pusatKolom(XL, 1), 66, "1", 11, W.merah, { z: 5 })),
      tambah("kali", teks("sk", 236, 108, "1 kali simpan", 11, W.merah, { z: 4 })),
    ),
    k(
      SUARA_T3,
      hapus("Cocok", "sk"),
      tambah("Cocok", emo("ok", 236, 130, E.benar, 20)),
      tambah("besar,", teks("cb", 236, 112, "bilangan besar", 9, W.hijauTua, { z: 4 })),
      tambah("rapi", teks("rp", 236, 150, "rapi", 10, W.hijauTua, { z: 4 })),
      tambah("diperiksa.", emo("pr", 236, 172, E.mata, 16)),
    ),
    k(
      SUARA_T4,
      hapus("Kurang", "ok", "cb", "rp", "pr", "sm", "eq", "h5"),
      tambah("lupa", emo("xs", 236, 130, E.salah, 20), teks("lp", 236, 112, "lupa simpan", 9, W.merah, { z: 4 })),
      tambah("hasilnya", angka("h575", XL, YH, 575, 22, W.merah, { z: 5 })),
      tambah("meleset.", teks("bn", 236, 160, "benar: 585", 9, W.hijauTua, { z: 4 })),
    ),
  ],
};
