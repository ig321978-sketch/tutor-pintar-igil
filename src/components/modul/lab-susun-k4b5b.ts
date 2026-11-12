/**
 * Lab Susun (Kelas 4 Bab 5, Sub-Bab B): logika murni. Satu alat, tiga tampilan.
 *  Susun   : papan petak 3 baris × 4 kolom. Tiap petak terbagi empat segitiga perempat (oleh kedua diagonalnya).
 *            Keping segitiga (setengah petak, empat arah) dan persegi (satu petak) ditaruh di petak. Saat diperiksa,
 *            tepi bangun gabungan DIHITUNG dari perempat yang terisi (ruas yang hanya dimiliki satu perempat), ruas
 *            segaris digabung, lalu bangun dinamai dari ciri sisi, sudut, dan sejajar (bilangan bulat).
 *  Urai    : bangun utuh (persegi, persegi panjang, trapesium, segienam beraturan) dipotong dari titik ke titik.
 *            Potongan membelah bagian yang memuat kedua titik di tepinya; tiap bagian dinamai dari koordinat. Persegi
 *            memakai kisi persegi; trapesium dan segienam memakai kisi segitiga (panjang dihitung dengan a² + ab + b²),
 *            jadi segitiga sama sisi dihitung tepat dengan bilangan bulat. Jumlah luas bagian dibanding luas utuh.
 *  Tangram : tujuh keping tangram baku (papan 4 × 4) ditaruh pada siluet. Keping boleh diputar seperempat putaran dan
 *            jajargenjang boleh dibalik. Keping yang keluar siluet atau bertumpuk ditolak.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k4b5.mjs.
 */

export type Pt = [number, number];
/** Perempat petak: baris, kolom, arah (0 atas, 1 kanan, 2 bawah, 3 kiri). */
export type Perempat = [number, number, number];

const kunciP = (p: Perempat): string => p.join(",");
const kurang = (a: Pt, b: Pt): Pt => [a[0] - b[0], a[1] - b[1]];
const silang = (a: Pt, b: Pt): number => a[0] * b[1] - a[1] * b[0];

/** Titik sudut perempat dalam koordinat ganda (×2) agar titik tengah petak tetap bulat. */
export function titikPerempat([r, c, q]: Perempat): Pt[] {
  const tl: Pt = [2 * c, 2 * r];
  const tr: Pt = [2 * c + 2, 2 * r];
  const br: Pt = [2 * c + 2, 2 * r + 2];
  const bl: Pt = [2 * c, 2 * r + 2];
  const tengah: Pt = [2 * c + 1, 2 * r + 1];
  const tepi: [Pt, Pt][] = [[tl, tr], [tr, br], [br, bl], [bl, tl]];
  return [...tepi[q], tengah];
}

/** Titik di dalam segi banyak (ray casting dengan perkalian silang bulat). Titik tidak boleh tepat di tepi. */
function diDalam(t: Pt, poli: Pt[]): boolean {
  let dalam = false;
  for (let i = 0, j = poli.length - 1; i < poli.length; j = i, i += 1) {
    const [xi, yi] = poli[i];
    const [xj, yj] = poli[j];
    if (yi > t[1] !== yj > t[1]) {
      // x potong > t.x  ⇔  (xj - xi)(t.y - yi) / (yj - yi) + xi > t.x
      const kiri = (xj - xi) * (t[1] - yi) + (xi - t[0]) * (yj - yi);
      if (yj - yi > 0 ? kiri > 0 : kiri < 0) dalam = !dalam;
    }
  }
  return dalam;
}

/** Perempat di papan baris × kolom yang berada di dalam segi banyak (koordinat satuan petak). */
export function perempatDari(poli: Pt[], baris: number, kolom: number): Perempat[] {
  const besar = poli.map(([x, y]) => [x * 6, y * 6] as Pt);
  const hasil: Perempat[] = [];
  for (let r = 0; r < baris; r += 1)
    for (let c = 0; c < kolom; c += 1)
      for (let q = 0; q < 4; q += 1) {
        const t = titikPerempat([r, c, q]);
        const pusat: Pt = [t[0][0] + t[1][0] + t[2][0], t[0][1] + t[1][1] + t[2][1]];
        if (diDalam(pusat, besar)) hasil.push([r, c, q]);
      }
  return hasil;
}

/* ------------------------------ Nama bangun dari titik sudut ------------------------------ */

