import type { AdeganStory, Obj } from "./logika-story";
import { BANGUN_AG, E_BARU, F_BARU, G_BARU, PETAK_TAMU, W, bangunDiKisi, emo, judul, kartu, kisi, kotak, panah, petakPenuh, petakUtuhSebagian, poligon, sel, skala, tabel, teks } from "./k5b5a-gambar";
import type { Titik } from "./k5b5a-gambar";
import { bersih, k, tambah } from "./k5b5a-bantu";

const larik = (id: string, x: number, y: number, kol: number, baris: number, s: number, warna: string): Obj[] => [...petakPenuh(id, x, y, kol, baris, s, warna), kisi(`${id}-ks`, x, y, kol, baris, s, W.biru, { tebal: 0.8 })];

/* ------------------------------ 1. Array Model: penerapan pada denah rumah ------------------------------ */
export const ADEGAN_LUAR_ARRAY_TERAPAN: AdeganStory = {
  id: "luar-array-terapan",
  judul: "Array Model pada denah rumah",
  sumber: "Metode luar: Array Model; contoh denah Buku Siswa hlm. 134–141",
  latar: "#EFF6FF",
  ketukan: [
    k(
      "Kamar tidur berbentuk persegi, tiga meter kali tiga meter. Susun petak dalam tiga baris dan tiga kolom: sembilan petak.",
      tambah(0, judul("Kamar tidur")),
      tambah("Susun", ...larik("kt", 50, 46, 3, 3, 24, W.emas)),
      tambah("baris", teks("kb", 28, 86, "3 baris", 8.4, W.merah)),
      tambah("kolom:", teks("kk", 86, 132, "3 kolom", 8.4, W.hijau)),
      tambah("sembilan", ...kartu("kh", 160, 70, 128, 36, W.krem, ["3 × 3 = 9 petak"], 10)),
    ),
    k(
      "Ada dua kamar tidur yang ukurannya sama. Jadi dua kali sembilan, yaitu delapan belas petak.",
      bersih(0),
      tambah(0, judul("Dua kamar tidur")),
      tambah("kamar", ...larik("ka", 40, 46, 3, 3, 22, W.emas), teks("kat", 73, 124, "9 petak", 9, W.biru)),
      tambah("sama.", ...larik("kc", 170, 46, 3, 3, 22, W.emas), teks("kct", 203, 124, "9 petak", 9, W.biru)),
      tambah("kali", ...kartu("kd", 50, 142, 200, 28, W.krem, ["2 × 9 = 18 petak"], 10)),
      tambah("delapan", teks("kdm", 150, 188, "luas 18 m²", 11, W.hijau)),
    ),
    k(
      "Dapur tiga meter kali dua meter: tiga kolom dan dua baris, enam petak. Kamar mandi dua meter kali satu meter: dua kolom dan satu baris, dua petak.",
      bersih(0),
      tambah(0, judul("Dapur dan kamar mandi")),
      tambah("Dapur", ...larik("dp", 36, 50, 3, 2, 24, W.krem), teks("dpt", 72, 120, "Dapur", 9, W.biru)),
      tambah("enam", teks("dp6", 72, 140, "3 × 2 = 6", 10, W.hijau)),
      tambah("Kamar", ...larik("km", 190, 50, 2, 1, 24, W.pink), teks("kmt", 214, 94, "Kamar mandi", 9, W.biru)),
      tambah("petak@2", teks("km2", 214, 114, "2 × 1 = 2", 10, W.hijau)),
    ),
    k(
      "Ruang tamu: bagian persegi panjangnya tiga kolom dan empat baris, dua belas petak, ditambah satu petak di pojok kiri atas. Jadi tiga belas petak.",
      bersih(0),
      tambah(0, judul("Ruang tamu")),
      tambah("bagian", ...PETAK_TAMU.filter(([, r]) => r >= 1).map(([c, r]) => sel(`tt-${r}-${c}`, 50 + c * 18, 44 + r * 18, 18, W.langit)), kisi("ttk", 50, 62, 3, 4, 18, W.biru, { tebal: 0.8 })),
      tambah("belas", teks("t12", 200, 90, "3 × 4 = 12", 11, W.biru)),
      tambah("ditambah", sel("t1", 50, 44, 18, W.emas, { tebal: 1.8 }), kotak("tkm", 68, 44, 36, 18, W.pink, W.biru, { rx: 0 }), teks("t1t", 200, 114, "+ 1 petak", 10, W.merah)),
      tambah("Jadi", ...kartu("th", 170, 130, 118, 32, W.hijauMuda, ["= 13 petak"], 11)),
    ),
    k(
      "Terakhir, jumlahkan semuanya: tiga belas ditambah delapan belas ditambah enam ditambah dua, hasilnya tiga puluh sembilan meter persegi.",
      bersih(0),
      tambah(0, judul("Total dengan Array Model")),
      tambah("Terakhir,", ...tabel("ta", 22, 34, [100, 96, 60], [["Ruangan", "Susunan", "Luas"], ["Ruang tamu", "3 × 4 + 1", "13"], ["2 kamar tidur", "2 × (3 × 3)", "18"], ["Dapur", "3 × 2", "6"], ["Kamar mandi", "2 × 1", "2"]], 22, 8.4)),
      tambah("hasilnya", ...kartu("tj", 22, 150, 256, 30, W.emas, ["13 + 18 + 6 + 2 = 39 m²"], 10.4)),
    ),
  ],
};

