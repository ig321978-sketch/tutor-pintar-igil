/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 2 Sub-Bab A "Kayu untuk Api Unggun" (kalimat Matematika penjumlahan):
 * jenis tugas, kunci, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-kayu-k3b2a.mjs.
 * Jawaban beragam: memilih bilangan, kalimat, atau pasangan (klik), menulis satu angka (bilangan yang belum diketahui, lompatan pertama) di kanvas,
 * dan mengucapkan satu kata (jumlah, bagian, depan, tengah) atau bilangan pendek. Kunci dihitung dari data, bukan kunci tetap.
 * Empat metode tiap misi: IGIL "Kurangi Jumlah, Periksa Jumlahnya" (kalimat dengan titik-titik), Bar Model (Bagan Batang), Counting On (Menghitung Maju), Balance Scale (Timbangan Seimbang).
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);
export const HURUF = ["A", "B", "C", "D", "E", "F"] as const;
export const huruf = (i: number): string => HURUF[i] ?? "?";

/* ------------------------------ Kata bilangan ------------------------------ */
const SAT = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"] as const;
/** Nama bilangan 0 sampai 999 dalam kata (tanpa digit): seratus, dua puluh tiga, lima belas. */
export function kataBil(n: number): string {
  if (n < 0 || n > 999 || !Number.isInteger(n)) return String(n);
  if (n < 10) return SAT[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SAT[n - 10]} belas`;
  if (n < 100) {
    const p = Math.floor(n / 10);
    const s = n % 10;
    return s === 0 ? `${SAT[p]} puluh` : `${SAT[p]} puluh ${SAT[s]}`;
  }
  const r = Math.floor(n / 100);
  const sisa = n % 100;
  const ratus = r === 1 ? "seratus" : `${SAT[r]} ratus`;
  return sisa === 0 ? ratus : `${ratus} ${kataBil(sisa)}`;
}
export const kata = kataBil;
/** Ubah teks bertanda dan berangka menjadi ucapan tanpa digit: "37 + 53" menjadi "tiga puluh tujuh tambah lima puluh tiga". */
export function ucapkan(t: string): string {
  return t
    .replace(/\d+/g, (d) => ` ${kataBil(Number(d))} `)
    .replace(/\+/g, " tambah ")
    .replace(/\s-\s|−/g, " kurang ")
    .replace(/=/g, " sama dengan ")
    .replace(/…/g, " titik-titik ")
    .replace(/\s+/g, " ")
    .trim();
}

/* ------------------------------ Jenis tugas ------------------------------ */
/**
 * Kalimat Matematika dengan titik-titik. `depan`: titik-titik di depan ("… + a = c"), bila tidak di tengah ("a + … = c"). Bilangan yang belum diketahui = c - a.
 * suara: `tanya` "isi" (ucapkan bilangan yang belum diketahui), "periksa" (jumlahkan a dan bilangan itu, ucapkan jumlahnya), "letak" (titik-titik di depan atau di tengah).
 */
export type LKal = { tipe: "kal"; a: number; c: number; depan: boolean; tanya?: "isi" | "periksa" | "letak" };
/** Bagan jumlah dan bagian: batang atas `total`, bagian diketahui `bagian`, bagian lain = total - bagian. suara: nama batang yang disorot (`sorot`). */
export type LBagan = { tipe: "bagan"; total: number; bagian: number; sorot?: "total" | "bagian" };
/** Garis bilangan: mulai dari `dari`, lompat maju sampai `ke`. klik dan suara: banyak lompatan seluruhnya (ke - dari); kanvas: lompatan pertama ke puluhan terdekat. */
export type LMaju = { tipe: "maju"; dari: number; ke: number };
/** Timbangan seimbang: sisi kiri `a` dan titik-titik, sisi kanan `c`. Bilangan yang belum diketahui = c - a. */
export type LTimbang = { tipe: "timbang"; a: number; c: number };
/** Banyak kemungkinan (hanya klik): jumlah `jumlah` di sisi kanan timbangan, satu bagian `a`. Pilih pasangan yang membuat timbangan seimbang. */
export type LKira = { tipe: "kira"; jumlah: number; a: number };
export type LangkahDasar = LKal | LBagan | LMaju | LTimbang | LKira;
/** Cari kesalahan: tokoh sudah menjawab dari `dasar`. Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LKal | LBagan;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "bagan" | "maju" | "timbang";
export const URUT_METODE: Metode[] = ["igil", "bagan", "maju", "timbang"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Kurangi Jumlah, Periksa Jumlahnya",
  bagan: "Bar Model: Bagan Batang",
  maju: "Counting On: Menghitung Maju",
  timbang: "Balance Scale: Timbangan Seimbang",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F525}", bagan: "\u{1F4CA}", maju: "\u{1F463}", timbang: "\u{2696}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", bagan: "Bar Model", maju: "Counting On", timbang: "Balance Scale" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/** Bilangan yang belum diketahui pada tugas hitung. */
export function belumDiketahui(l: LangkahDasar): number {
  switch (l.tipe) {
    case "kal":
    case "timbang":
      return l.c - l.a;
    case "bagan":
      return l.total - l.bagian;
    case "maju":
      return l.ke - l.dari;
    case "kira":
      return l.jumlah - l.a;
  }
}
/** Puluhan terdekat di atas `dari` (garis bilangan). Bila `dari` sudah puluhan penuh, lompatan pertama sepuluh. */
export const puluhanBerikut = (dari: number): number => (Math.floor(dari / 10) + 1) * 10;
/** Pasangan penjumlah untuk satu bagian `a` dan jumlah `jumlah`, dengan dua pengecoh (jumlah lebih sepuluh dan kurang sepuluh). Urutan: benar, pengecoh satu, pengecoh dua. */
export function pasangan(l: LKira): string[] {
  const b = l.jumlah - l.a;
  return [`${l.a} + ${b}`, `${l.a} + ${b + 10}`, `${l.a} + ${Math.max(1, b - 10)}`];
}

/* ------------------------------ Kunci ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });

/** Kunci tiap tugas menurut caranya, dihitung dari data. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "kal":
      if (cara === "suara") {
        if (l.tanya === "periksa") return angka(l.c);
        if (l.tanya === "letak") return nama(l.depan ? "depan" : "tengah");
      }
      return angka(belumDiketahui(l));
    case "bagan":
      if (cara === "suara") return nama((l.sorot ?? "total") === "total" ? "jumlah" : "bagian");
      return angka(belumDiketahui(l));
    case "maju":
      if (cara === "kanvas") return angka(puluhanBerikut(l.dari) - l.dari);
      return angka(belumDiketahui(l));
    case "timbang":
      return angka(belumDiketahui(l));
    case "kira":
      return cara === "klik" ? nama(pasangan(l)[0]) : null;
  }
}

/** Apakah tugas langsung siap dijawab? Semua tugas punya kunci, kecuali Cari kesalahan yang memakai kegiatan lebih dulu. Tidak bergantung pada rupa. */
export function siapLangsung(l: Langkah, rupa: Rupa, cara: Cara): boolean {
  void rupa;
  if (l.tipe === "salah") return false;
  return kunciJawab(l, cara) !== null;
}

/* ------------------------------ Pilihan ------------------------------ */
/** Pengecoh khas untuk bilangan `n` (bagian yang belum diketahui): jumlah dua bilangan (salah menjumlahkan), bilangan yang diketahui, jumlah, atau selisih sepuluh dan satu. */
export function pengecoh(l: Langkah, awal?: number): number[] {
  const d = dasarDari(l);
  const n = belumDiketahui(d);
  const khas: number[] =
    d.tipe === "kal" || d.tipe === "timbang"
      ? [d.c + d.a, d.a, d.c]
      : d.tipe === "bagan"
        ? [d.total + d.bagian, d.bagian, d.total]
        : d.tipe === "maju"
          ? [d.ke + d.dari, d.ke, d.dari]
          : [];
  const calon = [awal ?? -1, ...khas, n + 10, n - 10, n + 1, n - 1];
  const hasil: number[] = [];
  for (const c of calon) if (Number.isInteger(c) && c >= 1 && c <= 100 && c !== n && !hasil.includes(c)) hasil.push(c);
  return hasil;
}
/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisipkan(benar: string, lain: string[], geser: number): string[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}
/** Tiga pilihan untuk tugas klik (bilangan atau pasangan): kunci tidak pernah di tombol pertama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k) return [];
  const d = dasarDari(l);
  if (k.jenis === "nama") {
    const [, x, y] = pasangan(d as LKira);
    return sisipkan(k.nama, [x, y], k.nama.length);
  }
  const awal = l.tipe === "salah" ? Number(l.jawabTokoh) : undefined;
  const [a, b] = pengecoh(l, awal);
  return sisipkan(String(k.n), [String(a), String(b)], k.n);
}
const KATA_SUARA = { letak: ["depan", "tengah", "akhir"], batang: ["jumlah", "bagian", "periksa"] } as const;
/** Pilihan cadangan untuk tugas suara (kata atau bilangan dalam kata). */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k) return [];
  if (k.jenis === "angka") {
    const lain: number[] = [];
    for (const x of [...pengecoh(l), k.n + 10, k.n - 10, k.n + 1, k.n - 1]) if (x >= 1 && x <= 100 && x !== k.n && !lain.includes(x)) lain.push(x);
    return sisipkan(kataBil(k.n), lain.slice(0, 2).map(kataBil), k.n);
  }
  const semua: string[] = [...(dasarDari(l).tipe === "kal" ? KATA_SUARA.letak : KATA_SUARA.batang)];
  return sisipkan(k.nama, semua.filter((x) => x !== k.nama), k.nama.length);
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : "gambar");
/** Kalimat Matematika dalam kata (suara tanpa digit). */
export function kalimatKata(l: LKal | LTimbang): string {
  const u = "titik-titik";
  if (l.tipe === "kal" && l.depan) return `${u} tambah ${kataBil(l.a)} sama dengan ${kataBil(l.c)}`;
  return `${kataBil(l.a)} tambah ${u} sama dengan ${kataBil(l.c)}`;
}

export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  const n = belumDiketahui(d);
  switch (d.tipe) {
    case "kal":
      if (cara === "suara" && d.tanya === "periksa") return `${kapital(kataBil(d.a))} tambah ${kataBil(n)} sama dengan ${kataBil(d.c)}, cocok dengan jumlah semuanya.`;
      if (cara === "suara" && d.tanya === "letak") return `Titik-titik berada di ${d.depan ? "depan" : "tengah"}.`;
      return `${kapital(kataBil(d.c))} dikurangi ${kataBil(d.a)} sama dengan ${kataBil(n)}. Diperiksa: ${kataBil(d.a)} tambah ${kataBil(n)} sama dengan ${kataBil(d.c)}.`;
    case "bagan":
      if (cara === "suara") return (d.sorot ?? "total") === "total" ? "Batang atas adalah jumlah semuanya." : "Batang di bawah adalah bagian.";
      return `${kapital(kataBil(d.total))} dikurangi ${kataBil(d.bagian)} sama dengan ${kataBil(n)}, jadi bagian yang belum diketahui adalah ${kataBil(n)}.`;
    case "maju":
      if (cara === "kanvas") return `Dari ${kataBil(d.dari)} lompat ke ${kataBil(puluhanBerikut(d.dari))}: lompatan pertama ada ${kataBil(puluhanBerikut(d.dari) - d.dari)}.`;
      return `Dari ${kataBil(d.dari)} lompat maju sampai ${kataBil(d.ke)}: seluruhnya ${kataBil(n)} lompatan.`;
    case "timbang":
      return `${kapital(kataBil(d.c))} dikurangi ${kataBil(d.a)} sama dengan ${kataBil(n)}, jadi kedua sisi timbangan seimbang.`;
    case "kira": {
      const b = d.jumlah - d.a;
      return `${kapital(kataBil(d.a))} tambah ${kataBil(b)} sama dengan ${kataBil(d.jumlah)}. Pasangan lain menghasilkan jumlah yang berbeda.`;
    }
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  const aw = AWALAN[metode];
  const tulis = "Tulis satu angka di kanvas.";
  switch (l.tipe) {
    case "kal":
      if (cara === "klik") return `${aw}: lihat kalimat Matematika pada ${g} ini. Kurangi jumlah dengan bagian yang diketahui. Bilangan berapa yang mengisi titik-titik? Pilih bilangannya.`;
      if (cara === "kanvas") return `${aw}: lihat kalimat Matematika pada ${g} ini. Kurangi jumlah dengan bagian yang diketahui. Berapa bilangan yang mengisi titik-titik? ${tulis}`;
      if (l.tanya === "periksa") return `${aw}: periksa hasilnya dengan menjumlahkan. Bilangan yang belum diketahui sudah ditemukan. Jumlahkan dua bilangan pada ${g} ini. Berapa jumlahnya? Ucapkan bilangannya.`;
      if (l.tanya === "letak") return `${aw}: lihat kalimat Matematika pada ${g} ini. Titik-titik berada di depan atau di tengah? Ucapkan satu kata.`;
      return `${aw}: lihat kalimat Matematika pada ${g} ini. Kurangi jumlah dengan bagian yang diketahui. Bilangan berapa yang mengisi titik-titik? Ucapkan bilangannya.`;
    case "bagan":
      if (cara === "klik") return `${aw}: lihat bagan batang pada ${g} ini. Batang atas adalah jumlah semuanya. Berapa bagian yang belum diketahui? Pilih bilangannya.`;
      if (cara === "kanvas") return `${aw}: lihat bagan batang pada ${g} ini. Batang atas adalah jumlah semuanya. Berapa bagian yang belum diketahui? ${tulis}`;
      return `${aw}: lihat batang yang disorot pada ${g} ini. Batang itu disebut apa? Ucapkan satu kata.`;
    case "maju":
      if (cara === "kanvas") return `${aw}: lihat garis bilangan pada ${g} ini. Lompat dulu ke puluhan terdekat. Berapa lompatan pertama? ${tulis}`;
      return `${aw}: lihat garis bilangan pada ${g} ini. Mulai dari bilangan kecil, lompat maju sampai bilangan besar. Berapa lompatan seluruhnya? ${cara === "klik" ? "Pilih bilangannya." : "Ucapkan bilangannya."}`;
    case "timbang":
      return `${aw}: lihat timbangan pada ${g} ini. Sisi kiri berisi satu bilangan dan titik-titik, sisi kanan berisi jumlahnya. Berapa bilangan yang mengisi titik-titik supaya seimbang? ${cara === "kanvas" ? tulis : "Ucapkan bilangannya."}`;
    case "kira":
      return `${aw}: sisi kanan timbangan pada ${g} ini berisi ${kataBil(l.jumlah)}. Bila hanya jumlahnya yang diketahui, ada banyak kemungkinan. Pilih pasangan yang membuat timbangan seimbang.`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "kal":
      if (cara === "suara" && d.tanya === "periksa") return "Berapa jumlahnya?";
      if (cara === "suara" && d.tanya === "letak") return "Titik-titik berada di mana?";
      return "Bilangan berapa yang mengisi titik-titik?";
    case "bagan":
      return cara === "suara" ? "Batang yang disorot disebut apa?" : "Berapa bagian yang belum diketahui?";
    case "maju":
      return cara === "kanvas" ? "Berapa lompatan pertama?" : "Berapa lompatan seluruhnya?";
    case "timbang":
      return "Bilangan berapa yang membuat timbangan seimbang?";
    case "kira":
      return "Pasangan mana yang membuat timbangan seimbang?";
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya (tanpa digit). `jawab`: kata atau bilangan yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "kal":
      if (cara === "suara" && l.tanya === "periksa") return "Periksa dengan menjumlahkan bagian yang diketahui dan bilangan yang ditemukan. Hasilnya harus sama dengan jumlah semuanya.";
      if (cara === "suara" && l.tanya === "letak") return "Titik-titik di depan berarti kalimatnya dimulai dengan titik-titik. Titik-titik di tengah berarti ada bilangan lebih dulu, lalu tanda tambah, lalu titik-titik.";
      return "Jumlah semuanya adalah bilangan setelah tanda sama dengan. Bilangan yang belum diketahui didapat dengan mengurangkan jumlah semuanya dengan bagian yang diketahui, bukan menjumlahkan.";
    case "bagan":
      if (cara === "suara") return "Batang panjang di atas adalah jumlah semuanya. Dua batang di bawahnya adalah bagian-bagiannya.";
      return "Batang atas adalah jumlah semuanya. Kurangi jumlah semuanya dengan bagian yang diketahui untuk mendapat bagian yang belum diketahui.";
    case "maju":
      if (cara === "kanvas") return "Lompat dulu ke puluhan terdekat di atas bilangan awal. Banyak lompatan pertama sama dengan selisih bilangan awal dengan puluhan itu.";
      return "Hitung lompatan dari bilangan kecil sampai bilangan besar: ke puluhan terdekat dulu, lalu puluhan penuh, lalu sisanya. Jumlahkan semua lompatan.";
    case "timbang":
      return "Kedua sisi timbangan harus sama. Kurangi bilangan di sisi kanan dengan bilangan yang sudah ada di sisi kiri untuk mendapat bilangan yang belum diketahui.";
    case "kira":
      return "Jumlahkan kedua bilangan pada tiap pasangan. Timbangan seimbang bila jumlah pasangan sama dengan bilangan di sisi kanan.";
  }
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
/** Kalimat Matematika dalam lambang: "24 + … = 41" atau "… + 17 = 24". */
export function kalimatLambang(l: LKal | LTimbang): string {
  return l.tipe === "kal" && l.depan ? `… + ${l.a} = ${l.c}` : `${l.a} + … = ${l.c}`;
}
/** Isi kartu kata untuk tahap Abstract (kata dan angka). */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  switch (l.tipe) {
    case "kal":
      if (cara === "suara" && l.tanya === "periksa") return [`${l.a} + ${belumDiketahui(l)} = ?`];
      return [kalimatLambang(l), `jumlah semuanya: ${l.c}`, `bagian diketahui: ${l.a}`, "bagian dicari: …"];
    case "bagan":
      return [`${cara === "suara" && (l.sorot ?? "total") === "total" ? "batang ini: ?" : `jumlah semuanya: ${l.total}`}`, `${cara === "suara" && l.sorot === "bagian" ? "batang ini: ?" : `bagian diketahui: ${l.bagian}`}`, ...(cara === "suara" ? [] : ["bagian dicari: ?"])];
    case "maju":
      return cara === "kanvas" ? [`mulai dari: ${l.dari}`, "lompat ke puluhan terdekat", "lompatan pertama: ?"] : [`mulai dari: ${l.dari}`, `sampai: ${l.ke}`, "lompatan seluruhnya: ?"];
    case "timbang":
      return [`sisi kiri: ${l.a} + …`, `sisi kanan: ${l.c}`, "timbangan lurus"];
    case "kira":
      return [`sisi kanan: ${l.jumlah}`, `sisi kiri: ${l.a} + ?`, "banyak kemungkinan"];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
