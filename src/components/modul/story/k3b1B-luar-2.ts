import type { AdeganStory } from "./logika-story";
import { E, W, WARNA_TULIS, angka, emo, judul, kartu, kartuAngka, kartuCocok, kartuKurang, kartuLepas, kotak, kotakTempat, labelHarga, panah, teks, tokoDepan, tokoh } from "./k3b1B-gambar";
import { bersih, hapus, k, tambah } from "./k3b1B-bantu";

/*
 * Cerita orisinal IGIL "Kartu Harga Bu Wati" (Kelas 3 Bab 1 Sub-Bab B), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b1b.md. Bagian ini: Montessori Cards (Kartu Angka Montessori), Expanded Form (Bentuk Uraian), terapannya, dan ringkasan.
 */

/** Satu kartu bertumpuk gaya Montessori: kotak berwarna `${id}` dengan tulisan di kiri `${id}-t`. */
const tumpukan = (id: string, x: number, y: number, w: number, isi: string, warna: string, u = 16) => [
  kotak(id, x, y, w, 40, warna, W.biru, { rx: 4, tebal: 1.6, z: 2 }),
  teks(`${id}-t`, x + 22, y + 26, isi, u, W.putih, { z: 3 }),
];

/* ------------------------------ Montessori Cards: konsep ------------------------------ */
const SUARA_K1 = "Cara kedua, Montessori Cards, atau Kartu Angka Montessori.";
const SUARA_K2 = "Kartu seratus ditumpuk menutup kartu sepuluh, dan kartu sepuluh menutup kartu satu.";
const SUARA_K3 = "Pada bilangan, kartu angka menempel pada kartu tempatnya.";
const SUARA_K4 = "Dengan menumpuk, kita melihat bilangan tersusun dari tiga bagian.";

