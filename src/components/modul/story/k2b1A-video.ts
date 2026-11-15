import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_HITUNG_SATU, ADEGAN_KOTAK_SEPULUH, ADEGAN_PULUHAN_SATUAN, ADEGAN_RAK_TAS, ADEGAN_SEPULUH_ENAM } from "./k2b1A-materi-1";
import { ADEGAN_BACA, ADEGAN_DAFTAR, ADEGAN_TULIS } from "./k2b1A-materi-2";
import { ADEGAN_MAJU, ADEGAN_MUNDUR, ADEGAN_SEBELUM_SESUDAH, ADEGAN_TEBAK } from "./k2b1A-materi-3";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP } from "./k2b1A-materi-4";
import { ADEGAN_LUAR_BINGKAI, ADEGAN_LUAR_BINGKAI_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_SEPULUH, ADEGAN_LUAR_SEPULUH_TERAPAN } from "./k2b1A-luar-1";
import { ADEGAN_LUAR_GARIS, ADEGAN_LUAR_GARIS_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k2b1A-luar-2";

/** Kelas 2 Bab 1 Sub-Bab A (Menghitung, Membaca, dan Menulis Bilangan sampai dengan 50): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K2B1A: VideoStory = {
  id: "k2b1A-materi",
  judul: "Menghitung, Membaca, dan Menulis Bilangan sampai 50",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "menghitung, membaca, dan menulis bilangan", daftar: ["Menghitung benda", "Membaca dan menulis bilangan", "Maju, mundur, dan menebak"] }),
    ADEGAN_RAK_TAS,
    ADEGAN_HITUNG_SATU,
    ADEGAN_KOTAK_SEPULUH,
    ADEGAN_SEPULUH_ENAM,
    ADEGAN_PULUHAN_SATUAN,
    ADEGAN_BACA,
    ADEGAN_TULIS,
    ADEGAN_DAFTAR,
    ADEGAN_MAJU,
    ADEGAN_MUNDUR,
    ADEGAN_SEBELUM_SESUDAH,
    ADEGAN_TEBAK,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B1A: VideoStory = {
  id: "k2b1A-luar",
  judul: "Menghitung Bilangan sampai 50: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "menghitung, membaca, dan menulis bilangan" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BINGKAI,
    ADEGAN_LUAR_BINGKAI_TERAPAN,
    ADEGAN_LUAR_SEPULUH,
    ADEGAN_LUAR_SEPULUH_TERAPAN,
    ADEGAN_LUAR_GARIS,
    ADEGAN_LUAR_GARIS_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
