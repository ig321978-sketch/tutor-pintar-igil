import type { AdeganStory, Obj } from "./logika-story";
import { E, W, WL, bendera, bola, emo, garis, gantungan, gawang, geser, judul, kantong, kerucut, keranjang, kotak, lapangan, panah, papan, pindah, teks, tenda, tokoh, troli } from "./k2b6A-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k2b6A-bantu";

/*
 * Cerita orisinal IGIL "Peralatan Lomba Pak Anton" (Kelas 2 Bab 6 Sub-Bab A, berat benda), awal cerita Hari Olahraga Sekolah.
 * Naskah suara dari naskah/story-naskah-k2b6a.md. Bagian ini: troli datang, salah langkah (besar belum tentu berat), dan tiga cara membandingkan berat.
 */

/* ------------------------------ 1. Troli datang ------------------------------ */
const SUARA_T1 = "Besok Hari Olahraga! Pak Anton mendorong troli penuh peralatan ke lapangan.";
const SUARA_T2 = "Bu Sari berkata, tim Biru dan tim Kuning membawa benda yang sama beratnya, supaya adil.";
const SUARA_T3 = "Kerucut diangkat satu jari. Kantong pasir harus dua tangan. Kerucut ringan, kantong pasir berat!";

const TROLI0 = troli("tr", 52, 160);
const ISI_TROLI: Obj[] = [...kerucut("kc", 64, 160, 16), ...kantong("kp", 76, 145, 20, 15), ...bola("bl", 106, 153, 7)];
const ANTON0 = tokoh("pa", 30, 184, "Pak Anton");

export const ADEGAN_TROLI_DATANG: AdeganStory = {
  id: "troli-datang",
  judul: "Troli peralatan datang",
  sumber: "Materi: troli peralatan datang",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_T1,
      tambah(0, judul("Hari Olahraga"), ...lapangan("lp", 112), ...bendera("bd", 270, 40, 70), ...tenda("tn", 196, 82, 60)),
      tambah("Anton", ...ANTON0),
      tambah("troli", ...TROLI0),
      tambah("peralatan", ...ISI_TROLI),
      ubah("lapangan.", ...geser([...TROLI0, ...ISI_TROLI, ...ANTON0], 50)),
    ),
    k(
      SUARA_T2,
      tambah("Sari", ...tokoh("bs", 270, 184, "Bu Sari")),
      tambah("Biru", ...keranjang("kb", 164, 172, 28, "#60A5FA"), teks("lb", 178, 164, "Biru", 8, "#1D4ED8")),
      tambah("Kuning", ...keranjang("kk", 200, 172, 28, "#FDE047"), teks("lk", 214, 164, "Kuning", 8, "#A16207")),
      tambah("sama", teks("sm", 196, 130, "sama berat", 9, W.ungu)),
      tambah("adil.", emo("ok", 196, 150, E.benar, 20)),
    ),
    k(
      SUARA_T3,
      bersih(0),
      tambah(0, judul("Ringan atau Berat?"), ...lapangan("lp", 112)),
      tambah("Kerucut", ...tokoh("ch", 40, 184, "Chacha"), ...kerucut("kc", 70, 132, 30)),
      tambah("satu", teks("n1", 70, 96, "1 jari", 10, W.ungu)),
      tambah("jari.", emo("jr", 70, 152, E.jari, 18)),
      tambah("Kantong", ...kantong("kp", 190, 150, 44, 30)),
      tambah("dua", teks("n2", 212, 138, "2 tangan", 10, W.ungu)),
      tambah("tangan.", emo("tg", 212, 198, E.tangan, 16)),
      tambah("ringan,", teks("rg", 70, 70, "ringan", 10, W.hijau)),
      tambah("berat!", teks("br", 212, 118, "berat", 10, W.merah), emo("jg", 254, 160, E.jangkar, 16)),
    ),
  ],
};

/* ------------------------------ 2. Salah langkah: besar belum tentu berat ------------------------------ */
const SUARA_S1 = "Chacha menunjuk bola karet raksasa. Pasti paling berat, karena besar! Kalau salah, aku bawa semua kerucut!";
const SUARA_S2 = "Ia mengangkatnya sekuat tenaga, dan bola melayang karena sangat ringan! Topi Pak Anton terbang.";
const SUARA_S3 = "Dika tertawa. Besar belum tentu berat, Chacha. Balon besar itu ringan, batu kecil berat.";

const bolaRaksasa = (x: number, y: number): Obj[] => bola("bk", x, y, 30, "#FDE047", "#A16207");
const ANTON_S = tokoh("pa", 272, 184, "Pak Anton");

