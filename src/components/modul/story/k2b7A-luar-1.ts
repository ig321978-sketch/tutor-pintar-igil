import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, deretHitung, emo, idDeret, judul, kartu, teks } from "./k2b7A-gambar";
import { bersih, hapus, idPilihan, idx, k, pilihKata, redamkan, sorotkan, tambah, ubah } from "./k2b7A-bantu";

export const NAMA_METODE_ID = ["Hitung sampai 100", "Puluhan dan Satuan", "Tabel Seratus"];
export const WARNA_METODE = [W.hijauMuda, W.langit, W.pink];

/** Kepala metode: kartu nama di bagian atas adegan konsep dan penerapan. */
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`Metode ${i + 1}: ${NAMA_METODE_ID[i]}`], 8.8);

/** Deret hitung dengan selisih tetap `d`: kotak bilangan dan tulisan "+d" di antara kotak. Id `gh-k${i}`, `gh-n${i}`, `gh-d${i}`. */
export function deretLompat(nilai: (number | "?")[], d: number, y: number): Obj[] {
  const n = nilai.length;
  const x0 = (300 - (n * 46 - 6)) / 2;
  const sel = deretHitung(nilai, y);
  const tanda = nilai.slice(1).map((_, i) => teks(`gh-d${i + 1}`, x0 + i * 46 + 43, y - 6, `+${d}`, 9, W.ungu));
  return [...sel, ...tanda];
}
export const idDeretLompat = (n: number): string[] => [...idDeret(n), ...Array.from({ length: n - 1 }, (_, i) => `gh-d${i + 1}`)];
/** Sel ke-`i` (1..n) dari `deretLompat`, untuk muncul satu per satu. */
export const selDeret = (objs: Obj[], i: number): Obj[] => objs.filter((o) => o.id === `gh-k${i}` || o.id === `gh-n${i}` || o.id === `gh-d${i - 1}`);

/* ------------------------------ 1. Pembuka metode luar ------------------------------ */
const SUARA_O1 = "Guru di banyak negara punya cara lain untuk belajar membilang. Di video ini kita lihat tiga metode dari luar.";
const SUARA_O2 = "Tiga metode itu bernama Hitung sampai seratus, Puluhan dan Satuan, dan satu lagi, Tabel Seratus.";
const SUARA_O3 = "Semua metode ini menjawab satu pertanyaan. Bagaimana cara menghitung dan membaca banyak benda sampai seratus?";
const SUARA_O4 = "Kita memakai bilangan dan gambar di layar. Kamu cukup mengetuk, melihat dengan teliti, dan memilih jawaban.";
const SUARA_O5 = "Ada yang melompat puluhan, ada yang memakai batang, dan ada yang memakai tabel. Siap? Ayo kita mulai dengan metode pertama.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode dari luar untuk membilang",
  sumber: "Metode luar: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_O1, tambah(0, judul("Tiga metode dari luar")), tambah(idx(SUARA_O1, "negara"), emo("gl", 150, 110, "\u{1F30D}", 50)), tambah(idx(SUARA_O1, "tiga"), ...kartu("pk", 50, 140, 200, 32, W.emas, ["3 metode dari luar"], 11))),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("Tiga metode")),
      tambah(idx(SUARA_O2, "Hitung"), ...kartu("m0", 20, 40, 260, 38, WARNA_METODE[0], [`1. ${NAMA_METODE_ID[0]}`], 11)),
      tambah(idx(SUARA_O2, "Puluhan"), ...kartu("m1", 20, 88, 260, 38, WARNA_METODE[1], [`2. ${NAMA_METODE_ID[1]}`], 11)),
      tambah(idx(SUARA_O2, "Tabel"), ...kartu("m2", 20, 136, 260, 38, WARNA_METODE[2], [`3. ${NAMA_METODE_ID[2]}`], 11)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Satu pertanyaan")),
      tambah(idx(SUARA_O3, "satu"), emo("i1", 60, 84, "\u{1F522}", 34), emo("i2", 150, 84, "❓", 34), emo("i3", 240, 84, "\u{1F440}", 34)),
      tambah(idx(SUARA_O3, "Bagaimana"), ...kartu("iq", 20, 112, 260, 52, W.emas, ["bagaimana cara menghitung dan", "membaca banyak benda?"], 10)),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Alat bantu hari ini")),
      tambah(idx(SUARA_O4, "layar."), emo("a1", 70, 100, "\u{1F4E6}", 36), emo("a2", 150, 100, "\u{1F522}", 36), emo("a3", 230, 100, "\u{1F4CA}", 36)),
      tambah(idx(SUARA_O4, "mengetuk,"), emo("tg", 150, 150, "\u{1F446}", 24)),
      tambah(idx(SUARA_O4, "memilih"), teks("al-t", 150, 184, "ketuk, lihat, lalu pilih", 10, W.ungu)),
    ),
    k(
      SUARA_O5,
      bersih(0),
      tambah(0, judul("Lompat, batang, dan tabel")),
      tambah(idx(SUARA_O5, "melompat"), teks("kt0", 150, 70, "melompat puluhan", 14, W.ungu)),
      tambah(idx(SUARA_O5, "batang,"), teks("kt1", 150, 100, "memakai batang", 14, W.ungu)),
      tambah(idx(SUARA_O5, "tabel."), teks("kt2", 150, 130, "memakai tabel", 14, W.ungu)),
      tambah(idx(SUARA_O5, "pertama."), emo("ow", 150, 182, OWL, 30)),
    ),
  ],
};

