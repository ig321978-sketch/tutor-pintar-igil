import { normalisasiJawabanTulis } from "@/lib/nilai-kuis-tulis";

export function angkaUtuh(teks: string, angka: string): boolean {
  return new RegExp(`(?:^|\\D)${angka}(?:\\D|$)`).test(teks.replace(/[.,]/g, ""));
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

export function urutPersis(teks: string, daftar: string[]): boolean {
  const ketemu = teks.replace(/[.,]/g, "").match(/\d{3,4}/g) ?? [];
  const milik = ketemu.filter((angka) => daftar.includes(angka));
  return milik.length === daftar.length && milik.every((angka, indeks) => angka === daftar[indeks]);
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
  const kalimat = biasa(teks);
  if (/ribu|puluh|belas/.test(kalimat)) return false;
  const nilai = kalimat.includes("tiga ratus") || angkaUtuh(teks, "300");
  return nilai && kalimat.includes("ratusan");
}

export function pecah7916(teks: string): boolean {
  const kalimat = biasa(teks);
  const angka =
    urutDigit(teks, ["7000", "900", "10", "6"]) ||
    (kalimat.includes("tujuh ribu") &&
      kalimat.includes("sembilan ratus") &&
      kalimat.includes("sepuluh") &&
      /(?:^|\s)enam(?:\s|$)/.test(` ${kalimat} `));
  return angka && /ribuan/.test(kalimat) && /ratusan/.test(kalimat) && /puluhan/.test(kalimat) && /satuan/.test(kalimat);
}

export function lebihBesar5671(teks: string): boolean {
  const kalimat = biasa(teks);
  if (angkaUtuh(teks, "5619") || kalimat.includes("sembilan belas")) return false;
  const besar = angkaUtuh(teks, "5671") || kalimat.includes("tujuh puluh satu");
  return besar && kalimat.includes("puluhan");
}

export function urutSub4(teks: string): boolean {
  return urutPersis(teks, ["1905", "3276", "5482", "8040"]);
}

export function bandingRumah(teks: string, arah: "<" | ">", rumah: "ratusan" | "puluhan"): boolean {
  if (!simbolBanding(teks, arah)) return false;
  const kalimat = biasa(teks);
  const lain = rumah === "ratusan" ? "puluhan" : "ratusan";
  if (kalimat.includes(lain)) return false;
  return kalimat.includes(rumah);
}

export function baca5402Rumah(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/empat puluh|dua puluh|ratusan kosong|satuan kosong/.test(kalimat)) return false;
  const baca = kalimat.includes("lima ribu empat ratus dua") || angkaUtuh(teks, "5402");
  return baca && /puluhan/.test(kalimat) && /kosong/.test(kalimat);
}

export function tulis7905Rumah(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/ratusan kosong|satuan kosong/.test(kalimat)) return false;
  return angkaUtuh(teks, "7905") && /puluhan/.test(kalimat) && /kosong/.test(kalimat);
}

export function baca8007(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/tujuh ratus(?!an)|tujuh puluh(?!an)|delapan ratus(?!an)|delapan puluh(?!an)/.test(kalimat)) return false;
  const baca = kalimat.includes("delapan ribu tujuh") || angkaUtuh(teks, "8007");
  return baca && /ratusan/.test(kalimat) && /puluhan/.test(kalimat) && /kosong/.test(kalimat);
}

export function tulis9060(teks: string): boolean {
  return angkaUtuh(teks, "9060") && !angkaUtuh(teks, "9600") && !angkaUtuh(teks, "9006");
}

