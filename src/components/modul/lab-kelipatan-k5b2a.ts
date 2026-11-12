/**
 * Lab Lompat Kelipatan (Kelas 5 Bab 2, Sub-Bab A): logika murni. Satu alat, tiga tampilan.
 *  Lompat : garis bilangan. Anak memilih jarak lompatan, lalu menekan Lompat. Tiap pendaratan adalah kelipatan.
 *           Jarak selalu sama, mulai dari nol, dan nol sendiri bukan kelipatan di buku ini.
 *  Tabel  : tabel seratus. Anak mewarnai semua kelipatan yang diminta, lalu memeriksa. Lab membandingkan
 *           bilangan yang diwarnai dengan kelipatan yang dibentuk dengan lompatan, dan menunjuk bilangan yang
 *           kelebihan atau terlewat.
 *  Cek    : bilangan disusun dalam kelompok sama banyak. Anak menentukan sisa, lalu memutuskan apakah bilangan itu
 *           habis dibagi (kelipatan).
 * Data dari Buku Siswa Kelas V Bab 2 Sub-Bab A (lompat hitung, tabel seratus, habis dibagi). Semua bilangan bulat.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k5b2.mjs.
 */

export const JARAK = [3, 4, 7];
export const MAKS_LOMPAT = 10;
export const MAKS_TABEL = 100;
/** Tabel: kelipatan yang diwarnai. */
export const DATA_TABEL = [4, 9, 5];

export type DataCek = { n: number; d: number };
export const DATA_CEK: DataCek[] = [
  { n: 12, d: 3 },
  { n: 14, d: 3 },
  { n: 28, d: 7 },
  { n: 25, d: 4 },
];

/* ------------------------------ Hitungan ------------------------------ */

export const daratLompat = (jarak: number, k: number): number => jarak * k;
export const kelipatanTabel = (d: number): number[] => Array.from({ length: Math.floor(MAKS_TABEL / d) }, (_, i) => d * (i + 1));
export const bagiCek = (n: number, d: number): { q: number; r: number } => ({ q: Math.floor(n / d), r: n % d });

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);

/** Pilihan sisa: sisa benar, hasil bagi (kesalahan umum), dan satu sisa palsu. Urutan diputar menurut data. */
export function opsiSisa(i: number): number[] {
  const { n, d } = DATA_CEK[i];
  const { q, r } = bagiCek(n, d);
  const palsu = r === 0 ? r + 1 : d - r;
  return putar([r, q, palsu], i);
}

/* ------------------------------ Keadaan ------------------------------ */

export type StateKelipatanK5B2A = {
  lompat: { jarak: number; k: number };
  tabel: { data: number; warna: number[] };
  cek: { data: number; sisaOk: boolean };
  pernah: string[];
  pesan: string;
};

export type AksiKelipatanK5B2A =
  | { t: "L_JARAK"; i: number }
  | { t: "L_LOMPAT" }
  | { t: "L_ULANG" }
  | { t: "G_DATA"; i: number }
  | { t: "G_KLIK"; n: number }
  | { t: "G_BERSIH" }
  | { t: "G_CEK" }
  | { t: "C_DATA"; i: number }
  | { t: "C_SISA"; nilai: number }
  | { t: "C_JAWAB"; ya: boolean }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalKelipatanK5B2A = (): StateKelipatanK5B2A => ({
  lompat: { jarak: 0, k: 0 },
  tabel: { data: 0, warna: [] },
  cek: { data: 0, sisaOk: false },
  pernah: [],
  pesan: "",
});

const tambah = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

export const jarakLompat = (x: StateKelipatanK5B2A): number => JARAK[x.lompat.jarak];
export const dasarTabel = (x: StateKelipatanK5B2A): number => DATA_TABEL[x.tabel.data];
export const dataCek = (x: StateKelipatanK5B2A): DataCek => DATA_CEK[x.cek.data];
/** Daftar pendaratan: jarak, dua kali jarak, dan seterusnya. */
export const daftarLompat = (x: StateKelipatanK5B2A): number[] => Array.from({ length: x.lompat.k }, (_, i) => daratLompat(jarakLompat(x), i + 1));

