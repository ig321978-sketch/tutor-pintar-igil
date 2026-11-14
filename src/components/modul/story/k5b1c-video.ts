import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_DISKUSI_KOMANG, ADEGAN_EKS13, ADEGAN_KOMPOSISI_ASEP, ADEGAN_KOMPOSISI_LUKAS } from "./k5b1c-materi-2";
import { ADEGAN_CARA_KOMANG, ADEGAN_RANGKUM } from "./k5b1c-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_TUKAR, ADEGAN_LUAR_TUKAR_TERAPAN, ADEGAN_LUAR_URAIAN, ADEGAN_LUAR_URAIAN_TERAPAN } from "./k5b1c-luar-1";
import { ADEGAN_LUAR_LAZIM, ADEGAN_LUAR_LAZIM_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_UANG, ADEGAN_LUAR_UANG_TERAPAN } from "./k5b1c-luar-2";

/** Kelas 5 Bab 1 Sub-Bab C (komposisi dan dekomposisi bilangan): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B1C: VideoStory = {
  id: "k5b1c-materi",
  judul: "Komposisi dan Dekomposisi",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "menyusun dan menguraikan bilangan", daftar: ["Menyusun bilangan dari uang","Menguraikan bilangan","Banyak cara berbeda"] }),
    ADEGAN_EKS13,
    ADEGAN_KOMPOSISI_ASEP,
    ADEGAN_KOMPOSISI_LUKAS,
    ADEGAN_DISKUSI_KOMANG,
    ADEGAN_CARA_KOMANG,
    ADEGAN_RANGKUM,
  ],
};

export const VIDEO_LUAR_K5B1C: VideoStory = {
  id: "k5b1c-luar",
  judul: "Komposisi dan Dekomposisi: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "menyusun dan menguraikan bilangan" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_URAIAN,
    ADEGAN_LUAR_URAIAN_TERAPAN,
    ADEGAN_LUAR_TUKAR,
    ADEGAN_LUAR_TUKAR_TERAPAN,
    ADEGAN_LUAR_LAZIM,
    ADEGAN_LUAR_LAZIM_TERAPAN,
    ADEGAN_LUAR_UANG,
    ADEGAN_LUAR_UANG_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
