/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 5 Bab 2 Sub-Bab C "Klepon Bu Wati" (faktor: bagi tanpa sisa, pasangan faktor, daftar faktor, cek bagi):
 * jenis tugas, jawaban benar, pilihan, instruksi (tanpa digit), petunjuk salah, dan kartu data. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-piring-k5b2c.mjs.
 * Jawaban beragam: memilih (klik), menulis satu angka di kanvas, dan mengucapkan satu bilangan satu angka (rekam suara dengan pilihan ketuk). Jawaban benar dihitung dari data (logika-data.ts).
 * Empat metode tiap misi: IGIL "Potong dan Hitung, Pasangkan, Cek Bagi" (membaca pembagian), Cut and Count (Potong dan Hitung), Pair Up (Pasangkan), Divide Check (Cek Bagi).
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { ejaK5B1, kataK5B1 } from "../eja-k5b1";
import {
  bagiSisa,
  daftarTambahBukan,
  daftarTanpaBesar,
  daftarTanpaUjung,
  faktorDari,
  hasilKeliru,
  panjangKeliru,
  teksDaftar,
  teksHasil,
  wadahDari,
} from "./logika-data";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
export const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

/** Nama bilangan dalam kata (tanpa digit). */
export const kataBil = (n: number): string => kataK5B1(n);
export const kata = kataBil;
/** Angka dan tanda menjadi ucapan tanpa digit: "3 x 6 = 18" menjadi "tiga kali enam sama dengan delapan belas". */
export const ucapkan = (t: string): string => ejaK5B1(t.replace(/ x /g, " kali ")).replace(/\s+/g, " ").trim();

/* ------------------------------ Jenis tugas ------------------------------ */
/** Metode IGIL: membaca pembagian. `b` wadah (piring atau bagian) berisi sama banyak; `b` membagi `n`. Klik = isi satu wadah, kanvas = banyak wadah, suara = isi satu wadah. */
export type LIgil = { tipe: "igil"; n: number; b: number; satuan: string };
/** Cut and Count (Potong dan Hitung): `p` membagi `n`. Klik = isi wadah yang tidak menyisakan apa pun, kanvas = banyak wadah, suara = isi satu wadah dari banyak wadah. */
export type LPotong = { tipe: "potong"; n: number; p: number; satuan: string };
/** Pair Up (Pasangkan): `a` faktor `n`. Klik = daftar faktor yang lengkap, kanvas = pasangan `a`, suara = banyak faktor. */
export type LPasang = { tipe: "pasang"; n: number; a: number; satuan: string };
/** Divide Check (Cek Bagi): `n` dibagi `x`. Klik = hasil bagi dan sisa, kanvas = sisa, suara = banyak wadah penuh. */
export type LCek = { tipe: "cek"; n: number; x: number; satuan: string };
export type LangkahDasar = LIgil | LPotong | LPasang | LCek;
/** Cari kesalahan: tokoh sudah menjawab dari `dasar` (klik). Anak memutuskan benar atau salah, memilih alasan, lalu menjawab sendiri. `jawabTokoh` adalah teks pilihan klik tokoh. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LPotong | LPasang | LCek;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
  /** Posisi alasan benar pada tampilan (0 sampai 2); bila kosong dihitung dari teks. */
  posisi?: number;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "potong" | "pasang" | "cek";
export const URUT_METODE: Metode[] = ["igil", "potong", "pasang", "cek"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Potong dan Hitung, Pasangkan, Cek Bagi",
  potong: "Cut and Count: Potong dan Hitung",
  pasang: "Pair Up: Pasangkan",
  cek: "Divide Check: Cek Bagi",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F361}", potong: "\u{2702}\u{FE0F}", pasang: "\u{1F517}", cek: "\u{1F50D}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", potong: "Cut and Count", pasang: "Pair Up", cek: "Divide Check" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari data. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "igil": {
      const s = l.n / l.b;
      return cara === "klik" ? nama(`${s} ${l.satuan}`) : cara === "kanvas" ? angka(l.b) : angka(s);
    }
    case "potong":
      return cara === "klik" ? nama(`${l.p} ${l.satuan}`) : cara === "kanvas" ? angka(l.n / l.p) : angka(l.p);
    case "pasang":
      return cara === "klik" ? nama(teksDaftar(faktorDari(l.n))) : cara === "kanvas" ? angka(l.n / l.a) : angka(faktorDari(l.n).length);
    case "cek": {
      const { q, r } = bagiSisa(l.n, l.x);
      return cara === "klik" ? nama(teksHasil(q, r, l.satuan)) : cara === "kanvas" ? angka(r) : angka(q);
    }
  }
}

