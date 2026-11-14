import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 4 Bab 6 Sub-Bab A (piktogram, termasuk pembuka bab): tabel piktogram (nama kategori, deretan gambar, kunci),
 * deretan turus, dan kartu penjelasan. Berkas ini TIDAK dipakai bab lain. Semua fungsi mengembalikan data benda (Obj) untuk mesin Story.
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
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 8.6, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/* ------------------------------ Piktogram ------------------------------ */

/** Jenis gambar satu satuan: emoji, kotak berwarna, atau bulatan berwarna. */
export type Ikon = { jenis: "emoji"; e: string } | { jenis: "kotak" | "bulat"; warna: string };

/**
 * Letak tabel piktogram. Kolom kiri (lebar `lw`) memuat nama kategori, kolom kanan (lebar `aw`) memuat gambar.
 * `ik` ukuran satu gambar, `st` jarak antargambar, `rh` tinggi baris, `hh` tinggi kepala tabel.
 * `ikon` boleh satu untuk semua baris, atau satu per baris (mis. mainan Karel).
 */
export type Pikto = { id: string; x: number; y: number; lw: number; aw: number; rh: number; hh: number; ik: number; st: number; ikon: Ikon | Ikon[]; label: string[]; kepala: [string, string] };

/** Rangka tabel: kepala (`-hk`, `-hv`, `-hkt`, `-hvt`), sel nama `-l{i}`, teks nama `-lt{i}`, sel gambar `-a{i}`. */
export function rangkaPikto(P: Pikto): Obj[] {
  const out: Obj[] = [
    kotak(`${P.id}-hk`, P.x, P.y, P.lw, P.hh, W.biru, W.biru, { rx: 0, tebal: 1 }),
    kotak(`${P.id}-hv`, P.x + P.lw, P.y, P.aw, P.hh, W.biru, W.biru, { rx: 0, tebal: 1 }),
    teks(`${P.id}-hkt`, P.x + P.lw / 2, P.y + P.hh * 0.68, P.kepala[0], 7.6, W.putih),
    teks(`${P.id}-hvt`, P.x + P.lw + P.aw / 2, P.y + P.hh * 0.68, P.kepala[1], 7.6, W.putih),
  ];
  P.label.forEach((nama, i) => {
    const py = P.y + P.hh + i * P.rh;
    out.push(kotak(`${P.id}-l${i}`, P.x, py, P.lw, P.rh, W.krem, W.biru, { rx: 0, tebal: 1 }));
    out.push(teks(`${P.id}-lt${i}`, P.x + P.lw / 2, py + P.rh / 2 + 3, nama, 7.6, W.biru));
    out.push(kotak(`${P.id}-a${i}`, P.x + P.lw, py, P.aw, P.rh, i % 2 === 0 ? W.putih : W.langit, W.biru, { rx: 0, tebal: 1 }));
  });
  return out;
}

/** Satu gambar baris i urutan j. Id `${id}-i{i}-{j}`. */
export function ikonPikto(P: Pikto, i: number, j: number): Obj {
  const s = Array.isArray(P.ikon) ? P.ikon[i] : P.ikon;
  const cx = P.x + P.lw + 4 + P.ik / 2 + j * P.st;
  const cy = P.y + P.hh + i * P.rh + P.rh / 2;
  const id = `${P.id}-i${i}-${j}`;
  if (s.jenis === "emoji") return teks(id, cx, cy + P.ik * 0.35, s.e, P.ik, W.biru);
  if (s.jenis === "kotak") return kotak(id, cx - P.ik / 2, cy - P.ik / 2, P.ik, P.ik, s.warna, W.biru, { rx: 1.5, tebal: 0.8 });
  return bulat(id, cx, cy, P.ik / 2, s.warna, W.biru, { tebal: 0.8 });
}

/** `n` gambar baris i. */
export const barisPikto = (P: Pikto, i: number, n: number): Obj[] => Array.from({ length: n }, (_, j) => ikonPikto(P, i, j));

/** Angka jumlah di kanan baris i. Id `${id}-n{i}`. */
export const jumlahBaris = (P: Pikto, i: number, n: number | string, warna: string = W.merah): Obj => teks(`${P.id}-n${i}`, P.x + P.lw + P.aw + 5, P.y + P.hh + i * P.rh + P.rh / 2 + 3.4, String(n), 9.4, warna, { anchor: "start" });

/** Id sel dan semua gambar baris i (untuk disorot). */
export const barisId = (P: Pikto, i: number, n: number): string[] => [`${P.id}-a${i}`, ...Array.from({ length: n }, (_, j) => `${P.id}-i${i}-${j}`)];

/** Baris kunci di bawah tabel (baris ke-`baris`): satu gambar lalu tulisan "menyatakan ...". Id `${id}-kk`, `${id}-ki`, `${id}-kt`. */
export function kunciPikto(P: Pikto, baris: number, ikon: Ikon, isi: string): Obj[] {
  const y = P.y + P.hh + baris * P.rh;
  const w = P.lw + P.aw;
  const cx = P.x + w / 2 - 36;
  const cy = y + 11;
  const sz = 12;
  const g: Obj =
    ikon.jenis === "emoji"
      ? teks(`${P.id}-ki`, cx, cy + sz * 0.35, ikon.e, sz, W.biru)
      : ikon.jenis === "kotak"
        ? kotak(`${P.id}-ki`, cx - sz / 2, cy - sz / 2, sz, sz, ikon.warna, W.biru, { rx: 1.5, tebal: 0.8 })
        : bulat(`${P.id}-ki`, cx, cy, sz / 2, ikon.warna, W.biru, { tebal: 0.8 });
  return [kotak(`${P.id}-kk`, P.x, y, w, 22, W.abu, W.biru, { rx: 0, tebal: 1 }), g, teks(`${P.id}-kt`, cx + 10, y + 14.2, isi, 8, W.biru, { anchor: "start" })];
}

/* ------------------------------ Turus ------------------------------ */

/** Jarak antargaris turus dan antarkelompok. */
export const TURUS = { h: 14, sp: 4, gap: 7 };

/**
 * Turus `n` berkelompok lima: empat garis tegak lalu satu garis miring pencoret. Mulai (x, y), tinggi h.
 * Garis ke-t dalam urutan penulisan: id `${id}-t{t}`. Hasil: daftar benda dan jumlah garis (n tegak ditambah pencoret).
 */
export function turus(id: string, x: number, y: number, n: number): Obj[] {
  const { h, sp, gap } = TURUS;
  const out: Obj[] = [];
  let px = x;
  let t = 0;
  let sisa = n;
  while (sisa > 0) {
    const g = Math.min(5, sisa);
    const tegak = Math.min(4, g);
    for (let a = 0; a < tegak; a += 1) {
      out.push(garis(`${id}-t${t}`, px + a * sp, y, 0, h, W.biru, 1.8));
      t += 1;
    }
    if (g === 5) {
      out.push(garis(`${id}-t${t}`, px - 2, y + h - 2, 3 * sp + 4, -(h - 4), W.merah, 1.8));
      t += 1;
    }
    px += (g === 5 ? 3 * sp : (tegak - 1) * sp) + sp + gap;
    sisa -= g;
  }
  return out;
}
