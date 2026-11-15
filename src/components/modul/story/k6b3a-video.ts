import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_KONTAINER, ADEGAN_PEMBUKA } from "./k6b3a-materi-1";
import { ADEGAN_BALOK, ADEGAN_EKSPLORASI31 } from "./k6b3a-materi-2";
import { ADEGAN_LATIHAN31, ADEGAN_PAK_HASAN } from "./k6b3a-materi-3";
import { ADEGAN_LUAR_A_LAPIS, ADEGAN_LUAR_A_LAPIS_TERAPAN, ADEGAN_LUAR_A_PEMBUKA } from "./k6b3a-luar-1";
import { ADEGAN_LUAR_A_JEJAK, ADEGAN_LUAR_A_JEJAK_TERAPAN, ADEGAN_LUAR_A_PUTAR, ADEGAN_LUAR_A_RINGKAS, ADEGAN_LUAR_A_SANGGA } from "./k6b3a-luar-2";

/**
 * Kelas 6 Bab 3 Sub-Bab A (Mengonstruksi dan Mengurai), termasuk pembuka bab: video materi kurikulum dan video metode luar, dua video terpisah.
 * Adegan administratif (tujuan, peta konsep, dan mengingat kembali) tetap ada di berkas materi, tetapi tidak diputar.
 */
export const VIDEO_MATERI_K6B3A: VideoStory = {
  id: "k6b3a-materi",
  judul: "Mengonstruksi dan Mengurai",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "menyusun dan menguraikan kubus dan balok", daftar: ["Menyusun kubus dan balok", "Menghitung per lapisan", "Kubus penyangga tersembunyi"] }),
    ADEGAN_PEMBUKA,
    ADEGAN_KONTAINER,
    ADEGAN_EKSPLORASI31,
    ADEGAN_BALOK,
    ADEGAN_LATIHAN31,
    ADEGAN_PAK_HASAN,
  ],
};

export const VIDEO_LUAR_K6B3A: VideoStory = {
  id: "k6b3a-luar",
  judul: "Mengonstruksi dan Mengurai: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "menyusun dan menguraikan kubus dan balok" }),
    ADEGAN_LUAR_A_PEMBUKA,
    ADEGAN_LUAR_A_LAPIS,
    ADEGAN_LUAR_A_LAPIS_TERAPAN,
    ADEGAN_LUAR_A_SANGGA,
    ADEGAN_LUAR_A_PUTAR,
    ADEGAN_LUAR_A_JEJAK,
    ADEGAN_LUAR_A_JEJAK_TERAPAN,
    ADEGAN_LUAR_A_RINGKAS,
  ],
};
