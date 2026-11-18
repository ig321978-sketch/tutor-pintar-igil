import type { AdeganStory } from "./logika-story";
import { E, W, WK, bulat, busur, emo, gantungan, jalurBilangan, judul, kardus, kartu, kotak, lantai, panah, pensil, rak, teks, tokoh, troli } from "./k2b2A-gambar";
import { hapus, k, sorotkan, tambah, ubah, urutKata } from "./k2b2A-bantu";

/*
 * Cerita orisinal IGIL "Kiriman dari Gudang" (Kelas 2 Bab 2 Sub-Bab A, penjumlahan sampai dua puluh), awal cerita Toko Seragam dan Alat Tulis Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b2a.md. Bagian ini: kardus datang, menghitung dari awal (salah langkah), dan maju dari bilangan yang besar.
 */

/* ------------------------------ 1. Kardus datang ------------------------------ */
const SUARA_D1 = "Hari pertama sekolah, Pak Ujang mengantar banyak kardus dari gudang ke koperasi sekolah.";
const SUARA_D2 = "Bu Sari berpesan, isi semua kardus harus tercatat sebelum bel pertama berbunyi.";
const SUARA_D3 = "Kalau catatannya keliru, anak baru bisa tidak kebagian seragam!";

export const ADEGAN_KARDUS_DATANG: AdeganStory = {
  id: "kardus-datang",
  judul: "Kardus datang dari gudang",
  sumber: "Materi: kardus datang dari gudang",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Kiriman dari Gudang"), lantai("lt", 168), ...rak("rk", 14, 52, 104, 96, 3), ...gantungan("gt", 136, 66, 70, 98)),
      tambah("Pak", ...tokoh("pu", 196, 178, "Pak Ujang")),
      tambah("mengantar", ...troli("tr", 218, 152, 66)),
      tambah("banyak", ...kardus("k1", 226, 126, 24, 26)),
      tambah("kardus", ...kardus("k2", 252, 132, 28, 20), ...kardus("k3", 232, 106, 22, 20)),
      tambah("gudang", ...kartu("gd", 206, 70, 80, 20, W.krem, ["dari gudang"], 8.4)),
      tambah("koperasi", ...kartu("kp", 70, 26, 160, 18, WK.rak, ["KOPERASI SEKOLAH"], 9)),
    ),
    k(
      SUARA_D2,
      hapus(0, "gd-k", "gd-t0"),
      tambah("Sari", ...tokoh("bs", 40, 178, "Bu Sari")),
      tambah("berpesan,", ...kartu("ps", 70, 130, 120, 20, W.putih, ["Catat dulu, ya!"], 8.4)),
      tambah("bel@2", emo("bl", 270, 70, E.bel, 22)),
      ubah("berbunyi.", { id: "bl", rot: 24 }),
      tambah("berbunyi.", teks("tg", 270, 50, "tring!", 9, W.merah)),
      tambah("tercatat", ...kartu("ct", 150, 96, 100, 26, W.krem, ["Isi kardus:", "belum ada"], 8.4)),
    ),
    k(
      SUARA_D3,
      hapus(0, "ps-k", "ps-t0", "tg"),
      ubah("keliru,", { id: "ct-t1", isi: "keliru!", warna: W.merah }),
      tambah("anak", ...[0, 1].map((i) => emo(`ak${i}`, 116 + i * 28, 188, E.anak, 20))),
      tambah("tidak", emo("sd", 150, 152, E.sedih, 22)),
      tambah("seragam!", emo("xs", 100, 100, E.salah, 22)),
    ),
  ],
};

/* ------------------------------ 2. Menghitung dari awal (salah langkah) ------------------------------ */
const SUARA_H1 = "Chacha membuka kardus pensil. Ada tiga belas pensil hijau dan lima pensil biru.";
const SUARA_H2 = "Ia menghitung semuanya dari awal sambil menunjuk, sampai sebatang pensil berguling jatuh ke lantai!";
const SUARA_H3 = "Dika tersenyum. Pensil hijau sudah kamu tahu ada tiga belas, jadi tinggal lanjutkan saja.";

const xp = (i: number): number => 44 + 12.6 * i;
const hijau = Array.from({ length: 13 }, (_, i) => i);
const biru = Array.from({ length: 5 }, (_, i) => i);

