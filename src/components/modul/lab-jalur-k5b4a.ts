/**
 * Lab Jalur (Kelas 5 Bab 4, Sub-Bab A: Apakah Keliling Bangun Datar Itu?): logika murni. Satu alat, tiga tampilan.
 *  Jalan   : anak menelusuri sisi bangun satu per satu dari sudut awal sampai kembali ke sudut awal. Jumlah panjang
 *            yang ditempuh adalah keliling (Path Length).
 *  Pagar   : tanah di kisi petak. Anak memasang ruas pagar tepat di tepi tanah, satu ruas tiap sisi petak di tepi
 *            (Fencing Context). Banyak ruas seluruhnya adalah keliling.
 *  Banding : jalur tepi dibedakan dari isi petak (Perimeter vs Area). Anak memilih keperluan, lalu menghitung jalur tepi
 *            dan isinya.
 * Data dari Buku Siswa Kelas V Bab 4 Sub-Bab A (4+4+4+4, 5+3+5+3, pagar, bingkai, Benteng Baluwarti).
 * Konsep sub-bab berikutnya (rumus, segitiga, segi banyak, gabungan) tidak dipakai di sini.
 * Semua bilangan bulat. Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k5b4.mjs.
 */

export type BangunJalan = { nama: string; sisi: number[] };
export type Tanah = { w: number; h: number };
export type Keperluan = { teks: string; jawab: "jalur" | "isi" };

/** Jalan: sisi dilewati searah jarum jam dari sudut kiri atas. */
export const DATA_JALAN: BangunJalan[] = [
  { nama: "persegi sisi 4 cm", sisi: [4, 4, 4, 4] },
  { nama: "persegi panjang 5 cm dan 3 cm", sisi: [5, 3, 5, 3] },
  { nama: "persegi panjang 6 cm dan 4 cm", sisi: [6, 4, 6, 4] },
];
/** Pagar: tanah w petak panjang dan h petak lebar. */
export const DATA_PAGAR: Tanah[] = [
  { w: 6, h: 4 },
  { w: 5, h: 3 },
  { w: 4, h: 3 },
];
/** Banding: bentuk yang jalur tepinya dan isinya dibedakan. Data 0 dan 1 punya jalur tepi sama. */
export const DATA_BANDING: Tanah[] = [
  { w: 5, h: 3 },
  { w: 6, h: 2 },
  { w: 2, h: 2 },
];
export const KEPERLUAN: Keperluan[] = [
  { teks: "bingkai foto", jawab: "jalur" },
  { teks: "cat lantai", jawab: "isi" },
  { teks: "pagar", jawab: "jalur" },
];
export const TEPI = ["atas", "kanan", "bawah", "kiri"] as const;

/* ------------------------------ Hitungan ------------------------------ */

/** Jumlah panjang n sisi pertama. */
export function jumlahSisi(sisi: number[], n: number = sisi.length): number {
  let jumlah = 0;
  for (let i = 0; i < n && i < sisi.length; i += 1) jumlah += sisi[i];
  return jumlah;
}
/** Tulisan penjumlahan n sisi pertama: "5 + 3 + 5". */
export const tulisJumlah = (sisi: number[], n: number = sisi.length): string => sisi.slice(0, n).join(" + ");
/** Keliling tanah di kisi: dua tepi mendatar dan dua tepi tegak, tiap sisi petak di tepi satu ruas. */
export const panjangTepi = (t: Tanah, k: number): number => (k % 2 === 0 ? t.w : t.h);
export const sisiTanah = (t: Tanah): number[] => [t.w, t.h, t.w, t.h];
export const kelilingTanah = (t: Tanah): number => jumlahSisi(sisiTanah(t));
/** Isi tanah: banyak petak di dalam. */
export const isiTanah = (t: Tanah): number => t.w * t.h;

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
/** Dua pengecoh pertama dari kandidat: bulat positif, unik, bukan benar. Bila kurang, dilengkapi dari benar + 2, benar + 3. */
function pengecoh(benar: number, kandidat: number[]): number[] {
  const hasil: number[] = [];
  for (const n of [...kandidat, benar + 2, benar + 3, benar + 4]) {
    if (hasil.length === 2) break;
    if (Number.isInteger(n) && n > 0 && n !== benar && !hasil.includes(n)) hasil.push(n);
  }
  return hasil;
}
/** Pilihan jalur tepi: yang benar, isinya (tertukar dengan luas), dan jumlah dua sisi saja. */
export function opsiJalur(i: number): number[] {
  const t = DATA_BANDING[i];
  const benar = kelilingTanah(t);
  return putar([benar, ...pengecoh(benar, [isiTanah(t), t.w + t.h])], i);
}
/** Pilihan isi: yang benar, jalur tepinya, dan jumlah dua sisi saja. */
export function opsiIsi(i: number): number[] {
  const t = DATA_BANDING[i];
  const benar = isiTanah(t);
  return putar([benar, ...pengecoh(benar, [kelilingTanah(t), t.w + t.h])], i + 1);
}

