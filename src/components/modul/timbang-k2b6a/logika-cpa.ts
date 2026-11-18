/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 2 Bab 6 Sub-Bab A "Peralatan Lomba Pak Anton" (berat benda): jenis tugas, kunci,
 * pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-timbang-k2b6a.mjs.
 * Jawaban bukan hanya angka: memilih kata (lebih berat, lebih ringan, sama berat; berat, ringan, sama; bawah, atas, seimbang), mengetuk batang, neraca, atau benda
 * berurutan, mengucapkan satu bilangan, dan satu angka di kanvas. Kunci dihitung dari berat benda (bukan kunci tetap).
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { kata } from "../lemari-k1b1a/logika";

export { IKON_CARA, NAMA_CARA, URUT_CARA, kata, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);
export const HURUF = ["A", "B", "C", "D", "E", "F"] as const;

/* ------------------------------ Kata jawaban ------------------------------ */
export type KataJ = "lebih berat" | "lebih ringan" | "sama berat" | "berat" | "ringan" | "sama" | "bawah" | "atas" | "seimbang";
export const GRUP_KATA: KataJ[][] = [
  ["lebih berat", "lebih ringan", "sama berat"],
  ["berat", "ringan", "sama"],
  ["bawah", "atas", "seimbang"],
];

/** Benda untuk rupa Concrete (emoji paling tinggi U+1FA95). Berbeda dari data Story (kerucut, kantong pasir, bola, raket, botol, boneka, kelereng, koin, buah). */
export const OBJEK = [
  { nama: "balon", emoji: "\u{1F388}", warna: "#FCA5A5", garis: "#991B1B" },
  { nama: "batu bata", emoji: "\u{1F9F1}", warna: "#FDBA74", garis: "#9A3412" },
  { nama: "ransel", emoji: "\u{1F392}", warna: "#93C5FD", garis: "#1E3A8A" },
  { nama: "sepatu", emoji: "\u{1F45F}", warna: "#C4B5FD", garis: "#4C1D95" },
  { nama: "topi", emoji: "\u{1F9E2}", warna: "#FDE68A", garis: "#92400E" },
  { nama: "piala", emoji: "\u{1F3C6}", warna: "#FDE047", garis: "#A16207" },
  { nama: "medali", emoji: "\u{1F947}", warna: "#FEF08A", garis: "#854D0E" },
  { nama: "keranjang", emoji: "\u{1F9FA}", warna: "#D6A57A", garis: "#78350F" },
  { nama: "kardus", emoji: "\u{1F4E6}", warna: "#E7C9A0", garis: "#78350F" },
  { nama: "gelas", emoji: "\u{1F964}", warna: "#A5F3FC", garis: "#155E75" },
  { nama: "kaus kaki", emoji: "\u{1F9E6}", warna: "#F9A8D4", garis: "#9D174D" },
  { nama: "kaos lari", emoji: "\u{1F3BD}", warna: "#BBF7D0", garis: "#166534" },
] as const;

/* ------------------------------ Langkah ------------------------------ */
/** Satu benda: berat `w` (dalam kotak, tidak ditulis di rupa Concrete), nomor benda `o` (hanya Concrete), `besar` = digambar lebih besar (ukuran tidak menentukan berat). */
export type Benda = { w: number; o?: number; besar?: boolean };

/**
 * Metode IGIL "Angkat, Timbang, Bandingkan". banding: dua benda di papan (klik: pilih lebih berat, lebih ringan, sama berat untuk benda kiri; suara: ucapkan berat, ringan, atau sama);
 * satuan: satu benda seimbang dengan beberapa satuan sejenis (kanvas: banyak satuan).
 */
