import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_CERITA, ADEGAN_MAJU, ADEGAN_MUNDUR, ADEGAN_SATU_LEBIH } from "./k1b5b-materi-1";
import { ADEGAN_DUA_ARAH, ADEGAN_ES_KRIM, ADEGAN_KISI, ADEGAN_KISI_HILANG, ADEGAN_MAJU_DUA_PULUH, ADEGAN_MUNDUR_DUA_PULUH, ADEGAN_ULAT } from "./k1b5b-materi-2";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_MESIN, ADEGAN_PENUTUP, ADEGAN_TETANGGA } from "./k1b5b-materi-3";
import { ADEGAN_LUAR_HITUNG, ADEGAN_LUAR_HITUNG_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b5b-luar-1";
import { ADEGAN_LUAR_BINGKAI, ADEGAN_LUAR_BINGKAI_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SATUAN, ADEGAN_LUAR_SATUAN_TERAPAN } from "./k1b5b-luar-2";

/** Kelas 1 Bab 5 Sub-Bab B (Menghitung Maju dan Mundur): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K1B5B: VideoStory = {
  id: "k1b5b-materi",
  judul: "Menghitung Maju dan Mundur",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "menghitung maju dan mundur", daftar: ["Menghitung maju", "Menghitung mundur", "Mencari bilangan hilang"] }),
    ADEGAN_CERITA,
    ADEGAN_MAJU,
    ADEGAN_MUNDUR,
    ADEGAN_SATU_LEBIH,
    ADEGAN_ULAT,
    ADEGAN_MAJU_DUA_PULUH,
    ADEGAN_MUNDUR_DUA_PULUH,
    ADEGAN_DUA_ARAH,
    ADEGAN_KISI,
    ADEGAN_KISI_HILANG,
    ADEGAN_ES_KRIM,
    ADEGAN_MESIN,
    ADEGAN_TETANGGA,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B5B: VideoStory = {
  id: "k1b5b-luar",
  judul: "Menghitung Maju dan Mundur: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "menghitung maju dan mundur" }),
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
