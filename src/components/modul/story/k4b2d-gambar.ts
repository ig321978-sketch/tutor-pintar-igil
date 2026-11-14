import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 2 Sub-Bab D (Pecahan Desimal Persepuluhan dan Perseratusan): sepuluh benda berbingkai, batang sepuluh,
 * kisi seratus kotak, pecahan bertumpuk, tabel nilai tempat, dan kartu. Berkas ini TIDAK dipakai sub-bab lain. Semua fungsi mengembalikan data benda (Obj).
 * Benda bernama `id-o{nomor}` (benda), `id-c{nomor}` (sel batang atau kisi, terisi menurut kolom dari kiri) supaya uji bisa menghitung dari gambar.
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
  oranye: "#FBA919",
  kuning: "#FFF000",
  merahTua: "#D3232B",
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

/** Satu baris tabel (kepala bila `kepala`): id sel `${id}-s{kolom}` (kotak) dan `${id}-t{kolom}` (teks). Untuk baris yang muncul satu per satu. */
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

/** Id semua benda (kotak dan teks) satu baris tabel. */
export const idBaris = (id: string, r: number, kolom: number): string[] => Array.from({ length: kolom }, (_, c) => [`${id}-s${r}${c}`, `${id}-t${r}${c}`]).flat();

/* ------------------------------ Data dari Buku Siswa dan Panduan Guru (hlm. 71-75 dan 104-107) ------------------------------ */

/** Ayo Berlatih nomor 1 (Buku Siswa hlm. 74): bagian dalam kotak dari sepuluh benda. Panduan Guru hlm. 105: 4/10 = 0,4; 5/10 = 0,5; 3/10 = 0,3. */
export const LATIHAN_SATU = [
  { benda: "telur", bagian: 4, total: 10, desimal: "0,4" },
  { benda: "jeruk", bagian: 5, total: 10, desimal: "0,5" },
  { benda: "jam", bagian: 3, total: 10, desimal: "0,3" },
] as const;
/** Nomor 2 (persepuluhan, hlm. 74) dan nomor 3 (perseratusan, hlm. 75) dengan kunci Panduan Guru hlm. 106. */
export const LATIHAN_DUA: readonly (readonly [number, string])[] = [[1, "0,1"], [5, "0,5"], [9, "0,9"]];
export const LATIHAN_TIGA: readonly (readonly [number, string])[] = [[15, "0,15"], [62, "0,62"], [81, "0,81"]];

/* ------------------------------ Benda dan bingkai ------------------------------ */

/** Bingkai tanpa isi (garis saja). Dipakai melingkupi benda yang dihitung. */
export const bingkai = (id: string, x: number, y: number, w: number, h: number, warna: string = W.biru, o: Opsi = {}): Obj => kotak(id, x, y, w, h, "none", warna, { rx: 7, tebal: 2.2, ...o });

type Bentuk = "bulat" | "kotak";
/** `n` benda berbentuk `bentuk` bersusun `per` tiap baris, pusat benda pertama (x, y), jarak sx dan sy. Id `${id}-o{i}`; warna tiap benda dari fungsi. */
export function susunan(id: string, x: number, y: number, n: number, per: number, sx: number, sy: number, bentuk: Bentuk, ukur: number, warna: (i: number) => string, garisW: string | undefined = W.coklat, o: Opsi = {}): Obj[] {
  return Array.from({ length: n }, (_, i) => {
    const cx = x + (i % per) * sx;
    const cy = y + Math.floor(i / per) * sy;
    return bentuk === "bulat" ? bulat(`${id}-o${i}`, cx, cy, ukur, warna(i), garisW, { tebal: 1.1, ...o }) : kotak(`${id}-o${i}`, cx - ukur, cy - ukur * 0.8, ukur * 2, ukur * 1.6, warna(i), garisW, { rx: 3, tebal: 1.1, ...o });
  });
}

/** Sepuluh roti polos (dua baris lima). Roti pertama diberi selai coklat dengan `WARNA_SELAI` lewat aksi ubah. */
export const WARNA_SELAI = "#6B3F1D";
export const roti = (id: string, x: number, y: number, o: Opsi = {}): Obj[] => susunan(id, x, y, 10, 5, 26, 24, "kotak", 11, () => "#F8E3A3", W.coklat, o);
/** Warna benda per jenis latihan nomor 1. */
export const WARNA_BENDA = { telur: "#FDE0C0", jeruk: "#FB923C", jam: "#E0F2F1" } as const;

