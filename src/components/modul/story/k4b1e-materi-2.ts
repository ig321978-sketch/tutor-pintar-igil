import type { AdeganStory } from "./logika-story";
import { E, W, XK, Y, angka, bulat, dua, emo, judul, kertas, kotak, panah, pusatKolom, sorotKolom, teks, tokoh, tumpukKoper } from "./k4b1e-gambar";
import { hapus, k, tambah } from "./k4b1e-bantu";

/*
 * Cerita orisinal IGIL "Meja Resepsi Bu Rina" (Kelas 4 Bab 1 Sub-Bab E), video materi.
 * Naskah suara dari naskah/story-naskah-k4b1e.md. Bagian ini: menyimpan satuan ke puluhan, puluhan dan ratusan, susun panjang (uraian lalu gabung per tempat) sampai enam ratus dua puluh tiga.
 */

/** Sepuluh kerikil `${id}0`..`${id}9` dalam dua baris lima, pojok kiri-atas (x, y). */
const kerikil = (id: string, x: number, y: number) => Array.from({ length: 10 }, (_, i) => bulat(`${id}${i}`, x + (i % 5) * 12, y + Math.floor(i / 5) * 12, 4.5, W.oranye, "#9A3412", { tebal: 1, z: 3 }));

/* ------------------------------ 4. Menyimpan ------------------------------ */
const SUARA_M1 = "Genta menggeleng, satuan hanya boleh berisi satu angka.";
const SUARA_M2 = "Tiga belas ditulis tiga di satuan, dan satu dipindahkan ke puluhan sebagai simpanan.";
const SUARA_M3 = "Menyimpan berarti sepuluh satuan berubah menjadi satu puluhan.";

export const ADEGAN_SIMPAN: AdeganStory = {
  id: "simpan",
  judul: "Menyimpan satu puluhan",
  sumber: "Materi: menyimpan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Satuan Satu Angka"), kertas(), ...dua(245, 378), angka("h13", XK, Y.h, 13, 22, W.merah), ...tokoh("gn", 36, 184, "Genta")),
      tambah("menggeleng,", emo("gl", 76, 150, E.gelengan, 16)),
      tambah("satuan", sorotKolom("s0", XK, 0, 56, 100, W.satuan)),
      tambah("angka.", teks("sa1", 236, 100, "1 angka", 10, W.merah, { z: 4 })),
    ),
    k(
      SUARA_M2,
      hapus("ditulis", "h13", "sa1"),
      tambah("tiga@2", angka("h3", XK, Y.h, 3, 22, W.hijauTua)),
      tambah("dipindahkan", teks("c1", pusatKolom(XK, 1), Y.sim, "1", 11, W.merah, { z: 5 })),
      tambah("puluhan", sorotKolom("s1", XK, 1, 56, 100, W.puluhan)),
      tambah("simpanan.", teks("sm", 204, Y.sim, "simpanan", 9, W.merah, { anchor: "start", z: 4 })),
    ),
    k(
      SUARA_M3,
      tambah("sepuluh", ...kerikil("kr", 206, 128), teks("t10", 236, 118, "10 satuan", 8, W.biru, { z: 4 })),
      tambah("berubah", panah("pa", 236, 150, 0, 12, W.merah, 2, { z: 4 })),
      tambah("menjadi", kotak("br", 214, 166, 44, 12, W.puluhan, W.biru, { rx: 3, z: 3 })),
      tambah("puluhan.", teks("t1", 236, 190, "1 puluhan", 8, W.biru, { z: 4 })),
    ),
  ],
};

/* ------------------------------ 5. Puluhan dan ratusan ------------------------------ */
const SUARA_P1 = "Di puluhan, empat ditambah tujuh ditambah satu simpanan sama dengan dua belas.";
const SUARA_P2 = "Dua ditulis di puluhan, dan satu disimpan ke ratusan.";
const SUARA_P3 = "Di ratusan, dua ditambah tiga ditambah satu simpanan sama dengan enam.";

