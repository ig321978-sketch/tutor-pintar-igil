import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_EKSPLORASI11A, ADEGAN_EKSPLORASI11B, ADEGAN_EKSPLORASI12 } from "./k6b1a-materi-2";
import { ADEGAN_LATIHAN_A, ADEGAN_LATIHAN_B } from "./k6b1a-materi-3";
import { ADEGAN_LUAR_AREA, ADEGAN_LUAR_AREA_TERAPAN, ADEGAN_LUAR_BULAT, ADEGAN_LUAR_BULAT_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k6b1a-luar-1";
import { ADEGAN_LUAR_PANAH, ADEGAN_LUAR_PANAH_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TUKAR, ADEGAN_LUAR_TUKAR_TERAPAN } from "./k6b1a-luar-2";

/**
 * Kelas 6 Bab 1 Sub-Bab A (Perkalian Pecahan), termasuk pembuka bab: video materi kurikulum dan video metode luar, dua video terpisah.
 * Adegan administratif (pembuka bab dengan Agam dan penampungan air, tujuan dan peta konsep, mengingat kembali, dan refleksi) tetap ada di berkas materi, tetapi tidak diputar.
 */
export const VIDEO_MATERI_K6B1A: VideoStory = {
  id: "k6b1a-materi",
  judul: "Perkalian Pecahan",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "perkalian pecahan", daftar: ["Bilangan asli kali pecahan", "Pecahan kali bilangan asli", "Urutan kali boleh ditukar"] }),
    ADEGAN_EKSPLORASI11A,
    ADEGAN_EKSPLORASI11B,
    ADEGAN_EKSPLORASI12,
    ADEGAN_LATIHAN_A,
    ADEGAN_LATIHAN_B,
  ],
};

export const VIDEO_LUAR_K6B1A: VideoStory = {
  id: "k6b1a-luar",
  judul: "Perkalian Pecahan: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "perkalian pecahan" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_AREA,
    ADEGAN_LUAR_AREA_TERAPAN,
    ADEGAN_LUAR_BULAT,
    ADEGAN_LUAR_BULAT_TERAPAN,
    ADEGAN_LUAR_PANAH,
    ADEGAN_LUAR_PANAH_TERAPAN,
    ADEGAN_LUAR_TUKAR,
    ADEGAN_LUAR_TUKAR_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
