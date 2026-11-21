/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 2 Sub-Bab E "Papan Pameran Bu Tuti" (desimal perseratusan dan persen), akhir cerita Sanggar Batik Kampung Mekar:
 * jenis tugas, jawaban benar, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-pameran-k4b2e.mjs.
 * Jawaban beragam: memilih persen atau desimal (klik), menulis satu angka di kanvas, dan mengucapkan satu kata (persen, koma, seratus, kanan, kiri) atau bilangan pendek.
 * Jawaban benar dihitung dari data. Empat metode tiap misi: IGIL "Persen Perseratusan, Kisi Seratus, Jembatan Persen" (tugas ubah desimal ke persen),
 * Percent as Hundredths (Persen Perseratusan), Hundred Grid (Kisi Seratus), dan Decimal Percent Bridge (Jembatan Persen).
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

/* ------------------------------ Kata bilangan, desimal, dan persen ------------------------------ */
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
/** Angka satu per satu: "35" menjadi "tiga lima", "05" menjadi "nol lima" (bagian di belakang koma). */
const kataAngkaSatuan = (s: string): string => Array.from(s, (c) => SAT[Number(c)]).join(" ");
/**
 * Ubah teks berangka menjadi ucapan tanpa digit: "0,35" menjadi "nol koma tiga lima", "35%" menjadi "tiga puluh lima persen",
 * "35/100" menjadi "tiga puluh lima per seratus", "2 dan 9" menjadi "dua dan sembilan". Tanpa spasi sebelum tanda baca.
 */
