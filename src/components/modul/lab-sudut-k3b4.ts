/**
 * Lab Sudut (Kelas 3 Bab 4, Sub-Bab B): logika murni. Satu alat, tiga bagian.
 *  Strip   : dua strip dengan pengait. Kaki OA tetap, kaki OB diputar (0° sampai 360°). Dibandingkan dengan pojok kertas lipat (90°).
 *  Busur   : sudut dibaca dalam derajat. Busur derajat hanya sampai 180°, jadi sudut refleks dibaca lewat sudut pasangan
 *            (360° dikurangi sudut refleks). Jenis sudut dihitung dari perbandingan dengan 90° dan 180°.
 *  Satuan  : sudut yang sama diukur dengan irisan besar (30°) dan irisan kecil (15°) memberi bilangan yang berbeda.
 * Garis tegak lurus dan sejajar baru dipelajari di Sub-Bab C, jadi tidak dipakai di sini.
 * Murni: tanpa React, tanpa jaringan, tanpa impor. Diuji di scripts/uji-lab-k3b4.mjs.
 */

export const IRISAN = { besar: 30, kecil: 15 } as const;
export type Irisan = keyof typeof IRISAN;
export const SUDUT_SATUAN = [30, 60, 90, 120, 150, 180];

export type JenisSudut = "berimpit" | "lancip" | "siku-siku" | "tumpul" | "lurus" | "refleks" | "penuh";
export const JENIS_BERNAMA: JenisSudut[] = ["lancip", "siku-siku", "tumpul", "lurus", "refleks"];

/** Jenis sudut dari ukurannya: banding dengan 90° dan 180°. */
export function jenisSudut(derajat: number): JenisSudut {
  if (derajat === 0) return "berimpit";
  if (derajat < 90) return "lancip";
  if (derajat === 90) return "siku-siku";
  if (derajat < 180) return "tumpul";
  if (derajat === 180) return "lurus";
  if (derajat < 360) return "refleks";
  return "penuh";
}

/** Sudut yang berpasangan: jumlah keduanya 360°. */
export const pasanganSudut = (derajat: number): number => 360 - derajat;

/** Banding dengan pojok kertas lipat (90°). */
export function bandingSiku(derajat: number): "lebih kecil" | "sama" | "lebih besar" {
  return derajat < 90 ? "lebih kecil" : derajat === 90 ? "sama" : "lebih besar";
}

export const banyakIrisan = (sudut: number, irisan: Irisan): number => sudut / IRISAN[irisan];

export type TampilSudut = { pojok: boolean; busur: boolean; jenis: boolean; pasangan: boolean };
export type LangkahSudut = 1 | -1 | 10 | -10 | 45 | -45;

export type StateSudut = {
  sudut: number;
  tampil: TampilSudut;
  /** Jenis sudut bernama yang pernah dibuat dengan Jenis sudut menyala. */
  pernahJenis: string[];
  /** Sudut yang diukur dengan irisan (kelipatan 30°, 30 sampai 180) dan satuannya. */
  sudutS: number;
  irisan: Irisan;
  /** "sudut:irisan" untuk setiap pengukuran dengan irisan yang pernah dilihat. */
  pernahSatuan: string[];
  pesan: string;
};

export type AksiSudut =
  | { t: "PUTAR"; d: LangkahSudut }
  | { t: "TOGGLE"; rep: keyof TampilSudut }
  | { t: "SUDUT_S"; d: 1 | -1 }
  | { t: "IRISAN"; irisan: Irisan }
  | { t: "RESET" };

export const awalSudut = (): StateSudut => ({
  sudut: 30,
  tampil: { pojok: false, busur: false, jenis: false, pasangan: false },
  pernahJenis: [],
  sudutS: 90,
  irisan: "besar",
  pernahSatuan: [],
  pesan: "",
});

const tambah = (daftar: string[], id: string): string[] => (daftar.includes(id) ? daftar : [...daftar, id]);

