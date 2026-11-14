import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 5 Sub-Bab A (ciri-ciri bangun datar, termasuk pembuka bab): segitiga dan segiempat dengan titik sudut yang tepat
 * (sama kaki, sama sisi, sembarang, lancip, siku-siku, tumpul, jajargenjang, persegi panjang, belah ketupat, persegi, layang-layang, trapesium,
 * segiempat sembarang, segi banyak beraturan dan tak beraturan), tanda siku, papan paku, tabel, dan kartu. Berkas ini TIDAK dipakai bab lain.
 * Semua fungsi mengembalikan data benda (Obj) untuk mesin Story. Bentuk bernama `id@nama` supaya uji bisa memeriksa ciri geometrinya.
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
  lavender: "#EDE9FE",
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const jalur = (id: string, x: number, y: number, d: string, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "jalur", x, y, d, warna, garis: garisW, tebal: 1.4, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 8.6, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Tabel sederhana: baris pertama kepala. Id sel `${id}-s{r}{c}` (kotak) dan `${id}-t{r}{c}` (teks). */
export function tabel(id: string, x: number, y: number, kolW: number[], baris: string[][], tinggi = 16, u = 8, warnaKepala: string = W.krem, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  baris.forEach((b, r) => {
    let px = x;
    b.forEach((sel, c) => {
      out.push(kotak(`${id}-s${r}${c}`, px, y + r * tinggi, kolW[c], tinggi, r === 0 ? warnaKepala : W.putih, W.biru, { rx: 0, tebal: 1, ...o }));
      if (sel) out.push(teks(`${id}-t${r}${c}`, px + kolW[c] / 2, y + r * tinggi + tinggi / 2 + u * 0.35, sel, u, r === 0 || c === 0 ? W.biru : W.hijau, o));
      px += kolW[c];
    });
  });
  return out;
}

/** Id semua benda (kotak dan teks) satu baris tabel. */
export const idBaris = (id: string, r: number, kolom: number): string[] => Array.from({ length: kolom }, (_, c) => [`${id}-s${r}${c}`, `${id}-t${r}${c}`]).flat();

/* ------------------------------ Bentuk bangun datar ------------------------------ */

export type Titik = [number, number];
const f1 = (n: number): string => n.toFixed(1);

/** Segi banyak beraturan n sisi berjari-jari r, titik pertama di puncak, pusat (r, r). */
export function beraturan(n: number, r: number): Titik[] {
  return Array.from({ length: n }, (_, i) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / n;
    return [r + r * Math.cos(a), r + r * Math.sin(a)] as Titik;
  });
}

/**
 * Titik sudut tiap bangun (piksel, pojok kiri-atas kotak pembatas di (0, 0)). Dipakai gambar dan diperiksa uji (sisi, sudut, sejajar, diagonal).
 * Sama kaki: dua sisi sama. Sama sisi: tiga sisi sama. Sembarang: tiga sisi berbeda. Lancip, siku-siku, tumpul: menurut jenis sudutnya.
 * Layang-layang: diagonal AC tegak, BD mendatar, berpotongan di O (24, 24) dengan OB = OD = 20.
 */
export const BANGUN = {
  "sama-kaki": [[25, 0], [50, 46], [0, 46]],
  "sama-sisi": [[25, 0], [50, 43.3], [0, 43.3]],
  sembarang: [[12, 0], [56, 40], [0, 46]],
  lancip: [[14, 0], [56, 44], [0, 44]],
  siku: [[0, 0], [0, 44], [56, 44]],
  tumpul: [[30, 0], [70, 20], [0, 20]],
  jajar: [[14, 0], [60, 0], [46, 36], [0, 36]],
  perpanjang: [[0, 0], [56, 0], [56, 36], [0, 36]],
  belah: [[28, 0], [56, 22], [28, 44], [0, 22]],
  persegi: [[0, 0], [40, 0], [40, 40], [0, 40]],
  layang: [[24, 0], [44, 24], [24, 60], [4, 24]],
  trapesium: [[14, 0], [40, 0], [56, 34], [0, 34]],
  "trapesium-siku": [[0, 0], [26, 0], [56, 34], [0, 34]],
  "trapesium-sama-kaki": [[24, 0], [72, 0], [96, 72], [0, 72]],
  segiempat: [[20, 0], [60, 12], [44, 46], [0, 28]],
  segilima: beraturan(5, 24),
  segienam: beraturan(6, 24),
  segidelapan: beraturan(8, 24),
  "tak-beraturan": [[0, 0], [24, 0], [44, 18], [24, 36], [0, 36], [18, 18]],
} satisfies Record<string, Titik[]>;

