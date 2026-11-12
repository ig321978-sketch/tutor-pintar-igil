/**
 * Empat definisi Mesin Bertahap Kelas 4 Bab 1 untuk bilangan sampai 10.000 (Sub-Bab A–D), dijalankan mesin
 * berstasiun mesin-bertahap-k3b1.ts. Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari data kasusnya.
 * Letak jawaban benar diputar per kasus dan stasiun.
 *  - MESIN_BACA    (A): Rakit → Papan → Baca → Tulis          (3.286, 7.003, 1.025)
 *  - MESIN_NILAI   (B): Tempat → Nilai → Uraian → Tabel       (2.150, 8.463, 4.675)
 *  - MESIN_BANDING (C): Ribuan → Penentu → Tanda → Urut       (8.750 dan 7.500, 4.352 dan 4.365, 3.676 dan 3.726)
 *  - MESIN_SUSUN   (D): Susun → Urai → Nol → Periksa          (6.348, 6.035, 7.020)
 * Murni: tanpa React, tanpa jaringan. Hanya impor tipe. Diuji di scripts/uji-lab-k4b1.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
/** Letakkan jawaban benar di posisi yang berputar menurut `idx`. */
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));
/** Dua pengecoh pertama yang berbeda dari kunci dan satu sama lain. */
const duaPengecoh = (benar: string, calon: string[]): string[] => [...new Set(calon.filter((c) => c !== benar))].slice(0, 2);

const TEMPAT = ["ribuan", "ratusan", "puluhan", "satuan"];
const BOBOT = [1000, 100, 10, 1];
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
  { id: "3286", n: 3286, tulis: 9045 },
  { id: "7003", n: 7003, tulis: 6002 },
  { id: "1025", n: 1025, tulis: 2903 },
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

export const MESIN_BACA: DefMesin = { id: "mesin-baca-k4b1", judul: "Mesin Baca", selesaiId: "mesin-baca", stasiun: STASIUN_BACA, kasus: KASUS_BACA.map(kasusMesinBaca) };

/* ------------------------------ B: Mesin Nilai ------------------------------ */

export type KasusNilai = { id: string; n: number; angka: number; kolom: number };
export const KASUS_NILAI: KasusNilai[] = [
  { id: "2150", n: 2150, angka: 2, kolom: 1 },
  { id: "8463", n: 8463, angka: 6, kolom: 0 },
  { id: "4675", n: 4675, angka: 6, kolom: 2 },
];

export const STASIUN_NILAI: StasiunDef[] = [
  { id: "tempat", nama: "Tempat", ikon: "📍" },
  { id: "nilai", nama: "Nilai", ikon: "🔢" },
  { id: "uraian", nama: "Uraian", ikon: "🔓" },
  { id: "tabel", nama: "Tabel", ikon: "📋" },
];

export const uraianM = (d: readonly number[]): string => d.map((v, i) => lambangM(v * BOBOT[i])).join(" + ");
/** Jumlah suku uraian teks "2.000 + 100 + 50 + 0". */
export const jumlahUraianTeks = (t: string): number => t.split(" + ").map((s) => Number(s.replace(/\./g, ""))).reduce((a, b) => a + b, 0);

