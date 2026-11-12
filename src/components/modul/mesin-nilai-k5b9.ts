/**
 * Definisi Mesin Bertahap Kelas 5 Bab 9 (Bilangan Cacah sampai 1.000.000), dijalankan mesin berstasiun mesin-bertahap-k3b1.ts dan dieja ejaK5B9.
 * Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari data tiap kasus.
 *  - MESIN_NILAI (A): Baca → Tulis → Tempat → Nilai   (kasus Lemari, Sensus Gianyar, Nol Penyangga)
 *    Baca   : bilangan berangka dibaca dengan kata.
 *    Tulis  : bilangan dalam kata ditulis dengan angka dan titik, nol tetap ditulis.
 *    Tempat : tempat sebuah angka dalam enam kolom tempat.
 *    Nilai  : nilai sebuah angka = angka dikali nilai tempatnya.
 * Data buatan sendiri mengikuti konteks Buku Siswa Kelas V Bab 9 Sub-Bab A (lemari Jepara, sensus Gianyar).
 * Murni: tanpa React, tanpa jaringan. Hanya impor tipe. Diuji di scripts/uji-lab-k5b9.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));

const SATU = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
const dua = (n: number): string => {
  if (n < 10) return SATU[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SATU[n - 10]} belas`;
  return n % 10 === 0 ? `${SATU[n / 10]} puluh` : `${SATU[Math.floor(n / 10)]} puluh ${SATU[n % 10]}`;
};
const tiga = (n: number): string => {
  if (n < 100) return dua(n);
  const depan = Math.floor(n / 100) === 1 ? "seratus" : `${SATU[Math.floor(n / 100)]} ratus`;
  return n % 100 === 0 ? depan : `${depan} ${dua(n % 100)}`;
};
/** Bacaan bilangan 1 sampai 999.999. */
export const bacaMesin = (n: number): string => {
  const a = Math.floor(n / 1000);
  const b = n % 1000;
  const kiri = a === 0 ? "" : a === 1 ? "seribu" : `${tiga(a)} ribu`;
  return [kiri, b === 0 ? "" : tiga(b)].filter(Boolean).join(" ");
};
export const titik = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export const NAMA_TEMPAT_MESIN = ["ratus ribuan", "puluh ribuan", "ribuan", "ratusan", "puluhan", "satuan"] as const;
export const NILAI_TEMPAT_MESIN = [100000, 10000, 1000, 100, 10, 1] as const;

export type KasusNilai = {
  id: string;
  nama: string;
  konteks: string;
  n: number;
  /** Angka yang ditanyakan tempatnya: kemunculan pertama dari kiri. */
  angkaTempat: number;
  /** Kolom yang ditanyakan nilainya. */
  kolomNilai: number;
};

export const KASUS_NILAI: KasusNilai[] = [
  { id: "lemari", nama: "Lemari Jepara", konteks: "Nisa melihat harga lemari Jepara", n: 979875, angkaTempat: 7, kolomNilai: 2 },
  { id: "gianyar", nama: "Sensus Gianyar", konteks: "Buku sensus mencatat penduduk Gianyar", n: 963000, angkaTempat: 6, kolomNilai: 0 },
  { id: "nol", nama: "Nol Penyangga", konteks: "Kasir menulis harga sepeda motor", n: 500040, angkaTempat: 4, kolomNilai: 4 },
];

export const STASIUN_NILAI: StasiunDef[] = [
  { id: "baca", nama: "Baca", ikon: "📖" },
  { id: "tulis", nama: "Tulis", ikon: "✏️" },
  { id: "tempat", nama: "Tempat", ikon: "🧮" },
  { id: "nilai", nama: "Nilai", ikon: "💎" },
];

const enamDigit = (n: number): number[] => String(n).padStart(6, "0").split("").map(Number);

