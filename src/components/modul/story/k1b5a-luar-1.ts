import type { AdeganStory, Obj } from "./logika-story";
import { E, W, WARNA_IKAN, bingkai, emo, isiBingkai, judul, kartu, kawanan, orang, teks } from "./k1b5a-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k1b5a-bantu";

/* Video metode global Sub-Bab A "Ikan Baru Datang": pembuka dan Double Ten Frame (Dua Bingkai Sepuluh). */

export const NAMA_METODE = ["Double Ten Frame", "Rekenrek", "Estimation Jar"];
export const NAMA_METODE_ID = ["Dua Bingkai Sepuluh", "Manik Hitung", "Toples Tebakan"];
export const WARNA_METODE = [W.langit, W.merahMuda, W.lavender];
export const kepala = (i: number): Obj[] => kartu("hd", 6, 26, 288, 22, WARNA_METODE[i], [`${NAMA_METODE[i]} · ${NAMA_METODE_ID[i]}`], 8.8);

/** Dua bingkai sepuluh di tempat tetap: kiri `b1`, kanan `b2`. */
export const B = { x1: 30, x2: 160, y: 66, s: 22 } as const;
export const duaBingkai = (): Obj[] => [...bingkai("b1", B.x1, B.y, B.s), ...bingkai("b2", B.x2, B.y, B.s)];
export const isi1 = (dari: number, sampai: number, warna: string = W.merah): Obj[] => isiBingkai("b1", B.x1, B.y, dari, sampai, warna, B.s);
export const isi2 = (dari: number, sampai: number, warna: string = W.merah): Obj[] => isiBingkai("b2", B.x2, B.y, dari, sampai, warna, B.s);

