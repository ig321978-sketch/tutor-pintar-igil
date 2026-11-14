import type { AdeganStory, Aksi, Obj } from "./logika-story";
import { W, busurSemua, daftar, deret, garisBilangan, judul, kartu, loncat, muncul, tabel, teks, titikBil } from "./k4b3b-gambar";
import { bersih, k, tambah } from "./k4b3b-bantu";

/** Sel tabel pada baris dan kolom tertentu (kotak dan tulisannya). */
const sel = (objs: Obj[], id: string, rows: number[], cols: number[]): Obj[] => objs.filter((o) => rows.some((r) => cols.some((c) => o.id === `${id}-s${r}${c}` || o.id === `${id}-t${r}${c}`)));

/* ------------------------------ 6. Table of Values: konsep ------------------------------ */
const TAB_KONSEP = tabel(
  "tc",
  50,
  34,
  [60, 70, 70],
  [
    ["Urutan", "Nilai", "Beda"],
    ["1", "3", ""],
    ["2", "5", "+2"],
    ["3", "7", "+2"],
    ["4", "9", "+2"],
    ["5", "11", "+2"],
    ["6", "13", "+2"],
  ],
  17,
  9.4,
);
export const ADEGAN_LUAR_TV: AdeganStory = {
  id: "luar-tv",
  judul: "Table of Values (Tabel Nilai)",
  sumber: "Metode luar: Table of Values",
  latar: "#FEFCE8",
  ketukan: [
    k(
      "Metode ketiga, Table of Values atau Tabel Nilai. Catat nomor urutan di satu kolom dan nilainya di kolom lain, lalu tambahkan kolom beda.",
      bersih(0),
      tambah(0, judul("Table of Values")),
      tambah("urutan", ...sel(TAB_KONSEP, "tc", [0], [0])),
      tambah("nilainya", ...sel(TAB_KONSEP, "tc", [0], [1])),
      tambah("lain,", ...sel(TAB_KONSEP, "tc", [1, 2, 3, 4], [0, 1])),
      tambah("beda.", ...sel(TAB_KONSEP, "tc", [0], [2]), ...sel(TAB_KONSEP, "tc", [1, 2, 3, 4], [2])),
    ),
    k(
      "Kolom beda memperlihatkan pola. Jika semua beda sama, tabel boleh diperpanjang ke bawah sampai urutan yang dicari.",
      tambah("diperpanjang", ...sel(TAB_KONSEP, "tc", [5, 6], [0, 1, 2])),
      tambah("bawah", ...kartu("tck", 50, 160, 200, 28, W.hijauMuda, ["beda sama: tabel diperpanjang"], 9.4)),
    ),
    k(
      "Kotak kosong pun terbaca. Selisih dua nilai yang berjarak dua urutan sama dengan dua kali beda, jadi beda sama dengan selisih itu dibagi dua.",
      bersih(0),
      tambah(0, judul("Beda dari kotak kosong")),
      tambah("Selisih", ...kartu("tg1", 12, 38, 276, 30, W.krem, ["nilai 5 − nilai 3 = 2 × beda"], 10)),
      tambah("dua@2", ...kartu("tg2", 12, 80, 276, 30, W.langit, ["11 − 7 = 4"], 11)),
      tambah("dibagi", ...kartu("tg3", 12, 122, 276, 30, W.hijauMuda, ["4 ÷ 2 = 2"], 11)),
    ),
  ],
};

