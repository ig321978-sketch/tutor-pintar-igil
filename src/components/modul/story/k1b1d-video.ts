import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BAGIAN, ADEGAN_CERITA, ADEGAN_KUE } from "./k1b1d-materi-1";
import { ADEGAN_BOLA, ADEGAN_ENAM, ADEGAN_IKATAN, ADEGAN_MOBIL, ADEGAN_POHON } from "./k1b1d-materi-2";
import { ADEGAN_BINGKAI, ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_LIMA_TUJUH, ADEGAN_PENUTUP, ADEGAN_SEMBILAN, ADEGAN_SEPULUH } from "./k1b1d-materi-3";
import { ADEGAN_LUAR_GAMBAR, ADEGAN_LUAR_GAMBAR_TERAPAN, ADEGAN_LUAR_KONKRET, ADEGAN_LUAR_KONKRET_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k1b1d-luar-1";
import { ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SIMBOL, ADEGAN_LUAR_SIMBOL_TERAPAN } from "./k1b1d-luar-2";

/** Kelas 1 Bab 1 Sub-Bab D (Pasangan Bilangan): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K1B1D: VideoStory = {
  id: "k1b1d-materi",
  judul: "Pasangan Bilangan",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "memisahkan dan menggabungkan bilangan", daftar: ["Memisahkan satu bilangan", "Menggabungkan dua bagian", "Mencari pasangan bilangan"] }),
    ADEGAN_CERITA,
    ADEGAN_KUE,
    ADEGAN_BAGIAN,
    ADEGAN_BOLA,
    ADEGAN_IKATAN,
    ADEGAN_MOBIL,
    ADEGAN_ENAM,
    ADEGAN_POHON,
    ADEGAN_LIMA_TUJUH,
    ADEGAN_BINGKAI,
    ADEGAN_SEPULUH,
    ADEGAN_SEMBILAN,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B1D: VideoStory = {
  id: "k1b1d-luar",
  judul: "Pasangan Bilangan: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "memisahkan dan menggabungkan bilangan" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_KONKRET,
    ADEGAN_LUAR_KONKRET_TERAPAN,
    ADEGAN_LUAR_GAMBAR,
    ADEGAN_LUAR_GAMBAR_TERAPAN,
    ADEGAN_LUAR_SIMBOL,
    ADEGAN_LUAR_SIMBOL_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
