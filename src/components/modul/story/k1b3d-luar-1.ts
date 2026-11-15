import type { AdeganStory, Obj } from "./logika-story";
import { W, bulat, emo, judul, kartu, kotak, teks, type Titik } from "./k1b3d-gambar";
import { bersih, hapus, hitungMuncul, k, pindahAksi, sorotkan, tambah } from "./k1b3d-bantu";

/** Nama metode luar dalam bahasa Indonesia saja (data sumber memuat nama Inggris, yang tidak dipakai di video). */
export const NAMA_METODE_ID = ["Mengambil", "Hitung Mundur", "Kurang di Bingkai"];
export const RINGKAS_METODE = ["ambil sebagian dari kumpulan", "mundur dari bilangan awal", "kosongkan kotak pada bingkai"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE_ID[i]} · ${RINGKAS_METODE[i]}`], 8.8);

const ANAK = "\u{1F9D2}";
const JERUK = "\u{1F34A}";

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara punya cara lain untuk mengajar soal cerita pengurangan. Di video ini kita lihat tiga cara itu.";
const SUARA_O2 = "Tiga metode itu: Mengambil, Hitung Mundur, dan Kurang di Bingkai.";
const SUARA_O3 = "Mengambil artinya kita ambil sebagian dari kumpulan benda. Hitung Mundur artinya kita mundur dari bilangan awal. Kurang di Bingkai artinya kita kosongkan kotak pada bingkai.";
const SUARA_O4 = "Ketiga cara ini sama-sama membantu kita mengurangi dengan mudah, dari cerita sampai ke jawabannya.";
const SUARA_O5 = "Kita akan mencoba tiap cara bersama Upe, Kira, Malosi, dan Wei, di layar.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk soal cerita",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)), tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      ...NAMA_METODE_ID.map((m, i) => tambah(["Mengambil,", "Hitung", "Kurang"][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Apa artinya?")),
      ...NAMA_METODE_ID.map((m, i) => tambah(["Mengambil", "Hitung", "Kurang"][i], ...kartu(`n${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [m, RINGKAS_METODE[i]], 10))),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Dari cerita ke jawaban")),
      tambah("membantu", emo("i1", 60, 90, "\u{1F463}", 40), emo("i2", 150, 90, "\u{1F9E9}", 40), emo("i3", 240, 90, "\u{1F51F}", 40)),
      tambah("mudah,", ...kartu("iq", 30, 124, 240, 44, W.emas, ["mengurangi dengan mudah", "dari cerita sampai jawaban"], 10)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Dicoba di layar")),
      ...[["Upe", 45], ["Kira", 115], ["Malosi", 185], ["Wei", 255]].map(([nama, px]) => tambah(nama as string, emo(`o-${nama}`, px as number, 110, ANAK, 34), teks(`on-${nama}`, px as number, 130, nama as string, 8.6))),
      tambah("layar.", ...kartu("ot", 40, 150, 220, 30, W.krem, ["cerita, titik, dan angka"], 10)),
    ),
  ],
};

/* ------------------------------ 2. Mengambil: konsep ------------------------------ */
const SUARA_A1 = "Metode pertama, Mengambil. Ada sekumpulan benda di piring. Kita ambil sebagian dari kumpulan itu.";
const SUARA_A2 = "Misalnya ada enam jeruk. Ketuk dua jeruk untuk diambil: satu, dua.";
const SUARA_A3 = "Jeruk yang diambil tidak ada lagi di piring. Sekarang hitung yang tersisa: satu, dua, tiga, empat.";
const SUARA_A4 = "Jadi enam dikurangi dua sama dengan empat. Sisanya empat jeruk.";
const PIRING = (): Obj => kotak("pr", 30, 74, 240, 44, "#F1F5F9", W.biru, { rx: 10, tebal: 1.6 });
const JERUK_P: Titik[] = Array.from({ length: 6 }, (_, i) => ({ x: 60 + 36 * i, y: 96 }));
const DIAMBIL: Titik[] = [{ x: 110, y: 160 }, { x: 190, y: 160 }];

