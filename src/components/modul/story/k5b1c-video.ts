import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BUNDEL, ADEGAN_GUDANG } from "./k5b1c-materi-1";
import { ADEGAN_PERIKSA_JUMLAH, ADEGAN_SALAH_URAI, ADEGAN_URAI } from "./k5b1c-materi-2";
import { ADEGAN_KEMBALI, ADEGAN_PENUTUP, ADEGAN_SUSUN_LAIN, ADEGAN_TUKAR } from "./k5b1c-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_URAI, ADEGAN_LUAR_URAI_TERAPAN } from "./k5b1c-luar-1";
import { ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SUSUN, ADEGAN_LUAR_SUSUN_TERAPAN, ADEGAN_LUAR_TUKAR, ADEGAN_LUAR_TUKAR_TERAPAN } from "./k5b1c-luar-2";

/**
 * Kelas 5 Bab 1 Sub-Bab C (menguraikan bilangan), lanjutan cerita Hari Pertandingan di Stadion Kota.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Bundel Tiket Bu Lestari" (Bima, Citra, Fajar, Pak Arif, Bu Lestari, Pak Darmo).
 * Video kedua: tiga metode global (Break It Apart, Swap Bundles, Build It Back), terpisah.
 */
export const JUDUL_K5B1C = "Bundel Tiket Bu Lestari";

export const VIDEO_MATERI_K5B1C: VideoStory = {
  id: "k5b1c-materi",
  judul: JUDUL_K5B1C,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "menguraikan bilangan", daftar: ["Uraian", "Tukar bundel", "Bentuk lazim"] }),
    ADEGAN_GUDANG,
    ADEGAN_BUNDEL,
    ADEGAN_URAI,
    ADEGAN_SALAH_URAI,
    ADEGAN_PERIKSA_JUMLAH,
    ADEGAN_TUKAR,
    ADEGAN_SUSUN_LAIN,
    ADEGAN_KEMBALI,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K5B1C: VideoStory = {
  id: "k5b1c-luar",
  judul: JUDUL_K5B1C,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "menguraikan bilangan", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_URAI,
    ADEGAN_LUAR_URAI_TERAPAN,
    ADEGAN_LUAR_TUKAR,
    ADEGAN_LUAR_TUKAR_TERAPAN,
    ADEGAN_LUAR_SUSUN,
    ADEGAN_LUAR_SUSUN_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
