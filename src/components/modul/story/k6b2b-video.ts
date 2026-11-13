import type { VideoStory } from "./logika-story";
import { ADEGAN_EKSPLORASI23, ADEGAN_POLYBAG } from "./k6b2b-materi-1";
import { ADEGAN_SATUAN_WAKTU, ADEGAN_TABEL_SENILAI, ADEGAN_TOGA } from "./k6b2b-materi-2";
import { ADEGAN_LATIHAN22, ADEGAN_REFLEKSI } from "./k6b2b-materi-3";
import { ADEGAN_LUAR_JEMBATAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_TABEL, ADEGAN_LUAR_TABEL_TERAPAN } from "./k6b2b-luar-1";
import { ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SATUAN, ADEGAN_LUAR_SATUAN_TERAPAN, ADEGAN_LUAR_SKALA, ADEGAN_LUAR_SKALA_TERAPAN } from "./k6b2b-luar-2";

/** Kelas 6 Bab 2 Sub-Bab B (Konsep Kesamaan Rasio): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K6B2B: VideoStory = {
  id: "k6b2b-materi",
  judul: "Kesamaan Rasio menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 56–65",
  jenis: "materi",
  adegan: [ADEGAN_POLYBAG, ADEGAN_EKSPLORASI23, ADEGAN_TABEL_SENILAI, ADEGAN_TOGA, ADEGAN_SATUAN_WAKTU, ADEGAN_LATIHAN22, ADEGAN_REFLEKSI],
};

export const VIDEO_LUAR_K6B2B: VideoStory = {
  id: "k6b2b-luar",
  judul: "Kesamaan Rasio: Metode dari Luar",
  subjudul: "Empat metode luar · contoh lahan, bibit, dan resep",
  jenis: "metode-luar",
  adegan: [ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_TABEL, ADEGAN_LUAR_TABEL_TERAPAN, ADEGAN_LUAR_JEMBATAN, ADEGAN_LUAR_SATUAN, ADEGAN_LUAR_SATUAN_TERAPAN, ADEGAN_LUAR_SKALA, ADEGAN_LUAR_SKALA_TERAPAN, ADEGAN_LUAR_RINGKAS],
};
