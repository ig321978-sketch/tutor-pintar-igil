import type { AdeganStory } from "./logika-story";
import { E, W, buRina, buSari, dasi, emo, gs, idRak, jalurBilangan, jam, judul, kartu, kartuStok, lantai, mejaKasir, nia, panah, papanGabus, penggaris, rak, teks, tokoh, topiMP, xBaris } from "./k2b2B-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah, urutNilai } from "./k2b2B-bantu";

/*
 * Cerita orisinal IGIL "Rak Seragam Diserbu" (Kelas 2 Bab 2 Sub-Bab B, pengurangan sampai dua puluh), tengah cerita Toko Seragam dan Alat Tulis Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b2b.md. Bagian ini: rak diserbu, selisih dengan memasangkan, dan mengurangi dengan mundur.
 */

/* ------------------------------ 1. Rak diserbu ------------------------------ */
const SUARA_R1 = "Hari kedua sekolah, anak-anak berebut membeli topi dan dasi di koperasi.";
const SUARA_R2 = "Bu Rina ikut mengantre membeli baju olahraga.";
const SUARA_R3 = "Bu Sari berpesan, kartu stok harus cocok dengan isi rak sebelum tutup. Kalau tidak, ada anak yang membayar barang yang sudah habis!";

const ID_RAK1 = idRak("rk");
const ANAK_X = [44, 84, 124, 164];
const TOPI5 = [0, 1, 2, 3, 4];

export const ADEGAN_RAK_DISERBU: AdeganStory = {
  id: "rak-diserbu",
  judul: "Rak seragam diserbu",
  sumber: "Materi: rak diserbu pembeli",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Rak Seragam Diserbu"), lantai("tn", 150), ...rak("rk", 10, 36, 150, 108)),
      tambah("anak-anak", ...ANAK_X.map((x, i) => emo(`an${i}`, x, 178, E.anak, 24))),
      tambah("topi", ...TOPI5.flatMap((i) => topiMP(`tp${i}`, 28 + i * 28, 62))),
      tambah("dasi", ...TOPI5.map((i) => dasi(`ds${i}`, 28 + i * 28, 92))),
      tambah("koperasi.", ...mejaKasir("mj", 190, 112, 84), ...kartu("kp", 196, 30, 88, 20, W.krem, ["Koperasi"], 9)),
    ),
    k(
      SUARA_R2,
      tambah("Bu", ...buRina("br", 270, 184)),
      ubah("mengantre", { id: "br", x: 240 }, { id: "br-p", x: 248 }, { id: "br-q", x: 238 }, { id: "br-n", x: 240 }),
      tambah("baju", ...[0, 1, 2].map((i) => emo(`bj${i}`, 40 + i * 45, 136, E.baju, 20))),
      tambah("olahraga.", ...kartu("bo", 196, 56, 88, 20, W.hijauMuda, ["baju olahraga"], 8.4)),
    ),
    k(
      SUARA_R3,
      hapus(0, "kp-k", "kp-t0", "bo-k", "bo-t0"),
      tambah("Bu", ...buSari("bs", 30, 176)),
      tambah("kartu", papanGabus("pg", 186, 34, 104, 56), ...[0, 1, 2].flatMap((i) => kartuStok(`ks${i}`, 192 + i * 32, 42, 28, 40, ["stok"], 7.6))),
      sorotkan("rak", ...ID_RAK1),
      tambah("tutup.", ...jam("jm", 162, 20, 11)),
      tambah("tidak,", emo("sl", 146, 160, E.salah, 20)),
      tambah("habis!", emo("sd", 210, 176, E.sedih, 24)),
    ),
  ],
};

/* ------------------------------ 2. Selisih dengan memasangkan ------------------------------ */
const SUARA_P1 = "Dika memasangkan topi dan dasi satu-satu. Topinya tujuh belas, dasinya dua belas.";
const SUARA_P2 = "Ada lima topi yang tidak berpasangan. Itulah selisih topi dan dasi.";
const SUARA_P3 = "Tujuh belas dikurangi dua belas sama dengan lima. Selisih berarti beda banyaknya!";

const px = (i: number): number => xBaris(150, 17, i, 16);
const TOPI17 = Array.from({ length: 17 }, (_, i) => i);
const DASI12 = Array.from({ length: 12 }, (_, i) => i);
const SISA5 = [12, 13, 14, 15, 16];

