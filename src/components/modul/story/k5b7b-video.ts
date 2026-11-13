import type { VideoStory } from "./logika-story";
import { ADEGAN_JAJAR_PERIKSA, ADEGAN_PEMBUKA_B, ADEGAN_TRAPESIUM, ADEGAN_TRAPESIUM_DEF } from "./k5b7b-materi-1";
import { ADEGAN_BELAH_KETUPAT, ADEGAN_JAJAR_SIMPUL, ADEGAN_PERSEGI_PANJANG, ADEGAN_SEDOTAN } from "./k5b7b-materi-2";
import { ADEGAN_LAYANG, ADEGAN_PERSEGI, ADEGAN_REFLEKSI, ADEGAN_UJI } from "./k5b7b-materi-3";
import { ADEGAN_LUAR_HIERARKI, ADEGAN_LUAR_HIERARKI_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_TRAPESIUM, ADEGAN_LUAR_TRAPESIUM_TERAPAN } from "./k5b7b-luar-1";
import { ADEGAN_LUAR_DIAGONAL, ADEGAN_LUAR_DIAGONAL_TERAPAN, ADEGAN_LUAR_MATRIKS, ADEGAN_LUAR_MATRIKS_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b7b-luar-2";

/** Kelas 5 Bab 7 Sub-Bab B (membandingkan ciri-ciri segi empat): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B7B: VideoStory = {
  id: "k5b7b-materi",
  judul: "Membandingkan Ciri-Ciri Segi Empat menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 209–234",
  jenis: "materi",
  adegan: [
    ADEGAN_PEMBUKA_B,
    ADEGAN_TRAPESIUM,
    ADEGAN_TRAPESIUM_DEF,
    ADEGAN_JAJAR_PERIKSA,
    ADEGAN_JAJAR_SIMPUL,
    ADEGAN_PERSEGI_PANJANG,
    ADEGAN_SEDOTAN,
    ADEGAN_BELAH_KETUPAT,
    ADEGAN_PERSEGI,
    ADEGAN_LAYANG,
    ADEGAN_REFLEKSI,
    ADEGAN_UJI,
  ],
};

export const VIDEO_LUAR_K5B7B: VideoStory = {
  id: "k5b7b-luar",
  judul: "Membandingkan Segi Empat: Metode dari Luar",
  subjudul: "Empat metode luar · contoh enam segi empat dari buku",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_TRAPESIUM,
    ADEGAN_LUAR_TRAPESIUM_TERAPAN,
    ADEGAN_LUAR_HIERARKI,
    ADEGAN_LUAR_HIERARKI_TERAPAN,
    ADEGAN_LUAR_MATRIKS,
    ADEGAN_LUAR_MATRIKS_TERAPAN,
    ADEGAN_LUAR_DIAGONAL,
    ADEGAN_LUAR_DIAGONAL_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
