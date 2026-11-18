/**
 * Logika murni Kelas 2 Bab 1 Sub-Bab C "Dua Nampan untuk Pesta Kue" (membandingkan dua bilangan atau lebih sampai lima puluh), akhir cerita
 * Kue di Kantin Sekolah, untuk tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-pesta-k2b1c.mjs. Bilangan paling besar lima puluh.
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { acak, cocok, cocokKelompok, kelompokLabel, labelDari, IKON_CARA, NAMA_CARA, URUT_CARA, type Cara, type Label, type Tempat } from "../lemari-k1b1a/logika";

export const BATAS = 50;

/* ------------------------------ Kata bilangan sampai lima puluh ------------------------------ */
const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"] as const;
/** Nama bilangan nol sampai lima puluh (tanpa digit). */
export function kata(n: number): string {
  if (n >= 0 && n <= 9) return SATUAN[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n >= 12 && n <= 19) return `${SATUAN[n - 10]} belas`;
  if (n >= 20 && n <= 50) return `${SATUAN[Math.floor(n / 10)]} puluh${n % 10 ? ` ${SATUAN[n % 10]}` : ""}`;
  return String(n);
}
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

/* ------------------------------ Metode ------------------------------ */
export type Metode = "igil" | "garis" | "patokan" | "batang";
export const URUT_METODE: Metode[] = ["igil", "garis", "patokan", "batang"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Puluhan Dulu, Lalu Satuan",
  garis: "Number Line: garis bilangan",
  patokan: "Benchmark Numbers: bilangan patokan",
  batang: "Bar Model: model batang",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F9C1}", garis: "\u{1F4CF}", patokan: "\u{1F6A9}", batang: "\u{1F4CA}" };

export type Rupa = "benda" | "diagram" | "lambang";
export type Banding = "besar" | "kecil" | "tengah";

/* ------------------------------ Hitungan dasar ------------------------------ */
export const puluhSatuan = (n: number): { p: number; s: number } => ({ p: Math.floor(n / 10), s: n % 10 });
/** Banding dua bilangan menurut puluhan dulu, lalu satuan: "lebih" (a lebih besar), "kurang" (a lebih kecil), atau "sama". */
export function bandingDua(a: number, b: number): "lebih" | "kurang" | "sama" {
  const x = puluhSatuan(a);
  const y = puluhSatuan(b);
  if (x.p !== y.p) return x.p > y.p ? "lebih" : "kurang";
  if (x.s !== y.s) return x.s > y.s ? "lebih" : "kurang";
  return "sama";
}
/** Satu-satunya cara memutuskan yang lebih besar yang dipakai di mana pun: puluhan dulu, lalu satuan (hasilnya sama dengan membandingkan angka biasa). */
export const lebihBesar = (a: number, b: number): boolean => bandingDua(a, b) === "lebih";
/** Banyaknya puluhan yang sama pada dua bilangan: satuan yang menentukan. */
export const puluhanSama = (a: number, b: number): boolean => puluhSatuan(a).p === puluhSatuan(b).p;
export const PATOKAN = [10, 20, 30, 40, 50] as const;
/** Patokan terdekat (bilangan yang satuannya lima tidak dipakai di soal karena sama dekat). */
export const patokanTerdekat = (n: number): number => Math.min(50, Math.max(10, Math.round(n / 10) * 10));
export const urutNaik = (isi: readonly number[]): number[] => [...isi].sort((p, q) => p - q);
export const urutTurun = (isi: readonly number[]): number[] => [...isi].sort((p, q) => q - p);
/** Bilangan awal garis bilangan: kelipatan lima di bawah bilangan terkecil. Garis membentang PANJANG_GARIS bilangan. */
export const PANJANG_GARIS = 15;
export const awalGaris = (isi: readonly number[]): number => Math.floor(Math.min(...isi) / 5) * 5;
export const cukupGaris = (isi: readonly number[]): boolean => Math.max(...isi) - awalGaris(isi) <= PANJANG_GARIS;

