/**
 * Lab Petak (Kelas 5 Bab 5, Sub-Bab A: Apakah Luas Daerah Itu?): logika murni. Satu alat, tiga tampilan.
 *  Tutup : anak menutup daerah persegi panjang dengan petak satuan sampai rapat tanpa celah, lalu memilih luasnya
 *          (Unit Square Covering).
 *  Baris : anak menyusun petak menjadi baris dan kolom sesuai tugas, lalu memilih banyak petaknya (Array Model).
 *  Potong: sebuah bangun tangga dari petak. Petak yang menonjol di luar garis putus dipindah ke lubang di dalamnya
 *          sampai menjadi persegi panjang. Luas tetap (Area Conservation, cara Yohana).
 * Data dari Buku Siswa Kelas V Bab 5 Sub-Bab A (5 × 2, 3 × 3, 4 × 2, ubin 1 m, cara Yohana).
 * Konsep sub-bab berikutnya (rumus bangun, bangun gabungan, hubungan dengan tepi) tidak dipakai di sini.
 * Semua bilangan bulat. Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k5b5.mjs.
 */

export type DaerahTutup = { w: number; h: number; sat: "cm²" | "m²" };
export type SusunanBaris = { r: number; k: number };
/** tumpuk: banyak petak tiap kolom bangun (dari bawah). r dan c: ukuran persegi panjang tujuan, banyak baris dan kolom. */
export type BangunPotong = { nama: string; tumpuk: number[]; r: number; c: number };

export const DATA_TUTUP: DaerahTutup[] = [
  { w: 5, h: 2, sat: "cm²" },
  { w: 3, h: 3, sat: "m²" },
  { w: 4, h: 2, sat: "cm²" },
];
export const DATA_BARIS: SusunanBaris[] = [
  { r: 4, k: 2 },
  { r: 6, k: 3 },
  { r: 5, k: 4 },
];
export const DATA_POTONG: BangunPotong[] = [
  { nama: "tangga tiga tingkat", tumpuk: [1, 2, 3], r: 2, c: 3 },
  { nama: "tangga empat tingkat", tumpuk: [1, 2, 3, 4], r: 2, c: 5 },
];
export const MAKS_BARIS = 8;

const jumlah = (a: number[]): number => a.reduce((s, v) => s + v, 0);
const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
const catat = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;
/** Dua pengecoh pertama dari kandidat: bulat positif, unik, bukan benar. Bila kurang, dilengkapi dari benar + 2, benar + 3, benar + 4. */
function pengecoh(benar: number, kandidat: number[]): number[] {
  const hasil: number[] = [];
  for (const n of [...kandidat, benar + 2, benar + 3, benar + 4]) {
    if (hasil.length === 2) break;
    if (Number.isInteger(n) && n > 0 && n !== benar && !hasil.includes(n)) hasil.push(n);
  }
  return hasil;
}

export const luasTutup = (d: DaerahTutup): number => d.w * d.h;
export const luasBaris = (s: SusunanBaris): number => s.r * s.k;
export const satuanPetak = (sat: string): string => (sat === "cm²" ? "1 cm × 1 cm" : "1 m × 1 m");
/** Pilihan luas Tutup: yang benar, jumlah baris dan kolom saja, dan jumlah panjang tepi. */
export function opsiTutup(i: number): number[] {
  const d = DATA_TUTUP[i];
  const benar = luasTutup(d);
  return putar([benar, ...pengecoh(benar, [d.w + d.h, 2 * (d.w + d.h)])], i);
}
/** Pilihan banyak petak Baris: yang benar, baris ditambah kolom, dan baris dikali baris. */
export function opsiBaris(i: number): number[] {
  const s = DATA_BARIS[i];
  const benar = luasBaris(s);
  return putar([benar, ...pengecoh(benar, [s.r + s.k, s.r * s.r])], i + 1);
}

/* ------------------------------ Potong: petak di kisi ------------------------------ */

