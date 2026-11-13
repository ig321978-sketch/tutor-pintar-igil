import type { VideoStory } from "./logika-story";
import { ADEGAN_ANIKE, ADEGAN_ARSITEK } from "./k6b3b-materi-1";
import { ADEGAN_PEMBAHASAN, ADEGAN_REKONSTRUKSI } from "./k6b3b-materi-2";
import { ADEGAN_DADU, ADEGAN_LATIHAN32, ADEGAN_UJI_REFLEKSI } from "./k6b3b-materi-3";
import { ADEGAN_LUAR_MATRIKS, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_PROYEKSI } from "./k6b3b-luar-1";
import { ADEGAN_LUAR_OKLUSI, ADEGAN_LUAR_REKONSTRUKSI, ADEGAN_LUAR_RINGKAS } from "./k6b3b-luar-2";

/** Kelas 6 Bab 3 Sub-Bab B (Visualisasi Spasial): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K6B3B: VideoStory = {
  id: "k6b3b-materi",
  judul: "Visualisasi Spasial menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 85–90",
  jenis: "materi",
  adegan: [ADEGAN_ARSITEK, ADEGAN_ANIKE, ADEGAN_REKONSTRUKSI, ADEGAN_PEMBAHASAN, ADEGAN_LATIHAN32, ADEGAN_DADU, ADEGAN_UJI_REFLEKSI],
};

export const VIDEO_LUAR_K6B3B: VideoStory = {
  id: "k6b3b-luar",
  judul: "Visualisasi Spasial: Metode dari Luar",
  subjudul: "Empat metode luar · contoh dari buku Anike",
  jenis: "metode-luar",
  adegan: [ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_PROYEKSI, ADEGAN_LUAR_MATRIKS, ADEGAN_LUAR_OKLUSI, ADEGAN_LUAR_REKONSTRUKSI, ADEGAN_LUAR_RINGKAS],
};
