import type { Obj } from "./logika-story";
import { W, bulat, emo, garis, kotak, teks, type Titik } from "./k1b4a-gambar";

/**
 * Gambar khusus Story Kelas 2 Bab 2 Sub-Bab C "Pesanan Besar Pak Budi" (cerita hitungan penjumlahan dan pengurangan), akhir cerita
 * Toko Seragam dan Alat Tulis Sekolah. Koperasi sekolah menjelang pembukaan: lantai kayu, rak alat tulis, kertas pesanan, benda alat tulis
 * (pensil, penggaris, pensil warna, penghapus, rautan), kartu empat langkah, bulatan bagian dan utuh, batang bagian, pita dan gunting, spanduk, lencana, dan konfeti.
 * Tokoh: Chacha, Dika, Nia, Bu Sari, dan Pak Budi (kepala sekolah, berpeci hitam).
 */

export { W, bulat, emo, garis, judul, kartu, kotak, teks, type Titik } from "./k1b4a-gambar";

export const E = {
  anak: "\u{1F467}",
  dika: "\u{1F913}",
  wanita: "\u{1F469}",
  pria: "\u{1F468}",
  topi: "\u{1F9E2}",
  pensil: "\u{270F}\u{FE0F}",
  penggaris: "\u{1F4CF}",
  warna: "\u{1F58D}\u{FE0F}",
  gunting: "\u{2702}\u{FE0F}",
  pita: "\u{1F380}",
  hadiah: "\u{1F381}",
  seru: "\u{2757}",
  tanya: "\u{2753}",
  centang: "\u{2705}",
  salah: "\u{274C}",
  tertawa: "\u{1F602}",
  mikir: "\u{1F914}",
  catat: "\u{1F4DD}",
  tepuk: "\u{1F44F}",
  jempol: "\u{1F44D}",
  lambai: "\u{1F44B}",
  konfeti: "\u{1F389}",
  konfeti2: "\u{1F38A}",
  medali: "\u{1F3C5}",
  bintang: "\u{2B50}",
  sedih: "\u{1F622}",
  kaca: "\u{1F50D}",
  geleng: "\u{1F926}",
  senyum: "\u{1F60A}",
  tangan: "\u{270B}",
  kotakKartu: "\u{1F0CF}",
  toko: "\u{1F3EA}",
  anakAnak: "\u{1F9D2}",
} as const;

export const WK = {
  lantai: "#F5D9A8",
  tepiLantai: "#D97706",
  kayu: "#E8C08A",
  kayuTua: "#92400E",
  kertas: "#FFFFFF",
  garisKertas: "#93C5FD",
  spanduk: "#B91C1C",
  hapus: "#F9A8D4",
  rautan: "#7DD3FC",
  celemek: "#FFFFFF",
  peci: "#111827",
  hijauTua: "#15803D",
  biruMuda: "#BFDBFE",
} as const;

const f = (n: number): number => Number(n.toFixed(1));
type Ubah = Partial<Obj> & { id: string };
type Opsi = Partial<Obj>;

/** Lantai kayu koperasi `${id}`: dari tinggi y sampai bawah kanvas. */
export const lantai = (id: string, y = 150): Obj => kotak(id, 2, y, 296, 198 - y, WK.lantai, WK.tepiLantai, { rx: 4, tebal: 1.2, z: -3 });

/** Garis dan panah dengan ujung ditulis mutlak (disimpan relatif). */
export const gs = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => garis(id, x, y, f(x2 - x), f(y2 - y), warna, tebal, o);
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.merah, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2: f(x2 - x), y2: f(y2 - y), warna, tebal: 3, ...o });

/* ------------------------------ Tokoh ------------------------------ */

export type JenisTokoh = "chacha" | "dika" | "nia" | "sari" | "budi";
const NAMA_TOKOH: Record<JenisTokoh, string> = { chacha: "Chacha", dika: "Dika", nia: "Nia", sari: "Bu Sari", budi: "Pak Budi" };
/**
 * Tokoh berdiri berpusat (x, y): wajah `${id}` dan nama `${id}-n`. Nia memakai topi `${id}-tp`; Bu Sari memakai celemek putih `${id}-ap`;
 * Pak Budi memakai peci hitam `${id}-pc`.
 */
