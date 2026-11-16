import type { AdeganStory, Obj } from "./logika-story";
import { W, balon, bersih, bulat, emo, hapus, k, kotak, redamkan, sorotkan, tambah, teks, ubah } from "./kit/dasar";
import { LINTANG, NIKO, TALA, benda, kumpulBenda, lambang, rumput } from "./kit/dunia-k1";
import { APEL, APEL_HIJAU, LATAR_KEBUN, anak, cincin, idApel, penghitung } from "./o2k1a-bantu";

/** Video metode luar Sub-Bab A (bagian 2): "Baris Isi Lima", "Geser yang Sudah Dihitung", dan ringkasan. */

/* ------------------------------ Baris Isi Lima ------------------------------ */
const BX = (i: number): number => 100 + 34 * (i % 5);
const BY = (i: number): number => (i < 5 ? 132 : 164);
const apelBaris = (n: number): Obj[] => Array.from({ length: n }, (_, i) => benda("a" + (i + 1), BX(i), BY(i), APEL, 24));
/** Sorot bergilir sambil menyebut bilangan: apel ke-i pada kata ke-(i - 1). */
const hitungBergilir = (n: number) =>
  idApel(1, n).map((id, i) => ubah(i, { id, sorot: true }, ...(i > 0 ? [{ id: "a" + i, sorot: false }] : []), { id: "cn-t", isi: String(i + 1) }));

export const ADEGAN_LUAR_BARIS: AdeganStory = {
  id: "baris-konsep",
  judul: "Baris Isi Lima: konsep",
  sumber: "Metode luar: baris isi lima",
  latar: LATAR_KEBUN,
  ketukan: [
    k(
      "Cara kedua: Baris Isi Lima.",
      tambah(0, rumput(150), ...anak(TALA, 44), emo("dk1", 190, 110, APEL, 44), emo("dk2", 232, 110, APEL, 44)),
      tambah(2, teks("jd1", 150, 22, "Baris Isi Lima", 13, W.ungu)),
    ),
    k("Tala mengatur apel dalam baris.", hapus(0, "dk1", "dk2"), tambah(3, ...apelBaris(7))),
    k(
      "Lima apel dalam satu baris, mudah dilihat.",
      tambah(0, ...penghitung("5", 252, 8), cincin("r1", 88, 109, 164, 30)),
      tambah(3, ...lambang("cm", 208, 8, "1", 36, 36, 24)),
    ),
    k("Sekarang hitung semuanya dari satu.", hapus(0, "r1", "cm-k", "cm-t"), ubah(4, { id: "cn-t", isi: "1" })),
    k("Satu, dua, tiga, empat, lima, enam, tujuh.", ...hitungBergilir(7)),
    k("Ada tujuh apel semuanya.", redamkan(0, "a7"), tambah(2, cincin("rs", 88, 109, 164, 66))),
    k("Baris isi lima membantu kita mengatur apel.", tambah(0, ...balon("bt", 14, 52, 50, ["Rapi!"]))),
  ],
};

const SEBAR_8: [number, number][] = [[110, 130], [200, 124], [150, 150], [250, 140], [120, 182], [190, 176], [240, 190], [160, 196]];

export const ADEGAN_LUAR_BARIS_TERAPAN: AdeganStory = {
  id: "baris-terapan",
  judul: "Baris Isi Lima: mengatur apel Niko",
  sumber: "Metode luar: terapan baris",
  latar: LATAR_KEBUN,
  ketukan: [
    k("Apel Niko tersebar di rumput.", tambah(0, rumput(150), ...anak(NIKO, 28), ...SEBAR_8.map(([x, y], i) => benda("a" + (i + 1), x, y, APEL, 24)))),
    k("Tala mengatur apel dalam baris.", tambah(0, ...anak(TALA, 66)), ubah(3, ...Array.from({ length: 8 }, (_, i) => ({ id: "a" + (i + 1), x: BX(i), y: BY(i) })))),
    k("Baris pertama penuh, isinya lima.", tambah(2, cincin("r1", 88, 109, 164, 30)), tambah(4, ...penghitung("5", 252, 8))),
    k("Sekarang hitung semuanya dari satu.", hapus(0, "r1"), ubah(4, { id: "cn-t", isi: "1" })),
    k("Satu, dua, tiga, empat, lima, enam, tujuh, delapan.", ...hitungBergilir(8)),
    k("Ada delapan apel semuanya.", redamkan(0, "a8")),
    k("Niko berseru, wah, mudah sekali!", tambah(0, ...balon("bn", 4, 52, 40, ["Wah!"]))),
  ],
};

/* ------------------------------ Geser yang Sudah Dihitung ------------------------------ */
const zona = (): Obj => kotak("zn", 176, 112, 116, 84, "#DCFCE7", W.hijau, { rx: 10, putus: true });
const GS: [number, number][] = [[200, 140], [236, 140], [272, 140], [200, 176], [236, 176], [272, 176]];
const GL5: [number, number][] = [[30, 138], [76, 152], [116, 138], [44, 176], [96, 184]];
const GL6: [number, number][] = [[26, 134], [70, 150], [112, 134], [40, 172], [86, 184], [124, 168]];
const panahGeser = (): Obj => emo("pr", 156, 150, "\u{27A1}\u{FE0F}", 30);

/** Geser: apel ke-n pindah ke zona hijau (dan jadi hijau) pada kata ke-(n - 1); penghitung ikut berubah. */
const geserSemua = (n: number) => Array.from({ length: n }, (_, i) => ubah(i, { id: "a" + (i + 1), x: GS[i][0], y: GS[i][1], sorot: false, isi: APEL_HIJAU }, { id: "cn-t", isi: String(i + 1) }));

