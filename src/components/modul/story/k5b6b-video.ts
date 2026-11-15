import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_EKSPLORASI, ADEGAN_LANCIP_TUMPUL, ADEGAN_SALAH_KAPRAH, ADEGAN_SOAL1A } from "./k5b6b-materi-2";
import { ADEGAN_KOTAK_PENSIL, ADEGAN_PENGERTIAN, ADEGAN_YOHANA } from "./k5b6b-materi-1";
import { ADEGAN_REFLEKSI, ADEGAN_SOAL1B, ADEGAN_SOAL2 } from "./k5b6b-materi-3";
import { ADEGAN_LUAR_ARO, ADEGAN_LUAR_ARO_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_VRM, ADEGAN_LUAR_VRM_TERAPAN } from "./k5b6b-luar-1";
import { ADEGAN_LUAR_ORI, ADEGAN_LUAR_ORI_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_ROT, ADEGAN_LUAR_ROT_TERAPAN } from "./k5b6b-luar-2";

/** Kelas 5 Bab 6 Sub-Bab B (pengertian sudut): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B6B: VideoStory = {
  id: "k5b6b-materi",
  judul: "Pengertian Sudut",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "pengertian sudut", daftar: ["Bagian-bagian sudut", "Jenis-jenis sudut", "Sudut pada benda sekitar"] }),
    ADEGAN_KOTAK_PENSIL,
    ADEGAN_PENGERTIAN,
    ADEGAN_YOHANA,
    ADEGAN_EKSPLORASI,
    ADEGAN_LANCIP_TUMPUL,
    ADEGAN_SALAH_KAPRAH,
    ADEGAN_SOAL1A,
    ADEGAN_SOAL1B,
    ADEGAN_SOAL2,
    ADEGAN_REFLEKSI,
  ],
};

export const VIDEO_LUAR_K5B6B: VideoStory = {
  id: "k5b6b-luar",
  judul: "Memahami Sudut: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "pengertian sudut" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_VRM,
    ADEGAN_LUAR_VRM_TERAPAN,
    ADEGAN_LUAR_ARO,
    ADEGAN_LUAR_ARO_TERAPAN,
    ADEGAN_LUAR_ROT,
    ADEGAN_LUAR_ROT_TERAPAN,
    ADEGAN_LUAR_ORI,
    ADEGAN_LUAR_ORI_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
