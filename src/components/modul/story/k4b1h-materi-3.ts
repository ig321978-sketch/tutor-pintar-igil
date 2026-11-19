import type { AdeganStory } from "./logika-story";
import { E, W, angkaSus, bulat, emo, garis, garisSus, judul, kotak, lorong, panah, pintu, poligon, teks, tokoh } from "./k4b1h-gambar";
import { hapus, k, sorotkan, tambah, ubah } from "./k4b1h-bantu";

/*
 * Cerita orisinal IGIL "Papan Jatah Bu Ratna" (Kelas 4 Bab 1 Sub-Bab H), cerita Penginapan Pulau Karang Indah.
 * Naskah suara dari naskah/story-naskah-k4b1h.md. Bagian ini: memeriksa dengan perkalian, sisa pembagian, penutup (jembatan ke Sub-Bab I).
 */

/* ------------------------------ 7. Memeriksa dengan perkalian ------------------------------ */
const SUARA_P1 = "Genta memeriksa dengan perkalian, empat belas kali empat.";
const SUARA_P2 = "Empat kali empat enam belas, tulis enam dan simpan satu, lalu satu kali empat ditambah satu sama dengan lima.";
const SUARA_P3 = "Hasilnya lima puluh enam, sama dengan jumlah tamu, jadi pembagiannya benar.";
const MX = 88;
const MY = 84;

export const ADEGAN_PERIKSA: AdeganStory = {
  id: "periksa",
  judul: "Memeriksa dengan perkalian",
  sumber: "Materi: memeriksa hasil",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_P1,
      tambah(0, judul("Memeriksa dengan Perkalian"), ...tokoh("ge", 240, 184, "Genta")),
      tambah("memeriksa", emo("ma", 60, 70, E.mata, 22)),
      tambah("belas", angkaSus("m1", MX, MY, 0, 0, "1"), angkaSus("m2", MX, MY, 1, 0, "4"), teks("k14", 205, 60, "14 × 4", 12, W.coklat)),
      tambah("kali", teks("kx", MX - 9, MY + 15, "×", 14)),
      tambah("empat@2", angkaSus("m3", MX, MY, 1, 1, "4"), garisSus("gp", MX, MY, 0, 1, 1)),
    ),
    k(
      SUARA_P2,
      tambah("belas,", teks("c1", 205, 80, "4 × 4 = 16", 10, W.coklat)),
      tambah("enam@2", angkaSus("r2", MX, MY, 1, 2, "6", W.merah)),
      tambah("simpan", angkaSus("cy", MX, MY, 0, -1, "1", W.merah, 9)),
      tambah("satu@2", teks("c2", 205, 100, "1 × 4 + 1 = 5", 10, W.coklat)),
      tambah("lima.", angkaSus("r1", MX, MY, 0, 2, "5", W.merah)),
    ),
    k(
      SUARA_P3,
      sorotkan("lima", "r1", "r2"),
      tambah("tamu,", teks("t56", 190, 160, "56 tamu", 9, W.coklat), teks("h56", 205, 136, "56", 22, W.hijauTua)),
      tambah("benar.", emo("ok", 266, 120, E.benar, 24)),
    ),
  ],
};

/* ------------------------------ 8. Sisa pembagian ------------------------------ */
const SUARA_Q1 = "Bu Ratna bertanya, bagaimana kalau tamunya lima puluh sembilan?";
const SUARA_Q2 = "Laras membagi, hasilnya empat belas sisa tiga, karena tiga tamu tidak cukup untuk empat kamar.";
const SUARA_Q3 = "Sisanya selalu lebih kecil daripada pembagi, dan kali ini ditempatkan di aula.";
const SISA_X = [236, 244, 252];

