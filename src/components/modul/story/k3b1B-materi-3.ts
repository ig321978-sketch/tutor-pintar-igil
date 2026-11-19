import type { AdeganStory } from "./logika-story";
import { E, KOL, W, angka, emo, garis, judul, kartu, kartuLepas, kasir, kotak, labelHarga, meja, panah, papanKapur, tabelTempat, teks, tokoDepan, tokoh, topiBadut, truk } from "./k3b1B-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k3b1B-bantu";

/*
 * Cerita orisinal IGIL "Kartu Harga Bu Wati" (Kelas 3 Bab 1 Sub-Bab B), Toko Kelontong Pak Joko.
 * Naskah suara dari naskah/story-naskah-k3b1b.md. Bagian ini: tabel diisi angka, menyusun bilangan dari tiga kartu angka, penutup menuju Sub-Bab C.
 */

/* ------------------------------ 7. Tabel angka ------------------------------ */
const SUARA_G1 = "Bima mengisi tabel dengan angka. Untuk sembilan ratus delapan puluh tujuh, ia menulis sembilan, delapan, tujuh.";
const SUARA_G2 = "Tabel dibaca dari ratusan.";
const SUARA_G3 = "Tabel hanya diisi satu angka di tiap tempat, bukan jumlahnya.";

export const ADEGAN_TABEL_ANGKA: AdeganStory = {
  id: "tabel-angka",
  judul: "Bima mengisi tabel dengan angka",
  sumber: "Materi: tabel diisi angka, bukan jumlahnya",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_G1,
      bersih(0),
      tambah(0, judul("Isi Tabel dengan Angka"), ...tokoDepan("dn")),
      tambah("Bima", ...tokoh("bm", 46, 172, "Bima")),
      tambah("tabel", ...papanKapur("pk", 24, 38, 252, 96), ...tabelTempat("tb", 40, 56, 220, 72)),
      tambah("tujuh,", teks("cap", 150, 50, "Bilangan 987", 9, W.putih, { z: 3 })),
      tambah("sembilan@2", angka("d0", KOL[0], 112, "9", "r", 34)),
      tambah("delapan@2", angka("d1", KOL[1], 112, "8", "p", 34)),
      tambah("tujuh@2", angka("d2", KOL[2], 112, "7", "s", 34)),
    ),
    k(
      SUARA_G2,
      sorotkan("Tabel", "tb-k"),
      tambah("dibaca", panah("ar", 54, 144, 180, 0, W.emas, 3)),
      tambah("ratusan.", emo("mu", 70, 166, E.menunjuk, 18)),
      sorotkan("ratusan.", "tb-c0"),
    ),
    k(
      SUARA_G3,
      hapus(0, "ar", "mu"),
      tambah("satu", teks("sa", 150, 145, "1 angka di tiap tempat", 8.5, W.coklat, { z: 5 })),
      sorotkan("tiap", "d0", "d1", "d2"),
      tambah("bukan", teks("w0", KOL[0], 160, "900", 13, "#B91C1C", { z: 5 }), teks("w1", KOL[1], 160, "80", 13, "#B91C1C", { z: 5 }), teks("w2", KOL[2], 160, "7", 13, "#B91C1C", { z: 5 })),
      tambah("jumlahnya.", garis("sx", 60, 150, 180, 14, W.merah, 2.8), emo("x1", 262, 156, E.salah, 20)),
    ),
  ],
};

/* ------------------------------ 8. Susun bilangan ------------------------------ */
const SUARA_H1 = "Bu Wati bertanya, tiga angka empat nol dan delapan bisa disusun menjadi bilangan apa?";
const SUARA_H2 = "Salsa menyusun empat ratus delapan, lalu Bima menyusun delapan ratus empat. Angkanya sama, tetapi bilangannya berbeda.";
const SUARA_H3 = "Tempat angka menentukan bilangan: empat ratus delapan lain dengan delapan ratus empat.";

