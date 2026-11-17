/**
 * Logika murni Kelas 1 Bab 8 Sub-Bab A "Kotak Cerita Berantakan" (memilah benda, turus, tabel, paling banyak, paling sedikit, selisih,
 * dan jumlah semuanya), awal cerita Perpustakaan Keliling, untuk tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-pustaka-k1b8a.mjs. Banyak tiap jenis paling besar sembilan dan jumlah semuanya
 * paling besar delapan belas. Kata bilangan memakai ulang Bab 5 Sub-Bab A.
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { acak, kata } from "../ikan-k1b5a/logika";

export { acak, cocok, cocokKelompok, kelompokLabel, labelDari, IKON_CARA, NAMA_CARA, URUT_CARA, type Cara, type Label, type Tempat } from "../lemari-k1b1a/logika";
export { kata } from "../ikan-k1b5a/logika";

export type Metode = "igil" | "lingkaran" | "pasang" | "tabel";
export const URUT_METODE: Metode[] = ["igil", "lingkaran", "pasang", "tabel"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Pilah dan Turus",
  lingkaran: "Sorting Hoops: lingkaran pilah",
  pasang: "One-to-One Matching: pasangkan satu-satu",
  tabel: "Frequency Table: tabel frekuensi",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F4DD}", lingkaran: "\u{1F7E2}", pasang: "\u{1F91D}", tabel: "\u{1F4CA}" };

export type Rupa = "benda" | "diagram" | "lambang";
/** Yang dicari dari data: banyak satu jenis, yang paling banyak, yang paling sedikit, jumlah semuanya, atau selisih dua jenis. */
export type Tanya = { t: "jenis"; j: number } | { t: "terbanyak" } | { t: "tersedikit" } | { t: "jumlah" } | { t: "selisih"; a: number; b: number };
export const BATAS_JENIS = 9;
export const BATAS_JUMLAH = 18;

/* ------------------------------ Langkah soal ------------------------------ */
/** Metode IGIL: benda berbagai jenis bercampur di tumpukan. Hitung satu jenis (`j`) dengan satu goresan tiap benda. Jawab: banyak benda jenis itu. */
export type LangkahTurus = { tipe: "turus"; set: string; isi: number[]; j: number; benih: number };
/** Sorting Hoops: pindahkan benda ke lingkaran jenisnya (Klik), atau baca lingkaran yang sudah terisi. `lingkari`: lingkaran yang harus dilingkari (Kanvas). */
export type LangkahLingkaran = { tipe: "lingkaran"; set: string; isi: number[]; tanya: Tanya; benih: number; lingkari?: "terbanyak" | "tersedikit" };
/** One-to-One Matching: dua jenis dipasangkan satu-satu. Jawab (bila `angka`): selisih, yaitu benda yang tidak punya pasangan; bila tidak, cukup menandai yang tidak berpasangan. */
export type LangkahPasang = { tipe: "pasang"; set: string; isi: [number, number]; angka: boolean; benih: number };
/** Frequency Table: benda muncul satu per satu, beri satu goresan di baris jenisnya (Klik), atau baca tabel yang sudah terisi. */
export type LangkahTabel = { tipe: "tabel"; set: string; isi: number[]; tanya: Tanya; benih: number; lingkari?: "terbanyak" | "tersedikit" };
export type LangkahDasar = LangkahTurus | LangkahLingkaran | LangkahPasang | LangkahTabel;
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
  return d.tipe === "turus" ? "igil" : d.tipe === "lingkaran" ? "lingkaran" : d.tipe === "pasang" ? "pasang" : "tabel";
}

/* ------------------------------ Hitungan ------------------------------ */
export const jumlahSemua = (isi: readonly number[]): number => isi.reduce((a, b) => a + b, 0);
/** Nomor jenis yang paling banyak (yang pertama bila kembar) dan yang paling sedikit. */
export const indeksTerbanyak = (isi: readonly number[]): number => isi.indexOf(Math.max(...isi));
export const indeksTersedikit = (isi: readonly number[]): number => isi.indexOf(Math.min(...isi));
/** Hanya satu jenis yang paling banyak (atau paling sedikit): syarat soal yang meminta melingkari. */
export const terbanyakTunggal = (isi: readonly number[]): boolean => isi.filter((v) => v === Math.max(...isi)).length === 1;
export const tersedikitTunggal = (isi: readonly number[]): boolean => isi.filter((v) => v === Math.min(...isi)).length === 1;

