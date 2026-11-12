/**
 * Lab Rumus (Kelas 5 Bab 5, Sub-Bab B: Luas Daerah Bangun Datar): logika murni. Satu alat, tiga tampilan.
 *  Kali      : persegi panjang, persegi, dan jajargenjang. Luas sama dengan alas dikali tinggi. Pada jajargenjang yang
 *              dipakai tinggi yang tegak lurus alas, bukan sisi miring (Base × Height, Shear Principle).
 *  Setengah  : segitiga, belah ketupat, dan layang-layang. Dua bangun yang sama menyusun persegi panjang, jadi luas satu
 *              bangun adalah setengah dari luas persegi panjang itu (Dissection Method).
 *  Trapesium : dua trapesium yang sama menyusun jajargenjang beralas jumlah dua sisi sejajar, jadi luas satu trapesium
 *              adalah setengah dari jumlah dua sisi sejajar dikali tinggi.
 * Data dari Buku Siswa Kelas V Bab 5 Sub-Bab B (5 × 2, 4 × 4, 8 × 3, ½ × 6 × 4, ½ × (5 + 3) × 4, belah ketupat, layang-layang).
 * Konsep sub-bab berikutnya (bangun gabungan, hubungan dengan tepi) tidak dipakai di sini.
 * Semua bilangan bulat, dan setengah hanya dipakai bila hasil kalinya genap. Murni: tanpa React, tanpa jaringan,
 * tanpa impor. Diuji di scripts/uji-lab-k5b5.mjs.
 */

export type JenisKali = "pp" | "persegi" | "jajar";
export type BangunKali = { jenis: JenisKali; nama: string; alas: number; tinggi: number; miring: number | null };
export type JenisSetengah = "segitiga" | "belah" | "layang";
/** a dan t: alas dan tinggi segitiga, atau diagonal pertama dan kedua belah ketupat dan layang-layang. */
export type BangunSetengah = { jenis: JenisSetengah; nama: string; a: number; t: number };
export type BangunTrap = { a: number; b: number; t: number };

export const DATA_KALI: BangunKali[] = [
  { jenis: "pp", nama: "persegi panjang 5 dan 2", alas: 5, tinggi: 2, miring: null },
  { jenis: "persegi", nama: "persegi sisi 4", alas: 4, tinggi: 4, miring: null },
  { jenis: "jajar", nama: "jajargenjang alas 8", alas: 8, tinggi: 3, miring: 5 },
  { jenis: "jajar", nama: "jajargenjang alas 6", alas: 6, tinggi: 4, miring: 5 },
];
export const DATA_SETENGAH: BangunSetengah[] = [
  { jenis: "segitiga", nama: "segitiga alas 6 tinggi 4", a: 6, t: 4 },
  { jenis: "belah", nama: "belah ketupat diagonal 6 dan 4", a: 6, t: 4 },
  { jenis: "layang", nama: "layang-layang diagonal 8 dan 6", a: 8, t: 6 },
];
export const DATA_TRAP: BangunTrap[] = [
  { a: 5, b: 3, t: 4 },
  { a: 7, b: 5, t: 3 },
];
const KATA_BANGUN: Record<JenisSetengah, string> = { segitiga: "segitiga", belah: "belah ketupat", layang: "layang-layang" };

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

export const luasKali = (d: BangunKali): number => d.alas * d.tinggi;
/** Luas persegi panjang yang dibentuk dua bangun yang sama. Selalu genap pada data lab ini. */
export const luasPersegiPanjang = (d: BangunSetengah): number => d.a * d.t;
export const luasSetengah = (d: BangunSetengah): number => (d.a * d.t) / 2;
export const jumlahSejajar = (d: BangunTrap): number => d.a + d.b;
export const luasJajarTrap = (d: BangunTrap): number => (d.a + d.b) * d.t;
export const luasTrap = (d: BangunTrap): number => ((d.a + d.b) * d.t) / 2;

