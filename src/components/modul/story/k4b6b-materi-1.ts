import type { AdeganStory } from "./logika-story";
import { E, TEGAK_RINI, W, WB, batangTegak, bulat, emo, garis, judul, kotak, lantai, meja, panah, papanData, satuanSumbu, skalaTegak, sumbuTegak, teks, tokoh, ujungTegak } from "./k4b6b-gambar";
import { k, sorotkan, tambah, ubah } from "./k4b6b-bantu";

/*
 * Cerita orisinal IGIL "Diagram Batang Pak Dodi" (Kelas 4 Bab 6 Sub-Bab B), akhir cerita Bazar Kuliner Sekolah.
 * Naskah suara dari naskah/story-naskah-k4b6b.md. Bagian ini: kertas berpetak Pak Dodi, sumbu dan batang, dan tingkatan sumbu lima.
 */

/* ------------------------------ 1. Kertas berpetak ------------------------------ */
const SUARA_K1 = "Pak Dodi, panitia bazar, membentangkan kertas berpetak di meja dan menggambar dua garis lurus.";
const SUARA_K2 = "Satria, Laras, dan Genta membantu memindahkan data jajanan Bu Rini ke kertas itu.";
const SUARA_K3 = "Pak Dodi berkata, data yang sama bisa digambar sebagai batang agar mudah dibandingkan.";

const PETAK = [
  ...[95, 120, 145, 170, 195].map((x, i) => garis(`pv${i}`, x, 44, 0, 64, W.abu, 0.8, { z: 2 })),
  ...[60, 76, 92].map((y, i) => garis(`ph${i}`, 70, y, 150, 0, W.abu, 0.8, { z: 2 })),
];
const MINI = [36, 24, 18, 30];

export const ADEGAN_KERTAS: AdeganStory = {
  id: "kertas",
  judul: "Pak Dodi dan kertas berpetak",
  sumber: "Materi: kertas berpetak di meja bazar",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Pak Dodi dan Kertas Petak"), ...lantai("lt", 150), ...meja("mj", 14, 232)),
      tambah("Dodi", ...tokoh("pr", 262, 184, "Pak Dodi")),
      tambah("kertas", kotak("kt", 70, 44, 150, 64, W.putih, W.biru, { rx: 2, z: 1 }), ...PETAK),
      tambah("dua", teks("n2", 150, 38, "2 garis", 10, W.merah)),
      tambah("garis", garis("sy", 90, 50, 0, 52, W.merah, 2.2, { z: 4 }), garis("sx", 90, 102, 124, 0, W.merah, 2.2, { z: 4 })),
    ),
    k(
      SUARA_K2,
      tambah("Satria", ...tokoh("sa", 36, 184, "Satria")),
      tambah("Laras", ...tokoh("la", 84, 184, "Laras")),
      tambah("Genta", ...tokoh("ge", 132, 184, "Genta")),
      tambah("data", teks("dt", 266, 60, "data Bu Rini", 8, W.coklat)),
      tambah("kertas", bulat("d0", 105, 94, 4, WB[0]), bulat("d1", 135, 94, 4, WB[1]), bulat("d2", 165, 94, 4, WB[2]), bulat("d3", 195, 94, 4, WB[3])),
    ),
    k(
      SUARA_K3,
      tambah("data", emo("ok", 266, 84, E.kilau, 18)),
      ubah("digambar", { id: "d0", op: 0 }, { id: "d1", op: 0 }, { id: "d2", op: 0 }, { id: "d3", op: 0 }),
      tambah(
        "digambar",
        ...MINI.map((h, i) => kotak(`m${i}`, 100 + i * 30, 102 - h, 16, h, WB[i], W.biru, { rx: 1, tebal: 1.2, z: 5 })),
      ),
      ubah("batang", { id: "n2", isi: "batang" }),
      sorotkan("dibandingkan", "m0", "m1", "m2", "m3"),
    ),
  ],
};

/* ------------------------------ 2. Sumbu dan batang ------------------------------ */
const SUARA_S1 = "Laras menjelaskan bahwa diagram batang memakai batang persegi panjang untuk menyatakan banyak tiap jenis.";
const SUARA_S2 = "Garis yang tegak disebut sumbu tegak, dan garis yang mendatar disebut sumbu mendatar.";
const SUARA_S3 = "Satu sumbu memuat nama jenis, dan sumbu lainnya memuat angka yang diukur.";

