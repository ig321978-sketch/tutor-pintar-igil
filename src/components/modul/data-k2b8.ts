/**
 * Data murni dan mesin pemeriksa Matematika Kelas 2 Bab 8 (Berbagai Diagram).
 * Tanpa React dan tanpa impor nilai dari berkas lain, supaya bisa diuji langsung di Node (scripts/uji-data-k2b8.mjs).
 *
 * Sub-Bab A (Diagram Turus) dan Sub-Bab B (Diagram Gambar) memakai kumpulan data yang sama dengan buku siswa
 * (buah, hewan ternak, mainan, sayur, bunga, parsel, kue, permainan tradisional, warna, ...). Semua kunci dihitung
 * dari data, tidak ada yang ditulis tangan dua kali. Tidak ada acak: semua urutan tetap (aman untuk render server).
 */

export const Kapital = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
export const HURUF = ["A", "B", "C", "D", "E", "F"];

/** Urutan tampil beberapa pilihan, tetap tanpa acak. */
export function urutanTetap(n: number, langkah = 3, geser = 0): number[] {
  const g = ((geser % n) + n) % n;
  const awal = (g * langkah) % n;
  return Array.from({ length: n }, (_, i) => (i + awal) % n);
}

/** Urutan tampil benda yang harus diurutkan siswa: putaran tetap yang dijamin berbeda dari urutan kunci. */
export function urutTampil<T>(daftar: readonly T[], kunci: readonly T[], nomor: number): T[] {
  const n = daftar.length;
  for (let g = 0; g < n; g += 1) {
    const p = urutanTetap(n, 2, nomor + g).map((i) => daftar[i]);
    if (JSON.stringify(p) !== JSON.stringify(kunci)) return p;
  }
  return [...daftar].reverse();
}

/** Tiga pilihan teks: satu benar dan dua pengecoh. */
export function susunOpsi(benar: string, pengecoh: [string, string], nomor: number): { opsi: string[]; jawab: number } {
  const semua = [benar, pengecoh[0], pengecoh[1]];
  const opsi = urutanTetap(3, 2, nomor).map((i) => semua[i]);
  return { opsi, jawab: opsi.indexOf(benar) };
}

/** Tiga pilihan angka kecil di sekitar kunci (kunci berpindah tempat). */
export function opsiAngka(jawab: number, nomor: number): number[] {
  const semua = jawab <= 1 ? [jawab, jawab + 1, jawab + 2] : [jawab, jawab + 1, jawab - 1];
  return urutanTetap(3, 2, nomor).map((i) => semua[i]);
}

/** Empat pilihan angka (kunci, satu lebihnya, satu kurangnya, dua lebihnya atau dua kurangnya), kunci berpindah tempat. */
export function opsiEmpat(jawab: number, nomor: number): number[] {
  const semua = jawab <= 2 ? [jawab, jawab + 1, jawab + 2, jawab + 3] : [jawab, jawab + 1, jawab - 1, jawab - 2];
  return urutanTetap(4, 3, nomor).map((i) => semua[i]);
}

/* ====================================================================== */
/* Kumpulan data                                                            */
/* ====================================================================== */

export type IdData =
  | "buah" | "hewan" | "mainan" | "sayur" | "bunga" | "parsel" | "kue" | "pasar" | "olahraga"
  | "permainan" | "warna" | "lari" | "kaleng" | "buahgambar" | "berangkat";

export type Kat = { id: string; nama: string; ikon: string; n: number; warna: string };

export type DataSet = {
  id: IdData;
  judul: string;
  /** Judul kolom tabel: [nama, banyak]. */
  kolom: [string, string];
  /** Kalimat "Ada ... " dengan {n} dan {nama}. */
  kalimat: string;
  /** Kata benda yang dihitung, mis. "anak", "ekor", "buah". */
  satuan: string;
  kategori: Kat[];
};

const BIRU = "#38BDF8";
const JINGGA = "#F59E0B";
const MERAH = "#F43F5E";
const HIJAU = "#84CC16";
const WARNA4 = [BIRU, JINGGA, MERAH, HIJAU];

const buatKat = (daftar: [string, string, string, number][]): Kat[] => daftar.map(([id, nama, ikon, n], i) => ({ id, nama, ikon, n, warna: WARNA4[i % 4] }));

