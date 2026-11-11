/**
 * Bengkel Urai dan Susun (Kelas 2 Bab 3, Sub-Bab B): laboratorium virtual 2D.
 * Satu bentuk cembung dibelah dengan garis potong pilihan anak. Mesin menghitung keping yang terjadi,
 * menamai tiap keping, dan menunjukkan bahwa cara membelah memengaruhi hasilnya.
 * Membelah memakai pemotongan setengah bidang, jadi urutan garis tidak memengaruhi hasil.
 * Murni: tanpa React, tanpa jaringan. Diuji di scripts/uji-lab-k2b3.mjs.
 */

export type Titik = [number, number];

export type BentukUrai = "persegi" | "persegiPanjang" | "segienam";

export const URUT_BENTUK: BentukUrai[] = ["persegi", "persegiPanjang", "segienam"];

export const NAMA_BENTUK_URAI: Record<BentukUrai, string> = {
  persegi: "Persegi",
  persegiPanjang: "Persegi panjang",
  segienam: "Segi enam",
};

export type Garis = { id: string; nama: string; a: Titik; b: Titik };

const hex = (i: number): Titik => [50 + 42 * Math.cos((Math.PI / 3) * i), 50 + 42 * Math.sin((Math.PI / 3) * i)];
const HURUF = ["A", "B", "C", "D", "E", "F"];
const garisHex = (i: number, j: number): Garis => ({ id: `${HURUF[i]}${HURUF[j]}`, nama: `${HURUF[i]}–${HURUF[j]}`, a: hex(i), b: hex(j) });

export const POLIGON_URAI: Record<BentukUrai, Titik[]> = {
  persegi: [
    [10, 10],
    [90, 10],
    [90, 90],
    [10, 90],
  ],
  persegiPanjang: [
    [5, 30],
    [95, 30],
    [95, 70],
    [5, 70],
  ],
  segienam: [0, 1, 2, 3, 4, 5].map(hex),
};

const garisKotak = (p: Titik[]): Garis[] => [
  { id: "d1", nama: "Diagonal ↘", a: p[0], b: p[2] },
  { id: "d2", nama: "Diagonal ↙", a: p[1], b: p[3] },
  { id: "tegak", nama: "Garis tengah tegak", a: [(p[0][0] + p[1][0]) / 2, p[0][1]], b: [(p[0][0] + p[1][0]) / 2, p[2][1]] },
  { id: "datar", nama: "Garis tengah datar", a: [p[0][0], (p[0][1] + p[3][1]) / 2], b: [p[1][0], (p[0][1] + p[3][1]) / 2] },
];

export const GARIS_URAI: Record<BentukUrai, Garis[]> = {
  persegi: garisKotak(POLIGON_URAI.persegi),
  persegiPanjang: garisKotak(POLIGON_URAI.persegiPanjang),
  segienam: [garisHex(0, 2), garisHex(0, 3), garisHex(0, 4), garisHex(1, 4), garisHex(2, 5)],
};

export type Contoh = { nama: string; garis: string[] };

export const CONTOH_URAI: Record<BentukUrai, Contoh[]> = {
  persegi: [
    { nama: "Satu diagonal", garis: ["d1"] },
    { nama: "Dua diagonal", garis: ["d1", "d2"] },
    { nama: "Dua garis tengah", garis: ["tegak", "datar"] },
  ],
  persegiPanjang: [
    { nama: "Satu diagonal", garis: ["d1"] },
    { nama: "Dua diagonal", garis: ["d1", "d2"] },
    { nama: "Dua garis tengah", garis: ["tegak", "datar"] },
  ],
  segienam: [
    { nama: "Dari satu titik (A)", garis: ["AC", "AD", "AE"] },
    { nama: "Lewat tengah", garis: ["AD", "BE", "CF"] },
  ],
};

/* ------------------------------ Geometri murni --------------------------- */

const EPS = 1e-6;

const bulat = (p: Titik): Titik => [Math.round(p[0] * 1e6) / 1e6, Math.round(p[1] * 1e6) / 1e6];

const silang = (a: Titik, b: Titik, p: Titik) => (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]);

export function luasPoligon(p: Titik[]): number {
  let s = 0;
  for (let i = 0; i < p.length; i += 1) {
    const q = p[(i + 1) % p.length];
    s += p[i][0] * q[1] - q[0] * p[i][1];
  }
  return Math.abs(s) / 2;
}

/** Buang titik kembar berurutan dan titik yang segaris dengan tetangganya. */
function bersihkan(p: Titik[]): Titik[] {
  let t = p.map(bulat).filter((x, i, arr) => i === 0 || Math.hypot(x[0] - arr[i - 1][0], x[1] - arr[i - 1][1]) > EPS);
  if (t.length > 1 && Math.hypot(t[0][0] - t[t.length - 1][0], t[0][1] - t[t.length - 1][1]) <= EPS) t = t.slice(0, -1);
  let berubah = true;
  while (berubah && t.length > 3) {
    berubah = false;
    for (let i = 0; i < t.length; i += 1) {
      const a = t[(i + t.length - 1) % t.length];
      const c = t[(i + 1) % t.length];
      if (Math.abs(silang(a, c, t[i])) < 1e-4) {
        t = t.filter((_, k) => k !== i);
        berubah = true;
        break;
      }
    }
  }
  return t;
}

