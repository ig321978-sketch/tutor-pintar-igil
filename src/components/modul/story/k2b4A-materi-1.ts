import type { AdeganStory } from "./logika-story";
import { E, W, atapKain, emo, judul, kartu, karya, lantai, letakKarya, meja, panah, pindahTokoh, rak, teks, tokoh } from "./k2b4A-gambar";
import { bersih, hapus, k, redamkan, sorotkan, tambah, ubah } from "./k2b4A-bantu";

/*
 * Cerita orisinal IGIL "Rak Pameran Pak Hasan" (Kelas 2 Bab 4 Sub-Bab A, posisi benda), awal cerita Pameran Kerajinan Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b4a.md. Bagian ini: rak datang, atas dan bawah, depan dan belakang.
 */

/* ------------------------------ 1. Rak datang ------------------------------ */
const SUARA_R1 = "Pameran kerajinan sekolah akan dibuka hari Sabtu, dan Pak Hasan mengantar rak-rak kayu ke aula.";
const SUARA_R2 = "Bu Sari membawa kartu denah. Setiap karya harus di tempat yang tertulis.";
const SUARA_R3 = "Kalau salah taruh, pengunjung tidak menemukan karya, dan pameran jadi kacau!";

export const ADEGAN_RAK_DATANG: AdeganStory = {
  id: "rak-datang",
  judul: "Rak datang ke aula",
  sumber: "Materi: rak datang ke aula",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Pameran Kerajinan"), lantai("lt"), atapKain("at", 20, 28, 260)),
      tambah("Sabtu,", ...kartu("sb", 108, 56, 84, 18, W.krem, ["Hari Sabtu"], 9)),
      tambah("Hasan", ...tokoh("ph", 34, 178, "Pak Hasan")),
      ubah("mengantar", ...pindahTokoh("ph", 62, 178, "Pak Hasan")),
      tambah("rak-rak", ...rak("rk1", 100, 104, 70, 62)),
      tambah("aula.", ...rak("rk2", 184, 104, 70, 62)),
    ),
    k(
      SUARA_R2,
      hapus(0, "sb-k", "sb-t0"),
      tambah("Sari", ...tokoh("bs", 272, 178, "Bu Sari")),
      tambah("kartu", ...kartu("kd", 196, 60, 76, 36, W.putih, ["Kartu denah", "guci: atas rak"], 7.2)),
      tambah("karya", karya("g1", "guci", 128, 93)),
      sorotkan("tempat", "rk1"),
      sorotkan("tertulis.", "kd-k"),
    ),
    k(
      SUARA_R3,
      hapus(0, "kd-k", "kd-t0", "kd-t1", "g1"),
      redamkan(0, "rk1"),
      tambah("salah", karya("b1", "guci", 88, 158, { rot: 70 }), emo("x1", 88, 138, E.salah, 16)),
      tambah("pengunjung", emo("pj", 22, 150, E.anak, 24)),
      tambah("menemukan", emo("pq", 22, 124, E.tanya, 18)),
      tambah("karya,", karya("b2", "kendi", 232, 156, { rot: -50 })),
      tambah("kacau!", ...kartu("kc", 104, 56, 92, 20, W.merahMuda, ["Pameran kacau!"], 9)),
    ),
  ],
};

/* ------------------------------ 2. Atas dan bawah ------------------------------ */
const SUARA_A1 = "Kartu pertama berbunyi, guci di atas rak. Nia menaruh guci di puncak rak.";
const SUARA_A2 = "Kartu kedua berbunyi, kendi di bawah rak. Dika menyelipkan kendi di kolong rak.";
const SUARA_A3 = "Atas dan bawah menunjukkan tinggi rendahnya letak. Guci di atas rak, jadi rak ada di bawah guci.";