export function kasusMesinNilai(k: KasusNilai, idx: number): KasusMesin {
  const d = digit(k.n);
  const i = d.indexOf(k.angka);
  const nilai = k.angka * BOBOT[i];
  const nilaiBenar = lambangM(nilai);
  const uraianBenar = uraianM(d);
  const geserKanan = d.map((v, j) => lambangM(v * BOBOT[Math.min(3, j + 1)])).join(" + ");
  const kolomBenar = String(d[k.kolom]);
  const langkah: LangkahMesin[] = [
    {
      stasiun: "tempat",
      tanya: `Pada ${lambangM(k.n)}, angka ${k.angka} ada di tempat…`,
      opsi: susunOpsi(TEMPAT[i], duaPengecoh(TEMPAT[i], [TEMPAT[(i + 1) % 4], TEMPAT[(i + 3) % 4]]), idx),
      benar: TEMPAT[i],
      petunjuk: "Hitung dari kiri: ribuan, ratusan, puluhan, satuan.",
    },
    {
      stasiun: "nilai",
      tanya: `Angka ${k.angka} pada ${lambangM(k.n)} bernilai…`,
      opsi: susunOpsi(nilaiBenar, duaPengecoh(nilaiBenar, [String(k.angka), lambangM(k.angka * BOBOT[Math.max(0, i - 1)]), lambangM(k.angka * BOBOT[Math.min(3, i + 1)])]), idx + 1),
      benar: nilaiBenar,
      petunjuk: `Angka ${k.angka} ada di ${TEMPAT[i]}. Nilainya bergantung pada tempat, bukan hanya angkanya.`,
    },
    {
      stasiun: "uraian",
      tanya: `Uraian ${lambangM(k.n)} menurut nilai tempat adalah…`,
      opsi: susunOpsi(uraianBenar, duaPengecoh(uraianBenar, [d.join(" + "), geserKanan]), idx + 2),
      benar: uraianBenar,
      petunjuk: "Tulis nilai tiap tempat, termasuk nol. Jumlahkan lagi untuk memeriksa: hasilnya harus sama dengan bilangan semula.",
    },
    {
      stasiun: "tabel",
      tanya: `Pada tabel nilai tempat, kolom ${TEMPAT[k.kolom]} untuk ${lambangM(k.n)} diisi…`,
      opsi: susunOpsi(kolomBenar, duaPengecoh(kolomBenar, [String(d[k.kolom] * BOBOT[k.kolom]), String(d[(k.kolom + 1) % 4]), String((d[k.kolom] + 1) % 10)]), idx),
      benar: kolomBenar,
      petunjuk: "Kolom sudah menunjukkan tempatnya, jadi isinya cukup digit, bukan nilai penuh.",
    },
  ];
  return { id: k.id, nama: lambangM(k.n), ringkas: `Angka ${k.angka} pada ${lambangM(k.n)} bernilai ${nilaiBenar}. ${lambangM(k.n)} = ${uraianBenar}.`, langkah };
}

export const MESIN_NILAI: DefMesin = { id: "mesin-nilai-k4b1", judul: "Mesin Nilai", selesaiId: "mesin-nilai", stasiun: STASIUN_NILAI, kasus: KASUS_NILAI.map(kasusMesinNilai) };

/* ------------------------------ C: Mesin Banding ------------------------------ */

export type KasusBanding = { id: string; a: number; b: number; urut: number[] };
export const KASUS_BANDING: KasusBanding[] = [
  { id: "harga", a: 8750, b: 7500, urut: [7500, 8750, 6750] },
  { id: "puluhan", a: 4352, b: 4365, urut: [4365, 4352, 4355] },
  { id: "gunung", a: 3676, b: 3726, urut: [3676, 2460, 3726] },
];

export const STASIUN_BANDING: StasiunDef[] = [
  { id: "ribuan", nama: "Ribuan", ikon: "🟣" },
  { id: "penentu", nama: "Penentu", ikon: "🔍" },
  { id: "tanda", nama: "Tanda", ikon: "🐊" },
  { id: "urut", nama: "Urut", ikon: "📶" },
];

export function penentuM(a: number, b: number): number {
  const da = digit(a);
  const db = digit(b);
  return da.findIndex((v, i) => v !== db[i]);
}
export const tandaM = (a: number, b: number): string => (a > b ? ">" : a < b ? "<" : "=");