/** Bilangan yang dicari menurut `tanya` dari beberapa bilangan: paling besar, paling kecil, atau yang di tengah (tiga bilangan). */
export function dicari(isi: readonly number[], tanya: Banding): number {
  const u = urutNaik(isi);
  return tanya === "besar" ? u[u.length - 1] : tanya === "kecil" ? u[0] : u[Math.floor((u.length - 1) / 2)];
}
/** Nomor (dalam `isi`) bilangan yang dicari. */
export const indeksDicari = (isi: readonly number[], tanya: Banding): number => isi.indexOf(dicari(isi, tanya));

/* ------------------------------ Langkah soal ------------------------------ */
/** Metode IGIL: dua bilangan (nampan, diagram, atau angka). Bandingkan puluhan dulu, lalu satuan. Jawab: bilangan yang lebih besar (atau lebih kecil). */
export type LangkahPuluhan = { tipe: "puluhan"; a: number; b: number; tanya: "besar" | "kecil"; kue: number };
/** Number Line: tiga (atau dua) bilangan pada garis bilangan atau nampan yang disusun kiri ke kanan. Jawab: yang paling besar, paling kecil, atau yang di tengah. */
export type LangkahGaris = { tipe: "garis"; isi: number[]; tanya: Banding; kue: number };
/** Benchmark Numbers: satu bilangan dan lima patokan. Kegiatan: pilih patokan terdekat. Jawab (bila `angka`): patokan itu; bila tidak, cukup memilih. */
export type LangkahPatokan = { tipe: "patokan"; n: number; angka: boolean; kue: number };
/** Bar Model: beberapa batang sejajar dari garis yang sama. Jawab: bilangan pada batang yang paling panjang (atau paling pendek). */
export type LangkahBatang = { tipe: "batang"; isi: number[]; tanya: "besar" | "kecil"; kue: number };
export type LangkahDasar = LangkahPuluhan | LangkahGaris | LangkahPatokan | LangkahBatang;
/**
 * Cari kesalahan: seorang tokoh sudah menjawab soal `dasar`. Anak memutuskan benar atau salah, memilih alasan yang benar dari tiga,
 * lalu menjawab bilangan yang benar. `betul`: tokoh sebenarnya benar (anak memilih "benar", alasan menjelaskan mengapa benar).
 */
export type LangkahSalah = { tipe: "salah"; dasar: LangkahDasar; tokoh: string; jawabTokoh?: number; kataTokoh: string; alasan: [string, string, string]; benar: number; keliru: string; betul?: boolean };
export type Langkah = LangkahDasar | LangkahSalah;

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);
export function metodeLangkah(l: Langkah): Metode {
  const d = dasarDari(l);
  return d.tipe === "puluhan" ? "igil" : d.tipe;
}

/** Bilangan yang tampil pada tiap soal (urutan tetap sama dengan gambar). */
export function bilanganSoal(l: LangkahDasar): number[] {
  switch (l.tipe) {
    case "puluhan":
      return [l.a, l.b];
    case "patokan":
      return [l.n];
    default:
      return l.isi;
  }
}

/** Kunci tiap langkah, dihitung dari datanya. Null bila soalnya hanya meminta memilih tanpa angka jawaban. */
export function kunciLangkah(l: Langkah): number | null {
  switch (l.tipe) {
    case "salah":
      return kunciLangkah(l.dasar);
    case "puluhan":
      return l.tanya === "besar" ? (lebihBesar(l.a, l.b) ? l.a : l.b) : lebihBesar(l.a, l.b) ? l.b : l.a;
    case "garis":
    case "batang":
      return dicari(l.isi, l.tanya);
    case "patokan":
      return l.angka ? patokanTerdekat(l.n) : null;
  }
}
export const angkaJawab = kunciLangkah;

/**
 * Apakah soal langsung siap dijawab (tanpa kegiatan lebih dulu) pada rupa dan cara ini? Abstract (lambang) selalu langsung, kecuali memilih patokan tanpa angka
 * (tombol pilih patokan). Concrete dan Pictorial: hanya Rekam suara. `diam` (gambar bahan Cari kesalahan) tidak pernah langsung.
 */
