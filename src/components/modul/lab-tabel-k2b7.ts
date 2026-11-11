/**
 * Tabel Seratus (Kelas 2 Bab 7, Sub-Bab A): lab 2D di atas tabel 1 sampai 100 (sepuluh kolom).
 * Satu penanda bergerak di tabel. Turun satu baris menambah sepuluh, naik satu baris mengurangi sepuluh, geser satu
 * kotak ke kanan menambah satu, ke kiri mengurangi satu. Pada tabel ini bilangan sekolom selalu berselisih sepuluh
 * dan satuannya sama. Penanda tidak melompati ujung baris: ujung baris adalah batas, bukan "tambah satu".
 * Murni: tanpa React, tanpa jaringan, tanpa impor nilai. Diuji di scripts/uji-lab-k2b7.mjs.
 */

import type { ArahTabelMisi, KeadaanLabTabel } from "./misi-k2bab7";

export type ArahTabel = ArahTabelMisi;
export const URUT_ARAH_TABEL: ArahTabel[] = ["atas", "bawah", "kiri", "kanan"];
export const MAKS_TABEL = 100;
export const KOLOM_TABEL = 10;

const KATA_SATUAN = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];

/** Nama bilangan 1 sampai 100. */
export function namaTabel(n: number): string {
  if (n === 100) return "seratus";
  if (n < 10) return KATA_SATUAN[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${KATA_SATUAN[n - 10]} belas`;
  const p = Math.floor(n / 10);
  const s = n % 10;
  return `${KATA_SATUAN[p]} puluh${s ? ` ${KATA_SATUAN[s]}` : ""}`;
}

export type LabTabel = {
  n: number;
  tetangga: boolean;
  jejak: boolean;
  kolom: boolean;
  /** Kotak yang dilewati sejak ketukan kotak terakhir (termasuk kotak awal). */
  lintasan: number[];
  lariBawah: number;
  lariAtas: number;
  terbaikBawah: number;
  terbaikAtas: number;
  ketuk: number[];
  arah: ArahTabel[];
  catatan: string;
};

export const AWAL_TABEL = 23;

export const awalTabel = (): LabTabel => ({
  n: AWAL_TABEL,
  tetangga: false,
  jejak: false,
  kolom: false,
  lintasan: [AWAL_TABEL],
  lariBawah: 0,
  lariAtas: 0,
  terbaikBawah: 0,
  terbaikAtas: 0,
  ketuk: [],
  arah: [],
  catatan: "",
});

/** Nomor kolom 1 sampai 10 dan baris 1 sampai 10. */
export const kolomTabel = (n: number): number => ((n - 1) % KOLOM_TABEL) + 1;
export const barisTabel = (n: number): number => Math.floor((n - 1) / KOLOM_TABEL) + 1;

/** Kotak di arah tertentu, atau null bila itu batas tabel (atas, bawah, awal baris, ujung baris). */
export function tetanggaDi(n: number, arah: ArahTabel): number | null {
  if (arah === "atas") return n - 10 >= 1 ? n - 10 : null;
  if (arah === "bawah") return n + 10 <= MAKS_TABEL ? n + 10 : null;
  if (arah === "kiri") return kolomTabel(n) > 1 ? n - 1 : null;
  return kolomTabel(n) < KOLOM_TABEL ? n + 1 : null;
}

export const bisaGerakTabel = (l: LabTabel, arah: ArahTabel): boolean => tetanggaDi(l.n, arah) !== null;

const tambahUnik = <T,>(a: T[], x: T): T[] => (a.includes(x) ? a : [...a, x]);

function pesanBatas(n: number, arah: ArahTabel): string {
  if (arah === "atas") return "Sudah di baris paling atas.";
  if (arah === "bawah") return "Sudah di baris paling bawah.";
  if (arah === "kiri") return n === 1 ? "Satu adalah bilangan pertama." : `Ini awal baris. Bilangan sebelumnya, ${n - 1}, ada di ujung baris di atas.`;
  return n === MAKS_TABEL ? "Seratus adalah bilangan terakhir." : `Ini ujung baris. Bilangan berikutnya, ${n + 1}, ada di awal baris di bawah.`;
}

/** Menggeser penanda satu kotak. Di batas, penanda diam dan ada penjelasan. */
export function gerakTabel(l: LabTabel, arah: ArahTabel): LabTabel {
  const ke = tetanggaDi(l.n, arah);
  if (ke === null) return { ...l, catatan: pesanBatas(l.n, arah) };
  const dari = l.n;
  const lariBawah = arah === "bawah" ? l.lariBawah + 1 : 0;
  const lariAtas = arah === "atas" ? l.lariAtas + 1 : 0;
  const catatan =
    arah === "bawah"
      ? `Turun satu baris: ${dari} menjadi ${ke}. Bertambah sepuluh.`
      : arah === "atas"
        ? `Naik satu baris: ${dari} menjadi ${ke}. Berkurang sepuluh.`
        : arah === "kanan"
          ? `Geser ke kanan: ${dari} menjadi ${ke}. Bertambah satu.`
          : `Geser ke kiri: ${dari} menjadi ${ke}. Berkurang satu.`;
  return {
    ...l,
    n: ke,
    lintasan: [...l.lintasan, ke].slice(-30),
    lariBawah,
    lariAtas,
    terbaikBawah: Math.max(l.terbaikBawah, lariBawah),
    terbaikAtas: Math.max(l.terbaikAtas, lariAtas),
    arah: tambahUnik(l.arah, arah),
    catatan,
  };
}

/** Mengetuk sebuah kotak: penanda pindah, lintasan dimulai ulang. */
export function ketukKotakTabel(l: LabTabel, k: number): LabTabel {
  if (!Number.isInteger(k) || k < 1 || k > MAKS_TABEL) return l;
  return { ...l, n: k, lintasan: [k], lariBawah: 0, lariAtas: 0, ketuk: tambahUnik(l.ketuk, k), catatan: `Kotak ${k}: ${namaTabel(k)}.` };
}

export type TampilTabel = "tetangga" | "jejak" | "kolom";
export const nyalakanTabel = (l: LabTabel, kunci: TampilTabel, nyala: boolean): LabTabel => ({ ...l, [kunci]: nyala });

/** Mengembalikan model dan semua pilihan tampilan ke awal. */
export const resetTabel = (): LabTabel => awalTabel();

/** Empat tetangga (null bila batas tabel). */
export const tetanggaTabel = (l: LabTabel): Record<ArahTabel, number | null> => ({
  atas: tetanggaDi(l.n, "atas"),
  bawah: tetanggaDi(l.n, "bawah"),
  kiri: tetanggaDi(l.n, "kiri"),
  kanan: tetanggaDi(l.n, "kanan"),
});

/** Semua bilangan sekolom dengan n (berselisih sepuluh, satuan sama). */
export function bilanganSekolom(n: number): number[] {
  const k = kolomTabel(n);
  return Array.from({ length: 10 }, (_, i) => k + i * 10);
}

/** Kalimat penanda, ditambah tetangga dan kolom bila perwakilannya menyala. */
export function kalimatTabel(l: LabTabel): string {
  let t = `Kotak ${l.n}: ${namaTabel(l.n)}.`;
  if (l.tetangga) {
    const x = tetanggaTabel(l);
    const bagian: string[] = [];
    if (x.atas !== null) bagian.push(`di atasnya ${x.atas}`);
    if (x.bawah !== null) bagian.push(`di bawahnya ${x.bawah}`);
    if (x.kiri !== null) bagian.push(`di kirinya ${x.kiri}`);
    if (x.kanan !== null) bagian.push(`di kanannya ${x.kanan}`);
    t += ` ${bagian.length ? `${bagian.join(", ")}.` : ""}`.trimEnd();
  }
  if (l.kolom) {
    t += ` Bilangan sekolom dengan ${l.n} selalu berselisih sepuluh dan satuannya sama: ${bilanganSekolom(l.n).join(", ")}.`;
  }
  return t;
}

/** Laporan keadaan ke papan misi. */
export const laporanTabel = (l: LabTabel): KeadaanLabTabel => ({
  alat: "tabel",
  n: l.n,
  tetangga: l.tetangga,
  jejak: l.jejak,
  kolom: l.kolom,
  terbaikBawah: l.terbaikBawah,
  terbaikAtas: l.terbaikAtas,
  ketuk: l.ketuk,
  arah: l.arah,
});
