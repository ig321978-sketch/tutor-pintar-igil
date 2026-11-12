/**
 * Lab Senilai (Kelas 4 Bab 2, Sub-Bab C: Pecahan Senilai): logika murni. Satu alat, tiga tampilan.
 *  Model     : batang pecahan awal a0/b0 dan pecahan sekarang a/b berdampingan. "Senilai" DIHITUNG dengan perkalian
 *              silang (a × b0 sama dengan a0 × b), yang berarti daerah arsirnya sama luas.
 *  Ubah      : kalikan atau bagi pembilang dan penyebut dengan bilangan yang sama (senilai). Mengubah pembilang saja
 *              atau penyebut saja dicoba, dan lab menunjukkan bahwa hasilnya tidak senilai.
 *  Sederhana : bagi pembilang dan penyebut dengan FPB (dihitung dengan algoritma Euclid) sampai paling sederhana.
 * Pecahan desimal dan persen baru dipakai di sub-bab berikutnya.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k4b2.mjs.
 */

export const MAKS_PENYEBUT_C = 24;
export const MAKS_KALI = 8;

/** Pecahan latihan: dari buku (1/3, 2/6, 1/4, 4/16) dan beberapa lain. */
export const SOAL_C: [number, number][] = [
  [1, 3],
  [2, 6],
  [1, 4],
  [1, 2],
  [6, 12],
  [3, 4],
  [4, 16],
];

export function fpbC(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) [x, y] = [y, x % y];
  return x;
}

/** Senilai bila daerah arsir sama luas: a/b = c/d berarti a × d sama dengan c × b. */
export const senilaiC = (a: number, b: number, c: number, d: number): boolean => a * d === c * b;

export const teksC = (a: number, b: number): string => `${a}/${b}`;

/* ------------------------------ Keadaan ------------------------------ */

export type StateSenilaiK4B2C = {
  a0: number;
  b0: number;
  a: number;
  b: number;
  pernah: string[];
  pesan: string;
};

export type AksiSenilaiK4B2C =
  | { t: "SOAL"; i: number }
  | { t: "KALI"; k: number }
  | { t: "BAGI"; k: number }
  | { t: "PEMBILANG"; d: 1 | -1 }
  | { t: "PENYEBUT"; d: 1 | -1 }
  | { t: "SEDERHANA" }
  | { t: "KEMBALI" }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalSenilaiK4B2C = (): StateSenilaiK4B2C => ({ a0: 1, b0: 3, a: 1, b: 3, pernah: [], pesan: "" });

const tambah = (daftar: string[], id: string): string[] => (daftar.includes(id) ? daftar : [...daftar, id]);
export const sama = (x: StateSenilaiK4B2C): boolean => senilaiC(x.a, x.b, x.a0, x.b0);

/** Catat bentuk senilai dengan pecahan awal (selain pecahan awal itu sendiri). */
function catatBentuk(x: StateSenilaiK4B2C): StateSenilaiK4B2C {
  if (!sama(x) || (x.a === x.a0 && x.b === x.b0)) return x;
  return { ...x, pernah: tambah(x.pernah, `bentuk:${teksC(x.a0, x.b0)}:${teksC(x.a, x.b)}`) };
}

