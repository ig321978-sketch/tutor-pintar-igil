/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 2 Bab 4 Sub-Bab B "Pita Hias Bu Mira" (pola): jenis tugas, jawaban, pilihan,
 * instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-hias-k2b4b.mjs.
 * Jawaban bukan hanya angka: memilih unsur berikutnya, mengisi kotak kosong, menyusun kartu kode huruf, melanjutkan irama, pola atau bukan, satu angka (kanvas),
 * dan satu kata (suara).
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { IKON_CARA, NAMA_CARA, URUT_CARA, kata, type Cara } from "../lemari-k1b1a/logika";
import { kata } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";

/* ------------------------------ Unsur ------------------------------ */
/** Unsur pola: nama warna, nama bentuk, atau bunyi (keras, pelan, diam). */
export type Unsur = string;
export const WARNA_UNSUR: Record<string, string> = {
  merah: "#EF4444",
  biru: "#3B82F6",
  jingga: "#F97316",
  hijau: "#22C55E",
  ungu: "#A855F7",
  kuning: "#FACC15",
  putih: "#F8FAFC",
  cokelat: "#A16207",
};
export const DAFTAR_WARNA = ["merah", "biru", "jingga", "hijau", "ungu", "kuning", "putih", "cokelat"];
/** Bentuk benda (Concrete, beremoji) dan bentuk polos (Pictorial). */
export const DAFTAR_BENDA = ["bintang", "hati", "daun", "bunga"];
export const DAFTAR_POLOS = ["bulat", "kotak", "segitiga"];
export const DAFTAR_BUNYI = ["keras", "pelan", "diam"];
export type JenisUnsur = "warna" | "benda" | "polos" | "bunyi";
export const jenisUnsur = (u: Unsur): JenisUnsur => (DAFTAR_WARNA.includes(u) ? "warna" : DAFTAR_BENDA.includes(u) ? "benda" : DAFTAR_BUNYI.includes(u) ? "bunyi" : "polos");
const DAFTAR_JENIS: Record<JenisUnsur, string[]> = { warna: DAFTAR_WARNA, benda: DAFTAR_BENDA, polos: DAFTAR_POLOS, bunyi: DAFTAR_BUNYI };
/** Semua kata yang boleh menjadi jawaban kata. */
export const SEMUA_KATA = [...DAFTAR_WARNA, ...DAFTAR_BENDA, ...DAFTAR_POLOS, ...DAFTAR_BUNYI];

/* ------------------------------ Langkah ------------------------------ */
type Seri = { unit: Unsur[]; ulang: number; sisa: number };
/** Metode IGIL "Cari Satuan, Ulangi, Periksa": barisan = satuan diulang `ulang` kali, ditambah `sisa` unsur pertama satuan. */
export type LSatuan = { tipe: "satuan" } & Seri;
/** Pattern Strips (Pita Pola): pita dari `ulang` satuan penuh; `kosong` kotak terakhir masih kosong. */
export type LPita = { tipe: "pita"; unit: Unsur[]; ulang: number; kosong: number };
/** Letter Coding (Kode Huruf): unsur pertama berkode A, unsur kedua berkode B. Satuan hanya memuat dua jenis unsur. */
export type LKode = { tipe: "kode" } & Seri;
/** Rhythm Clap (Tepuk Irama): irama keras, pelan, diam. `lanjut`: banyak bunyi yang harus dilanjutkan (Klik). `hitung`: bunyi yang dihitung (kanvas). */
export type LTepuk = { tipe: "tepuk"; lanjut: number; hitung: Unsur } & Seri;
/** Pola atau bukan: hanya sebagai dasar Cari kesalahan. */
export type LBukan = { tipe: "bukan"; barisan: Unsur[] };
export type LangkahDasar = LSatuan | LPita | LKode | LTepuk | LBukan;
/** Cari kesalahan: tokoh sudah menjawab. Anak memutuskan benar atau salah, memilih alasan, lalu menjawab sendiri (bila ada jawaban lagi). */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LangkahDasar;
  tokoh: string;
  kataTokoh: string;
  /** Kata yang disebut tokoh (bila salah dan jawabannya sebuah kata). */
  jawabTokoh?: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "pita" | "kode" | "tepuk";
export const URUT_METODE: Metode[] = ["igil", "pita", "kode", "tepuk"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Cari Satuan, Ulangi, Periksa",
  pita: "Pattern Strips: Pita Pola",
  kode: "Letter Coding: Kode Huruf",
  tepuk: "Rhythm Clap: Tepuk Irama",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F9F5}", pita: "\u{1F380}", kode: "\u{1F520}", tepuk: "\u{1F44F}" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);
