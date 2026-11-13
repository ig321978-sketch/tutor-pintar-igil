import type { AdeganStory, Obj } from "./logika-story";
import { W, antara, bangun, bulat, kartu, kartuMetode, kotak, tanda, teks } from "./k5b7b-gambar";
import type { JenisBangun } from "./k5b7b-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah } from "./k5b7b-bantu";

/* ------------------------------ LB5. Property Comparison Matrix: konsep ------------------------------ */
const GX = 14;
const GW0 = 100;
const GW = 56;
const sel = (id: string, x: number, y: number, w: number, h: number, warna: string): Obj => kotak(id, x, y, w, h, warna, W.biru, { rx: 0, tebal: 1 });
const GRID_UMUM: Obj[] = [
  ...[0, 1, 2, 3].flatMap((r) => [0, 1, 2, 3].map((c) => sel(`g${r}${c}`, c === 0 ? GX : GX + GW0 + (c - 1) * GW, r === 0 ? 34 : 34 + 26 + (r - 1) * 26, c === 0 ? GW0 : GW, 26, r === 0 || c === 0 ? W.krem : W.putih))),
];
const LABEL_BARIS = [1, 2, 3].map((r) => teks(`gl${r}`, GX + 6, 34 + 26 + (r - 1) * 26 + 17, `ciri ${r}`, 8.2, W.biru, { anchor: "start" }));
const LABEL_KOLOM = ["X", "Y", "Z"].map((n, c) => teks(`gh${c}`, GX + GW0 + c * GW + GW / 2, 51, `bangun ${n}`, 7.6, W.ungu));
const CENTANG_UMUM = [
  [true, false, true],
  [true, true, true],
  [false, true, true],
];
const tandaUmum = (c: number): Obj[] => CENTANG_UMUM[c].map((ya, i) => tanda(`gt${i + 1}${c + 1}`, GX + GW0 + c * GW + GW / 2, 34 + 26 + i * 26 + 18, ya, 12));

export const ADEGAN_LUAR_MATRIKS: AdeganStory = {
  id: "luarb-matriks",
  judul: "Property Comparison Matrix: tabel perbandingan ciri",
  sumber: "Metode luar; tabel ciri bangun datar dan aturan golongan",
  latar: "#ECFDF5",
  ketukan: [
    k(
      "Property Comparison Matrix adalah tabel perbandingan ciri. Barisnya berisi ciri, kolomnya berisi bangun, dan tanda centang menunjukkan ciri itu dimiliki.",
      tambah(0, teks("jud", 150, 22, "Property Comparison Matrix", 11.5, W.ungu)),
      tambah(4, GRID_UMUM),
      tambah(7, LABEL_BARIS),
      tambah(10, LABEL_KOLOM),
      tambah(14, tandaUmum(0), tandaUmum(1), tandaUmum(2)),
    ),
    k(
      "Membaca ke bawah: satu kolom menunjukkan semua ciri satu bangun. Membaca ke samping: satu baris menunjukkan bangun mana saja yang memiliki ciri itu.",
      sorotkan(4, "g11", "g21", "g31", "g01"),
      redamkan(10, "g11", "g21", "g31", "g01"),
      sorotkan(13, "g10", "g11", "g12", "g13"),
    ),
    k(
      "Aturan pembandingnya: jika semua centang pada kolom bangun X juga ada pada kolom bangun Y, maka bangun Y termasuk golongan bangun X.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Aturan golongan", 12, W.ungu)),
      tambah(3, kartu("r1", 40, 40, 220, 44, W.krem, ["semua centang kolom X", "juga ada di kolom Y"], 9.2)),
      tambah(12, kartu("r2", 40, 120, 220, 36, W.hijauMuda, ["Y termasuk golongan X"], 10)),
      tambah(15, teks("r3", 150, 108, "maka", 11, W.merah)),
    ),
    k(
      "Menghitung centang membantu membandingkan: makin banyak centang, makin khusus bangunnya.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Hitung centang", 12, W.ungu)),
      tambah(1, teks("hx", 100, 62, "bangun X", 8.6, W.biru, { anchor: "end" }), kotak("bx", 108, 48, 80, 20, W.hijauMuda, W.biru, { rx: 3 }), teks("cx", 196, 62, "2 centang", 8.6, W.merah, { anchor: "start" })),
      tambah(4, teks("hz", 100, 96, "bangun Z", 8.6, W.biru, { anchor: "end" }), kotak("bz", 108, 82, 80, 20, W.hijauMuda, W.biru, { rx: 3 }), teks("cz", 196, 96, "2 centang", 8.6, W.merah, { anchor: "start" })),
      tambah(6, teks("hy", 100, 130, "bangun Y", 8.6, W.biru, { anchor: "end" }), kotak("by", 108, 116, 120, 20, W.emas, W.biru, { rx: 3 }), teks("cy", 236, 130, "3 centang", 8.6, W.merah, { anchor: "start" })),
      tambah(8, teks("kh", 150, 168, "makin khusus", 11, W.hijau)),
    ),
  ],
};

