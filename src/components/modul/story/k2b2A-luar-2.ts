import type { AdeganStory } from "./logika-story";
import { E, W, bulat, busur, emo, jalurBilangan, judul, kardus, kartu, lantai, panah, teks, tokoh } from "./k2b2A-gambar";
import { bersih, hapus, idx, k, sorotkan, tambah, ubah } from "./k2b2A-bantu";

/*
 * Cerita orisinal IGIL "Kiriman dari Gudang" (Kelas 2 Bab 2 Sub-Bab A), video metode global.
 * Naskah suara dari naskah/story-naskah-k2b2a.md. Bagian ini: Doubles Plus One (Kembar Tambah Satu), Round and Adjust (Bulatkan Lalu Sesuaikan), terapannya, dan ringkasan.
 */

const HIJAU = "#15803D";

/* ------------------------------ Doubles Plus One: konsep ------------------------------ */
const SUARA_K1 = "Cara kedua, Doubles Plus One, atau Kembar Tambah Satu.";
const SUARA_K2 = "Bilangan kembar adalah bilangan yang ditambah dirinya sendiri, seperti enam ditambah enam sama dengan dua belas.";
const SUARA_K3 = "Kalau dua bilangan hanya berbeda satu, ambil kembarnya lalu tambah satu.";
const SUARA_K4 = "Kembar kecil mudah diingat, jadi cara ini cepat sekali.";

export const ADEGAN_LUAR_KEMBAR: AdeganStory = {
  id: "luar-kembar",
  judul: "Doubles Plus One: Kembar Tambah Satu",
  sumber: "Metode global: Doubles Plus One (konsep)",
  latar: "#FDF4FF",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Cara 2: Doubles Plus One"), lantai("lt", 168)),
      tambah("Doubles", ...kardus("kd1", 50, 80, 80, 50), ...kardus("kd2", 170, 80, 80, 50)),
      tambah("Kembar", teks("kb", 150, 62, "kembar", 12, W.ungu), teks("sm", 150, 112, "=", 24, W.merah)),
      sorotkan("Tambah", "kd1", "kd2"),
      tambah("Satu.", teks("p1", 150, 154, "+1", 20, W.merah)),
    ),
    k(
      SUARA_K2,
      hapus(0, "p1", "kb"),
      ubah("kembar", { id: "kd1", sorot: false }, { id: "kd2", sorot: false }),
      sorotkan("ditambah", "kd1", "kd2"),
      tambah("enam", teks("s1", 90, 113, "6", 24, W.biru)),
      ubah(idx(SUARA_K2, "ditambah", 2), { id: "sm", isi: "+" }),
      tambah(idx(SUARA_K2, "enam", 2), teks("s2", 210, 113, "6", 24, W.biru)),
      tambah(14, teks("fe", 150, 154, "6 + 6 = 12", 18, HIJAU)),
    ),
    k(
      SUARA_K3,
      bersih(0),
      tambah(0, judul("Beda Satu"), lantai("lt", 168)),
      tambah("dua", teks("b2", 150, 44, "2 bilangan", 12, W.ungu)),
      tambah("bilangan", ...kartu("c7", 60, 56, 50, 34, W.hijauMuda, ["7"], 20), ...kartu("c8", 190, 56, 50, 34, W.langit, ["8"], 20)),
      tambah("berbeda", teks("bd", 150, 78, "beda 1", 10, W.merah)),
      tambah("kembarnya", teks("kk", 150, 118, "kembar: 7 + 7", 12, W.biru)),
      tambah("tambah", teks("t1", 150, 150, "+ 1", 18, W.merah)),
    ),
    k(
      SUARA_K4,
      bersih(0),
      tambah(0, judul("Kembar Kecil"), lantai("lt", 168)),
      tambah("Kembar", teks("d2", 150, 52, "2 + 2 = 4", 14, W.biru)),
      tambah("kecil", teks("d3", 150, 76, "3 + 3 = 6", 14, W.biru)),
      tambah("mudah", teks("d4", 150, 100, "4 + 4 = 8", 14, W.biru)),
      tambah("diingat,", teks("d5", 150, 124, "5 + 5 = 10", 14, W.biru)),
      tambah("cepat", emo("pt", 240, 90, E.petir, 30)),
    ),
  ],
};

