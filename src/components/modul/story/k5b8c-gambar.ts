import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 8 Sub-Bab C (Diagram Batang): sumbu, batang tegak, batang mendatar, batang ganda, piktogram bulat,
 * dan tabel. Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#16A34A",
  putih: "#FFFFFF",
  hitam: "#1F2937",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  coklat: "#92400E",
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  mint: "#DCFCE7",
  mawar: "#FCE7F3",
  jeruk: "#FED7AA",
  batang: "#3B82F6",
  batang2: "#F472B6",
  grid: "#E2E8F0",
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Kartu berjudul: kotak berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 8.6): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8 }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u))];
}

/** Bilangan bertitik ribuan: 2684000 menjadi "2.684.000". */
export const rb = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* ------------------------------ Diagram batang tegak ------------------------------ */

/** Area diagram tegak: (x, y) = titik nol di kiri-bawah, lebar w, tinggi h, nilai terbesar `maks`, garis skala tiap `langkah`. */
export type GV = { x: number; y: number; w: number; h: number; maks: number; langkah: number };

/** Posisi y untuk nilai n pada diagram tegak. */
export const yv = (g: GV, n: number): number => g.y - (n / g.maks) * g.h;

/** Sumbu tegak: garis dasar, garis tegak, garis skala tipis, dan angka skala di kiri. Id: `${id}-d`, `${id}-t`, `${id}-g{n}`, `${id}-a{n}`. */
export function sumbuV(id: string, g: GV, tampilAngka = true): Obj[] {
  const out: Obj[] = [];
  for (let n = 0; n <= g.maks; n += g.langkah) {
    if (n > 0) out.push(garis(`${id}-g${n}`, g.x, yv(g, n), g.w, 0, W.grid, 0.8));
    if (tampilAngka) out.push(teks(`${id}-a${n}`, g.x - 3, yv(g, n) + 2.2, rb(n), 6.2, W.biru, { anchor: "end" }));
  }
  out.push(garis(`${id}-t`, g.x, g.y, 0, -g.h - 4, W.biru, 1.4), garis(`${id}-d`, g.x, g.y, g.w, 0, W.biru, 1.4));
  return out;
}

/** Satu batang tegak ke-i dari n. Id: `${id}-k` (batang), `${id}-n` (nilai di atas), `${id}-l` (nama di bawah). */
export function batangV(id: string, g: GV, i: number, n: number, nilai: number, warna: string, label: string, o: { angka?: boolean; u?: number; teksNilai?: string } = {}): Obj[] {
  const slot = g.w / n;
  const w = slot * 0.6;
  const x = g.x + i * slot + slot * 0.2;
  const tinggi = (nilai / g.maks) * g.h;
  const out: Obj[] = [kotak(`${id}-k`, x, g.y - tinggi, w, tinggi, warna, W.biru, { rx: 1, tebal: 1 })];
  if (o.angka !== false) out.push(teks(`${id}-n`, x + w / 2, g.y - tinggi - 2.4, o.teksNilai ?? rb(nilai), o.u ?? 7.4));
  if (label) out.push(teks(`${id}-l`, x + w / 2, g.y + 8.4, label, 6.3));
  return out;
}

/** Sepasang batang tegak ganda ke-i dari n. Id: `${id}a-k`, `${id}b-k`, nilai `${id}a-n`, `${id}b-n`, nama `${id}-l`. */
export function batangGandaV(id: string, g: GV, i: number, n: number, a: number, b: number, label: string, o: { angka?: boolean } = {}): Obj[] {
  const slot = g.w / n;
  const w = slot * 0.36;
  const x0 = g.x + i * slot + slot * 0.14;
  const ta = (a / g.maks) * g.h;
  const tb = (b / g.maks) * g.h;
  const out: Obj[] = [kotak(`${id}a-k`, x0, g.y - ta, w, ta, W.batang, W.biru, { rx: 1, tebal: 0.9 }), kotak(`${id}b-k`, x0 + w, g.y - tb, w, tb, W.batang2, W.biru, { rx: 1, tebal: 0.9 })];
  if (o.angka !== false) out.push(teks(`${id}a-n`, x0 + w / 2, g.y - ta - 2, String(a), 6.4), teks(`${id}b-n`, x0 + w * 1.5, g.y - tb - 2, String(b), 6.4));
  if (label) out.push(teks(`${id}-l`, x0 + w, g.y + 8.4, label, 6.3));
  return out;
}

