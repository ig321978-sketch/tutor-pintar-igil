import type { AdeganStory, Obj } from "./logika-story";
import { W, daftar, emo, judul, kartu, kotak, kubusDi, teks } from "./k4b4b-gambar";
import { bersih, k, tambah, ubah } from "./k4b4b-bantu";

/** Gelas ukur: tinggi 100 piksel, 1 mililiter air = 0,5 piksel. Air `${id}-a`, kaca `${id}-g`, tulisan tinggi air `${id}-l`. (x, y) pojok kiri-atas kaca. */
export const SKALA_GELAS = 0.5;
function gelas(id: string, x: number, y: number, level: number): Obj[] {
  return [
    kotak(`${id}-a`, x, y + 100 - level * SKALA_GELAS, 56, level * SKALA_GELAS, "#93C5FD", undefined, { rx: 0, tebal: 0 }),
    kotak(`${id}-g`, x, y, 56, 100, "none", W.biru, { rx: 3, tebal: 1.6, z: 2 }),
    teks(`${id}-l`, x + 28, y + 118, `${level} ml`, 9.6, W.biru),
  ];
}
const naikkan = (at: string | number, id: string, x: number, y: number, level: number) =>
  ubah(at, { id: `${id}-a`, y: y + 100 - level * SKALA_GELAS, h: level * SKALA_GELAS }, { id: `${id}-l`, isi: `${level} ml` });

/* ------------------------------ 6. Displacement Idea: konsep ------------------------------ */
export const ADEGAN_LUAR_DI: AdeganStory = {
  id: "luar-di",
  judul: "Displacement Idea (Ide Pemindahan Air)",
  sumber: "Metode luar: Displacement Idea (Ide Pemindahan Air)",
  latar: "#ECFEFF",
  ketukan: [
    k(
      "Metode ketiga, Displacement Idea atau Ide Pemindahan Air. Benda padat yang dimasukkan ke dalam air mendesak air sebanyak volume benda itu.",
      bersih(0),
      tambah(0, judul("Displacement Idea")),
      tambah("Benda", ...gelas("dg", 30, 44, 100)),
      tambah("dimasukkan", emo("dd", 58, 34, "🎲", 22)),
      tambah("Pemindahan", ...kartu("d1", 120, 52, 168, 32, W.langit, ["Ide Pemindahan Air"], 9.6)),
      tambah("mendesak", ...kartu("d2", 120, 96, 168, 40, W.krem, ["air terdesak =", "volume benda"], 9)),
    ),
    k(
      "Karena satu sentimeter kubik sama dengan satu mililiter, kenaikan air dalam mililiter sama dengan volume benda dalam sentimeter kubik.",
      ...daftar("de", "Satuan yang cocok", [
        { at: "satu", t: "1 cm³ = 1 ml", w: W.hijauMuda, u: 11 },
        { at: "kenaikan", t: "air naik 1 ml = benda 1 cm³", w: W.krem, u: 9.4 },
      ]),
    ),
    k(
      "Cara ini cocok untuk benda pejal seperti dadu mainan Helen. Ukur air sebelum dan sesudah, lalu kurangkan.",
      bersih(0),
      tambah(0, judul("Benda pejal: ukur airnya")),
      tambah("dadu", emo("df", 150, 76, "🎲", 40)),
      tambah("sebelum", ...kartu("dg1", 12, 100, 132, 30, W.langit, ["air sebelum"], 9.6)),
      tambah("sesudah", ...kartu("dg2", 156, 100, 132, 30, W.hijauMuda, ["air sesudah"], 9.6)),
      tambah("kurangkan.", ...kartu("dg3", 30, 144, 240, 32, W.krem, ["sesudah − sebelum = volume"], 9.6)),
    ),
  ],
};

