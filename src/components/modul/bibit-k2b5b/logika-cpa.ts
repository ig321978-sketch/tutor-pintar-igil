/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 2 Bab 5 Sub-Bab B "Bibit untuk Dua Petak" (setengah dari kumpulan benda):
 * jenis tugas, jawaban, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-bibit-k2b5b.mjs.
 * Empat metode: Satu-Satu Sampai Habis (membagi sampai habis, lalu menghitung satu petak), Dealing Out (membagi bergantian per putaran),
 * Balance Scale (memindahkan benda sampai neraca seimbang), dan Doubling Check (menggandakan setengahnya lalu membandingkan).
 * Jawaban bukan hanya angka: satu angka (kanvas dan pilihan ketuk), satu kata ("setengah", "bukan", "sama"), mengurutkan langkah, memindahkan benda,
 * dan menggandakan tumpukan.
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { IKON_CARA, NAMA_CARA, URUT_CARA, kata, type Cara } from "../lemari-k1b1a/logika";
import { kata } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";

/* ------------------------------ Benda ------------------------------ */
/** Benda kebun beremoji (Concrete). Pictorial memakai titik polos, Abstract hanya kata dan bilangan. */
export const EMOJI_BENDA: Record<string, string> = {
  bibit: "\u{1F331}",
  tomat: "\u{1F345}",
  wortel: "\u{1F955}",
  jagung: "\u{1F33D}",
  bunga: "\u{1F33B}",
  apel: "\u{1F34E}",
  cabai: "\u{1F336}\u{FE0F}",
  terong: "\u{1F346}",
};
export const DAFTAR_BENDA = Object.keys(EMOJI_BENDA);

/* ------------------------------ Langkah ------------------------------ */
type Dasar = { benda?: string };
/** Metode IGIL "Satu-Satu Sampai Habis": `total` benda dibagi satu-satu ke dua petak. `pisah` (hanya Cari kesalahan): pembagian yang dibuat tokoh, kiri dan kanan. */
export type LBagi = { tipe: "bagi"; total: number; pisah?: [number, number] } & Dasar;
/** Dealing Out (Bagi Satu-Satu): satu putaran memberi satu benda ke petak kiri dan satu ke petak kanan. */
export type LGiliran = { tipe: "giliran"; total: number; putaran: number } & Dasar;
/** Balance Scale (Neraca Seimbang): piringan kiri berisi `kiri` benda, piringan kanan `kanan` benda. */
export type LNeraca = { tipe: "neraca"; kiri: number; kanan: number } & Dasar;
/** Doubling Check (Cek Dua Kali Lipat): setengahnya `h` benda, banyak semula (yang diperiksa) `semula` benda. */
export type LKali = { tipe: "kali"; h: number; semula: number } & Dasar;
export type LangkahDasar = LBagi | LGiliran | LNeraca | LKali;
/** Cari kesalahan: tokoh sudah menjawab. Anak memutuskan benar atau salah, memilih alasan, lalu menjawab sendiri (bila ada jawaban lagi). */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LangkahDasar;
  tokoh: string;
  kataTokoh: string;
  /** Angka atau kata yang disebut tokoh (bila salah dan jawabannya sebuah angka atau kata). */
  jawabTokoh?: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "bagi" | "neraca" | "kali";
export const URUT_METODE: Metode[] = ["igil", "bagi", "neraca", "kali"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Satu-Satu Sampai Habis",
  bagi: "Dealing Out: Bagi Satu-Satu",
  neraca: "Balance Scale: Neraca Seimbang",
  kali: "Doubling Check: Cek Dua Kali Lipat",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F331}", bagi: "\u{1F932}", neraca: "\u{2696}\u{FE0F}", kali: "\u{1F501}" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);
export const metodeLangkah = (l: Langkah): Metode => {
  const t = dasarDari(l).tipe;
  return t === "bagi" ? "igil" : t === "giliran" ? "bagi" : t;
};
export const namaBenda = (l: LangkahDasar, rupa: Rupa): string => (rupa === "benda" ? (l.benda ?? "bibit") : rupa === "diagram" ? "titik" : "benda");

