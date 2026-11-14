import type { AdeganStory, Obj } from "./logika-story";
import { BK, KITE, W, bangunBerpetak, kartu, kisi, panah, poli, teks, type Pt } from "./k5b5b-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k5b5b-bantu";

const ket = (id: string, y: number, isi: string, warna: string = W.biru, x = 150): Obj => teks(id, x, y, isi, 8.8, warna, { anchor: "start" });
const kotakPoli = (w: number, h: number): Pt[] => [[0, 0], [w, 0], [w, h], [0, h]];

/** Satu baris tabel: kotak pembatas, nama di kiri, rumus di tengah. */
const baris = (id: string, y: number, nama: string, rumus: string, warna: string = W.biru, xr = 118): Obj[] => [
  { id: `${id}-k`, t: "kotak", x: 8, y: y - 12, w: 284, h: 18, warna: W.putih, garis: W.abu, rx: 4, tebal: 1 },
  teks(`${id}n`, 16, y, nama, 8.8, W.ungu, { anchor: "start" }),
  teks(`${id}f`, xr, y, rumus, 8.8, warna, { anchor: "start" }),
];

/* ------------------------------ LB5. Base x Height Unification: konsep ------------------------------ */
export const ADEGAN_LUAR_BXH: AdeganStory = {
  id: "luarb-bxh",
  judul: "Base×Height Unification: satu bentuk untuk semua rumus",
  sumber: "Metode luar; alas efektif kali tinggi efektif",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Base Height Unification memandang semua rumus luas sebagai satu bentuk. Luas sama dengan alas efektif kali tinggi efektif.",
      tambah(0, teks("jud", 150, 24, "Base x Height Unification", 12.5, W.ungu)),
      tambah("Luas", ...kartu("bu", 14, 54, 272, 50, W.krem, ["Luas = alas efektif x tinggi efektif"], 13)),
      tambah("efektif", teks("bue", 150, 140, "efektif = sudah disesuaikan", 10, W.hijau), teks("bue2", 150, 160, "agar menjadi persegi panjang", 10, W.hijau)),
    ),
    k(
      "Pada persegi panjang, alas efektifnya panjang dan tinggi efektifnya lebar. Persegi sama saja, dengan sisi. Pada jajargenjang, alas dan tingginya apa adanya.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Efektifnya tiap bangun", 12.5, W.ungu)),
      tambah("persegi", baris("b1", 52, "persegi panjang", "panjang x lebar")),
      tambah("Persegi@2", baris("b2", 76, "persegi", "sisi x sisi")),
      tambah("jajargenjang,", baris("b3", 100, "jajargenjang", "alas x tinggi")),
    ),
    k(
      "Pada segitiga, alasnya apa adanya, tetapi tinggi efektifnya separuh tinggi. Pada trapesium, alas efektifnya jumlah dua sisi sejajar, dan tinggi efektifnya separuh tinggi.",
      tambah("segitiga,", baris("b4", 124, "segitiga", "alas x separuh tinggi", W.hijau)),
      tambah("trapesium,", baris("b5", 148, "trapesium", "jumlah sisi sejajar x 1/2 tinggi", W.hijau)),
    ),
    k(
      "Pada belah ketupat dan layang-layang, alas efektifnya diagonal pertama, dan tinggi efektifnya separuh diagonal kedua. Jadi semua rumus bermuara pada alas kali tinggi.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Dua bangun terakhir", 12.5, W.ungu)),
      tambah("belah", baris("b6", 56, "belah ketupat", "diagonal 1 x separuh diagonal 2", W.hijau)),
      tambah("layang-layang,", baris("b7", 82, "layang-layang", "diagonal 1 x separuh diagonal 2", W.hijau)),
      tambah("bermuara", ...kartu("b8", 40, 112, 220, 50, W.hijauMuda, ["semua rumus bermuara pada", "alas x tinggi"], 10.4)),
    ),
  ],
};

