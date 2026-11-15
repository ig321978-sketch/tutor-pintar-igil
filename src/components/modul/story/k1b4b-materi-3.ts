import type { AdeganStory } from "./logika-story";
import { W, WB, bentuk, cocok, emo, judul, kartu, kotak, nampan, pindah, teks, tidakCocok } from "./k1b4b-gambar";
import { bersih, hapus, hitungAksi, idx, k, redamkan, sorotkan, tambah, ubah } from "./k1b4b-bantu";

/* ------------------------------ 1. Latihan 1: ketuk bentuk yang cocok ------------------------------ */
const SUARA_T1 = "Latihan satu. Halim melihat enam bentuk di layar. Aturannya bentuk lengkung. Ketuk semua yang cocok.";
const SUARA_T2 = "Ketuk satu per satu. Bentuk kedua cocok. Bentuk keempat cocok. Bentuk keenam cocok.";
const SUARA_T3 = "Bentuk yang lain tidak cocok, karena punya sisi lurus. Jadi tidak masuk kelompok lengkung.";
const SUARA_T4 = "Hitung yang cocok. Satu, dua, tiga. Anggotanya ada tiga.";
const SUARA_T5 = "Ketuk jawaban yang benar. Pilihannya dua, tiga, atau empat. Tiga yang benar. Hebat sekali!";
const SUARA_T6 = "Ucapkan lagi mengikuti suara guru. Tiga bentuk lengkung masuk kelompok ini.";
const TX = (i: number): number => 30 + i * 48;
/** Slot genap: bentuk lurus (`tx`), slot ganjil: bentuk lengkung (`tb`). */
const SLOT_T = [
  { id: "tx0", b: "segitiga" as const, w: WB.coklat },
  { id: "tb0", b: "lengkung" as const, w: WB.hijau },
  { id: "tx1", b: "segiempat" as const, w: WB.biru },
  { id: "tb1", b: "lengkung" as const, w: WB.kuning },
  { id: "tx2", b: "segitiga" as const, w: WB.merah },
  { id: "tb2", b: "lengkung" as const, w: WB.biru },
];
const PTS_TB = [1, 3, 5].map((i) => ({ x: TX(i), y: 80 }));

export const ADEGAN_LATIHAN_SATU: AdeganStory = {
  id: "latihan-satu",
  judul: "Latihan 1: ketuk bentuk lengkung",
  sumber: "Materi: latihan memeriksa kecocokan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Latihan 1")),
      tambah("bentuk", ...SLOT_T.map((s, i) => bentuk(s.b, s.id, TX(i), 80, 12, s.w))),
      tambah("Aturannya", ...kartu("ta", 60, 124, 180, 30, W.emas, ["aturan: bentuk lengkung"], 10.5)),
    ),
    k(
      SUARA_T2,
      sorotkan("kedua", "tb0"),
      tambah("kedua", cocok("mk0", TX(1), 54)),
      sorotkan("keempat", "tb1"),
      tambah("keempat", cocok("mk1", TX(3), 54)),
      sorotkan("keenam", "tb2"),
      tambah("keenam", cocok("mk2", TX(5), 54)),
    ),
    k(SUARA_T3, ubah(0, ...["tx0", "tx1", "tx2"].map((id) => ({ id, op: 0.3 }))), tambah("lurus.", teks("tt", 150, 176, "sisi lurus: tidak cocok", 10, W.merah))),
    k(SUARA_T4, hapus(0, "mk0", "mk1", "mk2", "tt"), ...hitungAksi(SUARA_T4, "tb", PTS_TB, "cocok.")),
    k(
      SUARA_T5,
      bersih(0),
      tambah(0, judul("Ketuk jawabannya")),
      tambah("dua,", ...kartu("o2", 30, 70, 60, 50, W.langit, ["2"], 24)),
      tambah("tiga,", ...kartu("o3", 120, 70, 60, 50, W.langit, ["3"], 24)),
      tambah("empat.", ...kartu("o4", 210, 70, 60, 50, W.langit, ["4"], 24)),
      sorotkan(idx(SUARA_T5, "tiga", 2), "o3-k"),
      tambah("Hebat", emo("ow", 150, 160, "\u{1F989}", 40)),
    ),
    k(
      SUARA_T6,
      bersih(0),
      tambah(0, judul("Ucapkan lagi"), emo("uc", 150, 70, "\u{1F4AC}", 40)),
      tambah("Tiga", ...kartu("e1", 40, 104, 220, 36, W.hijauMuda, ["tiga bentuk lengkung"], 14)),
    ),
  ],
};

/* ------------------------------ 2. Latihan 2: tebak aturan rahasia ------------------------------ */
const SUARA_D1 = "Latihan dua. Tebak aturan rahasia. Benda di kotak pertama masuk kelompok, benda di kotak kedua tidak masuk.";
const SUARA_D2 = "Lihat benda yang masuk. Warnanya berbeda-beda. Ukurannya juga berbeda-beda.";
const SUARA_D3 = "Semuanya bulat. Benda yang tidak masuk tidak bulat. Jadi aturan rahasianya adalah bentuk.";
const SUARA_D4 = "Ketuk aturan yang benar. Pilihannya bentuk, warna, atau ukuran. Bentuk yang benar. Hebat!";
const SUARA_D5 = "Sekarang tebak aturan yang lain. Kotak pertama berisi benda merah. Kotak kedua berisi benda biru dan kuning. Aturannya warna.";

