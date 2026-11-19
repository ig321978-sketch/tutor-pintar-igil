import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_TRUK_BERAS, ADEGAN_RATUSAN_DULU, ADEGAN_RATUSAN_SAMA } from "./k3b1C-materi-1";
import { ADEGAN_SALAH_URUT, ADEGAN_TANDA_BANDING, ADEGAN_GARIS_BILANGAN } from "./k3b1C-materi-2";
import { ADEGAN_URUT_TIGA, ADEGAN_PAPAN_URUT, ADEGAN_PENUTUP } from "./k3b1C-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_TEMPAT, ADEGAN_LUAR_TEMPAT_TERAPAN } from "./k3b1C-luar-1";
import { ADEGAN_LUAR_GARIS, ADEGAN_LUAR_GARIS_TERAPAN, ADEGAN_LUAR_URUT, ADEGAN_LUAR_URUT_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k3b1C-luar-2";

/**
 * Kelas 3 Bab 1 Sub-Bab C (membandingkan dan mengurutkan bilangan), Toko Kelontong Pak Joko.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Karung Pak Dodi" (Raka, Salsa, Bima, Pak Joko, Pak Dodi, Bu Tuti).
 * Video kedua: tiga metode global (Compare Placewise, Number Line, Ordering), terpisah.
 */
export const JUDUL_K3B1C = "Karung Pak Dodi";

export const VIDEO_MATERI_K3B1C: VideoStory = {
  id: "k3b1C-materi",
  judul: JUDUL_K3B1C,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "membandingkan dan mengurutkan bilangan", daftar: ["Membandingkan dua bilangan", "Memakai tanda lebih besar dan lebih kecil", "Mengurutkan bilangan"] }),
    ADEGAN_TRUK_BERAS,
    ADEGAN_RATUSAN_DULU,
    ADEGAN_RATUSAN_SAMA,
    ADEGAN_SALAH_URUT,
    ADEGAN_TANDA_BANDING,
    ADEGAN_GARIS_BILANGAN,
    ADEGAN_URUT_TIGA,
    ADEGAN_PAPAN_URUT,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K3B1C: VideoStory = {
  id: "k3b1C-luar",
  judul: JUDUL_K3B1C,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "membandingkan dan mengurutkan bilangan", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_TEMPAT,
    ADEGAN_LUAR_TEMPAT_TERAPAN,
    ADEGAN_LUAR_GARIS,
    ADEGAN_LUAR_GARIS_TERAPAN,
    ADEGAN_LUAR_URUT,
    ADEGAN_LUAR_URUT_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
