/**
 * Lab Susun Bilangan (Kelas 5 Bab 1, Sub-Bab C): logika murni. Satu alat, tiga tampilan.
 *  Urai  : bilangan diuraikan menjadi suku nilai tempat. Anak memilih kartu suku dari tumpukan yang memuat suku benar
 *          dan pengecoh (digit saja, nilai di tempat tetangga). Lab menyebut jumlah suku pilihan anak, dihitung dari
 *          kartu yang dipilih, dan menjelaskan nol yang tidak jadi suku tetapi tempatnya tetap ada.
 *  Susun : anak menyusun bilangan dari kartu 10.000, 1.000, 100, 10, dan 1. Banyak susunan yang sah; lab menolak bila
 *          jumlah kartu tidak sama dengan bilangan yang diminta dan mencatat banyak kartu 10.000 yang dipakai.
 *  Tukar : sepuluh kartu di satu tempat ditukar satu kartu di tempat kirinya, dan sebaliknya. Jumlah tidak berubah.
 * Data dari Buku Siswa Kelas V Bab 1 (sama dengan data-k5b1.ts dan naskah, dicocokkan di uji). Semua bilangan bulat.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k5b1.mjs.
 */

export const NILAI_KARTU = [10000, 1000, 100, 10, 1];
export const NAMA_KARTU = ["10.000", "1.000", "100", "10", "1"];
export const MAKS_KARTU = 100;
export const MAKS_JUMLAH = 100000;

export const titik = (n: number): string => (n >= 1000 ? `${Math.floor(n / 1000)}.${String(n % 1000).padStart(3, "0")}` : String(n));
export const jumlahKartu = (k: number[]): number => k.reduce((a, v, i) => a + v * NILAI_KARTU[i], 0);
/** Suku nilai tempat tiap digit yang bukan nol, dari kiri. */
export const sukuBenar = (n: number): number[] => NILAI_KARTU.map((b) => (Math.floor(n / b) % 10) * b).filter((v) => v > 0);
export const teksKartu = (k: number[]): string =>
  k
    .map((v, i) => (v > 0 ? `${v} kartu ${NAMA_KARTU[i]}` : ""))
    .filter(Boolean)
    .join(", ");

/* ------------------------------ Data buku ------------------------------ */

export type DataUrai = { n: number; ket: string; pengecoh: number[] };
export const DATA_URAI: DataUrai[] = [
  { n: 52307, ket: "Contoh buku", pengecoh: [5, 20000, 30] },
  { n: 70080, ket: "Nol di tengah", pengecoh: [8, 7000, 800] },
  { n: 38600, ket: "Uang Asep", pengecoh: [3, 80000, 60] },
  { n: 14500, ket: "Tulisan Yohana", pengecoh: [1, 40000, 50] },
];
/** Kartu suku yang tampil: suku benar dan pengecoh, diacak dengan urutan tetap. */
export const poolUrai = (i: number): number[] => {
  const d = DATA_URAI[i];
  return [...sukuBenar(d.n), ...d.pengecoh].sort((a, b) => ((a * 7919) % 1013) - ((b * 7919) % 1013) || a - b);
};

export type DataSusun = { n: number; ket: string };
export const DATA_SUSUN: DataSusun[] = [
  { n: 38600, ket: "Uang Asep" },
  { n: 45600, ket: "Uang Komang" },
  { n: 66600, ket: "Kartu campur" },
];

export type DataTukar = { n: number; ket: string; awal: number[] };
export const DATA_TUKAR: DataTukar[] = [
  { n: 45600, ket: "Uang Komang", awal: [4, 5, 6, 0, 0] },
  { n: 1400, ket: "Seribu empat ratus", awal: [0, 1, 4, 0, 0] },
];

/* ------------------------------ Keadaan ------------------------------ */

export type StateSusunK5B1C = {
  urai: { data: number; pilih: number[] };
  susun: { data: number; kartu: number[] };
  tukar: { data: number; kartu: number[] };
  pernah: string[];
  pesan: string;
};

export type AksiSusunK5B1C =
  | { t: "U_DATA"; i: number }
  | { t: "U_TOGGLE"; v: number }
  | { t: "U_ULANG" }
  | { t: "U_CEK" }
  | { t: "S_DATA"; i: number }
  | { t: "S_TAMBAH"; k: number }
  | { t: "S_KURANG"; k: number }
  | { t: "S_ULANG" }
  | { t: "S_CEK" }
  | { t: "X_DATA"; i: number }
  | { t: "X_PECAH"; k: number }
  | { t: "X_GABUNG"; k: number }
  | { t: "X_ULANG" }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

const nol = (): number[] => NILAI_KARTU.map(() => 0);

export const awalSusunK5B1C = (): StateSusunK5B1C => ({
  urai: { data: 0, pilih: [] },
  susun: { data: 0, kartu: nol() },
  tukar: { data: 0, kartu: [...DATA_TUKAR[0].awal] },
  pernah: [],
  pesan: "",
});

