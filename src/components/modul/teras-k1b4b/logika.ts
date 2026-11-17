/**
 * Logika murni Kelas 1 Bab 4 Sub-Bab B "Teras Penuh Barang" (mengelompokkan benda menurut satu aturan), lanjutan cerita Festival Mainan Kardus,
 * untuk tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract. Tanpa React dan tanpa jaringan, diuji di Node:
 * scripts/uji-teras-k1b4b.mjs. Tempel label, kata bilangan, dan cara menjawab memakai ulang Kelas 1 Bab 1 Sub-Bab A.
 */
import { kata } from "../lemari-k1b1a/logika";
import type { Cara } from "../lemari-k1b1a/logika";

export { acak, cocok, cocokKelompok, kata, kelompokLabel, labelDari, IKON_CARA, NAMA_CARA, URUT_CARA, type Cara, type Label, type Tempat } from "../lemari-k1b1a/logika";

export type Metode = "igil" | "pilah" | "tebak" | "beda";
export const URUT_METODE: Metode[] = ["igil", "pilah", "tebak", "beda"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: pilih aturan, periksa, taruh, beri nama, hitung",
  pilah: "Attribute Sort: pilah ciri",
  tebak: "Guess My Rule: tebak aturan",
  beda: "Odd One Out: cari yang beda",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F9FA}", pilah: "\u{1F3F7}\u{FE0F}", tebak: "\u{1F914}", beda: "\u{1F50D}" };

export type Rupa = "benda" | "diagram" | "lambang";

/* ------------------------------ Ciri barang ------------------------------ */
export type Aturan = "bentuk" | "warna" | "ukuran";
export const URUT_ATURAN: Aturan[] = ["bentuk", "warna", "ukuran"];
export type Bentuk = "lengkung" | "segitiga" | "segiempat";
export type Warna = "merah" | "biru" | "kuning";
export type Ukuran = "besar" | "kecil";
/** Satu barang (potongan bahan): tiga ciri. */
export type Benda = { bentuk: Bentuk; warna: Warna; ukuran: Ukuran };

/** Nilai tiap aturan = nama keranjangnya, berurutan. */
export const NILAI: Record<Aturan, string[]> = {
  bentuk: ["lengkung", "segitiga", "segiempat"],
  warna: ["merah", "biru", "kuning"],
  ukuran: ["besar", "kecil"],
};
/** Nama keranjang untuk layar dan suara. */
export const NAMA_NILAI: Record<string, string> = { lengkung: "lengkung", segitiga: "segitiga", segiempat: "segi empat", merah: "merah", biru: "biru", kuning: "kuning", besar: "besar", kecil: "kecil" };
export const nilai = (b: Benda, a: Aturan): string => b[a];

/** Kode tiga huruf: bentuk (L lengkung, S segitiga, E segi empat), warna (m merah, b biru, k kuning), ukuran (+ besar, - kecil). */
export function bd(kode: string): Benda {
  const bentuk: Bentuk = kode[0] === "L" ? "lengkung" : kode[0] === "S" ? "segitiga" : "segiempat";
  const warna: Warna = kode[1] === "m" ? "merah" : kode[1] === "b" ? "biru" : "kuning";
  return { bentuk, warna, ukuran: kode[2] === "+" ? "besar" : "kecil" };
}
export const bds = (...k: string[]): Benda[] => k.map(bd);

/** Kartu kata (Abstract): dua baris, nama bentuk lalu warna dan ukuran. */
export const kartuKata = (b: Benda): [string, string] => [NAMA_NILAI[b.bentuk], `${b.warna} ${b.ukuran}`];
export const kalimatBenda = (b: Benda): string => `${NAMA_NILAI[b.bentuk]} ${b.warna} ${b.ukuran}`;

/* ------------------------------ Langkah soal ------------------------------ */
export type Langkah =
  /** Metode IGIL: pilah semua barang ke keranjang menurut satu aturan, lalu jawab isi keranjang `tanya` (boleh nol). */
  | { tipe: "pilah"; aturan: Aturan; isi: Benda[]; tanya: string; klaim?: Klaim }
  /** Attribute Sort: barang sudah terpilah menurut `dari`; aturan diganti `ke`. Ketuk barang yang pindah ke keranjang `tanya`. */
  | { tipe: "ganti"; dari: Aturan; ke: Aturan; isi: Benda[]; tanya: string }
  /** Guess My Rule: keranjang kiri berisi barang bernilai `kiri` menurut aturan rahasia, kanan sisanya. Pilih kartu aturan; suara lalu jawab isi satu keranjang. */
  | { tipe: "tebak"; aturan: Aturan; kiri: Benda[]; kanan: Benda[]; tanya?: "kiri" | "kanan" }
  /** Odd One Out: semua sama pada satu ciri kecuali satu. Ketuk yang beda, lalu jawab banyak barang yang sama. */
  | { tipe: "beda"; isi: Benda[] };