export function ucapkan(t: string): string {
  return t
    .replace(/(\d+)\/(\d+)/g, (_m, a: string, b: string) => ` ${kataBil(Number(a))} per ${kataBil(Number(b))} `)
    .replace(/(\d+),(\d+)/g, (_m, a: string, b: string) => ` ${kataBil(Number(a))} koma ${kataAngkaSatuan(b)} `)
    .replace(/\d+/g, (d) => ` ${kataBil(Number(d))} `)
    .replace(/%/g, " persen ")
    .replace(/\s+([.,!?;:])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}
const URUTAN = ["", "pertama", "kedua", "ketiga", "keempat", "kelima", "keenam", "ketujuh", "kedelapan", "kesembilan"];
void URUTAN;

/** Dua angka untuk bilangan 0 sampai 99: 5 menjadi "05". */
export const duaAngka = (p: number): string => String(p).padStart(2, "0");
/** Desimal perseratus dari `p` persen (1 sampai 99): 5 menjadi "0,05", 35 menjadi "0,35", 70 menjadi "0,70"; `pendek` membuang nol di ujung: "0,7". */
export function desimalDari(p: number, pendek = false): string {
  return pendek && p % 10 === 0 ? `0,${p / 10}` : `0,${duaAngka(p)}`;
}
export const persenDari = (p: number): string => `${p}%`;
export const pecahanDari = (p: number): string => `${p}/100`;
/** Banyak baris penuh (sepuluh kotak) pada kisi seratus yang berwarna bila `p` kotak diwarnai baris demi baris. */
export const barisPenuh = (p: number): number => Math.floor(p / 10);
/** Kisi seratus (10 x 10, urut baris demi baris dari kiri-atas): kotak ke-i berwarna bila i lebih kecil dari `p`. Banyak kotak berwarna selalu sama dengan `p`. */
export const kisiSel = (p: number): boolean[] => Array.from({ length: 100 }, (_, i) => i < Math.max(0, Math.min(100, p)));
/** Angka yang bukan nol di belakang koma pada desimal `p` persen (hanya untuk p satu angka atau kelipatan sepuluh). */
export const angkaBukanNol = (p: number): number => (p < 10 ? p : p / 10);

/* ------------------------------ Jenis tugas ------------------------------ */
type Pil = [string, string, string];
/** Ubah desimal ke persen (IGIL): klik pilih persen, kanvas satu angka (p satu angka), suara bilangan persen. */
export type LUbah = { tipe: "ubah"; benda: string; p: number; pil?: Pil };
/** Persen Perseratusan (Percent as Hundredths): pecahan `p` per seratus; klik pilih desimal, kanvas satu angka persen (p satu angka), suara bilangan persen. */
export type LPerseratus = { tipe: "perseratus"; benda: string; p: number; pil?: Pil };
/** Kisi Seratus (Hundred Grid): `p` kotak berwarna dari seratus; klik pilih persen, kanvas banyak baris penuh (p kelipatan sepuluh), suara bilangan persen. */
export type LKisi = { tipe: "kisi"; benda: string; p: number; pil?: Pil };
/** Jembatan Persen (Decimal Percent Bridge): `arah` kanan = desimal ke persen, kiri = persen ke desimal; klik pilih hasil, kanvas angka bukan nol (hanya kiri), suara arah geser koma. */
export type LJembatan = { tipe: "jembatan"; benda: string; p: number; arah: "kanan" | "kiri"; pil?: Pil };
/** Sebut kata (IGIL, suara): satu kata dari arti persen. `pil` tiga kata cadangan untuk pilihan ketuk. */
export type LSebut = { tipe: "sebut"; benda: string; p: number; kata: "persen" | "koma" | "seratus" };
export type LangkahDasar = LUbah | LPerseratus | LKisi | LJembatan | LSebut;
/** Cari kesalahan: tokoh sudah menjawab dari `dasar`. Anak memutuskan benar atau salah, memilih alasan, lalu menjawab sendiri. `jawabTokoh` adalah salah satu pilihan klik. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LUbah | LPerseratus | LKisi | LJembatan;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh: string;
  alasan: [string, string, string];
  benar: number;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "perseratus" | "kisi" | "jembatan";
export const URUT_METODE: Metode[] = ["igil", "perseratus", "kisi", "jembatan"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Persen Perseratusan, Kisi Seratus, Jembatan Persen",
  perseratus: "Percent as Hundredths: Persen Perseratusan",
  kisi: "Hundred Grid: Kisi Seratus",
  jembatan: "Decimal Percent Bridge: Jembatan Persen",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F9EE}", perseratus: "\u{1F4AF}", kisi: "\u{1F532}", jembatan: "\u{1F309}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", perseratus: "Percent as Hundredths", kisi: "Hundred Grid", jembatan: "Decimal Percent Bridge" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari data. Mengembalikan null untuk kombinasi yang tidak dipakai. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "ubah":
      return cara === "klik" ? nama(persenDari(l.p)) : angka(l.p);
    case "perseratus":
      return cara === "klik" ? nama(desimalDari(l.p)) : angka(l.p);
    case "kisi":
      return cara === "klik" ? nama(persenDari(l.p)) : cara === "kanvas" ? angka(barisPenuh(l.p)) : angka(l.p);
    case "jembatan":
      if (cara === "klik") return nama(l.arah === "kanan" ? persenDari(l.p) : desimalDari(l.p));
      if (cara === "kanvas") return l.arah === "kiri" ? angka(angkaBukanNol(l.p)) : null;
      return nama(l.arah);
    case "sebut":
      return nama(l.kata);
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

/** Pengecoh bilangan persen untuk jawaban suara: angka terbalik, hanya puluhan, lalu bilangan di dekatnya. */
export function pengecoh(l: Langkah, cara: Cara): number[] {
  const d = dasarDari(l);
  const k = kunciJawab(d, cara);
  const n = k?.jenis === "angka" ? k.n : 0;
  const p = d.p;
  const terbalik = p >= 10 ? (p % 10) * 10 + Math.floor(p / 10) : p * 10;
  const calon = [terbalik, Math.floor(p / 10) || p + 1, n + 10, n - 10, n + 1, n - 1, n + 2];
  const hasil: number[] = [];
  for (const c of calon) if (Number.isInteger(c) && c >= 1 && c <= 99 && c !== n && !hasil.includes(c)) hasil.push(c);
  return hasil;
}

/** Tiga pilihan untuk tugas klik: jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const d = dasarDari(l);
  if (d.tipe === "sebut") return [];
  return d.pil ? [...d.pil] : [];
}
const KATA_LAIN: Record<string, string[]> = {
  persen: ["koma", "seratus", "sepuluh"],
  koma: ["persen", "titik", "seratus"],
  seratus: ["sepuluh", "persen", "seribu"],
  kanan: ["kiri", "atas", "tengah"],
  kiri: ["kanan", "bawah", "tengah"],
};
/** Pilihan cadangan untuk tugas suara (kata atau bilangan dalam kata). */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k) return [];
  if (k.jenis === "angka") {
    const lain = pengecoh(l, cara).slice(0, 2);
    return sisipkan(kataBil(k.n), lain.map(kataBil), k.n);
  }
  return sisipkan(k.nama, (KATA_LAIN[k.nama] ?? ["persen", "koma"]).slice(0, 2), k.nama.length);
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));
/** Teks pilihan klik yang benar (persen atau desimal). */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  if (!k) return null;
  return k.jenis === "nama" ? k.nama : String(k.n);
}

