import type { AdeganStory, Obj } from "./logika-story";
import type { Pt } from "./k5b6d-gambar";
import { ARAH_JALAN, W, baris, busurSudut, emo, garis, jam, juring, kartu, kotak, panah, persimpangan, pola1, pola2, poligon, rasiBiduk, teks, titikSegiLima, ujung } from "./k5b6d-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k5b6d-bantu";

const jud = (isi: string, y = 20, u = 12): Obj => teks("jud", 150, y, isi, u, W.ungu);

/* ------------------------------ 9. Refleksi nomor 6 (hlm. 187; Panduan Guru hlm. 275) ------------------------------ */
const PERNYATAAN = [
  "Aku dapat menemukan sudut siku-siku",
  "Aku dapat memahami bagian-bagian sudut",
  "Aku dapat menyebutkan jenis-jenis sudut",
  "Aku dapat mengukur sudut dengan busur",
  "Aku dapat membandingkan besar sudut",
  "Aku dapat melukis sudut dengan busur",
];
const barisRefleksi = (i: number, warna: string = W.putih): Obj[] => [
  kotak(`rf${i}-k`, 14, 44 + i * 26, 272, 22, warna, W.biru, { rx: 5, tebal: 1.2 }),
  teks(`rf${i}-n`, 25, 59 + i * 26, String(i + 1), 9, W.ungu),
  teks(`rf${i}-t`, 38, 58.5 + i * 26, PERNYATAAN[i], 7.8, W.biru, { anchor: "start" }),
  kotak(`rf${i}-y`, 237, 47 + i * 26, 16, 16, W.putih, W.hijau, { rx: 3, tebal: 1 }),
  kotak(`rf${i}-s`, 263, 47 + i * 26, 16, 16, W.putih, W.merah, { rx: 3, tebal: 1 }),
];

export const ADEGAN_REFLEKSI_D: AdeganStory = {
  id: "refleksi-d",
  judul: "Refleksi: pernyataan nomor 6 melukis sudut",
  sumber: "Buku Siswa hlm. 187; Buku Panduan Guru hlm. 275",
  latar: "#FDF2F8",
  kutipan: ["Setelah mempelajari materi terkait sudut, isilah tabel berikut", "sesuai dengan pemahaman kalian", "Berilah tanda centang", "Aku dapat menemukan sudut siku-siku di lingkungan sekitarku", "Aku dapat memahami bagian-bagian sudut", "Aku dapat menyebutkan jenis-jenis sudut", "Aku dapat mengukur besar sudut dengan menggunakan busur derajat", "Aku dapat membandingkan besar sudut", "Aku dapat melukis sudut dengan ukuran", "tertentu menggunakan busur derajat", "Tutup pembelajaran pada topik terkait materi melukis sudut"],
  ketukan: [
    k(
      "Saatnya refleksi. Setelah mempelajari materi sudut, isilah tabel dengan tanda centang pada kolom Ya atau Tidak sesuai pemahamanmu.",
      tambah(0, jud("Refleksi")),
      tambah("Ya", teks("ya", 245, 38, "Ya", 8.4, W.hijau), teks("tdk", 271, 38, "Tidak", 8.4, W.merah)),
      tambah("tabel", PERNYATAAN.flatMap((_, i) => barisRefleksi(i))),
    ),
    k(
      "Pernyataan 1 sampai 3: menemukan sudut siku-siku di sekitar, memahami bagian-bagian sudut, dan menyebutkan jenis-jenis sudut.",
      ubah(1, { id: "rf0-k", warna: W.hijauMuda }),
      ubah("sampai", { id: "rf1-k", warna: W.hijauMuda }),
      ubah("3:", { id: "rf2-k", warna: W.hijauMuda }),
    ),
    k(
      "Pernyataan 4 dan 5: mengukur besar sudut dengan busur derajat dan membandingkan besar sudut.",
      ubah("4", { id: "rf3-k", warna: W.krem }),
      ubah("5:", { id: "rf4-k", warna: W.krem }),
    ),
    k(
      "Pernyataan 6 khusus Sub-Bab D: aku dapat melukis sudut dengan ukuran tertentu menggunakan busur derajat. Tutup pembelajaran dengan menjawab nomor ini.",
      ubah("6", { id: "rf5-k", warna: W.merahMuda }),
      tambah("Tutup", emo("rfe", 262, 26, "🌟", 16)),
    ),
  ],
};

