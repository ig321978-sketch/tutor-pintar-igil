/**
 * Definisi Mesin Bertahap Kelas 5 Bab 2 (KPK dan FPB), dijalankan mesin berstasiun mesin-bertahap-k3b1.ts dan
 * dieja ejaK5B1. Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari bilangan kasus.
 *  - MESIN_KELIPATAN (A): Lompat → Tabel → Cek → Lanjut   (jarak 3, 7, 9)
 *    Lompat: pendaratan ke-k dari jarak d (pengecoh: jarak ditambah k, satu pendaratan kurang).
 *    Tabel: kelipatan d yang ikut diwarnai di tabel seratus (pengecoh: bilangan tetangga).
 *    Cek: apakah x kelipatan d, lewat sisa pembagian (pengecoh: sisa tertukar, sisa diabaikan).
 *    Lanjut: bilangan setelah empat kelipatan pertama (pengecoh: tambah satu, satu kurang).
 * Data dari Buku Siswa Kelas V Bab 2 Sub-Bab A (lompat hitung, tabel seratus, habis dibagi).
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

export const SEMUA_MESIN_K5B2 = [MESIN_KELIPATAN];
