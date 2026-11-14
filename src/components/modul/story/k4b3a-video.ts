import type { VideoStory } from "./logika-story";
import { ADEGAN_AKTIVITAS_SATU, ADEGAN_PANDUAN_AWAL, ADEGAN_PEMBUKA, ADEGAN_PETA } from "./k4b3a-materi-1";
import { ADEGAN_AKTIVITAS_DUA, ADEGAN_AKTIVITAS_SATU_HASIL, ADEGAN_AMATI_JERUK, ADEGAN_AMATI_PERMEN } from "./k4b3a-materi-2";
import { ADEGAN_BERLATIH_LIMA, ADEGAN_BERLATIH_SATU_DUA, ADEGAN_BERLATIH_TIGA_EMPAT, ADEGAN_DIFERENSIASI } from "./k4b3a-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_TUMBUH, ADEGAN_LUAR_TUMBUH_TERAPAN, ADEGAN_LUAR_ULANG, ADEGAN_LUAR_ULANG_TERAPAN } from "./k4b3a-luar-1";
import { ADEGAN_LUAR_GAMBAR, ADEGAN_LUAR_GAMBAR_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_STRUKTUR, ADEGAN_LUAR_STRUKTUR_TERAPAN } from "./k4b3a-luar-2";

/** Kelas 4 Bab 3 Sub-Bab A (Pola Gambar), termasuk pembuka bab: video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K4B3A: VideoStory = {
  id: "k4b3a-materi",
  judul: "Pola Gambar menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 85–94 (Aktivitas 1 dan 2)",
  jenis: "materi",
  adegan: [
    ADEGAN_PEMBUKA,
    ADEGAN_PETA,
    ADEGAN_PANDUAN_AWAL,
    ADEGAN_AKTIVITAS_SATU,
    ADEGAN_AKTIVITAS_SATU_HASIL,
    ADEGAN_AMATI_JERUK,
    ADEGAN_AKTIVITAS_DUA,
    ADEGAN_AMATI_PERMEN,
    ADEGAN_BERLATIH_SATU_DUA,
    ADEGAN_BERLATIH_TIGA_EMPAT,
    ADEGAN_BERLATIH_LIMA,
    ADEGAN_DIFERENSIASI,
  ],
};

export const VIDEO_LUAR_K4B3A: VideoStory = {
  id: "k4b3a-luar",
  judul: "Membaca Pola Gambar: Metode dari Luar",
  subjudul: "Empat metode luar · angka dari buku",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_ULANG,
    ADEGAN_LUAR_ULANG_TERAPAN,
    ADEGAN_LUAR_TUMBUH,
    ADEGAN_LUAR_TUMBUH_TERAPAN,
    ADEGAN_LUAR_STRUKTUR,
    ADEGAN_LUAR_STRUKTUR_TERAPAN,
    ADEGAN_LUAR_GAMBAR,
    ADEGAN_LUAR_GAMBAR_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