/* ------------------------------ 2. Area Conservation: konsep ------------------------------ */
export const ADEGAN_LUAR_KONSERVASI: AdeganStory = {
  id: "luar-konservasi",
  judul: "Area Conservation: kekekalan luas",
  sumber: "Metode luar: Area Conservation (cara Yohana)",
  latar: "#FDF4FF",
  ketukan: [
    k(
      "Metode ketiga, Area Conservation, atau kekekalan luas. Artinya, memotong dan memindahkan bagian tanpa menambah atau membuang tidak mengubah luas.",
      tambah(0, judul("Area Conservation")),
      tambah("memotong", ...larik("bl", 40, 60, 2, 2, 22, W.emas), teks("blt", 62, 124, "4 petak", 9, W.biru)),
      tambah("memindahkan", ...larik("st", 130, 71, 4, 1, 22, W.emas), teks("stt", 174, 124, "4 petak", 9, W.biru)),
      tambah("tanpa", teks("eq", 108, 88, "=", 20, W.merah), teks("cp", 150, 160, "bentuk beda, luas sama", 10, W.hijau)),
    ),
    k(
      "Anak sering mengira luas berubah ketika bentuknya berubah. Padahal, kalau tidak ada bagian yang dibuang atau ditambah, luasnya tetap.",
      bersih(0),
      tambah(0, judul("Salah kaprah yang umum")),
      tambah("mengira", emo("fk", 70, 90, "🤔", 40), ...kartu("sk", 110, 56, 168, 36, W.merahMuda, ["bentuk berubah,", "luas berubah?"], 9.4)),
      tambah("Padahal,", ...kartu("pk", 110, 108, 168, 36, W.hijauMuda, ["tidak dibuang, tidak ditambah:", "luas tetap"], 8.8), emo("ce", 70, 150, "✅", 26)),
    ),
    k(
      "Di buku, cara Yohana memakai gagasan ini: potong bagian petak yang tidak utuh, lalu tempelkan ke bagian lain, sehingga petaknya menjadi utuh.",
      bersih(0),
      tambah(0, judul("Potong, pindah, tempel")),
      tambah("potong", ...bangunDiKisi("cy", 20, 56, BANGUN_AG.F.p, 6, 3, 14, W.merahMuda), poligon("cyp", 90, 56, skala([[0, 0], [1, 0], [0, 3]], 14), W.pink, W.merah)),
      tambah("tempelkan", panah("cya", 112, 77, -88, 0, W.biru, 2.2, { gambar: true })),
      tambah("sehingga", ...bangunDiKisi("cz", 170, 56, F_BARU, 5, 3, 14, W.hijauMuda)),
      tambah("menjadi", teks("cyt", 150, 122, "kotak utuh, lebih mudah dihitung", 9, W.hijau)),
    ),
    k(
      "Ujinya sederhana. Hitung petak sebelum dan sesudah dipindah. Kalau jumlahnya sama, berarti luasnya tetap.",
      bersih(0),
      tambah(0, judul("Uji kekekalan")),
      tambah("sebelum", ...kartu("us", 20, 56, 110, 44, W.krem, ["sebelum", "15 petak"], 10)),
      tambah("sesudah", ...kartu("ud", 170, 56, 110, 44, W.hijauMuda, ["sesudah", "15 petak"], 10)),
      tambah("sama,", teks("ue", 150, 84, "=", 24, W.merah)),
      tambah("tetap.", teks("ut", 150, 140, "luas tetap", 13, W.hijau), emo("uc", 150, 170, "✅", 22)),
    ),
  ],
};

