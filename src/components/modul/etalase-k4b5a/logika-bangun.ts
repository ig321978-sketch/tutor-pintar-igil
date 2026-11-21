/**
 * Geometri murni bangun datar Kelas 4 Bab 5 Sub-Bab A "Etalase Keramik Bu Dewi" (ciri-ciri bangun datar).
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-etalase-k4b5a.mjs.
 * Bangun disimpan sebagai koordinat titik sudut; banyak sisi, sisi sama panjang, sudut siku-siku, dan pasangan sisi sejajar
 * SELALU dihitung dari koordinat (bukan dicatat tangan), lalu dipakai untuk gambar, jawaban benar, dan kartu ciri.
 */

export type Titik = [number, number];
export type Bangun = { kunci: string; nama: string; titik: Titik[] };

const EPS = 1e-6;
const hampir = (a: number, b: number): boolean => Math.abs(a - b) <= EPS * Math.max(1, Math.abs(a), Math.abs(b));

/** Segi banyak beraturan: n titik sudut pada lingkaran jari-jari r mulai dari sudut `mulai` (radian). */
const beraturanN = (n: number, mulai: number, r: number): Titik[] =>
  Array.from({ length: n }, (_, i): Titik => {
    const s = mulai + (i * 2 * Math.PI) / n;
    return [r * Math.cos(s), r * Math.sin(s)];
  });

/** Katalog keramik etalase. Koordinat y ke bawah (seperti SVG). */
export const KATALOG: Bangun[] = [
  { kunci: "segitiga-sama-sisi", nama: "segitiga sama sisi", titik: beraturanN(3, -Math.PI / 2, 4) },
  { kunci: "segitiga-sama-kaki", nama: "segitiga sama kaki", titik: [[0, 5], [6, 5], [3, 0]] },
  { kunci: "segitiga-siku", nama: "segitiga siku-siku", titik: [[0, 0], [0, 3], [4, 3]] },
  { kunci: "segitiga-tumpul", nama: "segitiga tumpul", titik: [[0, 5], [7, 5], [2, 3]] },
  { kunci: "segitiga-sembarang", nama: "segitiga sembarang", titik: [[0, 5], [7, 5], [3, 0]] },
  { kunci: "persegi", nama: "persegi", titik: [[0, 0], [4, 0], [4, 4], [0, 4]] },
  { kunci: "persegi-panjang", nama: "persegi panjang", titik: [[0, 0], [6, 0], [6, 4], [0, 4]] },
  { kunci: "jajargenjang", nama: "jajargenjang", titik: [[2, 0], [8, 0], [6, 4], [0, 4]] },
  { kunci: "belah-ketupat", nama: "belah ketupat", titik: [[3, 0], [6, 2], [3, 4], [0, 2]] },
  { kunci: "layang-layang", nama: "layang-layang", titik: [[3, 0], [6, 2], [3, 7], [0, 2]] },
  { kunci: "trapesium", nama: "trapesium", titik: [[1, 0], [4, 0], [6, 4], [0, 4]] },
  { kunci: "segiempat-sembarang", nama: "segiempat", titik: [[0, 1], [5, 0], [7, 4], [1, 5]] },
  { kunci: "segilima-beraturan", nama: "segilima beraturan", titik: beraturanN(5, -Math.PI / 2, 4) },
  { kunci: "segilima-sembarang", nama: "segilima sembarang", titik: [[0, 2], [3, 0], [7, 2], [6, 5], [1, 5]] },
  { kunci: "segienam-beraturan", nama: "segienam beraturan", titik: beraturanN(6, 0, 4) },
  { kunci: "segienam-sembarang", nama: "segienam sembarang", titik: [[0, 2], [3, 0], [7, 0], [9, 3], [5, 6], [1, 5]] },
];

export const bangun = (kunci: string): Bangun => {
  const b = KATALOG.find((x) => x.kunci === kunci);
  if (!b) throw new Error(`Bangun tidak dikenal: ${kunci}`);
  return b;
};
export const namaDari = (kunci: string): string => bangun(kunci).nama;

