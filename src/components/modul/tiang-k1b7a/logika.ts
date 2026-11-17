/**
 * Logika murni Kelas 1 Bab 7 Sub-Bab A "Tiang dan Tangga" (membandingkan dan mengurutkan panjang benda, tanpa satuan baku), awal cerita
 * Rumah Pohon Abang, untuk tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract. Tanpa React dan tanpa jaringan,
 * diuji di Node: scripts/uji-tiang-k1b7a.mjs. Panjang benda adalah bilangan bulat (satuan tak baku, paling besar dua belas) dan tidak pernah
 * ditulis sebagai ukuran; anak membandingkannya dengan melihat ujung dari garis awal yang sama. Kata bilangan memakai ulang Bab 5 Sub-Bab A.
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { kata } from "../ikan-k1b5a/logika";

export { acak, cocok, cocokKelompok, kelompokLabel, labelDari, IKON_CARA, NAMA_CARA, URUT_CARA, type Cara, type Label, type Tempat } from "../lemari-k1b1a/logika";
export { kata } from "../ikan-k1b5a/logika";

export type Metode = "igil" | "langsung" | "perantara" | "tangga";
export const URUT_METODE: Metode[] = ["igil", "langsung", "perantara", "tangga"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Banding Panjang dari garis awal",
  langsung: "Direct Comparison: banding langsung",
  perantara: "Indirect Comparison: banding dengan perantara",
  tangga: "Seriation: menyusun tangga",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F440}", langsung: "\u{1F91D}", perantara: "\u{1F9F5}", tangga: "\u{1F4C8}" };

export type Rupa = "benda" | "diagram" | "lambang";
/** Yang dicari pada banding: yang lebih tinggi atau yang lebih pendek dari benda bertanda. */
export type Arah = "tinggi" | "pendek";
/** Hubungan benda dengan tali perantara. */
export type Hubungan = "lebih" | "kurang" | "pas";
/** Urutan tangga: naik = dari yang paling pendek, turun = dari yang paling tinggi. */
export type ArahTangga = "naik" | "turun";

/* ------------------------------ Langkah soal ------------------------------ */
/** Banding Panjang: `isi` panjang tiap benda (satuan tak baku), `acuan` benda bertanda, `alas` tinggi alas tiap benda (bata) bila ada. Jawab: banyaknya benda yang lebih tinggi (atau lebih pendek). */
export type LangkahBanding = { tipe: "banding"; isi: number[]; acuan: number; arah: Arah; jenis: string; alas?: number[] };
/** Banding langsung: tali lurus di ujung benda bertanda. Jawab (bila `angka`): banyak benda lain yang sama tinggi; bila tidak, cukup menandai semuanya. */
export type LangkahLangsung = { tipe: "langsung"; isi: number[]; acuan: number; jenis: string; angka: boolean };
/** Perantara: tali sepanjang benda bertanda dibawa ke tiap benda. Jawab: banyak benda yang lebih, kurang, atau pas dengan tali. */
export type LangkahPerantara = { tipe: "perantara"; isi: number[]; acuan: number; tanya: Hubungan; jenis: string };
/** Menyusun tangga. Jawab: urutan benda bertanda dari ujung tangga (`urutan`) atau banyak benda di tangga (`banyak`). */
export type LangkahTangga = { tipe: "tangga"; isi: number[]; acuan: number; arah: ArahTangga; tanya: "urutan" | "banyak"; jenis: string };
export type LangkahDasar = LangkahBanding | LangkahLangsung | LangkahPerantara | LangkahTangga;
/**
 * Cari kesalahan: seorang tokoh sudah menjawab soal `dasar` dengan salah paham yang umum. Anak memutuskan benar atau salah,
 * memilih alasan yang benar dari tiga, lalu menjawab bilangan yang benar. `jawabTokoh` kosong bila salahnya pada kata yang dipakai.
 */
export type LangkahSalah = { tipe: "salah"; dasar: LangkahDasar; tokoh: string; jawabTokoh?: number; kataTokoh: string; alasan: [string, string, string]; benar: number; keliru: string };
export type Langkah = LangkahDasar | LangkahSalah;

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);
/** Metode tiap langkah (Cari kesalahan memakai metode soal dasarnya). */
export function metodeLangkah(l: Langkah): Metode {
  const d = dasarDari(l);
  return d.tipe === "banding" ? "igil" : d.tipe === "langsung" ? "langsung" : d.tipe === "perantara" ? "perantara" : "tangga";
}

/* ------------------------------ Hitungan ------------------------------ */
export const HURUF = "ABCDEFGHIJKL";
export const hurufDari = (i: number): string => HURUF[i] ?? "?";

