import type { VideoStory } from "./logika-story";
import { ADEGAN_MENYIMAK, ADEGAN_PEMBUKA, ADEGAN_PETA } from "./k5b3a-materi-1";
import { ADEGAN_EKS31A, ADEGAN_EKS31B, ADEGAN_INGAT, ADEGAN_PENGERTIAN } from "./k5b3a-materi-2";
import { ADEGAN_BERLATIH, ADEGAN_BULAT, ADEGAN_GARIS, ADEGAN_GURU, ADEGAN_PEMBILANG } from "./k5b3a-materi-3";
import { ADEGAN_LUAR_GARIS, ADEGAN_LUAR_GARIS_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_SENILAI, ADEGAN_LUAR_SENILAI_TERAPAN } from "./k5b3a-luar-1";
import { ADEGAN_LUAR_CAMPURAN, ADEGAN_LUAR_CAMPURAN_TERAPAN, ADEGAN_LUAR_PATOKAN, ADEGAN_LUAR_PATOKAN_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b3a-luar-2";

/** Kelas 5 Bab 3 Sub-Bab A (membandingkan dan mengurutkan pecahan), termasuk pembuka bab: video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B3A: VideoStory = {
  id: "k5b3a-materi",
  judul: "Membandingkan dan Mengurutkan Pecahan menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 63–75 (Eksplorasi 3.1A dan 3.1B)",
  jenis: "materi",
  adegan: [ADEGAN_PEMBUKA, ADEGAN_PETA, ADEGAN_MENYIMAK, ADEGAN_INGAT, ADEGAN_PENGERTIAN, ADEGAN_EKS31A, ADEGAN_EKS31B, ADEGAN_GARIS, ADEGAN_PEMBILANG, ADEGAN_BULAT, ADEGAN_BERLATIH, ADEGAN_GURU],
};

export const VIDEO_LUAR_K5B3A: VideoStory = {
  id: "k5b3a-luar",
  judul: "Membandingkan dan Mengurutkan Pecahan: Metode dari Luar",
  subjudul: "Empat metode luar · lompatan Yohana dan pita Nisa",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_GARIS,
    ADEGAN_LUAR_GARIS_TERAPAN,
    ADEGAN_LUAR_SENILAI,
    ADEGAN_LUAR_SENILAI_TERAPAN,
    ADEGAN_LUAR_CAMPURAN,
    ADEGAN_LUAR_CAMPURAN_TERAPAN,
    ADEGAN_LUAR_PATOKAN,
    ADEGAN_LUAR_PATOKAN_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
