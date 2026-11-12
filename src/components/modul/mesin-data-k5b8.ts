/**
 * Definisi Mesin Bertahap Kelas 5 Bab 8 (Data), dijalankan mesin berstasiun mesin-bertahap-k3b1.ts dan dieja ejaK5B8.
 * Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari data tiap kasus.
 *  - MESIN_DATA (A): Turus → Frekuensi → Tabel → Keputusan   (kasus Donat, Sayuran, Cara Berangkat)
 *    Turus     : turus satu kategori dikelompokkan lima, banyak kelompok penuh dan garis sisa.
 *    Frekuensi : berapa kali satu kategori muncul dalam daftar jawaban mentah.
 *    Tabel     : frekuensi yang hilang dari jumlah frekuensi sama dengan banyak data.
 *    Keputusan : kategori dengan frekuensi terbesar (mode) untuk keputusan.
 * Data buatan sendiri mengikuti konteks Buku Siswa Kelas V Bab 8 Sub-Bab A (donat Anggi, sayuran, cara berangkat sekolah).
 * Murni: tanpa React, tanpa jaringan. Hanya impor tipe. Diuji di scripts/uji-lab-k5b8.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));
/** Dua pengecoh pertama dari kandidat: bulat tak negatif, unik, bukan benar. Bila kurang, dilengkapi benar + 1, benar + 2. */
function pengecoh(benar: number, kandidat: number[]): number[] {
  const hasil: number[] = [];
  for (const n of [...kandidat, benar + 1, benar + 2]) {
    if (hasil.length < 2 && n >= 0 && n !== benar && !hasil.includes(n)) hasil.push(n);
  }
  return hasil;
}

type Empat = [number, number, number, number];

/** kategori: empat nama. f: frekuensi benar. daftar: jawaban mentah (indeks kategori). target: kategori yang dihitung frekuensinya dan turusnya. */
export type KasusData = {
  id: string;
  nama: string;
  konteks: string;
  kategori: [string, string, string, string];
  f: Empat;
  daftar: number[];
  target: { turus: number; frekuensi: number; hilang: number };
  tanyaKeputusan: string;
};

export const KASUS_DATA: KasusData[] = [
  {
    id: "donat",
    nama: "Donat Anggi",
    konteks: "Anggi mencatat rasa donat yang dibeli pelanggan",
    kategori: ["Cokelat", "Keju", "Stroberi", "Kacang"],
    f: [7, 5, 3, 2],
    daftar: [0, 1, 0, 2, 0, 3, 1, 0, 2, 1],
    target: { turus: 0, frekuensi: 1, hilang: 3 },
    tanyaKeputusan: "Anggi hanya boleh menambah bahan untuk satu rasa",
  },
  {
    id: "sayuran",
    nama: "Sayuran Favorit",
    konteks: "Kantin mencatat sayuran favorit murid",
    kategori: ["Bayam", "Wortel", "Kangkung", "Sawi"],
    f: [8, 6, 4, 2],
    daftar: [1, 0, 1, 2, 1, 0, 3, 1, 2, 0],
    target: { turus: 0, frekuensi: 1, hilang: 2 },
    tanyaKeputusan: "Kantin hanya boleh menambah menu satu sayuran",
  },
  {
    id: "berangkat",
    nama: "Cara Berangkat",
    konteks: "Wali kelas mencatat cara murid berangkat ke sekolah",
    kategori: ["Jalan kaki", "Sepeda", "Angkot", "Motor"],
    f: [9, 5, 4, 2],
    daftar: [0, 0, 1, 0, 2, 0, 1, 3, 0, 2],
    target: { turus: 0, frekuensi: 0, hilang: 1 },
    tanyaKeputusan: "Sekolah hanya boleh memperbaiki jalur untuk satu cara berangkat",
  },
];

export const STASIUN_DATA: StasiunDef[] = [
  { id: "turus", nama: "Turus", ikon: "✏️" },
  { id: "frekuensi", nama: "Frekuensi", ikon: "🔢" },
  { id: "tabel", nama: "Tabel", ikon: "📋" },
  { id: "keputusan", nama: "Keputusan", ikon: "🏆" },
];

const jumlah = (f: readonly number[]): number => f.reduce((a, b) => a + b, 0);
/** Berapa kali kategori muncul dalam daftar. */
export const hitungDalamDaftar = (daftar: readonly number[], k: number): number => daftar.filter((v) => v === k).length;
export const bentukTurus = (f: number): string => `${Math.floor(f / 5)} kelompok lima dan ${f % 5} garis`;