export const ADEGAN_LUAR_KARTU: AdeganStory = {
  id: "luar-kartu",
  judul: "Montessori Cards: Kartu Angka Montessori",
  sumber: "Metode global: Montessori Cards (konsep)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_K1,
      bersih(0),
      tambah(0, judul("Cara Kedua"), ...tokoDepan("dn")),
      tambah("kedua,", ...kartu("nm", 50, 44, 200, 28, W.krem, ["Montessori Cards"], 13)),
      tambah("Montessori", teks("nid", 150, 100, "Kartu Angka Montessori", 11, W.ungu, { z: 2 })),
      tambah("Kartu", ...kartuAngka("c0", 90, 118, "100", "r", 34, 34, 11), ...kartuAngka("c1", 132, 118, "10", "p", 34, 34, 12)),
      tambah("Montessori@2", ...kartuAngka("c2", 174, 118, "1", "s", 34, 34, 14)),
    ),
    k(
      SUARA_K2,
      bersih(0),
      tambah(0, judul("Kartu Bertumpuk"), ...tokoDepan("dn")),
      tambah("seratus", ...tumpukan("t0", 40, 52, 120, "100", W.kr)),
      tambah("menutup", ...tumpukan("t1", 100, 62, 100, "10", W.kp, 16)),
      tambah("sepuluh,", panah("pa", 150, 108, 0, 12, W.ungu, 2.4)),
      tambah("menutup@2", ...tumpukan("t2", 160, 72, 76, "1", W.ks, 16)),
      tambah("satu.", emo("ok", 262, 108, E.benar, 20)),
    ),
    k(
      SUARA_K3,
      bersih(0),
      tambah(0, judul("Kartu Menempel"), ...tokoDepan("dn")),
      tambah("bilangan,", ...kotakTempat("p0", 40, 118, 72, 22, "Ratusan", "r", 9), ...kotakTempat("p1", 114, 118, 72, 22, "Puluhan", "p", 9), ...kotakTempat("p2", 188, 118, 72, 22, "Satuan", "s", 9)),
      tambah("kartu", ...kartuLepas("a0", 58, 54, "3", 36, 48, 30), ...kartuLepas("a1", 132, 54, "4", 36, 48, 30), ...kartuLepas("a2", 206, 54, "6", 36, 48, 30)),
      tambah("menempel", panah("q0", 76, 104, 0, 12, W.kr, 2.2), panah("q1", 150, 104, 0, 12, W.kp, 2.2), panah("q2", 224, 104, 0, 12, W.ks, 2.2)),
      tambah("tempatnya.", emo("ok", 150, 166, E.benar, 22)),
    ),
    k(
      SUARA_K4,
      bersih(0),
      tambah(0, judul("Tiga Bagian"), ...tokoDepan("dn")),
      tambah("menumpuk,", ...labelHarga("lb", 100, 52, 100, 40, "346", 26)),
      tambah("bilangan", ...kotakTempat("p0", 40, 112, 72, 22, "Ratusan", "r", 9), ...kotakTempat("p1", 114, 112, 72, 22, "Puluhan", "p", 9), ...kotakTempat("p2", 188, 112, 72, 22, "Satuan", "s", 9)),
      tambah("tiga", teks("n3", 150, 152, "3 bagian", 12, W.ungu, { z: 3 })),
      tambah("bagian.", emo("ok", 218, 150, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ Montessori Cards: terapan ------------------------------ */
const SUARA_P1 = "Bima menumpuk kartu tujuh ratus, lima puluh, dan tiga menjadi satu kartu tujuh ratus lima puluh tiga.";
const SUARA_P2 = "Lalu ia melepasnya lagi, dan tiga kartu muncul kembali.";
const SUARA_P3 = "Cocok untuk belajar menyusun dan memisahkan bilangan dengan tangan.";
const SUARA_P4 = "Kurang cocok kalau tidak ada kartu, karena harus menggambar atau menulis.";

export const ADEGAN_LUAR_KARTU_TERAPAN: AdeganStory = {
  id: "luar-kartu-terapan",
  judul: "Montessori Cards dipakai pada 753",
  sumber: "Metode global: Montessori Cards (terapan)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_P1,
      bersih(0),
      tambah(0, judul("Kartu Ditumpuk"), ...tokoDepan("dn"), ...tokoh("bm", 262, 172, "Bima")),
      tambah("ratus,", ...kartuAngka("c0", 24, 60, "700", "r", 44, 36, 13)),
      tambah("puluh,", ...kartuAngka("c1", 76, 60, "50", "p", 36, 36, 13)),
      tambah("tiga", ...kartuAngka("c2", 120, 60, "3", "s", 28, 36, 13)),
      tambah("satu", panah("pn", 160, 78, 28, 0, W.ungu, 2.6), teks("s1", 218, 56, "1 kartu", 10, W.ungu, { z: 2 })),
      tambah("tiga@2", ...labelHarga("lb", 200, 66, 76, 36, "753", 22)),
    ),
    k(
      SUARA_P2,
      hapus(0, "lb", "lb-t", "pn", "s1"),
      tambah("melepasnya", emo("tg", 232, 88, "\u{270B}", 22)),
      tambah("tiga", teks("n3", 250, 60, "3 kartu", 10, W.ungu, { z: 2 })),
      tambah("kembali.", emo("ok", 218, 128, E.benar, 20)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Cocok Dipakai"), ...tokoDepan("dn")),
      tambah("Cocok", ...kartuCocok("cc", 56, ["Cocok untuk menyusun", "dan memisahkan bilangan"])),
      tambah("menyusun", emo("tg", 90, 132, "\u{270B}", 26), ...kartuAngka("a0", 120, 112, "3", "r", 24, 30, 13)),
      tambah("memisahkan", ...kartuAngka("a1", 154, 112, "4", "p", 24, 30, 13), ...kartuAngka("a2", 188, 112, "6", "s", 24, 30, 13)),
      tambah("tangan.", emo("ok2", 240, 134, E.benar, 22)),
    ),
    k(
      SUARA_P4,
      hapus(0, "tg", "a0", "a0-t", "a1", "a1-t", "a2", "a2-t", "ok2"),
      tambah("Kurang", ...kartuKurang("kc", 100, ["Kurang cocok bila", "tidak ada kartu"])),
      tambah("kartu,", emo("no", 60, 162, E.salah, 22)),
      tambah("menggambar", emo("pe", 140, 164, "\u{270F}\u{FE0F}", 22)),
      tambah("menulis.", emo("ct", 214, 164, E.catat, 22)),
    ),
  ],
};

/* ------------------------------ Expanded Form: konsep ------------------------------ */
const SUARA_U1 = "Cara ketiga, Expanded Form, atau Bentuk Uraian.";
const SUARA_U2 = "Bilangan ditulis sebagai jumlah ratusan, puluhan, dan satuannya.";
const SUARA_U3 = "Bentuk uraian bilangan delapan ratus tiga puluh enam adalah delapan ratus ditambah tiga puluh ditambah enam.";
const SUARA_U4 = "Nol tetap dituliskan bila tempatnya kosong.";

export const ADEGAN_LUAR_URAIAN: AdeganStory = {
  id: "luar-uraian",
  judul: "Expanded Form: Bentuk Uraian",
  sumber: "Metode global: Expanded Form (konsep)",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_U1,
      bersih(0),
      tambah(0, judul("Cara Ketiga"), ...tokoDepan("dn")),
      tambah("ketiga,", ...kartu("nm", 50, 44, 200, 28, W.krem, ["Expanded Form"], 13)),
      tambah("Expanded", teks("nid", 150, 104, "Bentuk Uraian", 12, W.ungu, { z: 2 })),
      tambah("Bentuk", emo("ic", 150, 152, E.catat, 34)),
      tambah("Uraian.", emo("kl", 210, 150, E.kilau, 20)),
    ),
    k(
      SUARA_U2,
      bersih(0),
      tambah(0, judul("Jumlah Tiga Bagian"), ...tokoDepan("dn"), ...labelHarga("lb", 100, 44, 100, 36, "246", 22)),
      tambah("jumlah", teks("p1", 116, 118, "+", 16, W.biru, { z: 3 }), teks("p2", 186, 118, "+", 16, W.biru, { z: 3 })),
      tambah("ratusan,", ...kotakTempat("p0", 40, 100, 66, 30, "Ratusan", "r", 9)),
      tambah("puluhan,", ...kotakTempat("p1b", 124, 100, 66, 30, "Puluhan", "p", 9)),
      tambah("satuannya.", ...kotakTempat("p2b", 208, 100, 66, 30, "Satuan", "s", 9)),
    ),
    k(
      SUARA_U3,
      bersih(0),
      tambah(0, judul("Menguraikan Bilangan"), ...tokoDepan("dn")),
      tambah("bilangan", ...labelHarga("lb", 100, 44, 100, 40, "836", 26)),
      tambah(10, teks("e0", 56, 128, "800", 16, WARNA_TULIS.r, { z: 3 })),
      tambah(13, teks("p1", 92, 128, "+", 16, W.biru, { z: 3 }), teks("e1", 124, 128, "30", 16, WARNA_TULIS.p, { z: 3 })),
      tambah("enam.", teks("p2", 158, 128, "+", 16, W.biru, { z: 3 }), teks("e2", 184, 128, "6", 16, WARNA_TULIS.s, { z: 3 })),
    ),
    k(
      SUARA_U4,
      bersih(0),
      tambah(0, judul("Nol Tetap Ditulis"), ...tokoDepan("dn"), ...labelHarga("lb", 100, 44, 100, 36, "705", 22)),
      tambah("Nol", angka("z", 150, 116, "0", "p", 40)),
      tambah("dituliskan", teks("e0", 56, 150, "700", 14, WARNA_TULIS.r, { z: 3 }), teks("p1", 92, 150, "+", 14, W.biru, { z: 3 }), teks("e1", 116, 150, "0", 14, WARNA_TULIS.p, { z: 3 }), teks("p2", 140, 150, "+", 14, W.biru, { z: 3 }), teks("e2", 164, 150, "5", 14, WARNA_TULIS.s, { z: 3 })),
      tambah("kosong.", kotak("ks", 130, 92, 40, 32, W.krem, W.merah, { rx: 4, tebal: 2, putus: true, z: 1 })),
    ),
  ],
};

