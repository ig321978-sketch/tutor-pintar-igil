import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BAGIAN_BUSUR, ADEGAN_CARA_UKUR, ADEGAN_KIPAS_SUDUT } from "./k5b6c-materi-1";
import { ADEGAN_EKS_KIPAS, ADEGAN_MISKONSEPSI, ADEGAN_SALAH_BACA, ADEGAN_SIKU_JODOH } from "./k5b6c-materi-2";
import { ADEGAN_BERLATIH_1, ADEGAN_BERLATIH_2, ADEGAN_JENIS_LAIN, ADEGAN_REFLEKSI_C, ADEGAN_TANTANGAN } from "./k5b6c-materi-3";
import { ADEGAN_LUAR_PATOKAN, ADEGAN_LUAR_PATOKAN_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_PROTOKOL, ADEGAN_LUAR_PROTOKOL_TERAPAN } from "./k5b6c-luar-1";
import { ADEGAN_LUAR_DERAJAT, ADEGAN_LUAR_DERAJAT_TERAPAN, ADEGAN_LUAR_MUKA_JAM, ADEGAN_LUAR_MUKA_JAM_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b6c-luar-2";

/**
 * Kelas 5 Bab 6 Sub-Bab C (mengukur dan membandingkan sudut): video materi kurikulum dan video metode luar, dua video terpisah.
 * Adegan pembuka sub-bab (ADEGAN_PEMBUKA_C: tujuan, apersepsi, tari pakarena) bersifat administratif: tetap ada di berkas materi, tidak diputar.
 */
export const VIDEO_MATERI_K5B6C: VideoStory = {
  id: "k5b6c-materi",
  judul: "Mengukur dan Membandingkan Sudut",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "mengukur dan membandingkan sudut", daftar: ["Mengenal satuan derajat", "Memakai busur derajat", "Membandingkan besar sudut"] }),
    ADEGAN_KIPAS_SUDUT,
    ADEGAN_BAGIAN_BUSUR,
    ADEGAN_CARA_UKUR,
    ADEGAN_SALAH_BACA,
    ADEGAN_EKS_KIPAS,
    ADEGAN_SIKU_JODOH,
    ADEGAN_MISKONSEPSI,
    ADEGAN_JENIS_LAIN,
    ADEGAN_TANTANGAN,
    ADEGAN_BERLATIH_1,
    ADEGAN_BERLATIH_2,
    ADEGAN_REFLEKSI_C,
  ],
};

export const VIDEO_LUAR_K5B6C: VideoStory = {
  id: "k5b6c-luar",
  judul: "Mengukur Sudut: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "mengukur dan membandingkan sudut" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_PROTOKOL,
    ADEGAN_LUAR_PROTOKOL_TERAPAN,
    ADEGAN_LUAR_PATOKAN,
    ADEGAN_LUAR_PATOKAN_TERAPAN,
    ADEGAN_LUAR_DERAJAT,
    ADEGAN_LUAR_DERAJAT_TERAPAN,
    ADEGAN_LUAR_MUKA_JAM,
    ADEGAN_LUAR_MUKA_JAM_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
