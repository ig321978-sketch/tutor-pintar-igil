import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_ATAS_BAWAH, ADEGAN_CERITA_TAMAN, ADEGAN_DEPAN_BELAKANG, ADEGAN_KANAN_KIRI, ADEGAN_PASANGAN } from "./k2b4A-materi-1";
import { ADEGAN_BARIS_ANAK, ADEGAN_KALIMAT, ADEGAN_MEMBELAKANGI } from "./k2b4A-materi-2";
import { ADEGAN_DIPINDAH, ADEGAN_DUA_PETUNJUK, ADEGAN_PATOKAN, ADEGAN_PETA_KOTAK } from "./k2b4A-materi-3";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP } from "./k2b4A-materi-4";
import { ADEGAN_LUAR_BAHASA, ADEGAN_LUAR_BAHASA_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_RINGKAS } from "./k2b4A-luar-1";
import { ADEGAN_LUAR_ACUAN, ADEGAN_LUAR_ACUAN_TERAPAN, ADEGAN_LUAR_PETA, ADEGAN_LUAR_PETA_TERAPAN } from "./k2b4A-luar-2";

/** Kelas 2 Bab 4 Sub-Bab A (Posisi Benda): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K2B4A: VideoStory = {
  id: "k2b4A-materi",
  judul: "Posisi Benda",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "posisi benda", daftar: ["Enam kata posisi", "Kanan dan kiri pada gambar", "Menebak benda dari petunjuk"] }),
    ADEGAN_CERITA_TAMAN,
    ADEGAN_ATAS_BAWAH,
    ADEGAN_DEPAN_BELAKANG,
    ADEGAN_KANAN_KIRI,
    ADEGAN_PASANGAN,
    ADEGAN_BARIS_ANAK,
    ADEGAN_MEMBELAKANGI,
    ADEGAN_KALIMAT,
    ADEGAN_PETA_KOTAK,
    ADEGAN_PATOKAN,
    ADEGAN_DUA_PETUNJUK,
    ADEGAN_DIPINDAH,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B4A: VideoStory = {
  id: "k2b4A-luar",
  judul: "Posisi Benda: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "posisi benda" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BAHASA,
    ADEGAN_LUAR_BAHASA_TERAPAN,
    ADEGAN_LUAR_PETA,
    ADEGAN_LUAR_PETA_TERAPAN,
    ADEGAN_LUAR_ACUAN,
    ADEGAN_LUAR_ACUAN_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
