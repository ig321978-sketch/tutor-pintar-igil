import { jawabanTulisMemuatAlias, normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";

function padat(teks: string): string {
  return normalisasiJawabanTulis(teks).replace(/[.\s]/g, "");
}

function angka(teks: string, target: string): boolean {
  const t = target.replace(/\./g, "");
  return padat(teks).includes(t) || jawabanTulisMemuatAlias(teks, [target, t]);
}

export function baca26932(teks: string): boolean {
  const n = normalisasiJawabanTulis(teks);
  return (
    angka(teks, "26932") ||
    (n.includes("dua puluh enam ribu") && n.includes("sembilan ratus") && n.includes("tiga puluh dua"))
  );
}

export function baca15590(teks: string): boolean {
  const n = normalisasiJawabanTulis(teks);
  return angka(teks, "15590") || (n.includes("lima belas ribu") && n.includes("lima ratus") && n.includes("sembilan puluh"));
}

export function nilai7000(teks: string): boolean {
  return angka(teks, "7000") || normalisasiJawabanTulis(teks).includes("tujuh ribu");
}

export function lebih54675(teks: string): boolean {
  return angka(teks, "54675") || normalisasiJawabanTulis(teks).includes("lima puluh empat");
}

export function susun35247(teks: string): boolean {
  return angka(teks, "35247");
}

export function urai35247(teks: string): boolean {
  const p = padat(teks);
  return (
    (p.includes("30000") && p.includes("5000") && p.includes("200") && p.includes("40") && p.includes("7")) ||
    angka(teks, "35247")
  );
}

export function tambah20825(teks: string): boolean {
  return angka(teks, "20825");
}

export function kurang27750(teks: string): boolean {
  return angka(teks, "27750");
}

export function kali500(teks: string): boolean {
  return angka(teks, "500") || normalisasiJawabanTulis(teks).includes("lima ratus");
}

export function bagi140(teks: string): boolean {
  return angka(teks, "140") || normalisasiJawabanTulis(teks).includes("seratus empat puluh");
}

export function urut13456(teks: string): boolean {
  const p = padat(teks);
  const a = p.indexOf("13456");
  const b = p.indexOf("25786");
  const c = p.indexOf("40350");
  return a >= 0 && b > a && c > b;
}

export function tulis26932(teks: string): boolean {
  return angka(teks, "26932");
}

export function tulis87986(teks: string): boolean {
  return angka(teks, "87986");
}