/* ------------------------------ Hitungan dari data ------------------------------ */
export const setengahDari = (n: number): number | null => (n % 2 === 0 ? n / 2 : null);
/** Banyak benda yang harus dipindahkan dari piringan yang lebih banyak supaya seimbang (selisih harus genap). */
export const banyakPindah = (l: LNeraca): number => Math.abs(l.kiri - l.kanan) / 2;
export const seimbangSetiap = (l: LNeraca): number => (l.kiri + l.kanan) / 2;
export const sisaSetelah = (l: LGiliran): number => l.total - 2 * l.putaran;
export const gandaan = (l: LKali): number => 2 * l.h;
export const gandaanSama = (l: LKali): boolean => gandaan(l) === l.semula;

export type Kunci = { jenis: "angka"; n: number } | { jenis: "kata"; kata: string };

/** Kunci tiap tugas menurut caranya, dihitung dari data. Null bila tugas selesai lewat kegiatan (mengurutkan, memindahkan) atau tidak punya jawaban angka (bilangan ganjil). */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, cara);
  switch (l.tipe) {
    case "bagi": {
      const s = setengahDari(l.total);
      return s === null ? null : { jenis: "angka", n: s };
    }
    case "giliran":
      if (cara === "klik") return null;
      return cara === "kanvas" ? { jenis: "angka", n: sisaSetelah(l) } : { jenis: "angka", n: l.putaran };
    case "neraca":
      if (cara === "klik") return null;
      return cara === "kanvas" ? { jenis: "angka", n: banyakPindah(l) } : { jenis: "kata", kata: l.kiri === l.kanan ? "setengah" : "bukan" };
    case "kali":
      return cara === "suara" ? { jenis: "kata", kata: gandaanSama(l) ? "sama" : "bukan" } : { jenis: "angka", n: gandaan(l) };
  }
}

/**
 * Apakah tugas langsung siap dijawab (tanpa kegiatan lebih dulu)? Kanvas dan suara: ya. Klik: tidak, karena tiap metode punya kegiatan
 * (membagi, mengurutkan, memindahkan, menggandakan) yang aktif di semua rupa, termasuk lambang. Cari kesalahan selalu memakai kegiatan.
 */
export function siapLangsung(l: Langkah, _rupa: Rupa, cara: Cara): boolean {
  if (l.tipe === "salah") return false;
  return cara !== "klik";
}

/** Pilihan angka (paling banyak empat) di sekitar kunci, memuat angka yang disebut tokoh bila ada. Urut naik. */
export function pilihanAngka(l: Langkah): number[] {
  const d = dasarDari(l);
  const k = kunciJawab(d, "klik") ?? kunciJawab(d, "kanvas");
  const benar = k?.jenis === "angka" ? k.n : 0;
  const ada = new Set<number>(benar > 0 ? [benar] : []);
  if (l.tipe === "salah" && l.jawabTokoh !== undefined && /^\d+$/.test(l.jawabTokoh)) ada.add(Number(l.jawabTokoh));
  for (const c of [benar + 1, benar - 1, benar + 2, benar - 2, benar * 2, benar + 3]) if (c >= 1 && c <= 10 && ada.size < 4) ada.add(c);
  return [...ada].sort((a, b) => a - b);
}
/** Pilihan kata untuk tugas berjawaban kata. */
export function pilihanKata(l: Langkah): string[] {
  const k = kunciJawab(l, "suara");
  if (k?.jenis !== "kata") return [];
  return k.kata === "sama" || (k.kata === "bukan" && dasarDari(l).tipe === "kali") ? ["sama", "bukan"] : ["setengah", "bukan"];
}

/* ------------------------------ Kegiatan: urutan langkah ------------------------------ */
/** Empat langkah Dealing Out dalam urutan yang benar (tanpa digit). */
export function langkahUrut(l: LGiliran, rupa: Rupa): string[] {
  const b = namaBenda(l, rupa);
  return [`Kumpulkan ${kata(l.total)} ${b} dalam satu tumpukan`, `Beri satu ke petak kiri, lalu satu ke petak kanan`, `Ulangi bergantian sampai ${b} habis`, `Hitung ${b} di satu petak`];
}
/** Urutan kartu langkah yang diacak tetap (bukan acak sungguhan): kartu pertama yang tampil tidak pernah langkah pertama. */
export function urutTampil(l: LGiliran): number[] {
  const pola = [
    [2, 0, 3, 1],
    [1, 3, 0, 2],
    [3, 2, 1, 0],
  ];
  return pola[(l.total / 2) % 3];
}

