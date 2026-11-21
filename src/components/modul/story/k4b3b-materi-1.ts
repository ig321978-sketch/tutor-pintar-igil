import type { AdeganStory, Obj } from "./logika-story";
import { E, W, bil, busur, emo, judul, kartu, kotak, lapangan, barisKursi, panah, panggung, teks, tokoh } from "./k4b3b-gambar";
import { hapus, k, sorotkan, tambah, ubah } from "./k4b3b-bantu";

/*
 * Cerita orisinal IGIL "Barisan Kursi Pak Gunawan" (Kelas 4 Bab 3 Sub-Bab B, pola bilangan), akhir cerita Orkestra Angklung Kampung Senandung.
 * Naskah suara dari naskah/story-naskah-k4b3b.md. Bagian ini: menata lapangan, mencari beda (dua belas, lima belas, delapan belas bertambah tiga), dan melanjutkan pola (baris keempat dua puluh satu).
 */

/** Tiga baris kursi 12, 15, dan 18 (satu kotak satu kursi) mulai pojok kiri (24, y0), jarak antarbaris 20: baris `${id}1`, `${id}2`, `${id}3`. */
export const KURSI_TIGA = [12, 15, 18] as const;
export const tigaBaris = (id: string, y0: number): Obj[] => KURSI_TIGA.flatMap((n, i) => barisKursi(`${id}${i + 1}`, 24, y0 + i * 20, n));
/** Nomor baris (1, 2, 3) di kiri dan banyak kursi (12, 15, 18) di kanan tiga baris kursi. */
export const labelBaris = (id: string, y0: number): Obj[] => [
  ...KURSI_TIGA.flatMap((n, i) => [teks(`${id}n${i + 1}`, 12, y0 + 8 + i * 20, String(i + 1), 9, W.coklat), teks(`${id}b${i + 1}`, 212, y0 + 8 + i * 20, String(n), 12, W.biru)]),
];

/* ------------------------------ 1. Menata lapangan ------------------------------ */
const SUARA_P1 = "Pak Gunawan, penata panggung berompi oranye, mengajak Satria, Laras, dan Genta menata lapangan.";
const SUARA_P2 = "Kursi penonton harus dipasang berbaris, dan jumlah kursi tiap baris dicatat di papan.";
const SUARA_P3 = "Baris pertama berisi dua belas kursi, baris kedua lima belas, dan baris ketiga delapan belas.";

export const ADEGAN_PANGGUNG: AdeganStory = {
  id: "panggung",
  judul: "Pak Gunawan menata lapangan",
  sumber: "Materi: menata lapangan konser",
  latar: "#F7FEE7",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Menata Lapangan"), ...lapangan("lp", 150)),
      tambah("Gunawan", ...tokoh("pg", 262, 184, "Pak Gunawan")),
      tambah("panggung", ...panggung("pt", 70, 100, 150, "PANGGUNG")),
      tambah("Satria", ...tokoh("sa", 36, 184, "Satria")),
      tambah("Laras", ...tokoh("la", 84, 184, "Laras")),
      tambah("Genta", ...tokoh("ge", 132, 184, "Genta")),
    ),
    k(
      SUARA_P2,
      tambah("dipasang", ...[0, 1, 2].map((i) => kotak(`bk${i}`, 20, 44 + i * 20, 180, 14, undefined, W.coklat, { putus: true, tebal: 1.2, z: 0 }))),
      tambah("dicatat", kotak("cp", 208, 30, 86, 58, W.krem, W.coklat, { rx: 4, tebal: 2, z: 1 }), teks("ct", 251, 44, "CATATAN", 9, W.coklat, { z: 2 })),
      tambah("papan", ...[0, 1, 2].map((i) => teks(`c${i + 1}`, 251, 58 + i * 12, `baris ${i + 1} : ?`, 8, W.biru, { z: 2 }))),
    ),
    k(
      SUARA_P3,
      tambah("pertama", ...barisKursi("r1", 24, 47, 12)),
      ubah("dua", { id: "c1", isi: "baris 1 : 12" }),
      tambah("kedua", ...barisKursi("r2", 24, 67, 15)),
      ubah("lima", { id: "c2", isi: "baris 2 : 15" }),
      tambah("ketiga", ...barisKursi("r3", 24, 87, 18)),
      ubah("delapan", { id: "c3", isi: "baris 3 : 18" }),
    ),
  ],
};