function lompat(x: StateKelipatanK5B2A): StateKelipatanK5B2A {
  const J = jarakLompat(x);
  if (x.lompat.k >= MAKS_LOMPAT) return { ...x, pesan: "Sepuluh pendaratan sudah cukup di garis ini. Tekan Mulai lagi untuk mencoba jarak lain." };
  const k = x.lompat.k + 1;
  const mendarat = daratLompat(J, k);
  let pernah = x.pernah;
  if (k === 5 || k === 10) pernah = tambah(pernah, `lompat:${J}:${k}`);
  const baru = { ...x, lompat: { ...x.lompat, k }, pernah };
  const daftar = daftarLompat(baru).join(", ");
  if (k === 1) return { ...baru, pesan: `✅ Mendarat di ${mendarat}. Itu kelipatan pertama dari ${J}. Lompat lagi dengan jarak yang sama.` };
  if (k === 5) return { ...baru, pesan: `✅ Lima pendaratan: ${daftar}. Semuanya kelipatan ${J}, tiap lompatan berjarak ${J}.` };
  if (k === 10) return { ...baru, pesan: `✅ Sepuluh pendaratan, terakhir di ${mendarat}. Kelipatan ${J} terus bertambah ${J} demi ${J}.` };
  return { ...baru, pesan: `✅ Mendarat di ${mendarat}. Itu ${J} dikali ${k}.` };
}

function cekTabel(x: StateKelipatanK5B2A): StateKelipatanK5B2A {
  const d = dasarTabel(x);
  const kunci = kelipatanTabel(d);
  const warna = x.tabel.warna;
  if (warna.length === 0) return { ...x, pesan: "Belum ada bilangan yang diwarnai. Ketuk bilangan yang kamu kira kelipatannya, lalu periksa." };
  const lebih = warna.filter((n) => !kunci.includes(n));
  const kurang = kunci.filter((n) => !warna.includes(n));
  if (lebih.length > 0) {
    const e = lebih[0];
    return { ...x, pesan: `Ada bilangan yang bukan kelipatan ${d}: ${e}. Periksa: ${e} dibagi ${d} bersisa ${e % d}.` };
  }
  if (kurang.length > 0) return { ...x, pesan: `Masih ada kelipatan ${d} yang belum diwarnai, misalnya ${kurang[0]}. Lompat ${d} demi ${d} dari nol.` };
  return { ...x, pernah: tambah(x.pernah, `tabel:${d}`), pesan: `✅ Tepat! Ada ${kunci.length} kelipatan ${d} sampai ${MAKS_TABEL}. Lihat polanya, warnanya berjalan teratur.` };
}

function pilihSisa(x: StateKelipatanK5B2A, nilai: number): StateKelipatanK5B2A {
  const i = x.cek.data;
  const { n, d } = DATA_CEK[i];
  const { q, r } = bagiCek(n, d);
  if (!opsiSisa(i).includes(nilai)) return x;
  if (nilai === r) {
    const lengkap = r === 0 ? "Semua titik masuk kelompok penuh, tidak ada sisa." : `Ada ${r} titik yang tidak cukup untuk satu kelompok penuh.`;
    return { ...x, cek: { ...x.cek, sisaOk: true }, pesan: `✅ Benar, sisanya ${r}. ${lengkap} Sekarang putuskan.` };
  }
  if (nilai === q) return { ...x, cek: { ...x.cek, sisaOk: false }, pesan: `${q} adalah banyak kelompok penuh, bukan sisanya. Sisa adalah titik yang tidak masuk kelompok penuh.` };
  return { ...x, cek: { ...x.cek, sisaOk: false }, pesan: "Belum. Hitung titik yang tersisa di luar kelompok penuh." };
}

