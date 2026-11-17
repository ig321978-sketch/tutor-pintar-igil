import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BENTUK, ADEGAN_NAMA, ADEGAN_TERAS } from "./k1b4b-materi-1";
import { ADEGAN_UKURAN, ADEGAN_WARNA } from "./k1b4b-materi-2";
import { ADEGAN_PENUTUP, ADEGAN_RAPI, ADEGAN_SATU } from "./k1b4b-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_PILAH, ADEGAN_LUAR_PILAH_TERAPAN } from "./k1b4b-luar-1";
import { ADEGAN_LUAR_BEDA, ADEGAN_LUAR_BEDA_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TEBAK, ADEGAN_LUAR_TEBAK_TERAPAN } from "./k1b4b-luar-2";

/**
 * Kelas 1 Bab 4 Sub-Bab B (memilah benda), lanjutan cerita Festival Mainan Kardus.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Teras Penuh Barang" (Igil, Kaka, Abang, Mamah).
 * Video kedua: tiga metode global, terpisah.
 */
export const JUDUL_K1B4B = "Teras Penuh Barang";

export const VIDEO_MATERI_K1B4B: VideoStory = {
  id: "k1b4b-materi",
  judul: JUDUL_K1B4B,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "memilah benda", daftar: ["Satu aturan", "Nama dan isi", "Ganti aturan"] }),
    ADEGAN_TERAS,
    ADEGAN_BENTUK,
    ADEGAN_NAMA,
    ADEGAN_WARNA,
    ADEGAN_UKURAN,
    ADEGAN_SATU,
    ADEGAN_RAPI,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B4B: VideoStory = {
  id: "k1b4b-luar",
  judul: JUDUL_K1B4B,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "memilah benda", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_PILAH,
    ADEGAN_LUAR_PILAH_TERAPAN,
    ADEGAN_LUAR_TEBAK,
    ADEGAN_LUAR_TEBAK_TERAPAN,
    ADEGAN_LUAR_BEDA,
    ADEGAN_LUAR_BEDA_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