/* ------------------------------ Keadaan ------------------------------ */

export type StateJalurK5B4A = {
  jalan: { data: number; langkah: number; selesai: boolean };
  pagar: { data: number; ruas: number[] };
  banding: { data: number; perluOk: boolean; jalurOk: boolean; isiOk: boolean };
  pernah: string[];
  pesan: string;
};

export type AksiJalurK5B4A =
  | { t: "J_DATA"; i: number }
  | { t: "J_SISI"; k: number }
  | { t: "J_KEMBALI" }
  | { t: "P_DATA"; i: number }
  | { t: "P_RUAS"; k: number; d: number }
  | { t: "P_PERIKSA" }
  | { t: "B_DATA"; i: number }
  | { t: "B_PERLU"; jawab: string }
  | { t: "B_JALUR"; nilai: number }
  | { t: "B_ISI"; nilai: number }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalJalurK5B4A = (): StateJalurK5B4A => ({
  jalan: { data: 0, langkah: 0, selesai: false },
  pagar: { data: 0, ruas: [0, 0, 0, 0] },
  banding: { data: 0, perluOk: false, jalurOk: false, isiOk: false },
  pernah: [],
  pesan: "",
});

const catat = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

export const dataJalan = (x: StateJalurK5B4A): BangunJalan => DATA_JALAN[x.jalan.data];
export const dataPagar = (x: StateJalurK5B4A): Tanah => DATA_PAGAR[x.pagar.data];
export const dataBanding = (x: StateJalurK5B4A): Tanah => DATA_BANDING[x.banding.data];
export const totalRuas = (x: StateJalurK5B4A): number => jumlahSisi(x.pagar.ruas);

function sisiJalan(x: StateJalurK5B4A, k: number): StateJalurK5B4A {
  const b = dataJalan(x);
  const n = b.sisi.length;
  if (!Number.isInteger(k) || k < 0 || k >= n) return x;
  const { langkah, selesai } = x.jalan;
  if (selesai) return { ...x, pesan: "Kamu sudah kembali ke sudut awal. Pilih bangun lain atau mulai lagi." };
  if (k < langkah) return { ...x, pesan: `Sisi ke-${k + 1} sudah dilewati. Susuri sisi ke-${langkah + 1}, sisi yang berikutnya di tepi.` };
  if (k > langkah) return { ...x, pesan: `Jangan melompat. Susuri dulu sisi ke-${langkah + 1}, sisi yang berikutnya di tepi.` };
  const baru = langkah + 1;
  const jalur = baru === 1 ? `${b.sisi[0]}` : `${tulisJumlah(b.sisi, baru)} = ${jumlahSisi(b.sisi, baru)}`;
  const sisa = n - baru;
  const lanjut = sisa === 0 ? " Semua sisi sudah dilewati. Sekarang kembali ke sudut awal." : ` Masih ada ${sisa} sisi lagi.`;
  return { ...x, jalan: { ...x.jalan, langkah: baru }, pesan: `✅ Sisi ke-${baru} sepanjang ${b.sisi[k]} cm. Jalur sekarang ${jalur} cm.${lanjut}` };
}

function kembali(x: StateJalurK5B4A): StateJalurK5B4A {
  const b = dataJalan(x);
  const n = b.sisi.length;
  if (x.jalan.selesai) return { ...x, pesan: "Kamu sudah kembali ke sudut awal." };
  if (x.jalan.langkah < n) {
    const sisa = n - x.jalan.langkah;
    return { ...x, pesan: x.jalan.langkah === 0 ? "Mulai dari sudut awal: susuri sisi pertama dulu." : `Belum kembali ke sudut awal. Masih ada ${sisa} sisi yang harus dilewati.` };
  }
  return {
    ...x,
    jalan: { ...x.jalan, selesai: true },
    pernah: catat(x.pernah, `jalan:${x.jalan.data}`),
    pesan: `✅ Kembali di sudut awal. Jalur seluruhnya ${tulisJumlah(b.sisi)} = ${jumlahSisi(b.sisi)} cm. Jarak tempuh itulah keliling.`,
  };
}

