import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 6 Bab 1 Sub-Bab C (Bilangan Desimal): kisi persen, pita bagian, pecahan bertingkat, tabel nilai tempat, dan garis bilangan.
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
  jeruk: "#FB923C",
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  mint: "#DCFCE7",
  mawar: "#FCE7F3",
  arsir: "#FDBA74",
  arsir2: "#93C5FD",
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Balon kata satu atau dua baris, titik tengah (cx, y). */
export function balon(id: string, cx: number, y: number, baris: string[], lebar: number, warna: string = W.putih, u = 6.8): Obj[] {
  const tinggi = baris.length * (u + 2.4) + 5;
  return [kotak(`${id}-k`, cx - lebar / 2, y, lebar, tinggi, warna, W.biru, { rx: 5 }), ...baris.map((b, i) => teks(`${id}-t${i}`, cx, y + 3 + (i + 1) * (u + 1.8), b, u))];
}

/** Kartu berjudul: kotak berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 8.6): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8 }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u))];
}

/** Pecahan bertingkat: pembilang, garis, penyebut; titik tengah (cx, cy) pada garis pecahan. */
export function pecahan(id: string, cx: number, cy: number, atas: string, bawah: string, u = 13, warna: string = W.biru): Obj[] {
  const lebar = Math.max(atas.length, bawah.length) * u * 0.6 + 4;
  return [teks(`${id}-a`, cx, cy - 2.5, atas, u, warna), garis(`${id}-g`, cx - lebar / 2, cy, lebar, 0, warna, 1.4), teks(`${id}-b`, cx, cy + u * 0.95, bawah, u, warna)];
}

/** Benda bertanda untuk mengosongkan sekumpulan id. */
export const idDari = (a: Obj[]): string[] => a.map((o) => o.id);

/* ------------------------------ Kisi persegi bernilai satu ------------------------------ */

/**
 * Persegi bernilai 1 yang dibagi n kolom dan n baris (n = 1 sampai 10). Pojok kiri-atas (x, y), sisi s.
 * Garis pembagi dibuat tipis. Id: `${id}-p` (persegi) dan `${id}-v0..` (garis tegak) dan `${id}-h0..` (garis datar).
 */
export function kisi(id: string, x: number, y: number, s: number, kolom: number, baris: number): Obj[] {
  const out: Obj[] = [kotak(`${id}-p`, x, y, s, s, W.putih, W.biru, { rx: 0, tebal: 1.4 })];
  for (let i = 1; i < kolom; i += 1) out.push(garis(`${id}-v${i}`, x + (s * i) / kolom, y, 0, s, W.abu, 0.6));
  for (let i = 1; i < baris; i += 1) out.push(garis(`${id}-h${i}`, x, y + (s * i) / baris, s, 0, W.abu, 0.6));
  return out;
}

/** Arsiran persegi `kisi` yang berukuran sisi s: dari kolom c0 dan baris b0 selebar c kolom dan setinggi b baris (satuan petak 1/kolom). */
export function arsir(id: string, x: number, y: number, s: number, kolom: number, baris: number, c0: number, b0: number, c: number, b: number, warna: string = W.arsir): Obj {
  return kotak(id, x + (s * c0) / kolom, y + (s * b0) / baris, (s * c) / kolom, (s * b) / baris, warna, W.hijau, { rx: 0, tebal: 0.5, op: 0.85 });
}

/** Pita panjang yang dibagi n bagian sama (pita bernilai 1). Id: `${id}-p`, `${id}-v1..`. */
export function pita(id: string, x: number, y: number, w: number, h: number, n: number): Obj[] {
  const out: Obj[] = [kotak(`${id}-p`, x, y, w, h, W.putih, W.biru, { rx: 0, tebal: 1.4 })];
  for (let i = 1; i < n; i += 1) out.push(garis(`${id}-v${i}`, x + (w * i) / n, y, 0, h, W.abu, 0.7));
  return out;
}

/** Arsiran pita: dari bagian i0 sebanyak m bagian dari n. */
export const arsirPita = (id: string, x: number, y: number, w: number, h: number, n: number, i0: number, m: number, warna: string = W.arsir): Obj => kotak(id, x + (w * i0) / n, y, (w * m) / n, h, warna, W.hijau, { rx: 0, tebal: 0.5, op: 0.85 });

/* ------------------------------ Tabel dan nilai tempat ------------------------------ */

/** Tabel sel: `lebar[c]` lebar kolom, tinggi baris `tb`. Baris pertama diwarnai judul. Id: `${id}-s{r}{c}` dan `${id}-t{r}{c}`. */
export function tabel(id: string, x: number, y: number, lebar: number[], tb: number, baris: string[][], u = 8, warnaJudul: string = W.krem): Obj[] {
  const out: Obj[] = [];
  baris.forEach((b, r) => {
    let kiri = x;
    b.forEach((sel, c) => {
      out.push(kotak(`${id}-s${r}${c}`, kiri, y + r * tb, lebar[c], tb, r === 0 ? warnaJudul : W.putih, W.biru, { rx: 0, tebal: 0.9 }));
      if (sel) out.push(teks(`${id}-t${r}${c}`, kiri + lebar[c] / 2, y + r * tb + tb / 2 + u * 0.35, sel, u));
      kiri += lebar[c];
    });
  });
  return out;
}

/** Garis bilangan mendatar dari (x, y) sepanjang w, dengan tanda dan label pada nilai-nilai yang diberikan. */
export function garisBilangan(id: string, x: number, y: number, w: number, nilai: { v: number; label: string }[], awal: number, akhir: number, u = 7.4): Obj[] {
  const out: Obj[] = [garis(`${id}-g`, x, y, w, 0, W.biru, 1.6)];
  nilai.forEach((n, i) => {
    const px = x + ((n.v - awal) / (akhir - awal)) * w;
    out.push(garis(`${id}-m${i}`, px, y - 4, 0, 8, W.biru, 1.4), teks(`${id}-l${i}`, px, y + 16, n.label, u));
  });
  return out;
}

/** Satu baris tabel (semua sel putih bila `warna` putih) di (x, y). Id: `${id}-s{c}` dan `${id}-t{c}`. */
export function barisTabel(id: string, x: number, y: number, lebar: number[], tb: number, sel: string[], u = 8, warna: string = W.putih): Obj[] {
  const out: Obj[] = [];
  let kiri = x;
  sel.forEach((isi, c) => {
    out.push(kotak(`${id}-s${c}`, kiri, y, lebar[c], tb, warna, W.biru, { rx: 0, tebal: 0.9 }));
    if (isi) out.push(teks(`${id}-t${c}`, kiri + lebar[c] / 2, y + tb / 2 + u * 0.35, isi, u));
    kiri += lebar[c];
  });
  return out;
}
