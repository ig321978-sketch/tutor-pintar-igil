import type { Obj } from "./logika-story";
import { W, bulat, emo, garis, kotak, teks } from "./k1b4a-gambar";

/**
 * Gambar khusus Story Kelas 2 Bab 1 Sub-Bab B "Pesanan Kue Hari Olahraga" (puluhan dan satuan), tengah cerita Kue di Kantin Sekolah.
 * Rupa kantin: lantai krem, meja kasir kayu bermesin kasir, kertas pesanan berjepit, kotak kue isi sepuluh `${id}` (sepuluh kue kecil `${id}-d{i}`, label `${id}-l`),
 * kue lepas (emoji), kartu angka `${id}`, tabel puluhan dan satuan `${id}-hp`, `${id}-hs`, `${id}-vp`, `${id}-vs`, balok kayu panjang dan kubus kecil,
 * serta tokoh Chacha, Dika, Nia (bertopi), Bu Sari (bercelemek), dan Pak Anto (berpeluit).
 */

export { W, bulat, emo, garis, judul, kartu, kotak, teks } from "./k1b4a-gambar";

export const E = {
  chacha: "\u{1F467}",
  dika: "\u{1F913}",
  nia: "\u{1F467}",
  topi: "\u{1F9E2}",
  sari: "\u{1F469}",
  anto: "\u{1F468}",
  dewi: "\u{1F469}",
  kue: "\u{1F9C1}",
  lapis: "\u{1F370}",
  tanya: "\u{2753}",
  salah: "\u{274C}",
  benar: "\u{2705}",
  lampu: "\u{1F4A1}",
  lari: "\u{1F3C3}",
  kaget: "\u{1F62E}",
  cekikik: "\u{1F92D}",
  pesta: "\u{1F389}",
  lambai: "\u{1F44B}",
  sedih: "\u{1F622}",
  angin: "\u{1F4A8}",
  mata: "\u{1F440}",
  jempol: "\u{1F44D}",
  raba: "\u{1F450}",
  tukar: "\u{1F504}",
  jari: "\u{261D}\u{FE0F}",
  penonton: "\u{1F465}",
  senyum: "\u{1F60A}",
  kaca: "\u{1F50D}",
  pensil: "\u{270F}\u{FE0F}",
  pikir: "\u{1F914}",
} as const;

/** Warna kantin: kayu, kertas, kotak kue, kolom puluhan (biru muda) dan satuan (merah muda), balok dan kubus. */
export const WK = {
  lantai: "#FEF3C7",
  meja: "#C2884D",
  mejaAtas: "#E7B77A",
  kertas: "#FFFBEB",
  kotak: "#FDE68A",
  kue: "#F9A8D4",
  puluhan: "#BFDBFE",
  satuan: "#FBCFE8",
  balok: "#F59E0B",
  kubus: "#FB7185",
  celemek: "#FDA4AF",
  tepung: "#F8FAFC",
  logam: "#CBD5E1",
  hijau: "#16A34A",
} as const;

const f = (n: number): number => Number(n.toFixed(1));
type Ubah = Partial<Obj> & { id: string };

/** Lantai kantin `${id}`: dari tinggi y sampai bawah kanvas. */
export const lantai = (id: string, y = 150): Obj => kotak(id, 2, y, 296, 198 - y, WK.lantai, "#D6A15E", { rx: 4, tebal: 1.5, z: -3 });

/** Garis dan panah dengan ujung ditulis mutlak (disimpan relatif). */
export const gs = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Partial<Obj> = {}): Obj => garis(id, x, y, f(x2 - x), f(y2 - y), warna, tebal, o);
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.merah, o: Partial<Obj> = {}): Obj => ({ id, t: "panah", x, y, x2: f(x2 - x), y2: f(y2 - y), warna, tebal: 3, ...o });

/** Meja kasir kantin: badan `${id}-b`, papan atas `${id}-t`, mesin kasir `${id}-m` dan layarnya `${id}-g`. Pojok kiri-atas papan (x, y), lebar w. */
export const mejaKasir = (id: string, x: number, y: number, w: number): Obj[] => [
  kotak(`${id}-b`, x, f(y + 10), w, 34, WK.meja, W.coklat, { rx: 3, tebal: 2, z: -1 }),
  kotak(`${id}-t`, f(x - 4), y, f(w + 8), 10, WK.mejaAtas, W.coklat, { rx: 3, tebal: 1.8, z: 0 }),
  kotak(`${id}-m`, f(x + w - 34), f(y - 18), 26, 18, WK.logam, W.biru, { rx: 3, tebal: 1.6, z: -1 }),
  kotak(`${id}-g`, f(x + w - 30), f(y - 15), 18, 7, W.hijauMuda, W.biru, { rx: 1, tebal: 1, z: 0 }),
];
export const idMeja = (id: string): string[] => ["b", "t", "m", "g"].map((s) => `${id}-${s}`);