export const DATA: Record<IdData, DataSet> = {
  buah: {
    id: "buah", judul: "Buah Kesukaan", kolom: ["Nama Buah", "Banyak Anak"], kalimat: "Ada {n} anak yang suka {nama}.", satuan: "anak",
    kategori: buatKat([["anggur", "anggur", "🍇", 2], ["jeruk", "jeruk", "🍊", 6], ["apel", "apel", "🍎", 4], ["pisang", "pisang", "🍌", 3]]),
  },
  hewan: {
    id: "hewan", judul: "Hewan Ternak Paman Halim", kolom: ["Nama Hewan", "Banyak Hewan"], kalimat: "Ada {n} ekor {nama}.", satuan: "ekor",
    kategori: buatKat([["ayam", "ayam", "🐔", 10], ["kambing", "kambing", "🐐", 8], ["sapi", "sapi", "🐄", 6], ["bebek", "bebek", "🦆", 11]]),
  },
  mainan: {
    id: "mainan", judul: "Mainan Kesukaan", kolom: ["Mainan", "Banyak Anak"], kalimat: "Ada {n} anak yang suka {nama}.", satuan: "anak",
    kategori: buatKat([["mobil", "mobil-mobilan", "🚗", 2], ["boneka", "boneka", "🐻", 4], ["kelereng", "kelereng", "🔵", 6], ["balok", "mainan balok", "📦", 7]]),
  },
  sayur: {
    id: "sayur", judul: "Sayur Kesukaan", kolom: ["Nama Sayuran", "Banyak Anak"], kalimat: "Ada {n} anak yang suka {nama}.", satuan: "anak",
    kategori: buatKat([["brokoli", "brokoli", "🥦", 7], ["bayam", "bayam", "🌿", 4], ["wortel", "wortel", "🥕", 6], ["jagung", "jagung", "🌽", 3]]),
  },
  bunga: {
    id: "bunga", judul: "Bunga dalam Satu Rangkaian", kolom: ["Bunga", "Banyak Bunga"], kalimat: "Ada {n} bunga {nama}.", satuan: "bunga",
    kategori: buatKat([["mawar", "mawar", "🌹", 7], ["lili", "lili", "💮", 4], ["tulip", "tulip", "🌷", 5], ["aster", "aster", "🌼", 4]]),
  },
  parsel: {
    id: "parsel", judul: "Buah dalam Parsel", kolom: ["Nama Buah", "Banyak Buah"], kalimat: "Ada {n} buah {nama}.", satuan: "buah",
    kategori: buatKat([["jeruk", "jeruk", "🍊", 4], ["apel", "apel", "🍎", 3], ["pisang", "pisang", "🍌", 6], ["mangga", "mangga", "🍐", 2]]),
  },
  kue: {
    id: "kue", judul: "Kue Kesukaan", kolom: ["Kue Kesukaan", "Banyak Anak"], kalimat: "Ada {n} anak yang suka {nama}.", satuan: "anak",
    kategori: buatKat([["cucur", "kue cucur", "🍪", 6], ["onde", "onde-onde", "🍡", 5], ["lemper", "lemper", "🍙", 3], ["talam", "kue talam", "🍮", 7]]),
  },
  pasar: {
    id: "pasar", judul: "Buah yang Dibeli Ibu", kolom: ["Nama Buah", "Banyaknya"], kalimat: "Ada {n} buah {nama}.", satuan: "buah",
    kategori: buatKat([["apel", "apel", "🍎", 3], ["jeruk", "jeruk", "🍊", 7], ["semangka", "semangka", "🍉", 1], ["alpukat", "alpukat", "🥑", 3]]),
  },
  olahraga: {
    id: "olahraga", judul: "Olahraga Kesukaan", kolom: ["Olahraga", "Banyak Anak"], kalimat: "Ada {n} anak yang suka {nama}.", satuan: "anak",
    kategori: buatKat([["bola", "sepak bola", "⚽", 5], ["bulutangkis", "bulu tangkis", "🏸", 7], ["renang", "renang", "🏊", 3], ["basket", "basket", "🏀", 4]]),
  },
  permainan: {
    id: "permainan", judul: "Permainan Tradisional Kesukaan", kolom: ["Permainan Tradisional", "Banyak Anak"], kalimat: "Ada {n} anak yang suka bermain {nama}.", satuan: "anak",
    kategori: buatKat([["karet", "karet", "", 4], ["lompat", "lompat tali", "", 6], ["petak", "petak umpet", "", 5], ["benteng", "benteng", "", 7]]),
  },
  warna: {
    id: "warna", judul: "Warna Kesukaan Siswa Kelas II", kolom: ["Warna", "Banyak Siswa"], kalimat: "Ada {n} siswa yang suka warna {nama}.", satuan: "siswa",
    kategori: [
      { id: "merah", nama: "merah", ikon: "", n: 7, warna: MERAH },
      { id: "kuning", nama: "kuning", ikon: "", n: 3, warna: JINGGA },
      { id: "biru", nama: "biru", ikon: "", n: 5, warna: BIRU },
      { id: "hitam", nama: "hitam", ikon: "", n: 2, warna: "#27272A" },
    ],
  },
  lari: {
    id: "lari", judul: "Siswa yang Berlari", kolom: ["Banyak Putaran", "Banyak Siswa"], kalimat: "Ada {n} siswa yang berlari {nama}.", satuan: "siswa",
    kategori: buatKat([["p1", "1 putaran", "", 5], ["p2", "2 putaran", "", 3], ["p3", "3 putaran", "", 4], ["p4", "4 putaran", "", 2]]),
  },
  kaleng: {
    id: "kaleng", judul: "Kaleng yang Dikumpulkan Mira", kolom: ["Kaleng", "Banyaknya"], kalimat: "Ada {n} kaleng {nama}.", satuan: "kaleng",
    kategori: buatKat([["a", "cokelat", "", 6], ["b", "hijau", "", 4], ["c", "oranye", "", 5], ["d", "biru", "", 3]]),
  },
  buahgambar: {
    id: "buahgambar", judul: "Buah Kesukaan Siswa", kolom: ["Nama Buah", "Banyak Siswa"], kalimat: "Ada {n} siswa yang suka {nama}.", satuan: "siswa",
    kategori: buatKat([["pisang", "pisang", "", 6], ["manggis", "manggis", "", 3], ["jeruk", "jeruk", "", 8], ["stroberi", "stroberi", "", 4]]),
  },
  berangkat: {
    id: "berangkat", judul: "Cara Berangkat ke Sekolah", kolom: ["Cara Berangkat", "Banyak Anak"], kalimat: "Ada {n} anak yang {nama}.", satuan: "anak",
    kategori: buatKat([["sepeda", "naik sepeda", "", 4], ["motor", "diantar motor", "", 6], ["jalan", "jalan kaki", "", 7], ["mobil", "diantar mobil", "", 3]]),
  },
};

export const ID_DATA = Object.keys(DATA) as IdData[];

export const kat = (set: IdData, id: string): Kat => {
  const k = DATA[set].kategori.find((x) => x.id === id);
  if (!k) throw new Error(`kategori ${set}/${id} tidak ada`);
  return k;
};
export const banyak = (set: IdData, id: string): number => kat(set, id).n;
export const total = (set: IdData): number => DATA[set].kategori.reduce((a, k) => a + k.n, 0);

/** Kategori dengan banyak terbesar atau terkecil, atau null bila tidak tunggal (ada yang sama banyak). */
export function palingTunggal(set: IdData, arah: "banyak" | "sedikit"): Kat | null {
  const k = DATA[set].kategori;
  const nilai = k.map((x) => x.n);
  const t = arah === "banyak" ? Math.max(...nilai) : Math.min(...nilai);
  const cocok = k.filter((x) => x.n === t);
  return cocok.length === 1 ? cocok[0] : null;
}

/** Kalimat "Ada 6 anak yang suka jeruk." */
export function kalimatAda(set: IdData, id: string): string {
  const k = kat(set, id);
  return DATA[set].kalimat.replace("{nama}", k.nama).replace("{n}", String(k.n));
}
/** Bagian depan dan belakang kalimat bila banyaknya dikosongkan. */
export function kalimatKosong(set: IdData, id: string): { depan: string; belakang: string } {
  const k = kat(set, id);
  const [depan, belakang] = DATA[set].kalimat.replace("{nama}", k.nama).split("{n}");
  return { depan: depan.trimEnd(), belakang: belakang.trimStart() };
}

/** Kalimat "Banyak bebek 1 lebihnya dari banyak ayam." (a lebih banyak dari b). */
export function kalimatLebih(a: string, b: string, selisih: number): string {
  return `Banyak ${a} ${selisih} lebihnya dari banyak ${b}.`;
}
export function kalimatKurang(a: string, b: string, selisih: number): string {
  return `Banyak ${a} ${selisih} kurangnya dari banyak ${b}.`;
}

/** Aliran data (satu per satu) dari hitungan tiap kategori, bergantian jenis supaya tidak berurutan seragam. */
export function aliran(hitung: [string, number][], geser = 0): string[] {
  const sisa = hitung.map(([id, n]) => ({ id, n }));
  const hasil: string[] = [];
  let i = geser % sisa.length;
  let macet = 0;
  while (sisa.some((s) => s.n > 0) && macet < 1000) {
    const s = sisa[i % sisa.length];
    if (s.n > 0) {
      hasil.push(s.id);
      s.n -= 1;
    }
    i += 1;
    macet += 1;
  }
  return hasil;
}

/** Nama bilangan 0 sampai 20 dalam kata. */
const KATA_ANGKA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas", "dua belas", "tiga belas", "empat belas", "lima belas", "enam belas", "tujuh belas", "delapan belas", "sembilan belas", "dua puluh"];
export const kataAngka = (n: number): string => KATA_ANGKA[n] ?? String(n);

/** Kelompok lima pada turus. 7 menjadi {kelompok: 1, sisa: 2}. */
export const kelompokLima = (n: number): { kelompok: number; sisa: number } => ({ kelompok: Math.floor(n / 5), sisa: n % 5 });
export function teksKelompok(n: number): string {
  const { kelompok, sisa } = kelompokLima(n);
  return sisa === 0 ? `${kelompok} kelompok lima, tanpa sisa` : kelompok === 0 ? `${sisa} garis, belum ada kelompok lima` : `${kelompok} kelompok lima dan ${sisa} garis`;
}
/** Tiga pilihan teks kelompok lima: satu benar dan dua pengecoh. */
export function opsiKelompok(n: number, nomor: number): { opsi: string[]; jawab: number } {
  const { kelompok, sisa } = kelompokLima(n);
  const p1 = `${kelompok + 1} kelompok lima dan ${sisa} garis`;
  const p2 = sisa >= 1 ? `${kelompok} kelompok lima dan ${sisa + 1} garis` : `${kelompok} kelompok lima dan 1 garis`;
  return susunOpsi(teksKelompok(n), [p1, p2], nomor);
}

