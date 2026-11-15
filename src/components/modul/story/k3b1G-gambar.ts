import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 3 Bab 1 Sub-Bab G (Pembagian Bilangan Cacah sampai 100).
 * Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Kesepakatan id (dipakai uji hitung ulang dari struktur adegan, bukan dari kata):
 * - BENDA `b-${nama}-${i}` (i dari 1, bergambar emoji). Benda berada di tumpukan (baris atas) atau di dalam sebuah bagian.
 * - BAGIAN (kotak penerima): kotak `gr-${g}`, nama penerima `gn-${g}`, banyak benda yang diterima `bj-${g}` (g dari 0).
 *   Benda ke-i dibagikan bergiliran: bagian (i - 1) mod G, urutan dalam bagian floor((i - 1) / G).
 * - HITUNGAN: `hb` (hitungan yang diperiksa terhadap benda, bagian, atau susunan titik di layar), `hb2`, `hb3`, `pr` (periksa dengan kali), `tq` (tertulis tanpa hasil).
 *   Bentuk tertulis: "a : b = c", "a × b = c", "a − b = c", "a + b = c".
 * - KURANG BERULANG: langkah ke-s (dari 1) `kb-${s}` berbentuk "a − b = c"; ringkasan `kb-n` berbentuk "dikurangi b sebanyak n kali".
 * - GARIS BILANGAN MUNDUR: titik `gm-p`, tanda `gm-t${v}`, angka `gm-l${v}`, loncatan `gm-h${s}` (panah dari nilai a ke a - b), tulisan `gm-j${s}`, banyaknya `gm-n`.
 * - SUSUNAN TITIK: `dot-${baris}-${kolom}` (baris dan kolom dari 0), `ar-b` ("3 baris"), `ar-k` ("tiap baris 5").
 * - ISTILAH: `ist-a` (yang dibagi), `ist-b` (pembagi), `ist-c` (hasil bagi), tanda `ist-o1`, `ist-o2`, nama `ist-la`, `ist-lb`, `ist-lc`.
 * - KELUARGA: tiga bilangan `kfn-1..3`; empat kalimat kartu `kf1..kf4` (teks `kf${i}-t0`).
 * - Kartu pilihan `c1..c3` (`c${i}-k`, `c${i}-t`), pertanyaan `tanya`.
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
type Ubah = Partial<Obj> & { id: string };

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

/* ------------------------------ Tokoh tetap ------------------------------ */
export const NAMA_ANAK = ["Malosi", "Kira", "Upe", "Wei", "Halim", "Igil"];

/* ------------------------------ Benda bergambar ------------------------------ */

/** Gambar tiap jenis benda (emoji paling tinggi Emoji 12). */
export const EMO: Record<string, string> = {
  biskuit: "\u{1F36A}",
  jeruk: "\u{1F34A}",
  apel: "\u{1F34E}",
  kelereng: "\u{1F535}",
  bintang: "⭐",
  bunga: "\u{1F33C}",
};

/** Benda ke-i (dari 1) jenis `nama` di titik (x, y) = garis dasar tulisan. */
export const benda = (nama: string, i: number, x: number, y: number, u = 14): Obj => emo(`b-${nama}-${i}`, x, y, EMO[nama], u);
export const idBenda = (nama: string, dari: number, sampai: number): string[] => Array.from({ length: Math.max(0, sampai - dari + 1) }, (_, q) => `b-${nama}-${dari + q}`);

export type OpsiTumpuk = { y0?: number; dy?: number; perBaris?: number; dx?: number };
/** Titik benda ke-i (dari 1) di tumpukan berisi n benda. */
export function posTumpuk(n: number, i: number, o: OpsiTumpuk = {}): [number, number] {
  const perBaris = o.perBaris ?? (n <= 10 ? n : Math.ceil(n / 2));
  const dx = o.dx ?? (perBaris > 8 ? 26 : 30);
  const y0 = o.y0 ?? 52;
  const dy = o.dy ?? 26;
  const r = Math.floor((i - 1) / perBaris);
  const c = (i - 1) % perBaris;
  const dalam = Math.min(perBaris, n - r * perBaris);
  return [150 + (c - (dalam - 1) / 2) * dx, y0 + r * dy];
}
/** Benda ke-`dari` sampai ke-`sampai` di tumpukan berisi n benda. */
export const tumpukan = (nama: string, n: number, dari = 1, sampai = n, o: OpsiTumpuk = {}): Obj[] =>
  Array.from({ length: Math.max(0, sampai - dari + 1) }, (_, q) => {
    const [x, y] = posTumpuk(n, dari + q, o);
    return benda(nama, dari + q, x, y, 14);
  });

