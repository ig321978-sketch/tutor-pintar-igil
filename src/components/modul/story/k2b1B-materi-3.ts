import type { AdeganStory, Obj } from "./logika-story";
import { E, W, WK, bulat, buSari, emo, idMeja, idTokoh, isiTabelPS, judul, kartu, kotak, kotakKue, lantai, lepas, mejaKasir, nia, pakAnto, papanCatat, tabelPS, teks, tokoh, xBaris } from "./k2b1B-gambar";
import { hapus, idx, k, sorotkan, tambah, ubah } from "./k2b1B-bantu";

/*
 * Cerita orisinal IGIL "Pesanan Kue Hari Olahraga" (Kelas 2 Bab 1 Sub-Bab B, puluhan dan satuan), tengah cerita Kue di Kantin Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b1b.md. Bagian ini: bentuk panjang (tiga puluh delapan), pesanan selesai, dan penutup (jembatan ke Sub-Bab C: dua nampan).
 */

/* ------------------------------ 7. Bentuk panjang: 38 = 30 + 8 ------------------------------ */
const SUARA_B1 = "Nia menguraikan pesanan terakhir. Tiga puluh delapan sama dengan tiga puluh ditambah delapan.";
const SUARA_B2 = "Tiga puluh itu tiga puluhan, dan delapan itu delapan satuan.";
const SUARA_B3 = "Dari uraian itu Chacha bisa menulis bilangannya sendiri.";

export const ADEGAN_PANJANG: AdeganStory = {
  id: "bentuk-panjang",
  judul: "Bentuk panjang",
  sumber: "Materi: 38 = 30 + 8",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Bentuk panjang"), lantai("tn", 150), ...nia("ni", 24, 150)),
      tambah("pesanan", papanCatat("pc", 50, 30, 200, 112)),
      tambah("Tiga", teks("eq", 150, 62, "3", 22, W.merah, { z: 2 })),
      ubah("puluh", { id: "eq", isi: "30" }),
      ubah("delapan", { id: "eq", isi: "38" }),
      ubah("sama", { id: "eq", isi: "38 =" }),
      ubah(idx(SUARA_B1, "tiga", 2), { id: "eq", isi: "38 = 3" }),
      ubah(idx(SUARA_B1, "puluh", 2), { id: "eq", isi: "38 = 30" }),
      ubah("ditambah", { id: "eq", isi: "38 = 30 +" }),
      ubah(idx(SUARA_B1, "delapan", 2), { id: "eq", isi: "38 = 30 + 8" }),
    ),
    k(
      SUARA_B2,
      tambah(3, ...tabelPS("tb", 84, 80, "3", "", 66, 22)),
      sorotkan("puluhan,", "tb-hp"),
      tambah("delapan", isiTabelPS("tb", 84, 80, "s", "8", 66, 22)),
      sorotkan("satuan.", "tb-hs"),
    ),
    k(
      SUARA_B3,
      tambah("Chacha", ...tokoh("ch", 262, 150, E.chacha, "Chacha")),
      tambah("menulis", ...[0, 1, 2].flatMap((i) => kotakKue(`bk${i}`, 76 + i * 44, 176))),
      tambah("bilangannya", ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => lepas(`lp${i}`, xBaris(244, 8, i, 12), 176, 13))),
      tambah("sendiri.", emo("ok", 262, 122, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ 8. Pesanan selesai ------------------------------ */
const SUARA_S1 = "Pak Anto memeriksa kotak-kotak kue. Dua puluh lima, benar sesuai pesanan.";
const SUARA_S2 = "Para pelari bersorak, dan Chacha meniup peluit Pak Anto sampai tepung di meja beterbangan!";
const SUARA_S3 = "Tidak ada pelari yang pulang tanpa kue.";

const TEPUNG: [number, number, number][] = [[112, 84, 8], [150, 76, 10], [186, 88, 7], [130, 100, 6]];

export const ADEGAN_SELESAI: AdeganStory = {
  id: "pesanan-selesai",
  judul: "Pesanan selesai",
  sumber: "Materi: 25 kue tepat",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Pesanan diperiksa"), lantai("tn", 150), ...mejaKasir("mj", 90, 112, 120)),
      tambah("Pak", ...pakAnto("pa", 50, 150)),
      tambah("memeriksa", emo("kc", 80, 122, E.kaca, 18)),
      tambah(idx(SUARA_S1, "kotak-kotak"), ...kotakKue("bk0", 114, 98), ...kotakKue("bk1", 158, 98)),
      tambah("kue.", ...[0, 1, 2, 3, 4].map((i) => lepas(`lp${i}`, xBaris(252, 5, i, 15), 98, 15))),
      tambah("Dua", teks("pn", 150, 58, "2", 20, W.merah)),
      ubah("puluh", { id: "pn", isi: "20" }),
      ubah("lima,", { id: "pn", isi: "25" }),
      tambah("benar", emo("ok", 200, 66, E.benar, 20)),
    ),
    k(
      SUARA_S2,
      tambah("pelari", ...[0, 1, 2].map((i) => emo(`pl${i}`, 226 + i * 30, 150, E.lari, 24))),
      tambah("bersorak,", emo("ps", 256, 122, E.pesta, 22)),
      tambah("Chacha", ...tokoh("ch", 14, 150, E.chacha, "Chacha")),
      tambah("meniup", teks("tp", 30, 130, "fiuu!", 9, W.merah)),
      tambah("tepung", ...TEPUNG.map(([x, y, r], i) => bulat(`tt${i}`, x, y, r, WK.tepung, "#CBD5E1", { op: 0.9, z: 3 }))),
      ubah("beterbangan!", ...TEPUNG.map(([, y, r], i) => ({ id: `tt${i}`, y: y - 22, r: r + 3 }))),
    ),
    k(
      SUARA_S3,
      hapus(0, "ps", "tp", ...TEPUNG.map((_, i) => `tt${i}`)),
      tambah("pelari", ...[0, 1, 2].map((i) => lepas(`rk${i}`, 226 + i * 30, 124, 16))),
      tambah("tanpa", emo("sn", 150, 186, E.senyum, 22)),
      tambah("kue.", emo("jp", 256, 98, E.jempol, 22)),
    ),
  ],
};

