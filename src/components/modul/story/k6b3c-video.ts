import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_EKSPLORASI33, ADEGAN_PERMAINAN, ADEGAN_PETA } from "./k6b3c-materi-1";
import { ADEGAN_EKSPLORASI34, ADEGAN_LATIHAN33, ADEGAN_LATIHAN34, ADEGAN_PEMBAHASAN_PQ, ADEGAN_UJI_PENGAYAAN } from "./k6b3c-materi-2";
import { ADEGAN_LUAR_C_GRID, ADEGAN_LUAR_C_GRID_TERAPAN, ADEGAN_LUAR_C_MANHATTAN, ADEGAN_LUAR_C_MANHATTAN_TERAPAN, ADEGAN_LUAR_C_PEMBUKA } from "./k6b3c-luar-1";
import { ADEGAN_LUAR_C_LATTICE, ADEGAN_LUAR_C_LATTICE_TERAPAN, ADEGAN_LUAR_C_PASCAL, ADEGAN_LUAR_C_PASCAL_SEGITIGA, ADEGAN_LUAR_C_RINGKAS } from "./k6b3c-luar-2";

/**
 * Kelas 6 Bab 3 Sub-Bab C (Lokasi): video materi kurikulum dan video metode luar, dua video terpisah.
 * Seluruh adegan materi bermakna dan diputar; tiap video dibuka adegan sapaan.
 */
export const VIDEO_MATERI_K6B3C: VideoStory = {
  id: "k6b3c-materi",
  judul: "Lokasi",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "lokasi", daftar: ["Alamat huruf dan bilangan", "Jarak dua titik", "Banyak jalur terpendek"] }),
    ADEGAN_PETA,
    ADEGAN_EKSPLORASI33,
    ADEGAN_PERMAINAN,
    ADEGAN_LATIHAN33,
    ADEGAN_EKSPLORASI34,
    ADEGAN_PEMBAHASAN_PQ,
    ADEGAN_LATIHAN34,
    ADEGAN_UJI_PENGAYAAN,
  ],
};

export const VIDEO_LUAR_K6B3C: VideoStory = {
  id: "k6b3c-luar",
  judul: "Lokasi dan Jalur: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "lokasi dan jalur" }),
    ADEGAN_LUAR_C_PEMBUKA,
    ADEGAN_LUAR_C_GRID,
    ADEGAN_LUAR_C_GRID_TERAPAN,
    ADEGAN_LUAR_C_MANHATTAN,
    ADEGAN_LUAR_C_MANHATTAN_TERAPAN,
    ADEGAN_LUAR_C_LATTICE,
    ADEGAN_LUAR_C_LATTICE_TERAPAN,
    ADEGAN_LUAR_C_PASCAL,
    ADEGAN_LUAR_C_PASCAL_SEGITIGA,
    ADEGAN_LUAR_C_RINGKAS,
  ],
};
