/**
 * Lab Susun-Urai (Kelas 4 Bab 1, Sub-Bab D: Komposisi dan Dekomposisi Bilangan sampai 10.000): logika murni.
 * Satu alat, tiga tampilan.
 *  Susun : komposisi. Banyak keping ribuan, ratusan, puluhan, dan satuan boleh lebih dari 9 (cara tak baku).
 *          Bilangan DIHITUNG dari jumlah semua keping. "Kelompokkan" menukar 10 keping menjadi 1 keping
 *          tempat di kirinya; bilangannya tidak berubah.
 *  Urai  : dekomposisi. Bilangan sasaran diurai dengan keping. Uraian diterima bila jumlahnya sama dengan
 *          sasaran (dicek balik), baik menurut tempat (baku) maupun cara lain. "Tulis nol" menampilkan suku 0.
 *  Uang  : pecahan Rp5.000, Rp2.000, Rp1.000, Rp500, dan Rp100 disusun sampai sama dengan Rp7.300 atau Rp10.000.
 * Penjumlahan bersusun dengan menyimpan baru dipakai di Sub-Bab E.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k4b1.mjs.
 */

export const NAMA_KEPING = ["ribuan", "ratusan", "puluhan", "satuan"] as const;
export const BOBOT_D = [1000, 100, 10, 1];
export const MAKS_KEPING = 20;
export const BATAS_D = 10000;

export type Keping = [number, number, number, number];
export const jumlahKeping = (k: readonly number[]): number => k.reduce((s, v, i) => s + v * BOBOT_D[i], 0);
export const lambangD = (n: number): string => (n >= 1000 ? `${Math.floor(n / 1000)}.${String(n % 1000).padStart(3, "0")}` : String(n));
export const bakuDari = (n: number): Keping => [Math.floor(n / 1000), Math.floor(n / 100) % 10, Math.floor(n / 10) % 10, n % 10];
/** Baku: setiap tempat paling banyak 9 keping (ribuan boleh 10 untuk 10.000). */
export const kepingBaku = (k: readonly number[]): boolean => k.slice(1).every((v) => v <= 9) && k[0] <= 10;

/** Suku uraian dari keping: tiap tempat menjadi satu suku. Tanpa nol kecuali `nol` = true. */
export function sukuUraian(k: readonly number[], nol: boolean): string[] {
  const suku = k.map((v, i) => v * BOBOT_D[i]);
  return suku.filter((s, i) => nol || s !== 0 || (i === 3 && suku.every((t) => t === 0))).map(lambangD);
}

/** Kelompokkan: 10 keping ditukar 1 keping tempat di kirinya, dari satuan ke ribuan. Jumlah tetap. */
export function kelompokkan(k: readonly number[]): Keping {
  const out = [...k] as Keping;
  for (let i = 3; i >= 1; i -= 1) {
    out[i - 1] += Math.floor(out[i] / 10);
    out[i] %= 10;
  }
  return out;
}

export const SASARAN_URAI = [6849, 6035, 3035, 7020];
export const PATOKAN_SUSUN = [6348, 9999, 7300];

export const PECAHAN = [5000, 2000, 1000, 500, 100];
export const SASARAN_UANG = [7300, 10000];
export const jumlahUang = (u: readonly number[]): number => u.reduce((s, v, i) => s + v * PECAHAN[i], 0);
export const tandaUang = (u: readonly number[]): string => u.join("-");

/* ------------------------------ Keadaan ------------------------------ */

export type StateSusunK4B1D = {
  susun: Keping;
  urai: Keping;
  sasaran: number;
  nol: boolean;
  uang: number[];
  sasaranUang: number;
  pernah: string[];
  pesan: string;
};

export type AksiSusunK4B1D =
  | { t: "SUSUN"; i: number; d: 1 | -1 }
  | { t: "KELOMPOK" }
  | { t: "URAI"; i: number; d: 1 | -1 }
  | { t: "SASARAN"; d: 1 | -1 }
  | { t: "NOL" }
  | { t: "UANG"; i: number; d: 1 | -1 }
  | { t: "SASARAN_UANG"; d: 1 | -1 }
  | { t: "RESET" };

export const awalSusunK4B1D = (): StateSusunK4B1D => ({
  susun: [5, 12, 4, 8],
  urai: [0, 0, 0, 0],
  sasaran: 0,
  nol: false,
  uang: [0, 0, 0, 0, 0],
  sasaranUang: 0,
  pernah: [],
  pesan: "",
});

const tambah = (daftar: string[], id: string): string[] => (daftar.includes(id) ? daftar : [...daftar, id]);

function catat(x: StateSusunK4B1D): StateSusunK4B1D {
  let p = x.pernah;
  const ns = jumlahKeping(x.susun);
  if (PATOKAN_SUSUN.includes(ns)) p = tambah(p, `susun:${ns}`);
  const sas = SASARAN_URAI[x.sasaran];
  if (jumlahKeping(x.urai) === sas) {
    const baku = kepingBaku(x.urai);
    p = tambah(p, `urai:${sas}:${baku ? "baku" : "lain"}`);
    if (baku && x.nol && String(sas).includes("0")) p = tambah(p, `urai-nol:${sas}`);
  }
  const su = SASARAN_UANG[x.sasaranUang];
  if (jumlahUang(x.uang) === su) {
    p = tambah(p, `uang:${su}`);
    p = tambah(p, `uang-cara:${su}:${tandaUang(x.uang)}`);
  }
  return p === x.pernah ? x : { ...x, pernah: p };
}

