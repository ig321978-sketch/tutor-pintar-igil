import type { VideoStory } from "./logika-story";
import { ADEGAN_KARTU, ADEGAN_PAPAN, ADEGAN_PASAR } from "./k4b1c-materi-1";
import { ADEGAN_LANJUT, ADEGAN_LATIH_DUA, ADEGAN_LATIH_SATU, ADEGAN_RIBUAN, ADEGAN_SAMA } from "./k4b1c-materi-2";
import { ADEGAN_BERPIKIR, ADEGAN_CATATAN, ADEGAN_GUNUNG, ADEGAN_URUT } from "./k4b1c-materi-3";
import { ADEGAN_LUAR_GARIS, ADEGAN_LUAR_GARIS_TERAPAN, ADEGAN_LUAR_KIRI, ADEGAN_LUAR_KIRI_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k4b1c-luar-1";
import { ADEGAN_LUAR_BATANG, ADEGAN_LUAR_BATANG_TERAPAN, ADEGAN_LUAR_HIMPUNAN, ADEGAN_LUAR_HIMPUNAN_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k4b1c-luar-2";

/** Kelas 4 Bab 1 Sub-Bab C (Membandingkan dan Mengurutkan Bilangan Cacah sampai 10.000): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K4B1C: VideoStory = {
  id: "k4b1c-materi",
  judul: "Membandingkan dan Mengurutkan Bilangan",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    ADEGAN_PASAR,
    ADEGAN_KARTU,
    ADEGAN_PAPAN,
    ADEGAN_RIBUAN,
    ADEGAN_LANJUT,
    ADEGAN_SAMA,
    ADEGAN_LATIH_SATU,
    ADEGAN_LATIH_DUA,
    ADEGAN_GUNUNG,
    ADEGAN_URUT,
    ADEGAN_BERPIKIR,
    ADEGAN_CATATAN,
  ],
};

export const VIDEO_LUAR_K4B1C: VideoStory = {
  id: "k4b1c-luar",
  judul: "Membandingkan dan Mengurutkan: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_KIRI,
    ADEGAN_LUAR_KIRI_TERAPAN,
    ADEGAN_LUAR_GARIS,
    ADEGAN_LUAR_GARIS_TERAPAN,
    ADEGAN_LUAR_HIMPUNAN,
    ADEGAN_LUAR_HIMPUNAN_TERAPAN,
    ADEGAN_LUAR_BATANG,
    ADEGAN_LUAR_BATANG_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
