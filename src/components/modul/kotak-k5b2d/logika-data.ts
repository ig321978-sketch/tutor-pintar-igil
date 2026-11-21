/**
 * Logika murni faktor persekutuan dan FPB Kelas 5 Bab 2 Sub-Bab D "Kotak Bingkisan Pak Joko" (Pasar Kuliner Malam).
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-kotak-k5b2d.mjs.
 * Isi: faktor (percobaan pembagian dan pasangan hasil kali), faktor persekutuan dua atau tiga bilangan, FPB (terbesar dari faktor persekutuan dan cara Euclid sebagai pembanding),
 * papan congklak faktor (lubang bernomor, biji dua warna, lubang berisi dua biji), membagi benda sama rata ke kotak, dan salah umum (faktor persekutuan pertama setelah satu).
 * Semua gambar dan jawaban dihitung dari fungsi di sini.
 */

/** Bilangan dengan titik pemisah ribuan: 1800 menjadi "1.800". */
export const fmt = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* ------------------------------ Faktor ------------------------------ */
/** Semua faktor n dari kecil ke besar: dicoba satu per satu dari 1 sampai n, tiap bilangan yang membagi tanpa sisa adalah faktor. */
export const faktorDari = (n: number): number[] => {
  const hasil: number[] = [];
  for (let i = 1; i <= n; i += 1) if (n % i === 0) hasil.push(i);
  return hasil;
};
/** Pasangan faktor n: hasil kali tiap pasangan sama dengan n. Urut dari pasangan (1, n). */
export const pasanganFaktor = (n: number): [number, number][] => {
  const hasil: [number, number][] = [];
  for (let i = 1; i * i <= n; i += 1) if (n % i === 0) hasil.push([i, n / i]);
  return hasil;
};
/** Faktor n dari pasangan hasil kali (cara kedua, untuk menguji faktorDari). */
export const faktorPasangan = (n: number): number[] => [...new Set(pasanganFaktor(n).flat())].sort((p, q) => p - q);
/** Banyak faktor n. */
export const banyakFaktor = (n: number): number => faktorDari(n).length;

/* ------------------------------ Faktor persekutuan dan FPB ------------------------------ */
/** Faktor yang ada pada semua bilangan (dua atau tiga bilangan): faktor bilangan pertama yang juga membagi bilangan lain tanpa sisa. */
export const persekutuan = (bil: number[]): number[] => faktorDari(bil[0]).filter((f) => bil.every((n) => n % f === 0));
/** Faktor persekutuan dari irisan daftar faktor (cara kedua): faktor yang muncul di semua daftar faktor. */
export const persekutuanDaftar = (bil: number[]): number[] => {
  const daftar = bil.map((n) => faktorDari(n));
  return daftar[0].filter((f) => daftar.every((d) => d.includes(f)));
};
/** FPB: faktor persekutuan yang paling besar. */
export const fpb = (bil: number[]): number => Math.max(...persekutuan(bil));
const euclid = (a: number, b: number): number => (b === 0 ? a : euclid(b, a % b));
/** FPB dengan cara Euclid (pembanding untuk uji): FPB tiga bilangan = FPB dari FPB dua bilangan pertama dan bilangan ketiga. */
export const fpbEuclid = (bil: number[]): number => bil.reduce((g, n) => euclid(g, n));
/** Salah umum: berhenti di faktor persekutuan pertama yang ditemukan setelah satu. */
export const fpbPertamaSetelahSatu = (bil: number[]): number => persekutuan(bil).find((f) => f > 1) ?? 1;
/** Faktor salah satu bilangan yang bukan faktor persekutuan (urut kecil ke besar). */
export const bukanPersekutuan = (bil: number[]): number[] => [...new Set(bil.flatMap((n) => faktorDari(n)))].filter((f) => !persekutuan(bil).includes(f)).sort((p, q) => p - q);
/** Daftar bilangan sebagai teks: "1, 2, 4, 8". */
export const daftarTeks = (xs: number[]): string => xs.join(", ");

