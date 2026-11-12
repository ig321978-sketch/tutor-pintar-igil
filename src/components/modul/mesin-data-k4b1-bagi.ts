/**
 * Tiga definisi Mesin Bertahap Kelas 4 Bab 1 untuk perkalian, pembagian, serta faktor dan kelipatan
 * (Sub-Bab G, H, I), dijalankan mesin berstasiun mesin-bertahap-k3b1.ts. Semua pertanyaan, kunci, dan
 * pengecoh DIHITUNG dari soalnya.
 *  - MESIN_KALI   (G): Array → Urai → Bersusun → Periksa     (12 × 4, 14 × 5, 12 × 8)
 *  - MESIN_BAGI   (H): Puluhan → Satuan → Sisa → Periksa     (48 : 4, 81 : 3, 47 : 5)
 *  - MESIN_FAKTOR (I): Bagi → Sisa → Pasangan → Kelipatan    (12, 20, 24)
 * Murni: tanpa React, tanpa jaringan. Hanya impor tipe. Diuji di scripts/uji-lab-k4b1.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));
const duaPengecoh = (benar: string, calon: string[]): string[] => [...new Set(calon.filter((c) => c !== benar))].slice(0, 2);
const angkaPengecoh = (benar: number, calon: number[]): string[] => duaPengecoh(String(benar), calon.filter((v) => v >= 0 && v !== benar).map(String));

/* ------------------------------ G: Mesin Kali ------------------------------ */

export type KasusKali = { id: string; n: number; k: number };
export const KASUS_KALI: KasusKali[] = [
  { id: "12x4", n: 12, k: 4 },
  { id: "14x5", n: 14, k: 5 },
  { id: "12x8", n: 12, k: 8 },
];

export const STASIUN_KALI: StasiunDef[] = [
  { id: "array", nama: "Array", ikon: "🍩" },
  { id: "urai", nama: "Urai", ikon: "📜" },
  { id: "bersusun", nama: "Bersusun", ikon: "⬇️" },
  { id: "periksa", nama: "Periksa", ikon: "🔍" },
];

export function kasusMesinKali(c: KasusKali, idx: number): KasusMesin {
  const { n, k } = c;
  const p = Math.floor(n / 10) * 10;
  const s = n % 10;
  const hasil = n * k;
  const satuan = s * k;
  const tulis = satuan % 10;
  const simpan = Math.floor(satuan / 10);
  const kolomBenar = simpan ? `tulis ${tulis}, simpan ${simpan}` : `tulis ${tulis}, tidak menyimpan`;
  const uraiBenar = `${p * k} + ${s * k} = ${hasil}`;
  const lupa = Math.floor(n / 10) * k * 10 + tulis;
  const langkah: LangkahMesin[] = [
    {
      stasiun: "array",
      tanya: `${n} kotak, tiap kotak berisi ${k}. Banyak seluruhnya (${k} ditambah ${k} sebanyak ${n} kali)…`,
      opsi: susunOpsi(String(hasil), angkaPengecoh(hasil, [n + k, hasil + k, hasil - k, hasil + 10]), idx),
      benar: String(hasil),
      petunjuk: `Perkalian adalah penjumlahan berulang. ${n} × ${k} berarti ${k} ditambah sebanyak ${n} kali, bukan ${n} + ${k}.`,
    },
    {
      stasiun: "urai",
      tanya: `Cara panjang (${p} + ${s}) × ${k}. Hasilnya…`,
      opsi: susunOpsi(uraiBenar, duaPengecoh(uraiBenar, [`${p} + ${s * k} = ${p + s * k}`, `${p * k} + ${s} = ${p * k + s}`, `${p * k} + ${s * k} = ${hasil + 10}`]), idx + 1),
      benar: uraiBenar,
      petunjuk: `Kalikan puluhan dan satuan dengan ${k}, masing-masing. ${p} × ${k} = ${p * k} dan ${s} × ${k} = ${s * k}. Lalu jumlahkan.`,
    },
    {
      stasiun: "bersusun",
      tanya: `Bersusun ${n} × ${k}. Kolom satuan: ${s} × ${k} = ${satuan}. Yang dilakukan…`,
      opsi: susunOpsi(kolomBenar, duaPengecoh(kolomBenar, simpan ? [`tulis ${satuan}, tidak menyimpan`, `tulis ${tulis}, tidak menyimpan`, `tulis ${simpan}, simpan ${tulis}`] : [`tulis ${tulis}, simpan 1`, `tulis ${(tulis + 1) % 10}, tidak menyimpan`]), idx + 2),
      benar: kolomBenar,
      petunjuk: "Bila hasil kolom sepuluh atau lebih, tulis angka satuannya dan simpan jumlah puluhannya ke kolom puluhan. Satu kolom hanya berisi satu angka.",
    },
    {
      stasiun: "periksa",
      tanya: `Periksa ${n} × ${k}. Hasil akhirnya…`,
      opsi: susunOpsi(String(hasil), angkaPengecoh(hasil, [lupa, hasil + 10, hasil - 10, n + k]), idx),
      benar: String(hasil),
      petunjuk: `Hasil cara panjang dan cara bersusun harus sama. Jangan lupa simpanan ${simpan} ikut dijumlahkan di puluhan.`,
    },
  ];
  return { id: c.id, nama: `${n} × ${k}`, ringkas: `${n} × ${k} = ${hasil}${simpan ? ", dengan menyimpan" : ""}. Cara panjang: ${uraiBenar}.`, langkah };
}

