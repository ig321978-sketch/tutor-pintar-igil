import type { AdeganStory, Obj } from "./logika-story";
import { E, W, busurMundur, emo, garisBilangan, judul, kartu, panah, poligon, teks, tokoLatar, tokoh, bulat } from "./k3b1G-gambar";
import { bersih, hapus, k, sorotkan, tambah, ubah } from "./k3b1G-bantu";

/*
 * Cerita orisinal IGIL "Pesta Hari Jadi Toko" (Kelas 3 Bab 1 Sub-Bab G), video metode global.
 * Naskah suara dari naskah/story-naskah-k3b1g.md. Bagian ini: Repeated Subtraction (Kurang Berulang), Fact Family (Keluarga Fakta), terapannya, dan ringkasan.
 */

/* ------------------------------ Repeated Subtraction: konsep ------------------------------ */
const SUARA_K1 = "Cara kedua, Repeated Subtraction, atau Kurang Berulang.";
const SUARA_K2 = "Kurangi bilangan yang dibagi dengan pembagi berulang-ulang.";
const SUARA_K3 = "Berhenti saat hasilnya sudah nol.";
const SUARA_K4 = "Banyak pengurangan sama dengan hasil bagi.";

export const ADEGAN_LUAR_KURANG: AdeganStory = {
  id: "luar-kurang",
  judul: "Repeated Subtraction: Kurang Berulang",
  sumber: "Metode global: Repeated Subtraction (konsep)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_K1,
      bersih(0),
      tambah(0, judul("Cara Kedua"), ...tokoLatar("tk")),
      tambah("Repeated", ...kartu("nm", 40, 44, 220, 28, W.krem, ["Repeated Subtraction"], 12)),
      tambah("Kurang", teks("nid", 150, 104, "Kurang Berulang", 13, W.ungu)),
      tambah("Berulang.", emo("ic", 150, 158, "\u{2796}", 34)),
    ),
    k(
      SUARA_K2,
      bersih(0),
      tambah(0, judul("Kurangi Berulang"), ...tokoLatar("tk")),
      tambah("dibagi", ...kartu("dv", 16, 70, 76, 26, W.biruMuda, ["dibagi"], 10)),
      tambah("pembagi", ...kartu("pb0", 100, 70, 58, 26, W.hijauMuda, ["- pembagi"], 9)),
      tambah("berulang-ulang.", ...kartu("pb1", 164, 70, 58, 26, W.hijauMuda, ["- pembagi"], 9), ...kartu("pb2", 228, 70, 58, 26, W.hijauMuda, ["- pembagi"], 9), emo("ic", 150, 140, "\u{2796}", 30)),
    ),
    k(
      SUARA_K3,
      bersih(0),
      tambah(0, judul("Berhenti di Nol"), ...tokoLatar("tk"), emo("st", 150, 70, "\u{1F6D1}", 30)),
      tambah("hasilnya", ...kartu("hn", 80, 124, 140, 22, W.krem, ["hasil = nol"], 11)),
      tambah("nol.", teks("n0", 150, 104, "0", 36, W.merah)),
    ),
    k(
      SUARA_K4,
      bersih(0),
      tambah(0, judul("Banyak Kurang, Hasil Bagi"), ...tokoLatar("tk")),
      tambah("pengurangan", ...kartu("a", 20, 74, 110, 28, W.krem, ["banyak kurang"], 11)),
      tambah("sama", teks("sm", 150, 96, "=", 26, W.ungu)),
      tambah("hasil", ...kartu("b", 170, 74, 110, 28, W.hijauMuda, ["hasil bagi"], 11)),
      tambah("bagi.", emo("ok", 150, 150, E.benar, 30)),
    ),
  ],
};

/* ------------------------------ Repeated Subtraction: terapan ------------------------------ */
const X1 = 30;
const S1 = 12;
const Y1 = 116;
const xa = (v: number): number => X1 + v * S1;
const lab = (v: number): Obj => teks(`gl-l${v}`, xa(v), Y1 + 15, String(v), 9, W.biru);

const SUARA_R1 = "Raka membagi dua puluh dengan lima: dua puluh, lima belas, sepuluh, lima, nol.";
const SUARA_R2 = "Empat kali pengurangan, jadi hasil baginya empat. Cara ini mudah dihitung dan tidak perlu menghafal.";
const SUARA_R3 = "Cocok kalau pembagi cukup besar sehingga langkahnya sedikit.";
const SUARA_R4 = "Kurang cocok kalau pembagi kecil dan bilangan besar, karena langkahnya banyak.";
const titik = (x: number): Obj => bulat("pt", x, Y1, 4, W.merah, W.putih, { tebal: 1, z: 3 });

