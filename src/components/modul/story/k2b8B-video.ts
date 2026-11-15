import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BACA_BARIS, ADEGAN_BAGIAN, ADEGAN_BUAH_CAMPUR, ADEGAN_DIAGRAM_BUAH, ADEGAN_SATU_BINTANG } from "./k2b8B-materi-1";
import { ADEGAN_GAMBAR_LAIN, ADEGAN_JUMLAH_BUAH, ADEGAN_LEBIHNYA, ADEGAN_PALING, ADEGAN_SAMA_UKURAN } from "./k2b8B-materi-2";
import { ADEGAN_DATA_KUE, ADEGAN_DIAGRAM_BUNGA, ADEGAN_DIAGRAM_KUE, ADEGAN_SAMA_BANYAK, ADEGAN_TURUS_KE_GAMBAR } from "./k2b8B-materi-3";
import { ADEGAN_BERLARI, ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PARSEL, ADEGAN_PENUTUP, ADEGAN_PERMAINAN } from "./k2b8B-materi-4";
import { ADEGAN_LUAR_GAMBAR, ADEGAN_LUAR_GAMBAR_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k2b8B-luar-1";
import { ADEGAN_LUAR_BANDING, ADEGAN_LUAR_BANDING_TERAPAN, ADEGAN_LUAR_KUNCI, ADEGAN_LUAR_KUNCI_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k2b8B-luar-2";

/** Kelas 2 Bab 8 Sub-Bab B (Diagram Gambar): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K2B8B: VideoStory = {
  id: "k2b8B-materi",
  judul: "Diagram Gambar",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "diagram gambar", daftar: ["Membaca diagram gambar", "Membandingkan data diagram", "Membuat diagram gambar"] }),
    ADEGAN_BUAH_CAMPUR,
    ADEGAN_SATU_BINTANG,
    ADEGAN_DIAGRAM_BUAH,
    ADEGAN_BAGIAN,
    ADEGAN_BACA_BARIS,
    ADEGAN_GAMBAR_LAIN,
    ADEGAN_SAMA_UKURAN,
    ADEGAN_PALING,
    ADEGAN_LEBIHNYA,
    ADEGAN_JUMLAH_BUAH,
    ADEGAN_DIAGRAM_BUNGA,
    ADEGAN_SAMA_BANYAK,
    ADEGAN_TURUS_KE_GAMBAR,
    ADEGAN_DATA_KUE,
    ADEGAN_DIAGRAM_KUE,
    ADEGAN_PERMAINAN,
    ADEGAN_BERLARI,
    ADEGAN_PARSEL,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B8B: VideoStory = {
  id: "k2b8B-luar",
  judul: "Diagram Gambar: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "diagram gambar" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_GAMBAR,
    ADEGAN_LUAR_GAMBAR_TERAPAN,
    ADEGAN_LUAR_KUNCI,
    ADEGAN_LUAR_KUNCI_TERAPAN,
    ADEGAN_LUAR_BANDING,
    ADEGAN_LUAR_BANDING_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
