/**
 * Lab Faktor Bersama (Kelas 5 Bab 2, Sub-Bab D): logika murni. Satu alat, tiga tampilan.
 *  Daftar  : dua daftar faktor. Anak menandai faktor yang ada di kedua daftar (faktor persekutuan), lalu memilih yang
 *            terbesar (FPB).
 *  Bagi    : benda dibagi rata ke sebanyak mungkin kelompok (vas, paket) tanpa sisa. Anak mencoba banyak kelompok,
 *            lalu menyatakan banyak yang terbanyak. Banyak itu adalah FPB.
 *  Jembatan: FPB dan KPK dua bilangan dipilih, lalu diperiksa: FPB dikali KPK sama dengan hasil kali kedua bilangan.
 * Data dari Buku Siswa Kelas V Bab 2 Sub-Bab D (12 dan 18, 24 mawar merah dan 18 mawar putih, paket 36, 48, 24;
 * 15 dan 28; 8 dan 12; 6 dan 12). Semua bilangan bulat.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k5b2.mjs.
 */

/** Daftar: pasangan bilangan. */
export const DATA_DAFTAR: [number, number][] = [
  [12, 18],
  [15, 28],
  [8, 12],
  [6, 12],
];
export type DataBagi = { item: number[]; nama: string[]; kelompok: string };
export const DATA_BAGI: DataBagi[] = [
  { item: [24, 18], nama: ["mawar merah", "mawar putih"], kelompok: "vas" },
  { item: [36, 48, 24], nama: ["susu", "lolipop", "biskuit"], kelompok: "paket" },
];
/** Jembatan: pasangan bilangan. */
export const DATA_JEMBATAN: [number, number][] = [
  [12, 18],
  [24, 18],
  [8, 12],
];

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);

/* ------------------------------ Hitungan ------------------------------ */

export const faktorDari = (n: number): number[] => Array.from({ length: n }, (_, i) => i + 1).filter((d) => n % d === 0);
export const persekutuanFaktor = (a: number, b: number): number[] => faktorDari(a).filter((d) => b % d === 0);
export const fpbDari = (a: number, b: number): number => {
  const p = persekutuanFaktor(a, b);
  return p[p.length - 1];
};
export const kpkDari = (a: number, b: number): number => {
  let v = a;
  while (v % b !== 0) v += a;
  return v;
};
/** Banyak kelompok terbanyak yang membagi semua benda sama rata. */
export const kelompokMaks = (item: number[]): number => {
  const paling = Math.min(...item);
  let hasil = 1;
  for (let k = 1; k <= paling; k += 1) if (item.every((v) => v % k === 0)) hasil = k;
  return hasil;
};
const sambung = (bagian: string[]): string => (bagian.length < 2 ? bagian.join("") : `${bagian.slice(0, -1).join(", ")} dan ${bagian[bagian.length - 1]}`);

/** Pilihan FPB: FPB, KPK (tertukar), dan jumlah dua bilangan. */
export function opsiFpb(a: number, b: number, geser: number): number[] {
  return putar([fpbDari(a, b), kpkDari(a, b), a + b], geser);
}
/** Pilihan KPK pada Jembatan: KPK, hasil kali, dan jumlah. */
export function opsiKpkJembatan(a: number, b: number, geser: number): number[] {
  return putar([kpkDari(a, b), a * b, a + b], geser);
}

/* ------------------------------ Keadaan ------------------------------ */

export type StateBersamaK5B2D = {
  daftar: { data: number; tanda: number[]; tandaOk: boolean };
  bagi: { data: number; k: number; rata: number[] };
  jembatan: { data: number; fpbOk: boolean; kpkOk: boolean };
  pernah: string[];
  pesan: string;
};

export type AksiBersamaK5B2D =
  | { t: "F_DATA"; i: number }
  | { t: "F_KLIK"; n: number }
  | { t: "F_BERSIH" }
  | { t: "F_CEK" }
  | { t: "F_FPB"; nilai: number }
  | { t: "R_DATA"; i: number }
  | { t: "R_NAIK" }
  | { t: "R_TURUN" }
  | { t: "R_COBA" }
  | { t: "R_PILIH" }
  | { t: "J_DATA"; i: number }
  | { t: "J_FPB"; nilai: number }
  | { t: "J_KPK"; nilai: number }
  | { t: "J_PERIKSA" }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

