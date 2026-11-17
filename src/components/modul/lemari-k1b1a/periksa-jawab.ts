/**
 * Pemeriksa jawaban kanvas dan suara Kelas 1 Bab 1 Sub-Bab A (tanpa React, diuji di Node: scripts/uji-lemari-k1b1a.mjs).
 * - Tulis angka: pengenal awan titik (cara $P) dibandingkan dengan model tulisan yang sama dengan Story dan Opsi 2
 *   (components/modul/o2k1a-lab.ts), jadi letak dan ukuran tulisan bebas; arah dan urutan goresan juga bebas.
 * - Lingkari, tanda satu per satu, gambar titik, dan tarik garis diperiksa dari letak goresan terhadap letak benda.
 * - Ucapan: angka nol sampai sepuluh dari teks pengenal suara (kata, lambang, dan salah dengar yang umum).
 */
import { goresanTulis } from "../o2k1a-lab";
import { acak } from "./logika";

export type Titik = { x: number; y: number };
export type Goresan = Titik[];

/* ------------------------------ Kanvas tulis angka ------------------------------ */
/** Ukuran kanvas tulis (sama dengan kanvas tulis Opsi 2: dua kali satuan jalur). */
export const LEBAR_TULIS = 256;
export const TINGGI_TULIS = 220;
/** Model goresan lambang n pada satuan kanvas tulis. */
export const modelKanvas = (n: number): Goresan[] => goresanTulis(n).map((g) => g.titik.map(([x, y]) => ({ x: x * 2, y: (y + 8) * 2 })));

const N_AWAN = 40;
type TitikG = Titik & { g: number };

const panjang = (g: Goresan): number => g.reduce((s, t, i) => (i === 0 ? 0 : s + Math.hypot(t.x - g[i - 1].x, t.y - g[i - 1].y)), 0);
export const panjangTinta = (gs: readonly Goresan[]): number => gs.reduce((s, g) => s + panjang(g), 0);

/** Sampel ulang semua goresan menjadi N titik berjarak sama (jarak hanya diukur di dalam satu goresan). */
function sampel(gs: readonly Goresan[], n = N_AWAN): TitikG[] {
  const isi = gs.filter((g) => g.length > 0);
  const total = panjangTinta(isi);
  if (total === 0) {
    const semua = isi.flatMap((g, gi) => g.map((t) => ({ ...t, g: gi })));
    return semua.length ? Array.from({ length: n }, (_, i) => semua[i % semua.length]) : [];
  }
  const jarak = total / (n - 1);
  const hasil: TitikG[] = [];
  let sisa = 0;
  isi.forEach((g, gi) => {
    if (g.length === 1 && hasil.length < n) hasil.push({ ...g[0], g: gi });
    for (let i = 1; i < g.length; i += 1) {
      let a = g[i - 1];
      const b = g[i];
      let d = Math.hypot(b.x - a.x, b.y - a.y);
      while (sisa + d >= jarak && d > 0) {
        const t = (jarak - sisa) / d;
        const q = { x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y), g: gi };
        hasil.push(q);
        a = q;
        d = Math.hypot(b.x - a.x, b.y - a.y);
        sisa = 0;
      }
      sisa += d;
    }
  });
  const akhir = isi[isi.length - 1];
  while (hasil.length < n) hasil.push({ ...akhir[akhir.length - 1], g: isi.length - 1 });
  return hasil.slice(0, n);
}

/** Skala seragam ke kotak satuan (bentuk tidak gepeng) lalu pusatkan di titik berat. */
function normal(a: TitikG[]): TitikG[] {
  const xs = a.map((t) => t.x);
  const ys = a.map((t) => t.y);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const s = Math.max(Math.max(...xs) - minX, Math.max(...ys) - minY) || 1;
  const b = a.map((t) => ({ x: (t.x - minX) / s, y: (t.y - minY) / s, g: t.g }));
  const cx = b.reduce((u, t) => u + t.x, 0) / b.length;
  const cy = b.reduce((u, t) => u + t.y, 0) / b.length;
  return b.map((t) => ({ x: t.x - cx, y: t.y - cy, g: t.g }));
}

function jarakAwan(a: TitikG[], b: TitikG[], mulai: number): number {
  const n = a.length;
  const pakai = new Array<boolean>(n).fill(false);
  let jumlahJarak = 0;
  let i = mulai;
  do {
    let terdekat = -1;
    let min = Infinity;
    for (let j = 0; j < n; j += 1) {
      if (pakai[j]) continue;
      const d = Math.hypot(a[i].x - b[j].x, a[i].y - b[j].y);
      if (d < min) {
        min = d;
        terdekat = j;
      }
    }
    pakai[terdekat] = true;
    const bobot = 1 - ((i - mulai + n) % n) / n;
    jumlahJarak += bobot * min;
    i = (i + 1) % n;
  } while (i !== mulai);
  return jumlahJarak;
}