/** Kertas pesanan berjepit: kertas `${id}`, jepit `${id}-j`. Pojok kiri-atas (x, y). */
export const kertasPesanan = (id: string, x: number, y: number, w = 56, h = 40): Obj[] => [
  kotak(id, x, y, w, h, WK.kertas, W.coklat, { rx: 3, tebal: 1.6 }),
  kotak(`${id}-j`, f(x + w / 2 - 8), f(y - 3), 16, 6, WK.logam, W.biru, { rx: 2, tebal: 1.2, z: 1 }),
];
export const idKertas = (id: string): string[] => [id, `${id}-j`];

/** Kotak kue berisi sepuluh kue kecil, berpusat (cx, cy): kotak `${id}`, kue `${id}-d{i}`, label `${id}-l` ("10") di atasnya. */
export const kotakKue = (id: string, cx: number, cy: number, label = true): Obj[] => [
  kotak(id, f(cx - 20), f(cy - 13), 40, 26, WK.kotak, W.coklat, { rx: 3, tebal: 1.6 }),
  ...Array.from({ length: 10 }, (_, i) => bulat(`${id}-d${i}`, f(cx - 16 + (i % 5) * 8), f(cy - 5 + Math.floor(i / 5) * 10), 3, WK.kue, W.merah, { tebal: 0.8, z: 1 })),
  ...(label ? [teks(`${id}-l`, cx, f(cy - 17), "10", 8, W.coklat, { z: 2 })] : []),
];
export const idKotakKue = (id: string, label = true): string[] => [id, ...Array.from({ length: 10 }, (_, i) => `${id}-d${i}`), ...(label ? [`${id}-l`] : [])];
/** Geser kotak kue ke pusat baru (cx, cy). */
export const geserKotakKue = (id: string, cx: number, cy: number, label = true): Ubah[] => [
  { id, x: f(cx - 20), y: f(cy - 13) },
  ...Array.from({ length: 10 }, (_, i) => ({ id: `${id}-d${i}`, x: f(cx - 16 + (i % 5) * 8), y: f(cy - 5 + Math.floor(i / 5) * 10) })),
  ...(label ? [{ id: `${id}-l`, x: cx, y: f(cy - 17) }] : []),
];

/** Kue lepas: emoji kue berpusat (cx, cy). */
export const lepas = (id: string, cx: number, cy: number, u = 14, o: Partial<Obj> = {}): Obj => emo(id, cx, f(cy + u * 0.3), E.kue, u, o);

/** Kartu angka putih berisi satu angka besar, berpusat (cx, cy): kartu `${id}`, angka `${id}-a`. */
export const kartuAngka = (id: string, cx: number, cy: number, angka: string, warna: string = W.putih, o: Partial<Obj> = {}): Obj[] => [
  kotak(id, f(cx - 14), f(cy - 18), 28, 36, warna, W.biru, { rx: 4, tebal: 1.8, ...o }),
  teks(`${id}-a`, cx, f(cy + 9), angka, 26, W.biru, { z: 1, ...o }),
];
export const idKartuAngka = (id: string): string[] => [id, `${id}-a`];
export const geserKartuAngka = (id: string, cx: number, cy: number): Ubah[] => [
  { id, x: f(cx - 14), y: f(cy - 18) },
  { id: `${id}-a`, x: cx, y: f(cy + 9) },
];

/** Tabel puluhan dan satuan: kepala `${id}-hp`/`${id}-hs` (teks `...t`), isi `${id}-vp`/`${id}-vs` (teks `...t`). Pojok kiri-atas (x, y), tiap kolom selebar w. */
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

/** Balok kayu panjang (sepuluh ruas): badan `${id}`, sekat `${id}-s{i}`. Pojok kiri-atas (x, y), tinggi h. */
export const balokPanjang = (id: string, x: number, y: number, h = 60, w = 10): Obj[] => [
  kotak(id, x, y, w, h, WK.balok, W.coklat, { rx: 1.5, tebal: 1.4 }),
  ...Array.from({ length: 9 }, (_, i) => gs(`${id}-s${i}`, x, f(y + (h * (i + 1)) / 10), f(x + w), f(y + (h * (i + 1)) / 10), W.coklat, 0.8, { z: 1 })),
];
export const idBalok = (id: string): string[] => [id, ...Array.from({ length: 9 }, (_, i) => `${id}-s${i}`)];
/** Kubus kecil bersisi `s` (bawaan 9): pojok kiri-atas (x, y). */
export const kubusKecil = (id: string, x: number, y: number, s = 9, o: Partial<Obj> = {}): Obj => kotak(id, x, y, s, s, WK.kubus, W.coklat, { rx: 1, tebal: 1.2, ...o });

