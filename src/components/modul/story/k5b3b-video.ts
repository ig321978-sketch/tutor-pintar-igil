import type { VideoStory } from "./logika-story";
import { ADEGAN_MASALAH, ADEGAN_PEMBUKA, ADEGAN_PERSIAPAN } from "./k5b3b-materi-1";
import { ADEGAN_MARTABAK, ADEGAN_PENGHAPUS, ADEGAN_PITA_KOMANG, ADEGAN_PITA_LUKAS } from "./k5b3b-materi-2";
import { ADEGAN_DENAH, ADEGAN_KOMANG_YOHANA, ADEGAN_NISA, ADEGAN_PENUTUP } from "./k5b3b-materi-3";
import { ADEGAN_LUAR_KPK, ADEGAN_LUAR_PEMBUKA, ADEGAN_LUAR_SAMA, ADEGAN_LUAR_SAMA_TERAPAN } from "./k5b3b-luar-1";
import { ADEGAN_LUAR_AREA, ADEGAN_LUAR_AREA_TERAPAN, ADEGAN_LUAR_GARIS, ADEGAN_LUAR_GARIS_TERAPAN, ADEGAN_LUAR_KPK_TERAPAN, ADEGAN_LUAR_RINGKAS } from "./k5b3b-luar-2";

/** Kelas 5 Bab 3 Sub-Bab B (penjumlahan bilangan pecahan): video materi kurikulum dan video metode luar, dua video terpisah. */
export const VIDEO_MATERI_K5B3B: VideoStory = {
  id: "k5b3b-materi",
  judul: "Penjumlahan Pecahan menurut Buku",
  subjudul: "Materi kurikulum · Buku Siswa hlm. 76–90 dan Refleksi nomor 3",
  jenis: "materi",
  adegan: [
    ADEGAN_PEMBUKA,
    ADEGAN_PERSIAPAN,
    ADEGAN_MASALAH,
    ADEGAN_MARTABAK,
    ADEGAN_PENGHAPUS,
    ADEGAN_PITA_LUKAS,
    ADEGAN_PITA_KOMANG,
    ADEGAN_NISA,
    ADEGAN_KOMANG_YOHANA,
    ADEGAN_DENAH,
    ADEGAN_PENUTUP,
  ],
};

export const VIDEO_LUAR_K5B3B: VideoStory = {
  id: "k5b3b-luar",
  judul: "Penjumlahan Pecahan: Metode dari Luar",
  subjudul: "Empat metode luar · contoh martabak, penghapus, pita, kertas, dan wingko",
  jenis: "metode-luar",
  adegan: [
    ADEGAN_LUAR_PEMBUKA,
    ADEGAN_LUAR_SAMA,
    ADEGAN_LUAR_SAMA_TERAPAN,
    ADEGAN_LUAR_KPK,
    ADEGAN_LUAR_KPK_TERAPAN,
    ADEGAN_LUAR_AREA,
    ADEGAN_LUAR_AREA_TERAPAN,
    ADEGAN_LUAR_GARIS,
    ADEGAN_LUAR_GARIS_TERAPAN,
    ADEGAN_LUAR_RINGKAS,
  ],
};
