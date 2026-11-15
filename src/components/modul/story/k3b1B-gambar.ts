import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 3 Bab 1 Sub-Bab B (Nilai Tempat): papan tiga tempat (ratusan hijau, puluhan biru, satuan merah)
 * dengan angka pada tempatnya, nilai tiap angka, model blok per tempat, dan kartu angka. Berkas ini TIDAK dipakai bab lain.
 *
 * Id yang dikenali uji (dihitung ulang dari gambar), awalan `p` huruf kecil lalu garis bawah:
 *  papan: kolom `${p}_c{i}`, nama tempat `${p}_h{i}`, angka `${p}_d{i}` (satu karakter 0 sampai 9), nilai `${p}_v{i}`, bilangan utuh `${p}_n`, uraian `${p}_u`;
 *  blok: `${p}_b{i}_{j}` (tempat i, blok ke-j; i = 0 ratusan, 1 puluhan, 2 satuan).
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
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  pink: "#FBCFE8",
  lavender: "#EDE9FE",
  oranye: "#FBA919",
  jingga: "#F97316",
  biruGambar: "#2563EB",
};

export const OWL = "\u{1F989}";

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const garis = (id: string, x: number, y: number, x2: number, y2: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2, y2, warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Kartu pilihan atau kartu angka: pojok kiri-atas (x, y); id `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, isi: string, warna: string = W.krem, w = 40, h = 36, u = 22, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.6, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, isi, u, W.merah, o),
];

/** Tiga kartu pilihan (id c1, c2, c3), pojok kiri-atas di tinggi `y`. Dua kartu bila hanya dua isi. */
export const pilihan = (y: number, isi: string[], u = 18): Obj[] => {
  const dua = isi.length === 2;
  return isi.flatMap((t, i) => kartuAngka(`c${i + 1}`, dua ? [20, 160][i] : [14, 107, 200][i], y, t, [W.hijauMuda, W.pink, W.langit][i], dua ? 120 : 86, 34, u));
};

/* ------------------------------ Tempat dan nilai ------------------------------ */

export const TEMPAT = ["ratusan", "puluhan", "satuan"];
export const NILAI_TEMPAT = [100, 10, 1];
export const WARNA_TEMPAT = [W.hijauMuda, W.langit, W.merahMuda];

/* ------------------------------ Papan tiga tempat ------------------------------ */

export type OpsiPapan = { x0?: number; y0?: number; w?: number; gap?: number; h?: number; u?: number; nilaiY?: number; uNilai?: number };

export type Papan = {
  p: string;
  angka: string;
  /** Kotak tempat ke-i. */
  kolom: (i: number) => Obj;
  /** Nama tempat ke-i di atas kotak. */
  kepala: (i: number) => Obj;
  /** Angka pada tempat ke-i (galat bila tempat itu kosong). */
  digit: (i: number) => Obj;
  /** Nilai angka pada tempat ke-i (angka kali nilai tempat). */
  nilai: (i: number) => Obj;
  /** Bilangan utuh di bawah papan (id `${p}_n`). */
  utuh: (y: number, u?: number) => Obj;
  dasar: Obj[];
  idDigit: string[];
  /** Pusat tiap kolom dan tinggi tengah kotak. */
  xPusat: (i: number) => number;
  yDigit: number;
  x0: number;
  y0: number;
  w: number;
  gap: number;
  h: number;
};

/**
 * Papan tiga tempat: tiga kotak berjajar dari kiri ke kanan (ratusan hijau, puluhan biru, satuan merah).
 * `angka` berisi tiga karakter; spasi berarti tempat kosong di kiri (mis. " 73").
 */
export function papan(p: string, angka: string, o: OpsiPapan = {}): Papan {
  const x0 = o.x0 ?? 20;
  const y0 = o.y0 ?? 44;
  const w = o.w ?? 84;
  const gap = o.gap ?? 4;
  const h = o.h ?? 50;
  const u = o.u ?? 32;
  const uN = o.uNilai ?? 13;
  const a = angka.padStart(3, " ");
  const xP = (i: number): number => x0 + i * (w + gap) + w / 2;
  const yD = y0 + h / 2 + u * 0.35;
  const kolom = (i: number): Obj => kotak(`${p}_c${i}`, x0 + i * (w + gap), y0, w, h, WARNA_TEMPAT[i], W.biru, { rx: 6, tebal: 1.6 });
  const kepala = (i: number): Obj => teks(`${p}_h${i}`, xP(i), y0 - 5, TEMPAT[i], 9.6, W.biru);
  const digit = (i: number): Obj => {
    if (a[i] === " ") throw new Error(`tempat ${i} pada papan ${p} kosong`);
    return teks(`${p}_d${i}`, xP(i), yD, a[i], u, W.biru);
  };
  const nilai = (i: number): Obj => teks(`${p}_v${i}`, xP(i), o.nilaiY ?? y0 + h + 16, String(Number(a[i]) * NILAI_TEMPAT[i]), uN, W.merah);
  const utuh = (y: number, uu = 16): Obj => teks(`${p}_n`, x0 + (3 * w + 2 * gap) / 2, y, String(Number(a.trim())), uu, W.merah);
  return {
    p,
    angka: a,
    kolom,
    kepala,
    digit,
    nilai,
    utuh,
    dasar: [0, 1, 2].flatMap((i) => [kolom(i), kepala(i)]),
    idDigit: [0, 1, 2].filter((i) => a[i] !== " ").map((i) => `${p}_d${i}`),
    xPusat: xP,
    yDigit: yD,
    x0,
    y0,
    w,
    gap,
    h,
  };
}

/* ------------------------------ Model blok ------------------------------ */

/**
 * Blok pada tiap tempat di bawah papan: ratusan = kotak besar hijau, puluhan = batang biru, satuan = kotak kecil merah.
 * Blok ke-j pada tempat i punya id `${p}_b{i}_{j}`; banyaknya sama dengan angka pada tempat itu.
 */
export function blok(pp: Papan, y: number): Obj[] {
  const hasil: Obj[] = [];
  for (let i = 0; i < 3; i += 1) {
    const n = pp.angka[i] === " " ? 0 : Number(pp.angka[i]);
    const xi = pp.x0 + i * (pp.w + pp.gap);
    for (let j = 0; j < n; j += 1) {
      const id = `${pp.p}_b${i}_${j}`;
      if (i === 0) hasil.push(kotak(id, xi + 4 + (j % 3) * 26, y + Math.floor(j / 3) * 26, 24, 24, W.hijau, W.biru, { rx: 2, tebal: 1.2 }));
      else if (i === 1) hasil.push(kotak(id, xi + 4 + j * 9, y, 7, 34, W.biruGambar, W.biru, { rx: 1.5, tebal: 1 }));
      else hasil.push(kotak(id, xi + 4 + (j % 5) * 15, y + Math.floor(j / 5) * 14, 9, 9, W.merah, W.biru, { rx: 1.5, tebal: 1 }));
    }
  }
  return hasil;
}

/** Id blok pada tempat i dari papan `p` dengan angka `angka`. */
export const idBlok = (p: string, angka: string, i: number): string[] => {
  const a = angka.padStart(3, " ");
  const n = a[i] === " " ? 0 : Number(a[i]);
  return Array.from({ length: n }, (_, j) => `${p}_b${i}_${j}`);
};

/** Teks uraian di tengah, id `${p}_u`. */
export const uraian = (p: string, y: number, isi: string, u = 12): Obj => teks(`${p}_u`, 150, y, isi, u, W.coklat);
