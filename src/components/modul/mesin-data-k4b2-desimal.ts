/**
 * Dua definisi Mesin Bertahap Kelas 4 Bab 2 untuk desimal dan persen (Sub-Bab D dan E), dijalankan mesin berstasiun
 * mesin-bertahap-k3b1.ts. Semua pertanyaan, kunci, dan pengecoh DISUSUN dari bilangan bulat kasusnya.
 *  - MESIN_DESIMAL (D): Pecahan → Angka → Desimal → Balik   (3/10, 7/100, 25/100)
 *  - MESIN_PERSEN  (E): Pecahan → Persen → Geser → Balik    (0,75; 0,36; 2,46)
 * Murni: tanpa React, tanpa jaringan. Hanya impor tipe. Diuji di scripts/uji-lab-k4b2.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));
const dua = (n: number): string => String(n).padStart(2, "0");

/** Nilai seperseribu dari tulisan desimal "a,b" (untuk menyaring pengecoh yang ternyata sama nilainya). */
const seribu = (s: string): number => {
  const [bulat, pecah = ""] = s.split(",");
  return Number(bulat) * 1000 + Number(`${pecah}000`.slice(0, 3));
};
const pilihPengecoh = (benar: string, calon: string[], sama: (a: string, b: string) => boolean): string[] => {
  const hasil: string[] = [];
  for (const c of calon) if (!sama(c, benar) && !hasil.some((h) => h === c)) hasil.push(c);
  return hasil.slice(0, 2);
};
const angkaPengecoh = (benar: number, calon: number[]): string[] => [...new Set(calon.filter((v) => v >= 1 && v !== benar).map(String))].slice(0, 2);

/* ------------------------------ D: Mesin Desimal ------------------------------ */

export type KasusDesimal = { id: string; p: number; q: 10 | 100 };
export const KASUS_DESIMAL: KasusDesimal[] = [
  { id: "roti", p: 3, q: 10 },
  { id: "biskuit", p: 7, q: 100 },
  { id: "kisi", p: 25, q: 100 },
];

export const STASIUN_DESIMAL: StasiunDef[] = [
  { id: "pecahan", nama: "Pecahan", ikon: "🍞" },
  { id: "angka", nama: "Angka", ikon: "🔢" },
  { id: "desimal", nama: "Desimal", ikon: "⚫" },
  { id: "balik", nama: "Balik", ikon: "↩️" },
];

/** Desimal persepuluhan atau perseratusan dari pembilang bulat. */
export const desimalKasus = (p: number, q: 10 | 100): string => (q === 10 ? `0,${p}` : `0,${dua(p)}`);

export function kasusMesinDesimal(k: KasusDesimal, idx: number): KasusMesin {
  const { p, q } = k;
  const d = desimalKasus(p, q);
  const lain = q === 10 ? 100 : 10;
  const nol = q === 10 ? 1 : 2;
  const langkah: LangkahMesin[] = [
    {
      stasiun: "pecahan",
      tanya: `Satu keseluruhan dibagi ${q} bagian sama besar, ${p} bagian diarsir. Pecahannya…`,
      opsi: susunOpsi(`${p}/${q}`, [`${q}/${p}`, `${p}/${lain}`], idx),
      benar: `${p}/${q}`,
      petunjuk: `Pembilang (yang diarsir) di atas, penyebut (semua bagian) di bawah: ${p}/${q}. Jangan dibalik, dan hitung semua bagiannya, yaitu ${q}.`,
    },
    {
      stasiun: "angka",
      tanya: `Penyebutnya ${q}. Banyak angka di belakang koma pada desimalnya adalah…`,
      opsi: susunOpsi(String(nol), angkaPengecoh(nol, [1, 2, 3]), idx + 1),
      benar: String(nol),
      petunjuk: `Penyebut ${q} punya ${nol === 1 ? "satu nol" : "dua nol"}, jadi desimalnya punya ${nol === 1 ? "satu angka" : "dua angka"} di belakang koma.`,
    },
    {
      stasiun: "desimal",
      tanya: `${p}/${q} ditulis desimal…`,
      opsi: susunOpsi(
        d,
        pilihPengecoh(d, [`0,${p}`, `0,0${p}`, `${Math.trunc(p / 10)},${p % 10}`, `${p},0`, `0,${dua(p)}${q === 10 ? "" : "0"}`], (a, b) => seribu(a) === seribu(b)),
        idx + 2
      ),
      benar: d,
      petunjuk: `Isi ${nol === 1 ? "satu" : "dua"} angka di belakang koma dengan pembilang ${p}${q === 100 && p < 10 ? ", dan nol di depan tetap ditulis" : ""}: ${d}.`,
    },
    {
      stasiun: "balik",
      tanya: `${d} ditulis sebagai pecahan…`,
      opsi: susunOpsi(`${p}/${q}`, q === 10 ? [`${p}/100`, `${p * 10}/10`] : [`${p}/10`, `${p}/1000`], idx),
      benar: `${p}/${q}`,
      petunjuk: `${nol === 1 ? "Satu" : "Dua"} angka di belakang koma berarti penyebut ${q}. Pembilangnya angka di belakang koma: ${p}/${q}.`,
    },
  ];
  return { id: k.id, nama: d, ringkas: `${p}/${q} = ${d}: ${nol === 1 ? "satu" : "dua"} angka di belakang koma, penyebut ${q}.`, langkah };
}