export function langkahSenilaiK4B2C(x: StateSenilaiK4B2C, a: AksiSenilaiK4B2C): StateSenilaiK4B2C {
  switch (a.t) {
    case "SOAL":
      if (a.i < 0 || a.i >= SOAL_C.length) return x;
      return { ...x, a0: SOAL_C[a.i][0], b0: SOAL_C[a.i][1], a: SOAL_C[a.i][0], b: SOAL_C[a.i][1], pesan: "" };
    case "KALI": {
      if (a.k < 2 || a.k > MAKS_KALI) return x;
      if (x.b * a.k > MAKS_PENYEBUT_C) return { ...x, pesan: `${x.a}/${x.b} dikali ${a.k} menghasilkan penyebut ${x.b * a.k}. Di lab ini penyebut paling besar ${MAKS_PENYEBUT_C}.` };
      const baru = { ...x, a: x.a * a.k, b: x.b * a.k };
      const p = tambah(x.pernah, `kali:${teksC(x.a, x.b)}:${a.k}`);
      return catatBentuk({ ...baru, pernah: p, pesan: `✅ ${x.a}/${x.b} × ${a.k}/${a.k} = ${baru.a}/${baru.b}. Pembilang dan penyebut sama-sama dikali ${a.k}, jadi senilai.` });
    }
    case "BAGI": {
      if (a.k < 2 || a.k > MAKS_KALI + 4) return x;
      if (x.a % a.k !== 0 || x.b % a.k !== 0) return { ...x, pernah: tambah(x.pernah, "bagi-gagal"), pesan: `${a.k} tidak membagi ${x.a} dan ${x.b} sekaligus. Pembilang dan penyebut harus sama-sama habis dibagi.` };
      const baru = { ...x, a: x.a / a.k, b: x.b / a.k };
      const p = tambah(x.pernah, `bagi:${teksC(x.a, x.b)}:${a.k}`);
      return catatBentuk({ ...baru, pernah: p, pesan: `✅ ${x.a}/${x.b} : ${a.k}/${a.k} = ${baru.a}/${baru.b}. Pembilang dan penyebut sama-sama dibagi ${a.k}, jadi senilai.` });
    }
    case "PEMBILANG": {
      const v = x.a + a.d;
      if (v < 1 || v >= x.b) return { ...x, pesan: `Pembilang 1 sampai ${x.b - 1} (pecahan lebih kecil dari satu).` };
      const sebelum = sama(x);
      const baru = { ...x, a: v };
      const sesudah = sama(baru);
      return {
        ...baru,
        pernah: sebelum && !sesudah ? tambah(x.pernah, "satu-saja") : x.pernah,
        pesan: sesudah ? `✅ ${v}/${x.b} senilai dengan ${teksC(x.a0, x.b0)}.` : `Hanya pembilang yang diubah: ${v}/${x.b} tidak senilai dengan ${teksC(x.a0, x.b0)}. Daerah arsirnya tidak sama luas.`,
      };
    }
    case "PENYEBUT": {
      const v = x.b + a.d;
      if (v < 2 || v > MAKS_PENYEBUT_C) return { ...x, pesan: `Penyebut 2 sampai ${MAKS_PENYEBUT_C}.` };
      if (x.a >= v) return { ...x, pesan: `Pembilang ${x.a} harus lebih kecil dari penyebut.` };
      const sebelum = sama(x);
      const baru = { ...x, b: v };
      const sesudah = sama(baru);
      return {
        ...baru,
        pernah: sebelum && !sesudah ? tambah(x.pernah, "satu-saja") : x.pernah,
        pesan: sesudah ? `✅ ${x.a}/${v} senilai dengan ${teksC(x.a0, x.b0)}.` : `Hanya penyebut yang diubah: ${x.a}/${v} tidak senilai dengan ${teksC(x.a0, x.b0)}. Daerah arsirnya tidak sama luas.`,
      };
    }
    case "SEDERHANA": {
      const g = fpbC(x.a, x.b);
      if (g === 1) return { ...x, pernah: tambah(x.pernah, `sudah-sederhana:${teksC(x.a, x.b)}`), pesan: `✅ FPB ${x.a} dan ${x.b} adalah 1, jadi ${teksC(x.a, x.b)} sudah paling sederhana.` };
      const baru = { ...x, a: x.a / g, b: x.b / g };
      const p = tambah(x.pernah, `sederhana:${teksC(x.a, x.b)}`);
      return catatBentuk({ ...baru, pernah: p, pesan: `✅ FPB ${x.a} dan ${x.b} adalah ${g}. ${x.a}/${x.b} : ${g}/${g} = ${baru.a}/${baru.b}. Paling sederhana.` });
    }
    case "KEMBALI":
      return { ...x, a: x.a0, b: x.b0, pesan: "" };
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalSenilaiK4B2C();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanSenilaiK4B2C = { alat: "senilai"; pernah: string[] };
export const keadaanSenilaiK4B2C = (x: StateSenilaiK4B2C): KeadaanSenilaiK4B2C => ({ alat: "senilai", pernah: x.pernah });

export function ucapModelK4B2C(x: StateSenilaiK4B2C): string {
  return sama(x)
    ? `${teksC(x.a0, x.b0)} dan ${teksC(x.a, x.b)} sama luas, jadi senilai.`
    : `${teksC(x.a0, x.b0)} dan ${teksC(x.a, x.b)} tidak sama luas, jadi tidak senilai.`;
}

export const ucapUbahK4B2C = (x: StateSenilaiK4B2C): string => `Ubah ${teksC(x.a, x.b)}. Kalikan atau bagi pembilang dan penyebut dengan bilangan yang sama.`;
export const ucapSederhanaK4B2C = (x: StateSenilaiK4B2C): string => `FPB ${x.a} dan ${x.b} adalah ${fpbC(x.a, x.b)}. ${fpbC(x.a, x.b) === 1 ? `${teksC(x.a, x.b)} sudah paling sederhana.` : "Bagi pembilang dan penyebut dengan FPB."}`;
