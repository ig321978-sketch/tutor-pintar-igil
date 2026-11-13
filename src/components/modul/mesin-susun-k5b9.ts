/**
 * Definisi Mesin Bertahap Kelas 5 Bab 9, Sub-Bab C (Komposisi dan Dekomposisi), dijalankan mesin berstasiun mesin-bertahap-k3b1.ts
 * dan dieja ejaK5B9. Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari data tiap kasus.
 *  - MESIN_SUSUN (C): Susun → Urai → Nol → Tukar   (kasus Komputer, Nol Tengah, Latihan)
 *    Susun: bagian nilai tempat disusun menjadi bilangan utuh.
 *    Urai : bilangan utuh diuraikan menjadi jumlah nilai tempat.
 *    Nol  : kolom mana yang diisi nol penyangga.
 *    Tukar: satu satuan tempat sama dengan sepuluh satuan tempat di kanannya.
 * Data buatan sendiri mengikuti konteks Buku Siswa Kelas V Bab 9 Sub-Bab C (327.100, 203.305, 505.401).
 * Murni: tanpa React, tanpa jaringan. Hanya impor tipe. Diuji di scripts/uji-lab-k5b9.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
const putarOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));
const titik = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const NAMA = ["ratus ribuan", "puluh ribuan", "ribuan", "ratusan", "puluhan", "satuan"];
const NILAI = [100000, 10000, 1000, 100, 10, 1];
const enam = (n: number): number[] => String(n).padStart(6, "0").split("").map(Number);

export type KasusSusun = {
  id: string;
  nama: string;
  konteks: string;
  n: number;
  /** Kolom yang dipecah pada stasiun Tukar (bukan satuan). */
  kolomTukar: number;
};

export const KASUS_SUSUN: KasusSusun[] = [
  { id: "komputer", nama: "Harga Komputer", konteks: "Nisa menyusun harga komputer", n: 327100, kolomTukar: 0 },
  { id: "nol", nama: "Nol Tengah", konteks: "Kasir menyusun harga sepeda", n: 203305, kolomTukar: 2 },
  { id: "latihan", nama: "Latihan Susun", konteks: "Lukas menyusun harga mesin cuci", n: 505401, kolomTukar: 3 },
];

export const STASIUN_SUSUN: StasiunDef[] = [
  { id: "susun", nama: "Susun", ikon: "🧩" },
  { id: "urai", nama: "Urai", ikon: "🔬" },
  { id: "nol", nama: "Nol", ikon: "⭕" },
  { id: "tukar", nama: "Tukar", ikon: "🔁" },
];

/** Bagian tidak nol: [angka, tempat]. */
const bagian = (n: number): [number, number][] => enam(n).flatMap((d, k) => (d > 0 ? ([[d, k]] as [number, number][]) : []));
const teksBagian = (n: number): string => bagian(n).map(([d, k]) => `${d} ${NAMA[k]}`).join(" + ");
const teksUraian = (daftar: [number, number][]): string => daftar.map(([d, k]) => titik(d * NILAI[k])).join(" + ");
/** Dua pengecoh bilangan: nol terlewat (semua nol dibuang) atau dua angka bertetangga tertukar. */
function pengecohSusun(n: number): number[] {
  const d = enam(n);
  const kandidat: number[] = [];
  const tanpaNol = d.filter((v) => v !== 0).join("");
  if (tanpaNol.length < 6) kandidat.push(Number(tanpaNol));
  for (const k of [3, 1, 4, 0, 2]) {
    if (d[k] === d[k + 1]) continue;
    const t = [...d];
    [t[k], t[k + 1]] = [t[k + 1], t[k]];
    kandidat.push(Number(t.join("")));
  }
  const hasil: number[] = [];
  for (const c of kandidat) if (c > 0 && c !== n && !hasil.includes(c) && hasil.length < 2) hasil.push(c);
  return hasil;
}
/** Dua pengecoh uraian: satu bagian bergeser satu tempat ke kanan, dan bagian pertama bergeser satu tempat. */
function pengecohUrai(n: number): string[] {
  const asli = bagian(n);
  const geser = (j: number, arah: 1 | -1): [number, number][] => asli.map(([d, k], idx) => (idx === j ? [d, Math.min(5, Math.max(0, k + arah))] : [d, k]) as [number, number]);
  const hasil: string[] = [];
  const benar = teksUraian(asli);
  for (const [j, arah] of [[1, 1], [0, 1], [asli.length - 1, -1], [0, -1]] as [number, 1 | -1][]) {
    const t = teksUraian(geser(j, arah));
    if (t !== benar && !hasil.includes(t) && hasil.length < 2) hasil.push(t);
  }
  return hasil;
}