function ruasPagar(x: StateJalurK5B4A, k: number, d: number): StateJalurK5B4A {
  if (!Number.isInteger(k) || k < 0 || k > 3 || (d !== 1 && d !== -1)) return x;
  const t = dataPagar(x);
  const sekarang = x.pagar.ruas[k];
  const baru = sekarang + d;
  if (baru < 0) return x;
  if (baru > panjangTepi(t, k)) return { ...x, pesan: `Tepi ${TEPI[k]} hanya ${panjangTepi(t, k)} petak, jadi ${panjangTepi(t, k)} ruas sudah cukup.` };
  return { ...x, pagar: { ...x.pagar, ruas: x.pagar.ruas.map((v, j) => (j === k ? baru : v)) }, pesan: "" };
}

function periksaPagar(x: StateJalurK5B4A): StateJalurK5B4A {
  const t = dataPagar(x);
  if (totalRuas(x) === 0) return { ...x, pesan: "Pasang dulu ruas pagar di tepi tanah, lalu periksa." };
  for (let k = 0; k < 4; k += 1) {
    if (x.pagar.ruas[k] < panjangTepi(t, k)) {
      return { ...x, pesan: `Tepi ${TEPI[k]} masih kurang: ${x.pagar.ruas[k]} dari ${panjangTepi(t, k)} ruas. Pagar harus menutup seluruh tepi sampai kembali ke awal.` };
    }
  }
  const sisi = sisiJalan0(t);
  return {
    ...x,
    pernah: catat(x.pernah, `pagar:${x.pagar.data}`),
    pesan: `✅ Pagar lengkap: ${tulisJumlah(sisi)} = ${kelilingTanah(t)} ruas, satu ruas tiap petak di tepi. Itu keliling tanah. Isi tanah ${isiTanah(t)} petak dipakai untuk rumput, bukan untuk panjang pagar.`,
  };
}
const sisiJalan0 = (t: Tanah): number[] => sisiTanah(t);

function pilihPerlu(x: StateJalurK5B4A, jawab: string): StateJalurK5B4A {
  if (jawab !== "jalur" && jawab !== "isi") return x;
  const kep = KEPERLUAN[x.banding.data];
  if (jawab !== kep.jawab) {
    return {
      ...x,
      banding: { ...x.banding, perluOk: false },
      pesan: jawab === "isi" ? `Untuk ${kep.teks}, yang dibutuhkan panjang di tepi, bukan isi petak di dalam.` : `Untuk ${kep.teks}, yang dibutuhkan isi daerah di dalam, bukan panjang jalur di tepi.`,
    };
  }
  return {
    ...x,
    banding: { ...x.banding, perluOk: true },
    pernah: catat(x.pernah, `perlu:${x.banding.data}`),
    pesan:
      kep.jawab === "jalur"
        ? `✅ ${kep.teks} dipasang mengelilingi tepi, jadi yang dihitung adalah jalur tepi, yaitu keliling.`
        : `✅ ${kep.teks} menutupi daerah di dalam, jadi yang dihitung adalah isinya, bukan jalur tepi.`,
  };
}

function bandingBoth(x: StateJalurK5B4A): string {
  const a = DATA_BANDING[0];
  const b = DATA_BANDING[1];
  const lengkap = ["jalur:0", "isi:0", "jalur:1", "isi:1"].every((id) => x.pernah.includes(id));
  return lengkap
    ? ` Dua bangun berbeda bisa punya jalur tepi sama, yaitu ${kelilingTanah(a)} dan ${kelilingTanah(b)}, tetapi isi berbeda, yaitu ${isiTanah(a)} dan ${isiTanah(b)}.`
    : "";
}

