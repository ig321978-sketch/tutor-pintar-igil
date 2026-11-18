/**
 * Logika murni Kelas 2 Bab 1 Sub-Bab B "Pesanan Kue Hari Olahraga" (puluhan dan satuan pada bilangan sampai lima puluh), tengah cerita Kue di Kantin Sekolah,
 * untuk tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-kasir-k2b1b.mjs.
 * Bilangan: t puluhan (kotak penuh isi sepuluh) dan s satuan (kue lepas); bilangan paling besar lima puluh.
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { acak } from "../ikan-k1b5a/logika";

export { acak, cocok, cocokKelompok, kelompokLabel, labelDari, IKON_CARA, NAMA_CARA, URUT_CARA, type Cara, type Label, type Tempat } from "../lemari-k1b1a/logika";

export const BATAS = 50;

/* ------------------------------ Kata bilangan sampai lima puluh (tanpa digit) ------------------------------ */
const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"] as const;
const PULUH = ["", "sepuluh", "dua puluh", "tiga puluh", "empat puluh", "lima puluh"] as const;
export function kata(n: number): string {
  if (!Number.isInteger(n) || n < 0 || n > BATAS) return String(n);
  if (n <= 9) return SATUAN[n];
  if (n === 11) return "sebelas";
  if (n > 11 && n < 20) return `${SATUAN[n - 10]} belas`;
  const p = Math.floor(n / 10);
  const s = n % 10;
  return s === 0 ? PULUH[p] : `${PULUH[p]} ${SATUAN[s]}`;
}
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

/* ------------------------------ Metode ------------------------------ */
export type Metode = "igil" | "balok" | "bagan" | "panjang";
export const URUT_METODE: Metode[] = ["igil", "balok", "bagan", "panjang"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Tabel Puluhan dan Satuan",
  balok: "Base-Ten Blocks: balok puluhan dan satuan",
  bagan: "Place Value Chart: bagan puluhan dan satuan",
  panjang: "Expanded Form: bentuk panjang",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F4CB}", balok: "\u{1F9F1}", bagan: "\u{1F4CA}", panjang: "\u{2795}" };

export type Rupa = "benda" | "diagram" | "lambang";
export type Kolom = "puluhan" | "satuan";

/* ------------------------------ Langkah soal ------------------------------ */
/** Metode IGIL: kotak penuh (puluhan) dan kue lepas (satuan) dipindah ke kolom tabelnya. Jawab: bilangan, banyak puluhan, atau banyak satuan. */
export type LangkahTabel = { tipe: "tabel"; set: string; t: number; s: number; tanya: "bilangan" | "puluhan" | "satuan"; benih: number };
/** Base-Ten Blocks: balok panjang (sepuluh) dan kubus kecil (satu). Satuan boleh sepuluh atau lebih: tukar sepuluh kubus dengan satu balok. Jawab: bilangan. */
export type LangkahBalok = { tipe: "balok"; set: string; t: number; s: number; benih: number };
/** Place Value Chart: bagan dua kolom. `bilangan`: susun kartu angka (Klik); `arti`: arti angka di satu kolom; `tukar`: bilangan baru setelah kartu ditukar tempat. `lingkari` (Kanvas): lingkari angka yang artinya cocok, tanpa jawaban angka. */
export type TanyaBagan = { t: "bilangan" } | { t: "arti"; kolom: Kolom } | { t: "tukar" };
export type LangkahBagan = { tipe: "bagan"; set: string; t: number; s: number; tanya: TanyaBagan; benih: number; lingkari?: Kolom };
/** Expanded Form: bilangan = puluhan + satuan. `susun` (Klik): pilih kartu puluhan dan satuan yang pas dan paling ringkas, tanpa jawaban angka. `gabung`: puluhan + satuan = ?. `satuan` / `puluhan`: bagian yang hilang. */
export type LangkahPanjang = { tipe: "panjang"; set: string; t: number; s: number; tanya: "susun" | "gabung" | "satuan" | "puluhan"; benih: number };
export type LangkahDasar = LangkahTabel | LangkahBalok | LangkahBagan | LangkahPanjang;
/**
 * Cari kesalahan: seorang tokoh sudah menjawab soal `dasar` dengan salah paham yang umum. Anak memutuskan benar atau salah,
 * memilih alasan yang benar dari tiga, lalu menjawab bilangan yang benar. `jawabTokoh` kosong bila salahnya pada kata yang dipakai.
 */
