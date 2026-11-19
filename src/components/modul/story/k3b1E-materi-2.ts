import type { AdeganStory } from "./logika-story";
import { E, W, barisButir, batang, emo, garis, judul, kapur, kardusKosong, kartu, panah, papanKapur, teks, tokoh, tokoLatar, idBarisButir, idKartu } from "./k3b1E-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k3b1E-bantu";

/*
 * Cerita orisinal IGIL "Sisa Stok Pak Anto" (Kelas 3 Bab 1 Sub-Bab E).
 * Naskah suara dari naskah/story-naskah-k3b1e.md. Bagian ini: Raka salah membalik satuan (taruhan), meminjam satu puluhan, dan memeriksa dengan penjumlahan.
 */

/** Susunan angka pengurangan di papan kapur kiri: bilangan atas, bawah, tanda, dan garis (id `${id}-a`, `${id}-b`, `${id}-m`, `${id}-g`). */
const susunPapan = (id: string, atas: string, bawah: string, tanda = "-") => ({
  atas: kapur(`${id}-a`, 112, 76, atas, 26, { anchor: "end" }),
  bawah: [kapur(`${id}-m`, 70, 106, tanda, 26), kapur(`${id}-b`, 112, 106, bawah, 26, { anchor: "end" }), garis(`${id}-g`, 58, 113, 64, 0, "#F8FAFC", 1.8, { z: 3 })],
});

/* ------------------------------ 4. Salah balik ------------------------------ */
const SUARA_D1 = "Esoknya ada tujuh puluh satu bungkus mi, terjual dua puluh delapan. Raka cepat-cepat: satu dikurangi delapan tidak bisa, jadi delapan dikurangi satu, tujuh! Ia menulis lima puluh tujuh.";
const SUARA_D2 = "Raka bertaruh, kalau salah, aku menata semua kardus kosong!";
const SUARA_D3 = "Bima menggeleng. Satu lebih kecil dari delapan. Kita harus meminjam satu puluhan.";

export const ADEGAN_SALAH_BALIK: AdeganStory = {
  id: "salah-balik",
  judul: "Raka membalik satuan",
  sumber: "Materi: salah membalik satuan",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_D1,
      bersih(0),
      tambah(0, judul("Esok Hari"), ...tokoLatar("tk"), ...papanKapur("pk", 14, 34, 150, 120)),
      tambah("tujuh", susunPapan("sn", "71", "28").atas),
      tambah("dua", ...susunPapan("sn", "71", "28").bawah),
      tambah("Raka", ...tokoh("rk", 246, 172, "Raka")),
      tambah("tujuh@2", ...kartu("k1", 176, 50, 118, 30, W.kuning, ["8 - 1 = 7"], 13)),
      tambah("lima", kapur("hs", 112, 138, "57", 26, { anchor: "end", warna: "#FCA5A5" }), emo("sr", 250, 138, E.seru, 20)),
    ),
    k(
      SUARA_D2,
      tambah("kalau", emo("tg", 214, 146, E.tertawa, 18)),
      tambah("menata", ...kardusKosong("kk0", 176, 150), ...kardusKosong("kk1", 176, 130)),
      tambah("kosong!", ...kardusKosong("kk2", 176, 110), ...kardusKosong("kk3", 176, 90), emo("ll", 216, 126, E.lelah, 18)),
    ),
    k(
      SUARA_D3,
      tambah(0, ...tokoh("bm", 214, 172, "Bima")),
      hapus("Satu", ...idKartu("k1")),
      tambah("kecil", ...kartu("k4", 176, 50, 118, 30, W.hijauMuda, ["1 kecil dari 8"], 11)),
      tambah("meminjam", panah("pn", 120, 70, 0, 20, W.merah, 2.4), ...kartu("k5", 176, 92, 118, 24, W.krem, ["pinjam 1 puluhan"], 10)),
    ),
  ],
};

/* ------------------------------ 5. Pinjam puluhan ------------------------------ */
const SUARA_E1 = "Puluhan tujuh dipinjam satu, tinggal enam. Satu puluhan itu dibuka menjadi sepuluh satuan.";
const SUARA_E2 = "Satuan jadi sebelas. Sebelas dikurangi delapan sama dengan tiga.";
const SUARA_E3 = "Puluhan: enam dikurangi dua sama dengan empat. Sisanya empat puluh tiga bungkus.";

