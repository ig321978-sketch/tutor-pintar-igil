/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 1 Sub-Bab B "Gudang Handuk Pak Laode" (tempat angka dan banyaknya tiap angka, bilangan sampai 10.000):
 * jenis tugas, jawaban benar, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-handuk-k4b1b.mjs.
 * Jawaban beragam: memilih bilangan (klik), menulis satu angka di kanvas, dan mengucapkan nama tempat angka, kata (lebih, kurang), atau bilangan pendek.
 * Jawaban benar dihitung dari data. Empat metode tiap misi: IGIL "Balok Cacah, Bagan Tempat, Tukar Tempat" (baca tempat angka yang dilingkari),
 * Base-Ten Blocks (Balok Cacah), Place Chart (Bagan Tempat), dan Digit Swap (Tukar Tempat). Bilangan selalu tampil dengan titik ribuan dan suara mengeja kata.
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { ejaK4B1, kataBilK4B1 } from "../eja-k4b1";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

/* ------------------------------ Bilangan, tempat, dan kata ------------------------------ */
export const NAMA_TEMPAT = ["ribuan", "ratusan", "puluhan", "satuan"] as const;
/** Banyaknya satu angka pada tiap tempat: ribuan, ratusan, puluhan, satuan. */
export const HARGA_TEMPAT = [1000, 100, 10, 1] as const;
/** Empat angka bilangan `n` (0 sampai 9.999) dari ribuan ke satuan. */
export const digitDari = (n: number): number[] => [Math.floor(n / 1000) % 10, Math.floor(n / 100) % 10, Math.floor(n / 10) % 10, n % 10];
export const bilDari = (d: number[]): number => d[0] * 1000 + d[1] * 100 + d[2] * 10 + d[3];
/** Bilangan dengan titik ribuan: 4358 menjadi "4.358". */
export const formatBil = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
/** Nama bilangan dalam kata (tanpa digit), sampai 10.000. */
export const kataBil = kataBilK4B1;
export const kata = kataBil;
/** Ubah teks berangka menjadi ucapan tanpa digit: "angka 3 di 4.305" menjadi "angka tiga di empat ribu tiga ratus lima". */
export const ucapkan = (t: string): string => ejaK4B1(t).replace(/\s+/g, " ").trim();
/** Bilangan baru setelah angka pada tempat `a` dan tempat `b` ditukar. */
export function tukarBil(n: number, a: number, b: number): number {
  const d = digitDari(n);
  [d[a], d[b]] = [d[b], d[a]];
  return bilDari(d);
}
/** Banyak tempat yang berisi angka nol, dan nomor tempat nol pertama (-1 bila tidak ada). */
export const banyakNol = (n: number): number => digitDari(n).filter((x) => x === 0).length;
export const tempatNol = (n: number): number => digitDari(n).findIndex((x) => x === 0);
/** Banyaknya angka pada tempat `t`: angka dikali tempatnya. */
export const banyaknya = (n: number, t: number): number => digitDari(n)[t] * HARGA_TEMPAT[t];