/* ------------------------------ 10. Uji Kompetensi 1: sudut pada jam (hlm. 188; Panduan Guru hlm. 276) ------------------------------ */
export const JAM_UJI: Array<{ j: number; m: number; sudut: number }> = [
  { j: 11, m: 0, sudut: 30 },
  { j: 8, m: 0, sudut: 120 },
  { j: 6, m: 0, sudut: 180 },
];
const norm = (d: number): number => ((d % 360) + 360) % 360;
const mat = (j: number, m: number): [number, number] => [norm(90 - (j % 12) * 30 - m * 0.5), norm(90 - m * 6)];
const jamBesar = (j: number, m: number, sudutKunci: number): Obj[] => {
  const [pj, pm] = mat(j, m);
  const lo = Math.min(pj, pm);
  const hi = Math.max(pj, pm);
  const [x, y] = ujung(95, 118, (pj + pm) / 2, 26);
  return [
    ...jam("jb", 95, 118, 66, j, m),
    busurSudut("ja", 95, 118, lo, hi, 22, W.ungu, 2),
    teks("jL", x, y + 3, `${sudutKunci}°`, 10, W.ungu),
    teks("jw", 95, 196, `pukul ${String(j).padStart(2, "0")}.00`, 9, W.biru),
  ];
};

export const ADEGAN_UJI_JAM: AdeganStory = {
  id: "uji-jam",
  judul: "Uji Kompetensi 1: sudut terkecil jarum jam",
  sumber: "Buku Siswa hlm. 188; Buku Panduan Guru hlm. 276, 279",
  latar: "#FFFBEB",
  kutipan: ["Uji Kompetensi", "Sudut terkecil yang dibentuk oleh jarum pendek dan jarum panjang pada pukul 11.00", "pada pukul 08.00", "pada pukul 06.00", "Sudut manakah yang paling besar dan berapa ukurannya", "Pengunjung Perpustakaan", "Sudut pada jam", "adalah 30", "adalah 120", "adalah 180", "Sudut yang paling besar adalah sudut yang dibentuk oleh jarum pendek"],
  ketukan: [
    k(
      "Uji Kompetensi 1. Hitung sudut terkecil antara jarum pendek dan jarum panjang pada pukul sebelas, delapan, dan enam. Mana yang terbesar, dan berapa ukurannya?",
      tambah(0, jud("Uji Kompetensi 1")),
      tambah("sebelas,", jam("c1", 50, 104, 36, 11, 0), teks("c1t", 50, 154, "11.00", 8.6)),
      tambah("delapan,", jam("c2", 150, 104, 36, 8, 0), teks("c2t", 150, 154, "08.00", 8.6)),
      tambah("enam.", jam("c3", 250, 104, 36, 6, 0), teks("c3t", 250, 154, "06.00", 8.6)),
      tambah("Mana", teks("c4", 150, 186, "yang paling besar?", 9.6, W.merah)),
    ),
    k(
      "Pukul sebelas: jarum panjang di angka 12, jarum pendek di angka 11. Satu selang berjarak 30 derajat, jadi sudutnya 30 derajat.",
      bersih(0),
      tambah(0, jud("Pukul 11.00")),
      tambah("sebelas:", jamBesar(11, 0, 30)),
      tambah("Satu", teks("h1", 232, 80, "1 x 30 = 30", 10, W.merah), teks("h2", 232, 98, "1 selang = 30°", 8.2, W.ungu)),
    ),
    k(
      "Pukul delapan: jarum pendek menunjuk angka 8 dan jarum panjang angka 12. Dari 8 ke 12 ada empat selang, jadi 4 kali 30 sama dengan 120 derajat.",
      bersih(0),
      tambah(0, jud("Pukul 08.00")),
      tambah("delapan:", jamBesar(8, 0, 120)),
      tambah("empat", teks("h1", 232, 80, "4 x 30 = 120", 10, W.merah), teks("h2", 232, 98, "4 selang", 8.2, W.ungu)),
    ),
    k(
      "Pukul enam: kedua jarum lurus berlawanan dan membentuk garis lurus. Ada enam selang, jadi 6 kali 30 sama dengan 180 derajat.",
      bersih(0),
      tambah(0, jud("Pukul 06.00")),
      tambah("enam:", jamBesar(6, 0, 180)),
      tambah("enam@2", teks("h1", 232, 80, "6 x 30 = 180", 10, W.merah), teks("h2", 232, 98, "6 selang", 8.2, W.ungu)),
    ),
    k(
      "Jadi sudut terkecil pukul sebelas 30 derajat, pukul delapan 120 derajat, dan pukul enam 180 derajat. Yang terbesar adalah pukul enam, yaitu 180 derajat.",
      bersih(0),
      tambah(0, jud("Mana yang terbesar?")),
      tambah("sebelas", baris("b1", 20, 44, 260, "11.00", W.putih, 8.6, 24), garis("bb1", 70, 56, 30 * 1.1, 0, W.hijau, 6), teks("bn1", 76 + 30 * 1.1, 59.5, "30°", 9, W.hijau, { anchor: "start" })),
      tambah("delapan", baris("b2", 20, 78, 260, "08.00", W.putih, 8.6, 24), garis("bb2", 70, 90, 120 * 1.1, 0, W.ungu, 6), teks("bn2", 76 + 120 * 1.1, 93.5, "120°", 9, W.ungu, { anchor: "start" })),
      tambah("enam", baris("b3", 20, 112, 260, "06.00", W.putih, 8.6, 24), garis("bb3", 70, 124, 180 * 1.1, 0, W.merah, 6), teks("bn3", 76 + 180 * 1.1, 127.5, "180°", 9, W.merah, { anchor: "start" })),
      tambah("terbesar", teks("jr", 150, 166, "30 < 120 < 180", 11, W.biru), teks("jt", 150, 190, "terbesar: pukul 06.00, yaitu 180°", 9.4, W.merah)),
    ),
    k(
      "Dua jarum selalu membentuk dua sudut yang jumlahnya satu putaran penuh, 360 derajat. Misalnya pukul delapan: 120 ditambah 240 sama dengan 360, dan kita memilih yang terkecil.",
      bersih(0),
      tambah(0, jud("Dua sudut, pilih yang terkecil")),
      tambah("Dua", ...[jam("e", 90, 112, 56, 8, 0)]),
      tambah("360", teks("e1", 232, 70, "satu putaran 360°", 8.6, W.biru), teks("e2", 232, 96, "120 + 240 = 360", 9.6, W.merah)),
      tambah("terkecil.", teks("e3", 232, 124, "dipilih: 120°", 9.4, W.hijau)),
    ),
  ],
};

