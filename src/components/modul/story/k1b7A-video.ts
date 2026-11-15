import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_GARIS, ADEGAN_KATA, ADEGAN_PITA, ADEGAN_SAMA } from "./k1b7A-materi-1";
import { ADEGAN_PALING_PANJANG, ADEGAN_SAMA_TINGGI, ADEGAN_TINGGI, ADEGAN_URUTKAN } from "./k1b7A-materi-2";
import { ADEGAN_DETEKTIF, ADEGAN_KUPU, ADEGAN_PALING_TINGGI } from "./k1b7A-materi-3";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP } from "./k1b7A-materi-4";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_ULANG, ADEGAN_LUAR_ULANG_TERAPAN } from "./k1b7A-luar-1";
import { ADEGAN_LUAR_BANDING, ADEGAN_LUAR_BANDING_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SATUAN, ADEGAN_LUAR_SATUAN_TERAPAN } from "./k1b7A-luar-2";

/** Kelas 1 Bab 7 Sub-Bab A (Membandingkan Panjang dan Tinggi): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K1B7A: VideoStory = {
  id: "k1b7A-materi",
  judul: "Membandingkan Panjang dan Tinggi",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "membandingkan panjang dan tinggi benda", daftar: ["Panjang dan tinggi dua benda", "Paling panjang dan urutan", "Garis awal yang sama"] }),
    ADEGAN_PITA,
    ADEGAN_KATA,
    ADEGAN_SAMA,
    ADEGAN_GARIS,
    ADEGAN_TINGGI,
    ADEGAN_SAMA_TINGGI,
    ADEGAN_PALING_PANJANG,
    ADEGAN_URUTKAN,
    ADEGAN_PALING_TINGGI,
    ADEGAN_KUPU,
    ADEGAN_DETEKTIF,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B7A: VideoStory = {
  id: "k1b7A-luar",
  judul: "Membandingkan Panjang dan Tinggi: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "membandingkan panjang dan tinggi benda" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_ULANG,
    ADEGAN_LUAR_ULANG_TERAPAN,
    ADEGAN_LUAR_BANDING,
    ADEGAN_LUAR_BANDING_TERAPAN,
    ADEGAN_LUAR_SATUAN,
    ADEGAN_LUAR_SATUAN_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