export function kasusMesinData(c: KasusData, idx: number): KasusMesin {
  const [a, b, d, e] = c.f;
  const total = a + b + d + e;
  const t = c.target;
  const fTurus = c.f[t.turus];
  const penuh = Math.floor(fTurus / 5);
  const sisa = fTurus % 5;
  const benarTurus = bentukTurus(fTurus);
  const salahTurus = [`${sisa} kelompok lima dan ${penuh} garis`, `${penuh + 1} kelompok lima dan ${sisa} garis`];
  const banyakKali = hitungDalamDaftar(c.daftar, t.frekuensi);
  const hilang = c.f[t.hilang];
  const tigaLain = c.f.filter((_, k) => k !== t.hilang);
  const tertinggi = c.f.indexOf(Math.max(...c.f));
  const terendah = c.f.indexOf(Math.min(...c.f));
  const lain = c.f.findIndex((_, k) => k !== tertinggi && k !== terendah);
  const nama = c.kategori;
  const langkah: LangkahMesin[] = [
    {
      stasiun: "turus",
      tanya: `${c.konteks}. Jawaban ${nama[t.turus]} muncul ${fTurus} kali. Turus dikelompokkan lima, empat garis tegak dan satu garis miring. Turusnya terdiri dari …`,
      opsi: susunOpsi(benarTurus, salahTurus, idx),
      benar: benarTurus,
      petunjuk: "Satu kelompok lima berisi empat garis tegak dan satu garis miring. Bagi banyak jawaban dengan lima: hasil bulatnya banyak kelompok, sisanya garis yang berdiri sendiri.",
    },
    {
      stasiun: "frekuensi",
      tanya: `Daftar jawaban mentah: ${c.daftar.map((k) => nama[k]).join(", ")}. Frekuensi ${nama[t.frekuensi]}, yaitu berapa kali muncul, adalah …`,
      opsi: susunOpsi(`${banyakKali} kali`, pengecoh(banyakKali, [banyakKali + 1, banyakKali - 1, c.daftar.length]).map((v) => `${v} kali`), idx + 1),
      benar: `${banyakKali} kali`,
      petunjuk: `Telusuri daftar dari awal sampai akhir, tandai tiap ${nama[t.frekuensi]} satu kali saja, lalu hitung tandanya.`,
    },
    {
      stasiun: "tabel",
      tanya: `Banyak data ${total}. Tabel frekuensi baru terisi tiga kategori: ${nama.map((n, k) => (k === t.hilang ? null : `${n} ${c.f[k]}`)).filter(Boolean).join(", ")}. Frekuensi ${nama[t.hilang]} yang masih kosong adalah …`,
      opsi: susunOpsi(`${hilang}`, pengecoh(hilang, [jumlah(tigaLain), total, hilang + 1]).map(String), idx + 2),
      benar: `${hilang}`,
      petunjuk: "Jumlah semua frekuensi harus sama dengan banyak data. Kurangkan banyak data dengan jumlah frekuensi yang sudah terisi.",
    },
    {
      stasiun: "keputusan",
      tanya: `Tabel frekuensi: ${nama.map((n, k) => `${n} ${c.f[k]}`).join(", ")}. ${c.tanyaKeputusan}. Menurut data, yang diutamakan adalah …`,
      opsi: susunOpsi(nama[tertinggi], [nama[terendah], nama[lain]], idx + 3),
      benar: nama[tertinggi],
      petunjuk: "Bandingkan frekuensi semua kategori. Keputusan yang punya alasan memilih frekuensi yang paling besar.",
    },
  ];
  return {
    id: c.id,
    nama: c.nama,
    ringkas: `${nama[t.turus]} ${fTurus} kali dituruskan menjadi ${benarTurus}. Dalam daftar mentah, ${nama[t.frekuensi]} muncul ${banyakKali} kali. Frekuensi ${nama[t.hilang]} yang hilang ${hilang} dari banyak data ${total}. Frekuensi terbesar ${nama[tertinggi]}.`,
    langkah,
  };
}

export const MESIN_DATA: DefMesin = {
  id: "mesin-data-k5b8",
  judul: "Mesin Data",
  selesaiId: "mesin-data",
  stasiun: STASIUN_DATA,
  kasus: KASUS_DATA.map(kasusMesinData),
};

export const SEMUA_MESIN_K5B8: DefMesin[] = [MESIN_DATA];
