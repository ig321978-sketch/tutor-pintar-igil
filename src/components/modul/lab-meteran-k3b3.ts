/**
 * Lab Meteran (Kelas 3 Bab 3, Sub-Bab B): logika murni.
 * Pita dirakit dari potongan 1 m (merah), 10 cm (biru), dan 1 cm (kuning). Disimpan sebagai sentimeter
 * (0 sampai 10.000 cm), jadi sepuluh potongan kecil selalu tertukar satu potongan yang lebih besar.
 * Satu pita (tulis, ubah satuan, garis meteran) atau dua pita (sambung dan potong, dengan simpan atau
 * pinjam satu meter). Panjang gabungan dijumlah atau dikurangi per satuan sama.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k3b3.mjs.
 */

export const MAKS_MET = 10000;
export const GARIS_MAKS = 400;

export type ModeMet = "satu" | "dua";
export type OpMet = "sambung" | "potong";
export type PitaMet = "a" | "b";
export type SatuanMet = "m" | "cm";
export type TampilMet = { meterCm: boolean; senti: boolean; garis: boolean; ubah: boolean; langkah: boolean };
export type LangkahMet = 1 | -1 | 10 | -10;

export type StateMet = {
  mode: ModeMet;
  op: OpMet;
  a: number;
  b: number;
  tampil: TampilMet;
  /** 10 potongan 1 cm pernah tertukar 1 potongan 10 cm. */
  tukarSP: boolean;
  /** 100 cm pernah tertukar 1 meter. */
  tukarPM: boolean;
  pesan: string;
};

export type AksiMet =
  | { t: "UBAH"; pita: PitaMet; satuan: SatuanMet; d: LangkahMet }
  | { t: "MODE"; mode: ModeMet }
  | { t: "OP"; op: OpMet }
  | { t: "TOGGLE"; rep: keyof TampilMet }
  | { t: "RESET" };

export const awalMet = (): StateMet => ({
  mode: "satu",
  op: "sambung",
  a: 0,
  b: 0,
  tampil: { meterCm: false, senti: false, garis: false, ubah: false, langkah: false },
  tukarSP: false,
  tukarPM: false,
  pesan: "",
});

export const titikMet = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
export const meterDari = (cm: number): number => Math.floor(cm / 100);
export const sisaDari = (cm: number): number => cm % 100;

/** "2 m 30 cm", "4 m", "30 cm". Nol bila kosong. */
export function teksMC(cm: number): string {
  const m = meterDari(cm);
  const s = sisaDari(cm);
  if (m === 0) return `${s} cm`;
  return s === 0 ? `${m} m` : `${m} m ${s} cm`;
}

export const teksCmMet = (cm: number): string => `${titikMet(cm)} cm`;

/** Hasil sambung atau potong. null bila tidak mungkin (melebihi batas atau yang dipotong lebih panjang). */
export function hasilMet(x: Pick<StateMet, "mode" | "op" | "a" | "b">): number | null {
  if (x.mode === "satu") return null;
  if (x.op === "sambung") return x.a + x.b <= MAKS_MET ? x.a + x.b : null;
  return x.a >= x.b ? x.a - x.b : null;
}

/** Sambung: jumlah sentimeter 100 atau lebih ditukar 1 meter. */
export const adaSimpanMet = (x: Pick<StateMet, "mode" | "op" | "a" | "b">): boolean => x.mode === "dua" && x.op === "sambung" && sisaDari(x.a) + sisaDari(x.b) >= 100;
/** Potong: sentimeter pita pertama lebih kecil, jadi meminjam 1 meter (100 cm). */
export const adaPinjamMet = (x: Pick<StateMet, "mode" | "op" | "a" | "b">): boolean => x.mode === "dua" && x.op === "potong" && x.a >= x.b && sisaDari(x.a) < sisaDari(x.b);

/** Langkah hitung per satuan, mis. ["Meter: 4 + 7 = 11 m", "Sentimeter: 37 + 43 = 80 cm", ...]. Kosong bila tidak mungkin. */
export function langkahHitung(x: Pick<StateMet, "mode" | "op" | "a" | "b">): string[] {
  const h = hasilMet(x);
  if (h === null) return [];
  const ma = meterDari(x.a);
  const mb = meterDari(x.b);
  const sa = sisaDari(x.a);
  const sb = sisaDari(x.b);
  if (x.op === "sambung") {
    const baris = [`Meter: ${ma} + ${mb} = ${ma + mb} m`, `Sentimeter: ${sa} + ${sb} = ${sa + sb} cm`];
    if (sa + sb >= 100) baris.push(`${sa + sb} cm lebih dari 100. Tukar 100 cm menjadi 1 m: ${ma + mb + 1} m ${sa + sb - 100} cm`);
    baris.push(`Hasil: ${teksMC(h)}`);
    return baris;
  }
  if (sa >= sb) return [`Meter: ${ma} − ${mb} = ${ma - mb} m`, `Sentimeter: ${sa} − ${sb} = ${sa - sb} cm`, `Hasil: ${teksMC(h)}`];
  return [
    `Sentimeter: ${sa} lebih kecil dari ${sb}. Pinjam 1 m yang sama dengan 100 cm.`,
    `Meter: ${ma} − 1 = ${ma - 1} m, sentimeter: ${sa} + 100 = ${sa + 100} cm`,
    `Meter: ${ma - 1} − ${mb} = ${ma - 1 - mb} m, sentimeter: ${sa + 100} − ${sb} = ${sa + 100 - sb} cm`,
    `Hasil: ${teksMC(h)}`,
  ];
}

