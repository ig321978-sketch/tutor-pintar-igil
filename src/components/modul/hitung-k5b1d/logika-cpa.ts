/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 5 Bab 1 Sub-Bab D "Hitungan Penonton Pak Darmo" (jumlah dan kurang bersusun, perkalian dengan memisah pengali, pembagian per kolom, cek dengan operasi kebalikan),
 * akhir cerita Hari Pertandingan di Stadion Kota. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-hitung-k5b1d.mjs.
 * Jawaban benar DIHITUNG dari logika-data.ts (simpanan, pinjaman, pisah pengali, bagi per kolom, cek). Empat metode tiap misi: IGIL "Susun dan Tukar, Pisah dan Kali, Bagi dan Cek"
 * (memilih cara), Stack and Trade (Susun dan Tukar), Split and Multiply (Pisah dan Kali), dan Share and Check (Bagi dan Cek).
 * Jawaban: memilih (klik), menulis SATU angka 1 sampai 9 di kanvas, dan mengucapkan satu kata pendek (nama cara, nama kolom, sepuluh, tambah, kali, bagi, kurang, benar, salah).
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { ejaK5B1 } from "../eja-k5b1";
import {
  KATA_KEBALIKAN,
  NAMA_KOLOM,
  angkaKolom,
  balikCek,
  duaPengecoh,
  fmt,
  jumlahTanpaSimpan,
  kaliHilangNol,
  kolomPinjamPertama,
  kolomSimpanPertama,
  kurangBesarKecil,
  lolosCek,
  pisahPengali,
  susun3,
  susunJumlah,
  susunKurang,
  type OpCek,
} from "./logika-data";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);
/** Awal tiap kalimat berhuruf kapital. */
const kapKal = (t: string): string => t.replace(/(^|[.?!]\s+)([a-z])/g, (_m, a: string, b: string) => a + b.toUpperCase());

