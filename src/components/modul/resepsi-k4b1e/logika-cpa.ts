/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 1 Sub-Bab E "Meja Resepsi Bu Rina" (penjumlahan bilangan sampai 1.000: susun ke bawah, simpan, tambah per tempat, genapkan dulu):
 * jenis tugas, jawaban benar, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-resepsi-k4b1e.mjs.
 * Jawaban beragam: memilih jumlah atau tulisan simpanan (klik), menulis satu angka di kanvas, dan mengucapkan satu kata (nama tempat, ditambah, dikurangi) atau bilangan.
 * Jawaban benar dihitung dari data. Empat metode tiap misi: IGIL "Susun ke Bawah, Tambah Per Tempat, Genapkan Dulu" (menjumlahkan bersusun), Column Add (Susun ke Bawah: menulis dan menyimpan),
 * Place Add (Tambah Per Tempat), dan Round and Adjust (Genapkan Dulu).
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

/* ------------------------------ Kata bilangan ------------------------------ */
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
/** Ubah teks berangka menjadi ucapan tanpa digit: "9 − 3 = 6" menjadi "sembilan dikurangi tiga sama dengan enam", "tulis 4, simpan 1" menjadi "tulis empat, simpan satu". */
export function ucapkan(t: string): string {
  return t
    .replace(/ [−-] /g, " dikurangi ")
    .replace(/ \+ /g, " ditambah ")
    .replace(/ = /g, " sama dengan ")
    .replace(/\d+/g, (d) => ` ${kataBil(Number(d))} `)
    .replace(/\s+,/g, ",")
    .replace(/\s+/g, " ")
    .trim();
}
export const ORDINAL = ["pertama", "kedua", "ketiga", "keempat", "kelima", "keenam"] as const;

/* ------------------------------ Data ------------------------------ */
export type Tempat = "satuan" | "puluhan" | "ratusan";
export const NAMA_TEMPAT: readonly Tempat[] = ["satuan", "puluhan", "ratusan"];
/** Angka di tempat ke-`k` (0 satuan, 1 puluhan, 2 ratusan). */
export const angkaDi = (n: number, k: number): number => Math.floor(n / 10 ** k) % 10;
export const indeksTempat = (t: Tempat): number => NAMA_TEMPAT.indexOf(t);
/** Jumlah angka dua bilangan di tempat ke-`k` (tanpa simpanan). */
export const jumlahAngka = (a: number, b: number, k: number): number => angkaDi(a, k) + angkaDi(b, k);
/** Hasil keliru bila tidak menyimpan: tiap tempat hanya menulis sisa jumlah angkanya (kesalahan Satria di Story). */
export const tanpaSimpan = (a: number, b: number): number => [2, 1, 0].reduce((t, k) => t * 10 + (jumlahAngka(a, b, k) % 10), 0);
/** Banyak simpanan yang masuk ke tempat ke-`k` (0 untuk satuan). */
export function simpananMasuk(a: number, b: number, k: number): number {
  let s = 0;
  for (let i = 0; i < k; i += 1) s = Math.floor((jumlahAngka(a, b, i) + s) / 10);
  return s;
}
/** Banyak tempat yang menyimpan saat dijumlahkan bersusun. */
export const banyakSimpan = (a: number, b: number): number => [0, 1, 2].filter((k) => jumlahAngka(a, b, k) + simpananMasuk(a, b, k) >= 10).length;
/** Pembulatan ke ratusan terdekat. */
export const bulatRatusan = (n: number): number => Math.round(n / 100) * 100;
const unit = (a: number, b: number): number => jumlahAngka(a, b, 0);
export const tulisSimpan = (a: number, b: number): string => `tulis ${unit(a, b) - 10}, simpan 1`;
export const hasilTempat = (a: number, b: number, t: Tempat): number => jumlahAngka(a, b, indeksTempat(t)) * 10 ** indeksTempat(t);
/** Uraian bilangan menurut tempat (cara susun panjang): 245 menjadi "200 + 40 + 5"; tempat berangka nol dilewati. */
export const uraikan = (n: number): string => [2, 1, 0].map((k) => angkaDi(n, k) * 10 ** k).filter((v) => v > 0).join(" + ");
/** Jumlah tiap tempat sebelum diuraikan lagi dan disimpan: 245 + 378 menjadi [500, 110, 13] (ratusan, puluhan, satuan). */
export const jumlahPerTempat = (a: number, b: number): number[] => [2, 1, 0].map((k) => jumlahAngka(a, b, k) * 10 ** k);
/** Bentuk gabungan per tempat sebelum menyimpan: "500 + 110 + 13". */
export const bentukGabung = (a: number, b: number): string => jumlahPerTempat(a, b).join(" + ");
/** Bentuk panjang jumlah sesudah menyimpan (jawaban susun panjang): 245 + 378 = 623 menjadi "600 + 20 + 3". */
export const bentukJumlah = (a: number, b: number): string => uraikan(a + b);
/** Dua bentuk keliru untuk susun panjang: digit tanpa tempatnya, atau tempat bergeser (ada pula cadangan bergeser satu). Nilainya tidak pernah sama dengan jumlah, jadi hanya satu pilihan yang benar. */
export function bentukKeliru(a: number, b: number): [string, string] {
  const t = a + b;
  const d = [2, 1, 0].map((k) => angkaDi(t, k));
  const calon = [d.join(" + "), `${d[0] * 10} + ${d[1] * 10} + ${d[2]}`, `${d[0] * 100} + ${d[1] * 10} + ${d[2] + 1}`].filter((x, i, arr) => x !== bentukJumlah(a, b) && arr.indexOf(x) === i);
  return [calon[0], calon[1]];
}
/** Tempat yang langsung menghasilkan sepuluh atau lebih (satuan atau puluhan; data dipilih agar hanya satu). */
export const tempatSimpan = (a: number, b: number): Tempat | null => (NAMA_TEMPAT.slice(0, 2).filter((_, k) => jumlahAngka(a, b, k) >= 10)[0] as Tempat | undefined) ?? null;

