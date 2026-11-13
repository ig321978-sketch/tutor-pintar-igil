import type { VideoStory } from "./logika-story";
import { ADEGAN_MENGINGAT, ADEGAN_PEMBUKA, ADEGAN_TUJUAN } from "./k6b1a-materi-1";
import { ADEGAN_EKSPLORASI11A, ADEGAN_EKSPLORASI11B, ADEGAN_EKSPLORASI12 } from "./k6b1a-materi-2";
import { ADEGAN_LATIHAN_A, ADEGAN_LATIHAN_B, ADEGAN_REFLEKSI } from "./k6b1a-materi-3";
import { ADEGAN_LUAR_AREA, ADEGAN_LUAR_AREA_TERAPAN, ADEGAN_LUAR_BULAT, ADEGAN_LUAR_BULAT_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k6b1a-luar-1";
import { ADEGAN_LUAR_PANAH, ADEGAN_LUAR_PANAH_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TUKAR, ADEGAN_LUAR_TUKAR_TERAPAN } from "./k6b1a-luar-2";

/** Kelas 6 Bab 1 Sub-Bab A (Perkalian Pecahan), termasuk pembuka bab: video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K6B1A: VideoStory = {
  id: "k6b1a-materi",
  judul: "Perkalian Pecahan menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 1–16",
  jenis: "materi",
  adegan: [ADEGAN_PEMBUKA, ADEGAN_TUJUAN, ADEGAN_MENGINGAT, ADEGAN_EKSPLORASI11A, ADEGAN_EKSPLORASI11B, ADEGAN_EKSPLORASI12, ADEGAN_LATIHAN_A, ADEGAN_LATIHAN_B, ADEGAN_REFLEKSI],
};

export const VIDEO_LUAR_K6B1A: VideoStory = {
  id: "k6b1a-luar",
  judul: "Perkalian Pecahan: Metode dari Luar",
  subjudul: "Empat metode luar · contoh dari kebun Agam dan soal buku",
  jenis: "metode-luar",
  adegan: [
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