/* ------------------------------ Kata bilangan dan ucapan ------------------------------ */
const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
/** Nama bilangan 0 sampai 99 dalam kata (tanpa digit). */
export const kataBil = (n: number): string => {
  if (n < 10) return SATUAN[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SATUAN[n - 10]} belas`;
  const p = Math.floor(n / 10);
  const s = n % 10;
  return `${SATUAN[p]} puluh${s ? ` ${SATUAN[s]}` : ""}`;
};
export const kata = kataBil;
/** Ubah teks berangka (termasuk bilangan bertitik ribuan) menjadi ucapan tanpa digit. Tanpa spasi sebelum tanda baca. */
export function ucapkan(t: string): string {
  return ejaK5B1(t)
    .replace(/\s*×\s*/g, " dikali ")
    .replace(/\s+:\s+/g, " dibagi ")
    .replace(/\s+([.,!?;:])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}
export { fmt };

/* ------------------------------ Isi tetap ------------------------------ */
/** Tiga cara (nama Indonesia) dan kata jawaban suaranya. */
export const NAMA_TIGA_CARA = ["Susun dan Tukar", "Pisah dan Kali", "Bagi dan Cek"] as const;
export const KATA_TIGA_CARA = ["susun", "pisah", "bagi"] as const;
/** Situasi hari pertandingan dan cara yang paling cocok (indeks pada NAMA_TIGA_CARA). */
export const RENCANA: { teks: string; cara: 0 | 1 | 2 }[] = [
  { teks: "Panitia menjumlah tiket empat kategori yang tepat sampai satuan.", cara: 0 },
  { teks: "Pak Darmo membeli empat belas kotak air minum berharga sama dan ingin tahu harga seluruhnya.", cara: 1 },
  { teks: "Uang kas harus dibagi rata ke beberapa tribun, dan hasilnya perlu dicek.", cara: 2 },
  { teks: "Bendahara mengurangi tiket terjual dari tiket yang dicetak.", cara: 0 },
  { teks: "Panitia membeli tiga belas bendera berharga sama dan memisah pengali tiga belas.", cara: 1 },
  { teks: "Hadiah pemain dibagi rata, lalu panitia mengalikan kembali hasilnya untuk mengecek.", cara: 2 },
];

/* ------------------------------ Jenis tugas ------------------------------ */
type Pil = [string, string, string];
/** Data dua bilangan: satuan, nama tiap bilangan (label baris), a dan b. Untuk kali: a bilangan dan b pengali. Untuk bagi: a dibagi b. */
export type Data = { satuan: string; nama: [string, string]; a: number; b: number };
/** Cara (IGIL): memilih cara hitung yang cocok untuk keadaan (klik: nama cara; kanvas: nomor cara 1 sampai 3; suara: satu kata). */
export type LRencana = { tipe: "rencana"; r: number; pil?: Pil };
/** Susun dan Tukar (Stack and Trade), jumlah bersusun: total (klik), tulis (kanvas: angka di satu kolom), simpan (suara: kolom tujuan simpanan). */
export type HasilJumlah = "total" | "tulis" | "simpan";
export type LJumlah = { tipe: "jumlah"; d: Data; hasil: HasilJumlah; kol?: number; pil?: Pil };
/** Susun dan Tukar, kurang bersusun: total (klik), tulis (kanvas), sumber (suara: kolom asal pinjaman). */
export type HasilKurang = "total" | "tulis" | "sumber";
export type LKurang = { tipe: "kurang"; d: Data; hasil: HasilKurang; kol?: number; pil?: Pil };
/** Pisah dan Kali (Split and Multiply): total (klik), tulis (kanvas: angka di satu kolom hasil), bagian (kanvas: angka satuan pengali setelah dipisah), pisah (suara: sepuluh), gabung (suara: tambah). */
export type HasilKali = "total" | "tulis" | "bagian" | "pisah" | "gabung";
export type LKali = { tipe: "kali"; d: Data; hasil: HasilKali; kol?: number; pil?: Pil };
/** Bagi dan Cek (Share and Check), bagi per kolom: total (klik) dan digit (kanvas: angka hasil di satu kolom). */
export type HasilBagi = "total" | "digit";
export type LBagi = { tipe: "bagi"; d: Data; hasil: HasilBagi; kol?: number; pil?: Pil };
/** Bagi dan Cek, cek dengan operasi kebalikan: kembali (klik), digit (kanvas), operasi (suara: kurang, tambah, bagi, kali), klaim (suara: benar atau salah). */
export type HasilCek = "kembali" | "digit" | "operasi" | "klaim";
export type LCek = { tipe: "cek"; d: Data; op: OpCek; hasil: HasilCek; kol?: number; klaim?: number; pil?: Pil };
export type LangkahDasar = LRencana | LJumlah | LKurang | LKali | LBagi | LCek;
/** Tugas yang boleh dibungkus Cari kesalahan (jawabannya pilihan klik). */
export type DasarSalah = LRencana | LJumlah | LKurang | LKali | LBagi | LCek;
export type LangkahSalah = { tipe: "salah"; dasar: DasarSalah; tokoh: string; kataTokoh: string; jawabTokoh: string; alasan: [string, string, string]; benar: number; betul?: boolean; posisi?: number };
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "susun" | "pisah" | "bagi";
export const URUT_METODE: Metode[] = ["igil", "susun", "pisah", "bagi"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Susun dan Tukar, Pisah dan Kali, Bagi dan Cek",
  susun: "Stack and Trade: Susun dan Tukar",
  pisah: "Split and Multiply: Pisah dan Kali",
  bagi: "Share and Check: Bagi dan Cek",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F9EE}", susun: "\u{2795}", pisah: "\u{2716}", bagi: "\u{2797}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", susun: "Stack and Trade", pisah: "Split and Multiply", bagi: "Share and Check" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };
export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const sebutan = (s: string): Kunci => ({ jenis: "nama", nama: s });
const teksN = (n: number, satuan: string): string => `${fmt(n)} ${satuan}`;

export const hasilJumlah = (d: Data): number => d.a + d.b;
export const hasilKurang = (d: Data): number => d.a - d.b;
export const hasilKali = (d: Data): number => d.a * d.b;
export const hasilBagi = (d: Data): number => d.a / d.b;
/** Kolom tujuan simpanan: kolom di kiri kolom yang menghasilkan simpanan. */
export const tujuanSimpan = (l: LJumlah): number => (l.kol ?? 0) + 1;
/** Kolom asal pinjaman untuk kolom yang meminjam. */
export const asalPinjam = (l: LKurang): number => susunKurang(l.d.a, l.d.b).kolom[l.kol ?? 0].pinjam?.sumber ?? -1;
/** Bilangan yang muncul setelah operasi dibalik. */
export const kembaliCek = (l: LCek): number => balikCek(l.op, l.d.a, l.d.b).kembali;

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari logika murni. null untuk kombinasi yang tidak dipakai. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "rencana":
      return cara === "klik" ? sebutan(NAMA_TIGA_CARA[RENCANA[l.r].cara]) : cara === "kanvas" ? angka(RENCANA[l.r].cara + 1) : sebutan(KATA_TIGA_CARA[RENCANA[l.r].cara]);
    case "jumlah":
      if (l.hasil === "total") return cara === "klik" ? sebutan(teksN(hasilJumlah(l.d), l.d.satuan)) : null;
      if (l.hasil === "tulis") return cara === "kanvas" ? angka(susunJumlah([l.d.a, l.d.b]).kolom[l.kol ?? 0].tulis) : null;
      return cara === "suara" ? sebutan(NAMA_KOLOM[tujuanSimpan(l)]) : null;
    case "kurang":
      if (l.hasil === "total") return cara === "klik" ? sebutan(teksN(hasilKurang(l.d), l.d.satuan)) : null;
      if (l.hasil === "tulis") return cara === "kanvas" ? angka(susunKurang(l.d.a, l.d.b).kolom[l.kol ?? 0].tulis) : null;
      return cara === "suara" ? sebutan(NAMA_KOLOM[asalPinjam(l)]) : null;
    case "kali":
      if (l.hasil === "total") return cara === "klik" ? sebutan(teksN(hasilKali(l.d), l.d.satuan)) : null;
      if (l.hasil === "tulis") return cara === "kanvas" ? angka(angkaKolom(hasilKali(l.d), l.kol ?? 0)) : null;
      if (l.hasil === "bagian") return cara === "kanvas" ? angka(l.d.b % 10) : null;
      if (l.hasil === "pisah") return cara === "suara" ? sebutan("sepuluh") : null;
      return cara === "suara" ? sebutan("tambah") : null;
    case "bagi":
      if (l.hasil === "total") return cara === "klik" ? sebutan(teksN(hasilBagi(l.d), l.d.satuan)) : null;
      return cara === "kanvas" ? angka(angkaKolom(hasilBagi(l.d), l.kol ?? 0)) : null;
    case "cek":
      if (l.hasil === "kembali") return cara === "klik" ? sebutan(teksN(kembaliCek(l), l.d.satuan)) : null;
      if (l.hasil === "digit") return cara === "kanvas" ? angka(angkaKolom(kembaliCek(l), l.kol ?? 0)) : null;
      if (l.hasil === "operasi") return cara === "suara" ? sebutan(KATA_KEBALIKAN[l.op]) : null;
      return cara === "suara" ? sebutan(lolosCek(l.op, l.d.a, l.d.b, l.klaim ?? 0) ? "benar" : "salah") : null;
  }
}
/** Apakah tugas langsung siap dijawab? Semua tugas, kecuali Cari kesalahan. */
export function siapLangsung(l: Langkah, rupa: Rupa, cara: Cara): boolean {
  void rupa;
  if (l.tipe === "salah") return false;
  return kunciJawab(l, cara) !== null;
}

/* ------------------------------ Pilihan ------------------------------ */
const hash = (t: string): number => Array.from(t).reduce((s, c) => s + c.charCodeAt(0), 0);
/** Posisi jawaban benar: 1 atau 2 (tidak pernah tombol pertama), dari isi tugas supaya tetap dan beragam. */
const posisiDari = (l: LangkahDasar): 1 | 2 => ((hash(JSON.stringify(l)) % 2) + 1) as 1 | 2;
const opsiAngka = (benar: number, satuan: string, kandidat: number[], p: 1 | 2): Pil => {
  const [x, y] = duaPengecoh(benar, kandidat);
  return susun3(teksN(benar, satuan), [teksN(x, satuan), teksN(y, satuan)], p);
};
/** Pilihan klik otomatis: pengecoh berasal dari salah umum (lupa simpan, besar dikurangi kecil, nol hilang, hanya satu bagian pengali). */
function pilihanOtomatis(d: LangkahDasar): string[] {
  const p = posisiDari(d);
  switch (d.tipe) {
    case "rencana": {
      const benar = RENCANA[d.r].cara;
      const lain = [0, 1, 2].filter((i) => i !== benar).map((i) => NAMA_TIGA_CARA[i]) as [string, string];
      return susun3<string>(NAMA_TIGA_CARA[benar], lain, p);
    }
    case "jumlah": {
      const h = hasilJumlah(d.d);
      return opsiAngka(h, d.d.satuan, [jumlahTanpaSimpan([d.d.a, d.d.b]), h - 10 ** (kolomSimpanPertama([d.d.a, d.d.b]) + 1)], p);
    }
    case "kurang": {
      const h = hasilKurang(d.d);
      return opsiAngka(h, d.d.satuan, [kurangBesarKecil(d.d.a, d.d.b), h + 10 ** (kolomPinjamPertama(d.d.a, d.d.b) + 1)], p);
    }
    case "kali": {
      const h = hasilKali(d.d);
      return opsiAngka(h, d.d.satuan, [kaliHilangNol(d.d.a, d.d.b), d.d.a * pisahPengali(d.d.b)[0]], p);
    }
    case "bagi": {
      const q = hasilBagi(d.d);
      return opsiAngka(q, d.d.satuan, [q * 10, Math.floor(q / 10)], p);
    }
    case "cek": {
      const k = kembaliCek(d);
      return opsiAngka(k, d.d.satuan, [d.d.b, balikCek(d.op, d.d.a, d.d.b).hasil], p);
    }
  }
}
/** Pilihan klik: tiga pilihan dari data tugas (jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh pada Cari kesalahan selalu ikut). */
export function pilihanKlik(l: Langkah): string[] {
  const d = dasarDari(l);
  return d.pil ? [...d.pil] : pilihanOtomatis(d);
}
/** Pilihan cadangan untuk tugas suara (kata): jawaban benar di posisi kedua atau ketiga. */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k || k.jenis !== "nama") return [];
  const d = dasarDari(l);
  const p = posisiDari(d);
  let lain: [string, string];
  if (d.tipe === "rencana") lain = KATA_TIGA_CARA.filter((x) => x !== k.nama) as unknown as [string, string];
  else if (d.tipe === "kali" && d.hasil === "pisah") lain = ["seratus", "seribu"];
  else if (d.tipe === "kali") lain = ["kurang", "bagi"];
  else if (d.tipe === "cek" && d.hasil === "operasi") lain = ["tambah", "kurang", "kali", "bagi"].filter((x) => x !== k.nama).slice(0, 2) as [string, string];
  else if (d.tipe === "cek") lain = ["benar", "salah", "mungkin"].filter((x) => x !== k.nama) as [string, string];
  else {
    const i = NAMA_KOLOM.indexOf(k.nama as (typeof NAMA_KOLOM)[number]);
    const dekat = NAMA_KOLOM.map((n, j) => ({ n, j }))
      .filter((x) => x.j !== i)
      .sort((x, y) => Math.abs(x.j - i) - Math.abs(y.j - i) || x.j - y.j)
      .slice(0, 2)
      .map((x) => x.n);
    lain = [dekat[0], dekat[1]];
  }
  return susun3<string>(k.nama, lain, p);
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));
/** Teks pilihan klik yang benar. */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  if (!k) return null;
  return k.jenis === "nama" ? k.nama : String(k.n);
}
/** Pilihan klik ditampilkan berhuruf awal kapital untuk nama cara. */
export const tampilPilihan = (t: string): string => (/^\d/.test(t) ? t : kapital(t));

/* ------------------------------ Kalimat ------------------------------ */
const sebutBidang = (rupa: Rupa): string => (rupa === "lambang" ? "lembar" : rupa === "benda" ? "papan hitung" : "diagram");
const NAMA_OP: Record<OpCek, string> = { jumlah: "dijumlah", kurang: "dikurang", kali: "dikali", bagi: "dibagi" };
const SIMBOL_OP: Record<OpCek, "+" | "−" | "×" | ":"> = { jumlah: "+", kurang: "−", kali: "×", bagi: ":" };
const HASIL_OP: Record<OpCek, string> = { jumlah: "jumlah", kurang: "selisih", kali: "hasil kali", bagi: "hasil bagi" };
const BALIK_OP: Record<OpCek, string> = { jumlah: "kurangkan", kurang: "tambahkan", kali: "bagi dengan", bagi: "kalikan dengan" };
const SIMBOL_BALIK: Record<OpCek, "+" | "−" | "×" | ":"> = { jumlah: "−", kurang: "+", kali: ":", bagi: "×" };
const kolomTanya = (kol: number | undefined): string => NAMA_KOLOM[kol ?? 0];

export function kalimatKunci(l: Langkah, cara: Cara): string {
  return kapKal(kalimatKunciMentah(l, cara));
}
function kalimatKunciMentah(l: Langkah, cara: Cara): string {
  void cara;
  const d = dasarDari(l);
  switch (d.tipe) {
    case "rencana": {
      const c = RENCANA[d.r].cara;
      return c === 0 ? "Untuk menjumlah dan mengurang bilangan besar, susun lurus lalu hitung tiap kolom." : c === 1 ? "Untuk perkalian dengan pengali dua angka, pisah pengali lalu kalikan tiap bagian." : "Untuk membagi rata, bagi per kolom lalu cek dengan mengalikan kembali.";
    }
    case "jumlah": {
      const s = susunJumlah([d.d.a, d.d.b]);
      const c = s.kolom[d.kol ?? 0];
      if (d.hasil === "total") return `Dijumlah dari kanan dengan menyimpan: ${fmt(d.d.a)} + ${fmt(d.d.b)} = ${fmt(s.hasil)} ${d.d.satuan}.`;
      if (d.hasil === "tulis") return `Kolom ${kolomTanya(d.kol)} berjumlah ${c.jumlah}, jadi ditulis ${c.tulis}${c.simpan ? ` dan ${c.simpan} disimpan` : ""}.`;
      return `Kolom ${kolomTanya(d.kol)} berjumlah ${c.jumlah}, jadi ${c.simpan} disimpan ke kolom ${NAMA_KOLOM[tujuanSimpan(d)]}.`;
    }
    case "kurang": {
      const s = susunKurang(d.d.a, d.d.b);
      const c = s.kolom[d.kol ?? 0];
      if (d.hasil === "total") return `Dikurang dari kanan dengan meminjam bila perlu: ${fmt(d.d.a)} − ${fmt(d.d.b)} = ${fmt(s.hasil)} ${d.d.satuan}.`;
      if (d.hasil === "tulis") return `Di kolom ${kolomTanya(d.kol)}, ${c.atasSetelah} dikurangi ${c.bawah} sama dengan ${c.tulis}, dan itulah yang ditulis.`;
      const sumber = asalPinjam(d);
      const lewat = sumber - (d.kol ?? 0) > 1;
      return `Kolom ${kolomTanya(d.kol)} meminjam dari kolom ${NAMA_KOLOM[sumber]}, kolom terdekat di kiri yang angkanya bukan nol${lewat ? ", dan kolom nol yang dilewati menjadi sembilan" : ""}.`;
    }
    case "kali": {
      const pisah = pisahPengali(d.d.b);
      const h = hasilKali(d.d);
      if (d.hasil === "total") return `Pengali dipisah: ${pisah.map((p) => `${p} × ${fmt(d.d.a)} = ${fmt(p * d.d.a)}`).join(" dan ")}, jumlahnya ${fmt(h)} ${d.d.satuan}.`;
      if (d.hasil === "tulis") return `Hasilnya ${fmt(h)}, dan angka di kolom ${kolomTanya(d.kol)} adalah ${angkaKolom(h, d.kol ?? 0)}.`;
      if (d.hasil === "bagian") return `Pengali ${d.d.b} dipisah menjadi ${pisah.join(" dan ")}.`;
      if (d.hasil === "pisah") return `Pengali ${d.d.b} dipisah menjadi sepuluh dan ${d.d.b % 10}.`;
      return "Hasil tiap bagian dijumlahkan, jadi jawabannya tambah.";
    }
    case "bagi": {
      const q = hasilBagi(d.d);
      if (d.hasil === "total") return `Dibagi per kolom dari kiri: ${fmt(d.d.a)} : ${d.d.b} = ${fmt(q)} ${d.d.satuan}.`;
      return `Hasil bagi ${fmt(q)}, dan angka di kolom ${kolomTanya(d.kol)} adalah ${angkaKolom(q, d.kol ?? 0)}.`;
    }
    case "cek": {
      const b = balikCek(d.op, d.d.a, d.d.b);
      if (d.hasil === "kembali") return `Dibalik: ${fmt(b.hasil)} ${SIMBOL_BALIK[d.op]} ${fmt(d.d.b)} = ${fmt(b.kembali)}, kembali ke bilangan awal.`;
      if (d.hasil === "digit") return `Bilangan yang muncul adalah ${fmt(b.kembali)}, dan angka di kolom ${kolomTanya(d.kol)} adalah ${angkaKolom(b.kembali, d.kol ?? 0)}.`;
      if (d.hasil === "operasi") return `${kapital(d.op === "jumlah" ? "jumlah" : d.op)} dicek dengan operasi kebalikannya, yaitu ${KATA_KEBALIKAN[d.op]}.`;
      return lolosCek(d.op, d.d.a, d.d.b, d.klaim ?? 0) ? "Setelah dibalik, hasilnya kembali ke bilangan awal, jadi hasilnya benar." : "Setelah dibalik, hasilnya tidak kembali ke bilangan awal, jadi hasilnya salah.";
    }
  }
}

export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  return kapKal(instruksiMentah(l, rupa, cara, metode));
}
/** Ucapan guru untuk tugas: sama dengan instruksi, tetapi bilangan dieja (tanpa digit). */
export function suaraTugas(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  return kapKal(ucapkan(instruksiMentah(l, rupa, cara, metode)));
}
function akhirTugas(l: LangkahDasar, cara: Cara): string {
  if (cara === "klik") return "Pilih jawabannya.";
  if (cara === "kanvas") return "Tulis satu angka di kanvas.";
  if (l.tipe === "rencana") return "Ucapkan satu kata: susun, pisah, atau bagi.";
  if (l.tipe === "kali" && l.hasil === "pisah") return "Ucapkan satu kata bilangan.";
  if (l.tipe === "kali") return "Ucapkan satu kata: tambah atau kurang.";
  if (l.tipe === "cek" && l.hasil === "operasi") return "Ucapkan satu kata: tambah, kurang, kali, atau bagi.";
  if (l.tipe === "cek") return "Ucapkan satu kata: benar atau salah.";
  return "Ucapkan nama kolomnya.";
}
function instruksiMentah(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebutBidang(rupa);
  const aw = AWALAN[metode];
  const akhir = akhirTugas(l, cara);
  switch (l.tipe) {
    case "rencana":
      return `${aw}: ${RENCANA[l.r].teks} ${cara === "kanvas" ? "Cara ke berapa: satu Susun dan Tukar, dua Pisah dan Kali, atau tiga Bagi dan Cek?" : "Cara mana yang paling cocok?"} ${akhir}`;
    case "jumlah":
      if (l.hasil === "total") return `${aw}: lihat ${g} ini. ${l.d.nama[0]} ${fmt(l.d.a)} dan ${l.d.nama[1]} ${fmt(l.d.b)}. Jumlahkan bersusun dengan menyimpan. Jumlahnya berapa ${l.d.satuan}? ${akhir}`;
      if (l.hasil === "tulis") return `${aw}: lihat ${g} ini. Jumlahkan ${fmt(l.d.a)} dan ${fmt(l.d.b)} bersusun. Angka yang ditulis di kolom ${kolomTanya(l.kol)} pada hasilnya berapa? ${akhir}`;
      return `${aw}: lihat ${g} ini. Jumlahkan ${fmt(l.d.a)} dan ${fmt(l.d.b)} bersusun. Kolom ${kolomTanya(l.kol)} berjumlah lebih dari sembilan, jadi ada simpanan. Simpanannya masuk ke kolom apa? ${akhir}`;
    case "kurang":
      if (l.hasil === "total") return `${aw}: lihat ${g} ini. ${l.d.nama[0]} ${fmt(l.d.a)} dikurangi ${l.d.nama[1]} ${fmt(l.d.b)}. Kurangkan bersusun, pinjam bila perlu. Hasilnya berapa ${l.d.satuan}? ${akhir}`;
      if (l.hasil === "tulis") return `${aw}: lihat ${g} ini. Kurangkan ${fmt(l.d.a)} dengan ${fmt(l.d.b)} bersusun. Angka yang ditulis di kolom ${kolomTanya(l.kol)} pada hasilnya berapa? ${akhir}`;
      return `${aw}: lihat ${g} ini. Kurangkan ${fmt(l.d.a)} dengan ${fmt(l.d.b)} bersusun. Kolom ${kolomTanya(l.kol)} perlu meminjam. Pinjaman diambil dari kolom apa? ${akhir}`;
    case "kali":
      if (l.hasil === "total") return `${aw}: lihat ${g} ini. ${l.d.nama[0]}: ${l.d.b} buah, harga sebuah ${fmt(l.d.a)} ${l.d.satuan}. Pisah pengali ${l.d.b}, lalu kalikan. Harga seluruhnya berapa ${l.d.satuan}? ${akhir}`;
      if (l.hasil === "tulis") return `${aw}: lihat ${g} ini. Kalikan ${fmt(l.d.a)} dengan ${l.d.b}. Angka di kolom ${kolomTanya(l.kol)} pada hasilnya berapa? ${akhir}`;
      if (l.hasil === "bagian") return `${aw}: lihat ${g} ini. Pengali ${l.d.b} dipisah menjadi sepuluh dan satu bilangan lagi. Bilangan itu berapa? ${akhir}`;
      if (l.hasil === "pisah") return `${aw}: lihat ${g} ini. Pengali ${l.d.b} dipisah menjadi ${l.d.b % 10} dan satu bilangan lagi. Bilangan itu berapa? ${akhir}`;
      return `${aw}: lihat ${g} ini. Pengali ${l.d.b} sudah dipisah, dan tiap bagian sudah dikalikan. Hasil kedua bagian itu dikurangi atau ditambah? ${akhir}`;
    case "bagi":
      if (l.hasil === "total") return `${aw}: lihat ${g} ini. ${l.d.nama[0]} ${fmt(l.d.a)} dibagi rata ke ${l.d.b} bagian. Bagi per kolom dari kiri. Tiap bagian berapa ${l.d.satuan}? ${akhir}`;
      return `${aw}: lihat ${g} ini. Bagi ${fmt(l.d.a)} dengan ${l.d.b} per kolom. Angka di kolom ${kolomTanya(l.kol)} pada hasilnya berapa? ${akhir}`;
    case "cek": {
      const b = balikCek(l.op, l.d.a, l.d.b);
      const balik = `${BALIK_OP[l.op]} ${fmt(l.d.b)}`;
      if (l.hasil === "kembali") return `${aw}: lihat ${g} ini. ${kapital(HASIL_OP[l.op])} adalah ${fmt(b.hasil)} ${l.d.satuan}. Untuk cek, ${balik}. Bilangan apa yang muncul? ${akhir}`;
      if (l.hasil === "digit") return `${aw}: lihat ${g} ini. ${kapital(HASIL_OP[l.op])} adalah ${fmt(b.hasil)} ${l.d.satuan}. Untuk cek, ${balik}. Angka di kolom ${kolomTanya(l.kol)} dari bilangan yang muncul berapa? ${akhir}`;
      if (l.hasil === "operasi") return `${aw}: lihat ${g} ini. ${l.d.nama[0]} ${fmt(l.d.a)} ${NAMA_OP[l.op]} dengan ${fmt(l.d.b)}, hasilnya ${fmt(b.hasil)} ${l.d.satuan}. Cek memakai operasi kebalikan. Operasi apa? ${akhir}`;
      return `${aw}: lihat ${g} ini. Panitia menulis ${fmt(l.d.a)} ${SIMBOL_OP[l.op]} ${fmt(l.d.b)} = ${fmt(l.klaim ?? 0)} ${l.d.satuan}. Setelah dibalik, hasil itu benar atau salah? ${akhir}`;
    }
  }
}
/** Pertanyaan di atas pilihan atau jawaban. */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  void cara;
  return kapKal(kalimatTanyaMentah(dasarDari(l)));
}
function kalimatTanyaMentah(d: LangkahDasar): string {
  switch (d.tipe) {
    case "rencana":
      return "Cara mana yang paling cocok?";
    case "jumlah":
      return d.hasil === "total" ? `Jumlahnya berapa ${d.d.satuan}?` : d.hasil === "tulis" ? "Angka yang ditulis berapa?" : "Simpanannya masuk ke kolom apa?";
    case "kurang":
      return d.hasil === "total" ? `Hasilnya berapa ${d.d.satuan}?` : d.hasil === "tulis" ? "Angka yang ditulis berapa?" : "Pinjaman diambil dari kolom apa?";
    case "kali":
      return d.hasil === "total" ? `Hasilnya berapa ${d.d.satuan}?` : d.hasil === "tulis" ? "Angka di kolom itu berapa?" : d.hasil === "bagian" ? "Bilangan itu berapa?" : d.hasil === "pisah" ? "Bilangan apa itu?" : "Ditambah atau dikurang?";
    case "bagi":
      return d.hasil === "total" ? `Tiap bagian berapa ${d.d.satuan}?` : "Angka di kolom itu berapa?";
    case "cek":
      return d.hasil === "kembali" ? "Bilangan apa yang muncul?" : d.hasil === "digit" ? "Angka di kolom itu berapa?" : d.hasil === "operasi" ? "Operasi kebalikannya apa?" : "Hasil itu benar atau salah?";
  }
}
/** Petunjuk saat jawaban salah: mengarahkan tanpa menyebut hasil benar. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. Pikirkan lagi apa yang ${l.tokoh} lakukan.`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "rencana":
      return "Baca lagi apa yang dikerjakan panitia: menjumlah atau mengurang, mengalikan dengan pengali dua angka, atau membagi rata.";
    case "jumlah":
      return "Jumlahkan dari kolom paling kanan. Bila jumlah satu kolom lebih dari sembilan, tulis satu angka dan simpan sisanya ke kolom kiri.";
    case "kurang":
      return "Kurangkan dari kolom paling kanan. Bila angka atas lebih kecil, pinjam dari kolom kiri yang tidak nol.";
    case "kali":
      return "Pisah pengali menurut kolomnya, kalikan tiap bagian dengan bilangan besarnya, lalu jumlahkan semua bagian.";
    case "bagi":
      return "Bagi dari kolom paling kiri. Sisa di satu kolom ditukar menjadi sepuluh di kolom sebelah kanannya.";
    case "cek":
      return "Pakai operasi kebalikan dari hitungan awal, lalu lihat bilangan yang muncul.";
  }
}

