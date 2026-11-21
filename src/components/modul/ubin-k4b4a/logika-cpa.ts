/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 4 Sub-Bab A "Lantai Ubin Bu Sinta" (pengukuran luas: satuan baku, menutup lantai dengan ubin, baris kali kolom, meter persegi dan sentimeter persegi):
 * jenis tugas, jawaban benar, pilihan, instruksi (tanpa digit), petunjuk salah, dan geometri gambar (ubin dalam kisi). Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-ubin-k4b4a.mjs.
 * Jawaban beragam: memilih luas atau satuan (klik), menulis satu angka di kanvas, dan mengucapkan satu kata atau satu bilangan (rekam suara dengan pilihan ketuk).
 * Jawaban benar dihitung dari data. Empat metode tiap misi: IGIL "Tutup Lantai, Baris dan Kolom, Tangga Satuan" (satuan dan susunan lantai), Cover the Floor (Tutup Lantai),
 * Rows and Columns (Baris dan Kolom), Unit Square Ladder (Tangga Satuan).
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { ejaK4B4, kataBilK4B4 } from "../eja-k4b4";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

/* ------------------------------ Bilangan, satuan, dan kata ------------------------------ */
/** Nama bilangan dalam kata (tanpa digit): dua belas, sepuluh ribu. */
export const kataBil = (n: number): string => kataBilK4B4(n);
export const kata = kataBil;
/** Angka, satuan, dan tanda menjadi ucapan tanpa digit: "12 cm²" menjadi "dua belas sentimeter persegi". */
export const ucapkan = (t: string): string => ejaK4B4(t).replace(/\s+/g, " ").trim();
/** Bilangan dengan titik ribuan: 10000 menjadi "10.000". */
export const teksRibu = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export type Satuan = "cm²" | "m²";
/** Satu ubin bersisi satu sentimeter atau satu meter; luasnya satu cm² atau satu m². Satuan panjang sisinya: cm atau m. */
export const satuanPanjang = (u: Satuan): string => (u === "cm²" ? "cm" : "m");
export const satuanLain = (u: Satuan): Satuan => (u === "cm²" ? "m²" : "cm²");
export const kataSatuan = (u: Satuan): string => (u === "cm²" ? "sentimeter persegi" : "meter persegi");
export const kataPanjang = (u: Satuan): string => (u === "cm²" ? "sentimeter" : "meter");
export const KALI_RIBU = 10000;

/** Lantai berpetak b baris dan k kolom ubin; tiap ubin satu `u`. */
export type Kisi = { b: number; k: number; u: Satuan };
export const luas = (g: Kisi): number => g.b * g.k;
export const teksLuas = (n: number, u: Satuan): string => `${n} ${u}`;

/* ------------------------------ Geometri gambar (diuji) ------------------------------ */
/** Sisi satu ubin dalam kisi: sama untuk semua ubin, kisi muat di daerah lebar x tinggi, paling besar `maks`. */
export function sisiUbin(b: number, k: number, lebar: number, tinggi: number, maks: number): number {
  return Math.min(maks, Math.floor(lebar / Math.max(k, 1)), Math.floor(tinggi / Math.max(b, 1)));
}
/** Semua ubin kisi baris demi baris dari kiri-atas: ubin ke-i berada di baris floor(i / k) dan kolom i mod k; `terpasang` bila i < jumlah yang sudah dipasang. */
export function selKisi(b: number, k: number, terpasang: number): { i: number; baris: number; kolom: number; terpasang: boolean }[] {
  return Array.from({ length: b * k }, (_, i) => ({ i, baris: Math.floor(i / k), kolom: i % k, terpasang: i < terpasang }));
}
/** Pojok kiri-atas kisi: rata di tengah daerah [x0, x0 + lebar] mendatar, mulai tinggi y0. */
export function pojokKisi(k: number, sisi: number, x0: number, lebar: number, y0: number): { x: number; y: number } {
  return { x: x0 + (lebar - k * sisi) / 2, y: y0 };
}

