import type { AdeganStory } from "./logika-story";
import { E, GB_DEKAT, GB_LUAR, W, WT, emo, idTitikGB, judul, kartu, panah, patokanGB, ruasGB, rumput, sumbuGB, teks, titikGB, tokoh, xGB } from "./k5b1b-gambar";
import { hapus, k, pudarkan, redamkan, sorotkan, tambah } from "./k5b1b-bantu";

/*
 * Cerita orisinal IGIL "Urutan Tribun Pak Hasto" (Kelas 5 Bab 1 Sub-Bab B), video metode global.
 * Naskah suara dari naskah/story-naskah-k5b1b.md. Bagian ini: Line It Up (Letakkan di Garis), Pick a Marker (Pilih Patokan), terapannya, dan ringkasan.
 */

/* ------------------------------ Line It Up: konsep ------------------------------ */
const SUARA_G1 = "Cara kedua, Line It Up, atau Letakkan di Garis.";
const SUARA_G2 = "Kita menggambar garis, memberi patokan di ujungnya, lalu menaruh tiap bilangan sesuai tempatnya.";
const SUARA_G3 = "Bilangan yang lebih ke kanan pasti lebih besar, sehingga urutannya langsung tampak.";
const SUARA_G4 = "Jarak antar bilangan juga terlihat, jadi kita tahu mana yang berdekatan.";

