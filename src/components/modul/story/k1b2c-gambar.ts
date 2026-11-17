import type { Obj } from "./logika-story";
import { E as E_B, W, kotak, teks } from "./k1b2b-gambar";

/**
 * Gambar khusus Story Kelas 1 Bab 2 Sub-Bab C "Pesanan Tetangga" (soal cerita penjumlahan), akhir cerita Kebun Sayur Mamah.
 * Memakai ulang gambar Sub-Bab A dan B, ditambah: gelembung pesan suara dengan kata yang bisa disorot, tangga langkah soal cerita,
 * dan kantong pesanan berlabel. Pesan: kotak `${id}-k` dan kata `${id}-w{i}` (satu kata satu teks, supaya bilangan bisa disorot).
 */

export { W, bulat, emo, garis, judul, kartu, kotak, orang, teks, wajah, deret, deretEmo, panahObj, kalimat, label, bedengSepuluh, petak, pagar, lompat, xPagar, kantong, diKantong, type Titik } from "./k1b2b-gambar";

export const E = { ...E_B, ponsel: "\u{1F4F1}", balon: "\u{1F388}", sendok: "\u{1F944}", kaca: "\u{1F50D}", konfeti: "\u{1F38A}" } as const;

/** Lebar kira-kira satu kata (huruf tebal) dengan ukuran u. */
const lebarKata = (s: string, u: number): number => s.length * u * 0.58;

/**
 * Gelembung pesan berisi kalimat, dipecah per kata dan dibungkus ke baris selebar `w`. Kata ke-i: teks `${id}-w{i}`.
 * Pojok kiri-atas (x, y). Mengembalikan benda dan jumlah baris.
 */
export function pesan(id: string, x: number, y: number, w: number, isi: string, u = 9.6, warna: string = W.putih): Obj[] {
  const kata = isi.split(/\s+/).filter(Boolean);
  const out: Obj[] = [];
  const spasi = u * 0.4;
  let cx = x + 8;
  let baris = 0;
  kata.forEach((k, i) => {
    const lk = lebarKata(k, u);
    if (cx + lk > x + w - 8 && cx > x + 8) {
      baris += 1;
      cx = x + 8;
    }
    out.push(teks(`${id}-w${i}`, cx, y + 16 + baris * (u + 5), k, u, W.biru, { anchor: "start" }));
    cx += lk + spasi;
  });
  out.unshift(kotak(`${id}-k`, x, y, w, 16 + (baris + 1) * (u + 5) - u + 6, warna, W.biru, { rx: 10, tebal: 1.8, z: -1 }));
  return out;
}
/** Nomor kata dalam isi pesan (mulai 0) yang persis sama dengan `kata` (tanpa tanda baca). */
export const kataKe = (isi: string, kata: string, n = 1): number => {
  const ks = isi.split(/\s+/).filter(Boolean).map((s) => s.toLowerCase().replace(/[^a-z0-9]/g, ""));
  let c = 0;
  for (let i = 0; i < ks.length; i += 1)
    if (ks[i] === kata) {
      c += 1;
      if (c === n) return i;
    }
  throw new Error(`kata "${kata}" tidak ada dalam pesan: ${isi}`);
};