/* ------------------------------ Kalimat ------------------------------ */
const jumlahBenda = (n: number, b: string): string => `${kata(n)} ${b}`;

export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  const b = d.benda ?? "bibit";
  switch (d.tipe) {
    case "bagi": {
      const s = setengahDari(d.total);
      return s === null ? `Dibagi satu-satu, ${kata(d.total)} tidak habis dan tersisa satu, jadi tidak punya setengah utuh.` : `Dibagi satu-satu sampai habis, tiap petak ${kata(s)}, jadi setengah dari ${kata(d.total)} adalah ${kata(s)}.`;
    }
    case "giliran":
      if (cara === "klik") return "Langkahnya sudah berurutan: kumpulkan, bagi bergantian, ulangi sampai habis, lalu hitung satu petak.";
      return cara === "kanvas"
        ? `Tiap putaran membagi dua benda, jadi ${kata(d.putaran)} putaran membagi ${kata(2 * d.putaran)}. Sisanya ${kata(sisaSetelah(d))}.`
        : `Tiap putaran memberi satu benda ke petak kiri, jadi setelah ${kata(d.putaran)} putaran ada ${kata(d.putaran)} benda di petak kiri.`;
    case "neraca":
      if (cara === "klik") return `Neraca seimbang! Setiap piringan berisi ${jumlahBenda(seimbangSetiap(d), b)}.`;
      if (cara === "kanvas") return `Memindahkan ${kata(banyakPindah(d))} benda membuat kedua piringan sama banyak, masing-masing ${kata(seimbangSetiap(d))}.`;
      return d.kiri === d.kanan ? "Kedua piringan sama banyak, jadi masing-masing menunjukkan setengah dari seluruhnya." : "Kedua piringan tidak sama banyak, jadi bukan setengah.";
    case "kali":
      if (cara === "suara") return gandaanSama(d) ? `Dua kali ${kata(d.h)} adalah ${kata(gandaan(d))}, sama dengan banyak semula, jadi pembagiannya benar.` : `Dua kali ${kata(d.h)} adalah ${kata(gandaan(d))}, tidak sama dengan banyak semula, jadi pembagiannya salah.`;
      return `Dua kali setengahnya adalah seluruhnya: ${kata(d.h)} ditambah ${kata(d.h)} sama dengan ${kata(gandaan(d))}.`;
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat${kunciJawab(l.dasar, cara) === null ? "." : ", lalu jawab sendiri."}`;
  const b = namaBenda(l, rupa);
  switch (l.tipe) {
    case "bagi":
      if (cara === "klik") return `Ada ${jumlahBenda(l.total, b)}. Bagikan satu-satu ke dua petak sampai habis, lalu pilih banyak ${b} di satu petak.`;
      if (cara === "kanvas") return `Bagi ${jumlahBenda(l.total, b)} satu-satu ke dua petak sampai habis. Hitung ${b} di satu petak, lalu tulis banyaknya di kanvas.`;
      return `Bagi ${jumlahBenda(l.total, b)} satu-satu ke dua petak sampai habis. Sebutkan banyak ${b} di satu petak.`;
    case "giliran":
      if (cara === "klik") return `Urutkan langkah membagi ${jumlahBenda(l.total, b)} dengan Bagi Satu-Satu. Ketuk kartu langkah dari yang pertama.`;
      if (cara === "kanvas") return `Satu putaran memberi satu ${b} ke petak kiri dan satu ${b} ke petak kanan. Dari ${jumlahBenda(l.total, b)}, setelah ${kata(l.putaran)} putaran, berapa ${b} yang belum dibagi? Tulis di kanvas.`;
      return `Satu putaran memberi satu ${b} ke petak kiri dan satu ${b} ke petak kanan. Setelah ${kata(l.putaran)} putaran, berapa ${b} sudah ada di petak kiri? Sebutkan.`;
    case "neraca":
      if (cara === "klik") return `Neraca ini miring. Pindahkan ${b} dari piringan yang lebih banyak sampai neraca seimbang.`;
      if (cara === "kanvas") return `Neraca ini miring: ${kata(l.kiri)} ${b} di kiri dan ${kata(l.kanan)} ${b} di kanan. Berapa ${b} yang harus dipindahkan supaya seimbang? Tulis di kanvas.`;
      return `Piringan kiri berisi ${kata(l.kiri)} ${b} dan piringan kanan ${kata(l.kanan)} ${b}. Apakah ini menunjukkan setengah dari seluruhnya? Ucapkan setengah atau bukan.`;
    case "kali":
      if (cara === "klik") return `Setengah dari seluruh ${b} adalah ${kata(l.h)}. Ketuk Gandakan, lalu pilih banyak seluruhnya.`;
      if (cara === "kanvas") return `Setengah dari seluruh ${b} adalah ${kata(l.h)}. Gandakan setengahnya, lalu tulis banyak seluruhnya di kanvas.`;
      return `Banyak ${b} semula ${kata(l.semula)}, dan setengahnya ${kata(l.h)}. Gandakan setengahnya. Hasilnya sama dengan banyak semula? Ucapkan sama atau bukan.`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "bagi":
      return "Berapa banyak di satu petak?";
    case "giliran":
      return cara === "kanvas" ? "Berapa yang belum dibagi?" : "Berapa yang ada di petak kiri?";
    case "neraca":
      return cara === "kanvas" ? "Berapa yang harus dipindahkan?" : "Setengah atau bukan?";
    case "kali":
      return cara === "suara" ? "Sama dengan banyak semula atau bukan?" : "Berapa banyak seluruhnya?";
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya (tanpa digit). `jawab`: kata atau angka yang dipilih, diucapkan, atau ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (l.jawabTokoh !== undefined && String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh} yang keliru. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "bagi":
      return "Bagi satu-satu sampai habis, lalu hitung benda di satu petak saja, bukan seluruhnya.";
    case "giliran":
      return cara === "kanvas" ? "Tiap putaran membagi dua benda: satu ke kiri dan satu ke kanan. Kurangi banyak benda dengan dua untuk tiap putaran." : "Tiap putaran memberi satu benda ke petak kiri. Banyak benda di petak kiri sama dengan banyak putaran.";
    case "neraca":
      return cara === "kanvas" ? "Selisih kedua piringan dibagi dua adalah banyak benda yang dipindahkan. Setelah dipindah, kedua piringan harus sama banyak." : "Neraca seimbang hanya bila kedua piringan sama banyak. Hitung dulu benda di kedua piringan.";
    case "kali":
      return cara === "suara" ? "Gandakan setengahnya, yaitu tambahkan dengan dirinya sendiri, lalu bandingkan dengan banyak semula." : "Dua kali setengahnya adalah seluruhnya. Tambahkan setengahnya dengan dirinya sendiri.";
  }
}

/** Petunjuk saat kegiatan membagi diketuk keliru (dua kali berturut-turut di petak yang sama). `terakhir`: petak yang baru diberi (0 kiri, 1 kanan). */
export const petunjukBagi = (terakhir: 0 | 1): string => `Bagi bergantian, satu-satu. Petak ${terakhir === 0 ? "kiri" : "kanan"} baru saja diberi, sekarang giliran petak ${terakhir === 0 ? "kanan" : "kiri"}.`;
/** Petunjuk saat memindahkan benda dari piringan yang lebih sedikit. */
export const petunjukPindah = (): string => "Pindahkan benda dari piringan yang lebih banyak ke piringan yang lebih sedikit, bukan sebaliknya.";
/** Petunjuk saat kartu langkah diketuk tidak pada gilirannya. */
export const petunjukUrut = (nomor: number): string => `Langkah itu belum waktunya. Sekarang langkah yang ${nomor === 0 ? "pertama" : `ke${kata(nomor + 1)}`}. Pikirkan apa yang dilakukan lebih dulu.`;