export function siapLangsung(l: LangkahDasar, rupa: Rupa, cara: Cara, diam = false): boolean {
  if (diam) return false;
  if (rupa === "lambang") return l.tipe === "patokan" ? l.angka : true;
  return cara === "suara";
}

/** Nomor (dalam urutan gambar) benda atau batang yang harus ditunjuk. Patokan: nomor patokan terdekat (0 sampai 4). */
export function sasaranLangkah(l: LangkahDasar): number {
  switch (l.tipe) {
    case "puluhan":
      return l.tanya === "besar" ? (lebihBesar(l.a, l.b) ? 0 : 1) : lebihBesar(l.a, l.b) ? 1 : 0;
    case "garis":
    case "batang":
      return indeksDicari(l.isi, l.tanya);
    case "patokan":
      return PATOKAN.indexOf(patokanTerdekat(l.n) as (typeof PATOKAN)[number]);
  }
}

/** Tiga pilihan di sekitar kunci (nol sampai lima puluh), memuat bilangan pengecoh dari soal dan jawaban tokoh bila ada. */
export function pilihanDari(l: Langkah): number[] {
  const k = kunciLangkah(l) ?? 0;
  const ada: number[] = [k];
  if (l.tipe === "salah" && l.jawabTokoh !== undefined && !ada.includes(l.jawabTokoh)) ada.push(l.jawabTokoh);
  const d = dasarDari(l);
  const pengecoh = d.tipe === "patokan" ? [k - 10, k + 10, k - 20, k + 20] : bilanganSoal(d);
  for (const c of [...pengecoh, k + 1, k - 1, k + 10, k - 10]) if (ada.length < 3 && c >= 0 && c <= BATAS && !ada.includes(c)) ada.push(c);
  for (let n = 0; ada.length < 3 && n <= BATAS; n += 1) if (!ada.includes(n)) ada.push(n);
  return ada.sort((p, q) => p - q);
}

/* ------------------------------ Kalimat untuk Abstract dan jawaban ------------------------------ */
/** Kalimat yang menjelaskan jawaban benar (tanpa digit). */
export function kalimatKunci(l: LangkahDasar): string {
  const k = kunciLangkah(l);
  switch (l.tipe) {
    case "puluhan": {
      const sama = puluhanSama(l.a, l.b);
      const kata1 = sama ? "Puluhannya sama, jadi satuannya yang menentukan." : "Puluhan dulu: yang puluhannya lebih banyak lebih besar.";
      return `${kata1} Jadi bilangan yang lebih ${l.tanya === "besar" ? "besar" : "kecil"} adalah ${kata(k as number)}.`;
    }
    case "garis":
      return `Pada garis bilangan, yang lebih ke kanan lebih besar. Bilangan yang ${l.tanya === "besar" ? "paling besar" : l.tanya === "kecil" ? "paling kecil" : "di tengah"} adalah ${kata(k as number)}.`;
    case "patokan":
      return k === null ? "Patokan terdekat sudah dipilih. Kira-kira bilangan itu hampir sama dengan patokannya." : `Patokan terdekat adalah ${kata(k)}. Kira-kira bilangan itu hampir sama dengan ${kata(k)}.`;
    case "batang":
      return `Batang yang ${l.tanya === "besar" ? "paling panjang" : "paling pendek"} menunjukkan bilangan ${kata(k as number)}.`;
  }
}

/* ------------------------------ Instruksi (templat, tanpa digit) ------------------------------ */
const AKHIR: Record<Cara, string> = { klik: "Lalu pilih jawabannya.", kanvas: "Lalu tulis angkanya di kanvas.", suara: "Lalu ucapkan jawabannya." };
const lebih = (t: "besar" | "kecil") => (t === "besar" ? "lebih besar" : "lebih kecil");
const paling = (t: Banding) => (t === "besar" ? "paling besar" : t === "kecil" ? "paling kecil" : "di tengah");

