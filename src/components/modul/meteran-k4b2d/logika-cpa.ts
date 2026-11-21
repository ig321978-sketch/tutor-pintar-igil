/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 2 Sub-Bab D "Meteran Kain Pak Bagas" (pecahan per sepuluh dan per seratus menjadi desimal satu dan dua angka di belakang koma):
 * jenis tugas, jawaban benar, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-meteran-k4b2d.mjs.
 * Jawaban beragam: memilih desimal (klik), menulis satu angka di kanvas, dan mengucapkan satu kata (persepuluhan, perseratusan, sama, berbeda).
 * Jawaban benar dihitung dari data. Empat metode tiap misi: IGIL "Kisi Persepuluhan, Kisi Perseratusan, Jembatan Desimal", Tenths Grid (Kisi Persepuluhan),
 * Hundredths Grid (Kisi Perseratusan), Fraction Decimal Bridge (Jembatan Desimal). Desimal tampil berkoma ("0,3") dan diucapkan mengeja ("nol koma tiga").
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
export const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

/* ------------------------------ Kata bilangan dan penulisan ------------------------------ */
const SAT = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"] as const;
/** Nama bilangan 0 sampai 999 dalam kata (tanpa digit). */
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
/** Desimal berkoma dalam kata: "0,27" menjadi "nol koma dua tujuh" (tiap angka di belakang koma dieja satu per satu). */
export function kataDes(d: string): string {
  const [b, k = ""] = d.split(",");
  return `${kataBil(Number(b))} koma ${k
    .split("")
    .map((c) => SAT[Number(c)])
    .join(" ")}`;
}
/** Ubah teks berangka menjadi ucapan tanpa digit: "0,27" menjadi "nol koma dua tujuh", "3/10" menjadi "tiga per sepuluh". */
export function ucapkan(t: string): string {
  return t
    .replace(/ [−-] /g, " dikurangi ")
    .replace(/ \+ /g, " ditambah ")
    .replace(/ = /g, " sama dengan ")
    .replace(/(\d+),(\d+)|(\d+)\/(\d+)|\d+/g, (m, a, b, c, d) => (a !== undefined ? ` ${kataDes(`${a},${b}`)} ` : c !== undefined ? ` ${kataBil(Number(c))} per ${kataBil(Number(d))} ` : ` ${kataBil(Number(m))} `))
    .replace(/\s+/g, " ")
    .replace(/\s+([.,!?])/g, "$1")
    .trim();
}
export const ORDINAL = ["pertama", "kedua", "ketiga", "keempat", "kelima", "keenam"] as const;

/* ------------------------------ Pecahan dan desimal ------------------------------ */
export type Penyebut = 10 | 100;
/** Desimal berkoma dari pembilang `m` dan penyebut `den`: 3/10 menjadi "0,3", 27/100 menjadi "0,27", 3/100 menjadi "0,03". Pembilang tidak berakhir nol. */
export const desimalDari = (m: number, den: Penyebut): string => (den === 10 ? `0,${m}` : m < 10 ? `0,0${m}` : `0,${m}`);
export const banyakAngka = (den: Penyebut): number => (den === 10 ? 1 : 2);
/** Angka-angka di belakang koma sebagai teks: "0,27" menjadi "27", "0,05" menjadi "05". */
export const angkaKoma = (d: string): string => d.split(",")[1] ?? "";
/** Pecahan dari desimal "0,ab" atau "0,a" (hanya bagian nol di depan koma). */
export function pecahanDari(d: string): { m: number; den: Penyebut } | null {
  const [b, k = ""] = d.split(",");
  if (b !== "0" || (k.length !== 1 && k.length !== 2) || !/^\d+$/.test(k)) return null;
  return { m: Number(k), den: k.length === 1 ? 10 : 100 };
}
export const teksPecah = (m: number, den: Penyebut): string => `${m}/${den}`;
export const namaTempat = (den: Penyebut): "persepuluhan" | "perseratusan" => (den === 10 ? "persepuluhan" : "perseratusan");

