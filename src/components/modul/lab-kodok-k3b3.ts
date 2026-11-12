/**
 * Lab Timbangan Kodok (Kelas 3 Bab 3, Sub-Bab D): logika murni. Dua bagian dalam satu alat.
 *  Bandul : benda ditimbang dengan bandul 1/2 ons (50 g), 1 ons (100 g), 2 ons (200 g), 1/2 kg (500 g), dan 1 kg (1.000 g).
 *           Timbangan seimbang bila jumlah berat bandul tepat sama dengan berat benda. Banyak susunan yang benar.
 *  Ubah   : berat dalam gram diubah ke kilogram dan gram, dan dalam ons. 1 kg = 10 ons = 1.000 g, 1 ons = 100 g.
 * Berat disimpan dalam gram. Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k3b3.mjs.
 */

export type BandulDef = { id: string; nama: string; g: number };
export const BANDUL: BandulDef[] = [
  { id: "setengahOns", nama: "½ ons", g: 50 },
  { id: "ons", nama: "1 ons", g: 100 },
  { id: "duaOns", nama: "2 ons", g: 200 },
  { id: "setengahKg", nama: "½ kg", g: 500 },
  { id: "kg", nama: "1 kg", g: 1000 },
];

export type BendaKodok = { id: string; nama: string; g: number };
export const BENDA_KODOK: BendaKodok[] = [
  { id: "pisang", nama: "Pisang", g: 450 },
  { id: "tepung", nama: "Tepung", g: 750 },
  { id: "gula", nama: "Gula", g: 1250 },
  { id: "beras", nama: "Beras", g: 1750 },
  { id: "jeruk", nama: "Jeruk", g: 2000 },
];

export const cariBendaKodok = (id: string): BendaKodok => BENDA_KODOK.find((b) => b.id === id) ?? BENDA_KODOK[0];

export const MAKS_BANDUL = 10;
export const MAKS_UBAH = 20000;

export const titikKodok = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export type TampilUbah = { gram: boolean; ons: boolean; kgg: boolean };
export type LangkahKodok = 1 | -1 | 10 | -10;

export type StateKodok = {
  benda: string;
  jumlah: number[];
  /** Berat yang diubah satuannya, dalam gram (0 sampai 20.000). */
  total: number;
  tampil: TampilUbah;
  /** "benda|jumlah,jumlah,..." untuk setiap susunan bandul yang pernah seimbang. */
  pernah: string[];
  pesan: string;
};

export type AksiKodok =
  | { t: "BENDA"; id: string }
  | { t: "BANDUL"; i: number; d: 1 | -1 }
  | { t: "KOSONG" }
  | { t: "UBAH"; satuan: "kg" | "g"; d: LangkahKodok }
  | { t: "TOGGLE"; rep: keyof TampilUbah }
  | { t: "RESET" };

export const awalKodok = (): StateKodok => ({ benda: "tepung", jumlah: [0, 0, 0, 0, 0], total: 0, tampil: { gram: false, ons: false, kgg: false }, pernah: [], pesan: "" });

export const jumlahBandulG = (jumlah: readonly number[]): number => jumlah.reduce((s, n, i) => s + n * BANDUL[i].g, 0);
export const seimbangKodok = (x: Pick<StateKodok, "benda" | "jumlah">): boolean => jumlahBandulG(x.jumlah) === cariBendaKodok(x.benda).g;
export const banyakBandul = (jumlah: readonly number[]): number => jumlah.reduce((s, n) => s + n, 0);

export type ArahNeraca = "seimbang" | "benda-berat" | "bandul-berat";
export function arahKodok(x: Pick<StateKodok, "benda" | "jumlah">): ArahNeraca {
  const b = cariBendaKodok(x.benda).g;
  const j = jumlahBandulG(x.jumlah);
  return j === b ? "seimbang" : j < b ? "benda-berat" : "bandul-berat";
}

/** Susunan seimbang disebut dengan nama bandul, mis. "½ kg + 2 ons + ½ ons". */
export function teksSusunan(jumlah: readonly number[]): string {
  const bagian: string[] = [];
  for (let i = BANDUL.length - 1; i >= 0; i -= 1) if (jumlah[i] > 0) bagian.push(jumlah[i] === 1 ? BANDUL[i].nama : `${jumlah[i]} × ${BANDUL[i].nama}`);
  return bagian.length === 0 ? "belum ada bandul" : bagian.join(" + ");
}

const kunciSusunan = (benda: string, jumlah: readonly number[]): string => `${benda}|${jumlah.join(",")}`;

/** Jumlah susunan seimbang berbeda yang pernah dicatat untuk satu benda. */
export const susunanBenda = (pernah: readonly string[], benda: string): number => pernah.filter((p) => p.startsWith(`${benda}|`)).length;

/** Banyak cara memilih bandul (masing-masing 0 sampai 10) yang jumlahnya tepat sama dengan g gram. Untuk uji dan petunjuk. */
export function hitungSusunan(g: number): number {
  let cara = 0;
  const cari = (i: number, sisa: number) => {
    if (i === BANDUL.length) {
      if (sisa === 0) cara += 1;
      return;
    }
    for (let n = 0; n <= MAKS_BANDUL && n * BANDUL[i].g <= sisa; n += 1) cari(i + 1, sisa - n * BANDUL[i].g);
  };
  cari(0, g);
  return cara;
}

