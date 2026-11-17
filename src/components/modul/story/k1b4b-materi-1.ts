import type { AdeganStory } from "./logika-story";
import {
  E,
  ID_BARANG,
  JAJAR,
  SERAK,
  W,
  barangDi,
  emo,
  idKeranjang,
  judul,
  kartu,
  keranjangAturan,
  lantaiTeras,
  lencanaAturan,
  letakAturan,
  masukkan,
  orang,
  semuaKeranjang,
  teks,
  yangCocok,
} from "./k1b4b-gambar";
import { hapus, k, redamkan, sorotkan, tambah, ubah } from "./k1b4b-bantu";

/*
 * Cerita orisinal IGIL "Teras Penuh Barang" (Kelas 1 Bab 4 Sub-Bab B, memilah benda), lanjutan Festival Mainan Kardus.
 * Masalah: sembilan barang bekas bercampur di teras; tiap kali butuh bahan, semua harus dibongkar.
 * Penyelesaian: pilih satu aturan, periksa tiap barang, taruh di keranjangnya, beri nama, hitung isinya.
 */

/* ------------------------------ 1. Teras penuh barang ------------------------------ */
const SUARA_T1 = "\"Rodaku di mana?\" Igil mengaduk teras yang penuh barang dari gudang. Festival tinggal dua hari lagi.";
const SUARA_T2 = "Igil membongkar barang satu per satu sampai teras makin berantakan. Waktunya habis untuk mencari.";
const SUARA_T3 = "Ada sembilan barang bercampur: lengkung, segitiga, segi empat, merah, dan biru.";
const SUARA_T4 = "Mamah bertanya, \"Bagaimana kalau dipilah dengan satu aturan?\" Barang yang cocok masuk ke keranjang yang sama.";
const ACAK = SERAK.map((p, i) => ({ id: `b${i}`, x: p.x + (i % 2 ? 10 : -10), y: p.y + ((i % 3) - 1) * 6 }));

export const ADEGAN_TERAS: AdeganStory = {
  id: "teras-penuh",
  judul: "Teras penuh barang",
  sumber: "Materi: masalah teras penuh barang",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Teras penuh barang")),
      tambah("teras", ...lantaiTeras("lt", 6, 34, 288, 112)),
      tambah("Igil", ...orang("ig", 40, 172, E.igil, "Igil")),
      tambah("penuh", ...barangDi(SERAK)),
      tambah("Festival", emo("td", 176, 168, E.tenda, 22)),
      tambah("dua", ...kartu("fs", 194, 152, 102, 22, W.emas, ["festival 2 hari lagi"], 8)),
    ),
    k(
      SUARA_T2,
      tambah("mencari.", emo("rd", 76, 166, E.roda, 18), teks("rq", 94, 162, "?", 14, W.merah)),
      ubah("membongkar", ...ACAK),
      tambah("satu", emo("pz", 64, 146, E.pusing, 16)),
    ),
    k(
      SUARA_T3,
      tambah("sembilan", ...kartu("jm", 8, 37, 72, 18, W.langit, ["9 barang"], 9.5)),
      sorotkan("lengkung,", ...yangCocok("bentuk", "lengkung").map((i) => ID_BARANG[i])),
      sorotkan("segitiga,", ...yangCocok("bentuk", "segitiga").map((i) => ID_BARANG[i])),
      sorotkan("segi@2", ...yangCocok("bentuk", "segi empat").map((i) => ID_BARANG[i])),
      redamkan("merah,", ...ID_BARANG),
    ),
    k(
      SUARA_T4,
      hapus(0, "rd", "rq", "pz", "td", "fs-k", "fs-t0"),
      tambah("Mamah", ...orang("mm", 110, 172, E.mamah, "Mamah")),
      tambah("satu", ...kartu("sa", 140, 152, 120, 22, W.hijauMuda, ["pilah dengan 1 aturan"], 8.6)),
      tambah("keranjang", emo("kj", 278, 166, E.keranjang, 22)),
    ),
  ],
};

/* ------------------------------ 2. Aturan bentuk ------------------------------ */
const SUARA_B1 = "Kaka yang teliti memilih aturan bentuk. Ia menyiapkan tiga keranjang: lengkung, segitiga, dan segi empat.";
const SUARA_B2 = "Barang pertama melengkung, tanpa sudut. Ia masuk keranjang lengkung.";
const SUARA_B3 = "Barang kedua punya tiga sudut, masuk keranjang segitiga.";
const SUARA_B4 = "Barang ketiga punya empat sudut, masuk keranjang segi empat.";
const SUARA_B5 = "Begitu terus satu per satu, sampai sembilan barang diperiksa. Teras pun bersih.";
const kaca = (i: number) => ({ id: "kc", x: JAJAR[i].x, y: JAJAR[i].y - 20 });

