import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_HITUNG_DARI_AWAL, ADEGAN_KARDUS_DATANG, ADEGAN_MAJU } from "./k2b2A-materi-1";
import { ADEGAN_BAJU_OLAHRAGA, ADEGAN_BERSUSUN, ADEGAN_PASANGAN } from "./k2b2A-materi-2";
import { ADEGAN_GANTUNGAN_PAS, ADEGAN_PENUTUP_A, ADEGAN_TUKAR_SEPULUH } from "./k2b2A-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_SEPULUH, ADEGAN_LUAR_SEPULUH_TERAPAN } from "./k2b2A-luar-1";
import { ADEGAN_LUAR_BULAT, ADEGAN_LUAR_BULAT_TERAPAN, ADEGAN_LUAR_KEMBAR, ADEGAN_LUAR_KEMBAR_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k2b2A-luar-2";

/**
 * Kelas 2 Bab 2 Sub-Bab A (penjumlahan sampai dua puluh), awal cerita Toko Seragam dan Alat Tulis Sekolah.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Kiriman dari Gudang" (Chacha, Dika, Nia, Bu Sari, Pak Ujang).
 * Video kedua: tiga metode global (Make a Ten, Doubles Plus One, Round and Adjust), terpisah.
 */
export const JUDUL_K2B2A = "Kiriman dari Gudang";

export const VIDEO_MATERI_K2B2A: VideoStory = {
  id: "k2b2A-materi",
  judul: JUDUL_K2B2A,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "menjumlahkan bilangan sampai dua puluh", daftar: ["Menjumlahkan dengan maju dari bilangan yang besar", "Menjumlahkan dengan pasangan bilangan dan cara bersusun", "Menyimpan puluhan saat satuannya penuh"] }),
    ADEGAN_KARDUS_DATANG,
    ADEGAN_HITUNG_DARI_AWAL,
    ADEGAN_MAJU,
    ADEGAN_PASANGAN,
    ADEGAN_BERSUSUN,
    ADEGAN_BAJU_OLAHRAGA,
    ADEGAN_TUKAR_SEPULUH,
    ADEGAN_GANTUNGAN_PAS,
    ADEGAN_PENUTUP_A,
  ],
};

export const VIDEO_LUAR_K2B2A: VideoStory = {
  id: "k2b2A-luar",
  judul: JUDUL_K2B2A,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "menjumlahkan bilangan sampai dua puluh", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_SEPULUH,
    ADEGAN_LUAR_SEPULUH_TERAPAN,
    ADEGAN_LUAR_KEMBAR,
    ADEGAN_LUAR_KEMBAR_TERAPAN,
    ADEGAN_LUAR_BULAT,
    ADEGAN_LUAR_BULAT_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
