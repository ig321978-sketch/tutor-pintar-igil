/**
 * Lab Urut (Kelas 3 Bab 1, Sub-Bab C): logika murni.
 * Lima kartu bilangan tiga angka. Anak mengetuk dua kartu untuk menukar letaknya, lalu mengurutkan naik
 * (kecil ke besar) atau turun (besar ke kecil). Tiap himpunan sengaja dimulai tidak urut.
 * Tanpa skor, tanpa waktu. Murni: tanpa React, tanpa jaringan, tanpa impor nilai. Diuji di scripts/uji-lab-k3b1.mjs.
 */

export type ArahUrut = "naik" | "turun";

/** Empat himpunan: ratusan beda, ratusan sama (puluhan menentukan), semua angka sama (acak letak), satuan menentukan. */
export const HIMPUNAN_URUT: number[][] = [
  [720, 639, 709, 692, 741],
  [583, 529, 596, 505, 561],
  [418, 481, 148, 814, 184],
  [239, 231, 236, 233, 238],
];

export type StateUrut = {
  himpunan: number;
  kartu: number[];
  arah: ArahUrut;
  /** Indeks kartu yang sedang dipilih untuk ditukar. */
  pilih: number | null;
  pernahNaik: boolean;
  pernahTurun: boolean;
  /** Himpunan yang pernah berhasil diurutkan. */
  selesaiHimpunan: number[];
  tukar: number;
  pesan: string;
};

export type AksiUrut =
  | { t: "KETUK"; i: number }
  | { t: "ARAH"; arah: ArahUrut }
  | { t: "HIMPUNAN"; k: number }
  | { t: "RESET" };

export type KeadaanUrut = {
  alat: "urut";
  arah: ArahUrut;
  urut: boolean;
  pernahNaik: boolean;
  pernahTurun: boolean;
  himpunanSelesai: number;
};

export function sudahUrut(kartu: readonly number[], arah: ArahUrut): boolean {
  for (let i = 0; i + 1 < kartu.length; i += 1) {
    if (arah === "naik" ? kartu[i] > kartu[i + 1] : kartu[i] < kartu[i + 1]) return false;
  }
  return true;
}

export const awalUrut = (): StateUrut => ({
  himpunan: 0,
  kartu: [...HIMPUNAN_URUT[0]],
  arah: "naik",
  pilih: null,
  pernahNaik: false,
  pernahTurun: false,
  selesaiHimpunan: [],
  tukar: 0,
  pesan: "",
});

function catat(x: StateUrut): StateUrut {
  if (!sudahUrut(x.kartu, x.arah)) return x;
  return {
    ...x,
    pernahNaik: x.pernahNaik || x.arah === "naik",
    pernahTurun: x.pernahTurun || x.arah === "turun",
    selesaiHimpunan: x.selesaiHimpunan.includes(x.himpunan) ? x.selesaiHimpunan : [...x.selesaiHimpunan, x.himpunan],
  };
}

export function langkahUrut(x: StateUrut, a: AksiUrut): StateUrut {
  switch (a.t) {
    case "KETUK": {
      if (a.i < 0 || a.i >= x.kartu.length) return x;
      if (x.pilih === null) return { ...x, pilih: a.i, pesan: "" };
      if (x.pilih === a.i) return { ...x, pilih: null, pesan: "" };
      const kartu = [...x.kartu];
      [kartu[x.pilih], kartu[a.i]] = [kartu[a.i], kartu[x.pilih]];
      return catat({ ...x, kartu, pilih: null, tukar: x.tukar + 1, pesan: "" });
    }
    case "ARAH":
      return { ...x, arah: a.arah, pilih: null, pesan: "" };
    case "HIMPUNAN": {
      const k = ((a.k % HIMPUNAN_URUT.length) + HIMPUNAN_URUT.length) % HIMPUNAN_URUT.length;
      return { ...x, himpunan: k, kartu: [...HIMPUNAN_URUT[k]], pilih: null, tukar: 0, pesan: "" };
    }
    case "RESET":
      return awalUrut();
  }
}

export function keadaanUrut(x: StateUrut): KeadaanUrut {
  return {
    alat: "urut",
    arah: x.arah,
    urut: sudahUrut(x.kartu, x.arah),
    pernahNaik: x.pernahNaik,
    pernahTurun: x.pernahTurun,
    himpunanSelesai: x.selesaiHimpunan.length,
  };
}

/** Tempat yang menentukan urutan dua bilangan bertetangga (ratusan, puluhan, satuan). */
export function penentuUrut(a: number, b: number): "ratusan" | "puluhan" | "satuan" | "sama" {
  if (Math.floor(a / 100) !== Math.floor(b / 100)) return "ratusan";
  if (Math.floor((a % 100) / 10) !== Math.floor((b % 100) / 10)) return "puluhan";
  if (a % 10 !== b % 10) return "satuan";
  return "sama";
}

export function ucapUrut(x: StateUrut): string {
  const arahKata = x.arah === "naik" ? "naik, dari yang terkecil ke yang terbesar" : "turun, dari yang terbesar ke yang terkecil";
  if (sudahUrut(x.kartu, x.arah)) return `Kartu sudah urut ${arahKata}.`;
  return `Urutkan kartu ${arahKata}. Ketuk dua kartu untuk menukar letaknya.`;
}
