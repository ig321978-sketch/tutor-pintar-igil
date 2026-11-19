import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_KODOK, ADEGAN_RAKIT_BANDUL, ADEGAN_RUANG_PAKAN } from "./k3b3D-materi-1";
import { ADEGAN_G_KE_KG, ADEGAN_KG_KE_G, ADEGAN_SALAH_KALI } from "./k3b3D-materi-2";
import { ADEGAN_JUMLAH_BERAT, ADEGAN_KURANG_BERAT, ADEGAN_PENUTUP } from "./k3b3D-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_TABEL, ADEGAN_LUAR_TABEL_TERAPAN } from "./k3b3D-luar-1";
import { ADEGAN_LUAR_GARIS_GANDA, ADEGAN_LUAR_GARIS_GANDA_TERAPAN, ADEGAN_LUAR_PECAH, ADEGAN_LUAR_PECAH_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k3b3D-luar-2";

/**
 * Kelas 3 Bab 3 Sub-Bab D (hubungan kilogram, ons, dan gram), akhir cerita Kebun Binatang Mini.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Bandul Dokter Hana" (Raka, Salsa, Bima, Pak Joko, Dokter Hana, dan semua tamu).
 * Video kedua: tiga metode global (Place Value Chart, Double Number Line, Chunking), terpisah.
 */
export const JUDUL_K3B3D = "Bandul Dokter Hana";

export const VIDEO_MATERI_K3B3D: VideoStory = {
  id: "k3b3D-materi",
  judul: JUDUL_K3B3D,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "hubungan kilogram, ons, dan gram", daftar: ["Bandul timbangan", "Kilogram dan gram", "Mengubah satuan"] }),
    ADEGAN_RUANG_PAKAN,
    ADEGAN_KODOK,
    ADEGAN_RAKIT_BANDUL,
    ADEGAN_KG_KE_G,
    ADEGAN_SALAH_KALI,
    ADEGAN_G_KE_KG,
    ADEGAN_JUMLAH_BERAT,
    ADEGAN_KURANG_BERAT,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K3B3D: VideoStory = {
  id: "k3b3D-luar",
  judul: JUDUL_K3B3D,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "hubungan kilogram, ons, dan gram", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_TABEL,
    ADEGAN_LUAR_TABEL_TERAPAN,
    ADEGAN_LUAR_GARIS_GANDA,
    ADEGAN_LUAR_GARIS_GANDA_TERAPAN,
    ADEGAN_LUAR_PECAH,
    ADEGAN_LUAR_PECAH_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
