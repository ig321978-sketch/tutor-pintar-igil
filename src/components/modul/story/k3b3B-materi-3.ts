import type { AdeganStory } from "./logika-story";
import { E, W, emo, judul, karung, kolam, kotak, sikat, tanah, teks, tokoh } from "./k3b3B-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k3b3B-bantu";

/*
 * Cerita orisinal IGIL "Pita Pak Wayan" (Kelas 3 Bab 3 Sub-Bab B), video materi.
 * Naskah suara dari naskah/story-naskah-k3b3b.md. Bagian ini: menyambung dua pita, memotong tali, dan penutup (jembatan ke Sub-Bab C).
 */

const PITA_A = "#FDE047";
const PITA_B = "#FDBA74";
const PITA_C = "#86EFAC";

/* ------------------------------ 7. Menyambung pita ------------------------------ */
const SUARA_P1 = "Pak Wayan menyambung dua pita: empat meter tiga puluh lima sentimeter dan tujuh meter empat puluh sentimeter.";
const SUARA_P2 = "Meter dijumlah dengan meter: empat tambah tujuh sama dengan sebelas. Sentimeter dengan sentimeter: tiga puluh lima tambah empat puluh sama dengan tujuh puluh lima.";
const SUARA_P3 = "Panjang sambungan sebelas meter tujuh puluh lima sentimeter.";

export const ADEGAN_SAMBUNG: AdeganStory = {
  id: "sambung",
  judul: "Menyambung dua pita",
  sumber: "Materi: menyambung dua pita",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Menyambung Pita"), ...tanah("tn", 150), ...tokoh("pw", 40, 184, "Pak Wayan")),
      tambah("dua", teks("n2", 262, 56, "2 pita", 9, W.ungu)),
      tambah("empat", kotak("pa", 20, 50, 130, 14, PITA_A, W.kuningTua, { rx: 1, tebal: 1.4 })),
      tambah("lima", teks("la", 85, 80, "4 m 35 cm", 10, W.meter)),
      tambah("tujuh", kotak("pb", 20, 92, 222, 14, PITA_B, W.kuningTua, { rx: 1, tebal: 1.4 })),
      tambah("empat@2", teks("lb", 131, 122, "7 m 40 cm", 10, W.senti)),
    ),
    k(
      SUARA_P2,
      tambah("empat", teks("e1", 150, 142, "4 + 7", 13, W.meter)),
      ubah("sebelas.", { id: "e1", isi: "4 + 7 = 11 m" }),
      tambah("tiga", teks("e2", 150, 162, "35 + 40", 13, W.senti)),
      ubah("tujuh@2", { id: "e2", isi: "35 + 40 = 75 cm" }),
    ),
    k(
      SUARA_P3,
      hapus(0, "pa", "pb", "la", "lb", "n2", "e1", "e2"),
      tambah("sambungan", kotak("sa", 32, 70, 87, 16, PITA_A, W.kuningTua, { rx: 1, tebal: 1.4 }), kotak("sb", 119, 70, 148, 16, PITA_B, W.kuningTua, { rx: 1, tebal: 1.4 })),
      tambah("sebelas", teks("hs", 118, 118, "11 m", 18, W.meter)),
      tambah("lima", teks("hs2", 186, 118, "75 cm", 18, W.senti)),
    ),
  ],
};

/* ------------------------------ 8. Memotong tali ------------------------------ */
const SUARA_T1 = "Dari tali enam meter lima puluh sentimeter, Pak Wayan memotong dua meter dua puluh sentimeter.";
const SUARA_T2 = "Meter dikurang meter: enam kurang dua sama dengan empat. Sentimeter dikurang sentimeter: lima puluh kurang dua puluh sama dengan tiga puluh.";
const SUARA_T3 = "Sisa tali empat meter tiga puluh sentimeter.";