/* ------------------------------ Kalimat ------------------------------ */
const sebutBidang = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : rupa === "benda" ? "papan pameran" : "kertas kisi");

/** Awal tiap kalimat berhuruf kapital (kata bilangan dieja huruf kecil di tengah teks). */
const kapKal = (t: string): string => t.replace(/(^|[.?!]\s+)([a-z])/g, (_m, a: string, b: string) => a + b.toUpperCase());

export function kalimatKunci(l: Langkah, cara: Cara): string {
  return kapKal(ucapkan(kalimatKunciMentah(l, cara)));
}

function kalimatKunciMentah(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "ubah":
      return `${desimalDari(d.p)} sama dengan ${pecahanDari(d.p)}, jadi ${persenDari(d.p)}.`;
    case "perseratus":
      return cara === "klik"
        ? `${pecahanDari(d.p)} ditulis dengan dua angka di belakang koma, jadi ${desimalDari(d.p)}.`
        : `Pembilang ${d.p} pada ${pecahanDari(d.p)} menjadi angka persen, jadi ${persenDari(d.p)}.`;
    case "kisi":
      return cara === "kanvas"
        ? `${barisPenuh(d.p)} baris penuh berarti ${d.p} kotak berwarna, jadi ${persenDari(d.p)}.`
        : `Ada ${d.p} kotak berwarna dari seratus kotak, jadi ${persenDari(d.p)}.`;
    case "jembatan":
      if (cara === "suara") return d.arah === "kanan" ? "Dari desimal ke persen, koma digeser ke kanan." : "Dari persen ke desimal, koma digeser ke kiri.";
      if (cara === "kanvas") return `${persenDari(d.p)} menjadi ${desimalDari(d.p)}, dan angka yang bukan nol di belakang koma adalah ${angkaBukanNol(d.p)}.`;
      return d.arah === "kanan"
        ? `Koma digeser dua tempat ke kanan lalu tanda persen ditulis, jadi ${desimalDari(d.p)} menjadi ${persenDari(d.p)}.`
        : `Tanda persen dihilangkan dan koma digeser dua tempat ke kiri, jadi ${persenDari(d.p)} menjadi ${desimalDari(d.p)}.`;
    case "sebut":
      return d.kata === "persen" ? "Satu bagian dari seratus bagian disebut satu persen." : d.kata === "koma" ? "Tanda pemisah itu disebut koma." : "Persen berarti per seratus.";
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  return kapKal(ucapkan(instruksiMentah(l, rupa, cara, metode)));
}