/* ------------------------------ Jenis tugas ------------------------------ */
/** Tenths Grid: kain satu meter dibagi sepuluh bagian sama, `p` bagian berwarna (1 sampai 9). Klik: desimal; kanvas: angka di belakang koma; suara: sama atau berbeda dengan desimal `klaim`, atau nama tempat. */
export type LSepuluh = { tipe: "sepuluh"; benda: string; p: number; klaim?: string };
/** Hundredths Grid: kain dibagi seratus bagian sama, `q` bagian berwarna (11 sampai 99, tidak berakhir nol, dua angka berbeda). Kanvas: angka pertama di belakang koma. */
export type LSeratus = { tipe: "seratus"; benda: string; q: number; klaim?: string };
/** Fraction Decimal Bridge: pecahan `m`/`den` dihubungkan ke desimal. Kanvas: angka terakhir di belakang koma. */
export type LJembatan = { tipe: "jembatan"; benda: string; m: number; den: Penyebut; klaim?: string };
export type LangkahDasar = LSepuluh | LSeratus | LJembatan;
/** Cari kesalahan: tokoh sudah menjawab dari `dasar`. Anak memutuskan benar atau salah, memilih alasan, lalu menjawab sendiri. */
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
export type Metode = "igil" | "sepuluh" | "seratus" | "jembatan";
export const URUT_METODE: Metode[] = ["igil", "sepuluh", "seratus", "jembatan"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Kisi Persepuluhan, Kisi Perseratusan, Jembatan Desimal",
  sepuluh: "Tenths Grid: Kisi Persepuluhan",
  seratus: "Hundredths Grid: Kisi Perseratusan",
  jembatan: "Fraction Decimal Bridge: Jembatan Desimal",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F4CF}", sepuluh: "\u{1F9F5}", seratus: "\u{1F9F6}", jembatan: "\u{1F380}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", sepuluh: "Tenths Grid", seratus: "Hundredths Grid", jembatan: "Fraction Decimal Bridge" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/** Desimal yang benar untuk satu tugas dasar. */
export const desimalTugas = (d: LangkahDasar): string => (d.tipe === "sepuluh" ? desimalDari(d.p, 10) : d.tipe === "seratus" ? desimalDari(d.q, 100) : desimalDari(d.m, d.den));
/** Penyebut satu tugas dasar. */
export const penyebutTugas = (d: LangkahDasar): Penyebut => (d.tipe === "sepuluh" ? 10 : d.tipe === "seratus" ? 100 : d.den);
/** Pembilang satu tugas dasar. */
export const pembilangTugas = (d: LangkahDasar): number => (d.tipe === "sepuluh" ? d.p : d.tipe === "seratus" ? d.q : d.m);

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });

/** Angka kanvas: banyak bagian berwarna (sepuluh), angka pertama di belakang koma (seratus), angka terakhir di belakang koma (jembatan). */
export function angkaKanvas(d: LangkahDasar): number {
  if (d.tipe === "sepuluh") return d.p;
  if (d.tipe === "seratus") return Math.floor(d.q / 10);
  return d.m % 10;
}

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari data. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  if (cara === "klik") return nama(desimalTugas(l));
  if (cara === "kanvas") return angka(angkaKanvas(l));
  if (l.klaim !== undefined) return nama(l.klaim === desimalTugas(l) ? "sama" : "berbeda");
  return nama(namaTempat(penyebutTugas(l)));
}

/** Apakah tugas langsung siap dijawab? Semua tugas punya jawaban, kecuali Cari kesalahan yang memakai kegiatan lebih dulu. */
export function siapLangsung(l: Langkah, rupa: Rupa, cara: Cara): boolean {
  void rupa;
  if (l.tipe === "salah") return false;
  return kunciJawab(l, cara) !== null;
}

/* ------------------------------ Pilihan ------------------------------ */
/** Pengecoh bilangan satu angka (jawaban kanvas atau suara), antara satu dan sembilan. */
export function pengecohAngka(n: number): number[] {
  const hasil: number[] = [];
  for (const c of [n + 1, n - 1, n + 2, n - 2, n + 3, n - 3]) if (c >= 1 && c <= 9 && c !== n && !hasil.includes(c)) hasil.push(c);
  return hasil;
}
/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisipkan<T>(benar: T, lain: T[], geser: number): T[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}
const unik = (a: string[]): string[] => a.filter((x, i) => a.indexOf(x) === i);

/** Desimal keliru yang lazim: nol tambahan, angka bertukar, atau koma di tempat yang salah. */
export function desimalKeliru(d: LangkahDasar): string[] {
  const benar = desimalTugas(d);
  const m = pembilangTugas(d);
  const den = penyebutTugas(d);
  let calon: string[];
  if (den === 10) calon = [`0,0${m}`, `${m},0`, `1,${m}`];
  else if (m < 10) calon = [`0,${m}`, `0,${m}0`, `${m},0`];
  else {
    const a = Math.floor(m / 10);
    const b = m % 10;
    calon = [`0,${b}${a}`, `0,0${m}`, `${a},${b}`];
  }
  return unik(calon).filter((x) => x !== benar);
}
const benihDasar = (d: LangkahDasar): number => pembilangTugas(d) * 3 + (penyebutTugas(d) === 10 ? 1 : 2);

