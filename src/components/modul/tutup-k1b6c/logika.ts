/**
 * Logika murni Kelas 1 Bab 6 Sub-Bab C "Tutup Pasar Malam" (pengurangan sampai dua puluh), akhir cerita Pasar Malam Kampung,
 * untuk tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract. Tanpa React dan tanpa jaringan,
 * diuji di Node: scripts/uji-tutup-k1b6c.mjs. Kata bilangan memakai ulang Bab 5 Sub-Bab A.
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { kata } from "../ikan-k1b5a/logika";

export { acak, cocok, cocokKelompok, kelompokLabel, labelDari, IKON_CARA, NAMA_CARA, URUT_CARA, type Cara, type Label, type Tempat } from "../lemari-k1b1a/logika";
export { kata, kataSepuluh } from "../ikan-k1b5a/logika";

export type Metode = "igil" | "pikir" | "keluarga" | "lewat";
export const URUT_METODE: Metode[] = ["igil", "pikir", "keluarga", "lewat"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: kurangi satuan, puluhan tetap",
  pikir: "Think Addition: pikir penjumlahan",
  keluarga: "Fact Family: keluarga kalimat",
  lewat: "Subtract Through Ten: kurangi lewat sepuluh",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F51F}", pikir: "\u{1F9E0}", keluarga: "\u{1F46A}", lewat: "\u{1F309}" };

export type Rupa = "benda" | "diagram" | "lambang";

/* ------------------------------ Langkah soal ------------------------------ */
/** Satu pengurangan `a - b`: `a` yang ada mula-mula, `b` yang diambil. Jawabannya sisa `a - b`. */
export type LangkahDasar = { tipe: Metode; a: number; b: number; jenis: string };
/**
 * Cari kesalahan: seorang tokoh sudah menjawab soal `dasar` dengan salah paham yang umum. Anak memutuskan benar atau salah,
 * memilih alasan yang benar dari tiga, lalu menjawab bilangan yang benar.
 */
export type LangkahSalah = { tipe: "salah"; dasar: LangkahDasar; tokoh: string; jawabTokoh: number; kataTokoh: string; alasan: [string, string, string]; benar: number; keliru: string };
export type Langkah = LangkahDasar | LangkahSalah;

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);
export const metodeLangkah = (l: Langkah): Metode => dasarDari(l).tipe;

export const sisa = (l: { a: number; b: number }): number => l.a - l.b;
/** Satuan bilangan belasan. */
export const satuan = (n: number): number => n % 10;
/** Banyak yang dikurangi dari satuan, dan dari sepuluh, pada Kurangi Lewat Sepuluh. */
export const bagianSatuan = (l: { a: number }): number => satuan(l.a);
export const bagianSepuluh = (l: { a: number; b: number }): number => l.b - satuan(l.a);

/** Soal sah menurut metodenya (dipakai uji): belasan kurang satuan tanpa meminjam, belasan kurang lewat sepuluh, dan seterusnya. */
export function soalSah(l: LangkahDasar): boolean {
  const c = l.a - l.b;
  if (l.a < 11 || l.a > 20 || l.b < 1 || l.b > 9 || c < 1) return false;
  if (l.tipe === "igil") return l.a <= 19 && l.b <= satuan(l.a);
  if (l.tipe === "lewat") return l.a <= 19 && l.b > satuan(l.a);
  if (l.tipe === "keluarga") return l.b >= 4 && l.b <= 9 && c >= 4 && c <= 9 && c !== l.b;
  return c >= 2;
}

/** Kunci tiap langkah, dihitung dari datanya. */
export const kunciLangkah = (l: Langkah): number => sisa(dasarDari(l));
export const angkaJawab = kunciLangkah;

/** Tiga pilihan di sekitar kunci (nol sampai dua puluh): kunci, jawaban keliru yang umum, dan satu pengecoh. */
export function pilihanDari(l: Langkah): number[] {
  const d = dasarDari(l);
  const k = kunciLangkah(l);
  const calon: number[] = [];
  if (l.tipe === "salah") calon.push(l.jawabTokoh);
  calon.push(d.a + d.b, k + 1, k - 1, d.b, k + 2, k - 2);
  const ada: number[] = [k];
  for (const c of calon) if (ada.length < 3 && c >= 0 && c <= 20 && !ada.includes(c)) ada.push(c);
  for (let n = 0; ada.length < 3 && n <= 20; n += 1) if (!ada.includes(n)) ada.push(n);
  return ada.sort((p, q) => p - q);
}

