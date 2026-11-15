import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_HITUNG, ADEGAN_RAPI, ADEGAN_SEPULUH } from "./k1b5a-materi-1";
import { ADEGAN_BACA, ADEGAN_DUA_PULUH, ADEGAN_LIMA_BELAS, ADEGAN_TULIS } from "./k1b5a-materi-2";
import { ADEGAN_BANYAK, ADEGAN_GARIS, ADEGAN_PASANGAN, ADEGAN_TEBAK } from "./k1b5a-materi-3";
import { ADEGAN_DETEKTIF, ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP } from "./k1b5a-materi-4";
import { ADEGAN_LUAR_HITUNG, ADEGAN_LUAR_HITUNG_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b5a-luar-1";
import { ADEGAN_LUAR_BINGKAI, ADEGAN_LUAR_BINGKAI_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SEPULUH, ADEGAN_LUAR_SEPULUH_TERAPAN } from "./k1b5a-luar-2";

/** Kelas 1 Bab 5 Sub-Bab A (Menghitung, Membaca, dan Menulis Bilangan sampai 20): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K1B5A: VideoStory = {
  id: "k1b5a-materi",
  judul: "Menghitung, Membaca, dan Menulis Bilangan sampai 20",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "menghitung dan menulis bilangan", daftar: ["Menghitung benda", "Membaca nama bilangan", "Menulis lambang bilangan"] }),
    ADEGAN_RAPI,
    ADEGAN_HITUNG,
    ADEGAN_SEPULUH,
    ADEGAN_LIMA_BELAS,
    ADEGAN_BACA,
    ADEGAN_TULIS,
    ADEGAN_DUA_PULUH,
    ADEGAN_GARIS,
    ADEGAN_PASANGAN,
    ADEGAN_BANYAK,
    ADEGAN_TEBAK,
    ADEGAN_DETEKTIF,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B5A: VideoStory = {
  id: "k1b5a-luar",
  judul: "Menghitung, Membaca, dan Menulis Bilangan sampai 20: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "menghitung dan menulis bilangan" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_HITUNG,
    ADEGAN_LUAR_HITUNG_TERAPAN,
    ADEGAN_LUAR_SEPULUH,
    ADEGAN_LUAR_SEPULUH_TERAPAN,
    ADEGAN_LUAR_BINGKAI,
    ADEGAN_LUAR_BINGKAI_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
