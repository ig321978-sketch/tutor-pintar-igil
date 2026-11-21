import type { AdeganStory } from "./logika-story";
import { E, GB_STORY, TRIBUN, W, WT, emo, garis, idKartuTribun, judul, kotak, kartuTribun, panah, patokanGB, rb, ruasGB, rumput, sumbuGB, teks, titikGB, tokoh } from "./k5b1b-gambar";
import { hapus, k, pudarkan, sorotkan, tambah } from "./k5b1b-bantu";

/*
 * Cerita orisinal IGIL "Urutan Tribun Pak Hasto" (Kelas 5 Bab 1 Sub-Bab B), Hari Pertandingan di Stadion Kota.
 * Naskah suara dari naskah/story-naskah-k5b1b.md. Bagian ini: mengurutkan empat tribun (naik dan turun), garis bilangan dengan tiga patokan, dan penutup (Bu Lestari datang).
 */

/* ------------------------------ 7. Mengurutkan ------------------------------ */
const SUARA_U1 = "Pak Hasto meminta keempat tribun diurutkan dari yang paling sepi.";
const SUARA_U2 = "Urutannya Timur, Selatan, Utara, lalu Barat, dengan angka sembilan ribu enam puluh sampai tiga puluh ribu empat ratus dua.";
const SUARA_U3 = "Urutan dari kecil ke besar disebut naik, dan kalau dibalik disebut turun.";

/** Urutan acak kartu pada baris atas: Utara, Timur, Barat, Selatan (nomor tribun dalam TRIBUN). */
const ACAK = [2, 0, 3, 1];
const KARTU_ATAS = ACAK.flatMap((t, i) => kartuTribun(`u${t}`, 9 + i * 72, 30, TRIBUN[t], WT[t]));
const ID_ATAS = [0, 1, 2, 3].flatMap((t) => idKartuTribun(`u${t}`));
const KARTU_URUT = (t: number) => kartuTribun(`s${t}`, 9 + t * 72, 92, TRIBUN[t], WT[t]);

