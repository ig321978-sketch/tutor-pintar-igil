/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 2 Bab 7 Sub-Bab A "Botol Pak Ujang" (menghitung, membaca, dan menulis bilangan sampai seratus):
 * jenis tugas, kunci, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-ikat-k2b7a.mjs.
 * Jawaban beragam: memilih bilangan, mengetuk bingkai atau susunan balok, mengucapkan satu kata (puluhan, satuan) atau bilangan, dan menulis satu angka di kanvas.
 * Kunci dihitung dari data (banyak ikat, benda lepas, lompatan), bukan kunci tetap.
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);
export const HURUF = ["A", "B", "C", "D", "E", "F"] as const;
export const huruf = (i: number): string => HURUF[i] ?? "?";

/* ------------------------------ Kata bilangan sampai seratus ------------------------------ */
const SAT = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"] as const;
/** Nama bilangan 0 sampai 100 dalam kata (tanpa digit). Di luar jangkauan: kata satu per satu angka tidak dipakai, cukup angka itu sendiri. */
export function kataBil(n: number): string {
  if (n < 0 || n > 100 || !Number.isInteger(n)) return String(n);
  if (n === 100) return "seratus";
  if (n < 10) return SAT[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SAT[n - 10]} belas`;
  const p = Math.floor(n / 10);
  const s = n % 10;
  return s === 0 ? `${SAT[p]} puluh` : `${SAT[p]} puluh ${SAT[s]}`;
}
export const kata = kataBil;

/* ------------------------------ Kata jawaban ------------------------------ */
export type KataJ = "puluhan" | "satuan" | "ikat";
export const GRUP_KATA: KataJ[][] = [["puluhan", "satuan", "ikat"]];

/**
 * Benda untuk rupa Concrete (emoji paling tinggi U+1FA95). Berbeda dari data Story (botol, kaleng) dan dari Simulasi (kardus, tutup botol, kaus bekas).
 */
export const OBJEK = [
  { nama: "koran", emoji: "\u{1F4F0}", warna: "#E5E7EB", garis: "#4B5563" },
  { nama: "gelas plastik", emoji: "\u{1F964}", warna: "#A5F3FC", garis: "#155E75" },
  { nama: "kotak jus", emoji: "\u{1F9C3}", warna: "#FDE68A", garis: "#92400E" },
  { nama: "tisu gulung", emoji: "\u{1F9FB}", warna: "#F9A8D4", garis: "#9D174D" },
  { nama: "kotak makan", emoji: "\u{1F961}", warna: "#BBF7D0", garis: "#166534" },
  { nama: "kertas bekas", emoji: "\u{1F4C4}", warna: "#C4B5FD", garis: "#4C1D95" },
  { nama: "majalah", emoji: "\u{1F4D6}", warna: "#FDBA74", garis: "#9A3412" },
  { nama: "tas kertas", emoji: "\u{1F45C}", warna: "#FCA5A5", garis: "#991B1B" },
] as const;

/* ------------------------------ Langkah ------------------------------ */
/**
 * Metode IGIL "Ikat, Hitung Puluhan, Tambah Satuan": `p` ikat penuh (tiap ikat sepuluh) dan `s` benda lepas.
 * klik: pilih bilangan seluruhnya; kanvas: banyak benda lepas; suara: ucapkan "puluhan" atau "satuan" (`tanya`: yang ditanya ikat atau benda lepas).
 */
export type LIgil = { tipe: "igil"; p: number; s: number; o?: number; tanya?: "ikat" | "lepas" };
/**
 * Ten Frame (Bingkai Sepuluh). penuh (klik): beberapa bingkai dengan isi berbeda, ketuk bingkai yang penuh; hitung: `p` bingkai penuh dan satu bingkai berisi `s`
 * (kanvas: banyak bingkai penuh; suara: banyak benda seluruhnya).
 */
export type LBingkai = { tipe: "bingkai"; mode: "penuh"; isi: number[]; o?: number } | { tipe: "bingkai"; mode: "hitung"; p: number; s: number; o?: number };
/**
 * Skip Counting (Hitung Loncat): melompat sepuluh-sepuluh dari `awal` (kelipatan sepuluh) sebanyak `k` lompatan. klik dan suara: bilangan yang dicapai;
 * kanvas (awal nol): banyak lompatan sampai bilangan yang ditunjukkan.
 */
export type LLoncat = { tipe: "loncat"; awal: number; k: number; o?: number };
/**
 * Base Ten Blocks (Balok Puluhan). pilih (klik): ketuk susunan balok (batang, kotak) yang sama dengan bilangan `target`; tukar (kanvas): `p` batang dan `k` kotak kecil (sebelas sampai
 * sembilan belas), sepuluh kotak ditukar satu batang, berapa kotak tersisa; kata (suara): satu batang atau satu kotak kecil mewakili puluhan atau satuan.
 */
export type LBalok =
  | { tipe: "balok"; mode: "pilih"; koleksi: [number, number][]; target: number; o?: number }
  | { tipe: "balok"; mode: "tukar"; p: number; k: number; o?: number }
  | { tipe: "balok"; mode: "kata"; p: number; s: number; tanya: "batang" | "kotak"; o?: number };
export type LangkahDasar = LIgil | LBingkai | LLoncat | LBalok;
/** Cari kesalahan: tokoh sudah menjawab tentang ikat dan benda lepas `dasar` (igil). Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LIgil;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh?: number;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "bingkai" | "loncat" | "balok";
export const URUT_METODE: Metode[] = ["igil", "bingkai", "loncat", "balok"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Ikat, Hitung Puluhan, Tambah Satuan",
  bingkai: "Ten Frame: Bingkai Sepuluh",
  loncat: "Skip Counting: Hitung Loncat",
  balok: "Base Ten Blocks: Balok Puluhan",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F9F6}", bingkai: "\u{1F7E8}", loncat: "\u{1F998}", balok: "\u{1F9F1}" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);
export const metodeLangkah = (l: Langkah): Metode => (l.tipe === "salah" ? "igil" : l.tipe);

/* ------------------------------ Hitungan dari data ------------------------------ */
export const totalIgil = (l: LIgil): number => l.p * 10 + l.s;
export const totalBingkai = (l: LBingkai & { mode: "hitung" }): number => l.p * 10 + l.s;
export const hasilLoncat = (l: LLoncat): number => l.awal + l.k * 10;
export const nilaiBalok = (b: [number, number]): number => b[0] * 10 + b[1];
/** Nomor bingkai yang penuh (harus tunggal). */
export const nomorPenuh = (l: LBingkai & { mode: "penuh" }): number => l.isi.findIndex((n) => n === 10);
/** Nomor susunan balok yang sama dengan bilangan target (harus tunggal). */
export const nomorSusunan = (l: LBalok & { mode: "pilih" }): number => l.koleksi.findIndex((b) => nilaiBalok(b) === l.target);
/** Sisa kotak kecil setelah sepuluh kotak ditukar satu batang. */
export const sisaTukar = (l: LBalok & { mode: "tukar" }): number => l.k - 10;
export const kataBalok = (l: LBalok & { mode: "kata" }): KataJ => (l.tanya === "batang" ? "puluhan" : "satuan");
export const kataIgil = (l: LIgil): KataJ => (l.tanya === "ikat" ? "puluhan" : "satuan");

export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: KataJ };

/** Kunci tiap tugas menurut caranya, dihitung dari data. Null bila tugas selesai lewat kegiatan (mengetuk). */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "igil":
      if (cara === "klik") return { jenis: "angka", n: totalIgil(l) };
      if (cara === "kanvas") return { jenis: "angka", n: l.s };
      return { jenis: "nama", nama: kataIgil(l) };
    case "bingkai":
      if (l.mode === "penuh") return null;
      if (cara === "kanvas") return { jenis: "angka", n: l.p };
      return { jenis: "angka", n: totalBingkai(l) };
    case "loncat":
      if (cara === "kanvas") return { jenis: "angka", n: l.k };
      return { jenis: "angka", n: hasilLoncat(l) };
    case "balok":
      if (l.mode === "pilih") return null;
      if (l.mode === "tukar") return cara === "kanvas" ? { jenis: "angka", n: sisaTukar(l) } : null;
      return cara === "suara" ? { jenis: "nama", nama: kataBalok(l) } : null;
  }
}

/** Jawaban tugas yang diselesaikan dengan mengetuk (klik): nomor bingkai atau susunan balok yang benar. */
export function nomorKetuk(l: LangkahDasar): number {
  if (l.tipe === "bingkai" && l.mode === "penuh") return nomorPenuh(l);
  if (l.tipe === "balok" && l.mode === "pilih") return nomorSusunan(l);
  return -1;
}

/**
 * Apakah tugas langsung siap dijawab (tanpa kegiatan lebih dulu)? Bila punya kunci: ya. Klik yang diselesaikan dengan mengetuk dan Cari kesalahan memakai kegiatan.
 * Tidak bergantung pada rupa, sehingga tidak macet pada lambang.
 */
export function siapLangsung(l: Langkah, rupa: Rupa, cara: Cara): boolean {
  void rupa;
  if (l.tipe === "salah") return false;
  return kunciJawab(l, cara) !== null;
}

/* ------------------------------ Pilihan ------------------------------ */
const sah = (n: number): boolean => Number.isInteger(n) && n >= 1 && n <= 100;
/** Dua pengecoh bilangan untuk kunci `n`: dari daftar kandidat (urut), lalu dari sekitar n. */
function duaPengecoh(n: number, kandidat: number[]): [number, number] {
  const semua = [...kandidat, n + 10, n - 10, n + 1, n - 1, n + 2, n - 2];
  const hasil: number[] = [];
  for (const c of semua) if (sah(c) && c !== n && !hasil.includes(c)) hasil.push(c);
  return [hasil[0], hasil[1]];
}
const balikDua = (n: number): number => (n >= 10 && n < 100 && n % 10 !== 0 ? (n % 10) * 10 + Math.floor(n / 10) : n);
/** Pengecoh khas tiap tugas pilihan bilangan: angka tertukar, hanya jumlah ikat dan lepas, selisih satu puluhan. */
export function pengecoh(l: Langkah): [number, number] | null {
  const k = kunciJawab(l, "klik");
  if (!k || k.jenis !== "angka") return null;
  const d = dasarDari(l);
  if (d.tipe === "igil") return duaPengecoh(k.n, [d.p + d.s, balikDua(k.n)]);
  if (d.tipe === "loncat") return duaPengecoh(k.n, [k.n - 10, k.n + 10, d.awal + d.k]);
  return duaPengecoh(k.n, []);
}
/** Tiga pilihan bilangan untuk tugas klik (kunci tidak selalu di tombol pertama). */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  const p = pengecoh(l);
  if (!k || k.jenis !== "angka" || !p) return [];
  const urut = [k.n, p[0], p[1]];
  const geser = k.n % 3;
  return urut.map((_, i) => String(urut[(i + geser) % 3]));
}
/** Pilihan cadangan untuk tugas suara (kata atau bilangan dalam kata). */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k) return [];
  if (k.jenis === "nama") return GRUP_KATA.find((g) => g.includes(k.nama)) ?? GRUP_KATA[0];
  const [a, b] = duaPengecoh(k.n, [balikDua(k.n)]);
  return [k.n, a, b].map(kataBil);
}
export function pilihanKataDari(nama: KataJ): KataJ[] {
  return GRUP_KATA.find((g) => g.includes(nama)) ?? GRUP_KATA[0];
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : "gambar");
/** Frasa banyak puluhan: "sepuluh puluhan" bukan "sepuluh puluh". */
const puluhan = (p: number): string => `${kataBil(p)} puluhan`;

export function kalimatKunci(l: Langkah, cara: Cara, rupa: Rupa = "benda"): string {
  void rupa;
  const d = dasarDari(l);
  const kunci = kunciJawab(l, cara);
  const n = kunci?.jenis === "angka" ? kunci.n : 0;
  switch (d.tipe) {
    case "igil":
      if (cara === "klik") return `${kapital(kataBil(d.p))} ikat adalah ${puluhan(d.p)}${d.s > 0 ? `, ditambah ${kataBil(d.s)} satuan` : ""}, jadi seluruhnya ${kataBil(totalIgil(d))}.`;
      if (cara === "kanvas") return `Benda yang belum diikat disebut satuan, dan ada ${kataBil(d.s)} satuan.`;
      return d.tanya === "ikat" ? "Satu ikat berisi sepuluh benda, jadi ikat dibaca sebagai puluhan." : "Benda yang belum diikat dibaca sebagai satuan.";
    case "bingkai":
      if (d.mode === "penuh") return "Bingkai yang penuh punya sepuluh benda, yaitu satu puluhan.";
      if (cara === "kanvas") return `Ada ${kataBil(d.p)} bingkai yang penuh, jadi ${puluhan(d.p)}.`;
      return `${kapital(puluhan(d.p))} dan ${kataBil(d.s)} satuan, jadi seluruhnya ${kataBil(n)}.`;
    case "loncat":
      if (cara === "kanvas") return `Dari nol, ${kataBil(d.k)} lompatan sepuluh-sepuluh sampai di ${kataBil(hasilLoncat(d))}.`;
      return `Dari ${kataBil(d.awal)} melompat ${kataBil(d.k)} kali sepuluh-sepuluh, sampai di ${kataBil(hasilLoncat(d))}.`;
    case "balok":
      if (d.mode === "pilih") return `${kapital(puluhan(Math.floor(d.target / 10)))} dan ${kataBil(d.target % 10)} satuan sama dengan ${kataBil(d.target)}.`;
      if (d.mode === "tukar") return `Sepuluh kotak kecil ditukar satu batang, jadi tersisa ${kataBil(n)} kotak kecil.`;
      return d.tanya === "batang" ? "Satu batang panjang mewakili satu puluhan." : "Satu kotak kecil mewakili satu satuan.";
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  switch (l.tipe) {
    case "igil":
      if (cara === "klik") return `Hitung ikat penuh dan benda lepas pada ${g} ini. Satu ikat berisi sepuluh benda. Ada berapa benda seluruhnya? Pilih bilangannya.`;
      if (cara === "kanvas") return `Lihat ${g} ini. Berapa benda yang lepas, yang belum diikat? Tulis satu angka di kanvas.`;
      return l.tanya === "ikat" ? `Ikat-ikat penuh pada ${g} ini dibaca sebagai puluhan atau satuan? Ucapkan satu kata.` : `Benda lepas pada ${g} ini dibaca sebagai puluhan atau satuan? Ucapkan satu kata.`;
    case "bingkai":
      if (l.mode === "penuh") return `Ten Frame: lihat beberapa bingkai sepuluh. Ketuk bingkai yang penuh.`;
      if (cara === "kanvas") return `Ten Frame: ada bingkai yang penuh dan satu bingkai yang belum penuh. Berapa bingkai yang penuh? Tulis satu angka di kanvas.`;
      return `Ten Frame: hitung bingkai yang penuh dan kotak yang terisi di bingkai terakhir. Ada berapa benda seluruhnya? Ucapkan bilangannya.`;
    case "loncat":
      if (cara === "klik") return `Skip Counting: melompat sepuluh-sepuluh dimulai dari ${kataBil(l.awal)}. Setelah ${kataBil(l.k)} lompatan, sampai di bilangan berapa? Pilih bilangannya.`;
      if (cara === "kanvas") return `Skip Counting: dari nol melompat sepuluh-sepuluh sampai ${kataBil(hasilLoncat(l))}. Berapa lompatan yang dibuat? Tulis satu angka di kanvas.`;
      return `Skip Counting: melompat sepuluh-sepuluh dari ${kataBil(l.awal)} sebanyak ${kataBil(l.k)} lompatan. Sampai di bilangan berapa? Ucapkan bilangannya.`;
    case "balok":
      if (l.mode === "pilih") return `Base Ten Blocks: ketuk susunan balok yang menunjukkan ${kataBil(l.target)}.`;
      if (l.mode === "tukar") return `Base Ten Blocks: ada batang dan kotak kecil. Sepuluh kotak kecil boleh ditukar satu batang. Setelah ditukar, berapa kotak kecil yang tersisa? Tulis satu angka di kanvas.`;
      return l.tanya === "batang" ? `Base Ten Blocks: satu batang panjang mewakili puluhan atau satuan? Ucapkan satu kata.` : `Base Ten Blocks: satu kotak kecil mewakili puluhan atau satuan? Ucapkan satu kata.`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  if (d.tipe === "igil") return cara === "klik" ? "Ada berapa benda seluruhnya?" : cara === "kanvas" ? "Berapa benda yang lepas?" : d.tanya === "ikat" ? "Ikat dibaca sebagai puluhan atau satuan?" : "Benda lepas dibaca sebagai puluhan atau satuan?";
  if (d.tipe === "bingkai") return cara === "kanvas" ? "Berapa bingkai yang penuh?" : "Ada berapa benda seluruhnya?";
  if (d.tipe === "loncat") return cara === "kanvas" ? "Berapa lompatan yang dibuat?" : "Sampai di bilangan berapa?";
  if (d.mode === "tukar") return "Berapa kotak kecil yang tersisa setelah ditukar?";
  return d.mode === "kata" && d.tanya === "batang" ? "Satu batang mewakili puluhan atau satuan?" : "Satu kotak kecil mewakili puluhan atau satuan?";
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya (tanpa digit). `jawab`: kata yang dipilih atau diucapkan, atau angka yang dipilih atau ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number, rupa: Rupa = "benda"): string {
  void rupa;
  if (l.tipe === "salah") {
    if (l.jawabTokoh !== undefined && Number(jawab) === l.jawabTokoh && !Number.isNaN(Number(jawab))) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab, rupa);
  }
  if (l.tipe === "igil") {
    if (cara === "klik") return "Satu ikat berisi sepuluh benda. Hitung puluhan dulu, lalu tambah benda yang lepas sebagai satuan.";
    if (cara === "kanvas") return "Benda yang lepas adalah benda yang belum masuk ikat. Hitung hanya benda yang tidak diikat.";
    return "Ikat berisi sepuluh benda sehingga disebut puluhan. Benda yang lepas disebut satuan.";
  }
  if (l.tipe === "bingkai") {
    if (l.mode === "penuh") return "Bingkai yang penuh tidak punya kotak kosong. Hitung kotak yang terisi pada tiap bingkai.";
    if (cara === "kanvas") return "Hitung hanya bingkai yang semua kotaknya terisi. Bingkai yang belum penuh tidak ikut dihitung.";
    return "Bingkai penuh adalah satu puluhan. Hitung puluhan dulu, lalu tambah kotak yang terisi di bingkai terakhir.";
  }
  if (l.tipe === "loncat") {
    if (cara === "kanvas") return "Hitung lompatan satu per satu. Setiap lompatan maju sepuluh.";
    return "Setiap lompatan menambah sepuluh. Sebut puluhan berikutnya sambil menghitung lompatannya.";
  }
  if (l.mode === "pilih") return "Satu batang adalah satu puluhan dan satu kotak kecil adalah satu satuan. Baca banyak batang dulu, lalu banyak kotak kecil.";
  if (l.mode === "tukar") return "Sepuluh kotak kecil menjadi satu batang. Kurangi kotak kecil sebanyak sepuluh, sisanya yang dihitung.";
  return "Batang panjang berisi sepuluh kotak kecil sehingga disebut puluhan. Kotak kecil disebut satuan.";
}

/** Petunjuk saat bingkai atau susunan balok yang diketuk keliru. */
export function petunjukKetuk(l: LBingkai | LBalok, i: number): string {
  if (l.tipe === "bingkai" && l.mode === "penuh") return l.isi[i] < 10 ? "Bingkai itu masih punya kotak kosong. Cari bingkai yang semua kotaknya terisi." : "Bingkai itu belum yang benar. Periksa lagi kotak yang terisi.";
  if (l.tipe === "balok" && l.mode === "pilih") {
    const [p, s] = l.koleksi[i];
    return p === l.target % 10 && s === Math.floor(l.target / 10) ? "Angka puluhan dan satuannya tertukar. Batang dibaca lebih dulu sebagai puluhan, lalu kotak kecil sebagai satuan." : "Hitung banyak batang sebagai puluhan, lalu banyak kotak kecil sebagai satuan. Susunan itu belum sama dengan bilangannya.";
  }
  return "Periksa lagi gambarnya.";
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
export const barisIgil = (l: LIgil): string[] => [`${l.p} ikat penuh, tiap ikat berisi 10`, `${l.s} benda lepas`];
export const barisBingkaiPenuh = (n: number, i: number): string => `Bingkai ${huruf(i)}: ${n} kotak terisi, ${10 - n} kosong`;
export const barisBingkaiHitung = (l: LBingkai & { mode: "hitung" }): string[] => [`${l.p} bingkai penuh`, `Bingkai terakhir: ${l.s} kotak terisi`];
export const barisLoncat = (l: LLoncat, cara: Cara): string[] =>
  cara === "kanvas" ? ["Mulai dari 0", `Melompat 10 demi 10 sampai ${hasilLoncat(l)}`] : [`Mulai dari ${l.awal}`, `Melompat 10 demi 10 sebanyak ${l.k} lompatan`];
export const barisBalok = (b: [number, number], i: number): string => `Susunan ${huruf(i)}: ${b[0]} batang dan ${b[1]} kotak kecil`;
export const barisBalokTunggal = (p: number, s: number): string => `${p} batang dan ${s} kotak kecil`;
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
