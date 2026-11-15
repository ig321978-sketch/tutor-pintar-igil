import type { AdeganStory, Obj } from "./logika-story";
import { W, emo, judul, kartu, labelTs, tangga, tanggaBalok, teks, garis, LANTAI } from "./k1b1c-gambar";
import { bersih, hapus, k, sorotkan, tambah, urutKata } from "./k1b1c-bantu";

export const NAMA_METODE = ["CPA Concrete", "CPA Pictorial", "CPA Abstract"];
export const NAMA_METODE_ID = ["Benda Nyata Dulu", "Gambar Representasi", "Simbol Matematika"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

const ANAK = "\u{1F9D2}";
const IGIL = "\u{1F989}";
const KOLOM = [0, 1, 2, 3, 4];
const idKolom = (i: number): string[] => Array.from({ length: i + 1 }, (_, j) => `bl${i}b${j}`);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara mengajar secara bertahap, dari benda, lalu gambar, lalu angka. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu: CPA Concrete, CPA Pictorial, dan CPA Abstract.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Benda Nyata Dulu, Gambar Representasi, dan Simbol Matematika.";
const SUARA_O4 = "Urutannya dari benda yang bisa dipegang, lalu gambar, lalu angka saja. Semuanya untuk belajar menghitung maju dan mundur.";
const SUARA_O5 = "Kita akan mencoba tiap metode dengan tangga, batu, dan angka, seperti yang dilakukan Upe, Kira, Malosi, dan Wei.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk berhitung",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Tiga metode dari luar")),
      tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)),
      tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      ...NAMA_METODE.map((m, i) => tambah(["Concrete,", "Pictorial,", "Abstract."][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      ...NAMA_METODE_ID.map((m, i) => tambah(["Benda", "Gambar", "Simbol"][i], ...kartu(`n${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Dari benda ke angka")),
      tambah("benda", emo("i1", 60, 90, "\u{1F9F1}", 40)),
      tambah("gambar,", emo("i2", 150, 90, "\u{1F5BC}️", 40)),
      tambah("angka", emo("i3", 240, 90, "\u{1F522}", 40)),
      tambah("Semuanya", ...kartu("iq", 20, 124, 260, 44, W.emas, ["berhitung maju dan mundur", "dari satu sampai sepuluh"], 10)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Dicoba bersama")),
      ...[["Upe", 45], ["Kira", 115], ["Malosi", 185], ["Wei", 255]].map(([nama, px]) => tambah(`${nama},`.replace("Wei,", "Wei."), emo(`o-${nama}`, px as number, 110, ANAK, 34), teks(`on-${nama}`, px as number, 130, nama as string, 8.6))),
      tambah("tangga,", ...kartu("ot", 40, 150, 220, 30, W.krem, ["tangga, batu, dan angka"], 10)),
    ),
  ],
};

/* ------------------------------ 2. CPA Concrete: konsep ------------------------------ */
const SUARA_K1 = "Metode pertama, CPA Concrete, atau Benda Nyata Dulu. Kita belajar dari benda yang bisa dipegang.";
const SUARA_K2 = "Pegang balok, lalu susun pelan-pelan. Satu balok, dua balok, tiga balok, empat balok, lima balok.";
const SUARA_K3 = "Dengan benda nyata, kita merasakan tangga makin tinggi saat balok makin banyak. Itulah menghitung maju.";
const SUARA_K4 = "Kalau balok diambil satu per satu dari yang tertinggi, tangga makin rendah. Itulah menghitung mundur.";
const posK2 = urutKata(SUARA_K2, ["satu", "dua", "tiga", "empat", "lima"], "pelan-pelan.");

export const ADEGAN_LUAR_KONKRET: AdeganStory = {
  id: "luar-konkret",
  judul: "CPA Concrete: belajar dari benda nyata",
  sumber: "Metode luar: CPA Concrete",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_K1, tambah("pertama,", ...kepala(0)), tambah("benda", emo("bn", 100, 100, "\u{1F9F1}", 50)), tambah("dipegang.", emo("tg", 190, 100, "✋", 44))),
    k(
      SUARA_K2,
      hapus(0, "bn", "tg"),
      ...KOLOM.map((i) => tambah(posK2[i], ...tanggaBalok("bl", 100, LANTAI, [i], 20))),
    ),
    k(SUARA_K3, tambah("tinggi", emo("kn", 262, 100, "➡️", 28)), tambah("banyak.", ...kartu("kt", 20, 160, 210, 26, W.krem, ["makin banyak balok, makin tinggi"], 9))),
    k(
      SUARA_K4,
      hapus(0, "kt-k", "kt-t0", "kn"),
      hapus("diambil", ...idKolom(4)),
      hapus("rendah.", ...idKolom(3)),
      tambah("mundur.", ...kartu("kr", 20, 160, 210, 26, W.langit, ["makin sedikit balok, makin rendah"], 9)),
    ),
  ],
};

/* ------------------------------ 3. CPA Concrete: terapan ------------------------------ */
const SUARA_T1 = "Wei membangun tangga dari lima balok yang berbeda tinggi. Ia akan menyusunnya dari yang paling pendek.";
const SUARA_T2 = "Wei menghitung maju sambil menyusun. Satu, dua, tiga, empat, lima.";
const SUARA_T3 = "Sekarang Wei membongkarnya dari yang tertinggi. Lima, empat, tiga, dua, satu.";
const SUARA_T4 = "Dengan benda nyata, kita memegang bilangan itu sendiri. Cara ini bagus untuk memulai, sebelum memakai gambar.";
const posT2 = urutKata(SUARA_T2, ["satu", "dua", "tiga", "empat", "lima"], "menyusun.");
const posT3 = urutKata(SUARA_T3, ["lima", "empat", "tiga", "dua", "satu"], "tertinggi.");

export const ADEGAN_LUAR_KONKRET_TERAPAN: AdeganStory = {
  id: "luar-konkret-terapan",
  judul: "CPA Concrete: Wei menyusun tangga balok",
  sumber: "Metode luar: CPA Concrete, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_T1, tambah("membangun", ...kepala(0)), tambah("Wei", emo("wei", 40, 120, ANAK, 34), teks("wn", 40, 136, "Wei", 8.6)), tambah("lima", garis("ls", 90, LANTAI, 130, 0, W.hijau, 3))),
    k(SUARA_T2, ...KOLOM.flatMap((i) => [tambah(posT2[i], ...tanggaBalok("bl", 100, LANTAI, [i], 20), teks(`lb${i}`, 110 + i * 20, LANTAI + 13, String(i + 1), 10, W.merah))])),
    k(SUARA_T3, ...[4, 3, 2, 1, 0].flatMap((i, q) => [hapus(posT3[q], ...idKolom(i), `lb${i}`)])),
    k(SUARA_T4, tambah("memegang", ...kartu("tp", 60, 156, 180, 28, W.krem, ["pegang dulu, gambar nanti"], 10)), tambah("bagus", emo("ow", 150, 100, IGIL, 40))),
  ],
};

/* ------------------------------ 4. CPA Pictorial: konsep ------------------------------ */
const SUARA_G1 = "Metode kedua, CPA Pictorial, atau Gambar Representasi. Sekarang kita pindah dari benda ke gambar.";
const SUARA_G2 = "Gambar tangga mewakili benda. Tiap anak tangga diberi angka, mulai dari satu sampai sepuluh.";
const SUARA_G3 = "Pada gambar, menghitung maju berarti menelusuri anak tangga ke atas. Menghitung mundur berarti menelusuri ke bawah.";
const SUARA_G4 = "Gambar membantu kita melihat urutan bilangan sekaligus, tanpa harus memegang benda.";

export const ADEGAN_LUAR_GAMBAR: AdeganStory = {
  id: "luar-gambar",
  judul: "CPA Pictorial: pindah ke gambar",
  sumber: "Metode luar: CPA Pictorial",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_G1, tambah("kedua,", ...kepala(1)), tambah("pindah", emo("gm", 150, 100, "\u{1F5BC}️", 50))),
    k(
      SUARA_G2,
      hapus(0, "gm"),
      tambah(0, garis("tanah", 14, LANTAI + 2, 272, 0, W.hijau, 3), ...tangga("gs")),
      ...urutKata(SUARA_G2, ["satu", "sepuluh"], "mulai").map((p, i) => tambah(p, ...(i === 0 ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : [10]).map((v) => labelTs(v)))),
    ),
    k(
      SUARA_G3,
      tambah("maju", ...kartu("g1", 14, 62, 84, 24, W.hijauMuda, ["naik: maju"], 9)),
      tambah("mundur", ...kartu("g2", 14, 92, 84, 24, W.langit, ["turun: mundur"], 9)),
      sorotkan("atas.", "gs9"),
    ),
    k(SUARA_G4, tambah("urutan", ...kartu("g3", 40, 164, 220, 26, W.krem, ["lihat urutan sekaligus"], 10)), tambah("sekaligus,", emo("mt", 262, 120, "\u{1F440}", 30))),
  ],
};
