import type { AdeganStory } from "./logika-story";
import { E, WT, W, WARNA_BENTUK, bangun, emo, gerbang, idKarung, judul, karung, kartu, papanPetak, relBeraturan, relSegitiga, relSegiempat, rumput, sudutBangun, teks, tokoh, tengahPetak, telur } from "./k2b3A-gambar";
import { hapus, k, sisiAksi, sorotkan, tambah, ubah } from "./k2b3A-bantu";

/*
 * Cerita orisinal IGIL "Ubin untuk Taman Bermain" (Kelas 2 Bab 3 Sub-Bab A, bangun datar), awal cerita Taman Bermain Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b3a.md. Bagian ini: ubin datang, memilah tepi, dan salah hitung sisi (salah langkah).
 */

/* ------------------------------ 1. Ubin datang ------------------------------ */
const SUARA_U1 = "Taman bermain sekolah akan dibuka hari Sabtu, dan Pak Tono mengantar berkarung-karung ubin.";
const SUARA_U2 = "Bu Sari berpesan, setiap petak di papan permainan hanya muat ubin yang bentuknya tepat.";
const SUARA_U3 = "Kalau salah pasang, anak-anak bisa tersandung, dan papan permainan tidak jadi dibuka!";

const PX = 200;
const PY = 112;
const petak1 = tengahPetak(PX, PY, 3, 1, 26);

export const ADEGAN_UBIN_DATANG: AdeganStory = {
  id: "ubin-datang",
  judul: "Ubin datang ke taman",
  sumber: "Materi: ubin datang ke taman",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Ubin untuk Taman Bermain"), rumput("rp"), gerbang("gb", 90, 34, 120)),
      tambah("Sabtu,", kartu("sb", 112, 92, 76, 18, W.krem, ["Hari Sabtu"], 9)),
      tambah("Tono", ...tokoh("pt", 30, 178, "Pak Tono")),
      ubah("mengantar", { id: "pt", x: 50 }, { id: "pt-n", x: 50 }, { id: "pt-hl", x: 50 }),
      tambah("berkarung-karung", ...karung("kr0", 80, 124)),
      tambah("ubin.", ...karung("kr1", 124, 124), ...karung("kr2", 168, 124)),
    ),
    k(
      SUARA_U2,
      hapus(0, ...idKarung("kr0"), ...idKarung("kr1"), ...idKarung("kr2"), "sb-k", "sb-t0"),
      tambah("Sari", ...tokoh("bs", 270, 178, "Bu Sari")),
      tambah("berpesan,", ...kartu("ps", 100, 100, 92, 22, W.putih, ["Hati-hati, ya!"], 8.6)),
      tambah("petak", ...papanPetak("pp", PX, PY, 3, 2, 26)),
      tambah("ubin", bangun("ub", relSegiempat(16, 16), 160, 96, WT.ubinHijau)),
      ubah("tepat.", { id: "ub", x: petak1.x, y: petak1.y }, { id: "pp", sorot: true }),
      tambah("tepat.", emo("ok", petak1.x, 104, E.benar, 14)),
    ),
    k(
      SUARA_U3,
      hapus(0, "ub", "ok", "ps-k", "ps-t0"),
      ubah(0, { id: "pp", sorot: false }),
      tambah("salah", bangun("sg", relSegitiga(22, 20), petak1.x, petak1.y, WARNA_BENTUK[3])),
      tambah("pasang,", emo("xx", petak1.x, 104, E.salah, 14)),
      tambah("anak-anak", emo("an", 130, 178, E.anak, 24)),
      ubah("tersandung,", { id: "an", rot: 72, x: 140 }),
      tambah("tersandung,", emo("bt", 160, 160, E.bintang, 14), emo("bu", 112, 164, E.bintang, 12)),
      tambah("dibuka!", ...kartu("tt", 118, 96, 74, 20, W.merahMuda, ["Belum dibuka"], 8.6)),
    ),
  ],
};

/* ------------------------------ 2. Memilah tepi ------------------------------ */
const SUARA_P1 = "Nia menelusuri tepi sebuah ubin dengan jarinya. Tepi yang lurus disebut sisi.";
const SUARA_P2 = "Ubin yang punya beberapa sisi disebut segi banyak. Ubin yang tepinya melengkung disebut bentuk lengkung.";
const SUARA_P3 = "Segi banyak masuk ke keranjang kuning, dan bentuk lengkung masuk ke keranjang hijau.";

const ptsUbin = sudutBangun(relSegiempat(74, 56), 150, 96, 8);

