import type { AdeganStory } from "./logika-story";
import { E, KOL, W, WARNA_TULIS, angka, emo, etalase, judul, kartu, kartuAngka, kasir, kotakKartu, kotakTempat, labelHarga, meja, panah, kotak, tabelTempat, teks, tokoDepan, tokoh, tumpukKartu } from "./k3b1B-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k3b1B-bantu";

/*
 * Cerita orisinal IGIL "Kartu Harga Bu Wati" (Kelas 3 Bab 1 Sub-Bab B, tempat angka), Toko Kelontong Pak Joko.
 * Naskah suara dari naskah/story-naskah-k3b1b.md. Bagian ini: meja label (masalah), tempat angka pada 251, menyusun kartu.
 */
/* ------------------------------ 1. Meja label ------------------------------ */
const SUARA_A1 = "Pagi ini Bu Wati dari percetakan datang ke Toko Pak Joko membawa kotak kartu angka.";
const SUARA_A2 = "Kartu hijau seratus, kartu biru sepuluh, kartu merah satu.";
const SUARA_A3 = "Bu Wati berkata, kita akan membuat label harga dengan menyusun kartu.";

export const ADEGAN_MEJA_LABEL: AdeganStory = {
  id: "meja-label",
  judul: "Bu Wati membawa kotak kartu angka",
  sumber: "Materi: meja depan dan kartu angka",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_A1,
      bersih(0),
      tambah(0, judul("Meja Depan Toko"), ...tokoDepan("dn"), ...meja("mj", 100, 126, 112)),
      tambah("Wati", ...tokoh("bw", 44, 172, "Bu Wati")),
      tambah("Toko", ...etalase("et", 14, 46)),
      tambah("Joko", ...tokoh("pj", 262, 172, "Pak Joko"), ...kasir("ks", 226, 96)),
      tambah("kotak", ...kotakKartu("kk", 122, 100)),
    ),
    k(
      SUARA_A2,
      tambah("hijau", emo("kl", 150, 90, E.kilau, 16)),
      tambah("seratus,", ...kartuAngka("c0", 118, 62, "100", "r", 26, 34, 10)),
      tambah("sepuluh,", ...kartuAngka("c1", 148, 62, "10", "p", 26, 34, 12)),
      tambah("satu.", ...kartuAngka("c2", 178, 62, "1", "s", 26, 34, 14)),
    ),
    k(
      SUARA_A3,
      tambah("berkata,", ...kartu("gl", 12, 104, 60, 18, W.putih, ["Ayo!"], 9, { z: 5 })),
      tambah("kita", ...tokoh("rk", 100, 172, "Raka"), ...tokoh("sl", 146, 172, "Salsa"), ...tokoh("bm", 192, 172, "Bima")),
      tambah("label", ...labelHarga("lb", 212, 40, 76, 34, "_ _ _", 16)),
      tambah("menyusun", panah("pn", 204, 78, 14, -22, W.ungu, 2.4)),
    ),
  ],
};

/* ------------------------------ 2. Tempat angka ------------------------------ */
const SUARA_B1 = "Lihat label dua ratus lima puluh satu. Angka dua di ratusan, angka lima di puluhan, angka satu di satuan.";
const SUARA_B2 = "Angka yang sama bisa mewakili jumlah yang berbeda, tergantung tempatnya.";
const SUARA_B3 = "Di sini angka dua mewakili dua ratus, angka lima mewakili lima puluh, dan angka satu mewakili satu.";