export const MESIN_KALI: DefMesin = { id: "mesin-kali-k4b1", judul: "Mesin Kali", selesaiId: "mesin-kali", stasiun: STASIUN_KALI, kasus: KASUS_KALI.map(kasusMesinKali) };

/* ------------------------------ H: Mesin Bagi ------------------------------ */

export type KasusBagi = { id: string; n: number; d: number };
export const KASUS_BAGI: KasusBagi[] = [
  { id: "48:4", n: 48, d: 4 },
  { id: "81:3", n: 81, d: 3 },
  { id: "47:5", n: 47, d: 5 },
];

export const STASIUN_BAGI: StasiunDef[] = [
  { id: "puluhan", nama: "Puluhan", ikon: "🔵" },
  { id: "satuan", nama: "Satuan", ikon: "🔴" },
  { id: "sisa", nama: "Sisa", ikon: "0️⃣" },
  { id: "periksa", nama: "Periksa", ikon: "🔍" },
];

export function kasusMesinBagi(c: KasusBagi, idx: number): KasusMesin {
  const { n, d } = c;
  const t = Math.floor(n / 10);
  const q1 = Math.floor(t / d);
  const r1 = t - q1 * d;
  const cur = r1 * 10 + (n % 10);
  const q2 = Math.floor(cur / d);
  const sisa = cur - q2 * d;
  const hasil = q1 * 10 + q2;
  const benar1 = `${t} : ${d} = ${q1}, sisa ${r1}`;
  const benar2 = `${cur} : ${d} = ${q2}, sisa ${sisa}`;
  const langkah: LangkahMesin[] = [
    {
      stasiun: "puluhan",
      tanya: `${n} : ${d}. Langkah puluhan: ${t} dibagi ${d}.`,
      opsi: susunOpsi(benar1, duaPengecoh(benar1, [`${t} : ${d} = ${q1 + 1}, sisa ${r1}`, `${t} : ${d} = ${q1}, sisa ${r1 + 1}`, `${n % 10} : ${d} = ${Math.floor((n % 10) / d)}, sisa ${(n % 10) % d}`]), idx),
      benar: benar1,
      petunjuk: "Mulai dari puluhan, bukan dari satuan. Bagi angka puluhan dengan pembagi, lalu hitung sisanya.",
    },
    {
      stasiun: "satuan",
      tanya: `Turunkan ${n % 10}. ${r1 ? `Sisa ${r1} dan angka ${n % 10} membentuk ${cur}.` : `Bilangannya ${cur}.`} ${cur} dibagi ${d}.`,
      opsi: susunOpsi(benar2, duaPengecoh(benar2, [`${cur} : ${d} = ${q2 + 1}, sisa ${sisa}`, `${n % 10} : ${d} = ${Math.floor((n % 10) / d)}, sisa ${(n % 10) % d}`, `${cur} : ${d} = ${q2}, sisa ${sisa + 1}`]), idx + 1),
      benar: benar2,
      petunjuk: `Sisa puluhan (${r1}) digabung dengan angka satuan yang diturunkan, menjadi ${cur}. Lalu bagi dengan ${d}.`,
    },
    {
      stasiun: "sisa",
      tanya: `Hasil bagi ${hasil}. ${n} : ${d} bersisa…`,
      opsi: susunOpsi(String(sisa), angkaPengecoh(sisa, [sisa + 1, d - 1, d, hasil % d]), idx + 2),
      benar: String(sisa),
      petunjuk: sisa === 0 ? "Sisa nol berarti habis dibagi." : `Sisa = ${n} − ${d} × ${hasil} = ${sisa}. Sisa selalu lebih kecil dari pembagi.`,
    },
    {
      stasiun: "periksa",
      tanya: `Periksa dengan kali: ${hasil} × ${d}${sisa ? ` + ${sisa}` : ""} = …`,
      opsi: susunOpsi(String(n), angkaPengecoh(n, [n + d, n - d, n + 1, hasil * d - 1]), idx),
      benar: String(n),
      petunjuk: "Hasil bagi dikali pembagi, ditambah sisa, harus kembali ke bilangan yang dibagi.",
    },
  ];
  return { id: c.id, nama: `${n} : ${d}`, ringkas: `${n} : ${d} = ${hasil}${sisa ? `, sisa ${sisa}` : ", habis dibagi"}. Periksa: ${hasil} × ${d}${sisa ? ` + ${sisa}` : ""} = ${n}.`, langkah };
}