/* ------------------------------ LB6. Property Comparison Matrix: empat bangun dan enam ciri ------------------------------ */
const KOLOM: Array<{ b: JenisBangun; ya: boolean[] }> = [
  { b: "jajar", ya: [true, true, false, false, false, false] },
  { b: "persegiPanjang", ya: [true, true, true, false, false, true] },
  { b: "belahKetupat", ya: [true, true, false, true, true, false] },
  { b: "persegi", ya: [true, true, true, true, true, true] },
];
const CIRI = ["sisi berhadapan sejajar", "sisi berhadapan sama panjang", "semua sudut siku-siku", "4 sisi sama panjang", "diagonal tegak lurus", "diagonal sama panjang"];
const CX = (c: number) => 120 + c * 42;
const RY = (r: number) => 56 + r * 18;
const TABEL_DASAR: Obj[] = [
  sel("a-h", 8, 26, 112, 30, W.krem),
  ...KOLOM.map((kol, c) => sel(`a-h${c}`, CX(c), 26, 42, 30, W.krem)),
  ...CIRI.flatMap((_, r) => [sel(`a-${r}-0`, 8, RY(r), 112, 18, W.putih), ...KOLOM.map((__, c) => sel(`a-${r}-${c + 1}`, CX(c), RY(r), 42, 18, W.putih))]),
  sel("a-t", 8, RY(6), 112, 20, W.krem),
  ...KOLOM.map((_, c) => sel(`a-t${c + 1}`, CX(c), RY(6), 42, 20, W.krem)),
];
const KEPALA = KOLOM.map((kol, c) => bangun(`a-b${c}`, kol.b, CX(c) + 21, 41, 7, W.hijauMuda));
const LABEL = CIRI.map((isi, r) => teks(`a-l${r}`, 13, RY(r) + 13, isi, 6.4, W.biru, { anchor: "start" }));
const kolomTanda = (c: number): Obj[] => KOLOM[c].ya.map((ya, r) => tanda(`a-m${r}${c}`, CX(c) + 21, RY(r) + 14, ya, 11));
const jumlah = (c: number): Obj => teks(`a-j${c}`, CX(c) + 21, RY(6) + 15, String(KOLOM[c].ya.filter(Boolean).length), 10.4, W.merah);

