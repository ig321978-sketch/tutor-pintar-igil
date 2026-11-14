import type { Aksi, Obj } from "./logika-story";
import { bersih, tambah } from "./k4b4b-bantu";

/**
 * Gambar khusus Story Kelas 4 Bab 4 Sub-Bab B (Pengukuran Volume): kubus satuan bersusun (proyeksi miring), kisi persegi satuan Uji Kompetensi 3,
 * kartu, tabel, dan daftar kartu. Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
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
export type Titik = [number, number];
/** Kubus satuan: [x ke kanan, y ke belakang, z ke atas], semuanya bilangan bulat mulai 0. */
export type Vox = [number, number, number];

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });
export const jalur = (id: string, x: number, y: number, d: string, warna: string, garisW: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "jalur", x, y, d, warna, garis: garisW, tebal: 1.2, ...o });

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

/** Tanda centang atau silang kecil. */
export const tanda = (id: string, x: number, y: number, benar: boolean, u = 12): Obj => teks(id, x, y, benar ? "✔" : "✖", u, benar ? W.hijau : W.merah);

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

/* ------------------------------ Kubus satuan bersusun ------------------------------ */

const bulat1 = (n: number): number => Math.round(n * 10) / 10;
/** Kedalaman digambar miring: tiap satu kubus ke belakang bergeser a ke kanan dan b ke atas (dalam satuan sisi kubus). */
const MIRING = { a: 0.5, b: 0.42 };

const box = (p: number, q: number, r: number): Vox[] => {
  const out: Vox[] = [];
  for (let z = 0; z < r; z += 1) for (let y = 0; y < q; y += 1) for (let x = 0; x < p; x += 1) out.push([x, y, z]);
  return out;
};
const deret = (x0: number, x1: number, y: number, z: number): Vox[] => Array.from({ length: x1 - x0 + 1 }, (_, i) => [x0 + i, y, z] as Vox);

/**
 * Bangun kubus satuan di Buku Siswa hlm. 135-137 (Ayo Mencoba dan Ayo Berlatih), dibaca dari gambar buku.
 * `buku` adalah volume (sentimeter kubik) menurut Buku Siswa dan kunci Panduan Guru hlm. 161-162; `vox` daftar kubusnya.
 */
export const BANGUN: Record<string, { vox: Vox[]; buku: number }> = {
  /** Ayo Mencoba (i): lapisan bawah 6 x 2, dua lapisan di atasnya 6 x 1 di baris belakang. */
  i: { vox: [...box(6, 2, 1), ...deret(0, 5, 1, 1), ...deret(0, 5, 1, 2)], buku: 24 },
  /** Ayo Mencoba (ii): empat kubus mendatar, dua kubus naik, tiga kubus mendatar di atas. */
  ii: { vox: [...deret(0, 3, 0, 0), [3, 0, 1], [3, 0, 2], ...deret(3, 5, 0, 3)], buku: 9 },
  A: { vox: box(3, 3, 1), buku: 9 },
  B: { vox: box(2, 2, 2), buku: 8 },
  C: { vox: box(3, 2, 2), buku: 12 },
  D: { vox: box(3, 3, 2), buku: 18 },
  a: { vox: box(4, 1, 1), buku: 4 },
  b: { vox: [[0, 0, 0], [1, 0, 0], [1, 0, 1], [1, 0, 2], [1, 0, 3]], buku: 5 },
  c: { vox: [[1, 0, 0], ...deret(0, 2, 0, 1)], buku: 4 },
  d: { vox: box(4, 3, 1), buku: 12 },
  e: { vox: [...box(4, 3, 1), [0, 2, 1], [1, 2, 1]], buku: 14 },
  /** Jawaban contoh Ayo Berlatih 3 (soal terbuka, 12 sentimeter kubik): balok 2 x 2 x 3. */
  dua12: { vox: box(2, 2, 3), buku: 12 },
  satu: { vox: [[0, 0, 0]], buku: 1 },
};

type SetWarna = { f: string; t: string; r: string };
const HIJAU: SetWarna = { f: "#74B96B", t: "#94C98A", r: "#43AB49" };
const LAPIS: SetWarna[] = [HIJAU, { f: "#FDE68A", t: "#FEF3C7", r: "#FBBF24" }, { f: "#FDBA74", t: "#FED7AA", r: "#FB923C" }, { f: "#93C5FD", t: "#BFDBFE", r: "#60A5FA" }];

/** Lebar dan tinggi (piksel) kotak pembatas gambar kubus dengan sisi s. */
export function ukuranKubus(vox: Vox[], s: number): [number, number] {
  const mx = Math.max(...vox.map((v) => v[0])) + 1;
  const my = Math.max(...vox.map((v) => v[1])) + 1;
  const mz = Math.max(...vox.map((v) => v[2])) + 1;
  return [bulat1((mx + my * MIRING.a) * s), bulat1((mz + my * MIRING.b) * s)];
}

/**
 * Kubus-kubus satuan sisi s piksel; (x, y) adalah titik kiri-bawah sisi depan. Tiap kubus tiga muka: depan `${id}-{n}f`, atas `-{n}t`, kanan `-{n}r`.
 * Dilukis dari belakang ke depan supaya muka depan menutupi muka belakang. `lapis`: warna berbeda tiap lapisan tinggi.
 */