/* ------------------------------ 11 dan 12. Uji Kompetensi 2: persimpangan jalan (hlm. 188–189; Panduan Guru hlm. 276–277) ------------------------------ */
const JX = 95;
const JY = 110;
const JP = 66;
const NAMA: Record<string, string> = { jl: "Jalak", nr: "Nuri", bg: "Bangau", kt: "Ketilang" };
const POSNAMA: Record<string, [number, number]> = { jl: [24, 70], nr: [154, 60], bg: [152, 168], kt: [112, 192] };
const jalanDasar = (): Obj[] => [
  ...persimpangan("j", JX, JY, JP, { z: 1 }),
  ...Object.keys(NAMA).map((j) => teks(`jn${j}`, POSNAMA[j][0], POSNAMA[j][1], NAMA[j], 7.8, W.biru)),
];
/** Empat sudut persimpangan: besar menurut kunci Buku Panduan Guru hlm. 276–277 dan arah dua ruas jalan yang mengapitnya. */
export const SUDUT_JALAN = [
  { id: "sa0", dari: "nr", ke: "jl", kunci: 110, label: [92, 80] as [number, number], r: 18 },
  { id: "sa1", dari: "bg", ke: "nr", kunci: 90, label: [125, 113] as [number, number], r: 18 },
  { id: "sa2", dari: "kt", ke: "bg", kunci: 25, label: [142, 180] as [number, number], r: 24 },
  { id: "sa3", dari: "jl", ke: "kt", kunci: 130, label: [66, 134] as [number, number], r: 18 },
];
const arahJ = (j: string): number => (ARAH_JALAN as Record<string, number>)[j];
const busurJ = (s: (typeof SUDUT_JALAN)[number], warna: string = W.merah): Obj => {
  const a = arahJ(s.dari);
  let b = arahJ(s.ke);
  if (b < a) b += 360;
  return busurSudut(`${s.id}a`, JX, JY, a, b, s.r, warna, 1.6, { z: 6 });
};
const labelJ = (s: (typeof SUDUT_JALAN)[number], warna: string = W.merah): Obj => teks(`${s.id}L`, s.label[0], s.label[1], `${s.kunci}°`, 8.4, warna, { z: 8 });
const panelKanan = (id: string, y: number, isi: string, warna: string = W.krem): Obj[] => baris(id, 168, y, 126, isi, warna, 7.2, 22);

