/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 1 Sub-Bab D "Pesanan Bu Tuti" (penjumlahan sampai 100):
 * jenis tugas, kunci, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-tambah-k3b1d.mjs.
 * Jawaban beragam: memilih bilangan atau kata, menyusun langkah berurutan, mengucapkan satu kata atau bilangan pendek, menulis satu angka di kanvas, dan Cari kesalahan.
 * Kunci dihitung dari data (dua atau tiga bilangan), bukan kunci tetap. Hasil penjumlahan tidak lebih dari seratus.
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

/* ------------------------------ Kata bilangan ------------------------------ */
const SAT = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"] as const;
/** Nama bilangan 0 sampai 100 dalam kata (tanpa digit). */
export function kataBil(n: number): string {
  if (n < 0 || n > 100 || !Number.isInteger(n)) return String(n);
  if (n === 100) return "seratus";
  if (n < 10) return SAT[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SAT[n - 10]} belas`;
  const p = Math.floor(n / 10);
  const s = n % 10;
  return s === 0 ? `${SAT[p]} puluh` : `${SAT[p]} puluh ${SAT[s]}`;
}
export const kata = kataBil;

/**
 * Benda untuk rupa Concrete (emoji paling tinggi U+1FA95). Berbeda dari data Story (kue lapis, nagasari, donat, bolu, roti) dan dari Simulasi (pastel, lemper, onde-onde).
 * Pictorial memakai balok puluhan dan satuan polos, Abstract hanya nama.
 */
export const OBJEK = [
  { nama: "permen", emoji: "\u{1F36C}" },
  { nama: "apel", emoji: "\u{1F34E}" },
  { nama: "jeruk", emoji: "\u{1F34A}" },
  { nama: "telur", emoji: "\u{1F95A}" },
  { nama: "kaleng", emoji: "\u{1F96B}" },
  { nama: "biskuit", emoji: "\u{1F36A}" },
  { nama: "pisang", emoji: "\u{1F34C}" },
  { nama: "sabun", emoji: "\u{1F9FC}" },
] as const;
export const namaO = (o: number): string => OBJEK[o].nama;

/* ------------------------------ Langkah ------------------------------ */
export type KataSusun = "simpan" | "puluhan" | "satuan";
/** Metode IGIL "Satuan Dulu, Simpan Puluhan": susun pendek. klik: jumlahnya; kanvas: satu angka satuan atau puluhan hasil; suara: satu kata. */
export type LSusun = { tipe: "susun"; a: number; b: number; o: number; kanvas: "satuan" | "puluhan"; kata: KataSusun };
/** Standard Addition (susun panjang): klik: jumlahnya; kanvas: jumlah puluhan atau satuan (hasil satu angka); suara: jumlah bagian puluhan (bilangan). */
export type LPanjang = { tipe: "panjang"; a: number; b: number; o: number; kanvas: "puluh" | "satuan" };
/** Standard Addition (tiga bilangan dua-dua): klik dan suara: jumlah seluruhnya; kanvas: satuan atau puluhan hasil. */
export type LTiga = { tipe: "tiga"; a: number; b: number; c: number; o: number; kanvas: "satuan" | "puluhan" };
/** Number Bond (pasangan bilangan): b dipecah supaya a menjadi puluhan penuh. klik: jumlahnya; kanvas: bagian yang diambil; suara: puluhan penuh yang dicapai. */
export type LPasang = { tipe: "pasang"; a: number; b: number; o: number };
/** Counting On (menghitung maju): mulai dari bilangan lebih besar. klik: jumlahnya; kanvas: banyak lompatan puluhan atau satuan; suara: mulai dari yang besar. */
export type LMaju = { tipe: "maju"; a: number; b: number; o: number; kanvas: "puluh" | "satu" };
/** Cerita penjumlahan. klik: jumlahnya; kanvas: satuan atau puluhan hasil; suara: kata tambah. */
export type LCerita = { tipe: "cerita"; a: number; b: number; o: number; kanvas: "satuan" | "puluhan" };
/** Periksa dengan menukar urutan. klik dan suara: sama, lebih, atau kurang; kanvas: satuan hasil. */
export type LTukar = { tipe: "tukar"; a: number; b: number; o: number; kanvas: "satuan" };
/** Menyusun langkah susun pendek dengan mengetuk langkah pertama sampai terakhir (klik, tanpa kunci jawaban). */
export type LUrut = { tipe: "urut"; a: number; b: number; o: number };
export type LangkahDasar = LSusun | LPanjang | LTiga | LPasang | LMaju | LCerita | LTukar | LUrut;
/** Cari kesalahan: tokoh sudah menjawab tentang `dasar`. Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LSusun | LTukar | LMaju;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh?: number | string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "susun" | "pasang" | "maju";
export const URUT_METODE: Metode[] = ["igil", "susun", "pasang", "maju"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Satuan Dulu, Simpan Puluhan",
  susun: "Standard Addition: Penjumlahan Bersusun",
  pasang: "Number Bond: Pasangan Bilangan",
  maju: "Counting On: Menghitung Maju",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F4CB}", susun: "\u{1F9EE}", pasang: "\u{1F517}", maju: "\u{23E9}" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/** Langkah mengetuk urutan susun pendek (tipe urut). */
export const LANGKAH_SUSUN = [
  "Susun lurus: puluhan dengan puluhan, satuan dengan satuan",
  "Jumlahkan satuan dulu",
  "Satuan sepuluh atau lebih: tulis sisanya, simpan satu puluhan",
  "Jumlahkan puluhan beserta simpanan",
] as const;

/* ------------------------------ Hitungan dari data ------------------------------ */
export const puluhanDari = (n: number): number => Math.floor(n / 10);
export const satuanDari = (n: number): number => n % 10;
export const jumlahDari = (l: LangkahDasar): number => (l.tipe === "tiga" ? l.a + l.b + l.c : l.a + l.b);
/** Apakah jumlah satuan dua bilangan sepuluh atau lebih (perlu menyimpan)? */
export const perluSimpan = (a: number, b: number): boolean => satuanDari(a) + satuanDari(b) >= 10;
/** Bagian b yang diambil supaya a menjadi puluhan penuh. */
export const ambilDari = (a: number): number => 10 - satuanDari(a);
export const puluhanPenuh = (a: number): number => a + ambilDari(a);
export const lebihKecil = (a: number, b: number): number => Math.min(a, b);
export const lebihBesar = (a: number, b: number): number => Math.max(a, b);

export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });

/** Kunci tiap tugas menurut caranya, dihitung dari data. Null bila tugas selesai lewat kegiatan (mengetuk langkah). */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "susun":
      if (cara === "klik") return angka(l.a + l.b);
      if (cara === "kanvas") return angka(l.kanvas === "satuan" ? satuanDari(l.a + l.b) : puluhanDari(l.a + l.b));
      return nama(l.kata);
    case "panjang":
      if (cara === "klik") return angka(l.a + l.b);
      if (cara === "kanvas") return angka(l.kanvas === "puluh" ? puluhanDari(l.a) + puluhanDari(l.b) : satuanDari(l.a) + satuanDari(l.b));
      return angka((puluhanDari(l.a) + puluhanDari(l.b)) * 10);
    case "tiga":
      if (cara === "kanvas") return angka(l.kanvas === "satuan" ? satuanDari(l.a + l.b + l.c) : puluhanDari(l.a + l.b + l.c));
      return angka(l.a + l.b + l.c);
    case "pasang":
      if (cara === "klik") return angka(l.a + l.b);
      if (cara === "kanvas") return angka(ambilDari(l.a));
      return angka(puluhanPenuh(l.a));
    case "maju":
      if (cara === "klik") return angka(l.a + l.b);
      if (cara === "kanvas") return angka(l.kanvas === "puluh" ? puluhanDari(lebihKecil(l.a, l.b)) : satuanDari(lebihKecil(l.a, l.b)));
      return nama("besar");
    case "cerita":
      if (cara === "klik") return angka(l.a + l.b);
      if (cara === "kanvas") return angka(l.kanvas === "satuan" ? satuanDari(l.a + l.b) : puluhanDari(l.a + l.b));
      return nama("tambah");
    case "tukar":
      if (cara === "kanvas") return angka(satuanDari(l.a + l.b));
      return nama("sama");
    case "urut":
      return null;
  }
}

/** Nomor langkah yang benar pada tugas ketuk: urut 0, 1, 2, 3. -1 untuk tugas lain. */
export const nomorKetuk = (l: LangkahDasar): number => (l.tipe === "urut" ? 0 : -1);

/**
 * Apakah tugas langsung siap dijawab (tanpa kegiatan lebih dulu)? Bila punya kunci: ya. Tugas ketuk langkah dan Cari kesalahan memakai kegiatan.
 * Tidak bergantung pada rupa, sehingga tidak macet pada lambang.
 */
export function siapLangsung(l: Langkah, rupa: Rupa, cara: Cara): boolean {
  void rupa;
  if (l.tipe === "salah") return false;
  return kunciJawab(l, cara) !== null;
}

/* ------------------------------ Pilihan ------------------------------ */
const sah = (n: number): boolean => Number.isInteger(n) && n >= 1 && n <= 99;
/** Dua pengecoh bilangan untuk kunci `n`: dari daftar kandidat (urut), lalu dari sekitar n. */
function duaPengecoh(n: number, kandidat: number[]): [number, number] {
  const semua = [...kandidat, n + 1, n - 1, n + 2, n - 2, n + 5, n - 5];
  const hasil: number[] = [];
  for (const c of semua) if (sah(c) && c !== n && !hasil.includes(c)) hasil.push(c);
  return [hasil[0], hasil[1]];
}
/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisipkan(benar: string, lain: string[], geser: number): string[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}
/** Gugus kata pilihan: kata jawaban selalu bersama kata sebanding. */
const GUGUS_KATA: string[][] = [["simpan", "hapus", "lupa"], ["satuan", "puluhan", "ratusan"], ["besar", "kecil", "sama"], ["sama", "lebih", "kurang"], ["tambah", "kurang", "kali"]];
function kataSebanding(k: string, cara: Cara, l: LangkahDasar): string[] {
  if (l.tipe === "tukar") return ["sama", "lebih", "kurang"];
  if (l.tipe === "maju") return ["besar", "kecil", "sama"];
  if (l.tipe === "cerita") return ["tambah", "kurang", "kali"];
  const kel = GUGUS_KATA.find((g) => g.includes(k)) ?? ["simpan", "hapus", "lupa"];
  void cara;
  return kel;
}
/** Tiga pilihan untuk tugas klik yang kuncinya bilangan atau kata (kunci tidak pernah di tombol pertama). */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k) return [];
  const d = dasarDari(l);
  if (k.jenis === "angka") {
    const [a, b] = duaPengecoh(k.n, [k.n - 10, k.n + 10]);
    return sisipkan(String(k.n), [String(a), String(b)], k.n);
  }
  return sisipkan(k.nama, kataSebanding(k.nama, "klik", d).filter((x) => x !== k.nama), k.nama.length);
}
/** Pilihan cadangan untuk tugas suara (kata atau bilangan dalam kata). */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k) return [];
  const d = dasarDari(l);
  if (k.jenis === "angka") {
    const [a, b] = duaPengecoh(k.n, k.n % 10 === 0 ? [k.n - 10, k.n + 10] : []);
    return sisipkan(kataBil(k.n), [kataBil(a), kataBil(b)], k.n);
  }
  return sisipkan(k.nama, kataSebanding(k.nama, cara, d).filter((x) => x !== k.nama), k.nama.length);
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : "gambar");
const urai = (n: number): string => `${kataBil(puluhanDari(n) * 10)} dan ${kataBil(satuanDari(n))}`;

export function kalimatKunci(l: Langkah, cara: Cara, rupa: Rupa = "benda"): string {
  void rupa;
  const d = dasarDari(l);
  const kunci = kunciJawab(l, cara);
  const n = kunci?.jenis === "angka" ? kunci.n : 0;
  switch (d.tipe) {
    case "susun": {
      const jml = d.a + d.b;
      const s = satuanDari(d.a) + satuanDari(d.b);
      const ket = perluSimpan(d.a, d.b) ? `satuan ${kataBil(s)}, tulis ${kataBil(satuanDari(jml))} dan simpan satu puluhan` : `satuan ${kataBil(s)}, tidak ada yang disimpan`;
      if (cara === "suara") return d.kata === "simpan" ? "Satuan sepuluh atau lebih: satu puluhan disimpan ke puluhan." : d.kata === "puluhan" ? "Angka yang disimpan ditambahkan ke tempat puluhan." : "Penjumlahan bersusun dimulai dari satuan.";
      if (cara === "kanvas") return `${kapital(ket)}, jadi ${d.kanvas === "satuan" ? "satuan" : "puluhan"} hasilnya ${kataBil(n)}.`;
      return `${kapital(ket)}, jadi ${kataBil(d.a)} ditambah ${kataBil(d.b)} sama dengan ${kataBil(jml)}.`;
    }
    case "panjang":
      if (cara === "suara") return `${kataBil(puluhanDari(d.a) * 10)} ditambah ${kataBil(puluhanDari(d.b) * 10)} sama dengan ${kataBil(n)}.`;
      if (cara === "kanvas") return d.kanvas === "puluh" ? `Puluhan ${kataBil(puluhanDari(d.a))} ditambah ${kataBil(puluhanDari(d.b))} sama dengan ${kataBil(n)}.` : `Satuan ${kataBil(satuanDari(d.a))} ditambah ${kataBil(satuanDari(d.b))} sama dengan ${kataBil(n)}.`;
      return `${kapital(urai(d.a))} ditambah ${urai(d.b)}: ${kataBil(puluhanDari(d.a) * 10 + puluhanDari(d.b) * 10)} ditambah ${kataBil(satuanDari(d.a) + satuanDari(d.b))} sama dengan ${kataBil(d.a + d.b)}.`;
    case "tiga": {
      const dua = d.a + d.b;
      if (cara === "kanvas") return `Dua bilangan pertama ${kataBil(dua)}, ditambah ${kataBil(d.c)} jadi ${kataBil(dua + d.c)}, jadi ${d.kanvas === "satuan" ? "satuan" : "puluhan"} hasilnya ${kataBil(n)}.`;
      return `${kapital(kataBil(d.a))} ditambah ${kataBil(d.b)} sama dengan ${kataBil(dua)}, lalu ditambah ${kataBil(d.c)} sama dengan ${kataBil(dua + d.c)}.`;
    }
    case "pasang":
      if (cara === "kanvas") return `${kapital(kataBil(d.a))} perlu ${kataBil(n)} lagi supaya menjadi ${kataBil(puluhanPenuh(d.a))}.`;
      if (cara === "suara") return `${kapital(kataBil(d.a))} ditambah ${kataBil(ambilDari(d.a))} menjadi ${kataBil(n)}.`;
      return `${kapital(kataBil(d.a))} ditambah ${kataBil(ambilDari(d.a))} menjadi ${kataBil(puluhanPenuh(d.a))}, lalu ditambah ${kataBil(d.b - ambilDari(d.a))} menjadi ${kataBil(d.a + d.b)}.`;
    case "maju": {
      const besar = lebihBesar(d.a, d.b);
      const kecil = lebihKecil(d.a, d.b);
      if (cara === "suara") return "Menghitung maju dimulai dari bilangan yang lebih besar.";
      if (cara === "kanvas") return d.kanvas === "puluh" ? `Dari ${kataBil(besar)} maju ${kataBil(puluhanDari(kecil))} lompatan sepuluh.` : `Setelah lompatan sepuluh, maju ${kataBil(satuanDari(kecil))} lompatan satu.`;
      return `Mulai dari ${kataBil(besar)}, maju ${kataBil(puluhanDari(kecil) * 10)} dan ${kataBil(satuanDari(kecil))}, sampai ${kataBil(d.a + d.b)}.`;
    }
    case "cerita":
      if (cara === "suara") return "Kata tambah menunjukkan penjumlahan.";
      if (cara === "kanvas") return `${kapital(kataBil(d.a))} ditambah ${kataBil(d.b)} sama dengan ${kataBil(d.a + d.b)}, jadi ${d.kanvas === "satuan" ? "satuan" : "puluhan"} jumlahnya ${kataBil(n)}.`;
      return `${kapital(kataBil(d.a))} ditambah ${kataBil(d.b)} sama dengan ${kataBil(d.a + d.b)} ${namaO(d.o)}.`;
    case "tukar":
      if (cara === "kanvas") return `${kapital(kataBil(d.a))} ditambah ${kataBil(d.b)} sama dengan ${kataBil(d.a + d.b)}, jadi satuannya ${kataBil(n)}.`;
      return `${kapital(kataBil(d.a))} ditambah ${kataBil(d.b)} sama banyak dengan ${kataBil(d.b)} ditambah ${kataBil(d.a)}, yaitu ${kataBil(d.a + d.b)}.`;
    case "urut":
      return "Urutannya: susun lurus, jumlahkan satuan, simpan bila perlu, lalu jumlahkan puluhan.";
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  const pilih = cara === "klik" ? "Pilih bilangannya." : "Ucapkan bilangannya.";
  switch (l.tipe) {
    case "susun":
      if (cara === "klik") return `Metode IGIL: jumlahkan dengan susun pendek pada ${g} ini, satuan dulu, simpan puluhan bila perlu. Berapa jumlahnya? Pilih bilangannya.`;
      if (cara === "kanvas") return `Metode IGIL: jumlahkan dengan susun pendek pada ${g} ini. Berapa ${l.kanvas === "satuan" ? "satuan" : "puluhan"} hasilnya? Tulis satu angka di kanvas.`;
      return l.kata === "simpan" ? "Metode IGIL: jumlah satuan lebih dari sembilan. Apa yang dilakukan pada satu puluhan itu? Ucapkan satu kata." : l.kata === "puluhan" ? "Metode IGIL: angka yang disimpan ditambahkan ke tempat apa? Ucapkan satu kata." : "Metode IGIL: penjumlahan bersusun dimulai dari tempat mana, satuan atau puluhan? Ucapkan satu kata.";
    case "panjang":
      if (cara === "klik") return `Standard Addition: uraikan kedua bilangan pada ${g} ini menjadi puluhan dan satuan. Berapa jumlahnya? Pilih bilangannya.`;
      if (cara === "kanvas") return `Standard Addition: uraikan kedua bilangan pada ${g} ini. Berapa jumlah ${l.kanvas === "puluh" ? "angka puluhan kedua bilangan" : "angka satuan kedua bilangan"}? Tulis satu angka di kanvas.`;
      return `Standard Addition: uraikan kedua bilangan pada ${g} ini. Berapa jumlah bagian puluhannya? ${pilih}`;
    case "tiga":
      if (cara === "kanvas") return `Standard Addition: jumlahkan tiga bilangan pada ${g} ini dua-dua. Berapa ${l.kanvas === "satuan" ? "satuan" : "puluhan"} jumlah seluruhnya? Tulis satu angka di kanvas.`;
      return `Standard Addition: jumlahkan tiga bilangan pada ${g} ini dua-dua. Berapa jumlah seluruhnya? ${pilih}`;
    case "pasang":
      if (cara === "klik") return `Number Bond: pecah bilangan kedua pada ${g} ini supaya bilangan pertama menjadi puluhan penuh. Berapa jumlahnya? Pilih bilangannya.`;
      if (cara === "kanvas") return `Number Bond: berapa yang diambil dari bilangan kedua pada ${g} ini supaya bilangan pertama menjadi puluhan penuh? Tulis satu angka di kanvas.`;
      return `Number Bond: bilangan pertama pada ${g} ini ditambah pecahan kecil dari bilangan kedua. Menjadi puluhan penuh berapa? ${pilih}`;
    case "maju":
      if (cara === "klik") return `Counting On: mulai dari bilangan yang lebih besar pada ${g} ini, lalu maju. Berapa jumlahnya? Pilih bilangannya.`;
      if (cara === "kanvas") return `Counting On: bilangan yang lebih kecil pada ${g} ini dihitung maju. Berapa ${l.kanvas === "puluh" ? "lompatan sepuluh" : "lompatan satu"}? Tulis satu angka di kanvas.`;
      return "Counting On: menghitung maju dimulai dari bilangan yang besar atau yang kecil? Ucapkan satu kata.";
    case "cerita":
      if (cara === "klik") return `Metode IGIL: ada cerita penjumlahan pada ${g} ini. Berapa jumlah ${namaO(l.o)} semuanya? Pilih bilangannya.`;
      if (cara === "kanvas") return `Metode IGIL: ada cerita penjumlahan pada ${g} ini. Berapa ${l.kanvas === "satuan" ? "satuan" : "puluhan"} jumlah ${namaO(l.o)} semuanya? Tulis satu angka di kanvas.`;
      return "Metode IGIL: kata ditambah pada cerita itu menunjukkan operasi apa? Ucapkan satu kata.";
    case "tukar":
      if (cara === "kanvas") return `Standard Addition: tukar urutan kedua bilangan pada ${g} ini. Berapa satuan jumlahnya? Tulis satu angka di kanvas.`;
      return `Counting On: kedua bilangan pada ${g} ini ditukar urutannya. Hasilnya lebih, kurang, atau sama? ${cara === "klik" ? "Pilih katanya." : "Ucapkan satu kata."}`;
    case "urut":
      return "Metode IGIL: ketuk langkah susun pendek dari yang pertama sampai yang terakhir.";
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "susun":
      if (cara === "klik") return "Berapa jumlahnya?";
      if (cara === "kanvas") return d.kanvas === "satuan" ? "Berapa satuan hasilnya?" : "Berapa puluhan hasilnya?";
      return d.kata === "simpan" ? "Apa yang dilakukan pada satu puluhan itu?" : d.kata === "puluhan" ? "Ditambahkan ke tempat apa?" : "Dimulai dari tempat mana?";
    case "panjang":
      if (cara === "klik") return "Berapa jumlahnya?";
      if (cara === "kanvas") return d.kanvas === "puluh" ? "Berapa jumlah puluhannya?" : "Berapa jumlah satuannya?";
      return "Berapa jumlah bagian puluhannya?";
    case "tiga":
      return cara === "kanvas" ? (d.kanvas === "satuan" ? "Berapa satuan jumlah seluruhnya?" : "Berapa puluhan jumlah seluruhnya?") : "Berapa jumlah seluruhnya?";
    case "pasang":
      return cara === "klik" ? "Berapa jumlahnya?" : cara === "kanvas" ? "Berapa yang diambil?" : "Menjadi puluhan penuh berapa?";
    case "maju":
      return cara === "klik" ? "Berapa jumlahnya?" : cara === "kanvas" ? (d.kanvas === "puluh" ? "Berapa lompatan sepuluh?" : "Berapa lompatan satu?") : "Mulai dari yang besar atau yang kecil?";
    case "cerita":
      return cara === "klik" ? "Berapa jumlah semuanya?" : cara === "kanvas" ? (d.kanvas === "satuan" ? "Berapa satuan jumlahnya?" : "Berapa puluhan jumlahnya?") : "Operasi apa yang ditunjukkan?";
    case "tukar":
      return cara === "kanvas" ? "Berapa satuan jumlahnya?" : "Hasilnya lebih, kurang, atau sama?";
    case "urut":
      return "";
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya (tanpa digit). `jawab`: kata yang dipilih atau diucapkan, atau angka yang dipilih atau ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number, rupa: Rupa = "benda"): string {
  if (l.tipe === "salah") {
    if (l.jawabTokoh !== undefined && String(jawab) === String(l.jawabTokoh)) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab, rupa);
  }
  const kurangSepuluh = typeof jawab === "number" && (cara === "klik" || cara === "suara") && jumlahDari(l as LangkahDasar) - 10 === jawab;
  if (kurangSepuluh && l.tipe !== "maju" && l.tipe !== "tukar" && l.tipe !== "urut") return "Jawabanmu kurang sepuluh. Satuan sepuluh atau lebih berarti satu puluhan harus disimpan, lalu dijumlahkan dengan puluhan.";
  switch (l.tipe) {
    case "susun":
      if (cara === "suara") return "Satuan sepuluh atau lebih: tulis sisanya, lalu simpan satu puluhan dan tambahkan ke tempat puluhan. Penjumlahan dimulai dari satuan.";
      if (cara === "kanvas") return "Jumlahkan satuan dulu. Bila sepuluh atau lebih, tulis sisanya dan simpan satu puluhan. Lalu jumlahkan puluhan beserta simpanan.";
      return "Susun lurus, jumlahkan satuan dulu, simpan satu puluhan bila satuannya sepuluh atau lebih, lalu jumlahkan puluhan.";
    case "panjang":
      if (cara === "suara") return "Uraikan tiap bilangan. Jumlahkan bagian puluhannya saja: puluhan dengan puluhan, tanpa satuan.";
      if (cara === "kanvas") return l.kanvas === "puluh" ? "Jumlahkan hanya angka puluhan kedua bilangan." : "Jumlahkan hanya angka satuan kedua bilangan.";
      return "Uraikan kedua bilangan menjadi puluhan dan satuan, jumlahkan puluhan dan satuan masing-masing, lalu gabungkan.";
    case "tiga":
      return "Jumlahkan dua bilangan pertama dulu, satuan dulu dan simpan bila perlu. Lalu tambahkan bilangan ketiga.";
    case "pasang":
      if (cara === "kanvas") return "Lihat satuan bilangan pertama. Berapa lagi supaya menjadi sepuluh? Itulah yang diambil dari bilangan kedua.";
      if (cara === "suara") return "Tambahkan pecahan kecil ke bilangan pertama sampai menjadi puluhan penuh.";
      return "Pecah bilangan kedua supaya bilangan pertama menjadi puluhan penuh, lalu tambahkan sisanya.";
    case "maju":
      if (kurangSepuluh) return "Jawabanmu kurang sepuluh. Hitung lompatan sepuluh sebanyak puluhan bilangan yang lebih kecil, lalu lompatan satu.";
      if (cara === "suara") return "Mulailah dari bilangan yang lebih besar, supaya lompatannya lebih sedikit.";
      if (cara === "kanvas") return "Pisahkan bilangan yang lebih kecil menjadi puluhan dan satuan. Puluhannya jadi lompatan sepuluh, satuannya jadi lompatan satu.";
      return "Mulai dari bilangan yang lebih besar, maju per sepuluh dulu, lalu per satu.";
    case "cerita":
      if (cara === "suara") return "Kata ditambah menunjukkan penjumlahan.";
      return "Tulis kalimat penjumlahan dari cerita, lalu hitung dengan susun, satuan dulu.";
    case "tukar":
      if (cara === "kanvas") return "Hitung jumlahnya, lalu lihat satuan hasilnya. Menukar urutan tidak mengubah jumlah.";
      return "Menukar urutan penjumlahan tidak mengubah hasilnya, jadi hasilnya sama.";
    case "urut":
      return "Urutannya dimulai dari menyusun lurus, lalu satuan, lalu simpan, lalu puluhan.";
  }
}

/** Petunjuk saat langkah yang diketuk keliru (tugas urut). */
export function petunjukKetuk(l: LUrut, i: number): string {
  void l;
  return i === 0 ? "Langkah itu belum waktunya. Mulai dari menyusun bilangan lurus." : "Bukan langkah itu dulu. Ingat: susun lurus, satuan dulu, simpan bila perlu, lalu puluhan.";
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
/** Isi kartu kata untuk tahap Abstract (tampilan boleh memakai angka). */
export function barisKartu(l: LangkahDasar, cara: Cara = "klik"): string[] {
  switch (l.tipe) {
    case "susun":
      return [`${l.a} + ${l.b} = ?`, "susun pendek, satuan dulu"];
    case "panjang":
      return [`${l.a} = ${puluhanDari(l.a) * 10} + ${satuanDari(l.a)}`, `${l.b} = ${puluhanDari(l.b) * 10} + ${satuanDari(l.b)}`, `${l.a} + ${l.b} = ?`];
    case "tiga":
      return [`${l.a} + ${l.b} + ${l.c} = ?`, "jumlahkan dua-dua"];
    case "pasang":
      return cara === "kanvas" ? [`${l.a} + ${l.b} = ?`, `${l.b} dipecah: ? dan ?`] : [`${l.a} + ${l.b} = ?`, `${l.b} = ${ambilDari(l.a)} + ${l.b - ambilDari(l.a)}`];
    case "maju":
      return [`${l.a} + ${l.b} = ?`, `mulai dari ${lebihBesar(l.a, l.b)}`];
    case "cerita":
      return [`${l.a} ${namaO(l.o)} ditambah ${l.b} ${namaO(l.o)}`, `${l.a} + ${l.b} = ?`];
    case "tukar":
      return [`${l.a} + ${l.b} = ${l.a + l.b}`, `${l.b} + ${l.a} = ?`];
    case "urut":
      return [`${l.a} + ${l.b} = ?`, "susun pendek"];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
