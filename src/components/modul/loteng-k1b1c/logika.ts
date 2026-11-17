/**
 * Logika murni Kelas 1 Bab 1 Sub-Bab C "Tangga Gudang Loteng" (menghitung maju dan mundur) untuk tahap Mind-map,
 * Infografis, Simulasi, Concrete, Pictorial, dan Abstract. Tanpa React dan tanpa jaringan, diuji di Node:
 * scripts/uji-loteng-k1b1c.mjs. Tempel label, kata bilangan, dan cara menjawab memakai ulang Sub-Bab A.
 */
import { acak, kata } from "../lemari-k1b1a/logika";
import type { Cara } from "../lemari-k1b1a/logika";

export { acak, cocok, cocokKelompok, kata, kelompokLabel, labelDari, IKON_CARA, NAMA_CARA, URUT_CARA, type Cara, type Label, type Tempat } from "../lemari-k1b1a/logika";

/* ------------------------------ Metode ------------------------------ */
export type Metode = "igil" | "jalur" | "lanjut" | "tongkat";
export const URUT_METODE: Metode[] = ["igil", "jalur", "lanjut", "tongkat"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: maju, mundur, lengkapi",
  jalur: "Number Track: jalur angka",
  lanjut: "Counting On: hitung lanjut",
  tongkat: "Counting Stick: tongkat hitung",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F4E6}", jalur: "\u{1F6E4}\u{FE0F}", lanjut: "\u{27A1}\u{FE0F}", tongkat: "\u{1F4CF}" };

export type Rupa = "benda" | "diagram" | "lambang";
export type Arah = "maju" | "mundur";

export type Langkah =
  /** Susun benda bernomor berurutan maju atau mundur (`deret` adalah urutan yang benar). Tanpa jawaban angka. */
  | { tipe: "susun"; deret: number[] }
  /** Lengkapi deret: satu tempat kosong (null). */
  | { tipe: "lengkapi"; deret: (number | null)[] }
  /** Jalur angka nol sampai sepuluh: penanda di n, tanya angka sebelum atau sesudahnya. */
  | { tipe: "jalur"; n: number; tanya: "sebelum" | "sesudah" }
  /** Hitung lanjut dari `mulai` sebanyak `langkah` ke arah `arah`. */
  | { tipe: "lanjut"; mulai: number; langkah: number; arah: Arah }
  /** Tongkat hitung nol sampai sepuluh: angka `tutup` ditutup, dihitung dari angka `dari` yang terlihat (nol, lima, atau sepuluh). */
  | { tipe: "tongkat"; tutup: number; dari: 0 | 5 | 10 };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

/** Arah deret susun: maju bila naik. */
export const arahDeret = (d: readonly number[]): Arah => (d.length < 2 || d[1] > d[0] ? "maju" : "mundur");
/** Deret berurutan satu-satu (maju atau mundur). */
export const deretUrut = (d: readonly (number | null)[]): boolean => {
  const isi = d.map((v, i) => [v, i] as const).filter(([v]) => v !== null) as [number, number][];
  if (isi.length < 2) return false;
  const beda = (isi[1][0] - isi[0][0]) / (isi[1][1] - isi[0][1]);
  return Math.abs(beda) === 1 && isi.every(([v, i]) => v === isi[0][0] + beda * (i - isi[0][1]));
};

/** Kunci tiap langkah, dihitung dari datanya. Null untuk susun (tanpa jawaban angka). */
export function kunciLangkah(l: Langkah): number | null {
  switch (l.tipe) {
    case "susun":
      return null;
    case "lengkapi": {
      const i = l.deret.indexOf(null);
      const j = l.deret.findIndex((v) => v !== null);
      const k2 = l.deret.findIndex((v, x) => v !== null && x !== j);
      const beda = ((l.deret[k2] as number) - (l.deret[j] as number)) / (k2 - j);
      return (l.deret[j] as number) + beda * (i - j);
    }
    case "jalur":
      return l.tanya === "sesudah" ? l.n + 1 : l.n - 1;
    case "lanjut":
      return l.arah === "maju" ? l.mulai + l.langkah : l.mulai - l.langkah;
    case "tongkat":
      return l.tutup;
  }
}
export const angkaJawab = kunciLangkah;

