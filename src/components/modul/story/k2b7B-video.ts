import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_GARIS, ADEGAN_KURANG, ADEGAN_LEBIH, ADEGAN_MAJU, ADEGAN_MUNDUR } from "./k2b7B-materi-1";
import { ADEGAN_BANDING_GARIS, ADEGAN_BANDING_PULUHAN, ADEGAN_KATA, ADEGAN_PULUHAN_SAMA, ADEGAN_TANDA } from "./k2b7B-materi-2";
import { ADEGAN_KARTU, ADEGAN_KIRA, ADEGAN_TIGA_BILANGAN, ADEGAN_URUT_LIMA, ADEGAN_URUT_TIGA } from "./k2b7B-materi-3";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_EMPAT, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP } from "./k2b7B-materi-4";
import { ADEGAN_LUAR_GARIS, ADEGAN_LUAR_GARIS_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_PULUHAN, ADEGAN_LUAR_PULUHAN_TERAPAN } from "./k2b7B-luar-1";
import { ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TANDA, ADEGAN_LUAR_TANDA_TERAPAN } from "./k2b7B-luar-2";

/** Kelas 2 Bab 7 Sub-Bab B (Membandingkan Bilangan): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K2B7B: VideoStory = {
  id: "k2b7B-materi",
  judul: "Membandingkan Bilangan",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "membandingkan bilangan", daftar: ["Maju dan mundur di garis", "Membandingkan dua bilangan", "Mengurutkan bilangan"] }),
    ADEGAN_GARIS,
    ADEGAN_MAJU,
    ADEGAN_MUNDUR,
    ADEGAN_LEBIH,
    ADEGAN_KURANG,
    ADEGAN_BANDING_PULUHAN,
    ADEGAN_PULUHAN_SAMA,
    ADEGAN_KATA,
    ADEGAN_TANDA,
    ADEGAN_BANDING_GARIS,
    ADEGAN_TIGA_BILANGAN,
    ADEGAN_URUT_TIGA,
    ADEGAN_URUT_LIMA,
    ADEGAN_KARTU,
    ADEGAN_KIRA,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_LATIHAN_EMPAT,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B7B: VideoStory = {
  id: "k2b7B-luar",
  judul: "Membandingkan Bilangan: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "membandingkan bilangan" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_PULUHAN,
    ADEGAN_LUAR_PULUHAN_TERAPAN,
    ADEGAN_LUAR_GARIS,
    ADEGAN_LUAR_GARIS_TERAPAN,
    ADEGAN_LUAR_TANDA,
    ADEGAN_LUAR_TANDA_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
