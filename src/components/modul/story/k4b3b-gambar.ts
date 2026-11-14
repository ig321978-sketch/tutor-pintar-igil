import type { Aksi, Obj } from "./logika-story";
import { bersih, tambah } from "./k4b3b-bantu";

/**
 * Gambar khusus Story Kelas 4 Bab 3 Sub-Bab B (Pola Bilangan): deret kotak bilangan seperti rak di Buku Siswa, busur loncatan beda, garis bilangan,
 * mesin fungsi, kisi persegi satuan Pengayaan 1-2, dan susunan benda Uji Kompetensi 1-4. Berkas ini TIDAK dipakai bab lain.
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
};

type Opsi = Partial<Obj>;
type At = string | number | undefined;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });
export const jalur = (id: string, x: number, y: number, d: string, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "jalur", x, y, d, warna, garis: garisW, tebal: 1.2, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

const r1 = (n: number): number => Math.round(n * 10) / 10;

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
    b.forEach((isi, c) => {
      out.push(kotak(`${id}-s${r}${c}`, px, y + r * tinggi, kolW[c], tinggi, r === 0 ? warnaKepala : W.putih, W.biru, { rx: 0, tebal: 1, ...o }));
      if (isi) out.push(teks(`${id}-t${r}${c}`, px + kolW[c] / 2, y + r * tinggi + tinggi / 2 + u * 0.35, isi, u, W.biru, o));
      px += kolW[c];
    });
  });
  return out;
}

/** Benda sebuah baris tabel (kotak dan teks) menurut nomor baris, untuk dimunculkan satu per satu. */
export const barisTabel = (objs: Obj[], id: string, r: number): Obj[] => objs.filter((o) => new RegExp(`^${id}-[st]${r}\\d$`).test(o.id));

/** Id semua benda dari daftar (untuk hapus atau ubah sekaligus). */
export const idDari = (objs: Obj[]): string[] => objs.map((o) => o.id);

export type ItemDaftar = { at: At; t: string; w?: string; u?: number };

/** Layar daftar kartu selebar kanvas (bersih lalu judul lalu kartu satu per satu). Id kartu `${id}{n}-k` dan `${id}{n}-t0`. */
export function daftar(id: string, jud: string, items: ItemDaftar[], o: { x?: number; y?: number; lebar?: number; tinggi?: number; jarak?: number; warnaJudul?: string } = {}): Aksi[] {
  const x = o.x ?? 12;
  const y = o.y ?? 34;
  const lebar = o.lebar ?? 276;
  const tinggi = o.tinggi ?? (items.length <= 4 ? 30 : 26);
  const jarak = o.jarak ?? 8;
  return [bersih(0), tambah(0, judul(jud, o.warnaJudul)), ...items.map((it, i) => tambah(it.at, ...kartu(`${id}${i}`, x, y + i * (tinggi + jarak), lebar, tinggi, it.w ?? W.krem, [it.t], it.u ?? 9)))];
}

/* ------------------------------ Deret kotak bilangan dan busur loncatan ------------------------------ */

export type OpsiDeret = { bw?: number; bh?: number; gap?: number; u?: number; warna?: string };

/**
 * Deret kotak bilangan seperti rak di Buku Siswa: kotak `${id}-b{i}` dan angkanya `${id}-n{i}`. Nilai "?" berarti kotak kosong yang harus diisi.
 * (x, y) pojok kiri-atas kotak pertama.
 */
export function deret(id: string, x: number, y: number, nilai: string[], o: OpsiDeret = {}): Obj[] {
  const bw = o.bw ?? 34;
  const bh = o.bh ?? 26;
  const gap = o.gap ?? 8;
  const u = o.u ?? 11;
  const out: Obj[] = [];
  nilai.forEach((v, i) => {
    const kosong = v === "?";
    const px = x + i * (bw + gap);
    out.push(kotak(`${id}-b${i}`, px, y, bw, bh, kosong ? W.krem : o.warna ?? W.langit, kosong ? W.merah : W.biru, { rx: 4, tebal: 1.4 }));
    out.push(teks(`${id}-n${i}`, px + bw / 2, y + bh / 2 + u * 0.35, v, u, kosong ? W.merah : W.biru));
  });
  return out;
}

