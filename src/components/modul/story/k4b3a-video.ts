import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_DERET_TUMBUH, ADEGAN_LAPANGAN, ADEGAN_TABEL } from "./k4b3a-materi-1";
import { ADEGAN_KURANG, ADEGAN_MENGANGKAT, ADEGAN_SALAH_MENGECIL } from "./k4b3a-materi-2";
import { ADEGAN_HABIS, ADEGAN_LANJUT, ADEGAN_PENUTUP } from "./k4b3a-materi-3";
import { ADEGAN_LUAR_GAMBAR, ADEGAN_LUAR_GAMBAR_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k4b3a-luar-1";
import { ADEGAN_LUAR_LIMA, ADEGAN_LUAR_LIMA_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TABEL, ADEGAN_LUAR_TABEL_TERAPAN } from "./k4b3a-luar-2";

/**
 * Kelas 4 Bab 3 Sub-Bab A (pola gambar), awal cerita Orkestra Angklung Kampung Senandung.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Deret Angklung Bu Ratri" (Satria, Laras, Genta, Pak Hendro, Bu Ratri).
 * Video kedua: tiga metode global (Draw the Next, Difference Table, Group by Five), terpisah.
 */
export const JUDUL_K4B3A = "Deret Angklung Bu Ratri";

export const VIDEO_MATERI_K4B3A: VideoStory = {
  id: "k4b3a-materi",
  judul: JUDUL_K4B3A,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "pola gambar", daftar: ["Pola membesar", "Pola mengecil", "Selisih tetap"] }),
    ADEGAN_LAPANGAN,
    ADEGAN_DERET_TUMBUH,
    ADEGAN_TABEL,
    ADEGAN_SALAH_MENGECIL,
    ADEGAN_KURANG,
    ADEGAN_MENGANGKAT,
    ADEGAN_LANJUT,
    ADEGAN_HABIS,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K4B3A: VideoStory = {
  id: "k4b3a-luar",
  judul: JUDUL_K4B3A,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "pola gambar", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_GAMBAR,
    ADEGAN_LUAR_GAMBAR_TERAPAN,
    ADEGAN_LUAR_TABEL,
    ADEGAN_LUAR_TABEL_TERAPAN,
    ADEGAN_LUAR_LIMA,
    ADEGAN_LUAR_LIMA_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
