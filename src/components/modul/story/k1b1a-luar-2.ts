import type { AdeganStory } from "./logika-story";
import { E, W, emo, judul, kartu, kartuTitik, kotak, teks } from "./k1b1a-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k1b1a-bantu";
import { NAMA_METODE, NAMA_METODE_ID, WARNA_METODE, kepala } from "./k1b1a-luar-1";

/* ------------------------------ 1. Subitizing: konsep ------------------------------ */
const SUARA_S1 = "Metode ketiga, Subitizing, atau Melihat Sekilas. Kita mengenali banyak benda tanpa menghitung satu-satu.";
const SUARA_S2 = "Cara ini bekerja untuk banyak yang kecil, sampai lima. Titik yang tersusun rapi memudahkan mata.";
const SUARA_S3 = "Kalau bendanya banyak, mata kita sulit mengenalinya sekilas. Kita kembali menghitung satu-satu.";
const SUARA_S4 = "Di luar negeri, anak-anak berlatih dengan kartu titik dan dadu, seperti dadu mainan Abang.";

export const ADEGAN_LUAR_SEKILAS: AdeganStory = {
  id: "luar-sekilas",
  judul: "Subitizing: mengenali banyak sekilas",
  sumber: "Metode luar: Subitizing",
  latar: "#FAF5FF",
  ketukan: [
    k(
      SUARA_S1,
      tambah("ketiga,", ...kepala(2)),
      tambah("mengenali", ...kartuTitik("ua", 66, 62, 2, 68), ...kartuTitik("ub", 166, 62, 3, 68)),
      tambah("tanpa", ...kartu("ut", 50, 152, 200, 30, W.krem, ["tanpa menghitung"], 10)),
    ),
    k(
      SUARA_S2,
      bersih(0),
      tambah(0, judul("Sampai lima titik")),
      tambah("kecil,", ...[1, 2, 3, 4, 5].flatMap((n, i) => [...kartuTitik(`uc${n}`, 16 + i * 55, 62, n, 46)])),
      tambah("sampai", ...[1, 2, 3, 4, 5].map((n, i) => teks(`ucl${n}`, 39 + i * 55, 132, String(n), 18, W.merah))),
      tambah("rapi", emo("um", 150, 176, "\u{1F440}", 30)),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Kalau banyak, hitung")),
      tambah("banyak,", ...kartuTitik("ud", 105, 52, 8, 90)),
      sorotkan("sulit", "ud-k"),
      tambah("menghitung", ...kartu("uh", 50, 156, 200, 30, W.emas, ["hitung satu-satu"], 10)),
    ),
    k(
      SUARA_S4,
      bersih(0),
      tambah(0, judul("Alat latihan di luar negeri")),
      tambah("kartu", ...kartuTitik("ue", 40, 70, 4, 56)),
      tambah("dadu", emo("ud6", 200, 112, "\u{1F3B2}", 50)),
      tambah("berlatih", ...kartu("uf", 50, 152, 200, 30, W.hijauMuda, ["latih mata, latih tebakan"], 10)),
    ),
  ],
};

/* ------------------------------ 2. Subitizing: terapan ------------------------------ */
const SUARA_T1 = "Kaka mengajak Igil bermain tebak sekilas. Lihat kartu ini hanya sebentar.";
const SUARA_T2 = "Sekarang kartunya ditutup. Ada berapa titik tadi? Jawabannya lima.";
const SUARA_T3 = "Sekarang kartu kedua dengan tiga titik. Jawabannya tiga.";
const SUARA_T4 = "Tebakan Igil benar semua. Kalau ragu, boleh dihitung satu-satu.";
const IDT5 = [0, 1, 2, 3, 4].map((i) => `ta-t${i}`);

export const ADEGAN_LUAR_SEKILAS_TERAPAN: AdeganStory = {
  id: "luar-sekilas-terapan",
  judul: "Subitizing: tebak sekilas",
  sumber: "Metode luar: Subitizing, terapan",
  latar: "#FAF5FF",
  ketukan: [
    k(SUARA_T1, tambah("bermain", ...kepala(2)), tambah("kartu", ...kartuTitik("ta", 110, 62, 5, 80)), tambah("sebentar.", emo("tm", 150, 176, "\u{1F440}", 30))),
    k(
      SUARA_T2,
      ubah("ditutup.", { id: "ta-k", warna: W.abu }, ...IDT5.map((id) => ({ id, op: 0 }))),
      tambah("ditutup.", teks("tq", 150, 120, "?", 44, W.ungu)),
      ubah("lima.", { id: "tq", isi: "5", warna: W.hijau }),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, ...kepala(2)),
      tambah("kedua", ...kartuTitik("tb", 110, 62, 3, 80)),
      tambah("Jawabannya", teks("tr", 150, 168, "3", 36, W.hijau)),
    ),
    k(SUARA_T4, tambah("benar", emo("tk", 60, 120, "✅", 40)), tambah("ragu,", ...kartu("tx", 190, 150, 100, 30, W.krem, ["ragu? hitung"], 9.6))),
  ],
};

/* ------------------------------ 3. Ringkasan tiga metode ------------------------------ */
const SUARA_R1 = "Mari kita ringkas tiga metode dari luar tadi.";
const SUARA_R2 = "One-to-One: satu benda dipasangkan dengan satu angka, tanpa terlewat.";
const SUARA_R3 = "Cardinality: angka terakhir adalah banyaknya. Subitizing: kenali yang sedikit sekilas.";
const SUARA_R4 = "Ketiganya membantu Igil, Kaka, dan Abang berhitung dari nol sampai sepuluh. Terima kasih sudah belajar.";
const DESKRIPSI = ["satu benda, satu angka, tanpa terlewat", "angka terakhir adalah banyaknya", "kenali yang sedikit sekilas"];
const kartuMetode = (i: number) => [kotak(`rm${i}-k`, 14, 34 + i * 54, 272, 46, WARNA_METODE[i], W.biru, { rx: 8, tebal: 1.5 }), teks(`rm${i}-n`, 150, 34 + i * 54 + 19, `${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`, 10, W.biru)];
const deskripsi = (i: number) => teks(`rm${i}-d`, 150, 34 + i * 54 + 36, DESKRIPSI[i], 8.8, W.merah);

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Ringkasan metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Ringkasan")), tambah("ringkas", ...kartuMetode(0)), tambah("tiga", ...kartuMetode(1)), tambah("luar", ...kartuMetode(2))),
    k(SUARA_R2, sorotkan("One-to-One:", "rm0-k"), tambah("dipasangkan", deskripsi(0))),
    k(SUARA_R3, sorotkan("Cardinality:", "rm1-k"), tambah("terakhir", deskripsi(1)), tambah("Subitizing:", deskripsi(2)), sorotkan("kenali", "rm2-k")),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Terima kasih"), emo("ow", 90, 100, E.kaka, 40), emo("ow2", 150, 100, E.igil, 44), emo("ow3", 210, 100, E.abang, 40)),
      tambah("nol", ...kartu("rz", 60, 124, 180, 34, W.emas, ["berhitung 0 sampai 10"], 11)),
      tambah("Terima", teks("rt", 150, 184, "Sampai jumpa!", 12, W.ungu)),
    ),
  ],
};
