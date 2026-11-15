import type { AdeganStory, Aksi, Obj } from "./logika-story";
import { W, bulat, emo, judul, kartu, kartuAngka, keranjang, piring, teks, benda, type Titik } from "./k1b3a-gambar";
import { bersih, hapus, hitungAksi, idx, k, sorotkan, tambah, ubah, urutKata } from "./k1b3a-bantu";

export const NAMA_METODE_ID = ["Mengambil", "Hitung Mundur", "Kurang di Bingkai"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara mengajarkan pengurangan dengan cara yang berbeda-beda. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Mengambil, Hitung Mundur, dan Kurang di Bingkai.";
const SUARA_O3 = "Semua metode ini menjawab satu pertanyaan. Bagaimana mencari sisa dengan cepat dan benar?";
const SUARA_O4 = "Kita akan melihat tiap metode dengan benda di sekitar kita, seperti kelereng, bola, balon, dan kupu-kupu.";
const SUARA_O5 = "Semua cerita memakai bilangan sampai sepuluh saja. Kamu cukup mengetuk dan melihat layar dengan teliti.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk mengurangi",
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
      ...NAMA_METODE_ID.map((m, i) => tambah(["Mengambil,", "Hitung", "Bingkai."][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah("satu", emo("i1", 60, 90, "\u{1F446}", 36), emo("i2", 150, 90, "➖", 36), emo("i3", 240, 90, "\u{1F440}", 36)),
      tambah("Bagaimana", ...kartu("iq", 20, 120, 260, 44, W.emas, ["bagaimana mencari sisa", "dengan cepat dan benar?"], 10)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Benda-benda di sekitar kita")),
      tambah("kelereng,", bulat("td", 50, 96, 16, "#F472B6", W.biru, { tebal: 2 })),
      tambah("bola,", emo("tb", 112, 100, "⚽", 40)),
      tambah("balon,", emo("tc", 188, 100, "\u{1F388}", 40)),
      tambah("kupu-kupu.", emo("te", 250, 100, "\u{1F98B}", 40)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Bilangan sampai sepuluh")),
      tambah("sepuluh", teks("s10", 150, 100, "10", 54, W.merah)),
      tambah("mengetuk", emo("jr", 150, 160, "\u{1F446}", 36)),
    ),
  ],
};

/* ------------------------------ 2. Mengambil: konsep (tujuh kelereng, dua dikeluarkan) ------------------------------ */
const SUARA_A1 = "Metode pertama bernama Mengambil. Dari kumpulan benda, kita keluarkan sebagian benda.";
const SUARA_A2 = "Contohnya ada tujuh kelereng di piring. Kita hitung dulu. Satu, dua, tiga, empat, lima, enam, tujuh.";
const SUARA_A3 = "Sekarang kita keluarkan dua kelereng. Ketuk dua kelereng terakhir, lalu pindahkan ke kantong.";
const SUARA_A4 = "Sekarang hitung kelereng yang masih ada di piring. Satu, dua, tiga, empat, lima. Tersisa lima kelereng.";
const SUARA_A5 = "Jadi tujuh dikurangi dua sama dengan lima. Metode Mengambil cocok kalau benda di cerita benar-benar pergi.";
const KA: Titik[] = [{ x: 80, y: 95 }, { x: 115, y: 92 }, { x: 150, y: 100 }, { x: 70, y: 125 }, { x: 105, y: 130 }, { x: 140, y: 132 }, { x: 165, y: 120 }];
const WARNA_KA = ["#38BDF8", "#F472B6", "#A3E635", "#FB923C", "#818CF8", "#38BDF8", "#F472B6"];
const kelA = (i: number) => bulat(`am${i}`, KA[i].x, KA[i].y, 9, WARNA_KA[i], W.biru, { tebal: 2 });

export const ADEGAN_LUAR_AMBIL: AdeganStory = {
  id: "luar-ambil",
  judul: "Mengambil: keluarkan sebagian dari kumpulan",
  sumber: "Metode luar: Mengambil",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_A1, tambah("pertama", ...kepala(0)), tambah("kumpulan", piring("ap", 110, 118, 66, { z: -1 }), ...KA.map((_, i) => kelA(i)))),
    k(SUARA_A2, ...hitungAksi(SUARA_A2, "am", KA, "dulu.")),
    k(
      SUARA_A3,
      hapus(0, "tg", "amn0", "amn1", "amn2", "amn3", "amn4", "amn5", "amn6"),
      tambah(0, ...kartu("kt", 200, 70, 90, 60, "#FDE68A", ["kantong"], 9, { z: -1 })),
      tambah(idx(SUARA_A3, "Ketuk"), emo("tg", KA[5].x, KA[5].y + 33, "\u{1F446}", 22)),
      ubah(idx(SUARA_A3, "pindahkan"), { id: "am5", x: 232, y: 120 }, { id: "am6", x: 262, y: 120 }, { id: "tg", x: 247, y: 150 }),
    ),
    k(SUARA_A4, hapus(0, "tg"), ...hitungAksi(SUARA_A4, "am", KA.slice(0, 5), "piring.")),
    k(SUARA_A5, hapus(0, "tg", "amn0", "amn1", "amn2", "amn3", "amn4"), tambah("Jadi", ...kartu("aj", 176, 150, 116, 32, W.emas, ["7 − 2 = 5"], 14))),
  ],
};

/* ------------------------------ 3. Mengambil: terapan (sembilan bola, empat ke keranjang) ------------------------------ */
const SUARA_B1 = "Terapkan pada bola Malosi. Ada sembilan bola di lapangan. Empat bola menggelinding ke keranjang.";
const SUARA_B2 = "Hitung bola mula-mula. Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan.";
const SUARA_B3 = "Sekarang empat bola harus pergi. Ketuk empat bola terakhir, lalu pindahkan bola itu ke keranjang.";
const SUARA_B4 = "Sekarang hitung bola yang masih ada di lapangan. Satu, dua, tiga, empat, lima. Sisanya lima bola.";
const SUARA_B5 = "Sembilan dikurangi empat sama dengan lima. Kita mengeluarkan sebagian bola dari kumpulan, lalu menghitung sisanya.";
const P9T: Titik[] = Array.from({ length: 9 }, (_, i) => (i < 5 ? { x: 40 + 40 * i, y: 78 } : { x: 40 + 40 * (i - 5), y: 138 }));
const bolaB = (i: number) => benda("bola", `ab${i}`, P9T[i].x, P9T[i].y, 11, i);
const MASUK: Titik[] = [{ x: 231, y: 140 }, { x: 266, y: 140 }, { x: 231, y: 164 }, { x: 266, y: 164 }];

export const ADEGAN_LUAR_AMBIL_TERAPAN: AdeganStory = {
  id: "luar-ambil-terapan",
  judul: "Mengambil: bola Malosi",
  sumber: "Metode luar: Mengambil, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_B1, tambah("pada", ...kepala(0)), tambah("sembilan", ...P9T.flatMap((_, i) => bolaB(i))), tambah("keranjang.", ...keranjang("kr", 210, 122, 84, 56))),
    k(SUARA_B2, ...hitungAksi(SUARA_B2, "ab", P9T, "mula-mula.")),
    k(
      SUARA_B3,
      hapus(0, "tg", ...P9T.map((_, i) => `abn${i}`)),
      tambah(idx(SUARA_B3, "Ketuk"), emo("tg", P9T[5].x, P9T[5].y + 33, "\u{1F446}", 22)),
      ubah(idx(SUARA_B3, "pindahkan"), ...[5, 6, 7, 8].map((q, j) => ({ id: `ab${q}`, x: MASUK[j].x, y: MASUK[j].y })), { id: "tg", x: 250, y: 190 }),
    ),
    k(SUARA_B4, hapus(0, "tg"), ...hitungAksi(SUARA_B4, "ab", P9T.slice(0, 5), "lapangan.")),
    k(SUARA_B5, hapus(0, "tg", "abn0", "abn1", "abn2", "abn3", "abn4"), tambah("Sembilan", ...kartu("bj", 20, 120, 160, 34, W.emas, ["9 − 4 = 5"], 15))),
  ],
};

