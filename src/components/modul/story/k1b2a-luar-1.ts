import type { AdeganStory, Obj } from "./logika-story";
import { BIRU_PENSIL, MERAH_BENDA, W, baris, bulat, emo, ikatan, judul, kartu, kartuAngka, pensilSatu, teks, type Titik } from "./k1b2a-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah, urutKata } from "./k1b2a-bantu";

export const NAMA_METODE = ["Counting On", "Part-Part-Whole", "Ten Frame Add"];
export const NAMA_METODE_ID = ["Menghitung Maju", "Bagian-Utuh", "Jumlah di Bingkai Sepuluh"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

const ANAK_EMO = "\u{1F9D2}";

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara mengajarkan penjumlahan dengan cara yang berbeda-beda. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu: Counting On, Part-Part-Whole, dan Ten Frame Add.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Menghitung Maju, Bagian-Utuh, dan Jumlah di Bingkai Sepuluh.";
const SUARA_O4 = "Semua metode ini menjawab satu pertanyaan: bagaimana menjumlahkan dua bagian dengan cepat dan benar?";
const SUARA_O5 = "Kita akan melihat tiap metode dengan benda di taman, seperti bebek, mobil, dan kelereng.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk menjumlahkan",
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
      ...NAMA_METODE.map((m, i) => tambah(["Counting", "Part-Part-Whole,", "Frame"][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      ...NAMA_METODE_ID.map((m, i) => tambah(["Menghitung", "Bagian-Utuh,", "Jumlah"][i], ...kartu(`n${i}`, 20, 40 + i * 44, 260, 36, WARNA_METODE[i], [`${i + 1}. ${m}`], 10.5))),
      tambah("Sepuluh.", teks("n10", 150, 184, "jumlah sampai 10", 10, W.ungu)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah("satu", emo("i1", 60, 90, "\u{1F446}", 36), emo("i2", 150, 90, "➕", 36), emo("i3", 240, 90, "\u{1F440}", 36)),
      tambah("pertanyaan:", ...kartu("iq", 20, 120, 260, 44, W.emas, ["bagaimana menjumlahkan", "dua bagian dengan benar?"], 10)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Benda-benda di taman")),
      tambah("bebek,", emo("tb", 60, 100, "\u{1F986}", 40)),
      tambah("mobil,", emo("tc", 150, 100, "\u{1F697}", 40)),
      tambah("kelereng.", bulat("td", 240, 90, 16, "#F472B6", W.biru, { tebal: 2 })),
    ),
  ],
};

/* ------------------------------ 2. Counting On: konsep ------------------------------ */
const SUARA_C1 = "Metode pertama, Counting On, atau Menghitung Maju. Mulai dari bilangan pertama, lalu maju.";
const SUARA_C2 = "Contohnya lima ditambah tiga. Kita mulai dari lima. Tidak perlu menghitung dari awal lagi.";
const SUARA_C3 = "Lalu maju tiga langkah. Enam, tujuh, delapan.";
const SUARA_C4 = "Berhenti di delapan. Jadi lima ditambah tiga sama dengan delapan.";
const UBIN = (n: number): number => 10 + 28 * (n - 1) + 13;
const ubin = (): Obj[] => Array.from({ length: 10 }, (_, i) => kartuAngka(`nm${i + 1}`, 10 + 28 * i, 76, String(i + 1), W.krem, 26, 28, 14)).flat();

export const ADEGAN_LUAR_MAJU: AdeganStory = {
  id: "luar-maju",
  judul: "Counting On: mulai dari bilangan pertama",
  sumber: "Metode luar: Counting On",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_C1, tambah("pertama,", ...kepala(0)), tambah("bilangan", ...ubin())),
    k(
      SUARA_C2,
      tambah("Kita", emo("kt", UBIN(5), 66, "\u{1F438}", 24), teks("ms", UBIN(5), 124, "mulai", 9, W.merah)),
      sorotkan("lima.", "nm5-k"),
    ),
    k(
      SUARA_C3,
      ...urutKata(SUARA_C3, ["Enam", "tujuh", "delapan"]).flatMap((p, i) => [ubah(p, { id: "kt", x: UBIN(6 + i) }), tambah(p, teks(`ml${i}`, UBIN(6 + i), 124, `+${i + 1}`, 10, W.hijau))]),
    ),
    k(SUARA_C4, sorotkan(idx(SUARA_C4, "delapan"), "nm8-k"), tambah("Jadi", ...kartu("mj", 80, 146, 140, 30, W.emas, ["5 + 3 = 8"], 14))),
  ],
};

/* ------------------------------ 3. Counting On: terapan ------------------------------ */
const SUARA_D1 = "Terapkan pada lompat tali. Empat anak sudah bermain, lalu datang lagi dua anak.";
const SUARA_D2 = "Kita tidak menghitung dari awal lagi. Kita mulai dari empat.";
const SUARA_D3 = "Lalu maju sesuai anak yang datang. Lima, enam.";
const SUARA_D4 = "Berhenti di enam. Jadi empat ditambah dua sama dengan enam anak.";
const P6: Titik[] = baris(6, 112, 44);
const kid = (i: number) => emo(`ta${i}`, P6[i].x, P6[i].y, ANAK_EMO, 26);

export const ADEGAN_LUAR_MAJU_TERAPAN: AdeganStory = {
  id: "luar-maju-terapan",
  judul: "Counting On: anak lompat tali",
  sumber: "Metode luar: Counting On, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_D1, tambah("pada", ...kepala(0)), tambah("Empat", ...[0, 1, 2, 3].map(kid)), tambah("datang", ...[4, 5].map(kid))),
    k(SUARA_D2, tambah("mulai", teks("m4", 106, 84, "4", 30, W.biru)), sorotkan("empat.", "ta0", "ta1", "ta2", "ta3")),
    k(
      SUARA_D3,
      sorotkan("Lima,", "ta4"),
      tambah("Lima,", teks("m5", P6[4].x, 84, "5", 18, W.merah)),
      sorotkan("enam.", "ta5"),
      tambah("enam.", teks("m6", P6[5].x, 84, "6", 18, W.merah)),
    ),
    k(SUARA_D4, tambah("Jadi", ...kartu("dj", 70, 142, 160, 32, W.emas, ["4 + 2 = 6"], 15))),
  ],
};

