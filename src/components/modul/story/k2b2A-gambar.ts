import type { Obj } from "./logika-story";
import { W, bulat, emo, garis, kotak, teks } from "./k1b4a-gambar";

/**
 * Gambar khusus Story Kelas 2 Bab 2 Sub-Bab A "Kiriman dari Gudang" (penjumlahan sampai dua puluh), awal cerita Toko Seragam dan Alat Tulis Sekolah.
 * Rupa koperasi sekolah: lantai ubin, rak seragam, gantungan baju panjang `${id}` (tiang `${id}-a`, `${id}-b`), baju (jalur), pensil tegak `${id}` (penghapus `${id}-x`),
 * kardus kiriman `${id}` (selotip `${id}-l`), troli `${id}` (roda `${id}-r1`, `${id}-r2`, gagang `${id}-g`), jam dinding, papan harga, jalur bilangan, tabel puluhan dan satuan,
 * serta tokoh Chacha, Dika, Nia, Bu Sari (celemek digambar), dan tamu Pak Ujang (bertopi).
 */

export { W, bulat, emo, garis, judul, kartu, kotak, teks } from "./k1b4a-gambar";

export const E = {
  chacha: "\u{1F467}",
  dika: "\u{1F913}",
  nia: "\u{1F467}",
  topi: "\u{1F9E2}",
  bu: "\u{1F469}",
  ujang: "\u{1F468}",
  bel: "\u{1F514}",
  anak: "\u{1F9D2}",
  sedih: "\u{1F622}",
  tertawa: "\u{1F604}",
  senyum: "\u{1F60A}",
  pikir: "\u{1F914}",
  capek: "\u{1F629}",
  kaget: "\u{1F632}",
  kucing: "\u{1F408}",
  tidur: "\u{1F4A4}",
  tanya: "\u{2753}",
  benar: "\u{2705}",
  salah: "\u{274C}",
  lampu: "\u{1F4A1}",
  lambai: "\u{1F44B}",
  jari: "\u{1F446}",
  kertas: "\u{1F4DD}",
  lembar: "\u{1F4DC}",
  kalender: "\u{1F4C5}",
  mata: "\u{1F440}",
  jempol: "\u{1F44D}",
  gembira: "\u{1F929}",
  lega: "\u{1F60C}",
  topiMerah: "\u{1F9E2}",
  penggaris: "\u{1F4CF}",
  kardus: "\u{1F4E6}",
  petir: "\u{26A1}",
} as const;

/** Warna rupa koperasi. */
export const WK = {
  lantai: "#E0E7FF",
  lantaiGaris: "#818CF8",
  kardus: "#D6A15E",
  selotip: "#FEF3C7",
  hijau: "#4ADE80",
  kuning: "#FACC15",
  biru: "#60A5FA",
  rak: "#FDBA74",
  papan: "#166534",
  apron: "#FECACA",
  puluhan: "#BFDBFE",
  satuan: "#FECACA",
  puluhanTua: "#93C5FD",
  satuanTua: "#FCA5A5",
} as const;

const f = (n: number): number => Number(n.toFixed(1));
type Ubah = Partial<Obj> & { id: string };

/** Lantai ubin koperasi `${id}`. */
export const lantai = (id: string, y = 168): Obj => kotak(id, 2, y, 296, 198 - y, WK.lantai, WK.lantaiGaris, { rx: 4, tebal: 1.2, z: -3 });

/** Baju kaos (jalur) berpusat di (cx, cy), setengah lebar s. */
export const baju = (id: string, cx: number, cy: number, warna: string, s = 8, o: Partial<Obj> = {}): Obj => ({
  id,
  t: "jalur",
  x: cx,
  y: cy,
  d: `M${f(-s)} ${f(-s * 0.7)} L${f(-s * 0.4)} ${f(-s)} L${f(s * 0.4)} ${f(-s)} L${f(s)} ${f(-s * 0.7)} L${f(s * 0.7)} ${f(-s * 0.1)} L${f(s * 0.4)} ${f(-s * 0.3)} L${f(s * 0.4)} ${f(s)} L${f(-s * 0.4)} ${f(s)} L${f(-s * 0.4)} ${f(-s * 0.3)} L${f(-s * 0.7)} ${f(-s * 0.1)} Z`,
  warna,
  garis: W.biru,
  tebal: 1,
  ...o,
});

/** Pensil tegak berpusat di (cx, cy): badan `${id}` dan penghapus `${id}-x`. */
export const pensil = (id: string, cx: number, cy: number, warna: string, o: Partial<Obj> = {}): Obj[] => [
  kotak(id, f(cx - 2.5), f(cy - 9), 5, 20, warna, W.biru, { rx: 1, tebal: 0.9, ...o }),
  kotak(`${id}-x`, f(cx - 2.5), f(cy - 12.5), 5, 3.5, W.pink, W.biru, { rx: 1, tebal: 0.8, ...o }),
];
export const idPensil = (id: string): string[] => [id, `${id}-x`];