/** Empat banyak turus untuk dipilih: kunci, satu lebihnya, satu kurangnya, dua kurangnya (atau dua lebihnya). */
export const opsiTurus = (n: number, nomor: number): number[] => opsiEmpat(n, nomor);

/** Jendela garis bilangan sepanjang 9 kotak yang memuat dua bilangan, mulai dari 0. */
export function jendelaGaris(a: number, b: number, nomor: number, panjang = 9): [number, number] {
  const lo = Math.min(a, b);
  const hi = Math.max(a, b);
  const sisa = Math.max(0, panjang - 1 - (hi - lo));
  const kiri = (nomor * 3) % (sisa + 1);
  const dari = Math.max(lo - kiri, 0);
  return [dari, dari + panjang - 1];
}

/* ====================================================================== */
/* Petunjuk (klue) untuk Detektif Data                                      */
/* ====================================================================== */

export type Klue =
  | { jenis: "paling"; arah: "banyak" | "sedikit" }
  | { jenis: "lebihDari"; n: number }
  | { jenis: "kurangDari"; n: number }
  | { jenis: "tepat"; n: number }
  | { jenis: "lebihnyaDari"; id: string; k: number }
  | { jenis: "kurangnyaDari"; id: string; k: number }
  | { jenis: "samaDengan"; id: string };

export function cocokKlue(set: IdData, id: string, k: Klue): boolean {
  const me = kat(set, id);
  switch (k.jenis) {
    case "paling": return palingTunggal(set, k.arah)?.id === id;
    case "lebihDari": return me.n > k.n;
    case "kurangDari": return me.n < k.n;
    case "tepat": return me.n === k.n;
    case "lebihnyaDari": return me.n === kat(set, k.id).n + k.k;
    case "kurangnyaDari": return me.n === kat(set, k.id).n - k.k;
    case "samaDengan": return id !== k.id && me.n === kat(set, k.id).n;
  }
}
export function teksKlue(set: IdData, k: Klue): string {
  switch (k.jenis) {
    case "paling": return k.arah === "banyak" ? "Aku yang paling banyak." : "Aku yang paling sedikit.";
    case "lebihDari": return `Banyakku lebih dari ${k.n}.`;
    case "kurangDari": return `Banyakku kurang dari ${k.n}.`;
    case "tepat": return `Banyakku tepat ${k.n}.`;
    case "lebihnyaDari": return `Banyakku ${k.k} lebihnya dari banyak ${kat(set, k.id).nama}.`;
    case "kurangnyaDari": return `Banyakku ${k.k} kurangnya dari banyak ${kat(set, k.id).nama}.`;
    case "samaDengan": return `Banyakku sama dengan banyak ${kat(set, k.id).nama}.`;
  }
}
export type SoalDetektif = { set: IdData; klue: Klue[]; opsi: string[]; jawab: string };

/* ====================================================================== */
/* SUB-BAB A. Diagram Turus                                                 */
/* ====================================================================== */

export type Hitungan = { set: IdData; hitung: [string, number][] };
export type Rujuk = { set: IdData; k: string };

/* ------------------------------ Concrete A ------------------------------ */

/** CA1 Kelompokkan Benda (Sortir): benda campur ke tiga kotak. */
export const RONDE_SORTIR_A: Hitungan[] = [
  { set: "buah", hitung: [["anggur", 2], ["apel", 3], ["pisang", 3]] },
  { set: "hewan", hitung: [["ayam", 3], ["kambing", 3], ["sapi", 2]] },
  { set: "sayur", hitung: [["wortel", 3], ["jagung", 2], ["brokoli", 3]] },
];
/** CA2 Hitung Tiap Jenis (pilih angka), dua soal tiap ronde. */
export const RONDE_HITUNG_A: Rujuk[][] = [
  [{ set: "hewan", k: "ayam" }, { set: "hewan", k: "bebek" }],
  [{ set: "mainan", k: "balok" }, { set: "mainan", k: "boneka" }],
  [{ set: "sayur", k: "wortel" }, { set: "sayur", k: "bayam" }],
];
/** CA3 Catat Turus: data datang satu per satu. */
export const RONDE_CATAT_A: Hitungan[] = [
  { set: "buah", hitung: [["anggur", 2], ["jeruk", 4], ["apel", 3]] },
  { set: "hewan", hitung: [["ayam", 3], ["kambing", 2], ["bebek", 4]] },
  { set: "kue", hitung: [["cucur", 4], ["lemper", 2], ["talam", 3]] },
];
/** CA4 Buat Turus dari benda nyata, dua soal tiap ronde. */
export const RONDE_TALLY_A: Rujuk[][] = [
  [{ set: "buah", k: "apel" }, { set: "buah", k: "pisang" }],
  [{ set: "hewan", k: "kambing" }, { set: "hewan", k: "sapi" }],
  [{ set: "mainan", k: "kelereng" }, { set: "sayur", k: "jagung" }],
];
/** CA5 Jodohkan Benda dan Turus (tiga pasang tiap ronde, banyak berbeda). */
export const RONDE_PASANG_CA: Hitungan[] = [
  { set: "buah", hitung: [["anggur", 2], ["pisang", 3], ["apel", 4]] },
  { set: "mainan", hitung: [["mobil", 2], ["boneka", 4], ["kelereng", 6]] },
  { set: "sayur", hitung: [["jagung", 3], ["wortel", 6], ["brokoli", 7]] },
];
/** CA6 Memori Benda dan Turus (empat pasang tiap ronde, semua kategori). */
export const RONDE_MEMORI_CA: IdData[] = ["buah", "hewan", "sayur"];
/** CA7 Paling Banyak dan Paling Sedikit (dua soal tiap ronde). */
export const RONDE_PALING_CA: IdData[] = ["buah", "hewan", "sayur"];
/** CA8 Urutkan Kelompok. */
export type RondeUrut = { set: IdData; ids: string[]; dari: "sedikit" | "banyak" };
export const RONDE_URUT_CA: RondeUrut[] = [
  { set: "mainan", ids: ["mobil", "boneka", "kelereng", "balok"], dari: "sedikit" },
  { set: "buah", ids: ["anggur", "jeruk", "apel"], dari: "banyak" },
  { set: "kue", ids: ["cucur", "onde", "lemper", "talam"], dari: "sedikit" },
];
/** CA9 Lebihnya dan Kurangnya (hitung selisih), dua soal tiap ronde. */
export type SoalBeda = { set: IdData; a: string; b: string };
export const RONDE_BEDA_CA: SoalBeda[][] = [
  [{ set: "hewan", a: "bebek", b: "ayam" }, { set: "hewan", a: "kambing", b: "sapi" }],
  [{ set: "mainan", a: "balok", b: "mobil" }, { set: "mainan", a: "kelereng", b: "boneka" }],
  [{ set: "sayur", a: "brokoli", b: "jagung" }, { set: "sayur", a: "wortel", b: "jagung" }],
];
export const hasilBeda = (s: SoalBeda): number => Math.abs(banyak(s.set, s.a) - banyak(s.set, s.b));
/** CA10 Kartu Turus ke Kotak Benda (LetakSlot), tiga kategori dengan banyak berbeda. */
export const RONDE_SLOT_CA: Hitungan[] = [
  { set: "buah", hitung: [["anggur", 2], ["apel", 4], ["pisang", 3]] },
  { set: "mainan", hitung: [["mobil", 2], ["boneka", 4], ["kelereng", 6]] },
  { set: "bunga", hitung: [["mawar", 7], ["tulip", 5], ["lili", 4]] },
];

