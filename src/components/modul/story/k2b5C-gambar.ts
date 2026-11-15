import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 2 Bab 5 Sub-Bab C (Seperempat dari Benda Utuh): benda yang dibagi digambar sebagai bagian-bagian
 * (bangun tertutup) yang luasnya bisa dihitung ulang dari koordinat titik sudutnya. Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Kesepakatan id (dipakai uji hitung ulang):
 * - Benda yang dibagi punya kode `slug` (huruf kecil dan angka). Tiap bagian: jalur tertutup `pc-${slug}-${nomor}` (nomor mulai 1).
 * - Label pecahan di tiap bagian: `lb-${slug}-${nomor}` (teks 1/2 atau 1/4 atau utuh).
 * - Garis potong atau garis lipat (putus-putus): `gp-...`.
 * - Anak: kepala `ob-${slug}` seperti sub-bab lain.
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#16A34A",
  putih: "#FFFFFF",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  coklat: "#92400E",
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  hijauMuda: "#DCFCE7",
  pink: "#FBCFE8",
  oranye: "#FBA919",
};
export const OWL = "\u{1F989}";

type Opsi = Partial<Obj>;
export type Titik = [number, number];

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.merah, tebal = 2.6, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Kartu pilihan jawaban: pojok kiri-atas (x, y); id `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, isi: string, warna: string = W.krem, w = 40, h = 36, u = 22, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.6, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, isi, u, W.merah, o),
];

/* ------------------------------ Anak (tokoh tetap) ------------------------------ */

export const NAMA_ANAK: Record<string, string> = { malosi: "Malosi", kira: "Kira", upe: "Upe", wei: "Wei", halim: "Halim", igil: "Igil" };
export const WARNA_ANAK: Record<string, string> = { malosi: "#FCA5A5", kira: "#FDE68A", upe: "#BBF7D0", wei: "#BFDBFE", halim: "#DDD6FE", igil: "#FBCFE8" };
/** Anak: kepala (bulat `ob-${slug}`) berpusat di (cx, cy), badan `-bd`, dan nama `-lb`. */
export function anak(slug: string, cx: number, cy: number): Obj[] {
  return [
    bulat(`ob-${slug}`, cx, cy, 11, WARNA_ANAK[slug], W.biru, { tebal: 1.8, z: 1 }),
    kotak(`ob-${slug}-bd`, cx - 10, cy + 12, 20, 18, WARNA_ANAK[slug], W.biru, { rx: 6, tebal: 1.6 }),
    teks(`ob-${slug}-lb`, cx, cy + 43, NAMA_ANAK[slug], 9, W.biru),
  ];
}

/* ------------------------------ Benda yang dibagi ------------------------------ */

const r2 = (n: number): number => Math.round(n * 100) / 100;
/** Warna bagian bergantian. */
export const WARNA_BAGIAN = ["#FDE68A", "#FBCFE8", "#BFDBFE", "#BBF7D0"];
export const WARNA_APEL = ["#FCA5A5", "#FECACA", "#FCA5A5", "#FECACA"];
export const WARNA_ROTI = ["#FED7AA", "#FDE68A", "#FED7AA", "#FDE68A"];

/** Bagian berupa jalur tertutup; titik relatif terhadap (x, y). */
export const bagian = (slug: string, nomor: number, x: number, y: number, titik: Titik[], warna: string, o: Opsi = {}): Obj => ({
  id: `pc-${slug}-${nomor}`,
  t: "jalur",
  x,
  y,
  d: `M${titik.map(([a, b]) => `${r2(a)} ${r2(b)}`).join(" L")} Z`,
  warna,
  garis: W.biru,
  tebal: 1.6,
  ...o,
});

/** Titik juring (relatif terhadap pusat): pusat, lalu busur dari sudut a0 ke a1 (derajat, searah jarum jam di layar). */
export function titikJuring(r: number, a0: number, a1: number): Titik[] {
  const langkah = Math.max(1, Math.round((a1 - a0) / 7.5));
  const out: Titik[] = [[0, 0]];
  for (let i = 0; i <= langkah; i += 1) {
    const a = ((a0 + ((a1 - a0) * i) / langkah) * Math.PI) / 180;
    out.push([r * Math.cos(a), r * Math.sin(a)]);
  }
  return out;
}

/**
 * Lingkaran berpusat di (cx, cy) dibagi menjadi juring-juring. `sudut` = besar tiap juring (derajat, jumlah paling banyak 360),
 * `awal` = sudut batas pertama (-90 = tepat ke atas). `geser` (opsional) menggeser tiap bagian.
 */
export function bagianLingkaran(slug: string, cx: number, cy: number, r: number, sudut: number[], awal = -90, warna: string[] = WARNA_BAGIAN, geser: Titik[] = [], o: Opsi = {}): Obj[] {
  let a = awal;
  return sudut.map((s, i) => {
    const titik = titikJuring(r, a, a + s);
    a += s;
    const g = geser[i] ?? [0, 0];
    return bagian(slug, i + 1, cx + g[0], cy + g[1], titik, warna[i % warna.length], o);
  });
}

export type CaraKotak = "utuh" | "tegak2" | "datar2" | "diag2" | "empat" | "diag4" | "jalur4" | "tak4" | "tak2";
/** Titik-titik tiap bagian pada persegi panjang w x h (relatif terhadap pojok kiri-atas). */
export function titikKotak(w: number, h: number, cara: CaraKotak): Titik[][] {
  const m = (a: number, b: number): Titik => [a, b];
  switch (cara) {
    case "utuh":
      return [[m(0, 0), m(w, 0), m(w, h), m(0, h)]];
    case "tegak2":
      return [[m(0, 0), m(w / 2, 0), m(w / 2, h), m(0, h)], [m(w / 2, 0), m(w, 0), m(w, h), m(w / 2, h)]];
    case "datar2":
      return [[m(0, 0), m(w, 0), m(w, h / 2), m(0, h / 2)], [m(0, h / 2), m(w, h / 2), m(w, h), m(0, h)]];
    case "diag2":
      return [[m(0, 0), m(w, 0), m(w, h)], [m(0, 0), m(w, h), m(0, h)]];
    case "empat":
      return [
        [m(0, 0), m(w / 2, 0), m(w / 2, h / 2), m(0, h / 2)],
        [m(w / 2, 0), m(w, 0), m(w, h / 2), m(w / 2, h / 2)],
        [m(0, h / 2), m(w / 2, h / 2), m(w / 2, h), m(0, h)],
        [m(w / 2, h / 2), m(w, h / 2), m(w, h), m(w / 2, h)],
      ];
    case "diag4":
      return [
        [m(0, 0), m(w, 0), m(w / 2, h / 2)],
        [m(w, 0), m(w, h), m(w / 2, h / 2)],
        [m(w, h), m(0, h), m(w / 2, h / 2)],
        [m(0, h), m(0, 0), m(w / 2, h / 2)],
      ];
    case "jalur4":
      return [0, 1, 2, 3].map((i) => [m((w * i) / 4, 0), m((w * (i + 1)) / 4, 0), m((w * (i + 1)) / 4, h), m((w * i) / 4, h)]);
    case "tak4": {
      const a = 0.3 * w;
      const b = 0.6 * h;
      return [
        [m(0, 0), m(a, 0), m(a, b), m(0, b)],
        [m(a, 0), m(w, 0), m(w, b), m(a, b)],
        [m(0, b), m(a, b), m(a, h), m(0, h)],
        [m(a, b), m(w, b), m(w, h), m(a, h)],
      ];
    }
    default: {
      const a = 0.35 * w;
      return [[m(0, 0), m(a, 0), m(a, h), m(0, h)], [m(a, 0), m(w, 0), m(w, h), m(a, h)]];
    }
  }
}

/** Persegi panjang (pojok kiri-atas di (x, y)) dibagi menurut `cara`. */
export const bagianKotak = (slug: string, x: number, y: number, w: number, h: number, cara: CaraKotak, warna: string[] = WARNA_BAGIAN, o: Opsi = {}): Obj[] =>
  titikKotak(w, h, cara).map((t, i) => bagian(slug, i + 1, x, y, t, warna[i % warna.length], o));

/** Pusat (titik berat) sebuah bagian dari titik-titiknya. */
export function pusatBagian(b: Obj): Titik {
  const n = (b.d ?? "").match(/-?\d+(?:\.\d+)?/g)?.map(Number) ?? [];
  const p: Titik[] = [];
  for (let i = 0; i + 1 < n.length; i += 2) p.push([n[i], n[i + 1]]);
  let l = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0; i < p.length; i += 1) {
    const [x1, y1] = p[i];
    const [x2, y2] = p[(i + 1) % p.length];
    const c = x1 * y2 - x2 * y1;
    l += c;
    cx += (x1 + x2) * c;
    cy += (y1 + y2) * c;
  }
  return [(b.x ?? 0) + cx / (3 * l), (b.y ?? 0) + cy / (3 * l)];
}

/** Label di tengah tiap bagian: `lb-${slug}-${nomor}` (nomor sama dengan bagian). `isi` satu teks atau satu per bagian. */
export function labelBagian(bg: Obj[], isi: string | string[], u = 8, warna: string = W.biru): Obj[] {
  return bg.map((b, i) => {
    const [cx, cy] = pusatBagian(b);
    return teks(`lb-${b.id.slice(3)}`, r2(cx), r2(cy + u * 0.35), Array.isArray(isi) ? isi[i] : isi, u, warna);
  });
}

/** Id bagian (dan label bila ada) sebuah benda yang dibagi menjadi `n` bagian. */
export const idBagian = (slug: string, n: number, denganLabel = false): string[] =>
  Array.from({ length: n }, (_, i) => i + 1).flatMap((i) => (denganLabel ? [`pc-${slug}-${i}`, `lb-${slug}-${i}`] : [`pc-${slug}-${i}`]));

/** Garis potong atau garis lipat putus-putus. */
export const garisPotong = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.merah): Obj => garis(id, x, y, x2, y2, warna, 2.2, { putus: true, z: 5 });
