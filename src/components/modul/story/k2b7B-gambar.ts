import type { Obj } from "./logika-story";

/**
 * Gambar khusus Story Kelas 2 Bab 7 Sub-Bab B (Membandingkan Bilangan): garis bilangan, kantong puluhan dan kelereng satuan,
 * kartu bilangan, tanda banding, dan kartu pilihan. Berkas ini TIDAK dipakai bab atau sub-bab lain.
 *
 * Kesepakatan id (dipakai uji hitung ulang dari struktur gambar, bukan dari kata):
 * - Garis bilangan: garis `gb-l`, tanda `gb-k{v}`, angka `gb-t{v}`; penanda `gb-m` (label `gb-mt`) dan penanda kedua `gb-m2` (label `gb-mt2`);
 *   bayangan awal `gb-bayang`, panah lompatan `gb-ar`, tulisan `gb-op` ("maju 2" atau "mundur 3"), hasil `gb-hs` ("58 maju 2 = 60"),
 *   soal yang belum dijawab `gb-soal` ("maju 3"). Letak penanda dihitung dari letak angka (x = x0 + (v - dari) / langkah x dx).
 * - Kumpulan bilangan `{id}-...`: batang kantong (satu batang = sepuluh) `{id}-p{i}`, kelereng lepas `{id}-s{j}`, bilangan `{id}-n`,
 *   nama `{id}-nm`, keterangan `{id}-c` ("5 puluhan 6 satuan"). Batang atau kelereng yang dicoret berwarna abu dan op 0.25.
 * - Banding: kartu `bd-a-t` dan `bd-b-t` (bilangan kiri dan kanan; boleh juga bilangan dari kumpulan `a` dan `b`), tanda `bd-s` (<, >, =),
 *   kata `bd-kata`, alasan `bd-ls`, kalimat `bd-kt` ("72 lebih besar dari 48"), keterangan kartu `bd-a-c` dan `bd-b-c`.
 * - Kartu urut `ur{i}` (kotak `-k`, bilangan `-n`, keterangan `-c`, penanda `-r` paling kecil atau paling besar, `-o` urutan ke berapa),
 *   tempat urut `sl{i}` (kotak `-k`, nama `-t`), judul urutan `ur-j`.
 * - Dua kartu angka `kd1`, `kd2`; susunan `kd-bes-n` (terbesar), `kd-kec-n` (terkecil).
 * - Teka-teki Kira: kumpulan `kr`, soal `kr-q` ("? + 43 = 55"), jawaban `kr-a`.
 * - Kartu pilihan `c1..cn` (`c{q}-k`, `c{q}-t`).
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
export const KUPU = "\u{1F98B}";
export const LEBAH = "\u{1F41D}";
export const BUAYA = "\u{1F40A}";

type Opsi = Partial<Obj>;

export const teks = (id: string, x: number, y: number, isi: string, u = 10, warna: string = W.biru, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi, u, warna, ...o });
export const kotak = (id: string, x: number, y: number, w: number, h: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "kotak", x, y, w, h, warna, garis, rx: 3, tebal: 1.5, ...o });
export const bulat = (id: string, x: number, y: number, r: number, warna: string, garis: string | undefined = W.biru, o: Opsi = {}): Obj => ({ id, t: "bulat", x, y, r, warna, garis, tebal: 1.5, ...o });
/** Garis dan panah dari (x, y) ke titik ujung mutlak (xa, ya); disimpan relatif terhadap (x, y). */
export const garis = (id: string, x: number, y: number, xa: number, ya: number, warna: string = W.biru, tebal = 2, o: Opsi = {}): Obj => ({ id, t: "garis", x, y, x2: r1(xa - x), y2: r1(ya - y), warna, tebal, ...o });
export const panah = (id: string, x: number, y: number, xa: number, ya: number, warna: string = W.merah, tebal = 2.4, o: Opsi = {}): Obj => ({ id, t: "panah", x, y, x2: r1(xa - x), y2: r1(ya - y), warna, tebal, ...o });
export const emo = (id: string, x: number, y: number, e: string, u = 22, o: Opsi = {}): Obj => ({ id, t: "teks", x, y, isi: e, u, warna: W.biru, ...o });

