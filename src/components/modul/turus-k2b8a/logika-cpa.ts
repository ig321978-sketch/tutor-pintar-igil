/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 2 Bab 8 Sub-Bab A "Alat Musik Pak Hendra" (diagram turus):
 * jenis tugas, kunci, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-turus-k2b8a.mjs.
 * Jawaban beragam: memilih bilangan atau nama jenis, mengetuk turus atau tabel yang tepat, mengurutkan baris, mengucapkan satu kata (turus, bundel, lebih, kurang, sama, nama jenis)
 * atau bilangan pendek, dan menulis satu angka di kanvas. Kunci dihitung dari data (banyak benda tiap jenis, banyak turus), bukan kunci tetap.
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);
export const HURUF = ["A", "B", "C", "D", "E", "F"] as const;
export const huruf = (i: number): string => HURUF[i] ?? "?";

/* ------------------------------ Kata bilangan ------------------------------ */
const SAT = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"] as const;
/** Nama bilangan 0 sampai 100 dalam kata (tanpa digit). */
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

/**
 * Jenis benda untuk rupa Concrete (emoji paling tinggi U+1FA95). Berbeda dari data Story (angklung, seruling, gendang, rebana, topi, selendang, sepatu)
 * dan dari Simulasi (lampu, kursi lipat, kabel, mikrofon). Pictorial memakai titik berwarna `warna` dan Abstract hanya nama.
 */
export const OBJEK = [
  { nama: "gitar", emoji: "\u{1F3B8}", warna: "#FDBA74", garis: "#9A3412" },
  { nama: "biola", emoji: "\u{1F3BB}", warna: "#C4B5FD", garis: "#4C1D95" },
  { nama: "terompet", emoji: "\u{1F3BA}", warna: "#60A5FA", garis: "#1E3A8A" },
  { nama: "drum", emoji: "\u{1F941}", warna: "#FCA5A5", garis: "#991B1B" },
  { nama: "tiket", emoji: "\u{1F39F}", warna: "#A5F3FC", garis: "#155E75" },
  { nama: "bintang", emoji: "\u{2B50}", warna: "#FACC15", garis: "#854D0E" },
  { nama: "saksofon", emoji: "\u{1F3B7}", warna: "#BBF7D0", garis: "#166534" },
  { nama: "piano", emoji: "\u{1F3B9}", warna: "#E9D5FF", garis: "#6B21A8" },
  { nama: "lampu", emoji: "\u{1F4A1}", warna: "#FEF9C3", garis: "#854D0E" },
] as const;

/* ------------------------------ Langkah ------------------------------ */
/** Satu jenis benda: nomor dalam OBJEK dan banyaknya. */
export type Jenis = { o: number; n: number };
export const namaJ = (j: Jenis): string => OBJEK[j.o].nama;

/**
 * Metode IGIL "Pilah, Garis, Bundel Lima": tumpukan campur beberapa jenis. klik dan kanvas: banyak benda jenis `tanya` (kanvas satu angka);
 * suara: nama jenis yang paling banyak.
 */
export type LPile = { tipe: "pile"; jenis: Jenis[]; tanya: number };
/**
 * Turus `n` benda jenis `o` yang dibundel lima-lima (Hitung Lima-Lima). klik: banyak benda seluruhnya; kanvas: banyak bundel lima yang penuh (`bundel`) atau garis sisa (`sisa`);
 * suara: satu kata (`bundel` atau `turus`) atau bilangan `lima` (isi satu bundel).
 */
export type LTurus = { tipe: "turus"; n: number; o: number; kanvas: "bundel" | "sisa"; kata: "bundel" | "turus" | "lima" };
/** Ketuk turus yang tepat untuk `n` benda jenis `o` di antara beberapa turus dengan banyak berbeda `opsi` (klik). */
export type LPilihTurus = { tipe: "pilihTurus"; n: number; o: number; opsi: number[] };
/**
 * Alas Pilah: satu baris tiap jenis. klik: jenis paling banyak atau paling sedikit (nama); kanvas: banyak jenis di alas (satu angka);
 * suara: jenis paling banyak atau paling sedikit (nama).
 */
