import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_EKS23A, ADEGAN_EKS23B, ADEGAN_PASANGAN, ADEGAN_TABEL12 } from "./k5b2c-materi-2";
import { ADEGAN_LATIH_A, ADEGAN_LATIH_B, ADEGAN_PENUTUP } from "./k5b2c-materi-3";
import { ADEGAN_LUAR_PASANGAN, ADEGAN_LUAR_PASANGAN_TERAPAN, ADEGAN_LUAR_PELANGI, ADEGAN_LUAR_PEMBUKA } from "./k5b2c-luar-1";
import { ADEGAN_LUAR_PELANGI_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SUSUNAN, ADEGAN_LUAR_SUSUNAN_TERAPAN, ADEGAN_LUAR_TANGGA, ADEGAN_LUAR_TANGGA_TERAPAN } from "./k5b2c-luar-2";

/** Kelas 5 Bab 2 Sub-Bab C (faktor): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B2C: VideoStory = {
  id: "k5b2c-materi",
  judul: "Faktor",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "mencari faktor dari suatu bilangan", daftar: ["Memotong pita tanpa sisa", "Tabel hasil potongan", "Faktor saling berpasangan"] }),
    ADEGAN_EKS23A,
    ADEGAN_TABEL12,
    ADEGAN_EKS23B,
    ADEGAN_PASANGAN,
    ADEGAN_LATIH_A,
    ADEGAN_LATIH_B,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K5B2C: VideoStory = {
  id: "k5b2c-luar",
  judul: "Faktor: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "mencari faktor dari suatu bilangan" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_PASANGAN,
    ADEGAN_LUAR_PASANGAN_TERAPAN,
    ADEGAN_LUAR_PELANGI,
    ADEGAN_LUAR_PELANGI_TERAPAN,
    ADEGAN_LUAR_SUSUNAN,
    ADEGAN_LUAR_SUSUNAN_TERAPAN,
    ADEGAN_LUAR_TANGGA,
    ADEGAN_LUAR_TANGGA_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