export type LangkahSalah = { tipe: "salah"; dasar: LangkahDasar; tokoh: string; jawabTokoh?: number; kataTokoh: string; alasan: [string, string, string]; benar: number; keliru: string };
export type Langkah = LangkahDasar | LangkahSalah;

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);
export function metodeLangkah(l: Langkah): Metode {
  const d = dasarDari(l);
  return d.tipe === "tabel" ? "igil" : d.tipe === "balok" ? "balok" : d.tipe === "bagan" ? "bagan" : "panjang";
}

/* ------------------------------ Hitungan ------------------------------ */
export const bilanganDari = (t: number, s: number): number => 10 * t + s;
/** Bilangan setelah dua kartu angka ditukar tempat (satuan jadi puluhan, puluhan jadi satuan). */
export const bilanganTukar = (t: number, s: number): number => 10 * s + t;
/** Kartu boleh ditukar: bilangan barunya paling besar lima puluh. */
export const bolehTukar = (t: number, s: number): boolean => bilanganTukar(t, s) <= BATAS;

/** Jawaban benar tiap langkah, dihitung dari datanya. Null bila soalnya hanya menyusun atau melingkari tanpa angka jawaban. */
export function kunciLangkah(l: Langkah): number | null {
  switch (l.tipe) {
    case "salah":
      return kunciLangkah(l.dasar);
    case "tabel":
      return l.tanya === "bilangan" ? bilanganDari(l.t, l.s) : l.tanya === "puluhan" ? l.t : l.s;
    case "balok":
      return bilanganDari(l.t, l.s);
    case "bagan":
      if (l.lingkari) return null;
      if (l.tanya.t === "bilangan") return bilanganDari(l.t, l.s);
      if (l.tanya.t === "tukar") return bilanganTukar(l.t, l.s);
      return l.tanya.kolom === "puluhan" ? 10 * l.t : l.s;
    case "panjang":
      return l.tanya === "susun" ? null : l.tanya === "gabung" ? bilanganDari(l.t, l.s) : l.tanya === "satuan" ? l.s : 10 * l.t;
  }
}
export const angkaJawab = kunciLangkah;

/** Tiga pilihan di sekitar jawaban (nol sampai lima puluh), memuat jawaban tokoh dan kesalahan yang paling lazim. */
export function pilihanDari(l: Langkah): number[] {
  const k = kunciLangkah(l) ?? 0;
  const d = dasarDari(l);
  const ada: number[] = [k];
  const taruh = (c: number) => {
    if (ada.length < 3 && Number.isInteger(c) && c >= 0 && c <= BATAS && !ada.includes(c)) ada.push(c);
  };
  if (l.tipe === "salah" && l.jawabTokoh !== undefined) taruh(l.jawabTokoh);
  const lazim = k >= 10 ? [bilanganTukar(d.t, d.s) === k ? -1 : bilanganTukar(d.t, d.s), d.t + d.s, k + 10, k - 10, k + 1, k - 1] : [k + 1, k - 1, k + 2, k + 10];
  for (const c of lazim) taruh(c);
  for (const c of [k + 2, k - 2, k + 3, k - 3]) taruh(c);
  for (let n = 0; ada.length < 3 && n <= BATAS; n += 1) taruh(n);
  return ada.sort((p, q) => p - q);
}

/* ------------------------------ Istilah menurut rupa ------------------------------ */
/** Kata untuk kotak penuh, kue lepas, balok, dan kubus di tiap rupa. Pictorial tanpa nama kue; Abstract tanpa benda. */
export function istilah(rupa: Rupa): { penuh: string; lepas: string; balok: string; kubus: string } {
  return rupa === "benda"
    ? { penuh: "kotak kue penuh", lepas: "kue lepas", balok: "balok panjang", kubus: "kubus kecil" }
    : { penuh: "bingkai penuh", lepas: "titik lepas", balok: "balok panjang", kubus: "kubus kecil" };
}