export const ADEGAN_SUSUN_BILANGAN: AdeganStory = {
  id: "susun-bilangan",
  judul: "Tiga kartu angka empat, nol, delapan",
  sumber: "Materi: tempat angka menentukan bilangan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_H1,
      bersih(0),
      tambah(0, judul("Tiga Kartu Angka"), ...tokoDepan("dn")),
      tambah("Wati", ...tokoh("bw", 44, 172, "Bu Wati")),
      tambah("tiga", teks("tg", 150, 56, "3 angka", 9, W.ungu, { z: 5 })),
      tambah("empat", ...kartuLepas("a4", 80, 64, "4")),
      tambah("nol", ...kartuLepas("a0", 130, 64, "0")),
      tambah("delapan", ...kartuLepas("a8", 180, 64, "8")),
      tambah("apa?", emo("qq", 150, 146, E.tanya, 26)),
    ),
    k(
      SUARA_H2,
      bersih(0),
      tambah(0, judul("Dua Susunan"), ...tokoDepan("dn")),
      tambah("Salsa", ...tokoh("sl", 44, 172, "Salsa"), ...tabelTempat("ta", 14, 50, 130, 62)),
      tambah("empat", angka("a4", 35.7, 100, "4", "r", 30)),
      tambah("delapan,", angka("a0", 79, 100, "0", "p", 30), angka("a8", 122.3, 100, "8", "s", 30), teks("c1", 79, 128, "408", 14, W.biru, { z: 5 })),
      tambah("Bima", ...tokoh("bm", 256, 172, "Bima"), ...tabelTempat("tb", 156, 50, 130, 62)),
      tambah("ratus@2", angka("b8", 177.7, 100, "8", "r", 30), angka("b0", 221, 100, "0", "p", 30)),
      tambah("empat.", angka("b4", 264.3, 100, "4", "s", 30), teks("c2", 221, 128, "804", 14, W.biru, { z: 5 })),
      tambah("berbeda.", teks("ne", 150, 92, "≠", 22, W.merah, { z: 5 })),
    ),
    k(
      SUARA_H3,
      bersih(0),
      tambah(0, judul("Tempat Angka Menentukan"), ...tokoDepan("dn")),
      tambah("menentukan", emo("lp", 150, 154, E.lampu, 24)),
      tambah("bilangan:", teks("tk", 150, 50, "tempat angka", 9, W.ungu, { z: 5 })),
      tambah("delapan", ...labelHarga("l1", 30, 64, 100, 50, "408", 28)),
      tambah("lain", teks("ne", 150, 98, "≠", 28, W.merah, { z: 5 })),
      tambah("empat.", ...labelHarga("l2", 170, 64, 100, 50, "804", 28)),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_I1 = "Bima memakai topi badut seharian dan melayani pembeli dengan serius. Pembeli tertawa!";
const SUARA_I2 = "Besok Pak Dodi mengantar karung beras dari tiga gudang, dan Pak Joko ingin tahu gudang mana yang terbanyak.";
const SUARA_I3 = "Menurutmu, mana yang lebih besar, empat ratus delapan atau delapan ratus empat? Terima kasih, Raka, Salsa, Bima, Pak Joko, dan Bu Wati!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Bima bertopi badut dan kiriman beras besok",
  sumber: "Materi: penutup dan jembatan ke Sub-Bab C",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_I1,
      bersih(0),
      tambah(0, judul("Bima Bertopi Badut"), ...tokoDepan("dn"), ...meja("mj", 190, 134, 100), ...kasir("ks", 232, 100)),
      tambah("Bima", ...tokoh("bm", 110, 172, "Bima")),
      tambah("topi", ...topiBadut("tp", 110, 152, 0.9)),
      tambah("pembeli", emo("pb", 190, 172, E.pembeli, 28)),
      tambah("tertawa!", emo("tw", 190, 142, E.tertawa, 22), emo("kl", 160, 132, E.kilau, 18)),
    ),
    k(
      SUARA_I2,
      bersih(0),
      tambah(0, judul("Besok Ada Kiriman"), ...tokoDepan("dn")),
      tambah("Dodi", ...truk("tr", 20, 102), teks("pd", 56, 94, "Pak Dodi", 8.4, W.ungu, { z: 5 })),
      tambah("karung", emo("k0", 28, 118, E.karung, 14), emo("k1", 44, 118, E.karung, 14)),
      tambah("tiga", ...kartu("pt", 164, 44, 122, 80, "#ECFCCB", ["3 gudang"], 9, { z: 1 })),
      tambah("gudang,", kotak("g0", 172, 76, 30, 30, "#B45309", W.biru, { rx: 3, tebal: 1.4, z: 2 }), kotak("g1", 208, 76, 30, 30, "#B45309", W.biru, { rx: 3, tebal: 1.4, z: 2 }), kotak("g2", 244, 76, 30, 30, "#B45309", W.biru, { rx: 3, tebal: 1.4, z: 2 })),
      tambah("Joko", ...tokoh("pj", 262, 172, "Pak Joko")),
      tambah("terbanyak.", emo("qq", 224, 152, E.tanya, 26)),
    ),
    k(
      SUARA_I3,
      bersih(0),
      tambah(0, judul("Mana yang Lebih Besar?"), ...tokoDepan("dn")),
      tambah("empat", ...labelHarga("la", 40, 56, 90, 44, "408", 28)),
      tambah("empat?", ...labelHarga("lb", 170, 56, 90, 44, "804", 28), emo("qq", 150, 86, E.tanya, 24)),
      tambah("Raka,", ...tokoh("rk", 32, 172, "Raka")),
      tambah("Salsa,", ...tokoh("sl", 92, 172, "Salsa")),
      tambah("Bima,", ...tokoh("bm", 152, 172, "Bima")),
      tambah("Joko,", ...tokoh("pj", 212, 172, "Pak Joko")),
      tambah("Wati!", ...tokoh("bw", 268, 172, "Bu Wati"), emo("lm", 268, 136, E.lambai, 22)),
    ),
  ],
};