/* ------------------------------ Expanded Form: terapan ------------------------------ */
const SUARA_V1 = "Salsa menguraikan sembilan ratus lima: sembilan ratus ditambah nol ditambah lima.";
const SUARA_V2 = "Lalu ia menjumlahkan lagi dan kembali ke sembilan ratus lima.";
const SUARA_V3 = "Cocok untuk memeriksa apakah sebuah bilangan sudah disusun benar.";
const SUARA_V4 = "Kurang cocok untuk membaca bilangan cepat, karena menulisnya panjang.";

export const ADEGAN_LUAR_URAIAN_TERAPAN: AdeganStory = {
  id: "luar-uraian-terapan",
  judul: "Expanded Form dipakai pada 905",
  sumber: "Metode global: Expanded Form (terapan)",
  latar: "#EEF2FF",
  ketukan: [
    k(
      SUARA_V1,
      bersih(0),
      tambah(0, judul("Menguraikan 905"), ...tokoDepan("dn"), ...tokoh("sl", 44, 172, "Salsa")),
      tambah("lima:", ...labelHarga("lb", 100, 44, 100, 40, "905", 26)),
      tambah("ratus@2", teks("e0", 80, 128, "900", 16, WARNA_TULIS.r, { z: 3 })),
      tambah("nol", teks("p1", 116, 128, "+", 16, W.biru, { z: 3 }), teks("e1", 140, 128, "0", 16, WARNA_TULIS.p, { z: 3 })),
      tambah("lima@2", teks("p2", 168, 128, "+", 16, W.biru, { z: 3 }), teks("e2", 192, 128, "5", 16, WARNA_TULIS.s, { z: 3 })),
    ),
    k(
      SUARA_V2,
      bersih(0),
      tambah(0, judul("Dijumlahkan Lagi"), ...tokoDepan("dn"), ...tokoh("sl", 44, 172, "Salsa")),
      tambah("menjumlahkan", teks("e0", 80, 70, "900", 16, WARNA_TULIS.r, { z: 3 }), teks("p1", 116, 70, "+", 16, W.biru, { z: 3 }), teks("e1", 140, 70, "0", 16, WARNA_TULIS.p, { z: 3 }), teks("p2", 168, 70, "+", 16, W.biru, { z: 3 }), teks("e2", 192, 70, "5", 16, WARNA_TULIS.s, { z: 3 })),
      tambah("kembali", panah("pn", 150, 84, 0, 16, W.ungu, 2.6)),
      tambah("lima.", ...labelHarga("lb", 100, 104, 100, 40, "905", 26), emo("ok", 222, 126, E.benar, 20)),
    ),
    k(
      SUARA_V3,
      bersih(0),
      tambah(0, judul("Cocok Dipakai"), ...tokoDepan("dn")),
      tambah("Cocok", ...kartuCocok("cc", 56, ["Cocok untuk memeriksa", "susunan bilangan"])),
      tambah("memeriksa", emo("kc", 150, 140, E.kaca, 28)),
      tambah("benar.", emo("ok2", 210, 140, E.benar, 24)),
    ),
    k(
      SUARA_V4,
      tambah("Kurang", ...kartuKurang("kc", 100, ["Kurang cocok untuk", "membaca cepat"])),
      tambah("cepat,", emo("cp", 80, 164, "\u{23E9}", 22)),
      tambah("panjang.", teks("pj", 196, 160, "900 + 0 + 5", 12, W.biru, { z: 2 })),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita lihat. Mana yang pas tergantung kebutuhan.";
const SUARA_R2 = "Ingin tahu jumlah satu angka, pakai Tempat Angka. Ingin menyusun dengan tangan, pakai Kartu Angka Montessori.";
const SUARA_R3 = "Ingin memeriksa susunan bilangan, pakai Bentuk Uraian. Apa pun caranya, tempat menentukan jumlah.";
const SUARA_R4 = "Menurutmu, untuk membuat label harga tiga angka, cara mana yang kamu pilih?";
const BARIS_Y = [46, 82, 118];

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Ringkasan: memilih cara yang pas",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_R1,
      bersih(0),
      tambah(0, judul("Tiga Cara"), ...tokoDepan("dn")),
      tambah("Tiga", teks("n3", 252, 52, "3 cara", 10, W.ungu, { z: 2 })),
      tambah("sudah", teks("r0", 120, 70, "1. Tempat Angka", 13, W.biru, { z: 2 }), teks("r1", 120, 110, "2. Kartu Angka Montessori", 13, W.biru, { z: 2 }), teks("r2", 120, 150, "3. Bentuk Uraian", 13, W.biru, { z: 2 })),
      tambah("Mana", emo("tz", 262, 112, E.tanya, 26)),
      tambah("kebutuhan.", emo("kl", 262, 150, E.kilau, 20)),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, judul("Pilih yang Pas"), ...tokoDepan("dn")),
      tambah("jumlah", ...kartu("a0", 14, BARIS_Y[0], 122, 30, W.krem, ["jumlah 1 angka"], 9, { z: 1 })),
      tambah("Tempat", ...kartu("b0", 148, BARIS_Y[0], 138, 30, W.hijauMuda, ["Tempat Angka"], 10, { z: 1 })),
      tambah("menyusun", ...kartu("a1", 14, BARIS_Y[1], 122, 30, W.krem, ["menyusun dengan tangan"], 7.6, { z: 1 })),
      tambah("Kartu", ...kartu("b1", 148, BARIS_Y[1], 138, 30, W.hijauMuda, ["Kartu Angka Montessori"], 8.6, { z: 1 })),
    ),
    k(
      SUARA_R3,
      tambah("memeriksa", ...kartu("a2", 14, BARIS_Y[2], 122, 30, W.krem, ["memeriksa susunan"], 9, { z: 1 })),
      tambah("Bentuk", ...kartu("b2", 148, BARIS_Y[2], 138, 30, W.hijauMuda, ["Bentuk Uraian"], 10, { z: 1 })),
      tambah("tempat", ...kartu("sm", 40, 160, 220, 26, W.lavender, ["tempat menentukan jumlah"], 9.5, { z: 1 })),
      tambah("jumlah.", emo("kl", 276, 174, E.kilau, 20)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Pilihanmu"), ...tokoDepan("dn")),
      tambah("label", ...labelHarga("lb", 100, 44, 100, 40, "_ _ _", 22)),
      tambah("tiga", teks("n3", 150, 100, "3 angka", 10, W.ungu, { z: 2 })),
      tambah("cara", ...kotakTempat("o0", 22, 122, 80, 28, "Tempat Angka", "r", 8.4), ...kotakTempat("o1", 110, 122, 80, 28, "Kartu Montessori", "p", 7.6), ...kotakTempat("o2", 198, 122, 80, 28, "Bentuk Uraian", "s", 8.4)),
      tambah("pilih?", emo("qq", 150, 168, E.tanya, 28)),
    ),
  ],
};