/** Petunjuk salah menurut rupa: Pictorial tanpa nama kue dan kotak (titik lepas, bingkai penuh); Abstract hanya puluhan dan satuan. */
export function sesuaikanPetunjuk(t: string, rupa: Rupa): string {
  if (rupa === "benda") return t;
  if (rupa === "diagram") return t.replace(/([Kk])otak penuh/g, (_m, h: string) => `${h === "K" ? "B" : "b"}ingkai penuh`).replace(/kue lepas/g, "titik lepas").replace(/Kue lepas/g, "Titik lepas");
  return t
    .replace(/Kotak penuh itu puluhan, jadi dihitung/g, "Puluhan dihitung")
    .replace(/Kue lepas itu satuan/g, "Satuan dihitung satu-satu")
    .replace(/Kotak penuh/g, "Puluhan")
    .replace(/kotak penuh/g, "puluhan")
    .replace(/kue lepas/g, "satuan")
    .replace(/Kue lepas/g, "Satuan");
}

/** Kalimat bilangan dalam kata untuk Abstract: "tiga puluh enam". */
export const bacaBilangan = (n: number): string => kata(n);

/* ------------------------------ Instruksi (tanpa digit) ------------------------------ */
const AKHIR: Record<Cara, string> = { klik: "Lalu pilih jawabannya.", kanvas: "Lalu tulis angkanya di kanvas.", suara: "Lalu ucapkan jawabannya." };

export function kalimatTanya(l: LangkahDasar): string {
  switch (l.tipe) {
    case "tabel":
      return l.tanya === "bilangan" ? "Bilangan berapa?" : l.tanya === "puluhan" ? "Berapa puluhan?" : "Berapa satuan?";
    case "balok":
      return "Bilangan berapa?";
    case "bagan":
      if (l.tanya.t === "bilangan") return "Bilangan berapa?";
      if (l.tanya.t === "tukar") return "Kartu ditukar tempat. Bilangan barunya berapa?";
      return `Angka di kolom ${l.tanya.kolom} artinya berapa?`;
    case "panjang":
      return l.tanya === "gabung" ? "Puluhan ditambah satuan sama dengan berapa?" : l.tanya === "satuan" ? "Satuan yang hilang berapa?" : l.tanya === "puluhan" ? "Puluhan yang hilang berapa?" : "";
  }
}

/** Cara menyebut angka yang dilingkari pada bagan: puluhan = "dua puluh", satuan = "sembilan saja". */
export function ungkapLingkari(l: LangkahBagan): string {
  return l.lingkari === "puluhan" ? kata(10 * l.t) : `${kata(l.s)} saja`;
}

/** Cara tugas dikerjakan: `langsung` = jawaban langsung tersedia dari gambar (soal siap saat dibuka), selain itu anak mengerjakan kegiatannya dulu. */
export type ModeLangkah = "langsung" | "pindah" | "ketuk" | "tanda" | "lingkari" | "susun";
export function modeLangkah(l: LangkahDasar, rupa: Rupa, cara: Cara): ModeLangkah {
  switch (l.tipe) {
    case "tabel":
      if (rupa === "lambang" || cara === "suara") return "langsung";
      return cara === "klik" ? "pindah" : "tanda";
    case "balok":
      if (rupa === "lambang" || cara === "suara") return "langsung";
      return cara === "klik" ? "ketuk" : "tanda";
    case "bagan":
      if (cara === "klik" && l.tanya.t === "bilangan") return "susun";
      if (cara === "kanvas" && l.lingkari) return "lingkari";
      return "langsung";
    case "panjang":
      return cara === "klik" && l.tanya === "susun" ? "susun" : "langsung";
  }
}