/* ------------------------------ Jenis tugas ------------------------------ */
/** IGIL: jumlah dua bilangan (hasil sampai 999). */
export type LJumlah = { tipe: "jumlah"; benda: string; a: number; b: number };
/** Column Add: satuan berjumlah sepuluh sampai delapan belas, tulis sisanya, simpan satu; jumlah puluhan ditambah simpanan tidak sampai sepuluh. */
export type LSimpan = { tipe: "simpan"; benda: string; a: number; b: number };
/** Place Add: jumlahkan ratusan, puluhan, atau satuan dari dua bilangan. */
export type LTempat = { tipe: "tempat"; benda: string; a: number; b: number; tempat: Tempat };
/** Round and Adjust: `b` hampir `bulat` (ratusan); bulatkan, jumlahkan, lalu sesuaikan. */
export type LGenap = { tipe: "genap"; benda: string; a: number; b: number; bulat: number };
export type LangkahDasar = LJumlah | LSimpan | LTempat | LGenap;
/** Cari kesalahan: tokoh sudah menjawab dari `dasar`. Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. `jawabTokoh` adalah teks pilihan klik tokoh. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LJumlah | LSimpan | LGenap;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "susun" | "tempat" | "genap";
export const URUT_METODE: Metode[] = ["igil", "susun", "tempat", "genap"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Susun ke Bawah, Tambah Per Tempat, Genapkan Dulu",
  susun: "Column Add: Susun ke Bawah",
  tempat: "Place Add: Tambah Per Tempat",
  genap: "Round and Adjust: Genapkan Dulu",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F522}", susun: "\u{1F4DD}", tempat: "\u{1F9E9}", genap: "\u{1F501}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", susun: "Column Add", tempat: "Place Add", genap: "Round and Adjust" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);
export const jumlahDari = (d: LangkahDasar): number => d.a + d.b;
/** Selisih `b` dengan bilangan bulatnya pada Round and Adjust. */
export const selisihBulat = (d: LGenap): number => Math.abs(d.b - d.bulat);
/** Setelah membulatkan: `ditambah` bila bilangan lebih kecil dari bulatnya? Tidak: lebih kecil berarti kelebihan, jadi dikurangi. */
export const arahSesuai = (d: LGenap): "dikurangi" | "ditambah" => (d.b < d.bulat ? "dikurangi" : "ditambah");

/**
 * Data sah menurut batas bab: bilangan tiga angka, jumlah sampai 999, tiap jenis punya ciri yang diminta.
 * Menurut cara: simpan kanvas butuh jumlah puluhan ditambah simpanan tidak sampai sepuluh; tempat kanvas butuh jumlah angka satu angka;
 * tempat suara butuh tepat satu tempat (satuan atau puluhan) yang jumlah angkanya sepuluh atau lebih dan tempat itu adalah `tempat`.
 */
