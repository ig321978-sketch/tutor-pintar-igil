import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BOTOL, ADEGAN_EKSPLOR13A, ADEGAN_EKSPLOR13BC, ADEGAN_KESIMPULAN13 } from "./k6b1b-materi-1";
import { ADEGAN_EKSPLOR14A, ADEGAN_EKSPLOR14B, ADEGAN_RINI } from "./k6b1b-materi-2";
import { ADEGAN_LATIHAN12A, ADEGAN_LATIHAN12B } from "./k6b1b-materi-3";
import { ADEGAN_LUAR_B_BALIK, ADEGAN_LUAR_B_BALIK_TERAPAN, ADEGAN_LUAR_B_PARTISI, ADEGAN_LUAR_B_PARTISI_TERAPAN, ADEGAN_LUAR_B_PEMBUKA } from "./k6b1b-luar-1";
import { ADEGAN_LUAR_B_RINGKAS, ADEGAN_LUAR_B_SILANG, ADEGAN_LUAR_B_SILANG_TERAPAN, ADEGAN_LUAR_B_UKUR, ADEGAN_LUAR_B_UKUR_TERAPAN } from "./k6b1b-luar-2";

/**
 * Kelas 6 Bab 1 Sub-Bab B (Pembagian Pecahan): video materi kurikulum dan video metode luar, dua video terpisah.
 * Adegan administratif (renungan penutup) tetap ada di berkas materi, tetapi tidak diputar.
 */
export const VIDEO_MATERI_K6B1B: VideoStory = {
  id: "k6b1b-materi",
  judul: "Pembagian Pecahan",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "pembagian pecahan", daftar: ["Pecahan dibagi bilangan asli", "Bilangan asli dibagi pecahan", "Kebalikan sebuah pecahan"] }),
    ADEGAN_BOTOL,
    ADEGAN_EKSPLOR13A,
    ADEGAN_EKSPLOR13BC,
    ADEGAN_KESIMPULAN13,
    ADEGAN_RINI,
    ADEGAN_EKSPLOR14A,
    ADEGAN_EKSPLOR14B,
    ADEGAN_LATIHAN12A,
    ADEGAN_LATIHAN12B,
  ],
};

export const VIDEO_LUAR_K6B1B: VideoStory = {
  id: "k6b1b-luar",
  judul: "Pembagian Pecahan: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "pembagian pecahan" }),
    ADEGAN_LUAR_B_PEMBUKA,
    ADEGAN_LUAR_B_PARTISI,
    ADEGAN_LUAR_B_PARTISI_TERAPAN,
    ADEGAN_LUAR_B_BALIK,
    ADEGAN_LUAR_B_BALIK_TERAPAN,
    ADEGAN_LUAR_B_SILANG,
    ADEGAN_LUAR_B_SILANG_TERAPAN,
    ADEGAN_LUAR_B_UKUR,
    ADEGAN_LUAR_B_UKUR_TERAPAN,
    ADEGAN_LUAR_B_RINGKAS,
  ],
};
