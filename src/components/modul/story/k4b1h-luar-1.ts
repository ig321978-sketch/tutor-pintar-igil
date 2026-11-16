import type { AdeganStory } from "./logika-story";
import { ANAK, W, benda, bulat, emo, judul, kaleng, kartu, kotak, teks, wadah } from "./k4b1h-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k4b1h-bantu";

export const NAMA_METODE = ["Fair Share", "Measurement Division", "Inverse of Multiply", "Repeated Subtraction"];
export const NAMA_METODE_ID = ["Bagi Rata", "Bagi Ukur", "Kebalikan Kali", "Pengurangan Berulang"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.krem, W.pink];
const IKON_METODE = ["🍬", "📏", "🔁", "➖"];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number) => kartu("hd", 6, 26, 288, 24, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Bagaimana membagi empat puluh delapan permen kepada empat anak? Guru di berbagai negara punya cara berbeda. Di video ini kita lihat empat metode dari luar, memakai soal pembagian yang sama.";
const SUARA_O2 = "Empat metode itu: Fair Share, Measurement Division, Inverse of Multiply, dan Repeated Subtraction.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Bagi Rata, Bagi Ukur, Kebalikan Kali, dan Pengurangan Berulang. Metode keempat cocok sekali dengan soal pembagian bilangan cacah.";
const SUARA_O4 = "Semuanya menjawab pertanyaan yang sama dengan cara berbeda: berapa tiap anak, atau berapa kotak, ketika benda dibagi sama banyak.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk pembagian sampai 100",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Empat metode dari luar")),
      tambah("empat", ...kaleng("kl", 18, 66, 46, 54), teks("klt", 41, 100, "48", 15, W.putih)),
      tambah("anak?", ...ANAK.map((_, i) => emo(`ka${i}`, 112 + i * 40, 98, "🧒", 24)), teks("kq", 262, 104, "?", 40, W.merah)),
      tambah("berbagai", emo("gl", 40, 168, "🌍", 30)),
      tambah("empat@2", ...kartu("pk4", 76, 144, 200, 34, W.emas, ["4 metode dari luar"], 9.6)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Empat metode")),
      ...NAMA_METODE.map((m, i) => tambah(idx(SUARA_O2, ["Fair", "Measurement", "Inverse", "Repeated"][i]), ...kartu(`m${i}`, 12, 34 + i * 38, 276, 30, WARNA_METODE[i], [`${i + 1}. ${m}`], 9.6))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      ...NAMA_METODE_ID.map((m, i) => tambah(idx(SUARA_O3, ["Rata", "Ukur", "Kebalikan", "Pengurangan"][i]), ...kartu(`n${i}`, 12, 34 + i * 38, 276, 30, WARNA_METODE[i], [`${i + 1}. ${m}`], 9.6))),
      tambah("keempat", emo("n4", 268, 148, "⭐", 20)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Satu pertanyaan, empat cara")),
      tambah("Semuanya", ...IKON_METODE.map((e, i) => emo(`i${i}`, 45 + i * 70, 82, e, 30))),
      tambah("berapa", teks("i0t", 45, 108, "tiap anak", 8.2, W.biru), teks("i1t", 115, 108, "banyak kotak", 8.2, W.biru)),
      tambah("benda", teks("i2t", 185, 108, "cek dengan kali", 8.2, W.biru), teks("i3t", 255, 108, "hitung kurang", 8.2, W.biru)),
      tambah("sama@2", ...kartu("iq", 30, 130, 240, 34, W.emas, ["benda dibagi sama banyak"], 9.6)),
    ),
  ],
};

/* ------------------------------ 2. Fair Share: konsep ------------------------------ */
const SUARA_P1 = "Metode pertama, Fair Share, atau Bagi Rata. Yang diketahui banyak benda dan banyak kelompok, yang dicari isi tiap kelompok.";
const SUARA_P2 = "Bagikan satu per satu secara bergantian ke tiap wadah, seperti membagi kartu. Contoh: sepuluh kelereng untuk lima orang.";
const SUARA_P3 = "Putaran kedua: tiap wadah kembali mendapat satu. Sepuluh kelereng habis, dan setiap wadah berisi dua.";
const SUARA_P4 = "Aturannya: semua benda harus terbagi, dan tiap wadah harus sama banyak. Kalau ada sisa, benda itu tidak habis dibagi rata.";

const WD5 = [0, 1, 2, 3, 4];
const wadahLima = () => WD5.flatMap((i) => wadah(`b${i}`, 8 + i * 58, 96, 52, 46, `orang ${i + 1}`, 8));
const isiLima = (dari: number, sampai: number) => WD5.flatMap((i) => benda(`d${i}`, 22 + 8 + i * 58 - 8, 108, 2, 2, 24, 7, W.biruMuda).slice(dari, sampai));

export const ADEGAN_LUAR_BAGI_RATA: AdeganStory = {
  id: "luar-bagi-rata",
  judul: "Fair Share: isi tiap kelompok dari bagian bergantian",
  sumber: "Metode luar: Fair Share",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Fair Share")),
      tambah("Metode", kepala(0)),
      tambah("benda", ...benda("kp", 105, 66, 10, 10, 10, 4, W.biruMuda), teks("kpt", 150, 86, "10 kelereng", 8.6, W.coklat)),
      tambah("kelompok,", ...wadahLima()),
      tambah("dicari", ...kartu("kq", 40, 164, 220, 28, W.emas, ["dicari: isi tiap wadah"], 9.6)),
    ),
    k(
      SUARA_P2,
      hapus(0, "kq-k", "kq-t0"),
      tambah("satu", ...isiLima(0, 1)),
      sorotkan("kartu,", "kpt"),
      tambah("sepuluh", ...kartu("kq", 40, 164, 220, 28, W.krem, ["putaran 1: tiap wadah mendapat 1"], 9)),
    ),
    k(
      SUARA_P3,
      hapus(0, "kq-k", "kq-t0"),
      tambah("kembali", ...isiLima(1, 2)),
      tambah("habis,", ...kartu("kq", 40, 164, 220, 28, W.emas, ["10 : 5 = 2"], 11)),
    ),
    k(
      SUARA_P4,
      bersih(0),
      tambah(0, judul("Dua aturan Fair Share")),
      tambah("semua", ...kartu("at1", 12, 36, 276, 40, W.hijauMuda, ["1. semua benda harus terbagi"], 9.6)),
      tambah("tiap", ...kartu("at2", 12, 88, 276, 40, W.langit, ["2. tiap wadah sama banyak"], 9.6)),
      tambah("sisa,", ...kartu("at3", 12, 140, 276, 44, W.merahMuda, ["ada sisa: tidak habis dibagi rata"], 9.2)),
    ),
  ],
};

