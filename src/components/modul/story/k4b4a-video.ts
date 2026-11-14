import type { VideoStory } from "./logika-story";
import { ADEGAN_AKTIVITAS_SATU, ADEGAN_PANDUAN_AWAL, ADEGAN_PEMBUKA, ADEGAN_PETA } from "./k4b4a-materi-1";
import { ADEGAN_AMATI_SATUAN, ADEGAN_KEGIATAN_A1, ADEGAN_KEGIATAN_A2, ADEGAN_SATUAN_PERSEGI } from "./k4b4a-materi-2";
import { ADEGAN_BERLATIH_BAKU, ADEGAN_BERLATIH_PERSEGI, ADEGAN_KONVERSI, ADEGAN_MENCOBA_DUA, ADEGAN_MENCOBA_SATU, ADEGAN_MISKONSEPSI, ADEGAN_SATUAN_BAKU } from "./k4b4a-materi-3";
import { ADEGAN_LUAR_COVER, ADEGAN_LUAR_COVER_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_SUSUN, ADEGAN_LUAR_SUSUN_TERAPAN } from "./k4b4a-luar-1";
import { ADEGAN_LUAR_PETAK, ADEGAN_LUAR_PETAK_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TAK_BAKU, ADEGAN_LUAR_TAK_BAKU_TERAPAN } from "./k4b4a-luar-2";

/** Kelas 4 Bab 4 Sub-Bab A (Pengukuran Luas), termasuk pembuka bab: video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K4B4A: VideoStory = {
  id: "k4b4a-materi",
  judul: "Pengukuran Luas menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 103–121 (Aktivitas 1 dan 2)",
  jenis: "materi",
  adegan: [
    ADEGAN_PEMBUKA,
    ADEGAN_PETA,
    ADEGAN_PANDUAN_AWAL,
    ADEGAN_AKTIVITAS_SATU,
    ADEGAN_AMATI_SATUAN,
    ADEGAN_KEGIATAN_A1,
    ADEGAN_KEGIATAN_A2,
    ADEGAN_SATUAN_PERSEGI,
    ADEGAN_BERLATIH_PERSEGI,
    ADEGAN_SATUAN_BAKU,
    ADEGAN_KONVERSI,
    ADEGAN_MENCOBA_SATU,
    ADEGAN_MENCOBA_DUA,
    ADEGAN_BERLATIH_BAKU,
    ADEGAN_MISKONSEPSI,
  ],
};

export const VIDEO_LUAR_K4B4A: VideoStory = {
  id: "k4b4a-luar",
  judul: "Mengukur Luas: Metode dari Luar",
  subjudul: "Empat metode luar · angka dari buku",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_COVER,
    ADEGAN_LUAR_COVER_TERAPAN,
    ADEGAN_LUAR_SUSUN,
    ADEGAN_LUAR_SUSUN_TERAPAN,
    ADEGAN_LUAR_TAK_BAKU,
    ADEGAN_LUAR_TAK_BAKU_TERAPAN,
    ADEGAN_LUAR_PETAK,
    ADEGAN_LUAR_PETAK_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
