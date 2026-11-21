import type { AdeganStory } from "./logika-story";
import { E, W, WL, airEmber, deretGelas, ember, emo, gelasUkur, idEmber, judul, kartu, kotak, lantai, panah, rak, teks, tokoh, bulat } from "./k4b4b-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k4b4b-bantu";

/*
 * Cerita orisinal IGIL "Ember Pak Anto" (Kelas 4 Bab 4 Sub-Bab B, volume), akhir cerita Kolam Renang Tirta Ceria.
 * Naskah suara dari naskah/story-naskah-k4b4b.md. Bagian ini: salah langkah Satria (satu liter seratus mililiter), pemeriksaan dengan empat gelas, dan taruhan mengepel.
 */

/* ------------------------------ 4. Salah langkah Satria ------------------------------ */
const SUARA_S1 = "Genta mengisi ember dua liter, lalu Pak Anto bertanya, berapa mililiter isinya?";
const SUARA_S2 = "Satria berseru, satu liter itu seratus mililiter, jadi dua ratus mililiter!";
const SUARA_S3 = "Kalau aku salah, aku mengepel semua rak ember, katanya sambil menepuk dada.";

export const ADEGAN_SALAH_SERATUS: AdeganStory = {
  id: "salah-seratus",
  judul: "Satria menyebut seratus mililiter",
  sumber: "Materi: salah langkah dan taruhan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Dua Liter Air"), ...lantai("lt", 150), ...tokoh("ge", 36, 184, "Genta")),
      tambah("ember", ...ember("e", 118, 76, 50, 54, 0)),
      ubah("dua", { id: "e-a", ...airEmber(76, 54, 1) }),
      tambah("dua", teks("l2", 143, 66, "2 l", 14, W.biru)),
      tambah("Anto", ...tokoh("pa", 262, 184, "Pak Anto")),
      tambah("bertanya", emo("q", 232, 110, E.tanya, 24)),
      tambah("mililiter", teks("qm", 143, 146, "? ml", 13, W.merah)),
    ),
    k(
      SUARA_S2,
      tambah("Satria", ...tokoh("sa", 84, 184, "Satria")),
      tambah("berseru", emo("sr", 84, 136, E.seru, 22)),
      ubah("satu", { id: "e", sorot: true }),
      tambah("seratus", teks("sx", 232, 66, "1 l = 100 ml", 11, W.merah)),
      ubah("dua", { id: "qm", isi: "200 ml" }),
    ),
    k(
      SUARA_S3,
      tambah("salah", teks("tr", 232, 84, "taruhan : mengepel", 9, W.coklat)),
      tambah("mengepel", emo("sp", 216, 128, E.sapu, 26)),
      ubah("rak", { id: "e", sorot: false }),
      tambah("menepuk", emo("tp", 118, 138, "\u{270A}", 24)),
    ),
  ],
};

/* ------------------------------ 5. Pemeriksaan dengan empat gelas ------------------------------ */
const SUARA_P1 = "Laras menuang satu liter ke dalam gelas ukur kecil sebanyak empat kali berturut-turut.";
const SUARA_P2 = "Setiap gelas berisi dua ratus lima puluh mililiter, dan empat gelas sama dengan seribu mililiter.";
const SUARA_P3 = "Jadi satu liter sama dengan seribu mililiter, dan dua liter sama dengan dua ribu mililiter.";

export const ADEGAN_PERIKSA: AdeganStory = {
  id: "periksa",
  judul: "Laras memeriksa dengan gelas",
  sumber: "Materi: satu liter seribu mililiter",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Satu Liter ke Gelas"), ...lantai("lt", 150), ...tokoh("la", 36, 184, "Laras")),
      tambah("satu", kotak("bt", 74, 78, 34, 50, W.langit, WL.airGaris, { rx: 6, tebal: 2, z: 1 }), kotak("ba", 76, 100, 30, 26, WL.air, undefined, { rx: 0, tebal: 0, z: 2 }), teks("bi", 91, 94, "1 l", 12, W.biru, { z: 3 })),
      tambah("gelas", ...gelasUkur("gu", 190, 70, 24, 58, 0)),
      tambah("empat", teks("k4", 140, 56, "4 kali", 13, W.merah)),
      tambah("kali", panah("ap", 112, 100, 56, 0, W.ungu, 2.4)),
    ),
    k(
      SUARA_P2,
      tambah("dua", teks("t250", 202, 60, "250 ml", 12, W.coklat)),
      tambah("empat", ...deretGelas("g4", 120, 112, 4, 16, 12)),
      ubah("sama", { id: "gu-a", ...airEmber(70, 58, 0.9) }),
      tambah("seribu", teks("sm", 150, 140, "4 × 250 = 1.000 ml", 10, W.hijauTua)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Satu Liter dan Dua Liter"), ...lantai("lt", 150), ...tokoh("la", 36, 184, "Laras")),
      tambah("seribu", ...kartu("k1", 50, 56, 200, 30, W.krem, ["1 l = 1.000 ml"], 12)),
      tambah("dua", emo("tt", 150, 94, E.tetes, 20)),
      tambah("ribu", ...kartu("k2", 50, 100, 200, 30, W.hijauMuda, ["2 l = 2.000 ml"], 12)),
    ),
  ],
};

/* ------------------------------ 6. Mengepel ------------------------------ */
const SUARA_M1 = "Satria menepati taruhannya dan mulai mengepel lantai di depan rak ember.";
const SUARA_M2 = "Ia menyenggol ember kosong sehingga menggelinding, dan semua orang tertawa.";
const SUARA_M3 = "Laras mencatat, satu liter sama dengan seribu mililiter, bukan seratus.";

export const ADEGAN_MENGEPEL: AdeganStory = {
  id: "mengepel",
  judul: "Satria mengepel lantai",
  sumber: "Materi: Satria menepati taruhan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Satria Mengepel"), ...lantai("lt", 150), ...tokoh("sa", 60, 184, "Satria")),
      tambah("mengepel", emo("sp", 100, 138, E.sapu, 26)),
      tambah("lantai", ...[0, 1, 2].map((i) => bulat(`bb${i}`, 130 + i * 16, 142, 4, WL.air, WL.airGaris, { tebal: 1, z: 2 }))),
      tambah("rak", ...rak("rk", 170, 100, 110)),
      tambah("ember", ...ember("e1", 182, 62, 34, 38, 0.5), ...ember("e2", 228, 62, 34, 38, 0.8)),
    ),
    k(
      SUARA_M2,
      tambah("menyenggol", emo("hit", 200, 52, E.tabrak, 22)),
      hapus("kosong", ...idEmber("e2")),
      tambah("menggelinding", ...ember("e3", 140, 112, 34, 38, 0), panah("ro", 226, 130, -60, 0, W.ungu, 2.2, { z: 4 })),
      tambah("tertawa", ...tokoh("la", 190, 184, "Laras"), emo("tw1", 100, 126, E.tawa, 22), emo("tw2", 190, 140, E.tawa, 22)),
    ),
    k(
      SUARA_M3,
      tambah("mencatat", emo("cat", 232, 108, E.catat, 22)),
      tambah("seribu", ...kartu("ct", 30, 40, 160, 30, W.krem, ["1 l = 1.000 ml"], 11)),
      tambah("bukan", emo("xs", 232, 58, E.salah, 22), teks("sr", 232, 78, "100 ml", 12, W.merah)),
    ),
  ],
};