/* ------------------------------ 4. Hitung Mundur: konsep ------------------------------ */
const SUARA_C1 = "Metode kedua bernama Hitung Mundur. Mulai dari bilangan awal, lalu mundur.";
const SUARA_C2 = "Contohnya delapan dikurangi tiga. Kita mulai dari delapan. Tidak perlu menghitung dari awal lagi.";
const SUARA_C3 = "Lalu mundur tiga langkah. Tujuh, enam, lima.";
const SUARA_C4 = "Berhenti di lima. Jadi delapan dikurangi tiga sama dengan lima. Kita sampai di jawabannya.";
const UBIN = (n: number): number => 10 + 28 * (n - 1) + 13;
const ubin = (): Obj[] => Array.from({ length: 10 }, (_, i) => kartuAngka(`nm${i + 1}`, 10 + 28 * i, 76, String(i + 1), W.krem, 26, 28, 14)).flat();

export const ADEGAN_LUAR_MUNDUR: AdeganStory = {
  id: "luar-mundur",
  judul: "Hitung Mundur: mulai dari bilangan awal",
  sumber: "Metode luar: Hitung Mundur",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_C1, tambah("kedua", ...kepala(1)), tambah("bilangan", ...ubin())),
    k(
      SUARA_C2,
      tambah("mulai", emo("kt", UBIN(8), 66, "\u{1F438}", 24), teks("ms", UBIN(8), 124, "mulai", 9, W.merah)),
      sorotkan(idx(SUARA_C2, "delapan", 2), "nm8-k"),
    ),
    k(
      SUARA_C3,
      ...urutKata(SUARA_C3, ["Tujuh", "enam", "lima"]).flatMap((p, i) => [ubah(p, { id: "kt", x: UBIN(7 - i) }), tambah(p, teks(`ml${i}`, UBIN(7 - i), 124, `−${i + 1}`, 10, W.hijau))]),
    ),
    k(SUARA_C4, sorotkan(idx(SUARA_C4, "lima"), "nm5-k"), tambah("Jadi", ...kartu("mj", 80, 146, 140, 30, W.emas, ["8 − 3 = 5"], 14))),
  ],
};

