import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 1 Sub-Bab E (Penjumlahan Bilangan Cacah sampai 1.000): tabel susun ratusan-puluhan-satuan dengan tanda simpan,
 * balok satuan dan batang puluhan, garis bilangan dengan lompatan, dan kartu. Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj).
 * Tabel susun bernama `id-h{kolom}` (kepala), `id-s{baris}{kolom}` (sel), `id-d{baris}{kolom}` (angka), `id-m{kolom}` (tanda simpan) supaya uji bisa menghitung ulang jumlahnya dari gambar.
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
  biruMuda: "#2B8FD0",
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

/** Satu baris tabel (kepala bila `kepala`): id sel `${id}-s{kolom}` (kotak) dan `${id}-t{kolom}` (teks). */
export function barisTabel(id: string, x: number, y: number, kolW: number[], isi: string[], tinggi = 16, u = 8, kepala = false, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  let px = x;
  isi.forEach((sel, c) => {
    out.push(kotak(`${id}-s${c}`, px, y, kolW[c], tinggi, kepala ? W.krem : W.putih, W.biru, { rx: 0, tebal: 1, ...o }));
    if (sel) out.push(teks(`${id}-t${c}`, px + kolW[c] / 2, y + tinggi / 2 + u * 0.35, sel, u, kepala || c === 0 ? W.biru : W.hijau, o));
    px += kolW[c];
  });
  return out;
}

/* ------------------------------ Data soal dari Buku Siswa (dihitung ulang di uji) ------------------------------ */

/** Contoh Ayo Mengamati hlm. 28-31: bilangan yang dijumlahkan. */
export const CONTOH = {
  toni: [131, 321],
  buku: [124, 411, 363],
  jeruk: [189, 245],
} as const;
/** Ayo Berlatih nomor 1 (hlm. 32); kunci Panduan Guru hlm. 50 menulis 538, 922 (salah, seharusnya 928), 724. */
export const LATIHAN_SATU: readonly (readonly number[])[] = [
  [333, 205],
  [812, 116],
  [576, 148],
];
export const KUNCI_SATU_BUKU = [538, 922, 724] as const;
/** Ayo Berlatih nomor 2 (hlm. 32-33), a sampai f; kunci Panduan Guru hlm. 51: 581, 423, 719, 957, 227, 816. */
export const LATIHAN_DUA: readonly (readonly number[])[] = [
  [373, 208],
  [277, 146],
  [627, 92],
  [234, 279, 444],
  [49, 178],
  [612, 48, 156],
];
export const KUNCI_DUA_BUKU = [581, 423, 719, 957, 227, 816] as const;
/** Nomor 3 (hlm. 33), a sampai e; kunci Panduan Guru hlm. 52: 852, 448, 919, 839, 786. */
export const LATIHAN_TIGA: readonly (readonly number[])[] = [
  [333, 519],
  [429, 19],
  [821, 98],
  [700, 139],
  [621, 37, 128],
];
export const KUNCI_TIGA_BUKU = [852, 448, 919, 839, 786] as const;
/** Nomor 4 (hlm. 33), a sampai e: soal yang ditarik garis ke jawaban (kunci hlm. 52: a ke 752, b ke 736, c ke 813, d ke 860, e ke 964). */
export const LATIHAN_EMPAT: readonly (readonly number[])[] = [
  [629, 123],
  [377, 330, 29],
  [423, 390],
  [39, 821],
  [690, 56, 218],
];
/** Jawaban di kolom kanan Panduan Guru hlm. 52, urut dari atas. */
export const JAWAB_EMPAT_KANAN = [813, 736, 860, 964, 752] as const;
/** Nomor 5 (hlm. 34 atas), a sampai d; kunci Panduan Guru hlm. 52-53: 907, 464, 248, 277. */
export const LATIHAN_LIMA: readonly (readonly number[])[] = [
  [328, 579],
  [117, 105, 242],
  [121, 29, 98],
  [111, 77, 89],
];
export const KUNCI_LIMA_BUKU = [907, 464, 248, 277] as const;

export const jumlah = (a: readonly number[]): number => a.reduce((s, v) => s + v, 0);

/* ------------------------------ Tabel susun ratusan puluhan satuan ------------------------------ */

export const CW = 32;
export const CH = 18;
const WARNA_KOL = [W.langit, W.hijauMuda, W.merahMuda];
const NAMA_KOL = ["Ratusan", "Puluhan", "Satuan"];
/** Warna tulisan langkah tiap kolom: ratusan biru, puluhan hijau, satuan merah. */
export const WARNA_LANGKAH = [W.biru, W.hijau, W.merah];
export const NAMA_LANGKAH = ["ratusan", "puluhan", "satuan"];

