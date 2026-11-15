import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_CERITA, ADEGAN_GABUNG, ADEGAN_TUKAR } from "./k1b2b-materi-1";
import { ADEGAN_KEMBAR, ADEGAN_KEMBAR_LAIN, ADEGAN_KUE, ADEGAN_MAJU } from "./k1b2b-materi-2";
import { ADEGAN_JARI, ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP, ADEGAN_SEPULUH } from "./k1b2b-materi-3";
import { ADEGAN_LUAR_MAJU, ADEGAN_LUAR_MAJU_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b2b-luar-1";
import { ADEGAN_LUAR_BAGIAN, ADEGAN_LUAR_BAGIAN_TERAPAN, ADEGAN_LUAR_BINGKAI, ADEGAN_LUAR_BINGKAI_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k1b2b-luar-2";

/** Kelas 1 Bab 2 Sub-Bab B (Berbagai Cara Menjumlahkan): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K1B2B: VideoStory = {
  id: "k1b2b-materi",
  judul: "Berbagai Cara Menjumlahkan",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "berbagai cara menjumlahkan", daftar: ["Pasangan bilangan", "Maju dari bilangan pertama", "Bilangan kembar"] }),
    ADEGAN_CERITA,
    ADEGAN_GABUNG,
    ADEGAN_TUKAR,
    ADEGAN_MAJU,
    ADEGAN_KUE,
    ADEGAN_KEMBAR,
    ADEGAN_KEMBAR_LAIN,
    ADEGAN_JARI,
    ADEGAN_SEPULUH,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B2B: VideoStory = {
  id: "k1b2b-luar",
  judul: "Berbagai Cara Menjumlahkan: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "berbagai cara menjumlahkan" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_MAJU,
    ADEGAN_LUAR_MAJU_TERAPAN,
    ADEGAN_LUAR_BAGIAN,
    ADEGAN_LUAR_BAGIAN_TERAPAN,
    ADEGAN_LUAR_BINGKAI,
    ADEGAN_LUAR_BINGKAI_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
