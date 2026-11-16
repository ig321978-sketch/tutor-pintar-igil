import type { Aksi, KetukanStory, Obj } from "../logika-story";

/**
 * Kit adegan bersama untuk Story Opsi 2 (naskah orisinal IGIL), semua kelas.
 * Berisi: palet warna, bentuk dasar, kartu, penyingkat penulisan adegan, pengeja bilangan, dan penggambar tokoh.
 * Isi khusus dunia tiap kelas ada di berkas terpisah (mis. dunia-k1.ts). Kanvas Story berukuran 300 x 208.
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#16A34A",
  putih: "#FFFFFF",
  abu: "#CBD5E1",
  abuTua: "#94A3B8",
  ungu: "#7C3AED",
  coklat: "#92400E",
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  malam: "#1E1B4B",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  pink: "#FBCFE8",
  lavender: "#EDE9FE",
  oranye: "#FBA919",
  nila: "#2563EB",
} as const;

type Opsi = Partial<Obj>;

/* ------------------------------ Bentuk dasar ------------------------------ */
export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). Id `${id}-k` dan `${id}-t0..`. */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}
/** Id kartu dari `kartu(id, ...)` dengan `b` baris teks. */
export const idKartu = (id: string, b = 1): string[] => [`${id}-k`, ...Array.from({ length: b }, (_, i) => `${id}-t${i}`)];

/** Kartu pilihan atau angka: pojok kiri-atas (x, y); id `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, isi: string, warna: string = W.krem, w = 40, h = 36, u = 22, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.6, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, isi, u, W.merah, o),
];

/** Balon bicara tokoh: kotak bulat berisi satu sampai dua baris singkat. Id `${id}-k`, `${id}-t0..`. Teks di balon dijaga pendek. */
export const balon = (id: string, x: number, y: number, w: number, baris: string[], warna: string = W.putih, u = 9): Obj[] => kartu(id, x, y, w, 8 + baris.length * (u + 3), warna, baris, u);

/* ------------------------------ Penyingkat adegan ------------------------------ */
type At = string | number | undefined;
type Ubah = Partial<Obj> & { id: string };

export const tambah = (at: At, ...objs: (Obj | Obj[])[]): Aksi => ({ at, tambah: objs.flat() });
export const ubah = (at: At, ...u: Ubah[]): Aksi => ({ at, ubah: u });
export const hapus = (at: At, ...ids: string[]): Aksi => ({ at, hapus: ids });
export const bersih = (at: At = 0): Aksi => ({ at, bersih: true });
export const k = (suara: string, ...aksi: Aksi[]): KetukanStory => ({ suara, aksi });
export const sorotkan = (at: At, ...ids: string[]): Aksi => ({ at, ubah: ids.map((id) => ({ id, sorot: true })) });
export const redamkan = (at: At, ...ids: string[]): Aksi => ({ at, ubah: ids.map((id) => ({ id, sorot: false })) });

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

/** Nomor kata (mulai 0) ke-`n` yang persis sama dengan `kata`. Galat bila tidak ada, supaya salah ketik pemicu ketahuan. */
export const idx = (suara: string, kata: string, n = 1): number => {
  const daftar = suara.split(/\s+/).filter(Boolean);
  let c = 0;
  for (let i = 0; i < daftar.length; i += 1) {
    if (norm(daftar[i]) === norm(kata)) {
      c += 1;
      if (c === n) return i;
    }
  }
  throw new Error(`pemicu "${kata}" ke-${n} tidak ada dalam: ${suara}`);
};

/* ------------------------------ Pengeja bilangan ------------------------------ */
const KATA9 = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
/** Mengeja bilangan 0 sampai 999 dengan aturan bahasa Indonesia (untuk suara tanpa digit). */
export const eja = (n: number): string => {
  if (n === 0) return "nol";
  const r = Math.floor(n / 100);
  const s = n % 100;
  const out: string[] = [];
  if (r === 1) out.push("seratus");
  else if (r > 1) out.push(`${KATA9[r]} ratus`);
  if (s === 10) out.push("sepuluh");
  else if (s === 11) out.push("sebelas");
  else if (s > 11 && s < 20) out.push(`${KATA9[s - 10]} belas`);
  else if (s >= 20) {
    out.push(`${KATA9[Math.floor(s / 10)]} puluh`);
    if (s % 10) out.push(KATA9[s % 10]);
  } else if (s > 0) out.push(KATA9[s]);
  return out.join(" ");
};

/* ------------------------------ Tokoh ------------------------------ */
export type Tokoh = {
  /** Penanda pendek huruf kecil untuk id benda gambar. */
  slug: string;
  nama: string;
  /** Warna kepala dan badan. */
  warna: string;
  /** Bila ada, tokoh digambar sebagai emoji (mis. maskot burung hantu) dan bukan kepala bulat. */
  ikon?: string;
};

/** Tokoh berpusat di (cx, cy): kepala bulat, badan, dan nama. Id `tk-${slug}`, `tk-${slug}-bd`, `tk-${slug}-lb`. */
export function gambarTokoh(t: Tokoh, cx: number, cy: number): Obj[] {
  if (t.ikon) return [emo(`tk-${t.slug}`, cx, cy + 8, t.ikon, 32), teks(`tk-${t.slug}-lb`, cx, cy + 43, t.nama, 9, W.biru)];
  return [
    bulat(`tk-${t.slug}`, cx, cy, 11, t.warna, W.biru, { tebal: 1.8 }),
    kotak(`tk-${t.slug}-bd`, cx - 10, cy + 12, 20, 18, t.warna, W.biru, { rx: 6, tebal: 1.6 }),
    teks(`tk-${t.slug}-lb`, cx, cy + 43, t.nama, 9, W.biru),
  ];
}
export const idTokoh = (t: Tokoh): string[] => (t.ikon ? [`tk-${t.slug}`, `tk-${t.slug}-lb`] : [`tk-${t.slug}`, `tk-${t.slug}-bd`, `tk-${t.slug}-lb`]);
