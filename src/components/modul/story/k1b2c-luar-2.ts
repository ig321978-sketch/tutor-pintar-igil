import type { AdeganStory, Obj } from "./logika-story";
import { W, bingkai, bulat, emo, garis, judul, kartu, kotak, teks, titikBingkai } from "./k1b2c-gambar";
import { bersih, hapus, hitungMuncul, k, redamkan, sorotkan, tambah, ubah } from "./k1b2c-bantu";
import { NAMA_METODE, NAMA_METODE_ID, WARNA_METODE, kepala } from "./k1b2c-luar-1";

const IGIL = "\u{1F989}";
const BX = 85;
const BY = 66;
const merah = (id: string, i: number): Obj => bulat(id, titikBingkai(BX, BY, i).x, titikBingkai(BX, BY, i).y, 8.3, W.merah, W.merah, { tebal: 1 });
const biru = (id: string, i: number): Obj => bulat(id, titikBingkai(BX, BY, i).x, titikBingkai(BX, BY, i).y, 8.3, "#2563EB", "#2563EB", { tebal: 1 });

/* ------------------------------ 1. Part–Part–Whole: konsep ------------------------------ */
const SUARA_B1 = "Metode kedua, Part–Part–Whole, atau Bagian–Utuh. Dua bagian membentuk satu jumlah.";
const SUARA_B2 = "Kotak besar di atas adalah utuh, yaitu jumlah semuanya. Dua kotak kecil di bawah adalah bagian.";
const SUARA_B3 = "Contohnya tiga pensil merah dan empat pensil hijau. Dua bagiannya adalah tiga dan empat.";
const SUARA_B4 = "Kalau dua bagian digabung, utuhnya adalah tujuh. Tiga ditambah empat sama dengan tujuh.";

const DIAGRAM = (isi: [string, string, string]): Obj[] => [
  ...kartu("wh", 100, 56, 100, 36, W.emas, [isi[0]], 13),
  ...kartu("p1", 40, 122, 90, 36, W.merahMuda, [isi[1]], 12),
  ...kartu("p2", 170, 122, 90, 36, W.hijauMuda, [isi[2]], 12),
];
const GARIS_DIAGRAM = (): Obj[] => [garis("gl1", 150, 92, -65, 30, W.biru, 2), garis("gl2", 150, 92, 65, 30, W.biru, 2)];

export const ADEGAN_LUAR_BAGIAN: AdeganStory = {
  id: "luar-bagian",
  judul: "Part–Part–Whole: dua bagian, satu utuh",
  sumber: "Metode luar: Part–Part–Whole",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_B1, tambah("kedua,", ...kepala(1)), tambah("bagian.", ...DIAGRAM(["?", "?", "?"]), ...GARIS_DIAGRAM())),
    k(SUARA_B2, ubah("utuh,", { id: "wh-t0", isi: "utuh", u: 12 }), ubah("bagian.", { id: "p1-t0", isi: "bagian", u: 11 }, { id: "p2-t0", isi: "bagian", u: 11 })),
    k(SUARA_B3, ubah("tiga", { id: "p1-t0", isi: "3", u: 14 }), ubah("hijau.", { id: "p2-t0", isi: "4", u: 14 }), tambah("Contohnya", ...kartu("ct", 40, 172, 220, 24, W.krem, ["3 pensil merah, 4 pensil hijau"], 9.4))),
    k(SUARA_B4, ubah("utuhnya", { id: "wh-t0", isi: "7", u: 16 }, { id: "wh-k", warna: W.hijauMuda }), sorotkan("tujuh.", "wh-k")),
  ],
};

/* ------------------------------ 2. Part–Part–Whole: terapan ------------------------------ */
const SUARA_P1 = "Soal cerita: Malosi punya enam kelereng merah. Kira punya tiga kelereng biru. Semua kelereng ada berapa?";
const SUARA_P2 = "Dua bagiannya enam dan tiga. Kita gabungkan dua bagian itu menjadi satu utuh.";
const SUARA_P3 = "Enam ditambah tiga sama dengan sembilan. Utuhnya adalah sembilan.";
const SUARA_P4 = "Jadi Malosi dan Kira punya sembilan kelereng. Bagian dan utuh membantu kita melihat dua bagian dan jumlahnya.";

