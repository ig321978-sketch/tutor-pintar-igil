import type { Aksi, Obj } from "./logika-story";
import { bersih, tambah } from "./k4b2e-bantu";

/**
 * Gambar khusus Story Kelas 4 Bab 2 Sub-Bab E (pecahan desimal perseratusan dan persen, penutup bab): kisi seratus kotak (satu kotak 1 persen),
 * rantai pecahan, desimal, dan persen, panah pengali pecahan senilai, dan geseran tanda koma. Berkas ini TIDAK dipakai bab lain.
 * Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
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
};

type Opsi = Partial<Obj>;
type At = string | number | undefined;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });
export const jalur = (id: string, x: number, y: number, d: string, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "jalur", x, y, d, warna, garis: garisW, tebal: 1.2, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

const r1 = (n: number): number => Math.round(n * 10) / 10;

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). Id `${id}-k` dan `${id}-t{n}`. */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 8.6, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Tabel sederhana: baris pertama kepala. Id sel `${id}-s{r}{c}` (kotak) dan `${id}-t{r}{c}` (teks). */
export function tabel(id: string, x: number, y: number, kolW: number[], baris: string[][], tinggi = 16, u = 8, warnaKepala: string = W.krem, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  baris.forEach((b, r) => {
    let px = x;
    b.forEach((isi, c) => {
      out.push(kotak(`${id}-s${r}${c}`, px, y + r * tinggi, kolW[c], tinggi, r === 0 ? warnaKepala : W.putih, W.biru, { rx: 0, tebal: 1, ...o }));
      if (isi) out.push(teks(`${id}-t${r}${c}`, px + kolW[c] / 2, y + r * tinggi + tinggi / 2 + u * 0.35, isi, u, W.biru, o));
      px += kolW[c];
    });
  });
  return out;
}

/** Benda sebuah baris tabel (kotak dan teks) menurut nomor baris, untuk dimunculkan satu per satu. */
export const barisTabel = (objs: Obj[], id: string, r: number): Obj[] => objs.filter((o) => new RegExp(`^${id}-[st]${r}[0-9]$`).test(o.id));

/** Id semua benda dari daftar (untuk hapus atau ubah sekaligus). */
export const idDari = (objs: Obj[]): string[] => objs.map((o) => o.id);

export type ItemDaftar = { at: At; t: string; w?: string; u?: number };

/** Layar daftar kartu selebar kanvas (bersih lalu judul lalu kartu satu per satu). Id kartu `${id}{n}-k` dan `${id}{n}-t0`. */
export function daftar(id: string, jud: string, items: ItemDaftar[], o: { x?: number; y?: number; lebar?: number; tinggi?: number; jarak?: number; warnaJudul?: string } = {}): Aksi[] {
  const x = o.x ?? 12;
  const y = o.y ?? 34;
  const lebar = o.lebar ?? 276;
  const tinggi = o.tinggi ?? (items.length <= 4 ? 30 : 26);
  const jarak = o.jarak ?? 8;
  return [bersih(0), tambah(0, judul(jud, o.warnaJudul)), ...items.map((it, i) => tambah(it.at, ...kartu(`${id}${i}`, x, y + i * (tinggi + jarak), lebar, tinggi, it.w ?? W.krem, [it.t], it.u ?? 9)))];
}

/* ------------------------------ Kisi seratus kotak ------------------------------ */

/**
 * Kisi 10 x 10 kotak berukuran c piksel berpojok kiri-atas (x, y); n kotak pertama (baris demi baris dari kiri-atas) digelapkan, n paling banyak 100.
 * Bingkai `${id}-fr`, garis kisi `${id}-g`, kotak gelap `${id}-d` (satu lintasan, satu subpath tertutup Z tiap kotak gelap).
 */
export function kisi100(id: string, x: number, y: number, c: number, n: number, warna = "#1565C0"): Obj[] {
  const gk: string[] = [];
  for (let i = 1; i < 10; i += 1) gk.push(`M${r1(i * c)} 0 L${r1(i * c)} ${r1(10 * c)}`, `M0 ${r1(i * c)} L${r1(10 * c)} ${r1(i * c)}`);
  const sel: string[] = [];
  for (let q = 0; q < n; q += 1) {
    const a = q % 10;
    const b = Math.floor(q / 10);
    sel.push(`M${r1(a * c)} ${r1(b * c)} L${r1((a + 1) * c)} ${r1(b * c)} L${r1((a + 1) * c)} ${r1((b + 1) * c)} L${r1(a * c)} ${r1((b + 1) * c)} Z`);
  }
  const out: Obj[] = [kotak(`${id}-fr`, x, y, 10 * c, 10 * c, W.putih, W.hitam, { rx: 0, tebal: 1 }), jalur(`${id}-g`, x, y, gk.join(" "), "none", "#58B0E3", { tebal: 0.4 })];
  if (n > 0) out.push(jalur(`${id}-d`, x, y, sel.join(" "), warna, "#0D47A1", { tebal: 0.4 }));
  return out;
}

/** Beberapa kisi seratus berdampingan untuk persen di atas seratus: setiap kisi penuh 100, sisanya di kisi terakhir. Kisi `${id}0`, `${id}1`, ... */
export function kisiPersen(id: string, x: number, y: number, c: number, persen: number, jarak = 8): Obj[] {
  const out: Obj[] = [];
  let sisa = persen;
  for (let i = 0; sisa > 0; i += 1) {
    const isi = Math.min(100, sisa);
    out.push(...kisi100(`${id}${i}`, r1(x + i * (10 * c + jarak)), y, c, isi));
    sisa -= isi;
  }
  return out;
}

/* ------------------------------ Geseran tanda koma ------------------------------ */

/**
 * Bilangan desimal ditulis per karakter (kotak kecil per angka dan koma) lengkap dengan dua busur geseran koma. Karakter `${id}-c{i}`.
 * (x, y) pojok kiri-atas karakter pertama; lebar karakter `cw`.
 */
export function angkaKarakter(id: string, x: number, y: number, isi: string, cw: number, u = 14, warna: string = W.biru): Obj[] {
  return [...isi].map((ch, i) => teks(`${id}-c${i}`, r1(x + i * cw + cw / 2), y, ch, u, ch === "," ? W.merah : warna));
}

/* ------------------------------ Rantai kesetaraan ------------------------------ */

/** Tiga bagian rantai kesetaraan sebaris (misalnya `0,35`, `= 35/100`, `= 35%`): teks `${id}-r1`, `${id}-r2`, `${id}-r3`. */
export function rantai(id: string, y: number, bagian: [string, string, string], u = 16, warna: [string, string, string] = [W.biru, W.biru, W.hijau]): Obj[] {
  const xs = [62, 150, 240];
  return bagian.map((b, i) => teks(`${id}-r${i + 1}`, xs[i], y, b, u, warna[i]));
}
