import type { AdeganStory, Obj } from "./logika-story";
import { E, W, emo, judul, kartu, konfeti, kotak, manik, spanduk, teks, tokoLatar, tokoh, tumpukan } from "./k3b1G-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k3b1G-bantu";

/*
 * Cerita orisinal IGIL "Pesta Hari Jadi Toko" (Kelas 3 Bab 1 Sub-Bab G), akhir cerita Toko Kelontong Pak Joko.
 * Naskah suara dari naskah/story-naskah-k3b1g.md. Bagian ini: cerita manik Nenek Ijah, periksa dengan kali, dan penutup (taruhan, spanduk, perayaan).
 */

/* ------------------------------ 7. Cerita bagi ------------------------------ */
const mulaiManik = (q: number): [number, number] => [116 + (q % 5) * 17, 64 + Math.floor(q / 5) * 11];
const manikMangkuk = (): Obj[] => Array.from({ length: 15 }, (_, q) => manik(`mb${q}`, mulaiManik(q)[0], mulaiManik(q)[1], q));
const idManikMangkuk = (): string[] => Array.from({ length: 15 }, (_, q) => `mb${q}`);
const PLAT_X = [66, 126, 186];
const piring = (): Obj[] => PLAT_X.map((x, i) => kotak(`pl${i}`, x, 138, 54, 14, W.putih, W.biru, { rx: 7, tebal: 1.6, z: 1 }));
const manikPiring = (): Obj[] => PLAT_X.flatMap((x, i) => Array.from({ length: 5 }, (_, j) => manik(`pb${i}${j}`, x + 8 + j * 9.5, 144, i * 5 + j, 3.8)));

const SUARA_G1 = "Nenek Ijah membawa lima belas manik-manik gelang untuk dibagi sama banyak ke tiga cucunya.";
const SUARA_G2 = "Lima belas dibagi tiga. Tiga kali berapa sama dengan lima belas? Tiga kali lima.";
const SUARA_G3 = "Tiap cucu mendapat lima manik-manik.";

