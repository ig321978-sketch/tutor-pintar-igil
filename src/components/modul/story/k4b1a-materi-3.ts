import type { AdeganStory } from "./logika-story";
import { OWL, W, emo, judul, kartu, papanIsi, papanKepala, teks } from "./k4b1a-gambar";
import { bersih, hias, idx, k, sorotkan, tambah } from "./k4b1a-bantu";

/* Rujukan topik: Matematika untuk SD/MI Kelas IV, Bab 1 Sub-Bab A, nama bilangan dan batas sepuluh ribu (hlm. buku siswa 6 sampai 9). Angka dan cerita orisinal IGIL. */

/* ------------------------------ 9. Seribu, seratus, dan belas ------------------------------ */
const SUARA_S1 = "Angka satu di tempat ribuan dibaca seribu. Contohnya bilangan seribu tiga ratus lima puluh.";
const SUARA_S2 = "Angka satu di tempat ratusan juga begitu. Ia dibaca seratus, seperti pada empat ribu seratus tujuh puluh lima.";
const SUARA_S3 = "Sekarang angka satu di tempat puluhan. Bersama angka dua di satuan, ia dibaca dua belas.";
const SUARA_S4 = "Bersama angka satu di satuan, dibaca sebelas. Bersama angka nol, dibaca sepuluh.";

export const ADEGAN_SERIBU_BELAS: AdeganStory = {
  id: "seribu-belas",
  judul: "Seribu, seratus, dan belas",
  sumber: "Materi: seribu, seratus, dan belas",
  latar: "#FFFBEB",
  ketukan: [
    k(
      SUARA_S1,
      tambah(0, judul("Angka satu di ribuan")), hias(),
      tambah(idx(SUARA_S1, "ribuan"), ...papanKepala("pp", 10, 30, 280), ...papanIsi("pp", 10, 45, 280, "1350")),
      sorotkan(idx(SUARA_S1, "seribu."), "pp-d0"),
      tambah(idx(SUARA_S1, "Contohnya"), ...kartu("bl", 90, 92, 120, 36, W.krem, ["1.350"], 22)),
      tambah(idx(SUARA_S1, "seribu", 2), ...kartu("nm", 20, 138, 260, 46, W.emas, ["seribu tiga ratus", "lima puluh"], 12)),
    ),
    k(
      SUARA_S2,
      bersih(0),
      tambah(0, judul("Angka satu di ratusan")), hias(),
      tambah(0, ...papanKepala("pp", 10, 30, 280), ...papanIsi("pp", 10, 45, 280, "4175")),
      sorotkan(idx(SUARA_S2, "ratusan"), "pp-d1"),
      tambah(idx(SUARA_S2, "pada"), ...kartu("bl", 90, 92, 120, 36, W.krem, ["4.175"], 22)),
      tambah(idx(SUARA_S2, "empat"), ...kartu("nm", 20, 138, 260, 46, W.emas, ["empat ribu seratus", "tujuh puluh lima"], 12)),
    ),
    k(
      SUARA_S3,
      bersih(0),
      tambah(0, judul("Angka satu di puluhan")), hias(),
      tambah(0, ...papanKepala("pp", 10, 30, 280), ...papanIsi("pp", 10, 45, 280, "4612")),
      sorotkan(idx(SUARA_S3, "puluhan."), "pp-d2"),
      sorotkan(idx(SUARA_S3, "dua"), "pp-d3"),
      tambah(idx(SUARA_S3, "dibaca"), ...kartu("bl", 90, 92, 120, 36, W.krem, ["4.612"], 22)),
      tambah(idx(SUARA_S3, "belas."), ...kartu("nm", 20, 138, 260, 46, W.emas, ["empat ribu enam ratus", "dua belas"], 12)),
    ),
    k(
      SUARA_S4,
      bersih(0),
      tambah(0, judul("Sebelas dan sepuluh")), hias(),
      tambah(idx(SUARA_S4, "sebelas."), ...kartu("bl", 10, 36, 130, 36, W.krem, ["2.711"], 22), ...kartu("nm", 10, 80, 130, 52, W.hijauMuda, ["dua ribu tujuh ratus", "sebelas"], 10)),
      tambah(idx(SUARA_S4, "nol,"), ...kartu("bm", 160, 36, 130, 36, W.krem, ["5.310"], 22), ...kartu("nn", 160, 80, 130, 52, W.pink, ["lima ribu tiga ratus", "sepuluh"], 10)),
      tambah(idx(SUARA_S4, "sepuluh."), teks("ul", 150, 160, "belas: angka satu di puluhan", 9, W.ungu)),
    ),
  ],
};

/* ------------------------------ 10. Sampai sepuluh ribu ------------------------------ */
const SUARA_R1 = "Bilangan empat angka yang terbesar adalah sembilan ribu sembilan ratus sembilan puluh sembilan.";
const SUARA_R2 = "Bila kita tambah satu lagi, semua tempat penuh. Bilangannya naik menjadi lima angka.";
const SUARA_R3 = "Bilangan baru itu bernama sepuluh ribu. Tulisannya angka satu diikuti empat angka nol.";
const SUARA_R4 = "Sepuluh ribu adalah batas bilangan yang kita pelajari di sini.";

export const ADEGAN_SEPULUH_RIBU: AdeganStory = {
  id: "sepuluh-ribu",
  judul: "Sampai sepuluh ribu",
  sumber: "Materi: batas sepuluh ribu",
  latar: "#EFF6FF",
  ketukan: [
    k(
      SUARA_R1,
      tambah(0, judul("Bilangan terbesar")), hias(),
      tambah(idx(SUARA_R1, "terbesar"), ...papanKepala("pp", 10, 40, 280), ...papanIsi("pp", 10, 55, 280, "9999")),
      tambah(idx(SUARA_R1, "sembilan"), ...kartu("bl", 80, 110, 140, 40, W.krem, ["9.999"], 24)),
    ),
    k(SUARA_R2, tambah(idx(SUARA_R2, "tambah"), emo("pl", 60, 180, "➕", 30), ...kartu("sa", 84, 164, 60, 30, W.emas, ["1"], 18)), tambah(idx(SUARA_R2, "lima"), emo("pn", 230, 184, "\u{1F4A5}", 30))),
    k(SUARA_R3, bersih(0), tambah(0, judul("Sepuluh ribu")), hias(), tambah(idx(SUARA_R3, "Tulisannya"), ...kartu("bl", 60, 60, 180, 60, W.emas, ["10.000"], 34))),
    k(SUARA_R4, tambah(idx(SUARA_R4, "Sepuluh"), emo("ow", 150, 168, OWL, 40)), sorotkan(idx(SUARA_R4, "batas"), "bl-k")),
  ],
};
