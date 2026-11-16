import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 5 Bab 4 Sub-Bab A (apakah keliling bangun datar itu): lapangan sepak bola 100 m kali 50 m dengan rute lari Nisa, Lukas, Yohana, dan Asep,
 * denah benteng, bingkai, serta dua bangun bersisi empat pada Buku Siswa hlm. 114. Berkas ini TIDAK dipakai bab lain.
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
  rumput: "#86EFAC",
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
      if (sel) out.push(teks(`${id}-t${r}${c}`, px + kolW[c] / 2, y + r * tinggi + tinggi / 2 + u * 0.35, sel, u, W.biru, o));
      px += kolW[c];
    });
  });
  return out;
}

/** Id semua benda (kotak dan teks) satu baris tabel. */
export const idBaris = (id: string, r: number, kolom: number): string[] => Array.from({ length: kolom }, (_, c) => [`${id}-s${r}${c}`, `${id}-t${r}${c}`]).flat();

export type Titik = [number, number];
const f1 = (n: number): string => n.toFixed(1);

/** Bangun datar tertutup dari titik-titik relatif terhadap (x, y). */
export const poligon = (id: string, x: number, y: number, p: Titik[], warna: string, tepi: string = W.biru, o: Opsi = {}): Obj =>
  jalur(id, x, y, `${p.map((t, i) => `${i === 0 ? "M" : "L"}${f1(t[0])} ${f1(t[1])}`).join(" ")} Z`, warna, tepi, { tebal: 1.8, ...o });

/* ------------------------------ Lapangan sepak bola dan rute lari (Buku Siswa hlm. 109 sampai 113) ------------------------------ */

/** Lapangan 100 m kali 50 m digambar 180 kali 90 (1,8 piksel per meter). */
export const LAP = { panjang: 100, lebar: 50, pw: 180, ph: 90, skala: 1.8 };
/** Pojok kiri-atas lapangan pada kanvas untuk adegan rute lari. */
export const FX = 56;
export const FY = 50;

/** Lapangan: rumput, garis tengah, dan lingkaran tengah. Pojok kiri-atas (x, y). Id `${id}-lp`, `${id}-gt`, `${id}-bt`. */
export function lapangan(id: string, x: number, y: number, w: number = LAP.pw, h: number = LAP.ph): Obj[] {
  return [
    kotak(`${id}-lp`, x, y, w, h, W.rumput, W.hijau, { rx: 2, tebal: 2 }),
    garis(`${id}-gt`, x + w / 2, y, 0, h, W.putih, 1.2),
    bulat(`${id}-bt`, x + w / 2, y + h / 2, h * 0.15, "none", W.putih, { tebal: 1.2 }),
  ];
}

/** Penanda titik start di pojok kiri-bawah lapangan dan labelnya. */
export const titikStart = (id: string, x: number, y: number, h: number = LAP.ph): Obj[] => [bulat(`${id}-st`, x, y + h, 4, W.merah, W.putih, { tebal: 1 }), teks(`${id}-sl`, x, y + h + 11, "start", 7.4, W.merah)];

/** Label ukuran lapangan: 100 m di bawah dan 50 m di kanan. */
export const ukuranLapangan = (id: string, x: number, y: number, w: number = LAP.pw, h: number = LAP.ph): Obj[] => [
  teks(`${id}-dp`, x + w / 2, y + h + 12, "100 m", 8.4, W.hitam),
  teks(`${id}-dl`, x + w + 6, y + h / 2 + 3, "50 m", 8.4, W.hitam, { anchor: "start" }),
];

/**
 * Rute lari, relatif terhadap pojok kiri-atas lapangan 180 kali 90 piksel (100 m kali 50 m). Panjang tiap ruas yang lurus penuh 180 piksel = 100 m atau 90 piksel = 50 m;
 * sambungan pendek 4 sampai 6 piksel hanya menggeser garis supaya ruas yang sama tidak saling menimpa.
 * Nisa: tiga ruas sepanjang sisi 100 m. Lukas: enam ruas sepanjang sisi 50 m. Yohana: satu ruas 50 m dari start ke garis tengah, lalu lima ruas 50 m di garis tengah.
 * Asep: empat ruas mengelilingi tepian, 100 m, 50 m, 100 m, 50 m.
 */
export const RUTE = {
  nisa: "M0 86 L180 86 L180 80 L0 80 L0 74 L180 74",
  lukas: "M2 90 L2 0 L8 0 L8 90 L14 90 L14 0 L20 0 L20 90 L26 90 L26 0 L32 0 L32 90",
  yohana: "M0 90 L90 90 L90 0 L95 0 L95 90 L100 90 L100 0 L105 0 L105 90 L110 90 L110 0",
  asep: "M0 90 L180 90 L180 0 L0 0 L0 90",
};

/** Panjang ruas lurus penuh pada rute (piksel), tanpa sambungan pendek di bawah 20 piksel. */
export function ruasRute(d: string): number[] {
  const n = (d.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
  const titik: Titik[] = [];
  for (let i = 0; i + 1 < n.length; i += 2) titik.push([n[i], n[i + 1]]);
  const out: number[] = [];
  for (let i = 1; i < titik.length; i += 1) {
    const panjang = Math.hypot(titik[i][0] - titik[i - 1][0], titik[i][1] - titik[i - 1][1]);
    if (panjang >= 20) out.push(panjang);
  }
  return out;
}

/** Garis rute yang tergambar bertahap di atas lapangan berpojok (FX, FY). */
export const garisRute = (id: string, d: string, warna: string, x: number = FX, y: number = FY): Obj => jalur(id, x, y, d, "none", warna, { tebal: 2.4, gambar: true });

/* ------------------------------ Bangun pada Buku Siswa hlm. 114 ------------------------------ */

/** Bangun pertama: empat sisi sama panjang 4 satuan, berdiri miring seperti pada gambar buku. Titik dalam piksel untuk satuan u piksel per cm. */
export function titikBangunSama(u: number): Titik[] {
  const d = 4 * u * Math.SQRT2;
  return [[d / 2, 0], [d, d / 2], [d / 2, d], [0, d / 2]];
}
/** Bangun kedua: sisi atas 4, sisi bawah 5, dua sisi miring masing-masing 5 (tinggi = akar 24,75 satuan). */
export function titikBangunDua(u: number): Titik[] {
  const tinggi = Math.sqrt(25 - 0.25) * u;
  return [[0.5 * u, 0], [4.5 * u, 0], [5 * u, tinggi], [0, tinggi]];
}
export const SISI_BANGUN_SAMA = [4, 4, 4, 4];
export const SISI_BANGUN_DUA = [4, 5, 5, 5];

/* ------------------------------ Denah benteng (sketsa gabungan beberapa bangun) ------------------------------ */
/** Sketsa denah benteng: gabungan beberapa bangun datar. Bukan ukuran asli, hanya untuk bertanya bangun apa saja yang tampak. */
export const TITIK_DENAH: Titik[] = [[0, 22], [34, 22], [34, 0], [96, 0], [96, 22], [130, 22], [130, 80], [0, 80]];

/** Bingkai persegi panjang: kotak luar dan kotak dalam kecil. */
export function bingkai(id: string, x: number, y: number, w: number, h: number, tebalKayu: number, warna: string = "#D6A15B"): Obj[] {
  return [kotak(`${id}-lu`, x, y, w, h, warna, W.coklat, { rx: 1, tebal: 1.4 }), kotak(`${id}-da`, x + tebalKayu, y + tebalKayu, w - 2 * tebalKayu, h - 2 * tebalKayu, W.langit, W.coklat, { rx: 1, tebal: 1 })];
}