/* ------------------------------ 3. Fair Share: penerapan (permen Pak Wicak, soal a dan e) ------------------------------ */
const SUARA_Q1 = "Terapkan pada permen Pak Wicak: empat puluh delapan permen untuk empat anak. Bagikan bergiliran, setiap putaran memberi satu permen kepada tiap anak.";
const SUARA_Q2 = "Setelah dua belas putaran permen habis. Setiap anak mendapat dua belas permen, jadi empat puluh delapan dibagi empat sama dengan dua belas.";
const SUARA_Q3 = "Soal pertama: tiga puluh enam permen untuk dua anak. Bagi bergiliran sampai habis, tiap anak mendapat delapan belas. Tini menerima delapan belas.";
const SUARA_Q4 = "Soal berikutnya: lima puluh lima gantungan kunci untuk lima orang. Setiap orang mendapat sebelas, jadi Asep mendapat sebelas.";

const WD4 = [0, 1, 2, 3];
const NAMA5 = ["Azizah", "Karel", "Slamet", "Asep", "Helen"];

export const ADEGAN_LUAR_BAGI_RATA_TERAPAN: AdeganStory = {
  id: "luar-bagi-rata-terapan",
  judul: "Fair Share pada soal: 48 permen, Tini, dan Asep",
  sumber: "Metode luar: Fair Share, 48 permen",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Fair Share: 48 permen")),
      tambah("Terapkan", kepala(0)),
      tambah("empat@2", ...WD4.flatMap((i) => wadah(`a${i}`, 8 + i * 73, 60, 66, 74, ANAK[i], 8))),
      tambah("satu", ...WD4.flatMap((i) => benda(`a${i}`, 19 + i * 73, 74, 1, 4, 14, 4.4, W.oranye))),
      tambah("anak.", teks("qe", 150, 178, "48 permen, 4 anak, bergiliran", 9, W.coklat)),
    ),
    k(
      SUARA_Q2,
      tambah("habis.", ...WD4.flatMap((i) => benda(`a${i}`, 19 + i * 73, 74, 12, 4, 14, 4.4, W.oranye).slice(1))),
      ubah("Setiap", { id: "qe", isi: "tiap anak: 12 permen" }),
      tambah("dibagi", ...kartu("qk", 60, 160, 180, 30, W.emas, ["48 : 4 = 12"], 11)),
      hapus("dibagi", "qe"),
    ),
    k(
      SUARA_Q3,
      bersih(0),
      tambah(0, judul("Soal a: 36 permen")),
      tambah("Soal", ...kaleng("ka", 16, 62, 44, 52), teks("kat", 38, 94, "36", 15, W.putih)),
      tambah("dua", ...kartu("ta", 84, 46, 96, 60, W.hijauMuda, ["Tono", "?"], 11)),
      tambah("dua", ...kartu("ti", 190, 46, 96, 60, W.pink, ["Tini", "?"], 11)),
      ubah("delapan", { id: "ta-t1", isi: "18" }, { id: "ti-t1", isi: "18" }),
      tambah("Bagi", ...kartu("qa", 60, 140, 180, 34, W.emas, ["36 : 2 = 18"], 11)),
      sorotkan("Tini", "ti-k"),
    ),
    k(
      SUARA_Q4,
      bersih(0),
      tambah(0, judul("Soal e: 55 gantungan")),
      tambah("gantungan", ...NAMA5.flatMap((n, i) => kartu(`ge${i}`, 6 + i * 58, 50, 54, 56, [W.hijauMuda, W.langit, W.krem, W.pink, W.lavender][i], [n, "?"], 8.4))),
      tambah("Setiap", teks("qf", 150, 140, "55 : 5 = ?", 20, W.biru)),
      ubah("sebelas", { id: "qf", isi: "55 : 5 = 11" }, ...NAMA5.map((_, i) => ({ id: `ge${i}-t1`, isi: "11" }))),
      sorotkan("Asep", "ge3-k"),
    ),
  ],
};

