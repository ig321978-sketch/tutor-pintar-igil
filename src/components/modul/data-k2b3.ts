/**
 * Data murni Matematika Kelas 2 Bab 3 (Bentuk di Sekitar Kita): pustaka bentuk, mesin geometri (karet papan paku,
 * mengurai bangun dengan garis, menghitung keping), dan semua ronde permainan Sub-Bab A, B, dan C.
 * Tanpa React dan tanpa impor, supaya bisa diuji di Node (scripts/uji-data-k2b3.mjs).
 * Koordinat bentuk memakai kotak 100 x 100 (sumbu y ke bawah seperti SVG).
 */

export type Titik = [number, number];
export type Ruas = [number, number];

const EPS = 1e-6;
/** Toleransi segaris untuk koordinat yang dibulatkan dua desimal. */
const TOL_SEGARIS = 0.05;
const bulat = (x: number) => Math.round(x * 100) / 100;

/* ====================================================================== */
/* Pustaka bentuk                                                           */
/* ====================================================================== */

export function poligonBeraturan(n: number, cx = 50, cy = 52, r = 42, mulai = -90): Titik[] {
  return Array.from({ length: n }, (_, i) => {
    const a = ((mulai + (360 / n) * i) * Math.PI) / 180;
    return [bulat(cx + r * Math.cos(a)), bulat(cy + r * Math.sin(a))] as Titik;
  });
}

function bintang(): Titik[] {
  const t: Titik[] = [];
  for (let i = 0; i < 10; i += 1) {
    const r = i % 2 === 0 ? 44 : 18;
    const a = ((-90 + 36 * i) * Math.PI) / 180;
    t.push([bulat(50 + r * Math.cos(a)), bulat(54 + r * Math.sin(a))]);
  }
  return t;
}

export type GolonganBangun = "segiBanyak" | "lengkung";
export type DefBentuk = {
  nama: string;
  golongan: GolonganBangun;
  /** Banyak sisi segi banyak. Bentuk lengkung tidak punya. */
  sisi?: number;
  titik?: readonly Titik[];
  /** Lintasan SVG untuk bentuk lengkung. */
  path?: string;
  lingkaran?: boolean;
};

export const BENTUK = {
  segitiga: { nama: "segitiga", golongan: "segiBanyak", sisi: 3, titik: [[50, 8], [92, 88], [8, 88]] },
  segitigaSiku: { nama: "segitiga", golongan: "segiBanyak", sisi: 3, titik: [[14, 12], [14, 88], [86, 88]] },
  persegi: { nama: "segi empat", golongan: "segiBanyak", sisi: 4, titik: [[14, 14], [86, 14], [86, 86], [14, 86]] },
  persegiPanjang: { nama: "segi empat", golongan: "segiBanyak", sisi: 4, titik: [[6, 26], [94, 26], [94, 74], [6, 74]] },
  jajarGenjang: { nama: "segi empat", golongan: "segiBanyak", sisi: 4, titik: [[26, 22], [94, 22], [74, 78], [6, 78]] },
  belahKetupat: { nama: "segi empat", golongan: "segiBanyak", sisi: 4, titik: [[50, 6], [90, 50], [50, 94], [10, 50]] },
  trapesium: { nama: "segi empat", golongan: "segiBanyak", sisi: 4, titik: [[30, 24], [70, 24], [94, 78], [6, 78]] },
  segiLima: { nama: "segi lima", golongan: "segiBanyak", sisi: 5, titik: poligonBeraturan(5, 50, 54, 44) },
  segiEnam: { nama: "segi enam", golongan: "segiBanyak", sisi: 6, titik: poligonBeraturan(6, 50, 50, 44, -60) },
  segiTujuh: { nama: "segi tujuh", golongan: "segiBanyak", sisi: 7, titik: poligonBeraturan(7, 50, 54, 44) },
  segiDelapan: { nama: "segi delapan", golongan: "segiBanyak", sisi: 8, titik: poligonBeraturan(8, 50, 50, 44, -67.5) },
  bintang: { nama: "bintang", golongan: "segiBanyak", sisi: 10, titik: bintang() },
  lingkaran: { nama: "lingkaran", golongan: "lengkung", lingkaran: true, path: "M6 50 A44 44 0 1 1 94 50 A44 44 0 1 1 6 50 Z" },
  oval: { nama: "bentuk lonjong", golongan: "lengkung", path: "M24 52 A26 42 0 1 1 76 52 A26 42 0 1 1 24 52 Z" },
  hati: { nama: "bentuk hati", golongan: "lengkung", path: "M50 90 C10 58 6 30 28 18 C40 12 50 20 50 30 C50 20 60 12 72 18 C94 30 90 58 50 90 Z" },
} as const satisfies Record<string, DefBentuk>;

export type IdBentuk = keyof typeof BENTUK;
export const DAFTAR_BENTUK = Object.keys(BENTUK) as IdBentuk[];

export const jalurTitik = (t: readonly Titik[]) => `M${t.map((p) => `${p[0]} ${p[1]}`).join(" L")} Z`;
export const jalurBentuk = (id: IdBentuk): string => {
  const d = BENTUK[id] as DefBentuk;
  return d.path ?? jalurTitik(d.titik ?? []);
};
export const sisiBentuk = (id: IdBentuk): number => (BENTUK[id] as DefBentuk).sisi ?? 0;
export const titikBentuk = (id: IdBentuk): readonly Titik[] => (BENTUK[id] as DefBentuk).titik ?? [];
export const golonganBentuk = (id: IdBentuk): GolonganBangun => BENTUK[id].golongan;
export const adalahLingkaran = (id: IdBentuk): boolean => (BENTUK[id] as DefBentuk).lingkaran === true;

const NAMA_SEGI = ["", "", "", "segitiga", "segi empat", "segi lima", "segi enam", "segi tujuh", "segi delapan", "segi sembilan", "segi sepuluh"];
/** Nama segi banyak menurut banyak sisinya (tiga sampai sepuluh). */
export const namaSegi = (n: number): string => NAMA_SEGI[n] ?? `segi ${n}`;
export const Kapital = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Urutan tetap (tanpa acak) untuk menukar letak kartu. Permutasi dari 0 sampai n-1. */
export function urutanTetap(n: number, langkah = 3, geser = 0): number[] {
  const fpb = (x: number, y: number): number => (y === 0 ? x : fpb(y, x % y));
  let k = Math.max(1, langkah);
  while (fpb(n, k) !== 1) k += 1;
  return Array.from({ length: n }, (_, i) => (i * k + geser) % n);
}

/** Tiga pilihan angka di sekitar kunci dalam batas. */
export function opsiB3(n: number, batas: [number, number] = [0, 10]): number[] {
  let mulai = n - 1;
  if (mulai < batas[0]) mulai = batas[0];
  if (mulai + 2 > batas[1]) mulai = batas[1] - 2;
  const dasar = [mulai, mulai + 1, mulai + 2];
  const putar = n % 3;
  return [...dasar.slice(putar), ...dasar.slice(0, putar)];
}

/* ====================================================================== */
/* Mesin geometri                                                           */
/* ====================================================================== */

export const silang = (o: Titik, a: Titik, b: Titik) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);

export function luasBertanda(p: readonly Titik[]): number {
  let s = 0;
  for (let i = 0; i < p.length; i += 1) {
    const q = p[(i + 1) % p.length];
    s += p[i][0] * q[1] - q[0] * p[i][1];
  }
  return s / 2;
}
export const luasPoligon = (p: readonly Titik[]) => Math.abs(luasBertanda(p));

const dalamKotak = (a: Titik, b: Titik, p: Titik) =>
  Math.min(a[0], b[0]) - EPS <= p[0] && p[0] <= Math.max(a[0], b[0]) + EPS && Math.min(a[1], b[1]) - EPS <= p[1] && p[1] <= Math.max(a[1], b[1]) + EPS;

/** Dua ruas bersentuhan (termasuk bertemu di ujung atau saling menindih). */
export function ruasBersentuhan(a: Titik, b: Titik, c: Titik, d: Titik): boolean {
  const d1 = silang(a, b, c);
  const d2 = silang(a, b, d);
  const d3 = silang(c, d, a);
  const d4 = silang(c, d, b);
  if (((d1 > EPS && d2 < -EPS) || (d1 < -EPS && d2 > EPS)) && ((d3 > EPS && d4 < -EPS) || (d3 < -EPS && d4 > EPS))) return true;
  if (Math.abs(d1) <= EPS && dalamKotak(a, b, c)) return true;
  if (Math.abs(d2) <= EPS && dalamKotak(a, b, d)) return true;
  if (Math.abs(d3) <= EPS && dalamKotak(c, d, a)) return true;
  if (Math.abs(d4) <= EPS && dalamKotak(c, d, b)) return true;
  return false;
}

