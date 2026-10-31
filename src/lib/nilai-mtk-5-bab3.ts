const KATA: Array<[string, string]> = [
  ["tujuh ratus lima puluh satu", "751"],
  ["seratus lima puluh satu", "151"],
  ["dua puluh tiga", "23"],
  ["dua puluh dua", "22"],
  ["dua puluh satu", "21"],
  ["tiga puluh tiga", "33"],
  ["empat puluh", "40"],
  ["tiga puluh", "30"],
  ["dua puluh", "20"],
  ["empat belas", "14"],
  ["lima belas", "15"],
  ["tiga belas", "13"],
  ["sebelas", "11"],
  ["sepuluh", "10"],
  ["sembilan", "9"],
  ["delapan", "8"],
  ["tujuh", "7"],
  ["enam", "6"],
  ["lima", "5"],
  ["empat", "4"],
  ["tiga", "3"],
  ["dua", "2"],
  ["satu", "1"],
  ["nol", "0"],
];

const KHUSUS: Array<[string, string]> = [
  ["seperdelapan", "1 per 8"],
  ["sepertujuh", "1 per 7"],
  ["seperenam", "1 per 6"],
  ["seperlima", "1 per 5"],
  ["seperempat", "1 per 4"],
  ["sepertiga", "1 per 3"],
  ["setengah", "1 per 2"],
];

type Bentuk = { n: number; d: number; campuran: boolean; utuh: boolean };

function rapikan(teks: string): string {
  let s = teks.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
  s = s.replace(/\//g, " per ");
  s = s.replace(/[^a-z0-9\s]/g, " ");
  s = ` ${s.replace(/\s+/g, " ").trim()} `;
  for (const [kata, ganti] of KHUSUS) s = s.replaceAll(` ${kata} `, ` ${ganti} `);
  for (const [kata, ganti] of KATA) {
    let sebelumnya = "";
    while (s !== sebelumnya) {
      sebelumnya = s;
      s = s.replaceAll(` ${kata} `, ` ${ganti} `);
    }
  }
  return s.replace(/\s+/g, " ").trim();
}

function bagianJawaban(teks: string): string {
  const potong = teks.split(/[=]|sama dengan/i);
  return potong[potong.length - 1] ?? teks;
}

function parseSemua(teks: string): Bentuk[] {
  const s = rapikan(teks);
  const hasil: Bentuk[] = [];
  const pola = /(\d+)\s+(\d+)\s+per\s+(\d+)|(\d+)\s+per\s+(\d+)|(\d+)/g;
  for (const cocok of s.matchAll(pola)) {
    if (cocok[1]) {
      const bulat = Number(cocok[1]);
      const num = Number(cocok[2]);
      const den = Number(cocok[3]);
      if (den === 0) continue;
      hasil.push({ n: bulat * den + num, d: den, campuran: true, utuh: false });
    } else if (cocok[4]) {
      const num = Number(cocok[4]);
      const den = Number(cocok[5]);
      if (den === 0) continue;
      hasil.push({ n: num, d: den, campuran: false, utuh: false });
    } else if (cocok[6]) {
      hasil.push({ n: Number(cocok[6]), d: 1, campuran: false, utuh: true });
    }
  }
  return hasil;
}

function terakhir(teks: string): Bentuk | null {
  const semua = parseSemua(bagianJawaban(teks));
  return semua[semua.length - 1] ?? null;
}

function senilai(bentuk: Bentuk, n: number, d: number): boolean {
  return bentuk.n * d === n * bentuk.d;
}

export function nilaiSama(teks: string, n: number, d = 1): boolean {
  const bentuk = terakhir(teks);
  return bentuk !== null && senilai(bentuk, n, d);
}

function pecahanTepat(teks: string, n: number, d: number): boolean {
  const bentuk = terakhir(teks);
  return bentuk !== null && !bentuk.campuran && !bentuk.utuh && bentuk.n === n && bentuk.d === d;
}

export function tigaPerEmpat(teks: string): boolean {
  return pecahanTepat(teks, 3, 4);
}

export function duaPerLima(teks: string): boolean {
  return pecahanTepat(teks, 2, 5);
}

export function satuPerDua(teks: string): boolean {
  return pecahanTepat(teks, 1, 2);
}

export function empatPerEnam(teks: string): boolean {
  return nilaiSama(teks, 2, 3);
}

export function pecahanBiasaDuaTigaPerEmpat(teks: string): boolean {
  return pecahanTepat(teks, 23, 4);
}

export function lebihKecilSeperlima(teks: string): boolean {
  return /(?:^|\s)1 per 5(?:\s|$)/.test(rapikan(teks));
}

export function urutanPita(teks: string): boolean {
  const target = [
    { n: 9, d: 4 },
    { n: 12, d: 5 },
    { n: 5, d: 2 },
  ];
  let indeks = 0;
  for (const bentuk of parseSemua(teks)) {
    if (bentuk.utuh) continue;
    if (senilai(bentuk, target[indeks].n, target[indeks].d)) indeks += 1;
    if (indeks === target.length) return true;
  }
  return false;
}

export function hasilSatu(teks: string): boolean {
  return nilaiSama(teks, 1, 1);
}

export function hasilEmpat(teks: string): boolean {
  return nilaiSama(teks, 4, 1);
}

export function hasilDuaPuluhSatuPerDuaPuluh(teks: string): boolean {
  return nilaiSama(teks, 21, 20);
}

export function hasilEmpatBelasPerLimaBelas(teks: string): boolean {
  return nilaiSama(teks, 14, 15);
}

export function hasilSatuPerTujuh(teks: string): boolean {
  return nilaiSama(teks, 1, 7);
}

export function hasilDuaPerLimaBelas(teks: string): boolean {
  return nilaiSama(teks, 2, 15);
}

export function lompatanTerjauh(teks: string): boolean {
  const semua = parseSemua(teks).filter((bentuk) => !bentuk.utuh);
  const bentuk = semua[semua.length - 1];
  return bentuk !== undefined && bentuk.n * 2 === bentuk.d * 7;
}

export function duaPuluhDuaPerDelapan(teks: string): boolean {
  const bentuk = terakhir(teks);
  return bentuk !== null && !bentuk.utuh && bentuk.n === 22 && bentuk.d === 8;
}

export function hasilTigaPerDelapan(teks: string): boolean {
  return nilaiSama(teks, 3, 8);
}

export function hasilLimaDuaPerLima(teks: string): boolean {
  return nilaiSama(teks, 27, 5);
}

export function hasilLimaPerEnam(teks: string): boolean {
  return nilaiSama(teks, 5, 6);
}

export function hasilJarak(teks: string): boolean {
  return nilaiSama(teks, 751, 200);
}

export function hasilSatuPerDuaPuluh(teks: string): boolean {
  return nilaiSama(teks, 1, 20);
}

export function hasilSetengah(teks: string): boolean {
  return nilaiSama(teks, 1, 2);
}

export function hasilDuaSatuPerEnam(teks: string): boolean {
  return nilaiSama(teks, 13, 6);
}

export function hasilTigaPerLima(teks: string): boolean {
  return nilaiSama(teks, 3, 5);
}

export function hasilTujuhPerEmpatPuluh(teks: string): boolean {
  return nilaiSama(teks, 7, 40);
}

export function hasilLimaPerDelapan(teks: string): boolean {
  return nilaiSama(teks, 5, 8);
}
