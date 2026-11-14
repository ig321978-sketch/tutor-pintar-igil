import type { VideoStory } from "./logika-story";
import { ADEGAN_APERSEPSI, ADEGAN_EKS_43A_RUMUS, ADEGAN_EKS_43A_UKUR, ADEGAN_PEMBUKA_C } from "./k5b4c-materi-1";
import { ADEGAN_EKS_43B_JAJAR, ADEGAN_EKS_43B_LAYANG, ADEGAN_EKS_43C_PERSEGI, ADEGAN_EKS_43D_BELAH } from "./k5b4c-materi-2";
import { ADEGAN_EKS_43E_SEMBARANG, ADEGAN_EKS_43E_TRAPESIUM, ADEGAN_REFLEKSI_C } from "./k5b4c-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_RF, ADEGAN_LUAR_RF_TERAPAN, ADEGAN_LUAR_SS, ADEGAN_LUAR_SS_TERAPAN } from "./k5b4c-luar-1";
import { ADEGAN_LUAR_NAP, ADEGAN_LUAR_NAP_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SLU, ADEGAN_LUAR_SLU_TERAPAN } from "./k5b4c-luar-2";

/** Kelas 5 Bab 4 Sub-Bab C (keliling segi empat): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B4C: VideoStory = {
  id: "k5b4c-materi",
  judul: "Keliling Segi Empat menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 118–121 dan Refleksi nomor 6 sampai 12",
  jenis: "materi",
  adegan: [
    ADEGAN_PEMBUKA_C,
    ADEGAN_APERSEPSI,
    ADEGAN_EKS_43A_UKUR,
    ADEGAN_EKS_43A_RUMUS,
    ADEGAN_EKS_43B_JAJAR,
    ADEGAN_EKS_43B_LAYANG,
    ADEGAN_EKS_43C_PERSEGI,
    ADEGAN_EKS_43D_BELAH,
    ADEGAN_EKS_43E_TRAPESIUM,
    ADEGAN_EKS_43E_SEMBARANG,
    ADEGAN_REFLEKSI_C,
  ],
};

export const VIDEO_LUAR_K5B4C: VideoStory = {
  id: "k5b4c-luar",
  judul: "Keliling Segi Empat: Metode dari Luar",
  subjudul: "Empat metode luar · contoh persegi panjang, layang-layang, dan segi empat lain",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_RF,
    ADEGAN_LUAR_RF_TERAPAN,
    ADEGAN_LUAR_SS,
    ADEGAN_LUAR_SS_TERAPAN,
    ADEGAN_LUAR_NAP,
    ADEGAN_LUAR_NAP_TERAPAN,
    ADEGAN_LUAR_SLU,
    ADEGAN_LUAR_SLU_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
