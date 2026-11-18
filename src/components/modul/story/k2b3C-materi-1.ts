import type { AdeganStory } from "./logika-story";
import { E, W, WK, benda, emo, geserBola, gudang, idBenda, judul, kartu, lantai, lereng, panah, rak, teks, tokoh } from "./k2b3C-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k2b3C-bantu";

/*
 * Cerita orisinal IGIL "Gudang Mainan Pak Rudi" (Kelas 2 Bab 3 Sub-Bab C, bangun ruang), akhir cerita Taman Bermain Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b3c.md. Bagian ini: gudang bercampur, bola kabur dari rak miring, dan pertanyaan bisa diisi.
 */

/* ------------------------------ 1. Gudang bercampur ------------------------------ */
const SUARA_G1 = "Pak Rudi membuka gudang mainan, dan isinya bercampur: bola, kardus, kaleng, dadu, dan topi pesta.";
const SUARA_G2 = "Bu Sari berpesan, semua mainan harus masuk rak yang tepat sebelum pesta pembukaan taman besok.";
const SUARA_G3 = "Kalau salah rak, bola menggelinding dan kardus bisa roboh!";

export const ADEGAN_GUDANG: AdeganStory = {
  id: "gudang",
  judul: "Gudang mainan bercampur",
  sumber: "Materi: gudang mainan dan rak",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Gudang mainan"), lantai("lt", 150), ...gudang("gd", 70, 40, 160, 100)),
      tambah("Rudi", tokoh("rd", 28, 172, "rudi")),
      tambah("bola,", ...benda("m1", "bola", 78, 164, 22)),
      tambah("kardus,", ...benda("m2", "kardus", 116, 162, 28)),
      tambah("kaleng,", ...benda("m3", "kaleng", 152, 162, 28)),
      tambah("dadu,", ...benda("m4", "dadu", 188, 162, 26)),
      tambah("topi", ...benda("m5", "topi", 228, 162, 28)),
    ),
    k(
      SUARA_G2,
      tambah("Sari", tokoh("sr", 272, 172, "sari")),
      tambah("semua", ...rak("r1", 110, 78, 76), ...rak("r2", 110, 110, 76)),
      tambah("rak", teks("rn1", 148, 74, "rak bola", 7.6, W.putih), teks("rn2", 148, 106, "rak kardus", 7.6, W.putih)),
      tambah("pembukaan", ...kartu("sb", 80, 24, 140, 18, W.krem, ["spanduk Taman Dibuka"], 8)),
      tambah("besok.", emo("bs", 150, 190, E.bintang, 14)),
    ),
    k(
      SUARA_G3,
      tambah("Kalau", emo("kg", 272, 140, E.kaget, 22)),
      tambah("salah", emo("sl", 150, 132, "\u{274C}", 16)),
      tambah("menggelinding", panah("pg", 78, 150, 62, 176, W.merah)),
      ubah("menggelinding", ...geserBola("m1", 62, 182, 11)),
      tambah("roboh!", emo("rb", 116, 134, E.seru, 18)),
      hapus("roboh!", ...idBenda("m2", "kardus")),
      tambah("roboh!", ...benda("m2", "kardus", 112, 178, 28)),
    ),
  ],
};

/* ------------------------------ 2. Bola kabur dari rak miring ------------------------------ */
const SUARA_B1 = "Chacha menaruh bola di rak miring, tepat di sebelah kardus.";
const SUARA_B2 = "Dika berteriak. Awas, bola tidak mau diam di permukaan yang miring!";
const SUARA_B3 = "Bola menggelinding turun, menyusuri lantai, dan berhenti tepat di sepatu Bu Sari!";