export const ADEGAN_UJI_JALAN_AB: AdeganStory = {
  id: "uji-jalan-ab",
  judul: "Uji Kompetensi 2a dan 2b: persimpangan jalan",
  sumber: "Buku Siswa hlm. 188–189; Buku Panduan Guru hlm. 276–277",
  latar: "#F1F5F9",
  kutipan: ["Persimpangan Jalan", "Gambar di atas menunjukkan gambar suatu ruas jalan yang dilihat dari atas", "nyatakan pernyataan berikut benar atau salah", "Sudut antara Jalan Jalak dan Jalan Nuri adalah yang paling besar", "Tidak ada sudut siku-siku yang terbentuk di antara ruas-ruas jalan pada gambar tersebut", "Besar sudut antara Jalan Jalak dan Jalan Ketilang adalah", "Tentukan jenis dari setiap sudut berikut dengan memberi tanda centang", "Ukuran sudut antara Jalan Jalak dan Jalan Nuri adalah 110", "Sudut yang paling besar adalah sudut antara Jalan Jalak dan Jalan Ketilang", "Sudut antara Jalan Nuri dan Jalan Bangau adalah 90"],
  ketukan: [
    k(
      "Nomor 2, persimpangan jalan: empat ruas jalan bertemu, dilihat dari atas. Namanya Jalak, Nuri, Bangau, dan Ketilang.",
      tambah(0, jud("Uji Kompetensi 2", 20, 11)),
      tambah("empat", persimpangan("j", JX, JY, JP, { z: 1 })),
      tambah("Jalak,", teks("jnjl", POSNAMA.jl[0], POSNAMA.jl[1], "Jalak", 7.8)),
      tambah("Nuri,", teks("jnnr", POSNAMA.nr[0], POSNAMA.nr[1], "Nuri", 7.8)),
      tambah("Bangau,", teks("jnbg", POSNAMA.bg[0], POSNAMA.bg[1], "Bangau", 7.8)),
      tambah("Ketilang.", teks("jnkt", POSNAMA.kt[0], POSNAMA.kt[1], "Ketilang", 7.8)),
    ),
    k(
      "Panduan Guru memberi ukurannya: Jalak dan Nuri 110 derajat, Nuri dan Bangau 90, Bangau dan Ketilang 25, Ketilang dan Jalak 130 derajat.",
      tambah("110", busurJ(SUDUT_JALAN[0]), labelJ(SUDUT_JALAN[0])),
      tambah("90", busurJ(SUDUT_JALAN[1]), labelJ(SUDUT_JALAN[1])),
      tambah("25", busurJ(SUDUT_JALAN[2]), labelJ(SUDUT_JALAN[2])),
      tambah("130", busurJ(SUDUT_JALAN[3]), labelJ(SUDUT_JALAN[3])),
    ),
    k(
      "Bagian a, pernyataan pertama: sudut Jalak dan Nuri paling besar. Salah, karena sudutnya 110 derajat, sedangkan yang terbesar adalah Jalak dan Ketilang, 130 derajat.",
      tambah("pertama:", panelKanan("pn1", 40, "i. Jalak-Nuri terbesar")),
      tambah("Salah,", teks("pn1x", 280, 55, "✗", 12, W.merah)),
      tambah("sedangkan", teks("pn1c", 232, 76, "110 < 130", 9.6, W.merah)),
      ubah("sedangkan", { id: "sa3a", warna: W.hijau, tebal: 2.4 }, { id: "sa0a", warna: W.hijau, tebal: 2.4 }),
    ),
    k(
      "Pernyataan kedua: tidak ada sudut siku-siku. Salah, karena sudut Nuri dan Bangau tepat 90 derajat, yaitu sudut siku-siku.",
      tambah("kedua:", panelKanan("pn2", 98, "ii. tidak ada siku-siku")),
      tambah("Salah,", teks("pn2x", 280, 113, "✗", 12, W.merah)),
      tambah("tepat", teks("pn2c", 232, 134, "ada: 90°", 9.6, W.hijau)),
      ubah("tepat", { id: "sa1a", warna: W.hijau, tebal: 2.6 }),
    ),
    k(
      "Pernyataan ketiga: sudut Jalak dan Ketilang 130 derajat. Benar.",
      tambah("ketiga:", panelKanan("pn3", 152, "iii. Jalak-Ketilang 130°")),
      tambah("Benar.", teks("pn3x", 280, 167, "✓", 12, W.hijau)),
    ),
    k(
      "Bagian b, jenis sudut: 110 tumpul, 90 siku-siku, 25 lancip, dan 130 tumpul.",
      hapus(0, ...["pn1", "pn2", "pn3"].flatMap((p) => [`${p}-k`, `${p}-t`, `${p}x`]), "pn1c", "pn2c"),
      tambah("tumpul,", panelKanan("jn0", 40, "110° tumpul", W.merahMuda)),
      tambah("siku-siku,", panelKanan("jn1", 68, "90° siku-siku", W.hijauMuda)),
      tambah("lancip,", panelKanan("jn2", 96, "25° lancip", W.krem)),
      tambah("tumpul@2", panelKanan("jn3", 124, "130° tumpul", W.merahMuda)),
    ),
    k(
      "Catatan guru: jumlah ukuran di kunci 355 derajat, padahal satu putaran 360 derajat. Selisih 5 derajat mungkin pembulatan; jenis sudut dan jawaban tetap sama.",
      hapus(0, ...["jn0", "jn1", "jn2", "jn3"].flatMap((p) => [`${p}-k`, `${p}-t`])),
      tambah("355", teks("ct1", 232, 60, "jumlah kunci: 355°", 8.4, W.biru), teks("ct2", 232, 82, "satu putaran: 360°", 8.4, W.biru)),
      tambah("Selisih", teks("ct3", 232, 108, "360 - 355 = 5", 10, W.merah)),
      tambah("tetap", teks("ct4", 232, 134, "jawaban tidak berubah", 8.2, W.hijau)),
    ),
  ],
};

