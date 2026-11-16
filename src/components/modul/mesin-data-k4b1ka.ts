/**
 * Definisi Mesin Bertahap Modul Kedua Kelas 4 Bab 1 Sub-Bab A (Mesin Baca), dijalankan mesin berstasiun mesin-bertahap-k3b1.ts.
 * Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari data kasusnya. Letak jawaban benar diputar per kasus dan stasiun.
 *  - MESIN_BACA_KA: Rakit → Papan → Baca → Tulis   (4.152, 5.007, 1.308; naskah orisinal IGIL, acuan topik Matematika SD/MI Kelas IV Bab 1 Sub-Bab A)
 * Murni: tanpa React, tanpa jaringan. Hanya impor tipe. Diuji di scripts/uji-lab-k4b1-kedua.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
/** Letakkan jawaban benar di posisi yang berputar menurut `idx`. */
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));
/** Dua pengecoh pertama yang berbeda dari kunci dan satu sama lain. */
const duaPengecoh = (benar: string, calon: string[]): string[] => [...new Set(calon.filter((c) => c !== benar))].slice(0, 2);

const TEMPAT = ["ribuan", "ratusan", "puluhan", "satuan"];
const ANGKA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
export const lambangM = (n: number): string => (n >= 1000 ? `${Math.floor(n / 1000)}.${String(n % 1000).padStart(3, "0")}` : String(n));
const digit = (n: number): number[] => [Math.floor(n / 1000) % 10, Math.floor(n / 100) % 10, Math.floor(n / 10) % 10, n % 10];
const dariDigit = (d: readonly number[]): number => d[0] * 1000 + d[1] * 100 + d[2] * 10 + d[3];

