import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 1 Bab 4 Sub-Bab C (menyusun dan mengurai bentuk bangun): keping segitiga, segi empat, dan lengkung,
 * kereta, rumah, roket, mobil, serta lidi. Berkas ini TIDAK dipakai bab lain.
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
  /** Warna tetap tiap jenis bentuk: segi empat biru muda, segitiga merah muda, lengkung kuning. */
  segiEmpat: "#93C5FD",
  segitiga: "#FCA5A5",
  lengkung: "#FDE047",
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Kartu angka besar: pojok kiri-atas (x, y); id `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, angka: string, warna: string = W.krem, w = 40, h = 36, u = 22, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.6, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, angka, u, W.merah, o),
];

/* ------------------------------ Keping bangun datar ------------------------------ */

export type Titik = [number, number];

/** Jalur tertutup dari titik-titik relatif terhadap (x, y), diisi `warna`. Dipakai segitiga dan segi empat miring. */
export function poli(id: string, x: number, y: number, titik: Titik[], warna: string, o: Opsi = {}): Obj {
  const d = `${titik.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]} ${p[1]}`).join(" ")} Z`;
  return { id, t: "jalur", x, y, d, warna, garis: W.biru, tebal: 1.6, ...o };
}

/** Segitiga siku-siku berlebar `w` dan setinggi `h`; sudut siku di `siku` (kiriBawah, kananBawah, kiriAtas, kananAtas). */
export function siku(id: string, x: number, y: number, w: number, h: number, siku: "kiriBawah" | "kananBawah" | "kiriAtas" | "kananAtas", warna: string = W.segitiga, o: Opsi = {}): Obj {
  const t: Record<string, Titik[]> = {
    kiriBawah: [[0, 0], [0, h], [w, h]],
    kananBawah: [[w, 0], [w, h], [0, h]],
    kiriAtas: [[0, 0], [w, 0], [0, h]],
    kananAtas: [[0, 0], [w, 0], [w, h]],
  };
  return poli(id, x, y, t[siku], warna, o);
}

/** Segitiga sama kaki dengan puncak di atas. */
export const segitigaSama = (id: string, x: number, y: number, w: number, h: number, warna: string = W.segitiga, o: Opsi = {}): Obj => poli(id, x, y, [[w / 2, 0], [w, h], [0, h]], warna, o);

/** Segi empat (persegi atau persegi panjang). */
export const segiEmpat = (id: string, x: number, y: number, w: number, h: number, warna: string = W.segiEmpat, o: Opsi = {}): Obj => kotak(id, x, y, w, h, warna, W.biru, { rx: 0, tebal: 1.6, ...o });

/** Bentuk lengkung (lingkaran) berpusat di (x, y). */
export const lengkung = (id: string, x: number, y: number, r: number, o: Opsi = {}): Obj => bulat(id, x, y, r, W.lengkung, W.biru, { tebal: 1.6, ...o });

/* ------------------------------ Benda dari keping ------------------------------ */

/** Kereta mainan: lima segi empat (kr0 cerobong, kr1 mesin, kr2 kabin, kr3 jendela, kr4 gerbong), satu segitiga (kr5 moncong), tiga lengkung (kr6 sampai kr8 roda). */
export const KERETA_ID = ["kr0", "kr1", "kr2", "kr3", "kr4"];
export const KERETA_ROMBONG = ["kr5"];
export const KERETA_RODA = ["kr6", "kr7", "kr8"];
export function kereta(x0 = 40, y0 = 62, o: Opsi = {}): Obj[] {
  return [
    segiEmpat("kr0", x0 + 14, y0, 14, 18, W.segiEmpat, o),
    segiEmpat("kr1", x0 + 4, y0 + 18, 60, 34, W.segiEmpat, o),
    segiEmpat("kr2", x0 + 66, y0 + 4, 40, 48, W.segiEmpat, o),
    segiEmpat("kr3", x0 + 74, y0 + 12, 22, 18, W.segiEmpat, o),
    segiEmpat("kr4", x0 + 110, y0 + 18, 100, 34, W.segiEmpat, o),
    siku("kr5", x0 - 22, y0 + 22, 26, 30, "kananBawah", W.segitiga, o),
    lengkung("kr6", x0 + 22, y0 + 58, 10, o),
    lengkung("kr7", x0 + 88, y0 + 58, 10, o),
    lengkung("kr8", x0 + 170, y0 + 58, 10, o),
  ];
}