export const ADEGAN_UJI_JALAN_CD: AdeganStory = {
  id: "uji-jalan-cd",
  judul: "Uji Kompetensi 2c dan 2d: sudut ideal dan sulit berbelok",
  sumber: "Buku Siswa hlm. 189; Buku Panduan Guru hlm. 277",
  latar: "#ECFDF5",
  kutipan: ["Menurut ahli tata kota, sudut yang ideal untuk persimpangan", "Adakah persimpangan jalan yang", "ideal pada peta di atas", "makin kecil sudut persimpangan jalan, makin", "sulit kendaraan untuk berbelok", "Besar sudut antara kedua ruas jalan tersebut adalah 25", "paling kecil di antara yang lainnya", "Jalan Nuri menuju Jalan Bangau atau sebaliknya"],
  ketukan: [
    k(
      "Bagian c: menurut ahli tata kota, sudut ideal untuk persimpangan adalah siku-siku. Persimpangan ideal ada di Jalan Nuri dan Jalan Bangau, karena sudutnya 90 derajat.",
      tambah(0, jud("2c: persimpangan yang ideal", 20, 11)),
      tambah(0, jalanDasar()),
      tambah("Nuri", busurJ(SUDUT_JALAN[1], W.hijau), labelJ(SUDUT_JALAN[1], W.hijau)),
      tambah("karena", panelKanan("id1", 60, "ideal: siku-siku", W.hijauMuda), teks("id2", 232, 106, "Nuri - Bangau", 8.6, W.hijau), teks("id3", 232, 124, "90°", 11, W.hijau)),
    ),
    k(
      "Bagian d: makin kecil sudut persimpangan, makin sulit kendaraan berbelok. Dari keempat sudut, yang terkecil adalah 25 derajat.",
      ubah(0, { id: "jud", isi: "2d: yang paling sulit berbelok" }),
      hapus(0, "id1-k", "id1-t", "id2", "id3"),
      tambah("keempat", busurJ(SUDUT_JALAN[0], W.abu), labelJ(SUDUT_JALAN[0], W.abu), busurJ(SUDUT_JALAN[3], W.abu), labelJ(SUDUT_JALAN[3], W.abu)),
      tambah("terkecil", busurJ(SUDUT_JALAN[2], W.merah), labelJ(SUDUT_JALAN[2], W.merah)),
      tambah("25", teks("rn", 232, 70, "25 < 90 < 110 < 130", 8.6, W.biru)),
    ),
    k(
      "Jadi kendaraan paling sulit berbelok ketika melewati Jalan Bangau menuju Jalan Ketilang, atau sebaliknya, sebab sudutnya hanya 25 derajat, paling kecil di antara yang lain.",
      tambah("Bangau", panelKanan("sl1", 96, "paling sulit berbelok", W.merahMuda)),
      tambah("Ketilang,", teks("sl2", 232, 134, "Bangau - Ketilang", 8.6, W.merah), teks("sl3", 232, 152, "25°", 11, W.merah)),
    ),
  ],
};

/* ------------------------------ 13. Uji Kompetensi 3: memasang keramik (hlm. 190; Panduan Guru hlm. 277–278) ------------------------------ */
const P1 = pola1(105, 112, 34);
const gambarPola1 = (warnaCelah: string = W.merahMuda): Obj[] => [
  poligon("pj", P1.persegi, "#60A5FA", W.biru, { z: 1 }),
  ...P1.lima.map((p, i) => poligon(`pl${i}`, p, "#EF4444", W.biru, { z: 1 })),
  juring("cel", P1.pojok[0], P1.pojok[1], P1.celah[0], P1.celah[1], 22, warnaCelah, W.biru, { z: 2 }),
];
const segiLimaBesar = (): Obj[] => {
  const pts = titikSegiLima(105, 112, 66, 90);
  return [
    poligon("pb", pts, W.putih, W.biru, { z: 1 }),
    ...pts.map((p, i) => garis(`pr${i}`, 105, 112, p[0] - 105, p[1] - 112, W.abu, 1.2, { z: 2 })),
  ];
};
const PB = titikSegiLima(105, 112, 66, 90);

