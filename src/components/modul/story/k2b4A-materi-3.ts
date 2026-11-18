import type { AdeganStory } from "./logika-story";
import { E, W, bulat, emo, judul, kartu, karya, kotak, lantai, panah, papanCatat, rak, teks, tokoh } from "./k2b4A-gambar";
import { bersih, hapus, k, pudarkan, redamkan, sorotkan, tambah, ubah } from "./k2b4A-bantu";

/*
 * Cerita orisinal IGIL "Rak Pameran Pak Hasan" (Kelas 2 Bab 4 Sub-Bab A), awal cerita Pameran Kerajinan Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b4a.md. Bagian ini: kalimat posisi, menggabungkan petunjuk, dan penutup (jembatan ke Sub-Bab B).
 */

/* ------------------------------ 7. Kalimat posisi ------------------------------ */
const SUARA_K1 = "Bu Sari meminta kalimat lengkap, misalnya topeng di depan lampion.";
const SUARA_K2 = "Kalimat posisi punya tiga bagian: benda yang diceritakan, kata posisi, dan benda acuan.";
const SUARA_K3 = "Topeng adalah bendanya, di depan adalah kata posisinya, dan lampion adalah benda acuannya.";

export const ADEGAN_KALIMAT: AdeganStory = {
  id: "kalimat",
  judul: "Kalimat posisi",
  sumber: "Materi: kalimat posisi",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Kalimat Posisi"), lantai("lt")),
      tambah("Sari", ...tokoh("bs", 264, 178, "Bu Sari")),
      tambah("kalimat", kotak("kf", 30, 60, 240, 36, W.putih, W.biru, { rx: 8, tebal: 2 })),
      tambah("topeng", teks("w1", 84, 84, "topeng", 12, W.hijau)),
      tambah("depan", teks("w2", 150, 84, "di depan", 12, W.merah)),
      tambah("lampion.", teks("w3", 216, 84, "lampion", 12, W.ungu)),
    ),
    k(
      SUARA_K2,
      tambah("Kalimat", teks("n3", 150, 46, "3 bagian", 10, W.merah)),
      tambah("benda", ...kartu("b1", 18, 112, 84, 40, W.hijauMuda, ["benda yang", "diceritakan"], 9)),
      tambah("kata", ...kartu("b2", 108, 112, 84, 40, W.langit, ["kata", "posisi"], 9)),
      tambah("benda@2", ...kartu("b3", 198, 112, 84, 40, W.merahMuda, ["benda", "acuan"], 9)),
    ),
    k(
      SUARA_K3,
      sorotkan("Topeng", "b1-k"),
      sorotkan("depan", "b2-k"),
      redamkan("depan", "b1-k"),
      redamkan("lampion", "b2-k"),
      sorotkan("lampion", "b3-k"),
      tambah("bendanya,", panah("q1", 60, 108, 20, -14, W.hijau, 2.4)),
      tambah("posisinya,", panah("q2", 150, 108, 0, -14, W.merah, 2.4)),
      tambah("acuannya.", panah("q3", 240, 108, -20, -14, W.ungu, 2.4)),
    ),
  ],
};

/* ------------------------------ 8. Menggabungkan petunjuk ------------------------------ */
const SUARA_G1 = "Bu Sari memberi teka-teki. Karya ini ada di atas rak. Chacha langsung menunjuk guci.";
const SUARA_G2 = "Tunggu, kata Dika, di atas rak ada banyak karya! Bu Sari menambah: karya di sebelah kanan lampion.";
const SUARA_G3 = "Dua petunjuk digabung, dan tinggal satu karya yang cocok, yaitu boneka kain.";

