import type { AdeganStory } from "./logika-story";
import { E, W, WK, bulat, deretKue, emo, etalase, gs, judul, jam, kartu, kue, lantai, nampan, teks, tokoh } from "./k2b1A-gambar";
import { hapus, k, sorotkan, tambah, ubah } from "./k2b1A-bantu";

/*
 * Cerita orisinal IGIL "Kue Kiriman dari Dapur" (Kelas 2 Bab 1 Sub-Bab A, menghitung, membaca, dan menulis bilangan sampai lima puluh), awal cerita Kue di Kantin Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b1a.md. Bagian ini: kue datang, jari berkrim (salah langkah), dan menggeser sambil menyebut bilangan.
 */

/* ------------------------------ 1. Kue datang ------------------------------ */
const SUARA_D1 = "Dapur sekolah mengirim banyak kue, dan Bu Sari menatanya di nampan etalase.";
const SUARA_D2 = "Bu Sari berpesan, sebelum bel istirahat berbunyi, jumlah kuenya harus sudah tercatat.";
const SUARA_D3 = "Kalau salah catat, ada anak yang antre lama lalu pulang tanpa kue!";

export const ADEGAN_KUE_DATANG: AdeganStory = {
  id: "kue-datang",
  judul: "Kue datang ke kantin",
  sumber: "Materi: kue datang dari dapur",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Kue Kiriman dari Dapur"), lantai("lt", 168), ...etalase("et", 64, 32, 170, 112, 2)),
      tambah("Dapur", emo("dp", 32, 110, E.dapur, 26), teks("dpn", 32, 126, "Dapur", 8.4, W.ungu)),
      tambah("mengirim", emo("tr", 30, 160, E.truk, 24)),
      ubah("banyak", { id: "tr", x: 44 }),
      tambah("kue,", nampan("n1", 76, 82, 146, 6), ...deretKue("a", 6, 92, 24, 72)),
      tambah("Sari", ...tokoh("bs", 268, 178, "Bu Sari")),
      tambah("nampan", nampan("n2", 76, 124, 146, 6), ...deretKue("b", 6, 92, 24, 116)),
      sorotkan("etalase.", "et"),
    ),
    k(
      SUARA_D2,
      hapus(0, "tr"),
      tambah("berpesan,", ...kartu("ps", 150, 148, 112, 20, W.putih, ["Catat dulu, ya!"], 8.4)),
      tambah("bel", emo("bl", 30, 70, E.bel, 22)),
      ubah("berbunyi,", { id: "bl", rot: 24 }),
      tambah("berbunyi,", teks("tr2", 30, 42, "tring!", 9, W.merah)),
      tambah("tercatat.", ...kartu("ct", 12, 150, 100, 26, W.krem, ["Jumlah kue:", "belum ada"], 8.4)),
    ),
    k(
      SUARA_D3,
      hapus(0, "ps-k", "ps-t0"),
      ubah("catat,", { id: "ct-t1", isi: "salah catat!", warna: W.merah }),
      tambah("anak", ...[0, 1, 2].map((i) => emo(`ak${i}`, 140 + i * 28, 188, E.anak, 20))),
      tambah("lama", ...jam("jm", 222, 160, 12)),
      ubah("pulang", { id: "ak2", x: 206 }),
      tambah("tanpa", emo("sd", 150, 160, E.sedih, 22)),
      tambah("kue!", emo("xk", 178, 160, E.salah, 20)),
    ),
  ],
};

/* ------------------------------ 2. Jari berkrim (salah langkah) ------------------------------ */
const SUARA_J1 = "Chacha buru-buru menghitung kue sambil menunjuk-nunjuk, padahal jarinya berlumur krim.";
const SUARA_J2 = "Dika menyipitkan mata. Itu sudah kamu hitung, Chacha, ada bekas krimnya!";
const SUARA_J3 = "Hitungan Chacha berubah-ubah, dan Bu Sari bertanya, bagaimana supaya tidak ada yang terlewat atau terhitung dua kali?";