export type Metrik = "persegi" | "segitiga";
/** Hasil kali titik (×2 untuk kisi segitiga) dan kuadrat panjang menurut kisi. */
const kaliTitik = (m: Metrik, u: Pt, v: Pt): number => (m === "persegi" ? u[0] * v[0] + u[1] * v[1] : 2 * u[0] * v[0] + u[0] * v[1] + u[1] * v[0] + 2 * u[1] * v[1]);
const pj2 = (m: Metrik, u: Pt): number => kaliTitik(m, u, u);

/** Buang titik yang segaris dengan kedua tetangganya. */
export function rapikan(p: Pt[]): Pt[] {
  let t = [...p];
  let ubah = true;
  while (ubah && t.length > 3) {
    ubah = false;
    for (let i = 0; i < t.length; i += 1) {
      const a = t[(i - 1 + t.length) % t.length];
      const b = t[i];
      const c = t[(i + 1) % t.length];
      if (silang(kurang(b, a), kurang(c, b)) === 0) {
        t = t.filter((_, j) => j !== i);
        ubah = true;
        break;
      }
    }
  }
  return t;
}

export type NamaBangun = { jenis: string; nama: string; sisi: number };

/** Nama bangun dari titik sudut berurutan (sudah dirapikan). */
export function namaiBangun(p: Pt[], m: Metrik): NamaBangun {
  const n = p.length;
  const ke = (i: number) => p[((i % n) + n) % n];
  const sisiV = Array.from({ length: n }, (_, i) => kurang(ke(i + 1), ke(i)));
  const pj = sisiV.map((v) => pj2(m, v));
  let luas2 = 0;
  for (let i = 0; i < n; i += 1) luas2 += silang(ke(i), ke(i + 1));
  const arah = Math.sign(luas2);
  const cekung = sisiV.some((v, i) => Math.sign(silang(sisiV[(i - 1 + n) % n], v)) !== arah);
  const siku = sisiV.filter((v, i) => kaliTitik(m, sisiV[(i - 1 + n) % n], v) === 0).length;
  const samaSemua = pj.every((v) => v === pj[0]);
  if (n === 3) {
    const nama = siku > 0 ? "segitiga siku-siku" : samaSemua ? "segitiga sama sisi" : "segitiga";
    return { jenis: "segitiga", nama, sisi: 3 };
  }
  if (n === 4) {
    let sejajar = 0;
    for (const i of [0, 1]) if (silang(sisiV[i], sisiV[i + 2]) === 0) sejajar += 1;
    let jenis: string;
    if (cekung) jenis = "segiempat";
    else if (sejajar === 2) jenis = siku === 4 && samaSemua ? "persegi" : siku === 4 ? "persegi-panjang" : samaSemua ? "belah-ketupat" : "jajargenjang";
    else if (sejajar === 1) jenis = "trapesium";
    else jenis = (pj[0] === pj[1] && pj[2] === pj[3]) || (pj[1] === pj[2] && pj[3] === pj[0]) ? "layang-layang" : "segiempat";
    const nama = jenis === "layang-layang" ? jenis : jenis === "segiempat" ? "segiempat tak beraturan" : jenis.replace("-", " ");
    return { jenis, nama, sisi: 4 };
  }
  if (n === 5) return { jenis: "segilima", nama: "segilima", sisi: 5 };
  if (n === 6) return { jenis: "segienam", nama: "segienam", sisi: 6 };
  return { jenis: `segi-${n}`, nama: `segi banyak ${n} sisi`, sisi: n };
}

/** Dua kali luas (rumus tali sepatu), bilangan bulat. */
export const luasGanda = (p: Pt[]): number => Math.abs(p.reduce((s, a, i) => s + silang(a, p[(i + 1) % p.length]), 0));

/* ------------------------------ Tepi bangun gabungan ------------------------------ */

export type HasilTepi = { ok: true; titik: Pt[] } | { ok: false; alasan: "kosong" | "titik" | "terpisah" };

