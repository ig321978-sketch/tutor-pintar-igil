/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 4 Sub-Bab B "Sudut Kak Anton" (sudut pada bidang datar):
 * jenis tugas, kunci, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-sudut-k3b4b.mjs.
 * Jawaban beragam: memilih besar sudut (derajat), jenis sudut, atau kegiatan (klik), menulis SATU angka di kanvas (banyak pojok kertas, banyak sudut dari jenis tertentu, nomor langkah),
 * dan mengucapkan satu kata (busur, derajat, lancip, siku-siku, tumpul, lurus, refleks) atau bilangan pendek. Kunci dihitung dari data, bukan kunci tetap.
 * Empat metode tiap misi: IGIL "Pojok Kertas, Busur dari Nol, Baca Skala" (membaca busur dan alat ukur), Paper Folding (Lipat Kertas: membandingkan dengan pojok kertas),
 * Benchmark Angles (Sudut Acuan: siku-siku dan lurus), Protractor Walk (Langkah Busur: empat langkah memakai busur).
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { jenisDari, type JenisSudut } from "./data-sim";

/** Urutan dalam kata baku: pertama, kedua, ketiga, keempat. */
const urutKata = (n: number): string => ["pertama", "kedua", "ketiga", "keempat"][n - 1] ?? String(n);

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";
export { jenisDari, type JenisSudut };

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);
export const HURUF = ["A", "B", "C", "D", "E", "F", "G", "H"] as const;
export const huruf = (i: number): string => HURUF[i] ?? "?";

/* ------------------------------ Kata bilangan ------------------------------ */
const SAT = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"] as const;
/** Nama bilangan 0 sampai 999 dalam kata (tanpa digit): seratus, dua puluh tiga, tiga ratus enam puluh. */
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
/** Ubah teks berangka dan berderajat menjadi ucapan tanpa digit: "50°" menjadi "lima puluh derajat". */
export function ucapkan(t: string): string {
  return t
    .replace(/(\d+)°/g, (_m, d: string) => ` ${kataBil(Number(d))} derajat `)
    .replace(/\d+/g, (d) => ` ${kataBil(Number(d))} `)
    .replace(/\s+/g, " ")
    .trim();
}

/* ------------------------------ Jenis tugas ------------------------------ */
export type Sisi = "kanan" | "kiri";
/** Membaca busur derajat: kaki pertama di garis nol pada sisi `sisi`, kaki kedua membentuk sudut `deg` (10 sampai 180). */
export type LBaca = { tipe: "baca"; benda: string; deg: number; sisi: Sisi };
/** Jenis sudut `deg`. `acuan` salah: dibandingkan dengan pojok kertas lipat (lancip, siku-siku, tumpul); benar: dengan sudut acuan siku-siku dan lurus (tumpul, lurus, refleks). */
export type LJenis = { tipe: "jenis"; benda: string; deg: number; acuan: boolean };
/** Banyak pojok kertas (sembilan puluh derajat) yang muat dalam sudut `deg` (180, 270, atau 360). */
export type LHitung = { tipe: "hitung"; benda: string; deg: number };
/** Banyak sudut dari `jenis` di antara `daftar` (besar tiap sudut, derajat). */
export type LCacah = { tipe: "cacah"; benda: string; daftar: number[]; jenis: JenisSudut };
/** Empat langkah memakai busur: `nomor` (1 sampai 4) langkah ke berapa. */
export type LLangkah = { tipe: "langkah"; benda: string; nomor: number };
/** Menyebut nama alat (busur) atau satuan (derajat) untuk mengukur sudut. */
export type LSebut = { tipe: "sebut"; benda: string; tanya: "alat" | "satuan" };
export type LangkahDasar = LBaca | LJenis | LHitung | LCacah | LLangkah | LSebut;
/** Cari kesalahan: tokoh sudah menjawab dari `dasar`. Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. `jawabTokoh` memakai derajat ("40°") atau nama jenis. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LBaca | LJenis;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "lipat" | "acuan" | "busur";
export const URUT_METODE: Metode[] = ["igil", "lipat", "acuan", "busur"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Pojok Kertas, Busur dari Nol, Baca Skala",
  lipat: "Paper Folding: Lipat Kertas",
  acuan: "Benchmark Angles: Sudut Acuan",
  busur: "Protractor Walk: Langkah Busur",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F4D0}", lipat: "\u{1F4C4}", acuan: "\u{1F3AF}", busur: "\u{1F9ED}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", lipat: "Paper Folding", acuan: "Benchmark Angles", busur: "Protractor Walk" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/** Empat langkah memakai busur derajat. */
