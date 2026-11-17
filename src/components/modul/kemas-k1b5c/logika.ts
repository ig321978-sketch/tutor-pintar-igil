/**
 * Logika murni Kelas 1 Bab 5 Sub-Bab C "Kemas Pakan dan Kantong" (nilai tempat puluhan dan satuan sampai dua puluh), lanjutan cerita
 * Akuarium Ikan Hias Abang, untuk tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract. Tanpa React dan tanpa jaringan,
 * diuji di Node: scripts/uji-kemas-k1b5c.mjs. Kata bilangan memakai ulang Sub-Bab A.
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { kata } from "../ikan-k1b5a/logika";

export { acak, cocok, cocokKelompok, kelompokLabel, labelDari, IKON_CARA, NAMA_CARA, URUT_CARA, type Cara, type Label, type Tempat } from "../lemari-k1b1a/logika";
export { kata, kataSepuluh } from "../ikan-k1b5a/logika";

export type Metode = "igil" | "balok" | "tabel" | "sedotan";
export const URUT_METODE: Metode[] = ["igil", "balok", "tabel", "sedotan"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: ikat sepuluh, hitung sisa, isi tabel",
  balok: "Base Ten Blocks: balok puluhan",
  tabel: "Place Value Chart: tabel puluhan dan satuan",
  sedotan: "Bundling Sticks: ikat sedotan",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F380}", balok: "\u{1F9F1}", tabel: "\u{1F4CB}", sedotan: "\u{1F964}" };

export type Rupa = "benda" | "diagram" | "lambang";
export type Tempat2 = "puluhan" | "satuan";
export type Tokoh = "Igil" | "Kaka" | "Abang";
/** Salah paham umum nilai tempat yang dibuat tokoh di soal Cari kesalahan. */
export type SalahPaham = "jumlah" | "kiri" | "lepas";

/* ------------------------------ Langkah soal ------------------------------ */
export type Langkah =
  /** Metode IGIL: kumpulkan sepuluh barang lalu ikat dengan karet, sisanya satuan. Jawab banyak semuanya atau banyak satuannya. */
  | { tipe: "ikat"; n: number; tanya: "bilangan" | "satuan"; jenis: string }
  /** Base Ten Blocks: balok puluhan (isi sepuluh) dan kubus satuan. Hitung balok dulu, lalu kubus. */
  | { tipe: "balok"; n: number; tanya: "bilangan" | "puluhan" | "satuan"; jenis: string }
  /** Place Value Chart: pindahkan ke kolom puluhan dan satuan. Tanya angka di satu kolom, atau tempat sebuah angka (tanpa jawaban angka). */
  | { tipe: "tabel"; n: number; tanya: "puluhan" | "satuan" | "tempat"; sorot: Tempat2; jenis: string }
  /** Bundling Sticks: buat bilangan sendiri dari ikatan sedotan dan sedotan lepas (ikat, lepas), atau hitung yang sudah ada (bilangan). */
  | { tipe: "sedotan"; n: number; tanya: "bilangan" | "ikat" | "lepas"; jenis: string }
  /** Cari kesalahan: tokoh sudah menjawab dengan salah paham. Putuskan benar atau salah, lalu pilih alasan yang benar (tanpa jawaban angka). */
  | { tipe: "cari"; n: number; tokoh: Tokoh; salah: SalahPaham; jenis: string };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const puluhanDari = (n: number): number => Math.floor(n / 10);
export const satuanDari = (n: number): number => n % 10;
/** Kalimat nilai tempat, mis. "satu puluhan enam satuan". */
export const kalimatTempat = (n: number): string => `${kata(puluhanDari(n))} puluhan ${kata(satuanDari(n))} satuan`;

/** Kunci tiap langkah, dihitung dari datanya. Null untuk memilih tempat atau alasan. */
export function kunciLangkah(l: Langkah): number | null {
  switch (l.tipe) {
    case "ikat":
      return l.tanya === "bilangan" ? l.n : l.n - 10;
    case "balok":
      return l.tanya === "bilangan" ? l.n : l.tanya === "puluhan" ? puluhanDari(l.n) : satuanDari(l.n);
    case "tabel":
      return l.tanya === "tempat" ? null : l.tanya === "puluhan" ? puluhanDari(l.n) : satuanDari(l.n);
    case "sedotan":
      return l.tanya === "bilangan" ? l.n : l.tanya === "ikat" ? puluhanDari(l.n) : satuanDari(l.n);
    case "cari":
      return null;
  }
}
export const angkaJawab = kunciLangkah;