export const ADEGAN_KERAMIK_1: AdeganStory = {
  id: "keramik-1",
  judul: "Uji Kompetensi 3: sudut dalam segi lima dan pola 1",
  sumber: "Buku Siswa hlm. 190; Buku Panduan Guru hlm. 277–278",
  latar: "#FFF7ED",
  kutipan: ["Memasang Keramik", "Seorang tukang keramik memasang keramik dengan", "menggunakan pola berikut", "Pak Tukang akan memotong keramik untuk mengisi bagian", "kosong yang diberi tanda panah", "Ukuran sudut satu putaran penuh adalah 360", "Pada segi lima beraturan, ukuran sudut pusatnya", "Sebuah segi lima beraturan dapat dibagi menjadi", "5 segitiga yang sama", "Besar sudut pada ruang kosong yang ditunjukkan panah adalah", "Kemungkinan desain yang cocok adalah sebagai berikut"],
  ketukan: [
    k(
      "Nomor 3, memasang keramik. Pola 1: satu keramik persegi dikelilingi empat keramik segi lima beraturan. Pak Tukang akan memotong keramik untuk mengisi bagian kosong yang ditunjuk panah.",
      tambah(0, jud("Uji Kompetensi 3: Pola 1", 20, 11)),
      tambah("persegi", poligon("pj", P1.persegi, "#60A5FA", W.biru, { z: 1 })),
      tambah("empat", P1.lima.map((p, i) => poligon(`pl${i}`, p, "#EF4444", W.biru, { z: 1 }))),
      tambah("kosong", panah("pa", 200, 70, -60, 18, W.merah, 2), teks("pat", 238, 62, "bagian kosong", 8.4, W.merah)),
    ),
    k(
      "Pertama, sudut dalam segi lima beraturan. Satu putaran 360 derajat dibagi menjadi 5 segitiga sama, jadi sudut pusatnya 72 derajat.",
      bersih(0),
      tambah(0, jud("Segi lima beraturan")),
      tambah("segi", segiLimaBesar()),
      tambah("jadi", teks("pc", 105, 116, "72°", 11, W.merah)),
      tambah("360", teks("pf", 232, 90, "360 : 5 = 72", 10.4, W.merah), teks("pf2", 232, 108, "5 segitiga sama", 8.2, W.ungu)),
    ),
    k(
      "Tiap segitiga memiliki sudut pusat 72 derajat. Dua sudut alasnya sama besar: 180 dikurangi 72 sama dengan 108, lalu dibagi 2 menjadi 54 derajat.",
      tambah("Tiap", poligon("sg", [[105, 112] as Pt, PB[0], PB[1]], W.merahMuda, W.merah, { z: 3 })),
      tambah("180", teks("pf3", 232, 130, "180 - 72 = 108", 9.6, W.biru)),
      tambah("dibagi", teks("pf4", 232, 148, "108 : 2 = 54", 9.6, W.biru), teks("pa1", 108, 62, "54°", 8.4, W.hijau), teks("pa2", 62, 92, "54°", 8.4, W.hijau)),
    ),
    k(
      "Dua sudut alas 54 derajat menjadi satu sudut dalam: 54 ditambah 54 sama dengan 108. Catatan guru: gambar Panduan Guru menulis 56 derajat, itu keliru.",
      bersih(0),
      tambah(0, jud("Sudut dalam segi lima")),
      tambah("Dua", segiLimaBesar()),
      tambah("dalam:", teks("pd", 105, 66, "108°", 10, W.hijau)),
      tambah("54", teks("pg", 232, 80, "54 + 54 = 108", 10, W.hijau)),
      tambah("56", teks("ph", 232, 112, "buku tertulis 56 ✗", 8.4, W.merah), teks("ph2", 232, 128, "yang benar 54 ✓", 8.4, W.hijau)),
    ),
    k(
      "Kembali ke pola 1. Di tiap pojok persegi bertemu sudut persegi 90 derajat dan dua sudut segi lima 108 derajat. Satu putaran 360 dikurangi 90, dikurangi 108, dikurangi 108, sisa 54 derajat.",
      bersih(0),
      tambah(0, jud("Pojok pola 1", 20, 11)),
      tambah(0, gambarPola1()),
      tambah("90", teks("g1", 238, 66, "360 - 90 = 270", 9.2, W.biru)),
      tambah("dikurangi", teks("g2", 238, 86, "270 - 108 = 162", 9.2, W.biru)),
      tambah("dikurangi@3", teks("g3", 238, 106, "162 - 108 = 54", 9.2, W.merah)),
    ),
    k(
      "Jadi ruang kosong pada pola 1 bersudut 54 derajat. Potongan keramik harus memiliki sudut 54 derajat agar pas mengisi ruang kosong itu.",
      tambah("bersudut", teks("w54", P1.pojok[0] + 30, P1.pojok[1] - 20, "54°", 10, W.merah, { z: 9 })),
      ubah("bersudut", { id: "cel", warna: W.emas }),
      tambah("Potongan", kartu("pot", 200, 128, 92, 44, W.krem, ["potongan keramik", "bersudut 54°"], 8.4)),
    ),
  ],
};

const Q = pola2(120, 112, 34);

