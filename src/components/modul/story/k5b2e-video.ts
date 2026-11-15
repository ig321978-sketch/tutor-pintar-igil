import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_FAKTORISASI, ADEGAN_PRIMA, ADEGAN_SARINGAN } from "./k5b2e-materi-1";
import { ADEGAN_BERULANG, ADEGAN_KPK_FPB_PRIMA, ADEGAN_LATIHAN, ADEGAN_POHON } from "./k5b2e-materi-2";
import { ADEGAN_MISKONSEPSI, ADEGAN_UK_1, ADEGAN_UK_2 } from "./k5b2e-materi-3";
import { ADEGAN_LUAR_FT, ADEGAN_LUAR_FT_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_PER, ADEGAN_LUAR_PER_TERAPAN } from "./k5b2e-luar-1";
import { ADEGAN_LUAR_LGB, ADEGAN_LUAR_LGB_TERAPAN, ADEGAN_LUAR_PV, ADEGAN_LUAR_PV_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b2e-luar-2";

/** Kelas 5 Bab 2 Sub-Bab E (menentukan KPK dan FPB dengan faktor prima), penutup bab: video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B2E: VideoStory = {
  id: "k5b2e-materi",
  judul: "KPK dan FPB dengan Faktor Prima",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "menentukan KPK dan FPB dengan faktor prima", daftar: ["Mengenal bilangan prima", "Faktorisasi dengan pohon", "Menentukan KPK dan FPB"] }),
    ADEGAN_PRIMA,
    ADEGAN_SARINGAN,
    ADEGAN_FAKTORISASI,
    ADEGAN_POHON,
    ADEGAN_KPK_FPB_PRIMA,
    ADEGAN_BERULANG,
    ADEGAN_LATIHAN,
    ADEGAN_MISKONSEPSI,
    ADEGAN_UK_1,
    ADEGAN_UK_2,
  ],
};

export const VIDEO_LUAR_K5B2E: VideoStory = {
  id: "k5b2e-luar",
  judul: "KPK dan FPB dengan Faktor Prima: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "menentukan KPK dan FPB dengan faktor prima" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_FT,
    ADEGAN_LUAR_FT_TERAPAN,
    ADEGAN_LUAR_PER,
    ADEGAN_LUAR_PER_TERAPAN,
    ADEGAN_LUAR_LGB,
    ADEGAN_LUAR_LGB_TERAPAN,
    ADEGAN_LUAR_PV,
    ADEGAN_LUAR_PV_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