/* ------------------------------ Diagram batang mendatar ------------------------------ */

/** Area diagram mendatar: (x, y) = titik nol di kiri-atas, panjang w, tinggi h, nilai terbesar `maks`, garis skala tiap `langkah`. */
export type GH = { x: number; y: number; w: number; h: number; maks: number; langkah: number };

/** Posisi x untuk nilai n pada diagram mendatar. */
export const xh = (g: GH, n: number): number => g.x + (n / g.maks) * g.w;

/** Sumbu mendatar: garis tegak di nol, garis dasar, garis skala tipis, dan angka skala di bawah. Id: `${id}-t`, `${id}-d`, `${id}-g{n}`, `${id}-a{n}`. */
export function sumbuH(id: string, g: GH, tampilAngka = true): Obj[] {
  const out: Obj[] = [];
  for (let n = 0; n <= g.maks; n += g.langkah) {
    if (n > 0) out.push(garis(`${id}-g${n}`, xh(g, n), g.y - 3, 0, g.h + 3, W.grid, 0.8));
    if (tampilAngka) out.push(teks(`${id}-a${n}`, xh(g, n), g.y + g.h + 8.4, rb(n), 6.2));
  }
  out.push(garis(`${id}-t`, g.x, g.y - 3, 0, g.h + 3, W.biru, 1.4), garis(`${id}-d`, g.x, g.y + g.h, g.w, 0, W.biru, 1.4));
  return out;
}

/** Satu batang mendatar ke-i dari n. Id: `${id}-k` (batang), `${id}-n` (nilai di ujung), `${id}-l` (nama di kiri). */
export function batangH(id: string, g: GH, i: number, n: number, nilai: number, warna: string, label: string, o: { angka?: boolean; u?: number; teksNilai?: string } = {}): Obj[] {
  const slot = g.h / n;
  const tinggi = slot * 0.62;
  const y = g.y + i * slot + (slot - tinggi) / 2;
  const panjang = (nilai / g.maks) * g.w;
  const out: Obj[] = [kotak(`${id}-k`, g.x, y, panjang, tinggi, warna, W.biru, { rx: 1, tebal: 1 })];
  if (o.angka !== false) out.push(teks(`${id}-n`, g.x + panjang + 3, y + tinggi / 2 + 2.6, o.teksNilai ?? rb(nilai), o.u ?? 7.4, W.biru, { anchor: "start" }));
  out.push(teks(`${id}-l`, g.x - 3, y + tinggi / 2 + 2.4, label, 6.6, W.biru, { anchor: "end" }));
  return out;
}

/** Sepasang batang mendatar ganda ke-i dari n. Id: `${id}a-k`, `${id}b-k`, nilai `${id}a-n`, `${id}b-n`, nama `${id}-l`. */
export function batangGandaH(id: string, g: GH, i: number, n: number, a: number, b: number, label: string, o: { teksA?: string; teksB?: string } = {}): Obj[] {
  const slot = g.h / n;
  const tinggi = slot * 0.34;
  const y0 = g.y + i * slot + slot * 0.1;
  const pa = (a / g.maks) * g.w;
  const pb = (b / g.maks) * g.w;
  return [
    kotak(`${id}a-k`, g.x, y0, pa, tinggi, W.batang, W.biru, { rx: 1, tebal: 0.9 }),
    kotak(`${id}b-k`, g.x, y0 + tinggi, pb, tinggi, W.batang2, W.biru, { rx: 1, tebal: 0.9 }),
    teks(`${id}a-n`, g.x + pa + 3, y0 + tinggi / 2 + 1.2, o.teksA ?? String(a), 6.4, W.biru, { anchor: "start" }),
    teks(`${id}b-n`, g.x + pb + 3, y0 + tinggi * 1.5 + 3.6, o.teksB ?? String(b), 6.4, W.biru, { anchor: "start" }),
    teks(`${id}-l`, g.x - 3, y0 + tinggi + 2.4, label, 6.6, W.biru, { anchor: "end" }),
  ];
}

