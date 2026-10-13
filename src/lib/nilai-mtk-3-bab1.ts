import { normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";

export function angkaUtuh(teks: string, angka: string): boolean {
  return new RegExp(`(?:^|\\D)${angka}(?:\\D|$)`).test(teks.replace(/\./g, ""));
}

export function urutDigit(teks: string, daftar: string[]): boolean {
  const sumber = teks.replace(/\D/g, "");
  let mulai = 0;
  for (const angka of daftar) {
    const indeks = sumber.indexOf(angka, mulai);
    if (indeks < 0) return false;
    mulai = indeks + angka.length;
  }
  return true;
}

function biasa(teks: string): string {
  return normalisasiJawabanTulis(teks);
}

function adaFrasa(teks: string, kalimat: string): boolean {
  return biasa(teks).includes(normalisasiJawabanTulis(kalimat));
}

export function simbolBanding(teks: string, arah: "<" | ">"): boolean {
  const lain = arah === "<" ? ">" : "<";
  if (teks.includes(lain) || teks.includes("=")) return false;
  const kalimat = biasa(teks);
  if (arah === "<") {
    if (/lebih besar/.test(kalimat)) return false;
    return teks.includes("<") || /lebih kecil|kurang dari/.test(kalimat);
  }
  if (/lebih kecil|kurang dari/.test(kalimat)) return false;
  return teks.includes(">") || /lebih besar/.test(kalimat);
}

export function baca3568(teks: string): boolean {
  return angkaUtuh(teks, "3568") || adaFrasa(teks, "tiga ribu lima ratus enam puluh delapan");
}

export function tulis6293(teks: string): boolean {
  return angkaUtuh(teks, "6293") || adaFrasa(teks, "enam ribu dua ratus sembilan puluh tiga");
}

export function nilaiTigaRatus(teks: string): boolean {
  if (angkaUtuh(teks, "300")) return true;
  const kalimat = biasa(teks);
  if (/ribu|puluh|belas/.test(kalimat)) return false;
  return kalimat.includes("tiga ratus");
}

export function pecah7916(teks: string): boolean {
  if (urutDigit(teks, ["7000", "900", "10", "6"])) return true;
  const kalimat = biasa(teks);
  return (
    kalimat.includes("tujuh ribu") &&
    kalimat.includes("sembilan ratus") &&
    kalimat.includes("sepuluh") &&
    /(?:^|\s)enam(?:\s|$)/.test(` ${kalimat} `)
  );
}

export function lebihBesar5671(teks: string): boolean {
  return angkaUtuh(teks, "5671") || adaFrasa(teks, "lima ribu enam ratus tujuh puluh satu");
}

export function urutSub4(teks: string): boolean {
  return urutDigit(teks, ["1905", "3276", "5482", "8040"]);
}

export function palingKecil3700(teks: string): boolean {
  if (angkaUtuh(teks, "3700")) return true;
  const kalimat = biasa(teks);
  if (kalimat.includes("tujuh ribu")) return false;
  return kalimat.includes("tiga ribu tujuh ratus");
}

export function baca5402(teks: string): boolean {
  if (angkaUtuh(teks, "5402")) return true;
  const kalimat = biasa(teks);
  if (/puluh|belas/.test(kalimat)) return false;
  return kalimat.includes("lima ribu empat ratus dua");
}

export function tulis7905(teks: string): boolean {
  return angkaUtuh(teks, "7905") || adaFrasa(teks, "tujuh ribu sembilan ratus lima");
}

export function nilaiTujuhRatus(teks: string): boolean {
  if (angkaUtuh(teks, "700")) return true;
  const kalimat = biasa(teks);
  if (/ribu|puluh|belas/.test(kalimat)) return false;
  return kalimat.includes("tujuh ratus");
}

export function pecah9123(teks: string): boolean {
  if (urutDigit(teks, ["9000", "100", "20", "3"])) return true;
  const kalimat = biasa(teks);
  return (
    kalimat.includes("sembilan ribu") &&
    /(?:^|\s)(?:seratus|satu ratus)(?:\s|$)/.test(` ${kalimat} `) &&
    kalimat.includes("dua puluh") &&
    /(?:^|\s)tiga(?:\s|$)/.test(` ${kalimat} `)
  );
}

export function lebihBesar6521(teks: string): boolean {
  return angkaUtuh(teks, "6521") || adaFrasa(teks, "enam ribu lima ratus dua puluh satu");
}

export function palingKecil4005(teks: string): boolean {
  if (angkaUtuh(teks, "4005")) return true;
  const kalimat = biasa(teks);
  if (/ratus|puluh|belas/.test(kalimat)) return false;
  return kalimat.includes("empat ribu lima");
}

export function urutKartuB(teks: string): boolean {
  return urutDigit(teks, ["2067", "2670", "2760"]);
}

export function urutLevel3(teks: string): boolean {
  return urutDigit(teks, ["2180", "2990", "6290", "6540", "9050"]);
}

export function urutLevel5(teks: string): boolean {
  return urutDigit(teks, ["6980", "7045", "7054", "7405", "8010"]);
}

export function urutPodium(teks: string): boolean {
  return urutDigit(teks, ["4065", "4506", "4560", "4650"]);
}

export function pecah6751(teks: string): boolean {
  if (urutDigit(teks, ["6000", "700", "50", "1"])) return true;
  const kalimat = biasa(teks);
  return (
    kalimat.includes("enam ribu") &&
    kalimat.includes("tujuh ratus") &&
    kalimat.includes("lima puluh") &&
    /(?:^|\s)satu(?:\s|$)/.test(` ${kalimat} `)
  );
}

export function baca4930(teks: string): boolean {
  if (angkaUtuh(teks, "4930")) return true;
  const kalimat = biasa(teks);
  if (/tiga puluh (satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)/.test(kalimat)) return false;
  return kalimat.includes("empat ribu sembilan ratus tiga puluh");
}

export function pecah9406(teks: string): boolean {
  if (teks.replace(/\D/g, "").includes("900040006")) return true;
  const kalimat = biasa(teks);
  return (
    kalimat.includes("sembilan ribu") &&
    kalimat.includes("empat ratus") &&
    /nol|kosong/.test(kalimat) &&
    /(?:^|\s)enam(?:\s|$)/.test(` ${kalimat} `)
  );
}

export function baca8090(teks: string): boolean {
  if (angkaUtuh(teks, "8090")) return true;
  const kalimat = biasa(teks);
  if (kalimat.includes("ratus")) return false;
  return kalimat.includes("delapan ribu sembilan puluh");
}

export function urutEvaluasi(teks: string): boolean {
  return urutDigit(teks, ["6075", "6507", "6705", "6750"]);
}

export function alasan8001(teks: string): boolean {
  const kalimat = biasa(teks);
  const besar = angkaUtuh(teks, "8001") || /delapan ribu(?: satu)?/.test(kalimat);
  if (!besar) return false;
  return /ribuan|lebih besar|karena|delapan/.test(kalimat);
}

export function turnamenBulu(teks: string): boolean {
  const kalimat = biasa(teks);
  const juara = kalimat.includes("hijau") || angkaUtuh(teks, "3840");
  const terakhir = kalimat.includes("kuning") || angkaUtuh(teks, "3084");
  return juara && terakhir && angkaUtuh(teks, "756");
}
