import type { AdeganStory } from "./logika-story";
import { E, W, bulat, busurDerajat, ember, emo, garis, judul, juring, kaki, teks, tokoh } from "./k3b4B-gambar";
import { bersih, hapus, k, sorotkan, tambah } from "./k3b4B-bantu";

/*
 * Cerita orisinal IGIL "Sudut Kak Anton" (Kelas 3 Bab 4 Sub-Bab B), tengah cerita Festival Layang-layang Kampung.
 * Naskah suara dari naskah/story-naskah-k3b4b.md. Bagian ini: membaca skala yang benar, sudut refleks berpasangan, dan penutup menuju Sub-Bab C.
 */
const ABU = "#64748B";

/* ------------------------------ 7. Membaca skala yang benar ------------------------------ */
const SUARA_B1 = "Salsa menggeser pandangannya ke skala yang dimulai dari garis nol di kaki pertama.";
const SUARA_B2 = "Kaki kedua menunjuk lima puluh derajat.";
const SUARA_B3 = "Raka cemberut dan mengambil ember, karena taruhan tetap taruhan.";

export const ADEGAN_BACA_BENAR: AdeganStory = {
  id: "baca-benar",
  judul: "Membaca skala yang benar",
  sumber: "Materi: membaca skala busur dari nol",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Skala dari Garis Nol"), ...busurDerajat("bs", 150, 165, 96), kaki("b1", 150, 165, 100, 0, W.bambu, 3), kaki("b2", 150, 165, 100, 50, W.merah, 3)),
      tambah("Salsa", ...tokoh("sl", 40, 184, "Salsa")),
      tambah("menggeser", emo("mt", 70, 146, E.mata, 18)),
      sorotkan("skala", ...[0, 30, 60, 90, 120, 150, 180].map((t) => `bs-a${t}`)),
      tambah("garis", emo("ok0", 262, 140, E.benar, 18)),
    ),
    k(
      SUARA_B2,
      tambah("Kaki", teks("t50", 224, 78, "50°", 13, W.hijauTua)),
      tambah("menunjuk", emo("ok", 262, 76, E.benar, 18)),
      tambah("lima", teks("s130", 266, 116, "130°", 11, W.merah, { op: 0.6 }), garis("cr", 252, 120, 30, -12, W.merah, 2)),
    ),
    k(
      SUARA_B3,
      hapus("Raka", "mt", "ok0"),
      tambah("Raka", ...tokoh("rk", 270, 184, "Raka")),
      tambah("cemberut", emo("cb", 270, 148, E.cemberut, 20)),
      tambah("ember,", ...ember("em", 224, 168)),
      tambah("taruhan", teks("tr", 150, 190, "taruhan", 13, W.merah)),
    ),
  ],
};

/* ------------------------------ 8. Sudut refleks ------------------------------ */
const SUARA_R1 = "Sudut yang lebih besar daripada seratus delapan puluh derajat disebut sudut refleks.";
const SUARA_R2 = "Satu putaran penuh adalah tiga ratus enam puluh derajat.";
const SUARA_R3 = "Sudut refleks tiga ratus derajat berpasangan dengan sudut enam puluh derajat, dan jumlahnya tiga ratus enam puluh.";
const VX = 110;
const VY = 125;

