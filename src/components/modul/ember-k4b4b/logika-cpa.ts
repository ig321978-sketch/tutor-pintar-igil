/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 4 Sub-Bab B "Ember Pak Anto" (volume), akhir cerita Kolam Renang Tirta Ceria:
 * jenis tugas, jawaban benar, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-ember-k4b4b.mjs.
 * Jawaban beragam: memilih satuan atau takaran (klik), menulis satu angka di kanvas, dan mengucapkan satu kata (baku, liter, mililiter, kubik) atau bilangan.
 * Jawaban benar dihitung dari data. Empat metode tiap misi: IGIL "Isi dan Tuang, Susun Lapisan, Tangga Liter" (tugas satuan, gelas, dan kata),
 * Fill and Pour (Isi dan Tuang), Layer Cubes (Susun Lapisan), dan Liter Ladder (Tangga Liter).
 * Ukuran: 1 l = 1.000 ml, 1 cm³ = 1 ml, volume balok = kubus tiap lapisan x banyak lapisan. Satuan selalu tertulis dan diucapkan dengan kata.
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { ejaK4B4, kataBilK4B4 } from "../eja-k4b4";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

/* ------------------------------ Kata bilangan dan satuan ------------------------------ */
/** Nama bilangan 0 sampai 999.999 dalam kata (tanpa digit): seratus, dua ribu lima ratus. */
export const kataBil = kataBilK4B4;
export const kata = kataBil;
/** Bilangan dengan titik ribuan: 1000 menjadi "1.000". */
export const fmt = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
export const teksMl = (n: number): string => `${fmt(n)} ml`;
export const teksL = (n: number): string => `${fmt(n)} l`;
export const teksCm3 = (n: number): string => `${fmt(n)} cm³`;