/* ------------------------------ 7. Displacement Idea: penerapan ------------------------------ */
const SOAL_DI = [
  { id: "A", lama: 100, naik: 9, baru: 109, s: 14 },
  { id: "D", lama: 100, naik: 18, baru: 118, s: 12 },
  { id: "i", lama: 100, naik: 24, baru: 124, s: 8 },
];
const kataDI = [
  "Misalkan gelas ukur berisi seratus mililiter air. Bangun A, sembilan kubus satuan, dicelupkan. Air naik sembilan mililiter menjadi seratus sembilan mililiter.",
  "Bangun D, delapan belas kubus, dicelupkan: air naik delapan belas mililiter, menjadi seratus delapan belas mililiter. Selisihnya seratus delapan belas kurang seratus sama dengan delapan belas.",
  "Bangun satu, dua puluh empat kubus: air naik dua puluh empat mililiter, menjadi seratus dua puluh empat mililiter.",
];
const ketukanDI = (i: number) => {
  const q = SOAL_DI[i];
  return k(
    kataDI[i],
    bersih(0),
    tambah(0, judul(`Bangun ${q.id === "i" ? "(i)" : q.id}: air naik`)),
    tambah(["Misalkan", "Bangun", "Bangun"][i], ...gelas("gx", 24, 44, q.lama)),
    tambah(["dicelupkan.", "dicelupkan:", "kubus:"][i], ...kubusDi("gb", q.id, 168, 104, q.s)),
    tambah(["dicelupkan.", "dicelupkan:", "kubus:"][i], ...kartu("gc", 100, 112, 188, 26, W.krem, [`volume ${q.naik} cm³`], 9.6)),
    naikkan(["naik", "naik", "naik"][i], "gx", 24, 44, q.baru),
    tambah(["naik", "naik", "naik"][i], ...kartu("gd", 100, 146, 188, 28, W.hijauMuda, [`naik ${q.naik} ml`], 10)),
  );
};
export const ADEGAN_LUAR_DI_TERAPAN: AdeganStory = {
  id: "luar-di-terapan",
  judul: "Displacement Idea diterapkan pada bangun buku",
  sumber: "Metode luar: Displacement Idea pada bangun Buku Siswa hlm. 135–136",
  latar: "#ECFEFF",
  ketukan: [
    ketukanDI(0),
    ketukanDI(1),
    ketukanDI(2),
    k(
      "Dari kenaikan air kita membaca volume benda. Dua puluh empat mililiter berarti dua puluh empat sentimeter kubik, cocok dengan hitungan kubus di buku.",
      ...daftar("gf", "Kenaikan air = volume", [
        { at: "membaca", t: "A: 109 − 100 = 9 cm³", w: W.krem, u: 10.4 },
        { at: "Dua", t: "D: 118 − 100 = 18 cm³", w: W.hijauMuda, u: 10.4 },
        { at: "dua@2", t: "(i): 124 − 100 = 24 cm³", w: W.langit, u: 10.4 },
        { at: "cocok", t: "cocok dengan hitungan kubus ✔", w: W.pink, u: 9.4 },
      ]),
    ),
  ],
};

/* ------------------------------ 8. Benchmark Referents: konsep ------------------------------ */
export const ADEGAN_LUAR_BR: AdeganStory = {
  id: "luar-br",
  judul: "Benchmark Referents (Patokan Benda Sehari-hari)",
  sumber: "Metode luar: Benchmark Referents (Patokan Benda Sehari-hari)",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Metode keempat, Benchmark Referents atau Patokan Benda Sehari-hari. Hafalkan satu benda yang volumenya sudah diketahui, lalu bandingkan benda lain dengannya.",
      bersih(0),
      tambah(0, judul("Benchmark Referents")),
      tambah("Patokan", ...kartu("b1", 12, 40, 276, 30, W.pink, ["Patokan Benda Sehari-hari"], 9.6)),
      tambah("Hafalkan", emo("b2", 70, 112, "🍼", 40), teks("b2t", 70, 132, "patokan: 1 l", 10, W.biru)),
      tambah("bandingkan", emo("b3", 230, 112, "🥛", 40), teks("b3t", 230, 132, "mirip patokan?", 10, W.coklat)),
    ),
    k(
      "Patokan dari buku: satu sendok lima mililiter, secangkir kopi dua ratus empat puluh mililiter, botol minuman tiga ratus tiga puluh mililiter, dan botol air mineral satu liter.",
      bersih(0),
      tambah(0, judul("Patokan dari buku")),
      tambah("sendok", emo("c1", 40, 100, "🥄", 34), teks("c1t", 40, 122, "5 ml", 10, W.biru)),
      tambah("secangkir", emo("c2", 112, 100, "☕", 34), teks("c2t", 112, 122, "240 ml", 10, W.biru)),
      tambah("minuman", emo("c3", 188, 100, "🥤", 34), teks("c3t", 188, 122, "330 ml", 10, W.biru)),
      tambah("mineral", emo("c4", 260, 100, "🍼", 34), teks("c4t", 260, 122, "1 l", 10, W.biru)),
    ),
    k(
      "Patokan membantu menaksir sebelum mengukur, dan memeriksa apakah hasil hitungan masuk akal.",
      ...daftar("c", "Gunanya patokan", [
        { at: "menaksir", t: "menaksir sebelum mengukur", w: W.hijauMuda, u: 9.6 },
        { at: "memeriksa", t: "memeriksa hasil: masuk akal?", w: W.krem, u: 9.4 },
      ]),
    ),
  ],
};

