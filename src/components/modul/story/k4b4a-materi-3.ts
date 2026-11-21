import type { AdeganStory } from "./logika-story";
import { E, W, air, emo, garis, judul, kotak, petak, tanah, teks, tokoh } from "./k4b4a-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k4b4a-bantu";

/*
 * Cerita orisinal IGIL "Lantai Ubin Bu Sinta" (Kelas 4 Bab 4 Sub-Bab A, pengukuran luas), awal cerita Kolam Renang Tirta Ceria.
 * Naskah suara dari naskah/story-naskah-k4b4a.md. Bagian ini: meter persegi, mengubah satuan luas, dan penutup (jembatan ke Sub-Bab B).
 */

/* ------------------------------ 7. Meter persegi ------------------------------ */
const SUARA_P1 = "Lantai kolam yang sebenarnya jauh lebih besar, jadi Bu Sinta memakai petak yang sisinya satu meter.";
const SUARA_P2 = "Satu petak seperti ini luasnya satu meter persegi.";
const SUARA_P3 = "Lantai itu terdiri dari lima baris dan enam kolom, jadi luasnya tiga puluh meter persegi.";

export const ADEGAN_METER_PERSEGI: AdeganStory = {
  id: "meter-persegi",
  judul: "Petak satu meter persegi",
  sumber: "Materi: meter persegi",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Petak Satu Meter"), ...tanah("tn", 150)),
      tambah("Bu", ...tokoh("bs", 40, 184, "Bu Sinta")),
      tambah("sebenarnya", kotak("lb", 170, 44, 84, 70, undefined, W.kayuTua, { rx: 3, tebal: 1.6, putus: true, z: 1 })),
      tambah("memakai", kotak("pt", 90, 52, 36, 36, W.ubin, W.ubinTua, { rx: 0, tebal: 1.6, z: 2 })),
      tambah("satu", teks("s1", 108, 46, "1 m", 9, W.ubinTua)),
      tambah("meter.", teks("s2", 146, 72, "1 m", 9, W.ubinTua)),
    ),
    k(
      SUARA_P2,
      sorotkan("petak", "pt"),
      tambah("luasnya", teks("lm", 108, 74, "1 m²", 11, W.biru, { z: 3 })),
      tambah("persegi.", teks("nm", 108, 104, "meter persegi", 8.4, W.ubinTua)),
    ),
    k(
      SUARA_P3,
      hapus(0, "lb"),
      tambah("lima", ...petak("g", 170, 44, 5, 6, 14), teks("r5", 272, 80, "5 baris", 9, W.coklat)),
      tambah("enam", teks("c6", 212, 38, "6 kolom", 9, W.coklat)),
      tambah("tiga", teks("lu", 212, 128, "30 m²", 13, W.hijauTua), emo("ok", 262, 128, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ 8. Mengubah satuan ------------------------------ */
const SUARA_U1 = "Genta menggambar petak satu meter persegi, dan sisinya seratus sentimeter.";
const SUARA_U2 = "Seratus dikali seratus sama dengan sepuluh ribu, jadi satu meter persegi sama dengan sepuluh ribu sentimeter persegi.";
const SUARA_U3 = "Semakin kecil satuannya, semakin banyak bilangan yang dibutuhkan untuk luas yang sama.";

export const ADEGAN_UBAH: AdeganStory = {
  id: "ubah",
  judul: "Satu meter persegi dalam sentimeter persegi",
  sumber: "Materi: mengubah satuan luas",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_U1,
      tambah(0, judul("Meter ke Sentimeter Persegi"), ...tanah("tn", 150)),
      tambah("Genta", ...tokoh("ge", 40, 184, "Genta")),
      tambah("petak", kotak("sq", 96, 52, 44, 44, W.ubin, W.ubinTua, { rx: 0, tebal: 1.6, z: 2 })),
      tambah("satu", teks("lb", 118, 78, "1 m²", 12, W.biru, { z: 3 })),
      tambah("seratus", teks("t1", 118, 46, "100 cm", 9, W.ubinTua), teks("t2", 172, 76, "100 cm", 9, W.ubinTua)),
    ),
    k(
      SUARA_U2,
      tambah("Seratus", teks("hk", 150, 122, "100 × 100 = 10.000", 12, W.biru)),
      tambah("jadi", teks("eq", 150, 140, "1 m² = 10.000 cm²", 11, W.hijauTua)),
      sorotkan("sepuluh@2", "eq"),
    ),
    k(
      SUARA_U3,
      hapus(0, "hk"),
      tambah("kecil", teks("a1", 236, 56, "cm² kecil", 9, W.coklat)),
      tambah("banyak", teks("a2", 236, 82, "angka banyak", 9, W.merah), garis("ar", 236, 62, 0, 12, W.merah, 2, { z: 3 })),
      tambah("luas", emo("pg", 262, 112, E.penggaris, 20)),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_Z1 = "Pak Anto, petugas kolam, datang membawa ember dan gelas ukur.";
const SUARA_Z2 = "Ia ingin tahu berapa banyak air yang dibutuhkan untuk mengisi kolam anak, bukan luasnya.";
const SUARA_Z3 = "Menurutmu, bagaimana kita mengukur banyaknya air? Terima kasih, Satria, Laras, Genta, Pak Hendro, dan Bu Sinta!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Pak Anto datang",
  sumber: "Materi: penutup dan jembatan",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Pak Anto Datang"), ...tanah("tn", 150), ...tokoh("pa", 40, 184, "Pak Anto")),
      tambah("ember", kotak("em", 96, 98, 40, 34, "#FCA5A5", "#B91C1C", { rx: 4, tebal: 1.6, z: 2 }), garis("em-h", 100, 98, 32, 0, "#B91C1C", 2, { z: 3 }), teks("et", 116, 146, "ember", 8, W.coklat)),
      tambah("gelas", kotak("gl", 150, 88, 26, 44, "#E0F2FE", W.ubinTua, { rx: 2, tebal: 1.6, z: 2 }), garis("gl-t1", 150, 100, 8, 0, W.ubinTua, 1.4, { z: 3 }), garis("gl-t2", 150, 112, 8, 0, W.ubinTua, 1.4, { z: 3 }), garis("gl-t3", 150, 124, 8, 0, W.ubinTua, 1.4, { z: 3 })),
      tambah("ukur.", teks("gt", 163, 146, "gelas ukur", 8, W.ubinTua)),
    ),
    k(
      SUARA_Z2,
      tambah("banyak", teks("ba", 244, 66, "air berapa?", 10, W.merah)),
      tambah("kolam", ...air("aw", 200, 96, 90, 40), teks("ka", 245, 150, "kolam anak", 8.4, W.ubinTua)),
      tambah("bukan", teks("bl", 244, 82, "bukan luas", 9, W.coklat), emo("xs", 280, 84, E.salah, 16)),
    ),
    k(
      SUARA_Z3,
      bersih(0),
      tambah(0, judul("Terima Kasih!"), ...tanah("tn", 150), ...tokoh("pa", 24, 184, "Pak Anto")),
      tambah("mengukur", teks("tq", 150, 84, "?", 34, W.merah), teks("ua", 150, 112, "banyak air", 10, W.ubinTua)),
      tambah("air?", emo("tt", 150, 136, E.tetes, 20)),
      tambah("Satria,", ...tokoh("sa", 70, 184, "Satria")),
      tambah("Laras,", ...tokoh("lr", 112, 184, "Laras")),
      tambah("Genta,", ...tokoh("ge", 152, 184, "Genta")),
      tambah("Hendro,", ...tokoh("ph", 204, 184, "Pak Hendro")),
      tambah("Sinta!", ...tokoh("bs", 258, 184, "Bu Sinta"), emo("lb", 258, 130, E.lambai, 20)),
    ),
  ],
};
