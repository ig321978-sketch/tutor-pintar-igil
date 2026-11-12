/**
 * Definisi Mesin Bertahap Kelas 5 Bab 3 (Bilangan Pecahan), dijalankan mesin berstasiun mesin-bertahap-k3b1.ts dan
 * dieja ejaK5B3. Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari bilangan kasus.
 *  - MESIN_BANDING (A): Garis → Banding → Campuran → Urut   (kasus Lompatan Yohana, Pembilang Sama, Penyebut Sama)
 *    Garis: titik ke-t pada garis yang tiap bulatnya dibagi q bagian (pengecoh: pembilang dan penyebut tertukar,
 *           satu bagian kurang).
 *    Banding: pecahan yang lebih besar (pengecoh: pecahan lain, dan "sama besar").
 *    Campuran: bentuk pecahan biasa (pengecoh: lupa pembilang, semua angka digabung).
 *    Urut: urutan dari kecil ke besar (pengecoh: urutan terbalik, dua pecahan pertama tertukar).
 * Data dari Buku Siswa Kelas V Bab 3 Sub-Bab A (lompatan Yohana, banding pecahan, campuran ke biasa).
 * Murni: tanpa React, tanpa jaringan. Hanya impor tipe. Diuji di scripts/uji-lab-k5b3.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));

type Pec = { p: number; q: number };
const teks = (x: Pec): string => `${x.p}/${x.q}`;
const silang = (a: Pec, b: Pec): number => a.p * b.q - b.p * a.q;

/* ------------------------------ A: Mesin Banding ------------------------------ */

/** q dan t: titik ke-t pada garis dengan q bagian tiap bulat. a dan b: pasangan yang dibandingkan. c: campuran. u: tiga pecahan diurutkan. */
export type KasusBanding = { id: string; nama: string; q: number; t: number; a: Pec; b: Pec; c: { b: number; p: number; q: number }; u: Pec[] };
export const KASUS_BANDING: KasusBanding[] = [
  { id: "yohana", nama: "Lompatan Yohana", q: 4, t: 11, a: { p: 11, q: 4 }, b: { p: 7, q: 2 }, c: { b: 3, p: 1, q: 2 }, u: [{ p: 7, q: 8 }, { p: 11, q: 4 }, { p: 7, q: 2 }] },
  { id: "pembilang", nama: "Pembilang sama", q: 5, t: 7, a: { p: 1, q: 2 }, b: { p: 1, q: 5 }, c: { b: 1, p: 1, q: 2 }, u: [{ p: 1, q: 2 }, { p: 1, q: 5 }, { p: 1, q: 3 }] },
  { id: "penyebut", nama: "Penyebut sama", q: 8, t: 13, a: { p: 3, q: 8 }, b: { p: 5, q: 8 }, c: { b: 4, p: 1, q: 4 }, u: [{ p: 3, q: 8 }, { p: 1, q: 2 }, { p: 5, q: 8 }] },
];

export const STASIUN_BANDING: StasiunDef[] = [
  { id: "garis", nama: "Garis", ikon: "📏" },
  { id: "banding", nama: "Banding", ikon: "⚖️" },
  { id: "campuran", nama: "Campuran", ikon: "🔁" },
  { id: "urut", nama: "Urut", ikon: "↔️" },
];

/** Urutan dari kecil ke besar (perkalian silang). */
export const urutKecil = (u: Pec[]): Pec[] => [...u].sort(silang);

/** Dua pengecoh campuran: bulat dikali penyebut saja (lupa pembilang), semua angka digabung, atau bulat dan pembilang digabung. */
function salahCampuran(c: { b: number; p: number; q: number }, benarP: number): string[] {
  const hasil: string[] = [];
  for (const n of [c.b * c.q, c.b + c.p + c.q, c.b + c.p, c.b * c.p + c.q]) {
    if (hasil.length < 2 && n !== benarP && !hasil.includes(`${n}/${c.q}`)) hasil.push(`${n}/${c.q}`);
  }
  return hasil;
}

export function kasusMesinBanding(c: KasusBanding, idx: number): KasusMesin {
  const { q, t, a, b } = c;
  const lebih = silang(a, b) > 0 ? a : b;
  const biasa: Pec = { p: c.c.b * c.c.q + c.c.p, q: c.c.q };
  const kecil = urutKecil(c.u).map(teks);
  const terbalik = [...kecil].reverse();
  const tukar = [kecil[1], kecil[0], kecil[2]];
  const langkah: LangkahMesin[] = [
    {
      stasiun: "garis",
      tanya: `Garis bilangan dibagi menjadi ${q} bagian sama panjang tiap bulat. Titik ke-${t} dari nol berada di pecahan …`,
      opsi: susunOpsi(`${t}/${q}`, [`${q}/${t}`, `${t - 1}/${q}`], idx),
      benar: `${t}/${q}`,
      petunjuk: `Tiap bagian panjangnya 1/${q}. Hitung ${t} bagian dari nol: pembilangnya banyak bagian, penyebutnya ${q}.`,
    },
    {
      stasiun: "banding",
      tanya: `Manakah yang lebih besar: ${teks(a)} atau ${teks(b)}? Samakan bagian dulu, atau lihat letaknya di garis bilangan.`,
      opsi: susunOpsi(teks(lebih), [teks(lebih === a ? b : a), "sama besar"], idx + 1),
      benar: teks(lebih),
      petunjuk: `Di garis bilangan, makin ke kanan makin besar. Samakan penyebut ${teks(a)} dan ${teks(b)}, lalu bandingkan pembilangnya.`,
    },
    {
      stasiun: "campuran",
      tanya: `Ubah ${c.c.b} ${c.c.p}/${c.c.q} menjadi pecahan biasa. Hasilnya …`,
      opsi: susunOpsi(teks(biasa), salahCampuran(c.c, biasa.p), idx + 2),
      benar: teks(biasa),
      petunjuk: `${c.c.b} bulat berisi ${c.c.b * c.c.q} bagian, lalu ${c.c.p} bagian lagi. Penyebutnya tetap ${c.c.q}.`,
    },
    {
      stasiun: "urut",
      tanya: `Urutkan dari yang terkecil: ${c.u.map(teks).join(", ")}. Urutan yang benar adalah …`,
      opsi: susunOpsi(kecil.join(", "), [terbalik.join(", "), tukar.join(", ")], idx + 3),
      benar: kecil.join(", "),
      petunjuk: `Letakkan ketiganya di garis bilangan. Yang paling kiri paling kecil. Samakan penyebutnya bila perlu.`,
    },
  ];
  return {
    id: c.id,
    nama: c.nama,
    ringkas: `Pada garis dengan ${q} bagian tiap bulat, titik ke-${t} ada di ${t}/${q}.${teks(lebih)} lebih besar dari ${teks(lebih === a ? b : a)}. ${c.c.b} ${c.c.p}/${c.c.q} sama dengan ${teks(biasa)}. Urutan dari terkecil: ${kecil.join(", ")}.`,
    langkah,
  };
}

export const MESIN_BANDING: DefMesin = {
  id: "mesin-banding-k5b3",
  judul: "Mesin Banding",
  selesaiId: "mesin-banding",
  stasiun: STASIUN_BANDING,
  kasus: KASUS_BANDING.map(kasusMesinBanding),
};

export const SEMUA_MESIN_K5B3 = [MESIN_BANDING];
