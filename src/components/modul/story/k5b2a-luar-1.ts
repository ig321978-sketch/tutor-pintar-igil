import type { AdeganStory, Obj } from "./logika-story";
import { W, busur, emo, garisLompat, kartu, kelipatan, kisiAngka, kotak, panah, pendaratan, pusatSel, teks, judul } from "./k5b2a-gambar";
import { bersih, k, sebar, sorotkan, tambah, ubah, warnaiSel } from "./k5b2a-bantu";

/** Garis lompat kelipatan 3 (konsep): titik 0 di x = 15, satu satuan 9 piksel, sampai 30. */
export const GL3 = { x0: 15, y: 100, satuan: 9, maks: 30, langkah: 3 };
/** Garis lompat kelipatan 6 (Ayo Berlatih nomor 2): titik 0 di x = 10, satu satuan 7 piksel, sampai 40. */
export const GL6 = { x0: 10, y: 100, satuan: 7, maks: 40, langkah: 6 };
/** Garis lompat kelipatan 8 (Ayo Berlatih nomor 3): garis kedua di bawah garis kelipatan 6. */
export const GL8 = { x0: 10, y: 160, satuan: 7, maks: 40, langkah: 8 };
/** Tabel seratus untuk metode luar: 10 kolom, 10 baris. */
export const HC = { x: 20, y: 30, cw: 22, ch: 16, kolom: 10, baris: 10 };
const tabelHC = (id: string) => kisiAngka(id, HC.x, HC.y, HC.cw, HC.ch, HC.kolom, HC.baris, [], W.karang, 7.6);
/** Panah pendek antarpusat sel tabel seratus. */
const langkahHC = (id: string, a: number, b: number, warna: string = W.merah): Obj => {
  const [ax, ay] = pusatSel(HC.x, HC.y, HC.cw, HC.ch, HC.kolom, a);
  const [bx, by] = pusatSel(HC.x, HC.y, HC.cw, HC.ch, HC.kolom, b);
  const sx = ax + (bx - ax) * 0.2;
  const sy = ay + (by - ay) * 0.2;
  const ex = ax + (bx - ax) * 0.8;
  const ey = ay + (by - ay) * 0.8;
  return panah(id, Number(sx.toFixed(2)), Number(sy.toFixed(2)), Number((ex - sx).toFixed(2)), Number((ey - sy).toFixed(2)), warna, 1.6);
};

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Empat metode dari luar untuk menentukan kelipatan",
  sumber: "Metode luar: pembuka; angka Buku Siswa hlm. 35–37",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Bagaimana kita menentukan kelipatan sebuah bilangan? Guru di berbagai negara punya cara berbeda. Dalam video ini kita lihat empat metode dari luar, memakai angka dari buku.",
      tambah(0, judul("Empat metode dari luar")),
      tambah("bilangan?", ...kartu("kp", 40, 40, 90, 44, W.krem, ["3, 6, 9, ..."], 11)),
      tambah("berbagai", emo("gl", 195, 96, "🌍", 46)),
      tambah("angka", teks("pa", 150, 146, "tabel 1 sampai 100, kelipatan 7 dan 9", 9.4, W.biru), teks("pb", 150, 164, "kelipatan 6 dan 8", 9.4, W.biru)),
    ),
    k(
      "Empat metode itu: Skip Counting, Hundred Chart, Divisibility Check, dan Last Digit Pattern.",
      bersih(0),
      tambah(0, judul("Empat metode")),
      tambah("Skip", ...kartu("m1", 12, 34, 276, 30, W.hijauMuda, ["1. Skip Counting"], 9.6)),
      tambah("Hundred", ...kartu("m2", 12, 72, 276, 30, W.langit, ["2. Hundred Chart"], 9.6)),
      tambah("Divisibility", ...kartu("m3", 12, 110, 276, 30, W.krem, ["3. Divisibility Check"], 9.6)),
      tambah("Last", ...kartu("m4", 12, 148, 276, 30, W.pink, ["4. Last Digit Pattern"], 9.6)),
    ),
    k(
      "Semuanya menjawab pertanyaan yang sama: bilangan ini kelipatan berapa saja? Caranya berbeda: melompat, mewarnai tabel, memeriksa angka, atau melihat angka satuan.",
      bersih(0),
      tambah(0, judul("Satu pertanyaan, empat cara")),
      tambah("melompat,", emo("i1", 45, 80, "🦘", 34), teks("i1t", 45, 112, "melompat", 8.6, W.biru)),
      tambah("mewarnai", emo("i2", 112, 80, "🎨", 34), teks("i2t", 112, 112, "mewarnai", 8.6, W.biru)),
      tambah("memeriksa", emo("i3", 188, 80, "🔍", 34), teks("i3t", 188, 112, "memeriksa", 8.6, W.biru)),
      tambah("satuan.", emo("i4", 255, 80, "🔢", 34), teks("i4t", 255, 112, "satuan", 8.6, W.biru)),
    ),
    k(
      "Angkanya dari buku: kelipatan tiga sampai lima puluh, kelipatan tujuh dan sembilan sampai seratus, serta kelipatan enam dan delapan.",
      bersih(0),
      tambah(0, judul("Angka dari buku")),
      tambah("tiga", ...kartu("a1", 14, 34, 272, 30, W.hijauMuda, ["kelipatan 3 sampai 50"], 9.6)),
      tambah("tujuh", ...kartu("a2", 14, 72, 272, 30, W.langit, ["kelipatan 7 dan 9 sampai 100"], 9.6)),
      tambah("enam", ...kartu("a3", 14, 110, 272, 30, W.pink, ["kelipatan 6 dan 8"], 9.6)),
    ),
  ],
};