export const ADEGAN_SALAH_BESAR: AdeganStory = {
  id: "salah-besar",
  judul: "Bola raksasa yang ringan",
  sumber: "Materi: salah langkah, bola raksasa",
  latar: "#FFF7ED",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Bola Raksasa"), ...lapangan("lp", 112)),
      tambah("Chacha", ...tokoh("ch", 40, 184, "Chacha")),
      tambah("menunjuk", panah("pn", 64, 160, 40, -10, W.merah, 2.4)),
      tambah("bola", ...bolaRaksasa(150, 142)),
      tambah("berat,", teks("pb", 150, 100, "paling berat?", 9, W.merah)),
      tambah("kerucut!", ...kerucut("k1", 214, 184, 20), ...kerucut("k2", 236, 184, 20)),
    ),
    k(
      SUARA_S2,
      ubah("mengangkatnya", ...pindah(bolaRaksasa(70, 118))),
      ubah("melayang", ...pindah(bolaRaksasa(70, 58))),
      tambah("ringan!", teks("rg", 128, 84, "ringan", 10, W.hijau)),
      tambah("Topi", ...ANTON_S),
      ubah("terbang.", { id: "pa-cp", x: 232, y: 100 }),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Besar Belum Tentu Berat"), ...lapangan("lp", 112)),
      tambah("Dika", ...tokoh("dk", 36, 184, "Dika")),
      ubah("tertawa.", { id: "dk", isi: E.tertawa }),
      tambah("Besar", teks("bb", 150, 70, "besar belum tentu berat", 9, W.merah)),
      tambah("Balon", emo("bn", 120, 150, E.balon, 46)),
      tambah("ringan,", teks("t1", 120, 168, "ringan", 9, W.hijau)),
      tambah("batu", emo("bt", 232, 150, E.batu, 22)),
      tambah("berat.", teks("t2", 232, 168, "berat", 9, W.merah), emo("jg", 232, 126, E.jangkar, 16)),
    ),
  ],
};

/* ------------------------------ 3. Tiga cara menimbang ------------------------------ */
const SUARA_C1 = "Nia berkata, ada tiga cara pasti untuk membandingkan berat.";
const SUARA_C2 = "Kedua tangan, gantungan baju berbenda di tiap ujung, dan papan jungkat-jungkit.";
const SUARA_C3 = "Dua kantong digantung di gantungan baju. Kantong yang turun lebih berat.";

/** Gantungan di tiang gawang dengan dua kantong; dy = naik-turun ujung (positif: kanan turun). */
const susunGantung = (dy: number): Obj[] => [
  ...gantungan("gt", 150, 100, 40, dy),
  garis("tl1", 110, 100 - dy, 0, 10, WL.besiTua, 1.4),
  ...kantong("kl", 99, 110 - dy, 22, 15),
  garis("tl2", 190, 100 + dy, 0, 10, WL.besiTua, 1.4),
  ...kantong("kr", 179, 110 + dy, 22, 15),
];

export const ADEGAN_TIGA_CARA: AdeganStory = {
  id: "tiga-cara",
  judul: "Tiga cara membandingkan berat",
  sumber: "Materi: tiga cara menimbang",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_C1,
      tambah(0, judul("Tiga Cara Menimbang")),
      tambah("Nia", ...tokoh("ni", 36, 184, "Nia")),
      tambah("tiga", teks("n3", 150, 44, "3 cara", 11, W.ungu)),
      tambah("cara", kotak("q1", 90, 56, 56, 48, W.krem), kotak("q2", 154, 56, 56, 48, W.krem), kotak("q3", 218, 56, 56, 48, W.krem), emo("m1", 118, 90, E.tanya, 20), emo("m2", 182, 90, E.tanya, 20), emo("m3", 246, 90, E.tanya, 20)),
      tambah("membandingkan", emo("nr", 150, 160, "\u{2696}", 34)),
    ),
    k(
      SUARA_C2,
      hapus(0, "m1", "m2", "m3", "nr"),
      tambah("tangan,", emo("th", 118, 92, E.tangan, 24), teks("l1", 118, 122, "tangan", 8, W.ungu)),
      tambah("gantungan", ...gantungan("mg", 182, 90, 14, 2), teks("l2", 182, 122, "gantungan", 8, W.ungu)),
      tambah("papan", ...papan("mp", 246, 88, 22, 4), teks("l3", 246, 122, "jungkat-jungkit", 8, W.ungu)),
    ),
    k(
      SUARA_C3,
      bersih(0),
      tambah(0, judul("Gantungan Baju"), ...lapangan("lp", 124)),
      tambah("kantong", ...gawang("gw", 70, 50, 160, 76), garis("tk", 150, 50, 0, 25, WL.besiTua, 1.8)),
      tambah("Dua", teks("n2", 150, 40, "2 kantong", 10, W.ungu)),
      tambah("digantung", ...susunGantung(0)),
      ubah("turun", ...pindah(susunGantung(8))),
      tambah("turun", panah("pt", 216, 112, 0, 22, W.merah, 2.4), teks("tu", 220, 150, "lebih berat", 9, W.merah)),
    ),
  ],
};
