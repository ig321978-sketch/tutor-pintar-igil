/**
 * Lab Susunan Faktor (Kelas 5 Bab 2, Sub-Bab C): logika murni. Satu alat, tiga tampilan.
 *  Susun    : n titik disusun dalam sejumlah baris sama banyak. Bila semua titik terpakai tanpa sisa, banyak baris itu
 *             adalah faktor n. Anak menyimpan susunan penuh sampai semua faktor ditemukan.
 *  Pasangan : kandidat 1, 2, 3, dan seterusnya. Anak mencari pasangan tiap kandidat (hasil kalinya n) atau
 *             menyatakan bukan faktor. Berhenti bila kandidat dikali dirinya sendiri sudah melebihi n.
 *  Tanda    : kartu 1 sampai n. Anak mengetuk semua faktor n, lalu memeriksa daftarnya.
 * Data dari Buku Siswa Kelas V Bab 2 Sub-Bab C (faktor 12, 18, 24, 36; potong petak tanpa sisa). Semua bilangan bulat.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k5b2.mjs.
 */

export const DATA_SUSUN = [12, 18, 24];
export const DATA_PASANGAN = [18, 12, 36];
export const DATA_TANDA = [24, 36];

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);

/* ------------------------------ Hitungan ------------------------------ */

/** Semua faktor n, dari yang terkecil. */
export const daftarFaktor = (n: number): number[] => Array.from({ length: n }, (_, i) => i + 1).filter((d) => n % d === 0);
/** Pasangan faktor (a, b) dengan a paling besar akar n. */
export const pasanganFaktor = (n: number): [number, number][] => daftarFaktor(n).filter((a) => a * a <= n).map((a) => [a, n / a]);

/** Pilihan jawaban pasangan untuk kandidat a. Nol berarti "bukan faktor". */
export function opsiPasangan(n: number, a: number): number[] {
  if (n % a === 0) {
    const b = n / a;
    return putar([b, b + 1, 0], a);
  }
  const q = Math.floor(n / a);
  return putar([0, q, q + 1], a);
}

/* ------------------------------ Keadaan ------------------------------ */

export type StateFaktorK5B2C = {
  susun: { data: number; baris: number; ditemukan: number[] };
  pasangan: { data: number; a: number; pasang: [number, number][]; selesai: boolean };
  tanda: { data: number; tanda: number[] };
  pernah: string[];
  pesan: string;
};

export type AksiFaktorK5B2C =
  | { t: "S_DATA"; i: number }
  | { t: "S_NAIK" }
  | { t: "S_TURUN" }
  | { t: "S_SIMPAN" }
  | { t: "S_BERSIH" }
  | { t: "P_DATA"; i: number }
  | { t: "P_JAWAB"; nilai: number }
  | { t: "P_ULANG" }
  | { t: "T_DATA"; i: number }
  | { t: "T_KLIK"; n: number }
  | { t: "T_BERSIH" }
  | { t: "T_CEK" }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalFaktorK5B2C = (): StateFaktorK5B2C => ({
  susun: { data: 0, baris: 1, ditemukan: [] },
  pasangan: { data: 0, a: 1, pasang: [], selesai: false },
  tanda: { data: 0, tanda: [] },
  pernah: [],
  pesan: "",
});

const tambah = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

export const bilSusun = (x: StateFaktorK5B2C): number => DATA_SUSUN[x.susun.data];
export const bilPasangan = (x: StateFaktorK5B2C): number => DATA_PASANGAN[x.pasangan.data];
export const bilTanda = (x: StateFaktorK5B2C): number => DATA_TANDA[x.tanda.data];
/** Susunan sekarang: tiap baris berisi q titik, r titik sisa. */
export const bagiSusun = (x: StateFaktorK5B2C): { q: number; r: number } => {
  const n = bilSusun(x);
  return { q: Math.floor(n / x.susun.baris), r: n % x.susun.baris };
};
export const faktorPasangan = (x: StateFaktorK5B2C): number[] => [...new Set(x.pasangan.pasang.flatMap(([a, b]) => [a, b]))].sort((p, q) => p - q);

