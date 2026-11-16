import type { VideoStory } from "./logika-story";
import { JUDUL_SUB_K1 } from "./kit/dunia-k1";
import { adeganSapaanPendek } from "./kit/sapaan-opsi2";
import { ADEGAN_ATURAN, ADEGAN_NIKO_SALAH, ADEGAN_TIBA } from "./o2k1a-materi-1";
import { ADEGAN_BACA_ENAM_SEPULUH, ADEGAN_BACA_SATU_LIMA, ADEGAN_HITUNG_LIMA, ADEGAN_HITUNG_TUJUH, ADEGAN_NOL } from "./o2k1a-materi-2";
import { ADEGAN_TULIS_ENAM_DELAPAN, ADEGAN_TULIS_NOL_DUA, ADEGAN_TULIS_SEMBILAN_SEPULUH, ADEGAN_TULIS_TIGA_LIMA } from "./o2k1a-materi-3";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA } from "./o2k1a-materi-4";
import { ADEGAN_PENUTUP } from "./o2k1a-materi-5";
import { ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_TANDA, ADEGAN_LUAR_TANDA_TERAPAN } from "./o2k1a-luar-1";
import { ADEGAN_LUAR_BARIS, ADEGAN_LUAR_BARIS_TERAPAN, ADEGAN_LUAR_GESER, ADEGAN_LUAR_GESER_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./o2k1a-luar-2";

/** Opsi 2 Kelas 1 Bab 1 Sub-Bab A (Apel di Keranjang): video materi dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_O2K1A: VideoStory = {
  id: "o2k1a-materi",
  judul: JUDUL_SUB_K1["1A"],
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaanPendek({ id: "sapaan", jenis: "materi", topik: "bilangan nol sampai sepuluh", daftar: ["menghitung", "membaca", "menulis"], lambang: ["0", "10"] }),
    ADEGAN_TIBA,
    ADEGAN_ATURAN,
    ADEGAN_NIKO_SALAH,
    ADEGAN_HITUNG_LIMA,
    ADEGAN_HITUNG_TUJUH,
    ADEGAN_BACA_SATU_LIMA,
    ADEGAN_BACA_ENAM_SEPULUH,
    ADEGAN_NOL,
    ADEGAN_TULIS_NOL_DUA,
    ADEGAN_TULIS_TIGA_LIMA,
    ADEGAN_TULIS_ENAM_DELAPAN,
    ADEGAN_TULIS_SEMBILAN_SEPULUH,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_O2K1A: VideoStory = {
  id: "o2k1a-luar",
  judul: JUDUL_SUB_K1["1A"],
  subjudul: "Tiga cara lain menghitung",
  jenis: "metode-luar",
  adegan: [
    adeganSapaanPendek({ id: "sapaan", jenis: "metode-luar", topik: "bilangan nol sampai sepuluh" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_TANDA,
    ADEGAN_LUAR_TANDA_TERAPAN,
    ADEGAN_LUAR_BARIS,
    ADEGAN_LUAR_BARIS_TERAPAN,
    ADEGAN_LUAR_GESER,
    ADEGAN_LUAR_GESER_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