/** Dua ruas bersilangan di bagian dalam keduanya (bukan di ujung). */
export function ruasBersilang(a: Titik, b: Titik, c: Titik, d: Titik): boolean {
  const d1 = silang(a, b, c);
  const d2 = silang(a, b, d);
  const d3 = silang(c, d, a);
  const d4 = silang(c, d, b);
  return ((d1 > EPS && d2 < -EPS) || (d1 < -EPS && d2 > EPS)) && ((d3 > EPS && d4 < -EPS) || (d3 < -EPS && d4 > EPS));
}

const sama = (a: Titik, b: Titik) => Math.abs(a[0] - b[0]) < EPS && Math.abs(a[1] - b[1]) < EPS;

/** Buang simpul yang segaris (sudut lurus), kembaran berurutan, dan ujung buntu. Hasilnya pojok sejati. */
export function pojokSejati(simpul: readonly Titik[]): Titik[] {
  let s = simpul.slice();
  let berubah = true;
  while (berubah && s.length > 2) {
    berubah = false;
    for (let i = 0; i < s.length; i += 1) {
      const sebelum = s[(i + s.length - 1) % s.length];
      const kini = s[i];
      const sesudah = s[(i + 1) % s.length];
      if (sama(kini, sesudah) || Math.abs(silang(sebelum, kini, sesudah)) < TOL_SEGARIS) {
        s = s.filter((_, j) => j !== i);
        berubah = true;
        break;
      }
    }
  }
  return s;
}
export const sisiSejati = (simpul: readonly Titik[]) => pojokSejati(simpul).length;

/* ------------------------- Karet di papan paku -------------------------- */

export type HasilKaret = { sah: boolean; sisi: number; alasan: string };

/** Memeriksa bentuk yang dirangkai karet dari paku berurutan (tertutup di paku pertama). */
export function periksaKaret(paku: readonly Titik[]): HasilKaret {
  if (paku.length < 3) return { sah: false, sisi: 0, alasan: "Perlu paling sedikit tiga paku." };
  for (let i = 0; i < paku.length; i += 1) for (let j = i + 1; j < paku.length; j += 1) if (sama(paku[i], paku[j])) return { sah: false, sisi: 0, alasan: "Satu paku dipakai dua kali." };
  const n = paku.length;
  for (let i = 0; i < n; i += 1) {
    for (let j = i + 1; j < n; j += 1) {
      const a = paku[i];
      const b = paku[(i + 1) % n];
      const c = paku[j];
      const d = paku[(j + 1) % n];
      const berdekatan = j === i + 1 || (i === 0 && j === n - 1);
      if (berdekatan) {
        const bersama = j === i + 1 ? b : a;
        const lain1 = j === i + 1 ? a : b;
        const lain2 = j === i + 1 ? d : c;
        // Dua sisi bertetangga hanya boleh bertemu di satu ujung dan tidak boleh saling menindih.
        if (Math.abs(silang(lain1, bersama, lain2)) < EPS) {
          const searah = (bersama[0] - lain1[0]) * (lain2[0] - bersama[0]) + (bersama[1] - lain1[1]) * (lain2[1] - bersama[1]) > 0;
          if (!searah) return { sah: false, sisi: 0, alasan: "Karet melipat kembali ke arah yang sama." };
        }
        continue;
      }
      if (ruasBersentuhan(a, b, c, d)) return { sah: false, sisi: 0, alasan: "Karet bersilangan atau bersentuhan." };
    }
  }
  const sisi = sisiSejati(paku);
  if (sisi < 3) return { sah: false, sisi, alasan: "Bentuknya masih satu garis lurus." };
  return { sah: true, sisi, alasan: "" };
}

/* ------------------------- Mengurai bangun dengan garis ------------------ */

export type Keping = { simpul: number[]; sisi: number; luas: number };
export type HasilUrai = { sah: boolean; alasan: string; keping: Keping[] };

const kunciRuas = (a: number, b: number) => (a < b ? `${a}-${b}` : `${b}-${a}`);

/**
 * Mengurai bangun datar cembung dengan garis antar-titik. titik[0..batas-1] adalah simpul batas berurutan,
 * titik berikutnya (misalnya titik tengah) berada di dalam. Garis yang melewati titik lain dipecah di titik itu.
 * Garis yang bersilangan ditolak. Keping dihitung dari graf planar dan dinamai menurut banyak sisinya.
 */
export function uraiBangun(titik: readonly Titik[], batas: number, ruas: readonly Ruas[]): HasilUrai {
  const sisiSet = new Map<string, Ruas>();
  const tambah = (a: number, b: number) => {
    if (a !== b) sisiSet.set(kunciRuas(a, b), a < b ? [a, b] : [b, a]);
  };
  for (let i = 0; i < batas; i += 1) tambah(i, (i + 1) % batas);
  for (const [a, b] of ruas) {
    if (a === b) continue;
    const di: { idx: number; t: number }[] = [];
    const [ax, ay] = titik[a];
    const [bx, by] = titik[b];
    const panjang2 = (bx - ax) ** 2 + (by - ay) ** 2;
    for (let k = 0; k < titik.length; k += 1) {
      if (k === a || k === b) continue;
      if (Math.abs(silang(titik[a], titik[b], titik[k])) > TOL_SEGARIS) continue;
      const t = ((titik[k][0] - ax) * (bx - ax) + (titik[k][1] - ay) * (by - ay)) / panjang2;
      if (t > EPS && t < 1 - EPS) di.push({ idx: k, t });
    }
    di.sort((p, q) => p.t - q.t);
    const rantai = [a, ...di.map((d) => d.idx), b];
    for (let k = 0; k + 1 < rantai.length; k += 1) tambah(rantai[k], rantai[k + 1]);
  }
  const daftar = [...sisiSet.values()];
  for (let i = 0; i < daftar.length; i += 1) {
    for (let j = i + 1; j < daftar.length; j += 1) {
      const [a, b] = daftar[i];
      const [c, d] = daftar[j];
      if (a === c || a === d || b === c || b === d) continue;
      if (ruasBersilang(titik[a], titik[b], titik[c], titik[d])) return { sah: false, alasan: "Dua garis saling bersilang. Hapus salah satu.", keping: [] };
    }
  }
  // Tetangga tiap simpul, diurut menurut sudut (sumbu y dibalik agar berlawanan arah jarum jam).
  const tetangga: number[][] = titik.map(() => []);
  for (const [a, b] of daftar) {
    tetangga[a].push(b);
    tetangga[b].push(a);
  }
  const sudut = (dari: number, ke: number) => Math.atan2(-(titik[ke][1] - titik[dari][1]), titik[ke][0] - titik[dari][0]);
  tetangga.forEach((t, i) => t.sort((p, q) => sudut(i, p) - sudut(i, q)));
  const terlihat = new Set<string>();
  const keping: Keping[] = [];
  for (const [a0, b0] of daftar) {
    for (const [u0, v0] of [[a0, b0], [b0, a0]] as Ruas[]) {
      if (terlihat.has(`${u0}>${v0}`)) continue;
      const jalan: number[] = [];
      let u = u0;
      let v = v0;
      let pengaman = 0;
      while (!terlihat.has(`${u}>${v}`) && pengaman < 200) {
        pengaman += 1;
        terlihat.add(`${u}>${v}`);
        jalan.push(u);
        const t = tetangga[v];
        const i = t.indexOf(u);
        const w = t[(i - 1 + t.length) % t.length];
        u = v;
        v = w;
      }
      const poligon = jalan.map((k) => [titik[k][0], -titik[k][1]] as Titik);
      if (luasBertanda(poligon) > EPS) {
        const sejati = pojokSejati(jalan.map((k) => titik[k]));
        keping.push({ simpul: jalan, sisi: sejati.length, luas: bulat(luasPoligon(jalan.map((k) => titik[k]))) });
      }
    }
  }
  return { sah: true, alasan: "", keping };
}