function simpanSusun(x: StateFaktorK5B2C): StateFaktorK5B2C {
  const n = bilSusun(x);
  const r = x.susun.baris;
  const { q, r: sisa } = bagiSusun(x);
  if (sisa > 0) {
    return {
      ...x,
      pernah: tambah(x.pernah, `gagal:${n}:${r}`),
      pesan: `${n} titik dalam ${r} baris tidak rata: tiap baris ${q} titik dan ada ${sisa} titik sisa. Jadi ${r} bukan faktor ${n}.`,
    };
  }
  if (x.susun.ditemukan.includes(r)) return { ...x, pesan: `Susunan ${r} baris sudah kamu simpan. Coba banyak baris yang lain.` };
  const ditemukan = [...x.susun.ditemukan, r].sort((p, s) => p - s);
  const semua = daftarFaktor(n);
  const baru = { ...x, susun: { ...x.susun, ditemukan } };
  if (ditemukan.length === semua.length) {
    return { ...baru, pernah: tambah(baru.pernah, `susun:${n}`), pesan: `✅ ${r} baris, ${q} titik tiap baris. Semua susunan penuh sudah ditemukan, faktor ${n}: ${semua.join(", ")}.` };
  }
  return { ...baru, pesan: `✅ ${r} baris, ${q} titik tiap baris, semua titik terpakai tanpa sisa. ${r} adalah faktor ${n}.` };
}

function jawabPasangan(x: StateFaktorK5B2C, nilai: number): StateFaktorK5B2C {
  const n = bilPasangan(x);
  const a = x.pasangan.a;
  if (x.pasangan.selesai) return { ...x, pesan: "Pasangan sudah lengkap. Tekan Mulai lagi untuk mencoba lagi." };
  if (!opsiPasangan(n, a).includes(nilai)) return x;
  const faktor = n % a === 0;
  const b = n / a;
  if (faktor && nilai === 0) return { ...x, pesan: `${a} membagi ${n} tanpa sisa: ${a} × ${b} = ${n}. Jadi ${a} adalah faktor.` };
  if (nilai !== 0 && !(faktor && nilai === b)) {
    const akhir = faktor ? "" : " Tidak ada pasangan yang tepat.";
    return { ...x, pesan: `Belum. ${a} dikali ${nilai} sama dengan ${a * nilai}, bukan ${n}.${akhir}` };
  }
  const pasang: [number, number][] = faktor ? [...x.pasangan.pasang, [a, b]] : x.pasangan.pasang;
  const berikut = a + 1;
  const selesai = berikut * berikut > n;
  const awal = faktor
    ? a === b
      ? `✅ ${a} × ${a} = ${n}. Jadi ${a} faktor ${n}, pasangannya dirinya sendiri.`
      : `✅ ${a} × ${b} = ${n}. Jadi ${a} dan ${b} faktor ${n}.`
    : `✅ ${n} dibagi ${a} bersisa ${n % a}, jadi ${a} bukan faktor ${n}.`;
  const baru: StateFaktorK5B2C = { ...x, pasangan: { ...x.pasangan, a: berikut, pasang, selesai } };
  if (!selesai) return { ...baru, pesan: awal };
  const semua = faktorPasangan(baru);
  return {
    ...baru,
    pernah: tambah(baru.pernah, `pasangan:${n}`),
    pesan: `${awal} Kandidat berikutnya, ${berikut}, dikali dirinya sendiri sudah lebih dari ${n}. Pasangan bertemu di tengah. Faktor ${n}: ${semua.join(", ")}.`,
  };
}

function cekTanda(x: StateFaktorK5B2C): StateFaktorK5B2C {
  const n = bilTanda(x);
  const kunci = daftarFaktor(n);
  const tanda = x.tanda.tanda;
  if (tanda.length === 0) return { ...x, pesan: "Belum ada bilangan yang ditandai. Ketuk bilangan yang membagi habis, lalu periksa." };
  const lebih = tanda.filter((v) => !kunci.includes(v));
  const kurang = kunci.filter((v) => !tanda.includes(v));
  if (lebih.length > 0) {
    const e = lebih[0];
    return { ...x, pesan: `${e} bukan faktor ${n}: ${n} dibagi ${e} bersisa ${n % e}.` };
  }
  if (kurang.length > 0) {
    const m = kurang[0];
    if (m === 1) return { ...x, pesan: `Ada faktor yang terlewat. 1 selalu faktor, sebab ${n} dibagi 1 tidak bersisa.` };
    if (m === n) return { ...x, pesan: `Ada faktor yang terlewat. ${n} juga faktor ${n}, sebab bilangan itu dibagi dirinya sendiri tidak bersisa.` };
    return { ...x, pesan: `Masih ada faktor ${n} yang terlewat, misalnya ${m}. Coba bagi ${n} dengan ${m}.` };
  }
  return { ...x, pernah: tambah(x.pernah, `cek:${n}`), pesan: `✅ Tepat! Faktor ${n} ada ${kunci.length}: ${kunci.join(", ")}.` };
}

