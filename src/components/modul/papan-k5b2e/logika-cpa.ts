/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 5 Bab 2 Sub-Bab E "Papan Bilangan Kak Lintang" (bilangan prima, saringan Eratosthenes, faktorisasi prima dan pohon faktor,
 * KPK dan FPB dari faktorisasi, pembagian berulang), akhir cerita Pasar Kuliner Malam. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-papan-k5b2e.mjs.
 * Jawaban benar DIHITUNG dari logika-data.ts (prima, saringan, faktorisasi, pembagian berulang). Empat metode tiap misi: IGIL "Saring, Pohon Faktor, Bagi Berulang" (memilih cara),
 * Sieve It (Saring), Factor Tree (Pohon Faktor), dan Divide Down (Bagi Berulang).
 * Jawaban: memilih (klik), menulis SATU angka 1 sampai 9 di kanvas, dan mengucapkan satu kata atau satu bilangan (rekam suara, selalu dengan pilihan ketuk).
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { ejaK5B1, kataK5B1 } from "../eja-k5b1";
import { faktorisasi, fmt, laPrima, pembagianBerulang, primaSampai, primaSesudah, kelipatanBerikut, susun3, tulisKali, type NodePohon, type BarisBagi, type LangkahSaring } from "./logika-data";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";
export type { NodePohon, BarisBagi, LangkahSaring };

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);
/** Awal tiap kalimat berhuruf kapital. */
const kapKal = (t: string): string => t.replace(/(^|[.?!]\s+)([a-z])/g, (_m, a: string, b: string) => a + b.toUpperCase());

/* ------------------------------ Kata bilangan dan ucapan ------------------------------ */
/** Nama bilangan dalam kata (tanpa digit). */
export const kata = kataK5B1;
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
export const NAMA_TIGA_CARA = ["Saring", "Pohon Faktor", "Bagi Berulang"] as const;
export const KATA_TIGA_CARA = ["saring", "pohon", "bagi"] as const;
/** Situasi pasar malam dan cara yang paling cocok (indeks pada NAMA_TIGA_CARA). */
export const RENCANA: { teks: string; cara: 0 | 1 | 2 }[] = [
  { teks: "Kak Lintang ingin menemukan semua bilangan prima yang tersisa di tabel bilangan sampai empat puluh.", cara: 0 },
  { teks: "Bu Marni ingin menulis lima puluh empat sebagai hasil kali bilangan prima, memecahnya satu langkah demi satu langkah.", cara: 1 },
  { teks: "Pak Joko ingin KPK dan FPB tiga bilangan sekaligus dalam satu tabel pembagi prima.", cara: 2 },
  { teks: "Fajar ingin tahu bilangan prima mana saja yang tersisa setelah semua kelipatan dihapus dari tabel.", cara: 0 },
  { teks: "Panitia ingin memecah seratus delapan menjadi ujung-ujung yang semuanya prima.", cara: 1 },
  { teks: "Bu Wati ingin mencari KPK dua bilangan dengan membagi berulang memakai bilangan prima.", cara: 2 },
];

/* ------------------------------ Jenis tugas ------------------------------ */
type Pil = [string, string, string];
/** Cara (IGIL): memilih cara yang cocok untuk keadaan (klik: nama cara; kanvas: nomor cara 1 sampai 3; suara: satu kata). */
export type LRencana = { tipe: "rencana"; r: number; pil?: Pil };
/** Sieve It (Saring): prima (klik: pilih bilangan prima di antara tiga), hapus (klik: bilangan yang ikut terhapus; kanvas: banyak yang terhapus), banyakPrima (kanvas),
 * berikut (suara: prima yang diambil berikutnya), klaimPrima (suara: benar atau salah). */