/** Kalimat pertanyaan jawaban bilangan untuk sebuah soal dasar. */
export function kalimatTanya(l: LangkahDasar, rupa: Rupa): string {
  switch (l.tipe) {
    case "puluhan":
      return rupa === "benda" ? `Berapa banyak kue di nampan yang ${l.tanya === "besar" ? "lebih banyak" : "lebih sedikit"}?` : `Bilangan mana yang ${lebih(l.tanya)}?`;
    case "garis":
      return rupa === "benda" ? `Berapa banyak kue di nampan yang ${l.tanya === "tengah" ? "di tengah" : l.tanya === "besar" ? "paling banyak" : "paling sedikit"}?` : `Bilangan yang ${paling(l.tanya)} berapa?`;
    case "patokan":
      return rupa === "benda" ? "Patokan terdekat itu berapa kue?" : "Patokan terdekat berapa?";
    case "batang":
      return `Batang yang ${l.tanya === "besar" ? "paling panjang" : "paling pendek"} menunjukkan bilangan berapa?`;
  }
}

/** Instruksi lengkap satu langkah (suara dan judul soal), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu pilih jawaban yang benar.`;
  const akhir = AKHIR[cara];
  switch (l.tipe) {
    case "puluhan": {
      const jenis = l.tanya === "besar" ? "lebih banyak" : "lebih sedikit";
      if (rupa === "lambang") return `Bacalah kedua bilangan. Bandingkan puluhannya dulu, lalu satuannya. ${akhir}`;
      if (rupa === "diagram") {
        if (cara === "klik") return `Bandingkan kedua diagram: batang puluhan dulu, lalu kubus satuan. Ketuk diagram yang ${lebih(l.tanya)}. ${akhir}`;
        if (cara === "kanvas") return `Bandingkan kedua diagram: batang puluhan dulu, lalu kubus satuan. Lingkari diagram yang ${lebih(l.tanya)}. ${akhir}`;
        return `Bandingkan kedua diagram: batang puluhan dulu, lalu kubus satuan. ${akhir}`;
      }
      if (cara === "klik") return `Bandingkan kedua nampan: lihat kotak sepuluhnya dulu, lalu kue lepasnya. Ketuk nampan yang kuenya ${jenis}. ${akhir}`;
      if (cara === "kanvas") return `Bandingkan kedua nampan: lihat kotak sepuluhnya dulu, lalu kue lepasnya. Lingkari nampan yang kuenya ${jenis}. ${akhir}`;
      return `Bandingkan kedua nampan: lihat kotak sepuluhnya dulu, lalu kue lepasnya. ${akhir}`;
    }
    case "garis": {
      if (rupa === "lambang") return `Bacalah bilangan yang ada. Pada garis bilangan, yang lebih ke kanan lebih besar. ${akhir}`;
      if (rupa === "diagram") {
        if (cara === "klik") return `Letakkan titik pada garis bilangan sesuai bilangan yang diminta. Ketuk tandanya satu per satu. ${akhir}`;
        if (cara === "kanvas") return `Lihat titik pada garis bilangan. Lingkari titik yang ${l.tanya === "besar" ? "paling ke kanan" : "paling ke kiri"}. ${akhir}`;
        return `Lihat titik pada garis bilangan: yang lebih ke kanan lebih besar. ${akhir}`;
      }
      if (cara === "klik") return `Susun nampan dari yang kuenya paling sedikit di kiri sampai paling banyak di kanan. Ketuk nampan satu per satu. ${akhir}`;
      if (cara === "kanvas") return `Nampan disusun dari yang paling sedikit di kiri ke yang paling banyak di kanan. Lingkari nampan yang akan berada paling ${l.tanya === "besar" ? "kanan" : "kiri"}. ${akhir}`;
      return `Nampan sudah disusun dari yang paling sedikit di kiri ke yang paling banyak di kanan. ${akhir}`;
    }
    case "patokan": {
      if (rupa === "lambang") return `Bacalah bilangannya. Bilangan itu lebih dekat ke patokan yang mana? ${l.angka ? akhir : "Pilih patokannya."}`;
      if (rupa === "diagram") {
        if (cara === "klik") return "Lihat titik di antara bendera patokan. Ketuk bendera patokan yang paling dekat dengan titik.";
        if (cara === "kanvas") return "Lihat titik di antara bendera patokan. Lingkari bendera patokan yang paling dekat dengan titik.";
        return `Lihat titik di antara bendera patokan. Titik itu paling dekat dengan patokan yang mana? ${akhir}`;
      }
      if (cara === "klik") return "Lihat kue di nampan. Kira-kira hampir berapa kotak penuh? Ketuk patokan yang paling dekat.";
      if (cara === "kanvas") return "Lihat kue di nampan. Kira-kira hampir berapa kotak penuh? Lingkari patokan yang paling dekat.";
      return `Lihat kue di nampan. Kira-kira hampir berapa kotak penuh? ${akhir}`;
    }
    case "batang": {
      const t = l.tanya === "besar" ? "paling panjang" : "paling pendek";
      if (rupa === "lambang") return `Bacalah bilangan pada tiap batang. Batang yang lebih panjang berarti bilangan yang lebih besar. ${akhir}`;
      if (rupa === "diagram") {
        if (cara === "klik") return `Lihat batang yang sejajar dari garis yang sama. Ketuk batang yang ${t}. ${akhir}`;
        if (cara === "kanvas") return `Lihat batang yang sejajar dari garis yang sama. Lingkari batang yang ${t}. ${akhir}`;
        return `Lihat batang yang sejajar dari garis yang sama. ${akhir}`;
      }
      if (cara === "klik") return `Lihat deretan kotak kue yang sejajar dari tepi kiri. Ketuk deretan yang ${t}. ${akhir}`;
      if (cara === "kanvas") return `Lihat deretan kotak kue yang sejajar dari tepi kiri. Lingkari deretan yang ${t}. ${akhir}`;
      return `Lihat deretan kotak kue yang sejajar dari tepi kiri. ${akhir}`;
    }
  }
}

/* ------------------------------ Petunjuk saat jawaban bilangan salah (menunjuk kesalahannya, tanpa digit) ------------------------------ */
export function petunjukSalah(l: Langkah, m: number): string {
  if (l.tipe === "salah") {
    if (l.jawabTokoh !== undefined && m === l.jawabTokoh) return `Itu jawaban ${l.tokoh} yang keliru. ${l.keliru}`;
    return petunjukSalah(l.dasar, m);
  }
  const k = kunciLangkah(l) ?? 0;
  switch (l.tipe) {
    case "puluhan":
      if (m === l.a || m === l.b) return puluhanSama(l.a, l.b) ? "Itu bilangan yang satunya. Puluhannya sama, jadi bandingkan satuannya." : `Itu bilangan yang ${l.tanya === "besar" ? "lebih kecil" : "lebih besar"}. Bandingkan puluhannya dulu, jangan satuannya.`;
      return "Bilangan itu tidak ada di antara kedua bilangan. Lihat lagi puluhan dan satuannya.";
    case "garis":
      if (l.isi.includes(m)) return l.tanya === "tengah" ? "Itu bilangan yang paling ujung. Yang dicari ada di antara yang paling kiri dan yang paling kanan." : `Itu bukan yang ${l.tanya === "besar" ? "paling ke kanan" : "paling ke kiri"} di garis bilangan. Yang lebih ke kanan lebih besar.`;
      return "Bilangan itu tidak ada di garis bilangan. Pilih salah satu bilangan yang ada.";
    case "patokan":
      return m > k ? "Patokan itu terlalu besar. Cari patokan yang jaraknya paling pendek dari bilangannya." : "Patokan itu terlalu kecil. Cari patokan yang jaraknya paling pendek dari bilangannya.";
    case "batang":
      if (l.isi.includes(m)) return `Batang itu bukan yang ${l.tanya === "besar" ? "paling panjang" : "paling pendek"}. Bandingkan panjang batang dari garis yang sama.`;
      return "Bilangan itu tidak ada pada batang mana pun. Pilih salah satu bilangan yang ada.";
  }
}

