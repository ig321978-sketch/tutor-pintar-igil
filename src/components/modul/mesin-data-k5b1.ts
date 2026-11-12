/**
 * Definisi Mesin Bertahap Kelas 5 Bab 1 (Bilangan Cacah sampai 100.000), dijalankan mesin berstasiun
 * mesin-bertahap-k3b1.ts dan dieja ejaK5B1. Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari bilangan kasus.
 *  - MESIN_TEMPAT (A): Tulis → Tempat → Nilai → Baca   (14.500, 87.986, 40.350)
 *    Tulis: kata menjadi angka (pengecoh: satu digit hilang, dua digit bertukar). Tempat: tempat satu digit
 *    (pengecoh: tempat tetangga). Nilai: nilai digit itu (pengecoh: digitnya saja, nilai di tempat tetangga).
 *    Baca: bacaan per periode (pengecoh: digit dibaca satu per satu, dua digit bertukar).
 *  - MESIN_BANDING (B): Sejajar → Penentu → Tanda → Urut   (78.897 dan 87.897, 56.560 dan 57.000, 40.200 dan 38.500)
 *    Sejajar: digit puluh ribuan (pengecoh: digit satuan, ribuan, tertukar). Penentu: tempat pertama dari kiri yang
 *    berbeda (pengecoh: satuan, tempat tetangga). Tanda: kalimat < > =. Urut: tiga bilangan naik atau turun
 *    (pengecoh: arah terbalik, diurutkan menurut satuan, urutan asal).
 * Data dari Buku Siswa Kelas V Bab 1 (dicocokkan dengan data-k5b1.ts di uji). Murni: tanpa React, tanpa jaringan.
 * Hanya impor tipe. Diuji di scripts/uji-lab-k5b1.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));
const duaPengecoh = (benar: string, calon: string[]): string[] => [...new Set(calon.filter((c) => c !== benar))].slice(0, 2);

export const TEMPAT_M = ["ratus ribuan", "puluh ribuan", "ribuan", "ratusan", "puluhan", "satuan"];
const BOBOT_M = [100000, 10000, 1000, 100, 10, 1];
const ANGKA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];

export const titikM = (n: number): string => (n >= 1000 ? `${Math.floor(n / 1000)}.${String(n % 1000).padStart(3, "0")}` : String(n));
const enam = (n: number): number[] => BOBOT_M.map((b) => Math.floor(n / b) % 10);
const dariEnam = (d: number[]): number => d.reduce((a, v, i) => a + v * BOBOT_M[i], 0);

function puluhM(n: number): string {
  if (n < 10) return ANGKA[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${ANGKA[n - 10]} belas`;
  return n % 10 === 0 ? `${ANGKA[Math.floor(n / 10)]} puluh` : `${ANGKA[Math.floor(n / 10)]} puluh ${ANGKA[n % 10]}`;
}
function ratusM(n: number): string {
  const r = Math.floor(n / 100);
  const s = n % 100;
  const bag = [r === 0 ? "" : r === 1 ? "seratus" : `${ANGKA[r]} ratus`, s === 0 ? "" : puluhM(s)];
  return bag.filter(Boolean).join(" ");
}
/** Bacaan 1 sampai 100.000 per periode. */
export function bacaM(n: number): string {
  const rb = Math.floor(n / 1000);
  const bag = [rb === 0 ? "" : rb === 1 ? "seribu" : `${ratusM(rb)} ribu`, ratusM(n % 1000)];
  return bag.filter(Boolean).join(" ");
}
export const bacaDigitM = (n: number): string => String(n).split("").map((c) => ANGKA[Number(c)]).join(" ");
/** Ribuan dan ratusan bertukar. */
export const tukarM = (n: number): number => {
  const d = enam(n);
  [d[2], d[3]] = [d[3], d[2]];
  return dariEnam(d);
};

/* ------------------------------ A: Mesin Nilai Tempat ------------------------------ */

export type KasusTempat = { id: string; n: number; tempat: string };
export const KASUS_TEMPAT: KasusTempat[] = [
  { id: "14500", n: 14500, tempat: "puluh ribuan" },
  { id: "87986", n: 87986, tempat: "ribuan" },
  { id: "40350", n: 40350, tempat: "ratusan" },
];

