import type { AdeganStory } from "./logika-story";
import { E, W, WK, bulat, emo, gs, isiSusun, judul, kartu, kotakPensil, lantai, nia, panah, tabelSusun, teks, tokoh } from "./k2b2B-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k2b2B-bantu";

/*
 * Cerita orisinal IGIL "Rak Seragam Diserbu" (Kelas 2 Bab 2 Sub-Bab B), tengah cerita Toko Seragam dan Alat Tulis Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b2b.md. Bagian ini: cara bersusun dan pasangan bilangan, salah langkah (dua dikurangi delapan dibalik), dan memeriksa dengan penjumlahan.
 */

/* ------------------------------ 4. Bersusun dan pasangan bilangan ------------------------------ */
const SUARA_S1 = "Dika mencoba cara bersusun. Satuan lurus dengan satuan, sembilan dikurangi empat sama dengan lima, puluhannya tetap satu.";
const SUARA_S2 = "Nia memecah sembilan belas menjadi sepuluh dan sembilan, lalu sembilan dikurangi empat sama dengan lima.";
const SUARA_S3 = "Sepuluh ditambah lima sama dengan lima belas. Tiga cara, hasilnya sama!";

export const ADEGAN_SUSUN_PASANGAN: AdeganStory = {
  id: "susun-pasangan",
  judul: "Bersusun dan pasangan bilangan",
  sumber: "Materi: bersusun dan pasangan",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Cara bersusun")),
      tambah("Dika", ...tokoh("dk", 30, 184, E.dika, "Dika")),
      tambah("bersusun.", ...tabelSusun("tb", 90, 34, [["1", "9"], ["", "4"], ["", ""]])),
      sorotkan("Satuan", "tb-hs", "tb-r0s", "tb-r1s"),
      tambah("sembilan", ...kartu("kd", 196, 54, 88, 22, W.krem, ["9"], 10)),
      ubah("dikurangi", { id: "kd-t0", isi: "9 −" }),
      ubah("empat", { id: "kd-t0", isi: "9 − 4" }),
      ubah("sama", { id: "kd-t0", isi: "9 − 4 =" }),
      ubah("lima,", { id: "kd-t0", isi: "9 − 4 = 5" }),
      tambah("lima,", isiSusun("tb", 90, 34, 2, "s", "5", 46, 20, W.merah)),
      tambah("tetap", isiSusun("tb", 90, 34, 2, "p", "1", 46, 20, W.merah)),
      sorotkan(16, "tb-r2p"),
    ),
    k(
      SUARA_S2,
      bersih(0),
      tambah(0, judul("Pasangan bilangan")),
      tambah(0, ...nia("ni0", 270, 184)),
      tambah("belas", bulat("t19", 150, 50, 16, W.krem, W.biru, { tebal: 1.8 }), teks("t19t", 150, 56, "19", 15, W.biru, { z: 1 })),
      tambah(5, gs("pl", 142, 64, 100, 92, W.biru, 1.6), gs("pr", 158, 64, 200, 92, W.biru, 1.6), bulat("t10", 100, 108, 15, WK.puluhan, W.biru, { tebal: 1.8 }), teks("t10t", 100, 114, "10", 14, W.biru, { z: 1 })),
      tambah(7, bulat("t9", 200, 108, 15, WK.satuan, W.biru, { tebal: 1.8 }), teks("t9t", 200, 113, "9", 15, W.biru, { z: 1 })),
      tambah(9, teks("eq", 150, 165, "9", 20, W.merah)),
      ubah("dikurangi", { id: "eq", isi: "9 −" }),
      ubah("empat", { id: "eq", isi: "9 − 4" }),
      ubah("sama", { id: "eq", isi: "9 − 4 =" }),
      ubah("lima.", { id: "eq", isi: "9 − 4 = 5" }),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Tiga cara, satu hasil"), teks("ek", 150, 46, "10", 20, W.merah)),
      ubah("ditambah", { id: "ek", isi: "10 +" }),
      ubah("lima", { id: "ek", isi: "10 + 5" }),
      ubah("sama", { id: "ek", isi: "10 + 5 =" }),
      ubah("belas.", { id: "ek", isi: "10 + 5 = 15" }),
      tambah("Tiga", ...kartu("c1", 14, 68, 92, 22, WK.puluhan, ["mundur"], 9.6), ...kartu("c2", 104, 68, 92, 22, WK.satuan, ["bersusun"], 9.6), ...kartu("c3", 194, 68, 92, 22, W.hijauMuda, ["pasangan"], 9.6)),
      tambah("cara,", bulat("hs", 150, 140, 19, W.krem, W.biru, { tebal: 2 }), teks("hst", 150, 147, "15", 18, W.merah, { z: 1 })),
      tambah("cara,", panah("a1", 60, 92, 138, 124, W.merah), panah("a2", 150, 92, 150, 118, W.merah), panah("a3", 240, 92, 162, 124, W.merah)),
      tambah("hasilnya", ...kartu("n3", 100, 166, 100, 22, W.krem, ["3 cara"], 9.6)),
      sorotkan("sama@2", "hs"),
    ),
  ],
};

/* ------------------------------ 5. Salah langkah: dua dikurangi delapan dibalik ------------------------------ */
const SUARA_T1 = "Sekarang kotak pensil warna. Ada dua belas, dan delapan sudah terjual.";
const SUARA_T2 = "Chacha cepat menjawab. Dua dikurangi delapan tidak bisa, jadi delapan dikurangi dua, hasilnya enam!";
const SUARA_T3 = "Dika mengerutkan dahi. Bagaimana kalau kita periksa dengan penjumlahan?";