/* ------------------------------ 7. Table of Values: penerapan ------------------------------ */
const TAB_L5 = tabel(
  "tl",
  20,
  34,
  [60, 70, 70],
  [
    ["Urutan", "Nilai", "Beda"],
    ["1", "13", ""],
    ["2", "22", "+9"],
    ["3", "31", "+9"],
    ["4", "?", "+9"],
    ["5", "49", "+9"],
    ["6", "?", "+9"],
  ],
  16,
  9.4,
);
const TAB_U8 = tabel(
  "tm",
  20,
  34,
  [60, 70, 70],
  [
    ["Urutan", "Nilai", "Beda"],
    ["1", "40", ""],
    ["2", "34", "−6"],
    ["3", "?", "−6"],
    ["4", "22", "−6"],
    ["5", "16", "−6"],
    ["6", "?", "−6"],
  ],
  16,
  9.4,
);
const isi = (id: string, r: number, nilai: string, warna: string): Aksi[] => [{ ubah: [{ id: `${id}-t${r}1`, isi: nilai, warna }, { id: `${id}-s${r}1`, warna: W.hijauMuda }] }];
export const ADEGAN_LUAR_TV_TERAPAN: AdeganStory = {
  id: "luar-tv-terapan",
  judul: "Table of Values diterapkan pada angka buku",
  sumber: "Metode luar: Table of Values pada soal Buku Siswa",
  latar: "#FEFCE8",
  ketukan: [
    k(
      "Latihan lima: urutan satu tiga belas, urutan dua dua puluh dua, urutan tiga tiga puluh satu, urutan empat kosong, urutan lima empat puluh sembilan, urutan enam kosong.",
      bersih(0),
      tambah(0, judul("Latihan 5: isi tabel")),
      tambah("Latihan", ...sel(TAB_L5, "tl", [0], [0, 1, 2])),
      tambah("belas,", ...sel(TAB_L5, "tl", [1], [0, 1])),
      tambah("dua@3", ...sel(TAB_L5, "tl", [2], [0, 1])),
      tambah("satu@2", ...sel(TAB_L5, "tl", [3], [0, 1])),
      tambah("kosong,", ...sel(TAB_L5, "tl", [4], [0, 1])),
      tambah("sembilan,", ...sel(TAB_L5, "tl", [5], [0, 1])),
      tambah("kosong@2", ...sel(TAB_L5, "tl", [6], [0, 1])),
    ),
    k(
      "Dari tiga puluh satu ke empat puluh sembilan naik delapan belas dalam dua urutan, jadi bedanya sembilan. Maka urutan empat empat puluh, urutan enam lima puluh delapan.",
      tambah("naik", ...kartu("tlk", 12, 152, 276, 40, W.krem, ["49 − 31 = 18", "18 ÷ 2 = 9"], 10)),
      tambah("bedanya", ...sel(TAB_L5, "tl", [1, 2, 3], [2]), ...sel(TAB_L5, "tl", [4, 5, 6], [2])),
      ...isi("tl", 4, "40", W.hijau).map((a) => ({ ...a, at: "puluh@3" })),
      ...isi("tl", 6, "58", W.hijau).map((a) => ({ ...a, at: "delapan@2" })),
    ),
    k(
      "Soal delapan Uji Kompetensi: empat puluh, tiga puluh empat, kosong, dua puluh dua, enam belas, kosong.",
      bersih(0),
      tambah(0, judul("Uji Kompetensi 8: isi tabel", W.merah)),
      tambah("Soal", ...sel(TAB_U8, "tm", [0], [0, 1, 2])),
      tambah("puluh,", ...sel(TAB_U8, "tm", [1], [0, 1])),
      tambah("empat@2", ...sel(TAB_U8, "tm", [2], [0, 1])),
      tambah("kosong,", ...sel(TAB_U8, "tm", [3], [0, 1])),
      tambah("dua@2", ...sel(TAB_U8, "tm", [4], [0, 1])),
      tambah("belas,", ...sel(TAB_U8, "tm", [5], [0, 1])),
      tambah("kosong@2", ...sel(TAB_U8, "tm", [6], [0, 1])),
    ),
    k(
      "Dari tiga puluh empat ke dua puluh dua turun dua belas dalam dua urutan, jadi bedanya kurang enam. Maka urutan tiga dua puluh delapan, urutan enam sepuluh.",
      tambah("turun", ...kartu("tmk", 12, 152, 276, 40, W.merahMuda, ["34 − 22 = 12", "12 ÷ 2 = 6"], 10)),
      tambah("bedanya", ...sel(TAB_U8, "tm", [1, 2, 3, 4, 5, 6], [2])),
      ...isi("tm", 3, "28", W.hijau).map((a) => ({ ...a, at: "delapan," })),
      ...isi("tm", 6, "10", W.hijau).map((a) => ({ ...a, at: "sepuluh." })),
    ),
  ],
};