/** Lebar seluruh deret n kotak. */
export const lebarDeret = (n: number, o: OpsiDeret = {}): number => n * (o.bw ?? 34) + (n - 1) * (o.gap ?? 8);

/** Mengisi kotak ke-i pada deret `id` dengan nilai (warna hijau): untuk dipanggil pada kata tertentu. */
export const isiKotak = (at: At, id: string, i: number, nilai: string, warna: string = W.hijau): Aksi => ({
  at,
  ubah: [
    { id: `${id}-b${i}`, warna: W.hijauMuda, garis: warna },
    { id: `${id}-n${i}`, isi: nilai, warna },
  ],
});

/**
 * Busur loncatan dari kotak ke-i ke kotak ke-(i+1) pada deret `id` yang berpojok (x, y): busur `${id}-j{i}`, kepala `${id}-h{i}`, tulisan beda `${id}-l{i}`.
 * Busur melengkung di atas deret setinggi `tinggi`; tulisan di atas puncak busur.
 */
export function busur(id: string, x: number, y: number, i: number, label: string, o: OpsiDeret & { tinggi?: number; warna?: string } = {}): Obj[] {
  const bw = o.bw ?? 34;
  const gap = o.gap ?? 8;
  const tinggi = o.tinggi ?? 12;
  const warna = o.warna ?? (label.startsWith("−") ? W.merah : W.hijau);
  const x1 = x + i * (bw + gap) + bw / 2;
  const dx = bw + gap;
  return [
    jalur(`${id}-j${i}`, r1(x1), y - 1, `M0 0 Q${r1(dx / 2)} ${-2 * tinggi} ${r1(dx)} 0`, "none", warna, { tebal: 1.8, gambar: true }),
    panah(`${id}-h${i}`, r1(x1 + dx - 3), y - 6, 3, 5, warna, 1.2),
    teks(`${id}-l${i}`, r1(x1 + dx / 2), y - tinggi - 3, label, 9, warna),
  ];
}

/** Semua busur sebuah deret: labels[i] untuk loncatan dari kotak i ke i+1. Mengembalikan daftar benda per busur (untuk dimunculkan bertahap). */
export function busurSemua(id: string, x: number, y: number, labels: string[], o: OpsiDeret & { tinggi?: number } = {}): Obj[][] {
  return labels.map((l, i) => busur(id, x, y, i, l, o));
}

/* ------------------------------ Garis bilangan ------------------------------ */

export type GarisBil = { objs: Obj[]; px: (v: number) => number };

/** Garis bilangan dari `dari` sampai `sampai` selebar `lebar`, berpojok kiri (x, y). Garis `${id}-g`, goresan `${id}-s`. Tidak memberi angka; pakai titikBil. */
export function garisBilangan(id: string, x: number, y: number, lebar: number, dari: number, sampai: number): GarisBil {
  const s = lebar / (sampai - dari);
  const px = (v: number): number => r1(x + (v - dari) * s);
  const gores: string[] = [];
  for (let v = dari; v <= sampai; v += 1) gores.push(`M${r1((v - dari) * s)} -3 L${r1((v - dari) * s)} 3`);
  return { objs: [garis(`${id}-g`, x, y, lebar, 0, W.hitam, 1.6), jalur(`${id}-s`, x, y, gores.join(" "), "none", W.hitam, { tebal: 0.8 })], px };
}

/** Titik bernomor pada garis bilangan: bulatan `${id}-p` dan angka `${id}-v` di bawah garis. */
export const titikBil = (id: string, px: number, y: number, v: string, warna: string = W.biru): Obj[] => [bulat(`${id}-p`, px, y, 4.2, warna, W.putih, { tebal: 1 }), teks(`${id}-v`, px, y + 15, v, 9, warna)];

/** Busur loncatan di atas garis bilangan dari px1 ke px2 (ke kanan atau ke kiri): busur `${id}-j`, kepala `${id}-h`, tulisan `${id}-l`. */
export function loncat(id: string, y: number, px1: number, px2: number, label: string, tinggi = 18, warna?: string): Obj[] {
  const w = warna ?? (label.startsWith("−") ? W.merah : W.hijau);
  const dx = r1(px2 - px1);
  const arah = dx >= 0 ? 1 : -1;
  return [
    jalur(`${id}-j`, px1, y - 4, `M0 0 Q${r1(dx / 2)} ${-2 * tinggi} ${dx} 0`, "none", w, { tebal: 1.8, gambar: true }),
    panah(`${id}-h`, r1(px2 - 3 * arah), y - 9, 3 * arah, 5, w, 1.2),
    teks(`${id}-l`, r1(px1 + dx / 2), y - tinggi - 7, label, 9, w),
  ];
}

