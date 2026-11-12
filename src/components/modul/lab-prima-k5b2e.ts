/**
 * Lab Pohon Prima (Kelas 5 Bab 2, Sub-Bab E): logika murni. Satu alat, tiga tampilan.
 *  Prima  : sebuah bilangan. Anak mencari semua faktornya, lalu menyatakan prima atau bukan. Prima punya tepat dua
 *           faktor, 1 dan dirinya. Satu hanya punya satu faktor, jadi bukan prima.
 *  Pohon  : pohon faktor. Anak memilih sebuah daun yang belum prima, lalu membaginya dengan bilangan prima. Daun itu
 *           pecah menjadi bilangan prima tadi dan hasil baginya. Selesai bila semua daun prima.
 *  Gabung : faktorisasi prima dua bilangan ditulis berdampingan. Anak memilih berapa kali tiap bilangan prima diambil
 *           untuk KPK (jumlah terbanyak) atau FPB (jumlah paling sedikit), lalu memeriksa hasilnya.
 * Data dari Buku Siswa Kelas V Bab 2 Sub-Bab E (prima 2, 17, 29, 1, 15, 49; faktorisasi 12, 196, 300; 72 dan 150,
 * 27 dan 81, 15 dan 28, 42 dan 60). Semua bilangan bulat.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k5b2.mjs.
 */

export const DATA_PRIMA = [17, 1, 15, 49, 29, 2];
export const DATA_POHON = [12, 196, 300];
export const PEMBAGI_PRIMA = [2, 3, 5, 7];
export const DATA_GABUNG: [number, number][] = [
  [72, 150],
  [27, 81],
  [15, 28],
  [42, 60],
];

/* ------------------------------ Hitungan ------------------------------ */

export const daftarFaktorE = (n: number): number[] => Array.from({ length: n }, (_, i) => i + 1).filter((d) => n % d === 0);
export const adalahPrimaE = (n: number): boolean => daftarFaktorE(n).length === 2;
/** Faktorisasi prima: daftar bilangan prima dari yang terkecil, berulang sesuai banyaknya. */
export const faktorisasiE = (n: number): number[] => {
  const hasil: number[] = [];
  let sisa = n;
  for (let p = 2; p <= sisa; p += 1) {
    while (sisa % p === 0) {
      hasil.push(p);
      sisa = sisa / p;
    }
  }
  return hasil;
};
const banyakPrima = (n: number, p: number): number => faktorisasiE(n).filter((v) => v === p).length;
/** Bilangan prima yang muncul di salah satu dari dua bilangan, urut naik. */
export const primaGabung = (a: number, b: number): number[] => [...new Set([...faktorisasiE(a), ...faktorisasiE(b)])].sort((p, q) => p - q);
export const hitungA = (a: number, b: number): number[] => primaGabung(a, b).map((p) => banyakPrima(a, p));
export const hitungB = (a: number, b: number): number[] => primaGabung(a, b).map((p) => banyakPrima(b, p));
export type ModeGabung = "kpk" | "fpb";
/** Kunci jumlah ambil per bilangan prima: KPK terbanyak, FPB paling sedikit. */
export const kunciGabung = (a: number, b: number, mode: ModeGabung): number[] => {
  const ca = hitungA(a, b);
  const cb = hitungB(a, b);
  return ca.map((v, i) => (mode === "kpk" ? Math.max(v, cb[i]) : Math.min(v, cb[i])));
};
/** Hasil kali bilangan prima sebanyak jumlah ambil (1 bila tidak ada yang diambil). */
export const hasilGabung = (primaList: number[], ambil: number[]): number => {
  let h = 1;
  primaList.forEach((p, i) => {
    for (let k = 0; k < ambil[i]; k += 1) h *= p;
  });
  return h;
};
const sambungKali = (daftar: number[]): string => (daftar.length === 0 ? "1" : daftar.join(" × "));
export const teksGabung = (primaList: number[], ambil: number[]): string => sambungKali(primaList.flatMap((p, i) => Array.from({ length: ambil[i] }, () => p)));