export const LANGKAH_TEKS = ["titik tengah busur di titik sudut", "garis nol busur di kaki pertama", "lihat kaki kedua, baca skala dari nol", "tulis hasilnya dengan satuan derajat"] as const;
/** Pilihan jenis sudut menurut cara membandingkan. */
export const DAFTAR_JENIS_LIPAT: JenisSudut[] = ["lancip", "siku-siku", "tumpul"];
export const DAFTAR_JENIS_ACUAN: JenisSudut[] = ["tumpul", "lurus", "refleks"];
const DAFTAR_NAMA = { alat: ["busur", "penggaris", "meteran"], satuan: ["derajat", "sentimeter", "meter"] };
export const namaSebut = (l: LSebut): string => (l.tanya === "alat" ? "busur" : "derajat");
export const daftarJenis = (l: LJenis): JenisSudut[] => (l.acuan ? DAFTAR_JENIS_ACUAN : DAFTAR_JENIS_LIPAT);
export const jumlahJenis = (l: LCacah): number => l.daftar.filter((d) => jenisDari(d) === l.jenis).length;

/** Angka hasil hitung tugas (besar sudut, banyak pojok, banyak sudut, atau nomor langkah). Tugas jenis dan sebut tidak punya angka. */
export function angkaTugas(l: LangkahDasar): number | null {
  switch (l.tipe) {
    case "baca":
      return l.deg;
    case "hitung":
      return l.deg / 90;
    case "cacah":
      return jumlahJenis(l);
    case "langkah":
      return l.nomor;
    default:
      return null;
  }
}

/* ------------------------------ Kunci ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });

/** Kunci tiap jenis tugas menurut caranya, dihitung dari data. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "jenis":
      return nama(jenisDari(l.deg));
    case "sebut":
      return nama(namaSebut(l));
    case "langkah":
      return cara === "kanvas" ? angka(l.nomor) : nama(LANGKAH_TEKS[l.nomor - 1]);
    default:
      return angka(angkaTugas(l) ?? 0);
  }
}

/** Apakah tugas langsung siap dijawab? Semua tugas punya kunci, kecuali Cari kesalahan yang memakai kegiatan lebih dulu. Tidak bergantung pada rupa. */
export function siapLangsung(l: Langkah, rupa: Rupa, cara: Cara): boolean {
  void rupa;
  if (l.tipe === "salah") return false;
  return kunciJawab(l, cara) !== null;
}

