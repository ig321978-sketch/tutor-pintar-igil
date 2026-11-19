import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BOTOL_DIBAGI, ADEGAN_KALIMAT_KURANG, ADEGAN_POS_HUTAN } from "./k3b2B-materi-1";
import { ADEGAN_AWAL_HILANG, ADEGAN_CARI_DIKURANGKAN, ADEGAN_PERIKSA_KURANG } from "./k3b2B-materi-2";
import { ADEGAN_BANYAK_KEMUNGKINAN, ADEGAN_PENUTUP, ADEGAN_SALAH_KURANG } from "./k3b2B-materi-3";
import { ADEGAN_LUAR_KELUARGA, ADEGAN_LUAR_KELUARGA_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k3b2B-luar-1";
import { ADEGAN_LUAR_GARIS, ADEGAN_LUAR_GARIS_TERAPAN, ADEGAN_LUAR_NAIK, ADEGAN_LUAR_NAIK_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k3b2B-luar-2";

/**
 * Kelas 3 Bab 2 Sub-Bab B (kalimat Matematika pengurangan), akhir cerita Perkemahan Akhir Pekan.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Botol Air Pak Darto" (Raka, Salsa, Bima, Pak Joko, Pak Darto, Kak Rina).
 * Video kedua: tiga metode global (Fact Family, Counting Up, Number Line), terpisah.
 */
export const JUDUL_K3B2B = "Botol Air Pak Darto";

export const VIDEO_MATERI_K3B2B: VideoStory = {
  id: "k3b2B-materi",
  judul: JUDUL_K3B2B,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "kalimat Matematika pengurangan", daftar: ["Mencari bilangan yang dikurangkan", "Mencari bilangan awal", "Memeriksa hasil dengan mengurangkan"] }),
    ADEGAN_POS_HUTAN,
    ADEGAN_BOTOL_DIBAGI,
    ADEGAN_KALIMAT_KURANG,
    ADEGAN_CARI_DIKURANGKAN,
    ADEGAN_PERIKSA_KURANG,
    ADEGAN_AWAL_HILANG,
    ADEGAN_SALAH_KURANG,
    ADEGAN_BANYAK_KEMUNGKINAN,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K3B2B: VideoStory = {
  id: "k3b2B-luar",
  judul: JUDUL_K3B2B,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "kalimat Matematika pengurangan", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_KELUARGA,
    ADEGAN_LUAR_KELUARGA_TERAPAN,
    ADEGAN_LUAR_NAIK,
    ADEGAN_LUAR_NAIK_TERAPAN,
    ADEGAN_LUAR_GARIS,
    ADEGAN_LUAR_GARIS_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
