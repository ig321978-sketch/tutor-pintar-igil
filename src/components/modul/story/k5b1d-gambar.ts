import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 1 Sub-Bab D (operasi hitung pada bilangan cacah sampai 100.000): hitung bersusun (penjumlahan dan pengurangan),
 * tabel nilai tempat, dan uang. Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
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
  kayu: "#D6A15B",
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
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

/** Id semua benda dari daftar (untuk hapus atau ubah sekaligus). */
export const idDari = (objs: Obj[]): string[] => objs.map((o) => o.id);

/** Bilangan dengan titik pemisah ribuan seperti di buku: 57500 menjadi "57.500". */
export const fmt = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
/** Uang seperti di buku: "Rp57.500". */
export const rp = (n: number): string => `Rp${fmt(n)}`;

/* ------------------------------ Tabel nilai tempat (Buku Siswa hlm. 18, Cara Lukas) ------------------------------ */

export const KEPALA_NILAI_TEMPAT = ["Puluh Ribuan", "Ribuan", "Ratusan", "Puluhan", "Satuan"];
const digitKolom = (n: number): string[] => String(n).padStart(5, "0").split("");

/**
 * Tabel nilai tempat lima kolom (puluh ribuan sampai satuan) dengan baris `baris` [nama, bilangan]. Sel angka tanpa nol di depan.
 * Id sel `${id}-s{r}{c}` dan teks `${id}-t{r}{c}` (kolom 0 = nama baris, kolom 1 sampai 5 = puluh ribuan sampai satuan).
 */
export function tabelNilaiTempat(id: string, x: number, y: number, baris: [nama: string, n: number][], kepala = true): Obj[] {
  const isi: string[][] = [];
  if (kepala) isi.push(["", ...KEPALA_NILAI_TEMPAT]);
  for (const [nama, n] of baris) {
    const d = digitKolom(n);
    const mulai = d.findIndex((c) => c !== "0");
    isi.push([nama, ...d.map((c, i) => (i >= mulai ? c : ""))]);
  }
  return tabel(id, x, y, [38, 50, 50, 50, 50, 50], isi, 17, 7, W.krem).map((o) => (o.t === "teks" && o.u === 7 && Number.isNaN(Number(o.isi)) ? { ...o, u: o.isi && o.isi.length > 8 ? 6.4 : 7 } : o));
}

/* ------------------------------ Hitung bersusun pendek (penjumlahan dan pengurangan) ------------------------------ */

export const LEBAR_KOLOM = 13;
export const TINGGI_BARIS = 17;

export type Susun = {
  /** Semua benda: operator, garis, angka atas dan bawah, angka hasil, dan tanda simpan atau pinjam. */
  semua: Obj[];
  atas: Obj[];
  bawah: Obj[];
  /** Operator dan garis pemisah. */
  alat: Obj[];
  /** Per kolom dari satuan (indeks 0): angka hasil dan tanda yang muncul saat kolom itu dihitung. */
  kolom: { hasil: Obj[]; tanda: Obj[] }[];
};

/** Hitung bersusun: hasil, dan untuk tiap kolom (dari satuan) tanda simpan (penjumlahan) atau pinjam (pengurangan). */
export function hitungSusun(op: "+" | "−", a: number, b: number): { hasil: number; digit: number[]; simpan: boolean[]; pinjam: boolean[] } {
  const hasil = op === "+" ? a + b : a - b;
  const da = String(a).split("").reverse().map(Number);
  const db = String(b).split("").reverse().map(Number);
  const n = Math.max(da.length, db.length, String(hasil).length);
  const digit: number[] = [];
  const simpan: boolean[] = [];
  const pinjam: boolean[] = [];
  let bawa = 0;
  for (let i = 0; i < n; i += 1) {
    const x = da[i] ?? 0;
    const y = db[i] ?? 0;
    if (op === "+") {
      const s = x + y + bawa;
      digit.push(s % 10);
      bawa = Math.floor(s / 10);
      simpan.push(bawa > 0);
      pinjam.push(false);
    } else {
      let s = x - bawa - y;
      const p = s < 0;
      if (p) s += 10;
      digit.push(s);
      bawa = p ? 1 : 0;
      pinjam.push(p);
      simpan.push(false);
    }
  }
  return { hasil, digit, simpan, pinjam };
}