function instruksiMentah(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebutBidang(rupa);
  const aw = AWALAN[metode];
  const akhir = cara === "klik" ? "Pilih jawabannya." : cara === "kanvas" ? "Tulis satu angka di kanvas." : "Ucapkan bilangannya.";
  switch (l.tipe) {
    case "ubah":
      return `${aw}: lihat desimal ${desimalDari(l.p)} pada ${g} ini. Sama dengan berapa persen? ${akhir}`;
    case "perseratus":
      return cara === "klik"
        ? `${aw}: lihat pecahan ${pecahanDari(l.p)} pada ${g} ini. Sama dengan desimal yang mana? ${akhir}`
        : `${aw}: lihat pecahan ${pecahanDari(l.p)} pada ${g} ini. Sama dengan berapa persen? ${akhir}`;
    case "kisi":
      return cara === "kanvas"
        ? `${aw}: lihat kisi seratus pada ${g} ini. Berapa baris penuh yang berwarna? ${akhir}`
        : `${aw}: lihat kisi seratus pada ${g} ini. Berapa persen kotak yang berwarna? ${akhir}`;
    case "jembatan":
      if (cara === "klik") return l.arah === "kanan" ? `${aw}: ubah desimal ${desimalDari(l.p)} menjadi persen pada ${g} ini dengan menggeser koma. Pilih hasilnya.` : `${aw}: ubah persen ${persenDari(l.p)} menjadi desimal pada ${g} ini dengan menggeser koma. Pilih hasilnya.`;
      if (cara === "kanvas") return `${aw}: ubah persen ${persenDari(l.p)} menjadi desimal pada ${g} ini. Tulis satu angka yang bukan nol di belakang koma.`;
      return l.arah === "kanan"
        ? `${aw}: desimal diubah menjadi persen pada ${g} ini. Koma digeser ke arah mana? Ucapkan satu kata: kanan atau kiri.`
        : `${aw}: persen diubah menjadi desimal pada ${g} ini. Koma digeser ke arah mana? Ucapkan satu kata: kanan atau kiri.`;
    case "sebut":
      return l.kata === "persen"
        ? `${aw}: lihat kisi seratus pada ${g} ini. Satu bagian dari seratus bagian disebut satu apa? Ucapkan satu kata.`
        : l.kata === "koma"
          ? `${aw}: lihat desimal ${desimalDari(l.p)} pada ${g} ini. Tanda pemisah antara angka nol dan angka perseratus disebut apa? Ucapkan satu kata.`
          : `${aw}: lihat kisi seratus pada ${g} ini. Persen berarti per berapa? Ucapkan satu kata.`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  return kapKal(ucapkan(kalimatTanyaMentah(d, cara)));
}
function kalimatTanyaMentah(d: LangkahDasar, cara: Cara): string {
  switch (d.tipe) {
    case "ubah":
      return `${desimalDari(d.p)} sama dengan berapa persen?`;
    case "perseratus":
      return cara === "klik" ? `${pecahanDari(d.p)} sama dengan desimal yang mana?` : `${pecahanDari(d.p)} sama dengan berapa persen?`;
    case "kisi":
      return cara === "kanvas" ? "Berapa baris penuh yang berwarna?" : "Berapa persen kotak yang berwarna?";
    case "jembatan":
      if (cara === "suara") return "Koma digeser ke kanan atau ke kiri?";
      if (cara === "kanvas") return `Angka bukan nol pada desimal dari ${persenDari(d.p)}?`;
      return d.arah === "kanan" ? `${desimalDari(d.p)} menjadi berapa persen?` : `${persenDari(d.p)} menjadi desimal berapa?`;
    case "sebut":
      return d.kata === "persen" ? "Satu bagian dari seratus bagian disebut satu apa?" : d.kata === "koma" ? "Tanda pemisah itu disebut apa?" : "Persen berarti per berapa?";
  }
}

/** Petunjuk saat jawaban salah: mengarahkan tanpa menyebut hasil benar (tanpa digit). `jawab`: kata, bilangan, persen, atau desimal yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. Pikirkan lagi apa yang ${l.tokoh} lakukan.`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "ubah":
      return "Persen berarti per seratus. Tulis desimal itu dengan dua angka di belakang koma, lalu lihat berapa perseratusnya.";
    case "perseratus":
      return cara === "klik" ? "Pecahan per seratus ditulis dengan dua angka di belakang koma. Periksa letak nol dan koma pada tiap pilihan." : "Pada pecahan per seratus, pembilang adalah banyak bagian dari seratus bagian. Lihat pembilangnya.";
    case "kisi":
      return cara === "kanvas" ? "Satu baris penuh ada sepuluh kotak. Hitung dulu berapa baris yang penuh berwarna." : "Hitung kotak yang berwarna dari seratus kotak. Banyaknya kotak berwarna adalah persennya.";
    case "jembatan":
      return cara === "klik"
        ? "Jembatan ini menggeser koma dua tempat. Periksa arah geseran dan letak koma pada tiap pilihan."
        : cara === "kanvas"
          ? "Hilangkan tanda persen, lalu geser koma dua tempat ke kiri. Cari angka yang bukan nol."
          : "Dari desimal ke persen koma ke satu arah, dari persen ke desimal koma ke arah sebaliknya. Lihat dulu apa yang diubah.";
    case "sebut":
      return l.kata === "persen"
        ? "Ingat tanda yang ditulis di belakang angka pada papan pameran. Ucapkan nama tanda itu."
        : l.kata === "koma"
          ? "Perhatikan tanda yang memisahkan angka bulat dan angka perseratus. Ucapkan namanya."
          : "Perhatikan banyak kotak pada kisi, lalu ucapkan bilangan penyebutnya.";
  }
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
/** Isi kartu kata untuk tahap Abstract (kata dan angka, tanpa emoji). Baris pertama dan terakhir juga menjadi keterangan gambar Concrete dan Pictorial. */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  const d = desimalDari(l.p);
  switch (l.tipe) {
    case "ubah":
      return [`desimal: ${d}`, cara === "klik" ? `pilihan: ${l.pil?.join(", ") ?? ""}` : cara === "kanvas" ? "dua angka di belakang koma" : "ucapkan bilangan persennya", "persen: ?"];
    case "perseratus":
      return [`pecahan: ${pecahanDari(l.p)}`, cara === "klik" ? `pilihan: ${l.pil?.join(", ") ?? ""}` : "penyebutnya seratus", cara === "klik" ? "desimal: ?" : "persen: ?"];
    case "kisi":
      return [`kisi seratus kotak: ${l.p} berwarna`, cara === "kanvas" ? "satu baris penuh: 10 kotak" : cara === "klik" ? `pilihan: ${l.pil?.join(", ") ?? ""}` : "ucapkan bilangan persennya", cara === "kanvas" ? "baris penuh berwarna: ?" : "persen: ?"];
    case "jembatan":
      if (cara === "suara") return [l.arah === "kanan" ? `desimal: ${d}` : `persen: ${persenDari(l.p)}`, l.arah === "kanan" ? "diubah menjadi persen" : "diubah menjadi desimal", "arah geser koma: ?"];
      if (cara === "kanvas") return [`persen: ${persenDari(l.p)}`, "diubah menjadi desimal", "angka bukan nol di belakang koma: ?"];
      return l.arah === "kanan" ? [`desimal: ${d}`, `pilihan: ${l.pil?.join(", ") ?? ""}`, "persen: ?"] : [`persen: ${persenDari(l.p)}`, `pilihan: ${l.pil?.join(", ") ?? ""}`, "desimal: ?"];
    case "sebut":
      return [`desimal: ${d}`, `kisi seratus kotak: ${l.p} berwarna`, "kata yang dicari: ?"];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