export const ADEGAN_URUT: AdeganStory = {
  id: "urut",
  judul: "Mengurutkan empat tribun",
  sumber: "Materi: urutan naik dan turun",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Mengurutkan Empat Tribun"), ...rumput("rp", 150)),
      tambah("Hasto", ...tokoh("ph", 262, 184, "Pak Hasto")),
      tambah("keempat", ...KARTU_ATAS),
      tambah("sepi", teks("ds", 150, 82, "dari paling sepi", 9, W.merah, { z: 3 })),
    ),
    k(
      SUARA_U2,
      hapus(0, "ds"),
      tambah("Timur", ...KARTU_URUT(0)),
      tambah("Selatan", ...KARTU_URUT(1)),
      tambah("Utara", ...KARTU_URUT(2)),
      tambah("Barat", ...KARTU_URUT(3)),
      pudarkan("dengan", ...ID_ATAS),
      sorotkan("sampai", "s0-k", "s3-k"),
    ),
    k(
      SUARA_U3,
      tambah("kecil", teks("kc", 34, 140, "kecil", 8, W.hijauTua, { z: 3 })),
      tambah("besar", panah("pn", 60, 137, 150, 0, W.hijau, 2.4, { z: 6 }), teks("bs", 236, 140, "besar", 8, W.hijauTua, { z: 3 })),
      tambah("naik", teks("nk", 135, 150, "naik", 9, W.hijauTua, { z: 3 })),
      tambah("dibalik", panah("pt", 210, 157, -150, 0, W.merah, 2.4, { z: 6 })),
      tambah("turun", teks("tr", 135, 168, "turun", 9, W.merah, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 8. Garis bilangan ------------------------------ */
const SUARA_G1 = "Bima menggambar garis bilangan dengan tiga patokan: sepuluh ribu, dua puluh ribu, dan tiga puluh ribu.";
const SUARA_G2 = "Sembilan ribu enam puluh dekat sepuluh ribu, dan delapan belas ribu tujuh ratus lima dekat dua puluh ribu.";
const SUARA_G3 = "Makin ke kanan makin besar, jadi Tribun Barat yang melewati tiga puluh ribu ada paling kanan.";

export const ADEGAN_GARIS: AdeganStory = {
  id: "garis",
  judul: "Bima menggambar garis bilangan",
  sumber: "Materi: garis bilangan dengan tiga patokan",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Garis Bilangan Bima"), ...rumput("rp", 150), ...tokoh("bi", 36, 184, "Bima")),
      tambah("garis", sumbuGB("gb", GB_STORY), ...patokanGB("gb", GB_STORY, [0], 0)),
      tambah("tiga", teks("n3", 150, 50, "3 patokan", 10, W.ungu, { z: 3 })),
      tambah("sepuluh", ...patokanGB("gb", GB_STORY, [10000], 1)),
      tambah("dua", ...patokanGB("gb", GB_STORY, [20000], 2)),
      tambah("tiga@2", ...patokanGB("gb", GB_STORY, [30000], 3)),
    ),
    k(
      SUARA_G2,
      tambah("Sembilan", ...titikGB("p0", GB_STORY, TRIBUN[0].banyak, "Timur", WT[0])),
      tambah("dekat", ruasGB("s0", GB_STORY, 9060, 10000)),
      tambah("delapan", ...titikGB("p1", GB_STORY, TRIBUN[1].banyak, "Selatan", WT[1])),
      tambah("dekat@2", ruasGB("s1", GB_STORY, 18705, 20000)),
    ),
    k(
      SUARA_G3,
      tambah("kanan", panah("mb", 60, 138, 170, 0, W.hijau, 2.4, { z: 6 }), teks("tb", 145, 148, "makin besar", 8, W.hijauTua, { z: 3 })),
      tambah("besar", ...titikGB("p2", GB_STORY, TRIBUN[2].banyak, "Utara", WT[2])),
      tambah("Barat", ...titikGB("p3", GB_STORY, TRIBUN[3].banyak, "Barat", WT[3])),
      sorotkan("Barat", "p3-p"),
      tambah("melewati", ruasGB("s3", GB_STORY, 30000, 30402, W.hijau)),
      tambah("kanan@2", emo("pl", 249, 56, E.piala, 18)),
    ),
  ],
};

/* ------------------------------ 9. Penutup: Bu Lestari datang ------------------------------ */
const SUARA_N1 = "Bu Lestari, bendahara klub, datang membawa bundel tiket dan kotak kas.";
const SUARA_N2 = "Ia ingin menyusun dua puluh empat ribu tiga ratus lima puluh tiket Tribun Utara dari bundel.";
const SUARA_N3 = "Menurutmu, adakah lebih dari satu cara menyusunnya? Terima kasih, Bima, Citra, Fajar, Pak Arif, dan Pak Hasto!";

const BUNDEL = [14, 76, 138].flatMap((x, i) => [
  kotak(`bd${i}`, x, 96, 56, 32, W.emasMuda, W.coklat, { rx: 3, tebal: 1.6, z: 1 }),
  garis(`bg${i}`, x + 28, 96, 0, 32, W.coklat, 2, { z: 2 }),
]);
const TIKET = [14, 76, 138].map((x, i) => emo(`bt${i}`, x + 14, 118, E.tiket, 16, { z: 3 }));

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Bu Lestari datang membawa bundel",
  sumber: "Materi: bundel tiket, jembatan ke Sub-Bab C",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Bu Lestari Datang"), ...rumput("rp", 150)),
      tambah("Lestari", ...tokoh("bl", 262, 184, "Bu Lestari")),
      tambah("bundel", ...BUNDEL),
      tambah("tiket", ...TIKET),
      tambah("kotak", kotak("ks", 204, 106, 34, 22, W.emas, W.coklat, { rx: 3, tebal: 1.6, z: 1 }), teks("kst", 221, 121, "kas", 9, W.coklat, { z: 3 })),
    ),
    k(
      SUARA_N2,
      tambah("Utara", teks("tn", 110, 40, "Tribun Utara", 10, W.hijauTua, { z: 3 })),
      tambah("dua", teks("tu", 110, 62, rb(24350), 16, W.biru, { z: 3 })),
      tambah("tiket", teks("tt", 110, 76, "tiket", 9, W.hijauTua, { z: 3 })),
      tambah("bundel", panah("pb", 110, 94, 0, -12, W.merah, 2, { z: 6 })),
    ),
    k(
      SUARA_N3,
      tambah(0, emo("tq", 262, 60, E.tanya, 20)),
      tambah("satu", teks("sc", 262, 84, "1 cara?", 10, W.merah, { z: 3 })),
      tambah("Bima", ...tokoh("bi", 24, 184, "Bima")),
      tambah("Citra", ...tokoh("ci", 66, 184, "Citra")),
      tambah("Fajar", ...tokoh("fa", 108, 184, "Fajar")),
      tambah("Arif", ...tokoh("pa", 150, 184, "Pak Arif")),
      tambah("Hasto", ...tokoh("ph", 192, 184, "Pak Hasto"), emo("kf", 120, 140, E.konfeti, 18)),
    ),
  ],
};