/* ------------------------------ 2. Hitung sampai 100: konsep ------------------------------ */
const D1 = deretLompat([30, 40, 50, 60], 10, 90);
const D2 = deretLompat([56, 57, 58], 1, 90);
const D3 = deretLompat([57, 58, 59, 60], 1, 90);
const SUARA_H1 = "Metode pertama bernama Hitung sampai seratus. Kita menghitung maju dengan melihat pola bilangannya.";
const SUARA_H2 = "Langkah pertama, lompat sepuluh demi sepuluh. Dari tiga puluh ke empat puluh, lalu lima puluh, lalu enam puluh.";
const SUARA_H3 = "Langkah kedua, kalau sudah dekat, lompat satu demi satu. Lima puluh enam, lima puluh tujuh, lima puluh delapan.";
const SUARA_H4 = "Langkah ketiga, sesudah sembilan, puluhannya naik. Sesudah lima puluh sembilan, kita sampai di enam puluh.";
const SUARA_H5 = "Jadi Hitung sampai seratus berarti melompat puluhan, lalu melanjutkan dengan satuan.";

export const ADEGAN_LUAR_HITUNG: AdeganStory = {
  id: "luar-hitung",
  judul: "Hitung sampai 100: lompat puluhan",
  sumber: "Metode luar: Hitung sampai 100",
  latar: "#F0FDF4",
  ketukan: [
    k(SUARA_H1, tambah(0, ...kepala(0)), tambah(idx(SUARA_H1, "pola"), emo("ng", 150, 110, "\u{1F4C8}", 44))),
    k(
      SUARA_H2,
      hapus(0, "ng"),
      tambah(idx(SUARA_H2, "tiga"), ...selDeret(D1, 1)),
      tambah(idx(SUARA_H2, "empat"), ...selDeret(D1, 2)),
      tambah(idx(SUARA_H2, "lima"), ...selDeret(D1, 3)),
      tambah(idx(SUARA_H2, "enam"), ...selDeret(D1, 4)),
    ),
    k(
      SUARA_H3,
      hapus(0, ...idDeretLompat(4)),
      tambah(idx(SUARA_H3, "enam"), ...selDeret(D2, 1)),
      tambah(idx(SUARA_H3, "tujuh,"), ...selDeret(D2, 2)),
      tambah(idx(SUARA_H3, "delapan."), ...selDeret(D2, 3)),
    ),
    k(
      SUARA_H4,
      hapus(0, ...idDeretLompat(3)),
      tambah(idx(SUARA_H4, "sembilan,"), ...selDeret(D3, 1), ...selDeret(D3, 2), ...selDeret(D3, 3)),
      tambah(idx(SUARA_H4, "enam"), ...selDeret(D3, 4)),
      sorotkan(idx(SUARA_H4, "puluh.", 2), "gh-k3", "gh-k4"),
    ),
    k(
      SUARA_H5,
      hapus(0, ...idDeretLompat(4)),
      tambah(idx(SUARA_H5, "melompat"), ...kartu("hr", 30, 80, 240, 34, W.emas, ["lompat puluhan, lalu satuan"], 12)),
      tambah(idx(SUARA_H5, "satuan."), emo("hz", 150, 156, "\u{1F680}", 34)),
    ),
  ],
};

