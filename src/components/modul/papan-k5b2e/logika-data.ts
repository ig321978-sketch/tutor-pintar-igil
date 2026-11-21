/**
 * Logika murni Kelas 5 Bab 2 Sub-Bab E "Papan Bilangan Kak Lintang" (akhir cerita Pasar Kuliner Malam): bilangan prima, saringan Eratosthenes, faktorisasi prima dan pohon faktor,
 * KPK dan FPB dari faktorisasi prima, serta pembagian berulang. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-papan-k5b2e.mjs.
 * Semua gambar dan jawaban dihitung dari fungsi di sini. Hasil kali berulang ditulis 2 × 2 × 3.
 */

/** Bilangan dengan titik pemisah ribuan: 1800 menjadi "1.800". */
export const fmt = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* ------------------------------ Bilangan prima ------------------------------ */
/** Prima lewat pembagian percobaan (cara pertama). */
export function laPrima(n: number): boolean {
  if (!Number.isInteger(n) || n < 2) return false;
  for (let d = 2; d * d <= n; d += 1) if (n % d === 0) return false;
  return true;
}
/** Semua faktor lewat penelusuran satu per satu (cara kedua, untuk uji). */
export function semuaFaktor(n: number): number[] {
  const hasil: number[] = [];
  for (let d = 1; d <= n; d += 1) if (n % d === 0) hasil.push(d);
  return hasil;
}
/** Prima menurut definisi: tepat dua faktor, satu dan bilangan itu sendiri (satu hanya punya satu faktor). */
export const primaMenurutFaktor = (n: number): boolean => n >= 1 && semuaFaktor(n).length === 2;
/** Bilangan prima dari 1 sampai batas. */
export const primaSampai = (batas: number): number[] => Array.from({ length: Math.max(0, batas - 1) }, (_, i) => i + 2).filter(laPrima);

/* ------------------------------ Saringan Eratosthenes ------------------------------ */
/** Semua kelipatan p yang lebih besar dari p, sampai batas. */
export const kelipatanBerikut = (p: number, batas: number): number[] => Array.from({ length: Math.max(0, Math.floor(batas / p) - 1) }, (_, i) => p * (i + 2));
export type LangkahSaring = { p: number; baru: number[]; semua: number[] };
/** Saringan: hapus satu, lalu ambil prima berikutnya dan hapus semua kelipatannya. Langkah dicatat sampai p x p melewati batas; sisanya prima. */
export function saringan(batas: number): { langkah: LangkahSaring[]; sisa: number[]; terhapus: number[] } {
  const hapus = new Set<number>();
  const langkah: LangkahSaring[] = [];
  for (let p = 2; p * p <= batas; p += 1) {
    if (hapus.has(p)) continue;
    const semua = kelipatanBerikut(p, batas);
    const baru = semua.filter((m) => !hapus.has(m));
    for (const m of semua) hapus.add(m);
    langkah.push({ p, baru, semua });
  }
  const sisa = Array.from({ length: Math.max(0, batas - 1) }, (_, i) => i + 2).filter((n) => !hapus.has(n));
  return { langkah, sisa, terhapus: [1, ...[...hapus].sort((a, b) => a - b)] };
}
/** Bilangan yang terhapus bila bilangan prima di `diambil` sudah diambil (satu ikut terhapus bila satuDihapus). */
export function terhapusOleh(diambil: number[], batas: number, satuDihapus: boolean): Set<number> {
  const s = new Set<number>();
  if (satuDihapus) s.add(1);
  for (const p of diambil) for (const m of kelipatanBerikut(p, batas)) s.add(m);
  return s;
}
/** Bilangan prima berikutnya yang boleh diambil: yang terkecil, lebih besar dari prima terakhir, dan belum terhapus. null bila habis. */
export function berikutnyaDiambil(diambil: number[], batas: number): number | null {
  const hapus = terhapusOleh(diambil, batas, true);
  const dari = diambil.length ? Math.max(...diambil) + 1 : 2;
  for (let n = dari; n <= batas; n += 1) if (!hapus.has(n)) return n;
  return null;
}
/** Prima yang masih perlu diambil sampai saringan selesai (p x p tidak lebih dari batas). */
export const perluDiambil = (batas: number): number[] => primaSampai(Math.floor(Math.sqrt(batas)));
/** Bilangan prima berikutnya setelah n (lebih besar dari n). */
export function primaSesudah(n: number): number {
  let m = n + 1;
  while (!laPrima(m)) m += 1;
  return m;
}