/* ------------------------------ 2. Skip Counting: konsep ------------------------------ */
const garis3 = () => garisLompat("sk", GL3.x0, GL3.y, GL3.satuan, GL3.maks, GL3.langkah, 8.6);
const lompat3 = (i: number) => busur("sk", GL3.x0, GL3.y, GL3.satuan, GL3.langkah, i);
const darat3 = (i: number) => pendaratan("sk", GL3.x0, GL3.y, GL3.satuan, GL3.langkah, i);

export const ADEGAN_LUAR_LOMPAT: AdeganStory = {
  id: "luar-lompat",
  judul: "Skip Counting: lompat hitung dari nol",
  sumber: "Metode luar: Skip Counting",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Metode pertama, Skip Counting, atau lompat hitung. Mulai dari nol, lalu melompat dengan langkah yang sama panjang. Tiap titik pendaratan adalah kelipatan.",
      tambah(0, judul("Skip Counting")),
      tambah("Mulai", ...garis3()),
      tambah("melompat", lompat3(1)),
      tambah("sama", lompat3(2)),
      tambah("pendaratan", darat3(1), darat3(2)),
    ),
    k(
      "Langkahnya tiga. Tentukan bilangan yang dilompati, misalnya tiga. Mulai dari nol, lompat tiga kali berturut-turut. Tulis tiap titik pendaratan: tiga, enam, sembilan, dan seterusnya.",
      bersih(0),
      tambah(0, judul("Tiga langkah")),
      tambah("Tentukan", ...kartu("l1", 14, 34, 272, 32, W.hijauMuda, ["1. tentukan langkah, misalnya 3"], 9.4)),
      tambah("Mulai", ...kartu("l2", 14, 76, 272, 32, W.langit, ["2. mulai dari 0, lompat berulang"], 9.4)),
      tambah("Tulis", ...kartu("l3", 14, 118, 272, 32, W.krem, ["3. tulis tiap titik pendaratan"], 9.4)),
    ),
    k(
      "Tiga lompatan dari nol mendarat di tiga, enam, sembilan: itulah bilangan kelipatan tiga seperti di tepuk bilangan.",
      bersih(0),
      tambah(0, judul("Lompat 3 dari 0")),
      tambah(0, ...garis3()),
      tambah("tiga@2", lompat3(1), darat3(1)),
      tambah("enam", lompat3(2), darat3(2)),
      tambah("sembilan", lompat3(3), darat3(3)),
      tambah("itulah", teks("kl", 150, 56, "kelipatan 3", 10, W.merah)),
    ),
    k(
      "Pendaratan ke berapa menunjukkan berapa kali tiga. Pendaratan keempat adalah dua belas, sebab empat kali tiga.",
      ...[1, 2, 3].map((i) => tambah("Pendaratan", teks(`or${i}`, GL3.x0 + i * GL3.langkah * GL3.satuan, 74, String(i), 8.6, W.hijau))),
      tambah("keempat", lompat3(4), darat3(4), teks("or4", GL3.x0 + 4 * GL3.langkah * GL3.satuan, 74, "4", 8.6, W.hijau)),
      tambah("sebab", teks("eq", 150, 160, "4 × 3 = 12", 12, W.merah)),
    ),
    k(
      "Nol tidak dihitung sebagai kelipatan, sebab nol hanya titik mulai.",
      ubah("Nol", { id: "sk-l0", warna: W.merah }),
      sorotkan("Nol", "sk-l0"),
      tambah("titik", teks("nl", 150, 186, "nol = titik mulai, bukan kelipatan", 9.6, W.merah)),
    ),
  ],
};

