import type { AdeganStory } from "./logika-story";
import { BIRU_PENSIL, KUNING, KUNING_MOBIL, MERAH_BENDA, MERAH_MOBIL, OWL, W, bulat, emo, judul, kartu, kepingBingkai, kotak, mobil, pensilSatu, piring, selBingkai, teks, type Titik } from "./k1b2a-gambar";
import { hapus, hitungAksi, k, redamkan, sorotkan, tambah, ubah } from "./k1b2a-bantu";

/* ------------------------------ 1. Pensil Kira dan Upe digabung ------------------------------ */
const SUARA_N1 = "Kira mempunyai tiga pensil merah. Upe mempunyai empat pensil biru. Mereka ingin menggabungkan semua pensilnya.";
const SUARA_N2 = "Hitung dulu pensil Kira. Satu, dua, tiga. Ada tiga pensil merah. Itu bagian milik Kira.";
const SUARA_N3 = "Sekarang pensil Upe. Satu, dua, tiga, empat. Ada empat pensil biru. Itu bagian milik Upe.";
const SUARA_N4 = "Semua pensil dimasukkan ke satu kotak pensil. Pensil merah dan pensil biru sekarang berkumpul di satu tempat. Rapi sekali, bukan?";
const SUARA_N5 = "Kita hitung semuanya dari awal. Satu, dua, tiga, empat, lima, enam, tujuh.";
const SUARA_N6 = "Tiga pensil merah ditambah empat pensil biru sama dengan tujuh pensil. Menjumlahkan artinya menggabungkan.";
const AWAL: Titik[] = [{ x: 28, y: 86 }, { x: 58, y: 86 }, { x: 88, y: 86 }, { x: 160, y: 86 }, { x: 190, y: 86 }, { x: 220, y: 86 }, { x: 250, y: 86 }];
const DALAM: Titik[] = [54, 86, 118, 150, 182, 214, 246].map((x) => ({ x, y: 156 }));
const pensil = (i: number, p: Titik) => pensilSatu(`pc${i}`, p.x, p.y, i < 3 ? MERAH_BENDA : BIRU_PENSIL, 1.2);

export const ADEGAN_PENSIL: AdeganStory = {
  id: "pensil-digabung",
  judul: "Pensil Kira dan Upe digabung",
  sumber: "Materi: pensil digabung",
  latar: "#F5F3FF",
  ketukan: [
    k(
      SUARA_N1,
      tambah(0, judul("Pensil Kira dan Upe")),
      tambah("Kira", teks("nk", 58, 124, "Kira", 10, W.ungu), ...[0, 1, 2].map((i) => pensil(i, AWAL[i]))),
      tambah("Upe", teks("nu", 205, 124, "Upe", 10, W.ungu), ...[3, 4, 5, 6].map((i) => pensil(i, AWAL[i]))),
    ),
    k(SUARA_N2, ...hitungAksi(SUARA_N2, "ka", AWAL.slice(0, 3), "Kira.")),
    k(SUARA_N3, hapus(0, "tg", "kan0", "kan1", "kan2"), ...hitungAksi(SUARA_N3, "up", AWAL.slice(3), "Upe.")),
    k(
      SUARA_N4,
      hapus(0, "tg", "upn0", "upn1", "upn2", "upn3", "nk", "nu"),
      tambah(0, kotak("kb", 28, 126, 244, 56, "#FDE68A", W.coklat, { rx: 8, tebal: 2, z: -1 })),
      ubah("dimasukkan", ...DALAM.map((p, i) => ({ id: `pc${i}`, x: p.x, y: p.y }))),
    ),
    k(SUARA_N5, ...hitungAksi(SUARA_N5, "pc", DALAM, "awal.")),
    k(SUARA_N6, hapus(0, "tg"), tambah("Tiga", ...kartu("pj", 70, 36, 160, 32, W.emas, ["3 + 4 = 7"], 14)), sorotkan("tujuh", ...DALAM.map((_, i) => `pc${i}`))),
  ],
};

