import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_ALUN, ADEGAN_DENAH } from "./k5b5a-materi-1";
import { ADEGAN_BENAR_SALAH, ADEGAN_KAMAR, ADEGAN_SATUAN, ADEGAN_TAMU } from "./k5b5a-materi-2";
import { ADEGAN_LATIHAN, ADEGAN_REFLEKSI, ADEGAN_YOHANA } from "./k5b5a-materi-3";
import { ADEGAN_LUAR_ARRAY, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_USC, ADEGAN_LUAR_USC_TERAPAN } from "./k5b5a-luar-1";
import { ADEGAN_LUAR_ARRAY_TERAPAN, ADEGAN_LUAR_GRID, ADEGAN_LUAR_GRID_TERAPAN, ADEGAN_LUAR_KONSERVASI, ADEGAN_LUAR_KONSERVASI_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b5a-luar-2";

/** Kelas 5 Bab 5 Sub-Bab A (konsep luas daerah), termasuk pembuka bab: video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B5A: VideoStory = {
  id: "k5b5a-materi",
  judul: "Konsep Luas Daerah Bangun Datar",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "luas daerah bangun datar", daftar: ["Luas sebagai ukuran daerah", "Satuan luas dan petak satuan", "Menghitung luas dengan petak"] }),
    ADEGAN_ALUN,
    ADEGAN_DENAH,
    ADEGAN_BENAR_SALAH,
    ADEGAN_SATUAN,
    ADEGAN_TAMU,
    ADEGAN_KAMAR,
    ADEGAN_LATIHAN,
    ADEGAN_YOHANA,
    ADEGAN_REFLEKSI,
  ],
};

export const VIDEO_LUAR_K5B5A: VideoStory = {
  id: "k5b5a-luar",
  judul: "Konsep Luas Daerah Bangun Datar: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "luas daerah bangun datar" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_USC,
    ADEGAN_LUAR_USC_TERAPAN,
    ADEGAN_LUAR_ARRAY,
    ADEGAN_LUAR_ARRAY_TERAPAN,
    ADEGAN_LUAR_KONSERVASI,
    ADEGAN_LUAR_KONSERVASI_TERAPAN,
    ADEGAN_LUAR_GRID,
    ADEGAN_LUAR_GRID_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