/** Pilihan ketuk: kunci dengan dua tetangganya (dalam nol sampai sepuluh), urut naik. */
export function pilihanDari(l: Langkah): number[] {
  const k = kunciLangkah(l) ?? 0;
  const calon = l.tipe === "jalur" ? [l.n - 1, l.n, l.n + 1] : [k - 1, k, k + 1];
  const ada = [...new Set(calon.filter((n) => n >= 0 && n <= 10))];
  for (let n = 0; ada.length < 3 && n <= 10; n += 1) if (!ada.includes(n)) ada.push(n);
  return ada.sort((p, q) => p - q);
}

/** Langkah hitung lanjut: angka yang disebut berurutan sesudah `mulai`. */
export const deretLanjut = (l: Extract<Langkah, { tipe: "lanjut" }>): number[] => Array.from({ length: l.langkah }, (_, i) => (l.arah === "maju" ? l.mulai + i + 1 : l.mulai - i - 1));
/** Angka tongkat yang disebut berurutan dari `dari` sampai `tutup`. */
export const deretTongkat = (l: Extract<Langkah, { tipe: "tongkat" }>): number[] => {
  const s = l.tutup > l.dari ? 1 : -1;
  return Array.from({ length: Math.abs(l.tutup - l.dari) }, (_, i) => l.dari + s * (i + 1));
};
/** Urutan acak berbenih untuk kartu susun. */
export const acakSusun = (d: readonly number[], benih: number): number[] => {
  const a = acak(d, benih);
  return a.every((v, i) => v === d[i]) ? [...a.slice(1), a[0]] : a;
};

/* ------------------------------ Instruksi (templat, tanpa digit) ------------------------------ */
const AKHIR: Record<Cara, string> = { klik: "Lalu pilih jawabannya.", kanvas: "Lalu tulis angkanya di kanvas.", suara: "Lalu ucapkan jawabannya." };
const benda = (r: Rupa) => (r === "benda" ? "kardus" : r === "diagram" ? "kartu titik" : "kartu angka");

export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  const akhir = AKHIR[cara];
  switch (l.tipe) {
    case "susun": {
      const ar = arahDeret(l.deret) === "maju" ? "maju, dari yang paling sedikit" : "mundur, dari yang paling banyak";
      return cara === "kanvas" ? `Tarik garis menghubungkan ${benda(rupa)} berurutan ${ar}.` : `Ketuk ${benda(rupa)} berurutan ${ar}.`;
    }
    case "lengkapi":
      return `Ada satu yang hilang. Hitung ${arahLengkapi(l.deret)}, lalu ${cara === "suara" ? "ucapkan" : cara === "kanvas" ? "tulis" : "pilih"} angka yang hilang.`;
    case "jalur": {
      const ar = l.tanya === "sesudah" ? (rupa === "benda" ? "naik" : "maju") : rupa === "benda" ? "turun" : "mundur";
      if (cara === "kanvas") return `Lingkari ${rupa === "benda" ? "anak tangga" : "petak"} ${l.tanya}nya. ${akhir}`;
      return `Cari angka ${l.tanya}nya. Tekan ${kapital(ar)} satu kali. ${akhir}`;
    }
    case "lanjut": {
      const ar = l.arah === "maju" ? "maju" : "mundur";
      if (cara === "kanvas") return `Mulai dari angka di kotak, jangan dari satu. Beri satu tanda pada tiap langkah ${ar}. ${akhir}`;
      return `Mulai dari angka di kotak, jangan dari satu. Ketuk tiap langkah ${ar} sambil hitung lanjut. ${akhir}`;
    }
    case "tongkat":
      if (cara === "kanvas") return `Tarik garis dari angka yang terlihat ke tanda tanya, lalu hitung. ${akhir}`;
      return `Mulai dari angka yang terlihat. Ketuk tiap tempat sampai tanda tanya. ${akhir}`;
  }
}
/** Arah deret lengkapi: mundur bila angka pertama lebih besar daripada angka terakhir yang terlihat. */
export const arahLengkapi = (d: readonly (number | null)[]): Arah => {
  const isi = d.filter((v): v is number => v !== null);
  return isi[0] > isi[isi.length - 1] ? "mundur" : "maju";
};
const kapital = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

