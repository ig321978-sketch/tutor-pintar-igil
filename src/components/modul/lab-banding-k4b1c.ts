/**
 * Lab Banding (Kelas 4 Bab 1, Sub-Bab C: Membandingkan dan Mengurutkan Bilangan sampai 10.000): logika murni.
 * Satu alat, tiga tampilan.
 *  Dua Bilangan : dua bilangan empat angka diatur per digit. Perbandingan DIHITUNG dari kiri (ribuan dulu);
 *                 tempat penentu (tempat pertama yang berbeda) disorot dan tanda < > = ditulis.
 *  Urut         : tiga tinggi gunung atau empat harga; ketuk dari terkecil (naik) atau terbesar (turun).
 *                 Lab menerima ketukan hanya bila memang terkecil atau terbesar di antara sisanya.
 *  Kartu Digit  : empat kartu disusun menjadi bilangan terbesar atau terkecil. Ribuan tidak boleh 0.
 * Istilah komposisi dan dekomposisi, serta penjumlahan bersusun, baru dipakai di sub-bab berikutnya.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k4b1.mjs.
 */

export const TEMPAT_C = ["ribuan", "ratusan", "puluhan", "satuan"] as const;
export type Digit4C = [number, number, number, number];
export const angkaC = (d: readonly number[]): number => d[0] * 1000 + d[1] * 100 + d[2] * 10 + d[3];
export const digitC = (n: number): Digit4C => [Math.floor(n / 1000) % 10, Math.floor(n / 100) % 10, Math.floor(n / 10) % 10, n % 10];
export const lambangC = (n: number): string => (n >= 1000 ? `${Math.floor(n / 1000)}.${String(n % 1000).padStart(3, "0")}` : String(n));

export type Tanda = "<" | ">" | "=";

/** Bandingkan dari kiri. Penentu: indeks tempat pertama yang berbeda, atau null bila sama. */
export function bandingDariKiri(a: readonly number[], b: readonly number[]): { penentu: number | null; tanda: Tanda } {
  for (let i = 0; i < 4; i += 1) if (a[i] !== b[i]) return { penentu: i, tanda: a[i] > b[i] ? ">" : "<" };
  return { penentu: null, tanda: "=" };
}

/** Langkah membandingkan, satu kalimat per tempat sampai penentu. */
export function langkahBanding(a: readonly number[], b: readonly number[]): string[] {
  const out: string[] = [];
  for (let i = 0; i < 4; i += 1) {
    if (a[i] === b[i]) out.push(`${TEMPAT_C[i]}: ${a[i]} dan ${b[i]} sama, lihat tempat berikutnya`);
    else {
      out.push(`${TEMPAT_C[i]}: ${a[i]} ${a[i] > b[i] ? ">" : "<"} ${b[i]}, ${TEMPAT_C[i]} yang menentukan`);
      return out;
    }
  }
  out.push("semua tempat sama");
  return out;
}

/* ------------------------------ Data urut dan kartu ------------------------------ */

export type IdUrut = "gunung" | "harga";
export const URUT_C: Record<IdUrut, { judul: string; item: { nama: string; n: number }[] }> = {
  gunung: {
    judul: "Tinggi gunung (meter)",
    item: [
      { nama: "Semeru", n: 3676 },
      { nama: "Sinabung", n: 2460 },
      { nama: "Rinjani", n: 3726 },
    ],
  },
  harga: {
    judul: "Harga di pasar (rupiah)",
    item: [
      { nama: "Manggis", n: 7570 },
      { nama: "Jeruk", n: 5240 },
      { nama: "Salak", n: 3041 },
      { nama: "Mangga", n: 9941 },
    ],
  },
};
export const DAFTAR_URUT: IdUrut[] = ["gunung", "harga"];

export const KARTU_C: Digit4C[] = [
  [1, 5, 9, 2],
  [3, 0, 7, 4],
  [6, 1, 8, 6],
];

