/**
 * Definisi Mesin Bertahap Kelas 6 Bab 3 Sub-Bab C (Lokasi), dijalankan mesin berstasiun
 * mesin-bertahap-k3b1.ts dan dieja ejaK6B3. Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari letak awal dan tujuan tiap kasus.
 *  - MESIN_PETAK (C): Baca → Selisih → Jarak → Jalur   (kasus Kursi Tenri, Rak Buku, Kubus Pindah)
 *    Baca    : letak awal ditulis huruf dulu, lalu angka.
 *    Selisih : banyak langkah petak dari huruf awal ke huruf tujuan.
 *    Jarak   : selisih huruf ditambah selisih angka.
 *    Jalur   : banyak jalur terpendek, dihitung dengan menambah tetangga.
 * Kisi: huruf A sampai F menurun, angka 1 sampai 6 mendatar. Murni: tanpa React, tanpa jaringan. Hanya impor tipe.
 * Diuji di scripts/uji-lab-k6b3.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));

/** Dua pengecoh bilangan yang berbeda dari jawaban dan satu sama lain, tidak negatif. */
const pengecoh = (benar: number, calon: number[]): string[] => {
  const hasil: number[] = [];
  for (const c of [...calon, benar + 1, benar + 2, benar - 1, benar + 3, benar - 2]) {
    if (Number.isInteger(c) && c >= 0 && c !== benar && !hasil.includes(c)) hasil.push(c);
    if (hasil.length === 2) break;
  }
  return hasil.map(String);
};

const HURUF = "ABCDEF";
const selang = (a: number, b: number): number => (a > b ? a - b : b - a);

export type KasusPetak = {
  id: string;
  nama: string;
  konteks: string;
  /** Letak awal dan tujuan, huruf lalu angka. */
  dari: string;
  ke: string;
};

export const KASUS_PETAK: KasusPetak[] = [
  { id: "kursi", nama: "Kursi Tenri", konteks: "Tenri berjalan di denah kelas dari kursinya ke papan tulis", dari: "A1", ke: "C3" },
  { id: "rak", nama: "Rak Buku", konteks: "Tigor membawa buku dari meja guru ke rak buku", dari: "A3", ke: "D5" },
  { id: "kubus", nama: "Kubus Pindah", konteks: "Sebuah kubus dipindah di denah kelas", dari: "F1", ke: "D2" },
];

export const STASIUN_PETAK: StasiunDef[] = [
  { id: "baca", nama: "Baca", ikon: "📍" },
  { id: "selisih", nama: "Selisih", ikon: "🔢" },
  { id: "jarak", nama: "Jarak", ikon: "📏" },
  { id: "jalur", nama: "Jalur", ikon: "➡️" },
];

export function kasusMesinPetak(c: KasusPetak, idx: number): KasusMesin {
  const h1 = HURUF.indexOf(c.dari[0]);
  const h2 = HURUF.indexOf(c.ke[0]);
  const a1 = Number(c.dari.slice(1));
  const a2 = Number(c.ke.slice(1));
  const dh = selang(h1, h2);
  const da = selang(a1, a2);
  const jarak = dh + da;
  // Banyak jalur terpendek: tiap petak diisi jumlah dua tetangga yang lebih dekat ke awal.
  const kisi: number[][] = Array.from({ length: dh + 1 }, () => Array.from({ length: da + 1 }, () => 1));
  for (let i = 1; i <= dh; i += 1) for (let j = 1; j <= da; j += 1) kisi[i][j] = kisi[i - 1][j] + kisi[i][j - 1];
  const jalur = kisi[dh][da];
  const sebelah = HURUF[h1 < 5 ? h1 + 1 : h1 - 1];
  const langkah: LangkahMesin[] = [
    {
      stasiun: "baca",
      tanya: `${c.konteks}. Letak awalnya di baris ${c.dari[0]} dan kolom ${a1}. Letak itu ditulis …`,
      opsi: susunOpsi(c.dari, [`${a1}${c.dari[0]}`, `${sebelah}${a1}`], idx),
      benar: c.dari,
      petunjuk: "Tulis huruf barisnya lebih dulu, lalu angka kolomnya.",
    },
    {
      stasiun: "selisih",
      tanya: `Dari ${c.dari} ke ${c.ke}, selisih huruf dari baris ${c.dari[0]} ke baris ${c.ke[0]} adalah … langkah petak.`,
      opsi: susunOpsi(String(dh), pengecoh(dh, [da, jarak]), idx + 1),
      benar: String(dh),
      petunjuk: `Hitung berapa petak dari baris ${c.dari[0]} ke baris ${c.ke[0]}, satu petak satu langkah.`,
    },
    {
      stasiun: "jarak",
      tanya: `Selisih huruf ${dh} langkah dan selisih angka ${da} langkah. Jarak dari ${c.dari} ke ${c.ke} adalah … langkah.`,
      opsi: susunOpsi(String(jarak), pengecoh(jarak, [dh > da ? dh : da, dh]), idx + 2),
      benar: String(jarak),
      petunjuk: "Jumlahkan selisih huruf dan selisih angka. Tidak ada gerak serong, jadi bukan yang terbesar saja.",
    },
    {
      stasiun: "jalur",
      tanya: `Banyak jalur terpendek dari ${c.dari} ke ${c.ke}, dengan gerak kanan, kiri, naik, atau turun, ada … jalur.`,
      opsi: susunOpsi(String(jalur), pengecoh(jalur, [jarak, dh * da]), idx + 3),
      benar: String(jalur),
      petunjuk: "Isi tiap petak dengan jumlah dua petak tetangga yang lebih dekat ke awal, mulai dari 1 di tepi.",
    },
  ];
  return {
    id: c.id,
    nama: c.nama,
    ringkas: `${c.dari} ke ${c.ke}: selisih huruf ${dh}, selisih angka ${da}, jarak ${jarak} langkah, ada ${jalur} jalur terpendek.`,
    langkah,
  };
}

export const MESIN_PETAK: DefMesin = {
  id: "mesin-petak-k6b3",
  judul: "Mesin Petak",
  selesaiId: "mesin-petak",
  stasiun: STASIUN_PETAK,
  kasus: KASUS_PETAK.map(kasusMesinPetak),
};