export const ADEGAN_BOLA_KABUR: AdeganStory = {
  id: "bola-kabur",
  judul: "Bola kabur dari rak miring",
  sumber: "Materi: salah langkah, rak miring",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Salah langkah!"), lantai("lt", 150), ...lereng("rm", 60, 80, 170, 30)),
      tambah("Chacha", tokoh("ch", 28, 172, "chacha")),
      tambah("menaruh", emo("tg", 62, 100, E.tangan, 18)),
      tambah("bola", ...benda("bl", "bola", 80, 69, 18)),
      tambah("kardus.", ...benda("kd", "kardus", 150, 83, 28)),
      tambah("miring,", teks("nm", 150, 56, "rak miring", 8.6, W.coklat)),
    ),
    k(
      SUARA_B2,
      hapus("Dika", "tg"),
      tambah("Dika", tokoh("dk", 96, 172, "dika")),
      tambah("berteriak.", emo("kg", 96, 140, E.kaget, 22)),
      tambah("Awas,", ...kartu("aw", 200, 26, 80, 20, W.merahMuda, ["Awas!"], 10)),
      ubah("bola", ...geserBola("bl", 92, 71, 9)),
      ubah("miring!", { id: "rm", warna: W.merah }),
    ),
    k(
      SUARA_B3,
      hapus("Bola", "kg", "aw-k", "aw-t0"),
      ubah("menggelinding", ...geserBola("bl", 200, 82, 9)),
      tambah("menggelinding", panah("gr", 96, 62, 214, 100, W.merah)),
      ubah("menyusuri", ...geserBola("bl", 226, 172, 9)),
      tambah("Bu", tokoh("sr", 264, 172, "sari")),
      ubah("berhenti", ...geserBola("bl", 244, 176, 9)),
      tambah("sepatu", emo("kj", 264, 140, E.kaget, 22)),
    ),
  ],
};

/* ------------------------------ 3. Pertanyaan: bisa diisi? ------------------------------ */
const SUARA_D1 = "Nia punya pertanyaan sederhana. Apakah benda ini bisa diisi?";
const SUARA_D2 = "Kardus bisa diisi mainan, kaleng bisa diisi biskuit, dan topi pesta bisa diisi permen. Benda seperti itu disebut bangun ruang.";
const SUARA_D3 = "Selembar kertas gambar tidak punya ruang di dalam, jadi itu bangun datar.";

export const ADEGAN_BISA_DIISI: AdeganStory = {
  id: "bisa-diisi",
  judul: "Apakah benda ini bisa diisi?",
  sumber: "Materi: bangun ruang dan bangun datar",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Bisa diisi?"), lantai("lt", 150)),
      tambah("Nia", tokoh("ni", 28, 172, "nia")),
      tambah("pertanyaan", emo("tn", 28, 134, E.tanya, 22)),
      tambah("benda", ...benda("kd", "kardus", 150, 98, 52)),
      tambah("diisi?", ...kartu("bd", 96, 142, 108, 22, W.krem, ["bisa diisi?"], 10)),
    ),
    k(
      SUARA_D2,
      hapus("Kardus", ...idBenda("kd", "kardus"), "tn", "bd-k", "bd-t0"),
      tambah("Kardus", ...benda("b1", "kardus", 66, 100, 40), emo("i1", 66, 66, "\u{1F9F8}", 20)),
      tambah("kaleng", ...benda("b2", "kaleng", 150, 100, 40), emo("i2", 150, 66, "\u{1F36A}", 20)),
      tambah("topi", ...benda("b3", "topi", 234, 100, 44), emo("i3", 234, 66, "\u{1F36C}", 20)),
      tambah("bangun", ...kartu("br", 80, 132, 140, 22, W.hijauMuda, ["bangun ruang"], 11)),
    ),
    k(
      SUARA_D3,
      bersih(0),
      tambah(0, judul("Bukan bangun ruang"), lantai("lt", 150)),
      tambah("Selembar", { id: "kt", t: "kotak", x: 100, y: 58, w: 100, h: 66, warna: W.putih, garis: WK.besi, rx: 2, tebal: 1.6 }),
      tambah("kertas", emo("kt-e", 150, 98, E.kertas, 30)),
      tambah("tidak", emo("kt-x", 150, 62, "\u{274C}", 18), ...kartu("kx", 84, 130, 132, 20, W.merahMuda, ["tidak bisa diisi"], 9.4)),
      tambah("datar.", ...kartu("dt", 84, 158, 132, 22, W.hijauMuda, ["bangun datar"], 11)),
    ),
  ],
};
