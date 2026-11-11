/**
 * Lab Kelompok (Kelas 3 Bab 1, Sub-Bab F dan G): logika murni.
 * Mode Kali: banyak kelompok dan isi tiap kelompok (hasil sampai 100). Mode Bagi: bilangan yang dibagi dan
 * banyak wadah (sampai 100), dengan sisa bila tidak habis dibagi. Satu model, banyak perwakilan: kelompok benda,
 * penjumlahan berulang, kalimat kali, garis loncat, tukar tempat, kurang berulang, nama bilangan, dan periksa dengan kali.
 * Tanpa skor, tanpa waktu. Murni: tanpa React, tanpa jaringan, tanpa impor nilai. Diuji di scripts/uji-lab-k3b1.mjs.
 */

export type ModeKel = "kali" | "bagi";
export type RepKel = "tambah" | "kalimat" | "garis" | "tukar" | "kurang" | "nama" | "periksa";

export type PasangKali = { k: number; n: number };

export type StateKel = {
  mode: ModeKel;
  k: number;
  n: number;
  T: number;
  w: number;
  tampil: Record<RepKel, boolean>;
  /** Perkalian dengan kedua faktor paling sedikit 2 yang pernah dibuat di mode Kali. */
  riwayatKali: PasangKali[];
  pesan: string;
};

export type AksiKel =
  | { t: "UBAH_K"; d: number }
  | { t: "UBAH_N"; d: number }
  | { t: "UBAH_T"; d: number }
  | { t: "UBAH_W"; d: number }
  | { t: "MODE"; mode: ModeKel }
  | { t: "TOGGLE"; rep: RepKel }
  | { t: "RESET" };

export type KeadaanKel = {
  alat: "kelompok";
  mode: ModeKel;
  k: number;
  n: number;
  p: number;
  T: number;
  w: number;
  q: number;
  sisa: number;
  tambah: boolean;
  kalimat: boolean;
  garis: boolean;
  tukar: boolean;
  kurang: boolean;
  nama: boolean;
  periksa: boolean;
  riwayatKali: PasangKali[];
  /** Dua perkalian berbeda (bukan sekadar tukar tempat) dengan hasil sama pernah dibuat. */
  duaSama: boolean;
};

/** Mode dan perwakilan yang tersedia di Lab Kelompok menurut sub-bab. */
export const MODE_KEL: Record<"F" | "G", ModeKel[]> = { F: ["kali"], G: ["kali", "bagi"] };
export const REP_KEL: Record<ModeKel, RepKel[]> = {
  kali: ["tambah", "kalimat", "garis", "tukar"],
  bagi: ["kurang", "nama", "periksa"],
};

export const MAKS_HASIL = 100;
export const MAKS_FAKTOR = 10;
export const MAKS_BAGI = 100;

export const awalKel = (mode: ModeKel): StateKel => ({
  mode,
  k: 1,
  n: 1,
  T: 6,
  w: 2,
  tampil: { tambah: false, kalimat: false, garis: false, tukar: false, kurang: false, nama: false, periksa: false },
  riwayatKali: [],
  pesan: "",
});

export const hasilBagi = (T: number, w: number): { q: number; sisa: number } => ({ q: Math.floor(T / w), sisa: T % w });

const tolak = (x: StateKel, pesan: string): StateKel => ({ ...x, pesan });

function catat(x: StateKel): StateKel {
  if (x.mode !== "kali" || x.k < 2 || x.n < 2) return x;
  if (x.riwayatKali.some((r) => r.k === x.k && r.n === x.n)) return x;
  return { ...x, riwayatKali: [...x.riwayatKali, { k: x.k, n: x.n }] };
}

