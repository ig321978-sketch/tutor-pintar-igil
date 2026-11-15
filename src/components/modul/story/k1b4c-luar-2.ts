import type { AdeganStory, Obj } from "./logika-story";
import { W, bulat, emo, garis, judul, kartu, kotak, lengkung, segiEmpat, segitigaSama, teks } from "./k1b4c-gambar";
import { bersih, hapus, hitungBagian, k, rangkai, redamkan, sorotkan, tambah, ubah, urutKata } from "./k1b4c-bantu";
import { NAMA_METODE, WARNA_METODE, kepala } from "./k1b4c-luar-1";

const ANAK = "\u{1F9D2}";
const IGIL = "\u{1F989}";

/* ------------------------------ 1. Pilah Ciri: terapan pada keping kereta ------------------------------ */
const SUARA_Q1 = "Sekarang kita pilah keping kereta Halim. Ada sembilan keping, dan semuanya masih bercampur.";
const SUARA_Q2 = "Keping yang punya sisi lengkung masuk ke kotak lengkung. Ada tiga keping: satu, dua, tiga.";
const SUARA_Q3 = "Keping yang semua sisinya lurus masuk ke kotak lurus. Kita pindahkan: satu, dua, tiga, empat, lima, enam.";
const SUARA_Q4 = "Enam keping lurus ditambah tiga keping lengkung sama dengan sembilan keping.";
const SUARA_Q5 = "Jumlahnya sama dengan keping kereta tadi. Memilah tidak mengubah banyak keping, hanya memisahkan jenisnya.";
/** Sembilan keping kereta di baris bawah: j = jenis (s segi empat, g segitiga, l lengkung). */
const JENIS = ["s", "l", "s", "s", "l", "g", "s", "l", "s"];
const keping = (i: number, x: number, y: number): Obj => {
  const j = JENIS[i];
  if (j === "l") return lengkung(`kp${i}`, x, y, 8);
  if (j === "g") return segitigaSama(`kp${i}`, x - 10, y - 10, 20, 18, W.segitiga);
  return segiEmpat(`kp${i}`, x - 9, y - 8, 18, 16, W.segiEmpat);
};
const AWAL = (i: number) => ({ x: 20 + 30 * i, y: 182 });
const LENGKUNG_ID = [1, 4, 7];
const LURUS_ID = [0, 2, 3, 5, 6, 8];
const letakAkhir = (i: number): { x: number; y: number } => {
  const l = LENGKUNG_ID.indexOf(i);
  if (l >= 0) return { x: 35 + 42 * l, y: 112 };
  const s = LURUS_ID.indexOf(i);
  const x = 157 + 38 * (s % 3);
  const y = 90 + 32 * Math.floor(s / 3);
  return { x, y };
};
const pindahKe = (i: number) => ({ id: `kp${i}`, ...letakAkhir(i) });

export const ADEGAN_LUAR_PILAH_TERAPAN: AdeganStory = {
  id: "luar-pilah-terapan",
  judul: "Pilah Ciri: keping kereta Halim",
  sumber: "Metode luar: Pilah Ciri, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, ...kepala(1)),
      tambah("kereta", kotak("bk", 10, 56, 135, 100, W.lengkung + "55", W.biru, { rx: 8 }), teks("tk", 77, 72, "ada sisi lengkung", 9, W.merah)),
      tambah("Halim", kotak("bl", 155, 56, 135, 100, "#BFDBFE88", W.biru, { rx: 8 }), teks("tl", 222, 72, "semua sisi lurus", 9, W.merah)),
      tambah("sembilan", ...JENIS.map((_, i) => keping(i, AWAL(i).x, AWAL(i).y))),
    ),
    k(SUARA_Q2, ...urutKata(SUARA_Q2, ["satu", "dua", "tiga"], "keping:").map((p, n) => ubah(p, { ...pindahKe(LENGKUNG_ID[n]) }))),
    k(SUARA_Q3, ...urutKata(SUARA_Q3, ["satu", "dua", "tiga", "empat", "lima", "enam"], "pindahkan:").map((p, n) => ubah(p, { ...pindahKe(LURUS_ID[n]) }))),
    k(SUARA_Q4, ...rangkai(SUARA_Q4, "qr", 188, ["6", "+", "3", "=", "9"], ["Enam", "ditambah", "tiga", "sama", "sembilan"], undefined, 18)),
    k(SUARA_Q5, tambah("Jumlahnya", emo("ok", 262, 172, "\u{2705}", 22)), tambah("Memilah", emo("ow", 38, 172, IGIL, 22))),
  ],
};

