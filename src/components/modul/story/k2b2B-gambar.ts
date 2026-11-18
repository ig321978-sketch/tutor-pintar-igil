import type { Obj } from "./logika-story";
import { W, bulat, emo, garis, kotak, teks } from "./k1b4a-gambar";

/**
 * Gambar khusus Story Kelas 2 Bab 2 Sub-Bab B "Rak Seragam Diserbu" (pengurangan sampai dua puluh), tengah cerita Toko Seragam dan Alat Tulis Sekolah.
 * Rupa koperasi sekolah: lantai keramik, rak seragam kayu, topi dan dasi merah putih, penggaris, kotak pensil warna, papan gabus dengan kartu stok berpaku,
 * meja kasir, jam dinding, poster tua, jalur bilangan, tabel puluhan dan satuan, serta tokoh Chacha, Dika, Nia (bertopi), Bu Sari (bercelemek), dan Bu Rina (berpeluit).
 */

export { W, bulat, emo, garis, judul, kartu, kotak, teks } from "./k1b4a-gambar";

export const E = {
  chacha: "\u{1F467}",
  dika: "\u{1F913}",
  nia: "\u{1F467}",
  topi: "\u{1F9E2}",
  sari: "\u{1F469}",
  rina: "\u{1F469}",
  anak: "\u{1F9D2}",
  baju: "\u{1F455}",
  tanya: "\u{2753}",
  salah: "\u{274C}",
  benar: "\u{2705}",
  lampu: "\u{1F4A1}",
  kaget: "\u{1F62E}",
  cekikik: "\u{1F92D}",
  pesta: "\u{1F389}",
  lambai: "\u{1F44B}",
  sedih: "\u{1F622}",
  mata: "\u{1F440}",
  senyum: "\u{1F60A}",
  pikir: "\u{1F914}",
  kaca: "\u{1F50D}",
  jempol: "\u{1F44D}",
  jari: "\u{261D}\u{FE0F}",
  kertas: "\u{1F4C4}",
  tukar: "\u{1F504}",
} as const;

/** Warna koperasi: lantai keramik, kayu rak, gabus, topi dan dasi merah putih, penggaris kuning, kotak pensil biru, puluhan (biru muda) dan satuan (merah muda). */
export const WK = {
  lantai: "#E0F2FE",
  kayu: "#D6A15E",
  kayuMuda: "#EBC48C",
  gabus: "#C69C6D",
  merah: "#DC2626",
  merahMuda: "#F87171",
  penggaris: "#FDE68A",
  pensil: "#38BDF8",
  puluhan: "#BFDBFE",
  satuan: "#FBCFE8",
  kertas: "#FFFBEB",
  celemek: "#FDA4AF",
  logam: "#CBD5E1",
  hijau: "#16A34A",
  poster: "#F5E6C4",
} as const;

export type Titik = { x: number; y: number };
const f = (n: number): number => Number(n.toFixed(1));

/** Lantai keramik `${id}`: dari tinggi y sampai bawah kanvas. */
export const lantai = (id: string, y = 150): Obj => kotak(id, 2, y, 296, 198 - y, WK.lantai, "#7DD3FC", { rx: 4, tebal: 1.5, z: -3 });

/** Garis dan panah dengan ujung ditulis mutlak (disimpan relatif). */
export const gs = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Partial<Obj> = {}): Obj => garis(id, x, y, f(x2 - x), f(y2 - y), warna, tebal, o);
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.merah, o: Partial<Obj> = {}): Obj => ({ id, t: "panah", x, y, x2: f(x2 - x), y2: f(y2 - y), warna, tebal: 3, ...o });

/** Rak seragam kayu: papan belakang `${id}`, dua papan rak `${id}-a` dan `${id}-b`. Pojok kiri-atas (x, y). */
export const rak = (id: string, x: number, y: number, w: number, h: number): Obj[] => [
  kotak(id, x, y, w, h, WK.kayuMuda, W.coklat, { rx: 3, tebal: 2.2, z: -2 }),
  kotak(`${id}-a`, x, f(y + h / 3), w, 4, WK.kayu, W.coklat, { rx: 1, tebal: 1.2, z: -1 }),
  kotak(`${id}-b`, x, f(y + (2 * h) / 3), w, 4, WK.kayu, W.coklat, { rx: 1, tebal: 1.2, z: -1 }),
];
export const idRak = (id: string): string[] => [id, `${id}-a`, `${id}-b`];

