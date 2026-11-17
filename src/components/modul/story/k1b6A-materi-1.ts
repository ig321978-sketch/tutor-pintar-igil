import type { AdeganStory } from "./logika-story";
import { E, W, deretKue, emo, judul, kartu, kisi, lapak, nampan, orang, teks, untaian, garis, type Titik } from "./k1b6A-gambar";
import { hapus, k, sorotkan, tambah, ubah } from "./k1b6A-bantu";

/*
 * Cerita orisinal IGIL "Dua Nampan Kue" (Kelas 1 Bab 6 Sub-Bab A, lebih dari, kurang dari, dan selisih), awal cerita Pasar Malam Kampung.
 * Masalah: Mamah menata dua belas kue cubit dan delapan kue pukis di dua nampan; Pak RT bertanya nampan mana yang lebih banyak dan Igil keliru menjumlahkan.
 * Penyelesaian: pasangkan satu-satu, lihat lebihnya dan kurangnya, lalu mencari selisih dengan mengurangi.
 */

/** Dua nampan di lapak (adegan awal dan adegan menyamakan): pojok kiri-atas dan titik kue. */
export const NAMPAN_A = { x: 12, y: 96, w: 120, h: 46 };
export const NAMPAN_B = { x: 168, y: 96, w: 120, h: 46 };
export const TITIK_CUBIT: Titik[] = kisi(12, 24, 110, 6, 18, 18);
export const TITIK_PUKIS: Titik[] = kisi(8, 180, 110, 6, 18, 18);

/* ------------------------------ 1. Pasar malam buka ------------------------------ */
const SUARA_P1 = "Pasar malam kampung buka petang ini! Mamah menata kue cubit dan kue pukis di dua nampan, di bawah untaian lampu.";
const SUARA_P2 = "Pak RT mampir dan bertanya, nampan mana yang lebih banyak? Kalau salah, pembeli kehabisan kue yang mereka cari.";
const SUARA_P3 = "Mamah menoleh pada Igil. Jawab dengan cara yang pasti, ya!";

export const ADEGAN_PETANG: AdeganStory = {
  id: "petang",
  judul: "Pasar malam buka petang ini",
  sumber: "Materi: dua nampan kue",
  latar: "#FFF1E6",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Pasar malam kampung"), ...lapak("lp", 6, 22, 288, 124)),
      tambah("petang", ...untaian("lt", 18, 44, 8, 38)),
      tambah("Mamah", ...orang("mm", 150, 112, E.mamah, "Mamah")),
      tambah("cubit", ...nampan("na", NAMPAN_A.x, NAMPAN_A.y, NAMPAN_A.w, NAMPAN_A.h), ...deretKue("cubit", "c", TITIK_CUBIT)),
      tambah("pukis", ...nampan("nb", NAMPAN_B.x, NAMPAN_B.y, NAMPAN_B.w, NAMPAN_B.h), ...deretKue("pukis", "k", TITIK_PUKIS)),
      tambah("dua", teks("n2", 150, 82, "2 nampan", 9, W.biru)),
    ),
    k(
      SUARA_P2,
      tambah("Pak", ...orang("pk", 36, 172, E.pakRT, "Pak RT")),
      tambah("nampan", teks("q1", 72, 92, "?", 14, W.merah), teks("q2", 228, 92, "?", 14, W.merah)),
      tambah("kehabisan", ...kartu("kh", 100, 160, 170, 24, W.merahMuda, ["pembeli kehabisan kue"], 9)),
    ),
    k(
      SUARA_P3,
      hapus(0, "q1", "q2", "pk", "pk-n", "kh-k", "kh-t0"),
      tambah("Igil", ...orang("ig", 262, 172, E.igil, "Igil")),
      tambah("pasti,", ...kartu("ps", 70, 160, 150, 24, W.emas, ["cara yang pasti"], 9.4)),
      tambah("ya!", emo("bt", 36, 172, E.bintang, 20)),
    ),
  ],
};

/* ------------------------------ 2. Igil menjumlahkan (salah langkah) ------------------------------ */
const SUARA_J1 = "Kue cubit ada dua belas. Kue pukis ada delapan.";
const SUARA_J2 = "Igil berseru, selisihnya dua puluh! Dua belas ditambah delapan, kan?";
const SUARA_J3 = "Kaka menggeleng. Itu jumlah semuanya. Selisih artinya beda banyaknya.";
const TC2: Titik[] = kisi(12, 24, 44, 6, 18, 18);
const TP2: Titik[] = kisi(8, 180, 44, 6, 18, 18);