/** Banyak baris dan kolom kisi gambar: cukup untuk bangun dan untuk persegi panjang tujuan. */
export const barisKisi = (d: BangunPotong): number => Math.max(d.r, ...d.tumpuk);
export const lebarKisi = (d: BangunPotong): number => Math.max(d.c, d.tumpuk.length);
/** Baris diberi nomor dari atas (0) ke bawah. Persegi panjang tujuan menempel di dasar kisi dan dimulai dari kolom pertama. */
export const dalamGaris = (d: BangunPotong, ru: number, k: number): boolean => k >= 0 && k < d.c && ru >= barisKisi(d) - d.r && ru < barisKisi(d);
export const idPetak = (ru: number, k: number): string => `${ru},${k}`;
export function petakAwal(d: BangunPotong): string[] {
  const H = barisKisi(d);
  const hasil: string[] = [];
  d.tumpuk.forEach((t, k) => {
    for (let ru = H - t; ru < H; ru += 1) hasil.push(idPetak(ru, k));
  });
  return hasil;
}
export const luasPotong = (d: BangunPotong): number => jumlah(d.tumpuk);
/** Banyak petak yang menonjol di luar garis putus. */
export function menonjol(d: BangunPotong, petak: string[]): number {
  return petak.filter((p) => {
    const [ru, k] = p.split(",").map(Number);
    return !dalamGaris(d, ru, k);
  }).length;
}

/* ------------------------------ Keadaan ------------------------------ */

export type StateTutupK5B5A = { data: number; petak: number[]; rapat: boolean };
export type StatePetakK5B5A = {
  tutup: StateTutupK5B5A;
  baris: { data: number; r: number; k: number };
  potong: { data: number; petak: string[]; pilih: string | null };
  pernah: string[];
  pesan: string;
};

export type AksiPetakK5B5A =
  | { t: "T_DATA"; i: number }
  | { t: "T_PETAK"; ru: number; k: number }
  | { t: "T_PERIKSA" }
  | { t: "T_LUAS"; nilai: number }
  | { t: "B_DATA"; i: number }
  | { t: "B_BARIS"; d: number }
  | { t: "B_KOLOM"; d: number }
  | { t: "B_LUAS"; nilai: number }
  | { t: "PO_DATA"; i: number }
  | { t: "PO_AMBIL"; ru: number; k: number }
  | { t: "PO_TARUH"; ru: number; k: number }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

const tutupKosong = (i: number): StateTutupK5B5A => ({ data: i, petak: Array.from({ length: DATA_TUTUP[i].w * DATA_TUTUP[i].h }, () => 0), rapat: false });
const potongAwal = (i: number): StatePetakK5B5A["potong"] => ({ data: i, petak: petakAwal(DATA_POTONG[i]), pilih: null });

export const awalPetakK5B5A = (): StatePetakK5B5A => ({
  tutup: tutupKosong(0),
  baris: { data: 0, r: 1, k: 1 },
  potong: potongAwal(0),
  pernah: [],
  pesan: "",
});

export const dataTutup = (x: StatePetakK5B5A): DaerahTutup => DATA_TUTUP[x.tutup.data];
export const dataBaris = (x: StatePetakK5B5A): SusunanBaris => DATA_BARIS[x.baris.data];
export const dataPotong = (x: StatePetakK5B5A): BangunPotong => DATA_POTONG[x.potong.data];
export const tertutup = (x: StatePetakK5B5A): number => x.tutup.petak.reduce((s, v) => s + v, 0);

function ketukTutup(x: StatePetakK5B5A, ru: number, k: number): StatePetakK5B5A {
  const d = dataTutup(x);
  if (!sah(ru, d.h) || !sah(k, d.w)) return x;
  const n = ru * d.w + k;
  return { ...x, tutup: { ...x.tutup, petak: x.tutup.petak.map((v, j) => (j === n ? 1 - v : v)), rapat: false }, pesan: "" };
}

function periksaTutup(x: StatePetakK5B5A): StatePetakK5B5A {
  const d = dataTutup(x);
  const total = d.w * d.h;
  const sudah = tertutup(x);
  if (sudah === 0) return { ...x, pesan: "Ketuk petak untuk menutup daerah, lalu periksa tutupannya." };
  if (sudah < total) return { ...x, tutup: { ...x.tutup, rapat: false }, pesan: `Masih ada celah: ${total - sudah} petak belum tertutup. Tutup rapat sampai tidak ada celah.` };
  return { ...x, tutup: { ...x.tutup, rapat: true }, pesan: "✅ Tertutup rapat tanpa celah. Hitung petak satuan yang menutupinya, lalu pilih luasnya." };
}