/** Tabel susun: kepala tiga kolom dan `baris` baris sel (baris terakhir biasanya untuk hasil). Pojok kiri-atas (x, y). */
export function tabelSusun(id: string, x: number, y: number, baris: number, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  for (let c = 0; c < 3; c += 1) {
    out.push(kotak(`${id}-h${c}`, x + c * CW, y, CW, CH, WARNA_KOL[c], W.biru, { rx: 0, tebal: 1.2, ...o }));
    out.push(teks(`${id}-ht${c}`, x + c * CW + CW / 2, y + CH / 2 + 2.6, NAMA_KOL[c], 7, W.biru, o));
  }
  for (let r = 0; r < baris; r += 1) for (let c = 0; c < 3; c += 1) out.push(kotak(`${id}-s${r}${c}`, x + c * CW, y + CH + r * CH, CW, CH, W.putih, W.biru, { rx: 0, tebal: 1, ...o }));
  return out;
}

/** Angka di sel baris `r` kolom `c` (0 ratusan, 1 puluhan, 2 satuan). */
export const angkaSel = (id: string, x: number, y: number, r: number, c: number, isi: string, u = 11, warna: string = W.biru, o: Opsi = {}): Obj =>
  teks(`${id}-d${r}${c}`, x + c * CW + CW / 2, y + CH + r * CH + CH / 2 + u * 0.35, isi, u, warna, o);

/** Tanda simpan (angka merah kecil) di atas kolom `c`. */
export const simpanSel = (id: string, x: number, y: number, c: number, isi: string, o: Opsi = {}): Obj => teks(`${id}-m${c}`, x + c * CW + CW / 2, y - 2, isi, 9.5, W.merah, o);

/** Susun awal: tabel dengan bilangan-bilangan yang dijumlahkan (rata kanan), garis jumlah, dan tanda tambah. Baris hasil kosong. */
export function susunAwal(id: string, x: number, y: number, bil: readonly number[], o: Opsi = {}): Obj[] {
  const out = tabelSusun(id, x, y, bil.length + 1, o);
  bil.forEach((n, r) => {
    const s = String(n);
    for (let i = 0; i < s.length; i += 1) out.push(angkaSel(id, x, y, r, 3 - s.length + i, s[i], 11, W.biru, o));
  });
  out.push(garis(`${id}-gj`, x, y + CH + bil.length * CH, 3 * CW, 0, W.hitam, 2, o));
  out.push(teks(`${id}-pl`, x + 3 * CW + 8, y + CH + (bil.length - 1) * CH + CH / 2 + 4, "+", 12, W.hitam, o));
  return out;
}

const digitKolom = (n: number, c: number): number | null => {
  const s = String(n);
  const i = 3 - s.length;
  return c < i ? null : Number(s[c - i]);
};

/** Jumlah satu kolom `c` (0 ratusan, 1 puluhan, 2 satuan) termasuk simpanan dari kolom di kanannya. Suku pertama adalah simpanan bila ada. */
export function kolomJumlah(bil: readonly number[], c: number): { suku: number[]; jumlah: number; simpan: number } {
  let masuk = 0;
  for (let kk = 2; kk > c; kk -= 1) {
    const s = bil.reduce((t, n) => t + (digitKolom(n, kk) ?? 0), 0) + masuk;
    masuk = Math.floor(s / 10);
  }
  const suku = [...(masuk > 0 ? [masuk] : []), ...bil.map((n) => digitKolom(n, c)).filter((d): d is number => d !== null)];
  const j = suku.reduce((t, v) => t + v, 0);
  return { suku, jumlah: j, simpan: Math.floor(j / 10) };
}

/**
 * Langkah menjumlah satu kolom pada tabel susun: label kolom dan persamaan di kanan tabel (`id-q{c}`, `id-e{c}`), angka hasil (`id-d{baris hasil}{c}`),
 * dan tanda simpan di kolom sebelah kiri (`id-m{c-1}`). Urutan tampil: satuan lebih dulu.
 */
export function susunLangkah(id: string, x: number, y: number, bil: readonly number[], c: number, o: Opsi = {}): { label: Obj; eq: Obj; hasil: Obj; simpan: Obj | null } {
  const { suku, jumlah: j, simpan } = kolomJumlah(bil, c);
  if (suku.length < 2) throw new Error(`kolom ${c} hanya satu suku`);
  if (c === 0 && simpan > 0) throw new Error("hasil melebihi 999");
  const urut = 2 - c;
  const ex = x + 3 * CW + 16;
  const ey = y + CH + 10 + urut * 14;
  return {
    label: teks(`${id}-q${c}`, ex, ey, NAMA_LANGKAH[c], 7.6, WARNA_LANGKAH[c], { anchor: "start", ...o }),
    eq: teks(`${id}-e${c}`, ex + 38, ey, `${suku.join(" + ")} = ${j}`, 8.6, WARNA_LANGKAH[c], { anchor: "start", ...o }),
    hasil: angkaSel(id, x, y, bil.length, c, String(j % 10), 11, WARNA_LANGKAH[c], o),
    simpan: simpan > 0 && c > 0 ? simpanSel(id, x, y, c - 1, String(simpan), o) : null,
  };
}

