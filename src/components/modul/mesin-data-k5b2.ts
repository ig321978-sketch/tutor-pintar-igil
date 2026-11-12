/**
 * Definisi Mesin Bertahap Kelas 5 Bab 2 (KPK dan FPB), dijalankan mesin berstasiun mesin-bertahap-k3b1.ts dan
 * dieja ejaK5B1. Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari bilangan kasus.
 *  - MESIN_KELIPATAN (A): Lompat → Tabel → Cek → Lanjut   (jarak 3, 7, 9)
 *    Lompat: pendaratan ke-k dari jarak d (pengecoh: jarak ditambah k, satu pendaratan kurang).
 *    Tabel: kelipatan d yang ikut diwarnai di tabel seratus (pengecoh: bilangan tetangga).
 *    Cek: apakah x kelipatan d, lewat sisa pembagian (pengecoh: sisa tertukar, sisa diabaikan).
 *    Lanjut: bilangan setelah empat kelipatan pertama (pengecoh: tambah satu, satu kurang).
 *  - MESIN_KPK (B): Jalur → Irisan → KPK → Jadwal   (2 dan 3, 4 dan 5, 6 dan 8)
 *    Jalur: berapa kali satu pelompat mendarat sampai bertemu (pengecoh: satu kali lebih, pendaratan pelompat lain).
 *    Irisan: banyak bilangan di kedua daftar enam kelipatan (pengecoh: satu lebih, satu kurang).
 *    KPK: kelipatan persekutuan terkecil (pengecoh: jumlah, hasil kali atau dua kali KPK).
 *    Jadwal: tanggal bertemu lagi (pengecoh: lama hari sebagai tanggal, tanggal mulai ditambah jumlah selang).
 *  - MESIN_FAKTOR (C): Susun → Pasangan → Daftar → Cek   (18, 24, 36)
 *    Susun: titik tiap baris pada susunan penuh (pengecoh: satu lebih, banyak baris). Pasangan: pasangan faktor (pengecoh:
 *    selisih, satu lebih). Daftar: banyak faktor (pengecoh: dua kurang, satu lebih). Cek: apakah d faktor n lewat sisa
 *    (pengecoh: menyangka faktor, sisa palsu).
 *  - MESIN_FPB (D): Daftar → FPB → Bagi → Jembatan   (12 dan 18, 36 dan 48, 18 dan 30)
 *    Daftar: banyak faktor persekutuan (pengecoh: satu lebih, satu kurang). FPB: yang terbesar (pengecoh: 1, KPK).
 *    Bagi: bunga merah tiap vas (pengecoh: bunga putih tiap vas, dua kali). Jembatan: KPK dari FPB dan hasil kali
 *    (pengecoh: hasil kali, jumlah).
 * Data dari Buku Siswa Kelas V Bab 2 Sub-Bab A, B, C, dan D (lompat hitung, tabel seratus, habis dibagi, KPK, jadwal).
 * Murni: tanpa React, tanpa jaringan. Hanya impor tipe. Diuji di scripts/uji-lab-k5b2.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));

/* ------------------------------ A: Mesin Kelipatan ------------------------------ */

/** d: jarak lompat. k: pendaratan yang ditanya. j: kelipatan ke-j di tabel seratus. x: bilangan yang dicek. */
export type KasusKelipatan = { id: string; d: number; k: number; j: number; x: number };
export const KASUS_KELIPATAN: KasusKelipatan[] = [
  { id: "3", d: 3, k: 4, j: 8, x: 22 },
  { id: "7", d: 7, k: 6, j: 9, x: 30 },
  { id: "9", d: 9, k: 7, j: 10, x: 40 },
];

export const STASIUN_KELIPATAN: StasiunDef[] = [
  { id: "lompat", nama: "Lompat", ikon: "🦘" },
  { id: "tabel", nama: "Tabel", ikon: "🧮" },
  { id: "cek", nama: "Cek", ikon: "➗" },
  { id: "lanjut", nama: "Lanjut", ikon: "➡️" },
];