/* ------------------------------ 3. Area Conservation: penerapan pada bangun E, F, G ------------------------------ */
export const ADEGAN_LUAR_KONSERVASI_TERAPAN: AdeganStory = {
  id: "luar-konservasi-terapan",
  judul: "Area Conservation pada bangun E, F, dan G",
  sumber: "Metode luar: Area Conservation; contoh bangun E, F, G Buku Siswa hlm. 142–143",
  latar: "#FDF4FF",
  ketukan: [
    k(
      "Bangun E. Setelah dipotong dan ditempel, barisnya menjadi satu, tiga, dan lima petak. Satu ditambah tiga ditambah lima, hasilnya sembilan.",
      tambah(0, judul("Bangun E")),
      tambah("Bangun", ...bangunDiKisi("e", 100, 44, E_BARU, 6, 3, 18, W.hijauMuda)),
      tambah("satu,", teks("e1", 80, 59, "1", 10, W.biru)),
      tambah("tiga,", teks("e3", 80, 77, "3", 10, W.biru)),
      tambah("lima", teks("e5", 80, 95, "5", 10, W.biru)),
      tambah("hasilnya", ...kartu("eh", 80, 120, 140, 30, W.krem, ["1 + 3 + 5 = 9"], 10.4)),
    ),
    k(
      "Bangun F. Bagian runcing di kanan dipindah ke kiri, jadi lima kolom dan tiga baris. Lima kali tiga sama dengan lima belas.",
      bersih(0),
      tambah(0, judul("Bangun F")),
      tambah("Bangun", ...bangunDiKisi("f", 100, 44, F_BARU, 5, 3, 18, W.hijauMuda)),
      tambah("kolom", teks("fk", 146, 112, "5 kolom", 9, W.hijau)),
      tambah("baris.", teks("fb", 72, 70, "3 baris", 9, W.merah)),
      tambah("Lima@2", ...kartu("fh", 80, 130, 140, 30, W.krem, ["5 × 3 = 15"], 10.4)),
    ),
    k(
      "Bangun G. Setelah diubah, ada delapan petak utuh dan dua petak setengahan. Delapan ditambah setengah ditambah setengah, hasilnya sembilan.",
      bersih(0),
      tambah(0, judul("Bangun G")),
      tambah("Setelah", ...bangunDiKisi("g", 110, 44, G_BARU, 4, 3, 20, W.langit)),
      tambah("delapan", teks("g8", 80, 130, "8 utuh", 9, W.hijau)),
      tambah("setengahan.", teks("g2", 220, 130, "2 setengahan", 9, W.merah)),
      tambah("hasilnya", ...kartu("gh", 70, 146, 160, 30, W.krem, ["8 + 1/2 + 1/2 = 9"], 10.4)),
    ),
    k(
      "Periksa kekekalannya. Luas E sebelum dan sesudah sama, F sama, dan G juga sama. Tidak ada satu bagian pun yang hilang.",
      bersih(0),
      tambah(0, judul("Sebelum = sesudah")),
      tambah("Periksa", ...tabel("kk", 40, 40, [70, 70, 70], [["Bangun", "Sebelum", "Sesudah"], ["E", "9", "9"], ["F", "15", "15"], ["G", "9", "9"]], 22, 10)),
      tambah("Tidak", ...kartu("kz", 40, 140, 210, 30, W.hijauMuda, ["luas tetap, tidak ada yang hilang"], 9.4)),
    ),
  ],
};