export function kasusMesinBanding(k: KasusBanding, idx: number): KasusMesin {
  const da = digit(k.a);
  const db = digit(k.b);
  const p = penentuM(k.a, k.b);
  const ribuanBenar = `${da[0]} dan ${db[0]}`;
  const naik = [...k.urut].sort((x, y) => x - y);
  const urutBenar = naik.map(lambangM).join(", ");
  const menurutSatuan = [...k.urut].sort((x, y) => (x % 10) - (y % 10) || x - y);
  const langkah: LangkahMesin[] = [
    {
      stasiun: "ribuan",
      tanya: `Bandingkan ${lambangM(k.a)} dan ${lambangM(k.b)}. Mulai dari ribuan. Angka ribuannya…`,
      opsi: susunOpsi(ribuanBenar, duaPengecoh(ribuanBenar, [`${da[3]} dan ${db[3]}`, `${da[2]} dan ${db[2]}`, `${da[1]} dan ${db[1]}`, `${db[0]} dan ${da[0] + 1}`]), idx),
      benar: ribuanBenar,
      petunjuk: "Membandingkan dimulai dari tempat paling kiri, yaitu ribuan.",
    },
    {
      stasiun: "penentu",
      tanya: `Tempat pertama yang berbeda pada ${lambangM(k.a)} dan ${lambangM(k.b)} adalah…`,
      opsi: susunOpsi(TEMPAT[p], duaPengecoh(TEMPAT[p], [TEMPAT[3] === TEMPAT[p] ? TEMPAT[0] : TEMPAT[3], TEMPAT[(p + 1) % 4], TEMPAT[(p + 2) % 4]]), idx + 1),
      benar: TEMPAT[p],
      petunjuk: "Lihat dari kiri. Lewati tempat yang angkanya sama. Tempat pertama yang berbeda yang menentukan.",
    },
    {
      stasiun: "tanda",
      tanya: `${lambangM(k.a)} … ${lambangM(k.b)}`,
      opsi: susunOpsi(tandaM(k.a, k.b), ["<", ">", "="].filter((t) => t !== tandaM(k.a, k.b)), idx + 2),
      benar: tandaM(k.a, k.b),
      petunjuk: `Di ${TEMPAT[p]}, ${da[p]} dan ${db[p]}. Mulut tanda terbuka ke bilangan yang lebih besar.`,
    },
    {
      stasiun: "urut",
      tanya: `Urutkan dari terkecil: ${k.urut.map(lambangM).join(", ")}.`,
      opsi: susunOpsi(urutBenar, duaPengecoh(urutBenar, [[...naik].reverse().map(lambangM).join(", "), menurutSatuan.map(lambangM).join(", "), k.urut.map(lambangM).join(", ")]), idx),
      benar: urutBenar,
      petunjuk: "Cari yang terkecil dengan membandingkan dari ribuan, lalu yang berikutnya. Jangan melihat satuan dulu.",
    },
  ];
  return { id: k.id, nama: `${lambangM(k.a)} dan ${lambangM(k.b)}`, ringkas: `${TEMPAT[p]} menentukan: ${lambangM(k.a)} ${tandaM(k.a, k.b)} ${lambangM(k.b)}. Urutan naik ${urutBenar}.`, langkah };
}

export const MESIN_BANDING: DefMesin = { id: "mesin-banding-k4b1", judul: "Mesin Banding", selesaiId: "mesin-banding", stasiun: STASIUN_BANDING, kasus: KASUS_BANDING.map(kasusMesinBanding) };

/* ------------------------------ D: Mesin Susun ------------------------------ */

export type KasusSusun = { id: string; n: number };
export const KASUS_SUSUN: KasusSusun[] = [
  { id: "6348", n: 6348 },
  { id: "6035", n: 6035 },
  { id: "7020", n: 7020 },
];

export const STASIUN_SUSUN: StasiunDef[] = [
  { id: "susun", nama: "Susun", ikon: "🧩" },
  { id: "urai", nama: "Urai", ikon: "🔓" },
  { id: "nol", nama: "Nol", ikon: "0️⃣" },
  { id: "periksa", nama: "Periksa", ikon: "🔍" },
];

