import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_CERITA_MARTABAK, ADEGAN_EMPAT_SAMA, ADEGAN_TIDAK_SAMA, ADEGAN_TIGA_BAGIAN, ADEGAN_TIGA_PERIKSA } from "./k2b5C-materi-1";
import { ADEGAN_BANYAK_CARA, ADEGAN_DUA_KALI, ADEGAN_DUA_SEPEREMPAT, ADEGAN_SETENGAH_DULU } from "./k2b5C-materi-2";
import { ADEGAN_EMPAT_SEPEREMPAT, ADEGAN_KARYA, ADEGAN_SEPEREMPAT_BENDA, ADEGAN_SISA_MARTABAK, ADEGAN_TANGGA } from "./k2b5C-materi-3";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP } from "./k2b5C-materi-4";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SEPEREMPAT, ADEGAN_LUAR_SEPEREMPAT_TERAPAN } from "./k2b5C-luar-1";
import { ADEGAN_LUAR_LIPAT, ADEGAN_LUAR_LIPAT_TERAPAN, ADEGAN_LUAR_SETENGAH, ADEGAN_LUAR_SETENGAH_TERAPAN } from "./k2b5C-luar-2";

/** Kelas 2 Bab 5 Sub-Bab C (Seperempat dari Benda Utuh): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K2B5C: VideoStory = {
  id: "k2b5C-materi",
  judul: "Seperempat dari Benda Utuh",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "seperempat dari benda utuh", daftar: ["Empat bagian sama besar", "Setengah dari setengah", "Utuh, setengah, seperempat"] }),
    ADEGAN_CERITA_MARTABAK,
    ADEGAN_EMPAT_SAMA,
    ADEGAN_TIDAK_SAMA,
    ADEGAN_TIGA_BAGIAN,
    ADEGAN_TIGA_PERIKSA,
    ADEGAN_SETENGAH_DULU,
    ADEGAN_DUA_KALI,
    ADEGAN_BANYAK_CARA,
    ADEGAN_DUA_SEPEREMPAT,
    ADEGAN_EMPAT_SEPEREMPAT,
    ADEGAN_SISA_MARTABAK,
    ADEGAN_TANGGA,
    ADEGAN_SEPEREMPAT_BENDA,
    ADEGAN_KARYA,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B5C: VideoStory = {
  id: "k2b5C-luar",
  judul: "Seperempat dari Benda Utuh: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "seperempat dari benda utuh" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_SEPEREMPAT,
    ADEGAN_LUAR_SEPEREMPAT_TERAPAN,
    ADEGAN_LUAR_SETENGAH,
    ADEGAN_LUAR_SETENGAH_TERAPAN,
    ADEGAN_LUAR_LIPAT,
    ADEGAN_LUAR_LIPAT_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
