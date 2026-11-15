import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 2 Bab 1 Sub-Bab B (nilai tempat):
 * kubus satuan, batang puluhan, tabel nilai tempat (besar dan kecil), kartu bilangan, dan garis bilangan puluhan.
 * Berkas ini TIDAK dipakai bab lain.
 *
 * Kesepakatan id (dipakai uji hitung ulang):
 * - Kubus satuan kelompok `{huruf}`: kubus ke-i `bs{huruf}{i}` (kotak 10 x 10). Batang puluhan: `bp{huruf}{i}` (kotak 100 x 10) dan garis sekatnya `bq{huruf}{i}`.
 * - Angka hitungan satu per satu di atas kubus: `bs{huruf}n{i}`. Angka loncat sepuluh di samping batang: `pl-{huruf}{i}` (nilai (i + 1) kali sepuluh).
 * - Label bilangan kelompok `n-{huruf}` (nilai = 10 kali batang ditambah kubus kelompok itu).
 * - Tabel nilai tempat `t{huruf}`: kepala `t{huruf}-hp` (Puluhan) dan `t{huruf}-hs` (Satuan); angka kolom `t{huruf}-p` dan `t{huruf}-s`;
 *   nilai angka `t{huruf}-vp` dan `t{huruf}-vs`; bilangan `t{huruf}-n`. Banyak batang dan kubus kelompok `{huruf}` harus sama dengan angka kolomnya.
 * - Garis bilangan `gb`: titik bilangan `gb-q{n}`, label `gb-l{n}`, loncatan puluhan `gb-hp{i}`, loncatan satuan `gb-hs{i}`, penanda `gb-tanda`.
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#16A34A",
  putih: "#FFFFFF",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  pink: "#FBCFE8",
  lavender: "#EDE9FE",
  oranye: "#FBA919",
  biruKubus: "#93C5FD",
};

export const OWL = "\u{1F989}";