export const ADEGAN_LATIHAN_DUA: AdeganStory = {
  id: "latihan-dua",
  judul: "Latihan 2: tebak aturan rahasia",
  sumber: "Materi: latihan menebak aturan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Latihan 2")),
      tambah("pertama", ...nampan("dm", 10, 34, 170, 96, "masuk", W.hijauMuda), bentuk("lengkung", "d0", 45, 84, 14, WB.coklat), bentuk("lengkung", "d1", 95, 84, 9, WB.biru), bentuk("lengkung", "d2", 142, 84, 11, WB.kuning)),
      tambah("kedua,", ...nampan("dt", 190, 34, 100, 96, "tidak masuk", W.merahMuda), bentuk("segitiga", "d3", 222, 84, 12, WB.merah), bentuk("segiempat", "d4", 262, 84, 10, WB.biru)),
    ),
    k(SUARA_D2, tambah("Warnanya", teks("dw", 95, 152, "warnanya berbeda", 10, W.ungu)), tambah("Ukurannya", teks("du", 95, 170, "ukurannya berbeda", 10, W.ungu))),
    k(
      SUARA_D3,
      hapus(0, "dw", "du"),
      tambah("bulat.", teks("ds", 95, 152, "semuanya lengkung", 10, W.hijau)),
      tambah("bentuk.", ...kartu("dr", 40, 164, 220, 28, W.emas, ["aturan rahasia: bentuk"], 10.5)),
    ),
    k(
      SUARA_D4,
      bersih(0),
      tambah(0, judul("Ketuk aturannya")),
      tambah("bentuk,", ...kartu("p1", 14, 60, 80, 50, W.langit, ["bentuk"], 12)),
      tambah("warna,", ...kartu("p2", 110, 60, 80, 50, W.hijauMuda, ["warna"], 12)),
      tambah("ukuran.", ...kartu("p3", 206, 60, 80, 50, W.pink, ["ukuran"], 12)),
      sorotkan(idx(SUARA_D4, "bentuk", 2), "p1-k"),
      tambah("Hebat!", emo("ow", 150, 150, "\u{1F989}", 40)),
    ),
    k(
      SUARA_D5,
      bersih(0),
      tambah(0, judul("Tebak lagi")),
      tambah("pertama", ...nampan("dn", 10, 34, 130, 96, "masuk", W.hijauMuda), bentuk("lengkung", "d5", 40, 84, 12, WB.merah), bentuk("segitiga", "d6", 78, 84, 12, WB.merah), bentuk("segiempat", "d7", 112, 84, 10, WB.merah)),
      tambah("kedua", ...nampan("do", 150, 34, 140, 96, "tidak masuk", W.merahMuda), bentuk("lengkung", "d8", 188, 84, 12, WB.biru), bentuk("segitiga", "d9", 232, 84, 12, WB.kuning)),
      tambah("warna.", ...kartu("dq", 40, 150, 220, 30, W.emas, ["aturan rahasia: warna"], 10.5)),
    ),
  ],
};

/* ------------------------------ 3. Latihan 3: lemari dua aturan ------------------------------ */
const SUARA_E1 = "Latihan tiga. Ini lemari dengan empat kotak. Baris atas untuk merah, baris bawah untuk hijau. Kolom kiri untuk bulat, kolom kanan untuk segitiga.";
const SUARA_E2 = "Mainan pertama, bulat merah. Seret ke kotak merah dan bulat.";
const SUARA_E3 = "Mainan kedua, segitiga hijau. Seret ke kotak hijau dan segitiga. Mainan ketiga, bulat hijau. Seret ke kotak hijau dan bulat.";
const SUARA_E4 = "Mainan keempat, segitiga merah. Seret ke kotak merah dan segitiga. Sekarang tiap kotak berisi satu mainan.";
const SUARA_E5 = "Hitung mainan berwarna hijau. Satu, dua. Ada dua mainan hijau. Hebat sekali!";
/** Pusat kotak lemari: baris (0 merah, 1 hijau), kolom (0 bulat, 1 segitiga). */
const KOTAK_L = (baris: number, kol: number) => ({ x: kol === 0 ? 122 : 237, y: 86 + baris * 60 });
const MAINAN_L = [
  { id: "mr0", b: "lengkung" as const, w: WB.merah, x: 50, baris: 0, kol: 0 },
  { id: "mh1", b: "segitiga" as const, w: WB.hijau, x: 110, baris: 1, kol: 1 },
  { id: "mh0", b: "lengkung" as const, w: WB.hijau, x: 170, baris: 1, kol: 0 },
  { id: "mr1", b: "segitiga" as const, w: WB.merah, x: 240, baris: 0, kol: 1 },
];
const pindahL = (id: string) => {
  const m = MAINAN_L.find((q) => q.id === id)!;
  const p = KOTAK_L(m.baris, m.kol);
  return pindah(m.b, id, p.x, p.y, 10);
};
const PTS_H = [KOTAK_L(1, 0), KOTAK_L(1, 1)];

