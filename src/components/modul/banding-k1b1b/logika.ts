/**
 * Logika murni Kelas 1 Bab 1 Sub-Bab B "Hadiah Nenek untuk Rak yang Lebih Sedikit" (membandingkan banyak benda)
 * untuk tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract. Tanpa React dan tanpa jaringan,
 * diuji di Node: scripts/uji-banding-k1b1b.mjs. Tempel label dan kata bilangan memakai ulang logika Sub-Bab A.
 */
import { kata } from "../lemari-k1b1a/logika";
import type { Cara } from "../lemari-k1b1a/logika";

export { acak, cocok, cocokKelompok, kata, labelDari, IKON_CARA, NAMA_CARA, URUT_CARA, type Cara, type Label, type Tempat } from "../lemari-k1b1a/logika";

/* ------------------------------ Metode ------------------------------ */
export type Metode = "igil" | "bingkai" | "garis" | "satu";
export const URUT_METODE: Metode[] = ["igil", "bingkai", "garis", "satu"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: pasangkan dan bandingkan",
  bingkai: "Ten Frame: bingkai sepuluh",
  garis: "Number Line: garis bilangan",
  satu: "One More, One Less: satu lebih, satu sedikit",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F517}", bingkai: "\u{1F51F}", garis: "\u{1F4CF}", satu: "\u{261D}\u{FE0F}" };

/** Rupa tampilan: benda (Concrete), diagram (Pictorial), lambang (Abstract). */
export type Rupa = "benda" | "diagram" | "lambang";

/* ------------------------------ Kata banding ------------------------------ */
export type KataBanding = "lebih banyak" | "lebih sedikit" | "sama banyak";
export const KATA_BANDING: KataBanding[] = ["lebih banyak", "lebih sedikit", "sama banyak"];
/** Hubungan a terhadap b dalam kata. */
export const kataBanding = (a: number, b: number): KataBanding => (a > b ? "lebih banyak" : a < b ? "lebih sedikit" : "sama banyak");

/* ------------------------------ Langkah CPA ------------------------------ */
/**
 * Pertanyaan setelah kegiatan: `kata` (pilih kata banding a terhadap b, tanpa angka), `banyak`/`sedikit` (banyak kelompok yang
 * lebih banyak atau lebih sedikit), `sama` (banyak tiap kelompok yang sama banyak), `sisa` (banyak yang tidak punya pasangan),
 * `tandai` (kanvas: garis pasangan saja, yang bersisa ditandai, tanpa angka).
 */
export type Tanya = "kata" | "banyak" | "sedikit" | "sama" | "sisa" | "tandai";

export type Langkah =
  /** Pasangkan satu-satu dua barisan a (atas) dan b (bawah). `renggang`: barisan atas renggang dan panjang. */
  | { tipe: "pasang"; a: number; b: number; ja: string; jb: string; renggang?: boolean; tanya: Tanya }
  /** Dua bingkai sepuluh: a dan b. */
  | { tipe: "bingkai"; a: number; b: number; ja: string; jb: string; tanya: "banyak" | "sedikit" }
  /** Garis (ubin, garis bilangan, atau deret angka): a dan b berdiri di angkanya. */
  | { tipe: "garis"; a: number; b: number; ja: string; jb: string; tanya: "banyak" | "sedikit" }
  /** Satu lebih banyak (`lebih`) atau satu lebih sedikit (`sedikit`) dari a. */
  | { tipe: "satu"; a: number; arah: "lebih" | "sedikit"; ja: string };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
/** Satu kelompok cara berisi empat soal, satu untuk tiap metode. */
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

/** Kunci tiap langkah, dihitung dari datanya. Kata banding untuk tanya `kata`, null untuk `tandai`. */
export function kunciLangkah(l: Langkah): number | KataBanding | null {
  if (l.tipe === "satu") return l.arah === "lebih" ? l.a + 1 : l.a - 1;
  if (l.tipe === "pasang") {
    if (l.tanya === "kata") return kataBanding(l.a, l.b);
    if (l.tanya === "tandai") return null;
    if (l.tanya === "sisa") return Math.abs(l.a - l.b);
    if (l.tanya === "sama") return l.a;
  }
  return l.tanya === "banyak" ? Math.max(l.a, l.b) : Math.min(l.a, l.b);
}

/** Angka yang dijawab anak (dipilih, ditulis, atau diucapkan), atau null bila jawabannya bukan angka. */
export const angkaJawab = (l: Langkah): number | null => {
  const k = kunciLangkah(l);
  return typeof k === "number" ? k : null;
};

