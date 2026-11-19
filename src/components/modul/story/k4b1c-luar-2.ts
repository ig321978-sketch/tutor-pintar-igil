import type { AdeganStory, Obj } from "./logika-story";
import { E, W, bulat, emo, garis, garisBil, judul, kartu, kartuBil, kotak, panah, papanDermaga, teks, tokoh, xTanda } from "./k4b1c-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k4b1c-bantu";

/*
 * Cerita orisinal IGIL "Papan Dermaga Kak Tiara" (K4 Bab 1 Sub-Bab C), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b1c.md. Bagian ini: Number Line (Garis Bilangan), Card Sort (Urut Kartu), terapannya, dan ringkasan.
 */

/** Papan besar sebagai latar tulisan: pojok kiri-atas (8, 28), lebar 284, tinggi 112. */
const papan = (): Obj[] => papanDermaga("pd", 8, 28, 284, 112);
const GX = (i: number): number => xTanda(30, 240, i);
/** Titik data pada garis bilangan di tanda ke-`i` (garis pada tinggi 108). */
const titik = (id: string, i: number, warna = "#FACC15"): Obj => bulat(id, GX(i), 108, 6, warna, W.tinta, { tebal: 1.4, z: 4 });

/* ------------------------------ Number Line: konsep ------------------------------ */
const SUARA_G1 = "Cara kedua, Number Line, atau Garis Bilangan.";
const SUARA_G2 = "Kita menaruh bilangan pada sebuah garis lurus, dari kecil di kiri sampai besar di kanan.";
const SUARA_G3 = "Bilangan yang lebih ke kanan selalu lebih besar daripada bilangan di sebelah kirinya.";
const SUARA_G4 = "Jarak antar bilangan juga memperlihatkan seberapa jauh perbedaannya.";

export const ADEGAN_LUAR_GARIS: AdeganStory = {
  id: "luar-garis",
  judul: "Number Line: Garis Bilangan",
  sumber: "Metode global: Number Line (konsep)",
  latar: "#F0FDFA",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Cara 2: Number Line"), ...papan()),
      tambah("Number", teks("nm", 150, 62, "Number Line", 15, W.tinta)),
      tambah("Garis", teks("ni", 150, 88, "Garis Bilangan", 12, W.merah)),
      tambah("Bilangan.", ...garisBil("gl", 30, 118, 240)),
    ),
    k(
      SUARA_G2,
      bersih(0),
      tambah(0, judul("Garis Bilangan"), ...papan(), ...garisBil("gl", 30, 108, 240)),
      tambah("bilangan", titik("t1", 2)),
      tambah("garis", titik("t2", 5), titik("t3", 8)),
      tambah("kecil", teks("kc", 54, 130, "kecil", 9, W.tinta)),
      tambah("besar", teks("bs", 246, 130, "besar", 9, W.tinta)),
    ),
    k(
      SUARA_G3,
      tambah("kanan", panah("pn", 50, 84, 200, 0, W.merah, 2.6)),
      sorotkan("besar", "t3"),
      tambah("daripada", teks("lb", 222, 90, "lebih besar", 8, W.merah)),
      sorotkan("kirinya.", "t1"),
    ),
    k(
      SUARA_G4,
      hapus("Jarak", "pn", "lb", "kc", "bs"),
      tambah("Jarak", garis("j1", GX(2), 90, GX(5) - GX(2), 0, W.ungu, 2), teks("jk", 114, 82, "jarak", 9, W.ungu)),
      tambah("jauh", garis("j2", GX(5), 90, GX(8) - GX(5), 0, W.hijau, 2), teks("jj", 186, 82, "jauh", 9, W.hijau)),
      tambah("perbedaannya.", teks("sl", 150, 132, "selisih terlihat", 10, W.tinta)),
    ),
  ],
};

