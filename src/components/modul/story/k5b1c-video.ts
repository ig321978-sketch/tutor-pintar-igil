import type { VideoStory } from "./logika-story";
import { ADEGAN_PEMANASAN, ADEGAN_PEMBUKA, ADEGAN_PERSIAPAN, ADEGAN_SARANA } from "./k5b1c-materi-1";
import { ADEGAN_DISKUSI_KOMANG, ADEGAN_EKS13, ADEGAN_KOMPOSISI_ASEP, ADEGAN_KOMPOSISI_LUKAS } from "./k5b1c-materi-2";
import { ADEGAN_CARA_KOMANG, ADEGAN_MISKONSEPSI, ADEGAN_PERAN, ADEGAN_RANGKUM, ADEGAN_REFLEKSI } from "./k5b1c-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_TUKAR, ADEGAN_LUAR_TUKAR_TERAPAN, ADEGAN_LUAR_URAIAN, ADEGAN_LUAR_URAIAN_TERAPAN } from "./k5b1c-luar-1";
import { ADEGAN_LUAR_LAZIM, ADEGAN_LUAR_LAZIM_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_UANG, ADEGAN_LUAR_UANG_TERAPAN } from "./k5b1c-luar-2";

/** Kelas 5 Bab 1 Sub-Bab C (komposisi dan dekomposisi bilangan): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B1C: VideoStory = {
  id: "k5b1c-materi",
  judul: "Komposisi dan Dekomposisi menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 15 sampai 17 dan Refleksi nomor 6 dan 7",
  jenis: "materi",
  adegan: [
    ADEGAN_PEMBUKA,
    ADEGAN_SARANA,
    ADEGAN_PEMANASAN,
    ADEGAN_PERSIAPAN,
    ADEGAN_EKS13,
    ADEGAN_KOMPOSISI_ASEP,
    ADEGAN_KOMPOSISI_LUKAS,
    ADEGAN_DISKUSI_KOMANG,
    ADEGAN_CARA_KOMANG,
    ADEGAN_PERAN,
    ADEGAN_RANGKUM,
    ADEGAN_MISKONSEPSI,
    ADEGAN_REFLEKSI,
  ],
};

export const VIDEO_LUAR_K5B1C: VideoStory = {
  id: "k5b1c-luar",
  judul: "Komposisi dan Dekomposisi: Metode dari Luar",
  subjudul: "Empat metode luar · uang Asep, Lukas, dan Komang",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_URAIAN,
    ADEGAN_LUAR_URAIAN_TERAPAN,
    ADEGAN_LUAR_TUKAR,
    ADEGAN_LUAR_TUKAR_TERAPAN,
    ADEGAN_LUAR_LAZIM,
    ADEGAN_LUAR_LAZIM_TERAPAN,
    ADEGAN_LUAR_UANG,
    ADEGAN_LUAR_UANG_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
