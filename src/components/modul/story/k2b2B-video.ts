import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_ARTI_KURANG, ADEGAN_PASANGKAN, ADEGAN_SELISIH } from "./k2b2B-materi-1";
import { ADEGAN_MUNDUR_BESAR, ADEGAN_MUNDUR_KECIL, ADEGAN_PAPAN_AMBIL, ADEGAN_TABEL_KURANG } from "./k2b2B-materi-2";
import { ADEGAN_KAPAN_URAI, ADEGAN_PASANGAN, ADEGAN_TIDAK_CUKUP, ADEGAN_URAI_PAPAN, ADEGAN_URAI_TABEL } from "./k2b2B-materi-3";
import { ADEGAN_KELUARGA, ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_EMPAT, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP, ADEGAN_PERIKSA } from "./k2b2B-materi-4";
import { ADEGAN_LUAR_NAIK, ADEGAN_LUAR_NAIK_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k2b2B-luar-1";
import { ADEGAN_LUAR_AMBIL, ADEGAN_LUAR_AMBIL_TERAPAN, ADEGAN_LUAR_PINJAM, ADEGAN_LUAR_PINJAM_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k2b2B-luar-2";

/** Kelas 2 Bab 2 Sub-Bab B (Berbagai Cara Melakukan Pengurangan): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K2B2B: VideoStory = {
  id: "k2b2B-materi",
  judul: "Berbagai Cara Mengurangi",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "berbagai cara mengurangi", daftar: ["Mencari selisih", "Tiga cara mengurangi", "Memeriksa hasil"] }),
    ADEGAN_SELISIH,
    ADEGAN_PASANGKAN,
    ADEGAN_ARTI_KURANG,
    ADEGAN_MUNDUR_BESAR,
    ADEGAN_MUNDUR_KECIL,
    ADEGAN_PAPAN_AMBIL,
    ADEGAN_TABEL_KURANG,
    ADEGAN_PASANGAN,
    ADEGAN_TIDAK_CUKUP,
    ADEGAN_URAI_PAPAN,
    ADEGAN_URAI_TABEL,
    ADEGAN_KAPAN_URAI,
    ADEGAN_PERIKSA,
    ADEGAN_KELUARGA,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_LATIHAN_EMPAT,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B2B: VideoStory = {
  id: "k2b2B-luar",
  judul: "Berbagai Cara Mengurangi: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "berbagai cara mengurangi" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_NAIK,
    ADEGAN_LUAR_NAIK_TERAPAN,
    ADEGAN_LUAR_AMBIL,
    ADEGAN_LUAR_AMBIL_TERAPAN,
    ADEGAN_LUAR_PINJAM,
    ADEGAN_LUAR_PINJAM_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
