import type { VideoStory } from "./logika-story";
import { ADEGAN_GURU, ADEGAN_PEMBUKA, ADEGAN_PERMEN, ADEGAN_SARANA } from "./k5b2c-materi-1";
import { ADEGAN_EKS23A, ADEGAN_EKS23B, ADEGAN_PASANGAN, ADEGAN_TABEL12 } from "./k5b2c-materi-2";
import { ADEGAN_LATIH_A, ADEGAN_LATIH_B, ADEGAN_PENUTUP } from "./k5b2c-materi-3";
import { ADEGAN_LUAR_PASANGAN, ADEGAN_LUAR_PASANGAN_TERAPAN, ADEGAN_LUAR_PELANGI, ADEGAN_LUAR_PEMBUKA } from "./k5b2c-luar-1";
import { ADEGAN_LUAR_PELANGI_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SUSUNAN, ADEGAN_LUAR_SUSUNAN_TERAPAN, ADEGAN_LUAR_TANGGA, ADEGAN_LUAR_TANGGA_TERAPAN } from "./k5b2c-luar-2";

/** Kelas 5 Bab 2 Sub-Bab C (faktor): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B2C: VideoStory = {
  id: "k5b2c-materi",
  judul: "Faktor menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 43–46 dan Refleksi nomor 4",
  jenis: "materi",
  adegan: [
    ADEGAN_PEMBUKA,
    ADEGAN_SARANA,
    ADEGAN_PERMEN,
    ADEGAN_GURU,
    ADEGAN_EKS23A,
    ADEGAN_TABEL12,
    ADEGAN_EKS23B,
    ADEGAN_PASANGAN,
    ADEGAN_LATIH_A,
    ADEGAN_LATIH_B,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K5B2C: VideoStory = {
  id: "k5b2c-luar",
  judul: "Faktor: Metode dari Luar",
  subjudul: "Empat metode luar · pita 12, 18, dan bilangan Ayo Berlatih",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_PASANGAN,
    ADEGAN_LUAR_PASANGAN_TERAPAN,
    ADEGAN_LUAR_PELANGI,
    ADEGAN_LUAR_PELANGI_TERAPAN,
    ADEGAN_LUAR_SUSUNAN,
    ADEGAN_LUAR_SUSUNAN_TERAPAN,
    ADEGAN_LUAR_TANGGA,
    ADEGAN_LUAR_TANGGA_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