export function langkahFaktorK5B2C(x: StateFaktorK5B2C, a: AksiFaktorK5B2C): StateFaktorK5B2C {
  switch (a.t) {
    case "S_DATA":
      return sah(a.i, DATA_SUSUN.length) ? { ...x, susun: { data: a.i, baris: 1, ditemukan: [] }, pesan: "" } : x;
    case "S_NAIK": {
      const n = bilSusun(x);
      if (x.susun.baris >= n) return { ...x, pesan: `Paling banyak ${n} baris, satu titik tiap baris.` };
      return { ...x, susun: { ...x.susun, baris: x.susun.baris + 1 }, pesan: "" };
    }
    case "S_TURUN":
      return x.susun.baris <= 1 ? x : { ...x, susun: { ...x.susun, baris: x.susun.baris - 1 }, pesan: "" };
    case "S_SIMPAN":
      return simpanSusun(x);
    case "S_BERSIH":
      return { ...x, susun: { ...x.susun, baris: 1, ditemukan: [] }, pesan: "" };
    case "P_DATA":
      return sah(a.i, DATA_PASANGAN.length) ? { ...x, pasangan: { data: a.i, a: 1, pasang: [], selesai: false }, pesan: "" } : x;
    case "P_JAWAB":
      return jawabPasangan(x, a.nilai);
    case "P_ULANG":
      return { ...x, pasangan: { ...x.pasangan, a: 1, pasang: [], selesai: false }, pesan: "" };
    case "T_DATA":
      return sah(a.i, DATA_TANDA.length) ? { ...x, tanda: { data: a.i, tanda: [] }, pesan: "" } : x;
    case "T_KLIK": {
      const n = bilTanda(x);
      if (!Number.isInteger(a.n) || a.n < 1 || a.n > n) return x;
      const ada = x.tanda.tanda.includes(a.n);
      const tanda = ada ? x.tanda.tanda.filter((v) => v !== a.n) : [...x.tanda.tanda, a.n].sort((p, q) => p - q);
      return { ...x, tanda: { ...x.tanda, tanda }, pesan: "" };
    }
    case "T_BERSIH":
      return { ...x, tanda: { ...x.tanda, tanda: [] }, pesan: "" };
    case "T_CEK":
      return cekTanda(x);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalFaktorK5B2C();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanFaktorK5B2C = { alat: "faktor"; pernah: string[] };
export const keadaanFaktorK5B2C = (x: StateFaktorK5B2C): KeadaanFaktorK5B2C => ({ alat: "faktor", pernah: x.pernah });

export const ucapSusunK5B2C = (x: StateFaktorK5B2C): string =>
  `Susun ${bilSusun(x)} titik dalam baris yang sama banyak. Sekarang ${x.susun.baris} baris. Simpan susunan yang semua titiknya terpakai tanpa sisa. Sudah tersimpan ${x.susun.ditemukan.length} susunan.`;
export const ucapPasanganK5B2C = (x: StateFaktorK5B2C): string =>
  `Cari pasangan faktor ${bilPasangan(x)}. Kandidat sekarang ${x.pasangan.a}. Pilih pasangannya, atau pilih bukan faktor.`;
export const ucapTandaK5B2C = (x: StateFaktorK5B2C): string =>
  `Ketuk semua faktor ${bilTanda(x)}, yaitu bilangan yang membagi ${bilTanda(x)} tanpa sisa. Sekarang ada ${x.tanda.tanda.length} bilangan yang ditandai. Lalu periksa.`;
