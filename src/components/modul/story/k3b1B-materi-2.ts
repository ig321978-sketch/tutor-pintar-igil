import type { AdeganStory } from "./logika-story";
import { E, KOL, W, WARNA_TULIS, angka, emo, judul, kartuAngka, kotak, labelHarga, mesinCetak, meja, panah, tabelTempat, teks, tokoDepan, tokoh, topiBadut, tumpukKartu } from "./k3b1B-gambar";
import { bersih, k, sorotkan, tambah } from "./k3b1B-bantu";

/*
 * Cerita orisinal IGIL "Kartu Harga Bu Wati" (Kelas 3 Bab 1 Sub-Bab B), Toko Kelontong Pak Joko.
 * Naskah suara dari naskah/story-naskah-k3b1b.md. Bagian ini: salah enam (taruhan Bima), bentuk uraian, nol menjaga tempat.
 */

/* ------------------------------ 4. Salah enam ------------------------------ */
const SUARA_D1 = "Bima melihat label enam ratus, enam puluh, dan enam berderet. Katanya, angkanya sama, jadi jumlahnya sama! Kalau salah, aku memakai topi badut seharian!";
const SUARA_D2 = "Salsa menggeleng. Angkanya sama, tetapi tempatnya berbeda.";
const SUARA_D3 = "Angka enam di ratusan mewakili enam ratus, di puluhan enam puluh, dan di satuan hanya enam.";
const LABEL_X = [14, 110, 206];

export const ADEGAN_SALAH_ENAM: AdeganStory = {
  id: "salah-enam",
  judul: "Bima bertaruh angka enam sama jumlahnya",
  sumber: "Materi: angka sama, tempat berbeda",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_D1,
      bersih(0),
      tambah(0, judul("Angka Enam Berderet"), ...tokoDepan("dn"), ...meja("mj", 14, 128, 272)),
      tambah("Bima", ...tokoh("bm", 46, 172, "Bima")),
      tambah("ratus,", ...labelHarga("l0", LABEL_X[0], 58, 80, 38, "600", 22)),
      tambah("puluh,", ...labelHarga("l1", LABEL_X[1], 58, 80, 38, "60", 22)),
      tambah("enam@3", ...labelHarga("l2", LABEL_X[2], 58, 80, 38, "6", 22)),
      tambah("sama,", emo("q0", 54, 52, E.tanya, 14), emo("q1", 150, 52, E.tanya, 14), emo("q2", 246, 52, E.tanya, 14)),
      tambah("topi", ...topiBadut("tp", 282, 126)),
    ),
    k(
      SUARA_D2,
      tambah("Salsa", ...tokoh("sl", 100, 172, "Salsa")),
      tambah("menggeleng.", emo("gl", 130, 152, E.salah, 18)),
      sorotkan("sama,", "l0", "l1", "l2"),
      tambah("tempatnya", teks("hd0", 54, 109, "ratusan", 8, WARNA_TULIS.r, { z: 3 }), teks("hd1", 150, 109, "puluhan", 8, WARNA_TULIS.p, { z: 3 }), teks("hd2", 246, 109, "satuan", 8, WARNA_TULIS.s, { z: 3 })),
    ),
    k(
      SUARA_D3,
      bersih(0),
      tambah(0, judul("Tempat Menentukan Jumlah"), ...tokoDepan("dn"), ...meja("mj", 14, 128, 272)),
      tambah("ratus,", ...tumpukKartu("h", 40, 98, 6, "r", "100", 11), teks("v0", 53, 39, "600", 11, WARNA_TULIS.r, { z: 5 })),
      tambah("puluh,", ...tumpukKartu("p", 130, 98, 6, "p", "10", 5.5), teks("v1", 143, 66, "60", 11, WARNA_TULIS.p, { z: 5 })),
      tambah("enam.", ...tumpukKartu("s", 220, 98, 6, "s", "1", 2), teks("v2", 233, 84, "6", 11, WARNA_TULIS.s, { z: 5 })),
      tambah("satuan", ...tokoh("bm", 150, 172, "Bima"), emo("pk", 176, 156, E.pikir, 20)),
    ),
  ],
};

/* ------------------------------ 5. Bentuk uraian ------------------------------ */
const SUARA_E1 = "Bu Wati menguraikan tiga ratus empat puluh lima: tiga ratus ditambah empat puluh ditambah lima.";
const SUARA_E2 = "Tiga ratus di ratusan, empat puluh di puluhan, lima di satuan.";
const SUARA_E3 = "Dijumlahkan lagi, hasilnya kembali menjadi tiga ratus empat puluh lima.";

