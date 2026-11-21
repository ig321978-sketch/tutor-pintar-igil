/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 5 Bab 1 Sub-Bab B "Urutan Tribun Pak Hasto" (membandingkan dan mengurutkan bilangan sampai 100.000).
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-urutan-k5b1b.mjs.
 * Jawaban benar DIHITUNG dari bilangan di papan (papan-data.ts dan logika-data.ts): tanda, kolom penentu, ruas garis, patokan terdekat, urutan, dan sisi patokan.
 * Empat metode tiap misi: IGIL "Kiri Dulu, Letakkan di Garis, Pilih Patokan" (tanda dan banyak angka), Left First (Kiri Dulu), Line It Up (Letakkan di Garis),
 * dan Pick a Marker (Pilih Patokan). Jawaban: memilih (klik), menulis satu angka 1 sampai 9 di kanvas, dan mengucapkan satu kata.
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { kataK5B1 } from "../eja-k5b1";
import { PAPAN, type Papan } from "./papan-data";
import { awalGaris, banyakAngka, fmt, kolomDariKiri, namaPenentu, patokanKiri, patokanTerdekat, penentu, peringkat, rancangGaris, ruasDari, sisiPatokan, tandaDari, teksRuas, urutkan, LANGKAH_GARIS, type Garis, type Tanda } from "./logika-data";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";
export { fmt };

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

/** Nama bilangan dalam kata (tanpa digit). 0 sampai 9 untuk jawaban kanvas, sampai 99.999 untuk bilangan papan. */
export const kata = (n: number): string => kataK5B1(n);
const URUTAN = ["", "pertama", "kedua", "ketiga", "keempat", "kelima", "keenam", "ketujuh", "kedelapan", "kesembilan"];
export const urutan = (n: number): string => URUTAN[n] ?? `ke ${kata(n)}`;