function jawabCek(x: StateKelipatanK5B2A, ya: boolean): StateKelipatanK5B2A {
  const { n, d } = DATA_CEK[x.cek.data];
  const { q, r } = bagiCek(n, d);
  if (!x.cek.sisaOk) return { ...x, pesan: "Tentukan dulu sisanya." };
  if (ya && r === 0) return { ...x, pernah: tambah(x.pernah, `cek:${n}:${d}`), pesan: `✅ Tepat! ${n} habis dibagi ${d}, jadi ${n} kelipatan ${d}: ${d} × ${q} = ${n}.` };
  if (!ya && r > 0) return { ...x, pernah: tambah(x.pernah, `cek:${n}:${d}`), pesan: `✅ Tepat! ${n} dibagi ${d} bersisa ${r}, jadi ${n} bukan kelipatan ${d}.` };
  if (ya) return { ...x, pesan: `Masih ada sisa ${r}. Kelipatan harus habis dibagi, tanpa sisa.` };
  return { ...x, pesan: "Sisanya nol. Habis dibagi berarti kelipatan." };
}

export function langkahKelipatanK5B2A(x: StateKelipatanK5B2A, a: AksiKelipatanK5B2A): StateKelipatanK5B2A {
  switch (a.t) {
    case "L_JARAK":
      return sah(a.i, JARAK.length) ? { ...x, lompat: { jarak: a.i, k: 0 }, pesan: "" } : x;
    case "L_LOMPAT":
      return lompat(x);
    case "L_ULANG":
      return { ...x, lompat: { ...x.lompat, k: 0 }, pesan: "✅ Kembali ke titik awal nol. Nol bukan kelipatan di buku ini, kelipatan pertama adalah jaraknya." };
    case "G_DATA":
      return sah(a.i, DATA_TABEL.length) ? { ...x, tabel: { data: a.i, warna: [] }, pesan: "" } : x;
    case "G_KLIK": {
      if (!Number.isInteger(a.n) || a.n < 1 || a.n > MAKS_TABEL) return x;
      const ada = x.tabel.warna.includes(a.n);
      const warna = ada ? x.tabel.warna.filter((v) => v !== a.n) : [...x.tabel.warna, a.n].sort((p, q) => p - q);
      return { ...x, tabel: { ...x.tabel, warna }, pesan: "" };
    }
    case "G_BERSIH":
      return { ...x, tabel: { ...x.tabel, warna: [] }, pesan: "" };
    case "G_CEK":
      return cekTabel(x);
    case "C_DATA":
      return sah(a.i, DATA_CEK.length) ? { ...x, cek: { data: a.i, sisaOk: false }, pesan: "" } : x;
    case "C_SISA":
      return pilihSisa(x, a.nilai);
    case "C_JAWAB":
      return jawabCek(x, a.ya);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalKelipatanK5B2A();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanKelipatanK5B2A = { alat: "kelipatan"; pernah: string[] };
export const keadaanKelipatanK5B2A = (x: StateKelipatanK5B2A): KeadaanKelipatanK5B2A => ({ alat: "kelipatan", pernah: x.pernah });

export const ucapLompatK5B2A = (x: StateKelipatanK5B2A): string => {
  const J = jarakLompat(x);
  const sekarang = x.lompat.k === 0 ? "Kamu masih di nol." : `Pendaratan terakhir di ${daratLompat(J, x.lompat.k)}.`;
  return `Lompat dengan jarak ${J} dari nol. Tekan Lompat untuk mendarat. ${sekarang}`;
};
export const ucapTabelK5B2A = (x: StateKelipatanK5B2A): string =>
  `Warnai semua kelipatan ${dasarTabel(x)} di tabel seratus. Sekarang ada ${x.tabel.warna.length} bilangan yang diwarnai. Lalu periksa.`;
export const ucapCekK5B2A = (x: StateKelipatanK5B2A): string => {
  const { n, d } = dataCek(x);
  return `${n} titik disusun dalam kelompok berisi ${d}. Tentukan sisanya, lalu putuskan apakah ${n} kelipatan ${d}.`;
};
