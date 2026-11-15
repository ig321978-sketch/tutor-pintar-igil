import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BAGIAN_JAM, ADEGAN_EMPAT_BAGIAN, ADEGAN_JAM_DIGITAL, ADEGAN_PUKUL_TEPAT, ADEGAN_TIGA_JAM } from "./k2b6B-materi-1";
import { ADEGAN_BAGIAN_DIGITAL, ADEGAN_MALAM, ADEGAN_PAGI, ADEGAN_SIANG_SORE } from "./k2b6B-materi-2";
import { ADEGAN_JADWAL, ADEGAN_LAMA_DUA_JAM, ADEGAN_LAMA_JAM, ADEGAN_URUT_KEGIATAN } from "./k2b6B-materi-3";
import { ADEGAN_BANDING, ADEGAN_LAMA_BANYAK } from "./k2b6B-materi-4";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_EMPAT, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP } from "./k2b6B-materi-5";
import { ADEGAN_LUAR_JAM, ADEGAN_LUAR_JAM_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k2b6B-luar-1";
import { ADEGAN_LUAR_LAMA, ADEGAN_LUAR_LAMA_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_URUTAN, ADEGAN_LUAR_URUTAN_TERAPAN } from "./k2b6B-luar-2";

/** Kelas 2 Bab 6 Sub-Bab B (Waktu): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K2B6B: VideoStory = {
  id: "k2b6B-materi",
  judul: "Waktu dan Kegiatan Sehari",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "waktu", daftar: ["Jam analog dan digital", "Bagian hari dan kegiatan", "Lama dan urutan kegiatan"] }),
    ADEGAN_BAGIAN_JAM,
    ADEGAN_PUKUL_TEPAT,
    ADEGAN_JAM_DIGITAL,
    ADEGAN_TIGA_JAM,
    ADEGAN_EMPAT_BAGIAN,
    ADEGAN_PAGI,
    ADEGAN_SIANG_SORE,
    ADEGAN_MALAM,
    ADEGAN_BAGIAN_DIGITAL,
    ADEGAN_JADWAL,
    ADEGAN_URUT_KEGIATAN,
    ADEGAN_LAMA_JAM,
    ADEGAN_LAMA_DUA_JAM,
    ADEGAN_BANDING,
    ADEGAN_LAMA_BANYAK,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_LATIHAN_EMPAT,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B6B: VideoStory = {
  id: "k2b6B-luar",
  judul: "Waktu dan Kegiatan Sehari: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "waktu" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_JAM,
    ADEGAN_LUAR_JAM_TERAPAN,
    ADEGAN_LUAR_LAMA,
    ADEGAN_LUAR_LAMA_TERAPAN,
    ADEGAN_LUAR_URUTAN,
    ADEGAN_LUAR_URUTAN_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
