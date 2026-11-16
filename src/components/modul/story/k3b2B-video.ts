import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_DUA_ANAK, ADEGAN_KALIMAT_MTK, ADEGAN_TABEL_PERMEN } from "./k3b2B-materi-1";
import { ADEGAN_AYAM_DIJUAL, ADEGAN_DEPAN_KECIL, ADEGAN_TENGAH_KECIL } from "./k3b2B-materi-2";
import { ADEGAN_BAGAN_AYAM, ADEGAN_PERIKSA_AYAM, ADEGAN_TABEL_AYAM } from "./k3b2B-materi-3";
import { ADEGAN_AYAM_AWAL, ADEGAN_BAGAN_AWAL, ADEGAN_DUA_ARAH, ADEGAN_KALIMAT_AWAL } from "./k3b2B-materi-4";
import { ADEGAN_CONTOH_DEPAN, ADEGAN_CONTOH_TENGAH, ADEGAN_KEMUNGKINAN } from "./k3b2B-materi-5";
import { ADEGAN_CARA_LANGKAH, ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP } from "./k3b2B-materi-6";
import { ADEGAN_LUAR_BAGAN, ADEGAN_LUAR_BAGAN_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k3b2B-luar-1";
import { ADEGAN_LUAR_BUNGKUS, ADEGAN_LUAR_BUNGKUS_TERAPAN, ADEGAN_LUAR_KEBALIKAN, ADEGAN_LUAR_KEBALIKAN_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k3b2B-luar-2";

/** Kelas 3 Bab 2 Sub-Bab B (Kalimat Matematika Pengurangan): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K3B2B: VideoStory = {
  id: "k3b2B-materi",
  judul: "Kalimat Matematika Pengurangan",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "kalimat matematika pengurangan", daftar: ["Kalimat Matematika pengurangan", "Mencari bilangan yang dikurangkan", "Mencari bilangan awal"] }),
    ADEGAN_DUA_ANAK,
    ADEGAN_TABEL_PERMEN,
    ADEGAN_KALIMAT_MTK,
    ADEGAN_TENGAH_KECIL,
    ADEGAN_DEPAN_KECIL,
    ADEGAN_AYAM_DIJUAL,
    ADEGAN_TABEL_AYAM,
    ADEGAN_BAGAN_AYAM,
    ADEGAN_PERIKSA_AYAM,
    ADEGAN_AYAM_AWAL,
    ADEGAN_KALIMAT_AWAL,
    ADEGAN_BAGAN_AWAL,
    ADEGAN_DUA_ARAH,
    ADEGAN_CONTOH_TENGAH,
    ADEGAN_CONTOH_DEPAN,
    ADEGAN_KEMUNGKINAN,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_CARA_LANGKAH,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K3B2B: VideoStory = {
  id: "k3b2B-luar",
  judul: "Kalimat Matematika Pengurangan: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "kalimat matematika pengurangan" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BAGAN,
    ADEGAN_LUAR_BAGAN_TERAPAN,
    ADEGAN_LUAR_KEBALIKAN,
    ADEGAN_LUAR_KEBALIKAN_TERAPAN,
    ADEGAN_LUAR_BUNGKUS,
    ADEGAN_LUAR_BUNGKUS_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
