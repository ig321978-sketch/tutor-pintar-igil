import type { AdeganStory } from "./logika-story";
import { OWL, W, bagan, benda, bingkai, emo, idKartu, judul, kartu, pusatSel, teks, type Titik } from "./k1b6C-gambar";
import { bersih, hapus, idx, k, redamkan, sorotkan, tambah, ubah } from "./k1b6C-bantu";
import { kepala, pilihanBil } from "./k1b6C-luar-1";

/* ------------------------------ 4. Pasangan sampai 20: konsep ------------------------------ */
const SUARA_C1 = "Metode kedua bernama Pasangan sampai dua puluh. Satu bilangan besar punya dua pasangan.";
const SUARA_C2 = "Lima belas bisa dipasangkan dengan tiga dan dua belas. Tiga dan dua belas membentuk lima belas.";
const SUARA_C3 = "Kalau tiga pergi dari lima belas, yang tinggal adalah pasangan lainnya.";
const SUARA_C4 = "Jadi lima belas dikurangi tiga sama dengan dua belas. Sisanya adalah pasangan yang lain.";
const SUARA_C5 = "Periksa pasangannya. Dua belas ditambah tiga sama dengan lima belas. Ucapkan lagi mengikuti suara guru.";

export const ADEGAN_LUAR_PASANGAN: AdeganStory = {
  id: "luar-pasangan",
  judul: "Pasangan sampai 20: satu bilangan, dua pasangan",
  sumber: "Metode luar: Pasangan sampai 20",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_C1, tambah("kedua", ...kepala(1)), tambah("Satu", ...bagan("pg", "15", "?", "?", 66))),
    k(
      SUARA_C2,
      ubah(idx(SUARA_C2, "tiga"), { id: "pgat", isi: "3" }),
      ubah(idx(SUARA_C2, "dua"), { id: "pgbt", isi: "12" }),
    ),
    k(SUARA_C3, sorotkan("tiga", "pga"), sorotkan("tinggal", "pgb")),
    k(
      SUARA_C4,
      redamkan(0, "pga", "pgb"),
      tambah("Jadi", ...kartu("pj", 14, 164, 130, 24, W.emas, ["15 - 3 = 12"], 11)),
    ),
    k(
      SUARA_C5,
      tambah("Dua", ...kartu("pk", 156, 164, 130, 24, W.langit, ["12 + 3 = 15"], 11)),
      tambah("Ucapkan", emo("ucap", 150, 196, "\u{1F5E3}", 22)),
    ),
  ],
};

/* ------------------------------ 5. Pasangan sampai 20: terapan ------------------------------ */
const SUARA_D1 = "Terapkan pada enam belas kelereng Halim. Lima kelereng diberikan kepada Kira.";
const SUARA_D2 = "Ini bagan pasangan untuk enam belas. Satu pasangan adalah lima, pasangan yang lain belum kita tahu.";
const SUARA_D3 = "Pilih pasangannya. Lima dan berapa membentuk enam belas? Ada sepuluh, sebelas, atau dua belas. Ketuk bilangan yang tepat.";
const SUARA_D4 = "Betul, sebelas. Lima ditambah sebelas sama dengan enam belas, jadi enam belas dikurangi lima sama dengan sebelas.";

export const ADEGAN_LUAR_PASANGAN_TERAPAN: AdeganStory = {
  id: "luar-pasangan-terapan",
  judul: "Pasangan sampai 20: enam belas kelereng",
  sumber: "Metode luar: Pasangan sampai 20, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_D1, tambah("Terapkan", ...kepala(1)), tambah("kelereng", ...bagan("pt", "16", "5", "?", 66)), tambah("Kira.", emo("kk", 262, 110, "\u{1F449}", 24))),
    k(SUARA_D2, hapus(0, "kk"), sorotkan("pasangan", "ptu"), sorotkan("belum", "ptb")),
    k(
      SUARA_D3,
      redamkan(0, "ptu", "ptb"),
      tambah("Pilih", ...pilihanBil(150, ["10", "11", "12"])),
      sorotkan("Ketuk", "c2-k"),
    ),
    k(
      SUARA_D4,
      hapus(0, ...["c1", "c2", "c3"].flatMap((c) => [`${c}-k`, `${c}-t`])),
      ubah("sebelas.", { id: "ptbt", isi: "11" }),
      tambah("Lima", ...kartu("pm", 60, 150, 180, 24, W.langit, ["5 + 11 = 16"], 11)),
      tambah("jadi", ...kartu("pn", 60, 176, 180, 24, W.emas, ["16 - 5 = 11"], 11)),
    ),
  ],
};