/** Ubah teks berangka menjadi ucapan tanpa digit: "1.000 ml" menjadi "seribu mililiter", "24 cm³" menjadi "dua puluh empat sentimeter kubik". Tanpa spasi sebelum tanda baca. */
export function ucapkan(t: string): string {
  return ejaK4B4(t)
    .replace(/^l$/, "liter")
    .replace(/\s+([.,!?;:])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/* ------------------------------ Ukuran ------------------------------ */
/** Satuan baku volume yang dipakai: mililiter, liter, dan sentimeter kubik (cm² hanya pengecoh luas). */
export type SatuanVol = "ml" | "l";
export const ML_PER_L = 1000;
/** Isi seluruhnya: banyak gelas dikali takar tiap gelas (ml). */
export const totalIsi = (gelas: number, takar: number): number => gelas * takar;
/** Kubus satuan tiap lapisan: banyak baris dikali banyak kubus tiap baris. */
export const perLapisan = (kolom: number, baris: number): number => kolom * baris;
/** Volume balok kubus satuan: kubus tiap lapisan dikali banyak lapisan (cm³, sama dengan ml). */
export const volumeBlok = (kolom: number, baris: number, lapis: number): number => perLapisan(kolom, baris) * lapis;
/** Banyak kotak (permukaan kubus satuan) yang tampak pada gambar balok: depan, atas, dan samping. */
export const mukaBlok = (kolom: number, baris: number, lapis: number): { depan: number; atas: number; samping: number } => ({ depan: kolom * lapis, atas: kolom * baris, samping: baris * lapis });
export const mlDariL = (l: number): number => l * ML_PER_L;
export const lDariMl = (ml: number): number => ml / ML_PER_L;
/** Isi `banyak` benda menjadi kisi tetap dengan paling banyak `kolom` benda tiap baris: jumlah semua baris selalu sama dengan `banyak`. */
export const susunBaris = (banyak: number, kolom: number): number[] => {
  const baris: number[] = [];
  for (let sisa = Math.max(0, banyak); sisa > 0; sisa -= kolom) baris.push(Math.min(kolom, sisa));
  return baris;
};

/* ------------------------------ Jenis tugas ------------------------------ */
type Pil = [string, string, string];
/** Satuan (IGIL, klik): benda dengan bilangan berisi satuan yang belum ditulis. Pilih satuan yang tepat. */
export type LSatuan = { tipe: "satuan"; benda: string; jumlah: number; satuan: string; pil: Pil };
/** Gelas (IGIL, kanvas): bak penuh setelah `kecil` gelas kecil; satu gelas besar sama dengan `per` gelas kecil. Berapa gelas besar? (satu angka) */
export type LGelas = { tipe: "gelas"; wadah: string; kecil: number; per: number };
/** Sebut kata (IGIL, suara): satu kata dari arti satuan. */
export type KataSebut = "baku" | "liter" | "mililiter" | "kubik";
export type LSebut = { tipe: "sebut"; kata: KataSebut };
/** Isi dan Tuang (Fill and Pour): `gelas` gelas takar, tiap gelas `takar` ml, dituang ke ember. Klik: pilih isi seluruhnya, kanvas: banyak gelas (isi diketahui), suara: isi seluruhnya (ml). */
export type LIsi = { tipe: "isi"; takar: number; gelas: number; pil?: Pil };
/** Susun Lapisan (Layer Cubes): satu lapisan `baris` baris dengan `kolom` kubus tiap baris, `lapis` lapisan. Klik: pilih volume, kanvas: volume (satu angka), suara: volume. */
export type LLapisan = { tipe: "lapisan"; kolom: number; baris: number; lapis: number; pil?: Pil };
/** Tangga Liter (Liter Ladder): `liter` turun (l ke ml, dikali seribu) atau naik (ml ke l, dibagi seribu); `kubik` cm³ ke ml (sama besar). Klik: pilih hasil, kanvas: naik (liter, satu angka), suara: turun atau kubik. */
export type LTangga = { tipe: "tangga"; jenis: "liter" | "kubik"; n: number; arah: "turun" | "naik"; pil?: Pil };
export type LangkahDasar = LSatuan | LGelas | LSebut | LIsi | LLapisan | LTangga;
/** Tugas yang boleh dibungkus Cari kesalahan (jawaban tokoh adalah salah satu pilihan klik). */
export type DasarSalah = LSatuan | LIsi | LLapisan | LTangga;
/** Cari kesalahan: tokoh sudah menjawab dari `dasar`. Anak memutuskan benar atau salah, memilih alasan, lalu menjawab sendiri. `jawabTokoh` adalah salah satu pilihan klik. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: DasarSalah;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh: string;
  alasan: [string, string, string];
  benar: number;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "isi" | "lapisan" | "tangga";
export const URUT_METODE: Metode[] = ["igil", "isi", "lapisan", "tangga"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Isi dan Tuang, Susun Lapisan, Tangga Liter",
  isi: "Fill and Pour: Isi dan Tuang",
  lapisan: "Layer Cubes: Susun Lapisan",
  tangga: "Liter Ladder: Tangga Liter",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F9EE}", isi: "\u{1F95B}", lapisan: "\u{1F3B2}", tangga: "\u{1F522}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", isi: "Fill and Pour", lapisan: "Layer Cubes", tangga: "Liter Ladder" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/** Nama benda untuk kalimat tugas satuan. */
export const NAMA_BENDA: Record<string, string> = { sendok: "Sendok obat", ember: "Ember mandi", botol: "Botol minum", gelas: "Gelas takar" };
export const nama = (satuan: string): string => (satuan === "ml" ? "mililiter" : satuan === "l" ? "liter" : satuan);

/** Bilangan yang ditanyakan atau dihasilkan tugas (jawaban benar dalam bentuk bilangan); null untuk tugas satuan dan kata. */
export function hasilTugas(d: LangkahDasar): number | null {
  switch (d.tipe) {
    case "satuan":
    case "sebut":
      return null;
    case "gelas":
      return d.kecil / d.per;
    case "isi":
      return totalIsi(d.gelas, d.takar);
    case "lapisan":
      return volumeBlok(d.kolom, d.baris, d.lapis);
    case "tangga":
      return d.jenis === "kubik" ? d.n : d.arah === "turun" ? mlDariL(d.n) : d.n;
  }
}
/** Teks hasil tugas klik (dengan satuan). */
export function teksHasilKlik(d: DasarSalah): string {
  switch (d.tipe) {
    case "satuan":
      return d.satuan;
    case "isi":
      return teksMl(totalIsi(d.gelas, d.takar));
    case "lapisan":
      return teksCm3(volumeBlok(d.kolom, d.baris, d.lapis));
    case "tangga":
      return d.jenis === "kubik" ? teksMl(d.n) : d.arah === "turun" ? teksMl(mlDariL(d.n)) : teksL(d.n);
  }
}

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const sebutan = (s: string): Kunci => ({ jenis: "nama", nama: s });

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari data. Mengembalikan null untuk kombinasi yang tidak dipakai. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "satuan":
      return cara === "klik" ? sebutan(l.satuan) : null;
    case "gelas":
      return cara === "kanvas" ? angka(l.kecil / l.per) : null;
    case "sebut":
      return cara === "suara" ? sebutan(l.kata) : null;
    case "isi":
      return cara === "klik" ? sebutan(teksHasilKlik(l)) : cara === "kanvas" ? angka(l.gelas) : angka(totalIsi(l.gelas, l.takar));
    case "lapisan":
      return cara === "klik" ? sebutan(teksHasilKlik(l)) : angka(volumeBlok(l.kolom, l.baris, l.lapis));
    case "tangga":
      if (cara === "klik") return sebutan(teksHasilKlik(l));
      if (cara === "kanvas") return l.jenis === "liter" && l.arah === "naik" ? angka(l.n) : null;
      return l.jenis === "kubik" ? angka(l.n) : l.arah === "turun" ? angka(mlDariL(l.n)) : null;
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

/**
 * Pengecoh bilangan untuk jawaban suara: kesalahan yang lazim (menjumlah alih-alih mengalikan, lupa satu kali pemakaian, salah satu nol pada seribu), lalu bilangan di dekatnya.
 * Hanya bilangan bulat 1 sampai 99.999 yang berbeda dari jawaban benar.
 */
export function pengecoh(l: Langkah, cara: Cara): number[] {
  const d = dasarDari(l);
  const k = kunciJawab(d, cara);
  const n = k?.jenis === "angka" ? k.n : 0;
  let calon: number[] = [];
  if (d.tipe === "isi") calon = [d.takar + d.gelas, d.takar * (d.gelas - 1), d.takar * (d.gelas + 1), n + d.takar, n - d.takar];
  else if (d.tipe === "lapisan") calon = [d.kolom + d.baris + d.lapis, perLapisan(d.kolom, d.baris), n + perLapisan(d.kolom, d.baris), n - perLapisan(d.kolom, d.baris), n + 1];
  else if (d.tipe === "tangga") calon = d.jenis === "kubik" ? [d.n * 10, d.n * 1000, d.n + 1, d.n - 1] : [d.n * 100, d.n * 10, d.n * 10000, d.n + 1000];
  else calon = [n + 1, n - 1, n + 2, n - 2];
  const hasil: number[] = [];
  for (const c of calon) if (Number.isInteger(c) && c >= 1 && c <= 99999 && c !== n && !hasil.includes(c)) hasil.push(c);
  return hasil;
}

/** Pilihan klik: tiga pilihan dari data tugas (jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh pada Cari kesalahan selalu ikut). */
export function pilihanKlik(l: Langkah): string[] {
  const d = dasarDari(l);
  if (d.tipe === "sebut" || d.tipe === "gelas") return [];
  return d.pil ? [...d.pil] : [];
}
const KATA_LAIN: Record<string, string[]> = {
  baku: ["kira-kira", "bebas"],
  liter: ["mililiter", "kubik"],
  mililiter: ["liter", "kubik"],
  kubik: ["persegi", "liter"],
};
/** Pilihan cadangan untuk tugas suara (kata atau bilangan dalam kata). */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k) return [];
  if (k.jenis === "angka") {
    const lain = pengecoh(l, cara).slice(0, 2);
    return sisipkan(kataBil(k.n), lain.map(kataBil), k.n);
  }
  return sisipkan(k.nama, (KATA_LAIN[k.nama] ?? ["bebas", "kira-kira"]).slice(0, 2), k.nama.length);
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));
/** Teks pilihan klik yang benar (satuan atau takaran dengan satuan). */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  if (!k) return null;
  return k.jenis === "nama" ? k.nama : String(k.n);
}

