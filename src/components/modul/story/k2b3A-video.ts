import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_CERITA_SARANG, ADEGAN_LENGKUNG, ADEGAN_SEGI_BANYAK, ADEGAN_SISI_POJOK } from "./k2b3A-materi-1";
import { ADEGAN_BANDINGKAN_SISI, ADEGAN_BUKAN_SEGI_BANYAK, ADEGAN_HITUNG_SISI, ADEGAN_PILAH_DUA, ADEGAN_POLA_NAMA, ADEGAN_SEGI_LIMA_ENAM } from "./k2b3A-materi-2";
import { ADEGAN_LINGKARAN_PUTAR, ADEGAN_TEMUKAN_BENTUK, ADEGAN_TIGA_PERTANYAAN } from "./k2b3A-materi-3";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP } from "./k2b3A-materi-4";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_VISUAL, ADEGAN_LUAR_VISUAL_TERAPAN } from "./k2b3A-luar-1";
import { ADEGAN_LUAR_PAKU, ADEGAN_LUAR_PAKU_TERAPAN, ADEGAN_LUAR_PILAH, ADEGAN_LUAR_PILAH_TERAPAN } from "./k2b3A-luar-2";

/** Kelas 2 Bab 3 Sub-Bab A (Bangun Datar): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K2B3A: VideoStory = {
  id: "k2b3A-materi",
  judul: "Bangun Datar",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "bangun datar", daftar: ["Segi banyak dan lengkung", "Menghitung sisi lalu menamai", "Lingkaran yang bisa berputar"] }),
    ADEGAN_CERITA_SARANG,
    ADEGAN_SISI_POJOK,
    ADEGAN_SEGI_BANYAK,
    ADEGAN_LENGKUNG,
    ADEGAN_PILAH_DUA,
    ADEGAN_BUKAN_SEGI_BANYAK,
    ADEGAN_HITUNG_SISI,
    ADEGAN_SEGI_LIMA_ENAM,
    ADEGAN_BANDINGKAN_SISI,
    ADEGAN_POLA_NAMA,
    ADEGAN_LINGKARAN_PUTAR,
    ADEGAN_TEMUKAN_BENTUK,
    ADEGAN_TIGA_PERTANYAAN,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B3A: VideoStory = {
  id: "k2b3A-luar",
  judul: "Bangun Datar: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "bangun datar" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_VISUAL,
    ADEGAN_LUAR_VISUAL_TERAPAN,
    ADEGAN_LUAR_PILAH,
    ADEGAN_LUAR_PILAH_TERAPAN,
    ADEGAN_LUAR_PAKU,
    ADEGAN_LUAR_PAKU_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