/* ------------------------------ 2. Mobil mainan Malosi ------------------------------ */
const SUARA_M1 = "Malosi bermain mobil mainan di atas karpet. Ada empat mobil kuning di barisan atas.";
const SUARA_M2 = "Ada juga empat mobil merah di barisan bawah. Berapa semua mobil mainan Malosi? Pikirkan dulu jawabanmu.";
const SUARA_M3 = "Kita hitung semuanya. Satu, dua, tiga, empat, lima, enam, tujuh, delapan.";
const SUARA_M4 = "Empat ditambah empat sama dengan delapan. Semuanya ada delapan mobil.";
const SUARA_M5 = "Dua bagian yang sama banyak pun bisa digabung. Hasilnya delapan, dan Malosi senang sekali melihat mobilnya berbaris rapi.";
const PM: Titik[] = [75, 125, 175, 225, 75, 125, 175, 225].map((x, i) => ({ x, y: i < 4 ? 60 : 130 }));
const mob = (i: number) => mobil(`mb${i}`, PM[i].x, PM[i].y, i < 4 ? KUNING_MOBIL : MERAH_MOBIL);

export const ADEGAN_MOBIL: AdeganStory = {
  id: "mobil-mainan",
  judul: "Mobil mainan Malosi",
  sumber: "Materi: mobil mainan",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_M1,
      tambah(0, judul("Mobil mainan Malosi"), kotak("kr", 20, 36, 260, 150, "#FECACA", W.biru, { rx: 10, tebal: 1.5, z: -2 })),
      tambah("empat", ...[0, 1, 2, 3].flatMap(mob)),
    ),
    k(SUARA_M2, tambah("merah", ...[4, 5, 6, 7].flatMap(mob)), tambah("Berapa", emo("tn", 262, 100, "❓", 30))),
    k(SUARA_M3, hapus(0, "tn"), ...hitungAksi(SUARA_M3, "mb", PM)),
    k(SUARA_M4, hapus(0, "tg"), tambah("Empat", ...kartu("mj", 90, 154, 120, 28, W.emas, ["4 + 4 = 8"], 13))),
    k(SUARA_M5, sorotkan("sama", "mb0", "mb1", "mb2", "mb3", "mb4", "mb5", "mb6", "mb7"), tambah("Malosi", emo("ow", 262, 100, OWL, 30))),
  ],
};

/* ------------------------------ 3. Bebek di kolam ------------------------------ */
const SUARA_B1 = "Di kolam ada lima bebek yang sedang berenang. Ayo kita hitung bebeknya satu per satu di layar.";
const SUARA_B2 = "Satu, dua, tiga, empat, lima. Ada lima bebek di kolam.";
const SUARA_B3 = "Lalu datang lagi dua bebek. Bebek yang berenang bertambah banyak, dan kolamnya jadi ramai.";
const SUARA_B4 = "Sekarang kita hitung semua bebek. Satu, dua, tiga, empat, lima, enam, tujuh.";
const SUARA_B5 = "Lima ditambah dua sama dengan tujuh. Sekarang ada tujuh bebek di kolam.";
const PB = Array.from({ length: 7 }, (_, i) => ({ x: 36 + 38 * i, y: 100 }));
const bebek = (i: number, x = PB[i].x) => emo(`bb${i}`, x, PB[i].y, "\u{1F986}", 26);