export const ADEGAN_LUAR_AMBIL: AdeganStory = {
  id: "luar-ambil",
  judul: "Mengambil: ambil sebagian dari kumpulan",
  sumber: "Metode luar: Mengambil",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_A1, tambah("pertama,", ...kepala(0)), tambah("piring.", PIRING(), ...JERUK_P.map((p, i) => emo(`j${i}`, p.x, p.y, JERUK, 22))), tambah("ambil@2", emo("tg", 150, 150, "👆", 30))),
    k(SUARA_A2, tambah("Misalnya", ...kartu("aq", 90, 126, 120, 22, W.krem, ["6 − 2 = ?"], 11)), ...pindahAksi(SUARA_A2, ["j4", "j5"], DIAMBIL, "diambil:", 0.6), tambah("ketuk", emo("ig", 150, 190, "\u{1F446}", 14))),
    k(SUARA_A3, hapus(0, "aq-k", "aq-t0"), tambah("tidak", ...kartu("ad", 60, 130, 180, 22, W.merahMuda, ["yang diambil: 2 jeruk"], 10)), ...hitungMuncul(SUARA_A3, "a", JERUK_P.slice(0, 4), () => [], "tersisa:")),
    k(SUARA_A4, sorotkan("Sisanya", "pr"), tambah("Jadi", ...kartu("ah", 60, 176, 180, 24, W.emas, ["6 − 2 = 4"], 12))),
  ],
};

/* ------------------------------ 3. Mengambil: terapan ------------------------------ */
const SUARA_T1 = "Soal cerita: Malosi punya sembilan kelereng. Malosi memberikan empat kelereng kepada Upe. Berapa sisa kelereng Malosi?";
const SUARA_T2 = "Ambil empat kelereng untuk Upe. Ketuk satu, dua, tiga, empat.";
const SUARA_T3 = "Hitung yang tersisa di tempatnya: satu, dua, tiga, empat, lima. Sisanya lima kelereng.";
const SUARA_T4 = "Sembilan dikurangi empat sama dengan lima. Jawabannya, sisa kelereng Malosi ada lima.";
const KEL_P: Titik[] = Array.from({ length: 9 }, (_, i) => ({ x: i < 5 ? 50 + 50 * i : 75 + 50 * (i - 5), y: i < 5 ? 70 : 102 }));
const WARNA_KEL = ["#F472B6", "#38BDF8", "#A3E635", "#FB923C", "#818CF8"];
const KE_UPE: Titik[] = [0, 1, 2, 3].map((i) => ({ x: 90 + 40 * i, y: 160 }));

export const ADEGAN_LUAR_AMBIL_TERAPAN: AdeganStory = {
  id: "luar-ambil-terapan",
  judul: "Mengambil: kelereng Malosi",
  sumber: "Metode luar: Mengambil, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, ...kepala(0)),
      tambah("sembilan", ...KEL_P.map((p, i) => bulat(`kl${i}`, p.x, p.y, 10, WARNA_KEL[i % 5]))),
      tambah("Upe.", ...kartu("tq", 80, 124, 140, 22, W.krem, ["Malosi memberi Upe: 4"], 9.4)),
    ),
    k(SUARA_T2, ...pindahAksi(SUARA_T2, ["kl5", "kl6", "kl7", "kl8"], KE_UPE, "Ketuk", 0.6), tambah("Ambil", emo("tg", 262, 150, "👆", 28))),
    k(SUARA_T3, ...hitungMuncul(SUARA_T3, "t", KEL_P.slice(0, 5), () => [], "tempatnya:"), tambah("Sisanya", ...kartu("ts", 60, 176, 180, 24, W.hijauMuda, ["sisa: 5 kelereng"], 10))),
    k(SUARA_T4, tambah("Sembilan", ...kartu("tj", 50, 148, 200, 22, W.emas, ["9 − 4 = 5"], 12)), tambah("Jawabannya,", emo("ok", 262, 84, "✅", 26))),
  ],
};
