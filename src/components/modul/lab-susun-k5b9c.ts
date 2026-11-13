/**
 * Lab Susun (Kelas 5 Bab 9, Sub-Bab C: Komposisi dan Dekomposisi Bilangan sampai 1.000.000): logika murni.
 * Satu alat, tiga tampilan.
 *  Susun    : bagian nilai tempat diberikan (tempat kosong tidak disebut), disusun menjadi bilangan utuh; nol tetap ditulis
 *             (Expanded Form Composition dan Part-Whole Place Model).
 *  Urai     : bilangan utuh diuraikan menjadi jumlah nilai tempat; jumlahnya harus kembali ke bilangan awal (cek balik susun dan urai).
 *  Cara Lain: satu satuan tempat bisa dipecah menjadi sepuluh satuan tempat di kanannya (dan digabung kembali) tanpa mengubah total
 *             (Flexible Decomposition); menambah isi kolom begitu saja mengubah total dan ditolak.
 * Memakai nilai tempat dari Sub-Bab A dan membandingkan dari Sub-Bab B hanya sebagai bahan cek. Murni: tanpa React, tanpa jaringan, tanpa impor.
 * Diuji di scripts/uji-lab-k5b9.mjs.
 */

export const BANYAK_KOLOM = 6;
export const NAMA_TEMPAT = ["ratus ribuan", "puluh ribuan", "ribuan", "ratusan", "puluhan", "satuan"] as const;
export const NILAI_TEMPAT = [100000, 10000, 1000, 100, 10, 1] as const;

export type BilanganC = {
  nama: string;
  n: number;
  /** Kolom yang dipecah di Cara Lain: berisi sedikitnya satu dan bukan satuan. */
  kolomPecah: number;
};

export const BILANGAN_C: BilanganC[] = [
  { nama: "harga komputer", n: 327100, kolomPecah: 0 },
  { nama: "harga sepeda", n: 203305, kolomPecah: 2 },
  { nama: "harga mesin cuci", n: 505401, kolomPecah: 3 },
  { nama: "harga lemari es", n: 857259, kolomPecah: 1 },
  { nama: "harga televisi besar", n: 599198, kolomPecah: 0 },
  { nama: "harga kulkas kecil", n: 640030, kolomPecah: 4 },
];

export const idSusun = (i: number): string => `susun:${i}`;
export const idUrai = (i: number): string => `urai:${i}`;
export const idCara = (i: number): string => `cara:${i}`;
export const idTolak = (i: number): string => `tolak:${i}`;

const catat = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

/* ------------------------------ Hitungan murni ------------------------------ */

export const titikRibuan = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
export const digitEnam = (n: number): number[] => String(n).padStart(BANYAK_KOLOM, "0").split("").map(Number);
/** Bagian nilai tempat yang disebut (tempat kosong tidak disebut), misalnya "3 ratus ribuan". */
export const bagianDisebut = (n: number): string[] => digitEnam(n).flatMap((d, k) => (d > 0 ? [`${d} ${NAMA_TEMPAT[k]}`] : []));
/** Nilai tiap bagian yang tidak nol, misalnya [300000, 20000, 7000, 100]. */
export const nilaiBagian = (n: number): number[] => digitEnam(n).flatMap((d, k) => (d > 0 ? [d * NILAI_TEMPAT[k]] : []));
export const jumlahKolom = (d: readonly number[]): number => d.reduce((a, v, k) => a + v * NILAI_TEMPAT[k], 0);
/** Jumlah isi kolom dengan banyaknya c tiap tempat. Sama dengan jumlahKolom. */
export const totalIsi = (c: readonly number[]): number => c.reduce((a, v, k) => a + v * NILAI_TEMPAT[k], 0);

/* ------------------------------ Keadaan ------------------------------ */

export type StateSusunK5B9C = {
  susun: { data: number; d: number[] };
  urai: { data: number; d: number[] };
  cara: { data: number; c: number[] };
  pernah: string[];
  pesan: string;
};

export type AksiSusunK5B9C =
  | { t: "S_DATA"; i: number }
  | { t: "S_UBAH"; k: number; delta: number }
  | { t: "S_PERIKSA" }
  | { t: "U_DATA"; i: number }
  | { t: "U_UBAH"; k: number; delta: number }
  | { t: "U_PERIKSA" }
  | { t: "K_DATA"; i: number }
  | { t: "K_PECAH"; k: number }
  | { t: "K_GABUNG"; k: number }
  | { t: "K_TAMBAH"; k: number }
  | { t: "K_ULANG" }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

const kosong = (): number[] => [-1, -1, -1, -1, -1, -1];
const nolSemua = (): number[] => [0, 0, 0, 0, 0, 0];

