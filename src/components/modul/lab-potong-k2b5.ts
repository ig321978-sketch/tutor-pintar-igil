/**
 * Lab Potong (Kelas 2 Bab 5, Sub-Bab A dan C): model PhET.
 * Satu bentuk (persegi, persegi panjang, lingkaran, segitiga) dibelah oleh satu atau dua garis yang arahnya dipilih
 * dan posisinya digeser langkah demi langkah. Bagian, perbandingan luas, nama pecahan, dan warna berubah bersama.
 * Hanya bagian yang sama besar yang diberi nama setengah atau seperempat.
 * Murni: tanpa React, tanpa jaringan, tanpa impor nilai. Diuji di scripts/uji-lab-k2b5.mjs.
 */

export type Titik = [number, number];
export type BentukLab = "persegi" | "persegiPanjang" | "lingkaran" | "segitiga";
export type ArahPotong = "tegak" | "datar" | "miring1" | "miring2";
export type NamaBagian = "utuh" | "setengah" | "seperempat" | "lain";
export type NamaWarna = "kosong" | "utuh" | "setengah" | "seperempat" | "lain";
export type GarisLab = { arah: ArahPotong; langkah: number };

export const URUT_BENTUK: BentukLab[] = ["persegi", "persegiPanjang", "lingkaran", "segitiga"];
export const NAMA_BENTUK: Record<BentukLab, string> = { persegi: "persegi", persegiPanjang: "persegi panjang", lingkaran: "lingkaran", segitiga: "segitiga" };

export const URUT_ARAH: ArahPotong[] = ["tegak", "datar", "miring1", "miring2"];
export const NAMA_ARAH: Record<ArahPotong, string> = { tegak: "Tegak", datar: "Datar", miring1: "Miring ╱", miring2: "Miring ╲" };
export const SEBUT_ARAH: Record<ArahPotong, string> = { tegak: "tegak", datar: "datar", miring1: "miring naik", miring2: "miring turun" };

/** Garis bergeser sejauh LANGKAH x STEP dari titik tengah (50, 50), tegak lurus arah garis. */
export const STEP = 10;
export const LANGKAH_MAKS = 3;
export const AWAL_BENTUK: BentukLab = "persegi";
export const MAKS_GARIS_A = 1;
export const MAKS_GARIS_C = 2;

/** Dua luas dianggap sama bila selisih bagiannya paling banyak ini. Selisih terdekat berikutnya jauh lebih besar (diuji). */
export const TOLERANSI = 0.004;
const EPS = 1e-9;
const LUAS_MIN = 0.05;

export const kapital = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const LINGKARAN: Titik[] = Array.from({ length: 72 }, (_, i) => {
  const a = (i * 5 * Math.PI) / 180;
  return [50 + 38 * Math.cos(a), 50 + 38 * Math.sin(a)] as Titik;
});

/** Bentuk dasar dalam kotak 100 x 100, simetris terhadap titik tengah (kecuali segitiga yang simetris tegak). */
export function poligonBentuk(b: BentukLab): Titik[] {
  switch (b) {
    case "persegi":
      return [[14, 14], [86, 14], [86, 86], [14, 86]];
    case "persegiPanjang":
      return [[8, 28], [92, 28], [92, 72], [8, 72]];
    case "lingkaran":
      return LINGKARAN.map((p) => [p[0], p[1]] as Titik);
    default:
      return [[50, 10], [90, 90], [10, 90]];
  }
}

export function luas(p: readonly Titik[]): number {
  let s = 0;
  for (let i = 0; i < p.length; i += 1) {
    const a = p[i];
    const b = p[(i + 1) % p.length];
    s += a[0] * b[1] - b[0] * a[1];
  }
  return Math.abs(s) / 2;
}

export function pusat(p: readonly Titik[]): Titik {
  return [p.reduce((s, q) => s + q[0], 0) / p.length, p.reduce((s, q) => s + q[1], 0) / p.length];
}

const R2 = Math.SQRT1_2;

/** Normal satuan garis. "miring1" seperti ╱ (naik ke kanan) dan "miring2" seperti ╲, pada layar dengan y ke bawah. */
export function normal(a: ArahPotong): Titik {
  switch (a) {
    case "tegak":
      return [1, 0];
    case "datar":
      return [0, 1];
    case "miring1":
      return [R2, R2];
    default:
      return [R2, -R2];
  }
}

export function titikGaris(g: GarisLab): Titik {
  const n = normal(g.arah);
  return [50 + g.langkah * STEP * n[0], 50 + g.langkah * STEP * n[1]];
}

/** Ujung garis untuk digambar (dipotong oleh tepi gambar). */
export function ujungGaris(g: GarisLab): [Titik, Titik] {
  const n = normal(g.arah);
  const p = titikGaris(g);
  const d: Titik = [-n[1], n[0]];
  return [[p[0] - d[0] * 90, p[1] - d[1] * 90], [p[0] + d[0] * 90, p[1] + d[1] * 90]];
}

function jarakBertanda(p: Titik, g: GarisLab): number {
  const n = normal(g.arah);
  const o = titikGaris(g);
  return (p[0] - o[0]) * n[0] + (p[1] - o[1]) * n[1];
}