/* ------------------------------ Faktorisasi prima dan pohon faktor ------------------------------ */
/** Faktorisasi prima dari kecil ke besar, dengan membagi berulang dari prima terkecil (n paling sedikit 2). */
export function faktorisasi(n: number): number[] {
  const hasil: number[] = [];
  let m = n;
  for (let p = 2; p * p <= m; p += 1)
    while (m % p === 0) {
      hasil.push(p);
      m /= p;
    }
  if (m > 1) hasil.push(m);
  return hasil;
}
/** Faktorisasi prima dengan cara lain (memecah menjadi dua faktor mana saja, seperti pohon faktor), untuk uji. */
export function faktorisasiPohon(n: number): number[] {
  for (let d = 2; d * d <= n; d += 1) if (n % d === 0) return [...faktorisasiPohon(d), ...faktorisasiPohon(n / d)].sort((a, b) => a - b);
  return [n];
}
/** Hasil kali tertulis: 12 menjadi "2 × 2 × 3". */
export const tulisKali = (xs: number[]): string => xs.join(" × ");
export const hasilKali = (xs: number[]): number => xs.reduce((a, b) => a * b, 1);

export type NodePohon = { id: number; bil: number; x: number; y: number; prima: boolean; induk: number | null };
/** Tata letak pohon faktor dalam bidang 100 satuan lebar: bilangan dipecah menjadi prima terkecil dan sisanya (sisa bergeser ke kanan-bawah), sampai ujungnya prima. */
export function pohonTata(n: number): { node: NodePohon[]; tinggi: number } {
  const ps = faktorisasi(n);
  const node: NodePohon[] = [];
  const baru = (bil: number, x: number, y: number, induk: number | null): number => {
    node.push({ id: node.length, bil, x, y, prima: laPrima(bil), induk });
    return node.length - 1;
  };
  if (ps.length === 1) {
    baru(n, 50, 14, null);
    return { node, tinggi: 36 };
  }
  const DX = 12;
  const DY = 26;
  let bil = n;
  let induk = baru(n, 28, 14, null);
  for (let i = 0; i < ps.length - 1; i += 1) {
    const x = node[induk].x;
    const y = node[induk].y;
    baru(ps[i], x - 13, y + DY, induk);
    bil /= ps[i];
    if (i < ps.length - 2) induk = baru(bil, x + DX, y + DY, induk);
    else baru(ps[i + 1], x + 13, y + DY, induk);
  }
  return { node, tinggi: Math.max(...node.map((m) => m.y)) + 22 };
}
/** Daun pohon: node prima (ujung). */
export const daunPohon = (n: number): NodePohon[] => pohonTata(n).node.filter((m) => m.prima);