/* ------------------------------ 9. Benchmark Referents: penerapan ------------------------------ */
export const ADEGAN_LUAR_BR_TERAPAN: AdeganStory = {
  id: "luar-br-terapan",
  judul: "Benchmark Referents diterapkan pada angka buku",
  sumber: "Metode luar: Benchmark Referents, Buku Siswa hlm. 128–132",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Ember menampung sepuluh liter, sama dengan sepuluh botol air mineral. Tong air seratus lima puluh liter sama dengan lima belas ember.",
      bersih(0),
      tambah(0, judul("Ember dan tong")),
      tambah("Ember", ...kartu("e1", 12, 40, 276, 32, W.krem, ["ember 10 l = 10 botol × 1 l"], 10)),
      tambah("Tong", ...kartu("e2", 12, 84, 276, 32, W.hijauMuda, ["tong 150 l ÷ 10 = 15 ember"], 10)),
      tambah("lima@2", emo("e3", 150, 160, "🛢", 30)),
    ),
    k(
      "Kotak susu seribu mililiter sama dengan satu botol air mineral. Empat botol jus berjumlah seribu dua puluh empat mililiter, sedikit di atas satu liter, jadi satu botol jus sekitar seperempat liter.",
      bersih(0),
      tambah(0, judul("Susu dan jus")),
      tambah("Kotak", ...kartu("f1", 12, 40, 276, 30, W.krem, ["susu 1.000 ml = 1 l"], 10.4)),
      tambah("Empat", ...kartu("f2", 12, 80, 276, 30, W.langit, ["4 × 256 = 1.024 ml"], 10.4)),
      tambah("sedikit", ...kartu("f3", 12, 120, 276, 30, W.hijauMuda, ["sedikit di atas 1 l"], 10)),
      tambah("seperempat", ...kartu("f4", 12, 160, 276, 30, W.pink, ["1 botol jus ≈ ¼ l"], 10)),
    ),
    k(
      "Soal tangki: dibulatkan, dua ribu dua ratus kurang seribu kira-kira seribu dua ratus liter. Hasil seribu dua ratus empat puluh sembilan liter dekat dengan itu, jadi masuk akal.",
      bersih(0),
      tambah(0, judul("Taksir hasil tangki")),
      tambah("dibulatkan,", ...kartu("g1", 12, 44, 276, 34, W.krem, ["2.200 − 1.000 ≈ 1.200 l"], 11)),
      tambah("Hasil", ...kartu("g2", 12, 94, 276, 34, W.hijauMuda, ["hasil 1.249 l 675 ml"], 11)),
      tambah("masuk", teks("g3", 150, 156, "dekat taksiran: masuk akal ✔", 10, W.hijau)),
    ),
  ],
};

/* ------------------------------ 10. Ringkasan ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode dan kaitannya dengan buku",
  sumber: "Ringkasan metode luar Sub-Bab B",
  latar: "#F0F9FF",
  ketukan: [
    k(
      "Ringkasan: empat metode untuk volume. Volume as Filling menghitung satuan pengisi, Layer Model menghitung lapisan, Displacement Idea membaca kenaikan air, dan Benchmark Referents memakai patokan benda sehari-hari.",
      ...daftar("r", "Empat metode", [
        { at: "Filling", t: "Volume as Filling: hitung satuan", w: W.hijauMuda, u: 9 },
        { at: "Layer", t: "Layer Model: hitung lapisan", w: W.langit, u: 9.4 },
        { at: "Displacement", t: "Displacement Idea: air naik", w: W.krem, u: 9.4 },
        { at: "Benchmark", t: "Benchmark Referents: patokan", w: W.pink, u: 9.2 },
      ]),
    ),
    k(
      "Semuanya menjaga satu hal: satuan harus sama dan mengisi penuh. Metodenya berbeda, tetapi volume benda tetap sama.",
      bersih(0),
      tambah(0, judul("Satu aturan bersama")),
      tambah("Semuanya", ...kartu("s1", 20, 46, 260, 36, W.krem, ["satuan sama dan mengisi penuh"], 10)),
      tambah("Metodenya", ...kartu("s2", 20, 98, 260, 36, W.hijauMuda, ["metode beda, volume tetap sama"], 10)),
    ),
    k(
      "Pakailah metode luar sebagai alat bantu, tetapi tetap pegang istilah dan satuan di Buku Siswa: mililiter, liter, sentimeter kubik, dan meter kubik.",
      bersih(0),
      tambah(0, judul("Kembali ke buku")),
      tambah("Pakailah", emo("rk", 150, 80, "📖", 44)),
      tambah("satuan", ...kartu("rk1", 20, 100, 260, 32, W.langit, ["satuan di Buku Siswa"], 9.6)),
      tambah("mililiter,", ...kartu("rk2", 20, 142, 260, 32, W.krem, ["ml · l · cm³ · m³"], 11)),
    ),
  ],
};
