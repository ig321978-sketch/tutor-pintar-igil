import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_MASALAH } from "./k5b3b-materi-1";
import { ADEGAN_MARTABAK, ADEGAN_PENGHAPUS, ADEGAN_PITA_KOMANG, ADEGAN_PITA_LUKAS } from "./k5b3b-materi-2";
import { ADEGAN_DENAH, ADEGAN_KOMANG_YOHANA, ADEGAN_NISA, ADEGAN_PENUTUP } from "./k5b3b-materi-3";
import { ADEGAN_LUAR_KPK, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_SAMA, ADEGAN_LUAR_SAMA_TERAPAN } from "./k5b3b-luar-1";
import { ADEGAN_LUAR_AREA, ADEGAN_LUAR_AREA_TERAPAN, ADEGAN_LUAR_GARIS, ADEGAN_LUAR_GARIS_TERAPAN, ADEGAN_LUAR_KPK_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b3b-luar-2";

/** Kelas 5 Bab 3 Sub-Bab B (penjumlahan bilangan pecahan): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B3B: VideoStory = {
  id: "k5b3b-materi",
  judul: "Penjumlahan Pecahan",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "menjumlahkan pecahan", daftar: ["Penyebut yang sama", "Penyebut yang berbeda", "Pecahan campuran"] }),
    ADEGAN_MASALAH,
    ADEGAN_MARTABAK,
    ADEGAN_PENGHAPUS,
    ADEGAN_PITA_LUKAS,
    ADEGAN_PITA_KOMANG,
    ADEGAN_NISA,
    ADEGAN_KOMANG_YOHANA,
    ADEGAN_DENAH,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K5B3B: VideoStory = {
  id: "k5b3b-luar",
  judul: "Penjumlahan Pecahan: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "menjumlahkan pecahan" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_SAMA,
    ADEGAN_LUAR_SAMA_TERAPAN,
    ADEGAN_LUAR_KPK,
    ADEGAN_LUAR_KPK_TERAPAN,
    ADEGAN_LUAR_AREA,
    ADEGAN_LUAR_AREA_TERAPAN,
    ADEGAN_LUAR_GARIS,
    ADEGAN_LUAR_GARIS_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
