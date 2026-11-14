import type { VideoStory } from "./logika-story";
import { ADEGAN_PEMBUKA_B, ADEGAN_PERSEGI, ADEGAN_PERSEGI_PANJANG } from "./k5b5b-materi-1";
import { ADEGAN_JAJARGENJANG, ADEGAN_SEGITIGA_1, ADEGAN_SEGITIGA_2, ADEGAN_TRAPESIUM } from "./k5b5b-materi-2";
import { ADEGAN_BELAH_KETUPAT, ADEGAN_LAYANG_LAYANG, ADEGAN_MISKONSEPSI, ADEGAN_REFLEKSI_B } from "./k5b5b-materi-3";
import { ADEGAN_LUAR_DIS, ADEGAN_LUAR_DIS_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_SHR, ADEGAN_LUAR_SHR_TERAPAN } from "./k5b5b-luar-1";
import { ADEGAN_LUAR_BXH, ADEGAN_LUAR_BXH_TERAPAN, ADEGAN_LUAR_REH, ADEGAN_LUAR_REH_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b5b-luar-2";

/** Kelas 5 Bab 5 Sub-Bab B (luas daerah bangun datar): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B5B: VideoStory = {
  id: "k5b5b-materi",
  judul: "Luas Daerah Bangun Datar menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 144–157 dan Refleksi nomor 6–12",
  jenis: "materi",
  adegan: [
    ADEGAN_PEMBUKA_B,
    ADEGAN_PERSEGI_PANJANG,
    ADEGAN_PERSEGI,
    ADEGAN_SEGITIGA_1,
    ADEGAN_SEGITIGA_2,
    ADEGAN_JAJARGENJANG,
    ADEGAN_TRAPESIUM,
    ADEGAN_BELAH_KETUPAT,
    ADEGAN_LAYANG_LAYANG,
    ADEGAN_MISKONSEPSI,
    ADEGAN_REFLEKSI_B,
  ],
};

export const VIDEO_LUAR_K5B5B: VideoStory = {
  id: "k5b5b-luar",
  judul: "Luas Daerah Bangun Datar: Metode dari Luar",
  subjudul: "Empat metode luar · angka Eksplorasi 5.2A sampai 5.2G",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_DIS,
    ADEGAN_LUAR_DIS_TERAPAN,
    ADEGAN_LUAR_SHR,
    ADEGAN_LUAR_SHR_TERAPAN,
    ADEGAN_LUAR_BXH,
    ADEGAN_LUAR_BXH_TERAPAN,
    ADEGAN_LUAR_REH,
    ADEGAN_LUAR_REH_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