export const ADEGAN_PASANG: AdeganStory = {
  id: "pasang",
  judul: "Memasangkan topi dan dasi",
  sumber: "Materi: selisih dengan memasangkan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Memasangkan satu-satu")),
      tambah("Dika", ...tokoh("dk", 30, 184, E.dika, "Dika")),
      tambah("topi", ...TOPI17.flatMap((i) => topiMP(`pt${i}`, px(i), 62))),
      tambah("dasi", ...DASI12.map((i) => dasi(`pd${i}`, px(i), 102))),
      tambah("satu-satu.", ...DASI12.map((i) => gs(`pl${i}`, px(i), 70, px(i), 92, W.biru, 1.2, { putus: true })), ...kartu("sp", 170, 138, 120, 24, W.krem, ["1 topi : 1 dasi"], 9.6)),
      tambah("belas,", teks("l17", 150, 44, "17 topi", 10, W.merah)),
      tambah("belas@2", teks("l12", 245, 106, "12 dasi", 10, W.merah)),
    ),
    k(
      SUARA_P2,
      hapus(0, "sp-k", "sp-t0"),
      tambah("Ada", ...kartu("sg", 208, 74, 82, 22, W.merahMuda, ["5 topi sisa"], 9)),
      sorotkan("lima", ...SISA5.flatMap((i) => [`pt${i}`, `pt${i}-b`])),
      tambah("berpasangan.", emo("tq", 246, 126, E.tanya, 22)),
      tambah("selisih", ...kartu("sl", 150, 138, 140, 24, W.hijauMuda, ["selisih = beda banyak"], 9)),
    ),
    k(
      SUARA_P3,
      hapus(0, "sg-k", "sg-t0", "sl-k", "sl-t0", "tq", "l17", "l12"),
      tambah(0, teks("ek", 170, 172, "17", 20, W.merah)),
      ubah("dikurangi", { id: "ek", isi: "17 −" }),
      ubah("dua", { id: "ek", isi: "17 − 12" }),
      ubah("sama", { id: "ek", isi: "17 − 12 =" }),
      ubah("lima.", { id: "ek", isi: "17 − 12 = 5" }),
      tambah("beda", emo("lp", 262, 140, E.lampu, 24)),
    ),
  ],
};

/* ------------------------------ 3. Mundur ------------------------------ */
const SUARA_M1 = "Lalu penggaris. Ada sembilan belas penggaris, dan empat sudah terjual.";
const SUARA_M2 = "Nia menghitung mundur empat langkah dari sembilan belas: delapan belas, tujuh belas, enam belas, lima belas.";
const SUARA_M3 = "Sembilan belas dikurangi empat sama dengan lima belas penggaris!";

const gx = (c: number): number => 30 + c * 52;
const gy = (r: number): number => 48 + r * 20;
const PENGGARIS19 = Array.from({ length: 19 }, (_, i) => i);
const JX = (n: number): number => 50 + (n - 15) * 50;

export const ADEGAN_MUNDUR: AdeganStory = {
  id: "mundur",
  judul: "Mengurangi dengan mundur",
  sumber: "Materi: mundur di jalur bilangan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Penggaris di rak"), lantai("tn", 150)),
      tambah("penggaris.", ...PENGGARIS19.flatMap((i) => penggaris(`pg${i}`, gx(i % 5), gy(Math.floor(i / 5)), 40, 7))),
      tambah("belas", ...kartu("p19", 20, 132, 120, 22, W.krem, ["19 penggaris"], 9.6)),
      sorotkan("terjual.", ...[15, 16, 17, 18].flatMap((i) => [`pg${i}`])),
      tambah("empat", ...kartu("t4", 160, 132, 120, 22, W.merahMuda, ["terjual 4"], 9.6)),
    ),
    k(
      SUARA_M2,
      bersih(0),
      tambah(0, judul("Mundur empat langkah"), ...jalurBilangan("jb", 104, 15, 19, 50, 250)),
      tambah("Nia", ...nia("ni", 30, 184)),
      ...(() => {
        const pos = urutNilai(SUARA_M2, [4, 19, 18, 17, 16, 15]);
        return [
          tambah(pos[0], ...kartu("l4", 200, 140, 90, 22, W.krem, ["4 langkah"], 9.6)),
          sorotkan(pos[1], "jb-q19"),
          ...[18, 17, 16, 15].flatMap((n, q) => [tambah(pos[2 + q], panah(`hp${n}`, JX(n + 1) - 4, 88, JX(n) + 4, 88, W.merah)), sorotkan(pos[2 + q], `jb-q${n}`)]),
        ];
      })(),
    ),
    k(
      SUARA_M3,
      hapus(0, "l4-k", "l4-t0"),
      tambah(0, teks("em", 150, 160, "19", 20, W.merah)),
      ubah("dikurangi", { id: "em", isi: "19 −" }),
      ubah("empat", { id: "em", isi: "19 − 4" }),
      ubah("sama", { id: "em", isi: "19 − 4 =" }),
      ubah("lima", { id: "em", isi: "19 − 4 = 5" }),
      ubah("belas", { id: "em", isi: "19 − 4 = 15" }),
      tambah("penggaris!", emo("ok", 262, 140, E.benar, 24)),
    ),
  ],
};
