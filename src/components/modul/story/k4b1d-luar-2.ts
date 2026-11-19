import type { AdeganStory } from "./logika-story";
import { E, W, emo, garis, judul, kartu, kotak, kotakTempat, panah, papanBesar, teks, tokoh } from "./k4b1d-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k4b1d-bantu";

/*
 * Cerita orisinal IGIL "Kios Kelapa Pak Darwis" (Kelas 4 Bab 1 Sub-Bab D), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b1d.md. Bagian ini: Build Up (Susun Bilangan), Part-Part-Whole (Bagan Bagian Utuh), terapannya, dan ringkasan.
 */

/** Empat kotak tempat angka pada papan besar, dari ribuan sampai satuan: [kotak, nama] untuk tiap tempat. */
const TEMPAT = [16, 88, 160, 232].map((x, i) => kotakTempat(`t${i + 1}`, x, 84, 60, 44, ["ribuan", "ratusan", "puluhan", "satuan"][i]));

/** Bagan bagian utuh: kotak besar `ub-k` (label `ub-t`), garis `gl` `gr`, dua kotak kecil `kl-k` `kr-k` (label `kl-t` `kr-t`). */
const KOTAK_UTUH = (isi: string, u = 12) => [kotak("ub-k", 95, 36, 110, 34, "#FFEDD5", W.coklat, { rx: 8, z: 2 }), teks("ub-t", 150, 58, isi, u, W.biru, { z: 3 })];
const GARIS_BAGAN = () => [garis("gl", 150, 70, -75, 30, W.biru, 1.6, { z: 1 }), garis("gr", 150, 70, 75, 30, W.biru, 1.6, { z: 1 })];
const KOTAK_KIRI = (isi: string, u = 12) => [kotak("kl-k", 30, 100, 90, 34, "#DBEAFE", W.biru, { rx: 8, z: 2 }), teks("kl-t", 75, 122, isi, u, W.biru, { z: 3 })];
const KOTAK_KANAN = (isi: string, u = 12, warna: string = W.biru) => [kotak("kr-k", 180, 100, 90, 34, "#DBEAFE", W.biru, { rx: 8, z: 2 }), teks("kr-t", 225, 122, isi, u, warna, { z: 3 })];

/* ------------------------------ Build Up: konsep ------------------------------ */
const SUARA_S1 = "Cara kedua, Build Up, atau Susun Bilangan.";
const SUARA_S2 = "Kita menyatukan bagian-bagian menjadi satu bilangan, dari ribuan sampai satuan.";
const SUARA_S3 = "Tiap bagian menempati tempatnya, dan tempat yang kosong diisi nol.";
const SUARA_S4 = "Hasil susunan harus bisa dibaca kembali sebagai bilangan utuh.";

export const ADEGAN_LUAR_SUSUN: AdeganStory = {
  id: "luar-susun",
  judul: "Build Up: Susun Bilangan",
  sumber: "Metode global: Build Up (konsep)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Cara 2: Build Up"), papanBesar()),
      tambah("Build", teks("nm", 150, 66, "Build Up", 16, W.merah, { z: 2 })),
      tambah("Susun", teks("ni", 150, 90, "Susun Bilangan", 12, W.biru, { z: 2 })),
      tambah("Bilangan.", emo("sb", 150, 136, E.susun, 32, { z: 2 })),
    ),
    k(
      SUARA_S2,
      bersih(0),
      tambah(0, judul("Bagian Menjadi Satu"), papanBesar()),
      tambah("bagian-bagian", ...kartu("s0", 20, 44, 56, 34, W.hijauMuda, ["2.000"], 12, { z: 2 }), ...kartu("s1", 88, 44, 56, 34, W.langit, ["500"], 12, { z: 2 }), ...kartu("s2", 156, 44, 56, 34, W.pink, ["30"], 12, { z: 2 }), ...kartu("s3", 224, 44, 56, 34, W.krem, ["8"], 12, { z: 2 })),
      tambah("menjadi", teks("p1", 82, 66, "+", 14, W.ungu), teks("p2", 150, 66, "+", 14, W.ungu), teks("p3", 218, 66, "+", 14, W.ungu), panah("pa", 150, 84, 0, 18, W.merah, 2)),
      tambah("satu", teks("s1x", 250, 146, "1 bilangan", 10, W.ungu)),
      tambah("bilangan,", teks("rs", 150, 130, "2.538", 26, W.merah, { z: 2 })),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Tempat Kosong Diisi Nol"), papanBesar()),
      tambah("bagian", teks("bg", 150, 56, "7.000 + 50 + 8", 14, W.coklat, { z: 2 })),
      tambah("menempati", TEMPAT[0][0], TEMPAT[0][1], TEMPAT[1][0], TEMPAT[1][1], TEMPAT[2][0], TEMPAT[2][1], TEMPAT[3][0], TEMPAT[3][1]),
      tambah("tempatnya,", teks("dg1", 46, 116, "7", 24, W.biru, { z: 3 }), teks("dg3", 190, 116, "5", 24, W.biru, { z: 3 }), teks("dg4", 262, 116, "8", 24, W.biru, { z: 3 })),
      sorotkan("kosong", "t2-k"),
      tambah("diisi", teks("dg2", 118, 116, "0", 24, W.merah, { z: 3 })),
      tambah("nol.", emo("ok", 28, 50, E.benar, 22)),
    ),
    k(
      SUARA_S4,
      tambah("Hasil", teks("rs", 150, 146, "7.058", 18, W.merah, { z: 2 })),
      tambah("dibaca", teks("rd", 150, 172, "dibaca: tujuh ribu lima puluh delapan", 9, W.ungu)),
      tambah("utuh.", emo("ok2", 262, 50, E.benar, 22)),
    ),
  ],
};