/** Ubah teks berangka menjadi ucapan tanpa digit: "45.620" menjadi "empat puluh lima ribu enam ratus dua puluh". Tanda dalam kurung dibuang. Tanpa spasi sebelum tanda baca. */
export function ucapkan(t: string): string {
  return t
    .replace(/\s*\([<>=]\)/g, "")
    .replace(/\s*=\s*/g, " sama dengan ")
    .replace(/\d{1,3}(?:\.\d{3})+|\d+/g, (m) => kata(Number(m.replace(/\./g, ""))))
    .replace(/\s+([.,!?;:])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/* ------------------------------ Jenis tugas ------------------------------ */
type Pil = [string, string, string];
/** IGIL: tanda (klik), banyak angka (kanvas), sebut tanda (suara). */
export type LTanda = { tipe: "tanda"; p: string; a: number; b: number; pil?: Pil };
export type LBanyak = { tipe: "banyakAngka"; p: string; a: number };
export type LSebutTanda = { tipe: "sebutTanda"; p: string; a: number; b: number };
/** Left First: kolom penentu (klik), kolom ke berapa dari kiri (kanvas), bilangan mana yang lebih besar (suara). */
export type LPenentu = { tipe: "penentu"; p: string; a: number; b: number; pil?: Pil };
export type LKolomKe = { tipe: "kolomKe"; p: string; a: number; b: number };
export type LMana = { tipe: "mana"; p: string; a: number; b: number };
/** Line It Up: ruas garis (klik), patokan kiri dalam puluh ribu (kanvas), titik paling kanan (suara). */
export type LRuas = { tipe: "ruas"; p: string; a: number; pil?: Pil };
export type LPatKiri = { tipe: "patKiri"; p: string; a: number };
export type LKanan = { tipe: "kanan"; p: string; t: number[] };
/** Pick a Marker: patokan terdekat (klik), urutan ke berapa (kanvas), sisi patokan (suara). */
export type LDekat = { tipe: "dekat"; p: string; a: number; pil?: Pil };
export type LUrutKe = { tipe: "urutKe"; p: string; a: number };
export type LSisi = { tipe: "sisi"; p: string; a: number; pat: number };
export type LangkahDasar = LTanda | LBanyak | LSebutTanda | LPenentu | LKolomKe | LMana | LRuas | LPatKiri | LKanan | LDekat | LUrutKe | LSisi;
/** Tugas yang boleh dibungkus Cari kesalahan (jawaban tokoh adalah salah satu pilihan klik). */
export type DasarSalah = LTanda | LPenentu | LRuas | LDekat;
export type LangkahSalah = { tipe: "salah"; dasar: DasarSalah; tokoh: string; kataTokoh: string; jawabTokoh: string; alasan: [string, string, string]; benar: number; betul?: boolean; posisi?: number };
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "kiri" | "garis" | "patokan";
export const URUT_METODE: Metode[] = ["igil", "kiri", "garis", "patokan"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Kiri Dulu, Letakkan di Garis, Pilih Patokan",
  kiri: "Left First: Kiri Dulu",
  garis: "Line It Up: Letakkan di Garis",
  patokan: "Pick a Marker: Pilih Patokan",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F522}", kiri: "\u{1F448}", garis: "\u{1F4CF}", patokan: "\u{1F4CD}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", kiri: "Left First", garis: "Line It Up", patokan: "Pick a Marker" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };
export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);
export const papanDari = (l: Langkah): Papan => PAPAN[dasarDari(l).p];

/** Cara menjawab tiap jenis tugas. */
export const CARA_TIPE: Record<LangkahDasar["tipe"], Cara> = {
  tanda: "klik",
  banyakAngka: "kanvas",
  sebutTanda: "suara",
  penentu: "klik",
  kolomKe: "kanvas",
  mana: "suara",
  ruas: "klik",
  patKiri: "kanvas",
  kanan: "suara",
  dekat: "klik",
  urutKe: "kanvas",
  sisi: "suara",
};

const nm = (P: Papan, i: number): string => P.item[i].nama;
const nl = (P: Papan, i: number): number => P.item[i].n;
export const SEMUA_N = (P: Papan): number[] => P.item.map((x) => x.n);
export const TEKS_TANDA: Record<Tanda, string> = { "<": "lebih kecil (<)", ">": "lebih besar (>)", "=": "sama dengan (=)" };
const KATA_TANDA: Record<Tanda, string> = { "<": "kecil", ">": "besar", "=": "sama" };

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const sebutan = (s: string): Kunci => ({ jenis: "nama", nama: s });

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari bilangan di papan. null untuk kombinasi yang tidak dipakai. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  if (CARA_TIPE[l.tipe] !== cara) return null;
  const P = PAPAN[l.p];
  switch (l.tipe) {
    case "tanda":
      return sebutan(TEKS_TANDA[tandaDari(nl(P, l.a), nl(P, l.b))]);
    case "banyakAngka":
      return angka(banyakAngka(nl(P, l.a)));
    case "sebutTanda":
      return sebutan(KATA_TANDA[tandaDari(nl(P, l.a), nl(P, l.b))]);
    case "penentu":
      return sebutan(namaPenentu(nl(P, l.a), nl(P, l.b)));
    case "kolomKe": {
      const k = kolomDariKiri(nl(P, l.a), nl(P, l.b));
      return k === null ? null : angka(k);
    }
    case "mana": {
      const t = tandaDari(nl(P, l.a), nl(P, l.b));
      return t === "=" ? null : sebutan(t === ">" ? "pertama" : "kedua");
    }
    case "ruas":
      return sebutan(teksRuas(patokanKiri(nl(P, l.a))));
    case "patKiri":
      return angka(patokanKiri(nl(P, l.a)) / LANGKAH_GARIS);
    case "kanan": {
      const besar = urutkan(l.t.map((i) => nl(P, i)), "turun")[0];
      return sebutan(P.item[l.t.find((i) => nl(P, i) === besar) as number].nama.toLowerCase());
    }
    case "dekat":
      return sebutan(fmt(patokanTerdekat(nl(P, l.a))));
    case "urutKe":
      return angka(peringkat(SEMUA_N(P), nl(P, l.a)));
    case "sisi":
      return sebutan(sisiPatokan(nl(P, l.a), l.pat));
  }
}
/** Apakah tugas langsung siap dijawab? Semua tugas, kecuali Cari kesalahan. */
export function siapLangsung(l: Langkah, rupa: Rupa, cara: Cara): boolean {
  void rupa;
  if (l.tipe === "salah") return false;
  return kunciJawab(l, cara) !== null;
}