/* ------------------------------ 9. Penutup: dua nampan dan jembatan ke Sub-Bab C ------------------------------ */
const SUARA_Z1 = "Setelah lomba, Bu Dewi dari dapur datang membawa dua nampan kue baru.";
const SUARA_Z2 = "Dika merangkum. Baca puluhannya dulu, lalu satuannya, dan perhatikan letak tiap angka.";
const SUARA_Z3 = "Nampan pertama berisi tiga puluh delapan kue, nampan kedua empat puluh satu. Menurutmu, nampan mana yang lebih banyak? Terima kasih, Chacha, Dika, Nia, dan Bu Sari!";

/** Nampan kue berpusat (cx, cy): alas `${id}` dan tiga kue `${id}-e{i}`. */
const nampan = (id: string, cx: number, cy: number, w = 44, u = 12): Obj[] => [
  kotak(id, cx - w / 2, cy - 4, w, 8, "#E5E7EB", W.biru, { rx: 2, tebal: 1.4 }),
  ...[0, 1, 2].map((i) => emo(`${id}-e${i}`, cx - w / 3 + (i * w) / 3, cy - 2, E.kue, u)),
];
const idNampan = (id: string): string[] => [id, `${id}-e0`, `${id}-e1`, `${id}-e2`];

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Dua nampan baru",
  sumber: "Materi: penutup dan dua nampan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Nampan baru dari dapur"), lantai("tn", 150), ...mejaKasir("mj", 60, 112, 150)),
      tambah("Bu", ...tokoh("bd", 262, 150, E.dewi, "Bu Dewi")),
      ubah("datang", { id: "bd", x: 240 }, { id: "bd-n", x: 240 }),
      tambah("dua", ...kartu("n2", 190, 36, 92, 20, W.krem, ["2 nampan"], 8.6)),
      tambah("nampan", ...nampan("n1", 96, 108), ...nampan("n2b", 140, 108)),
    ),
    k(
      SUARA_Z2,
      hapus(0, ...idMeja("mj"), ...idNampan("n1"), ...idNampan("n2b"), ...idTokoh("bd"), "n2-k", "n2-t0"),
      tambah("Dika", ...tokoh("dk", 28, 150, E.dika, "Dika")),
      tambah("Baca", papanCatat("pc", 60, 30, 190, 86)),
      tambah("puluhannya", teks("r1", 155, 52, "1. Baca puluhannya", 10.5, W.biru, { z: 2 })),
      tambah("satuannya,", teks("r2", 155, 72, "2. Baca satuannya", 10.5, W.biru, { z: 2 })),
      tambah("letak", teks("r3", 155, 92, "3. Lihat letak angka", 10.5, W.biru, { z: 2 })),
      tambah("angka.", emo("ls", 262, 150, E.lampu, 26)),
    ),
    k(
      SUARA_Z3,
      hapus(0, ...idTokoh("dk"), "pc", "r1", "r2", "r3", "ls"),
      tambah(0, kotak("et", 20, 30, 260, 92, "#E0F2FE", W.biru, { rx: 6, tebal: 3, z: -2 })),
      tambah("Nampan", ...nampan("t1", 90, 100, 90, 18), ...nampan("t2", 210, 100, 90, 18)),
      tambah("tiga", teks("a1", 90, 56, "3", 20, W.merah)),
      ubah("puluh", { id: "a1", isi: "30" }),
      ubah("delapan", { id: "a1", isi: "38" }),
      tambah(idx(SUARA_Z3, "empat"), teks("a2", 210, 56, "4", 20, W.merah)),
      ubah(idx(SUARA_Z3, "puluh", 2), { id: "a2", isi: "40" }),
      ubah(idx(SUARA_Z3, "satu."), { id: "a2", isi: "41" }),
      tambah("mana", emo("tq", 150, 56, E.tanya, 24)),
      tambah("Chacha,", ...tokoh("ch", 30, 150, E.chacha, "Chacha"), emo("w0", 30, 124, E.lambai, 18)),
      tambah("Dika,", ...tokoh("dk", 75, 150, E.dika, "Dika"), emo("w1", 75, 124, E.lambai, 18)),
      tambah("Nia,", ...nia("ni", 120, 150), emo("w2", 120, 124, E.lambai, 18)),
      tambah(idx(SUARA_Z3, "Bu"), ...buSari("bs", 165, 150), emo("w3", 165, 124, E.lambai, 18)),
      tambah("Terima", ...tokoh("bd", 250, 150, E.dewi, "Bu Dewi"), ...nampan("bn", 214, 140, 36, 11)),
    ),
  ],
};