const tambah = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;
const jumlah = (a: number[]): number => a.reduce((s, v) => s + v, 0);

export const dataUrai = (x: StateSusunK5B1C): DataUrai => DATA_URAI[x.urai.data];
export const dataSusun = (x: StateSusunK5B1C): DataSusun => DATA_SUSUN[x.susun.data];
export const dataTukar = (x: StateSusunK5B1C): DataTukar => DATA_TUKAR[x.tukar.data];

function cekUrai(x: StateSusunK5B1C): StateSusunK5B1C {
  const d = dataUrai(x);
  const benar = sukuBenar(d.n);
  const pilih = x.urai.pilih;
  if (pilih.length === 0) return { ...x, pesan: "Belum ada suku yang dipilih. Ketuk kartu suku dulu, lalu periksa." };
  const sama = pilih.length === benar.length && benar.every((v) => pilih.includes(v));
  if (sama) {
    const nolTengah = String(d.n).includes("0") ? ` Nol tidak jadi suku, tetapi tempatnya tetap ada di ${titik(d.n)}.` : "";
    return { ...x, pernah: tambah(x.pernah, `urai:${d.n}`), pesan: `✅ Tepat! ${titik(d.n)} = ${benar.map(titik).join(" + ")}.${nolTengah}` };
  }
  const salahTempat = d.n === 70080 && pilih.length === 2 && pilih.includes(70000) && pilih.includes(8);
  const pernah = salahTempat ? tambah(x.pernah, "urai-70000+8") : x.pernah;
  const total = jumlah(pilih);
  if (salahTempat) return { ...x, pernah, pesan: `Jumlah sukumu ${titik(total)}, belum ${titik(d.n)}. Digit 8 ada di tempat puluhan, jadi sukunya 80, bukan 8.` };
  if (total === d.n) return { ...x, pesan: "Jumlahnya cocok, tetapi suku-sukunya bukan nilai tempat tiap digit. Pakai digit dikali nilai tempatnya." };
  const digitSaja = pilih.find((v) => v < 10 && !benar.includes(v));
  if (digitSaja !== undefined) return { ...x, pesan: `Jumlah sukumu ${titik(total)}, belum ${titik(d.n)}. ${digitSaja} itu digitnya saja. Suku harus memakai nilai tempatnya.` };
  const lebih = pilih.some((v) => !benar.includes(v));
  if (lebih) return { ...x, pesan: `Jumlah sukumu ${titik(total)}, belum ${titik(d.n)}. Ada suku yang bukan nilai tempat digitnya. Periksa tempat tiap digit.` };
  return { ...x, pesan: `Masih ${benar.length - pilih.length} suku belum dipilih. Tiap digit yang bukan nol punya satu suku.` };
}

function cekSusun(x: StateSusunK5B1C): StateSusunK5B1C {
  const d = dataSusun(x);
  const k = x.susun.kartu;
  const total = jumlahKartu(k);
  if (total === 0) return { ...x, pesan: "Belum ada kartu. Tambah kartu dulu, lalu periksa." };
  if (total !== d.n) {
    const sisaTeks = total < d.n ? `Masih kurang ${titik(d.n - total)}.` : `Sudah kelebihan ${titik(total - d.n)}.`;
    return { ...x, pesan: `Jumlah kartumu ${titik(total)}, belum ${titik(d.n)}. ${sisaTeks}` };
  }
  let pernah = tambah(x.pernah, `susun:${d.n}`);
  if (d.n === 45600) pernah = tambah(pernah, `susun:45600:p${k[0]}`);
  if (d.n === 66600 && k.join("-") === "5-15-16-0-0") pernah = tambah(pernah, "susun:66600:5-15-16");
  return { ...x, pernah, pesan: `✅ Tepat! ${teksKartu(k)} jumlahnya ${titik(d.n)}. Masih ada cara lain untuk jumlah yang sama.` };
}

function pecah(x: StateSusunK5B1C, k: number): StateSusunK5B1C {
  if (!sah(k, 4)) return x;
  const a = x.tukar.kartu;
  if (a[k] === 0) return { ...x, pesan: `Tidak ada kartu ${NAMA_KARTU[k]} yang bisa ditukar.` };
  if (a[k + 1] + 10 > MAKS_KARTU) return { ...x, pesan: `Kartu ${NAMA_KARTU[k + 1]} akan lebih dari ${MAKS_KARTU}. Tukar sebagian dulu.` };
  return selesaiTukar(x, a.map((v, i) => (i === k ? v - 1 : i === k + 1 ? v + 10 : v)), `1 kartu ${NAMA_KARTU[k]} ditukar 10 kartu ${NAMA_KARTU[k + 1]}.`);
}