export const ADEGAN_LUAR_MATRIKS_TERAPAN: AdeganStory = {
  id: "luarb-matriks-terapan",
  judul: "Mengisi matriks: empat bangun dan enam ciri",
  sumber: "Metode luar; ciri jajargenjang sampai persegi, Buku Siswa hlm. 213–229",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Isi matriks untuk empat bangun dan enam ciri. Jajargenjang hanya memenuhi dua ciri: sisi berhadapan sejajar dan sama panjang.",
      tambah(0, teks("jud", 150, 17, "Matriks empat bangun", 10.4, W.ungu)),
      tambah(3, TABEL_DASAR, KEPALA),
      tambah(6, LABEL),
      tambah(8, kolomTanda(0)),
      tambah(11, jumlah(0), teks("a-tl", 64, RY(6) + 14, "jumlah centang", 7.6, W.biru)),
    ),
    k(
      "Persegi panjang memenuhi 4 ciri, yaitu dua ciri sisi, sudut siku-siku, dan diagonal sama panjang.",
      tambah(0, kolomTanda(1)),
      tambah(3, jumlah(1)),
    ),
    k(
      "Belah ketupat juga memenuhi 4 ciri, tetapi cirinya berbeda: dua ciri sisi, empat sisi sama panjang, dan diagonal tegak lurus.",
      tambah(0, kolomTanda(2)),
      tambah(3, jumlah(2)),
    ),
    k(
      "Persegi memenuhi semua 6 ciri, sehingga kolomnya mencakup kolom persegi panjang dan belah ketupat. Karena itu persegi termasuk keduanya.",
      tambah(0, kolomTanda(3)),
      tambah(3, jumlah(3)),
      sorotkan(9, ...CIRI.map((_, r) => `a-${r}-4`)),
    ),
  ],
};

/* ------------------------------ LB7. Diagonal Property Test: tiga pertanyaan ------------------------------ */
const PERIKSA: Array<{ nama: string; b: JenisBangun; ya: [boolean, boolean, boolean]; sumbu: number }> = [
  { nama: "jajargenjang", b: "jajar", ya: [true, false, false], sumbu: 0 },
  { nama: "persegi panjang", b: "persegiPanjang", ya: [true, true, false], sumbu: 0 },
  { nama: "belah ketupat", b: "belahKetupat", ya: [true, false, true], sumbu: 2 },
  { nama: "persegi", b: "persegi", ya: [true, true, true], sumbu: 2 },
  { nama: "layang-layang", b: "layang", ya: [false, false, true], sumbu: 1 },
];
const DX = [114, 160, 206, 252];
const DY = (r: number) => 56 + r * 24;
const barisDiagonal = (r: number): Obj[] => [
  sel(`d${r}-0`, 14, DY(r), 100, 24, W.putih),
  ...[1, 2, 3].map((c) => sel(`d${r}-${c}`, DX[c - 1], DY(r), 46, 24, W.putih)),
  teks(`d${r}-n`, 20, DY(r) + 16, PERIKSA[r].nama, 8, W.biru, { anchor: "start" }),
  ...PERIKSA[r].ya.map((ya, c) => tanda(`d${r}-y${c}`, DX[c] + 23, DY(r) + 18, ya, 12)),
];
const KEPALA_DIAGONAL: Obj[] = [
  sel("dh-0", 14, 32, 100, 24, W.krem),
  ...["bagi dua", "sama", "tegak"].map((n, c) => sel(`dh-${c + 1}`, DX[c], 32, 46, 24, W.krem)),
  ...["bagi dua", "sama", "tegak"].map((n, c) => teks(`dh-t${c}`, DX[c] + 23, 48, n, 7.6, W.ungu)),
];
const sumbuKolom = (): Obj[] => [
  sel("dh-4", DX[3], 32, 40, 24, W.krem),
  teks("dh-t3", DX[3] + 20, 48, "sumbu", 7.6, W.ungu),
  ...PERIKSA.flatMap((p, r) => [sel(`d${r}-4`, DX[3], DY(r), 40, 24, W.putih), teks(`d${r}-s`, DX[3] + 20, DY(r) + 17, String(p.sumbu), 11, W.merah)]),
];