/* ------------------------------ Kalimat ------------------------------ */
const sebutBidang = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : rupa === "benda" ? "rak ember" : "diagram");

/** Awal tiap kalimat berhuruf kapital (kata bilangan dieja huruf kecil di tengah teks). */
const kapKal = (t: string): string => t.replace(/(^|[.?!]\s+)([a-z])/g, (_m, a: string, b: string) => a + b.toUpperCase());

export function kalimatKunci(l: Langkah, cara: Cara): string {
  return kapKal(ucapkan(kalimatKunciMentah(l, cara)));
}

function kalimatKunciMentah(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "satuan":
      return d.satuan === "ml"
        ? `Satuan yang tepat adalah mililiter, karena isinya sedikit dan memakai satuan kecil.`
        : `Satuan yang tepat adalah liter, karena isinya banyak dan memakai satuan besar.`;
    case "gelas":
      return `Satu gelas besar sama dengan ${d.per} gelas kecil, jadi ${d.kecil} gelas kecil dibagi ${d.per} sama dengan ${d.kecil / d.per} gelas besar.`;
    case "sebut":
      return d.kata === "baku"
        ? "Satuan yang ukurannya sama di mana saja disebut satuan baku."
        : d.kata === "liter"
          ? "Seribu mililiter sama dengan satu liter."
          : d.kata === "mililiter"
            ? "Satu liter dibagi menjadi seribu bagian kecil, dan satu bagian kecil itu satu mililiter."
            : "Volume kubus satuan memakai satuan sentimeter kubik.";
    case "isi":
      return cara === "kanvas"
        ? `Ember berisi ${totalIsi(d.gelas, d.takar)} ml dan tiap gelas ${d.takar} ml, jadi ${totalIsi(d.gelas, d.takar)} dibagi ${d.takar} sama dengan ${d.gelas} gelas.`
        : `${d.gelas} gelas takar dengan tiap gelas ${d.takar} ml: ${d.gelas} × ${d.takar} = ${totalIsi(d.gelas, d.takar)} ml.`;
    case "lapisan":
      return `Satu lapisan berisi ${d.baris} × ${d.kolom} = ${perLapisan(d.kolom, d.baris)} kubus. Ada ${d.lapis} lapisan, jadi volumenya ${perLapisan(d.kolom, d.baris)} × ${d.lapis} = ${volumeBlok(d.kolom, d.baris, d.lapis)} cm³.`;
    case "tangga":
      return d.jenis === "kubik"
        ? `Satu cm³ sama dengan satu ml, jadi ${d.n} cm³ sama dengan ${d.n} ml.`
        : d.arah === "turun"
          ? `Turun tangga dikali seribu: ${d.n} × 1.000 = ${mlDariL(d.n)} ml.`
          : `Naik tangga dibagi seribu: ${mlDariL(d.n)} dibagi 1.000 sama dengan ${d.n} l.`;
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
    case "satuan":
      return `${aw}: lihat ${g} ini. ${NAMA_BENDA[l.benda]} berisi ${l.jumlah} dengan satuan yang belum ditulis. Satuan apa yang paling tepat? ${akhir}`;
    case "gelas":
      return `${aw}: lihat ${g} ini. ${l.wadah === "ember" ? "Ember" : "Bak"} penuh setelah ${l.kecil} gelas kecil, dan satu gelas besar sama dengan ${l.per} gelas kecil. Gelas besar yang dibutuhkan ada berapa? ${akhir}`;
    case "sebut":
      return l.kata === "baku"
        ? `${aw}: lihat ${g} ini. Gelas kecil dan gelas besar memberi banyak yang berbeda. Satuan yang ukurannya sama di mana saja disebut satuan apa? Ucapkan satu kata.`
        : l.kata === "liter"
          ? `${aw}: lihat ${g} ini. Seribu mililiter sama dengan satu satuan besar. Satuan besar itu disebut apa? Ucapkan satu kata.`
          : l.kata === "mililiter"
            ? `${aw}: lihat ${g} ini. Satu liter dibagi menjadi seribu bagian kecil. Satu bagian kecil itu satuan apa? Ucapkan satu kata.`
            : `${aw}: lihat ${g} ini. Kubus satuan bersisi satu sentimeter. Volumenya dalam sentimeter apa? Ucapkan satu kata.`;
    case "isi":
      return cara === "kanvas"
        ? `${aw}: lihat ${g} ini. Ember berisi ${totalIsi(l.gelas, l.takar)} ml air yang dituang dari gelas takar ${l.takar} ml. Ada berapa gelas takar yang dituang? ${akhir}`
        : `${aw}: lihat ${g} ini. ${l.gelas} gelas takar, tiap gelas ${l.takar} ml, dituang ke ember sampai habis. Air di ember berapa mililiter? ${akhir}`;
    case "lapisan":
      return `${aw}: lihat ${g} ini. Satu lapisan berisi ${l.baris} baris dengan ${l.kolom} kubus tiap baris, dan ada ${l.lapis} lapisan. Tiap kubus bervolume satu sentimeter kubik. Volume seluruhnya berapa sentimeter kubik? ${akhir}`;
    case "tangga":
      return l.jenis === "kubik"
        ? `${aw}: lihat ${g} ini. Air memenuhi ${l.n} cm³ kubus satuan. Berapa mililiter airnya? ${akhir}`
        : l.arah === "turun"
          ? `${aw}: lihat ${g} ini. Ember berisi ${l.n} l air akan dituang ke gelas ukur yang memakai mililiter. Berapa mililiter airnya? ${akhir}`
          : `${aw}: lihat ${g} ini. Gelas ukur berisi ${mlDariL(l.n)} ml air yang akan dicatat dalam liter. Berapa liter airnya? ${akhir}`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  return kapKal(ucapkan(kalimatTanyaMentah(d, cara)));
}
function kalimatTanyaMentah(d: LangkahDasar, cara: Cara): string {
  switch (d.tipe) {
    case "satuan":
      return "Satuan apa yang paling tepat?";
    case "gelas":
      return "Gelas besar yang dibutuhkan ada berapa?";
    case "sebut":
      return d.kata === "baku" ? "Satuan yang sama di mana saja disebut apa?" : d.kata === "liter" ? "Satuan besar itu disebut apa?" : d.kata === "mililiter" ? "Satu bagian kecil itu satuan apa?" : "Volume kubus satuan dalam sentimeter apa?";
    case "isi":
      return cara === "kanvas" ? "Ada berapa gelas takar?" : "Air di ember berapa mililiter?";
    case "lapisan":
      return "Volumenya berapa sentimeter kubik?";
    case "tangga":
      return d.jenis === "liter" && d.arah === "naik" ? "Berapa liter airnya?" : "Berapa mililiter airnya?";
  }
}