export type HitungKeping = { segitiga: number; segiEmpat: number; lain: number; total: number };
export function hitungJenis(keping: readonly Keping[]): HitungKeping {
  const segitiga = keping.filter((k) => k.sisi === 3).length;
  const segiEmpat = keping.filter((k) => k.sisi === 4).length;
  return { segitiga, segiEmpat, lain: keping.length - segitiga - segiEmpat, total: keping.length };
}

export const namaKeping = (k: Keping) => namaSegi(k.sisi);

/** Kalimat hitungan keping, misalnya "2 segitiga dan 1 segi empat". */
export function kalimatKeping(h: HitungKeping): string {
  const bagian: string[] = [];
  if (h.segitiga) bagian.push(`${h.segitiga} segitiga`);
  if (h.segiEmpat) bagian.push(`${h.segiEmpat} segi empat`);
  if (h.lain) bagian.push(`${h.lain} bentuk lain`);
  return bagian.length === 0 ? "belum ada keping" : bagian.join(" dan ");
}

export function titikDalam(p: Titik, poligon: readonly Titik[]): boolean {
  let masuk = false;
  for (let i = 0, j = poligon.length - 1; i < poligon.length; j = i, i += 1) {
    const [xi, yi] = poligon[i];
    const [xj, yj] = poligon[j];
    if (yi > p[1] !== yj > p[1] && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) masuk = !masuk;
  }
  return masuk;
}

export function pusatPoligon(p: readonly Titik[]): Titik {
  return [bulat(p.reduce((s, q) => s + q[0], 0) / p.length), bulat(p.reduce((s, q) => s + q[1], 0) / p.length)];
}

/* ====================================================================== */
/* SUB-BAB A. Bangun datar                                                  */
/* ====================================================================== */

export type BendaDatar = { id: string; nama: string; bentuk: IdBentuk; warna: string; hiasan?: "silang" | "angka" | "garis" | "titik" | "tali" | "jarum" | "pintu" };

/** Benda nyata berpermukaan datar. golongan dan sisi diturunkan dari bentuk. */
export const BENDA_DATAR: BendaDatar[] = [
  { id: "bendera", nama: "Panji segitiga", bentuk: "segitigaSiku", warna: "#EF4444" },
  { id: "rambuHatiHati", nama: "Rambu hati-hati", bentuk: "segitiga", warna: "#FDE047", hiasan: "titik" },
  { id: "penggarisSiku", nama: "Penggaris segitiga", bentuk: "segitigaSiku", warna: "#67E8F9", hiasan: "garis" },
  { id: "jendela", nama: "Jendela", bentuk: "persegi", warna: "#BAE6FD", hiasan: "silang" },
  { id: "buku", nama: "Buku", bentuk: "persegiPanjang", warna: "#A78BFA", hiasan: "garis" },
  { id: "benderaMerahPutih", nama: "Bendera Merah Putih", bentuk: "persegiPanjang", warna: "#F87171" },
  { id: "pintu", nama: "Pintu", bentuk: "persegiPanjang", warna: "#D97706", hiasan: "pintu" },
  { id: "rumahBurung", nama: "Rumah burung", bentuk: "segiLima", warna: "#4ADE80", hiasan: "titik" },
  { id: "tehCelup", nama: "Teh celup", bentuk: "segiLima", warna: "#FDBA74", hiasan: "tali" },
  { id: "rumah", nama: "Rumah", bentuk: "segiLima", warna: "#86EFAC", hiasan: "pintu" },
  { id: "sarangLebah", nama: "Sarang lebah", bentuk: "segiEnam", warna: "#FBBF24", hiasan: "titik" },
  { id: "ubinLantai", nama: "Ubin lantai", bentuk: "segiEnam", warna: "#F9A8D4" },
  { id: "jamDinding", nama: "Jam dinding", bentuk: "segiEnam", warna: "#7DD3FC", hiasan: "jarum" },
  { id: "murBaut", nama: "Kepala baut", bentuk: "segiEnam", warna: "#CBD5E1", hiasan: "titik" },
  { id: "rambuStop", nama: "Rambu STOP", bentuk: "segiDelapan", warna: "#DC2626", hiasan: "angka" },
  { id: "piring", nama: "Piring", bentuk: "lingkaran", warna: "#E0E7FF" },
  { id: "koin", nama: "Uang logam", bentuk: "lingkaran", warna: "#FCD34D", hiasan: "angka" },
  { id: "cermin", nama: "Cermin lonjong", bentuk: "oval", warna: "#A5F3FC" },
  { id: "balonHati", nama: "Balon hati", bentuk: "hati", warna: "#FB7185" },
];
export const bendaDatar = (id: string): BendaDatar => BENDA_DATAR.find((b) => b.id === id)!;
export const golonganBenda = (id: string): GolonganBangun => golonganBentuk(bendaDatar(id).bentuk);
export const sisiBenda = (id: string): number => sisiBentuk(bendaDatar(id).bentuk);

/** A1 Pilah Benda di Meja: dua ronde, enam benda. */
export const RONDE_PILAH_A: string[][] = [
  ["jendela", "bendera", "sarangLebah", "piring", "koin", "balonHati"],
  ["rambuStop", "tehCelup", "cermin", "buku", "ubinLantai", "piring"],
];

/** A2 Papan Paku dan Karet Gelang: papan 5 x 5 (jarak paku 1). */
export const PAPAN_PAKU_A = { baris: 5, kolom: 5 };
export const RONDE_KARET_A = [3, 4, 5, 6];
/** Contoh bentuk yang sah untuk uji. Koordinat paku (x, y). */
export const CONTOH_KARET_A: Record<number, Titik[]> = {
  3: [[0, 4], [4, 4], [2, 1]],
  4: [[0, 1], [4, 1], [4, 3], [0, 3]],
  5: [[2, 0], [4, 1], [3, 4], [1, 4], [0, 1]],
  6: [[1, 0], [3, 0], [4, 2], [3, 4], [1, 4], [0, 2]],
};

/** A3 Cetak dan Putar: empat benda. Hanya lingkaran yang selalu pas saat diputar di atas cetakannya. */
export type BendaCetakPutar = { nama: string; bentuk: IdBentuk; warna: string; lingkaran: boolean; /** Putaran (derajat) yang membuat benda pas lagi. */ simetri: number };
export const RONDE_CETAKPUTAR_A: BendaCetakPutar[] = [
  { nama: "Uang logam", bentuk: "lingkaran", warna: "#FCD34D", lingkaran: true, simetri: 1 },
  { nama: "Tutup botol", bentuk: "lingkaran", warna: "#60A5FA", lingkaran: true, simetri: 1 },
  { nama: "Telur", bentuk: "oval", warna: "#FDE7C8", lingkaran: false, simetri: 180 },
  { nama: "Balon hati", bentuk: "hati", warna: "#FB7185", lingkaran: false, simetri: 360 },
];
/** Apakah benda tampak pas di atas cetakannya setelah diputar sebesar sudut (derajat)? */
export const pasDiCetakan = (b: BendaCetakPutar, sudut: number): boolean => b.lingkaran || ((sudut % b.simetri) + b.simetri) % b.simetri === 0;

/** A4 Cari Bentuk di Sekitar: tiap ronde target banyak sisi dan delapan benda. */
export const RONDE_CARI_A: { sisi: number; benda: string[] }[] = [
  { sisi: 3, benda: ["bendera", "jendela", "tehCelup", "rambuHatiHati", "sarangLebah", "piring", "penggarisSiku", "rambuStop"] },
  { sisi: 4, benda: ["jendela", "bendera", "rumahBurung", "buku", "ubinLantai", "koin", "benderaMerahPutih", "balonHati"] },
  { sisi: 5, benda: ["rumahBurung", "jendela", "tehCelup", "jamDinding", "cermin", "rumah", "penggarisSiku", "balonHati"] },
  { sisi: 6, benda: ["sarangLebah", "rumah", "ubinLantai", "rambuStop", "jamDinding", "piring", "murBaut", "bendera"] },
];

/** A5 Tandai Setiap Sisi. */
export const RONDE_SISI_A: IdBentuk[] = ["segitiga", "trapesium", "segiLima", "segiEnam"];