export type LMat = { tipe: "mat"; jenis: Jenis[]; klik: "terbanyak" | "tersedikit"; suara: "terbanyak" | "tersedikit" };
/** Alas Pilah (klik): ketuk baris dari yang paling banyak sampai yang paling sedikit. Urutan di data sudah campur. */
export type LUrut = { tipe: "urut"; jenis: Jenis[] };
/**
 * Diagram Benda Nyata: lajur benda dari garis dasar yang sama. klik: lajur paling panjang (`paling`), paling pendek (`sedikit`), atau kata lebih, kurang, sama untuk lajur pertama
 * dibanding lajur kedua (`arah`); kanvas: lebihnya lajur panjang dari lajur pendek (dua lajur pertama); suara: kata lebih, kurang, atau sama.
 */
export type LNyata = { tipe: "nyata"; jenis: Jenis[]; klik: "paling" | "sedikit" | "arah" };
/** Diagram Benda Nyata (klik): ketuk tabel turus yang cocok dengan baris titik. `opsi` = banyaknya tiap jenis (urut jenis) pada tiap tabel; `benar` = nomor tabel yang cocok. */
export type LTabel = { tipe: "tabel"; jenis: Jenis[]; opsi: number[][]; benar: number };
export type LangkahDasar = LPile | LTurus | LPilihTurus | LMat | LUrut | LNyata | LTabel;
/** Cari kesalahan: tokoh sudah menjawab tentang turus atau perbandingan lajur `dasar`. Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LTurus | LNyata;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh?: number | string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "alas" | "lima" | "nyata";
export const URUT_METODE: Metode[] = ["igil", "alas", "lima", "nyata"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Pilah, Garis, Bundel Lima",
  alas: "Sorting Mat: Alas Pilah",
  lima: "Count by Fives: Hitung Lima-Lima",
  nyata: "Real Graph: Diagram Benda Nyata",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F4CB}", alas: "\u{1F9FA}", lima: "\u{270B}", nyata: "\u{1F4CA}" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/* ------------------------------ Hitungan dari data ------------------------------ */
const idxMaks = (js: Jenis[]): number => js.reduce((b, x, i) => (x.n > js[b].n ? i : b), 0);
const idxMin = (js: Jenis[]): number => js.reduce((b, x, i) => (x.n < js[b].n ? i : b), 0);
export const bundelDari = (n: number): number => Math.floor(n / 5);
export const sisaDari = (n: number): number => n % 5;
export type Arah = "lebih" | "kurang" | "sama";
export const arahJ = (a: Jenis, b: Jenis): Arah => (a.n > b.n ? "lebih" : a.n < b.n ? "kurang" : "sama");
export const selisihJ = (js: Jenis[]): number => Math.abs(js[0].n - js[1].n);
/** Banyak jenis terbanyak dan tersedikit harus tunggal agar kunci jelas. */
export const tunggalMaks = (js: Jenis[]): boolean => js.filter((x) => x.n === js[idxMaks(js)].n).length === 1;
export const tunggalMin = (js: Jenis[]): boolean => js.filter((x) => x.n === js[idxMin(js)].n).length === 1;
/** Urutan nomor baris dari yang paling banyak sampai paling sedikit (banyak harus berbeda). */
export const urutanBenar = (js: Jenis[]): number[] => js.map((_, i) => i).sort((a, b) => js[b].n - js[a].n);
/** Nomor turus yang tepat pada pilihTurus. */
export const nomorTurus = (l: LPilihTurus): number => l.opsi.findIndex((n) => n === l.n);

export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });

