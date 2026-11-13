import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 6 Bab 3 Sub-Bab A (Mengonstruksi dan Mengurai), dirancang untuk isi sub-bab ini.
 * Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
 * Gambar ruang memakai proyeksi isometrik: sumbu i ke kanan-bawah, sumbu j ke kiri-bawah, sumbu h ke atas.
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
  langit: "#DBEAFE",
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const jalur = (id: string, x: number, y: number, d: string, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "jalur", x, y, d, warna, garis: garisW, tebal: 1.2, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Balon kata satu atau dua baris, titik tengah (cx, y). */
export function balon(id: string, cx: number, y: number, baris: string[], lebar: number, warna: string = W.putih, u = 6.6, o: Opsi = {}): Obj[] {
  const tinggi = baris.length * (u + 2.2) + 5;
  return [kotak(`${id}-k`, cx - lebar / 2, y, lebar, tinggi, warna, W.biru, { rx: 5, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, cx, y + 3 + (i + 1) * (u + 1.6), b, u, W.biru, o))];
}

/* ------------------------------ Isometrik: balok dan kubus ------------------------------ */

export type Warna3 = { atas: string; kiri: string; kanan: string };
export const BAHAN: Record<string, Warna3> = {
  oranye: { atas: "#FB923C", kiri: "#EA7A1F", kanan: "#FDBA74" },
  biru: { atas: "#60A5FA", kiri: "#2563EB", kanan: "#93C5FD" },
  hijau: { atas: "#4ADE80", kiri: "#16A34A", kanan: "#86EFAC" },
  merah: { atas: "#F87171", kiri: "#DC2626", kanan: "#FCA5A5" },
  kuning: { atas: "#FDE047", kiri: "#CA9A04", kanan: "#FEF08A" },
  ungu: { atas: "#C4B5FD", kiri: "#7C3AED", kanan: "#DDD6FE" },
  abu: { atas: "#E5E7EB", kiri: "#9CA3AF", kanan: "#F3F4F6" },
};

export type Papan = { s: number; ox: number; oy: number };
const DX = 0.866;
const DY = 0.5;
const f2 = (n: number) => Math.round(n * 100) / 100;

/** Balok (a sepanjang i, b sepanjang j, c tinggi) pada sel (i, j, h). Tiga bidang tampak: atas, kiri-bawah, kanan-bawah. */
export function balokIso(id: string, p: Papan, i: number, j: number, h: number, a: number, b: number, c: number, bahan: Warna3, o: Opsi = {}): Obj[] {
  const dx = p.s * DX;
  const dy = p.s * DY;
  const px = p.ox + (i - j) * dx;
  const py = p.oy + (i + j) * dy - (h + c) * p.s;
  const t = c * p.s;
  const z = (i + j + a + b) * 10 + h + (o.z ?? 0);
  const pakai = { tebal: 1, ...o, z };
  const atas = `M0 0 L${f2(a * dx)} ${f2(a * dy)} L${f2((a - b) * dx)} ${f2((a + b) * dy)} L${f2(-b * dx)} ${f2(b * dy)} Z`;
  const kiri = `M${f2(-b * dx)} ${f2(b * dy)} L${f2((a - b) * dx)} ${f2((a + b) * dy)} L${f2((a - b) * dx)} ${f2((a + b) * dy + t)} L${f2(-b * dx)} ${f2(b * dy + t)} Z`;
  const kanan = `M${f2((a - b) * dx)} ${f2((a + b) * dy)} L${f2(a * dx)} ${f2(a * dy)} L${f2(a * dx)} ${f2(a * dy + t)} L${f2((a - b) * dx)} ${f2((a + b) * dy + t)} Z`;
  return [
    jalur(`${id}-a`, px, py, atas, bahan.atas, W.hitam, pakai),
    jalur(`${id}-l`, px, py, kiri, bahan.kiri, W.hitam, pakai),
    jalur(`${id}-r`, px, py, kanan, bahan.kanan, W.hitam, pakai),
  ];
}

export const idBalok = (id: string): string[] => [`${id}-a`, `${id}-l`, `${id}-r`];

/** Susunan kubus satuan dari daftar sel [i, j, h]. Kubus ke-n berid `${pre}${n}`. */
export function susunKubus(pre: string, p: Papan, sel: [number, number, number][], bahan: Warna3 | ((n: number, s: [number, number, number]) => Warna3), o: Opsi = {}): { objs: Obj[]; ids: string[][]; semua: string[] } {
  const ids: string[][] = [];
  const objs = sel.flatMap((s, n) => {
    const id = `${pre}${n}`;
    ids.push(idBalok(id));
    return balokIso(id, p, s[0], s[1], s[2], 1, 1, 1, typeof bahan === "function" ? bahan(n, s) : bahan, o);
  });
  return { objs, ids, semua: ids.flat() };
}

/** Geser benda (x dan y asal) agar susunan dapat diurai atau dipindah. */
export const geser = (objs: Obj[], dx: number, dy: number): Obj[] => objs.map((o) => ({ ...o, x: (o.x ?? 0) + dx, y: (o.y ?? 0) + dy }));
export const geserKe = (ids: string[], objs: Obj[], dx: number, dy: number): (Partial<Obj> & { id: string })[] =>
  ids.map((id) => {
    const o = objs.find((q) => q.id === id) as Obj;
    return { id, x: (o.x ?? 0) + dx, y: (o.y ?? 0) + dy };
  });
export const redup = (objs: Obj[], op: number): Obj[] => objs.map((o) => ({ ...o, op }));

/* ------------------------------ Bentuk bantu bab ------------------------------ */

/** Peta kecil beralamat: kolom A sampai E, baris 1 sampai 3. */
export function petaKecil(x: number, y: number, w: number, h: number): Obj[] {
  const cw = w / 5;
  const ch = h / 3;
  const objs: Obj[] = [kotak("pt-b", x, y, w, h, "#ECFCCB", W.hijau, { rx: 4, tebal: 1.6 })];
  for (let i = 1; i < 5; i += 1) objs.push(garis(`pt-v${i}`, x + i * cw, y, 0, h, W.hijau, 0.8));
  for (let i = 1; i < 3; i += 1) objs.push(garis(`pt-h${i}`, x, y + i * ch, w, 0, W.hijau, 0.8));
  "ABCDE".split("").forEach((c, i) => objs.push(teks(`pt-c${i}`, x + cw * (i + 0.5), y + h + 9, c, 8)));
  [3, 2, 1].forEach((n, i) => objs.push(teks(`pt-r${n}`, x - 7, y + ch * (i + 0.5) + 3, String(n), 8)));
  return objs;
}
export const petakC2 = (x: number, y: number, w: number, h: number): Obj[] => [kotak("pt-sel", x + (w / 5) * 2, y + h / 3, w / 5, h / 3, "#FCA5A5", W.merah, { rx: 2, tebal: 1.6 }), bulat("pt-dot", x + (w / 5) * 2.5, y + h / 2, 3.2, W.merah, W.putih)];

/** Fort Rotterdam tampak depan: badan balok dengan atap prisma segitiga. */
export function fortDepan(id: string, x: number, y: number, w: number, h: number, atap: number, o: Opsi = {}): Obj[] {
  return [
    kotak(`${id}-b`, x, y + atap, w, h, "#FDE68A", W.coklat, { rx: 1, tebal: 1.6, ...o }),
    jalur(`${id}-t`, x, y + atap, `M0 0 L${w / 2} ${-atap} L${w} 0 Z`, "#B45309", W.coklat, { tebal: 1.6, ...o }),
  ];
}
