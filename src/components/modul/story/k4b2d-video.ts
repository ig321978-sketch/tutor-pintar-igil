import type { VideoStory } from "./logika-story";
import { ADEGAN_AMATI_ROTI, ADEGAN_CONTOH_KOMA, ADEGAN_TIGA_BISKUIT } from "./k4b2d-materi-1";
import { ADEGAN_BERLATIH_DUA, ADEGAN_BERLATIH_SATU, ADEGAN_BERLATIH_TIGA, ADEGAN_HATI_HATI } from "./k4b2d-materi-2";
import { ADEGAN_CATATAN_BUKU, ADEGAN_DIFERENSIASI, ADEGAN_PERIKSA_KUNCI } from "./k4b2d-materi-3";
import { ADEGAN_LUAR_KISI, ADEGAN_LUAR_KISI_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_TENTHS, ADEGAN_LUAR_TENTHS_TERAPAN } from "./k4b2d-luar-1";
import { ADEGAN_LUAR_JEMBATAN, ADEGAN_LUAR_JEMBATAN_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TEMPAT, ADEGAN_LUAR_TEMPAT_TERAPAN } from "./k4b2d-luar-2";

/** Kelas 4 Bab 2 Sub-Bab D (Pecahan Desimal Persepuluhan dan Perseratusan): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K4B2D: VideoStory = {
  id: "k4b2d-materi",
  judul: "Pecahan Desimal Persepuluhan dan Perseratusan",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    ADEGAN_AMATI_ROTI,
    ADEGAN_TIGA_BISKUIT,
    ADEGAN_CONTOH_KOMA,
    ADEGAN_HATI_HATI,
    ADEGAN_BERLATIH_SATU,
    ADEGAN_BERLATIH_DUA,
    ADEGAN_BERLATIH_TIGA,
    ADEGAN_PERIKSA_KUNCI,
    ADEGAN_DIFERENSIASI,
    ADEGAN_CATATAN_BUKU,
  ],
};

export const VIDEO_LUAR_K4B2D: VideoStory = {
  id: "k4b2d-luar",
  judul: "Membaca Pecahan Desimal: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_TENTHS,
    ADEGAN_LUAR_TENTHS_TERAPAN,
    ADEGAN_LUAR_KISI,
    ADEGAN_LUAR_KISI_TERAPAN,
    ADEGAN_LUAR_JEMBATAN,
    ADEGAN_LUAR_JEMBATAN_TERAPAN,
    ADEGAN_LUAR_TEMPAT,
    ADEGAN_LUAR_TEMPAT_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