export const ADEGAN_REFLEKS: AdeganStory = {
  id: "refleks",
  judul: "Sudut refleks dan satu putaran",
  sumber: "Materi: sudut refleks dan pasangannya",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Sudut Refleks")),
      tambah("besar", garis("dl", VX, VY, -62, 0, ABU, 1.4, { putus: true, z: 5 }), teks("d180", 32, 118, "180°", 10, W.hijauTua)),
      tambah("daripada", juring("jr", VX, VY, 62, 0, 240, "#DDD6FE", W.ungu)),
      tambah("disebut", kaki("r1", VX, VY, 62, 0, W.ungu, 3), kaki("r2", VX, VY, 62, 240, W.ungu, 3)),
      tambah("refleks.", teks("rf", 228, 100, "refleks", 11, W.ungu)),
    ),
    k(
      SUARA_R2,
      tambah("Satu", teks("n1", 228, 60, "1 putaran", 10, W.hijauTua)),
      tambah("putaran", bulat("lg", VX, VY, 62, undefined, W.biru, { z: 6, tebal: 1.6 })),
      tambah("tiga", teks("d360", 228, 150, "360°", 16, W.merah)),
    ),
    k(
      SUARA_R3,
      hapus("Sudut", "dl", "d180", "jr", "r1", "r2", "rf", "lg", "n1", "d360"),
      tambah("refleks", juring("q300", VX, VY, 62, 60, 360, "#DDD6FE", W.ungu), teks("d300", 64, 84, "300°", 11, W.ungu)),
      tambah("enam", juring("q60", VX, VY, 62, 0, 60, "#FED7AA", W.oranye), teks("d60", 160, 100, "60°", 11, W.oranye)),
      tambah("jumlahnya", teks("eq", 205, 186, "300° + 60° = 360°", 12, W.hijauTua)),
    ),
  ],
};

/* ------------------------------ 9. Penutup ------------------------------ */
const SUARA_Z1 = "Raka mencuci semua tali layang-layang sambil bersenandung kesal.";
const SUARA_Z2 = "Besok Pak Samsul, panitia lomba, akan datang membawa tali lintasan.";
const SUARA_Z3 = "Menurutmu, kalau dua tali lintasan ditarik pada jarak yang selalu sama, apakah keduanya akan bertemu? Terima kasih, Raka, Salsa, Bima, Pak Joko, dan Kak Anton!";

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Tali dicuci dan jembatan ke Sub-Bab C",
  sumber: "Materi: tali dicuci dan Pak Samsul",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_Z1,
      tambah(0, judul("Tali Bersih"), garis("jm", 20, 80, 260, 0, ABU, 1.4, { z: 0 })),
      tambah("Raka", ...tokoh("rk", 60, 184, "Raka")),
      tambah("mencuci", ...ember("em", 96, 130)),
      tambah("tali", emo("ly1", 70, 104, E.layang, 22), emo("ly2", 150, 104, E.layang, 22), emo("ly3", 230, 104, E.layang, 22)),
      tambah("bersenandung", emo("no", 30, 146, "\u{1F3B5}", 18)),
    ),
    k(
      SUARA_Z2,
      tambah("Pak", ...tokoh("ps", 270, 184, "Pak Samsul")),
      tambah("membawa", emo("bn", 236, 160, E.benang, 22)),
      tambah("lintasan.", garis("tl1", 226, 168, -90, 0, W.oranye, 2.4), garis("tl2", 226, 176, -90, 0, W.oranye, 2.4)),
    ),
    k(
      SUARA_Z3,
      bersih(0),
      tambah(0, judul("Sampai Besok"), garis("p1", 40, 60, 220, 0, W.biru, 3), garis("p2", 40, 100, 220, 0, W.biru, 3)),
      tambah("dua", teks("n2", 150, 42, "2 tali", 11, W.merah)),
      tambah("bertemu?", teks("q", 150, 90, "?", 20, W.merah)),
      tambah("Raka,", ...tokoh("rk", 30, 184, "Raka"), emo("l1", 30, 146, E.lambai, 16)),
      tambah("Salsa,", ...tokoh("sl", 82, 184, "Salsa"), emo("l2", 82, 146, E.lambai, 16)),
      tambah("Bima,", ...tokoh("bm", 134, 184, "Bima"), emo("l3", 134, 146, E.lambai, 16)),
      tambah("Pak", ...tokoh("pj", 186, 184, "Pak Joko"), emo("l4", 186, 146, E.lambai, 16)),
      tambah("Anton!", ...tokoh("ka", 242, 184, "Kak Anton"), emo("l5", 242, 146, E.lambai, 16)),
    ),
  ],
};
