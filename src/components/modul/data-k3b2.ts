/**
 * Data murni Matematika Kelas 3 Bab 2 (Kalimat Matematika): Sub-Bab A (kalimat Matematika berkaitan dengan penjumlahan)
 * dan Sub-Bab B (kalimat Matematika berkaitan dengan pengurangan). Satu bentuk soal `KM` dipakai kedua sub-bab:
 * x op y = z dengan salah satu dari x atau y belum diketahui. Kunci selalu dihitung dari bilangan, tidak ditulis dua kali.
 * Tanpa React, tanpa acak, tanpa jaringan. Uji: scripts/uji-data-k3b2.mjs.
 */
import type { BendaId } from "./data-k2b7";
import type { KalimatIsian, KotakPeta, Pernyataan, SoalDetektif } from "./data-k3b1";

export const HURUF = ["A", "B", "C", "D", "E", "F"];

/** Urutan tampil beberapa pilihan, tetap tanpa acak. */
export function urutanTetap(n: number, langkah = 3, geser = 0): number[] {
  const g = ((geser % n) + n) % n;
  const awal = (g * langkah) % n;
  return Array.from({ length: n }, (_, i) => (i + awal) % n);
}

/** Urutan tampil yang harus diurutkan siswa: putaran tetap yang dijamin berbeda dari urutan kunci. */
export function urutTampil<T>(daftar: readonly T[], kunci: readonly T[], nomor: number): T[] {
  const n = daftar.length;
  for (let g = 0; g < n; g += 1) {
    const p = urutanTetap(n, 2, nomor + g).map((i) => daftar[i]);
    if (JSON.stringify(p) !== JSON.stringify(kunci)) return p;
  }
  return [...daftar].reverse();
}

/** Tiga pilihan teks: satu benar dan dua pengecoh, kunci berpindah tempat. */
export function susunOpsi(benar: string, pengecoh: [string, string], nomor: number): { opsi: string[]; jawab: number } {
  const semua = [benar, pengecoh[0], pengecoh[1]];
  const opsi = urutanTetap(3, 2, nomor).map((i) => semua[i]);
  return { opsi, jawab: opsi.indexOf(benar) };
}

/* ====================================================================== */
/* Bentuk soal bersama                                                      */
/* ====================================================================== */

export type Op = "+" | "−";
/** x op y = z, dengan x atau y belum diketahui (hilang). */
export type KM = { op: Op; x: number; y: number; z: number; hilang: "x" | "y" };
/** Penjumlahan: x + y = z. */
export const P = (x: number, y: number, hilang: "x" | "y"): KM => ({ op: "+", x, y, z: x + y, hilang });
/** Pengurangan: x − y = z. */
export const M = (x: number, y: number, hilang: "x" | "y"): KM => ({ op: "−", x, y, z: x - y, hilang });

export const jawabKM = (p: KM): number => (p.hilang === "x" ? p.x : p.y);
/** Bilangan yang diketahui di sisi kiri atau tengah (bukan hasil). */
export const diketahuiKM = (p: KM): number => (p.hilang === "x" ? p.y : p.x);
/** Kalimat Matematika, mis. "8 + … = 19". Dengan `isi`, nilai yang hilang ditulis. */
export const kalimatKM = (p: KM, isi = false): string => `${p.hilang === "x" && !isi ? "…" : p.x} ${p.op} ${p.hilang === "y" && !isi ? "…" : p.y} = ${p.z}`;
export const idKM = (p: KM): string => `${p.op === "+" ? "t" : "k"}${p.x}_${p.y}_${p.hilang}`;

/** Cara mencari nilai yang hilang: kurangi atau tambahkan. Mis. { ungkapan: "19 − 8", tanda: "−" }. */
export function balikKM(p: KM): { ungkapan: string; tanda: Op } {
  if (p.op === "+") return { ungkapan: `${p.z} − ${diketahuiKM(p)}`, tanda: "−" };
  if (p.hilang === "y") return { ungkapan: `${p.x} − ${p.z}`, tanda: "−" };
  return { ungkapan: `${p.y} + ${p.z}`, tanda: "+" };
}
/** "19 − 8 = 11". */
export const teksBalikKM = (p: KM): string => `${balikKM(p).ungkapan} = ${jawabKM(p)}`;
/** Pemeriksaan: kalimat Matematika dengan nilai yang sudah diisi. */
export const teksPeriksaKM = (p: KM): string => `${kalimatKM(p, true)}`;
/** Keterangan lengkap untuk umpan balik. */
export const ketKM = (p: KM): string => `${kalimatKM(p)}. Cari dengan ${teksBalikKM(p)}. Periksa: ${teksPeriksaKM(p)}.`;

/** Tiga pilihan nilai: kunci, salah meminjam atau menyimpan sepuluh, dan salah satu. */
export function opsiKM(p: KM, nomor: number): number[] {
  const j = jawabKM(p);
  const a = j + 10 <= 99 ? j + 10 : j - 10;
  const b = j >= 2 ? j - 1 : j + 1;
  const semua = [j, a, b];
  return urutanTetap(3, 2, nomor).map((i) => semua[i]);
}

/** Tiga kalimat Matematika: kunci, tukar hasil dengan bilangan diketahui, dan tanda dibalik. */
export function opsiKalimatKM(p: KM, nomor: number): { opsi: string[]; jawab: number } {
  const kiri = p.hilang === "x" ? "…" : String(p.x);
  const tengah = p.hilang === "y" ? "…" : String(p.y);
  const lawan: Op = p.op === "+" ? "−" : "+";
  const tukar = p.hilang === "y" ? `${p.z} ${p.op} … = ${diketahuiKM(p)}` : `… ${p.op} ${p.z} = ${diketahuiKM(p)}`;
  return susunOpsi(`${kiri} ${p.op} ${tengah} = ${p.z}`, [tukar, `${kiri} ${lawan} ${tengah} = ${p.z}`], nomor);
}