/* ------------------------------ 3. Hitung sampai 100: terapan ------------------------------ */
const T = deretLompat([56, 57, 58, 59, "?"], 1, 80);
const SUARA_I1 = "Terapkan pada soal ini. Kira menghitung maju satu demi satu: lima puluh enam, lima puluh tujuh, lima puluh delapan, lima puluh sembilan.";
const SUARA_I2 = "Bilangan berikutnya berapa? Ketuk jawaban yang tepat.";
const SUARA_I3 = "Betul! Sesudah lima puluh sembilan datang enam puluh. Puluhannya naik, dan satuannya kembali ke nol.";
const SUARA_I4 = "Hitungan itu terus naik satu demi satu. Sesudah enam puluh, datang enam puluh satu, lalu enam puluh dua.";

export const ADEGAN_LUAR_HITUNG_TERAPAN: AdeganStory = {
  id: "luar-hitung-terapan",
  judul: "Hitung sampai 100: hitungan Kira",
  sumber: "Metode luar: Hitung sampai 100",
  latar: "#ECFCCB",
  ketukan: [
    k(
      SUARA_I1,
      tambah(0, ...kepala(0)),
      tambah(idx(SUARA_I1, "enam"), ...selDeret(T, 1)),
      tambah(idx(SUARA_I1, "tujuh,"), ...selDeret(T, 2)),
      tambah(idx(SUARA_I1, "delapan,"), ...selDeret(T, 3)),
      tambah(idx(SUARA_I1, "sembilan."), ...selDeret(T, 4), ...selDeret(T, 5)),
    ),
    k(SUARA_I2, tambah(idx(SUARA_I2, "Bilangan"), teks("tanya", 150, 134, "bilangan berikutnya?", 12, W.ungu)), tambah(idx(SUARA_I2, "jawaban"), ...pilihKata(146, ["lima puluh", "tujuh puluh", "enam puluh"], 11))),
    k(SUARA_I3, sorotkan(idx(SUARA_I3, "Betul!"), "c3-k"), ubah(idx(SUARA_I3, "enam"), { id: "gh-n5", isi: "60" }, { id: "gh-k5", warna: W.hijauMuda })),
    k(SUARA_I4, redamkan(0, "c3-k"), hapus(0, "tanya", ...idPilihan(3)), tambah(idx(SUARA_I4, "terus"), ...kartu("ht", 60, 140, 180, 30, W.emas, ["60, 61, 62"], 14))),
  ],
};

/* ------------------------------ 7. Ringkasan metode luar ------------------------------ */
const SUARA_R1 = "Mari kita ringkas tiga metode dari luar. Semuanya membantu kita membilang sampai seratus.";
const SUARA_R2 = "Metode Hitung sampai seratus, melompat sepuluh demi sepuluh, lalu satu demi satu.";
const SUARA_R3 = "Metode Puluhan dan Satuan, hitung batang puluhan dan kotak satuan, lalu gabungkan.";
const SUARA_R4 = "Metode Tabel Seratus, turun satu baris tambah sepuluh, ke kanan satu kotak tambah satu.";
const SUARA_R5 = "Pilih metode yang kamu suka, lalu periksa dengan metode lain. Hasilnya harus sama.";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga metode dari luar",
  sumber: "Metode luar: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(SUARA_R1, tambah(0, judul("Ringkasan")), tambah(idx(SUARA_R1, "ringkas"), ...kartu("r0", 14, 34, 272, 30, W.emas, ["3 metode dari luar"], 11))),
    k(SUARA_R2, tambah(idx(SUARA_R2, "Hitung"), ...kartu("r1", 14, 72, 272, 34, WARNA_METODE[0], [NAMA_METODE_ID[0], "lompat sepuluh, lalu satu"], 9.2))),
    k(SUARA_R3, tambah(idx(SUARA_R3, "Puluhan"), ...kartu("r2", 14, 114, 272, 34, WARNA_METODE[1], [NAMA_METODE_ID[1], "batang puluhan dan kotak satuan"], 9.2))),
    k(SUARA_R4, tambah(idx(SUARA_R4, "Tabel"), ...kartu("r3", 14, 156, 272, 34, WARNA_METODE[2], [NAMA_METODE_ID[2], "turun tambah sepuluh, kanan tambah satu"], 9.2))),
    k(SUARA_R5, bersih(0), tambah(0, judul("Hasilnya harus sama"), emo("rw", 150, 100, OWL, 54)), tambah(idx(SUARA_R5, "sama."), emo("rk", 150, 160, "✅", 30))),
  ],
};
