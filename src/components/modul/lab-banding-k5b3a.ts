/**
 * Lab Banding Pecahan (Kelas 5 Bab 3, Sub-Bab A: Membandingkan dan Mengurutkan Pecahan): logika murni. Satu alat, tiga tampilan.
 *  Garis    : garis bilangan dibagi sama panjang. Anak menggeser titik ke pecahan lompatan Yohana, lalu memeriksa.
 *             Setelah ketiganya ada di garis, lab menyebut urutannya: makin ke kanan, makin besar.
 *  Banding  : dua batang berdampingan. Anak memilih penyebut yang sama untuk keduanya (pecahan senilai), lalu memilih
 *             tanda. Tanda DIHITUNG dengan perkalian silang (a × q lain dibanding b × q lain).
 *  Campuran : pecahan campuran diubah ke pecahan biasa. Anak menentukan banyak bagian pada bilangan bulatnya, lalu
 *             banyak bagian seluruhnya.
 * Data dari Buku Siswa Kelas V Bab 3 Sub-Bab A (lompatan Yohana, banding pecahan, campuran ke biasa).
 * Semua bilangan bulat. Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k5b3.mjs.
 */

export type Pec = { p: number; q: number };
export type Tanda = "<" | "=" | ">";
export type Campuran = { b: number; p: number; q: number };

/** Garis: lompatan Yohana, 7/8 meter, 2 3/4 meter (11/4), dan 3 1/2 meter (7/2). */
export const DATA_GARIS: Pec[] = [
  { p: 7, q: 8 },
  { p: 11, q: 4 },
  { p: 7, q: 2 },
];
/** Banding: pasangan pecahan. Pasangan 0 pembilang sama, 1 penyebut sama, 2 dan 3 penyebut beda, 4 senilai. */
export const DATA_BANDING: { a: Pec; b: Pec }[] = [
  { a: { p: 1, q: 2 }, b: { p: 1, q: 5 } },
  { a: { p: 3, q: 8 }, b: { p: 5, q: 8 } },
  { a: { p: 1, q: 2 }, b: { p: 3, q: 5 } },
  { a: { p: 2, q: 3 }, b: { p: 3, q: 4 } },
  { a: { p: 1, q: 3 }, b: { p: 2, q: 6 } },
];
export const DATA_CAMPURAN: Campuran[] = [
  { b: 2, p: 3, q: 4 },
  { b: 3, p: 1, q: 2 },
  { b: 1, p: 1, q: 2 },
  { b: 4, p: 1, q: 4 },
];
export const TANDA: Tanda[] = ["<", "=", ">"];

/* ------------------------------ Hitungan ------------------------------ */

export const teksPec = (x: Pec): string => `${x.p}/${x.q}`;
/** Pecahan lebih dari satu bulat ditulis juga sebagai campuran. */
export const teksCampuran = (x: Pec): string => (x.p > x.q && x.p % x.q !== 0 ? `${Math.floor(x.p / x.q)} ${x.p % x.q}/${x.q}` : teksPec(x));
/** Banyak titik pada garis: tiap bulat dibagi q bagian. */
export const maksGaris = (x: Pec): number => Math.ceil(x.p / x.q);
export const titikGaris = (x: Pec): number => maksGaris(x) * x.q;
/** Perkalian silang: negatif berarti a lebih kecil, nol sama, positif a lebih besar. */
export const silang = (a: Pec, b: Pec): number => a.p * b.q - b.p * a.q;
export const tandaBanding = (a: Pec, b: Pec): Tanda => {
  const k = silang(a, b);
  return k < 0 ? "<" : k > 0 ? ">" : "=";
};
export const kataTanda = (t: Tanda): string => (t === "<" ? "lebih kecil dari" : t === ">" ? "lebih besar dari" : "sama dengan");
const bersama = (q1: number, q2: number, n: number): boolean => n % q1 === 0 && n % q2 === 0;
/** Penyebut sama terkecil untuk dua penyebut. */
export function penyebutSama(q1: number, q2: number): number {
  const langkah = Math.max(q1, q2);
  let n = langkah;
  while (!bersama(q1, q2, n)) n += langkah;
  return n;
}
/** Pembilang setelah penyebut diganti d (pecahan senilai). */
export const ubahKe = (x: Pec, d: number): number => x.p * (d / x.q);

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
/** Dua pengecoh pertama dari kandidat: bulat positif, unik, bukan benar. Bila kurang, dilengkapi benar + 1 dan benar − 1. */
function pengecoh(benar: number, kandidat: number[], sah: (n: number) => boolean = () => true): number[] {
  const hasil: number[] = [];
  for (const n of [...kandidat, benar + 1, benar + 2, benar - 1, benar + 3]) {
    if (hasil.length === 2) break;
    if (Number.isInteger(n) && n > 0 && n !== benar && !hasil.includes(n) && sah(n)) hasil.push(n);
  }
  return hasil;
}