/* ------------------------------ Hitungan dari koordinat ------------------------------ */
export const banyakSisi = (t: Titik[]): number => t.length;
const vek = (t: Titik[], i: number): Titik => {
  const p = t[i % t.length];
  const q = t[(i + 1) % t.length];
  return [q[0] - p[0], q[1] - p[1]];
};
export const panjangSisi = (t: Titik[], i: number): number => Math.hypot(...vek(t, i));

/** Sudut dalam di titik sudut i, dalam derajat. */
export function sudutDalam(t: Titik[], i: number): number {
  const n = t.length;
  const a = vek(t, (i + n - 1) % n);
  const b = vek(t, i);
  // Sudut antara arah ke titik sebelumnya (-a) dan ke titik berikutnya (b).
  const c = (-a[0] * b[0] - a[1] * b[1]) / (Math.hypot(...a) * Math.hypot(...b));
  return (Math.acos(Math.max(-1, Math.min(1, c))) * 180) / Math.PI;
}
/** Nomor titik sudut yang siku-siku. */
export const indeksSiku = (t: Titik[]): number[] => t.map((_, i) => i).filter((i) => Math.abs(sudutDalam(t, i) - 90) < 1e-4);
export const banyakSiku = (t: Titik[]): number => indeksSiku(t).length;

/** Pasangan sisi (i, j) yang sejajar. */
export function pasangSejajar(t: Titik[]): [number, number][] {
  const hasil: [number, number][] = [];
  for (let i = 0; i < t.length; i += 1)
    for (let j = i + 1; j < t.length; j += 1) {
      const a = vek(t, i);
      const b = vek(t, j);
      if (Math.abs(a[0] * b[1] - a[1] * b[0]) <= 1e-9 * Math.hypot(...a) * Math.hypot(...b)) hasil.push([i, j]);
    }
  return hasil;
}
export const banyakSejajar = (t: Titik[]): number => pasangSejajar(t).length;

export const semuaSisiSama = (t: Titik[]): boolean => t.every((_, i) => hampir(panjangSisi(t, i), panjangSisi(t, 0)));
export const semuaSudutSama = (t: Titik[]): boolean => t.every((_, i) => Math.abs(sudutDalam(t, i) - sudutDalam(t, 0)) < 1e-4);
export const beraturan = (t: Titik[]): boolean => semuaSisiSama(t) && semuaSudutSama(t);
/** Banyak pasangan sisi bersebelahan yang sama panjang (keliling tertutup). */
export const pasanganSebelahSama = (t: Titik[]): number => t.filter((_, i) => hampir(panjangSisi(t, i), panjangSisi(t, (i + 1) % t.length))).length;
/** Pada segiempat: banyak pasangan sisi berhadapan yang sama panjang (0, 1, atau 2). */
export const pasanganHadapSama = (t: Titik[]): number => (t.length !== 4 ? 0 : [0, 1].filter((i) => hampir(panjangSisi(t, i), panjangSisi(t, i + 2))).length);

/** Nomor golongan panjang tiap sisi: 0 bila panjangnya tidak sama dengan sisi lain, selain itu 1, 2, ... menurut panjang yang sama. */
export function golonganSisi(t: Titik[]): number[] {
  const p = t.map((_, i) => panjangSisi(t, i));
  const ganda: number[] = [];
  p.forEach((a, i) => {
    if (p.some((b, j) => j !== i && hampir(a, b)) && !ganda.some((u) => hampir(u, a))) ganda.push(a);
  });
  return p.map((a) => {
    const g = ganda.findIndex((u) => hampir(u, a));
    return g < 0 ? 0 : g + 1;
  });
}

/* ------------------------------ Nama dan jenis ------------------------------ */
export const namaSegi = (n: number): string => (n === 3 ? "segitiga" : n === 4 ? "segiempat" : n === 5 ? "segilima" : n === 6 ? "segienam" : `segi-${n}`);