/* ------------------------------ 4. Measurement Division: konsep ------------------------------ */
const SUARA_R1 = "Metode kedua, Measurement Division, atau Bagi Ukur. Kebalikan dari Bagi Rata: yang diketahui isi tiap kelompok, yang dicari banyak kelompok.";
const SUARA_R2 = "Ukur seperti mengambil takaran. Ambil lima kelereng sebagai satu kantong, lalu ambil lima lagi.";
const SUARA_R3 = "Sepuluh kelereng, tiap kantong lima, jadi dua kantong. Kalau tiap kantong tiga, ada tiga kantong dan sisa satu, belum habis.";
const SUARA_R4 = "Hasilnya sama dengan membagi: sepuluh dibagi lima sama dengan dua. Bedanya, dua di sini berarti dua kantong, bukan isi tiap kantong.";

const baris10 = (id: string, y: number) => Array.from({ length: 10 }, (_, i) => bulat(`${id}-o${i}`, 24 + i * 26, y, 8, W.biruMuda, W.coklat, { tebal: 1 }));
/** Sembilan kelereng dalam tiga kantong tiga-tiga (jarak antarkantong 84) ditambah satu kelereng sisa di ujung kanan. */
const barisTiga = (id: string, y: number) => Array.from({ length: 10 }, (_, i) => bulat(`${id}-o${i}`, i < 9 ? 24 + Math.floor(i / 3) * 84 + (i % 3) * 26 : 276, y, 8, i < 9 ? W.biruMuda : W.merah, W.coklat, { tebal: 1 }));
const kantong = (id: string, x: number, y: number, w: number) => kotak(id, x, y, w, 32, W.langit, W.hijau, { rx: 8, z: -1 });

export const ADEGAN_LUAR_BAGI_UKUR: AdeganStory = {
  id: "luar-bagi-ukur",
  judul: "Measurement Division: berapa kelompok yang terbentuk",
  sumber: "Metode luar: Measurement Division",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Measurement Division")),
      tambah("Metode", kepala(1)),
      tambah("kelompok,", ...baris10("kl", 100), teks("klt", 150, 140, "10 kelereng", 9, W.coklat)),
      tambah("banyak", ...kartu("kq", 20, 154, 260, 36, W.emas, ["diketahui: isi tiap kantong 5", "dicari: banyak kantong"], 9)),
    ),
    k(
      SUARA_R2,
      hapus(0, "kq-k", "kq-t0", "kq-t1"),
      tambah("Ambil", kantong("kg1", 12, 84, 124)),
      tambah("lagi.", kantong("kg2", 144, 84, 124)),
      tambah("satu", teks("kn1", 74, 134, "kantong 1", 8.6, W.hijau)),
      tambah("lagi.", teks("kn2", 206, 134, "kantong 2", 8.6, W.hijau)),
    ),
    k(
      SUARA_R3,
      bersih(0),
      tambah(0, judul("Tiap kantong 5, lalu tiap kantong 3")),
      tambah(0, kepala(1)),
      tambah("Sepuluh", ...baris10("ku", 76), kantong("ku1", 12, 60, 124), kantong("ku2", 144, 60, 124), teks("kut", 150, 112, "tiap kantong 5: 2 kantong", 8.6, W.hijau)),
      tambah("tiga@2", ...barisTiga("kv", 150), ...[0, 1, 2].map((g) => kantong(`kv${g + 1}`, 12 + g * 84, 134, 76)), teks("kvt", 150, 192, "tiap kantong 3: 3 kantong, sisa 1", 8.6, W.merah)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Ukur: dua kantong")),
      tambah(0, kepala(1)),
      tambah("Hasilnya", ...kartu("hu", 40, 62, 220, 40, W.emas, ["10 : 5 = 2"], 14)),
      tambah("Bedanya,", ...kartu("hv", 12, 116, 134, 50, W.hijauMuda, ["Bagi Rata:", "2 = isi tiap wadah"], 8.8)),
      tambah("kantong,", ...kartu("hw", 154, 116, 134, 50, W.langit, ["Bagi Ukur:", "2 = banyak kantong"], 8.8)),
    ),
  ],
};