export const ADEGAN_PINJAM_PULUHAN: AdeganStory = {
  id: "pinjam-puluhan",
  judul: "Meminjam satu puluhan",
  sumber: "Materi: meminjam satu puluhan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_E1,
      bersih(0),
      tambah(0, judul("Meminjam Puluhan"), ...tokoLatar("tk"), ...papanKapur("pk", 14, 34, 150, 120), susunPapan("sn", "71", "28").atas, ...susunPapan("sn", "71", "28").bawah),
      tambah("dipinjam", kapur("p7", 89.5, 52, "7", 12, { warna: "#FCA5A5" }), garis("c7", 85, 54, 9, -9, W.merah, 1.6, { z: 4 })),
      tambah("satu,", kapur("p1", 106, 52, "1", 11, { warna: "#FDE047" })),
      tambah("tinggal", kapur("p6", 74, 52, "6", 12, { warna: "#FDE047" })),
      tambah("Satu@2", teks("lb1", 232, 44, "1 puluhan", 9), ...batang("bt", 228, 50, 34)),
      tambah("dibuka", panah("pb", 232, 88, 0, 16, W.merah, 2.4), ...barisButir("bu", 180, 108, 10, 11)),
      tambah("sepuluh", teks("lb2", 232, 134, "10 satuan", 9)),
    ),
    k(
      SUARA_E2,
      ubah("sebelas.", { id: "p1", isi: "11", u: 12 }),
      tambah("delapan", ...kartu("k2", 176, 142, 118, 22, W.hijauMuda, ["11 - 8 = 3"], 11)),
      tambah("tiga.", kapur("hs", 112, 138, "3", 26, { anchor: "end" })),
    ),
    k(
      SUARA_E3,
      hapus("Puluhan:", "lb1", "bt", "bt-g", "pb", "lb2", ...idBarisButir("bu", 10), ...idKartu("k2")),
      tambah("dua", ...kartu("k3", 176, 50, 118, 30, W.kuning, ["6 - 2 = 4"], 13)),
      ubah("Sisanya", { id: "hs", isi: "43" }),
      tambah("bungkus.", ...kartu("k4", 176, 96, 118, 28, W.krem, ["43 bungkus"], 12), emo("ok", 262, 150, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ 6. Periksa dengan tambah ------------------------------ */
const SUARA_F1 = "Salsa memeriksa: empat puluh tiga ditambah dua puluh delapan harus kembali ke tujuh puluh satu.";
const SUARA_F2 = "Tiga ditambah delapan sebelas, simpan satu. Empat ditambah dua ditambah satu tujuh. Benar, tujuh puluh satu!";
const SUARA_F3 = "Jawaban Raka, lima puluh tujuh ditambah dua puluh delapan, hasilnya delapan puluh lima. Jadi jawaban Raka salah.";

export const ADEGAN_PERIKSA_TAMBAH: AdeganStory = {
  id: "periksa-tambah",
  judul: "Salsa memeriksa dengan penjumlahan",
  sumber: "Materi: memeriksa dengan penjumlahan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_F1,
      bersih(0),
      tambah(0, judul("Periksa dengan Tambah"), ...tokoLatar("tk"), ...papanKapur("pk", 14, 34, 150, 120), ...tokoh("sl", 246, 172, "Salsa")),
      tambah("empat", kapur("sn-a", 112, 76, "43", 26, { anchor: "end" })),
      tambah("dua", kapur("sn-m", 70, 106, "+", 26), kapur("sn-b", 112, 106, "28", 26, { anchor: "end" }), garis("sn-g", 58, 113, 64, 0, "#F8FAFC", 1.8, { z: 3 })),
      tambah("tujuh", ...kartu("k1", 176, 50, 118, 30, W.kuning, ["kembali ke 71"], 12), panah("pk1", 176, 66, -10, 8, W.merah, 2.2)),
    ),
    k(
      SUARA_F2,
      tambah("sebelas,", ...kartu("k2", 176, 92, 118, 24, W.hijauMuda, ["3 + 8 = 11"], 12)),
      tambah("simpan", kapur("cr", 89.5, 52, "1", 11, { warna: "#FDE047" })),
      tambah("Empat", ...kartu("k3", 176, 124, 118, 24, W.hijauMuda, ["4 + 2 + 1 = 7"], 11)),
      tambah("Benar,", kapur("hs", 112, 138, "71", 26, { anchor: "end" }), emo("ok", 250, 150, E.benar, 20)),
    ),
    k(
      SUARA_F3,
      bersih(0),
      tambah(0, judul("Jawaban Raka"), ...tokoLatar("tk"), ...papanKapur("pk", 14, 34, 150, 120)),
      tambah("lima", kapur("sn-a", 112, 76, "57", 26, { anchor: "end" }), ...tokoh("rk", 246, 172, "Raka")),
      tambah("dua", kapur("sn-m", 70, 106, "+", 26), kapur("sn-b", 112, 106, "28", 26, { anchor: "end" }), garis("sn-g", 58, 113, 64, 0, "#F8FAFC", 1.8, { z: 3 })),
      tambah("delapan@2", kapur("hs", 112, 138, "85", 26, { anchor: "end", warna: "#FCA5A5" })),
      tambah("salah.", ...kartu("k4", 176, 70, 118, 30, W.merahMuda, ["85 bukan 71"], 13), emo("x1", 250, 138, E.salah, 22), emo("lk", 246, 150, E.lelah, 16)),
    ),
  ],
};