export const ADEGAN_JARI_KRIM: AdeganStory = {
  id: "jari-krim",
  judul: "Jari berkrim menghitung kue",
  sumber: "Materi: terhitung dua kali (salah langkah)",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, judul("Jari Berkrim"), lantai("lt", 168), nampan("np", 50, 60, 200, 64, { z: -1 }), ...deretKue("g", 6, 72, 32, 80), ...deretKue("h", 6, 72, 32, 108)),
      tambah("Chacha", ...tokoh("ch", 30, 178, "Chacha")),
      ubah("buru-buru", { id: "ch", x: 52 }, { id: "ch-n", x: 52 }),
      tambah("menghitung", emo("jr", 72, 142, E.jari, 22)),
      ubah("menunjuk-nunjuk,", { id: "jr", x: 136 }),
      ubah("jarinya", { id: "jr", x: 200 }),
      tambah("krim.", bulat("kr", 200, 128, 4, WK.krim, W.merah, { z: 3 })),
    ),
    k(
      SUARA_J2,
      hapus(0, "jr", "kr"),
      tambah("Dika", ...tokoh("dk", 266, 178, "Dika")),
      tambah("mata.", emo("mt", 236, 152, E.mata, 20)),
      tambah("sudah", bulat("bk", 172, 77, 3.5, WK.krim, W.merah, { z: 3 })),
      ubah("krimnya!", { id: "g3", sorot: true }),
    ),
    k(
      SUARA_J3,
      hapus(0, "mt", "bk"),
      ubah(0, { id: "g3", sorot: false }),
      tambah("Hitungan", teks("h1", 70, 48, "35", 15, W.merah)),
      tambah("berubah-ubah,", teks("h2", 150, 48, "38", 15, W.merah)),
      tambah("dan", teks("h3", 230, 48, "34", 15, W.merah)),
      tambah("Sari", ...tokoh("bs", 150, 180, "Bu Sari")),
      tambah("tidak", gs("c1", 58, 52, 82, 40, W.biru, 2), gs("c2", 138, 52, 162, 40, W.biru, 2), gs("c3", 218, 52, 242, 40, W.biru, 2)),
      tambah("supaya", ...kartu("td", 84, 130, 132, 20, W.hijauMuda, ["tandai yang sudah dihitung"], 8.4)),
      tambah("dua", teks("tk", 244, 146, "2 kali", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ 3. Geser sambil menyebut bilangan ------------------------------ */
const SUARA_G1 = "Dika punya cara. Tiap kue yang dihitung ia geser ke nampan kosong sambil menyebut bilangannya.";
const SUARA_G2 = "Bilangan yang terakhir disebut adalah banyak seluruh kue. Hasilnya tiga puluh enam.";
const SUARA_G3 = "Chacha bertanya, adakah cara yang lebih cepat, karena tangannya pegal!";

/** Tempat kue ke-i di nampan kiri (c = 0) atau nampan kanan (c = 1): enam kolom, enam baris. */
const slot = (i: number, kanan: boolean): [number, number] => [(kanan ? 170 : 26) + 20 * (i % 6), 52 + 11 * Math.floor(i / 6)];
const pindah = (...nomor: number[]) => nomor.map((i) => ({ id: `k${i}`, x: slot(i, true)[0] - 6, y: slot(i, true)[1] - 4.5 }));

export const ADEGAN_GESER: AdeganStory = {
  id: "geser",
  judul: "Menggeser sambil menyebut",
  sumber: "Materi: geser tiap kue, bilangan terakhir",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Geser sambil Menyebut"), lantai("lt", 168), nampan("nk", 14, 44, 128, 70, { z: -1 }), nampan("nb", 158, 44, 128, 70, { z: -1 }), ...Array.from({ length: 36 }, (_, i) => kue(`k${i}`, ...slot(i, false)))),
      tambah("Dika", ...tokoh("dk", 30, 178, "Dika")),
      tambah("cara.", emo("ld", 58, 160, E.lampu, 20)),
      tambah("dihitung", teks("ct", 150, 150, "0", 24, W.merah)),
      ubah("geser", ...pindah(0), { id: "ct", isi: "1" }),
      ubah("nampan", ...pindah(1), { id: "ct", isi: "2" }),
      ubah("sambil", ...pindah(2), { id: "ct", isi: "3" }),
      ubah("bilangannya.", ...pindah(3), { id: "ct", isi: "4" }),
    ),
    k(
      SUARA_G2,
      ubah("Bilangan", ...pindah(...Array.from({ length: 14 }, (_, i) => i + 4)), { id: "ct", isi: "18" }),
      ubah("terakhir", ...pindah(...Array.from({ length: 18 }, (_, i) => i + 18)), { id: "ct", isi: "36" }),
      tambah("seluruh", teks("bk", 150, 168, "banyak seluruh kue", 9, W.ungu)),
      ubah("enam.", { id: "ct", u: 30, sorot: true }, { id: "nb", sorot: true }),
    ),
    k(
      SUARA_G3,
      ubah(0, { id: "ct", sorot: false }, { id: "nb", sorot: false }),
      tambah("Chacha", ...tokoh("ch", 266, 178, "Chacha")),
      tambah("bertanya,", emo("qm", 236, 152, E.tanya, 22)),
      ubah("tangannya", { id: "ch", isi: E.capek }),
      tambah("pegal!", teks("ad", 236, 178, "aduh!", 10, W.merah)),
    ),
  ],
};