/* ------------------------------ Bangun dari persegi satuan (diuji) ------------------------------ */
/**
 * Bangun pada kisi persegi satuan ditulis sebagai baris-baris teks: "X" persegi satuan yang sudah ada, "o" persegi satuan yang belum digambar (garis putus-putus), "." kosong.
 * Semua baris sama panjang. Luas bangun = banyak "X" (dan "o" bila sudah digambar).
 */
export type Bangun = string[];
const hitungHuruf = (m: Bangun, h: string): number => m.join("").split("").filter((c) => c === h).length;
export const hitungX = (m: Bangun): number => hitungHuruf(m, "X");
export const hitungO = (m: Bangun): number => hitungHuruf(m, "o");
export const lebarBangun = (m: Bangun): number => Math.max(0, ...m.map((r) => r.length));
/** Luas bidang pembatas bangun (baris kali kolom terbesar): jebakan bila dikira luas bangun. */
export const bidangBangun = (m: Bangun): number => m.length * lebarBangun(m);
/** Banyak persegi satuan "X" pada tiap baris. */
export const perBaris = (m: Bangun): number[] => m.map((r) => r.split("").filter((c) => c === "X").length);
/** Sisi satu persegi satuan pada bangun: muat di daerah lebar x tinggi, paling besar `maks`. */
export const sisiBangun = (m: Bangun, lebar: number, tinggi: number, maks: number): number => Math.min(maks, Math.floor(lebar / Math.max(lebarBangun(m), 1)), Math.floor(tinggi / Math.max(m.length, 1)));
/** Dua bangun yang dibandingkan memakai SATU sisi persegi satuan yang sama (yang terkecil), supaya luas dinilai dari banyak persegi satuan. */
export const sisiBersama = (a: Bangun, b: Bangun, lebar: number, tinggi: number, maks: number): number => Math.min(sisiBangun(a, lebar, tinggi, maks), sisiBangun(b, lebar, tinggi, maks));
/** Sel bangun baris demi baris: hanya "X" dan "o" yang digambar. */
export function selBangun(m: Bangun): { baris: number; kolom: number; ada: boolean }[] {
  return m.flatMap((r, baris) => r.split("").flatMap((c, kolom) => (c === "X" || c === "o" ? [{ baris, kolom, ada: c === "X" }] : [])));
}
/** Ubin acuan untuk menduga luas: dua baris dua kolom, empat satuan. */
export const ACUAN = { b: 2, k: 2 };

/* ------------------------------ Jenis tugas ------------------------------ */
/** Metode IGIL, satuan baku: satuan yang ukurannya sama untuk semua orang disebut satuan baku (suara = baku). */
export type LSatuan = { tipe: "satuan"; g: Kisi };
/**
 * Metode IGIL, satuan tidak baku (uang kertas dan kertas origami, atau lembar kecil dan lembar besar): permukaan yang sama ditutup `r` baris dan `k` kolom satuan besar,
 * dan satu satuan besar sama dengan dua satuan kecil. `nama` = [satuan kecil, satuan besar]. klik = luas dalam satuan kecil, kanvas = banyak satuan besar.
 */
export type LTidakBaku = { tipe: "tidakbaku"; r: number; k: number; nama: [string, string] };
/**
 * Cover the Floor (Tutup Lantai), bangun dari persegi satuan: klik = luas bangun B (berbeda bentuk dari bangun A tetapi luasnya sama), kanvas = persegi satuan yang belum digambar
 * (huruf "o") pada bangun yang luasnya ditentukan, suara = luas kedua bangun sama atau beda.
 */
