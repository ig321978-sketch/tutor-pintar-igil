import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 2 Bab 6 Sub-Bab B (Waktu): jam analog dengan jarum pendek dan jarum panjang, jam digital, baris kegiatan,
 * batang lama kegiatan, dan kartu bagian hari. Berkas ini TIDAK dipakai bab lain.
 *
 * Kesepakatan id (dipakai uji hitung ulang):
 * - Jam analog `j{n}`: muka `j{n}-w`, angka `j{n}-a{1..12}`, jarum pendek `j{n}-p`, jarum panjang `j{n}-m`, poros `j{n}-h`.
 *   Jarum digambar tegak lurus ke atas lalu diputar (`rot`, derajat searah jarum jam dari angka dua belas) mengelilingi pusat muka jam.
 *   Sudut jarum pendek = 30 x (jam mod 12) + menit / 2; sudut jarum panjang = 6 x menit.
 * - Jam digital: kotak `dg-k`, tulisan `dg-t` berbentuk "HH.MM" (jam 24).
 * - Baris kegiatan `kg{j}` (j = nomor di JADWAL): kotak `kg{j}-k`, nama `kg{j}-nm`, waktu `kg{j}-jm` berbentuk "pukul 6 pagi".
 * - Baris lama kegiatan `lm{j}`: nama `lm{j}-nm`, batang `lm{j}-b` (lebar = 2 x menit), label `lm{j}-t` berbentuk "15 menit" atau "1 jam".
 * - Kolom bagian hari `bg{j}`: judul `bg{j}-nm` (Pagi, Siang, Sore, Malam), kegiatan `bg{j}-kg`.
 * - Kartu jam digital per bagian hari `bh{j}`: bagian `bh{j}-nm`, jam `bh{j}-dg` berbentuk "HH.MM".
 * - Kartu pilihan `c1..cn` (`c1-k`, `c1-t`).
 */

export const W = {
  biru: "#1C01A5",
  emas: "#FFC800",
  merah: "#DC2626",
  hijau: "#16A34A",
  putih: "#FFFFFF",
  abu: "#CBD5E1",
  ungu: "#7C3AED",
  krem: "#FEF9C3",
  langit: "#DBEAFE",
  merahMuda: "#FECACA",
  hijauMuda: "#DCFCE7",
  pink: "#FBCFE8",
  lavender: "#EDE9FE",
  oranye: "#FBA919",
  kuning: "#FDE68A",
};