export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  const akhir = AKHIR[cara];
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu pilih jawaban yang benar.`;
  const w = istilah(rupa);
  const tanya = kalimatTanya(l);
  const mode = modeLangkah(l, rupa, cara);
  switch (l.tipe) {
    case "tabel":
      if (rupa === "lambang") return `Bacalah tabel puluhan dan satuan. ${tanya} ${akhir}`;
      if (mode === "pindah") return `Pilih tiap ${w.penuh}, lalu ketuk kolom puluhan. Pilih tiap ${w.lepas}, lalu ketuk kolom satuan. ${tanya} ${akhir}`;
      if (mode === "tanda") return `Beri tanda pada tiap ${w.penuh}. Jangan tandai ${w.lepas}. ${tanya} ${akhir}`;
      return `Lihat tabel puluhan dan satuan. ${tanya} ${akhir}`;
    case "balok":
      if (rupa === "lambang") return `Bacalah banyak balok panjang dan kubus kecil. Sepuluh kubus kecil bisa ditukar dengan satu balok panjang. ${tanya} ${akhir}`;
      if (mode === "ketuk") return l.s >= 10 ? `Tukar sepuluh kubus kecil dengan satu balok panjang dulu. Lalu ketuk tiap balok panjang, kemudian tiap kubus kecil. ${tanya} ${akhir}` : `Ketuk tiap balok panjang dulu, lalu tiap kubus kecil. ${tanya} ${akhir}`;
      if (mode === "tanda") return `Beri tanda pada tiap balok panjang. Jangan tandai kubus kecil. ${tanya} ${akhir}`;
      return `Lihat balok panjang dan kubus kecil. ${tanya} ${akhir}`;
    case "bagan":
      if (mode === "susun") return `Susun bilangannya: pilih kartu angka, lalu ketuk kolom puluhan atau kolom satuan yang pas. ${tanya} ${akhir}`;
      if (mode === "lingkari") return `Lihat bagan puluhan dan satuan. Lingkari angka yang artinya ${ungkapLingkari(l)}.`;
      return `Lihat bagan puluhan dan satuan. ${tanya} ${akhir}`;
    case "panjang":
      if (mode === "susun") return "Susun bentuk panjang: pilih kartu puluhan dan kartu satuan yang pas, lalu ketuk tempatnya. Pilih cara yang paling ringkas.";
      if (rupa === "lambang") return `Bacalah bentuk panjang. ${tanya} ${akhir}`;
      return `Lihat bentuk panjang. ${tanya} ${akhir}`;
  }
}

/* ------------------------------ Petunjuk saat jawaban bilangan salah (menunjuk kesalahannya, tanpa digit) ------------------------------ */
export function petunjukSalah(l: Langkah, m: number): string {
  if (l.tipe === "salah") {
    if (l.jawabTokoh !== undefined && m === l.jawabTokoh) return `Itu jawaban ${l.tokoh} yang keliru. ${l.keliru}`;
    return petunjukSalah(l.dasar, m);
  }
  const k = kunciLangkah(l) ?? 0;
  const lebih = m > k;
  const sama = (a: number | null) => a !== null && m === a;
  switch (l.tipe) {
    case "tabel":
      if (l.tanya === "bilangan") {
        if (sama(l.t + l.s)) return "Itu jumlah banyaknya, bukan bilangannya. Kotak penuh itu puluhan, jadi dihitung sepuluh-sepuluh. Kue lepas itu satuan.";
        if (sama(bilanganTukar(l.t, l.s))) return "Letak angkanya tertukar. Puluhan ada di kolom kiri, satuan di kolom kanan.";
        return lebih ? "Terlalu besar. Hitung kotak penuh sepuluh-sepuluh, lalu tambahkan kue lepas satu-satu." : "Masih kurang. Kotak penuh dihitung sepuluh-sepuluh, bukan satu-satu.";
      }
      return lebih ? "Terlalu banyak. Baca hanya angka di kolom yang ditanyakan." : "Masih kurang. Hitung lagi isi kolom yang ditanyakan.";
    case "balok":
      if (l.s >= 10 && sama(l.t + l.s)) return "Itu jumlah balok dan kubus. Satu balok panjang sama dengan sepuluh kubus, jadi tukar sepuluh kubus dengan satu balok dulu.";
      if (sama(l.t + l.s)) return "Itu jumlah banyaknya. Satu balok panjang itu sepuluh, bukan satu.";
      return lebih ? "Terlalu besar. Hitung balok panjang sepuluh-sepuluh, lalu kubus kecil satu-satu." : "Masih kurang. Satu balok panjang itu sepuluh, jangan lupa menghitungnya.";
    case "bagan":
      if (l.tanya.t === "tukar") return sama(bilanganDari(l.t, l.s)) ? "Itu bilangan sebelum kartu ditukar. Setelah ditukar, angka kiri jadi puluhan dan angka kanan jadi satuan." : "Setelah ditukar, angka yang tadi di satuan pindah ke puluhan, dan sebaliknya.";
      if (l.tanya.t === "arti") return l.tanya.kolom === "puluhan" ? (sama(l.t) ? "Itu angkanya saja. Angka di kolom puluhan artinya puluhan, yaitu sepuluh kali angka itu." : "Angka di kolom puluhan artinya sepuluh kali angkanya.") : "Angka di kolom satuan artinya angka itu sendiri.";
      return sama(bilanganTukar(l.t, l.s)) ? "Letak angkanya tertukar. Angka kiri itu puluhan, angka kanan itu satuan." : lebih ? "Terlalu besar. Baca puluhan dulu, lalu satuan." : "Masih kurang. Angka kiri artinya sepuluh kali angkanya.";
    case "panjang":
      if (l.tanya === "gabung") return sama(l.t + l.s) ? "Itu jumlah angka-angkanya. Puluhan dan satuan dijumlahkan sebagai bilangan, bukan sebagai angka." : lebih ? "Terlalu besar. Jumlahkan puluhan dan satuannya saja." : "Masih kurang. Jumlahkan puluhan dan satuannya.";
      if (l.tanya === "satuan") return lebih ? "Satuan yang hilang lebih kecil. Kurangi bilangan dengan puluhannya." : "Satuan yang hilang lebih besar. Kurangi bilangan dengan puluhannya.";
      return lebih ? "Puluhan yang hilang lebih kecil. Puluhan itu kelipatan sepuluh." : "Puluhan yang hilang lebih besar. Puluhan itu kelipatan sepuluh.";
  }
}

/* ------------------------------ Kalimat yang menjelaskan jawaban benar (tanpa digit) ------------------------------ */
export function kalimatKunci(l: LangkahDasar): string {
  const k = kunciLangkah(l);
  switch (l.tipe) {
    case "tabel":
      return l.tanya === "bilangan" ? `${besar(kata(l.t))} puluhan dan ${kata(l.s)} satuan, jadi bilangannya ${kata(10 * l.t + l.s)}.` : l.tanya === "puluhan" ? `Ada ${kata(l.t)} puluhan.` : `Ada ${kata(l.s)} satuan.`;
    case "balok":
      return l.s >= 10 ? `Sepuluh kubus ditukar satu balok, jadi ${kata(l.t + 1)} balok dan ${kata(l.s - 10)} kubus: ${kata(k ?? 0)}.` : `${besar(kata(l.t))} balok panjang dan ${kata(l.s)} kubus kecil, jadi ${kata(k ?? 0)}.`;
    case "bagan":
      if (l.lingkari) return l.lingkari === "puluhan" ? `Angka di kolom puluhan artinya ${kata(10 * l.t)}.` : `Angka di kolom satuan artinya ${kata(l.s)} saja.`;
      if (l.tanya.t === "tukar") return `Setelah ditukar, ${kata(l.s)} jadi puluhan dan ${kata(l.t)} jadi satuan: ${kata(bilanganTukar(l.t, l.s))}.`;
      if (l.tanya.t === "arti") return l.tanya.kolom === "puluhan" ? `Angka ${kata(l.t)} di kolom puluhan artinya ${kata(10 * l.t)}.` : `Angka ${kata(l.s)} di kolom satuan artinya ${kata(l.s)}.`;
      return `${besar(kata(l.t))} puluhan dan ${kata(l.s)} satuan, jadi ${kata(k ?? 0)}.`;
    case "panjang":
      if (l.tanya === "susun") return `${besar(kata(10 * l.t))} ditambah ${kata(l.s)} adalah bentuk panjang yang paling ringkas.`;
      return `${besar(kata(10 * l.t))} ditambah ${kata(l.s)} sama dengan ${kata(10 * l.t + l.s)}.`;
  }
}

/** Kartu pilihan untuk menyusun bentuk panjang (Klik): dua kartu yang pas dan dua kartu yang benar jumlahnya tetapi belum paling ringkas. Perlu t >= 2. */
export function kartuPanjang(t: number, s: number): { puluhan: [number, number]; satuan: [number, number] } {
  return { puluhan: [10 * t, 10 * (t - 1)], satuan: [s, s + 10] };
}

/** Kartu angka untuk menyusun bilangan (Klik bagan): angka puluhan, angka satuan, dan dua pengecoh yang berbeda, diacak tetap menurut benih. */
export function kartuAngka(t: number, s: number, benih: number): number[] {
  const pengecoh: number[] = [];
  for (const c of [(t + 3) % 10, (s + 4) % 10, (t + 5) % 10, (s + 2) % 10, (t + 7) % 10, (s + 6) % 10, 1, 8]) if (c !== t && c !== s && !pengecoh.includes(c) && pengecoh.length < 2) pengecoh.push(c);
  return acak([t, s, ...pengecoh].map((v, i) => ({ v, i })), benih).map((x) => x.v);
}

/** Letak benda ke-i dari n yang dihitung satu-satu atau sepuluh-sepuluh: urutan tetap. */
export const urutan = (n: number): number[] => Array.from({ length: n }, (_, i) => i);

/* ------------------------------ Simulasi Meja Kasir ------------------------------ */
export type ModeKasir = "meja" | "tabel" | "kartu" | "uraian";
export type KeadaanKasir = {
  alat: "kasir";
  mode: ModeKasir;
  /** Di meja: kotak penuh isi sepuluh dan kue lepas (boleh sepuluh atau lebih sebelum dikemas). */
  kotak: number;
  lepas: number;
  /** Dua kartu angka: puluhan (nol sampai lima) dan satuan (nol sampai sembilan). */
  kartuP: number;
  kartuS: number;
  /** Tercatat sekali tercapai: pesanan tersusun dari kotak dan kue lepas, banyak kemas sepuluh, tabel dibaca, bentuk panjang dibuka, kartu ditukar, nol di satuan dibaca. */
  susun: boolean;
  kemas: number;
  tabelDilihat: boolean;
  uraianDilihat: boolean;
  tukarTuntas: number;
  nolDilihat: boolean;
};

/** Contoh pesanan di meja (berbeda dari Story): satu kali sentuh menyusun kotak dan kue lepasnya. */
export const CONTOH_PESANAN = [17, 26, 32, 45, 50] as const;
export const MAKS_KOTAK = 5;
export const MAKS_LEPAS = 19;

export const awalKasir = (): KeadaanKasir => ({ alat: "kasir", mode: "meja", kotak: 0, lepas: 0, kartuP: 1, kartuS: 2, susun: false, kemas: 0, tabelDilihat: false, uraianDilihat: false, tukarTuntas: 0, nolDilihat: false });
export const bilanganMeja = (k: KeadaanKasir): number => 10 * k.kotak + k.lepas;
/** Satuan kurang dari sepuluh: cara tulis yang paling ringkas. */
export const sudahRingkas = (k: KeadaanKasir): boolean => k.lepas <= 9;

/** Catat apa yang sudah tercapai (hanya menambah, tidak mencabut). */
function catat(k: KeadaanKasir): KeadaanKasir {
  const ringkas = k.kotak >= 1 && k.lepas >= 1 && k.lepas <= 9;
  return {
    ...k,
    susun: k.susun || ringkas,
    tabelDilihat: k.tabelDilihat || (k.mode === "tabel" && ringkas),
    uraianDilihat: k.uraianDilihat || (k.mode === "uraian" && ringkas),
    nolDilihat: k.nolDilihat || (k.mode === "tabel" && k.kotak >= 1 && k.lepas === 0),
  };
}
export const pilihModeKasir = (k: KeadaanKasir, mode: ModeKasir): KeadaanKasir => catat({ ...k, mode });
const boleh = (kotak: number, lepas: number): boolean => kotak >= 0 && kotak <= MAKS_KOTAK && lepas >= 0 && lepas <= MAKS_LEPAS && 10 * kotak + lepas <= BATAS;
function ubahMeja(k: KeadaanKasir, kotak: number, lepas: number): { k: KeadaanKasir; ok: boolean } {
  if (!boleh(kotak, lepas)) return { k, ok: false };
  return { k: catat({ ...k, kotak, lepas }), ok: true };
}
export const tambahKotak = (k: KeadaanKasir) => ubahMeja(k, k.kotak + 1, k.lepas);
export const kurangiKotak = (k: KeadaanKasir) => ubahMeja(k, k.kotak - 1, k.lepas);
export const tambahLepas = (k: KeadaanKasir) => ubahMeja(k, k.kotak, k.lepas + 1);
export const kurangiLepas = (k: KeadaanKasir) => ubahMeja(k, k.kotak, k.lepas - 1);
/** Tukar sepuluh kue lepas dengan satu kotak penuh. Perlu paling sedikit sepuluh kue lepas. */
export function kemasSepuluh(k: KeadaanKasir): { k: KeadaanKasir; ok: boolean } {
  if (k.lepas < 10 || k.kotak + 1 > MAKS_KOTAK) return { k, ok: false };
  return { k: catat({ ...k, kotak: k.kotak + 1, lepas: k.lepas - 10, kemas: k.kemas + 1 }), ok: true };
}
/** Buka satu kotak penuh menjadi sepuluh kue lepas. Hanya bila kue lepas masih kurang dari sepuluh (supaya tidak lebih dari sembilan belas). */
export function bukaKotak(k: KeadaanKasir): { k: KeadaanKasir; ok: boolean } {
  if (k.kotak < 1 || k.lepas > 9) return { k, ok: false };
  return { k: catat({ ...k, kotak: k.kotak - 1, lepas: k.lepas + 10 }), ok: true };
}
/** Susun contoh pesanan (kotak penuh dan kue lepas yang sudah ringkas). */
export function aturPesanan(k: KeadaanKasir, n: number): KeadaanKasir {
  return n >= 0 && n <= BATAS ? catat({ ...k, kotak: Math.floor(n / 10), lepas: n % 10 }) : k;
}

/** Ubah satu kartu angka: puluhan berputar nol sampai lima, satuan nol sampai sembilan. Bilangan kartu paling besar lima puluh. */
export function ubahKartu(k: KeadaanKasir, kolom: Kolom): KeadaanKasir {
  let p = k.kartuP;
  let s = k.kartuS;
  if (kolom === "puluhan") p = (p + 1) % (MAKS_KOTAK + 1);
  else s = (s + 1) % 10;
  if (10 * p + s > BATAS) s = 0;
  return { ...k, kartuP: p, kartuS: s };
}
export const bilanganKartu = (k: KeadaanKasir): number => 10 * k.kartuP + k.kartuS;
/** Tukar tempat dua kartu angka. Hanya bila bilangan barunya paling besar lima puluh. Dihitung tuntas bila angkanya berbeda. */
export function tukarKartu(k: KeadaanKasir): { k: KeadaanKasir; ok: boolean } {
  if (!bolehTukar(k.kartuP, k.kartuS)) return { k, ok: false };
  const tuntas = k.kartuP !== k.kartuS;
  return { k: { ...k, kartuP: k.kartuS, kartuS: k.kartuP, tukarTuntas: tuntas ? k.tukarTuntas + 1 : k.tukarTuntas }, ok: true };
}

/** Cara menulis bilangan di meja: yang paling ringkas dan satu cara lain yang belum ringkas (bila ada kotak). */
export function caraTulis(k: KeadaanKasir): { ringkas: [number, number]; lain: [number, number] | null } {
  const n = bilanganMeja(k);
  const t = Math.floor(n / 10);
  return { ringkas: [10 * t, n % 10], lain: t >= 1 ? [10 * (t - 1), (n % 10) + 10] : null };
}

/** Kalimat keadaan untuk suara (tanpa digit). */
export function kalimatKasir(k: KeadaanKasir): string {
  const n = bilanganMeja(k);
  if (k.mode === "meja") {
    if (n === 0) return "Meja masih kosong. Tambahkan kotak penuh dan kue lepas.";
    if (k.lepas >= 10) return `Di meja ada ${kata(k.kotak)} kotak penuh dan ${kata(k.lepas)} kue lepas. Sepuluh kue lepas bisa dikemas jadi satu kotak.`;
    return `Di meja ada ${kata(k.kotak)} kotak penuh dan ${kata(k.lepas)} kue lepas, jadi ${kata(n)} kue.`;
  }
  if (k.mode === "tabel") {
    if (n === 0) return "Tabel masih kosong. Susun pesanan di meja dulu.";
    if (k.lepas >= 10) return "Satuannya masih sepuluh atau lebih. Kemas dulu sepuluh kue lepas jadi satu kotak, supaya tabelnya paling ringkas.";
    return k.lepas === 0 ? `Puluhan ${kata(k.kotak)}, satuan nol. Nol artinya tidak ada kue lepas. Bilangannya ${kata(n)}.` : `Puluhan ${kata(k.kotak)}, satuan ${kata(k.lepas)}. Bilangannya ${kata(n)}.`;
  }
  if (k.mode === "kartu") {
    const baru = bilanganKartu(k);
    return `Kartu puluhan ${kata(k.kartuP)} dan kartu satuan ${kata(k.kartuS)}, jadi ${kata(baru)}. Tekan Tukar kartu untuk melihat letaknya berubah.`;
  }
  if (n === 0) return "Susun pesanan di meja dulu, baru buka bentuk panjangnya.";
  if (k.lepas >= 10) return "Kemas dulu sepuluh kue lepas jadi satu kotak. Bentuk panjang yang ringkas punya satuan kurang dari sepuluh.";
  const c = caraTulis(k);
  return `${besar(kata(n))} sama dengan ${kata(c.ringkas[0])} ditambah ${kata(c.ringkas[1])}. Itu cara yang paling ringkas.`;
}
