import { normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";
import { angkaUtuh, simbolBanding, urutDigit, urutPersis } from "@/lib/nilai-mtk-3-bab1";

function biasa(teks: string): string {
  return normalisasiJawabanTulis(teks);
}

function adaFrasa(teks: string, kalimat: string): boolean {
  return biasa(teks).includes(normalisasiJawabanTulis(kalimat));
}

export function baca2735(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/tiga ratus tiga puluh|tujuh puluh tiga|dua ratus/.test(kalimat)) return false;
  return angkaUtuh(teks, "2735") || adaFrasa(teks, "dua ribu tujuh ratus tiga puluh lima");
}

export function tulis9048(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/ratus|sembilan puluh|delapan puluh|empat ratus/.test(kalimat) && !angkaUtuh(teks, "9048")) return false;
  return angkaUtuh(teks, "9048") || adaFrasa(teks, "sembilan ribu empat puluh delapan");
}

export function nilaiDelapanPuluh(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/ribu|ratus|satuan/.test(kalimat)) return false;
  const nilai = kalimat.includes("delapan puluh") || angkaUtuh(teks, "80");
  return nilai && kalimat.includes("puluhan");
}

export function pecah3672(teks: string): boolean {
  const kalimat = biasa(teks);
  const angka = urutDigit(teks, ["3000", "600", "70", "2"]);
  return angka && /ribuan/.test(kalimat) && /ratusan/.test(kalimat) && /puluhan/.test(kalimat) && /satuan/.test(kalimat);
}

export function lebihBesar8264(teks: string): boolean {
  const kalimat = biasa(teks);
  if (angkaUtuh(teks, "8246") || kalimat.includes("empat puluh enam")) return false;
  const besar = angkaUtuh(teks, "8264") || kalimat.includes("enam puluh empat");
  return besar && kalimat.includes("puluhan");
}

export function banding2930(teks: string): boolean {
  return simbolBanding(teks, ">") && biasa(teks).includes("ratusan");
}

export function palingKecil4610(teks: string): boolean {
  const kalimat = biasa(teks);
  if (angkaUtuh(teks, "6410") || angkaUtuh(teks, "6140")) return false;
  const kecil = angkaUtuh(teks, "4610") || kalimat.includes("empat ribu enam ratus sepuluh");
  return kecil && /4\.?000|empat ribu/.test(kalimat);
}

export function urutAdegan(teks: string): boolean {
  return urutPersis(teks, ["2508", "2850", "7085", "7508"]);
}

export function susun3058(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/lima ratus|tiga ratus|lima ribu/.test(kalimat) && !angkaUtuh(teks, "3058")) return false;
  return angkaUtuh(teks, "3058") || adaFrasa(teks, "tiga ribu lima puluh delapan");
}

export function tulis6429(teks: string): boolean {
  return angkaUtuh(teks, "6429") || adaFrasa(teks, "enam ribu empat ratus dua puluh sembilan");
}

export function urai5406(teks: string): boolean {
  return urutDigit(teks, ["5000", "400", "6"]) || (
    adaFrasa(teks, "lima ribu") && adaFrasa(teks, "empat ratus") && adaFrasa(teks, "enam")
  );
}

export function urai2850(teks: string): boolean {
  return urutDigit(teks, ["2000", "800", "50"]);
}

export function tambah437(teks: string): boolean {
  const kalimat = biasa(teks);
  if (angkaUtuh(teks, "473") || kalimat.includes("tujuh puluh tiga")) return false;
  return angkaUtuh(teks, "437") || adaFrasa(teks, "empat ratus tiga puluh tujuh");
}

export function tambah803(teks: string): boolean {
  return angkaUtuh(teks, "803") || adaFrasa(teks, "delapan ratus tiga");
}

export function kurang415(teks: string): boolean {
  const kalimat = biasa(teks);
  if (angkaUtuh(teks, "845") || kalimat.includes("delapan ratus")) return false;
  return angkaUtuh(teks, "415") || adaFrasa(teks, "empat ratus lima belas");
}

export function kurang324(teks: string): boolean {
  return angkaUtuh(teks, "324") || adaFrasa(teks, "tiga ratus dua puluh empat");
}

export function kali42(teks: string): boolean {
  const kalimat = biasa(teks);
  if (angkaUtuh(teks, "24") || kalimat.includes("dua puluh empat") || kalimat.includes("empat belas")) return false;
  return angkaUtuh(teks, "42") || adaFrasa(teks, "empat puluh dua");
}

export function kali45(teks: string): boolean {
  return angkaUtuh(teks, "45") || adaFrasa(teks, "empat puluh lima");
}

export function bagi8(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/delapan puluh|delapan belas|enam puluh|empat puluh/.test(kalimat)) return false;
  return angkaUtuh(teks, "8") || /(?:^|\s)delapan(?:\s|$)/.test(` ${kalimat} `);
}

export function bagi9(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/sembilan puluh|sembilan belas/.test(kalimat)) return false;
  return angkaUtuh(teks, "9") || /(?:^|\s)sembilan(?:\s|$)/.test(` ${kalimat} `);
}