/** Nomor benda yang memenuhi syaratnya (tanpa benda bertanda). */
export function indeksBanding(l: LangkahBanding): number[] {
  return l.isi.flatMap((v, j) => (j !== l.acuan && (l.arah === "tinggi" ? v > l.isi[l.acuan] : v < l.isi[l.acuan]) ? [j] : []));
}
export function indeksSama(l: LangkahLangsung): number[] {
  return l.isi.flatMap((v, j) => (j !== l.acuan && v === l.isi[l.acuan] ? [j] : []));
}
export const hubungan = (v: number, tali: number): Hubungan => (v > tali ? "lebih" : v < tali ? "kurang" : "pas");
export function indeksPerantara(l: LangkahPerantara): number[] {
  return l.isi.flatMap((v, j) => (j !== l.acuan && hubungan(v, l.isi[l.acuan]) === l.tanya ? [j] : []));
}
/** Urutan benda dari ujung tangga: nomor benda diurutkan (yang sama panjang menurut nomornya). */
export const urutanTangga = (isi: readonly number[], arah: ArahTangga): number[] =>
  isi.map((_, i) => i).sort((p, q) => (arah === "naik" ? isi[p] - isi[q] : isi[q] - isi[p]) || p - q);
/** Urutan benda bertanda dari ujung tangga (yang sama panjang berbagi urutan terdepan). */
export function urutanAcuan(l: LangkahTangga): number {
  const v = l.isi[l.acuan];
  return l.isi.filter((x) => (l.arah === "naik" ? x < v : x > v)).length + 1;
}

/** Kunci tiap langkah, dihitung dari datanya. Null bila soalnya hanya menandai benda tanpa angka jawaban. */
export function kunciLangkah(l: Langkah): number | null {
  switch (l.tipe) {
    case "salah":
      return kunciLangkah(l.dasar);
    case "banding":
      return indeksBanding(l).length;
    case "langsung":
      return l.angka ? indeksSama(l).length : null;
    case "perantara":
      return indeksPerantara(l).length;
    case "tangga":
      return l.tanya === "banyak" ? l.isi.length : urutanAcuan(l);
  }
}
export const angkaJawab = kunciLangkah;

/** Tiga pilihan di sekitar kunci (nol sampai dua belas), memuat jawaban tokoh bila ada. */
export function pilihanDari(l: Langkah): number[] {
  const k = kunciLangkah(l) ?? 0;
  const ada: number[] = [k];
  if (l.tipe === "salah" && l.jawabTokoh !== undefined && !ada.includes(l.jawabTokoh)) ada.push(l.jawabTokoh);
  for (const c of [k - 1, k + 1, k + 2, k - 2]) if (ada.length < 3 && c >= 0 && c <= 12 && !ada.includes(c)) ada.push(c);
  for (let n = 0; ada.length < 3 && n <= 12; n += 1) if (!ada.includes(n)) ada.push(n);
  return ada.sort((p, q) => p - q);
}

/* ------------------------------ Kalimat hubungan untuk Abstract ------------------------------ */
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

/**
 * Pernyataan antarbenda (huruf) yang cukup untuk menalar semua hubungan: benda diurutkan dari yang tertinggi, tiap dua yang bersebelahan
 * dinyatakan "lebih tinggi dari" atau "sama tinggi dengan". Urutan tampil diacak tetap: yang bernomor ganjil dulu.
 */
export function pernyataan(isi: readonly number[]): string[] {
  const s = isi.map((_, i) => i).sort((p, q) => isi[q] - isi[p] || p - q);
  const rantai = s.slice(0, -1).map((a, k) => {
    const b = s[k + 1];
    return isi[a] === isi[b] ? `${hurufDari(a)} sama tinggi dengan ${hurufDari(b)}.` : `${hurufDari(a)} lebih tinggi dari ${hurufDari(b)}.`;
  });
  return [...rantai.filter((_, i) => i % 2 === 1), ...rantai.filter((_, i) => i % 2 === 0)];
}