/* ------------------------------ Jenis tugas ------------------------------ */
/** Metode IGIL: bilangan empat angka dengan satu tempat ditandai (dilingkari); klik = banyaknya angka itu, kanvas = angkanya, suara = nama tempatnya. */
export type LTempat = { tipe: "tempat"; n: number; tanda: number; benda: string };
/** Base-Ten Blocks (Balok Cacah): balok pada empat baris sebanyak angka tiap tempat; klik = seluruhnya, kanvas = banyak balok pada baris yang ditandai, suara = banyaknya baris itu. */
export type LBalok = { tipe: "balok"; n: number; tanda: number; benda: string };
/** Place Chart (Bagan Tempat): bagan empat kolom; klik = bilangan pada bagan, kanvas = banyak kolom berangka nol, suara = nama tempat berangka nol. */
export type LBagan = { tipe: "bagan"; n: number; benda: string };
/** Digit Swap (Tukar Tempat): angka pada tempat `a` dan tempat `b` ditukar; klik = bilangan baru, kanvas = angka pada tempat `a` sesudahnya, suara = lebih atau kurang dari semula. */
export type LTukar = { tipe: "tukar"; n: number; a: number; b: number; benda: string };
export type LangkahDasar = LTempat | LBalok | LBagan | LTukar;
/** Cari kesalahan: tokoh sudah menjawab dari `dasar`. Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. `jawabTokoh` adalah salah satu pilihan klik. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LangkahDasar;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "balok" | "bagan" | "tukar";
export const URUT_METODE: Metode[] = ["igil", "balok", "bagan", "tukar"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Balok Cacah, Bagan Tempat, Tukar Tempat",
  balok: "Base-Ten Blocks: Balok Cacah",
  bagan: "Place Chart: Bagan Tempat",
  tukar: "Digit Swap: Tukar Tempat",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F9EE}", balok: "\u{1F9F1}", bagan: "\u{1F4CB}", tukar: "\u{1F501}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", balok: "Base-Ten Blocks", bagan: "Place Chart", tukar: "Digit Swap" };

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
  const d = digitDari(l.n);
  switch (l.tipe) {
    case "tempat":
      return cara === "klik" ? angka(banyaknya(l.n, l.tanda)) : cara === "kanvas" ? angka(d[l.tanda]) : nama(NAMA_TEMPAT[l.tanda]);
    case "balok":
      return cara === "klik" ? angka(l.n) : cara === "kanvas" ? angka(d[l.tanda]) : angka(banyaknya(l.n, l.tanda));
    case "bagan":
      return cara === "klik" ? angka(l.n) : cara === "kanvas" ? angka(banyakNol(l.n)) : nama(NAMA_TEMPAT[tempatNol(l.n)]);
    case "tukar": {
      const baru = tukarBil(l.n, l.a, l.b);
      return cara === "klik" ? angka(baru) : cara === "kanvas" ? angka(d[l.b]) : nama(baru > l.n ? "lebih" : "kurang");
    }
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

/** Pengecoh bilangan untuk tugas klik dan suara: kesalahan khas (angka tanpa tempatnya, angka bertukar, nol hilang), lalu bilangan di dekatnya. */
export function pengecoh(l: Langkah, cara: Cara, awal?: number): number[] {
  const d = dasarDari(l);
  const k = kunciJawab(d, cara);
  const n = k?.jenis === "angka" ? k.n : 0;
  const dg = digitDari(d.n);
  let khas: number[] = [];
  if (d.tipe === "tempat") {
    const a = dg[d.tanda];
    khas = [a, a * 10, a * 100, a * 1000, a * HARGA_TEMPAT[Math.max(0, d.tanda - 1)], a * HARGA_TEMPAT[Math.min(3, d.tanda + 1)]];
  } else {
    const dasarBil = d.tipe === "tukar" ? tukarBil(d.n, d.a, d.b) : d.n;
    const sebagian = digitDari(dasarBil);
    const geser = [0, 1, 2].map((i) => {
      const e = [...sebagian];
      [e[i], e[i + 1]] = [e[i + 1], e[i]];
      return bilDari(e);
    });
    const tanpaNol = Number(sebagian.filter((x) => x !== 0).join("") || "0");
    khas = d.tipe === "tukar" ? [d.n, ...geser, tanpaNol] : d.tipe === "balok" && cara === "suara" ? [dg[d.tanda], dg[d.tanda] * 10, dg[d.tanda] * 100, dg[d.tanda] * 1000] : [...geser, tanpaNol];
    if (d.tipe !== "balok" || cara !== "suara") khas = [...khas, dasarBil + 10, dasarBil - 10, dasarBil + 100, dasarBil - 100];
  }
  const calon = [awal ?? -1, ...khas, n + 1, n - 1, n + 10, n - 10];
  const hasil: number[] = [];
  for (const c of calon) if (Number.isInteger(c) && c >= 1 && c <= 9999 && c !== n && !hasil.includes(c)) hasil.push(c);
  return hasil;
}
/** Bilangan dalam jawaban klik tokoh: "3.681" menjadi 3681, "5" menjadi 5. */
const angkaDariTeks = (t: string): number => {
  const m = /\d[\d.]*/.exec(t);
  return m ? Number(m[0].replace(/\./g, "")) : -1;
};

