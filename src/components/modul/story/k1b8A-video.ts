import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BERANTAKAN, ADEGAN_HITUNG, ADEGAN_RAPI } from "./k1b8A-materi-1";
import { ADEGAN_BOLA, ADEGAN_DAFTAR, ADEGAN_TURUS_LAIN, ADEGAN_TURUS_MERAH } from "./k1b8A-materi-2";
import { ADEGAN_HEWAN_PILIHAN, ADEGAN_HEWAN_TABEL, ADEGAN_TABEL_MENDATAR, ADEGAN_TABEL_MENURUN } from "./k1b8A-materi-3";
import { ADEGAN_JUMLAH, ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP, ADEGAN_SAMA_BANYAK, ADEGAN_SELISIH } from "./k1b8A-materi-4";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_TURUS, ADEGAN_LUAR_TURUS_TERAPAN } from "./k1b8A-luar-1";
import { ADEGAN_LUAR_BANDING, ADEGAN_LUAR_BANDING_TERAPAN, ADEGAN_LUAR_DIAGRAM, ADEGAN_LUAR_DIAGRAM_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k1b8A-luar-2";

/** Kelas 1 Bab 8 Sub-Bab A (Mengelompokkan Data): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K1B8A: VideoStory = {
  id: "k1b8A-materi",
  judul: "Mengelompokkan Data",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "mengelompokkan data", daftar: ["Mengelompokkan benda", "Turus dan tabel data", "Membandingkan data"] }),
    ADEGAN_BERANTAKAN,
    ADEGAN_RAPI,
    ADEGAN_HITUNG,
    ADEGAN_DAFTAR,
    ADEGAN_BOLA,
    ADEGAN_TURUS_MERAH,
    ADEGAN_TURUS_LAIN,
    ADEGAN_TABEL_MENURUN,
    ADEGAN_TABEL_MENDATAR,
    ADEGAN_HEWAN_PILIHAN,
    ADEGAN_HEWAN_TABEL,
    ADEGAN_SAMA_BANYAK,
    ADEGAN_SELISIH,
    ADEGAN_JUMLAH,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B8A: VideoStory = {
  id: "k1b8A-luar",
  judul: "Mengelompokkan Data: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "mengelompokkan data" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_TURUS,
    ADEGAN_LUAR_TURUS_TERAPAN,
    ADEGAN_LUAR_DIAGRAM,
    ADEGAN_LUAR_DIAGRAM_TERAPAN,
    ADEGAN_LUAR_BANDING,
    ADEGAN_LUAR_BANDING_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