/** Tepi gabungan perempat: ruas yang hanya dimiliki satu perempat, dirangkai menjadi satu keliling. */
export function tepiGabungan(qs: Perempat[]): HasilTepi {
  if (qs.length === 0) return { ok: false, alasan: "kosong" };
  const hitung = new Map<string, { a: Pt; b: Pt; n: number }>();
  for (const q of qs) {
    const t = titikPerempat(q);
    for (let i = 0; i < 3; i += 1) {
      const a = t[i];
      const b = t[(i + 1) % 3];
      const k = a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]) ? `${a}|${b}` : `${b}|${a}`;
      const ada = hitung.get(k);
      if (ada) ada.n += 1;
      else hitung.set(k, { a, b, n: 1 });
    }
  }
  const tepi = [...hitung.values()].filter((e) => e.n === 1);
  const tetangga = new Map<string, Pt[]>();
  for (const e of tepi) {
    for (const [x, y] of [[e.a, e.b], [e.b, e.a]] as [Pt, Pt][]) {
      const k = String(x);
      tetangga.set(k, [...(tetangga.get(k) ?? []), y]);
    }
  }
  if ([...tetangga.values()].some((v) => v.length !== 2)) return { ok: false, alasan: "titik" };
  const awal = tepi[0].a;
  const jalur: Pt[] = [awal];
  let sebelum = awal;
  let kini = tepi[0].b;
  while (String(kini) !== String(awal)) {
    jalur.push(kini);
    const [p, q] = tetangga.get(String(kini)) as Pt[];
    const lanjut = String(p) === String(sebelum) ? q : p;
    sebelum = kini;
    kini = lanjut;
    if (jalur.length > tepi.length) break;
  }
  if (jalur.length !== tepi.length) return { ok: false, alasan: "terpisah" };
  return { ok: true, titik: rapikan(jalur) };
}

/* ------------------------------ Susun ------------------------------ */

export const SUSUN_BARIS = 3;
export const SUSUN_KOLOM = 4;
export const MAKS_KEPING_SUSUN = 8;
/** Arah keping segitiga: letak sudut siku-sikunya (kiri atas, kanan atas, kanan bawah, kiri bawah). */
export const ARAH_SEGITIGA = ["kiri atas", "kanan atas", "kanan bawah", "kiri bawah"];
const PEREMPAT_SEGITIGA: number[][] = [[0, 3], [0, 1], [1, 2], [2, 3]];

export type KepingSusun = { jenis: "segitiga" | "persegi"; arah: number; r: number; c: number };
export const perempatKeping = (k: KepingSusun): Perempat[] => (k.jenis === "persegi" ? [0, 1, 2, 3] : PEREMPAT_SEGITIGA[k.arah]).map((q) => [k.r, k.c, q] as Perempat);

/* ------------------------------ Urai ------------------------------ */

export type BentukUrai = { id: string; nama: string; metrik: Metrik; sudut: Pt[]; tambahan: Pt[] };
export const URAI: BentukUrai[] = [
  { id: "persegi", nama: "persegi", metrik: "persegi", sudut: [[0, 0], [4, 0], [4, 4], [0, 4]], tambahan: [[2, 0], [4, 2], [2, 4], [0, 2], [2, 2]] },
  { id: "persegi-panjang", nama: "persegi panjang", metrik: "persegi", sudut: [[0, 0], [8, 0], [8, 4], [0, 4]], tambahan: [[4, 0], [8, 2], [4, 4], [0, 2], [4, 2]] },
  { id: "trapesium", nama: "trapesium", metrik: "segitiga", sudut: [[0, 0], [4, 0], [2, 2], [0, 2]], tambahan: [[2, 0]] },
  { id: "segienam", nama: "segienam beraturan", metrik: "segitiga", sudut: [[2, 0], [0, 2], [-2, 2], [-2, 0], [0, -2], [2, -2]], tambahan: [[0, 0]] },
];
export const MAKS_POTONG = 8;

const samaT = (a: Pt, b: Pt) => a[0] === b[0] && a[1] === b[1];
/** Titik c tepat di dalam ruas a–b (bukan ujungnya). */
const diRuasDalam = (a: Pt, b: Pt, c: Pt): boolean =>
  silang(kurang(b, a), kurang(c, a)) === 0 && !samaT(a, c) && !samaT(b, c) && Math.min(a[0], b[0]) <= c[0] && c[0] <= Math.max(a[0], b[0]) && Math.min(a[1], b[1]) <= c[1] && c[1] <= Math.max(a[1], b[1]);

/** Semua titik yang bisa diketuk pada bentuk: sudut lalu titik tambahan. */
export const titikUrai = (b: BentukUrai): Pt[] => [...b.sudut, ...b.tambahan];

