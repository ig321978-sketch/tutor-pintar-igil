/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 3 Sub-Bab C "Pakan Bu Lastri" (mengukur berat dengan satuan baku):
 * jenis tugas, kunci, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-timbang-k3b3c.mjs.
 * Jawaban beragam: memilih ukuran bersatuan, tangan, langkah, atau jenis timbangan (klik), menulis satu angka (angka jarum, selisih, banyak kantong, jarum mundur) di kanvas,
 * dan mengucapkan satu kata (gram, kilogram, kiri, kanan, digital, duduk, badan) atau bilangan pendek. Kunci dihitung dari data, bukan kunci tetap.
 * Empat metode tiap misi: IGIL "Jarum di Nol, Baca, Tulis Satuan", Hefting (Mengangkat dan Merasakan), Benchmark Weights (Berat Acuan), Zero Check (Cek Angka Nol).
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
export type Satuan = "g" | "kg";
export type JenisAlat = "digital" | "duduk" | "badan";
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
export const namaSatuan = (s: Satuan): string => (s === "g" ? "gram" : "kilogram");
export const ukuran = (angka: number, satuan: Satuan): string => `${angka} ${satuan}`;
/** Ubah teks berangka dan bersatuan menjadi ucapan tanpa digit: "180 g" menjadi "seratus delapan puluh gram". */
export function ucapkan(t: string): string {
  return t
    .replace(/\d+/g, (d) => ` ${kataBil(Number(d))} `)
    .replace(/\bkg\b/g, " kilogram ")
    .replace(/\bg\b/g, " gram ")
    .replace(/\s+/g, " ")
    .trim();
}

/* ------------------------------ Jenis tugas ------------------------------ */
/**
 * Membaca timbangan: `alat` "digital" (layar, gram) atau "jarum" (timbangan duduk, kilogram, angka 1 sampai 9), benda di atasnya, dan berat `angka` `satuan`.
 * klik: pilih ukuran bersatuan; kanvas: angka yang ditunjuk jarum; suara: satuan yang tepat (gram atau kilogram).
 */
export type LBaca = { tipe: "baca"; alat: "digital" | "jarum"; angka: number; satuan: Satuan; benda: string; emoji: string };
/** Hefting: dua benda di kedua tangan (kiri dan kanan), timbangan membenarkan beratnya. klik: tangan yang lebih berat; kanvas: selisih berat (kilogram); suara: tangan yang lebih ringan. */
export type LBanding = { tipe: "banding"; benda: [string, string]; emoji: [string, string]; berat: [number, number]; satuan: Satuan };
/** Berat acuan: satu kantong gula satu kilogram atau satu butir telur lima puluh gram, banyaknya `n`. klik: berat seluruhnya bersatuan; kanvas dan suara: banyak kilogram untuk kantong gula. */
export type LAcuan = { tipe: "acuan"; acuan: "gula" | "telur"; n: number };
/** Cek angka nol: jarum (kilogram) atau layar (gram) menunjuk `awal`, belum di nol. klik: langkah pertama; kanvas: jarum harus diputar mundur berapa angka; suara: angka yang harus ditunjuk (nol). */
export type LNol = { tipe: "nol"; alat: "digital" | "jarum"; awal: number };
/** Memilih timbangan untuk satu benda. klik: nama timbangan; suara: jenis (digital, duduk, badan). */
export type LAlat = { tipe: "alat"; benda: string; emoji: string; alat: JenisAlat };
export type LangkahDasar = LBaca | LBanding | LAcuan | LNol | LAlat;
/** Cari kesalahan: tokoh sudah menjawab dari `dasar`. Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LBaca | LNol;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "angkat" | "acuan" | "nol";
export const URUT_METODE: Metode[] = ["igil", "angkat", "acuan", "nol"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Jarum di Nol, Baca, Tulis Satuan",
  angkat: "Hefting: Mengangkat dan Merasakan",
  acuan: "Benchmark Weights: Berat Acuan",
  nol: "Zero Check: Cek Angka Nol",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{2696}", angkat: "\u{270B}", acuan: "\u{1F95A}", nol: "\u{2B55}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", angkat: "Hefting", acuan: "Benchmark Weights", nol: "Zero Check" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

export const NAMA_ALAT: Record<JenisAlat, string> = { digital: "timbangan digital", duduk: "timbangan duduk", badan: "timbangan badan" };
export const ACUAN = { gula: { nama: "kantong gula", satu: 1, satuan: "kg" as Satuan }, telur: { nama: "butir telur", satu: 50, satuan: "g" as Satuan } } as const;
/** Berat seluruhnya dari acuan: n kantong gula dalam kilogram, atau n butir telur dalam gram. */
export const beratAcuan = (l: LAcuan): number => l.n * ACUAN[l.acuan].satu;
export const selisihBanding = (l: LBanding): number => Math.abs(l.berat[0] - l.berat[1]);
/** Tangan yang lebih berat (0 kiri, 1 kanan). */
export const lebihBerat = (l: LBanding): 0 | 1 => (l.berat[0] > l.berat[1] ? 0 : 1);
const namaTangan = (i: number): string => (i === 0 ? "kiri" : "kanan");
/** Bilangan yang keliru untuk pengecoh ukuran (sepersepuluh bila besar, sepuluh kali bila kecil). */
const bilanganKeliru = (n: number): number => (n >= 100 ? Math.round(n / 10) : n * 10);

