import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BANYAK, ADEGAN_CERITA, ADEGAN_PASANGKAN } from "./k1b1b-materi-1";
import { ADEGAN_SEDIKIT, ADEGAN_TANDA_BANYAK, ADEGAN_TANDA_SAMA, ADEGAN_TANDA_SEDIKIT, ADEGAN_TERTIPU } from "./k1b1b-materi-2";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_NOL, ADEGAN_PENUTUP } from "./k1b1b-materi-3";
import { ADEGAN_LUAR_BINGKAI, ADEGAN_LUAR_BINGKAI_TERAPAN, ADEGAN_LUAR_NAMA, ADEGAN_LUAR_NAMA_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b1b-luar-1";
import { ADEGAN_LUAR_GARIS, ADEGAN_LUAR_GARIS_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k1b1b-luar-2";

/** Kelas 1 Bab 1 Sub-Bab B (Membandingkan Banyak Benda): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K1B1B: VideoStory = {
  id: "k1b1b-materi",
  judul: "Membandingkan Banyak Benda",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "membandingkan banyak benda", daftar: ["Memasangkan benda", "Mengenal banyak dan sedikit", "Memilih tanda yang tepat"] }),
    ADEGAN_CERITA,
    ADEGAN_PASANGKAN,
    ADEGAN_BANYAK,
    ADEGAN_SEDIKIT,
    ADEGAN_TERTIPU,
    ADEGAN_TANDA_BANYAK,
    ADEGAN_TANDA_SEDIKIT,
    ADEGAN_TANDA_SAMA,
    ADEGAN_NOL,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B1B: VideoStory = {
  id: "k1b1b-luar",
  judul: "Membandingkan Banyak Benda: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "membandingkan banyak benda" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_NAMA,
    ADEGAN_LUAR_NAMA_TERAPAN,
    ADEGAN_LUAR_BINGKAI,
    ADEGAN_LUAR_BINGKAI_TERAPAN,
    ADEGAN_LUAR_GARIS,
    ADEGAN_LUAR_GARIS_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
