import type { AdeganStory } from "./logika-story";
import { E, W, bulat, emo, garis, judul, kapur, kartu, kotak, lantaiToko, meja, papanKapur, susunTeks, teks, tokoh } from "./k3b1D-gambar";
import { bersih, k, sorotkan, tambah, ubah } from "./k3b1D-bantu";

/*
 * Cerita orisinal IGIL "Pesanan Bu Tuti" (Kelas 3 Bab 1 Sub-Bab D), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b1d.md. Bagian ini: pembuka (tiga lembar catatan hitung lama), Standard Addition (Penjumlahan Bersusun), terapannya, dan penolong "cocok / kurang cocok".
 */

export const NAMA_METODE = ["Standard Addition", "Number Bond", "Counting On"] as const;
export const NAMA_METODE_ID = ["Penjumlahan Bersusun", "Pasangan Bilangan", "Menghitung Maju"] as const;

const KUNING_KARTU = "#FEF3C7";

/**
 * Ketukan "cocok" (tanda benar) atau "kurang cocok" (tanda salah): satu kartu dua baris. `atKata` memicu catatan kecil di bawah kartu.
 * Dipakai ketiga metode global.
 */
export const ketukanCocok = (suara: string, cocok: boolean, judulTeks: string, baris: [string, string], catatan: string, atKata: string) =>
  k(
    suara,
    bersih(0),
    tambah(0, judul(judulTeks, cocok ? W.hijauTua : W.merah), emo("tn", 150, 72, cocok ? E.benar : E.salah, 34), ...kartu("cc", 60, 92, 180, 58, cocok ? W.hijauMuda : W.merahMuda, baris, 11)),
    tambah(atKata, teks("hn", 150, 178, catatan, 9, W.ungu)),
  );

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Di bawah meja pesanan, Salsa menemukan tiga lembar catatan hitung lama milik pedagang kue.";
const SUARA_O2 = "Bu Tuti berkata, itu tiga cara menjumlah yang dipakai pedagang agar cepat dan tidak salah.";
const SUARA_O3 = "Tiga cara itu: Standard Addition, Number Bond, dan Counting On.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Penjumlahan Bersusun, Pasangan Bilangan, dan Menghitung Maju.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Tiga lembar catatan hitung lama",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Lembar Catatan Lama"), ...lantaiToko("lt", 150)),
      tambah("meja", ...meja("mj", 80, 60, 140, 40)),
      tambah("Salsa", ...tokoh("sl", 44, 184, "Salsa")),
      tambah("tiga", teks("n3", 150, 46, "3 lembar", 10, W.ungu)),
      tambah("lembar", ...[0, 1, 2].flatMap((i) => kartu(`c${i}`, 112 + i * 30, 122, 26, 32, KUNING_KARTU, ["catatan"], 5))),
    ),
    k(
      SUARA_O2,
      tambah("Tuti", ...tokoh("bt", 256, 184, "Bu Tuti")),
      ubah("tiga", { id: "n3", isi: "3 cara" }),
      sorotkan("cara", "c0-k", "c1-k", "c2-k"),
      tambah("cepat", emo("ok", 226, 124, E.benar, 22)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara Menjumlah"), teks("n3", 262, 40, "3 cara", 10, W.ungu)),
      tambah("Standard", teks("m0", 150, 66, "1. Standard Addition", 12, W.biru), garis("ma1", 24, 58, 28, 0, W.biru, 2), garis("ma2", 24, 66, 28, 0, W.biru, 2), garis("ma3", 24, 74, 28, 0, W.merah, 2)),
      tambah("Number", teks("m1", 150, 116, "2. Number Bond", 12, W.biru), bulat("mb0", 38, 100, 6, W.krem, W.biru), garis("mb1", 38, 106, -10, 14, W.biru, 1.4), garis("mb2", 38, 106, 10, 14, W.biru, 1.4), bulat("mb3", 28, 124, 4, W.pink, W.biru), bulat("mb4", 48, 124, 4, W.pink, W.biru)),
      tambah("Counting", teks("m2", 150, 166, "3. Counting On", 12, W.biru), garis("mc1", 22, 170, 36, 0, W.biru, 1.6), bulat("mc2", 22, 170, 2.5, W.merah, W.merah), bulat("mc3", 40, 170, 2.5, W.merah, W.merah), bulat("mc4", 58, 170, 2.5, W.merah, W.merah)),
    ),
    k(
      SUARA_O4,
      tambah("Penjumlahan", teks("g0", 235, 80, "Penjumlahan Bersusun", 9, W.ungu)),
      tambah("Pasangan", teks("g1", 235, 130, "Pasangan Bilangan", 9, W.ungu)),
      tambah("Menghitung", teks("g2", 235, 180, "Menghitung Maju", 9, W.ungu)),
    ),
  ],
};