/* ------------------------------ Simulasi Meja Pesta ------------------------------ */
/** Nampan di meja (berbeda dari Story): `kue` nomor kuenya, `n` banyak kue. */
export type NampanSim = { id: string; kue: number; n: number };
export type ModePesta = "banding" | "urut" | "tukar";
export type KeadaanPesta = {
  alat: "pesta";
  mode: ModePesta;
  /** Dua nampan yang dibandingkan (nomor dalam daftar nampan). */
  pilih: number[];
  /** Nampan yang perkiraannya (patokan terdekat) sudah benar. */
  taksir: number[];
  /** Banyak kali tabel puluhan dan satuan dibuka untuk sepasang nampan. */
  tabelDibuka: number;
  /** Tabel untuk pasangan yang sedang dipilih sudah dibuka. */
  tabel: boolean;
  /** Tanda lebih besar atau lebih kecil yang benar, tanda sama dengan yang benar, dan tanda yang salah. */
  tandaBenar: number;
  samaBenar: number;
  tandaSalah: number;
  /** Urutan yang sedang disusun (nomor nampan dari yang paling sedikit) dan banyak urutan yang tuntas. */
  urut: number[];
  urutTuntas: number;
  /** Kotak penukaran: sepuluh kue lepas ditukar satu kotak sepuluh (banyak penukaran). */
  tukar: number;
  sudahTukar: boolean;
};

