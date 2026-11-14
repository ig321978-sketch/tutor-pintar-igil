import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 6 Sub-Bab B (Diagram Batang): diagram batang tegak dan mendatar dengan skala,
 * piktogram sebagai pengingat, tabel, dan kartu. Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
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
  batang: "#2B8FD6",
  batangJingga: "#D95F2B",
  batangBiru: "#0B63B5",
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

/* ------------------------------ Diagram batang ------------------------------ */

export type Data = { nama: string; nilai: number; warna?: string };

export type Diagram = {
  /** Semua benda: sumbu, garis bantu, angka skala, batang, angka batang, dan nama kategori. */
  semua: Obj[];
  /** Sumbu, garis bantu, angka skala, dan judul sumbu (tanpa batang). */
  sumbu: Obj[];
  /** Batang ke-i beserta angkanya: [batang, angka]. */
  batang: Obj[][];
  /** Nama kategori ke-i. */
  nama: Obj[];
  /** Satuan panjang piksel tiap satu nilai data. */
  unit: number;
};

type OpsiDiagram = {
  /** false: tanpa angka di ujung batang. */
  angka?: boolean;
  warna?: string;
  /** Judul sumbu kategori dan judul sumbu nilai. */
  judulNama?: string;
  judulNilai?: string;
  ukuranNama?: number;
};

/**
 * Diagram batang tegak. (x, y) pojok kiri-atas area gambar, lebar w, tinggi h; sumbu datar di y + h. Skala 0 sampai `maks`, garis bantu tiap `langkah`.
 * Id: `${id}-ax` dan `${id}-ay` (sumbu), `${id}-g{v}` garis bantu, `${id}-y{v}` angka skala (v = nilai skala), `${id}-b{i}` batang, `${id}-v{i}` angka batang,
 * `${id}-n{i}` nama kategori, `${id}-jn` dan `${id}-jv` judul sumbu.
 */
export function diagramTegak(id: string, x: number, y: number, w: number, h: number, data: Data[], maks: number, langkah: number, o: OpsiDiagram = {}): Diagram {
  const unit = h / maks;
  const dasar = y + h;
  const slot = w / data.length;
  const lebarBatang = Math.min(slot * 0.56, 30);
  const sumbu: Obj[] = [];
  for (let v = 0; v <= maks; v += langkah) {
    if (v > 0) sumbu.push(garis(`${id}-g${v}`, x, dasar - v * unit, w, 0, W.abu, 0.6));
    sumbu.push(teks(`${id}-y${v}`, x - 3, dasar - v * unit + 2.2, String(v), 6, W.hitam, { anchor: "end" }));
  }
  sumbu.push(garis(`${id}-ax`, x, y - 2, 0, h + 2, W.hitam, 1.2), garis(`${id}-ay`, x, dasar, w, 0, W.hitam, 1.2));
  if (o.judulNilai) sumbu.push(teks(`${id}-jv`, 6, y - 7, o.judulNilai, 7, W.hitam, { anchor: "start" }));
  if (o.judulNama) sumbu.push(teks(`${id}-jn`, x + w / 2, dasar + 22, o.judulNama, 7.4, W.hitam));
  const batang = data.map((d, i): Obj[] => {
    const bx = x + i * slot + (slot - lebarBatang) / 2;
    const tinggi = d.nilai * unit;
    const b = kotak(`${id}-b${i}`, bx, dasar - tinggi, lebarBatang, tinggi, d.warna ?? o.warna ?? W.batang, W.biru, { rx: 0, tebal: 1 });
    return o.angka === false ? [b] : [b, teks(`${id}-v${i}`, bx + lebarBatang / 2, dasar - tinggi - 2.4, String(d.nilai), 6.6, W.hitam)];
  });
  const nama = data.map((d, i) => teks(`${id}-n${i}`, x + i * slot + slot / 2, dasar + 9, d.nama, o.ukuranNama ?? 6.2, W.hitam));
  return { semua: [...sumbu, ...batang.flat(), ...nama], sumbu, batang, nama, unit };
}

/**
 * Diagram batang mendatar. (x, y) pojok kiri-atas area gambar (x = sumbu tegak), lebar w untuk skala 0 sampai `maks`, tinggi h.
 * Id seperti diagramTegak: `${id}-y{v}` angka skala di bawah, `${id}-g{v}` garis bantu tegak, `${id}-b{i}` batang (lebar = nilai x unit), `${id}-n{i}` nama di kiri.
 */
export function diagramMendatar(id: string, x: number, y: number, w: number, h: number, data: Data[], maks: number, langkah: number, o: OpsiDiagram = {}): Diagram {
  const unit = w / maks;
  const slot = h / data.length;
  const tebalBatang = Math.min(slot * 0.56, 16);
  const dasar = y + h;
  const sumbu: Obj[] = [];
  for (let v = 0; v <= maks; v += langkah) {
    if (v > 0) sumbu.push(garis(`${id}-g${v}`, x + v * unit, y, 0, h, W.abu, 0.6));
    sumbu.push(teks(`${id}-y${v}`, x + v * unit, dasar + 8, String(v), 6, W.hitam));
  }
  sumbu.push(garis(`${id}-ax`, x, y - 2, 0, h + 2, W.hitam, 1.2), garis(`${id}-ay`, x, dasar, w, 0, W.hitam, 1.2));
  if (o.judulNama) sumbu.push(teks(`${id}-jn`, 6, y - 7, o.judulNama, 7.4, W.hitam, { anchor: "start" }));
  if (o.judulNilai) sumbu.push(teks(`${id}-jv`, x + w / 2, dasar + 19, o.judulNilai, 7.4, W.hitam));
  const batang = data.map((d, i): Obj[] => {
    const by = y + i * slot + (slot - tebalBatang) / 2;
    const lebar = d.nilai * unit;
    const b = kotak(`${id}-b${i}`, x, by, lebar, tebalBatang, d.warna ?? o.warna ?? W.batangJingga, W.biru, { rx: 0, tebal: 1 });
    return o.angka === false ? [b] : [b, teks(`${id}-v${i}`, x + lebar + 3, by + tebalBatang / 2 + 2.2, String(d.nilai), 6.6, W.hitam, { anchor: "start" })];
  });
  const nama = data.map((d, i) => teks(`${id}-n${i}`, x - 3, y + i * slot + slot / 2 + 2.2, d.nama, o.ukuranNama ?? 6.2, W.hitam, { anchor: "end" }));
  return { semua: [...sumbu, ...batang.flat(), ...nama], sumbu, batang, nama, unit };
}

/** Piktogram sebagai pengingat: tiap baris `[nama, banyak]`, satu ikon = satu. Id `${id}-n{r}` nama, `${id}-p{r}-{i}` ikon. Mengembalikan baris demi baris. */
export function piktogram(id: string, x: number, y: number, baris: [string, number][], ikon = "🧑", jarak = 12, tinggiBaris = 21, lebarNama = 62): Obj[][] {
  return baris.map(([nama, n], r) => [
    teks(`${id}-n${r}`, x, y + r * tinggiBaris, nama, 7.4, W.hitam, { anchor: "start" }),
    ...Array.from({ length: n }, (_, i) => emo(`${id}-p${r}-${i}`, x + lebarNama + i * jarak, y + r * tinggiBaris + 3, ikon, 10.5)),
  ]);
}