export const ADEGAN_KERAMIK_2: AdeganStory = {
  id: "keramik-2",
  judul: "Uji Kompetensi 3: pola 2 dan potongan keramik",
  sumber: "Buku Siswa hlm. 190; Buku Panduan Guru hlm. 277–278",
  latar: "#FEF2F2",
  kutipan: ["Pola 2", "Besar sudut pada ruang kosong yang ditunjukkan panah adalah", "Kemungkinan desain yang cocok adalah sebagai berikut", "Pak Tukang akan memotong keramik untuk mengisi bagian"],
  ketukan: [
    k(
      "Pola 2: tiga keramik segi lima beraturan bertemu di satu titik. Dua keramik bersisian, dan satu lagi masih menyisakan ruang kosong yang ditunjuk panah.",
      tambah(0, jud("Pola 2", 20, 11)),
      tambah("tiga", Q.lima.map((p, i) => poligon(`qp${i}`, p, "#EF4444", W.biru, { z: 1 }))),
      tambah("kosong", panah("qa", 210, 150, -50, -30, W.merah, 2), teks("qat", 240, 164, "ruang kosong", 8.4, W.merah)),
    ),
    k(
      "Tiga sudut segi lima bertemu di titik itu: 3 kali 108 sama dengan 324 derajat.",
      tambah("3", teks("q1", 236, 70, "3 x 108 = 324", 10, W.biru)),
      ubah("Tiga", { id: "qp0", warna: "#F87171" }, { id: "qp1", warna: "#F87171" }, { id: "qp2", warna: "#F87171" }),
    ),
    k(
      "Satu putaran 360 dikurangi 324 sama dengan 36 derajat. Jadi ruang kosong pola 2 bersudut 36 derajat, dan potongan keramiknya harus bersudut 36 derajat.",
      tambah("360", juring("qc", 120, 112, Q.celah[0], Q.celah[1], 28, W.merahMuda, W.biru, { z: 2 })),
      tambah("sama", teks("q2", 236, 92, "360 - 324 = 36", 10, W.merah)),
      tambah("bersudut", teks("q36", 156, 140, "36°", 10, W.merah, { z: 9 })),
    ),
    k(
      "Alasannya, potongan harus mengisi sisa satu putaran penuh tanpa celah dan tanpa bertumpuk. Bentuk potongan boleh berbeda, asalkan sudutnya tepat: 54 derajat untuk pola 1 dan 36 derajat untuk pola 2.",
      bersih(0),
      tambah(0, jud("Sudut potongan keramik")),
      tambah("54", kartu("r1", 20, 50, 120, 70, W.hijauMuda, ["Pola 1", "potongan 54°"], 10)),
      tambah("36", kartu("r2", 160, 50, 120, 70, W.krem, ["Pola 2", "potongan 36°"], 10)),
      tambah("tanpa", teks("r3", 150, 160, "pas: tanpa celah, tanpa bertumpuk", 8.8, W.ungu)),
    ),
  ],
};

/* ------------------------------ 14. Penilaian, remedial, pengayaan, orang tua, dan penutup (Panduan Guru hlm. 279–285) ------------------------------ */
const SKOR = [
  "0: tidak menjawab sama sekali",
  "1: jawaban akhir benar, tanpa alur runtut",
  "2: jawaban tepat, penjelasan tidak runtut",
  "3: konsep dan alur benar, jawaban salah",
  "4: runtut, jawaban dan kesimpulan tepat",
];
const barisSkor = (i: number, warna: string = W.putih): Obj[] => baris(`sk${i}`, 20, 40 + i * 30, 260, SKOR[i], warna, 8, 24);

