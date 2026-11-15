import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BERSERAKAN, ADEGAN_SATU_PULUHAN, ADEGAN_TABEL } from "./k2b1B-materi-1";
import { ADEGAN_BACA, ADEGAN_DUA_PULUH_DELAPAN, ADEGAN_HITUNG_SEPULUH, ADEGAN_NILAI_LETAK } from "./k2b1B-materi-2";
import { ADEGAN_CARA_DUA, ADEGAN_CARA_RINGKAS, ADEGAN_CARA_SATU, ADEGAN_PALING_RINGKAS, ADEGAN_TUKAR } from "./k2b1B-materi-3";
import { ADEGAN_LUAR_DIENES, ADEGAN_LUAR_DIENES_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k2b1B-luar-1";
import { ADEGAN_LUAR_GARIS, ADEGAN_LUAR_GARIS_TERAPAN, ADEGAN_LUAR_KARTU, ADEGAN_LUAR_KARTU_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k2b1B-luar-2";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP } from "./k2b1B-materi-4";

/** Kelas 2 Bab 1 Sub-Bab B (Nilai Tempat): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K2B1B: VideoStory = {
  id: "k2b1B-materi",
  judul: "Nilai Tempat",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "nilai tempat", daftar: ["Puluhan dan satuan", "Tabel nilai tempat", "Menukar satuan dan puluhan"] }),
    ADEGAN_BERSERAKAN,
    ADEGAN_SATU_PULUHAN,
    ADEGAN_TABEL,
    ADEGAN_DUA_PULUH_DELAPAN,
    ADEGAN_HITUNG_SEPULUH,
    ADEGAN_NILAI_LETAK,
    ADEGAN_BACA,
    ADEGAN_CARA_SATU,
    ADEGAN_CARA_DUA,
    ADEGAN_CARA_RINGKAS,
    ADEGAN_TUKAR,
    ADEGAN_PALING_RINGKAS,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B1B: VideoStory = {
  id: "k2b1B-luar",
  judul: "Nilai Tempat: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "nilai tempat" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_DIENES,
    ADEGAN_LUAR_DIENES_TERAPAN,
    ADEGAN_LUAR_KARTU,
    ADEGAN_LUAR_KARTU_TERAPAN,
    ADEGAN_LUAR_GARIS,
    ADEGAN_LUAR_GARIS_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
