/**
 * Logika murni Kelas 1 Bab 1 Sub-Bab A "Merapikan Lemari Mainan Igil" untuk tahap Mind-map, Infografis, Simulasi,
 * Concrete, Pictorial, dan Abstract. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-lemari-k1b1a.mjs.
 * Satu logika dipakai bersama; tampilan tiap tahap berbeda (pohon, rak, kamar, kartu langkah).
 */

/* ------------------------------ Kata bilangan ------------------------------ */
export const KATA = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh"] as const;
export const kata = (n: number): string => KATA[n] ?? String(n);

/* ------------------------------ Tempel label (Mind-map dan Infografis) ------------------------------ */
/**
 * Tempat kosong yang harus diisi label tertentu. `kelompok` dipakai untuk petunjuk saat salah tempel.
 * `urutan` (1, 2, ...) menandai langkah yang HARUS berurutan: tempat bernomor hanya cocok dengan labelnya sendiri.
 */
export type Tempat = { id: string; kunci: string; kelompok: string; urutan?: number };
/** Label yang bisa ditempel. Label kembar (teks sama) boleh, karena pemeriksaan memakai teks. */
export type Label = { id: string; teks: string };

/** Benarkah label ini cocok untuk tempat ini? Cocok bila teksnya sama dengan kunci tempat. */
export const cocok = (tempat: Tempat, label: Label): boolean => tempat.kunci === label.teks;

/** Kelompok (warna) sebuah label: kelompok tempat yang kuncinya sama dengan teks label. undefined bila tidak ada. */
export const kelompokLabel = (semua: readonly Tempat[], label: Label): string | undefined => semua.find((t) => t.kunci === label.teks)?.kelompok;

/**
 * Cocok per warna: label boleh ditempel di tempat kosong mana pun yang sekelompok (sewarna) dengannya.
 * Pengecualian: tempat bernomor (`urutan`) adalah langkah berurutan, jadi hanya cocok dengan labelnya sendiri.
 */
export const cocokKelompok = (semua: readonly Tempat[], tempat: Tempat, label: Label): boolean =>
  tempat.urutan !== undefined ? tempat.kunci === label.teks : kelompokLabel(semua, label) === tempat.kelompok;

/** Petunjuk saat label salah: sebut kelompok tempat yang benar untuk label itu (bila ada), tanpa membocorkan tempatnya. */
export function petunjukSalah(semua: readonly Tempat[], label: Label, kelompokBenar: Record<string, string>): string {
  const t = semua.find((x) => x.kunci === label.teks);
  return t ? kelompokBenar[t.kelompok] ?? "Coba tempat yang lain." : "Coba tempat yang lain.";
}

/** Pengacak berbenih (mulberry32) supaya urutan label sama tiap kali dibuka dan bisa diuji. */
export function acak<T>(daftar: readonly T[], benih: number): T[] {
  let s = benih >>> 0;
  const r = () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const a = [...daftar];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Label untuk semua tempat (satu label per tempat), diacak. */
export const labelDari = (tempat: readonly Tempat[], benih: number): Label[] => acak(tempat.map((t, i) => ({ id: `lb${i}`, teks: t.kunci })), benih);

/* ------------------------------ Langkah metode (Concrete, Pictorial, Abstract) ------------------------------ */
export type Metode = "igil" | "satu" | "kardinal" | "sekilas";
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: hitung, baca, tulis",
  satu: "One-to-One: satu benda, satu angka",
  kardinal: "Cardinality: angka terakhir adalah banyaknya",
  sekilas: "Subitizing: lihat sekilas",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F9F8}", satu: "\u{1F517}", kardinal: "\u{1F3C1}", sekilas: "\u{1F440}" };
export const URUT_METODE: Metode[] = ["igil", "satu", "kardinal", "sekilas"];

/** Rupa tampilan: benda (Concrete), diagram (Pictorial), lambang (Abstract). */
export type Rupa = "benda" | "diagram" | "lambang";

