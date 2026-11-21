import type { AdeganStory } from "./logika-story";
import { E, W, emo, judul, kartu, halaman, kisi, panah, teks, tokoh, warnai } from "./k4b2e-gambar";
import { hapus, k, redamkan, sorotkan, tambah, ubah } from "./k4b2e-bantu";

/*
 * Cerita orisinal IGIL "Papan Pameran Bu Tuti" (Kelas 4 Bab 2 Sub-Bab E), video metode global.
 * Naskah suara dari naskah/story-naskah-k4b2e.md. Bagian ini: Hundred Grid (Kisi Seratus) dan terapannya, Decimal Percent Bridge (Jembatan Persen) dan terapannya, dan ringkasan.
 */

/* ------------------------------ Hundred Grid: konsep ------------------------------ */
const SUARA_D1 = "Cara kedua, Hundred Grid, atau Kisi Seratus.";
const SUARA_D2 = "Kita menggambar seratus kotak kecil sama besar dalam sepuluh baris dan sepuluh kolom.";
const SUARA_D3 = "Banyak kotak yang diwarnai adalah persennya, dan juga dua angka di belakang koma.";
const SUARA_D4 = "Gambar membantu kita melihat bahwa seratus persen adalah satu utuh, yaitu semua kotak terwarna.";

export const ADEGAN_LUAR_KISI: AdeganStory = {
  id: "luar-kisi",
  judul: "Hundred Grid: Kisi Seratus",
  sumber: "Metode global: Hundred Grid (konsep)",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Cara 2: Hundred Grid"), ...halaman("hl", 150)),
      tambah("Hundred", emo("jr", 150, 104, E.palet, 36)),
      tambah("Kisi", teks("nm", 150, 140, "Kisi Seratus", 13, W.ungu)),
    ),
    k(
      SUARA_D2,
      hapus(0, "jr", "nm"),
      tambah("seratus", teks("n100", 210, 130, "100 kotak", 12, W.merah)),
      tambah("menggambar", ...kisi("ks", 24, 30, 0)),
      tambah("sepuluh", teks("b10", 210, 60, "10 baris", 14, W.biru)),
      tambah("sepuluh@2", teks("k10", 210, 92, "10 kolom", 14, W.biru)),
    ),
    k(
      SUARA_D3,
      hapus(0, "b10", "k10"),
      ubah("diwarnai", ...warnai("ks", 0, 45)),
      tambah("persennya", teks("p45", 210, 66, "45%", 22, W.merah)),
      tambah("dua", teks("n2", 210, 92, "2 angka", 12, W.merah)),
      tambah("belakang", teks("dk", 210, 112, "0,45", 14, W.hijauTua)),
    ),
    k(
      SUARA_D4,
      hapus(0, "p45", "n2", "dk", "n100"),
      tambah("seratus", teks("c100", 210, 70, "100%", 24, W.merah)),
      tambah("satu", teks("c1", 210, 104, "= 1 utuh", 14, W.biru)),
      ubah("terwarna", ...warnai("ks", 45, 100)),
    ),
  ],
};

/* ------------------------------ Hundred Grid: terapan ------------------------------ */
const SUARA_E1 = "Genta mewarnai lima puluh lima kotak pada kisi seratus.";
const SUARA_E2 = "Banyak kotak lima puluh lima berarti lima puluh lima persen, atau nol koma lima lima.";
const SUARA_E3 = "Cocok untuk memahami arti persen, karena kita bisa melihat dan menghitungnya.";
const SUARA_E4 = "Kurang cocok untuk angka yang banyak, karena mewarnai kotak memakan waktu.";