/** Judul adegan di tengah atas. */
export const judul = (isi: string, warna: string = W.ungu): Obj => teks("jud", 150, 18, isi, 11, warna);

/** Kartu berwarna dengan satu sampai tiga baris teks, pojok kiri-atas (x, y). */
export function kartu(id: string, x: number, y: number, w: number, h: number, warna: string, baris: string[], u = 9, o: Opsi = {}): Obj[] {
  const mulai = y + h / 2 - ((baris.length - 1) * (u + 3)) / 2 + u * 0.35;
  return [kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 8, ...o }), ...baris.map((b, i) => teks(`${id}-t${i}`, x + w / 2, mulai + i * (u + 3), b, u, W.biru, o))];
}

/** Kartu pilihan: pojok kiri-atas (x, y); id `${id}-k` dan `${id}-t`. */
export const kartuAngka = (id: string, x: number, y: number, isi: string, warna: string = W.krem, w = 40, h = 36, u = 22, o: Opsi = {}): Obj[] => [
  kotak(`${id}-k`, x, y, w, h, warna, W.biru, { rx: 6, tebal: 1.6, ...o }),
  teks(`${id}-t`, x + w / 2, y + h / 2 + u * 0.35, isi, u, W.merah, o),
];

const r1 = (n: number): number => Math.round(n * 10) / 10;

/* ------------------------------ Bilangan ------------------------------ */

export const puluhan = (n: number): number => Math.floor(n / 10);
export const satuan = (n: number): number => n % 10;
/** Banding dua bilangan: puluhan dulu, bila sama baru satuan. -1: a lebih kecil, 0: sama, 1: a lebih besar. */
export const bandingkan = (a: number, b: number): -1 | 0 | 1 => {
  const dp = puluhan(a) - puluhan(b);
  if (dp !== 0) return dp < 0 ? -1 : 1;
  const ds = satuan(a) - satuan(b);
  return ds === 0 ? 0 : ds < 0 ? -1 : 1;
};
export const TANDA = (a: number, b: number): "<" | ">" | "=" => ["<", "=", ">"][bandingkan(a, b) + 1] as "<" | ">" | "=";
export const KATA_TANDA = { "<": "lebih kecil dari", ">": "lebih besar dari", "=": "sama dengan" } as const;
export const KATA_BANDING = (a: number, b: number): string => KATA_TANDA[TANDA(a, b)];
/** Alasan banding: puluhan dulu, bila sama lihat satuan. */
export const ALASAN = (a: number, b: number): string => (puluhan(a) !== puluhan(b) ? "lihat puluhan dulu" : satuan(a) !== satuan(b) ? "puluhan sama: lihat satuan" : "puluhan dan satuan sama");
export const KETERANGAN = (n: number): string => `${puluhan(n)} puluhan ${satuan(n)} satuan`;
export const URUTAN = ["pertama", "kedua", "ketiga", "keempat", "kelima"];

/* ------------------------------ Garis bilangan ------------------------------ */

export type Sumbu = { dari: number; langkah: number; n: number; x0: number; dx: number; y: number };
/** Garis bilangan satuan: n bilangan berurutan mulai dari `dari`. */
export const sumbuSatuan = (dari: number, n = 7, y = 120): Sumbu => ({ dari, langkah: 1, n, x0: 30, dx: 240 / (n - 1), y });
/** Garis bilangan seratus: nol sampai seratus, lompat sepuluh-sepuluh. */
export const sumbuSeratus = (y = 120): Sumbu => ({ dari: 0, langkah: 10, n: 11, x0: 20, dx: 26, y });
/** Letak x untuk bilangan v pada garis. */
export const gx = (s: Sumbu, v: number): number => r1(s.x0 + ((v - s.dari) / s.langkah) * s.dx);