const catat = (x: StateKodok): StateKodok => {
  if (!seimbangKodok(x)) return x;
  const k = kunciSusunan(x.benda, x.jumlah);
  return x.pernah.includes(k) ? x : { ...x, pernah: [...x.pernah, k].slice(-60) };
};

/** Satuan: kilogram dan gram. 1.753 g = 1 kg 753 g. */
export function teksKgG(g: number): string {
  const kg = Math.floor(g / 1000);
  const s = g % 1000;
  if (kg === 0) return `${s} g`;
  return s === 0 ? `${kg} kg` : `${kg} kg ${s} g`;
}

/** Ons: tiap 100 g satu ons. */
export function teksOns(g: number): string {
  const o = Math.floor(g / 100);
  const s = g % 100;
  if (o === 0) return `${s} g (belum sampai 1 ons)`;
  return s === 0 ? `${o} ons` : `${o} ons ${s} g`;
}

export function teksUbahBerat(g: number): string {
  if (g === 0) return "Belum ada berat.";
  const kg = Math.floor(g / 1000);
  const s = g % 1000;
  if (kg === 0) return `${g} g kurang dari 1.000 g, jadi belum sampai 1 kg.`;
  if (s === 0) return `${kg} kg = ${kg} × 1.000 g = ${titikKodok(g)} g. Sebaliknya ${titikKodok(g)} g : 1.000 = ${kg} kg.`;
  return `${titikKodok(g)} g = ${titikKodok(kg * 1000)} g + ${s} g = ${kg} kg ${s} g.`;
}

export function langkahKodok(x: StateKodok, a: AksiKodok): StateKodok {
  switch (a.t) {
    case "BENDA":
      return !BENDA_KODOK.some((b) => b.id === a.id) || a.id === x.benda ? x : { ...x, benda: a.id, jumlah: [0, 0, 0, 0, 0], pesan: "" };
    case "BANDUL": {
      if (a.i < 0 || a.i >= BANDUL.length) return x;
      const baru = x.jumlah[a.i] + a.d;
      if (baru < 0) return { ...x, pesan: `Tidak ada bandul ${BANDUL[a.i].nama} yang bisa diambil.` };
      if (baru > MAKS_BANDUL) return { ...x, pesan: `Paling banyak ${MAKS_BANDUL} bandul ${BANDUL[a.i].nama}.` };
      return catat({ ...x, jumlah: x.jumlah.map((n, i) => (i === a.i ? baru : n)), pesan: "" });
    }
    case "KOSONG":
      return { ...x, jumlah: [0, 0, 0, 0, 0], pesan: "" };
    case "UBAH": {
      const baru = x.total + a.d * (a.satuan === "kg" ? 1000 : 1);
      if (baru < 0) return { ...x, pesan: "Berat tidak di bawah nol." };
      if (baru > MAKS_UBAH) return { ...x, pesan: "Berat paling besar 20.000 g (20 kg) di bab ini." };
      return { ...x, total: baru, pesan: "" };
    }
    case "TOGGLE":
      return { ...x, tampil: { ...x.tampil, [a.rep]: !x.tampil[a.rep] }, pesan: "" };
    case "RESET":
      return awalKodok();
  }
}

export type KeadaanKodok = { alat: "kodok"; benda: string; g: number; jumlah: number[]; jumlahG: number; seimbang: boolean; pernah: string[] };
export type KeadaanUbah = { alat: "ubahberat"; total: number; gram: boolean; ons: boolean; kgg: boolean };

export const keadaanKodok = (x: StateKodok): KeadaanKodok => ({ alat: "kodok", benda: x.benda, g: cariBendaKodok(x.benda).g, jumlah: x.jumlah, jumlahG: jumlahBandulG(x.jumlah), seimbang: seimbangKodok(x), pernah: x.pernah });
export const keadaanUbah = (x: StateKodok): KeadaanUbah => ({ alat: "ubahberat", total: x.total, gram: x.tampil.gram, ons: x.tampil.ons, kgg: x.tampil.kgg });

export function ucapKodok(x: StateKodok): string {
  const b = cariBendaKodok(x.benda);
  const j = jumlahBandulG(x.jumlah);
  const arah = arahKodok(x);
  if (arah === "seimbang") return `Seimbang! ${b.nama} beratnya ${b.g} gram, sama dengan jumlah bandul ${teksSusunan(x.jumlah)}.`;
  if (j === 0) return `${b.nama} beratnya ${b.g} gram. Tambahkan bandul di sisi lain sampai timbangan seimbang.`;
  return arah === "benda-berat" ? `Bandul baru ${j} gram. ${b.nama} masih lebih berat. Tambah bandul.` : `Bandul sudah ${j} gram, lebih berat dari ${b.nama}. Kurangi bandul.`;
}

export function ucapUbah(x: StateKodok): string {
  if (x.total === 0) return "Belum ada berat. Atur kilogram dan gramnya.";
  return `${x.total} gram sama dengan ${Math.floor(x.total / 1000)} kilogram ${x.total % 1000} gram. Satu kilogram sama dengan seribu gram, sama dengan sepuluh ons.`;
}
