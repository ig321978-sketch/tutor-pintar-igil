import type { AdeganStory } from "./logika-story";
import { E, W, dermaga, emo, garis, idSel, isiSel, judul, kartu, kotak, laut, panah, papanSusun, papanTulis, pasir, teks, tokoh } from "./k4b1f-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k4b1f-bantu";

/*
 * Cerita orisinal IGIL "Papan Sisa Pak Usman" (Kelas 4 Bab 1 Sub-Bab F), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b1f.md. Bagian ini: pembuka (peti catatan), Column Subtract (Susun dan Pinjam) dan terapannya.
 */

export const NAMA_METODE = ["Column Subtract", "Count Up", "Add Check"] as const;
export const NAMA_METODE_ID = ["Susun dan Pinjam", "Hitung Maju", "Periksa dengan Tambah"] as const;

const KUNING_KARTU = "#FEF3C7";
const PX = 76;
const PY = 40;

/* ------------------------------ Pembuka ------------------------------ */
const SUARA_O1 = "Malam itu, di dermaga, Pak Usman membuka peti catatannya yang penuh angka tamu.";
const SUARA_O2 = "Di dalamnya ada tiga cara untuk mengurangkan bilangan besar, supaya sisanya tidak keliru.";
const SUARA_O3 = "Tiga cara itu: Column Subtract, Count Up, dan Add Check.";
const SUARA_O4 = "Nama dalam bahasa Indonesia: Susun dan Pinjam, Hitung Maju, dan Periksa dengan Tambah.";

export const ADEGAN_LUAR_PEMBUKA: AdeganStory = {
  id: "luar-pembuka",
  judul: "Peti catatan Pak Usman",
  sumber: "Metode global: pembuka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_O1,
      tambah(0, judul("Malam di Dermaga"), ...laut("lt", 30, 56), pasir("ps", 100), ...dermaga("dm", 20, 86, 260)),
      tambah("Pak", ...tokoh("pu", 60, 184, "Pak Usman")),
      tambah("peti", kotak("pt", 200, 140, 56, 22, "#C99A63", W.coklat, { rx: 3, z: 1 }), kotak("tt", 196, 130, 64, 10, "#A16207", W.coklat, { rx: 3, z: 2 })),
      tambah("angka", ...kartu("cn", 186, 100, 92, 26, KUNING_KARTU, ["penuh angka tamu"], 8.4)),
    ),
    k(
      SUARA_O2,
      tambah("tiga", teks("n3", 150, 54, "3 cara", 11, W.ungu)),
      tambah("cara", ...[0, 1, 2].flatMap((i) => [kotak(`c${i}-k`, 104 + i * 30, 62, 26, 24, KUNING_KARTU, W.biru, { rx: 4 }), teks(`c${i}-t`, 117 + i * 30, 78, "cara", 6.4, W.biru)])),
      tambah("keliru.", emo("xs", 40, 60, E.salah, 18)),
      tambah("sisanya", emo("ok", 262, 60, E.benar, 18)),
    ),
    k(
      SUARA_O3,
      bersih(0),
      tambah(0, judul("Tiga Cara"), teks("n3", 260, 40, "3 cara", 10, W.ungu)),
      tambah("Column", teks("m0", 112, 70, "1. Column Subtract", 10, W.biru), emo("i0", 30, 72, E.catat, 16)),
      tambah("Count", teks("m1", 112, 120, "2. Count Up", 10, W.biru), emo("i1", 30, 122, E.ulang, 16)),
      tambah("Add", teks("m2", 112, 170, "3. Add Check", 10, W.biru), emo("i2", 30, 172, E.benar, 16)),
    ),
    k(
      SUARA_O4,
      tambah("Susun", teks("g0", 240, 70, "Susun dan Pinjam", 8, W.ungu), garis("l0", 204, 75, 72, 0, W.ungu, 1)),
      tambah("Hitung", teks("g1", 240, 120, "Hitung Maju", 8, W.ungu), garis("l1", 204, 125, 72, 0, W.ungu, 1)),
      tambah("Periksa", teks("g2", 240, 170, "Periksa dengan Tambah", 8, W.ungu), garis("l2", 204, 175, 80, 0, W.ungu, 1)),
    ),
  ],
};

/* ------------------------------ Column Subtract: konsep ------------------------------ */
const SUARA_S1 = "Cara pertama, Column Subtract, atau Susun dan Pinjam.";
const SUARA_S2 = "Susun pendek menulis bilangan ke bawah, susun panjang menguraikannya dulu, dan keduanya mengurangkan dari satuan ke arah kiri.";
const SUARA_S3 = "Kalau angka di atas lebih kecil, kita mengambil satu dari tempat di kirinya.";
const SUARA_S4 = "Satu yang diambil menjadi sepuluh di tempat kanan, itu satu kali mengambil, lalu pengurangan dilanjutkan.";
const A2 = idSel("ps", "a", 2);
const A1 = idSel("ps", "a", 1);

