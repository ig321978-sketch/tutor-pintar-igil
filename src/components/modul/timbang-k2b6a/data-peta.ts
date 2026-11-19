/**
 * Data Simulasi (Pos Timbang) Kelas 2 Bab 6 Sub-Bab A "Peralatan Lomba Pak Anton", awal cerita Hari Olahraga Sekolah.
 * Mind-map hanya memuat poin pelajaran. Infografis memakai data Story (kerucut dan kantong pasir, dua kantong, dua bola, boneka harimau, rantai buah).
 * Simulasi memakai benda lain (layang-layang, bulu tangkis, yoyo, sarung tinju, batu curling; satuan dadu dan es batu). Diuji: scripts/uji-timbang-k2b6a.mjs.
 */
/* ------------------------------ Simulasi: Pos Timbang (berbeda dari Story) ------------------------------ */
export type BendaSim = { id: string; nama: string; emoji: string; w: number; besar?: boolean };
/** Lima benda lomba. Berat tidak tampak; hanya papan yang menunjukkan. Layang-layang besar tetapi ringan. */
export const BENDA_SIM: readonly BendaSim[] = [
  { id: "layang", nama: "layang-layang", emoji: "\u{1FA81}", w: 2, besar: true },
  { id: "kok", nama: "bulu tangkis", emoji: "\u{1F3F8}", w: 2 },
  { id: "yoyo", nama: "yoyo", emoji: "\u{1FA80}", w: 4 },
  { id: "tinju", nama: "sarung tinju", emoji: "\u{1F94A}", w: 6 },
  { id: "curling", nama: "batu curling", emoji: "\u{1F94C}", w: 8 },
];
/** Dua satuan tidak baku: dadu (ringan) dan es batu (dua kali lebih berat). */
export type SatuanSim = { id: string; nama: string; emoji: string; w: number };
export const SATUAN_SIM: readonly SatuanSim[] = [
  { id: "dadu", nama: "dadu", emoji: "\u{1F3B2}", w: 1 },
  { id: "es", nama: "es batu", emoji: "\u{1F9CA}", w: 2 },
];
/** Benda yang disusun dari paling berat (nomor dalam BENDA_SIM). */
export const SUSUN_SIM: readonly number[] = [1, 2, 3, 4];
export const MAKS_SATUAN = 10;
export const MISI_TIMBANG_TEKS =
  "Misi Pos Timbang: bandingkan dua benda di papan jungkat-jungkit, timbang satu benda dengan satuan sampai seimbang, lalu susun benda dari yang paling berat. Urutannya bebas.";
