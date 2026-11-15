import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_BENDA_LAYAR, ADEGAN_BISA_DIISI, ADEGAN_DATAR, ADEGAN_RUANG } from "./k2b3C-materi-1";
import { ADEGAN_GELINDING, ADEGAN_LIMA_NAMA, ADEGAN_MENGAPA, ADEGAN_PERMUKAAN } from "./k2b3C-materi-2";
import { ADEGAN_BALOK, ADEGAN_KUBUS_RUSUK, ADEGAN_KUBUS_SISI, ADEGAN_TABUNG } from "./k2b3C-materi-3";
import { ADEGAN_BOLA, ADEGAN_CARI_RUANG, ADEGAN_KERUCUT, ADEGAN_TABEL_RUANG } from "./k2b3C-materi-4";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_PENUTUP } from "./k2b3C-materi-5";
import { ADEGAN_LUAR_CETAK, ADEGAN_LUAR_CETAK_TERAPAN, ADEGAN_LUAR_PEMBUKA } from "./k2b3C-luar-1";
import { ADEGAN_LUAR_CIRI, ADEGAN_LUAR_CIRI_TERAPAN, ADEGAN_LUAR_RINGKAS, ADEGAN_LUAR_TAS, ADEGAN_LUAR_TAS_TERAPAN } from "./k2b3C-luar-2";

/** Kelas 2 Bab 3 Sub-Bab C (Bangun Ruang): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K2B3C: VideoStory = {
  id: "k2b3C-materi",
  judul: "Bangun Ruang",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "bangun ruang", daftar: ["Bangun datar dan ruang", "Permukaan datar dan lengkung", "Lima bangun ruang"] }),
    ADEGAN_BENDA_LAYAR,
    ADEGAN_DATAR,
    ADEGAN_RUANG,
    ADEGAN_BISA_DIISI,
    ADEGAN_GELINDING,
    ADEGAN_PERMUKAAN,
    ADEGAN_MENGAPA,
    ADEGAN_LIMA_NAMA,
    ADEGAN_KUBUS_SISI,
    ADEGAN_KUBUS_RUSUK,
    ADEGAN_BALOK,
    ADEGAN_TABUNG,
    ADEGAN_KERUCUT,
    ADEGAN_BOLA,
    ADEGAN_TABEL_RUANG,
    ADEGAN_CARI_RUANG,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K2B3C: VideoStory = {
  id: "k2b3C-luar",
  judul: "Bangun Ruang: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "bangun ruang" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_CETAK,
    ADEGAN_LUAR_CETAK_TERAPAN,
    ADEGAN_LUAR_TAS,
    ADEGAN_LUAR_TAS_TERAPAN,
    ADEGAN_LUAR_CIRI,
    ADEGAN_LUAR_CIRI_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