export const ADEGAN_LUAR_KURANG_TERAPAN: AdeganStory = {
  id: "luar-kurang-terapan",
  judul: "Raka membagi dua puluh dengan lima",
  sumber: "Metode global: Repeated Subtraction (terapan)",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_R1,
      bersih(0),
      tambah(0, judul("Dua Puluh Dibagi Lima"), ...tokoLatar("tk"), ...garisBilangan("gl", X1, Y1, S1, 20, 5, 9, [-1]), ...tokoh("rk", 36, 182, "Raka", 24, "Raka", 7)),
      tambah(2, lab(20), titik(xa(20))),
      tambah(5, teks("kk", 150, 62, "dikurangi 5 tiap lompatan", 9.5, W.coklat)),
      tambah(8, lab(15), busurMundur("gl", X1, Y1, S1, 20, 5)),
      ubah(8, { id: "pt", x: xa(15) }),
      tambah(10, lab(10), busurMundur("gl", X1, Y1, S1, 15, 5)),
      ubah(10, { id: "pt", x: xa(10) }),
      tambah(11, lab(5), busurMundur("gl", X1, Y1, S1, 10, 5)),
      ubah(11, { id: "pt", x: xa(5) }),
      tambah(12, lab(0), busurMundur("gl", X1, Y1, S1, 5, 5)),
      ubah(12, { id: "pt", x: xa(0) }),
    ),
    k(
      SUARA_R2,
      ubah(0, ...[20, 15, 10, 5].map((v) => ({ id: `gl-a${v}`, tebal: 2.6 }))),
      tambah("pengurangan,", teks("c4", 150, 86, "4 kali", 18, W.merah)),
      tambah("hasil", ...kartu("hs", 100, 150, 140, 20, W.krem, ["hasil bagi = 4"], 10)),
      tambah("mudah", emo("lp", 262, 100, E.lampu, 24)),
      tambah("menghafal.", emo("kl", 262, 172, E.kilau, 22)),
    ),
    k(
      SUARA_R3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...tokoLatar("tk"), ...kartu("cc", 90, 40, 120, 22, W.hijauMuda, ["Cocok"], 12)),
      tambah("pembagi", ...garisBilangan("gl", X1, Y1, S1, 20, 10, 9)),
      tambah("besar", busurMundur("gl", X1, Y1, S1, 20, 10, W.merah, 28)),
      tambah("langkahnya", busurMundur("gl", X1, Y1, S1, 10, 10, W.merah, 28)),
      tambah("sedikit.", teks("sd", 150, 160, "2 langkah saja", 12, W.hijau), emo("ok", 262, 150, E.benar, 22)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?"), ...tokoLatar("tk"), ...kartu("kc", 80, 40, 140, 22, W.merahMuda, ["Kurang cocok"], 12), ...garisBilangan("gl", 30, Y1, 8, 30, 2, 9, [0, 30])),
      tambah("kecil", teks("pk", 70, 90, "pembagi 2", 10, W.coklat)),
      tambah("besar,", teks("bb", 230, 90, "bilangan 30", 10, W.coklat)),
      tambah("langkahnya", ...Array.from({ length: 15 }, (_, q) => busurMundur("gl", 30, Y1, 8, 30 - q * 2, 2, W.merah, 8))),
      tambah("banyak.", teks("n15", 150, 160, "15 langkah", 12, W.merah), emo("jm", 262, 174, "\u{23F3}", 26)),
    ),
  ],
};

/* ------------------------------ Fact Family: konsep ------------------------------ */
const rumah = (): Obj => poligon("rm", [[150, 40], [100, 100], [200, 100]], W.krem, W.biru, { z: 1 });
const SUARA_F1 = "Cara ketiga, Fact Family, atau Keluarga Fakta.";
const SUARA_F2 = "Tiga bilangan yang sama membentuk dua perkalian dan dua pembagian.";
const SUARA_F3 = "Misalnya tiga, tujuh, dan dua puluh satu membentuk tiga kali tujuh, tujuh kali tiga, dua puluh satu dibagi tiga, dan dua puluh satu dibagi tujuh.";
const SUARA_F4 = "Kita bisa memakai perkalian untuk mencari hasil bagi.";