export const ADEGAN_ATAS_BAWAH: AdeganStory = {
  id: "atas-bawah",
  judul: "Atas dan bawah",
  sumber: "Materi: atas dan bawah",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_A1,
      tambah(0, judul("Atas dan Bawah"), lantai("lt"), rak("rk", 84, 90, 132, 76)),
      tambah("Kartu", ...kartu("k1", 98, 28, 104, 22, W.krem, ["guci di atas rak"], 8.4)),
      tambah("guci", karya("gc", "guci", 66, 154)),
      tambah("atas", panah("pa", 232, 102, 0, -28, W.merah, 3), teks("la", 252, 90, "atas", 9, W.merah)),
      tambah("Nia", ...tokoh("ni", 36, 178, "Nia")),
      ubah("puncak", { id: "gc", ...letakKarya("guci", 150, 79) }),
    ),
    k(
      SUARA_A2,
      hapus(0, "k1-k", "k1-t0", "pa", "la"),
      tambah(0, ...kartu("k2", 98, 28, 104, 22, W.krem, ["kendi di bawah rak"], 8.4)),
      tambah("kendi", karya("kd", "kendi", 232, 150)),
      tambah("bawah", panah("pb", 232, 124, 0, 24, W.merah, 3), teks("lb", 254, 138, "bawah", 9, W.merah)),
      tambah("Dika", ...tokoh("dk", 268, 178, "Dika")),
      ubah("kolong", { id: "kd", ...letakKarya("kendi", 150, 155) }),
    ),
    k(
      SUARA_A3,
      hapus(0, "k2-k", "k2-t0", "pb", "lb"),
      tambah("Atas", panah("pu", 44, 118, 0, -30, W.hijau, 3), teks("tu", 44, 132, "atas", 9, W.hijau)),
      tambah("bawah", panah("pd", 246, 92, 0, 30, W.merah, 3), teks("td", 246, 136, "bawah", 9, W.merah)),
      sorotkan("Guci", "gc"),
      tambah("atas@2", ...kartu("kl", 94, 28, 112, 22, W.hijauMuda, ["guci di atas rak"], 8.4)),
      redamkan("rak@2", "gc"),
      sorotkan("rak@2", "rk"),
      sorotkan("bawah@2", "kd", "td"),
    ),
  ],
};

/* ------------------------------ 3. Depan dan belakang ------------------------------ */
const SUARA_D1 = "Kartu ketiga berbunyi, topeng kayu di depan lampion.";
const SUARA_D2 = "Topeng menutupi lampion, jadi yang menutupi ada di depan, dan yang tertutup ada di belakang.";
const SUARA_D3 = "Depan dan belakang juga berlawanan, seperti atas dan bawah.";

export const ADEGAN_DEPAN_BELAKANG: AdeganStory = {
  id: "depan-belakang",
  judul: "Depan dan belakang",
  sumber: "Materi: depan dan belakang",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_D1,
      tambah(0, judul("Depan dan Belakang"), lantai("lt"), meja("mj", 90, 140, 120)),
      tambah("Kartu", ...kartu("k3", 84, 28, 132, 22, W.krem, ["topeng kayu di depan lampion"], 7.6)),
      tambah("topeng", karya("tp", "topeng", 152, 130, { z: 3 })),
      tambah("depan", teks("ld", 204, 132, "depan", 9, W.merah)),
      tambah("lampion.", karya("lm", "lampion", 140, 120)),
    ),
    k(
      SUARA_D2,
      hapus(0, "k3-k", "k3-t0", "ld"),
      sorotkan("Topeng", "tp"),
      redamkan("lampion,", "tp"),
      sorotkan("lampion,", "lm"),
      tambah("depan,", teks("lp", 206, 134, "depan", 10, W.merah), panah("pp", 204, 128, -34, 0, W.merah, 2.4)),
      tambah("belakang.", teks("lbk", 94, 104, "belakang", 10, W.biru), panah("pk", 98, 110, 28, 6, W.biru, 2.4)),
    ),
    k(
      SUARA_D3,
      bersih(0),
      tambah(0, judul("Berlawanan"), lantai("lt")),
      tambah("Depan", ...kartu("pa", 30, 84, 98, 26, W.merahMuda, ["depan - belakang"], 9)),
      tambah("berlawanan,", panah("ka", 132, 92, 36, 0, W.ungu, 2.4), panah("ki", 168, 102, -36, 0, W.ungu, 2.4)),
      tambah("atas@1", ...kartu("pb", 172, 84, 98, 26, W.langit, ["atas - bawah"], 9)),
      tambah("bawah.", emo("hp", 150, 150, E.lampu, 26)),
    ),
  ],
};
