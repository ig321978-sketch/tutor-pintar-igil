/**
 * Mesin Tebak dan Buktikan (Kelas 2 Bab 6, Sub-Bab A: Berat): mesin keadaan.
 * Tiap pasangan benda melewati stasiun berurutan: Tebak (mana yang lebih berat?) -> Timbang (buktikan dengan neraca)
 * -> Tulis (pilih kalimat yang benar) -> Selesai. Menebak selalu diterima, karena menebak bukan kesalahan. Yang
 * ditolak mesin adalah menulis kesimpulan sebelum menimbang, dan menimbang sebelum menebak. Tebakan boleh meleset:
 * itulah alasan menimbang, terutama untuk benda besar yang ringan.
 * Murni: tanpa React, tanpa jaringan, tanpa impor nilai. Tabel berat disalin dari lab-neraca-k2b6.ts dan diuji sama.
 */

export type BendaMesin = "semangka" | "kelapa" | "batu" | "apel" | "jeruk" | "buku" | "pensil" | "anggur" | "balon";
export type RelMesin = "lebih berat" | "lebih ringan" | "sama berat";
export type KeadaanMesinTebak = "tebak" | "timbang" | "tulis" | "sudah" | "selesai";

export const NAMA_BENDA_MESIN: Record<BendaMesin, string> = {
  semangka: "semangka",
  kelapa: "kelapa",
  batu: "batu",
  apel: "apel",
  jeruk: "jeruk",
  buku: "buku",
  pensil: "pensil",
  anggur: "anggur",
  balon: "balon",
};

export const BERAT_MESIN: Record<BendaMesin, number> = { semangka: 1800, kelapa: 600, batu: 900, apel: 120, jeruk: 120, buku: 60, pensil: 10, anggur: 5, balon: 3 };
export const UKURAN_MESIN: Record<BendaMesin, number> = { semangka: 5, kelapa: 4, batu: 2, apel: 3, jeruk: 3, buku: 3, pensil: 2, anggur: 1, balon: 5 };

export type DefTebak = { id: string; kiri: BendaMesin; kanan: BendaMesin };

/** Lima pasangan. Kunci jawaban (hubungan kiri terhadap kanan) dihitung dari tabel berat, bukan ditulis tangan. */
export const KASUS_TEBAK: DefTebak[] = [
  { id: "semangka-apel", kiri: "semangka", kanan: "apel" },
  { id: "balon-batu", kiri: "balon", kanan: "batu" },
  { id: "apel-jeruk", kiri: "apel", kanan: "jeruk" },
  { id: "kelapa-batu", kiri: "kelapa", kanan: "batu" },
  { id: "pensil-anggur", kiri: "pensil", kanan: "anggur" },
];

export const STASIUN_MESIN_TEBAK = [
  { id: "tebak", nama: "Tebak", ikon: "🤔" },
  { id: "timbang", nama: "Timbang", ikon: "⚖️" },
  { id: "tulis", nama: "Tulis", ikon: "✍️" },
  { id: "selesai", nama: "Selesai", ikon: "🏁" },
];

export const NAMA_KEADAAN_TEBAK: Record<KeadaanMesinTebak, string> = { tebak: "Tebak", timbang: "Timbang", tulis: "Tulis", sudah: "Selesai", selesai: "Selesai" };

export const kunciRelTebak = (d: DefTebak): RelMesin => {
  const a = BERAT_MESIN[d.kiri];
  const b = BERAT_MESIN[d.kanan];
  return a > b ? "lebih berat" : a < b ? "lebih ringan" : "sama berat";
};

/** Miring neraca setelah ditimbang: -1 kiri turun, 1 kanan turun, 0 seimbang. */
export const miringTebak = (d: DefTebak): -1 | 0 | 1 => {
  const r = kunciRelTebak(d);
  return r === "lebih berat" ? -1 : r === "lebih ringan" ? 1 : 0;
};