/** Pilihan penyebut untuk pasangan i: penyebut sama terkecil dan dua penyebut yang belum cocok. Kosong bila penyebut sudah sama. */
export function opsiPenyebut(i: number): number[] {
  const { a, b } = DATA_BANDING[i];
  if (a.q === b.q) return [];
  const benar = penyebutSama(a.q, b.q);
  const salah = pengecoh(benar, [a.q + b.q, Math.max(a.q, b.q), Math.min(a.q, b.q)], (n) => !bersama(a.q, b.q, n));
  return putar([benar, ...salah], i);
}
/** Pilihan banyak bagian pada bilangan bulat: bulat dikali penyebut, serta dua pengecoh. */
export function opsiBagian(i: number): number[] {
  const { b, p, q } = DATA_CAMPURAN[i];
  const benar = b * q;
  return putar([benar, ...pengecoh(benar, [b + q, b * p, p + q])], i);
}
/** Pilihan banyak bagian seluruhnya: bulat dikali penyebut lalu pembilang, serta dua pengecoh. */
export function opsiTotal(i: number): number[] {
  const { b, p, q } = DATA_CAMPURAN[i];
  const benar = b * q + p;
  return putar([benar, ...pengecoh(benar, [b * q, b + p + q, b * p + q, p + q])], i + 1);
}

/* ------------------------------ Keadaan ------------------------------ */

export type StateBandingK5B3A = {
  garis: { data: number; pos: number; ok: boolean[] };
  banding: { data: number; d: number };
  campuran: { data: number; bagianOk: boolean };
  pernah: string[];
  pesan: string;
};

export type AksiBandingK5B3A =
  | { t: "G_DATA"; i: number }
  | { t: "G_POS"; n: number }
  | { t: "G_LETAK" }
  | { t: "B_DATA"; i: number }
  | { t: "B_SAMA"; nilai: number }
  | { t: "B_TANDA"; tanda: Tanda }
  | { t: "C_DATA"; i: number }
  | { t: "C_BAGIAN"; nilai: number }
  | { t: "C_TOTAL"; nilai: number }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

const dAwalBanding = (i: number): number => (DATA_BANDING[i].a.q === DATA_BANDING[i].b.q ? DATA_BANDING[i].a.q : 0);

export const awalBandingK5B3A = (): StateBandingK5B3A => ({
  garis: { data: 0, pos: -1, ok: DATA_GARIS.map(() => false) },
  banding: { data: 0, d: dAwalBanding(0) },
  campuran: { data: 0, bagianOk: false },
  pernah: [],
  pesan: "",
});

const catat = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

export const dataGaris = (x: StateBandingK5B3A): Pec => DATA_GARIS[x.garis.data];
export const dataBanding = (x: StateBandingK5B3A): { a: Pec; b: Pec } => DATA_BANDING[x.banding.data];
export const dataCampuran = (x: StateBandingK5B3A): Campuran => DATA_CAMPURAN[x.campuran.data];
/** Urutan pecahan garis dari kecil ke besar (perkalian silang). */
export const urutGaris = (): Pec[] => [...DATA_GARIS].sort(silang);