/* ------------------------------ Picture A ------------------------------ */

/** PA1 Baca Turus (tulis banyaknya), dua soal tiap ronde. */
export const RONDE_BACA_PA: Rujuk[][] = [
  [{ set: "buah", k: "anggur" }, { set: "buah", k: "jeruk" }],
  [{ set: "hewan", k: "ayam" }, { set: "hewan", k: "kambing" }],
  [{ set: "hewan", k: "bebek" }, { set: "hewan", k: "sapi" }],
];
/** PA2 Lengkapi Kolom Banyak: seluruh kategori satu kumpulan data. */
export const RONDE_ISI_PA: IdData[] = ["buah", "mainan", "kue"];
/** PA3 Buat Turus dari angka, dua soal tiap ronde. */
export const RONDE_BUAT_PA: number[][] = [[3, 8], [5, 9], [12, 6]];
/** PA4 Turus yang Tepat (dua soal tiap ronde). */
export const RONDE_TEPAT_PA: number[][] = [[6, 4], [9, 7], [12, 5]];
/** PA5 Jodohkan Turus dan Bilangan. */
export const RONDE_PASANG_PA: number[][] = [[3, 6, 9], [4, 7, 10], [5, 8, 12]];
/** PA6 Memori Turus dan Bilangan. */
export const RONDE_MEMORI_PA: number[][] = [[3, 6, 8, 11], [4, 7, 9, 12], [2, 5, 10, 13]];
/** PA7 Kelompok Lima dan Sisa (tanpa kelipatan lima). */
export const RONDE_KELOMPOK_PA: number[][] = [[7, 12], [8, 13], [6, 9]];
/** PA8 Urutkan Turus. */
export const RONDE_URUT_PA: { angka: number[]; dari: "sedikit" | "banyak" }[] = [
  { angka: [3, 8, 5, 11], dari: "sedikit" },
  { angka: [6, 2, 9, 4], dari: "banyak" },
  { angka: [12, 7, 4, 10], dari: "sedikit" },
];
/** PA9 Pilah Turus: kurang dari 5 atau 5 atau lebih. */
export const RONDE_SORTIR_PA: number[][] = [[3, 7, 4, 9, 2, 6], [8, 1, 5, 3, 10, 4], [11, 2, 6, 3, 9, 4]];
/** PA10 Lebihnya dan Kurangnya pada garis bilangan, dua soal tiap ronde. */
export type SoalLebih = { set: IdData; dari: string; ke: string; jenis: "lebih" | "kurang" };
export const RONDE_LEBIH_PA: SoalLebih[][] = [
  [{ set: "hewan", dari: "ayam", ke: "bebek", jenis: "lebih" }, { set: "hewan", dari: "kambing", ke: "sapi", jenis: "kurang" }],
  [{ set: "mainan", dari: "boneka", ke: "kelereng", jenis: "lebih" }, { set: "mainan", dari: "balok", ke: "boneka", jenis: "kurang" }],
  [{ set: "sayur", dari: "wortel", ke: "brokoli", jenis: "lebih" }, { set: "sayur", dari: "brokoli", ke: "bayam", jenis: "kurang" }],
];
export const hasilLebih = (s: SoalLebih): number => banyak(s.set, s.ke);
export const selisihLebih = (s: SoalLebih): number => Math.abs(banyak(s.set, s.ke) - banyak(s.set, s.dari));
export function tanyaLebih(s: SoalLebih): string {
  const a = kat(s.set, s.dari);
  const b = kat(s.set, s.ke);
  const rel = s.jenis === "lebih" ? kalimatLebih(b.nama, a.nama, selisihLebih(s)) : kalimatKurang(b.nama, a.nama, selisihLebih(s));
  return `Banyak ${a.nama} ada ${a.n}. ${rel} Ketuk banyak ${b.nama}.`;
}

/* ------------------------------ Abstract A ------------------------------ */