/* ------------------------------ LB6. Base x Height Unification: penerapan ------------------------------ */
const TABEL: Array<[string, string, string]> = [
  ["persegi panjang", "5 x 2 = 10", ""],
  ["jajargenjang", "4 x 2 = 8", ""],
  ["segitiga", "5 x 2 = 10", "4 : 2 = 2"],
  ["trapesium", "7 x 1 = 7", "5 + 2 = 7 ; 2 : 2 = 1"],
  ["belah ketupat", "2 x 2 = 4", "4 : 2 = 2"],
  ["layang-layang", "5 x 2 = 10", "4 : 2 = 2"],
];
const barisHasil = (i: number): Obj[] => {
  const y = 50 + i * 22;
  const [n, f, c] = TABEL[i];
  return [
    { id: `bt${i}-k`, t: "kotak", x: 8, y: y - 12, w: 284, h: 18, warna: W.putih, garis: W.abu, rx: 4, tebal: 1 },
    teks(`bt${i}n`, 16, y, n, 8.8, W.ungu, { anchor: "start" }),
    teks(`bt${i}f`, 108, y, f, 9.4, W.biru, { anchor: "start" }),
    ...(c ? [teks(`bt${i}c`, 184, y, c, 7.4, W.hijau, { anchor: "start" })] : []),
  ];
};

export const ADEGAN_LUAR_BXH_TERAPAN: AdeganStory = {
  id: "luarb-bxh-terapan",
  judul: "Base×Height Unification: enam luas dari angka buku",
  sumber: "Metode luar; penerapan pada angka Eksplorasi 5.2A sampai 5.2G",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Isi dengan angka buku. Persegi panjang B: 5 kali 2 menghasilkan 10. Jajargenjang: alas 4, tinggi 2, menghasilkan 8.",
      tambah(0, teks("jud", 150, 24, "Alas efektif x tinggi efektif", 12.5, W.ungu)),
      tambah("Persegi", barisHasil(0)),
      tambah("Jajargenjang:", barisHasil(1)),
    ),
    k(
      "Segitiga: alas 5, tinggi 4, jadi tinggi efektif 2, luas 10. Trapesium: alas efektif 7, tinggi efektif 1, luas 7.",
      tambah("Segitiga:", barisHasil(2)),
      tambah("Trapesium:", barisHasil(3)),
    ),
    k(
      "Belah ketupat diagonal 2 dan 4: alas efektif 2, tinggi efektif 2, luas 4. Layang-layang diagonal 5 dan 4: alas efektif 5, tinggi efektif 2, luas 10.",
      tambah("Belah", barisHasil(4)),
      tambah("Layang-layang", barisHasil(5)),
    ),
    k(
      "Semua baris berbentuk alas kali tinggi. Luas terbesar 10 dicapai tiga bangun: persegi panjang, segitiga, dan layang-layang. Luas terkecil 4 milik belah ketupat.",
      sorotkan("terbesar", "bt0f", "bt2f", "bt5f"),
      sorotkan("terkecil", "bt4f"),
      tambah("Semua", teks("bts", 150, 196, "luas 10 tiga kali, luas 4 sekali", 9, W.merah)),
    ),
  ],
};

/* ------------------------------ LB7. Rectangle Enclosure Halving: konsep ------------------------------ */
const XC = 40;
const YC = 60;
const KITE_SUDUT: Pt[][] = [
  [[0, 0], [2, 0], [0, 2]],
  [[2, 0], [5, 0], [5, 2]],
  [[0, 2], [0, 4], [2, 4]],
  [[2, 4], [5, 4], [5, 2]],
];