/* ------------------------------ 2. Bentuk di Sekitar: konsep ------------------------------ */
const SUARA_S1 = "Cara ketiga, Bentuk di Sekitar. Bentuk ada di benda yang kita lihat setiap hari.";
const SUARA_S2 = "Jam dinding berbentuk lengkung. Pintu berbentuk segi empat. Potongan pizza berbentuk segitiga.";
const SUARA_S3 = "Sekarang ketuk benda yang berbentuk lengkung. Ketuk jam dinding.";
const SUARA_S4 = "Sekarang ketuk benda yang berbentuk segitiga. Ketuk potongan pizza.";
const SUARA_S5 = "Hebat! Bentuk ada di sekitar kita, di rumah dan di taman. Teruslah mencari bentuk.";

export const ADEGAN_LUAR_SEKITAR: AdeganStory = {
  id: "luar-sekitar",
  judul: "Bentuk di Sekitar: cari di benda sehari-hari",
  sumber: "Metode luar: Bentuk di Sekitar",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_S1, tambah(0, ...kepala(2)), tambah("benda", emo("mt", 150, 104, "\u{1F50E}", 50)), tambah("setiap", ...kartu("sk", 50, 140, 200, 32, W.emas, ["cari bentuk di benda"], 11))),
    k(
      SUARA_S2,
      hapus(0, "mt", "sk-k", "sk-t0"),
      tambah("Jam", bulat("oj", 55, 96, 22, W.putih, W.biru, { tebal: 2 }), garis("oj1", 55, 96, 0, -14, W.biru, 2.4), garis("oj2", 55, 96, 10, 0, W.biru, 2.4), teks("nj", 55, 146, "jam dinding", 8.4)),
      tambah("lengkung.", teks("sj", 55, 160, "lengkung", 8.4, W.merah)),
      tambah("Pintu", kotak("op", 118, 66, 44, 64, "#FDE68A", W.coklat, { rx: 2, tebal: 2 }), teks("np", 140, 146, "pintu", 8.4)),
      tambah("empat.", teks("sp", 140, 160, "segi empat", 8.4, W.merah)),
      tambah("pizza", emo("oz", 240, 108, "\u{1F355}", 44), teks("nz", 240, 146, "pizza", 8.4)),
      tambah("segitiga.", teks("sz", 240, 160, "segitiga", 8.4, W.merah)),
    ),
    k(SUARA_S3, sorotkan("jam", "oj", "oj1", "oj2"), tambah("dinding.", emo("ck", 55, 62, "\u{2705}", 22))),
    k(SUARA_S4, redamkan(0, "oj", "oj1", "oj2"), sorotkan("pizza.", "oz"), tambah("pizza.", emo("cz", 240, 62, "\u{2705}", 22))),
    k(SUARA_S5, redamkan(0, "oz"), tambah("Hebat!", emo("ow", 150, 190, IGIL, 26))),
  ],
};

/* ------------------------------ 3. Bentuk di Sekitar: taman ------------------------------ */
const SUARA_T1 = "Di taman, Upe melihat tiga benda: tenda, matahari, dan papan nama. Bentuk apa saja yang ada?";
const SUARA_T2 = "Tenda berbentuk segitiga. Matahari berbentuk lengkung. Papan nama berbentuk segi empat.";
const SUARA_T3 = "Ketuk benda yang berbentuk segi empat. Satu, dua. Ada dua benda segi empat, yaitu papan nama dan pintu tenda.";
const SUARA_T4 = "Jadi ada satu segitiga, dua segi empat, dan satu bentuk lengkung. Satu ditambah dua ditambah satu sama dengan empat.";