export type LPrima = { tipe: "prima"; pil: Pil };
export type LHapus = { tipe: "hapus"; batas: number; p: number; hasil: "pilih" | "banyak"; pil?: Pil };
export type LBanyakPrima = { tipe: "banyakPrima"; batas: number };
export type LBerikut = { tipe: "berikut"; sesudah: number; batas: number };
export type LKlaimPrima = { tipe: "klaimPrima"; n: number };
/** Factor Tree (Pohon Faktor): daun (klik: faktorisasi prima), banyak (kanvas: banyak daun), beda (kanvas: banyak prima berbeda), terbesar dan terkecil (suara: bilangan prima). */
export type HasilFaktor = "daun" | "banyak" | "beda" | "terbesar" | "terkecil";
export type LFaktor = { tipe: "faktor"; n: number; hasil: HasilFaktor; pil?: Pil };
/** Divide Down (Bagi Berulang): kpk dan fpb (klik), banyak baris dan pembagi ke-k (kanvas), pembagi terakhir (suara), klaim KPK benar atau salah (suara). */
export type HasilUlang = "kpk" | "fpb" | "banyak" | "pembagiKe" | "terakhir" | "klaim";
export type LUlang = { tipe: "ulang"; bil: number[]; hasil: HasilUlang; ke?: number; klaim?: number; satuan?: string; nama?: string[]; pil?: Pil };
export type LangkahDasar = LRencana | LPrima | LHapus | LBanyakPrima | LBerikut | LKlaimPrima | LFaktor | LUlang;
/** Tugas yang boleh dibungkus Cari kesalahan (jawabannya pilihan klik). */
export type DasarSalah = LRencana | LPrima | LHapus | LFaktor | LUlang;
export type LangkahSalah = { tipe: "salah"; dasar: DasarSalah; tokoh: string; kataTokoh: string; jawabTokoh: string; alasan: [string, string, string]; benar: number; betul?: boolean; posisi?: number };
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "saring" | "pohon" | "bagi";
export const URUT_METODE: Metode[] = ["igil", "saring", "pohon", "bagi"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Saring, Pohon Faktor, Bagi Berulang",
  saring: "Sieve It: Saring",
  pohon: "Factor Tree: Pohon Faktor",
  bagi: "Divide Down: Bagi Berulang",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F9EE}", saring: "\u{1F50E}", pohon: "\u{1F333}", bagi: "\u{2797}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", saring: "Sieve It", pohon: "Factor Tree", bagi: "Divide Down" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };
export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const sebutan = (s: string): Kunci => ({ jenis: "nama", nama: s });
const teksN = (n: number, satuan?: string): string => (satuan ? `${fmt(n)} ${satuan}` : fmt(n));

