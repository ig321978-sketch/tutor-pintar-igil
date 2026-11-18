import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_EMPAT_LANGKAH, ADEGAN_PESANAN_BESAR, ADEGAN_TERLALU_CEPAT } from "./k2b2C-materi-1";
import { ADEGAN_BILANGAN_AWAL, ADEGAN_SELISIH_JUMLAH, ADEGAN_TIGA_BILANGAN } from "./k2b2C-materi-2";
import { ADEGAN_CERITA_NIA, ADEGAN_PEMBUKAAN, ADEGAN_PENUTUP } from "./k2b2C-materi-3";
import { ADEGAN_LUAR_BAGIAN, ADEGAN_LUAR_BAGIAN_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k2b2C-luar-1";
import { ADEGAN_LUAR_MUNDUR, ADEGAN_LUAR_MUNDUR_TERAPAN, ADEGAN_LUAR_PERAGAKAN, ADEGAN_LUAR_PERAGAKAN_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k2b2C-luar-2";

/**
 * Kelas 2 Bab 2 Sub-Bab C (cerita hitungan penjumlahan dan pengurangan), akhir cerita Toko Seragam dan Alat Tulis Sekolah.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Pesanan Besar Pak Budi" (Chacha, Dika, Nia, Bu Sari, Pak Budi).
 * Video kedua: tiga metode global, terpisah.
 */
export const JUDUL_K2B2C = "Pesanan Besar Pak Budi";

export const VIDEO_MATERI_K2B2C: VideoStory = {
  id: "k2b2C-materi",
  judul: JUDUL_K2B2C,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "cerita hitungan penjumlahan dan pengurangan", daftar: ["Membaca kata petunjuk dalam cerita", "Menulis diketahui, ditanya, solusi, dan kesimpulan", "Mencari bilangan awal dan membuat cerita sendiri"] }),
    ADEGAN_PESANAN_BESAR,
    ADEGAN_TERLALU_CEPAT,
    ADEGAN_EMPAT_LANGKAH,
    ADEGAN_SELISIH_JUMLAH,
    ADEGAN_TIGA_BILANGAN,
    ADEGAN_BILANGAN_AWAL,
    ADEGAN_CERITA_NIA,
    ADEGAN_PEMBUKAAN,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B2C: VideoStory = {
  id: "k2b2C-luar",
  judul: JUDUL_K2B2C,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "cerita hitungan penjumlahan dan pengurangan", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BAGIAN,
    ADEGAN_LUAR_BAGIAN_TERAPAN,
    ADEGAN_LUAR_PERAGAKAN,
    ADEGAN_LUAR_PERAGAKAN_TERAPAN,
    ADEGAN_LUAR_MUNDUR,
    ADEGAN_LUAR_MUNDUR_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