/* ------------------------------ 5. Hitung Mundur: terapan (sembilan balon, tiga terbang) ------------------------------ */
const SUARA_D1 = "Terapkan pada balon Wei. Wei punya sembilan balon. Tiga balon terbang ke langit.";
const SUARA_D2 = "Kita mulai dari sembilan. Lalu mundur tiga langkah. Delapan, tujuh, enam. Tiga balon terbang pergi satu per satu.";
const SUARA_D3 = "Berhenti di enam. Sekarang hitung balon yang masih ada. Satu, dua, tiga, empat, lima, enam.";
const SUARA_D4 = "Sembilan dikurangi tiga sama dengan enam. Hitung mundur membantu kita tanpa menghitung semuanya lagi.";
const balonD = (i: number) => benda("balon", `ba${i}`, P9T[i].x, P9T[i].y, 12, i);
const terbangD = (at: number, i: number, sisa: string): Aksi[] => [{ at, hapus: [`ba${i}`, `ba${i}-x`] }, ubah(at, { id: "ct", isi: sisa })];

export const ADEGAN_LUAR_MUNDUR_TERAPAN: AdeganStory = {
  id: "luar-mundur-terapan",
  judul: "Hitung Mundur: balon Wei",
  sumber: "Metode luar: Hitung Mundur, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_D1, tambah("pada", ...kepala(1)), tambah("sembilan", ...P9T.flatMap((_, i) => balonD(i)), teks("ct", 262, 70, "9", 44, W.merah))),
    k(SUARA_D2, ...terbangD(8, 8, "8"), ...terbangD(9, 7, "7"), ...terbangD(10, 6, "6")),
    k(SUARA_D3, ...hitungAksi(SUARA_D3, "ba", P9T.slice(0, 6), "ada.")),
    k(SUARA_D4, hapus(0, "tg", "ban0", "ban1", "ban2", "ban3", "ban4", "ban5"), tambah("Sembilan", ...kartu("dj", 170, 110, 120, 34, W.emas, ["9 − 3 = 6"], 14))),
  ],
};