/** Apakah tugas langsung siap dijawab? Semua tugas punya jawaban, kecuali Cari kesalahan yang memakai kegiatan lebih dulu. */
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
const unik = <T,>(daftar: T[]): T[] => daftar.filter((x, i, a) => a.indexOf(x) === i);

/** Pilihan untuk tugas klik: jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k || k.jenis !== "nama") return [];
  const d = dasarDari(l);
  let hasil: string[];
  switch (d.tipe) {
    case "igil": {
      const s = d.n / d.b;
      const lain = unik([d.b, s + 1, s - 1, s + 2].filter((x) => x >= 1 && x !== s)).slice(0, 2).map((x) => `${x} ${d.satuan}`);
      hasil = sisipkan(k.nama, lain, d.n + d.b);
      break;
    }
    case "potong":
      hasil = sisipkan(k.nama, panjangKeliru(d.n, d.p).slice(0, 2).map((x) => `${x} ${d.satuan}`), d.n + d.p);
      break;
    case "pasang":
      hasil = sisipkan(k.nama, unik([daftarTanpaUjung(d.n), daftarTambahBukan(d.n), daftarTanpaBesar(d.n)]).filter((x) => x !== k.nama && x !== "").slice(0, 2), d.n + d.a + 1);
      break;
    case "cek":
      hasil = sisipkan(k.nama, hasilKeliru(d.n, d.x, d.satuan).slice(0, 2), d.n + d.x);
      break;
  }
  if (l.tipe === "salah" && !hasil.includes(l.jawabTokoh)) {
    const ganti = hasil.map((x, i) => (x !== k.nama ? i : -1)).filter((i) => i >= 0).pop() ?? -1;
    hasil = hasil.map((x, i) => (i === ganti ? l.jawabTokoh : x));
  }
  return hasil;
}
/** Pilihan cadangan untuk tugas suara (tiga bilangan dalam kata). Jawaban benar tidak pernah di tempat pertama. */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  if (cara !== "suara") return [];
  const k = kunciJawab(l, cara);
  if (!k || k.jenis !== "angka") return [];
  const lain = unik([k.n + 1, k.n - 1, k.n + 2, k.n - 2, k.n + 3, k.n - 3].filter((x) => x >= 1 && x <= 9)).slice(0, 2).map(kataBil);
  return sisipkan(kataBil(k.n), lain, k.n * 2 + 1);
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));
/** Teks pilihan klik yang benar. */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  return k && k.jenis === "nama" ? k.nama : null;
}

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : rupa === "diagram" ? "pita petak" : "baki");

