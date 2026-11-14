import type { VideoStory } from "./logika-story";
import { ADEGAN_AKTIVITAS_3, ADEGAN_AKTIVITAS_4, ADEGAN_MENGAMATI, ADEGAN_PEMBUKA_B } from "./k4b6b-materi-1";
import { ADEGAN_BERLATIH_1, ADEGAN_BERLATIH_2, ADEGAN_GURU_B, ADEGAN_UK_1 } from "./k4b6b-materi-2";
import { ADEGAN_PENGAYAAN_12, ADEGAN_PENGAYAAN_345, ADEGAN_PENUTUP_B, ADEGAN_UK_2, ADEGAN_UK_3 } from "./k4b6b-materi-3";
import { ADEGAN_LUAR_AL, ADEGAN_LUAR_AL_TERAPAN, ADEGAN_LUAR_BS, ADEGAN_LUAR_BS_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k4b6b-luar-1";
import { ADEGAN_LUAR_CB, ADEGAN_LUAR_CB_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TB, ADEGAN_LUAR_TB_TERAPAN } from "./k4b6b-luar-2";

/** Kelas 4 Bab 6 Sub-Bab B (Diagram Batang), penutup bab: video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K4B6B: VideoStory = {
  id: "k4b6b-materi",
  judul: "Diagram Batang menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 187–194 dan Panduan Guru hlm. 223–238",
  jenis: "materi",
  adegan: [
    ADEGAN_PEMBUKA_B,
    ADEGAN_AKTIVITAS_3,
    ADEGAN_MENGAMATI,
    ADEGAN_AKTIVITAS_4,
    ADEGAN_BERLATIH_1,
    ADEGAN_BERLATIH_2,
    ADEGAN_GURU_B,
    ADEGAN_UK_1,
    ADEGAN_UK_2,
    ADEGAN_UK_3,
    ADEGAN_PENGAYAAN_12,
    ADEGAN_PENGAYAAN_345,
    ADEGAN_PENUTUP_B,
  ],
};

export const VIDEO_LUAR_K4B6B: VideoStory = {
  id: "k4b6b-luar",
  judul: "Diagram Batang: Metode dari Luar",
  subjudul: "Empat metode luar · ekstrakurikuler, lomba, bunga taman, PORSENI, meja guru, dan suku bangsa",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BS,
    ADEGAN_LUAR_BS_TERAPAN,
    ADEGAN_LUAR_AL,
    ADEGAN_LUAR_AL_TERAPAN,
    ADEGAN_LUAR_CB,
    ADEGAN_LUAR_CB_TERAPAN,
    ADEGAN_LUAR_TB,
    ADEGAN_LUAR_TB_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