/* ------------------------------ Standard Addition: konsep ------------------------------ */
const SUARA_C1 = "Cara pertama, Standard Addition, atau Penjumlahan Bersusun.";
const SUARA_C2 = "Bilangan ditulis bersusun, puluhan lurus dengan puluhan dan satuan lurus dengan satuan.";
const SUARA_C3 = "Jumlahkan dari satuan. Kalau lebih dari sembilan, simpan satu puluhan.";
const SUARA_C4 = "Lalu jumlahkan puluhan beserta simpanannya.";

export const ADEGAN_LUAR_SUSUN: AdeganStory = {
  id: "luar-susun",
  judul: "Standard Addition: Penjumlahan Bersusun",
  sumber: "Metode global: Standard Addition",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Penjumlahan Bersusun"), papanKapur("pk", 30, 28, 240, 150)),
      tambah("Standard", kapur("nm", 150, 46, "Standard Addition", 11, { warna: W.emas })),
      tambah("Penjumlahan", ...susunTeks("ls", 42, 31, 170, 76)),
    ),
    k(
      SUARA_C2,
      sorotkan("bersusun,", "ls-a", "ls-b"),
      tambah("puluhan", kotak("kc-t", 149, 60, 11, 76, "#60A5FA", undefined, { op: 0.35, z: 1, rx: 2, tebal: 0 }), teks("kp", 160, 160, "puluhan", 8, "#93C5FD", { anchor: "end", z: 3 })),
      tambah("satuan", kotak("kc-s", 160, 60, 11, 76, "#FBBF24", undefined, { op: 0.35, z: 1, rx: 2, tebal: 0 }), teks("ks", 162, 160, "satuan", 8, "#FCD34D", { anchor: "start", z: 3 })),
    ),
    k(
      SUARA_C3,
      ubah("satuan.", { id: "kc-s", op: 0.8 }),
      tambah("Kalau", kapur("n9", 235, 90, "lebih dari 9", 10)),
      tambah("simpan", kapur("sm", 235, 116, "simpan 1", 11, { warna: W.emas })),
    ),
    k(
      SUARA_C4,
      ubah("Lalu", { id: "kc-s", op: 0.35 }),
      ubah("puluhan", { id: "kc-t", op: 0.8 }),
      tambah("simpanannya.", teks("sim", 160, 60, "1", 11, W.merah, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Standard Addition: terapan ------------------------------ */
const SUARA_T1 = "Raka menjumlah empat puluh tujuh dan tiga puluh enam. Tujuh ditambah enam tiga belas, simpan satu.";
const SUARA_T2 = "Empat ditambah tiga ditambah satu delapan. Jumlahnya delapan puluh tiga.";
const SUARA_T3 = "Cocok untuk bilangan dua angka yang tidak mudah dihitung di kepala.";
const SUARA_T4 = "Kurang cocok untuk bilangan kecil yang bisa dihitung langsung.";

export const ADEGAN_LUAR_SUSUN_TERAPAN: AdeganStory = {
  id: "luar-susun-terapan",
  judul: "Penjumlahan Bersusun dalam pemakaian",
  sumber: "Metode global: Standard Addition, terapan",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Raka Menjumlah"), papanKapur("pk", 80, 28, 200, 150), ...tokoh("rk", 40, 184, "Raka")),
      tambah("empat", ...susunTeks("ls", 47, 36, 190, 70)),
      tambah("tujuh@2", kapur("eq", 245, 84, "7", 11)),
      ubah("enam@2", { id: "eq", isi: "7 + 6" }),
      ubah("belas,", { id: "eq", isi: "7 + 6 = 13" }),
      tambah("simpan", kapur("sm", 245, 112, "simpan 1", 11, { warna: W.emas })),
    ),
    k(
      SUARA_T2,
      tambah("Empat", kapur("e4", 245, 140, "4", 11)),
      ubah("tiga", { id: "e4", isi: "4 + 3" }),
      ubah("satu", { id: "e4", isi: "4 + 3 + 1" }),
      ubah("delapan.", { id: "e4", isi: "4 + 3 + 1 = 8" }),
      tambah("Jumlahnya", kapur("ls-h", 190, 124, "83", 18, { anchor: "end" })),
    ),
    ketukanCocok(SUARA_T3, true, "Cocok", ["2 angka", "sulit dihitung di kepala"], "bersusun lebih aman", "tidak"),
    ketukanCocok(SUARA_T4, false, "Kurang cocok", ["bilangan kecil", "langsung bisa dihitung"], "cukup dihitung di kepala", "dihitung"),
  ],
};
