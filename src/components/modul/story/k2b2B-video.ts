import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_MUNDUR, ADEGAN_PASANG, ADEGAN_RAK_DISERBU } from "./k2b2B-materi-1";
import { ADEGAN_PERIKSA_CHACHA, ADEGAN_SUSUN_PASANGAN, ADEGAN_TERBALIK } from "./k2b2B-materi-2";
import { ADEGAN_KARTU_STOK, ADEGAN_PENUTUP, ADEGAN_URAI } from "./k2b2B-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_PIKIR, ADEGAN_LUAR_PIKIR_TERAPAN } from "./k2b2B-luar-1";
import { ADEGAN_LUAR_KELUARGA, ADEGAN_LUAR_KELUARGA_TERAPAN, ADEGAN_LUAR_KURANGI_SEPULUH, ADEGAN_LUAR_KURANGI_SEPULUH_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k2b2B-luar-2";

/**
 * Kelas 2 Bab 2 Sub-Bab B (Berbagai Cara Pengurangan), tengah cerita Toko Seragam dan Alat Tulis Sekolah.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Rak Seragam Diserbu" (Chacha, Dika, Nia, Bu Sari, Bu Rina).
 * Video kedua: tiga metode global, terpisah.
 */
export const JUDUL_K2B2B = "Rak Seragam Diserbu";

export const VIDEO_MATERI_K2B2B: VideoStory = {
  id: "k2b2B-materi",
  judul: JUDUL_K2B2B,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "mengurangkan bilangan sampai dua puluh", daftar: ["Mencari selisih dengan memasangkan", "Cara mundur, bersusun, dan pasangan bilangan", "Membuka satu puluhan dan memeriksa dengan penjumlahan"] }),
    ADEGAN_RAK_DISERBU,
    ADEGAN_PASANG,
    ADEGAN_MUNDUR,
    ADEGAN_SUSUN_PASANGAN,
    ADEGAN_TERBALIK,
    ADEGAN_PERIKSA_CHACHA,
    ADEGAN_URAI,
    ADEGAN_KARTU_STOK,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B2B: VideoStory = {
  id: "k2b2B-luar",
  judul: JUDUL_K2B2B,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "mengurangkan bilangan sampai dua puluh", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_PIKIR,
    ADEGAN_LUAR_PIKIR_TERAPAN,
    ADEGAN_LUAR_KELUARGA,
    ADEGAN_LUAR_KELUARGA_TERAPAN,
    ADEGAN_LUAR_KURANGI_SEPULUH,
    ADEGAN_LUAR_KURANGI_SEPULUH_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
