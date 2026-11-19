import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BENGKEL, ADEGAN_METER_KE_CM, ADEGAN_SERATUS } from "./k3b3B-materi-1";
import { ADEGAN_CM_KE_M, ADEGAN_GABUNG, ADEGAN_SALAH_KALI } from "./k3b3B-materi-2";
import { ADEGAN_PENUTUP, ADEGAN_POTONG, ADEGAN_SAMBUNG } from "./k3b3B-materi-3";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_TABEL, ADEGAN_LUAR_TABEL_TERAPAN } from "./k3b3B-luar-1";
import { ADEGAN_LUAR_GARIS, ADEGAN_LUAR_GARIS_TERAPAN, ADEGAN_LUAR_PECAH, ADEGAN_LUAR_PECAH_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k3b3B-luar-2";

/**
 * Kelas 3 Bab 3 Sub-Bab B (hubungan sentimeter dan meter), Kebun Binatang Mini.
 * Video materi (sekitar tiga menit, tanpa latihan): cerita orisinal IGIL "Pita Pak Wayan" (Raka, Salsa, Bima, Pak Joko, Pak Wayan, Bu Lastri di kejauhan).
 * Video kedua: tiga metode global (Ratio Table, Number Line, Split Strategy), terpisah.
 */
export const JUDUL_K3B3B = "Pita Pak Wayan";

export const VIDEO_MATERI_K3B3B: VideoStory = {
  id: "k3b3B-materi",
  judul: JUDUL_K3B3B,
  subjudul: "Metode Kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "hubungan sentimeter dan meter", daftar: ["Seratus sentimeter sama dengan satu meter", "Mengubah meter dan sentimeter", "Menjumlahkan dan mengurangkan ukuran panjang"] }),
    ADEGAN_BENGKEL,
    ADEGAN_SERATUS,
    ADEGAN_METER_KE_CM,
    ADEGAN_SALAH_KALI,
    ADEGAN_CM_KE_M,
    ADEGAN_GABUNG,
    ADEGAN_SAMBUNG,
    ADEGAN_POTONG,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K3B3B: VideoStory = {
  id: "k3b3B-luar",
  judul: JUDUL_K3B3B,
  subjudul: "Metode Global",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "hubungan sentimeter dan meter", labelMetode: "Metode global" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_TABEL,
    ADEGAN_LUAR_TABEL_TERAPAN,
    ADEGAN_LUAR_GARIS,
    ADEGAN_LUAR_GARIS_TERAPAN,
    ADEGAN_LUAR_PECAH,
    ADEGAN_LUAR_PECAH_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
