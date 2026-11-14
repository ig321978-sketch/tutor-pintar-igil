import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 2 Sub-Bab A (kelipatan, termasuk pembuka bab): kisi angka (tabel 1 sampai 50 dan 1 sampai 100),
 * lingkaran pemain tepuk bilangan, dan garis lompat. Berkas ini TIDAK dipakai bab lain.
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
  karang: "#F47C62",
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

/* ------------------------------ Data buku ------------------------------ */

/** Kelipatan `n` yang tidak lebih dari `maks` (tanpa nol, sesuai Buku Siswa hlm. 35). */
export const kelipatan = (n: number, maks: number): number[] => Array.from({ length: Math.floor(maks / n) }, (_, i) => (i + 1) * n);

/* ------------------------------ Kisi angka ------------------------------ */

/**
 * Kisi angka berurutan (kolom x baris) mulai dari `mulai`, baris demi baris dari kiri-atas. Sel bernomor n memakai id `${id}-c${n}` (kotak)
 * dan `${id}-t${n}` (angka). `berwarna` memuat nomor sel yang berwarna sejak awal.
 */
export function kisiAngka(id: string, x: number, y: number, cw: number, ch: number, kolom: number, baris: number, berwarna: number[] = [], warna: string = W.karang, u = 8, mulai = 1): Obj[] {
  const out: Obj[] = [];
  for (let i = 0; i < kolom * baris; i += 1) {
    const n = mulai + i;
    const px = x + (i % kolom) * cw;
    const py = y + Math.floor(i / kolom) * ch;
    out.push(kotak(`${id}-c${n}`, px, py, cw, ch, berwarna.includes(n) ? warna : W.putih, W.biru, { rx: 0, tebal: 1 }));
    out.push(teks(`${id}-t${n}`, px + cw / 2, py + ch / 2 + u * 0.35, String(n), u, W.biru));
  }
  return out;
}

/** Titik pusat sel bernomor n pada kisi angka yang dibuat dengan parameter yang sama. */
export const pusatSel = (x: number, y: number, cw: number, ch: number, kolom: number, n: number, mulai = 1): [number, number] => [x + (((n - mulai) % kolom) + 0.5) * cw, y + (Math.floor((n - mulai) / kolom) + 0.5) * ch];

/* ------------------------------ Lingkaran pemain ------------------------------ */

/** Titik pemain ke-i dari `jumlah` pemain pada lingkaran berpusat (cx, cy) berjari-jari r; pemain 0 di atas, searah jarum jam. */
export const titikRing = (cx: number, cy: number, r: number, jumlah: number, i: number): [number, number] => {
  const sudut = -Math.PI / 2 + (i * 2 * Math.PI) / jumlah;
  return [Number((cx + r * Math.cos(sudut)).toFixed(2)), Number((cy + r * Math.sin(sudut)).toFixed(2))];
};

/** Lingkaran pemain: `jumlah` bulatan sama besar tersebar rata. Id `${id}-p{i}`. */
export function ringPemain(id: string, cx: number, cy: number, r: number, jumlah: number, rp = 11, warna: string = W.langit): Obj[] {
  return Array.from({ length: jumlah }, (_, i) => {
    const [px, py] = titikRing(cx, cy, r, jumlah, i);
    return bulat(`${id}-p${i}`, px, py, rp, warna, W.biru, { tebal: 1.3 });
  });
}

/** Angka milik pemain ke-i di lingkaran. Id `${id}-n{i}`. */
export const angkaPemain = (id: string, cx: number, cy: number, r: number, jumlah: number, i: number, isi: string, u = 8.6, warna: string = W.biru): Obj => {
  const [px, py] = titikRing(cx, cy, r, jumlah, i);
  return teks(`${id}-n${i}`, px, py + u * 0.35, isi, u, warna);
};

/* ------------------------------ Garis lompat ------------------------------ */

/**
 * Garis bilangan untuk lompat hitung. Titik 0 ada di x0, satu satuan = `satuan` piksel, garis pada ketinggian y, panjang `maks` satuan.
 * Goresan dan angka hanya di kelipatan `langkah` (termasuk 0). Id: `${id}-g` (garis), `${id}-t{n}` (goresan), `${id}-l{n}` (angka di bawah garis).
 */
export function garisLompat(id: string, x0: number, y: number, satuan: number, maks: number, langkah: number, u = 8): Obj[] {
  const out: Obj[] = [garis(`${id}-g`, x0, y, satuan * maks, 0, W.biru, 2)];
  for (let n = 0; n <= maks; n += langkah) {
    out.push(garis(`${id}-t${n}`, x0 + n * satuan, y - 4, 0, 8, W.biru, 1.6));
    out.push(teks(`${id}-l${n}`, x0 + n * satuan, y + 15, String(n), u, W.biru));
  }
  return out;
}

/** Busur lompatan ke-i (mulai dari 1): dari (i-1) x langkah ke i x langkah. Id `${id}-a{i}`. */
export const busur = (id: string, x0: number, y: number, satuan: number, langkah: number, i: number, warna: string = W.merah, tinggi = 16): Obj => {
  const dx = langkah * satuan;
  return jalur(`${id}-a${i}`, x0 + (i - 1) * dx, y, `M0 0 Q${dx / 2} ${-tinggi} ${dx} 0`, "none", warna, { tebal: 1.8, gambar: true });
};

/** Titik pendaratan lompatan ke-i pada garis. Id `${id}-m{i}`. */
export const pendaratan = (id: string, x0: number, y: number, satuan: number, langkah: number, i: number, warna: string = W.merah): Obj => bulat(`${id}-m${i}`, x0 + i * langkah * satuan, y, 3.6, warna, W.putih, { tebal: 1 });
