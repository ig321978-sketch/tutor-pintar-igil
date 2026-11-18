import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_EMPAT_SEPEREMPAT, ADEGAN_LABU_DATANG, ADEGAN_SALAH_GARIS } from "./k2b5C-materi-1";
import { ADEGAN_DUA_KALI, ADEGAN_HUBUNGAN, ADEGAN_LIPAT } from "./k2b5C-materi-2";
import { ADEGAN_KUPU, ADEGAN_LINGKARAN, ADEGAN_PENUTUP } from "./k2b5C-materi-3";
import { ADEGAN_LUAR_BELAH, ADEGAN_LUAR_BELAH_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k2b5C-luar-1";
import { ADEGAN_LUAR_DINDING, ADEGAN_LUAR_DINDING_TERAPAN, ADEGAN_LUAR_LIPAT, ADEGAN_LUAR_LIPAT_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k2b5C-luar-2";

/**
 * Kelas 2 Bab 5 Sub-Bab C (seperempat dari benda utuh), akhir cerita Kebun Sekolah.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Panen Raya Pak Joko" (Chacha, Dika, Nia, Bu Sari, Pak Joko).
 * Video kedua: tiga metode global (Halving Twice, Fraction Wall, Fold and Shade), terpisah.
 */
export const JUDUL_K2B5C = "Panen Raya Pak Joko";

export const VIDEO_MATERI_K2B5C: VideoStory = {
  id: "k2b5C-materi",
  judul: JUDUL_K2B5C,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "seperempat", daftar: ["Empat bagian sama besar", "Memotong dua kali", "Utuh, setengah, dan seperempat"] }),
    ADEGAN_LABU_DATANG,
    ADEGAN_SALAH_GARIS,
    ADEGAN_EMPAT_SEPEREMPAT,
    ADEGAN_DUA_KALI,
    ADEGAN_HUBUNGAN,
    ADEGAN_LIPAT,
    ADEGAN_LINGKARAN,
    ADEGAN_KUPU,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B5C: VideoStory = {
  id: "k2b5C-luar",
  judul: JUDUL_K2B5C,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "seperempat", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BELAH,
    ADEGAN_LUAR_BELAH_TERAPAN,
    ADEGAN_LUAR_DINDING,
    ADEGAN_LUAR_DINDING_TERAPAN,
    ADEGAN_LUAR_LIPAT,
    ADEGAN_LUAR_LIPAT_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