export type LBangun = { tipe: "bangun"; a: Bangun; b: Bangun; u: Satuan };
/** Rows and Columns (Baris dan Kolom): klik = luas dengan satuan, kanvas = luas satu angka, suara = kata kali. `duga`: duga dulu dari ubin acuan, lalu periksa dengan baris kali kolom. */
export type LBaris = { tipe: "baris"; g: Kisi; duga?: boolean; benda?: string };
/** Unit Square Ladder (Tangga Satuan): `m` meter persegi sama dengan `m` kali sepuluh ribu sentimeter persegi. klik = hasil perubahan sesuai arah, kanvas = banyak meter persegi dari luas sentimeter persegi, suara = lebih banyak atau lebih sedikit. */
export type LTangga = { tipe: "tangga"; m: number; arah: "turun" | "naik" };
export type LangkahDasar = LSatuan | LTidakBaku | LBangun | LBaris | LTangga;
/** Cari kesalahan: tokoh sudah menjawab dari `dasar` (klik). Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. `jawabTokoh` adalah teks pilihan klik tokoh. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LBaris | LTangga;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "tutup" | "baris" | "tangga";
export const URUT_METODE: Metode[] = ["igil", "tutup", "baris", "tangga"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Tutup Lantai, Baris dan Kolom, Tangga Satuan",
  tutup: "Cover the Floor: Tutup Lantai",
  baris: "Rows and Columns: Baris dan Kolom",
  tangga: "Unit Square Ladder: Tangga Satuan",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F3CA}", tutup: "\u{1F9F1}", baris: "\u{1F4CA}", tangga: "\u{1F4F6}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", tutup: "Cover the Floor", baris: "Rows and Columns", tangga: "Unit Square Ladder" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/** Hasil perubahan tangga dalam cm² (meter persegi ke sentimeter persegi). */
export const sentiDari = (m: number): number => m * KALI_RIBU;
/** Banyak satuan besar yang menutupi permukaan tidak baku, dan banyak satuan kecil (dua kali lipat). */
export const besarTB = (l: LTidakBaku): number => l.r * l.k;
export const kecilTB = (l: LTidakBaku): number => 2 * l.r * l.k;

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari data. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "satuan":
      return cara === "klik" ? nama(teksLuas(1, l.g.u)) : cara === "kanvas" ? angka(l.g.b) : nama("baku");
    case "tidakbaku":
      return cara === "klik" ? nama(`${kecilTB(l)} ${l.nama[0]}`) : cara === "kanvas" ? angka(besarTB(l)) : nama("beda");
    case "bangun":
      return cara === "klik" ? nama(teksLuas(hitungX(l.b), l.u)) : cara === "kanvas" ? angka(hitungO(l.b)) : nama(hitungX(l.a) === hitungX(l.b) ? "sama" : "beda");
    case "baris":
      return cara === "klik" ? nama(teksLuas(luas(l.g), l.g.u)) : cara === "kanvas" ? angka(luas(l.g)) : nama("kali");
    case "tangga":
      return cara === "klik" ? nama(l.arah === "turun" ? `${teksRibu(sentiDari(l.m))} cm²` : `${l.m} m²`) : cara === "kanvas" ? angka(l.m) : nama(l.arah === "turun" ? "banyak" : "sedikit");
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
const unik = <T,>(daftar: T[], buang: T[]): T[] => daftar.filter((x, i, a) => !buang.includes(x) && a.indexOf(x) === i);