/** Tiga kalimat isian: cari dengan operasi balik, isi kalimat, lalu periksa. */
export function kalimatLangkahKM(p: KM, nomor: number): KalimatIsian[] {
  const j = jawabKM(p);
  const pil = (v: number, i: number) => {
    const a = v + 10 <= 99 ? v + 10 : v - 10;
    const b = v >= 2 ? v - 1 : v + 1;
    const opsi = urutanTetap(3, 2, nomor + i).map((x) => [v, a, b][x]);
    return { opsi: opsi.map(String), benar: opsi.indexOf(v) };
  };
  const isi: KalimatIsian =
    p.hilang === "y"
      ? { depan: `${p.x} ${p.op}`, belakang: `= ${p.z}.`, ...pil(j, 1) }
      : { depan: "", belakang: `${p.op} ${p.y} = ${p.z}.`, ...pil(j, 1) };
  const xv = p.hilang === "x" ? j : p.x;
  const yv = p.hilang === "y" ? j : p.y;
  return [{ depan: `${balikKM(p).ungkapan} =`, belakang: ".", ...pil(j, 0) }, isi, { depan: `${xv} ${p.op} ${yv} =`, belakang: ".", ...pil(p.z, 2) }];
}

export const cocokKM = (p: KM, acuan: number, arah: "lebih" | "kurang"): boolean => (arah === "lebih" ? jawabKM(p) > acuan : jawabKM(p) < acuan);
export type SoalKMBenda = { benda: BendaId; p: KM };
export const kunciKM = (s: SoalKMBenda): string => `${s.benda}-${idKM(s.p)}`;

export type TabelKM = { kepala: [string, string]; baris: { label: string; jawab: string }[]; kartu: string[] };
export function tabelKM(daftar: KM[], tambahan: number): TabelKM {
  const baris = daftar.map((p) => ({ label: kalimatKM(p), jawab: String(jawabKM(p)) }));
  const pakai = new Set(baris.map((b) => Number(b.jawab)));
  let asing = jawabKM(daftar[0]) + 7;
  while (pakai.has(asing) || asing > 99) asing = asing > 99 ? 1 : asing + 1;
  const kartu = urutanTetap(daftar.length + 1, 2, tambahan).map((i) => (i < daftar.length ? baris[i].jawab : String(asing)));
  return { kepala: ["Kalimat", "Nilai"], baris, kartu };
}

/** Pasangan bilangan yang mungkin: banyak jumlah tetap (Ayo Berpikir). */
export type Kemungkinan = { total: number; pasang: [number, number][] };
export const cocokPasang = (k: Kemungkinan, p: [number, number]): boolean => p[0] + p[1] === k.total;

/** Satu set data lengkap untuk satu sub-bab. */
export type DataSub = {
  rakit: SoalKMBenda[][];
  hitung: SoalKMBenda[][];
  tulis: SoalKMBenda[][];
  pasang: { benda: BendaId; item: KM[] }[];
  memori: { benda: BendaId; item: KM[] }[];
  ketuk: { benda: BendaId; item: KM[]; tanya: number[] }[];
  semua: { benda: BendaId; acuan: number; arah: "lebih" | "kurang"; item: KM[] }[];
  cerita: SoalKMBenda[][];
  teksCerita: Record<string, string>;
  papan: SoalKMBenda[][];
  urut: { benda: BendaId; item: KM[]; dari: "kecil" | "besar" }[];
  hitungP: KM[][];
  kalimatP: KM[];
  pasangP: KM[][];
  memoriP: KM[][];
  tabelP: TabelKM[];
  semuaP: { acuan: number; arah: "lebih" | "kurang"; item: KM[] }[];
  pilahP: KM[][];
  langkahP: { judul: string; langkah: string[] }[];
  papanP: KM[][];
  kemungkinanP: Kemungkinan[];
  isiQ: KM[][];
  papanQ: KM[][];
  langkahQ: KM[];
  pasangQ: KM[][];
  memoriQ: KM[][];
  benarSalahQ: Pernyataan[][];
  detektifQ: SoalDetektif[];
  petaQ: { pusat: string; kotak: KotakPeta[] }[];
  ceritaQ: { teks: string; p: KM }[][];
  susunKataQ: { kata: string[]; pengecoh: string }[];
};

/* ====================================================================== */
/* Sub-Bab A: kalimat Matematika berkaitan dengan penjumlahan               */
/* ====================================================================== */

