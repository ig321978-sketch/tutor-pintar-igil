import type { AdeganStory, Obj } from "./logika-story";
import { OWL, W, benda, bulat, deret, emo, garis, ikat, judul, kartu, kotak, teks, type Titik } from "./k1b6B-gambar";
import { hapus, k, pindah, redamkan, sorotkan, tambah, ubah } from "./k1b6B-bantu";
import type { Aksi } from "./logika-story";

const baris = (n: number, y: number, x0 = 28, dx = 38): Titik[] => Array.from({ length: n }, (_, i) => ({ x: x0 + i * dx, y }));
const idr = (p: string, a: number, b: number): string[] => Array.from({ length: b - a }, (_, i) => `${p}${a + i}`);

/* ------------------------------ 1. Penjumlahan berulang (kembar) ------------------------------ */
const SUARA_K1 = "Cara ketiga: penjumlahan berulang. Lihat dulu donat Kira yang tujuh dan donat Wei yang enam.";
const SUARA_K2 = "Donat Kira kita pisah satu. Sekarang Kira punya enam, dan satu donat dipisah sendiri.";
const SUARA_K3 = "Sekarang ada dua baris yang kembar. Masing-masing barisnya enam donat.";
const SUARA_K4 = "Enam ditambah enam sama dengan dua belas. Dua baris kembar itu jumlahnya dua belas.";
const SUARA_K5 = "Sekarang kita masukkan lagi donat yang dipisah. Dua belas ditambah satu sama dengan tiga belas.";
const SUARA_K6 = "Jadi tujuh ditambah enam sama dengan tiga belas. Cara ini mudah kalau kedua bilangannya hampir sama.";
const KK7 = baris(7, 70);
const KW6 = baris(6, 116);

export const ADEGAN_KEMBAR: AdeganStory = {
  id: "kembar",
  judul: "Cara 3: penjumlahan berulang",
  sumber: "Materi: penjumlahan berulang",
  latar: "#FDF2F8",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Cara 3: penjumlahan berulang")),
      tambah("Kira", ...deret("donat", "k", KK7, 8)),
      tambah("Wei", ...deret("donat", "w", KW6, 8)),
      tambah("enam.", ...kartu("kq", 60, 150, 180, 22, W.krem, ["7 + 6 = ?"], 11)),
    ),
    k(
      SUARA_K2,
      hapus(0, "kq-k", "kq-t0"),
      pindah("pisah", "k6", 262, 160),
      tambah("enam,", ...kartu("kp", 14, 150, 134, 22, W.langit, ["7 = 6 + 1"], 11)),
    ),
    k(
      SUARA_K3,
      sorotkan("kembar.", ...idr("k", 0, 6), ...idr("w", 0, 6)),
      tambah("Masing-masing", teks("kb", 150, 194, "dua baris kembar", 9.6, W.ungu)),
    ),
    k(
      SUARA_K4,
      hapus(0, "kp-k", "kp-t0", "kb"),
      tambah("Enam", ...kartu("kd", 60, 150, 180, 24, W.hijauMuda, ["6 + 6 = 12"], 11)),
    ),
    k(
      SUARA_K5,
      redamkan(0, ...idr("k", 0, 6), ...idr("w", 0, 6)),
      pindah("masukkan", "k6", 256, 116),
      tambah("Dua", ...kartu("kh", 60, 178, 180, 20, W.krem, ["12 + 1 = 13"], 10)),
    ),
    k(
      SUARA_K6,
      hapus(0, "kd-k", "kd-t0", "kh-k", "kh-t0"),
      tambah("Jadi", ...kartu("kj", 60, 150, 180, 26, W.emas, ["7 + 6 = 13"], 11)),
      tambah("hampir", emo("ow", 262, 192, OWL, 26)),
    ),
  ],
};

/* ------------------------------ 2. Pasangan bilangan ------------------------------ */
const SUARA_P1 = "Cara berikutnya memakai pasangan bilangan. Sebuah bilangan boleh dipisah menjadi dua bagian.";
const SUARA_P2 = "Misalnya dua belas dipisah menjadi sepuluh dan dua. Dua belas artinya sepuluh dan dua.";
const SUARA_P3 = "Sekarang tambahkan tiga. Kita tambahkan ke bagian yang kecil dulu. Dua ditambah tiga sama dengan lima.";
const SUARA_P4 = "Lalu gabungkan dengan sepuluh. Sepuluh ditambah lima sama dengan lima belas.";
const SUARA_P5 = "Jadi dua belas ditambah tiga sama dengan lima belas. Puluhannya tetap, hanya satuannya yang bertambah.";
const bulatAngka = (id: string, x: number, y: number, r: number, isi: string, warna: string): Obj[] => [bulat(`${id}-b`, x, y, r, warna, W.biru, { tebal: 1.6 }), teks(`${id}-t`, x, y + 5.5, isi, 16, W.merah)];

