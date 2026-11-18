import type { AdeganStory } from "./logika-story";
import { E, W, baris, deret, emo, idDeret, judul, kartu, kertasPesanan, kotak, lantai, rak, teks, tokoh } from "./k2b2C-gambar";
import { hapus, idx, k, sorotkan, tambah, ubah } from "./k2b2C-bantu";

/*
 * Cerita orisinal IGIL "Pesanan Besar Pak Budi" (Kelas 2 Bab 2 Sub-Bab C, cerita hitungan penjumlahan dan pengurangan), akhir cerita Toko Seragam dan Alat Tulis Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b2c.md. Bagian ini: pesanan besar, salah langkah menjumlahkan padahal "kurangnya", dan empat langkah cerita.
 */

/* ------------------------------ 1. Pesanan besar ------------------------------ */
const SUARA_P1 = "Pak Budi, kepala sekolah, memesan alat tulis untuk acara pembukaan koperasi besok.";
const SUARA_P2 = "Bu Sari meminta Chacha, Dika, dan Nia menghitung kertas pesanannya.";
const SUARA_P3 = "Kalau salah hitung, hadiah untuk anak-anak bisa tidak cukup!";

export const ADEGAN_PESANAN_BESAR: AdeganStory = {
  id: "pesanan-besar",
  judul: "Pesanan besar untuk pembukaan",
  sumber: "Materi: pesanan besar Pak Budi",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Pesanan besar"), lantai("lt", 150), ...rak("rk", 16, 44, 128, 84), teks("rk-n", 80, 40, "rak alat tulis", 8.4, W.coklat), ...deret("pensil", "pn", baris(4, 38, 64, 28)), ...deret("penggaris", "pg", baris(3, 52, 90, 32))),
      tambah(idx(SUARA_P1, "Pak"), ...tokoh("bd", 262, 172, "budi")),
      tambah(idx(SUARA_P1, "memesan"), ...kertasPesanan("ks", 190, 58, 70, 80), teks("ks-t", 225, 74, "Pesanan", 8.4, W.biru, { z: 2 })),
      tambah(idx(SUARA_P1, "pembukaan"), emo("pt", 206, 38, E.pita, 16), teks("bp", 250, 40, "belum terpasang", 8, W.merah)),
    ),
    k(
      SUARA_P2,
      tambah(idx(SUARA_P2, "Sari"), ...tokoh("sr", 30, 172, "sari")),
      tambah(idx(SUARA_P2, "Chacha"), ...tokoh("ch", 74, 172, "chacha")),
      tambah(idx(SUARA_P2, "Dika"), ...tokoh("dk", 118, 172, "dika")),
      tambah(idx(SUARA_P2, "Nia"), ...tokoh("ni", 162, 172, "nia")),
      sorotkan(idx(SUARA_P2, "kertas"), "ks"),
      tambah(idx(SUARA_P2, "menghitung"), emo("kc", 222, 150, E.kaca, 20)),
    ),
    k(
      SUARA_P3,
      hapus(0, "kc"),
      tambah(idx(SUARA_P3, "salah"), emo("sl", 228, 110, E.salah, 22)),
      hapus(idx(SUARA_P3, "hadiah"), ...idDeret("pensil", "pn", 4), ...idDeret("penggaris", "pg", 3)),
      tambah(idx(SUARA_P3, "hadiah"), emo("hd0", 50, 70, E.hadiah, 22), emo("hd1", 92, 70, E.hadiah, 22)),
      tambah(idx(SUARA_P3, "tidak"), ...kartu("tc", 20, 100, 116, 20, W.merahMuda, ["hadiah tidak cukup"], 8.4)),
      tambah(idx(SUARA_P3, "cukup"), emo("sd", 222, 150, E.sedih, 22)),
    ),
  ],
};

