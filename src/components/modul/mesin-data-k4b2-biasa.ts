/**
 * Tiga definisi Mesin Bertahap Kelas 4 Bab 2 untuk pecahan biasa (Sub-Bab A, B, C), dijalankan mesin berstasiun
 * mesin-bertahap-k3b1.ts. Semua pertanyaan, kunci, dan pengecoh DIHITUNG dari kasusnya.
 *  - MESIN_PECAHAN (A): Bagi → Arsir → Tulis → Banding   (1/4; 1/2 dan 1/4; 1/10 dan 1/5)
 *  - MESIN_BATANG  (B): Penyebut → Pembilang → Tanda → Urut (penyebut 5, 6, dan 10)
 *  - MESIN_SENILAI (C): Gambar → Ubah → Cek → Sederhana     (1/3 = 2/6, 1/4 = 4/16, 6/12 = 1/2)
 * Murni: tanpa React, tanpa jaringan. Hanya impor tipe. Diuji di scripts/uji-lab-k4b2.mjs.
 */
import type { DefMesin, KasusMesin, LangkahMesin, StasiunDef } from "./mesin-bertahap-k3b1";

const putar = <T,>(a: T[], k: number): T[] => a.map((_, i) => a[(i + k) % a.length]);
const susunOpsi = (benar: string, salah: string[], idx: number): string[] => putar([benar, ...salah], idx % (1 + salah.length));
const duaPengecoh = (benar: string, calon: string[]): string[] => [...new Set(calon.filter((c) => c !== benar))].slice(0, 2);
const angkaPengecoh = (benar: number, calon: number[]): string[] => duaPengecoh(String(benar), calon.filter((v) => v >= 1 && v !== benar).map(String));
const tandaBanding = (kiri: number, kanan: number): string => (kiri > kanan ? ">" : kiri < kanan ? "<" : "=");
const fpb = (a: number, b: number): number => (b === 0 ? a : fpb(b, a % b));

/* ------------------------------ A: Mesin Pecahan ------------------------------ */

export type KasusPecahan = { id: string; n: number; a: number; b: number };
export const KASUS_PECAHAN: KasusPecahan[] = [
  { id: "pizza", n: 4, a: 4, b: 2 },
  { id: "tiara", n: 2, a: 2, b: 4 },
  { id: "sepuluh", n: 10, a: 10, b: 5 },
];

export const STASIUN_PECAHAN: StasiunDef[] = [
  { id: "bagi", nama: "Bagi", ikon: "🔪" },
  { id: "arsir", nama: "Arsir", ikon: "🟨" },
  { id: "tulis", nama: "Tulis", ikon: "✍️" },
  { id: "banding", nama: "Banding", ikon: "⚖️" },
];

export function kasusMesinPecahan(k: KasusPecahan, idx: number): KasusMesin {
  const { n, a, b } = k;
  const t = tandaBanding(b, a);
  const langkah: LangkahMesin[] = [
    {
      stasiun: "bagi",
      tanya: `Satu keseluruhan dipotong menjadi ${n} bagian sama besar. Banyak seluruh bagian (penyebut) adalah…`,
      opsi: susunOpsi(String(n), angkaPengecoh(n, [n + 1, n - 1, n * 2, 1]), idx),
      benar: String(n),
      petunjuk: `Penyebut adalah banyak seluruh bagian yang sama besar, yaitu ${n}. Hitung semua potongan, bukan hanya yang diarsir.`,
    },
    {
      stasiun: "arsir",
      tanya: `Dari ${n} bagian itu, satu bagian diarsir. Banyak bagian yang diarsir (pembilang) adalah…`,
      opsi: susunOpsi("1", angkaPengecoh(1, [n, 2, 3, n + 1]), idx + 1),
      benar: "1",
      petunjuk: "Pembilang adalah banyak bagian yang diarsir. Di sub-bab ini hanya satu bagian yang diarsir, jadi pembilangnya 1.",
    },
    {
      stasiun: "tulis",
      tanya: `Satu bagian dari ${n} bagian sama besar ditulis…`,
      opsi: susunOpsi(`1/${n}`, duaPengecoh(`1/${n}`, [`${n}/1`, `1/${n + 1}`, `1/${n - 1}`]), idx + 2),
      benar: `1/${n}`,
      petunjuk: `Pembilang (yang diarsir) ditulis di atas, penyebut (semua bagian) di bawah: 1/${n}. Jangan dibalik.`,
    },
    {
      stasiun: "banding",
      tanya: `1/${a} … 1/${b}`,
      opsi: susunOpsi(tandaBanding(b, a), ["<", ">", "="].filter((s) => s !== tandaBanding(b, a)), idx),
      benar: tandaBanding(b, a),
      petunjuk: `Penyebut ${t === ">" ? `${a} lebih kecil dari ${b}` : t === "<" ? `${a} lebih besar dari ${b}` : "sama"}, jadi ${t === "=" ? "kedua pecahan sama" : `tiap bagian 1/${t === ">" ? a : b} lebih besar`}. Makin besar penyebut, makin kecil tiap bagian.`,
    },
  ];
  return { id: k.id, nama: `1/${n}`, ringkas: `1/${n}: pembilang 1, penyebut ${n}. Dibandingkan: 1/${a} ${t} 1/${b}.`, langkah };
}