export function jenisSegiempat(t: Titik[]): string {
  const siku = banyakSiku(t);
  const sj = banyakSejajar(t);
  const semua = semuaSisiSama(t);
  if (semua && siku === 4) return "persegi";
  if (siku === 4) return "persegi panjang";
  if (semua && sj === 2) return "belah ketupat";
  if (sj === 2) return "jajargenjang";
  if (sj === 1) return "trapesium";
  if (pasanganSebelahSama(t) === 2 && !semua) return "layang-layang";
  return "segiempat";
}
export type SisiSegitiga = "sama sisi" | "sama kaki" | "sembarang";
export type SudutSegitiga = "siku-siku" | "lancip" | "tumpul";
export function jenisSegitigaSisi(t: Titik[]): SisiSegitiga {
  const sama = pasanganSebelahSama(t);
  return sama === 3 ? "sama sisi" : sama === 1 ? "sama kaki" : "sembarang";
}
export function jenisSegitigaSudut(t: Titik[]): SudutSegitiga {
  if (banyakSiku(t) === 1) return "siku-siku";
  return t.some((_, i) => sudutDalam(t, i) > 90 + 1e-4) ? "tumpul" : "lancip";
}
/** Nama lengkap menurut katalog: segitiga memuat jenis, segi lain memuat "beraturan" atau "sembarang" (segiempat memakai nama khususnya). */
export function jenisBangun(t: Titik[]): string {
  if (t.length === 3) {
    const sisi = jenisSegitigaSisi(t);
    const sudut = jenisSegitigaSudut(t);
    return sisi === "sama sisi" ? "segitiga sama sisi" : sudut === "siku-siku" ? "segitiga siku-siku" : sudut === "tumpul" ? "segitiga tumpul" : sisi === "sama kaki" ? "segitiga sama kaki" : "segitiga sembarang";
  }
  if (t.length === 4) return jenisSegiempat(t);
  return `${namaSegi(t.length)} ${beraturan(t) ? "beraturan" : "sembarang"}`;
}

/* ------------------------------ Ciri bangun (kartu kata dan pohon keluarga) ------------------------------ */
export type Ciri = "sejajar-satu" | "sejajar-dua" | "siku-empat" | "sisi-sama" | "sebelah-sama";
export function punyaCiri(t: Titik[], c: Ciri): boolean {
  switch (c) {
    case "sejajar-satu":
      return banyakSejajar(t) === 1;
    case "sejajar-dua":
      return banyakSejajar(t) === 2;
    case "siku-empat":
      return banyakSiku(t) === 4;
    case "sisi-sama":
      return semuaSisiSama(t);
    case "sebelah-sama":
      return pasanganSebelahSama(t) === 2 && !semuaSisiSama(t);
  }
}
/** Kata tentang sisi sama panjang pada segiempat: "semua", "dua pasang berhadapan", "dua pasang bersebelahan", atau "tidak ada". */
export function kataSisiSama(t: Titik[]): string {
  if (semuaSisiSama(t)) return "semua";
  if (pasanganHadapSama(t) === 2) return "dua pasang berhadapan";
  if (pasanganSebelahSama(t) === 2) return "dua pasang bersebelahan";
  return "tidak ada";
}