export const awalPesta = (): KeadaanPesta => ({
  alat: "pesta",
  mode: "banding",
  pilih: [],
  taksir: [],
  tabelDibuka: 0,
  tabel: false,
  tandaBenar: 0,
  samaBenar: 0,
  tandaSalah: 0,
  urut: [],
  urutTuntas: 0,
  tukar: 0,
  sudahTukar: false,
});
export const pilihModePesta = (k: KeadaanPesta, mode: ModePesta): KeadaanPesta => ({ ...k, mode });

/** Tiga nampan yang diurutkan di mode Urut (nomor dalam daftar nampan). */
export const TRIO_URUT = [3, 0, 2];
/** Isi kotak penukaran: dua kotak sepuluh dan enam belas kue lepas (sama dengan tiga puluh enam). */
export const TUKAR_AWAL = { p: 2, s: 16 };

/** Ketuk nampan untuk dibandingkan. Pilihan ketiga memulai pasangan baru. Tabel ditutup saat pasangan berganti. */
export function pilihNampan(k: KeadaanPesta, i: number, d: readonly NampanSim[]): KeadaanPesta {
  if (i < 0 || i >= d.length) return k;
  if (k.pilih.includes(i)) return { ...k, pilih: k.pilih.filter((x) => x !== i), tabel: false };
  if (k.pilih.length >= 2) return { ...k, pilih: [i], tabel: false };
  return { ...k, pilih: [...k.pilih, i], tabel: false };
}
/** Perkiraan: pilih patokan terdekat untuk satu nampan. Benar bila patokannya yang terdekat. */
export function taksirNampan(k: KeadaanPesta, i: number, patokan: number, d: readonly NampanSim[]): { k: KeadaanPesta; ok: boolean } {
  if (i < 0 || i >= d.length) return { k, ok: false };
  if (patokan !== patokanTerdekat(d[i].n)) return { k, ok: false };
  return { k: k.taksir.includes(i) ? k : { ...k, taksir: [...k.taksir, i] }, ok: true };
}
/** Buka tabel puluhan dan satuan untuk pasangan yang dipilih (perlu dua nampan). */
export function bukaTabel(k: KeadaanPesta): KeadaanPesta {
  if (k.pilih.length !== 2 || k.tabel) return k;
  return { ...k, tabel: true, tabelDibuka: k.tabelDibuka + 1 };
}
export type Tanda = "lebih" | "kurang" | "sama";
/** Pasang tanda pada pasangan terpilih (nampan pertama dibandingkan dengan yang kedua). Hanya dihitung setelah tabel dibuka (puluhan dulu). */
export function pasangTanda(k: KeadaanPesta, tanda: Tanda, d: readonly NampanSim[]): { k: KeadaanPesta; ok: boolean; perlu: "tabel" | "pasangan" | null } {
  if (k.pilih.length !== 2) return { k, ok: false, perlu: "pasangan" };
  if (!k.tabel) return { k, ok: false, perlu: "tabel" };
  const benar = bandingDua(d[k.pilih[0]].n, d[k.pilih[1]].n) === tanda;
  if (!benar) return { k: { ...k, tandaSalah: k.tandaSalah + 1 }, ok: false, perlu: null };
  return { k: { ...k, tandaBenar: k.tandaBenar + (tanda === "sama" ? 0 : 1), samaBenar: k.samaBenar + (tanda === "sama" ? 1 : 0) }, ok: true, perlu: null };
}
/** Urutkan tiga nampan: ketuk dari yang paling sedikit. Salah urutan tidak mengubah keadaan. */
export function urutPilih(k: KeadaanPesta, i: number, d: readonly NampanSim[]): { k: KeadaanPesta; ok: boolean } {
  if (!TRIO_URUT.includes(i) || k.urut.includes(i)) return { k, ok: false };
  const sisa = TRIO_URUT.filter((x) => !k.urut.includes(x));
  const terkecil = sisa.reduce((a, b) => (d[b].n < d[a].n ? b : a));
  if (d[i].n !== d[terkecil].n) return { k, ok: false };
  const urut = [...k.urut, i];
  return { k: { ...k, urut, urutTuntas: urut.length === TRIO_URUT.length ? k.urutTuntas + 1 : k.urutTuntas }, ok: true };
}
export const ulangUrut = (k: KeadaanPesta): KeadaanPesta => ({ ...k, urut: [] });
/** Tukar sepuluh kue lepas dengan satu kotak sepuluh (hanya sekali; jumlah kuenya tetap). */
export function tukarSepuluh(k: KeadaanPesta): KeadaanPesta {
  if (k.sudahTukar) return k;
  return { ...k, sudahTukar: true, tukar: k.tukar + 1 };
}
export const isiTukar = (k: KeadaanPesta): { p: number; s: number } => (k.sudahTukar ? { p: TUKAR_AWAL.p + 1, s: TUKAR_AWAL.s - 10 } : TUKAR_AWAL);
export const mulaiLagiPesta = (): KeadaanPesta => awalPesta();

