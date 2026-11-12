/**
 * Lab Kemasan (Kelas 4 Bab 1, Sub-Bab A: Membaca dan Menulis Bilangan sampai 10.000): logika murni.
 * Satu alat, tiga tampilan.
 *  Rakit : peti (1.000), dus (100), bungkus (10), dan benda (1). Kemasan kesepuluh otomatis ditukar ke kemasan
 *          yang lebih besar (10 benda → 1 bungkus, 10 bungkus → 1 dus, 10 dus → 1 peti). Bilangan, papan empat
 *          tempat, dan bacaan DIHITUNG dari kemasan. Batas bab: 10.000.
 *  Baca  : bacaan dipecah menurut tempat; tempat bernilai nol dilewati; ribuan 1 dibaca "seribu".
 *  Tulis : kata bilangan → empat kartu angka. Periksa menunjukkan tempat yang keliru.
 * Nilai angka (×1.000), uraian dengan tanda +, dan tanda < > = baru dipakai di sub-bab berikutnya.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k4b1.mjs.
 */

export type JenisKemasan = "peti" | "dus" | "bungkus" | "benda";
export const URUT_KEMASAN: JenisKemasan[] = ["peti", "dus", "bungkus", "benda"];
export const ISI_KEMASAN: Record<JenisKemasan, number> = { peti: 1000, dus: 100, bungkus: 10, benda: 1 };
export const NAMA_TEMPAT = ["ribuan", "ratusan", "puluhan", "satuan"] as const;
export const BATAS_K4B1 = 10000;

export type Kemasan = Record<JenisKemasan, number>;
export const totalKemasan = (k: Kemasan): number => k.peti * 1000 + k.dus * 100 + k.bungkus * 10 + k.benda;

/** Empat digit (ribuan, ratusan, puluhan, satuan) untuk 0 sampai 9.999. */
export const digitEmpat = (n: number): [number, number, number, number] => [Math.floor(n / 1000) % 10, Math.floor(n / 100) % 10, Math.floor(n / 10) % 10, n % 10];

/** Lambang dengan titik ribuan: 3286 → "3.286". */
export const lambangK4B1 = (n: number): string => (n >= 1000 ? `${Math.floor(n / 1000)}.${String(n % 1000).padStart(3, "0")}` : String(n));

const ANGKA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];