/* ------------------------------ Doubles Plus One: terapan ------------------------------ */
const SUARA_KT1 = "Dika menjumlahkan tujuh topi dan delapan topi. Tujuh ditambah tujuh sama dengan empat belas.";
const SUARA_KT2 = "Delapan lebih besar satu dari tujuh, jadi hasilnya empat belas ditambah satu, yaitu lima belas.";
const SUARA_KT3 = "Cocok kalau kedua bilangan hampir sama besar.";
const SUARA_KT4 = "Kurang cocok kalau bilangannya berjauhan, seperti tiga ditambah dua belas.";

const xt = (i: number): number => 48 + i * 24;

export const ADEGAN_LUAR_KEMBAR_TERAPAN: AdeganStory = {
  id: "luar-kembar-terapan",
  judul: "Doubles Plus One: tujuh tambah delapan",
  sumber: "Metode global: Doubles Plus One (terapan)",
  latar: "#FAF5FF",
  ketukan: [
    k(
      SUARA_KT1,
      tambah(0, judul("Tujuh Topi dan Delapan Topi"), lantai("lt", 168), ...tokoh("dk", 30, 178, "Dika")),
      tambah("tujuh", ...Array.from({ length: 7 }, (_, i) => emo(`a${i}`, xt(i), 60, E.topi, 18)), teks("la", 22, 64, "7", 14, W.biru)),
      tambah("delapan", ...Array.from({ length: 8 }, (_, i) => emo(`b${i}`, xt(i), 92, E.topi, 18)), teks("lb", 22, 96, "8", 14, W.biru)),
      sorotkan(idx(SUARA_KT1, "tujuh", 2), ...Array.from({ length: 7 }, (_, i) => `a${i}`)),
      tambah(idx(SUARA_KT1, "tujuh", 2), teks("e1", 100, 130, "7", 16, W.biru)),
      tambah("ditambah", teks("e2", 118, 130, "+", 16, W.merah)),
      tambah(idx(SUARA_KT1, "tujuh", 3), teks("e3", 136, 130, "7", 16, W.biru)),
      tambah("sama", teks("e4", 156, 130, "=", 16, W.merah)),
      tambah("empat", teks("e5", 182, 130, "14", 16, HIJAU)),
    ),
    k(
      SUARA_KT2,
      hapus(0, "e1", "e2", "e3", "e4", "e5"),
      ubah(0, ...Array.from({ length: 7 }, (_, i) => ({ id: `a${i}`, sorot: false })), { id: "b7", sorot: true }),
      tambah("satu", teks("d1", 150, 126, "8 = 7 + 1", 14, W.ungu)),
      tambah("empat", teks("f1", 96, 154, "14", 16, W.biru)),
      tambah("ditambah", teks("f2", 118, 154, "+", 16, W.merah)),
      tambah(idx(SUARA_KT2, "satu", 2), teks("f3", 136, 154, "1", 16, W.biru)),
      tambah("yaitu", teks("f4", 156, 154, "=", 16, W.merah)),
      tambah("lima", teks("f5", 182, 154, "15", 16, HIJAU)),
    ),
    k(
      SUARA_KT3,
      bersih(0),
      tambah(0, judul("Cocok"), lantai("lt", 168), emo("ok", 150, 66, E.benar, 30)),
      tambah("kedua", ...kartu("c7", 80, 86, 44, 34, W.hijauMuda, ["7"], 20), ...kartu("c8", 176, 86, 44, 34, W.langit, ["8"], 20)),
      tambah("hampir", teks("hs", 150, 150, "hampir sama", 14, W.ungu)),
      sorotkan("besar.", "c7-k", "c8-k"),
    ),
    k(
      SUARA_KT4,
      bersih(0),
      tambah(0, judul("Kurang Cocok"), lantai("lt", 168), emo("xs", 150, 66, E.salah, 30)),
      tambah("berjauhan,", teks("jh", 150, 156, "berjauhan", 12, W.merah)),
      tambah("tiga", ...kartu("c3", 40, 90, 44, 34, W.hijauMuda, ["3"], 20)),
      tambah("ditambah", teks("pl", 150, 114, "+", 22, W.merah)),
      tambah("dua", ...kartu("c12", 216, 90, 44, 34, W.langit, ["12"], 18)),
    ),
  ],
};