/** Pilihan ketuk angka: kedua banyak kelompok dan satu tetangga, atau kunci dengan tetangganya; urut naik, tanpa kembar. */
export function pilihanDari(l: Langkah): number[] {
  const k = angkaJawab(l) ?? 0;
  const calon = l.tipe === "satu" ? [l.a - 1, l.a, l.a + 1] : l.tipe === "pasang" && (l.tanya === "sisa" || l.tanya === "sama") ? [k - 1, k, k + 1] : [l.a, l.b, k === 10 ? 9 : k + 1];
  const ada = [...new Set(calon.map((n) => Math.max(0, Math.min(10, n))))];
  for (let n = 0; ada.length < 3 && n <= 10; n += 1) if (!ada.includes(n)) ada.push(n);
  return ada.sort((p, q) => p - q);
}

/* ------------------------------ Instruksi (templat, tanpa digit) ------------------------------ */
const NAMA_BENDA: Record<string, string> = {
  robot: "robot",
  mobil: "mobil",
  bola: "bola",
  boneka: "boneka",
  dino: "dinosaurus",
  kelereng: "kelereng",
  yoyo: "yoyo",
  pesawat: "pesawat",
  kereta: "kereta",
  titik: "titik",
  angka: "angka",
};
export const namaBenda = (j: string): string => NAMA_BENDA[j] ?? j;
const AKHIR: Record<Cara, string> = { klik: "Lalu pilih jawabannya.", kanvas: "Lalu tulis angkanya di kanvas.", suara: "Lalu ucapkan jawabannya." };
const kataTanya = (t: "banyak" | "sedikit") => (t === "banyak" ? "lebih banyak" : "lebih sedikit");

/** Instruksi singkat (layar dan suara) dari jenis langkah, rupa, dan cara. Tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  const akhir = AKHIR[cara];
  switch (l.tipe) {
    case "pasang": {
      if (rupa === "lambang") {
        if (l.tanya === "kata") return "Bandingkan angka kiri dengan angka kanan. Pilih kata yang tepat.";
        return `Mana yang ${l.tanya === "banyak" ? "lebih banyak" : "lebih sedikit"}? ${cara === "kanvas" ? "Tulis angkanya di kanvas." : "Ucapkan angkanya."}`;
      }
      const a = namaBenda(l.ja);
      const b = namaBenda(l.jb);
      if (cara === "kanvas") return l.tanya === "sisa" ? "Tarik garis dari tiap titik atas ke satu titik bawah. Lalu tulis banyak yang tidak punya pasangan." : `Tarik garis dari tiap ${a} ke satu ${b}. Yang bersisa akan menyala.`;
      if (cara === "suara") return `Tekan Pasangkan. Lihat yang bersisa. ${l.tanya === "sama" ? "Kalau sama banyak, ucapkan banyaknya." : `Ucapkan banyak yang ${l.tanya === "sedikit" ? "lebih sedikit" : "lebih banyak"}.`}`;
      return l.ja === l.jb ? "Pasangkan satu-satu. Ketuk satu di atas, lalu satu di bawah. Lalu pilih kata yang tepat." : `Pasangkan satu-satu. Ketuk satu ${a}, lalu ketuk satu ${b}. Lalu pilih kata yang tepat.`;
    }
    case "bingkai":
      if (cara === "kanvas") return `Lingkari bingkai yang ${l.tanya === "banyak" ? "lebih penuh" : "lebih kosong"}. ${akhir}`;
      if (rupa === "benda") return `Masukkan tiap mainan ke bingkai sepuluh, satu kotak satu mainan. Mana yang ${kataTanya(l.tanya)}? ${akhir}`;
      if (rupa === "diagram") return `Ketuk tiap titik di kedua bingkai untuk menghitung. Mana yang ${kataTanya(l.tanya)}? ${akhir}`;
      return `Isi bingkai angka sesuai kedua angka. Mana yang ${kataTanya(l.tanya)}? ${akhir}`;
    case "garis":
      if (cara === "kanvas") return `Lingkari yang letaknya lebih ${l.tanya === "banyak" ? "kanan" : "kiri"}. ${akhir}`;
      if (rupa === "lambang") return `Ketuk kedua angka di deret angka. Mana yang ${kataTanya(l.tanya)}? ${akhir}`;
      return `Taruh tiap barisan di angka sesuai banyaknya. Mana yang ${kataTanya(l.tanya)}? ${akhir}`;
    case "satu": {
      const ar = l.arah === "lebih" ? "satu lebih banyak" : "satu lebih sedikit";
      if (rupa === "lambang") return cara === "klik" ? `Berapa ${ar} dari angka ini? Ketuk di deret angka.` : `Berapa ${ar} dari angka ini? ${akhir}`;
      if (cara === "kanvas") return l.arah === "lebih" ? `Gambar satu ${rupa === "benda" ? "bulatan" : "titik"} lagi di kotak kosong. ${akhir}` : `Coret satu ${rupa === "benda" ? namaBenda(l.ja) : "titik"}. ${akhir}`;
      return l.arah === "lebih" ? `Buat ${ar}: ketuk kotak hadiah untuk memberi satu lagi. ${akhir}` : `Buat ${ar}: ketuk satu ${rupa === "benda" ? namaBenda(l.ja) : "titik"} untuk mengambilnya. ${akhir}`;
    }
  }
}

/* ------------------------------ Pemeriksa kegiatan ------------------------------ */
/** Pasangan sah: atas ke-i dengan bawah ke-j, belum dipakai, i < a dan j < b. */
export function bolehPasang(pasangan: readonly [number, number][], i: number, j: number, a: number, b: number): boolean {
  return i >= 0 && i < a && j >= 0 && j < b && !pasangan.some(([p, q]) => p === i || q === j);
}
/** Semua pasangan terbentuk: banyak pasangan = yang lebih sedikit. */
export const pasanganLengkap = (pasangan: readonly unknown[], a: number, b: number): boolean => pasangan.length === Math.min(a, b);
/** Nomor benda yang bersisa (tanpa pasangan) di barisan yang lebih banyak. */
export const sisaPasangan = (a: number, b: number): { baris: "atas" | "bawah" | null; nomor: number[] } =>
  a === b ? { baris: null, nomor: [] } : { baris: a > b ? "atas" : "bawah", nomor: Array.from({ length: Math.abs(a - b) }, (_, i) => Math.min(a, b) + i) };

