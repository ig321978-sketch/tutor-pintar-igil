import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BRAK, ADEGAN_IKAT_SEPULUH, ADEGAN_TABEL } from "./k1b5c-materi-1";
import { ADEGAN_DUA_PULUH, ADEGAN_KANTONG, ADEGAN_SEBELAS } from "./k1b5c-materi-2";
import { ADEGAN_KALIMAT, ADEGAN_PAPAN_RAPI, ADEGAN_PENUTUP } from "./k1b5c-materi-3";
import { ADEGAN_LUAR_BALOK, ADEGAN_LUAR_BALOK_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b5c-luar-1";
import { ADEGAN_LUAR_IKAT, ADEGAN_LUAR_IKAT_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TABEL, ADEGAN_LUAR_TABEL_TERAPAN } from "./k1b5c-luar-2";

/**
 * Kelas 1 Bab 5 Sub-Bab C (puluhan dan satuan), lanjutan cerita Akuarium Ikan Hias Abang.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Kemas Pakan dan Kantong" (Igil, Kaka, Abang, Mamah).
 * Video kedua: tiga metode global, terpisah.
 */
export const JUDUL_K1B5C = "Kemas Pakan dan Kantong";

export const VIDEO_MATERI_K1B5C: VideoStory = {
  id: "k1b5c-materi",
  judul: JUDUL_K1B5C,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "puluhan dan satuan", daftar: ["Mengikat sepuluh", "Tabel", "Arti angka"] }),
    ADEGAN_BRAK,
    ADEGAN_IKAT_SEPULUH,
    ADEGAN_TABEL,
    ADEGAN_KANTONG,
    ADEGAN_SEBELAS,
    ADEGAN_DUA_PULUH,
    ADEGAN_KALIMAT,
    ADEGAN_PAPAN_RAPI,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B5C: VideoStory = {
  id: "k1b5c-luar",
  judul: JUDUL_K1B5C,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "puluhan dan satuan", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BALOK,
    ADEGAN_LUAR_BALOK_TERAPAN,
    ADEGAN_LUAR_TABEL,
    ADEGAN_LUAR_TABEL_TERAPAN,
    ADEGAN_LUAR_IKAT,
    ADEGAN_LUAR_IKAT_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
