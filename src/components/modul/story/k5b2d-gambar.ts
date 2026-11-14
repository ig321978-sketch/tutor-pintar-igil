import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 2 Sub-Bab D (faktor persekutuan dan FPB): papan congklak 28 lubang, baris sel tabel faktor dan vas,
 * diagram irisan dua daftar faktor, serta kartu paket. Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
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
  hijauPita: "#86EFAC",
  merahPita: "#F87171",
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.4, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 8.6, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Id kartu (kotak dan teks) untuk dihapus. */
export const idKartu = (id: string, n = 1): string[] => [`${id}-k`, ...Array.from({ length: n }, (_, i) => `${id}-t${i}`)];

/* ------------------------------ Papan congklak ------------------------------ */

/** Tata letak papan congklak di buku (Buku Siswa hlm. 47 dan 49): dua papan, tiap papan dua baris tujuh lubang. Papan atas 1 sampai 7 dan 14 sampai 8, papan bawah 15 sampai 21 dan 22 sampai 28. */
export const BARIS_PAPAN: number[][] = [
  [1, 2, 3, 4, 5, 6, 7],
  [14, 13, 12, 11, 10, 9, 8],
  [15, 16, 17, 18, 19, 20, 21],
  [22, 23, 24, 25, 26, 27, 28],
];
export const PAPAN = { dx: 17, dy: 15.5, celah: 7, r: 6.3 };

/** Pusat lubang bernomor n pada papan yang pojok kiri-atas lubang pertamanya (x, y). */
export function pusatLubang(x: number, y: number, n: number): [number, number] {
  const baris = BARIS_PAPAN.findIndex((b) => b.includes(n));
  const kol = BARIS_PAPAN[baris].indexOf(n);
  return [x + kol * PAPAN.dx, y + baris * PAPAN.dy + (baris >= 2 ? PAPAN.celah : 0)];
}

/**
 * Papan congklak 28 lubang. Id: badan `${id}-p1` dan `${id}-p2`, lubang `${id}-L${n}`, nomor `${id}-N${n}`.
 * Warna lubang: hanya a (pemain 1) hijau, hanya b (pemain 2) merah, keduanya (dua biji) emas, kosong putih.
 */
export function papan(id: string, x: number, y: number, a: number[] = [], b: number[] = []): Obj[] {
  const { dx, r } = PAPAN;
  const lebar = 6 * dx + 2 * r + 8;
  const out: Obj[] = [
    kotak(`${id}-p1`, x - r - 4, y - r - 3, lebar, PAPAN.dy + 2 * r + 6, "#FED7AA", "#C2410C", { rx: 9, tebal: 1.2 }),
    kotak(`${id}-p2`, x - r - 4, y + 2 * PAPAN.dy + PAPAN.celah - r - 3, lebar, PAPAN.dy + 2 * r + 6, "#BFDBFE", W.biru, { rx: 9, tebal: 1.2 }),
  ];
  for (let n = 1; n <= 28; n += 1) {
    const [cx, cy] = pusatLubang(x, y, n);
    const dalamA = a.includes(n);
    const dalamB = b.includes(n);
    const warna = dalamA && dalamB ? W.emas : dalamA ? W.hijauPita : dalamB ? W.merahPita : W.putih;
    out.push(bulat(`${id}-L${n}`, cx, cy, r, warna, W.hitam, { tebal: 1 }), teks(`${id}-N${n}`, cx, cy + 2.3, String(n), 6.4, W.hitam));
  }
  return out;
}

/** Ubah warna sejumlah lubang papan (untuk ketukan berikutnya). */
export function warnaiLubang(id: string, a: number[], b: number[]): Array<Partial<Obj> & { id: string }> {
  return Array.from({ length: 28 }, (_, i) => i + 1).map((n) => {
    const dalamA = a.includes(n);
    const dalamB = b.includes(n);
    return { id: `${id}-L${n}`, warna: dalamA && dalamB ? W.emas : dalamA ? W.hijauPita : dalamB ? W.merahPita : W.putih };
  });
}

/** Id semua benda papan, untuk dihapus. */
export const idPapan = (id: string): string[] => [`${id}-p1`, `${id}-p2`, ...Array.from({ length: 28 }, (_, i) => [`${id}-L${i + 1}`, `${id}-N${i + 1}`]).flat()];

/* ------------------------------ Baris sel (tabel faktor dan vas) ------------------------------ */

/** Satu baris sel sama lebar mulai (x, y). Id kotak `${id}-${i}`, teks `${id}-t${i}`. */
export function barisSel(id: string, x: number, y: number, w: number, h: number, isi: Array<string | number>, warna: string | string[], u = 9): Obj[] {
  return isi.flatMap((v, i) => [
    kotak(`${id}-${i}`, Math.round((x + i * w) * 10) / 10, y, w, h, Array.isArray(warna) ? warna[i] : warna, W.biru, { rx: 0, tebal: 1.1 }),
    teks(`${id}-t${i}`, Math.round((x + i * w + w / 2) * 10) / 10, y + h / 2 + u * 0.35, String(v), u, W.hitam),
  ]);
}

/** Id semua benda baris sel sebanyak n sel. */
export const idBaris = (id: string, n: number): string[] => Array.from({ length: n }, (_, i) => [`${id}-${i}`, `${id}-t${i}`]).flat();

/* ------------------------------ Irisan dua daftar faktor ------------------------------ */

/**
 * Dua lingkaran yang saling beririsan. Lingkaran kiri `${id}-A` berpusat (xa, y), kanan `${id}-B` berpusat (xb, y), keduanya berjari-jari r.
 * Isi: bilangan yang hanya di kiri `${id}-l${n}`, hanya di kanan `${id}-r${n}`, di irisan `${id}-m${n}`.
 */
export function irisan(id: string, xa: number, xb: number, y: number, r: number, kiri: number[], tengah: number[], kanan: number[]): Obj[] {
  const xm = (xa + xb) / 2;
  const sebar = (daftar: number[], cx: number, awalan: string, lebar: number): Obj[] => {
    const kolom = daftar.length > 3 ? 2 : 1;
    const baris = Math.ceil(daftar.length / kolom);
    return daftar.map((n, i) => {
      const kx = kolom === 2 ? cx + (i % 2 === 0 ? -lebar / 2 : lebar / 2) : cx;
      const ky = y - ((baris - 1) * 14) / 2 + Math.floor(i / kolom) * 14 + 3.5;
      return teks(`${id}-${awalan}${n}`, kx, ky, String(n), 10, W.hitam);
    });
  };
  return [
    bulat(`${id}-A`, xa, y, r, W.hijauPita, W.hijau, { op: 0.55, tebal: 1.6 }),
    bulat(`${id}-B`, xb, y, r, W.merahPita, W.merah, { op: 0.55, tebal: 1.6 }),
    ...sebar(kiri, xm - r, "l", 18),
    ...sebar(tengah, xm, "m", 14),
    ...sebar(kanan, xm + r, "r", 18),
  ];
}
