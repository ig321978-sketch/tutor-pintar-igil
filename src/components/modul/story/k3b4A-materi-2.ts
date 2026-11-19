import type { AdeganStory } from "./logika-story";
import { E, W, berkelok, bilah, emo, garis, judul, lengkung, meja, paku, panah, penggarisMm, teks, tokoh } from "./k3b4A-gambar";
import { hapus, ids, k, sorotkan, tambah } from "./k3b4A-bantu";

/*
 * Cerita orisinal IGIL "Rangka Layang-layang Bu Ratih" (Kelas 3 Bab 4 Sub-Bab A), awal cerita Festival Layang-layang Kampung.
 * Naskah suara dari naskah/story-naskah-k3b4a.md. Bagian ini: kurva, salah milimeter (Raka), dan mengukur dari angka nol.
 */

/* ------------------------------ 4. Kurva ------------------------------ */
const SUARA_K1 = "Salsa bertanya, apakah antara dua paku hanya ada satu jalan?";
const SUARA_K2 = "Bu Ratih merentangkan benang lurus, lalu benang melengkung, lalu benang berkelok.";
const SUARA_K3 = "Yang melengkung dan berkelok disebut kurva, dan yang lurus adalah yang paling pendek.";

export const ADEGAN_KURVA: AdeganStory = {
  id: "kurva",
  judul: "Kurva dan ruas garis",
  sumber: "Materi: kurva dan ruas garis",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Satu Jalan atau Banyak?"), ...meja("mj", 128), ...tokoh("sl", 40, 184, "Salsa")),
      tambah("antara", paku("pA", 80, 100, 4), paku("pB", 220, 100, 4)),
      tambah("dua", teks("np", 150, 50, "2 paku", 11, W.ungu)),
      tambah("satu", teks("tj", 150, 70, "1 jalan?", 12, W.merah)),
    ),
    k(
      SUARA_K2,
      tambah("Ratih", ...tokoh("br", 262, 184, "Bu Ratih")),
      tambah("lurus,", garis("b1", 80, 100, 140, 0, W.merah, 2.6)),
      tambah("melengkung,", lengkung("b2", 80, 220, 100, -30, W.hijau)),
      tambah("berkelok.", berkelok("b3", 80, 220, 100, 18, W.biru)),
    ),
    k(
      SUARA_K3,
      hapus(0, "np", "tj"),
      tambah("melengkung", teks("kv", 150, 66, "kurva", 13, W.ungu)),
      sorotkan("lurus", "b1"),
      tambah("pendek.", teks("tp", 150, 86, "terpendek", 10, W.merah), emo("ok", 262, 128, E.benar, 18)),
    ),
  ],
};

/* ------------------------------ 5. Salah milimeter ------------------------------ */
const SUARA_M1 = "Bu Ratih menunjukkan penggaris, dan di antara angka nol dan satu ada garis-garis kecil.";
const SUARA_M2 = "Raka berseru, satu sentimeter sama dengan seratus milimeter, jadi tiga sentimeter tiga ratus milimeter! Kalau salah, aku menyapu seluruh lapangan!";
const SUARA_M3 = "Salsa menghitung garis kecil dari nol sampai satu, dan jumlahnya hanya sepuluh.";

export const ADEGAN_SALAH_MILIMETER: AdeganStory = {
  id: "salah-milimeter",
  judul: "Raka salah menghitung milimeter",
  sumber: "Materi: Raka salah menghitung milimeter",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Garis Kecil di Penggaris"), ...tokoh("br", 40, 184, "Bu Ratih")),
      tambah("menunjukkan", ...penggarisMm("pg", 30, 108, 2, 120)),
      tambah("garis-garis", teks("gk", 90, 94, "garis kecil", 9, W.merah), panah("pgk", 90, 98, 0, 9, W.merah, 2)),
    ),
    k(
      SUARA_M2,
      hapus(0, "gk", "pgk"),
      tambah("Raka", ...tokoh("rk", 150, 184, "Raka")),
      tambah("satu", teks("r1", 150, 44, "1 cm = 100 mm", 13, W.merah)),
      tambah("tiga", teks("r2", 150, 64, "3 cm = 300 mm", 13, W.merah)),
      tambah("menyapu", emo("sp", 196, 166, E.sapu, 22)),
    ),
    k(
      SUARA_M3,
      tambah("Salsa", ...tokoh("sl", 262, 184, "Salsa"), emo("ps", 238, 166, E.pensil, 18)),
      sorotkan("kecil", ...ids("pg-g", 1, 9)),
      tambah("sampai", emo("x1", 262, 50, E.salah, 18)),
      tambah("sepuluh", teks("s10", 150, 90, "10", 22, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ 6. Mengukur dari nol ------------------------------ */
const SUARA_N1 = "Satu sentimeter sama dengan sepuluh milimeter, jadi tiga sentimeter adalah tiga puluh milimeter.";
const SUARA_N2 = "Bilah bambu dimulai dari angka nol dan berakhir pada lima sentimeter dan lima milimeter.";
const SUARA_N3 = "Itu sama dengan lima puluh lima milimeter, atau lima koma lima sentimeter.";

export const ADEGAN_UKUR_NOL: AdeganStory = {
  id: "ukur-nol",
  judul: "Mengukur dari angka nol",
  sumber: "Materi: mengukur dari angka nol",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Sentimeter dan Milimeter"), ...penggarisMm("pg", 14, 110, 8, 34), teks("c1", 150, 44, "1 cm = 10 mm", 13, W.merah)),
      tambah("tiga", teks("c3", 150, 64, "3 cm = 30 mm", 13, W.hijauTua)),
      tambah("sepuluh", garis("b1", 14, 140, 34, 0, W.merah, 3)),
    ),
    k(
      SUARA_N2,
      hapus(0, "c1", "c3", "b1"),
      tambah("Bilah", ...bilah("bb", 14, 94, 187, 12)),
      tambah("nol", teks("n0", 14, 84, "0", 13, W.hijauTua)),
      tambah("lima", garis("g5", 184, 90, 0, 20, W.merah, 2), teks("n5", 170, 78, "5 cm", 12, W.merah)),
      tambah("lima@2", garis("g55", 201, 90, 0, 20, W.merah, 2), teks("n55", 238, 78, "5 mm", 12, W.merah)),
    ),
    k(
      SUARA_N3,
      sorotkan("Itu", "bb"),
      tambah("puluh", teks("p55", 150, 44, "55 mm", 14, W.hijauTua)),
      tambah("koma", teks("p5", 150, 62, "5,5 cm", 14, W.hijauTua)),
    ),
  ],
};
