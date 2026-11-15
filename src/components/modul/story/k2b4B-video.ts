import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_POLA_ARTI, ADEGAN_POLA_SATUAN, ADEGAN_SATUAN_TIGA } from "./k2b4B-materi-1";
import { ADEGAN_POLA_BENTUK, ADEGAN_POLA_GERAKAN, ADEGAN_POLA_SUARA, ADEGAN_POLA_WARNA } from "./k2b4B-materi-2";
import { ADEGAN_BUKAN_ACAK, ADEGAN_BUKAN_SAMA, ADEGAN_KODE_ABC, ADEGAN_KODE_HURUF } from "./k2b4B-materi-3";
import { ADEGAN_ISI_HILANG, ADEGAN_LANJUT_CONTOH, ADEGAN_LANJUT_WARNA, ADEGAN_RANCANG_POLA } from "./k2b4B-materi-4";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_EMPAT, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP, ADEGAN_POLA_TABEL } from "./k2b4B-materi-5";
import { ADEGAN_LUAR_BERULANG, ADEGAN_LUAR_BERULANG_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k2b4B-luar-1";
import { ADEGAN_LUAR_AB, ADEGAN_LUAR_AB_TERAPAN, ADEGAN_LUAR_BUAT, ADEGAN_LUAR_BUAT_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k2b4B-luar-2";

/** Kelas 2 Bab 4 Sub-Bab B (Pola): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K2B4B: VideoStory = {
  id: "k2b4B-materi",
  judul: "Mengenal Pola",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "pola", daftar: ["Pola dan satuan pola", "Melanjutkan dan mengisi pola", "Merancang pola sendiri"] }),
    ADEGAN_POLA_ARTI,
    ADEGAN_POLA_SATUAN,
    ADEGAN_SATUAN_TIGA,
    ADEGAN_POLA_BENTUK,
    ADEGAN_POLA_WARNA,
    ADEGAN_POLA_GERAKAN,
    ADEGAN_POLA_SUARA,
    ADEGAN_KODE_HURUF,
    ADEGAN_KODE_ABC,
    ADEGAN_BUKAN_SAMA,
    ADEGAN_BUKAN_ACAK,
    ADEGAN_LANJUT_CONTOH,
    ADEGAN_LANJUT_WARNA,
    ADEGAN_ISI_HILANG,
    ADEGAN_RANCANG_POLA,
    ADEGAN_POLA_TABEL,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_LATIHAN_EMPAT,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B4B: VideoStory = {
  id: "k2b4B-luar",
  judul: "Mengenal Pola: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "pola" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BERULANG,
    ADEGAN_LUAR_BERULANG_TERAPAN,
    ADEGAN_LUAR_AB,
    ADEGAN_LUAR_AB_TERAPAN,
    ADEGAN_LUAR_BUAT,
    ADEGAN_LUAR_BUAT_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
