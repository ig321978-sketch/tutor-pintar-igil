/**
 * Logika murni Kelas 1 Bab 4 Sub-Bab A "Bahan dari Gudang" (mendeskripsikan benda berdasarkan bentuk), awal cerita Festival Mainan Kardus,
 * untuk tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract. Tanpa React dan tanpa jaringan, diuji di Node:
 * scripts/uji-bahan-k1b4a.mjs. Tempel label, kata bilangan, dan cara menjawab memakai ulang Kelas 1 Bab 1 Sub-Bab A.
 */
import { kata } from "../lemari-k1b1a/logika";
import type { Cara } from "../lemari-k1b1a/logika";

export { acak, cocok, cocokKelompok, kata, kelompokLabel, labelDari, IKON_CARA, NAMA_CARA, URUT_CARA, type Cara, type Label, type Tempat } from "../lemari-k1b1a/logika";

export type Metode = "igil" | "buru" | "paku" | "misteri";
export const URUT_METODE: Metode[] = ["igil", "buru", "paku", "misteri"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: amati, hitung sisi dan sudut, beri nama",
  buru: "Shape Hunt: berburu bentuk",
  paku: "Geoboard: papan paku",
  misteri: "Mystery Shape: bentuk misterius",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F50E}", buru: "\u{1F3F9}", paku: "\u{1F4CC}", misteri: "\u{2753}" };

export type Rupa = "benda" | "diagram" | "lambang";

/* ------------------------------ Bentuk dan ciri ------------------------------ */
export type Bentuk = "lengkung" | "segitiga" | "segiempat";
export const URUT_BENTUK: Bentuk[] = ["lengkung", "segitiga", "segiempat"];
export const NAMA_BENTUK: Record<Bentuk, string> = { lengkung: "bentuk lengkung", segitiga: "segitiga", segiempat: "segi empat" };
/** Nama pendek untuk kartu dan tombol. */
export const NAMA_PENDEK: Record<Bentuk, string> = { lengkung: "lengkung", segitiga: "segitiga", segiempat: "segi empat" };
/** Banyak sisi lurus (sama dengan banyak sudut) tiap bentuk. */
export const BANYAK_SUDUT: Record<Bentuk, number> = { lengkung: 0, segitiga: 3, segiempat: 4 };
export const banyakSisi = (b: Bentuk): number => BANYAK_SUDUT[b];
export const banyakSudut = (b: Bentuk): number => BANYAK_SUDUT[b];
export const bisaGelinding = (b: Bentuk): boolean => b === "lengkung";

/** Benda bekas atau bangun polos: bentuk, jenis benda (kunci emoji), putaran (derajat), ukuran (1 sampai 3), dan ragam. */
export type Benda = {
  bentuk: Bentuk;
  jenis: string;
  putar?: number;
  skala?: number;
  /** Segi empat: "persegi" atau "panjang". Segitiga: "sama" atau "siku". Lengkung: "bulat" atau "lonjong". */
  ragam?: "persegi" | "panjang" | "sama" | "siku" | "bulat" | "lonjong";
};

/** Kalimat deskripsi benda, untuk suara (tanpa digit). */
export function deskripsi(b: Bentuk): string {
  if (b === "lengkung") return "Bentuknya lengkung, tanpa sisi lurus dan tanpa sudut.";
  return `Bentuknya ${NAMA_BENTUK[b]}, sisi lurusnya ${kata(banyakSisi(b))}, sudutnya ${kata(banyakSudut(b))}.`;
}

/* ------------------------------ Petunjuk (syarat) untuk Mystery Shape ------------------------------ */
export type Syarat = "tanpa-sudut" | "punya-sudut" | "tiga-sudut" | "empat-sudut" | "tiga-sisi" | "empat-sisi" | "menggelinding";
export const TEKS_SYARAT: Record<Syarat, string> = {
  "tanpa-sudut": "Aku tidak punya sudut.",
  "punya-sudut": "Aku punya sudut.",
  "tiga-sudut": "Aku punya tiga sudut.",
  "empat-sudut": "Aku punya empat sudut.",
  "tiga-sisi": "Sisi lurusku ada tiga.",
  "empat-sisi": "Sisi lurusku ada empat.",
  menggelinding: "Aku bisa menggelinding.",
};
export function memenuhi(b: Bentuk, s: Syarat): boolean {
  switch (s) {
    case "tanpa-sudut":
    case "menggelinding":
      return b === "lengkung";
    case "punya-sudut":
      return b !== "lengkung";
    case "tiga-sudut":
    case "tiga-sisi":
      return b === "segitiga";
    case "empat-sudut":
    case "empat-sisi":
      return b === "segiempat";
  }
}