/** Tiga pilihan untuk tugas klik: jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k || k.jenis !== "nama") return [];
  const d = dasarDari(l);
  switch (d.tipe) {
    case "satuan": {
      const lain = [`1 ${satuanPanjang(d.g.u)}`, teksLuas(1, satuanLain(d.g.u))];
      return sisipkan(k.nama, lain, d.g.b + d.g.k);
    }
    case "tidakbaku": {
      const lain = [`${besarTB(d)} ${d.nama[0]}`, `${kecilTB(d)} ${d.nama[1]}`];
      return sisipkan(k.nama, lain, d.r + d.k);
    }
    case "bangun": {
      const n = hitungX(d.b);
      const calon = [bidangBangun(d.b), n - 1, n + 1, n + 2].filter((x) => x >= 1 && x !== n).map((x) => teksLuas(x, d.u));
      return sisipkan(k.nama, unik(calon, [k.nama]).slice(0, 2), n + d.b.length);
    }
    case "baris": {
      const L = luas(d.g);
      const lain = [teksLuas(d.g.b + d.g.k, d.g.u), `${L} ${satuanPanjang(d.g.u)}`];
      return sisipkan(k.nama, lain, L + d.g.b);
    }
    case "tangga": {
      const lain =
        d.arah === "turun"
          ? [`${teksRibu(d.m * 100)} cm²`, `${teksRibu(d.m * 1000)} cm²`]
          : [`${d.m * 10} m²`, `${d.m * 100} m²`];
      return sisipkan(k.nama, lain, d.m);
    }
  }
}
/** Pilihan cadangan untuk tugas suara (kata atau bilangan dalam kata). Jawaban benar tidak pernah di tempat pertama. */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  if (cara !== "suara") return [];
  const k = kunciJawab(l, cara);
  if (!k) return [];
  const d = dasarDari(l);
  if (k.jenis === "angka") {
    const n = k.n;
    const lain = unik([n - 1, n + 1, n - 2, n + 2].filter((x) => x >= 1 && x <= 9), [n]).slice(0, 2).map(kataBil);
    return sisipkan(kataBil(n), lain, n + d.tipe.length);
  }
  const semua: string[] =
    d.tipe === "satuan" ? ["baku", "besar", "kecil"] : d.tipe === "baris" ? ["kali", "tambah", "kurang"] : d.tipe === "bangun" ? ["sama", "beda", "mirip"] : d.tipe === "tidakbaku" ? ["beda", "sama", "mirip"] : ["banyak", "sedikit", "sama"];
  const geser = d.tipe === "tangga" ? d.m : d.tipe === "tidakbaku" ? d.r + d.k : d.tipe === "bangun" ? hitungX(d.b) : luas(d.g);
  return sisipkan(k.nama, unik(semua, [k.nama]), geser);
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));
/** Teks pilihan klik yang benar. */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  return k && k.jenis === "nama" ? k.nama : null;
}

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : "gambar");

