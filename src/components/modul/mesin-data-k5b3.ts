/**
 * Definisi Mesin Bertahap Kelas 5 Bab 3 (Bilangan Pecahan), dijalankan mesin berstasiun mesin-bertahap-k3b1.ts dan
 * dieja ejaK5B3. Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari bilangan kasus.
 *  - MESIN_BANDING (A): Garis → Banding → Campuran → Urut   (kasus Lompatan Yohana, Pembilang Sama, Penyebut Sama)
 *    Garis: titik ke-t pada garis yang tiap bulatnya dibagi q bagian (pengecoh: pembilang dan penyebut tertukar,
 *           satu bagian kurang).
 *    Banding: pecahan yang lebih besar (pengecoh: pecahan lain, dan "sama besar").
 *    Campuran: bentuk pecahan biasa (pengecoh: lupa pembilang, semua angka digabung).
 *    Urut: urutan dari kecil ke besar (pengecoh: urutan terbalik, dua pecahan pertama tertukar).
 *  - MESIN_JUMLAH (B): Sama → Beda → Sederhana → Campuran   (kasus Martabak, Penghapus, Wingko)
 *    Sama: jumlah dua pecahan berpenyebut sama (pengecoh: penyebut ikut dijumlahkan, pembilang dikalikan).
 *    Beda: jumlah dengan KPK (pengecoh: pembilang dan penyebut dijumlahkan, penyebut belum disamakan).
 *    Sederhana: bentuk paling sederhana (pengecoh: hanya pembilang dibagi, hanya penyebut dibagi, belum tuntas).
 *    Campuran: bentuk campuran (pengecoh: bulat dan sisa tertukar, sisa dibagi pembilang).
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


/* ------------------------------ B: Mesin Jumlah ------------------------------ */

const fpb = (a: number, b: number): number => {
  let x = a;
  let y = b;
  while (y !== 0) {
    const t = x % y;
    x = y;
    y = t;
  }
  return x;
};
const kpk = (a: number, b: number): number => {
  const langkah = Math.max(a, b);
  let n = langkah;
  while (n % a !== 0 || n % b !== 0) n += langkah;
  return n;
};
const uniqTeks = (benar: string, kandidat: string[]): string[] => kandidat.filter((t, i) => t !== benar && kandidat.indexOf(t) === i).slice(0, 2);

/** sa: dua pecahan penyebut sama. be: dua pecahan penyebut beda (jumlahnya sudah paling sederhana). se: hasil yang disederhanakan. cm: hasil lebih dari satu bulat. */
export type KasusJumlah = { id: string; nama: string; sa: [Pec, Pec]; be: [Pec, Pec]; se: [Pec, Pec]; cm: [Pec, Pec] };
export const KASUS_JUMLAH: KasusJumlah[] = [
  { id: "martabak", nama: "Martabak Lukas dan Komang", sa: [{ p: 1, q: 8 }, { p: 2, q: 8 }], be: [{ p: 1, q: 2 }, { p: 1, q: 3 }], se: [{ p: 4, q: 9 }, { p: 2, q: 9 }], cm: [{ p: 3, q: 5 }, { p: 4, q: 5 }] },
  { id: "penghapus", nama: "Penghapus Asep dan Yohana", sa: [{ p: 2, q: 10 }, { p: 3, q: 10 }], be: [{ p: 1, q: 4 }, { p: 1, q: 6 }], se: [{ p: 2, q: 5 }, { p: 1, q: 10 }], cm: [{ p: 4, q: 7 }, { p: 5, q: 7 }] },
  { id: "wingko", nama: "Wingko Lukas dan Komang", sa: [{ p: 3, q: 7 }, { p: 2, q: 7 }], be: [{ p: 3, q: 4 }, { p: 1, q: 8 }], se: [{ p: 1, q: 12 }, { p: 3, q: 12 }], cm: [{ p: 2, q: 3 }, { p: 2, q: 3 }] },
];

export const STASIUN_JUMLAH: StasiunDef[] = [
  { id: "sama", nama: "Sama", ikon: "🟨" },
  { id: "beda", nama: "Beda", ikon: "🧩" },
  { id: "sederhana", nama: "Sederhana", ikon: "✂️" },
  { id: "campuran", nama: "Campuran", ikon: "🔁" },
];

/** Jumlah dua pecahan dengan penyebut KPK, belum disederhanakan. */
export const jumlahKasus = (a: Pec, b: Pec): Pec => {
  const k = kpk(a.q, b.q);
  return { p: a.p * (k / a.q) + b.p * (k / b.q), q: k };
};