export const MESIN_PECAHAN: DefMesin = { id: "mesin-pecahan-k4b2", judul: "Mesin Pecahan", selesaiId: "mesin-pecahan", stasiun: STASIUN_PECAHAN, kasus: KASUS_PECAHAN.map(kasusMesinPecahan) };

/* ------------------------------ B: Mesin Batang ------------------------------ */

export type KasusBatang = { id: string; q: number; p: [number, number, number] };
export const KASUS_BATANG: KasusBatang[] = [
  { id: "lima", q: 5, p: [2, 4, 3] },
  { id: "tongkat", q: 6, p: [3, 2, 5] },
  { id: "sepuluh", q: 10, p: [2, 1, 7] },
];

export const STASIUN_BATANG: StasiunDef[] = [
  { id: "penyebut", nama: "Penyebut", ikon: "🟰" },
  { id: "pembilang", nama: "Pembilang", ikon: "🔢" },
  { id: "tanda", nama: "Tanda", ikon: "⚖️" },
  { id: "urut", nama: "Urut", ikon: "📶" },
];

export const daftarPecahan = (p: readonly number[], q: number): string => p.map((v) => `${v}/${q}`).join(", ");

export function kasusMesinBatang(k: KasusBatang, idx: number): KasusMesin {
  const { q, p } = k;
  const [p1, p2] = p;
  const naik = [...p].sort((x, y) => x - y);
  const turun = [...naik].reverse();
  const t = tandaBanding(p1, p2);
  const urutBenar = daftarPecahan(naik, q);
  const langkah: LangkahMesin[] = [
    {
      stasiun: "penyebut",
      tanya: `${p1}/${q} dan ${p2}/${q}. Penyebut kedua pecahan itu sama, yaitu…`,
      opsi: susunOpsi(String(q), angkaPengecoh(q, [p1, p2, q + 1, q - 1]), idx),
      benar: String(q),
      petunjuk: `Penyebut adalah angka di bawah garis pecahan. Keduanya ${q}, jadi bagiannya sama besar.`,
    },
    {
      stasiun: "pembilang",
      tanya: "Penyebutnya sama, jadi yang dibandingkan hanya pembilangnya. Pembilang yang lebih besar adalah…",
      opsi: susunOpsi(String(Math.max(p1, p2)), angkaPengecoh(Math.max(p1, p2), [Math.min(p1, p2), q, q - 1, Math.max(p1, p2) + 1]), idx + 1),
      benar: String(Math.max(p1, p2)),
      petunjuk: `Bandingkan angka di atas garis: ${p1} dan ${p2}. Penyebut yang sama tidak perlu dibandingkan.`,
    },
    {
      stasiun: "tanda",
      tanya: `${p1}/${q} … ${p2}/${q}`,
      opsi: susunOpsi(t, ["<", ">", "="].filter((s) => s !== t), idx + 2),
      benar: t,
      petunjuk: `Penyebut sama. Pembilang ${p1} ${t === "=" ? "sama dengan" : t === ">" ? "lebih dari" : "kurang dari"} ${p2}, jadi pecahan ${p1}/${q} ${t === ">" ? "lebih besar" : t === "<" ? "lebih kecil" : "sama"}.`,
    },
    {
      stasiun: "urut",
      tanya: `Urutkan dari terkecil: ${daftarPecahan(p, q)}.`,
      opsi: susunOpsi(urutBenar, duaPengecoh(urutBenar, [daftarPecahan(p, q), daftarPecahan(turun, q)]), idx),
      benar: urutBenar,
      petunjuk: "Penyebutnya sama, jadi urutkan pembilangnya dari yang paling kecil.",
    },
  ];
  return { id: k.id, nama: `penyebut ${q}`, ringkas: `Penyebut ${q}: ${p1}/${q} ${t} ${p2}/${q}. Urutan naik: ${urutBenar}.`, langkah };
}

export const MESIN_BATANG: DefMesin = { id: "mesin-batang-k4b2", judul: "Mesin Batang", selesaiId: "mesin-batang", stasiun: STASIUN_BATANG, kasus: KASUS_BATANG.map(kasusMesinBatang) };

/* ------------------------------ C: Mesin Senilai ------------------------------ */