export function kasusMesinKelipatan(c: KasusKelipatan, idx: number): KasusMesin {
  const { d, k, j, x } = c;
  const mendarat = d * k;
  const diTabel = d * j;
  const sisa = x % d;
  const awal = [1, 2, 3, 4].map((m) => d * m);
  const lanjut = d * 5;
  const langkah: LangkahMesin[] = [
    {
      stasiun: "lompat",
      tanya: `Melompat dengan jarak ${d} dari nol. Pendaratan ke-${k} berada di …`,
      opsi: susunOpsi(String(mendarat), [String(d + k), String(d * (k - 1))], idx),
      benar: String(mendarat),
      petunjuk: `Tiap lompatan menambah ${d}. Hitung ${k} pendaratan: ${d}, ${d * 2}, dan seterusnya.`,
    },
    {
      stasiun: "tabel",
      tanya: `Di tabel seratus, semua kelipatan ${d} diwarnai. Bilangan manakah yang ikut diwarnai?`,
      opsi: susunOpsi(String(diTabel), [String(diTabel + 1), String(diTabel - 1)], idx + 1),
      benar: String(diTabel),
      petunjuk: `Warna jatuh tiap ${d} bilangan: ${d}, ${d * 2}, ${d * 3}, dan seterusnya.`,
    },
    {
      stasiun: "cek",
      tanya: `Apakah ${x} kelipatan ${d}? Bagi ${x} dengan ${d}, lalu lihat sisanya.`,
      opsi: susunOpsi(`bukan, sisa ${sisa}`, [`ya, kelipatan ${d}`, `bukan, sisa ${d - sisa}`], idx + 2),
      benar: `bukan, sisa ${sisa}`,
      petunjuk: `Kelipatan ${d} habis dibagi ${d}, tanpa sisa. Kelompokkan ${x} titik, tiap kelompok berisi ${d}, lalu hitung yang tersisa.`,
    },
    {
      stasiun: "lanjut",
      tanya: `Barisan kelipatan ${d}: ${awal.join(", ")}, … Bilangan berikutnya adalah …`,
      opsi: susunOpsi(String(lanjut), [String(awal[3] + 1), String(lanjut - 1)], idx + 3),
      benar: String(lanjut),
      petunjuk: `Tambahkan ${d} pada bilangan terakhir, ${awal[3]}.`,
    },
  ];
  return {
    id: c.id,
    nama: `Kelipatan ${d}`,
    ringkas: `Jarak ${d}, pendaratan ke-${k} di ${mendarat}. ${diTabel} ikut diwarnai di tabel seratus. ${x} dibagi ${d} bersisa ${sisa}, jadi bukan kelipatan ${d}. Setelah ${awal[3]}, berikutnya ${lanjut}.`,
    langkah,
  };
}

export const MESIN_KELIPATAN: DefMesin = {
  id: "mesin-kelipatan-k5b2",
  judul: "Mesin Kelipatan",
  selesaiId: "mesin-kelipatan",
  stasiun: STASIUN_KELIPATAN,
  kasus: KASUS_KELIPATAN.map(kasusMesinKelipatan),
};

/* ------------------------------ B: Mesin KPK ------------------------------ */

/** a dan b: dua selang. awal: tanggal Agustus pertama bertemu. n1 dan n2: tokoh. */
export type KasusKpk = { id: string; a: number; b: number; awal: number; n1: string; n2: string };
export const KASUS_KPK: KasusKpk[] = [
  { id: "2-3", a: 2, b: 3, awal: 4, n1: "Amelia", n2: "Yohana" },
  { id: "4-5", a: 4, b: 5, awal: 2, n1: "Lukas", n2: "Nisa" },
  { id: "6-8", a: 6, b: 8, awal: 1, n1: "Asep", n2: "Dinda" },
];
/** Panjang daftar kelipatan yang ditampilkan di stasiun Irisan. */
export const PANJANG_DAFTAR_KPK = 6;

