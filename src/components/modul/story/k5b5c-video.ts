import type { VideoStory } from "./logika-story";
import { ADEGAN_CARA_YOHANA, ADEGAN_EKSPLORASI, ADEGAN_INGAT_RUMUS, ADEGAN_PEMBUKA_C } from "./k5b5c-materi-1";
import { ADEGAN_CARA_KOMANG, ADEGAN_MISKONSEPSI, ADEGAN_PENGUATAN } from "./k5b5c-materi-2";
import { ADEGAN_RUBRIK, ADEGAN_UJI_1, ADEGAN_UJI_2, ADEGAN_UJI_3, ADEGAN_UJI_4 } from "./k5b5c-materi-3";
import { ADEGAN_LUAR_ADITIF, ADEGAN_LUAR_ADITIF_TERAPAN, ADEGAN_LUAR_KOMPOSIT, ADEGAN_LUAR_KOMPOSIT_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k5b5c-luar-1";
import { ADEGAN_LUAR_KEKAL, ADEGAN_LUAR_KEKAL_TERAPAN, ADEGAN_LUAR_KURANG, ADEGAN_LUAR_KURANG_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b5c-luar-2";

/** Kelas 5 Bab 5 Sub-Bab C (luas daerah bangun gabungan): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B5C: VideoStory = {
  id: "k5b5c-materi",
  judul: "Luas Daerah Bangun Gabungan menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 158–159, 161–162 (Refleksi 13–14 dan Uji Kompetensi)",
  jenis: "materi",
  adegan: [
    ADEGAN_PEMBUKA_C,
    ADEGAN_INGAT_RUMUS,
    ADEGAN_EKSPLORASI,
    ADEGAN_CARA_YOHANA,
    ADEGAN_CARA_KOMANG,
    ADEGAN_MISKONSEPSI,
    ADEGAN_PENGUATAN,
    ADEGAN_UJI_1,
    ADEGAN_UJI_2,
    ADEGAN_UJI_3,
    ADEGAN_UJI_4,
    ADEGAN_RUBRIK,
  ],
};

export const VIDEO_LUAR_K5B5C: VideoStory = {
  id: "k5b5c-luar",
  judul: "Luas Bangun Gabungan: Metode dari Luar",
  subjudul: "Empat metode luar · contoh Eksplorasi 5.3 dan Uji Kompetensi 1 sampai 4",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_ADITIF,
    ADEGAN_LUAR_ADITIF_TERAPAN,
    ADEGAN_LUAR_KOMPOSIT,
    ADEGAN_LUAR_KOMPOSIT_TERAPAN,
    ADEGAN_LUAR_KURANG,
    ADEGAN_LUAR_KURANG_TERAPAN,
    ADEGAN_LUAR_KEKAL,
    ADEGAN_LUAR_KEKAL_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
