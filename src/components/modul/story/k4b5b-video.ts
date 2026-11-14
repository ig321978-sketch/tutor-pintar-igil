import type { VideoStory } from "./logika-story";
import { ADEGAN_AKTIVITAS_6, ADEGAN_APERSEPSI, ADEGAN_BERPIKIR, ADEGAN_KOMPOSISI_GURU, ADEGAN_PEMBUKA_B } from "./k4b5b-materi-1";
import { ADEGAN_AKTIVITAS_7, ADEGAN_BERLATIH_1, ADEGAN_BERLATIH_2, ADEGAN_MENGAMATI_DEK } from "./k4b5b-materi-2";
import { ADEGAN_PENGAYAAN, ADEGAN_PENUTUP_B, ADEGAN_UK_1, ADEGAN_UK_2, ADEGAN_UK_3 } from "./k4b5b-materi-3";
import { ADEGAN_LUAR_CS, ADEGAN_LUAR_CS_TERAPAN, ADEGAN_LUAR_DS, ADEGAN_LUAR_DS_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k4b5b-luar-1";
import { ADEGAN_LUAR_CR, ADEGAN_LUAR_CR_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TG, ADEGAN_LUAR_TG_TERAPAN } from "./k4b5b-luar-2";

/** Kelas 4 Bab 5 Sub-Bab B (Komposisi dan Dekomposisi), penutup bab: video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K4B5B: VideoStory = {
  id: "k4b5b-materi",
  judul: "Komposisi dan Dekomposisi menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 166–176 dan Panduan Guru hlm. 195–214",
  jenis: "materi",
  adegan: [
    ADEGAN_PEMBUKA_B,
    ADEGAN_APERSEPSI,
    ADEGAN_AKTIVITAS_6,
    ADEGAN_BERPIKIR,
    ADEGAN_KOMPOSISI_GURU,
    ADEGAN_MENGAMATI_DEK,
    ADEGAN_AKTIVITAS_7,
    ADEGAN_BERLATIH_1,
    ADEGAN_BERLATIH_2,
    ADEGAN_UK_1,
    ADEGAN_UK_2,
    ADEGAN_UK_3,
    ADEGAN_PENGAYAAN,
    ADEGAN_PENUTUP_B,
  ],
};

export const VIDEO_LUAR_K4B5B: VideoStory = {
  id: "k4b5b-luar",
  judul: "Komposisi dan Dekomposisi: Metode dari Luar",
  subjudul: "Empat metode luar · tangram, perahu layar, motif paving, dan bangun datar dari buku",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_CS,
    ADEGAN_LUAR_CS_TERAPAN,
    ADEGAN_LUAR_DS,
    ADEGAN_LUAR_DS_TERAPAN,
    ADEGAN_LUAR_TG,
    ADEGAN_LUAR_TG_TERAPAN,
    ADEGAN_LUAR_CR,
    ADEGAN_LUAR_CR_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