export function tokoh(id: string, x: number, y: number, jenis: JenisTokoh, u = 30): Obj[] {
  const wajah = jenis === "dika" ? E.dika : jenis === "sari" ? E.wanita : jenis === "budi" ? E.pria : E.anak;
  const dewasa = jenis === "sari" || jenis === "budi";
  const out: Obj[] = [emo(id, x, y, wajah, u), teks(`${id}-n`, x, f(y + (dewasa ? 21 : 13)), NAMA_TOKOH[jenis], 8.4, W.ungu)];
  if (jenis === "nia") out.push(emo(`${id}-tp`, x, f(y - 13), E.topi, 15, { z: 1 }));
  if (jenis === "sari") out.push(kotak(`${id}-ap`, f(x - 7), f(y + 5), 14, 10, WK.celemek, W.biru, { rx: 3, tebal: 1.2, z: 1 }));
  if (jenis === "budi") out.push(kotak(`${id}-pc`, f(x - 7), f(y - 22), 14, 7, WK.peci, W.biru, { rx: 3, tebal: 1, z: 1 }));
  return out;
}
export const idTokoh = (id: string, jenis: JenisTokoh): string[] => [id, `${id}-n`, ...(jenis === "nia" ? [`${id}-tp`] : []), ...(jenis === "sari" ? [`${id}-ap`] : []), ...(jenis === "budi" ? [`${id}-pc`] : [])];
/** Pindah tokoh ke (x, y) bersama namanya dan pelengkapnya. */
export const geserTokoh = (id: string, x: number, y: number, jenis: JenisTokoh): Ubah[] => {
  const dewasa = jenis === "sari" || jenis === "budi";
  return [
    { id, x, y },
    { id: `${id}-n`, x, y: f(y + (dewasa ? 21 : 13)) },
    ...(jenis === "nia" ? [{ id: `${id}-tp`, x, y: f(y - 13) }] : []),
    ...(jenis === "sari" ? [{ id: `${id}-ap`, x: f(x - 7), y: f(y + 5) }] : []),
    ...(jenis === "budi" ? [{ id: `${id}-pc`, x: f(x - 7), y: f(y - 22) }] : []),
  ];
};

/* ------------------------------ Benda alat tulis ------------------------------ */

export type Jenis = "pensil" | "penggaris" | "warna" | "hapus" | "rautan";
export const NAMA_BENDA: Record<Jenis, string> = { pensil: "pensil", penggaris: "penggaris", warna: "pensil warna", hapus: "penghapus", rautan: "rautan" };
/** Satu benda berpusat di (x, y): benda utama `${id}`; rautan punya lubang `${id}-x`. */
export function benda(jenis: Jenis, id: string, x: number, y: number, u = 16, o: Opsi = {}): Obj[] {
  if (jenis === "hapus") return [kotak(id, f(x - 6), f(y - 4), 12, 8, WK.hapus, W.biru, { rx: 2, tebal: 1.2, ...o })];
  if (jenis === "rautan") return [kotak(id, f(x - 6), f(y - 5), 12, 10, WK.rautan, W.biru, { rx: 2, tebal: 1.2, ...o }), bulat(`${id}-x`, f(x + 1), y, 2, W.putih, W.biru, { tebal: 1, z: (o.z ?? 0) + 1, ...(o.op === undefined ? {} : { op: o.op }) })];
  const e = jenis === "pensil" ? E.pensil : jenis === "penggaris" ? E.penggaris : E.warna;
  return [emo(id, x, f(y + u * 0.35), e, u, o)];
}
export const idBenda = (jenis: Jenis, id: string): string[] => (jenis === "rautan" ? [id, `${id}-x`] : [id]);
/** Titik-titik berderet datar: n titik dari x0 dengan jarak dx pada tinggi y. */
export const baris = (n: number, x0: number, y: number, dx: number): Titik[] => Array.from({ length: n }, (_, i) => ({ x: f(x0 + i * dx), y }));
/** Benda sejenis di titik-titik `pts`, id `${id}${i}`. */
export const deret = (jenis: Jenis, id: string, pts: Titik[], u = 16, o: Opsi = {}): Obj[] => pts.flatMap((p, i) => benda(jenis, `${id}${i}`, p.x, p.y, u, o));
export const idDeret = (jenis: Jenis, id: string, n: number, dari = 0): string[] => Array.from({ length: n }, (_, i) => idBenda(jenis, `${id}${dari + i}`)).flat();

/* ------------------------------ Rak, kertas pesanan, pita, spanduk ------------------------------ */

/** Rak alat tulis: badan `${id}` dan dua papan rak `${id}-r1`, `${id}-r2` (garis). */
export const rak = (id: string, x: number, y: number, w: number, h: number): Obj[] => [
  kotak(id, x, y, w, h, WK.kayu, WK.kayuTua, { rx: 5, tebal: 2.4, z: -2 }),
  gs(`${id}-r1`, f(x + 3), f(y + h / 3), f(x + w - 3), f(y + h / 3), WK.kayuTua, 2.6, { z: -1 }),
  gs(`${id}-r2`, f(x + 3), f(y + (2 * h) / 3), f(x + w - 3), f(y + (2 * h) / 3), WK.kayuTua, 2.6, { z: -1 }),
];
export const idRak = (id: string): string[] => [id, `${id}-r1`, `${id}-r2`];

/** Kertas pesanan: kertas `${id}`, tiga garis `${id}-g0` sampai `-g2`. Pojok kiri-atas (x, y). */
export const kertasPesanan = (id: string, x: number, y: number, w: number, h: number): Obj[] => [
  kotak(id, x, y, w, h, WK.kertas, W.biru, { rx: 3, tebal: 1.8 }),
  ...[0, 1, 2].map((i) => gs(`${id}-g${i}`, f(x + 6), f(y + h - 14 - i * 11), f(x + w - 6), f(y + h - 14 - i * 11), WK.garisKertas, 1.2, { z: 1 })),
];
export const idKertas = (id: string): string[] => [id, `${id}-g0`, `${id}-g1`, `${id}-g2`];

