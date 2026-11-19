/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 1 Sub-Bab I "Papan Jadwal Kak Yoga" (faktor dan kelipatan), akhir cerita Penginapan Pulau Karang Indah:
 * jenis tugas, jawaban benar, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-jadwal-k4b1i.mjs.
 * Jawaban beragam: memilih bilangan atau pasangan faktor (klik), menulis satu angka di kanvas, dan mengucapkan satu kata (faktor, kelipatan, habis, sisa) atau bilangan pendek.
 * Jawaban benar dihitung dari data. Empat metode tiap misi: IGIL "Pasangan Faktor, Daftar Kelipatan, Cek Bagi Habis" (tugas faktor, banyak faktor, hubungan faktor dan kelipatan),
 * Factor Pairs (Pasangan Faktor), Multiples List (Daftar Kelipatan), dan Divisibility Check (Cek Bagi Habis).
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

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
/** Ubah teks berangka menjadi ucapan tanpa digit: "2 dan 9" menjadi "dua dan sembilan". */
export function ucapkan(t: string): string {
  return t
    .replace(/\d+/g, (d) => ` ${kataBil(Number(d))} `)
    .replace(/\s+/g, " ")
    .trim();
}
const URUTAN = ["", "pertama", "kedua", "ketiga", "keempat", "kelima", "keenam", "ketujuh", "kedelapan", "kesembilan"];

/* ------------------------------ Faktor dan kelipatan ------------------------------ */
/** Semua faktor `n` dari kecil ke besar. */
export const faktorDari = (n: number): number[] => Array.from({ length: n }, (_, i) => i + 1).filter((x) => n % x === 0);
export const jumlahFaktor = (n: number): number => faktorDari(n).length;
/** Banyak pasangan faktor (a, b) dengan a kali b sama dengan `n` dan a tidak lebih besar dari b. */
export const jumlahPasangan = (n: number): number => faktorDari(n).filter((x) => x * x <= n).length;
export const sisaBagi = (n: number, d: number): number => n % d;
/** Banyak kelipatan `b` yang tidak lebih besar dari `batas`. */
export const jumlahKelipatan = (b: number, batas: number): number => Math.floor(batas / b);

/* ------------------------------ Jenis tugas ------------------------------ */
/** Pasangan Faktor (IGIL, klik): tiga bilangan, hanya satu yang faktor dari `n`. */
export type LFaktor = { tipe: "faktor"; benda: string; n: number; pil: [number, number, number] };
/** Daftar Kelipatan (IGIL, kanvas dan Cari kesalahan klik): banyak faktor dari `n`. */
export type LBanyak = { tipe: "banyak"; benda: string; n: number };
/** Cek Bagi Habis (IGIL, suara): `a` membagi habis `b`; `arah` faktor bila ditanya hubungan a terhadap b, kelipatan bila ditanya b terhadap a. */
export type LSebut = { tipe: "sebut"; a: number; b: number; arah: "faktor" | "kelipatan" };
/** Factor Pairs: klik pasangan faktor `n` yang benar (tiga pilihan "a dan b"), kanvas banyak pasangan, suara pasangan dari faktor `a`. */
export type LPasang = { tipe: "pasang"; benda: string; n: number; a: number; pil: [string, string, string] };
/** Multiples List: klik kelipatan `b` di antara tiga bilangan, kanvas banyak kelipatan sampai `batas`, suara kelipatan ke-`k`. */
export type LDaftar = { tipe: "daftar"; benda: string; b: number; batas: number; k: number; pil: [number, number, number] };
/** Divisibility Check: klik bilangan yang bukan faktor `n`, kanvas sisa `n` dibagi `d`, suara habis atau sisa. */
export type LCek = { tipe: "cek"; benda: string; n: number; d: number; pil: [number, number, number] };
export type LangkahDasar = LFaktor | LBanyak | LSebut | LPasang | LDaftar | LCek;
/** Cari kesalahan: tokoh sudah menjawab dari `dasar`. Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. `jawabTokoh` adalah salah satu pilihan klik. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LBanyak | LPasang | LDaftar | LCek | LFaktor;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "pasang" | "daftar" | "cek";
export const URUT_METODE: Metode[] = ["igil", "pasang", "daftar", "cek"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Pasangan Faktor, Daftar Kelipatan, Cek Bagi Habis",
  pasang: "Factor Pairs: Pasangan Faktor",
  daftar: "Multiples List: Daftar Kelipatan",
  cek: "Divisibility Check: Cek Bagi Habis",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F9EE}", pasang: "\u{1F9E9}", daftar: "\u{1F4CB}", cek: "\u{1F50E}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", pasang: "Factor Pairs", daftar: "Multiples List", cek: "Divisibility Check" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });
/** Pasangan faktor yang benar dari tiga pilihan: hasil kalinya `n` (bukan jumlahnya). */
export const pasanganBenar = (l: LPasang): string => l.pil.find((p) => {
  const [a, b] = p.split(" dan ").map(Number);
  return a * b === l.n;
}) ?? "";

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari data. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "faktor":
      return angka(l.pil.find((x) => l.n % x === 0) ?? 0);
    case "banyak":
      return angka(jumlahFaktor(l.n));
    case "sebut":
      return nama(l.arah);
    case "pasang":
      return cara === "klik" ? nama(pasanganBenar(l)) : cara === "kanvas" ? angka(jumlahPasangan(l.n)) : angka(l.n / l.a);
    case "daftar":
      return cara === "klik" ? angka(l.pil.find((x) => x % l.b === 0) ?? 0) : cara === "kanvas" ? angka(jumlahKelipatan(l.b, l.batas)) : angka(l.b * l.k);
    case "cek":
      return cara === "klik" ? angka(l.pil.find((x) => l.n % x !== 0) ?? 0) : cara === "kanvas" ? angka(sisaBagi(l.n, l.d)) : nama(sisaBagi(l.n, l.d) === 0 ? "habis" : "sisa");
  }
}