/** QA1 Jodohkan Nama dan Banyaknya (tiga pasang tiap ronde, banyak berbeda). */
export const RONDE_PASANG_QA: Hitungan[] = [
  { set: "kue", hitung: [["lemper", 3], ["onde", 5], ["cucur", 6]] },
  { set: "bunga", hitung: [["tulip", 5], ["mawar", 7], ["lili", 4]] },
  { set: "pasar", hitung: [["semangka", 1], ["apel", 3], ["jeruk", 7]] },
];
/** QA2 Lengkapi Kalimat Data (tiga kalimat tiap ronde). */
export const RONDE_KALIMAT_QA: Rujuk[][] = [
  [{ set: "permainan", k: "karet" }, { set: "permainan", k: "lompat" }, { set: "permainan", k: "benteng" }],
  [{ set: "warna", k: "merah" }, { set: "warna", k: "biru" }, { set: "warna", k: "hitam" }],
];
export type KalimatIsian = { depan: string; belakang: string; opsi: string[]; benar: number };
export function kalimatIsianData(set: IdData, id: string, nomor: number): KalimatIsian {
  const { depan, belakang } = kalimatKosong(set, id);
  const n = banyak(set, id);
  const o = opsiAngka(n, nomor);
  return { depan, belakang, opsi: o.map(String), benar: o.indexOf(n) };
}
/** QA3 Susun Kalimat Data. */
export const RONDE_SUSUN_QA: { kata: string[]; pengecoh: string }[] = [
  { kata: ["Banyak", "bebek", "1", "lebihnya", "dari", "banyak", "ayam"], pengecoh: "kurangnya" },
  { kata: ["Tanda", "I", "pada", "diagram", "turus", "menunjukkan", "satu", "benda"], pengecoh: "dua" },
  { kata: ["Setiap", "lima", "turus", "dikelompokkan", "dengan", "coretan", "miring"], pengecoh: "sepuluh" },
  { kata: ["Hewan", "yang", "paling", "banyak", "di", "peternakan", "adalah", "bebek"], pengecoh: "sapi" },
];
/** QA4 Isi Tabel Turus: nama dan banyaknya. */
export type TabelBaris = { label: string; jawab: string };
export type TabelRonde = { judul: string; kepala: [string, string]; baris: TabelBaris[]; kartu: string[] };
export function tabelData(set: IdData, ekstra: number[]): TabelRonde {
  const ds = DATA[set];
  const angka = ds.kategori.map((k) => k.n);
  const kartu = [...new Set([...angka, ...ekstra])].sort((a, b) => a - b).map(String);
  return { judul: ds.judul, kepala: ds.kolom, baris: ds.kategori.map((k) => ({ label: Kapital(k.nama), jawab: String(k.n) })), kartu };
}
export const RONDE_TABEL_QA: TabelRonde[] = [tabelData("hewan", [9, 12]), tabelData("sayur", [5, 8]), tabelData("warna", [4, 6])];
/** QA5 Benar atau Salah. */
export type Pernyataan = { teks: string; benar: boolean; penjelasan: string };
const jml = (set: IdData, a: string, b: string) => banyak(set, a) + banyak(set, b);
export const RONDE_BENARSALAH_QA: Pernyataan[][] = [
  [
    { teks: "Pada diagram turus, tanda I menunjukkan satu benda.", benar: true, penjelasan: "Satu garis tegak mewakili satu benda, seperti satu batang lidi." },
    { teks: `Ada ${banyak("buah", "jeruk") - 2} anak yang suka jeruk.`, benar: banyak("buah", "jeruk") - 2 === banyak("buah", "jeruk"), penjelasan: `Turus jeruk ada satu kelompok lima dan satu garis, jadi ada ${banyak("buah", "jeruk")} anak yang suka jeruk.` },
    { teks: "Hewan yang paling banyak di peternakan adalah bebek.", benar: palingTunggal("hewan", "banyak")?.id === "bebek", penjelasan: "Bebek ada sebelas, lebih banyak dari ayam yang sepuluh." },
    { teks: `Banyak ayam ${banyak("hewan", "bebek") - banyak("hewan", "ayam")} lebihnya dari banyak bebek.`, benar: false, penjelasan: "Ayam ada sepuluh dan bebek sebelas. Banyak ayam satu kurangnya dari banyak bebek." },
    { teks: "Kolom turus mengelompokkan setiap lima data.", benar: true, penjelasan: "Empat garis tegak dan satu coretan miring menjadi satu kelompok lima." },
  ],
  [
    { teks: `Ada ${banyak("mainan", "balok")} anak yang suka mainan balok.`, benar: true, penjelasan: "Turus mainan balok ada satu kelompok lima dan dua garis, yaitu tujuh." },
    { teks: "Mainan yang paling sedikit disukai adalah kelereng.", benar: palingTunggal("mainan", "sedikit")?.id === "kelereng", penjelasan: "Mobil-mobilan paling sedikit, yaitu dua anak." },
    { teks: `Brokoli dan jagung berjumlah ${jml("sayur", "brokoli", "jagung")}.`, benar: jml("sayur", "brokoli", "jagung") === 10, penjelasan: "Brokoli tujuh dan jagung tiga, jadi jumlahnya sepuluh." },
    { teks: `Banyak wortel ${banyak("sayur", "wortel") - banyak("sayur", "bayam")} lebihnya dari banyak bayam.`, benar: banyak("sayur", "wortel") - banyak("sayur", "bayam") === 2, penjelasan: "Wortel enam dan bayam empat, jadi wortel dua lebihnya dari bayam." },
    { teks: "Turus lima benda ditulis dengan lima garis tegak yang sama.", benar: false, penjelasan: "Lima benda ditulis empat garis tegak dan garis kelima mencoret miring." },
  ],
];
/** QA6 Detektif Data: opsi tiga nama kategori, hanya satu yang cocok dengan semua petunjuk. */
export const RONDE_DETEKTIF_QA: SoalDetektif[] = [
  { set: "hewan", klue: [{ jenis: "lebihDari", n: 8 }, { jenis: "kurangDari", n: 11 }], opsi: ["ayam", "kambing", "bebek"], jawab: "ayam" },
  { set: "mainan", klue: [{ jenis: "paling", arah: "banyak" }, { jenis: "lebihDari", n: 6 }], opsi: ["balok", "kelereng", "boneka"], jawab: "balok" },
  { set: "sayur", klue: [{ jenis: "lebihnyaDari", id: "jagung", k: 3 }, { jenis: "kurangDari", n: 7 }], opsi: ["brokoli", "bayam", "wortel"], jawab: "wortel" },
  { set: "bunga", klue: [{ jenis: "lebihnyaDari", id: "lili", k: 3 }], opsi: ["lili", "mawar", "tulip"], jawab: "mawar" },
];
/** QA7 Peta Konsep. */
export type KotakPeta = { label: string; opsi: string[]; benar: number };
export const PETA_KONSEP_QA: { pusat: string; kotak: KotakPeta[] }[] = [
  {
    pusat: "Diagram turus",
    kotak: [
      { label: "Pada diagram turus, satu garis tegak menunjukkan", opsi: ["satu benda", "lima benda", "sepuluh benda"], benar: 0 },
      { label: "Lima benda ditulis empat garis tegak dan", opsi: ["satu coretan miring", "satu titik", "dua garis"], benar: 0 },
      { label: "Kolom turus mengelompokkan setiap", opsi: ["5 data", "3 data", "10 data"], benar: 0 },
      { label: "Menurutku, turus memudahkan kita karena", opsi: ["data mudah dihitung", "data jadi hilang", "tidak perlu menghitung"], benar: 0 },
    ],
  },
  {
    pusat: "Membaca dan membuat data",
    kotak: [
      { label: "Langkah pertama membuat diagram turus adalah", opsi: ["mengelompokkan dan menghitung data", "menggambar bintang", "menulis kesimpulan"], benar: 0 },
      { label: "Jenis yang paling banyak ditunjukkan oleh", opsi: ["turus yang paling panjang", "turus yang paling pendek", "nama yang paling pendek"], benar: 0 },
      { label: "Bebek 11 dan ayam 10, jadi bebek", opsi: ["1 lebihnya dari ayam", "1 kurangnya dari ayam", "sama dengan ayam"], benar: 0 },
      { label: "Menurutku, data dari teman sebaiknya dicatat", opsi: ["dengan tertib satu per satu", "tanpa dihitung", "setelah lupa"], benar: 0 },
    ],
  },
];
/** QA8 Urutkan Data. */
export const RONDE_URUT_QA: RondeUrut[] = [
  { set: "kue", ids: ["cucur", "onde", "lemper", "talam"], dari: "banyak" },
  { set: "sayur", ids: ["brokoli", "bayam", "wortel", "jagung"], dari: "sedikit" },
  { set: "hewan", ids: ["ayam", "kambing", "sapi", "bebek"], dari: "banyak" },
];
/** QA9 Ketuk Semua. */
export type SoalSemua = { set: IdData; arah: "lebih" | "kurang"; acuan: number };
export const RONDE_SEMUA_QA: SoalSemua[] = [
  { set: "hewan", arah: "lebih", acuan: 8 },
  { set: "kue", arah: "kurang", acuan: 6 },
  { set: "warna", arah: "lebih", acuan: 3 },
];
export const cocokSemua = (id: string, s: SoalSemua): boolean => (s.arah === "lebih" ? banyak(s.set, id) > s.acuan : banyak(s.set, id) < s.acuan);
export function tanyaSemua(s: SoalSemua): string {
  const ds = DATA[s.set];
  return `Ketuk semua yang banyaknya ${s.arah === "lebih" ? "lebih" : "kurang"} dari ${s.acuan}. (${ds.judul})`;
}
/** QA10 Hitung Jumlah (dua soal tiap ronde). */
export type SoalJumlah = { set: IdData; ids: string[] };
export const RONDE_JUMLAH_QA: SoalJumlah[][] = [
  [{ set: "parsel", ids: ["mangga", "pisang"] }, { set: "parsel", ids: ["apel", "jeruk"] }],
  [{ set: "parsel", ids: ["jeruk", "apel", "pisang", "mangga"] }, { set: "mainan", ids: ["mobil", "boneka", "kelereng", "balok"] }],
  [{ set: "sayur", ids: ["brokoli", "jagung"] }, { set: "kue", ids: ["cucur", "talam"] }],
];
export const hasilJumlah = (s: SoalJumlah): number => s.ids.reduce((a, id) => a + banyak(s.set, id), 0);
export function tanyaJumlah(s: SoalJumlah): string {
  const nama = s.ids.map((id) => kat(s.set, id).nama);
  if (s.ids.length === DATA[s.set].kategori.length) return `Berapa jumlah semua data pada ${DATA[s.set].judul.toLowerCase()}?`;
  return `Berapa jumlah ${nama.join(" dan ")} pada ${DATA[s.set].judul.toLowerCase()}?`;
}

