import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_SEPERLIMA, ADEGAN_TIMBANGAN } from "./k6b1c-materi-1";
import { ADEGAN_JARAK, ADEGAN_NILAI_TEMPAT, ADEGAN_URUT } from "./k6b1c-materi-2";
import { ADEGAN_LATIHAN13A, ADEGAN_LATIHAN13B, ADEGAN_PENGAYAAN, ADEGAN_UJI } from "./k6b1c-materi-3";
import { ADEGAN_LUAR_C_PEMBUKA, ADEGAN_LUAR_C_SENILAI, ADEGAN_LUAR_C_SENILAI_TERAPAN } from "./k6b1c-luar-1";
import { ADEGAN_LUAR_C_KISI, ADEGAN_LUAR_C_KISI_TERAPAN, ADEGAN_LUAR_C_RINGKAS, ADEGAN_LUAR_C_TEMPAT, ADEGAN_LUAR_C_TEMPAT_TERAPAN, ADEGAN_LUAR_C_URUT, ADEGAN_LUAR_C_URUT_TERAPAN } from "./k6b1c-luar-2";

/**
 * Kelas 6 Bab 1 Sub-Bab C (Bilangan Desimal): video materi kurikulum dan video metode luar, dua video terpisah.
 * Adegan administratif (mengingat kembali) tetap ada di berkas materi, tetapi tidak diputar.
 */
export const VIDEO_MATERI_K6B1C: VideoStory = {
  id: "k6b1c-materi",
  judul: "Bilangan Desimal",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "bilangan desimal", daftar: ["Pecahan menjadi desimal", "Nilai tempat desimal", "Mengurutkan desimal"] }),
    ADEGAN_TIMBANGAN,
    ADEGAN_SEPERLIMA,
    ADEGAN_JARAK,
    ADEGAN_URUT,
    ADEGAN_NILAI_TEMPAT,
    ADEGAN_LATIHAN13A,
    ADEGAN_LATIHAN13B,
    ADEGAN_UJI,
    ADEGAN_PENGAYAAN,
  ],
};

export const VIDEO_LUAR_K6B1C: VideoStory = {
  id: "k6b1c-luar",
  judul: "Bilangan Desimal: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "bilangan desimal" }),
    ADEGAN_LUAR_C_PEMBUKA,
    ADEGAN_LUAR_C_SENILAI,
    ADEGAN_LUAR_C_SENILAI_TERAPAN,
    ADEGAN_LUAR_C_KISI,
    ADEGAN_LUAR_C_KISI_TERAPAN,
    ADEGAN_LUAR_C_TEMPAT,
    ADEGAN_LUAR_C_TEMPAT_TERAPAN,
    ADEGAN_LUAR_C_URUT,
    ADEGAN_LUAR_C_URUT_TERAPAN,
    ADEGAN_LUAR_C_RINGKAS,
  ],
};
