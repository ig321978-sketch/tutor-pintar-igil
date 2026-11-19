import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_ATURAN, ADEGAN_GUDANG, ADEGAN_HITUNG } from "./k4b1b-materi-1";
import { ADEGAN_HARGA, ADEGAN_SALAH_TIGA, ADEGAN_TEMPAT } from "./k4b1b-materi-2";
import { ADEGAN_LIPAT, ADEGAN_PENUTUP, ADEGAN_TUKAR } from "./k4b1b-materi-3";
import { ADEGAN_LUAR_BALOK, ADEGAN_LUAR_BALOK_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k4b1b-luar-1";
import { ADEGAN_LUAR_BAGAN, ADEGAN_LUAR_BAGAN_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TUKAR, ADEGAN_LUAR_TUKAR_TERAPAN } from "./k4b1b-luar-2";

/**
 * Kelas 4 Bab 1 Sub-Bab B (tempat angka dan banyaknya tiap angka), lanjutan cerita Penginapan Pulau Karang Indah.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Gudang Handuk Pak Laode" (Satria, Laras, Genta, Pak Hendro, Pak Laode, Kak Tiara).
 * Video kedua: tiga metode global (Base-Ten Blocks, Place Chart, Digit Swap), terpisah.
 */
export const JUDUL_K4B1B = "Gudang Handuk Pak Laode";

export const VIDEO_MATERI_K4B1B: VideoStory = {
  id: "k4b1b-materi",
  judul: JUDUL_K4B1B,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "tempat angka pada bilangan", daftar: ["Satuan, puluhan, ratusan, ribuan", "Banyaknya tiap angka", "Angka nol"] }),
    ADEGAN_GUDANG,
    ADEGAN_ATURAN,
    ADEGAN_HITUNG,
    ADEGAN_SALAH_TIGA,
    ADEGAN_HARGA,
    ADEGAN_TEMPAT,
    ADEGAN_TUKAR,
    ADEGAN_LIPAT,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K4B1B: VideoStory = {
  id: "k4b1b-luar",
  judul: JUDUL_K4B1B,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "tempat angka pada bilangan", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BALOK,
    ADEGAN_LUAR_BALOK_TERAPAN,
    ADEGAN_LUAR_BAGAN,
    ADEGAN_LUAR_BAGAN_TERAPAN,
    ADEGAN_LUAR_TUKAR,
    ADEGAN_LUAR_TUKAR_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