/* ------------------------------ Keadaan ------------------------------ */

export type StatePrimaK5B2E = {
  prima: { data: number; cari: boolean; ditemukan: number[] };
  pohon: { data: number; daun: number[]; pilih: number | null };
  gabung: { data: number; mode: ModeGabung; ambil: number[] };
  pernah: string[];
  pesan: string;
};

export type AksiPrimaK5B2E =
  | { t: "P_DATA"; i: number }
  | { t: "P_CARI" }
  | { t: "P_JAWAB"; prima: boolean }
  | { t: "O_DATA"; i: number }
  | { t: "O_PILIH"; i: number }
  | { t: "O_BAGI"; p: number }
  | { t: "O_ULANG" }
  | { t: "G_DATA"; i: number }
  | { t: "G_MODE"; mode: ModeGabung }
  | { t: "G_NAIK"; k: number }
  | { t: "G_TURUN"; k: number }
  | { t: "G_PERIKSA" }
  | { t: "PESAN_KOSONG" }
  | { t: "RESET" };

const nolGabung = (i: number): number[] => primaGabung(DATA_GABUNG[i][0], DATA_GABUNG[i][1]).map(() => 0);

export const awalPrimaK5B2E = (): StatePrimaK5B2E => ({
  prima: { data: 0, cari: false, ditemukan: [] },
  pohon: { data: 0, daun: [DATA_POHON[0]], pilih: null },
  gabung: { data: 0, mode: "kpk", ambil: nolGabung(0) },
  pernah: [],
  pesan: "",
});

const tambah = (daftar: string[], ...id: string[]): string[] => id.reduce((a, v) => (a.includes(v) ? a : [...a, v]), daftar);
const sah = (i: number, n: number): boolean => Number.isInteger(i) && i >= 0 && i < n;

export const bilPrima = (x: StatePrimaK5B2E): number => DATA_PRIMA[x.prima.data];
export const bilPohon = (x: StatePrimaK5B2E): number => DATA_POHON[x.pohon.data];
export const pasanganGabung = (x: StatePrimaK5B2E): [number, number] => DATA_GABUNG[x.gabung.data];
export const primaDaftarGabung = (x: StatePrimaK5B2E): number[] => primaGabung(...pasanganGabung(x));
/** Batas atas jumlah ambil untuk bilangan prima ke-k: yang terbanyak di kedua bilangan. */
export const batasAmbil = (x: StatePrimaK5B2E, k: number): number => {
  const [a, b] = pasanganGabung(x);
  return Math.max(hitungA(a, b)[k], hitungB(a, b)[k]);
};
export const semuaDaunPrima = (x: StatePrimaK5B2E): boolean => x.pohon.daun.every(adalahPrimaE);

function jawabPrima(x: StatePrimaK5B2E, prima: boolean): StatePrimaK5B2E {
  const n = bilPrima(x);
  if (!x.prima.cari) return { ...x, pesan: "Cari dulu semua faktornya, lalu putuskan." };
  const faktor = daftarFaktorE(n);
  const benar = faktor.length === 2;
  if (prima !== benar) {
    if (n === 1) return { ...x, pesan: "1 hanya punya satu faktor. Bilangan prima punya tepat dua faktor." };
    if (prima) return { ...x, pesan: `${n} punya faktor selain 1 dan ${n}, misalnya ${faktor[1]}. Jadi ${n} bukan bilangan prima.` };
    return { ...x, pesan: `${n} hanya punya dua faktor, 1 dan ${n}. Itu ciri bilangan prima.` };
  }
  const ditemukan = benar && !x.prima.ditemukan.includes(n) ? [...x.prima.ditemukan, n].sort((p, q) => p - q) : x.prima.ditemukan;
  const baru = { ...x, prima: { ...x.prima, ditemukan }, pernah: tambah(x.pernah, `prima:${n}`) };
  if (n === 1) return { ...baru, pesan: "✅ Tepat! 1 hanya punya satu faktor, yaitu 1. Bilangan prima punya tepat dua faktor, jadi 1 bukan bilangan prima." };
  if (benar) return { ...baru, pesan: `✅ Tepat! ${n} hanya punya dua faktor, 1 dan ${n}. Jadi ${n} bilangan prima.` };
  return { ...baru, pesan: `✅ Tepat! ${n} punya ${faktor.length} faktor: ${faktor.join(", ")}. Jadi ${n} bukan bilangan prima, sebab ${n} = ${faktor[1]} × ${n / faktor[1]}.` };
}

