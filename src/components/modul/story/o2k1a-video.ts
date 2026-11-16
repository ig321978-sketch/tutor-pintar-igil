import type { AdeganStory, VideoStory } from "./logika-story";
import { W, bersih, emo, kotak, tambah, teks } from "./kit/dasar";
import { JUDUL_SUB_K1, NAMA_METODE_K1A } from "./kit/dunia-k1";
import { adeganSapaanPendek } from "./kit/sapaan-opsi2";
import { ADEGAN_NIKO_SALAH, ADEGAN_TIBA } from "./o2k1a-materi-1";
import { ADEGAN_ANGIN_NOL, ADEGAN_GESER_LINGKAR, ADEGAN_GESER_SEBAR } from "./o2k1a-materi-2";
import { ADEGAN_TULIS_A, ADEGAN_TULIS_B } from "./o2k1a-materi-3";
import { ADEGAN_LATIHAN_1, ADEGAN_LATIHAN_2, ADEGAN_LATIHAN_3, ADEGAN_LATIHAN_4 } from "./o2k1a-materi-4";
import { ADEGAN_PUNCAK } from "./o2k1a-materi-5";
import { ADEGAN_BACA, ADEGAN_ISI, ADEGAN_LABEL, ADEGAN_SEKILAS } from "./o2k1a-materi-6";

/** Sapaan kit; ketukan ketiga diganti supaya nama keempat langkah metode terdengar dan tampak (empat ikon di layar). */
const IKON_LANGKAH: [string, string][] = [["TUNJUK", "👆"], ["GESER", "↔"], ["ISI", "📥"], ["TULIS", "✏"]];
function sapaan(): AdeganStory {
  const a = adeganSapaanPendek({ id: "sapaan", jenis: "materi", topik: "bilangan nol sampai sepuluh", daftar: ["menghitung", "membaca", "menulis"], lambang: ["0", "10"] });
  a.ketukan[2] = {
    suara: "Caranya: tunjuk, geser, isi, tulis!",
    aksi: [
      bersih(0),
      ...IKON_LANGKAH.map(([nama, ikon], i) =>
        tambah(i + 1, kotak("mt" + i + "-k", 12 + 72 * i, 40, 64, 96, "#DBEAFE", W.biru, { rx: 10 }), emo("mt" + i + "-e", 44 + 72 * i, 90, ikon, 32), teks("mt" + i + "-t", 44 + 72 * i, 124, nama, 9, W.ungu)),
      ),
    ],
  };
  return a;
}

/**
 * Opsi 2 Kelas 1 Bab 1 Sub-Bab A (Apel di Keranjang): SATU video sekitar lima menit yang memuat seluruh materi,
 * diajarkan dengan Metode IGIL: Tunjuk, Geser, Isi, Tulis.
 */
export const VIDEO_MATERI_O2K1A: VideoStory = {
  id: "o2k1a-materi",
  judul: JUDUL_SUB_K1["1A"],
  subjudul: `Metode IGIL: ${NAMA_METODE_K1A}`,
  jenis: "materi",
  adegan: [
    sapaan(),
    ADEGAN_TIBA,
    ADEGAN_NIKO_SALAH,
    ADEGAN_ANGIN_NOL,
    ADEGAN_GESER_SEBAR,
    ADEGAN_GESER_LINGKAR,
    ADEGAN_ISI,
    ADEGAN_SEKILAS,
    ADEGAN_BACA,
    ADEGAN_TULIS_A,
    ADEGAN_TULIS_B,
    ADEGAN_LABEL,
    ADEGAN_LATIHAN_1,
    ADEGAN_LATIHAN_2,
    ADEGAN_LATIHAN_3,
    ADEGAN_LATIHAN_4,
    ADEGAN_PUNCAK,
  ],
};