/* ------------------------------ Number Line: terapan ------------------------------ */
const SUARA_T1 = "Genta menandai tiga bilangan pengunjung pada sebuah garis panjang di dermaga.";
const SUARA_T2 = "Bilangan paling kanan terlihat jelas sebagai yang terbesar.";
const SUARA_T3 = "Cocok untuk melihat urutan sekaligus jarak antar bilangan.";
const SUARA_T4 = "Kurang cocok kalau bilangannya sangat besar dan jauh, karena garisnya harus sangat panjang.";

export const ADEGAN_LUAR_GARIS_TERAPAN: AdeganStory = {
  id: "luar-garis-terapan",
  judul: "Garis Bilangan: kapan cocok",
  sumber: "Metode global: Number Line (terapan)",
  latar: "#F0FDFA",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Garis Genta"), ...papan(), ...tokoh("gt", 40, 184, "Genta")),
      tambah("tiga", teks("n3", 150, 50, "3 bilangan", 11, W.tinta)),
      tambah("garis", ...garisBil("gl", 30, 108, 240)),
      tambah("dermaga.", titik("t1", 2), titik("t2", 5), titik("t3", 8), teks("v1", GX(2), 90, "3.200", 9, W.tinta), teks("v2", GX(5), 90, "3.500", 9, W.tinta), teks("v3", GX(8), 90, "3.800", 9, W.tinta)),
    ),
    k(
      SUARA_T2,
      sorotkan("kanan", "t3", "v3"),
      tambah("jelas", emo("mt", 262, 60, E.mata, 20)),
      tambah("terbesar.", teks("tb", GX(8), 130, "terbesar", 9, W.merah)),
    ),
    k(
      SUARA_T3,
      tambah("Cocok", emo("ok", 262, 60, E.benar, 20)),
      tambah("urutan", teks("ur", 78, 130, "urutan", 9, W.tinta)),
      tambah("jarak", garis("j1", GX(2), 76, GX(8) - GX(2), 0, W.ungu, 2)),
      tambah("bilangan.", teks("jr", 150, 66, "jarak antar bilangan", 9, W.ungu)),
      hapus("bilangan.", "mt", "tb"),
    ),
    k(
      SUARA_T4,
      bersih(0),
      tambah(0, judul("Bilangan Sangat Besar"), ...papan(), ...tokoh("gt", 40, 184, "Genta")),
      tambah("kalau", teks("e1", 40, 100, "1.000", 11, W.tinta), teks("e2", 260, 100, "9.900", 11, W.tinta)),
      tambah("jauh,", ...Array.from({ length: 11 }, (_, i) => garis(`pk${i}`, 24 + i * 25.2, 112, 0, 10, W.biru, 1.2)), garis("pg", 24, 117, 252, 0, W.biru, 2)),
      tambah("panjang.", teks("tp", 150, 70, "garis terlalu panjang", 11, W.merah), emo("xs", 262, 52, E.salah, 20)),
    ),
  ],
};

/* ------------------------------ Card Sort: konsep ------------------------------ */
const SUARA_C1 = "Cara ketiga, Card Sort, atau Urut Kartu.";
const SUARA_C2 = "Setiap bilangan kita tulis pada satu kartu.";
const SUARA_C3 = "Lalu kartu-kartu itu digeser sampai terurut dari terkecil ke terbesar, atau sebaliknya.";
const SUARA_C4 = "Kalau ada yang salah tempat, cukup geser kartunya.";
/** Posisi kiri tiga kartu. */
const XK = [24, 114, 204];
const geser = (n: number, tempat: number) => [
  { id: `c${n}-k`, x: XK[tempat] },
  { id: `c${n}-t0`, x: XK[tempat] + 35 },
];
const tigaKartu = (urut: [number, number, number]): Obj[] => urut.flatMap((n, i) => kartuBil(`c${n}`, XK[i], 56, n, "#FFFFFF", 70, 40, 16));