export const ADEGAN_LUAR_DIAGONAL: AdeganStory = {
  id: "luarb-diagonal",
  judul: "Diagonal Property Test: tiga pertanyaan tentang diagonal",
  sumber: "Metode luar; sifat diagonal enam segi empat",
  latar: "#FFF1F2",
  ketukan: [
    k(
      "Diagonal Property Test menguji bangun lewat diagonalnya dengan tiga pertanyaan: saling membagi dua, sama panjang, dan tegak lurus.",
      tambah(0, teks("jud", 150, 22, "Diagonal Property Test", 12, W.ungu)),
      tambah(3, bangun("q0", "persegiPanjang", 66, 104, 24, W.hijauMuda), antara("q1", "persegiPanjang", 66, 104, 24, "A", "C", W.ungu, 1.6), antara("q2", "persegiPanjang", 66, 104, 24, "B", "D", W.ungu, 1.6), bulat("q3", 66, 104, 2.6, W.merah, undefined)),
      tambah(10, kartu("k1", 140, 40, 150, 30, W.krem, ["saling membagi dua?"], 8.6)),
      tambah(13, kartu("k2", 140, 82, 150, 30, W.krem, ["sama panjang?"], 8.6)),
      tambah(16, kartu("k3", 140, 124, 150, 30, W.krem, ["tegak lurus?"], 8.6)),
    ),
    k(
      "Hasilnya: jajargenjang hanya saling membagi dua. Persegi panjang membagi dua dan sama panjang. Belah ketupat membagi dua dan tegak lurus.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Hasil uji diagonal", 12, W.ungu)),
      tambah(0, KEPALA_DIAGONAL),
      tambah(1, barisDiagonal(0)),
      tambah(6, barisDiagonal(1)),
      tambah(13, barisDiagonal(2)),
    ),
    k(
      "Persegi memenuhi ketiganya. Layang-layang hanya tegak lurus, dan hanya satu diagonalnya yang dibagi dua oleh diagonal lain.",
      tambah(0, barisDiagonal(3)),
      tambah(3, barisDiagonal(4)),
    ),
    k(
      "Satu pertanyaan tambahan: apakah diagonalnya sumbu simetri? Persegi dan belah ketupat ya untuk dua diagonal, layang-layang ya untuk satu diagonal.",
      tambah(4, sumbuKolom()),
      sorotkan(11, "d2-4", "d3-4"),
      sorotkan(18, "d4-4"),
    ),
  ],
};

/* ------------------------------ LB8. Diagonal Property Test: menebak bangun ------------------------------ */
const TEBAK: Array<{ b: JenisBangun; nama: string; ya: [boolean, boolean, boolean]; sumbu: number | null }> = [
  { b: "persegiPanjang", nama: "persegi panjang", ya: [true, true, false], sumbu: null },
  { b: "belahKetupat", nama: "belah ketupat", ya: [true, false, true], sumbu: 2 },
  { b: "persegi", nama: "persegi", ya: [true, true, true], sumbu: 4 },
  { b: "layang", nama: "layang-layang", ya: [false, false, true], sumbu: 1 },
];
const SOAL = ["saling membagi dua", "sama panjang", "tegak lurus"];
const baris = (r: number, ya: boolean): Obj[] => [
  kotak(`s${r}-k`, 12, 34 + r * 30, 150, 24, ya ? W.hijauMuda : W.merahMuda, W.biru, { rx: 5, tebal: 1.2 }),
  teks(`s${r}-t`, 20, 34 + r * 30 + 16, SOAL[r], 8.4, W.biru, { anchor: "start" }),
  tanda(`s${r}-c`, 150, 34 + r * 30 + 18, ya, 12),
];
const sumbuBaris = (n: number): Obj[] => [kotak("s3-k", 12, 124, 150, 24, W.krem, W.biru, { rx: 5, tebal: 1.2 }), teks("s3-t", 20, 140, `${n} sumbu simetri`, 8.4, W.biru, { anchor: "start" })];
const jawaban = (i: number): Obj[] => [bangun("jw", TEBAK[i].b, 232, 92, 24, W.krem), teks("jwn", 232, 142, TEBAK[i].nama, 9, W.hijau)];

