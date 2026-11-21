/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 5 Bab 2 Sub-Bab D "Kotak Bingkisan Pak Joko" (faktor persekutuan, FPB, congklak faktor, membagi sama rata ke kotak, FPB tiga bilangan).
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-kotak-k5b2d.mjs.
 * Jawaban benar DIHITUNG dari logika-data.ts (faktor, faktor persekutuan, FPB, bagi sama rata). Empat metode tiap misi: IGIL "Dua Daftar, Bagi Sama Rata, Terbesar yang Sama" (memilih cara),
 * Two Lists (Dua Daftar), Share Equally (Bagi Sama Rata), dan Biggest Match (Terbesar yang Sama).
 * Jawaban: memilih (klik), menulis SATU angka 1 sampai 9 di kanvas, dan mengucapkan satu kata pendek (nama cara, benar atau salah, habis atau sisa, atau satu kata bilangan dengan pilihan ketuk).
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { ejaK5B1, kataK5B1 } from "../eja-k5b1";
import { fmt, bagiSamaRata, bukanPersekutuan, daftarTeks, duaPengecoh, faktorDari, fpb, fpbPertamaSetelahSatu, persekutuan, pilihanDaftar, susun3 } from "./logika-data";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";
export { fmt };

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);
/** Awal tiap kalimat berhuruf kapital. */
const kapKal = (t: string): string => t.replace(/(^|[.?!]\s+)([a-z])/g, (_m, a: string, b: string) => a + b.toUpperCase());