/* ------------------------------ Pilihan ------------------------------ */
/** Pengecoh khas untuk besar sudut yang dibaca: bacaan dari skala yang salah (180 dikurangi sudut), lalu sepuluh lebih kecil, sepuluh lebih besar, dan setengahnya. */
export function pengecoh(l: Langkah, awal?: number): number[] {
  const d = dasarDari(l);
  const n = d.tipe === "baca" ? d.deg : 0;
  const calon = [awal ?? -1, 180 - n, n - 10, n + 10, Math.round(n / 20) * 10, n - 20, n + 20];
  const hasil: number[] = [];
  for (const c of calon) if (Number.isInteger(c) && c >= 10 && c <= 180 && c !== n && !hasil.includes(c)) hasil.push(c);
  return hasil;
}
/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisipkan<T>(benar: T, lain: T[], geser: number): T[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}
const teksDerajat = (n: number): string => `${n}°`;
/** Derajat dalam jawaban klik tokoh: "40°" menjadi 40. */
const angkaDariTeks = (t: string): number => Number(/\d+/.exec(t)?.[0] ?? -1);
/** Tiga pilihan untuk tugas klik (besar sudut, jenis sudut, atau kegiatan): kunci tidak pernah di tombol pertama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k) return [];
  const d = dasarDari(l);
  if (k.jenis === "nama") {
    if (d.tipe === "jenis") return sisipkan(k.nama, daftarJenis(d).filter((x) => x !== k.nama), k.nama.length);
    if (d.tipe === "langkah") {
      const lain = LANGKAH_TEKS.filter((_, i) => i !== d.nomor - 1);
      const putar = d.nomor % 3;
      return sisipkan(k.nama, [lain[putar], lain[(putar + 1) % 3]], d.nomor);
    }
    return sisipkan(k.nama, DAFTAR_NAMA[(d as LSebut).tanya].filter((x) => x !== k.nama), k.nama.length);
  }
  const awal = l.tipe === "salah" ? angkaDariTeks(l.jawabTokoh) : undefined;
  const [a, b] = pengecoh(l, awal);
  return sisipkan(teksDerajat(k.n), [teksDerajat(a), teksDerajat(b)], k.n / 10);
}
/** Pilihan cadangan untuk tugas suara (kata atau bilangan dalam kata). */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k) return [];
  const d = dasarDari(l);
  if (k.jenis === "angka") {
    const [a, b] = pengecoh(l);
    return sisipkan(kataBil(k.n), [kataBil(a), kataBil(b)], k.n / 10);
  }
  if (d.tipe === "jenis") return sisipkan(k.nama, daftarJenis(d).filter((x) => x !== k.nama), k.nama.length);
  if (d.tipe === "sebut") return sisipkan(k.nama, DAFTAR_NAMA[d.tanya].filter((x) => x !== k.nama), k.nama.length);
  return [k.nama];
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));
/** Teks pilihan klik yang benar (derajat atau nama). */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  if (!k) return null;
  return k.jenis === "nama" ? k.nama : teksDerajat(k.n);
}

/* ------------------------------ Kalimat ------------------------------ */
const sebutRupa = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : "gambar");
const SISI_SKALA: Record<Sisi, string> = { kanan: "luar", kiri: "dalam" };
const BANDING: Record<JenisSudut, string> = {
  lancip: "lebih kecil daripada pojok kertas, jadi sudut lancip",
  "siku-siku": "pas dengan pojok kertas, jadi sudut siku-siku",
  tumpul: "lebih besar daripada pojok kertas tetapi belum lurus, jadi sudut tumpul",
  lurus: "tepat satu garis lurus, sama dengan dua pojok kertas, jadi sudut lurus",
  refleks: "lebih besar daripada sudut lurus, jadi sudut refleks",
};
const ACUAN: Record<JenisSudut, string> = {
  lancip: "lebih kecil daripada acuan siku-siku, jadi lancip",
  "siku-siku": "sama dengan acuan siku-siku",
  tumpul: "lebih besar daripada acuan siku-siku tetapi belum sampai acuan lurus, jadi tumpul",
  lurus: "sama dengan acuan lurus",
  refleks: "lebih besar daripada acuan lurus, jadi refleks",
};