export const ADEGAN_LUAR_GARIS: AdeganStory = {
  id: "luar-garis",
  judul: "Line It Up: Letakkan di Garis",
  sumber: "Metode global: Line It Up (konsep)",
  latar: "#ECFEFF",
  ketukan: [
    k(
      SUARA_G1,
      tambah(0, judul("Cara 2: Line It Up"), ...rumput("rp", 150)),
      tambah("Line", emo("pg", 110, 112, E.penggaris, 40)),
      tambah("Letakkan", teks("nm", 150, 140, "Letakkan di Garis", 13, W.ungu, { z: 3 }), emo("kl", 232, 104, E.kilau, 28)),
    ),
    k(
      SUARA_G2,
      hapus(0, "pg", "nm", "kl"),
      tambah("garis", sumbuGB("gb", GB_LUAR)),
      tambah("patokan", ...patokanGB("gb", GB_LUAR, [0], 0), ...patokanGB("gb", GB_LUAR, [40000], 1)),
      tambah("menaruh", ...titikGB("pa", GB_LUAR, 12000, "", WT[0], 16)),
      tambah("bilangan", ...titikGB("pb", GB_LUAR, 35000, "", WT[1], 16)),
      tambah("tempatnya", ...titikGB("pc", GB_LUAR, 36000, "", WT[2], 30)),
    ),
    k(
      SUARA_G3,
      tambah("kanan", panah("mb", 60, 138, 170, 0, W.hijau, 2.4, { z: 6 }), teks("tb", 145, 148, "makin besar", 8, W.hijauTua, { z: 3 })),
      tambah("besar", emo("jp", 150, 54, E.jempol, 20)),
      sorotkan("urutannya", "pa-p", "pb-p", "pc-p"),
      tambah("tampak", emo("mt", 210, 54, E.mata, 18)),
    ),
    k(
      SUARA_G4,
      hapus(0, "mb", "tb", "jp", "mt"),
      tambah("Jarak", ruasGB("rj", GB_LUAR, 12000, 35000, W.merah)),
      tambah("terlihat", teks("jh", 150, 92, "jauh", 9, W.merah, { z: 3 })),
      tambah("mana", ruasGB("rd", GB_LUAR, 35000, 36000, W.hijau)),
      tambah("berdekatan", teks("dk", 254, 50, "dekat", 9, W.hijauTua, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Line It Up: terapan ------------------------------ */
const SUARA_H1 = "Fajar menaruh tiga bilangan di garis: dua belas ribu, tiga puluh lima ribu, dan tiga puluh enam ribu.";
const SUARA_H2 = "Dua belas ribu ada di kiri, sedangkan dua yang lain berdempetan di kanan.";
const SUARA_H3 = "Cocok untuk mengurutkan banyak bilangan sekaligus dan melihat jaraknya.";
const SUARA_H4 = "Kurang cocok untuk dua bilangan yang selisihnya kecil, karena titiknya hampir menumpuk.";

export const ADEGAN_LUAR_GARIS_TERAPAN: AdeganStory = {
  id: "luar-garis-terapan",
  judul: "Line It Up: terapan",
  sumber: "Metode global: Line It Up (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_H1,
      tambah(0, judul("Fajar Menaruh di Garis"), ...rumput("rp", 150), ...tokoh("fa", 36, 184, "Fajar"), sumbuGB("gb", GB_LUAR), ...patokanGB("gb", GB_LUAR, [0, 10000, 20000, 30000, 40000], 0)),
      tambah("tiga", teks("n3", 150, 50, "3 bilangan", 10, W.ungu, { z: 3 })),
      tambah("dua", ...titikGB("c0", GB_LUAR, 12000, "", WT[0], 16)),
      tambah("tiga@2", ...titikGB("c1", GB_LUAR, 35000, "", WT[1], 16)),
      tambah("tiga@3", ...titikGB("c2", GB_LUAR, 36000, "", WT[2], 30)),
    ),
    k(
      SUARA_H2,
      sorotkan("Dua", "c0-p", "c0-q"),
      tambah("kiri", teks("kr", 60, 70, "di kiri", 9, W.hijauTua, { z: 3 })),
      sorotkan("dua@2", "c1-p", "c2-p"),
      tambah("berdempetan", teks("dp", 244, 50, "2 berdempetan", 8, W.merah, { z: 3 })),
    ),
    k(
      SUARA_H3,
      hapus(0, "kr", "dp"),
      tambah("Cocok", emo("jp", 60, 56, E.jempol, 22)),
      tambah("banyak", panah("mb", 60, 138, 170, 0, W.hijau, 2.4, { z: 6 }), teks("tb", 145, 148, "makin besar", 8, W.hijauTua, { z: 3 })),
      tambah("melihat", emo("mt", 150, 72, E.mata, 18)),
      tambah("jaraknya", ruasGB("rj", GB_LUAR, 12000, 35000, W.merah)),
    ),
    k(
      SUARA_H4,
      hapus(0, "jp", "mb", "tb", "mt", "rj"),
      tambah("Kurang", emo("xs", 60, 56, E.salah, 22)),
      tambah("dua", teks("n2", 190, 64, "2 bilangan", 8, W.merah, { z: 3 })),
      tambah("selisihnya", ruasGB("rk", GB_LUAR, 35000, 36000, W.merah)),
      tambah("hampir", emo("tn", 254, 48, E.tanya, 18)),
      tambah("menumpuk", teks("tm", 254, 140, "menumpuk", 8, W.merah, { z: 3 })),
    ),
  ],
};

/* ------------------------------ Pick a Marker: konsep ------------------------------ */
const SUARA_M1 = "Cara ketiga, Pick a Marker, atau Pilih Patokan.";
const SUARA_M2 = "Kita memilih bilangan bulat yang dekat, misalnya sepuluh ribu atau dua puluh ribu, sebagai patokan.";
const SUARA_M3 = "Setiap bilangan dibandingkan dengan patokannya, apakah lebih besar atau lebih kecil.";
const SUARA_M4 = "Dengan begitu kita bisa memperkirakan urutan sebelum membandingkan dengan teliti.";

export const ADEGAN_LUAR_PATOKAN: AdeganStory = {
  id: "luar-patokan",
  judul: "Pick a Marker: Pilih Patokan",
  sumber: "Metode global: Pick a Marker (konsep)",
  latar: "#FEF2F2",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Cara 3: Pick a Marker"), ...rumput("rp", 150)),
      tambah("Pick", emo("pg", 110, 112, E.bendera, 40)),
      tambah("Pilih", teks("nm", 150, 140, "Pilih Patokan", 13, W.ungu, { z: 3 }), emo("kl", 210, 104, E.kilau, 28)),
    ),
    k(
      SUARA_M2,
      hapus(0, "pg", "nm", "kl"),
      tambah("bilangan", sumbuGB("gb", GB_LUAR)),
      tambah("dekat", ...titikGB("q0", GB_LUAR, 18000, "", WT[1], 16)),
      tambah("sepuluh", ...patokanGB("gb", GB_LUAR, [10000], 1), emo("fl1", xGB(GB_LUAR, 10000), 140, E.bendera, 14)),
      tambah("dua", ...patokanGB("gb", GB_LUAR, [20000], 2), emo("fl2", xGB(GB_LUAR, 20000), 140, E.bendera, 14)),
      tambah("patokan", teks("ky", 150, 60, "patokan", 10, W.ungu, { z: 3 })),
    ),
    k(
      SUARA_M3,
      hapus(0, "ky"),
      sorotkan("Setiap", "q0-p"),
      tambah("dibandingkan", ruasGB("sq0", GB_LUAR, 18000, 20000, W.merah)),
      tambah("besar", ...titikGB("q1", GB_LUAR, 26000, "", WT[2], 16), ruasGB("sq1", GB_LUAR, 20000, 26000, W.hijau), teks("kb", 224, 60, "lebih besar", 8, W.hijauTua, { z: 3 })),
      tambah("kecil", teks("kk", 120, 60, "lebih kecil", 8, W.merah, { z: 3 })),
    ),
    k(
      SUARA_M4,
      hapus(0, "kk", "kb"),
      tambah("memperkirakan", teks("pk", 150, 60, "perkiraan", 10, W.ungu, { z: 3 })),
      sorotkan("urutan", "q0-p", "q1-p"),
      tambah("sebelum", emo("kl", 60, 56, E.kilau, 18)),
      tambah("teliti", emo("ok", 240, 56, E.benar, 20)),
    ),
  ],
};

/* ------------------------------ Pick a Marker: terapan ------------------------------ */
const SUARA_N1 = "Bima memakai patokan lima puluh ribu untuk empat puluh sembilan ribu delapan ratus dan lima puluh ribu dua ratus.";
const SUARA_N2 = "Yang pertama sedikit di bawah patokan, yang kedua sedikit di atasnya.";
const SUARA_N3 = "Cocok untuk perkiraan cepat, karena kita tidak perlu membaca semua angkanya.";
const SUARA_N4 = "Kurang cocok untuk dua bilangan di sisi patokan yang sama, karena patokan tidak membedakan keduanya.";

export const ADEGAN_LUAR_PATOKAN_TERAPAN: AdeganStory = {
  id: "luar-patokan-terapan",
  judul: "Pick a Marker: terapan",
  sumber: "Metode global: Pick a Marker (terapan)",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Bima Memakai Patokan"), ...rumput("rp", 150), ...tokoh("bi", 36, 184, "Bima"), sumbuGB("gb", GB_DEKAT), ...patokanGB("gb", GB_DEKAT, [45000], 0), ...patokanGB("gb", GB_DEKAT, [55000], 2)),
      tambah("patokan", ...patokanGB("gb", GB_DEKAT, [50000], 1), emo("fl", xGB(GB_DEKAT, 50000), 140, E.bendera, 14)),
      tambah("empat", ...titikGB("d0", GB_DEKAT, 49800, "", WT[0], 16)),
      tambah("lima@2", ...titikGB("d1", GB_DEKAT, 50200, "", WT[1], 30)),
    ),
    k(
      SUARA_N2,
      sorotkan("pertama", "d0-p"),
      tambah("bawah", teks("bw", 84, 48, "di bawah patokan", 8, W.merah, { z: 3 })),
      sorotkan("kedua", "d1-p"),
      tambah("atasnya", teks("at", 216, 48, "di atas patokan", 8, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_N3,
      hapus(0, "bw", "at"),
      tambah("Cocok", emo("jp", 270, 56, E.jempol, 22)),
      tambah("perkiraan", teks("pq", 150, 40, "perkiraan cepat", 9, W.ungu, { z: 3 })),
      tambah("tidak", teks("tp", 150, 56, "cukup lihat patokan", 8, W.hijauTua, { z: 3 })),
      tambah("semua", emo("mt", 60, 56, E.mata, 18)),
    ),
    k(
      SUARA_N4,
      hapus(0, "jp", "pq", "tp", "mt", ...idTitikGB("d0", false), ...idTitikGB("d1", false)),
      tambah("Kurang", emo("xs", 270, 56, E.salah, 22)),
      tambah("dua", teks("n2", 150, 40, "2 bilangan", 9, W.merah, { z: 3 })),
      tambah("sisi", ...titikGB("e0", GB_DEKAT, 46000, "", WT[2], 16), ...titikGB("e1", GB_DEKAT, 47500, "", WT[3], 30)),
      sorotkan("sama", "e0-p", "e1-p"),
      tambah("membedakan", emo("tn", 150, 72, E.tanya, 18)),
    ),
  ],
};

/* ------------------------------ Ringkasan ------------------------------ */
const SUARA_R1 = "Tiga cara sudah kita pelajari bersama Pak Hasto, dan masing-masing punya saat yang tepat.";
const SUARA_R2 = "Dua bilangan yang mirip, pakai Kiri Dulu. Banyak bilangan, pakai Letakkan di Garis. Perkiraan cepat, pakai Pilih Patokan.";
const SUARA_R3 = "Apa pun caranya, ingat bahwa bilangan yang angkanya lebih banyak pasti lebih besar.";
const SUARA_R4 = "Menurutmu, untuk membandingkan sembilan ribu dengan sepuluh ribu satu, cara mana yang paling pas?";

export const ADEGAN_LUAR_RINGKAS: AdeganStory = {
  id: "luar-ringkas",
  judul: "Ringkasan tiga cara",
  sumber: "Metode global: ringkasan tiga cara",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Tiga Cara Pak Hasto"), ...rumput("rp", 150), teks("n3", 240, 44, "3 cara", 10, W.ungu, { z: 3 })),
      tambah("pelajari", ...kartu("r0", 10, 34, 170, 30, W.biruMuda, ["Kiri Dulu"], 10), ...kartu("r1", 10, 74, 170, 30, W.merahMuda, ["Letakkan di Garis"], 10), ...kartu("r2", 10, 114, 170, 30, "#EDE9FE", ["Pilih Patokan"], 10)),
      tambah("Hasto", ...tokoh("ph", 262, 184, "Pak Hasto")),
      tambah("tepat", emo("kl", 214, 94, E.kilau, 24)),
    ),
    k(
      SUARA_R2,
      tambah("Dua", teks("n2", 240, 72, "2 bilangan", 9, W.merah, { z: 3 })),
      sorotkan("Kiri", "r0-k"),
      tambah("Kiri", emo("e1", 214, 52, E.kiri, 18)),
      redamkan("Banyak", "r0-k"),
      sorotkan("Banyak", "r1-k"),
      tambah("Banyak", emo("e2", 214, 90, E.penggaris, 18)),
      redamkan("Perkiraan", "r1-k"),
      sorotkan("Perkiraan", "r2-k"),
      tambah("Perkiraan", emo("e3", 214, 128, E.bendera, 18)),
    ),
    k(
      SUARA_R3,
      hapus(0, "n2", "e1", "e2", "e3", "kl"),
      redamkan(0, "r2-k"),
      tambah("ingat", teks("ig", 240, 76, "ingat!", 10, W.merah, { z: 3 })),
      tambah("banyak", teks("l5", 240, 96, "5 angka", 9, W.biru, { z: 3 }), teks("l4", 240, 110, "4 angka", 9, W.biru, { z: 3 })),
      tambah("besar", teks("lb", 240, 130, "lebih besar", 9, W.hijauTua, { z: 3 })),
    ),
    k(
      SUARA_R4,
      hapus(0, "l5", "l4", "lb", "ig"),
      tambah("sembilan", teks("q9", 240, 70, "9.000", 12, W.biru, { z: 3 })),
      tambah("sepuluh", teks("q10", 240, 92, "10.001", 12, W.biru, { z: 3 })),
      tambah("cara", emo("tn", 240, 128, E.tanya, 24)),
      pudarkan("mana", "n3"),
      sorotkan("pas", "r0-k", "r1-k", "r2-k"),
    ),
  ],
};
