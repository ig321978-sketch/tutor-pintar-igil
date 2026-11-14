import type { VideoStory } from "./logika-story";
import { ADEGAN_BERAS, ADEGAN_BERLATIH_FAKTOR_1, ADEGAN_BERLATIH_FAKTOR_2, ADEGAN_BUKAN_FAKTOR, ADEGAN_FAKTOR_12, ADEGAN_PEMBUKA_I } from "./k4b1i-materi-1";
import {
  ADEGAN_BERLATIH_KELIPATAN,
  ADEGAN_KELIPATAN_KAREL,
  ADEGAN_MENCOBA_SLAMET,
  ADEGAN_MISKONSEPSI,
  ADEGAN_UK_CERITA,
  ADEGAN_UK_FAKTOR_KELIPATAN,
  ADEGAN_UK_HITUNG,
  ADEGAN_UK_NILAI_TEMPAT,
} from "./k4b1i-materi-2";
import { ADEGAN_PENGAYAAN_1, ADEGAN_PENGAYAAN_2 } from "./k4b1i-materi-3";
import { ADEGAN_LUAR_FP, ADEGAN_LUAR_FP_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_SK, ADEGAN_LUAR_SK_TERAPAN } from "./k4b1i-luar-1";
import { ADEGAN_LUAR_DV, ADEGAN_LUAR_DV_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SV, ADEGAN_LUAR_SV_TERAPAN } from "./k4b1i-luar-2";

/** Kelas 4 Bab 1 Sub-Bab I (Faktor dan Kelipatan), penutup bab: video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K4B1I: VideoStory = {
  id: "k4b1i-materi",
  judul: "Faktor dan Kelipatan menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 48–54 dan Panduan Guru hlm. 70–88",
  jenis: "materi",
  adegan: [
    ADEGAN_PEMBUKA_I,
    ADEGAN_FAKTOR_12,
    ADEGAN_BUKAN_FAKTOR,
    ADEGAN_BERLATIH_FAKTOR_1,
    ADEGAN_BERLATIH_FAKTOR_2,
    ADEGAN_BERAS,
    ADEGAN_KELIPATAN_KAREL,
    ADEGAN_MENCOBA_SLAMET,
    ADEGAN_BERLATIH_KELIPATAN,
    ADEGAN_MISKONSEPSI,
    ADEGAN_UK_NILAI_TEMPAT,
    ADEGAN_UK_HITUNG,
    ADEGAN_UK_FAKTOR_KELIPATAN,
    ADEGAN_UK_CERITA,
    ADEGAN_PENGAYAAN_1,
    ADEGAN_PENGAYAAN_2,
  ],
};

export const VIDEO_LUAR_K4B1I: VideoStory = {
  id: "k4b1i-luar",
  judul: "Faktor dan Kelipatan: Metode dari Luar",
  subjudul: "Empat metode luar · angka dari buku",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_FP,
    ADEGAN_LUAR_FP_TERAPAN,
    ADEGAN_LUAR_SK,
    ADEGAN_LUAR_SK_TERAPAN,
    ADEGAN_LUAR_DV,
    ADEGAN_LUAR_DV_TERAPAN,
    ADEGAN_LUAR_SV,
    ADEGAN_LUAR_SV_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