export type LIgil = { tipe: "igil"; mode: "banding"; kiri: Benda; kanan: Benda } | { tipe: "igil"; mode: "satuan"; benda: Benda; satuan: Benda };
/** Bar Model (Model Batang): batang tiap benda. Klik: ketuk batang benda yang paling berat atau paling ringan; kanvas: selisih tinggi tertinggi dan terendah; suara: tinggi batang tertinggi. */
export type LBatang = { tipe: "batang"; items: Benda[]; cari: "terberat" | "teringan" };
/** Dot Balance (Neraca Titik): neraca dengan titik tiap piringan. Klik: ketuk neraca yang seimbang; kanvas: selisih titik neraca pertama; suara: kedudukan piringan kiri neraca pertama. */
export type LTitik = { tipe: "titik"; pasang: [Benda, Benda][] };
/**
 * Heavy First (Berat di Dasar). urut: hasil timbang berpasangan (indeks benda) lalu urutkan dari yang paling berat (klik: ketuk berurutan; suara: urutan ke berapa dari bawah
 * untuk benda bertanda); rantai: 1 benda a sama dengan r1 benda b, 1 benda b sama dengan r2 benda c (kanvas: banyak benda c yang sama berat dengan 1 benda a).
 */
export type LDasar = { tipe: "dasar"; mode: "urut"; items: Benda[]; pasang: [number, number][]; tanda: number } | { tipe: "dasar"; mode: "rantai"; a: Benda; b: Benda; c: Benda; r1: number; r2: number };
export type LangkahDasar = LIgil | LBatang | LTitik | LDasar;
/** Cari kesalahan: tokoh sudah menjawab tentang papan `dasar` (igil banding). Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LIgil & { mode: "banding" };
  tokoh: string;
  kataTokoh: string;
  jawabTokoh?: KataJ;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "batang" | "titik" | "dasar";
export const URUT_METODE: Metode[] = ["igil", "batang", "titik", "dasar"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Angkat, Timbang, Bandingkan",
  batang: "Bar Model: Model Batang",
  titik: "Dot Balance: Neraca Titik",
  dasar: "Heavy First: Berat di Dasar",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{2696}", batang: "\u{1F4CA}", titik: "\u{1F7E1}", dasar: "\u{1F4E6}" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);
export const metodeLangkah = (l: Langkah): Metode => (l.tipe === "salah" ? "igil" : l.tipe);

/* ------------------------------ Hitungan dari berat ------------------------------ */
export type Arah = "kiri" | "kanan" | "datar";
/** Sisi yang turun pada papan atau neraca: yang lebih berat turun. */
export const sisiTurun = (kiri: number, kanan: number): Arah => (kiri > kanan ? "kiri" : kiri < kanan ? "kanan" : "datar");
export const bandingKata = (kiri: Benda, kanan: Benda): "lebih berat" | "lebih ringan" | "sama berat" => (kiri.w > kanan.w ? "lebih berat" : kiri.w < kanan.w ? "lebih ringan" : "sama berat");
export const jumlahSatuan = (l: LIgil & { mode: "satuan" }): number => l.benda.w / l.satuan.w;
export const tertinggi = (items: readonly Benda[]): number => Math.max(...items.map((b) => b.w));
export const terendah = (items: readonly Benda[]): number => Math.min(...items.map((b) => b.w));
/** Nomor batang yang benar diketuk (benda paling berat atau paling ringan, harus tunggal). */
export const nomorBatang = (l: LBatang): number => {
  const target = l.cari === "terberat" ? tertinggi(l.items) : terendah(l.items);
  return l.items.findIndex((b) => b.w === target);
};
/** Nomor neraca yang seimbang (titik kedua piringan sama banyak). */
export const nomorSeimbang = (l: LTitik): number => l.pasang.findIndex(([a, b]) => a.w === b.w);
export const selisihTitik = (l: LTitik): number => Math.abs(l.pasang[0][0].w - l.pasang[0][1].w);
export const kedudukanKiri = (l: LTitik): "bawah" | "atas" | "seimbang" => (l.pasang[0][0].w > l.pasang[0][1].w ? "bawah" : l.pasang[0][0].w < l.pasang[0][1].w ? "atas" : "seimbang");
/** Urutan benda dari yang paling berat (indeks benda). */
export const urutBenar = (l: LDasar & { mode: "urut" }): number[] => l.items.map((_, i) => i).sort((p, q) => l.items[q].w - l.items[p].w);
/** Benda bertanda berada di urutan ke berapa dari bawah (paling berat paling bawah = urutan pertama). */
export const urutanTanda = (l: LDasar & { mode: "urut" }): number => urutBenar(l).indexOf(l.tanda) + 1;
export const hasilRantai = (l: LDasar & { mode: "rantai" }): number => l.r1 * l.r2;
/** Hasil timbang berpasangan menentukan urutan lengkap? (setiap benda bertemu paling sedikit satu pasangan dan semua pasangan terhubung) */
export function pasanganCukup(l: LDasar & { mode: "urut" }): boolean {
  const n = l.items.length;
  const tetangga = l.pasang.reduce<number[][]>((m, [p, q]) => {
    m[p].push(q);
    m[q].push(p);
    return m;
  }, Array.from({ length: n }, () => []));
  const lihat = new Set<number>([0]);
  const antre = [0];
  while (antre.length) {
    const i = antre.pop() as number;
    for (const j of tetangga[i]) if (!lihat.has(j)) {
      lihat.add(j);
      antre.push(j);
    }
  }
  const beratBeda = new Set(l.items.map((b) => b.w)).size === n;
  // Setiap benda yang bersebelahan dalam urutan berat harus pernah ditimbang berpasangan.
  const urut = urutBenar(l);
  const berdampingan = urut.slice(1).every((q, i) => l.pasang.some(([a, b]) => (a === q && b === urut[i]) || (a === urut[i] && b === q)));
  return lihat.size === n && beratBeda && berdampingan;
}

