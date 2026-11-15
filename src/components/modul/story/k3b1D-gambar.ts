import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 3 Bab 1 Sub-Bab D (Penjumlahan sampai 100).
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Kesepakatan id (dipakai uji hitung ulang dari struktur adegan, bukan dari kata):
 * - SUSUN PENDEK `ls-*`: angka atas `ls-a-t` (puluhan) dan `ls-a-s` (satuan), angka bawah `ls-b-t`, `ls-b-s`, tanda `ls-op`, garis `ls-gar`,
 *   simpanan `ls-sim`, hasil `ls-h-s` (satuan) dan `ls-h-t` (puluhan). Catatan satuan `eq-s` dan puluhan `eq-p` berbentuk "a + b = c".
 * - BLOK BILANGAN `bk-${g}-p${i}` (batang puluhan, i dari 1), `bk-${g}-s${i}` (kotak satuan, i dari 1), label `bk-${g}-n` (bilangan; sama dengan 10 x batang + kotak).
 * - SATUAN LEPAS `bs-${g}-${i}` (i dari 1) dan label `bs-${g}-n`; batang tukaran `ts-p${i}`. Nilai total (10 x batang + satuan lepas) tetap sepanjang adegan.
 * - TABEL NILAI TEMPAT `nt-${g}-n` (bilangan), `nt-${g}-t` (angka puluhan), `nt-${g}-s` (angka satuan).
 * - TOKOH BERNILAI `tk-${slug}-n` (banyaknya), SOAL `soal` ("a + b = ?" atau "a + b = c"), PILIHAN `c1..c3`, pertanyaan `tanya`.
 * - PECAHAN BILANGAN `pb-a`, `pb-b`, `pb-b1`, `pb-b2` (a + b dengan b = b1 + b2 dan a + b1 kelipatan sepuluh).
 * - GARIS BILANGAN `gb-n-${v}` (nilai tiap tanda), `gb-h-${i}` (loncatan ke-i dari satu), `gb-mulai`, `gb-akhir`.
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
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
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
export const idAnak = (slug: string): string[] => [`an-${slug}`, `an-${slug}-bd`, `an-${slug}-lb`];

/** Dua tokoh di kiri (x 50) dan kanan (x 250), masing-masing dengan banyaknya (`tk-${slug}-n`). */
export const XTOKOH = [50, 250];
export const tokoh = (slug: string, sisi: 0 | 1): Obj[] => anak(slug, XTOKOH[sisi], 46);
export const nilaiTokoh = (slug: string, sisi: 0 | 1, n: number): Obj => teks(`tk-${slug}-n`, XTOKOH[sisi], 114, String(n), 20, W.merah);
export const idTokoh = (slug: string): string[] => [...idAnak(slug), `tk-${slug}-n`];

/* ------------------------------ Susun pendek ------------------------------ */
const T = 96;
const S = 134;
const digit = (id: string, x: number, y: number, n: number, warna: string = W.biru, u = 26): Obj => teks(id, x, y, String(n), u, warna);

