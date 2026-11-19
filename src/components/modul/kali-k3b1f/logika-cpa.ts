/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 1 Sub-Bab F "Telur Bu Mirna" (perkalian sampai seratus), Toko Kelontong Pak Joko:
 * jenis tugas, kunci, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-kali-k3b1f.mjs.
 * Jawaban tidak hanya angka: memilih kalimat atau angka, memilih sama atau berbeda, mengetuk susunan yang isinya sama, menyusun langkah mengalikan,
 * satu angka di kanvas, dan satu kata atau bilangan pendek yang diucapkan. Semua kunci dihitung dari data (bukan kunci tetap).
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
export type Nama = "kali" | "tambah" | "sama" | "beda" | "kotak" | "isi" | "baris" | "kolom";
export const URUT_NAMA: Nama[] = ["kali", "tambah", "sama", "beda", "kotak", "isi", "baris", "kolom"];
/** Tulisan tombol untuk tiap kata jawaban. */
export const LABEL_NAMA: Record<Nama, string> = {
  kali: "kali",
  tambah: "tambah",
  sama: "sama banyak",
  beda: "berbeda",
  kotak: "banyak kotak",
  isi: "isi tiap kotak",
  baris: "baris",
  kolom: "kolom",
};

/* ------------------------------ Kata bilangan ------------------------------ */
const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
const PULUHAN = ["", "", "dua puluh", "tiga puluh", "empat puluh", "lima puluh", "enam puluh", "tujuh puluh", "delapan puluh", "sembilan puluh"];
/** Bilangan nol sampai seratus dalam kata (tanpa digit). */
export function kata(n: number): string {
  if (n < 10) return SATUAN[n] ?? String(n);
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SATUAN[n - 10]} belas`;
  if (n < 100) return `${PULUHAN[Math.floor(n / 10)]}${n % 10 ? ` ${SATUAN[n % 10]}` : ""}`;
  if (n === 100) return "seratus";
  return String(n);
}

/* ------------------------------ Data ------------------------------ */
/** Wadah dan benda isinya; `ikon` (emoji benda) hanya untuk Concrete. */
export type Isi = { wadah: string; benda: string; ikon?: string };
/** `g` wadah yang masing-masing berisi `s` benda. */
export type Susunan = Isi & { g: number; s: number };
/** Susunan `r` baris dan `c` kolom (tiap baris `c` benda). */
export type Larik = { benda: string; ikon?: string; r: number; c: number };
export const hasilSusunan = (su: Susunan): number => su.g * su.s;
export const hasilLarik = (la: Larik): number => la.r * la.c;

/* ------------------------------ Langkah ------------------------------ */
/** Berapa benda semuanya: kunci angka (kanvas hanya bila hasilnya satu angka). */
export type LJumlah = { tipe: "jumlah"; su: Susunan };
/** Banyak wadah atau isi tiap wadah dibaca dari gambar. */
export type LBilangan = { tipe: "bilangan"; su: Susunan; tanya: "wadah" | "isi" };
/** Menulis perkalian: klik = pilih kalimat perkalian; kanvas dan suara = hasil kali. */
export type LTulis = { tipe: "tulis"; su: Susunan };
/** Penjumlahan berulang: klik = pilih penjumlahan; kanvas = berapa kali isi ditulis; suara = jumlah semuanya. */
export type LUlang = { tipe: "ulang"; su: Susunan };
/** Penjumlahan berulang ditulis singkat dengan kali: kunci kata. */
export type LCara = { tipe: "cara"; su: Susunan };
/** Bilangan yang ditandai pada g x s menunjukkan banyak wadah atau isi tiap wadah: kunci kata. */
export type LPeran = { tipe: "peran"; su: Susunan; bilangan: "g" | "s" };
/** Apakah isi semua wadah sama banyak: kunci kata sama atau berbeda. */
export type LSama = { tipe: "sama"; isi: Isi; banyak: number[] };
/** Ketuk susunan yang isi semua wadahnya sama (satu dari tiga): kegiatan, tanpa kunci. */
export type LPilihSama = { tipe: "pilihsama"; isi: Isi; pilihan: [number[], number[], number[]]; benar: number };
/** Susunan baris dan kolom: banyak baris, banyak kolom, atau semuanya. */
export type LBaris = { tipe: "baris"; la: Larik; tanya: "baris" | "kolom" | "semua" };
/** Susunan diputar seperempat putaran: banyak baris sekarang sama dengan banyak kolom semula. */
export type LPutar = { tipe: "putar"; la: Larik };
/** Deret mendatar disebut baris, deret tegak disebut kolom: kunci kata. */
export type LDeret = { tipe: "deret"; la: Larik; arah: "mendatar" | "tegak" };
/** Lompatan sama besar dari nol: hasil (titik pendaratan), banyak lompatan, atau besar tiap lompatan. */
export type LLompat = { tipe: "lompat"; m: number; n: number; tanya: "hasil" | "banyak" | "besar" };
/** Susun langkah mengalikan dengan mengetuk (klik). */
export type LUrutLangkah = { tipe: "urutlangkah" };
export type LangkahDasar = LJumlah | LBilangan | LTulis | LUlang | LCara | LPeran | LSama | LPilihSama | LBaris | LPutar | LDeret | LLompat | LUrutLangkah;

/**
 * Klaim tokoh pada tugas Cari kesalahan. `tambah`: tokoh menjumlah banyak wadah dengan isi tiap wadah (hasil g + s). `peran`: tokoh menyebut arti satu bilangan pada g x s.
 * `lompat`: tokoh menyebut titik pendaratan lompatan sebagai m + n.
 */
export type Klaim =
  | { jenis: "tambah"; su: Susunan; hasil: number }
  | { jenis: "peran"; su: Susunan; bilangan: "g" | "s"; katak: "kotak" | "isi" }
  | { jenis: "lompat"; m: number; n: number; hasil: number };
export type LangkahSalah = { tipe: "salah"; tokoh: string; klaim: Klaim; kataTokoh: string; alasan: [string, string, string]; benar: number; keliru: string };
export type Langkah = LangkahDasar | LangkahSalah;

export type Metode = "igil" | "isi" | "susunan" | "lompat";
export const URUT_METODE: Metode[] = ["igil", "isi", "susunan", "lompat"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Isi Sama, Tambah Berulang",
  isi: "Equal Groups: Isi Sama",
  susunan: "Array: Susunan Baris Kolom",
  lompat: "Skip Counting: Lompat Hitung",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F4A1}", isi: "\u{1F4E6}", susunan: "\u{1F4D0}", lompat: "\u{1F438}" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar | null => (l.tipe === "salah" ? null : l);

/** Langkah mengalikan (urutan benar). */
export const LANGKAH_KALI = ["Cari banyak kotak", "Cari isi tiap kotak", "Tulis perkalian", "Hitung hasilnya"] as const;
export const urutanLangkah = (): number[] => [0, 1, 2, 3];
/** Urutan acak tetap (bukan urutan benar) bagi sejumlah kartu. */
export function acakTetap(n: number, benar: number[]): number[] {
  const dasar = Array.from({ length: n }, (_, i) => i);
  for (let geser = 1; geser < n + 3; geser += 1) {
    const kandidat = dasar.map((i) => (i * 2 + geser) % n);
    if (new Set(kandidat).size === n && kandidat.some((v, i) => v !== benar[i])) return kandidat;
  }
  return dasar.map((i) => (i + 1) % n);
}

/* ------------------------------ Hitungan dari data ------------------------------ */
/** Wadah yang isinya sama (semua sama banyak)? */
export const semuaSama = (banyak: number[]): boolean => banyak.every((b) => b === banyak[0]);
/** Isi tiap wadah pada pilihan susunan ke-i sama semua? */
export const susunanSama = (l: LPilihSama, i: number): boolean => semuaSama(l.pilihan[i]);
/** Klaim tokoh benar? */
export function klaimBenar(k: Klaim): boolean {
  if (k.jenis === "tambah") return k.hasil === k.su.g * k.su.s;
  if (k.jenis === "peran") return k.katak === (k.bilangan === "g" ? "kotak" : "isi");
  return k.hasil === k.m * k.n;
}
/** Titik-titik pendaratan lompatan: 0, m, 2m, ... n m. */
export const pendaratan = (m: number, n: number): number[] => Array.from({ length: n + 1 }, (_, i) => i * m);
/** Penjumlahan berulang s ditulis g kali, mis. "5 + 5 + 5". */
export const penjumlahanBerulang = (s: number, g: number): string => Array.from({ length: g }, () => String(s)).join(" + ");

export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: Nama } | { jenis: "kalimat"; teks: string };

/** Kalimat penjumlahan berulang dan perkalian yang benar untuk tugas `ulang` dan `tulis`. */
export const kalimatKali = (su: Susunan): string => `${su.g} × ${su.s}`;

/** Kunci tiap tugas menurut caranya, dihitung dari data. Null bila tugas selesai lewat kegiatan (mengetuk, menyusun, memilih alasan). */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  switch (l.tipe) {
    case "salah":
    case "urutlangkah":
    case "pilihsama":
      return null;
    case "jumlah":
      return { jenis: "angka", n: hasilSusunan(l.su) };
    case "bilangan":
      return { jenis: "angka", n: l.tanya === "wadah" ? l.su.g : l.su.s };
    case "tulis":
      return cara === "klik" ? { jenis: "kalimat", teks: kalimatKali(l.su) } : { jenis: "angka", n: hasilSusunan(l.su) };
    case "ulang":
      return cara === "klik" ? { jenis: "kalimat", teks: penjumlahanBerulang(l.su.s, l.su.g) } : cara === "kanvas" ? { jenis: "angka", n: l.su.g } : { jenis: "angka", n: hasilSusunan(l.su) };
    case "cara":
      return { jenis: "nama", nama: "kali" };
    case "peran":
      return { jenis: "nama", nama: l.bilangan === "g" ? "kotak" : "isi" };
    case "sama":
      return { jenis: "nama", nama: semuaSama(l.banyak) ? "sama" : "beda" };
    case "baris":
      return { jenis: "angka", n: l.tanya === "baris" ? l.la.r : l.tanya === "kolom" ? l.la.c : hasilLarik(l.la) };
    case "putar":
      return { jenis: "angka", n: l.la.c };
    case "deret":
      return { jenis: "nama", nama: l.arah === "mendatar" ? "baris" : "kolom" };
    case "lompat":
      return { jenis: "angka", n: l.tanya === "hasil" ? l.m * l.n : l.tanya === "banyak" ? l.n : l.m };
  }
}

/**
 * Apakah tugas langsung siap dijawab (tanpa kegiatan lebih dulu)? Kanvas dan suara: ya (gambar sudah jadi). Klik: bila tugas punya jawaban pilihan;
 * tugas lain memakai kegiatan. Tidak bergantung pada rupa, sehingga tombol tidak macet pada lambang.
 */
export function siapLangsung(l: Langkah, _rupa: Rupa, cara: Cara): boolean {
  if (cara !== "klik") return true;
  return kunciJawab(l, cara) !== null;
}

/** Pilihan nama di sekitar kunci, selalu memuat kunci. */
export function pilihanNamaDari(nama: Nama): Nama[] {
  if (nama === "kali" || nama === "tambah") return ["tambah", "kali"];
  if (nama === "sama" || nama === "beda") return ["sama", "beda"];
  if (nama === "kotak" || nama === "isi") return ["kotak", "isi"];
  return ["baris", "kolom"];
}

const dalamBatas = (n: number, kecil: boolean): boolean => (kecil ? n >= 1 && n <= 9 : n >= 1 && n <= 100);
/**
 * Pilihan angka (empat) selalu memuat kunci, urut naik. `dekat`: pengecoh yang masuk akal (kesalahan umum), dipakai lebih dulu.
 * Kunci satu angka: semua pilihan satu angka; kunci dua angka: semua pilihan sampai seratus.
 */
export function pilihanAngka(n: number, dekat: number[] = []): number[] {
  const kecil = n <= 9;
  const umum = kecil ? [n - 2, n - 1, n + 1, n + 2, n + 3, n - 3, n + 4] : [n + 10, n - 10, n + 1, n - 1, n + 11, n - 11, n + 2, n - 2];
  const hasil: number[] = [];
  for (const x of [...dekat, ...umum]) if (x !== n && dalamBatas(x, kecil) && !hasil.includes(x) && hasil.length < 3) hasil.push(x);
  return [n, ...hasil].sort((a, b) => a - b);
}

/** Pengecoh khas perkalian a x b: jumlah dua bilangan dan salah satu wadah lebih atau kurang. */
const dekatKali = (a: number, b: number): number[] => [a + b, (a + 1) * b, a * (b + 1), (a - 1) * b, a * (b - 1)];

/** Empat pilihan angka tugas `l` menurut cara; kosong bila kunci bukan angka. */
export function pilihanAngkaTugas(l: Langkah, cara: Cara): number[] {
  const k = kunciJawab(l, cara);
  if (!k || k.jenis !== "angka") return [];
  switch (l.tipe) {
    case "jumlah":
    case "tulis":
      return pilihanAngka(k.n, dekatKali(l.su.g, l.su.s));
    case "ulang":
      return cara === "kanvas" ? pilihanAngka(k.n, [l.su.s]) : pilihanAngka(k.n, dekatKali(l.su.g, l.su.s));
    case "bilangan":
      return pilihanAngka(k.n, [l.tanya === "wadah" ? l.su.s : l.su.g]);
    case "baris":
      return l.tanya === "semua" ? pilihanAngka(k.n, dekatKali(l.la.r, l.la.c)) : pilihanAngka(k.n, [l.tanya === "baris" ? l.la.c : l.la.r]);
    case "putar":
      return pilihanAngka(k.n, [l.la.r]);
    case "lompat":
      return l.tanya === "hasil" ? pilihanAngka(k.n, [l.m + l.n, l.m * (l.n + 1), (l.m + 1) * l.n]) : pilihanAngka(k.n, [l.tanya === "banyak" ? l.m : l.n]);
    default:
      return pilihanAngka(k.n);
  }
}

/** Empat kalimat pilihan untuk tugas klik `tulis` dan `ulang` (kunci selalu ada; letaknya bergeser menurut data). */
export function pilihanKalimat(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k || k.jenis !== "kalimat") return [];
  let salah: string[] = [];
  if (l.tipe === "tulis") salah = [`${l.su.g} + ${l.su.s}`, `${l.su.g + 1} × ${l.su.s}`, `${l.su.g} × ${l.su.s + 1}`];
  else if (l.tipe === "ulang") {
    const { g, s } = l.su;
    salah = [penjumlahanBerulang(s, g - 1), penjumlahanBerulang(s, g + 1), s <= 6 && s !== g ? penjumlahanBerulang(g, s) : penjumlahanBerulang(s + 1, g)];
  }
  const semua = [k.teks, ...salah.filter((x) => x !== k.teks)];
  const geser = l.tipe === "tulis" ? (l.su.g + l.su.s) % 4 : (l.tipe === "ulang" ? l.su.g + l.su.s + 1 : 0) % 4;
  const urut = semua.slice(0, 4);
  return urut.map((_, i) => urut[(i + 4 - geser) % urut.length]);
}

/* ------------------------------ Kalimat ------------------------------ */
/** Kalimat yang menjelaskan jawaban benar (tanpa digit). */
export function kalimatKunci(l: Langkah, cara: Cara, rupa: Rupa = "benda"): string {
  void rupa;
  void cara;
  switch (l.tipe) {
    case "salah":
      return klaimBenar(l.klaim) ? `Jawaban ${l.tokoh} memang benar.` : `Jawaban ${l.tokoh} keliru.`;
    case "jumlah":
    case "tulis":
      return `${kata(l.su.g)} ${l.su.wadah} berisi ${kata(l.su.s)} ${l.su.benda}: ${kata(l.su.g)} kali ${kata(l.su.s)} sama dengan ${kata(hasilSusunan(l.su))}.`;
    case "bilangan":
      return l.tanya === "wadah" ? `Ada ${kata(l.su.g)} ${l.su.wadah}, jadi banyak ${l.su.wadah} adalah ${kata(l.su.g)}.` : `Tiap ${l.su.wadah} berisi ${kata(l.su.s)} ${l.su.benda}, jadi isi tiap ${l.su.wadah} adalah ${kata(l.su.s)}.`;
    case "ulang":
      return `Isi tiap ${l.su.wadah}, yaitu ${kata(l.su.s)}, ditambahkan ${kata(l.su.g)} kali. Jumlahnya ${kata(hasilSusunan(l.su))}, sama dengan ${kata(l.su.g)} kali ${kata(l.su.s)}.`;
    case "cara":
      return `Penjumlahan berulang dengan isi yang sama ditulis singkat dengan kali: ${kata(l.su.g)} kali ${kata(l.su.s)} sama dengan ${kata(hasilSusunan(l.su))}.`;
    case "peran":
      return l.bilangan === "g" ? `Bilangan pertama pada perkalian menunjukkan banyak ${l.su.wadah}.` : `Bilangan kedua pada perkalian menunjukkan isi tiap ${l.su.wadah}.`;
    case "sama":
      return semuaSama(l.banyak) ? `Isi semua ${l.isi.wadah} sama banyak, jadi perkalian bisa dipakai.` : `Isi ${l.isi.wadah} tidak sama banyak, jadi satu perkalian saja belum bisa dipakai.`;
    case "pilihsama":
      return `Susunan yang isi semua ${l.isi.wadah}-nya sama banyak adalah susunan yang bisa ditulis dengan satu perkalian.`;
    case "baris":
      return l.tanya === "baris"
        ? `Ada ${kata(l.la.r)} baris, yaitu deret mendatar.`
        : l.tanya === "kolom"
          ? `Ada ${kata(l.la.c)} kolom, yaitu deret tegak.`
          : `${kata(l.la.r)} baris kali ${kata(l.la.c)} kolom sama dengan ${kata(hasilLarik(l.la))} ${l.la.benda}.`;
    case "putar":
      return `Setelah diputar, ${kata(l.la.c)} kolom menjadi ${kata(l.la.c)} baris. Jumlah ${l.la.benda} tetap ${kata(hasilLarik(l.la))}.`;
    case "deret":
      return l.arah === "mendatar" ? "Deret mendatar disebut baris." : "Deret tegak disebut kolom.";
    case "lompat":
      return `${kata(l.n)} lompatan sebesar ${kata(l.m)} mendarat di ${kata(l.m * l.n)}, sama dengan ${kata(l.n)} kali ${kata(l.m)}.`;
    case "urutlangkah":
      return "Urutan mengalikan: cari banyak kotak, cari isi tiap kotak, tulis perkalian, lalu hitung hasilnya.";
  }
}

const lihat = (rupa: Rupa): string => (rupa === "benda" ? "Lihat gambar di rak telur." : rupa === "diagram" ? "Lihat diagram titik di lembar petak." : "Baca tulisan di papan struk.");
const aksiTulis = (cara: Cara): string => (cara === "kanvas" ? "Tulis satu angka di kanvas." : cara === "suara" ? "Ucapkan bilangannya." : "Pilih jawabannya.");
const aksiKata = (cara: Cara, pilihan: string): string => (cara === "suara" ? `Ucapkan satu kata: ${pilihan}.` : "Pilih jawabannya.");

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  const lh = lihat(rupa);
  switch (l.tipe) {
    case "salah":
      return `${l.tokoh} sudah menjawab tentang ${l.klaim.jenis === "tambah" ? "banyak semua barang" : l.klaim.jenis === "peran" ? "arti bilangan pada perkalian" : "titik pendaratan lompatan"}. Apakah jawabannya benar? Pilih alasan yang tepat.`;
    case "jumlah":
      return rupa === "lambang" ? `${lh} Berapa ${l.su.benda} semuanya? ${aksiTulis(cara)}` : `${lh} Isi tiap ${l.su.wadah} sama banyak. Berapa ${l.su.benda} semuanya? ${aksiTulis(cara)}`;
    case "bilangan":
      return l.tanya === "wadah" ? `${lh} Ada berapa ${l.su.wadah}? ${aksiTulis(cara)}` : `${lh} Tiap ${l.su.wadah} berisi berapa ${l.su.benda}? ${aksiTulis(cara)}`;
    case "tulis":
      return cara === "klik" ? `${lh} Pilih kalimat perkalian yang cocok: banyak ${l.su.wadah} dikali isi tiap ${l.su.wadah}.` : `${lh} Kalikan banyak ${l.su.wadah} dengan isi tiap ${l.su.wadah}. ${aksiTulis(cara)}`;
    case "ulang":
      return cara === "klik"
        ? `${lh} Pilih penjumlahan berulang yang cocok dengan susunannya.`
        : cara === "kanvas"
          ? `${lh} Isi tiap ${l.su.wadah} ditambahkan berulang. Berapa kali bilangan isi itu ditulis? ${aksiTulis(cara)}`
          : `${lh} Jumlahkan isi tiap ${l.su.wadah} secara berulang. Berapa ${l.su.benda} semuanya? ${aksiTulis(cara)}`;
    case "cara":
      return `${lh} Penjumlahan berulang dengan isi yang sama bisa ditulis singkat dengan tanda apa? ${aksiKata(cara, "kali, atau tambah")}`;
    case "peran":
      return `${lh} Pada perkalian itu, bilangan yang ditandai menunjukkan banyak ${l.su.wadah} atau isi tiap ${l.su.wadah}? ${aksiKata(cara, "kotak, atau isi")}`;
    case "sama":
      return `${lh} Apakah isi semua ${l.isi.wadah} sama banyak? ${aksiKata(cara, "sama, atau berbeda")}`;
    case "pilihsama":
      return `Ada tiga susunan ${l.isi.wadah}. Ketuk susunan yang isi semua ${l.isi.wadah}-nya sama banyak.`;
    case "baris":
      return l.tanya === "baris"
        ? `${lh} Ada berapa baris? Baris adalah deret mendatar. ${aksiTulis(cara)}`
        : l.tanya === "kolom"
          ? `${lh} Ada berapa kolom? Kolom adalah deret tegak. ${aksiTulis(cara)}`
          : `${lh} ${l.la.benda} tersusun dalam baris dan kolom. Berapa ${l.la.benda} semuanya? ${aksiTulis(cara)}`;
    case "putar":
      return `${lh} Susunan itu diputar seperempat putaran. Berapa baris sekarang? ${aksiTulis(cara)}`;
    case "deret":
      return `${lh} Deret yang ditandai arahnya ${l.arah}. Deret itu disebut baris atau kolom? ${aksiKata(cara, "baris, atau kolom")}`;
    case "lompat":
      return l.tanya === "hasil"
        ? `${lh} Lompatan sama besar dimulai dari nol. Di bilangan berapa lompatan terakhir mendarat? ${aksiTulis(cara)}`
        : l.tanya === "banyak"
          ? `${lh} Lompatan sama besar dimulai dari nol. Berapa kali lompatan dilakukan? ${aksiTulis(cara)}`
          : `${lh} Lompatan sama besar dimulai dari nol. Berapa besar tiap lompatan? ${aksiTulis(cara)}`;
    case "urutlangkah":
      return "Susun langkah mengalikan. Ketuk langkah pertama sampai terakhir secara berurutan.";
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  if (cara === "kanvas") return "Tulis jawabannya sebagai satu angka.";
  if (cara === "suara") {
    const k = kunciJawab(l, cara);
    return k?.jenis === "angka" ? "Ucapkan jawabannya." : "Ucapkan satu kata.";
  }
  return "Pilih jawaban yang tepat.";
}

/* ------------------------------ Petunjuk salah ------------------------------ */
/** Petunjuk saat ketukan pada tugas Urut langkah atau Pilih sama belum benar. */
export function petunjukKetuk(l: LUrutLangkah | LPilihSama): string {
  return l.tipe === "urutlangkah"
    ? "Mulai dari mencari banyak kotak, lalu isi tiap kotak, lalu menulis perkalian, dan terakhir menghitung hasilnya."
    : "Satu perkalian hanya bisa dipakai bila isi semua kotak sama banyak. Cari susunan yang isinya tidak berbeda-beda.";
}

/** Petunjuk saat jawaban angka atau kata salah: menunjuk kesalahannya (tanpa digit). `jawab`: kata yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number, rupa: Rupa = "benda"): string {
  void rupa;
  if (l.tipe === "salah") return `Lihat lagi. ${l.keliru}`;
  if (typeof jawab === "number") {
    const k = kunciJawab(l, cara);
    const kurang = k?.jenis === "angka" && jawab < k.n;
    const arah = kurang ? "Jawabanmu masih kurang." : "Jawabanmu terlalu banyak.";
    switch (l.tipe) {
      case "jumlah":
      case "tulis":
        return `Jumlahkan isi tiap ${l.su.wadah} berulang sebanyak ${l.su.wadah}nya, atau kalikan keduanya. Jangan hanya menambah dua bilangan. ${arah}`;
      case "bilangan":
        return l.tanya === "wadah" ? `Hitung dulu ${l.su.wadah}-nya satu per satu, bukan bendanya. ${arah}` : `Hitung benda dalam satu ${l.su.wadah} saja. ${arah}`;
      case "ulang":
        return cara === "kanvas" ? `Bilangan isi ditulis sebanyak ${l.su.wadah}nya. Hitung ${l.su.wadah}nya. ${arah}` : `Tambahkan isi tiap ${l.su.wadah} berulang sebanyak ${l.su.wadah}nya. ${arah}`;
      case "baris":
        return l.tanya === "semua" ? `Kalikan banyak baris dengan banyak kolom, atau tambahkan isi tiap baris berulang. ${arah}` : "Baris adalah deret mendatar dan kolom adalah deret tegak. Hitung deret yang tepat satu per satu.";
      case "putar":
        return "Saat diputar, kolom menjadi baris. Banyak baris sekarang sama dengan banyak kolom sebelum diputar.";
      case "lompat":
        return l.tanya === "hasil"
          ? `Tambahkan besar lompatan berulang sebanyak lompatannya, mulai dari nol. ${arah}`
          : l.tanya === "banyak"
            ? "Hitung busur lompatan, bukan angkanya. Satu busur satu lompatan."
            : "Besar lompatan adalah jarak antara dua titik pendaratan yang berurutan.";
      default:
        return "Periksa lagi gambarnya dengan teliti.";
    }
  }
  switch (l.tipe) {
    case "cara":
      return "Penjumlahan berulang dengan isi yang sama ditulis singkat dengan kali. Tambah dipakai untuk menggabung dua bilangan.";
    case "peran":
      return "Bilangan pertama pada perkalian menunjukkan banyak kotak, dan bilangan kedua menunjukkan isi tiap kotak.";
    case "sama":
      return "Bandingkan isi tiap kotak satu per satu. Kata sama dipakai bila semuanya sama, dan berbeda bila ada yang lain.";
    case "deret":
      return "Deret mendatar disebut baris, dan deret tegak disebut kolom.";
    default:
      return "Periksa lagi dengan teliti.";
  }
}