/** Bilangan terbesar dan terkecil empat angka dari kartu (ribuan bukan 0). */
export function terbesarKartu(k: readonly number[]): number {
  return angkaC([...k].sort((p, q) => q - p));
}
export function terkecilKartu(k: readonly number[]): number {
  const naik = [...k].sort((p, q) => p - q);
  const iDepan = naik.findIndex((v) => v !== 0);
  const depan = naik[iDepan];
  const sisa = naik.filter((_, i) => i !== iDepan);
  return angkaC([depan, ...sisa]);
}

/* ------------------------------ Keadaan ------------------------------ */

export type ArahUrut = "naik" | "turun";
export type TujuanKartu = "terbesar" | "terkecil";

export type StateBandingK4B1C = {
  a: Digit4C;
  b: Digit4C;
  langkah: boolean;
  urut: IdUrut;
  arah: ArahUrut;
  dipilih: number[];
  kartu: number;
  tujuan: TujuanKartu;
  /** Indeks kartu pada tiap slot (ribuan sampai satuan), atau null. */
  slot: (number | null)[];
  pernah: string[];
  pesan: string;
};

export type AksiBandingK4B1C =
  | { t: "DIGIT"; bil: "a" | "b"; i: number; d: 1 | -1 }
  | { t: "LANGKAH" }
  | { t: "URUT"; id: IdUrut }
  | { t: "ARAH"; arah: ArahUrut }
  | { t: "KETUK"; i: number }
  | { t: "ULANG_URUT" }
  | { t: "KARTU_SET"; i: number }
  | { t: "TUJUAN"; tujuan: TujuanKartu }
  | { t: "TARUH"; kartu: number }
  | { t: "KOSONGKAN" }
  | { t: "PERIKSA" }
  | { t: "RESET" };

export const awalBandingK4B1C = (): StateBandingK4B1C => ({
  a: [5, 7, 3, 4],
  b: [4, 3, 1, 2],
  langkah: false,
  urut: "gunung",
  arah: "naik",
  dipilih: [],
  kartu: 0,
  tujuan: "terbesar",
  slot: [null, null, null, null],
  pernah: [],
  pesan: "",
});

const tambah = (daftar: string[], id: string): string[] => (daftar.includes(id) ? daftar : [...daftar, id]);

function catat(x: StateBandingK4B1C): StateBandingK4B1C {
  if (!x.langkah) return x;
  let p = x.pernah;
  const h = bandingDariKiri(x.a, x.b);
  p = tambah(p, `tanda:${h.tanda}`);
  p = tambah(p, `penentu:${h.penentu ?? "sama"}`);
  if (h.penentu === 0) {
    const [besar, kecil] = h.tanda === ">" ? [x.a, x.b] : [x.b, x.a];
    if ([1, 2, 3].every((i) => kecil[i] > besar[i])) p = tambah(p, "penentu-kuat");
  }
  return p === x.pernah ? x : { ...x, pernah: p };
}

