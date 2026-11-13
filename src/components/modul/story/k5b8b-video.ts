import type { VideoStory } from "./logika-story";
import { ADEGAN_KUE, ADEGAN_PEMBUKA_B, ADEGAN_TEKA_DUA, ADEGAN_TEKA_SATU } from "./k5b8b-materi-1";
import { ADEGAN_APEM_HITUNG, ADEGAN_APEM_PIKTOGRAM, ADEGAN_APEM_SALAH, ADEGAN_APEM_TABEL } from "./k5b8b-materi-2";
import { ADEGAN_KESALAHAN_REFLEKSI, ADEGAN_TOMAT_DATA, ADEGAN_TOMAT_JAWAB, ADEGAN_TOMAT_PIKTOGRAM } from "./k5b8b-materi-3";
import { ADEGAN_LUAR_LEGENDA, ADEGAN_LUAR_LEGENDA_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_SIMBOL, ADEGAN_LUAR_SIMBOL_TERAPAN } from "./k5b8b-luar-1";
import { ADEGAN_LUAR_CARI, ADEGAN_LUAR_CARI_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_UBAH, ADEGAN_LUAR_UBAH_TERAPAN } from "./k5b8b-luar-2";

/** Kelas 5 Bab 8 Sub-Bab B (Piktogram): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B8B: VideoStory = {
  id: "k5b8b-materi",
  judul: "Piktogram menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 248–252",
  jenis: "materi",
  adegan: [
    ADEGAN_PEMBUKA_B,
    ADEGAN_TEKA_SATU,
    ADEGAN_TEKA_DUA,
    ADEGAN_KUE,
    ADEGAN_APEM_TABEL,
    ADEGAN_APEM_PIKTOGRAM,
    ADEGAN_APEM_SALAH,
    ADEGAN_APEM_HITUNG,
    ADEGAN_TOMAT_DATA,
    ADEGAN_TOMAT_PIKTOGRAM,
    ADEGAN_TOMAT_JAWAB,
    ADEGAN_KESALAHAN_REFLEKSI,
  ],
};

export const VIDEO_LUAR_K5B8B: VideoStory = {
  id: "k5b8b-luar",
  judul: "Piktogram: Metode dari Luar",
  subjudul: "Empat metode luar · contoh kue apem dan panen tomat",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_LEGENDA,
    ADEGAN_LUAR_LEGENDA_TERAPAN,
    ADEGAN_LUAR_SIMBOL,
    ADEGAN_LUAR_SIMBOL_TERAPAN,
    ADEGAN_LUAR_CARI,
    ADEGAN_LUAR_CARI_TERAPAN,
    ADEGAN_LUAR_UBAH,
    ADEGAN_LUAR_UBAH_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