/* ------------------------------ Build Up: terapan ------------------------------ */
const SUARA_U1 = "Genta menyusun tiga ribu, tujuh ratus, dan lima menjadi satu bilangan.";
const SUARA_U2 = "Ia menaruh nol di puluhan, sehingga hasilnya tiga ribu tujuh ratus lima.";
const SUARA_U3 = "Cocok untuk membuat bilangan dari bagian-bagian yang diberikan.";
const SUARA_U4 = "Kurang cocok kalau bagian-bagiannya tidak lengkap, karena kita bisa keliru menaruh angka.";

export const ADEGAN_LUAR_SUSUN_TERAPAN: AdeganStory = {
  id: "luar-susun-terapan",
  judul: "Susun Bilangan: kapan cocok",
  sumber: "Metode global: Build Up (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Genta Menyusun"), papanBesar(), ...tokoh("gn", 40, 184, "Genta")),
      tambah("tiga", ...kartu("v1", 30, 56, 66, 34, W.hijauMuda, ["3.000"], 13, { z: 2 })),
      tambah("tujuh", ...kartu("v2", 104, 56, 66, 34, W.langit, ["700"], 13, { z: 2 })),
      tambah("lima", ...kartu("v3", 178, 56, 66, 34, W.pink, ["5"], 13, { z: 2 })),
      tambah("satu", teks("s1", 150, 118, "1 bilangan", 14, W.merah, { z: 2 })),
    ),
    k(
      SUARA_U2,
      hapus("Ia", "v1-k", "v1-t0", "v2-k", "v2-t0", "v3-k", "v3-t0", "s1"),
      tambah("menaruh", TEMPAT[0][0], TEMPAT[0][1], TEMPAT[1][0], TEMPAT[1][1], TEMPAT[2][0], TEMPAT[2][1], TEMPAT[3][0], TEMPAT[3][1], teks("dg1", 46, 116, "3", 24, W.biru, { z: 3 }), teks("dg2", 118, 116, "7", 24, W.biru, { z: 3 }), teks("dg4", 262, 116, "5", 24, W.biru, { z: 3 })),
      tambah("nol", teks("dg3", 190, 116, "0", 24, W.merah, { z: 3 })),
      sorotkan("puluhan,", "t3-k"),
      tambah("tiga", teks("rs", 150, 146, "3.705", 20, W.merah, { z: 2 })),
    ),
    k(
      SUARA_U3,
      tambah("Cocok", emo("ok", 28, 50, E.benar, 22)),
      tambah("membuat", teks("cm", 150, 172, "bagian lengkap: bilangan jadi", 9, W.hijauTua)),
      tambah("bagian-bagian", emo("sb", 236, 172, E.susun, 18)),
    ),
    k(
      SUARA_U4,
      hapus("Kurang", "ok", "cm", "sb"),
      tambah("Kurang", emo("xs", 28, 50, E.salah, 22)),
      ubah("tidak", { id: "dg3", isi: "?" }),
      tambah("keliru", teks("kl", 150, 172, "bagian hilang: angka bisa keliru", 9, W.merah)),
    ),
  ],
};