export const ADEGAN_LUAR_KARTU: AdeganStory = {
  id: "luar-kartu",
  judul: "Card Sort: Urut Kartu",
  sumber: "Metode global: Card Sort (konsep)",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 3: Card Sort"), ...papan()),
      tambah("Card", teks("nm", 150, 62, "Card Sort", 15, W.tinta)),
      tambah("Urut", teks("ni", 150, 88, "Urut Kartu", 12, W.merah)),
      tambah("Kartu.", emo("kd", 150, 126, E.kartu, 28)),
    ),
    k(
      SUARA_C2,
      bersih(0),
      tambah(0, judul("Satu Kartu"), ...papan()),
      tambah("tulis", emo("ct", 60, 70, E.catat, 24)),
      tambah("satu", teks("s1", 150, 52, "1 bilangan = 1 kartu", 11, W.tinta)),
      tambah("kartu.", ...kartuBil("kc", 115, 72, 5210, "#FFFFFF", 70, 40, 16)),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Menggeser Kartu"), ...papan()),
      tambah("kartu-kartu", ...tigaKartu([6140, 2870, 4360])),
      ubah("digeser", ...geser(2870, 0), ...geser(6140, 1)),
      ubah("terurut", ...geser(4360, 1), ...geser(6140, 2)),
      tambah("terkecil", teks("kc", 36, 112, "kecil", 9, W.ungu), panah("na", 24, 122, 250, 0, W.hijau, 2.4)),
      tambah("terbesar,", teks("bs", 262, 112, "besar", 9, W.ungu)),
      tambah("sebaliknya.", panah("rv", 274, 136, -248, 0, W.ungu, 2.4, { op: 0.35 })),
    ),
    k(
      SUARA_C4,
      bersih(0),
      tambah(0, judul("Geser yang Salah"), ...papan(), ...tigaKartu([2870, 6140, 4360])),
      ubah("salah", { id: "c6140-k", warna: "#FECACA" }),
      ubah("cukup", ...geser(4360, 1), ...geser(6140, 2)),
      ubah("geser", { id: "c6140-k", warna: "#BBF7D0" }),
      tambah("kartunya.", emo("ok", 150, 126, E.benar, 24)),
    ),
  ],
};

/* ------------------------------ Card Sort: terapan ------------------------------ */
const SUARA_K1 = "Satria menyusun empat kartu pengunjung pantai di atas meja.";
const SUARA_K2 = "Ia menggesernya sampai urut, dan kini susunannya rapi.";
const SUARA_K3 = "Cocok untuk mengurutkan banyak bilangan sekaligus.";
const SUARA_K4 = "Kurang cocok kalau tidak ada kartu, karena kita harus menuliskannya dulu.";
const XE = [14, 84, 154, 224];
const geserE = (n: number, tempat: number) => [
  { id: `e${n}-k`, x: XE[tempat] },
  { id: `e${n}-t0`, x: XE[tempat] + 30 },
];
const empatKartu = (urut: number[]): Obj[] => urut.flatMap((n, i) => kartuBil(`e${n}`, XE[i], 60, n, "#FFFFFF", 60, 38, 14));
/** Delapan kartu bilangan terurut kecil (banyak bilangan sekaligus). */
const DELAPAN = Array.from({ length: 8 }, (_, i) => kartu(`dk${i}`, 20 + i * 34, 62, 30, 28, "#FFFFFF", [String(i + 1)], 11, { z: 2 })).flat();