/**
 * Hitung bersusun dengan angka satu per satu. Pusat kisi (x, ...) dan garis dasar baris pertama y. Id: `${id}-a{i}` (angka atas), `${id}-b{i}` (bawah),
 * `${id}-r{i}` (hasil), `${id}-op`, `${id}-ln`, tanda `${id}-m{i}` (simpan: angka 1 merah di atas kolom i+1; pinjam: +10 di kolom i dan −1 di kolom i+1). i = 0 satuan.
 */
export function susun(id: string, x: number, y: number, op: "+" | "−", a: number, b: number, o: Opsi = {}): Susun {
  const h = hitungSusun(op, a, b);
  const n = h.digit.length;
  const u = 13;
  const kiri = x - (n * LEBAR_KOLOM) / 2;
  const kx = (i: number): number => kiri + (n - 1 - i) * LEBAR_KOLOM + LEBAR_KOLOM / 2;
  const y1 = y + TINGGI_BARIS;
  const yl = y1 + 5;
  const y2 = y1 + TINGGI_BARIS + 3;
  const da = String(a).split("").reverse();
  const db = String(b).split("").reverse();
  const dh = String(h.hasil).split("").reverse();
  const atas = da.map((c, i) => teks(`${id}-a${i}`, kx(i), y, c, u, W.biru, o));
  const bawah = db.map((c, i) => teks(`${id}-b${i}`, kx(i), y1, c, u, W.biru, o));
  const alat = [teks(`${id}-op`, kiri - 9, y1, op, u, W.merah, o), garis(`${id}-ln`, kiri - 16, yl, n * LEBAR_KOLOM + 16, 0, W.biru, 1.6, o)];
  const kolom = Array.from({ length: n }, (_, i): { hasil: Obj[]; tanda: Obj[] } => {
    const tanda: Obj[] = [];
    const yTanda = y - 13;
    if (h.simpan[i] && i + 1 < n) tanda.push(teks(`${id}-m${i}`, kx(i + 1), yTanda, "1", 7.5, W.merah, o));
    if (h.pinjam[i]) {
      tanda.push(teks(`${id}-m${i}`, kx(i), yTanda, "+10", 7.5, W.merah, o));
      if (i + 1 < n) tanda.push(teks(`${id}-m${i}k`, kx(i + 1), yTanda, "−1", 7.5, W.merah, o));
    }
    const hasil = i < dh.length ? [teks(`${id}-r${i}`, kx(i), y2, dh[i], u, W.hijau, o)] : [];
    return { hasil, tanda };
  });
  return { semua: [...atas, ...bawah, ...alat, ...kolom.flatMap((c) => [...c.tanda, ...c.hasil])], atas, bawah, alat, kolom };
}

/** Benda hasil bersusun untuk kolom `dari` sampai `sampai` (indeks dari satuan, ujung termasuk), tanda dahulu lalu angka hasil. */
export function kolomSusun(s: Susun, dari: number, sampai = dari): Obj[] {
  return s.kolom.slice(dari, sampai + 1).flatMap((c) => [...c.tanda, ...c.hasil]);
}

/** Judul kecil di atas kisi bersusun: bilangan lengkap dengan operasinya, misalnya "57.500 + 22.000". */
export const kalimat = (id: string, x: number, y: number, a: number, op: "+" | "−" | "×" | "÷", b: number, hasil?: number, u = 10, warna: string = W.hitam, o: Opsi = {}): Obj =>
  teks(id, x, y, `${fmt(a)} ${op} ${fmt(b)}${hasil === undefined ? "" : ` = ${fmt(hasil)}`}`, u, warna, o);