/* ------------------------------ Gambar ------------------------------ */
/** Skala seragam dan rata tengah: bangun muat di kotak (x, y, w, h), paling besar `maks` tiap satuan koordinat. */
export function muatkan(t: Titik[], x: number, y: number, w: number, h: number, maks = Infinity): Titik[] {
  const xs = t.map((p) => p[0]);
  const ys = t.map((p) => p[1]);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const lebar = Math.max(...xs) - minX || 1;
  const tinggi = Math.max(...ys) - minY || 1;
  const skala = Math.min(w / lebar, h / tinggi, maks);
  const ox = x + (w - lebar * skala) / 2 - minX * skala;
  const oy = y + (h - tinggi * skala) / 2 - minY * skala;
  return t.map((p): Titik => [ox + p[0] * skala, oy + p[1] * skala]);
}
const satuan = (v: Titik): Titik => {
  const n = Math.hypot(...v) || 1;
  return [v[0] / n, v[1] / n];
};
/** Tanda sudut siku-siku: tiga titik yang membentuk kotak kecil di dalam sudut. */
export function tandaSiku(t: Titik[], ukuran: number): { i: number; titik: Titik[] }[] {
  const n = t.length;
  return indeksSiku(t).map((i) => {
    const v = t[i];
    const a = satuan(vek(t, (i + n - 1) % n));
    const b = satuan(vek(t, i));
    const u: Titik = [-a[0], -a[1]];
    return { i, titik: [[v[0] + u[0] * ukuran, v[1] + u[1] * ukuran], [v[0] + (u[0] + b[0]) * ukuran, v[1] + (u[1] + b[1]) * ukuran], [v[0] + b[0] * ukuran, v[1] + b[1] * ukuran]] };
  });
}
/** Tanda sisi sama panjang: sebanyak nomor golongan garis pendek tegak lurus di tengah sisi. */
export function tandaSama(t: Titik[], ukuran: number): { i: number; garis: [Titik, Titik][] }[] {
  const gol = golonganSisi(t);
  return t.flatMap((_, i) => {
    if (gol[i] === 0) return [];
    const d = satuan(vek(t, i));
    const nrm: Titik = [-d[1], d[0]];
    const m: Titik = [(t[i][0] + t[(i + 1) % t.length][0]) / 2, (t[i][1] + t[(i + 1) % t.length][1]) / 2];
    const garis = Array.from({ length: gol[i] }, (_, k): [Titik, Titik] => {
      const g = (k - (gol[i] - 1) / 2) * ukuran * 0.55;
      const c: Titik = [m[0] + d[0] * g, m[1] + d[1] * g];
      return [[c[0] - nrm[0] * ukuran * 0.5, c[1] - nrm[1] * ukuran * 0.5], [c[0] + nrm[0] * ukuran * 0.5, c[1] + nrm[1] * ukuran * 0.5]];
    });
    return [{ i, garis }];
  });
}
/** Tanda sisi sejajar: panah (dua garis membentuk >) di tengah tiap sisi pada pasangan sejajar; pasangan ke-k bertanda k+1 panah. */
export function tandaSejajar(t: Titik[], ukuran: number): { i: number; garis: [Titik, Titik][] }[] {
  const pasang = pasangSejajar(t);
  const hasil: { i: number; garis: [Titik, Titik][] }[] = [];
  pasang.forEach(([i, j], k) => {
    const d = satuan(vek(t, i));
    const nrm: Titik = [-d[1], d[0]];
    for (const s of [i, j]) {
      const m: Titik = [(t[s][0] + t[(s + 1) % t.length][0]) / 2, (t[s][1] + t[(s + 1) % t.length][1]) / 2];
      const garis: [Titik, Titik][] = [];
      for (let q = 0; q <= k; q += 1) {
        const c: Titik = [m[0] + d[0] * (q - k / 2) * ukuran * 1.6, m[1] + d[1] * (q - k / 2) * ukuran * 1.6];
        const ujung: Titik = [c[0] + d[0] * ukuran * 0.5, c[1] + d[1] * ukuran * 0.5];
        garis.push([[c[0] - d[0] * ukuran * 0.5 + nrm[0] * ukuran * 0.6, c[1] - d[1] * ukuran * 0.5 + nrm[1] * ukuran * 0.6], ujung]);
        garis.push([[c[0] - d[0] * ukuran * 0.5 - nrm[0] * ukuran * 0.6, c[1] - d[1] * ukuran * 0.5 - nrm[1] * ukuran * 0.6], ujung]);
      }
      hasil.push({ i: s, garis });
    }
  });
  return hasil;
}
export const teksTitik = (t: Titik[]): string => t.map((p) => `${Math.round(p[0] * 10) / 10},${Math.round(p[1] * 10) / 10}`).join(" ");

/** Pecah kalimat menjadi baris-baris paling panjang `maks` huruf (untuk teks di gambar). */
export function bagiBaris(teks: string, maks: number): string[] {
  const baris: string[] = [];
  let kini = "";
  for (const w of teks.split(" ")) {
    if (kini && `${kini} ${w}`.length > maks) {
      baris.push(kini);
      kini = w;
    } else kini = kini ? `${kini} ${w}` : w;
  }
  if (kini) baris.push(kini);
  return baris;
}