export const ADEGAN_BENTUK: AdeganStory = {
  id: "aturan-bentuk",
  judul: "Aturan bentuk: tiga keranjang",
  sumber: "Materi: memilah menurut bentuk",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Aturan: bentuk"), ...barangDi(JAJAR)),
      tambah("Kaka", ...orang("kk", 26, 82, E.kaka, "Kaka")),
      tambah("tiga", teks("tk", 150, 108, "3 keranjang", 10, W.coklat)),
      tambah("lengkung,", ...keranjangAturan("bentuk", 0)),
      tambah("segitiga,", ...keranjangAturan("bentuk", 1)),
      tambah("segi@2", ...keranjangAturan("bentuk", 2)),
    ),
    k(
      SUARA_B2,
      sorotkan("pertama.", "b0"),
      tambah("pertama.", emo("kc", kaca(0).x, kaca(0).y, E.kaca, 14)),
      hapus("tanpa", "tk"),
      tambah("tanpa", teks("ct", 150, 108, "tanpa sisi lurus, tanpa sudut", 9.5, W.coklat)),
      ubah("masuk", ...masukkan("bentuk", [0])),
    ),
    k(
      SUARA_B3,
      hapus(0, "ct"),
      ubah(0, kaca(1)),
      sorotkan("kedua", "b1"),
      tambah("tiga", teks("ct2", 150, 108, "3 sisi lurus, 3 sudut", 10, W.coklat)),
      ubah("masuk", ...masukkan("bentuk", [1])),
    ),
    k(
      SUARA_B4,
      hapus(0, "ct2"),
      ubah(0, kaca(2)),
      sorotkan("ketiga", "b2"),
      tambah("empat", teks("ct3", 150, 108, "4 sisi lurus, 4 sudut", 10, W.coklat)),
      ubah("masuk", ...masukkan("bentuk", [2])),
    ),
    k(
      SUARA_B5,
      hapus(0, "ct3", "kc"),
      ubah("satu", ...masukkan("bentuk", [3, 4, 5])),
      ubah("sembilan", ...masukkan("bentuk", [6, 7, 8])),
      tambah("sembilan", teks("ct4", 150, 108, "9 barang sudah diperiksa", 10, W.hijau)),
      tambah("bersih.", emo("ok", 60, 58, E.benar, 18)),
    ),
  ],
};

/* ------------------------------ 3. Nama dan isi keranjang ------------------------------ */
const SUARA_N1 = "Tiap keranjang diberi nama dan dihitung isinya. Keranjang lengkung berisi tiga.";
const SUARA_N2 = "Keranjang segitiga berisi dua. Keranjang segi empat berisi empat.";
const SUARA_N3 = "Tiga, dua, dan empat, semuanya sembilan, sama dengan barang di teras.";
const SUARA_N4 = "\"Sekarang aku cukup membaca nama keranjangnya!\" seru Igil senang.";
const PAPAN = ["lengkung", "segitiga", "segi empat"].map((n) => `${idKeranjang(n)}-nm-k`);

export const ADEGAN_NAMA: AdeganStory = {
  id: "nama-isi",
  judul: "Nama dan isi keranjang",
  sumber: "Materi: nama dan isi keranjang",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Nama dan isi keranjang"), ...semuaKeranjang("bentuk"), ...barangDi(letakAturan("bentuk")), ...orang("kk", 30, 76, E.kaka, "Kaka")),
      sorotkan("nama", ...PAPAN),
      redamkan("lengkung", ...PAPAN),
      sorotkan("lengkung", "k-lengkung"),
      tambah("tiga", ...lencanaAturan("bentuk", 0)),
    ),
    k(
      SUARA_N2,
      redamkan(0, "k-lengkung"),
      sorotkan(0, "k-segitiga"),
      tambah("dua", ...lencanaAturan("bentuk", 1)),
      redamkan("segi@2", "k-segitiga"),
      sorotkan("segi@2", "k-segiempat"),
      tambah("empat@2", ...lencanaAturan("bentuk", 2)),
    ),
    k(
      SUARA_N3,
      redamkan(0, "k-segiempat"),
      tambah("semuanya", ...kartu("jm", 80, 52, 140, 26, W.emas, ["3 + 2 + 4 = 9"], 12)),
      tambah("teras", teks("tr", 150, 96, "di teras ada 9 barang", 10, W.hijau)),
    ),
    k(SUARA_N4, sorotkan("Nama", ...PAPAN), tambah("Igil", ...orang("ig", 270, 76, E.igil, "Igil")), tambah("membaca", emo("mt", 244, 56, E.mata, 14))),
  ],
};
