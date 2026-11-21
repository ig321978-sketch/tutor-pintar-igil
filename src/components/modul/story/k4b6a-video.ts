import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BAZAR, ADEGAN_KETERANGAN, ADEGAN_PIKTOGRAM } from "./k4b6a-materi-1";
import { ADEGAN_BACA_IKON, ADEGAN_PERIKSA_JUMLAH, ADEGAN_SALAH_JUMLAH } from "./k4b6a-materi-2";
import { ADEGAN_BANDING, ADEGAN_KETERANGAN_LAIN, ADEGAN_PENUTUP } from "./k4b6a-materi-3";
import { ADEGAN_LUAR_HITUNG, ADEGAN_LUAR_HITUNG_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k4b6a-luar-1";
import { ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TABEL, ADEGAN_LUAR_TABEL_TERAPAN, ADEGAN_LUAR_URUT, ADEGAN_LUAR_URUT_TERAPAN } from "./k4b6a-luar-2";

/**
 * Kelas 4 Bab 6 Sub-Bab A (piktogram skala satu dan lebih dari satu), awal cerita Bazar Kuliner Sekolah.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Piktogram Jajanan Bu Rini" (Satria, Laras, Genta, Pak Hendro, Bu Rini, Pak Dodi).
 * Video kedua: tiga metode global (Count the Icons, Table to Picture, Rank and Compare), terpisah.
 */
export const JUDUL_K4B6A = "Piktogram Jajanan Bu Rini";

export const VIDEO_MATERI_K4B6A: VideoStory = {
  id: "k4b6a-materi",
  judul: JUDUL_K4B6A,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "piktogram", daftar: ["Ikon", "Keterangan", "Paling banyak"] }),
    ADEGAN_BAZAR,
    ADEGAN_PIKTOGRAM,
    ADEGAN_KETERANGAN,
    ADEGAN_BACA_IKON,
    ADEGAN_SALAH_JUMLAH,
    ADEGAN_PERIKSA_JUMLAH,
    ADEGAN_BANDING,
    ADEGAN_KETERANGAN_LAIN,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K4B6A: VideoStory = {
  id: "k4b6a-luar",
  judul: JUDUL_K4B6A,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "piktogram", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_HITUNG,
    ADEGAN_LUAR_HITUNG_TERAPAN,
    ADEGAN_LUAR_TABEL,
    ADEGAN_LUAR_TABEL_TERAPAN,
    ADEGAN_LUAR_URUT,
    ADEGAN_LUAR_URUT_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