export const ADEGAN_LUAR_KISI_TERAPAN: AdeganStory = {
  id: "luar-kisi-terapan",
  judul: "Hundred Grid: terapan",
  sumber: "Metode global: Hundred Grid (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_E1,
      tambah(0, judul("Lima Puluh Lima Kotak"), ...halaman("hl", 150), ...tokoh("ge", 262, 184, "Genta"), ...kisi("ks", 24, 30, 0)),
      tambah("mewarnai", teks("n55", 210, 70, "55 kotak", 14, W.merah)),
      ubah("kotak", ...warnai("ks", 0, 55)),
      tambah("kisi", teks("j100", 210, 100, "dari 100", 11, W.coklat)),
    ),
    k(
      SUARA_E2,
      hapus(0, "n55", "j100"),
      tambah("berarti", teks("e1", 210, 64, "55%", 24, W.merah)),
      tambah("atau", teks("e2", 210, 92, "atau", 11, W.coklat)),
      tambah("nol", teks("e3", 210, 118, "0,55", 22, W.hijauTua)),
    ),
    k(
      SUARA_E3,
      tambah("Cocok", emo("ok", 262, 120, E.benar, 22)),
      tambah("melihat", emo("lp", 172, 146, E.lupa, 22)),
      tambah("menghitungnya", teks("hg", 210, 140, "hitung kotak", 10, W.coklat)),
    ),
    k(
      SUARA_E4,
      hapus(0, "ok", "lp", "hg"),
      tambah(0, emo("xs", 262, 120, E.salah, 22)),
      tambah("banyak", teks("bn", 210, 140, "angka banyak", 10, W.merah)),
      tambah("waktu", emo("wk", 172, 146, "\u{1F552}", 20)),
    ),
  ],
};

/* ------------------------------ Decimal Percent Bridge: konsep ------------------------------ */
const SUARA_F1 = "Cara ketiga, Decimal Percent Bridge, atau Jembatan Persen.";
const SUARA_F2 = "Dari desimal ke persen, geser koma dua tempat ke kanan lalu tulis tanda persen.";
const SUARA_F3 = "Dari persen ke desimal, hilangkan tanda persen lalu geser koma dua tempat ke kiri.";
const SUARA_F4 = "Jembatan ini bekerja ke dua arah, dan besarnya tidak berubah.";

export const ADEGAN_LUAR_JEMBATAN: AdeganStory = {
  id: "luar-jembatan",
  judul: "Decimal Percent Bridge: Jembatan Persen",
  sumber: "Metode global: Decimal Percent Bridge (konsep)",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_F1,
      tambah(0, judul("Cara 3: Decimal Percent Bridge"), ...halaman("hl", 150)),
      tambah("Decimal", emo("jr", 150, 104, E.jembatan, 36)),
      tambah("Jembatan", teks("nm", 150, 140, "Jembatan Persen", 13, W.ungu)),
    ),
    k(
      SUARA_F2,
      hapus(0, "jr", "nm"),
      tambah("desimal", teks("d1", 70, 78, "0,48", 22, W.biru)),
      tambah("geser", panah("g1", 102, 88, 88, 0, W.merah, 2.4, { z: 4 })),
      tambah("dua", teks("n2", 150, 112, "2 tempat", 12, W.merah)),
      tambah("kanan", teks("kn", 150, 70, "ke kanan", 10, W.coklat)),
      tambah("tulis", teks("p1", 230, 78, "48%", 22, W.hijauTua)),
    ),
    k(
      SUARA_F3,
      hapus(0, "d1", "g1", "n2", "kn", "p1"),
      tambah("persen", teks("q1", 230, 78, "48%", 22, W.hijauTua)),
      tambah("hilangkan", teks("hl", 150, 52, "tanda % hilang", 10, W.merah)),
      tambah("geser", panah("g2", 190, 88, -88, 0, W.merah, 2.4, { z: 4 })),
      tambah("dua", teks("n2b", 150, 112, "2 tempat", 12, W.merah)),
      tambah("kiri", teks("d2", 70, 78, "0,48", 22, W.biru)),
    ),
    k(
      SUARA_F4,
      hapus(0, "q1", "hl", "g2", "n2b", "d2"),
      tambah("Jembatan", teks("ds", 70, 92, "0,48", 22, W.biru), teks("eq", 150, 92, "=", 24, W.biru), teks("ps", 230, 92, "48%", 22, W.hijauTua)),
      tambah("dua", teks("n2c", 150, 54, "2 arah", 14, W.ungu)),
      tambah("besarnya", panah("ar1", 100, 112, 100, 0, W.merah, 2.4, { z: 4 }), panah("ar2", 200, 124, -100, 0, W.hijauTua, 2.4, { z: 4 })),
      tambah("berubah", emo("ok", 150, 148, E.benar, 22)),
    ),
  ],
};

/* ------------------------------ Decimal Percent Bridge: terapan ------------------------------ */
const SUARA_G1 = "Satria mengubah nol koma dua lima menjadi persen dengan menggeser koma dua tempat.";
const SUARA_G2 = "Hasilnya dua puluh lima persen, dengan tanda persen di belakangnya.";
const SUARA_G3 = "Cocok untuk mengubah dengan cepat, terutama kalau angkanya sudah desimal.";
const SUARA_G4 = "Kurang cocok kalau lupa arah geseran, karena hasilnya bisa seratus kali terlalu besar atau kecil.";