/** Pilihan tinggi pada jajargenjang: tinggi yang benar dan sisi miring. Bangun lain tidak punya pilihan. */
export function opsiTinggi(i: number): number[] {
  const d = DATA_KALI[i];
  return d.miring === null ? [] : putar([d.tinggi, d.miring], i);
}
/** Pilihan luas Kali: yang benar, lalu sisi miring dikali alas (jajargenjang) atau alas ditambah tinggi, dan pengecoh lain. */
export function opsiKali(i: number): number[] {
  const d = DATA_KALI[i];
  const benar = luasKali(d);
  const kandidat = d.miring === null ? [d.alas + d.tinggi, 2 * (d.alas + d.tinggi)] : [d.alas * d.miring, d.alas + d.tinggi];
  return putar([benar, ...pengecoh(benar, kandidat)], i);
}
/** Pilihan luas Setengah: yang benar, luas persegi panjang tanpa setengah, dan jumlah dua ukuran. */
export function opsiSetengah(i: number): number[] {
  const d = DATA_SETENGAH[i];
  const benar = luasSetengah(d);
  return putar([benar, ...pengecoh(benar, [luasPersegiPanjang(d), d.a + d.t])], i + 1);
}
/** Pilihan alas jajargenjang pada Trapesium: jumlah dua sisi sejajar, dan satu sisi saja. */
export function opsiAlas(i: number): number[] {
  const d = DATA_TRAP[i];
  return putar([jumlahSejajar(d), ...pengecoh(jumlahSejajar(d), [d.a, d.b])], i);
}
/** Pilihan luas Trapesium: yang benar, jajargenjang utuh tanpa setengah, dan jumlah semua ukuran. */
export function opsiTrap(i: number): number[] {
  const d = DATA_TRAP[i];
  const benar = luasTrap(d);
  return putar([benar, ...pengecoh(benar, [luasJajarTrap(d), d.a + d.b + d.t])], i + 1);
}

/* ------------------------------ Keadaan ------------------------------ */

export type StateRumusK5B5B = {
  kali: { data: number; tinggiOk: boolean };
  setengah: { data: number; ganda: boolean };
  trap: { data: number; ganda: boolean; alasOk: boolean };
  pernah: string[];
  pesan: string;
};

export type AksiRumusK5B5B =
  | { t: "K_DATA"; i: number }
  | { t: "K_TINGGI"; nilai: number }
  | { t: "K_LUAS"; nilai: number }
  | { t: "S_DATA"; i: number }
  | { t: "S_GANDA" }
  | { t: "S_LUAS"; nilai: number }
  | { t: "T_DATA"; i: number }
  | { t: "T_GANDA" }
  | { t: "T_ALAS"; nilai: number }
  | { t: "T_LUAS"; nilai: number }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

const kaliBaru = (i: number) => ({ data: i, tinggiOk: DATA_KALI[i].miring === null });

export const awalRumusK5B5B = (): StateRumusK5B5B => ({
  kali: kaliBaru(0),
  setengah: { data: 0, ganda: false },
  trap: { data: 0, ganda: false, alasOk: false },
  pernah: [],
  pesan: "",
});

export const dataKali = (x: StateRumusK5B5B): BangunKali => DATA_KALI[x.kali.data];
export const dataSetengah = (x: StateRumusK5B5B): BangunSetengah => DATA_SETENGAH[x.setengah.data];
export const dataTrap = (x: StateRumusK5B5B): BangunTrap => DATA_TRAP[x.trap.data];

function pilihTinggi(x: StateRumusK5B5B, n: number): StateRumusK5B5B {
  const i = x.kali.data;
  const d = DATA_KALI[i];
  if (!opsiTinggi(i).includes(n)) return x;
  if (n === d.tinggi) {
    return { ...x, kali: { ...x.kali, tinggiOk: true }, pesan: `✅ Tinggi ${n} cm: garis yang tegak lurus alas. Sisi miring ${d.miring} cm bukan tinggi.` };
  }
  return { ...x, kali: { ...x.kali, tinggiOk: false }, pesan: `${n} cm adalah sisi miring. Tinggi adalah garis yang tegak lurus alas.` };
}