/** Ubah satuan satu pita: meter ke sentimeter dikali 100, sentimeter ke meter dibagi 100. */
export function teksUbah(cm: number): string {
  const m = meterDari(cm);
  const s = sisaDari(cm);
  if (cm === 0) return "Belum ada pita.";
  if (s === 0) return `${m} m = ${m} × 100 cm = ${titikMet(cm)} cm. Sebaliknya ${titikMet(cm)} cm : 100 = ${m} m.`;
  if (m === 0) return `${s} cm kurang dari 100 cm, jadi belum sampai 1 m.`;
  return `${m} m ${s} cm = ${m} × 100 cm + ${s} cm = ${m * 100} cm + ${s} cm = ${titikMet(cm)} cm.`;
}

const tolak = (x: StateMet, pesan: string): StateMet => ({ ...x, pesan });

export function langkahMet(x: StateMet, a: AksiMet): StateMet {
  switch (a.t) {
    case "UBAH": {
      const lama = a.pita === "a" ? x.a : x.b;
      const baru = lama + a.d * (a.satuan === "m" ? 100 : 1);
      if (baru < 0) return tolak(x, "Panjang pita tidak di bawah nol.");
      if (baru > MAKS_MET) return tolak(x, "Pita paling panjang 100 m di bab ini.");
      let tukarSP = x.tukarSP;
      let tukarPM = x.tukarPM;
      if (a.satuan === "cm" && a.d > 0) {
        if (a.d === 1 && lama % 10 === 9) tukarSP = true;
        if ((lama % 100) + a.d >= 100) tukarPM = true;
      }
      const y = { ...x, [a.pita]: baru, tukarSP, tukarPM, pesan: "" } as StateMet;
      if (tukarPM && !x.tukarPM) return { ...y, pesan: "100 cm ditukar 1 meter!" };
      if (tukarSP && !x.tukarSP) return { ...y, pesan: "10 potongan 1 cm ditukar 1 potongan 10 cm!" };
      return y;
    }
    case "MODE":
      return a.mode === x.mode ? x : { ...x, mode: a.mode, pesan: "" };
    case "OP":
      return a.op === x.op ? x : { ...x, op: a.op, pesan: "" };
    case "TOGGLE":
      return { ...x, tampil: { ...x.tampil, [a.rep]: !x.tampil[a.rep] }, pesan: "" };
    case "RESET":
      return awalMet();
  }
}

export type KeadaanMet = {
  alat: "meteran";
  mode: ModeMet;
  op: OpMet;
  a: number;
  b: number;
  hasil: number;
  meterCm: boolean;
  senti: boolean;
  garis: boolean;
  ubah: boolean;
  langkah: boolean;
  tukarSP: boolean;
  tukarPM: boolean;
  simpan: boolean;
  pinjam: boolean;
};

export function keadaanMet(x: StateMet): KeadaanMet {
  const h = hasilMet(x);
  return {
    alat: "meteran",
    mode: x.mode,
    op: x.op,
    a: x.a,
    b: x.b,
    hasil: h === null ? -1 : h,
    meterCm: x.tampil.meterCm,
    senti: x.tampil.senti,
    garis: x.tampil.garis,
    ubah: x.tampil.ubah,
    langkah: x.tampil.langkah,
    tukarSP: x.tukarSP,
    tukarPM: x.tukarPM,
    simpan: adaSimpanMet(x),
    pinjam: adaPinjamMet(x),
  };
}

export function ucapMet(x: StateMet): string {
  if (x.mode === "satu") {
    if (x.a === 0) return "Belum ada pita. Tambahkan potongan satu meter, sepuluh sentimeter, atau satu sentimeter.";
    return `Pita ${meterDari(x.a)} meter ${sisaDari(x.a)} sentimeter. Seratus sentimeter sama dengan satu meter. Jadi pita ini ${x.a} sentimeter.`;
  }
  const h = hasilMet(x);
  if (h === null) return x.op === "sambung" ? "Dua pita ini terlalu panjang bila disambung." : "Pita yang dipotong lebih panjang dari pita pertama.";
  return `${x.op === "sambung" ? "Disambung" : "Dipotong"}: ${teksMC(x.a)} ${x.op === "sambung" ? "ditambah" : "dikurangi"} ${teksMC(x.b)} sama dengan ${teksMC(h)}.`;
}
