import type { AdeganStory } from "./logika-story";
import { E, W, batangBagan, busur, emo, judul, kotak, lingkaranBatu, pindah, rumput, teks, tokoh } from "./k3b2A-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k3b2A-bantu";

/*
 * Cerita orisinal IGIL "Kayu untuk Api Unggun" (Kelas 3 Bab 2 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b2a.md. Bagian ini: pembuka (peti perlengkapan tua), Bar Model (Bagan Batang), dan terapannya.
 */

export const NAMA_METODE = ["Bar Model", "Counting On", "Balance Scale"] as const;
export const NAMA_METODE_ID = ["Bagan Batang", "Menghitung Maju", "Timbangan Seimbang"] as const;

const KUNING_KARTU = "#FEF3C7";

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Malam itu, sambil menunggu api unggun, Pak Joko membuka peti perlengkapan tua.";
const SUARA_O2 = "Di dalamnya ada tiga alat untuk mencari bilangan yang belum diketahui.";
const SUARA_O3 = "Tiga cara itu: Bar Model, Counting On, dan Balance Scale.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Bagan Batang, Menghitung Maju, dan Timbangan Seimbang.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Peti perlengkapan tua Pak Joko",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Peti Perlengkapan"), ...rumput("rt", 150)),
      tambah("Malam", kotak("mlm", 2, 24, 296, 124, "#1E3A8A", undefined, { rx: 0, tebal: 0, z: -1, op: 0.3 }), emo("bln", 40, 44, E.bulan, 16)),
      tambah("api", ...lingkaranBatu("lb", 70, 136, 24, 7, 9), emo("ap", 70, 134, E.api, 22)),
      tambah("Pak", ...tokoh("pj", 150, 184, "Pak Joko")),
      tambah("peti", kotak("pt", 196, 120, 74, 30, "#C99A63", W.coklat, { rx: 3, z: 1 }), kotak("tt", 192, 108, 82, 12, "#A16207", W.coklat, { rx: 3, z: 2 })),
    ),
    k(
      SUARA_O2,
      tambah("tiga", teks("n3", 233, 90, "3 alat", 10, W.ungu)),
      tambah("alat", ...[0, 1, 2].flatMap((i) => [kotak(`c${i}-k`, 198 + i * 26, 56, 24, 28, KUNING_KARTU, W.biru, { rx: 4 }), teks(`c${i}-t`, 210 + i * 26, 74, "alat", 6.4, W.biru)])),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara Mencari Bilangan"), teks("n3", 260, 40, "3 cara", 10, W.ungu)),
      tambah("Bar", teks("m0", 140, 66, "1. Bar Model", 11, W.biru), kotak("ib1", 22, 54, 46, 10, W.jumlah, W.biru, { rx: 2 }), kotak("ib2", 22, 66, 28, 10, W.bagian, W.biru, { rx: 2 }), kotak("ib3", 52, 66, 16, 10, W.tanya, W.biru, { rx: 2 })),
      tambah("Counting", teks("m1", 140, 116, "2. Counting On", 11, W.biru), busur("ih1", 22, 46, 124, 14), busur("ih2", 46, 70, 124, 14), garis0("ih0", 22, 124, 48)),
      tambah("Balance", teks("m2", 140, 166, "3. Balance Scale", 11, W.biru), kotak("it1", 20, 160, 52, 4, "#D6A15E", W.coklat, { rx: 1 }), kotak("it2", 44, 164, 4, 14, "#B7814A", W.coklat, { rx: 0 }), kotak("it3", 18, 166, 18, 4, "#CBD5E1", W.biru, { rx: 1 }), kotak("it4", 56, 166, 18, 4, "#CBD5E1", W.biru, { rx: 1 })),
    ),
    k(
      SUARA_O4,
      tambah("Bagan", teks("g0", 250, 66, "Bagan Batang", 9, W.ungu)),
      tambah("Menghitung", teks("g1", 250, 116, "Menghitung Maju", 9, W.ungu)),
      tambah("Timbangan", teks("g2", 250, 166, "Timbangan Seimbang", 9, W.ungu)),
    ),
  ],
};

/** Garis datar pendek (sumbu garis bilangan kecil pada ikon). */
function garis0(id: string, x: number, y: number, w: number) {
  return { id, t: "garis" as const, x, y, x2: w, y2: 0, warna: W.biru, tebal: 1.6 };
}

