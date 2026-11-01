import { kumpulanAngka } from "@/lib/nilai-mtk-5-bab2";
import { normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";

function biasa(teks: string): string {
  return normalisasiJawabanTulis(teks);
}

function ada(teks: string, target: string): boolean {
  return kumpulanAngka(teks).includes(target);
}

function urut(teks: string, daftar: string[]): boolean {
  const angka = kumpulanAngka(teks);
  let dari = 0;
  for (const target of daftar) {
    const indeks = angka.indexOf(target, dari);
    if (indeks < 0) return false;
    dari = indeks + 1;
  }
  return true;
}

function bacaan(teks: string, bagian: string[], digit: string): boolean {
  if (ada(teks, digit)) return true;
  const k = biasa(teks);
  return bagian.every((frasa) => k.includes(frasa));
}

export function baca44567(teks: string): boolean {
  return bacaan(teks, ["empat puluh empat ribu", "lima ratus", "enam puluh tujuh"], "44567");
}

export function tulis15950(teks: string): boolean {
  return bacaan(teks, ["lima belas ribu", "sembilan ratus", "lima puluh"], "15950");
}

export function baca66500(teks: string): boolean {
  return bacaan(teks, ["enam puluh enam ribu", "lima ratus"], "66500");
}

export function tulis26932(teks: string): boolean {
  const k = biasa(teks);
  return ada(teks, "26932") || (k.includes("dua puluh enam ribu") && k.includes("sembilan ratus") && k.includes("tiga puluh dua"));
}

export function tulis73420(teks: string): boolean {
  if (ada(teks, "78150") && !ada(teks, "73420")) return false;
  return ada(teks, "73420") || biasa(teks).includes("tujuh puluh tiga ribu empat ratus dua puluh");
}

export function lebihKecil89876(teks: string): boolean {
  const k = biasa(teks);
  if (ada(teks, "97768") && !ada(teks, "89876") && !k.includes("delapan puluh sembilan")) return false;
  return ada(teks, "89876") || k.includes("delapan puluh sembilan ribu delapan ratus tujuh puluh enam");
}

export function urutMurah(teks: string): boolean {
  return urut(teks, ["56560", "65750", "75360"]);
}

export function uang38600(teks: string): boolean {
  return bacaan(teks, ["tiga puluh delapan ribu", "enam ratus"], "38600");
}

export function urai57500(teks: string): boolean {
  if (ada(teks, "50000") && ada(teks, "7000") && ada(teks, "500")) return true;
  const k = biasa(teks);
  return k.includes("lima puluh ribu") && k.includes("tujuh ribu") && k.includes("lima ratus");
}

export function jumlah45750(teks: string): boolean {
  return ada(teks, "45750") || biasa(teks).includes("empat puluh lima ribu tujuh ratus lima puluh");
}

export function kurang54534(teks: string): boolean {
  return ada(teks, "54534") || biasa(teks).includes("lima puluh empat ribu lima ratus tiga puluh empat");
}

export function lebih86576(teks: string): boolean {
  return ada(teks, "86576") || biasa(teks).includes("delapan puluh enam ribu lima ratus tujuh puluh enam");
}

export function isi85450(teks: string): boolean {
  return ada(teks, "85450") || biasa(teks).includes("delapan puluh lima ribu empat ratus lima puluh");
}

export function komposisi97500(teks: string): boolean {
  return ada(teks, "97500") || biasa(teks).includes("sembilan puluh tujuh ribu lima ratus");
}

export function tulis34000(teks: string): boolean {
  if (ada(teks, "3400") && !ada(teks, "34000")) return false;
  return ada(teks, "34000") || biasa(teks).includes("tiga puluh empat ribu");
}

export function jumlah55000(teks: string): boolean {
  return ada(teks, "55000") || biasa(teks).includes("lima puluh lima ribu");
}

export function jumlah89054(teks: string): boolean {
  return ada(teks, "89054") || biasa(teks).includes("delapan puluh sembilan ribu lima puluh empat");
}

export function sisa23000(teks: string): boolean {
  return ada(teks, "23000") || biasa(teks).includes("dua puluh tiga ribu");
}

export function deret90000(teks: string): boolean {
  return ada(teks, "90000") || biasa(teks).includes("sembilan puluh ribu");
}

export function deret21000(teks: string): boolean {
  return ada(teks, "21000") || biasa(teks).includes("dua puluh satu ribu");
}

export function beda13243(teks: string): boolean {
  return ada(teks, "13243");
}

export function baca15229(teks: string): boolean {
  const k = biasa(teks);
  return ada(teks, "15229") || (k.includes("lima belas ribu") && k.includes("dua ratus") && k.includes("dua puluh sembilan"));
}

export function tulis33403(teks: string): boolean {
  const k = biasa(teks);
  return ada(teks, "33403") || (k.includes("tiga puluh tiga ribu") && /empat ratus tiga(?! puluh)/.test(k));
}

export function kali55566(teks: string): boolean {
  return ada(teks, "55566") || biasa(teks).includes("lima puluh lima ribu lima ratus enam puluh enam");
}

export function bagi456(teks: string): boolean {
  if (ada(teks, "456")) return true;
  return biasa(teks).includes("empat ratus lima puluh enam");
}

export function sisa8500(teks: string): boolean {
  if (ada(teks, "85000") && !ada(teks, "8500")) return false;
  return ada(teks, "8500") || biasa(teks).includes("delapan ribu lima ratus");
}

export function jumlah121500(teks: string): boolean {
  const k = biasa(teks);
  return ada(teks, "121500") || (k.includes("seratus dua puluh satu ribu") && k.includes("lima ratus"));
}

export function tulis38000(teks: string): boolean {
  const k = biasa(teks);
  if (ada(teks, "38600") || k.includes("enam ratus")) return false;
  return ada(teks, "38000") || k.includes("tiga puluh delapan ribu");
}

export function kurang15400(teks: string): boolean {
  return ada(teks, "15400") || biasa(teks).includes("lima belas ribu empat ratus");
}

export function baca16667(teks: string): boolean {
  const k = biasa(teks);
  return ada(teks, "16667") || (k.includes("enam belas ribu") && k.includes("enam ratus") && k.includes("enam puluh tujuh"));
}

export function bayar47000(teks: string): boolean {
  return ada(teks, "47000") || biasa(teks).includes("empat puluh tujuh ribu");
}

export function kurang18800(teks: string): boolean {
  return ada(teks, "18800") || biasa(teks).includes("delapan belas ribu delapan ratus");
}

export function baca25786(teks: string): boolean {
  const k = biasa(teks);
  return ada(teks, "25786") || (k.includes("dua puluh lima ribu") && k.includes("tujuh ratus") && k.includes("delapan puluh enam"));
}