/** Legenda dua warna: dua kotak kecil dan nama. Pojok kiri-atas (x, y). Id: `${id}-a`, `${id}-an`, `${id}-b`, `${id}-bn`. */
export function legenda(id: string, x: number, y: number, a: string, b: string, jarak = 70): Obj[] {
  return [
    kotak(`${id}-a`, x, y, 8, 8, W.batang, W.biru, { rx: 1, tebal: 0.8 }),
    teks(`${id}-an`, x + 11, y + 7, a, 6.6, W.biru, { anchor: "start" }),
    kotak(`${id}-b`, x + jarak, y, 8, 8, W.batang2, W.biru, { rx: 1, tebal: 0.8 }),
    teks(`${id}-bn`, x + jarak + 11, y + 7, b, 6.6, W.biru, { anchor: "start" }),
  ];
}

/* ------------------------------ Piktogram bulat ------------------------------ */

/** Satu lambang bulat; `bagian` 1 = penuh, 0,25 = seperempat, 0,5 = setengah, 0,75 = tiga perempat. Pusat (x, y). */
export function lambangBulat(id: string, x: number, y: number, r: number, bagian: number, warna: string = W.batang2): Obj {
  if (bagian >= 1) return bulat(id, x, y, r, warna, W.biru, { tebal: 1 });
  const sudut = bagian * 2 * Math.PI;
  const ex = r * Math.sin(sudut);
  const ey = -r * Math.cos(sudut);
  const besar = bagian > 0.5 ? 1 : 0;
  return { id, t: "jalur", x, y, d: `M0 0 L0 ${-r} A${r} ${r} 0 ${besar} 1 ${ex.toFixed(2)} ${ey.toFixed(2)} Z`, warna, garis: W.biru, tebal: 1 };
}

/* ------------------------------ Tabel umum ------------------------------ */

/** Tabel sel: `lebar[c]` lebar kolom, tinggi baris `tb`. Baris pertama diwarnai judul. Id: `${id}-s{r}{c}` dan `${id}-t{r}{c}`. */
export function tabel(id: string, x: number, y: number, lebar: number[], tb: number, baris: string[][], u = 8, warnaJudul: string = W.krem): Obj[] {
  const out: Obj[] = [];
  baris.forEach((b, r) => {
    let kiri = x;
    b.forEach((sel, c) => {
      out.push(kotak(`${id}-s${r}${c}`, kiri, y + r * tb, lebar[c], tb, r === 0 ? warnaJudul : W.putih, W.biru, { rx: 0, tebal: 0.9 }));
      if (sel) out.push(teks(`${id}-t${r}${c}`, kiri + lebar[c] / 2, y + r * tb + tb / 2 + u * 0.35, sel, u));
      kiri += lebar[c];
    });
  });
  return out;
}

/** Id sel dan teks `tabel(...)` untuk satu baris r dengan n kolom (untuk dihapus atau diubah). */
export const idBaris = (id: string, r: number, n: number): string[] => Array.from({ length: n }, (_, c) => [`${id}-s${r}${c}`, `${id}-t${r}${c}`]).flat();

/** Satu baris tabel di (x, y). Id: `${id}-s{c}` dan `${id}-t{c}`. */
export function barisTabel(id: string, x: number, y: number, lebar: number[], tb: number, sel: string[], u = 8, warna: string = W.putih): Obj[] {
  const out: Obj[] = [];
  let kiri = x;
  sel.forEach((isi, c) => {
    out.push(kotak(`${id}-s${c}`, kiri, y, lebar[c], tb, warna, W.biru, { rx: 0, tebal: 0.9 }));
    if (isi) out.push(teks(`${id}-t${c}`, kiri + lebar[c] / 2, y + tb / 2 + u * 0.35, isi, u));
    kiri += lebar[c];
  });
  return out;
}
