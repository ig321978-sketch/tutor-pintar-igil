import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_KIOS, ADEGAN_PANEN, ADEGAN_URAI_SALAH } from "./k4b1d-materi-1";
import { ADEGAN_BAGAN, ADEGAN_BENAR, ADEGAN_PANJAT } from "./k4b1d-materi-2";
import { ADEGAN_LAIN, ADEGAN_PENUTUP, ADEGAN_UANG } from "./k4b1d-materi-3";
import { ADEGAN_LUAR_PECAH, ADEGAN_LUAR_PECAH_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k4b1d-luar-1";
import { ADEGAN_LUAR_BAGAN, ADEGAN_LUAR_BAGAN_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SUSUN, ADEGAN_LUAR_SUSUN_TERAPAN } from "./k4b1d-luar-2";

/**
 * Kelas 4 Bab 1 Sub-Bab D (menyusun dan menguraikan bilangan), Penginapan Pulau Karang Indah.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Kios Kelapa Pak Darwis" (Satria, Laras, Genta, Pak Hendro, Pak Darwis, Bu Rina).
 * Video kedua: tiga metode global (Break Apart, Build Up, Part-Part-Whole), terpisah.
 */
export const JUDUL_K4B1D = "Kios Kelapa Pak Darwis";

export const VIDEO_MATERI_K4B1D: VideoStory = {
  id: "k4b1d-materi",
  judul: JUDUL_K4B1D,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "menyusun dan menguraikan bilangan", daftar: ["Menyusun bilangan", "Menguraikan bilangan", "Lebih dari satu cara"] }),
    ADEGAN_KIOS,
    ADEGAN_PANEN,
    ADEGAN_URAI_SALAH,
    ADEGAN_BAGAN,
    ADEGAN_BENAR,
    ADEGAN_PANJAT,
    ADEGAN_LAIN,
    ADEGAN_UANG,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K4B1D: VideoStory = {
  id: "k4b1d-luar",
  judul: JUDUL_K4B1D,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "menyusun dan menguraikan bilangan", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_PECAH,
    ADEGAN_LUAR_PECAH_TERAPAN,
    ADEGAN_LUAR_SUSUN,
    ADEGAN_LUAR_SUSUN_TERAPAN,
    ADEGAN_LUAR_BAGAN,
    ADEGAN_LUAR_BAGAN_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