/** Apakah tugas langsung siap dijawab? Semua tugas punya jawaban, kecuali Cari kesalahan yang memakai kegiatan lebih dulu. Tidak bergantung pada rupa. */
export function siapLangsung(l: Langkah, rupa: Rupa, cara: Cara): boolean {
  void rupa;
  if (l.tipe === "salah") return false;
  return kunciJawab(l, cara) !== null;
}

/* ------------------------------ Pilihan ------------------------------ */
/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisipkan<T>(benar: T, lain: T[], geser: number): T[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}
const angkaDariTeks = (t: string): number => Number(/\d+/.exec(t)?.[0] ?? -1);

/** Pengecoh bilangan untuk jawaban angka: kesalahan khas, lalu bilangan di dekatnya. */
export function pengecoh(l: Langkah, cara: Cara, awal?: number): number[] {
  const d = dasarDari(l);
  const k = kunciJawab(d, cara);
  const n = k?.jenis === "angka" ? k.n : 0;
  let khas: number[] = [];
  if (d.tipe === "banyak") khas = [jumlahPasangan(d.n), d.n, jumlahFaktor(d.n) - 1];
  else if (d.tipe === "pasang") khas = cara === "kanvas" ? [jumlahFaktor(d.n), jumlahPasangan(d.n) + 1] : [d.n - d.a, d.a];
  else if (d.tipe === "daftar") khas = cara === "kanvas" ? [Math.floor(d.batas / d.b) + 1, d.k] : [d.b + d.k, d.b * (d.k + 1)];
  else if (d.tipe === "cek") khas = cara === "kanvas" ? [d.d - sisaBagi(d.n, d.d), Math.floor(d.n / d.d)] : [d.d, Math.floor(d.n / d.d)];
  const calon = [awal ?? -1, ...khas, n + 1, n - 1, n + 2, n - 2, n + 10];
  const hasil: number[] = [];
  for (const c of calon) if (Number.isInteger(c) && c >= 1 && c <= 999 && c !== n && !hasil.includes(c)) hasil.push(c);
  return hasil;
}

/** Tiga pilihan untuk tugas klik: jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k) return [];
  const d = dasarDari(l);
  if (d.tipe === "faktor" || d.tipe === "daftar" || d.tipe === "cek") return d.pil.map(String);
  if (d.tipe === "pasang") return [...d.pil];
  const awal = l.tipe === "salah" ? angkaDariTeks(l.jawabTokoh) : undefined;
  const n = k.jenis === "angka" ? k.n : 0;
  const [a, b] = pengecoh(l, "klik", awal);
  return sisipkan(String(n), [String(a), String(b)], n);
}
/** Pilihan cadangan untuk tugas suara (kata atau bilangan dalam kata). */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k) return [];
  const d = dasarDari(l);
  if (k.jenis === "angka") {
    const lain: number[] = [];
    for (const x of [...pengecoh(l, cara), k.n + 10, k.n - 10, k.n + 1, k.n - 1]) if (x >= 1 && x <= 999 && x !== k.n && !lain.includes(x)) lain.push(x);
    return sisipkan(kataBil(k.n), lain.slice(0, 2).map(kataBil), k.n);
  }
  if (d.tipe === "sebut") return sisipkan(k.nama, ["faktor", "kelipatan", "habis"].filter((x) => x !== k.nama).slice(0, 2), k.nama.length);
  return sisipkan(k.nama, ["habis", "sisa", "faktor"].filter((x) => x !== k.nama).slice(0, 2), k.nama.length);
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));
/** Teks pilihan klik yang benar (bilangan atau pasangan). */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  if (!k) return null;
  return k.jenis === "nama" ? k.nama : String(k.n);
}

