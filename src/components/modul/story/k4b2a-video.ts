import type { VideoStory } from "./logika-story";
import { ADEGAN_AKTIVITAS_SATU } from "./k4b2a-materi-1";
import { ADEGAN_AMATI_PIZZA, ADEGAN_BANDING_BESAR, ADEGAN_BERLATIH_BENTUK, ADEGAN_PEMBILANG } from "./k4b2a-materi-2";
import { ADEGAN_BANDING_KECIL, ADEGAN_BERLATIH_BANDING_DUA, ADEGAN_BERLATIH_BANDING_SATU, ADEGAN_DIFERENSIASI } from "./k4b2a-materi-3";
import { ADEGAN_LUAR_DAERAH, ADEGAN_LUAR_DAERAH_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_SATUAN, ADEGAN_LUAR_SATUAN_TERAPAN } from "./k4b2a-luar-1";
import { ADEGAN_LUAR_BAGI, ADEGAN_LUAR_BAGI_TERAPAN, ADEGAN_LUAR_GARIS, ADEGAN_LUAR_GARIS_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k4b2a-luar-2";

/** Kelas 4 Bab 2 Sub-Bab A (Pecahan dengan Pembilang Satu), termasuk pembuka bab: video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K4B2A: VideoStory = {
  id: "k4b2a-materi",
  judul: "Pecahan dengan Pembilang Satu",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    ADEGAN_AKTIVITAS_SATU,
    ADEGAN_AMATI_PIZZA,
    ADEGAN_PEMBILANG,
    ADEGAN_BERLATIH_BENTUK,
    ADEGAN_BANDING_BESAR,
    ADEGAN_BANDING_KECIL,
    ADEGAN_BERLATIH_BANDING_SATU,
    ADEGAN_BERLATIH_BANDING_DUA,
    ADEGAN_DIFERENSIASI,
  ],
};

export const VIDEO_LUAR_K4B2A: VideoStory = {
  id: "k4b2a-luar",
  judul: "Membandingkan Pecahan Pembilang Satu: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_SATUAN,
    ADEGAN_LUAR_SATUAN_TERAPAN,
    ADEGAN_LUAR_DAERAH,
    ADEGAN_LUAR_DAERAH_TERAPAN,
    ADEGAN_LUAR_GARIS,
    ADEGAN_LUAR_GARIS_TERAPAN,
    ADEGAN_LUAR_BAGI,
    ADEGAN_LUAR_BAGI_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