/* ------------------------------ Kata bilangan dan ucapan ------------------------------ */
/** Nama bilangan dalam kata (tanpa digit). */
export const kata = (n: number): string => kataK5B1(n);
/** Ubah teks berangka menjadi ucapan tanpa digit. Tanpa spasi sebelum tanda baca. */
export function ucapkan(t: string): string {
  return ejaK5B1(t)
    .replace(/\s*×\s*/g, " dikali ")
    .replace(/\s+:\s+/g, " dibagi ")
    .replace(/\s+([.,!?;:])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/* ------------------------------ Isi tetap ------------------------------ */
/** Tiga cara (nama Indonesia) dan kata jawaban suaranya. */
export const NAMA_TIGA_CARA = ["Dua Daftar", "Bagi Sama Rata", "Terbesar yang Sama"] as const;
export const KATA_TIGA_CARA = ["daftar", "bagi", "terbesar"] as const;
/** Situasi di pasar malam dan cara yang paling cocok (indeks pada NAMA_TIGA_CARA): tiga situasi untuk tiap cara. */
export const RENCANA: { teks: string; cara: 0 | 1 | 2 }[] = [
  { teks: "Pak Joko ingin menulis semua faktor dua bilangan kecil, lalu melihat mana yang muncul di kedua daftar.", cara: 0 },
  { teks: "Bu Wati mengisi kotak dengan dua jenis kue, dan tiap kotak harus berisi tiap jenis sama banyak tanpa sisa.", cara: 1 },
  { teks: "Daftar faktor persekutuan sudah tersedia, dan panitia hanya perlu yang paling besar.", cara: 2 },
  { teks: "Bu Wati mencocokkan dua daftar faktor supaya tahu faktor mana saja yang sama.", cara: 0 },
  { teks: "Pak Tarno membagi gelas dan sendok ke beberapa baki, isi tiap jenis sama, dan baki sebanyak-banyaknya.", cara: 1 },
  { teks: "Bima sudah mengumpulkan faktor yang sama, dan ia memilih yang paling besar sebagai jawaban.", cara: 2 },
  { teks: "Citra menuliskan faktor dua bilangan berdampingan untuk mencari faktor yang sama.", cara: 0 },
  { teks: "Pak Arif membagikan tiga jenis hadiah ke beberapa kantong, isi tiap jenis sama, dan semua terpakai.", cara: 1 },
  { teks: "Fajar mencoba faktor persekutuan dari yang paling besar turun, dan berhenti pada yang pertama membagi semuanya.", cara: 2 },
];

/* ------------------------------ Jenis tugas ------------------------------ */
type Pil = [string, string, string];
/** Data dua atau tiga bilangan: satuan, nama tiap jenis benda (label baris), dan bilangannya. */
export type Data = { satuan: string; nama: string[]; bil: number[] };
/** Cara (IGIL): memilih cara yang cocok untuk keadaan (klik: nama cara; kanvas: nomor cara 1 sampai 3; suara: satu kata). */
export type LRencana = { tipe: "rencana"; r: number; pil?: Pil };
/** Dua Daftar (Two Lists), dua bilangan: sama (klik: daftar faktor persekutuan), banyak (kanvas: banyak faktor persekutuan), klaim (suara: benar atau salah untuk bilangan n). */
export type HasilDaftar = "sama" | "banyak" | "klaim";
export type LDaftar = { tipe: "daftar"; d: Data; hasil: HasilDaftar; n?: number; pil?: Pil };
/** Bagi Sama Rata (Share Equally): kotak (klik: banyak kotak sebanyak-banyaknya), isi (kanvas: isi satu jenis tiap kotak), habis (suara: habis atau sisa bila dibagi ke n kotak). */
export type HasilBagi = "kotak" | "isi" | "habis";
export type LBagi = { tipe: "bagi"; d: Data; hasil: HasilBagi; n?: number; jenis?: number; pil?: Pil };
/** Terbesar yang Sama (Biggest Match), dua atau tiga bilangan: fpb (klik), digit (kanvas: FPB satu angka), ucap (suara: FPB sebagai satu kata bilangan dengan pilihan ketuk). */
export type HasilBesar = "fpb" | "digit" | "ucap";
export type LBesar = { tipe: "besar"; d: Data; hasil: HasilBesar; pil?: Pil };
export type LangkahDasar = LRencana | LDaftar | LBagi | LBesar;
/** Tugas yang boleh dibungkus Cari kesalahan (jawabannya pilihan klik). */
export type DasarSalah = LRencana | LDaftar | LBagi | LBesar;
export type LangkahSalah = { tipe: "salah"; dasar: DasarSalah; tokoh: string; kataTokoh: string; jawabTokoh: string; alasan: [string, string, string]; benar: number; betul?: boolean; posisi?: number };
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "daftar" | "bagi" | "besar";
export const URUT_METODE: Metode[] = ["igil", "daftar", "bagi", "besar"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Dua Daftar, Bagi Sama Rata, Terbesar yang Sama",
  daftar: "Two Lists: Dua Daftar",
  bagi: "Share Equally: Bagi Sama Rata",
  besar: "Biggest Match: Terbesar yang Sama",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F9EE}", daftar: "\u{1F4CB}", bagi: "\u{1F381}", besar: "\u{1F3C6}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", daftar: "Two Lists", bagi: "Share Equally", besar: "Biggest Match" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };
export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const sebutan = (s: string): Kunci => ({ jenis: "nama", nama: s });

/** FPB tugas, dihitung dari faktor persekutuan. */
export const fpbTugas = (d: Data): number => fpb(d.bil);
/** Apakah n faktor persekutuan semua bilangan? */
export const faktorBersama = (d: Data, n: number): boolean => d.bil.every((b) => b % n === 0);
/** Kunci klaim (suara): benar bila n faktor persekutuan. */
export const kataKlaim = (l: LDaftar): "benar" | "salah" => (faktorBersama(l.d, l.n ?? 1) ? "benar" : "salah");
/** Kunci habis (suara): habis bila dibagi ke n kotak tanpa sisa. */
export const kataHabis = (l: LBagi): "habis" | "sisa" => (bagiSamaRata(l.d.bil, l.n ?? 1).habis ? "habis" : "sisa");

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari logika murni. null untuk kombinasi yang tidak dipakai. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "rencana":
      return cara === "klik" ? sebutan(NAMA_TIGA_CARA[RENCANA[l.r].cara]) : cara === "kanvas" ? angka(RENCANA[l.r].cara + 1) : sebutan(KATA_TIGA_CARA[RENCANA[l.r].cara]);
    case "daftar":
      if (l.hasil === "sama") return cara === "klik" ? sebutan(daftarTeks(persekutuan(l.d.bil))) : null;
      if (l.hasil === "banyak") return cara === "kanvas" ? angka(persekutuan(l.d.bil).length) : null;
      return cara === "suara" ? sebutan(kataKlaim(l)) : null;
    case "bagi":
      if (l.hasil === "kotak") return cara === "klik" ? sebutan(`${fpbTugas(l.d)} kotak`) : null;
      if (l.hasil === "isi") return cara === "kanvas" ? angka(l.d.bil[l.jenis ?? 0] / fpbTugas(l.d)) : null;
      return cara === "suara" ? sebutan(kataHabis(l)) : null;
    case "besar":
      if (l.hasil === "fpb") return cara === "klik" ? sebutan(String(fpbTugas(l.d))) : null;
      if (l.hasil === "digit") return cara === "kanvas" ? angka(fpbTugas(l.d)) : null;
      return cara === "suara" ? angka(fpbTugas(l.d)) : null;
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
/** Bilangan pengecoh FPB: faktor persekutuan terbesar kedua, faktor persekutuan pertama setelah satu, dan bilangan terkecil. */
function kandidatFpb(d: Data): number[] {
  const p = persekutuan(d.bil);
  const kedua = p.length >= 2 ? p[p.length - 2] : fpb(d.bil) + 1;
  return [kedua, fpbPertamaSetelahSatu(d.bil), Math.min(...d.bil), fpb(d.bil) * 2];
}
/** Pilihan klik otomatis: pengecoh berasal dari salah umum (faktor pertama setelah satu, faktor persekutuan lain, daftar tanpa satu atau dengan faktor yang bukan persekutuan). */
function pilihanOtomatis(d: LangkahDasar): string[] {
  const p = posisiDari(d);
  switch (d.tipe) {
    case "rencana": {
      const benar = RENCANA[d.r].cara;
      const lain = [0, 1, 2].filter((i) => i !== benar).map((i) => NAMA_TIGA_CARA[i]) as [string, string];
      return susun3<string>(NAMA_TIGA_CARA[benar], lain, p);
    }
    case "daftar": {
      const x = pilihanDaftar(d.d.bil);
      return susun3<string>(x.benar, x.lain, p);
    }
    case "bagi": {
      const f = fpb(d.d.bil);
      const [x, y] = duaPengecoh(f, kandidatFpb(d.d));
      return susun3<string>(`${f} kotak`, [`${x} kotak`, `${y} kotak`], p);
    }
    case "besar": {
      const f = fpb(d.d.bil);
      const [x, y] = duaPengecoh(f, kandidatFpb(d.d));
      return susun3<string>(String(f), [String(x), String(y)], p);
    }
  }
}
/** Pilihan klik: tiga pilihan dari data tugas (jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh pada Cari kesalahan selalu ikut). */
export function pilihanKlik(l: Langkah): string[] {
  const d = dasarDari(l);
  return d.pil ? [...d.pil] : pilihanOtomatis(d);
}
/** Pilihan cadangan untuk tugas suara (kata atau kata bilangan): jawaban benar di posisi kedua atau ketiga. */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k) return [];
  const d = dasarDari(l);
  const p = posisiDari(d);
  if (k.jenis === "angka") {
    if (d.tipe !== "besar") return [];
    const [x, y] = duaPengecoh(k.n, kandidatFpb(d.d));
    return susun3<string>(kata(k.n), [kata(x), kata(y)], p);
  }
  let lain: [string, string];
  if (d.tipe === "rencana") lain = KATA_TIGA_CARA.filter((x) => x !== k.nama) as unknown as [string, string];
  else if (d.tipe === "daftar") lain = ["benar", "salah", "mungkin"].filter((x) => x !== k.nama) as [string, string];
  else lain = ["habis", "sisa", "kosong"].filter((x) => x !== k.nama) as [string, string];
  return susun3<string>(k.nama, lain, p);
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kata(k.n));
/** Teks pilihan klik yang benar. */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  if (!k) return null;
  return k.jenis === "nama" ? k.nama : String(k.n);
}
/** Pilihan klik ditampilkan berhuruf awal kapital untuk nama cara dan kata. */
export const tampilPilihan = (t: string): string => (/^\d/.test(t) ? t : kapital(t));