export const ADEGAN_LUAR_BAGIAN_TERAPAN: AdeganStory = {
  id: "luar-bagian-terapan",
  judul: "Part–Part–Whole: kelereng Malosi dan Kira",
  sumber: "Metode luar: Part–Part–Whole, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, ...kepala(1)),
      tambah("merah.", ...kartu("p1", 40, 122, 90, 36, W.merahMuda, ["6 merah"], 11), ...Array.from({ length: 6 }, (_, i) => bulat(`dm${i}`, 45 + 13 * i, 178, 5, "#F87171"))),
      tambah("biru.", ...kartu("p2", 170, 122, 90, 36, W.hijauMuda, ["3 biru"], 11), ...Array.from({ length: 3 }, (_, i) => bulat(`db${i}`, 175 + 13 * i, 178, 5, "#60A5FA"))),
      tambah("berapa?", emo("tn", 262, 90, "❓", 30)),
    ),
    k(SUARA_P2, tambah("gabungkan", ...GARIS_DIAGRAM(), ...kartu("wh", 100, 56, 100, 36, W.emas, ["utuh"], 12)), sorotkan("bagian", "p1-k", "p2-k"), hapus(0, "tn")),
    k(SUARA_P3, ubah("sembilan.", { id: "wh-t0", isi: "9", u: 16 }, { id: "wh-k", warna: W.hijauMuda }), tambah("Enam", teks("pr", 262, 62, "6 + 3 = 9", 11, W.merah))),
    k(SUARA_P4, tambah("Jadi", ...kartu("pj", 30, 186, 240, 14, W.krem, ["Malosi dan Kira: 9 kelereng"], 8.6)), tambah("membantu", emo("ok", 262, 108, "✅", 26))),
  ],
};

/* ------------------------------ 3. Ten Frame Add: konsep ------------------------------ */
const SUARA_G1 = "Metode ketiga, Ten Frame Add, atau Jumlah di Bingkai Sepuluh. Bingkai sepuluh punya sepuluh petak.";
const SUARA_G2 = "Ketuk petak untuk mengisi titik merah. Satu, dua, tiga, empat, lima. Lima titik mengisi satu baris penuh.";
const SUARA_G3 = "Sekarang ketuk titik biru di baris kedua: satu, dua, tiga. Jadi ada tiga titik biru.";
const SUARA_G4 = "Lima titik merah ditambah tiga titik biru. Jumlahnya delapan, karena masih ada dua petak kosong.";

export const ADEGAN_LUAR_BINGKAI: AdeganStory = {
  id: "luar-bingkai",
  judul: "Ten Frame Add: gabungkan titik di bingkai",
  sumber: "Metode luar: Ten Frame Add",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_G1, tambah("ketiga,", ...kepala(2)), tambah("Bingkai", ...bingkai("bf", BX, BY, 0)), tambah("sepuluh@3", teks("tp", 150, 148, "10 petak", 12, W.merah))),
    k(SUARA_G2, ...hitungMuncul(SUARA_G2, "bt", [0, 1, 2, 3, 4].map((i) => titikBingkai(BX, BY, i)), (i) => merah(`bm${i}`, i), "merah.", false)),
    k(SUARA_G3, ...hitungMuncul(SUARA_G3, "bu", [5, 6, 7].map((i) => titikBingkai(BX, BY, i)), (i) => biru(`bb${i}`, i + 5), "kedua:", false)),
    k(SUARA_G4, sorotkan("ditambah", "bf-c8", "bf-c9"), tambah("Jumlahnya", ...kartu("bj", 80, 164, 140, 28, W.emas, ["5 + 3 = 8"], 13))),
  ],
};