export const MESIN_BAGI: DefMesin = { id: "mesin-bagi-k4b1", judul: "Mesin Bagi", selesaiId: "mesin-bagi", stasiun: STASIUN_BAGI, kasus: KASUS_BAGI.map(kasusMesinBagi) };

/* ------------------------------ I: Mesin Faktor ------------------------------ */

export type KasusFaktor = { id: string; n: number; faktorD: number; bukanD: number; k: number; a: number; b: number };
export const KASUS_FAKTOR: KasusFaktor[] = [
  { id: "12", n: 12, faktorD: 4, bukanD: 5, k: 5, a: 17, b: 35 },
  { id: "20", n: 20, faktorD: 5, bukanD: 3, k: 3, a: 10, b: 25 },
  { id: "24", n: 24, faktorD: 6, bukanD: 7, k: 4, a: 9, b: 30 },
];

export const STASIUN_FAKTOR: StasiunDef[] = [
  { id: "bagi", nama: "Bagi", ikon: "➗" },
  { id: "sisa", nama: "Sisa", ikon: "🚫" },
  { id: "pasangan", nama: "Pasangan", ikon: "🔗" },
  { id: "kelipatan", nama: "Kelipatan", ikon: "📶" },
];

export const kelipatanMesin = (k: number, a: number, b: number): number[] => Array.from({ length: Math.floor(100 / k) }, (_, i) => (i + 1) * k).filter((v) => v > a && v < b);
export const faktorMesin = (n: number): number[] => Array.from({ length: n }, (_, i) => i + 1).filter((d) => n % d === 0);