/* ------------------------------ Pilihan ------------------------------ */
function sisipkan<T>(benar: T, lain: T[], geser: number): T[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}
/** Pilihan klik: tiga pilihan dari data tugas (jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh pada Cari kesalahan selalu ikut). */
export function pilihanKlik(l: Langkah): string[] {
  const d = dasarDari(l);
  return "pil" in d && d.pil ? [...d.pil] : [];
}
const KATA_LAIN: Partial<Record<LangkahDasar["tipe"], string[]>> = {
  sebutTanda: ["besar", "kecil", "sama"],
  mana: ["pertama", "kedua", "sama"],
  sisi: ["kiri", "kanan", "tengah"],
};
/** Pilihan cadangan untuk tugas suara (kata). */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k || k.jenis !== "nama") return [];
  const d = dasarDari(l);
  const lain = d.tipe === "kanan" ? d.t.map((i) => PAPAN[d.p].item[i].nama.toLowerCase()).filter((n) => n !== k.nama) : (KATA_LAIN[d.tipe] ?? []).filter((n) => n !== k.nama);
  if (lain.length < 2) return [];
  return sisipkan(k.nama, lain.slice(0, 2), k.nama.length);
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kata(k.n));
/** Teks pilihan klik yang benar. */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  if (!k) return null;
  return k.jenis === "nama" ? k.nama : String(k.n);
}
/** Pilihan klik ditampilkan berhuruf awal kapital untuk kata. */
export const tampilPilihan = (t: string): string => (/^\d/.test(t) ? t : kapital(t));

/* ------------------------------ Kalimat ------------------------------ */
const sebutBidang = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : rupa === "benda" ? "papan tiket" : "diagram");
/** Awal tiap kalimat berhuruf kapital. */
const kapKal = (t: string): string => t.replace(/(^|[.?!]\s+)([a-z])/g, (_m, a: string, b: string) => a + b.toUpperCase());
const LEBIH: Record<Tanda, string> = { "<": "lebih kecil dari", ">": "lebih besar dari", "=": "sama dengan" };