/* ------------------------------ 2. Salah langkah: langsung menjumlahkan ------------------------------ */
const SUARA_T1 = "Pesanan pertama berbunyi, pensil ada dua belas, penggaris empat kurangnya dari pensil. Berapa penggaris?";
const SUARA_T2 = "Chacha langsung menjumlahkan dua belas dan empat, hasilnya enam belas penggaris!";
const SUARA_T3 = "Dika menggeleng. Kurangnya berarti lebih sedikit, jadi penggaris pasti lebih sedikit dari pensil, bukan lebih banyak.";

const KALIMAT_SALAH = [
  { id: "sm0", x: 112, isi: "12" },
  { id: "sm1", x: 140, isi: "+" },
  { id: "sm2", x: 168, isi: "4" },
  { id: "sm3", x: 196, isi: "=" },
  { id: "sm4", x: 224, isi: "16" },
];

export const ADEGAN_TERLALU_CEPAT: AdeganStory = {
  id: "terlalu-cepat",
  judul: "Langsung menjumlahkan",
  sumber: "Materi: salah langkah, kata kurangnya",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Pesanan pertama"), lantai("lt", 156)),
      tambah(idx(SUARA_T1, "pensil"), ...deret("pensil", "pn", baris(12, 36, 88, 21), 15)),
      tambah(idx(SUARA_T1, "belas"), teks("pn-n", 150, 68, "pensil: 12", 10)),
      tambah(idx(SUARA_T1, "penggaris"), teks("pg-n", 76, 124, "penggaris: ?", 10)),
      tambah(idx(SUARA_T1, "empat"), ...kartu("kr", 150, 108, 130, 22, W.krem, ["4 kurangnya"], 9.6)),
      sorotkan(idx(SUARA_T1, "kurangnya"), "kr-k"),
      tambah(idx(SUARA_T1, "Berapa"), emo("tn", 126, 128, E.tanya, 18)),
    ),
    k(
      SUARA_T2,
      tambah(idx(SUARA_T2, "Chacha"), ...tokoh("ch", 36, 176, "chacha")),
      hapus(idx(SUARA_T2, "langsung"), "tn"),
      tambah(idx(SUARA_T2, "belas"), teks(KALIMAT_SALAH[0].id, KALIMAT_SALAH[0].x, 172, KALIMAT_SALAH[0].isi, 16, W.biru)),
      tambah(idx(SUARA_T2, "dan"), teks(KALIMAT_SALAH[1].id, KALIMAT_SALAH[1].x, 172, KALIMAT_SALAH[1].isi, 16, W.merah)),
      tambah(idx(SUARA_T2, "empat"), teks(KALIMAT_SALAH[2].id, KALIMAT_SALAH[2].x, 172, KALIMAT_SALAH[2].isi, 16, W.biru)),
      tambah(idx(SUARA_T2, "hasilnya"), teks(KALIMAT_SALAH[3].id, KALIMAT_SALAH[3].x, 172, KALIMAT_SALAH[3].isi, 16, W.merah)),
      tambah(idx(SUARA_T2, "belas", 2), teks(KALIMAT_SALAH[4].id, KALIMAT_SALAH[4].x, 172, KALIMAT_SALAH[4].isi, 16, W.merah)),
      ubah(idx(SUARA_T2, "penggaris"), { id: "pg-n", isi: "penggaris: 16" }),
      tambah(idx(SUARA_T2, "penggaris"), emo("ss", 258, 150, E.seru, 20)),
    ),
    k(
      SUARA_T3,
      hapus(0, "ss"),
      tambah(idx(SUARA_T3, "Dika"), ...tokoh("dk", 276, 176, "dika")),
      tambah(idx(SUARA_T3, "menggeleng"), emo("x1", 250, 158, E.salah, 20)),
      sorotkan(idx(SUARA_T3, "Kurangnya"), "kr-k"),
      ubah(idx(SUARA_T3, "sedikit"), { id: "pg-n", isi: "penggaris: lebih sedikit", warna: W.hijau }),
      tambah(idx(SUARA_T3, "bukan"), emo("x2", 224, 150, E.salah, 16)),
    ),
  ],
};

