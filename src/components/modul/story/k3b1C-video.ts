import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BANDING_RATUSAN, ADEGAN_CERITA_JARAK, ADEGAN_PAPAN_NILAI } from "./k3b1C-materi-1";
import { ADEGAN_BANDING_PULUHAN, ADEGAN_BANDING_SATUAN, ADEGAN_SAMA_DENGAN, ADEGAN_TIGA_TANDA } from "./k3b1C-materi-2";
import { ADEGAN_BANDING_NOL, ADEGAN_TIGA_BILANGAN, ADEGAN_TIGA_LANGKAH } from "./k3b1C-materi-3";
import { ADEGAN_URUT_TIGA, ADEGAN_URUT_TURUN } from "./k3b1C-materi-4";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP } from "./k3b1C-materi-5";
import { ADEGAN_LUAR_BANDING, ADEGAN_LUAR_BANDING_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k3b1C-luar-1";
import { ADEGAN_LUAR_GARIS, ADEGAN_LUAR_GARIS_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_URUT, ADEGAN_LUAR_URUT_TERAPAN } from "./k3b1C-luar-2";

/** Kelas 3 Bab 1 Sub-Bab C (Membandingkan dan Mengurutkan): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K3B1C: VideoStory = {
  id: "k3b1C-materi",
  judul: "Membandingkan dan Mengurutkan Bilangan",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "membandingkan dan mengurutkan bilangan", daftar: ["Membandingkan dua bilangan", "Memakai tanda perbandingan", "Mengurutkan bilangan"] }),
    ADEGAN_CERITA_JARAK,
    ADEGAN_PAPAN_NILAI,
    ADEGAN_BANDING_RATUSAN,
    ADEGAN_TIGA_TANDA,
    ADEGAN_BANDING_PULUHAN,
    ADEGAN_BANDING_SATUAN,
    ADEGAN_SAMA_DENGAN,
    ADEGAN_TIGA_LANGKAH,
    ADEGAN_BANDING_NOL,
    ADEGAN_TIGA_BILANGAN,
    ADEGAN_URUT_TIGA,
    ADEGAN_URUT_TURUN,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K3B1C: VideoStory = {
  id: "k3b1C-luar",
  judul: "Membandingkan dan Mengurutkan Bilangan: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "membandingkan dan mengurutkan bilangan" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BANDING,
    ADEGAN_LUAR_BANDING_TERAPAN,
    ADEGAN_LUAR_GARIS,
    ADEGAN_LUAR_GARIS_TERAPAN,
    ADEGAN_LUAR_URUT,
    ADEGAN_LUAR_URUT_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