export const OWL = "\u{1F989}";

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai empat baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Kartu pilihan atau kata: pojok kiri-atas (x, y); id `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, isi: string, warna: string = W.krem, w = 40, h = 36, u = 22, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.6, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, isi, u, W.merah, o),
];

const r1 = (n: number): number => Math.round(n * 10) / 10;
export const dua = (n: number): string => String(n).padStart(2, "0");

/* ------------------------------ Jam analog ------------------------------ */

/** Sudut jarum pendek (derajat) untuk jam h (0 sampai 12) dan menit m. */
export const sudutPendek = (h: number, m: number): number => 30 * (h % 12) + m / 2;
/** Sudut jarum panjang (derajat) untuk menit m. */
export const sudutPanjang = (m: number): number => 6 * m;

export type PosisiJam = { cx: number; cy: number; r: number };
/** Tiga susunan jam: satu jam besar, dua jam berdampingan, tiga atau empat jam kecil. */
export const JAM_BESAR: PosisiJam = { cx: 150, cy: 104, r: 58 };
export const JAM_KIRI: PosisiJam = { cx: 78, cy: 108, r: 44 };
export const JAM_KANAN: PosisiJam = { cx: 222, cy: 108, r: 44 };
export const JAM_TENGAH_KECIL: PosisiJam = { cx: 150, cy: 108, r: 44 };
/** Tiga jam kecil berdampingan. */
export const JAM_TIGA: PosisiJam[] = [
  { cx: 52, cy: 100, r: 36 },
  { cx: 150, cy: 100, r: 36 },
  { cx: 248, cy: 100, r: 36 },
];

/** Muka jam saja (lingkaran dan poros), tanpa angka dan jarum. */
export const mukaJam = (id: string, p: PosisiJam): Obj[] => [bulat(`${id}-w`, p.cx, p.cy, p.r, W.putih, W.biru, { tebal: 2.5, z: 0 })];

/** Angka pada muka jam: semua dua belas angka, atau hanya dua belas, tiga, enam, dan sembilan. */
export function angkaJam(id: string, p: PosisiJam, semua = true): Obj[] {
  const u = p.r >= 50 ? 9.5 : 8;
  const ring = p.r - (p.r >= 50 ? 10 : 9);
  const daftar = semua ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] : [3, 6, 9, 12];
  return daftar.map((n) => {
    const a = (n * 30 * Math.PI) / 180;
    return teks(`${id}-a${n}`, r1(p.cx + ring * Math.sin(a)), r1(p.cy - ring * Math.cos(a) + u * 0.35), String(n), u, W.biru, { z: 1 });
  });
}

/** Jarum pendek: jam; tebal dan biru. */
export const jarumPendek = (id: string, p: PosisiJam, h: number, m: number, o: Opsi = {}): Obj => ({ id: `${id}-p`, t: "garis", x: p.cx, y: p.cy, x2: 0, y2: -r1(p.r * 0.5), rot: sudutPendek(h, m), garis: W.biru, tebal: p.r >= 50 ? 4 : 3.4, z: 2, ...o });
/** Jarum panjang: menit; lebih tipis dan merah. */
export const jarumPanjang = (id: string, p: PosisiJam, m: number, o: Opsi = {}): Obj => ({ id: `${id}-m`, t: "garis", x: p.cx, y: p.cy, x2: 0, y2: -r1(p.r * 0.78), rot: sudutPanjang(m), garis: W.merah, tebal: p.r >= 50 ? 2.4 : 2, z: 2, ...o });
export const porosJam = (id: string, p: PosisiJam): Obj => bulat(`${id}-h`, p.cx, p.cy, 3.2, W.biru, W.biru, { z: 3 });

/** Jam analog lengkap: muka, angka, kedua jarum, dan poros. */
export const jam = (id: string, p: PosisiJam, h: number, m = 0, semua = true): Obj[] => [...mukaJam(id, p), ...angkaJam(id, p, semua), jarumPendek(id, p, h, m), jarumPanjang(id, p, m), porosJam(id, p)];

/** Penanda kecil nama di bawah jam, mis. "Sarapan". */
export const namaJam = (id: string, p: PosisiJam, isi: string, warna: string = W.krem): Obj[] => kartu(`${id}-nama`, p.cx - 48, p.cy + p.r + 8, 96, 24, warna, [isi], 10);

/* ------------------------------ Jam digital ------------------------------ */

/** Tulisan jam digital "HH.MM" dari jam 24 dan menit. */
export const tulisDigital = (jam24: number, m = 0): string => `${dua(jam24)}.${dua(m)}`;

/** Kotak jam digital dengan tulisan `dg-t`. */
export const digital = (x: number, y: number, jam24: number, m = 0, w = 96, h = 36): Obj[] => [
  kotak("dg-k", x, y, w, h, "#E0F2FE", W.biru, { rx: 6, tebal: 2, z: 1 }),
  teks("dg-t", x + w / 2, y + h / 2 + 18 * 0.35, tulisDigital(jam24, m), 18, W.biru, { z: 2 }),
];

/* ------------------------------ Kegiatan sehari ------------------------------ */

export type Bagian = "pagi" | "siang" | "sore" | "malam";
export const BAGIAN: Bagian[] = ["pagi", "siang", "sore", "malam"];
export const NAMA_BAGIAN: Record<Bagian, string> = { pagi: "Pagi", siang: "Siang", sore: "Sore", malam: "Malam" };
export const WARNA_BAGIAN: Record<Bagian, string> = { pagi: W.kuning, siang: W.emas, sore: W.oranye, malam: W.lavender };
export const EMO_BAGIAN: Record<Bagian, string> = { pagi: "\u{1F305}", siang: "\u{1F31E}", sore: "\u{1F307}", malam: "\u{1F319}" };

/** Kegiatan Kira sepanjang hari: jam adalah jam dinding (satu sampai dua belas) dan bagian harinya. */
export const JADWAL: { nm: string; jm: number; bh: Bagian }[] = [
  { nm: "Sarapan", jm: 6, bh: "pagi" },
  { nm: "Belajar", jm: 7, bh: "pagi" },
  { nm: "Makan siang", jm: 12, bh: "siang" },
  { nm: "Bermain", jm: 4, bh: "sore" },
  { nm: "Tidur", jm: 9, bh: "malam" },
];

/** Baris kegiatan j (nomor di JADWAL) pada urutan tampil `slot` (0 dari atas). */
export const YBARIS = (slot: number, mulai = 34, jarak = 34): number => mulai + slot * jarak;
export function barisKegiatan(j: number, slot: number, mulai = 34, jarak = 34): Obj[] {
  const e = JADWAL[j];
  const y = YBARIS(slot, mulai, jarak);
  return [
    kotak(`kg${j}-k`, 22, y, 256, 28, WARNA_BAGIAN[e.bh], W.biru, { rx: 8, z: 0 }),
    teks(`kg${j}-nm`, 34, y + 18.5, e.nm, 11, W.biru, { anchor: "start", z: 1 }),
    teks(`kg${j}-jm`, 266, y + 18.5, `pukul ${e.jm} ${e.bh}`, 10.5, W.merah, { anchor: "end", z: 1 }),
  ];
}
/** Pindahkan baris kegiatan j ke urutan tampil `slot`. */
export function geserBaris(j: number, slot: number, mulai = 34, jarak = 34): (Partial<Obj> & { id: string })[] {
  const y = YBARIS(slot, mulai, jarak);
  return [
    { id: `kg${j}-k`, y },
    { id: `kg${j}-nm`, y: y + 18.5 },
    { id: `kg${j}-jm`, y: y + 18.5 },
  ];
}

/* ------------------------------ Lama kegiatan ------------------------------ */

export const LABEL_LAMA = (menit: number): string => (menit % 60 === 0 && menit >= 60 ? `${menit / 60} jam` : `${menit} menit`);
export const SKALA_BATANG = 2;

/** Baris lama kegiatan: nama di atas, batang (lebar sebanding lama dalam menit), dan label lama. */
export function barisLama(j: number, y: number, nama: string, menit: number, warna: string = W.hijauMuda, denganBatang = true): Obj[] {
  const lebar = menit * SKALA_BATANG;
  return [
    teks(`lm${j}-nm`, 14, y, nama, 10.5, W.ungu, { anchor: "start", z: 1 }),
    ...(denganBatang ? [kotak(`lm${j}-b`, 14, y + 5, Math.max(lebar, 2), 16, warna, W.biru, { rx: 3, z: 1 })] : []),
    teks(`lm${j}-t`, denganBatang ? r1(14 + Math.max(lebar, 2) + 8) : 14, y + 18, LABEL_LAMA(menit), 10.5, W.merah, { anchor: "start", z: 1 }),
  ];
}

/* ------------------------------ Bagian hari ------------------------------ */

/** Kolom bagian hari j (0 sampai 3: pagi, siang, sore, malam) dengan judul; kegiatan ditambah terpisah. */
export function kolomBagian(j: number, y = 36, h = 30): Obj[] {
  const b = BAGIAN[j];
  const x = 8 + j * 72;
  return [kotak(`bg${j}-k`, x, y, 68, h, WARNA_BAGIAN[b], W.biru, { rx: 8, z: 0 }), teks(`bg${j}-nm`, x + 34, y + h / 2 + 3.8, NAMA_BAGIAN[b], 11, W.biru, { z: 1 })];
}
/** Kegiatan di bawah kolom bagian hari j. */
export const kegiatanBagian = (j: number, isi: string, y = 80): Obj[] => kartu(`bgk${j}`, 8 + j * 72 + 2, y, 64, 36, W.putih, [isi], 8.6).map((o) => (o.id === `bgk${j}-t0` ? { ...o, id: `bg${j}-kg` } : o));

/** Kartu jam digital per bagian hari: bagian di atas dan "HH.MM" di bawahnya. */
export function kartuBagianDigital(j: number, jam24: number, m = 0, y = 40): Obj[] {
  const b = BAGIAN[j];
  const x = 9 + (j % 2) * 144;
  const yy = y + Math.floor(j / 2) * 70;
  return [
    kotak(`bh${j}-k`, x, yy, 138, 62, WARNA_BAGIAN[b], W.biru, { rx: 10, z: 0 }),
    teks(`bh${j}-nm`, x + 69, yy + 20, NAMA_BAGIAN[b], 12, W.ungu, { z: 1 }),
    teks(`bh${j}-dg`, x + 69, yy + 48, tulisDigital(jam24, m), 20, W.biru, { z: 1 }),
  ];
}

/** Langit: satu emoji besar di pojok. */
export const langit = (b: Bagian, x = 150, y = 70, u = 40): Obj => emo("lg", x, y, EMO_BAGIAN[b], u, { z: 0 });

/** Pilihan kartu (id c1..cn), pojok kiri-atas di tinggi `y`. */
export const pilihKata = (y: number, isi: string[], u = 11): Obj[] => {
  const n = isi.length;
  const w = n === 2 ? 120 : 90;
  const jarak = n === 2 ? 20 : 5;
  const x0 = (300 - (n * w + (n - 1) * jarak)) / 2;
  return isi.flatMap((tx, i) => kartuAngka(`c${i + 1}`, x0 + i * (w + jarak), y, tx, [W.hijauMuda, W.pink, W.langit][i], w, 30, u));
};

/** Kartu hasil di bagian bawah: satu baris pendek. */
export const hasil = (id: string, isi: string, warna: string = W.emas, y = 172): Obj[] => kartu(id, 30, y, 240, 26, warna, [isi], 10.5);

/** Pita kecil (judul bagian) di bawah jam. */
export const pita = (id: string, isi: string, warna: string = W.krem, y = 172): Obj[] => kartu(id, 30, y, 240, 26, warna, [isi], 10);