export const DATA_A: DataSub = {
  rakit: [
    [{ benda: "kue", p: P(30, 20, "y") }, { benda: "kelereng", p: P(12, 5, "x") }],
    [{ benda: "jeruk", p: P(23, 22, "y") }, { benda: "pensil", p: P(8, 11, "y") }],
    [{ benda: "anggur", p: P(38, 16, "x") }, { benda: "ikan", p: P(26, 36, "x") }],
  ],
  hitung: [
    [{ benda: "kue", p: P(18, 21, "y") }, { benda: "jeruk", p: P(7, 8, "y") }],
    [{ benda: "kelereng", p: P(32, 36, "x") }, { benda: "rambutan", p: P(42, 36, "y") }],
    [{ benda: "ikan", p: P(15, 24, "y") }, { benda: "pensil", p: P(27, 45, "x") }],
  ],
  tulis: [
    [{ benda: "kue", p: P(30, 20, "y") }, { benda: "jeruk", p: P(12, 5, "x") }],
    [{ benda: "kelereng", p: P(23, 22, "y") }, { benda: "anggur", p: P(32, 36, "x") }],
    [{ benda: "ikan", p: P(8, 11, "y") }, { benda: "pensil", p: P(38, 16, "x") }],
  ],
  pasang: [
    { benda: "kue", item: [P(30, 20, "y"), P(8, 11, "y"), P(12, 5, "x")] },
    { benda: "kelereng", item: [P(23, 22, "y"), P(18, 21, "y"), P(32, 36, "x")] },
    { benda: "jeruk", item: [P(38, 16, "x"), P(26, 36, "x"), P(42, 36, "y")] },
  ],
  memori: [
    { benda: "kue", item: [P(30, 20, "y"), P(8, 11, "y"), P(12, 5, "x"), P(7, 8, "y")] },
    { benda: "pensil", item: [P(23, 22, "y"), P(18, 21, "y"), P(32, 36, "x"), P(15, 24, "y")] },
    { benda: "anggur", item: [P(38, 16, "x"), P(26, 36, "x"), P(42, 36, "y"), P(27, 45, "x")] },
  ],
  ketuk: [
    { benda: "kue", item: [P(30, 20, "y"), P(8, 11, "y"), P(12, 5, "x")], tanya: [11, 12] },
    { benda: "kelereng", item: [P(23, 22, "y"), P(18, 21, "y"), P(32, 36, "x")], tanya: [21, 32] },
    { benda: "jeruk", item: [P(38, 16, "x"), P(26, 36, "x"), P(42, 36, "y")], tanya: [26, 36] },
  ],
  semua: [
    { benda: "kue", acuan: 15, arah: "lebih", item: [P(30, 20, "y"), P(8, 11, "y"), P(12, 5, "x"), P(23, 22, "y")] },
    { benda: "kelereng", acuan: 30, arah: "kurang", item: [P(38, 16, "x"), P(26, 36, "x"), P(42, 36, "y"), P(18, 21, "y")] },
    { benda: "jeruk", acuan: 25, arah: "lebih", item: [P(32, 36, "x"), P(15, 24, "y"), P(27, 45, "x"), P(7, 8, "y")] },
  ],
  cerita: [
    [{ benda: "kelereng", p: P(12, 5, "x") }, { benda: "kelereng", p: P(30, 20, "y") }],
    [{ benda: "jeruk", p: P(23, 22, "y") }, { benda: "pensil", p: P(26, 36, "x") }],
    [{ benda: "anggur", p: P(42, 36, "y") }, { benda: "ikan", p: P(38, 16, "x") }],
  ],
  teksCerita: {
    "kelereng-t12_5_x": "Galih menyimpan sejumlah kelereng di rumah. Ia membeli 5 kelereng lagi, sehingga jumlahnya 17 butir. Berapa kelereng Galih di rumah?",
    "kelereng-t30_20_y": "Galih dan Andi membawa kelereng. Kelereng Galih 30 butir. Jika digabung, jumlahnya 50 butir. Berapa kelereng Andi?",
    "jeruk-t23_22_y": "Ibu punya 23 jeruk di keranjang. Ibu menambah beberapa jeruk sehingga jumlahnya 45. Berapa jeruk yang ditambahkan?",
    "pensil-t26_36_x": "Rani punya sejumlah pensil. Kakak memberi 36 pensil lagi. Sekarang Rani punya 62 pensil. Berapa pensil Rani semula?",
    "anggur-t42_36_y": "Keranjang pertama berisi 42 anggur. Jumlah anggur pada dua keranjang adalah 78. Berapa anggur di keranjang kedua?",
    "ikan-t38_16_x": "Pak Ali punya sejumlah ikan. Ia membeli 16 ikan lagi sehingga jumlahnya 54. Berapa ikan Pak Ali semula?",
  },
  papan: [
    [{ benda: "kue", p: P(30, 20, "y") }, { benda: "jeruk", p: P(18, 21, "y") }],
    [{ benda: "kelereng", p: P(32, 36, "x") }, { benda: "pensil", p: P(15, 24, "y") }],
    [{ benda: "anggur", p: P(27, 45, "x") }, { benda: "ikan", p: P(42, 36, "y") }],
  ],
  urut: [
    { benda: "kue", item: [P(30, 20, "y"), P(8, 11, "y"), P(12, 5, "x")], dari: "kecil" },
    { benda: "pensil", item: [P(23, 22, "y"), P(18, 21, "y"), P(32, 36, "x")], dari: "besar" },
    { benda: "jeruk", item: [P(38, 16, "x"), P(26, 36, "x"), P(42, 36, "y")], dari: "kecil" },
  ],
  hitungP: [[P(8, 11, "y"), P(30, 20, "y")], [P(18, 21, "y"), P(32, 36, "x")], [P(26, 36, "x"), P(42, 36, "y")]],
  kalimatP: [P(30, 20, "y"), P(8, 11, "y"), P(38, 16, "x")],
  pasangP: [[P(7, 8, "y"), P(15, 24, "y"), P(27, 45, "x")], [P(30, 20, "y"), P(8, 11, "y"), P(12, 5, "x")], [P(23, 22, "y"), P(32, 36, "x"), P(42, 36, "y")]],
  memoriP: [
    [P(30, 20, "y"), P(8, 11, "y"), P(12, 5, "x"), P(7, 8, "y")],
    [P(23, 22, "y"), P(18, 21, "y"), P(32, 36, "x"), P(15, 24, "y")],
    [P(38, 16, "x"), P(26, 36, "x"), P(42, 36, "y"), P(27, 45, "x")],
  ],
  tabelP: [
    tabelKM([P(8, 11, "y"), P(23, 22, "y"), P(38, 16, "x"), P(32, 36, "x")], 1),
    tabelKM([P(7, 8, "y"), P(18, 21, "y"), P(26, 36, "x"), P(42, 36, "y")], 2),
    tabelKM([P(30, 20, "y"), P(12, 5, "x"), P(15, 24, "y"), P(27, 45, "x")], 3),
  ],
  semuaP: [
    { acuan: 20, arah: "lebih", item: [P(8, 11, "y"), P(32, 36, "x"), P(23, 22, "y"), P(7, 8, "y")] },
    { acuan: 25, arah: "kurang", item: [P(38, 16, "x"), P(18, 21, "y"), P(15, 24, "y"), P(42, 36, "y")] },
    { acuan: 15, arah: "lebih", item: [P(30, 20, "y"), P(12, 5, "x"), P(26, 36, "x"), P(27, 45, "x")] },
  ],
  pilahP: [
    [P(8, 11, "y"), P(38, 16, "x"), P(23, 22, "y"), P(32, 36, "x"), P(7, 8, "y"), P(26, 36, "x")],
    [P(30, 20, "y"), P(12, 5, "x"), P(18, 21, "y"), P(27, 45, "x"), P(42, 36, "y"), P(15, 24, "y")],
    [P(14, 9, "x"), P(25, 13, "y"), P(33, 41, "x"), P(56, 22, "y"), P(19, 37, "x"), P(61, 28, "y")],
  ],
  langkahP: [
    { judul: "Cari nilai pada 30 + … = 50", langkah: ["Baca kalimat Matematikanya", "Lihat bilangan yang diketahui: 30 dan 50", "Kurangkan: 50 − 30 = 20", "Periksa: 30 + 20 = 50"] },
    { judul: "Cari nilai pada … + 16 = 54", langkah: ["Baca kalimat Matematikanya", "Lihat bilangan yang diketahui: 16 dan 54", "Kurangkan: 54 − 16 = 38", "Periksa: 38 + 16 = 54"] },
    { judul: "Cari nilai pada 8 + … = 19", langkah: ["Tulis kalimat Matematikanya", "Gambar bagan jumlah dan bagiannya", "Kurangkan: 19 − 8 = 11", "Periksa: 8 + 11 = 19"] },
  ],
  papanP: [[P(30, 20, "y"), P(8, 11, "y")], [P(12, 5, "x"), P(23, 22, "y")], [P(32, 36, "x"), P(42, 36, "y")]],
  kemungkinanP: [
    { total: 50, pasang: [[30, 20], [25, 25], [34, 17], [45, 15]] },
    { total: 95, pasang: [[50, 45], [60, 35], [48, 46], [39, 56]] },
    { total: 100, pasang: [[60, 40], [75, 25], [55, 35], [64, 46]] },
  ],
  isiQ: [[P(8, 11, "y"), P(23, 22, "y")], [P(38, 16, "x"), P(32, 36, "x")], [P(7, 8, "y"), P(18, 21, "y")]],
  papanQ: [[P(26, 36, "x"), P(42, 36, "y")], [P(30, 20, "y"), P(12, 5, "x")], [P(15, 24, "y"), P(27, 45, "x")]],
  langkahQ: [P(8, 11, "y"), P(38, 16, "x"), P(23, 22, "y")],
  pasangQ: [[P(8, 11, "y"), P(23, 22, "y"), P(38, 16, "x")], [P(32, 36, "x"), P(7, 8, "y"), P(18, 21, "y")], [P(26, 36, "x"), P(42, 36, "y"), P(30, 20, "y")]],
  memoriQ: [
    [P(8, 11, "y"), P(23, 22, "y"), P(38, 16, "x"), P(32, 36, "x")],
    [P(7, 8, "y"), P(18, 21, "y"), P(26, 36, "x"), P(42, 36, "y")],
    [P(30, 20, "y"), P(12, 5, "x"), P(15, 24, "y"), P(27, 45, "x")],
  ],
  benarSalahQ: [
    [
      { teks: "8 + … = 19. Nilai yang belum diketahui adalah 11.", benar: true, penjelasan: "19 − 8 = 11, jadi 8 + 11 = 19." },
      { teks: "Pada 30 + … = 50, nilai … dicari dengan 50 − 30.", benar: true, penjelasan: "Untuk mencari bilangan yang belum diketahui pada penjumlahan, kurangi jumlahnya dengan bilangan yang diketahui." },
      { teks: "… + 16 = 54. Nilai yang belum diketahui adalah 70.", benar: false, penjelasan: "54 − 16 = 38, bukan 54 + 16. Jadi … = 38." },
      { teks: "Bentuk penjumlahan yang memuat angka belum diketahui disebut kalimat Matematika.", benar: true, penjelasan: "Contoh: 23 + … = 45 adalah kalimat Matematika." },
      { teks: "23 + … = 45. Nilai yang belum diketahui adalah 68.", benar: false, penjelasan: "45 − 23 = 22, bukan 45 + 23. Jadi … = 22." },
    ],
    [
      { teks: "… + 36 = 68. Nilai yang belum diketahui adalah 32.", benar: true, penjelasan: "68 − 36 = 32, jadi 32 + 36 = 68." },
      { teks: "Pada … + 5 = 17, kita mencari … dengan 17 + 5.", benar: false, penjelasan: "Kita mengurangkan: 17 − 5 = 12. Jadi … = 12." },
      { teks: "Bila 30 + 20 = 50, maka 50 − 30 = 20.", benar: true, penjelasan: "Penjumlahan dan pengurangan saling berkaitan." },
      { teks: "18 + … = 39. Nilai yang belum diketahui adalah 21.", benar: true, penjelasan: "39 − 18 = 21, jadi 18 + 21 = 39." },
      { teks: "7 + … = 15. Nilai yang belum diketahui adalah 22.", benar: false, penjelasan: "15 − 7 = 8, bukan 15 + 7. Jadi … = 8." },
    ],
  ],
  detektifQ: [
    { klue: ["Aku nilai yang belum diketahui pada 8 + … = 19.", "Aku lebih dari 10."], jawab: 11, opsi: [11, 27, 10], salah: "19 − 8 = 11, jadi 8 + 11 = 19." },
    { klue: ["Aku mengisi … + 16 = 54.", "Satuanku 8."], jawab: 38, opsi: [38, 70, 28], salah: "54 − 16 = 38, jadi 38 + 16 = 54." },
    { klue: ["Bila ditambah 12, aku menjadi 37.", "Aku kurang dari 30."], jawab: 25, opsi: [25, 49, 35], salah: "37 − 12 = 25, jadi 25 + 12 = 37." },
    { klue: ["Aku nilai yang belum diketahui pada 23 + … = 45.", "Kedua angkaku sama."], jawab: 22, opsi: [22, 68, 23], salah: "45 − 23 = 22, dan 22 punya dua angka yang sama." },
  ],
  petaQ: [
    {
      pusat: "Kalimat Matematika penjumlahan",
      kotak: [
        { label: "Bentuk penjumlahan dengan angka yang belum diketahui disebut", opsi: ["kalimat Matematika", "bilangan genap", "garis bilangan"], benar: 0 },
        { label: "Pada 30 + … = 50, bilangan yang diketahui adalah 30 dan", opsi: ["50", "20", "80"], benar: 0 },
        { label: "Untuk mencari nilai yang belum diketahui, jumlahnya", opsi: ["dikurangi bilangan yang diketahui", "ditambah bilangan yang diketahui", "dikali bilangan yang diketahui"], benar: 0 },
        { label: "Menurutku, 30 + … = 50 hasilnya", opsi: ["20", "80", "15"], benar: 0 },
      ],
    },
    {
      pusat: "Mencari nilai yang belum diketahui",
      kotak: [
        { label: "Pada 8 + … = 19, nilai … dicari dengan", opsi: ["19 − 8", "19 + 8", "8 − 19"], benar: 0 },
        { label: "19 − 8 sama dengan", opsi: ["11", "27", "12"], benar: 0 },
        { label: "Pada … + 16 = 54, nilai … dicari dengan", opsi: ["54 − 16", "54 + 16", "16 − 54"], benar: 0 },
        { label: "Menurutku, … + 16 = 54 hasilnya", opsi: ["38", "70", "28"], benar: 0 },
      ],
    },
  ],
  ceritaQ: [
    [
      { teks: "Pak Budi memanen durian dan meletakkannya dalam dua keranjang. Keranjang pertama berisi 42 durian. Jumlah durian pada kedua keranjang 78. Berapa durian di keranjang kedua?", p: P(42, 36, "y") },
      { teks: "Galih menyimpan sejumlah kelereng di rumah. Ia membeli 5 kelereng lagi, sehingga jumlahnya 17 butir. Berapa kelereng Galih di rumah?", p: P(12, 5, "x") },
    ],
    [
      { teks: "Galih membawa 30 kelereng dan Andi membawa sejumlah kelereng. Jika digabung, jumlahnya 50 butir. Berapa kelereng Andi?", p: P(30, 20, "y") },
      { teks: "Rani punya sejumlah stiker. Ia diberi 36 stiker lagi sehingga jumlahnya 62. Berapa stiker Rani semula?", p: P(26, 36, "x") },
    ],
    [
      { teks: "Tiket film yang terjual hari ini 95 lembar. Penonton laki-laki membeli 50 tiket. Berapa tiket yang dibeli penonton perempuan?", p: P(50, 45, "y") },
      { teks: "Ibu membeli 23 jeruk dan sejumlah apel. Buah yang dibeli semuanya 45. Berapa apel yang dibeli Ibu?", p: P(23, 22, "y") },
    ],
  ],
  susunKataQ: [
    { kata: ["Kalimat", "Matematika", "penjumlahan", "memuat", "angka", "yang", "belum", "diketahui"], pengecoh: "pengurangan" },
    { kata: ["Nilai", "yang", "belum", "diketahui", "dicari", "dengan", "mengurangkan", "bilangan"], pengecoh: "menambahkan" },
    { kata: ["30", "ditambah", "20", "sama", "dengan", "50"], pengecoh: "dikali" },
    { kata: ["Jumlah", "dikurangi", "bilangan", "yang", "diketahui", "hasilnya", "bilangan", "yang", "belum", "diketahui"], pengecoh: "dibagi" },
  ],
};

