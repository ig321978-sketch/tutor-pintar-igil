import type { Obj } from "./logika-story";

/** Satu pintu impor gambar untuk adegan materi Sub-Bab C, ditambah panah. */
export * from "./k1b1c-gambar";
export const panahObj = (id: string, x: number, y: number, x2: number, y2: number, warna: string): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal: 3 });
