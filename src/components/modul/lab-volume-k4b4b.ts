/**
 * Lab Volume (Kelas 4 Bab 4, Sub-Bab B): logika murni. Satu alat, tiga tampilan.
 *  Tuang : wadah besar diisi dari takaran kecil (satuan tidak baku). Isi wadah = banyak tuangan × isi takaran,
 *          dihitung dengan menambah satu takaran tiap tuangan. Tuangan yang membuat wadah meluap ditolak (tumpah).
 *          Data buku: botol A = 4 botol B, botol A = 10 botol C, botol besar sanitizer = 8 botol kecil.
 *  Kubus : alas baris × kolom (1 sampai 4) dan lapisan (1 sampai 3). Banyak kubus satuan dihitung lapis demi lapis;
 *          tiap kubus satuan bersisi 1 cm, jadi 1 kubus = 1 cm³.
 *  Takar : gelas takar 1.000 ml. Anak menuang sendok 5 ml, gelas kecil 100 ml, atau cangkir 240 ml. Tepat 1.000 ml
 *          air = 1 l. Balok 50 kubus satuan (50 cm³) dicelupkan: muka air naik 50 ml, jadi 1 cm³ = 1 ml.
 * Semua bilangan bulat. Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k4b4.mjs.
 */

/** Isi wadah dan takaran dalam bagian kecil yang sama (tidak ditampilkan sebagai satuan baku). */
export type KasusTuang = { id: "b" | "c" | "sanitizer"; wadah: string; takar: string; besar: number; kecil: number };
export const TUANG_B: KasusTuang[] = [
  { id: "b", wadah: "botol A", takar: "botol B", besar: 40, kecil: 10 },
  { id: "c", wadah: "botol A", takar: "botol C", besar: 40, kecil: 4 },
  { id: "sanitizer", wadah: "botol besar sanitizer", takar: "botol kecil", besar: 40, kecil: 5 },
];
export type Takaran = { id: "sendok" | "gelas" | "cangkir"; nama: string; ml: number };
export const TAKARAN_B: Takaran[] = [
  { id: "sendok", nama: "sendok", ml: 5 },
  { id: "gelas", nama: "gelas kecil", ml: 100 },
  { id: "cangkir", nama: "cangkir", ml: 240 },
];
export const GELAS_ML = 1000;
export const ML_PER_L = 1000;
export const BALOK = { baris: 5, kolom: 5, lapisan: 2 } as const;
export const MAKS_ALAS = 4;
export const MAKS_LAPIS = 3;

/** Isi wadah setelah n tuangan: ditambah satu takaran tiap tuangan. */
export const isiTuang = (k: KasusTuang, n: number): number => {
  let isi = 0;
  for (let i = 0; i < n; i += 1) isi += k.kecil;
  return isi;
};
/** Banyak kubus satuan: dihitung lapis demi lapis, tiap lapis baris demi baris. */
export const hitungKubus = (baris: number, kolom: number, lapisan: number): number => {
  let n = 0;
  for (let l = 0; l < lapisan; l += 1) for (let b = 0; b < baris; b += 1) n += kolom;
  return n;
};
export const volBalok = (): number => hitungKubus(BALOK.baris, BALOK.kolom, BALOK.lapisan);
export const titikB = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/* ------------------------------ Keadaan ------------------------------ */

export type StateVolumeK4B4B = {
  kasus: number;
  tuang: number;
  baris: number;
  kolom: number;
  lapisan: number;
  takar: number;
  air: number;
  celup: boolean;
  pernah: string[];
  pesan: string;
};

export type AksiVolumeK4B4B =
  | { t: "V_KASUS"; i: number }
  | { t: "V_TUANG" }
  | { t: "V_KOSONG" }
  | { t: "Q_BARIS"; d: 1 | -1 }
  | { t: "Q_KOLOM"; d: 1 | -1 }
  | { t: "Q_LAPIS"; d: 1 | -1 }
  | { t: "Q_CEK" }
  | { t: "R_TAKAR"; i: number }
  | { t: "R_TUANG" }
  | { t: "R_BUANG" }
  | { t: "R_CELUP" }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalVolumeK4B4B = (): StateVolumeK4B4B => ({
  kasus: 0,
  tuang: 0,
  baris: 2,
  kolom: 2,
  lapisan: 1,
  takar: 1,
  air: 0,
  celup: false,
  pernah: [],
  pesan: "",
});

const tambah = (daftar: string[], id: string): string[] => (daftar.includes(id) ? daftar : [...daftar, id]);
const besarAwal = (s: string): string => `${s[0].toUpperCase()}${s.slice(1)}`;

function tuang(x: StateVolumeK4B4B): StateVolumeK4B4B {
  const k = TUANG_B[x.kasus];
  const sekarang = isiTuang(k, x.tuang);
  if (sekarang === k.besar) return { ...x, pernah: tambah(x.pernah, "tumpah"), pesan: `Tumpah! ${besarAwal(k.wadah)} sudah penuh. Volume diukur sampai penuh, tidak lebih.` };
  if (sekarang + k.kecil > k.besar) return { ...x, pernah: tambah(x.pernah, "tumpah"), pesan: `Tumpah! Satu ${k.takar} lagi tidak muat di ${k.wadah}.` };
  const n = x.tuang + 1;
  if (isiTuang(k, n) === k.besar) {
    return { ...x, tuang: n, pernah: tambah(x.pernah, `penuh:${k.id}`), pesan: `✅ ${besarAwal(k.wadah)} penuh dengan ${n} ${k.takar}. Volume ${k.wadah} = ${n} kali volume ${k.takar}.` };
  }
  return { ...x, tuang: n, pesan: "" };
}

