import type { AdeganStory } from "./logika-story";
import { E, W, emo, garis, judul, kartu, kertas, kotak, panah, papan, tabel2, tanah, teks, tokoh } from "./k3b3B-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k3b3B-bantu";

/*
 * Cerita orisinal IGIL "Pita Pak Wayan" (Kelas 3 Bab 3 Sub-Bab B), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b3b.md. Bagian ini: pembuka (tiga alat tukang kandang), Ratio Table (Tabel Perbandingan), dan terapannya.
 */

export const NAMA_METODE = ["Ratio Table", "Number Line", "Split Strategy"] as const;
export const NAMA_METODE_ID = ["Tabel Perbandingan", "Garis Bilangan", "Cara Memecah"] as const;

const KUNING_KARTU = "#FEF3C7";

/** Tabel dua baris empat kolom: kolom ke-i berpusat di x = 115 + 50 * i; baris meter di y = 68 + dy, baris sentimeter di y = 96 + dy. */
const KOLOM_X = (i: number): number => 115 + 50 * i;
const barisTabel = (dy: number, id = "tb"): ReturnType<typeof tabel2> => tabel2(id, 30, 50 + dy, 4, 50, 28, 60);

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Siang itu Pak Wayan membuka laci perkakas dan menemukan tiga alat untuk mengubah satuan panjang.";
const SUARA_O2 = "Alat itu membantu tukang kandang menghitung bahan dengan cepat.";
const SUARA_O3 = "Tiga cara itu: Ratio Table, Number Line, dan Split Strategy.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Tabel Perbandingan, Garis Bilangan, dan Cara Memecah.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga alat tukang kandang",
  sumber: "Metode global: pembuka",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Laci Perkakas Pak Wayan"), ...tanah("tn", 150)),
      tambah("Wayan", ...tokoh("pw", 262, 184, "Pak Wayan")),
      tambah("laci", kotak("lc", 20, 92, 120, 52, "#E7C08A", "#6B4423", { rx: 3, tebal: 1.8 })),
      tambah("tiga", teks("n3", 200, 56, "3 alat", 10, W.ungu)),
      tambah("alat", ...[0, 1, 2].flatMap((i) => kartu(`c${i}`, 28 + i * 36, 102, 32, 34, KUNING_KARTU, ["alat"], 7))),
    ),
    k(
      SUARA_O2,
      sorotkan("itu", "c0-k", "c1-k", "c2-k"),
      tambah("menghitung", kertas("kc", 150, 78, 90, 28), emo("ps", 156, 100, E.pensil, 12)),
      tambah("bahan", ...papan("bh", 160, 112, 70), ...papan("bh2", 160, 126, 70)),
      tambah("cepat.", emo("cp", 278, 100, E.cepat, 18)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara Mengubah Satuan"), teks("n3", 252, 44, "3 cara", 10, W.ungu)),
      tambah("Ratio", teks("m0", 150, 76, "1. Ratio Table", 10.5, W.biru), kotak("i0a", 18, 58, 40, 12, "#DBEAFE", W.biru, { rx: 1, tebal: 1.2 }), kotak("i0b", 18, 70, 40, 12, "#FFEDD5", W.biru, { rx: 1, tebal: 1.2 })),
      tambah("Number", teks("m1", 150, 128, "2. Number Line", 10.5, W.biru), garis("i1", 18, 130, 40, 0, W.biru, 2), garis("i1a", 18, 126, 0, 8, W.biru, 1.6), garis("i1b", 58, 126, 0, 8, W.biru, 1.6)),
      tambah("Split", teks("m2", 150, 180, "3. Split Strategy", 10.5, W.biru), kotak("i2a", 18, 166, 18, 16, "#BFDBFE", W.biru, { rx: 1, tebal: 1.2 }), kotak("i2b", 38, 166, 20, 16, "#FED7AA", W.biru, { rx: 1, tebal: 1.2 })),
    ),
    k(
      SUARA_O4,
      tambah("Tabel", teks("g0", 250, 76, "Tabel Perbandingan", 8.6, W.ungu)),
      tambah("Garis", teks("g1", 250, 128, "Garis Bilangan", 8.6, W.ungu)),
      tambah("Cara", teks("g2", 250, 180, "Cara Memecah", 8.6, W.ungu)),
    ),
  ],
};

/* ------------------------------ Ratio Table: konsep ------------------------------ */
const SUARA_T1 = "Cara pertama, Ratio Table, atau Tabel Perbandingan.";
const SUARA_T2 = "Tabel punya dua baris: baris meter dan baris sentimeter.";
const SUARA_T3 = "Tiap kolom menunjukkan ukuran yang sama panjang, misalnya satu meter dan seratus sentimeter.";
const SUARA_T4 = "Kalau meter bertambah satu, sentimeter bertambah seratus.";