function pilihJalur(x: StateJalurK5B4A, n: number): StateJalurK5B4A {
  const i = x.banding.data;
  const t = DATA_BANDING[i];
  if (!opsiJalur(i).includes(n)) return x;
  if (n === kelilingTanah(t)) {
    const baru = { ...x, banding: { ...x.banding, jalurOk: true }, pernah: catat(x.pernah, `jalur:${i}`) };
    return { ...baru, pesan: `✅ Jalur tepi ${tulisJumlah(sisiTanah(t))} = ${n} cm, jumlah panjang semua sisi.${bandingBoth(baru)}` };
  }
  if (n === isiTanah(t)) return { ...x, pesan: `${n} adalah banyak petak di dalam, itu isi. Jalur tepi adalah jumlah panjang semua sisi.` };
  if (n === t.w + t.h) return { ...x, pesan: `${n} baru panjang dua sisi. Jalur tepi melewati keempat sisi sampai kembali ke awal.` };
  return { ...x, pesan: "Belum. Jumlahkan panjang semua sisi di tepi." };
}

function pilihIsi(x: StateJalurK5B4A, n: number): StateJalurK5B4A {
  const i = x.banding.data;
  const t = DATA_BANDING[i];
  if (!opsiIsi(i).includes(n)) return x;
  if (n === isiTanah(t)) {
    const baru = { ...x, banding: { ...x.banding, isiOk: true }, pernah: catat(x.pernah, `isi:${i}`) };
    return { ...baru, pesan: `✅ Isinya ${n} petak: ${t.w} petak tiap baris, ada ${t.h} baris. Isi dihitung dengan petak, bukan dengan panjang jalur.${bandingBoth(baru)}` };
  }
  if (n === kelilingTanah(t)) return { ...x, pesan: `${n} adalah panjang jalur di tepi. Isi adalah banyak petak di dalam.` };
  return { ...x, pesan: "Belum. Hitung petak di dalam, baris demi baris." };
}

export function langkahJalurK5B4A(x: StateJalurK5B4A, a: AksiJalurK5B4A): StateJalurK5B4A {
  switch (a.t) {
    case "J_DATA":
      return sah(a.i, DATA_JALAN.length) ? { ...x, jalan: { data: a.i, langkah: 0, selesai: false }, pesan: "" } : x;
    case "J_SISI":
      return sisiJalan(x, a.k);
    case "J_KEMBALI":
      return kembali(x);
    case "P_DATA":
      return sah(a.i, DATA_PAGAR.length) ? { ...x, pagar: { data: a.i, ruas: [0, 0, 0, 0] }, pesan: "" } : x;
    case "P_RUAS":
      return ruasPagar(x, a.k, a.d);
    case "P_PERIKSA":
      return periksaPagar(x);
    case "B_DATA":
      return sah(a.i, DATA_BANDING.length) ? { ...x, banding: { data: a.i, perluOk: false, jalurOk: false, isiOk: false }, pesan: "" } : x;
    case "B_PERLU":
      return pilihPerlu(x, a.jawab);
    case "B_JALUR":
      return pilihJalur(x, a.nilai);
    case "B_ISI":
      return pilihIsi(x, a.nilai);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalJalurK5B4A();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanJalurK5B4A = { alat: "jalur"; pernah: string[] };
export const keadaanJalurK5B4A = (x: StateJalurK5B4A): KeadaanJalurK5B4A => ({ alat: "jalur", pernah: x.pernah });

export const ucapJalanK5B4A = (x: StateJalurK5B4A): string => {
  const b = dataJalan(x);
  const sekarang = x.jalan.selesai ? "Kamu sudah kembali ke sudut awal." : x.jalan.langkah === 0 ? "Belum ada sisi yang dilewati." : `Sudah ${x.jalan.langkah} sisi dilewati, jalur ${jumlahSisi(b.sisi, x.jalan.langkah)} cm.`;
  return `Susuri tepi ${b.nama}, sisi demi sisi, sampai kembali ke sudut awal. ${sekarang}`;
};
export const ucapPagarK5B4A = (x: StateJalurK5B4A): string => {
  const t = dataPagar(x);
  return `Pasang pagar di tepi tanah ${t.w} petak panjang dan ${t.h} petak lebar. Sekarang ada ${totalRuas(x)} ruas pagar.`;
};
export const ucapBandingK5B4A = (x: StateJalurK5B4A): string => {
  const t = dataBanding(x);
  const kep = KEPERLUAN[x.banding.data];
  const sekarang = x.banding.perluOk ? "Sekarang hitung jalur tepi dan isinya." : `Untuk ${kep.teks}, pilih yang dihitung.`;
  return `Bangun ini ${t.w} petak panjang dan ${t.h} petak lebar. ${sekarang}`;
};