/** Pembagian berulang tugas ulang. */
export const hitungUlang = (l: LUlang) => pembagianBerulang(l.bil);
/** Banyak bilangan yang ikut terhapus pada tugas hapus. */
export const hapusBanyak = (l: LHapus): number => kelipatanBerikut(l.p, l.batas).length;
/** Bilangan di antara pilihan yang ikut terhapus (kelipatan p yang lebih besar dari p). */
export const hapusPilih = (l: LHapus): number[] => (l.pil ?? ["", "", ""]).map(Number).filter((n) => n > l.p && n % l.p === 0);
/** Bilangan prima di antara pilihan tugas prima. */
export const primaPilih = (l: LPrima): number[] => l.pil.map(Number).filter(laPrima);
/** Pilihan faktorisasi yang semuanya prima dan hasil kalinya sama dengan n. */
export const daunBenar = (l: LFaktor): string[] => (l.pil ?? ["", "", ""]).filter((t) => t.split(" × ").map(Number).every(laPrima) && t.split(" × ").map(Number).reduce((a, b) => a * b, 1) === l.n);
/** Apakah klaim KPK pada tugas ulang benar? */
export const klaimUlangBenar = (l: LUlang): boolean => hitungUlang(l).kpk === l.klaim;
/** Bilangan prima berikutnya yang diambil pada tugas berikut. */
export const berikutPrima = (l: LBerikut): number => primaSesudah(l.sesudah);

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari logika murni. null untuk kombinasi yang tidak dipakai. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "rencana":
      return cara === "klik" ? sebutan(NAMA_TIGA_CARA[RENCANA[l.r].cara]) : cara === "kanvas" ? angka(RENCANA[l.r].cara + 1) : sebutan(KATA_TIGA_CARA[RENCANA[l.r].cara]);
    case "prima":
      return cara === "klik" ? sebutan(String(primaPilih(l)[0])) : null;
    case "hapus":
      return l.hasil === "pilih" ? (cara === "klik" ? sebutan(String(hapusPilih(l)[0])) : null) : cara === "kanvas" ? angka(hapusBanyak(l)) : null;
    case "banyakPrima":
      return cara === "kanvas" ? angka(primaSampai(l.batas).length) : null;
    case "berikut":
      return cara === "suara" ? angka(berikutPrima(l)) : null;
    case "klaimPrima":
      return cara === "suara" ? sebutan(laPrima(l.n) ? "benar" : "salah") : null;
    case "faktor": {
      const f = faktorisasi(l.n);
      if (l.hasil === "daun") return cara === "klik" ? sebutan(tulisKali(f)) : null;
      if (l.hasil === "banyak") return cara === "kanvas" ? angka(f.length) : null;
      if (l.hasil === "beda") return cara === "kanvas" ? angka(new Set(f).size) : null;
      if (l.hasil === "terbesar") return cara === "suara" ? angka(f[f.length - 1]) : null;
      return cara === "suara" ? angka(f[0]) : null;
    }
    case "ulang": {
      const h = hitungUlang(l);
      if (l.hasil === "kpk") return cara === "klik" ? sebutan(teksN(h.kpk, l.satuan)) : null;
      if (l.hasil === "fpb") return cara === "klik" ? sebutan(teksN(h.fpb, l.satuan)) : null;
      if (l.hasil === "banyak") return cara === "kanvas" ? angka(h.pembagi.length) : null;
      if (l.hasil === "pembagiKe") return cara === "kanvas" ? angka(h.pembagi[(l.ke ?? 1) - 1]) : null;
      if (l.hasil === "terakhir") return cara === "suara" ? angka(h.pembagi[h.pembagi.length - 1]) : null;
      return cara === "suara" ? sebutan(klaimUlangBenar(l) ? "benar" : "salah") : null;
    }
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
/** Pilihan klik: tiga pilihan dari data tugas (jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh pada Cari kesalahan selalu ikut). */
export function pilihanKlik(l: Langkah): string[] {
  const d = dasarDari(l);
  if (d.tipe === "rencana") {
    if (d.pil) return [...d.pil];
    const benar = RENCANA[d.r].cara;
    const lain = [0, 1, 2].filter((i) => i !== benar).map((i) => NAMA_TIGA_CARA[i]) as [string, string];
    return susun3<string>(NAMA_TIGA_CARA[benar], lain, posisiDari(d));
  }
  if ("pil" in d && d.pil) return [...d.pil];
  return [];
}
/** Dua bilangan pengecoh yang berbeda dari benar dan satu sama lain untuk jawaban suara berupa bilangan. */
const duaPengecoh = (benar: number): [number, number] => {
  const kandidat = [benar + 1, benar - 1, benar + 2, benar - 2, benar + 3].filter((x) => x > 0 && x !== benar);
  return [kandidat[0], kandidat[1]];
};
/** Pilihan cadangan untuk tugas suara (kata atau bilangan dalam kata): jawaban benar di posisi kedua atau ketiga. */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k) return [];
  const d = dasarDari(l);
  const p = posisiDari(d);
  if (k.jenis === "angka") {
    const [x, y] = duaPengecoh(k.n);
    return susun3<string>(kata(k.n), [kata(x), kata(y)], p);
  }
  let lain: [string, string];
  if (d.tipe === "rencana") lain = KATA_TIGA_CARA.filter((x) => x !== k.nama) as unknown as [string, string];
  else lain = ["benar", "salah", "mungkin"].filter((x) => x !== k.nama) as [string, string];
  return susun3<string>(k.nama, lain, p);
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kata(k.n));
/** Teks pilihan klik yang benar. */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  if (!k) return null;
  return k.jenis === "nama" ? k.nama : String(k.n);
}
/** Pilihan klik ditampilkan berhuruf awal kapital untuk nama cara. */
export const tampilPilihan = (t: string): string => (/^\d/.test(t) ? t : kapital(t));

/* ------------------------------ Kalimat ------------------------------ */
const sebutBidang = (rupa: Rupa): string => (rupa === "lambang" ? "lembar" : rupa === "benda" ? "papan bilangan" : "diagram");
const daftar = (xs: number[]): string => xs.join(", ");

