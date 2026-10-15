import { normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";
import { angkaUtuh } from "@/lib/nilai-mtk-3-bab1";

function biasa(teks: string): string {
  return normalisasiJawabanTulis(teks);
}

function ada(teks: string, kalimat: string): boolean {
  return biasa(teks).includes(normalisasiJawabanTulis(kalimat));
}

function simbol(teks: string): string {
  return teks
    .toLowerCase()
    .replace(/\bper\b/g, "/")
    .replace(/\s*\/\s*/g, "/")
    .replace(/\s+/g, " ")
    .trim();
}

function polaUtuh(pola: string, global = false): RegExp {
  const aman = pola.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?<!\\d)${aman}(?!\\d)`, global ? "g" : "");
}

function adaPecahan(teks: string, pecahan: string): boolean {
  return polaUtuh(pecahan).test(simbol(teks));
}

function adaDesimal(teks: string, angka: string): boolean {
  return polaUtuh(angka).test(simbol(teks));
}

function urutSimbol(teks: string, daftar: string[]): boolean {
  const sumber = simbol(teks);
  let mulai = 0;
  for (const pecahan of daftar) {
    const pola = polaUtuh(pecahan, true);
    pola.lastIndex = mulai;
    const cocok = pola.exec(sumber);
    if (!cocok) return false;
    mulai = cocok.index + pecahan.length;
  }
  return true;
}

export function lebihBesarSepertiga(teks: string): boolean {
  const sepertiga = adaPecahan(teks, "1/3") || ada(teks, "sepertiga") || ada(teks, "satu per tiga");
  const seperenam = adaPecahan(teks, "1/6") || ada(teks, "seperenam") || ada(teks, "satu per enam");
  if (seperenam && !sepertiga) return false;
  return sepertiga;
}

export function urutSetengahBesar(teks: string): boolean {
  if (urutSimbol(teks, ["1/2", "1/4", "1/8"])) return true;
  const k = biasa(teks);
  const a = k.indexOf("setengah");
  const b = k.search(/seperempat|satu per empat/);
  const c = k.search(/seperdelapan|satu per delapan/);
  return a >= 0 && b > a && c > b;
}

export function lebihBesarTujuhDelapan(teks: string): boolean {
  if (adaPecahan(teks, "3/8") && !adaPecahan(teks, "7/8")) return false;
  return adaPecahan(teks, "7/8") || ada(teks, "tujuh per delapan");
}

export function urutPenyebutSembilan(teks: string): boolean {
  return urutSimbol(teks, ["1/9", "2/9", "4/9", "7/9"]);
}

export function senilaiDuaPerEnam(teks: string): boolean {
  if (adaPecahan(teks, "3/6") || adaPecahan(teks, "1/6") || adaPecahan(teks, "4/6")) return false;
  return adaPecahan(teks, "2/6") || ada(teks, "dua per enam") || (angkaUtuh(teks, "2") && !angkaUtuh(teks, "6") && !angkaUtuh(teks, "3"));
}

export function senilaiSembilanPerDuaBelas(teks: string): boolean {
  return adaPecahan(teks, "9/12") || (angkaUtuh(teks, "9") && !angkaUtuh(teks, "6") && !angkaUtuh(teks, "3") && !angkaUtuh(teks, "12"));
}

export function bacaTujuhPersepuluh(teks: string): boolean {
  const k = biasa(teks);
  if (/perseratus|per seratus/.test(k)) return false;
  return ada(teks, "tujuh persepuluh") || adaPecahan(teks, "7/10") || adaDesimal(teks, "0,7") || adaDesimal(teks, "0.7");
}

export function tulisDelapanPerseratus(teks: string): boolean {
  const k = biasa(teks);
  if (adaPecahan(teks, "8/100") || ada(teks, "delapan perseratus") || ada(teks, "delapan per seratus")) return true;
  if (adaPecahan(teks, "8/10") || /persepuluh/.test(k)) return false;
  return false;
}

export function persenDuaPuluh(teks: string): boolean {
  const k = biasa(teks);
  if (/dua ratus|200/.test(k)) return false;
  if ((/dua persen/.test(k) || /(^|\s)2\s*%/.test(teks)) && !/dua puluh|20/.test(k + teks)) return false;
  const nilai = angkaUtuh(teks, "20") || k.includes("dua puluh");
  return nilai && /persen|%/.test(`${teks} ${k}`);
}

export function persenTujuhLima(teks: string): boolean {
  const k = biasa(teks);
  if (/tujuh ratus|750/.test(k)) return false;
  const nilai = angkaUtuh(teks, "75") || k.includes("tujuh puluh lima");
  return nilai && /persen|%/.test(`${teks} ${k}`);
}

export function lebihBesarSeperempat(teks: string): boolean {
  const seperempat = adaPecahan(teks, "1/4") || ada(teks, "seperempat") || ada(teks, "satu per empat");
  const sepersembilan = adaPecahan(teks, "1/9") || ada(teks, "sepersembilan") || ada(teks, "satu per sembilan");
  if (sepersembilan && !seperempat) return false;
  return seperempat;
}

export function urutUnitKecil(teks: string): boolean {
  return urutSimbol(teks, ["1/10", "1/5", "1/2"]);
}

export function lebihBesarEmpatPerLima(teks: string): boolean {
  if (adaPecahan(teks, "2/5") && !adaPecahan(teks, "4/5")) return false;
  return adaPecahan(teks, "4/5") || ada(teks, "empat per lima");
}

export function urutPerDelapan(teks: string): boolean {
  return urutSimbol(teks, ["1/8", "3/8", "5/8", "6/8"]);
}

export function senilaiEnamPerSembilan(teks: string): boolean {
  if (adaPecahan(teks, "3/9") || adaPecahan(teks, "4/9")) return false;
  return adaPecahan(teks, "6/9") || (angkaUtuh(teks, "6") && !angkaUtuh(teks, "9") && !angkaUtuh(teks, "2") && !angkaUtuh(teks, "3"));
}

export function senilaiLimaPerSepuluh(teks: string): boolean {
  return adaPecahan(teks, "5/10") || (angkaUtuh(teks, "5") && !angkaUtuh(teks, "10") && !angkaUtuh(teks, "2"));
}

export function bacaEnamPersepuluh(teks: string): boolean {
  const k = biasa(teks);
  if (/perseratus/.test(k)) return false;
  return ada(teks, "enam persepuluh") || adaPecahan(teks, "6/10") || adaDesimal(teks, "0,6") || adaDesimal(teks, "0.6");
}

export function tulisEmpatPerseratus(teks: string): boolean {
  const k = biasa(teks);
  if (adaPecahan(teks, "4/100") || ada(teks, "empat perseratus")) return true;
  if (adaPecahan(teks, "4/10") || /persepuluh/.test(k)) return false;
  return false;
}

export function persenSembilan(teks: string): boolean {
  const k = biasa(teks);
  if (/sembilan puluh|90/.test(k) && !/(^|\D)9(\D|$)/.test(teks.replace(/[.,]/g, ""))) return false;
  if (/sembilan puluh/.test(k)) return false;
  const nilai = angkaUtuh(teks, "9") || /(?:^|\s)sembilan(?:\s|$)/.test(` ${k} `);
  return nilai && /persen|%/.test(`${teks} ${k}`);
}

export function persenEmpatPuluh(teks: string): boolean {
  const k = biasa(teks);
  if (/empat ratus|400/.test(k)) return false;
  const nilai = angkaUtuh(teks, "40") || k.includes("empat puluh");
  return nilai && /persen|%/.test(`${teks} ${k}`);
}

export function bacaTigaPersepuluh(teks: string): boolean {
  const k = biasa(teks);
  if (/perseratus|tiga puluh/.test(k)) return false;
  return ada(teks, "tiga persepuluh") || adaPecahan(teks, "3/10") || adaDesimal(teks, "0,3") || adaDesimal(teks, "0.3");
}

export function persenLimaBelas(teks: string): boolean {
  const k = biasa(teks);
  if (/seratus lima belas|150/.test(k)) return false;
  const nilai = angkaUtuh(teks, "15") || k.includes("lima belas");
  return nilai && /persen|%/.test(`${teks} ${k}`);
}

export function lebihBesarSepertigaDariEnam(teks: string): boolean {
  if (adaPecahan(teks, "1/6") && !adaPecahan(teks, "1/3")) return false;
  return adaPecahan(teks, "1/3") || ada(teks, "sepertiga");
}

export function persenLimaPuluh(teks: string): boolean {
  const k = biasa(teks);
  if (/lima ratus|500/.test(k)) return false;
  const nilai = angkaUtuh(teks, "50") || k.includes("lima puluh");
  return nilai && /persen|%/.test(`${teks} ${k}`);
}

export function senilaiDelapanPerDuaBelas(teks: string): boolean {
  return adaPecahan(teks, "8/12") || (angkaUtuh(teks, "8") && !angkaUtuh(teks, "12") && !angkaUtuh(teks, "4") && !angkaUtuh(teks, "6"));
}

export function urutEvaluasiBesar(teks: string): boolean {
  return urutSimbol(teks, ["1/2", "1/3", "1/5", "1/10"]);
}

export function senilaiEnamPerDelapan(teks: string): boolean {
  if (adaPecahan(teks, "3/8") || adaPecahan(teks, "4/8")) return false;
  return adaPecahan(teks, "6/8") || ada(teks, "enam per delapan") || (angkaUtuh(teks, "6") && !angkaUtuh(teks, "8"));
}

export function persenDelapan(teks: string): boolean {
  const k = biasa(teks);
  if (/delapan puluh|80/.test(k)) return false;
  const nilai = angkaUtuh(teks, "8") || /(?:^|\s)delapan(?:\s|$)/.test(` ${k} `);
  return nilai && /persen|%/.test(`${teks} ${k}`);
}

export function lebihBesarSeperempatDariDelapan(teks: string): boolean {
  if ((adaPecahan(teks, "1/8") || ada(teks, "seperdelapan")) && !adaPecahan(teks, "1/4") && !ada(teks, "seperempat")) return false;
  return adaPecahan(teks, "1/4") || ada(teks, "seperempat");
}