/* ------------------------------ Mesin fungsi ------------------------------ */

/** Mesin: kotak `${id}-m` dengan tulisan aturan `${id}-a`, panah masuk `${id}-i` dan panah keluar `${id}-o`. (x, y) pojok kiri-atas kotak mesin. */
export function mesin(id: string, x: number, y: number, aturan: string, w = 110, h = 44): Obj[] {
  return [
    kotak(`${id}-m`, x, y, w, h, W.jingga, W.coklat, { rx: 8, tebal: 2 }),
    teks(`${id}-a`, x + w / 2, y + h / 2 + 3.4, aturan, 9.6, W.biru),
    panah(`${id}-i`, x - 34, y + h / 2, 30, 0, W.biru, 2),
    panah(`${id}-o`, x + w + 4, y + h / 2, 30, 0, W.hijau, 2),
  ];
}

/* ------------------------------ Kisi persegi satuan (Pengayaan 1 dan 2) ------------------------------ */

/**
 * Kisi `kol x baris` kotak berukuran c piksel berpojok kiri-atas (x, y); kotak gelap diberi dengan [kolom, baris] mulai 0.
 * Bingkai `${id}-fr`, garis kisi `${id}-g`, kotak gelap `${id}-d` (satu lintasan, satu subpath tertutup Z tiap kotak gelap).
 */
export function kisiGelap(id: string, x: number, y: number, c: number, kol: number, baris: number, gelap: [number, number][]): Obj[] {
  const gk: string[] = [];
  for (let i = 1; i < kol; i += 1) gk.push(`M${r1(i * c)} 0 L${r1(i * c)} ${r1(baris * c)}`);
  for (let j = 1; j < baris; j += 1) gk.push(`M0 ${r1(j * c)} L${r1(kol * c)} ${r1(j * c)}`);
  const sel = gelap.map(([a, b]) => `M${r1(a * c)} ${r1(b * c)} L${r1((a + 1) * c)} ${r1(b * c)} L${r1((a + 1) * c)} ${r1((b + 1) * c)} L${r1(a * c)} ${r1((b + 1) * c)} Z`);
  return [
    kotak(`${id}-fr`, x, y, kol * c, baris * c, W.putih, W.hitam, { rx: 0, tebal: 1 }),
    jalur(`${id}-g`, x, y, gk.join(" "), "none", "#58B0E3", { tebal: 0.4 }),
    jalur(`${id}-d`, x, y, sel.join(" "), "#1565C0", "#0D47A1", { tebal: 0.4 }),
  ];
}

/** Pengayaan 1: kisi 3 kolom, pola ke-n memuat n kotak gelap berderet ke bawah di kolom tengah dan n + 2 baris. */
export const kisiPengayaan1 = (id: string, x: number, y: number, c: number, n: number): Obj[] => kisiGelap(id, x, y, c, 3, n + 2, Array.from({ length: n }, (_, i) => [1, i + 1] as [number, number]));

/** Pengayaan 2: kisi (n + 2) x (n + 2), pola ke-n memuat n x n kotak gelap di tengah. */
export function kisiPengayaan2(id: string, x: number, y: number, c: number, n: number): Obj[] {
  const gelap: [number, number][] = [];
  for (let b = 0; b < n; b += 1) for (let a = 0; a < n; a += 1) gelap.push([a + 1, b + 1]);
  return kisiGelap(id, x, y, c, n + 2, n + 2, gelap);
}

/* ------------------------------ Susunan benda (Uji Kompetensi 1-4 dan Pengayaan 3) ------------------------------ */

