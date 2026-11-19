import type { AdeganStory } from "./logika-story";
import { E, W, emo, judul, kapur, kotak, kotakKue, lantaiToko, meja, papanKapur, susunTeks, teks, tokoh } from "./k3b1D-gambar";
import { k, sorotkan, tambah, ubah, hapus } from "./k3b1D-bantu";

/*
 * Cerita orisinal IGIL "Pesanan Bu Tuti" (Kelas 3 Bab 1 Sub-Bab D, penjumlahan sampai 100), Toko Kelontong Pak Joko.
 * Naskah suara dari naskah/story-naskah-k3b1d.md. Bagian ini: pesanan kue di meja toko, susun pendek, dan susun panjang.
 */

/* ------------------------------ 1. Pesanan kue ------------------------------ */
const SUARA_P1 = "Bu Tuti, panitia arisan, memesan kue untuk balai warga.";
const SUARA_P2 = "Pak Joko menyiapkan dua kotak: dua puluh tiga kue lapis dan empat belas kue nagasari.";
const SUARA_P3 = "Berapa jumlah kue semuanya? Raka, Salsa, dan Bima menghitungnya dengan susun.";

export const ADEGAN_PESANAN_KUE: AdeganStory = {
  id: "pesanan-kue",
  judul: "Pesanan kue Bu Tuti",
  sumber: "Materi: pesanan kue di meja toko",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Pesanan Kue"), ...lantaiToko("lt", 150), ...meja("mj", 76, 112, 148)),
      tambah("Tuti,", ...tokoh("bt", 44, 184, "Bu Tuti")),
      tambah("arisan,", emo("ct", 44, 128, E.catat, 16)),
      tambah("memesan", emo("kq", 118, 108, E.kueLapis, 16)),
      tambah("balai", teks("bw", 150, 42, "balai warga", 9, W.ungu)),
    ),
    k(
      SUARA_P2,
      hapus("kotak:", "kq"),
      tambah("Joko", ...tokoh("pj", 256, 184, "Pak Joko")),
      tambah("dua", teks("n2", 150, 58, "2 kotak", 10, W.ungu)),
      tambah("lapis", ...kotakKue("k1", 90, 84, 56, 28, E.kueLapis, 6, 3), teks("c1", 118, 72, "23", 11, W.merah)),
      tambah("nagasari.", ...kotakKue("k2", 154, 84, 56, 28, E.nagasari, 6, 3), teks("c2", 182, 72, "14", 11, W.merah)),
    ),
    k(
      SUARA_P3,
      ubah("Berapa", { id: "n2", isi: "jumlah semua?" }),
      tambah("Raka,", ...tokoh("rk", 108, 184, "Raka")),
      tambah("Salsa,", ...tokoh("sl", 150, 184, "Salsa")),
      tambah("Bima", ...tokoh("bm", 192, 184, "Bima")),
      tambah("susun.", teks("sn", 150, 140, "susun", 9, W.hijau)),
    ),
  ],
};

/* ------------------------------ 2. Susun pendek ------------------------------ */
const SUARA_S1 = "Tulis bilangan bersusun ke bawah. Puluhan lurus dengan puluhan, satuan lurus dengan satuan.";
const SUARA_S2 = "Jumlahkan satuan dulu: tiga ditambah empat sama dengan tujuh.";
const SUARA_S3 = "Lalu puluhan: dua ditambah satu sama dengan tiga. Jumlahnya tiga puluh tujuh.";

export const ADEGAN_SUSUN_PENDEK: AdeganStory = {
  id: "susun-pendek",
  judul: "Susun pendek",
  sumber: "Materi: susun pendek",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Susun Pendek"), papanKapur("pk", 30, 28, 240, 150)),
      tambah("bersusun", ...susunTeks("ls", 23, 14, 170, 70)),
      tambah("Puluhan", kotak("kc-t", 149, 56, 11, 76, "#60A5FA", undefined, { op: 0.35, z: 1, rx: 2, tebal: 0 }), teks("kp", 160, 48, "puluhan", 8, "#93C5FD", { anchor: "end", z: 3 })),
      tambah("satuan", kotak("kc-s", 160, 56, 11, 76, "#FBBF24", undefined, { op: 0.35, z: 1, rx: 2, tebal: 0 }), teks("ks", 162, 48, "satuan", 8, "#FCD34D", { anchor: "start", z: 3 })),
    ),
    k(
      SUARA_S2,
      ubah("satuan", { id: "kc-s", op: 0.8 }),
      tambah("tiga", kapur("eq-s", 235, 82, "3", 11)),
      ubah("empat", { id: "eq-s", isi: "3 + 4" }),
      ubah("sama", { id: "eq-s", isi: "3 + 4 = 7" }),
      tambah("tujuh.", kapur("ls-h-s", 170, 122, "7", 18, { anchor: "end" })),
    ),
    k(
      SUARA_S3,
      ubah("puluhan:", { id: "kc-t", op: 0.8 }),
      tambah("dua", kapur("eq-p", 235, 130, "2", 11)),
      ubah("satu", { id: "eq-p", isi: "2 + 1" }),
      ubah("tiga.", { id: "eq-p", isi: "2 + 1 = 3" }),
      tambah("tiga.", kapur("ls-h-t", 160, 122, "3", 18, { anchor: "end" })),
      tambah("tujuh", teks("ha", 150, 164, "37 kue", 14, W.emas, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 3. Susun panjang ------------------------------ */
const SUARA_N1 = "Salsa memakai susun panjang. Dua puluh tiga jadi dua puluh dan tiga, empat belas jadi sepuluh dan empat.";
const SUARA_N2 = "Puluhan: dua puluh ditambah sepuluh jadi tiga puluh. Satuan: tiga ditambah empat jadi tujuh.";
const SUARA_N3 = "Tiga puluh ditambah tujuh menjadi tiga puluh tujuh, sama dengan susun pendek.";

export const ADEGAN_SUSUN_PANJANG: AdeganStory = {
  id: "susun-panjang",
  judul: "Susun panjang",
  sumber: "Materi: susun panjang",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Susun Panjang"), ...tokoh("sl", 44, 184, "Salsa")),
      tambah("susun", kotak("kc", 100, 30, 180, 150, W.putih, W.coklat, { rx: 6, tebal: 2, z: 0 })),
      tambah("Dua", teks("u1", 190, 60, "23 = 20 + 3", 13, W.biru, { z: 2 })),
      tambah("empat", teks("u2", 190, 84, "14 = 10 + 4", 13, W.biru, { z: 2 })),
    ),
    k(
      SUARA_N2,
      sorotkan("Puluhan:", "u1"),
      tambah("dua", teks("t1", 190, 114, "20 + 10 = 30", 13, W.hijauTua, { z: 2 })),
      sorotkan("Satuan:", "u2"),
      tambah("tiga@2", teks("t2", 190, 138, "3 + 4 = 7", 13, W.merah, { z: 2 })),
    ),
    k(
      SUARA_N3,
      tambah(0, teks("t3", 190, 160, "30 + 7", 13, W.ungu, { z: 2 })),
      ubah("menjadi", { id: "t3", isi: "30 + 7 = 37" }),
      tambah("sama", emo("ok", 262, 160, E.benar, 16)),
      tambah("susun", teks("sp", 190, 176, "= susun pendek", 8, W.ungu, { z: 2 })),
    ),
  ],
};