function pilihLuasKali(x: StateRumusK5B5B, n: number): StateRumusK5B5B {
  const i = x.kali.data;
  const d = DATA_KALI[i];
  if (!opsiKali(i).includes(n)) return x;
  if (!x.kali.tinggiOk) return { ...x, pesan: "Pilih dulu tinggi yang tegak lurus alas, lalu pilih luasnya." };
  if (n === luasKali(d)) {
    const rumus = d.jenis === "persegi" ? `sisi × sisi = ${d.alas} × ${d.tinggi}` : `alas × tinggi = ${d.alas} × ${d.tinggi}`;
    const geser = d.jenis === "jajar" ? ` Jajargenjang digeser menjadi persegi panjang. Yang dikali adalah tinggi ${d.tinggi}, bukan sisi miring ${d.miring}.` : "";
    return { ...x, pernah: catat(x.pernah, `kali:${i}`), pesan: `✅ Luasnya ${rumus} = ${n} cm².${geser}` };
  }
  if (d.miring !== null && n === d.alas * d.miring) return { ...x, pesan: `${n} memakai sisi miring ${d.miring}. Yang dikali alas adalah tinggi yang tegak lurus.` };
  if (n === d.alas + d.tinggi) return { ...x, pesan: `${n} baru alas ditambah tinggi. Luas adalah alas dikali tinggi.` };
  return { ...x, pesan: "Belum. Kalikan alas dengan tinggi." };
}

function gandakan(x: StateRumusK5B5B): StateRumusK5B5B {
  const d = dataSetengah(x);
  const apa = d.jenis === "segitiga" ? "Dua segitiga yang sama disusun menjadi persegi panjang" : `Persegi panjang dari kedua diagonal memuat dua ${KATA_BANGUN[d.jenis]} yang sama, yaitu persegi panjang`;
  return { ...x, setengah: { ...x.setengah, ganda: true }, pesan: `✅ ${apa} ${d.a} × ${d.t} = ${luasPersegiPanjang(d)} cm².` };
}

function pilihLuasSetengah(x: StateRumusK5B5B, n: number): StateRumusK5B5B {
  const i = x.setengah.data;
  const d = DATA_SETENGAH[i];
  if (!opsiSetengah(i).includes(n)) return x;
  if (!x.setengah.ganda) return { ...x, pesan: "Susun dulu dua bangun yang sama menjadi persegi panjang, lalu cari luas satu bangun." };
  if (n === luasSetengah(d)) {
    return { ...x, pernah: catat(x.pernah, `setengah:${i}`), pesan: `✅ Satu ${KATA_BANGUN[d.jenis]} adalah setengah persegi panjang: ½ × ${d.a} × ${d.t} = ${n} cm².` };
  }
  if (n === luasPersegiPanjang(d)) return { ...x, pesan: `${n} adalah luas persegi panjang dari dua bangun. Luas satu bangun hanya setengahnya.` };
  if (n === d.a + d.t) return { ...x, pesan: `${n} baru jumlah dua ukuran. Luas adalah setengah dari ${d.a} dikali ${d.t}.` };
  return { ...x, pesan: "Belum. Ambil setengah dari luas persegi panjang." };
}

function susunTrap(x: StateRumusK5B5B): StateRumusK5B5B {
  const d = dataTrap(x);
  return {
    ...x,
    trap: { ...x.trap, ganda: true },
    pesan: `✅ Dua trapesium yang sama disusun menjadi jajargenjang. Alasnya sisi sejajar ${d.a} dan ${d.b} bersambung, tingginya tetap ${d.t}.`,
  };
}

function pilihAlas(x: StateRumusK5B5B, n: number): StateRumusK5B5B {
  const i = x.trap.data;
  const d = DATA_TRAP[i];
  if (!opsiAlas(i).includes(n)) return x;
  if (!x.trap.ganda) return { ...x, pesan: "Susun dulu dua trapesium menjadi jajargenjang, lalu tentukan alasnya." };
  if (n === jumlahSejajar(d)) return { ...x, trap: { ...x.trap, alasOk: true }, pesan: `✅ Alas jajargenjang ${d.a} + ${d.b} = ${n} cm, jumlah dua sisi sejajar trapesium.` };
  return { ...x, trap: { ...x.trap, alasOk: false }, pesan: `${n} cm baru satu sisi sejajar. Alas jajargenjang adalah jumlah kedua sisi sejajar.` };
}