export function kunciTanya(isi: readonly number[], t: Tanya): number {
  switch (t.t) {
    case "jenis":
      return isi[t.j];
    case "terbanyak":
      return Math.max(...isi);
    case "tersedikit":
      return Math.min(...isi);
    case "jumlah":
      return jumlahSemua(isi);
    case "selisih":
      return Math.abs(isi[t.a] - isi[t.b]);
  }
}

/** Kunci tiap langkah, dihitung dari datanya. Null bila soalnya hanya menandai benda tanpa angka jawaban. */
export function kunciLangkah(l: Langkah): number | null {
  switch (l.tipe) {
    case "salah":
      return kunciLangkah(l.dasar);
    case "turus":
      return l.isi[l.j];
    case "lingkaran":
    case "tabel":
      return kunciTanya(l.isi, l.tanya);
    case "pasang":
      return l.angka ? Math.abs(l.isi[0] - l.isi[1]) : null;
  }
}
export const angkaJawab = kunciLangkah;

/** Tanya yang dijawab tiap langkah (untuk kalimat pertanyaan). */
export function tanyaDari(l: LangkahDasar): Tanya {
  if (l.tipe === "turus") return { t: "jenis", j: l.j };
  if (l.tipe === "pasang") return { t: "selisih", a: 0, b: 1 };
  return l.tanya;
}

/** Tiga pilihan di sekitar kunci (nol sampai delapan belas), memuat jawaban tokoh bila ada. */
export function pilihanDari(l: Langkah): number[] {
  const k = kunciLangkah(l) ?? 0;
  const ada: number[] = [k];
  if (l.tipe === "salah" && l.jawabTokoh !== undefined && !ada.includes(l.jawabTokoh)) ada.push(l.jawabTokoh);
  for (const c of [k - 1, k + 1, k + 2, k - 2]) if (ada.length < 3 && c >= 0 && c <= BATAS_JUMLAH && !ada.includes(c)) ada.push(c);
  for (let n = 0; ada.length < 3 && n <= BATAS_JUMLAH; n += 1) if (!ada.includes(n)) ada.push(n);
  return ada.sort((p, q) => p - q);
}

/** Urutan jenis benda yang bercampur: tiap jenis j muncul isi[j] kali, diacak tetap menurut `benih`. */
export function urutanCampur(isi: readonly number[], benih: number): number[] {
  return acak(isi.flatMap((n, j) => Array.from({ length: n }, () => j)), benih);
}

/* ------------------------------ Kalimat untuk Abstract dan jawaban ------------------------------ */
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

/** Goresan turus sebagai tulisan: tiap lima goresan satu coretan miring ("||||/"), sisanya tegak. */
export function turusTeks(n: number): string {
  const kelompok = Array.from({ length: Math.floor(n / 5) }, () => "||||/");
  return [...kelompok, ...(n % 5 > 0 ? ["|".repeat(n % 5)] : [])].join(" ") || "-";
}

/** Kalimat yang menjelaskan jawaban benar (tanpa digit). */
export function kalimatKunci(l: LangkahDasar): string {
  const k = kunciLangkah(l);
  switch (l.tipe) {
    case "turus":
      return `Setiap benda sejenis diberi satu goresan, jadi ada ${kata(l.isi[l.j])} benda.`;
    case "lingkaran":
    case "tabel": {
      const n = kunciTanya(l.isi, l.tanya);
      if (l.tanya.t === "jumlah") return `Semua jenis dijumlahkan, jadi semuanya ada ${kata(n)}.`;
      if (l.tanya.t === "selisih") return `Kurangkan yang kecil dari yang besar, jadi selisihnya ${kata(n)}.`;
      if (l.tanya.t === "terbanyak") return `Jenis yang paling banyak ada ${kata(n)}.`;
      if (l.tanya.t === "tersedikit") return `Jenis yang paling sedikit ada ${kata(n)}.`;
      return `Jenis itu ada ${kata(n)}.`;
    }
    case "pasang":
      return k === null ? "Benda yang tidak punya pasangan sudah ditandai." : `Ada ${kata(k)} benda yang tidak punya pasangan, itulah selisihnya.`;
  }
}

/* ------------------------------ Instruksi (templat, tanpa digit) ------------------------------ */
const AKHIR: Record<Cara, string> = { klik: "Lalu pilih jawabannya.", kanvas: "Lalu tulis angkanya di kanvas.", suara: "Lalu ucapkan jawabannya." };