/** Rumah mainan: atap segitiga (rm0), dinding (rm1), pintu (rm2), dan jendela (rm3). Letak utuh di (x0, y0) atau terurai. */
export const RUMAH_ID = ["rm0", "rm1", "rm2", "rm3"];
type Letak = { x: number; y: number };
export const letakRumah = (urai: boolean, x0 = 100, y0 = 50): Record<string, Letak> =>
  urai
    ? { rm0: { x: 24, y: 44 }, rm1: { x: 160, y: 40 }, rm2: { x: 60, y: 112 }, rm3: { x: 170, y: 122 } }
    : { rm0: { x: x0, y: y0 }, rm1: { x: x0 + 10, y: y0 + 40 }, rm2: { x: x0 + 22, y: y0 + 64 }, rm3: { x: x0 + 58, y: y0 + 54 } };
export function rumah(urai = false, x0 = 100, y0 = 50, o: Opsi = {}): Obj[] {
  const p = letakRumah(urai, x0, y0);
  return [
    segitigaSama("rm0", p.rm0.x, p.rm0.y, 100, 40, W.segitiga, o),
    segiEmpat("rm1", p.rm1.x, p.rm1.y, 80, 64, W.krem, o),
    segiEmpat("rm2", p.rm2.x, p.rm2.y, 24, 40, W.segiEmpat, o),
    segiEmpat("rm3", p.rm3.x, p.rm3.y, 28, 24, W.langit, o),
  ];
}

/** Roket: badan segi empat (rk0), hidung segitiga (rk1), dua sirip segitiga (rk2 dan rk3), dan jendela lengkung (rk4). */
export function roket(x0 = 130, y0 = 50, o: Opsi = {}): Obj[] {
  return [
    segiEmpat("rk0", x0, y0 + 30, 40, 70, W.segiEmpat, o),
    segitigaSama("rk1", x0, y0, 40, 30, W.segitiga, o),
    siku("rk2", x0 - 24, y0 + 70, 24, 30, "kananAtas", W.segitiga, o),
    siku("rk3", x0 + 40, y0 + 70, 24, 30, "kiriAtas", W.segitiga, o),
    lengkung("rk4", x0 + 20, y0 + 52, 9, o),
  ];
}

/** Mobil mainan: badan (mb0) dan kabin (mb1) segi empat, dua roda lengkung (mb2 dan mb3). */
export function mobil(x0 = 70, y0 = 80, o: Opsi = {}): Obj[] {
  return [
    segiEmpat("mb0", x0, y0 + 24, 150, 36, W.segiEmpat, o),
    segiEmpat("mb1", x0 + 36, y0, 70, 24, W.langit, o),
    lengkung("mb2", x0 + 32, y0 + 62, 11, o),
    lengkung("mb3", x0 + 118, y0 + 62, 11, o),
  ];
}

/** Lidi: garis tebal cokelat dari (x, y) ke (x + dx, y + dy). */
export const lidi = (id: string, x: number, y: number, x2: number, y2: number, o: Opsi = {}): Obj => garis(id, x, y, x2 - x, y2 - y, W.coklat, 4.5, { ...o });

/** Tempat lidi yang masih kosong: garis putus-putus. */
export const tempatLidi = (id: string, x: number, y: number, x2: number, y2: number, o: Opsi = {}): Obj => garis(id, x, y, x2 - x, y2 - y, W.abu, 3.4, { putus: true, ...o });
