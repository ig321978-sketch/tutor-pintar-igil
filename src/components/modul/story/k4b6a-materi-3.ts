import type { AdeganStory } from "./logika-story";
import { E, W, barisPapan, bulat, emo, idBarisPapan, judul, kertasPetak, kotak, papanData, penggaris, tanah, teks, tokoh, deret } from "./k4b6a-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah } from "./k4b6a-bantu";

/*
 * Cerita orisinal IGIL "Piktogram Jajanan Bu Rini" (Kelas 4 Bab 6 Sub-Bab A, piktogram skala satu dan lebih dari satu), awal cerita Bazar Kuliner Sekolah.
 * Naskah suara dari naskah/story-naskah-k4b6a.md. Bagian ini: membandingkan (paling banyak, paling sedikit, selisih), keterangan lain (satu ikon sama dengan sepuluh porsi), dan kedatangan Pak Dodi (jembatan ke Sub-Bab B).
 */

const BARIS: [string, string, number][] = [
  ["risoles", E.risoles, 6],
  ["pisang", E.pisang, 4],
  ["lemper", E.lemper, 3],
  ["cincau", E.cincau, 5],
];
const papanEmpat = () => BARIS.flatMap(([n, e, j], i) => barisPapan(`r${i + 1}`, 52 + i * 20, n, e, j, 146, 16, 13));

/* ------------------------------ 7. Membandingkan ------------------------------ */
const SUARA_D1 = "Genta menunjuk risoles yang ikonnya paling banyak, jadi itu jajanan paling laris.";
const SUARA_D2 = "Lemper ikonnya paling sedikit, sehingga paling sedikit terjual.";
const SUARA_D3 = "Selisih risoles dan lemper tiga ikon, yaitu lima belas porsi.";