function klip(poly: readonly Titik[], g: GarisLab, sisi: 1 | -1): Titik[] {
  const hasil: Titik[] = [];
  for (let i = 0; i < poly.length; i += 1) {
    const a = poly[i];
    const b = poly[(i + 1) % poly.length];
    const da = sisi * jarakBertanda(a, g);
    const db = sisi * jarakBertanda(b, g);
    const dalamA = da >= -EPS;
    const dalamB = db >= -EPS;
    if (dalamA) hasil.push(a);
    if (dalamA !== dalamB) {
      const t = da / (da - db);
      hasil.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]);
    }
  }
  return hasil;
}

/** Membelah satu bangun cembung dengan satu garis. Bila garis tidak memotong, bangun dikembalikan utuh. */
export function belah(poly: readonly Titik[], g: GarisLab): Titik[][] {
  const a = klip(poly, g, 1);
  const b = klip(poly, g, -1);
  if (a.length < 3 || b.length < 3 || luas(a) < LUAS_MIN || luas(b) < LUAS_MIN) return [poly.map((p) => [p[0], p[1]] as Titik)];
  return [a, b];
}

/** Semua bagian setelah garis yang aktif dipakai berurutan. */
export function potong(bentuk: BentukLab, garis: readonly GarisLab[]): Titik[][] {
  let bagian: Titik[][] = [poligonBentuk(bentuk)];
  for (const g of garis) bagian = bagian.flatMap((p) => belah(p, g));
  return bagian;
}

export const rasioBagian = (keping: readonly (readonly Titik[])[]): number[] => {
  const total = keping.reduce((s, p) => s + luas(p), 0);
  return keping.map((p) => luas(p) / total);
};

/** Semua bagian sama besar (paling sedikit dua bagian). */
export function samaBesar(rasio: readonly number[]): boolean {
  const n = rasio.length;
  return n >= 2 && rasio.every((r) => Math.abs(r - 1 / n) <= TOLERANSI);
}

/** Nama bagian bila semuanya sama besar: dua = setengah, empat = seperempat. Selain itu "lain". */
export function namaBagian(rasio: readonly number[]): NamaBagian {
  if (rasio.length === 1) return "utuh";
  if (!samaBesar(rasio)) return "lain";
  if (rasio.length === 2) return "setengah";
  if (rasio.length === 4) return "seperempat";
  return "lain";
}

/**
 * Nama untuk k bagian berwarna dari n bagian. Nama pecahan hanya untuk bagian yang sama besar:
 * 1 dari 2 = setengah, 2 dari 4 = setengah, 1 dari 4 = seperempat, semuanya = utuh. Bagian tidak sama besar tidak diberi nama.
 */
export function namaWarna(k: number, n: number, sama: boolean): NamaWarna {
  if (k <= 0) return "kosong";
  if (n === 1) return "utuh";
  if (!sama) return "lain";
  if (k === n) return "utuh";
  if (2 * k === n) return "setengah";
  if (4 * k === n) return "seperempat";
  return "lain";
}

export function kalimatPotong(bentuk: BentukLab, adaGaris: boolean, n: number, sama: boolean): string {
  const nm = kapital(NAMA_BENTUK[bentuk]);
  if (n === 1) return adaGaris ? `Garis belum memotong ${NAMA_BENTUK[bentuk]}. Geser garisnya ke arah bentuk.` : `${nm} masih utuh. Pilih arah garis untuk membaginya.`;
  const banyak = n === 2 ? "dua" : n === 3 ? "tiga" : "empat";
  if (sama) {
    if (n === 2) return `${nm} terbagi dua sama besar. Setiap bagian adalah setengah.`;
    if (n === 4) return `${nm} terbagi empat sama besar. Setiap bagian adalah seperempat.`;
    return `${nm} terbagi ${banyak} sama besar.`;
  }
  if (n === 2) return `${nm} terbagi dua, tetapi tidak sama besar. Bagian-bagian ini bukan setengah.`;
  if (n === 4) return `${nm} terbagi empat, tetapi tidak sama besar. Bagian-bagian ini bukan seperempat.`;
  return `${nm} terbagi ${banyak}, tetapi tidak sama besar.`;
}

export function kalimatWarna(nama: NamaWarna, k: number, n: number, sama: boolean): string {
  if (nama === "lain" && !sama && n > 1) return `${k} dari ${n} bagian berwarna. Bagiannya tidak sama besar, jadi tidak diberi nama pecahan.`;
  switch (nama) {
    case "kosong":
      return "Ketuk satu bagian untuk mewarnainya.";
    case "utuh":
      return "Semua bagian berwarna. Itu satu utuh.";
    case "setengah":
      return `${k} dari ${n} bagian sama besar berwarna. Itu setengah.`;
    case "seperempat":
      return `${k} dari ${n} bagian sama besar berwarna. Itu seperempat.`;
    default:
      return `${k} dari ${n} bagian berwarna. Itu bukan setengah dan bukan seperempat.`;
  }
}

/** Ucapan untuk tombol suara: kalimat bagian lalu kalimat warna bila ada. */
export function ucapanPotong(bentuk: BentukLab, adaGaris: boolean, n: number, sama: boolean, nama: NamaWarna, k: number): string {
  const a = kalimatPotong(bentuk, adaGaris, n, sama);
  return nama === "kosong" ? a : `${a} ${kalimatWarna(nama, k, n, sama)}`;
}

/** Lambang pecahan untuk satu bagian bila sama besar. */
export const lambangBagian = (nama: NamaBagian): string => (nama === "setengah" ? "½" : nama === "seperempat" ? "¼" : nama === "utuh" ? "1" : "?");