/** Tiga pilihan di sekitar kunci (nol sampai dua puluh). */
export function pilihanDari(l: Langkah): number[] {
  const k = kunciLangkah(l) ?? 0;
  const ada = [...new Set([k - 1, k, k + 1].filter((n) => n >= 0 && n <= 20))];
  for (let n = 0; ada.length < 3 && n <= 20; n += 1) if (!ada.includes(n)) ada.push(n);
  return ada.sort((p, q) => p - q);
}

/** Banyak sedotan di baki: ikatan bernilai sepuluh, sedotan lepas bernilai satu. */
export const isiBaki = (ikat: number, lepas: number): number => ikat * 10 + lepas;
/** Persediaan sedotan di gudang (dua ikat dan sembilan lepas), cukup untuk membuat nol sampai dua puluh sembilan. */
export const GUDANG_SEDOTAN = { ikat: 2, lepas: 9 } as const;

/* ------------------------------ Cari kesalahan ------------------------------ */
type Fmt = (n: number) => string;
const angka: Fmt = (n) => String(n);

/** Jawaban tokoh (Fmt angka untuk layar, kata untuk suara). */
export function klaimCari(l: Extract<Langkah, { tipe: "cari" }>, f: Fmt = angka): string {
  const p = puluhanDari(l.n);
  const s = satuanDari(l.n);
  switch (l.salah) {
    case "jumlah":
      return `${f(l.n)} itu ${f(p)} tambah ${f(s)}, jadi ${f(p + s)}.`;
    case "kiri":
      return `Di ${f(l.n)}, angka ${f(p)} di kiri artinya ${f(p)} saja.`;
    case "lepas":
      return `${f(l.n)} barang: ${f(0)} puluhan, ${f(l.n)} satuan.`;
  }
}

/** Petunjuk bila anak menganggap jawaban tokoh benar: menunjuk kesalahan tokoh itu (tanpa digit). */
export function petunjukTokoh(l: Extract<Langkah, { tipe: "cari" }>): string {
  const p = puluhanDari(l.n);
  switch (l.salah) {
    case "jumlah":
      return `Lihat lagi. ${l.tokoh} menjumlah dua angkanya. Padahal angka kiri adalah puluhan: ${kata(p)} puluhan berarti ${kata(p * 10)}.`;
    case "kiri":
      return `Lihat lagi. ${l.tokoh} membaca angka kiri sebagai satuan. Angka kiri ada di tempat puluhan, jadi bernilai ${kata(p * 10)}.`;
    case "lepas":
      return `Lihat lagi. ${l.tokoh} tidak mengikat sepuluh. Sepuluh barang harus diikat menjadi satu puluhan dulu.`;
  }
}

export type Alasan = { teks: string; benar: boolean; petunjuk: string };
/** Tiga alasan (satu benar). Urutan tetap supaya mudah diuji; tampilan boleh mengacak. Teks tanpa digit supaya bisa dibacakan. */
export function alasanCari(l: Extract<Langkah, { tipe: "cari" }>): Alasan[] {
  const p = puluhanDari(l.n);
  const s = satuanDari(l.n);
  const benar: Alasan = { teks: `Angka kiri itu puluhan: ${kalimatTempat(l.n)}, jadi ${kata(l.n)}.`, benar: true, petunjuk: "" };
  const lain: Record<SalahPaham, Alasan[]> = {
    jumlah: [
      { teks: `Dua angkanya memang dijumlah, jadi ${kata(p + s)}.`, benar: false, petunjuk: `Itu sama dengan kesalahan ${l.tokoh}. Angka kiri bukan satu, tetapi satu puluhan.` },
      { teks: `Angka kanan itu puluhan, jadi ${kata(s)} puluhan.`, benar: false, petunjuk: "Angka kanan ada di tempat satuan, bukan puluhan." },
    ],
    kiri: [
      { teks: `Angka kiri dan kanan sama-sama satuan, jadi ${kata(p + s)}.`, benar: false, petunjuk: `Itu sama dengan kesalahan ${l.tokoh}. Hanya angka kanan yang satuan.` },
      { teks: `Angka kiri bernilai ${kata(p)} karena ditulis ${kata(p)}.`, benar: false, petunjuk: "Tempat menentukan arti angka. Di kiri, angka itu berarti puluhan." },
    ],
    lepas: [
      { teks: `Semua barang dihitung satuan saja, tidak perlu diikat.`, benar: false, petunjuk: `Itu sama dengan kesalahan ${l.tokoh}. Sepuluh satuan diikat menjadi satu puluhan.` },
      { teks: `Diikat sepuluh, jadi ${kata(p)} puluhan ${kata(l.n)} satuan.`, benar: false, petunjuk: "Yang sudah diikat tidak dihitung lagi. Satuannya hanya yang tersisa." },
    ],
  };
  return [benar, ...lain[l.salah]];
}

