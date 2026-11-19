import type { AdeganStory } from "./logika-story";
import { E, W, barisKarung, centangKolom, emo, halaman, judul, kartu, papanKapur, papanTempat, sorotKolom, teks, toko, tokoh, truk } from "./k3b1C-gambar";
import { bersih, hapus, k, tambah, ubah } from "./k3b1C-bantu";

/*
 * Cerita orisinal IGIL "Karung Pak Dodi" (Kelas 3 Bab 1 Sub-Bab C, membandingkan dan mengurutkan bilangan).
 * Naskah suara dari naskah/story-naskah-k3b1c.md. Bagian ini: truk beras tiba (masalah), ratusan dulu, ratusan sama lalu puluhan.
 * Data Story: Gudang Utara 465, Gudang Selatan 456, Gudang Timur 546.
 */

/** Papan tiga tempat dua gudang di (20, 46) dan (166, 46), lebar 114. */
export const POS_A = [20, 46, 114] as const;
export const POS_B = [166, 46, 114] as const;

/* ------------------------------ 1. Truk beras ------------------------------ */
const SUARA_A1 = "Truk Pak Dodi berhenti di depan toko. Ia mengantar karung beras dari tiga gudang.";
const SUARA_A2 = "Gudang Utara mengirim empat ratus enam puluh lima karung, Gudang Selatan empat ratus lima puluh enam, dan Gudang Timur lima ratus empat puluh enam.";
const SUARA_A3 = "Pak Joko ingin tahu gudang mana yang mengirim paling banyak.";

export const ADEGAN_TRUK_BERAS: AdeganStory = {
  id: "truk-beras",
  judul: "Truk Pak Dodi berhenti di depan toko",
  sumber: "Materi: truk beras dari tiga gudang",
  latar: "#F0F9FF",
  ketukan: [
    k(
      SUARA_A1,
      bersih(0),
      tambah(0, judul("Halaman Toko Pak Joko"), ...halaman("hl")),
      tambah("Dodi", ...truk("tr", 104, 98), ...tokoh("pd", 250, 172, "Pak Dodi")),
      tambah("toko.", ...toko("tk", 8, 70)),
      tambah("karung", ...barisKarung("kr", 110, 85, 3, 20)),
      tambah("tiga", teks("n3", 52, 58, "3 gudang", 10, W.merah, { z: 3 })),
    ),
    k(
      SUARA_A2,
      tambah("enam", ...kartu("g0", 100, 36, 58, 24, W.krem, ["Utara", "465"], 8.5)),
      tambah("Selatan", ...kartu("g1", 162, 36, 58, 24, W.hijauMuda, ["Selatan", "456"], 8.5)),
      tambah("Timur", ...kartu("g2", 224, 36, 58, 24, W.merahMuda, ["Timur", "546"], 8.5)),
    ),
    k(
      SUARA_A3,
      tambah("Joko", ...tokoh("pj", 30, 172, "Pak Joko")),
      tambah("tahu", emo("ty", 66, 146, E.tanya, 20, { z: 3 })),
      tambah("paling", ...kartu("pb", 160, 146, 72, 22, W.kuning, ["paling banyak?"], 8)),
      tambah("banyak", ...tokoh("rk", 68, 172, "Raka"), ...tokoh("sl", 104, 172, "Salsa"), ...tokoh("bm", 140, 172, "Bima")),
    ),
  ],
};

/* ------------------------------ 2. Ratusan dulu ------------------------------ */
const SUARA_B1 = "Cara membandingkan bilangan tiga angka dimulai dari ratusan.";
const SUARA_B2 = "Gudang Timur punya lima ratusan karung, Gudang Utara empat ratusan.";
const SUARA_B3 = "Lima lebih besar dari empat, jadi Gudang Timur mengirim lebih banyak.";