export const ADEGAN_BEBEK: AdeganStory = {
  id: "bebek-kolam",
  judul: "Bebek di kolam",
  sumber: "Materi: bebek di kolam",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_B1,
      tambah(0, judul("Bebek di kolam"), kotak("kol", 10, 54, 280, 90, "#BFDBFE", "#3B82F6", { rx: 40, tebal: 2, z: -2 })),
      tambah("lima", ...[0, 1, 2, 3, 4].map((i) => bebek(i))),
    ),
    k(SUARA_B2, ...hitungAksi(SUARA_B2, "bb", PB.slice(0, 5))),
    k(
      SUARA_B3,
      hapus(0, "tg"),
      tambah("datang", bebek(5, 284), bebek(6, 284)),
      ubah("bertambah.", { id: "bb5", x: PB[5].x }, { id: "bb6", x: PB[6].x }),
    ),
    k(SUARA_B4, hapus(0, "bbn0", "bbn1", "bbn2", "bbn3", "bbn4"), ...hitungAksi(SUARA_B4, "bb", PB, "bebek.")),
    k(SUARA_B5, hapus(0, "tg"), tambah("Lima", ...kartu("bj", 80, 156, 140, 30, W.emas, ["5 + 2 = 7"], 14)), sorotkan("tujuh", "bb5", "bb6")),
  ],
};

/* ------------------------------ 4. Kelereng di dua piring ------------------------------ */
const SUARA_K1 = "Ayo mencoba! Upe menaruh lima kelereng di satu piring. Wei menaruh tiga kelereng di piring yang lain.";
const SUARA_K2 = "Berapa jumlah semua kelereng? Tebak dulu sebelum menghitung. Ketuk jawabanmu di layar, lalu kita periksa bersama suara guru.";
const SUARA_K3 = "Sekarang kita hitung. Mulai dari piring Upe: satu, dua, tiga, empat, lima.";
const SUARA_K4 = "Lalu piring Wei: satu, dua, tiga. Ada tiga kelereng di piring Wei.";
const SUARA_K5 = "Semua kelereng digabung ke sebuah mangkuk. Kita hitung lagi dari awal. Satu, dua, tiga, empat, lima, enam, tujuh, delapan.";
const SUARA_K6 = "Lima ditambah tiga sama dengan delapan. Jumlah semua kelereng ada delapan. Tebakanmu tadi tepat atau belum?";
const KL_AWAL: Titik[] = [
  { x: 56, y: 96 }, { x: 96, y: 96 }, { x: 76, y: 124 }, { x: 56, y: 150 }, { x: 96, y: 150 },
  { x: 204, y: 100 }, { x: 240, y: 100 }, { x: 222, y: 134 },
];
const KL_DALAM: Titik[] = [{ x: 90, y: 96 }, { x: 130, y: 96 }, { x: 170, y: 96 }, { x: 210, y: 96 }, { x: 90, y: 136 }, { x: 130, y: 136 }, { x: 170, y: 136 }, { x: 210, y: 136 }];
const WARNA_KL = ["#38BDF8", "#F472B6", "#A3E635", "#FB923C", "#818CF8", "#38BDF8", "#F472B6", "#A3E635"];
const kel = (i: number) => bulat(`kl${i}`, KL_AWAL[i].x, KL_AWAL[i].y, 9, WARNA_KL[i], W.biru, { tebal: 2 });

export const ADEGAN_PIRING: AdeganStory = {
  id: "dua-piring",
  judul: "Kelereng Upe dan Wei di dua piring",
  sumber: "Materi: kelereng di dua piring",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_K1,
      tambah(0, judul("Dua piring kelereng"), piring("pl", 76, 122, 54, { z: -1 }), piring("pr", 222, 122, 54, { z: -1 })),
      tambah("Upe", teks("nup", 76, 196, "Upe", 10, W.ungu), ...[0, 1, 2, 3, 4].map(kel)),
      tambah("Wei", teks("nwe", 222, 196, "Wei", 10, W.ungu), ...[5, 6, 7].map(kel)),
    ),
    k(SUARA_K2, tambah("Berapa", emo("tn", 150, 100, "❓", 36)), tambah("Tebak", ...kartu("tb", 90, 32, 120, 26, W.krem, ["tebak dulu"], 10))),
    k(SUARA_K3, hapus(0, "tn", "tb-k", "tb-t0"), ...hitungAksi(SUARA_K3, "pu", KL_AWAL.slice(0, 5), "Upe:")),
    k(SUARA_K4, hapus(0, "tg", "pun0", "pun1", "pun2", "pun3", "pun4"), ...hitungAksi(SUARA_K4, "pw", KL_AWAL.slice(5), "Wei:")),
    k(
      SUARA_K5,
      hapus(0, "tg", "pwn0", "pwn1", "pwn2", "pl", "pr", "nup", "nwe"),
      tambah(0, kotak("mk", 60, 62, 180, 100, "#FDE68A", W.coklat, { rx: 20, tebal: 2, z: -1 })),
      ubah("digabung", ...KL_DALAM.map((p, i) => ({ id: `kl${i}`, x: p.x, y: p.y }))),
      ...hitungAksi(SUARA_K5, "kl", KL_DALAM, "awal."),
    ),
    k(SUARA_K6, hapus(0, "tg"), tambah("Lima", ...kartu("kj", 90, 168, 120, 28, W.emas, ["5 + 3 = 8"], 13))),
  ],
};

