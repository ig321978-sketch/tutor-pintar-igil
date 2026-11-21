import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_DERMAGA_PULANG, ADEGAN_PANJANG, ADEGAN_CATATAN, ADEGAN_SALAH_BALIK } from "./k4b1f-materi-1";
import { ADEGAN_AMBIL, ADEGAN_HASIL, ADEGAN_RATUSAN } from "./k4b1f-materi-2";
import { ADEGAN_CUCI, ADEGAN_PENUTUP, ADEGAN_PERIKSA } from "./k4b1f-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_SUSUN, ADEGAN_LUAR_SUSUN_TERAPAN } from "./k4b1f-luar-1";
import { ADEGAN_LUAR_MAJU, ADEGAN_LUAR_MAJU_TERAPAN, ADEGAN_LUAR_PERIKSA, ADEGAN_LUAR_PERIKSA_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k4b1f-luar-2";

/**
 * Kelas 4 Bab 1 Sub-Bab F (pengurangan bersusun sampai seribu), cerita Penginapan Pulau Karang Indah.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Papan Sisa Pak Usman" (Satria, Laras, Genta, Pak Hendro, Pak Usman).
 * Video kedua: tiga metode global (Column Subtract, Count Up, Add Check), terpisah.
 */
export const JUDUL_K4B1F = "Papan Sisa Pak Usman";

export const VIDEO_MATERI_K4B1F: VideoStory = {
  id: "k4b1f-materi",
  judul: JUDUL_K4B1F,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "mengurangkan bilangan sampai seribu", daftar: ["Susun panjang dan susun pendek", "Mengambil dari tempat di kiri", "Memeriksa dengan penjumlahan"] }),
    ADEGAN_DERMAGA_PULANG,
    ADEGAN_PANJANG,
    ADEGAN_CATATAN,
    ADEGAN_SALAH_BALIK,
    ADEGAN_AMBIL,
    ADEGAN_RATUSAN,
    ADEGAN_HASIL,
    ADEGAN_PERIKSA,
    ADEGAN_CUCI,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K4B1F: VideoStory = {
  id: "k4b1f-luar",
  judul: JUDUL_K4B1F,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "mengurangkan bilangan sampai seribu", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_SUSUN,
    ADEGAN_LUAR_SUSUN_TERAPAN,
    ADEGAN_LUAR_MAJU,
    ADEGAN_LUAR_MAJU_TERAPAN,
    ADEGAN_LUAR_PERIKSA,
    ADEGAN_LUAR_PERIKSA_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
