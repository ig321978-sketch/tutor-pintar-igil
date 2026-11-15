import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_EKS_3A, ADEGAN_EKS_3B, ADEGAN_MASALAH_YOHANA } from "./k5b3c-materi-1";
import { ADEGAN_BEDA_PENYEBUT, ADEGAN_EKS_3C, ADEGAN_KOMANG_TALI } from "./k5b3c-materi-2";
import { ADEGAN_LATIHAN, ADEGAN_MISKONSEPSI, ADEGAN_UK_1, ADEGAN_UK_2 } from "./k5b3c-materi-3";
import { ADEGAN_LUAR_CDS, ADEGAN_LUAR_CDS_TERAPAN, ADEGAN_LUAR_LDS, ADEGAN_LUAR_LDS_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k5b3c-luar-1";
import { ADEGAN_LUAR_AUP, ADEGAN_LUAR_AUP_TERAPAN, ADEGAN_LUAR_RAM, ADEGAN_LUAR_RAM_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b3c-luar-2";

/** Kelas 5 Bab 3 Sub-Bab C (pengurangan bilangan pecahan), penutup bab: video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B3C: VideoStory = {
  id: "k5b3c-materi",
  judul: "Pengurangan Bilangan Pecahan",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "mengurangkan pecahan", daftar: ["Pengurangan penyebut sama", "Pengurangan penyebut berbeda", "Pengurangan pecahan campuran"] }),
    ADEGAN_MASALAH_YOHANA,
    ADEGAN_EKS_3A,
    ADEGAN_EKS_3B,
    ADEGAN_EKS_3C,
    ADEGAN_BEDA_PENYEBUT,
    ADEGAN_KOMANG_TALI,
    ADEGAN_LATIHAN,
    ADEGAN_MISKONSEPSI,
    ADEGAN_UK_1,
    ADEGAN_UK_2,
  ],
};

export const VIDEO_LUAR_K5B3C: VideoStory = {
  id: "k5b3c-luar",
  judul: "Pengurangan Pecahan: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "mengurangkan pecahan" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_LDS,
    ADEGAN_LUAR_LDS_TERAPAN,
    ADEGAN_LUAR_CDS,
    ADEGAN_LUAR_CDS_TERAPAN,
    ADEGAN_LUAR_RAM,
    ADEGAN_LUAR_RAM_TERAPAN,
    ADEGAN_LUAR_AUP,
    ADEGAN_LUAR_AUP_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
