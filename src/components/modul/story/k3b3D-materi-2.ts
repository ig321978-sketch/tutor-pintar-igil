import type { AdeganStory } from "./logika-story";
import { E, W, emo, garis, judul, kartu, lantai, panah, potongan, teks, tokoh } from "./k3b3D-gambar";
import { bersih, k, tambah, ubah } from "./k3b3D-bantu";

/*
 * Cerita orisinal IGIL "Bandul Dokter Hana" (Kelas 3 Bab 3 Sub-Bab D), video materi.
 * Naskah suara dari naskah/story-naskah-k3b3d.md. Bagian ini: kilogram ke gram (kali seribu), salah langkah Raka (kali seratus), dan gram ke kilogram (ambil tiap seribu gram).
 */

/* ------------------------------ 4. Kilogram ke gram ------------------------------ */
const SUARA_G1 = "Satu kilogram sama dengan seribu gram, juga sama dengan sepuluh ons.";
const SUARA_G2 = "Untuk mengubah kilogram ke gram, kalikan dengan seribu.";
const SUARA_G3 = "Tiga kilogram sama dengan tiga kali seribu, yaitu tiga ribu gram.";

export const ADEGAN_KG_KE_G: AdeganStory = {
  id: "kg-ke-g",
  judul: "Kilogram ke gram",
  sumber: "Materi: kilogram ke gram",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Satu Kilogram"), ...lantai("tn", 150), ...tokoh("dh", 40, 184, "Dokter Hana")),
      tambah("Satu", ...kartu("c1", 14, 60, 72, 40, W.langit, ["1 kg"], 13)),
      tambah("sama", teks("e1", 95, 88, "=", 18, W.biru)),
      tambah("seribu", ...kartu("c2", 104, 60, 92, 40, W.hijauMuda, ["1.000 g"], 13)),
      tambah("sama@2", teks("e2", 205, 88, "=", 18, W.biru)),
      tambah("sepuluh", ...kartu("c3", 214, 60, 72, 40, W.krem, ["10 ons"], 13)),
    ),
    k(
      SUARA_G2,
      bersih(0),
      tambah(0, judul("Kilogram ke Gram"), ...lantai("tn", 150), ...tokoh("dh", 40, 184, "Dokter Hana")),
      tambah("kilogram", teks("ka", 56, 92, "kg", 28, W.kg)),
      tambah("gram,@2", teks("kb", 244, 92, "g", 28, W.gr), panah("pa", 88, 86, 124, 0, W.biru, 2.6)),
      tambah("kalikan", teks("kl", 150, 68, "kalikan", 11, W.merah)),
      tambah("seribu.", teks("ks", 150, 114, "× 1.000", 18, W.merah)),
    ),
    k(
      SUARA_G3,
      bersih(0),
      tambah(0, judul("Tiga Kilogram"), ...lantai("tn", 150), ...tokoh("dh", 40, 184, "Dokter Hana")),
      tambah("Tiga", teks("r1", 30, 76, "3 kg", 20, W.biru, { anchor: "start" }), emo("k1", 250, 60, E.karung, 22), emo("k2", 250, 88, E.karung, 22), emo("k3", 250, 116, E.karung, 22)),
      ubah("sama", { id: "r1", isi: "3 kg =" }),
      ubah("seribu", { id: "r1", isi: "3 kg = 3 × 1.000" }),
      tambah("ribu@2", teks("r2", 30, 126, "= 3.000 g", 26, W.hijauTua, { anchor: "start" })),
    ),
  ],
};

/* ------------------------------ 5. Salah langkah: dikali seratus ------------------------------ */
const SUARA_S1 = "Raka berseru, dua kilogram dikali seratus, dua ratus gram! Kalau salah, aku memandikan semua kambing!";
const SUARA_S2 = "Salsa menggeleng. Satu kilogram itu seribu gram, bukan seratus gram.";
const SUARA_S3 = "Dua kilogram sama dengan dua kali seribu, yaitu dua ribu gram.";

