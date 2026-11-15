import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_SEDOTAN } from "./k5b7a-materi-1";
import { ADEGAN_LANCIP, ADEGAN_SIKU_TUMPUL, ADEGAN_SYARAT } from "./k5b7a-materi-2";
import { ADEGAN_BANDING, ADEGAN_JUMLAH, ADEGAN_SAMA_KAKI, ADEGAN_SAMA_SISI, ADEGAN_UJI } from "./k5b7a-materi-3";
import { ADEGAN_LUAR_JUMLAH, ADEGAN_LUAR_JUMLAH_TERAPAN, ADEGAN_LUAR_KETAKSAMAAN, ADEGAN_LUAR_KETAKSAMAAN_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k5b7a-luar-1";
import { ADEGAN_LUAR_HIERARKI, ADEGAN_LUAR_HIERARKI_TERAPAN, ADEGAN_LUAR_KLASIFIKASI, ADEGAN_LUAR_KLASIFIKASI_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b7a-luar-2";

/**
 * Kelas 5 Bab 7 Sub-Bab A (ciri-ciri segitiga): video materi kurikulum dan video metode luar, dua video terpisah.
 * Adegan administratif (pembuka bab dengan Candi Sewu, denah, peta konsep, dan kata kunci) tetap ada di berkas materi, tetapi tidak diputar.
 */
export const VIDEO_MATERI_K5B7A: VideoStory = {
  id: "k5b7a-materi",
  judul: "Membandingkan Ciri-Ciri Segitiga",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "ciri-ciri segitiga", daftar: ["Syarat tiga sedotan", "Jumlah sudut segitiga", "Sama kaki dan sama sisi"] }),
    ADEGAN_SEDOTAN,
    ADEGAN_SYARAT,
    ADEGAN_LANCIP,
    ADEGAN_SIKU_TUMPUL,
    ADEGAN_JUMLAH,
    ADEGAN_SAMA_KAKI,
    ADEGAN_SAMA_SISI,
    ADEGAN_BANDING,
    ADEGAN_UJI,
  ],
};

export const VIDEO_LUAR_K5B7A: VideoStory = {
  id: "k5b7a-luar",
  judul: "Ciri-Ciri Segitiga: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "ciri-ciri segitiga" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_KETAKSAMAAN,
    ADEGAN_LUAR_KETAKSAMAAN_TERAPAN,
    ADEGAN_LUAR_JUMLAH,
    ADEGAN_LUAR_JUMLAH_TERAPAN,
    ADEGAN_LUAR_KLASIFIKASI,
    ADEGAN_LUAR_KLASIFIKASI_TERAPAN,
    ADEGAN_LUAR_HIERARKI,
    ADEGAN_LUAR_HIERARKI_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