/* ------------------------------ Bagian penerima ------------------------------ */
const Y_BAGIAN = 96;
const T_BAGIAN = 88;
/** Lebar dan pojok kiri satu bagian dari G bagian. */
export const lebarBagian = (G: number): number => (288 - (G - 1) * 6) / G;
export const kiriBagian = (G: number, g: number): number => 6 + g * (lebarBagian(G) + 6);

/** Kotak-kotak penerima dengan nama masing-masing. */
export const bagian = (nama: string[]): Obj[] =>
  nama.flatMap((n, g) => [
    kotak(`gr-${g}`, kiriBagian(nama.length, g), Y_BAGIAN, lebarBagian(nama.length), T_BAGIAN, [W.hijauMuda, W.langit, W.pink, W.krem, W.lavender, W.merahMuda][g % 6], W.biru, { rx: 8, tebal: 1.5 }),
    teks(`gn-${g}`, kiriBagian(nama.length, g) + lebarBagian(nama.length) / 2, Y_BAGIAN + 12, n, 9, W.biru),
  ]);
export const idBagian = (G: number): string[] => Array.from({ length: G }, (_, g) => [`gr-${g}`, `gn-${g}`]).flat();

/** Titik benda yang berada di bagian g (dari G bagian), urutan ke-s (dari 0) dalam bagian itu. */
export function posBagian(G: number, g: number, s: number): [number, number] {
  const w = lebarBagian(G);
  const kol = Math.max(1, Math.min(5, Math.floor((w - 6) / 30)));
  const r = Math.floor(s / kol);
  const c = s % kol;
  return [kiriBagian(G, g) + w / 2 + (c - (kol - 1) / 2) * 30, Y_BAGIAN + 36 + r * 26];
}
/** Pindahkan benda ke-`dari` sampai ke-`sampai` ke bagian-bagian secara bergiliran (benda ke-i ke bagian (i - 1) mod G). */
export const bagikan = (nama: string, G: number, dari: number, sampai: number): Ubah[] =>
  Array.from({ length: Math.max(0, sampai - dari + 1) }, (_, q) => {
    const i = dari + q;
    const [x, y] = posBagian(G, (i - 1) % G, Math.floor((i - 1) / G));
    return { id: `b-${nama}-${i}`, x, y };
  });
/** Taruh satu benda di bagian g urutan ke-s (untuk pembagian tidak merata). */
export const taruh = (nama: string, i: number, G: number, g: number, s: number): Ubah => {
  const [x, y] = posBagian(G, g, s);
  return { id: `b-${nama}-${i}`, x, y };
};
/** Banyak benda yang diterima bagian g, ditulis di bawah kotak. */
export const jumlahBagian = (g: number, G: number, n: number): Obj => teks(`bj-${g}`, kiriBagian(G, g) + lebarBagian(G) / 2, 198, String(n), 13, W.merah);
export const idJumlah = (G: number): string[] => Array.from({ length: G }, (_, g) => `bj-${g}`);

/* ------------------------------ Hitungan tertulis ------------------------------ */
export const hbAtas = (isi: string, id = "hb"): Obj => teks(id, 150, 91, isi, 12, W.merah);
export const hbBawah = (isi: string, id = "hb"): Obj => teks(id, 150, 197, isi, 12, W.merah);

/* ------------------------------ Kurang berulang ------------------------------ */
export type OpsiKb = { y0?: number; dy?: number; u?: number };
/** Satu langkah pengurangan ke-s (dari 1): a dikurangi b. */
export const langkahKb = (s: number, a: number, b: number, o: OpsiKb = {}): Obj => teks(`kb-${s}`, 150, (o.y0 ?? 104) + (s - 1) * (o.dy ?? 13), `${a - (s - 1) * b} − ${b} = ${a - s * b}`, o.u ?? 10.5, W.biru);
export const ringkasKb = (b: number, n: number, y: number): Obj => teks("kb-n", 150, y, `dikurangi ${b} sebanyak ${n} kali`, 10, W.ungu);
/** Id benda yang diambil pada langkah ke-s dari tumpukan berisi a benda (diambil b benda terakhir yang tersisa). */
export const bendaLangkah = (nama: string, a: number, b: number, s: number): string[] => idBenda(nama, a - s * b + 1, a - (s - 1) * b);

