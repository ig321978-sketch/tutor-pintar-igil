import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BANDING, ADEGAN_EKSPLORASI42, ADEGAN_LOMBA } from "./k6b4b-materi-1";
import { ADEGAN_KURANG_ADIL, ADEGAN_LATIHAN42, ADEGAN_PERMEN } from "./k6b4b-materi-2";
import { ADEGAN_HADIAH, ADEGAN_LATIHAN43, ADEGAN_UJI } from "./k6b4b-materi-3";
import { ADEGAN_LUAR_B_CPR, ADEGAN_LUAR_B_CPR_TERAPAN, ADEGAN_LUAR_B_FTR, ADEGAN_LUAR_B_FTR_TERAPAN, ADEGAN_LUAR_B_PEMBUKA } from "./k6b4b-luar-1";
import { ADEGAN_LUAR_B_FAIR, ADEGAN_LUAR_B_FAIR_TERAPAN, ADEGAN_LUAR_B_KEPUTUSAN, ADEGAN_LUAR_B_RINGKAS } from "./k6b4b-luar-2";

/**
 * Kelas 6 Bab 4 Sub-Bab B (Membandingkan Peluang Kejadian): video materi kurikulum dan video metode luar, dua video terpisah.
 * Semua adegan materi bermakna dan diputar; adegan sapaan dipasang di depan tiap video.
 */
export const VIDEO_MATERI_K6B4B: VideoStory = {
  id: "k6b4b-materi",
  judul: "Membandingkan Peluang",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "membandingkan peluang kejadian", daftar: ["Membandingkan dua peluang", "Adil dan kurang adil", "Memilih dengan peluang"] }),
    ADEGAN_LOMBA,
    ADEGAN_EKSPLORASI42,
    ADEGAN_BANDING,
    ADEGAN_KURANG_ADIL,
    ADEGAN_LATIHAN42,
    ADEGAN_PERMEN,
    ADEGAN_HADIAH,
    ADEGAN_LATIHAN43,
    ADEGAN_UJI,
  ],
};

export const VIDEO_LUAR_K6B4B: VideoStory = {
  id: "k6b4b-luar",
  judul: "Membandingkan Peluang: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "membandingkan peluang kejadian" }),
    ADEGAN_LUAR_B_PEMBUKA,
    ADEGAN_LUAR_B_FTR,
    ADEGAN_LUAR_B_FTR_TERAPAN,
    ADEGAN_LUAR_B_CPR,
    ADEGAN_LUAR_B_CPR_TERAPAN,
    ADEGAN_LUAR_B_FAIR,
    ADEGAN_LUAR_B_FAIR_TERAPAN,
    ADEGAN_LUAR_B_KEPUTUSAN,
    ADEGAN_LUAR_B_RINGKAS,
  ],
};
