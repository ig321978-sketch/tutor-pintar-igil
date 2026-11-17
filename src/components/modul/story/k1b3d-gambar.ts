import type { Obj } from "./logika-story";
import { E as E_C, W, kotak, teks } from "./k1b3c-gambar";

/**
 * Gambar khusus Story Kelas 1 Bab 3 Sub-Bab D "Tiba di Rumah Nenek" (soal cerita pengurangan), akhir cerita Kereta ke Rumah Nenek.
 * Memakai ulang dasar gambar Sub-Bab A sampai C, ditambah: model batang dengan bagian yang dicari, kartu kata kunci, dan rumah Nenek.
 */

export { W, bulat, emo, garis, judul, kartu, kotak, orang, teks, deret, deretEmo, panahObj, label, kalimatC, tambahK, kurangK, KURANG, type Titik } from "./k1b3c-gambar";

export const E = { ...E_C, permen: "\u{1F36C}", teh: "\u{1F375}", pisangGoreng: "\u{1F34C}", rambutan: "\u{1F352}", tetangga: "\u{1F9D3}", senyum: "\u{1F60A}", lingkar: "\u{2B55}" } as const;

/**
 * Model batang: batang utuh `${id}-u` (lebar w) dengan label `${id}-tu` di atas, lalu dua bagian di bawahnya:
 * bagian kiri `${id}-a` selebar wa (label `${id}-ta`) dan bagian kanan `${id}-b` (label `${id}-tb`). Isi "?" digambar putus-putus merah.
 */
export function modelBatang(id: string, x: number, y: number, w: number, wa: number, utuh: string, a: string, b: string): Obj[] {
  const h = 24;
  const bagian = (s: string) => (s === "?" ? { warna: "#FFFFFF", garis: W.merah, putus: true } : { warna: W.langit, garis: W.biru, putus: false });
  const pa = bagian(a);
  const pb = bagian(b);
  return [
    kotak(`${id}-u`, x, y, w, h, W.emas, W.biru, { rx: 3, tebal: 1.8 }),
    teks(`${id}-tu`, x + w / 2, y + 17, utuh, 13, utuh === "?" ? W.merah : W.biru),
    kotak(`${id}-a`, x, y + h + 8, wa, h, pa.warna, pa.garis, { rx: 3, tebal: 1.8, putus: pa.putus }),
    teks(`${id}-ta`, x + wa / 2, y + h + 25, a, 13, a === "?" ? W.merah : W.biru),
    kotak(`${id}-b`, x + wa, y + h + 8, w - wa, h, pb.warna, pb.garis, { rx: 3, tebal: 1.8, putus: pb.putus }),
    teks(`${id}-tb`, x + wa + (w - wa) / 2, y + h + 25, b, 13, b === "?" ? W.merah : W.biru),
  ];
}