export const ADEGAN_GABUNG_PETUNJUK: AdeganStory = {
  id: "gabung-petunjuk",
  judul: "Menggabungkan petunjuk",
  sumber: "Materi: menggabungkan petunjuk",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Teka-Teki Bu Sari"), lantai("lt"), ...rak("rk", 84, 70, 132, 96)),
      tambah("Sari", ...tokoh("bs", 272, 170, "Bu Sari")),
      tambah("teka-teki.", karya("tp", "topeng", 105, 59), karya("gc", "guci", 135, 59), karya("lm", "lampion", 165, 59), karya("bn", "boneka", 195, 59), karya("kd", "kendi", 150, 155)),
      sorotkan("atas", "tp", "gc", "lm", "bn"),
      tambah("Chacha", ...tokoh("ch", 30, 178, "Chacha")),
      tambah("menunjuk", emo("jr", 135, 38, E.jari, 20)),
    ),
    k(
      SUARA_G2,
      hapus(0, "jr"),
      tambah("Dika", ...tokoh("dk", 74, 178, "Dika")),
      tambah("banyak", emo("bq", 150, 40, E.tanya, 22)),
      tambah("kanan", panah("pk", 172, 38, 26, 0, W.merah, 2.6), teks("kn", 190, 32, "kanan", 8, W.merah)),
      pudarkan("lampion.", "tp", "gc", "lm"),
    ),
    k(
      SUARA_G3,
      hapus(0, "bq", "kn", "pk"),
      tambah("Dua", teks("d2", 66, 44, "2 petunjuk", 10, W.merah)),
      tambah("satu", teks("s1", 232, 44, "1 karya", 10, W.hijau)),
      sorotkan("boneka", "bn"),
      ubah("kain.", { id: "bs", isi: E.senyum }),
      tambah("kain.", emo("tp2", 238, 150, E.tepuk, 22)),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_P1 = "Semua karya sudah di tempat yang tepat, dan Pak Hasan tersenyum puas.";
const SUARA_P2 = "Dika merangkum. Tentukan dulu siapa yang melihat, pakai benda acuan, lalu sebut kata posisinya.";
const SUARA_P3 = "Bu Sari melambai. Besok Bu Mira datang membawa manik-manik. Menurutmu, kalau manik merah, biru, merah, biru, manik berikutnya warna apa? Terima kasih, Chacha, Dika, Nia, Bu Sari, dan Pak Hasan!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Semua di tempatnya",
  sumber: "Materi: penutup dan jembatan",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_P1,
      bersih(0),
      tambah(0, judul("Semua di Tempatnya"), lantai("lt"), ...rak("rk", 84, 60, 132, 106)),
      tambah("karya", karya("gc", "guci", 130, 49), karya("wy", "wayang", 170, 49), karya("bn", "boneka", 205, 49)),
      tambah("tempat", karya("lm", "lampion", 118, 102), karya("tp", "topeng", 128, 110, { z: 3 }), karya("kd", "kendi", 150, 155)),
      tambah("Pak", ...tokoh("ph", 36, 178, "Pak Hasan")),
      ubah("tersenyum", { id: "ph", isi: E.senyum }),
      tambah("puas.", emo("ok", 250, 100, E.benar, 24)),
    ),
    k(
      SUARA_P2,
      bersih(0),
      tambah(0, judul("Tiga Langkah"), ...papanCatat("pc", 40, 30, 220, 112)),
      tambah("Dika", ...tokoh("dk", 36, 178, "Dika")),
      tambah("siapa", teks("c1", 150, 64, "1  tentukan siapa yang melihat", 9.6)),
      tambah("acuan,", teks("c2", 150, 92, "2  pakai benda acuan", 9.6)),
      tambah("posisinya.", teks("c3", 150, 120, "3  sebut kata posisinya", 9.6, W.merah)),
    ),
    k(
      SUARA_P3,
      bersih(0),
      tambah(0, judul("Sampai Besok"), lantai("lt")),
      tambah("Sari", ...tokoh("bs", 210, 170, "Bu Sari")),
      tambah("melambai.", emo("lb", 210, 136, E.lambai, 22)),
      tambah("manik-manik.", ...kartu("km", 110, 96, 80, 30, W.krem, ["kotak manik"], 8.6)),
      tambah("merah,", bulat("m1", 84, 66, 8, "#EF4444")),
      tambah("biru,", bulat("m2", 112, 66, 8, "#3B82F6")),
      tambah("merah,@2", bulat("m3", 140, 66, 8, "#EF4444")),
      tambah("biru,@2", bulat("m4", 168, 66, 8, "#3B82F6")),
      tambah("warna", emo("mq", 204, 72, E.tanya, 22)),
      tambah("Chacha,", ...tokoh("ch", 30, 178, "Chacha")),
      tambah("Dika,", ...tokoh("dk", 90, 178, "Dika")),
      tambah("Nia,", ...tokoh("ni", 150, 178, "Nia")),
      tambah("Hasan!", ...tokoh("ph", 270, 168, "Pak Hasan")),
    ),
  ],
};