/** Bacaan dua angka terakhir (puluhan dan satuan) 1 sampai 99. */
function kataDuaAngka(n: number): string {
  if (n < 10) return ANGKA[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${ANGKA[n - 10]} belas`;
  return n % 10 === 0 ? `${ANGKA[Math.floor(n / 10)]} puluh` : `${ANGKA[Math.floor(n / 10)]} puluh ${ANGKA[n % 10]}`;
}

export type BagianBaca = { tempat: (typeof NAMA_TEMPAT)[number]; kata: string | null; lewati: boolean };

/**
 * Bacaan dipecah menurut empat tempat (1 sampai 9.999). Tempat bernilai nol dilewati (lewati = true).
 * Puluhan 1 (sepuluh sampai sembilan belas) dibaca bersama satuannya: kata ada di puluhan, satuan digabung
 * (kata null, lewati false).
 */
export function bagianBaca(n: number): BagianBaca[] {
  const [rb, rt, pl, st] = digitEmpat(n);
  const tempat = (i: number, kata: string | null, lewati: boolean): BagianBaca => ({ tempat: NAMA_TEMPAT[i], kata, lewati });
  const depan = [tempat(0, rb === 0 ? null : rb === 1 ? "seribu" : `${ANGKA[rb]} ribu`, rb === 0), tempat(1, rt === 0 ? null : rt === 1 ? "seratus" : `${ANGKA[rt]} ratus`, rt === 0)];
  if (pl === 1) return [...depan, tempat(2, kataDuaAngka(10 + st), false), tempat(3, null, false)];
  return [...depan, tempat(2, pl === 0 ? null : `${ANGKA[pl]} puluh`, pl === 0), tempat(3, st === 0 ? null : ANGKA[st], st === 0)];
}

/** Bacaan utuh 0 sampai 10.000. */
export function bacaK4B1A(n: number): string {
  if (n === 0) return "nol";
  if (n === 10000) return "sepuluh ribu";
  return bagianBaca(n)
    .map((b) => b.kata)
    .filter((k): k is string => k !== null)
    .join(" ");
}

/* ------------------------------ Target menulis ------------------------------ */

export type TargetTulis = { n: number; konteks: string };
export const TARGET_TULIS: TargetTulis[] = [
  { n: 3676, konteks: "Tinggi Gunung Semeru (meter)" },
  { n: 3254, konteks: "Bilangan dari buku" },
  { n: 1025, konteks: "Bilangan dengan seribu" },
  { n: 7003, konteks: "Bilangan dengan dua nol" },
  { n: 6570, konteks: "Bilangan dengan satuan nol" },
  { n: 9045, konteks: "Bilangan dengan ratusan nol" },
  { n: 2903, konteks: "Bilangan dengan puluhan nol" },
  { n: 6002, konteks: "Bilangan enam ribu dua" },
];

/** Bilangan yang dicatat saat dirakit (dan dibaca bila Bacaan menyala). */
export const PATOKAN_RAKIT = [3286, 7003, 1025, 2903, 6750, 10000];

/* ------------------------------ Keadaan ------------------------------ */

export type StateKemasanK4B1A = {
  k: Kemasan;
  baca: boolean;
  papan: boolean;
  target: number;
  kartu: [number, number, number, number];
  pernah: string[];
  pesan: string;
};

export type AksiKemasanK4B1A =
  | { t: "UBAH"; jenis: JenisKemasan; d: 1 | -1 }
  | { t: "TOGGLE"; rep: "baca" | "papan" }
  | { t: "TARGET"; d: 1 | -1 }
  | { t: "KARTU"; i: number; d: 1 | -1 }
  | { t: "PERIKSA" }
  | { t: "RESET" };

/** Awal: 2 peti dan 9 dus (2.900), satu dus lagi memicu penukaran ke peti. */
export const awalKemasanK4B1A = (): StateKemasanK4B1A => ({
  k: { peti: 2, dus: 9, bungkus: 0, benda: 0 },
  baca: false,
  papan: true,
  target: 0,
  kartu: [0, 0, 0, 0],
  pernah: [],
  pesan: "",
});

const tambah = (daftar: string[], id: string): string[] => (daftar.includes(id) ? daftar : [...daftar, id]);

function catat(x: StateKemasanK4B1A): StateKemasanK4B1A {
  const n = totalKemasan(x.k);
  let p = x.pernah;
  if (PATOKAN_RAKIT.includes(n)) {
    p = tambah(p, `rakit:${n}`);
    if (x.baca) p = tambah(p, `baca:${n}`);
  }
  return p === x.pernah ? x : { ...x, pernah: p };
}

/** Tambah satu kemasan; kemasan kesepuluh ditukar ke kemasan yang lebih besar (berantai). */
function tambahSatu(x: StateKemasanK4B1A, jenis: JenisKemasan): StateKemasanK4B1A {
  if (totalKemasan(x.k) + ISI_KEMASAN[jenis] > BATAS_K4B1) return { ...x, pesan: `Batas bab ini ${lambangK4B1(BATAS_K4B1)}. Tidak bisa ditambah ${jenis} lagi.` };
  const k = { ...x.k, [jenis]: x.k[jenis] + 1 } as Kemasan;
  let pernah = x.pernah;
  const tukar: string[] = [];
  for (let i = URUT_KEMASAN.length - 1; i >= 1; i -= 1) {
    const kecil = URUT_KEMASAN[i];
    const besar = URUT_KEMASAN[i - 1];
    if (k[kecil] >= 10) {
      k[kecil] -= 10;
      k[besar] += 1;
      pernah = tambah(pernah, `tukar:${kecil}`);
      tukar.push(`10 ${kecil} ditukar 1 ${besar}`);
    }
  }
  return { ...x, k, pernah, pesan: tukar.length ? `🔄 ${tukar.join(", lalu ")}.` : "" };
}

export function langkahKemasanK4B1A(x: StateKemasanK4B1A, a: AksiKemasanK4B1A): StateKemasanK4B1A {
  switch (a.t) {
    case "UBAH": {
      if (!URUT_KEMASAN.includes(a.jenis)) return x;
      if (a.d === 1) return catat(tambahSatu(x, a.jenis));
      if (x.k[a.jenis] === 0) return { ...x, pesan: `Tidak ada ${a.jenis} untuk diambil.` };
      return catat({ ...x, k: { ...x.k, [a.jenis]: x.k[a.jenis] - 1 } as Kemasan, pesan: "" });
    }
    case "TOGGLE":
      return catat({ ...x, [a.rep]: !x[a.rep], pesan: "" } as StateKemasanK4B1A);
    case "TARGET":
      return { ...x, target: (x.target + a.d + TARGET_TULIS.length) % TARGET_TULIS.length, kartu: [0, 0, 0, 0], pesan: "" };
    case "KARTU": {
      if (a.i < 0 || a.i > 3) return x;
      const kartu = x.kartu.map((v, i) => (i === a.i ? (v + a.d + 10) % 10 : v)) as [number, number, number, number];
      return { ...x, kartu, pesan: "" };
    }
    case "PERIKSA": {
      const t = TARGET_TULIS[x.target].n;
      const harus = digitEmpat(t);
      const beda = harus.map((d, i) => (x.kartu[i] === d ? -1 : i)).filter((i) => i >= 0);
      if (beda.length === 0) return { ...x, pernah: tambah(x.pernah, `tulis:${t}`), pesan: `✅ Benar! ${lambangK4B1(t)} dibaca ${bacaK4B1A(t)}.` };
      const i = beda[0];
      const tertulis = x.kartu[0] * 1000 + x.kartu[1] * 100 + x.kartu[2] * 10 + x.kartu[3];
      return {
        ...x,
        pernah: tambah(x.pernah, "tulis-salah"),
        pesan: `Kartu ${NAMA_TEMPAT[i]} belum tepat. Yang kamu tulis, ${lambangK4B1(tertulis)}, dibaca ${bacaK4B1A(tertulis)}.`,
      };
    }
    case "RESET":
      return awalKemasanK4B1A();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanKemasanK4B1A = { alat: "kemasan"; n: number; baca: boolean; pernah: string[] };
export const keadaanKemasanK4B1A = (x: StateKemasanK4B1A): KeadaanKemasanK4B1A => ({ alat: "kemasan", n: totalKemasan(x.k), baca: x.baca, pernah: x.pernah });

export function ucapRakitK4B1A(x: StateKemasanK4B1A): string {
  const n = totalKemasan(x.k);
  const isi = `${x.k.peti} peti, ${x.k.dus} dus, ${x.k.bungkus} bungkus, dan ${x.k.benda} benda`;
  if (n === BATAS_K4B1) return `Ada ${isi}. Sepuluh peti sama dengan sepuluh ribu, batas bab ini.`;
  return `Ada ${isi}. Bilangannya ${lambangK4B1(n)}, dibaca ${bacaK4B1A(n)}.`;
}

export function ucapTulisK4B1A(x: StateKemasanK4B1A): string {
  const t = TARGET_TULIS[x.target];
  return `${t.konteks}: ${bacaK4B1A(t.n)}. Atur empat kartu angka: ribuan, ratusan, puluhan, dan satuan. Tempat yang tidak disebut diisi nol.`;
}
