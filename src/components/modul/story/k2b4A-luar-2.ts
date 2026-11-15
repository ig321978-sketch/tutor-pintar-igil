import type { AdeganStory, Aksi } from "./logika-story";
import { PETA_LUAR, W, benda, emo, idPetak, kartu, lingkaranBiru, panah, petaKotak, pusatPetak, teks } from "./k2b4A-gambar";
import { hapus, idx, k, pilihKata, redamkan, sorotkan, tambah, ubah } from "./k2b4A-bantu";
import { kepala } from "./k2b4A-luar-1";

const nyala = (at: string | number | undefined, b: number, kol: number): Aksi => ubah(at, { id: idPetak(b, kol), sorot: true, warna: W.krem });
const padam = (at: string | number | undefined, b: number, kol: number): Aksi => ubah(at, { id: idPetak(b, kol), sorot: false, warna: W.putih });
const G = PETA_LUAR;

/* ------------------------------ 5. Tampak Peta: konsep ------------------------------ */
const SUARA_P1 = "Metode kedua bernama Tampak Peta. Kita membayangkan melihat dari atas, seperti burung yang terbang.";
const SUARA_P2 = "Dari atas, benda terlihat seperti petak pada peta. Lingkaran biru ada di baris pertama, kolom ketiga.";
const SUARA_P3 = "Petak di bawah lingkaran biru ada di baris kedua, kolom ketiga.";
const SUARA_P4 = "Petak di kiri lingkaran biru ada di baris pertama, kolom kedua.";
const SUARA_P5 = "Tidak ada petak di kanan lingkaran biru, sebab lingkaran biru sudah di tepi peta.";

export const ADEGAN_LUAR_PETA: AdeganStory = {
  id: "luar-peta",
  judul: "Tampak Peta: lihat dari atas",
  sumber: "Metode luar: Tampak Peta",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_P1, tambah(0, ...kepala(1)), tambah(idx(SUARA_P1, "atas,"), ...petaKotak(G)), tambah(idx(SUARA_P1, "terbang."), emo("br", 252, 100, "\u{1F426}", 28), teks("dt", 150, 172, "dilihat dari atas", 10, W.ungu))),
    k(SUARA_P2, tambah(idx(SUARA_P2, "ketiga."), lingkaranBiru(1, 3, G)), hapus(idx(SUARA_P2, "Dari"), "br")),
    k(SUARA_P3, nyala(idx(SUARA_P3, "kedua,"), 2, 3)),
    k(SUARA_P4, padam(0, 2, 3), nyala(idx(SUARA_P4, "pertama,"), 1, 2)),
    k(SUARA_P5, padam(0, 1, 2), tambah(idx(SUARA_P5, "kanan"), emo("x0", 224, pusatPetak(1, 3, G).y + 5, "❌", 16)), tambah(idx(SUARA_P5, "tepi"), teks("tp", 150, 192, "lingkaran biru di tepi peta", 9, W.merah))),
  ],
};

/* ------------------------------ 6. Tampak Peta: terapan ------------------------------ */
const SUARA_Q1 = "Terapkan pada peta ini. Lingkaran biru ada di baris ketiga, kolom kedua.";
const SUARA_Q2 = "Petak yang menyala ada di sebelah mana lingkaran biru? Ketuk kata yang tepat.";
const SUARA_Q3 = "Lihat peta dari atas. Petak yang menyala lebih tinggi daripada lingkaran biru.";
const SUARA_Q4 = "Betul! Petak yang menyala ada di atas lingkaran biru. Hebat!";

export const ADEGAN_LUAR_PETA_TERAPAN: AdeganStory = {
  id: "luar-peta-terapan",
  judul: "Tampak Peta: petak yang menyala",
  sumber: "Metode luar: Tampak Peta",
  latar: "#DBEAFE",
  ketukan: [
    k(SUARA_Q1, tambah(0, ...kepala(1)), tambah(idx(SUARA_Q1, "peta"), ...petaKotak(G)), tambah(idx(SUARA_Q1, "kedua."), lingkaranBiru(3, 2, G))),
    k(SUARA_Q2, nyala(idx(SUARA_Q2, "menyala"), 2, 2), tambah(idx(SUARA_Q2, "tepat."), ...pilihKata(162, ["atas", "kiri", "kanan"], 13))),
    k(SUARA_Q3, tambah(idx(SUARA_Q3, "tinggi"), panah("pq", pusatPetak(3, 2, G).x, pusatPetak(3, 2, G).y - 14, 0, -30, W.merah, 2.4))),
    k(SUARA_Q4, hapus(0, "pq"), sorotkan(idx(SUARA_Q4, "Betul!"), "c1-k"), tambah(idx(SUARA_Q4, "Hebat!"), emo("ok", 262, 100, "✅", 22))),
  ],
};