/** Sel bingkai sepuluh ke-i: kolom dan baris (baris atas dulu). */
export const selBingkai = (i: number): { kol: number; baris: number } => ({ kol: i % 5, baris: Math.floor(i / 5) });

/* ------------------------------ Simulasi Gudang Hadiah ------------------------------ */
export type TampilGudang = "barisan" | "bingkai" | "garis";
export type KeadaanHadiah = {
  alat: "hadiah";
  /** Banyak robot di rak Igil dan yoyo di rak Kaka. */
  igil: number;
  kaka: number;
  /** Sisa mainan di kotak hadiah Nenek. */
  kotak: number;
  /** Tombol Pasangkan sudah ditekan pada keadaan ini (direset bila banyaknya berubah). */
  dipasang: boolean;
  tampil: TampilGudang;
  /** Hadiah yang sudah keluar dari kotak (pernah dipakai). */
  dipakai: number;
};
export const MAKS_RAK = 10;
export const awalGudang = (igil: number, kaka: number, kotak: number): KeadaanHadiah => ({ alat: "hadiah", igil, kaka, kotak, dipasang: false, tampil: "barisan", dipakai: 0 });

/** Ambil satu hadiah dari kotak ke rak (bila kotak berisi dan rak belum penuh), atau kembalikan satu dari rak ke kotak. */
export function ubahRak(k: KeadaanHadiah, rak: "igil" | "kaka", d: 1 | -1): KeadaanHadiah {
  const n = k[rak];
  if (d === 1 && (k.kotak === 0 || n >= MAKS_RAK)) return k;
  if (d === -1 && n === 0) return k;
  return { ...k, [rak]: n + d, kotak: k.kotak - d, dipasang: false, dipakai: d === 1 ? k.dipakai + 1 : k.dipakai };
}
export const pasangkan = (k: KeadaanHadiah): KeadaanHadiah => ({ ...k, dipasang: true });
export const lihat = (k: KeadaanHadiah, tampil: TampilGudang): KeadaanHadiah => ({ ...k, tampil });

/** Kalimat banding untuk layar dan suara (tanpa digit). */
export function kalimatGudang(k: KeadaanHadiah): string {
  if (k.igil === k.kaka) return `Rak Igil dan rak Kaka sama banyak, masing-masing ${kata(k.igil)}.`;
  const [lebih, kurang] = k.igil > k.kaka ? ["Igil", "Kaka"] : ["Kaka", "Igil"];
  return `Rak ${lebih} lebih banyak. Rak ${kurang} lebih sedikit.`;
}