function gabung(x: StateSusunK5B1C, k: number): StateSusunK5B1C {
  if (!sah(k, 4)) return x;
  const a = x.tukar.kartu;
  if (a[k + 1] < 10) return { ...x, pesan: `Perlu 10 kartu ${NAMA_KARTU[k + 1]} untuk ditukar 1 kartu ${NAMA_KARTU[k]}.` };
  if (a[k] + 1 > MAKS_KARTU) return { ...x, pesan: `Kartu ${NAMA_KARTU[k]} akan lebih dari ${MAKS_KARTU}.` };
  return selesaiTukar(x, a.map((v, i) => (i === k ? v + 1 : i === k + 1 ? v - 10 : v)), `10 kartu ${NAMA_KARTU[k + 1]} ditukar 1 kartu ${NAMA_KARTU[k]}.`);
}

function selesaiTukar(x: StateSusunK5B1C, kartu: number[], apa: string): StateSusunK5B1C {
  const d = dataTukar(x);
  const pernah = d.n === 1400 && kartu.join("-") === "0-0-14-0-0" ? tambah(x.pernah, "tukar:1400:14") : x.pernah;
  return { ...x, tukar: { ...x.tukar, kartu }, pernah, pesan: `✅ ${apa} Jumlah tetap ${titik(jumlahKartu(kartu))}.` };
}

export function langkahSusunK5B1C(x: StateSusunK5B1C, a: AksiSusunK5B1C): StateSusunK5B1C {
  switch (a.t) {
    case "U_DATA":
      return sah(a.i, DATA_URAI.length) ? { ...x, urai: { data: a.i, pilih: [] }, pesan: "" } : x;
    case "U_TOGGLE": {
      if (!poolUrai(x.urai.data).includes(a.v)) return x;
      const pilih = x.urai.pilih.includes(a.v) ? x.urai.pilih.filter((v) => v !== a.v) : [...x.urai.pilih, a.v];
      return { ...x, urai: { ...x.urai, pilih }, pesan: "" };
    }
    case "U_ULANG":
      return { ...x, urai: { ...x.urai, pilih: [] }, pesan: "" };
    case "U_CEK":
      return cekUrai(x);
    case "S_DATA":
      return sah(a.i, DATA_SUSUN.length) ? { ...x, susun: { data: a.i, kartu: nol() }, pesan: "" } : x;
    case "S_TAMBAH": {
      if (!sah(a.k, 5)) return x;
      if (x.susun.kartu[a.k] >= MAKS_KARTU) return { ...x, pesan: `Satu jenis kartu paling banyak ${MAKS_KARTU}. Tukar sepuluh kartu dengan satu kartu di kirinya.` };
      if (jumlahKartu(x.susun.kartu) + NILAI_KARTU[a.k] > MAKS_JUMLAH) return { ...x, pesan: "Jumlah kartu di bab ini paling besar 100.000." };
      return { ...x, susun: { ...x.susun, kartu: x.susun.kartu.map((v, i) => (i === a.k ? v + 1 : v)) }, pesan: "" };
    }
    case "S_KURANG":
      if (!sah(a.k, 5) || x.susun.kartu[a.k] === 0) return x;
      return { ...x, susun: { ...x.susun, kartu: x.susun.kartu.map((v, i) => (i === a.k ? v - 1 : v)) }, pesan: "" };
    case "S_ULANG":
      return { ...x, susun: { ...x.susun, kartu: nol() }, pesan: "" };
    case "S_CEK":
      return cekSusun(x);
    case "X_DATA":
      return sah(a.i, DATA_TUKAR.length) ? { ...x, tukar: { data: a.i, kartu: [...DATA_TUKAR[a.i].awal] }, pesan: "" } : x;
    case "X_PECAH":
      return pecah(x, a.k);
    case "X_GABUNG":
      return gabung(x, a.k);
    case "X_ULANG":
      return { ...x, tukar: { ...x.tukar, kartu: [...dataTukar(x).awal] }, pesan: "" };
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalSusunK5B1C();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanSusunK5B1C = { alat: "susun"; pernah: string[] };
export const keadaanSusunK5B1C = (x: StateSusunK5B1C): KeadaanSusunK5B1C => ({ alat: "susun", pernah: x.pernah });

export const ucapUraiK5B1C = (x: StateSusunK5B1C): string => {
  const d = dataUrai(x);
  return `Uraikan ${titik(d.n)} menjadi suku nilai tempat. Ketuk kartu suku yang tepat, satu suku untuk tiap digit yang bukan nol, lalu periksa. Sudah ${x.urai.pilih.length} suku dipilih.`;
};
export const ucapSusunK5B1C = (x: StateSusunK5B1C): string => {
  const d = dataSusun(x);
  return `Susun ${titik(d.n)} dari kartu. Jumlah kartu sekarang ${titik(jumlahKartu(x.susun.kartu))}. Banyak susunan yang boleh, asal jumlahnya tepat. Lalu periksa.`;
};
export const ucapTukarK5B1C = (x: StateSusunK5B1C): string => {
  const d = dataTukar(x);
  return `Tukar kartu untuk ${titik(d.n)}. Sepuluh kartu di satu tempat sama dengan satu kartu di tempat kirinya. Jumlah sekarang ${titik(jumlahKartu(x.tukar.kartu))}, tidak berubah saat ditukar.`;
};