export const ADEGAN_LUAR_KELUARGA: AdeganStory = {
  id: "luar-keluarga",
  judul: "Fact Family: Keluarga Fakta",
  sumber: "Metode global: Fact Family (konsep)",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_F1,
      bersih(0),
      tambah(0, judul("Cara Ketiga"), ...tokoLatar("tk")),
      tambah("Fact", ...kartu("nm", 40, 44, 220, 28, W.krem, ["Fact Family"], 12)),
      tambah("Keluarga", teks("nid", 150, 104, "Keluarga Fakta", 13, W.ungu)),
      tambah("Fakta.", emo("ic", 150, 156, "\u{1F46A}", 34)),
    ),
    k(
      SUARA_F2,
      bersih(0),
      tambah(0, judul("Tiga Bilangan"), ...tokoLatar("tk"), rumah()),
      tambah("Tiga", teks("n3", 150, 128, "3 bilangan", 11, W.ungu), bulat("n0", 150, 42, 7, W.merah, W.biru, { z: 2 }), bulat("n1", 100, 100, 7, W.hijau, W.biru, { z: 2 }), bulat("n2", 200, 100, 7, W.ungu, W.biru, { z: 2 })),
      tambah("perkalian", teks("k2", 80, 158, "2 perkalian", 10, W.biru)),
      tambah("pembagian.", teks("p2", 220, 158, "2 pembagian", 10, W.hijau)),
    ),
    k(
      SUARA_F3,
      hapus(0, "n0", "n1", "n2", "n3", "k2", "p2"),
      tambah(1, teks("fb", 122, 94, "3", 14, W.biru, { z: 2 })),
      tambah(2, teks("fc", 178, 94, "7", 14, W.biru, { z: 2 })),
      tambah(4, teks("fa", 150, 72, "21", 18, W.merah, { z: 2 })),
      tambah(10, ...kartu("c0", 14, 112, 134, 20, W.biruMuda, ["3 × 7 = 21"], 10)),
      tambah(13, ...kartu("c1", 152, 112, 134, 20, W.biruMuda, ["7 × 3 = 21"], 10)),
      tambah(18, ...kartu("c2", 14, 140, 134, 20, W.hijauMuda, ["21 : 3 = 7"], 10)),
      tambah(24, ...kartu("c3", 152, 140, 134, 20, W.hijauMuda, ["21 : 7 = 3"], 10)),
    ),
    k(
      SUARA_F4,
      bersih(0),
      tambah(0, judul("Pakai Perkalian"), ...tokoLatar("tk")),
      tambah("perkalian", ...kartu("pk", 30, 60, 100, 28, W.biruMuda, ["perkalian"], 11)),
      tambah("mencari", panah("pa", 134, 74, 32, 0, W.ungu, 2.6)),
      tambah("hasil", ...kartu("hb", 170, 60, 100, 28, W.hijauMuda, ["hasil bagi"], 11)),
      tambah("bagi.", teks("kl", 150, 134, "4 × ? = 28", 18, W.ungu), emo("lp", 262, 146, E.lampu, 24)),
    ),
  ],
};

/* ------------------------------ Fact Family: terapan ------------------------------ */
const SUARA_G1 = "Salsa membagi dua puluh delapan dengan empat. Empat kali berapa sama dengan dua puluh delapan?";
const SUARA_G2 = "Empat kali tujuh, jadi hasil baginya tujuh. Pembagian selesai tanpa mengurangi berkali-kali.";
const SUARA_G3 = "Cocok kalau perkaliannya sudah dihafal.";
const SUARA_G4 = "Kurang cocok kalau perkaliannya belum dikenal, karena sulit mencari pasangannya.";