export const ADEGAN_PASANGAN: AdeganStory = {
  id: "pasangan-bilangan",
  judul: "Pasangan bilangan",
  sumber: "Materi: pasangan bilangan",
  latar: "#FEFCE8",
  ketukan: [
    k(SUARA_P1, tambah(0, judul("Pasangan bilangan")), tambah("Sebuah", ...bulatAngka("pa", 150, 56, 18, "12", W.krem))),
    k(
      SUARA_P2,
      tambah("dipisah", garis("l1", 150, 74, -50, 34, W.biru, 2), garis("l2", 150, 74, 50, 34, W.biru, 2)),
      tambah("sepuluh", ...bulatAngka("pb", 100, 124, 16, "10", W.hijauMuda)),
      tambah("dua@2", ...bulatAngka("pc", 200, 124, 16, "2", W.langit)),
      tambah("artinya", ...kartu("ka", 14, 150, 134, 22, W.krem, ["12 = 10 + 2"], 10.6)),
    ),
    k(
      SUARA_P3,
      sorotkan("bagian", "pc-b"),
      tambah("tiga.", teks("p3", 246, 130, "+ 3", 14, W.ungu)),
      tambah("Dua", ...kartu("kb", 156, 150, 134, 22, W.langit, ["2 + 3 = 5"], 10.6)),
    ),
    k(
      SUARA_P4,
      redamkan(0, "pc-b"),
      sorotkan("Sepuluh@2", "pb-b"),
      tambah("lima", ...kartu("kc", 60, 176, 180, 22, W.hijauMuda, ["10 + 5 = 15"], 10.6)),
    ),
    k(
      SUARA_P5,
      redamkan(0, "pb-b"),
      hapus(0, "ka-k", "ka-t0", "kb-k", "kb-t0", "kc-k", "kc-t0", "p3"),
      tambah("Jadi", ...kartu("kz", 60, 156, 180, 30, W.emas, ["12 + 3 = 15"], 12)),
    ),
  ],
};

/* ------------------------------ 3. Sedotan Upe dan Malosi ------------------------------ */
const SUARA_U1 = "Upe punya dua belas sedotan. Ada sepuluh yang diikat jadi satu, dan dua sedotan lepas.";
const SUARA_U2 = "Malosi punya tiga sedotan lepas. Berapa jumlah sedotan Upe dan Malosi?";
const SUARA_U3 = "Kita tambahkan satuan dengan satuan dulu. Seret sedotan Malosi ke dua sedotan lepas Upe. Dua ditambah tiga sama dengan lima.";
const SUARA_U4 = "Lalu tambahkan satu ikat sepuluh. Sepuluh ditambah lima sama dengan lima belas.";
const SUARA_U5 = "Jadi dua belas ditambah tiga sama dengan lima belas. Ada lima belas sedotan semuanya.";
const SUARA_U6 = "Ingat, puluhan tidak berubah. Yang bertambah hanya satuannya. Cara ini juga cocok untuk bilangan yang lain.";
const SD = 7.4;
const UPE10: Titik[] = Array.from({ length: 10 }, (_, i) => ({ x: 36 + (i % 5) * 22, y: 60 + Math.floor(i / 5) * 34 }));
const UPE_LEPAS: Titik[] = [{ x: 176, y: 56 }, { x: 204, y: 56 }];
const MAL_AWAL: Titik[] = [{ x: 176, y: 96 }, { x: 204, y: 96 }, { x: 232, y: 96 }];
const MAL_AKHIR: Titik[] = [{ x: 232, y: 56 }, { x: 260, y: 56 }, { x: 176, y: 96 }];
/** Sedotan digeser: benda utama dan pelengkap berpojok kiri-atas (pusat dikurangi setengah lebar dan 1,3 kali jari-jari). */
const geserSedotan = (at: string | number, id: string, p: Titik): Aksi => ({ at, ubah: [{ id, x: p.x - SD * 0.45, y: p.y - SD * 1.3 }, { id: `${id}-x`, x: p.x - SD * 0.45, y: p.y - SD * 1.3 }] });