/** Susun pendek a + b (a, b dua angka): semua posisi dan digit dihitung dari a dan b; `dy` menggeser semua ke bawah. */
export function susun(a: number, b: number, dy = 0) {
  const at = Math.floor(a / 10);
  const as = a % 10;
  const bt = Math.floor(b / 10);
  const bs = b % 10;
  const jumlahSatuan = as + bs;
  const simpan = Math.floor(jumlahSatuan / 10);
  const hs = jumlahSatuan % 10;
  const ht = at + bt + simpan;
  return {
    a,
    b,
    simpan,
    kepala: (): Obj[] => [teks("ls-ht", T, 40 + dy, "puluhan", 8, W.ungu), teks("ls-hs", S, 40 + dy, "satuan", 8, W.ungu)],
    atas: (): Obj[] => [digit("ls-a-t", T, 86 + dy, at), digit("ls-a-s", S, 86 + dy, as)],
    bawah: (): Obj[] => [teks("ls-op", 64, 118 + dy, "+", 22, W.merah), digit("ls-b-t", T, 118 + dy, bt), digit("ls-b-s", S, 118 + dy, bs), garis("ls-gar", 52, 126 + dy, 100, 0, W.biru, 2)],
    hSatuan: (): Obj => digit("ls-h-s", S, 156 + dy, hs, W.merah),
    hPuluhan: (): Obj => digit("ls-h-t", T, 156 + dy, ht, W.merah),
    sim: (): Obj => teks("ls-sim", T, 62 + dy, String(simpan), 14, W.merah),
    sorS: (): Obj => kotak("ls-sor", S - 15, 62 + dy, 30, 104, W.emas, undefined, { op: 0.35, z: -1, rx: 6 }),
    sorT: (): Obj => kotak("ls-sor", T - 15, 62 + dy, 30, 104, W.emas, undefined, { op: 0.35, z: -1, rx: 6 }),
    /** Catatan di sisi kanan: satuan `eq-s` atau puluhan `eq-p`. */
    eqS: (): Obj => teks("eq-s", 232, 116 + dy, `${as} + ${bs} = ${jumlahSatuan}`, 13, W.hijau),
    eqP: (): Obj => teks("eq-p", 232, 150 + dy, `${simpan > 0 ? `${simpan} + ` : ""}${at} + ${bt} = ${ht}`, 13, W.hijau),
  };
}
export type Susun = ReturnType<typeof susun>;
export const idSusun = ["ls-ht", "ls-hs", "ls-a-t", "ls-a-s", "ls-op", "ls-b-t", "ls-b-s", "ls-gar", "ls-h-s", "ls-h-t", "ls-sim", "ls-sor", "eq-s", "eq-p"];

/* ------------------------------ Blok bilangan ------------------------------ */
const WARNA_P = "#60A5FA";
const WARNA_S = "#F87171";

/** Blok bilangan n di pojok kiri-atas (x, y): batang puluhan di atas, kotak satuan di bawahnya, label di bawah. */
export function blok(g: string, x: number, y: number, n: number) {
  const p = Math.floor(n / 10);
  const s = n % 10;
  const batang = (i: number): Obj => kotak(`bk-${g}-p${i}`, x + (i - 1) * 8, y, 6, 28, WARNA_P, W.biru, { rx: 1.5, tebal: 1 });
  const kotakS = (i: number): Obj => kotak(`bk-${g}-s${i}`, x + ((i - 1) % 5) * 8, y + 34 + Math.floor((i - 1) / 5) * 9, 6, 6, WARNA_S, W.biru, { rx: 1, tebal: 0.8 });
  return {
    n,
    batang: (dari = 1, sampai = p): Obj[] => Array.from({ length: Math.max(0, sampai - dari + 1) }, (_, q) => batang(dari + q)),
    satuan: (dari = 1, sampai = s): Obj[] => Array.from({ length: Math.max(0, sampai - dari + 1) }, (_, q) => kotakS(dari + q)),
    label: (): Obj => teks(`bk-${g}-n`, x + 20, y + 66, String(n), 12, W.merah),
    ket: (): Obj => teks(`bk-${g}-k`, x + 20, y + 80, `${p} puluhan, ${s} satuan`, 9, W.biru),
    id: (): string[] => [...Array.from({ length: p }, (_, i) => `bk-${g}-p${i + 1}`), ...Array.from({ length: s }, (_, i) => `bk-${g}-s${i + 1}`), `bk-${g}-n`, `bk-${g}-k`],
  };
}

/** Satuan lepas banyaknya n: baris pertama sepuluh kotak, sisanya di baris kedua. */
export function lepas(g: string, n: number, x = 80, y = 74) {
  const satu = (i: number): Obj => kotak(`bs-${g}-${i}`, x + ((i - 1) % 10) * 14, y + Math.floor((i - 1) / 10) * 16, 10, 10, WARNA_S, W.biru, { rx: 2, tebal: 1 });
  return {
    semua: (): Obj[] => Array.from({ length: n }, (_, i) => satu(i + 1)),
    sepuluh: (): string[] => Array.from({ length: Math.min(10, n) }, (_, i) => `bs-${g}-${i + 1}`),
    label: (isi: number): Obj => teks(`bs-${g}-n`, 150, 54, String(isi), 16, W.merah),
  };
}
/** Batang hasil tukaran sepuluh satuan. */
export const batangTukar = (i: number, x: number, y: number): Obj => kotak(`ts-p${i}`, x, y, 14, 40, WARNA_P, W.biru, { rx: 2, tebal: 1.2 });