export const STASIUN_KPK: StasiunDef[] = [
  { id: "jalur", nama: "Jalur", ikon: "🛤️" },
  { id: "irisan", nama: "Irisan", ikon: "🔀" },
  { id: "kpk", nama: "KPK", ikon: "🎯" },
  { id: "jadwal", nama: "Jadwal", ikon: "🗓️" },
];

/** KPK dengan mencari kelipatan a yang habis dibagi b. */
const kpkM = (a: number, b: number): number => {
  let v = a;
  while (v % b !== 0) v += a;
  return v;
};
const daftarM = (d: number, n: number): number[] => Array.from({ length: n }, (_, i) => d * (i + 1));

export function kasusMesinKpk(c: KasusKpk, idx: number): KasusMesin {
  const { a, b, awal, n1, n2 } = c;
  const k = kpkM(a, b);
  const p = daftarM(a, PANJANG_DAFTAR_KPK);
  const q = daftarM(b, PANJANG_DAFTAR_KPK);
  const banyak = p.filter((v) => q.includes(v)).length;
  const hasilKali = a * b;
  const langkah: LangkahMesin[] = [
    {
      stasiun: "jalur",
      tanya: `Dua pelompat mulai dari nol, berjarak ${a} dan ${b}. Pelompat berjarak ${a} harus mendarat berapa kali sampai keduanya mendarat di bilangan yang sama untuk pertama kali?`,
      opsi: susunOpsi(String(k / a), [String(k / a + 1), String(k / b)], idx),
      benar: String(k / a),
      petunjuk: `Lompatkan keduanya. Pendaratan sama yang pertama adalah kelipatan persekutuan yang terkecil. Hitung berapa kali pelompat ${a} mendarat sampai di situ.`,
    },
    {
      stasiun: "irisan",
      tanya: `Kelipatan ${a}: ${p.join(", ")}. Kelipatan ${b}: ${q.join(", ")}. Ada berapa bilangan yang muncul di kedua daftar?`,
      opsi: susunOpsi(String(banyak), [String(banyak + 1), String(banyak - 1)], idx + 1),
      benar: String(banyak),
      petunjuk: "Cocokkan bilangan di daftar pertama dengan daftar kedua. Hitung yang ada di kedua daftar.",
    },
    {
      stasiun: "kpk",
      tanya: `KPK dari ${a} dan ${b} adalah …`,
      opsi: susunOpsi(String(k), [String(a + b), String(hasilKali !== k ? hasilKali : 2 * k)], idx + 2),
      benar: String(k),
      petunjuk: "KPK adalah kelipatan persekutuan yang terkecil, bukan jumlah dan bukan sembarang kelipatan.",
    },
    {
      stasiun: "jadwal",
      tanya: `${n1} berlatih tiap ${a} hari dan ${n2} tiap ${b} hari. Mereka bertemu pada ${awal} Agustus. Mereka bertemu lagi pada tanggal …`,
      opsi: susunOpsi(`${awal + k} Agustus`, [`${k} Agustus`, `${awal + a + b} Agustus`], idx + 3),
      benar: `${awal + k} Agustus`,
      petunjuk: `Tambahkan KPK, yaitu ${k} hari, pada tanggal mulai ${awal} Agustus.`,
    },
  ];
  return {
    id: c.id,
    nama: `KPK ${a} dan ${b}`,
    ringkas: `Pelompat ${a} mendarat ${k / a} kali sampai bertemu pelompat ${b} di ${k}. Ada ${banyak} bilangan di kedua daftar. KPK ${a} dan ${b} adalah ${k}. ${awal} Agustus ditambah ${k} hari menjadi ${awal + k} Agustus.`,
    langkah,
  };
}

export const MESIN_KPK: DefMesin = {
  id: "mesin-kpk-k5b2",
  judul: "Mesin KPK",
  selesaiId: "mesin-kpk",
  stasiun: STASIUN_KPK,
  kasus: KASUS_KPK.map(kasusMesinKpk),
};

/* ------------------------------ C: Mesin Faktor ------------------------------ */