/** A6 Tarik Garis: kiri bentuk, kanan ciri. Urutan ciri sudah diacak tetap. */
export type CiriGaris = { teks: string; cocokDengan: IdBentuk };
export const RONDE_GARIS_A: { kiri: IdBentuk[]; kanan: CiriGaris[] }[] = [
  {
    kiri: ["lingkaran", "segitiga", "segiLima", "segiEnam", "persegi"],
    kanan: [
      { teks: "Mempunyai 5 sisi", cocokDengan: "segiLima" },
      { teks: "Mempunyai satu kurva", cocokDengan: "lingkaran" },
      { teks: "Mempunyai 4 sisi", cocokDengan: "persegi" },
      { teks: "Mempunyai 3 sisi", cocokDengan: "segitiga" },
      { teks: "Mempunyai 6 sisi", cocokDengan: "segiEnam" },
    ],
  },
  {
    kiri: ["hati", "segitigaSiku", "jajarGenjang", "segiTujuh", "segiDelapan"],
    kanan: [
      { teks: "Mempunyai 8 sisi", cocokDengan: "segiDelapan" },
      { teks: "Mempunyai satu kurva", cocokDengan: "hati" },
      { teks: "Mempunyai 7 sisi", cocokDengan: "segiTujuh" },
      { teks: "Mempunyai 4 sisi", cocokDengan: "jajarGenjang" },
      { teks: "Mempunyai 3 sisi", cocokDengan: "segitigaSiku" },
    ],
  },
];

/** A7 Warnai Bentuk: tiap ronde aturan dan delapan bentuk (dengan skala dan putaran). */
export type BentukWarna = { id: IdBentuk; skala?: number; putar?: number };
export type AturanWarna = "segiEmpat" | "lingkaran" | "segiLima" | "segiBanyak";
export const RONDE_WARNAI_A: { aturan: AturanWarna; warna: string; namaWarna: string; teks: string; bentuk: BentukWarna[] }[] = [
  {
    aturan: "segiEmpat",
    warna: "#3B82F6",
    namaWarna: "biru",
    teks: "Warnai semua segi empat dengan warna biru.",
    bentuk: [{ id: "persegi" }, { id: "segitiga" }, { id: "hati" }, { id: "jajarGenjang" }, { id: "segiLima" }, { id: "persegiPanjang" }, { id: "lingkaran" }, { id: "belahKetupat" }],
  },
  {
    aturan: "lingkaran",
    warna: "#22C55E",
    namaWarna: "hijau",
    teks: "Warnai semua lingkaran dengan warna hijau.",
    bentuk: [{ id: "lingkaran" }, { id: "oval" }, { id: "hati" }, { id: "persegi" }, { id: "lingkaran", skala: 0.7 }, { id: "segiEnam" }, { id: "oval", putar: 90 }, { id: "segitiga" }],
  },
  {
    aturan: "segiLima",
    warna: "#EF4444",
    namaWarna: "merah",
    teks: "Warnai semua segi lima dengan warna merah.",
    bentuk: [{ id: "segiLima" }, { id: "segiEnam" }, { id: "persegi" }, { id: "segiLima", putar: 36 }, { id: "trapesium" }, { id: "lingkaran" }, { id: "segitiga" }, { id: "segiTujuh" }],
  },
  {
    aturan: "segiBanyak",
    warna: "#EAB308",
    namaWarna: "kuning",
    teks: "Warnai semua segi banyak dengan warna kuning.",
    bentuk: [{ id: "segitiga" }, { id: "lingkaran" }, { id: "persegi" }, { id: "oval" }, { id: "segiEnam" }, { id: "hati" }, { id: "bintang" }, { id: "segiLima" }],
  },
];
export function cocokAturan(b: BentukWarna, aturan: AturanWarna): boolean {
  if (aturan === "segiEmpat") return sisiBentuk(b.id) === 4;
  if (aturan === "lingkaran") return adalahLingkaran(b.id);
  if (aturan === "segiLima") return sisiBentuk(b.id) === 5;
  return golonganBentuk(b.id) === "segiBanyak";
}

/** A8 Isi Tabel Ciri. Ronde 1: nama menjadi banyak sisi. Ronde 2: banyak sisi menjadi nama. */
export const RONDE_TABEL_A: { judul: string; baris: { label: string; jawab: string }[]; kartu: string[] }[] = [
  {
    judul: "Tulis banyak sisinya",
    baris: [
      { label: "Segitiga", jawab: "3" },
      { label: "Segi empat", jawab: "4" },
      { label: "Segi lima", jawab: "5" },
      { label: "Segi enam", jawab: "6" },
    ],
    kartu: ["3", "4", "5", "6"],
  },
  {
    judul: "Tulis namanya",
    baris: [
      { label: "3 sisi", jawab: "Segitiga" },
      { label: "5 sisi", jawab: "Segi lima" },
      { label: "6 sisi", jawab: "Segi enam" },
      { label: "4 sisi", jawab: "Segi empat" },
      { label: "8 sisi", jawab: "Segi delapan" },
      { label: "7 sisi", jawab: "Segi tujuh" },
    ],
    kartu: ["Segitiga", "Segi empat", "Segi lima", "Segi enam", "Segi tujuh", "Segi delapan"],
  },
];

/** A9 Detektif Bentuk Misterius. Kunci ada di indeks jawab. */
export type SoalDetektifTeks = { petunjuk: string[]; opsi: string[]; jawab: number; salah: string };
export const RONDE_DETEKTIF_A: SoalDetektifTeks[] = [
  {
    petunjuk: ["Aku dibatasi oleh garis lurus.", "Aku mempunyai 5 sisi."],
    opsi: ["segi enam", "segi lima", "lingkaran"],
    jawab: 1,
    salah: "Garis lurus berarti segi banyak, dan lima sisi namanya segi lima. Lingkaran tidak punya sisi lurus.",
  },
  {
    petunjuk: ["Aku dibatasi oleh kurva.", "Aku bulat sempurna dan selalu pas saat diputar."],
    opsi: ["bentuk lonjong", "segi enam", "lingkaran"],
    jawab: 2,
    salah: "Bentuk lengkung yang bulat sempurna dan selalu pas saat diputar adalah lingkaran.",
  },
  {
    petunjuk: ["Aku segi banyak.", "Sisiku lebih banyak daripada segi empat, tetapi lebih sedikit daripada segi enam."],
    opsi: ["segitiga", "segi tujuh", "segi lima"],
    jawab: 2,
    salah: "Lebih dari empat dan kurang dari enam hanya satu bilangan, yaitu lima. Namanya segi lima.",
  },
  {
    petunjuk: ["Aku bisa ditemukan pada sarang lebah.", "Semua sisiku garis lurus."],
    opsi: ["lingkaran", "segi lima", "segi enam"],
    jawab: 2,
    salah: "Permukaan sarang lebah berbentuk segi enam, dengan enam sisi lurus.",
  },
];

/** A10 Peta Konsep: dua peta, tiap peta empat kotak dengan tiga kartu. kunci indeks 0 lalu diputar saat tampil. */
export type KotakPeta = { label: string; opsi: string[]; benar: number };
export type PetaKonsep = { pusat: string; kotak: KotakPeta[] };
export const PETA_KONSEP_A: PetaKonsep[] = [
  {
    pusat: "Segi banyak",
    kotak: [
      { label: "Segi banyak adalah", opsi: ["bangun datar yang dibatasi oleh beberapa sisi atau garis lurus", "bangun datar yang dibatasi oleh kurva atau garis lengkung", "benda yang dapat diisi"], benar: 0 },
      { label: "Ciri 1", opsi: ["semua tepinya garis lurus", "tepinya melengkung", "bulat sempurna"], benar: 0 },
      { label: "Ciri 2", opsi: ["mempunyai sisi yang bisa dihitung", "tidak punya sisi", "mudah menggelinding"], benar: 0 },
      { label: "Contoh", opsi: ["segi lima", "lingkaran", "bola"], benar: 0 },
    ],
  },
  {
    pusat: "Bentuk lengkung",
    kotak: [
      { label: "Bentuk lengkung adalah", opsi: ["bangun datar yang dibatasi oleh kurva atau garis lengkung", "bangun datar yang dibatasi oleh beberapa sisi", "benda yang bisa ditumpuk"], benar: 0 },
      { label: "Ciri 1", opsi: ["tepinya kurva", "tepinya garis lurus", "punya tiga sisi"], benar: 0 },
      { label: "Ciri 2", opsi: ["tidak punya sisi lurus", "punya enam sisi", "punya pojok runcing"], benar: 0 },
      { label: "Contoh", opsi: ["lingkaran", "segitiga", "segi enam"], benar: 0 },
    ],
  },
];