export const ADEGAN_POTONG: AdeganStory = {
  id: "potong",
  judul: "Memotong tali",
  sumber: "Materi: memotong tali",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Memotong Tali"), ...tanah("tn", 150), ...tokoh("pw", 252, 184, "Pak Wayan")),
      tambah("tali", kotak("tl", 20, 64, 195, 12, PITA_C, W.hijauTua, { rx: 4, tebal: 1.6 })),
      tambah("enam", teks("l6", 118, 52, "6 m 50 cm", 10, W.hijauTua)),
      tambah("dua", kotak("cp", 20, 64, 66, 12, W.merahMuda, W.merah, { rx: 4, tebal: 1.6, z: 1 }), emo("gt", 86, 92, E.gunting, 18)),
      tambah("dua@2", teks("lc", 53, 110, "2 m 20 cm", 10, W.merah)),
    ),
    k(
      SUARA_T2,
      tambah("enam", teks("e1", 140, 132, "6 − 2", 13, W.meter)),
      ubah("empat.", { id: "e1", isi: "6 − 2 = 4 m" }),
      tambah("lima", teks("e2", 140, 152, "50 − 20", 13, W.senti)),
      ubah("tiga", { id: "e2", isi: "50 − 20 = 30 cm" }),
    ),
    k(
      SUARA_T3,
      hapus(0, "e1", "e2", "gt"),
      ubah(0, { id: "cp", op: 0.3 }, { id: "l6", op: 0.35 }, { id: "lc", op: 0.35 }),
      tambah("tali", kotak("sr", 86, 64, 129, 12, "#4ADE80", W.hijauTua, { rx: 4, tebal: 1.8, z: 2 })),
      tambah("empat", teks("hs", 130, 134, "4 m", 18, W.meter)),
      tambah("tiga", teks("hs2", 190, 134, "30 cm", 18, W.senti)),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_N1 = "Raka menepati taruhannya dan menyikat kura-kura satu per satu, sambil dicipratkan air.";
const SUARA_N2 = "Besok Bu Lastri, juru pakan, akan datang membawa timbangan untuk pakan hewan.";
const SUARA_N3 = "Menurutmu, kalau ingin tahu seberapa berat sekarung pakan, alat apa yang dipakai? Terima kasih, Raka, Salsa, Bima, Pak Joko, dan Pak Wayan!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Penutup dan jembatan ke Sub-Bab C",
  sumber: "Materi: penutup dan Bu Lastri",
  latar: "#E0F2FE",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Taruhan Raka Ditepati"), ...tanah("tn", 170)),
      tambah("Raka", ...tokoh("rk", 40, 184, "Raka")),
      tambah("menyikat", ...kolam("kl", 80, 112, 150, 44), ...sikat("sk", 62, 134)),
      tambah("kura-kura", emo("kr1", 130, 144, E.kura, 22), emo("kr2", 190, 142, E.kura, 18)),
      tambah("satu", teks("n1", 150, 100, "1 per 1", 10, W.ungu)),
      tambah("air.", emo("pc1", 112, 120, E.percik, 14), emo("pc2", 210, 118, E.percik, 14)),
    ),
    k(
      SUARA_N2,
      bersih(0),
      tambah(0, judul("Bu Lastri Datang"), ...tanah("tn", 150)),
      tambah("Lastri,", ...tokoh("bl", 250, 150, "Bu Lastri", 22)),
      tambah("pakan", ...karung("kg", 110, 116, 30, 34)),
      tambah("timbangan", emo("tb", 196, 140, "\u{2696}", 24)),
    ),
    k(
      SUARA_N3,
      bersih(0),
      tambah(0, judul("Terima Kasih!"), ...tanah("tn", 150)),
      tambah("berat", teks("tq", 150, 100, "?", 34, W.merah)),
      tambah("sekarung", ...karung("kg", 132, 36, 36, 40)),
      sorotkan("alat", "tq"),
      tambah("Terima", emo("s1", 40, 70, E.sorak, 20), emo("s2", 260, 70, E.sorak, 20)),
      tambah("Raka,", ...tokoh("rk", 28, 184, "Raka")),
      tambah("Salsa,", ...tokoh("sl", 80, 184, "Salsa")),
      tambah("Bima,", ...tokoh("bm", 132, 184, "Bima")),
      tambah("Pak", ...tokoh("pj", 184, 184, "Pak Joko")),
      tambah("Pak@2", ...tokoh("pw", 240, 184, "Pak Wayan")),
    ),
  ],
};
