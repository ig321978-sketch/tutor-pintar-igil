/**
 * Lab Batang (Kelas 4 Bab 2, Sub-Bab B: Pecahan dengan Penyebut Sama): logika murni. Satu alat, tiga tampilan.
 *  Baca    : batang dibagi q bagian, p bagian diarsir (1 sampai q − 1). Pecahan p/q DIHITUNG dan dibaca.
 *  Banding : dua batang. Bila penyebut kedua batang sama, tanda dihitung dari pembilang. Bila penyebut berbeda,
 *            lab menolak membandingkan lewat pembilang karena bagiannya tidak sama besar.
 *  Urut    : pecahan 1/q sampai (q − 1)/q diketuk dari yang terkecil atau terbesar; lab menolak urutan keliru.
 * Pecahan senilai, desimal, dan persen baru dipakai di sub-bab berikutnya.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k4b2.mjs.
 */

export const MIN_PENYEBUT = 2;
export const MAKS_PENYEBUT = 12;
export const MIN_URUT = 3;
export const MAKS_URUT = 8;

export type TandaB = "<" | ">" | "=";

/** Tanda p1/q dibanding p2/q untuk penyebut sama: dari pembilang (perkalian silang p1 × q dan p2 × q). */
export function tandaSama(p1: number, p2: number, q: number): TandaB {
  const kiri = p1 * q;
  const kanan = p2 * q;
  return kiri > kanan ? ">" : kiri < kanan ? "<" : "=";
}

export const pasangB = (p1: number, p2: number, q: number): string => `pasang:${Math.min(p1, p2)}:${Math.max(p1, p2)}:${q}`;

/** Urutan tampil pecahan pada tampilan Urut: pembilang 1 sampai q − 1, diputar sehingga tidak langsung terurut. */
export function urutanTampil(q: number): number[] {
  const item = Array.from({ length: q - 1 }, (_, i) => i + 1);
  const geser = Math.max(1, Math.floor(item.length / 2));
  return item.map((_, i) => item[(i + geser) % item.length]);
}

export function kalimatSama(p1: number, p2: number, q: number): string {
  const t = tandaSama(p1, p2, q);
  if (t === "=") return `${p1}/${q} sama dengan ${p2}/${q}: pembilangnya sama.`;
  return `${p1}/${q} ${t} ${p2}/${q}. Penyebutnya sama, jadi lihat pembilang: ${p1} ${t} ${p2}.`;
}

/* ------------------------------ Keadaan ------------------------------ */

export type ArahUrutB = "naik" | "turun";

export type StateBatangK4B2B = {
  q: number;
  p: number;
  q1: number;
  p1: number;
  q2: number;
  p2: number;
  qu: number;
  arah: ArahUrutB;
  dipilih: number[];
  pernah: string[];
  pesan: string;
};

export type AksiBatangK4B2B =
  | { t: "BACA_Q"; d: 1 | -1 }
  | { t: "BACA_P"; d: 1 | -1 }
  | { t: "Q1"; d: 1 | -1 }
  | { t: "P1"; d: 1 | -1 }
  | { t: "Q2"; d: 1 | -1 }
  | { t: "P2"; d: 1 | -1 }
  | { t: "URUT_Q"; d: 1 | -1 }
  | { t: "ARAH"; arah: ArahUrutB }
  | { t: "KETUK"; i: number }
  | { t: "ULANG_URUT" }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalBatangK4B2B = (): StateBatangK4B2B => ({ q: 5, p: 2, q1: 4, p1: 1, q2: 4, p2: 3, qu: 5, arah: "naik", dipilih: [], pernah: [], pesan: "" });

const tambah = (daftar: string[], id: string): string[] => (daftar.includes(id) ? daftar : [...daftar, id]);
const klem = (p: number, q: number): number => Math.max(1, Math.min(q - 1, p));

function catatBanding(x: StateBatangK4B2B): StateBatangK4B2B {
  if (x.q1 !== x.q2) {
    return { ...x, pernah: tambah(x.pernah, "beda-penyebut"), pesan: `Penyebutnya berbeda (${x.q1} dan ${x.q2}), jadi bagiannya tidak sama besar. Samakan dulu penyebutnya sebelum membandingkan pembilang.` };
  }
  let p = tambah(tambah(x.pernah, pasangB(x.p1, x.p2, x.q1)), `tanda:${tandaSama(x.p1, x.p2, x.q1)}`);
  p = tambah(p, `penyebut:${x.q1}`);
  return { ...x, pernah: p, pesan: `✅ ${kalimatSama(x.p1, x.p2, x.q1)}` };
}