/** Kalimat yang menjelaskan jawaban benar (tanpa digit). */
export function kalimatKunci(l: LangkahDasar): string {
  switch (l.tipe) {
    case "banding": {
      const n = indeksBanding(l).length;
      return `Dari garis awal yang sama, ${kata(n)} benda lebih ${l.arah === "tinggi" ? "tinggi" : "pendek"} dari benda bertanda.`;
    }
    case "langsung": {
      const n = indeksSama(l).length;
      return n === 1 ? "Ujungnya sejajar dengan satu benda lain, jadi satu benda sama tinggi." : `Ujungnya sejajar dengan ${kata(n)} benda lain, jadi ${kata(n)} benda sama tinggi.`;
    }
    case "perantara": {
      const n = indeksPerantara(l).length;
      const hub = l.tanya === "lebih" ? "lebih panjang dari tali" : l.tanya === "kurang" ? "kurang dari tali" : "pas dengan tali";
      return `${besar(kata(n))} benda ${hub}.`;
    }
    case "tangga":
      return l.tanya === "banyak" ? `Ada ${kata(l.isi.length)} benda di tangga.` : `Benda bertanda ada di urutan ke ${kata(urutanAcuan(l))} dari ${l.arah === "naik" ? "yang paling pendek" : "yang paling tinggi"}.`;
  }
}

/* ------------------------------ Instruksi (templat, tanpa digit) ------------------------------ */
const AKHIR: Record<Cara, string> = { klik: "Lalu pilih jawabannya.", kanvas: "Lalu tulis angkanya di kanvas.", suara: "Lalu ucapkan jawabannya." };
const KATA_ARAH: Record<Arah, string> = { tinggi: "lebih tinggi", pendek: "lebih pendek" };
const KATA_HUB: Record<Hubungan, string> = { lebih: "lebih panjang dari tali", kurang: "kurang dari tali", pas: "pas dengan tali" };