/** Aksi-aksi satu kolom, siap dipasang pada kata pemicu: label dan persamaan, hasil, tanda simpan (bila ada). */
export function langkahObjs(id: string, x: number, y: number, bil: readonly number[], c: number, o: Opsi = {}): Obj[] {
  const l = susunLangkah(id, x, y, bil, c, o);
  return [l.label, l.eq, l.hasil, ...(l.simpan ? [l.simpan] : [])];
}

/* ------------------------------ Balok satuan dan batang puluhan ------------------------------ */

/** `n` balok satuan (kotak kecil) tersusun `kol` kolom: `id-o{i}`. Pojok kiri-atas (x, y), sisi `sz`, jarak `jr`. */
export function balokSatuan(id: string, x: number, y: number, n: number, kol: number, sz = 10, jr = 2, warna: string = W.merahMuda, o: Opsi = {}): Obj[] {
  return Array.from({ length: n }, (_, i) => kotak(`${id}-o${i}`, x + (i % kol) * (sz + jr), y + Math.floor(i / kol) * (sz + jr), sz, sz, warna, W.merah, { rx: 1.5, tebal: 1.1, ...o }));
}

/** Satu batang puluhan (sepuluh satuan bergandeng): kotak `id-p` dan sembilan sekat `id-sk{i}`; tegak, lebar `sz`, tinggi 10 kali `sz`. */
export function batangPuluhan(id: string, x: number, y: number, sz = 10, warna: string = W.hijauMuda, o: Opsi = {}): Obj[] {
  return [kotak(`${id}-p`, x, y, sz, sz * 10, warna, W.hijau, { rx: 1.5, tebal: 1.4, ...o }), ...Array.from({ length: 9 }, (_, i) => garis(`${id}-sk${i}`, x, y + (i + 1) * sz, sz, 0, W.hijau, 0.8, o))];
}

/* ------------------------------ Garis bilangan dengan lompatan ------------------------------ */

/**
 * Garis bilangan berskala: titik pada nilai v ada di x = x0 + (v - titik[0].v) * skala. Benda: garis dasar `id-g`, tanda `id-k{i}`, nilai `id-v{i}` (di bawah),
 * lompatan melengkung `id-j{i}` dan label `id-l{i}` di atasnya (lompatan i menghubungkan titik i dan i + 1).
 */
export function garisLompat(id: string, x0: number, y: number, titik: { v: number; lompat?: string }[], skala: number, o: Opsi = {}): Obj[] {
  const out: Obj[] = [];
  const xs = titik.map((t) => x0 + (t.v - titik[0].v) * skala);
  out.push(garis(`${id}-g`, x0 - 14, y, xs[xs.length - 1] - x0 + 28, 0, W.hitam, 1.6, o));
  titik.forEach((t, i) => {
    out.push(garis(`${id}-k${i}`, xs[i], y - 4, 0, 8, W.hitam, 1.6, o));
    out.push(teks(`${id}-v${i}`, xs[i], y + 15, String(t.v), 9, i === 0 ? W.merah : W.biru, o));
  });
  titik.forEach((t, i) => {
    if (i === titik.length - 1 || !t.lompat) return;
    const dx = xs[i + 1] - xs[i];
    out.push(jalur(`${id}-j${i}`, xs[i], y - 4, `M0 0 Q${Math.round((dx / 2) * 100) / 100} -28 ${Math.round(dx * 100) / 100} 0`, "none", W.hijau, { tebal: 1.8, gambar: true, ...o }));
    out.push(teks(`${id}-l${i}`, (xs[i] + xs[i + 1]) / 2, y - 22, t.lompat, 9, W.hijau, o));
  });
  return out;
}

/** Bilangan di kiri baris uraian (rata kiri di x = 30). */
export const bil = (id: string, y: number, isi: string, u = 9.5, o: Opsi = {}): Obj => teks(id, 30, y, isi, u, W.biru, { anchor: "start", ...o });
/** Baris uraian rata kiri (bawaan x = 70). */
export const ln = (id: string, y: number, isi: string, x = 70, u = 8.6, o: Opsi = {}): Obj => teks(id, x, y, isi, u, W.hitam, { anchor: "start", ...o });