export function kasusMesinJumlah(c: KasusJumlah, idx: number): KasusMesin {
  const [sa, sb] = c.sa;
  const [ba, bb] = c.be;
  const [ea, eb] = c.se;
  const [ca, cb] = c.cm;
  const hasilSama: Pec = { p: sa.p + sb.p, q: sa.q };
  const k = kpk(ba.q, bb.q);
  const hasilBeda = jumlahKasus(ba, bb);
  const hasilSe = jumlahKasus(ea, eb);
  const g = fpb(hasilSe.p, hasilSe.q);
  let sebagian = 0;
  for (let d = 2; d < g; d += 1) if (g % d === 0) { sebagian = d; break; }
  const simpel = teks({ p: hasilSe.p / g, q: hasilSe.q / g });
  const hasilCm = jumlahKasus(ca, cb);
  const bulat = Math.floor(hasilCm.p / hasilCm.q);
  const sisa = hasilCm.p % hasilCm.q;
  const campuran = `${bulat} ${sisa}/${hasilCm.q}`;
  const langkah: LangkahMesin[] = [
    {
      stasiun: "sama",
      tanya: `Jumlahkan ${teks(sa)} dan ${teks(sb)}. Penyebutnya sudah sama. Hasilnya …`,
      opsi: susunOpsi(teks(hasilSama), [`${sa.p + sb.p}/${sa.q + sb.q}`, `${sa.p * sb.p}/${sa.q}`], idx),
      benar: teks(hasilSama),
      petunjuk: `Penyebut tetap ${sa.q}. Jumlahkan pembilangnya saja: ${sa.p} dan ${sb.p}.`,
    },
    {
      stasiun: "beda",
      tanya: `Jumlahkan ${teks(ba)} dan ${teks(bb)}. Samakan penyebut dengan KPK, lalu jumlahkan pembilangnya. Hasilnya …`,
      opsi: susunOpsi(teks(hasilBeda), uniqTeks(teks(hasilBeda), [`${ba.p + bb.p}/${ba.q + bb.q}`, `${ba.p + bb.p}/${k}`, `${ba.p + bb.p}/${Math.max(ba.q, bb.q)}`]), idx + 1),
      benar: teks(hasilBeda),
      petunjuk: `KPK dari ${ba.q} dan ${bb.q} adalah ${k}. Ubah kedua pecahan ke penyebut ${k}, lalu jumlahkan pembilangnya.`,
    },
    {
      stasiun: "sederhana",
      tanya: `Hasil penjumlahan ${teks(ea)} dan ${teks(eb)} adalah ${teks(hasilSe)}. Bentuk paling sederhananya …`,
      opsi: susunOpsi(simpel, uniqTeks(simpel, [sebagian > 0 ? `${hasilSe.p / sebagian}/${hasilSe.q / sebagian}` : "", `${hasilSe.p / g}/${hasilSe.q}`, `${hasilSe.p}/${hasilSe.q / g}`].filter((t) => t !== "")), idx + 2),
      benar: simpel,
      petunjuk: `Bagi pembilang dan penyebut dengan bilangan terbesar yang membagi keduanya, yaitu ${g}.`,
    },
    {
      stasiun: "campuran",
      tanya: `Hasil penjumlahan ${teks(ca)} dan ${teks(cb)} adalah ${teks(hasilCm)}. Bentuk campurannya …`,
      opsi: susunOpsi(campuran, uniqTeks(campuran, [`${sisa} ${bulat}/${hasilCm.q}`, `${bulat} ${sisa}/${hasilCm.p}`, `${bulat + 1} ${sisa}/${hasilCm.q}`, `${bulat} ${sisa}/${hasilCm.q + 1}`]), idx + 3),
      benar: campuran,
      petunjuk: `Satu bulat berisi ${hasilCm.q} bagian. ${hasilCm.p} bagian cukup untuk ${bulat} bulat penuh, dan ${sisa} bagian lagi.`,
    },
  ];
  return {
    id: c.id,
    nama: c.nama,
    ringkas: `${teks(sa)} + ${teks(sb)} = ${teks(hasilSama)}. ${teks(ba)} + ${teks(bb)} = ${teks(hasilBeda)}. ${teks(hasilSe)} disederhanakan menjadi ${simpel}. ${teks(hasilCm)} sama dengan ${campuran}.`,
    langkah,
  };
}

export const MESIN_JUMLAH: DefMesin = {
  id: "mesin-jumlah-k5b3",
  judul: "Mesin Jumlah",
  selesaiId: "mesin-jumlah",
  stasiun: STASIUN_JUMLAH,
  kasus: KASUS_JUMLAH.map(kasusMesinJumlah),
};

export const SEMUA_MESIN_K5B3 = [MESIN_BANDING, MESIN_JUMLAH];