export const ADEGAN_TEMPAT_ANGKA: AdeganStory = {
  id: "tempat-angka",
  judul: "Angka dan tempatnya pada label 251",
  sumber: "Materi: tempat angka dan jumlah yang diwakili",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      bersih(0),
      tambah(0, judul("Tiga Tempat"), ...tokoDepan("dn")),
      tambah("label", kotak("lb", 40, 38, 220, 66, W.putih, W.biru, { rx: 6, tebal: 2.6, z: 1 }), teks("lb-c", 150, 51, "Label 251", 8, W.coklat, { z: 2 })),
      tambah("dua", angka("d0", 96, 96, "2", "r", 44)),
      tambah("lima", angka("d1", 150, 96, "5", "p", 44)),
      tambah("satu", angka("d2", 204, 96, "1", "s", 44)),
      tambah("ratusan,", ...kotakTempat("t0", 70, 114, 52, 20, "Ratusan", "r"), panah("a0", 96, 99, 0, 14, W.kr, 2.2)),
      tambah("puluhan,", ...kotakTempat("t1", 124, 114, 52, 20, "Puluhan", "p"), panah("a1", 150, 99, 0, 14, W.kp, 2.2)),
      tambah("satuan.", ...kotakTempat("t2", 178, 114, 52, 20, "Satuan", "s"), panah("a2", 204, 99, 0, 14, W.ks, 2.2)),
    ),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, judul("Angka Sama, Tempat Beda"), ...tokoDepan("dn"), ...tabelTempat("tb", 40, 44, 220, 96)),
      tambah("sama", angka("e0", KOL[0], 102, "7", "r", 40), angka("e1", KOL[1], 102, "7", "p", 40), angka("e2", KOL[2], 102, "7", "s", 40)),
      tambah("mewakili", panah("q0", KOL[0], 106, 0, 13, W.kr, 2.2), panah("q1", KOL[1], 106, 0, 13, W.kp, 2.2), panah("q2", KOL[2], 106, 0, 13, W.ks, 2.2)),
      tambah("berbeda,", teks("m0", KOL[0], 134, "700", 12, WARNA_TULIS.r, { z: 3 }), teks("m1", KOL[1], 134, "70", 12, WARNA_TULIS.p, { z: 3 }), teks("m2", KOL[2], 134, "7", 12, WARNA_TULIS.s, { z: 3 })),
      tambah("tempatnya.", emo("kl", 276, 100, E.kilau, 20)),
    ),
    k(
      SUARA_B3,
      bersih(0),
      tambah(0, judul("Angka dan Jumlahnya"), ...tokoDepan("dn"), ...tabelTempat("tb", 40, 44, 220, 96), angka("d0", KOL[0], 102, "2", "r", 40), angka("d1", KOL[1], 102, "5", "p", 40), angka("d2", KOL[2], 102, "1", "s", 40)),
      tambah("dua", panah("q0", KOL[0], 106, 0, 13, W.kr, 2.2)),
      tambah("ratus,", teks("m0", KOL[0], 134, "200", 12, WARNA_TULIS.r, { z: 3 })),
      tambah("lima", panah("q1", KOL[1], 106, 0, 13, W.kp, 2.2)),
      tambah("puluh,", teks("m1", KOL[1], 134, "50", 12, WARNA_TULIS.p, { z: 3 })),
      tambah("satu", panah("q2", KOL[2], 106, 0, 13, W.ks, 2.2)),
      tambah("satu@2", teks("m2", KOL[2], 134, "1", 12, WARNA_TULIS.s, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 3. Susun kartu ------------------------------ */
const SUARA_C1 = "Raka menyusun kartu: dua kartu seratus, lima kartu sepuluh, dan satu kartu satu.";
const SUARA_C2 = "Dua ratus ditambah lima puluh ditambah satu, cocok dengan label.";
const SUARA_C3 = "Tumpukan kartu dan label itu berarti jumlah yang sama.";

export const ADEGAN_SUSUN_KARTU: AdeganStory = {
  id: "susun-kartu",
  judul: "Raka menyusun kartu menjadi 251",
  sumber: "Materi: menyusun bilangan dari kartu",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_C1,
      bersih(0),
      tambah(0, judul("Raka Menyusun Kartu"), ...tokoDepan("dn"), ...meja("mj", 14, 138, 272)),
      tambah("Raka", ...tokoh("rk", 150, 172, "Raka")),
      tambah("seratus,", ...tumpukKartu("h", 36, 104, 2, "r", "100", 4, 26, 30, 10), teks("x0", 75, 124, "x2", 10, WARNA_TULIS.r, { z: 5 })),
      tambah("sepuluh,", ...tumpukKartu("p", 118, 104, 5, "p", "10", 4, 26, 30, 12), teks("x1", 157, 124, "x5", 10, WARNA_TULIS.p, { z: 5 })),
      tambah("satu.", ...tumpukKartu("s", 206, 104, 1, "s", "1", 4, 26, 30, 14), teks("x2", 245, 124, "x1", 10, WARNA_TULIS.s, { z: 5 })),
    ),
    k(
      SUARA_C2,
      tambah("ratus", teks("e0", 50, 62, "200", 14, WARNA_TULIS.r, { z: 5 })),
      tambah("puluh", teks("p1", 86, 62, "+", 14, W.biru, { z: 5 }), teks("e1", 114, 62, "50", 14, WARNA_TULIS.p, { z: 5 })),
      tambah("satu,", teks("p2", 144, 62, "+", 14, W.biru, { z: 5 }), teks("e2", 168, 62, "1", 14, WARNA_TULIS.s, { z: 5 })),
      tambah("label.", teks("eq", 196, 62, "=", 14, W.biru, { z: 5 }), teks("res", 232, 62, "251", 14, W.biru, { z: 5 })),
    ),
    k(
      SUARA_C3,
      hapus(0, "e0", "p1", "e1", "p2", "e2", "eq", "res"),
      sorotkan("Tumpukan", "h0", "h1", "p0", "p4", "s0"),
      tambah("label", ...labelHarga("lb", 112, 40, 76, 34, "251", 22)),
      tambah("jumlah", teks("sm", 94, 66, "=", 22, W.biru, { z: 5 })),
      tambah("sama.", emo("ok", 214, 66, E.benar, 20)),
    ),
  ],
};