/** Gantungan baju panjang: palang `${id}` dari (x, y) selebar w, tiang `${id}-a` dan `${id}-b` turun h. */
export const gantungan = (id: string, x: number, y: number, w: number, h = 100, o: Partial<Obj> = {}): Obj[] => [
  garis(id, x, y, w, 0, W.coklat, 3, { z: 0, ...o }),
  garis(`${id}-a`, x, y, 0, h, W.coklat, 3, { z: -1, ...o }),
  garis(`${id}-b`, f(x + w), y, 0, h, W.coklat, 3, { z: -1, ...o }),
];

/** Kardus kiriman `${id}` dengan selotip `${id}-l`. Pojok kiri-atas (x, y). */
export const kardus = (id: string, x: number, y: number, w: number, h: number, o: Partial<Obj> = {}): Obj[] => [
  kotak(id, x, y, w, h, WK.kardus, W.coklat, { rx: 2, tebal: 1.6, ...o }),
  kotak(`${id}-l`, f(x + w * 0.4), y, f(w * 0.2), h, WK.selotip, undefined, { rx: 0, ...o, z: (o.z ?? 0) + 1 }),
];
export const idKardus = (id: string): string[] => [id, `${id}-l`];

/** Troli pengangkut: papan `${id}` dari (x, y) selebar w, roda `${id}-r1`, `${id}-r2`, gagang `${id}-g`. */
export const troli = (id: string, x: number, y: number, w: number): Obj[] => [
  kotak(id, x, y, w, 6, "#94A3B8", "#475569", { rx: 2, tebal: 1.2 }),
  bulat(`${id}-r1`, f(x + 12), f(y + 12), 5, "#1E293B", "#0F172A", { tebal: 1 }),
  bulat(`${id}-r2`, f(x + w - 12), f(y + 12), 5, "#1E293B", "#0F172A", { tebal: 1 }),
  garis(`${id}-g`, f(x + w), y, 8, -34, "#475569", 2.4),
];
export const idTroli = (id: string): string[] => [id, `${id}-r1`, `${id}-r2`, `${id}-g`];

/** Jam dinding: muka `${id}`, jarum menit `${id}-m`, jarum jam `${id}-j`, titik tengah `${id}-c`. */
export const jam = (id: string, x: number, y: number, r = 16): Obj[] => [
  bulat(id, x, y, r, W.putih, W.biru, { tebal: 2.4 }),
  garis(`${id}-m`, x, y, f(-r * 0.16), f(-r * 0.72), W.biru, 1.8, { z: 2 }),
  garis(`${id}-j`, x, y, f(r * 0.45), f(r * 0.26), W.merah, 2.4, { z: 2 }),
  bulat(`${id}-c`, x, y, 1.8, W.biru, W.biru, { z: 3 }),
];

/** Papan harga hijau bertepi kayu: kotak `${id}`. */
export const papanHarga = (id: string, x: number, y: number, w: number, h: number): Obj => kotak(id, x, y, w, h, WK.papan, W.coklat, { rx: 5, tebal: 4, z: -1 });
/** Tulisan kapur putih. */
export const kapur = (id: string, x: number, y: number, isi: string, u = 10, o: Partial<Obj> = {}): Obj => teks(id, x, y, isi, u, "#F8FAFC", { z: 3, ...o });

/** Rak seragam: papan belakang `${id}` dan papan rak `${id}-r{i}` (n tingkat). Pojok kiri-atas (x, y). */
export const rak = (id: string, x: number, y: number, w: number, h: number, n = 3): Obj[] => [
  kotak(id, x, y, w, h, "#FFEDD5", "#C2410C", { rx: 3, tebal: 2.2, z: -2 }),
  ...Array.from({ length: n }, (_, i) => garis(`${id}-r${i + 1}`, f(x + 3), f(y + (h * (i + 1)) / n), f(w - 6), 0, "#C2410C", 2.2, { z: -1 })),
];

/** Garis mutlak dari (x, y) ke (x2, y2). */
export const gs = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Partial<Obj> = {}): Obj => garis(id, x, y, f(x2 - x), f(y2 - y), warna, tebal, o);
/** Panah mutlak dari (x, y) ke (x2, y2). */
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.merah, o: Partial<Obj> = {}): Obj => ({ id, t: "panah", x, y, x2: f(x2 - x), y2: f(y2 - y), warna, tebal: 3, ...o });

/** Busur lompatan dari (x, y) sepanjang w, setinggi tinggi: jalur `${id}`. */
export const busur = (id: string, x: number, y: number, w: number, tinggi = 22, warna: string = W.merah, o: Partial<Obj> = {}): Obj => ({
  id,
  t: "jalur",
  x,
  y,
  d: `M0 0 Q${f(w / 2)} ${f(-tinggi)} ${f(w)} 0`,
  warna: "none",
  garis: warna,
  tebal: 2.2,
  gambar: true,
  ...o,
});