export const ADEGAN_SEDOTAN: AdeganStory = {
  id: "sedotan-upe",
  judul: "Sedotan Upe dan Malosi",
  sumber: "Materi: sedotan Upe dan Malosi",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Sedotan Upe dan Malosi")),
      tambah("Upe", ikat("ik", 20, 40, 124, 84), teks("tu", 82, 34, "Upe: 12", 8.8, W.biru)),
      tambah("sepuluh", ...UPE10.flatMap((p, i) => benda("sedotan", `u${i}`, p.x, p.y, SD, i))),
      tambah("dua", ...UPE_LEPAS.flatMap((p, i) => benda("sedotan", `u${10 + i}`, p.x, p.y, SD, 10 + i))),
      tambah("diikat", ...kartu("ki", 14, 146, 136, 22, W.merahMuda, ["1 ikat = 10 sedotan"], 8.8)),
    ),
    k(
      SUARA_U2,
      tambah("Malosi", ...MAL_AWAL.flatMap((p, i) => benda("sedotan", `m${i}`, p.x, p.y, SD, i + 2)), teks("tm", 204, 126, "Malosi: 3", 8.8, W.biru)),
      tambah("Berapa", emo("tn", 262, 120, "❓", 26)),
    ),
    k(
      SUARA_U3,
      hapus(0, "tn"),
      sorotkan("satuan", "u10", "u11", "m0", "m1", "m2"),
      ...[0, 1, 2].map((i) => geserSedotan("Seret", `m${i}`, MAL_AKHIR[i])),
      hapus(0, "tm"),
      tambah("Dua@2", ...kartu("ka", 156, 146, 134, 22, W.langit, ["2 + 3 = 5"], 10.6)),
    ),
    k(
      SUARA_U4,
      redamkan(0, "u10", "u11", "m0", "m1", "m2"),
      ubah("ikat", { id: "ik", op: 1 }),
      tambah("Sepuluh@2", ...kartu("kb", 60, 174, 180, 22, W.hijauMuda, ["10 + 5 = 15"], 10.6)),
    ),
    k(
      SUARA_U5,
      hapus(0, "ka-k", "ka-t0", "kb-k", "kb-t0"),
      tambah("Jadi", ...kartu("kc", 156, 146, 134, 24, W.emas, ["12 + 3 = 15"], 11)),
    ),
    k(
      SUARA_U6,
      hapus(0, "ki-k", "ki-t0"),
      tambah("Ingat,", ...kartu("kd", 14, 146, 136, 24, W.krem, ["puluhan tetap"], 10)),
      tambah("bertambah", emo("ow", 262, 190, OWL, 26)),
    ),
  ],
};

/* ------------------------------ 4. Nilai tempat ------------------------------ */
const SUARA_N1 = "Cara berikutnya memakai nilai tempat. Lihat tabel puluhan dan satuan ini. Kita akan menjumlahkan tiga belas dan empat.";
const SUARA_N2 = "Tiga belas terdiri dari satu puluhan dan tiga satuan. Isi tabel dengan satu dan tiga.";
const SUARA_N3 = "Empat hanya punya satuan, yaitu empat. Tidak ada puluhan, jadi kotak puluhannya kosong.";
const SUARA_N4 = "Tambahkan satuan dengan satuan dulu. Tiga ditambah empat sama dengan tujuh. Tulis tujuh di kotak satuan.";
const SUARA_N5 = "Puluhannya tetap satu. Jadi tiga belas ditambah empat sama dengan tujuh belas.";
const KOLOM_X = [90, 170];
const BARIS_Y = [52, 86, 120];
const sel = (r: number, c: number): Obj => kotak(`nt-c${r}${c}`, KOLOM_X[c], BARIS_Y[r], 70, 30, W.putih, W.biru, { rx: 4, tebal: 1.5 });
const angka = (r: number, c: number, isi: string): Obj => teks(`nt-d${r}${c}`, KOLOM_X[c] + 35, BARIS_Y[r] + 22, isi, 18, W.merah);

export const ADEGAN_NILAI_TEMPAT: AdeganStory = {
  id: "nilai-tempat",
  judul: "Nilai tempat: puluhan dan satuan",
  sumber: "Materi: nilai tempat",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Nilai tempat")),
      tambah("tabel", teks("hp", 125, 44, "Puluhan", 9, W.ungu), teks("hs", 205, 44, "Satuan", 9, W.ungu), ...[0, 1, 2].flatMap((r) => [sel(r, 0), sel(r, 1)])),
      tambah("tiga", teks("r0", 48, 74, "13", 15, W.biru), teks("r1", 48, 108, "+ 4", 15, W.biru), teks("r2", 48, 142, "hasil", 9.6, W.biru)),
    ),
    k(
      SUARA_N2,
      sorotkan("puluhan", "nt-c00"),
      tambah("satu", angka(0, 0, "1")),
      tambah("tiga@2", angka(0, 1, "3")),
    ),
    k(
      SUARA_N3,
      redamkan(0, "nt-c00"),
      tambah("Empat", angka(1, 1, "4")),
      sorotkan("kosong.", "nt-c10"),
    ),
    k(
      SUARA_N4,
      redamkan(0, "nt-c10"),
      tambah("Tiga", ...kartu("ks", 60, 164, 180, 22, W.langit, ["3 + 4 = 7"], 11)),
      tambah("Tulis", angka(2, 1, "7")),
    ),
    k(
      SUARA_N5,
      hapus(0, "ks-k", "ks-t0"),
      tambah("tetap", angka(2, 0, "1")),
      tambah("Jadi", ...kartu("kt", 40, 164, 220, 24, W.emas, ["13 + 4 = 17"], 12)),
    ),
  ],
};