/** Tiga pilihan desimal untuk tugas klik: jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh yang keliru (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k || k.jenis !== "nama") return [];
  const d = dasarDari(l);
  const awal = l.tipe === "salah" && !l.betul ? [l.jawabTokoh] : [];
  const kandidat = desimalKeliru(d).filter((x) => x !== k.nama);
  const geser = benihDasar(d) % Math.max(1, kandidat.length);
  const putar = [...kandidat.slice(geser), ...kandidat.slice(0, geser)];
  const lain = unik([...awal, ...putar]).slice(0, 2);
  return sisipkan(k.nama, lain, benihDasar(d));
}
/** Pilihan cadangan untuk tugas suara (kata): jawaban benar selalu di tempat kedua. */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k) return [];
  if (k.jenis === "angka") return sisipkan(kataBil(k.n), pengecohAngka(k.n).slice(0, 2).map(kataBil), k.n);
  if (k.nama === "sama" || k.nama === "berbeda") return [k.nama === "sama" ? "berbeda" : "sama", k.nama];
  return [k.nama === "persepuluhan" ? "perseratusan" : "persepuluhan", k.nama];
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));
/** Teks pilihan klik yang benar (desimal). */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  if (!k) return null;
  return k.jenis === "nama" ? k.nama : String(k.n);
}

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : "gambar");
const bagianKu = (rupa: Rupa): string => (rupa === "lambang" ? "bagian yang dipotong" : "bagian yang berwarna");
const kolomAngka = (den: Penyebut): string => (den === 10 ? "satu angka" : "dua angka");

/** Kalimat setelah jawaban benar (tanpa menyebut gambar, petak, atau kisi supaya cocok untuk semua rupa). */
export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  const des = desimalTugas(d);
  const m = pembilangTugas(d);
  const den = penyebutTugas(d);
  const pec = `${kataBil(m)} per ${kataBil(den)}`;
  if (cara === "klik") return kapital(`${pec} ditulis ${kataDes(des)}, dengan ${kolomAngka(den)} di belakang koma.`);
  if (cara === "kanvas") {
    if (d.tipe === "sepuluh") return kapital(`ada ${kataBil(d.p)} bagian dari sepuluh, jadi angka di belakang koma adalah ${kataBil(d.p)}.`);
    if (d.tipe === "seratus") return kapital(`${pec} sama dengan ${kataBil(Math.floor(d.q / 10))} per sepuluh ditambah ${kataBil(d.q % 10)} per seratus, jadi angka pertama di belakang koma adalah ${kataBil(Math.floor(d.q / 10))}.`);
    return kapital(`${pec} ditulis ${kataDes(des)}, jadi angka terakhir di belakang koma adalah ${kataBil(d.m % 10)}.`);
  }
  if (d.klaim !== undefined) {
    return d.klaim === des
      ? kapital(`${kataDes(d.klaim)} memang sama dengan ${pec}.`)
      : kapital(`${pec} ditulis ${kataDes(des)}, berbeda dari ${kataDes(d.klaim)}, jadi tulisan itu keliru.`);
  }
  return kapital(`${kolomAngka(den)} di belakang koma menunjukkan ${namaTempat(den)}, sesuai penyebut ${kataBil(den)}.`);
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  const aw = AWALAN[metode];
  const bk = bagianKu(rupa);
  switch (l.tipe) {
    case "sepuluh": {
      const dasar = `${aw}: lihat ${g} ini. Kain satu meter dibagi sepuluh bagian sama. `;
      if (cara === "klik") return `${dasar}Tulis ${bk} sebagai desimal. Pilih jawabannya.`;
      if (cara === "kanvas") return `${dasar}Angka di belakang koma berapa? Tulis satu angka di kanvas.`;
      return l.klaim !== undefined
        ? `${dasar}Apakah desimal yang tertulis sama dengan ${bk}? Ucapkan satu kata: sama atau berbeda.`
        : `${dasar}Satu angka di belakang koma menunjukkan tempat apa? Ucapkan satu kata: persepuluhan atau perseratusan.`;
    }
    case "seratus": {
      const dasar = `${aw}: lihat ${g} ini. Kain satu meter dibagi seratus bagian sama. `;
      if (cara === "klik") return `${dasar}Tulis ${bk} sebagai desimal. Pilih jawabannya.`;
      if (cara === "kanvas") return `${dasar}Angka pertama di belakang koma berapa? Tulis satu angka di kanvas.`;
      return l.klaim !== undefined
        ? `${dasar}Apakah desimal yang tertulis sama dengan ${bk}? Ucapkan satu kata: sama atau berbeda.`
        : `${dasar}Dua angka di belakang koma menunjukkan tempat apa? Ucapkan satu kata: persepuluhan atau perseratusan.`;
    }
    case "jembatan": {
      const dasar = `${aw}: lihat ${g} ini. Pecahan di kiri dihubungkan jembatan ke desimal di kanan. `;
      if (cara === "klik") return `${dasar}Tulis pecahan itu sebagai desimal. Pilih jawabannya.`;
      if (cara === "kanvas") return `${dasar}Angka terakhir di belakang koma berapa? Tulis satu angka di kanvas.`;
      return l.klaim !== undefined
        ? `${dasar}Apakah desimal di kanan sama dengan pecahan di kiri? Ucapkan satu kata: sama atau berbeda.`
        : `${dasar}Penyebut pecahan itu menunjukkan tempat apa di belakang koma? Ucapkan satu kata: persepuluhan atau perseratusan.`;
    }
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  if (cara === "klik") return d.tipe === "jembatan" ? "Desimal mana yang sama dengan pecahan itu?" : "Desimal mana yang benar?";
  if (cara === "kanvas") return d.tipe === "sepuluh" ? "Angka di belakang koma berapa?" : d.tipe === "seratus" ? "Angka pertama di belakang koma berapa?" : "Angka terakhir di belakang koma berapa?";
  return d.klaim !== undefined ? "Sama atau berbeda?" : "Tempat apa di belakang koma?";
}