export const ADEGAN_SISA: AdeganStory = {
  id: "sisa",
  judul: "Kalau tamunya bersisa",
  sumber: "Materi: sisa pembagian",
  latar: "#FEFCE8",
  ketukan: [
    k(
      SUARA_Q1,
      tambah(0, judul("Bagaimana Kalau Bersisa?"), ...tokoh("br", 50, 184, "Bu Ratna")),
      tambah("bertanya,", emo("tq", 92, 150, E.tanya, 20)),
      tambah("lima", teks("n59", 170, 66, "59 tamu", 16, W.merah)),
      tambah("sembilan?", teks("bg", 170, 100, "59 : 4 = ?", 18, W.biru)),
    ),
    k(
      SUARA_Q2,
      tambah("membagi,", ...tokoh("lr", 140, 184, "Laras")),
      ubah("belas", { id: "bg", isi: "59 : 4 = 14 sisa 3", u: 13 }),
      tambah("tiga,", ...SISA_X.map((x, i) => bulat(`s${i}`, x, 128, 3, "#FDBA74", "#7C2D12", { tebal: 0.7, z: 4 }))),
      tambah("tamu", teks("t3", 270, 112, "3 tamu", 9, W.coklat)),
      tambah("kamar.", teks("k4", 190, 128, "4 kamar", 9, W.coklat)),
    ),
    k(
      SUARA_Q3,
      hapus("lebih", "k4", "t3"),
      tambah("lebih", teks("sk", 170, 128, "sisa 3 < pembagi 4", 9, W.hijauTua)),
      sorotkan("pembagi,", "s0", "s1", "s2"),
      tambah("ditempatkan", panah("pa", 244, 136, 12, 14, W.merah, 2)),
      tambah("aula.", kotak("al", 238, 152, 40, 16, "#FFFFFF", W.biru, { rx: 3 }), teks("at", 258, 164, "AULA", 10, W.merah)),
    ),
  ],
};

/* ------------------------------ 9. Penutup: jembatan ke Sub-Bab I ------------------------------ */
const SUARA_N1 = "Semua kamar sudah terisi rata, dan Bu Ratna berterima kasih.";
const SUARA_N2 = "Kak Yoga, pemandu pantai, datang membawa payung dan jadwal perahu yang masih berantakan.";
const SUARA_N3 = "Menurutmu, bagaimana cara menata payung dalam baris sama banyak? Terima kasih, Satria, Laras, Genta, Pak Hendro, dan Bu Ratna!";
const PX = [100, 138, 176, 214];
/** Payung kecil `${id}` bertitik tengah (x, y): kanopi `${id}` dan gagang `${id}-g`. */
const payung = (id: string, x: number, y: number, warna: string) => [poligon(id, [[x - 9, y], [x, y - 10], [x + 9, y]], warna, "#9F1239", { z: 3 }), garis(`${id}-g`, x, y, 0, 12, "#7C2D12", 1.2, { z: 3 })];

export const ADEGAN_PENUTUP: AdeganStory = {
  id: "penutup",
  judul: "Semua kamar terisi, ke Sub-Bab berikutnya",
  sumber: "Materi: penutup dan lanjutan",
  latar: "#FFF1F2",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Semua Kamar Terisi"), ...lorong("lr", 150), ...PX.flatMap((x, i) => pintu(`p${i}`, x, 96, i + 1, 30, 52))),
      tambah("terisi", ...PX.map((x, i) => emo(`w${i}`, x + 15, 90, E.lambai, 16))),
      tambah("Ratna", ...tokoh("br", 40, 184, "Bu Ratna")),
      tambah("kasih.", emo("sn", 66, 150, E.senyum, 18)),
    ),
    k(
      SUARA_N2,
      tambah("Yoga,", ...tokoh("ky", 268, 170, "Kak Yoga", 24)),
      tambah("payung", ...payung("py1", 258, 130, "#F43F5E"), ...payung("py2", 276, 130, "#38BDF8"), ...payung("py3", 267, 118, "#FACC15")),
      tambah("jadwal", kotak("jg", 232, 96, 22, 14, "#FEF3C7", W.coklat, { rx: 2 }), teks("jt", 243, 106, "jadwal", 6.4, W.biru)),
      tambah("berantakan.", teks("bt", 262, 84, "berantakan", 8, W.merah)),
    ),
    k(
      SUARA_N3,
      hapus("menata", "bt", "jt", "jg"),
      tambah("menata", emo("tq", 224, 78, E.tanya, 26)),
      tambah("baris", teks("bb", 150, 60, "baris sama banyak", 10, W.hijauTua)),
      tambah("Terima", ...tokoh("sa", 100, 184, "Satria"), ...tokoh("lr2", 140, 184, "Laras"), ...tokoh("ge", 180, 184, "Genta"), ...tokoh("ph", 224, 184, "Pak Hendro")),
      tambah("kasih,", ...[100, 140, 180, 224, 268].map((x, i) => emo(`wl${i}`, x + 14, 148, E.lambai, 14))),
    ),
  ],
};
