import type { VideoStory } from "./logika-story";
import { ADEGAN_AKTIVITAS_3, ADEGAN_BERLATIH_1, ADEGAN_PEMBUKA_B, ADEGAN_SABUN, ADEGAN_SATUAN_BAKU } from "./k4b4b-materi-1";
import { ADEGAN_AKTIVITAS_4, ADEGAN_BERLATIH_HITUNG, ADEGAN_BERLATIH_KONVERSI, ADEGAN_CM3_M3, ADEGAN_KUBUS_MENCOBA } from "./k4b4b-materi-2";
import { ADEGAN_KUBUS_BERLATIH, ADEGAN_PENGAYAAN_LUAS, ADEGAN_PENGAYAAN_VOLUME, ADEGAN_PENUTUP_B, ADEGAN_UK_1, ADEGAN_UK_2 } from "./k4b4b-materi-3";
import { ADEGAN_LUAR_LM, ADEGAN_LUAR_LM_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_VF, ADEGAN_LUAR_VF_TERAPAN } from "./k4b4b-luar-1";
import { ADEGAN_LUAR_BR, ADEGAN_LUAR_BR_TERAPAN, ADEGAN_LUAR_DI, ADEGAN_LUAR_DI_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k4b4b-luar-2";

/** Kelas 4 Bab 4 Sub-Bab B (Pengukuran Volume), penutup bab: video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K4B4B: VideoStory = {
  id: "k4b4b-materi",
  judul: "Pengukuran Volume menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 122–138 dan Panduan Guru hlm. 155–174",
  jenis: "materi",
  adegan: [
    ADEGAN_PEMBUKA_B,
    ADEGAN_AKTIVITAS_3,
    ADEGAN_SABUN,
    ADEGAN_BERLATIH_1,
    ADEGAN_SATUAN_BAKU,
    ADEGAN_BERLATIH_KONVERSI,
    ADEGAN_BERLATIH_HITUNG,
    ADEGAN_AKTIVITAS_4,
    ADEGAN_CM3_M3,
    ADEGAN_KUBUS_MENCOBA,
    ADEGAN_KUBUS_BERLATIH,
    ADEGAN_UK_1,
    ADEGAN_UK_2,
    ADEGAN_PENGAYAAN_LUAS,
    ADEGAN_PENGAYAAN_VOLUME,
    ADEGAN_PENUTUP_B,
  ],
};

export const VIDEO_LUAR_K4B4B: VideoStory = {
  id: "k4b4b-luar",
  judul: "Volume: Metode dari Luar",
  subjudul: "Empat metode luar · bangun dan angka dari buku",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_VF,
    ADEGAN_LUAR_VF_TERAPAN,
    ADEGAN_LUAR_LM,
    ADEGAN_LUAR_LM_TERAPAN,
    ADEGAN_LUAR_DI,
    ADEGAN_LUAR_DI_TERAPAN,
    ADEGAN_LUAR_BR,
    ADEGAN_LUAR_BR_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