/* ------------------------------ 4. Grid Estimation of Partial Squares: konsep ------------------------------ */
/** Bangun bersisi miring untuk contoh konsep (lima titik sudut) pada kertas 4 kali 4 petak. */
const BANGUN_H: Titik[] = [[2, 0], [4, 1], [4, 3], [2, 4], [0, 2]];
const HH = petakUtuhSebagian(BANGUN_H, 4, 4);
const petakAnalisis = (id: string, x: number, y: number, p: Titik[], kol: number, baris: number, s: number, utuh: boolean, sebagian: boolean): Obj[] => {
  const a = petakUtuhSebagian(p, kol, baris);
  return [
    ...(utuh ? a.utuh.map(([c, r]) => sel(`${id}u-${r}-${c}`, x + c * s, y + r * s, s, W.hijauMuda)) : []),
    ...(sebagian ? a.sebagian.map(([c, r]) => sel(`${id}s-${r}-${c}`, x + c * s, y + r * s, s, W.jingga, { op: 0.7 })) : []),
  ];
};

export const ADEGAN_LUAR_GRID: AdeganStory = {
  id: "luar-grid",
  judul: "Grid Estimation of Partial Squares",
  sumber: "Metode luar: Grid Estimation of Partial Squares",
  latar: "#FFF1F2",
  ketukan: [
    k(
      "Metode keempat, Grid Estimation of Partial Squares, memperkirakan luas bangun bersisi miring dengan menghitung petak utuh dan petak sebagian pada kertas berpetak.",
      tambah(0, judul("Grid Estimation of Partial Squares")),
      tambah("memperkirakan", ...bangunDiKisi("h", 40, 44, BANGUN_H, 4, 4, 28, W.putih)),
      tambah("bersisi", teks("hq", 232, 100, "luas = ?", 13, W.merah)),
      tambah("kertas", teks("hk", 150, 176, "sisi miring: petak tidak semua utuh", 9, W.coklat)),
    ),
    k(
      "Langkahnya tiga. Pertama, hitung petak yang seluruhnya di dalam bangun, warna hijau. Kedua, hitung petak yang hanya terpotong sebagian, warna jingga. Ketiga, tambahkan utuh dengan setengah dari sebagian.",
      bersih(0),
      tambah(0, judul("Tiga langkah")),
      tambah(0, ...bangunDiKisi("h", 14, 44, BANGUN_H, 4, 4, 22, W.putih)),
      tambah("Pertama,", ...petakAnalisis("h", 14, 44, BANGUN_H, 4, 4, 22, true, false), ...kartu("l1", 116, 40, 172, 34, W.hijauMuda, ["1. petak utuh (hijau)", `dihitung: ${HH.utuh.length}`], 8.6)),
      tambah("Kedua,", ...petakAnalisis("h", 14, 44, BANGUN_H, 4, 4, 22, false, true), ...kartu("l2", 116, 82, 172, 34, W.jingga, ["2. petak sebagian (jingga)", `dihitung: ${HH.sebagian.length}`], 8.6)),
      tambah("Ketiga,", ...kartu("l3", 116, 124, 172, 34, W.krem, ["3. utuh + setengah sebagian", `${HH.utuh.length} + ${HH.sebagian.length}/2`], 8.6)),
    ),
    k(
      "Mengapa setengah? Ada petak sebagian yang terisi lebih dari setengah, ada yang kurang dari setengah. Keduanya saling mengimbangi, sehingga rata-ratanya setengah.",
      bersih(0),
      tambah(0, judul("Mengapa setengah?")),
      tambah("lebih", sel("pa", 40, 56, 50, W.putih), poligon("pb", 40, 56, [[0, 0], [50, 0], [50, 50], [25, 50]], W.jingga, W.merah), teks("pat", 65, 124, "3/4 petak", 9, W.merah)),
      tambah("kurang", sel("pc", 160, 56, 50, W.putih), poligon("pd", 160, 56, [[50, 0], [50, 50], [25, 50]], W.jingga, W.merah), teks("pdt", 185, 124, "1/4 petak", 9, W.merah)),
      tambah("mengimbangi,", teks("pe", 125, 84, "+", 20, W.biru), teks("pf", 150, 160, "3/4 + 1/4 = 1 = 2 × 1/2", 10, W.hijau)),
    ),
    k(
      "Hasilnya perkiraan, belum tentu tepat. Makin kecil petaknya, makin dekat hasilnya dengan luas sebenarnya.",
      bersih(0),
      tambah(0, judul("Makin kecil petak, makin tepat")),
      tambah("perkiraan,", ...bangunDiKisi("bk", 20, 50, [[0, 0], [0, 2], [3, 2]], 3, 2, 36, W.putih), teks("bkt", 74, 140, "petak besar: kasar", 9, W.merah)),
      tambah("kecil", ...bangunDiKisi("bh", 160, 50, BANGUN_AG.E.p, 6, 3, 18, W.putih), teks("bht", 214, 140, "petak kecil: halus", 9, W.hijau)),
      tambah("sebenarnya.", emo("be", 150, 176, "🔍", 22)),
    ),
  ],
};

