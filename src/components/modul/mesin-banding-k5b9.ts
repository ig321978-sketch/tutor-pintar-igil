/**
 * Definisi Mesin Bertahap Kelas 5 Bab 9, Sub-Bab B (Membandingkan dan Mengurutkan Bilangan), dijalankan mesin berstasiun
 * mesin-bertahap-k3b1.ts dan dieja ejaK5B9. Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari data tiap kasus.
 *  - MESIN_BANDING (B): Kolom → Banding → Urut → Simbol   (kasus Sepatu, Beda Ratusan, Beda Puluhan)
 *    Kolom  : kolom pertama dari kiri yang angkanya berbeda.
 *    Banding: mana yang lebih besar, diputuskan di kolom itu.
 *    Urut   : tiga bilangan diurutkan naik atau turun.
 *    Simbol : tanda lebih besar, lebih kecil, atau sama dengan.
 * Data buatan sendiri mengikuti konteks Buku Siswa Kelas V Bab 9 Sub-Bab B (harga sepatu, 599.198 dan 599.047, 789.876 dan 789.867).
 * Murni: tanpa React, tanpa jaringan. Hanya impor tipe. Diuji di scripts/uji-lab-k5b9.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
const putarOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));
const titik = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const NAMA_KOLOM = ["ratus ribuan", "puluh ribuan", "ribuan", "ratusan", "puluhan", "satuan"];
const enam = (n: number): number[] => String(n).padStart(6, "0").split("").map(Number);

export type KasusBanding = {
  id: string;
  nama: string;
  konteks: string;
  /** Pasangan yang dibandingkan: atas dan bawah. */
  a: number;
  b: number;
  /** Tiga bilangan yang diurutkan dan arahnya. */
  urut: number[];
  arah: "naik" | "turun";
};

export const KASUS_BANDING: KasusBanding[] = [
  { id: "sepatu", nama: "Harga Sepatu", konteks: "Lukas dan Komang membandingkan harga sepatu", a: 432543, b: 342231, urut: [432543, 232231, 342231], arah: "naik" },
  { id: "ratusan", nama: "Beda Ratusan", konteks: "Pak Wayan membandingkan dua harga ponsel", a: 599198, b: 599047, urut: [599047, 432543, 599198], arah: "turun" },
  { id: "puluhan", nama: "Beda Puluhan", konteks: "Bu Made membandingkan dua nomor undian", a: 789867, b: 789876, urut: [789867, 676785, 789876], arah: "naik" },
];

export const STASIUN_BANDING: StasiunDef[] = [
  { id: "kolom", nama: "Kolom", ikon: "🎯" },
  { id: "banding", nama: "Banding", ikon: "⚖️" },
  { id: "urut", nama: "Urut", ikon: "📊" },
  { id: "simbol", nama: "Simbol", ikon: "🔣" },
];

/** Kolom pertama yang berbeda, dihitung dari selisih digit. */
const kolomBeda = (a: number, b: number): number => enam(a).findIndex((v, k) => v !== enam(b)[k]);
const urutan = (daftar: number[], arah: "naik" | "turun"): number[] => [...daftar].sort((p, q) => (arah === "naik" ? p - q : q - p));
const teksUrut = (daftar: number[]): string => daftar.map(titik).join(", ");

export function kasusMesinBanding(c: KasusBanding, idx: number): KasusMesin {
  const k = kolomBeda(c.a, c.b);
  const lain = [k - 1, k + 1, 5, 0].filter((v, i, arr) => v >= 0 && v < 6 && v !== k && arr.indexOf(v) === i).slice(0, 2);
  const besar = c.a > c.b ? c.a : c.b;
  const benar = urutan(c.urut, c.arah);
  const salah1 = [...benar].reverse();
  const salah2 = [benar[1], benar[0], ...benar.slice(2)];
  const hSimbol = c.b > c.a ? 0 : c.b < c.a ? 1 : 2;
  const kataSimbol = ["lebih besar dari", "lebih kecil dari", "sama dengan"];
  const langkah: LangkahMesin[] = [
    {
      stasiun: "kolom",
      tanya: `${c.konteks}: ${titik(c.a)} dan ${titik(c.b)}. Dari kiri, kolom pertama yang angkanya berbeda adalah …`,
      opsi: putarOpsi(NAMA_KOLOM[k], lain.map((v) => NAMA_KOLOM[v]), idx),
      benar: NAMA_KOLOM[k],
      petunjuk: "Mulai dari kolom paling kiri. Bila angkanya sama, geser ke kolom di kanannya. Berhenti di kolom pertama yang angkanya berbeda.",
    },
    {
      stasiun: "banding",
      tanya: `Pada ${titik(c.a)} dan ${titik(c.b)}, angka di kolom ${NAMA_KOLOM[k]} menentukan. Bilangan yang lebih besar adalah …`,
      opsi: putarOpsi(titik(besar), [titik(c.a === besar ? c.b : c.a), "sama besar"], idx + 1),
      benar: titik(besar),
      petunjuk: "Lihat angka di kolom pertama yang berbeda. Bilangan dengan angka lebih besar di kolom itu adalah yang lebih besar.",
    },
    {
      stasiun: "urut",
      tanya: `Urutkan ${c.arah} bilangan ${teksUrut(c.urut)}. Urutan yang benar adalah …`,
      opsi: putarOpsi(teksUrut(benar), [teksUrut(salah1), teksUrut(salah2)], idx + 2),
      benar: teksUrut(benar),
      petunjuk: c.arah === "naik" ? "Urut naik berarti dari yang paling kecil ke yang paling besar. Bandingkan bilangan dari kolom paling kiri yang berbeda." : "Urut turun berarti dari yang paling besar ke yang paling kecil. Bandingkan bilangan dari kolom paling kiri yang berbeda.",
    },
    {
      stasiun: "simbol",
      tanya: `Bandingkan ${titik(c.b)} … ${titik(c.a)}. Hubungan yang tepat adalah …`,
      opsi: putarOpsi(kataSimbol[hSimbol], kataSimbol.filter((_, i) => i !== hSimbol), idx + 3),
      benar: kataSimbol[hSimbol],
      petunjuk: "Bandingkan dari kolom paling kiri yang berbeda. Bilangan di kiri tanda yang lebih besar memakai tanda lebih besar dari.",
    },
  ];
  return {
    id: c.id,
    nama: c.nama,
    ringkas: `${titik(c.a)} dan ${titik(c.b)} berbeda pertama kali di kolom ${NAMA_KOLOM[k]}, dan ${titik(besar)} lebih besar. Urutan ${c.arah}: ${teksUrut(benar)}. ${titik(c.b)} ${kataSimbol[hSimbol]} ${titik(c.a)}.`,
    langkah,
  };
}

export const MESIN_BANDING: DefMesin = {
  id: "mesin-banding-k5b9",
  judul: "Mesin Banding",
  selesaiId: "mesin-banding",
  stasiun: STASIUN_BANDING,
  kasus: KASUS_BANDING.map(kasusMesinBanding),
};