export type Langkah =
  /** Pisahkan yang sejenis: ketuk benda lalu wadah yang sama jenisnya. */
  | { tipe: "pisah"; jenis: string[]; wadah: string[] }
  /** Tunjuk satu, sebut satu: ketuk tiap benda sekali (angka muncul), lalu pilih banyaknya. Rupa lambang: ketuk kartu angka berurutan. */
  | { tipe: "tunjuk"; n: number; jenis: string; pilihan: number[] }
  /** Pindahkan satu per satu ke wadah sambil menghitung, lalu pilih banyaknya. */
  | { tipe: "pindah"; n: number; jenis: string; wadah: string; pilihan: number[] }
  /** Pasangkan tiap benda dengan satu kartu angka (garis). */
  | { tipe: "pasang"; n: number; jenis: string }
  /** Cari benda yang tersentuh dua kali (`dobel`) atau terlewat (`lewat`) pada hitungan yang sudah ditulis. */
  | { tipe: "dobel"; n: number; jenis: string; salah: number; cara: "dobel" | "lewat" }
  /** Angka terakhir: hitungan berjalan dari `arah`, lalu pilih banyaknya. */
  | { tipe: "terakhir"; n: number; jenis: string; arah: "kiri" | "kanan"; pilihan: number[] }
  /** Lihat sekilas: tampil sebentar lalu ditutup, pilih banyaknya. */
  | { tipe: "sekilas"; n: number; jenis: string; pola: "dadu" | "baris"; pilihan: number[] }
  /** Laci sepuluh kotak: isi kotak satu per satu, lalu pilih banyaknya. */
  | { tipe: "laci"; n: number; jenis: string; pilihan: number[] }
  /** Kotak kosong: ketuk kotak yang banyaknya nol. */
  | { tipe: "nol"; kotak: { jenis: string; n: number }[] }
  /** Tabel data: isi angka banyak tiap baris. */
  | { tipe: "tabel"; baris: { jenis: string; n: number }[] }
  /** Baca dan tulis: lambang ke nama (`ke: "kata"`) atau nama ke lambang (`ke: "lambang"`). */
  | { tipe: "baca"; n: number; ke: "kata" | "lambang"; pilihan: number[] }
  /** Kanvas: lingkari semua benda `target` di antara `benda` dengan satu garis melingkar, lalu tulis banyaknya. */
  | { tipe: "lingkari"; benda: string[]; target: string }
  /** Kanvas: beri tepat satu tanda pada tiap benda (satu benda, satu tanda), lalu tulis banyaknya. */
  | { tipe: "centang"; n: number; jenis: string }
  /** Kanvas: lihat sekilas, lalu gambar titik sebanyak yang dilihat. */
  | { tipe: "titik"; n: number; jenis: string; pola: "dadu" | "baris" }
  /** Kanvas: tarik garis dari tiap benda (atau nama angka) ke satu kartu angka (atau lambangnya). */
  | { tipe: "hubung"; n: number; jenis: string };