/** Belah satu poligon cembung dengan garis lewat a dan b. Mengembalikan satu atau dua keping. */
export function belah(poli: Titik[], a: Titik, b: Titik): Titik[][] {
  const s = poli.map((p) => silang(a, b, p));
  const kiri: Titik[] = [];
  const kanan: Titik[] = [];
  for (let i = 0; i < poli.length; i += 1) {
    const p = poli[i];
    const q = poli[(i + 1) % poli.length];
    const sp = s[i];
    const sq = s[(i + 1) % poli.length];
    if (sp >= -EPS) kiri.push(p);
    if (sp <= EPS) kanan.push(p);
    if ((sp > EPS && sq < -EPS) || (sp < -EPS && sq > EPS)) {
      const t = sp / (sp - sq);
      const x: Titik = [p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])];
      kiri.push(x);
      kanan.push(x);
    }
  }
  return [kiri, kanan].map(bersihkan).filter((k) => k.length >= 3 && luasPoligon(k) > 1e-3);
}

export type Keping = { titik: Titik[]; nama: string; luas: number; pusat: Titik };

const kuadrat = (a: Titik, b: Titik) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;

/** Nama keping menurut banyak sisi; segi empat dibedakan menjadi persegi dan persegi panjang. */
export function namaKeping(t: Titik[]): string {
  const n = t.length;
  if (n === 3) return "Segitiga";
  if (n === 4) {
    let siku = 0;
    for (let i = 0; i < 4; i += 1) {
      const a = t[(i + 3) % 4];
      const b = t[i];
      const c = t[(i + 1) % 4];
      const dot = (a[0] - b[0]) * (c[0] - b[0]) + (a[1] - b[1]) * (c[1] - b[1]);
      if (Math.abs(dot) < 1e-3) siku += 1;
    }
    if (siku === 4) {
      const s = [0, 1, 2, 3].map((i) => kuadrat(t[i], t[(i + 1) % 4]));
      return Math.abs(s[0] - s[1]) < 1e-3 ? "Persegi" : "Persegi panjang";
    }
    return "Segi empat";
  }
  if (n === 5) return "Segi lima";
  if (n === 6) return "Segi enam";
  return `Segi ${n}`;
}

const pusatPoligon = (t: Titik[]): Titik => [t.reduce((s, p) => s + p[0], 0) / t.length, t.reduce((s, p) => s + p[1], 0) / t.length];

/** Keping hasil membelah bentuk dengan garis-garis terpilih. Urutan garis di daftar bentuk, bukan urutan ketuk. */
export function uraikan(bentuk: BentukUrai, terpilih: string[]): Keping[] {
  let keping: Titik[][] = [POLIGON_URAI[bentuk].map(bulat)];
  for (const g of GARIS_URAI[bentuk]) {
    if (!terpilih.includes(g.id)) continue;
    keping = keping.flatMap((k) => belah(k, g.a, g.b));
  }
  return keping.map((t) => ({ titik: t, nama: namaKeping(t), luas: luasPoligon(t), pusat: pusatPoligon(t) }));
}

export const luasBentuk = (bentuk: BentukUrai) => luasPoligon(POLIGON_URAI[bentuk]);

export const pusatBentuk = (bentuk: BentukUrai): Titik => pusatPoligon(POLIGON_URAI[bentuk]);

const URUT_NAMA = ["Segitiga", "Persegi", "Persegi panjang", "Segi empat", "Segi lima", "Segi enam"];

export type Hitung = { nama: string; jumlah: number };

export function ringkas(keping: Keping[]): Hitung[] {
  const peta = new Map<string, number>();
  for (const k of keping) peta.set(k.nama, (peta.get(k.nama) ?? 0) + 1);
  return [...peta.entries()]
    .map(([nama, jumlah]) => ({ nama, jumlah }))
    .sort((x, y) => (URUT_NAMA.indexOf(x.nama) < 0 ? 99 : URUT_NAMA.indexOf(x.nama)) - (URUT_NAMA.indexOf(y.nama) < 0 ? 99 : URUT_NAMA.indexOf(y.nama)));
}

/** Keping digeser menjauhi pusat bentuk. renggang 0 sampai 3, tiap langkah 4 satuan. */
export function geserKeping(keping: Keping, pusat: Titik, renggang: number): Titik[] {
  const dx = keping.pusat[0] - pusat[0];
  const dy = keping.pusat[1] - pusat[1];
  const len = Math.hypot(dx, dy);
  if (len < 0.5 || renggang <= 0) return keping.titik;
  const k = (renggang * 4) / len;
  return keping.titik.map((p) => [p[0] + dx * k, p[1] + dy * k] as Titik);
}

export function kalimatUrai(keping: Keping[]): string {
  if (keping.length <= 1) return "Belum ada garis potong. Bentuknya masih utuh, 1 keping.";
  const r = ringkas(keping)
    .map((h) => `${h.jumlah} ${h.nama.toLowerCase()}`)
    .join(" dan ");
  return `Jadi ada ${keping.length} keping: ${r}.`;
}

export function ucapanUrai(bentuk: BentukUrai, keping: Keping[]): string {
  const nama = NAMA_BENTUK_URAI[bentuk].toLowerCase();
  if (keping.length <= 1) return `${nama} masih utuh. Pilih garis potong untuk mengurainya.`;
  const semuaSegitiga = keping.every((k) => k.nama === "Segitiga");
  const tambahan = semuaSegitiga ? " Semua kepingnya segitiga." : "";
  return `${nama} diurai menjadi ${keping.length} keping. ${kalimatUrai(keping)}${tambahan} Kalau kepingnya dirapatkan, bentuknya kembali seperti semula.`;
}
