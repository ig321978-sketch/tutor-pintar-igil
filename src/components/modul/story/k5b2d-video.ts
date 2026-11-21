import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_DAFTAR, ADEGAN_KOTAK, ADEGAN_CONGKLAK } from "./k5b2d-materi-1";
import { ADEGAN_FPB, ADEGAN_PERIKSA, ADEGAN_SALAH_DUA } from "./k5b2d-materi-2";
import { ADEGAN_BAGI, ADEGAN_DELAPAN_DUA_PULUH, ADEGAN_PENUTUP } from "./k5b2d-materi-3";
import { ADEGAN_LUAR_DAFTAR, ADEGAN_LUAR_DAFTAR_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k5b2d-luar-1";
import { ADEGAN_LUAR_BAGI, ADEGAN_LUAR_BAGI_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TERBESAR, ADEGAN_LUAR_TERBESAR_TERAPAN } from "./k5b2d-luar-2";

/**
 * Kelas 5 Bab 2 Sub-Bab D (faktor persekutuan dan FPB), Pasar Kuliner Malam.
 * Video materi (sekitar tiga menit): cerita orisinal IGIL "Kotak Bingkisan Pak Joko" (Bima, Citra, Fajar, Pak Arif, dan Pak Joko; Kak Lintang datang di akhir).
 * Video kedua: tiga metode global (Two Lists, Share Equally, Biggest Match), terpisah.
 */
export const JUDUL_K5B2D = "Kotak Bingkisan Pak Joko";

export const VIDEO_MATERI_K5B2D: VideoStory = {
  id: "k5b2d-materi",
  judul: JUDUL_K5B2D,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "FPB", daftar: ["Faktor persekutuan", "Yang terbesar", "Bagi sama rata"] }),
    ADEGAN_KOTAK,
    ADEGAN_DAFTAR,
    ADEGAN_CONGKLAK,
    ADEGAN_SALAH_DUA,
    ADEGAN_PERIKSA,
    ADEGAN_FPB,
    ADEGAN_BAGI,
    ADEGAN_DELAPAN_DUA_PULUH,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K5B2D: VideoStory = {
  id: "k5b2d-luar",
  judul: JUDUL_K5B2D,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "FPB", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_DAFTAR,
    ADEGAN_LUAR_DAFTAR_TERAPAN,
    ADEGAN_LUAR_BAGI,
    ADEGAN_LUAR_BAGI_TERAPAN,
    ADEGAN_LUAR_TERBESAR,
    ADEGAN_LUAR_TERBESAR_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