/* ------------------------------ Isi gambar ------------------------------ */
export type Tanda = "" | "+" | "−" | "×" | ":";
export type BarisPapan = { label: string; angka: number | null; tanda: Tanda };
/** Isi papan kolom hitung: baris bilangan (null = hasil yang dicari, tampil "?"), kolom yang disorot, dan judul. */
export type Papan = { judul: string; baris: BarisPapan[]; sorot: number[]; satuan: string };
const baris = (label: string, angkaB: number | null, tanda: Tanda = ""): BarisPapan => ({ label, angka: angkaB, tanda });

/** Papan kolom hitung untuk tugas yang memuat bilangan, atau null (tugas memilih cara tidak memuat papan). */
export function modelPapan(d: LangkahDasar): Papan | null {
  switch (d.tipe) {
    case "rencana":
      return null;
    case "jumlah": {
      const sorot = d.hasil === "tulis" ? [d.kol ?? 0] : d.hasil === "simpan" ? [d.kol ?? 0, tujuanSimpan(d)] : [];
      return { judul: "Jumlah", satuan: d.d.satuan, baris: [baris(d.d.nama[0], d.d.a), baris(d.d.nama[1], d.d.b, "+"), baris("Jumlah", null)], sorot };
    }
    case "kurang": {
      const sorot = d.hasil === "tulis" ? [d.kol ?? 0] : d.hasil === "sumber" ? [d.kol ?? 0] : [];
      return { judul: "Selisih", satuan: d.d.satuan, baris: [baris(d.d.nama[0], d.d.a), baris(d.d.nama[1], d.d.b, "−"), baris("Selisih", null)], sorot };
    }
    case "kali":
      return {
        judul: "Kali",
        satuan: d.d.satuan,
        baris: [baris("Harga", d.d.a), baris("Banyak", d.d.b, "×"), baris(d.hasil === "gabung" ? "Bagian" : "Hasil", null)],
        sorot: d.hasil === "tulis" ? [d.kol ?? 0] : d.hasil === "bagian" || d.hasil === "pisah" ? [1] : [],
      };
    case "bagi":
      return { judul: "Bagi", satuan: d.d.satuan, baris: [baris(d.d.nama[0], d.d.a), baris("Bagi", d.d.b, ":"), baris("Hasil", null)], sorot: d.hasil === "digit" ? [d.kol ?? 0] : [] };
    case "cek": {
      const b = balikCek(d.op, d.d.a, d.d.b);
      if (d.hasil === "kembali" || d.hasil === "digit")
        return { judul: "Cek", satuan: d.d.satuan, baris: [baris("Hasil", b.hasil), baris(d.op === "kali" ? "Pembagi" : d.op === "bagi" ? "Pengali" : d.d.nama[1], d.d.b, SIMBOL_BALIK[d.op]), baris("Muncul", null)], sorot: d.hasil === "digit" ? [d.kol ?? 0] : [] };
      if (d.hasil === "operasi") return { judul: "Hitungan", satuan: d.d.satuan, baris: [baris(d.d.nama[0], d.d.a), baris(d.d.nama[1], d.d.b, SIMBOL_OP[d.op]), baris("Hasil", b.hasil)], sorot: [] };
      return { judul: "Hitungan", satuan: d.d.satuan, baris: [baris(d.d.nama[0], d.d.a), baris(d.d.nama[1], d.d.b, SIMBOL_OP[d.op]), baris("Ditulis", d.klaim ?? 0)], sorot: [] };
    }
  }
}

