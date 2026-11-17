import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_DUA_SEGITIGA, ADEGAN_FESTIVAL_BESOK, ADEGAN_SUSUN_KERETA } from "./k1b4c-materi-1";
import { ADEGAN_SUSUN_RUMAH, ADEGAN_URAI_RODA } from "./k1b4c-materi-2";
import { ADEGAN_FESTIVAL, ADEGAN_HASIL, ADEGAN_PENUTUP } from "./k1b4c-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_TANGRAM, ADEGAN_LUAR_TANGRAM_TERAPAN } from "./k1b4c-luar-1";
import { ADEGAN_LUAR_BALOK, ADEGAN_LUAR_BALOK_TERAPAN, ADEGAN_LUAR_LIDI, ADEGAN_LUAR_LIDI_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k1b4c-luar-2";

/**
 * Kelas 1 Bab 4 Sub-Bab C (menyusun dan mengurai bentuk bangun), akhir cerita Festival Mainan Kardus.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Mainan untuk Festival" (Igil, Kaka, Abang, Mamah, juri).
 * Video kedua: tiga metode global, terpisah.
 */
export const JUDUL_K1B4C = "Mainan untuk Festival";

export const VIDEO_MATERI_K1B4C: VideoStory = {
  id: "k1b4c-materi",
  judul: JUDUL_K1B4C,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "menyusun dan mengurai bentuk", daftar: ["Menyusun bentuk", "Mengurai bentuk", "Menghitung bagian"] }),
    ADEGAN_FESTIVAL_BESOK,
    ADEGAN_DUA_SEGITIGA,
    ADEGAN_SUSUN_KERETA,
    ADEGAN_SUSUN_RUMAH,
    ADEGAN_URAI_RODA,
    ADEGAN_FESTIVAL,
    ADEGAN_HASIL,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B4C: VideoStory = {
  id: "k1b4c-luar",
  judul: JUDUL_K1B4C,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "menyusun dan mengurai bentuk", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_TANGRAM,
    ADEGAN_LUAR_TANGRAM_TERAPAN,
    ADEGAN_LUAR_BALOK,
    ADEGAN_LUAR_BALOK_TERAPAN,
    ADEGAN_LUAR_LIDI,
    ADEGAN_LUAR_LIDI_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
