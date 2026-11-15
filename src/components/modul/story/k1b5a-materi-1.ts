import type { AdeganStory } from "./logika-story";
import { ANAK_EMO, OWL, W, benda, bingkai, deret, emo, judul, kartu, pusatSel, sebar, teks, type Titik } from "./k1b5a-gambar";
import { bersih, hapus, hitungAksi, k, redamkan, sorotkan, tambah, ubah, urutBilangan } from "./k1b5a-bantu";

/* ------------------------------ 1. Merapikan mainan ------------------------------ */
const SUARA_R1 = "Sore ini Halim dan Malosi selesai bermain kelereng. Igil, si burung hantu, melihat mereka dari dahan pohon.";
const SUARA_R2 = "Halim ingat pesan Ibu. Selesai bermain, rapikan mainanmu. Jadi mereka mulai merapikan kelerengnya.";
const SUARA_R3 = "Berapa banyak kelereng Halim? Ayo kita bantu Halim menghitungnya. Pelan-pelan saja, supaya tidak keliru.";
const SUARA_R4 = "Hari ini kita belajar menghitung benda sampai dua puluh. Kita mulai dari kelereng Halim ini.";
const SUARA_R5 = "Bagus sekali. Nanti kita hitung kelereng ini dengan cara yang rapi. Igil akan menunjukkan caranya.";
const P15 = sebar(15, 128, 182);

export const ADEGAN_RAPI: AdeganStory = {
  id: "merapikan-mainan",
  judul: "Halim dan Malosi merapikan mainan",
  sumber: "Materi: cerita merapikan mainan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Merapikan mainan")),
      tambah("Halim", emo("a-Halim", 60, 66, ANAK_EMO, 30), teks("n-Halim", 60, 86, "Halim", 8.6)),
      tambah("Malosi", emo("a-Malosi", 130, 66, ANAK_EMO, 30), teks("n-Malosi", 130, 86, "Malosi", 8.6)),
      tambah("Igil,", emo("a-Igil", 250, 66, OWL, 30), teks("n-Igil", 250, 86, "Igil", 8.6, W.ungu)),
      tambah("kelereng.", ...deret("kelereng", "r", P15, 7)),
    ),
    k(
      SUARA_R2,
      tambah("Halim", ...kartu("pi", 40, 94, 220, 22, W.krem, ["pesan Ibu: rapikan mainanmu"], 8.8)),
      sorotkan("merapikan", ...[0, 1, 2, 3, 4].map((i) => `r${i}`)),
    ),
    k(
      SUARA_R3,
      hapus(0, "pi-k", "pi-t0"),
      tambah("Berapa", emo("tn", 150, 112, "❓", 26)),
      sorotkan("menghitungnya.", ...[5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((i) => `r${i}`)),
    ),
    k(
      SUARA_R4,
      hapus(0, "tn"),
      tambah("belajar", ...kartu("bl", 40, 94, 220, 22, W.langit, ["hitung benda sampai 20"], 8.8)),
      sorotkan("kelereng", "r7", "r8"),
    ),
    k(
      SUARA_R5,
      hapus(0, "bl-k", "bl-t0"),
      ubah("rapi.", { id: "a-Igil", y: 62 }),
      tambah("rapi.", emo("ok", 150, 112, "✅", 26)),
    ),
  ],
};