/* ------------------------------ 4. Ten Frame Add: terapan ------------------------------ */
const SUARA_H1 = "Soal cerita: ada enam jeruk dan empat apel. Semuanya ada berapa? Kita isi bingkai sepuluh.";
const SUARA_H2 = "Ketuk enam titik merah untuk enam jeruk. Satu, dua, tiga, empat, lima, enam.";
const SUARA_H3 = "Ketuk empat titik biru untuk empat apel. Satu, dua, tiga, empat.";
const SUARA_H4 = "Bingkainya penuh! Enam ditambah empat sama dengan sepuluh. Semua buah ada sepuluh.";

export const ADEGAN_LUAR_BINGKAI_TERAPAN: AdeganStory = {
  id: "luar-bingkai-terapan",
  judul: "Ten Frame Add: jeruk dan apel",
  sumber: "Metode luar: Ten Frame Add, terapan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_H1, tambah(0, ...kepala(2), ...bingkai("bf", BX, BY, 0)), tambah("jeruk", emo("je", 100, 168, "\u{1F34A}", 26), teks("jn", 100, 190, "6 jeruk", 8.6)), tambah("apel.", emo("ap", 200, 168, "\u{1F34E}", 26), teks("an", 200, 190, "4 apel", 8.6)), tambah("sepuluh.", teks("tp", 150, 138, "10 petak", 11, W.merah))),
    k(SUARA_H2, ...hitungMuncul(SUARA_H2, "bt", [0, 1, 2, 3, 4, 5].map((i) => titikBingkai(BX, BY, i)), (i) => merah(`bm${i}`, i), "jeruk.", false)),
    k(SUARA_H3, ...hitungMuncul(SUARA_H3, "bu", [6, 7, 8, 9].map((i) => titikBingkai(BX, BY, i)), (i) => biru(`bb${i}`, i + 6), "apel.", false)),
    k(SUARA_H4, sorotkan("penuh!", "bf-c0", "bf-c9"), tambah("Enam", ...kartu("bj", 80, 148, 140, 28, W.emas, ["6 + 4 = 10"], 13)), tambah("buah", emo("ok", 262, 100, "✅", 26))),
  ],
};

/* ------------------------------ 5. Ringkasan tiga metode ------------------------------ */
const SUARA_R1 = "Mari kita ringkas tiga metode dari luar tadi.";
const SUARA_R2 = "Counting On: mulai dari bilangan pertama, lalu maju. Part–Part–Whole: dua bagian membentuk satu jumlah.";
const SUARA_R3 = "Ten Frame Add: isi titik di bingkai sepuluh, lalu lihat jumlahnya.";
const SUARA_R4 = "Ketiganya membantu kita mengerjakan soal cerita penjumlahan sampai sepuluh. Terima kasih sudah belajar.";
const DESKRIPSI = ["mulai dari bilangan pertama, lalu maju", "dua bagian membentuk satu jumlah", "isi titik di bingkai 10 petak"];
const kartuMetode = (i: number): Obj[] => [kotak(`rm${i}-k`, 14, 34 + i * 54, 272, 46, WARNA_METODE[i], W.biru, { rx: 8, tebal: 1.5 }), teks(`rm${i}-n`, 150, 34 + i * 54 + 19, `${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`, 9, W.biru)];
const deskripsi = (i: number): Obj => teks(`rm${i}-d`, 150, 34 + i * 54 + 36, DESKRIPSI[i], 8.8, W.merah);

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Ringkasan metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Ringkasan")), tambah("ringkas", ...kartuMetode(0)), tambah("tiga", ...kartuMetode(1)), tambah("luar", ...kartuMetode(2))),
    k(SUARA_R2, sorotkan("Counting", "rm0-k"), tambah("mulai", deskripsi(0)), redamkan("Part", "rm0-k"), sorotkan("Part", "rm1-k"), tambah("dua", deskripsi(1))),
    k(SUARA_R3, redamkan(0, "rm1-k"), sorotkan("Ten", "rm2-k"), tambah("isi", deskripsi(2))),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Terima kasih"), emo("ow", 150, 100, IGIL, 54)),
      tambah("sampai", ...kartu("rz", 60, 124, 180, 34, W.emas, ["penjumlahan sampai 10"], 11)),
      tambah("Terima", teks("rt", 150, 184, "Sampai jumpa!", 12, W.ungu)),
    ),
  ],
};
