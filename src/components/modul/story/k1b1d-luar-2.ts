import type { AdeganStory } from "./logika-story";
import { W, emo, judul, kartu, kotak, teks } from "./k1b1d-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k1b1d-bantu";
import { NAMA_METODE, NAMA_METODE_ID, WARNA_METODE, kepala } from "./k1b1d-luar-1";

const OWL = "\u{1F989}";

/* ------------------------------ 1. Simbol Matematika: konsep ------------------------------ */
const SUARA_S1 = "Metode ketiga, CPA Abstract, atau Simbol Matematika. Tahap terakhir ini memakai angka dan tulisan.";
const SUARA_S2 = "Anak tidak lagi memerlukan benda atau gambar. Cukup angka yang ditulis di kertas.";
const SUARA_S3 = "Contohnya, lima dipisahkan menjadi dua dan tiga, lalu ditulis hanya dengan angka.";
const SUARA_S4 = "Tahap ini baru cocok kalau tahap benda dan tahap gambar sudah dipahami dengan baik.";

export const ADEGAN_LUAR_SIMBOL: AdeganStory = {
  id: "luar-simbol",
  judul: "Simbol Matematika: memakai angka",
  sumber: "Metode luar: CPA Abstract",
  latar: "#FAF5FF",
  ketukan: [
    k(SUARA_S1, tambah("ketiga,", ...kepala(2)), tambah("angka", teks("s1", 150, 110, "5  2  3", 40, W.merah))),
    k(SUARA_S2, tambah("benda", emo("s2", 60, 160, "\u{1F6AB}", 30)), tambah("Cukup", teks("s3", 150, 160, "angka saja", 12, W.ungu))),
    k(SUARA_S3, bersih(0), tambah(0, ...kepala(2)), tambah("Contohnya,", ...kartu("s4", 50, 70, 200, 40, W.emas, ["5 jadi 2 dan 3"], 14)), tambah("ditulis", emo("s5", 150, 150, "✏️", 36))),
    k(SUARA_S4, bersih(0), tambah(0, ...kepala(2)), tambah("benda", emo("s6", 60, 110, "✋", 36), emo("s7", 150, 110, "\u{1F5BC}", 36)), tambah("sudah", emo("s8", 240, 110, "✅", 36), teks("s9", 240, 140, "angka", 10, W.merah))),
  ],
};

/* ------------------------------ 2. Simbol Matematika: terapan ------------------------------ */
const SUARA_T1 = "Terapkan pada bilangan sepuluh. Kita tulis pasangannya dengan angka saja.";
const SUARA_T2 = "Satu dan sembilan. Dua dan delapan. Dua pasangan pertama sudah tertulis.";
const SUARA_T3 = "Tiga dan tujuh. Empat dan enam. Dua pasangan berikutnya.";
const SUARA_T4 = "Lima dan lima. Itulah semua pasangan sepuluh, ditulis dengan angka.";
const PASANG = ["1 dan 9", "2 dan 8", "3 dan 7", "4 dan 6", "5 dan 5"];
const baris = (i: number) => teks(`sp${i}`, 150, 92 + i * 20, PASANG[i], 15, W.merah);

export const ADEGAN_LUAR_SIMBOL_TERAPAN: AdeganStory = {
  id: "luar-simbol-terapan",
  judul: "Simbol Matematika: menulis pasangan sepuluh",
  sumber: "Metode luar: CPA Abstract, terapan",
  latar: "#FAF5FF",
  ketukan: [
    k(SUARA_T1, tambah("pada", ...kepala(2)), tambah("sepuluh.", teks("t10", 150, 66, "pasangan 10", 11, W.ungu)), tambah("angka", emo("tp", 262, 120, "✏️", 30))),
    k(SUARA_T2, tambah("Satu", baris(0)), tambah("Dua", baris(1))),
    k(SUARA_T3, tambah("Tiga", baris(2)), tambah("Empat", baris(3))),
    k(SUARA_T4, tambah("Lima", baris(4)), sorotkan("semua", "sp0", "sp1", "sp2", "sp3", "sp4"), ubah("angka.", { id: "tp", x: 40 })),
  ],
};

/* ------------------------------ 3. Ringkasan tiga metode ------------------------------ */
const SUARA_R1 = "Mari kita ringkas tiga metode dari luar tadi.";
const SUARA_R2 = "Benda Nyata Dulu: mulai dari benda yang bisa dipegang.";
const SUARA_R3 = "Gambar Representasi: pindah ke gambar atau diagram. Simbol Matematika: akhiri dengan angka.";
const SUARA_R4 = "Tiga tahap ini membantu kita memahami pasangan bilangan sampai sepuluh. Terima kasih sudah belajar.";
const DESKRIPSI = ["mulai dari benda yang bisa dipegang", "pindah ke gambar atau diagram", "akhiri dengan angka"];
const kartuMetode = (i: number) => [
  kotak(`rm${i}-k`, 14, 34 + i * 54, 272, 46, WARNA_METODE[i], W.biru, { rx: 8, tebal: 1.5 }),
  teks(`rm${i}-n`, 150, 34 + i * 54 + 19, `${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`, 8.6, W.biru),
];
const deskripsi = (i: number) => teks(`rm${i}-d`, 150, 34 + i * 54 + 36, DESKRIPSI[i], 8.8, W.merah);

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Ringkasan metode luar",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Ringkasan")), tambah("ringkas", ...kartuMetode(0)), tambah("tiga", ...kartuMetode(1)), tambah("luar", ...kartuMetode(2))),
    k(SUARA_R2, sorotkan("Benda", "rm0-k"), tambah("dipegang.", deskripsi(0))),
    k(SUARA_R3, sorotkan("Gambar", "rm1-k"), tambah("diagram.", deskripsi(1)), tambah("Simbol", deskripsi(2)), sorotkan("akhiri", "rm2-k")),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Terima kasih"), emo("ow", 150, 100, OWL, 54)),
      tambah("pasangan", ...kartu("rz", 50, 124, 200, 34, W.emas, ["pasangan sampai 10"], 11)),
      tambah("Terima", teks("rt", 150, 184, "Sampai jumpa!", 12, W.ungu)),
    ),
  ],
};