export type NamaBangun = keyof typeof BANGUN;

const skalaTitik = (p: Titik[], s: number): Titik[] => p.map((t) => [t[0] * s, t[1] * s] as Titik);

/** Bangun tertutup bernama; id jadi `${id}@${nama}`. Titik asal (x, y) = pojok kiri-atas kotak pembatas, `s` = skala. */
export const bentuk = (id: string, x: number, y: number, nama: NamaBangun, warna: string, s = 1, o: Opsi = {}): Obj => {
  const p = skalaTitik(BANGUN[nama], s);
  return jalur(`${id}@${nama}`, x, y, `${p.map((t, i) => `${i === 0 ? "M" : "L"}${f1(t[0])} ${f1(t[1])}`).join(" ")} Z`, warna, W.biru, { tebal: 1.8, ...o });
};

/** Setengah lingkaran berjari-jari r (dipakai untuk contoh bukan segi banyak), pojok kiri-atas kotak pembatas di (x, y). Dihampiri dengan banyak titik. */
export function setengahLingkaran(id: string, x: number, y: number, r: number, warna: string): Obj {
  const t = Array.from({ length: 13 }, (_, i) => {
    const a = Math.PI - (Math.PI * i) / 12;
    return `${i === 0 ? "M" : "L"}${f1(r + r * Math.cos(a))} ${f1(r - r * Math.sin(a))}`;
  });
  const d = `${t.join(" ")} Z`;
  return jalur(id, x, y, d, warna, W.biru, { tebal: 1.8 });
}

/** Kurva terbuka: tiga sisi lurus yang tidak tertutup (tanpa sisi keempat). Pojok kiri-atas (x, y), lebar w, tinggi h. */
export const kurvaTerbuka = (id: string, x: number, y: number, w: number, h: number, warna: string = W.merah): Obj => jalur(id, x, y, `M0 0 L0 ${f1(h)} L${f1(w)} ${f1(h)} L${f1(w)} 0`, "none", warna, { tebal: 2.2 });

/** Garis tebal sepanjang sisi ke-`i` bangun (dari titik i ke titik i+1), untuk menyorot sisi. */
export function sisiGaris(id: string, x: number, y: number, nama: NamaBangun, i: number, warna: string = W.merah, s = 1, tebal = 3.2): Obj {
  const p = skalaTitik(BANGUN[nama], s);
  const a = p[i];
  const b = p[(i + 1) % p.length];
  return garis(id, x + a[0], y + a[1], b[0] - a[0], b[1] - a[1], warna, tebal);
}

/** Tanda siku kecil di titik sudut (cx, cy): dua garis pendek searah `u` dan `v` (vektor satuan) sepanjang `s`. */
export const tandaSiku = (id: string, cx: number, cy: number, u: Titik, v: Titik, s = 6, warna: string = W.merah): Obj =>
  jalur(id, cx, cy, `M${f1(u[0] * s)} ${f1(u[1] * s)} L${f1((u[0] + v[0]) * s)} ${f1((u[1] + v[1]) * s)} L${f1(v[0] * s)} ${f1(v[1] * s)}`, "none", warna, { tebal: 1.6 });

/** Titik sudut bangun pada kanvas (untuk menaruh tanda atau label): titik ke-`i` setelah digeser (x, y) dan diskala `s`. */
export const titikBangun = (x: number, y: number, nama: NamaBangun, i: number, s = 1): Titik => [x + BANGUN[nama][i][0] * s, y + BANGUN[nama][i][1] * s];

/** Papan paku: kisi paku `kol` kali `bar` dengan jarak `jr`, titik kiri-atas (x, y). Id paku `${id}-p{baris}-{kolom}`. */
export function papanPaku(id: string, x: number, y: number, kol: number, bar: number, jr: number): Obj[] {
  const out: Obj[] = [kotak(`${id}-bd`, x - 8, y - 8, (kol - 1) * jr + 16, (bar - 1) * jr + 16, "#FDE68A", W.coklat, { rx: 3, tebal: 1.2 })];
  for (let r = 0; r < bar; r += 1) for (let c = 0; c < kol; c += 1) out.push(bulat(`${id}-p${r}-${c}`, x + c * jr, y + r * jr, 1.6, W.coklat, undefined));
  return out;
}