/* ====================================================================== */
/* SUB-BAB B. Mengurai dan menyusun bangun datar                            */
/* ====================================================================== */

export type TargetKeping = { segitiga: number; segiEmpat: number; lain?: number };

export const cocokTarget = (h: HitungKeping, t: TargetKeping) => h.segitiga === t.segitiga && h.segiEmpat === t.segiEmpat && h.lain === (t.lain ?? 0);

/** Bangun yang diurai: simpul batas berurutan lalu titik dalam. */
export type BangunUrai = { nama: string; titik: Titik[]; batas: number; warna: string };

const PERSEGI_8: Titik[] = [[14, 14], [50, 14], [86, 14], [86, 50], [86, 86], [50, 86], [14, 86], [14, 50]];
const PERSEGI_PANJANG_8: Titik[] = [[6, 26], [50, 26], [94, 26], [94, 50], [94, 74], [50, 74], [6, 74], [6, 50]];
const PANJANG_6_GUNTING: Titik[] = [[8, 26], [92, 26], [92, 74], [64, 74], [36, 74], [8, 74]];
const PANJANG_8_GARIS: Titik[] = [[8, 24], [50, 24], [92, 24], [92, 76], [64, 76], [50, 76], [36, 76], [8, 76]];

/** B1 Gunting Kertas: pilihan garis (ruas) dan target. Ronde 4 harus memilih dua garis. */
export type RondeGunting = { nama: string; titik: Titik[]; batas: number; garis: { nama: string; ruas: Ruas }[]; target: TargetKeping; teksTarget: string; kunci: number[] };
export const RONDE_GUNTING_B: RondeGunting[] = [
  {
    nama: "Persegi",
    titik: PERSEGI_8,
    batas: 8,
    garis: [
      { nama: "garis miring kiri atas ke kanan bawah", ruas: [0, 4] },
      { nama: "garis tegak di tengah", ruas: [1, 5] },
      { nama: "garis datar di tengah", ruas: [7, 3] },
    ],
    target: { segitiga: 2, segiEmpat: 0 },
    teksTarget: "2 segitiga",
    kunci: [0],
  },
  {
    nama: "Persegi",
    titik: PERSEGI_8,
    batas: 8,
    garis: [
      { nama: "garis miring kiri atas ke kanan bawah", ruas: [0, 4] },
      { nama: "garis tegak di tengah", ruas: [1, 5] },
      { nama: "garis miring kanan atas ke kiri bawah", ruas: [2, 6] },
    ],
    target: { segitiga: 0, segiEmpat: 2 },
    teksTarget: "2 segi empat",
    kunci: [1],
  },
  {
    nama: "Persegi panjang",
    titik: PERSEGI_PANJANG_8,
    batas: 8,
    garis: [
      { nama: "garis miring kiri atas ke kanan bawah", ruas: [0, 4] },
      { nama: "garis tegak di tengah", ruas: [1, 5] },
      { nama: "garis datar di tengah", ruas: [7, 3] },
    ],
    target: { segitiga: 2, segiEmpat: 0 },
    teksTarget: "2 segitiga",
    kunci: [0],
  },
  {
    nama: "Persegi panjang",
    titik: PANJANG_6_GUNTING,
    batas: 6,
    garis: [
      { nama: "garis dari kiri atas ke paku kiri bawah", ruas: [0, 4] },
      { nama: "garis dari kanan atas ke paku kanan bawah", ruas: [1, 3] },
      { nama: "garis dari kiri atas ke paku kanan bawah", ruas: [0, 3] },
      { nama: "garis dari kanan atas ke paku kiri bawah", ruas: [1, 4] },
    ],
    target: { segitiga: 2, segiEmpat: 1 },
    teksTarget: "2 segitiga dan 1 segi empat",
    kunci: [0, 1],
  },
];

/** B2 Susun Keping: tiap slot punya jenis. Keping boleh masuk ke slot dengan jenis sama. */
export type SlotRakit = { jenis: string; titik: Titik[]; nama: string };
export type RondeRakit = { nama: string; siluet: string; slot: SlotRakit[]; warna: string[] };
export const RONDE_RAKIT_B: RondeRakit[] = [
  {
    nama: "Persegi besar",
    siluet: "persegi dari 2 segitiga",
    warna: ["#F472B6", "#38BDF8"],
    slot: [
      { jenis: "segitigaBesar", titik: [[20, 20], [80, 20], [20, 80]], nama: "segitiga" },
      { jenis: "segitigaBesar", titik: [[80, 20], [80, 80], [20, 80]], nama: "segitiga" },
    ],
  },
  {
    nama: "Rumah",
    siluet: "rumah",
    warna: ["#FB923C", "#34D399"],
    slot: [
      { jenis: "atap", titik: [[18, 50], [82, 50], [50, 14]], nama: "segitiga atap" },
      { jenis: "badan", titik: [[24, 50], [76, 50], [76, 92], [24, 92]], nama: "segi empat badan" },
    ],
  },
  {
    nama: "Perahu",
    siluet: "perahu",
    warna: ["#A78BFA", "#FBBF24", "#F87171"],
    slot: [
      { jenis: "layarBesar", titik: [[46, 12], [46, 60], [16, 60]], nama: "layar besar" },
      { jenis: "layarKecil", titik: [[52, 28], [52, 60], [76, 60]], nama: "layar kecil" },
      { jenis: "lambung", titik: [[10, 64], [90, 64], [72, 90], [28, 90]], nama: "lambung" },
    ],
  },
  {
    nama: "Pohon cemara",
    siluet: "pohon cemara",
    warna: ["#4ADE80", "#22C55E", "#16A34A", "#A8672D"],
    slot: [
      { jenis: "cemara1", titik: [[50, 4], [38, 28], [62, 28]], nama: "segitiga puncak" },
      { jenis: "cemara2", titik: [[50, 30], [30, 56], [70, 56]], nama: "segitiga tengah" },
      { jenis: "cemara3", titik: [[50, 58], [22, 84], [78, 84]], nama: "segitiga bawah" },
      { jenis: "batang", titik: [[43, 84], [57, 84], [57, 98], [43, 98]], nama: "batang" },
    ],
  },
];
export const sisiSlot = (s: SlotRakit) => sisiSejati(s.titik);
/** Banyak segitiga dan segi empat pada satu ronde rakit. */
export function hitungSlot(r: RondeRakit): HitungKeping {
  const sisi = r.slot.map((s) => sisiSejati(s.titik));
  const segitiga = sisi.filter((n) => n === 3).length;
  const segiEmpat = sisi.filter((n) => n === 4).length;
  return { segitiga, segiEmpat, lain: sisi.length - segitiga - segiEmpat, total: sisi.length };
}

/** B3 Bongkar Bangunan: tiga bangunan pertama dari B2 (rumah, perahu, pohon cemara). */
export const INDEKS_BONGKAR_B = [1, 2, 3];

/** B4 Dua Segitiga, Tiga Bentuk. Segitiga siku-siku sama kaki dengan kaki 40. */
export const SEGITIGA_DASAR_B: Titik[] = [[0, 0], [40, 0], [0, 40]];
export type GabunganB = { id: string; tombol: string; petunjuk: string; keping2: Titik[]; luar: Titik[]; nama: string; opsi: string[]; jawab: number };
export const GABUNGAN_B: GabunganB[] = [
  {
    id: "miring",
    tombol: "Tempel sisi miring",
    petunjuk: "Dua sisi miring ditempel berhimpit.",
    keping2: [[40, 0], [0, 40], [40, 40]],
    luar: [[0, 0], [40, 0], [40, 40], [0, 40]],
    nama: "persegi",
    opsi: ["persegi", "segitiga yang lebih besar", "segi empat miring"],
    jawab: 0,
  },
  {
    id: "tegakMenghadap",
    tombol: "Tempel sisi pendek, menghadap",
    petunjuk: "Dua sisi pendek ditempel dan segitiga kedua dicerminkan.",
    keping2: [[0, 0], [40, 0], [0, -40]],
    luar: [[0, 40], [40, 0], [0, -40]],
    nama: "segitiga yang lebih besar",
    opsi: ["persegi", "segitiga yang lebih besar", "segi empat miring"],
    jawab: 1,
  },
  {
    id: "tegakBerlawanan",
    tombol: "Tempel sisi pendek, berlawanan",
    petunjuk: "Dua sisi pendek ditempel dan segitiga kedua diputar setengah putaran.",
    keping2: [[40, 0], [0, 0], [40, -40]],
    luar: [[0, 40], [0, 0], [40, -40], [40, 0]],
    nama: "segi empat miring",
    opsi: ["persegi", "segitiga yang lebih besar", "segi empat miring"],
    jawab: 2,
  },
];