function dua(n: number): string {
  if (n < 10) return ANGKA[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${ANGKA[n - 10]} belas`;
  return n % 10 === 0 ? `${ANGKA[Math.floor(n / 10)]} puluh` : `${ANGKA[Math.floor(n / 10)]} puluh ${ANGKA[n % 10]}`;
}
/** Bacaan 1 sampai 9.999. */
export function bacaM(n: number): string {
  const [rb, rt, pl, st] = digit(n);
  const bag = [rb === 0 ? "" : rb === 1 ? "seribu" : `${ANGKA[rb]} ribu`, rt === 0 ? "" : rt === 1 ? "seratus" : `${ANGKA[rt]} ratus`, pl * 10 + st === 0 ? "" : dua(pl * 10 + st)];
  return bag.filter(Boolean).join(" ");
}

/* ------------------------------ A: Mesin Baca ------------------------------ */

export type KasusBaca = { id: string; n: number; tulis: number };
export const KASUS_BACA: KasusBaca[] = [
  { id: "4152", n: 4152, tulis: 4690 },
  { id: "5007", n: 5007, tulis: 2004 },
  { id: "1308", n: 1308, tulis: 9402 },
];

export const STASIUN_BACA: StasiunDef[] = [
  { id: "rakit", nama: "Rakit", ikon: "📦" },
  { id: "papan", nama: "Papan", ikon: "🟣" },
  { id: "baca", nama: "Baca", ikon: "🗣️" },
  { id: "tulis", nama: "Tulis", ikon: "✍️" },
];

/** Bacaan keliru yang paling mungkin untuk n. */
export function bacaKeliru(n: number): string {
  const [rb, rt, pl, st] = digit(n);
  if (rb === 1) return `satu ribu${bacaM(n % 1000) ? ` ${bacaM(n % 1000)}` : ""}`;
  if (rt === 0 || pl === 0) return `${ANGKA[rb]} ribu ${ANGKA[rt]} ratus ${ANGKA[pl]} puluh ${ANGKA[st]}`;
  return `${ANGKA[rb]} ribu ${ANGKA[rt]} ratus ${ANGKA[pl]} ${ANGKA[st]}`;
}
const bacaDigit = (n: number): string => digit(n).map((d) => ANGKA[d]).join(", ");

/** Nilai bilangan dari teks lambang ("3.286" atau "3286"). */
const nilaiLambang = (s: string): number => Number(s.replace(/\./g, ""));
/** Buang calon yang nilainya sama dengan n (pengecoh tidak boleh benar secara matematis). */
const bukanN = (n: number, calon: string[]): string[] => calon.filter((c) => nilaiLambang(c) !== n);

/** Lambang keliru: nol dibuang, angka bertukar tempat dengan tetangganya. */
function tulisKeliru(n: number): string[] {
  const d = digit(n);
  const tanpaNol = Number(d.filter((v) => v !== 0).join("") || "0");
  const tukar = (i: number, j: number) => {
    const g = [...d];
    [g[i], g[j]] = [g[j], g[i]];
    return lambangM(dariDigit(g));
  };
  return bukanN(n, [String(tanpaNol), tukar(1, 2), tukar(2, 3), tukar(1, 3)]);
}

export function kasusMesinBaca(k: KasusBaca, idx: number): KasusMesin {
  const d = digit(k.n);
  const rev = dariDigit([...d].reverse());
  const tukarTengah = dariDigit([d[0], d[2], d[1], d[3]]);
  const rakitBenar = lambangM(k.n);
  const iPapan = (idx + 1) % 4;
  const papanBenar = String(d[iPapan]);
  const langkah: LangkahMesin[] = [
    {
      stasiun: "rakit",
      tanya: `Ada ${d[0]} peti, ${d[1]} dus, ${d[2]} bungkus, dan ${d[3]} benda. Bilangannya…`,
      opsi: susunOpsi(rakitBenar, duaPengecoh(rakitBenar, bukanN(k.n, [lambangM(rev), lambangM(tukarTengah), String(Number(d.filter((v) => v !== 0).join(""))), lambangM(dariDigit([d[0], d[1], d[3], d[2]]))])), idx),
      benar: rakitBenar,
      petunjuk: "Peti di ribuan, dus di ratusan, bungkus di puluhan, dan benda di satuan. Tulis dari kiri. Kemasan yang tidak ada ditulis 0.",
    },
    {
      stasiun: "papan",
      tanya: `Pada papan ${lambangM(k.n)}, angka di tempat ${TEMPAT[iPapan]} adalah…`,
      opsi: susunOpsi(papanBenar, duaPengecoh(papanBenar, [...[1, 2, 3].map((j) => String(d[(iPapan + j) % 4])), ...[1, 2, 3].map((j) => String((d[iPapan] + j) % 10))]), idx + 1),
      benar: papanBenar,
      petunjuk: "Dari kiri: ribuan, ratusan, puluhan, lalu satuan. Hitung tempatnya dari kiri.",
    },
    {
      stasiun: "baca",
      tanya: `${lambangM(k.n)} dibaca…`,
      opsi: susunOpsi(bacaM(k.n), duaPengecoh(bacaM(k.n), [bacaKeliru(k.n), bacaDigit(k.n)]), idx + 2),
      benar: bacaM(k.n),
      petunjuk: "Baca dari kiri dengan kata ribu, ratus, dan puluh. Tempat yang berisi 0 dilewati. Ribuan 1 dibaca seribu.",
    },
    {
      stasiun: "tulis",
      tanya: `Tulis lambang dari kata: ${bacaM(k.tulis)}.`,
      opsi: susunOpsi(lambangM(k.tulis), duaPengecoh(lambangM(k.tulis), tulisKeliru(k.tulis)), idx),
      benar: lambangM(k.tulis),
      petunjuk: "Isi keempat tempat. Tempat yang tidak disebut dalam kata diisi 0 agar angka lain tetap di tempatnya.",
    },
  ];
  return { id: k.id, nama: lambangM(k.n), ringkas: `${lambangM(k.n)} dibaca ${bacaM(k.n)}. Lalu ${bacaM(k.tulis)} ditulis ${lambangM(k.tulis)}.`, langkah };
}

export const MESIN_BACA_KA: DefMesin = { id: "mesin-baca-k4b1ka", judul: "Mesin Baca", selesaiId: "mesin-baca-ka", stasiun: STASIUN_BACA, kasus: KASUS_BACA.map(kasusMesinBaca) };