/* ------------------------------ Bar Model: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Bar Model, atau Bagan Batang.";
const SUARA_C2 = "Batang panjang di atas adalah jumlah semuanya. Dua batang di bawahnya adalah bagian-bagiannya.";
const SUARA_C3 = "Bagian yang belum diketahui diberi tanda tanya, lalu dicari dengan mengurangkan jumlah dengan bagian yang diketahui.";
const SUARA_C4 = "Dengan bagan, cerita penjumlahan terlihat seperti potongan-potongan.";

export const ADEGAN_LUAR_BAGAN: AdeganStory = {
  id: "luar-bagan",
  judul: "Bar Model: Bagan Batang",
  sumber: "Metode global: Bar Model (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Cara 1: Bar Model")),
      tambah("Bar", ...batangBagan("bt", 60, 54, 180, 26, W.jumlah, "jumlah", 11)),
      tambah("Model,", ...batangBagan("b1", 60, 88, 110, 26, W.bagian, "bagian", 11), ...batangBagan("b2", 170, 88, 70, 26, W.tanya, "bagian", 11)),
      tambah("Bagan", teks("nm", 150, 160, "Bagan Batang", 13, W.ungu)),
    ),
    k(
      SUARA_C2,
      sorotkan("Batang", "bt"),
      tambah("Dua", teks("n2", 150, 134, "2 bagian", 10, W.ungu)),
      sorotkan("bagian-bagiannya.", "b1", "b2"),
    ),
    k(
      SUARA_C3,
      hapus(0, "n2"),
      ubah("belum", { id: "b2-t", isi: "?" }),
      tambah("mengurangkan", teks("ku", 150, 134, "jumlah − bagian", 10, W.merah)),
      sorotkan("jumlah", "bt"),
    ),
    k(
      SUARA_C4,
      hapus(0, "ku"),
      ubah("terlihat", ...pindah(batangBagan("b1", 60, 98, 110, 26, W.bagian, "bagian", 11)), ...pindah(batangBagan("b2", 170, 98, 70, 26, W.tanya, "?", 11))),
      tambah("potongan-potongan.", emo("pz", 262, 134, "\u{1F9E9}", 22)),
    ),
  ],
};

/* ------------------------------ Bar Model: terapan ------------------------------ */
const SUARA_T1 = "Salsa menggambar bagan untuk tali tenda: jumlah semuanya empat puluh, satu bagian dua belas.";
const SUARA_T2 = "Ia mengurangkan empat puluh dengan dua belas dan mendapat dua puluh delapan.";
const SUARA_T3 = "Cocok kalau ceritanya tentang bagian dan jumlah keseluruhan.";
const SUARA_T4 = "Kurang cocok kalau bilangannya banyak sekali, karena batang sulit digambar dengan teliti.";

export const ADEGAN_LUAR_BAGAN_TERAPAN: AdeganStory = {
  id: "luar-bagan-terapan",
  judul: "Bar Model: bagan tali tenda",
  sumber: "Metode global: Bar Model (terapan)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Bagan Tali Tenda"), ...rumput("rt", 150), ...tokoh("sl", 40, 184, "Salsa")),
      tambah("bagan", emo("tl", 72, 160, "\u{1F9F5}", 16)),
      tambah("jumlah", ...batangBagan("bt", 80, 40, 180, 26, W.jumlah, "40", 14)),
      tambah("satu", ...batangBagan("b1", 80, 76, 54, 26, W.bagian, "12", 13), teks("n1", 107, 118, "1 bagian", 8, W.ungu)),
    ),
    k(
      SUARA_T2,
      tambah("mengurangkan", teks("ku", 200, 120, "40 − 12", 14, W.merah)),
      tambah("mendapat", ...batangBagan("b2", 134, 76, 126, 26, W.tanya, "28", 14)),
    ),
    k(
      SUARA_T3,
      tambah("Cocok", emo("ok", 272, 150, E.benar, 24)),
      sorotkan("bagian", "b1", "b2"),
      sorotkan("jumlah", "bt"),
    ),
    k(
      SUARA_T4,
      hapus(0, "ok"),
      tambah("Kurang", emo("xs", 272, 150, E.salah, 24)),
      tambah("banyak", ...Array.from({ length: 10 }, (_, i) => kotak(`bb${i}`, 30 + i * 26, 134, 22, 8, W.bagian, W.biru, { rx: 1, tebal: 1, z: 1 }))),
      tambah("sulit", emo("pz", 150, 170, E.pusing, 24)),
    ),
  ],
};