export const ADEGAN_LUAR_REH: AdeganStory = {
  id: "luarb-reh",
  judul: "Rectangle Enclosure Halving: bungkus lalu ambil separuh",
  sumber: "Metode luar baru; persegi panjang pembungkus",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Rectangle Enclosure Halving membungkus sebuah bangun dengan persegi panjang yang pas menyentuh bagian terluarnya. Lalu kita bandingkan bangun itu dengan persegi panjang pembungkusnya.",
      tambah(0, teks("jud", 150, 22, "Rectangle Enclosure Halving", 12.5, W.ungu)),
      tambah("sebuah", ...bangunBerpetak("ec", XC, YC, 5, 4, KITE.asal, W.merahMuda)),
      tambah("pas", poli("ec-box", XC, YC, kotakPoli(5, 4), "none", W.biru, { tebal: 2.8 }), ket("eck1", 100, "persegi panjang pembungkus", W.biru, 156)),
      tambah("bandingkan", ket("eck2", 124, "bangun di dalamnya", W.merah, 156)),
    ),
    k(
      "Untuk segitiga, belah ketupat, dan layang-layang, bangunnya tepat separuh persegi panjang pembungkus. Bagian di luar bangun terdiri dari potongan yang jumlah luasnya sama dengan bagian di dalam.",
      hapus(0, "eck1", "eck2"),
      tambah("luar", ...KITE_SUDUT.map((p, i) => poli(`ec-c${i + 1}`, XC, YC, p, W.abu, W.biru, { tebal: 1.2 }))),
      tambah("sama", ket("eck3", 96, "luas luar", W.ungu, 156), ket("eck4", 114, "= luas dalam", W.hijau, 156)),
    ),
    k(
      "Jadi luas bangun sama dengan separuh dari panjang kali lebar persegi panjang pembungkus. Untuk belah ketupat dan layang-layang, panjang pembungkus sama dengan diagonal 1 dan lebarnya sama dengan diagonal 2.",
      hapus(0, "eck3", "eck4"),
      tambah("Jadi", ket("eck5", 88, "luas = 1/2 x panjang x lebar", W.biru, 156)),
      tambah("panjang@3", ket("eck6", 112, "panjang = diagonal 1", W.merah, 156)),
      tambah("lebarnya", ket("eck7", 132, "lebar = diagonal 2", W.hijau, 156)),
    ),
    k(
      "Langkahnya: bungkus bangun, hitung luas persegi panjang pembungkus, lalu bagi dua. Syaratnya, titik-titik terluar bangun menyentuh sisi pembungkus, seperti puncak segitiga atau ujung diagonal.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Langkah dan syarat", 12.5, W.ungu)),
      tambah("bungkus", ...kartu("es1", 14, 38, 272, 30, W.hijauMuda, ["1. bungkus bangun dengan persegi panjang"], 8.8)),
      tambah("hitung", ...kartu("es2", 14, 76, 272, 30, W.krem, ["2. hitung luas pembungkusnya"], 8.8)),
      tambah("bagi", ...kartu("es3", 14, 114, 272, 30, W.muda, ["3. bagi dua"], 8.8)),
      tambah("Syaratnya,", ...kartu("es4", 14, 152, 272, 36, W.merahMuda, ["syarat: titik terluar menyentuh sisi pembungkus", "(puncak segitiga, ujung diagonal)"], 8.4)),
    ),
  ],
};

/* ------------------------------ LB8. Rectangle Enclosure Halving: penerapan ------------------------------ */
const SEG_PQR: Pt[] = [[0, 4], [5, 4], [2, 0]];

export const ADEGAN_LUAR_REH_TERAPAN: AdeganStory = {
  id: "luarb-reh-terapan",
  judul: "Rectangle Enclosure Halving: segitiga, belah ketupat, layang-layang",
  sumber: "Metode luar baru; penerapan pada angka Eksplorasi 5.2C, 5.2F, 5.2G",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Segitiga PQR alas 5, tinggi 4. Persegi panjang pembungkusnya 5 kali 4 sama dengan 20 satuan luas. Separuhnya 10 satuan luas.",
      tambah(0, teks("jud", 150, 22, "Segitiga PQR", 12.5, W.ungu)),
      tambah("Segitiga", poli("re1-bg", XC, YC, SEG_PQR, W.langitMuda), kisi("re1-g", XC, YC, 5, 4), poli("re1-box", XC, YC, kotakPoli(5, 4), "none", W.biru, { tebal: 2.8 })),
      tambah("pembungkusnya", ket("re1a", 100, "5 x 4 = 20", W.biru, 160)),
      tambah("Separuhnya", ket("re1b", 124, "20 : 2 = 10", W.hijau, 160)),
    ),
    k(
      "Belah ketupat diagonal 2 dan 4. Pembungkusnya 2 kali 4 sama dengan 8. Separuhnya 4 satuan luas, cocok dengan hasil potong dan pindah.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Belah ketupat", 12.5, W.ungu)),
      tambah("Belah", poli("re2-bg", XC + 20, YC, BK.asal, W.hijauMuda), kisi("re2-g", XC + 20, YC, 2, 4), poli("re2-box", XC + 20, YC, kotakPoli(2, 4), "none", W.biru, { tebal: 2.8 })),
      tambah("Pembungkusnya", ket("re2a", 100, "2 x 4 = 8", W.biru, 160)),
      tambah("Separuhnya", ket("re2b", 124, "8 : 2 = 4", W.hijau, 160)),
    ),
    k(
      "Layang-layang diagonal 5 dan 4. Pembungkusnya 5 kali 4 sama dengan 20. Separuhnya 10 satuan luas.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Layang-layang", 12.5, W.ungu)),
      tambah("Layang-layang", poli("re3-bg", XC, YC, KITE.asal, W.merahMuda), kisi("re3-g", XC, YC, 5, 4), poli("re3-box", XC, YC, kotakPoli(5, 4), "none", W.biru, { tebal: 2.8 })),
      tambah("Pembungkusnya", ket("re3a", 100, "5 x 4 = 20", W.biru, 160)),
      tambah("Separuhnya", ket("re3b", 124, "20 : 2 = 10", W.hijau, 160)),
    ),
    k(
      "Empat pojok di luar layang-layang luasnya 2, 3, 2, dan 3. Pasangannya berjumlah 5, dan dua pasang berjumlah 10, sama dengan luas layang-layang.",
      tambah("Empat", ...KITE_SUDUT.map((p, i) => poli(`re3-c${i + 1}`, XC, YC, p, W.abu, W.biru, { tebal: 1.2 }))),
      tambah("luasnya", teks("re3l1", XC + 13, YC + 17, "2", 9.4, W.biru), teks("re3l2", XC + 80, YC + 17, "3", 9.4, W.biru), teks("re3l3", XC + 13, YC + 71, "2", 9.4, W.biru), teks("re3l4", XC + 80, YC + 71, "3", 9.4, W.biru)),
      tambah("Pasangannya", ket("re3c", 150, "2 + 3 = 5", W.ungu, 160)),
      tambah("sama", ket("re3d", 172, "5 + 5 = 10", W.hijau, 160)),
    ),
    k(
      "Tiga bangun, tiga hasil: 10, 4, dan 10. Hasilnya sama dengan rumus setengah kali diagonal pertama kali diagonal kedua. Metode ini menemukan rumus itu dari gambar saja.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Tiga bangun, tiga hasil", 12.5, W.ungu)),
      tambah("10,", ...kartu("rz1", 14, 40, 272, 40, W.langitMuda, ["segitiga PQR: luas 10"], 10)),
      tambah("4,", ...kartu("rz2", 14, 90, 272, 40, W.hijauMuda, ["belah ketupat: luas 4"], 10)),
      tambah("10@2", ...kartu("rz3", 14, 140, 272, 40, W.merahMuda, ["layang-layang: luas 10"], 10)),
    ),
  ],
};

