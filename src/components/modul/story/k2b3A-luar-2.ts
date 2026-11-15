import type { AdeganStory, Obj } from "./logika-story";
import { W, bangun, bangunTitik, idSisi, kartu, kotak, namaBangun, nomorPaku, papanPaku, relBeraturan, relSegiempat, relSegitiga, sudutBangun, tarikKaret, teks, titikPaku, warnaSegi, emo } from "./k2b3A-gambar";
import { hapus, idx, k, pilihKata, redamkan, sisiAksi, sorotkan, tambah, ubah, urutBilangan } from "./k2b3A-bantu";
import { kepala } from "./k2b3A-luar-1";

/* ------------------------------ 5. Pilah Ciri: konsep ------------------------------ */
const SUARA_P1 = "Metode kedua bernama Pilah Ciri. Ciri adalah sifat yang bisa kita lihat, seperti banyak sisi.";
const SUARA_P2 = "Ini enam bangun datar yang tercampur. Kita akan memilahnya menurut banyak sisi.";
const SUARA_P3 = "Ada empat kolom. Kolom pertama untuk tiga sisi, lalu empat sisi, lima sisi, dan enam sisi.";
const SUARA_P4 = "Seret segitiga dan segi empat ke kolom yang cocok.";
const SUARA_P5 = "Seret segi lima dan segi enam juga. Sekarang tiap kolom berisi bangun yang cirinya sama.";
/** Enam bangun yang dipilah: id mp0..mp5 (urut dari kiri), banyak sisi n. */
export const BENTUK_PILAH_LUAR = [
  { n: 6, rel: relBeraturan(6, 16) },
  { n: 3, rel: relSegitiga(30, 26) },
  { n: 4, rel: relSegiempat(26, 26) },
  { n: 5, rel: relBeraturan(5, 16) },
  { n: 3, rel: relSegitiga(28, 24) },
  { n: 6, rel: relBeraturan(6, 14) },
];
const AKHIR_MP: [number, number][] = [
  [242, 160],
  [26, 160],
  [114, 160],
  [186, 160],
  [58, 160],
  [274, 160],
];
export const kolomX = (c: number): number => 8 + c * 72;
const mp = (i: number, x: number, y: number): Obj => bangun(`mp${i}`, BENTUK_PILAH_LUAR[i].rel, x, y, warnaSegi(BENTUK_PILAH_LUAR[i].n));

export const ADEGAN_LUAR_PILAH: AdeganStory = {
  id: "luar-pilah",
  judul: "Pilah Ciri: pilah menurut banyak sisi",
  sumber: "Metode luar: Pilah Ciri",
  latar: "#EFF6FF",
  ketukan: [
    k(SUARA_P1, tambah(0, ...kepala(1)), tambah(idx(SUARA_P1, "sifat"), ...kartu("kk", 50, 100, 200, 30, W.krem, ["ciri: banyak sisi"], 11))),
    k(SUARA_P2, hapus(0, "kk-k", "kk-t0"), tambah(idx(SUARA_P2, "enam"), ...BENTUK_PILAH_LUAR.map((_, i) => mp(i, 30 + 48 * i, 84)))),
    k(
      SUARA_P3,
      tambah(idx(SUARA_P3, "kolom."), ...[0, 1, 2, 3].map((c) => kotak(`kc${c}`, kolomX(c), 112, 68, 80, W.putih, W.biru, { rx: 6, tebal: 1.4 }))),
      tambah(idx(SUARA_P3, "tiga"), teks("kh0", kolomX(0) + 34, 127, "3 sisi", 11, W.merah)),
      tambah(idx(SUARA_P3, "empat", 2), teks("kh1", kolomX(1) + 34, 127, "4 sisi", 11, W.merah)),
      tambah(idx(SUARA_P3, "lima"), teks("kh2", kolomX(2) + 34, 127, "5 sisi", 11, W.merah)),
      tambah(idx(SUARA_P3, "enam"), teks("kh3", kolomX(3) + 34, 127, "6 sisi", 11, W.merah)),
    ),
    k(
      SUARA_P4,
      ubah(idx(SUARA_P4, "segitiga"), { id: "mp1", x: AKHIR_MP[1][0], y: AKHIR_MP[1][1] }),
      ubah(idx(SUARA_P4, "segitiga"), { id: "mp4", x: AKHIR_MP[4][0], y: AKHIR_MP[4][1] }),
      ubah(idx(SUARA_P4, "empat"), { id: "mp2", x: AKHIR_MP[2][0], y: AKHIR_MP[2][1] }),
    ),
    k(
      SUARA_P5,
      ubah(idx(SUARA_P5, "lima"), { id: "mp3", x: AKHIR_MP[3][0], y: AKHIR_MP[3][1] }),
      ubah(idx(SUARA_P5, "enam"), { id: "mp0", x: AKHIR_MP[0][0], y: AKHIR_MP[0][1] }),
      ubah(idx(SUARA_P5, "enam"), { id: "mp5", x: AKHIR_MP[5][0], y: AKHIR_MP[5][1] }),
      tambah(idx(SUARA_P5, "sama."), emo("ok", 150, 84, "✅", 28)),
    ),
  ],
};