/* ------------------------------ 6. Menjadikan Sepuluh: konsep ------------------------------ */
const SUARA_E1 = "Metode ketiga bernama Menjadikan Sepuluh. Isi sampai sepuluh dulu, lalu hitung sisanya.";
const SUARA_E2 = "Ini empat belas bolu. Sepuluh bolu rapi di dalam kotak, dan empat bolu lepas di luar.";
const SUARA_E3 = "Dua bolu pergi. Seret dua bolu lepas ke sisi kanan. Kotak sepuluh tidak disentuh.";
const SUARA_E4 = "Empat dikurangi dua sama dengan dua. Lalu sepuluh ditambah dua sama dengan dua belas.";
const SUARA_E5 = "Jadi empat belas dikurangi dua sama dengan dua belas. Ucapkan lagi mengikuti suara guru.";
const SX = 85;
const SY = 54;
const LOSE: Titik[] = [100, 130, 160, 190].map((x) => ({ x, y: 134 }));

export const ADEGAN_LUAR_SEPULUH: AdeganStory = {
  id: "luar-sepuluh",
  judul: "Menjadikan Sepuluh: kotak sepuluh tidak disentuh",
  sumber: "Metode luar: Menjadikan Sepuluh",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_E1,
      tambah("ketiga", ...kepala(2)),
      tambah("Isi", teks("t10", 150, 118, "10", 11, W.merah), ...bingkai("sb", SX, SY), ...Array.from({ length: 10 }, (_, i) => benda("bolu", `sl${i}`, pusatSel(i, SX, SY).x, pusatSel(i, SX, SY).y, 9)).flat()),
    ),
    k(
      SUARA_E2,
      tambah("empat", teks("b14", 252, 82, "14 bolu", 11, W.ungu)),
      tambah(idx(SUARA_E2, "empat", 2), ...LOSE.flatMap((p, i) => benda("bolu", `sl${10 + i}`, p.x, p.y, 9))),
    ),
    k(
      SUARA_E3,
      sorotkan("Dua", "sl10", "sl11"),
      ubah("kanan.", { id: "sl10", x: 252, y: 134, sorot: false }, { id: "sl11", x: 276, y: 134, sorot: false }),
      sorotkan("Kotak", ...Array.from({ length: 10 }, (_, i) => `sb-c${i}`)),
    ),
    k(
      SUARA_E4,
      redamkan(0, ...Array.from({ length: 10 }, (_, i) => `sb-c${i}`)),
      tambah("Empat", ...kartu("sa", 14, 150, 130, 24, W.krem, ["4 - 2 = 2"], 11)),
      tambah("Lalu", ...kartu("sc", 156, 150, 130, 24, W.langit, ["10 + 2 = 12"], 11)),
    ),
    k(
      SUARA_E5,
      tambah("Jadi", ...kartu("sd", 60, 178, 180, 22, W.emas, ["14 - 2 = 12"], 11)),
      tambah("Ucapkan", emo("ucap", 34, 130, "\u{1F5E3}", 24)),
    ),
  ],
};

/* ------------------------------ 7. Menjadikan Sepuluh: terapan ------------------------------ */
const SUARA_F1 = "Terapkan pada delapan belas apel Upe. Sepuluh apel di kotak, delapan apel lepas.";
const SUARA_F2 = "Tujuh apel dimakan ulat. Seret tujuh apel lepas ke bawah. Kotak sepuluh tidak disentuh.";
const SUARA_F3 = "Delapan dikurangi tujuh sama dengan satu. Sepuluh ditambah satu sama dengan sebelas. Jadi delapan belas dikurangi tujuh sama dengan sebelas.";
const SUARA_F4 = "Coba pilih. Sisa apel ada sepuluh, sebelas, atau dua belas? Ketuk bilangan yang tepat.";
const AX = 85;
const AY = 54;
const LA: Titik[] = Array.from({ length: 8 }, (_, i) => ({ x: 40 + i * 30, y: 122 }));
const BAWAH: Titik[] = Array.from({ length: 7 }, (_, i) => ({ x: 40 + i * 30, y: 194 }));

