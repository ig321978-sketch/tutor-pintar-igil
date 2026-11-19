import type { AdeganStory, Obj } from "./logika-story";
import { E, W, deretPayung, emo, garis, judul, kartu, kotak, laut, lentera, papanJadwal, pasir, payung, teks, tokoh } from "./k4b1i-gambar";
import { hapus, k, sorotkan, tambah } from "./k4b1i-bantu";

/*
 * Cerita orisinal IGIL "Papan Jadwal Kak Yoga" (Kelas 4 Bab 1 Sub-Bab I, faktor dan kelipatan), akhir cerita Penginapan Pulau Karang Indah.
 * Naskah suara dari naskah/story-naskah-k4b1i.md. Bagian ini: pantai dan payung, faktor, dan salah langkah Satria (faktor 24 hanya 2, 3, 4, 6).
 */

/* ------------------------------ 1. Pantai ------------------------------ */
const SUARA_P1 = "Pagi terakhir di pulau, Kak Yoga menunggu di pantai dengan banyak payung warna-warni.";
const SUARA_P2 = "Ia ingin menata dua puluh empat payung dalam baris yang sama banyak.";
const SUARA_P3 = "Ia juga ingin menyusun jadwal perahu, dan meminta bantuan ketiga anak.";

export const ADEGAN_PANTAI: AdeganStory = {
  id: "pantai",
  judul: "Pagi terakhir di pantai",
  sumber: "Materi: pantai dan payung",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Pantai Karang Indah"), ...pasir("ps", 150)),
      tambah("pulau", ...laut("lt", 30, 150), emo("pk", 262, 70, E.pohon, 20)),
      tambah("Yoga", ...tokoh("ky", 52, 184, "Kak Yoga")),
      tambah("payung", ...payung("pa", 150, 152, 1.1, "#EF4444"), ...payung("pb", 180, 146, 1.1, "#3B82F6"), ...payung("pc", 210, 152, 1.1, "#22C55E"), ...payung("pd", 240, 146, 1.1, "#F59E0B")),
      tambah("warna", ...payung("pe", 165, 168, 1, "#A855F7"), ...payung("pf", 225, 166, 1, "#EC4899")),
    ),
    k(
      SUARA_P2,
      tambah("empat", kotak("pn", 150, 34, 140, 72, W.putih, W.biru, { rx: 6, z: 1 }), teks("n24", 220, 50, "24 payung", 11, W.merah, { z: 2 })),
      tambah("baris", garis("bg1", 162, 70, 116, 0, W.biru, 1.4, { putus: true, z: 2 }), garis("bg2", 162, 90, 116, 0, W.biru, 1.4, { putus: true, z: 2 })),
      tambah("sama", teks("sm", 220, 102, "sama banyak", 8.6, W.hijauTua, { z: 2 })),
    ),
    k(
      SUARA_P3,
      tambah("jadwal", ...papanJadwal("pj", 70, 34, 70, 22, "jadwal", 9)),
      tambah("perahu", emo("pr", 106, 90, E.perahu, 18)),
      tambah("meminta", ...tokoh("ph", 256, 184, "Pak Hendro")),
      tambah("anak", ...tokoh("sa", 112, 184, "Satria"), ...tokoh("la", 160, 184, "Laras"), ...tokoh("ge", 208, 184, "Genta")),
    ),
  ],
};

/* ------------------------------ 2. Faktor ------------------------------ */
const SUARA_F1 = "Genta menyusun dua puluh empat payung menjadi dua baris, masing-masing dua belas.";
const SUARA_F2 = "Dua dan dua belas dua-duanya faktor dari dua puluh empat.";
const SUARA_F3 = "Faktor adalah bilangan yang membagi habis bilangan itu, tanpa sisa.";
const DUA_BARIS = deretPayung("pj", 40, 78, 12, 2, 20, 26, 0.6);