export function langkahBandingK4B1C(x: StateBandingK4B1C, a: AksiBandingK4B1C): StateBandingK4B1C {
  switch (a.t) {
    case "DIGIT": {
      if (a.i < 0 || a.i > 3) return x;
      const lama = x[a.bil];
      let v = lama[a.i] + a.d;
      if (a.i === 0) v = v < 1 ? 9 : v > 9 ? 1 : v;
      else v = (v + 10) % 10;
      const baru = lama.map((w, i) => (i === a.i ? v : w)) as Digit4C;
      return catat({ ...x, [a.bil]: baru, pesan: "" } as StateBandingK4B1C);
    }
    case "LANGKAH":
      return catat({ ...x, langkah: !x.langkah, pesan: "" });
    case "URUT":
      return { ...x, urut: a.id, dipilih: [], pesan: "" };
    case "ARAH":
      return { ...x, arah: a.arah, dipilih: [], pesan: "" };
    case "KETUK": {
      const item = URUT_C[x.urut].item;
      if (a.i < 0 || a.i >= item.length) return x;
      if (x.dipilih.includes(a.i)) return { ...x, pesan: `${item[a.i].nama} sudah diurutkan.` };
      const sisa = item.map((_, i) => i).filter((i) => !x.dipilih.includes(i));
      const nilaiSisa = sisa.map((i) => item[i].n);
      const harus = x.arah === "naik" ? Math.min(...nilaiSisa) : Math.max(...nilaiSisa);
      if (item[a.i].n !== harus) {
        const yang = item[sisa[nilaiSisa.indexOf(harus)]];
        const kata = x.arah === "naik" ? "terkecil" : "terbesar";
        return {
          ...x,
          pernah: tambah(x.pernah, "urut-tolak"),
          pesan: `${lambangC(item[a.i].n)} belum yang ${kata}. Bandingkan dari ribuan: ${lambangC(yang.n)} lebih ${x.arah === "naik" ? "kecil" : "besar"}.`,
        };
      }
      const dipilih = [...x.dipilih, a.i];
      const selesai = dipilih.length === item.length;
      return { ...x, dipilih, pernah: selesai ? tambah(x.pernah, `urut:${x.urut}:${x.arah}`) : x.pernah, pesan: selesai ? `✅ Urutan ${x.arah}: ${dipilih.map((i) => lambangC(item[i].n)).join(", ")}.` : "" };
    }
    case "ULANG_URUT":
      return { ...x, dipilih: [], pesan: "" };
    case "KARTU_SET":
      if (a.i < 0 || a.i >= KARTU_C.length) return x;
      return { ...x, kartu: a.i, slot: [null, null, null, null], pesan: "" };
    case "TUJUAN":
      return { ...x, tujuan: a.tujuan, slot: [null, null, null, null], pesan: "" };
    case "TARUH": {
      if (a.kartu < 0 || a.kartu > 3 || x.slot.includes(a.kartu)) return x;
      const kosong = x.slot.indexOf(null);
      if (kosong < 0) return { ...x, pesan: "Keempat tempat sudah terisi. Kosongkan dulu." };
      return { ...x, slot: x.slot.map((v, i) => (i === kosong ? a.kartu : v)), pesan: "" };
    }
    case "KOSONGKAN":
      return { ...x, slot: [null, null, null, null], pesan: "" };
    case "PERIKSA": {
      if (x.slot.includes(null)) return { ...x, pesan: "Taruh keempat kartu dulu." };
      const k = KARTU_C[x.kartu];
      const d = x.slot.map((i) => k[i as number]);
      if (d[0] === 0) return { ...x, pernah: tambah(x.pernah, "kartu-nol-depan"), pesan: "Ribuan tidak boleh 0. Bilangan empat angka harus diawali angka selain 0." };
      const n = angkaC(d);
      const harus = x.tujuan === "terbesar" ? terbesarKartu(k) : terkecilKartu(k);
      if (n !== harus) return { ...x, pesan: `${lambangC(n)} belum yang ${x.tujuan}. ${x.tujuan === "terbesar" ? "Taruh angka terbesar di ribuan, lalu yang berikutnya." : "Taruh angka terkecil selain 0 di ribuan, lalu yang berikutnya."}` };
      return { ...x, pernah: tambah(x.pernah, `kartu:${x.kartu}:${x.tujuan}`), pesan: `✅ Bilangan ${x.tujuan}: ${lambangC(n)}.` };
    }
    case "RESET":
      return awalBandingK4B1C();
  }
}

/* ------------------------------ Laporan dan ucapan ------------------------------ */

export type KeadaanBandingK4B1C = { alat: "banding"; langkah: boolean; pernah: string[] };
export const keadaanBandingK4B1C = (x: StateBandingK4B1C): KeadaanBandingK4B1C => ({ alat: "banding", langkah: x.langkah, pernah: x.pernah });

export const kalimatBandingC = (a: readonly number[], b: readonly number[]): string => `${lambangC(angkaC(a))} ${bandingDariKiri(a, b).tanda} ${lambangC(angkaC(b))}`;

export function ucapBandingK4B1C(x: StateBandingK4B1C): string {
  return `${langkahBanding(x.a, x.b).join(". ")}. Jadi ${kalimatBandingC(x.a, x.b)}.`;
}
