import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_ATURAN, ADEGAN_MENYIMAK } from "./k5b2d-materi-1";
import { ADEGAN_EKS_A_AB, ADEGAN_EKS_A_C, ADEGAN_EKS_B_MASALAH, ADEGAN_FAKTOR_PERSEKUTUAN } from "./k5b2d-materi-2";
import { ADEGAN_BERLATIH_1, ADEGAN_BERLATIH_2, ADEGAN_EKS_B_HASIL, ADEGAN_PENUTUP } from "./k5b2d-materi-3";
import { ADEGAN_LUAR_DAFTAR, ADEGAN_LUAR_DAFTAR_TERAPAN, ADEGAN_LUAR_GCF, ADEGAN_LUAR_GCF_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k5b2d-luar-1";
import { ADEGAN_LUAR_EUCLID, ADEGAN_LUAR_EUCLID_TERAPAN, ADEGAN_LUAR_PAKET, ADEGAN_LUAR_PAKET_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b2d-luar-2";

/** Kelas 5 Bab 2 Sub-Bab D (faktor persekutuan dan FPB): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B2D: VideoStory = {
  id: "k5b2d-materi",
  judul: "Faktor Persekutuan dan FPB",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "faktor yang sama dari dua bilangan", daftar: ["Faktor persekutuan", "Menentukan FPB", "Membagi benda sama rata"] }),
    ADEGAN_MENYIMAK,
    ADEGAN_ATURAN,
    ADEGAN_FAKTOR_PERSEKUTUAN,
    ADEGAN_EKS_A_AB,
    ADEGAN_EKS_A_C,
    ADEGAN_EKS_B_MASALAH,
    ADEGAN_EKS_B_HASIL,
    ADEGAN_BERLATIH_1,
    ADEGAN_BERLATIH_2,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K5B2D: VideoStory = {
  id: "k5b2d-luar",
  judul: "Faktor Persekutuan dan FPB: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "faktor yang sama dari dua bilangan" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_DAFTAR,
    ADEGAN_LUAR_DAFTAR_TERAPAN,
    ADEGAN_LUAR_GCF,
    ADEGAN_LUAR_GCF_TERAPAN,
    ADEGAN_LUAR_EUCLID,
    ADEGAN_LUAR_EUCLID_TERAPAN,
    ADEGAN_LUAR_PAKET,
    ADEGAN_LUAR_PAKET_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
