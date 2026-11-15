import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 2 Bab 7 Sub-Bab A (Menghitung, Membaca, dan Menulis Bilangan sampai 100).
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Kesepakatan id (dipakai uji hitung ulang dari struktur adegan, bukan dari kata):
 * - KELOMPOK BENDA `${g}`: wadah (bungkus, keranjang, kantong, atau batang puluhan) ke-i `${g}-w${i}` (bungkus berlabel "10" di `${g}-wt${i}`),
 *   satuan lepas ke-j `${g}-s${j}`. Banyak benda = wadah x sepuluh + lepas. Hitungan di bawah wadah ke-i: `${g}-n${i}` (isi 10 x i).
 * - Papan nilai tempat: `nt-hp`, `nt-hs` (judul), `nt-pk`, `nt-sk` (kotak), angka `nt-p` (puluhan) dan `nt-s` (satuan).
 * - Kartu bilangan `${id}` : lambang `${id}-a` dan nama `${id}-b` (nama harus cocok dengan lambang); `${id}-x` tanda salah, `${id}-ok` tanda benar.
 * - Pasangan bilangan: `ps-a` (utuh), `ps-b` (puluhan), `ps-c` (satuan), `ps-e` (jumlah).
 * - Tebakan: `tb${i}-a` (tebakan), `tb${i}-nm` (nama), `tb-r` (banyak sebenarnya), `tb${i}-d` (selisih), `tb${i}-ok` (tanda lebih dekat).
 * - Tabel seratus: sel baris r kolom c: kotak `th-${r}-${c}-k`, angka `th-${r}-${c}` (isi 10 x (r-1) + c); panah `th-p`.
 * - Garis hitung (deret): kotak `gh-k${i}`, angka `gh-n${i}` (selisih tetap; "?" menandai bilangan yang ditanyakan).
 * - Tanya jawab: `tanya`, kartu `c1..c3` (`c${i}-k` dan `c${i}-t`).
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#16A34A",
  putih: "#FFFFFF",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  coklat: "#92400E",
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  pink: "#FBCFE8",
  lavender: "#EDE9FE",
  oranye: "#FBA919",
};
export const OWL = "\u{1F989}";

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.merah, tebal = 2.6, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Kartu pilihan jawaban: pojok kiri-atas (x, y); id `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, isi: string, warna: string = W.krem, w = 40, h = 36, u = 22, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.6, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, isi, u, W.merah, o),
];

/* ------------------------------ Anak (tokoh tetap) ------------------------------ */
export const NAMA_ANAK: Record<string, string> = { malosi: "Malosi", kira: "Kira", upe: "Upe", wei: "Wei", halim: "Halim", igil: "Igil" };
export const WARNA_ANAK: Record<string, string> = { malosi: "#FCA5A5", kira: "#FDE68A", upe: "#BBF7D0", wei: "#BFDBFE", halim: "#DDD6FE", igil: "#FBCFE8" };
/** Anak berupa kepala bulat berpusat di (cx, cy), badan, dan nama. Id `an-${slug}`, `an-${slug}-bd`, `an-${slug}-lb`. */
export function anak(slug: string, cx: number, cy: number): Obj[] {
  return [
    bulat(`an-${slug}`, cx, cy, 11, WARNA_ANAK[slug], W.biru, { tebal: 1.8 }),
    kotak(`an-${slug}-bd`, cx - 10, cy + 12, 20, 18, WARNA_ANAK[slug], W.biru, { rx: 6, tebal: 1.6 }),
    teks(`an-${slug}-lb`, cx, cy + 43, NAMA_ANAK[slug], 9, W.biru),
  ];
}

/* ------------------------------ Nama bilangan ------------------------------ */
const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
/** Nama bilangan 0 sampai 100 dalam bahasa Indonesia: 53 menjadi "lima puluh tiga". */
export function kataBil(n: number): string {
  if (n === 100) return "seratus";
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 10) return SATUAN[n];
  if (n < 20) return `${SATUAN[n - 10]} belas`;
  return `${SATUAN[Math.floor(n / 10)]} puluh${n % 10 ? ` ${SATUAN[n % 10]}` : ""}`;
}

/* ------------------------------ Kelompok benda: wadah berisi sepuluh dan satuan lepas ------------------------------ */

export type Kel = {
  id: string;
  /** Banyak wadah penuh (tiap wadah berisi sepuluh). */
  w: number;
  /** Banyak satuan lepas. */
  s: number;
  /** Tepi kiri dan tepi atas deret wadah. */
  x: number;
  y: number;
  warna: string;
  warnaS: string;
  /** Satuan lepas berupa emoji (bukan bulat). */
  emoji?: string;
  /** Wadah per baris. */
  kol?: number;
  /** Jarak antarbaris wadah (beri ruang bila ada hitungan di bawah wadah). */
  dy?: number;
  /** Bungkus: kotak berlabel sepuluh. Batang: batang puluhan tinggi dan satuan kotak kecil. */
  bentuk?: "bungkus" | "batang";
};

const GEO = {
  bungkus: { bw: 26, bh: 20, dx: 32, dy: 25, ls: 12 },
  batang: { bw: 9, bh: 34, dx: 13, dy: 44, ls: 12 },
};
const geo = (k: Kel) => GEO[k.bentuk ?? "bungkus"];
export const posWadah = (k: Kel, i: number): { x: number; y: number } => {
  const g = geo(k);
  const kol = k.kol ?? 5;
  return { x: k.x + ((i - 1) % kol) * g.dx, y: k.y + Math.floor((i - 1) / kol) * (k.dy ?? g.dy) };
};
export const barisWadah = (k: Kel): number => Math.ceil(k.w / (k.kol ?? 5));
const posLepas = (k: Kel, j: number): { x: number; y: number } => {
  const g = geo(k);
  const b = barisWadah(k);
  const atas = k.y + (b > 0 ? (b - 1) * (k.dy ?? g.dy) + g.bh + 7 : 0);
  return { x: k.x + 5 + (j - 1) * g.ls, y: atas + 5 };
};
/** Banyak benda seluruhnya. */
export const jumlahKel = (k: Kel): number => k.w * 10 + k.s;

export function wadahKe(k: Kel, i: number): Obj[] {
  const g = geo(k);
  const p = posWadah(k, i);
  if (k.bentuk === "batang") return [kotak(`${k.id}-w${i}`, p.x, p.y, g.bw, g.bh, k.warna, W.biru, { rx: 2, tebal: 1.3 })];
  return [kotak(`${k.id}-w${i}`, p.x, p.y, g.bw, g.bh, k.warna, W.biru, { rx: 4, tebal: 1.4 }), teks(`${k.id}-wt${i}`, p.x + g.bw / 2, p.y + g.bh / 2 + 3, "10", 8.5, W.biru)];
}
export function lepasKe(k: Kel, j: number): Obj[] {
  const p = posLepas(k, j);
  if (k.emoji) return [teks(`${k.id}-s${j}`, p.x, p.y + 4, k.emoji, 11)];
  if (k.bentuk === "batang") return [kotak(`${k.id}-s${j}`, p.x - 4.5, p.y - 4.5, 9, 9, k.warnaS, W.biru, { rx: 1.5, tebal: 1.2 })];
  return [bulat(`${k.id}-s${j}`, p.x, p.y, 4.5, k.warnaS, W.biru, { tebal: 1.2 })];
}
/** Semua wadah (dari `dari`) atau satuan lepas, berurutan. */
export const wadahSemua = (k: Kel, dari = 1): Obj[] => Array.from({ length: Math.max(0, k.w - dari + 1) }, (_, q) => wadahKe(k, dari + q)).flat();
export const lepasSemua = (k: Kel, dari = 1): Obj[] => Array.from({ length: Math.max(0, k.s - dari + 1) }, (_, q) => lepasKe(k, dari + q)).flat();
export const kelSemua = (k: Kel): Obj[] => [...wadahSemua(k), ...lepasSemua(k)];
export const idKel = (k: Kel): string[] => kelSemua(k).map((o) => o.id);
export const idLepas = (k: Kel): string[] => lepasSemua(k).map((o) => o.id);
export const idWadah = (k: Kel): string[] => wadahSemua(k).map((o) => o.id);
/** Hitungan di bawah wadah ke-i (isi 10 x i). */
export function hitungKe(k: Kel, i: number, isi: string = String(i * 10), atas = false): Obj {
  const g = geo(k);
  const p = posWadah(k, i);
  return teks(`${k.id}-n${i}`, p.x + g.bw / 2, atas ? p.y - 4 : p.y + g.bh + 10, isi, 9, W.merah);
}

/* ------------------------------ Papan nilai tempat ------------------------------ */
/** Dua kotak: puluhan di kiri dan satuan di kanan. `y` = tepi atas judul kotak. */
export function papanNT(y: number): Obj[] {
  return [
    teks("nt-hp", 104, y + 10, "puluhan", 10, W.ungu),
    teks("nt-hs", 196, y + 10, "satuan", 10, W.ungu),
    kotak("nt-pk", 62, y + 16, 84, 40, W.hijauMuda, W.biru, { rx: 6 }),
    kotak("nt-sk", 154, y + 16, 84, 40, W.langit, W.biru, { rx: 6 }),
  ];
}
export const angkaNT = (sisi: "p" | "s", d: number, y: number): Obj => teks(`nt-${sisi}`, sisi === "p" ? 104 : 196, y + 16 + 31, String(d), 26, W.merah);

/* ------------------------------ Kartu bilangan: lambang dan nama ------------------------------ */
/** Satu baris: lambang di kiri dan nama di kanan. id `${id}`, lambang `${id}-a`, nama `${id}-b`. */
export function barisBil(id: string, y: number, n: number, warna: string = W.krem, x = 14, w = 272): Obj[] {
  return [kotak(`${id}-k`, x, y, w, 30, warna, W.biru, { rx: 8 }), teks(`${id}-a`, x + 38, y + 21, String(n), 17, W.merah), teks(`${id}-b`, x + 84, y + 20, kataBil(n), 11, W.biru, { anchor: "start" })];
}
/** Kartu bilangan bertumpuk (lambang di atas, nama di bawah): untuk dua bilangan berdampingan. */
export function tumpukBil(id: string, x: number, y: number, n: number, warna: string = W.krem, w = 128): Obj[] {
  return [kotak(`${id}-k`, x, y, w, 46, warna, W.biru, { rx: 8 }), teks(`${id}-a`, x + w / 2, y + 22, String(n), 20, W.merah), teks(`${id}-b`, x + w / 2, y + 38, kataBil(n), 9, W.biru)];
}

/* ------------------------------ Pasangan bilangan ------------------------------ */
/** Bagan: bilangan utuh di atas, puluhan dan satuan di bawah. */
export function bagan(n: number): Obj[] {
  const p = n - (n % 10);
  const s = n % 10;
  return [
    garis("ps-g1", 150, 78, -64, 32, W.biru, 2),
    garis("ps-g2", 150, 78, 64, 32, W.biru, 2),
    kotak("ps-ak", 108, 40, 84, 38, W.emas, W.biru, { rx: 8 }),
    teks("ps-a", 150, 67, String(n), 24, W.biru),
    kotak("ps-bk", 40, 110, 84, 38, W.hijauMuda, W.biru, { rx: 8 }),
    teks("ps-b", 82, 137, String(p), 24, W.merah),
    kotak("ps-ck", 176, 110, 84, 38, W.langit, W.biru, { rx: 8 }),
    teks("ps-c", 218, 137, String(s), 24, W.merah),
  ];
}
export const idBagan = ["ps-g1", "ps-g2", "ps-ak", "ps-a", "ps-bk", "ps-b", "ps-ck", "ps-c", "ps-e"];

/* ------------------------------ Tebakan dan selisih ------------------------------ */
/** Kartu tebakan satu anak: nama, kotak, dan bilangan. */
export function kartuTebak(i: number, x: number, nama: string, n: number, y = 58): Obj[] {
  return [teks(`tb${i}-nm`, x + 40, y - 6, nama, 10, W.ungu), kotak(`tb${i}-k`, x, y, 80, 40, W.krem, W.biru, { rx: 8 }), teks(`tb${i}-a`, x + 40, y + 29, String(n), 26, W.merah)];
}
/** Banyak yang sebenarnya, di tengah. */
export const kartuNyata = (n: number, y = 58): Obj[] => [teks("tb-rt", 150, y - 6, "sebenarnya", 10, W.ungu), kotak("tb-rk", 110, y, 80, 40, W.emas, W.biru, { rx: 8 }), teks("tb-r", 150, y + 29, String(n), 26, W.biru)];
export const selisihTebak = (i: number, x: number, d: number, y = 118): Obj => teks(`tb${i}-d`, x + 40, y, `selisih ${d}`, 12, W.biru);
export const tandaDekat = (i: number, x: number, y = 138): Obj => teks(`tb${i}-ok`, x + 40, y, "lebih dekat", 11, W.hijau);

/* ------------------------------ Tabel seratus ------------------------------ */
const TH = { x0: 15, cw: 27, ch: 17 };
/** Kotak dan angka sel baris r kolom c (r dari 1, c dari 1 sampai 10). `yAtas` = tepi atas baris `rAwal`. */
export function selTabel(r: number, c: number, rAwal: number, yAtas: number, warna: string = W.putih): Obj[] {
  const x = TH.x0 + (c - 1) * TH.cw;
  const y = yAtas + (r - rAwal) * TH.ch;
  return [kotak(`th-${r}-${c}-k`, x, y, TH.cw, TH.ch, warna, W.abu, { rx: 1, tebal: 1 }), teks(`th-${r}-${c}`, x + TH.cw / 2, y + TH.ch / 2 + 3, String(10 * (r - 1) + c), 8.2, W.biru)];
}
/** Baris r sampai r2 tabel seratus. */
export function tabelSeratus(rAwal: number, rAkhir: number, yAtas: number): Obj[] {
  const out: Obj[] = [];
  for (let r = rAwal; r <= rAkhir; r += 1) for (let c = 1; c <= 10; c += 1) out.push(...selTabel(r, c, rAwal, yAtas));
  return out;
}
/** Pusat sel (r, c). */
export const pusatSel = (r: number, c: number, rAwal: number, yAtas: number): { x: number; y: number } => ({ x: TH.x0 + (c - 1) * TH.cw + TH.cw / 2, y: yAtas + (r - rAwal) * TH.ch + TH.ch / 2 });
export const idSel = (r: number, c: number): string[] => [`th-${r}-${c}-k`, `th-${r}-${c}`];

/* ------------------------------ Garis hitung (deret bilangan) ------------------------------ */
/** Deret kotak berisi bilangan; "?" menandai bilangan yang ditanyakan. Id `gh-k${i}` dan `gh-n${i}` (i dari 1). */
export function deretHitung(nilai: (number | "?")[], y: number, warna: string = W.krem): Obj[] {
  const n = nilai.length;
  const x0 = (300 - (n * 46 - 6)) / 2;
  return nilai.flatMap((v, i) => [kotak(`gh-k${i + 1}`, x0 + i * 46, y, 40, 32, v === "?" ? W.emas : warna, W.biru, { rx: 6 }), teks(`gh-n${i + 1}`, x0 + i * 46 + 20, y + 22, String(v), 15, W.merah)]);
}
export const idDeret = (n: number): string[] => Array.from({ length: n }, (_, i) => [`gh-k${i + 1}`, `gh-n${i + 1}`]).flat();