export const ADEGAN_LUAR_JEMBATAN_TERAPAN: AdeganStory = {
  id: "luar-jembatan-terapan",
  judul: "Decimal Percent Bridge: terapan",
  sumber: "Metode global: Decimal Percent Bridge (terapan)",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Nol Koma Dua Lima"), ...halaman("hl", 150), ...tokoh("sa", 36, 184, "Satria")),
      tambah("nol", teks("d1", 100, 74, "0,25", 24, W.biru)),
      tambah("menjadi", panah("p1", 134, 82, 40, 0, W.merah, 2.4, { z: 4 })),
      tambah("persen", teks("q1", 222, 74, "?%", 24, W.hijauTua)),
      tambah("dua@2", teks("n2", 150, 112, "2 tempat", 12, W.merah)),
    ),
    k(
      SUARA_G2,
      ubah("persen", { id: "q1", isi: "25%" }),
      tambah("tanda", teks("tp", 222, 100, "tanda %", 10, W.merah)),
      tambah("belakangnya", emo("ok", 266, 76, E.benar, 20)),
    ),
    k(
      SUARA_G3,
      hapus(0, "tp", "ok"),
      tambah("Cocok", emo("jp", 262, 128, E.jempol, 22)),
      tambah("cepat", emo("pt", 190, 146, E.petir, 24)),
      tambah("desimal", teks("ds", 110, 132, "sudah desimal", 10, W.hijauTua)),
    ),
    k(
      SUARA_G4,
      hapus(0, "jp", "pt", "ds"),
      tambah(0, emo("xs", 262, 128, E.salah, 22)),
      tambah("lupa", teks("lp", 100, 132, "arah lupa", 10, W.merah)),
      tambah("seratus", teks("x1", 190, 132, "100 kali", 12, W.merah)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita lihat bersama Bu Tuti. Mana yang pas tergantung keadaan.";
const SUARA_R2 = "Ingin menyalin dari per seratus, pakai Persen Perseratusan. Ingin melihat artinya, pakai Kisi Seratus.";
const SUARA_R3 = "Ingin mengubah desimal dan persen bolak-balik, pakai Jembatan Persen. Apa pun caranya, ingat persen berarti per seratus.";
const SUARA_R4 = "Menurutmu, untuk mengubah nol koma sembilan menjadi persen, cara mana yang paling pas?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Ringkasan: tiga cara memilih",
  latar: "#FEF3C7",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tiga Cara"), ...halaman("hl", 150), ...tokoh("bt", 262, 184, "Bu Tuti"), teks("n3", 150, 40, "3 cara", 11, W.ungu)),
      tambah("lihat", ...kartu("r0", 14, 56, 84, 40, "#FEF3C7", ["Persen", "Perseratusan"], 9)),
      tambah("Tuti", ...kartu("r1", 108, 56, 84, 40, W.hijauMuda, ["Kisi", "Seratus"], 9)),
      tambah("pas", ...kartu("r2", 202, 56, 84, 40, W.pink, ["Jembatan", "Persen"], 9)),
      tambah("keadaan", emo("tn", 150, 134, E.tanya, 22)),
    ),
    k(
      SUARA_R2,
      hapus(0, "tn"),
      tambah("menyalin", teks("h0", 56, 112, "salin pembilang", 9, W.coklat)),
      sorotkan("Persen", "r0-k"),
      tambah("melihat", teks("h1", 150, 112, "lihat artinya", 9, W.coklat)),
      redamkan("melihat", "r0-k"),
      sorotkan("Kisi", "r1-k"),
    ),
    k(
      SUARA_R3,
      tambah("mengubah", teks("h2", 244, 112, "bolak-balik", 9, W.coklat)),
      redamkan("Jembatan", "r1-k"),
      sorotkan("Jembatan", "r2-k"),
      tambah("ingat", teks("pp", 150, 134, "persen = per seratus", 11, W.merah)),
    ),
    k(
      SUARA_R4,
      hapus(0, "h0", "h1", "h2", "pp"),
      tambah(0, emo("tm", 244, 136, E.tanya, 22)),
      tambah("nol", teks("q9", 150, 124, "0,9", 26, W.biru)),
      tambah("persen", teks("qp", 200, 124, "?%", 24, W.merah)),
      redamkan("cara", "r2-k"),
    ),
  ],
};