export const metodeLangkah = (l: Langkah): Metode => {
  const t = dasarDari(l).tipe;
  return t === "satuan" || t === "bukan" ? "igil" : t;
};

/* ------------------------------ Hitungan dari data ------------------------------ */
/** Barisan yang tampak (pita: seluruh pita, termasuk kotak yang kosong, berisi unsur yang seharusnya). */
export function barisan(l: LangkahDasar): Unsur[] {
  if (l.tipe === "bukan") return l.barisan;
  if (l.tipe === "pita") return Array.from({ length: l.unit.length * l.ulang }, (_, i) => l.unit[i % l.unit.length]);
  return Array.from({ length: l.unit.length * l.ulang + l.sisa }, (_, i) => l.unit[i % l.unit.length]);
}
/** Banyak kotak yang tampak terisi pada pita atau barisan. */
export const banyakTampak = (l: LangkahDasar): number => (l.tipe === "pita" ? l.unit.length * l.ulang - l.kosong : barisan(l).length);
/** Unsur yang berikutnya (setelah barisan yang tampak). */
export function unsurBerikut(l: LangkahDasar): Unsur {
  if (l.tipe === "bukan") return "";
  return l.unit[banyakTampak(l) % l.unit.length];
}
/** Unsur yang harus mengisi kegiatan melanjutkan: pita (kotak kosong) atau irama (`lanjut` bunyi). */
export function unsurIsi(l: LangkahDasar): Unsur[] {
  if (l.tipe === "pita") return barisan(l).slice(banyakTampak(l));
  if (l.tipe === "tepuk") return Array.from({ length: l.lanjut }, (_, i) => l.unit[(banyakTampak(l) + i) % l.unit.length]);
  return [];
}
/** Huruf kode untuk sebuah unsur: unsur pertama dalam satuan A, unsur lainnya B. */
export const hurufKode = (l: LKode, u: Unsur): string => (u === l.unit[0] ? "A" : "B");
export const kodeSatuan = (l: LKode): string[] => l.unit.map((u) => hurufKode(l, u));
export const unsurB = (l: LKode): Unsur => l.unit.find((u) => u !== l.unit[0]) ?? "";
/** Apakah barisan sebuah pola: ada satuan dengan paling sedikit dua unsur berbeda yang berulang teratur (dua kali penuh atau lebih). */
export function satuanPola(b: readonly Unsur[]): number | null {
  for (let p = 2; p * 2 <= b.length; p += 1) {
    if (new Set(b.slice(0, p)).size >= 2 && b.every((u, i) => u === b[i % p])) return p;
  }
  return null;
}
export const adalahPola = (b: readonly Unsur[]): boolean => satuanPola(b) !== null;

export type Kunci = { jenis: "angka"; n: number } | { jenis: "kata"; kata: string };

/** Kunci tiap tugas menurut caranya, dihitung dari data. Null bila tugas selesai lewat kegiatan (mengisi, menyusun kartu, melanjutkan irama). */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, cara);
  switch (l.tipe) {
    case "satuan":
      return cara === "kanvas" ? { jenis: "angka", n: l.unit.length } : { jenis: "kata", kata: unsurBerikut(l) };
    case "pita":
      if (cara === "klik") return null;
      return cara === "kanvas" ? { jenis: "angka", n: l.ulang } : { jenis: "kata", kata: unsurIsi(l)[0] };
    case "kode":
      if (cara === "klik") return null;
      return cara === "kanvas" ? { jenis: "angka", n: barisan(l).filter((u) => u === unsurB(l)).length } : { jenis: "kata", kata: unsurBerikut(l) };
    case "tepuk":
      if (cara === "klik") return null;
      return cara === "kanvas" ? { jenis: "angka", n: barisan(l).filter((u) => u === l.hitung).length } : { jenis: "kata", kata: unsurBerikut(l) };
    case "bukan":
      return cara === "klik" ? { jenis: "kata", kata: adalahPola(l.barisan) ? "pola" : "bukan pola" } : null;
  }
}

/**
 * Apakah tugas langsung siap dijawab (tanpa kegiatan lebih dulu)? Kanvas dan suara: ya. Klik: memilih unsur berikutnya dan pola atau bukan langsung;
 * mengisi, menyusun kartu, dan melanjutkan irama memakai kegiatan (aktif di semua rupa, termasuk lambang). Cari kesalahan selalu memakai kegiatan.
 */
export function siapLangsung(l: Langkah, _rupa: Rupa, cara: Cara): boolean {
  if (l.tipe === "salah") return false;
  if (cara !== "klik") return true;
  return l.tipe === "satuan" || l.tipe === "bukan";
}

