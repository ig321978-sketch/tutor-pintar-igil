import type { AdeganStory } from "./logika-story";
import { E, W, angkaSlot, bundel, emo, idSlot, judul, kotak, lantai, panah, rak, slotKolom, teks, tokoh } from "./k5b1c-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k5b1c-bantu";

/*
 * Cerita orisinal IGIL "Bundel Tiket Bu Lestari" (Kelas 5 Bab 1 Sub-Bab C), video metode global.
 * Naskah suara dari naskah/story-naskah-k5b1c.md. Bagian ini: pembuka (gudang penuh bundel), Break It Apart (Urai Bilangan), dan terapannya.
 */

export const NAMA_METODE = ["Break It Apart", "Swap Bundles", "Build It Back"] as const;
export const NAMA_METODE_ID = ["Urai Bilangan", "Tukar Bundel", "Susun Kembali"] as const;

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Sore itu, gudang tiket Bu Lestari penuh bundel yang harus dihitung ulang tanpa salah.";
const SUARA_O2 = "Ada tiga cara supaya bilangan besar bisa diurai, ditukar, dan disusun kembali dengan aman.";
const SUARA_O3 = "Tiga cara itu: Break It Apart, Swap Bundles, dan Build It Back.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Urai Bilangan, Tukar Bundel, dan Susun Kembali.";

