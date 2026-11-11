/**
 * Lab Papan Tempat (Kelas 3 Bab 1, Sub-Bab A sampai C): logika murni.
 * Papan tiga tempat (ratusan, puluhan, satuan) untuk bilangan sampai 999. Satu model, banyak perwakilan:
 * blok, angka, kata (baca), garis bilangan, nilai tiap angka (uraian), dan banding dua bilangan.
 * Anak boleh menukar sepuluh satuan menjadi satu puluhan (dan sebaliknya), sepuluh puluhan menjadi satu ratusan.
 * Tanpa skor, tanpa waktu. Murni: tanpa React, tanpa jaringan, tanpa impor nilai. Diuji di scripts/uji-lab-k3b1.mjs.
 */

export type Tempat = "r" | "p" | "s";
export type RepTempat = "kata" | "garis" | "nilai" | "banding";
export type DigitM = { r: number; p: number; s: number };

export type StateTempat = {
  r: number;
  p: number;
  s: number;
  /** Bilangan pembanding (hanya angka rapi 0..9 per tempat). */
  m: DigitM;
  tampil: Record<RepTempat, boolean>;
  tukarSP: boolean;
  tukarPR: boolean;
  /** Bilangan satu angka tidak nol (600, 60, 6, dst.) yang pernah dibuat saat Nilai menyala dan papan rapi. */
  pernahNilai: number[];
  pesan: string;
};

export type AksiTempat =
  | { t: "UBAH"; tempat: Tempat; d: 1 | -1 }
  | { t: "TUKAR_NAIK"; dari: "s" | "p" }
  | { t: "TUKAR_TURUN"; dari: "p" | "r" }
  | { t: "UBAH_M"; tempat: Tempat; d: 1 | -1 }
  | { t: "TOGGLE"; rep: RepTempat }
  | { t: "RESET" };

export type KeadaanTempat = {
  alat: "tempat";
  n: number;
  rapi: boolean;
  kata: boolean;
  garis: boolean;
  nilai: boolean;
  banding: boolean;
  m: number;
  beda: TempatBeda;
  tukarSP: boolean;
  tukarPR: boolean;
  pernahNilai: number[];
};

export type TempatBeda = "ratusan" | "puluhan" | "satuan" | "sama";

export const MAKS_BILANGAN = 999;

/** Perwakilan yang tersedia di Lab Papan Tempat menurut sub-bab (alat dipakai ulang dengan tampilan bertambah). */
export const REP_TEMPAT: Record<"A" | "B" | "C", RepTempat[]> = {
  A: ["kata", "garis"],
  B: ["kata", "garis", "nilai"],
  C: ["kata", "banding"],
};

/* ------------------------------ Nama bilangan ------------------------------ */

const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];

