/**
 * Data murni dan mesin pemeriksa Matematika Kelas 2 Bab 7 (Ayo Membilang sampai dengan 100).
 * Tanpa React dan tanpa impor nilai dari berkas lain, supaya bisa diuji langsung di Node (scripts/uji-data-k2b7.mjs).
 *
 * Sub-Bab A (Menghitung, Membaca, dan Menulis Bilangan): semua kunci dihitung dari bilangan (puluhan, satuan, nama bilangan).
 * Sub-Bab B (Membandingkan Bilangan): kunci dihitung dari perbandingan puluhan dan satuan. Tidak ada acak: semua urutan tetap
 * (aman untuk render server).
 */

export const Kapital = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Urutan tampil beberapa pilihan, tetap tanpa acak. */
export function urutanTetap(n: number, langkah = 3, geser = 0): number[] {
  const g = ((geser % n) + n) % n;
  const awal = (g * langkah) % n;
  return Array.from({ length: n }, (_, i) => (i + awal) % n);
}

/** Urutan tampil benda yang harus diurutkan siswa: berupa putaran tetap yang dijamin berbeda dari urutan kunci. */
export function urutTampil<T>(daftar: readonly T[], kunci: readonly T[], nomor: number): T[] {
  const n = daftar.length;
  for (let g = 0; g < n; g += 1) {
    const p = urutanTetap(n, 2, nomor + g).map((i) => daftar[i]);
    if (JSON.stringify(p) !== JSON.stringify(kunci)) return p;
  }
  return [...daftar].reverse();
}

/** Tiga pilihan teks: satu benar dan dua pengecoh. Kembalikan pilihan dan nomor kuncinya. */
export function susunOpsi(benar: string, pengecoh: [string, string], nomor: number): { opsi: string[]; jawab: number } {
  const semua = [benar, pengecoh[0], pengecoh[1]];
  const opsi = urutanTetap(3, 2, nomor).map((i) => semua[i]);
  return { opsi, jawab: opsi.indexOf(benar) };
}

/* ====================================================================== */
/* Bilangan, puluhan, dan satuan                                            */
/* ====================================================================== */

const KATA_SATUAN = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];