export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  const akhir = AKHIR[cara];
  const benda = rupa === "diagram" ? "batang" : "benda";
  switch (l.tipe) {
    case "salah":
      return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu pilih jawaban yang benar.`;
    case "banding":
      if (rupa === "lambang") return `Bacalah hubungan antarbenda. Berapa benda yang ${KATA_ARAH[l.arah]} dari ${hurufDari(l.acuan)}? ${akhir}`;
      return cara === "kanvas"
        ? `Lihat dari garis awal. Beri tanda pada tiap ${benda} yang ${KATA_ARAH[l.arah]} dari ${benda} bertanda. ${akhir}`
        : `Lihat dari garis awal. Ketuk tiap ${benda} yang ${KATA_ARAH[l.arah]} dari ${benda} bertanda. ${akhir}`;
    case "langsung":
      if (rupa === "lambang") return l.angka ? `Bacalah hubungan antarbenda. Berapa benda yang sama tinggi dengan ${hurufDari(l.acuan)}? ${akhir}` : `Bacalah hubungan antarbenda. ${cara === "kanvas" ? "Beri tanda" : "Ketuk"} tiap huruf yang sama tinggi dengan ${hurufDari(l.acuan)}.`;
      if (!l.angka) return cara === "kanvas" ? `Tali lurus sudah ditarik di ujung ${benda} bertanda. Beri tanda pada tiap ${benda} yang ujungnya kena tali.` : `Tali lurus sudah ditarik di ujung ${benda} bertanda. Ketuk tiap ${benda} yang ujungnya kena tali.`;
      return `Tali lurus sudah ditarik di ujung ${benda} bertanda. Ketuk tiap ${benda} yang ujungnya kena tali. Berapa yang sama tinggi? ${akhir}`;
    case "perantara":
      if (rupa === "lambang") return `Bacalah hubungan antarbenda. Berapa benda yang ${KATA_HUB[l.tanya]}? ${akhir}`;
      return cara === "kanvas"
        ? `Tali sepanjang ${benda} bertanda dibawa ke tiap ${benda}. Beri tanda pada tiap ${benda} yang ${KATA_HUB[l.tanya]}. ${akhir}`
        : `Bawa tali sepanjang ${benda} bertanda ke tiap ${benda}. Ketuk satu per satu. Berapa yang ${KATA_HUB[l.tanya]}? ${akhir}`;
    case "tangga":
      if (rupa === "lambang") return l.tanya === "banyak" ? `Berapa benda yang disusun menjadi tangga? ${akhir}` : `Susun tangga dalam pikiranmu, ${l.arah === "naik" ? "dari yang paling pendek" : "dari yang paling tinggi"}. Benda ${hurufDari(l.acuan)} ada di urutan ke berapa? ${akhir}`;
      if (cara === "kanvas") return `Susun tangga dalam pikiranmu, ${l.arah === "naik" ? "dari yang paling pendek" : "dari yang paling tinggi"}. Lingkari ${benda} yang menjadi anak tangga pertama. ${akhir}`;
      return `Pindahkan tiap ${benda} menjadi tangga, ${l.arah === "naik" ? "dari yang paling pendek" : "dari yang paling tinggi"}. ${l.tanya === "banyak" ? "Berapa benda di tangga?" : "Benda bertanda ada di urutan ke berapa?"} ${akhir}`;
  }
}

/* ------------------------------ Petunjuk saat jawaban bilangan salah (menunjuk kesalahannya, tanpa digit) ------------------------------ */
export function petunjukSalah(l: Langkah, m: number): string {
  if (l.tipe === "salah") {
    if (l.jawabTokoh !== undefined && m === l.jawabTokoh) return `Itu jawaban ${l.tokoh} yang keliru. ${l.keliru}`;
    return petunjukSalah(l.dasar, m);
  }
  const k = kunciLangkah(l) ?? 0;
  switch (l.tipe) {
    case "banding":
      return m < k ? "Masih ada benda yang tingginya melewati benda bertanda dan belum terhitung. Lihat dari garis awal lagi." : "Ada benda yang ikut terhitung padahal tidak melewati benda bertanda. Benda bertanda sendiri jangan dihitung.";
    case "langsung":
      return m < k ? "Masih ada benda yang ujungnya kena tali tetapi belum terhitung." : "Hanya benda yang ujungnya kena tali yang sama tinggi. Benda bertanda sendiri jangan dihitung.";
    case "perantara":
      return m < k ? `Masih ada benda yang ${KATA_HUB[l.tanya]} dan belum terhitung. Bandingkan lagi dengan tali.` : `Ada benda yang ikut terhitung padahal tidak ${KATA_HUB[l.tanya]}. Cek lagi dengan tali.`;
    case "tangga":
      if (l.tanya === "banyak") return "Hitung semua benda di tangga satu per satu, jangan ada yang terlewat.";
      return m < k ? "Ada benda sebelum benda bertanda yang belum terhitung. Mulai dari ujung tangga." : "Benda bertanda baru muncul sesudah benda yang lebih dekat ke ujung. Hitung dari ujung tangga.";
  }
}

/* ------------------------------ Simulasi Meja Tukang ------------------------------ */
export type TiangSim = { id: string; nama: string; panjang: number; alas: number };
export type ModeTukang = "sejajar" | "banding" | "tali" | "tangga";
export type KeadaanTukang = {
  alat: "tukang";
  mode: ModeTukang;
  /** Alas tiang (bata) sudah dibuang: semua tiang berdiri di garis awal yang sama. */
  sejajar: boolean;
  /** Dua tiang yang dibandingkan langsung. */
  dipilih: number[];
  /** Banyak perbandingan langsung yang tuntas (tiang berdiri di garis awal sama), dan yang tuntas dengan tiang sama tinggi. */
  bandingTuntas: number;
  samaTuntas: number;
  /** Tiang yang jadi acuan tali, dan tiang yang sudah dibandingkan dengan tali itu. */
  tali: number | null;
  diperiksa: number[];
  /** Tiang yang sudah dipindahkan ke tangga, berurutan. */
  susunan: number[];
  urutNaik: boolean;
  urutTurun: boolean;
};

export const awalTukang = (): KeadaanTukang => ({ alat: "tukang", mode: "sejajar", sejajar: false, dipilih: [], bandingTuntas: 0, samaTuntas: 0, tali: null, diperiksa: [], susunan: [], urutNaik: false, urutTurun: false });
export const pilihModeTukang = (k: KeadaanTukang, mode: ModeTukang): KeadaanTukang => ({ ...k, mode });
/** Buang semua alas: semua tiang berdiri di garis awal yang sama. */
export const luruskan = (k: KeadaanTukang): KeadaanTukang => ({ ...k, sejajar: true });
/** Puncak tiang yang tampak (panjang ditambah alas, bila alas masih ada). */
export const puncakTampak = (t: TiangSim, sejajar: boolean): number => t.panjang + (sejajar ? 0 : t.alas);

export type HasilBanding = { a: number; b: number; hasil: "lebih" | "sama"; lebihTinggi: number | null; tuntas: boolean };
/** Pilih tiang untuk dibandingkan. Pilihan ketiga memulai lagi. Banding hanya dihitung tuntas bila tiang sudah berdiri di garis awal sama. */
export function pilihBanding(k: KeadaanTukang, i: number, d: readonly TiangSim[]): { k: KeadaanTukang; hasil: HasilBanding | null } {
  if (k.dipilih.length !== 1) return { k: { ...k, dipilih: [i] }, hasil: null };
  if (k.dipilih[0] === i) return { k: { ...k, dipilih: [] }, hasil: null };
  const a = k.dipilih[0];
  const sama = d[a].panjang === d[i].panjang;
  const lebihTinggi = sama ? null : d[a].panjang > d[i].panjang ? a : i;
  const tuntas = k.sejajar;
  return {
    k: { ...k, dipilih: [a, i], bandingTuntas: tuntas ? k.bandingTuntas + 1 : k.bandingTuntas, samaTuntas: tuntas && sama ? k.samaTuntas + 1 : k.samaTuntas },
    hasil: { a, b: i, hasil: sama ? "sama" : "lebih", lebihTinggi, tuntas },
  };
}
/** Pilih tiang sebagai acuan tali. Mengganti acuan menghapus perbandingan yang lama. */
export const ambilTali = (k: KeadaanTukang, i: number): KeadaanTukang => (k.tali === i ? k : { ...k, tali: i, diperiksa: [] });
/** Bawa tali ke satu tiang lain. */
export function periksaTali(k: KeadaanTukang, i: number, d: readonly TiangSim[]): { k: KeadaanTukang; hasil: Hubungan | null } {
  if (k.tali === null || i === k.tali) return { k, hasil: null };
  const hasil = hubungan(d[i].panjang, d[k.tali].panjang);
  return { k: k.diperiksa.includes(i) ? k : { ...k, diperiksa: [...k.diperiksa, i] }, hasil };
}
/** Pindahkan satu tiang ke tangga. Saat semua sudah dipindahkan, urutannya diperiksa (tiang sama tinggi boleh bertukar). */
export function taruhTangga(k: KeadaanTukang, i: number, d: readonly TiangSim[]): KeadaanTukang {
  if (k.susunan.includes(i) || i < 0 || i >= d.length) return k;
  const susunan = [...k.susunan, i];
  if (susunan.length < d.length) return { ...k, susunan };
  const v = susunan.map((x) => d[x].panjang);
  const naik = v.every((x, j) => j === 0 || v[j - 1] <= x);
  const turun = v.every((x, j) => j === 0 || v[j - 1] >= x);
  return { ...k, susunan, urutNaik: k.urutNaik || naik, urutTurun: k.urutTurun || turun };
}
export const ulangTangga = (k: KeadaanTukang): KeadaanTukang => ({ ...k, susunan: [] });
/** Susunan lengkap sekarang berurutan naik, turun, atau belum urut. */
export function arahSusunan(k: KeadaanTukang, d: readonly TiangSim[]): ArahTangga | null {
  if (k.susunan.length < d.length) return null;
  const v = k.susunan.map((x) => d[x].panjang);
  if (v.every((x, j) => j === 0 || v[j - 1] <= x)) return "naik";
  if (v.every((x, j) => j === 0 || v[j - 1] >= x)) return "turun";
  return null;
}
/** Mulai lagi dari awal (misi yang sudah tercapai tetap tercatat di laporMisi). */
export const mulaiLagi = (): KeadaanTukang => awalTukang();

/** Kalimat keadaan untuk suara (tanpa digit). */
export function kalimatTukang(k: KeadaanTukang, d: readonly TiangSim[]): string {
  if (k.mode === "sejajar") return k.sejajar ? "Semua tiang berdiri di garis awal yang sama. Sekarang ujungnya bisa dibandingkan." : "Ada tiang yang berdiri di atas bata. Tekan Luruskan di garis awal.";
  if (k.mode === "banding") {
    if (k.dipilih.length < 2) return k.dipilih.length === 1 ? "Ketuk satu tiang lagi." : "Ketuk dua tiang untuk dibandingkan.";
    const [a, b] = k.dipilih;
    if (!k.sejajar) return "Tiangnya belum di garis awal yang sama, jadi belum bisa dibandingkan. Luruskan dulu.";
    if (d[a].panjang === d[b].panjang) return `${d[a].nama} dan ${d[b].nama} sama tinggi.`;
    const [t, p] = d[a].panjang > d[b].panjang ? [a, b] : [b, a];
    return `${d[t].nama} lebih tinggi. ${d[p].nama} lebih pendek.`;
  }
  if (k.mode === "tali") {
    if (k.tali === null) return "Ketuk satu tiang untuk diambil panjangnya dengan tali.";
    return k.diperiksa.length === 0 ? `Tali sepanjang tiang ${d[k.tali].nama}. Ketuk tiang lain untuk dibandingkan dengan tali.` : `Sudah ${kata(k.diperiksa.length)} tiang dibandingkan dengan tali.`;
  }
  if (k.susunan.length < d.length) return `Sudah ${kata(k.susunan.length)} tiang di tangga.`;
  const a = arahSusunan(k, d);
  return a === "naik" ? "Tangga urut dari yang paling pendek." : a === "turun" ? "Tangga urut dari yang paling tinggi." : "Tangga belum urut. Tekan Ulang tangga.";
}