/** Bagian awal: bangun utuh, titik tambahan yang terletak di tepinya disisipkan. */
function bagianAwal(b: BentukUrai): Pt[] {
  const hasil: Pt[] = [];
  b.sudut.forEach((a, i) => {
    const c = b.sudut[(i + 1) % b.sudut.length];
    hasil.push(a);
    const dalam = b.tambahan.filter((t) => diRuasDalam(a, c, t)).sort((p, q) => Math.abs(p[0] - a[0]) + Math.abs(p[1] - a[1]) - (Math.abs(q[0] - a[0]) + Math.abs(q[1] - a[1])));
    hasil.push(...dalam);
  });
  return hasil;
}

export type HasilPotong = { ok: true; bagian: Pt[][] } | { ok: false; alasan: "sama" | "tepi" | "luar" };

/** Potong salah satu bagian dari titik a ke titik b. */
export function potongBagian(b: BentukUrai, bagian: Pt[][], a: Pt, c: Pt): HasilPotong {
  if (samaT(a, c)) return { ok: false, alasan: "sama" };
  const k = bagian.findIndex((p) => p.some((t) => samaT(t, a)) && p.some((t) => samaT(t, c)));
  if (k < 0) {
    // Potongan lurus yang melewati titik tengah bisa membelah dua bagian sekaligus: potong ruas demi ruas.
    const antara = b.tambahan.filter((t) => diRuasDalam(a, c, t)).sort((x, y) => Math.abs(x[0] - a[0]) + Math.abs(x[1] - a[1]) - (Math.abs(y[0] - a[0]) + Math.abs(y[1] - a[1])));
    if (antara.length === 0) return { ok: false, alasan: "luar" };
    let kini = bagian;
    const jalur = [a, ...antara, c];
    for (let i = 0; i + 1 < jalur.length; i += 1) {
      const h = potongBagian(b, kini, jalur[i], jalur[i + 1]);
      if (!h.ok) return { ok: false, alasan: "luar" };
      kini = h.bagian;
    }
    return { ok: true, bagian: kini };
  }
  const p = bagian[k];
  const n = p.length;
  let i = p.findIndex((t) => samaT(t, a));
  let j = p.findIndex((t) => samaT(t, c));
  if (i > j) [i, j] = [j, i];
  const satu = p.slice(i, j + 1);
  const dua = [...p.slice(j), ...p.slice(0, i + 1)];
  // Bila semua titik di satu sisi segaris dengan potongan, potongan itu berjalan di tepi bangun.
  const segaris = (s: Pt[]) => s.every((t) => silang(kurang(p[j], p[i]), kurang(t, p[i])) === 0);
  if (segaris(satu) || segaris(dua) || n < 3) return { ok: false, alasan: "tepi" };
  const dalam = b.tambahan.filter((t) => diRuasDalam(p[i], p[j], t)).sort((x, y) => Math.abs(x[0] - p[j][0]) + Math.abs(x[1] - p[j][1]) - (Math.abs(y[0] - p[j][0]) + Math.abs(y[1] - p[j][1])));
  // satu: p[i] … p[j], lalu kembali dari p[j] ke p[i] lewat titik di potongan (urut dari dekat p[j]).
  const baru1 = [...satu, ...dalam];
  const baru2 = [...dua, ...[...dalam].reverse()];
  return { ok: true, bagian: [...bagian.slice(0, k), baru1, baru2, ...bagian.slice(k + 1)] };
}

/** Bagian setelah serangkaian potongan (indeks titik). Potongan yang tidak sah dilewati. */
export function bagianUrai(b: BentukUrai, potong: [number, number][]): Pt[][] {
  const titik = titikUrai(b);
  let bagian = [bagianAwal(b)];
  for (const [x, y] of potong) {
    const h = potongBagian(b, bagian, titik[x], titik[y]);
    if (h.ok) bagian = h.bagian;
  }
  return bagian;
}

/** Tanda pengurai: banyak tiap jenis bagian, misalnya "6-segitiga" atau "1-segitiga+1-trapesium". */
export function tandaUrai(b: BentukUrai, bagian: Pt[][]): string {
  const hitung = new Map<string, number>();
  for (const p of bagian) {
    const j = namaiBangun(rapikan(p), b.metrik).jenis;
    hitung.set(j, (hitung.get(j) ?? 0) + 1);
  }
  return [...hitung.entries()].sort((x, y) => (x[0] < y[0] ? -1 : 1)).map(([j, n]) => `${n}-${j}`).join("+");
}

/* ------------------------------ Tangram ------------------------------ */

