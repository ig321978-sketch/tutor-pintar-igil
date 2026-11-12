/**
 * Lab Gabungan (Kelas 5 Bab 5, Sub-Bab C: Luas Daerah Bangun Gabungan): logika murni. Satu alat, tiga tampilan.
 *  Uraikan : bangun gabungan diurai menjadi bagian yang punya rumus. Anak menghitung luas tiap bagian, lalu menjumlahkan
 *            semuanya (Composite Area Strategy, Additive Decomposition).
 *  Silang  : denah L diurai dengan dua cara, cara Yohana dan cara Komang. Anak menghitung luas dengan kedua cara, lalu
 *            memeriksa bahwa hasilnya sama.
 *  Tumpang : dua bangun saling menumpuk. Bagian yang menumpuk hanya dihitung satu kali.
 * Data dari Buku Siswa Kelas V Bab 5 Sub-Bab C (12 + 8, 24 + 12, 15 + 10 + 5, cara Yohana dan Komang).
 * Konsep sub-bab berikutnya (hubungan dengan tepi dan bentuk tetap) tidak dipakai di sini.
 * Semua bilangan bulat, dan setengah hanya dipakai bila hasil kalinya genap. Murni: tanpa React, tanpa jaringan,
 * tanpa impor. Diuji di scripts/uji-lab-k5b5.mjs.
 */

export type JenisBagian = "pp" | "segitiga" | "jajar";
export type Bagian = { jenis: JenisBagian; a: number; t: number };
export type Uraian = { nama: string; bagian: Bagian[] };
/** Denah L: persegi panjang W kali H dengan takik w kali h di sudut kanan atas. */
export type DenahL = { W: number; H: number; w: number; h: number };
export type Kotak = { x: number; y: number; w: number; h: number };
export type Tumpukan = { A: Kotak; B: Kotak };

export const DATA_URAIAN: Uraian[] = [
  { nama: "denah rumah", bagian: [{ jenis: "pp", a: 4, t: 3 }, { jenis: "pp", a: 4, t: 2 }] },
  { nama: "papan nama", bagian: [{ jenis: "jajar", a: 6, t: 4 }, { jenis: "segitiga", a: 6, t: 4 }] },
  { nama: "taman tiga bagian", bagian: [{ jenis: "pp", a: 5, t: 3 }, { jenis: "pp", a: 5, t: 2 }, { jenis: "segitiga", a: 5, t: 2 }] },
  { nama: "ruang tamu", bagian: [{ jenis: "pp", a: 4, t: 4 }, { jenis: "pp", a: 3, t: 3 }] },
  { nama: "pintu gerbang", bagian: [{ jenis: "pp", a: 5, t: 4 }, { jenis: "segitiga", a: 4, t: 4 }] },
];
export const DATA_SILANG: DenahL[] = [
  { W: 5, H: 4, w: 2, h: 2 },
  { W: 6, H: 4, w: 2, h: 2 },
];
export const DATA_TUMPANG: Tumpukan[] = [
  { A: { x: 0, y: 0, w: 4, h: 3 }, B: { x: 2, y: 0, w: 4, h: 3 } },
  { A: { x: 0, y: 0, w: 5, h: 2 }, B: { x: 3, y: 0, w: 3, h: 2 } },
];
export const NAMA_BAGIAN: Record<JenisBagian, string> = { pp: "persegi panjang", segitiga: "segitiga", jajar: "jajargenjang" };

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

/** Luas satu bagian menurut rumusnya. Segitiga hanya dengan hasil kali genap. */
export const luasBagian = (b: Bagian): number => (b.jenis === "segitiga" ? (b.a * b.t) / 2 : b.a * b.t);
export const rumusBagian = (b: Bagian): string => (b.jenis === "segitiga" ? `½ × ${b.a} × ${b.t}` : `${b.a} × ${b.t}`);
export const luasUraian = (u: Uraian): number => jumlah(u.bagian.map(luasBagian));
export const tulisJumlah = (u: Uraian): string => `${u.bagian.map(luasBagian).join(" + ")} = ${luasUraian(u)}`;
/** Bagian terkecil, untuk pengecoh: bagian terlewat atau dihitung dua kali. */
export const bagianTerkecil = (u: Uraian): number => Math.min(...u.bagian.map(luasBagian));

