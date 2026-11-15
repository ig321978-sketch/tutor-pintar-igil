import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_PERSEGI, ADEGAN_PERSEGI_PANJANG } from "./k5b5b-materi-1";
import { ADEGAN_JAJARGENJANG, ADEGAN_SEGITIGA_1, ADEGAN_SEGITIGA_2, ADEGAN_TRAPESIUM } from "./k5b5b-materi-2";
import { ADEGAN_BELAH_KETUPAT, ADEGAN_LAYANG_LAYANG, ADEGAN_MISKONSEPSI, ADEGAN_REFLEKSI_B } from "./k5b5b-materi-3";
import { ADEGAN_LUAR_DIS, ADEGAN_LUAR_DIS_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_SHR, ADEGAN_LUAR_SHR_TERAPAN } from "./k5b5b-luar-1";
import { ADEGAN_LUAR_BXH, ADEGAN_LUAR_BXH_TERAPAN, ADEGAN_LUAR_REH, ADEGAN_LUAR_REH_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b5b-luar-2";

/** Kelas 5 Bab 5 Sub-Bab B (luas daerah bangun datar): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B5B: VideoStory = {
  id: "k5b5b-materi",
  judul: "Luas Daerah Bangun Datar",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "luas daerah bangun datar", daftar: ["Persegi panjang dan persegi", "Segitiga dan jajargenjang", "Trapesium dan bangun lainnya"] }),
    ADEGAN_PERSEGI_PANJANG,
    ADEGAN_PERSEGI,
    ADEGAN_SEGITIGA_1,
    ADEGAN_SEGITIGA_2,
    ADEGAN_JAJARGENJANG,
    ADEGAN_TRAPESIUM,
    ADEGAN_BELAH_KETUPAT,
    ADEGAN_LAYANG_LAYANG,
    ADEGAN_MISKONSEPSI,
    ADEGAN_REFLEKSI_B,
  ],
};

export const VIDEO_LUAR_K5B5B: VideoStory = {
  id: "k5b5b-luar",
  judul: "Luas Daerah Bangun Datar: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "luas daerah bangun datar" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_DIS,
    ADEGAN_LUAR_DIS_TERAPAN,
    ADEGAN_LUAR_SHR,
    ADEGAN_LUAR_SHR_TERAPAN,
    ADEGAN_LUAR_BXH,
    ADEGAN_LUAR_BXH_TERAPAN,
    ADEGAN_LUAR_REH,
    ADEGAN_LUAR_REH_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