/** Kalimat keadaan untuk suara (tanpa digit). `nama`: nama tiap nampan. */
export function kalimatPesta(k: KeadaanPesta, d: readonly NampanSim[], nama: readonly string[]): string {
  if (k.mode === "urut") {
    if (k.urut.length === 0) return "Ketuk nampan yang paling sedikit lebih dulu, lalu yang berikutnya.";
    if (k.urut.length < TRIO_URUT.length) return `Sudah ${kata(k.urut.length)} nampan. Ketuk nampan yang paling sedikit di antara sisanya.`;
    return "Urutannya benar, dari yang paling sedikit ke yang paling banyak.";
  }
  if (k.mode === "tukar") {
    const t = isiTukar(k);
    return k.sudahTukar ? `Sekarang ada ${kata(t.p)} kotak sepuluh dan ${kata(t.s)} kue lepas. Jumlah kuenya tetap sama.` : "Ada kue lepas lebih dari sepuluh. Tukar sepuluh kue lepas dengan satu kotak sepuluh.";
  }
  if (k.pilih.length < 2) return k.pilih.length === 1 ? "Ketuk satu nampan lagi." : "Perkirakan dulu, atau ketuk dua nampan untuk dibandingkan.";
  const [a, b] = k.pilih;
  if (!k.tabel) return "Buka tabel puluhan dan satuan, lalu pasang tandanya.";
  const h = bandingDua(d[a].n, d[b].n);
  if (h === "sama") return `${besar(nama[a])} dan ${nama[b]} sama banyak. Pakai tanda sama dengan.`;
  const [t, s] = h === "lebih" ? [a, b] : [b, a];
  return `${besar(nama[t])} lebih banyak, ${nama[s]} lebih sedikit. Puluhan dulu, lalu satuan kalau puluhannya sama.`;
}
