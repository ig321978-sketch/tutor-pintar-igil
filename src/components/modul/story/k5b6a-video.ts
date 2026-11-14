import type { VideoStory } from "./logika-story";
import { ADEGAN_BINGKAI, ADEGAN_EKSPLORASI_ALAT, ADEGAN_EKSPLORASI_PERIKSA } from "./k5b6a-materi-2";
import { ADEGAN_MENGINGAT, ADEGAN_PEMBUKA, ADEGAN_PETA, ADEGAN_SEKITAR } from "./k5b6a-materi-1";
import { ADEGAN_LATIHAN_1, ADEGAN_LATIHAN_2, ADEGAN_MISKONSEPSI, ADEGAN_REFLEKSI } from "./k5b6a-materi-3";
import { ADEGAN_LUAR_BENCHMARK, ADEGAN_LUAR_BENCHMARK_TERAPAN, ADEGAN_LUAR_LIPAT, ADEGAN_LUAR_LIPAT_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k5b6a-luar-1";
import { ADEGAN_LUAR_DETEKTIF, ADEGAN_LUAR_DETEKTIF_TERAPAN, ADEGAN_LUAR_PUTARAN, ADEGAN_LUAR_PUTARAN_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b6a-luar-2";

/** Kelas 5 Bab 6 Sub-Bab A (sudut siku-siku), termasuk pembuka bab: video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B6A: VideoStory = {
  id: "k5b6a-materi",
  judul: "Sudut Siku-Siku menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 163–169 dan Refleksi nomor 1",
  jenis: "materi",
  adegan: [
    ADEGAN_PEMBUKA,
    ADEGAN_PETA,
    ADEGAN_SEKITAR,
    ADEGAN_MENGINGAT,
    ADEGAN_BINGKAI,
    ADEGAN_EKSPLORASI_ALAT,
    ADEGAN_EKSPLORASI_PERIKSA,
    ADEGAN_LATIHAN_1,
    ADEGAN_LATIHAN_2,
    ADEGAN_MISKONSEPSI,
    ADEGAN_REFLEKSI,
  ],
};

export const VIDEO_LUAR_K5B6A: VideoStory = {
  id: "k5b6a-luar",
  judul: "Sudut Siku-Siku: Metode dari Luar",
  subjudul: "Empat metode luar · contoh bingkai dan enam bangun Ayo Berlatih",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BENCHMARK,
    ADEGAN_LUAR_BENCHMARK_TERAPAN,
    ADEGAN_LUAR_LIPAT,
    ADEGAN_LUAR_LIPAT_TERAPAN,
    ADEGAN_LUAR_DETEKTIF,
    ADEGAN_LUAR_DETEKTIF_TERAPAN,
    ADEGAN_LUAR_PUTARAN,
    ADEGAN_LUAR_PUTARAN_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
