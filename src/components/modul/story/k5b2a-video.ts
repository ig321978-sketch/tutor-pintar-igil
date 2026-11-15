import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_ATURAN, ADEGAN_LANJUT } from "./k5b2a-materi-2";
import { ADEGAN_RENANG } from "./k5b2a-materi-1";
import { ADEGAN_ENAM_DELAPAN, ADEGAN_PENUTUP, ADEGAN_SEMBILAN, ADEGAN_TABEL, ADEGAN_TUJUH } from "./k5b2a-materi-3";
import { ADEGAN_LUAR_LOMPAT, ADEGAN_LUAR_LOMPAT_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_SERATUS, ADEGAN_LUAR_SERATUS_TERAPAN } from "./k5b2a-luar-1";
import { ADEGAN_LUAR_CEK, ADEGAN_LUAR_CEK_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_SATUAN, ADEGAN_LUAR_SATUAN_TERAPAN } from "./k5b2a-luar-2";

/** Kelas 5 Bab 2 Sub-Bab A (kelipatan), termasuk pembuka bab: video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B2A: VideoStory = {
  id: "k5b2a-materi",
  judul: "Kelipatan",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "kelipatan sebuah bilangan", daftar: ["Arti kelipatan", "Menulis deret kelipatan", "Pola warna di tabel seratus"] }),
    ADEGAN_RENANG,
    ADEGAN_ATURAN,
    ADEGAN_LANJUT,
    ADEGAN_TABEL,
    ADEGAN_TUJUH,
    ADEGAN_SEMBILAN,
    ADEGAN_ENAM_DELAPAN,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K5B2A: VideoStory = {
  id: "k5b2a-luar",
  judul: "Kelipatan: Metode dari Luar",
  subjudul: "Empat metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "kelipatan sebuah bilangan" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_LOMPAT,
    ADEGAN_LUAR_LOMPAT_TERAPAN,
    ADEGAN_LUAR_SERATUS,
    ADEGAN_LUAR_SERATUS_TERAPAN,
    ADEGAN_LUAR_CEK,
    ADEGAN_LUAR_CEK_TERAPAN,
    ADEGAN_LUAR_SATUAN,
    ADEGAN_LUAR_SATUAN_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
