import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_LONCENG, ADEGAN_LUPA, ADEGAN_MUNDUR } from "./k1b6C-materi-1";
import { ADEGAN_BALON, ADEGAN_PERIKSA, ADEGAN_PILIH } from "./k1b6C-materi-2";
import { ADEGAN_PENUTUP, ADEGAN_PERAYAAN } from "./k1b6C-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_PIKIR, ADEGAN_LUAR_PIKIR_TERAPAN } from "./k1b6C-luar-1";
import { ADEGAN_LUAR_KELUARGA, ADEGAN_LUAR_KELUARGA_TERAPAN, ADEGAN_LUAR_LEWAT, ADEGAN_LUAR_LEWAT_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k1b6C-luar-2";

/**
 * Kelas 1 Bab 6 Sub-Bab C (pengurangan sampai dua puluh), akhir cerita Pasar Malam Kampung.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Tutup Pasar Malam" (Igil, Kaka, Abang, Mamah, Pak RT).
 * Video kedua: tiga metode global, terpisah.
 */
export const JUDUL_K1B6C = "Tutup Pasar Malam";

export const VIDEO_MATERI_K1B6C: VideoStory = {
  id: "k1b6C-materi",
  judul: JUDUL_K1B6C,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "pengurangan sampai dua puluh", daftar: ["Menghitung mundur", "Mengurangi satuan dulu", "Memeriksa dengan menambah"] }),
    ADEGAN_LONCENG,
    ADEGAN_LUPA,
    ADEGAN_MUNDUR,
    ADEGAN_BALON,
    ADEGAN_PERIKSA,
    ADEGAN_PILIH,
    ADEGAN_PERAYAAN,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B6C: VideoStory = {
  id: "k1b6C-luar",
  judul: JUDUL_K1B6C,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "pengurangan sampai dua puluh", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_PIKIR,
    ADEGAN_LUAR_PIKIR_TERAPAN,
    ADEGAN_LUAR_KELUARGA,
    ADEGAN_LUAR_KELUARGA_TERAPAN,
    ADEGAN_LUAR_LEWAT,
    ADEGAN_LUAR_LEWAT_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