export const ADEGAN_SALAH_KALI: AdeganStory = {
  id: "salah-kali",
  judul: "Salah kali seratus",
  sumber: "Materi: salah langkah kali seratus",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Taruhan Raka"), ...lantai("tn", 150), ...tokoh("rk", 50, 184, "Raka")),
      tambah("dua", teks("e1", 66, 60, "2", 20, W.biru, { anchor: "start" })),
      ubah("dikali", { id: "e1", isi: "2 ×" }),
      ubah("seratus", { id: "e1", isi: "2 × 100" }),
      ubah("dua@2", { id: "e1", isi: "2 × 100 =" }),
      ubah(8, { id: "e1", isi: "2 × 100 = 200 g" }),
      tambah("Kalau", emo("sb", 100, 150, E.sabun, 18)),
      tambah("memandikan", emo("tt", 96, 128, E.tetes, 16)),
      tambah("kambing!", emo("g1", 176, 172, E.kambing, 28), emo("g2", 208, 172, E.kambing, 28)),
    ),
    k(
      SUARA_S2,
      tambah("Salsa", ...tokoh("sl", 262, 184, "Salsa")),
      tambah("menggeleng.", emo("gl", 262, 136, E.pikir, 18), garis("cr", 66, 54, 174, 0, W.merah, 2.4, { z: 3 })),
      ubah("menggeleng.", { id: "e1", op: 0.5 }),
      tambah("Satu", teks("t2", 66, 98, "1 kg", 16, W.biru, { anchor: "start" })),
      ubah("itu", { id: "t2", isi: "1 kg =" }),
      ubah("seribu", { id: "t2", isi: "1 kg = 1.000 g" }),
      tambah("seratus", teks("t3", 66, 128, "bukan 100 g", 14, W.merah, { anchor: "start" })),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Dua Kilogram"), ...lantai("tn", 150), ...tokoh("rk", 50, 184, "Raka"), ...tokoh("sl", 262, 184, "Salsa")),
      tambah("Dua", teks("r1", 30, 76, "2 kg", 20, W.biru, { anchor: "start" }), emo("k1", 236, 64, E.karung, 22), emo("k2", 236, 96, E.karung, 22)),
      ubah("sama", { id: "r1", isi: "2 kg =" }),
      ubah("seribu", { id: "r1", isi: "2 kg = 2 × 1.000" }),
      tambah("ribu@2", teks("r2", 30, 126, "= 2.000 g", 26, W.hijauTua, { anchor: "start" })),
      tambah(10, emo("ok", 200, 126, E.benar, 24)),
    ),
  ],
};

/* ------------------------------ 6. Gram ke kilogram ------------------------------ */
const SUARA_H1 = "Sebaliknya, untuk mengubah gram ke kilogram, ambil tiap seribu gram sebagai satu kilogram.";
const SUARA_H2 = "Pakan beo seribu dua ratus lima puluh gram sama dengan seribu gram ditambah dua ratus lima puluh gram.";
const SUARA_H3 = "Jadi beratnya satu kilogram dua ratus lima puluh gram.";

export const ADEGAN_G_KE_KG: AdeganStory = {
  id: "g-ke-kg",
  judul: "Gram ke kilogram",
  sumber: "Materi: gram ke kilogram",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Gram ke Kilogram"), ...lantai("tn", 150), ...tokoh("dh", 40, 184, "Dokter Hana")),
      tambah("gram", teks("ga", 56, 96, "g", 28, W.gr)),
      tambah("kilogram,", teks("gb", 244, 96, "kg", 28, W.kg), panah("pa", 84, 90, 128, 0, W.biru, 2.6)),
      tambah("tiap", teks("tp", 150, 74, "ambil tiap 1.000 g", 11, W.merah)),
      tambah("satu", teks("sk", 150, 122, "= 1 kg", 16, W.hijauTua)),
    ),
    k(
      SUARA_H2,
      bersih(0),
      tambah(0, judul("Pecah Seribu Gram"), ...lantai("tn", 150), ...tokoh("dh", 40, 184, "Dokter Hana")),
      tambah("beo", emo("bo", 34, 70, E.beo, 26)),
      tambah("seribu", ...potongan("ba", 70, 46, 210, 26, W.langit, W.kg, "1.250 g", 14)),
      tambah("sama", teks("eq", 56, 100, "=", 16, W.biru)),
      tambah("seribu@2", ...potongan("p1", 70, 106, 168, 26, W.hijauMuda, W.gr, "1.000 g", 13)),
      tambah("ditambah", teks("pl", 238, 98, "+", 16, W.biru)),
      tambah("dua@2", ...potongan("p2", 238, 106, 42, 26, W.krem, W.sisa, "250 g", 10)),
    ),
    k(
      SUARA_H3,
      tambah("satu", teks("bk", 154, 148, "1 kg", 14, W.kg)),
      tambah("dua", teks("bs", 259, 148, "250 g", 10, W.sisa)),
      tambah(8, teks("hs", 170, 172, "1 kg 250 g", 20, W.hijauTua), emo("ok", 250, 170, E.benar, 22)),
    ),
  ],
};