/* ------------------------------ Instruksi (templat, tanpa digit) ------------------------------ */
const AKHIR: Record<Cara, string> = { klik: "Lalu pilih jawabannya.", kanvas: "Lalu tulis angkanya di kanvas.", suara: "Lalu ucapkan jawabannya." };
const BENDA: Record<Rupa, string> = { benda: "barang", diagram: "kotak", lambang: "kartu" };
const TANYA_SEDOTAN = { bilangan: "Berapa semuanya?", ikat: "Berapa ikat yang dipakai?", lepas: "Berapa sedotan lepas yang dipakai?" } as const;

export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  const akhir = AKHIR[cara];
  const b = BENDA[rupa];
  switch (l.tipe) {
    case "ikat": {
      const tanya = l.tanya === "bilangan" ? "Berapa semuanya?" : "Berapa satuannya?";
      if (rupa === "lambang") return `Baca kartunya: sepuluh diikat, sisanya satuan. ${tanya} ${akhir}`;
      if (cara === "kanvas") return `Lingkari satu baris berisi sepuluh ${b}, itu satu ikat. ${tanya} ${akhir}`;
      return `Ketuk ${b} satu per satu untuk dikumpulkan. Sepuluh diikat karet, sisanya pindahkan ke baki satuan. ${tanya} ${akhir}`;
    }
    case "balok": {
      const tanya = l.tanya === "bilangan" ? "Berapa semuanya?" : l.tanya === "puluhan" ? "Berapa puluhannya?" : "Berapa satuannya?";
      if (rupa === "lambang") return `Baca puluhan dan satuannya. ${tanya} ${akhir}`;
      if (cara === "kanvas") return `Beri satu tanda pada tiap balok dan tiap kubus. Balok bernilai sepuluh. ${tanya} ${akhir}`;
      return `Ketuk balok sepuluh dulu, lalu ketuk tiap kubus sambil hitung lanjut. ${tanya} ${akhir}`;
    }
    case "tabel": {
      if (l.tanya === "tempat") {
        if (cara === "kanvas") return `Lihat yang ditandai kuning. Ada di tempat puluhan atau satuan? Lingkari katanya.`;
        return `Lihat yang ditandai kuning. Ada di tempat puluhan atau satuan? Pilih katanya.`;
      }
      const tanya = `Berapa ${l.tanya}nya?`;
      if (rupa === "lambang") return `Baca angka kiri sebagai puluhan, angka kanan sebagai satuan. ${tanya} ${akhir}`;
      if (cara === "kanvas") return `Lingkari kolom ${l.tanya}. ${tanya} ${akhir}`;
      return `Ketuk satu, lalu ketuk kolomnya: puluhan atau satuan. ${tanya} ${akhir}`;
    }
    case "sedotan": {
      const tanya = TANYA_SEDOTAN[l.tanya];
      if (rupa === "lambang") return `Satu ikat sedotan isinya sepuluh. ${tanya} ${akhir}`;
      if (l.tanya === "bilangan")
        return cara === "kanvas"
          ? `Tiap ikat isinya sepuluh. Beri satu tanda pada tiap sedotan lepas sambil hitung lanjut. ${tanya} ${akhir}`
          : `Ketuk ikatan dulu, lalu tiap sedotan lepas sambil hitung lanjut. ${tanya} ${akhir}`;
      return `Buat ${kata(l.n)} sendiri: pindahkan ikatan dan sedotan lepas dari gudang ke baki. ${tanya} ${akhir}`;
    }
    case "cari":
      return `Cari kesalahan. ${l.tokoh} sudah menjawab. Benar atau salah? Lalu pilih alasan yang benar.`;
  }
}