export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  const k = kunciJawab(d, cara);
  const n = k?.jenis === "angka" ? k.n : 0;
  switch (d.tipe) {
    case "baca":
      return `Kaki pertama ada di garis nol pada sisi ${d.sisi}, jadi besar sudut dibaca dari skala ${SISI_SKALA[d.sisi]} yang dimulai dari nol. Kaki kedua menunjuk ${kataBil(d.deg)} derajat.`;
    case "jenis":
      return d.acuan ? `Sudut ini ${kataBil(d.deg)} derajat, ${ACUAN[jenisDari(d.deg)]}.` : `Sudut ini ${kataBil(d.deg)} derajat, ${BANDING[jenisDari(d.deg)]}.`;
    case "hitung":
      return `Satu pojok kertas ${kataBil(90)} derajat, dan ${kataBil(d.deg)} dibagi ${kataBil(90)} sama dengan ${kataBil(n)}, jadi muat ${kataBil(n)} pojok kertas.`;
    case "cacah":
      return `Ada ${kataBil(n)} sudut ${d.jenis}: ${d.jenis === "siku-siku" ? "sudut yang pas dengan pojok kertas" : d.jenis === "lancip" ? "sudut yang lebih kecil daripada siku-siku" : d.jenis === "tumpul" ? "sudut yang lebih besar daripada siku-siku tetapi belum lurus" : "sudut yang sama dengan lurus"}.`;
    case "langkah":
      return cara === "kanvas" ? `Kegiatan itu langkah ${urutKata(n)}.` : `Langkah ${urutKata(d.nomor)} pada busur adalah ${LANGKAH_TEKS[d.nomor - 1]}.`;
    case "sebut":
      return d.tanya === "alat" ? "Busur derajat adalah alat untuk mengukur sudut." : "Besar sudut ditulis dengan satuan derajat.";
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebutRupa(rupa);
  const aw = AWALAN[metode];
  const akhir = cara === "klik" ? "Pilih ukurannya." : cara === "kanvas" ? "Tulis satu angka di kanvas." : "Ucapkan bilangannya.";
  switch (l.tipe) {
    case "baca":
      return `${aw}: lihat busur derajat pada ${g} ini. Kaki pertama ada di garis nol. Berapa derajat besar sudutnya? ${akhir}`;
    case "jenis":
      return l.acuan
        ? `${aw}: sudut pada ${g} ini dibandingkan dengan sudut acuan, yaitu siku-siku dan lurus. Jenis sudut apa itu? ${cara === "klik" ? "Pilih jenisnya." : "Ucapkan satu kata."}`
        : `${aw}: sudut pada ${g} ini dibandingkan dengan pojok kertas lipat. Jenis sudut apa itu? ${cara === "klik" ? "Pilih jenisnya." : "Ucapkan satu kata."}`;
    case "hitung":
      return `${aw}: sudut pada ${g} ini dibandingkan dengan pojok kertas lipat. Berapa pojok kertas yang muat dalam sudut itu? Tulis satu angka di kanvas.`;
    case "cacah":
      return `${aw}: ada beberapa sudut pada ${g} ini. Berapa banyak sudut ${l.jenis}? Tulis satu angka di kanvas.`;
    case "langkah":
      return cara === "klik"
        ? `${aw}: busur derajat dipakai dengan empat langkah. Apa kegiatan pada langkah ${urutKata(l.nomor)}? Pilih kegiatannya.`
        : `${aw}: busur derajat dipakai dengan empat langkah. Kegiatan pada ${g} ini adalah langkah ke berapa? Tulis satu angka di kanvas.`;
    case "sebut":
      return l.tanya === "alat" ? `${aw}: lihat ${g} ini. Alat apa yang dipakai untuk mengukur sudut? Ucapkan satu kata.` : `${aw}: lihat ${g} ini. Besar sudut ditulis dengan satuan apa? Ucapkan satu kata.`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "baca":
      return "Berapa derajat besar sudutnya?";
    case "jenis":
      return "Jenis sudut apa itu?";
    case "hitung":
      return "Berapa pojok kertas yang muat?";
    case "cacah":
      return `Berapa banyak sudut ${d.jenis}?`;
    case "langkah":
      return cara === "kanvas" ? "Kegiatan itu langkah ke berapa?" : `Apa kegiatan pada langkah ${urutKata(d.nomor)}?`;
    case "sebut":
      return d.tanya === "alat" ? "Alat apa untuk mengukur sudut?" : "Satuan apa untuk besar sudut?";
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya (tanpa digit). `jawab`: kata atau ukuran yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "baca":
      return `Kaki pertama ada di garis nol pada sisi ${l.sisi}. Bacalah skala ${SISI_SKALA[l.sisi]} yang dimulai dari nol di sisi itu. Skala yang lain memberi bacaan yang salah.`;
    case "jenis":
      return l.acuan
        ? "Bandingkan dengan dua acuan. Lebih besar daripada siku-siku tetapi belum lurus berarti tumpul, tepat satu garis lurus berarti lurus, dan lebih besar daripada lurus berarti refleks."
        : "Bandingkan dengan pojok kertas lipat. Lebih kecil daripada pojok kertas berarti lancip, pas dengan pojok berarti siku-siku, dan lebih besar tetapi belum lurus berarti tumpul.";
    case "hitung":
      return "Satu pojok kertas sebesar sembilan puluh derajat. Bagilah besar sudut dengan sembilan puluh untuk mendapat banyak pojok kertas.";
    case "cacah":
      return l.jenis === "siku-siku"
        ? "Sudut siku-siku pas dengan pojok kertas lipat. Hitung hanya sudut yang kakinya pas dengan pojok."
        : l.jenis === "lancip"
          ? "Sudut lancip lebih kecil daripada siku-siku. Hitung hanya sudut yang lebih sempit daripada pojok kertas."
          : "Sudut tumpul lebih besar daripada siku-siku tetapi belum lurus. Hitung hanya sudut yang lebih lebar daripada pojok kertas.";
    case "langkah":
      return "Urutan langkah busur: titik tengah di titik sudut, garis nol di kaki pertama, lihat kaki kedua dan baca skala dari nol, lalu tulis hasilnya dengan derajat.";
    case "sebut":
      return l.tanya === "alat" ? "Penggaris dan meteran mengukur panjang. Sudut diukur dengan busur derajat." : "Sentimeter dan meter dipakai untuk panjang. Besar sudut ditulis dengan derajat.";
  }
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
/** Isi kartu kata untuk tahap Abstract (kata, angka, dan lambang derajat; tanpa emoji). */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  switch (l.tipe) {
    case "baca":
      return [`benda: ${l.benda}`, `kaki pertama di garis nol skala ${SISI_SKALA[l.sisi]}`, `bacaan skala luar: ${l.sisi === "kanan" ? l.deg : 180 - l.deg}°`, `bacaan skala dalam: ${l.sisi === "kiri" ? l.deg : 180 - l.deg}°`, "besar sudut: ?"];
    case "jenis":
      return l.acuan ? [`benda: ${l.benda}`, `besar sudut: ${l.deg}°`, "acuan: siku-siku 90° dan lurus 180°", "jenis sudut: ?"] : [`benda: ${l.benda}`, `besar sudut: ${l.deg}°`, "pembanding: pojok kertas lipat 90°", "jenis sudut: ?"];
    case "hitung":
      return [`benda: ${l.benda}`, "satu pojok kertas lipat: 90°", `besar sudut: ${l.deg}°`, "banyak pojok kertas: ?"];
    case "cacah": {
      const baris: string[] = [];
      for (let i = 0; i < l.daftar.length; i += 4) baris.push(l.daftar.slice(i, i + 4).map((d, j) => `${huruf(i + j)} ${d}°`).join("   "));
      return [`benda: ${l.benda}`, ...baris, `pembanding: siku-siku 90°`, `banyak sudut ${l.jenis}: ?`];
    }
    case "langkah":
      return cara === "kanvas" ? [`benda: ${l.benda}`, `kegiatan: ${LANGKAH_TEKS[l.nomor - 1]}`, "langkah ke: ?"] : [`benda: ${l.benda}`, `langkah ke: ${l.nomor}`, "kegiatan: ?"];
    case "sebut":
      return l.tanya === "alat" ? [`benda: ${l.benda}`, "gunanya: mengukur sudut", "nama alat: ?"] : [`benda: ${l.benda}`, "yang diukur: besar sudut", "satuan: ?"];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