export const ADEGAN_PULUHAN: AdeganStory = {
  id: "puluhan",
  judul: "Puluhan dan ratusan",
  sumber: "Materi: puluhan dan ratusan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Kolom Puluhan"), kertas(), ...dua(245, 378), angka("h3", XK, Y.h, 3, 22, W.hijauTua), teks("c1", pusatKolom(XK, 1), Y.sim, "1", 11, W.merah, { z: 5 }), ...tokoh("lr", 36, 184, "Laras")),
      tambah("puluhan,", sorotKolom("s1", XK, 1, 56, 100, W.puluhan)),
      tambah("empat", teks("eq", 248, Y.a, "4 + 7 + 1", 10, W.biru, { z: 4 })),
      tambah("dua", teks("eq2", 248, Y.a + 14, "= 12", 10, W.merah, { z: 4 })),
    ),
    k(
      SUARA_P2,
      tambah("Dua", teks("h2", pusatKolom(XK, 1), Y.h, "2", 22, W.hijauTua, { z: 4 })),
      tambah("puluhan,", sorotKolom("s2", XK, 2, 56, 100, W.ratusan)),
      tambah("disimpan", teks("c2", pusatKolom(XK, 2), Y.sim, "1", 11, W.merah, { z: 5 })),
      tambah("ratusan.", panah("pn", 150, 62, -12, 0, W.merah, 2, { z: 4 })),
    ),
    k(
      SUARA_P3,
      hapus("Di", "eq", "eq2"),
      tambah("ratusan,", teks("eq3", 248, Y.a, "2 + 3 + 1", 10, W.biru, { z: 4 })),
      tambah("sama", teks("eq4", 248, Y.a + 14, "= 6", 10, W.merah, { z: 4 })),
      tambah("enam.", teks("h6", pusatKolom(XK, 2), Y.h, "6", 22, W.hijauTua, { z: 4 }), teks("jml", 246, Y.h, "= 623", 16, W.hijauTua, { z: 4 })),
    ),
  ],
};

/* ------------------------------ 6. Susun panjang ------------------------------ */
const SUARA_L1 = "Laras menunjukkan cara susun panjang, dua ratus empat puluh lima diuraikan menjadi dua ratus, empat puluh, dan lima.";
const SUARA_L2 = "Ratusan dengan ratusan, puluhan dengan puluhan, satuan dengan satuan, hasilnya lima ratus, seratus sepuluh, dan tiga belas.";
const SUARA_L3 = "Seratus sepuluh dan tiga belas diuraikan lagi, lalu digabung per tempat, hasilnya enam ratus dua puluh tiga, dan Satria mulai mengangkat koper-koper itu.";

export const ADEGAN_PANJANG: AdeganStory = {
  id: "panjang",
  judul: "Susun panjang: diuraikan",
  sumber: "Materi: susun panjang",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Susun Panjang"), kertas(118), ...tokoh("lr", 36, 184, "Laras")),
      tambah("diuraikan", teks("u1", 30, 44, "245 = 200 + 40 + 5", 11, W.biru, { anchor: "start", z: 4 })),
      tambah("lima.", teks("u2", 30, 62, "378 = 300 + 70 + 8", 11, W.biru, { anchor: "start", z: 4 })),
    ),
    k(
      SUARA_L2,
      tambah("Ratusan", teks("g1", 30, 80, "= (200 + 300) + (40 + 70) + (5 + 8)", 11, W.biru, { anchor: "start", z: 4 })),
      tambah("hasilnya", teks("g2", 30, 98, "= 500 + 110 + 13", 12, W.merah, { anchor: "start", z: 4 })),
    ),
    k(
      SUARA_L3,
      tambah("diuraikan", teks("g3", 30, 116, "= 500 + (100 + 10) + (10 + 3)", 11, W.biru, { anchor: "start", z: 4 })),
      tambah("digabung", teks("g4", 30, 134, "= 600 + 20 + 3", 12, W.hijauTua, { anchor: "start", z: 4 })),
      tambah("enam", teks("g5", 170, 134, "= 623", 16, W.hijauTua, { anchor: "start", z: 5 })),
      tambah("Satria", ...tokoh("sa", 76, 184, "Satria")),
      tambah("koper-koper", ...tumpukKoper("kt", 236, 178, 9)),
    ),
  ],
};