/* ====================================================================== */
/* SUB-BAB B. Diagram Gambar                                                */
/* ====================================================================== */

export type Lambang = "bintang" | "lingkaran" | "hati" | "senyum";
export const LAMBANG_SEMUA: Lambang[] = ["bintang", "lingkaran", "hati", "senyum"];
export const NAMA_LAMBANG: Record<Lambang, string> = { bintang: "bintang", lingkaran: "lingkaran", hati: "hati", senyum: "wajah tersenyum" };

/* ------------------------------ Concrete B ------------------------------ */

/** CB1 Tempel Gambar (Catat Data memakai gambar benda). */
export const RONDE_CATAT_B: Hitungan[] = [
  { set: "bunga", hitung: [["mawar", 4], ["lili", 2], ["tulip", 3]] },
  { set: "pasar", hitung: [["apel", 3], ["jeruk", 4], ["alpukat", 2]] },
  { set: "parsel", hitung: [["jeruk", 4], ["apel", 3], ["pisang", 2]] },
];
/** CB2 Kelompokkan ke Baris (Sortir). */
export const RONDE_SORTIR_B: Hitungan[] = [
  { set: "kue", hitung: [["cucur", 2], ["lemper", 3], ["talam", 3]] },
  { set: "bunga", hitung: [["mawar", 3], ["tulip", 3], ["aster", 2]] },
  { set: "olahraga", hitung: [["bola", 3], ["renang", 2], ["basket", 3]] },
];
/** CB3 Isi Diagram Gambar dari benda nyata (semua kategori, tiap baris sampai 7). */
export const RONDE_GAMBAR_CB: IdData[] = ["buah", "kue", "bunga"];
/** CB4 Jodohkan Benda dan Baris Gambar. */
export const RONDE_PASANG_CB: Hitungan[] = [
  { set: "buah", hitung: [["anggur", 2], ["pisang", 3], ["apel", 4]] },
  { set: "mainan", hitung: [["mobil", 2], ["boneka", 4], ["kelereng", 6]] },
  { set: "sayur", hitung: [["jagung", 3], ["wortel", 6], ["brokoli", 7]] },
];
/** CB5 Memori Benda dan Baris Gambar. */
export const RONDE_MEMORI_CB: IdData[] = ["buah", "kue", "sayur"];
/** CB6 Baca Diagram Gambar Benda (dua soal tiap ronde). */
export const RONDE_BACA_CB: Rujuk[][] = [
  [{ set: "buah", k: "jeruk" }, { set: "buah", k: "pisang" }],
  [{ set: "kue", k: "talam" }, { set: "kue", k: "lemper" }],
  [{ set: "sayur", k: "brokoli" }, { set: "sayur", k: "jagung" }],
];
/** CB7 Baris Terbanyak dan Tersedikit. */
export const RONDE_PALING_CB: IdData[] = ["kue", "hewan", "sayur"];
/** CB8 Lebihnya dan Kurangnya dari diagram (hitung selisih). */
export const RONDE_BEDA_CB: SoalBeda[][] = [
  [{ set: "kue", a: "talam", b: "lemper" }, { set: "kue", a: "cucur", b: "onde" }],
  [{ set: "parsel", a: "pisang", b: "mangga" }, { set: "parsel", a: "jeruk", b: "apel" }],
  [{ set: "pasar", a: "jeruk", b: "apel" }, { set: "pasar", a: "alpukat", b: "semangka" }],
];
/** CB9 Urutkan Baris Gambar. */
export const RONDE_URUT_CB: RondeUrut[] = [
  { set: "kue", ids: ["cucur", "onde", "lemper", "talam"], dari: "banyak" },
  { set: "mainan", ids: ["mobil", "boneka", "kelereng", "balok"], dari: "sedikit" },
  { set: "buah", ids: ["anggur", "jeruk", "apel", "pisang"], dari: "banyak" },
];
/** CB10 Kartu Benda ke Baris Gambar (LetakSlot). */
export const RONDE_SLOT_CB: Hitungan[] = [
  { set: "buah", hitung: [["anggur", 2], ["apel", 4], ["pisang", 3]] },
  { set: "kue", hitung: [["lemper", 3], ["onde", 5], ["cucur", 6]] },
  { set: "sayur", hitung: [["jagung", 3], ["bayam", 4], ["wortel", 6]] },
];

/* ------------------------------ Picture B ------------------------------ */