export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: KataJ };

/** Kunci tiap tugas menurut caranya, dihitung dari data. Null bila tugas selesai lewat kegiatan (mengetuk). */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "igil":
      if (l.mode === "satuan") return cara === "kanvas" ? { jenis: "angka", n: jumlahSatuan(l) } : null;
      if (cara === "klik") return { jenis: "nama", nama: bandingKata(l.kiri, l.kanan) };
      return { jenis: "nama", nama: l.kiri.w > l.kanan.w ? "berat" : l.kiri.w < l.kanan.w ? "ringan" : "sama" };
    case "batang":
      if (cara === "klik") return null;
      return { jenis: "angka", n: cara === "kanvas" ? tertinggi(l.items) - terendah(l.items) : tertinggi(l.items) };
    case "titik":
      if (cara === "klik") return null;
      if (cara === "kanvas") return { jenis: "angka", n: selisihTitik(l) };
      return { jenis: "nama", nama: kedudukanKiri(l) };
    case "dasar":
      if (l.mode === "rantai") return { jenis: "angka", n: hasilRantai(l) };
      if (cara === "suara") return { jenis: "angka", n: urutanTanda(l) };
      return null;
  }
}

/** Jawaban tugas yang diselesaikan dengan mengetuk (klik): nomor batang atau neraca yang benar; urutan benda untuk Berat di Dasar ada di `urutBenar`. */
export function nomorKetuk(l: LangkahDasar): number {
  if (l.tipe === "batang") return nomorBatang(l);
  if (l.tipe === "titik") return nomorSeimbang(l);
  if (l.tipe === "dasar" && l.mode === "urut") return urutBenar(l)[0];
  return -1;
}

/**
 * Apakah tugas langsung siap dijawab (tanpa kegiatan lebih dulu)? Kanvas dan suara: ya (gambar sudah jadi). Klik: hanya bila punya kunci tanpa kegiatan.
 * Cari kesalahan selalu memakai kegiatan. Tidak bergantung pada rupa, sehingga tidak macet pada lambang.
 */