/* ------------------------------ Kalimat ------------------------------ */
const sebutBidang = (rupa: Rupa): string => (rupa === "lambang" ? "lembar" : rupa === "benda" ? "meja kemas" : "diagram");
/** "Pastel 16 dan Sate 24" atau "Bakpao 12, Kroket 20, dan Lontong 28". */
const sebutJenis = (d: Data): string => {
  const butir = d.bil.map((n, i) => `${d.nama[i]} ${n}`);
  return butir.length === 2 ? `${butir[0]} dan ${butir[1]}` : `${butir.slice(0, -1).join(", ")}, dan ${butir[butir.length - 1]}`;
};
/** "20 dan 30" atau "10, 15, dan 25". */
const sebutBil = (bil: number[]): string => (bil.length === 2 ? `${bil[0]} dan ${bil[1]}` : `${bil.slice(0, -1).join(", ")}, dan ${bil[bil.length - 1]}`);
const namaKecil = (t: string): string => t.toLowerCase();

export function kalimatKunci(l: Langkah, cara: Cara): string {
  return kapKal(kalimatKunciMentah(l, cara));
}
function kalimatKunciMentah(l: Langkah, cara: Cara): string {
  void cara;
  const d = dasarDari(l);
  switch (d.tipe) {
    case "rencana": {
      const c = RENCANA[d.r].cara;
      return c === 0 ? "Untuk melihat faktor yang sama, tulis faktor tiap bilangan lalu lingkari yang muncul di kedua daftar." : c === 1 ? "Untuk membagi sama rata tanpa sisa, banyak kotak harus membagi tiap jenis benda sampai habis." : "Untuk mencari FPB, periksa faktor persekutuan dari yang paling besar dan berhenti pada yang pertama membagi semuanya.";
    }
    case "daftar": {
      const [a, b] = d.d.bil;
      if (d.hasil === "klaim") {
        const n = d.n ?? 1;
        if (faktorBersama(d.d, n)) return `Bilangan ${n} membagi ${a} dan ${b} tanpa sisa, jadi ${n} adalah faktor persekutuan keduanya.`;
        const gagal = d.d.bil.find((x) => x % n !== 0) ?? a;
        return `Bilangan ${n} tidak membagi ${gagal} tanpa sisa, jadi ${n} bukan faktor persekutuan ${a} dan ${b}.`;
      }
      const p = persekutuan(d.d.bil);
      if (d.hasil === "sama") return `Faktor ${a}: ${daftarTeks(faktorDari(a))}. Faktor ${b}: ${daftarTeks(faktorDari(b))}. Yang sama: ${daftarTeks(p)}.`;
      return `Faktor persekutuan ${a} dan ${b} ada ${p.length}, yaitu ${daftarTeks(p)}.`;
    }
    case "bagi": {
      const f = fpb(d.d.bil);
      const isiTiap = d.d.bil.map((b, i) => `${b} : ${f} = ${b / f} ${namaKecil(d.d.nama[i])}`).join(", ");
      if (d.hasil === "kotak") return `FPB ${sebutBil(d.d.bil)} adalah ${f}, jadi ada ${f} kotak: ${isiTiap}.`;
      if (d.hasil === "isi") {
        const j = d.jenis ?? 0;
        return `Hasil bagi ${d.d.bil[j]} : ${f} = ${d.d.bil[j] / f}, jadi tiap kotak berisi ${d.d.bil[j] / f} ${namaKecil(d.d.nama[j])}.`;
      }
      const n = d.n ?? 1;
      const r = bagiSamaRata(d.d.bil, n);
      if (r.habis) return `Dibagi ke ${n} kotak, semua jenis habis tanpa sisa, jadi ${n} kotak cocok.`;
      const i = r.sisa.findIndex((s) => s > 0);
      return `Kue ${namaKecil(d.d.nama[i])} ${d.d.bil[i]} dibagi ${n} bersisa ${r.sisa[i]}, jadi tidak semua habis.`;
    }
    case "besar": {
      const p = persekutuan(d.d.bil);
      return `Faktor persekutuan ${sebutBil(d.d.bil)}: ${daftarTeks(p)}. Yang paling besar adalah ${fpb(d.d.bil)}, jadi FPB-nya ${fpb(d.d.bil)}.`;
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
  if (l.tipe === "rencana") return "Ucapkan satu kata: daftar, bagi, atau terbesar.";
  if (l.tipe === "daftar") return "Ucapkan satu kata: benar atau salah.";
  if (l.tipe === "bagi") return "Ucapkan satu kata: habis atau sisa.";
  return "Ucapkan satu kata bilangan.";
}
function instruksiMentah(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebutBidang(rupa);
  const aw = AWALAN[metode];
  const akhir = akhirTugas(l, cara);
  switch (l.tipe) {
    case "rencana":
      return `${aw}: ${RENCANA[l.r].teks} ${cara === "kanvas" ? "Cara ke berapa: satu Dua Daftar, dua Bagi Sama Rata, atau tiga Terbesar yang Sama?" : "Cara mana yang paling cocok?"} ${akhir}`;
    case "daftar": {
      const [a, b] = l.d.bil;
      if (l.hasil === "sama") return `${aw}: lihat ${g} ini. ${sebutJenis(l.d)}. Tulis faktor kedua bilangan, lalu lingkari yang sama. Faktor persekutuannya apa saja? ${akhir}`;
      if (l.hasil === "banyak") return `${aw}: lihat ${g} ini. ${sebutJenis(l.d)}. Tulis faktor ${a} dan faktor ${b}, lalu lingkari yang sama. Ada berapa faktor persekutuannya? ${akhir}`;
      return `${aw}: lihat ${g} ini. ${sebutJenis(l.d)}. Faktor kedua bilangan dicocokkan. Apakah ${l.n} faktor persekutuan ${a} dan ${b}? ${akhir}`;
    }
    case "bagi":
      if (l.hasil === "kotak") return `${aw}: lihat ${g} ini. ${sebutJenis(l.d)}. Bagi sama rata ke kotak sebanyak-banyaknya, isi tiap jenis harus sama, dan semua ${l.d.satuan} terpakai. Ada berapa kotak? ${akhir}`;
      if (l.hasil === "isi") return `${aw}: lihat ${g} ini. ${sebutJenis(l.d)} dibagi sama rata ke ${fpbTugas(l.d)} kotak, dan semua terpakai. ${l.d.nama[l.jenis ?? 0]} di tiap kotak ada berapa ${l.d.satuan}? ${akhir}`;
      return `${aw}: lihat ${g} ini. ${sebutJenis(l.d)} dibagi sama rata ke ${l.n} kotak. Semua habis atau ada sisa? ${akhir}`;
    case "besar":
      if (l.hasil === "fpb") return `${aw}: lihat ${g} ini. ${sebutJenis(l.d)}. Periksa faktor persekutuannya dari yang paling besar. FPB-nya berapa? ${akhir}`;
      return `${aw}: lihat ${g} ini. ${sebutJenis(l.d)}. Cari FPB dari bilangan-bilangan itu. FPB-nya berapa? ${akhir}`;
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
    case "daftar":
      return d.hasil === "sama" ? "Faktor persekutuannya apa saja?" : d.hasil === "banyak" ? "Ada berapa faktor persekutuannya?" : "Faktor persekutuan itu benar atau salah?";
    case "bagi":
      return d.hasil === "kotak" ? "Ada berapa kotak?" : d.hasil === "isi" ? `Berapa ${d.d.satuan} di tiap kotak?` : "Semua habis atau bersisa?";
    case "besar":
      return "FPB-nya berapa?";
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
      return "Baca lagi apa yang dikerjakan panitia: menulis dua daftar faktor, membagi sama rata ke kotak, atau mencari yang paling besar.";
    case "daftar":
      return "Tulis faktor kedua bilangan mulai dari satu, lalu pilih hanya yang muncul di kedua daftar.";
    case "bagi":
      return "Banyak kotak harus membagi tiap jenis tanpa sisa, dan kotaknya harus sebanyak-banyaknya.";
    case "besar":
      return "Periksa faktor persekutuan dari yang paling besar. Faktor persekutuan pertama setelah satu belum tentu yang terbesar.";
  }
}

/* ------------------------------ Isi gambar ------------------------------ */
/** Satu baris benda: nama, banyaknya, dan satuan nyata; gambar digambar sebanyak `n`. */
export type BarisMeja = { label: string; n: number };
/** Isi meja kemas atau diagram: baris jenis benda, banyak kotak (bila ada), dan catatan pendek. */
export type Meja = { judul: string; baris: BarisMeja[]; kotak: number | null; catatan: string };

/** Meja kemas untuk tugas yang memuat benda, atau null (tugas memilih cara tidak memuat benda). */
export function modelMeja(d: LangkahDasar): Meja | null {
  if (d.tipe === "rencana") return null;
  const baris = d.d.bil.map((n, i) => ({ label: d.d.nama[i], n }));
  if (d.tipe === "daftar") return { judul: "Dua jenis", baris, kotak: null, catatan: d.hasil === "klaim" ? `Dicoba: ${d.n}` : "" };
  if (d.tipe === "bagi") return { judul: "Bingkisan", baris, kotak: d.hasil === "kotak" ? null : d.hasil === "isi" ? fpb(d.d.bil) : (d.n ?? 1), catatan: "" };
  return { judul: d.d.bil.length === 2 ? "Dua jenis" : "Tiga jenis", baris, kotak: null, catatan: "" };
}

/** Isi kartu kata untuk tahap Abstract (kata dan angka bercap pengelola pasar, tanpa emoji dan tanpa menyebut gambar). */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  const lembar = "lembar pengemasan pengelola pasar";
  const jenis = (d: Data): string[] => d.bil.map((n, i) => `${namaKecil(d.nama[i])}: ${n} ${d.satuan}`);
  switch (l.tipe) {
    case "rencana":
      return [lembar, `keadaan: ${RENCANA[l.r].teks.replace(/\.$/, "").toLowerCase()}`, cara === "kanvas" ? "nomor cara (1 daftar, 2 bagi, 3 terbesar): ?" : "cara yang cocok: ?"];
    case "daftar":
      return [lembar, ...jenis(l.d), l.hasil === "sama" ? "faktor persekutuan: ?" : l.hasil === "banyak" ? "banyak faktor persekutuan: ?" : `${l.n} faktor persekutuan (benar atau salah): ?`];
    case "bagi":
      return [lembar, ...jenis(l.d), l.hasil === "kotak" ? "kotak sebanyak-banyaknya, isi sama, semua terpakai: ?" : l.hasil === "isi" ? `kotak: ${fpbTugas(l.d)}; isi ${namaKecil(l.d.nama[l.jenis ?? 0])} tiap kotak: ?` : `kotak: ${l.n}; semua habis atau bersisa: ?`];
    case "besar":
      return [lembar, `bilangan: ${sebutBil(l.d.bil)}`, "faktor persekutuan terbesar (FPB): ?"];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
/** Keterangan di bawah gambar Concrete dan Pictorial: baris tanya terakhir kartu. */
export function ketGambar(d: LangkahDasar, cara?: Cara): string[] {
  const kartu = barisKartu(d, cara);
  return [kartu[kartu.length - 1]];
}
/** Faktor yang bukan persekutuan (dipakai uji untuk pengecoh daftar). */
export const bukanBersama = (d: Data): number[] => bukanPersekutuan(d.bil);
