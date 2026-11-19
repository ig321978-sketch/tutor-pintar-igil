import type { AdeganStory } from "./logika-story";
import { E, W, bintang, barisBintang, emo, judul, kartu, kursi, loket, panah, panggungDepan, papanLayar, selendang, teks, tokoh, garis, kotak } from "./k2b8B-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k2b8B-bantu";

/*
 * Cerita orisinal IGIL "Bintang Bu Maya" (Kelas 2 Bab 8 Sub-Bab B, diagram gambar), akhir cerita Pentas Seni Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b8b.md. Bagian ini: papan layar (masalah), satu bintang satu selendang, salah gambar (taruhan Chacha).
 */

/** Tinggi tengah empat baris pada papan layar (papan di (18, 48), 264 x 112). */
export const RY = [70, 95, 120, 145];
export const WARNA_SEL = [W.selMerah, W.selKuning, W.selHijau, W.selBiru];
export const NAMA_SEL = ["Merah", "Kuning", "Hijau", "Biru"];
/** Nama jenis di kolom kiri dengan selendang kecil berwarna untuk baris ke-i. */
export const namaBaris = (i: number, ys: number[] = RY) => [teks(`nm${i}`, 38, ys[i] + 3, NAMA_SEL[i], 9, W.biru, { z: 2 }), ...selendang(`sd${i}`, 62, ys[i] - 3.5, WARNA_SEL[i])];
export const jumlahBaris = (i: number, n: number, ys: number[] = RY) => teks(`jm${i}`, 222, ys[i] + 4, String(n), 12, W.biru, { z: 2 });

/* ------------------------------ 1. Papan layar ------------------------------ */
const SUARA_A1 = "Besok Pentas Seni Sekolah dibuka! Bu Maya, penjaga loket, memasang papan layar besar di depan panggung.";
const SUARA_A2 = "Bu Sari ingin data selendang penari dipajang, supaya penonton langsung paham.";
const SUARA_A3 = "Diagram turus sulit dibaca penonton. Bu Maya mengusulkan diagram gambar.";

export const ADEGAN_PAPAN_LAYAR: AdeganStory = {
  id: "papan-layar",
  judul: "Papan layar di depan panggung",
  sumber: "Materi: papan layar dan diagram gambar",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_A1,
      bersih(0),
      tambah(0, judul("Depan Panggung"), ...panggungDepan("dn")),
      tambah("Pentas", ...loket("lk", 24, 36)),
      tambah("Maya,", ...tokoh("bm", 112, 172, "Bu Maya")),
      tambah("papan", ...papanLayar("pl", 140, 36, 132, 66, 6, 4)),
      tambah("panggung.", ...[0, 1, 2, 3, 4].flatMap((i) => kursi(`ks${i}`, 24 + i * 52, 126))),
    ),
    k(
      SUARA_A2,
      tambah("Sari", ...tokoh("bs", 246, 172, "Bu Sari")),
      tambah("selendang", ...selendang("s0", 150, 46, W.selMerah), ...selendang("s1", 176, 46, W.selKuning), ...selendang("s2", 202, 46, W.selHijau), ...selendang("s3", 228, 46, W.selBiru)),
      tambah("penonton,", emo("p1", 40, 124, E.senyum, 16), emo("p2", 92, 124, E.senyum, 16)),
      tambah("paham.", emo("ok", 206, 84, E.benar, 20)),
    ),
    k(
      SUARA_A3,
      tambah("Diagram", ...kartu("tt", 148, 112, 66, 22, W.krem, ["turus ???"], 8)),
      tambah("sulit", emo("tz", 232, 124, E.tanya, 20)),
      tambah("Maya", emo("lp", 112, 120, E.lampu, 20)),
      tambah("mengusulkan", ...kartu("gb", 24, 98, 58, 18, W.hijauMuda, ["gambar!"], 8)),
      tambah("gambar.", bintang("b0", 160, 64, 7, W.selMerah), bintang("b1", 178, 64, 7, W.selMerah), bintang("b2", 196, 64, 7, W.selMerah)),
    ),
  ],
};

/* ------------------------------ 2. Satu bintang ------------------------------ */
const SUARA_B1 = "Satu bintang mewakili satu selendang. Selendang merah ada tujuh, jadi tujuh bintang merah.";
const SUARA_B2 = "Kuning ada lima, hijau tiga, dan biru lima. Tiap jenis punya bintang berwarna sendiri.";
const SUARA_B3 = "Nama jenis ditulis di kolom kiri, lalu bintangnya berjajar ke kanan tanpa celah.";

