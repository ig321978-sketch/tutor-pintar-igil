import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_MEJA_LABEL, ADEGAN_TEMPAT_ANGKA, ADEGAN_SUSUN_KARTU } from "./k3b1B-materi-1";
import { ADEGAN_SALAH_ENAM, ADEGAN_BENTUK_URAIAN, ADEGAN_NOL_MENJAGA } from "./k3b1B-materi-2";
import { ADEGAN_TABEL_ANGKA, ADEGAN_SUSUN_BILANGAN, ADEGAN_PENUTUP } from "./k3b1B-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_TEMPAT, ADEGAN_LUAR_TEMPAT_TERAPAN } from "./k3b1B-luar-1";
import { ADEGAN_LUAR_KARTU, ADEGAN_LUAR_KARTU_TERAPAN, ADEGAN_LUAR_URAIAN, ADEGAN_LUAR_URAIAN_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k3b1B-luar-2";

/**
 * Kelas 3 Bab 1 Sub-Bab B (tempat angka), cerita Toko Kelontong Pak Joko.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Kartu Harga Bu Wati" (Raka, Salsa, Bima, Pak Joko, Bu Wati).
 * Video kedua: tiga metode global (Place Value, Montessori Cards, Expanded Form), terpisah.
 */
export const JUDUL_K3B1B = "Kartu Harga Bu Wati";

export const VIDEO_MATERI_K3B1B: VideoStory = {
  id: "k3b1B-materi",
  judul: JUDUL_K3B1B,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "tempat angka", daftar: ["Jumlah yang diwakili tiap angka", "Menyusun bilangan dari kartu", "Menguraikan bilangan"] }),
    ADEGAN_MEJA_LABEL,
    ADEGAN_TEMPAT_ANGKA,
    ADEGAN_SUSUN_KARTU,
    ADEGAN_SALAH_ENAM,
    ADEGAN_BENTUK_URAIAN,
    ADEGAN_NOL_MENJAGA,
    ADEGAN_TABEL_ANGKA,
    ADEGAN_SUSUN_BILANGAN,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K3B1B: VideoStory = {
  id: "k3b1B-luar",
  judul: JUDUL_K3B1B,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "tempat angka", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_TEMPAT,
    ADEGAN_LUAR_TEMPAT_TERAPAN,
    ADEGAN_LUAR_KARTU,
    ADEGAN_LUAR_KARTU_TERAPAN,
    ADEGAN_LUAR_URAIAN,
    ADEGAN_LUAR_URAIAN_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