export function kalimatKunci(l: Langkah, cara: Cara): string {
  return kapKal(kalimatKunciMentah(l, cara));
}
function kalimatKunciMentah(l: Langkah, cara: Cara): string {
  void cara;
  const d = dasarDari(l);
  switch (d.tipe) {
    case "rencana": {
      const c = RENCANA[d.r].cara;
      return c === 0 ? "Untuk menemukan semua bilangan prima di satu tabel, saring: hapus kelipatannya satu per satu." : c === 1 ? "Untuk menulis bilangan sebagai hasil kali prima, pecah dengan pohon faktor satu langkah demi satu langkah." : "Untuk KPK atau FPB beberapa bilangan sekaligus, bagi berulang dengan prima dalam satu tabel.";
    }
    case "prima": {
      const p = primaPilih(d)[0];
      const lain = d.pil.map(Number).filter((n) => n !== p);
      return `Bilangan ${p} hanya punya dua faktor, jadi prima, sedangkan ${lain.map((x) => `${x} habis dibagi ${faktorisasi(x)[0]}`).join(" dan ")}.`;
    }
    case "hapus": {
      const semua = kelipatanBerikut(d.p, d.batas);
      return d.hasil === "pilih" ? `Kelipatan ${d.p} sesudah ${d.p} dihapus, yaitu ${daftar(semua)}, jadi ${hapusPilih(d)[0]} ikut terhapus.` : `Kelipatan ${d.p} sesudah ${d.p} yang dihapus adalah ${daftar(semua)}, jadi ada ${semua.length} bilangan.`;
    }
    case "banyakPrima": {
      const pr = primaSampai(d.batas);
      return `Bilangan prima sampai ${d.batas} adalah ${daftar(pr)}, jadi ada ${pr.length} bilangan.`;
    }
    case "berikut":
      return `Setelah bilangan prima ${d.sesudah}, bilangan prima berikutnya yang tersisa di tabel adalah ${berikutPrima(d)}.`;
    case "klaimPrima":
      return laPrima(d.n) ? `Bilangan ${d.n} hanya habis dibagi satu dan ${d.n}, jadi prima, dan catatan itu benar.` : `Bilangan ${d.n} habis dibagi ${faktorisasi(d.n)[0]}, jadi punya lebih dari dua faktor dan bukan prima, sehingga catatan itu salah.`;
    case "faktor": {
      const f = faktorisasi(d.n);
      const t = tulisKali(f);
      if (d.hasil === "daun") return `Pohon faktor ${d.n} berujung pada ${t}, dan hasil kali ujungnya kembali ke ${d.n}.`;
      if (d.hasil === "banyak") return `Faktorisasi prima ${d.n} adalah ${t}, jadi pohonnya punya ${f.length} daun.`;
      if (d.hasil === "beda") return `Faktorisasi prima ${d.n} adalah ${t}, dengan ${new Set(f).size} prima yang berbeda.`;
      return d.hasil === "terbesar" ? `Daun pohon ${d.n} adalah ${t}, dan yang terbesar adalah ${f[f.length - 1]}.` : `Daun pohon ${d.n} adalah ${t}, dan yang terkecil adalah ${f[0]}.`;
    }
    case "ulang": {
      const h = hitungUlang(d);
      if (d.hasil === "kpk") return `Pembagi primanya ${daftar(h.pembagi)}, dan hasil kalinya adalah KPK, yaitu ${teksN(h.kpk, d.satuan)}.`;
      if (d.hasil === "fpb") {
        const semua = h.baris.filter((b) => b.semua).map((b) => b.p);
        return semua.length ? `Pembagi yang membagi semua bilangan pada barisnya: ${semua.join(" × ")}, jadi FPB-nya ${teksN(h.fpb, d.satuan)}.` : `Tidak ada pembagi yang membagi semua bilangan pada barisnya, jadi FPB-nya ${teksN(h.fpb, d.satuan)}.`;
      }
      if (d.hasil === "banyak") return `Pembagi primanya ${daftar(h.pembagi)}, jadi ada ${h.pembagi.length} baris pembagi.`;
      if (d.hasil === "pembagiKe") return `Pembagi primanya berurutan ${daftar(h.pembagi)}, jadi pembagi ke ${d.ke} adalah ${h.pembagi[(d.ke ?? 1) - 1]}.`;
      if (d.hasil === "terakhir") return `Pembagi primanya berurutan ${daftar(h.pembagi)}, dan yang terakhir adalah ${h.pembagi[h.pembagi.length - 1]}.`;
      return klaimUlangBenar(d) ? `Hasil kali semua pembagi adalah ${h.kpk}, jadi catatan itu benar.` : `Hasil kali semua pembagi adalah ${h.kpk}, bukan ${d.klaim}, jadi catatan itu salah.`;
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
  if (l.tipe === "rencana") return "Ucapkan satu kata: saring, pohon, atau bagi.";
  if (l.tipe === "klaimPrima" || (l.tipe === "ulang" && l.hasil === "klaim")) return "Ucapkan satu kata: benar atau salah.";
  return "Ucapkan satu bilangan.";
}
const ketNama = (l: LUlang): string => (l.nama ? `${l.nama[0]} ${l.bil[0]} dan ${l.nama[1]} ${l.bil[1]}${l.bil.length > 2 ? ` dan ${l.nama[2] ?? "satu lagi"} ${l.bil[2]}` : ""}` : `Bilangan ${l.bil.join(", ")}`);
function instruksiMentah(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebutBidang(rupa);
  const aw = AWALAN[metode];
  const akhir = akhirTugas(l, cara);
  switch (l.tipe) {
    case "rencana":
      return `${aw}: ${RENCANA[l.r].teks} ${cara === "kanvas" ? "Cara ke berapa: satu Saring, dua Pohon Faktor, atau tiga Bagi Berulang?" : "Cara mana yang paling cocok?"} ${akhir}`;
    case "prima":
      return `${aw}: lihat ${g} ini. Di antara bilangan ${l.pil.join(", ")}, mana bilangan prima? ${akhir}`;
    case "hapus":
      return l.hasil === "pilih"
        ? `${aw}: lihat ${g} ini. Tabel bilangan sampai ${l.batas}. Bilangan prima ${l.p} diambil, lalu semua kelipatan ${l.p} sesudahnya dihapus. Bilangan mana yang ikut terhapus? ${akhir}`
        : `${aw}: lihat ${g} ini. Tabel bilangan sampai ${l.batas}. Bilangan prima ${l.p} diambil, lalu semua kelipatan ${l.p} sesudahnya dihapus. Hitung semua kelipatan itu, juga yang sudah terhapus lebih dulu oleh prima lain. Ada berapa bilangan yang dihapus? ${akhir}`;
    case "banyakPrima":
      return `${aw}: lihat ${g} ini. Tabel bilangan satu sampai ${l.batas} disaring sampai tidak ada yang bisa dihapus lagi. Ada berapa bilangan prima yang tersisa? ${akhir}`;
    case "berikut":
      return `${aw}: lihat ${g} ini. Tabel bilangan sampai ${l.batas}. Bilangan prima sampai ${l.sesudah} sudah diambil dan kelipatannya terhapus. Bilangan prima apa yang diambil berikutnya? ${akhir}`;
    case "klaimPrima":
      return `${aw}: lihat ${g} ini. Pengelola menulis: ${l.n} adalah bilangan prima. Catatan itu benar atau salah? ${akhir}`;
    case "faktor":
      if (l.hasil === "daun") return `${aw}: lihat ${g} ini. Pohon faktor ${l.n} dipecah sampai semua ujungnya prima. Faktorisasi prima ${l.n} yang mana? ${akhir}`;
      if (l.hasil === "banyak") return `${aw}: lihat ${g} ini. Pohon faktor ${l.n} dipecah sampai semua ujungnya prima. Ada berapa daun, yaitu bilangan prima di ujungnya? ${akhir}`;
      if (l.hasil === "beda") return `${aw}: lihat ${g} ini. Pohon faktor ${l.n} dipecah sampai semua ujungnya prima. Ada berapa bilangan prima yang berbeda di ujungnya? ${akhir}`;
      return `${aw}: lihat ${g} ini. Pohon faktor ${l.n} dipecah sampai semua ujungnya prima. Bilangan prima ${l.hasil === "terbesar" ? "terbesar" : "terkecil"} di ujungnya berapa? ${akhir}`;
    case "ulang": {
      const h = `${ketNama(l)}. Dibagi berulang dengan bilangan prima sampai semuanya satu.`;
      if (l.hasil === "kpk") return `${aw}: lihat ${g} ini. ${h} KPK-nya berapa${l.satuan ? ` ${l.satuan}` : ""}? ${akhir}`;
      if (l.hasil === "fpb") return `${aw}: lihat ${g} ini. ${h} FPB-nya berapa${l.satuan ? ` ${l.satuan}` : ""}? ${akhir}`;
      if (l.hasil === "banyak") return `${aw}: lihat ${g} ini. ${h} Ada berapa baris pembagi? ${akhir}`;
      if (l.hasil === "pembagiKe") return `${aw}: lihat ${g} ini. ${h} Pembagi prima ke ${l.ke} berapa? ${akhir}`;
      if (l.hasil === "terakhir") return `${aw}: lihat ${g} ini. ${h} Pembagi prima yang terakhir berapa? ${akhir}`;
      return `${aw}: lihat ${g} ini. ${ketNama(l)}. Pengelola menulis KPK-nya ${l.klaim}. Setelah dibagi berulang, catatan itu benar atau salah? ${akhir}`;
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
    case "prima":
      return "Mana bilangan prima?";
    case "hapus":
      return d.hasil === "pilih" ? "Bilangan mana yang ikut terhapus?" : "Ada berapa bilangan yang ikut terhapus?";
    case "banyakPrima":
      return "Ada berapa bilangan prima yang tersisa?";
    case "berikut":
      return "Bilangan prima apa yang diambil berikutnya?";
    case "klaimPrima":
      return "Catatan itu benar atau salah?";
    case "faktor":
      return d.hasil === "daun" ? "Faktorisasi prima yang mana?" : d.hasil === "banyak" ? "Ada berapa daun?" : d.hasil === "beda" ? "Ada berapa prima yang berbeda?" : d.hasil === "terbesar" ? "Prima terbesar berapa?" : "Prima terkecil berapa?";
    case "ulang":
      return d.hasil === "kpk" ? "KPK-nya berapa?" : d.hasil === "fpb" ? "FPB-nya berapa?" : d.hasil === "banyak" ? "Ada berapa baris pembagi?" : d.hasil === "pembagiKe" ? "Pembagi itu berapa?" : d.hasil === "terakhir" ? "Pembagi terakhir berapa?" : "Catatan itu benar atau salah?";
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
      return "Baca lagi apa yang dikerjakan: mencari semua prima di satu tabel, memecah satu bilangan menjadi prima, atau membagi beberapa bilangan sekaligus.";
    case "prima":
      return "Bilangan prima hanya punya dua faktor. Periksa tiap bilangan: adakah pembagi selain satu dan bilangan itu sendiri?";
    case "hapus":
      return "Setelah bilangan prima itu diambil, yang ikut terhapus adalah kelipatannya yang lebih besar, yaitu yang habis dibagi bilangan itu.";
    case "banyakPrima":
      return "Hapus satu, lalu saring kelipatan dua, tiga, dan seterusnya. Hitung bilangan yang tersisa di tabel.";
    case "berikut":
      return "Bilangan yang sudah terhapus tidak diambil. Cari bilangan terkecil yang masih tersisa sesudah prima itu.";
    case "klaimPrima":
      return "Cari pembagi selain satu dan bilangan itu sendiri. Kalau ada, bilangan itu bukan prima.";
    case "faktor":
      return "Pecah bilangan sampai semua ujungnya prima, lalu periksa apakah hasil kali ujungnya kembali ke bilangan semula.";
    case "ulang":
      return l.hasil === "kpk"
        ? "Kalikan semua pembagi prima di tabel pembagian berulang."
        : l.hasil === "fpb"
          ? "Kalikan hanya pembagi yang membagi semua bilangan pada barisnya."
          : l.hasil === "banyak"
            ? "Hitung baris pembagi sampai semua bilangan menjadi satu."
            : l.hasil === "pembagiKe"
              ? "Baca pembagi dari baris paling atas ke bawah dan perhatikan urutannya."
              : l.hasil === "terakhir"
                ? "Pembagi terakhir ada di baris paling bawah tabel."
                : "Kalikan semua pembagi prima, lalu bandingkan dengan bilangan yang ditulis pengelola.";
  }
}

/* ------------------------------ Isi gambar ------------------------------ */
/** Model gambar Concrete dan Pictorial: kartu bilangan, tabel bilangan (dengan bilangan prima yang diambil dilingkari), pohon faktor yang baru dipecah satu kali, atau tabel pembagian berulang. */
export type ModelGambar =
  | { jenis: "kartu"; bilangan: number[]; judul: string }
  | { jenis: "tabel"; batas: number; lingkar: number[]; coret: number[]; judul: string }
  | { jenis: "pohon"; n: number; judul: string }
  | { jenis: "bagi"; bil: number[]; baris: BarisBagi[]; judul: string };

/** Bilangan yang terhapus setelah semua prima sampai `sampai` diambil (satu ikut terhapus). */
export function coretSampai(batas: number, sampai: number): number[] {
  const s = new Set<number>([1]);
  for (const p of primaSampai(sampai)) for (const m of kelipatanBerikut(p, batas)) s.add(m);
  return [...s].sort((a, b) => a - b);
}
/** Model gambar untuk tugas yang memuat bilangan, atau null (tugas memilih cara tidak memuat gambar). */
export function modelGambar(d: LangkahDasar): ModelGambar | null {
  switch (d.tipe) {
    case "rencana":
      return null;
    case "prima":
      return { jenis: "kartu", bilangan: d.pil.map(Number), judul: "Bilangan" };
    case "klaimPrima":
      return { jenis: "kartu", bilangan: [d.n], judul: "Catatan" };
    case "hapus":
      return { jenis: "tabel", batas: d.batas, lingkar: [d.p], coret: [], judul: `Tabel bilangan sampai ${d.batas}` };
    case "banyakPrima":
      return { jenis: "tabel", batas: d.batas, lingkar: [], coret: [], judul: `Tabel bilangan sampai ${d.batas}` };
    case "berikut":
      return { jenis: "tabel", batas: d.batas, lingkar: primaSampai(d.sesudah), coret: coretSampai(d.batas, d.sesudah).filter((n) => !primaSampai(d.sesudah).includes(n)), judul: `Tabel bilangan sampai ${d.batas}` };
    case "faktor":
      return { jenis: "pohon", n: d.n, judul: `Pohon faktor ${d.n}` };
    case "ulang":
      return { jenis: "bagi", bil: d.bil, baris: hitungUlang(d).baris, judul: "Pembagian berulang" };
  }
}

/** Isi kartu kata untuk tahap Abstract (kata dan angka bercap pengelola, tanpa emoji dan tanpa menyebut gambar). */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  const lembar = "lembar pengelola pasar kuliner malam";
  switch (l.tipe) {
    case "rencana":
      return [lembar, `keadaan: ${RENCANA[l.r].teks.replace(/\.$/, "").toLowerCase()}`, cara === "kanvas" ? "nomor cara (1 saring, 2 pohon, 3 bagi): ?" : "cara yang cocok: ?"];
    case "prima":
      return [lembar, `bilangan: ${l.pil.join(", ")}`, "bilangan prima di antaranya: ?"];
    case "hapus":
      return [lembar, `tabel bilangan: 1 sampai ${l.batas}`, `prima yang diambil: ${l.p}`, l.hasil === "pilih" ? "bilangan yang ikut terhapus: ?" : "banyak bilangan yang ikut terhapus: ?"];
    case "banyakPrima":
      return [lembar, `tabel bilangan: 1 sampai ${l.batas}`, "banyak bilangan prima yang tersisa: ?"];
    case "berikut":
      return [lembar, `tabel bilangan: 1 sampai ${l.batas}`, `prima yang sudah diambil: sampai ${l.sesudah}`, "prima berikutnya: ?"];
    case "klaimPrima":
      return [lembar, `catatan: ${l.n} adalah bilangan prima`, "catatan itu: ?"];
    case "faktor":
      return [lembar, `bilangan: ${l.n}`, l.hasil === "daun" ? "faktorisasi prima: ?" : l.hasil === "banyak" ? "banyak daun: ?" : l.hasil === "beda" ? "banyak prima yang berbeda: ?" : l.hasil === "terbesar" ? "prima terbesar: ?" : "prima terkecil: ?"];
    case "ulang": {
      const h = hitungUlang(l);
      const baris = h.baris.map((b) => `pembagi ${b.p}: ${b.sesudah.join(" ")}`);
      const tanya =
        l.hasil === "kpk" ? `KPK${l.satuan ? ` (${l.satuan})` : ""}: ?` : l.hasil === "fpb" ? `FPB${l.satuan ? ` (${l.satuan})` : ""}: ?` : l.hasil === "banyak" ? "banyak baris pembagi: ?" : l.hasil === "pembagiKe" ? `pembagi ke ${l.ke}: ?` : l.hasil === "terakhir" ? "pembagi terakhir: ?" : `KPK yang ditulis: ${l.klaim}; catatan itu: ?`;
      return [lembar, `bilangan: ${l.bil.join(", ")}`, ...baris, tanya];
    }
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
/** Keterangan di bawah gambar Concrete dan Pictorial: baris tanya terakhir kartu. */
export function ketGambar(d: LangkahDasar, cara?: Cara): string[] {
  const kartu = barisKartu(d, cara);
  return [kartu[kartu.length - 1]];
}