function letak(x: StateBandingK5B3A): StateBandingK5B3A {
  const t = dataGaris(x);
  const pos = x.garis.pos;
  if (pos < 0) return { ...x, pesan: "Ketuk dulu sebuah titik di garis, lalu periksa." };
  if (pos !== t.p) {
    const arah = pos < t.p ? "Geser lebih ke kanan." : "Geser lebih ke kiri.";
    return { ...x, pesan: `Titik itu ${pos}/${t.q}. ${arah} Tiap bulat dibagi ${t.q} bagian, hitung ${t.p} bagian dari nol.` };
  }
  const ok = x.garis.ok.map((v, i) => (i === x.garis.data ? true : v));
  const pernah = catat(x.pernah, `garis:${t.p}:${t.q}`);
  const baru = { ...x, garis: { ...x.garis, ok }, pernah };
  const lebih = t.p > t.q ? ` Titik itu sudah melewati ${Math.floor(t.p / t.q)} bulat, jadi ditulis juga ${teksCampuran(t)}.` : "";
  const dasar = `✅ Tepat! ${teksPec(t)} ada di titik ke-${t.p} dari nol, tiap bulat dibagi ${t.q} bagian.${lebih}`;
  if (ok.every(Boolean)) {
    const urut = urutGaris().map(teksCampuran).join(", ");
    return { ...baru, pesan: `${dasar} Ketiga lompatan sudah ada di garis. Dari kiri ke kanan: ${urut}. Makin ke kanan, makin besar.` };
  }
  return { ...baru, pesan: dasar };
}

function pilihPenyebut(x: StateBandingK5B3A, n: number): StateBandingK5B3A {
  const { a, b } = dataBanding(x);
  if (a.q === b.q) return { ...x, pesan: "Penyebutnya sudah sama. Langsung bandingkan pembilangnya." };
  if (!opsiPenyebut(x.banding.data).includes(n)) return x;
  if (bersama(a.q, b.q, n)) {
    return {
      ...x,
      banding: { ...x.banding, d: n },
      pesan: `✅ Penyebut ${n}: ${teksPec(a)} menjadi ${ubahKe(a, n)}/${n}, dan ${teksPec(b)} menjadi ${ubahKe(b, n)}/${n}. Penyebut sudah sama, tinggal membandingkan pembilangnya.`,
    };
  }
  const q = n % a.q !== 0 ? a.q : b.q;
  return { ...x, banding: { ...x.banding, d: 0 }, pesan: `${n} belum bisa dibagi ${q} tanpa sisa. Pilih penyebut yang bisa dibagi oleh kedua penyebut.` };
}

function pilihTanda(x: StateBandingK5B3A, tanda: Tanda): StateBandingK5B3A {
  const { a, b } = dataBanding(x);
  const d = x.banding.d;
  if (d === 0) return { ...x, pesan: "Samakan dulu penyebutnya, baru pilih tandanya." };
  const benar = tandaBanding(a, b);
  const ap = ubahKe(a, d);
  const bp = ubahKe(b, d);
  const pembilangSama = a.p === b.p && a.q !== b.q;
  if (tanda === benar) {
    const sisip = pembilangSama ? " Pembilang sama: penyebut yang lebih kecil membuat tiap bagian lebih besar." : benar === "=" ? " Keduanya senilai, menunjuk bagian yang sama besar." : "";
    return {
      ...x,
      pernah: catat(x.pernah, `banding:${x.banding.data}`),
      pesan: `✅ ${teksPec(a)} ${benar} ${teksPec(b)}. Dengan penyebut ${d}: ${ap}/${d} ${benar} ${bp}/${d}, karena ${ap} ${kataTanda(benar)} ${bp}.${sisip}`,
    };
  }
  const khusus = pembilangSama && tanda === "=" ? " Pembilang sama belum berarti sama besar, penyebutnya berbeda." : pembilangSama ? " Jangan hanya melihat penyebut: penyebut lebih besar berarti tiap bagian lebih kecil." : "";
  return { ...x, pesan: `Belum. Bandingkan pembilangnya setelah penyebut sama: ${ap} dan ${bp}.${khusus}` };
}

function pilihBagian(x: StateBandingK5B3A, n: number): StateBandingK5B3A {
  const { b, p, q } = dataCampuran(x);
  if (!opsiBagian(x.campuran.data).includes(n)) return x;
  if (n === b * q) return { ...x, campuran: { ...x.campuran, bagianOk: true }, pesan: `✅ Benar, ${b} bulat berisi ${b * q} bagian, sebab tiap bulat dibagi ${q} bagian. Sekarang hitung semua bagiannya, termasuk ${p} bagian pecahannya.` };
  return { ...x, campuran: { ...x.campuran, bagianOk: false }, pesan: `Belum. Tiap bulat dibagi menjadi ${q} bagian. Hitung ${q} bagian untuk setiap bulat dari ${b} bulat.` };
}