/** Pilihan kata di sekitar kunci (paling banyak empat), memuat kata yang disebut tokoh bila ada. Urut menurut daftar jenisnya. */
export function pilihanKataDari(l: Langkah, tambahan?: string): string[] {
  const d = dasarDari(l);
  if (d.tipe === "bukan") return ["pola", "bukan pola"];
  const k = kunciJawab(d, "klik") ?? kunciJawab(d, "suara");
  const benar = k?.jenis === "kata" ? k.kata : "";
  const daftar = DAFTAR_JENIS[jenisUnsur(benar)];
  const ada: string[] = [benar];
  const tambah = (u: string) => {
    if (u && !ada.includes(u) && daftar.includes(u) && ada.length < 4) ada.push(u);
  };
  if (tambahan) tambah(tambahan);
  for (const u of d.tipe === "pita" ? [] : d.unit) tambah(u);
  const i = Math.max(0, daftar.indexOf(benar));
  for (let g = 1; g < daftar.length; g += 1) {
    tambah(daftar[(i + g) % daftar.length]);
  }
  return daftar.filter((u) => ada.includes(u));
}
export function pilihanKata(l: Langkah): string[] {
  return pilihanKataDari(l, l.tipe === "salah" ? l.jawabTokoh : undefined);
}
/** Pilihan tombol untuk kegiatan mengisi: semua unsur satuan, ditambah satu unsur lain sejenis. */
export function pilihanIsi(l: LPita | LTepuk): Unsur[] {
  const daftar = DAFTAR_JENIS[jenisUnsur(l.unit[0])];
  const ada = [...new Set(l.unit)];
  if (l.tipe === "pita") for (const u of daftar) if (ada.length < 4 && !ada.includes(u)) ada.push(u);
  return daftar.filter((u) => ada.includes(u));
}

/* ------------------------------ Kalimat ------------------------------ */
const daftarKata = (u: readonly Unsur[]): string => u.join(", ");
export const namaWadah = (l: LangkahDasar, rupa: Rupa): string => (l.tipe === "tepuk" ? "irama" : l.tipe === "pita" ? "pita" : rupa === "benda" ? "untaian manik" : rupa === "diagram" ? "barisan bangun" : "barisan kata");

