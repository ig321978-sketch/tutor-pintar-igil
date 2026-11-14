import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 3 Sub-Bab A (membandingkan dan mengurutkan pecahan): lingkaran dan batang pecahan, garis bilangan, kisi dan segitiga berpetak,
 * serta data lompatan Yohana (Buku Siswa hlm. 71 sampai 74) dan pita Nisa (hlm. 75). Berkas ini TIDAK dipakai bab lain.
 * Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
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
  jingga: "#FDBA74",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  pink: "#FBCFE8",
  karang: "#F47C62",
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const jalur = (id: string, x: number, y: number, d: string, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "jalur", x, y, d, warna, garis: garisW, tebal: 1.4, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 8.6, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Tabel sederhana: baris pertama kepala. Id sel `${id}-s{r}{c}` (kotak) dan `${id}-t{r}{c}` (teks). */
export function tabel(id: string, x: number, y: number, kolW: number[], baris: string[][], tinggi = 16, u = 8, warnaKepala: string = W.krem, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  baris.forEach((b, r) => {
    let px = x;
    b.forEach((sel, c) => {
      out.push(kotak(`${id}-s${r}${c}`, px, y + r * tinggi, kolW[c], tinggi, r === 0 ? warnaKepala : W.putih, W.biru, { rx: 0, tebal: 1, ...o }));
      if (sel) out.push(teks(`${id}-t${r}${c}`, px + kolW[c] / 2, y + r * tinggi + tinggi / 2 + u * 0.35, sel, u, W.biru, o));
      px += kolW[c];
    });
  });
  return out;
}

/** Id semua benda (kotak dan teks) satu baris tabel. */
export const idBaris = (id: string, r: number, kolom: number): string[] => Array.from({ length: kolom }, (_, c) => [`${id}-s${r}${c}`, `${id}-t${r}${c}`]).flat();

export type Titik = [number, number];
const f1 = (n: number): string => n.toFixed(1);

/** Bangun datar tertutup dari titik-titik relatif terhadap (x, y). */
export const poligon = (id: string, x: number, y: number, p: Titik[], warna: string, tepi: string = W.biru, o: Opsi = {}): Obj =>
  jalur(id, x, y, `${p.map((t, i) => `${i === 0 ? "M" : "L"}${f1(t[0])} ${f1(t[1])}`).join(" ")} Z`, warna, tepi, { tebal: 1.8, ...o });

/* ------------------------------ Data buku ------------------------------ */

export type Campuran = { bulat: number; p: number; q: number };
/** Tiga lompatan Yohana (Buku Siswa hlm. 71): 2 3/4 m, 3 1/2 m, dan 7/8 m. */
export const LOMPATAN: Campuran[] = [
  { bulat: 2, p: 3, q: 4 },
  { bulat: 3, p: 1, q: 2 },
  { bulat: 0, p: 7, q: 8 },
];
/** Tiga potongan pita Nisa (Buku Siswa hlm. 75): 2 2/5 m, 2 1/4 m, 2 1/2 m. */
export const PITA: Campuran[] = [
  { bulat: 2, p: 2, q: 5 },
  { bulat: 2, p: 1, q: 4 },
  { bulat: 2, p: 1, q: 2 },
];
/** Nilai pecahan campuran dalam satuan penuh. */
export const nilai = (c: Campuran): number => c.bulat + c.p / c.q;
/** Tulisan pecahan campuran: "2 3/4", "7/8". */
export const tulis = (c: Campuran): string => (c.bulat > 0 ? `${c.bulat} ${c.p}/${c.q}` : `${c.p}/${c.q}`);

/* ------------------------------ Lingkaran dan batang pecahan ------------------------------ */

/** Lingkaran pecahan: q juring sama besar, p juring pertama (searah jarum jam dari atas) berwarna. Id `${id}-w{i}` tiap juring. */
export function pai(id: string, cx: number, cy: number, r: number, q: number, p: number, isi: string = W.karang, o: Opsi = {}): Obj[] {
  if (q === 1) return [bulat(`${id}-w0`, cx, cy, r, p > 0 ? isi : W.putih, W.biru, { tebal: 1.4, ...o })];
  const out: Obj[] = [];
  for (let i = 0; i < q; i += 1) {
    const a0 = -Math.PI / 2 + (i * 2 * Math.PI) / q;
    const a1 = -Math.PI / 2 + ((i + 1) * 2 * Math.PI) / q;
    const d = `M0 0 L${f1(r * Math.cos(a0))} ${f1(r * Math.sin(a0))} A${r} ${r} 0 0 1 ${f1(r * Math.cos(a1))} ${f1(r * Math.sin(a1))} Z`;
    out.push(jalur(`${id}-w${i}`, cx, cy, d, i < p ? isi : W.putih, W.biru, { tebal: 1.3, ...o }));
  }
  return out;
}

/** Batang pecahan: q petak sama lebar, p petak pertama dari kiri berwarna. Id `${id}-c{i}`. Pojok kiri-atas (x, y). */
export function batang(id: string, x: number, y: number, w: number, h: number, q: number, p: number, isi: string = W.karang, o: Opsi = {}): Obj[] {
  return Array.from({ length: q }, (_, i) => kotak(`${id}-c${i}`, x + (i * w) / q, y, w / q, h, i < p ? isi : W.putih, W.biru, { rx: 0, tebal: 1.2, ...o }));
}

/** Kisi petak sama besar (kolom x baris). `isi` memuat nomor petak (baris demi baris dari kiri-atas) yang berwarna. Id `${id}-c{n}`. */
export function kisi(id: string, x: number, y: number, cw: number, ch: number, kolom: number, baris: number, isi: number[], warna: string = W.karang, o: Opsi = {}): Obj[] {
  return Array.from({ length: kolom * baris }, (_, n) => kotak(`${id}-c${n}`, x + (n % kolom) * cw, y + Math.floor(n / kolom) * ch, cw, ch, isi.includes(n) ? warna : W.putih, W.biru, { rx: 0, tebal: 1.2, ...o }));
}

/** Empat segitiga kecil dari segitiga besar (puncak atas, alas bawah) pada kotak (x, y, w, h). Urutan: atas, kiri, kanan, tengah (terbalik). */
export function bagiSegitiga(x: number, y: number, w: number, h: number): Titik[][] {
  const a: Titik = [x + w / 2, y];
  const b: Titik = [x, y + h];
  const c: Titik = [x + w, y + h];
  const m1: Titik = [x + w / 4, y + h / 2];
  const m2: Titik = [x + (3 * w) / 4, y + h / 2];
  const m3: Titik = [x + w / 2, y + h];
  return [
    [a, m1, m2],
    [m1, b, m3],
    [m2, m3, c],
    [m1, m2, m3],
  ];
}

/** Segitiga dibagi empat segitiga kecil sama besar. `isi` memuat nomor (0 atas, 1 kiri, 2 kanan, 3 tengah) yang berwarna. Id `${id}-s{n}`. Titik mutlak (x = y = 0). */
export function segitiga4(id: string, x: number, y: number, w: number, h: number, isi: number[], o: Opsi = {}): Obj[] {
  return bagiSegitiga(x, y, w, h).map((p, n) => poligon(`${id}-s${n}`, 0, 0, p, isi.includes(n) ? W.karang : W.putih, W.biru, { tebal: 1.2, ...o }));
}

const tengah = (s: Titik, t: Titik): Titik => [(s[0] + t[0]) / 2, (s[1] + t[1]) / 2];

/**
 * Segitiga dibagi empat dua kali: 16 segitiga kecil sama besar. `isi` memuat nomor bagian pertama (0 atas, 1 kiri, 2 kanan) yang berwarna,
 * tiap bagian berwarna menyisakan satu segitiga tengah putih sehingga 3 bagian berwarna menghasilkan 9 segitiga kecil berwarna. Id `${id}-s{n}{m}`.
 */
export function segitiga16(id: string, x: number, y: number, w: number, h: number, isi: number[], o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  bagiSegitiga(x, y, w, h).forEach((bt, n) => {
    const [p1, p2, p3] = bt;
    const q12 = tengah(p1, p2);
    const q23 = tengah(p2, p3);
    const q13 = tengah(p1, p3);
    const sub: Titik[][] = [[p1, q12, q13], [q12, p2, q23], [q13, q23, p3], [q12, q23, q13]];
    sub.forEach((p, m) => out.push(poligon(`${id}-s${n}${m}`, 0, 0, p, isi.includes(n) && m < 3 ? W.karang : W.putih, W.biru, { tebal: 0.9, ...o })));
  });
  return out;
}

/* ------------------------------ Garis bilangan ------------------------------ */

/**
 * Garis bilangan mendatar dari 0 sampai `maks` (bilangan bulat). Titik 0 ada di x, satu satuan = `satuan` piksel, garis pada ketinggian y.
 * Id: `${id}-g` (garis), `${id}-t{n}` (goresan) dan `${id}-l{n}` (angka bulat di atas garis).
 */
export function garisBilangan(id: string, x: number, y: number, satuan: number, maks: number, u = 8, awal = 0): Obj[] {
  const out: Obj[] = [garis(`${id}-g`, x, y, satuan * (maks - awal), 0, W.biru, 2)];
  for (let n = awal; n <= maks; n += 1) {
    out.push(garis(`${id}-t${n}`, x + (n - awal) * satuan, y - 4, 0, 8, W.biru, 1.6));
    out.push(teks(`${id}-l${n}`, x + (n - awal) * satuan, y - 8, String(n), u, W.biru));
  }
  return out;
}

/** Penanda satu pecahan pada garis bilangan: bulatan di x + (nilai - awal) x satuan. Id `${id}` (bulat) dan `${id}-n` (tulisan di bawah garis). */
export function penanda(id: string, x: number, y: number, satuan: number, nilaiPecahan: number, label: string, warna: string = W.merah, bawah = 13, u = 8, awal = 0): Obj[] {
  return [bulat(id, x + (nilaiPecahan - awal) * satuan, y, 3.6, warna, W.putih, { tebal: 1 }), teks(`${id}-n`, x + (nilaiPecahan - awal) * satuan, y + bawah, label, u, warna)];
}