export const ADEGAN_LUAR_GESER: AdeganStory = {
  id: "geser-konsep",
  judul: "Geser yang Sudah Dihitung: konsep",
  sumber: "Metode luar: geser",
  latar: LATAR_KEBUN,
  ketukan: [
    k(
      "Cara ketiga: Geser yang Sudah Dihitung.",
      tambah(0, rumput(150), ...anak(LINTANG, 34, 40), zona(), ...GL5.map(([x, y], i) => benda("a" + (i + 1), x, y, APEL, 22))),
      tambah(2, teks("jd1", 150, 22, "Geser yang", 12, W.ungu)),
      tambah(4, teks("jd2", 150, 36, "Sudah Dihitung", 12, W.ungu)),
    ),
    k("Apel yang disebut digeser ke kanan, jadi hijau.", sorotkan(2, "a1"), tambah(5, panahGeser())),
    k("Yang belum dihitung tetap di sisi kiri.", sorotkan(0, "a2", "a3", "a4", "a5")),
    k("Satu, dua, tiga, empat, lima.", tambah(0, ...penghitung("1", 252, 8)), ...geserSemua(5)),
    k("Tidak ada apel yang tertinggal.", hapus(0, "pr"), sorotkan(4, "zn")),
    k("Semua apel sudah dihitung.", redamkan(0, "zn"), tambah(0, ...balon("bl", 56, 44, 56, ["Teliti!"]))),
    k("Cara ini cocok untuk apel yang tersebar.", tambah(5, emo("sp", 150, 100, "✨", 30))),
    k("Lintang berkata, aku suka cara ini.", hapus(0, "bl-k", "bl-t0"), tambah(0, ...balon("bm", 56, 44, 56, ["Suka!"]))),
  ],
};

export const ADEGAN_LUAR_GESER_TERAPAN: AdeganStory = {
  id: "geser-terapan",
  judul: "Geser yang Sudah Dihitung: Niko bingung",
  sumber: "Metode luar: terapan geser",
  latar: LATAR_KEBUN,
  ketukan: [
    k("Niko mau menghitung apel yang tersebar.", tambah(0, rumput(150), ...anak(NIKO, 34, 40), zona(), ...GL6.map(([x, y], i) => benda("a" + (i + 1), x, y, APEL, 22)))),
    k("Niko bingung. Apel mana yang sudah dihitung?", tambah(0, ...balon("bn", 56, 44, 62, ["Bingung!"])), tambah(3, emo("qm", 150, 100, "❓", 34))),
    k("Apel yang sudah dihitung diberi warna hijau.", hapus(0, "bn-k", "bn-t0", "qm"), sorotkan(5, "zn")),
    k("Niko menggeser apel yang dihitung.", redamkan(0, "zn"), tambah(2, panahGeser())),
    k("Satu, dua, tiga, empat, lima, enam.", tambah(0, ...penghitung("1", 252, 8)), ...geserSemua(6)),
    k("Hasilnya enam. Tidak ada yang tertukar.", hapus(0, "pr"), tambah(0, ...balon("bm", 56, 44, 56, ["Teliti!"]))),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "ringkasan",
  judul: "Ringkasan tiga cara menghitung",
  sumber: "Metode luar: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      "Ada tiga cara menghitung apel.",
      tambah(1, ...penghitung("3", 132, 10)),
      tambah(2, kotak("ka-k", 12, 60, 86, 100, "#DBEAFE", W.biru, { rx: 10 }), kotak("kb-k", 107, 60, 86, 100, "#DCFCE7", W.biru, { rx: 10 }), kotak("kc-k", 202, 60, 86, 100, "#FEF9C3", W.biru, { rx: 10 })),
    ),
    k("Pertama, Tanda Satu-Satu agar tidak terlewat.", sorotkan(1, "ka-k"), tambah(1, emo("ia", 55, 112, APEL, 30), bulat("pt1", 55, 80, 6, W.merah, W.merah), teks("ca", 55, 150, "Tanda", 11))),
    k("Kedua, Baris Isi Lima.", redamkan(0, "ka-k"), sorotkan(1, "kb-k"), tambah(1, ...kumpulBenda("ib", 8, 119, 96, APEL, 5, 15, 13), teks("cb", 150, 150, "Baris", 11))),
    k(
      "Ketiga, Geser yang Sudah Dihitung.",
      redamkan(0, "kb-k"),
      sorotkan(1, "kc-k"),
      tambah(1, emo("ic1", 224, 104, APEL, 24), emo("ic2", 252, 104, "\u{27A1}\u{FE0F}", 22), emo("ic3", 278, 104, APEL_HIJAU, 22), teks("cc", 245, 150, "Geser", 11)),
    ),
    k("Semuanya tetap menghitung satu per satu.", sorotkan(0, "ka-k", "kb-k", "kc-k")),
    k("Tanda, baris, dan geser menjaga hitungan.", redamkan(0, "ka-k", "kb-k", "kc-k")),
    k("Pilih cara yang kamu suka.", sorotkan(0, "ka-k", "kb-k", "kc-k")),
    k("Hitungan jadi tertib dan teliti.", tambah(0, emo("jp", 240, 36, "\u{1F44D}", 30))),
    k(
      "Selanjutnya, Nenek menyiapkan makan sore.",
      bersih(0),
      tambah(0, rumput(150), emo("e1", 150, 112, "\u{1F37D}\u{FE0F}", 54), emo("e2", 100, 164, "\u{1F35E}", 30), emo("e3", 200, 164, "\u{1F370}", 30)),
    ),
  ],
};