/** Titik pusat benda gambar Ayo Berlatih nomor 1 (relatif ke (x, y), jarak s). Telur dan jeruk dua baris lima, jam enam di atas dan empat di bawah (satu di bawah kotak). */
export function titikLatihan(jenis: "telur" | "jeruk" | "jam", s: number): [number, number][] {
  if (jenis === "jam") return [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [0.5, 1], [2, 1], [3, 1], [5, 1]].map(([a, b]) => [a * s, b * s] as [number, number]);
  return Array.from({ length: 10 }, (_, i) => [(i % 5) * s, Math.floor(i / 5) * s] as [number, number]);
}
/** Benda latihan nomor 1 beserta bingkai (id `${id}-b`) yang melingkupi tepat `bagian` benda. Telur: dua kolom pertama; jeruk: baris atas; jam: tiga jam pertama. */
export function latihanSatu(id: string, x: number, y: number, jenis: "telur" | "jeruk" | "jam", s: number, bagian: number): Obj[] {
  const pts = titikLatihan(jenis, s);
  const r = jenis === "jam" ? s * 0.4 : s * 0.4;
  const benda = pts.map(([a, b], i) => (jenis === "jam" ? kotak(`${id}-o${i}`, x + a - r, y + b - r, 2 * r, 2 * r, WARNA_BENDA.jam, W.hitam, { rx: 2, tebal: 1 }) : bulat(`${id}-o${i}`, x + a, y + b, r, WARNA_BENDA[jenis], W.coklat, { tebal: 1 })));
  // Bingkai: tepat memuat benda berindeks 0 sampai bagian-1 (telur: indeks 0,1,5,6 sehingga disusun ulang menurut kolom).
  const dalam = jenis === "telur" ? [0, 1, 5, 6] : jenis === "jeruk" ? [0, 1, 2, 3, 4] : [0, 1, 6];
  const xs = dalam.map((i) => pts[i][0]);
  const ys = dalam.map((i) => pts[i][1]);
  const m = s * 0.5;
  const kotakB = bingkai(`${id}-b`, x + Math.min(...xs) - m, y + Math.min(...ys) - m, Math.max(...xs) - Math.min(...xs) + 2 * m, Math.max(...ys) - Math.min(...ys) + 2 * m);
  return bagian === dalam.length ? [...benda, kotakB] : [...benda];
}

/* ------------------------------ Batang sepuluh dan kisi seratus ------------------------------ */

/**
 * Sel berderet `kol` kali `baris`, tiap sel s, pojok kiri-atas (x, y). `n` sel pertama (menurut kolom dari kiri, tiap kolom dari atas ke bawah) berwarna `isi`.
 * Id `${id}-c{i}`. Kisi seratus: kol = 10, baris = 10. Batang sepuluh: kol = 10, baris = 1 (satu sel = satu bagian dari sepuluh).
 */
export function selKisi(id: string, x: number, y: number, kol: number, baris: number, s: number, n: number, isi: string = W.hijau, kosong: string = W.putih, o: Opsi = {}): Obj[] {
  return Array.from({ length: kol * baris }, (_, i) => {
    const c = Math.floor(i / baris);
    const r = i % baris;
    return kotak(`${id}-c${i}`, x + c * s, y + r * s, s, s, i < n ? isi : kosong, W.biru, { rx: 0, tebal: s < 8 ? 0.5 : 0.9, ...o });
  });
}
/** Batang sepuluh sel mendatar. */
export const batang = (id: string, x: number, y: number, s: number, n: number, isi: string = W.hijau, o: Opsi = {}): Obj[] => selKisi(id, x, y, 10, 1, s, n, isi, W.putih, o);
/** Kisi seratus sel (sepuluh kolom, sepuluh baris). */
export const kisi = (id: string, x: number, y: number, s: number, n: number, isi: string = W.hijau, o: Opsi = {}): Obj[] => selKisi(id, x, y, 10, 10, s, n, isi, W.putih, o);
/** Id sel pertama sampai ke-`n` batang atau kisi. */
export const idSel = (id: string, dari: number, sampai: number): string[] => Array.from({ length: Math.max(0, sampai - dari) }, (_, i) => `${id}-c${dari + i}`);

/* ------------------------------ Pecahan bertumpuk dan tabel nilai tempat ------------------------------ */

/** Pecahan bertumpuk: pembilang di atas garis, penyebut di bawah, pusat garis di (x, y). Id `${id}-a`, `${id}-l`, `${id}-b`. */
export function pecahan(id: string, x: number, y: number, atas: string, bawah: string, u = 11, warna: string = W.biru, o: Opsi = {}): Obj[] {
  const lebar = Math.max(atas.length, bawah.length) * u * 0.6 + 6;
  return [teks(`${id}-a`, x, y - 3, atas, u, warna, o), garis(`${id}-l`, x - lebar / 2, y, lebar, 0, warna, 1.4, o), teks(`${id}-b`, x, y + u * 0.9 + 2, bawah, u, warna, o)];
}
/** Lebar garis pecahan bertumpuk (sama dengan rumus di `pecahan`), untuk meletakkan lambang di sebelahnya. */
export const lebarPecahan = (atas: string, bawah: string, u = 11): number => Math.max(atas.length, bawah.length) * u * 0.6 + 6;

/** Tabel nilai tempat: kepala dan satu baris isi. Kolom: satuan, koma, persepuluhan, perseratusan. Id sel `${id}-s{c}` dan teks `${id}-t{c}`; baris kepala `${id}h`. */
export const KOLOM_NILAI = [48, 24, 82, 82] as const;
export function tabelNilai(id: string, x: number, y: number, isi: readonly [string, string, string, string], kepala = true, tinggi = 20, u = 11): Obj[] {
  const out: Obj[] = [];
  if (kepala) out.push(...barisTabel(`${id}h`, x, y, [...KOLOM_NILAI], ["satuan", ",", "persepuluhan", "perseratusan"], tinggi, 7.2, true));
  out.push(...barisTabel(id, x, y + (kepala ? tinggi : 0), [...KOLOM_NILAI], [...isi], tinggi, u));
  return out;
}