const WARNA_CARA = [W.langit, W.rumput, W.pink];
const kartuCara = (i: number) => kotak(`q${i}-k`, 10 + i * 96, 50, 88, 56, WARNA_CARA[i], W.biru, { rx: 6, tebal: 1.4, z: 1 });

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Gudang penuh bundel",
  sumber: "Metode global: pembuka",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Gudang penuh bundel"), ...lantai("lt", 150), ...rak("rk", 12, 28, 276, 100)),
      tambah("Lestari", ...tokoh("bu", 40, 184, "Bu Lestari")),
      tambah("bundel", ...bundel("kd", 30, 52, "kardus", 6, 26), ...bundel("ds", 30, 87, "dus", 8, 20), ...bundel("pk", 30, 122, "pak", 10, 16)),
      tambah("dihitung", emo("ct", 250, 170, E.catat, 24, { z: 3 })),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga cara"), ...lantai("lt", 150)),
      tambah("tiga", teks("n3", 150, 40, "3 cara", 11, W.merah, { z: 3 })),
      tambah("diurai", kartuCara(0), teks("q0-t", 54, 81, "diurai", 9.4, W.biru, { z: 3 })),
      tambah("ditukar", kartuCara(1), teks("q1-t", 150, 81, "ditukar", 9.4, W.biru, { z: 3 })),
      tambah("disusun", kartuCara(2), teks("q2-t", 246, 81, "disusun", 9.4, W.biru, { z: 3 })),
      tambah("aman", emo("ok", 150, 150, E.benar, 30, { z: 3 })),
    ),
    k(
      SUARA_O3,
      hapus(0, "ok", "q0-t", "q1-t", "q2-t"),
      tambah("Break", teks("e0", 54, 70, "Break It Apart", 9, W.hijauTua, { z: 3 })),
      tambah("Swap", teks("e1", 150, 70, "Swap Bundles", 9, W.hijauTua, { z: 3 })),
      tambah("Build", teks("e2", 246, 70, "Build It Back", 9, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_O4,
      tambah("Urai", teks("i0", 54, 92, "Urai Bilangan", 8.4, W.coklat, { z: 3 })),
      tambah("Tukar", teks("i1", 150, 92, "Tukar Bundel", 8.4, W.coklat, { z: 3 })),
      tambah("Susun", teks("i2", 246, 92, "Susun Kembali", 8.4, W.coklat, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Break It Apart: konsep ------------------------------ */
const SUARA_U1 = "Cara pertama, Break It Apart, atau Urai Bilangan.";
const SUARA_U2 = "Kita mengambil tiap angka, lalu menyebutkan kolomnya, seperti dua di puluh ribuan menjadi dua puluh ribu.";
const SUARA_U3 = "Semua bagian itu dijumlahkan, dan jumlahnya harus sama dengan bilangan semula.";
const SUARA_U4 = "Kolom yang berisi nol boleh ditulis atau dilewati, karena nol tidak menambah apa-apa.";

export const ADEGAN_LUAR_URAI: AdeganStory = {
  id: "luar-urai",
  judul: "Break It Apart: Urai",
  sumber: "Metode global: Break It Apart (konsep)",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Cara 1"), ...lantai("lt", 150)),
      tambah("Break", teks("m1", 150, 60, "Break It Apart", 14, W.merah, { z: 3 })),
      tambah("Apart", ...bundel("bx", 90, 126, "dus", 4, 40)),
      tambah("Urai", teks("m2", 150, 84, "Urai Bilangan", 11, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_U2,
      bersih(0),
      tambah(0, judul("Ambil tiap angka"), ...lantai("lt", 150)),
      tambah("angka", kotak("kd", 24, 50, 80, 56, W.krem, W.coklat, { rx: 6, tebal: 1.6, z: 1 }), teks("kd-d", 64, 96, "2", 22, W.merah, { z: 3 })),
      tambah("kolomnya", teks("kd-h", 64, 64, "puluh ribuan", 8, W.coklat, { z: 3 })),
      tambah("menjadi", panah("ar", 112, 80, 56, 0, W.biru, 2.4, { z: 2 }), teks("v", 228, 92, "20.000", 20, W.biru, { z: 3 })),
    ),
    k(
      SUARA_U3,
      bersih(0),
      tambah(0, judul("Jumlah harus sama"), ...lantai("lt", 150), teks("eq", 150, 62, "20.000 + 4.000 + 300 + 50", 11, W.biru, { z: 3 })),
      tambah("sama", teks("sm", 150, 90, "=", 16, W.merah, { z: 3 })),
      tambah("semula", teks("bl", 150, 116, "24.350", 16, W.biru, { z: 3 }), emo("ok", 250, 112, E.benar, 24, { z: 3 })),
    ),
    k(
      SUARA_U4,
      bersih(0),
      tambah(0, judul("Nol boleh dilewati"), ...lantai("lt", 150)),
      tambah("nol", teks("hs", 150, 46, "30.402", 14, W.merah, { z: 3 })),
      tambah("ditulis", teks("l1", 150, 76, "30.000 + 0 + 400 + 0 + 2", 10.5, W.biru, { z: 3 })),
      tambah("dilewati", teks("l2", 150, 104, "30.000 + 400 + 2", 10.5, W.biru, { z: 3 })),
      tambah("tidak", teks("tt", 150, 132, "hasilnya tetap sama", 10, W.hijauTua, { z: 3 }), emo("ok", 250, 130, E.benar, 24, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Break It Apart: terapan ------------------------------ */
const SUARA_T1 = "Bima menguraikan empat puluh tiga ribu dua ratus enam.";
const SUARA_T2 = "Hasilnya empat puluh ribu, tiga ribu, dua ratus, dan enam, tanpa bagian puluhan.";
const SUARA_T3 = "Cocok untuk memeriksa apakah angka berada di kolom yang benar, karena tiap bagian tampak jelas.";
const SUARA_T4 = "Kurang cocok untuk bilangan yang akan dihitung cepat, karena uraian panjang memakan tempat.";

export const ADEGAN_LUAR_URAI_TERAPAN: AdeganStory = {
  id: "luar-urai-terapan",
  judul: "Urai Bilangan: kapan cocok",
  sumber: "Metode global: Break It Apart (terapan)",
  latar: "#F1F5F9",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Urai Bilangan: kapan cocok"), ...lantai("lt", 150), ...tokoh("bm", 40, 184, "Bima")),
      tambah("empat", teks("nn", 150, 52, "43.206", 16, W.biru, { z: 3 })),
      tambah("tiga", ...slotKolom("sl", 70)),
      tambah("enam", angkaSlot("sl", 0, 70, "4"), angkaSlot("sl", 1, 70, "3"), angkaSlot("sl", 2, 70, "2"), angkaSlot("sl", 3, 70, "0"), angkaSlot("sl", 4, 70, "6")),
    ),
    k(
      SUARA_T2,
      tambah("empat", teks("p1", 70, 144, "40.000", 10, W.merah, { z: 3 })),
      tambah("tiga", teks("p2", 124, 144, "3.000", 10, W.merah, { z: 3 })),
      tambah("dua", teks("p3", 170, 144, "200", 10, W.merah, { z: 3 })),
      tambah("enam", teks("p4", 212, 144, "6", 10, W.merah, { z: 3 })),
      tambah("tanpa", teks("p5", 190, 164, "tanpa puluhan", 8, W.coklat, { z: 3 })),
    ),
    k(
      SUARA_T3,
      tambah(0, emo("ok", 270, 46, E.benar, 26, { z: 3 })),
      sorotkan("kolom", ...idSlot("sl").filter((i) => i.endsWith("-k"))),
      tambah("jelas", teks("jl", 190, 174, "tiap bagian jelas", 9, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_T4,
      hapus(0, "ok", "jl"),
      tambah(0, emo("xx", 270, 46, E.salah, 26, { z: 3 })),
      tambah("cepat", emo("jm", 270, 100, "\u{1F552}", 26, { z: 3 })),
      tambah("panjang", teks("pj", 190, 174, "uraian panjang, makan tempat", 9, W.merah, { z: 3 })),
    ),
  ],
};