export const STASIUN_TEMPAT: StasiunDef[] = [
  { id: "tulis", nama: "Tulis", ikon: "✍️" },
  { id: "tempat", nama: "Tempat", ikon: "📍" },
  { id: "nilai", nama: "Nilai", ikon: "💎" },
  { id: "baca", nama: "Baca", ikon: "🗣️" },
];

export function kasusMesinTempat(k: KasusTempat, idx: number): KasusMesin {
  const t = TEMPAT_M.indexOf(k.tempat);
  const d = enam(k.n)[t];
  const nilai = d * BOBOT_M[t];
  const tetangga = [TEMPAT_M[t - 1], TEMPAT_M[t + 1]].filter(Boolean) as string[];
  const nilaiSalah = [d, nilai * 10, nilai / 10].filter((v) => Number.isInteger(v) && v <= 100000).map(titikM);
  const langkah: LangkahMesin[] = [
    {
      stasiun: "tulis",
      tanya: `Bilangan ${bacaM(k.n)} ditulis dengan angka …`,
      opsi: susunOpsi(titikM(k.n), duaPengecoh(titikM(k.n), [titikM(Math.floor(k.n / 10)), titikM(tukarM(k.n))]), idx),
      benar: titikM(k.n),
      petunjuk: "Tulis digit tiap tempat dari kiri. Nol tetap ditulis agar tempat tidak bergeser.",
    },
    {
      stasiun: "tempat",
      tanya: `Pada ${titikM(k.n)}, digit ${d} ada di tempat …`,
      opsi: susunOpsi(k.tempat, duaPengecoh(k.tempat, tetangga), idx + 1),
      benar: k.tempat,
      petunjuk: "Hitung tempat dari kanan: satuan, puluhan, ratusan, ribuan, puluh ribuan.",
    },
    {
      stasiun: "nilai",
      tanya: `Digit ${d} di tempat ${k.tempat} bernilai …`,
      opsi: susunOpsi(titikM(nilai), duaPengecoh(titikM(nilai), nilaiSalah), idx + 2),
      benar: titikM(nilai),
      petunjuk: `Satu di tempat ${k.tempat} bernilai ${titikM(BOBOT_M[t])}. Jangan hanya menyebut digitnya.`,
    },
    {
      stasiun: "baca",
      tanya: `${titikM(k.n)} dibaca …`,
      opsi: susunOpsi(bacaM(k.n), duaPengecoh(bacaM(k.n), [bacaDigitM(k.n), bacaM(tukarM(k.n))]), idx + 3),
      benar: bacaM(k.n),
      petunjuk: "Kelompokkan tiga digit dari kanan. Baca bagian kiri dengan kata ribu, lalu bagian kanan.",
    },
  ];
  return {
    id: k.id,
    nama: `Bilangan ${titikM(k.n)}`,
    ringkas: `${titikM(k.n)} dibaca ${bacaM(k.n)}. Digit ${d} di tempat ${k.tempat} bernilai ${titikM(nilai)}.`,
    langkah,
  };
}

export const MESIN_TEMPAT: DefMesin = {
  id: "mesin-tempat-k5b1",
  judul: "Mesin Nilai Tempat",
  selesaiId: "mesin-tempat",
  stasiun: STASIUN_TEMPAT,
  kasus: KASUS_TEMPAT.map(kasusMesinTempat),
};

/* ------------------------------ B: Mesin Banding ------------------------------ */

export type KasusBanding = { id: string; angka: number[]; arah: "naik" | "turun" };
/** Dua bilangan pertama dibandingkan; ketiganya diurutkan. */
export const KASUS_BANDING: KasusBanding[] = [
  { id: "78897", angka: [78897, 87897, 56475], arah: "turun" },
  { id: "56560", angka: [56560, 57000, 65750], arah: "naik" },
  { id: "40200", angka: [40200, 38500, 39999], arah: "naik" },
];

export const STASIUN_BANDING: StasiunDef[] = [
  { id: "sejajar", nama: "Sejajar", ikon: "📏" },
  { id: "penentu", nama: "Penentu", ikon: "🔍" },
  { id: "tanda", nama: "Tanda", ikon: "⚖️" },
  { id: "urut", nama: "Urut", ikon: "📶" },
];