function ubahKeping(k: Keping, i: number, d: 1 | -1): Keping | string {
  if (i < 0 || i > 3) return "Tempat tidak dikenal.";
  const v = k[i] + d;
  if (v < 0) return `Tidak ada keping ${NAMA_KEPING[i]} untuk diambil.`;
  if (v > MAKS_KEPING) return `Di lab ini, paling banyak ${MAKS_KEPING} keping ${NAMA_KEPING[i]}.`;
  const baru = k.map((w, j) => (j === i ? v : w)) as Keping;
  if (jumlahKeping(baru) > BATAS_D) return `Batas bab ini ${lambangD(BATAS_D)}.`;
  return baru;
}

export function langkahSusunK4B1D(x: StateSusunK4B1D, a: AksiSusunK4B1D): StateSusunK4B1D {
  switch (a.t) {
    case "SUSUN": {
      const k = ubahKeping(x.susun, a.i, a.d);
      return typeof k === "string" ? { ...x, pesan: k } : catat({ ...x, susun: k, pesan: "" });
    }
    case "KELOMPOK": {
      if (kepingBaku(x.susun)) return { ...x, pesan: "Setiap tempat sudah paling banyak 9 keping. Tidak ada yang perlu dikelompokkan." };
      const k = kelompokkan(x.susun);
      return catat({ ...x, susun: k, pernah: tambah(x.pernah, "kelompok"), pesan: `🔄 Dikelompokkan. Bilangannya tetap ${lambangD(jumlahKeping(k))}.` });
    }
    case "URAI": {
      const k = ubahKeping(x.urai, a.i, a.d);
      return typeof k === "string" ? { ...x, pesan: k } : catat({ ...x, urai: k, pesan: "" });
    }
    case "SASARAN":
      return { ...x, sasaran: (x.sasaran + a.d + SASARAN_URAI.length) % SASARAN_URAI.length, urai: [0, 0, 0, 0], pesan: "" };
    case "NOL":
      return catat({ ...x, nol: !x.nol, pesan: "" });
    case "UANG": {
      if (a.i < 0 || a.i >= PECAHAN.length) return x;
      const v = x.uang[a.i] + a.d;
      if (v < 0) return { ...x, pesan: "Tidak ada uang pecahan itu untuk diambil." };
      const uang = x.uang.map((w, j) => (j === a.i ? v : w));
      if (jumlahUang(uang) > BATAS_D) return { ...x, pesan: `Batas bab ini ${lambangD(BATAS_D)} rupiah.` };
      return catat({ ...x, uang, pesan: "" });
    }
    case "SASARAN_UANG":
      return { ...x, sasaranUang: (x.sasaranUang + a.d + SASARAN_UANG.length) % SASARAN_UANG.length, uang: [0, 0, 0, 0, 0], pesan: "" };
    case "RESET":
      return awalSusunK4B1D();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanSusunK4B1D = { alat: "susun"; pernah: string[] };
export const keadaanSusunK4B1D = (x: StateSusunK4B1D): KeadaanSusunK4B1D => ({ alat: "susun", pernah: x.pernah });

/** Kalimat komposisi: "5.000 + 1.200 + 40 + 8 = 6.248". */
export const kalimatSusun = (k: readonly number[]): string => `${sukuUraian(k, false).join(" + ")} = ${lambangD(jumlahKeping(k))}`;

/** Status urai: jumlah keping dibanding sasaran. */
export function statusUrai(k: readonly number[], sasaran: number): { jumlah: number; cocok: boolean; selisih: number } {
  const j = jumlahKeping(k);
  return { jumlah: j, cocok: j === sasaran, selisih: sasaran - j };
}

export const teksUang = (n: number): string => `Rp${lambangD(n)}`;

export function ucapSusunK4B1D(x: StateSusunK4B1D): string {
  return `Keping ${x.susun.map((v, i) => `${v} ${NAMA_KEPING[i]}`).join(", ")}. ${kalimatSusun(x.susun)}.`;
}

export function ucapUraiK4B1D(x: StateSusunK4B1D): string {
  const sas = SASARAN_URAI[x.sasaran];
  const s = statusUrai(x.urai, sas);
  if (s.cocok) return `Uraian ${sukuUraian(x.urai, x.nol).join(" + ")} berjumlah ${lambangD(sas)}. Cocok dengan bilangan semula.`;
  return `Urai ${lambangD(sas)}. Jumlah kepingmu sekarang ${lambangD(s.jumlah)}.`;
}

export function ucapUangK4B1D(x: StateSusunK4B1D): string {
  const sas = SASARAN_UANG[x.sasaranUang];
  const j = jumlahUang(x.uang);
  return j === sas ? `Pas! Jumlah uangnya ${teksUang(sas)}.` : `Susun uang ${teksUang(sas)}. Sekarang ${teksUang(j)}.`;
}