/* ------------------------------ 5. Grid Estimation of Partial Squares: penerapan pada bangun E, F, G ------------------------------ */
const rincianGrid = (h: "E" | "F" | "G"): Obj[] => {
  const a = petakUtuhSebagian(BANGUN_AG[h].p, 6, 3);
  const tambahan = a.sebagian.length / 2;
  return [
    ...kartu(`gu${h}`, 130, 40, 158, 28, W.hijauMuda, [`utuh: ${a.utuh.length}`], 9.4),
    ...kartu(`gs${h}`, 130, 76, 158, 28, W.jingga, [`sebagian: ${a.sebagian.length}`], 9.4),
    ...kartu(`gj${h}`, 130, 112, 158, 30, W.krem, [`${a.utuh.length} + ${a.sebagian.length}/2 = ${a.utuh.length + tambahan}`], 10.4),
  ];
};

export const ADEGAN_LUAR_GRID_TERAPAN: AdeganStory = {
  id: "luar-grid-terapan",
  judul: "Grid Estimation pada bangun E, F, dan G",
  sumber: "Metode luar: Grid Estimation of Partial Squares; contoh bangun E, F, G Buku Siswa hlm. 142",
  latar: "#FFF1F2",
  ketukan: [
    k(
      "Bangun E. Petak utuh di dalam bangun ada enam, warna hijau. Petak yang hanya sebagian juga ada enam, warna jingga. Setengah dari enam adalah tiga, enam ditambah tiga sama dengan sembilan.",
      tambah(0, judul("Bangun E")),
      tambah("Bangun", ...bangunDiKisi("gbE", 14, 50, BANGUN_AG.E.p, 6, 3, 16, W.putih)),
      tambah("utuh", ...petakAnalisis("gE", 14, 50, BANGUN_AG.E.p, 6, 3, 16, true, false), rincianGrid("E").slice(0, 2)),
      tambah("sebagian", ...petakAnalisis("gE", 14, 50, BANGUN_AG.E.p, 6, 3, 16, false, true), rincianGrid("E").slice(2, 4)),
      tambah("Setengah", rincianGrid("E").slice(4)),
    ),
    k(
      "Bangun F. Petak utuh ada dua belas, petak sebagian ada enam. Setengah dari enam adalah tiga, dua belas ditambah tiga sama dengan lima belas.",
      bersih(0),
      tambah(0, judul("Bangun F")),
      tambah("Bangun", ...bangunDiKisi("gbF", 14, 50, BANGUN_AG.F.p, 6, 3, 16, W.putih)),
      tambah("utuh", ...petakAnalisis("gF", 14, 50, BANGUN_AG.F.p, 6, 3, 16, true, false), rincianGrid("F").slice(0, 2)),
      tambah("sebagian", ...petakAnalisis("gF", 14, 50, BANGUN_AG.F.p, 6, 3, 16, false, true), rincianGrid("F").slice(2, 4)),
      tambah("Setengah", rincianGrid("F").slice(4)),
    ),
    k(
      "Bangun G. Petak utuh ada lima, petak sebagian ada delapan. Setengah dari delapan adalah empat, lima ditambah empat sama dengan sembilan.",
      bersih(0),
      tambah(0, judul("Bangun G")),
      tambah("Bangun", ...bangunDiKisi("gbG", 14, 50, BANGUN_AG.G.p, 6, 3, 16, W.putih)),
      tambah("utuh", ...petakAnalisis("gG", 14, 50, BANGUN_AG.G.p, 6, 3, 16, true, false), rincianGrid("G").slice(0, 2)),
      tambah("sebagian", ...petakAnalisis("gG", 14, 50, BANGUN_AG.G.p, 6, 3, 16, false, true), rincianGrid("G").slice(2, 4)),
      tambah("Setengah", rincianGrid("G").slice(4)),
    ),
    k(
      "Hasil perkiraan sama dengan cara Yohana: sembilan, lima belas, dan sembilan. Pada bangun ini perkiraannya tepat, karena kelebihan dan kekurangan saling menutupi.",
      bersih(0),
      tambah(0, judul("Perkiraan = hasil Yohana")),
      tambah("Hasil", ...tabel("pk", 32, 38, [60, 90, 90], [["Bangun", "Perkiraan grid", "Cara Yohana"], ["E", "9", "9"], ["F", "15", "15"], ["G", "9", "9"]], 22, 9.4)),
      tambah("tepat,", ...kartu("pz", 32, 140, 240, 30, W.hijauMuda, ["sama: perkiraan grid tepat"], 9.4)),
    ),
  ],
};

