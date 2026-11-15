import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_CERITA_BUAH, ADEGAN_GANTUNGAN, ADEGAN_JUNGKAT, ADEGAN_LEBIH_BERAT, ADEGAN_SAMA_BERAT } from "./k2b6A-materi-1";
import { ADEGAN_BESAR, ADEGAN_PALING, ADEGAN_SATUAN, ADEGAN_TEBAK } from "./k2b6A-materi-2";
import { ADEGAN_BONEKA_KELERENG, ADEGAN_BONEKA_TENIS, ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA } from "./k2b6A-materi-3";
import { ADEGAN_PENUTUP } from "./k2b6A-materi-4";
import { ADEGAN_LUAR_BANDING, ADEGAN_LUAR_BANDING_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_RINGKAS } from "./k2b6A-luar-1";
import { ADEGAN_LUAR_LEBIH, ADEGAN_LUAR_LEBIH_TERAPAN, ADEGAN_LUAR_SATUAN, ADEGAN_LUAR_SATUAN_TERAPAN } from "./k2b6A-luar-2";

/** Kelas 2 Bab 6 Sub-Bab A (Berat): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K2B6A: VideoStory = {
  id: "k2b6A-materi",
  judul: "Berat Benda",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "berat", daftar: ["Membandingkan dua benda", "Mengurutkan tiga benda", "Satuan tidak baku"] }),
    ADEGAN_CERITA_BUAH,
    ADEGAN_JUNGKAT,
    ADEGAN_LEBIH_BERAT,
    ADEGAN_SAMA_BERAT,
    ADEGAN_GANTUNGAN,
    ADEGAN_TEBAK,
    ADEGAN_PALING,
    ADEGAN_BESAR,
    ADEGAN_SATUAN,
    ADEGAN_BONEKA_TENIS,
    ADEGAN_BONEKA_KELERENG,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B6A: VideoStory = {
  id: "k2b6A-luar",
  judul: "Berat Benda: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "berat" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BANDING,
    ADEGAN_LUAR_BANDING_TERAPAN,
    ADEGAN_LUAR_SATUAN,
    ADEGAN_LUAR_SATUAN_TERAPAN,
    ADEGAN_LUAR_LEBIH,
    ADEGAN_LUAR_LEBIH_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
