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
 * Data dari Buku Siswa Kelas V Bab 2 Sub-Bab A dan B (lompat hitung, tabel seratus, habis dibagi, KPK, jadwal).
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

export const SEMUA_MESIN_K5B2 = [MESIN_KELIPATAN, MESIN_KPK];