/** Tiga pilihan untuk tugas klik (bilangan dengan titik ribuan): jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k || k.jenis !== "angka") return [];
  const awal = l.tipe === "salah" ? angkaDariTeks(l.jawabTokoh) : undefined;
  const [a, b] = pengecoh(l, "klik", awal);
  return sisipkan(formatBil(k.n), [formatBil(a), formatBil(b)], k.n);
}
/** Pilihan cadangan untuk tugas suara (nama tempat, kata, atau bilangan dalam kata). */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k) return [];
  if (k.jenis === "angka") {
    const lain = pengecoh(l, cara).slice(0, 2).map(kataBil);
    return sisipkan(kataBil(k.n), lain, k.n);
  }
  if (k.nama === "lebih" || k.nama === "kurang") return sisipkan(k.nama, ["lebih", "kurang", "sama"].filter((x) => x !== k.nama), k.nama.length);
  return sisipkan(k.nama, NAMA_TEMPAT.filter((x) => x !== k.nama).slice(0, 2), k.nama.length);
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));
/** Teks pilihan klik yang benar (bilangan dengan titik ribuan). */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  if (!k) return null;
  return k.jenis === "nama" ? k.nama : formatBil(k.n);
}

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : rupa === "benda" ? "rak gudang" : "kertas denah");
const tempatKata = (t: number): string => NAMA_TEMPAT[t];

/** Uraian satu angka pada satu tempat: "tiga di tempat ratusan berarti tiga dikali seratus, yaitu tiga ratus". */
function uraian(d: number, t: number): string {
  const v = d * HARGA_TEMPAT[t];
  return t === 3 ? `angka ${kataBil(d)} di tempat satuan hanya berarti ${kataBil(d)}` : `angka ${kataBil(d)} di tempat ${tempatKata(t)} berarti ${kataBil(d)} dikali ${kataBil(HARGA_TEMPAT[t])}, yaitu ${kataBil(v)}`;
}