/* ------------------------------ 3. Empat langkah ------------------------------ */
const SUARA_L1 = "Dika menulis empat langkah di kartu: diketahui, ditanya, solusi, dan kesimpulan.";
const SUARA_L2 = "Diketahui, pensil dua belas dan penggaris empat kurangnya. Ditanya, banyak penggaris. Solusi, dua belas dikurangi empat sama dengan delapan.";
const SUARA_L3 = "Kesimpulan, banyak penggaris adalah delapan. Kali ini jawabannya masuk akal!";

const KARTU4 = [
  { id: "l0", x: 8, y: 30, nama: "Diketahui", warna: "#DBEAFE" },
  { id: "l1", x: 152, y: 30, nama: "Ditanya", warna: "#FEF9C3" },
  { id: "l2", x: 8, y: 86, nama: "Solusi", warna: "#DCFCE7" },
  { id: "l3", x: 152, y: 86, nama: "Kesimpulan", warna: "#FCE7F3" },
];
const kartu4 = (i: number) => {
  const c = KARTU4[i];
  return [kotak(`${c.id}-k`, c.x, c.y, 140, 50, c.warna, W.biru, { rx: 8, tebal: 1.6 }), teks(`${c.id}-n`, c.x + 70, c.y + 15, c.nama, 9.6, W.ungu)];
};
const isi4 = (i: number, isi: string, u = 8) => teks(`${KARTU4[i].id}-i`, KARTU4[i].x + 70, KARTU4[i].y + 37, isi, u, W.biru, { z: 1 });

export const ADEGAN_EMPAT_LANGKAH: AdeganStory = {
  id: "empat-langkah",
  judul: "Empat langkah di kartu",
  sumber: "Materi: diketahui, ditanya, solusi, kesimpulan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_L1,
      tambah(0, judul("Empat langkah"), lantai("lt", 150)),
      tambah(idx(SUARA_L1, "Dika"), ...tokoh("dk", 30, 176, "dika")),
      tambah(idx(SUARA_L1, "menulis"), emo("ct", 62, 160, E.catat, 20)),
      tambah(idx(SUARA_L1, "empat"), teks("n4", 170, 164, "4 langkah di kartu", 11, W.ungu)),
      tambah(idx(SUARA_L1, "diketahui"), ...kartu4(0)),
      tambah(idx(SUARA_L1, "ditanya"), ...kartu4(1)),
      tambah(idx(SUARA_L1, "solusi"), ...kartu4(2)),
      tambah(idx(SUARA_L1, "kesimpulan"), ...kartu4(3)),
    ),
    k(
      SUARA_L2,
      hapus(0, "ct"),
      tambah(idx(SUARA_L2, "Diketahui"), isi4(0, "pensil 12, penggaris kurang 4")),
      sorotkan(idx(SUARA_L2, "Diketahui"), "l0-k"),
      tambah(idx(SUARA_L2, "Ditanya"), isi4(1, "banyak penggaris?")),
      sorotkan(idx(SUARA_L2, "Ditanya"), "l1-k"),
      tambah(idx(SUARA_L2, "Solusi"), isi4(2, "12 − 4", 12)),
      sorotkan(idx(SUARA_L2, "Solusi"), "l2-k"),
      ubah(idx(SUARA_L2, "delapan"), { id: "l2-i", isi: "12 − 4 = 8" }),
    ),
    k(
      SUARA_L3,
      tambah(idx(SUARA_L3, "Kesimpulan"), isi4(3, "penggaris ada 8", 9)),
      sorotkan(idx(SUARA_L3, "Kesimpulan"), "l3-k"),
      tambah(idx(SUARA_L3, "delapan"), emo("ok", 240, 160, E.centang, 20)),
      tambah(idx(SUARA_L3, "masuk"), emo("jm", 270, 164, E.jempol, 20)),
    ),
  ],
};