/* ------------------------------ 2. Mencari beda ------------------------------ */
const SUARA_B1 = "Laras menghitung berapa kursi yang ditambah dari satu baris ke baris berikutnya.";
const SUARA_B2 = "Dari dua belas ke lima belas bertambah tiga, dari lima belas ke delapan belas juga tiga.";
const SUARA_B3 = "Selisih tetap yang sama itu disebut beda, dan pola ini membesar karena bedanya tambah.";

export const ADEGAN_BEDA: AdeganStory = {
  id: "beda",
  judul: "Mencari beda antarbaris",
  sumber: "Materi: beda tetap",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Mencari Beda"), ...lapangan("lp", 150), ...tigaBaris("r", 47), ...labelBaris("l", 47)),
      tambah("Laras", ...tokoh("la", 36, 184, "Laras")),
      tambah("ditambah", teks("q1", 252, 66, "+?", 13, W.merah), teks("q2", 252, 86, "+?", 13, W.merah)),
    ),
    k(
      SUARA_B2,
      ubah("tiga", { id: "q1", isi: "+3", warna: W.hijauTua }),
      tambah("bertambah", panah("p1", 232, 59, 0, 10, W.hijauTua, 2, { z: 4 })),
      tambah("juga", panah("p2", 232, 79, 0, 10, W.hijauTua, 2, { z: 4 })),
      ubah("tiga@2", { id: "q2", isi: "+3", warna: W.hijauTua }),
    ),
    k(
      SUARA_B3,
      tambah("Selisih", ...kartu("bd", 60, 112, 92, 26, W.krem, ["beda : +3"], 11)),
      tambah("membesar", emo("up", 228, 112, E.naik, 20), teks("mb", 228, 128, "membesar", 11, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ 3. Melanjutkan pola ------------------------------ */
const SUARA_L1 = "Bilangan berikutnya kita dapatkan dengan menambah tiga lagi, jadi baris keempat dua puluh satu kursi.";
const SUARA_L2 = "Genta menarik rantai loncat di papan, dan tiap loncatan bertanda tambah tiga.";
const SUARA_L3 = "Dengan begitu, pola bilangan bisa dilanjutkan tanpa menggambar kursinya.";
const XR = [40, 110, 180, 250];

export const ADEGAN_LANJUT: AdeganStory = {
  id: "lanjut",
  judul: "Melanjutkan pola bilangan",
  sumber: "Materi: melanjutkan pola",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Melanjutkan Pola"), ...lapangan("lp", 150), ...bil("c0", XR[0], 100, "12"), ...bil("c1", XR[1], 100, "15"), ...bil("c2", XR[2], 100, "18"), ...busur("a0", XR[0], XR[1], 86, 22, "+3"), ...busur("a1", XR[1], XR[2], 86, 22, "+3")),
      tambah("menambah", ...busur("a2", XR[2], XR[3], 86, 22, "+3", W.merah, true)),
      tambah("keempat", ...bil("c3", XR[3], 100, "?", 12, 14, true)),
      ubah("dua", { id: "c3-t", isi: "21", warna: W.merah }),
    ),
    k(
      SUARA_L2,
      tambah("Genta", ...tokoh("ge", 36, 184, "Genta")),
      sorotkan("rantai", "a0", "a1", "a2"),
      tambah("tiga", teks("tr", 150, 132, "tiap loncatan : +3", 11, W.coklat)),
    ),
    k(
      SUARA_L3,
      hapus(0, "tr"),
      tambah("pola", teks("pb", 150, 130, "pola bilangan", 12, W.ungu)),
      tambah("tanpa", teks("tg", 150, 146, "tanpa gambar kursi", 10, W.coklat)),
      tambah("menggambar", emo("ok", 250, 138, E.benar, 20)),
    ),
  ],
};