export const TANGRAM_SISI = 4;
export type KepingTangram = { id: string; nama: string; poli: Pt[]; bisaBalik: boolean };
/** Tujuh keping tangram baku yang menyusun persegi 4 × 4. */
export const TANGRAM: KepingTangram[] = [
  { id: "besar-1", nama: "segitiga besar", poli: [[0, 0], [4, 0], [2, 2]], bisaBalik: false },
  { id: "besar-2", nama: "segitiga besar", poli: [[0, 0], [2, 2], [0, 4]], bisaBalik: false },
  { id: "sedang", nama: "segitiga sedang", poli: [[4, 2], [4, 4], [2, 4]], bisaBalik: false },
  { id: "kecil-1", nama: "segitiga kecil", poli: [[4, 0], [4, 2], [3, 1]], bisaBalik: false },
  { id: "kecil-2", nama: "segitiga kecil", poli: [[2, 2], [3, 3], [1, 3]], bisaBalik: false },
  { id: "persegi", nama: "persegi", poli: [[2, 2], [3, 1], [4, 2], [3, 3]], bisaBalik: false },
  { id: "jajar", nama: "jajargenjang", poli: [[0, 4], [1, 3], [3, 3], [2, 4]], bisaBalik: true },
];
export type Siluet = { id: string; nama: string; poli: Pt[] };
export const SILUET: Siluet[] = [
  { id: "segitiga", nama: "segitiga besar", poli: [[0, 0], [4, 0], [2, 2]] },
  { id: "persegi-kecil", nama: "persegi miring", poli: [[1, 0], [2, 1], [1, 2], [0, 1]] },
  { id: "persegi-besar", nama: "persegi besar", poli: [[0, 0], [4, 0], [4, 4], [0, 4]] },
];

/** Geser perempat agar baris dan kolom terkecil menjadi 0. */
const normal = (qs: Perempat[]): Perempat[] => {
  const r0 = Math.min(...qs.map((q) => q[0]));
  const c0 = Math.min(...qs.map((q) => q[1]));
  return qs.map(([r, c, q]) => [r - r0, c - c0, q] as Perempat);
};
/** Putar seperempat putaran searah jarum jam (di layar). */
const putarSekali = (qs: Perempat[]): Perempat[] => normal(qs.map(([r, c, q]) => [c, -r - 1, (q + 1) % 4] as Perempat));
/** Balik kiri-kanan. */
const balikSekali = (qs: Perempat[]): Perempat[] => normal(qs.map(([r, c, q]) => [r, -c - 1, q % 2 === 1 ? 4 - q : q] as Perempat));

/** Perempat keping k setelah dibalik dan diputar, dengan pojok kiri atas di (0, 0). */
export function bentukKeping(k: number, putar: number, balik: boolean): Perempat[] {
  let qs = normal(perempatDari(TANGRAM[k].poli, TANGRAM_SISI, TANGRAM_SISI));
  if (balik && TANGRAM[k].bisaBalik) qs = balikSekali(qs);
  for (let i = 0; i < ((putar % 4) + 4) % 4; i += 1) qs = putarSekali(qs);
  return qs;
}
export type PasangTangram = { k: number; putar: number; balik: boolean; r: number; c: number };
export const perempatPasang = (p: PasangTangram): Perempat[] => bentukKeping(p.k, p.putar, p.balik).map(([r, c, q]) => [r + p.r, c + p.c, q] as Perempat);
export const perempatSiluet = (s: number): Perempat[] => perempatDari(SILUET[s].poli, TANGRAM_SISI, TANGRAM_SISI);

/* ------------------------------ Keadaan ------------------------------ */

export type StateSusunK4B5B = {
  jenis: "segitiga" | "persegi";
  arah: number;
  keping: KepingSusun[];
  bentuk: number;
  potong: [number, number][];
  titikPilih: number | null;
  siluet: number;
  tPilih: number;
  tPutar: number;
  tBalik: boolean;
  tangram: PasangTangram[];
  pernah: string[];
  pesan: string;
};