/** Pilihan luas satu bagian: yang benar, dan dua pengecoh sesuai jenis bangun. */
export function opsiBagian(i: number, k: number): number[] {
  const b = DATA_URAIAN[i].bagian[k];
  const benar = luasBagian(b);
  const kandidat = b.jenis === "segitiga" ? [b.a * b.t, b.a + b.t] : b.jenis === "jajar" ? [b.a + b.t, (b.a * b.t) / 2] : [b.a + b.t, 2 * (b.a + b.t)];
  return putar([benar, ...pengecoh(benar, kandidat)], i + k);
}
/** Pilihan luas gabungan: yang benar, satu bagian terlewat, dan satu bagian dihitung dua kali. */
export function opsiTotal(i: number): number[] {
  const u = DATA_URAIAN[i];
  const benar = luasUraian(u);
  return putar([benar, ...pengecoh(benar, [benar - bagianTerkecil(u), benar + bagianTerkecil(u)])], i);
}

/** Dua cara menguraikan denah L: cara 1 dipotong mendatar, cara 2 dipotong tegak. */
export function caraBagian(d: DenahL, c: number): number[] {
  return c === 1 ? [d.W * (d.H - d.h), (d.W - d.w) * d.h] : [(d.W - d.w) * d.H, d.w * (d.H - d.h)];
}
export const luasDenahL = (d: DenahL): number => d.W * d.H - d.w * d.h;
export function opsiSilang(i: number, c: number): number[] {
  const d = DATA_SILANG[i];
  const benar = luasDenahL(d);
  return putar([benar, ...pengecoh(benar, [d.W * d.H, caraBagian(d, c)[0]])], i + c);
}

export const luasKotak = (k: Kotak): number => k.w * k.h;
/** Ukuran bagian yang menumpuk: lebar dan tinggi irisan dua kotak. */
export function irisan(t: Tumpukan): { w: number; h: number } {
  const w = Math.max(0, Math.min(t.A.x + t.A.w, t.B.x + t.B.w) - Math.max(t.A.x, t.B.x));
  const h = Math.max(0, Math.min(t.A.y + t.A.h, t.B.y + t.B.h) - Math.max(t.A.y, t.B.y));
  return { w, h };
}
export const luasIrisan = (t: Tumpukan): number => irisan(t).w * irisan(t).h;
export const luasGabunganTumpang = (t: Tumpukan): number => luasKotak(t.A) + luasKotak(t.B) - luasIrisan(t);
export function opsiIrisan(i: number): number[] {
  const t = DATA_TUMPANG[i];
  const benar = luasIrisan(t);
  return putar([benar, ...pengecoh(benar, [Math.min(luasKotak(t.A), luasKotak(t.B)), irisan(t).w + irisan(t).h])], i);
}
export function opsiTotalTumpang(i: number): number[] {
  const t = DATA_TUMPANG[i];
  const benar = luasGabunganTumpang(t);
  return putar([benar, ...pengecoh(benar, [luasKotak(t.A) + luasKotak(t.B), Math.max(luasKotak(t.A), luasKotak(t.B))])], i + 1);
}

/* ------------------------------ Keadaan ------------------------------ */

export type StateGabunganK5B5C = {
  uraikan: { data: number; bagianOk: boolean[] };
  silang: { data: number; ok1: boolean; ok2: boolean };
  tumpang: { data: number; irisanOk: boolean };
  pernah: string[];
  pesan: string;
};

export type AksiGabunganK5B5C =
  | { t: "U_DATA"; i: number }
  | { t: "U_BAGIAN"; k: number; nilai: number }
  | { t: "U_TOTAL"; nilai: number }
  | { t: "SI_DATA"; i: number }
  | { t: "SI_TOTAL"; c: number; nilai: number }
  | { t: "SI_SAMA"; jawab: string }
  | { t: "TU_DATA"; i: number }
  | { t: "TU_IRISAN"; nilai: number }
  | { t: "TU_TOTAL"; nilai: number }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

const uraianBaru = (i: number) => ({ data: i, bagianOk: DATA_URAIAN[i].bagian.map(() => false) });

export const awalGabunganK5B5C = (): StateGabunganK5B5C => ({
  uraikan: uraianBaru(0),
  silang: { data: 0, ok1: false, ok2: false },
  tumpang: { data: 0, irisanOk: false },
  pernah: [],
  pesan: "",
});

export const dataUraian = (x: StateGabunganK5B5C): Uraian => DATA_URAIAN[x.uraikan.data];
export const dataSilang = (x: StateGabunganK5B5C): DenahL => DATA_SILANG[x.silang.data];
export const dataTumpang = (x: StateGabunganK5B5C): Tumpukan => DATA_TUMPANG[x.tumpang.data];
export const semuaBagianOk = (x: StateGabunganK5B5C): boolean => x.uraikan.bagianOk.every(Boolean);