export const ADEGAN_LUAR_SUSUN: AdeganStory = {
  id: "luar-susun",
  judul: "Column Subtract: Susun dan Pinjam",
  sumber: "Metode global: Column Subtract (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Cara 1: Column Subtract"), ...papanTulis("pt", 8, 28, 284, 124)),
      tambah("Column", teks("nm", 150, 58, "Column Subtract", 14, W.kapurMerah)),
      tambah("Susun", teks("ni", 150, 82, "Susun dan Pinjam", 11, W.kapur)),
      tambah("Pinjam.", emo("ul", 150, 126, E.catat, 26)),
    ),
    k(
      SUARA_S2,
      bersih(0),
      tambah(0, judul("Dari Satuan ke Kiri"), ...papanTulis("pt", 8, 28, 284, 124)),
      tambah("pendek", ...papanSusun("ps", PX, PY, ["7", "4", "6"], ["3", "1", "2"]), teks("jp", 254, 66, "pendek", 9, W.kapur)),
      tambah("menguraikannya", teks("jq", 254, 94, "panjang", 9, W.kapur), teks("jr", 254, 108, "diuraikan", 8, W.kapurMerah)),
      tambah("satuan", teks("ls", 186, 142, "satuan", 8, W.kapur)),
      tambah("kiri.", panah("ar", 180, 138, -80, 0, W.kapurMerah, 2.4), teks("lk", 98, 142, "kiri", 8, W.kapur)),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Angka Atas Lebih Kecil"), ...papanTulis("pt", 8, 28, 284, 124), ...papanSusun("ps", PX, PY, ["5", "3", "2"], ["1", "1", "7"])),
      sorotkan("kecil,", A2, idSel("ps", "b", 2)),
      tambah("mengambil", panah("pj", 142, 36, 40, 0, W.kapurMerah, 2.4), teks("am", 164, 31, "ambil 1", 8.4, W.kapurMerah)),
      tambah("kirinya.", teks("lt", 254, 66, "2 < 7", 11, W.kapurMerah)),
    ),
    k(
      SUARA_S4,
      ubah("Satu", { id: A1, isi: "2", warna: W.merah }),
      ubah("menjadi", { id: A2, isi: "12", warna: W.merah }),
      tambah("sepuluh", teks("p10", 254, 96, "+10", 12, W.kapurMerah)),
      tambah("kali", teks("k1", 254, 126, "1 kali ambil", 8.4, W.kapurMerah)),
      tambah("lalu", isiSel("ps", PX, PY, 2, 2, "5", 13, W.hijau)),
      tambah("dilanjutkan.", emo("lj", 150, 136, E.perahuKecil, 14)),
    ),
  ],
};

/* ------------------------------ Column Subtract: terapan ------------------------------ */
const SUARA_T1 = "Laras mengurangkan empat ratus tiga puluh dikurangi seratus lima puluh delapan.";
const SUARA_T2 = "Ia mengambil dari tempat di kiri dua kali sampai semua kolom cukup.";
const SUARA_T3 = "Cocok untuk bilangan besar, karena langkahnya jelas dan bisa diperiksa.";
const SUARA_T4 = "Kurang cocok kalau kita lupa mencoret angka yang diambil, karena hasilnya bisa meleset.";
const B0 = idSel("ps", "a", 0);

export const ADEGAN_LUAR_SUSUN_TERAPAN: AdeganStory = {
  id: "luar-susun-terapan",
  judul: "Susun dan Pinjam: kapan cocok",
  sumber: "Metode global: Column Subtract (terapan)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Hitungan Laras"), ...papanTulis("pt", 8, 28, 284, 124), ...papanSusun("ps", PX, PY, ["", "", ""], ["", "", ""]), ...tokoh("la", 40, 184, "Laras")),
      tambah("empat", isiSel("ps", PX, PY, 0, 0, "4"), isiSel("ps", PX, PY, 0, 1, "3"), isiSel("ps", PX, PY, 0, 2, "0"), teks("n1", 254, 66, "430", 14, W.kapur)),
      tambah("seratus", isiSel("ps", PX, PY, 1, 0, "1"), isiSel("ps", PX, PY, 1, 1, "5"), isiSel("ps", PX, PY, 1, 2, "8"), teks("n2", 254, 94, "158", 14, W.kapur)),
      sorotkan("delapan.", "ps-mn"),
    ),
    k(
      SUARA_T2,
      tambah("dua", teks("d2", 254, 124, "2 kali ambil", 9, W.kapurMerah)),
      ubah("dua", { id: A1, isi: "2", warna: W.merah }, { id: A2, isi: "10", warna: W.merah }),
      ubah("kali", { id: B0, isi: "3", warna: W.merah }, { id: A1, isi: "12", warna: W.merah }),
      sorotkan("cukup.", A2, A1, B0),
    ),
    k(
      SUARA_T3,
      tambah("Cocok", emo("ok", 262, 52, E.benar, 20)),
      tambah("langkahnya", teks("jl", 150, 142, "langkah jelas", 9, W.kapur)),
      tambah("diperiksa.", emo("ma", 40, 52, E.mata, 18)),
    ),
    k(
      SUARA_T4,
      hapus("Kurang", "ok", "ma", "jl"),
      tambah("lupa", emo("xs", 262, 52, E.salah, 20)),
      tambah("mencoret", teks("lp", 150, 142, "lupa mencoret", 9, W.kapurMerah)),
      tambah("meleset.", teks("ml", 254, 40, "hasil meleset", 8, W.kapurMerah)),
    ),
  ],
};