/* ------------------------------ Kalimat ------------------------------ */
const sebutBidang = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : rupa === "benda" ? "papan pantai" : "kertas jadwal");
const deretKata = (xs: number[]): string => xs.map(kataBil).join(", ");

export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  const k = kunciJawab(d, cara);
  const n = k?.jenis === "angka" ? k.n : 0;
  switch (d.tipe) {
    case "faktor":
      return `${kataBil(n)} membagi habis ${kataBil(d.n)} tanpa sisa, jadi ${kataBil(n)} adalah faktor dari ${kataBil(d.n)}.`;
    case "banyak":
      return `Faktor ${kataBil(d.n)} adalah ${deretKata(faktorDari(d.n))}. Semuanya ada ${kataBil(n)}, dan satu serta bilangan itu sendiri selalu termasuk.`;
    case "sebut":
      return d.arah === "faktor" ? `${kataBil(d.b)} dibagi ${kataBil(d.a)} habis, jadi ${kataBil(d.a)} adalah faktor dari ${kataBil(d.b)}.` : `${kataBil(d.b)} adalah hasil kali ${kataBil(d.a)} dengan ${kataBil(d.b / d.a)}, jadi ${kataBil(d.b)} adalah kelipatan ${kataBil(d.a)}.`;
    case "pasang":
      return cara === "klik"
        ? `Pasangan faktor dikalikan, bukan dijumlahkan. ${ucapkan(pasanganBenar(d).replace(" dan ", " kali "))} sama dengan ${kataBil(d.n)}.`
        : cara === "kanvas"
          ? `Faktor ${kataBil(d.n)} adalah ${deretKata(faktorDari(d.n))}, jadi ada ${kataBil(n)} pasangan.`
          : `${kataBil(d.a)} kali ${kataBil(n)} sama dengan ${kataBil(d.n)}, jadi pasangannya ${kataBil(n)}.`;
    case "daftar":
      return cara === "klik"
        ? `Kelipatan ${kataBil(d.b)} adalah hasil kali ${kataBil(d.b)} dengan bilangan asli, dan ${kataBil(n)} dibagi ${kataBil(d.b)} habis.`
        : cara === "kanvas"
          ? `Kelipatan ${kataBil(d.b)} sampai ${kataBil(d.batas)} ada ${kataBil(n)}.`
          : `Kelipatan ${URUTAN[d.k]} dari ${kataBil(d.b)} adalah ${kataBil(d.b)} kali ${kataBil(d.k)}, yaitu ${kataBil(n)}.`;
    case "cek":
      return cara === "klik"
        ? `${kataBil(d.n)} dibagi ${kataBil(n)} masih bersisa, jadi ${kataBil(n)} bukan faktor dari ${kataBil(d.n)}.`
        : cara === "kanvas"
          ? `${kataBil(d.n)} dibagi ${kataBil(d.d)} sama dengan ${kataBil(Math.floor(d.n / d.d))} sisa ${kataBil(n)}.`
          : sisaBagi(d.n, d.d) === 0
            ? `${kataBil(d.n)} dibagi ${kataBil(d.d)} habis tanpa sisa, jadi ${kataBil(d.d)} faktor dari ${kataBil(d.n)}.`
            : `${kataBil(d.n)} dibagi ${kataBil(d.d)} masih bersisa ${kataBil(sisaBagi(d.n, d.d))}, jadi ${kataBil(d.d)} bukan faktor.`;
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebutBidang(rupa);
  const aw = AWALAN[metode];
  const akhir = cara === "klik" ? "Pilih jawabannya." : cara === "kanvas" ? "Tulis satu angka di kanvas." : "Ucapkan bilangannya.";
  switch (l.tipe) {
    case "faktor":
      return `${aw}: lihat bilangan ${kataBil(l.n)} pada ${g} ini. Mana yang faktor dari ${kataBil(l.n)}? Pilih jawabannya.`;
    case "banyak":
      return `${aw}: lihat bilangan ${kataBil(l.n)} pada ${g} ini. Berapa banyak faktornya? ${akhir}`;
    case "sebut":
      return l.arah === "faktor"
        ? `${aw}: ${kataBil(l.a)} membagi habis ${kataBil(l.b)} pada ${g} ini. ${kataBil(l.a)} adalah apa dari ${kataBil(l.b)}? Ucapkan satu kata: faktor atau kelipatan.`
        : `${aw}: ${kataBil(l.a)} membagi habis ${kataBil(l.b)} pada ${g} ini. ${kataBil(l.b)} adalah apa dari ${kataBil(l.a)}? Ucapkan satu kata: faktor atau kelipatan.`;
    case "pasang":
      return cara === "klik"
        ? `${aw}: cari pasangan faktor dari ${kataBil(l.n)} pada ${g} ini. Pasangan mana yang benar? Pilih jawabannya.`
        : cara === "kanvas"
          ? `${aw}: cari pasangan faktor dari ${kataBil(l.n)} pada ${g} ini. Berapa banyak pasangannya? ${akhir}`
          : `${aw}: pasangan faktor dari ${kataBil(l.n)} pada ${g} ini. ${kataBil(l.a)} dikalikan berapa sama dengan ${kataBil(l.n)}? Ucapkan bilangannya.`;
    case "daftar":
      return cara === "klik"
        ? `${aw}: tulis daftar kelipatan ${kataBil(l.b)} pada ${g} ini. Mana yang kelipatan ${kataBil(l.b)}? Pilih jawabannya.`
        : cara === "kanvas"
          ? `${aw}: tulis daftar kelipatan ${kataBil(l.b)} sampai ${kataBil(l.batas)} pada ${g} ini. Berapa banyak kelipatannya? ${akhir}`
          : `${aw}: daftar kelipatan ${kataBil(l.b)} pada ${g} ini. Berapa kelipatan ${URUTAN[l.k]} dari ${kataBil(l.b)}? Ucapkan bilangannya.`;
    case "cek":
      return cara === "klik"
        ? `${aw}: cek bagi habis untuk bilangan ${kataBil(l.n)} pada ${g} ini. Mana yang bukan faktor dari ${kataBil(l.n)}? Pilih jawabannya.`
        : cara === "kanvas"
          ? `${aw}: bagi ${kataBil(l.n)} dengan ${kataBil(l.d)} pada ${g} ini. Berapa sisanya? ${akhir}`
          : `${aw}: bagi ${kataBil(l.n)} dengan ${kataBil(l.d)} pada ${g} ini. Hasilnya habis atau bersisa? Ucapkan satu kata: habis atau sisa.`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "faktor":
      return `Mana yang faktor dari ${kataBil(d.n)}?`;
    case "banyak":
      return `Berapa banyak faktor dari ${kataBil(d.n)}?`;
    case "sebut":
      return "Faktor atau kelipatan?";
    case "pasang":
      return cara === "klik" ? "Pasangan faktor mana yang benar?" : cara === "kanvas" ? "Berapa banyak pasangan faktor?" : "Berapa pasangannya?";
    case "daftar":
      return cara === "klik" ? `Mana yang kelipatan ${kataBil(d.b)}?` : cara === "kanvas" ? "Berapa banyak kelipatan?" : `Berapa kelipatan ${URUTAN[d.k]}?`;
    case "cek":
      return cara === "klik" ? `Mana yang bukan faktor dari ${kataBil(d.n)}?` : cara === "kanvas" ? "Berapa sisanya?" : "Habis atau sisa?";
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya (tanpa digit). `jawab`: kata atau bilangan yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "faktor":
      return "Faktor adalah bilangan yang membagi habis bilangan itu. Bagi bilangan itu dengan tiap pilihan, lalu lihat siapa yang tidak bersisa.";
    case "banyak":
      return "Mulai dari satu dan ikuti pasangan faktornya. Satu dan bilangan itu sendiri juga faktor, jadi jangan sampai terlewat.";
    case "sebut":
      return "Faktor membagi habis, sedangkan kelipatan adalah hasil kali. Bilangan yang lebih kecil adalah faktor, bilangan yang lebih besar adalah kelipatan.";
    case "pasang":
      return cara === "klik"
        ? "Pasangan faktor dikalikan menjadi bilangan itu. Jumlahnya tidak ikut diperhitungkan. Kalikan kedua bilangan pada tiap pilihan."
        : cara === "kanvas"
          ? "Cari faktor mulai dari satu, lalu pasangkan tiap faktor kecil dengan faktor besarnya. Berhenti bila pasangannya sudah berulang."
          : "Pasangan faktor dikalikan menjadi bilangan itu. Bagi bilangan itu dengan faktor yang diketahui.";
    case "daftar":
      return cara === "klik"
        ? "Kelipatan adalah hasil kali dengan bilangan asli. Bagi tiap pilihan dengan bilangan itu, kelipatan tidak bersisa."
        : cara === "kanvas"
          ? "Tulis hasil kali dengan satu, dua, tiga, dan seterusnya. Berhenti sebelum melewati batas, lalu hitung banyaknya."
          : "Kalikan bilangan itu dengan urutan yang diminta, atau tambah berulang sampai urutan itu.";
    case "cek":
      return cara === "klik"
        ? "Bagi bilangan itu dengan tiap pilihan. Yang bukan faktor masih meninggalkan sisa."
        : cara === "kanvas"
          ? "Bagi dulu sampai sisanya lebih kecil dari pembagi. Sisa itulah jawabannya."
          : "Bagi bilangan itu. Kalau tidak ada sisa, jawabannya habis, kalau masih ada sisa, jawabannya sisa.";
  }
}