/** Cara menjawab: ketuk dan pilih (klik), tulis atau gambar di kanvas, atau ucapkan (rekam suara). */
export type Cara = "klik" | "kanvas" | "suara";
export const URUT_CARA: Cara[] = ["klik", "kanvas", "suara"];
export const NAMA_CARA: Record<Cara, string> = { klik: "Klik", kanvas: "Tulis di kanvas", suara: "Rekam suara" };
export const IKON_CARA: Record<Cara, string> = { klik: "\u{1F446}", kanvas: "\u{270F}\u{FE0F}", suara: "\u{1F3A4}" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
/** Satu kelompok cara (klik, kanvas, atau suara) berisi empat soal, satu untuk tiap metode. */
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

/** Kunci tiap langkah, dihitung dari datanya (bukan disimpan), supaya data dan kunci tidak bisa berbeda. */
export function kunciLangkah(l: Langkah): number | string | number[] {
  switch (l.tipe) {
    case "pisah":
      return l.jenis.length;
    case "tunjuk":
    case "pindah":
    case "terakhir":
    case "sekilas":
    case "laci":
    case "baca":
      return l.n;
    case "pasang":
      return l.n;
    case "dobel":
      return l.salah;
    case "nol":
      return l.kotak.findIndex((k) => k.n === 0);
    case "tabel":
      return l.baris.map((b) => b.n);
    case "lingkari":
      return l.benda.filter((b) => b === l.target).length;
    case "centang":
    case "titik":
    case "hubung":
      return l.n;
  }
}

/**
 * Angka yang dijawab anak (dipilih, ditulis, atau diucapkan), atau null bila jawabannya bukan angka
 * (memisahkan, mencari yang dobel, memasangkan, mengisi tabel, menarik garis, menggambar titik).
 */
export function angkaJawab(l: Langkah): number | null {
  switch (l.tipe) {
    case "tunjuk":
    case "pindah":
    case "terakhir":
    case "sekilas":
    case "laci":
    case "baca":
    case "centang":
      return l.n;
    case "lingkari":
      return kunciLangkah(l) as number;
    case "nol":
      return 0;
    default:
      return null;
  }
}

/** Pilihan ketuk (juga cadangan bila peramban tidak bisa mendengar): pilihan bawaan, atau kunci dengan dua tetangganya. */
export function pilihanDari(l: Langkah): number[] {
  if ("pilihan" in l) return l.pilihan;
  const k = angkaJawab(l) ?? 0;
  return k === 0 ? [0, 1, 2] : k === 10 ? [9, 10, 8] : [k - 1, k, k + 1];
}

/** Pemeriksa jawaban pilihan banyaknya (angka). */
export const benarPilih = (l: Langkah, pilih: number): boolean => {
  const k = kunciLangkah(l);
  return typeof k === "number" && k === pilih;
};

/** Pisah: benda `i` (jenis l.jenis[i]) ditaruh di wadah `w`. Benar bila jenisnya sama. */
export const benarPisah = (l: Extract<Langkah, { tipe: "pisah" }>, i: number, w: number): boolean => l.jenis[i] === l.wadah[w];

/** Pasang: setiap benda tepat satu kartu, setiap kartu tepat satu benda. `pasangan[i]` = nomor kartu (1..n) benda ke-i. */
export function benarPasang(n: number, pasangan: readonly (number | null)[]): boolean {
  if (pasangan.length !== n || pasangan.some((p) => p === null)) return false;
  return new Set(pasangan).size === n && pasangan.every((p) => (p as number) >= 1 && (p as number) <= n);
}

/** Label hitungan yang ditulis pada soal "dobel": daftar angka di atas tiap benda. */
export function labelDobel(l: Extract<Langkah, { tipe: "dobel" }>): number[][] {
  const out: number[][] = [];
  let c = 0;
  for (let i = 0; i < l.n; i += 1) {
    if (l.cara === "lewat" && i === l.salah) {
      out.push([]);
      continue;
    }
    c += 1;
    const a = [c];
    if (l.cara === "dobel" && i === l.salah) {
      c += 1;
      a.push(c);
    }
    out.push(a);
  }
  return out;
}

/** Pemeriksa isi tabel: semua baris terisi angka yang benar. */
export const benarTabel = (l: Extract<Langkah, { tipe: "tabel" }>, isi: readonly (number | null)[]): boolean => l.baris.every((b, i) => isi[i] === b.n);

/** Pola dadu untuk n = 1..6 (kolom, baris dalam kisi 3 x 3); n lain: baris. */
export const POLA_DADU: Record<number, [number, number][]> = {
  1: [[1, 1]],
  2: [[0, 0], [2, 2]],
  3: [[0, 0], [1, 1], [2, 2]],
  4: [[0, 0], [2, 0], [0, 2], [2, 2]],
  5: [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]],
  6: [[0, 0], [0, 1], [0, 2], [2, 0], [2, 1], [2, 2]],
};

/* ------------------------------ Simulasi Kamar Kaka ------------------------------ */
export type MainanSim = { id: string; jenis: string; tempat: string };
export type KeadaanKamar = {
  alat: "kamar";
  mainan: MainanSim[];
  /** Isi tabel catatan Kaka per jenis rak (null = belum diisi). */
  catat: Record<string, number | null>;
  /** Jenis rak yang sudah dihitung dengan tombol Hitung. */
  dihitung: string[];
  /** Jenis rak yang sudah dilihat sekilas. */
  sekilas: string[];
};

/** Banyak mainan jenis `j` yang sudah berada di raknya. */
export const diRak = (k: KeadaanKamar, j: string): number => k.mainan.filter((m) => m.jenis === j && m.tempat === j).length;
export const semuaDiRak = (k: KeadaanKamar): boolean => k.mainan.every((m) => m.tempat === m.jenis);
/** Banyak sebenarnya tiap jenis (semua mainan jenis itu, di mana pun letaknya). */
export const banyakJenis = (k: KeadaanKamar, j: string): number => k.mainan.filter((m) => m.jenis === j).length;
export const catatanBenar = (k: KeadaanKamar, rak: readonly string[]): boolean => semuaDiRak(k) && rak.every((j) => k.catat[j] === banyakJenis(k, j));

/** Pindahkan mainan `id` ke `tempat` (lantai atau jenis rak). Laci sepuluh kotak menolak isi ke-11. */
export function pindahMainan(k: KeadaanKamar, id: string, tempat: string, batas: Record<string, number> = {}): KeadaanKamar {
  const m = k.mainan.find((x) => x.id === id);
  if (!m || m.tempat === tempat) return k;
  const maks = batas[tempat];
  if (maks !== undefined && k.mainan.filter((x) => x.tempat === tempat).length >= maks) return k;
  return { ...k, mainan: k.mainan.map((x) => (x.id === id ? { ...x, tempat } : x)) };
}