/* ------------------------------ Part-Part-Whole: konsep ------------------------------ */
const SUARA_G1 = "Cara ketiga, Part-Part-Whole, atau Bagan Bagian Utuh.";
const SUARA_G2 = "Bagan ini punya satu kotak besar untuk bilangan utuh dan dua kotak kecil untuk bagiannya.";
const SUARA_G3 = "Kalau salah satu bagian hilang, kita mencarinya dengan mengurangkan.";
const SUARA_G4 = "Dengan bagan, ada banyak cara untuk membagi satu bilangan menjadi dua bagian.";

export const ADEGAN_LUAR_BAGAN: AdeganStory = {
  id: "luar-bagan",
  judul: "Part-Part-Whole: Bagan Bagian Utuh",
  sumber: "Metode global: Part-Part-Whole (konsep)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Cara 3: Part-Part-Whole"), papanBesar()),
      tambah("Part-Part-Whole,", teks("nm", 150, 66, "Part-Part-Whole", 15, W.merah, { z: 2 })),
      tambah("Bagan", teks("ni", 150, 90, "Bagan Bagian Utuh", 12, W.biru, { z: 2 })),
      tambah("Utuh.", emo("bg", 150, 136, E.bagan, 32, { z: 2 })),
    ),
    k(
      SUARA_G2,
      bersih(0),
      tambah(0, judul("Bagan Bagian Utuh"), papanBesar()),
      tambah("satu", ...KOTAK_UTUH("utuh"), teks("c1x", 252, 53, "1 kotak besar", 9, W.ungu)),
      tambah("dua", ...GARIS_BAGAN(), ...KOTAK_KIRI("bagian"), ...KOTAK_KANAN("bagian"), teks("c2x", 150, 150, "2 kotak kecil", 9, W.ungu)),
    ),
    k(
      SUARA_G3,
      hapus("Kalau", "c2x"),
      ubah("Kalau", { id: "ub-t", isi: "9.000", u: 16 }),
      ubah("salah", { id: "kl-t", isi: "4.000", u: 16 }),
      tambah("satu", teks("h1", 60, 150, "1 hilang", 10, W.merah)),
      ubah("hilang,", { id: "kr-t", isi: "?", u: 18, warna: W.merah }),
      tambah("mengurangkan.", teks("kr", 210, 150, "9.000 − 4.000", 12, W.hijauTua)),
    ),
    k(
      SUARA_G4,
      hapus("Dengan", "h1", "kr"),
      ubah("banyak", { id: "kl-t", isi: "3.000" }, { id: "kr-t", isi: "6.000", u: 16, warna: W.biru }),
      ubah("cara", { id: "kl-t", isi: "2.000" }, { id: "kr-t", isi: "7.000" }),
      tambah("satu", teks("o1", 60, 150, "1 bilangan", 10, W.ungu)),
      tambah("dua", teks("o2", 240, 150, "2 bagian", 10, W.ungu)),
    ),
  ],
};

/* ------------------------------ Part-Part-Whole: terapan ------------------------------ */
const SUARA_P1 = "Satria menaruh lima ribu di kotak besar dan empat ribu di salah satu kotak kecil.";
const SUARA_P2 = "Bagian yang lain dihitung, yaitu seribu.";
const SUARA_P3 = "Cocok untuk mencari bagian yang belum diketahui.";
const SUARA_P4 = "Kurang cocok kalau bilangannya diuraikan menjadi banyak bagian, karena kotak bagannya terbatas.";

