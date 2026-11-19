import type { AdeganStory, Obj } from "./logika-story";
import { E, GARIS_KOLOM, W, emo, garis, judul, kartu, keranjang, kotak, lantai, panah, tabelKosong, teks, tokoh } from "./k3b3D-gambar";
import { bersih, k, sorotkan, tambah } from "./k3b3D-bantu";

/*
 * Cerita orisinal IGIL "Bandul Dokter Hana" (Kelas 3 Bab 3 Sub-Bab D), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b3d.md. Bagian ini: pembuka (tiga cara mengubah satuan berat), Place Value Chart (Tabel Tempat Angka), dan terapannya.
 */

export const NAMA_METODE = ["Place Value Chart", "Double Number Line", "Chunking"] as const;
export const NAMA_METODE_ID = ["Tabel Tempat Angka", "Garis Bilangan Ganda", "Pecah Seribu-Seribu"] as const;

const KUNING_KARTU = "#FEF3C7";

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Malam itu Dokter Hana menunjukkan tiga cara untuk mengubah satuan berat.";
const SUARA_O2 = "Cara itu dipakai dokter hewan untuk menghitung pakan dengan teliti, supaya tidak ada hewan yang kelaparan.";
const SUARA_O3 = "Tiga cara itu: Place Value Chart, Double Number Line, dan Chunking.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Tabel Tempat Angka, Garis Bilangan Ganda, dan Pecah Seribu-Seribu.";

/** Ikon kecil tiga cara: tabel (empat sel), dua garis sejajar, dan tiga potongan. Pojok kiri-atas (x, y). */
const ikonTabel = (x: number, y: number): Obj[] => [0, 1, 2, 3].map((i) => kotak(`i0${i}`, x + i * 9, y, 8, 14, "#DBEAFE", W.kg, { rx: 0, tebal: 1.2 }));
const ikonGaris = (x: number, y: number): Obj[] => [garis("i1a", x, y + 2, 34, 0, W.kg, 2), garis("i1b", x, y + 12, 34, 0, W.gr, 2)];
const ikonPotong = (x: number, y: number): Obj[] => [0, 1, 2].map((i) => kotak(`i2${i}`, x + i * 13, y, 11, 14, "#BFDBFE", W.kg, { rx: 2, tebal: 1.2 }));

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga cara mengubah satuan berat",
  sumber: "Metode global: pembuka",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Tiga Cara Mengubah Berat"), ...lantai("tn", 150)),
      tambah("Hana", ...tokoh("dh", 40, 184, "Dokter Hana")),
      tambah("tiga", teks("n3", 196, 44, "3 cara", 11, W.ungu)),
      tambah("cara", ...[0, 1, 2].flatMap((i) => kartu(`c${i}`, 100 + i * 64, 60, 56, 36, KUNING_KARTU, ["cara"], 8))),
      tambah("mengubah", teks("kg", 110, 130, "kg", 18, W.kg), panah("pa", 130, 124, 40, 0, W.biru, 2.4), teks("gg", 196, 130, "g", 18, W.gr)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Pakan yang Teliti"), ...lantai("tn", 150)),
      tambah("dokter", ...tokoh("dh", 40, 184, "Dokter Hana")),
      tambah("menghitung", ...kartu("kc", 80, 50, 70, 36, W.putih, ["catatan"], 9), emo("ps", 116, 112, E.catat, 18)),
      tambah("pakan", ...keranjang("kj", 176, 90, 70, 34), emo("w1", 192, 88, E.wortel, 18), emo("w2", 212, 86, E.wortel, 18), emo("w3", 232, 88, E.wortel, 18)),
      tambah("teliti,", emo("ok", 150, 44, E.benar, 24)),
      tambah("hewan@2", emo("h1", 110, 142, E.kelinci, 20), emo("h2", 150, 142, E.kambing, 20), emo("h3", 190, 142, E.kura, 20)),
      tambah("kelaparan.", emo("lg", 270, 142, E.tertawa, 22)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara Mengubah Satuan"), teks("n3", 252, 40, "3 cara", 10, W.ungu)),
      tambah("Place", teks("m0", 60, 78, "1. Place Value Chart", 9.6, W.biru, { anchor: "start" }), ...ikonTabel(18, 66)),
      tambah("Double", teks("m1", 60, 128, "2. Double Number Line", 9.6, W.biru, { anchor: "start" }), ...ikonGaris(18, 116)),
      tambah("Chunking.", teks("m2", 60, 178, "3. Chunking", 9.6, W.biru, { anchor: "start" }), ...ikonPotong(18, 166)),
    ),
    k(
      SUARA_O4,
      tambah("Tabel", teks("g0", 290, 78, "Tabel Tempat Angka", 9, W.ungu, { anchor: "end" })),
      tambah("Garis", teks("g1", 290, 128, "Garis Bilangan Ganda", 9, W.ungu, { anchor: "end" })),
      tambah("Pecah", teks("g2", 290, 178, "Pecah Seribu-Seribu", 9, W.ungu, { anchor: "end" }), teks("sr", 60, 190, "1.000 g = 1 kg", 8, W.hijauTua, { anchor: "start" })),
    ),
  ],
};