/** Catat jenis sudut bernama (hanya bila Jenis sudut menyala). */
function catatJenis(x: StateSudut): StateSudut {
  if (!x.tampil.jenis) return x;
  const j = jenisSudut(x.sudut);
  return JENIS_BERNAMA.includes(j) && !x.pernahJenis.includes(j) ? { ...x, pernahJenis: [...x.pernahJenis, j] } : x;
}

export function langkahSudut(x: StateSudut, a: AksiSudut): StateSudut {
  switch (a.t) {
    case "PUTAR": {
      const baru = x.sudut + a.d;
      if (baru < 0) return { ...x, sudut: 0, pesan: "Kedua kaki sudah berimpit (0°). Sudut tidak bisa lebih kecil dari 0°." };
      if (baru > 360) return { ...x, sudut: 360, pesan: "Satu putaran penuh adalah 360°. Kaki OB kembali berimpit dengan OA." };
      return catatJenis({ ...x, sudut: baru, pesan: "" });
    }
    case "TOGGLE":
      return catatJenis({ ...x, tampil: { ...x.tampil, [a.rep]: !x.tampil[a.rep] }, pesan: "" });
    case "SUDUT_S": {
      const i = SUDUT_SATUAN.indexOf(x.sudutS) + a.d;
      if (i < 0 || i >= SUDUT_SATUAN.length) return { ...x, pesan: "Sudut untuk diukur dengan irisan: 30° sampai 180°." };
      const sudutS = SUDUT_SATUAN[i];
      return { ...x, sudutS, pernahSatuan: tambah(x.pernahSatuan, `${sudutS}:${x.irisan}`), pesan: "" };
    }
    case "IRISAN":
      return { ...x, irisan: a.irisan, pernahSatuan: tambah(x.pernahSatuan, `${x.sudutS}:${a.irisan}`), pesan: "" };
    case "RESET":
      return awalSudut();
  }
}

export type KeadaanSudut = {
  alat: "sudut";
  sudut: number;
  jenis: JenisSudut;
  pojok: boolean;
  busur: boolean;
  jenisTampil: boolean;
  pasangan: boolean;
  pernahJenis: string[];
  sudutS: number;
  irisan: Irisan;
  pernahSatuan: string[];
};

export function keadaanSudut(x: StateSudut): KeadaanSudut {
  return { alat: "sudut", sudut: x.sudut, jenis: jenisSudut(x.sudut), pojok: x.tampil.pojok, busur: x.tampil.busur, jenisTampil: x.tampil.jenis, pasangan: x.tampil.pasangan, pernahJenis: x.pernahJenis, sudutS: x.sudutS, irisan: x.irisan, pernahSatuan: x.pernahSatuan };
}

/** Sudut yang dibaca pada busur derajat: sampai 180° langsung, selebihnya lewat pasangan. */
export function bacaBusur(derajat: number): { langsung: boolean; baca: number } {
  return derajat <= 180 ? { langsung: true, baca: derajat } : { langsung: false, baca: pasanganSudut(derajat) };
}

export function ucapSudut(x: StateSudut): string {
  const j = jenisSudut(x.sudut);
  const b = bacaBusur(x.sudut);
  if (x.sudut === 0) return "Kedua kaki berimpit. Sudutnya nol derajat.";
  if (j === "penuh") return "Satu putaran penuh adalah tiga ratus enam puluh derajat. Kaki OB kembali berimpit dengan OA.";
  if (!b.langsung) return `Sudut ${x.sudut} derajat adalah sudut refleks. Busur derajat hanya sampai seratus delapan puluh, jadi baca pasangannya, ${b.baca} derajat. Tiga ratus enam puluh dikurangi ${b.baca} sama dengan ${x.sudut}.`;
  return `Sudut ${x.sudut} derajat adalah sudut ${j}. Dibandingkan pojok kertas lipat, sudut ini ${bandingSiku(x.sudut)}.`;
}

export function ucapSatuan(x: StateSudut): string {
  return `Sudut ${x.sudutS} derajat sama dengan ${banyakIrisan(x.sudutS, "besar")} irisan besar, atau ${banyakIrisan(x.sudutS, "kecil")} irisan kecil. Sudut yang sama menjadi bilangan berbeda, jadi kita perlu satuan baku, yaitu derajat.`;
}