const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

/* ------------------------------ Instruksi (templat, tanpa digit) ------------------------------ */
const AKHIR: Record<Cara, string> = { klik: "Lalu pilih jawabannya.", kanvas: "Lalu tulis angkanya di kanvas.", suara: "Lalu ucapkan jawabannya." };
const BENDA_KATA: Record<Rupa, string> = { benda: "benda", diagram: "titik", lambang: "bilangan" };

/** Nama benda untuk instruksi Concrete (bahasa lisan). */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, nama = "benda"): string {
  const akhir = AKHIR[cara];
  const b = BENDA_KATA[rupa];
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu pilih jawaban yang benar.`;
  const A = kata(l.a);
  const B = kata(l.b);
  const unit = rupa === "benda" ? nama : b;
  const klik = cara !== "kanvas";
  switch (l.tipe) {
    case "igil":
      if (rupa === "lambang") return `Kurangi satuannya, puluhannya tetap. ${besar(A)} dikurangi ${B} sama dengan berapa? ${akhir}`;
      return klik
        ? `Ada ${A} ${unit}: satu ikatan sepuluh dan sisanya satuan. Ketuk ${B} ${unit} di baris satuan untuk mengambilnya. ${akhir}`
        : `Dari ${A} ${unit}, ${B} diambil dari baris satuan dan sudah dicoret. Lingkari yang masih tersisa. ${akhir}`;
    case "pikir":
      if (rupa === "lambang") return `Pikirkan sebagai penjumlahan: ${B} ditambah berapa sama dengan ${A}? ${akhir}`;
      return klik
        ? `Pikir penjumlahan: ${B} ${unit} sudah ada, targetnya ${A}. Ketuk tempat kosong sampai penuh. ${akhir}`
        : `Pikir penjumlahan: ${B} ${unit} sudah ada, targetnya ${A}. Lingkari tempat yang masih kosong. ${akhir}`;
    case "keluarga":
      if (rupa === "lambang") return `Kalimat penjumlahan: ${B} ditambah ${kata(l.a - l.b)} sama dengan ${A}. Maka ${A} dikurangi ${B} sama dengan berapa? ${akhir}`;
      return klik
        ? `Dua bagian ${unit} digabung menjadi ${A}. Ketuk bagian yang diambil, yang berjumlah ${B}. ${akhir}`
        : `Dua bagian ${unit} digabung menjadi ${A}. Bagian berjumlah ${B} diambil. Lingkari bagian yang tersisa. ${akhir}`;
    case "lewat":
      if (rupa === "lambang") return klik ? `Kurangi lewat sepuluh: ${A} dikurangi ${B}. Urutkan dulu langkahnya, lalu cari sisanya. ${akhir}` : `Kurangi lewat sepuluh: ${A} dikurangi ${B}. Kurangi sampai sepuluh dulu, lalu sisanya. ${akhir}`;
      return klik
        ? `Kurangi lewat sepuluh: ${A} ${unit} diambil ${B}. Kurangi baris satuan sampai tinggal sepuluh, lalu sisanya dari ikatan. ${akhir}`
        : `Dari ${A} ${unit}, ${B} diambil lewat sepuluh dan sudah dicoret dua langkah. Lingkari yang masih tersisa. ${akhir}`;
  }
}

/* ------------------------------ Petunjuk saat jawaban salah (menunjuk kesalahannya, tanpa digit) ------------------------------ */
const CARA_PIKIR = "Pikirkan penjumlahannya, lalu cari sisanya.";
const PETUNJUK_METODE: Record<Metode, string> = {
  igil: "Kurangi hanya satuannya, puluhannya tetap satu.",
  pikir: "Hitung dari bilangan kecil naik sampai bilangan besar.",
  keluarga: "Kalimat penjumlahan membuka kalimat pengurangannya.",
  lewat: "Kurangi sampai sepuluh dulu, lalu sisanya dari sepuluh.",
};
export function petunjukSalah(l: Langkah, m: number): string {
  if (l.tipe === "salah") {
    if (m === l.jawabTokoh) return `Itu jawaban ${l.tokoh} yang keliru. ${l.keliru}`;
    return petunjukSalah(l.dasar, m);
  }
  const k = sisa(l);
  if (m === l.a + l.b) return "Itu hasil menambah. Mengurang berarti berkurang, jadi hasilnya lebih kecil dari bilangan semula.";
  if (m === l.a) return "Itu bilangan semula. Ada yang diambil, jadi sisanya lebih sedikit.";
  if (m === l.b) return "Itu banyak yang diambil, bukan sisanya. Cari yang masih tersisa.";
  if (l.tipe === "igil" && m < 10) return "Puluhannya tetap satu. Jangan sampai puluhan ikut hilang.";
  if (l.tipe === "igil" && m === k + 1) return "Satuannya kurang satu. Hitung lagi satuan yang diambil.";
  if (l.tipe === "pikir") return m < k ? `Masih kurang. ${CARA_PIKIR}` : `Terlalu banyak. ${CARA_PIKIR}`;
  if (l.tipe === "lewat" && m === k + 1) return "Ada yang kurang dikurangi. Setelah sepuluh, kurangi sisanya dari sepuluh.";
  if (l.tipe === "lewat" && m === k - 1) return "Ada yang terlalu banyak dikurangi. Hitung lagi sisanya dari sepuluh.";
  return m < k ? `Terlalu sedikit. ${PETUNJUK_METODE[l.tipe]}` : `Terlalu banyak. ${PETUNJUK_METODE[l.tipe]}`;
}

/* ------------------------------ Simulasi Meja Tutup Lapak ------------------------------ */
export type CaraTutup = "mundur" | "satuan" | "pikir" | "lewat";
export const URUT_CARA_TUTUP: CaraTutup[] = ["mundur", "satuan", "pikir", "lewat"];
export const NAMA_CARA_TUTUP: Record<CaraTutup, string> = { mundur: "Mundur", satuan: "Kurangi satuan", pikir: "Pikir penjumlahan", lewat: "Lewat sepuluh" };
export type DagangSim = { id: string; nama: string; ikon: string; awal: number; jual: number };

export type KeadaanTutup = {
  alat: "tutup";
  cara: CaraTutup;
  lapak: string | null;
  /** Banyak langkah yang sudah dijalankan pada cara ini. */
  langkah: number;
  /** Cara yang sudah dipakai melaporkan sisa tiap lapak. */
  lapor: Record<string, CaraTutup[]>;
  /** Lapak yang hasilnya sudah diperiksa dengan menambah. */
  periksa: string[];
  tutup: boolean;
};

export const awalTutup = (): KeadaanTutup => ({ alat: "tutup", cara: "mundur", lapak: null, langkah: 0, lapor: {}, periksa: [], tutup: false });

const dagang = (d: readonly DagangSim[], id: string | null): DagangSim | undefined => d.find((x) => x.id === id);
export const sisaDagang = (x: DagangSim): number => x.awal - x.jual;
/** Cara yang bisa dipakai: Kurangi satuan bila satuannya cukup, Lewat sepuluh bila satuannya kurang. */
export function bisaCara(cara: CaraTutup, x: DagangSim): boolean {
  if (cara === "satuan") return x.awal <= 19 && x.jual <= satuan(x.awal);
  if (cara === "lewat") return x.awal <= 19 && x.jual > satuan(x.awal);
  return true;
}
/** Banyak langkah sampai selesai pada tiap cara. */
export const langkahSelesai = (cara: CaraTutup, x: DagangSim): number => (cara === "pikir" ? sisaDagang(x) : x.jual);
/** Posisi bilangan setelah `langkah` langkah. */
export function posisiTutup(cara: CaraTutup, x: DagangSim, langkah: number): number {
  const n = Math.min(langkah, langkahSelesai(cara, x));
  if (cara === "pikir") return x.jual + n;
  if (cara === "lewat") {
    const s = satuan(x.awal);
    return n <= s ? x.awal - n : 10 - (n - s);
  }
  return x.awal - n;
}
export const tuntasTutup = (k: KeadaanTutup, d: readonly DagangSim[]): boolean => {
  const x = dagang(d, k.lapak);
  return x !== undefined && bisaCara(k.cara, x) && k.langkah >= langkahSelesai(k.cara, x);
};

export const pilihLapak = (k: KeadaanTutup, id: string, d: readonly DagangSim[]): KeadaanTutup => {
  const x = dagang(d, id);
  if (k.tutup || !x) return k;
  if (k.lapak === id) return k;
  /* Lapak yang sudah dilaporkan tetap tampil selesai (bukan nol langkah) bila caranya bisa dipakai di lapak itu. */
  const sudah = (k.lapor[id] ?? []).length > 0 && bisaCara(k.cara, x);
  return { ...k, lapak: id, langkah: sudah ? langkahSelesai(k.cara, x) : 0 };
};
export function pilihCara(k: KeadaanTutup, cara: CaraTutup): KeadaanTutup {
  return k.tutup ? k : { ...k, cara, langkah: 0 };
}
/** Satu langkah lagi pada cara yang dipilih (tidak melebihi akhirnya). */
export function majuTutup(k: KeadaanTutup, d: readonly DagangSim[]): KeadaanTutup {
  const x = dagang(d, k.lapak);
  if (k.tutup || !x || !bisaCara(k.cara, x) || k.langkah >= langkahSelesai(k.cara, x)) return k;
  return { ...k, langkah: k.langkah + 1 };
}
export const ulangLangkah = (k: KeadaanTutup): KeadaanTutup => (k.tutup ? k : { ...k, langkah: 0 });
/** Laporkan sisa lapak yang dipilih dengan cara sekarang, bila langkahnya sudah selesai. */
export function laporkan(k: KeadaanTutup, d: readonly DagangSim[]): KeadaanTutup {
  if (k.lapak === null || !tuntasTutup(k, d)) return k;
  const pernah = k.lapor[k.lapak] ?? [];
  return { ...k, lapor: { ...k.lapor, [k.lapak]: pernah.includes(k.cara) ? pernah : [...pernah, k.cara] } };
}
/** Periksa sisa yang sudah dilaporkan dengan menambah: sisa ditambah yang diambil kembali ke jumlah semula. */
export function periksaTambah(k: KeadaanTutup): KeadaanTutup {
  if (k.lapak === null || !k.lapor[k.lapak] || k.periksa.includes(k.lapak)) return k;
  return { ...k, periksa: [...k.periksa, k.lapak] };
}
export const semuaDilaporkan = (k: KeadaanTutup, d: readonly DagangSim[]): boolean => d.every((x) => (k.lapor[x.id] ?? []).length > 0);
export const semuaDiperiksa = (k: KeadaanTutup, d: readonly DagangSim[]): boolean => semuaDilaporkan(k, d) && d.every((x) => k.periksa.includes(x.id));
/** Tutup pasar malam bila semua lapak sudah dilaporkan dan diperiksa. */
export const tutupPasar = (k: KeadaanTutup, d: readonly DagangSim[]): KeadaanTutup => (semuaDiperiksa(k, d) ? { ...k, tutup: true } : k);
/** Main lagi: kembali ke keadaan awal supaya anak bisa mencoba lagi (misi yang sudah tercapai tetap tercatat di laporMisi). */
export const mainLagi = (k: KeadaanTutup): KeadaanTutup => (k.tutup ? awalTutup() : k);

/** Kalimat keadaan untuk suara (tanpa digit). */
export function kalimatTutup(k: KeadaanTutup, d: readonly DagangSim[]): string {
  if (k.tutup) return "Pasar malam resmi ditutup. Semua sisa dagangan sudah dilaporkan dan diperiksa.";
  const x = dagang(d, k.lapak);
  if (!x) return "Ketuk satu lapak, lalu pilih caranya.";
  if (!bisaCara(k.cara, x)) return k.cara === "satuan" ? "Satuannya kurang dari yang diambil. Coba cara Lewat sepuluh." : "Satuannya cukup. Coba cara Kurangi satuan, atau cara lain.";
  const n = langkahSelesai(k.cara, x);
  if (k.langkah < n) return `Sudah ${kata(k.langkah)} langkah dari ${kata(n)}.`;
  const lapor = (k.lapor[x.id] ?? []).length > 0;
  if (!lapor) return `Selesai. Sisanya ${kata(sisaDagang(x))}. Tekan Laporkan sisa.`;
  return k.periksa.includes(x.id) ? `Sisa ${kata(sisaDagang(x))} sudah dilaporkan dan diperiksa.` : `Sisa ${kata(sisaDagang(x))} sudah dilaporkan. Tekan Periksa dengan menambah.`;
}