export const awalBersamaK5B2D = (): StateBersamaK5B2D => ({
  daftar: { data: 0, tanda: [], tandaOk: false },
  bagi: { data: 0, k: 1, rata: [] },
  jembatan: { data: 0, fpbOk: false, kpkOk: false },
  pernah: [],
  pesan: "",
});

const tambah = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

export const pasanganDaftar = (x: StateBersamaK5B2D): [number, number] => DATA_DAFTAR[x.daftar.data];
export const dataBagi = (x: StateBersamaK5B2D): DataBagi => DATA_BAGI[x.bagi.data];
export const pasanganJembatan = (x: StateBersamaK5B2D): [number, number] => DATA_JEMBATAN[x.jembatan.data];
export const opsiFpbDaftar = (i: number): number[] => opsiFpb(DATA_DAFTAR[i][0], DATA_DAFTAR[i][1], i);
export const opsiFpbJembatan = (i: number): number[] => opsiFpb(DATA_JEMBATAN[i][0], DATA_JEMBATAN[i][1], i + 1);
export const opsiKpkJ = (i: number): number[] => opsiKpkJembatan(DATA_JEMBATAN[i][0], DATA_JEMBATAN[i][1], i + 2);
/** Banyak kelompok sekarang rata untuk semua benda? */
export const rataSekarang = (x: StateBersamaK5B2D): boolean => dataBagi(x).item.every((v) => v % x.bagi.k === 0);
export const isiTiapKelompok = (x: StateBersamaK5B2D): string => {
  const d = dataBagi(x);
  return sambung(d.item.map((v, i) => `${Math.floor(v / x.bagi.k)} ${d.nama[i]}`));
};

function cekDaftar(x: StateBersamaK5B2D): StateBersamaK5B2D {
  const [a, b] = pasanganDaftar(x);
  const kunci = persekutuanFaktor(a, b);
  const tanda = x.daftar.tanda;
  if (tanda.length === 0) return { ...x, pesan: "Belum ada bilangan yang ditandai. Tandai faktor yang ada di kedua daftar, lalu periksa." };
  const lebih = tanda.filter((v) => !kunci.includes(v));
  const kurang = kunci.filter((v) => !tanda.includes(v));
  if (lebih.length > 0) {
    const e = lebih[0];
    return { ...x, daftar: { ...x.daftar, tandaOk: false }, pesan: `${e} hanya faktor ${a % e === 0 ? a : b}. Tandai bilangan yang ada di kedua daftar.` };
  }
  if (kurang.length > 0) {
    const m = kurang[0];
    const tambahan = m === 1 ? " 1 selalu faktor persekutuan, sebab 1 membagi setiap bilangan." : ` Periksa lagi, misalnya ${m}.`;
    return { ...x, daftar: { ...x.daftar, tandaOk: false }, pesan: `Masih ada faktor persekutuan yang terlewat.${tambahan}` };
  }
  return { ...x, daftar: { ...x.daftar, tandaOk: true }, pesan: `✅ Tepat! Faktor persekutuan ${a} dan ${b}: ${kunci.join(", ")}. Sekarang pilih yang terbesar.` };
}

function pilihFpbDaftar(x: StateBersamaK5B2D, nilai: number): StateBersamaK5B2D {
  const i = x.daftar.data;
  const [a, b] = DATA_DAFTAR[i];
  if (!opsiFpbDaftar(i).includes(nilai)) return x;
  if (!x.daftar.tandaOk) return { ...x, pesan: "Tandai dulu semua faktor persekutuan, lalu periksa." };
  const kunci = persekutuanFaktor(a, b);
  const f = kunci[kunci.length - 1];
  if (nilai === f) {
    const pesan =
      kunci.length === 1
        ? `✅ Tepat! Satu-satunya faktor persekutuan adalah 1, jadi FPB dari ${a} dan ${b} adalah 1.`
        : `✅ Tepat! Yang terbesar adalah ${f}, itu FPB dari ${a} dan ${b}.`;
    return { ...x, pernah: tambah(x.pernah, `daftar:${a}:${b}`), pesan };
  }
  if (nilai === kpkDari(a, b)) return { ...x, pesan: `${nilai} adalah KPK, kelipatan persekutuan yang terkecil. FPB adalah faktor persekutuan yang terbesar.` };
  return { ...x, pesan: `${nilai} adalah jumlah dua bilangan, bukan faktor persekutuan. Pilih yang terbesar di antara faktor yang kamu tandai.` };
}