export const ADEGAN_PILAH_TEPI: AdeganStory = {
  id: "pilah-tepi",
  judul: "Memilah tepi ubin",
  sumber: "Materi: tepi lurus dan melengkung",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Tepi Ubin"), rumput("rp")),
      tambah("Nia", ...tokoh("ni", 36, 178, "Nia")),
      tambah("tepi", bangun("ut", relSegiempat(74, 56), 150, 96, WT.ubinKuning, 8)),
      tambah("menelusuri", emo("jr", ptsUbin[0].x, ptsUbin[0].y + 10, E.jari, 20, { z: 6 })),
      ubah("jarinya.", { id: "jr", x: ptsUbin[1].x, y: ptsUbin[1].y + 10 }),
      tambah("lurus", { id: "tl", t: "garis", x: ptsUbin[1].x, y: ptsUbin[1].y, x2: ptsUbin[2].x - ptsUbin[1].x, y2: ptsUbin[2].y - ptsUbin[1].y, warna: W.merah, tebal: 4, gambar: true, z: 3 }),
      tambah("sisi.", teks("ls", 220, 150, "sisi", 11, W.merah)),
    ),
    k(
      SUARA_P2,
      hapus(0, "jr", "tl", "ls"),
      tambah("beberapa", teks("nb", 110, 154, "segi banyak", 10, W.ungu)),
      ubah("banyak.", { id: "ut", x: 100 }),
      tambah("melengkung", telur("lg", 220, 96, 30, 22, WARNA_BENTUK.lengkung)),
      tambah("lengkung.@2", teks("nl", 222, 154, "bentuk lengkung", 10, W.ungu)),
    ),
    k(
      SUARA_P3,
      hapus(0, "nb", "nl"),
      tambah("keranjang", { id: "kk", t: "kotak", x: 40, y: 132, w: 70, h: 32, warna: WT.ubinKuning, garis: W.coklat, rx: 6, tebal: 2.2, z: -1 }),
      tambah("kuning,", teks("kkn", 75, 178, "keranjang kuning", 8, W.coklat)),
      ubah("kuning,", { id: "ut", x: 75, y: 142, skala: 0.45 }),
      tambah("keranjang@2", { id: "kh", t: "kotak", x: 190, y: 132, w: 70, h: 32, warna: WT.ubinHijau, garis: W.coklat, rx: 6, tebal: 2.2, z: -1 }),
      tambah("hijau.", teks("khn", 225, 178, "keranjang hijau", 8, W.coklat)),
      ubah("hijau.", { id: "lg", x: 225, y: 142, skala: 0.45 }),
    ),
  ],
};

/* ------------------------------ 3. Salah hitung (salah langkah) ------------------------------ */
const SUARA_S1 = "Chacha menghitung sisi ubin sarang lebah sambil memutarnya. Satu, dua, tiga, empat, lima, enam, tujuh!";
const SUARA_S2 = "Dika menyipitkan mata. Ubinnya kamu putar-putar, Chacha, jadi ada sisi yang terhitung dua kali!";
const SUARA_S3 = "Chacha pusing, lalu terduduk di tumpukan ubin sambil tertawa.";

const ptsHex = sudutBangun(relBeraturan(6, 34), 150, 92, 0);

export const ADEGAN_SALAH_HITUNG: AdeganStory = {
  id: "salah-hitung",
  judul: "Salah hitung sisi",
  sumber: "Materi: salah hitung (salah langkah)",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Salah Hitung"), rumput("rp"), bangun("hx", relBeraturan(6, 34), 150, 92, WT.ubinKuning)),
      tambah("Chacha", ...tokoh("ch", 40, 178, "Chacha")),
      tambah("memutarnya.", emo("pt", 214, 64, "\u{1F504}", 18)),
      ...sisiAksi(SUARA_S1, "hx", ptsHex, { setelah: "memutarnya." }),
      tambah("tujuh!", teks("t7", ptsHex[0].x + 18, ptsHex[0].y - 14, "7", 10, W.merah)),
    ),
    k(
      SUARA_S2,
      tambah("Dika", ...tokoh("dk", 262, 178, "Dika")),
      tambah("menyipitkan", emo("mt", 236, 154, E.mata, 18)),
      sorotkan("terhitung", "hxs0", "t7"),
      tambah("terhitung", emo("sl", ptsHex[0].x + 34, ptsHex[0].y - 16, E.salah, 14)),
      tambah("dua", teks("dk2", 150, 148, "2 kali", 11, W.merah)),
    ),
    k(
      SUARA_S3,
      { at: 0, bersih: true },
      tambah(0, judul("Chacha Tertawa"), rumput("rp")),
      tambah("Chacha", ...tokoh("ch", 150, 156, "Chacha")),
      ubah("pusing,", { id: "ch", isi: E.pusing }),
      tambah("pusing,", emo("bi", 150, 114, E.bintang, 14), emo("bj", 126, 124, E.bintang, 12), emo("bk", 174, 124, E.bintang, 12)),
      tambah("tumpukan", bangun("tb0", relBeraturan(6, 16), 128, 178, WT.ubinKuning), bangun("tb1", relBeraturan(6, 16), 172, 178, WT.ubinKuning)),
      tambah("ubin", bangun("tb2", relBeraturan(6, 16), 150, 170, "#FACC15", 0, { z: 2 })),
      tambah("tertawa.", ...tokoh("dk", 262, 178, "Dika")),
      ubah("tertawa.", { id: "ch", isi: E.tertawa }),
    ),
  ],
};
