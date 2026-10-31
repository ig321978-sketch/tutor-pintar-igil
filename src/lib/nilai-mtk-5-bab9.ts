import { kumpulanAngka } from "@/lib/nilai-mtk-5-bab2";
import { normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";

function biasa(teks: string): string {
  return normalisasiJawabanTulis(teks);
}

function tepat(teks: string, angka: string): boolean {
  const daftar = kumpulanAngka(teks);
  if (daftar.length > 0 && daftar.every((item) => item === angka)) return true;
  return daftar.includes(angka) && daftar.filter((item) => item !== angka).every((item) => item.length < angka.length && angka.endsWith(item) === false);
}

function utuh(teks: string, angka: string): boolean {
  const daftar = kumpulanAngka(teks);
  if (daftar.length === 0) return false;
  if (daftar.every((item) => item === angka)) return true;
  return daftar.join("") === angka;
}

function memuatFrasa(teks: string, kalimat: string): boolean {
  const k = biasa(teks);
  return k === kalimat || k.includes(kalimat);
}

export function baca250014(teks: string): boolean {
  if (utuh(teks, "250014")) return true;
  const k = biasa(teks);
  return k.includes("dua ratus lima puluh ribu") && k.includes("empat belas") && !k.includes("empat ratus");
}

export function tulis406030(teks: string): boolean {
  return utuh(teks, "406030") || memuatFrasa(teks, "empat ratus enam ribu tiga puluh");
}

export function lebih681240(teks: string): boolean {
  if (kumpulanAngka(teks).includes("681240")) return true;
  const k = biasa(teks);
  if (k.includes("enam ratus delapan belas")) return false;
  return k.includes("enam ratus delapan puluh satu");
}

export function tulis205000(teks: string): boolean {
  if (utuh(teks, "205000")) return true;
  const k = biasa(teks);
  return k.includes("dua ratus lima ribu") && !k.includes("lima puluh");
}

export function jawab402005(teks: string): boolean {
  if (utuh(teks, "402005")) return true;
  const k = biasa(teks);
  if (!k.includes("empat ratus dua ribu")) return false;
  if (k.includes("lima puluh") || k.includes("lima ratus") || k.includes("lima ribu")) return false;
  return k.endsWith("lima") || k.includes("dua ribu lima");
}

export function tulis520000(teks: string): boolean {
  return utuh(teks, "520000") || memuatFrasa(teks, "lima ratus dua puluh ribu");
}

export function tulis608070(teks: string): boolean {
  return utuh(teks, "608070") || memuatFrasa(teks, "enam ratus delapan ribu tujuh puluh");
}

export function baca390008(teks: string): boolean {
  if (utuh(teks, "390008")) return true;
  const k = biasa(teks);
  if (!k.includes("tiga ratus sembilan puluh ribu")) return false;
  if (k.includes("delapan belas") || k.includes("delapan puluh") || k.includes("delapan ratus")) return false;
  return k.endsWith("delapan") || k.includes("ribu delapan");
}

export function tulis406200(teks: string): boolean {
  if (utuh(teks, "406200")) return true;
  const k = biasa(teks);
  return k.includes("empat ratus enam ribu dua ratus") && !k.includes("dua puluh");
}

export function jawab5000(teks: string): boolean {
  if (utuh(teks, "5000") || tepat(teks, "5000")) return true;
  const k = biasa(teks);
  if (k.includes("lima puluh") || k.includes("lima ratus")) return false;
  return k === "lima ribu" || k.endsWith("lima ribu") || k.includes("lima ribu");
}