function pilihLuasTutup(x: StatePetakK5B5A, n: number): StatePetakK5B5A {
  const i = x.tutup.data;
  const d = DATA_TUTUP[i];
  if (!opsiTutup(i).includes(n)) return x;
  if (!x.tutup.rapat) return { ...x, pesan: "Tutup dulu daerahnya sampai rapat, lalu periksa tutupannya." };
  if (n === luasTutup(d)) {
    return {
      ...x,
      pernah: catat(x.pernah, `tutup:${i}`),
      pesan: `✅ Luasnya ${n} ${d.sat}: ada ${d.h} baris, tiap baris ${d.w} petak satuan. Satu petak ${satuanPetak(d.sat)} luasnya 1 ${d.sat}.`,
    };
  }
  if (n === d.w + d.h) return { ...x, pesan: `${n} baru banyak petak pada satu baris ditambah satu kolom. Luas adalah semua petak yang menutup daerah.` };
  if (n === 2 * (d.w + d.h)) return { ...x, pesan: `${n} menjumlah panjang tepi, bukan petak yang menutup daerah di dalam.` };
  return { ...x, pesan: "Belum. Hitung semua petak yang menutup daerah, baris demi baris." };
}

function ubahSusunan(x: StatePetakK5B5A, jenis: "r" | "k", d: number): StatePetakK5B5A {
  if (d !== 1 && d !== -1) return x;
  const baru = x.baris[jenis] + d;
  if (baru < 1) return x;
  if (baru > MAKS_BARIS) return { ...x, pesan: `Susunan paling banyak ${MAKS_BARIS} ${jenis === "r" ? "baris" : "kolom"}.` };
  return { ...x, baris: { ...x.baris, [jenis]: baru }, pesan: "" };
}

function pilihLuasBaris(x: StatePetakK5B5A, n: number): StatePetakK5B5A {
  const i = x.baris.data;
  const s = DATA_BARIS[i];
  if (!opsiBaris(i).includes(n)) return x;
  if (x.baris.r !== s.r || x.baris.k !== s.k) return { ...x, pesan: `Atur dulu susunannya menjadi ${s.r} baris dan ${s.k} kolom, lalu pilih banyak petaknya.` };
  if (n === luasBaris(s)) {
    return { ...x, pernah: catat(x.pernah, `baris:${i}`), pesan: `✅ ${s.r} baris, tiap baris ${s.k} petak: ${s.r} × ${s.k} = ${n} petak. Luasnya ${n} petak satuan.` };
  }
  if (n === s.r + s.k) return { ...x, pesan: `${n} baru baris ditambah kolom. Banyak petak adalah ${s.k} petak tiap baris sebanyak ${s.r} baris.` };
  if (n === s.r * s.r) return { ...x, pesan: `${n} menghitung baris dikali baris. Banyak petak adalah baris dikali kolom.` };
  return { ...x, pesan: "Belum. Hitung petak tiap baris, lalu ulangi sebanyak baris." };
}

function ambilPetak(x: StatePetakK5B5A, ru: number, k: number): StatePetakK5B5A {
  const d = dataPotong(x);
  if (!sah(ru, barisKisi(d)) || !sah(k, lebarKisi(d))) return x;
  if (!x.potong.petak.includes(idPetak(ru, k))) return { ...x, pesan: "Di sini lubang, bukan petak. Ambil petak yang menonjol di luar garis putus." };
  if (dalamGaris(d, ru, k)) return { ...x, pesan: "Petak ini sudah pas di dalam garis putus. Ambil petak yang menonjol di luar garis putus." };
  return { ...x, potong: { ...x.potong, pilih: idPetak(ru, k) }, pesan: "✅ Petak sudah diambil. Taruh di lubang di dalam garis putus." };
}