export const ADEGAN_FAKTOR: AdeganStory = {
  id: "faktor",
  judul: "Dua dan dua belas faktor dua puluh empat",
  sumber: "Materi: faktor",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, judul("Menyusun Payung"), ...pasir("ps", 150), ...tokoh("ge", 36, 184, "Genta")),
      tambah("empat", teks("n24", 150, 48, "24 payung", 12, W.merah)),
      tambah("baris", ...DUA_BARIS, teks("nd", 150, 142, "2 baris", 10, W.ungu)),
      tambah("belas", teks("n12a", 284, 82, "12", 9, W.hijauTua), teks("n12b", 284, 108, "12", 9, W.hijauTua)),
    ),
    k(
      SUARA_F2,
      hapus(0, "n24", "nd", "n12a", "n12b"),
      tambah(0, teks("f1", 150, 50, "2 x 12 = 24", 13, W.biru)),
      tambah("faktor", teks("fk", 150, 132, "FAKTOR", 14, W.merah)),
      sorotkan("faktor", "fk"),
      tambah("empat", teks("f2", 150, 152, "24 : 2 = 12", 11, W.ungu)),
    ),
    k(
      SUARA_F3,
      hapus(0, "f1"),
      tambah(0, ...kartu("df", 30, 36, 240, 26, W.krem, ["faktor: bilangan pembagi habis"], 9)),
      sorotkan("membagi", "f2"),
      tambah("sisa", teks("s0", 232, 152, "sisa 0", 12, W.hijauTua), emo("ok", 272, 152, E.benar, 16)),
    ),
  ],
};

/* ------------------------------ 3. Salah faktor ------------------------------ */
const SUARA_S1 = "Satria menyebut faktor dua puluh empat hanya dua, tiga, empat, dan enam.";
const SUARA_S2 = "Ia berseru, itu semuanya, tidak ada yang lain!";
const SUARA_S3 = "Kalau aku salah, aku menyalakan semua lentera sendirian, katanya.";
const SLOT = Array.from({ length: 8 }, (_, i) => kotak(`sl${i}`, 76 + i * 26, 64, 22, 24, undefined, W.abu, { rx: 4, tebal: 1.2, z: 1 }));
const lentera8 = (id: string, y: number): Obj[] => [garis(`${id}-tl`, 20, y - 8, 260, 0, W.coklat, 1.4, { z: 1 }), ...Array.from({ length: 8 }, (_, i) => lentera(`${id}${i}`, 44 + i * 30, y, false)).flat()];

export const ADEGAN_SALAH_FAKTOR: AdeganStory = {
  id: "salah-faktor",
  judul: "Satria menyebut faktor dua puluh empat",
  sumber: "Materi: salah langkah Satria",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Faktor 24 Menurut Satria"), ...pasir("ps", 150), ...tokoh("sa", 36, 184, "Satria"), kotak("bd", 70, 32, 214, 66, "#FEF3C7", W.coklat, { rx: 6, tebal: 1.6, z: 0 })),
      tambah("empat", teks("hd", 177, 50, "faktor 24", 10, W.coklat, { z: 2 }), ...SLOT),
      tambah("dua@2", ...kartu("c2", 102, 64, 22, 24, W.krem, ["2"], 11, { z: 2 })),
      tambah("tiga", ...kartu("c3", 128, 64, 22, 24, W.krem, ["3"], 11, { z: 2 })),
      tambah("empat@2", ...kartu("c4", 154, 64, 22, 24, W.krem, ["4"], 11, { z: 2 })),
      tambah("enam", ...kartu("c6", 180, 64, 22, 24, W.krem, ["6"], 11, { z: 2 })),
    ),
    k(
      SUARA_S2,
      tambah("berseru", kotak("bb", 56, 112, 120, 26, W.putih, W.merah, { rx: 8, z: 3 }), teks("bt", 116, 129, "Itu semuanya!", 9.4, W.merah, { z: 4 })),
      tambah("semuanya", emo("sr", 190, 128, E.seru, 20)),
      tambah("lain", teks("tl", 232, 112, "tidak ada lagi", 8.6, W.coklat, { z: 4 }), ...[0, 1, 2, 3].map((i) => kotak(`ko${i}`, 100 + i * 26, 62, 26, 28, undefined, W.hijau, { rx: 4, tebal: 2, z: 5 }))),
    ),
    k(
      SUARA_S3,
      hapus(0, "bb", "bt", "sr", "tl"),
      tambah("salah", emo("xs", 82, 160, E.salah, 20)),
      tambah("lentera", ...lentera8("lt", 124)),
      tambah("sendirian", emo("cp", 100, 160, E.capek, 18)),
      tambah("katanya", teks("tj", 220, 160, "taruhan: lentera", 9, W.merah)),
    ),
  ],
};