/* ------------------------------ 8. Number Line Jumps: konsep ------------------------------ */
const KG = garisBilangan("kg", 20, 110, 260, 3, 11);
const KP = [3, 5, 7, 9, 11].map((v, i) => titikBil(`kp${i}`, KG.px(v), 110, String(v)));
const KJ = [0, 1, 2, 3].map((i) => loncat(`kj${i}`, 110, KG.px(3 + 2 * i), KG.px(5 + 2 * i), "+2", 18));
const LA = garisBilangan("la", 20, 80, 260, 0, 10);
const LB = garisBilangan("lb", 20, 150, 260, 0, 10);
const D_KJ = deret("kd", 24, 84, ["10", "11", "13", "16", "20"], { bw: 36, gap: 18 });
const B_KJ = busurSemua("kd", 24, 84, ["+1", "+2", "+3", "+4"], { bw: 36, gap: 18 });
export const ADEGAN_LUAR_NJ: AdeganStory = {
  id: "luar-nj",
  judul: "Number Line Jumps (Loncatan di Garis Bilangan)",
  sumber: "Metode luar: Number Line Jumps",
  latar: "#ECFEFF",
  ketukan: [
    k(
      "Metode keempat, Number Line Jumps atau Loncatan di Garis Bilangan. Tiap suku adalah satu titik di garis bilangan, dan beda adalah panjang loncatan.",
      bersih(0),
      tambah(0, judul("Number Line Jumps")),
      tambah("Loncatan", ...kartu("kk", 40, 34, 220, 28, W.krem, ["Loncatan di Garis Bilangan"], 9.4)),
      tambah("Number", ...KG.objs),
      tambah("suku", ...KP[0]),
      tambah("satu", ...KP[1]),
      tambah("titik", ...KP[2]),
      tambah("garis@2", ...KP[3]),
      tambah("bilangan@2", ...KP[4]),
      tambah("dan", ...KJ[0]),
      tambah("beda", ...KJ[1]),
      tambah("adalah@2", ...KJ[2]),
      tambah("panjang", ...KJ[3]),
      tambah("loncatan@2", ...kartu("kb", 60, 150, 180, 28, W.hijauMuda, ["beda: panjang loncatan"], 9.4)),
    ),
    k(
      "Beda positif membuat loncatan ke kanan, beda negatif ke kiri. Loncatan yang sama panjang berarti bedanya tetap.",
      bersih(0),
      tambah(0, judul("Arah loncatan")),
      tambah("positif", ...LA.objs, ...titikBil("ka0", LA.px(2), 80, "2"), ...titikBil("ka1", LA.px(5), 80, "5")),
      tambah("kanan,", ...loncat("kaj0", 80, LA.px(2), LA.px(5), "+3", 18), teks("kat", 252, 48, "ke kanan", 9, W.hijau)),
      tambah("negatif", ...LB.objs, ...titikBil("kb0", LB.px(8), 150, "8"), ...titikBil("kb1", LB.px(3), 150, "3")),
      tambah("kiri.", ...loncat("kbj0", 150, LB.px(8), LB.px(3), "−5", 18), teks("kbt", 252, 118, "ke kiri", 9, W.merah)),
    ),
    k(
      "Dalam kunci Panduan Guru, loncatan digambar sebagai busur di antara kotak: tambah satu, tambah dua, tambah tiga, tambah empat. Panjang loncatan boleh berubah.",
      bersih(0),
      tambah(0, judul("Busur loncatan di buku")),
      ...muncul(D_KJ, B_KJ, ["kotak:", "kotak:", "kotak:", "kotak:", "kotak:"], ["satu,", "dua,", "tiga,", "empat."]),
      tambah("Panjang", ...kartu("kd2", 40, 136, 220, 28, W.krem, ["panjang loncatan boleh berubah"], 9.4)),
    ),
  ],
};