function pilihTotal(x: StateBandingK5B3A, n: number): StateBandingK5B3A {
  const { b, p, q } = dataCampuran(x);
  if (!x.campuran.bagianOk) return { ...x, pesan: "Tentukan dulu banyak bagian pada bilangan bulatnya." };
  if (!opsiTotal(x.campuran.data).includes(n)) return x;
  if (n === b * q + p) {
    return {
      ...x,
      pernah: catat(x.pernah, `campuran:${b}:${p}:${q}`),
      pesan: `✅ Tepat! ${b} ${p}/${q} sama dengan ${n}/${q}: ${b} × ${q} = ${b * q} bagian dari bulatnya, lalu ${p} bagian pecahannya, semuanya bagian per ${q}.`,
    };
  }
  if (n === b * q) return { ...x, pesan: `Itu baru bagian dari bilangan bulatnya. Masih ada ${p} bagian pecahan yang ikut dihitung.` };
  if (n === b + p + q) return { ...x, pesan: `Menggabung semua angka tidak memberi banyak bagian. Tiap bulat berisi ${q} bagian, hitung bagiannya.` };
  return { ...x, pesan: `Belum. Hitung semua bagian: ${b * q} bagian dari bulatnya, lalu bagian pecahannya.` };
}

export function langkahBandingK5B3A(x: StateBandingK5B3A, a: AksiBandingK5B3A): StateBandingK5B3A {
  switch (a.t) {
    case "G_DATA":
      return sah(a.i, DATA_GARIS.length) ? { ...x, garis: { ...x.garis, data: a.i, pos: -1 }, pesan: "" } : x;
    case "G_POS":
      return Number.isInteger(a.n) && a.n >= 1 && a.n <= titikGaris(dataGaris(x)) ? { ...x, garis: { ...x.garis, pos: a.n }, pesan: "" } : x;
    case "G_LETAK":
      return letak(x);
    case "B_DATA":
      return sah(a.i, DATA_BANDING.length) ? { ...x, banding: { data: a.i, d: dAwalBanding(a.i) }, pesan: "" } : x;
    case "B_SAMA":
      return pilihPenyebut(x, a.nilai);
    case "B_TANDA":
      return TANDA.includes(a.tanda) ? pilihTanda(x, a.tanda) : x;
    case "C_DATA":
      return sah(a.i, DATA_CAMPURAN.length) ? { ...x, campuran: { data: a.i, bagianOk: false }, pesan: "" } : x;
    case "C_BAGIAN":
      return pilihBagian(x, a.nilai);
    case "C_TOTAL":
      return pilihTotal(x, a.nilai);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalBandingK5B3A();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanBandingK5B3A = { alat: "banding"; pernah: string[] };
export const keadaanBandingK5B3A = (x: StateBandingK5B3A): KeadaanBandingK5B3A => ({ alat: "banding", pernah: x.pernah });

export const ucapGarisK5B3A = (x: StateBandingK5B3A): string => {
  const t = dataGaris(x);
  const sekarang = x.garis.pos < 0 ? "Belum ada titik yang dipilih." : `Titik sekarang ${x.garis.pos}/${t.q}.`;
  return `Letakkan ${teksPec(t)} di garis bilangan. Tiap bulat dibagi ${t.q} bagian sama panjang. ${sekarang}`;
};
export const ucapBandingK5B3A = (x: StateBandingK5B3A): string => {
  const { a, b } = dataBanding(x);
  const sekarang = x.banding.d === 0 ? "Samakan dulu penyebutnya." : `Penyebutnya sudah ${x.banding.d}. Pilih tandanya.`;
  return `Bandingkan ${teksPec(a)} dan ${teksPec(b)}. ${sekarang}`;
};
export const ucapCampuranK5B3A = (x: StateBandingK5B3A): string => {
  const { b, p, q } = dataCampuran(x);
  const sekarang = x.campuran.bagianOk ? "Sekarang tentukan banyak bagian seluruhnya." : "Tentukan dulu banyak bagian pada bilangan bulatnya.";
  return `Ubah ${b} ${p}/${q} menjadi pecahan biasa. ${sekarang}`;
};
