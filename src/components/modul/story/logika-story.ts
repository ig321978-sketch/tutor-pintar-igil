/**
 * Logika murni mesin Story (tanpa React): tipe benda gambar, aksi per kata, keadaan gambar, dan waktu kata.
 * Diuji langsung di Node: scripts/uji-story-k6b4a.mjs.
 */

export type Obj = {
  id: string;
  t: "teks" | "kotak" | "bulat" | "garis" | "panah" | "jalur";
  /** Posisi titik asal benda pada kanvas 300 x 208. */
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  r?: number;
  rx?: number;
  /** Ujung garis atau panah, relatif terhadap (x, y). */
  x2?: number;
  y2?: number;
  /** Lintasan SVG untuk jalur, relatif terhadap (x, y). */
  d?: string;
  isi?: string;
  u?: number;
  warna?: string;
  garis?: string;
  tebal?: number;
  op?: number;
  putus?: boolean;
  anchor?: "start" | "middle" | "end";
  z?: number;
  skala?: number;
  rot?: number;
  sorot?: boolean;
  /** Garis atau jalur tergambar bertahap saat muncul. */
  gambar?: boolean;
};

type UbahObj = Partial<Obj> & { id: string };

export type Aksi = {
  /** Kata pemicu: nomor kata (mulai 0), "kata", atau "kata@2" untuk kemunculan kedua. Bawaan: awal kalimat. */
  at?: string | number;
  bersih?: boolean;
  hapus?: string | string[];
  tambah?: Obj | Obj[];
  ubah?: UbahObj | UbahObj[];
};

export type KetukanStory = { suara: string; aksi: Aksi[] };

export type AdeganStory = {
  id: string;
  judul: string;
  /** Halaman buku atau sumber isi adegan ini. */
  sumber: string;
  latar: string;
  /** Kutipan pendek dari buku yang dipakai adegan ini. Diuji terhadap teks PDF bila berkasnya ada. */
  kutipan?: string[];
  ketukan: KetukanStory[];
};

export type VideoStory = {
  id: string;
  judul: string;
  subjudul: string;
  jenis: "materi" | "metode-luar";
  adegan: AdeganStory[];
};

/* ------------------------------ Keadaan murni ------------------------------ */

export const kataDari = (suara: string): string[] => suara.split(/\s+/).filter(Boolean);
const bersihKata = (k: string): string => k.toLowerCase().replace(/[^a-z0-9À-ɏ]/g, "");

/** Nomor kata pemicu dalam kalimat. Kata tak ditemukan dikembalikan -1. */
export function posisiKata(suara: string, at: string | number | undefined): number {
  const kata = kataDari(suara);
  if (at === undefined) return 0;
  if (typeof at === "number") return Math.max(0, Math.min(kata.length - 1, Math.floor(at)));
  const [cari, ke] = at.split("@");
  const target = bersihKata(cari);
  const nomor = ke ? Number(ke) : 1;
  let ditemu = 0;
  for (let i = 0; i < kata.length; i += 1) {
    if (target && bersihKata(kata[i]).includes(target)) {
      ditemu += 1;
      if (ditemu === nomor) return i;
    }
  }
  return -1;
}

type Peta = Map<string, Obj>;

function terapkan(peta: Peta, a: Aksi): void {
  if (a.bersih) peta.clear();
  for (const id of a.hapus === undefined ? [] : Array.isArray(a.hapus) ? a.hapus : [a.hapus]) peta.delete(id);
  for (const o of a.tambah === undefined ? [] : Array.isArray(a.tambah) ? a.tambah : [a.tambah]) peta.set(o.id, { ...o });
  for (const u of a.ubah === undefined ? [] : Array.isArray(a.ubah) ? a.ubah : [a.ubah]) {
    const lama = peta.get(u.id);
    if (lama) peta.set(u.id, { ...lama, ...u });
  }
}

/** Keadaan gambar pada ketukan `k` setelah kata ke-`kata` diucapkan. kata = -1: awal ketukan. */
export function keadaanStory(adegan: AdeganStory, k: number, kata: number): Obj[] {
  const peta: Peta = new Map();
  for (let i = 0; i <= Math.min(k, adegan.ketukan.length - 1); i += 1) {
    const kt = adegan.ketukan[i];
    for (const a of kt.aksi) {
      const p = posisiKata(kt.suara, a.at);
      if (i < k || p <= kata) terapkan(peta, a);
    }
  }
  return [...peta.values()].sort((p, q) => (p.z ?? 0) - (q.z ?? 0));
}

/** Semua teks yang terlihat pada keadaan gambar. */
export const teksTerlihat = (objs: Obj[]): string[] => objs.filter((o) => o.t === "teks" && (o.op ?? 1) > 0 && o.isi).map((o) => o.isi as string);

/** Sidik keadaan gambar: dua keadaan sama bila sidiknya sama. */
export const sidikKeadaan = (objs: Obj[]): string => JSON.stringify(objs);

/* ------------------------------ Waktu kata ------------------------------ */

/** Perkiraan detik per kata (suara perangkat). Dikalibrasi dari ketukan yang baru selesai. */
let detikPerKata = 0.5;
export const bacaDetikPerKata = () => detikPerKata;
export const kalibrasiDetikPerKata = (detik: number, kata: number): void => {
  if (kata < 3 || detik < 1) return;
  const amati = Math.max(0.25, Math.min(1.1, detik / kata));
  detikPerKata = detikPerKata * 0.65 + amati * 0.35;
};

/** Kata yang sedang diucapkan pada detik `t` dalam sebuah ketukan. */
export const kataPadaWaktu = (t: number, dpk: number = detikPerKata): number => Math.floor(Math.max(0, t) / dpk);

