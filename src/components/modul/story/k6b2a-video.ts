import type { VideoStory } from "./logika-story";
import { ADEGAN_MENGINGAT, ADEGAN_PEMBUKA, ADEGAN_TUJUAN } from "./k6b2a-materi-1";
import { ADEGAN_EKSPLORASI21, ADEGAN_EKSPLORASI22 } from "./k6b2a-materi-2";
import { ADEGAN_LATIHAN21, ADEGAN_REFLEKSI } from "./k6b2a-materi-3";
import { ADEGAN_LUAR_A_BAHASA, ADEGAN_LUAR_A_BAHASA_TERAPAN, ADEGAN_LUAR_A_PEMBUKA, ADEGAN_LUAR_A_URUTAN, ADEGAN_LUAR_A_URUTAN_TERAPAN } from "./k6b2a-luar-1";
import { ADEGAN_LUAR_A_BANDING, ADEGAN_LUAR_A_BANDING_TERAPAN, ADEGAN_LUAR_A_FPB, ADEGAN_LUAR_A_FPB_TERAPAN, ADEGAN_LUAR_A_RINGKAS } from "./k6b2a-luar-2";

/** Kelas 6 Bab 2 Sub-Bab A (Konsep Rasio), termasuk pembuka bab: video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K6B2A: VideoStory = {
  id: "k6b2a-materi",
  judul: "Konsep Rasio menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 46–55",
  jenis: "materi",
  adegan: [ADEGAN_PEMBUKA, ADEGAN_TUJUAN, ADEGAN_MENGINGAT, ADEGAN_EKSPLORASI21, ADEGAN_EKSPLORASI22, ADEGAN_LATIHAN21, ADEGAN_REFLEKSI],
};

export const VIDEO_LUAR_K6B2A: VideoStory = {
  id: "k6b2a-luar",
  judul: "Konsep Rasio: Metode dari Luar",
  subjudul: "Empat metode luar · contoh dari buku Artus dan Pak Wayan",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_A_PEMBUKA,
    ADEGAN_LUAR_A_BAHASA,
    ADEGAN_LUAR_A_BAHASA_TERAPAN,
    ADEGAN_LUAR_A_URUTAN,
    ADEGAN_LUAR_A_URUTAN_TERAPAN,
    ADEGAN_LUAR_A_FPB,
    ADEGAN_LUAR_A_FPB_TERAPAN,
    ADEGAN_LUAR_A_BANDING,
    ADEGAN_LUAR_A_BANDING_TERAPAN,
    ADEGAN_LUAR_A_RINGKAS,
  ],
};