export const awalSusunK5B9C = (): StateSusunK5B9C => ({
  susun: { data: 0, d: kosong() },
  urai: { data: 0, d: nolSemua() },
  cara: { data: 0, c: digitEnam(BILANGAN_C[0].n) },
  pernah: [],
  pesan: "",
});

export const bilSusun = (x: StateSusunK5B9C): BilanganC => BILANGAN_C[x.susun.data];
export const bilUrai = (x: StateSusunK5B9C): BilanganC => BILANGAN_C[x.urai.data];
export const bilCara = (x: StateSusunK5B9C): BilanganC => BILANGAN_C[x.cara.data];

/** Angka kolom naik atau turun satu. Dari kosong: naik menjadi 0, turun menjadi 9. */
const geserDigit = (v: number, delta: number): number => (v === -1 ? (delta > 0 ? 0 : 9) : (v + delta + 10) % 10);

function ubahSusun(x: StateSusunK5B9C, k: number, delta: number): StateSusunK5B9C {
  if (!sah(k, BANYAK_KOLOM) || (delta !== 1 && delta !== -1)) return x;
  return { ...x, susun: { ...x.susun, d: x.susun.d.map((v, j) => (j === k ? geserDigit(v, delta) : v)) }, pesan: "" };
}

function periksaSusun(x: StateSusunK5B9C): StateSusunK5B9C {
  const i = x.susun.data;
  const b = BILANGAN_C[i];
  const benar = digitEnam(b.n);
  const d = x.susun.d;
  if (d.some((v) => v < 0)) return { ...x, pesan: "Masih ada kolom kosong. Tempat yang tidak disebut diisi 0, jangan dibiarkan kosong." };
  const beda = d.flatMap((v, k) => (v !== benar[k] ? [k] : []));
  if (beda.length === 0) {
    return { ...x, pernah: catat(x.pernah, idSusun(i)), pesan: `✅ ${nilaiBagian(b.n).map(titikRibuan).join(" + ")} = ${titikRibuan(b.n)}. Nol di tempat yang tidak disebut tetap ditulis supaya angka lain tidak bergeser.` };
  }
  const tanpaNol = (a: readonly number[]): string => a.filter((v) => v !== 0).join("");
  if (tanpaNol(d) === tanpaNol(benar)) {
    return { ...x, pesan: "Angkanya sudah benar tetapi letaknya bergeser. Tempat yang tidak disebut harus diisi 0, supaya tiap angka tepat di tempatnya." };
  }
  return { ...x, pesan: `Kolom ${NAMA_TEMPAT[beda[0]]} belum tepat. Cocokkan dengan bagian yang disebut: ${bagianDisebut(b.n).join(", ")}.` };
}

function ubahUrai(x: StateSusunK5B9C, k: number, delta: number): StateSusunK5B9C {
  if (!sah(k, BANYAK_KOLOM) || (delta !== 1 && delta !== -1)) return x;
  return { ...x, urai: { ...x.urai, d: x.urai.d.map((v, j) => (j === k ? (v + delta + 10) % 10 : v)) }, pesan: "" };
}

function periksaUrai(x: StateSusunK5B9C): StateSusunK5B9C {
  const i = x.urai.data;
  const b = BILANGAN_C[i];
  const jumlah = jumlahKolom(x.urai.d);
  if (jumlah === b.n) {
    return { ...x, pernah: catat(x.pernah, idUrai(i)), pesan: `✅ ${nilaiBagian(b.n).map(titikRibuan).join(" + ")} = ${titikRibuan(b.n)}. Dijumlahkan kembali hasilnya sama dengan bilangan awal, jadi uraiannya benar.` };
  }
  const kurang = jumlah < b.n;
  return { ...x, pesan: `Jumlah uraianmu ${titikRibuan(jumlah)}, ${kurang ? "kurang" : "lebih"} ${titikRibuan(Math.abs(b.n - jumlah))} dari ${titikRibuan(b.n)}. Uraian harus dijumlahkan kembali menjadi bilangan awal.` };
}

function pecah(x: StateSusunK5B9C, k: number): StateSusunK5B9C {
  if (!sah(k, BANYAK_KOLOM - 1)) return x;
  const i = x.cara.data;
  const c = x.cara.c;
  if (c[k] < 1) return { ...x, pesan: `Tidak ada isi di kolom ${NAMA_TEMPAT[k]} yang bisa dipecah.` };
  const baru = c.map((v, j) => (j === k ? v - 1 : j === k + 1 ? v + 10 : v));
  const total = titikRibuan(totalIsi(baru));
  let pernah = x.pernah;
  let pesan = `✅ 1 ${NAMA_TEMPAT[k]} = 10 ${NAMA_TEMPAT[k + 1]}. Total tetap ${total}.`;
  if (k === BILANGAN_C[i].kolomPecah) {
    pernah = catat(pernah, idCara(i));
    pesan += " Cara lain menguraikan bilangan yang sama sudah ketemu.";
  }
  return { ...x, cara: { ...x.cara, c: baru }, pernah, pesan };
}