/* ------------------------------ Simulasi Meja Kemas ------------------------------ */
export type BarangSim = { id: string; nama: string; jenis: string; total: number };
export type KeadaanKemas = {
  alat: "kemas";
  /** Barang yang sedang dikemas. */
  pilih: string;
  /** Banyak ikatan karet (puluhan) per barang. */
  ikat: Record<string, number>;
  /** Barang yang sedang dikumpulkan untuk ikatan berikutnya (nol sampai sepuluh) per barang. */
  kumpul: Record<string, number>;
  /** Angka yang dipasang di tabel puluhan dan satuan per barang. */
  puluhan: Record<string, number | null>;
  satuan: Record<string, number | null>;
  /** Barang yang ikatannya pernah dilepas. */
  lepas: string[];
  /** Papan kalimat puluhan dan satuan menyala. */
  kalimat: boolean;
};
const rekam = <T,>(bs: readonly BarangSim[], v: T): Record<string, T> => Object.fromEntries(bs.map((x) => [x.id, v]));
export const awalKemas = (bs: readonly BarangSim[]): KeadaanKemas => ({
  alat: "kemas",
  pilih: bs[0].id,
  ikat: rekam(bs, 0),
  kumpul: rekam(bs, 0),
  puluhan: rekam<number | null>(bs, null),
  satuan: rekam<number | null>(bs, null),
  lepas: [],
  kalimat: false,
});
const totalDari = (bs: readonly BarangSim[], id: string): number => bs.find((x) => x.id === id)?.total ?? 0;
export const pilihBarang = (k: KeadaanKemas, id: string): KeadaanKemas => ({ ...k, pilih: id });
/** Barang lepas di meja (belum diikat dan belum dikumpulkan). */
export const lepasDiMeja = (k: KeadaanKemas, bs: readonly BarangSim[], id = k.pilih): number => totalDari(bs, id) - k.ikat[id] * 10 - k.kumpul[id];
/** Ambil satu barang dari meja ke kumpulan (paling banyak sepuluh). */
export function kumpulSatu(k: KeadaanKemas, bs: readonly BarangSim[]): KeadaanKemas {
  const id = k.pilih;
  if (lepasDiMeja(k, bs) <= 0 || k.kumpul[id] >= 10) return k;
  return { ...k, kumpul: { ...k.kumpul, [id]: k.kumpul[id] + 1 } };
}
/** Kembalikan satu barang dari kumpulan ke meja. */
export function kembalikanSatu(k: KeadaanKemas): KeadaanKemas {
  const id = k.pilih;
  if (k.kumpul[id] <= 0) return k;
  return { ...k, kumpul: { ...k.kumpul, [id]: k.kumpul[id] - 1 } };
}
/** Ikat kumpulan dengan karet: hanya bila tepat sepuluh. */
export function ikatKaret(k: KeadaanKemas): KeadaanKemas {
  const id = k.pilih;
  if (k.kumpul[id] !== 10) return k;
  return { ...k, ikat: { ...k.ikat, [id]: k.ikat[id] + 1 }, kumpul: { ...k.kumpul, [id]: 0 } };
}
/** Lepas satu ikatan: sepuluh barang kembali lepas di meja. */
export function lepasIkat(k: KeadaanKemas): KeadaanKemas {
  const id = k.pilih;
  if (k.ikat[id] <= 0) return k;
  return { ...k, ikat: { ...k.ikat, [id]: k.ikat[id] - 1 }, lepas: k.lepas.includes(id) ? k.lepas : [...k.lepas, id] };
}
/** Geser angka di tabel: puluhan nol sampai dua, satuan nol sampai sembilan. Mulai dari nol. */
export function geserTabel(k: KeadaanKemas, kolom: Tempat2, d: 1 | -1): KeadaanKemas {
  const id = k.pilih;
  const kini = k[kolom][id];
  const maks = kolom === "puluhan" ? 2 : 9;
  const n = kini === null ? 0 : Math.min(maks, Math.max(0, kini + d));
  return { ...k, [kolom]: { ...k[kolom], [id]: n } };
}
export const nyalakanKalimat = (k: KeadaanKemas): KeadaanKemas => ({ ...k, kalimat: !k.kalimat });
/** Semua sepuluhan sudah diikat (tidak bisa diikat lagi). */
export const sudahRapi = (k: KeadaanKemas, bs: readonly BarangSim[], id = k.pilih): boolean => k.ikat[id] === puluhanDari(totalDari(bs, id));
/** Rapi dan tabelnya tepat. */
export const tabelTepat = (k: KeadaanKemas, bs: readonly BarangSim[], id = k.pilih): boolean =>
  sudahRapi(k, bs, id) && k.puluhan[id] === puluhanDari(totalDari(bs, id)) && k.satuan[id] === satuanDari(totalDari(bs, id));
export const banyakTepat = (k: KeadaanKemas, bs: readonly BarangSim[]): number => bs.filter((x) => tabelTepat(k, bs, x.id)).length;

/** Kalimat keadaan untuk suara (tanpa digit). */
export function kalimatKemas(k: KeadaanKemas, bs: readonly BarangSim[]): string {
  const x = bs.find((y) => y.id === k.pilih) ?? bs[0];
  const ik = k.ikat[x.id];
  const kp = k.kumpul[x.id];
  const lp = lepasDiMeja(k, bs);
  const a = ik === 0 ? "Belum ada ikatan." : `Ada ${kata(ik)} ikat.`;
  const b = kp === 0 ? "" : kp === 10 ? " Kumpulan sudah sepuluh, siap diikat." : ` Terkumpul ${kata(kp)}.`;
  const c = lp === 0 ? " Meja kosong." : ` Lepas di meja ${kata(lp)}.`;
  return `${x.nama.charAt(0).toUpperCase()}${x.nama.slice(1)}. ${a}${b}${c}`;
}
