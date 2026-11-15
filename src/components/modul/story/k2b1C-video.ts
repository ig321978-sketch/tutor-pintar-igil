import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_HITUNG, ADEGAN_STOPLES, ADEGAN_TEBAKAN_DEKAT, ADEGAN_TEBAK_BANDING } from "./k2b1C-materi-1";
import { ADEGAN_DUA_BILANGAN, ADEGAN_PULUHAN_DULU, ADEGAN_PULUHAN_SAMA, ADEGAN_TABEL_NILAI } from "./k2b1C-materi-2";
import { ADEGAN_JANGAN_SATUAN, ADEGAN_TANDA, ADEGAN_TUKAR, ADEGAN_URUTKAN } from "./k2b1C-materi-3";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP } from "./k2b1C-materi-4";
import { ADEGAN_LUAR_GARIS, ADEGAN_LUAR_GARIS_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k2b1C-luar-1";
import { ADEGAN_LUAR_BALOK, ADEGAN_LUAR_BALOK_TERAPAN, ADEGAN_LUAR_BUAYA, ADEGAN_LUAR_BUAYA_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k2b1C-luar-2";

/** Kelas 2 Bab 1 Sub-Bab C (Membandingkan Dua Bilangan atau Lebih): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K2B1C: VideoStory = {
  id: "k2b1C-materi",
  judul: "Membandingkan Dua Bilangan atau Lebih",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "membandingkan dua bilangan atau lebih", daftar: ["Menebak dan menghitung", "Puluhan dulu, lalu satuan", "Mengurutkan bilangan"] }),
    ADEGAN_STOPLES,
    ADEGAN_HITUNG,
    ADEGAN_TEBAKAN_DEKAT,
    ADEGAN_TEBAK_BANDING,
    ADEGAN_DUA_BILANGAN,
    ADEGAN_TABEL_NILAI,
    ADEGAN_PULUHAN_DULU,
    ADEGAN_PULUHAN_SAMA,
    ADEGAN_TUKAR,
    ADEGAN_JANGAN_SATUAN,
    ADEGAN_TANDA,
    ADEGAN_URUTKAN,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B1C: VideoStory = {
  id: "k2b1C-luar",
  judul: "Membandingkan Dua Bilangan atau Lebih: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "membandingkan dua bilangan atau lebih" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_GARIS,
    ADEGAN_LUAR_GARIS_TERAPAN,
    ADEGAN_LUAR_BALOK,
    ADEGAN_LUAR_BALOK_TERAPAN,
    ADEGAN_LUAR_BUAYA,
    ADEGAN_LUAR_BUAYA_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