export const ADEGAN_CERITA_BAGI: AdeganStory = {
  id: "soal-cerita-bagi",
  judul: "Manik-manik Nenek Ijah",
  sumber: "Materi: cerita pembagian",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_G1,
      bersih(0),
      tambah(0, judul("Manik Nenek Ijah"), ...tokoLatar("tk")),
      tambah("Nenek", ...tokoh("nn", 36, 182, "Nenek Ijah", 26, "Nenek Ijah", 7)),
      tambah("lima", kotak("bw", 100, 56, 100, 40, W.kayu, W.coklat, { rx: 8, tebal: 2, z: 1 }), teks("n15", 150, 48, "15 manik", 10, W.merah)),
      tambah("manik-manik", ...manikMangkuk()),
      tambah("tiga", ...piring(), teks("n3", 150, 112, "3 cucu", 10, W.coklat)),
      tambah("cucunya.", ...PLAT_X.map((x, i) => emo(`cc${i}`, x + 27, 134, E.senyum, 20))),
    ),
    k(
      SUARA_G2,
      tambah(2, teks("kb", 244, 76, "15 : 3", 16, W.ungu)),
      ubah(6, { id: "kb", isi: "3 × ? = 15" }),
      tambah(6, emo("tz", 270, 100, E.tanya, 20)),
      ubah(13, { id: "kb", isi: "3 × 5 = 15" }),
    ),
    k(
      SUARA_G3,
      hapus(0, "kb", "tz", ...idManikMangkuk()),
      tambah("mendapat", ...manikPiring()),
      tambah("lima", ...PLAT_X.map((x, i) => teks(`t5${i}`, x + 46, 128, "5", 14, W.merah))),
      tambah("manik-manik.", teks("ka", 244, 70, "15 : 3 = 5", 14, W.ungu), teks("kc", 244, 90, "3 × 5 = 15", 14, W.ungu), emo("ok", 262, 112, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ 8. Periksa dengan kali ------------------------------ */
const SUARA_H1 = "Raka membagi tiga puluh enam permen untuk sembilan anak. Sembilan kali berapa sama dengan tiga puluh enam?";
const SUARA_H2 = "Sembilan kali empat sama dengan tiga puluh enam, jadi tiap anak mendapat empat permen.";
const SUARA_H3 = "Ia memeriksa dengan perkalian dan hasilnya cocok. Raka tersenyum bangga.";

export const ADEGAN_PERIKSA_KALI: AdeganStory = {
  id: "periksa-kali",
  judul: "Raka memeriksa dengan perkalian",
  sumber: "Materi: periksa pembagian dengan perkalian",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_H1,
      bersih(0),
      tambah(0, judul("Permen untuk Anak"), ...tokoLatar("tk")),
      tambah("Raka", ...tokoh("rk", 36, 176, "Raka", 26, "Raka", 7)),
      tambah("tiga", teks("n36", 150, 60, "36 permen", 14, W.merah), emo("pm", 68, 170, E.permen, 22)),
      tambah("sembilan", teks("n9", 150, 84, "9 anak", 11, W.coklat), ...Array.from({ length: 9 }, (_, i) => emo(`an${i}`, 24 + i * 31, 120, E.senyum, 16))),
      tambah("berapa", teks("kl", 150, 154, "9 × ? = 36", 18, W.ungu)),
    ),
    k(
      SUARA_H2,
      ubah(2, { id: "kl", isi: "9 × 4" }),
      ubah(3, { id: "kl", isi: "9 × 4 =" }),
      ubah(7, { id: "kl", isi: "9 × 4 = 36" }),
      tambah(12, teks("t4", 150, 100, "tiap anak 4 permen", 10, W.hijau)),
    ),
    k(
      SUARA_H3,
      bersih(0),
      tambah(0, judul("Periksa dengan Kali"), ...tokoLatar("tk")),
      tambah("memeriksa", ...kartu("pa", 40, 48, 220, 24, W.hijauMuda, ["36 : 9 = 4"], 14)),
      tambah("perkalian", ...kartu("pb", 40, 82, 220, 24, W.biruMuda, ["9 × 4 = 36"], 14)),
      tambah("cocok.", emo("o1", 276, 66, E.benar, 20), emo("o2", 276, 100, E.benar, 20)),
      tambah("Raka", ...tokoh("rk", 150, 176, "Raka", 28)),
      tambah("tersenyum", emo("tw", 196, 150, E.tertawa, 24)),
      tambah("bangga.", emo("sr", 104, 150, E.sorak, 26)),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_N1 = "Raka menepati taruhannya dan membungkus ulang semua bingkisan, lalu pesta toko pun dimulai!";
const SUARA_N2 = "Pak Joko menggantung spanduk besar. Kak Dewi, Bu Wati, Pak Dodi, Bu Tuti, Pak Anto, dan Bu Mirna bertepuk tangan.";
const SUARA_N3 = "Menurutmu, bilangan apa lagi di toko yang bisa dibaca, dijumlah, dikurang, dikali, dan dibagi? Terima kasih, Raka, Salsa, Bima, Pak Joko, dan Nenek Ijah!";
const TAMU_X = [34, 80, 126, 172, 218, 264];

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Taruhan Raka dan pesta toko",
  sumber: "Materi: penutup dan perayaan pesta toko",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_N1,
      bersih(0),
      tambah(0, judul("Taruhan Raka"), ...tokoLatar("tk")),
      tambah("Raka", ...tokoh("rk", 150, 176, "Raka", 30)),
      tambah("menepati", emo("ok", 192, 146, E.benar, 20)),
      tambah("membungkus", emo("gl", 104, 170, E.gulung, 28)),
      tambah("bingkisan,", ...tumpukan("bk", 70, 112, 6, 6, 16, 24)),
      tambah("pesta", emo("b1", 30, 90, E.balon, 28), emo("b2", 270, 90, E.balon, 28)),
      tambah("dimulai!", ...konfeti("kf", 52, 10), emo("sr", 150, 80, E.sorak, 26)),
    ),
    k(
      SUARA_N2,
      bersih(0),
      tambah(0, ...tokoLatar("tk")),
      tambah("Joko", ...tokoh("pj", 207, 176, "Pak Joko", 24, "Pak Joko", 6.5)),
      tambah("spanduk", ...spanduk("sp", 15, 22, 270, "OBRAL HARI JADI TOKO MERIAH", 11)),
      tambah("Dewi,", ...tokoh("t0", TAMU_X[0], 122, "Kak Dewi", 20, "Dewi", 6)),
      tambah("Wati,", ...tokoh("t1", TAMU_X[1], 122, "Bu Wati", 20, "Wati", 6)),
      tambah("Dodi,", ...tokoh("t2", TAMU_X[2], 122, "Pak Dodi", 20, "Dodi", 6)),
      tambah("Tuti,", ...tokoh("t3", TAMU_X[3], 122, "Bu Tuti", 20, "Tuti", 6)),
      tambah("Anto,", ...tokoh("t4", TAMU_X[4], 122, "Pak Anto", 20, "Anto", 6)),
      tambah("Mirna", ...tokoh("t5", TAMU_X[5], 122, "Bu Mirna", 20, "Mirna", 6)),
      tambah("tangan.", emo("tp0", 80, 92, E.tepuk, 20), emo("tp1", 150, 92, E.tepuk, 20), emo("tp2", 220, 92, E.tepuk, 20)),
    ),
    k(
      SUARA_N3,
      hapus(0, "tp0", "tp1", "tp2"),
      tambah(0, emo("pk", 150, 100, E.pikir, 24)),
      tambah("dibaca,", teks("o0", 50, 78, "123", 16, W.biru)),
      tambah("dijumlah,", teks("o1", 100, 78, "+", 18, W.merah)),
      tambah("dikurang,", teks("o2", 150, 78, "-", 18, W.hijau)),
      tambah("dikali,", teks("o3", 200, 78, "×", 18, W.ungu)),
      tambah("dibagi?", teks("o4", 250, 78, ":", 18, W.oranye)),
      tambah("Raka,", ...tokoh("rk", 36, 176, "Raka", 24, "Raka", 6.5)),
      tambah("Salsa,", ...tokoh("sl", 93, 176, "Salsa", 24, "Salsa", 6.5)),
      tambah("Bima,", ...tokoh("bm", 150, 176, "Bima", 24, "Bima", 6.5)),
      tambah("Nenek", ...tokoh("nn", 264, 176, "Nenek Ijah", 24, "Nenek Ijah", 6.5)),
      tambah("Ijah!", ...konfeti("kf", 52, 10), emo("b1", 20, 96, E.balon, 22), emo("b2", 282, 96, E.balon, 22), emo("lb", 207, 146, E.lambai, 18)),
    ),
  ],
};

