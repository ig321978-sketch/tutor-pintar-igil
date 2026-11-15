import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_PITA, ADEGAN_RAPAT, ADEGAN_SATUAN, ADEGAN_UJUNG } from "./k1b7B-materi-1";
import { ADEGAN_LIMA, ADEGAN_MIRING, ADEGAN_SATU_JENIS, ADEGAN_TUMPUK, ADEGAN_UKUR_MEJA } from "./k1b7B-materi-2";
import { ADEGAN_BANDING_DUA, ADEGAN_DUA_SATUAN, ADEGAN_PETAK, ADEGAN_SAMA, ADEGAN_TULIS } from "./k1b7B-materi-3";
import { ADEGAN_BANDING_TIGA, ADEGAN_DETEKTIF, ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP, ADEGAN_TEBAK } from "./k1b7B-materi-4";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_ULANGI, ADEGAN_LUAR_ULANGI_TERAPAN } from "./k1b7B-luar-1";
import { ADEGAN_LUAR_BANDING, ADEGAN_LUAR_BANDING_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SATUAN, ADEGAN_LUAR_SATUAN_TERAPAN } from "./k1b7B-luar-2";

/** Kelas 1 Bab 7 Sub-Bab B (Mengukur Panjang dengan Satuan Tidak Baku): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K1B7B: VideoStory = {
  id: "k1b7B-materi",
  judul: "Mengukur Panjang dengan Satuan Tidak Baku",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "mengukur panjang dengan satuan tidak baku", daftar: ["Mengukur dengan satuan", "Cara mengukur yang benar", "Membandingkan hasil ukur"] }),
    ADEGAN_PITA,
    ADEGAN_SATUAN,
    ADEGAN_UJUNG,
    ADEGAN_RAPAT,
    ADEGAN_TUMPUK,
    ADEGAN_MIRING,
    ADEGAN_SATU_JENIS,
    ADEGAN_LIMA,
    ADEGAN_UKUR_MEJA,
    ADEGAN_TULIS,
    ADEGAN_DUA_SATUAN,
    ADEGAN_PETAK,
    ADEGAN_BANDING_DUA,
    ADEGAN_SAMA,
    ADEGAN_BANDING_TIGA,
    ADEGAN_TEBAK,
    ADEGAN_DETEKTIF,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B7B: VideoStory = {
  id: "k1b7B-luar",
  judul: "Mengukur Panjang dengan Satuan Tidak Baku: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "mengukur panjang dengan satuan tidak baku" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_ULANGI,
    ADEGAN_LUAR_ULANGI_TERAPAN,
    ADEGAN_LUAR_BANDING,
    ADEGAN_LUAR_BANDING_TERAPAN,
    ADEGAN_LUAR_SATUAN,
    ADEGAN_LUAR_SATUAN_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