/** Soal "Cari kesalahan": tokoh sudah menyebut isi keranjang; `alasan` menjelaskan kesalahan (atau kebenaran) jawabannya. */
export type Klaim = { tokoh: "Igil" | "Kaka" | "Abang" | "Mamah"; angka: number; alasan: string };
export const klaimBenar = (l: Extract<Langkah, { tipe: "pilah" }>): boolean => l.klaim !== undefined && l.klaim.angka === kunciLangkah(l);

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

/** Indeks barang yang masuk keranjang `v` menurut aturan `a`. */
export const isiKeranjang = (isi: readonly Benda[], a: Aturan, v: string): number[] => isi.map((b, i) => (nilai(b, a) === v ? i : -1)).filter((i) => i >= 0);

/** Aturan yang cocok dengan isi dua keranjang: semua kiri bernilai sama, dan tidak ada kanan bernilai itu. */
export function aturanCocok(kiri: readonly Benda[], kanan: readonly Benda[]): Aturan[] {
  return URUT_ATURAN.filter((a) => {
    const v = nilai(kiri[0], a);
    return kiri.every((b) => nilai(b, a) === v) && kanan.every((b) => nilai(b, a) !== v);
  });
}
/** Nilai keranjang kiri menurut aturan rahasia. */
export const nilaiKiri = (l: Extract<Langkah, { tipe: "tebak" }>): string => nilai(l.kiri[0], l.aturan);

/** Calon "yang beda": barang yang satu-satunya berbeda pada satu ciri, sementara yang lain sama pada ciri itu. */
export function calonBeda(isi: readonly Benda[]): { indeks: number; ciri: Aturan }[] {
  const out: { indeks: number; ciri: Aturan }[] = [];
  for (const a of URUT_ATURAN) {
    isi.forEach((b, i) => {
      const lain = isi.filter((_, j) => j !== i);
      const v = nilai(lain[0], a);
      if (lain.every((x) => nilai(x, a) === v) && nilai(b, a) !== v) out.push({ indeks: i, ciri: a });
    });
  }
  return out;
}
export const yangBeda = (l: Extract<Langkah, { tipe: "beda" }>): { indeks: number; ciri: Aturan } => calonBeda(l.isi)[0];