function pilihBagian(x: StateGabunganK5B5C, k: number, n: number): StateGabunganK5B5C {
  const i = x.uraikan.data;
  const u = DATA_URAIAN[i];
  if (!Number.isInteger(k) || k < 0 || k >= u.bagian.length || !opsiBagian(i, k).includes(n)) return x;
  const b = u.bagian[k];
  const tandai = (ok: boolean) => ({ ...x.uraikan, bagianOk: x.uraikan.bagianOk.map((v, j) => (j === k ? ok : v)) });
  if (n === luasBagian(b)) {
    return { ...x, uraikan: tandai(true), pesan: `✅ Bagian ${k + 1}, ${NAMA_BAGIAN[b.jenis]}: ${rumusBagian(b)} = ${n} cm².` };
  }
  const salah =
    b.jenis === "segitiga" && n === b.a * b.t
      ? `${n} adalah luas persegi panjang. Segitiga hanya setengahnya.`
      : b.jenis === "jajar" && n === (b.a * b.t) / 2
        ? `${n} terlalu kecil. Luas jajargenjang adalah alas dikali tinggi, tidak dibagi dua.`
        : n === b.a + b.t
          ? `${n} baru jumlah dua ukuran. Pakai rumus luas ${NAMA_BAGIAN[b.jenis]}.`
          : `${n} bukan luas ${NAMA_BAGIAN[b.jenis]} ini. Pakai rumus luasnya.`;
  return { ...x, uraikan: tandai(false), pesan: salah };
}

function pilihTotal(x: StateGabunganK5B5C, n: number): StateGabunganK5B5C {
  const i = x.uraikan.data;
  const u = DATA_URAIAN[i];
  if (!opsiTotal(i).includes(n)) return x;
  if (!semuaBagianOk(x)) return { ...x, pesan: "Hitung dulu luas semua bagian dengan rumusnya, lalu jumlahkan." };
  if (n === luasUraian(u)) {
    return { ...x, pernah: catat(x.pernah, `uraikan:${i}`), pesan: `✅ ${tulisJumlah(u)} cm². Tidak ada bagian yang terlewat dan tidak ada yang dihitung dua kali.` };
  }
  if (n < luasUraian(u)) return { ...x, pesan: `${n} kurang: ada bagian yang terlewat. Jumlahkan luas semua bagian.` };
  return { ...x, pesan: `${n} kelebihan: ada bagian yang dihitung dua kali. Tiap bagian dijumlah satu kali.` };
}

function pilihSilang(x: StateGabunganK5B5C, c: number, n: number): StateGabunganK5B5C {
  const i = x.silang.data;
  const d = DATA_SILANG[i];
  if ((c !== 1 && c !== 2) || !opsiSilang(i, c).includes(n)) return x;
  const [p, q] = caraBagian(d, c);
  if (n === luasDenahL(d)) {
    const silang = { ...x.silang, ok1: c === 1 ? true : x.silang.ok1, ok2: c === 2 ? true : x.silang.ok2 };
    return { ...x, silang, pesan: `✅ Cara ${c}: ${p} + ${q} = ${n} cm².` };
  }
  const silang = { ...x.silang, ok1: c === 1 ? false : x.silang.ok1, ok2: c === 2 ? false : x.silang.ok2 };
  if (n === d.W * d.H) return { ...x, silang, pesan: `${n} menghitung persegi panjang besar, termasuk takik yang kosong. Jumlahkan hanya dua bagian denah.` };
  return { ...x, silang, pesan: `${n} baru satu bagian. Jumlahkan kedua bagian denah.` };
}

function periksaSama(x: StateGabunganK5B5C, jawab: string): StateGabunganK5B5C {
  if (jawab !== "sama" && jawab !== "beda") return x;
  if (!x.silang.ok1 || !x.silang.ok2) return { ...x, pesan: "Hitung dulu luas denah dengan cara 1 dan cara 2, lalu bandingkan hasilnya." };
  const d = dataSilang(x);
  if (jawab === "beda") return { ...x, pesan: "Dua cara menguraikan bangun yang sama, jadi luasnya harus sama. Periksa lagi hasil kedua cara." };
  return {
    ...x,
    pernah: catat(x.pernah, `silang:${x.silang.data}`),
    pesan: `✅ Kedua cara menghasilkan ${luasDenahL(d)} cm². Bangun yang sama punya luas yang sama, apa pun cara menguraikannya.`,
  };
}