/** Topi merah putih berpusat (cx, cy): kubah `${id}` dan pinggiran putih `${id}-b`. */
export const topiMP = (id: string, cx: number, cy: number, r = 5.5, o: Partial<Obj> = {}): Obj[] => [
  bulat(id, cx, cy, r, WK.merah, "#7F1D1D", { tebal: 1, ...o }),
  kotak(`${id}-b`, f(cx - r - 1.5), f(cy + r * 0.45), f(2 * r + 3), 3, W.putih, "#7F1D1D", { rx: 1, tebal: 0.8, z: 1, ...o }),
];
export const idTopi = (id: string): string[] => [id, `${id}-b`];

/** Dasi merah berpusat (cx, cy): `${id}` (jalur). */
export const dasi = (id: string, cx: number, cy: number, o: Partial<Obj> = {}): Obj => ({
  id,
  t: "jalur",
  x: cx,
  y: cy,
  d: "M-2.5 -7 L2.5 -7 L4.5 6 L0 10 L-4.5 6 Z",
  warna: WK.merahMuda,
  garis: "#7F1D1D",
  tebal: 1,
  ...o,
});

/** Penggaris kuning: badan `${id}` dan tiga garis ukur `${id}-s{i}`. Pojok kiri-atas (x, y). */
export const penggaris = (id: string, x: number, y: number, w = 36, h = 7, o: Partial<Obj> = {}): Obj[] => [
  kotak(id, x, y, w, h, WK.penggaris, W.coklat, { rx: 1, tebal: 1, ...o }),
  ...[0, 1, 2].map((i) => gs(`${id}-s${i}`, f(x + w * (0.25 + i * 0.25)), y, f(x + w * (0.25 + i * 0.25)), f(y + 3), W.coklat, 0.7, { z: 1, ...o })),
];
export const idPenggaris = (id: string): string[] => [id, ...[0, 1, 2].map((i) => `${id}-s${i}`)];

/** Kotak pensil warna berpusat (cx, cy): kotak `${id}`, tutup `${id}-u`, tiga pensil `${id}-p{i}`. */
export const kotakPensil = (id: string, cx: number, cy: number, o: Partial<Obj> = {}): Obj[] => [
  kotak(id, f(cx - 14), f(cy - 5), 28, 14, WK.pensil, W.biru, { rx: 3, tebal: 1.4, ...o }),
  kotak(`${id}-u`, f(cx - 14), f(cy - 5), 28, 4, W.putih, W.biru, { rx: 2, tebal: 1, z: 1, ...o }),
  ...["#F87171", "#FACC15", "#4ADE80"].map((w, i) => kotak(`${id}-p${i}`, f(cx - 9 + i * 7), f(cy - 11), 4, 8, w, W.coklat, { rx: 1, tebal: 0.8, z: -1, ...o })),
];
export const idKotakPensil = (id: string): string[] => [id, `${id}-u`, ...[0, 1, 2].map((i) => `${id}-p${i}`)];

/** Papan gabus `${id}` bertepi kayu. */
export const papanGabus = (id: string, x: number, y: number, w: number, h: number): Obj => kotak(id, x, y, w, h, WK.gabus, W.coklat, { rx: 3, tebal: 3, z: -2 });