/* ------------------------------ 6. Pilah Ciri: terapan ------------------------------ */
const SUARA_Q1 = "Terapkan pada bangun baru. Kira melihat satu bangun, dan kita hitung sisinya.";
const SUARA_Q2 = "Satu, dua, tiga, empat, lima, enam. Ada enam sisi.";
const SUARA_Q3 = "Pilih kolom yang cocok. Bangun dengan enam sisi masuk kolom yang mana? Ketuk jawabannya.";
const SUARA_Q4 = "Betul! Bangun dengan enam sisi masuk kolom enam sisi. Hebat!";
const REL_Q = relBeraturan(6, 28);
const PTS_Q = sudutBangun(REL_Q, 150, 92);

export const ADEGAN_LUAR_PILAH_TERAPAN: AdeganStory = {
  id: "luar-pilah-terapan",
  judul: "Pilah Ciri: kolom yang cocok",
  sumber: "Metode luar: Pilah Ciri",
  latar: "#DBEAFE",
  ketukan: [
    k(SUARA_Q1, tambah(0, ...kepala(1)), tambah(idx(SUARA_Q1, "bangun,"), bangun("pt", REL_Q, 150, 92, warnaSegi(6)))),
    k(SUARA_Q2, ...sisiAksi(SUARA_Q2, "pt", PTS_Q)),
    k(SUARA_Q3, hapus(0, ...idSisi("pt", 6)), tambah(idx(SUARA_Q3, "jawabannya."), ...pilihKata(150, ["3 sisi", "5 sisi", "6 sisi"], 14))),
    k(SUARA_Q4, sorotkan(idx(SUARA_Q4, "Betul!"), "c3-k"), tambah(idx(SUARA_Q4, "enam"), namaBangun("pt", 150, 136, "segi enam", 11)), tambah(idx(SUARA_Q4, "Hebat!"), emo("ok", 262, 92, "✅", 22))),
  ],
};

/* ------------------------------ 7. Papan Paku: konsep ------------------------------ */
const SUARA_K1 = "Metode ketiga bernama Papan Paku. Papan ini penuh paku, dan kita menarik tali karet di antara paku.";
const SUARA_K2 = "Tarik karet dari paku pertama ke paku kedua. Sisi pertama sudah terbentuk.";
const SUARA_K3 = "Tarik lagi ke paku ketiga, lalu kembali ke paku pertama. Terbentuk tiga sisi, jadi segitiga.";
const SUARA_K4 = "Sekarang kita buat segi empat. Ada empat paku, jadi ada empat sisi.";
const SUARA_K5 = "Papan Paku membantu kita melihat sisi dan pojok. Tiap paku yang kena karet menjadi satu pojok.";
/** Paku (baris, kolom) tiap bangun di papan. */
export const PAKU_TIGA: [number, number][] = [[3, 0], [3, 2], [1, 1]];
export const PAKU_EMPAT: [number, number][] = [[1, 0], [1, 3], [3, 3], [3, 0]];
export const PAKU_LIMA: [number, number][] = [[3, 0], [3, 2], [1, 3], [0, 2], [1, 0]];
const pg = (p: [number, number]): string => `pg${p[0]}${p[1]}`;
const poligonPaku = (daftar: [number, number][]): Obj => bangunTitik("pk", daftar.map((p) => titikPaku(p[0], p[1])), warnaSegi(daftar.length), { z: -1 });