export function siapLangsung(l: Langkah, rupa: Rupa, cara: Cara): boolean {
  void rupa;
  if (l.tipe === "salah") return false;
  return kunciJawab(l, cara) !== null;
}

/** Pilihan kata di sekitar kunci: seluruh kelompoknya. */
export function pilihanKataDari(nama: KataJ): KataJ[] {
  return GRUP_KATA.find((g) => g.includes(nama)) ?? GRUP_KATA[0];
}
/** Pilihan angka untuk cadangan ketuk (suara): kunci dan dua angka di dekatnya, satu sampai sembilan. */
export function pilihanAngka(n: number): number[] {
  const mulai = Math.max(1, Math.min(7, n - 1));
  return [mulai, mulai + 1, mulai + 2];
}
export function pilihanKata(l: Langkah): KataJ[] {
  const k = kunciJawab(l, "klik");
  return k?.jenis === "nama" ? pilihanKataDari(k.nama) : [];
}
/** Pilihan cadangan untuk tugas suara atau klik yang menjawab dengan kata atau bilangan (kata-kata). */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k) return [];
  return k.jenis === "nama" ? pilihanKataDari(k.nama) : pilihanAngka(k.n).map(kata);
}

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : "gambar");
const sisi = (a: Arah): string => (a === "kiri" ? "sisi kiri" : a === "kanan" ? "sisi kanan" : "kedua sisi");

/** Penjelasan benda kiri dibanding benda kanan (tanpa digit). */
export function kalimatBanding(kiri: Benda, kanan: Benda): string {
  const k = bandingKata(kiri, kanan);
  if (k === "sama berat") return "Papan datar, jadi kedua benda sama berat.";
  return k === "lebih berat" ? "Sisi kiri turun, jadi benda kiri lebih berat daripada benda kanan." : "Sisi kiri naik, jadi benda kiri lebih ringan daripada benda kanan.";
}