export function kasusMesinBanding(k: KasusBanding, idx: number): KasusMesin {
  const [a, b] = k.angka;
  const da = enam(a);
  const db = enam(b);
  // Tempat 1 (puluh ribuan) sampai 5 (satuan) pada tabel enam tempat.
  let p = 1;
  while (p < 5 && da[p] === db[p]) p += 1;
  const tanda = a < b ? "<" : a > b ? ">" : "=";
  const pasang = (i: number) => `${da[i]} dan ${db[i]}`;
  const naik = [...k.angka].sort((x, y) => x - y);
  const benarUrut = k.arah === "naik" ? naik : [...naik].reverse();
  const teks = (d: number[]) => d.map(titikM).join(", ");
  const bySatuan = [...k.angka].sort((x, y) => (k.arah === "naik" ? (x % 10) - (y % 10) : (y % 10) - (x % 10)));
  const langkah: LangkahMesin[] = [
    {
      stasiun: "sejajar",
      tanya: `Tulis ${titikM(a)} dan ${titikM(b)} sejajar. Digit puluh ribuan keduanya …`,
      opsi: susunOpsi(pasang(1), duaPengecoh(pasang(1), [pasang(5), pasang(2), `${db[1]} dan ${da[1]}`]), idx),
      benar: pasang(1),
      petunjuk: "Tulis kedua bilangan rata kanan agar tempatnya sejajar. Tempat terbesar ada di kiri.",
    },
    {
      stasiun: "penentu",
      tanya: `Pada ${titikM(a)} dan ${titikM(b)}, tempat pertama dari kiri yang digitnya berbeda …`,
      opsi: susunOpsi(TEMPAT_M[p], duaPengecoh(TEMPAT_M[p], ["satuan", TEMPAT_M[p + 1] ?? "puluhan", TEMPAT_M[p - 1]]), idx + 1),
      benar: TEMPAT_M[p],
      petunjuk: "Mulai dari puluh ribuan. Bila digitnya sama, geser satu tempat ke kanan sampai ketemu yang berbeda.",
    },
    {
      stasiun: "tanda",
      tanya: `${titikM(a)} … ${titikM(b)}`,
      opsi: susunOpsi(`${titikM(a)} ${tanda} ${titikM(b)}`, duaPengecoh(`${titikM(a)} ${tanda} ${titikM(b)}`, ["<", ">", "="].map((t) => `${titikM(a)} ${t} ${titikM(b)}`)), idx + 2),
      benar: `${titikM(a)} ${tanda} ${titikM(b)}`,
      petunjuk: `Lihat digit penentunya di ${TEMPAT_M[p]}: ${da[p]} dan ${db[p]}. Digit penentu yang lebih kecil milik bilangan yang lebih kecil.`,
    },
    {
      stasiun: "urut",
      tanya: `Urutkan ${k.arah}: ${teks(k.angka)}.`,
      opsi: susunOpsi(teks(benarUrut), duaPengecoh(teks(benarUrut), [teks([...benarUrut].reverse()), teks(bySatuan), teks(k.angka), teks([benarUrut[1], benarUrut[0], benarUrut[2]])]), idx + 3),
      benar: teks(benarUrut),
      petunjuk: k.arah === "naik" ? "Urut naik dimulai dari yang terkecil. Bandingkan tiap pasangan dari kiri." : "Urut turun dimulai dari yang terbesar. Bandingkan tiap pasangan dari kiri.",
    },
  ];
  return {
    id: k.id,
    nama: `Bilangan ${titikM(a)} dan ${titikM(b)}`,
    ringkas: `${titikM(a)} ${tanda} ${titikM(b)}, penentunya di ${TEMPAT_M[p]}. Urut ${k.arah}: ${teks(benarUrut)}.`,
    langkah,
  };
}

export const MESIN_BANDING: DefMesin = {
  id: "mesin-banding-k5b1",
  judul: "Mesin Banding",
  selesaiId: "mesin-banding",
  stasiun: STASIUN_BANDING,
  kasus: KASUS_BANDING.map(kasusMesinBanding),
};

export const SEMUA_MESIN_K5B1 = [MESIN_TEMPAT, MESIN_BANDING];
