import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BAKU, ADEGAN_KOLAM, ADEGAN_TIDAK_BAKU } from "./k4b4a-materi-1";
import { ADEGAN_BARIS_KOLOM, ADEGAN_MENYIKAT, ADEGAN_SALAH_TAMBAH } from "./k4b4a-materi-2";
import { ADEGAN_METER_PERSEGI, ADEGAN_PENUTUP, ADEGAN_UBAH } from "./k4b4a-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_TUTUP, ADEGAN_LUAR_TUTUP_TERAPAN } from "./k4b4a-luar-1";
import { ADEGAN_LUAR_BARIS, ADEGAN_LUAR_BARIS_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TANGGA, ADEGAN_LUAR_TANGGA_TERAPAN } from "./k4b4a-luar-2";

/**
 * Kelas 4 Bab 4 Sub-Bab A (pengukuran luas), awal cerita Kolam Renang Tirta Ceria.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Lantai Ubin Bu Sinta" (Satria, Laras, Genta, Pak Hendro, Bu Sinta).
 * Video kedua: tiga metode global (Cover the Floor, Rows and Columns, Unit Square Ladder), terpisah.
 */
export const JUDUL_K4B4A = "Lantai Ubin Bu Sinta";

export const VIDEO_MATERI_K4B4A: VideoStory = {
  id: "k4b4a-materi",
  judul: JUDUL_K4B4A,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "pengukuran luas", daftar: ["Satuan tidak baku", "Sentimeter persegi", "Baris kali kolom"] }),
    ADEGAN_KOLAM,
    ADEGAN_TIDAK_BAKU,
    ADEGAN_BAKU,
    ADEGAN_SALAH_TAMBAH,
    ADEGAN_BARIS_KOLOM,
    ADEGAN_MENYIKAT,
    ADEGAN_METER_PERSEGI,
    ADEGAN_UBAH,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K4B4A: VideoStory = {
  id: "k4b4a-luar",
  judul: JUDUL_K4B4A,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "pengukuran luas", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_TUTUP,
    ADEGAN_LUAR_TUTUP_TERAPAN,
    ADEGAN_LUAR_BARIS,
    ADEGAN_LUAR_BARIS_TERAPAN,
    ADEGAN_LUAR_TANGGA,
    ADEGAN_LUAR_TANGGA_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