function alasanBanding(P: Papan, a: number, b: number): string {
  const p = penentu(nl(P, a), nl(P, b));
  if (p.cara === "panjang") {
    const [besar, kecil] = p.besar === "a" ? [a, b] : [b, a];
    return `Bilangan ${nm(P, besar)} punya ${banyakAngka(nl(P, besar))} angka, lebih banyak daripada ${nm(P, kecil)} yang punya ${banyakAngka(nl(P, kecil))} angka`;
  }
  if (p.cara === "sama") return "Semua angkanya sama dari kiri sampai kanan";
  const sa = String(nl(P, a))[p.i];
  const sb = String(nl(P, b))[p.i];
  return `Angka yang sama digeser dari kiri sampai ${p.nama}, tempat angkanya berbeda: ${sa} dan ${sb}`;
}
export function kalimatKunci(l: Langkah, cara: Cara): string {
  return kapKal(ucapkan(kalimatKunciMentah(l, cara)));
}
function kalimatKunciMentah(l: Langkah, cara: Cara): string {
  void cara;
  const d = dasarDari(l);
  const P = PAPAN[d.p];
  switch (d.tipe) {
    case "tanda":
    case "sebutTanda":
      return `${alasanBanding(P, d.a, d.b)}, jadi ${nm(P, d.a)} ${LEBIH[tandaDari(nl(P, d.a), nl(P, d.b))]} ${nm(P, d.b)}.`;
    case "banyakAngka":
      return `Bilangan ${nm(P, d.a)} ditulis dengan ${banyakAngka(nl(P, d.a))} angka, dihitung dari kiri sampai kanan.`;
    case "penentu":
      return `${alasanBanding(P, d.a, d.b)}. Angka itulah yang menentukan.`;
    case "kolomKe":
      return `Angka penentu ada di kolom ke ${kolomDariKiri(nl(P, d.a), nl(P, d.b))} dari kiri.`;
    case "mana":
      return `${alasanBanding(P, d.a, d.b)}, jadi bilangan yang ${tandaDari(nl(P, d.a), nl(P, d.b)) === ">" ? "pertama" : "kedua"} lebih besar.`;
    case "ruas": {
      const [lo, hi] = ruasDari(nl(P, d.a));
      return `Bilangan ${nm(P, d.a)} lebih besar dari ${fmt(lo)} dan lebih kecil dari ${fmt(hi)}, jadi titiknya ada di antara kedua patokan itu.`;
    }
    case "patKiri":
      return `Patokan di sebelah kiri titik ${nm(P, d.a)} adalah ${fmt(patokanKiri(nl(P, d.a)))}, yaitu ${patokanKiri(nl(P, d.a)) / LANGKAH_GARIS} puluh ribu.`;
    case "kanan":
      return `Makin ke kanan makin besar, jadi titik paling kanan menunjukkan bilangan paling besar, yaitu ${(kunciJawab(l, "suara") as { nama: string }).nama}.`;
    case "dekat": {
      const n = nl(P, d.a);
      const t = patokanTerdekat(n);
      return `Jarak bilangan ${nm(P, d.a)} ke ${fmt(t)} lebih dekat daripada ke patokan lainnya, jadi ${fmt(t)} patokan yang dipilih.`;
    }
    case "urutKe":
      return `Dari yang paling kecil, bilangan ${nm(P, d.a)} ada pada urutan ke ${peringkat(SEMUA_N(P), nl(P, d.a))}.`;
    case "sisi":
      return `Bilangan ${nm(P, d.a)} ${LEBIH[tandaDari(nl(P, d.a), d.pat)]} ${fmt(d.pat)}, jadi titiknya di sebelah ${sisiPatokan(nl(P, d.a), d.pat)} patokan.`;
  }
}
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  return kapKal(ucapkan(instruksiMentah(l, rupa, cara, metode)));
}
function instruksiMentah(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebutBidang(rupa);
  const aw = AWALAN[metode];
  const P = PAPAN[l.p];
  const akhir = cara === "klik" ? "Pilih jawabannya." : cara === "kanvas" ? "Tulis satu angka di kanvas." : "Ucapkan satu kata.";
  switch (l.tipe) {
    case "tanda":
      return `${aw}: lihat ${g} ini. Bilangan ${nm(P, l.a)} dibandingkan dengan bilangan ${nm(P, l.b)}. Tanda apa yang tepat? ${akhir}`;
    case "banyakAngka":
      return `${aw}: lihat ${g} ini. Hitung semua angka pada bilangan ${nm(P, l.a)}. Ada berapa angka? ${akhir}`;
    case "sebutTanda":
      return `${aw}: lihat ${g} ini. Bilangan ${nm(P, l.a)} dibandingkan dengan bilangan ${nm(P, l.b)}. Apakah bilangan pertama besar, kecil, atau sama? ${akhir}`;
    case "penentu":
      return `${aw}: lihat ${g} ini. Bandingkan ${nm(P, l.a)} dan ${nm(P, l.b)} dari kiri. Angka penentunya ada di kolom apa? ${akhir}`;
    case "kolomKe":
      return `${aw}: lihat ${g} ini. Bandingkan ${nm(P, l.a)} dan ${nm(P, l.b)} dari kiri. Angka penentunya ada di kolom ke berapa dari kiri? ${akhir}`;
    case "mana":
      return `${aw}: lihat ${g} ini. Bandingkan ${nm(P, l.a)} dan ${nm(P, l.b)} dari kiri. Bilangan mana yang lebih besar, pertama atau kedua? ${akhir}`;
    case "ruas":
      return `${aw}: lihat ${g} ini. Letakkan bilangan ${nm(P, l.a)} di garis. Titiknya ada di antara dua patokan yang mana? ${akhir}`;
    case "patKiri":
      return `${aw}: lihat ${g} ini. Letakkan bilangan ${nm(P, l.a)} di garis. Patokan di kirinya berapa puluh ribu? ${akhir}`;
    case "kanan":
      return `${aw}: lihat ${g} ini. Letakkan ketiga bilangan di garis. Yang paling besar ada paling kanan. Bilangan mana yang paling besar? ${akhir}`;
    case "dekat":
      return `${aw}: lihat ${g} ini. Pilih patokan untuk bilangan ${nm(P, l.a)}. Patokan mana yang paling dekat? ${akhir}`;
    case "urutKe":
      return `${aw}: lihat ${g} ini. Urutkan semua bilangan dari yang paling kecil. Bilangan ${nm(P, l.a)} ada pada urutan ke berapa? ${akhir}`;
    case "sisi":
      return `${aw}: lihat ${g} ini. Pakai ${fmt(l.pat)} sebagai patokan. Bilangan ${nm(P, l.a)} ada di sebelah kiri atau kanan patokan? ${akhir}`;
  }
}
/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  void cara;
  return kapKal(ucapkan(kalimatTanyaMentah(dasarDari(l))));
}
function kalimatTanyaMentah(d: LangkahDasar): string {
  switch (d.tipe) {
    case "tanda":
      return "Tanda apa yang tepat?";
    case "banyakAngka":
      return "Ada berapa angka?";
    case "sebutTanda":
      return "Apakah bilangan pertama besar, kecil, atau sama?";
    case "penentu":
      return "Angka penentunya ada di kolom apa?";
    case "kolomKe":
      return "Angka penentunya ada di kolom ke berapa dari kiri?";
    case "mana":
      return "Bilangan mana yang lebih besar, pertama atau kedua?";
    case "ruas":
      return "Titiknya ada di antara dua patokan yang mana?";
    case "patKiri":
      return "Patokan di kirinya berapa puluh ribu?";
    case "kanan":
      return "Bilangan mana yang paling besar?";
    case "dekat":
      return "Patokan mana yang paling dekat?";
    case "urutKe":
      return "Bilangan itu ada pada urutan ke berapa?";
    case "sisi":
      return "Ada di sebelah kiri atau kanan patokan?";
  }
}
/** Petunjuk saat jawaban salah: mengarahkan tanpa menyebut hasil benar. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. Pikirkan lagi apa yang ${l.tokoh} lakukan.`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "tanda":
    case "sebutTanda":
      return "Bandingkan banyak angkanya dulu. Kalau sama banyak, bandingkan angka dari kolom paling kiri.";
    case "banyakAngka":
      return "Hitung semua angka pada bilangan itu dari kiri sampai kanan, termasuk nol.";
    case "penentu":
      return "Mulai dari kolom paling kiri, lalu geser ke kanan sampai angkanya berbeda.";
    case "kolomKe":
      return "Hitung kolom dari kiri, mulai dari satu, sampai bertemu angka pertama yang berbeda.";
    case "mana":
      return "Cari angka pertama yang berbeda dari kiri, lalu lihat bilangan mana yang angkanya lebih besar.";
    case "ruas":
      return "Bandingkan bilangan itu dengan patokan di sebelah kiri dan kanannya.";
    case "patKiri":
      return "Cari patokan di sebelah kiri titik itu, bukan di sebelah kanannya.";
    case "kanan":
      return "Makin ke kanan makin besar. Cari titik yang paling jauh di sebelah kanan.";
    case "dekat":
      return "Hitung jarak bilangan itu ke tiap patokan, lalu pilih yang jaraknya paling kecil.";
    case "urutKe":
      return "Urutkan semua bilangan dari yang paling kecil, lalu hitung urutan bilangan itu.";
    case "sisi":
      return "Bandingkan bilangan itu dengan patokan: lebih kecil berarti di kiri, lebih besar berarti di kanan.";
  }
}

/* ------------------------------ Gambar dan kartu ------------------------------ */
export type JenisGambar = "papan" | "garis" | "daftar";
export const jenisGambar = (d: LangkahDasar): JenisGambar => (d.tipe === "urutKe" ? "daftar" : ["ruas", "patKiri", "kanan", "dekat", "sisi"].includes(d.tipe) ? "garis" : "papan");
/** Baris item yang ditampilkan pada papan kolom: satu bilangan (banyak angka) atau dua bilangan yang dibandingkan. */
export const barisPapan = (d: LangkahDasar): number[] => {
  if (d.tipe === "banyakAngka") return [d.a];
  if ("b" in d) return [d.a, d.b];
  return [];
};
/** Garis bilangan untuk tugas garis: patokan dan titik sesuai bilangan. */
export function garisTugas(d: LangkahDasar): Garis | null {
  if (jenisGambar(d) !== "garis") return null;
  const P = PAPAN[d.p];
  let titik: number[];
  if (d.tipe === "kanan") titik = d.t;
  else if ("a" in d) titik = [d.a];
  else return null;
  const ns = titik.map((i) => nl(P, i));
  const tambah: number[] = [];
  if (d.tipe === "sisi") tambah.push(d.pat);
  if (d.tipe === "dekat" && d.pil) tambah.push(...d.pil.map((t) => Number(t.replace(/\./g, ""))));
  const lo = awalGaris([...ns, ...tambah]);
  return rancangGaris(lo, titik.map((i) => ({ nama: P.item[i].nama, n: nl(P, i) })));
}
/** Titik yang disorot pada gambar: satu bilangan yang ditanyakan. */
export const namaTitik = (d: LangkahDasar): string => ("a" in d ? PAPAN[d.p].item[d.a].nama : "");