/* ------------------------------ Garis bilangan mundur ------------------------------ */
export const GM = { x0: 22, dx: 17.6, yGaris: 132 };
export const xGm = (v: number): number => GM.x0 + v * GM.dx;
export const garisBilangan = (maks: number): Obj[] => [
  garis("gm-g", xGm(0) - 8, GM.yGaris, maks * GM.dx + 16, 0, W.biru, 2),
  ...Array.from({ length: maks + 1 }, (_, v) => garis(`gm-t${v}`, xGm(v), GM.yGaris - 5, 0, 10, W.biru, 1.5)),
  ...Array.from({ length: maks + 1 }, (_, v) => teks(`gm-l${v}`, xGm(v), GM.yGaris + 21, String(v), 8.5, W.biru)),
];
export const idGarisBilangan = (maks: number): string[] => ["gm-g", ...Array.from({ length: maks + 1 }, (_, v) => [`gm-t${v}`, `gm-l${v}`]).flat()];
export const titikGm = (v: number): Obj => bulat("gm-p", xGm(v), GM.yGaris, 5, W.merah, W.biru);
/** Loncatan ke-s (dari 1) dari nilai a mundur sebesar b. */
export const loncatGm = (s: number, a: number, b: number): Obj[] => {
  const y = s % 2 === 1 ? 112 : 100;
  return [panah(`gm-h${s}`, xGm(a), y, -b * GM.dx, 0, W.hijau, 2.4), teks(`gm-j${s}`, xGm(a) - (b * GM.dx) / 2, y - 5, `−${b}`, 9, W.hijau)];
};

/* ------------------------------ Susunan titik ------------------------------ */
export const posTitik = (baris: number, kolom: number, r: number, c: number, o: { y0?: number; dx?: number; dy?: number } = {}): [number, number] => {
  const dx = o.dx ?? 30;
  const dy = o.dy ?? 22;
  return [150 + (c - (kolom - 1) / 2) * dx, (o.y0 ?? 52) + r * dy];
};
export const titik = (baris: number, kolom: number, o: { y0?: number; dx?: number; dy?: number } = {}): Obj[] =>
  Array.from({ length: baris * kolom }, (_, q) => {
    const r = Math.floor(q / kolom);
    const c = q % kolom;
    const [x, y] = posTitik(baris, kolom, r, c, o);
    return bulat(`dot-${r}-${c}`, x, y, 6, W.oranye, W.biru, { tebal: 1.2 });
  });
export const idTitik = (baris: number, kolom: number): string[] => Array.from({ length: baris * kolom }, (_, q) => `dot-${Math.floor(q / kolom)}-${q % kolom}`);
export const idTitikKolom = (baris: number, c: number): string[] => Array.from({ length: baris }, (_, r) => `dot-${r}-${c}`);

/* ------------------------------ Istilah pembagian ------------------------------ */
export const XI = { a: 55, o1: 100, b: 145, o2: 190, c: 235 };
export const istilah = (a: number, b: number, c: number, y = 70): Obj[] => [
  teks("ist-a", XI.a, y, String(a), 26, W.biru),
  teks("ist-o1", XI.o1, y, ":", 26, W.ungu),
  teks("ist-b", XI.b, y, String(b), 26, W.biru),
  teks("ist-o2", XI.o2, y, "=", 26, W.ungu),
  teks("ist-c", XI.c, y, String(c), 26, W.biru),
];
export const idIstilah = ["ist-a", "ist-o1", "ist-b", "ist-o2", "ist-c"];
export const namaIstilah = (huruf: "a" | "b" | "c", isi: string, y = 100): Obj => teks(`ist-l${huruf}`, XI[huruf], y, isi, 9, W.merah);

/* ------------------------------ Pilihan kartu ------------------------------ */
/** Pilihan kartu (id c1..cn), pojok kiri-atas di tinggi `y`, lebar kartu menyesuaikan jumlah; `u` = ukuran huruf. */
export const pilihKata = (y: number, isi: string[], u = 13): Obj[] => {
  const n = isi.length;
  const w = n === 2 ? 120 : 88;
  const jarak = n === 2 ? 20 : 6;
  const x0 = (300 - (n * w + (n - 1) * jarak)) / 2;
  return isi.flatMap((t, i) => kartuAngka(`c${i + 1}`, x0 + i * (w + jarak), y, t, [W.hijauMuda, W.pink, W.langit][i], w, 30, u));
};
export const idPilihan = (n: number): string[] => Array.from({ length: n }, (_, i) => [`c${i + 1}-k`, `c${i + 1}-t`]).flat();
export const idKartu = (id: string, b = 1): string[] => [`${id}-k`, ...Array.from({ length: b }, (_, i) => `${id}-t${i}`)];