export type AksiSusunK4B5B =
  | { t: "S_JENIS"; jenis: "segitiga" | "persegi" }
  | { t: "S_ARAH"; arah: number }
  | { t: "S_TARUH"; r: number; c: number }
  | { t: "S_ANGKAT" }
  | { t: "S_BERSIH" }
  | { t: "S_CEK" }
  | { t: "U_BENTUK"; i: number }
  | { t: "U_TITIK"; i: number }
  | { t: "U_BATAL" }
  | { t: "U_ULANG" }
  | { t: "U_CEK" }
  | { t: "G_SILUET"; i: number }
  | { t: "G_PILIH"; k: number }
  | { t: "G_PUTAR" }
  | { t: "G_BALIK" }
  | { t: "G_TARUH"; r: number; c: number }
  | { t: "G_ANGKAT" }
  | { t: "G_CEK" }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalSusunK4B5B = (): StateSusunK4B5B => ({
  jenis: "segitiga",
  arah: 0,
  keping: [],
  bentuk: 0,
  potong: [],
  titikPilih: null,
  siluet: 0,
  tPilih: 0,
  tPutar: 0,
  tBalik: false,
  tangram: [],
  pernah: [],
  pesan: "",
});

const tambah = (daftar: string[], id: string): string[] => (daftar.includes(id) ? daftar : [...daftar, id]);
const kapital = (t: string): string => `${t[0].toUpperCase()}${t.slice(1)}`;

export const perempatSusun = (x: StateSusunK4B5B): Perempat[] => x.keping.flatMap(perempatKeping);

function taruhSusun(x: StateSusunK4B5B, r: number, c: number): StateSusunK4B5B {
  if (![r, c].every(Number.isInteger) || r < 0 || c < 0 || r >= SUSUN_BARIS || c >= SUSUN_KOLOM) return x;
  if (x.keping.length >= MAKS_KEPING_SUSUN) return { ...x, pesan: `Paling banyak ${MAKS_KEPING_SUSUN} keping. Periksa dulu, atau angkat keping.` };
  const baru: KepingSusun = { jenis: x.jenis, arah: x.arah, r, c };
  const terisi = new Set(perempatSusun(x).map(kunciP));
  if (perempatKeping(baru).some((q) => terisi.has(kunciP(q)))) {
    return { ...x, pernah: tambah(x.pernah, "tumpuk"), pesan: "Bertumpuk! Bagian petak itu sudah tertutup keping lain. Keping disusun berdampingan, tidak saling menimpa." };
  }
  return { ...x, keping: [...x.keping, baru], pesan: "" };
}

const TEPI_GAGAL: Record<"kosong" | "titik" | "terpisah", string> = {
  kosong: "Papan masih kosong. Pilih keping, lalu ketuk petak.",
  titik: "Ada keping yang hanya bersentuhan di satu titik. Sambungkan keping lewat sisi yang berimpit.",
  terpisah: "Keping belum menyatu menjadi satu bangun tanpa celah. Rapatkan keping lewat sisinya.",
};

function cekSusun(x: StateSusunK4B5B): StateSusunK4B5B {
  if (x.keping.length === 1) return { ...x, pesan: "Baru satu keping. Komposisi menyusun beberapa bangun menjadi satu bangun baru." };
  const h = tepiGabungan(perempatSusun(x));
  if (!h.ok) return { ...x, pesan: TEPI_GAGAL[h.alasan] };
  const b = namaiBangun(h.titik, "persegi");
  const s = x.keping.filter((k) => k.jenis === "segitiga").length;
  const p = x.keping.length - s;
  const bagian = [s ? `${s} segitiga` : "", p ? `${p} persegi` : ""].filter(Boolean).join(" dan ");
  const rumah = s > 0 && p > 0 && b.jenis === "segilima" ? " Bentuknya seperti rumah." : "";
  return {
    ...x,
    pernah: tambah(x.pernah, `susun:${b.jenis}:${s}-${p}`),
    pesan: `✅ ${kapital(bagian)} tersusun menjadi ${b.nama} dengan ${b.sisi} sisi.${rumah} Menyusun bagian menjadi satu bangun disebut komposisi.`,
  };
}

const POTONG_GAGAL: Record<"sama" | "tepi" | "luar", string> = {
  sama: "Titik awal dan akhir potongan sama. Ketuk titik lain.",
  tepi: "Itu tepi bangun, bukan potongan. Potong melewati bagian dalam bangun.",
  luar: "Dua titik itu tidak berada di tepi bagian yang sama. Titik di dalam bangun harus dilewati potongan dulu.",
};