/** Kunci tiap langkah, dihitung dari datanya. Null untuk tebak aturan tanpa pertanyaan isi. */
export function kunciLangkah(l: Langkah): number | null {
  switch (l.tipe) {
    case "pilah":
      return isiKeranjang(l.isi, l.aturan, l.tanya).length;
    case "ganti":
      return isiKeranjang(l.isi, l.ke, l.tanya).length;
    case "tebak":
      return l.tanya ? (l.tanya === "kiri" ? l.kiri : l.kanan).length : null;
    case "beda":
      return l.isi.length - 1;
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
const benda = (r: Rupa) => (r === "benda" ? "barang" : r === "diagram" ? "bangun" : "kartu");
const akhir = (cara: Cara, apa: string) => (cara === "klik" ? `Lalu pilih ${apa}.` : cara === "kanvas" ? `Lalu tulis ${apa} di kanvas.` : `Lalu ucapkan ${apa}.`);

export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  if (l.tipe === "pilah" && l.klaim) return `Cari kesalahan. ${l.klaim.tokoh} bilang, isi keranjang ${NAMA_NILAI[l.tanya]} ada ${kata(l.klaim.angka)}. Benar atau salah? Periksa dulu dengan memilah.`;
  switch (l.tipe) {
    case "pilah": {
      const isi = akhir(cara, `isi keranjang ${NAMA_NILAI[l.tanya]}`);
      if (cara === "kanvas") return `Aturannya ${l.aturan}. Lingkari semua ${benda(rupa)} untuk keranjang ${NAMA_NILAI[l.tanya]}. ${isi}`;
      return `Aturannya ${l.aturan}. Ketuk keranjang, lalu ketuk ${benda(rupa)} yang cocok, sampai semua tertaruh. ${isi}`;
    }
    case "ganti": {
      const isi = akhir(cara, "banyaknya");
      const awal = `${kapital(benda(rupa))} sudah dipilah menurut ${l.dari}. Aturan diganti menjadi ${l.ke}.`;
      if (cara === "kanvas") return `${awal} Lingkari ${benda(rupa)} untuk keranjang ${NAMA_NILAI[l.tanya]}. ${isi}`;
      return `${awal} Ketuk ${benda(rupa)} yang pindah ke keranjang ${NAMA_NILAI[l.tanya]}. ${isi}`;
    }
    case "tebak": {
      const awal = `${kapital(benda(rupa))} dipilah dengan aturan rahasia. Lihat isi kedua keranjang,`;
      if (cara === "kanvas") return `${awal} lalu lingkari kartu aturannya.`;
      if (l.tanya) return `${awal} lalu ketuk kartu aturannya. ${akhir(cara, `isi keranjang ${l.tanya}`)}`;
      return `${awal} lalu ketuk kartu aturannya.`;
    }
    case "beda": {
      const isi = akhir(cara, `banyak ${benda(rupa)} yang sama`);
      if (cara === "kanvas") return `Semua ${benda(rupa)} sama, kecuali satu. Lingkari yang beda. ${isi}`;
      return `Semua ${benda(rupa)} sama, kecuali satu. Ketuk yang beda. ${isi}`;
    }
  }
}
const kapital = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

/** Petunjuk saat kartu aturan yang dipilih salah (tanpa digit). */
export function petunjukTebak(l: Extract<Langkah, { tipe: "tebak" }>, a: Aturan): string {
  const kiri = [...new Set(l.kiri.map((b) => NAMA_NILAI[nilai(b, a)]))];
  if (kiri.length > 1) return `Di keranjang kiri ada ${kiri[0]} dan ada ${kiri[1]}. Jadi aturannya bukan ${a}.`;
  return `Di keranjang kanan juga ada yang ${kiri[0]}. Jadi aturannya bukan ${a}.`;
}

/* ------------------------------ Simulasi Rak Teras ------------------------------ */
export type KeadaanTeras = {
  alat: "teras";
  aturan: Aturan;
  /** Barang yang diketuk, atau null. */
  terpilih: number | null;
  barang: Benda[];
  /** Aturan yang sudah dilihat selagi satu barang terpilih (untuk melihat barang itu pindah keranjang). */
  ikut: Aturan[];
};
export const awalTeras = (barang: readonly Benda[]): KeadaanTeras => ({ alat: "teras", aturan: "bentuk", terpilih: null, barang: barang.map((b) => ({ ...b })), ikut: [] });
export const gantiAturan = (k: KeadaanTeras, a: Aturan): KeadaanTeras => ({ ...k, aturan: a, ikut: k.terpilih === null || k.ikut.includes(a) ? k.ikut : [...k.ikut, a] });
export const pilihBarang = (k: KeadaanTeras, i: number | null): KeadaanTeras => ({ ...k, terpilih: i, ikut: i === null ? [] : i === k.terpilih ? k.ikut : [k.aturan] });
const URUT_WARNA: Warna[] = ["merah", "biru", "kuning"];
/** Cat barang terpilih dengan warna berikutnya (merah, biru, kuning, lalu merah lagi). */
export function catBarang(k: KeadaanTeras): KeadaanTeras {
  if (k.terpilih === null) return k;
  const i = k.terpilih;
  const b = k.barang[i];
  const warna = URUT_WARNA[(URUT_WARNA.indexOf(b.warna) + 1) % URUT_WARNA.length];
  return { ...k, barang: k.barang.map((x, j) => (j === i ? { ...x, warna } : x)) };
}
/** Ganti ukuran barang terpilih (besar menjadi kecil, kecil menjadi besar). */
export function ubahUkuran(k: KeadaanTeras): KeadaanTeras {
  if (k.terpilih === null) return k;
  const i = k.terpilih;
  return { ...k, barang: k.barang.map((x, j) => (j === i ? { ...x, ukuran: x.ukuran === "besar" ? "kecil" : "besar" } : x)) };
}
/** Isi tiap keranjang menurut aturan yang sedang dipakai. */
export const keranjangTeras = (k: KeadaanTeras): { nama: string; isi: number[] }[] => NILAI[k.aturan].map((v) => ({ nama: v, isi: isiKeranjang(k.barang, k.aturan, v) }));

/** Kalimat keadaan untuk suara (tanpa digit). */
export function kalimatTeras(k: KeadaanTeras): string {
  const isi = keranjangTeras(k).map((x) => `${NAMA_NILAI[x.nama]} ${kata(x.isi.length)}`).join(", ");
  const semua = `Semuanya ${kata(k.barang.length)}.`;
  return `Aturan ${k.aturan}. Isi keranjang: ${isi}. ${semua}`;
}
/** Kalimat satu barang: ketiga cirinya dan keranjangnya sekarang. */
export function kalimatBarang(k: KeadaanTeras, i: number): string {
  const b = k.barang[i];
  return `Barang ini ${kalimatBenda(b)}. Menurut aturan ${k.aturan}, ia masuk keranjang ${NAMA_NILAI[nilai(b, k.aturan)]}.`;
}