/** PB1 Baca Lambang (tulis banyaknya), dua soal tiap ronde; lambang berganti tiap ronde. */
export const RONDE_BACA_PB: number[][] = [[6, 4], [7, 5], [9, 3]];
/** PB2 Warnai Diagram dari tabel angka. */
export const RONDE_GAMBAR_PB: IdData[] = ["warna", "permainan", "berangkat"];
/** PB3 Diagram yang Tepat (dua soal tiap ronde). */
export const RONDE_TEPAT_PB: number[][] = [[5, 7], [4, 8], [6, 3]];
/** PB4 Jodohkan Diagram dan Bilangan. */
export const RONDE_PASANG_PB: number[][] = [[2, 5, 7], [3, 6, 8], [4, 7, 9]];
/** PB5 Memori Diagram dan Bilangan. */
export const RONDE_MEMORI_PB: number[][] = [[2, 5, 7, 9], [3, 4, 6, 8], [1, 5, 6, 8]];
/** PB6 Urutkan Baris Lambang. */
export const RONDE_URUT_PB: { angka: number[]; dari: "sedikit" | "banyak" }[] = [
  { angka: [4, 8, 2, 6], dari: "sedikit" },
  { angka: [7, 3, 9, 5], dari: "banyak" },
  { angka: [5, 1, 8, 3], dari: "sedikit" },
];
/** PB7 Baca Diagram Penuh (dua soal tiap ronde): set dan pertanyaan dibangkitkan dari data. */
export type SoalBacaDiagram = { set: IdData; tanya: "banyak" | "paling" | "jumlah"; id?: string };
export const RONDE_BACA_PB7: SoalBacaDiagram[][] = [
  [{ set: "warna", tanya: "banyak", id: "biru" }, { set: "warna", tanya: "paling" }],
  [{ set: "kaleng", tanya: "paling" }, { set: "kaleng", tanya: "jumlah" }],
  [{ set: "lari", tanya: "jumlah" }, { set: "lari", tanya: "banyak", id: "p1" }],
];
/** Pertanyaan, kunci, dan pilihan untuk satu soal baca diagram penuh. */
export function soalBacaDiagram(s: SoalBacaDiagram, nomor: number): { tanya: string; opsi: string[]; jawab: number; pesan: string; petunjuk: string; angka: boolean } {
  const ds = DATA[s.set];
  if (s.tanya === "paling") {
    const k = palingTunggal(s.set, "banyak");
    if (!k) throw new Error("tidak ada yang paling banyak");
    const semua = ds.kategori.map((x) => x.nama);
    const salah = semua.filter((x) => x !== k.nama).slice(0, 2) as [string, string];
    const { opsi, jawab } = susunOpsi(k.nama, salah, nomor);
    return { tanya: s.set === "warna" ? "Warna apa yang paling banyak disukai?" : s.set === "kaleng" ? "Kaleng warna apa yang paling banyak dikumpulkan?" : "Apa yang paling banyak?", opsi, jawab, pesan: `Yang paling banyak adalah ${k.nama}, yaitu ${k.n}.`, petunjuk: "Cari baris yang paling panjang pada diagram.", angka: false };
  }
  if (s.tanya === "jumlah") {
    const t = total(s.set);
    const o = opsiAngka(t, nomor);
    return { tanya: `Berapa jumlah semua ${ds.satuan} pada diagram?`, opsi: o.map(String), jawab: o.indexOf(t), pesan: `Jumlah semuanya ${t}.`, petunjuk: "Hitung gambar pada setiap baris, lalu jumlahkan semuanya.", angka: true };
  }
  const k = kat(s.set, s.id ?? "");
  const o = opsiAngka(k.n, nomor);
  return { tanya: `Berapa ${ds.satuan} pada baris ${k.nama}?`, opsi: o.map(String), jawab: o.indexOf(k.n), pesan: `Baris ${k.nama} berisi ${k.n} gambar.`, petunjuk: "Hitung gambar pada baris itu satu per satu.", angka: true };
}
/** PB8 Lengkapi Banyak pada Diagram Lambang: seluruh kategori satu kumpulan data. */
export const RONDE_ISI_PB: IdData[] = ["warna", "permainan", "kaleng"];
/** PB9 Lebihnya dan Kurangnya pada garis bilangan. */
export const RONDE_LEBIH_PB: SoalLebih[][] = [
  [{ set: "bunga", dari: "lili", ke: "tulip", jenis: "lebih" }, { set: "bunga", dari: "mawar", ke: "aster", jenis: "kurang" }],
  [{ set: "kue", dari: "lemper", ke: "onde", jenis: "lebih" }, { set: "kue", dari: "talam", ke: "cucur", jenis: "kurang" }],
  [{ set: "warna", dari: "hitam", ke: "kuning", jenis: "lebih" }, { set: "warna", dari: "merah", ke: "biru", jenis: "kurang" }],
];
/** PB10 Pilah Baris: kurang dari 5 atau 5 atau lebih. */
export const RONDE_SORTIR_PB: number[][] = [[3, 7, 4, 9, 2, 6], [8, 1, 5, 3, 7, 4], [2, 6, 9, 3, 5, 8]];

/* ------------------------------ Abstract B ------------------------------ */

