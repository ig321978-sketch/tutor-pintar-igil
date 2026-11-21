/**
 * Logika murni penjumlahan pecahan Kelas 5 Bab 3 Sub-Bab B "Roti Isi Pak Seno": KPK, pecahan biasa dan campuran, jumlah, bentuk paling sederhana,
 * pengecoh yang masuk akal, dan tata letak bar pecahan (Concrete: sel beremoji, Pictorial: sel polos). Tanpa React dan tanpa jaringan; diuji di Node: scripts/uji-loyang-k5b3b.mjs.
 * Bar DIGAMBAR sungguh: tiap sel punya titik sendiri, banyak sel terisi sama dengan pembilang, dan bilangan bulat digambar sebagai bar penuh.
 */

/** Bahan, ikon emoji lama (tanpa ZWJ, paling tinggi U+1FA95), dan satuannya. */
export const IKON_BAHAN: Record<string, string> = {
  roti: "\u{1F35E}",
  kue: "\u{1F370}",
  "kue kering": "\u{1F36A}",
  gula: "\u{1F36C}",
  susu: "\u{1F95B}",
  selai: "\u{1F353}",
  cokelat: "\u{1F36B}",
  krim: "\u{1F366}",
  telur: "\u{1F95A}",
};
export const NAMA_BAHAN: readonly string[] = Object.keys(IKON_BAHAN);
export const ikonBahan = (bahan: string): string => IKON_BAHAN[bahan] ?? "\u{1F35E}";
/** Satuan menurut bahan: loyang untuk roti dan kue, kilogram atau liter untuk bahan. */
export const SATUAN_BAHAN: Record<string, string> = {
  roti: "loyang roti",
  kue: "loyang kue",
  "kue kering": "loyang kue kering",
  gula: "kilogram gula",
  susu: "liter susu",
  selai: "kilogram selai",
  cokelat: "kilogram cokelat",
  krim: "liter krim",
  telur: "kilogram telur",
};
export const satuanBahan = (bahan: string): string => SATUAN_BAHAN[bahan] ?? "loyang roti";

/* ------------------------------ Bilangan ------------------------------ */
export const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
/** KPK dua bilangan: kelipatan persekutuan terkecil. */
export const kpk = (a: number, b: number): number => (a / gcd(a, b)) * b;

export type Pec = { n: number; d: number };
export type Camp = { w: number; n: number; d: number };

export const sederhana = (p: Pec): Pec => {
  const g = gcd(p.n, p.d);
  return { n: p.n / g, d: p.d / g };
};
/** Campuran menjadi biasa: (bulat x penyebut) + pembilang, penyebut tetap. */
export const keBiasa = (c: Camp): Pec => ({ n: c.w * c.d + c.n, d: c.d });
/** Jumlah dua pecahan lewat KPK penyebut, lalu disederhanakan. */
export function jumlah(a: Pec, b: Pec): Pec {
  const m = kpk(a.d, b.d);
  return sederhana({ n: a.n * (m / a.d) + b.n * (m / b.d), d: m });
}
/** Pecahan tak murni menjadi campuran (disederhanakan lebih dulu). */
export function keCampur(p: Pec): Camp {
  const s = sederhana(p);
  return { w: Math.floor(s.n / s.d), n: s.n % s.d, d: s.d };
}
export const samaBesar = (a: Pec, b: Pec): boolean => a.n * b.d === b.n * a.d;

/** Penulisan: "3/4", "2 3/4", atau "2". */
export const tPec = (n: number, d: number): string => `${n}/${d}`;
export const tCamp = (c: Camp): string => (c.w === 0 ? tPec(c.n, c.d) : c.n === 0 ? `${c.w}` : `${c.w} ${tPec(c.n, c.d)}`);
/** Bentuk jawaban paling sederhana: pecahan murni bila kurang dari satu, selain itu campuran. */
export const bentuk = (p: Pec): string => tCamp(keCampur(p));