/** Garis bilangan: palang `${id}` dari x0 selebar (n - 1) jarak, titik `${id}-t{i}` (i = 0 sampai n - 1). */
export const jalurBilangan = (id: string, x0: number, y: number, n: number, jarak: number, o: Partial<Obj> = {}): Obj[] => [
  garis(id, x0, y, f((n - 1) * jarak), 0, W.biru, 2.4, o),
  ...Array.from({ length: n }, (_, i) => garis(`${id}-t${i}`, f(x0 + i * jarak), f(y - 4), 0, 8, W.biru, 2, o)),
];
export const idJalur = (id: string, n: number): string[] => [id, ...Array.from({ length: n }, (_, i) => `${id}-t${i}`)];

/** Kotak kolom puluhan (kiri) dan satuan (kanan) berlebar w tiap kolom, badan setinggi h di bawah judul kolom 16: `${id}-p`, `${id}-s`. Pojok kiri-atas (x, y). */
export const kolomPS = (id: string, x: number, y: number, w: number, h: number): Obj[] => [
  kotak(`${id}-p`, x, f(y + 16), w, f(h - 16), WK.puluhan, W.biru, { rx: 3, tebal: 1.6 }),
  kotak(`${id}-s`, f(x + w), f(y + 16), w, f(h - 16), WK.satuan, W.biru, { rx: 3, tebal: 1.6 }),
];
/** Judul kolom: `p` = puluhan (biru), `s` = satuan (merah): kotak `${id}-b{p|s}` dan tulisan `${id}-h{p|s}`. */
export const judulKolom = (id: string, x: number, y: number, w: number, kol: "p" | "s"): Obj[] => {
  const x0 = kol === "p" ? x : f(x + w);
  return [
    kotak(`${id}-b${kol}`, x0, y, w, 16, kol === "p" ? WK.puluhanTua : WK.satuanTua, W.biru, { rx: 3, tebal: 1.6 }),
    teks(`${id}-h${kol}`, f(x0 + w / 2), f(y + 12), kol === "p" ? "puluhan" : "satuan", 9, W.biru),
  ];
};

export type NamaTokoh = "Chacha" | "Dika" | "Nia" | "Bu Sari" | "Pak Ujang";

/** Tokoh berdiri: wajah `${id}`, nama `${id}-n`. Nia bertopi `${id}-tp`, Pak Ujang bertopi `${id}-tp`, Bu Sari bercelemek `${id}-ap` (kotak merah muda di bawah wajah). */
export function tokoh(id: string, x: number, y: number, nama: NamaTokoh, u = 30): Obj[] {
  const wajah = nama === "Chacha" ? E.chacha : nama === "Dika" ? E.dika : nama === "Nia" ? E.nia : nama === "Bu Sari" ? E.bu : E.ujang;
  const out: Obj[] = [];
  if (nama === "Bu Sari") out.push(kotak(`${id}-ap`, f(x - 17), f(y + 5), 34, 12, WK.apron, "#BE185D", { rx: 3, tebal: 1.2, z: 0 }));
  out.push(emo(id, x, y, wajah, u, { z: 1 }));
  if (nama === "Nia" || nama === "Pak Ujang") out.push(emo(`${id}-tp`, x, f(y - u * 0.5), E.topi, f(u * 0.55), { z: 2 }));
  out.push(teks(`${id}-n`, x, f(y + 13), nama, 8.4, W.ungu, { z: 2 }));
  return out;
}
export const idTokoh = (id: string, nama: NamaTokoh): string[] => [id, `${id}-n`, ...(nama === "Nia" || nama === "Pak Ujang" ? [`${id}-tp`] : []), ...(nama === "Bu Sari" ? [`${id}-ap`] : [])];

/** Pindahkan pensil `${id}` (dan penghapusnya) ke pusat baru (cx, cy), untuk dipakai di aksi ubah. */
export const pindahPensil = (id: string, cx: number, cy: number): Ubah[] => [
  { id, x: f(cx - 2.5), y: f(cy - 9) },
  { id: `${id}-x`, x: f(cx - 2.5), y: f(cy - 12.5) },
];

/** Kotak pensil panjang berpetak sepuluh: badan `${id}` dan petak `${id}-s{i}`. Pojok kiri-atas (x, y); pusat petak ke-i di (xPetak(x, i), y + 18). */
export const xPetak = (x: number, i: number): number => f(x + 12 + i * 24);
export const kotakPensil = (id: string, x: number, y: number): Obj[] => [
  kotak(id, x, y, 240, 34, "#FEF3C7", W.coklat, { rx: 4, tebal: 2.2, z: -1 }),
  ...Array.from({ length: 10 }, (_, i) => kotak(`${id}-s${i}`, f(x + 1 + i * 24), f(y + 3), 22, 28, W.putih, "#CA8A04", { rx: 2, tebal: 1, z: -1 })),
];

export type { Ubah };