/** QB1 Jodohkan Pasangan Data dan Selisihnya (tiga pasang tiap ronde, selisih berbeda). */
export type SoalPasangBeda = { set: IdData; a: string; b: string };
export const RONDE_PASANG_QB: SoalPasangBeda[][] = [
  [{ set: "bunga", a: "mawar", b: "tulip" }, { set: "bunga", a: "tulip", b: "lili" }, { set: "bunga", a: "mawar", b: "lili" }],
  [{ set: "kue", a: "talam", b: "onde" }, { set: "kue", a: "cucur", b: "lemper" }, { set: "kue", a: "talam", b: "lemper" }],
  [{ set: "warna", a: "merah", b: "kuning" }, { set: "warna", a: "biru", b: "hitam" }, { set: "warna", a: "merah", b: "biru" }],
];
export const selisihPasang = (s: SoalPasangBeda): number => Math.abs(banyak(s.set, s.a) - banyak(s.set, s.b));
/** QB2 Lengkapi Kalimat Lebihnya dan Kurangnya (tiga kalimat tiap ronde). */
export type SoalKalimatBeda = { set: IdData; a: string; b: string; jenis: "lebih" | "kurang" };
export const RONDE_KALIMAT_QB: SoalKalimatBeda[][] = [
  [{ set: "bunga", a: "tulip", b: "lili", jenis: "lebih" }, { set: "bunga", a: "aster", b: "mawar", jenis: "kurang" }, { set: "parsel", a: "pisang", b: "mangga", jenis: "lebih" }],
  [{ set: "parsel", a: "apel", b: "pisang", jenis: "kurang" }, { set: "warna", a: "merah", b: "hitam", jenis: "lebih" }, { set: "kaleng", a: "b", b: "a", jenis: "kurang" }],
];
/** Penyebut benda: "bunga tulip", "buah pisang", "penyuka warna merah", "kaleng hijau". */
export function objek(set: IdData, nama: string): string {
  const awalan: Partial<Record<IdData, string>> = { bunga: "bunga", parsel: "buah", pasar: "buah", warna: "penyuka warna", kaleng: "kaleng" };
  const a = awalan[set];
  return a ? `${a} ${nama}` : nama;
}
export function hasilBedaKalimat(s: SoalKalimatBeda): number {
  return Math.abs(banyak(s.set, s.a) - banyak(s.set, s.b));
}
export function kalimatIsianBeda(s: SoalKalimatBeda, nomor: number): KalimatIsian {
  const a = kat(s.set, s.a);
  const b = kat(s.set, s.b);
  const sel = hasilBedaKalimat(s);
  const o = opsiAngka(sel, nomor);
  const depan = `Banyak ${objek(s.set, a.nama)}`;
  const belakang = `${s.jenis === "lebih" ? "lebihnya" : "kurangnya"} dari banyak ${objek(s.set, b.nama)}.`;
  return { depan, belakang, opsi: o.map(String), benar: o.indexOf(sel) };
}
/** QB3 Susun Kalimat Diagram Gambar. */
export const RONDE_SUSUN_QB: { kata: string[]; pengecoh: string }[] = [
  { kata: ["Setiap", "gambar", "mewakili", "satu", "benda"], pengecoh: "dua" },
  { kata: ["Diagram", "gambar", "menyajikan", "data", "dengan", "gambar", "yang", "sama"], pengecoh: "berbeda" },
  { kata: ["Penyuka", "warna", "biru", "dua", "lebihnya", "dari", "penyuka", "warna", "hitam"], pengecoh: "tiga" },
  { kata: ["Warna", "merah", "paling", "banyak", "disukai", "siswa", "kelas", "dua"], pengecoh: "kuning" },
];
/** QB4 Buat Diagram dari kalimat data (semua kategori, tiap baris sampai 8). */
export const RONDE_GAMBAR_QB: IdData[] = ["permainan", "olahraga", "berangkat"];
/** QB5 Benar atau Salah. */
export const RONDE_BENARSALAH_QB: Pernyataan[][] = [
  [
    { teks: "Pada diagram gambar, setiap gambar mewakili satu benda.", benar: true, penjelasan: "Satu gambar mewakili satu benda, satu anak, atau satu siswa, sesuai keterangan." },
    { teks: `Ada ${banyak("bunga", "mawar")} bunga mawar dalam rangkaian Tika.`, benar: banyak("bunga", "mawar") === 7, penjelasan: "Diagram gambar mawar berisi tujuh gambar bunga." },
    { teks: "Bunga lili dan bunga aster sama banyak.", benar: banyak("bunga", "lili") === banyak("bunga", "aster"), penjelasan: "Lili ada empat dan aster ada empat, jadi sama banyak." },
    { teks: `Banyak tulip ${banyak("bunga", "tulip") - banyak("bunga", "lili") + 1} lebihnya dari banyak lili.`, benar: false, penjelasan: "Tulip lima dan lili empat, jadi tulip satu lebihnya dari lili." },
    { teks: "Hanya bintang yang boleh dipakai sebagai gambar pada diagram gambar.", benar: false, penjelasan: "Kita boleh memakai lingkaran, hati, atau wajah tersenyum, asalkan satu gambar mewakili satu benda." },
  ],
  [
    { teks: `Kue talam paling banyak disukai, yaitu ${banyak("kue", "talam")} anak.`, benar: palingTunggal("kue", "banyak")?.id === "talam" && banyak("kue", "talam") === 7, penjelasan: "Kue talam tujuh, lebih banyak dari kue cucur yang enam." },
    { teks: `Ada ${banyak("kue", "lemper")} anak yang suka lemper.`, benar: banyak("kue", "lemper") === 3, penjelasan: "Baris lemper berisi tiga bintang." },
    { teks: `Penyuka warna merah ${banyak("warna", "merah") - banyak("warna", "kuning")} lebihnya dari penyuka warna kuning.`, benar: banyak("warna", "merah") - banyak("warna", "kuning") === 4, penjelasan: "Merah tujuh dan kuning tiga, jadi merah empat lebihnya dari kuning." },
    { teks: `Jumlah siswa yang berlari lebih dari dua putaran adalah ${banyak("lari", "p3") + banyak("lari", "p4")}.`, benar: banyak("lari", "p3") + banyak("lari", "p4") === 6, penjelasan: "Tiga putaran ada empat siswa dan empat putaran ada dua siswa, jadi enam siswa." },
    { teks: "Warna biru paling sedikit disukai siswa kelas dua.", benar: palingTunggal("warna", "sedikit")?.id === "biru", penjelasan: "Warna hitam yang paling sedikit, yaitu dua siswa." },
  ],
];
/** QB6 Detektif Diagram Gambar. */
export const RONDE_DETEKTIF_QB: SoalDetektif[] = [
  { set: "kue", klue: [{ jenis: "paling", arah: "banyak" }, { jenis: "lebihDari", n: 6 }], opsi: ["cucur", "talam", "onde"], jawab: "talam" },
  { set: "warna", klue: [{ jenis: "kurangnyaDari", id: "merah", k: 2 }, { jenis: "lebihDari", n: 4 }], opsi: ["biru", "kuning", "hitam"], jawab: "biru" },
  { set: "permainan", klue: [{ jenis: "lebihnyaDari", id: "karet", k: 1 }, { jenis: "kurangDari", n: 6 }], opsi: ["lompat", "petak", "benteng"], jawab: "petak" },
  { set: "kaleng", klue: [{ jenis: "paling", arah: "sedikit" }, { jenis: "kurangDari", n: 4 }], opsi: ["a", "b", "d"], jawab: "d" },
];
/** QB7 Peta Konsep. */
export const PETA_KONSEP_QB: { pusat: string; kotak: KotakPeta[] }[] = [
  {
    pusat: "Diagram gambar",
    kotak: [
      { label: "Pada diagram gambar, satu gambar mewakili", opsi: ["satu benda", "lima benda", "sepuluh benda"], benar: 0 },
      { label: "Gambar yang boleh dipakai adalah", opsi: ["bintang, lingkaran, atau hati", "hanya angka", "hanya huruf"], benar: 0 },
      { label: "Semua gambar dalam satu diagram harus", opsi: ["sama bentuk dan ukurannya", "berbeda-beda", "tidak diberi keterangan"], benar: 0 },
      { label: "Menurutku, diagram gambar memudahkan kita karena", opsi: ["banyak data langsung terlihat", "data dibuat hilang", "tidak perlu menghitung"], benar: 0 },
    ],
  },
  {
    pusat: "Membaca diagram",
    kotak: [
      { label: "Baris yang paling panjang menunjukkan data", opsi: ["paling banyak", "paling sedikit", "sama banyak"], benar: 0 },
      { label: "Dua baris yang sama panjang menunjukkan data yang", opsi: ["sama banyak", "berbeda jauh", "hilang"], benar: 0 },
      { label: "Merah 7 dan hitam 2, jadi merah", opsi: ["5 lebihnya dari hitam", "5 kurangnya dari hitam", "sama dengan hitam"], benar: 0 },
      { label: "Menurutku, sebelum menjawab aku harus", opsi: ["membaca keterangan dan menghitung gambar", "menebak saja", "melihat jawaban teman"], benar: 0 },
    ],
  },
];
/** QB8 Urutkan Data. */
export const RONDE_URUT_QB: RondeUrut[] = [
  { set: "warna", ids: ["merah", "kuning", "biru", "hitam"], dari: "banyak" },
  { set: "permainan", ids: ["karet", "lompat", "petak", "benteng"], dari: "sedikit" },
  { set: "kaleng", ids: ["a", "b", "c", "d"], dari: "banyak" },
];
/** QB9 Ketuk Semua. */
export const RONDE_SEMUA_QB: SoalSemua[] = [
  { set: "warna", arah: "kurang", acuan: 6 },
  { set: "permainan", arah: "lebih", acuan: 5 },
  { set: "buahgambar", arah: "lebih", acuan: 4 },
];
/** QB10 Hitung Jumlah dan Selisih (dua soal tiap ronde). */
export const RONDE_JUMLAH_QB: SoalJumlah[][] = [
  [{ set: "warna", ids: ["merah", "kuning"] }, { set: "warna", ids: ["biru", "hitam"] }],
  [{ set: "lari", ids: ["p3", "p4"] }, { set: "lari", ids: ["p1", "p2", "p3", "p4"] }],
  [{ set: "kue", ids: ["cucur", "onde"] }, { set: "kue", ids: ["cucur", "onde", "lemper", "talam"] }],
];

/* ====================================================================== */
/* Pembantu umum untuk komponen                                             */
/* ====================================================================== */

/** Urutan id kategori menurut banyaknya. */
export function urutKategori(set: IdData, ids: readonly string[], dari: "sedikit" | "banyak"): string[] {
  const s = [...ids].sort((x, y) => banyak(set, x) - banyak(set, y));
  return dari === "sedikit" ? s : s.reverse();
}
/** Urutan angka. */
export function urutAngka(angka: readonly number[], dari: "sedikit" | "banyak"): number[] {
  const s = [...angka].sort((a, b) => a - b);
  return dari === "sedikit" ? s : s.reverse();
}
/** Kata untuk arah urutan. */
export const kataAwal = (d: "sedikit" | "banyak") => (d === "sedikit" ? "paling sedikit" : "paling banyak");
export const kataAkhir = (d: "sedikit" | "banyak") => (d === "sedikit" ? "paling banyak" : "paling sedikit");

/** Petunjuk gambar: turus dengan banyak n dibagi ke kelompok lima. */
export const jumlahKelompok = (n: number): number => Math.max(1, Math.ceil(n / 5));