/* ------------------------------ 9. Number Line Jumps: penerapan ------------------------------ */
/** Garis bilangan dengan titik-titik suku dan busur loncatan: titik `${L}{i}`, loncatan `${L}j{i}` (label dihitung dari selisih). */
function garisLoncat(L: string, y: number, dari: number, sampai: number, nilai: number[], tinggiDari: (b: number) => number = () => 18) {
  const g = garisBilangan(`${L}g`, 15, y, 270, dari, sampai);
  const titik = nilai.map((v, i) => titikBil(`${L}${i}`, g.px(v), y, String(v)));
  const loncatan = nilai.slice(1).map((v, i) => {
    const b = v - nilai[i];
    return loncat(`${L}j${i}`, y, g.px(nilai[i]), g.px(v), `${b > 0 ? "+" : "−"}${Math.abs(b)}`, tinggiDari(Math.abs(b)));
  });
  return { g, titik, loncatan };
}
/** Rentang dan suku tiap garis bilangan penerapan (diuji mandiri). */
export const GARIS_BIL: Record<string, { dari: number; sampai: number; nilai: number[] }> = {
  na: { dari: 1, sampai: 13, nilai: [1, 4, 7, 10, 13] },
  nb: { dari: 3, sampai: 23, nilai: [23, 18, 13, 8, 3] },
  nc: { dari: 10, sampai: 20, nilai: [10, 11, 13, 16, 20] },
  nd: { dari: 40, sampai: 50, nilai: [50, 49, 47, 44, 40] },
};
const mk = (L: string, tinggi?: (b: number) => number) => {
  const c = GARIS_BIL[L];
  return garisLoncat(L, 112, c.dari, c.sampai, c.nilai, tinggi);
};
const NA = mk("na");
const NB = mk("nb");
const NC = mk("nc", (b) => 10 + 2 * b);
const ND = mk("nd", (b) => 10 + 2 * b);
export const ADEGAN_LUAR_NJ_TERAPAN: AdeganStory = {
  id: "luar-nj-terapan",
  judul: "Number Line Jumps diterapkan pada angka buku",
  sumber: "Metode luar: Number Line Jumps pada soal Buku Siswa",
  latar: "#ECFEFF",
  ketukan: [
    k(
      "Kasus satu: mulai di satu, loncat tiga ke kanan ke empat, lalu tujuh, lalu sepuluh. Loncatan berikutnya mendarat di tiga belas.",
      bersih(0),
      tambah(0, judul("Kasus 1: loncat ke kanan")),
      tambah(0, ...NA.g.objs),
      tambah("satu@2", ...NA.titik[0]),
      tambah("tiga", ...kartu("nak", 80, 154, 140, 28, W.hijauMuda, ["beda +3"], 10)),
      tambah("empat,", ...NA.loncatan[0], ...NA.titik[1]),
      tambah("tujuh,", ...NA.loncatan[1], ...NA.titik[2]),
      tambah("sepuluh.", ...NA.loncatan[2], ...NA.titik[3]),
      tambah("belas.", ...NA.loncatan[3], ...NA.titik[4]),
    ),
    k(
      "Kasus dua: mulai di dua puluh tiga, loncat lima ke kiri ke delapan belas, lalu tiga belas, lalu delapan. Loncatan berikutnya mendarat di tiga.",
      bersih(0),
      tambah(0, judul("Kasus 2: loncat ke kiri", W.merah)),
      tambah(0, ...NB.g.objs),
      tambah("tiga,", ...NB.titik[0]),
      tambah("lima", ...kartu("nbk", 80, 154, 140, 28, W.merahMuda, ["beda −5"], 10)),
      tambah("belas,", ...NB.loncatan[0], ...NB.titik[1]),
      tambah("belas@2", ...NB.loncatan[1], ...NB.titik[2]),
      tambah("delapan@2", ...NB.loncatan[2], ...NB.titik[3]),
      tambah("tiga@3", ...NB.loncatan[3], ...NB.titik[4]),
    ),
    k(
      "Pengayaan empat: sepuluh, sebelas, tiga belas, enam belas. Loncatannya satu, dua, tiga, lalu empat, makin panjang, dan mendarat di dua puluh.",
      bersih(0),
      tambah(0, judul("Pengayaan 4: loncatan makin panjang")),
      tambah(0, ...NC.g.objs),
      tambah("sepuluh,", ...NC.titik[0]),
      tambah("sebelas,", ...NC.titik[1]),
      tambah("belas,", ...NC.titik[2]),
      tambah("belas@2", ...NC.titik[3]),
      tambah("satu,", ...NC.loncatan[0]),
      tambah("dua,", ...NC.loncatan[1]),
      tambah("tiga@2", ...NC.loncatan[2]),
      tambah("empat@2", ...NC.loncatan[3], ...NC.titik[4]),
      tambah("makin", ...kartu("nck", 40, 156, 220, 28, W.krem, ["beda berubah: +1, +2, +3, +4"], 9.6)),
    ),
    k(
      "Pengayaan lima: lima puluh, empat puluh sembilan, empat puluh tujuh, empat puluh empat. Loncatan ke kiri satu, dua, tiga, lalu empat mendarat di empat puluh.",
      bersih(0),
      tambah(0, judul("Pengayaan 5: ke kiri makin panjang", W.merah)),
      tambah(0, ...ND.g.objs),
      tambah("puluh,", ...ND.titik[0]),
      tambah("sembilan,", ...ND.titik[1]),
      tambah("tujuh,", ...ND.titik[2]),
      tambah("empat@4", ...ND.titik[3]),
      tambah("satu,", ...ND.loncatan[0]),
      tambah("dua,", ...ND.loncatan[1]),
      tambah("tiga,", ...ND.loncatan[2]),
      tambah("empat@5", ...ND.loncatan[3]),
      tambah("puluh@5", ...ND.titik[4]),
      tambah("kiri", ...kartu("ndk", 40, 156, 220, 28, W.merahMuda, ["beda berubah: −1, −2, −3, −4"], 9.6)),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode luar",
  sumber: "Ringkasan metode luar: telur Buku Siswa hlm. 98–99",
  latar: "#F5F3FF",
  ketukan: [
    k(
      "Empat metode, satu inti: temukan bedanya. Arithmetic Sequence memakai rumus, Function Machine memakai aturan mesin, Table of Values memakai tabel, Number Line Jumps memakai loncatan.",
      ...daftar("rs", "Empat metode, satu inti", [
        { at: "Sequence", t: "rumus: a + (n − 1) × b", w: W.hijauMuda, u: 9.6 },
        { at: "Machine", t: "aturan mesin: kali beda ± tetap", w: W.langit, u: 9.4 },
        { at: "Values", t: "tabel: urutan, nilai, beda", w: W.krem, u: 9.6 },
        { at: "Jumps", t: "loncatan di garis bilangan", w: W.pink, u: 9.6 },
      ]),
    ),
    k(
      "Satu soal, empat cara: telur dua puluh, dua puluh delapan, tiga puluh enam. Barisan aritmetika: dua puluh tambah empat kali delapan. Mesin: delapan kali lima tambah dua belas. Tabel dan loncatan sama-sama sampai lima puluh dua.",
      bersih(0),
      tambah(0, judul("Telur hari kelima: 52")),
      tambah("Barisan", ...kartu("rt1", 12, 36, 276, 30, W.hijauMuda, ["Barisan: 20 + 4 × 8 = 52"], 10)),
      tambah("Mesin:", ...kartu("rt2", 12, 74, 276, 30, W.langit, ["Mesin: 8 × 5 + 12 = 52"], 10)),
      tambah("Tabel", ...kartu("rt3", 12, 112, 276, 30, W.krem, ["Tabel: 20, 28, 36, 44, 52"], 10)),
      tambah("loncatan", ...kartu("rt4", 12, 150, 276, 30, W.pink, ["Loncatan: 20 → 28 → 36 → 44 → 52"], 9.4)),
    ),
    k(
      "Metode luar hanya tambahan. Jawaban resmi tetap mengikuti buku: cari bedanya, tulis dalam tabel, lalu lanjutkan polanya.",
      ...daftar("rz", "Tetap ikuti buku", [
        { at: "tambahan.", t: "metode luar: tambahan", w: W.krem, u: 10 },
        { at: "buku:", t: "resmi: cari beda, tabel, lanjutkan", w: W.hijauMuda, u: 9.4 },
      ]),
    ),
  ],
};