export const ADEGAN_PENUTUP_D: AdeganStory = {
  id: "penutup-d",
  judul: "Penilaian, remedial, pengayaan rasi bintang, dan penutup bab",
  sumber: "Buku Panduan Guru hlm. 279–285",
  latar: "#EFF6FF",
  kutipan: ["Rubrik Penilaian Uji Kompetensi", "Peserta didik tidak menjawab", "sama sekali", "jawaban akhir benar tanpa ada", "Panduan Remedial", "Bimbingan individu", "Bimbingan kelompok", "Pembelajaran ulang dengan menggunakan metode dan media", "Panduan Pengayaan", "proyek untuk menggambar rasi", "rasi bintang Ursa Mayor atau rasi bintang Biduk", "Rasi bintang Biduk terdiri atas 7 buah bintang", "sebagai petunjuk arah utara", "sama persis dengan gambar aslinya", "Buat rasi bintangmu sendiri dan beri nama sekreatif mungkin", "Tepat dalam mengukur dan melukis sudut", "Terdapat nama rasi bintang dan artinya", "Interaksi dengan Orang Tua", "menemukan sudut pada benda di sekitar rumah masing-masing", "mengelompokkan sudut tersebut"],
  ketukan: [
    k(
      "Penilaian memakai rubrik skor 0 sampai 4. Skor 0 bila tidak menjawab, skor 1 bila jawaban akhir benar tanpa alur runtut.",
      tambah(0, jud("Rubrik skor 0 sampai 4")),
      tambah("bila", barisSkor(0)),
      tambah("1", barisSkor(1)),
    ),
    k(
      "Skor 2 bila jawaban tepat tetapi penjelasan tidak runtut. Skor 3 bila alur benar tetapi jawaban akhir salah. Skor 4 bila runtut, jawaban dan kesimpulan tepat.",
      tambah("2", barisSkor(2)),
      tambah("3", barisSkor(3)),
      tambah("4", barisSkor(4, W.hijauMuda)),
      tambah("tepat.", emo("sk-e", 150, 196, "🏅", 16)),
    ),
    k(
      "Remedial bagi yang belum mencapai kriteria minimum: bimbingan individu, bimbingan kelompok, atau pembelajaran ulang dengan metode dan media berbeda.",
      bersih(0),
      tambah(0, jud("Panduan remedial")),
      tambah("individu,", kartu("rm1", 20, 40, 260, 34, W.krem, ["bimbingan individu"], 9.4)),
      tambah("kelompok,", kartu("rm2", 20, 82, 260, 34, W.muda, ["bimbingan kelompok"], 9.4)),
      tambah("ulang", kartu("rm3", 20, 124, 260, 44, W.hijauMuda, ["pembelajaran ulang:", "metode dan media berbeda"], 9)),
    ),
    k(
      "Pengayaan: proyek menggambar rasi bintang. Rasi Biduk, atau Ursa Mayor, terdiri atas 7 bintang dan menjadi petunjuk arah utara.",
      bersih(0),
      tambah(0, jud("Pengayaan: rasi bintang Biduk")),
      tambah("Rasi", rasiBiduk("bd", 30, 20)),
      tambah("7", teks("b7", 150, 190, "Biduk: 7 bintang, petunjuk arah utara", 8.8, W.ungu)),
    ),
    k(
      "Aktivitas 1: salin rasi Biduk sama persis, termasuk panjang ruas garis dan sudut antarruas garis. Ini mengasah kemampuan mengukur dan melukis sudut.",
      bersih(0),
      tambah(0, jud("Pengayaan: Aktivitas 1")),
      tambah("salin", rasiBiduk("a1", 0, 10, W.emas)),
      tambah("sudut@2", rasiBiduk("a2", 52, 70, W.hijau)),
      tambah("sama", teks("a3", 150, 196, "panjang ruas garis dan sudut harus sama", 8.6, W.merah)),
    ),
    k(
      "Aktivitas 2: buat rasi bintangmu sendiri, beri nama kreatif, cantumkan ukuran ruas garis dan sudutnya, lalu jelaskan artinya.",
      bersih(0),
      tambah(0, jud("Pengayaan: Aktivitas 2")),
      tambah("sendiri,", emo("c1", 60, 92, "🔭", 30), teks("c1t", 60, 114, "rasi buatanmu", 8.2)),
      tambah("nama", kartu("c2", 110, 50, 170, 30, W.krem, ["beri nama kreatif"], 8.6)),
      tambah("cantumkan", kartu("c3", 110, 88, 170, 30, W.muda, ["ukuran ruas garis dan sudut"], 8.6)),
      tambah("jelaskan", kartu("c4", 110, 126, 170, 30, W.hijauMuda, ["jelaskan artinya"], 8.6)),
    ),
    k(
      "Bersama orang tua, siswa menemukan sudut di benda sekitar rumah, lalu mengelompokkannya menurut jenis sudut.",
      bersih(0),
      tambah(0, jud("Bersama orang tua")),
      tambah("rumah,", emo("o1", 150, 90, "🏠", 40)),
      tambah("mengelompokkannya", teks("o2", 150, 128, "cari sudut di rumah", 9.4, W.ungu), teks("o3", 150, 148, "kelompokkan: lancip, siku-siku, tumpul", 8.6, W.biru)),
    ),
    k(
      "Ringkasan Sub-Bab D dan penutup Bab 6: pusat busur di titik sudut, dasar di kaki, tandai dari nol, hubungkan, periksa. Selamat, Bab 6 selesai!",
      bersih(0),
      tambah(0, jud("Penutup Bab 6", 20, 11.5)),
      tambah("pusat", baris("z1", 40, 34, 220, "1. pusat busur di titik sudut", W.putih, 8.6, 22)),
      tambah("dasar", baris("z2", 40, 60, 220, "2. dasar busur di kaki sudut", W.putih, 8.6, 22)),
      tambah("tandai", baris("z3", 40, 86, 220, "3. tandai angka dari 0 di kaki", W.putih, 8.6, 22)),
      tambah("hubungkan,", baris("z4", 40, 112, 220, "4. hubungkan dengan garis lurus", W.putih, 8.6, 22)),
      tambah("periksa", baris("z5", 40, 138, 220, "5. periksa dengan busur", W.hijauMuda, 8.6, 22)),
      tambah("Selamat,", emo("z6", 150, 190, "🎉", 18)),
    ),
  ],
};