export function kasusMesinFaktor(c: KasusFaktor, idx: number): KasusMesin {
  const { n, faktorD, bukanD, k, a, b } = c;
  const hb = n / faktorD;
  const bukanSisa = n % bukanD;
  const bukanHasil = Math.floor(n / bukanD);
  const benarBagi = `${n} : ${faktorD} = ${hb}, sisa 0`;
  const benarSisa = `sisa ${bukanSisa}, jadi ${bukanD} bukan faktor ${n}`;
  const fak = faktorMesin(n);
  const benarPas = `${faktorD} × ${hb} = ${n}`;
  const kel = kelipatanMesin(k, a, b);
  const benarKel = kel.join(", ");
  const geser = kelipatanMesin(k, a - k, b - k).join(", ");
  const sertaBatas = Array.from({ length: Math.floor(100 / k) }, (_, i) => (i + 1) * k).filter((v) => v >= a && v <= b).join(", ");
  const langkah: LangkahMesin[] = [
    {
      stasiun: "bagi",
      tanya: `Apakah ${faktorD} faktor ${n}? ${n} : ${faktorD} = …`,
      opsi: susunOpsi(benarBagi, duaPengecoh(benarBagi, [`${n} : ${faktorD} = ${hb}, sisa 1`, `${n} : ${faktorD} = ${hb + 1}, sisa 0`, `${n} : ${faktorD} = ${hb - 1}, sisa ${faktorD}`]), idx),
      benar: benarBagi,
      petunjuk: `Bagi ${n} dengan ${faktorD}. ${faktorD} × ${hb} = ${n}, jadi pas dan sisanya nol.`,
    },
    {
      stasiun: "sisa",
      tanya: `${n} : ${bukanD} = ${bukanHasil}, sisa ${bukanSisa}. Apa artinya?`,
      opsi: susunOpsi(benarSisa, duaPengecoh(benarSisa, [`sisa ${bukanSisa}, tetapi ${bukanD} tetap faktor ${n}`, `sisa 0, jadi ${bukanD} faktor ${n}`, `${bukanD} faktor ${n}`]), idx + 1),
      benar: benarSisa,
      petunjuk: "Faktor harus habis membagi, sisanya nol. Bila ada sisa, bilangan itu bukan faktor.",
    },
    {
      stasiun: "pasangan",
      tanya: `${faktorD} adalah faktor ${n}. Pasangannya, yaitu ${faktorD} × … = ${n}`,
      opsi: susunOpsi(benarPas, duaPengecoh(benarPas, [`${faktorD} × ${hb + 1} = ${faktorD * (hb + 1)}`, `${faktorD} × ${faktorD} = ${faktorD * faktorD}`, `${faktorD} + ${hb} = ${faktorD + hb}`]), idx + 2),
      benar: benarPas,
      petunjuk: `Pasangan faktor dikalikan hasilnya ${n}. Cari ${faktorD} × ? = ${n}, yaitu ${n} dibagi ${faktorD}.`,
    },
    {
      stasiun: "kelipatan",
      tanya: `Kelipatan ${k} lebih dari ${a} dan kurang dari ${b} adalah…`,
      opsi: susunOpsi(benarKel, duaPengecoh(benarKel, [geser, sertaBatas, fak.join(", ")]), idx),
      benar: benarKel,
      petunjuk: `Daftar kelipatan ${k}: ${k}, ${2 * k}, ${3 * k}, dan seterusnya. Ambil yang lebih dari ${a} dan kurang dari ${b}. ${a} dan ${b} sendiri tidak ikut.`,
    },
  ];
  return { id: c.id, nama: `Faktor ${n}`, ringkas: `Faktor ${n}: ${fak.join(", ")}. ${faktorD} × ${hb} = ${n}. Kelipatan ${k} di antara ${a} dan ${b}: ${benarKel}.`, langkah };
}

export const MESIN_FAKTOR: DefMesin = { id: "mesin-faktor-k4b1", judul: "Mesin Faktor", selesaiId: "mesin-faktor", stasiun: STASIUN_FAKTOR, kasus: KASUS_FAKTOR.map(kasusMesinFaktor) };

export const SEMUA_MESIN_K4B1_BAGI: DefMesin[] = [MESIN_KALI, MESIN_BAGI, MESIN_FAKTOR];
