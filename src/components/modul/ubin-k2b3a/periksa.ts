/**
 * Tata letak adegan dan pengenal ucapan Kelas 2 Bab 3 Sub-Bab A (tanpa React, diuji di Node: scripts/uji-cpa-ubin-k2b3a.mjs).
 * Kanvas adegan 300 x 200. Nama bentuk yang diucapkan dikenali dengan ragam ucapan ("segi enam", "enam sisi", "heksagon", ...).
 */
import { INFO, KIND_SISI, type Kind, type Kunci, type Zona } from "./logika-cpa";

export const LEBAR_ADEGAN = 300;
export const TINGGI_ADEGAN = 200;
export type Titik = { x: number; y: number };
const r1 = (n: number): number => Number(n.toFixed(1));

/* ------------------------------ Bentuk ------------------------------ */
/** Titik sudut bentuk bersisi lurus berpusat (cx, cy), diputar `rot` derajat. Sisi ke-i: titik i ke titik i+1. */
export function titikBentuk(kind: Kind, cx: number, cy: number, r: number, rot = 0): Titik[] {
  const sisi = INFO[kind].sisi;
  if (sisi === 0) return [];
  const rel: Titik[] =
    sisi === 4
      ? [
          { x: -1.15 * r, y: -0.75 * r },
          { x: 1.15 * r, y: -0.75 * r },
          { x: 1.15 * r, y: 0.75 * r },
          { x: -1.15 * r, y: 0.75 * r },
        ]
      : Array.from({ length: sisi }, (_, i) => ({ x: r * Math.cos(((-90 + (360 / sisi) * i) * Math.PI) / 180), y: r * Math.sin(((-90 + (360 / sisi) * i) * Math.PI) / 180) }));
  const a = (rot * Math.PI) / 180;
  return rel.map((p) => ({ x: r1(cx + p.x * Math.cos(a) - p.y * Math.sin(a)), y: r1(cy + p.x * Math.sin(a) + p.y * Math.cos(a)) }));
}
export const jalurTitik = (pts: Titik[]): string => `M${pts.map((p) => `${p.x} ${p.y}`).join(" L")} Z`;
/** Jalur bentuk lengkung (lingkaran, telur, separuh lingkaran) berpusat (cx, cy). */
export function jalurLengkung(kind: Kind, cx: number, cy: number, r: number): string {
  if (kind === "telur") {
    const a = r * 1.2;
    const b = r * 0.8;
    return `M${r1(cx - a)} ${cy} A${r1(a)} ${r1(b)} 0 1 0 ${r1(cx + a)} ${cy} A${r1(a)} ${r1(b)} 0 1 0 ${r1(cx - a)} ${cy} Z`;
  }
  if (kind === "separuh") return `M${r1(cx - r)} ${r1(cy + r / 2)} L${r1(cx + r)} ${r1(cy + r / 2)} A${r} ${r} 0 0 0 ${r1(cx - r)} ${r1(cy + r / 2)} Z`;
  return `M${r1(cx - r)} ${cy} A${r} ${r} 0 1 0 ${r1(cx + r)} ${cy} A${r} ${r} 0 1 0 ${r1(cx - r)} ${cy} Z`;
}
export const jalurBentuk = (kind: Kind, cx: number, cy: number, r: number, rot = 0): string => (INFO[kind].lengkung ? jalurLengkung(kind, cx, cy, r) : jalurTitik(titikBentuk(kind, cx, cy, r, rot)));

/** Titik tengah sisi ke-i dan titik di luarnya sejauh `jarak` (untuk tanda atau nomor). */
export function sisiTengah(pts: Titik[], i: number, jarak = 0): Titik {
  const a = pts[i];
  const b = pts[(i + 1) % pts.length];
  const m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  const c = { x: pts.reduce((t, p) => t + p.x, 0) / pts.length, y: pts.reduce((t, p) => t + p.y, 0) / pts.length };
  const dx = m.x - c.x;
  const dy = m.y - c.y;
  const l = Math.hypot(dx, dy) || 1;
  return { x: r1(m.x + (dx / l) * jarak), y: r1(m.y + (dy / l) * jarak) };
}
/** Pusat dan jari-jari bentuk di soal Hitung. */
export const PUSAT_HITUNG: Titik = { x: 150, y: 106 };
export const R_HITUNG = 52;

/** Warna benda (Concrete) tiap bentuk, dan warna Venn: merah atau kuning. */
export const WARNA_BENDA: Record<Kind, string> = {
  segitiga: "#F9A8D4",
  segiempat: "#86EFAC",
  segilima: "#FDBA74",
  segienam: "#FDE047",
  segitujuh: "#C4B5FD",
  segidelapan: "#FCA5A5",
  lingkaran: "#93C5FD",
  telur: "#FDE68A",
  separuh: "#99F6E4",
};
export const warnaVenn = (merah: boolean, rupa: "benda" | "diagram" | "lambang"): string => (rupa === "diagram" ? (merah ? "#64748B" : "#F1F5F9") : merah ? "#F87171" : "#FDE68A");