const BATANG = batangTegak("dg", TEGAK_RINI);
const BAR = BATANG.filter((o) => o.id.includes("-b"));
const NAMA = BATANG.filter((o) => o.id.includes("-n"));

export const ADEGAN_SUMBU: AdeganStory = {
  id: "sumbu",
  judul: "Sumbu dan batang",
  sumber: "Materi: sumbu tegak dan sumbu mendatar",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Laras dan Diagram Batang"), ...lantai("lt", 150), papanData()),
      tambah("Laras", ...tokoh("la", 36, 184, "Laras")),
      tambah("diagram", ...sumbuTegak("dg", TEGAK_RINI)),
      tambah("persegi", ...BAR),
      tambah("jenis", ...NAMA),
    ),
    k(
      SUARA_S2,
      sorotkan("tegak", "dg-sy"),
      tambah("tegak", teks("l1", 274, 64, "sumbu tegak", 7.5, W.merah)),
      sorotkan("mendatar", "dg-sd"),
      tambah("mendatar", teks("l2", 150, 160, "sumbu mendatar", 8, W.merah)),
    ),
    k(
      SUARA_S3,
      tambah("Satu", teks("l3", 274, 92, "1 sumbu", 8, W.hijauTua)),
      sorotkan("nama", ...NAMA.map((o) => o.id)),
      tambah("angka", ...skalaTegak("dg", TEGAK_RINI), satuanSumbu()),
    ),
  ],
};

/* ------------------------------ 3. Tingkatan sumbu lima ------------------------------ */
const SUARA_T1 = "Genta membagi sumbu angka dengan tingkatan lima: nol, lima, sepuluh, lima belas, dan seterusnya.";
const SUARA_T2 = "Batang risoles dibuat tinggi sampai garis tiga puluh, enam tingkat dari bawah.";
const SUARA_T3 = "Batang lemper hanya sampai garis lima belas, jadi lebih pendek dari batang risoles.";

const SKALA = skalaTegak("dg", TEGAK_RINI);
const GRID = SKALA.filter((o) => /-g\d$/.test(o.id));
const TIK = (n: number) => SKALA.filter((o) => o.id === `dg-a${n}`);
const [XR, YR] = ujungTegak(TEGAK_RINI, 0);
const [, YL] = ujungTegak(TEGAK_RINI, 2);

export const ADEGAN_SKALA: AdeganStory = {
  id: "skala",
  judul: "Tingkatan sumbu lima",
  sumber: "Materi: sumbu bertingkat lima",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Genta Membagi Sumbu"), ...lantai("lt", 150), papanData(), ...sumbuTegak("dg", TEGAK_RINI), satuanSumbu()),
      tambah("Genta", ...tokoh("ge", 36, 184, "Genta")),
      tambah("tingkatan", ...GRID),
      tambah(7, ...TIK(0)),
      tambah(8, ...TIK(1)),
      tambah(9, ...TIK(2)),
      tambah(10, ...TIK(3)),
      tambah(13, ...TIK(4), ...TIK(5), ...TIK(6)),
    ),
    k(
      SUARA_T2,
      tambah(1, ...batangTegak("dg", TEGAK_RINI, [0])),
      tambah("garis", garis("gb", 44, YR, 190, 0, W.merah, 1.6, { putus: true, z: 4 })),
      tambah("tiga", teks("l30", 274, 70, "30 = 3 puluh", 7, W.merah)),
      tambah("enam", teks("l6", 274, 84, "6 tingkat", 8, W.hijauTua)),
    ),
    k(
      SUARA_T3,
      tambah(1, ...batangTegak("dg", TEGAK_RINI, [2])),
      tambah("lima", garis("gc", 44, YL, 190, 0, W.hijauTua, 1.6, { putus: true, z: 4 }), teks("l15", 274, 98, "15 porsi", 8, W.hijauTua)),
      sorotkan("pendek", "dg-b2"),
      tambah("risoles", panah("ar", XR + 22, YR - 6, 0, YL - YR - 6, W.ungu, 1.6, { z: 6 })),
    ),
  ],
};