/* ------------------------------ 3. Skip Counting: penerapan pada Ayo Berlatih nomor 2 dan 3 ------------------------------ */
const garis6 = () => garisLompat("sg", GL6.x0, GL6.y, GL6.satuan, GL6.maks, GL6.langkah, 8.6);
const garis8 = () => garisLompat("sh", GL8.x0, GL8.y, GL8.satuan, GL8.maks, GL8.langkah, 8.6);

export const ADEGAN_LUAR_LOMPAT_TERAPAN: AdeganStory = {
  id: "luar-lompat-terapan",
  judul: "Skip Counting pada Ayo Berlatih nomor 2 dan 3",
  sumber: "Metode luar: Skip Counting; angka Buku Siswa hlm. 37",
  latar: "#F0FDF4",
  ketukan: [
    k(
      "Terapkan pada Ayo Berlatih nomor dua: lima bilangan kelipatan enam. Mulai dari nol, lompat enam, berkali-kali.",
      tambah(0, judul("Kelipatan 6: lompat 6")),
      tambah("Mulai", ...garis6()),
      tambah("lompat", teks("lb", 150, 60, "paling sedikit 5 bilangan", 10, W.merah)),
    ),
    k(
      "Mendarat di enam, dua belas, delapan belas, dua puluh empat, tiga puluh: lima pendaratan, lima bilangan kelipatan enam.",
      ...[1, 2, 3, 4, 5].map((i, j) => tambah([2, 4, 6, 9, 11][j], busur("sg", GL6.x0, GL6.y, GL6.satuan, GL6.langkah, i), pendaratan("sg", GL6.x0, GL6.y, GL6.satuan, GL6.langkah, i))),
    ),
    k(
      "Nomor tiga: kelipatan delapan. Lompat delapan: delapan, enam belas, dua puluh empat, tiga puluh dua, empat puluh.",
      tambah("delapan.", ...garis8()),
      ...[1, 2, 3, 4, 5].map((i, j) => tambah([6, 8, 11, 14, 16][j], busur("sh", GL8.x0, GL8.y, GL8.satuan, GL8.langkah, i, W.hijau), pendaratan("sh", GL8.x0, GL8.y, GL8.satuan, GL8.langkah, i, W.hijau))),
    ),
    k(
      "Hitung lompatannya: lima kali enam adalah tiga puluh, dan lima kali delapan adalah empat puluh. Pendaratan terakhir cocok dengan perkalian.",
      tambah("enam", teks("q6", 258, 60, "5 × 6 = 30", 9.6, W.merah)),
      tambah("delapan", teks("q8", 258, 142, "5 × 8 = 40", 9.6, W.hijau)),
    ),
  ],
};

/* ------------------------------ 4. Hundred Chart: konsep ------------------------------ */
const SUARA_H2 = "Warnai bilangan kelipatan yang dicari. Warna yang membentuk pola menunjukkan keteraturan kelipatan.";

export const ADEGAN_LUAR_SERATUS: AdeganStory = {
  id: "luar-seratus",
  judul: "Hundred Chart: tabel seratus berwarna",
  sumber: "Metode luar: Hundred Chart",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Metode kedua, Hundred Chart, atau tabel seratus. Tuliskan bilangan satu sampai seratus dalam sepuluh baris dan sepuluh kolom.",
      tambah(0, judul("Hundred Chart")),
      tambah("Tuliskan", tabelHC("hc")),
      tambah("sepuluh@1", teks("sz", 270, 60, "10 × 10", 9.6, W.biru)),
    ),
    k(
      SUARA_H2,
      ...warnaiSel("hc", W.karang, kelipatan(5, 100), sebar(SUARA_H2, 20, 1)),
      tambah("dicari.", teks("lb1", 270, 100, "kelipatan", 7.6, W.biru), teks("lb2", 270, 114, "5", 14, W.merah)),
    ),
    k(
      "Contoh kelipatan lima: semuanya jatuh di dua kolom tegak, kolom lima dan kolom sepuluh. Polanya lurus, jadi mudah dikenali.",
      tambah("kolom@1", kotak("kc5", HC.x + 4 * HC.cw, HC.y, HC.cw, HC.ch * 10, "none", W.merah, { rx: 0, tebal: 2 }), teks("kt5", HC.x + 4.5 * HC.cw, 198, "kolom 5", 7.6, W.merah)),
      tambah("sepuluh", kotak("kc10", HC.x + 9 * HC.cw, HC.y, HC.cw, HC.ch * 10, "none", W.merah, { rx: 0, tebal: 2 }), teks("kt10", HC.x + 9.5 * HC.cw, 198, "kolom 10", 7.6, W.merah)),
    ),
    k(
      "Langkahnya: buat tabel, warnai tiap bilangan kelipatan, lalu amati polanya, baik kolom, diagonal, maupun lompatan.",
      bersih(0),
      tambah(0, judul("Tiga langkah")),
      tambah("buat", ...kartu("h1", 14, 34, 272, 32, W.hijauMuda, ["1. buat tabel 1 sampai 100"], 9.6)),
      tambah("warnai", ...kartu("h2", 14, 76, 272, 32, W.langit, ["2. warnai tiap kelipatan"], 9.6)),
      tambah("amati", ...kartu("h3", 14, 118, 272, 32, W.krem, ["3. amati polanya"], 9.6)),
      tambah("lompatan.", emo("pl", 150, 184, "🎨", 28)),
    ),
  ],
};

