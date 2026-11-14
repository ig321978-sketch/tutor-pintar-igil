import type { VideoStory } from "./logika-story";
import { ADEGAN_ALUN, ADEGAN_DENAH, ADEGAN_PEMBUKA, ADEGAN_PETA } from "./k5b5a-materi-1";
import { ADEGAN_BENAR_SALAH, ADEGAN_KAMAR, ADEGAN_SATUAN, ADEGAN_TAMU } from "./k5b5a-materi-2";
import { ADEGAN_LATIHAN, ADEGAN_REFLEKSI, ADEGAN_YOHANA } from "./k5b5a-materi-3";
import { ADEGAN_LUAR_ARRAY, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_USC, ADEGAN_LUAR_USC_TERAPAN } from "./k5b5a-luar-1";
import { ADEGAN_LUAR_ARRAY_TERAPAN, ADEGAN_LUAR_GRID, ADEGAN_LUAR_GRID_TERAPAN, ADEGAN_LUAR_KONSERVASI, ADEGAN_LUAR_KONSERVASI_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b5a-luar-2";

/** Kelas 5 Bab 5 Sub-Bab A (konsep luas daerah), termasuk pembuka bab: video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B5A: VideoStory = {
  id: "k5b5a-materi",
  judul: "Konsep Luas Daerah menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 131–143 dan Refleksi nomor 1 sampai 5",
  jenis: "materi",
  adegan: [ADEGAN_PEMBUKA, ADEGAN_PETA, ADEGAN_ALUN, ADEGAN_DENAH, ADEGAN_BENAR_SALAH, ADEGAN_SATUAN, ADEGAN_TAMU, ADEGAN_KAMAR, ADEGAN_LATIHAN, ADEGAN_YOHANA, ADEGAN_REFLEKSI],
};

export const VIDEO_LUAR_K5B5A: VideoStory = {
  id: "k5b5a-luar",
  judul: "Konsep Luas Daerah: Metode dari Luar",
  subjudul: "Empat metode luar · contoh denah rumah dan bangun A sampai G",
  jenis: "metode-luar",
  adegan: [
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