export function sahDasar(l: LangkahDasar, cara?: Cara): boolean {
  if (l.a < 100 || l.b < 100 || l.a + l.b > 999) return false;
  switch (l.tipe) {
    case "jumlah":
      return true;
    case "simpan":
      return unit(l.a, l.b) >= 11 && (cara !== "kanvas" || (jumlahAngka(l.a, l.b, 1) + 1 <= 9 && jumlahAngka(l.a, l.b, 1) >= 1));
    case "tempat": {
      const s = jumlahAngka(l.a, l.b, indeksTempat(l.tempat));
      if (cara === "suara") return [0, 1, 2].filter((k) => jumlahAngka(l.a, l.b, k) >= 10).length === 1 && tempatSimpan(l.a, l.b) === l.tempat;
      if (cara === "klik") return [2, 1, 0].every((k) => angkaDi(l.a + l.b, k) > 0);
      return cara === "kanvas" ? s >= 2 && s <= 9 : s >= 2;
    }
    case "genap":
      return l.bulat % 100 === 0 && selisihBulat(l) >= 1 && selisihBulat(l) <= 5;
  }
}

/* ------------------------------ Angka dan jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });

/**
 * Angka hasil hitung tugas menurut caranya (null bila jawabannya berupa tulisan atau kata):
 * jumlah: klik dan suara = jumlah, kanvas = angka ratusan pada jumlah; simpan: kanvas = jumlah puluhan ditambah simpanan, suara = angka satuan yang ditulis;
 * tempat: kanvas = jumlah angka di tempat itu (klik = bentuk panjang jumlah, berupa tulisan; suara = nama tempat yang menyimpan); genap: klik = jumlah, kanvas = selisih dengan bulatnya.
 */
export function angkaTugas(l: LangkahDasar, cara?: Cara): number | null {
  switch (l.tipe) {
    case "jumlah":
      return cara === "kanvas" ? angkaDi(jumlahDari(l), 2) : jumlahDari(l);
    case "simpan":
      return cara === "kanvas" ? jumlahAngka(l.a, l.b, 1) + 1 : cara === "suara" ? unit(l.a, l.b) - 10 : null;
    case "tempat":
      return cara === "kanvas" ? jumlahAngka(l.a, l.b, indeksTempat(l.tempat)) : null;
    case "genap":
      return cara === "kanvas" ? selisihBulat(l) : cara === "suara" ? null : jumlahDari(l);
  }
}

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari data. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "simpan":
      return cara === "klik" ? nama(tulisSimpan(l.a, l.b)) : angka(angkaTugas(l, cara) ?? 0);
    case "tempat":
      return cara === "suara" ? nama(tempatSimpan(l.a, l.b) ?? "satuan") : cara === "klik" ? nama(bentukJumlah(l.a, l.b)) : angka(angkaTugas(l, cara) ?? 0);
    case "genap":
      return cara === "suara" ? nama(arahSesuai(l)) : angka(angkaTugas(l, cara) ?? 0);
    default:
      return angka(angkaTugas(l, cara) ?? 0);
  }
}

/** Apakah tugas langsung siap dijawab? Semua tugas punya jawaban, kecuali Cari kesalahan yang memakai kegiatan lebih dulu. Tidak bergantung pada rupa. */
export function siapLangsung(l: Langkah, rupa: Rupa, cara: Cara): boolean {
  void rupa;
  if (l.tipe === "salah") return false;
  return kunciJawab(l, cara) !== null;
}

/* ------------------------------ Pilihan ------------------------------ */
/** Pengecoh khas untuk jawaban bilangan, menurut jenis tugas (kesalahan yang lazim). */
export function pengecoh(l: Langkah, cara: Cara, awal?: number): number[] {
  const d = dasarDari(l);
  const n = angkaTugas(d, cara) ?? 0;
  const kecil = n <= 9;
  let khas: number[] = [];
  switch (d.tipe) {
    case "jumlah":
      khas = cara === "kanvas" ? [] : [tanpaSimpan(d.a, d.b), n + 10, n - 10, n + 100];
      break;
    case "simpan":
      khas = [n + 1, n - 1, n + 2, 1];
      break;
    case "tempat": {
      khas = [n + 1, n - 1];
      break;
    }
    case "genap":
      khas = cara === "kanvas" ? [n + 1, n - 1, n + 2] : [d.a + d.bulat, d.a + d.bulat + (d.b < d.bulat ? selisihBulat(d) : -selisihBulat(d)), n + 10, n - 10];
      break;
  }
  const calon = [awal ?? -1, ...khas, n + 1, n - 1, n + 2, n - 2];
  const hasil: number[] = [];
  const batas = kecil ? 9 : 999;
  for (const c of calon) if (Number.isInteger(c) && c >= 1 && c <= batas && c !== n && !hasil.includes(c)) hasil.push(c);
  return hasil;
}
/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisipkan<T>(benar: T, lain: T[], geser: number): T[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}
/** Bilangan dalam jawaban klik tokoh: "523" menjadi 523. */
const angkaDariTeks = (t: string): number => Number(/\d+/.exec(t)?.[0] ?? -1);

