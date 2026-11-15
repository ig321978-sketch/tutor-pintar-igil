import type { AdeganStory, Obj } from "./logika-story";
import { W, deret, emo, garis, judul, kartu, kartuAngka, keranjang, tata, teks, type Titik } from "./k1b1a-gambar";
import { bersih, hapus, hitungAksi, k, sorotkan, tambah, ubah, urutKata } from "./k1b1a-bantu";

export const NAMA_METODE = ["One-to-One", "Cardinality", "Subitizing"];
export const NAMA_METODE_ID = ["Korespondensi Satu-satu", "Kardinalitas", "Melihat Sekilas"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/** Kartu angka kecil di bawah benda ke-i beserta garis penghubungnya: id `${id}g{i}` dan `${id}c{i}-k`/`-t`. */
const sambungan = (id: string, pts: Titik[], yKartu: number, ke: number): Obj[] => [
  garis(`${id}g${ke}`, pts[ke].x, pts[ke].y + 13, 0, yKartu - (pts[ke].y + 13), W.biru, 1.6),
  ...kartuAngka(`${id}c${ke}`, pts[ke].x - 14, yKartu, String(ke + 1), W.krem, 28, 26, 16),
];

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara mengajarkan cara berhitung yang berbeda-beda. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu: One-to-One, Cardinality, dan Subitizing.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Korespondensi Satu-satu, Kardinalitas, dan Melihat Sekilas.";
const SUARA_O4 = "Semua metode ini menjawab satu pertanyaan: bagaimana menghitung banyak benda dengan benar?";
const SUARA_O5 = "Kita akan melihat tiap metode dengan benda-benda di taman, seperti bola, balon, dan kelereng.";

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
      ...NAMA_METODE.map((m, i) => tambah(["One-to-One,", "Cardinality,", "Subitizing."][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      ...NAMA_METODE_ID.map((m, i) => tambah(["Korespondensi", "Kardinalitas,", "Melihat"][i], ...kartu(`n${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah("satu", emo("i1", 60, 90, "\u{1F446}", 36), emo("i2", 150, 90, "\u{1F9FA}", 36), emo("i3", 240, 90, "\u{1F440}", 36)),
      tambah("pertanyaan:", ...kartu("iq", 20, 120, 260, 44, W.emas, ["bagaimana menghitung", "banyak benda dengan benar?"], 10)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Benda-benda di taman")),
      tambah("bola,", ...deret("bola", "tb", [{ x: 60, y: 100 }], 16)),
      tambah("balon,", ...deret("balon", "tc", [{ x: 150, y: 100 }], 18)),
      tambah("kelereng.", ...deret("kelereng", "td", [{ x: 240, y: 100 }], 28)),
    ),
  ],
};

/* ------------------------------ 2. One-to-One: konsep ------------------------------ */
const SUARA_S1 = "Metode pertama, One-to-One, atau Korespondensi Satu-satu. Satu benda dipasangkan dengan satu angka.";
const SUARA_S2 = "Tiap benda mendapat tepat satu angka. Tidak boleh dua angka untuk satu benda.";
const SUARA_S3 = "Juga tidak boleh ada benda yang terlewat. Semua benda harus mendapat angka.";
const SUARA_S4 = "Jadi satu benda, satu angka, tanpa terlewat dan tanpa dobel. Itulah metode pertama.";
const P4 = tata(4, 84);

export const ADEGAN_LUAR_SATU: AdeganStory = {
  id: "luar-satu",
  judul: "One-to-One: satu benda, satu angka",
  sumber: "Metode luar: One-to-One",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_S1,
      tambah("pertama,", ...kepala(0)),
      tambah("benda", ...deret("bola", "sa", P4, 12)),
      tambah("angka.", ...[0, 1, 2, 3].flatMap((i) => sambungan("sa", P4, 126, i))),
    ),
    k(
      SUARA_S2,
      sorotkan("tepat", "sa0", "sa1", "sa2", "sa3"),
      tambah("dua", teks("sx", P4[1].x, 64, "7", 15, W.merah)),
      tambah("Tidak", ...kartu("sw", 20, 160, 150, 30, W.merahMuda, ["1 benda, 2 angka: salah"], 8.6)),
    ),
    k(
      SUARA_S3,
      hapus(0, "sx", "sw-k", "sw-t0", "sag3", "sac3-k", "sac3-t"),
      tambah("terlewat.", ...kartu("st", 20, 160, 190, 30, W.merahMuda, ["ada benda tanpa angka: salah"], 8.6)),
      sorotkan("terlewat.", "sa3"),
    ),
    k(
      SUARA_S4,
      hapus(0, "st-k", "st-t0"),
      tambah(0, ...sambungan("sa", P4, 126, 3)),
      tambah("tanpa", emo("sok", 150, 178, "✅", 36)),
      tambah("Itulah", teks("sbt", 238, 188, "benar!", 12, W.hijau)),
    ),
  ],
};

/* ------------------------------ 3. One-to-One: terapan ------------------------------ */
const SUARA_T1 = "Sekarang terapkan pada enam kelereng. Kita pindahkan satu kelereng ke wadah sambil menyebut satu angka.";
const SUARA_T2 = "Satu, dua, tiga, empat, lima, enam. Tiap kelereng pindah satu kali.";
const SUARA_T3 = "Wadahnya sudah berisi enam kelereng. Di meja tidak ada kelereng yang tersisa.";
const SUARA_T4 = "Cara ini membantu anak yang suka melewatkan benda. Coba di rumah dengan kancing atau biji-bijian.";
const P6 = tata(6);
const TUJUAN = (i: number): Titik => ({ x: 190 + (i % 3) * 30, y: 160 + Math.floor(i / 3) * 20 });
const posKelereng = urutKata(SUARA_T2, ["satu", "dua", "tiga", "empat", "lima", "enam"]);

export const ADEGAN_LUAR_SATU_TERAPAN: AdeganStory = {
  id: "luar-satu-terapan",
  judul: "One-to-One: memindahkan kelereng",
  sumber: "Metode luar: One-to-One, terapan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah("pada", ...kepala(0)),
      tambah("kelereng", ...deret("kelereng", "ke", P6, 16)),
      tambah("wadah", ...keranjang("kw", 170, 150, 120, 44)),
    ),
    k(
      SUARA_T2,
      tambah(0, teks("kc", 62, 180, "0", 36, W.merah)),
      ...posKelereng.flatMap((p, i) => [ubah(p, { id: `ke${i}`, x: TUJUAN(i).x, y: TUJUAN(i).y }, { id: "kc", isi: String(i + 1) })]),
    ),
    k(SUARA_T3, sorotkan("enam", "ke0", "ke1", "ke2", "ke3", "ke4", "ke5"), tambah("tersisa.", emo("sk", 230, 110, "✅", 40))),
    k(
      SUARA_T4,
      tambah("membantu", ...kartu("kb", 20, 84, 120, 30, W.krem, ["pindahkan,", "lalu hitung"], 9)),
      tambah("kancing", emo("kd", 62, 140, "\u{1F4A1}", 30)),
    ),
  ],
};

/* ------------------------------ 4. Cardinality: konsep ------------------------------ */
const SUARA_K1 = "Metode kedua, Cardinality, atau Kardinalitas. Angka terakhir yang disebut adalah banyak seluruhnya.";
const SUARA_K2 = "Kalau ditanya berapa banyak, jangan menghitung lagi dari awal. Cukup jawab dengan angka terakhir.";
const SUARA_K3 = "Ada satu syarat. Kita harus menghitung dengan benar, satu benda satu angka.";
const SUARA_K4 = "Angka terakhir berarti banyaknya. Ada lima balon, jadi banyaknya lima.";
const P5 = tata(5, 90);

export const ADEGAN_LUAR_KARDINAL: AdeganStory = {
  id: "luar-kardinal",
  judul: "Cardinality: angka terakhir adalah banyaknya",
  sumber: "Metode luar: Cardinality",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_K1,
      tambah("kedua,", ...kepala(1)),
      tambah("Kardinalitas.", ...deret("balon", "ka", P5, 14)),
      tambah("Angka", ...[0, 1, 2, 3, 4].map((i) => teks(`kan${i}`, P5[i].x, P5[i].y - 22, String(i + 1), 11, W.merah))),
      sorotkan("terakhir", "ka4", "kan4"),
    ),
    k(
      SUARA_K2,
      tambah("berapa", ...kartu("kq", 20, 140, 130, 30, W.krem, ["Berapa banyak?"], 11)),
      tambah("Cukup", ...kartu("kj", 170, 140, 110, 30, W.emas, ["angka terakhir"], 10), garis("kjg", 168, 155, -18, 0, W.biru, 1.6)),
    ),
    k(
      SUARA_K3,
      hapus(0, "kq-k", "kq-t0", "kj-k", "kj-t0", "kjg"),
      tambah("syarat.", ...kartu("ks", 30, 140, 240, 36, W.hijauMuda, ["hitung benar: satu benda, satu angka"], 8.8)),
    ),
    k(
      SUARA_K4,
      tambah("lima", ...kartu("kb", 80, 184, 140, 16, W.emas, ["Ada 5 balon"], 9)),
      ubah("jadi", { id: "ks-k", warna: W.krem }),
    ),
  ],
};

/* ------------------------------ 5. Cardinality: terapan ------------------------------ */
const SUARA_R1 = "Sekarang ada delapan pensil. Hitung dari kiri ke kanan: satu, dua, tiga, empat, lima, enam, tujuh, delapan.";
const SUARA_R2 = "Angka terakhir adalah delapan. Jadi ada delapan pensil.";
const SUARA_R3 = "Kita hitung dari kanan ke kiri: satu, dua, tiga, empat, lima, enam, tujuh, delapan. Hasilnya tetap delapan.";
const SUARA_R4 = "Urutan menghitung tidak mengubah banyaknya. Itulah inti Kardinalitas.";
const P8 = tata(8).map((t) => ({ x: t.x, y: t.y + 12 }));
const kataKe8 = ["satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan"];
const posR3 = urutKata(SUARA_R3, kataKe8, "kiri:");

export const ADEGAN_LUAR_KARDINAL_TERAPAN: AdeganStory = {
  id: "luar-kardinal-terapan",
  judul: "Cardinality: menghitung delapan pensil",
  sumber: "Metode luar: Cardinality, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_R1, tambah(0, ...kepala(1)), tambah("pensil.", ...deret("pensil", "pm", P8, 11)), ...hitungAksi(SUARA_R1, "pm", P8, "kanan:")),
    k(SUARA_R2, sorotkan("terakhir", "pm7", "pmn7"), tambah("Jadi", ...kartu("rj", 90, 176, 120, 22, W.emas, ["Ada 8 pensil"], 10))),
    k(
      SUARA_R3,
      hapus(0, "rj-k", "rj-t0"),
      sorotkan(0, "pm0", "pmn0"),
      ...posR3.map((p, i) => ubah(p, { id: `pmn${7 - i}`, isi: String(i + 1), warna: W.hijau }, { id: "tg", x: P8[7 - i].x, y: P8[7 - i].y + 33 })),
      tambah("tetap", ...kartu("rj2", 90, 176, 120, 22, W.hijauMuda, ["tetap 8 pensil"], 10)),
    ),
    k(SUARA_R4, hapus(0, "tg"), tambah("inti", emo("ro", 262, 190, "\u{1F989}", 26)), tambah("Itulah", teks("rt", 52, 192, "urutan tidak penting", 8.6, W.ungu))),
  ],
};