export function kelipatanYa(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/\bbukan\b|\btidak\b|\bbukan kelipatan\b/.test(kalimat)) return false;
  return /\bya\b|\biya\b|\bkelipatan\b/.test(kalimat);
}

export function faktorDelapanBelas(teks: string): boolean {
  const wajib = ["1", "2", "3", "6", "9", "18"];
  if (!wajib.every((angka) => angkaUtuh(teks, angka))) return false;
  return !["4", "5", "7", "8", "10", "12"].some((angka) => angkaUtuh(teks, angka));
}

export function tambah725(teks: string): boolean {
  return angkaUtuh(teks, "725") || adaFrasa(teks, "tujuh ratus dua puluh lima");
}

export function kurang525(teks: string): boolean {
  return angkaUtuh(teks, "525") || adaFrasa(teks, "lima ratus dua puluh lima");
}

export function urutEvaluasi(teks: string): boolean {
  return urutPersis(teks, ["8016", "8106", "8160", "8601"]);
}

export function baca7014(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/empat ratus|tujuh ratus empat belas|tujuh puluh/.test(kalimat)) return false;
  return angkaUtuh(teks, "7014") || adaFrasa(teks, "tujuh ribu empat belas");
}

export function kurang360(teks: string): boolean {
  return angkaUtuh(teks, "360") || adaFrasa(teks, "tiga ratus enam puluh");
}

export function kali72(teks: string): boolean {
  const kalimat = biasa(teks);
  if (kalimat.includes("dua puluh tujuh") || angkaUtuh(teks, "27")) return false;
  return angkaUtuh(teks, "72") || adaFrasa(teks, "tujuh puluh dua");
}

export function baca4019(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/seratus|empat ratus|sembilan ratus/.test(kalimat)) return false;
  return angkaUtuh(teks, "4019") || adaFrasa(teks, "empat ribu sembilan belas");
}

export function tulis8360(teks: string): boolean {
  return angkaUtuh(teks, "8360") || adaFrasa(teks, "delapan ribu tiga ratus enam puluh");
}

export function nilaiSembilanPuluh(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/ribu|ratus|satuan/.test(kalimat)) return false;
  const nilai = kalimat.includes("sembilan puluh") || angkaUtuh(teks, "90");
  return nilai && kalimat.includes("puluhan");
}

export function pecah2938(teks: string): boolean {
  const kalimat = biasa(teks);
  return urutDigit(teks, ["2000", "900", "30", "8"]) && /ribuan/.test(kalimat) && /ratusan/.test(kalimat);
}

export function lebihBesar3754(teks: string): boolean {
  const kalimat = biasa(teks);
  if (angkaUtuh(teks, "3745") || kalimat.includes("empat puluh lima")) return false;
  const besar = angkaUtuh(teks, "3754") || kalimat.includes("lima puluh empat");
  return besar && kalimat.includes("puluhan");
}

export function urutPeta(teks: string): boolean {
  return urutPersis(teks, ["4012", "4102", "4120", "4210"]);
}

export function susun7032(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/tujuh ratus|tiga ratus/.test(kalimat) && !angkaUtuh(teks, "7032")) return false;
  return angkaUtuh(teks, "7032") || adaFrasa(teks, "tujuh ribu tiga puluh dua");
}

export function urai4150(teks: string): boolean {
  return urutDigit(teks, ["4000", "100", "50"]);
}

export function tambah372(teks: string): boolean {
  return angkaUtuh(teks, "372") || adaFrasa(teks, "tiga ratus tujuh puluh dua");
}

export function tambah795(teks: string): boolean {
  return angkaUtuh(teks, "795") || adaFrasa(teks, "tujuh ratus sembilan puluh lima");
}

export function kurang500(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/puluh|ribu|belas/.test(kalimat)) return false;
  return angkaUtuh(teks, "500") || /(?:^|\s)lima ratus(?:\s|$)/.test(` ${kalimat} `);
}

export function kurang455(teks: string): boolean {
  return angkaUtuh(teks, "455") || adaFrasa(teks, "empat ratus lima puluh lima");
}

export function kali48(teks: string): boolean {
  const kalimat = biasa(teks);
  if (kalimat.includes("empat puluh") === false && angkaUtuh(teks, "84")) return false;
  if (angkaUtuh(teks, "84") || kalimat.includes("delapan puluh empat")) return false;
  return angkaUtuh(teks, "48") || adaFrasa(teks, "empat puluh delapan");
}

export function kali35(teks: string): boolean {
  return angkaUtuh(teks, "35") || adaFrasa(teks, "tiga puluh lima");
}

export function bagi6(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/enam puluh|enam belas/.test(kalimat)) return false;
  return angkaUtuh(teks, "6") || /(?:^|\s)enam(?:\s|$)/.test(` ${kalimat} `);
}

export function faktorLimaBelas(teks: string): boolean {
  const wajib = ["1", "3", "5", "15"];
  if (!wajib.every((angka) => angkaUtuh(teks, angka))) return false;
  return !["2", "4", "6", "10"].some((angka) => angkaUtuh(teks, angka));
}

export function duaPuluhDelapan(teks: string): boolean {
  return angkaUtuh(teks, "28") || adaFrasa(teks, "dua puluh delapan");
}