/** Petunjuk saat jawaban salah: mengarahkan tanpa menyebut hasil benar (tanpa digit). `jawab`: kata, takaran, atau satuan yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. Pikirkan lagi apa yang ${l.tokoh} lakukan.`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "satuan":
      return "Perhatikan banyak isinya. Isi yang sedikit memakai satuan kecil, dan isi yang banyak memakai satuan besar. Satuan luas bukan untuk isi.";
    case "gelas":
      return "Gelas besar memuat beberapa gelas kecil. Bagi banyak gelas kecil dengan isi satu gelas besar.";
    case "sebut":
      return l.kata === "baku"
        ? "Satuan yang ukurannya selalu sama bagi semua orang punya nama tersendiri. Ucapkan namanya."
        : "Ingat kembali nama satuan volume: ada satuan besar, satuan kecil, dan satuan untuk kubus. Ucapkan namanya.";
    case "isi":
      return cara === "kanvas"
        ? "Bagi isi seluruhnya dengan isi satu gelas takar. Hasilnya banyak gelas yang dituang."
        : "Isi seluruhnya adalah banyak gelas dikali isi tiap gelas, bukan dijumlah. Hitung lagi, lalu periksa satuannya.";
    case "lapisan":
      return "Hitung dulu kubus dalam satu lapisan dengan baris dikali kubus tiap baris. Lalu kalikan dengan banyak lapisan, bukan dijumlah.";
    case "tangga":
      return l.jenis === "kubik"
        ? "Satu sentimeter kubik sama besar dengan satu mililiter. Bilangannya tidak berubah, hanya satuannya."
        : cara === "suara" || (cara === "klik" && l.arah === "turun")
          ? "Dari liter ke mililiter kamu menuruni tangga, jadi bilangan dikali seribu. Periksa jumlah nolnya."
          : "Dari mililiter ke liter kamu menaiki tangga, jadi bilangan dibagi seribu. Periksa jumlah nolnya.";
  }
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
/** Isi kartu kata untuk tahap Abstract (kata dan angka, tanpa emoji). Baris terakhir selalu berakhir pada hal yang dicari. Baris pertama dan terakhir juga menjadi keterangan gambar Concrete dan Pictorial. */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  const pil = (x?: Pil) => `pilihan: ${x?.join(", ") ?? ""}`;
  switch (l.tipe) {
    case "satuan":
      return [`${NAMA_BENDA[l.benda].toLowerCase()} berisi ${l.jumlah} ?`, pil(l.pil), "satuan yang tepat: ?"];
    case "gelas":
      return [`${l.wadah === "ember" ? "ember" : "bak"} penuh: ${l.kecil} gelas kecil`, `1 gelas besar = ${l.per} gelas kecil`, "gelas besar: ?"];
    case "sebut":
      return l.kata === "baku"
        ? ["gelas kecil dan gelas besar: banyaknya beda", "satuan yang sama di mana saja", "kata yang dicari: ?"]
        : l.kata === "liter"
          ? ["1.000 ml = 1 satuan besar", "satuan besar untuk ember", "kata yang dicari: ?"]
          : l.kata === "mililiter"
            ? ["1 l dibagi menjadi 1.000 bagian kecil", "satu bagian kecil", "kata yang dicari: ?"]
            : ["kubus satuan bersisi 1 cm", "volumenya dalam cm apa", "kata yang dicari: ?"];
    case "isi":
      return cara === "kanvas"
        ? [`air di ember: ${teksMl(totalIsi(l.gelas, l.takar))}`, `tiap gelas: ${teksMl(l.takar)}`, "banyak gelas: ?"]
        : [`gelas takar: ${l.gelas} gelas`, `tiap gelas: ${teksMl(l.takar)}`, ...(cara === "klik" ? [pil(l.pil)] : []), "air di ember: ?"];
    case "lapisan":
      return [`satu lapisan: ${l.baris} baris × ${l.kolom} kubus`, `banyak lapisan: ${l.lapis}`, ...(cara === "klik" ? [pil(l.pil)] : []), "volume (cm³): ?"];
    case "tangga":
      return l.jenis === "kubik"
        ? [`diketahui: ${teksCm3(l.n)}`, "1 cm³ = 1 ml", ...(cara === "klik" ? [pil(l.pil)] : []), "mililiter: ?"]
        : l.arah === "turun"
          ? [`diketahui: ${teksL(l.n)}`, "1 l = 1.000 ml", ...(cara === "klik" ? [pil(l.pil)] : []), "mililiter: ?"]
          : [`diketahui: ${teksMl(mlDariL(l.n))}`, "1 l = 1.000 ml", ...(cara === "klik" ? [pil(l.pil)] : []), "liter: ?"];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