export const ADEGAN_LATIHAN_TIGA: AdeganStory = {
  id: "latihan-tiga",
  judul: "Latihan 3: lemari dua aturan",
  sumber: "Materi: latihan warna dan bentuk",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Latihan 3")),
      tambah("kotak.", ...[0, 1].flatMap((b) => [0, 1].map((c) => kotak(`lc${b * 2 + c}`, c === 0 ? 70 : 185, 60 + b * 60, 105, 52, b === 0 ? W.merahMuda : W.hijauMuda, W.coklat, { rx: 6, tebal: 1.6 })))),
      tambah("lemari", ...MAINAN_L.map((m) => bentuk(m.b, m.id, m.x, 186, 9, m.w))),
      tambah("atas", teks("lr0", 38, 90, "merah", 9.4, W.merah)),
      tambah("bawah", teks("lr1", 38, 150, "hijau", 9.4, W.hijau)),
      tambah("kiri", teks("lh0", 122, 50, "bulat", 9.4, W.ungu)),
      tambah("kanan", teks("lh1", 237, 50, "segitiga", 9.4, W.ungu)),
    ),
    k(SUARA_E2, sorotkan("bulat", "mr0"), ubah("Seret", pindahL("mr0"))),
    k(
      SUARA_E3,
      redamkan(0, "mr0"),
      sorotkan("segitiga", "mh1"),
      ubah("Seret", pindahL("mh1")),
      sorotkan("ketiga,", "mh0"),
      ubah(idx(SUARA_E3, "Seret", 2), pindahL("mh0")),
    ),
    k(SUARA_E4, redamkan(0, "mh0", "mh1"), ubah("Seret", pindahL("mr1")), tambah("Sekarang", teks("ls", 150, 196, "tiap kotak: 1 mainan", 10, W.ungu))),
    k(SUARA_E5, hapus(0, "ls"), ...hitungAksi(SUARA_E5, "mh", PTS_H, "hijau."), tambah("Hebat", emo("ow", 150, 196, "\u{1F989}", 24))),
  ],
};

/* ------------------------------ 4. Penutup ------------------------------ */
const SUARA_Z1 = "Mari kita ingat lagi. Mengelompokkan artinya mengumpulkan benda yang punya ciri sama, menurut satu aturan.";
const SUARA_Z2 = "Kita periksa setiap benda, cocok atau tidak. Lalu kita beri nama dan hitung anggotanya.";
const SUARA_Z3 = "Sesudah ini, kerjakan latihan di layar. Ketuk benda, seret ke nampan, pilih jawaban, lalu ucapkan lagi mengikuti suara guru.";
const SUARA_Z4 = "Hebat sekali, anak-anak! Sampai jumpa di pelajaran berikutnya.";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup: mari ingat lagi",
  sumber: "Materi: ringkasan dan penutup",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Mari ingat lagi")),
      tambah("Mengelompokkan", ...kartu("z1", 20, 34, 260, 36, W.langit, ["kumpulkan benda yang ciri sama"], 10)),
      tambah("menurut", ...kartu("z2", 20, 82, 260, 36, W.hijauMuda, ["pakai satu aturan saja"], 10)),
      tambah("satu", ...kartu("z3", 20, 130, 260, 36, W.pink, ["bentuk, warna, atau ukuran"], 10)),
    ),
    k(
      SUARA_Z2,
      bersih(0),
      tambah(0, judul("Setelah mengumpulkan")),
      tambah("periksa", ...kartu("y1", 20, 40, 260, 36, W.krem, ["periksa: cocok atau tidak"], 10), cocok("y1c", 60, 100, 22), tidakCocok("y1d", 240, 100, 22)),
      tambah("nama", ...kartu("y2", 20, 116, 260, 36, W.hijauMuda, ["beri nama kelompok"], 10)),
      tambah("hitung", ...kartu("y3", 20, 160, 260, 32, W.pink, ["hitung anggotanya"], 10)),
    ),
    k(
      SUARA_Z3,
      bersih(0),
      tambah(0, judul("Sekarang giliranmu")),
      tambah("Ketuk", emo("w1", 50, 100, "\u{1F446}", 36)),
      tambah("seret", ...kartu("w2", 90, 76, 70, 36, W.emas, ["nampan"], 10)),
      tambah("pilih", ...kartu("w3", 180, 76, 100, 36, W.langit, ["jawaban"], 10)),
      tambah("ucapkan", emo("w4", 150, 160, "\u{1F4AC}", 40)),
    ),
    k(SUARA_Z4, bersih(0), tambah(0, judul("Hebat sekali!"), emo("ow", 150, 90, "\u{1F989}", 54)), tambah("Sampai", ...kartu("zh", 60, 126, 180, 34, W.emas, ["sampai jumpa!"], 12))),
  ],
};