/** Angka yang ditulis atau diucapkan bila jawabannya bilangan. */
export function angkaJawab(l: Langkah, cara: Cara): number | null {
  const k = kunciJawab(l, cara);
  return k && k.jenis === "angka" ? k.n : null;
}

/* ------------------------------ Kunci ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });

/** Kunci tiap tugas menurut caranya, dihitung dari data. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "baca":
      if (cara === "suara") return nama(namaSatuan(l.satuan));
      if (cara === "kanvas") return angka(l.angka);
      return nama(ukuran(l.angka, l.satuan));
    case "banding":
      if (cara === "kanvas") return angka(selisihBanding(l));
      if (cara === "suara") return nama(namaTangan(1 - lebihBerat(l)));
      return nama(namaTangan(lebihBerat(l)));
    case "acuan":
      if (cara === "klik") return nama(ukuran(beratAcuan(l), ACUAN[l.acuan].satuan));
      return angka(l.n);
    case "nol":
      if (cara === "kanvas") return angka(l.awal);
      if (cara === "suara") return angka(0);
      return nama("setel ke nol");
    case "alat":
      return cara === "suara" ? nama(l.alat) : nama(NAMA_ALAT[l.alat]);
  }
}

/** Apakah tugas langsung siap dijawab? Semua tugas punya kunci, kecuali Cari kesalahan yang memakai kegiatan lebih dulu. Tidak bergantung pada rupa. */
export function siapLangsung(l: Langkah, rupa: Rupa, cara: Cara): boolean {
  void rupa;
  if (l.tipe === "salah") return false;
  return kunciJawab(l, cara) !== null;
}