/** Kunci tiap tugas menurut caranya, dihitung dari data. Null bila tugas selesai lewat kegiatan (mengetuk). */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "pile":
      return cara === "suara" ? nama(namaJ(l.jenis[idxMaks(l.jenis)])) : angka(l.jenis[l.tanya].n);
    case "turus":
      if (cara === "klik") return angka(l.n);
      if (cara === "kanvas") return angka(l.kanvas === "sisa" ? sisaDari(l.n) : bundelDari(l.n));
      return l.kata === "lima" ? angka(5) : nama(l.kata);
    case "mat": {
      if (cara === "kanvas") return angka(l.jenis.length);
      const pilih = cara === "klik" ? l.klik : l.suara;
      return nama(namaJ(l.jenis[pilih === "terbanyak" ? idxMaks(l.jenis) : idxMin(l.jenis)]));
    }
    case "nyata":
      if (cara === "kanvas") return angka(selisihJ(l.jenis));
      if (cara === "klik" && l.klik === "paling") return nama(namaJ(l.jenis[idxMaks(l.jenis)]));
      if (cara === "klik" && l.klik === "sedikit") return nama(namaJ(l.jenis[idxMin(l.jenis)]));
      return nama(arahJ(l.jenis[0], l.jenis[1]));
    case "pilihTurus":
    case "urut":
    case "tabel":
      return null;
  }
}

/** Nomor ketukan yang benar untuk tugas klik yang diselesaikan dengan mengetuk (turus atau tabel). -1 untuk tugas lain. */
export function nomorKetuk(l: LangkahDasar): number {
  if (l.tipe === "pilihTurus") return nomorTurus(l);
  if (l.tipe === "tabel") return l.benar;
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
const sah = (n: number): boolean => Number.isInteger(n) && n >= 1 && n <= 99;
/** Dua pengecoh bilangan untuk kunci `n`: dari daftar kandidat (urut), lalu dari sekitar n. */
function duaPengecoh(n: number, kandidat: number[]): [number, number] {
  const semua = [...kandidat, n + 1, n - 1, n + 2, n - 2, n + 5, n - 5];
  const hasil: number[] = [];
  for (const c of semua) if (sah(c) && c !== n && !hasil.includes(c)) hasil.push(c);
  return [hasil[0], hasil[1]];
}
/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisipkan(benar: string, lain: string[], geser: number): string[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}
/** Tiga pilihan untuk tugas klik yang kuncinya bilangan atau nama (kunci tidak pernah di tombol pertama). */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k) return [];
  const d = dasarDari(l);
  if (k.jenis === "angka") {
    const kand = d.tipe === "turus" ? [bundelDari(d.n) + sisaDari(d.n), d.n + 5] : [];
    const [a, b] = duaPengecoh(k.n, kand);
    return sisipkan(String(k.n), [String(a), String(b)], k.n);
  }
  if (d.tipe === "nyata" && d.klik === "arah") return sisipkan(k.nama, (["lebih", "kurang", "sama"] as string[]).filter((x) => x !== k.nama), k.nama.length);
  const semua = d.tipe === "mat" || d.tipe === "nyata" || d.tipe === "pile" ? d.jenis.map(namaJ) : [];
  return sisipkan(k.nama, semua.filter((x) => x !== k.nama), k.nama.length);
}
/** Pilihan cadangan untuk tugas suara (kata atau bilangan dalam kata). */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k) return [];
  const d = dasarDari(l);
  if (k.jenis === "angka") {
    const [a, b] = duaPengecoh(k.n, []);
    return sisipkan(kataBil(k.n), [kataBil(a), kataBil(b)], k.n);
  }
  if (d.tipe === "turus") return sisipkan(k.nama, (["bundel", "turus", "lima"] as string[]).filter((x) => x !== k.nama), k.nama.length);
  if (d.tipe === "nyata") return sisipkan(k.nama, (["lebih", "kurang", "sama"] as string[]).filter((x) => x !== k.nama), k.nama.length);
  const semua = d.tipe === "mat" || d.tipe === "pile" ? d.jenis.map(namaJ) : [];
  return sisipkan(k.nama, semua.filter((x) => x !== k.nama), k.nama.length);
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : "gambar");