const baris = (P: Papan, i: number): string => `${nm(P, i)}: ${fmt(nl(P, i))} ${P.satuan}`;
/** Isi kartu kata untuk tahap Abstract (kata dan angka, tanpa emoji dan tanpa menyebut gambar). Baris terakhir juga menjadi keterangan gambar Concrete dan Pictorial. */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  void cara;
  const P = PAPAN[l.p];
  const judul = `kartu angka panitia: ${P.judul.toLowerCase()}`;
  switch (l.tipe) {
    case "tanda":
      return [judul, baris(P, l.a), baris(P, l.b), "tanda yang tepat: ?"];
    case "banyakAngka":
      return [judul, baris(P, l.a), "banyak angka: ?"];
    case "sebutTanda":
      return [judul, baris(P, l.a), baris(P, l.b), "bilangan pertama (besar, kecil, atau sama): ?"];
    case "penentu":
      return [judul, baris(P, l.a), baris(P, l.b), "kolom angka penentu: ?"];
    case "kolomKe":
      return [judul, baris(P, l.a), baris(P, l.b), "angka penentu di kolom ke (dari kiri): ?"];
    case "mana":
      return [judul, baris(P, l.a), baris(P, l.b), "yang lebih besar (pertama atau kedua): ?"];
    case "ruas":
      return [judul, baris(P, l.a), "patokan: tiap sepuluh ribu", "ruas yang memuat bilangan itu: ?"];
    case "patKiri":
      return [judul, baris(P, l.a), "patokan: tiap sepuluh ribu", "patokan kiri (puluh ribu): ?"];
    case "kanan":
      return [judul, ...l.t.map((i) => baris(P, i)), "bilangan paling besar: ?"];
    case "dekat":
      return [judul, baris(P, l.a), "patokan: tiap sepuluh ribu", "patokan terdekat: ?"];
    case "urutKe":
      return [judul, ...P.item.map((_, i) => baris(P, i)), `urutan ${nm(P, l.a).toLowerCase()} dari yang terkecil: ?`];
    case "sisi":
      return [judul, baris(P, l.a), `patokan: ${fmt(l.pat)}`, "di sebelah patokan: ?"];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
/** Keterangan di bawah gambar Concrete dan Pictorial: judul papan dan hal yang dicari. */
export function ketGambar(d: LangkahDasar, cara?: Cara): string[] {
  const kartu = barisKartu(d, cara);
  const P = PAPAN[d.p];
  return [`${P.judul} (${P.satuan})`, kartu[kartu.length - 1]];
}
export const namaDiPapan = nm;