/* ------------------------------ Pilihan ------------------------------ */
/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisipkan(benar: string, lain: string[], geser: number): string[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}
const benihTeks = (t: string): number => Array.from(t).reduce((s, c) => s + c.charCodeAt(0), 0);
/** Kunci dan dua pengecoh tugas klik. */
function opsiKlik(d: LangkahDasar): { benar: string; pengecoh: string[] } {
  switch (d.tipe) {
    case "baca": {
      const lain: Satuan = d.satuan === "g" ? "kg" : "g";
      return { benar: ukuran(d.angka, d.satuan), pengecoh: [ukuran(d.angka, lain), ukuran(bilanganKeliru(d.angka), d.satuan)] };
    }
    case "banding": {
      const b = lebihBerat(d);
      return { benar: namaTangan(b), pengecoh: [namaTangan(1 - b), "sama berat"] };
    }
    case "acuan": {
      const a = ACUAN[d.acuan];
      const total = beratAcuan(d);
      const lain: Satuan = a.satuan === "g" ? "kg" : "g";
      return { benar: ukuran(total, a.satuan), pengecoh: [ukuran(total, lain), ukuran(bilanganKeliru(total), a.satuan)] };
    }
    case "nol":
      return { benar: "setel ke nol", pengecoh: ["letakkan benda", "baca angka"] };
    case "alat":
      return { benar: NAMA_ALAT[d.alat], pengecoh: (["digital", "duduk", "badan"] as JenisAlat[]).filter((x) => x !== d.alat).map((x) => NAMA_ALAT[x]) };
  }
}
/** Tiga pilihan untuk tugas klik: kunci tidak pernah di tombol pertama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k || k.jenis !== "nama") return [];
  const { benar, pengecoh } = opsiKlik(dasarDari(l));
  const urut = l.tipe === "salah" && l.jawabTokoh !== benar ? [l.jawabTokoh, ...pengecoh.filter((x) => x !== l.jawabTokoh)] : pengecoh;
  return sisipkan(benar, urut.slice(0, 2), benihTeks(benar));
}
/** Bilangan cadangan (kata) untuk tugas suara berjawaban angka: kunci dan dua bilangan lain. */
function pilihanAngka(n: number): string[] {
  const lain: number[] = [];
  for (const x of [n + 1, n + 10, n - 1, n + 2, n + 5]) if (Number.isInteger(x) && x >= 0 && x <= 100 && x !== n && !lain.includes(x)) lain.push(x);
  return sisipkan(kataBil(n), lain.slice(0, 2).map(kataBil), n);
}
/** Pilihan cadangan untuk tugas suara (kata atau bilangan dalam kata). */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k) return [];
  if (k.jenis === "angka") return pilihanAngka(k.n);
  const d = dasarDari(l);
  const semua: string[] = d.tipe === "baca" ? ["gram", "kilogram", "meter"] : d.tipe === "banding" ? ["kiri", "kanan", "sama"] : ["digital", "duduk", "badan"];
  return sisipkan(k.nama, semua.filter((x) => x !== k.nama), benihTeks(k.nama));
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : "gambar");
const ringanBerat = (s: Satuan): string => (s === "g" ? "ringan, jadi satuannya gram" : "berat, jadi satuannya kilogram");