/* ------------------------------ Place Value Chart: konsep ------------------------------ */
const SUARA_T1 = "Cara pertama, Place Value Chart, atau Tabel Tempat Angka.";
const SUARA_T2 = "Tabel punya kolom kilogram, ratusan gram, puluhan gram, dan satuan gram.";
const SUARA_T3 = "Angka di kolom kilogram mewakili ribuan gram.";
const SUARA_T4 = "Dengan tabel, dua kilogram lima ratus gram terlihat sebagai dua ribu lima ratus gram.";

/** Tulisan kepala kolom tabel `tb` (x0 = 14, lebar 68, di tinggi 52): `tb-ht{c}`. */
const kepala = (c: number, label: string): Obj => teks(`tb-ht${c}`, 14 + c * 68 + 34, 65.4, label, 8.4, GARIS_KOLOM[c], { z: 1 });

export const ADEGAN_LUAR_TABEL: AdeganStory = {
  id: "luar-tabel",
  judul: "Place Value Chart atau Tabel Tempat Angka",
  sumber: "Metode global: Tabel Tempat Angka",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Place Value Chart")),
      tambah("Place", ...tabelKosong("tb", 14, 52, 68)),
      tambah("Chart,", teks("nm", 150, 134, "Place Value Chart", 13, W.kg)),
      tambah("Tabel", teks("nm2", 150, 158, "Tabel Tempat Angka", 10, W.ungu)),
    ),
    k(
      SUARA_T2,
      tambah("kilogram,", kepala(0, "kilogram")),
      tambah("ratusan", kepala(1, "ratusan g")),
      tambah("puluhan", kepala(2, "puluhan g")),
      tambah("satuan", kepala(3, "satuan g")),
    ),
    k(
      SUARA_T3,
      sorotkan("kilogram", "tb-h0", "tb-c0"),
      tambah("mewakili", panah("pa", 48, 124, 0, -14, W.kg, 2.2)),
      tambah("ribuan", teks("rb", 48, 136, "ribuan gram", 9, W.kg)),
    ),
    k(
      SUARA_T4,
      { at: 0, hapus: ["nm", "nm2", "rb", "pa"] },
      tambah("dua", teks("n0", 48, 104, "2", 24, W.kg), teks("lb", 150, 44, "2 kg 500 g", 12, W.ungu)),
      tambah("lima", teks("n1", 116, 104, "5", 24, W.gr)),
      tambah(6, teks("n2", 184, 104, "0", 24, "#A16207"), teks("n3", 252, 104, "0", 24, "#BE185D")),
      tambah("dua@2", teks("tt", 150, 150, "2.500 g", 24, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ Place Value Chart: terapan ------------------------------ */
const SUARA_P1 = "Bima menaruh dua di kolom kilogram, lima di ratusan, nol di puluhan, dan nol di satuan.";
const SUARA_P2 = "Ia membaca dari kiri dan mendapat dua ribu lima ratus gram.";
const SUARA_P3 = "Cocok untuk mengubah dengan angka yang rapi dan mudah dibaca.";
const SUARA_P4 = "Kurang cocok kalau beratnya belum dipisah menjadi kilogram dan gram, karena angkanya belum tahu masuk kolom mana.";

const KOLOM = ["kg", "ratusan", "puluhan", "satuan"];

export const ADEGAN_LUAR_TABEL_TERAPAN: AdeganStory = {
  id: "luar-tabel-terapan",
  judul: "Bima mengisi tabel tempat angka",
  sumber: "Metode global: terapan Tabel Tempat Angka",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Bima Mengisi Tabel"), ...lantai("tn", 150), ...tokoh("bm", 36, 184, "Bima"), ...tabelKosong("tb", 76, 48, 52, KOLOM)),
      tambah("dua", teks("n0", 102, 100, "2", 24, W.kg)),
      tambah("lima", teks("n1", 154, 100, "5", 24, W.gr)),
      tambah("nol", teks("n2", 206, 100, "0", 24, "#A16207")),
      tambah("nol@2", teks("n3", 258, 100, "0", 24, "#BE185D")),
    ),
    k(
      SUARA_P2,
      tambah("membaca", panah("pa", 80, 118, 196, 0, W.ungu, 2.6)),
      sorotkan("kiri", "tb-c0"),
      tambah("dua", teks("tt", 180, 152, "2.500 g", 24, W.hijauTua)),
    ),
    k(
      SUARA_P3,
      { at: 0, hapus: ["tt", "pa"] },
      tambah("Cocok", emo("ok", 262, 170, E.benar, 26)),
      tambah("rapi", ...kartu("p1", 80, 126, 80, 24, W.hijauMuda, ["rapi"], 9)),
      tambah("mudah", ...kartu("p2", 170, 126, 100, 24, W.krem, ["mudah dibaca"], 9)),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Belum Dipisah"), ...lantai("tn", 150), ...tokoh("bm", 36, 184, "Bima"), ...tabelKosong("tb", 76, 48, 52, KOLOM)),
      tambah("beratnya", teks("tt", 180, 134, "2.530 g", 22, W.merah)),
      tambah("kilogram", teks("q0", 102, 100, "?", 24, W.merah)),
      tambah(9, teks("q1", 154, 100, "?", 24, W.merah), teks("q2", 206, 100, "?", 24, W.merah), teks("q3", 258, 100, "?", 24, W.merah)),
      tambah("karena", emo("xs", 262, 170, E.salah, 26)),
    ),
  ],
};