export const ADEGAN_LUAR_KARTU_TERAPAN: AdeganStory = {
  id: "luar-kartu-terapan",
  judul: "Urut Kartu: kapan cocok",
  sumber: "Metode global: Card Sort (terapan)",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Kartu Satria"), ...papan(), ...tokoh("st", 40, 184, "Satria")),
      tambah("empat", teks("n4", 150, 50, "4 kartu", 12, W.tinta)),
      tambah("kartu", ...empatKartu([7350, 5020, 8100, 6480])),
      tambah("meja.", kotak("mj", 10, 108, 280, 8, "#D6A25C", "#6B4423", { rx: 2, z: 1 })),
    ),
    k(
      SUARA_K2,
      ubah("menggesernya", ...geserE(5020, 0), ...geserE(7350, 1)),
      ubah("urut,", ...geserE(6480, 1), ...geserE(7350, 2), ...geserE(8100, 3)),
      tambah("kini", teks("ur", 150, 128, "urut dari kecil ke besar", 10, W.tinta)),
      tambah("rapi.", emo("ok", 262, 52, E.benar, 20)),
    ),
    k(
      SUARA_K3,
      bersih(0),
      tambah(0, judul("Banyak Bilangan"), ...papan(), ...tokoh("st", 40, 184, "Satria")),
      tambah("Cocok", emo("ok", 262, 52, E.benar, 20)),
      tambah("banyak", ...DELAPAN),
      tambah("sekaligus.", teks("sk", 150, 118, "diurutkan sekaligus", 11, W.tinta)),
    ),
    k(
      SUARA_K4,
      bersih(0),
      tambah(0, judul("Tanpa Kartu"), ...papan(), ...tokoh("st", 40, 184, "Satria")),
      tambah("tidak", emo("xs", 262, 52, E.salah, 20), kotak("kz", 100, 60, 100, 40, undefined, W.merah, { rx: 6, putus: true, z: 2 })),
      tambah("kartu,", teks("tk", 150, 85, "tidak ada kartu", 10, W.merah)),
      tambah("menuliskannya", emo("ct", 150, 124, E.catat, 22)),
      tambah("dulu.", teks("td", 150, 136, "ditulis dulu", 9, W.tinta)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita lihat bersama Kak Tiara. Mana yang pas tergantung keadaan.";
const SUARA_R2 = "Ingin membandingkan dua bilangan, pakai Banding dari Kiri. Ingin melihat jarak, pakai Garis Bilangan.";
const SUARA_R3 = "Ingin mengurutkan banyak bilangan, pakai Urut Kartu. Apa pun caranya, mulailah dari tempat paling kiri.";
const SUARA_R4 = "Menurutmu, untuk mengurutkan lima bilangan pengunjung, cara mana yang paling pas?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Metode global: ringkasan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tiga Cara, Pilih yang Pas"), ...kartu("r0", 20, 38, 156, 30, "#BFDBFE", ["Banding dari Kiri"], 11), ...kartu("r1", 20, 78, 156, 30, "#FDE68A", ["Garis Bilangan"], 11), ...kartu("r2", 20, 118, 156, 30, "#BBF7D0", ["Urut Kartu"], 11)),
      tambah("Tiga", emo("e0", 196, 60, E.penggaris, 20), emo("e1", 196, 100, E.kartu, 20), emo("e2", 196, 140, E.catat, 20), teks("n3", 250, 90, "3 cara", 11, W.ungu)),
      tambah("Tiara.", ...tokoh("kt", 250, 184, "Kak Tiara")),
      tambah("pas", emo("tq", 250, 128, E.tanya, 20)),
    ),
    k(
      SUARA_R2,
      tambah("dua", teks("n2", 250, 60, "2 bilangan", 9, W.ungu)),
      sorotkan("Banding", "r0-k"),
      tambah("Kiri.", emo("ok", 226, 58, E.benar, 20)),
      redamkan("melihat", "r0-k"),
      sorotkan("Garis", "r1-k"),
    ),
    k(
      SUARA_R3,
      hapus("Ingin", "n2", "tq"),
      redamkan("mengurutkan", "r1-k"),
      sorotkan("Urut", "r2-k"),
      tambah("Kartu.", emo("ok3", 226, 138, E.benar, 20)),
      tambah("kiri.", emo("mt", 262, 58, E.mata, 20)),
    ),
    k(
      SUARA_R4,
      hapus("Menurutmu,", "n3", "ok", "ok3", "mt"),
      redamkan("Menurutmu,", "r2-k"),
      tambah("Menurutmu,", teks("tq2", 250, 96, "?", 36, W.merah)),
      tambah("lima", teks("n5", 250, 128, "5 bilangan", 9, W.ungu)),
      tambah("pas?", emo("pl", 250, 150, E.pikir, 24)),
    ),
  ],
};