/* ------------------------------ 1. Pembuka ------------------------------ */
const SUARA_O1 = "Di rak toko ikan, Kaka menemukan poster tentang tiga cara menghitung sampai dua puluh. Abang bertanya, mana yang paling cocok untuk lapakku?";
const SUARA_O2 = "Tiga metode itu: Double Ten Frame, Rekenrek, dan Estimation Jar.";
const SUARA_O3 = "Nama dalam bahasa Indonesia: Dua Bingkai Sepuluh, Manik Hitung, dan Toples Tebakan.";
const SUARA_O4 = "Semua metode membantu kita melihat sepuluh dulu, lalu sisanya.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga metode global untuk bilangan sampai dua puluh",
  sumber: "Metode global: pembuka",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Tiga metode global"), ...kawanan("ik", [{ x: 116, y: 76 }, { x: 150, y: 70 }, { x: 184, y: 76 }], [WARNA_IKAN.guppy[0], WARNA_IKAN.koki, WARNA_IKAN.neon], 1.1)),
      tambah("Kaka", ...orang("kk", 40, 120, E.kaka, "Kaka")),
      tambah("poster", emo("gl", 262, 110, E.bintang, 40)),
      tambah("puluh.", teks("sd", 150, 118, "sampai 20", 10, W.ungu)),
      tambah("tiga", ...kartu("pk", 50, 146, 200, 32, W.emas, ["3 metode global"], 11)),
    ),
    k(
      SUARA_O2,
      bersih(0),
      tambah(0, judul("3 metode global")),
      ...NAMA_METODE.map((m, i) => tambah(["Double", "Rekenrek,", "Estimation"][i], ...kartu(`m${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Nama dalam bahasa Indonesia")),
      ...NAMA_METODE_ID.map((m, i) => tambah(["Bingkai", "Manik", "Toples"][i], ...kartu(`n${i}`, 20, 40 + i * 48, 260, 38, WARNA_METODE[i], [`${i + 1}. ${m}`], 11))),
    ),
    k(
      SUARA_O4,
      bersih(0),
      tambah(0, judul("Sepuluh dulu, lalu sisanya"), ...duaBingkai()),
      tambah("sepuluh", ...isi1(0, 10), teks("p10", 85, 128, "10", 14, W.merah)),
      tambah("sisanya.", ...isi2(0, 3, W.biru), teks("ps", 215, 128, "sisanya", 10, W.biru)),
    ),
  ],
};

/* ------------------------------ 2. Double Ten Frame: konsep ------------------------------ */
const SUARA_A1 = "Metode pertama, Double Ten Frame, atau Dua Bingkai Sepuluh. Ada dua bingkai, tiap bingkai punya sepuluh kotak.";
const SUARA_A2 = "Isi bingkai pertama sampai penuh. Bingkai penuh berarti sepuluh.";
const SUARA_A3 = "Sisanya masuk bingkai kedua. Kita lihat sepuluh dan sisanya, tanpa menghitung ulang dari satu.";
const SUARA_A4 = "Bila dua bingkai penuh, banyaknya dua puluh.";

export const ADEGAN_LUAR_BINGKAI: AdeganStory = {
  id: "luar-bingkai",
  judul: "Double Ten Frame: dua bingkai sepuluh",
  sumber: "Metode global: Double Ten Frame",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_A1,
      tambah("pertama,", ...kepala(0)),
      tambah("Ada", ...duaBingkai()),
      tambah("dua@2", teks("n2", 150, 59, "2 bingkai", 9, W.ungu)),
      tambah("kotak.", teks("k1", 85, 128, "10 kotak", 9, W.biru), teks("k2", 215, 128, "10 kotak", 9, W.biru)),
    ),
    k(
      SUARA_A2,
      tambah("Isi", ...isi1(0, 5)),
      tambah("penuh.", ...isi1(5, 10)),
      tambah("sepuluh.", teks("p10", 85, 148, "10", 14, W.merah)),
    ),
    k(
      SUARA_A3,
      tambah("masuk", ...isi2(0, 3, W.biru)),
      sorotkan("sepuluh", "p10"),
      tambah("sisanya@2", teks("p3", 215, 148, "3", 14, W.biru)),
      tambah("satu.", teks("ul", 150, 176, "tidak mulai dari 1 lagi", 9, W.ungu)),
    ),
    k(
      SUARA_A4,
      hapus(0, "ul"),
      tambah("penuh,", ...isi2(3, 10, W.biru)),
      ubah("penuh,", { id: "p3", isi: "10" }),
      tambah("puluh.", teks("p20", 150, 180, "20", 16, W.merah)),
    ),
  ],
};

/* ------------------------------ 3. Double Ten Frame: terapan pada ikan ------------------------------ */
const SUARA_B1 = "Abang memakai dua bingkai untuk ikan guppy. Bingkai pertama penuh sepuluh, bingkai kedua terisi empat.";
const SUARA_B2 = "Bingkai kedua masih punya enam kotak kosong. Sepuluh dan empat, empat belas.";
const SUARA_B3 = "Untuk ikan koki, bingkai kedua hanya terisi satu. Sepuluh dan satu, sebelas.";
const SUARA_B4 = "Untuk ikan neon, dua bingkai penuh tanpa kotak kosong. Itu dua puluh.";

export const ADEGAN_LUAR_BINGKAI_TERAPAN: AdeganStory = {
  id: "luar-bingkai-terapan",
  judul: "Double Ten Frame: ikan Abang",
  sumber: "Metode global: Double Ten Frame, terapan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, ...kepala(0), ...duaBingkai()),
      tambah("Abang", ...orang("ab", 30, 172, E.abang, "Abang")),
      tambah("dua", teks("n2", 150, 59, "2 bingkai", 9, W.ungu)),
      tambah("guppy.", ...kawanan("ik", [{ x: 268, y: 176 }], WARNA_IKAN.guppy, 1.2)),
      tambah("sepuluh,", ...isi1(0, 10, WARNA_IKAN.guppy[0]), teks("p10", 85, 128, "10", 14, W.merah)),
      tambah("empat.", ...isi2(0, 4, WARNA_IKAN.guppy[0]), teks("p4", 215, 128, "4", 14, W.merah)),
    ),
    k(
      SUARA_B2,
      sorotkan("enam", "b2c4", "b2c5", "b2c6", "b2c7", "b2c8", "b2c9"),
      tambah("kosong.", teks("k6", 215, 146, "6 kosong", 9, W.ungu)),
      sorotkan("Sepuluh", "p10"),
      tambah("belas.", ...kartu("h", 90, 156, 120, 24, W.emas, ["guppy: 14"], 11)),
    ),
    k(
      SUARA_B3,
      hapus(0, "b2t1", "b2t2", "b2t3", "k6", "ik0", "ik0-m"),
      tambah("koki,", ...kawanan("ik", [{ x: 268, y: 176 }], WARNA_IKAN.koki, 1.2)),
      ubah("satu.", { id: "p4", isi: "1" }),
      ubah("sebelas.", { id: "h-t0", isi: "koki: 11" }),
    ),
    k(
      SUARA_B4,
      hapus(0, "ik0", "ik0-m"),
      tambah("neon,", ...kawanan("ik", [{ x: 268, y: 176 }], WARNA_IKAN.neon, 1.2)),
      tambah("penuh", ...isi2(1, 10, WARNA_IKAN.guppy[0])),
      ubah("penuh", { id: "p4", isi: "10" }),
      ubah("puluh.", { id: "h-t0", isi: "neon: 20" }),
    ),
  ],
};