function ketukTitik(x: StateSusunK4B5B, i: number): StateSusunK4B5B {
  const b = URAI[x.bentuk];
  if (!Number.isInteger(i) || i < 0 || i >= titikUrai(b).length) return x;
  if (x.titikPilih === null) return { ...x, titikPilih: i, pesan: "" };
  if (x.titikPilih === i) return { ...x, titikPilih: null, pesan: "" };
  if (x.potong.length >= MAKS_POTONG) return { ...x, titikPilih: null, pesan: `Paling banyak ${MAKS_POTONG} potongan. Periksa dulu, atau batalkan potongan.` };
  const titik = titikUrai(b);
  const h = potongBagian(b, bagianUrai(b, x.potong), titik[x.titikPilih], titik[i]);
  if (!h.ok) return { ...x, titikPilih: null, pesan: POTONG_GAGAL[h.alasan] };
  return { ...x, potong: [...x.potong, [x.titikPilih, i]], titikPilih: null, pesan: "" };
}

function cekUrai(x: StateSusunK4B5B): StateSusunK4B5B {
  const b = URAI[x.bentuk];
  const bagian = bagianUrai(b, x.potong);
  if (bagian.length < 2) return { ...x, pesan: `${kapital(b.nama)} belum dipotong. Ketuk dua titik untuk membuat satu potongan.` };
  const tanda = tandaUrai(b, bagian);
  // Nama lengkap tiap bagian (misalnya "segitiga sama sisi"), dihitung dari koordinat.
  const hitungNama = new Map<string, number>();
  for (const p of bagian) {
    const nm = namaiBangun(rapikan(p), b.metrik).nama;
    hitungNama.set(nm, (hitungNama.get(nm) ?? 0) + 1);
  }
  const daftar = [...hitungNama.entries()].map(([nm, n]) => `${n} ${nm}`);
  const luasBagian = bagian.reduce((s, p) => s + luasGanda(p), 0);
  const luasUtuh = luasGanda(b.sudut);
  let pernah = tambah(x.pernah, `urai:${b.id}:${tanda}`);
  const caraLain = x.pernah.some((p) => p.startsWith(`urai:${b.id}:`) && p !== `urai:${b.id}:${tanda}`);
  if (caraLain) pernah = tambah(pernah, `urai:${b.id}:dua-cara`);
  const luas = luasBagian === luasUtuh ? "Jumlah luas semua bagian sama dengan luas bangun utuh." : "Luas bagian berbeda dari luas utuh.";
  const cara = caraLain ? " Ini cara yang berbeda dari sebelumnya: satu bangun bisa diurai dengan banyak cara." : "";
  return { ...x, pernah, pesan: `✅ ${kapital(b.nama)} terurai menjadi ${bagian.length} bagian: ${daftar.join(" dan ")}. ${luas} Ini dekomposisi.${cara}` };
}

export const perempatTangram = (x: StateSusunK4B5B): Perempat[] => x.tangram.flatMap(perempatPasang);

function taruhTangram(x: StateSusunK4B5B, r: number, c: number): StateSusunK4B5B {
  if (![r, c].every(Number.isInteger) || r < 0 || c < 0 || r >= TANGRAM_SISI || c >= TANGRAM_SISI) return x;
  if (x.tangram.some((p) => p.k === x.tPilih)) return { ...x, pesan: `Keping ${TANGRAM[x.tPilih].nama} itu sudah dipasang. Pilih keping lain.` };
  const p: PasangTangram = { k: x.tPilih, putar: x.tPutar, balik: x.tBalik, r, c };
  const qs = perempatPasang(p);
  const siluet = new Set(perempatSiluet(x.siluet).map(kunciP));
  const terisi = new Set(perempatTangram(x).map(kunciP));
  if (qs.some((q) => terisi.has(kunciP(q)))) return { ...x, pernah: tambah(x.pernah, "tumpuk"), pesan: "Bertumpuk! Keping tangram disusun berdampingan, tidak saling menimpa." };
  if (qs.some((q) => !siluet.has(kunciP(q)))) return { ...x, pesan: "Keping keluar dari siluet. Putar keping atau ketuk petak lain." };
  return { ...x, tangram: [...x.tangram, p], pesan: "" };
}

