import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_JERUK, ADEGAN_KUE, ADEGAN_TIBA } from "./k1b3d-materi-1";
import { ADEGAN_BUAT, ADEGAN_DUA_KALI } from "./k1b3d-materi-2";
import { ADEGAN_KUMPUL, ADEGAN_PENUTUP } from "./k1b3d-materi-3";
import { ADEGAN_LUAR_BATANG, ADEGAN_LUAR_BATANG_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b3d-luar-1";
import { ADEGAN_LUAR_CUBES, ADEGAN_LUAR_CUBES_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SKETSA, ADEGAN_LUAR_SKETSA_TERAPAN } from "./k1b3d-luar-2";

/**
 * Kelas 1 Bab 3 Sub-Bab D (soal cerita pengurangan), akhir cerita Kereta ke Rumah Nenek.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Tiba di Rumah Nenek" (Igil, Kaka, Abang, Mamah, Nenek).
 * Video kedua: tiga metode global, terpisah.
 */
export const JUDUL_K1B3D = "Tiba di Rumah Nenek";

export const VIDEO_MATERI_K1B3D: VideoStory = {
  id: "k1b3d-materi",
  judul: JUDUL_K1B3D,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "cerita hitungan pengurangan", daftar: ["Membaca cerita hitungan", "Mencari bilangan dan kata kunci", "Menjawab dan memeriksa"] }),
    ADEGAN_TIBA,
    ADEGAN_KUE,
    ADEGAN_JERUK,
    ADEGAN_DUA_KALI,
    ADEGAN_BUAT,
    ADEGAN_KUMPUL,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B3D: VideoStory = {
  id: "k1b3d-luar",
  judul: JUDUL_K1B3D,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "cerita hitungan pengurangan", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BATANG,
    ADEGAN_LUAR_BATANG_TERAPAN,
    ADEGAN_LUAR_CUBES,
    ADEGAN_LUAR_CUBES_TERAPAN,
    ADEGAN_LUAR_SKETSA,
    ADEGAN_LUAR_SKETSA_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
