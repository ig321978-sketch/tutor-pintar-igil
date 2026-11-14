import type { VideoStory } from "./logika-story";
import { ADEGAN_AKTIVITAS_ALAT, ADEGAN_AKTIVITAS_HASIL, ADEGAN_AMATI_COKLAT } from "./k4b2c-materi-1";
import { ADEGAN_BERLATIH_SATU, ADEGAN_BERPIKIR, ADEGAN_COKLAT_JAWAB, ADEGAN_TAHUKAH } from "./k4b2c-materi-2";
import { ADEGAN_BERLATIH_DUA, ADEGAN_BERLATIH_TIGA, ADEGAN_CATATAN, ADEGAN_DIFERENSIASI } from "./k4b2c-materi-3";
import { ADEGAN_LUAR_KALI, ADEGAN_LUAR_KALI_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_SENILAI, ADEGAN_LUAR_SENILAI_TERAPAN } from "./k4b2c-luar-1";
import { ADEGAN_LUAR_DINDING, ADEGAN_LUAR_DINDING_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SEDERHANA, ADEGAN_LUAR_SEDERHANA_TERAPAN } from "./k4b2c-luar-2";

/** Kelas 4 Bab 2 Sub-Bab C (Pecahan Senilai): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K4B2C: VideoStory = {
  id: "k4b2c-materi",
  judul: "Pecahan Senilai",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    ADEGAN_AKTIVITAS_ALAT,
    ADEGAN_AKTIVITAS_HASIL,
    ADEGAN_AMATI_COKLAT,
    ADEGAN_COKLAT_JAWAB,
    ADEGAN_TAHUKAH,
    ADEGAN_BERPIKIR,
    ADEGAN_BERLATIH_SATU,
    ADEGAN_BERLATIH_DUA,
    ADEGAN_BERLATIH_TIGA,
    ADEGAN_CATATAN,
    ADEGAN_DIFERENSIASI,
  ],
};

export const VIDEO_LUAR_K4B2C: VideoStory = {
  id: "k4b2c-luar",
  judul: "Pecahan Senilai: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_SENILAI,
    ADEGAN_LUAR_SENILAI_TERAPAN,
    ADEGAN_LUAR_KALI,
    ADEGAN_LUAR_KALI_TERAPAN,
    ADEGAN_LUAR_SEDERHANA,
    ADEGAN_LUAR_SEDERHANA_TERAPAN,
    ADEGAN_LUAR_DINDING,
    ADEGAN_LUAR_DINDING_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