function cobaBagi(x: StateBersamaK5B2D): StateBersamaK5B2D {
  const d = dataBagi(x);
  const k = x.bagi.k;
  const gagal = d.item.findIndex((v) => v % k !== 0);
  if (gagal >= 0) return { ...x, pesan: `${d.item[gagal]} ${d.nama[gagal]} dibagi ke ${k} ${d.kelompok} bersisa ${d.item[gagal] % k}. Belum rata.` };
  const rata = x.bagi.rata.includes(k) ? x.bagi.rata : [...x.bagi.rata, k].sort((p, q) => p - q);
  return { ...x, bagi: { ...x.bagi, rata }, pesan: `✅ ${k} ${d.kelompok}, tiap ${d.kelompok} berisi ${isiTiapKelompok(x)}, tanpa sisa.` };
}

function pilihBagi(x: StateBersamaK5B2D): StateBersamaK5B2D {
  const d = dataBagi(x);
  const k = x.bagi.k;
  if (!rataSekarang(x)) return { ...x, pesan: `${k} ${d.kelompok} belum rata. Coba banyak ${d.kelompok} yang lain dulu.` };
  const f = kelompokMaks(d.item);
  if (k === f) return { ...x, pernah: tambah(x.pernah, `bagi:${d.item.join(":")}`), pesan: `✅ Tepat! ${k} ${d.kelompok} adalah yang terbanyak dengan semua benda rata. Banyak itu adalah FPB dari ${sambung(d.item.map(String))}.` };
  return { ...x, pesan: `Rata, tetapi masih bisa lebih banyak ${d.kelompok}. Coba banyak yang lebih besar.` };
}

function pilihFpbJembatan(x: StateBersamaK5B2D, nilai: number): StateBersamaK5B2D {
  const i = x.jembatan.data;
  const [a, b] = DATA_JEMBATAN[i];
  if (!opsiFpbJembatan(i).includes(nilai)) return x;
  const f = fpbDari(a, b);
  if (nilai === f) return { ...x, jembatan: { ...x.jembatan, fpbOk: true }, pesan: `✅ Benar, FPB dari ${a} dan ${b} adalah ${f}.` };
  const sebab = nilai === kpkDari(a, b) ? `${nilai} adalah KPK, bukan FPB.` : `${nilai} adalah jumlah dua bilangan, bukan FPB.`;
  return { ...x, jembatan: { ...x.jembatan, fpbOk: false }, pesan: `${sebab} FPB adalah faktor persekutuan yang terbesar.` };
}

function pilihKpkJembatan(x: StateBersamaK5B2D, nilai: number): StateBersamaK5B2D {
  const i = x.jembatan.data;
  const [a, b] = DATA_JEMBATAN[i];
  if (!opsiKpkJ(i).includes(nilai)) return x;
  const k = kpkDari(a, b);
  if (nilai === k) return { ...x, jembatan: { ...x.jembatan, kpkOk: true }, pesan: `✅ Benar, KPK dari ${a} dan ${b} adalah ${k}.` };
  const sebab = nilai === a * b ? `${nilai} adalah ${a} × ${b}, bukan KPK.` : `${nilai} adalah jumlah dua bilangan, bukan KPK.`;
  return { ...x, jembatan: { ...x.jembatan, kpkOk: false }, pesan: `${sebab} KPK adalah kelipatan persekutuan yang terkecil.` };
}

function periksaJembatan(x: StateBersamaK5B2D): StateBersamaK5B2D {
  const [a, b] = pasanganJembatan(x);
  if (!x.jembatan.fpbOk || !x.jembatan.kpkOk) return { ...x, pesan: "Pilih dulu FPB dan KPK yang benar, baru periksa jembatannya." };
  const f = fpbDari(a, b);
  const k = kpkDari(a, b);
  return { ...x, pernah: tambah(x.pernah, `jembatan:${a}:${b}`), pesan: `✅ FPB × KPK = ${f} × ${k} = ${f * k}, dan ${a} × ${b} = ${a * b}. Hasil kalinya sama, jadi jembatan cocok.` };
}