export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  const k = kunciJawab(d, cara);
  const n = k?.jenis === "angka" ? k.n : 0;
  const dg = digitDari(d.n);
  switch (d.tipe) {
    case "tempat":
      return cara === "klik" ? `${kapital(uraian(dg[d.tanda], d.tanda))}.` : cara === "kanvas" ? `Pada tempat ${tempatKata(d.tanda)} ada angka ${kataBil(n)}.` : `Angka yang dilingkari ada di tempat ${tempatKata(d.tanda)}, hitungan dari kanan: satuan, puluhan, ratusan, ribuan.`;
    case "balok":
      return cara === "klik"
        ? `Balok tiap baris dihitung menurut tempatnya, dan seluruhnya ${kataBil(d.n)}.`
        : cara === "kanvas"
          ? `Baris ${tempatKata(d.tanda)} memuat ${kataBil(n)} balok.`
          : `${kapital(kataBil(dg[d.tanda]))} balok pada baris ${tempatKata(d.tanda)} berarti ${kataBil(n)}.`;
    case "bagan":
      return cara === "klik"
        ? `Angka pada bagan dibaca dari ribuan ke satuan, jadi bilangannya ${kataBil(d.n)}.`
        : cara === "kanvas"
          ? `Ada ${kataBil(n)} kolom yang berisi angka nol.`
          : `Angka nol ada pada kolom ${tempatKata(tempatNol(d.n))}, tempat yang kosong.`;
    case "tukar": {
      const baru = tukarBil(d.n, d.a, d.b);
      return cara === "klik"
        ? `Setelah tempat ${tempatKata(d.a)} dan tempat ${tempatKata(d.b)} ditukar, bilangannya menjadi ${kataBil(baru)}.`
        : cara === "kanvas"
          ? `Angka yang tadinya di tempat ${tempatKata(d.b)} kini berada di tempat ${tempatKata(d.a)}, yaitu ${kataBil(n)}.`
          : `Bilangan baru ${kataBil(baru)} ${baru > d.n ? "lebih besar" : "lebih kecil"} dari bilangan semula, jadi ${baru > d.n ? "lebih" : "kurang"}.`;
    }
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  const aw = AWALAN[metode];
  const akhir = cara === "klik" ? "Pilih jawabannya." : cara === "kanvas" ? "Tulis satu angka di kanvas." : "Ucapkan jawabannya.";
  switch (l.tipe) {
    case "tempat":
      return cara === "klik"
        ? `${aw}: lihat bilangan pada ${g} ini. Angka yang dilingkari berarti berapa? ${akhir}`
        : cara === "kanvas"
          ? `${aw}: lihat bilangan pada ${g} ini. Angka berapa yang ada di tempat ${tempatKata(l.tanda)}? ${akhir}`
          : `${aw}: lihat bilangan pada ${g} ini. Angka yang dilingkari ada di tempat apa? Ucapkan nama tempatnya.`;
    case "balok":
      return cara === "klik"
        ? `${aw}: lihat susunan balok pada ${g} ini. Berapa seluruhnya? ${akhir}`
        : cara === "kanvas"
          ? `${aw}: lihat susunan balok pada ${g} ini. Berapa banyak balok pada baris yang dilingkari? ${akhir}`
          : `${aw}: lihat susunan balok pada ${g} ini. Baris yang dilingkari berarti berapa? Ucapkan bilangannya.`;
    case "bagan":
      return cara === "klik"
        ? `${aw}: lihat bagan tempat pada ${g} ini. Bilangan apa yang tertulis? ${akhir}`
        : cara === "kanvas"
          ? `${aw}: lihat bagan tempat pada ${g} ini. Berapa kolom yang berisi angka nol? ${akhir}`
          : `${aw}: lihat bagan tempat pada ${g} ini. Kolom mana yang berisi angka nol? Ucapkan nama tempatnya.`;
    case "tukar":
      return cara === "klik"
        ? `${aw}: lihat bilangan pada ${g} ini. Angka pada tempat ${tempatKata(l.a)} dan tempat ${tempatKata(l.b)} ditukar. Bilangan barunya berapa? ${akhir}`
        : cara === "kanvas"
          ? `${aw}: lihat bilangan pada ${g} ini. Angka pada tempat ${tempatKata(l.a)} dan tempat ${tempatKata(l.b)} ditukar. Angka berapa yang kini ada di tempat ${tempatKata(l.a)}? ${akhir}`
          : `${aw}: lihat bilangan pada ${g} ini. Angka pada tempat ${tempatKata(l.a)} dan tempat ${tempatKata(l.b)} ditukar. Bilangan barunya lebih atau kurang dari semula? Ucapkan satu kata.`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "tempat":
      return cara === "klik" ? "Angka yang dilingkari berarti berapa?" : cara === "kanvas" ? `Angka berapa di tempat ${tempatKata(d.tanda)}?` : "Angka yang dilingkari ada di tempat apa?";
    case "balok":
      return cara === "klik" ? "Berapa seluruhnya?" : cara === "kanvas" ? "Berapa banyak balok pada baris yang dilingkari?" : "Baris yang dilingkari berarti berapa?";
    case "bagan":
      return cara === "klik" ? "Bilangan apa yang tertulis?" : cara === "kanvas" ? "Berapa kolom yang berisi angka nol?" : "Kolom mana yang berisi angka nol?";
    case "tukar":
      return cara === "klik" ? "Bilangan barunya berapa?" : cara === "kanvas" ? `Angka berapa yang kini ada di tempat ${tempatKata(d.a)}?` : "Lebih atau kurang dari semula?";
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya (tanpa digit). `jawab`: kata atau bilangan yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "tempat":
      return cara === "klik"
        ? "Hitung tempat dari kanan: satuan, puluhan, ratusan, lalu ribuan. Banyaknya angka adalah angka dikali tempatnya, bukan angka itu saja."
        : cara === "kanvas"
          ? "Hitung tempat dari kanan: satuan, puluhan, ratusan, lalu ribuan. Lihat angka pada tempat yang disebut."
          : "Hitung dari kanan: satuan, puluhan, ratusan, lalu ribuan. Cari tempat angka yang dilingkari.";
    case "balok":
      return cara === "klik"
        ? "Tiap baris punya tempatnya sendiri: baris paling atas ribuan, lalu ratusan, puluhan, dan satuan. Tulis banyak balok tiap baris dari atas ke bawah, baris kosong ditulis nol."
        : cara === "kanvas"
          ? "Hitung balok pada baris yang dilingkari saja, satu per satu."
          : "Hitung balok pada baris yang dilingkari, lalu kalikan dengan tempat barisnya: ribuan, ratusan, puluhan, atau satuan.";
    case "bagan":
      return cara === "klik"
        ? "Baca angka pada bagan dari ribuan ke satuan. Kolom kosong tetap ditulis nol, supaya angka lain tetap di tempatnya."
        : cara === "kanvas"
          ? "Hitung ada berapa kolom yang berisi angka nol, bukan angka lainnya."
          : "Cari kolom yang berisi angka nol, lalu sebut nama tempatnya: ribuan, ratusan, puluhan, atau satuan.";
    case "tukar":
      return cara === "klik"
        ? "Tukar hanya dua angka pada tempat yang disebut. Angka pada tempat lain tidak berubah."
        : cara === "kanvas"
          ? "Setelah ditukar, angka pada tempat pertama diganti angka dari tempat kedua."
          : "Bandingkan bilangan baru dengan bilangan semula, mulai dari tempat paling kiri. Yang angkanya lebih besar di tempat paling kiri adalah bilangan yang lebih besar.";
  }
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
const urutanDariKiri = (t: number): string => ["pertama", "kedua", "ketiga", "keempat"][t];
/** Isi kartu kata untuk tahap Abstract (kata dan angka, tanpa emoji). */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  const dg = digitDari(l.n);
  switch (l.tipe) {
    case "tempat":
      return [`bilangan: ${formatBil(l.n)}`, `angka yang dilingkari: angka ${urutanDariKiri(l.tanda)} dari kiri`, cara === "klik" ? "berarti: ?" : cara === "kanvas" ? `angka di tempat ${tempatKata(l.tanda)}: ?` : "tempat angka itu: ?"];
    case "balok":
      return [`ribuan: ${dg[0]} balok`, `ratusan: ${dg[1]} balok`, `puluhan: ${dg[2]} balok`, `satuan: ${dg[3]} balok`, cara === "klik" ? "seluruhnya: ?" : cara === "kanvas" ? `banyak balok pada baris ${tempatKata(l.tanda)}: ?` : `baris ${tempatKata(l.tanda)} berarti: ?`];
    case "bagan":
      return [`ribuan: ${dg[0]}`, `ratusan: ${dg[1]}`, `puluhan: ${dg[2]}`, `satuan: ${dg[3]}`, cara === "klik" ? "bilangannya: ?" : cara === "kanvas" ? "banyak kolom berangka nol: ?" : "kolom berangka nol: ?"];
    case "tukar":
      return [`bilangan semula: ${formatBil(l.n)}`, `tukar tempat ${tempatKata(l.a)} dan tempat ${tempatKata(l.b)}`, cara === "klik" ? "bilangan baru: ?" : cara === "kanvas" ? `angka di tempat ${tempatKata(l.a)} sekarang: ?` : "bilangan baru: lebih atau kurang?"];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