/* ------------------------------ LB9. Ringkasan empat metode luar ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luarb-ringkas",
  judul: "Ringkasan empat metode luar",
  sumber: "Ringkasan metode luar; empat cara dan hasilnya",
  latar: "#EEF2FF",
  ketukan: [
    k(
      "Ringkasan. Dissection Method: potong dan susun ulang, luas tetap. Shear Principle: geser sejajar alas, alas dan tinggi tetap.",
      tambah(0, teks("jud", 150, 22, "Ringkasan metode luar", 12.5, W.ungu)),
      tambah("Dissection", ...kartu("g1", 14, 40, 272, 56, "#FDE68A", ["Dissection Method", "potong, susun ulang, luas tetap"], 10)),
      tambah("Shear", ...kartu("g2", 14, 108, 272, 56, "#FBCFE8", ["Shear Principle", "geser sejajar alas"], 10)),
    ),
    k(
      "Base Height Unification: semua rumus luas berbentuk alas efektif kali tinggi efektif. Rectangle Enclosure Halving: bungkus dengan persegi panjang lalu ambil separuhnya.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Dua metode lainnya", 12.5, W.ungu)),
      tambah("Base", ...kartu("g3", 14, 40, 272, 56, "#BBF7D0", ["Base x Height Unification", "alas efektif x tinggi efektif"], 10)),
      tambah("Rectangle", ...kartu("g4", 14, 108, 272, 56, "#BFDBFE", ["Rectangle Enclosure Halving", "bungkus, lalu ambil separuh"], 10)),
    ),
    k(
      "Keempat metode memberi jawaban sama untuk bangun yang sama: segitiga 10, jajargenjang 8, trapesium 7, belah ketupat 4, layang-layang 10. Pilih cara yang paling cocok dengan gambarnya.",
      bersih(0),
      tambah(0, teks("jud", 150, 22, "Jawabannya sama", 12.5, W.ungu)),
      tambah("segitiga", ...baris("z1", 52, "segitiga", "luas 10", W.hijau, 150)),
      tambah("jajargenjang", ...baris("z2", 76, "jajargenjang", "luas 8", W.hijau, 150)),
      tambah("trapesium", ...baris("z3", 100, "trapesium", "luas 7", W.hijau, 150)),
      tambah("belah", ...baris("z4", 124, "belah ketupat", "luas 4", W.hijau, 150)),
      tambah("layang-layang,", ...baris("z5", 148, "layang-layang", "luas 10", W.hijau, 150)),
      tambah("Pilih", panah("z6", 150, 190, 0, -10, W.ungu, 2)),
    ),
  ],
};