export function kalimatKunci(l: Langkah, cara: Cara, rupa: Rupa = "benda"): string {
  void rupa;
  const d = dasarDari(l);
  const kunci = kunciJawab(l, cara);
  const n = kunci?.jenis === "angka" ? kunci.n : 0;
  switch (d.tipe) {
    case "pile":
      if (cara === "suara") return `Setelah dipilah, ${namaJ(d.jenis[idxMaks(d.jenis)])} paling banyak, yaitu ${kataBil(d.jenis[idxMaks(d.jenis)].n)}.`;
      return `Setelah dipilah menurut jenisnya, ${namaJ(d.jenis[d.tanya])} ada ${kataBil(d.jenis[d.tanya].n)}.`;
    case "turus":
      if (cara === "klik") return `${kapital(kataBil(bundelDari(d.n)))} bundel lima${sisaDari(d.n) > 0 ? ` dan ${kataBil(sisaDari(d.n))} garis` : ""}, jadi seluruhnya ${kataBil(d.n)}.`;
      if (cara === "kanvas") return d.kanvas === "sisa" ? `Garis yang belum menjadi bundel ada ${kataBil(n)}.` : `Ada ${kataBil(n)} bundel lima yang penuh.`;
      return d.kata === "bundel" ? "Empat garis tegak dan satu coretan miring disebut satu bundel lima." : d.kata === "turus" ? "Garis tegak untuk mencatat satu benda disebut turus." : "Satu bundel berisi lima turus.";
    case "pilihTurus":
      return `Turus yang tepat menunjukkan ${kataBil(d.n)}: ${kataBil(bundelDari(d.n))} bundel lima${sisaDari(d.n) > 0 ? ` dan ${kataBil(sisaDari(d.n))} garis` : ""}.`;
    case "mat":
      if (cara === "kanvas") return `Alas punya satu baris untuk tiap jenis, jadi ada ${kataBil(n)} jenis.`;
      return `${kapital(String(kunci?.jenis === "nama" ? kunci.nama : ""))} berada di baris yang ${(cara === "klik" ? d.klik : d.suara) === "terbanyak" ? "paling banyak" : "paling sedikit"}.`;
    case "urut": {
      const u = urutanBenar(d.jenis).map((i) => namaJ(d.jenis[i]));
      return `Dari yang paling banyak: ${u.join(", lalu ")}.`;
    }
    case "nyata":
      if (cara === "kanvas") return `${kapital(namaJ(d.jenis[0]))} dan ${namaJ(d.jenis[1])} berbeda ${kataBil(n)} benda.`;
      if (cara === "klik" && d.klik !== "arah") return `Lajur ${kunci?.jenis === "nama" ? kunci.nama : ""} ${d.klik === "paling" ? "paling panjang, jadi paling banyak" : "paling pendek, jadi paling sedikit"}.`;
      return `${kapital(namaJ(d.jenis[0]))} ${kunci?.jenis === "nama" ? kunci.nama : ""}${kunci?.jenis === "nama" && kunci.nama === "sama" ? " banyak dengan" : " banyak daripada"} ${namaJ(d.jenis[1])}.`;
    case "tabel":
      return "Tabel itu cocok: tiap baris titik sama banyak dengan angka di kolom banyaknya.";
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  switch (l.tipe) {
    case "pile":
      if (cara === "suara") return `Metode IGIL: lihat tumpukan campur pada ${g} ini. Pilah menurut jenisnya, lalu hitung. Jenis apa yang paling banyak? Ucapkan namanya.`;
      return `Metode IGIL: lihat tumpukan campur pada ${g} ini. Pilah menurut jenisnya, lalu hitung. Ada berapa ${namaJ(l.jenis[l.tanya])}? ${cara === "klik" ? "Pilih bilangannya." : "Tulis satu angka di kanvas."}`;
    case "turus":
      if (cara === "klik") return `Count by Fives: turus pada ${g} ini sudah dibundel lima-lima. Ada berapa ${OBJEK[l.o].nama} seluruhnya? Pilih bilangannya.`;
      if (cara === "kanvas") return l.kanvas === "sisa" ? `Count by Fives: lihat turus ${OBJEK[l.o].nama}. Berapa garis sisa yang belum menjadi bundel? Tulis satu angka di kanvas.` : `Count by Fives: lihat turus ${OBJEK[l.o].nama}. Berapa bundel lima yang penuh? Tulis satu angka di kanvas.`;
      return l.kata === "bundel" ? "Count by Fives: empat garis tegak dan satu coretan miring disebut apa? Ucapkan satu kata." : l.kata === "turus" ? "Count by Fives: garis tegak untuk mencatat satu benda disebut apa? Ucapkan satu kata." : "Count by Fives: satu bundel berisi berapa turus? Ucapkan bilangannya.";
    case "pilihTurus":
      return `Count by Fives: ketuk turus yang tepat untuk ${kataBil(l.n)} ${OBJEK[l.o].nama}.`;
    case "mat":
      if (cara === "kanvas") return `Sorting Mat: lihat alas pilah pada ${g} ini. Ada berapa jenis benda di alas? Tulis satu angka di kanvas.`;
      return `Sorting Mat: lihat baris tiap jenis pada ${g} ini. Jenis apa yang ${(cara === "klik" ? l.klik : l.suara) === "terbanyak" ? "paling banyak" : "paling sedikit"}? ${cara === "klik" ? "Pilih namanya." : "Ucapkan namanya."}`;
    case "urut":
      return "Sorting Mat: ketuk baris dari yang paling banyak sampai yang paling sedikit.";
    case "nyata":
      if (cara === "kanvas") return `Real Graph: bandingkan lajur ${namaJ(l.jenis[0])} dan lajur ${namaJ(l.jenis[1])} pada ${g} ini. Berapa lebihnya? Tulis satu angka di kanvas.`;
      if (cara === "klik" && l.klik === "paling") return `Real Graph: lajur benda pada ${g} ini dimulai dari garis dasar yang sama. Lajur mana yang paling panjang? Pilih namanya.`;
      if (cara === "klik" && l.klik === "sedikit") return `Real Graph: lajur benda pada ${g} ini dimulai dari garis dasar yang sama. Lajur mana yang paling pendek? Pilih namanya.`;
      return `Real Graph: banyak ${namaJ(l.jenis[0])} dibanding ${namaJ(l.jenis[1])}, lebih, kurang, atau sama? ${cara === "klik" ? "Pilih katanya." : "Ucapkan satu kata."}`;
    case "tabel":
      return "Real Graph: ketuk tabel turus yang cocok dengan baris titik.";
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "pile":
      return cara === "suara" ? "Jenis apa yang paling banyak?" : `Ada berapa ${namaJ(d.jenis[d.tanya])}?`;
    case "turus":
      if (cara === "klik") return "Ada berapa benda seluruhnya?";
      if (cara === "kanvas") return d.kanvas === "sisa" ? "Berapa garis sisa?" : "Berapa bundel lima yang penuh?";
      return d.kata === "bundel" ? "Empat garis dan coretan miring disebut apa?" : d.kata === "turus" ? "Garis tegak pencatat benda disebut apa?" : "Satu bundel berisi berapa turus?";
    case "mat":
      if (cara === "kanvas") return "Ada berapa jenis benda?";
      return `Jenis apa yang ${(cara === "klik" ? d.klik : d.suara) === "terbanyak" ? "paling banyak" : "paling sedikit"}?`;
    case "nyata":
      if (cara === "kanvas") return "Berapa lebihnya?";
      if (cara === "klik" && d.klik === "paling") return "Lajur mana yang paling panjang?";
      if (cara === "klik" && d.klik === "sedikit") return "Lajur mana yang paling pendek?";
      return `${kapital(namaJ(d.jenis[0]))} dibanding ${namaJ(d.jenis[1])}: lebih, kurang, atau sama?`;
    default:
      return "";
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya (tanpa digit). `jawab`: kata yang dipilih atau diucapkan, atau angka yang dipilih atau ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number, rupa: Rupa = "benda"): string {
  void rupa;
  if (l.tipe === "salah") {
    if (l.jawabTokoh !== undefined && String(jawab) === String(l.jawabTokoh)) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab, rupa);
  }
  switch (l.tipe) {
    case "pile":
      if (cara === "suara") return "Pilah dulu menurut jenisnya, lalu hitung tiap jenis. Jenis yang barisnya paling panjang adalah yang paling banyak.";
      return "Pilah dulu menurut jenisnya, lalu hitung hanya jenis yang ditanyakan, satu per satu supaya tidak terlewat.";
    case "turus":
      if (cara === "klik") return "Satu bundel berisi lima turus. Hitung lima-lima untuk tiap bundel, lalu tambah garis yang tersisa.";
      if (cara === "kanvas") return l.kanvas === "sisa" ? "Garis sisa adalah garis tegak yang belum dicoret miring. Hitung hanya garis di luar bundel." : "Satu bundel adalah empat garis tegak yang dicoret miring. Hitung hanya bundel yang penuh.";
      return "Garis tegak untuk satu benda disebut turus. Empat garis tegak dan satu coretan miring disebut bundel, berisi lima turus.";
    case "pilihTurus":
      return "Hitung lima-lima untuk tiap bundel, lalu tambah garis sisanya. Cari turus yang sama dengan bilangan yang diminta.";
    case "mat":
      if (cara === "kanvas") return "Alas punya satu baris untuk tiap jenis. Hitung banyak baris yang ada.";
      return "Bandingkan panjang barisnya. Baris yang paling panjang paling banyak dan baris yang paling pendek paling sedikit.";
    case "urut":
      return "Bandingkan panjang barisnya. Mulai dari baris yang paling panjang, lalu yang lebih pendek.";
    case "nyata":
      if (cara === "kanvas") return "Cari selisih dua lajur: kurangi banyak benda lajur yang panjang dengan lajur yang pendek.";
      if (cara === "klik" && l.klik !== "arah") return "Semua lajur dimulai dari garis dasar yang sama, jadi bandingkan saja panjangnya.";
      return "Lihat lajur pertama lalu lajur kedua. Lajur yang lebih panjang punya benda lebih banyak, dan yang lebih pendek kurang banyak.";
    case "tabel":
      return "Hitung titik pada tiap baris, lalu cocokkan dengan banyaknya di tabel.";
  }
}

/** Petunjuk saat turus, tabel, atau baris yang diketuk keliru. */
export function petunjukKetuk(l: LPilihTurus | LTabel | LUrut, i: number): string {
  if (l.tipe === "pilihTurus") {
    const n = l.opsi[i];
    return n > l.n ? "Turus itu terlalu banyak. Hitung lima-lima untuk tiap bundel, lalu tambah garis sisa." : "Turus itu masih kurang. Hitung lima-lima untuk tiap bundel, lalu tambah garis sisa.";
  }
  if (l.tipe === "tabel") return "Tabel itu belum cocok. Hitung titik pada tiap baris, lalu cari tabel dengan banyaknya yang sama.";
  return "Bukan baris itu dulu. Bandingkan panjang barisnya, mulai dari yang paling banyak.";
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
/** Urutan jenis campur untuk tumpukan: deterministik, berselang supaya jenis tidak mengelompok. */
export function urutCampur(js: Jenis[]): number[] {
  const flat = js.flatMap((x, j) => Array.from({ length: x.n }, () => j));
  const t = flat.length;
  const langkah = [7, 5, 3, 11, 1].find((s) => {
    let a = s;
    let b = t;
    while (b) [a, b] = [b, a % b];
    return a === 1;
  }) ?? 1;
  return flat.map((_, i) => flat[(i * langkah) % t]);
}
const pecahBaris = (kata2: string[], per: number): string[] => Array.from({ length: Math.ceil(kata2.length / per) }, (_, i) => kata2.slice(i * per, (i + 1) * per).join(", "));
/** Isi kartu kata untuk tahap Abstract. */
export function barisKartu(l: LangkahDasar): string[] {
  switch (l.tipe) {
    case "pile":
      return pecahBaris(urutCampur(l.jenis).map((j) => namaJ(l.jenis[j])), 4);
    case "turus":
      return [`${bundelDari(l.n)} bundel lima`, sisaDari(l.n) > 0 ? `${sisaDari(l.n)} garis sisa` : "tidak ada garis sisa", `turus ${OBJEK[l.o].nama}`];
    case "pilihTurus":
      return l.opsi.map((n, i) => `Turus ${huruf(i)}: ${bundelDari(n)} bundel lima dan ${sisaDari(n)} garis`);
    case "mat":
      return l.jenis.map((j) => `${namaJ(j)}: ${j.n} benda`);
    case "urut":
      return l.jenis.map((j) => `Baris ${namaJ(j)}: ${j.n} benda`);
    case "nyata":
      return l.jenis.map((j) => `Lajur ${namaJ(j)}: ${j.n} benda`);
    case "tabel":
      return l.jenis.map((j) => `${namaJ(j)}: ${j.n} titik`);
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