/** Bagan puluhan dan satuan bergaya papan kayu: judul `${id}-jd`, kolom `${id}-kp`, `${id}-ks`, angka `${id}-ap`, `${id}-as`. Pojok kiri-atas (x, y), tiap kolom selebar 62. */
export function bagan(id: string, x: number, y: number, angkaP: string, angkaS: string): Obj[] {
  return [
    kotak(`${id}-kp`, x, y, 62, 66, WK.puluhan, W.biru, { rx: 4, tebal: 2 }),
    kotak(`${id}-ks`, f(x + 62), y, 62, 66, WK.satuan, W.biru, { rx: 4, tebal: 2 }),
    teks(`${id}-jp`, f(x + 31), f(y + 12), "Puluhan", 9, W.biru, { z: 1 }),
    teks(`${id}-js`, f(x + 93), f(y + 12), "Satuan", 9, W.biru, { z: 1 }),
    ...(angkaP === "" ? [] : [teks(`${id}-ap`, f(x + 31), f(y + 48), angkaP, 30, W.biru, { z: 1 })]),
    ...(angkaS === "" ? [] : [teks(`${id}-as`, f(x + 93), f(y + 48), angkaS, 30, W.biru, { z: 1 })]),
  ];
}
export const idBagan = (id: string, adaP = true, adaS = true): string[] => [`${id}-kp`, `${id}-ks`, `${id}-jp`, `${id}-js`, ...(adaP ? [`${id}-ap`] : []), ...(adaS ? [`${id}-as`] : [])];

/** Papan catatan Dika: papan `${id}` bertepi kayu. */
export const papanCatat = (id: string, x: number, y: number, w: number, h: number): Obj => kotak(id, x, y, w, h, "#ECFCCB", W.coklat, { rx: 4, tebal: 3, z: -1 });

/** Tokoh berdiri: wajah `${id}` dan nama `${id}-n` di bawahnya (y adalah garis dasar wajah). */
export const tokoh = (id: string, x: number, y: number, e: string, nama: string, u = 30): Obj[] => [emo(id, x, y, e, u), teks(`${id}-n`, x, f(y + 13), nama, 8.4, W.ungu)];
export const idTokoh = (id: string): string[] => [id, `${id}-n`];

/** Nia bertopi: wajah `${id}`, topi `${id}-tp`, nama `${id}-n`. */
export const nia = (id: string, x: number, y: number): Obj[] => [emo(id, x, y, E.nia, 30), emo(`${id}-tp`, x, f(y - 13), E.topi, 15), teks(`${id}-n`, x, f(y + 13), "Nia", 8.4, W.ungu)];
export const idNia = (id: string): string[] => [id, `${id}-tp`, `${id}-n`];

/** Bu Sari bercelemek: wajah `${id}`, celemek `${id}-c`, nama `${id}-n`. */
export const buSari = (id: string, x: number, y: number): Obj[] => [emo(id, x, y, E.sari, 30), kotak(`${id}-c`, f(x - 8), f(y + 3), 16, 8, WK.celemek, W.merah, { rx: 2, tebal: 1, z: 1 }), teks(`${id}-n`, x, f(y + 20), "Bu Sari", 8.4, W.ungu)];
export const idSari = (id: string): string[] => [id, `${id}-c`, `${id}-n`];

/** Pak Anto berpeluit: wajah `${id}`, peluit `${id}-p` dan talinya `${id}-q`, nama `${id}-n`. */
export const pakAnto = (id: string, x: number, y: number): Obj[] => [
  emo(id, x, y, E.anto, 30),
  bulat(`${id}-p`, f(x + 8), f(y + 6), 3.4, W.emas, W.coklat, { tebal: 1, z: 2 }),
  gs(`${id}-q`, f(x + 8), f(y + 6), f(x - 2), f(y - 8), W.coklat, 0.8, { z: 2 }),
  teks(`${id}-n`, x, f(y + 20), "Pak Anto", 8.4, W.ungu),
];
export const idAnto = (id: string): string[] => [id, `${id}-p`, `${id}-q`, `${id}-n`];

/** Pak Anto saat menyerahkan: sama dengan pakAnto, namanya di bawah peluit. */
export const idSemua = (...daftar: string[][]): string[] => daftar.flat();

/** Titik kue lepas ke-i dari satu baris yang berpusat di cx, berjarak `jarak`. */
export const xBaris = (cx: number, n: number, i: number, jarak: number): number => f(cx - ((n - 1) * jarak) / 2 + i * jarak);