/** Tiga pilihan untuk tugas klik: jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k) return [];
  const d = dasarDari(l);
  if (k.jenis === "nama") {
    if (d.tipe === "tempat") return sisipkan(k.nama, [...bentukKeliru(d.a, d.b)], d.a + d.b);
    if (d.tipe !== "simpan") return [];
    const u = unit(d.a, d.b);
    return sisipkan(k.nama, [`tulis ${u}, simpan 0`, `tulis ${u - 10}, simpan 0`], u + d.a);
  }
  const awal = l.tipe === "salah" && /\d/.test(l.jawabTokoh) ? angkaDariTeks(l.jawabTokoh) : undefined;
  const [a, b] = pengecoh(l, "klik", awal);
  return sisipkan(String(k.n), [String(a), String(b)], k.n);
}
/** Pilihan cadangan untuk tugas suara (kata atau bilangan dalam kata). */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k) return [];
  if (k.jenis === "angka") {
    const lain = pengecoh(l, cara).slice(0, 2);
    return sisipkan(kataBil(k.n), lain.map(kataBil), k.n);
  }
  if (NAMA_TEMPAT.includes(k.nama as Tempat)) return sisipkan(k.nama, NAMA_TEMPAT.filter((t) => t !== k.nama), k.nama.length);
  return k.nama === "dikurangi" ? ["ditambah", "dikurangi"] : ["dikurangi", "ditambah"];
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));
/** Teks pilihan klik yang benar (bilangan atau tulisan simpanan). */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  if (!k) return null;
  return k.jenis === "nama" ? k.nama : String(k.n);
}

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : "gambar");

export function kalimatKunci(l: Langkah, cara: Cara): string {
  return kapital(kalimatKunciMentah(l, cara));
}

/** Penjelasan susun panjang (tanpa digit): jumlah tiap tempat, uraian ulang satuan atau puluhan yang sepuluh atau lebih, lalu jumlahnya. */
function keteranganPanjang(a: number, b: number): string {
  const [r, p, s] = jumlahPerTempat(a, b);
  const urai: string[] = [];
  if (s >= 10) urai.push(`satuan ${kataBil(s)} diuraikan menjadi sepuluh${s > 10 ? ` dan ${kataBil(s - 10)}` : ""}`);
  if (p >= 100) urai.push(`puluhan ${kataBil(p)} diuraikan menjadi seratus${p > 100 ? ` dan ${kataBil(p - 100)}` : ""}`);
  const lanjut = urai.length > 0 ? ` Lalu ${urai.join(", dan ")}, kemudian digabung lagi per tempat.` : "";
  return `Dijumlahkan tempat demi tempat: ratusan ${kataBil(r)}, puluhan ${kataBil(p)}, satuan ${kataBil(s)}.${lanjut} Jumlahnya ${kataBil(a + b)}.`;
}