function bagiPohon(x: StatePrimaK5B2E, p: number): StatePrimaK5B2E {
  if (!PEMBAGI_PRIMA.includes(p)) return x;
  const i = x.pohon.pilih;
  if (i === null) return { ...x, pesan: "Pilih dulu satu daun yang belum prima." };
  const v = x.pohon.daun[i];
  if (v % p !== 0) return { ...x, pesan: `${v} dibagi ${p} bersisa ${v % p}. ${p} bukan faktor ${v}.` };
  const daun = [...x.pohon.daun.slice(0, i), p, v / p, ...x.pohon.daun.slice(i + 1)];
  const baru = { ...x, pohon: { ...x.pohon, daun, pilih: null } };
  const n = bilPohon(x);
  if (semuaDaunPrima(baru)) {
    const urut = [...daun].sort((a, b) => a - b);
    return { ...baru, pernah: tambah(baru.pernah, `pohon:${n}`), pesan: `✅ ${v} = ${p} × ${v / p}. Semua daun sudah prima: ${n} = ${urut.join(" × ")}.` };
  }
  return { ...baru, pesan: `✅ ${v} = ${p} × ${v / p}. Pilih daun yang belum prima, lalu bagi lagi.` };
}

function periksaGabung(x: StatePrimaK5B2E): StatePrimaK5B2E {
  const [a, b] = pasanganGabung(x);
  const mode = x.gabung.mode;
  const daftar = primaDaftarGabung(x);
  const kunci = kunciGabung(a, b, mode);
  const lain = kunciGabung(a, b, mode === "kpk" ? "fpb" : "kpk");
  const nama = mode === "kpk" ? "KPK" : "FPB";
  const ambil = x.gabung.ambil;
  if (ambil.every((v) => v === 0) && kunci.some((v) => v > 0)) return { ...x, pesan: "Belum ada faktor prima yang diambil. Atur jumlah tiap faktor prima, lalu periksa." };
  const salah = ambil.findIndex((v, i) => v !== kunci[i]);
  if (salah >= 0) {
    const p = daftar[salah];
    const ca = hitungA(a, b)[salah];
    const cb = hitungB(a, b)[salah];
    const aturan = mode === "kpk" ? "KPK mengambil yang terbanyak." : "FPB mengambil yang paling sedikit.";
    const tertukar = ambil.every((v, i) => v === lain[i]) && lain.some((v, i) => v !== kunci[i]);
    const awal = tertukar ? `Itu cara ${mode === "kpk" ? "FPB" : "KPK"}. ` : "";
    return { ...x, pesan: `${awal}Faktor prima ${p}: muncul ${ca} kali di ${a} dan ${cb} kali di ${b}. ${aturan}` };
  }
  const nilai = hasilGabung(daftar, ambil);
  const isi = ambil.every((v) => v === 0) ? "tidak ada faktor prima yang sama, jadi FPB = 1" : `${teksGabung(daftar, ambil)} = ${nilai}`;
  return { ...x, pernah: tambah(x.pernah, `gabung:${a}:${b}:${mode}`), pesan: `✅ ${nama} ${a} dan ${b}: ${isi}.` };
}