/* ------------------------------ Simulasi Tangga Loteng ------------------------------ */
export type KardusSim = { id: string; nomor: number; bernomor: boolean; tempat: "lantai" | number };
export type KeadaanLoteng = {
  alat: "loteng";
  /** Anak tangga tempat Igil berdiri (nol = lantai). */
  pos: number;
  /** Pernah sampai anak tangga sepuluh. */
  puncak: boolean;
  /** Sampai lantai lagi sesudah puncak. */
  turun: boolean;
  kardus: KardusSim[];
  /** Rak sudah dibaca mundur dari kanan. */
  bacaMundur: boolean;
};

export const awalLoteng = (hilang: number[], benih = 5): KeadaanLoteng => ({
  alat: "loteng",
  pos: 0,
  puncak: false,
  turun: false,
  bacaMundur: false,
  kardus: acak(
    Array.from({ length: 10 }, (_, i) => ({ id: `kd${i + 1}`, nomor: i + 1, bernomor: !hilang.includes(i + 1), tempat: "lantai" as const })),
    benih,
  ),
});

export function langkahTangga(k: KeadaanLoteng, d: 1 | -1): KeadaanLoteng {
  const pos = Math.max(0, Math.min(10, k.pos + d));
  if (pos === k.pos) return k;
  const puncak = k.puncak || pos === 10;
  return { ...k, pos, puncak, turun: k.turun || (k.puncak && pos === 0) };
}

/** Angka di rak (nomor kardus di tempat ke-n), null bila kosong. */
export const isiRak = (k: KeadaanLoteng, n: number): KardusSim | undefined => k.kardus.find((x) => x.tempat === n);

/**
 * Taruh kardus `id` di tempat rak `n` (1 sampai 10). Kardus bernomor hanya cocok di nomornya sendiri.
 * Kardus tanpa nomor cocok di tempat nomornya bila tetangga kiri dan kanan sudah terisi (supaya bisa dilengkapi dengan menghitung).
 * Mengembalikan keadaan baru dan alasan bila ditolak.
 */
export function taruhKardus(k: KeadaanLoteng, id: string, n: number): { k: KeadaanLoteng; tolak?: "nomor" | "tetangga" | "terisi" } {
  const kd = k.kardus.find((x) => x.id === id);
  if (!kd || n < 1 || n > 10) return { k, tolak: "nomor" };
  if (isiRak(k, n)) return { k, tolak: "terisi" };
  if (kd.nomor !== n) return { k, tolak: "nomor" };
  if (!kd.bernomor) {
    const kiri = n === 1 || !!isiRak(k, n - 1);
    const kanan = n === 10 || !!isiRak(k, n + 1);
    if (!kiri || !kanan) return { k, tolak: "tetangga" };
  }
  return { k: { ...k, kardus: k.kardus.map((x) => (x.id === id ? { ...x, tempat: n } : x)) } };
}
export const rakPenuh = (k: KeadaanLoteng): boolean => k.kardus.every((x) => x.tempat !== "lantai");
export const bernomorDiRak = (k: KeadaanLoteng): boolean => k.kardus.filter((x) => x.bernomor).every((x) => x.tempat === x.nomor);
export const hilangTerisi = (k: KeadaanLoteng): boolean => k.kardus.filter((x) => !x.bernomor).every((x) => x.tempat === x.nomor);

/** Kalimat posisi tangga (tanpa digit). */
export const kalimatTangga = (k: KeadaanLoteng): string =>
  k.pos === 0 ? "Igil di lantai, nol." : `Igil di anak tangga ${kata(k.pos)}. Sebelumnya ${kata(k.pos - 1)}${k.pos < 10 ? `, sesudahnya ${kata(k.pos + 1)}` : ""}.`;