/* ------------------------------ 4. Part-Part-Whole: konsep ------------------------------ */
const SUARA_P1 = "Metode kedua, Part-Part-Whole, atau Bagian-Utuh. Dua bagian membentuk jumlah.";
const SUARA_P2 = "Lihat tiga pensil merah dan empat pensil biru. Itu dua bagian.";
const SUARA_P3 = "Dua bagian itu digabung menjadi jumlah. Jumlahnya tujuh.";
const SUARA_P4 = "Kalimat tambahnya: tiga ditambah empat sama dengan tujuh. Bagian ditambah bagian sama dengan jumlah.";
const MERAH_X = [60, 84, 108];
const BIRU_X = [172, 196, 220, 244];

export const ADEGAN_LUAR_BAGIAN: AdeganStory = {
  id: "luar-bagian",
  judul: "Part-Part-Whole: dua bagian membentuk jumlah",
  sumber: "Metode luar: Part-Part-Whole",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_P1, tambah("kedua,", ...kepala(1)), tambah("Dua", ...ikatan("ik", 150, 78, ["?", "3", "4"], ["a", "b"]))),
    k(
      SUARA_P2,
      tambah("tiga", ...MERAH_X.map((x, i) => pensilSatu(`pr${i}`, x, 176, MERAH_BENDA, 1))),
      tambah("empat", ...BIRU_X.map((x, i) => pensilSatu(`pb${i}`, x, 176, BIRU_PENSIL, 1))),
    ),
    k(SUARA_P3, tambah("digabung", ...ikatan("ik", 150, 78, ["?", "3", "4"], ["u"])), ubah("tujuh.", { id: "ik-ut", isi: "7" })),
    k(
      SUARA_P4,
      hapus(0, ...MERAH_X.map((_, i) => `pr${i}`), ...BIRU_X.map((_, i) => `pb${i}`)),
      tambah("Kalimat", ...kartu("pj", 70, 160, 160, 30, W.emas, ["3 + 4 = 7"], 14)),
    ),
  ],
};