export const ADEGAN_LUAR_BAGAN_TERAPAN: AdeganStory = {
  id: "luar-bagan-terapan",
  judul: "Bagan Bagian Utuh: kapan cocok",
  sumber: "Metode global: Part-Part-Whole (terapan)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Satria Menaruh"), papanBesar(), ...tokoh("st", 40, 184, "Satria")),
      tambah("lima", ...KOTAK_UTUH("5.000", 16)),
      tambah("empat", ...GARIS_BAGAN(), ...KOTAK_KIRI("4.000", 16)),
      tambah("kecil.", ...KOTAK_KANAN("?", 18, W.merah)),
      tambah("satu", teks("sk", 240, 146, "1 kotak terisi", 10, W.merah)),
    ),
    k(
      SUARA_P2,
      tambah("dihitung,", teks("hc", 110, 146, "5.000 − 4.000 = 1.000", 11, W.hijauTua)),
      ubah("seribu.", { id: "kr-t", isi: "1.000", u: 16, warna: W.hijauTua }),
    ),
    k(
      SUARA_P3,
      tambah("Cocok", emo("ok", 28, 50, E.benar, 22)),
      tambah("mencari", teks("cb", 240, 166, "bagian dicari", 9, W.hijauTua)),
    ),
    k(
      SUARA_P4,
      hapus("Kurang", "ok", "cb"),
      tambah("Kurang", emo("xs", 28, 50, E.salah, 22)),
      tambah("banyak", ...[0, 1, 2, 3, 4].flatMap((i) => [kotak(`m${i}-k`, 80 + i * 38, 158, 30, 18, W.krem, W.biru, { rx: 4 }), teks(`m${i}-t`, 95 + i * 38, 171, "?", 10, W.merah, { z: 3 })])),
      tambah("terbatas.", teks("tb", 170, 190, "terbatas", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita lihat bersama Pak Darwis. Mana yang pas tergantung keadaan.";
const SUARA_R2 = "Ingin melihat isi bilangan, pakai Pecah Bilangan. Ingin merakit bilangan, pakai Susun Bilangan.";
const SUARA_R3 = "Ingin mencari bagian yang hilang, pakai Bagan Bagian Utuh. Apa pun caranya, jumlahkan kembali untuk memeriksa.";
const SUARA_R4 = "Menurutmu, untuk membuat bilangan dari lima bagian yang berbeda, cara mana yang paling pas?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Ringkasan: memilih cara",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tiga Cara")),
      tambah("Tiga", teks("n3", 150, 38, "3 cara", 10, W.ungu)),
      tambah("cara", ...kartu("r0", 12, 44, 82, 40, W.hijauMuda, ["Pecah", "Bilangan"], 9), ...kartu("r1", 109, 44, 82, 40, W.langit, ["Susun", "Bilangan"], 9), ...kartu("r2", 206, 44, 82, 40, W.pink, ["Bagan", "Bagian Utuh"], 9)),
      tambah("Pak", ...tokoh("pd", 150, 184, "Pak Darwis")),
      tambah("keadaan.", emo("tq", 176, 150, E.tanya, 22)),
    ),
    k(
      SUARA_R2,
      hapus("Ingin", "tq"),
      tambah("melihat", emo("mt", 53, 106, E.mata, 22)),
      sorotkan("Pecah", "r0-k"),
      tambah("merakit", emo("rk", 150, 106, E.susun, 22)),
      redamkan("Susun", "r0-k"),
      sorotkan("Susun", "r1-k"),
    ),
    k(
      SUARA_R3,
      redamkan("Bagan", "r1-k"),
      sorotkan("Bagan", "r2-k"),
      tambah("hilang,", emo("tq2", 247, 106, E.tanya, 22)),
      tambah("jumlahkan", teks("jk", 150, 144, "jumlahkan kembali", 11, W.hijauTua)),
      tambah("memeriksa.", emo("ok2", 232, 162, E.benar, 22)),
    ),
    k(
      SUARA_R4,
      bersih(0),
      tambah(0, judul("Lima Bagian"), ...tokoh("pd", 60, 184, "Pak Darwis")),
      tambah("lima", ...kartu("q0", 12, 44, 48, 32, W.hijauMuda, ["1.000"], 10), ...kartu("q1", 70, 44, 48, 32, W.langit, ["2.000"], 10), ...kartu("q2", 128, 44, 48, 32, W.pink, ["300"], 10), ...kartu("q3", 186, 44, 48, 32, W.krem, ["40"], 10), ...kartu("q4", 244, 44, 44, 32, W.hijauMuda, ["5"], 10)),
      tambah("bagian", teks("lb", 150, 100, "5 bagian", 14, W.merah)),
      tambah("mana", emo("tq", 190, 150, E.tanya, 40)),
    ),
  ],
};
