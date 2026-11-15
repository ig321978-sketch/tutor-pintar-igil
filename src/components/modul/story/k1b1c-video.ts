import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_CERITA, ADEGAN_MAJU, ADEGAN_MUNDUR } from "./k1b1c-materi-1";
import { ADEGAN_BERANTAI, ADEGAN_MULAI, ADEGAN_SEBELUM, ADEGAN_TITIK } from "./k1b1c-materi-2";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_LENGKAPI_MAJU, ADEGAN_LENGKAPI_MUNDUR, ADEGAN_PENUTUP } from "./k1b1c-materi-3";
import { ADEGAN_LUAR_GAMBAR, ADEGAN_LUAR_KONKRET, ADEGAN_LUAR_KONKRET_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b1c-luar-1";
import { ADEGAN_LUAR_GAMBAR_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SIMBOL, ADEGAN_LUAR_SIMBOL_TERAPAN } from "./k1b1c-luar-2";

/** Kelas 1 Bab 1 Sub-Bab C (Menghitung Maju dan Mundur): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K1B1C: VideoStory = {
  id: "k1b1c-materi",
  judul: "Menghitung Maju dan Mundur",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "menghitung maju dan mundur", daftar: ["Menghitung maju", "Menghitung mundur", "Melengkapi urutan"] }),
    ADEGAN_CERITA,
    ADEGAN_MAJU,
    ADEGAN_MUNDUR,
    ADEGAN_MULAI,
    ADEGAN_SEBELUM,
    ADEGAN_BERANTAI,
    ADEGAN_TITIK,
    ADEGAN_LENGKAPI_MAJU,
    ADEGAN_LENGKAPI_MUNDUR,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B1C: VideoStory = {
  id: "k1b1c-luar",
  judul: "Menghitung Maju dan Mundur: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "menghitung maju dan mundur" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_KONKRET,
    ADEGAN_LUAR_KONKRET_TERAPAN,
    ADEGAN_LUAR_GAMBAR,
    ADEGAN_LUAR_GAMBAR_TERAPAN,
    ADEGAN_LUAR_SIMBOL,
    ADEGAN_LUAR_SIMBOL_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
