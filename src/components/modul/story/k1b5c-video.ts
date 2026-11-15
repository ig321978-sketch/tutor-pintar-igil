import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_CERITA, ADEGAN_IKAT, ADEGAN_KANTONG, ADEGAN_MENARA, ADEGAN_PAPAN } from "./k1b5c-materi-1";
import { ADEGAN_BACA, ADEGAN_DAFTAR, ADEGAN_DUA_PULUH, ADEGAN_SAMA, ADEGAN_TUKAR } from "./k1b5c-materi-2";
import { ADEGAN_KALIMAT, ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP } from "./k1b5c-materi-3";
import { ADEGAN_LUAR_HITUNG, ADEGAN_LUAR_HITUNG_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_SATUAN } from "./k1b5c-luar-1";
import { ADEGAN_LUAR_BINGKAI, ADEGAN_LUAR_BINGKAI_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SATUAN_TERAPAN } from "./k1b5c-luar-2";

/** Kelas 1 Bab 5 Sub-Bab C (Nilai Tempat Puluhan dan Satuan): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K1B5C: VideoStory = {
  id: "k1b5c-materi",
  judul: "Nilai Tempat Puluhan dan Satuan",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "nilai tempat puluhan dan satuan", daftar: ["Membentuk satu puluhan", "Menghitung satuan", "Membaca nilai tempat"] }),
    ADEGAN_CERITA,
    ADEGAN_KANTONG,
    ADEGAN_IKAT,
    ADEGAN_MENARA,
    ADEGAN_PAPAN,
    ADEGAN_BACA,
    ADEGAN_SAMA,
    ADEGAN_DAFTAR,
    ADEGAN_TUKAR,
    ADEGAN_DUA_PULUH,
    ADEGAN_KALIMAT,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B5C: VideoStory = {
  id: "k1b5c-luar",
  judul: "Nilai Tempat Puluhan dan Satuan: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "nilai tempat puluhan dan satuan" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_HITUNG,
    ADEGAN_LUAR_HITUNG_TERAPAN,
    ADEGAN_LUAR_SATUAN,
    ADEGAN_LUAR_SATUAN_TERAPAN,
    ADEGAN_LUAR_BINGKAI,
    ADEGAN_LUAR_BINGKAI_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