function cocokAwan(a: TitikG[], b: TitikG[]): number {
  const langkah = Math.floor(Math.sqrt(a.length));
  let min = Infinity;
  for (let i = 0; i < a.length; i += langkah) min = Math.min(min, jarakAwan(a, b, i), jarakAwan(b, a, i));
  return min;
}

const AWAN_MODEL: TitikG[][] = Array.from({ length: 11 }, (_, n) => normal(sampel(modelKanvas(n))));

/** Urutan tebakan angka (paling mirip dulu) untuk tulisan anak; kosong bila tintanya terlalu sedikit. */
export function kenaliAngka(gs: readonly Goresan[]): { angka: number; jarak: number }[] {
  if (panjangTinta(gs) < 30) return [];
  const awan = normal(sampel(gs));
  return AWAN_MODEL.map((m, angka) => ({ angka, jarak: cocokAwan(awan, m) })).sort((p, q) => p.jarak - q.jarak);
}

/** Tulisan benar bila angka yang paling mirip adalah kunci. Mengembalikan juga angka yang terbaca (untuk petunjuk). */
export function periksaTulis(gs: readonly Goresan[], kunci: number): { benar: boolean; terbaca: number | null } {
  const r = kenaliAngka(gs);
  if (r.length === 0) return { benar: false, terbaca: null };
  return { benar: r[0].angka === kunci, terbaca: r[0].angka };
}

/* ------------------------------ Kanvas gambar: letak benda ------------------------------ */
export const LEBAR_ADEGAN = 300;
export const TINGGI_ADEGAN = 200;

/** Letak n benda di kisi berjarak (tidak bertumpuk), diacak berbenih supaya sama tiap kali dibuka. */
export function letakBenda(n: number, benih: number, kolom = 5, w = LEBAR_ADEGAN, h = TINGGI_ADEGAN): Titik[] {
  const baris = Math.max(1, Math.ceil(Math.max(n, kolom * 2) / kolom));
  const sel = Array.from({ length: kolom * baris }, (_, i) => i);
  const pilih = acak(sel, benih).slice(0, n);
  const lw = w / kolom;
  const lh = h / baris;
  return pilih.map((i) => {
    const c = i % kolom;
    const r = Math.floor(i / kolom);
    const geser = ((i * 37 + benih * 11) % 9) - 4;
    return { x: Math.round(c * lw + lw / 2 + geser), y: Math.round(r * lh + lh / 2 - geser) };
  });
}

/** Titik di dalam poligon (garis goresan ditutup dari ujung ke pangkal). */
export function diDalam(t: Titik, poli: readonly Titik[]): boolean {
  let masuk = false;
  for (let i = 0, j = poli.length - 1; i < poli.length; j = i, i += 1) {
    const a = poli[i];
    const b = poli[j];
    if (a.y > t.y !== b.y > t.y && t.x < ((b.x - a.x) * (t.y - a.y)) / (b.y - a.y) + a.x) masuk = !masuk;
  }
  return masuk;
}

/**
 * Lingkari: tiap goresan yang cukup panjang dianggap satu lingkaran (ujungnya ditutup ke pangkal); boleh satu lingkaran besar
 * atau satu lingkaran untuk tiap benda. Benar bila semua benda sasaran terlingkari dan tidak ada benda lain.
 * `kurang` = sasaran yang belum terlingkari, `lebih` = benda lain yang ikut terlingkari.
 */
export function periksaLingkari(gs: readonly Goresan[], letak: readonly Titik[], sasaran: readonly boolean[]): { benar: boolean; kurang: number; lebih: number } {
  const lingkar = gs.filter((g) => g.length >= 3 && panjang(g) >= 40);
  let kurang = 0;
  let lebih = 0;
  letak.forEach((t, i) => {
    const d = lingkar.some((g) => diDalam(t, g));
    if (sasaran[i] && !d) kurang += 1;
    if (!sasaran[i] && d) lebih += 1;
  });
  return { benar: kurang === 0 && lebih === 0, kurang, lebih };
}

const pusat = (g: Goresan): Titik => ({ x: g.reduce((s, t) => s + t.x, 0) / g.length, y: g.reduce((s, t) => s + t.y, 0) / g.length });

/** Benda terdekat dari titik t dalam jari-jari r, atau -1. */
function terdekat(t: Titik, letak: readonly Titik[], r: number): number {
  let k = -1;
  let min = r;
  letak.forEach((b, i) => {
    const d = Math.hypot(t.x - b.x, t.y - b.y);
    if (d <= min) {
      min = d;
      k = i;
    }
  });
  return k;
}

