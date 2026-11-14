import type { VideoStory } from "./logika-story";
import { ADEGAN_BAKTI, ADEGAN_CARA, ADEGAN_LUKAS, ADEGAN_PEMBUKA_D } from "./k5b1d-materi-1";
import { ADEGAN_ANGPAU_1, ADEGAN_ANGPAU_2, ADEGAN_BUAH, ADEGAN_PASANGAN } from "./k5b1d-materi-2";
import { ADEGAN_GURU, ADEGAN_PENUTUP_D, ADEGAN_UK_1, ADEGAN_UK_2 } from "./k5b1d-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_RG, ADEGAN_LUAR_RG_TERAPAN, ADEGAN_LUAR_SA, ADEGAN_LUAR_SA_TERAPAN } from "./k5b1d-luar-1";
import { ADEGAN_LUAR_EF, ADEGAN_LUAR_EF_TERAPAN, ADEGAN_LUAR_IC, ADEGAN_LUAR_IC_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b1d-luar-2";

/** Kelas 5 Bab 1 Sub-Bab D (operasi hitung pada bilangan cacah sampai 100.000), penutup bab: video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B1D: VideoStory = {
  id: "k5b1d-materi",
  judul: "Operasi Hitung Bilangan Cacah Sampai 100.000 menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 17–28 dan Panduan Guru hlm. 32–42",
  jenis: "materi",
  adegan: [
    ADEGAN_PEMBUKA_D,
    ADEGAN_BAKTI,
    ADEGAN_CARA,
    ADEGAN_LUKAS,
    ADEGAN_ANGPAU_1,
    ADEGAN_ANGPAU_2,
    ADEGAN_BUAH,
    ADEGAN_PASANGAN,
    ADEGAN_GURU,
    ADEGAN_UK_1,
    ADEGAN_UK_2,
    ADEGAN_PENUTUP_D,
  ],
};

export const VIDEO_LUAR_K5B1D: VideoStory = {
  id: "k5b1d-luar",
  judul: "Operasi Hitung Bilangan Cacah Sampai 100.000: Metode dari Luar",
  subjudul: "Empat metode luar · uang bakti sosial, sisa uang Lukas, angpau, dan Uji Kompetensi",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_SA,
    ADEGAN_LUAR_SA_TERAPAN,
    ADEGAN_LUAR_RG,
    ADEGAN_LUAR_RG_TERAPAN,
    ADEGAN_LUAR_EF,
    ADEGAN_LUAR_EF_TERAPAN,
    ADEGAN_LUAR_IC,
    ADEGAN_LUAR_IC_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