/* ------------------------------ 6. Ringkasan ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan empat metode dari luar",
  sumber: "Ringkasan metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Mari ringkas. Unit Square Covering menutup daerah dengan petak. Array Model menyusun petak dalam baris dan kolom. Area Conservation memindahkan bagian tanpa mengubah luas. Grid Estimation menghitung petak utuh dan setengah sebagian.",
      tambah(0, judul("Ringkasan empat metode")),
      tambah("Unit", ...kartu("r1", 12, 32, 276, 34, W.hijauMuda, ["Unit Square Covering: tutup dengan petak"], 8.6)),
      tambah("Array", ...kartu("r2", 12, 72, 276, 34, W.langit, ["Array Model: baris dan kolom"], 8.6)),
      tambah("Area", ...kartu("r3", 12, 112, 276, 34, W.krem, ["Area Conservation: pindah, luas tetap"], 8.6)),
      tambah("Grid", ...kartu("r4", 12, 152, 276, 34, W.pink, ["Grid Estimation: utuh + 1/2 sebagian"], 8.6)),
    ),
    k(
      "Memilih metode: daerah persegi panjang penuh paling cepat dengan Array Model. Bentuk tidak rata cocok dengan Unit Square Covering atau cara Yohana. Sisi miring yang sulit dipindah cukup diperkirakan dengan grid.",
      bersih(0),
      tambah(0, judul("Memilih metode")),
      tambah("persegi", ...kartu("p1", 12, 34, 276, 34, W.langit, ["persegi panjang penuh → Array Model"], 8.8)),
      tambah("rata", ...kartu("p2", 12, 76, 276, 34, W.hijauMuda, ["bentuk tidak rata → petak / Yohana"], 8.8)),
      tambah("miring", ...kartu("p3", 12, 118, 276, 34, W.pink, ["sisi miring → perkiraan grid"], 8.8)),
    ),
    k(
      "Hasil keempat metode cocok dengan kunci buku. Ruang tamu tiga belas, kamar tidur sembilan, dapur enam, kamar mandi dua, dan bangun A sampai G adalah sembilan, dua belas, lima belas, enam belas, sembilan, lima belas, sembilan.",
      bersih(0),
      tambah(0, judul("Cocok dengan kunci buku")),
      tambah("Ruang", ...tabel("kn", 20, 36, [64, 64, 64, 64], [["Ruang tamu", "Kamar tidur", "Dapur", "K. mandi"], ["13", "9", "6", "2"]], 22, 8)),
      tambah("bangun", ...tabel("kb", 31, 100, [34, 34, 34, 34, 34, 34, 34], [["A", "B", "C", "D", "E", "F", "G"], ["9", "12", "15", "16", "9", "15", "9"]], 22, 9.4)),
    ),
    k(
      "Apa pun metodenya, jawabannya sama: luas adalah banyaknya satuan luas yang menutup daerah. Pilih cara yang paling cocok, lalu periksa dengan cara lain. Selamat berlatih.",
      bersih(0),
      tambah(0, judul("Satu gagasan, banyak cara")),
      tambah("luas", ...larik("fz", 90, 44, 4, 3, 30, W.emas)),
      tambah("Pilih", ...kartu("fa", 30, 148, 240, 34, W.krem, ["pilih cara, lalu periksa dengan cara lain"], 9)),
      tambah("berlatih.", emo("fy", 150, 192, "🎉", 16)),
    ),
  ],
};