/* ------------------------------ Teks tugas ------------------------------ */
/** Banyak sel pada bar satu pecahan: penyebutnya. */
export const wadahDari = (bahan: string): string => (["roti", "kue", "kue kering"].includes(bahan) ? "loyang" : bahan === "susu" || bahan === "krim" ? "liter" : "kilogram");

/* ------------------------------ Pengecoh yang masuk akal ------------------------------ */
const sama = (a: Camp, b: Camp): boolean => samaBesar(keBiasa(a), keBiasa(b));
const unik = (daftar: string[]): string[] => daftar.filter((x, i, a) => a.indexOf(x) === i);

/**
 * Hasil keliru yang tampak masuk akal untuk jumlah yang benar `h` (sudah sederhana): penyebut ikut dijumlahkan (kesalahan Fajar di Story),
 * pembilang kurang satu, dan pembilang lebih satu. Besarnya tidak pernah sama dengan jawaban benar. `gabung`: hasil bila penyebut ikut dijumlahkan.
 */
export function hasilKeliru(h: Pec, gabung: Camp | null): string[] {
  const benar = tCamp(keCampur(h));
  const kandidat: Camp[] = [];
  if (gabung) kandidat.push(gabung);
  kandidat.push({ w: 0, n: h.n + 1, d: h.d }, { w: 0, n: h.n - 1, d: h.d }, { w: 0, n: h.n + 2, d: h.d });
  return unik(
    kandidat
      .filter((c) => (c.w > 0 || c.n > 0) && c.d > 0)
      .filter((c) => !sama(c.w === 0 ? keCampur({ n: c.n, d: c.d }) : c, keCampur(h)))
      .map((c) => (c.w === 0 ? tCamp(keCampur({ n: c.n, d: c.d })) : tCamp({ w: c.w, n: c.n, d: c.d })))
      .filter((t) => t !== benar),
  );
}

/* ------------------------------ Tata letak bar pecahan ------------------------------ */
export const BAR = { lebar: 300, kiri: 52, kanan: 8, tinggiSel: 16, jarak: 6, atas: 28 } as const;
export type SelBar = { x: number; y: number; w: number; h: number; isi: boolean; bar: number; baris: number };
export type BarPec = { y: number; d: number; terisi: number; label: string; penuh: boolean; baris: number };
export type TataBar = { sel: SelBar[]; bar: BarPec[]; tinggi: number };
export type BarisBar = { label: string; w: number; n: number; d: number };

/**
 * Tata beberapa baris pecahan: tiap baris (campuran atau biasa) menjadi `w` bar penuh dan satu bar berisi `n` dari `d` sel (bila n > 0).
 * Banyak sel terisi sama dengan data. Label baris di kiri, sel mengisi lebar sisa.
 */
export function tataBar(baris: BarisBar[]): TataBar {
  const sel: SelBar[] = [];
  const bar: BarPec[] = [];
  let y = BAR.atas;
  const ruang = BAR.lebar - BAR.kiri - BAR.kanan;
  baris.forEach((r, ib) => {
    const daftar: { terisi: number; penuh: boolean }[] = [...Array.from({ length: r.w }, () => ({ terisi: r.d, penuh: true })), ...(r.n > 0 ? [{ terisi: r.n, penuh: false }] : [])];
    daftar.forEach((b, j) => {
      const lebarSel = ruang / r.d;
      for (let i = 0; i < r.d; i += 1) sel.push({ x: BAR.kiri + i * lebarSel, y, w: lebarSel, h: BAR.tinggiSel, isi: i < b.terisi, bar: bar.length, baris: ib });
      bar.push({ y, d: r.d, terisi: b.terisi, label: j === 0 ? r.label : "", penuh: b.penuh, baris: ib });
      y += BAR.tinggiSel + BAR.jarak;
    });
    y += 4;
  });
  return { sel, bar, tinggi: y + 2 };
}