type Opsi = Partial<Obj>;
export type Titik = { x: number; y: number };

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Kartu angka atau kata besar: pojok kiri-atas (x, y); id `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, isi: string, warna: string = W.krem, w = 40, h = 36, u = 22, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.6, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, isi, u, W.merah, o),
];

/* ------------------------------ Kubus satuan dan batang puluhan ------------------------------ */

export const KUBUS = 10;
export const BATANG_P = 100;
export const BATANG_T = 10;
const SEKAT = Array.from({ length: 9 }, (_, i) => `M${(i + 1) * 10} 0 L${(i + 1) * 10} ${BATANG_T}`).join(" ");

/** Satu kubus satuan, pojok kiri-atas (x, y). */
export const kubus = (k: string, i: number, x: number, y: number, o: Opsi = {}): Obj => kotak(`bs${k}${i}`, x, y, KUBUS, KUBUS, W.biruKubus, W.biru, { rx: 1.5, tebal: 1.2, ...o });

/** Satu batang puluhan (sepuluh ruas), pojok kiri-atas (x, y): kotak dan garis sekatnya. */
export const batang = (k: string, i: number, x: number, y: number): Obj[] => [
  kotak(`bp${k}${i}`, x, y, BATANG_P, BATANG_T, W.oranye, W.biru, { rx: 1.5, tebal: 1.2 }),
  { id: `bq${k}${i}`, t: "jalur", x, y, d: SEKAT, garis: W.biru, tebal: 0.8 },
];

/** Id benda batang ke-i (kotak dan sekat). */
export const idBatang = (k: string, i: number): string[] => [`bp${k}${i}`, `bq${k}${i}`];

/** Titik pojok kubus ke-j pada kisi `perBaris` kolom dari (x0, y0), jarak d. */
export const titikKisi = (j: number, x0: number, y0: number, perBaris = 10, d = 12): Titik => ({ x: x0 + (j % perBaris) * d, y: y0 + Math.floor(j / perBaris) * d });

/** Kubus dari nomor `dari` sampai `sampai` (termasuk) pada kisi. */
export const kubusKisi = (k: string, dari: number, sampai: number, x0: number, y0: number, perBaris = 10, d = 12): Obj[] =>
  Array.from({ length: sampai - dari + 1 }, (_, q) => {
    const p = titikKisi(dari + q, x0, y0, perBaris, d);
    return kubus(k, dari + q, p.x, p.y);
  });

/** Titik pusat kubus (untuk angka hitungan di atasnya). */
export const pusatKubus = (pts: Titik[]): Titik[] => pts.map((p) => ({ x: p.x + KUBUS / 2, y: p.y + KUBUS / 2 }));

/** Label bilangan kelompok: id `n-{huruf}`. */
export const labelN = (k: string, x: number, y: number, isi: string, u = 16): Obj => teks(`n-${k}`, x, y, isi, u, W.merah);

/** Kartu pilihan tersusun ke bawah (id c1..cn): lebar 220, tinggi 24, jarak 4, mulai tinggi `y`. */
export const pilihBaris = (y: number, isi: string[], u = 10.4): Obj[] => isi.flatMap((t, i) => kartuAngka(`c${i + 1}`, 40, y + i * 28, t, [W.hijauMuda, W.pink, W.langit][i], 220, 24, u));

/* ------------------------------ Tabel nilai tempat ------------------------------ */

export type GeoT = { x: number; y: number; w: number; hh: number; bh: number; dh: number };

/** Tabel besar: kepala 20, badan 78 (batang di kiri, kubus di kanan), baris angka 36. */
export const TABEL_BESAR: GeoT = { x: 30, y: 26, w: 240, hh: 20, bh: 78, dh: 36 };
/** Tabel besar tanpa baris nilai (untuk adegan latihan): baris angka 26. */
export const TABEL_LATIHAN: GeoT = { x: 30, y: 24, w: 240, hh: 18, bh: 78, dh: 26 };
/** Tabel kecil tanpa badan gambar: kepala 16 dan baris angka 26. */
export const TABEL_KECIL: GeoT = { x: 40, y: 118, w: 220, hh: 16, bh: 0, dh: 26 };

const tengahP = (g: GeoT) => g.x + g.w / 4;
const tengahS = (g: GeoT) => g.x + (g.w * 3) / 4;

/** Kerangka tabel nilai tempat huruf `k`: sel kepala (Puluhan, Satuan), badan (bila ada) dan sel angka kosong. */
export function tabelNT(k: string, g: GeoT): Obj[] {
  const out: Obj[] = [];
  const kol = g.w / 2;
  const sel = (id: string, x: number, y: number, h: number, warna: string) => out.push(kotak(id, x, y, kol, h, warna, W.biru, { rx: 2, tebal: 1.3 }));
  sel(`t${k}-hk`, g.x, g.y, g.hh, W.lavender);
  sel(`t${k}-hk2`, g.x + kol, g.y, g.hh, W.lavender);
  out.push(teks(`t${k}-hp`, tengahP(g), g.y + g.hh / 2 + 3.4, "Puluhan", 9.6, W.biru), teks(`t${k}-hs`, tengahS(g), g.y + g.hh / 2 + 3.4, "Satuan", 9.6, W.biru));
  if (g.bh > 0) {
    sel(`t${k}-bk`, g.x, g.y + g.hh, g.bh, W.putih);
    sel(`t${k}-bk2`, g.x + kol, g.y + g.hh, g.bh, W.putih);
  }
  sel(`t${k}-dk`, g.x, g.y + g.hh + g.bh, g.dh, W.krem);
  sel(`t${k}-dk2`, g.x + kol, g.y + g.hh + g.bh, g.dh, W.krem);
  return out;
}

/** Titik pojok batang ke-i di badan tabel besar. */
export const titikBatangTabel = (g: GeoT, i: number): Titik => ({ x: g.x + 10, y: g.y + g.hh + 4 + i * 15 });
/** Titik pojok kubus ke-j di badan tabel besar (lima per baris). */
export const titikKubusTabel = (g: GeoT, j: number): Titik => ({ x: g.x + g.w / 2 + 25 + (j % 5) * 14, y: g.y + g.hh + 8 + Math.floor(j / 5) * 14 });

/** Angka kolom puluhan (`t{k}-p`) dan satuan (`t{k}-s`). Untuk tabel dengan baris nilai, angka naik supaya nilai muat di bawahnya. */
export const angkaP = (k: string, g: GeoT, isi: string): Obj => teks(`t${k}-p`, tengahP(g), g.y + g.hh + g.bh + (g.dh > 30 ? 17 : g.dh / 2 + 5.5), isi, g.dh > 30 ? 16 : 16, W.merah);
export const angkaS = (k: string, g: GeoT, isi: string): Obj => teks(`t${k}-s`, tengahS(g), g.y + g.hh + g.bh + (g.dh > 30 ? 17 : g.dh / 2 + 5.5), isi, 16, W.merah);
/** Nilai angka (di bawah angka kolom, hanya tabel dengan baris nilai tinggi): `t{k}-vp`, `t{k}-vs`. */
export const nilaiP = (k: string, g: GeoT, isi: string): Obj => teks(`t${k}-vp`, tengahP(g), g.y + g.hh + g.bh + g.dh - 4, isi, 9, W.hijau);
export const nilaiS = (k: string, g: GeoT, isi: string): Obj => teks(`t${k}-vs`, tengahS(g), g.y + g.hh + g.bh + g.dh - 4, isi, 9, W.hijau);
/** Bilangan yang terbentuk, di bawah tabel: `t{k}-n`. */
export const bilanganT = (k: string, g: GeoT, isi: string, u = 20): Obj => teks(`t${k}-n`, g.x + g.w / 2, g.y + g.hh + g.bh + g.dh + u + 4, isi, u, W.merah);

/** Batang dan kubus kelompok `k` di tabel besar: `p` batang dan `s` kubus (s paling banyak sepuluh), mulai dari nomor tertentu. */
export const isiTabel = (k: string, g: GeoT, p: number, s: number): Obj[] => [
  ...Array.from({ length: p }, (_, i) => batang(k, i, titikBatangTabel(g, i).x, titikBatangTabel(g, i).y)).flat(),
  ...Array.from({ length: s }, (_, j) => kubus(k, j, titikKubusTabel(g, j).x, titikKubusTabel(g, j).y)),
];

/* ------------------------------ Tata letak "papan": kubus di kisi kiri, batang di kanan ------------------------------ */

export const PAPAN = { xk: 14, yk: 48, d: 12, xb: 170, yb: 48, db: 14 };
/** Titik pojok kubus ke-j di kisi kiri (sepuluh per baris). */
export const titikKubusPapan = (j: number): Titik => titikKisi(j, PAPAN.xk, PAPAN.yk, 10, PAPAN.d);
/** Titik pojok batang ke-i di kanan. */
export const titikBatangPapan = (i: number): Titik => ({ x: PAPAN.xb, y: PAPAN.yb + i * PAPAN.db });
/** Kubus nomor `dari` sampai `sampai` di kisi kiri papan. */
export const kubusPapan = (k: string, dari: number, sampai: number): Obj[] => kubusKisi(k, dari, sampai, PAPAN.xk, PAPAN.yk, 10, PAPAN.d);
/** Batang ke-i di papan. */
export const batangPapan = (k: string, i: number): Obj[] => batang(k, i, titikBatangPapan(i).x, titikBatangPapan(i).y);

/** Keterangan kecil di bawah: batang sama dengan sepuluh kubus (memuat angka sepuluh). */
export const legenda = (y = 196): Obj[] => [teks("lg", 150, y, "1 batang: 10 kubus", 8.4, W.ungu)];

/* ------------------------------ Garis bilangan puluhan ------------------------------ */

/** Garis bilangan 0 sampai 50: x = 20 + 5,2 kali bilangan, tinggi garis y. */
export const GB = { x0: 20, dx: 5.2, y: 96 };
export const xGB = (n: number): number => GB.x0 + GB.dx * n;
/** Garis bilangan kecil (satuan) sepuluh bilangan dari `dasar`: x = 30 + 24 kali selisih dari `dasar`. */
export const GK = { x0: 30, dx: 24, y: 168 };
export const xGK = (n: number, dasar = 30): number => GK.x0 + GK.dx * (n - dasar);
