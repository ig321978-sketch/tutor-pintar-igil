import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_EKS_43A_RUMUS, ADEGAN_EKS_43A_UKUR } from "./k5b4c-materi-1";
import { ADEGAN_EKS_43B_JAJAR, ADEGAN_EKS_43B_LAYANG, ADEGAN_EKS_43C_PERSEGI, ADEGAN_EKS_43D_BELAH } from "./k5b4c-materi-2";
import { ADEGAN_EKS_43E_SEMBARANG, ADEGAN_EKS_43E_TRAPESIUM, ADEGAN_REFLEKSI_C } from "./k5b4c-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_RF, ADEGAN_LUAR_RF_TERAPAN, ADEGAN_LUAR_SS, ADEGAN_LUAR_SS_TERAPAN } from "./k5b4c-luar-1";
import { ADEGAN_LUAR_NAP, ADEGAN_LUAR_NAP_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SLU, ADEGAN_LUAR_SLU_TERAPAN } from "./k5b4c-luar-2";

/** Kelas 5 Bab 4 Sub-Bab C (keliling segi empat): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B4C: VideoStory = {
  id: "k5b4c-materi",
  judul: "Keliling Segi Empat",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "keliling segi empat", daftar: ["Dua pasang sisi sama", "Empat sisi sama panjang", "Sisi tidak sama panjang"] }),
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
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "keliling segi empat" }),
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