/** Tangram: persegi 4 x 4 dipotong menjadi tujuh keping (satuan kotak). Dipakai Infografis dan video. */
export type KepingTangram = { nama: string; titik: Titik[]; warna: string };
export const TANGRAM_SATUAN: KepingTangram[] = [
  { nama: "segitiga besar", titik: [[0, 0], [4, 0], [2, 2]], warna: "#F472B6" },
  { nama: "segitiga besar", titik: [[0, 0], [2, 2], [0, 4]], warna: "#60A5FA" },
  { nama: "segitiga sedang", titik: [[4, 4], [4, 2], [2, 4]], warna: "#34D399" },
  { nama: "segitiga kecil", titik: [[4, 0], [4, 2], [3, 1]], warna: "#FBBF24" },
  { nama: "persegi", titik: [[2, 2], [3, 3], [4, 2], [3, 1]], warna: "#FB923C" },
  { nama: "segi empat miring", titik: [[0, 4], [2, 4], [3, 3], [1, 3]], warna: "#22D3EE" },
  { nama: "segitiga kecil", titik: [[1, 3], [3, 3], [2, 2]], warna: "#A78BFA" },
];
/** Tangram dalam kotak 100: tiap satuan 20, mulai di (10, 10). */
export const tangramKeping = (skala = 20, geser = 10): KepingTangram[] => TANGRAM_SATUAN.map((k) => ({ ...k, titik: k.titik.map(([x, y]) => [x * skala + geser, y * skala + geser] as Titik) }));

/** B6 Hasil Susunan yang Mungkin. Bentuk mungkin bila luasnya sama dengan jumlah luas keping. */
export type OpsiKomposit = { nama: string; titik: Titik[]; bisa: boolean };
export type RondeKomposit = { judul: string; keping: { nama: string; titik: Titik[] }[]; opsi: OpsiKomposit[] };
export const RONDE_KOMPOSIT_B: RondeKomposit[] = [
  {
    judul: "2 segitiga siku-siku yang sama",
    keping: [
      { nama: "segitiga", titik: [[0, 0], [40, 0], [0, 40]] },
      { nama: "segitiga", titik: [[0, 0], [40, 0], [0, 40]] },
    ],
    opsi: [
      { nama: "persegi", titik: [[0, 0], [40, 0], [40, 40], [0, 40]], bisa: true },
      { nama: "segitiga besar", titik: [[0, 40], [40, 0], [0, -40]], bisa: true },
      { nama: "segi empat miring", titik: [[0, 40], [0, 0], [40, -40], [40, 0]], bisa: true },
      { nama: "persegi panjang", titik: [[0, 0], [60, 0], [60, 40], [0, 40]], bisa: false },
    ],
  },
  {
    judul: "1 persegi dan 1 segitiga",
    keping: [
      { nama: "persegi", titik: [[0, 0], [40, 0], [40, 40], [0, 40]] },
      { nama: "segitiga", titik: [[0, 0], [40, 0], [20, 20]] },
    ],
    opsi: [
      { nama: "rumah", titik: [[0, 20], [20, 0], [40, 20], [40, 60], [0, 60]], bisa: true },
      { nama: "rumah miring", titik: [[0, 0], [40, 0], [60, 20], [40, 40], [0, 40]], bisa: true },
      { nama: "persegi besar", titik: [[0, 0], [50, 0], [50, 50], [0, 50]], bisa: false },
      { nama: "segitiga besar", titik: [[0, 60], [30, 0], [60, 60]], bisa: false },
    ],
  },
  {
    judul: "2 segitiga dan 1 segi empat",
    keping: [
      { nama: "segitiga", titik: [[0, 0], [20, -20], [20, 20]] },
      { nama: "segitiga", titik: [[0, 0], [20, -20], [20, 20]] },
      { nama: "segi empat", titik: [[0, 0], [40, 0], [40, 40], [0, 40]] },
    ],
    opsi: [
      { nama: "segi enam mendatar", titik: [[0, 50], [20, 30], [60, 30], [80, 50], [60, 70], [20, 70]], bisa: true },
      { nama: "segi enam tegak", titik: [[40, 0], [60, 20], [60, 60], [40, 80], [20, 60], [20, 20]], bisa: true },
      { nama: "persegi besar", titik: [[0, 0], [50, 0], [50, 50], [0, 50]], bisa: false },
      { nama: "persegi panjang", titik: [[0, 0], [80, 0], [80, 40], [0, 40]], bisa: false },
    ],
  },
];
export const luasKeping = (r: RondeKomposit) => r.keping.reduce((s, k) => s + luasPoligon(k.titik), 0);

/** B7 Hitung Keping dan B5 Garis Pengurai memakai bangun terurai. */
export type BangunDenganGaris = { nama: string; titik: Titik[]; batas: number; ruas: Ruas[]; target: TargetKeping };
export const RONDE_HITUNG_B: BangunDenganGaris[] = [
  { nama: "Persegi", titik: [[14, 14], [86, 14], [86, 86], [14, 86]], batas: 4, ruas: [[0, 2]], target: { segitiga: 2, segiEmpat: 0 } },
  { nama: "Persegi panjang", titik: PANJANG_6_GUNTING, batas: 6, ruas: [[0, 4], [1, 3]], target: { segitiga: 2, segiEmpat: 1 } },
  { nama: "Segi enam", titik: [...BENTUK.segiEnam.titik, [50, 50]], batas: 6, ruas: [[0, 6], [2, 6], [4, 6]], target: { segitiga: 0, segiEmpat: 3 } },
  { nama: "Segi lima", titik: [...BENTUK.segiLima.titik, [50, 54]], batas: 5, ruas: [[0, 5], [1, 5], [2, 5], [3, 5], [4, 5]], target: { segitiga: 5, segiEmpat: 0 } },
];

export type RondeGaris = { nama: string; titik: Titik[]; batas: number; target: TargetKeping; teksTarget: string; solusi: Ruas[] };
export const RONDE_GARIS_B: RondeGaris[] = [
  {
    nama: "Belah ketupat",
    titik: [[50, 8], [92, 50], [50, 92], [8, 50], [50, 50]],
    batas: 4,
    target: { segitiga: 3, segiEmpat: 0 },
    teksTarget: "3 segitiga",
    solusi: [[0, 2], [3, 4]],
  },
  {
    nama: "Segi lima",
    titik: [...BENTUK.segiLima.titik, [50, 54]],
    batas: 5,
    target: { segitiga: 5, segiEmpat: 0 },
    teksTarget: "5 segitiga",
    solusi: [[0, 5], [1, 5], [2, 5], [3, 5], [4, 5]],
  },
  {
    nama: "Segi enam",
    titik: [...BENTUK.segiEnam.titik, [50, 50]],
    batas: 6,
    target: { segitiga: 6, segiEmpat: 0 },
    teksTarget: "6 segitiga",
    solusi: [[0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6]],
  },
  {
    nama: "Persegi panjang",
    titik: PANJANG_8_GARIS,
    batas: 8,
    target: { segitiga: 2, segiEmpat: 2 },
    teksTarget: "2 segitiga dan 2 segi empat",
    solusi: [[0, 6], [2, 4], [1, 5]],
  },
];

/** B8 Isi Kalimat Uraian: dua ronde, tiga kalimat. Kunci selalu opsi indeks 0 sebelum diputar. */
export type KalimatIsian = { depan: string; belakang: string; opsi: string[]; benar: number };
export const RONDE_KALIMAT_B: KalimatIsian[][] = [
  [
    { depan: "Persegi diurai dengan garis miring menjadi", belakang: "segitiga.", opsi: ["2", "3", "4"], benar: 0 },
    { depan: "Persegi diurai dengan garis lurus di tengah menjadi", belakang: "segi empat.", opsi: ["2", "1", "3"], benar: 0 },
    { depan: "2 segitiga dan 1 segi empat dapat disusun menjadi satu", belakang: ".", opsi: ["segi enam", "segi lima", "lingkaran"], benar: 0 },
  ],
  [
    { depan: "Segi enam diurai dari titik tengah menjadi", belakang: "segitiga.", opsi: ["6", "4", "3"], benar: 0 },
    { depan: "Segi lima diurai dari titik tengah menjadi", belakang: "segitiga.", opsi: ["5", "3", "6"], benar: 0 },
    { depan: "2 segitiga siku-siku yang sama dapat disusun menjadi sebuah", belakang: ".", opsi: ["persegi", "bentuk hati", "segi delapan"], benar: 0 },
  ],
];