export const MESIN_DESIMAL: DefMesin = { id: "mesin-desimal-k4b2", judul: "Mesin Desimal", selesaiId: "mesin-desimal", stasiun: STASIUN_DESIMAL, kasus: KASUS_DESIMAL.map(kasusMesinDesimal) };

/* ------------------------------ E: Mesin Persen ------------------------------ */

export type KasusPersen = { id: string; h: number };
export const KASUS_PERSEN: KasusPersen[] = [
  { id: "tiga-perempat", h: 75 },
  { id: "kotak", h: 36 },
  { id: "lebih", h: 246 },
];

export const STASIUN_PERSEN: StasiunDef[] = [
  { id: "pecahan", nama: "Pecahan", ikon: "🍰" },
  { id: "persen", nama: "Persen", ikon: "💯" },
  { id: "geser", nama: "Geser", ikon: "↔️" },
  { id: "balik", nama: "Balik", ikon: "↩️" },
];

export const desimalSeratusan = (h: number): string => `${Math.trunc(h / 100)},${dua(h % 100)}`;

export function kasusMesinPersen(k: KasusPersen, idx: number): KasusMesin {
  const { h } = k;
  const d = desimalSeratusan(h);
  const salahDes = [`${Math.trunc(h / 10)},${h % 10}`, `0,${String(h).padStart(3, "0")}`];
  const langkah: LangkahMesin[] = [
    {
      stasiun: "pecahan",
      tanya: `${d} sama dengan … per seratus.`,
      opsi: susunOpsi(`${h}/100`, [`${h}/10`, `${h}/1000`], idx),
      benar: `${h}/100`,
      petunjuk: `Dua angka di belakang koma berarti per seratus. ${d} sama dengan ${h}/100.`,
    },
    {
      stasiun: "persen",
      tanya: `${h}/100 sama dengan … persen.`,
      opsi: susunOpsi(`${h}%`, [`${h * 10}%`, `${Math.trunc(h / 10)}%`], idx + 1),
      benar: `${h}%`,
      petunjuk: `Persen artinya per seratus, jadi ${h}/100 ditulis ${h}%. Pembilangnya langsung menjadi bilangan persen.`,
    },
    {
      stasiun: "geser",
      tanya: `Cara langsung: ${d} × 100%. Koma digeser ke kanan…`,
      opsi: susunOpsi("2 kali", ["1 kali", "3 kali"], idx + 2),
      benar: "2 kali",
      petunjuk: `Mengalikan dengan 100 menggeser koma dua kali ke kanan: ${d} menjadi ${h}. Lalu tulis tanda persen.`,
    },
    {
      stasiun: "balik",
      tanya: `${h}% ditulis desimal…`,
      opsi: susunOpsi(d, salahDes, idx),
      benar: d,
      petunjuk: `Dari persen ke desimal, bagi dengan 100: geser koma dua kali ke kiri. ${h}% = ${d}.`,
    },
  ];
  return { id: k.id, nama: `${d} = ${h}%`, ringkas: `${d} = ${h}/100 = ${h}%.`, langkah };
}

export const MESIN_PERSEN: DefMesin = { id: "mesin-persen-k4b2", judul: "Mesin Persen", selesaiId: "mesin-persen", stasiun: STASIUN_PERSEN, kasus: KASUS_PERSEN.map(kasusMesinPersen) };

export const SEMUA_MESIN_K4B2_DESIMAL: DefMesin[] = [MESIN_DESIMAL, MESIN_PERSEN];