/** Kata bilangan 0..1000 menurut ejaan Indonesia ("seratus", "sebelas", "dua belas"). */
export function kataBilangan(n: number): string {
  if (n === 1000) return "seribu";
  if (n < 10) return SATUAN[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SATUAN[n - 10]} belas`;
  if (n < 100) {
    const p = Math.floor(n / 10);
    const s = n % 10;
    return s === 0 ? `${SATUAN[p]} puluh` : `${SATUAN[p]} puluh ${SATUAN[s]}`;
  }
  const r = Math.floor(n / 100);
  const sisa = n % 100;
  const depan = r === 1 ? "seratus" : `${SATUAN[r]} ratus`;
  return sisa === 0 ? depan : `${depan} ${kataBilangan(sisa)}`;
}

/**
 * Ubah kalimat berangka menjadi kalimat yang enak dibaca suara guru: angka dieja, tanda dibaca.
 * Operator dikenali hanya bila dikelilingi spasi.
 */
export function ejaK3(teks: string): string {
  return teks
    .replace(/ \+ /g, " ditambah ")
    .replace(/ [−-] /g, " dikurangi ")
    .replace(/ × /g, " dikali ")
    .replace(/ : /g, " dibagi ")
    .replace(/ = /g, " sama dengan ")
    .replace(/ < /g, " kurang dari ")
    .replace(/ > /g, " lebih dari ")
    .replace(/\d+/g, (d) => kataBilangan(Number(d)));
}

/* ---------------------------------- Model ---------------------------------- */

export const nilaiTempat = (x: { r: number; p: number; s: number }): number => 100 * x.r + 10 * x.p + x.s;
export const rapiTempat = (x: { r: number; p: number; s: number }): boolean => x.r <= 9 && x.p <= 9 && x.s <= 9;

export const digitDari = (n: number): DigitM => ({ r: Math.floor(n / 100), p: Math.floor((n % 100) / 10), s: n % 10 });

/** Uraian nilai: 251 -> "200 + 50 + 1"; 602 -> "600 + 0 + 2". */
export const uraiBilangan = (n: number): string => {
  const d = digitDari(n);
  return `${100 * d.r} + ${10 * d.p} + ${d.s}`;
};

/** Tempat pertama (dari kiri) yang angkanya berbeda. */
export function tempatBeda(n: number, m: number): TempatBeda {
  const a = digitDari(n);
  const b = digitDari(m);
  if (a.r !== b.r) return "ratusan";
  if (a.p !== b.p) return "puluhan";
  if (a.s !== b.s) return "satuan";
  return "sama";
}

export const relasiTempat = (n: number, m: number): ">" | "<" | "=" => (n > m ? ">" : n < m ? "<" : "=");

export const kataRelasiTempat = (n: number, m: number): string => (n > m ? "lebih dari" : n < m ? "kurang dari" : "sama dengan");

/** Bilangan satu angka tidak nol (600, 60, 6, 300, dst.). */
export const satuAngka = (n: number): boolean => {
  const d = digitDari(n);
  return [d.r, d.p, d.s].filter((x) => x !== 0).length === 1;
};

export const awalTempat = (): StateTempat => ({
  r: 0,
  p: 0,
  s: 0,
  m: { r: 0, p: 0, s: 0 },
  tampil: { kata: false, garis: false, nilai: false, banding: false },
  tukarSP: false,
  tukarPR: false,
  pernahNilai: [],
  pesan: "",
});

const tolak = (x: StateTempat, pesan: string): StateTempat => ({ ...x, pesan });

/** Catat riwayat setelah tiap aksi (dipanggil di akhir langkah, bukan di efek tampilan). */
function catat(x: StateTempat): StateTempat {
  const n = nilaiTempat(x);
  if (x.tampil.nilai && rapiTempat(x) && n > 0 && satuAngka(n) && !x.pernahNilai.includes(n)) {
    return { ...x, pernahNilai: [...x.pernahNilai, n].sort((a, b) => a - b) };
  }
  return x;
}

const BATAS: Record<Tempat, number> = { r: 9, p: 19, s: 19 };
const NAMA_TEMPAT: Record<Tempat, string> = { r: "ratusan", p: "puluhan", s: "satuan" };

export function langkahTempat(x: StateTempat, a: AksiTempat): StateTempat {
  switch (a.t) {
    case "UBAH": {
      const baru = x[a.tempat] + a.d;
      if (baru < 0) return tolak(x, `Tempat ${NAMA_TEMPAT[a.tempat]} sudah kosong.`);
      if (baru > BATAS[a.tempat]) return tolak(x, `Tempat ${NAMA_TEMPAT[a.tempat]} sudah penuh. Coba tukar dulu.`);
      const y = { ...x, [a.tempat]: baru, pesan: "" } as StateTempat;
      if (nilaiTempat(y) > MAKS_BILANGAN) return tolak(x, "Papan ini paling besar 999.");
      return catat(y);
    }
    case "TUKAR_NAIK": {
      if (a.dari === "s") {
        if (x.s < 10) return tolak(x, "Satuan belum sampai sepuluh, belum bisa ditukar menjadi satu puluhan.");
        if (x.p >= BATAS.p) return tolak(x, "Tempat puluhan penuh. Tukar sepuluh puluhan menjadi satu ratusan dulu.");
        return catat({ ...x, s: x.s - 10, p: x.p + 1, tukarSP: true, pesan: "" });
      }
      if (x.p < 10) return tolak(x, "Puluhan belum sampai sepuluh, belum bisa ditukar menjadi satu ratusan.");
      if (x.r >= BATAS.r) return tolak(x, "Tempat ratusan sudah penuh.");
      return catat({ ...x, p: x.p - 10, r: x.r + 1, tukarPR: true, pesan: "" });
    }
    case "TUKAR_TURUN": {
      if (a.dari === "p") {
        if (x.p < 1) return tolak(x, "Tidak ada puluhan untuk dipecah.");
        if (x.s > 9) return tolak(x, "Tempat satuan penuh. Tukar dulu sepuluh satuan menjadi satu puluhan.");
        return catat({ ...x, p: x.p - 1, s: x.s + 10, pesan: "" });
      }
      if (x.r < 1) return tolak(x, "Tidak ada ratusan untuk dipecah.");
      if (x.p > 9) return tolak(x, "Tempat puluhan penuh. Tukar dulu sepuluh puluhan menjadi satu ratusan.");
      return catat({ ...x, r: x.r - 1, p: x.p + 10, pesan: "" });
    }
    case "UBAH_M": {
      const baru = x.m[a.tempat] + a.d;
      if (baru < 0 || baru > 9) return tolak(x, "Angka tiap tempat 0 sampai 9.");
      return { ...x, m: { ...x.m, [a.tempat]: baru }, pesan: "" };
    }
    case "TOGGLE":
      return catat({ ...x, tampil: { ...x.tampil, [a.rep]: !x.tampil[a.rep] }, pesan: "" });
    case "RESET":
      return awalTempat();
  }
}

export function keadaanTempat(x: StateTempat): KeadaanTempat {
  const n = nilaiTempat(x);
  const m = nilaiTempat(x.m);
  return {
    alat: "tempat",
    n,
    rapi: rapiTempat(x),
    kata: x.tampil.kata,
    garis: x.tampil.garis,
    nilai: x.tampil.nilai,
    banding: x.tampil.banding,
    m,
    beda: tempatBeda(n, m),
    tukarSP: x.tukarSP,
    tukarPR: x.tukarPR,
    pernahNilai: x.pernahNilai,
  };
}

/** Kalimat bacaan papan. Hanya angka rapi yang dibaca sebagai bilangan. */
export function kalimatTempat(x: StateTempat): string {
  const n = nilaiTempat(x);
  if (!rapiTempat(x)) return `Papan belum rapi. Nilainya ${n}, tetapi tiap tempat harus paling banyak 9. Tukar dulu.`;
  if (n === 0) return "Papan masih kosong. Tambah blok dulu.";
  return `${n} dibaca ${kataBilangan(n)}.`;
}