function pilihIrisan(x: StateGabunganK5B5C, n: number): StateGabunganK5B5C {
  const i = x.tumpang.data;
  const t = DATA_TUMPANG[i];
  if (!opsiIrisan(i).includes(n)) return x;
  if (n === luasIrisan(t)) {
    const { w, h } = irisan(t);
    return { ...x, tumpang: { ...x.tumpang, irisanOk: true }, pesan: `✅ Bagian yang menumpuk ${w} × ${h} = ${n} cm². Bagian ini ada di kedua bangun.` };
  }
  return { ...x, tumpang: { ...x.tumpang, irisanOk: false }, pesan: `${n} bukan bagian yang menumpuk. Hitung luas daerah yang dimiliki kedua bangun sekaligus.` };
}

function pilihTotalTumpang(x: StateGabunganK5B5C, n: number): StateGabunganK5B5C {
  const i = x.tumpang.data;
  const t = DATA_TUMPANG[i];
  if (!opsiTotalTumpang(i).includes(n)) return x;
  if (!x.tumpang.irisanOk) return { ...x, pesan: "Hitung dulu luas bagian yang menumpuk, lalu luas gabungan kedua bangun." };
  if (n === luasGabunganTumpang(t)) {
    return { ...x, pernah: catat(x.pernah, `tumpang:${i}`), pesan: `✅ ${luasKotak(t.A)} + ${luasKotak(t.B)} − ${luasIrisan(t)} = ${n} cm². Bagian yang menumpuk dihitung satu kali.` };
  }
  if (n === luasKotak(t.A) + luasKotak(t.B)) return { ...x, pesan: `${n} menghitung bagian yang menumpuk dua kali. Kurangi dengan luas bagian yang menumpuk.` };
  return { ...x, pesan: `${n} baru luas satu bangun. Luas gabungan memuat kedua bangun.` };
}

export function langkahGabunganK5B5C(x: StateGabunganK5B5C, a: AksiGabunganK5B5C): StateGabunganK5B5C {
  switch (a.t) {
    case "U_DATA":
      return sah(a.i, DATA_URAIAN.length) ? { ...x, uraikan: uraianBaru(a.i), pesan: "" } : x;
    case "U_BAGIAN":
      return pilihBagian(x, a.k, a.nilai);
    case "U_TOTAL":
      return pilihTotal(x, a.nilai);
    case "SI_DATA":
      return sah(a.i, DATA_SILANG.length) ? { ...x, silang: { data: a.i, ok1: false, ok2: false }, pesan: "" } : x;
    case "SI_TOTAL":
      return pilihSilang(x, a.c, a.nilai);
    case "SI_SAMA":
      return periksaSama(x, a.jawab);
    case "TU_DATA":
      return sah(a.i, DATA_TUMPANG.length) ? { ...x, tumpang: { data: a.i, irisanOk: false }, pesan: "" } : x;
    case "TU_IRISAN":
      return pilihIrisan(x, a.nilai);
    case "TU_TOTAL":
      return pilihTotalTumpang(x, a.nilai);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalGabunganK5B5C();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanGabunganK5B5C = { alat: "gabungan"; pernah: string[] };
export const keadaanGabunganK5B5C = (x: StateGabunganK5B5C): KeadaanGabunganK5B5C => ({ alat: "gabungan", pernah: x.pernah });

export const ucapUraikanK5B5C = (x: StateGabunganK5B5C): string => {
  const u = dataUraian(x);
  const sudah = x.uraikan.bagianOk.filter(Boolean).length;
  const sekarang = semuaBagianOk(x) ? "Semua bagian sudah dihitung. Pilih luas gabungannya." : `Sudah ${sudah} dari ${u.bagian.length} bagian dihitung.`;
  return `Uraikan ${u.nama} menjadi ${u.bagian.length} bagian. ${sekarang}`;
};
export const ucapSilangK5B5C = (x: StateGabunganK5B5C): string => {
  const d = dataSilang(x);
  const sekarang = x.silang.ok1 && x.silang.ok2 ? "Kedua cara sudah dihitung. Apakah hasilnya sama?" : "Hitung luas denah dengan cara 1 dan cara 2.";
  return `Denah L, persegi panjang ${d.W} kali ${d.H} dengan takik ${d.w} kali ${d.h}. ${sekarang}`;
};
export const ucapTumpangK5B5C = (x: StateGabunganK5B5C): string => {
  const t = dataTumpang(x);
  const sekarang = x.tumpang.irisanOk ? "Sekarang pilih luas gabungan." : "Hitung dulu bagian yang menumpuk.";
  return `Dua persegi panjang ${t.A.w} kali ${t.A.h} dan ${t.B.w} kali ${t.B.h} saling menumpuk. ${sekarang}`;
};