/* ------------------------------ Papan paku (lima kali lima) ------------------------------ */
export const PAKU = { x0: 78, y0: 34, d: 36 };
export const titikPaku = (kolom: number, baris: number): Titik => ({ x: PAKU.x0 + kolom * PAKU.d, y: PAKU.y0 + baris * PAKU.d });
export const hurufPaku = (i: number): string => "ABCDEFGHIJ"[i] ?? "?";

/* ------------------------------ Diagram Venn ------------------------------ */
export const VENN = { kiri: { x: 124, y: 100 }, kanan: { x: 176, y: 100 }, r: 58 };
const BARIS_VENN = [72, 100, 128];
/** Tempat benda ke-j pada zona z (pusat). Zona luar memakai dua jalur di tepi kiri dan kanan. */
export function tempatVenn(z: Zona, j: number): Titik {
  if (z === "luar") return { x: j % 2 === 0 ? 33 : 267, y: BARIS_VENN[Math.floor(j / 2) % 3] };
  const x = z === "kiri" ? 95 : z === "tengah" ? 150 : 205;
  return { x, y: BARIS_VENN[j % 3] };
}
/** Tempat di baki (belum dipasang) untuk benda ke-i dari n. */
export const bakiVenn = (i: number, n: number): Titik => ({ x: r1(150 + (i - (n - 1) / 2) * Math.min(46, 270 / n)), y: 182 });

/* ------------------------------ Berburu bentuk ------------------------------ */
export const pusatBuru = (i: number): Titik => ({ x: 56 + (i % 3) * 94, y: 60 + Math.floor(i / 3) * 80 });
export const yBarisBuru = (i: number): number => 28 + i * 28;

/* ------------------------------ Pengenal ucapan ------------------------------ */
const POLA_NAMA: [string, RegExp][] = [
  ["segitiga", /\b(segitiga|segi tiga|tiga sisi|segi 3|triangle)\b/],
  ["segi empat", /\b(segi empat|segiempat|persegi panjang|persegi|empat sisi|segi 4|segi ampat|ampat sisi)\b/],
  ["segi lima", /\b(segi lima|segilima|lima sisi|segi 5|pentagon)\b/],
  ["segi enam", /\b(segi enam|segienam|enam sisi|segi 6|heksagon|hexagon)\b/],
  ["segi tujuh", /\b(segi tujuh|segitujuh|tujuh sisi|segi 7|heptagon)\b/],
  ["segi delapan", /\b(segi delapan|segidelapan|segi lapan|delapan sisi|lapan sisi|segi 8|oktagon|octagon)\b/],
  ["lingkaran", /\b(lingkaran|bulat|bundar|lingkar|bola)\b/],
  ["bentuk lengkung", /\b(lengkung|lonjong|oval|telur|setengah lingkaran|separuh)\b/],
];
const normal = (teks: string): string =>
  teks
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

/** Semua nama bentuk yang terdengar dalam ucapan (urut daftar, tanpa kembar). */
export function namaDariUcapan(teks: string): string[] {
  const t = normal(teks);
  return POLA_NAMA.filter(([, p]) => p.test(t)).map(([n]) => n);
}
const ANGKA: Record<string, number> = { nol: 0, satu: 1, dua: 2, tiga: 3, empat: 4, ampat: 4, lima: 5, enam: 6, tujuh: 7, tuju: 7, delapan: 8, lapan: 8, sembilan: 9, semilan: 9 };
/** Semua bilangan nol sampai sembilan yang terdengar (kata atau angka), urut kemunculan, tanpa kembar. */
export function angkaDariUcapan(teks: string): number[] {
  const hasil: number[] = [];
  for (const w of normal(teks).split(" ")) {
    const n = /^\d$/.test(w) ? Number(w) : ANGKA[w];
    if (n !== undefined && !hasil.includes(n)) hasil.push(n);
  }
  return hasil;
}
/**
 * Apakah ucapan cocok dengan kunci? Kunci nama: nama itu terdengar, atau (untuk segi banyak) hanya bilangan banyak sisinya yang disebut.
 * Kunci angka: bilangan itu terdengar. `terdengar`: apa yang dikenali (untuk pesan "Terdengar ...").
 */
export function cocokUcapan(teks: string, kunci: Kunci): { cocok: boolean; terdengar: string[] } {
  const angka = angkaDariUcapan(teks);
  const nama = namaDariUcapan(teks);
  if (kunci.jenis === "angka") return { cocok: angka.includes(kunci.n), terdengar: angka.map(String) };
  const sisi = Object.values(KIND_SISI).map((k) => INFO[k]).find((i) => i.nama === kunci.nama)?.sisi ?? 0;
  const cocok = nama.includes(kunci.nama) || (sisi > 0 && nama.length === 0 && angka.length === 1 && angka[0] === sisi);
  return { cocok, terdengar: nama.length > 0 ? nama : angka.map(String) };
}