export const ADEGAN_BENTUK_URAIAN: AdeganStory = {
  id: "bentuk-uraian",
  judul: "Bu Wati menguraikan 345",
  sumber: "Materi: bentuk uraian",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_E1,
      bersih(0),
      tambah(0, judul("Bentuk Uraian"), ...tokoDepan("dn")),
      tambah("menguraikan", ...tokoh("bw", 44, 172, "Bu Wati")),
      tambah("lima:", ...labelHarga("lb", 100, 44, 100, 40, "345", 26)),
      tambah("ratus@2", ...kartuAngka("u0", 70, 108, "300", "r", 42, 34, 13)),
      tambah("puluh@2", teks("pl1", 122, 130, "+", 16, W.biru, { z: 5 }), ...kartuAngka("u1", 134, 108, "40", "p", 36, 34, 13)),
      tambah("lima@2", teks("pl2", 180, 130, "+", 16, W.biru, { z: 5 }), ...kartuAngka("u2", 192, 108, "5", "s", 30, 34, 13)),
    ),
    k(
      SUARA_E2,
      bersih(0),
      tambah(0, judul("Satu Bilangan, Tiga Tempat"), ...tokoDepan("dn"), ...tabelTempat("tb", 40, 52, 220, 70), ...tokoh("bw", 44, 172, "Bu Wati")),
      sorotkan("ratus", "tb-c0"),
      tambah("ratusan,", angka("d0", KOL[0], 108, "300", "r", 22)),
      tambah("puluhan,", angka("d1", KOL[1], 108, "40", "p", 22)),
      tambah("satuan.", angka("d2", KOL[2], 108, "5", "s", 22)),
    ),
    k(
      SUARA_E3,
      bersih(0),
      tambah(0, judul("Disatukan Lagi"), ...tokoDepan("dn"), ...tokoh("bw", 44, 172, "Bu Wati"), teks("e0", 60, 74, "300", 16, WARNA_TULIS.r, { z: 5 }), teks("p1", 100, 74, "+", 16, W.biru, { z: 5 }), teks("e1", 134, 74, "40", 16, WARNA_TULIS.p, { z: 5 }), teks("p2", 168, 74, "+", 16, W.biru, { z: 5 }), teks("e2", 196, 74, "5", 16, WARNA_TULIS.s, { z: 5 })),
      tambah("kembali", panah("pn", 130, 86, 0, 12, W.ungu, 2.6)),
      tambah("menjadi", teks("eq", 232, 74, "=", 16, W.biru, { z: 5 })),
      tambah("lima.", ...labelHarga("lb", 100, 102, 100, 40, "345", 26), emo("ok", 222, 124, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ 6. Nol menjaga tempat ------------------------------ */
const SUARA_F1 = "Label enam ratus dua hampir dicetak enam puluh dua karena mesin cetak macet.";
const SUARA_F2 = "Salsa menunjuk puluhan yang kosong. Tempat itu harus diisi nol supaya angka enam tetap di ratusan.";
const SUARA_F3 = "Dengan nol, tiga tempat tetap utuh: enam ratus ditambah nol ditambah dua.";

export const ADEGAN_NOL_MENJAGA: AdeganStory = {
  id: "nol-menjaga",
  judul: "Nol menjaga tempat pada 602",
  sumber: "Materi: angka nol menjaga tempat",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_F1,
      bersih(0),
      tambah(0, judul("Mesin Cetak Macet"), ...tokoDepan("dn"), ...meja("mj", 14, 138, 272)),
      tambah("ratus", ...labelHarga("lg", 100, 44, 100, 40, "602", 24)),
      tambah("dicetak", ...mesinCetak("mc", 124, 114)),
      tambah("puluh", kotak("lx", 150, 92, 44, 24, W.putih, W.biru, { rx: 4, tebal: 2, rot: -10, z: 3 }), teks("lx-t", 172, 108, "62", 14, W.biru, { rot: -10, z: 4 })),
      tambah("macet.", emo("x1", 230, 104, E.salah, 22), emo("db", 100, 112, E.debu, 22)),
    ),
    k(
      SUARA_F2,
      bersih(0),
      tambah(0, judul("Tempat Puluhan Kosong"), ...tokoDepan("dn"), ...tabelTempat("tb", 40, 52, 220, 70), angka("d0", KOL[0], 108, "6", "r", 36), angka("d2", KOL[2], 108, "2", "s", 36)),
      tambah("Salsa", ...tokoh("sl", 44, 172, "Salsa")),
      tambah("puluhan", kotak("ks", 118, 78, 64, 38, W.krem, W.merah, { rx: 4, tebal: 2, putus: true, z: 2 })),
      tambah("nol", angka("d1", KOL[1], 108, "0", "p", 36)),
      sorotkan("ratusan.", "d0"),
    ),
    k(
      SUARA_F3,
      bersih(0),
      tambah(0, judul("Tiga Tempat Tetap Utuh"), ...tokoDepan("dn"), ...tabelTempat("tb", 40, 44, 220, 66), angka("d0", KOL[0], 100, "6", "r", 34), angka("d1", KOL[1], 100, "0", "p", 34), angka("d2", KOL[2], 100, "2", "s", 34)),
      sorotkan("nol,", "d1"),
      tambah("tiga", teks("n3", 150, 126, "3 tempat", 10, W.ungu, { z: 5 })),
      tambah("ratus", teks("e0", 66, 154, "600", 14, WARNA_TULIS.r, { z: 5 })),
      tambah("nol@2", teks("p1", 100, 154, "+", 14, W.biru, { z: 5 }), teks("e1", 124, 154, "0", 14, WARNA_TULIS.p, { z: 5 })),
      tambah("dua.", teks("p2", 150, 154, "+", 14, W.biru, { z: 5 }), teks("e2", 174, 154, "2", 14, WARNA_TULIS.s, { z: 5 }), teks("eq", 202, 154, "=", 14, W.biru, { z: 5 }), teks("res", 238, 154, "602", 14, W.biru, { z: 5 })),
    ),
  ],
};