/* ------------------------------ Round and Adjust: konsep ------------------------------ */
const SUARA_B1 = "Cara ketiga, Round and Adjust, atau Bulatkan Lalu Sesuaikan.";
const SUARA_B2 = "Bulatkan salah satu bilangan ke sepuluh terdekat, lalu jumlahkan.";
const SUARA_B3 = "Setelah itu sesuaikan, yaitu kurangi sebanyak yang tadi ditambahkan.";
const SUARA_B4 = "Hasilnya tetap sama, jadi tidak ada yang terlewat.";

export const ADEGAN_LUAR_BULAT: AdeganStory = {
  id: "luar-bulat",
  judul: "Round and Adjust: Bulatkan Lalu Sesuaikan",
  sumber: "Metode global: Round and Adjust (konsep)",
  latar: "#F0FDFA",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Cara 3: Round and Adjust"), lantai("lt", 168)),
      tambah("Round", ...kartu("bl", 30, 66, 100, 36, W.hijauMuda, ["Round = bulatkan"], 9)),
      tambah("Adjust,", ...kartu("sy", 170, 66, 100, 36, W.pink, ["Adjust = sesuaikan"], 9)),
      tambah("Bulatkan", panah("pa", 134, 84, 166, 84, W.merah)),
      tambah("Sesuaikan.", emo("kc", 150, 136, "\u{1F527}", 28)),
    ),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, judul("Bulatkan ke Sepuluh"), lantai("lt", 168), ...jalurBilangan("jl", 60, 110, 5, 45)),
      tambah("salah", teks("sb", 150, 52, "1 bilangan: 9", 12, W.ungu)),
      tambah("bilangan", teks("v8", 60, 144, "8", 12, W.biru), teks("v9", 105, 144, "9", 12, W.biru), teks("v11", 195, 144, "11", 12, W.biru), teks("v12", 240, 144, "12", 12, W.biru)),
      tambah("sepuluh", teks("v10", 150, 144, "10", 12, W.merah), busur("bs", 105, 108, 45, 22), bulat("mk", 150, 96, 6, W.merah, W.biru, { tebal: 1.4, z: 3 })),
      sorotkan("terdekat,", "v10", "mk"),
      tambah("jumlahkan.", teks("st", 150, 80, "10 + ?", 16, W.ungu)),
    ),
    k(
      SUARA_B3,
      hapus(0, "st"),
      tambah("sesuaikan,", teks("sk", 150, 38, "sesuaikan", 12, W.ungu)),
      tambah("kurangi", panah("pb", 150, 122, 105, 122, W.merah)),
      tambah("sebanyak", teks("mn", 127, 138, "-1", 12, W.merah)),
      tambah("tadi", teks("td", 127, 80, "tadi: +1", 10, W.coklat)),
      sorotkan("ditambahkan.", "bs"),
    ),
    k(
      SUARA_B4,
      bersih(0),
      tambah(0, judul("Hasil Tetap Sama"), lantai("lt", 168)),
      tambah("Hasilnya", ...kartu("ca", 20, 50, 110, 34, W.langit, ["cara biasa"], 9)),
      tambah("tetap", ...kartu("cb", 170, 50, 110, 34, W.hijauMuda, ["bulat lalu sesuaikan"], 8.6)),
      tambah("sama,", teks("n1", 75, 116, "16", 24, HIJAU), teks("n2", 225, 116, "16", 24, HIJAU), teks("sm", 150, 116, "=", 26, W.merah)),
      tambah("terlewat.", emo("ok", 150, 150, E.benar, 28)),
    ),
  ],
};

