import type { VideoStory } from "./logika-story";
import { ADEGAN_BENTENG, ADEGAN_PEMBUKA, ADEGAN_PETA, ADEGAN_SEKELILING } from "./k5b4a-materi-1";
import { ADEGAN_NISA_LUKAS, ADEGAN_PILIH, ADEGAN_SOAL, ADEGAN_YOHANA_ASEP } from "./k5b4a-materi-2";
import { ADEGAN_EKS41B, ADEGAN_KESIMPULAN, ADEGAN_UKUR } from "./k5b4a-materi-3";
import { ADEGAN_LUAR_FENCING, ADEGAN_LUAR_FENCING_TERAPAN, ADEGAN_LUAR_PATH, ADEGAN_LUAR_PATH_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k5b4a-luar-1";
import { ADEGAN_LUAR_AREA, ADEGAN_LUAR_AREA_TERAPAN, ADEGAN_LUAR_LOOP, ADEGAN_LUAR_LOOP_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b4a-luar-2";

/** Kelas 5 Bab 4 Sub-Bab A (apakah keliling bangun datar itu), termasuk pembuka bab: video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B4A: VideoStory = {
  id: "k5b4a-materi",
  judul: "Apakah Keliling Bangun Datar Itu? menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 105–114 (Eksplorasi 4.1A dan 4.1B)",
  jenis: "materi",
  adegan: [ADEGAN_PEMBUKA, ADEGAN_PETA, ADEGAN_BENTENG, ADEGAN_SEKELILING, ADEGAN_SOAL, ADEGAN_NISA_LUKAS, ADEGAN_YOHANA_ASEP, ADEGAN_PILIH, ADEGAN_EKS41B, ADEGAN_UKUR, ADEGAN_KESIMPULAN],
};

export const VIDEO_LUAR_K5B4A: VideoStory = {
  id: "k5b4a-luar",
  judul: "Apakah Keliling Bangun Datar Itu?: Metode dari Luar",
  subjudul: "Empat metode luar · contoh lapangan sepak bola dan dua bangun datar",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_PATH,
    ADEGAN_LUAR_PATH_TERAPAN,
    ADEGAN_LUAR_FENCING,
    ADEGAN_LUAR_FENCING_TERAPAN,
    ADEGAN_LUAR_AREA,
    ADEGAN_LUAR_AREA_TERAPAN,
    ADEGAN_LUAR_LOOP,
    ADEGAN_LUAR_LOOP_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
