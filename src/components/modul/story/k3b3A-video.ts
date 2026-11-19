import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_GERBANG, ADEGAN_JENGKAL, ADEGAN_SATUAN_BAKU } from "./k3b3A-materi-1";
import { ADEGAN_MULAI_NOL, ADEGAN_SALAH_BACA, ADEGAN_TULIS_SATUAN } from "./k3b3A-materi-2";
import { ADEGAN_PAGAR, ADEGAN_PENUTUP, ADEGAN_PILIH_ALAT } from "./k3b3A-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_PERKIRAAN, ADEGAN_LUAR_PERKIRAAN_TERAPAN } from "./k3b3A-luar-1";
import { ADEGAN_LUAR_ACUAN, ADEGAN_LUAR_ACUAN_TERAPAN, ADEGAN_LUAR_PITA, ADEGAN_LUAR_PITA_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k3b3A-luar-2";

/**
 * Kelas 3 Bab 3 Sub-Bab A (mengukur panjang dengan satuan baku), awal cerita Kebun Binatang Mini.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Ukuran Kandang Kak Tari" (Raka, Salsa, Bima, Pak Joko, Kak Tari).
 * Video kedua: tiga metode global (Estimate and Check, Benchmark Measuring, Strip Ruler), terpisah.
 */
export const JUDUL_K3B3A = "Ukuran Kandang Kak Tari";

export const VIDEO_MATERI_K3B3A: VideoStory = {
  id: "k3b3A-materi",
  judul: JUDUL_K3B3A,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "mengukur panjang dengan satuan baku", daftar: ["Sentimeter dan meter", "Mulai dari angka nol", "Memilih alat ukur yang tepat"] }),
    ADEGAN_GERBANG,
    ADEGAN_JENGKAL,
    ADEGAN_SATUAN_BAKU,
    ADEGAN_SALAH_BACA,
    ADEGAN_MULAI_NOL,
    ADEGAN_TULIS_SATUAN,
    ADEGAN_PAGAR,
    ADEGAN_PILIH_ALAT,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K3B3A: VideoStory = {
  id: "k3b3A-luar",
  judul: JUDUL_K3B3A,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "mengukur panjang dengan satuan baku", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_PERKIRAAN,
    ADEGAN_LUAR_PERKIRAAN_TERAPAN,
    ADEGAN_LUAR_ACUAN,
    ADEGAN_LUAR_ACUAN_TERAPAN,
    ADEGAN_LUAR_PITA,
    ADEGAN_LUAR_PITA_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