function cekTangram(x: StateSusunK4B5B): StateSusunK4B5B {
  const s = SILUET[x.siluet];
  const kosong = perempatSiluet(x.siluet).length - perempatTangram(x).length;
  if (x.tangram.length === 0) return { ...x, pesan: "Siluet masih kosong. Pilih keping, lalu ketuk petak." };
  if (kosong > 0) return { ...x, pesan: `Siluet ${s.nama} belum tertutup penuh. Masih ada celah.` };
  const n = x.tangram.length;
  const nama = x.tangram.map((p) => TANGRAM[p.k].nama);
  const satu = n === 1 ? " Satu keping saja belum menyusun. Coba tutup dengan beberapa keping." : " Menyusun keping menjadi bangun baru disebut komposisi.";
  return { ...x, pernah: tambah(x.pernah, `tangram:${s.id}:${n}`), pesan: `✅ Siluet ${s.nama} tertutup ${n} keping: ${nama.join(", ")}.${satu}` };
}

export function langkahSusunK4B5B(x: StateSusunK4B5B, a: AksiSusunK4B5B): StateSusunK4B5B {
  switch (a.t) {
    case "S_JENIS":
      if (a.jenis !== "segitiga" && a.jenis !== "persegi") return x;
      return { ...x, jenis: a.jenis, pesan: "" };
    case "S_ARAH":
      if (!Number.isInteger(a.arah) || a.arah < 0 || a.arah > 3) return x;
      return { ...x, jenis: "segitiga", arah: a.arah, pesan: "" };
    case "S_TARUH":
      return taruhSusun(x, a.r, a.c);
    case "S_ANGKAT":
      return { ...x, keping: x.keping.slice(0, -1), pesan: "" };
    case "S_BERSIH":
      return { ...x, keping: [], pesan: "" };
    case "S_CEK":
      return cekSusun(x);
    case "U_BENTUK":
      if (!Number.isInteger(a.i) || a.i < 0 || a.i >= URAI.length) return x;
      return { ...x, bentuk: a.i, potong: [], titikPilih: null, pesan: "" };
    case "U_TITIK":
      return ketukTitik(x, a.i);
    case "U_BATAL":
      return { ...x, potong: x.potong.slice(0, -1), titikPilih: null, pesan: "" };
    case "U_ULANG":
      return { ...x, potong: [], titikPilih: null, pesan: "" };
    case "U_CEK":
      return cekUrai(x);
    case "G_SILUET":
      if (!Number.isInteger(a.i) || a.i < 0 || a.i >= SILUET.length) return x;
      return { ...x, siluet: a.i, tangram: [], pesan: "" };
    case "G_PILIH":
      if (!Number.isInteger(a.k) || a.k < 0 || a.k >= TANGRAM.length) return x;
      return { ...x, tPilih: a.k, tPutar: 0, tBalik: false, pesan: "" };
    case "G_PUTAR":
      return { ...x, tPutar: (x.tPutar + 1) % 4, pesan: "" };
    case "G_BALIK":
      if (!TANGRAM[x.tPilih].bisaBalik) return { ...x, pesan: "Keping ini sama saja bila dibalik. Hanya jajargenjang yang berubah saat dibalik." };
      return { ...x, tBalik: !x.tBalik, pesan: "" };
    case "G_TARUH":
      return taruhTangram(x, a.r, a.c);
    case "G_ANGKAT":
      return { ...x, tangram: x.tangram.slice(0, -1), pesan: "" };
    case "G_CEK":
      return cekTangram(x);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalSusunK4B5B();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanSusunK4B5B = { alat: "susun"; pernah: string[] };
export const keadaanSusunK4B5B = (x: StateSusunK4B5B): KeadaanSusunK4B5B => ({ alat: "susun", pernah: x.pernah });

export const ucapSusunK4B5B = (x: StateSusunK4B5B): string =>
  `Papan ${SUSUN_BARIS} baris, tiap baris ${SUSUN_KOLOM} petak. Sudah ada ${x.keping.length} keping. Pilih keping segitiga atau persegi, lalu ketuk petak. Keping harus rapat tanpa celah dan tidak bertumpuk.`;
export const ucapUraiK4B5B = (x: StateSusunK4B5B): string => {
  const b = URAI[x.bentuk];
  return `Bangun utuh: ${b.nama}. Sudah ${x.potong.length} potongan, ada ${bagianUrai(b, x.potong).length} bagian. Ketuk dua titik untuk memotong dari titik ke titik.`;
};
export const ucapTangramK4B5B = (x: StateSusunK4B5B): string =>
  `Siluet ${SILUET[x.siluet].nama}. Sudah ${x.tangram.length} dari ${TANGRAM.length} keping terpasang. Pilih keping, putar bila perlu, lalu ketuk petak tempat pojok kiri atas keping.`;
