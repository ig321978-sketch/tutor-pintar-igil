import type { VideoStory } from "./logika-story";
import { ADEGAN_PEMBUKA, ADEGAN_PERSIAPAN } from "./k5b4b-materi-1";
import { ADEGAN_UKUR_DUA, ADEGAN_UKUR_SATU, ADEGAN_UMUM_SEMBARANG } from "./k5b4b-materi-2";
import { ADEGAN_ASEP_NISA, ADEGAN_CARA_SAMA_KAKI, ADEGAN_REFLEKSI, ADEGAN_SAMA_KAKI, ADEGAN_SAMA_SISI, ADEGAN_UMUM_SAMA_SISI } from "./k5b4b-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_PINTAS, ADEGAN_LUAR_SISI, ADEGAN_LUAR_SISI_TERAPAN } from "./k5b4b-luar-1";
import { ADEGAN_LUAR_BENANG, ADEGAN_LUAR_BENANG_TERAPAN, ADEGAN_LUAR_PINTAS_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_UKUR, ADEGAN_LUAR_UKUR_TERAPAN } from "./k5b4b-luar-2";

/** Kelas 5 Bab 4 Sub-Bab B (keliling segitiga): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B4B: VideoStory = {
  id: "k5b4b-materi",
  judul: "Keliling Segitiga menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 115–117 dan Refleksi nomor 3 sampai 5",
  jenis: "materi",
  adegan: [
    ADEGAN_PEMBUKA,
    ADEGAN_PERSIAPAN,
    ADEGAN_UKUR_SATU,
    ADEGAN_UKUR_DUA,
    ADEGAN_UMUM_SEMBARANG,
    ADEGAN_SAMA_SISI,
    ADEGAN_ASEP_NISA,
    ADEGAN_UMUM_SAMA_SISI,
    ADEGAN_SAMA_KAKI,
    ADEGAN_CARA_SAMA_KAKI,
    ADEGAN_REFLEKSI,
  ],
};

export const VIDEO_LUAR_K5B4B: VideoStory = {
  id: "k5b4b-luar",
  judul: "Keliling Segitiga: Metode dari Luar",
  subjudul: "Empat metode luar · contoh segitiga sembarang, sama sisi, dan sama kaki",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_SISI,
    ADEGAN_LUAR_SISI_TERAPAN,
    ADEGAN_LUAR_PINTAS,
    ADEGAN_LUAR_PINTAS_TERAPAN,
    ADEGAN_LUAR_UKUR,
    ADEGAN_LUAR_UKUR_TERAPAN,
    ADEGAN_LUAR_BENANG,
    ADEGAN_LUAR_BENANG_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
