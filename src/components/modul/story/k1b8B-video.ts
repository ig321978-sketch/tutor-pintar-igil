import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BAGIAN, ADEGAN_BACA_TEGAK, ADEGAN_SATU_GAMBAR, ADEGAN_TEGAK, ADEGAN_TERCAMPUR } from "./k1b8B-materi-1";
import { ADEGAN_MENDATAR, ADEGAN_TABEL_KE_DIAGRAM, ADEGAN_TABEL_MENDATAR, ADEGAN_TABEL_MENURUN, ADEGAN_TURUS } from "./k1b8B-materi-2";
import { ADEGAN_DIAGRAM_HEWAN, ADEGAN_JUMLAH, ADEGAN_LEBIH, ADEGAN_PALING, ADEGAN_PILIHAN, ADEGAN_SAMA } from "./k1b8B-materi-3";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP } from "./k1b8B-materi-4";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_TURUS, ADEGAN_LUAR_TURUS_TERAPAN } from "./k1b8B-luar-1";
import { ADEGAN_LUAR_BANDING, ADEGAN_LUAR_BANDING_TERAPAN, ADEGAN_LUAR_DIAGRAM, ADEGAN_LUAR_DIAGRAM_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k1b8B-luar-2";

/** Kelas 1 Bab 8 Sub-Bab B (Diagram Gambar): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K1B8B: VideoStory = {
  id: "k1b8B-materi",
  judul: "Diagram Gambar",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "diagram gambar", daftar: ["Membaca diagram gambar", "Membuat tabel dan diagram", "Membandingkan data diagram"] }),
    ADEGAN_TERCAMPUR,
    ADEGAN_SATU_GAMBAR,
    ADEGAN_TEGAK,
    ADEGAN_BAGIAN,
    ADEGAN_BACA_TEGAK,
    ADEGAN_MENDATAR,
    ADEGAN_TURUS,
    ADEGAN_TABEL_MENURUN,
    ADEGAN_TABEL_MENDATAR,
    ADEGAN_TABEL_KE_DIAGRAM,
    ADEGAN_PALING,
    ADEGAN_LEBIH,
    ADEGAN_SAMA,
    ADEGAN_JUMLAH,
    ADEGAN_PILIHAN,
    ADEGAN_DIAGRAM_HEWAN,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K1B8B: VideoStory = {
  id: "k1b8B-luar",
  judul: "Diagram Gambar: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "diagram gambar" }),
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