/* ------------------------------ Kartu kata (rupa lambang) ------------------------------ */
/** Kartu kata untuk Abstract: nama bentuk atau ciri, beserta bentuk yang diwakilinya. */
export type KartuKata = { teks: string; bentuk: Bentuk };
export const KARTU_KATA: Record<string, KartuKata> = {
  lengkung: { teks: "lengkung", bentuk: "lengkung" },
  segitiga: { teks: "segitiga", bentuk: "segitiga" },
  segiempat: { teks: "segi empat", bentuk: "segiempat" },
  "0sudut": { teks: "0 sudut", bentuk: "lengkung" },
  "3sudut": { teks: "3 sudut", bentuk: "segitiga" },
  "4sudut": { teks: "4 sudut", bentuk: "segiempat" },
  "3sisi": { teks: "3 sisi lurus", bentuk: "segitiga" },
  "4sisi": { teks: "4 sisi lurus", bentuk: "segiempat" },
  bulat: { teks: "tepi melengkung", bentuk: "lengkung" },
};

/* ------------------------------ Langkah soal ------------------------------ */
export type Langkah =
  /**
   * Metode IGIL: satu benda. Ketuk tiap sudut (atau sisi lurus), lalu jawab banyaknya. Lengkung: nol.
   * `klaim` = soal "Cari kesalahan": seorang tokoh sudah menjawab; anak menilai benar atau salah dulu. `alasan` menjelaskan kesalahan tokoh.
   */
  | { tipe: "ciri"; benda: Benda; tanya: "sisi" | "sudut"; klaim?: Klaim }
  /** Shape Hunt: ketuk semua benda yang bentuknya sama dengan sasaran, lalu jawab banyaknya. */
  | { tipe: "buru"; sasaran: Bentuk; isi: Benda[] }
  /** Geoboard: karet membentuk beberapa bangun di papan paku. Ketuk paku sudut, lalu jawab banyak sudut semuanya. */
  | { tipe: "paku"; bangun: [number, number][][] }
  /** Mystery Shape: baca petunjuk, pilih bentuk misterius dari tiga. Tanpa jawaban angka. */
  | { tipe: "misteri"; syarat: Syarat[]; pilihan: Benda[] }
  /** Mystery Shape untuk suara: keluarkan dari kantong semua benda yang memenuhi petunjuk, lalu jawab banyaknya. */
  | { tipe: "kantong"; syarat: Syarat; isi: Benda[] };

export type Klaim = { tokoh: "Igil" | "Kaka" | "Abang" | "Mamah"; angka: number; alasan: string };
/** Klaim tokoh benar bila angkanya sama dengan kunci. */
export const klaimBenar = (l: Extract<Langkah, { tipe: "ciri" }>): boolean => l.klaim !== undefined && l.klaim.angka === kunciLangkah(l);

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

/** Banyak sudut seluruh bangun karet. */
export const sudutPaku = (l: Extract<Langkah, { tipe: "paku" }>): number => l.bangun.reduce((n, b) => n + b.length, 0);
/** Indeks benda sasaran. */
export const sasaranBuru = (l: Extract<Langkah, { tipe: "buru" }>): number[] => l.isi.map((b, i) => (b.bentuk === l.sasaran ? i : -1)).filter((i) => i >= 0);
export const sasaranKantong = (l: Extract<Langkah, { tipe: "kantong" }>): number[] => l.isi.map((b, i) => (memenuhi(b.bentuk, l.syarat) ? i : -1)).filter((i) => i >= 0);
/** Pilihan yang memenuhi semua petunjuk. */
export const benarMisteri = (l: Extract<Langkah, { tipe: "misteri" }>): number[] => l.pilihan.map((b, i) => (l.syarat.every((s) => memenuhi(b.bentuk, s)) ? i : -1)).filter((i) => i >= 0);

/** Kunci tiap langkah, dihitung dari datanya. Null untuk misteri. */
export function kunciLangkah(l: Langkah): number | null {
  switch (l.tipe) {
    case "ciri":
      return l.tanya === "sisi" ? banyakSisi(l.benda.bentuk) : banyakSudut(l.benda.bentuk);
    case "buru":
      return sasaranBuru(l).length;
    case "paku":
      return sudutPaku(l);
    case "kantong":
      return sasaranKantong(l).length;
    case "misteri":
      return null;
  }
}
export const angkaJawab = kunciLangkah;

export function pilihanDari(l: Langkah): number[] {
  const k = kunciLangkah(l) ?? 0;
  const ada = [...new Set([k - 1, k, k + 1].filter((n) => n >= 0 && n <= 10))];
  for (let n = 0; ada.length < 3 && n <= 10; n += 1) if (!ada.includes(n)) ada.push(n);
  return ada.sort((p, q) => p - q);
}

/* ------------------------------ Instruksi (templat, tanpa digit) ------------------------------ */
const AKHIR_SUDUT: Record<Cara, string> = { klik: "Lalu pilih banyaknya.", kanvas: "Lalu tulis banyaknya di kanvas.", suara: "Lalu ucapkan banyaknya." };
const benda = (r: Rupa) => (r === "benda" ? "benda" : r === "diagram" ? "bangun" : "kartu");