export const ADEGAN_LUAR_DIAGONAL_TERAPAN: AdeganStory = {
  id: "luarb-diagonal-terapan",
  judul: "Menebak bangun dari sifat diagonal dan sumbu simetri",
  sumber: "Metode luar; empat bangun misterius, sumbu simetri Buku Siswa hlm. 216–232",
  latar: "#FEF2F2",
  ketukan: [
    k(
      "Tebak bangun pertama: diagonalnya saling membagi dua dan sama panjang, tetapi tidak tegak lurus. Jawabannya persegi panjang.",
      tambah(0, teks("jud", 150, 20, "Tebak bangun 1", 12, W.ungu), teks("tq", 232, 104, "?", 36, W.merah)),
      tambah(4, baris(0, TEBAK[0].ya[0])),
      tambah(8, baris(1, TEBAK[0].ya[1])),
      tambah(12, baris(2, TEBAK[0].ya[2])),
      tambah(15, jawaban(0)),
      hapus(15, "tq"),
    ),
    k(
      "Bangun kedua: diagonalnya saling membagi dua dan tegak lurus, tetapi tidak sama panjang, dan sumbu simetrinya ada 2. Jawabannya belah ketupat.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Tebak bangun 2", 12, W.ungu), teks("tq", 232, 104, "?", 36, W.merah)),
      tambah(3, baris(0, TEBAK[1].ya[0])),
      tambah(7, baris(2, TEBAK[1].ya[2])),
      tambah(11, baris(1, TEBAK[1].ya[1])),
      tambah(16, sumbuBaris(2)),
      tambah(19, jawaban(1)),
      hapus(19, "tq"),
    ),
    k(
      "Bangun ketiga: ketiga pertanyaan dijawab ya, dan sumbu simetrinya ada 4. Jawabannya persegi.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Tebak bangun 3", 12, W.ungu), teks("tq", 232, 104, "?", 36, W.merah)),
      tambah(4, baris(0, true), baris(1, true), baris(2, true)),
      tambah(9, sumbuBaris(4)),
      tambah(11, jawaban(2)),
      hapus(11, "tq"),
    ),
    k(
      "Bangun keempat: hanya tegak lurus yang ya, dan hanya 1 sumbu simetri. Jawabannya layang-layang.",
      bersih(0),
      tambah(0, teks("jud", 150, 20, "Tebak bangun 4", 12, W.ungu), teks("tq", 232, 104, "?", 36, W.merah)),
      tambah(3, baris(0, false), baris(1, false), baris(2, true)),
      tambah(9, sumbuBaris(1)),
      tambah(12, jawaban(3)),
      hapus(12, "tq"),
    ),
  ],
};

/* ------------------------------ LB9. Ringkasan empat metode luar ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luarb-ringkas",
  judul: "Ringkasan empat metode luar untuk segi empat",
  sumber: "Ringkasan; empat metode luar Sub-Bab B",
  latar: "#EEF2FF",
  ketukan: [
    k(
      "Ringkasan empat metode luar untuk segi empat. Inclusive Trapezoid Definition: hitung pasangan sisi sejajar, satu pasang atau lebih berarti trapesium.",
      tambah(0, teks("jud", 150, 20, "Ringkasan", 13, W.ungu)),
      tambah(7, kartuMetode("r1", 10, 30, "#FDE68A", ["Inclusive Trapezoid", "Definition"], "hitung pasangan sejajar")),
    ),
    k(
      "Inclusive Quadrilateral Hierarchy: bangun khusus memiliki semua ciri bangun umum ditambah ciri baru. Property Comparison Matrix: tabel ciri, kolom yang tercakup berarti bangunnya termasuk golongan itu.",
      tambah(0, kartuMetode("r2", 156, 30, "#FBCFE8", ["Inclusive Quadrilateral", "Hierarchy (Van Hiele)"], "turun: tambah ciri")),
      tambah(13, kartuMetode("r3", 10, 112, "#BBF7D0", ["Property Comparison", "Matrix"], "kolom tercakup = termasuk")),
    ),
    k(
      "Diagonal Property Test: tanyakan tiga hal tentang diagonal dan sumbu simetri. Pakai keempat metode ini untuk memeriksa apakah suatu bangun termasuk golongan bangun lain.",
      tambah(0, kartuMetode("r4", 156, 112, "#BFDBFE", ["Diagonal Property", "Test"], "tiga tanya diagonal")),
    ),
    k(
      "Ingat, metode ini melengkapi isi buku. Tetap periksa ciri satu per satu sebelum menyimpulkan.",
      tambah(0, teks("rk", 150, 196, "melengkapi isi buku", 10.4, W.hijau)),
      sorotkan(5, "r1-k", "r2-k", "r3-k", "r4-k"),
    ),
  ],
};
