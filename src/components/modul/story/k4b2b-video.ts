import type { VideoStory } from "./logika-story";
import { ADEGAN_AMATI_DUA, ADEGAN_AMATI_SATU, ADEGAN_BERLATIH_SATU_DUA } from "./k4b2b-materi-1";
import { ADEGAN_BERLATIH_EMPAT, ADEGAN_BERLATIH_LIMA, ADEGAN_BERLATIH_TIGA, ADEGAN_DIFERENSIASI_B, ADEGAN_RINGKAS_B } from "./k4b2b-materi-2";
import { ADEGAN_LUAR_BATANG, ADEGAN_LUAR_BATANG_TERAPAN, ADEGAN_LUAR_KARTU, ADEGAN_LUAR_KARTU_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k4b2b-luar-2";
import { ADEGAN_LUAR_PEMBILANG, ADEGAN_LUAR_PEMBILANG_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_PENYEBUT, ADEGAN_LUAR_PENYEBUT_TERAPAN } from "./k4b2b-luar-1";

/** Kelas 4 Bab 2 Sub-Bab B (Pecahan dengan Penyebut Sama): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K4B2B: VideoStory = {
  id: "k4b2b-materi",
  judul: "Pecahan dengan Penyebut Sama",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    ADEGAN_AMATI_SATU,
    ADEGAN_AMATI_DUA,
    ADEGAN_BERLATIH_SATU_DUA,
    ADEGAN_BERLATIH_TIGA,
    ADEGAN_BERLATIH_EMPAT,
    ADEGAN_BERLATIH_LIMA,
    ADEGAN_DIFERENSIASI_B,
    ADEGAN_RINGKAS_B,
  ],
};

export const VIDEO_LUAR_K4B2B: VideoStory = {
  id: "k4b2b-luar",
  judul: "Membandingkan Pecahan Penyebut Sama: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_PENYEBUT,
    ADEGAN_LUAR_PENYEBUT_TERAPAN,
    ADEGAN_LUAR_PEMBILANG,
    ADEGAN_LUAR_PEMBILANG_TERAPAN,
    ADEGAN_LUAR_BATANG,
    ADEGAN_LUAR_BATANG_TERAPAN,
    ADEGAN_LUAR_KARTU,
    ADEGAN_LUAR_KARTU_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
