import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BAGAN, ADEGAN_NOL_SAMA, ADEGAN_STASIUN } from "./k1b3b-materi-1";
import { ADEGAN_KURSI, ADEGAN_PERON } from "./k1b3b-materi-2";
import { ADEGAN_DUDUK, ADEGAN_PENUTUP } from "./k1b3b-materi-3";
import { ADEGAN_LUAR_BAGAN, ADEGAN_LUAR_BAGAN_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b3b-luar-1";
import { ADEGAN_LUAR_GARIS, ADEGAN_LUAR_GARIS_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SEPULUH, ADEGAN_LUAR_SEPULUH_TERAPAN } from "./k1b3b-luar-2";

/**
 * Kelas 1 Bab 3 Sub-Bab B (berbagai cara mengurangi), lanjutan cerita Kereta ke Rumah Nenek.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Pindah Kereta di Stasiun Besar" (Igil, Kaka, Abang, Mamah).
 * Video kedua: tiga metode global, terpisah.
 */
export const JUDUL_K1B3B = "Pindah Kereta di Stasiun Besar";

export const VIDEO_MATERI_K1B3B: VideoStory = {
  id: "k1b3b-materi",
  judul: JUDUL_K1B3B,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "berbagai cara mengurangi", daftar: ["Satu bagan, dua pengurangan", "Hitung mundur di garis bilangan", "Pengurangan dari sepuluh"] }),
    ADEGAN_STASIUN,
    ADEGAN_BAGAN,
    ADEGAN_NOL_SAMA,
    ADEGAN_PERON,
    ADEGAN_KURSI,
    ADEGAN_DUDUK,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B3B: VideoStory = {
  id: "k1b3b-luar",
  judul: JUDUL_K1B3B,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "berbagai cara mengurangi", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BAGAN,
    ADEGAN_LUAR_BAGAN_TERAPAN,
    ADEGAN_LUAR_GARIS,
    ADEGAN_LUAR_GARIS_TERAPAN,
    ADEGAN_LUAR_SEPULUH,
    ADEGAN_LUAR_SEPULUH_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