/** B9 Mengurai atau Menyusun: dua ronde, empat kalimat. */
export type KalimatSortir = { teks: string; bin: "mengurai" | "menyusun"; alasan: string };
export const RONDE_SORTIR_B: KalimatSortir[][] = [
  [
    { teks: "Satu persegi dibagi menjadi 2 segitiga.", bin: "mengurai", alasan: "Satu bangun menjadi banyak bagian, itu mengurai." },
    { teks: "2 segitiga digabung menjadi satu persegi.", bin: "menyusun", alasan: "Banyak bangun menjadi satu bentuk, itu menyusun." },
    { teks: "7 keping tangram disusun menjadi kucing.", bin: "menyusun", alasan: "Tujuh keping menjadi satu bentuk, itu menyusun." },
    { teks: "Segi enam dibelah dari titik tengah menjadi 6 segitiga.", bin: "mengurai", alasan: "Satu segi enam menjadi enam segitiga, itu mengurai." },
  ],
  [
    { teks: "Kertas digunting sepanjang garis menjadi tiga keping.", bin: "mengurai", alasan: "Satu kertas menjadi tiga keping, itu mengurai." },
    { teks: "Segitiga dan segi empat ditempel menjadi bentuk rumah.", bin: "menyusun", alasan: "Dua bangun menjadi satu rumah, itu menyusun." },
    { teks: "Persegi panjang ditarik dua garis menjadi 2 segitiga dan 1 segi empat.", bin: "mengurai", alasan: "Satu bangun menjadi tiga bagian, itu mengurai." },
    { teks: "Dua segitiga ditempel sisi miringnya menjadi persegi.", bin: "menyusun", alasan: "Dua segitiga menjadi satu persegi, itu menyusun." },
  ],
];

/** B10 Tabel Pola Segitiga. Dua ronde: dari satu pojok (sisi - 2) dan dari titik tengah (sisi). */
export type SisiPola = 3 | 4 | 5 | 6;
export const SISI_POLA: SisiPola[] = [3, 4, 5, 6];
export const segitigaDariPojok = (n: number) => n - 2;
export const segitigaDariTengah = (n: number) => n;
export const RONDE_POLA_B: { judul: string; ket: string; baris: { label: string; jawab: string }[]; kartu: string[] }[] = [
  {
    judul: "Garis dari satu pojok ke pojok lain",
    ket: "Berapa segitiga hasilnya?",
    baris: SISI_POLA.map((n) => ({ label: `${Kapital(namaSegi(n))} (${n} sisi)`, jawab: String(segitigaDariPojok(n)) })),
    kartu: ["1", "2", "3", "4", "5", "6"],
  },
  {
    judul: "Garis dari titik tengah ke setiap pojok",
    ket: "Berapa segitiga hasilnya?",
    baris: SISI_POLA.map((n) => ({ label: `${Kapital(namaSegi(n))} (${n} sisi)`, jawab: String(segitigaDariTengah(n)) })),
    kartu: ["1", "2", "3", "4", "5", "6"],
  },
];

/* ====================================================================== */
/* SUB-BAB C. Bangun ruang                                                  */
/* ====================================================================== */

export type JenisRuang = "kubus" | "balok" | "tabung" | "kerucut" | "bola";
export const URUTAN_RUANG: JenisRuang[] = ["kubus", "balok", "tabung", "kerucut", "bola"];
export const NAMA_RUANG: Record<JenisRuang, string> = { kubus: "Kubus", balok: "Balok", tabung: "Tabung", kerucut: "Kerucut", bola: "Bola" };
export const menggelinding = (j: JenisRuang) => j === "tabung" || j === "kerucut" || j === "bola";
export const permukaanDatarMenurutBuku = (j: JenisRuang) => j === "kubus" || j === "balok";

export type BendaRuang = { id: string; nama: string; jenis: JenisRuang; warna: string; ciri: string };
export const BENDA_RUANG: BendaRuang[] = [
  { id: "topi", nama: "Topi ulang tahun", jenis: "kerucut", warna: "#A78BFA", ciri: "Topi ulang tahun runcing di ujung dan alasnya lingkaran, jadi berbentuk kerucut." },
  { id: "dadu", nama: "Dadu", jenis: "kubus", warna: "#F8FAFC", ciri: "Dadu punya enam permukaan segi empat yang sama ukurannya, jadi berbentuk kubus." },
  { id: "botol", nama: "Botol minum", jenis: "tabung", warna: "#38BDF8", ciri: "Botol minum punya alas lingkaran dan sisi lengkung, jadi berbentuk tabung." },
  { id: "kardus", nama: "Kardus", jenis: "balok", warna: "#D6A15C", ciri: "Kardus punya permukaan segi empat yang berbeda ukurannya, jadi berbentuk balok." },
  { id: "bola", nama: "Bola", jenis: "bola", warna: "#F97316", ciri: "Bola seluruh permukaannya lengkung, jadi berbentuk bola." },
  { id: "kaleng", nama: "Kaleng susu", jenis: "tabung", warna: "#E2E8F0", ciri: "Kaleng punya alas lingkaran dan sisi lengkung, jadi berbentuk tabung." },
  { id: "kelereng", nama: "Kelereng", jenis: "bola", warna: "#2DD4BF", ciri: "Kelereng seluruh permukaannya lengkung, jadi berbentuk bola." },
  { id: "kotakPensil", nama: "Kotak pensil", jenis: "balok", warna: "#F472B6", ciri: "Kotak pensil punya permukaan segi empat yang berbeda ukurannya, jadi berbentuk balok." },
  { id: "esKrim", nama: "Kerucut es krim", jenis: "kerucut", warna: "#FCD34D", ciri: "Kerucut es krim runcing di bawah dan alasnya lingkaran, jadi berbentuk kerucut." },
  { id: "kotakHadiah", nama: "Kotak hadiah", jenis: "kubus", warna: "#EF4444", ciri: "Kotak hadiah punya enam permukaan segi empat yang sama ukurannya, jadi berbentuk kubus." },
];
export const bendaRuang = (id: string): BendaRuang => BENDA_RUANG.find((b) => b.id === id)!;

/** Ciri pendek tiap bangun ruang. Dibacakan sebagai petunjuk. */
export const CIRI_RUANG: Record<JenisRuang, string> = {
  kubus: "Kubus punya permukaan datar. Semua permukaannya segi empat yang sama ukurannya.",
  balok: "Balok punya permukaan datar. Permukaannya segi empat yang berbeda ukurannya.",
  tabung: "Tabung punya permukaan lengkung dan dua alas lingkaran. Tabung bisa menggelinding.",
  kerucut: "Kerucut punya satu ujung yang runcing dan alas lingkaran. Kerucut bisa menggelinding.",
  bola: "Bola seluruh permukaannya lengkung dan tidak punya ujung. Bola sangat mudah menggelinding.",
};

/** C1 Lereng Gelinding dan C4 Pilah Rak: dua ronde, lima benda. */
export const RONDE_GELIND_C: string[][] = [
  ["topi", "dadu", "botol", "kardus", "bola"],
  ["kaleng", "kelereng", "kotakPensil", "esKrim", "kotakHadiah"],
];
export const ALASAN_GELIND_C = ["permukaannya lengkung", "permukaannya datar", "warnanya cerah"];
export const RONDE_PILAH_C: string[][] = [
  ["dadu", "kardus", "kaleng", "topi", "bola"],
  ["kotakHadiah", "kotakPensil", "botol", "esKrim", "kelereng"],
];