export function langkahPrimaK5B2E(x: StatePrimaK5B2E, a: AksiPrimaK5B2E): StatePrimaK5B2E {
  switch (a.t) {
    case "P_DATA":
      return sah(a.i, DATA_PRIMA.length) ? { ...x, prima: { ...x.prima, data: a.i, cari: false }, pesan: "" } : x;
    case "P_CARI":
      return { ...x, prima: { ...x.prima, cari: true }, pesan: "" };
    case "P_JAWAB":
      return jawabPrima(x, a.prima);
    case "O_DATA":
      return sah(a.i, DATA_POHON.length) ? { ...x, pohon: { data: a.i, daun: [DATA_POHON[a.i]], pilih: null }, pesan: "" } : x;
    case "O_PILIH": {
      if (!sah(a.i, x.pohon.daun.length)) return x;
      const v = x.pohon.daun[a.i];
      if (adalahPrimaE(v)) return { ...x, pohon: { ...x.pohon, pilih: null }, pesan: `${v} sudah prima, tidak perlu dibagi lagi. Pilih daun yang lain.` };
      return { ...x, pohon: { ...x.pohon, pilih: a.i }, pesan: "" };
    }
    case "O_BAGI":
      return bagiPohon(x, a.p);
    case "O_ULANG":
      return { ...x, pohon: { ...x.pohon, daun: [bilPohon(x)], pilih: null }, pesan: "" };
    case "G_DATA":
      return sah(a.i, DATA_GABUNG.length) ? { ...x, gabung: { data: a.i, mode: x.gabung.mode, ambil: nolGabung(a.i) }, pesan: "" } : x;
    case "G_MODE":
      return a.mode === "kpk" || a.mode === "fpb" ? { ...x, gabung: { ...x.gabung, mode: a.mode, ambil: nolGabung(x.gabung.data) }, pesan: "" } : x;
    case "G_NAIK": {
      if (!sah(a.k, x.gabung.ambil.length)) return x;
      if (x.gabung.ambil[a.k] >= batasAmbil(x, a.k)) return { ...x, pesan: `Faktor prima ${primaDaftarGabung(x)[a.k]} paling banyak ${batasAmbil(x, a.k)} kali, sebanyak yang ada di bilangan itu.` };
      return { ...x, gabung: { ...x.gabung, ambil: x.gabung.ambil.map((v, i) => (i === a.k ? v + 1 : v)) }, pesan: "" };
    }
    case "G_TURUN":
      if (!sah(a.k, x.gabung.ambil.length) || x.gabung.ambil[a.k] === 0) return x;
      return { ...x, gabung: { ...x.gabung, ambil: x.gabung.ambil.map((v, i) => (i === a.k ? v - 1 : v)) }, pesan: "" };
    case "G_PERIKSA":
      return periksaGabung(x);
    case "PESAN_KOSONG":
      return { ...x, pesan: "" };
    case "RESET":
      return awalPrimaK5B2E();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanPrimaK5B2E = { alat: "prima"; pernah: string[] };
export const keadaanPrimaK5B2E = (x: StatePrimaK5B2E): KeadaanPrimaK5B2E => ({ alat: "prima", pernah: x.pernah });

export const ucapPrimaK5B2E = (x: StatePrimaK5B2E): string =>
  `Apakah ${bilPrima(x)} bilangan prima? Cari semua faktornya dulu. Bilangan prima punya tepat dua faktor, 1 dan bilangan itu sendiri.`;
export const ucapPohonK5B2E = (x: StatePrimaK5B2E): string =>
  `Pohon faktor ${bilPohon(x)}. Pilih daun yang belum prima, lalu bagi dengan bilangan prima. Sekarang ada ${x.pohon.daun.length} daun.`;
export const ucapGabungK5B2E = (x: StatePrimaK5B2E): string => {
  const [a, b] = pasanganGabung(x);
  return `Cari ${x.gabung.mode === "kpk" ? "KPK" : "FPB"} dari ${a} dan ${b} lewat faktor prima. ${x.gabung.mode === "kpk" ? "KPK mengambil jumlah terbanyak." : "FPB mengambil jumlah paling sedikit."} Atur jumlah tiap faktor prima, lalu periksa.`;
};