function taruhPetak(x: StatePetakK5B5A, ru: number, k: number): StatePetakK5B5A {
  const d = dataPotong(x);
  if (!sah(ru, barisKisi(d)) || !sah(k, lebarKisi(d))) return x;
  const { pilih, petak } = x.potong;
  if (pilih === null) return { ...x, pesan: "Ambil dulu petak yang menonjol di luar garis putus." };
  if (!dalamGaris(d, ru, k)) return { ...x, pesan: "Taruh petak di lubang di dalam garis putus, bukan di luarnya." };
  if (petak.includes(idPetak(ru, k))) return { ...x, pesan: "Tempat itu sudah terisi petak. Taruh petak di lubang yang masih kosong." };
  const baru = [...petak.filter((p) => p !== pilih), idPetak(ru, k)];
  const sisa = menonjol(d, baru);
  const dasar = { ...x, potong: { ...x.potong, petak: baru, pilih: null } };
  if (sisa === 0) {
    return {
      ...dasar,
      pernah: catat(x.pernah, `potong:${x.potong.data}`),
      pesan: `✅ Semua petak sudah di dalam garis putus. Bentuknya persegi panjang ${d.r} baris dan ${d.c} kolom. Luas tetap ${baru.length} petak: tidak ada petak yang hilang atau bertambah.`,
    };
  }
  return { ...dasar, pesan: `✅ Petak sudah dipindah. Luas masih ${baru.length} petak. Tinggal ${sisa} petak yang menonjol.` };
}

export function langkahPetakK5B5A(x: StatePetakK5B5A, a: AksiPetakK5B5A): StatePetakK5B5A {
  switch (a.t) {
    case "T_DATA":
      return sah(a.i, DATA_TUTUP.length) ? { ...x, tutup: tutupKosong(a.i), pesan: "" } : x;
    case "T_PETAK":
      return ketukTutup(x, a.ru, a.k);
    case "T_PERIKSA":
      return periksaTutup(x);
    case "T_LUAS":
      return pilihLuasTutup(x, a.nilai);
    case "B_DATA":
      return sah(a.i, DATA_BARIS.length) ? { ...x, baris: { data: a.i, r: 1, k: 1 }, pesan: "" } : x;
    case "B_BARIS":
      return ubahSusunan(x, "r", a.d);
    case "B_KOLOM":
      return ubahSusunan(x, "k", a.d);
    case "B_LUAS":
      return pilihLuasBaris(x, a.nilai);
    case "PO_DATA":
      return sah(a.i, DATA_POTONG.length) ? { ...x, potong: potongAwal(a.i), pesan: "" } : x;
    case "PO_AMBIL":
      return ambilPetak(x, a.ru, a.k);
    case "PO_TARUH":
      return taruhPetak(x, a.ru, a.k);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalPetakK5B5A();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanPetakK5B5A = { alat: "petak"; pernah: string[] };
export const keadaanPetakK5B5A = (x: StatePetakK5B5A): KeadaanPetakK5B5A => ({ alat: "petak", pernah: x.pernah });

export const ucapTutupK5B5A = (x: StatePetakK5B5A): string => {
  const d = dataTutup(x);
  const sekarang = x.tutup.rapat ? "Daerah sudah tertutup rapat. Pilih luasnya." : `Sudah ${tertutup(x)} petak tertutup dari ${d.w * d.h}.`;
  return `Tutup daerah ${d.w} petak ke samping dan ${d.h} petak ke bawah dengan petak satuan, tanpa celah. ${sekarang}`;
};
export const ucapBarisK5B5A = (x: StatePetakK5B5A): string => {
  const s = dataBaris(x);
  return `Susun ${s.r} baris dan ${s.k} kolom petak. Sekarang ${x.baris.r} baris dan ${x.baris.k} kolom.`;
};
export const ucapPotongK5B5A = (x: StatePetakK5B5A): string => {
  const d = dataPotong(x);
  const sisa = menonjol(d, x.potong.petak);
  const sekarang = sisa === 0 ? "Semua petak sudah di dalam garis putus." : `Ada ${sisa} petak yang menonjol di luar garis putus.`;
  return `Pindahkan petak dari ${d.nama} supaya menjadi persegi panjang ${d.r} baris dan ${d.c} kolom. Luas ${x.potong.petak.length} petak. ${sekarang}`;
};