/** Kartu stok berpaku: kartu `${id}`, paku `${id}-q`, teks `${id}-t0..`. Pojok kiri-atas (x, y). */
export function kartuStok(id: string, x: number, y: number, w: number, h: number, baris: string[], u = 8.4): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 2)) / 2 + u * 0.35 + 2;
  return [
    kotak(id, x, y, w, h, WK.kertas, W.coklat, { rx: 2, tebal: 1.2, z: 0 }),
    bulat(`${id}-q`, f(x + w / 2), f(y + 2.5), 1.8, W.merah, "#7F1D1D", { tebal: 0.6, z: 2 }),
    ...baris.map((b, i) => teks(`${id}-t${i}`, f(x + w / 2), f(mulai + i * (u + 2)), b, u, W.biru, { z: 1 })),
  ];
}
export const idKartuStok = (id: string, n = 1): string[] => [id, `${id}-q`, ...Array.from({ length: n }, (_, i) => `${id}-t${i}`)];

/** Jam dinding berpusat (cx, cy): wajah `${id}`, jarum pendek `${id}-j`, jarum panjang `${id}-m`. */
export const jam = (id: string, cx: number, cy: number, r = 11): Obj[] => [
  bulat(id, cx, cy, r, W.putih, W.coklat, { tebal: 2 }),
  gs(`${id}-j`, cx, cy, cx, f(cy - r * 0.55), W.biru, 1.6, { z: 1 }),
  gs(`${id}-m`, cx, cy, f(cx + r * 0.6), cy, W.merah, 1.2, { z: 1 }),
];
export const idJam = (id: string): string[] => [id, `${id}-j`, `${id}-m`];

/** Meja kasir koperasi: badan `${id}-b`, papan atas `${id}-t`, mesin kasir `${id}-m`. Pojok kiri-atas papan (x, y). */
export const mejaKasir = (id: string, x: number, y: number, w: number): Obj[] => [
  kotak(`${id}-b`, x, f(y + 10), w, 34, WK.kayu, W.coklat, { rx: 3, tebal: 2, z: -1 }),
  kotak(`${id}-t`, f(x - 4), y, f(w + 8), 10, WK.kayuMuda, W.coklat, { rx: 3, tebal: 1.8, z: 0 }),
  kotak(`${id}-m`, f(x + w - 30), f(y - 16), 24, 16, WK.logam, W.biru, { rx: 3, tebal: 1.6, z: -1 }),
];
export const idMeja = (id: string): string[] => ["b", "t", "m"].map((s) => `${id}-${s}`);

/** Poster tua bergulung sudut: kertas `${id}` dan lipatan `${id}-l`. Pojok kiri-atas (x, y). */
export const poster = (id: string, x: number, y: number, w: number, h: number): Obj[] => [
  kotak(id, x, y, w, h, WK.poster, W.coklat, { rx: 2, tebal: 1.8 }),
  kotak(`${id}-l`, f(x + w - 10), y, 10, 10, "#E7C98F", W.coklat, { rx: 1, tebal: 1, z: 1 }),
];
export const idPoster = (id: string): string[] => [id, `${id}-l`];

/** Tokoh berdiri: wajah `${id}` dan nama `${id}-n` di bawahnya (y adalah garis dasar wajah). */
export const tokoh = (id: string, x: number, y: number, e: string, nama: string, u = 30): Obj[] => [emo(id, x, y, e, u), teks(`${id}-n`, x, f(y + 13), nama, 8.4, W.ungu)];
export const idTokoh = (id: string): string[] => [id, `${id}-n`];

/** Nia bertopi: wajah `${id}`, topi `${id}-tp`, nama `${id}-n`. */
export const nia = (id: string, x: number, y: number): Obj[] => [emo(id, x, y, E.nia, 30), emo(`${id}-tp`, x, f(y - 13), E.topi, 15), teks(`${id}-n`, x, f(y + 13), "Nia", 8.4, W.ungu)];
export const idNia = (id: string): string[] => [id, `${id}-tp`, `${id}-n`];

/** Bu Sari bercelemek: wajah `${id}`, celemek `${id}-c`, nama `${id}-n`. */
export const buSari = (id: string, x: number, y: number): Obj[] => [emo(id, x, y, E.sari, 30), kotak(`${id}-c`, f(x - 8), f(y + 3), 16, 8, WK.celemek, W.merah, { rx: 2, tebal: 1, z: 1 }), teks(`${id}-n`, x, f(y + 20), "Bu Sari", 8.4, W.ungu)];
export const idSari = (id: string): string[] => [id, `${id}-c`, `${id}-n`];