export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  const akhir = AKHIR_SUDUT[cara];
  switch (l.tipe) {
    case "ciri": {
      const apa = l.tanya === "sisi" ? "sisi lurus" : "sudut";
      if (l.klaim) return `Cari kesalahan. ${l.klaim.tokoh} bilang, ${apa}nya ${kata(l.klaim.angka)}. Benar atau salah? Periksa dulu, lalu jawab.`;
      if (rupa === "lambang") return `Pikirkan ${NAMA_BENTUK[l.benda.bentuk]}. Berapa ${apa}nya? ${akhir}`;
      if (l.benda.bentuk === "lengkung") return `Amati tepinya. Cari ${apa}nya, kalau ada. ${akhir}`;
      if (cara === "kanvas") return `Beri satu tanda pada tiap ${apa}. ${akhir}`;
      return `Ketuk tiap ${apa} satu per satu sambil menghitung. ${akhir}`;
    }
    case "buru":
      if (cara === "kanvas") return `Lingkari setiap ${benda(rupa)} yang bentuknya ${NAMA_BENTUK[l.sasaran]}. ${akhir}`;
      return `Buru semua ${benda(rupa)} yang bentuknya ${NAMA_BENTUK[l.sasaran]}. Ketuk satu per satu. ${akhir}`;
    case "paku":
      if (rupa === "lambang") return `Hitung sudut semua bangun karet. ${akhir}`;
      if (cara === "kanvas") return `Beri tanda pada tiap paku sudut, tempat karet berbelok. ${akhir}`;
      return `Ketuk tiap paku sudut, tempat karet berbelok. ${akhir}`;
    case "misteri":
      return cara === "kanvas" ? "Baca petunjuknya, lalu lingkari bentuk misterius." : "Baca petunjuknya, lalu ketuk bentuk misterius.";
    case "kantong":
      return `Petunjuk: ${TEKS_SYARAT[l.syarat].replace("Aku", "aku")} Keluarkan semua ${benda(rupa)} yang cocok dari kantong. ${akhir}`;
  }
}

/* ------------------------------ Simulasi Meja Periksa Bahan ------------------------------ */
export type LabelBahan = "roda" | "atap" | "badan";
export const URUT_LABEL: LabelBahan[] = ["roda", "atap", "badan"];
export const LABEL_COCOK: Record<Bentuk, LabelBahan> = { lengkung: "roda", segitiga: "atap", segiempat: "badan" };
export type BahanSim = { id: string; nama: string; benda: Benda };
export type KeadaanBahan = {
  alat: "bahan";
  /** Bahan yang sedang di meja. */
  pilih: string;
  putar: Record<string, number>;
  skala: Record<string, number>;
  sisi: boolean;
  sudut: boolean;
  /** Bahan yang sudah dicoba digelindingkan. */
  gelinding: string[];
  label: Record<string, LabelBahan | null>;
};
export const awalBahan = (bahan: readonly BahanSim[]): KeadaanBahan => ({
  alat: "bahan",
  pilih: bahan[0].id,
  putar: Object.fromEntries(bahan.map((b) => [b.id, 0])),
  skala: Object.fromEntries(bahan.map((b) => [b.id, 2])),
  sisi: false,
  sudut: false,
  gelinding: [],
  label: Object.fromEntries(bahan.map((b) => [b.id, null])),
});
export const pilihBahan = (k: KeadaanBahan, id: string): KeadaanBahan => ({ ...k, pilih: id });
export const putarBahan = (k: KeadaanBahan): KeadaanBahan => ({ ...k, putar: { ...k.putar, [k.pilih]: (k.putar[k.pilih] + 45) % 360 } });
export function ubahSkala(k: KeadaanBahan, d: 1 | -1): KeadaanBahan {
  const n = k.skala[k.pilih] + d;
  if (n < 1 || n > 3) return k;
  return { ...k, skala: { ...k.skala, [k.pilih]: n } };
}
export const tampilSisi = (k: KeadaanBahan): KeadaanBahan => ({ ...k, sisi: !k.sisi });
export const tampilSudut = (k: KeadaanBahan): KeadaanBahan => ({ ...k, sudut: !k.sudut });
export const gelindingkan = (k: KeadaanBahan): KeadaanBahan => (k.gelinding.includes(k.pilih) ? k : { ...k, gelinding: [...k.gelinding, k.pilih] });
export const beriLabel = (k: KeadaanBahan, l: LabelBahan): KeadaanBahan => ({ ...k, label: { ...k.label, [k.pilih]: l } });
export const labelTepat = (k: KeadaanBahan, bahan: readonly BahanSim[]): number => bahan.filter((b) => k.label[b.id] === LABEL_COCOK[b.benda.bentuk]).length;

/** Kalimat keadaan untuk suara (tanpa digit). */
export function kalimatBahan(k: KeadaanBahan, bahan: readonly BahanSim[]): string {
  const b = bahan.find((x) => x.id === k.pilih) ?? bahan[0];
  const nama = b.nama.charAt(0).toUpperCase() + b.nama.slice(1);
  return `${nama}. ${deskripsi(b.benda.bentuk)}`;
}