/* ------------------------------ Papan congklak faktor ------------------------------ */
export type Lubang = { nomor: number; a: boolean; b: boolean; biji: number };
/** Papan congklak untuk dua bilangan: lubang bernomor 1 sampai `banyak`. Biji merah di lubang faktor bilangan pertama, biji putih di lubang faktor bilangan kedua. */
export function papanCongklak(a: number, b: number, banyak: number = Math.max(a, b)): Lubang[] {
  return Array.from({ length: banyak }, (_, i) => {
    const nomor = i + 1;
    const fa = a % nomor === 0;
    const fb = b % nomor === 0;
    return { nomor, a: fa, b: fb, biji: (fa ? 1 : 0) + (fb ? 1 : 0) };
  });
}
/** Nomor lubang yang berisi dua biji: faktor persekutuan. */
export const lubangDuaBiji = (a: number, b: number): number[] => papanCongklak(a, b).filter((l) => l.biji === 2).map((l) => l.nomor);

/* ------------------------------ Membagi sama rata ke kotak ------------------------------ */
export type BagiRata = { kotak: number; habis: boolean; isi: number[]; sisa: number[] };
/** Bagi tiap jenis benda ke `kotak` kotak: isi tiap kotak dan sisa tiap jenis. Habis bila semua jenis tanpa sisa. */
export function bagiSamaRata(bil: number[], kotak: number): BagiRata {
  const isi = bil.map((n) => Math.floor(n / kotak));
  const sisa = bil.map((n) => n % kotak);
  return { kotak, habis: sisa.every((s) => s === 0), isi, sisa };
}
/** Kotak sebanyak-banyaknya dengan isi sama dan semua benda terpakai: banyak kotak sama dengan FPB. */
export function kotakTerbanyak(bil: number[]): BagiRata {
  return bagiSamaRata(bil, fpb(bil));
}
/** Banyak kotak terbanyak dicari dengan mencoba dari yang paling besar turun sampai semua benda habis (cara kedua, untuk uji). */
export function kotakTurun(bil: number[]): number {
  for (let k = Math.min(...bil); k >= 1; k -= 1) if (bagiSamaRata(bil, k).habis) return k;
  return 1;
}

/* ------------------------------ Susunan pilihan ------------------------------ */
/** Tiga pilihan dengan jawaban benar di posisi p (1 atau 2; tidak pernah pertama). */
export function susun3<T>(benar: T, lain: [T, T], p: 1 | 2): [T, T, T] {
  return p === 1 ? [lain[0], benar, lain[1]] : [lain[0], lain[1], benar];
}
/** Dua bilangan pengecoh berbeda dari benar dan dari satu sama lain, bulat positif: diambil dari kandidat berurutan, lalu dari cadangan kecil di sekitar benar. */
export function duaPengecoh(benar: number, kandidat: number[]): [number, number] {
  const ok = kandidat.filter((x, i) => Number.isInteger(x) && x > 0 && x !== benar && kandidat.indexOf(x) === i);
  const cadangan = [benar + 1, benar * 2, benar + 2, benar - 1, benar + 3, benar * 3].filter((x, i, arr) => x > 0 && x !== benar && !ok.includes(x) && arr.indexOf(x) === i);
  const semua = [...ok, ...cadangan];
  return [semua[0], semua[1]];
}
/** Tiga pilihan daftar faktor persekutuan: yang benar, tanpa angka satu, dan dengan satu faktor yang bukan persekutuan. Selalu tiga teks berbeda. */
export function pilihanDaftar(bil: number[]): { benar: string; lain: [string, string] } {
  const p = persekutuan(bil);
  const tanpaSatu = p.filter((x) => x !== 1);
  const tambahan = bukanPersekutuan(bil)[0];
  const dengan = [...p, tambahan].sort((m, n) => m - n);
  return { benar: daftarTeks(p), lain: [daftarTeks(tanpaSatu), daftarTeks(dengan)] };
}