/* ------------------------------ 5. Kotak sepuluh ------------------------------ */
const SUARA_S1 = "Kita boleh menjumlahkan sampai sepuluh. Lihat kotak sepuluh ini. Di dalamnya ada sepuluh petak yang masih kosong. Kita akan mengisinya pelan-pelan.";
const SUARA_S2 = "Enam keping merah masuk ke kotak. Keping merah mengisi petak dari kiri ke kanan.";
const SUARA_S3 = "Lalu dua keping biru ikut masuk. Enam ditambah dua sama dengan delapan.";
const SUARA_S4 = "Dua keping biru lagi masuk. Sekarang enam ditambah empat sama dengan sepuluh. Kotaknya penuh! Tidak ada petak yang kosong lagi di dalamnya.";
const SUARA_S5 = "Sepuluh adalah jumlah paling banyak yang kita pelajari. Jumlahnya tidak lebih dari sepuluh.";
const SUARA_S6 = "Lima ditambah lima juga sama dengan sepuluh. Sebagian keping berganti warna, tetapi kotaknya tetap penuh.";
const BX = 25;
const BY = 36;
const SEL = 50;
const keping = (dari: number, sampai: number, warna: string) => kepingBingkai("kg", BX, BY, dari, sampai, warna, SEL);

export const ADEGAN_SEPULUH: AdeganStory = {
  id: "sampai-sepuluh",
  judul: "Menjumlahkan sampai sepuluh",
  sumber: "Materi: jumlah sampai sepuluh",
  latar: "#F0FDFA",
  ketukan: [
    k(SUARA_S1, tambah(0, judul("Kotak sepuluh")), tambah("Lihat", ...selBingkai("kt", BX, BY, SEL)), tambah("sepuluh", teks("s10", 150, 154, "10 petak", 12, W.ungu))),
    k(SUARA_S2, tambah("Enam", ...keping(0, 6, KUNING))),
    k(SUARA_S3, tambah("biru", ...keping(6, 8, W.hijau)), tambah("Enam", ...kartu("p8", 80, 166, 140, 26, W.emas, ["6 + 2 = 8"], 12))),
    k(SUARA_S4, hapus(0, "p8-k", "p8-t0"), tambah("lagi", ...keping(8, 10, W.hijau)), tambah("sepuluh.", ...kartu("p10", 80, 166, 140, 26, W.emas, ["6 + 4 = 10"], 12))),
    k(SUARA_S5, hapus(0, "p10-k", "p10-t0", "s10"), sorotkan("sepuluh", ...Array.from({ length: 10 }, (_, i) => `kg${i}`)), tambah("paling", teks("mk", 150, 154, "paling banyak: 10", 11, W.merah))),
    k(
      SUARA_S6,
      hapus(0, "mk"),
      redamkan(0, ...Array.from({ length: 10 }, (_, i) => `kg${i}`)),
      ubah("berganti", { id: "kg5", warna: W.hijau }),
      tambah("Lima", ...kartu("p55", 80, 166, 140, 26, W.emas, ["5 + 5 = 10"], 12)),
    ),
  ],
};
