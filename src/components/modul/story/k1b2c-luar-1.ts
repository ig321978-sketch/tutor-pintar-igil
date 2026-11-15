import type { AdeganStory, Obj } from "./logika-story";
import { W, deretBilangan, emo, judul, kartu, teks } from "./k1b2c-gambar";
import { bersih, hapus, k, langkahDeret, redamkan, sorotkan, tambah } from "./k1b2c-bantu";

export const NAMA_METODE = ["Counting On", "Part–Part–Whole", "Ten Frame Add"];
export const NAMA_METODE_ID = ["Menghitung Maju", "Bagian–Utuh", "Jumlah di Bingkai Sepuluh"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

const ANAK = "\u{1F9D2}";
const KATAK = "\u{1F438}";
const x = (v: number): number => 33 + 26 * (v - 1);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara punya cara lain untuk mengajar soal cerita penjumlahan. Di video ini kita lihat tiga cara itu.";
const SUARA_O2 = "Tiga metode itu: Counting On, Part–Part–Whole, dan Ten Frame Add.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Menghitung Maju, Bagian–Utuh, dan Jumlah di Bingkai Sepuluh.";
const SUARA_O4 = "Ketiga cara ini sama-sama membantu kita menjumlahkan dengan mudah, dari cerita sampai ke jawabannya.";
const SUARA_O5 = "Kita akan mencoba tiap cara bersama Upe, Kira, Malosi, dan Wei, seperti kamu mencobanya di layar.";

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
      ...NAMA_METODE.map((m, i) => tambah(["Counting", "Part", "Ten"][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      ...NAMA_METODE_ID.map((m, i) => tambah(["Menghitung", "Bagian", "Jumlah"][i], ...kartu(`n${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
      tambah("Sepuluh.", teks("pk10", 262, 162, "10", 13, W.merah)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Dari cerita ke jawaban")),
      tambah("membantu", emo("i1", 60, 90, "\u{1F463}", 40), emo("i2", 150, 90, "\u{1F9E9}", 40), emo("i3", 240, 90, "\u{1F51F}", 40)),
      tambah("mudah,", ...kartu("iq", 30, 124, 240, 44, W.emas, ["menjumlahkan dengan mudah", "dari cerita sampai jawaban"], 10)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Dicoba bersama")),
      ...[["Upe", 45], ["Kira", 115], ["Malosi", 185], ["Wei", 255]].map(([nama, px]) => tambah(nama as string, emo(`o-${nama}`, px as number, 110, ANAK, 34), teks(`on-${nama}`, px as number, 130, nama as string, 8.6))),
      tambah("layar.", ...kartu("ot", 40, 150, 220, 30, W.krem, ["cerita, titik, dan angka"], 10)),
    ),
  ],
};

/* ------------------------------ 2. Counting On: konsep ------------------------------ */
const SUARA_M1 = "Metode pertama, Counting On, atau Menghitung Maju. Mulai dari bilangan pertama, lalu maju.";
const SUARA_M2 = "Misalnya empat ditambah dua. Kita mulai dari bilangan empat. Kita tidak perlu menghitung dari satu lagi.";
const SUARA_M3 = "Lalu maju sebanyak bilangan kedua, yaitu dua langkah. Lima, enam. Kita berhenti di enam.";
const SUARA_M4 = "Jadi empat ditambah dua sama dengan enam. Cara ini cepat, terutama kalau bilangan pertamanya besar.";

export const ADEGAN_LUAR_MAJU: AdeganStory = {
  id: "luar-maju",
  judul: "Counting On: mulai dari bilangan pertama",
  sumber: "Metode luar: Counting On",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_M1, tambah("pertama,", ...kepala(0)), tambah("Mulai", emo("mj", 100, 100, "\u{1F463}", 46)), tambah("maju.", emo("pm", 190, 100, "➡️", 46))),
    k(SUARA_M2, hapus(0, "mj", "pm"), tambah(0, ...deretBilangan("mu", 90)), tambah("empat.", emo("up", x(4), 86, KATAK, 22)), sorotkan("empat.", "muk4"), tambah("Misalnya", ...kartu("mq", 60, 56, 180, 24, W.krem, ["4 + 2 = ?"], 11))),
    k(SUARA_M3, ...langkahDeret(SUARA_M3, [5, 6], "mu", 90, "langkah."), tambah("maju", ...kartu("ml", 40, 136, 220, 26, W.hijauMuda, ["maju 2 langkah dari 4"], 10))),
    k(SUARA_M4, redamkan(0, "muk4", "muk5"), sorotkan(0, "muk6"), tambah("sama", ...kartu("mh", 60, 170, 180, 26, W.emas, ["4 + 2 = 6"], 12)), tambah("Jadi", emo("ok", 262, 56, "✅", 26))),
  ],
};

/* ------------------------------ 3. Counting On: terapan ------------------------------ */
const SUARA_T1 = "Soal cerita: Wei punya lima kue. Lalu Wei diberi lagi tiga kue. Semua kue Wei ada berapa?";
const SUARA_T2 = "Mulai dari lima. Maju tiga langkah: enam, tujuh, delapan.";
const SUARA_T3 = "Kita berhenti di delapan. Lima ditambah tiga sama dengan delapan.";
const SUARA_T4 = "Jawabannya, Wei punya delapan kue. Dengan menghitung maju, kita tidak perlu menghitung semuanya dari awal.";

export const ADEGAN_LUAR_MAJU_TERAPAN: AdeganStory = {
  id: "luar-maju-terapan",
  judul: "Counting On: kue Wei",
  sumber: "Metode luar: Counting On, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, ...kepala(0), ...deretBilangan("tu", 100)),
      tambah("Soal", ...kartu("tq", 30, 56, 240, 24, W.krem, ["Wei: 5 kue, diberi lagi 3 kue"], 10)),
      tambah("lima", emo("up", x(5), 96, KATAK, 22)),
      sorotkan("lima", "tuk5"),
    ),
    k(SUARA_T2, ...langkahDeret(SUARA_T2, [6, 7, 8], "tu", 100, "langkah:"), tambah("tiga", ...kartu("tl", 40, 140, 220, 24, W.hijauMuda, ["maju 3 langkah dari 5"], 10))),
    k(SUARA_T3, tambah("sama", ...kartu("th", 70, 170, 160, 26, W.emas, ["5 + 3 = 8"], 12))),
    k(SUARA_T4, tambah("Wei", ...kartu("tj", 20, 170, 220, 26, W.hijauMuda, ["Wei punya 8 kue."], 10.4)), hapus(0, "th-k", "th-t0"), tambah("Jawabannya,", emo("ok", 262, 184, "✅", 28))),
  ],
};