export const ADEGAN_LUAR_TABEL: AdeganStory = {
  id: "luar-tabel",
  judul: "Ratio Table atau Tabel Perbandingan",
  sumber: "Metode global: Tabel Perbandingan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Ratio Table")),
      tambah("Ratio", ...barisTabel(0)),
      tambah("Table,", teks("nm", 150, 150, "Ratio Table", 12, W.biru)),
      tambah("Tabel", teks("nm2", 150, 172, "Tabel Perbandingan", 10, W.ungu)),
    ),
    k(
      SUARA_T2,
      tambah("dua", teks("n2", 150, 40, "2 baris", 9, W.ungu)),
      tambah("meter", teks("r0", 60, 68, "meter", 10, W.meter)),
      tambah("sentimeter.", teks("r1", 60, 96, "sentimeter", 8.6, W.senti)),
    ),
    k(
      SUARA_T3,
      hapus(0, "n2"),
      tambah("kolom", kotak("kk", 90, 50, 50, 56, undefined, W.merah, { putus: true, z: 3, rx: 4 })),
      tambah("satu", teks("c10", KOLOM_X(0), 68, "1", 14, W.meter)),
      tambah("seratus", teks("c11", KOLOM_X(0), 96, "100", 14, W.senti)),
    ),
    k(
      SUARA_T4,
      tambah("meter", teks("c20", KOLOM_X(1), 68, "2", 14, W.meter)),
      tambah("satu,", teks("p1", 140, 46, "+1", 10, W.meter)),
      tambah("sentimeter", teks("c21", KOLOM_X(1), 96, "200", 14, W.senti)),
      tambah("seratus.", teks("p2", 140, 128, "+100", 10, W.senti)),
    ),
  ],
};

/* ------------------------------ Ratio Table: terapan ------------------------------ */
const SUARA_R1 = "Salsa mengisi tabel: satu meter seratus sentimeter, dua meter dua ratus, tiga meter tiga ratus.";
const SUARA_R2 = "Untuk lima meter, ia melanjutkan polanya dan mendapat lima ratus sentimeter.";
const SUARA_R3 = "Cocok untuk mengubah banyak ukuran sekaligus.";
const SUARA_R4 = "Kurang cocok kalau ukurannya hanya satu, karena membuat tabel memakan waktu.";

export const ADEGAN_LUAR_TABEL_TERAPAN: AdeganStory = {
  id: "luar-tabel-terapan",
  judul: "Salsa mengisi tabel perbandingan",
  sumber: "Metode global: terapan Tabel Perbandingan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Salsa Mengisi Tabel"), ...tanah("tn", 150), ...tokoh("sl", 36, 184, "Salsa")),
      tambah("tabel:", ...barisTabel(0), teks("r0", 60, 68, "meter", 10, W.meter), teks("r1", 60, 96, "sentimeter", 8.6, W.senti)),
      tambah("satu", teks("a1", KOLOM_X(0), 68, "1", 14, W.meter)),
      tambah("seratus", teks("b1", KOLOM_X(0), 96, "100", 14, W.senti)),
      tambah("dua", teks("a2", KOLOM_X(1), 68, "2", 14, W.meter)),
      tambah("dua@2", teks("b2", KOLOM_X(1), 96, "200", 14, W.senti)),
      tambah("tiga", teks("a3", KOLOM_X(2), 68, "3", 14, W.meter)),
      tambah("tiga@2", teks("b3", KOLOM_X(2), 96, "300", 14, W.senti)),
    ),
    k(
      SUARA_R2,
      tambah("lima", teks("a5", KOLOM_X(3), 68, "5", 14, W.meter)),
      tambah("melanjutkan", panah("po", 150, 38, 100, 0, W.hijau, 2.6), teks("pl", 200, 34, "pola", 9, W.hijauTua)),
      sorotkan("mendapat", "b3"),
      tambah("ratus", teks("b5", KOLOM_X(3), 96, "500", 14, W.senti)),
    ),
    k(
      SUARA_R3,
      tambah("Cocok", emo("ok", 262, 140, E.benar, 24)),
      tambah("banyak", ...kartu("u0", 30, 122, 50, 22, KUNING_KARTU, ["ukuran"], 8), ...kartu("u1", 86, 122, 50, 22, KUNING_KARTU, ["ukuran"], 8)),
      tambah("sekaligus.", ...kartu("u2", 142, 122, 50, 22, KUNING_KARTU, ["ukuran"], 8)),
    ),
    k(
      SUARA_R4,
      hapus(0, "u0-k", "u0-t0", "u1-k", "u1-t0", "u2-k", "u2-t0", "ok", "po", "pl"),
      tambah("Kurang", emo("xs", 262, 140, E.salah, 24)),
      tambah("satu", teks("sat", 150, 134, "1 ukuran", 11, W.merah)),
      tambah("waktu.", emo("wk", 214, 146, "\u{1F550}", 20)),
    ),
  ],
};