/* ------------------------------ 5. Measurement Division: penerapan (soal c dan d) ------------------------------ */
const SUARA_S1 = "Soal c: delapan puluh satu kue, tiap kotak berisi tiga kue. Yang dicari bukan isi kotak, melainkan banyak kotak.";
const SUARA_S2 = "Ukur tiga kue demi tiga kue. Setiap petak di batang ini satu kotak berisi tiga kue, sampai delapan puluh satu habis.";
const SUARA_S3 = "Petak dihitung, ada dua puluh tujuh. Jadi dua puluh tujuh kotak, dan ini cocok dengan hitungan perkalian.";
const SUARA_S4 = "Soal d: sembilan puluh enam telur, tiap kotak delapan telur. Batangnya punya dua belas petak, jadi dua belas kotak, dan itu benar.";

export const ADEGAN_LUAR_BAGI_UKUR_TERAPAN: AdeganStory = {
  id: "luar-bagi-ukur-terapan",
  judul: "Measurement Division pada soal buku c dan d",
  sumber: "Metode luar: Measurement Division",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Bagi Ukur: soal c")),
      tambah("Soal", kepala(1)),
      tambah("delapan", teks("sa", 150, 80, "81 kue", 16, W.coklat)),
      tambah("tiga", ...kartu("sb", 30, 96, 240, 32, W.hijauMuda, ["tiap kotak berisi 3 kue"], 9.6)),
      tambah("banyak", ...kartu("sc", 30, 142, 240, 34, W.emas, ["dicari: banyak kotak"], 9.6)),
    ),
    k(
      SUARA_S2,
      bersih(0),
      tambah(0, judul("Satu petak = satu kotak = 3 kue")),
      tambah(0, kepala(1)),
      tambah("Ukur", ...Array.from({ length: 27 }, (_, i) => kotak(`sp-c${i}`, 15 + i * 10, 84, 10, 30, i % 2 === 0 ? W.langit : W.hijauMuda, W.biru, { rx: 0, tebal: 1 }))),
      tambah("sampai", teks("sp3", 150, 134, "27 petak, tiap petak 3 kue", 9, W.biru), teks("sp8", 150, 158, "27 × 3 = 81 kue", 11, W.coklat)),
    ),
    k(
      SUARA_S3,
      sorotkan(0, "sp-c0", "sp-c26"),
      tambah("tujuh.", ...kartu("sq", 60, 164, 180, 30, W.emas, ["27 kotak"], 12)),
    ),
    k(
      SUARA_S4,
      bersih(0),
      tambah(0, judul("Bagi Ukur: soal d")),
      tambah(0, kepala(1)),
      tambah("Soal", teks("ta", 150, 76, "96 telur, tiap kotak 8", 11, W.coklat)),
      tambah("Batangnya", ...Array.from({ length: 12 }, (_, i) => kotak(`tp-c${i}`, 15 + i * 22.5, 92, 22.5, 30, i % 2 === 0 ? W.langit : W.hijauMuda, W.biru, { rx: 0, tebal: 1 })), ...Array.from({ length: 12 }, (_, i) => teks(`tp-t${i}`, 15 + i * 22.5 + 11.25, 112, "8", 9, W.biru))),
      tambah("dua@2", ...kartu("tq", 40, 140, 220, 46, W.emas, ["12 petak = 12 kotak", "12 × 8 = 96"], 10)),
    ),
  ],
};