/* ------------------------------ Round and Adjust: terapan ------------------------------ */
const SUARA_BT1 = "Nia menjumlahkan sembilan dan tujuh. Sembilan dibulatkan menjadi sepuluh, lalu sepuluh ditambah tujuh sama dengan tujuh belas.";
const SUARA_BT2 = "Karena tadi sembilan ditambah satu, kurangi satu. Hasilnya enam belas.";
const SUARA_BT3 = "Cocok kalau salah satu bilangan sangat dekat dengan sepuluh.";
const SUARA_BT4 = "Kurang cocok kalau bilangannya jauh dari sepuluh, karena penyesuaiannya jadi banyak.";

export const ADEGAN_LUAR_BULAT_TERAPAN: AdeganStory = {
  id: "luar-bulat-terapan",
  judul: "Round and Adjust: sembilan tambah tujuh",
  sumber: "Metode global: Round and Adjust (terapan)",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_BT1,
      tambah(0, judul("Sembilan Tambah Tujuh"), lantai("lt", 168)),
      tambah("Nia", ...tokoh("ni", 30, 178, "Nia")),
      tambah("sembilan", teks("x9", 126, 56, "9", 22, W.biru)),
      tambah("dan", teks("xp", 150, 56, "+", 22, W.merah)),
      tambah(idx(SUARA_BT1, "tujuh"), teks("x7", 174, 56, "7", 22, W.biru)),
      tambah("dibulatkan", ...kartu("bl", 100, 72, 100, 24, W.hijauMuda, ["9 jadi 10"], 10)),
      sorotkan(idx(SUARA_BT1, "sepuluh"), "bl-k"),
      tambah(idx(SUARA_BT1, "sepuluh", 2), teks("ee", 150, 128, "10 + 7", 18, W.ungu)),
      ubah(idx(SUARA_BT1, "tujuh", 3), { id: "ee", isi: "10 + 7 = 17", warna: HIJAU }),
    ),
    k(
      SUARA_BT2,
      bersih(0),
      tambah(0, judul("Sesuaikan Lagi"), lantai("lt", 168), ...tokoh("ni", 30, 178, "Nia")),
      tambah("sembilan", teks("r1", 150, 56, "9 + 1", 18, W.biru)),
      ubah(idx(SUARA_BT2, "satu"), { id: "r1", isi: "9 + 1 = 10" }),
      tambah("kurangi", teks("r2", 150, 100, "17 - 1", 18, W.merah)),
      ubah("enam", { id: "r2", isi: "17 - 1 = 16", warna: HIJAU }),
      tambah("belas.", emo("ok", 150, 140, E.benar, 28)),
    ),
    k(
      SUARA_BT3,
      bersih(0),
      tambah(0, judul("Cocok"), lantai("lt", 168), emo("ok", 150, 62, E.benar, 30)),
      tambah("satu", teks("sb", 150, 94, "1 bilangan", 11, W.ungu)),
      tambah("sangat", ...kartu("c9", 80, 108, 44, 34, W.hijauMuda, ["9"], 20)),
      tambah("dekat", panah("pn", 128, 126, 172, 126, W.merah)),
      tambah("sepuluh.", ...kartu("c10", 176, 108, 44, 34, W.langit, ["10"], 20)),
    ),
    k(
      SUARA_BT4,
      bersih(0),
      tambah(0, judul("Kurang Cocok"), lantai("lt", 168), emo("xs", 150, 62, E.salah, 30), ...jalurBilangan("jl", 50, 120, 7, 32)),
      tambah("jauh", teks("v4", 50, 144, "4", 12, W.biru)),
      tambah("sepuluh,", teks("v10", 242, 144, "10", 12, W.merah), busur("bs", 50, 118, 192, 36)),
      tambah("penyesuaiannya", teks("pl", 146, 92, "+6", 14, W.merah)),
      tambah("banyak.", teks("bk", 150, 160, "terlalu banyak langkah", 11, W.coklat)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Kita sudah melihat tiga cara. Mana yang pas? Itu tergantung bilangannya.";
const SUARA_R2 = "Salah satu hampir sepuluh, pakai Membuat Sepuluh atau Bulatkan Lalu Sesuaikan. Kedua bilangan hampir sama, pakai Kembar Tambah Satu.";
const SUARA_R3 = "Apa pun caranya, periksa lagi hasilnya supaya tidak ada yang keliru.";
const SUARA_R4 = "Menurutmu, untuk delapan ditambah sembilan, kamu pilih cara yang mana?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Metode global: ringkasan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tiga Cara"), ...kartu("r0", 14, 34, 272, 26, W.hijauMuda, ["1. Membuat Sepuluh"], 11)),
      tambah("tiga", teks("t3", 150, 150, "3 cara", 12, W.ungu)),
      tambah("Mana", ...kartu("r1", 14, 70, 272, 26, W.pink, ["2. Kembar Tambah Satu"], 11)),
      tambah("tergantung", ...kartu("r2", 14, 106, 272, 26, W.langit, ["3. Bulatkan Lalu Sesuaikan"], 11)),
      tambah("bilangannya.", emo("qq", 150, 180, E.tanya, 26)),
    ),
    k(
      SUARA_R2,
      bersih(0),
      tambah(0, judul("Pilih yang Pas")),
      tambah("Salah", ...kartu("p0", 14, 32, 272, 28, W.krem, ["1 bilangan hampir 10"], 11)),
      tambah("Membuat", ...kartu("a0", 14, 66, 130, 26, W.hijauMuda, ["Membuat Sepuluh"], 9)),
      tambah("Bulatkan", ...kartu("a1", 150, 66, 136, 26, W.langit, ["Bulatkan Lalu Sesuaikan"], 8.6)),
      tambah("Kedua", ...kartu("p1", 14, 108, 272, 28, W.krem, ["2 bilangan hampir sama"], 11)),
      tambah("Kembar", ...kartu("a2", 14, 142, 272, 26, W.pink, ["Kembar Tambah Satu"], 10)),
    ),
    k(
      SUARA_R3,
      bersih(0),
      tambah(0, judul("Periksa Lagi"), lantai("lt", 168)),
      tambah("Apa", ...tokoh("dk", 60, 178, "Dika")),
      tambah("periksa", emo("kc", 150, 96, "\u{1F50D}", 40)),
      tambah("hasilnya", teks("ch", 150, 140, "cek hasilnya", 13, W.ungu)),
      tambah("keliru.", emo("ok", 240, 96, E.benar, 30)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Pilih Caramu"), lantai("lt", 168)),
      tambah("delapan", teks("q8", 100, 62, "8", 26, W.biru)),
      tambah("ditambah", teks("qp", 130, 62, "+", 26, W.merah)),
      tambah("sembilan,", teks("q9", 160, 62, "9", 26, W.biru)),
      tambah("pilih", teks("qs", 190, 62, "=", 26, W.merah), teks("qq", 220, 62, "?", 26, W.merah)),
      tambah("cara", ...kartu("o0", 8, 92, 92, 34, W.hijauMuda, ["Membuat", "Sepuluh"], 9), ...kartu("o1", 104, 92, 92, 34, W.pink, ["Kembar", "Tambah Satu"], 9), ...kartu("o2", 200, 92, 92, 34, W.langit, ["Bulatkan Lalu", "Sesuaikan"], 9)),
      tambah("mana?", emo("sm", 150, 160, E.pikir, 30)),
    ),
  ],
};