/** n: bilangan. r: banyak baris susunan penuh. a: kandidat berpasangan. d: kandidat yang bukan faktor. */
export type KasusFaktor = { id: string; n: number; r: number; a: number; d: number };
export const KASUS_FAKTOR: KasusFaktor[] = [
  { id: "18", n: 18, r: 3, a: 2, d: 4 },
  { id: "24", n: 24, r: 4, a: 3, d: 5 },
  { id: "36", n: 36, r: 9, a: 4, d: 8 },
];

export const STASIUN_FAKTOR: StasiunDef[] = [
  { id: "susun", nama: "Susun", ikon: "🧩" },
  { id: "pasangan", nama: "Pasangan", ikon: "🤝" },
  { id: "daftar", nama: "Daftar", ikon: "📋" },
  { id: "cek", nama: "Cek", ikon: "➗" },
];

const banyakFaktor = (n: number): number => Array.from({ length: n }, (_, i) => i + 1).filter((d) => n % d === 0).length;

export function kasusMesinFaktor(c: KasusFaktor, idx: number): KasusMesin {
  const { n, r, a, d } = c;
  const q = n / r;
  const pasangan = n / a;
  const banyak = banyakFaktor(n);
  const sisa = n % d;
  const palsu = sisa + 1 < d ? sisa + 1 : sisa - 1;
  const langkah: LangkahMesin[] = [
    {
      stasiun: "susun",
      tanya: `${n} titik disusun dalam ${r} baris yang sama banyak, tanpa sisa. Berapa titik tiap baris?`,
      opsi: susunOpsi(String(q), [String(q + 1), String(r)], idx),
      benar: String(q),
      petunjuk: `Bagi ${n} titik ke ${r} baris yang sama banyak. Semua titik harus terpakai.`,
    },
    {
      stasiun: "pasangan",
      tanya: `Faktor ${n} yang berpasangan dengan ${a} adalah …`,
      opsi: susunOpsi(String(pasangan), [String(n - a), String(pasangan + 1)], idx + 1),
      benar: String(pasangan),
      petunjuk: `Pasangan faktor jika dikalikan hasilnya ${n}. Cari bilangan yang dikali ${a} sama dengan ${n}.`,
    },
    {
      stasiun: "daftar",
      tanya: `Faktor ${n} ada berapa? Hitung semua pasangan, termasuk 1 dan ${n}.`,
      opsi: susunOpsi(String(banyak), [String(banyak - 2), String(banyak + 1)], idx + 2),
      benar: String(banyak),
      petunjuk: `Cari pasangan faktor ${n} dari 1 sampai bertemu di tengah, lalu hitung semua bilangannya.`,
    },
    {
      stasiun: "cek",
      tanya: `Apakah ${d} faktor ${n}? Bagi ${n} dengan ${d}, lalu lihat sisanya.`,
      opsi: susunOpsi(`bukan, sisa ${sisa}`, [`ya, faktor ${n}`, `bukan, sisa ${palsu}`], idx + 3),
      benar: `bukan, sisa ${sisa}`,
      petunjuk: `Faktor ${n} membagi ${n} tanpa sisa. Kelompokkan ${n} titik, tiap kelompok berisi ${d}, lalu hitung yang tersisa.`,
    },
  ];
  return {
    id: c.id,
    nama: `Faktor ${n}`,
    ringkas: `${n} titik dalam ${r} baris, tiap baris ${q} titik. ${a} berpasangan dengan ${pasangan}. Faktor ${n} ada ${banyak}. ${n} dibagi ${d} bersisa ${sisa}, jadi ${d} bukan faktor ${n}.`,
    langkah,
  };
}

export const MESIN_FAKTOR: DefMesin = {
  id: "mesin-faktor-k5b2",
  judul: "Mesin Faktor",
  selesaiId: "mesin-faktor",
  stasiun: STASIUN_FAKTOR,
  kasus: KASUS_FAKTOR.map(kasusMesinFaktor),
};

