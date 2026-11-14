import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 1 Sub-Bab B (membandingkan dan mengurutkan bilangan cacah sampai 100.000): papan dakon bernilai,
 * tabel nilai tempat, kartu bilangan, dan garis bilangan. Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
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
  hijauPita: "#86EFAC",
  merahPita: "#F87171",
};

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.4, ...o });
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

/** Id kartu (kotak dan teks) untuk dihapus. */
export const idKartu = (id: string, n = 1): string[] => [`${id}-k`, ...Array.from({ length: n }, (_, i) => `${id}-t${i}`)];

/** Tulisan bilangan dengan titik ribuan, mis. 56560 menjadi "56.560". */
export const lambang = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/** Harga papan dakon pada Eksplorasi 1.2 (Buku Siswa hlm. 10): a, b, c, d. */
export const DAKON = [
  { nama: "a", harga: 56560 },
  { nama: "b", harga: 65750 },
  { nama: "c", harga: 57000 },
  { nama: "d", harga: 75360 },
] as const;

/** Lima angka bilangan (puluh ribuan sampai satuan); bilangan lima angka saja. */
export const limaAngka = (n: number): number[] => String(n).padStart(5, "0").split("").map(Number);

export const NAMA_TEMPAT = ["puluh ribuan", "ribuan", "ratusan", "puluhan", "satuan"] as const;

/**
 * Tabel nilai tempat: satu baris judul tempat dan satu baris per bilangan, mulai (x, y).
 * Kolom label (lebar `lebarLabel`) memuat nama baris, lima kolom angka lebar `cw`.
 * Id: judul `${id}-h${j}`, sel angka `${id}-r${i}c${j}`, teks angka `${id}-r${i}t${j}`, label `${id}-r${i}n`.
 */
export function tabelTempat(id: string, x: number, y: number, baris: { nama: string; n: number }[], cw = 48, lebarLabel = 28, ch = 20, uAngka = 11): Obj[] {
  const out: Obj[] = [];
  NAMA_TEMPAT.forEach((nm, j) => {
    out.push(kotak(`${id}-h${j}`, x + lebarLabel + j * cw, y, cw, 16, W.langit, W.biru, { rx: 0, tebal: 1 }));
    out.push(teks(`${id}-ht${j}`, x + lebarLabel + j * cw + cw / 2, y + 11, nm, 6.6, W.biru));
  });
  baris.forEach((b, i) => {
    const yy = y + 16 + i * ch;
    out.push(teks(`${id}-r${i}n`, x + lebarLabel / 2, yy + ch / 2 + 3.6, b.nama, 10, W.coklat));
    limaAngka(b.n).forEach((d, j) => {
      out.push(kotak(`${id}-r${i}c${j}`, x + lebarLabel + j * cw, yy, cw, ch, W.putih, W.biru, { rx: 0, tebal: 1 }));
      out.push(teks(`${id}-r${i}t${j}`, x + lebarLabel + j * cw + cw / 2, yy + ch / 2 + uAngka * 0.35, String(d), uAngka, W.hitam));
    });
  });
  return out;
}

/** Id sel angka satu kolom (tempat ke-j) pada tabel nilai tempat dengan `nBaris` baris. */
export const selKolom = (id: string, j: number, nBaris: number): string[] => Array.from({ length: nBaris }, (_, i) => `${id}-r${i}c${j}`);

/** Id sel angka satu baris pada tabel nilai tempat. */
export const selBaris = (id: string, i: number): string[] => [0, 1, 2, 3, 4].map((j) => `${id}-r${i}c${j}`);

/** Posisi mendatar bilangan n pada garis bilangan yang membentang dari `dari` ke `sampai` sepanjang `panjang` mulai x. */
export const posisiBil = (x: number, panjang: number, dari: number, sampai: number, n: number): number => x + ((n - dari) / (sampai - dari)) * panjang;

/**
 * Garis bilangan mendatar dari (x, y) sepanjang `panjang`, bilangan `dari` sampai `sampai`, tanda tiap `langkah`, angka di bawah tanda.
 * Id: sumbu `${id}-g`, tanda `${id}-b${i}`, angka `${id}-n${i}`.
 */
export function garisBilangan(id: string, x: number, y: number, panjang: number, dari: number, sampai: number, langkah: number, u = 7.4): Obj[] {
  const out: Obj[] = [garis(`${id}-g`, x, y, panjang, 0, W.hitam, 1.8)];
  const banyak = Math.round((sampai - dari) / langkah);
  for (let i = 0; i <= banyak; i += 1) {
    const px = posisiBil(x, panjang, dari, sampai, dari + i * langkah);
    out.push(garis(`${id}-b${i}`, px, y - 3, 0, 6, W.hitam, 1.3));
    out.push(teks(`${id}-n${i}`, px, y + 15, lambang(dari + i * langkah), u, W.hitam));
  }
  return out;
}

/** Satu baris papan dakon: lingkaran nama, papan, dan harga (Rp...,00). Id `${id}-b`, `${id}-n`, `${id}-p`, `${id}-h`. */
export function barisDakon(id: string, x: number, y: number, nama: string, harga: number, warna: string): Obj[] {
  return [
    bulat(`${id}-b`, x, y, 9, W.biru, W.biru),
    teks(`${id}-n`, x, y + 3.6, nama, 10, W.putih),
    kotak(`${id}-p`, x + 16, y - 11, 148, 22, warna, W.biru, { rx: 11 }),
    teks(`${id}-h`, x + 200, y + 3.4, `Rp${lambang(harga)},00`, 9.6, W.biru),
  ];
}

/**
 * Tabel urutan tiga kolom (No., Papan, Harga) mulai (x, y), lebar 132, satu baris per entri.
 * Id: judul `${id}-h0..2`, teks judul `${id}-ht0..2`, sel `${id}-r${i}c${j}`, teks `${id}-r${i}t${j}`.
 */
export function tabelUrut(id: string, x: number, y: number, baris: { nama: string; harga: number }[], warna: string = W.putih): Obj[] {
  const lebar = [24, 32, 76];
  const kepala = ["No.", "Papan", "Harga"];
  const out: Obj[] = [];
  let xx = x;
  lebar.forEach((w, j) => {
    out.push(kotak(`${id}-h${j}`, xx, y, w, 16, W.langit, W.biru, { rx: 0, tebal: 1 }));
    out.push(teks(`${id}-ht${j}`, xx + w / 2, y + 11, kepala[j], 7.2, W.biru));
    xx += w;
  });
  baris.forEach((b, i) => {
    const yy = y + 16 + i * 20;
    const isi = [String(i + 1), b.nama, lambang(b.harga)];
    let px = x;
    lebar.forEach((w, j) => {
      out.push(kotak(`${id}-r${i}c${j}`, px, yy, w, 20, warna, W.biru, { rx: 0, tebal: 1 }));
      out.push(teks(`${id}-r${i}t${j}`, px + w / 2, yy + 14, isi[j], 9.4, W.hitam));
      px += w;
    });
  });
  return out;
}
