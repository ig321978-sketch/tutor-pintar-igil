import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_KELUARGA, ADEGAN_KONDEKTUR, ADEGAN_TUKAR } from "./k1b3c-materi-1";
import { ADEGAN_HILANG, ADEGAN_PERIKSA } from "./k1b3c-materi-2";
import { ADEGAN_COCOK, ADEGAN_PENUTUP } from "./k1b3c-materi-3";
import { ADEGAN_LUAR_KELUARGA, ADEGAN_LUAR_KELUARGA_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b3c-luar-1";
import { ADEGAN_LUAR_PIKIR, ADEGAN_LUAR_PIKIR_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SEGITIGA, ADEGAN_LUAR_SEGITIGA_TERAPAN } from "./k1b3c-luar-2";

/**
 * Kelas 1 Bab 3 Sub-Bab C (hubungan penjumlahan dan pengurangan), lanjutan cerita Kereta ke Rumah Nenek.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Kondektur dan Penumpang" (Igil, Kaka, Abang, Mamah).
 * Video kedua: tiga metode global, terpisah.
 */
export const JUDUL_K1B3C = "Kondektur dan Penumpang";

export const VIDEO_MATERI_K1B3C: VideoStory = {
  id: "k1b3c-materi",
  judul: JUDUL_K1B3C,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "hubungan penjumlahan dan pengurangan", daftar: ["Keluarga bilangan", "Memeriksa dengan penjumlahan", "Mencari bilangan yang hilang"] }),
    ADEGAN_KONDEKTUR,
    ADEGAN_TUKAR,
    ADEGAN_KELUARGA,
    ADEGAN_PERIKSA,
    ADEGAN_HILANG,
    ADEGAN_COCOK,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B3C: VideoStory = {
  id: "k1b3c-luar",
  judul: JUDUL_K1B3C,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "hubungan penjumlahan dan pengurangan", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_KELUARGA,
    ADEGAN_LUAR_KELUARGA_TERAPAN,
    ADEGAN_LUAR_SEGITIGA,
    ADEGAN_LUAR_SEGITIGA_TERAPAN,
    ADEGAN_LUAR_PIKIR,
    ADEGAN_LUAR_PIKIR_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
