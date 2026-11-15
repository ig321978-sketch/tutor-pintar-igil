import type { VideoStory } from "./logika-story";
import { adeganSapaan } from "./sapaan";
import { ADEGAN_CERITA_TONGKAT, ADEGAN_KOTAK_SATUAN, ADEGAN_PULUHAN_RATUSAN } from "./k3b1A-materi-1";
import { ADEGAN_KATA_PULUHAN, ADEGAN_KATA_RATUSAN, ADEGAN_PAPAN_TIGA } from "./k3b1A-materi-2";
import { ADEGAN_BACA_160, ADEGAN_BACA_671, ADEGAN_BACA_759 } from "./k3b1A-materi-3";
import { ADEGAN_NOL_703, ADEGAN_NOL_900, ADEGAN_TULIS_354, ADEGAN_TULIS_572 } from "./k3b1A-materi-4";
import { ADEGAN_LATIHAN_DUA, ADEGAN_LATIHAN_SATU, ADEGAN_LATIHAN_TIGA, ADEGAN_NOL_PENJAGA, ADEGAN_PENUTUP } from "./k3b1A-materi-5";
import { ADEGAN_LUAR_BALOK, ADEGAN_LUAR_BALOK_TERAPAN, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_RINGKAS } from "./k3b1A-luar-1";
import { ADEGAN_LUAR_NAMA, ADEGAN_LUAR_NAMA_TERAPAN, ADEGAN_LUAR_TABEL, ADEGAN_LUAR_TABEL_TERAPAN } from "./k3b1A-luar-2";

/** Kelas 3 Bab 1 Sub-Bab A (Bilangan dan Lambang Bilangan): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K3B1A: VideoStory = {
  id: "k3b1A-materi",
  judul: "Bilangan dan Lambang Bilangan",
  subjudul: "Materi kurikulum",
  jenis: "materi",
  adegan: [
    adeganSapaan({ jenis: "materi", topik: "bilangan dan lambang bilangan", daftar: ["Satuan, puluhan, dan ratusan", "Membaca bilangan tiga angka", "Menulis lambang bilangan"] }),
    ADEGAN_CERITA_TONGKAT,
    ADEGAN_KOTAK_SATUAN,
    ADEGAN_PULUHAN_RATUSAN,
    ADEGAN_PAPAN_TIGA,
    ADEGAN_KATA_RATUSAN,
    ADEGAN_KATA_PULUHAN,
    ADEGAN_BACA_160,
    ADEGAN_BACA_671,
    ADEGAN_BACA_759,
    ADEGAN_NOL_703,
    ADEGAN_NOL_900,
    ADEGAN_TULIS_354,
    ADEGAN_TULIS_572,
    ADEGAN_NOL_PENJAGA,
    ADEGAN_LATIHAN_SATU,
    ADEGAN_LATIHAN_DUA,
    ADEGAN_LATIHAN_TIGA,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K3B1A: VideoStory = {
  id: "k3b1A-luar",
  judul: "Bilangan dan Lambang Bilangan: Metode dari Luar",
  subjudul: "Tiga metode luar",
  jenis: "metode-luar",
  adegan: [
    adeganSapaan({ jenis: "metode-luar", topik: "bilangan dan lambang bilangan" }),
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_BALOK,
    ADEGAN_LUAR_BALOK_TERAPAN,
    ADEGAN_LUAR_TABEL,
    ADEGAN_LUAR_TABEL_TERAPAN,
    ADEGAN_LUAR_NAMA,
    ADEGAN_LUAR_NAMA_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