export function kasusMesinSusun(c: KasusSusun, idx: number): KasusMesin {
  const d = enam(c.n);
  const nolKolom = d.flatMap((v, k) => (v === 0 ? [k] : []));
  const namaNol = nolKolom.map((k) => NAMA[k]).join(" dan ");
  const k = c.kolomTukar;
  const peng = pengecohSusun(c.n);
  const asli = bagian(c.n);
  const nolPengecoh = `hanya ${NAMA[nolKolom[0]]}`;
  const langkah: LangkahMesin[] = [
    {
      stasiun: "susun",
      tanya: `${c.konteks}: ${teksBagian(c.n)}. Bilangan yang tersusun adalah …`,
      opsi: putarOpsi(titik(c.n), peng.map(titik), idx),
      benar: titik(c.n),
      petunjuk: "Tulis tiap bagian di kolom tempatnya. Tempat yang tidak disebut diisi 0 supaya angka lain tidak bergeser.",
    },
    {
      stasiun: "urai",
      tanya: `Uraikan ${titik(c.n)} menjadi jumlah nilai tempat. Uraian yang benar adalah …`,
      opsi: putarOpsi(teksUraian(asli), pengecohUrai(c.n), idx + 1),
      benar: teksUraian(asli),
      petunjuk: "Nilai tiap angka adalah angkanya dikali nilai tempatnya. Jumlahkan kembali: hasilnya harus sama dengan bilangan awal.",
    },
    {
      stasiun: "nol",
      tanya: `Pada ${titik(c.n)}, tempat yang tidak disebut dan diisi nol penyangga adalah …`,
      opsi: putarOpsi(namaNol, [nolPengecoh, "tidak ada, tempat yang tidak disebut dihapus"], idx + 2),
      benar: namaNol,
      petunjuk: "Cari kolom yang berisi 0. Semua tempat yang tidak disebut harus tetap ditulis sebagai 0.",
    },
    {
      stasiun: "tukar",
      tanya: `Pada ${titik(c.n)}, satu ${NAMA[k]} dipecah menjadi satuan tempat di kanannya. Banyaknya adalah …`,
      opsi: putarOpsi(`10 ${NAMA[k + 1]}`, [`100 ${NAMA[k + 1]}`, `5 ${NAMA[k + 1]}`], idx + 3),
      benar: `10 ${NAMA[k + 1]}`,
      petunjuk: "Tiap tempat bernilai sepuluh kali tempat di kanannya, jadi satu satuan dipecah menjadi sepuluh satuan di kanannya, dan totalnya tetap.",
    },
  ];
  return {
    id: c.id,
    nama: c.nama,
    ringkas: `${teksBagian(c.n)} tersusun menjadi ${titik(c.n)}. Uraiannya ${teksUraian(asli)}. Tempat yang diisi nol: ${namaNol}. Satu ${NAMA[k]} sama dengan 10 ${NAMA[k + 1]}.`,
    langkah,
  };
}

export const MESIN_SUSUN: DefMesin = {
  id: "mesin-susun-k5b9",
  judul: "Mesin Susun",
  selesaiId: "mesin-susun",
  stasiun: STASIUN_SUSUN,
  kasus: KASUS_SUSUN.map(kasusMesinSusun),
};
