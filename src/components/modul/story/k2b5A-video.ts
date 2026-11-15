import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_CERITA_MARTABAK, ADEGAN_DUA_BAGIAN, ADEGAN_DUA_UTUH, ADEGAN_TIDAK_SAMA } from "./k2b5A-materi-1";
import { ADEGAN_BENDA_LAYAR, ADEGAN_LINGKARAN, ADEGAN_PERSEGI } from "./k2b5A-materi-2";
import { ADEGAN_GAMBAR_AB, ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_LIPAT_GAGAL, ADEGAN_MARTABAK_ADIL, ADEGAN_UJI_LIPAT } from "./k2b5A-materi-3";
import { ADEGAN_PENUTUP } from "./k2b5A-materi-4";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SETENGAH, ADEGAN_LUAR_SETENGAH_TERAPAN } from "./k2b5A-luar-1";
import { ADEGAN_LUAR_BAGIAN, ADEGAN_LUAR_BAGIAN_TERAPAN, ADEGAN_LUAR_LIPAT, ADEGAN_LUAR_LIPAT_TERAPAN } from "./k2b5A-luar-2";

/** Kelas 2 Bab 5 Sub-Bab A (Setengah dari Benda Utuh): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K2B5A: VideoStory = {
  id: "k2b5A-materi",
  judul: "Setengah dari Benda Utuh",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "setengah dari benda utuh", daftar: ["Dua bagian sama besar", "Setengah pada banyak benda", "Melipat gambar di layar"] }),
    ADEGAN_CERITA_MARTABAK,
    ADEGAN_DUA_BAGIAN,
    ADEGAN_TIDAK_SAMA,
    ADEGAN_DUA_UTUH,
    ADEGAN_BENDA_LAYAR,
    ADEGAN_LINGKARAN,
    ADEGAN_PERSEGI,
    ADEGAN_UJI_LIPAT,
    ADEGAN_LIPAT_GAGAL,
    ADEGAN_GAMBAR_AB,
    ADEGAN_MARTABAK_ADIL,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B5A: VideoStory = {
  id: "k2b5A-luar",
  judul: "Setengah dari Benda Utuh: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "setengah dari benda utuh" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_SETENGAH,
    ADEGAN_LUAR_SETENGAH_TERAPAN,
    ADEGAN_LUAR_BAGIAN,
    ADEGAN_LUAR_BAGIAN_TERAPAN,
    ADEGAN_LUAR_LIPAT,
    ADEGAN_LUAR_LIPAT_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