/* ------------------------------ Susunan baris-kolom (Concrete dan Pictorial) ------------------------------ */
/** Banyak kolom susunan `n` benda dalam `a` baris: `n / a` bila tidak lebih dari sepuluh, selain itu faktor terbesar `n` yang tidak lebih dari sepuluh (mis. 48 menjadi 6 baris x 8 kolom). */
export function kolomPasang(n: number, a: number): number {
  const c = n / a;
  if (Number.isInteger(c) && c <= 10) return c;
  for (let k = 10; k >= 2; k -= 1) if (n % k === 0) return k;
  return 10;
}
/** Banyak benda atau titik, kolom per baris, dan batas sisa (merah) pada gambar Concrete dan Pictorial sebuah tugas; baris-kolom selalu sesuai datanya. */
export function susunan(d: LangkahDasar, cara?: Cara): { n: number; kolom: number; sisaDari?: number } | null {
  switch (d.tipe) {
    case "faktor":
    case "banyak":
      return { n: d.n, kolom: Math.min(10, d.n) };
    case "pasang":
      return { n: d.n, kolom: kolomPasang(d.n, d.a) };
    case "cek":
      return cara === "klik" ? { n: d.n, kolom: 10 } : { n: d.n, kolom: d.d, sisaDari: d.n - (d.n % d.d) };
    case "sebut":
      return { n: d.b, kolom: d.b / d.a };
    case "daftar":
      return { n: d.b, kolom: Math.min(10, d.b) };
  }
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
/** Isi kartu kata untuk tahap Abstract (kata dan angka, tanpa emoji). */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  switch (l.tipe) {
    case "faktor":
      return [`bilangan: ${l.n}`, `pilihan: ${l.pil.join(", ")}`, "faktor dari bilangan: ?"];
    case "banyak":
      return [`bilangan: ${l.n}`, "faktor: satu dan bilangan itu sendiri termasuk", "banyak faktor: ?"];
    case "sebut":
      return [`${l.a} membagi habis ${l.b}`, l.arah === "faktor" ? `${l.a} adalah ... dari ${l.b}` : `${l.b} adalah ... dari ${l.a}`, "faktor atau kelipatan: ?"];
    case "pasang":
      return [`bilangan: ${l.n}`, cara === "klik" ? `pilihan: ${l.pil.join("; ")}` : cara === "kanvas" ? "pasangan: a kali b sama dengan bilangan" : `${l.a} x ? = ${l.n}`, cara === "klik" ? "pasangan faktor yang benar: ?" : cara === "kanvas" ? "banyak pasangan: ?" : "pasangan: ?"];
    case "daftar":
      return [`bilangan: ${l.b}`, cara === "klik" ? `pilihan: ${l.pil.join(", ")}` : cara === "kanvas" ? `batas: ${l.batas}` : `urutan kelipatan: ke-${l.k}`, cara === "klik" ? "kelipatan: ?" : cara === "kanvas" ? "banyak kelipatan: ?" : "kelipatannya: ?"];
    case "cek":
      return [cara === "klik" ? `bilangan: ${l.n}` : `${l.n} dibagi ${l.d}`, cara === "klik" ? `pilihan: ${l.pil.join(", ")}` : cara === "kanvas" ? "hasil bagi dan sisa" : "habis atau sisa", cara === "klik" ? "bukan faktor: ?" : cara === "kanvas" ? "sisa: ?" : "jawaban: ?"];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