function pilihLuasTrap(x: StateRumusK5B5B, n: number): StateRumusK5B5B {
  const i = x.trap.data;
  const d = DATA_TRAP[i];
  if (!opsiTrap(i).includes(n)) return x;
  if (!x.trap.ganda || !x.trap.alasOk) return { ...x, pesan: "Susun dulu jajargenjang dan pilih alasnya, yaitu jumlah dua sisi sejajar, lalu pilih luas satu trapesium." };
  if (n === luasTrap(d)) {
    return { ...x, pernah: catat(x.pernah, `trap:${i}`), pesan: `✅ Satu trapesium adalah setengah jajargenjang: ½ × (${d.a} + ${d.b}) × ${d.t} = ${n} cm².` };
  }
  if (n === luasJajarTrap(d)) return { ...x, pesan: `${n} adalah luas jajargenjang dari dua trapesium. Luas satu trapesium hanya setengahnya.` };
  if (n === d.a + d.b + d.t) return { ...x, pesan: `${n} menjumlah semua ukuran. Luas adalah setengah dikali jumlah sisi sejajar dikali tinggi.` };
  return { ...x, pesan: "Belum. Ambil setengah dari luas jajargenjang." };
}

export function langkahRumusK5B5B(x: StateRumusK5B5B, a: AksiRumusK5B5B): StateRumusK5B5B {
  switch (a.t) {
    case "K_DATA":
      return sah(a.i, DATA_KALI.length) ? { ...x, kali: kaliBaru(a.i), pesan: "" } : x;
    case "K_TINGGI":
      return pilihTinggi(x, a.nilai);
    case "K_LUAS":
      return pilihLuasKali(x, a.nilai);
    case "S_DATA":
      return sah(a.i, DATA_SETENGAH.length) ? { ...x, setengah: { data: a.i, ganda: false }, pesan: "" } : x;
    case "S_GANDA":
      return gandakan(x);
    case "S_LUAS":
      return pilihLuasSetengah(x, a.nilai);
    case "T_DATA":
      return sah(a.i, DATA_TRAP.length) ? { ...x, trap: { data: a.i, ganda: false, alasOk: false }, pesan: "" } : x;
    case "T_GANDA":
      return susunTrap(x);
    case "T_ALAS":
      return pilihAlas(x, a.nilai);
    case "T_LUAS":
      return pilihLuasTrap(x, a.nilai);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalRumusK5B5B();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanRumusK5B5B = { alat: "rumus"; pernah: string[] };
export const keadaanRumusK5B5B = (x: StateRumusK5B5B): KeadaanRumusK5B5B => ({ alat: "rumus", pernah: x.pernah });

export const ucapKaliK5B5B = (x: StateRumusK5B5B): string => {
  const d = dataKali(x);
  const sekarang = d.miring !== null && !x.kali.tinggiOk ? "Pilih dulu tinggi yang tegak lurus alas." : "Pilih luasnya.";
  return `Hitung luas ${d.nama} dengan alas dikali tinggi. ${sekarang}`;
};
export const ucapSetengahK5B5B = (x: StateRumusK5B5B): string => {
  const d = dataSetengah(x);
  const sekarang = x.setengah.ganda ? "Sekarang pilih luas satu bangun." : "Susun dulu dua bangun menjadi persegi panjang.";
  return `Hitung luas ${d.nama}. ${sekarang}`;
};
export const ucapTrapK5B5B = (x: StateRumusK5B5B): string => {
  const d = dataTrap(x);
  const sekarang = !x.trap.ganda ? "Susun dulu dua trapesium menjadi jajargenjang." : !x.trap.alasOk ? "Pilih alas jajargenjang." : "Pilih luas satu trapesium.";
  return `Trapesium dengan sisi sejajar ${d.a} dan ${d.b}, tinggi ${d.t}. ${sekarang}`;
};
