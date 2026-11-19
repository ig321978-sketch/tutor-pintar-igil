import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BAGI_RATA, ADEGAN_HARI_JADI, ADEGAN_TULIS_BAGI } from "./k3b1G-materi-1";
import { ADEGAN_KELUARGA_FAKTA, ADEGAN_KURANG_BERULANG, ADEGAN_SALAH_KURANG } from "./k3b1G-materi-2";
import { ADEGAN_CERITA_BAGI, ADEGAN_PENUTUP, ADEGAN_PERIKSA_KALI } from "./k3b1G-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_RATA, ADEGAN_LUAR_RATA_TERAPAN } from "./k3b1G-luar-1";
import { ADEGAN_LUAR_KELUARGA, ADEGAN_LUAR_KELUARGA_TERAPAN, ADEGAN_LUAR_KURANG, ADEGAN_LUAR_KURANG_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k3b1G-luar-2";

/**
 * Kelas 3 Bab 1 Sub-Bab G (pembagian sampai seratus), akhir cerita Toko Kelontong Pak Joko.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Pesta Hari Jadi Toko" (Raka, Salsa, Bima, Pak Joko, Nenek Ijah).
 * Video kedua: tiga metode global (Fair Share, Repeated Subtraction, Fact Family), terpisah.
 */
export const JUDUL_K3B1G = "Pesta Hari Jadi Toko";

export const VIDEO_MATERI_K3B1G: VideoStory = {
  id: "k3b1G-materi",
  judul: JUDUL_K3B1G,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "pembagian sampai seratus", daftar: ["Membagi sama banyak", "Pembagian sebagai pengurangan berulang", "Hubungan kali dan bagi"] }),
    ADEGAN_HARI_JADI,
    ADEGAN_BAGI_RATA,
    ADEGAN_TULIS_BAGI,
    ADEGAN_SALAH_KURANG,
    ADEGAN_KURANG_BERULANG,
    ADEGAN_KELUARGA_FAKTA,
    ADEGAN_CERITA_BAGI,
    ADEGAN_PERIKSA_KALI,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K3B1G: VideoStory = {
  id: "k3b1G-luar",
  judul: JUDUL_K3B1G,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "pembagian sampai seratus", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_RATA,
    ADEGAN_LUAR_RATA_TERAPAN,
    ADEGAN_LUAR_KURANG,
    ADEGAN_LUAR_KURANG_TERAPAN,
    ADEGAN_LUAR_KELUARGA,
    ADEGAN_LUAR_KELUARGA_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
