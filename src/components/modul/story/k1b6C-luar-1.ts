import type { AdeganStory, Obj } from "./logika-story";
import { W, benda, emo, garisBilangan, idKartu, judul, kartu, kartuAngka, lompat, lompatBawah, petak, tangan, xBil, type Titik } from "./k1b6C-gambar";
import { bersih, hapus, idx, k, mundurAksi, redamkan, sorotkan, tambah, ubah, urutBilangan, urutMundur } from "./k1b6C-bantu";

export const NAMA_METODE_ID = ["Maju dan Mundur", "Pasangan sampai 20", "Menjadikan Sepuluh"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);

/** Tiga kartu pilihan bilangan (id c1, c2, c3), pojok kiri-atas di tinggi `y`. */
export const pilihanBil = (y: number, isi: string[]): Obj[] => isi.flatMap((t, i) => kartuAngka(`c${i + 1}`, [20, 110, 200][i], y, t, [W.hijauMuda, W.pink, W.langit][i], 80, 34, 18));

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara mengajarkan pengurangan dengan cara yang berbeda-beda. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Maju dan Mundur, Pasangan sampai dua puluh, dan Menjadikan Sepuluh.";
const SUARA_O3 = "Ketiganya menjawab satu pertanyaan. Bagaimana mencari sisa benda yang pergi dengan cepat dan benar?";
const SUARA_O4 = "Kita akan melihat tiap metode dengan benda sehari-hari, seperti apel, kelereng, balon, dan bolu kukus.";
const SUARA_O5 = "Semua contoh memakai bilangan belasan, dan hasilnya kurang dari dua puluh. Kamu cukup mengetuk, menyeret, dan melihat layar dengan teliti.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk mengurangi",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah("negara", emo("gl", 150, 110, "\u{1F30D}", 50)), tambah("tiga", ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      ...NAMA_METODE_ID.map((m, i) => tambah(["Maju", "Pasangan", "Menjadikan"][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah("satu", emo("i1", 60, 84, "\u{1F446}", 34), emo("i2", 150, 84, "❓", 34), emo("i3", 240, 84, "\u{1F440}", 34)),
      tambah("Bagaimana", ...kartu("iq", 20, 112, 260, 52, W.emas, ["bagaimana mencari sisa benda", "yang pergi", "dengan cepat dan benar?"], 10)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Benda sehari-hari")),
      tambah("apel,", ...benda("apel", "ob0", 50, 90, 14, 0)),
      tambah("kelereng,", ...benda("kelereng", "ob1", 110, 90, 14, 1)),
      tambah("balon,", ...benda("balon", "ob2", 175, 90, 14, 0)),
      tambah("bolu", ...benda("bolu", "ob3", 245, 90, 14)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Bilangan belasan")),
      ...[11, 12, 13, 14, 15].map((n, i) => tambah(0, ...kartuAngka(`ob${i}`, 14 + i * 56, 50, String(n), [W.krem, W.langit, W.hijauMuda, W.pink, W.lavender][i], 46, 36, 18))),
      tambah("dua", ...kartu("ob5", 70, 100, 160, 30, W.emas, ["hasil kurang dari 20"], 11)),
      tambah("mengetuk,", tangan(150, 170)),
    ),
  ],
};

/* ------------------------------ 2. Maju dan Mundur: konsep ------------------------------ */
const YL = 118;
const SUARA_A1 = "Metode pertama bernama Maju dan Mundur. Mundur untuk mengurangi, maju untuk menambah.";
const SUARA_A2 = "Mulai dari tujuh belas, mundur tiga kali. Enam belas, lima belas, empat belas.";
const SUARA_A3 = "Katak mendarat di empat belas. Jadi tujuh belas dikurangi tiga sama dengan empat belas.";
const SUARA_A4 = "Sekarang maju untuk memeriksa. Dari empat belas maju tiga kali. Lima belas, enam belas, tujuh belas.";
const SUARA_A5 = "Kita kembali ke tujuh belas, jadi benar. Empat belas ditambah tiga sama dengan tujuh belas. Ucapkan lagi mengikuti suara guru.";

export const ADEGAN_LUAR_MUNDUR: AdeganStory = {
  id: "luar-mundur",
  judul: "Maju dan Mundur: mundur lalu maju untuk memeriksa",
  sumber: "Metode luar: Maju dan Mundur",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_A1,
      tambah("pertama", ...kepala(0)),
      tambah(idx(SUARA_A1, "Mundur", 2), ...garisBilangan(YL)),
      tambah(idx(SUARA_A1, "maju"), emo("kt", xBil(17), 96, "\u{1F438}", 26)),
    ),
    k(
      SUARA_A2,
      tambah("Mulai", ...kartu("lq", 90, 54, 120, 22, W.emas, ["17 - 3 = ?"], 11)),
      sorotkan("tujuh", "gb-n17"),
      ...urutMundur(SUARA_A2, 16, 14).flatMap((p, q) => [tambah(p, lompat(`lp${16 - q}`, 17 - q, 16 - q, YL)), ubah(p, { id: "kt", x: xBil(16 - q) })]),
    ),
    k(
      SUARA_A3,
      redamkan(0, "gb-n17"),
      hapus(0, ...idKartu("lq")),
      tambah("Jadi", ...kartu("lr", 90, 54, 120, 22, W.hijauMuda, ["17 - 3 = 14"], 11)),
      sorotkan("mendarat", "gb-n14"),
    ),
    k(
      SUARA_A4,
      redamkan(0, "gb-n14"),
      ...urutBilangan(SUARA_A4, 15, 17, "kali").map((p, q) => tambah(p, lompatBawah(`lm${15 + q}`, 14 + q, 15 + q, YL))),
      ...urutBilangan(SUARA_A4, 15, 17, "kali").map((p, q) => ubah(p, { id: "kt", x: xBil(15 + q) })),
    ),
    k(
      SUARA_A5,
      sorotkan("kembali", "gb-n17"),
      tambah("Empat", ...kartu("ls", 90, 150, 120, 24, W.langit, ["14 + 3 = 17"], 11)),
      tambah("Ucapkan", emo("ucap", 34, 186, "\u{1F5E3}", 26)),
    ),
  ],
};

/* ------------------------------ 3. Maju dan Mundur: terapan ------------------------------ */
const SUARA_B1 = "Terapkan pada delapan belas balon. Lima balon terbang tinggi ke langit.";
const SUARA_B2 = "Mundur lima kali sambil mengetuk balon yang terbang. Tujuh belas, enam belas, lima belas, empat belas, tiga belas.";
const SUARA_B3 = "Balon yang tinggal ada tiga belas. Delapan belas dikurangi lima sama dengan tiga belas.";
const SUARA_B4 = "Coba pilih jawabannya. Ada dua belas, tiga belas, atau empat belas? Ketuk bilangan yang tepat.";
const PB: Titik[] = petak(18, 6, 40, 66, 44, 34);

export const ADEGAN_LUAR_MUNDUR_TERAPAN: AdeganStory = {
  id: "luar-mundur-terapan",
  judul: "Maju dan Mundur: delapan belas balon",
  sumber: "Metode luar: Maju dan Mundur, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah("Terapkan", ...kepala(0)),
      tambah("balon.", ...PB.flatMap((p, i) => benda("balon", `lb${i}`, p.x, p.y, 9, i))),
      tambah("delapan", ...kartu("bn", 60, 168, 180, 24, W.krem, ["18 balon, 5 terbang"], 10)),
      sorotkan("terbang", "lb13", "lb14", "lb15", "lb16", "lb17"),
    ),
    k(SUARA_B2, ...mundurAksi(SUARA_B2, "lb", PB, 5)),
    k(
      SUARA_B3,
      hapus(0, ...idKartu("bn")),
      tambah("Delapan", ...kartu("bj", 60, 168, 180, 24, W.emas, ["18 - 5 = 13"], 11)),
      sorotkan("tinggal", ...Array.from({ length: 13 }, (_, i) => `lb${i}`)),
    ),
    k(
      SUARA_B4,
      hapus(0, ...idKartu("bj")),
      redamkan(0, ...Array.from({ length: 13 }, (_, i) => `lb${i}`)),
      tambah("Coba", ...pilihanBil(150, ["12", "13", "14"])),
      sorotkan("Ketuk", "c2-k"),
    ),
  ],
};