/** Benda yang lebih besar justru lebih ringan pada pasangan ini. */
export const kontraTebak = (d: DefTebak): boolean => {
  const uk = UKURAN_MESIN[d.kiri] - UKURAN_MESIN[d.kanan];
  const br = BERAT_MESIN[d.kiri] - BERAT_MESIN[d.kanan];
  return (uk > 0 && br < 0) || (uk < 0 && br > 0);
};

export type OpsiTebak = { kunci: RelMesin; label: string };

const Kap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const rotasi = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);

/** Tiga tebakan. Urutannya berputar menurut nomor pasangan. */
export function opsiTebak(d: DefTebak, misi: number): OpsiTebak[] {
  const semua: OpsiTebak[] = [
    { kunci: "lebih berat", label: `${Kap(NAMA_BENDA_MESIN[d.kiri])} lebih berat` },
    { kunci: "lebih ringan", label: `${Kap(NAMA_BENDA_MESIN[d.kanan])} lebih berat` },
    { kunci: "sama berat", label: "Sama berat" },
  ];
  return rotasi(semua, misi % semua.length);
}

/** Tiga kalimat kesimpulan. Urutannya berbeda dari urutan tebakan. */
export function opsiTulis(d: DefTebak, misi: number): OpsiTebak[] {
  const a = NAMA_BENDA_MESIN[d.kiri];
  const b = NAMA_BENDA_MESIN[d.kanan];
  const semua: OpsiTebak[] = [
    { kunci: "lebih berat", label: `${Kap(a)} lebih berat dari ${b}.` },
    { kunci: "lebih ringan", label: `${Kap(a)} lebih ringan dari ${b}.` },
    { kunci: "sama berat", label: `${Kap(a)} sama berat dengan ${b}.` },
  ];
  return rotasi(semua, (misi + 1) % semua.length);
}

export type MesinTebak = {
  daftar: DefTebak[];
  misi: number;
  keadaan: KeadaanMesinTebak;
  tebakan: RelMesin | null;
  riwayat: string[];
  pesan: string;
  ditolak: number;
  /** Berapa tebakan yang meleset (setelah ditimbang). */
  meleset: number;
  selesai: boolean;
};

export type PeristiwaMesinTebak =
  | { t: "TEBAK"; nilai: RelMesin }
  | { t: "BUKTIKAN" }
  | { t: "TULIS"; nilai: RelMesin }
  | { t: "LANJUT" }
  | { t: "LOMPAT"; ke: number }
  | { t: "ULANG" };

export const awalMesinTebak = (daftar: DefTebak[] = KASUS_TEBAK): MesinTebak => ({
  daftar,
  misi: 0,
  keadaan: "tebak",
  tebakan: null,
  riwayat: [],
  pesan: "",
  ditolak: 0,
  meleset: 0,
  selesai: false,
});

export const kasusAktif = (x: MesinTebak): DefTebak => x.daftar[x.misi];
export const indeksStasiunTebak = (k: KeadaanMesinTebak): number => ({ tebak: 0, timbang: 1, tulis: 2, sudah: 3, selesai: 3 })[k];

const tolak = (x: MesinTebak, pesan: string): MesinTebak => ({ ...x, pesan, ditolak: x.ditolak + 1 });
const pindah = (x: MesinTebak, ke: KeadaanMesinTebak, tambah: Partial<MesinTebak> = {}): MesinTebak => ({
  ...x,
  ...tambah,
  keadaan: ke,
  pesan: "",
  riwayat: [...x.riwayat, `${NAMA_KEADAAN_TEBAK[x.keadaan]} → ${NAMA_KEADAAN_TEBAK[ke]}`].slice(-10),
});