function kalimatKunciMentah(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  const k = kunciJawab(d, cara);
  const n = k?.jenis === "angka" ? k.n : 0;
  switch (d.tipe) {
    case "jumlah":
      return cara === "kanvas"
        ? `Jumlahnya ${kataBil(jumlahDari(d))}, jadi angka di tempat ratusan adalah ${kataBil(n)}.`
        : `${kataBil(d.a)} ditambah ${kataBil(d.b)} sama dengan ${kataBil(jumlahDari(d))}, dijumlahkan dari satuan dengan menyimpan bila perlu.`;
    case "simpan":
      if (cara === "klik") return `Satuan berjumlah ${kataBil(unit(d.a, d.b))}, jadi ditulis ${kataBil(unit(d.a, d.b) - 10)} di satuan dan satu disimpan ke puluhan.`;
      return cara === "kanvas"
        ? `Puluhan berjumlah ${kataBil(jumlahAngka(d.a, d.b, 1))} ditambah satu simpanan, hasilnya ${kataBil(n)}.`
        : `Sepuluh satuan dipindahkan menjadi satu puluhan, sisanya ${kataBil(n)} ditulis di satuan.`;
    case "tempat": {
      const t = d.tempat;
      if (cara === "suara") return `Jumlah angka di tempat ${k?.jenis === "nama" ? k.nama : t} sepuluh atau lebih, jadi tempat itulah yang menghasilkan simpanan.`;
      return cara === "kanvas" ? `Angka di tempat ${t} dijumlahkan: ${kataBil(angkaDi(d.a, indeksTempat(t)))} ditambah ${kataBil(angkaDi(d.b, indeksTempat(t)))} sama dengan ${kataBil(n)}.` : keteranganPanjang(d.a, d.b);
    }
    case "genap":
      return cara === "kanvas"
        ? `${kataBil(d.b)} berselisih ${kataBil(n)} dengan ${kataBil(d.bulat)}, itulah yang harus disesuaikan.`
        : cara === "klik"
          ? `${kataBil(d.a)} ditambah ${kataBil(d.bulat)} sama dengan ${kataBil(d.a + d.bulat)}, lalu ${arahSesuai(d)} ${kataBil(selisihBulat(d))} menjadi ${kataBil(n)}.`
          : `Bilangan dibulatkan ${d.b < d.bulat ? "ke atas" : "ke bawah"}, jadi hasilnya ${arahSesuai(d)} ${kataBil(selisihBulat(d))}.`;
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  const aw = AWALAN[metode];
  const akhir = cara === "klik" ? "Pilih jawabannya." : cara === "kanvas" ? "Tulis satu angka di kanvas." : "Ucapkan bilangannya.";
  switch (l.tipe) {
    case "jumlah":
      return cara === "kanvas"
        ? `${aw}: lihat dua bilangan pada ${g} ini. Susun ke bawah dan jumlahkan dari satuan. Berapa angka di tempat ratusan pada jumlahnya? ${akhir}`
        : `${aw}: lihat dua bilangan pada ${g} ini. Cara susun pendek: susun ke bawah, jumlahkan dari satuan, dan simpan bila perlu. Berapa jumlahnya? ${akhir}`;
    case "simpan":
      if (cara === "klik") return `${aw}: lihat dua bilangan pada ${g} ini. Jumlahkan satuannya. Bagaimana menulis hasil satuan dan simpanannya? ${akhir}`;
      return cara === "kanvas"
        ? `${aw}: lihat dua bilangan pada ${g} ini. Jumlahkan angka puluhan keduanya, lalu tambahkan satu simpanan dari satuan. Berapa hasilnya? ${akhir}`
        : `${aw}: lihat dua bilangan pada ${g} ini. Jumlahkan satuannya, tulis sisanya, dan simpan satu. Angka berapa yang ditulis di satuan? Ucapkan angkanya.`;
    case "tempat":
      if (cara === "suara") return `${aw}: lihat dua bilangan pada ${g} ini. Jumlahkan tempat demi tempat. Di tempat mana hasilnya sepuluh atau lebih sehingga ada yang disimpan? Ucapkan nama tempatnya.`;
      return cara === "kanvas"
        ? `${aw}: lihat dua bilangan pada ${g} ini. Jumlahkan angka di tempat ${l.tempat} dari kedua bilangan. Berapa jumlah angkanya? ${akhir}`
        : `${aw}: lihat dua bilangan pada ${g} ini. Cara susun panjang: uraikan tiap bilangan, jumlahkan tempat demi tempat, lalu uraikan lagi bila ada yang sepuluh atau lebih. Mana bentuk jumlahnya? ${akhir}`;
    case "genap":
      if (cara === "klik") return `${aw}: salah satu bilangan pada ${g} ini hampir bulat. Bulatkan dulu, jumlahkan, lalu sesuaikan hasilnya. Berapa jumlah yang sebenarnya? ${akhir}`;
      return cara === "kanvas"
        ? `${aw}: salah satu bilangan pada ${g} ini hampir bulat. Berapa selisih bilangan itu dengan bilangan bulatnya? ${akhir}`
        : `${aw}: salah satu bilangan pada ${g} ini hampir bulat. Setelah dibulatkan dan dijumlahkan, hasilnya disesuaikan dengan ditambah atau dikurangi? Ucapkan satu kata.`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "jumlah":
      return cara === "kanvas" ? "Berapa angka di tempat ratusan pada jumlahnya?" : "Berapa jumlahnya?";
    case "simpan":
      return cara === "klik" ? "Bagaimana menulis hasil satuan dan simpanannya?" : cara === "kanvas" ? "Berapa jumlah puluhan ditambah simpanan?" : "Angka berapa yang ditulis di satuan?";
    case "tempat":
      return cara === "suara" ? "Tempat mana yang menyimpan?" : cara === "kanvas" ? `Berapa jumlah angka di tempat ${d.tempat}?` : "Mana bentuk jumlahnya?";
    case "genap":
      return cara === "klik" ? "Berapa jumlah yang sebenarnya?" : cara === "kanvas" ? "Berapa selisih dengan bilangan bulatnya?" : "Ditambah atau dikurangi?";
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya (tanpa digit dan tanpa membocorkan jawaban). `jawab`: kata atau bilangan yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "jumlah":
      return cara === "kanvas"
        ? "Jumlahkan dulu dari satuan sambil menyimpan, lalu lihat angka paling kiri pada jumlahnya, yaitu angka ratusan."
        : "Jumlahkan dari satuan, lalu puluhan, lalu ratusan. Bila hasil satu tempat sepuluh atau lebih, tulis sisanya dan simpan satu ke tempat di kirinya.";
    case "simpan":
      return cara === "klik"
        ? "Satuan hanya boleh berisi satu angka. Bila jumlahnya sepuluh atau lebih, tulis sisanya dan simpan satu ke puluhan."
        : cara === "kanvas"
          ? "Jumlahkan angka puluhan kedua bilangan, lalu tambahkan simpanan satu dari satuan."
          : "Jumlahkan satuannya. Sepuluh satuan dipindahkan ke puluhan, dan sisanyalah yang ditulis di satuan.";
    case "tempat":
      return cara === "suara"
        ? "Jumlahkan angka tiap tempat. Tempat yang jumlahnya sepuluh atau lebih adalah tempat yang menyimpan."
        : cara === "kanvas"
          ? `Jumlahkan hanya angka di tempat ${l.tempat}, bukan seluruh bilangannya.`
          : "Uraikan tiap bilangan menurut tempatnya, jumlahkan tempat yang sama, lalu uraikan lagi bagian yang sepuluh atau lebih. Ratusan berarti kelipatan seratus, puluhan kelipatan sepuluh.";
    case "genap":
      return cara === "klik"
        ? "Bulatkan bilangan yang hampir bulat, jumlahkan, lalu sesuaikan: bila dibulatkan ke atas, kurangi kelebihannya; bila ke bawah, tambahkan kekurangannya."
        : cara === "kanvas"
          ? "Kurangkan bilangan bulat dengan bilangan yang hampir bulat itu, atau sebaliknya, supaya tahu berapa yang harus disesuaikan."
          : "Bila bilangan dibulatkan ke atas, hasilnya jadi kelebihan, jadi dikurangi. Bila dibulatkan ke bawah, hasilnya jadi kekurangan, jadi ditambah.";
  }
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
/** Susunan bilangan bersusun ke bawah untuk kartu lambang (monospace): dua baris bilangan dan garis. */
export function kolomTeks(l: LangkahDasar): string[] {
  const lebar = 5;
  const rata = (s: string): string => s.padStart(lebar, " ");
  return [rata(String(l.a)), `+${rata(String(l.b)).slice(1)}`, "-".repeat(lebar)];
}
/** Isi kartu kata untuk tahap Abstract (kata dan angka, tanpa emoji). */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  switch (l.tipe) {
    case "jumlah":
      return [cara === "kanvas" ? "angka ratusan pada jumlah: ?" : "jumlah: ?"];
    case "simpan":
      return [cara === "klik" ? "satuan: tulis dan simpan: ?" : cara === "kanvas" ? "puluhan + simpanan: ?" : "angka satuan yang ditulis: ?"];
    case "tempat":
      return [`${l.a} = ${uraikan(l.a)}`, `${l.b} = ${uraikan(l.b)}`, cara === "suara" ? "tempat yang menyimpan: ?" : cara === "kanvas" ? `jumlah angka di tempat ${l.tempat}: ?` : "bentuk jumlahnya: ?"];
    case "genap":
      return [`bilangan hampir bulat: ${l.b}`, cara === "klik" ? "jumlah sebenarnya: ?" : cara === "kanvas" ? "selisih dengan bilangan bulat: ?" : "disesuaikan: ditambah atau dikurangi?"];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
