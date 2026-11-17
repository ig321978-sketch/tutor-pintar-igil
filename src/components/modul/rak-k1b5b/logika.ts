/**
 * Logika murni Kelas 1 Bab 5 Sub-Bab B "Rak Akuarium Bernomor" (menghitung maju dan mundur, sebelum, sesudah, di antara, nomor yang hilang,
 * kisi satu sampai dua puluh), lanjutan cerita Akuarium Ikan Hias Abang, untuk tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial,
 * dan Abstract. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-rak-k1b5b.mjs. Kata bilangan memakai ulang Sub-Bab A.
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { kata } from "../ikan-k1b5a/logika";

export { acak, cocok, cocokKelompok, kelompokLabel, labelDari, IKON_CARA, NAMA_CARA, URUT_CARA, type Cara, type Label, type Tempat } from "../lemari-k1b1a/logika";
export { kata, kataSepuluh } from "../ikan-k1b5a/logika";

export type Metode = "igil" | "lompat" | "kisi" | "tetangga";
export const URUT_METODE: Metode[] = ["igil", "lompat", "kisi", "tetangga"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: hitung maju dan mundur satu-satu",
  lompat: "Number Line Hop: lompat di garis bilangan",
  kisi: "Number Grid: kisi bilangan",
  tetangga: "Before and After: sebelum dan sesudah",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F463}", lompat: "\u{1F998}", kisi: "\u{1F522}", tetangga: "\u{1F91D}" };

export type Rupa = "benda" | "diagram" | "lambang";
export type Arah = "maju" | "mundur";
/** Letak kotak penunjuk terhadap kotak kosong di kisi. */
export type Petunjuk = "atas" | "bawah" | "kiri" | "kanan";
export type Tanya = "sebelum" | "sesudah" | "antara";

/* ------------------------------ Langkah soal ------------------------------ */
export type Langkah =
  /** Metode IGIL: deret nomor dari `dari` ke `ke`, diketuk berurutan satu-satu. Jawab arahnya (maju atau mundur) atau nomor yang labelnya hilang. */
  | { tipe: "urut"; dari: number; ke: number; jawab: "arah" | "hilang"; hilang: number | null; jenis: string }
  /** Number Line Hop: mulai di `dari`, lompat satu-satu sebanyak `langkah` ke arah maju atau mundur. Jawab tempat mendarat. */
  | { tipe: "lompat"; dari: number; langkah: number; arah: Arah; jenis: string }
  /** Number Grid: kisi dua baris (satu sampai sepuluh, sebelas sampai dua puluh) dengan satu kotak kosong; satu tetangga ditandai. */
  | { tipe: "kisi"; kosong: number; petunjuk: Petunjuk; jenis: string }
  /** Before and After: bilangan sebelum, sesudah, atau di antara. */
  | { tipe: "tetangga"; n: number; tanya: Tanya; jenis: string }
  /** Cari kesalahan: seorang tokoh sudah menjawab dengan salah paham. Anak menentukan benar atau salah, lalu memilih alasan yang benar. */
  | CariSalah;

export type Tokoh = "Igil" | "Kaka" | "Abang";
export type AlasanCari = { teks: string; tunjuk: string };
export type CariSalah = {
  tipe: "cari";
  tokoh: Tokoh;
  /** Cerita singkat dan pertanyaannya (boleh berisi angka; suaranya dibacakan dengan kata). */
  kisah: string;
  /** Jawaban tokoh yang salah paham. */
  klaim: string;
  klaimAngka: number;
  /** Jawaban yang benar. */
  kunci: number;
  /** Tiga alasan; yang benar ada di indeks `benar` (tunjuknya tidak dipakai). */
  alasan: [AlasanCari, AlasanCari, AlasanCari];
  benar: 0 | 1 | 2;
  /** Petunjuk bila anak mengira tokoh sudah benar. */
  tunjuk: string;
  /** Kotak yang digambar (null = tanda tanya) dan kotak yang menyala (-1 = tidak ada). Kosong untuk rupa lambang. */
  visual: (number | null)[];
  nyala: number;
  jenis: string;
};

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

/** Arah deret dari ujung awal ke ujung akhir. */
export const arahDeret = (dari: number, ke: number): Arah => (ke >= dari ? "maju" : "mundur");
/** Isi deret dari `dari` ke `ke`, satu-satu. */
export const deret = (dari: number, ke: number): number[] => {
  const d = ke >= dari ? 1 : -1;
  return Array.from({ length: Math.abs(ke - dari) + 1 }, (_, i) => dari + i * d);
};
/** Tempat mendarat setelah lompat. */
export const akhirLompat = (l: { dari: number; langkah: number; arah: Arah }): number => l.dari + (l.arah === "maju" ? l.langkah : -l.langkah);
/** Kotak penunjuk di kisi (bilangan yang ditandai di samping kotak kosong). */
export function kotakPetunjuk(kosong: number, p: Petunjuk): number {
  switch (p) {
    case "atas":
      return kosong - 10;
    case "bawah":
      return kosong + 10;
    case "kiri":
      return kosong - 1;
    case "kanan":
      return kosong + 1;
  }
}
/** Isi tiga kotak soal tetangga (kiri, tengah, kanan); null = kotak kosong. */
export function tetanggaDari(l: { n: number; tanya: Tanya }): [number | null, number | null, number | null] {
  return l.tanya === "antara" ? [l.n - 1, null, l.n + 1] : [null, l.n, null];
}
/** Indeks kotak yang benar (nol kiri, satu tengah, dua kanan). */
export const kotakTetangga = (t: Tanya): number => (t === "sebelum" ? 0 : t === "sesudah" ? 2 : 1);