/** Dua bilangan pengecoh: nol terlewat (bila ada nol) dan dua angka bertetangga tertukar. */
export function pengecohBilangan(n: number): number[] {
  const d = enamDigit(n);
  const kandidat: number[] = [];
  const teks = String(n);
  const iNol = teks.indexOf("0");
  if (iNol >= 0) kandidat.push(Number(teks.slice(0, iNol) + teks.slice(iNol + 1)));
  for (let k = 0; k < 5; k += 1) {
    if (d[k] === d[k + 1]) continue;
    const t = [...d];
    [t[k], t[k + 1]] = [t[k + 1], t[k]];
    kandidat.push(Number(t.join("")));
  }
  const hasil: number[] = [];
  for (const c of kandidat) if (c > 0 && c !== n && !hasil.includes(c) && hasil.length < 2) hasil.push(c);
  return hasil;
}

export function kasusMesinNilai(c: KasusNilai, idx: number): KasusMesin {
  const d = enamDigit(c.n);
  const kolomTempat = d.indexOf(c.angkaTempat);
  const tempat = NAMA_TEMPAT_MESIN[kolomTempat];
  const lainTempat = [kolomTempat - 1, kolomTempat + 1, kolomTempat - 2, kolomTempat + 2].filter((v) => v >= 0 && v < 6).slice(0, 2).map((v) => NAMA_TEMPAT_MESIN[v]);
  const k = c.kolomNilai;
  const angka = d[k];
  const p = NILAI_TEMPAT_MESIN[k];
  const nilai = angka * p;
  const lainNilai: number[] = [];
  for (const v of [angka, p, angka * (p >= 10 ? p / 10 : p * 10), nilai * 10]) if (v !== nilai && !lainNilai.includes(v) && lainNilai.length < 2) lainNilai.push(v);
  const peng = pengecohBilangan(c.n);
  const baca = bacaMesin(c.n);
  const langkah: LangkahMesin[] = [
    {
      stasiun: "baca",
      tanya: `${c.konteks}: ${titik(c.n)}. Cara membacanya adalah …`,
      opsi: susunOpsi(baca, peng.map(bacaMesin), idx),
      benar: baca,
      petunjuk: "Baca dari kiri. Kelompok angka sebelum titik dibaca lebih dulu dan diikuti kata ribu, lalu kelompok sesudah titik. Nol tidak diucapkan.",
    },
    {
      stasiun: "tulis",
      tanya: `Kasir menulis bilangan "${baca}". Tulisan dengan angka yang benar adalah …`,
      opsi: susunOpsi(titik(c.n), peng.map(titik), idx + 1),
      benar: titik(c.n),
      petunjuk: "Isi enam kolom tempat dari kiri ke kanan. Kolom yang tidak diucapkan tetap diisi nol supaya angka lain tidak bergeser.",
    },
    {
      stasiun: "tempat",
      tanya: `Pada ${titik(c.n)}, angka ${c.angkaTempat} yang pertama dari kiri menempati tempat …`,
      opsi: susunOpsi(tempat, lainTempat, idx + 2),
      benar: tempat,
      petunjuk: "Hitung kolom dari kanan: satuan, puluhan, ratusan, ribuan, puluh ribuan, lalu ratus ribuan.",
    },
    {
      stasiun: "nilai",
      tanya: `Pada ${titik(c.n)}, angka ${angka} berada di tempat ${NAMA_TEMPAT_MESIN[k]}. Nilai angka itu adalah …`,
      opsi: susunOpsi(titik(nilai), lainNilai.map(titik), idx + 3),
      benar: titik(nilai),
      petunjuk: "Nilai angka sama dengan angkanya dikali nilai tempatnya.",
    },
  ];
  return {
    id: c.id,
    nama: c.nama,
    ringkas: `${titik(c.n)} dibaca ${baca}. Angka ${c.angkaTempat} yang pertama dari kiri ada di tempat ${tempat}. Angka ${angka} di tempat ${NAMA_TEMPAT_MESIN[k]} bernilai ${angka} × ${titik(p)} = ${titik(nilai)}.`,
    langkah,
  };
}

export const MESIN_NILAI: DefMesin = {
  id: "mesin-nilai-k5b9",
  judul: "Mesin Nilai Tempat",
  selesaiId: "mesin-nilai",
  stasiun: STASIUN_NILAI,
  kasus: KASUS_NILAI.map(kasusMesinNilai),
};
