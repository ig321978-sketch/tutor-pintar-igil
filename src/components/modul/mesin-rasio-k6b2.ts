/**
 * Definisi Mesin Bertahap Kelas 6 Bab 2 (Rasio), dijalankan mesin berstasiun mesin-bertahap-k3b1.ts dan dieja ejaK6B2.
 * Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari data tiap kasus.
 *  - MESIN_RASIO (A): Tulis → Baca → Pembagi → Hasil   (kasus Bibit, Buah, Bunga)
 *    Tulis   : rasio dua jenis benda ditulis a : b, kiri untuk benda yang disebut lebih dulu.
 *    Baca    : kalimat "setiap a ada b" sesuai urutan.
 *    Pembagi : pembagi terbesar yang membagi habis kedua suku.
 *    Hasil   : bentuk paling sederhana, kedua suku dibagi.
 * Data buatan sendiri mengikuti konteks Buku Siswa Kelas VI Bab 2 Sub-Bab A (bibit pucuk merah dan cemara).
 * Murni: tanpa React, tanpa jaringan. Hanya impor tipe. Diuji di scripts/uji-lab-k6b2.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));

const fpb = (a: number, b: number): number => (b === 0 ? a : fpb(b, a % b));

export type KasusRasio = {
  id: string;
  nama: string;
  konteks: string;
  /** Jenis benda pertama dan kedua, dengan jumlahnya. */
  ka: string;
  kb: string;
  a: number;
  b: number;
};

export const KASUS_RASIO: KasusRasio[] = [
  { id: "bibit", nama: "Bibit Pohon", konteks: "Artus menata bibit di lahan", ka: "pucuk merah", kb: "cemara", a: 4, b: 6 },
  { id: "buah", nama: "Rak Buah", konteks: "Artus menata buah di rak pasar", ka: "mangga", kb: "jambu", a: 9, b: 12 },
  { id: "bunga", nama: "Pot Bunga", konteks: "Artus merawat bunga di teras", ka: "mawar", kb: "melati", a: 10, b: 4 },
];

export const STASIUN_RASIO: StasiunDef[] = [
  { id: "tulis", nama: "Tulis", ikon: "✏️" },
  { id: "baca", nama: "Baca", ikon: "🗣️" },
  { id: "pembagi", nama: "Pembagi", ikon: "➗" },
  { id: "hasil", nama: "Hasil", ikon: "🏁" },
];

export function kasusMesinRasio(c: KasusRasio, idx: number): KasusMesin {
  const g = fpb(c.a, c.b);
  const hasil = `${c.a / g} : ${c.b / g}`;
  const langkah: LangkahMesin[] = [
    {
      stasiun: "tulis",
      tanya: `${c.konteks}: ada ${c.a} ${c.ka} dan ${c.b} ${c.kb}. Rasio ${c.ka} terhadap ${c.kb} ditulis …`,
      opsi: susunOpsi(`${c.a} : ${c.b}`, [`${c.b} : ${c.a}`, String(c.a + c.b)], idx),
      benar: `${c.a} : ${c.b}`,
      petunjuk: `Benda yang disebut lebih dulu, yaitu ${c.ka}, ditulis di kiri. Rasio membandingkan dua besaran, bukan menjumlahkannya.`,
    },
    {
      stasiun: "baca",
      tanya: `Rasio ${c.ka} terhadap ${c.kb} sama dengan ${c.a} : ${c.b}. Kalimat yang benar adalah …`,
      opsi: susunOpsi(
        `Setiap ${c.a} ${c.ka} ada ${c.b} ${c.kb}`,
        [`Setiap ${c.b} ${c.ka} ada ${c.a} ${c.kb}`, `Setiap ${c.a} ${c.kb} ada ${c.b} ${c.ka}`],
        idx + 1,
      ),
      benar: `Setiap ${c.a} ${c.ka} ada ${c.b} ${c.kb}`,
      petunjuk: "Angka kiri untuk benda yang disebut pertama, angka kanan untuk benda yang disebut kedua.",
    },
    {
      stasiun: "pembagi",
      tanya: `Untuk menyederhanakan ${c.a} : ${c.b}, kedua suku dibagi pembagi terbesar yang membagi habis keduanya. Pembagi itu adalah …`,
      opsi: susunOpsi(String(g), [String(g * 2), String(g + 1)], idx + 2),
      benar: String(g),
      petunjuk: `Cari bilangan terbesar yang membagi habis ${c.a} dan juga ${c.b}.`,
    },
    {
      stasiun: "hasil",
      tanya: `Bentuk paling sederhana ${c.a} : ${c.b} adalah …`,
      opsi: susunOpsi(hasil, [`${c.a / g} : ${c.b}`, `${c.a} : ${c.b / g}`], idx + 3),
      benar: hasil,
      petunjuk: "Bagi suku kiri dan suku kanan dengan pembagi yang sama. Jangan membagi hanya satu suku.",
    },
  ];
  return {
    id: c.id,
    nama: c.nama,
    ringkas: `${c.a} ${c.ka} : ${c.b} ${c.kb} ditulis ${c.a} : ${c.b}, dibaca setiap ${c.a} ${c.ka} ada ${c.b} ${c.kb}. Kedua suku dibagi ${g}: ${c.a} : ${c.b} = ${hasil}.`,
    langkah,
  };
}

export const MESIN_RASIO: DefMesin = {
  id: "mesin-rasio-k6b2",
  judul: "Mesin Rasio",
  selesaiId: "mesin-rasio",
  stasiun: STASIUN_RASIO,
  kasus: KASUS_RASIO.map(kasusMesinRasio),
};