/** Pola bulatan huruf L (Uji Kompetensi 1): n bulatan di atas dan n - 1 di bawah ujung kanan. Bulatan `${id}-c{n}`. (x, y) pojok kiri-atas. */
export function bulatanL(id: string, x: number, y: number, n: number, d: number): Obj[] {
  const out: Obj[] = [];
  let q = 0;
  for (let i = 0; i < n; i += 1) out.push(bulat(`${id}-c${q++}`, r1(x + d / 2 + i * d), r1(y + d / 2), d * 0.45, "#047857", "#064E3B", { tebal: 0.8 }));
  for (let j = 1; j < n; j += 1) out.push(bulat(`${id}-c${q++}`, r1(x + d / 2 + (n - 1) * d), r1(y + d / 2 + j * d), d * 0.45, "#047857", "#064E3B", { tebal: 0.8 }));
  return out;
}

/** Segi enam (Uji Kompetensi 2): `kolom` kolom, tiap kolom dua segi enam; kolom ganjil turun setengah. Segi enam `${id}-h{n}`. (x, y) pojok kiri-atas. */
export function segienam(id: string, x: number, y: number, kolom: number, a: number): Obj[] {
  const b = a * 0.87;
  const d = `M${r1(a)} 0 L${r1(a / 2)} ${r1(b)} L${r1(-a / 2)} ${r1(b)} L${r1(-a)} 0 L${r1(-a / 2)} ${r1(-b)} L${r1(a / 2)} ${r1(-b)} Z`;
  const out: Obj[] = [];
  let q = 0;
  for (let c = 0; c < kolom; c += 1) {
    for (let r = 0; r < 2; r += 1) out.push(jalur(`${id}-h${q++}`, r1(x + a + c * 1.5 * a), r1(y + b + r * 2 * b + (c % 2 === 1 ? b : 0)), d, "#1565C0", "#0D47A1", { tebal: 0.8 }));
  }
  return out;
}

/** Tumpukan kaleng piramida (Uji Kompetensi 3 dan Pengayaan 3): baris dari atas ke bawah berisi `baris[i]` kaleng, rata tengah. Kaleng `${id}-c{n}`. (cx, bawah) tengah-bawah. */
export function kaleng(id: string, cx: number, bawah: number, baris: number[], s: number): Obj[] {
  const out: Obj[] = [];
  let q = 0;
  baris.forEach((n, i) => {
    const dariBawah = baris.length - 1 - i;
    for (let j = 0; j < n; j += 1) out.push(kotak(`${id}-c${q++}`, r1(cx - (n * s) / 2 + j * s + 0.6), r1(bawah - (dariBawah + 1) * s * 0.9), s - 1.2, s * 0.85, "#DC2626", "#7F1D1D", { rx: 2, tebal: 0.8 }));
  });
  return out;
}

/** Susunan batu bata (Uji Kompetensi 4): baris dari atas ke bawah `{ n, g }`: n bata, mulai dari geser g (dalam lebar bata). Bata `${id}-c{q}`. (x, y) pojok kiri-atas. */
export function bata(id: string, x: number, y: number, baris: { n: number; g: number }[], bw: number, bh: number): Obj[] {
  const out: Obj[] = [];
  let q = 0;
  baris.forEach((b, i) => {
    for (let j = 0; j < b.n; j += 1) out.push(kotak(`${id}-c${q++}`, r1(x + (b.g + j) * bw), r1(y + i * bh), bw - 0.8, bh - 0.8, "#FCD34D", "#DC2626", { rx: 1, tebal: 0.7 }));
  });
  return out;
}

/* ------------------------------ Pemunculan bertahap ------------------------------ */

/** Kotak dan angka ke-i pada deret. */
export const suku = (objs: Obj[], i: number): Obj[] => objs.filter((o) => o.id.endsWith(`-b${i}`) || o.id.endsWith(`-n${i}`));

/**
 * Memunculkan deret dan busurnya pada kata tertentu: `kotakAt[i]` memicu kotak ke-i, `busurAt[j]` memicu busur ke-j; `null` berarti tidak dimunculkan di sini
 * (misalnya kotak yang baru muncul di ketukan berikutnya).
 */
export function muncul(d: Obj[], busurObjs: Obj[][], kotakAt: (At | null)[], busurAt: (At | null)[] = []): Aksi[] {
  const out: Aksi[] = [];
  kotakAt.forEach((a, i) => {
    if (a !== null) out.push(tambah(a, ...suku(d, i)));
  });
  busurAt.forEach((a, j) => {
    if (a !== null && busurObjs[j]) out.push(tambah(a, ...busurObjs[j]));
  });
  return out;
}