/* ====================================================================== */
/* Sub-Bab B: kalimat Matematika berkaitan dengan pengurangan               */
/* ====================================================================== */

export const DATA_B: DataSub = {
  rakit: [
    [{ benda: "kue", p: M(80, 35, "y") }, { benda: "kelereng", p: M(38, 12, "x") }],
    [{ benda: "jeruk", p: M(32, 17, "y") }, { benda: "pensil", p: M(65, 23, "x") }],
    [{ benda: "anggur", p: M(53, 21, "y") }, { benda: "ikan", p: M(72, 45, "x") }],
  ],
  hitung: [
    [{ benda: "kue", p: M(56, 32, "y") }, { benda: "jeruk", p: M(15, 9, "y") }],
    [{ benda: "kelereng", p: M(79, 41, "x") }, { benda: "rambutan", p: M(37, 13, "y") }],
    [{ benda: "ikan", p: M(71, 45, "x") }, { benda: "pensil", p: M(91, 67, "x") }],
  ],
  tulis: [
    [{ benda: "kue", p: M(80, 35, "y") }, { benda: "jeruk", p: M(38, 12, "x") }],
    [{ benda: "kelereng", p: M(32, 17, "y") }, { benda: "anggur", p: M(65, 23, "x") }],
    [{ benda: "ikan", p: M(53, 21, "y") }, { benda: "pensil", p: M(72, 45, "x") }],
  ],
  pasang: [
    { benda: "kue", item: [M(80, 35, "y"), M(15, 9, "y"), M(38, 12, "x")] },
    { benda: "kelereng", item: [M(32, 17, "y"), M(37, 13, "y"), M(65, 23, "x")] },
    { benda: "jeruk", item: [M(53, 21, "y"), M(56, 32, "y"), M(72, 45, "x")] },
  ],
  memori: [
    { benda: "kue", item: [M(80, 35, "y"), M(15, 9, "y"), M(38, 12, "x"), M(37, 13, "y")] },
    { benda: "pensil", item: [M(32, 17, "y"), M(53, 21, "y"), M(65, 23, "x"), M(79, 41, "x")] },
    { benda: "anggur", item: [M(56, 32, "y"), M(72, 45, "x"), M(71, 45, "x"), M(91, 67, "x")] },
  ],
  ketuk: [
    { benda: "kue", item: [M(80, 35, "y"), M(15, 9, "y"), M(38, 12, "x")], tanya: [9, 38] },
    { benda: "kelereng", item: [M(32, 17, "y"), M(37, 13, "y"), M(65, 23, "x")], tanya: [13, 65] },
    { benda: "jeruk", item: [M(53, 21, "y"), M(56, 32, "y"), M(72, 45, "x")], tanya: [21, 72] },
  ],
  semua: [
    { benda: "kue", acuan: 30, arah: "lebih", item: [M(80, 35, "y"), M(15, 9, "y"), M(38, 12, "x"), M(37, 13, "y")] },
    { benda: "kelereng", acuan: 40, arah: "kurang", item: [M(65, 23, "x"), M(32, 17, "y"), M(53, 21, "y"), M(79, 41, "x")] },
    { benda: "jeruk", acuan: 50, arah: "lebih", item: [M(72, 45, "x"), M(56, 32, "y"), M(71, 45, "x"), M(91, 67, "x")] },
  ],
  cerita: [
    [{ benda: "ikan", p: M(80, 35, "y") }, { benda: "kue", p: M(38, 12, "x") }],
    [{ benda: "jeruk", p: M(32, 17, "y") }, { benda: "pensil", p: M(65, 23, "x") }],
    [{ benda: "anggur", p: M(53, 21, "y") }, { benda: "kelereng", p: M(72, 45, "x") }],
  ],
  teksCerita: {
    "ikan-k80_35_y": "Pak Slamet punya 80 ikan di kolam. Sebagian ikan dijual ke pasar dan tersisa 45 ikan. Berapa ikan yang dijual?",
    "kue-k38_12_x": "Ibu membuat sejumlah kue. Sebanyak 12 kue dimakan dan tersisa 26 kue. Berapa kue yang dibuat Ibu?",
    "jeruk-k32_17_y": "Pedagang punya 32 jeruk. Sebagian jeruk terjual dan tersisa 15 jeruk. Berapa jeruk yang terjual?",
    "pensil-k65_23_x": "Sebuah toko punya sejumlah pensil. Terjual 23 pensil dan tersisa 42 pensil. Berapa pensil toko itu mula-mula?",
    "anggur-k53_21_y": "Pak Budi memanen 53 anggur. Sebagian anggur dibagikan dan tersisa 32 anggur. Berapa anggur yang dibagikan?",
    "kelereng-k72_45_x": "Alfa punya sejumlah kelereng. Ia memberikan 45 kelereng kepada Galih dan tersisa 27 kelereng. Berapa kelereng Alfa mula-mula?",
  },
  papan: [
    [{ benda: "kue", p: M(80, 35, "y") }, { benda: "jeruk", p: M(15, 9, "y") }],
    [{ benda: "kelereng", p: M(65, 23, "x") }, { benda: "pensil", p: M(37, 13, "y") }],
    [{ benda: "anggur", p: M(72, 45, "x") }, { benda: "ikan", p: M(56, 32, "y") }],
  ],
  urut: [
    { benda: "kue", item: [M(80, 35, "y"), M(15, 9, "y"), M(38, 12, "x")], dari: "kecil" },
    { benda: "pensil", item: [M(32, 17, "y"), M(37, 13, "y"), M(65, 23, "x")], dari: "besar" },
    { benda: "jeruk", item: [M(53, 21, "y"), M(56, 32, "y"), M(72, 45, "x")], dari: "kecil" },
  ],
  hitungP: [[M(80, 35, "y"), M(15, 9, "y")], [M(56, 32, "y"), M(38, 12, "x")], [M(79, 41, "x"), M(91, 67, "x")]],
  kalimatP: [M(80, 35, "y"), M(38, 12, "x"), M(72, 45, "x")],
  pasangP: [[M(37, 13, "y"), M(71, 45, "x"), M(53, 21, "y")], [M(80, 35, "y"), M(15, 9, "y"), M(65, 23, "x")], [M(32, 17, "y"), M(79, 41, "x"), M(56, 32, "y")]],
  memoriP: [
    [M(80, 35, "y"), M(15, 9, "y"), M(38, 12, "x"), M(37, 13, "y")],
    [M(32, 17, "y"), M(53, 21, "y"), M(65, 23, "x"), M(79, 41, "x")],
    [M(56, 32, "y"), M(72, 45, "x"), M(71, 45, "x"), M(91, 67, "x")],
  ],
  tabelP: [
    tabelKM([M(32, 17, "y"), M(56, 32, "y"), M(53, 21, "y"), M(15, 9, "y")], 1),
    tabelKM([M(38, 12, "x"), M(65, 23, "x"), M(79, 41, "x"), M(72, 45, "x")], 2),
    tabelKM([M(37, 13, "y"), M(71, 45, "x"), M(91, 67, "x"), M(80, 35, "y")], 3),
  ],
  semuaP: [
    { acuan: 20, arah: "lebih", item: [M(80, 35, "y"), M(15, 9, "y"), M(37, 13, "y"), M(38, 12, "x")] },
    { acuan: 30, arah: "kurang", item: [M(32, 17, "y"), M(65, 23, "x"), M(53, 21, "y"), M(79, 41, "x")] },
    { acuan: 40, arah: "lebih", item: [M(72, 45, "x"), M(56, 32, "y"), M(71, 45, "x"), M(91, 67, "x")] },
  ],
  pilahP: [
    [M(80, 35, "y"), M(38, 12, "x"), M(32, 17, "y"), M(65, 23, "x"), M(15, 9, "y"), M(79, 41, "x")],
    [M(53, 21, "y"), M(72, 45, "x"), M(56, 32, "y"), M(71, 45, "x"), M(37, 13, "y"), M(91, 67, "x")],
    [M(60, 25, "y"), M(48, 16, "x"), M(75, 28, "y"), M(52, 19, "x"), M(90, 44, "y"), M(63, 38, "x")],
  ],
  langkahP: [
    { judul: "Cari nilai pada 80 − … = 45", langkah: ["Baca kalimat Matematikanya", "Lihat bilangan yang diketahui: 80 dan 45", "Kurangkan: 80 − 45 = 35", "Periksa: 80 − 35 = 45"] },
    { judul: "Cari nilai pada … − 45 = 27", langkah: ["Baca kalimat Matematikanya", "Lihat bilangan yang diketahui: 45 dan 27", "Tambahkan: 45 + 27 = 72", "Periksa: 72 − 45 = 27"] },
    { judul: "Cari nilai pada 32 − … = 15", langkah: ["Tulis kalimat Matematikanya", "Gambar bagan bilangan awal dan bagiannya", "Kurangkan: 32 − 15 = 17", "Periksa: 32 − 17 = 15"] },
  ],
  papanP: [[M(80, 35, "y"), M(15, 9, "y")], [M(38, 12, "x"), M(37, 13, "y")], [M(65, 23, "x"), M(56, 32, "y")]],
  kemungkinanP: [
    { total: 40, pasang: [[15, 25], [30, 10], [22, 20], [28, 12]] },
    { total: 100, pasang: [[45, 55], [60, 30], [72, 28], [35, 65]] },
    { total: 80, pasang: [[35, 45], [50, 30], [44, 36], [25, 50]] },
  ],
  isiQ: [[M(32, 17, "y"), M(56, 32, "y")], [M(38, 12, "x"), M(65, 23, "x")], [M(15, 9, "y"), M(37, 13, "y")]],
  papanQ: [[M(53, 21, "y"), M(79, 41, "x")], [M(80, 35, "y"), M(72, 45, "x")], [M(71, 45, "x"), M(91, 67, "x")]],
  langkahQ: [M(32, 17, "y"), M(38, 12, "x"), M(80, 35, "y")],
  pasangQ: [[M(32, 17, "y"), M(56, 32, "y"), M(53, 21, "y")], [M(38, 12, "x"), M(65, 23, "x"), M(79, 41, "x")], [M(80, 35, "y"), M(72, 45, "x"), M(15, 9, "y")]],
  memoriQ: [
    [M(32, 17, "y"), M(56, 32, "y"), M(53, 21, "y"), M(15, 9, "y")],
    [M(38, 12, "x"), M(65, 23, "x"), M(79, 41, "x"), M(72, 45, "x")],
    [M(37, 13, "y"), M(71, 45, "x"), M(91, 67, "x"), M(80, 35, "y")],
  ],
  benarSalahQ: [
    [
      { teks: "80 − … = 45. Nilai yang belum diketahui adalah 35.", benar: true, penjelasan: "80 − 45 = 35, jadi 80 − 35 = 45." },
      { teks: "Pada 80 − … = 45, nilai … dicari dengan 80 − 45.", benar: true, penjelasan: "Untuk mencari bilangan yang dikurangkan, kurangi bilangan awal dengan sisanya." },
      { teks: "… − 45 = 27. Nilai yang belum diketahui adalah 18.", benar: false, penjelasan: "Kita menambahkan: 45 + 27 = 72. Jadi … = 72." },
      { teks: "Pada … − 12 = 26, nilai … dicari dengan 26 + 12.", benar: true, penjelasan: "Untuk mencari bilangan awal, tambahkan bilangan yang dikurangkan dengan sisanya." },
      { teks: "32 − … = 15. Nilai yang belum diketahui adalah 47.", benar: false, penjelasan: "32 − 15 = 17, jadi … = 17." },
    ],
    [
      { teks: "… − 23 = 42. Nilai yang belum diketahui adalah 65.", benar: true, penjelasan: "42 + 23 = 65, jadi 65 − 23 = 42." },
      { teks: "53 − … = 32. Nilai yang belum diketahui adalah 21.", benar: true, penjelasan: "53 − 32 = 21, jadi 53 − 21 = 32." },
      { teks: "Pada … − 41 = 38, kita mengurangkan 41 dari 38.", benar: false, penjelasan: "Kita menambahkan: 38 + 41 = 79. Jadi … = 79." },
      { teks: "Bila 80 − 35 = 45, maka 45 + 35 = 80.", benar: true, penjelasan: "Pengurangan dan penjumlahan saling berkaitan." },
      { teks: "… − 41 = 38. Nilai yang belum diketahui adalah 3.", benar: false, penjelasan: "38 + 41 = 79, jadi … = 79." },
    ],
  ],
  detektifQ: [
    { klue: ["Aku nilai yang belum diketahui pada 80 − … = 45.", "Aku kurang dari 40."], jawab: 35, opsi: [35, 125, 45], salah: "80 − 45 = 35, jadi 80 − 35 = 45." },
    { klue: ["Aku mengisi … − 45 = 27.", "Satuanku 2."], jawab: 72, opsi: [72, 18, 27], salah: "45 + 27 = 72, jadi 72 − 45 = 27." },
    { klue: ["Bila aku dikurangi 12, hasilnya 26.", "Aku kurang dari 50."], jawab: 38, opsi: [38, 14, 62], salah: "26 + 12 = 38, jadi 38 − 12 = 26." },
    { klue: ["Aku nilai yang belum diketahui pada 32 − … = 15.", "Puluhanku 1."], jawab: 17, opsi: [17, 47, 27], salah: "32 − 15 = 17, jadi 32 − 17 = 15." },
  ],
  petaQ: [
    {
      pusat: "Kalimat Matematika pengurangan",
      kotak: [
        { label: "Bentuk pengurangan dengan angka yang belum diketahui disebut", opsi: ["kalimat Matematika", "bilangan ganjil", "garis bilangan"], benar: 0 },
        { label: "Pada 80 − … = 45, bilangan yang diketahui adalah 80 dan", opsi: ["45", "35", "125"], benar: 0 },
        { label: "Untuk mencari bilangan yang dikurangkan, bilangan awal", opsi: ["dikurangi sisanya", "ditambah sisanya", "dikali sisanya"], benar: 0 },
        { label: "Menurutku, 80 − … = 45 hasilnya", opsi: ["35", "125", "25"], benar: 0 },
      ],
    },
    {
      pusat: "Mencari bilangan awal",
      kotak: [
        { label: "Pada … − 45 = 27, nilai … dicari dengan", opsi: ["27 + 45", "27 − 45", "45 − 27"], benar: 0 },
        { label: "27 + 45 sama dengan", opsi: ["72", "18", "62"], benar: 0 },
        { label: "Pada … − 12 = 26, nilai … dicari dengan", opsi: ["26 + 12", "26 − 12", "12 − 26"], benar: 0 },
        { label: "Menurutku, … − 12 = 26 hasilnya", opsi: ["38", "14", "48"], benar: 0 },
      ],
    },
  ],
  ceritaQ: [
    [
      { teks: "Pak Slamet punya 80 ekor ayam di kandang. Sebagian dijual ke pasar dan tersisa 45 ekor. Berapa ayam yang dijual?", p: M(80, 35, "y") },
      { teks: "Pak Slamet menjual 45 ekor ayam hari ini. Ayam di kandang tersisa 27 ekor. Berapa ayam Pak Slamet mula-mula?", p: M(72, 45, "x") },
    ],
    [
      { teks: "Pak Budi memanen 78 manggis. Sebagian dibagikan kepada tetangga dan tersisa 42. Berapa manggis yang dibagikan?", p: M(78, 36, "y") },
      { teks: "Sebuah toko menjual 23 pensil hari ini dan tersisa 42 pensil. Berapa pensil toko itu mula-mula?", p: M(65, 23, "x") },
    ],
    [
      { teks: "Di toko elektronik ada 40 televisi. Sebagian terjual dan tersisa 15. Berapa televisi yang terjual?", p: M(40, 25, "y") },
      { teks: "Alfa memberikan 45 kelereng kepada Galih dan masih memiliki 26 kelereng. Berapa kelereng Alfa mula-mula?", p: M(71, 45, "x") },
    ],
  ],
  susunKataQ: [
    { kata: ["Kalimat", "Matematika", "pengurangan", "memuat", "angka", "yang", "belum", "diketahui"], pengecoh: "penjumlahan" },
    { kata: ["Bilangan", "awal", "dikurangi", "sisa", "hasilnya", "bilangan", "yang", "dikurangkan"], pengecoh: "ditambah" },
    { kata: ["Sisa", "ditambah", "bilangan", "yang", "dikurangkan", "hasilnya", "bilangan", "awal"], pengecoh: "dibagi" },
    { kata: ["80", "dikurangi", "35", "sama", "dengan", "45"], pengecoh: "dikali" },
  ],
};
