import type { VideoStory } from "./logika-story";
import { ADEGAN_CONTOH_1E, ADEGAN_CONTOH_2E, ADEGAN_MENGAMATI_E } from "./k4b2e-materi-1";
import { ADEGAN_BERLATIH_1E, ADEGAN_BERLATIH_2E, ADEGAN_GESER, ADEGAN_LANGSUNG } from "./k4b2e-materi-2";
import { ADEGAN_PENGAYAAN_1E, ADEGAN_PENGAYAAN_2E, ADEGAN_UK_DESIMAL, ADEGAN_UK_PECAHAN, ADEGAN_UK_PERSEN } from "./k4b2e-materi-3";
import { ADEGAN_LUAR_HG, ADEGAN_LUAR_HG_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_PH, ADEGAN_LUAR_PH_TERAPAN } from "./k4b2e-luar-1";
import { ADEGAN_LUAR_DP, ADEGAN_LUAR_DP_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SB, ADEGAN_LUAR_SB_TERAPAN } from "./k4b2e-luar-2";

/** Kelas 4 Bab 2 Sub-Bab E (Desimal Perseratusan dan Persen), penutup bab: video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K4B2E: VideoStory = {
  id: "k4b2e-materi",
  judul: "Desimal dan Persen",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    ADEGAN_MENGAMATI_E,
    ADEGAN_CONTOH_1E,
    ADEGAN_CONTOH_2E,
    ADEGAN_LANGSUNG,
    ADEGAN_GESER,
    ADEGAN_BERLATIH_1E,
    ADEGAN_BERLATIH_2E,
    ADEGAN_UK_PECAHAN,
    ADEGAN_UK_DESIMAL,
    ADEGAN_UK_PERSEN,
    ADEGAN_PENGAYAAN_1E,
    ADEGAN_PENGAYAAN_2E,
  ],
};

export const VIDEO_LUAR_K4B2E: VideoStory = {
  id: "k4b2e-luar",
  judul: "Persen: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_PH,
    ADEGAN_LUAR_PH_TERAPAN,
    ADEGAN_LUAR_HG,
    ADEGAN_LUAR_HG_TERAPAN,
    ADEGAN_LUAR_DP,
    ADEGAN_LUAR_DP_TERAPAN,
    ADEGAN_LUAR_SB,
    ADEGAN_LUAR_SB_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