export const ADEGAN_SATU_BINTANG: AdeganStory = {
  id: "satu-bintang",
  judul: "Satu bintang, satu selendang",
  sumber: "Materi: satu gambar mewakili satu benda",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_B1,
      bersih(0),
      tambah(0, judul("Satu Bintang, Satu Selendang"), ...panggungDepan("dn"), ...papanLayar("pl", 18, 48, 264, 112, 1, 4)),
      tambah("Satu", ...kartu("lg", 64, 31, 172, 15, W.krem, ["1 bintang = 1 selendang"], 8.5)),
      tambah("Selendang@2", ...namaBaris(0)),
      tambah("tujuh,", ...barisBintang("bm", 96, RY[0], 7, WARNA_SEL[0])),
      tambah("jadi", jumlahBaris(0, 7)),
    ),
    k(
      SUARA_B2,
      tambah("Kuning", ...namaBaris(1)),
      tambah("lima,", ...barisBintang("bk", 96, RY[1], 5, WARNA_SEL[1]), jumlahBaris(1, 5)),
      tambah("hijau", ...namaBaris(2)),
      tambah("tiga,", ...barisBintang("bh", 96, RY[2], 3, WARNA_SEL[2]), jumlahBaris(2, 3)),
      tambah("biru", ...namaBaris(3)),
      tambah("lima@2", ...barisBintang("bb", 96, RY[3], 5, WARNA_SEL[3]), jumlahBaris(3, 5)),
      tambah("sendiri.", emo("kl", 262, 70, E.kilau, 16)),
    ),
    k(
      SUARA_B3,
      tambah("Nama", teks("hn", 38, 60, "nama jenis", 7, W.merah, { z: 2 })),
      tambah("kiri,", kotak("kk", 22, 64, 56, 88, W.lavender, W.ungu, { rx: 4, tebal: 1.2, z: 1, op: 0.55, putus: true })),
      tambah("bintangnya", teks("hg", 140, 60, "gambar", 7, W.merah, { z: 2 })),
      tambah("kanan", panah("pk", 96, 158, 150, 0, W.ungu, 2.4)),
      tambah("celah.", emo("ok", 262, 100, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ 3. Salah gambar ------------------------------ */
const SUARA_C1 = "Chacha bergegas menggambar bintang besar-besar dan kecil-kecil, biar meriah! Kalau penonton keliru membaca, aku menyapu seluruh panggung!";
const SUARA_C2 = "Baris hijau tampak paling panjang karena bintangnya besar, padahal hanya tiga. Penonton jadi salah baca.";
const SUARA_C3 = "Dika berkata, semua gambar harus sama bentuk dan ukurannya, dengan jarak yang sama.";

export const ADEGAN_SALAH_GAMBAR: AdeganStory = {
  id: "salah-gambar",
  judul: "Chacha salah menggambar bintang",
  sumber: "Materi: gambar harus sama ukuran",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_C1,
      bersih(0),
      tambah(0, judul("Bintang Besar dan Kecil"), ...panggungDepan("dn"), ...papanLayar("pl", 18, 48, 264, 112, 1, 2)),
      tambah("Chacha", ...tokoh("ch", 40, 172, "Chacha")),
      tambah("menggambar", ...namaBaris(0, [84, 128]), ...namaBaris(2, [84, 84, 128])),
      tambah("besar-besar", bintang("bg0", 116, 128, 14, WARNA_SEL[2]), bintang("bg1", 154, 128, 14, WARNA_SEL[2]), bintang("bg2", 192, 128, 14, WARNA_SEL[2])),
      tambah("kecil-kecil,", ...barisBintang("bm", 110, 84, 7, WARNA_SEL[0], 4.5, 9.5)),
      tambah("meriah!", emo("kl", 262, 76, E.kilau, 16)),
      tambah("penonton", emo("pn", 250, 110, E.pikir, 20)),
      tambah("menyapu", emo("sp", 80, 172, E.sapu, 20)),
    ),
    k(
      SUARA_C2,
      sorotkan("hijau", "bg0", "bg1", "bg2"),
      tambah("panjang", panah("pj", 96, 152, 118, 0, W.merah, 2.4)),
      tambah("tiga.", teks("n3", 226, 131, "3", 13, W.merah, { z: 2 })),
      tambah("salah", emo("x1", 262, 104, E.salah, 18)),
    ),
    k(
      SUARA_C3,
      tambah("Dika", ...tokoh("dk", 92, 172, "Dika")),
      hapus("gambar", "bg0", "bg1", "bg2", "x1", "pj"),
      tambah("gambar", ...barisBintang("bs", 116, 128, 3, WARNA_SEL[2], 6.5, 15)),
      tambah("bentuk", teks("sm", 200, 152, "sama besar", 9, W.hijau, { z: 2 })),
      tambah("jarak", garis("jr", 109, 143, 15, 0, W.hijau, 2.2)),
      tambah("sama@2", emo("ok", 262, 104, E.benar, 20)),
    ),
  ],
};