export function kalimatKunci(l: Langkah, cara: Cara, rupa: Rupa = "benda"): string {
  void rupa;
  const d = dasarDari(l);
  const kunci = kunciJawab(l, cara);
  const n = kunci?.jenis === "angka" ? kunci.n : 0;
  switch (d.tipe) {
    case "igil":
      if (d.mode === "banding") return kalimatBanding(d.kiri, d.kanan);
      return `Benda itu seimbang dengan ${kata(n)} satuan, karena berat benda dibagi berat satu satuan.`;
    case "batang":
      if (cara === "klik") return d.cari === "terberat" ? "Batang tertinggi menunjukkan benda yang paling berat." : "Batang terpendek menunjukkan benda yang paling ringan.";
      if (cara === "kanvas") return `Batang tertinggi lebih tinggi ${kata(n)} kotak daripada batang terpendek.`;
      return `Batang paling tinggi setinggi ${kata(n)} kotak.`;
    case "titik":
      if (cara === "klik") return "Titik kedua piringan sama banyak, jadi neraca itu seimbang.";
      if (cara === "kanvas") return `Piringan yang lebih berat punya ${kata(n)} titik lebih banyak.`;
      return kunci?.jenis === "nama" && kunci.nama === "bawah" ? "Piringan kiri punya titik lebih banyak, jadi turun dan berada di bawah." : kunci?.jenis === "nama" && kunci.nama === "atas" ? "Piringan kiri punya titik lebih sedikit, jadi naik dan berada di atas." : "Titik kedua piringan sama banyak, jadi neraca seimbang.";
    case "dasar":
      if (d.mode === "rantai") return `Satu benda pertama sama dengan ${kata(n)} benda terakhir, karena banyaknya dikalikan.`;
      if (cara === "klik") return "Benda yang paling berat ditaruh paling bawah, lalu yang lebih ringan di atasnya.";
      return `Benda bertanda berada di urutan ${n === 1 ? "pertama" : `ke${kata(n)}`} dari bawah.`;
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  switch (l.tipe) {
    case "igil":
      if (l.mode === "satuan") return `Satu benda ditimbang dengan satuan sejenis, dan papan jadi seimbang. Benda itu sama berat dengan berapa satuan? Tulis satu angka di kanvas.`;
      if (cara === "klik") return `Lihat papan pada ${g} ini. Dibandingkan dengan benda di sisi kanan, benda di sisi kiri lebih berat, lebih ringan, atau sama berat?`;
      return `Lihat papan pada ${g} ini. Benda di sisi kiri dibandingkan dengan benda di sisi kanan: berat, ringan, atau sama? Ucapkan satu kata.`;
    case "batang":
      if (cara === "klik") return l.cari === "terberat" ? `Bar Model: ketuk batang benda yang paling berat.` : `Bar Model: ketuk batang benda yang paling ringan.`;
      if (cara === "kanvas") return `Bar Model: hitung kotak batang tertinggi dan batang terpendek. Berapa kotak selisih tingginya? Tulis satu angka di kanvas.`;
      return `Bar Model: batang paling tinggi setinggi berapa kotak? Ucapkan satu bilangan.`;
    case "titik":
      if (cara === "klik") return `Dot Balance: tiap neraca punya titik di kedua piringannya. Ketuk neraca yang seimbang.`;
      if (cara === "kanvas") return `Dot Balance: hitung titik di kedua piringan. Selisih titiknya berapa? Tulis satu angka di kanvas.`;
      return `Dot Balance: piringan kiri berada di bawah, di atas, atau seimbang? Ucapkan satu kata.`;
    case "dasar":
      if (l.mode === "rantai") return `Heavy First: ikuti rantai perbandingannya. Satu benda pertama sama berat dengan berapa benda terakhir? Tulis satu angka di kanvas.`;
      if (cara === "klik") return `Heavy First: lihat hasil timbang berpasangan. Ketuk benda satu per satu, dari yang paling berat sampai yang paling ringan.`;
      return `Heavy First: benda paling berat ditaruh paling bawah. Benda yang bertanda bintang berada di urutan ke berapa dari bawah? Ucapkan satu bilangan.`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  if (d.tipe === "igil") return d.mode === "satuan" ? "Benda itu sama berat dengan berapa satuan?" : cara === "klik" ? "Benda kiri dibandingkan benda kanan, bagaimana beratnya?" : "Benda kiri dibandingkan benda kanan: berat, ringan, atau sama?";
  if (d.tipe === "batang") return cara === "kanvas" ? "Berapa kotak selisih batang tertinggi dan terendah?" : "Batang paling tinggi setinggi berapa kotak?";
  if (d.tipe === "titik") return cara === "kanvas" ? "Berapa titik selisih kedua piringan?" : "Piringan kiri berada di bawah, di atas, atau seimbang?";
  if (d.mode === "rantai") return "Satu benda pertama sama berat dengan berapa benda terakhir?";
  return "Benda bertanda ada di urutan ke berapa dari bawah?";
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya (tanpa digit). `jawab`: kata yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number, rupa: Rupa = "benda"): string {
  void rupa;
  if (l.tipe === "salah") {
    if (typeof jawab === "string" && l.jawabTokoh !== undefined && jawab === l.jawabTokoh) return `Itu jawaban ${l.tokoh} yang keliru. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab, rupa);
  }
  if (l.tipe === "igil") {
    if (l.mode === "satuan") return "Berat benda dibagi berat satu satuan. Hitung berapa satuan yang menutupi berat benda itu.";
    return `Yang lebih berat berada lebih bawah. ${kalimatBanding(l.kiri, l.kanan)}`;
  }
  if (l.tipe === "batang") {
    if (cara === "kanvas") return "Hitung kotak batang tertinggi, lalu kotak batang terpendek, dan kurangkan keduanya.";
    return "Batang yang tinggi menunjukkan benda yang berat. Hitung kotak pada batang yang paling tinggi.";
  }
  if (l.tipe === "titik") {
    if (cara === "kanvas") return "Hitung titik di piringan kiri dan piringan kanan, lalu cari selisihnya.";
    return "Piringan yang titiknya lebih banyak lebih berat dan turun. Piringan yang titiknya lebih sedikit naik.";
  }
  if (l.mode === "rantai") return "Kalikan kedua rantai: satu benda pertama sama dengan beberapa benda kedua, dan tiap benda kedua sama dengan beberapa benda terakhir.";
  return "Urutkan dari yang paling berat. Benda paling berat berada paling bawah, jadi urutannya dihitung dari bawah.";
}

/** Petunjuk saat batang atau neraca yang diketuk keliru. */
export function petunjukKetuk(l: LBatang | LTitik, i: number): string {
  if (l.tipe === "batang") {
    const lain = l.items[i].w;
    return l.cari === "terberat" ? (lain < tertinggi(l.items) ? "Batang itu masih lebih pendek daripada batang lain. Yang paling berat batangnya paling tinggi." : "Cari batang yang paling tinggi.") : lain > terendah(l.items) ? "Batang itu masih lebih tinggi daripada batang lain. Yang paling ringan batangnya paling pendek." : "Cari batang yang paling pendek.";
  }
  const [a, b] = l.pasang[i];
  return a.w > b.w ? "Piringan kiri punya titik lebih banyak, jadi neraca itu miring ke kiri dan belum seimbang." : "Piringan kanan punya titik lebih banyak, jadi neraca itu miring ke kanan dan belum seimbang.";
}
/** Petunjuk saat benda yang diketuk bukan yang berikutnya dalam urutan paling berat (Heavy First klik). */
export function petunjukUrut(l: LDasar & { mode: "urut" }, ke: number, dipilih: number): string {
  const urut = urutBenar(l);
  const harusnya = urut[ke];
  const lebih = l.items[dipilih].w < l.items[harusnya].w;
  return lebih ? "Masih ada benda yang lebih berat. Urutan paling berat dulu, lalu yang lebih ringan." : "Benda itu terlalu berat untuk urutan ini, atau sudah dipakai. Periksa lagi hasil timbangnya.";
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
export const huruf = (i: number): string => HURUF[i] ?? "?";
const hurufSisi = (kiri: boolean): string => (kiri ? "P" : "Q");
/** Baris kartu kata untuk satu papan (banding): isi tiap sisi dan sisi yang turun. */
export function barisBanding(kiri: Benda, kanan: Benda): string[] {
  const t = sisiTurun(kiri.w, kanan.w);
  return [`Sisi kiri: benda ${hurufSisi(true)}`, `Sisi kanan: benda ${hurufSisi(false)}`, t === "datar" ? "Papan datar" : `Papan: ${sisi(t)} turun, ${sisi(t === "kiri" ? "kanan" : "kiri")} naik`];
}
export function barisSatuan(l: LIgil & { mode: "satuan" }): string[] {
  return [`Benda ${hurufSisi(true)} beratnya ${l.benda.w} kotak`, `Satu satuan beratnya ${l.satuan.w} kotak`];
}
export const barisBatang = (b: Benda, i: number): string => `Batang ${huruf(i)}: ${b.w} kotak`;
export const barisNeraca = (p: [Benda, Benda], i: number): string => `Neraca ${huruf(i)}: kiri ${p[0].w} titik, kanan ${p[1].w} titik`;
export function barisPasang(l: LDasar & { mode: "urut" }): string[] {
  return l.pasang.map(([p, q]) => {
    const berat = l.items[p].w > l.items[q].w ? p : q;
    const ringan = berat === p ? q : p;
    return `Hasil timbang: benda ${huruf(berat)} lebih berat daripada benda ${huruf(ringan)}`;
  });
}
export const barisRantai = (l: LDasar & { mode: "rantai" }): string[] => [`1 benda P sama dengan ${l.r1} benda Q`, `1 benda Q sama dengan ${l.r2} benda R`];
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