/* ------------------------------ 2. Hitung satu per satu ------------------------------ */
const SUARA_H1 = "Cara menghitung benda: ketuk satu kelereng, lalu sebut satu bilangan. Satu kelereng, satu bilangan. Jangan terburu-buru, ya.";
const SUARA_H2 = "Ayo hitung bersama. Satu, dua, tiga, empat, lima, enam, tujuh, delapan, sembilan, sepuluh.";
const SUARA_H3 = "Perhatikan, setiap kelereng kita ketuk sekali saja. Tidak ada yang terlewat dan tidak ada yang dihitung dua kali.";
const SUARA_H4 = "Ada dua kelereng baru di sini. Kita lanjut menghitung melewati sepuluh. Sebelas, dua belas.";
const SUARA_H5 = "Bilangan terakhir yang kita sebut adalah dua belas. Jadi kelereng ini ada dua belas.";
const SUARA_H6 = "Bagaimana kalau kelerengnya berantakan? Kita rapikan dulu supaya mudah dihitung, jadi tidak ada yang terlewat.";
const SUARA_H7 = "Kelereng yang sudah dihitung kita geser ke bawah. Jadi tidak ada yang terhitung dua kali. Itu cara yang rapi.";
export const P12: Titik[] = Array.from({ length: 12 }, (_, i) => (i < 6 ? { x: 40 + i * 44, y: 66 } : { x: 40 + (i - 6) * 44, y: 128 }));
const ACAK12: Titik[] = [{ x: 60, y: 60 }, { x: 214, y: 84 }, { x: 128, y: 120 }, { x: 250, y: 150 }, { x: 38, y: 150 }, { x: 170, y: 52 }, { x: 90, y: 100 }, { x: 260, y: 64 }, { x: 150, y: 168 }, { x: 40, y: 104 }, { x: 200, y: 130 }, { x: 100, y: 62 }];
const IDH = Array.from({ length: 12 }, (_, i) => `h${i}`);
const LABEL_H = IDH.map((_, i) => `hn${i}`);

export const ADEGAN_HITUNG: AdeganStory = {
  id: "hitung-satu",
  judul: "Menghitung satu per satu",
  sumber: "Materi: hitung satu per satu",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Hitung satu per satu")),
      tambah("ketuk", ...deret("kelereng", "h", P12.slice(0, 10), 8)),
      tambah("Satu", ...kartu("kt", 50, 160, 200, 28, W.krem, ["satu benda, satu bilangan"], 9.4)),
    ),
    k(SUARA_H2, ...hitungAksi(SUARA_H2, "h", P12.slice(0, 10), { setelah: "bersama." })),
    k(
      SUARA_H3,
      sorotkan("setiap", ...IDH.slice(0, 10)),
      tambah("terlewat", teks("tl", 150, 196, "tidak ada yang terlewat", 8.8, W.hijau)),
    ),
    k(
      SUARA_H4,
      hapus(0, "tl", "kt-k", "kt-t0"),
      redamkan(0, ...IDH.slice(0, 10)),
      tambah("baru", ...[10, 11].flatMap((i) => benda("kelereng", `h${i}`, P12[i].x, P12[i].y, 8, i))),
      ...hitungAksi(SUARA_H4, "h", P12, { setelah: "sepuluh.", dari: 11, awal: 10, tanganAda: true }),
    ),
    k(
      SUARA_H5,
      ubah("terakhir", { id: "hn10", op: 0.35 }),
      sorotkan("terakhir", "h11", "hn11"),
      tambah("Jadi", ...kartu("kk", 50, 160, 200, 28, W.emas, ["12 kelereng"], 12)),
    ),
    k(
      SUARA_H6,
      hapus(0, "tg", "kk-k", "kk-t0", ...LABEL_H),
      ubah("berantakan?", ...IDH.map((id, i) => ({ id, x: ACAK12[i].x, y: ACAK12[i].y, sorot: false }))),
      ubah("rapikan", ...IDH.map((id, i) => ({ id, x: P12[i].x, y: P12[i].y }))),
    ),
    k(
      SUARA_H7,
      ubah("geser", ...IDH.slice(0, 6).map((id, i) => ({ id, x: 40 + i * 44, y: 182 }))),
      tambah("hitung", teks("sd", 150, 164, "sudah dihitung", 9, W.hijau)),
      tambah("Itu", emo("ow", 262, 120, OWL, 30)),
    ),
  ],
};