/* ------------------------------ Tabel nilai tempat ------------------------------ */
/** Satu baris tabel nilai tempat: bilangan, angka puluhan, angka satuan. */
export function barisNT(g: string, y: number, n: number): Obj[] {
  return [
    kotak(`nt-${g}-k`, 24, y - 22, 252, 36, W.putih, W.abu, { rx: 6, tebal: 1 }),
    teks(`nt-${g}-n`, 64, y + 3, String(n), 20, W.merah),
    teks(`nt-${g}-t`, 156, y + 3, String(Math.floor(n / 10)), 20, W.biru),
    teks(`nt-${g}-s`, 232, y + 3, String(n % 10), 20, W.biru),
  ];
}
export const kepalaNT = (): Obj[] => [teks("nt-h0", 64, 46, "bilangan", 9, W.ungu), teks("nt-h1", 156, 46, "puluhan", 9, W.ungu), teks("nt-h2", 232, 46, "satuan", 9, W.ungu)];
export const idBarisNT = (g: string): string[] => [`nt-${g}-k`, `nt-${g}-n`, `nt-${g}-t`, `nt-${g}-s`];

/* ------------------------------ Pasangan bilangan ------------------------------ */
/** Pecahan bilangan b menjadi b1 dan b2 di bawah a + b; y = garis dasar baris a + b. */
export function pecah(a: number, b: number, b1: number, y = 74) {
  return {
    awal: (): Obj[] => [teks("pb-a", 96, y, String(a), 24, W.biru), teks("pb-op", 150, y, "+", 22, W.merah), teks("pb-b", 204, y, String(b), 24, W.biru)],
    garis: (): Obj[] => [garis("pb-l1", 204, y + 6, -22, 20, W.abu, 2), garis("pb-l2", 204, y + 6, 22, 20, W.abu, 2)],
    bagian: (): Obj[] => [teks("pb-b1", 182, y + 44, String(b1), 20, W.merah), teks("pb-b2", 226, y + 44, String(b - b1), 20, W.hijau)],
  };
}
export const idPecah = ["pb-a", "pb-op", "pb-b", "pb-l1", "pb-l2", "pb-b1", "pb-b2"];

/* ------------------------------ Garis bilangan ------------------------------ */
/** Garis bilangan dari `dari` sampai `sampai`, sumbu di tinggi y. */
export function garisBil(dari: number, sampai: number, y = 112, x0 = 40, x1 = 260) {
  const langkah = (x1 - x0) / (sampai - dari);
  const gx = (v: number) => x0 + (v - dari) * langkah;
  return {
    sumbu: (): Obj[] => [garis("gb-as", x0 - 14, y, x1 - x0 + 28, 0, W.biru, 2)],
    tanda: (): Obj[] => Array.from({ length: sampai - dari + 1 }, (_, i) => dari + i).flatMap((v) => [garis(`gb-k-${v}`, gx(v), y - 4, 0, 8, W.biru, 1.6), teks(`gb-n-${v}`, gx(v), y + 18, String(v), 10, W.biru)]),
    mulai: (v: number): Obj => bulat("gb-mulai", gx(v), y, 5, W.merah, W.biru),
    /** Loncatan ke-i (dari 1) dari nilai `dari0` ke `dari0 + 1` dan angka hitungnya. */
    loncat: (i: number, dari0: number): Obj[] => [panah(`gb-h-${i}`, gx(dari0), y - 16, langkah, 0, W.merah, 2.2), teks(`gb-c-${i}`, gx(dari0) + langkah / 2, y - 22, String(i), 9, W.merah)],
    akhir: (v: number): Obj => bulat("gb-akhir", gx(v), y, 6, W.hijau, W.biru),
  };
}
export const idGarisBil = (dari: number, sampai: number, maks: number): string[] => [
  "gb-as",
  ...Array.from({ length: sampai - dari + 1 }, (_, i) => [`gb-k-${dari + i}`, `gb-n-${dari + i}`]).flat(),
  "gb-mulai",
  "gb-akhir",
  ...Array.from({ length: maks }, (_, i) => [`gb-h-${i + 1}`, `gb-c-${i + 1}`]).flat(),
];