/** Kalimat pembenaran setelah jawaban benar (diawali huruf kapital, tanpa menyebut gambar, kisi, atau petak pada tahap Abstract). */
export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "igil": {
      const s = d.n / d.b;
      const w = wadahDari(d.satuan);
      return cara === "klik"
        ? `Bilangan ${d.n} dibagi ke ${d.b} ${w} sama banyak, jadi satu ${w} berisi ${s} ${d.satuan}.`
        : cara === "kanvas"
          ? `Ada ${d.b} ${w}, karena ${d.b} x ${s} = ${d.n}.`
          : `Satu ${w} berisi ${s} ${d.satuan}, karena ${d.n} dibagi ${d.b} hasilnya ${s}.`;
    }
    case "potong": {
      const q = d.n / d.p;
      const w = wadahDari(d.satuan);
      return cara === "suara"
        ? `Dengan ${q} ${w}, tiap ${w} berisi ${d.p} ${d.satuan}, karena ${d.n} dibagi ${q} hasilnya ${d.p}.`
        : `Dengan ${d.p} ${d.satuan} tiap ${w}, ${d.n} ${d.satuan} menjadi ${q} ${w}${cara === "klik" ? " tanpa sisa" : ""}.`;
    }
    case "pasang": {
      const daftar = faktorDari(d.n);
      return cara === "klik"
        ? `Faktor ${d.n} adalah ${teksDaftar(daftar)}, dan satu serta ${d.n} selalu termasuk faktor.`
        : cara === "kanvas"
          ? `Pasangan ${d.a} adalah ${d.n / d.a}, karena ${d.a} x ${d.n / d.a} = ${d.n}.`
          : `Faktor ${d.n} ada ${daftar.length}: ${teksDaftar(daftar)}.`;
    }
    case "cek": {
      const { q, r } = bagiSisa(d.n, d.x);
      const w = wadahDari(d.satuan);
      return cara === "klik"
        ? `Bilangan ${d.n} dibagi ${d.x} menghasilkan ${q} ${w}${r === 0 ? `, tidak bersisa, jadi ${d.x} faktor ${d.n}` : ` dan bersisa ${r}, jadi ${d.x} bukan faktor ${d.n}`}.`
        : cara === "kanvas"
          ? `Sisanya ${r}, karena ${q} x ${d.x} = ${q * d.x} dan ${d.n} - ${q * d.x} = ${r}.`
          : `Ada ${q} ${w} yang penuh, karena ${d.n} dibagi ${d.x} hasilnya ${q}.`;
    }
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit: bilangan ditulis dengan kata. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  return awalKapital(instruksiMentah(l, rupa, cara, metode));
}
/** Awal tiap kalimat berhuruf kapital (bilangan dalam kata muncul di awal kalimat). */
const awalKapital = (t: string): string => t.replace(/(^|[.?!] )([a-z])/g, (_, a: string, b: string) => a + b.toUpperCase());
function instruksiMentah(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  const aw = AWALAN[metode];
  const tulis = "Tulis satu angka di kanvas.";
  const ucap = "Sebutkan bilangannya.";
  const w = wadahDari(l.satuan);
  const u = l.satuan;
  const awal = `${aw}: lihat ${g} ini.`;
  switch (l.tipe) {
    case "igil": {
      const bagi = `${kata(l.n)} ${u} dibagi ke ${kata(l.b)} ${w} sama banyak`;
      return cara === "klik"
        ? `${awal} ${bagi}. Pilih isi satu ${w}.`
        : cara === "kanvas"
          ? `${awal} ${kata(l.n)} ${u} dibagi sama banyak, tiap ${w} berisi ${kata(l.n / l.b)} ${u}. Berapa ${w} yang dipakai? ${tulis}`
          : `${awal} ${bagi}. Berapa ${u} di satu ${w}? ${ucap}`;
    }
    case "potong": {
      const bagi = rupa === "diagram" ? `Pita ${kata(l.n)} petak dipotong menjadi bagian sama panjang` : `${kata(l.n)} ${u} dibagi ke ${w} dengan isi sama banyak`;
      return cara === "klik"
        ? `${awal} ${bagi}. Pilih isi satu ${w} yang tidak menyisakan apa pun.`
        : cara === "kanvas"
          ? `${awal} ${bagi}, tiap ${w} berisi ${kata(l.p)} ${u}. Berapa ${w} yang didapat? ${tulis}`
          : `${awal} ${rupa === "diagram" ? `Pita ${kata(l.n)} petak dipotong sama panjang` : bagi} menjadi ${kata(l.n / l.p)} ${w}. Berapa ${u} di satu ${w}? ${ucap}`;
    }
    case "pasang":
      return cara === "klik"
        ? `${awal} Faktor selalu berpasangan. Cari semua faktor ${kata(l.n)}. Pilih daftar yang lengkap.`
        : cara === "kanvas"
          ? `${awal} ${kata(l.n)} ${u} ditata ke ${kata(l.a)} ${w} sama banyak. Berapa isi satu ${w}? ${tulis}`
          : `${awal} Faktor selalu berpasangan. Berapa banyak faktor ${kata(l.n)}? ${ucap}`;
    case "cek": {
      const tata = `${kata(l.n)} ${u} ditata, tiap ${w} berisi ${kata(l.x)} ${u}`;
      return cara === "klik"
        ? `${awal} ${tata}. Pilih hasil bagi dan sisanya.`
        : cara === "kanvas"
          ? `${awal} ${tata}. Berapa ${u} yang tersisa? ${tulis}`
          : `${awal} ${tata}. Berapa ${w} yang penuh? ${ucap}`;
    }
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara, rupa?: Rupa): string {
  void rupa;
  const d = dasarDari(l);
  const w = wadahDari(d.satuan);
  switch (d.tipe) {
    case "igil":
      return cara === "kanvas" ? `Berapa ${w} yang dipakai?` : `Satu ${w} berisi berapa ${d.satuan}?`;
    case "potong":
      return cara === "klik" ? `Isi ${w} yang mana tanpa sisa?` : cara === "kanvas" ? `Berapa ${w} yang didapat?` : `Satu ${w} berisi berapa ${d.satuan}?`;
    case "pasang":
      return cara === "klik" ? "Daftar faktor yang mana?" : cara === "kanvas" ? `Berapa isi satu ${w}?` : "Berapa banyak faktor?";
    case "cek":
      return cara === "klik" ? "Hasil bagi dan sisanya yang mana?" : cara === "kanvas" ? `Berapa ${d.satuan} yang tersisa?` : `Berapa ${w} yang penuh?`;
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya tanpa menyebut jawaban (tanpa digit, tanpa bilangan dalam kata, tanpa menyebut gambar pada tahap Abstract). `jawab`: pilihan atau kata yang diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "igil":
      return cara === "kanvas"
        ? "Bagi banyak seluruhnya dengan isi tiap wadah, lalu periksa hasilnya dengan perkalian."
        : "Bagi banyak seluruhnya dengan banyak wadah, karena isi tiap wadah harus sama banyak.";
    case "potong":
      return cara === "klik"
        ? "Isi wadah yang tepat membuat semuanya habis dibagi tanpa sisa. Coba tiap pilihan dengan pembagian."
        : cara === "kanvas"
          ? "Banyak wadah didapat dengan membagi banyak seluruhnya dengan isi tiap wadah."
          : "Isi tiap wadah didapat dengan membagi banyak seluruhnya dengan banyak wadah.";
    case "pasang":
      return cara === "klik"
        ? "Faktor selalu berpasangan, dan hasil kali tiap pasangan sama dengan bilangannya. Periksa pasangan yang terlewat."
        : cara === "kanvas"
          ? "Pasangan faktor dikalikan dengan faktor itu menghasilkan bilangan semula. Cari bilangan yang cocok."
          : "Cari semua pasangan faktor dari yang terkecil, lalu hitung seluruh faktor yang tertulis.";
    case "cek":
      return cara === "klik"
        ? "Bagi dengan teliti. Hasil bagi dikali pembagi, lalu tambah sisanya, harus sama dengan bilangan semula."
        : cara === "kanvas"
          ? "Sisa adalah bagian yang tidak cukup untuk memenuhi sebuah wadah lagi. Hitung dengan teliti."
          : "Hitung berapa kali pembagi muat dalam bilangan itu tanpa melebihinya.";
  }
}

/* ------------------------------ Tampilan satu tugas ------------------------------ */
export type TampilanPiring = { n: number; g: number; mode: "piring" | "pita"; judul: string; satuan: string };
/** Isi baki atau pita untuk satu tugas: banyak kue atau petak, pembagian yang digambar (g = 0: tanpa pembagian), dan judul gambar. */
export function tampilan(l: LangkahDasar, cara: Cara, rupa: Rupa): TampilanPiring {
  const mode = rupa === "benda" ? "piring" : "pita";
  let g = 0;
  switch (l.tipe) {
    case "igil":
      g = l.n / l.b;
      break;
    case "potong":
      g = cara === "kanvas" ? l.p : 0;
      break;
    case "pasang":
      g = 0;
      break;
    case "cek":
      g = rupa === "benda" ? l.x : 0;
      break;
  }
  const judul = mode === "pita" ? `pita ${l.n} petak` : g > 0 ? `${l.n} ${l.satuan} di piring` : `baki ${l.n} ${l.satuan}`;
  return { n: l.n, g, mode, judul, satuan: l.satuan };
}

/* ------------------------------ Kartu data (Abstract) ------------------------------ */
/** Isi kartu data untuk tahap Abstract (kata dan angka, tanpa emoji dan tanpa gambar). Tepat satu baris memuat tanda tanya. */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  const u = l.satuan;
  switch (l.tipe) {
    case "igil":
      return cara === "kanvas"
        ? [`banyak ${u}: ${l.n}`, `isi satu piring: ${l.n / l.b}`, "banyak piring: ?"]
        : [`banyak ${u}: ${l.n}`, `banyak piring: ${l.b}`, `isi satu piring: ? ${u}`];
    case "potong":
      return cara === "kanvas"
        ? [`banyak ${u}: ${l.n}`, `isi tiap piring: ${l.p}`, "banyak piring: ?"]
        : cara === "suara"
          ? [`banyak ${u}: ${l.n}`, `banyak piring: ${l.n / l.p}`, `isi tiap piring: ? ${u}`]
          : [`banyak ${u}: ${l.n}`, `isi piring tanpa sisa: ? ${u}`];
    case "pasang":
      return cara === "kanvas" ? [`bilangan: ${l.n}`, `faktor: ${l.a}`, "pasangannya: ?"] : cara === "suara" ? [`bilangan: ${l.n}`, "banyak faktor: ?"] : [`bilangan: ${l.n}`, "semua faktor: ?"];
    case "cek":
      return cara === "kanvas"
        ? [`banyak ${u}: ${l.n}`, `isi tiap piring: ${l.x}`, `sisa ${u}: ?`]
        : cara === "suara"
          ? [`banyak ${u}: ${l.n}`, `isi tiap piring: ${l.x}`, "banyak piring penuh: ?"]
          : [`banyak ${u}: ${l.n}`, `isi tiap piring: ${l.x}`, "hasil bagi dan sisa: ?"];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