/* ------------------------------ 3. Sepuluh dulu, lalu sisanya ------------------------------ */
const SUARA_S1 = "Igil punya cara yang lebih rapi. Isi dulu kotak sepuluh dengan kelereng sampai penuh. Kotak ini punya sepuluh petak.";
const SUARA_S2 = "Seret satu kelereng ke tiap petak. Satu, dua, tiga, empat, lima. Baris atas sudah penuh.";
const SUARA_S3 = "Lanjut ke baris bawah. Enam, tujuh, delapan, sembilan, sepuluh. Kotak sepuluh sudah penuh.";
const SUARA_S4 = "Kotak yang penuh berisi sepuluh. Kita tidak perlu menghitungnya lagi. Cukup bilang sepuluh.";
const SUARA_S5 = "Ada satu kelereng di luar kotak. Sepuluh ditambah satu menjadi sebelas. Jadi kelereng ini ada sebelas.";
const SUARA_S6 = "Sebelas artinya sepuluh dan satu lagi. Lambangnya ditulis satu dan satu, jadi sebelas.";
const SUARA_S7 = "Dengan cara ini, kita menghitung dengan rapi dan cepat. Sepuluh dulu, lalu sisanya.";
const KX = 85;
const KY = 34;
const S11 = sebar(11, 128, 184);
const IDS = Array.from({ length: 11 }, (_, i) => `s${i}`);
const posS2 = urutBilangan(SUARA_S2, 1, 5, "tiap");
const posS3 = urutBilangan(SUARA_S3, 6, 10, "bawah.");

export const ADEGAN_SEPULUH: AdeganStory = {
  id: "sepuluh-dulu",
  judul: "Sepuluh dulu, lalu sisanya",
  sumber: "Materi: sepuluh dulu, lalu sisanya",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Isi kotak sepuluh")),
      tambah("kotak", ...bingkai("kb", KX, KY)),
      tambah("kelereng", ...deret("kelereng", "s", S11, 7)),
      tambah("petak.", ...kartu("kp", 60, 92, 180, 22, W.krem, ["kotak sepuluh: 10 petak"], 8.8)),
    ),
    k(
      SUARA_S2,
      hapus(0, "kp-k", "kp-t0"),
      ...posS2.map((p, i) => ubah(p, { id: `s${i}`, x: pusatSel(i, KX, KY).x, y: pusatSel(i, KX, KY).y })),
      tambah("Baris", teks("b1", 150, 100, "baris atas penuh", 9, W.hijau)),
    ),
    k(
      SUARA_S3,
      hapus(0, "b1"),
      ...posS3.map((p, i) => ubah(p, { id: `s${i + 5}`, x: pusatSel(i + 5, KX, KY).x, y: pusatSel(i + 5, KX, KY).y })),
      tambah("penuh.", teks("b2", 150, 100, "kotak sepuluh penuh", 9, W.hijau)),
    ),
    k(
      SUARA_S4,
      hapus(0, "b2"),
      ubah(0, ...Array.from({ length: 10 }, (_, i) => ({ id: `kb-c${i}`, warna: "#FEF08A" }))),
      tambah("berisi", ...kartu("kq", 60, 92, 180, 24, W.emas, ["kotak penuh = 10"], 10)),
      sorotkan("sepuluh.@2", ...IDS.slice(0, 10)),
    ),
    k(
      SUARA_S5,
      hapus(0, "kq-k", "kq-t0"),
      sorotkan("luar", "s10"),
      tambah("Sepuluh", ...kartu("kj", 40, 92, 220, 24, W.langit, ["10 + 1 = 11"], 11)),
      tambah("sebelas.", emo("sj", 262, 124, "\u{1F449}", 20)),
    ),
    k(
      SUARA_S6,
      hapus(0, "kj-k", "kj-t0", "sj"),
      tambah("sebelas.", teks("s11", 150, 106, "11", 22, W.merah)),
      tambah("artinya", teks("sa", 150, 126, "10 dan 1 lagi", 9.4, W.ungu)),
    ),
    k(
      SUARA_S7,
      bersih(0),
      tambah(0, judul("Sepuluh dulu!"), emo("ig", 150, 110, OWL, 46)),
      tambah("rapi", ...kartu("kz", 40, 140, 220, 32, W.hijauMuda, ["sepuluh dulu, lalu sisanya"], 10)),
    ),
  ],
};