export function kasusMesinSusun(k: KasusSusun, idx: number): KasusMesin {
  const d = digit(k.n);
  const sukuTanpaNol = d.map((v, i) => v * BOBOT[i]).filter((v) => v !== 0).map(lambangM).join(" + ");
  const susunBenar = lambangM(k.n);
  const uraianBenar = uraianM(d);
  const iNol = d.indexOf(0) >= 0 ? d.indexOf(0) : 2;
  const sukuBenar = lambangM(d[iNol] * BOBOT[iNol]);
  const lain = `${lambangM((d[0] - 1) * 1000)} + ${lambangM(k.n - (d[0] - 1) * 1000)}`;
  const jumlahLain = k.n;
  const periksaBenar = `${lambangM(jumlahLain)}, jadi benar`;
  const langkah: LangkahMesin[] = [
    {
      stasiun: "susun",
      tanya: `${sukuTanpaNol} disusun menjadi…`,
      opsi: susunOpsi(susunBenar, duaPengecoh(susunBenar, tulisKeliruSusun(k.n)), idx),
      benar: susunBenar,
      petunjuk: "Letakkan tiap nilai di tempatnya. Tempat yang tidak ada nilainya diisi 0.",
    },
    {
      stasiun: "urai",
      tanya: `Uraian ${lambangM(k.n)} menurut tempat adalah…`,
      opsi: susunOpsi(uraianBenar, duaPengecoh(uraianBenar, [d.map((v, i) => lambangM(v * BOBOT[Math.min(3, i + 1)])).join(" + "), [d[0] * 1000, d[1] * 10, d[2] * 100, d[3]].map(lambangM).join(" + ")]), idx + 1),
      benar: uraianBenar,
      petunjuk: "Tulis nilai ribuan, ratusan, puluhan, dan satuan berurutan. Jumlahkan untuk memeriksa.",
    },
    {
      stasiun: "nol",
      tanya: `Pada uraian ${lambangM(k.n)} menurut tempat, suku ${TEMPAT[iNol]} adalah…`,
      opsi: susunOpsi(sukuBenar, duaPengecoh(sukuBenar, [lambangM(Math.max(1, d[iNol]) * BOBOT[iNol] * (d[iNol] === 0 ? 1 : 10)), String(d[iNol] === 0 ? BOBOT[iNol] / 10 || 1 : d[iNol]), lambangM(BOBOT[iNol] * 2)]), idx + 2),
      benar: sukuBenar,
      petunjuk: d[iNol] === 0 ? `Angka ${TEMPAT[iNol]} adalah 0, jadi sukunya 0. Nol tetap ditulis agar tempatnya terjaga.` : `Angka ${TEMPAT[iNol]} adalah ${d[iNol]}, jadi nilainya ${sukuBenar}.`,
    },
    {
      stasiun: "periksa",
      tanya: `Apakah ${lain} juga uraian dari ${lambangM(k.n)}? Jumlahkan dulu. Jumlahnya…`,
      opsi: susunOpsi(periksaBenar, duaPengecoh(periksaBenar, [`${lambangM(jumlahLain - 1000)}, jadi keliru`, `${lambangM(jumlahLain + 100)}, jadi keliru`]), idx),
      benar: periksaBenar,
      petunjuk: "Uraian boleh dengan cara lain. Uraian benar bila jumlah semua sukunya sama dengan bilangan semula.",
    },
  ];
  return { id: k.id, nama: lambangM(k.n), ringkas: `${lambangM(k.n)} = ${uraianBenar}. ${lain} juga berjumlah ${lambangM(k.n)}.`, langkah };
}

/** Lambang keliru saat menyusun: nol dibuang, dan dua angka terakhir tertukar. */
function tulisKeliruSusun(n: number): string[] {
  const d = digit(n);
  const tanpaNol = Number(d.filter((v) => v !== 0).join(""));
  return bukanN(n, [String(tanpaNol), lambangM(dariDigit([d[0], d[2], d[1], d[3]])), lambangM(dariDigit([d[0], d[1], d[3], d[2]])), lambangM(dariDigit([d[0], d[3], d[2], d[1]]))]);
}

export const MESIN_SUSUN: DefMesin = { id: "mesin-susun-k4b1", judul: "Mesin Susun", selesaiId: "mesin-susun", stasiun: STASIUN_SUSUN, kasus: KASUS_SUSUN.map(kasusMesinSusun) };

export const SEMUA_MESIN_K4B1_BILANGAN: DefMesin[] = [MESIN_BACA, MESIN_NILAI, MESIN_BANDING, MESIN_SUSUN];