export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "baca":
      if (cara === "suara") return `${kapital(d.benda)} itu ${ringanBerat(d.satuan)}.`;
      if (cara === "kanvas") return `Jarum menunjuk angka ${kataBil(d.angka)}, jadi beratnya ${kataBil(d.angka)} kilogram.`;
      return `Angka terbaca ${kataBil(d.angka)}, dan ${d.benda} ${ringanBerat(d.satuan)}. Beratnya ${kataBil(d.angka)} ${namaSatuan(d.satuan)}.`;
    case "banding": {
      const b = lebihBerat(d);
      const [x, y] = d.berat;
      if (cara === "kanvas") return `${kapital(kataBil(Math.max(x, y)))} dikurangi ${kataBil(Math.min(x, y))} sama dengan ${kataBil(selisihBanding(d))}, jadi selisihnya ${kataBil(selisihBanding(d))} kilogram.`;
      if (cara === "suara") return `Tangan ${namaTangan(1 - b)} memegang benda yang lebih ringan.`;
      return `Tangan ${namaTangan(b)} memegang benda yang lebih berat: ${kataBil(Math.max(x, y))} ${namaSatuan(d.satuan)} lebih besar daripada ${kataBil(Math.min(x, y))} ${namaSatuan(d.satuan)}.`;
    }
    case "acuan": {
      const a = ACUAN[d.acuan];
      if (cara === "klik") return `Satu ${a.nama} kira-kira ${kataBil(a.satu)} ${namaSatuan(a.satuan)}, jadi ${kataBil(d.n)} ${a.nama} kira-kira ${kataBil(beratAcuan(d))} ${namaSatuan(a.satuan)}.`;
      return `Satu kantong gula satu kilogram, jadi ${kataBil(d.n)} kantong gula kira-kira ${kataBil(d.n)} kilogram.`;
    }
    case "nol":
      if (cara === "kanvas") return `Jarum menunjuk angka ${kataBil(d.awal)}, jadi harus diputar mundur ${kataBil(d.awal)} angka sampai tepat di nol.`;
      if (cara === "suara") return "Sebelum menimbang, jarum atau layar harus tepat di angka nol.";
      return "Sebelum menimbang, setel dulu jarum atau layar ke nol. Baru benda diletakkan dan angkanya dibaca.";
    case "alat":
      if (cara === "suara") return `${kapital(d.benda)} ditimbang dengan timbangan ${d.alat}.`;
      return `${kapital(d.benda)} ditimbang dengan ${NAMA_ALAT[d.alat]}.`;
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  const aw = AWALAN[metode];
  const tulis = "Tulis satu angka di kanvas.";
  switch (l.tipe) {
    case "baca":
      if (cara === "klik") return `${aw}: lihat ${g} timbangan ini. Jarum atau layar sudah di nol. Baca angkanya, lalu pilih ukuran dengan satuan yang tepat untuk bendanya.`;
      if (cara === "kanvas") return `${aw}: lihat ${g} timbangan duduk ini. Jarum sudah di nol sebelum benda diletakkan. Berapa kilogram yang ditunjuk jarum? ${tulis}`;
      return `${aw}: lihat ${g} timbangan ini. Benda itu ditimbang dengan satuan apa? Ucapkan satu kata.`;
    case "alat":
      if (cara === "suara") return `${aw}: lihat benda pada ${g} ini. Benda itu ditimbang dengan timbangan jenis apa? Ucapkan satu kata: digital, duduk, atau badan.`;
      return `${aw}: lihat benda pada ${g} ini. Pilih timbangan yang tepat untuk menimbangnya.`;
    case "banding":
      if (cara === "kanvas") return `${aw}: lihat ${g} ini. Dua benda dipegang di kedua tangan, lalu ditimbang. Berapa selisih kedua berat dalam kilogram? ${tulis}`;
      if (cara === "suara") return `${aw}: lihat ${g} ini. Dua benda dipegang di kedua tangan, lalu ditimbang. Tangan mana yang memegang benda lebih ringan? Ucapkan satu kata.`;
      return `${aw}: lihat ${g} ini. Dua benda dipegang di kedua tangan, lalu timbangan membenarkan beratnya. Tangan mana yang memegang benda lebih berat? Pilih jawabannya.`;
    case "acuan":
      if (cara === "klik") return `${aw}: lihat ${g} ini. Pakai berat acuan untuk memperkirakan berat seluruhnya. Pilih ukuran yang tepat.`;
      if (cara === "kanvas") return `${aw}: satu kantong gula beratnya satu kilogram. Berapa kilogram berat semua kantong pada ${g} ini? ${tulis}`;
      return `${aw}: satu kantong gula beratnya satu kilogram. Berapa kilogram berat semua kantong pada ${g} ini? Ucapkan bilangannya.`;
    case "nol":
      if (cara === "kanvas") return `${aw}: lihat ${g} timbangan duduk ini. Jarum belum di nol. Jarum harus diputar mundur berapa angka sampai tepat di nol? ${tulis}`;
      if (cara === "suara") return `${aw}: lihat ${g} timbangan ini. Sebelum benda diletakkan, jarum atau layar harus menunjuk angka berapa? Ucapkan bilangannya.`;
      return `${aw}: lihat ${g} timbangan ini. Jarum atau layar belum di nol. Apa yang harus dilakukan lebih dulu sebelum menimbang? Pilih jawabannya.`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "baca":
      return cara === "suara" ? "Benda itu ditimbang dengan satuan apa?" : cara === "kanvas" ? "Berapa kilogram yang ditunjuk jarum?" : "Berapa berat benda itu, lengkap dengan satuannya?";
    case "banding":
      return cara === "kanvas" ? "Berapa selisih kedua berat dalam kilogram?" : cara === "suara" ? "Tangan mana yang memegang benda lebih ringan?" : "Tangan mana yang memegang benda lebih berat?";
    case "acuan":
      return cara === "klik" ? "Kira-kira berapa berat seluruhnya?" : "Berapa kilogram berat semua kantong?";
    case "nol":
      return cara === "kanvas" ? "Jarum harus diputar mundur berapa angka?" : cara === "suara" ? "Angka berapa yang harus ditunjuk sebelum menimbang?" : "Apa yang harus dilakukan lebih dulu?";
    case "alat":
      return cara === "suara" ? "Timbangan jenis apa yang cocok?" : "Timbangan mana yang cocok?";
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya (tanpa digit). `jawab`: kata atau bilangan yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "baca":
      if (cara === "suara") return "Benda ringan, seperti segenggam biji atau sebutir telur, memakai gram. Benda berat, seperti karung pakan, memakai kilogram.";
      if (cara === "kanvas") return "Lihat ujung jarum pada angka di tepi lingkaran. Angka yang ditunjuk jarum adalah banyak kilogram.";
      return "Baca angka pada layar atau jarum, lalu pilih satuan yang cocok: gram untuk benda ringan dan kilogram untuk benda berat. Bilangan dan satuannya harus ikut dipilih.";
    case "alat":
      return "Benda kecil dan ringan ditimbang di timbangan digital, benda berat di timbangan duduk, dan hewan atau orang di timbangan badan.";
    case "banding":
      if (cara === "kanvas") return "Selisih didapat dengan mengurangkan berat yang besar dengan berat yang kecil. Satuannya tetap kilogram.";
      return "Tangan yang memegang benda lebih berat turun lebih rendah, dan angka berat yang lebih besar menunjukkan benda yang lebih berat. Lihat kedua angka berat dan bandingkan.";
    case "acuan":
      if (cara === "klik") return "Berat satu benda acuan dikalikan dengan banyaknya benda. Satuannya mengikuti benda acuan itu.";
      return "Satu kantong gula satu kilogram. Banyaknya kantong sama dengan banyaknya kilogram.";
    case "nol":
      if (cara === "kanvas") return "Jarum harus tepat di nol. Banyak angka yang diputar mundur sama dengan angka yang sekarang ditunjuk jarum.";
      if (cara === "suara") return "Sebelum menimbang, jarum atau layar harus tepat di angka nol.";
      return "Timbangan harus di nol dulu. Setel jarum atau layar sampai tepat di nol, baru benda diletakkan.";
  }
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
/** Isi kartu kata untuk tahap Abstract (kata dan angka). */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  switch (l.tipe) {
    case "baca":
      if (cara === "kanvas") return ["timbangan duduk", "jarum sudah di nol", `jarum menunjuk: ${l.angka}`, "banyak kilogram: ?"];
      if (cara === "suara") return [`benda: ${l.benda}`, `angka terbaca: ${l.angka}`, "satuan: ?"];
      return [`benda: ${l.benda}`, `timbangan: ${l.alat === "jarum" ? "duduk berjarum" : "digital berlayar"}`, `angka terbaca: ${l.angka}`, "ukuran: ?"];
    case "banding":
      return [`tangan kiri: ${l.benda[0]}`, `berat kiri: ${l.berat[0]} ${l.satuan}`, `tangan kanan: ${l.benda[1]}`, `berat kanan: ${l.berat[1]} ${l.satuan}`];
    case "acuan": {
      const a = ACUAN[l.acuan];
      return [`satu ${a.nama}: ${a.satu} ${a.satuan}`, `banyaknya: ${l.n}`, cara === "klik" ? "berat seluruhnya: ?" : "banyak kilogram: ?"];
    }
    case "nol":
      return [`${l.alat === "jarum" ? "jarum" : "layar"} menunjuk: ${l.awal}`, "benda belum diletakkan", cara === "suara" ? "harus menunjuk: ?" : cara === "kanvas" ? "diputar mundur: ?" : "langkah pertama: ?"];
    case "alat":
      return [`benda: ${l.benda}`, "jenis timbangan: ?"];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