/* ------------------------------ 5. Hundred Chart: penerapan pada kelipatan 7 dan 9 ------------------------------ */
const SUARA_HT1 = "Terapkan pada kelipatan tujuh dari buku. Warnai tujuh, empat belas, dan seterusnya sampai sembilan puluh delapan: empat belas bilangan.";
const SUARA_HT3 = "Sekarang kelipatan sembilan. Warnai sembilan sampai sembilan puluh sembilan: sebelas bilangan.";
const SUARA_HT4 = "Kelipatan sembilan membentuk garis miring, tiap baris bergeser satu kotak ke kiri. Tabel ini juga memuat sembilan puluh dan sembilan puluh sembilan, dua bilangan terakhir.";
const SEMBILAN = kelipatan(9, 100);

export const ADEGAN_LUAR_SERATUS_TERAPAN: AdeganStory = {
  id: "luar-seratus-terapan",
  judul: "Hundred Chart pada kelipatan 7 dan 9 dari buku",
  sumber: "Metode luar: Hundred Chart; angka Buku Siswa hlm. 36–37",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_HT1,
      tambah(0, judul("Kelipatan 7 pada tabel")),
      tambah(0, tabelHC("h7")),
      tambah(0, teks("lb1", 270, 80, "kelipatan", 7.6, W.biru), teks("lb2", 270, 94, "7", 14, W.merah)),
      ...warnaiSel("h7", W.karang, kelipatan(7, 100), sebar(SUARA_HT1, 14, 5)),
    ),
    k(
      "Polanya zig-zag, tidak membentuk kolom lurus, seperti langkah kuda pada papan catur.",
      tambah("zig-zag,", ...[[7, 14], [14, 21], [35, 42], [56, 63], [77, 84], [84, 91]].map(([a, b], i) => langkahHC(`ar${i}`, a, b))),
      tambah("kuda", emo("kd", 270, 150, "🐴", 22)),
    ),
    k(
      SUARA_HT3,
      bersih(0),
      tambah(0, judul("Kelipatan 9 pada tabel")),
      tambah(0, tabelHC("h9")),
      tambah(0, teks("lb1", 270, 80, "kelipatan", 7.6, W.biru), teks("lb2", 270, 94, "9", 14, W.merah)),
      ...warnaiSel("h9", W.karang, SEMBILAN, sebar(SUARA_HT3, 11, 2)),
    ),
    k(
      SUARA_HT4,
      ...SEMBILAN.slice(0, 8).map((n, i) => tambah(sebar(SUARA_HT4, 8, 1)[i], langkahHC(`da${i}`, n, SEMBILAN[i + 1]))),
      ...warnaiSel("h9", W.hijau, [90, 99], [17, 21]),
    ),
    k(
      "Hitung warnanya: tujuh punya empat belas bilangan, sembilan punya sebelas. Makin besar bilangannya, makin sedikit kelipatannya sampai seratus.",
      bersih(0),
      tambah(0, judul("Banyak kelipatan sampai 100")),
      tambah("tujuh", teks("bl7", 40, 74, "7", 14, W.biru), kotak("br7", 60, 54, 14 * 12, 30, W.karang, W.biru, { rx: 4 }), teks("bt7", 60 + 7 * 12, 74, "14 bilangan", 9.6, W.biru)),
      tambah("sembilan", teks("bl9", 40, 124, "9", 14, W.biru), kotak("br9", 60, 104, 11 * 12, 30, W.hijau, W.biru, { rx: 4 }), teks("bt9", 60 + 5.5 * 12, 124, "11 bilangan", 9.6, W.putih)),
      tambah("sedikit", teks("ms", 150, 170, "makin besar bilangan, makin sedikit", 9.6, W.merah)),
    ),
  ],
};