export type KasusSenilai = { id: string; a: number; b: number; op: "kali" | "bagi"; k: number };
export const KASUS_SENILAI: KasusSenilai[] = [
  { id: "coklat", a: 1, b: 3, op: "kali", k: 2 },
  { id: "lipat", a: 1, b: 4, op: "kali", k: 4 },
  { id: "bagi", a: 6, b: 12, op: "bagi", k: 6 },
];

export const STASIUN_SENILAI: StasiunDef[] = [
  { id: "gambar", nama: "Gambar", ikon: "🖼️" },
  { id: "ubah", nama: "Ubah", ikon: "🔁" },
  { id: "cek", nama: "Cek", ikon: "🟰" },
  { id: "sederhana", nama: "Sederhana", ikon: "✨" },
];

/** Hasil mengubah a/b dengan bilangan k. */
export const hasilSenilai = (c: KasusSenilai): { c: number; d: number } => (c.op === "kali" ? { c: c.a * c.k, d: c.b * c.k } : { c: c.a / c.k, d: c.b / c.k });

export function kasusMesinSenilai(kasus: KasusSenilai, idx: number): KasusMesin {
  const { a, b, op, k } = kasus;
  const { c, d } = hasilSenilai(kasus);
  const kata = op === "kali" ? "dikali" : "dibagi";
  // Pecahan dengan penyebut lebih besar adalah yang akan disederhanakan.
  const [ba, bb] = d > b ? [c, d] : [a, b];
  const g = fpb(ba, bb);
  const sederhana = `${ba / g}/${bb / g}`;
  const faktorKecil = [2, 3, 4, 5].find((f) => g % f === 0 && f < g);
  const calonSederhana = [
    ...(faktorKecil ? [`${ba / faktorKecil}/${bb / faktorKecil}`] : []),
    `${ba / g}/${bb}`,
    `${ba}/${bb / g}`,
  ];
  const ubahBenar = `${c}/${d}`;
  const alasanBenar = `senilai, karena pembilang dan penyebut sama-sama ${kata} ${k}`;
  const langkah: LangkahMesin[] = [
    {
      stasiun: "gambar",
      tanya: `Dua batang sama luas. Batang pertama ${a} dari ${b} bagian diarsir. Batang kedua dibagi ${d} bagian. Bagian yang diarsir pada batang kedua…`,
      opsi: susunOpsi(String(c), angkaPengecoh(c, [a, d, c + 1, c + 2]), idx),
      benar: String(c),
      petunjuk: `Luas arsir harus sama. ${a}/${b} dan ${c}/${d} sama luas bila ${a} × ${d} sama dengan ${c} × ${b}.`,
    },
    {
      stasiun: "ubah",
      tanya: `${a}/${b} ${kata} ${k}/${k}. Hasilnya…`,
      opsi: susunOpsi(ubahBenar, duaPengecoh(ubahBenar, [`${c}/${b}`, `${a}/${d}`, `${a + k}/${b + k}`]), idx + 1),
      benar: ubahBenar,
      petunjuk: `Pembilang dan penyebut sama-sama ${kata} ${k}. Jangan hanya mengubah pembilang atau hanya penyebut.`,
    },
    {
      stasiun: "cek",
      tanya: `Apakah ${a}/${b} dan ${c}/${d} senilai?`,
      opsi: susunOpsi(alasanBenar, [`tidak senilai, karena penyebutnya berbeda`, `senilai, karena hanya pembilangnya yang ${kata} ${k}`], idx + 2),
      benar: alasanBenar,
      petunjuk: "Pecahan senilai bila daerah arsirnya sama luas. Mengubah pembilang dan penyebut dengan bilangan yang sama tidak mengubah nilainya.",
    },
    {
      stasiun: "sederhana",
      tanya: `Bentuk paling sederhana dari ${ba}/${bb} adalah… (FPB ${ba} dan ${bb} adalah ${g})`,
      opsi: susunOpsi(sederhana, duaPengecoh(sederhana, calonSederhana), idx),
      benar: sederhana,
      petunjuk: `Bagi pembilang dan penyebut dengan FPB-nya, yaitu ${g}. Bagi keduanya, jangan hanya salah satu.`,
    },
  ];
  return { id: kasus.id, nama: `${a}/${b} dan ${c}/${d}`, ringkas: `${a}/${b} = ${c}/${d}. ${ba}/${bb} paling sederhana ${sederhana}.`, langkah };
}

export const MESIN_SENILAI: DefMesin = { id: "mesin-senilai-k4b2", judul: "Mesin Senilai", selesaiId: "mesin-senilai", stasiun: STASIUN_SENILAI, kasus: KASUS_SENILAI.map(kasusMesinSenilai) };

export const SEMUA_MESIN_K4B2_BIASA: DefMesin[] = [MESIN_PECAHAN, MESIN_BATANG, MESIN_SENILAI];