export function sumbu(s: Sumbu): Obj[] {
  const out: Obj[] = [garis("gb-l", s.x0 - 16, s.y, s.x0 + (s.n - 1) * s.dx + 16, s.y, W.biru, 2.4, { z: 0 })];
  for (let i = 0; i < s.n; i += 1) {
    const v = s.dari + i * s.langkah;
    const x = gx(s, v);
    out.push(garis(`gb-k${v}`, x, s.y - 5, x, s.y + 5, W.biru, 1.6, { z: 0 }));
    out.push(teks(`gb-t${v}`, x, s.y + 19, String(v), s.langkah === 1 ? 11 : 9.5, W.biru, { z: 1 }));
  }
  return out;
}

/** Penanda (emoji) di bilangan v. `kedua`: penanda kedua. */
export const penanda = (s: Sumbu, v: number, e: string, kedua = false): Obj => emo(kedua ? "gb-m2" : "gb-m", gx(s, v), s.y - 6, e, 26, { z: 3 });
export const labelPenanda = (isi: string, y = 160, kedua = false): Obj => teks(kedua ? "gb-mt2" : "gb-mt", 150, y, isi, 12, W.merah, { z: 3 });
export const bayangan = (s: Sumbu, v: number, e: string): Obj => emo("gb-bayang", gx(s, v), s.y - 6, e, 26, { op: 0.35, z: 2 });
/** Panah lompatan dan tulisannya. maju bila v1 > v0. */
export function lompatan(s: Sumbu, v0: number, v1: number): Obj[] {
  const arah = v1 > v0 ? "maju" : "mundur";
  const a = gx(s, v0);
  const b = gx(s, v1);
  return [panah("gb-ar", a, s.y - 40, b, s.y - 40, W.merah, 2.4, { z: 2 }), teks("gb-op", r1((a + b) / 2), s.y - 49, `${arah} ${Math.abs(v1 - v0)}`, 11, W.merah, { z: 3 })];
}
export const hasilLompat = (v0: number, v1: number, y = 184): Obj => teks("gb-hs", 150, y, `${v0} ${v1 > v0 ? "maju" : "mundur"} ${Math.abs(v1 - v0)} = ${v1}`, 13, W.hijau, { z: 3 });
export const soalLompat = (isi: string, y = 76): Obj => teks("gb-soal", 150, y, isi, 12, W.merah, { z: 3 });
/** Petunjuk kiri dan kanan di bawah garis bilangan. */
export const petunjukArah = (): Obj[] => [teks("gb-kiri", 14, 186, "kiri: lebih kecil", 10, W.ungu, { anchor: "start" }), teks("gb-kanan", 286, 186, "kanan: lebih besar", 10, W.ungu, { anchor: "end" })];

/* ------------------------------ Kantong puluhan dan kelereng satuan ------------------------------ */

export const GX_KIRI = 14;
export const GX_KANAN = 164;

/** Kumpulan n kelereng: tiap kantong berisi sepuluh (satu batang), sisanya kelereng lepas. Pojok kiri-atas (gx, y). */
export function kumpulan(id: string, n: number, x: number, y = 44, nama?: string, warna: string = W.emas): Obj[] {
  const out: Obj[] = [];
  if (nama) out.push(teks(`${id}-nm`, x + 50, y - 8, nama, 11, W.ungu));
  for (let i = 1; i <= puluhan(n); i += 1) out.push(kotak(`${id}-p${i}`, x + (i - 1) * 11, y, 9, 28, warna, W.biru, { rx: 2, tebal: 1.2, z: 1 }));
  for (let j = 1; j <= satuan(n); j += 1) out.push(bulat(`${id}-s${j}`, r1(x + 4.5 + (j - 1) * 8.6), y + 40, 3.2, W.hijauMuda, W.hijau, { tebal: 1.2, z: 1 }));
  out.push(teks(`${id}-n`, x + 50, y + 66, String(n), 15, W.merah));
  return out;
}
/** Keterangan "5 puluhan 6 satuan" di bawah kumpulan. */
export const keteranganKumpulan = (id: string, n: number, x: number, y = 44): Obj => teks(`${id}-c`, x + 50, y + 82, KETERANGAN(n), 8.6, W.biru);
export const idBatang = (id: string, n: number): string[] => Array.from({ length: puluhan(n) }, (_, i) => `${id}-p${i + 1}`);
export const idLepas = (id: string, n: number): string[] => Array.from({ length: satuan(n) }, (_, j) => `${id}-s${j + 1}`);
/** Keterangan 1 kantong = 10 kelereng. */
export const legenda = (): Obj[] => [kotak("lg-b", 56, 168, 9, 22, W.emas, W.biru, { rx: 2, tebal: 1.2 }), teks("lg-t", 72, 184, "1 kantong = 10 kelereng", 9.5, W.biru, { anchor: "start" })];