function cekKubus(x: StateVolumeK4B4B): StateVolumeK4B4B {
  const satu = hitungKubus(x.baris, x.kolom, 1);
  const v = hitungKubus(x.baris, x.kolom, x.lapisan);
  const pernah = tambah(tambah(x.pernah, `kubus:${x.baris}x${x.kolom}x${x.lapisan}`), `vol:${v}:lapis:${x.lapisan}`);
  const jumlah = Array.from({ length: x.lapisan }, () => satu).join(" + ");
  const urai = x.lapisan === 1 ? `Satu lapisan ${x.baris} × ${x.kolom} = ${satu} kubus.` : `Satu lapisan ${x.baris} × ${x.kolom} = ${satu} kubus. ${x.lapisan} lapisan: ${jumlah} = ${v} kubus.`;
  return { ...x, pernah, pesan: `✅ ${urai} Volumenya ${v} cm³.` };
}

function tuangTakar(x: StateVolumeK4B4B): StateVolumeK4B4B {
  const t = TAKARAN_B[x.takar];
  const naik = x.celup ? volBalok() : 0;
  if (x.air + t.ml + naik > GELAS_ML) return { ...x, pernah: tambah(x.pernah, "tumpah"), pesan: `Tumpah! Satu ${t.nama} (${t.ml} ml) lagi melewati 1.000 ml. Pakai takaran yang lebih kecil.` };
  const air = x.air + t.ml;
  if (air === GELAS_ML && !x.celup) return { ...x, air, pernah: tambah(x.pernah, "liter"), pesan: `✅ Tepat 1.000 ml air. 1.000 ml = 1 l.` };
  return { ...x, air, pesan: "" };
}

function celup(x: StateVolumeK4B4B): StateVolumeK4B4B {
  if (x.celup) return { ...x, celup: false, pesan: "" };
  const v = volBalok();
  if (x.air === 0) return { ...x, pesan: "Gelas takar masih kosong. Tuang air dulu, lalu celupkan balok." };
  if (x.air + v > GELAS_ML) return { ...x, pernah: tambah(x.pernah, "tumpah"), pesan: `Air bisa tumpah. Balok menaikkan muka air ${v} ml. Buang sedikit air dulu.` };
  return {
    ...x,
    celup: true,
    pernah: tambah(x.pernah, "celup"),
    pesan: `✅ Muka air naik dari ${titikB(x.air)} ml ke ${titikB(x.air + v)} ml, naik ${v} ml. Balok berisi ${v} kubus satuan = ${v} cm³. Jadi 1 cm³ = 1 ml.`,
  };
}

const atur = (x: StateVolumeK4B4B, kunci: "baris" | "kolom" | "lapisan", d: number, maks: number, nama: string): StateVolumeK4B4B => {
  const v = x[kunci] + d;
  if (v < 1 || v > maks) return { ...x, pesan: `${nama} 1 sampai ${maks}.` };
  return { ...x, [kunci]: v, pesan: "" };
};

export function langkahVolumeK4B4B(x: StateVolumeK4B4B, a: AksiVolumeK4B4B): StateVolumeK4B4B {
  switch (a.t) {
    case "V_KASUS":
      if (!Number.isInteger(a.i) || a.i < 0 || a.i >= TUANG_B.length) return x;
      return { ...x, kasus: a.i, tuang: 0, pesan: "" };
    case "V_TUANG":
      return tuang(x);
    case "V_KOSONG":
      return { ...x, tuang: 0, pesan: "" };
    case "Q_BARIS":
      return atur(x, "baris", a.d, MAKS_ALAS, "Baris");
    case "Q_KOLOM":
      return atur(x, "kolom", a.d, MAKS_ALAS, "Kolom");
    case "Q_LAPIS":
      return atur(x, "lapisan", a.d, MAKS_LAPIS, "Lapisan");
    case "Q_CEK":
      return cekKubus(x);
    case "R_TAKAR":
      if (!Number.isInteger(a.i) || a.i < 0 || a.i >= TAKARAN_B.length) return x;
      return { ...x, takar: a.i, pesan: "" };
    case "R_TUANG":
      return tuangTakar(x);
    case "R_BUANG":
      return { ...x, air: 0, celup: false, pesan: "" };
    case "R_CELUP":
      return celup(x);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalVolumeK4B4B();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanVolumeK4B4B = { alat: "volume"; pernah: string[] };
export const keadaanVolumeK4B4B = (x: StateVolumeK4B4B): KeadaanVolumeK4B4B => ({ alat: "volume", pernah: x.pernah });

export const ucapTuangK4B4B = (x: StateVolumeK4B4B): string => {
  const k = TUANG_B[x.kasus];
  return `${besarAwal(k.wadah)} diisi dari ${k.takar}. Sudah ${x.tuang} kali dituang. Isi sampai penuh tanpa tumpah.`;
};
export const ucapKubusK4B4B = (x: StateVolumeK4B4B): string =>
  `Alas ${x.baris} baris, tiap baris ${x.kolom} kubus. Ada ${x.lapisan} lapisan. Hitung kubus satu lapisan, lalu kalikan dengan banyak lapisan.`;
export const ucapTakarK4B4B = (x: StateVolumeK4B4B): string =>
  `Air di gelas takar ${titikB(x.air + (x.celup ? volBalok() : 0))} ml. Takaran ${TAKARAN_B[x.takar].nama} berisi ${TAKARAN_B[x.takar].ml} ml. Gelas takar penuh pada 1.000 ml.`;