function gabung(x: StateSusunK5B9C, k: number): StateSusunK5B9C {
  if (!sah(k, BANYAK_KOLOM - 1)) return x;
  const c = x.cara.c;
  if (c[k + 1] < 10) return { ...x, pesan: `Kolom ${NAMA_TEMPAT[k + 1]} belum punya sepuluh untuk digabung menjadi 1 ${NAMA_TEMPAT[k]}.` };
  const baru = c.map((v, j) => (j === k ? v + 1 : j === k + 1 ? v - 10 : v));
  return { ...x, cara: { ...x.cara, c: baru }, pesan: `✅ 10 ${NAMA_TEMPAT[k + 1]} = 1 ${NAMA_TEMPAT[k]}. Total tetap ${titikRibuan(totalIsi(baru))}.` };
}

function tambah(x: StateSusunK5B9C, k: number): StateSusunK5B9C {
  if (!sah(k, BANYAK_KOLOM)) return x;
  const i = x.cara.data;
  const baru = x.cara.c.map((v, j) => (j === k ? v + 1 : v));
  return {
    ...x,
    pernah: catat(x.pernah, idTolak(i)),
    pesan: `Ditolak. Menambah 1 ${NAMA_TEMPAT[k]} saja membuat total menjadi ${titikRibuan(totalIsi(baru))}, padahal bilangannya ${titikRibuan(BILANGAN_C[i].n)}. Cara lain harus menjaga total tetap sama.`,
  };
}

export function langkahSusunK5B9C(x: StateSusunK5B9C, a: AksiSusunK5B9C): StateSusunK5B9C {
  switch (a.t) {
    case "S_DATA":
      return sah(a.i, BILANGAN_C.length) ? { ...x, susun: { data: a.i, d: kosong() }, pesan: "" } : x;
    case "S_UBAH":
      return ubahSusun(x, a.k, a.delta);
    case "S_PERIKSA":
      return periksaSusun(x);
    case "U_DATA":
      return sah(a.i, BILANGAN_C.length) ? { ...x, urai: { data: a.i, d: nolSemua() }, pesan: "" } : x;
    case "U_UBAH":
      return ubahUrai(x, a.k, a.delta);
    case "U_PERIKSA":
      return periksaUrai(x);
    case "K_DATA":
      return sah(a.i, BILANGAN_C.length) ? { ...x, cara: { data: a.i, c: digitEnam(BILANGAN_C[a.i].n) }, pesan: "" } : x;
    case "K_PECAH":
      return pecah(x, a.k);
    case "K_GABUNG":
      return gabung(x, a.k);
    case "K_TAMBAH":
      return tambah(x, a.k);
    case "K_ULANG":
      return { ...x, cara: { ...x.cara, c: digitEnam(BILANGAN_C[x.cara.data].n) }, pesan: "" };
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalSusunK5B9C();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanSusunK5B9C = { alat: "susun"; pernah: string[] };
export const keadaanSusunK5B9C = (x: StateSusunK5B9C): KeadaanSusunK5B9C => ({ alat: "susun", pernah: x.pernah });

export const ucapSusunK5B9C = (x: StateSusunK5B9C): string => {
  const b = bilSusun(x);
  return `${b.nama}: ${bagianDisebut(b.n).join(", ")}. Susun bagian ini menjadi satu bilangan. Tempat yang tidak disebut tetap diisi nol.`;
};
export const ucapUraiK5B9C = (x: StateSusunK5B9C): string => {
  const b = bilUrai(x);
  return `${b.nama}: ${titikRibuan(b.n)}. Uraikan menjadi jumlah nilai tiap tempat. Jumlahnya harus kembali menjadi ${titikRibuan(b.n)}.`;
};
export const ucapCaraK5B9C = (x: StateSusunK5B9C): string => {
  const b = bilCara(x);
  return `${b.nama}: ${titikRibuan(b.n)}. Satu satuan tempat bisa dipecah menjadi sepuluh satuan tempat di kanannya, dan totalnya tetap sama. Pecah isi kolom ${NAMA_TEMPAT[b.kolomPecah]} untuk menemukan cara lain.`;
};
