import type { VideoStory } from "./logika-story";
import { ADEGAN_EKSPLORASI33, ADEGAN_PERMAINAN, ADEGAN_PETA } from "./k6b3c-materi-1";
import { ADEGAN_EKSPLORASI34, ADEGAN_LATIHAN33, ADEGAN_LATIHAN34, ADEGAN_PEMBAHASAN_PQ, ADEGAN_UJI_PENGAYAAN } from "./k6b3c-materi-2";
import { ADEGAN_LUAR_C_GRID, ADEGAN_LUAR_C_GRID_TERAPAN, ADEGAN_LUAR_C_MANHATTAN, ADEGAN_LUAR_C_MANHATTAN_TERAPAN, ADEGAN_LUAR_C_PEMBUKA } from "./k6b3c-luar-1";
import { ADEGAN_LUAR_C_LATTICE, ADEGAN_LUAR_C_LATTICE_TERAPAN, ADEGAN_LUAR_C_PASCAL, ADEGAN_LUAR_C_PASCAL_SEGITIGA, ADEGAN_LUAR_C_RINGKAS } from "./k6b3c-luar-2";

/** Kelas 6 Bab 3 Sub-Bab C (Lokasi): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K6B3C: VideoStory = {
  id: "k6b3c-materi",
  judul: "Lokasi menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 91–98",
  jenis: "materi",
  adegan: [ADEGAN_PETA, ADEGAN_EKSPLORASI33, ADEGAN_PERMAINAN, ADEGAN_LATIHAN33, ADEGAN_EKSPLORASI34, ADEGAN_PEMBAHASAN_PQ, ADEGAN_LATIHAN34, ADEGAN_UJI_PENGAYAAN],
};

export const VIDEO_LUAR_K6B3C: VideoStory = {
  id: "k6b3c-luar",
  judul: "Lokasi dan Jalur: Metode dari Luar",
  subjudul: "Empat metode luar · contoh dari buku Tigor dan Tenri",
  jenis: "metode-luar",
  adegan: [ADEGAN_LUAR_C_PEMBUKA, ADEGAN_LUAR_C_GRID, ADEGAN_LUAR_C_GRID_TERAPAN, ADEGAN_LUAR_C_MANHATTAN, ADEGAN_LUAR_C_MANHATTAN_TERAPAN, ADEGAN_LUAR_C_LATTICE, ADEGAN_LUAR_C_LATTICE_TERAPAN, ADEGAN_LUAR_C_PASCAL, ADEGAN_LUAR_C_PASCAL_SEGITIGA, ADEGAN_LUAR_C_RINGKAS],
};
