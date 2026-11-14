import type { VideoStory } from "./logika-story";
import { ADEGAN_APERSEPSI_D, ADEGAN_PEMBUKA_D, ADEGAN_SOAL_KAWAT } from "./k5b5d-materi-1";
import { ADEGAN_BANDING, ADEGAN_BENTUK_1, ADEGAN_TABEL_1, ADEGAN_TABEL_2 } from "./k5b5d-materi-2";
import { ADEGAN_MISKONSEPSI, ADEGAN_PENGAYAAN, ADEGAN_PENUTUP_D, ADEGAN_REFLEKSI_D } from "./k5b5d-materi-3";
import { ADEGAN_LUAR_ISO, ADEGAN_LUAR_ISO_TERAPAN, ADEGAN_LUAR_MAKS, ADEGAN_LUAR_MAKS_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k5b5d-luar-1";
import { ADEGAN_LUAR_MIN, ADEGAN_LUAR_MIN_TERAPAN, ADEGAN_LUAR_RASIO, ADEGAN_LUAR_RASIO_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b5d-luar-2";

/** Kelas 5 Bab 5 Sub-Bab D (hubungan keliling dan luas, penutup bab): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B5D: VideoStory = {
  id: "k5b5d-materi",
  judul: "Hubungan Keliling dan Luas menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 159–161 dan Panduan Guru",
  jenis: "materi",
  adegan: [
    ADEGAN_PEMBUKA_D,
    ADEGAN_APERSEPSI_D,
    ADEGAN_SOAL_KAWAT,
    ADEGAN_BENTUK_1,
    ADEGAN_TABEL_1,
    ADEGAN_TABEL_2,
    ADEGAN_BANDING,
    ADEGAN_MISKONSEPSI,
    ADEGAN_REFLEKSI_D,
    ADEGAN_PENGAYAAN,
    ADEGAN_PENUTUP_D,
  ],
};

export const VIDEO_LUAR_K5B5D: VideoStory = {
  id: "k5b5d-luar",
  judul: "Hubungan Keliling dan Luas: Metode dari Luar",
  subjudul: "Empat metode luar · kerangka kawat 60 sentimeter dan tabel Eksplorasi 5.4",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_ISO,
    ADEGAN_LUAR_ISO_TERAPAN,
    ADEGAN_LUAR_MAKS,
    ADEGAN_LUAR_MAKS_TERAPAN,
    ADEGAN_LUAR_MIN,
    ADEGAN_LUAR_MIN_TERAPAN,
    ADEGAN_LUAR_RASIO,
    ADEGAN_LUAR_RASIO_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