export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "satuan":
      return cara === "kanvas" ? `Satuan polanya ${daftarKata(d.unit)}, jadi ada ${kata(d.unit.length)} unsur dalam satu satuan.` : `Satuan polanya ${daftarKata(d.unit)}, jadi yang berikutnya ${unsurBerikut(d)}.`;
    case "pita":
      return cara === "kanvas" ? `Satuan polanya ${daftarKata(d.unit)} dan berulang ${kata(d.ulang)} kali sampai ujung pita.` : `Kotak kosong diisi mengikuti satuan ${daftarKata(d.unit)}, mulai dari ${unsurIsi(d)[0]}.`;
    case "kode":
      return cara === "kanvas" ? `Huruf B mewakili ${unsurB(d)}. Ada ${kata(barisan(d).filter((u) => u === unsurB(d)).length)} huruf B di seluruh kode.` : cara === "suara" ? `Satuan kodenya ${kodeSatuan(d).join(", ")}, jadi huruf berikutnya mewakili ${unsurBerikut(d)}.` : `Satuan kodenya ${kodeSatuan(d).join(", ")}.`;
    case "tepuk":
      return cara === "kanvas" ? `Ada ${kata(barisan(d).filter((u) => u === d.hitung).length)} tepuk ${d.hitung} di seluruh irama.` : cara === "suara" ? `Satuan irama ${daftarKata(d.unit)}, jadi bunyi berikutnya ${unsurBerikut(d)}.` : `Iramanya dilanjutkan mengikuti satuan ${daftarKata(d.unit)}.`;
    case "bukan":
      return adalahPola(d.barisan) ? "Ada satuan yang berulang dan teratur, jadi ini pola." : "Tidak ada satuan yang berulang dan teratur, jadi ini bukan pola.";
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const w = namaWadah(l, rupa);
  switch (l.tipe) {
    case "satuan":
      if (cara === "klik") return `Lihat ${w} di bawah. Cari satuan polanya dari awal, lalu pilih unsur yang berikutnya.`;
      if (cara === "kanvas") return `Cari satuan pola pada ${w} ini dari awal. Hitung banyak unsur dalam satu satuan, lalu tulis banyaknya di kanvas.`;
      return `Cari satuan pola pada ${w} ini dari awal, lalu sebutkan unsur yang berikutnya.`;
    case "pita":
      if (cara === "klik") return "Pita ini punya kotak kosong di ujungnya. Isi kotak kosong satu per satu dengan unsur yang tepat.";
      if (cara === "kanvas") return "Lihat pita kotak-kotak ini sampai ujung. Hitung berapa kali satuan polanya berulang penuh, lalu tulis banyaknya di kanvas.";
      return "Lihat kotak kosong pertama di pita ini. Sebutkan unsur yang harus mengisinya.";
    case "kode":
      if (cara === "klik") return "Tiap huruf mewakili satu jenis unsur, lihat artinya di bawah. Susun kartu huruf untuk satu satuan pola.";
      if (cara === "kanvas") return "Pola ini sudah ditulis dengan huruf. Hitung banyak huruf B di seluruh kode, lalu tulis banyaknya di kanvas.";
      return "Pola ini ditulis dengan huruf. Huruf berikutnya mewakili unsur apa? Sebutkan nama unsurnya.";
    case "tepuk":
      if (cara === "klik") return "Ikuti irama keras dan pelan di bawah. Ketuk tombol bunyi untuk melanjutkan iramanya.";
      if (cara === "kanvas") return `Lihat irama di bawah dari awal sampai akhir. Hitung banyak tepuk ${l.hitung}, lalu tulis banyaknya di kanvas.`;
      return "Lihat irama di bawah dengan teliti. Bunyi berikutnya apa? Sebutkan satu kata.";
    case "bukan":
      return `Periksa ${w} di bawah. Adakah satuan yang berulang dan teratur? Pilih jawabannya.`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  if (d.tipe === "bukan") return "Susunan ini pola atau bukan?";
  if (cara === "kanvas") return d.tipe === "satuan" ? "Berapa unsur dalam satu satuan?" : d.tipe === "pita" ? "Berapa kali satuan berulang penuh?" : d.tipe === "kode" ? "Berapa banyak huruf B?" : `Berapa banyak tepuk ${d.hitung}?`;
  if (d.tipe === "kode") return "Huruf berikutnya mewakili unsur apa?";
  return d.tipe === "tepuk" ? "Bunyi berikutnya apa?" : d.tipe === "pita" ? "Kotak kosong pertama diisi apa?" : "Unsur berikutnya apa?";
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya (tanpa digit). `jawab`: kata yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (typeof jawab === "string" && l.jawabTokoh !== undefined && jawab === l.jawabTokoh) return `Itu jawaban ${l.tokoh} yang keliru. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  if (typeof jawab === "number") {
    if (l.tipe === "satuan") return "Hitung unsur dalam satu satuan saja, bukan seluruh barisan. Cari dulu susunan yang muncul lagi dari awal.";
    if (l.tipe === "pita") return "Hitung satuan yang berulang penuh dari awal sampai ujung pita. Kotak kosong ikut menjadi bagian satuan terakhir.";
    if (l.tipe === "kode") return "Hitung hanya huruf B, satu per satu dari kiri. Huruf A tidak ikut dihitung.";
    return "Hitung hanya tepukan yang disebut, satu per satu dari kiri sampai akhir, jangan ada yang terlewat.";
  }
  if (l.tipe === "bukan") return jawab === "pola" ? "Periksa lagi. Pola punya paling sedikit dua unsur berbeda yang berulang dan teratur." : "Periksa lagi dari awal. Cari satuan yang berulang dan teratur sebelum memutuskan.";
  if (l.tipe === "kode") return "Cocokkan huruf dengan artinya. Cari dulu satuan kodenya dari awal, lalu lanjutkan urutan yang sama.";
  if (l.tipe === "tepuk") return "Jangan hanya melihat bunyi yang terakhir. Cari dulu satuan irama dari awal, lalu lanjutkan urutan yang sama.";
  return "Jangan hanya melihat unsur yang terakhir. Cari dulu satuan pola dari awal, lalu lanjutkan urutan yang sama.";
}

/** Petunjuk saat kegiatan melanjutkan (mengisi kotak atau irama) diketuk keliru. `terakhir`: unsur sebelum kotak ini. */
export function petunjukIsi(l: LPita | LTepuk, pilih: Unsur, terakhir: Unsur): string {
  if (pilih === terakhir) return `${l.tipe === "pita" ? "Unsur" : "Bunyi"} itu sama dengan yang sebelumnya, padahal polanya berganti. Lihat lagi satuan dari awal.`;
  return l.tipe === "pita" ? "Itu belum sesuai urutan satuan. Periksa lagi dari awal pita, lalu ulangi urutan yang sama." : "Itu belum sesuai urutan satuan irama. Ikuti irama dari awal, jangan hanya bunyi terakhir.";
}
/** Petunjuk saat kartu kode huruf keliru. */
export const petunjukKode = (l: LKode, urutan: number): string => `Lihat artinya lagi. Unsur ${urutan === 0 ? "pertama" : `ke${kata(urutan + 1)}`} dalam satuan adalah ${l.unit[urutan]}, jadi kartunya bukan itu. Huruf A untuk ${l.unit[0]}, huruf B untuk ${unsurB(l)}.`;