export function langkahBersamaK5B2D(x: StateBersamaK5B2D, a: AksiBersamaK5B2D): StateBersamaK5B2D {
  switch (a.t) {
    case "F_DATA":
      return sah(a.i, DATA_DAFTAR.length) ? { ...x, daftar: { data: a.i, tanda: [], tandaOk: false }, pesan: "" } : x;
    case "F_KLIK": {
      const [p, q] = pasanganDaftar(x);
      if (!Number.isInteger(a.n) || !(p % a.n === 0 || q % a.n === 0) || a.n < 1) return x;
      const ada = x.daftar.tanda.includes(a.n);
      const tanda = ada ? x.daftar.tanda.filter((v) => v !== a.n) : [...x.daftar.tanda, a.n].sort((u, v) => u - v);
      return { ...x, daftar: { ...x.daftar, tanda, tandaOk: false }, pesan: "" };
    }
    case "F_BERSIH":
      return { ...x, daftar: { ...x.daftar, tanda: [], tandaOk: false }, pesan: "" };
    case "F_CEK":
      return cekDaftar(x);
    case "F_FPB":
      return pilihFpbDaftar(x, a.nilai);
    case "R_DATA":
      return sah(a.i, DATA_BAGI.length) ? { ...x, bagi: { data: a.i, k: 1, rata: [] }, pesan: "" } : x;
    case "R_NAIK": {
      const batas = Math.min(...dataBagi(x).item);
      if (x.bagi.k >= batas) return { ...x, pesan: `Paling banyak ${batas} ${dataBagi(x).kelompok}, sebab benda paling sedikit hanya ${batas}.` };
      return { ...x, bagi: { ...x.bagi, k: x.bagi.k + 1 }, pesan: "" };
    }
    case "R_TURUN":
      return x.bagi.k <= 1 ? x : { ...x, bagi: { ...x.bagi, k: x.bagi.k - 1 }, pesan: "" };
    case "R_COBA":
      return cobaBagi(x);
    case "R_PILIH":
      return pilihBagi(x);
    case "J_DATA":
      return sah(a.i, DATA_JEMBATAN.length) ? { ...x, jembatan: { data: a.i, fpbOk: false, kpkOk: false }, pesan: "" } : x;
    case "J_FPB":
      return pilihFpbJembatan(x, a.nilai);
    case "J_KPK":
      return pilihKpkJembatan(x, a.nilai);
    case "J_PERIKSA":
      return periksaJembatan(x);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalBersamaK5B2D();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanBersamaK5B2D = { alat: "bersama"; pernah: string[] };
export const keadaanBersamaK5B2D = (x: StateBersamaK5B2D): KeadaanBersamaK5B2D => ({ alat: "bersama", pernah: x.pernah });

export const ucapDaftarK5B2D = (x: StateBersamaK5B2D): string => {
  const [a, b] = pasanganDaftar(x);
  return `Ada dua daftar faktor, faktor ${a} dan faktor ${b}. Tandai faktor yang ada di kedua daftar, periksa, lalu pilih yang terbesar. Sekarang ada ${x.daftar.tanda.length} bilangan yang ditandai.`;
};
export const ucapBagiK5B2D = (x: StateBersamaK5B2D): string => {
  const d = dataBagi(x);
  const isi = sambung(d.item.map((v, i) => `${v} ${d.nama[i]}`));
  return `${isi} dibagi rata ke sebanyak mungkin ${d.kelompok}, tanpa sisa. Sekarang ${x.bagi.k} ${d.kelompok}. Coba banyaknya, lalu pilih yang terbanyak.`;
};
export const ucapJembatanK5B2D = (x: StateBersamaK5B2D): string => {
  const [a, b] = pasanganJembatan(x);
  return `Pilih FPB dan KPK dari ${a} dan ${b}. Lalu periksa jembatannya: FPB dikali KPK harus sama dengan ${a} dikali ${b}.`;
};
