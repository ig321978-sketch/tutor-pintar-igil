import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 6 Bab 1 Sub-Bab A (Perkalian Pecahan): lajur kebun, ember, tangki, pecahan bertingkat, dan tabel.
 * Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
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
  daun: "#86EFAC",
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  air: "#38BDF8",
  jingga: "#FDBA74",
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const jalur = (id: string, x: number, y: number, d: string, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "jalur", x, y, d, warna, garis: garisW, tebal: 1.2, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Balon kata satu atau beberapa baris, titik tengah (cx, y). */
export function balon(id: string, cx: number, y: number, baris: string[], lebar: number, warna: string = W.putih, u = 7, o: Opsi = {}): Obj[] {
  const tinggi = baris.length * (u + 2.4) + 6;
  return [kotak(`${id}-k`, cx - lebar / 2, y, lebar, tinggi, warna, W.biru, { rx: 6, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, cx, y + 4 + (i + 1) * (u + 1.8), b, u, W.biru, o))];
}

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 8.6, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Pecahan bertingkat: pembilang, garis, penyebut, titik tengah (x, y) di garis pecahan. */
export function frac(id: string, x: number, y: number, a: string | number, b: string | number, u = 11, warna: string = W.biru, o: Opsi = {}): Obj[] {
  const lebar = Math.max(String(a).length, String(b).length) * u * 0.6 + 5;
  return [
    teks(`${id}-a`, x, y - 2.5, String(a), u, warna, o),
    garis(`${id}-g`, x - lebar / 2, y, lebar, 0, warna, 1.4, o),
    teks(`${id}-b`, x, y + u * 0.95 + 1, String(b), u, warna, o),
  ];
}

/** Ember kecil atau besar: badan trapesium dan tali. Titik asal di bibir ember. */
export function ember(id: string, x: number, y: number, warna: string, s = 1, o: Opsi = {}): Obj[] {
  return [
    jalur(`${id}-t`, x, y, `M${-7 * s} ${-1 * s} Q0 ${-9 * s} ${7 * s} ${-1 * s}`, "none", W.hitam, { tebal: 1, ...o }),
    jalur(`${id}-b`, x, y, `M${-8 * s} 0 L${8 * s} 0 L${6 * s} ${13 * s} L${-6 * s} ${13 * s} Z`, warna, W.hitam, { tebal: 1, ...o }),
  ];
}

/** Petak kebun 1 meter persegi dari `n` lajur datar (atas ke bawah), id lajur `${id}-0` dst. Semua kosong di awal. */
export function lajur(id: string, x: number, y: number, w: number, tinggiLajur: number, n: number, warna: string = W.putih, o: Opsi = {}): Obj[] {
  return Array.from({ length: n }, (_, i) => kotak(`${id}-${i}`, x, y + i * (tinggiLajur + 1.5), w, tinggiLajur, warna, W.hijau, { rx: 2, tebal: 1.1, ...o }));
}

/** Daftar id lajur dari nomor `dari` sampai `sampai` (termasuk). */
export const idLajur = (id: string, dari: number, sampai: number): string[] => Array.from({ length: sampai - dari + 1 }, (_, i) => `${id}-${dari + i}`);

/** Tangki air bersekat: `bagian` ruas sama, `isi` ruas terbawah berair. */
export function tangki(id: string, x: number, y: number, w: number, h: number, bagian: number, isi: number, o: Opsi = {}): Obj[] {
  const t = h / bagian;
  return Array.from({ length: bagian }, (_, i) => kotak(`${id}-r${i}`, x, y + i * t, w, t, i >= bagian - isi ? W.air : W.putih, W.hitam, { rx: 0, tebal: 1.2, ...o }));
}

/** Tabel: baris pertama judul. Setiap sel punya id `${id}-s{baris}{kolom}` (kotak) dan `${id}-t{baris}{kolom}` (teks, bila tidak kosong). */
export function tabel(id: string, x: number, y: number, kolW: number, baris: string[][], u = 9, tinggi = 20, warnaJudul: string = W.langit): Obj[] {
  const out: Obj[] = [];
  baris.forEach((b, r) => {
    b.forEach((sel, c) => {
      out.push(kotak(`${id}-s${r}${c}`, x + c * kolW, y + r * tinggi, kolW, tinggi, r === 0 ? warnaJudul : W.putih, W.biru, { rx: 0, tebal: 1 }));
      if (sel) out.push(teks(`${id}-t${r}${c}`, x + c * kolW + kolW / 2, y + r * tinggi + tinggi * 0.68, sel, u));
    });
  });
  return out;
}

/** Pohon mangga dalam petak: kisi `kolom` x `baris`, id petak `${id}-{baris}-{kolom}` (kotak) dan `${id}-e{baris}-{kolom}` (pohon). */
export function kebunMangga(id: string, x: number, y: number, kolom: number, baris: number, sel = 28): Obj[] {
  const out: Obj[] = [];
  for (let r = 0; r < baris; r += 1) for (let c = 0; c < kolom; c += 1) {
    out.push(kotak(`${id}-${r}-${c}`, x + c * sel, y + r * sel, sel, sel, W.putih, W.coklat, { rx: 2, tebal: 1 }));
    out.push(emo(`${id}-e${r}-${c}`, x + c * sel + sel / 2, y + r * sel + sel * 0.74, "🌳", sel * 0.7));
  }
  return out;
}

/** Id semua petak dalam baris `r` kisi kebunMangga. */
export const idBarisMangga = (id: string, r: number, kolom: number): string[] => Array.from({ length: kolom }, (_, c) => `${id}-${r}-${c}`);

/** Baris emoji kecil berjarak sama. */
export const deretEmo = (id: string, x: number, y: number, n: number, e: string, jarak: number, u = 16): Obj[] => Array.from({ length: n }, (_, i) => emo(`${id}${i}`, x + i * jarak, y, e, u));