/** C2 Tas Misteri. */
export const RONDE_TAS_C: { jenis: JenisRuang; petunjuk: string[] }[] = [
  {
    jenis: "kubus",
    petunjuk: ["Aku punya permukaan yang rata di semua sisi.", "Aku tidak bisa menggelinding.", "Semua permukaanku segi empat yang sama ukurannya."],
  },
  {
    jenis: "kerucut",
    petunjuk: ["Aku punya satu ujung yang runcing.", "Aku bisa menggelinding, tetapi berputar melingkar.", "Alasku berbentuk lingkaran."],
  },
  {
    jenis: "bola",
    petunjuk: ["Seluruh permukaanku lengkung, tidak ada yang rata.", "Aku sangat mudah menggelinding ke segala arah.", "Aku tidak punya ujung atau pojok."],
  },
];

/** C3 Cetak dan Tebak. cetak null berarti permukaan lengkung. */
export type CetakanC = "persegi" | "persegiPanjang" | "lingkaran";
export type RondeCetak = { benda: string; permukaan: { nama: string; cetak: CetakanC | null }[]; jawab: CetakanC };
export const RONDE_CETAK_C: RondeCetak[] = [
  { benda: "dadu", permukaan: [{ nama: "permukaan atas", cetak: "persegi" }, { nama: "permukaan samping", cetak: "persegi" }], jawab: "persegi" },
  { benda: "kardus", permukaan: [{ nama: "permukaan atas", cetak: "persegiPanjang" }, { nama: "permukaan samping", cetak: "persegiPanjang" }], jawab: "persegiPanjang" },
  { benda: "kaleng", permukaan: [{ nama: "alas bawah", cetak: "lingkaran" }, { nama: "dinding samping", cetak: null }], jawab: "lingkaran" },
  { benda: "topi", permukaan: [{ nama: "sisi miring", cetak: null }, { nama: "alas", cetak: "lingkaran" }], jawab: "lingkaran" },
];
export const NAMA_CETAKAN_C: Record<CetakanC, string> = {
  persegi: "Segi empat sama sisi",
  persegiPanjang: "Segi empat berbeda sisi",
  lingkaran: "Lingkaran",
};
export const URUTAN_CETAKAN_C: CetakanC[] = ["persegi", "persegiPanjang", "lingkaran"];

/** C5 Bayangan Bangun Ruang: dilihat dari atas atau samping. */
export type ArahPandang = "atas" | "samping";
export type BayanganC = { jenis: JenisRuang; arah: ArahPandang; jawab: "persegi" | "persegiPanjang" | "segitiga" | "lingkaran"; opsi: ("persegi" | "persegiPanjang" | "segitiga" | "lingkaran")[] };
export const RONDE_BAYANGAN_C: BayanganC[] = [
  { jenis: "kubus", arah: "atas", jawab: "persegi", opsi: ["segitiga", "lingkaran", "persegi"] },
  { jenis: "kerucut", arah: "samping", jawab: "segitiga", opsi: ["lingkaran", "persegiPanjang", "segitiga"] },
  { jenis: "tabung", arah: "atas", jawab: "lingkaran", opsi: ["persegi", "lingkaran", "segitiga"] },
  { jenis: "balok", arah: "samping", jawab: "persegiPanjang", opsi: ["lingkaran", "persegiPanjang", "segitiga"] },
];
export const NAMA_BAYANGAN_C: Record<string, string> = { persegi: "persegi", persegiPanjang: "persegi panjang", segitiga: "segitiga", lingkaran: "lingkaran" };

/** C6 Tabel Permukaan: baris bangun ruang, kolom datar, lengkung, menggelinding. */
export const KOLOM_TABEL_C = ["Permukaan datar", "Permukaan lengkung", "Menggelinding"] as const;
export const kunciTabelC = (j: JenisRuang): [boolean, boolean, boolean] => [permukaanDatarMenurutBuku(j), !permukaanDatarMenurutBuku(j), menggelinding(j)];

/** C7 Beri Nama: dua ronde, urutan berbeda. */
export const RONDE_NAMA_C: { urut: JenisRuang[]; warna: string[] }[] = [
  { urut: ["kubus", "balok", "tabung", "kerucut", "bola"], warna: ["#FDE047", "#F9A8D4", "#C4B5FD", "#7DD3FC", "#86EFAC"] },
  { urut: ["bola", "kerucut", "balok", "kubus", "tabung"], warna: ["#FDBA74", "#A5B4FC", "#FDE68A", "#6EE7B7", "#FBCFE8"] },
];

/** C8 Benar atau Salah. */
export type Pernyataan = { teks: string; benar: boolean; penjelasan: string };
export const RONDE_BENARSALAH_C: Pernyataan[][] = [
  [
    { teks: "Bangun datar hanya mempunyai satu permukaan.", benar: true, penjelasan: "Bangun datar itu tipis dan hanya punya satu permukaan." },
    { teks: "Bangun ruang tidak bisa diisi.", benar: false, penjelasan: "Bangun ruang punya ruang di dalam, jadi bisa diisi." },
    { teks: "Kubus dan balok mempunyai permukaan datar.", benar: true, penjelasan: "Permukaan kubus dan balok rata, berbentuk segi empat." },
    { teks: "Bola mempunyai permukaan datar.", benar: false, penjelasan: "Seluruh permukaan bola lengkung, tidak ada yang rata." },
    { teks: "Benda yang permukaannya lengkung mudah menggelinding.", benar: true, penjelasan: "Permukaan lengkung bisa berguling terus." },
  ],
  [
    { teks: "Semua permukaan kubus berbentuk segi empat yang sama ukurannya.", benar: true, penjelasan: "Itulah ciri kubus, seperti dadu." },
    { teks: "Permukaan balok berbentuk segi empat yang berbeda ukurannya.", benar: true, penjelasan: "Itulah ciri balok, seperti kardus." },
    { teks: "Kerucut dan tabung adalah bangun datar.", benar: false, penjelasan: "Kerucut dan tabung punya ruang di dalam, jadi bangun ruang." },
    { teks: "Topi ulang tahun adalah contoh kerucut.", benar: true, penjelasan: "Topi ulang tahun runcing di ujung dan alasnya lingkaran." },
    { teks: "Kaleng susu berbentuk kubus.", benar: false, penjelasan: "Kaleng susu berbentuk tabung." },
  ],
];

/** C9 Detektif Bangun Ruang. */
export const RONDE_DETEKTIF_C: SoalDetektifTeks[] = [
  {
    petunjuk: ["Aku punya permukaan datar.", "Semua permukaanku segi empat yang sama ukurannya."],
    opsi: ["balok", "kubus", "bola"],
    jawab: 1,
    salah: "Segi empat yang sama ukurannya ada pada kubus. Balok punya segi empat yang berbeda ukurannya.",
  },
  {
    petunjuk: ["Aku tidak punya bagian yang datar.", "Aku paling mudah menggelinding."],
    opsi: ["kubus", "balok", "bola"],
    jawab: 2,
    salah: "Seluruh permukaan bola lengkung, jadi bola paling mudah menggelinding. Kubus dan balok datar.",
  },
  {
    petunjuk: ["Aku punya satu ujung yang runcing.", "Alasku berbentuk lingkaran."],
    opsi: ["tabung", "kerucut", "bola"],
    jawab: 1,
    salah: "Ujung yang runcing dan alas lingkaran ada pada kerucut, seperti topi ulang tahun.",
  },
  {
    petunjuk: ["Aku punya permukaan datar.", "Permukaanku segi empat dengan ukuran berbeda-beda."],
    opsi: ["kubus", "tabung", "balok"],
    jawab: 2,
    salah: "Segi empat dengan ukuran berbeda-beda ada pada balok, seperti kardus.",
  },
];

/** C10 Susun Kalimat. Kata urut benar, lalu satu pengecoh. */
export const RONDE_KALIMAT_C: { kata: string[]; pengecoh: string }[] = [
  { kata: ["Bangun", "ruang", "dapat", "diisi"], pengecoh: "tidak" },
  { kata: ["Kubus", "dan", "balok", "mempunyai", "permukaan", "datar"], pengecoh: "lengkung" },
  { kata: ["Bola", "mempunyai", "permukaan", "lengkung"], pengecoh: "datar" },
];
/** Urutan tampil kartu kata (indeks pada daftar kata + pengecoh). */
export function urutanKartuKata(r: { kata: string[]; pengecoh: string }, nomor: number): { teks: string; asli: number }[] {
  const semua = [...r.kata.map((teks, asli) => ({ teks, asli })), { teks: r.pengecoh, asli: -1 }];
  return urutanTetap(semua.length, 2 + nomor, 1 + nomor).map((i) => semua[i]);
}
