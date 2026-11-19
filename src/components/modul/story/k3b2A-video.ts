import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_KALIMAT, ADEGAN_LAPANGAN_KEMAH, ADEGAN_TUMPUKAN_KAYU } from "./k3b2A-materi-1";
import { ADEGAN_BAGAN, ADEGAN_KURANG, ADEGAN_SALAH_JUMLAH } from "./k3b2A-materi-2";
import { ADEGAN_BANYAK_KEMUNGKINAN, ADEGAN_PENUTUP, ADEGAN_TITIK_DEPAN } from "./k3b2A-materi-3";
import { ADEGAN_LUAR_BAGAN, ADEGAN_LUAR_BAGAN_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k3b2A-luar-1";
import { ADEGAN_LUAR_MAJU, ADEGAN_LUAR_MAJU_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TIMBANG, ADEGAN_LUAR_TIMBANG_TERAPAN } from "./k3b2A-luar-2";

/**
 * Kelas 3 Bab 2 Sub-Bab A (kalimat Matematika penjumlahan), awal cerita Perkemahan Akhir Pekan.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Kayu untuk Api Unggun" (Raka, Salsa, Bima, Pak Joko, Kak Rina).
 * Video kedua: tiga metode global (Bar Model, Counting On, Balance Scale), terpisah.
 */
export const JUDUL_K3B2A = "Kayu untuk Api Unggun";

export const VIDEO_MATERI_K3B2A: VideoStory = {
  id: "k3b2A-materi",
  judul: JUDUL_K3B2A,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "kalimat Matematika penjumlahan", daftar: ["Bilangan yang belum diketahui", "Mencari dengan mengurangkan", "Memeriksa hasil dengan menjumlahkan"] }),
    ADEGAN_LAPANGAN_KEMAH,
    ADEGAN_TUMPUKAN_KAYU,
    ADEGAN_KALIMAT,
    ADEGAN_SALAH_JUMLAH,
    ADEGAN_BAGAN,
    ADEGAN_KURANG,
    ADEGAN_TITIK_DEPAN,
    ADEGAN_BANYAK_KEMUNGKINAN,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K3B2A: VideoStory = {
  id: "k3b2A-luar",
  judul: JUDUL_K3B2A,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "kalimat Matematika penjumlahan", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BAGAN,
    ADEGAN_LUAR_BAGAN_TERAPAN,
    ADEGAN_LUAR_MAJU,
    ADEGAN_LUAR_MAJU_TERAPAN,
    ADEGAN_LUAR_TIMBANG,
    ADEGAN_LUAR_TIMBANG_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