/** Bu Rina berpeluit: wajah `${id}`, peluit `${id}-p` dan talinya `${id}-q`, nama `${id}-n`. */
export const buRina = (id: string, x: number, y: number): Obj[] => [
  emo(id, x, y, E.rina, 30),
  bulat(`${id}-p`, f(x + 8), f(y + 6), 3.2, W.emas, W.coklat, { tebal: 1, z: 2 }),
  gs(`${id}-q`, f(x + 8), f(y + 6), f(x - 2), f(y - 8), W.coklat, 0.8, { z: 2 }),
  teks(`${id}-n`, x, f(y + 13), "Bu Rina", 8.4, W.ungu),
];
export const idRina = (id: string): string[] => [id, `${id}-p`, `${id}-q`, `${id}-n`];

/** Titik x ke-i dari satu baris n benda yang berpusat di cx, berjarak `jarak`. */
export const xBaris = (cx: number, n: number, i: number, jarak: number): number => f(cx - ((n - 1) * jarak) / 2 + i * jarak);

/** Batang puluhan (sepuluh ruas) tegak: badan `${id}`, sekat `${id}-s{i}`. Pojok kiri-atas (x, y), tinggi h. */
export const batangPuluhan = (id: string, x: number, y: number, h = 60, w = 10): Obj[] => [
  kotak(id, x, y, w, h, "#F59E0B", W.coklat, { rx: 1.5, tebal: 1.4 }),
  ...Array.from({ length: 9 }, (_, i) => gs(`${id}-s${i}`, x, f(y + (h * (i + 1)) / 10), f(x + w), f(y + (h * (i + 1)) / 10), W.coklat, 0.8, { z: 1 })),
];
export const idBatang = (id: string): string[] => [id, ...Array.from({ length: 9 }, (_, i) => `${id}-s${i}`)];
/** Kubus satuan bersisi `s`: pojok kiri-atas (x, y). */
export const kubus = (id: string, x: number, y: number, s = 9, warna: string = "#FB7185", o: Partial<Obj> = {}): Obj => kotak(id, x, y, s, s, warna, W.coklat, { rx: 1, tebal: 1.2, ...o });

/** Tabel puluhan dan satuan: kepala `${id}-hp`/`${id}-hs`, isi `${id}-vp`/`${id}-vs` (teks `...t`). Pojok kiri-atas (x, y), tiap kolom selebar w. */
export function tabelPS(id: string, x: number, y: number, isiP: string, isiS: string, w = 46, h = 22): Obj[] {
  const sel = (sid: string, sx: number, sy: number, warna: string, isi: string, u: number, sw = w, sh = h): Obj[] => [
    kotak(sid, sx, sy, sw, sh, warna, W.biru, { rx: 2, tebal: 1.6 }),
    ...(isi === "" ? [] : [teks(`${sid}t`, f(sx + sw / 2), f(sy + sh / 2 + u * 0.36), isi, u, W.biru, { z: 1 })]),
  ];
  return [...sel(`${id}-hp`, x, y, WK.puluhan, "Puluhan", 8, w, 16), ...sel(`${id}-hs`, f(x + w), y, WK.satuan, "Satuan", 8, w, 16), ...sel(`${id}-vp`, x, f(y + 16), W.putih, isiP, 15, w, h), ...sel(`${id}-vs`, f(x + w), f(y + 16), W.putih, isiS, 15, w, h)];
}
/** Isi satu sel tabel puluhan dan satuan: teks `${id}-vpt` (kolom "p") atau `${id}-vst` (kolom "s"). Letak sama dengan tabelPS. */
export const isiTabelPS = (id: string, x: number, y: number, kolom: "p" | "s", isi: string, w = 46, h = 22): Obj =>
  teks(`${id}-v${kolom}t`, f(x + (kolom === "p" ? 0 : w) + w / 2), f(y + 16 + h / 2 + 15 * 0.36), isi, 15, W.biru, { z: 1 });
