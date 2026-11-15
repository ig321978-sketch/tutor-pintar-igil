import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_CERITA_BUAH, ADEGAN_KENAL_TURUS, ADEGAN_PILAH_BUAH } from "./k2b8A-materi-1";
import { ADEGAN_IKAT_LIMA, ADEGAN_PETERNAK, ADEGAN_TURUS_BUAH } from "./k2b8A-materi-2";
import { ADEGAN_BACA_PALING, ADEGAN_LEBIH_KURANG, ADEGAN_TURUS_HEWAN } from "./k2b8A-materi-3";
import { ADEGAN_CATAT_JAWABAN, ADEGAN_JUMLAH, ADEGAN_SAMA_BANYAK, ADEGAN_UBAH_BANYAK } from "./k2b8A-materi-4";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP } from "./k2b8A-materi-5";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TURUS, ADEGAN_LUAR_TURUS_TERAPAN } from "./k2b8A-luar-1";
import { ADEGAN_LUAR_FREKUENSI, ADEGAN_LUAR_FREKUENSI_TERAPAN, ADEGAN_LUAR_PILAH, ADEGAN_LUAR_PILAH_TERAPAN } from "./k2b8A-luar-2";

/** Kelas 2 Bab 8 Sub-Bab A (Diagram Turus): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K2B8A: VideoStory = {
  id: "k2b8A-materi",
  judul: "Diagram Turus",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "diagram turus", daftar: ["Mengelompokkan data", "Membuat diagram turus", "Membaca diagram turus"] }),
    ADEGAN_CERITA_BUAH,
    ADEGAN_PILAH_BUAH,
    ADEGAN_KENAL_TURUS,
    ADEGAN_IKAT_LIMA,
    ADEGAN_TURUS_BUAH,
    ADEGAN_PETERNAK,
    ADEGAN_TURUS_HEWAN,
    ADEGAN_BACA_PALING,
    ADEGAN_LEBIH_KURANG,
    ADEGAN_SAMA_BANYAK,
    ADEGAN_JUMLAH,
    ADEGAN_UBAH_BANYAK,
    ADEGAN_CATAT_JAWABAN,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B8A: VideoStory = {
  id: "k2b8A-luar",
  judul: "Diagram Turus: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "diagram turus" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_TURUS,
    ADEGAN_LUAR_TURUS_TERAPAN,
    ADEGAN_LUAR_FREKUENSI,
    ADEGAN_LUAR_FREKUENSI_TERAPAN,
    ADEGAN_LUAR_PILAH,
    ADEGAN_LUAR_PILAH_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