export const ADEGAN_BANDING: AdeganStory = {
  id: "banding",
  judul: "Paling banyak dan paling sedikit",
  sumber: "Materi: membandingkan",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Paling Banyak"), ...tanah("tn", 150), ...papanData("pp", 86, 28, 204, 112)),
      tambah("Genta", ...tokoh("ge", 40, 184, "Genta")),
      tambah("risoles", ...papanEmpat()),
      sorotkan("ikonnya", "r10", "r11", "r12", "r13", "r14", "r15"),
      tambah("paling", teks("mx", 262, 56, "terbanyak", 8, W.sorot, { z: 3 })),
      tambah("laris.", emo("pl", 262, 76, E.bintang, 16, { z: 3 })),
    ),
    k(
      SUARA_D2,
      sorotkan("Lemper", "r30", "r31", "r32"),
      redamkan("Lemper", "r10", "r11", "r12", "r13", "r14", "r15"),
      hapus("paling", "mx", "pl"),
      tambah("sedikit,", teks("mn", 262, 96, "paling sedikit", 7.6, W.sorot, { z: 3 })),
      tambah("terjual.", emo("tj", 262, 112, E.salah, 14, { z: 3 })),
    ),
    k(
      SUARA_D3,
      hapus(0, "mn", "tj"),
      sorotkan("Selisih", "r10", "r11", "r12", "r13", "r14", "r15"),
      tambah("tiga", teks("s1", 190, 154, "6 − 3 = 3 ikon", 10, W.merah)),
      tambah("yaitu", teks("s2", 190, 170, "3 × 5 = 15 porsi", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ 8. Keterangan lain ------------------------------ */
const SUARA_L1 = "Bu Rini berkata, kalau datanya besar, satu ikon bisa mewakili sepuluh porsi supaya papan tidak terlalu panjang.";
const SUARA_L2 = "Kalau satu ikon hanya mewakili satu porsi, kita perlu tiga puluh ikon hanya untuk risoles.";
const SUARA_L3 = "Karena itu keterangan harus dibaca lebih dulu sebelum kita menghitung ikonnya.";
const TITIK = Array.from({ length: 30 }, (_, i) => `dt${i}`);

export const ADEGAN_KETERANGAN_LAIN: AdeganStory = {
  id: "keterangan-lain",
  judul: "Keterangan yang lain",
  sumber: "Materi: keterangan lain",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Keterangan Lain"), ...tanah("tn", 150), ...papanData("pp", 86, 28, 204, 112)),
      tambah("Bu", ...tokoh("br", 40, 184, "Bu Rini")),
      tambah("besar,", teks("db", 188, 52, "data besar", 9, W.sorot, { z: 3 })),
      tambah("sepuluh", teks("kt", 188, 72, "1 ikon = 10 porsi", 10, W.krem, { z: 3 })),
      tambah("porsi", ...barisPapan("rs", 100, "risoles", E.risoles, 3, 150, 22, 16)),
      tambah("panjang.", teks("pj", 188, 126, "papan jadi pendek", 8.4, W.sorot, { z: 3 })),
    ),
    k(
      SUARA_L2,
      hapus(0, "db", "kt", "pj", ...idBarisPapan("rs", 3)),
      tambah("satu", teks("k1", 188, 50, "1 ikon = 1 porsi", 10, W.krem, { z: 3 })),
      tambah("hanya", teks("r1", 120, 74, "risoles", 8, W.kapur, { z: 3 })),
      tambah("tiga", ...TITIK.map((id, i) => bulat(id, 142 + (i % 15) * 9, 70 + Math.floor(i / 15) * 12, 3, "#FCD34D", "#B45309", { tebal: 0.8, z: 3 }))),
      tambah("ikon", teks("k30", 188, 116, "30 ikon", 10, W.sorot, { z: 3 })),
    ),
    k(
      SUARA_L3,
      bersih(0),
      tambah(0, judul("Baca Keterangan Dulu"), ...tanah("tn", 150), ...papanData("pp", 86, 28, 204, 112), ...tokoh("lr", 40, 184, "Laras")),
      tambah("keterangan", kotak("ket", 100, 40, 176, 26, W.krem, W.coklat, { rx: 3, tebal: 1.6, z: 4 }), teks("ket1", 188, 58, "1 ikon = ?", 10, W.merah, { z: 5 })),
      tambah("dibaca", emo("mt", 262, 100, E.mata, 20, { z: 3 }), teks("l1", 160, 100, "1. baca keterangan", 8.6, W.kapur, { z: 3 })),
      tambah("menghitung", teks("l2", 160, 122, "2. hitung ikon", 8.6, W.kapur, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 9. Penutup: Pak Dodi dan kertas berpetak ------------------------------ */
const SUARA_N1 = "Pak Dodi, panitia bazar, datang membawa kertas berpetak dan penggaris panjang.";
const SUARA_N2 = "Ia ingin data jajanan itu digambar menjadi batang yang berdiri tegak, supaya lebih mudah dibandingkan.";
const SUARA_N3 = "Menurutmu, apa bedanya batang dengan deretan ikon? Terima kasih, Satria, Laras, Genta, Pak Hendro, dan Bu Rini!";
const TINGGI = [60, 40, 30, 50];
const batang = (id: string, i: number) => kotak(id, 142 + i * 22, 130 - TINGGI[i], 16, TINGGI[i], ["#F87171", "#FBBF24", "#34D399", "#60A5FA"][i], W.biru, { rx: 1, tebal: 1.2, z: 3 });

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Pak Dodi membawa kertas",
  sumber: "Materi: jembatan ke diagram batang",
  latar: "#FEF9C3",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Pak Dodi Datang"), ...tanah("tn", 150)),
      tambah("Dodi,", ...tokoh("pd", 60, 184, "Pak Dodi")),
      tambah("panitia", emo("mg", 264, 60, E.megafon, 20), teks("pt", 264, 78, "panitia", 8.4, W.coklat)),
      tambah("kertas", ...kertasPetak("kp", 130, 36, 100, 80)),
      tambah("penggaris", ...penggaris("pg", 130, 124, 100)),
    ),
    k(
      SUARA_N2,
      hapus(0, "mg", "pt"),
      tambah("data", teks("dj", 264, 56, "data jajanan", 8.4, W.coklat)),
      tambah("digambar", ...[0, 1, 2, 3].map((i) => batang(`bt${i}`, i))),
      sorotkan("tegak,", "bt0"),
      tambah("tegak,", teks("tg", 264, 82, "tegak", 10, W.merah)),
      tambah("dibandingkan.", emo("ok", 264, 108, E.benar, 20)),
    ),
    k(
      SUARA_N3,
      bersih(0),
      tambah(0, judul("Terima Kasih"), ...tanah("tn", 150)),
      tambah("bedanya", teks("tq", 150, 60, "?", 26, W.merah)),
      tambah("batang", ...[0, 1, 2].map((i) => kotak(`bb${i}`, 196 + i * 20, 118 - [40, 26, 32][i], 14, [40, 26, 32][i], ["#F87171", "#FBBF24", "#34D399"][i], W.biru, { rx: 1, tebal: 1.2, z: 3 })), teks("bn", 226, 132, "batang", 8.4, W.coklat)),
      tambah("deretan", ...deret("dd", 50, 108, E.risoles, 4, 20, 16), teks("dn", 90, 132, "deretan ikon", 8.4, W.coklat)),
      tambah("Satria,", ...tokoh("sa", 28, 184, "Satria")),
      tambah("Laras,", ...tokoh("lr", 74, 184, "Laras")),
      tambah("Genta,", ...tokoh("ge", 120, 184, "Genta")),
      tambah("Hendro,", ...tokoh("ph", 166, 184, "Pak Hendro")),
      tambah("Rini!", ...tokoh("br", 212, 184, "Bu Rini"), ...tokoh("pd", 258, 184, "Pak Dodi"), emo("lb", 150, 150, E.lambai, 18)),
    ),
  ],
};