export const ADEGAN_LUAR_SEPULUH_TERAPAN: AdeganStory = {
  id: "luar-sepuluh-terapan",
  judul: "Menjadikan Sepuluh: delapan belas apel",
  sumber: "Metode luar: Menjadikan Sepuluh, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_F1,
      tambah("Terapkan", ...kepala(2), teks("a18", 252, 82, "18 apel", 11, W.ungu)),
      tambah("Sepuluh", teks("t10", 150, 111, "10", 11, W.merah), ...bingkai("ab", AX, AY), ...Array.from({ length: 10 }, (_, i) => benda("apel", `al${i}`, pusatSel(i, AX, AY).x, pusatSel(i, AX, AY).y, 9, i)).flat()),
      tambah(idx(SUARA_F1, "delapan", 2), ...LA.flatMap((p, i) => benda("apel", `al${10 + i}`, p.x, p.y, 9, 10 + i))),
    ),
    k(
      SUARA_F2,
      sorotkan("Tujuh", ...Array.from({ length: 7 }, (_, i) => `al${10 + i}`)),
      ...BAWAH.map((p, i) => ubah("bawah.", { id: `al${10 + i}`, x: p.x, y: p.y, sorot: false, op: 0.4 })),
      sorotkan("Kotak", ...Array.from({ length: 10 }, (_, i) => `ab-c${i}`)),
    ),
    k(
      SUARA_F3,
      redamkan(0, ...Array.from({ length: 10 }, (_, i) => `ab-c${i}`)),
      tambah("Delapan", ...kartu("f1", 14, 138, 130, 20, W.krem, ["8 - 7 = 1"], 10)),
      tambah("Sepuluh", ...kartu("f2", 156, 138, 130, 20, W.langit, ["10 + 1 = 11"], 10)),
      tambah("Jadi", ...kartu("f3", 60, 162, 180, 20, W.emas, ["18 - 7 = 11"], 10)),
    ),
    k(
      SUARA_F4,
      hapus(0, ...idKartu("f1"), ...idKartu("f2"), ...idKartu("f3")),
      tambah("Coba", ...pilihanBil(138, ["10", "11", "12"])),
      sorotkan("Ketuk", "c2-k"),
    ),
  ],
};

/* ------------------------------ 8. Ringkasan ------------------------------ */
const SUARA_G1 = "Mari kita ringkas tiga metode dari luar. Semuanya membantu kita mencari sisa.";
const SUARA_G2 = "Maju dan Mundur: mundur untuk mengurangi, lalu maju untuk memeriksa hasilnya.";
const SUARA_G3 = "Pasangan sampai dua puluh: satu bilangan besar punya dua pasangan. Menjadikan Sepuluh: kotak sepuluh tidak disentuh, hanya yang lepas yang berkurang.";
const SUARA_G4 = "Tiga metode itu menghasilkan sisa yang sama. Pilih yang paling cocok untukmu. Sampai jumpa!";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Metode luar: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_G1, tambah(0, judul("Ringkasan")), tambah("ringkas", emo("rg", 150, 100, "\u{1F30D}", 56)), tambah("sisa.", ...kartu("rs", 50, 150, 200, 30, W.emas, ["tiga metode, satu tujuan"], 11))),
    k(SUARA_G2, bersih(0), tambah(0, judul("Ringkasan")), tambah("Maju", ...kartu("r1", 14, 40, 272, 40, W.hijauMuda, ["Maju dan Mundur", "mundur, lalu maju memeriksa"], 9.6))),
    k(
      SUARA_G3,
      tambah("Pasangan", ...kartu("r2", 14, 90, 272, 40, W.langit, ["Pasangan sampai 20", "satu bilangan, dua pasangan"], 9.6)),
      tambah(idx(SUARA_G3, "Menjadikan"), ...kartu("r3", 14, 140, 272, 40, W.pink, ["Menjadikan Sepuluh", "kotak 10 tidak disentuh"], 9.6)),
    ),
    k(SUARA_G4, bersih(0), tambah(0, judul("Sampai jumpa!"), emo("sj", 150, 110, OWL, 56)), tambah("Pilih", emo("pa", 80, 160, "\u{1F389}", 30), emo("pb", 220, 160, "\u{1F389}", 30))),
  ],
};