/* ------------------------------ KPK dan FPB ------------------------------ */
export const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
export const lcm = (a: number, b: number): number => (a / gcd(a, b)) * b;
export const gcdBanyak = (xs: number[]): number => xs.reduce((a, b) => gcd(a, b));
export const lcmBanyak = (xs: number[]): number => xs.reduce((a, b) => lcm(a, b));
const hitung = (xs: number[]): Map<number, number> => {
  const m = new Map<number, number>();
  for (const x of xs) m.set(x, (m.get(x) ?? 0) + 1);
  return m;
};
/** Pasangan prima dua faktorisasi: prima yang berpasangan (dikali jadi FPB), sisa tiap bilangan, dan faktor KPK (pasangan ditulis sekali, ditambah yang tidak berpasangan). */
export function pasangkan(a: number[], b: number[]): { pasangan: number[]; sisaA: number[]; sisaB: number[]; kpk: number[] } {
  const ca = hitung(a);
  const cb = hitung(b);
  const primaSemua = [...new Set([...a, ...b])].sort((x, y) => x - y);
  const pasangan: number[] = [];
  const sisaA: number[] = [];
  const sisaB: number[] = [];
  for (const p of primaSemua) {
    const s = Math.min(ca.get(p) ?? 0, cb.get(p) ?? 0);
    for (let i = 0; i < s; i += 1) pasangan.push(p);
    for (let i = s; i < (ca.get(p) ?? 0); i += 1) sisaA.push(p);
    for (let i = s; i < (cb.get(p) ?? 0); i += 1) sisaB.push(p);
  }
  return { pasangan, sisaA, sisaB, kpk: [...pasangan, ...sisaA, ...sisaB].sort((x, y) => x - y) };
}
/** KPK dari faktorisasi prima banyak bilangan: tiap prima dipakai sebanyak kemunculan terbanyak. */
export function kpkFaktorisasi(fs: number[][]): { faktor: number[]; hasil: number } {
  const maks = new Map<number, number>();
  for (const f of fs) for (const [p, c] of hitung(f)) maks.set(p, Math.max(maks.get(p) ?? 0, c));
  const faktor = [...maks.entries()].sort((x, y) => x[0] - y[0]).flatMap(([p, c]) => Array.from({ length: c }, () => p));
  return { faktor, hasil: hasilKali(faktor) };
}
/** FPB dari faktorisasi prima banyak bilangan: tiap prima dipakai sebanyak kemunculan tersedikit; tanpa pasangan hasilnya 1. */
export function fpbFaktorisasi(fs: number[][]): { faktor: number[]; hasil: number } {
  const semuaPrima = [...new Set(fs.flat())].sort((x, y) => x - y);
  const faktor = semuaPrima.flatMap((p) => Array.from({ length: Math.min(...fs.map((f) => hitung(f).get(p) ?? 0)) }, () => p));
  return { faktor, hasil: hasilKali(faktor) };
}

/* ------------------------------ Pembagian berulang ------------------------------ */
export type BarisBagi = { p: number; sebelum: number[]; sesudah: number[]; semua: boolean };
/** Prima terkecil yang membagi paling sedikit satu bilangan yang masih lebih dari satu; null bila semuanya satu. */
export function pembagiBerikut(cur: number[]): number | null {
  const calon = cur.filter((x) => x > 1).map((x) => faktorisasi(x)[0]);
  return calon.length ? Math.min(...calon) : null;
}
/** Satu baris pembagian dengan prima p: bilangan yang habis dibagi dibagi p, yang tidak tetap ditulis apa adanya. Null bila tak satu pun habis. */
export function bagiSatu(cur: number[], p: number): BarisBagi | null {
  if (!cur.some((x) => x > 1 && x % p === 0)) return null;
  return { p, sebelum: cur, sesudah: cur.map((x) => (x % p === 0 ? x / p : x)), semua: cur.every((x) => x % p === 0) };
}
/** Pembagian berulang dari prima terkecil sampai semuanya satu. KPK = hasil kali semua pembagi; FPB = hasil kali pembagi yang membagi semua bilangan (1 bila tak ada). */
export function pembagianBerulang(bil: number[]): { baris: BarisBagi[]; pembagi: number[]; kpk: number; fpb: number } {
  const baris: BarisBagi[] = [];
  let cur = [...bil];
  for (;;) {
    const p = pembagiBerikut(cur);
    if (p === null) break;
    const b = bagiSatu(cur, p) as BarisBagi;
    baris.push(b);
    cur = b.sesudah;
  }
  return { baris, pembagi: baris.map((b) => b.p), kpk: hasilKali(baris.map((b) => b.p)), fpb: hasilKali(baris.filter((b) => b.semua).map((b) => b.p)) };
}

/* ------------------------------ Susunan pilihan ------------------------------ */
/** Tiga pilihan dengan jawaban benar di posisi p (1 atau 2; tidak pernah pertama). */
export function susun3<T>(benar: T, lain: [T, T], p: 1 | 2): [T, T, T] {
  return p === 1 ? [lain[0], benar, lain[1]] : [lain[0], lain[1], benar];
}