const PK = Array.from({ length: 12 }, (_, i) => i);
const pkx = (i: number): number => 38 + (i % 6) * 45;
const pky = (i: number): number => 62 + Math.floor(i / 6) * 34;

export const ADEGAN_TERBALIK: AdeganStory = {
  id: "terbalik",
  judul: "Dua dikurangi delapan dibalik",
  sumber: "Materi: salah langkah membalik",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Kotak pensil warna"), lantai("tn", 150)),
      tambah("kotak", ...PK.flatMap((i) => kotakPensil(`kp${i}`, pkx(i), pky(i)))),
      tambah("belas,", ...kartu("k12", 20, 130, 120, 22, W.krem, ["12 kotak"], 9.6)),
      tambah("delapan", ...kartu("k8", 160, 130, 120, 22, W.merahMuda, ["terjual 8"], 9.6)),
      ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => ubah("terjual.", ...["", "-u", "-p0", "-p1", "-p2"].map((s) => ({ id: `kp${i}${s}`, op: 0.3 })))),
    ),
    k(
      SUARA_T2,
      bersih(0),
      tambah(0, judul("Chacha menjawab cepat"), ...tabelSusun("tb", 90, 34, [["1", "2"], ["", "8"], ["", ""]])),
      tambah("Chacha", ...tokoh("ch", 30, 184, E.chacha, "Chacha")),
      sorotkan("Dua", "tb-r0s"),
      sorotkan("delapan", "tb-r1s"),
      tambah("tidak", emo("sl", 236, 90, E.salah, 22)),
      tambah("jadi", panah("p1", 192, 70, 192, 92, W.merah), panah("p2", 204, 92, 204, 70, W.merah)),
      tambah("delapan@2", teks("c8", 252, 112, "8", 18, W.merah)),
      tambah("dua@2", teks("c2", 276, 112, "2", 18, W.merah)),
      tambah("enam!", isiSusun("tb", 90, 34, 2, "s", "6", 46, 20, W.merah), ...kartu("jw", 170, 146, 120, 24, W.merahMuda, ["8 − 2 = 6"], 11)),
    ),
    k(
      SUARA_T3,
      hapus(0, "sl", "p1", "p2", "c8", "c2", "jw-k", "jw-t0"),
      tambah("Dika", ...tokoh("dk", 262, 184, E.dika, "Dika")),
      tambah("dahi.", emo("pk", 262, 150, E.pikir, 24)),
      tambah("periksa", emo("kc", 150, 62, E.kaca, 24)),
      tambah("penjumlahan?", ...kartu("pj", 20, 146, 120, 24, W.hijauMuda, ["periksa dengan +"], 10)),
    ),
  ],
};

/* ------------------------------ 6. Periksa dengan penjumlahan ------------------------------ */
const SUARA_C1 = "Enam ditambah delapan sama dengan empat belas, padahal kotaknya dari tadi dua belas.";
const SUARA_C2 = "Karena empat belas bukan dua belas, jawaban enam pasti keliru.";
const SUARA_C3 = "Nia menjelaskan, bilangan kecil tidak boleh dibalik dengan bilangan besar.";

export const ADEGAN_PERIKSA_CHACHA: AdeganStory = {
  id: "periksa-salah",
  judul: "Periksa dengan penjumlahan",
  sumber: "Materi: periksa jawaban enam",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Periksa dengan tambah"), teks("e1", 150, 66, "6", 22, W.merah)),
      ubah("ditambah", { id: "e1", isi: "6 +" }),
      ubah("delapan", { id: "e1", isi: "6 + 8" }),
      ubah("sama", { id: "e1", isi: "6 + 8 =" }),
      ubah("belas,", { id: "e1", isi: "6 + 8 = 14" }),
      tambah("kotaknya", ...kartu("kk", 110, 100, 80, 22, W.krem, ["kotak awal"], 9)),
      tambah("dua", teks("k12", 150, 152, "12", 30, W.biru)),
      sorotkan("belas@2", "kk-k"),
    ),
    k(
      SUARA_C2,
      hapus(0, "kk-k", "kk-t0"),
      tambah("Karena", ...tokoh("bs", 30, 184, E.sari, "Bu Sari")),
      tambah("empat", teks("e2", 150, 108, "14", 22, W.merah)),
      ubah("bukan", { id: "e2", isi: "14 ≠" }),
      ubah("dua", { id: "e2", isi: "14 ≠ 12" }),
      tambah("enam", teks("e6", 252, 66, "6", 26, W.biru), emo("x6", 252, 100, E.salah, 22)),
      sorotkan("keliru.", "e1"),
    ),
    k(
      SUARA_C3,
      hapus(0, "e1", "e2", "x6", "e6", "k12", "bs", "bs-n"),
      tambah("Nia", ...nia("ni", 30, 184)),
      tambah("kecil", ...kartu("kc", 24, 52, 100, 32, WK.puluhan, ["kecil", "2"], 10)),
      tambah("tidak", emo("sl", 150, 100, E.salah, 24)),
      tambah("dibalik", emo("tk", 150, 66, E.tukar, 24)),
      tambah("besar.", ...kartu("bg", 176, 52, 100, 32, WK.satuan, ["besar", "8"], 10)),
    ),
  ],
};
