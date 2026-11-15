import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_ANIKE, ADEGAN_ARSITEK } from "./k6b3b-materi-1";
import { ADEGAN_PEMBAHASAN, ADEGAN_REKONSTRUKSI } from "./k6b3b-materi-2";
import { ADEGAN_DADU, ADEGAN_LATIHAN32, ADEGAN_UJI_REFLEKSI } from "./k6b3b-materi-3";
import { ADEGAN_LUAR_MATRIKS, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_PROYEKSI } from "./k6b3b-luar-1";
import { ADEGAN_LUAR_OKLUSI, ADEGAN_LUAR_REKONSTRUKSI, ADEGAN_LUAR_RINGKAS } from "./k6b3b-luar-2";

/**
 * Kelas 6 Bab 3 Sub-Bab B (Visualisasi Spasial): video materi kurikulum dan video metode luar, dua video terpisah.
 * Semua adegan materi bermakna dan diputar; adegan sapaan dipasang di depan tiap video.
 */
export const VIDEO_MATERI_K6B3B: VideoStory = {
  id: "k6b3b-materi",
  judul: "Visualisasi Spasial",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "visualisasi spasial", daftar: ["Gambar tampak berbagai arah", "Matriks tinggi tumpukan", "Susunan yang cocok"] }),
    ADEGAN_ARSITEK,
    ADEGAN_ANIKE,
    ADEGAN_REKONSTRUKSI,
    ADEGAN_PEMBAHASAN,
    ADEGAN_LATIHAN32,
    ADEGAN_DADU,
    ADEGAN_UJI_REFLEKSI,
  ],
};

export const VIDEO_LUAR_K6B3B: VideoStory = {
  id: "k6b3b-luar",
  judul: "Visualisasi Spasial: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "visualisasi spasial" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_PROYEKSI,
    ADEGAN_LUAR_MATRIKS,
    ADEGAN_LUAR_OKLUSI,
    ADEGAN_LUAR_REKONSTRUKSI,
    ADEGAN_LUAR_RINGKAS,
  ],
};