export const ADEGAN_LUAR_SEKITAR_TERAPAN: AdeganStory = {
  id: "luar-sekitar-terapan",
  judul: "Bentuk di Sekitar: taman Upe",
  sumber: "Metode luar: Bentuk di Sekitar, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, ...kepala(2)),
      tambah("Upe", emo("a-Upe", 40, 172, ANAK, 24), teks("n-Upe", 40, 188, "Upe", 8.4)),
      tambah("tenda,", segitigaSama("tn0", 30, 64, 76, 44, W.segitiga), segiEmpat("tn1", 56, 88, 24, 20, W.krem), teks("nt", 68, 126, "tenda", 8.4)),
      tambah("matahari,", lengkung("mt0", 150, 88, 20), teks("nm", 150, 126, "matahari", 8.4)),
      tambah("papan", segiEmpat("pn0", 196, 72, 70, 36, W.segiEmpat), teks("pn1", 231, 95, "taman", 9), teks("nn", 231, 126, "papan nama", 8.4)),
    ),
    k(
      SUARA_T2,
      tambah("segitiga.", teks("s0", 68, 142, "segitiga", 8.4, W.merah)),
      tambah("lengkung.", teks("s1", 150, 142, "lengkung", 8.4, W.merah)),
      tambah("empat.", teks("s2", 231, 142, "segi empat", 8.4, W.merah)),
    ),
    k(SUARA_T3, ...hitungBagian(SUARA_T3, ["pn0", "tn1"], "segi empat", "tc", 150, 176, "empat.")),
    k(
      SUARA_T4,
      hapus(0, "tc"),
      redamkan(0, "tn1"),
      ...rangkai(SUARA_T4, "tr", 190, ["1", "+", "2", "+", "1", "=", "4"], ["Satu", "ditambah", "dua", "ditambah", "satu", "sama", "empat."], "lengkung.", 18, 24),
    ),
  ],
};

/* ------------------------------ 4. Ringkasan tiga metode ------------------------------ */
const SUARA_R1 = "Mari kita ringkas tiga cara dari luar tadi.";
const SUARA_R2 = "Kenali Bentuk: lihat wujudnya. Pilah Ciri: pisahkan menurut sisi lengkung dan lurus.";
const SUARA_R3 = "Bentuk di Sekitar: cari bentuk pada benda sehari-hari. Ketiganya membantu kita menyusun dan mengurai bangun.";
const SUARA_R4 = "Terima kasih sudah belajar. Teruslah berlatih di layar, ya. Sampai jumpa!";
const DESKRIPSI = ["lihat wujud, lalu sebut nama", "pilah sisi lengkung dan sisi lurus", "cari bentuk pada benda sehari-hari"];
const kartuMetode = (i: number): Obj[] => [kotak(`rm${i}-k`, 14, 34 + i * 54, 272, 46, WARNA_METODE[i], W.biru, { rx: 8, tebal: 1.5 }), teks(`rm${i}-n`, 150, 34 + i * 54 + 19, NAMA_METODE[i], 10, W.biru)];
const deskripsi = (i: number): Obj => teks(`rm${i}-d`, 150, 34 + i * 54 + 36, DESKRIPSI[i], 8.8, W.merah);

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Ringkasan metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Ringkasan")), tambah("ringkas", ...kartuMetode(0)), tambah("tiga", ...kartuMetode(1)), tambah("luar", ...kartuMetode(2))),
    k(SUARA_R2, sorotkan("Kenali", "rm0-k"), tambah("lihat", deskripsi(0)), redamkan("Pilah", "rm0-k"), sorotkan("Pilah", "rm1-k"), tambah("pisahkan", deskripsi(1))),
    k(SUARA_R3, redamkan(0, "rm1-k"), sorotkan("Bentuk", "rm2-k"), tambah("cari", deskripsi(2)), ubah("Ketiganya", { id: "jud", isi: "Menyusun dan mengurai bangun" })),
    k(SUARA_R4, bersih(0), tambah(0, judul("Terima kasih"), emo("ow", 150, 100, IGIL, 54)), tambah("layar,", ...kartu("rz", 40, 124, 220, 34, W.emas, ["susun dan urai bentuk"], 11)), tambah("Sampai", teks("rt", 150, 184, "Sampai jumpa!", 12, W.ungu))),
  ],
};