/* ------------------------------ D: Mesin FPB ------------------------------ */

/** a dan b: dua bilangan. */
export type KasusFpb = { id: string; a: number; b: number };
export const KASUS_FPB: KasusFpb[] = [
  { id: "12-18", a: 12, b: 18 },
  { id: "36-48", a: 36, b: 48 },
  { id: "18-30", a: 18, b: 30 },
];

export const STASIUN_FPB: StasiunDef[] = [
  { id: "daftar", nama: "Daftar", ikon: "📋" },
  { id: "fpb", nama: "FPB", ikon: "🎯" },
  { id: "bagi", nama: "Bagi", ikon: "🧺" },
  { id: "jembatan", nama: "Jembatan", ikon: "🌉" },
];

const faktorM = (n: number): number[] => Array.from({ length: n }, (_, i) => i + 1).filter((d) => n % d === 0);

export function kasusMesinFpb(c: KasusFpb, idx: number): KasusMesin {
  const { a, b } = c;
  const fa = faktorM(a);
  const fb = faktorM(b);
  const sama = fa.filter((d) => b % d === 0);
  const f = sama[sama.length - 1];
  const k = (a * b) / f;
  const banyak = sama.length;
  const langkah: LangkahMesin[] = [
    {
      stasiun: "daftar",
      tanya: `Faktor ${a}: ${fa.join(", ")}. Faktor ${b}: ${fb.join(", ")}. Ada berapa bilangan yang muncul di kedua daftar?`,
      opsi: susunOpsi(String(banyak), [String(banyak + 1), String(banyak - 1)], idx),
      benar: String(banyak),
      petunjuk: "Cocokkan tiap faktor di daftar pertama dengan daftar kedua. Hitung yang ada di kedua daftar.",
    },
    {
      stasiun: "fpb",
      tanya: `FPB dari ${a} dan ${b} adalah …`,
      opsi: susunOpsi(String(f), ["1", String(k)], idx + 1),
      benar: String(f),
      petunjuk: "FPB adalah faktor persekutuan yang terbesar, bukan yang terkecil dan bukan KPK.",
    },
    {
      stasiun: "bagi",
      tanya: `${a} bunga merah dan ${b} bunga putih dibagi rata ke vas sebanyak mungkin, tanpa sisa. Tiap vas berisi berapa bunga merah?`,
      opsi: susunOpsi(String(a / f), [String(b / f), String((2 * a) / f)], idx + 2),
      benar: String(a / f),
      petunjuk: `Banyak vas terbanyak adalah FPB, yaitu ${f}. Bagi ${a} bunga merah ke ${f} vas.`,
    },
    {
      stasiun: "jembatan",
      tanya: `FPB ${a} dan ${b} adalah ${f}, dan ${a} × ${b} = ${a * b}. Maka KPK dari ${a} dan ${b} adalah …`,
      opsi: susunOpsi(String(k), [String(a * b), String(a + b)], idx + 3),
      benar: String(k),
      petunjuk: `Jembatan: FPB dikali KPK sama dengan ${a} dikali ${b}. Bagi ${a * b} dengan ${f}.`,
    },
  ];
  return {
    id: c.id,
    nama: `FPB ${a} dan ${b}`,
    ringkas: `Ada ${banyak} faktor persekutuan ${a} dan ${b}. FPB ${a} dan ${b} adalah ${f}. Dibagi rata ke ${f} vas, tiap vas berisi ${a / f} merah dan ${b / f} putih. KPK ${a} dan ${b} adalah ${k}.`,
    langkah,
  };
}

export const MESIN_FPB: DefMesin = {
  id: "mesin-fpb-k5b2",
  judul: "Mesin FPB",
  selesaiId: "mesin-fpb",
  stasiun: STASIUN_FPB,
  kasus: KASUS_FPB.map(kasusMesinFpb),
};

export const SEMUA_MESIN_K5B2 = [MESIN_KELIPATAN, MESIN_KPK, MESIN_FAKTOR, MESIN_FPB];
