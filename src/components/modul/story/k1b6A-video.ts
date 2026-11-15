import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_DONAT, ADEGAN_KATA, ADEGAN_PASANGKAN } from "./k1b6A-materi-1";
import { ADEGAN_BATANG, ADEGAN_BUNGA, ADEGAN_GARIS, ADEGAN_SELISIH } from "./k1b6A-materi-2";
import { ADEGAN_DETEKTIF, ADEGAN_KALIMAT, ADEGAN_KURANGNYA, ADEGAN_LEBIHNYA } from "./k1b6A-materi-3";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP } from "./k1b6A-materi-4";
import { ADEGAN_LUAR_MAJU, ADEGAN_LUAR_MAJU_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b6A-luar-1";
import { ADEGAN_LUAR_PASANGAN, ADEGAN_LUAR_PASANGAN_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SEPULUH, ADEGAN_LUAR_SEPULUH_TERAPAN } from "./k1b6A-luar-2";

/** Kelas 1 Bab 6 Sub-Bab A (Mengenal Konsep Lebih dari, Kurang dari, dan Selisih): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K1B6A: VideoStory = {
  id: "k1b6A-materi",
  judul: "Mengenal Konsep Lebih dari, Kurang dari, dan Selisih",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "lebih dari, kurang dari, dan selisih", daftar: ["Memasangkan benda satu-satu", "Lebihnya dan kurangnya", "Mencari selisih bilangan"] }),
    ADEGAN_DONAT,
    ADEGAN_PASANGKAN,
    ADEGAN_KATA,
    ADEGAN_BUNGA,
    ADEGAN_SELISIH,
    ADEGAN_BATANG,
    ADEGAN_GARIS,
    ADEGAN_LEBIHNYA,
    ADEGAN_KURANGNYA,
    ADEGAN_DETEKTIF,
    ADEGAN_KALIMAT,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B6A: VideoStory = {
  id: "k1b6A-luar",
  judul: "Mengenal Konsep Lebih dari, Kurang dari, dan Selisih: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "lebih dari, kurang dari, dan selisih" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_MAJU,
    ADEGAN_LUAR_MAJU_TERAPAN,
    ADEGAN_LUAR_PASANGAN,
    ADEGAN_LUAR_PASANGAN_TERAPAN,
    ADEGAN_LUAR_SEPULUH,
    ADEGAN_LUAR_SEPULUH_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