/** Kalimat pembenaran setelah jawaban benar (diawali huruf kapital, netral terhadap rupa: tanpa menyebut gambar, petak, atau kisi). */
export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "satuan":
      return cara === "klik"
        ? `Ubin bersisi 1 ${satuanPanjang(d.g.u)} luasnya 1 ${d.g.u}.`
        : cara === "kanvas"
          ? `Lantai ini terdiri dari ${d.g.b} baris ubin.`
          : "Satuan yang ukurannya sama untuk semua orang disebut satuan baku.";
    case "tidakbaku":
      return cara === "klik"
        ? `Satu ${d.nama[1]} sama dengan 2 ${d.nama[0]}, jadi permukaan itu luasnya ${kecilTB(d)} ${d.nama[0]}.`
        : cara === "kanvas"
          ? `Permukaan itu ditutup ${besarTB(d)} ${d.nama[1]}, sedangkan satuan kecil memberi bilangan yang lebih besar.`
          : "Satuan yang ukurannya berbeda memberi hasil yang berbeda.";
    case "bangun": {
      const n = hitungX(d.b);
      return cara === "klik"
        ? `Bangun A dan bangun B berbeda bentuk, tetapi luasnya sama, yaitu ${n} ${d.u}.`
        : cara === "kanvas"
          ? `Luas bangun ${hitungX(d.b) + hitungO(d.b)} ${d.u}, sudah ada ${n}, jadi masih perlu ${hitungO(d.b)} persegi satuan.`
          : hitungX(d.a) === hitungX(d.b)
            ? "Kedua bangun berbeda bentuk, tetapi banyak persegi satuannya sama, jadi luasnya sama."
            : "Banyak persegi satuan kedua bangun berbeda, jadi luasnya berbeda.";
    }
    case "baris":
      return cara === "suara"
        ? "Luas dihitung dengan mengalikan baris dengan kolom, bukan menjumlahkannya."
        : d.duga
          ? `Dugaan diperiksa dengan baris kali kolom: ${d.g.b} × ${d.g.k} = ${luas(d.g)}, jadi luasnya ${teksLuas(luas(d.g), d.g.u)}.`
          : `Luas dihitung dari baris kali kolom: ${d.g.b} × ${d.g.k} = ${luas(d.g)}, jadi luasnya ${teksLuas(luas(d.g), d.g.u)}.`;
    case "tangga":
      return cara === "suara"
        ? d.arah === "turun"
          ? "Turun tangga dari meter persegi ke sentimeter persegi, jadi bilangannya menjadi lebih banyak."
          : "Naik tangga dari sentimeter persegi ke meter persegi, jadi bilangannya menjadi lebih sedikit."
        : cara === "kanvas"
          ? `Karena 1 m² sama dengan 10.000 cm², maka ${teksRibu(sentiDari(d.m))} cm² sama dengan ${d.m} m².`
          : d.arah === "turun"
            ? `Karena 1 m² sama dengan 10.000 cm², maka ${d.m} m² sama dengan ${teksRibu(sentiDari(d.m))} cm².`
            : `Karena 1 m² sama dengan 10.000 cm², maka ${teksRibu(sentiDari(d.m))} cm² sama dengan ${d.m} m².`;
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  const aw = AWALAN[metode];
  switch (l.tipe) {
    case "satuan":
      return cara === "klik"
        ? `${aw}: lihat ${g} ini. Setiap ubin bersisi satu ${kataPanjang(l.g.u)}. Pilih luas satu ubin itu.`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. Lantai disusun dari ubin yang berbaris-baris. Berapa banyak baris ubin? Tulis satu angka di kanvas.`
          : `${aw}: uang kertas, kertas origami, dan keping ubin bisa berbeda ukurannya, sehingga hasilnya berbeda. Satuan yang ukurannya sama untuk semua orang disebut satuan apa? Ucapkan satu kata.`;
    case "tidakbaku":
      return cara === "klik"
        ? `${aw}: lihat ${g} ini. Permukaan yang sama ditutup dua satuan tidak baku, yaitu ${l.nama[0]} dan ${l.nama[1]}, dan satu ${l.nama[1]} sama dengan dua ${l.nama[0]}. Berapa luas permukaan itu dengan satuan ${l.nama[0]}? Pilih jawabannya.`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. Permukaan yang sama ditutup dua satuan tidak baku, yaitu ${l.nama[0]} dan ${l.nama[1]}, dan satu ${l.nama[1]} sama dengan dua ${l.nama[0]}. Berapa banyak ${l.nama[1]} yang menutupi permukaan itu? Tulis satu angka di kanvas.`
          : `${aw}: satuan tidak baku bisa berbeda ukurannya. Luas permukaan yang sama, jika diukur dengan satuan yang berbeda, hasilnya sama atau beda? Ucapkan satu kata.`;
    case "bangun":
      return cara === "klik"
        ? `${aw}: lihat ${g} ini. Bangun A dan bangun B berbeda bentuk, dan keduanya tersusun dari persegi satuan yang sama besar. Luas bangun A sudah tertulis. Berapa luas bangun B? Pilih jawabannya.`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. Sebuah bangun dibuat dengan luas yang tertulis, dan sebagian persegi satuannya sudah ada. Berapa persegi satuan lagi yang dibutuhkan? Tulis satu angka di kanvas.`
          : `${aw}: lihat ${g} ini. Dua bangun berbeda bentuk tersusun dari persegi satuan yang sama besar. Luas kedua bangun sama atau beda? Ucapkan satu kata.`;
    case "baris":
      return cara === "klik"
        ? l.duga
          ? `${aw}: lihat ${g} ini. ${l.benda ? `Satu ubin kira-kira seluas ${l.benda}. ` : ""}Duga dulu luas lantai dengan membandingkannya ke ubin acuan, lalu periksa dengan baris kali kolom. Berapa luas lantai? Pilih jawabannya.`
          : `${aw}: lihat ${g} ini. Ubin tersusun dalam baris dan kolom. Berapa luas lantai? Pilih jawabannya.`
        : cara === "kanvas"
          ? l.duga
            ? `${aw}: lihat ${g} ini. ${l.benda ? `Satu ubin kira-kira seluas ${l.benda}. ` : ""}Duga dulu luas lantai dengan membandingkannya ke ubin acuan, lalu periksa dengan baris kali kolom. Berapa luas lantai, dalam satuan yang tertulis? Tulis satu angka di kanvas.`
            : `${aw}: lihat ${g} ini. Ubin tersusun dalam baris dan kolom. Berapa luas lantai, dalam satuan yang tertulis? Tulis satu angka di kanvas.`
          : `${aw}: lihat ${g} ini. Ubin tersusun dalam baris dan kolom. Luas lantai dari baris dan kolom dihitung dengan cara apa? Ucapkan satu kata.`;
    case "tangga":
      return cara === "klik"
        ? l.arah === "turun"
          ? `${aw}: satu meter persegi sama dengan sepuluh ribu sentimeter persegi. Ubah luas lantai ini ke sentimeter persegi. Pilih jawabannya.`
          : `${aw}: satu meter persegi sama dengan sepuluh ribu sentimeter persegi. Ubah luas lantai ini ke meter persegi. Pilih jawabannya.`
        : cara === "kanvas"
          ? `${aw}: satu meter persegi sama dengan sepuluh ribu sentimeter persegi. Ubah luas lantai ini ke meter persegi. Tulis satu angka di kanvas.`
          : l.arah === "turun"
            ? `${aw}: kita mengubah meter persegi menjadi sentimeter persegi, atau turun tangga. Bilangannya menjadi lebih banyak atau lebih sedikit? Ucapkan satu kata.`
            : `${aw}: kita mengubah sentimeter persegi menjadi meter persegi, atau naik tangga. Bilangannya menjadi lebih banyak atau lebih sedikit? Ucapkan satu kata.`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "satuan":
      return cara === "klik" ? "Berapa luas satu ubin?" : cara === "kanvas" ? "Berapa banyak baris ubin?" : "Satuan itu disebut satuan apa?";
    case "tidakbaku":
      return cara === "klik" ? "Berapa luas permukaan itu?" : cara === "kanvas" ? `Berapa banyak ${d.nama[1]}?` : "Hasilnya sama atau beda?";
    case "bangun":
      return cara === "klik" ? "Berapa luas bangun B?" : cara === "kanvas" ? "Berapa persegi satuan lagi?" : "Luas kedua bangun sama atau beda?";
    case "baris":
      return cara === "suara" ? "Luas dihitung dengan cara apa?" : "Berapa luas lantai?";
    case "tangga":
      return cara === "klik" ? "Berapa hasil perubahannya?" : cara === "kanvas" ? "Berapa meter persegi?" : "Bilangannya lebih banyak atau lebih sedikit?";
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya tanpa menyebut jawaban (tanpa digit, tanpa menyebut gambar, petak, atau kisi). `jawab`: pilihan atau kata yang diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "satuan":
      return cara === "klik"
        ? "Pikirkan lagi ukuran satu ubin dan satuan luas yang cocok dengannya."
        : cara === "kanvas"
          ? "Hitung hanya baris ubin dari atas sampai bawah, bukan banyak ubin seluruhnya."
          : "Pikirkan satuan yang ukurannya sama bagi siapa saja yang mengukur.";
    case "tidakbaku":
      return cara === "klik"
        ? "Perhatikan satuan yang ditanyakan, lalu ingat hubungan satu satuan besar dengan satuan kecil."
        : cara === "kanvas"
          ? "Hitung hanya satuan besar yang menutupi permukaan, bukan satuan kecil."
          : "Bandingkan ukuran kedua satuan, lalu pikirkan bilangan yang dihasilkan.";
    case "bangun":
      return cara === "klik"
        ? "Hitung hanya persegi satuan yang menyusun bangun B, bukan bidang di sekelilingnya."
        : cara === "kanvas"
          ? "Kurangi luas yang diminta dengan persegi satuan yang sudah ada."
          : "Bandingkan banyak persegi satuan kedua bangun, bukan bentuknya.";
    case "baris":
      return cara === "klik"
        ? "Hitung ulang banyak baris kali banyak kolom, lalu periksa satuannya."
        : cara === "kanvas"
          ? "Hitung banyak baris dan banyak kolom, lalu gabungkan keduanya dengan cara yang cepat."
          : "Bayangkan tiap baris berisi ubin yang sama banyak, lalu pikirkan cara cepat menghitung semuanya.";
    case "tangga":
      return cara === "klik"
        ? "Ingat hubungan satu meter persegi dengan sentimeter persegi, lalu perhatikan arah tangganya."
        : cara === "kanvas"
          ? "Sentimeter persegi lebih kecil daripada meter persegi, jadi bilangannya perlu dibagi dengan hubungan kedua satuan."
          : "Bandingkan ukuran satu sentimeter persegi dengan satu meter persegi, lalu pikirkan jumlah yang diperlukan untuk menutup luas yang sama.";
  }
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
const daftarBaris = (m: Bangun): string => perBaris(m).join(", ");
/** Isi kartu kata untuk tahap Abstract (kata dan angka, tanpa emoji dan tanpa gambar). */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  switch (l.tipe) {
    case "satuan":
      return cara === "klik"
        ? [`sisi satu ubin: 1 ${satuanPanjang(l.g.u)}`, "luas satu ubin: ?"]
        : cara === "kanvas"
          ? ["ubin disusun dalam baris", `banyak kolom: ${l.g.k}`, `banyak ubin seluruhnya: ${luas(l.g)}`, "banyak baris: ?"]
          : ["uang kertas dan kertas origami: ukuran bisa beda", "satuan yang sama untuk semua orang: ?"];
    case "tidakbaku":
      return cara === "suara"
        ? [`permukaan yang sama diukur dengan ${l.nama[0]} dan ${l.nama[1]}`, "hasilnya: sama atau beda?"]
        : [`permukaan ditutup ${l.nama[1]}: ${l.r} baris, ${l.k} kolom`, `1 ${l.nama[1]} = 2 ${l.nama[0]}`, cara === "klik" ? `luas dalam ${l.nama[0]}: ?` : `banyak ${l.nama[1]}: ?`];
    case "bangun": {
      if (cara === "kanvas") return [`luas bangun yang diminta: ${hitungX(l.b) + hitungO(l.b)} ${l.u}`, `persegi satuan yang sudah ada: ${hitungX(l.b)}`, "yang masih dibutuhkan: ?"];
      return cara === "klik"
        ? [`luas bangun A: ${hitungX(l.a)} ${l.u}`, `bangun B, persegi satuan tiap baris: ${daftarBaris(l.b)}`, "luas bangun B: ?"]
        : [`bangun A, persegi satuan tiap baris: ${daftarBaris(l.a)}`, `bangun B, persegi satuan tiap baris: ${daftarBaris(l.b)}`, "luas kedua bangun: sama atau beda?"];
    }
    case "baris":
      return cara === "suara"
        ? [`banyak baris: ${l.g.b}`, `banyak kolom: ${l.g.k}`, "cara menghitung luas lantai: ?"]
        : l.duga
          ? [`ubin acuan: ${ACUAN.b} baris, ${ACUAN.k} kolom = ${ACUAN.b * ACUAN.k} ${l.g.u}`, `lantai: ${l.g.b} baris, ${l.g.k} kolom`, "duga dulu, lalu periksa: luas lantai: ?"]
          : [`banyak baris: ${l.g.b}`, `banyak kolom: ${l.g.k}`, `satuan ubin: 1 ${l.g.u}`, "luas lantai: ?"];
    case "tangga":
      return cara === "suara"
        ? [l.arah === "turun" ? "dari m² ke cm²: turun tangga" : "dari cm² ke m²: naik tangga", "bilangannya: lebih banyak atau lebih sedikit?"]
        : cara === "kanvas" || l.arah === "naik"
          ? ["1 m² = 10.000 cm²", `luas lantai: ${teksRibu(sentiDari(l.m))} cm²`, "dalam m²: ?"]
          : ["1 m² = 10.000 cm²", `luas lantai: ${l.m} m²`, "dalam cm²: ?"];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