/** Kalimat pertanyaan untuk sebuah Tanya. `nama`: nama tiap jenis (benda, bentuk, atau kata). */
export function kalimatTanya(t: Tanya, nama: readonly string[]): string {
  switch (t.t) {
    case "jenis":
      return `Berapa banyak ${nama[t.j]}?`;
    case "terbanyak":
      return "Jenis yang paling banyak ada berapa?";
    case "tersedikit":
      return "Jenis yang paling sedikit ada berapa?";
    case "jumlah":
      return "Berapa jumlah semuanya?";
    case "selisih":
      return `Berapa selisih ${nama[t.a]} dan ${nama[t.b]}?`;
  }
}

/** Ganti kata "benda" pada teks layar menurut rupa: Pictorial menyebut "bentuk", Abstract menyebut "isi". */
export function sesuaikan(t: string, rupa: Rupa): string {
  if (rupa === "benda") return t;
  const pengganti = rupa === "diagram" ? "entuk" : "si";
  return t.replace(/([Bb])enda/g, (_m, c: string) => (rupa === "diagram" ? c : c === "B" ? "I" : "i") + pengganti);
}

export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, nama: readonly string[]): string {
  return sesuaikan(instruksiMentah(l, rupa, cara, nama), rupa);
}

function instruksiMentah(l: Langkah, rupa: Rupa, cara: Cara, nama: readonly string[]): string {
  const akhir = AKHIR[cara];
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu pilih jawaban yang benar.`;
  const benda = rupa === "diagram" ? "bentuk" : "benda";
  const tanya = kalimatTanya(tanyaDari(l), nama);
  switch (l.tipe) {
    case "turus":
      if (rupa === "lambang") return `Bacalah turus tiap jenis. Lima goresan dicoret miring. ${tanya} ${akhir}`;
      if (cara === "suara") return `Lihat turus di papan. Tiap benda sudah diberi satu goresan. ${tanya} ${akhir}`;
      return cara === "kanvas"
        ? `Beri tanda pada tiap ${nama[l.j]} di tumpukan, satu tanda satu ${benda}. ${tanya} ${akhir}`
        : `Ketuk tiap ${nama[l.j]} di tumpukan. Satu ketukan, satu goresan turus. ${tanya} ${akhir}`;
    case "lingkaran":
      if (rupa === "lambang") return `Bacalah isi tiap lingkaran. ${tanya} ${akhir}`;
      if (cara === "suara") return `Lihat isi tiap lingkaran. ${tanya} ${akhir}`;
      if (cara === "kanvas") return `Lihat isi tiap lingkaran. Lingkari lingkaran yang ${l.lingkari === "tersedikit" ? "paling sedikit" : "paling banyak"} isinya. ${tanya} ${akhir}`;
      return `Pindahkan tiap ${benda} ke lingkaran jenisnya. ${tanya} ${akhir}`;
    case "pasang":
      if (rupa === "lambang") return l.angka ? `Bacalah banyak tiap jenis. Keduanya dipasangkan satu-satu. Berapa benda yang tidak punya pasangan? ${akhir}` : "Bacalah banyak tiap jenis. Keduanya dipasangkan satu-satu. Ketuk jenis yang punya benda tanpa pasangan.";
      if (cara === "suara") return `Lihat garis pasangan. Berapa ${benda} yang tidak punya pasangan? ${akhir}`;
      if (cara === "kanvas") return l.angka ? `Lihat garis pasangan. Beri tanda pada tiap ${benda} yang tidak punya pasangan. Berapa banyak? ${akhir}` : `Lihat garis pasangan. Beri tanda pada tiap ${benda} yang tidak punya pasangan.`;
      return l.angka ? `Pasangkan satu ${benda} dari tiap jenis, satu-satu. Berapa ${benda} yang tidak punya pasangan? ${akhir}` : `Pasangkan satu ${benda} dari tiap jenis, satu-satu. Lalu ketuk ${benda} yang tidak punya pasangan.`;
    case "tabel":
      if (rupa === "lambang") return `Bacalah tabel. ${tanya} ${akhir}`;
      if (cara === "suara") return `Lihat tabel frekuensi. ${tanya} ${akhir}`;
      if (cara === "kanvas") return `Lihat tabel frekuensi. Lingkari baris yang ${l.lingkari === "tersedikit" ? "paling sedikit" : "paling banyak"} goresannya. ${tanya} ${akhir}`;
      return `Lihat ${benda} yang muncul satu per satu. Beri satu goresan di baris jenisnya. ${tanya} ${akhir}`;
  }
}

/* ------------------------------ Petunjuk saat jawaban bilangan salah (menunjuk kesalahannya, tanpa digit) ------------------------------ */
export function petunjukSalah(l: Langkah, m: number): string {
  if (l.tipe === "salah") {
    if (l.jawabTokoh !== undefined && m === l.jawabTokoh) return `Itu jawaban ${l.tokoh} yang keliru. ${l.keliru}`;
    return petunjukSalah(l.dasar, m);
  }
  const k = kunciLangkah(l) ?? 0;
  const lebih = m > k;
  switch (l.tipe) {
    case "turus":
      return lebih ? "Ada benda yang ikut terhitung padahal bukan jenisnya, atau terhitung dua kali. Hitung goresannya lagi." : "Masih ada benda sejenis yang belum diberi goresan. Hitung goresannya lagi.";
    case "pasang":
      return m === l.isi[0] + l.isi[1] ? "Itu jumlah kedua jenis. Selisih adalah benda yang tidak punya pasangan." : lebih ? "Ada benda berpasangan yang ikut terhitung. Hitung hanya yang tidak punya pasangan." : "Masih ada benda tanpa pasangan yang belum terhitung.";
    case "lingkaran":
    case "tabel": {
      switch (l.tanya.t) {
        case "jumlah":
          return lebih ? "Jumlahnya terlalu banyak. Setiap jenis dijumlahkan sekali saja." : "Jumlahnya kurang. Ada jenis yang belum ikut dijumlahkan.";
        case "selisih":
          return m === l.isi[l.tanya.a] + l.isi[l.tanya.b] ? "Itu jumlah kedua jenis. Selisih adalah kurangnya yang kecil dari yang besar." : "Selisih adalah yang lebih banyak dikurangi yang lebih sedikit.";
        case "terbanyak":
          return m === jumlahSemua(l.isi) ? "Itu jumlah semuanya. Jawabannya banyak pada satu jenis yang paling banyak." : "Cari jenis yang isinya paling banyak, lalu baca banyaknya.";
        case "tersedikit":
          return m === jumlahSemua(l.isi) ? "Itu jumlah semuanya. Jawabannya banyak pada satu jenis yang paling sedikit." : "Cari jenis yang isinya paling sedikit, lalu baca banyaknya.";
        case "jenis":
          return lebih ? "Ada isi jenis lain yang ikut terhitung. Hitung hanya jenis yang ditanyakan." : "Masih ada isi jenis itu yang belum terhitung.";
      }
    }
  }
}

/* ------------------------------ Simulasi Meja Pilah ------------------------------ */
/** Benda di meja (berbeda dari Story): `jenis` adalah nomor jenisnya, juga nomor petak rak yang benar. */
export type BendaSim = { id: string; jenis: number };
export type ModeMeja = "pilah" | "turus" | "tabel" | "banding";
export type KeadaanMeja = {
  alat: "meja";
  mode: ModeMeja;
  /** Tempat tiap benda: -1 masih di meja, selain itu nomor petak rak. */
  tempat: number[];
  /** Semua benda sudah di rak jenisnya (sekali tercapai tetap tercatat). */
  terpilah: boolean;
  /** Petak rak yang turusnya sudah dihitung. */
  dihitung: number[];
  datar: boolean;
  pernahDatar: boolean;
  /** Dua jenis yang dibandingkan, banyak perbandingan yang tuntas (rak sudah rapi), dan yang tuntas dengan jenis sama banyak. */
  banding: number[];
  bandingTuntas: number;
  samaTuntas: number;
  jumlahDilihat: boolean;
};

export const awalMeja = (d: readonly BendaSim[]): KeadaanMeja => ({
  alat: "meja",
  mode: "pilah",
  tempat: d.map(() => -1),
  terpilah: false,
  dihitung: [],
  datar: false,
  pernahDatar: false,
  banding: [],
  bandingTuntas: 0,
  samaTuntas: 0,
  jumlahDilihat: false,
});
export const pilihModeMeja = (k: KeadaanMeja, mode: ModeMeja): KeadaanMeja => ({ ...k, mode });
export const banyakJenis = (d: readonly BendaSim[], j: number): number => d.filter((b) => b.jenis === j).length;
/** Banyak benda yang sudah berada di rak jenisnya sendiri. */
export const banyakDiRak = (k: KeadaanMeja, d: readonly BendaSim[], j: number): number => d.filter((b, i) => b.jenis === j && k.tempat[i] === j).length;
export const semuaTerpilah = (k: KeadaanMeja, d: readonly BendaSim[]): boolean => d.every((b, i) => k.tempat[i] === b.jenis);

/** Taruh benda ke-i di petak rak. Hanya petak jenisnya yang menerima; yang lain menolak dan keadaan tidak berubah. */
export function taruhDiRak(k: KeadaanMeja, i: number, petak: number, d: readonly BendaSim[]): { k: KeadaanMeja; ok: boolean } {
  if (i < 0 || i >= d.length || k.tempat[i] !== -1) return { k, ok: false };
  if (d[i].jenis !== petak) return { k, ok: false };
  const tempat = k.tempat.map((t, x) => (x === i ? petak : t));
  const baru = { ...k, tempat };
  return { k: { ...baru, terpilah: k.terpilah || semuaTerpilah(baru, d) }, ok: true };
}
/** Hitung turus satu rak. Rak kosong belum bisa dihitung. */
export function hitungRak(k: KeadaanMeja, petak: number, d: readonly BendaSim[]): KeadaanMeja {
  if (banyakDiRak(k, d, petak) === 0 || k.dihitung.includes(petak)) return k;
  return { ...k, dihitung: [...k.dihitung, petak] };
}
export const putarTabel = (k: KeadaanMeja): KeadaanMeja => ({ ...k, datar: !k.datar, pernahDatar: k.pernahDatar || !k.datar });
export const lihatJumlah = (k: KeadaanMeja): KeadaanMeja => ({ ...k, jumlahDilihat: true });

export type HasilBandingMeja = { a: number; b: number; hasil: "lebih" | "sama"; lebihBanyak: number | null; selisih: number; tuntas: boolean };
/** Pilih jenis untuk dibandingkan. Pilihan ketiga memulai lagi. Perbandingan hanya dihitung tuntas bila semua benda sudah rapi di rak. */
export function pilihBandingMeja(k: KeadaanMeja, j: number, d: readonly BendaSim[]): { k: KeadaanMeja; hasil: HasilBandingMeja | null } {
  if (k.banding.length !== 1) return { k: { ...k, banding: [j] }, hasil: null };
  if (k.banding[0] === j) return { k: { ...k, banding: [] }, hasil: null };
  const a = k.banding[0];
  const na = banyakJenis(d, a);
  const nb = banyakJenis(d, j);
  const tuntas = semuaTerpilah(k, d);
  const sama = na === nb;
  return {
    k: { ...k, banding: [a, j], bandingTuntas: tuntas ? k.bandingTuntas + 1 : k.bandingTuntas, samaTuntas: tuntas && sama ? k.samaTuntas + 1 : k.samaTuntas },
    hasil: { a, b: j, hasil: sama ? "sama" : "lebih", lebihBanyak: sama ? null : na > nb ? a : j, selisih: Math.abs(na - nb), tuntas },
  };
}
export const mulaiLagiMeja = (d: readonly BendaSim[]): KeadaanMeja => awalMeja(d);

/** Kalimat keadaan untuk suara (tanpa digit). `nama`: nama tiap jenis. */
export function kalimatMeja(k: KeadaanMeja, d: readonly BendaSim[], nama: readonly string[]): string {
  const sisa = k.tempat.filter((t) => t === -1).length;
  if (k.mode === "pilah") return sisa === 0 ? "Semua benda sudah rapi di rak menurut jenisnya." : `Masih ada ${kata(sisa)} benda di meja. Ketuk satu benda, lalu ketuk rak jenisnya.`;
  if (k.mode === "turus") return k.dihitung.length === 0 ? "Ketuk satu rak untuk menghitung turusnya." : `Sudah ${kata(k.dihitung.length)} rak yang turusnya dihitung.`;
  if (k.mode === "tabel") return k.datar ? "Tabel sekarang mendatar. Isinya sama." : "Tabel menurun: tiap baris satu jenis. Tekan Putar tabel untuk membuatnya mendatar.";
  if (k.banding.length < 2) return k.banding.length === 1 ? "Ketuk satu jenis lagi." : "Ketuk dua jenis untuk dibandingkan.";
  const [a, b] = k.banding;
  if (!semuaTerpilah(k, d)) return "Rak belum rapi, jadi belum bisa dibandingkan. Pilah dulu semua benda.";
  const na = banyakJenis(d, a);
  const nb = banyakJenis(d, b);
  if (na === nb) return `${besar(nama[a])} dan ${nama[b]} sama banyak.`;
  const [t, s] = na > nb ? [a, b] : [b, a];
  return `${besar(nama[t])} lebih banyak. ${besar(nama[s])} lebih sedikit. Selisihnya ${kata(Math.abs(na - nb))}.`;
}