export const ADEGAN_JUMLAH_SALAH: AdeganStory = {
  id: "jumlah-salah",
  judul: "Igil menjumlahkan, bukan mencari selisih",
  sumber: "Materi: salah langkah menjumlahkan",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_J1,
      tambah(0, judul("Berapa selisihnya?"), ...nampan("na", 12, 30, 120, 46), ...nampan("nb", 168, 30, 120, 46)),
      tambah("cubit", ...deretKue("cubit", "c", TC2)),
      tambah("pukis", ...deretKue("pukis", "k", TP2)),
      tambah("belas", teks("n12", 72, 94, "12", 18, W.merah)),
      tambah("delapan", teks("n8", 228, 94, "8", 18, W.merah)),
    ),
    k(
      SUARA_J2,
      tambah("Igil", ...orang("ig", 36, 172, E.igil, "Igil")),
      tambah("selisihnya", teks("sl", 150, 122, "selisih ...", 11, W.merah)),
      ubah("puluh", { id: "sl", isi: "selisih 20" }),
      tambah("belas", teks("e1", 96, 158, "12", 20, W.biru)),
      tambah("ditambah", teks("e2", 126, 158, "+", 20, W.biru)),
      tambah("delapan,", teks("e3", 152, 158, "8", 20, W.biru)),
      tambah("kan?", teks("e4", 190, 158, "= 20", 20, W.merah)),
    ),
    k(
      SUARA_J3,
      tambah("Kaka", ...orang("kk", 262, 172, E.kaka, "Kaka")),
      ubah("menggeleng", { id: "e1", op: 0.4 }, { id: "e2", op: 0.4 }, { id: "e3", op: 0.4 }, { id: "e4", op: 0.4 }),
      tambah("menggeleng", emo("sx", 232, 160, E.salah, 22)),
      hapus("Itu", "sl"),
      tambah("jumlah", ...kartu("jm", 78, 164, 130, 20, W.merahMuda, ["jumlah semuanya"], 9)),
      tambah("Selisih", ...kartu("sb", 36, 100, 228, 26, W.hijauMuda, ["selisih = beda banyaknya"], 9.8)),
    ),
  ],
};

/* ------------------------------ 3. Pasangkan satu-satu ------------------------------ */
const SUARA_Q1 = "Abang menggambar garis. Satu kue cubit dipasangkan dengan satu kue pukis.";
const SUARA_Q2 = "Delapan pasang sudah terisi. Empat kue cubit tidak punya pasangan.";
const SUARA_Q3 = "Kue cubit lebih banyak. Empat kue cubit lebihnya, dan kue pukis empat kurangnya.";
const XQ = (i: number): number => 40 + i * 19;
const TC3: Titik[] = Array.from({ length: 12 }, (_, i) => ({ x: XQ(i), y: 60 }));
const TP3: Titik[] = Array.from({ length: 8 }, (_, i) => ({ x: XQ(i), y: 124 }));
const pasang = (i: number) => garis(`pr${i}`, XQ(i), 67, 0, 50, W.merah, 1.6, { gambar: true });

export const ADEGAN_PASANGKAN: AdeganStory = {
  id: "pasangkan",
  judul: "Pasangkan satu-satu",
  sumber: "Materi: pasangkan satu-satu",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Pasangkan satu-satu"), ...deretKue("cubit", "c", TC3), ...deretKue("pukis", "k", TP3)),
      tambah("Abang", ...orang("ab", 270, 92, E.abang, "Abang")),
      tambah("Satu", pasang(0), teks("p1", 52, 96, "1", 11, W.merah)),
      sorotkan("cubit", "c0"),
      sorotkan("pukis", "k0"),
    ),
    k(
      SUARA_Q2,
      hapus(0, "p1"),
      tambah("Delapan", ...Array.from({ length: 7 }, (_, i) => pasang(i + 1)), teks("p8", 112, 96, "8 pasang", 10, W.hijau)),
      tambah("Empat", teks("p4", 222, 96, "4 tanpa pasangan", 9, W.merah)),
      sorotkan("cubit", "c8", "c9", "c10", "c11"),
    ),
    k(
      SUARA_Q3,
      hapus(0, "p8"),
      tambah("banyak", emo("ok", 282, 60, E.benar, 14)),
      tambah("lebihnya", ...kartu("lb", 14, 150, 134, 24, W.hijauMuda, ["cubit lebihnya 4"], 9)),
      tambah("kurangnya", ...kartu("kr", 152, 150, 134, 24, W.pink, ["pukis kurangnya 4"], 9)),
    ),
  ],
};