export function langkahKel(x: StateKel, a: AksiKel): StateKel {
  switch (a.t) {
    case "UBAH_K": {
      const k = x.k + a.d;
      if (k < 1 || k > MAKS_FAKTOR) return tolak(x, "Banyak kelompok 1 sampai 10.");
      if (k * x.n > MAKS_HASIL) return tolak(x, "Hasilnya paling besar 100 di bab ini.");
      return catat({ ...x, k, pesan: "" });
    }
    case "UBAH_N": {
      const n = x.n + a.d;
      if (n < 1 || n > MAKS_FAKTOR) return tolak(x, "Isi tiap kelompok 1 sampai 10.");
      if (x.k * n > MAKS_HASIL) return tolak(x, "Hasilnya paling besar 100 di bab ini.");
      return catat({ ...x, n, pesan: "" });
    }
    case "UBAH_T": {
      const T = x.T + a.d;
      if (T < 1 || T > MAKS_BAGI) return tolak(x, "Bilangan yang dibagi 1 sampai 100.");
      return { ...x, T, pesan: "" };
    }
    case "UBAH_W": {
      const w = x.w + a.d;
      if (w < 1 || w > MAKS_FAKTOR) return tolak(x, "Banyak wadah 1 sampai 10.");
      return { ...x, w, pesan: "" };
    }
    case "MODE":
      return { ...x, mode: a.mode, pesan: "" };
    case "TOGGLE":
      return { ...x, tampil: { ...x.tampil, [a.rep]: !x.tampil[a.rep] }, pesan: "" };
    case "RESET":
      return awalKel(x.mode);
  }
}

/** Ada dua pasangan berbeda (bukan sekadar bertukar tempat) dengan hasil kali sama. */
export function adaDuaSama(r: readonly PasangKali[]): boolean {
  for (let i = 0; i < r.length; i += 1) {
    for (let j = i + 1; j < r.length; j += 1) {
      const a = r[i];
      const b = r[j];
      const sama = a.k * a.n === b.k * b.n;
      const tukar = a.k === b.n && a.n === b.k;
      if (sama && !tukar) return true;
    }
  }
  return false;
}

export function keadaanKel(x: StateKel): KeadaanKel {
  const { q, sisa } = hasilBagi(x.T, x.w);
  return {
    alat: "kelompok",
    mode: x.mode,
    k: x.k,
    n: x.n,
    p: x.k * x.n,
    T: x.T,
    w: x.w,
    q,
    sisa,
    tambah: x.tampil.tambah,
    kalimat: x.tampil.kalimat,
    garis: x.tampil.garis,
    tukar: x.tampil.tukar,
    kurang: x.tampil.kurang,
    nama: x.tampil.nama,
    periksa: x.tampil.periksa,
    riwayatKali: x.riwayatKali,
    duaSama: adaDuaSama(x.riwayatKali),
  };
}

/** Penjumlahan berulang: "2 + 2 + 2 + 2 + 2 = 10". Dipendekkan bila terlalu panjang. */
export function barisTambah(k: number, n: number): string {
  const p = k * n;
  if (k <= 6) return `${Array.from({ length: k }, () => n).join(" + ")} = ${p}`;
  return `${n} + ${n} + ${n} + … (${k} kali) = ${p}`;
}

/** Kurang berulang: "12 − 2 − 2 − 2 = 6" sampai tersisa kurang dari pembagi. */
export function barisKurang(T: number, w: number): string {
  const { q, sisa } = hasilBagi(T, w);
  const awal = q <= 6 ? `${T}${Array.from({ length: q }, () => ` − ${w}`).join("")}` : `${T} − ${w} − ${w} − … (${q} kali)`;
  return `${awal} = ${sisa}`;
}

/** Kalimat bagi: "15 : 3 = 5" atau "13 : 4 = 3 sisa 1". */
export const kalimatBagi = (T: number, w: number): string => {
  const { q, sisa } = hasilBagi(T, w);
  return sisa === 0 ? `${T} : ${w} = ${q}` : `${T} : ${w} = ${q} sisa ${sisa}`;
};

/** Pernyataan tentang habis dibagi, jujur terhadap sisa. */
export const pernyataanHabis = (T: number, w: number): string => {
  const { q, sisa } = hasilBagi(T, w);
  return sisa === 0 ? `${T} habis dibagi ${w}. Tiap wadah mendapat ${q}.` : `${T} tidak habis dibagi ${w}. Tiap wadah mendapat ${q}, dan tersisa ${sisa}.`;
};

/** Pasangan perkalian untuk memeriksa pembagian: q × w + sisa = T. */
export const kalimatPeriksaBagi = (T: number, w: number): string => {
  const { q, sisa } = hasilBagi(T, w);
  return sisa === 0 ? `${q} × ${w} = ${T}` : `${q} × ${w} + ${sisa} = ${T}`;
};