export const ADEGAN_LUAR_KELUARGA_TERAPAN: AdeganStory = {
  id: "luar-keluarga-terapan",
  judul: "Salsa membagi dua puluh delapan",
  sumber: "Metode global: Fact Family (terapan)",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_G1,
      bersih(0),
      tambah(0, judul("Dua Puluh Delapan"), ...tokoLatar("tk"), ...tokoh("sl", 36, 178, "Salsa", 26)),
      tambah(2, teks("kb", 160, 84, "28", 26, W.biru)),
      ubah(5, { id: "kb", isi: "28 :" }),
      ubah(6, { id: "kb", isi: "28 : 4" }),
      tambah(9, teks("kc", 160, 124, "4 × ? = 28", 18, W.ungu)),
    ),
    k(
      SUARA_G2,
      ubah(2, { id: "kc", isi: "4 × 7" }),
      ubah(4, { id: "kc", isi: "4 × 7 = 28" }),
      tambah(6, ...kartu("hs", 90, 142, 140, 20, W.hijauMuda, ["28 : 4 = 7"], 11)),
      tambah(9, emo("x1", 262, 100, "\u{2796}", 26), emo("x2", 262, 140, E.salah, 22)),
      tambah(11, emo("ok", 262, 60, E.benar, 24)),
    ),
    k(
      SUARA_G3,
      bersih(0),
      tambah(0, judul("Kapan Cocok?"), ...tokoLatar("tk"), ...kartu("cc", 90, 44, 120, 24, W.hijauMuda, ["Cocok"], 12)),
      tambah("perkaliannya", emo("ot", 150, 112, "\u{1F9E0}", 36)),
      tambah("dihafal.", teks("pf", 150, 156, "4 × 7 = 28", 16, W.ungu)),
    ),
    k(
      SUARA_G4,
      bersih(0),
      tambah(0, judul("Kapan Kurang Cocok?"), ...tokoLatar("tk"), ...kartu("kc", 80, 44, 140, 24, W.merahMuda, ["Kurang cocok"], 12)),
      tambah("belum", teks("pf", 150, 104, "? × ? = 56", 18, W.coklat)),
      tambah("sulit", emo("pk", 150, 148, "\u{1F615}", 32)),
      tambah("pasangannya.", emo("x1", 262, 130, E.salah, 26)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_Z1 = "Tiga cara sudah kita lihat. Mana yang pas tergantung bilangannya.";
const SUARA_Z2 = "Barang nyata, pakai Bagi Rata. Pembagi besar, pakai Kurang Berulang.";
const SUARA_Z3 = "Perkalian sudah hafal, pakai Keluarga Fakta. Apa pun caranya, periksa dengan perkalian.";
const SUARA_Z4 = "Menurutmu, untuk membagi empat puluh lima permen ke lima anak, cara mana yang kamu pilih?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara membagi",
  sumber: "Ringkasan: tiga cara membagi",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_Z1,
      bersih(0),
      tambah(0, judul("Tiga Cara Tadi"), ...tokoLatar("tk"), teks("n3", 150, 46, "3 cara", 11, W.ungu)),
      tambah("sudah", ...kartu("r0", 30, 60, 240, 26, W.biruMuda, ["1. Bagi Rata"], 11), ...kartu("r1", 30, 94, 240, 26, W.hijauMuda, ["2. Kurang Berulang"], 11), ...kartu("r2", 30, 128, 240, 26, W.merahMuda, ["3. Keluarga Fakta"], 11)),
      tambah("Mana", emo("tz", 282, 100, E.tanya, 20)),
      tambah("bilangannya.", emo("pk", 150, 176, E.pikir, 26)),
    ),
    k(
      SUARA_Z2,
      hapus(0, "tz"),
      tambah("nyata,", emo("hd", 150, 176, E.hadiah, 24)),
      sorotkan("Rata.", "r0-k"),
      tambah("besar,", emo("bs", 100, 176, "\u{1F4CF}", 24)),
      sorotkan("Berulang.", "r1-k"),
    ),
    k(
      SUARA_Z3,
      ubah(0, { id: "r0-k", sorot: false }, { id: "r1-k", sorot: false }),
      tambah("hafal,", emo("ot", 200, 176, "\u{1F9E0}", 24)),
      sorotkan("Fakta.", "r2-k"),
      tambah("periksa", emo("kc", 250, 176, E.kaca, 24)),
      tambah("perkalian.@2", emo("ok", 282, 140, E.benar, 24)),
    ),
    k(
      SUARA_Z4,
      bersih(0),
      tambah(0, judul("Pilih Caramu"), ...tokoLatar("tk")),
      tambah("empat", teks("n45", 150, 58, "45 permen", 16, W.merah)),
      tambah("lima@2", teks("n5", 150, 80, "5 anak", 12, W.coklat)),
      tambah("cara", ...kartu("o0", 20, 98, 80, 24, W.biruMuda, ["Bagi Rata"], 8), ...kartu("o1", 110, 98, 80, 24, W.hijauMuda, ["Kurang Berulang"], 8), ...kartu("o2", 200, 98, 80, 24, W.merahMuda, ["Keluarga Fakta"], 8)),
      tambah("kamu", ...tokoh("rk", 60, 178, "Raka", 24, "Raka", 6.5), ...tokoh("sl", 150, 178, "Salsa", 24, "Salsa", 6.5), ...tokoh("bm", 240, 178, "Bima", 24, "Bima", 6.5)),
      tambah("pilih?", emo("tz", 150, 144, E.tanya, 30)),
    ),
  ],
};

