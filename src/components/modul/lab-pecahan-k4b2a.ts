/**
 * Lab Pecahan (Kelas 4 Bab 2, Sub-Bab A: Pecahan dengan Pembilang Satu): logika murni. Satu alat, tiga tampilan.
 *  Bagi    : keseluruhan dibagi n bagian (2 sampai 12). Satu bagian diarsir menjadi 1/n. Bila potongan digambar
 *            tidak sama besar, lab menolak menyebutnya 1/n.
 *  Banding : dua model satu per a dan satu per b berdampingan. Tanda DIHITUNG dengan perkalian silang
 *            (1 × b dibanding 1 × a) dan dijelaskan: penyebut lebih besar berarti tiap bagian lebih kecil.
 *  Garis   : garis 0 sampai 1 dibagi n sama panjang; 1/n adalah tanda pertama setelah 0.
 * Pecahan dengan pembilang lebih dari 1, penyebut sama, senilai, desimal, dan persen baru dipakai di sub-bab berikutnya.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k4b2.mjs.
 */

export const MIN_BAGIAN = 2;
export const MAKS_BAGIAN = 12;

export type TandaPecahan = "<" | ">" | "=";

/** Tanda 1/a dibanding 1/b memakai perkalian silang: 1 × b dibanding 1 × a. */
export function tandaUnit(a: number, b: number): TandaPecahan {
  const kiri = 1 * b;
  const kanan = 1 * a;
  return kiri > kanan ? ">" : kiri < kanan ? "<" : "=";
}

export const pasangKey = (a: number, b: number): string => `pasang:${Math.min(a, b)}:${Math.max(a, b)}`;

/** Kalimat perbandingan dengan alasan. */
export function kalimatBandingA(a: number, b: number): string {
  const t = tandaUnit(a, b);
  if (t === "=") return `1/${a} sama dengan 1/${b}: bagiannya sama banyak dan sama besar.`;
  const [besar, kecil] = t === ">" ? [a, b] : [b, a];
  return `1/${a} ${t} 1/${b}. ${besar} bagian lebih sedikit daripada ${kecil} bagian, jadi tiap bagian 1/${besar} lebih besar.`;
}

/* ------------------------------ Keadaan ------------------------------ */

export type StatePecahanK4B2A = {
  n: number;
  arsir: boolean;
  sama: boolean;
  a: number;
  b: number;
  g: number;
  titik: number | null;
  pernah: string[];
  pesan: string;
};

export type AksiPecahanK4B2A =
  | { t: "PENYEBUT"; d: 1 | -1 }
  | { t: "ARSIR" }
  | { t: "SAMA" }
  | { t: "KIRI"; d: 1 | -1 }
  | { t: "KANAN"; d: 1 | -1 }
  | { t: "GARIS"; d: 1 | -1 }
  | { t: "TITIK"; k: number }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalPecahanK4B2A = (): StatePecahanK4B2A => ({ n: 4, arsir: false, sama: true, a: 3, b: 5, g: 5, titik: null, pernah: [], pesan: "" });

const tambah = (daftar: string[], id: string): string[] => (daftar.includes(id) ? daftar : [...daftar, id]);
const dalam = (v: number): boolean => v >= MIN_BAGIAN && v <= MAKS_BAGIAN;

function catatBagi(x: StatePecahanK4B2A): StatePecahanK4B2A {
  return x.arsir && x.sama && !x.pernah.includes(`unit:${x.n}`) ? { ...x, pernah: tambah(x.pernah, `unit:${x.n}`) } : x;
}

function catatBanding(x: StatePecahanK4B2A): StatePecahanK4B2A {
  const p = tambah(tambah(x.pernah, pasangKey(x.a, x.b)), `tanda:${tandaUnit(x.a, x.b)}`);
  return { ...x, pernah: p, pesan: `✅ ${kalimatBandingA(x.a, x.b)}` };
}

export function langkahPecahanK4B2A(x: StatePecahanK4B2A, a: AksiPecahanK4B2A): StatePecahanK4B2A {
  switch (a.t) {
    case "PENYEBUT": {
      const v = x.n + a.d;
      if (!dalam(v)) return { ...x, pesan: `Banyak bagian ${MIN_BAGIAN} sampai ${MAKS_BAGIAN}.` };
      return { ...x, n: v, arsir: false, pesan: "" };
    }
    case "SAMA":
      return { ...x, sama: !x.sama, arsir: false, pesan: x.sama ? "Potongan sekarang tidak sama besar." : "" };
    case "ARSIR": {
      if (!x.sama) return { ...x, pernah: tambah(x.pernah, "tidak-sama"), pesan: "Potongannya tidak sama besar, jadi satu bagian belum bisa disebut satu per n. Potong sama besar dulu." };
      const arsir = !x.arsir;
      return catatBagi({ ...x, arsir, pesan: arsir ? `✅ 1 dari ${x.n} bagian sama besar: 1/${x.n}.` : "" });
    }
    case "KIRI": {
      const v = x.a + a.d;
      if (!dalam(v)) return { ...x, pesan: `Banyak bagian ${MIN_BAGIAN} sampai ${MAKS_BAGIAN}.` };
      return catatBanding({ ...x, a: v });
    }
    case "KANAN": {
      const v = x.b + a.d;
      if (!dalam(v)) return { ...x, pesan: `Banyak bagian ${MIN_BAGIAN} sampai ${MAKS_BAGIAN}.` };
      return catatBanding({ ...x, b: v });
    }
    case "GARIS": {
      const v = x.g + a.d;
      if (!dalam(v)) return { ...x, pesan: `Garis dibagi ${MIN_BAGIAN} sampai ${MAKS_BAGIAN} bagian.` };
      return { ...x, g: v, titik: null, pesan: "" };
    }
    case "TITIK": {
      if (a.k < 1 || a.k > x.g) return x;
      if (a.k !== 1) return { ...x, titik: a.k, pesan: `Itu tanda ke-${a.k} setelah 0. Satu per ${x.g} adalah tanda pertama setelah 0.` };
      return { ...x, titik: 1, pernah: tambah(x.pernah, `garis:${x.g}`), pesan: `✅ Tanda pertama setelah 0 adalah 1/${x.g}.` };
    }
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalPecahanK4B2A();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanPecahanK4B2A = { alat: "pecahan"; pernah: string[] };
export const keadaanPecahanK4B2A = (x: StatePecahanK4B2A): KeadaanPecahanK4B2A => ({ alat: "pecahan", pernah: x.pernah });

export function ucapBagiK4B2A(x: StatePecahanK4B2A): string {
  if (!x.sama) return `Potongan tidak sama besar, jadi belum bisa disebut satu per ${x.n}. Potong sama besar dulu.`;
  return x.arsir ? `Dibagi ${x.n} bagian sama besar, satu bagian diarsir. Ditulis 1/${x.n}. Pembilangnya 1, penyebutnya ${x.n}.` : `Keseluruhan dibagi ${x.n} bagian sama besar. Ketuk satu bagian untuk mengarsir.`;
}

export const ucapBandingK4B2A = (x: StatePecahanK4B2A): string => kalimatBandingA(x.a, x.b);

export function ucapGarisK4B2A(x: StatePecahanK4B2A): string {
  return `Garis dari 0 sampai 1 dibagi ${x.g} sama panjang. Ketuk tanda yang menunjukkan 1/${x.g}.`;
}