export function palingKecil3700(teks: string): boolean {
  const kalimat = biasa(teks);
  if (kalimat.includes("tujuh ribu")) return false;
  const angka = angkaUtuh(teks, "3700") || kalimat.includes("tiga ribu tujuh ratus");
  return angka && (/kelompok|3000|3 000|ribuan/.test(kalimat));
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
  const kalimat = biasa(teks);
  if (/ribu|puluh|belas/.test(kalimat)) return false;
  const nilai = kalimat.includes("tujuh ratus") || angkaUtuh(teks, "700");
  return nilai && kalimat.includes("ratusan");
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
  const kalimat = biasa(teks);
  if (angkaUtuh(teks, "6512") || kalimat.includes("dua belas")) return false;
  const besar = angkaUtuh(teks, "6521") || kalimat.includes("dua puluh satu");
  return besar && kalimat.includes("puluhan");
}

export function palingKecil4005(teks: string): boolean {
  if (angkaUtuh(teks, "4005")) return true;
  const kalimat = biasa(teks);
  if (/ratus|puluh|belas/.test(kalimat)) return false;
  return kalimat.includes("empat ribu lima");
}

export function urutKartuB(teks: string): boolean {
  return urutPersis(teks, ["2067", "2670", "2760"]);
}

export function urutLevel3(teks: string): boolean {
  return urutPersis(teks, ["2180", "2990", "6290", "6540", "9050"]);
}

export function urutLevel5(teks: string): boolean {
  return urutDigit(teks, ["6980", "7045", "7054", "7405", "8010"]);
}

export function urutPodium(teks: string): boolean {
  return urutPersis(teks, ["4065", "4506", "4560", "4650"]);
}

export function pecah6751(teks: string): boolean {
  const kalimat = biasa(teks);
  const angka =
    urutDigit(teks, ["6000", "700", "50", "1"]) ||
    (kalimat.includes("enam ribu") &&
      kalimat.includes("tujuh ratus") &&
      kalimat.includes("lima puluh") &&
      /(?:^|\s)satu(?:\s|$)/.test(` ${kalimat} `));
  return angka && /ribuan/.test(kalimat) && /ratusan/.test(kalimat) && /puluhan/.test(kalimat) && /satuan/.test(kalimat);
}

export function baca4930(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/tiga puluh (satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan)/.test(kalimat)) return false;
  if (/puluhan kosong|ratusan kosong|sembilan puluh|empat puluh/.test(kalimat)) return false;
  const baca = angkaUtuh(teks, "4930") || kalimat.includes("empat ribu sembilan ratus tiga puluh");
  return baca && /satuan/.test(kalimat) && /kosong/.test(kalimat);
}

export function pecah9406(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/ratusan kosong|satuan kosong/.test(kalimat)) return false;
  const angka = teks.replace(/\D/g, "").includes("900040006") || (kalimat.includes("sembilan ribu") && kalimat.includes("empat ratus") && /(?:^|\s)enam(?:\s|$)/.test(` ${kalimat} `));
  return angka && /puluhan/.test(kalimat) && /kosong|nol/.test(kalimat);
}

export function baca8090(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/sembilan ratus/.test(kalimat)) return false;
  const baca = angkaUtuh(teks, "8090") || kalimat.includes("delapan ribu sembilan puluh");
  return baca && /ratusan/.test(kalimat) && /satuan/.test(kalimat) && /kosong/.test(kalimat);
}

export function urutEvaluasi(teks: string): boolean {
  return urutPersis(teks, ["6075", "6507", "6705", "6750"]) && /karena|ratus|puluh/.test(biasa(teks));
}

export function alasan8001(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/tujuh ribu lebih besar/.test(kalimat)) return false;
  const besar = angkaUtuh(teks, "8001") || /delapan ribu(?: satu)?/.test(kalimat);
  if (!besar) return false;
  return /ribuan/.test(kalimat);
}

export function kejuaraanPandu(teks: string): boolean {
  const kalimat = biasa(teks);
  if (/biru juara|biru pertama|kuning juara|hijau terakhir|merah juara/.test(kalimat)) return false;
  const juara = kalimat.includes("hijau") || angkaUtuh(teks, "3840");
  const terakhir = kalimat.includes("kuning") || angkaUtuh(teks, "3084");
  return juara && terakhir && angkaUtuh(teks, "756") && /ratusan/.test(kalimat);
}