export const ADEGAN_HITUNG_DARI_AWAL: AdeganStory = {
  id: "hitung-dari-awal",
  judul: "Menghitung semuanya dari awal",
  sumber: "Materi: hitung dari awal (salah langkah)",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Kardus Pensil"), lantai("lt", 168), kotak("kd", 30, 70, 240, 78, WK.kardus, W.coklat, { rx: 3, tebal: 2, z: -1 })),
      tambah("Chacha", ...tokoh("ch", 40, 178, "Chacha")),
      ubah("membuka", { id: "ch", isi: E.kaget }),
      tambah("tiga", ...hijau.flatMap((i) => pensil(`g${i}`, xp(i), 108, WK.hijau))),
      tambah("belas", teks("w13", 90, 60, "13", 12, "#15803D")),
      tambah("lima", ...biru.flatMap((i) => pensil(`b${i}`, xp(13 + i), 108, WK.biru)), teks("w5", 240, 60, "5", 12, W.biru)),
    ),
    k(
      SUARA_H2,
      tambah("menghitung", emo("tj", xp(0), 138, E.jari, 18), teks("ct", 150, 60, "1", 16, W.merah)),
      ubah("semuanya", { id: "tj", x: xp(6) }, { id: "ct", isi: "7" }),
      ubah("menunjuk,", { id: "tj", x: xp(12) }, { id: "ct", isi: "13" }),
      sorotkan("sebatang", "g12", "g12-x"),
      ubah("berguling", { id: "g12", y: 130, rot: 60, sorot: false }, { id: "g12-x", y: 126.5, rot: 60, sorot: false }),
      ubah("lantai!", { id: "g12", x: 214, y: 170, rot: 80 }, { id: "g12-x", x: 214, y: 166.5, rot: 80 }, { id: "ch", isi: E.pikir }),
    ),
    k(
      SUARA_H3,
      hapus(0, "tj", "ct"),
      tambah("Dika", ...tokoh("dk", 266, 178, "Dika")),
      ubah("tersenyum.", { id: "dk", isi: E.senyum }),
      ...hijau.slice(0, 12).map((i) => sorotkan("hijau", `g${i}`)),
      tambah("ada", bulat("lk", 90, 57, 14, "none", W.merah, { tebal: 2 })),
      tambah("lanjutkan", panah("pl", 112, 56, 224, 56, W.merah)),
      sorotkan("saja.", ...biru.map((i) => `b${i}`)),
    ),
  ],
};

/* ------------------------------ 3. Maju dari bilangan yang besar ------------------------------ */
const SUARA_M1 = "Dika mulai dari bilangan yang lebih besar, yaitu tiga belas, lalu maju lima langkah.";
const SUARA_M2 = "Empat belas, lima belas, enam belas, tujuh belas, delapan belas.";
const SUARA_M3 = "Tiga belas ditambah lima sama dengan delapan belas pensil!";

const XJ = (i: number): number => 30 + 48 * i;
const posM2 = urutKata(SUARA_M2, ["empat", "lima", "enam", "tujuh", "delapan"]);

export const ADEGAN_MAJU: AdeganStory = {
  id: "maju",
  judul: "Maju dari bilangan yang besar",
  sumber: "Materi: menghitung maju di jalur bilangan",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Maju dari yang Besar"), lantai("lt", 168), ...jalurBilangan("jl", 30, 110, 6, 48)),
      tambah("Dika", ...tokoh("dk", 266, 178, "Dika")),
      tambah("besar,", bulat("mk", 30, 96, 6, W.merah, W.biru, { tebal: 1.4, z: 3 })),
      tambah("tiga", teks("v13", 30, 134, "13", 12, W.biru)),
      tambah("maju", panah("pj", 40, 80, 84, 80, W.merah)),
      tambah("lima", teks("lg", 150, 60, "5 langkah", 12, W.merah)),
    ),
    k(
      SUARA_M2,
      ...[1, 2, 3, 4, 5].flatMap((i) => [
        tambah(posM2[i - 1], busur(`j${i}`, XJ(i - 1), 108, 48, 22), teks(`v${13 + i}`, XJ(i), 134, String(13 + i), 12, W.biru)),
        ubah(posM2[i - 1], { id: "mk", x: XJ(i) }),
      ]),
    ),
    k(
      SUARA_M3,
      hapus(0, "lg", "pj"),
      tambah("Tiga", teks("f13", 86, 62, "13", 15, W.biru)),
      tambah("ditambah", teks("fp", 112, 62, "+", 15, W.merah)),
      tambah("lima", teks("f5", 134, 62, "5", 15, W.biru)),
      tambah("sama", teks("fs", 158, 62, "=", 15, W.merah)),
      tambah("delapan", teks("f18", 188, 62, "18", 15, "#15803D")),
      sorotkan("pensil!", "mk", "v18", "f18"),
    ),
  ],
};