/** Isi kartu kata untuk tahap Abstract (kata dan angka bercap panitia, tanpa emoji dan tanpa menyebut gambar). */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  const lembar = "lembar hitung panitia stadion";
  switch (l.tipe) {
    case "rencana":
      return [lembar, `keadaan: ${RENCANA[l.r].teks.replace(/\.$/, "").toLowerCase()}`, cara === "kanvas" ? "nomor cara (1 susun, 2 pisah, 3 bagi): ?" : "cara yang cocok: ?"];
    case "jumlah":
      return [lembar, `${l.d.nama[0].toLowerCase()}: ${fmt(l.d.a)}`, `${l.d.nama[1].toLowerCase()}: + ${fmt(l.d.b)}`, l.hasil === "total" ? `jumlah (${l.d.satuan}): ?` : l.hasil === "tulis" ? `angka ditulis di kolom ${kolomTanya(l.kol)}: ?` : `simpanan dari kolom ${kolomTanya(l.kol)} masuk ke kolom: ?`];
    case "kurang":
      return [lembar, `${l.d.nama[0].toLowerCase()}: ${fmt(l.d.a)}`, `${l.d.nama[1].toLowerCase()}: − ${fmt(l.d.b)}`, l.hasil === "total" ? `selisih (${l.d.satuan}): ?` : l.hasil === "tulis" ? `angka ditulis di kolom ${kolomTanya(l.kol)}: ?` : `kolom ${kolomTanya(l.kol)} meminjam dari kolom: ?`];
    case "kali":
      return [lembar, `harga sebuah: ${fmt(l.d.a)} ${l.d.satuan}`, `banyak: × ${l.d.b}`, l.hasil === "total" ? `harga seluruhnya (${l.d.satuan}): ?` : l.hasil === "tulis" ? `angka di kolom ${kolomTanya(l.kol)} pada hasil: ?` : l.hasil === "bagian" ? `${l.d.b} = 10 + ?` : l.hasil === "pisah" ? `${l.d.b} = ? + ${l.d.b % 10}` : "hasil bagian digabung dengan: ?"];
    case "bagi":
      return [lembar, `${l.d.nama[0].toLowerCase()}: ${fmt(l.d.a)}`, `dibagi: ${l.d.b}`, l.hasil === "total" ? `tiap bagian (${l.d.satuan}): ?` : `angka di kolom ${kolomTanya(l.kol)} pada hasil: ?`];
    case "cek": {
      const b = balikCek(l.op, l.d.a, l.d.b);
      if (l.hasil === "kembali" || l.hasil === "digit") return [lembar, `${HASIL_OP[l.op]}: ${fmt(b.hasil)} ${l.d.satuan}`, `${l.op === "jumlah" ? "dikurangi" : l.op === "kurang" ? "ditambah" : l.op === "kali" ? "dibagi" : "dikali"}: ${fmt(l.d.b)}`, l.hasil === "kembali" ? "bilangan yang muncul: ?" : `angka di kolom ${kolomTanya(l.kol)} dari bilangan itu: ?`];
      if (l.hasil === "operasi") return [lembar, `${l.d.nama[0].toLowerCase()}: ${fmt(l.d.a)}`, `${l.d.nama[1].toLowerCase()}: ${SIMBOL_OP[l.op]} ${fmt(l.d.b)}`, `hasil: ${fmt(b.hasil)} ${l.d.satuan}`, "operasi untuk cek: ?"];
      return [lembar, `${fmt(l.d.a)} ${SIMBOL_OP[l.op]} ${fmt(l.d.b)} = ${fmt(l.klaim ?? 0)} ${l.d.satuan}`, "hasil setelah dibalik: ?"];
    }
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
/** Keterangan di bawah gambar Concrete dan Pictorial: baris tanya terakhir kartu. */
export function ketGambar(d: LangkahDasar, cara?: Cara): string[] {
  const kartu = barisKartu(d, cara);
  return [kartu[kartu.length - 1]];
}
