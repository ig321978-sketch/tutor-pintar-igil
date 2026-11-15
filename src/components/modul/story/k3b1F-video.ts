import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BUNGA_KIRA, ADEGAN_CERITA_KUE, ADEGAN_ULANG_KUE } from "./k3b1F-materi-1";
import { ADEGAN_MOBIL_BALIK, ADEGAN_MOBIL_WEI, ADEGAN_SAMA_ATAU_TIDAK, ADEGAN_TUKAR_TEMPAT } from "./k3b1F-materi-2";
import { ADEGAN_APEL_HALIM, ADEGAN_EMPAT_LANGKAH, ADEGAN_SOAL_IGIL, ADEGAN_SOAL_MALOSI } from "./k3b1F-materi-3";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP } from "./k3b1F-materi-4";
import { ADEGAN_LUAR_KELOMPOK, ADEGAN_LUAR_KELOMPOK_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k3b1F-luar-1";
import { ADEGAN_LUAR_LOMPAT, ADEGAN_LUAR_LOMPAT_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SUSUNAN, ADEGAN_LUAR_SUSUNAN_TERAPAN } from "./k3b1F-luar-2";

/** Kelas 3 Bab 1 Sub-Bab F (Perkalian sampai 100): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K3B1F: VideoStory = {
  id: "k3b1F-materi",
  judul: "Perkalian",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "perkalian", daftar: ["Penjumlahan berulang", "Membaca perkalian", "Menukar tempat bilangan"] }),
    ADEGAN_CERITA_KUE,
    ADEGAN_ULANG_KUE,
    ADEGAN_BUNGA_KIRA,
    ADEGAN_SAMA_ATAU_TIDAK,
    ADEGAN_MOBIL_WEI,
    ADEGAN_MOBIL_BALIK,
    ADEGAN_TUKAR_TEMPAT,
    ADEGAN_EMPAT_LANGKAH,
    ADEGAN_APEL_HALIM,
    ADEGAN_SOAL_IGIL,
    ADEGAN_SOAL_MALOSI,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K3B1F: VideoStory = {
  id: "k3b1F-luar",
  judul: "Perkalian: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "perkalian" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_KELOMPOK,
    ADEGAN_LUAR_KELOMPOK_TERAPAN,
    ADEGAN_LUAR_SUSUNAN,
    ADEGAN_LUAR_SUSUNAN_TERAPAN,
    ADEGAN_LUAR_LOMPAT,
    ADEGAN_LUAR_LOMPAT_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