/* ------------------------------ 7. Acuan Patokan: konsep ------------------------------ */
const SUARA_K1 = "Metode ketiga bernama Acuan Patokan. Kita memilih satu benda sebagai patokan, lalu menyebut letak benda lain dari patokan itu.";
const SUARA_K2 = "Kelinci ada di sebelah kiri rumah.";
const SUARA_K3 = "Burung ada di atas rumah. Letaknya lebih tinggi daripada rumah.";
const SUARA_K4 = "Mobil-mobilan ada di depan rumah, sebab menutupi sebagian rumah.";
const SUARA_K5 = "Dengan patokan yang sama, semua letak jadi mudah dijelaskan.";

export const ADEGAN_LUAR_ACUAN: AdeganStory = {
  id: "luar-acuan",
  judul: "Acuan Patokan: sebut dari patokan",
  sumber: "Metode luar: Acuan Patokan",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_K1, tambah(0, ...kepala(2)), tambah(idx(SUARA_K1, "patokan,"), benda("rumah", 150, 112, 48), ...kartu("pk", 214, 162, 80, 22, W.emas, ["patokan"], 11)), sorotkan(idx(SUARA_K1, "patokan,"), "ob-rumah")),
    k(SUARA_K2, redamkan(0, "ob-rumah"), tambah(idx(SUARA_K2, "Kelinci"), benda("kelinci", 62, 112, 34)), sorotkan(idx(SUARA_K2, "kiri"), "ob-kelinci")),
    k(SUARA_K3, redamkan(0, "ob-kelinci"), tambah(idx(SUARA_K3, "Burung"), benda("burung", 150, 70, 30)), sorotkan(idx(SUARA_K3, "atas"), "ob-burung")),
    k(SUARA_K4, redamkan(0, "ob-burung"), tambah(idx(SUARA_K4, "Mobil-mobilan"), benda("mobil", 166, 134, 30, { z: 2 })), sorotkan(idx(SUARA_K4, "depan"), "ob-mobil")),
    k(SUARA_K5, redamkan(0, "ob-mobil"), sorotkan(idx(SUARA_K5, "patokan"), "ob-rumah"), tambah(idx(SUARA_K5, "dijelaskan."), emo("ok", 262, 80, "✅", 22))),
  ],
};

/* ------------------------------ 8. Acuan Patokan: terapan ------------------------------ */
const SUARA_M1 = "Terapkan pada soal ini. Wei melihat kupu-kupu dan bunga. Patokannya adalah bunga.";
const SUARA_M2 = "Kupu-kupu ada di sebelah mana bunga? Ketuk kata yang tepat.";
const SUARA_M3 = "Mulailah dari patokan, yaitu bunga. Lalu lihat ke arah kupu-kupu.";
const SUARA_M4 = "Betul! Kupu-kupu ada di sebelah kanan bunga. Hebat!";

export const ADEGAN_LUAR_ACUAN_TERAPAN: AdeganStory = {
  id: "luar-acuan-terapan",
  judul: "Acuan Patokan: kupu-kupu dan bunga",
  sumber: "Metode luar: Acuan Patokan",
  latar: "#FCE7F3",
  ketukan: [
    k(SUARA_M1, tambah(0, ...kepala(2)), tambah(idx(SUARA_M1, "kupu-kupu"), benda("kupu", 206, 100, 36)), tambah(idx(SUARA_M1, "bunga.", 1), benda("bunga", 96, 108, 40)), tambah(idx(SUARA_M1, "bunga.", 2), ...kartu("pk", 56, 130, 80, 20, W.emas, ["patokan"], 10))),
    k(SUARA_M2, tambah(idx(SUARA_M2, "tepat."), ...pilihKata(166, ["kiri", "kanan", "belakang"], 12))),
    k(SUARA_M3, sorotkan(idx(SUARA_M3, "bunga."), "ob-bunga"), redamkan(idx(SUARA_M3, "kupu-kupu."), "ob-bunga"), sorotkan(idx(SUARA_M3, "kupu-kupu."), "ob-kupu")),
    k(SUARA_M4, redamkan(0, "ob-kupu"), sorotkan(idx(SUARA_M4, "Betul!"), "c2-k"), tambah(idx(SUARA_M4, "Hebat!"), emo("ok", 262, 190, "✅", 22))),
  ],
};
