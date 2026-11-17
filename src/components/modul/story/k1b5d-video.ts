import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_PASANGAN, ADEGAN_PEMBUKAAN } from "./k1b5d-materi-1";
import { ADEGAN_PALING, ADEGAN_PULUHAN_DULU, ADEGAN_URUT } from "./k1b5d-materi-2";
import { ADEGAN_LAPAK_BUKA, ADEGAN_PENUTUP, ADEGAN_PESANAN } from "./k1b5d-materi-3";
import { ADEGAN_LUAR_PASANG, ADEGAN_LUAR_PASANG_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b5d-luar-1";
import { ADEGAN_LUAR_GARIS, ADEGAN_LUAR_GARIS_TERAPAN, ADEGAN_LUAR_MENARA, ADEGAN_LUAR_MENARA_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k1b5d-luar-2";

/**
 * Kelas 1 Bab 5 Sub-Bab D (membandingkan dan mengurutkan bilangan), akhir cerita Akuarium Ikan Hias Abang.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Lapak Ikan Dibuka" (Igil, Kaka, Abang, Mamah, Pak RT).
 * Video kedua: tiga metode global, terpisah.
 */
export const JUDUL_K1B5D = "Lapak Ikan Dibuka";

export const VIDEO_MATERI_K1B5D: VideoStory = {
  id: "k1b5d-materi",
  judul: JUDUL_K1B5D,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "membandingkan dan mengurutkan bilangan", daftar: ["Membandingkan kumpulan", "Paling banyak, paling sedikit", "Mengurutkan bilangan"] }),
    ADEGAN_PEMBUKAAN,
    ADEGAN_PASANGAN,
    ADEGAN_PULUHAN_DULU,
    ADEGAN_PALING,
    ADEGAN_URUT,
    ADEGAN_PESANAN,
    ADEGAN_LAPAK_BUKA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B5D: VideoStory = {
  id: "k1b5d-luar",
  judul: JUDUL_K1B5D,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "membandingkan dan mengurutkan bilangan", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_PASANG,
    ADEGAN_LUAR_PASANG_TERAPAN,
    ADEGAN_LUAR_MENARA,
    ADEGAN_LUAR_MENARA_TERAPAN,
    ADEGAN_LUAR_GARIS,
    ADEGAN_LUAR_GARIS_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
