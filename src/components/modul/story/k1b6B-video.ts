import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_ANTRE, ADEGAN_GENAP, ADEGAN_MAJU } from "./k1b6B-materi-1";
import { ADEGAN_BELASAN, ADEGAN_CATATAN, ADEGAN_PILIH } from "./k1b6B-materi-2";
import { ADEGAN_LONCENG, ADEGAN_PENUTUP } from "./k1b6B-materi-3";
import { ADEGAN_LUAR_KEMBAR, ADEGAN_LUAR_KEMBAR_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b6B-luar-1";
import { ADEGAN_LUAR_BAGAN, ADEGAN_LUAR_BAGAN_TERAPAN, ADEGAN_LUAR_LOMPAT, ADEGAN_LUAR_LOMPAT_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k1b6B-luar-2";

/**
 * Kelas 1 Bab 6 Sub-Bab B (penjumlahan dengan hasil sampai dua puluh), cerita Pasar Malam Kampung.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Loket Karcis" (Igil, Kaka, Abang, Mamah, Pak RT).
 * Video kedua: tiga metode global, terpisah.
 */
export const JUDUL_K1B6B = "Loket Karcis";

export const VIDEO_MATERI_K1B6B: VideoStory = {
  id: "k1b6B-materi",
  judul: JUDUL_K1B6B,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "menjumlahkan sampai dua puluh", daftar: ["Hitung maju dan genapkan sepuluh", "Belasan ditambah satuan", "Memilih cara yang pas"] }),
    ADEGAN_ANTRE,
    ADEGAN_MAJU,
    ADEGAN_GENAP,
    ADEGAN_BELASAN,
    ADEGAN_PILIH,
    ADEGAN_CATATAN,
    ADEGAN_LONCENG,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B6B: VideoStory = {
  id: "k1b6B-luar",
  judul: JUDUL_K1B6B,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "menjumlahkan sampai dua puluh", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_KEMBAR,
    ADEGAN_LUAR_KEMBAR_TERAPAN,
    ADEGAN_LUAR_BAGAN,
    ADEGAN_LUAR_BAGAN_TERAPAN,
    ADEGAN_LUAR_LOMPAT,
    ADEGAN_LUAR_LOMPAT_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