/** Nama bilangan 1 sampai 100 dalam bahasa Indonesia, mis. 53 menjadi "lima puluh tiga". */
export function terbilang(n: number): string {
  if (n === 100) return "seratus";
  if (n === 0) return "nol";
  if (n < 10) return KATA_SATUAN[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${KATA_SATUAN[n - 10]} belas`;
  const p = Math.floor(n / 10);
  const s = n % 10;
  return `${KATA_SATUAN[p]} puluh${s ? ` ${KATA_SATUAN[s]}` : ""}`;
}

export const puluhan = (n: number): number => Math.floor(n / 10);
export const satuan = (n: number): number => n % 10;
export const susunBilangan = (p: number, s: number): number => p * 10 + s;
/** "5 puluhan dan 3 satuan" */
export const kataPS = (n: number): string => `${puluhan(n)} puluhan dan ${satuan(n)} satuan`;
export const jumlahDigit = (n: number): number => puluhan(n) + satuan(n);

/** Pengecoh bilangan: tukar puluhan dan satuan, lalu geser sepuluh atau satu. Selalu berbeda dari kunci dan dalam 1 sampai 100. */
export function pengecohBilangan(n: number): [number, number] {
  const kandidat: number[] = [];
  const tukar = satuan(n) * 10 + puluhan(n);
  if (n < 100 && tukar !== n) kandidat.push(tukar);
  kandidat.push(n + 10, n - 10, n + 1, n - 1);
  const ok = kandidat.filter((x) => x >= 1 && x <= 100 && x !== n);
  return [ok[0], ok[1]];
}

/** Tiga pilihan bilangan dengan kunci berpindah tempat. */
export function opsiBilangan(n: number, nomor: number): number[] {
  const semua = [n, ...pengecohBilangan(n)];
  return urutanTetap(3, 2, nomor).map((i) => semua[i]);
}

/** Tiga pilihan kelipatan sepuluh: kunci, sepuluh lebihnya, sepuluh kurangnya (atau dua puluh bila di tepi). */
export function opsiPuluhan(n: number, nomor: number): number[] {
  const lain = n + 10 <= 100 ? (n - 10 >= 0 ? [n + 10, n - 10] : [n + 10, n + 20]) : [n - 10, n - 20];
  const semua = [n, ...lain];
  return urutanTetap(3, 2, nomor).map((i) => semua[i]);
}

/** Tiga pilihan angka kecil di sekitar kunci. */
export function opsiAngka(jawab: number, nomor: number): number[] {
  const semua = jawab <= 1 ? [jawab, jawab + 1, jawab + 2] : [jawab, jawab + 1, jawab - 1];
  return urutanTetap(3, 2, nomor).map((i) => semua[i]);
}

export type Rel = "lebih besar" | "lebih kecil" | "sama dengan";
export const REL_SEMUA: Rel[] = ["lebih besar", "lebih kecil", "sama dengan"];

/** Hubungan a terhadap b: bandingkan puluhan dulu, bila sama bandingkan satuan. */
export function banding(a: number, b: number): Rel {
  if (puluhan(a) !== puluhan(b)) return puluhan(a) > puluhan(b) ? "lebih besar" : "lebih kecil";
  if (satuan(a) !== satuan(b)) return satuan(a) > satuan(b) ? "lebih besar" : "lebih kecil";
  return "sama dengan";
}
export const lawanRel = (r: Rel): Rel => (r === "lebih besar" ? "lebih kecil" : r === "lebih kecil" ? "lebih besar" : "sama dengan");

/** "Bilangan 65 lebih besar dari bilangan 56." atau "Bilangan 54 sama dengan bilangan 54." */
export function kalimatBanding(a: number, b: number): string {
  const r = banding(a, b);
  return r === "sama dengan" ? `Bilangan ${a} sama dengan bilangan ${b}.` : `Bilangan ${a} ${r} dari bilangan ${b}.`;
}

/** Tanda perbandingan a terhadap b. */
export const tanda = (a: number, b: number): ">" | "<" | "=" => {
  const r = banding(a, b);
  return r === "lebih besar" ? ">" : r === "lebih kecil" ? "<" : "=";
};

/** Bilangan yang x lebihnya atau kurangnya. */
export const lebihnya = (n: number, k: number): number => n + k;
export const kurangnya = (n: number, k: number): number => n - k;

/** Urutan bilangan dari paling kecil atau dari paling besar. */
export function urutBilangan(angka: readonly number[], dari: "kecil" | "besar"): number[] {
  const s = [...angka].sort((x, y) => x - y);
  return dari === "kecil" ? s : s.reverse();
}

/** Selisih mutlak antara tebakan dan banyak sebenarnya. */
export const selisihTebakan = (tebak: number, nyata: number): number => Math.abs(tebak - nyata);

/** Tiga tebakan kelipatan sepuluh di sekitar banyak sebenarnya (urut naik). Yang terdekat selalu salah satunya. */
export function tebakanPilihan(n: number): number[] {
  const t0 = Math.min(100, Math.max(10, Math.round(n / 10) * 10));
  const lain = t0 + 20 <= 100 ? [t0 + 20, t0 - 20] : [t0 - 20, t0 - 40];
  return [t0, ...lain].sort((x, y) => x - y);
}
export const tebakanTerdekat = (n: number): number => tebakanPilihan(n).reduce((a, b) => (selisihTebakan(b, n) < selisihTebakan(a, n) ? b : a));

/** Titik tebar: posisi tetap (tanpa acak) untuk n titik atau benda di kotak 100 x 60 dengan jarak minimum. */
export function sebarTitik(n: number, lebar = 100, tinggi = 60): [number, number][] {
  const hasil: [number, number][] = [];
  const kolom = Math.ceil(Math.sqrt((n * lebar) / tinggi));
  const baris = Math.ceil(n / kolom);
  for (let i = 0; i < n; i += 1) {
    const r = Math.floor(i / kolom);
    const k = i % kolom;
    const geserX = (((i * 37) % 7) - 3) * 0.5;
    const geserY = (((i * 53) % 7) - 3) * 0.5;
    hasil.push([((k + 0.5) / kolom) * lebar + geserX, ((r + 0.5) / baris) * tinggi + geserY]);
  }
  return hasil;
}

/** Jendela garis bilangan sepanjang `panjang` kotak, kunci tidak di tepi dan letaknya berpindah menurut `nomor`. */
export function jendela(jawab: number, nomor: number, panjang = 9): [number, number] {
  const idx = 1 + ((nomor * 3) % (panjang - 2));
  const dari = Math.min(Math.max(jawab - idx, 1), 100 - panjang + 1);
  return [dari, dari + panjang - 1];
}

/** Jendela garis bilangan yang memuat dua bilangan sekaligus (bilangan awal dan hasil lompatan), letaknya berpindah menurut `nomor`. */
export function jendelaDua(a: number, b: number, nomor: number, panjang = 9): [number, number] {
  const lo = Math.min(a, b);
  const hi = Math.max(a, b);
  const sisa = Math.max(0, panjang - 1 - (hi - lo));
  const kiri = (nomor * 3) % (sisa + 1);
  const dari = Math.min(Math.max(lo - kiri, 1), 100 - panjang + 1);
  return [dari, dari + panjang - 1];
}

/* ====================================================================== */
/* Benda dan wadah (Concrete)                                               */
/* ====================================================================== */

export type BendaId = "kue" | "kelereng" | "rambutan" | "ikan" | "lidi" | "jeruk" | "pensil" | "anggur";
export const BENDA_INFO: Record<BendaId, { nama: string; wadah: string; satu: string }> = {
  kue: { nama: "kue cubit", wadah: "bungkus", satu: "kue cubit" },
  kelereng: { nama: "kelereng", wadah: "kantong", satu: "kelereng" },
  rambutan: { nama: "rambutan", wadah: "keranjang", satu: "buah rambutan" },
  ikan: { nama: "ikan hias", wadah: "kelompok", satu: "ikan hias" },
  lidi: { nama: "lidi", wadah: "ikat", satu: "lidi" },
  jeruk: { nama: "jeruk", wadah: "kotak", satu: "buah jeruk" },
  pensil: { nama: "pensil warna", wadah: "kotak", satu: "pensil warna" },
  anggur: { nama: "anggur", wadah: "tandan", satu: "buah anggur" },
};
export const ID_BENDA = Object.keys(BENDA_INFO) as BendaId[];

/* ====================================================================== */
/* SUB-BAB A. Menghitung, membaca, dan menulis bilangan sampai 100          */
/* ====================================================================== */

/* ------------------------------ Concrete A ------------------------------ */

/** A1 Isi Bungkus Sepuluh: isi satu wadah dengan sepuluh benda. */
export const RONDE_BUNGKUS_A: BendaId[] = ["kue", "kelereng", "rambutan"];

/** A2 Hitung Bungkus: banyak wadah penuh (puluhan). */
export type SoalWadah = { benda: BendaId; n: number };
export const RONDE_HITUNGBUNGKUS_A: SoalWadah[][] = [
  [{ benda: "kue", n: 5 }, { benda: "kue", n: 6 }],
  [{ benda: "kue", n: 7 }, { benda: "kelereng", n: 8 }],
  [{ benda: "kue", n: 9 }, { benda: "kue", n: 10 }],
];

/** A3 Jodohkan Bungkus dan Bilangan: banyak wadah penuh. */
export const RONDE_JODOHBUNGKUS_A: number[][] = [[2, 5, 8], [3, 6, 9], [4, 7, 10]];

/** A4 Rakit Bilangan: susun wadah penuh dan benda lepas sampai sama dengan bilangan. */
export type TargetBenda = { benda: BendaId; n: number };
export const RONDE_RAKIT_A: TargetBenda[] = [{ benda: "rambutan", n: 53 }, { benda: "kelereng", n: 67 }, { benda: "kue", n: 74 }, { benda: "jeruk", n: 82 }];

/** A5 Ikat Sepuluh: benda lepas diikat sepuluh-sepuluh. */
export const RONDE_IKAT_A: TargetBenda[] = [{ benda: "lidi", n: 23 }, { benda: "kelereng", n: 37 }, { benda: "pensil", n: 46 }];

/** A6 Tebak dan Hitung. */
export const RONDE_TEBAK_A: TargetBenda[] = [{ benda: "ikan", n: 62 }, { benda: "jeruk", n: 38 }, { benda: "anggur", n: 85 }];

/** A7 Memori: banyak benda dan lambang bilangannya. */
export const RONDE_MEMORI_A: number[][] = [[23, 35, 47, 62], [31, 44, 56, 68], [42, 53, 61, 65]];

/** A8 Urutkan Banyak Benda. */
export type RondeUrutBanyak = { angka: number[]; dari: "kecil" | "besar" };
export const RONDE_URUTBANYAK_A: RondeUrutBanyak[] = [
  { angka: [36, 52, 78, 91], dari: "kecil" },
  { angka: [84, 29, 67, 45], dari: "besar" },
  { angka: [73, 38, 95, 61], dari: "kecil" },
];

/** A9 Pilah Kelompok: kurang dari 50 atau lebih dari 50. */
export const RONDE_PILAH_A: number[][] = [[23, 48, 62, 75, 34, 89], [19, 56, 91, 42, 67, 38], [27, 83, 45, 71, 58, 36]];

/** A10 Kantong Misterius: dua soal tiap ronde, empat kumpulan benda. */
export type SoalKantong = { target: number; item: number[] };
export const RONDE_KANTONG_A: SoalKantong[][] = [
  [{ target: 67, item: [67, 76, 57, 66] }, { target: 53, item: [35, 53, 63, 52] }],
  [{ target: 48, item: [84, 48, 58, 47] }, { target: 82, item: [28, 81, 92, 82] }],
  [{ target: 71, item: [17, 70, 81, 71] }, { target: 94, item: [49, 95, 84, 94] }],
];

/* ------------------------------ Picture A ------------------------------ */

/** P1 Hitung Batang Puluhan: banyak batang. */
export const RONDE_BATANG_PA: number[][] = [[5, 8], [3, 10], [6, 7]];
/** P2 Cari Model Bilangan. */
export const RONDE_CARIMODEL_PA: SoalKantong[][] = [
  [{ target: 73, item: [73, 37, 63, 72] }, { target: 45, item: [54, 44, 45, 35] }],
  [{ target: 28, item: [28, 82, 38, 27] }, { target: 91, item: [19, 91, 81, 90] }],
  [{ target: 56, item: [65, 55, 46, 56] }, { target: 39, item: [93, 38, 29, 39] }],
];
/** P3 Isi Papan Nilai Tempat. */
export const RONDE_ISIPAPAN_PA: number[] = [34, 57, 72, 90];
/** P4 Jodohkan Model dan Bilangan. */
export const RONDE_JODOHMODEL_PA: number[][] = [[24, 51, 87], [36, 63, 98], [45, 72, 19]];
/** P5 Pasangan Bilangan: bagian yang tersembunyi bertanda null. */
export type SoalBond = { total: number; a: number | null; b: number | null };
export const RONDE_BOND_PA: SoalBond[][] = [
  [{ total: 67, a: 60, b: null }, { total: 53, a: null, b: 3 }],
  [{ total: 84, a: 80, b: null }, { total: 29, a: null, b: 9 }],
  [{ total: 95, a: null, b: 5 }, { total: 48, a: 40, b: null }],
];
/** P6 Garis Puluhan: mulai dan banyak loncatan sepuluh. */
export type SoalLoncat = { mulai: number; loncat: number };
export const RONDE_GARISPULUHAN_PA: SoalLoncat[][] = [
  [{ mulai: 30, loncat: 4 }, { mulai: 20, loncat: 3 }, { mulai: 50, loncat: 5 }],
  [{ mulai: 10, loncat: 6 }, { mulai: 40, loncat: 2 }, { mulai: 60, loncat: 3 }],
  [{ mulai: 0, loncat: 8 }, { mulai: 70, loncat: 2 }, { mulai: 30, loncat: 7 }],
];
export const hasilLoncat = (s: SoalLoncat): number => s.mulai + s.loncat * 10;
/** P7 Tabel Seratus: bilangan tersembunyi pada tabel 51 sampai 100. */
export const RONDE_TABELSERATUS_PA: number[][] = [[58, 65, 72, 79], [53, 69, 76, 84, 91], [60, 70, 80, 90, 100]];
/** P8 Urutkan Model. */
export const RONDE_URUTMODEL_PA: RondeUrutBanyak[] = [
  { angka: [57, 76, 83], dari: "kecil" },
  { angka: [48, 94, 65, 31], dari: "besar" },
  { angka: [29, 92, 56], dari: "kecil" },
];
/** P9 Pilah Model menurut banyak puluhan: tiga kotak, masing-masing dua model. */
export const RONDE_PILAHMODEL_PA: { puluhan: [number, number, number]; angka: number[] }[] = [
  { puluhan: [3, 5, 7], angka: [32, 38, 54, 57, 71, 76] },
  { puluhan: [2, 4, 6], angka: [21, 29, 43, 48, 65, 67] },
  { puluhan: [4, 6, 8], angka: [41, 49, 62, 68, 84, 87] },
];
/** P10 Tebak Banyak Titik. */
export const RONDE_TEBAKTITIK_PA: number[] = [47, 33, 76];

/* ------------------------------ Abstract A ------------------------------ */

/** Q1 Jodohkan Kata: "n puluhan dan s satuan" dengan lambang bilangan. */
export const RONDE_JODOHKATA_QA: number[][] = [[92, 73, 100], [66, 87, 54], [41, 78, 99]];
/** Q2 Lengkapi Kalimat. */
export const RONDE_KALIMAT_QA: number[][] = [[67, 53, 92], [46, 71, 85]];
export type KalimatIsian = { depan: string; belakang: string; opsi: string[]; benar: number };
export function kalimatIsianPS(n: number, nomor: number): KalimatIsian {
  const o = opsiBilangan(n, nomor);
  return { depan: `${kataPS(n)} sama dengan`, belakang: ".", opsi: o.map(String), benar: o.indexOf(n) };
}
/** Q3 Susun Nama Bilangan dan kalimat. */
export const RONDE_SUSUN_QA: { kata: string[]; pengecoh: string }[] = [
  { kata: ["Enam", "puluh", "dua", "ditulis", "62"], pengecoh: "26" },
  { kata: ["Sepuluh", "puluhan", "dibaca", "seratus"], pengecoh: "sebelas" },
  { kata: ["Lima", "puluhan", "dan", "tiga", "satuan", "sama", "dengan", "53"], pengecoh: "35" },
  { kata: ["Satu", "bungkus", "berisi", "sepuluh", "kue", "cubit"], pengecoh: "seratus" },
];
/** Q4 Isi Tabel Puluhan dan Satuan. */
export type TabelBaris = { label: string; jawab: string };
export type TabelRonde = { judul: string; kepala: [string, string]; baris: TabelBaris[]; kartu: string[] };
const kartuPS = (angka: number[]): string[] => {
  const jawab = angka.map(kataPS);
  const ekstra = [kataPS(satuan(angka[0]) * 10 + puluhan(angka[0])), kataPS(angka[1] + 1)];
  return [...new Set([...jawab, ...ekstra])];
};
export const RONDE_TABEL_QA: TabelRonde[] = [
  { judul: "Puluhan dan satuan", kepala: ["Bilangan", "Puluhan dan satuan"], baris: [53, 67, 82, 29].map((n) => ({ label: String(n), jawab: kataPS(n) })), kartu: kartuPS([53, 67, 82, 29]) },
  { judul: "Puluhan dan satuan, ronde dua", kepala: ["Bilangan", "Puluhan dan satuan"], baris: [41, 76, 95, 100].map((n) => ({ label: String(n), jawab: kataPS(n) })), kartu: kartuPS([41, 76, 95, 100]) },
];
/** Q5 Benar atau Salah. */
export type Pernyataan = { teks: string; benar: boolean; penjelasan: string };
export const RONDE_BENARSALAH_QA: Pernyataan[][] = [
  [
    { teks: "Sepuluh satuan sama dengan satu puluhan.", benar: true, penjelasan: "Sepuluh satuan dikelompokkan menjadi satu puluhan, seperti sepuluh kue dalam satu bungkus." },
    { teks: "5 puluhan dan 3 satuan sama dengan 35.", benar: susunBilangan(5, 3) === 35, penjelasan: "5 puluhan dan 3 satuan sama dengan 50 tambah 3, yaitu 53. Angka puluhan ditulis di sebelah kiri." },
    { teks: "10 puluhan sama dengan seratus.", benar: 10 * 10 === 100, penjelasan: "Sepuluh puluhan adalah seratus, dibaca seratus." },
    { teks: `Bilangan 62 dibaca ${terbilang(62)}.`, benar: true, penjelasan: "Enam puluh dan dua menjadi enam puluh dua." },
    { teks: "Bilangan 29 mempunyai 9 puluhan dan 2 satuan.", benar: puluhan(29) === 9, penjelasan: "Bilangan 29 mempunyai 2 puluhan dan 9 satuan." },
  ],
  [
    { teks: "6 puluhan sama dengan 60.", benar: 6 * 10 === 60, penjelasan: "Enam kali sepuluh adalah enam puluh." },
    { teks: "Tujuh puluh delapan ditulis 87.", benar: susunBilangan(7, 8) === 87, penjelasan: "Tujuh puluh delapan ditulis 78: angka 7 di puluhan dan angka 8 di satuan." },
    { teks: "Bilangan 100 mempunyai 10 puluhan dan 0 satuan.", benar: puluhan(100) === 10 && satuan(100) === 0, penjelasan: "Seratus sama dengan sepuluh puluhan, tanpa satuan." },
    { teks: "Pada bilangan 84, angka 8 menunjukkan 8 puluhan.", benar: puluhan(84) === 8, penjelasan: "Angka 8 ada di tempat puluhan, jadi bernilai delapan puluh." },
    { teks: "Menebak banyak benda boleh sebelum menghitung.", benar: true, penjelasan: "Menebak melatih kita memperkirakan, lalu kita buktikan dengan menghitung." },
  ],
];
/** Q6 Lambang bilangan dari nama bilangan. */
export const RONDE_NAMA_QA: number[][] = [[62, 78], [53, 91], [87, 45]];
/** Q7 Detektif Bilangan. */
export type Klue =
  | { jenis: "puluhan"; n: number }
  | { jenis: "satuan"; n: number }
  | { jenis: "lebihDari"; n: number }
  | { jenis: "kurangDari"; n: number }
  | { jenis: "jumlahDigit"; n: number }
  | { jenis: "satuanLebih"; n: number };
export function cocokKlue(b: number, k: Klue): boolean {
  switch (k.jenis) {
    case "puluhan": return puluhan(b) === k.n;
    case "satuan": return satuan(b) === k.n;
    case "lebihDari": return b > k.n;
    case "kurangDari": return b < k.n;
    case "jumlahDigit": return jumlahDigit(b) === k.n;
    case "satuanLebih": return satuan(b) - puluhan(b) === k.n;
  }
}
export function teksKlue(k: Klue): string {
  switch (k.jenis) {
    case "puluhan": return `Puluhanku ${k.n}.`;
    case "satuan": return `Satuanku ${k.n}.`;
    case "lebihDari": return `Aku lebih besar dari ${k.n}.`;
    case "kurangDari": return `Aku lebih kecil dari ${k.n}.`;
    case "jumlahDigit": return `Jumlah puluhan dan satuanku ${k.n}.`;
    case "satuanLebih": return `Satuanku ${k.n} lebihnya dari puluhanku.`;
  }
}
export type SoalDetektif = { klue: Klue[]; opsi: number[]; jawab: number };
export const RONDE_DETEKTIF_QA: SoalDetektif[] = [
  { klue: [{ jenis: "puluhan", n: 7 }, { jenis: "satuan", n: 3 }], opsi: [37, 73, 70], jawab: 73 },
  { klue: [{ jenis: "lebihDari", n: 80 }, { jenis: "kurangDari", n: 90 }, { jenis: "satuan", n: 4 }], opsi: [94, 74, 84], jawab: 84 },
  { klue: [{ jenis: "puluhan", n: 5 }, { jenis: "jumlahDigit", n: 9 }], opsi: [54, 59, 45], jawab: 54 },
  { klue: [{ jenis: "lebihDari", n: 60 }, { jenis: "kurangDari", n: 70 }, { jenis: "satuan", n: 5 }], opsi: [56, 75, 65], jawab: 65 },
];
/** Q9 Urutkan Bilangan. */
export const RONDE_URUTANGKA_QA: RondeUrutBanyak[] = [
  { angka: [62, 26, 71, 17], dari: "kecil" },
  { angka: [58, 85, 49, 94], dari: "besar" },
  { angka: [90, 39, 83, 48, 74], dari: "kecil" },
];
/** Q10 Ketuk Semua: ciri bilangan. */
export type SoalSemua = { tanya: string; angka: number[]; ciri: (n: number) => boolean };
export const RONDE_KETUKSEMUA_QA: SoalSemua[] = [
  { tanya: "Ketuk semua bilangan yang mempunyai 6 puluhan.", angka: [62, 36, 68, 26, 60, 86], ciri: (n) => puluhan(n) === 6 },
  { tanya: "Ketuk semua bilangan yang satuannya 5.", angka: [25, 52, 45, 54, 85, 58], ciri: (n) => satuan(n) === 5 },
  { tanya: "Ketuk semua bilangan yang lebih besar dari 70.", angka: [68, 72, 79, 70, 81, 65], ciri: (n) => n > 70 },
];

export type KotakPeta = { label: string; opsi: string[]; benar: number };
export const PETA_KONSEP_A: { pusat: string; kotak: KotakPeta[] }[] = [
  {
    pusat: "Puluhan dan satuan",
    kotak: [
      { label: "Sepuluh satuan sama dengan", opsi: ["satu puluhan", "dua puluhan", "satu ratusan"], benar: 0 },
      { label: "Satu bungkus berisi sepuluh kue, jadi satu bungkus adalah", opsi: ["satu puluhan", "satu satuan", "seratus"], benar: 0 },
      { label: "Sepuluh puluhan sama dengan", opsi: ["seratus", "sepuluh", "sembilan puluh"], benar: 0 },
      { label: "Menurutku, bilangan 53 terdiri dari", opsi: ["5 puluhan dan 3 satuan", "3 puluhan dan 5 satuan", "8 puluhan"], benar: 0 },
    ],
  },
  {
    pusat: "Membaca dan menulis bilangan",
    kotak: [
      { label: "Angka di sebelah kiri menunjukkan", opsi: ["puluhan", "satuan", "ratusan"], benar: 0 },
      { label: "Bilangan enam puluh dua ditulis", opsi: ["62", "26", "602"], benar: 0 },
      { label: "Pasangan bilangan 67 adalah", opsi: ["60 dan 7", "6 dan 70", "50 dan 17"], benar: 0 },
      { label: "Menurutku, untuk memperkirakan banyak benda aku", opsi: ["membuat kelompok sepuluh", "menebak sembarang", "menunggu temanku"], benar: 0 },
    ],
  },
];

/* ====================================================================== */
/* SUB-BAB B. Membandingkan bilangan                                        */
/* ====================================================================== */

/* ------------------------------ Concrete B ------------------------------ */

/** B1 Langkah Maju dan Mundur: dua soal tiap ronde. */
export type SoalLangkah = { mulai: number; arah: "maju" | "mundur"; langkah: number };
export const RONDE_LANGKAH_B: SoalLangkah[][] = [
  [{ mulai: 58, arah: "maju", langkah: 2 }, { mulai: 75, arah: "mundur", langkah: 3 }],
  [{ mulai: 64, arah: "maju", langkah: 3 }, { mulai: 83, arah: "mundur", langkah: 2 }],
  [{ mulai: 91, arah: "maju", langkah: 4 }, { mulai: 50, arah: "mundur", langkah: 1 }],
];
export const hasilLangkah = (s: SoalLangkah): number => (s.arah === "maju" ? s.mulai + s.langkah : s.mulai - s.langkah);

/** B2 Di Mana Aku? (di antara dua bilangan). */
export const RONDE_ANTARA_B: [number, number][][] = [
  [[57, 59], [74, 76], [63, 65]],
  [[82, 84], [91, 93], [69, 71]],
  [[51, 53], [78, 80], [96, 98]],
];

/** B3 Siapa Lebih Banyak: pasangan anak dan banyak kelerengnya. */
export type SoalAnak = { a: number; b: number; namaA: string; namaB: string };
export const RONDE_BANDING_B: SoalAnak[][] = [
  [{ a: 56, b: 65, namaA: "Halim", namaB: "Malosi" }, { a: 54, b: 58, namaA: "Kira", namaB: "Tika" }],
  [{ a: 43, b: 38, namaA: "Kira", namaB: "Tika" }, { a: 77, b: 72, namaA: "Upe", namaB: "Lili" }],
  [{ a: 65, b: 56, namaA: "Malosi", namaB: "Halim" }, { a: 47, b: 47, namaA: "Upe", namaB: "Kira" }],
];
export function opsiBandingAnak(s: SoalAnak, nomor: number): { opsi: string[]; jawab: number } {
  const r = banding(s.a, s.b);
  const benar = r === "lebih besar" ? `${s.namaA} lebih banyak` : r === "lebih kecil" ? `${s.namaB} lebih banyak` : "Sama banyak";
  const semua = [`${s.namaA} lebih banyak`, `${s.namaB} lebih banyak`, "Sama banyak"];
  return susunOpsi(benar, semua.filter((x) => x !== benar) as [string, string], nomor);
}

/** B4 Ketuk yang Paling Banyak dan Paling Sedikit. */
export const RONDE_PALING_B: number[][] = [[56, 65, 48], [72, 27, 70], [91, 19, 90]];
/** B5 Susun Dua Kartu: bilangan terbesar atau terkecil. */
export type SoalKartu = { kartu: [number, number]; arah: "besar" | "kecil" };
export const RONDE_KARTU_B: SoalKartu[] = [
  { kartu: [3, 7], arah: "besar" },
  { kartu: [5, 2], arah: "kecil" },
  { kartu: [8, 6], arah: "besar" },
  { kartu: [4, 9], arah: "kecil" },
];
export const hasilKartu = (s: SoalKartu): number => {
  const [x, y] = s.kartu;
  const besar = Math.max(x, y) * 10 + Math.min(x, y);
  const kecil = Math.min(x, y) * 10 + Math.max(x, y);
  return s.arah === "besar" ? besar : kecil;
};
/** B6 Urutkan Kantong (kumpulan benda). */
export const RONDE_URUT_B: RondeUrutBanyak[] = [
  { angka: [76, 83, 57], dari: "kecil" },
  { angka: [65, 56, 74], dari: "kecil" },
  { angka: [77, 86, 79], dari: "besar" },
];
/** B7 Pasangkan Banding: tiap ronde punya ketiga hubungan. */
export const RONDE_PASANGBANDING_B: [number, number][][] = [
  [[56, 65], [48, 48], [73, 37]],
  [[81, 18], [62, 62], [29, 92]],
  [[54, 58], [70, 70], [99, 90]],
];
/** B8 Memori. */
export const RONDE_MEMORI_B: number[][] = [[27, 38, 52, 64], [35, 46, 53, 61], [43, 57, 68, 62]];
/** B9 Pilah terhadap acuan. */
export const RONDE_PILAH_B: { acuan: number; angka: number[] }[] = [
  { acuan: 60, angka: [45, 72, 58, 81, 63, 39] },
  { acuan: 75, angka: [68, 82, 90, 71, 79, 64] },
  { acuan: 40, angka: [35, 47, 29, 58, 33, 62] },
];
/** B10 Ketuk Semua terhadap acuan. */
export type SoalSemuaAcuan = { acuan: number; arah: "lebih" | "kurang"; angka: number[] };
export const RONDE_SEMUA_B: SoalSemuaAcuan[] = [
  { acuan: 65, arah: "lebih", angka: [58, 72, 66, 65, 80, 49] },
  { acuan: 50, arah: "kurang", angka: [42, 57, 48, 50, 31, 64] },
  { acuan: 80, arah: "lebih", angka: [79, 85, 81, 80, 92, 68] },
];
export const cocokAcuan = (n: number, s: SoalSemuaAcuan): boolean => (s.arah === "lebih" ? n > s.acuan : n < s.acuan);

/* ------------------------------ Picture B ------------------------------ */

/** PB1 Garis Bilangan: di antara, lebih, atau kurang dari. */
export type SoalGarisB = { jenis: "antara"; a: number; c: number } | { jenis: "lebih"; n: number; k: number } | { jenis: "kurang"; n: number; k: number };
export const RONDE_GARIS_PB: SoalGarisB[][] = [
  [{ jenis: "antara", a: 57, c: 59 }, { jenis: "lebih", n: 58, k: 2 }, { jenis: "kurang", n: 75, k: 3 }],
  [{ jenis: "antara", a: 82, c: 84 }, { jenis: "lebih", n: 64, k: 3 }, { jenis: "kurang", n: 91, k: 2 }],
  [{ jenis: "antara", a: 69, c: 71 }, { jenis: "lebih", n: 46, k: 4 }, { jenis: "kurang", n: 98, k: 5 }],
];
export const hasilGaris = (s: SoalGarisB): number => (s.jenis === "antara" ? (s.a + s.c) / 2 : s.jenis === "lebih" ? s.n + s.k : s.n - s.k);
export function tanyaGaris(s: SoalGarisB): string {
  return s.jenis === "antara" ? `Ketuk bilangan yang berada di antara ${s.a} dan ${s.c}.` : s.jenis === "lebih" ? `Ketuk bilangan yang ${s.k} lebihnya dari ${s.n}.` : `Ketuk bilangan yang ${s.k} kurangnya dari ${s.n}.`;
}
/** PB2 Bandingkan Papan: dua papan nilai tempat. */
export const RONDE_BANDINGPAPAN_PB: [number, number][][] = [
  [[65, 56], [58, 54]],
  [[73, 37], [44, 44]],
  [[81, 87], [90, 19]],
];
export function opsiBandingHuruf(a: number, b: number, nomor: number): { opsi: string[]; jawab: number } {
  const r = banding(a, b);
  const benar = r === "lebih besar" ? "Papan A lebih besar" : r === "lebih kecil" ? "Papan B lebih besar" : "Sama besar";
  const semua = ["Papan A lebih besar", "Papan B lebih besar", "Sama besar"];
  return susunOpsi(benar, semua.filter((x) => x !== benar) as [string, string], nomor);
}
/** PB3 Urutkan Papan. */
export const RONDE_URUTPAPAN_PB: RondeUrutBanyak[] = [
  { angka: [57, 76, 83], dari: "kecil" },
  { angka: [56, 65, 74], dari: "kecil" },
  { angka: [59, 68, 86, 71], dari: "besar" },
];
/** PB4 Ketuk Model yang Terbesar dan Terkecil. */
export const RONDE_MODELBESAR_PB: number[][] = [[34, 43, 28], [75, 57, 70], [92, 29, 90]];
/** PB5 Pilah Model terhadap acuan. */
export const RONDE_PILAHMODEL_PB: { acuan: number; angka: number[] }[] = [
  { acuan: 50, angka: [42, 67, 51, 38, 59, 46] },
  { acuan: 30, angka: [24, 41, 33, 18, 27, 52] },
  { acuan: 80, angka: [72, 91, 85, 66, 78, 94] },
];
/** PB6 Tanda perbandingan: tiap ronde punya ketiga tanda. */
export const RONDE_SIMBOL_PB: [number, number][][] = [
  [[34, 43], [60, 60], [91, 19]],
  [[52, 25], [77, 77], [68, 86]],
  [[81, 18], [55, 55], [39, 93]],
];
/** PB7 Tabel Seratus (tetangga). */
export const RONDE_TABELSERATUS_PB: number[][] = [[52, 57, 64, 68], [71, 75, 79, 88, 93], [54, 66, 80, 85, 97]];
/** PB8 Langkah pada garis bilangan diagram. */
export const RONDE_LANGKAH_PB: SoalLangkah[][] = [
  [{ mulai: 62, arah: "maju", langkah: 3 }, { mulai: 88, arah: "mundur", langkah: 4 }],
  [{ mulai: 47, arah: "maju", langkah: 5 }, { mulai: 71, arah: "mundur", langkah: 2 }],
  [{ mulai: 95, arah: "maju", langkah: 4 }, { mulai: 60, arah: "mundur", langkah: 3 }],
];
/** PB9 Memori papan dan lambang. */
export const RONDE_MEMORI_PB: number[][] = [[26, 41, 63, 85], [32, 54, 77, 98], [39, 58, 70, 92]];
/** PB10 Ketuk Semua model terhadap acuan. */
export const RONDE_SEMUA_PB: SoalSemuaAcuan[] = [
  { acuan: 60, arah: "lebih", angka: [53, 67, 71, 60, 48, 64] },
  { acuan: 45, arah: "kurang", angka: [39, 52, 44, 45, 28, 61] },
  { acuan: 70, arah: "lebih", angka: [69, 74, 82, 70, 63, 77] },
];

/* ------------------------------ Abstract B ------------------------------ */

/** QB1 Lengkapi kalimat banding. */
export const RONDE_KALIMAT_QB: [number, number][][] = [
  [[58, 54], [43, 67], [72, 72]],
  [[35, 53], [88, 80], [90, 90]],
];
export const KATA_BANDING = ["lebih besar dari", "lebih kecil dari", "sama dengan"];
export function kalimatIsianBanding(a: number, b: number, nomor: number): KalimatIsian {
  const r = banding(a, b);
  const benar = r === "lebih besar" ? KATA_BANDING[0] : r === "lebih kecil" ? KATA_BANDING[1] : KATA_BANDING[2];
  const urut = urutanTetap(3, 2, nomor).map((i) => KATA_BANDING[i]);
  return { depan: `Bilangan ${a}`, belakang: `bilangan ${b}.`, opsi: urut, benar: urut.indexOf(benar) };
}
export const RONDE_BENARSALAH_QB: Pernyataan[][] = [
  [
    { teks: "Bilangan 65 lebih besar dari bilangan 56.", benar: banding(65, 56) === "lebih besar", penjelasan: "Puluhan 65 adalah 6 dan puluhan 56 adalah 5, jadi 65 lebih besar." },
    { teks: "Bilangan 54 lebih besar dari bilangan 58.", benar: banding(54, 58) === "lebih besar", penjelasan: "Puluhannya sama, yaitu 5. Satuan 4 lebih kecil dari satuan 8, jadi 54 lebih kecil dari 58." },
    { teks: "Jika puluhan sama, kita bandingkan satuannya.", benar: true, penjelasan: "Puluhan yang sama tidak membantu, jadi kita lihat satuan." },
    { teks: "Bilangan 83 lebih kecil dari bilangan 57.", benar: banding(83, 57) === "lebih kecil", penjelasan: "83 mempunyai 8 puluhan dan 57 mempunyai 5 puluhan, jadi 83 lebih besar." },
    { teks: "Bilangan 72 sama dengan bilangan 72.", benar: banding(72, 72) === "sama dengan", penjelasan: "Puluhan dan satuannya sama, jadi kedua bilangan sama." },
  ],
  [
    { teks: `2 lebihnya dari 58 adalah ${lebihnya(58, 2)}.`, benar: lebihnya(58, 2) === 60, penjelasan: "Maju dua langkah dari 58 menjadi 59, lalu 60." },
    { teks: `3 kurangnya dari 75 adalah ${kurangnya(75, 3)}.`, benar: kurangnya(75, 3) === 72, penjelasan: "Mundur tiga langkah dari 75 menjadi 74, 73, lalu 72." },
    { teks: "Bilangan 37 lebih besar dari bilangan 73.", benar: banding(37, 73) === "lebih besar", penjelasan: "37 mempunyai 3 puluhan dan 73 mempunyai 7 puluhan, jadi 37 lebih kecil dari 73." },
    { teks: `1 kurangnya dari 80 adalah ${kurangnya(80, 1)}.`, benar: kurangnya(80, 1) === 79, penjelasan: "Mundur satu langkah dari 80 menjadi 79." },
    { teks: "Urutan dari yang paling kecil: 57, 76, 83.", benar: JSON.stringify(urutBilangan([76, 83, 57], "kecil")) === JSON.stringify([57, 76, 83]), penjelasan: "57 punya 5 puluhan, 76 punya 7 puluhan, 83 punya 8 puluhan." },
  ],
];
export const RONDE_SUSUN_QB: { kata: string[]; pengecoh: string }[] = [
  { kata: ["Bilangan", "65", "lebih", "besar", "dari", "bilangan", "56"], pengecoh: "kecil" },
  { kata: ["Jika", "puluhannya", "sama", "lihat", "satuannya"], pengecoh: "ratusannya" },
  { kata: ["Kupu-kupu", "maju", "dua", "langkah", "ke", "depan"], pengecoh: "mundur" },
  { kata: ["Capung", "mundur", "tiga", "langkah", "ke", "belakang"], pengecoh: "maju" },
];
/** QB4 Aku adalah bilangan. */
export type SoalAku = { dasar: number; k: number; arah: "lebih" | "kurang" };
export const RONDE_AKU_QB: SoalAku[][] = [
  [{ dasar: 76, k: 2, arah: "lebih" }, { dasar: 67, k: 1, arah: "kurang" }],
  [{ dasar: 45, k: 3, arah: "lebih" }, { dasar: 90, k: 2, arah: "kurang" }],
  [{ dasar: 58, k: 4, arah: "lebih" }, { dasar: 71, k: 3, arah: "kurang" }],
];
export const hasilAku = (s: SoalAku): number => (s.arah === "lebih" ? s.dasar + s.k : s.dasar - s.k);
export const teksAku = (s: SoalAku): string => `Aku adalah bilangan. Aku ${s.k} ${s.arah === "lebih" ? "lebihnya" : "kurangnya"} dari bilangan ${s.dasar}. Bilangan berapakah aku?`;
/** QB5 Tabel lebihnya dan kurangnya. */
const kartuAngka = (jawab: number[]): string[] => {
  const ekstra = [jawab[0] + 1, jawab[1] - 1];
  return [...new Set([...jawab, ...ekstra].map(String))];
};
export const RONDE_TABEL_QB: TabelRonde[] = [
  { judul: "2 lebihnya dari", kepala: ["Bilangan", "2 lebihnya"], baris: [58, 74, 45, 89].map((n) => ({ label: String(n), jawab: String(n + 2) })), kartu: kartuAngka([60, 76, 47, 91]) },
  { judul: "3 kurangnya dari", kepala: ["Bilangan", "3 kurangnya"], baris: [75, 60, 91, 34].map((n) => ({ label: String(n), jawab: String(n - 3) })), kartu: kartuAngka([72, 57, 88, 31]) },
];
/** QB6 Tulis dua angka: papan puluhan dan satuan. */
export type SoalDigit = { dasar: number; k: number; arah: "lebih" | "kurang" };
export const RONDE_DIGIT_QB: SoalDigit[][] = [
  [{ dasar: 80, k: 1, arah: "kurang" }, { dasar: 45, k: 2, arah: "lebih" }],
  [{ dasar: 59, k: 1, arah: "lebih" }, { dasar: 70, k: 3, arah: "kurang" }],
  [{ dasar: 53, k: 2, arah: "kurang" }, { dasar: 62, k: 4, arah: "lebih" }],
];
export const hasilDigit = (s: SoalDigit): number => (s.arah === "lebih" ? s.dasar + s.k : s.dasar - s.k);
/** QB7 Detektif Bilangan. */
export const RONDE_DETEKTIF_QB: SoalDetektif[] = [
  { klue: [{ jenis: "lebihDari", n: 65 }, { jenis: "kurangDari", n: 70 }, { jenis: "satuan", n: 8 }], opsi: [68, 78, 58], jawab: 68 },
  { klue: [{ jenis: "lebihDari", n: 80 }, { jenis: "kurangDari", n: 90 }, { jenis: "jumlahDigit", n: 12 }], opsi: [48, 93, 84], jawab: 84 },
  { klue: [{ jenis: "kurangDari", n: 50 }, { jenis: "satuan", n: 9 }, { jenis: "puluhan", n: 3 }], opsi: [49, 39, 93], jawab: 39 },
  { klue: [{ jenis: "lebihDari", n: 40 }, { jenis: "kurangDari", n: 50 }, { jenis: "satuanLebih", n: 2 }], opsi: [46, 48, 42], jawab: 46 },
];
/** QB9 Urutkan bilangan. */
export const RONDE_URUTANGKA_QB: RondeUrutBanyak[] = [
  { angka: [65, 71, 56, 79, 60], dari: "kecil" },
  { angka: [77, 86, 79, 68], dari: "besar" },
  { angka: [91, 19, 90, 29], dari: "kecil" },
];
/** QB10 Ketuk Semua terhadap acuan. */
export const RONDE_SEMUA_QB: SoalSemuaAcuan[] = [
  { acuan: 55, arah: "lebih", angka: [48, 59, 55, 61, 52, 70] },
  { acuan: 90, arah: "kurang", angka: [87, 94, 90, 78, 99, 85] },
  { acuan: 35, arah: "lebih", angka: [29, 38, 35, 42, 33, 51] },
];

export const PETA_KONSEP_B: { pusat: string; kotak: KotakPeta[] }[] = [
  {
    pusat: "Membandingkan dua bilangan",
    kotak: [
      { label: "Pertama, bandingkan", opsi: ["banyak puluhannya", "banyak satuannya", "nama bilangannya"], benar: 0 },
      { label: "Jika puluhannya sama, bandingkan", opsi: ["satuannya", "puluhannya lagi", "jumlah semuanya"], benar: 0 },
      { label: "Bilangan yang puluhannya paling banyak adalah bilangan yang", opsi: ["paling besar", "paling kecil", "sama dengan"], benar: 0 },
      { label: "Menurutku, 65 dan 56 berbeda karena", opsi: ["puluhan 65 lebih banyak", "satuan 56 lebih banyak", "keduanya sama"], benar: 0 },
    ],
  },
  {
    pusat: "Lebih dari dan kurang dari",
    kotak: [
      { label: "Menghitung maju untuk mencari", opsi: ["lebihnya", "kurangnya", "puluhannya"], benar: 0 },
      { label: "Menghitung mundur untuk mencari", opsi: ["kurangnya", "lebihnya", "satuannya"], benar: 0 },
      { label: "2 lebihnya dari 58 adalah", opsi: ["60", "56", "62"], benar: 0 },
      { label: "Menurutku, garis bilangan membantuku karena", opsi: ["aku bisa melompat maju dan mundur", "angkanya selalu sama", "tidak ada angkanya"], benar: 0 },
    ],
  },
];