export const ADEGAN_RATUSAN_DULU: AdeganStory = {
  id: "ratusan-dulu",
  judul: "Bandingkan dari ratusan",
  sumber: "Materi: membandingkan mulai dari ratusan",
  latar: "#ECFDF5",
  ketukan: [
    k(
      SUARA_B1,
      bersih(0),
      tambah(0, judul("Mulai dari Ratusan", W.kapur), ...papanKapur("pk")),
      tambah("bilangan", ...papanTempat("pt", 92, 48, 116, "Bilangan", ["4", "6", "5"])),
      tambah("tiga", teks("n3", 150, 132, "3 angka", 11, W.kapur, { z: 3 })),
      tambah("ratusan.", sorotKolom("pt", 92, 48, 116, 0)),
    ),
    k(
      SUARA_B2,
      bersih(0),
      tambah(0, judul("Ratusan Dulu", W.kapur), ...papanKapur("pk")),
      tambah("Timur", ...papanTempat("pa", ...POS_A, "Gudang Timur", ["5", "4", "6"])),
      tambah("lima", sorotKolom("pa", ...POS_A, 0)),
      tambah("Utara", ...papanTempat("pb", ...POS_B, "Gudang Utara", ["4", "6", "5"])),
      tambah("empat", sorotKolom("pb", ...POS_B, 0)),
    ),
    k(
      SUARA_B3,
      tambah("Lima", teks("g5", 77, 142, "5", 24, W.kapur, { z: 3 })),
      tambah("besar", ...[teks("tn", 150, 142, ">", 24, W.merah, { z: 3 })]),
      tambah("empat", teks("g4", 223, 142, "4", 24, W.kapur, { z: 3 })),
      tambah("Timur", emo("pl", 77, 178, E.piala, 22, { z: 3 })),
      tambah("banyak", teks("lb", 150, 186, "Timur lebih banyak", 10, W.kapur, { z: 3 })),
    ),
  ],
};

/* ------------------------------ 3. Ratusan sama ------------------------------ */
const SUARA_C1 = "Sekarang Gudang Utara dan Gudang Selatan. Ratusannya sama-sama empat, jadi kita lanjut ke puluhan.";
const SUARA_C2 = "Puluhannya enam dan lima. Enam lebih besar dari lima, jadi Gudang Utara lebih banyak dari Gudang Selatan.";
const SUARA_C3 = "Kalau puluhan sama, barulah lihat satuan.";

export const ADEGAN_RATUSAN_SAMA: AdeganStory = {
  id: "ratusan-sama",
  judul: "Ratusan sama, lihat puluhan",
  sumber: "Materi: ratusan sama lalu puluhan",
  latar: "#F0FDF4",
  ketukan: [
    k(
      SUARA_C1,
      bersih(0),
      tambah(0, judul("Ratusan Sama", W.kapur), ...papanKapur("pk")),
      tambah("Utara", ...papanTempat("pa", ...POS_A, "Gudang Utara", ["4", "6", "5"])),
      tambah("Selatan", ...papanTempat("pb", ...POS_B, "Gudang Selatan", ["4", "5", "6"])),
      tambah("sama-sama", centangKolom("ca", ...POS_A, 0), centangKolom("cb", ...POS_B, 0), teks("tm", 150, 142, "ratusan sama", 10, W.kapur, { z: 3 })),
      tambah("puluhan.", sorotKolom("pa", ...POS_A, 1), sorotKolom("pb", ...POS_B, 1)),
    ),
    k(
      SUARA_C2,
      tambah("enam", teks("g6", 77, 168, "6", 24, W.kapur, { z: 3 })),
      tambah("lima", teks("g5", 223, 168, "5", 24, W.kapur, { z: 3 })),
      tambah("besar", ...[teks("tn", 150, 168, ">", 24, W.merah, { z: 3 })]),
      tambah("Utara", emo("pl", 150, 114, E.piala, 22, { z: 3 })),
      tambah("Selatan", teks("lb", 150, 190, "Utara lebih banyak", 10, W.kapur, { z: 3 })),
    ),
    k(
      SUARA_C3,
      hapus("Kalau", "g6", "g5", "tn", "pl", "lb", "tm"),
      ubah("sama", { id: "pa-d2", op: 0.3 }, { id: "pb-d2", op: 0.3 }),
      tambah("lihat", sorotKolom("pa", ...POS_A, 2, "#E5E7EB"), sorotKolom("pb", ...POS_B, 2, "#E5E7EB")),
      tambah("satuan", teks("bp", 150, 150, "satuan: belum perlu", 11, W.kapur, { z: 3 })),
    ),
  ],
};
