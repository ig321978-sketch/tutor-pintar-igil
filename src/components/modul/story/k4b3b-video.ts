import type { VideoStory } from "./logika-story";
import { ADEGAN_KASUS_1, ADEGAN_KASUS_2, ADEGAN_MENGAMATI, ADEGAN_TELUR } from "./k4b3b-materi-1";
import { ADEGAN_BERLATIH_1, ADEGAN_BERLATIH_2, ADEGAN_BERLATIH_CERITA, ADEGAN_REKAP_BEDA, ADEGAN_UK_BILANGAN, ADEGAN_UK_GAMBAR } from "./k4b3b-materi-2";
import { ADEGAN_PENGAYAAN_1, ADEGAN_PENGAYAAN_2, ADEGAN_UK_CERITA } from "./k4b3b-materi-3";
import { ADEGAN_LUAR_AS, ADEGAN_LUAR_AS_TERAPAN, ADEGAN_LUAR_FM, ADEGAN_LUAR_FM_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k4b3b-luar-1";
import { ADEGAN_LUAR_NJ, ADEGAN_LUAR_NJ_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TV, ADEGAN_LUAR_TV_TERAPAN } from "./k4b3b-luar-2";

/** Kelas 4 Bab 3 Sub-Bab B (Pola Bilangan), penutup bab: video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K4B3B: VideoStory = {
  id: "k4b3b-materi",
  judul: "Pola Bilangan",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    ADEGAN_MENGAMATI,
    ADEGAN_KASUS_1,
    ADEGAN_KASUS_2,
    ADEGAN_TELUR,
    ADEGAN_BERLATIH_1,
    ADEGAN_BERLATIH_2,
    ADEGAN_BERLATIH_CERITA,
    ADEGAN_REKAP_BEDA,
    ADEGAN_UK_GAMBAR,
    ADEGAN_UK_BILANGAN,
    ADEGAN_UK_CERITA,
    ADEGAN_PENGAYAAN_1,
    ADEGAN_PENGAYAAN_2,
  ],
};

export const VIDEO_LUAR_K4B3B: VideoStory = {
  id: "k4b3b-luar",
  judul: "Pola Bilangan: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_AS,
    ADEGAN_LUAR_AS_TERAPAN,
    ADEGAN_LUAR_FM,
    ADEGAN_LUAR_FM_TERAPAN,
    ADEGAN_LUAR_TV,
    ADEGAN_LUAR_TV_TERAPAN,
    ADEGAN_LUAR_NJ,
    ADEGAN_LUAR_NJ_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