export const ADEGAN_LUAR_PAKU: AdeganStory = {
  id: "luar-paku",
  judul: "Papan Paku: tarik karet",
  sumber: "Metode luar: Papan Paku",
  latar: "#FDF2F8",
  ketukan: [
    k(SUARA_K1, tambah(0, ...kepala(2)), tambah(idx(SUARA_K1, "penuh"), ...papanPaku())),
    k(
      SUARA_K2,
      sorotkan(idx(SUARA_K2, "pertama", 1), pg(PAKU_TIGA[0])),
      tambah(idx(SUARA_K2, "pertama", 1), nomorPaku(0, ...PAKU_TIGA[0])),
      tambah(idx(SUARA_K2, "kedua."), nomorPaku(1, ...PAKU_TIGA[1]), tarikKaret(0, PAKU_TIGA[0], PAKU_TIGA[1])),
    ),
    k(
      SUARA_K3,
      tambah(idx(SUARA_K3, "ketiga,"), nomorPaku(2, ...PAKU_TIGA[2]), tarikKaret(1, PAKU_TIGA[1], PAKU_TIGA[2])),
      tambah(idx(SUARA_K3, "pertama."), tarikKaret(2, PAKU_TIGA[2], PAKU_TIGA[0])),
      tambah(idx(SUARA_K3, "Terbentuk"), poligonPaku(PAKU_TIGA)),
      tambah(idx(SUARA_K3, "segitiga."), namaBangun("pk", 150, 194, "segitiga", 10)),
    ),
    k(
      SUARA_K4,
      redamkan(0, pg(PAKU_TIGA[0])),
      hapus(0, "kr0", "kr1", "kr2", "pn0", "pn1", "pn2", "pk", "pk-nm"),
      tambah(idx(SUARA_K4, "paku,"), ...PAKU_EMPAT.map((p, i) => nomorPaku(i, p[0], p[1]))),
      tambah(idx(SUARA_K4, "sisi."), ...PAKU_EMPAT.map((p, i) => tarikKaret(i, p, PAKU_EMPAT[(i + 1) % 4])), poligonPaku(PAKU_EMPAT), namaBangun("pk", 150, 194, "segi empat", 10)),
    ),
    k(SUARA_K5, sorotkan(idx(SUARA_K5, "paku", 2), ...PAKU_EMPAT.map(pg))),
  ],
};

/* ------------------------------ 8. Papan Paku: terapan ------------------------------ */
const SUARA_M1 = "Terapkan pada soal ini. Kira ingin membuat segi lima. Segi lima punya lima sisi, jadi perlu lima paku.";
const SUARA_M2 = "Tarik karet dari paku satu ke paku dua, lalu ke paku tiga.";
const SUARA_M3 = "Lanjutkan ke paku empat, paku lima, lalu kembali ke paku satu.";
const SUARA_M4 = "Hitung sisinya. Satu, dua, tiga, empat, lima. Ada lima sisi, sama dengan lima paku.";
const SUARA_M5 = "Betul! Bangun ini punya lima sisi dan lima pojok, jadi namanya segi lima.";
const URUT_M4 = urutBilangan(SUARA_M4, 1, 5, "sisinya");

export const ADEGAN_LUAR_PAKU_TERAPAN: AdeganStory = {
  id: "luar-paku-terapan",
  judul: "Papan Paku: bentuk segi lima",
  sumber: "Metode luar: Papan Paku",
  latar: "#FCE7F3",
  ketukan: [
    k(SUARA_M1, tambah(0, ...kepala(2)), tambah(idx(SUARA_M1, "membuat"), ...papanPaku())),
    k(
      SUARA_M2,
      sorotkan(idx(SUARA_M2, "satu"), pg(PAKU_LIMA[0])),
      tambah(idx(SUARA_M2, "satu"), nomorPaku(0, ...PAKU_LIMA[0])),
      tambah(idx(SUARA_M2, "dua,"), nomorPaku(1, ...PAKU_LIMA[1]), tarikKaret(0, PAKU_LIMA[0], PAKU_LIMA[1])),
      tambah(idx(SUARA_M2, "tiga."), nomorPaku(2, ...PAKU_LIMA[2]), tarikKaret(1, PAKU_LIMA[1], PAKU_LIMA[2])),
    ),
    k(
      SUARA_M3,
      redamkan(0, pg(PAKU_LIMA[0])),
      tambah(idx(SUARA_M3, "empat,"), nomorPaku(3, ...PAKU_LIMA[3]), tarikKaret(2, PAKU_LIMA[2], PAKU_LIMA[3])),
      tambah(idx(SUARA_M3, "lima,"), nomorPaku(4, ...PAKU_LIMA[4]), tarikKaret(3, PAKU_LIMA[3], PAKU_LIMA[4])),
      tambah(idx(SUARA_M3, "satu."), tarikKaret(4, PAKU_LIMA[4], PAKU_LIMA[0])),
    ),
    k(
      SUARA_M4,
      tambah(idx(SUARA_M4, "Ada"), poligonPaku(PAKU_LIMA)),
      ...URUT_M4.flatMap((p, i) => (i === 0 ? [sorotkan(p, "kr0")] : [redamkan(p, `kr${i - 1}`), sorotkan(p, `kr${i}`)])),
    ),
    k(SUARA_M5, redamkan(0, "kr4"), tambah(idx(SUARA_M5, "segi"), namaBangun("pk", 150, 194, "segi lima", 10)), tambah(idx(SUARA_M5, "Betul!"), emo("ok", 252, 190, "✅", 22))),
  ],
};
