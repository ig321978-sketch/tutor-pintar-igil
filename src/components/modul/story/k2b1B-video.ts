import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_KOTAK, ADEGAN_PESANAN, ADEGAN_TUJUH } from "./k2b1B-materi-1";
import { ADEGAN_LETAK, ADEGAN_NOL, ADEGAN_TABEL } from "./k2b1B-materi-2";
import { ADEGAN_PANJANG, ADEGAN_PENUTUP, ADEGAN_SELESAI } from "./k2b1B-materi-3";
import { ADEGAN_LUAR_BALOK, ADEGAN_LUAR_BALOK_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k2b1B-luar-1";
import { ADEGAN_LUAR_BAGAN, ADEGAN_LUAR_BAGAN_TERAPAN, ADEGAN_LUAR_PANJANG, ADEGAN_LUAR_PANJANG_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k2b1B-luar-2";

/**
 * Kelas 2 Bab 1 Sub-Bab B (puluhan dan satuan), tengah cerita Kue di Kantin Sekolah.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Pesanan Kue Hari Olahraga" (Chacha, Dika, Nia, Bu Sari, Pak Anto).
 * Video kedua: tiga metode global, terpisah.
 */
export const JUDUL_K2B1B = "Pesanan Kue Hari Olahraga";

export const VIDEO_MATERI_K2B1B: VideoStory = {
  id: "k2b1B-materi",
  judul: JUDUL_K2B1B,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "puluhan dan satuan pada bilangan sampai lima puluh", daftar: ["Tabel puluhan dan satuan", "Arti angka menurut letaknya", "Menulis bilangan dari puluhan dan satuan"] }),
    ADEGAN_PESANAN,
    ADEGAN_TUJUH,
    ADEGAN_KOTAK,
    ADEGAN_TABEL,
    ADEGAN_LETAK,
    ADEGAN_NOL,
    ADEGAN_PANJANG,
    ADEGAN_SELESAI,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B1B: VideoStory = {
  id: "k2b1B-luar",
  judul: JUDUL_K2B1B,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "puluhan dan satuan pada bilangan sampai lima puluh", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BALOK,
    ADEGAN_LUAR_BALOK_TERAPAN,
    ADEGAN_LUAR_BAGAN,
    ADEGAN_LUAR_BAGAN_TERAPAN,
    ADEGAN_LUAR_PANJANG,
    ADEGAN_LUAR_PANJANG_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