/** Tanda satu per satu: tiap goresan (titik atau centang kecil) jatuh pada satu benda; benar bila tiap benda tepat satu tanda. */
export function periksaCentang(gs: readonly Goresan[], letak: readonly Titik[], r = 26): { benar: boolean; dobel: number; lewat: number; nyasar: number } {
  const hit = letak.map(() => 0);
  let nyasar = 0;
  for (const g of gs) {
    if (g.length === 0) continue;
    const i = terdekat(pusat(g), letak, r);
    if (i < 0) nyasar += 1;
    else hit[i] += 1;
  }
  const dobel = hit.filter((h) => h > 1).length;
  const lewat = hit.filter((h) => h === 0).length;
  return { benar: dobel === 0 && lewat === 0 && nyasar === 0, dobel, lewat, nyasar };
}

/** Gambar titik: tiap goresan pendek dihitung satu titik. Goresan panjang (coretan) ditolak. */
export function hitungTitik(gs: readonly Goresan[]): { titik: number; coretan: number } {
  let titik = 0;
  let coretan = 0;
  for (const g of gs) {
    if (g.length === 0) continue;
    if (panjang(g) <= 40) titik += 1;
    else coretan += 1;
  }
  return { titik, coretan };
}

/**
 * Tarik garis: tiap goresan menghubungkan satu benda kiri dan satu kartu kanan (arah bebas).
 * `harusSama`: kiri ke-i hanya boleh ke kanan bernilai sama (nama angka ke lambangnya); bila false, cukup satu-satu.
 */
export function periksaHubung(
  gs: readonly Goresan[],
  kiri: readonly Titik[],
  kanan: readonly Titik[],
  nilaiKiri: readonly number[],
  nilaiKanan: readonly number[],
  harusSama: boolean,
  r = 34,
): { benar: boolean; pasangan: [number, number][]; salah: number } {
  const pasangan: [number, number][] = [];
  let salah = 0;
  for (const g of gs) {
    if (g.length < 2) continue;
    const a = g[0];
    const b = g[g.length - 1];
    let ki = terdekat(a, kiri, r);
    let ka = terdekat(b, kanan, r);
    if (ki < 0 || ka < 0) {
      ki = terdekat(b, kiri, r);
      ka = terdekat(a, kanan, r);
    }
    if (ki < 0 || ka < 0) {
      salah += 1;
      continue;
    }
    if (pasangan.some(([x, y]) => x === ki || y === ka) || (harusSama && nilaiKiri[ki] !== nilaiKanan[ka])) {
      salah += 1;
      continue;
    }
    pasangan.push([ki, ka]);
  }
  return { benar: salah === 0 && pasangan.length === kiri.length, pasangan, salah };
}

/* ------------------------------ Ucapan ------------------------------ */
const KATA_UCAP: Record<string, number> = {
  nol: 0, kosong: 0, nul: 0, enol: 0, zero: 0,
  satu: 1, one: 1,
  dua: 2, two: 2,
  tiga: 3, three: 3,
  empat: 4, ampat: 4, four: 4,
  lima: 5, five: 5,
  enam: 6, six: 6,
  tujuh: 7, tuju: 7, seven: 7,
  delapan: 8, lapan: 8, eight: 8,
  sembilan: 9, semilan: 9, nine: 9,
  sepuluh: 10, ten: 10,
};

function beda1(a: string, b: string): boolean {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  let j = 0;
  let beda = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i += 1;
      j += 1;
      continue;
    }
    beda += 1;
    if (beda > 1) return false;
    if (a.length > b.length) i += 1;
    else if (b.length > a.length) j += 1;
    else {
      i += 1;
      j += 1;
    }
  }
  return beda + (a.length - i) + (b.length - j) <= 1;
}

/** Semua angka nol sampai sepuluh yang terdengar dalam teks (urut kemunculan, tanpa kembar). */
export function bilanganDariUcapan(teks: string): number[] {
  const bersih = teks
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/se\s+puluh/g, "sepuluh")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
  const hasil: number[] = [];
  for (const kt of bersih.split(" ").filter(Boolean)) {
    let n: number | undefined;
    if (/^\d+$/.test(kt)) n = Number(kt) <= 10 ? Number(kt) : undefined;
    else n = KATA_UCAP[kt] ?? (kt.length >= 4 ? Object.entries(KATA_UCAP).find(([k]) => k.length >= 4 && beda1(kt, k))?.[1] : undefined);
    if (n !== undefined && !hasil.includes(n)) hasil.push(n);
  }
  return hasil;
}