export const idTabelPS = (id: string, adaP = true, adaS = true): string[] => [`${id}-hp`, `${id}-hpt`, `${id}-hs`, `${id}-hst`, `${id}-vp`, ...(adaP ? [`${id}-vpt`] : []), `${id}-vs`, ...(adaS ? [`${id}-vst`] : [])];

/** Jalur bilangan mendatar dari bilangan `dari` sampai `sampai`: garis `${id}-g`, titik `${id}-q{n}`, angka `${id}-l{n}` (angka di bawah garis). x0 dan x1 = letak bilangan pertama dan terakhir. */
export function jalurBilangan(id: string, y: number, dari: number, sampai: number, x0: number, x1: number): Obj[] {
  const n = sampai - dari;
  const xn = (b: number): number => f(x0 + ((x1 - x0) * (b - dari)) / n);
  return [
    gs(`${id}-g`, f(x0 - 12), y, f(x1 + 12), y, W.biru, 2),
    ...Array.from({ length: n + 1 }, (_, i) => bulat(`${id}-q${dari + i}`, xn(dari + i), y, 3, W.putih, W.biru, { tebal: 1.4, z: 1 })),
    ...Array.from({ length: n + 1 }, (_, i) => teks(`${id}-l${dari + i}`, xn(dari + i), f(y + 15), String(dari + i), 9.6, W.biru)),
  ];
}
export const idJalur = (id: string, dari: number, sampai: number): string[] => [`${id}-g`, ...Array.from({ length: sampai - dari + 1 }, (_, i) => [`${id}-q${dari + i}`, `${id}-l${dari + i}`]).flat()];

/**
 * Tabel puluhan dan satuan bersusun dengan baris `baris` (pasangan [puluhan, satuan], "" = kosong): kepala `${id}-hp`/`${id}-hs`,
 * sel `${id}-r{r}p`/`${id}-r{r}s` (isi `...t`), tanda `${id}-op` di kiri baris ke-2. Pojok kiri-atas (x, y), tiap kolom selebar w, tiap baris setinggi h.
 */
export function tabelSusun(id: string, x: number, y: number, baris: [string, string][], operator = "−", w = 46, h = 20): Obj[] {
  const out: Obj[] = [kotak(`${id}-hp`, x, y, w, 16, WK.puluhan, W.biru, { rx: 2, tebal: 1.6 }), teks(`${id}-hpt`, f(x + w / 2), f(y + 11.5), "Puluhan", 8, W.biru, { z: 1 }), kotak(`${id}-hs`, f(x + w), y, w, 16, WK.satuan, W.biru, { rx: 2, tebal: 1.6 }), teks(`${id}-hst`, f(x + w * 1.5), f(y + 11.5), "Satuan", 8, W.biru, { z: 1 })];
  baris.forEach(([p, s], r) => {
    const yy = f(y + 16 + r * h);
    out.push(kotak(`${id}-r${r}p`, x, yy, w, h, W.putih, W.biru, { rx: 2, tebal: 1.6 }), kotak(`${id}-r${r}s`, f(x + w), yy, w, h, W.putih, W.biru, { rx: 2, tebal: 1.6 }));
    if (p !== "") out.push(teks(`${id}-r${r}pt`, f(x + w / 2), f(yy + h / 2 + 5.4), p, 15, W.biru, { z: 1 }));
    if (s !== "") out.push(teks(`${id}-r${r}st`, f(x + w * 1.5), f(yy + h / 2 + 5.4), s, 15, W.biru, { z: 1 }));
  });
  if (operator !== "") out.push(teks(`${id}-op`, f(x - 10), f(y + 16 + h * 1.5 + 6), operator, 16, W.merah));
  return out;
}
/** Isi satu sel tabelSusun (baris r, kolom "p" atau "s"). */
export const isiSusun = (id: string, x: number, y: number, r: number, kolom: "p" | "s", isi: string, w = 46, h = 20, warna: string = W.biru): Obj =>
  teks(`${id}-r${r}${kolom}t`, f(x + (kolom === "p" ? 0.5 : 1.5) * w), f(y + 16 + r * h + h / 2 + 5.4), isi, 15, warna, { z: 1 });