/** Pita merah di pintu: tali `${id}` (garis tebal) dan simpul `${id}-s` (emoji). */
export const pitaPintu = (id: string, x: number, y: number, x2: number): Obj[] => [gs(id, x, y, x2, y, "#DC2626", 5, { z: 1 }), emo(`${id}-s`, f(x2 - 8), f(y + 5), E.pita, 14, { z: 2 })];

/** Spanduk merah dengan tulisan putih: kain `${id}` dan tulisan `${id}-t`. */
export const spanduk = (id: string, x: number, y: number, w: number, isi: string, u = 10): Obj[] => [
  kotak(id, x, y, w, 24, WK.spanduk, W.biru, { rx: 4, tebal: 1.8 }),
  teks(`${id}-t`, f(x + w / 2), f(y + 16), isi, u, W.putih, { z: 1 }),
];
export const idSpanduk = (id: string): string[] => [id, `${id}-t`];

/** Pintu koperasi: daun `${id}` dan papan nama `${id}-p`. */
export const pintu = (id: string, x: number, y: number, w: number, h: number): Obj[] => [kotak(id, x, y, w, h, "#FDE68A", WK.kayuTua, { rx: 4, tebal: 2.6, z: -2 }), kotak(`${id}-p`, f(x + w / 2 - 3), f(y + h / 2), 6, 8, WK.kayuTua, undefined, { rx: 3, z: -1 })];

/* ------------------------------ Bagian dan utuh, batang ------------------------------ */

/**
 * Tiga bulatan bagian dan utuh: utuh `${id}-u` di atas (pusat ux, uy), bagian `${id}-a` dan `${id}-b` di bawah, dua tali `${id}-ga` dan `${id}-gb`.
 * Isi `?` ditulis merah. Teks isi `${id}-tu`, `${id}-ta`, `${id}-tb`.
 */
export function bulatUtuh(id: string, ux: number, uy: number, utuh: string, a: string, b: string, lebar = 46, r = 16, turun = 50, u = 14): Obj[] {
  const pa: Titik = { x: f(ux - lebar), y: uy + turun };
  const pb: Titik = { x: f(ux + lebar), y: uy + turun };
  const isi = (s: string) => (s === "?" ? W.merah : W.biru);
  return [
    gs(`${id}-ga`, ux, uy + r, pa.x, f(pa.y - r), W.biru, 2),
    gs(`${id}-gb`, ux, uy + r, pb.x, f(pb.y - r), W.biru, 2),
    bulat(`${id}-u`, ux, uy, r, W.emas, W.biru, { tebal: 2 }),
    bulat(`${id}-a`, pa.x, pa.y, r, W.langit, W.biru, { tebal: 2 }),
    bulat(`${id}-b`, pb.x, pb.y, r, W.pink, W.biru, { tebal: 2 }),
    teks(`${id}-tu`, ux, f(uy + u * 0.36), utuh, u, isi(utuh), { z: 1 }),
    teks(`${id}-ta`, pa.x, f(pa.y + u * 0.36), a, u, isi(a), { z: 1 }),
    teks(`${id}-tb`, pb.x, f(pb.y + u * 0.36), b, u, isi(b), { z: 1 }),
  ];
}
export const idBulatUtuh = (id: string): string[] => [`${id}-ga`, `${id}-gb`, `${id}-u`, `${id}-a`, `${id}-b`, `${id}-tu`, `${id}-ta`, `${id}-tb`];

/** Batang bilangan mendatar: kotak `${id}` selebar n * satuan dari x, tinggi 16, dan angka `${id}-n` di tengahnya (bila `angka`). */
export const batang = (id: string, x: number, y: number, n: number, satuan: number, warna: string, angka = true): Obj[] => [
  kotak(id, x, y, f(n * satuan), 16, warna, W.biru, { rx: 2, tebal: 1.6 }),
  ...(angka ? [teks(`${id}-n`, f(x + (n * satuan) / 2), f(y + 12.5), String(n), 10.5, W.biru, { z: 1 })] : []),
];
export const idBatang = (id: string, angka = true): string[] => [id, ...(angka ? [`${id}-n`] : [])];

/** Kalimat hitungan: n teks `${id}0`..`${id}{n-1}` berpusat di x, jarak `jarak`. Tanda + - = ditulis merah. */
export function kalimat(id: string, x: number, y: number, isi: string[], u = 16, jarak = 26): Obj[] {
  const x0 = x - ((isi.length - 1) * jarak) / 2;
  return isi.map((s, i) => teks(`${id}${i}`, f(x0 + i * jarak), y, s, u, ["+", "−", "="].includes(s) ? W.merah : W.biru));
}
export const idKalimat = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => `${id}${i}`);
