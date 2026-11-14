import type { VideoStory } from "./logika-story";
import { ADEGAN_APERSEPSI_D, ADEGAN_KIPAS_LANGKAH, ADEGAN_KIPAS_LANGKAH2, ADEGAN_PEMBUKA_D } from "./k5b6d-materi-1";
import { ADEGAN_BERLATIH_1, ADEGAN_BERLATIH_2, ADEGAN_MISKONSEPSI, ADEGAN_PROYEK } from "./k5b6d-materi-2";
import { ADEGAN_KERAMIK_1, ADEGAN_KERAMIK_2, ADEGAN_PENUTUP_D, ADEGAN_REFLEKSI_D, ADEGAN_UJI_JALAN_AB, ADEGAN_UJI_JALAN_CD, ADEGAN_UJI_JAM } from "./k5b6d-materi-3";
import { ADEGAN_LUAR_BUSUR, ADEGAN_LUAR_BUSUR_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_PROTOKOL, ADEGAN_LUAR_PROTOKOL_TERAPAN } from "./k5b6d-luar-1";
import { ADEGAN_LUAR_PERKIRAAN, ADEGAN_LUAR_PERKIRAAN_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TAMBAH, ADEGAN_LUAR_TAMBAH_TERAPAN } from "./k5b6d-luar-2";

/** Kelas 5 Bab 6 Sub-Bab D (melukis sudut): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B6D: VideoStory = {
  id: "k5b6d-materi",
  judul: "Melukis Sudut menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 183–190",
  jenis: "materi",
  adegan: [
    ADEGAN_PEMBUKA_D,
    ADEGAN_APERSEPSI_D,
    ADEGAN_KIPAS_LANGKAH,
    ADEGAN_KIPAS_LANGKAH2,
    ADEGAN_BERLATIH_1,
    ADEGAN_BERLATIH_2,
    ADEGAN_MISKONSEPSI,
    ADEGAN_PROYEK,
    ADEGAN_REFLEKSI_D,
    ADEGAN_UJI_JAM,
    ADEGAN_UJI_JALAN_AB,
    ADEGAN_UJI_JALAN_CD,
    ADEGAN_KERAMIK_1,
    ADEGAN_KERAMIK_2,
    ADEGAN_PENUTUP_D,
  ],
};

export const VIDEO_LUAR_K5B6D: VideoStory = {
  id: "k5b6d-luar",
  judul: "Melukis Sudut: Metode dari Luar",
  subjudul: "Empat metode luar · contoh sudut dari Ayo Berlatih",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_PROTOKOL,
    ADEGAN_LUAR_PROTOKOL_TERAPAN,
    ADEGAN_LUAR_BUSUR,
    ADEGAN_LUAR_BUSUR_TERAPAN,
    ADEGAN_LUAR_TAMBAH,
    ADEGAN_LUAR_TAMBAH_TERAPAN,
    ADEGAN_LUAR_PERKIRAAN,
    ADEGAN_LUAR_PERKIRAAN_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