export function langkahBatangK4B2B(x: StateBatangK4B2B, a: AksiBatangK4B2B): StateBatangK4B2B {
  const luar = (v: number) => v < MIN_PENYEBUT || v > MAKS_PENYEBUT;
  switch (a.t) {
    case "BACA_Q": {
      const v = x.q + a.d;
      if (luar(v)) return { ...x, pesan: `Penyebut ${MIN_PENYEBUT} sampai ${MAKS_PENYEBUT}.` };
      const p = klem(x.p, v);
      return { ...x, q: v, p, pernah: tambah(x.pernah, `baca:${p}/${v}`), pesan: "" };
    }
    case "BACA_P": {
      const v = x.p + a.d;
      if (v < 1 || v > x.q - 1) return { ...x, pesan: `Bagian yang diarsir 1 sampai ${x.q - 1} (pecahan lebih kecil dari satu).` };
      return { ...x, p: v, pernah: tambah(x.pernah, `baca:${v}/${x.q}`), pesan: "" };
    }
    case "Q1": {
      const v = x.q1 + a.d;
      if (luar(v)) return { ...x, pesan: `Penyebut ${MIN_PENYEBUT} sampai ${MAKS_PENYEBUT}.` };
      return catatBanding({ ...x, q1: v, p1: klem(x.p1, v) });
    }
    case "Q2": {
      const v = x.q2 + a.d;
      if (luar(v)) return { ...x, pesan: `Penyebut ${MIN_PENYEBUT} sampai ${MAKS_PENYEBUT}.` };
      return catatBanding({ ...x, q2: v, p2: klem(x.p2, v) });
    }
    case "P1": {
      const v = x.p1 + a.d;
      if (v < 1 || v > x.q1 - 1) return { ...x, pesan: `Bagian yang diarsir 1 sampai ${x.q1 - 1}.` };
      return catatBanding({ ...x, p1: v });
    }
    case "P2": {
      const v = x.p2 + a.d;
      if (v < 1 || v > x.q2 - 1) return { ...x, pesan: `Bagian yang diarsir 1 sampai ${x.q2 - 1}.` };
      return catatBanding({ ...x, p2: v });
    }
    case "URUT_Q": {
      const v = x.qu + a.d;
      if (v < MIN_URUT || v > MAKS_URUT) return { ...x, pesan: `Urutan untuk penyebut ${MIN_URUT} sampai ${MAKS_URUT}.` };
      return { ...x, qu: v, dipilih: [], pesan: "" };
    }
    case "ARAH":
      return { ...x, arah: a.arah, dipilih: [], pesan: "" };
    case "KETUK": {
      const tampil = urutanTampil(x.qu);
      if (a.i < 0 || a.i >= tampil.length) return x;
      if (x.dipilih.includes(a.i)) return { ...x, pesan: `${tampil[a.i]}/${x.qu} sudah diurutkan.` };
      const sisa = tampil.map((_, i) => i).filter((i) => !x.dipilih.includes(i));
      const nilai = sisa.map((i) => tampil[i]);
      const harus = x.arah === "naik" ? Math.min(...nilai) : Math.max(...nilai);
      if (tampil[a.i] !== harus) {
        return {
          ...x,
          pernah: tambah(x.pernah, "urut-tolak"),
          pesan: `${tampil[a.i]}/${x.qu} belum yang ${x.arah === "naik" ? "terkecil" : "terbesar"}. Penyebutnya sama, jadi cari pembilang paling ${x.arah === "naik" ? "kecil" : "besar"}: ${harus}.`,
        };
      }
      const dipilih = [...x.dipilih, a.i];
      const selesai = dipilih.length === tampil.length;
      return {
        ...x,
        dipilih,
        pernah: selesai ? tambah(x.pernah, `urut:${x.qu}:${x.arah}`) : x.pernah,
        pesan: selesai ? `✅ Urutan ${x.arah}: ${dipilih.map((i) => `${tampil[i]}/${x.qu}`).join(", ")}.` : "",
      };
    }
    case "ULANG_URUT":
      return { ...x, dipilih: [], pesan: "" };
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalBatangK4B2B();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanBatangK4B2B = { alat: "batang"; pernah: string[] };
export const keadaanBatangK4B2B = (x: StateBatangK4B2B): KeadaanBatangK4B2B => ({ alat: "batang", pernah: x.pernah });

export const ucapBacaK4B2B = (x: StateBatangK4B2B): string => `Batang dibagi ${x.q} bagian sama besar, ${x.p} bagian diarsir. Ditulis ${x.p}/${x.q}. Pembilangnya ${x.p}, penyebutnya ${x.q}.`;

export function ucapBandingK4B2B(x: StateBatangK4B2B): string {
  if (x.q1 !== x.q2) return `Penyebutnya berbeda, ${x.q1} dan ${x.q2}. Samakan dulu penyebutnya.`;
  return kalimatSama(x.p1, x.p2, x.q1);
}

export const ucapUrutK4B2B = (x: StateBatangK4B2B): string => `Urutkan pecahan berpenyebut ${x.qu} dari ${x.arah === "naik" ? "terkecil" : "terbesar"}. Penyebutnya sama, jadi lihat pembilangnya.`;