/** Ringkasan satu pasangan setelah ditimbang, termasuk catatan besar dan berat bila bertentangan. */
export function ringkasTebak(d: DefTebak, tebakan: RelMesin | null): string {
  const a = NAMA_BENDA_MESIN[d.kiri];
  const b = NAMA_BENDA_MESIN[d.kanan];
  const r = kunciRelTebak(d);
  const hasil = r === "sama berat" ? `${Kap(a)} sama berat dengan ${b}.` : `${Kap(a)} ${r} dari ${b}.`;
  const tebak = tebakan === null ? "" : tebakan === r ? " Tebakanmu tepat." : " Tebakanmu meleset, dan itu wajar. Itulah gunanya menimbang.";
  let besar = "";
  if (kontraTebak(d)) {
    const lebihBesar = UKURAN_MESIN[d.kiri] > UKURAN_MESIN[d.kanan] ? a : b;
    besar = ` ${Kap(lebihBesar)} lebih besar, tetapi tidak lebih berat. Besar belum tentu berat.`;
  }
  return `${hasil}${tebak}${besar}`;
}

export function petunjukMesinTebak(x: MesinTebak): string {
  const d = kasusAktif(x);
  const a = NAMA_BENDA_MESIN[d.kiri];
  const b = NAMA_BENDA_MESIN[d.kanan];
  switch (x.keadaan) {
    case "tebak":
      return `Tebak dulu: ${a} atau ${b}, mana yang lebih berat?`;
    case "timbang":
      return "Tebakanmu sudah dicatat. Sekarang buktikan dengan menimbang di neraca.";
    case "tulis":
      return "Neraca sudah menunjukkan hasilnya. Pilih kalimat yang cocok dengan neraca.";
    case "sudah":
      return `Betul! ${ringkasTebak(d, x.tebakan)}`;
    default:
      return "Semua pasangan sudah ditimbang.";
  }
}

function tolakSalahTempat(x: MesinTebak): MesinTebak {
  switch (x.keadaan) {
    case "tebak":
      return tolak(x, "Tebak dulu sebelum menimbang. Mana yang kamu kira lebih berat?");
    case "timbang":
      return tolak(x, "Timbang dulu di neraca. Kesimpulan ditulis setelah ada buktinya.");
    case "tulis":
      return tolak(x, "Benda sudah ditimbang. Sekarang pilih kalimat kesimpulannya.");
    case "sudah":
      return tolak(x, "Pasangan ini sudah selesai. Tekan lanjut ke pasangan berikutnya.");
    default:
      return tolak(x, "Semua pasangan sudah selesai. Main lagi kalau mau.");
  }
}

/** Satu langkah mesin. Selalu mengembalikan objek baru. */
export function langkahMesinTebak(x: MesinTebak, p: PeristiwaMesinTebak): MesinTebak {
  const d = kasusAktif(x);
  switch (p.t) {
    case "TEBAK": {
      if (x.keadaan !== "tebak") return tolakSalahTempat(x);
      return pindah(x, "timbang", { tebakan: p.nilai });
    }
    case "BUKTIKAN": {
      if (x.keadaan !== "timbang") return tolakSalahTempat(x);
      const salah = x.tebakan !== kunciRelTebak(d);
      return pindah(x, "tulis", { meleset: x.meleset + (salah ? 1 : 0) });
    }
    case "TULIS": {
      if (x.keadaan !== "tulis") return tolakSalahTempat(x);
      if (p.nilai !== kunciRelTebak(d)) return tolak(x, "Lihat lagi neraca. Sisi mana yang turun? Sisi yang turun berisi benda yang lebih berat.");
      return pindah(x, "sudah");
    }
    case "LANJUT": {
      if (x.keadaan !== "sudah") return tolakSalahTempat(x);
      if (x.misi + 1 < x.daftar.length) return pindah(x, "tebak", { misi: x.misi + 1, tebakan: null });
      return pindah(x, "selesai", { selesai: true, tebakan: null });
    }
    case "LOMPAT": {
      if (p.ke === indeksStasiunTebak(x.keadaan)) return x;
      return tolak(x, "Mesin berjalan berurutan: tebak, timbang, tulis. Selesaikan stasiun yang sekarang dulu.");
    }
    case "ULANG":
      return x.selesai ? awalMesinTebak(x.daftar) : x;
  }
}
