import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_PENJUALAN, ADEGAN_TOKO } from "./k6b2c-materi-1";
import { ADEGAN_LATIHAN23A, ADEGAN_MASA_PANEN, ADEGAN_SATUAN_WAKTU } from "./k6b2c-materi-2";
import { ADEGAN_BANYU, ADEGAN_UJI_1_3, ADEGAN_UJI_4_5 } from "./k6b2c-materi-3";
import { ADEGAN_LUAR_C_JUMLAH, ADEGAN_LUAR_C_JUMLAH_TERAPAN, ADEGAN_LUAR_C_PEMBUKA, ADEGAN_LUAR_C_UTUH, ADEGAN_LUAR_C_UTUH_TERAPAN } from "./k6b2c-luar-1";
import { ADEGAN_LUAR_C_LAJU, ADEGAN_LUAR_C_LAJU_TERAPAN, ADEGAN_LUAR_C_RINGKAS, ADEGAN_LUAR_C_SATUAN, ADEGAN_LUAR_C_SATUAN_TERAPAN } from "./k6b2c-luar-2";

/**
 * Kelas 6 Bab 2 Sub-Bab C (Penerapan Rasio): video materi kurikulum dan video metode luar, dua video terpisah.
 * Seluruh adegan materi bermakna dan diputar; tiap video dibuka adegan sapaan.
 */
export const VIDEO_MATERI_K6B2C: VideoStory = {
  id: "k6b2c-materi",
  judul: "Penerapan Rasio",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "penerapan rasio", daftar: ["Bagian dan seluruhnya", "Rasio pada durasi waktu", "Laju per satu satuan"] }),
    ADEGAN_TOKO,
    ADEGAN_PENJUALAN,
    ADEGAN_MASA_PANEN,
    ADEGAN_SATUAN_WAKTU,
    ADEGAN_LATIHAN23A,
    ADEGAN_BANYU,
    ADEGAN_UJI_1_3,
    ADEGAN_UJI_4_5,
  ],
};

export const VIDEO_LUAR_K6B2C: VideoStory = {
  id: "k6b2c-luar",
  judul: "Penerapan Rasio: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "penerapan rasio" }),
    ADEGAN_LUAR_C_PEMBUKA,
    ADEGAN_LUAR_C_JUMLAH,
    ADEGAN_LUAR_C_JUMLAH_TERAPAN,
    ADEGAN_LUAR_C_UTUH,
    ADEGAN_LUAR_C_UTUH_TERAPAN,
    ADEGAN_LUAR_C_SATUAN,
    ADEGAN_LUAR_C_SATUAN_TERAPAN,
    ADEGAN_LUAR_C_LAJU,
    ADEGAN_LUAR_C_LAJU_TERAPAN,
    ADEGAN_LUAR_C_RINGKAS,
  ],
};