/** Petunjuk saat jawaban salah: menunjuk cara berpikirnya tanpa menyebut jawabannya. `jawab`: desimal, kata, atau bilangan yang dipilih atau diucapkan, atau angka yang ditulis. Tahap Abstract tidak menyebut gambar atau baris. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number, rupa: Rupa = "benda"): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab, rupa);
  }
  const bk = bagianKu(rupa);
  const abstrak = rupa === "lambang";
  if (cara === "suara") {
    return l.klaim !== undefined
      ? "Ubah pecahan atau bagian itu menjadi desimal sendiri, lalu bandingkan dengan yang tertulis. Bila persis sama ucapkan sama, bila tidak ucapkan berbeda."
      : "Hitung banyak angka di belakang koma. Satu angka berarti per sepuluh, dua angka berarti per seratus.";
  }
  switch (l.tipe) {
    case "sepuluh":
      return cara === "klik"
        ? `Hitung ${bk} dari sepuluh bagian sama. Penyebut sepuluh hanya memberi satu angka di belakang koma.`
        : `Hitung ${bk} dari sepuluh bagian sama. Banyaknya menjadi angka di belakang koma.`;
    case "seratus":
      if (cara === "klik") {
        return abstrak
          ? "Penyebut seratus memberi dua angka di belakang koma. Pikirkan dulu bagian yang dipotong dari seratus bagian sama."
          : "Penyebut seratus memberi dua angka di belakang koma. Hitung dulu banyak baris penuh, lalu banyak kotak yang lepas.";
      }
      return abstrak
        ? "Sepuluh bagian sama adalah satu per sepuluh. Hitung berapa kali sepuluh bagian yang dipotong, itulah angka pertama di belakang koma."
        : "Setiap baris penuh adalah satu per sepuluh. Hitung banyak baris penuh, itulah angka pertama di belakang koma.";
    case "jembatan":
      return cara === "klik"
        ? "Lihat penyebutnya dulu: sepuluh memberi satu angka di belakang koma, seratus memberi dua angka. Tempat yang kosong diisi nol."
        : "Tulis dulu desimal dari pecahan itu, lalu lihat angka paling kanan di belakang koma.";
  }
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
/** Isi kartu kata untuk tahap Abstract (kata dan angka, tanpa emoji dan tanpa menyebut gambar atau kisi). */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  const klaim = l.klaim;
  const akhir = (tanya: string): string[] => (cara === "suara" ? (klaim !== undefined ? [`ditulis: ${klaim}`, "sama atau berbeda?"] : ["tempat di belakang koma: apa?"]) : [tanya]);
  switch (l.tipe) {
    case "sepuluh":
      return ["kain 1 meter dibagi 10 bagian sama", `bagian yang dipotong: ${l.p}`, ...akhir(cara === "kanvas" ? "angka di belakang koma: ?" : "ditulis dengan koma: ?")];
    case "seratus":
      return ["kain 1 meter dibagi 100 bagian sama", `bagian yang dipotong: ${l.q}`, ...akhir(cara === "kanvas" ? "angka pertama di belakang koma: ?" : "ditulis dengan koma: ?")];
    case "jembatan":
      return ["jembatan: pecahan ke desimal", ...akhir(cara === "kanvas" ? "angka terakhir di belakang koma: ?" : "desimalnya: ?")];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