export function kubus(id: string, x: number, y: number, s: number, vox: Vox[], lapis = false, o: Opsi = {}): Obj[] {
  const urut = vox.map((v, n) => ({ v, n })).sort((p, q) => q.v[1] - p.v[1] || p.v[2] - q.v[2] || p.v[0] - q.v[0]);
  const lt = (px: number, py: number, pz: number): Titik => [bulat1((px + py * MIRING.a) * s), bulat1(-(pz + py * MIRING.b) * s)];
  const muka = (nid: string, pts: Titik[], warna: string): Obj => jalur(nid, x, y, `M${pts.map((p) => `${p[0]} ${p[1]}`).join(" L")} Z`, warna, "#1B5E3A", { tebal: 0.7, ...o });
  const out: Obj[] = [];
  for (const { v, n } of urut) {
    const [i, j, h] = v;
    const c = lapis ? LAPIS[h % LAPIS.length] : HIJAU;
    out.push(muka(`${id}-${n}f`, [lt(i, j, h), lt(i + 1, j, h), lt(i + 1, j, h + 1), lt(i, j, h + 1)], c.f));
    out.push(muka(`${id}-${n}t`, [lt(i, j, h + 1), lt(i + 1, j, h + 1), lt(i + 1, j + 1, h + 1), lt(i, j + 1, h + 1)], c.t));
    out.push(muka(`${id}-${n}r`, [lt(i + 1, j, h), lt(i + 1, j + 1, h), lt(i + 1, j + 1, h + 1), lt(i + 1, j, h + 1)], c.r));
  }
  return out;
}

/** Kubus bangun buku bernama `nama`, tengah-bawah di (cx, bawah). */
export function kubusDi(id: string, nama: string, cx: number, bawah: number, s: number, lapis = false, o: Opsi = {}): Obj[] {
  const b = BANGUN[nama];
  const [lebar] = ukuranKubus(b.vox, s);
  return kubus(id, bulat1(cx - lebar / 2), bawah, s, b.vox, lapis, o);
}

/* ------------------------------ Kisi persegi satuan (Uji Kompetensi 3) ------------------------------ */

/**
 * Persegi panjang berwarna pada kisi Uji Kompetensi 3 (Buku Siswa hlm. 137-138), diukur dari gambar vektor halaman.
 * cols x rows: kotak kisi; (c0, r0): sudut kiri-atas persegi panjang dalam kotak; w x h: ukuran persegi panjang dalam kotak. `kunci`: luas menurut Panduan Guru hlm. 164.
 */
export const KISI: Record<string, { cols: number; rows: number; c0: number; r0: number; w: number; h: number; kunci: number }> = {
  A: { cols: 8, rows: 5, c0: 1, r0: 1, w: 5, h: 3, kunci: 15 },
  B: { cols: 16, rows: 12, c0: 1, r0: 2, w: 12, h: 7, kunci: 84 },
  C: { cols: 8, rows: 6, c0: 2, r0: 1, w: 3, h: 4, kunci: 12 },
};
/** Bangun D: kerangka 10 x 15 kotak, kisi hanya digambar di sebagian (awal kolom tiap baris dari atas). Kunci buku 95. */
export const KISI_D = { cols: 10, rows: 15, mulai: [0, 0, 4, 4, 5, 5, 6, 7, 7, 8, 8, 8, 8, 8, 9], kunci: 95 };

/** Kisi A, B, atau C: bingkai `${id}-fr`, garis kisi `${id}-g`, persegi panjang berwarna `${id}-b`. Sisi kotak `c` piksel. */
export function kisi(id: string, nama: string, x: number, y: number, c: number): Obj[] {
  const q = KISI[nama];
  const garisKisi: string[] = [];
  for (let i = 1; i < q.cols; i += 1) garisKisi.push(`M${bulat1(i * c)} 0 L${bulat1(i * c)} ${bulat1(q.rows * c)}`);
  for (let j = 1; j < q.rows; j += 1) garisKisi.push(`M0 ${bulat1(j * c)} L${bulat1(q.cols * c)} ${bulat1(j * c)}`);
  return [
    kotak(`${id}-fr`, x, y, q.cols * c, q.rows * c, W.putih, W.hitam, { rx: 0, tebal: 1 }),
    jalur(`${id}-g`, x, y, garisKisi.join(" "), "none", "#58B0E3", { tebal: 0.4 }),
    kotak(`${id}-b`, x + q.c0 * c, y + q.r0 * c, q.w * c, q.h * c, "#CCE2F5", W.hitam, { rx: 0, tebal: 1 }),
  ];
}

/** Bangun D: bingkai `${id}-fr` dan kotak-kotak kisi yang tergambar `${id}-g` (satu lintasan). */
export function kisiD(id: string, x: number, y: number, c: number): Obj[] {
  const sel: string[] = [];
  KISI_D.mulai.forEach((m, r) => {
    for (let q = m; q < KISI_D.cols; q += 1) sel.push(`M${bulat1(q * c)} ${bulat1(r * c)} L${bulat1((q + 1) * c)} ${bulat1(r * c)} L${bulat1((q + 1) * c)} ${bulat1((r + 1) * c)} L${bulat1(q * c)} ${bulat1((r + 1) * c)} Z`);
  });
  return [kotak(`${id}-fr`, x, y, KISI_D.cols * c, KISI_D.rows * c, W.putih, W.hitam, { rx: 0, tebal: 1 }), jalur(`${id}-g`, x, y, sel.join(" "), "none", "#58B0E3", { tebal: 0.4 })];
}