/** Kunci tiap langkah, dihitung dari datanya. Null untuk memilih arah (maju atau mundur). */
export function kunciLangkah(l: Langkah): number | null {
  switch (l.tipe) {
    case "cari":
      return l.kunci;
    case "urut":
      return l.jawab === "arah" ? null : l.hilang;
    case "lompat":
      return akhirLompat(l);
    case "kisi":
      return l.kosong;
    case "tetangga":
      return l.tanya === "sebelum" ? l.n - 1 : l.tanya === "sesudah" ? l.n + 1 : l.n;
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

/** Lompatan berikutnya yang benar dari posisi sekarang. */
export const lompatBerikut = (pos: number, arah: Arah): number => pos + (arah === "maju" ? 1 : -1);
/** Rentang garis atau rak yang ditampilkan untuk soal lompat (satu nomor tambahan di tiap ujung, nol sampai dua puluh). */
export function rentangLompat(l: { dari: number; langkah: number; arah: Arah }): [number, number] {
  const a = Math.min(l.dari, akhirLompat(l));
  const b = Math.max(l.dari, akhirLompat(l));
  return [Math.max(0, a - 1), Math.min(20, b + 1)];
}

/* ------------------------------ Instruksi (templat, tanpa digit) ------------------------------ */
const AKHIR: Record<Cara, string> = { klik: "Lalu pilih jawabannya.", kanvas: "Lalu tulis angkanya di kanvas.", suara: "Lalu ucapkan jawabannya." };
const BENDA: Record<Rupa, string> = { benda: "akuarium", diagram: "kotak", lambang: "kartu" };

/** Angka dalam teks dibacakan dengan kata. */
export const ucapAngka = (t: string): string => t.replace(/\d+/g, (d) => kata(Number(d)));

export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  const akhir = AKHIR[cara];
  const b = BENDA[rupa];
  switch (l.tipe) {
    case "cari":
      return `${l.tokoh} sudah menjawab. Baca jawabannya: benar atau salah? Lalu pilih alasan yang tepat.`;
    case "urut":
      if (l.jawab === "arah")
        return cara === "kanvas"
          ? `Baca nomor ${b} dari kiri. Bilangannya makin besar atau makin kecil? Lingkari maju atau mundur.`
          : `Ketuk tiap ${b} berurutan dari kiri sambil membaca nomornya. Lalu pilih: maju atau mundur?`;
      return cara === "kanvas"
        ? `Hitung nomor ${b} satu-satu. Lingkari ${b} yang nomornya hilang. ${akhir}`
        : `Ketuk tiap ${b} berurutan dari kiri sambil menghitung. Nomor berapa yang hilang? ${akhir}`;
    case "lompat":
      if (rupa === "lambang") return `Hitung ${l.arah} ${kata(l.langkah)} langkah dari ${kata(l.dari)}. Mendarat di mana? ${akhir}`;
      return cara === "kanvas"
        ? `Mulai dari ${kata(l.dari)}. Beri satu tanda di tiap tempat mendarat, ${l.arah} ${kata(l.langkah)} langkah. ${akhir}`
        : `Mulai dari ${kata(l.dari)}. Ketuk satu-satu, ${l.arah} ${kata(l.langkah)} langkah. ${akhir}`;
    case "kisi":
      if (rupa === "lambang") return `Di kisi, bawah sama dengan atas tambah sepuluh, kanan tambah satu. Berapa bilangan yang kosong? ${akhir}`;
      return cara === "kanvas" ? `Beri tanda pada ${b} yang nomornya kosong. Lihat tetangganya yang menyala. ${akhir}` : `Ketuk ${b} yang nomornya kosong. Lihat tetangganya yang menyala. ${akhir}`;
    case "tetangga": {
      const apa = l.tanya === "sebelum" ? `sebelum ${kata(l.n)}` : l.tanya === "sesudah" ? `sesudah ${kata(l.n)}` : `di antara ${kata(l.n - 1)} dan ${kata(l.n + 1)}`;
      if (rupa === "lambang") return `Bilangan berapa yang ${apa}? ${akhir}`;
      return cara === "kanvas" ? `Beri tanda pada ${b} untuk bilangan ${apa}. ${akhir}` : `Ketuk ${b} untuk bilangan ${apa}. ${akhir}`;
    }
  }
}

/* ------------------------------ Simulasi Rak Akuarium Bernomor ------------------------------ */
/** Rak ikan cupang: dua tingkat, nomor satu sampai dua puluh. */
export const JUMLAH_RAK = 20;
export type KeadaanRak = {
  alat: "rak";
  /** Nomor akuarium tempat petugas pakan berdiri. */
  posisi: number;
  /** Nomor tempat mulai terakhir yang dipilih. */
  awal: number;
  /** Arah dan panjang langkah berturut-turut yang sedang berjalan. */
  arah: Arah | null;
  beruntun: number;
  /** Langkah berturut-turut terpanjang tiap arah. */
  terbaikMaju: number;
  terbaikMundur: number;
  /** Banyak pemberian pakan tiap akuarium (indeks satu sampai dua puluh). */
  pakan: number[];
  /** Label nomor yang jatuh dan dipasang lagi (nomor akuarium -> nomor pada label). */
  label: Record<string, number | null>;
  tetangga: boolean;
  kisi: boolean;
  /** Banyak pindah turun satu tingkat di kisi (dari baris atas ke baris bawah). */
  turun: number;
};

export const awalRak = (hilang: readonly number[]): KeadaanRak => ({
  alat: "rak",
  posisi: 1,
  awal: 1,
  arah: null,
  beruntun: 0,
  terbaikMaju: 0,
  terbaikMundur: 0,
  pakan: Array.from({ length: JUMLAH_RAK + 1 }, () => 0),
  label: Object.fromEntries(hilang.map((h) => [String(h), null])),
  tetangga: false,
  kisi: false,
  turun: 0,
});

/** Pilih tempat mulai (langkah berturut-turut mulai dari awal). */
export const mulaiDari = (k: KeadaanRak, n: number): KeadaanRak => (n < 1 || n > JUMLAH_RAK ? k : { ...k, posisi: n, awal: n, arah: null, beruntun: 0 });

/** Satu langkah maju atau mundur. Di ujung rak tidak bergerak. */
export function langkah(k: KeadaanRak, arah: Arah): KeadaanRak {
  const n = lompatBerikut(k.posisi, arah);
  if (n < 1 || n > JUMLAH_RAK) return k;
  const beruntun = k.arah === arah ? k.beruntun + 1 : 1;
  return {
    ...k,
    posisi: n,
    arah,
    beruntun,
    terbaikMaju: arah === "maju" ? Math.max(k.terbaikMaju, beruntun) : k.terbaikMaju,
    terbaikMundur: arah === "mundur" ? Math.max(k.terbaikMundur, beruntun) : k.terbaikMundur,
  };
}

/** Pindah satu tingkat di kisi: turun berarti tambah sepuluh, naik berarti kurang sepuluh. */
export function pindahTingkat(k: KeadaanRak): KeadaanRak {
  const n = k.posisi <= 10 ? k.posisi + 10 : k.posisi - 10;
  return { ...k, posisi: n, arah: null, beruntun: 0, turun: k.posisi <= 10 ? k.turun + 1 : k.turun };
}

/** Beri pakan akuarium di posisi sekarang. */
export const beriPakan = (k: KeadaanRak): KeadaanRak => ({ ...k, pakan: k.pakan.map((p, i) => (i === k.posisi ? p + 1 : p)) });
/** Mulai pagi baru: semua pakan dikosongkan. */
export const ulangPakan = (k: KeadaanRak): KeadaanRak => ({ ...k, pakan: k.pakan.map(() => 0) });

export function geserLabel(k: KeadaanRak, nomor: number, d: 1 | -1): KeadaanRak {
  const kunci = String(nomor);
  if (!(kunci in k.label)) return k;
  const kini = k.label[kunci];
  const n = kini === null ? 10 : Math.min(JUMLAH_RAK, Math.max(1, kini + d));
  return { ...k, label: { ...k.label, [kunci]: n } };
}
export const nyalakan = (k: KeadaanRak, apa: "tetangga" | "kisi"): KeadaanRak => ({ ...k, [apa]: !k[apa] });

export const sudahPakan = (k: KeadaanRak): number => k.pakan.slice(1).filter((p) => p > 0).length;
export const pakanDobel = (k: KeadaanRak): number[] => k.pakan.flatMap((p, i) => (i > 0 && p > 1 ? [i] : []));
export const labelTepatRak = (k: KeadaanRak): number => Object.entries(k.label).filter(([n, v]) => Number(n) === v).length;

/** Kalimat keadaan untuk suara (tanpa digit). */
export function kalimatRak(k: KeadaanRak): string {
  const p = k.posisi;
  const kiri = p > 1 ? `Sebelumnya ${kata(p - 1)}` : "Ini ujung kiri";
  const kanan = p < JUMLAH_RAK ? `sesudahnya ${kata(p + 1)}` : "ini ujung kanan";
  const pk = k.pakan[p] === 0 ? "belum diberi pakan" : k.pakan[p] === 1 ? "sudah diberi pakan" : "diberi pakan lebih dari sekali";
  return `Akuarium ${kata(p)}, ${pk}. ${k.tetangga ? `${kiri}, ${kanan}.` : ""}`.trim();
}

