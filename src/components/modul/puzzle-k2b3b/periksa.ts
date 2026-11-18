/**
 * Pengenal ucapan dan tata letak Kelas 2 Bab 3 Sub-Bab B (tanpa React, diuji di Node: scripts/uji-puzzle-k2b3b.mjs).
 * Jawaban suara bab ini berupa satu angka (satu sampai sembilan) atau nama bentuk ("segitiga", "persegi", "segi empat", "segi lima", "segi enam"),
 * dengan ragam ucapan (segi 6, segienam, persegi panjang, bujur sangkar, dan sebagainya).
 */
import type { Jawaban, Jenis } from "./logika";

export const LEBAR_ADEGAN = 300;
export const TINGGI_ADEGAN = 200;

const normal = (teks: string): string =>
  teks
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/* ------------------------------ Angka satu sampai sembilan ------------------------------ */
const KATA_ANGKA: Record<string, number> = {
  satu: 1,
  dua: 2,
  tiga: 3,
  empat: 4,
  ampat: 4,
  lima: 5,
  enam: 6,
  anam: 6,
  tujuh: 7,
  tuju: 7,
  delapan: 8,
  lapan: 8,
  sembilan: 9,
  semilan: 9,
};
/** Semua angka satu sampai sembilan yang terdengar (urut kemunculan, tanpa kembar). Kata "segi" membuat angka sesudahnya tetap dibaca sebagai angka. */
export function angkaDariUcapan(teks: string): number[] {
  const hasil: number[] = [];
  for (const w of normal(teks).split(" ")) {
    const n = /^[1-9]$/.test(w) ? Number(w) : KATA_ANGKA[w];
    if (n !== undefined && !hasil.includes(n)) hasil.push(n);
  }
  return hasil;
}

/* ------------------------------ Nama bentuk ------------------------------ */
const POLA_NAMA: [Jenis, RegExp][] = [
  ["segiEmpat", /persegi ?panjang/g],
  ["persegi", /\bpersegi\b|bujur ?sangkar/g],
  ["segitiga", /\bsegi ?tiga\b|\bsegi 3\b|\btriangle\b/g],
  ["segiEmpat", /\bsegi ?empat\b|\bsegi ?ampat\b|\bsegi 4\b/g],
  ["segiLima", /\bsegi ?lima\b|\bsegi 5\b|\bpentagon\b/g],
  ["segiEnam", /\bsegi ?enam\b|\bsegi ?anam\b|\bsegi 6\b|\bheksagon\b|\bhexagon\b/g],
];
/** Semua nama bentuk yang terdengar, menurut urutan kemunculan dan tanpa kembar. "persegi panjang" dibaca segi empat, bukan persegi. */
export function namaDariUcapan(teks: string): Jenis[] {
  let t = normal(teks);
  const ketemu: { j: Jenis; i: number }[] = [];
  for (const [j, re] of POLA_NAMA) {
    for (const m of t.matchAll(new RegExp(re.source, "g"))) ketemu.push({ j, i: m.index ?? 0 });
    // Buang bagian yang sudah dikenali supaya tidak terbaca dua kali (mis. "persegi panjang" menjadi persegi).
    t = t.replace(new RegExp(re.source, "g"), (s) => " ".repeat(s.length));
  }
  const hasil: Jenis[] = [];
  for (const k of ketemu.sort((a, b) => a.i - b.i)) if (!hasil.includes(k.j)) hasil.push(k.j);
  return hasil;
}

/** Apakah ucapan cocok dengan jawaban? `terdengar`: angka atau nama terakhir yang terdengar (untuk umpan balik), null bila tidak ada. */
export function cocokUcapan(teks: string, j: Jawaban): { cocok: boolean; terdengar: number | Jenis | null } {
  if (j === null) return { cocok: false, terdengar: null };
  if (j.jenis === "angka") {
    const a = angkaDariUcapan(teks);
    return { cocok: a.includes(j.nilai), terdengar: a.length ? a[a.length - 1] : null };
  }
  const n = namaDariUcapan(teks);
  return { cocok: n.includes(j.nilai), terdengar: n.length ? n[n.length - 1] : null };
}