/* ------------------------------ Banding dua bilangan ------------------------------ */

/** Dua kartu bilangan (kiri a, kanan b) dengan pojok atas di y. Keterangan puluhan dan satuan bila `ket`. */
export function kartuBanding(a: number, b: number, y = 48, ket = false): Obj[] {
  const out: Obj[] = [
    kotak("bd-a-k", 28, y, 92, 56, W.langit, W.biru, { rx: 8, z: 0 }),
    teks("bd-a-t", 74, y + 24 + 8.4, String(a), 24, W.merah, { z: 1 }),
    kotak("bd-b-k", 180, y, 92, 56, W.hijauMuda, W.biru, { rx: 8, z: 0 }),
    teks("bd-b-t", 226, y + 24 + 8.4, String(b), 24, W.merah, { z: 1 }),
  ];
  if (ket) out.push(teks("bd-a-c", 74, y + 48, KETERANGAN(a), 8.6, W.biru, { z: 1 }), teks("bd-b-c", 226, y + 48, KETERANGAN(b), 8.6, W.biru, { z: 1 }));
  return out;
}
/** Tanda, kata, dan alasan banding antara a (kiri) dan b (kanan). `yTanda` letak tanda; kata dan alasan di bawahnya. */
export function hasilBanding(a: number, b: number, yTanda: number, yKata: number, alasan = true): Obj[] {
  const t = TANDA(a, b);
  const out: Obj[] = [teks("bd-s", 150, yTanda, t, 30, W.merah, { z: 2 }), teks("bd-kata", 150, yKata, KATA_BANDING(a, b), 12, W.biru, { z: 2 })];
  if (alasan) out.push(teks("bd-ls", 150, yKata + 20, ALASAN(a, b), 10, W.ungu, { z: 2 }));
  return out;
}
/** Ubah kartu, tanda, kata, dan alasan menjadi bilangan a dan b yang baru. */
export function ubahBanding(a: number, b: number, alasan = true): (Partial<Obj> & { id: string })[] {
  const u: (Partial<Obj> & { id: string })[] = [
    { id: "bd-a-t", isi: String(a) },
    { id: "bd-b-t", isi: String(b) },
    { id: "bd-s", isi: TANDA(a, b) },
    { id: "bd-kata", isi: KATA_BANDING(a, b) },
  ];
  if (alasan) u.push({ id: "bd-ls", isi: ALASAN(a, b) });
  return u;
}
/** Kalimat banding "72 lebih besar dari 48". */
export const kalimatBanding = (a: number, b: number, y = 192): Obj => teks("bd-kt", 150, y, `${a} ${KATA_BANDING(a, b)} ${b}`, 12, W.hijau, { z: 3 });

/* ------------------------------ Kartu urut ------------------------------ */

export type Kartu = { n: number; x: number; y: number; w: number; h: number };
/** Letak kartu ke-i (mulai 0) dari `jumlah` kartu pada satu baris. */
export function tempat(i: number, jumlah: number, y: number, h: number): Kartu {
  const w = jumlah === 5 ? 50 : 84;
  const jarak = jumlah === 5 ? 8 : 14;
  const x0 = (300 - (jumlah * w + (jumlah - 1) * jarak)) / 2;
  return { n: 0, x: r1(x0 + i * (w + jarak)), y, w, h };
}
/** Kartu urut ke-i (nomor 1..n) berisi bilangan v pada tempat t. Keterangan bila `ket`. */
export function kartuUrut(i: number, v: number, t: Kartu, ket = false, warna: string = W.krem): Obj[] {
  const out: Obj[] = [kotak(`ur${i}-k`, t.x, t.y, t.w, t.h, warna, W.biru, { rx: 8, z: 1 }), teks(`ur${i}-n`, r1(t.x + t.w / 2), r1(t.y + (ket ? 28 : t.h / 2 + 8)), String(v), t.w < 60 ? 20 : 24, W.merah, { z: 2 })];
  if (ket) out.push(teks(`ur${i}-c`, r1(t.x + t.w / 2), r1(t.y + t.h - 10), KETERANGAN(v), 8.2, W.biru, { z: 2 }));
  return out;
}
/** Pindahkan kartu urut i ke tempat t. */
export const pindahUrut = (i: number, t: Kartu, ket = false): (Partial<Obj> & { id: string })[] => [
  { id: `ur${i}-k`, x: t.x, y: t.y },
  { id: `ur${i}-n`, x: r1(t.x + t.w / 2), y: r1(t.y + (ket ? 28 : t.h / 2 + 8)) },
];
/** Tempat urut ke-i (kotak putus-putus) dan namanya (pertama, kedua, ...). */
export const tempatUrut = (i: number, t: Kartu, yNama: number): Obj[] => [
  kotak(`sl${i}-k`, t.x, t.y, t.w, t.h, W.putih, W.abu, { rx: 8, putus: true, z: 0 }),
  teks(`sl${i}-t`, r1(t.x + t.w / 2), yNama, URUTAN[i - 1], t.w < 60 ? 9 : 10.5, W.ungu, { z: 1 }),
];
export const judulUrutan = (isi: string, y = 104): Obj => teks("ur-j", 150, y, isi, 11, W.hijau, { z: 2 });
export const penandaUrut = (i: number, t: Kartu, isi: string, y: number, u = 10): Obj => teks(`ur${i}-r`, r1(t.x + t.w / 2), y, isi, u, W.hijau, { z: 2 });
export const ordinalUrut = (i: number, t: Kartu, isi: string, y: number): Obj => teks(`ur${i}-o`, r1(t.x + t.w / 2), y, isi, t.w < 60 ? 9 : 10, W.hijau, { z: 2 });

/* ------------------------------ Kartu pilihan ------------------------------ */

/** Pilihan kartu (id c1..cn), pojok kiri-atas di tinggi `y`. */
export const pilih = (y: number, isi: string[], u = 11, h = 30): Obj[] => {
  const n = isi.length;
  const w = n === 2 ? 120 : 90;
  const jarak = n === 2 ? 20 : 5;
  const x0 = (300 - (n * w + (n - 1) * jarak)) / 2;
  return isi.flatMap((tx, i) => kartuAngka(`c${i + 1}`, x0 + i * (w + jarak), y, tx, [W.hijauMuda, W.pink, W.langit][i], w, h, u));
};
export const idPilihan = (n: number): string[] => Array.from({ length: n }, (_, i) => [`c${i + 1}-k`, `c${i + 1}-t`]).flat();

/** Hanya tanda banding (tanpa kata dan alasan). */
export const tandaSaja = (a: number, b: number, y: number): Obj => teks("bd-s", 150, y, TANDA(a, b), 30, W.merah, { z: 2 });
/** Hanya alasan banding. */
export const alasanSaja = (a: number, b: number, y: number): Obj => teks("bd-ls", 150, y, ALASAN(a, b), 10, W.ungu, { z: 2 });
