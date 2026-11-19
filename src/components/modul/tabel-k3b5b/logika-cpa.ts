/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 5 Sub-Bab B "Tabel Bu Wulan" (turus berlima, tabel tiga kolom, membaca tabel), akhir cerita Bengkel Sepeda Pak Hasan:
 * jenis tugas, jawaban benar, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-tabel-k3b5b.mjs.
 * Jawaban beragam: memilih bilangan, nama jenis, nama kolom, atau cara menulis turus (klik), menulis satu angka di kanvas, dan mengucapkan satu kata (terbanyak, tersedikit, lebih, kurang) atau bilangan pendek.
 * Jawaban benar dihitung dari data. Empat metode tiap misi: IGIL "Turus Berlima, Isi Tabel, Baca Kolom Banyak" (tiga langkah: hitung seluruhnya dari turus, salin turus menjadi angka, baca kolom banyak),
 * Tally Groups (Turus Berlima), Table Fill (Isi Tabel), dan Read and Ask (Baca dan Tanya).
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
/** Ubah teks berangka menjadi ucapan tanpa digit: "2 bundel dan 3 garis" menjadi "dua bundel dan tiga garis". */
export function ucapkan(t: string): string {
  return t
    .replace(/\d+/g, (d) => ` ${kataBil(Number(d))} `)
    .replace(/\s+/g, " ")
    .trim();
}

/* ------------------------------ Turus ------------------------------ */
/** Banyak bundel lima penuh dan garis sisa dari `n` data (paling banyak dua puluh). */
export const bundelDari = (n: number): { bundel: number; sisa: number } => ({ bundel: Math.floor(n / 5), sisa: n % 5 });
/** Turus ditulis dengan kata dan angka: 13 menjadi "2 bundel dan 3 garis", 10 menjadi "2 bundel", 3 menjadi "3 garis". */
export function teksTurus(n: number): string {
  const { bundel, sisa } = bundelDari(n);
  if (bundel === 0 && sisa === 0) return "tanpa garis";
  if (sisa === 0) return `${bundel} bundel`;
  if (bundel === 0) return `${sisa} garis`;
  return `${bundel} bundel dan ${sisa} garis`;
}

/* ------------------------------ Jenis tugas ------------------------------ */
/** Satu baris tabel: nama jenis dan banyaknya. */
export type Baris = { nama: string; n: number };
export type Tiga = [Baris, Baris, Baris];
/** Turus Berlima (IGIL): `n` data dituliskan dengan turus berlima; hitung banyak seluruhnya (klik), bundel penuh (kanvas), atau ucapkan banyaknya (suara). */
export type LCacah = { tipe: "cacah"; benda: string; n: number };
/** Isi Tabel (IGIL): satu baris dengan turus `n` (sampai sembilan); salin turus menjadi angka pada kolom banyak. */
export type LSalin = { tipe: "salin"; benda: string; n: number };
/** Baca Kolom Banyak (IGIL): tabel tiga baris; jenis terbanyak (klik), selisih terbanyak dan tersedikit (kanvas), baris yang disorot terbanyak atau tersedikit (suara). */
export type LBaca = { tipe: "baca"; benda: string; baris: Tiga; sorot: number };
/** Tally Groups: `n` data dipecah menjadi bundel lima dan garis sisa (sisa 1 sampai 4). */
export type LBundel = { tipe: "bundel"; benda: string; n: number };
/** Table Fill: tabel tiga kolom; nama kolom ketiga (klik), jumlah semua banyak (kanvas dan suara). */
export type LIsi = { tipe: "isi"; benda: string; baris: Tiga };
/** Read and Ask: jenis yang lebih dari bilangan `acuan` (klik), banyak jenis yang kurang dari acuan (kanvas), baris yang disorot lebih atau kurang dari acuan (suara). */
export type LTanya = { tipe: "tanya"; benda: string; baris: Tiga; acuan: number; sorot: number };
export type LangkahDasar = LCacah | LSalin | LBaca | LBundel | LIsi | LTanya;
/** Cari kesalahan: tokoh sudah menjawab dari `dasar`. Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. `jawabTokoh` adalah salah satu pilihan klik. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LCacah | LIsi | LTanya | LBaca;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "turus" | "isi" | "tanya";
export const URUT_METODE: Metode[] = ["igil", "turus", "isi", "tanya"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Turus Berlima, Isi Tabel, Baca Kolom Banyak",
  turus: "Tally Groups: Turus Berlima",
  isi: "Table Fill: Isi Tabel",
  tanya: "Read and Ask: Baca dan Tanya",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F9EE}", turus: "\u{270F}", isi: "\u{1F4CB}", tanya: "\u{1F64B}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", turus: "Tally Groups", isi: "Table Fill", tanya: "Read and Ask" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/** Indeks baris terbanyak dan tersedikit (data dibuat tanpa nilai kembar pada keduanya). */
export const indeksTerbanyak = (b: Tiga): number => b.reduce((m, x, i) => (x.n > b[m].n ? i : m), 0);
export const indeksTersedikit = (b: Tiga): number => b.reduce((m, x, i) => (x.n < b[m].n ? i : m), 0);
export const jumlahBanyak = (b: Tiga): number => b.reduce((t, x) => t + x.n, 0);
export const selisihBanyak = (b: Tiga): number => b[indeksTerbanyak(b)].n - b[indeksTersedikit(b)].n;
/** Jenis yang banyaknya lebih dari `acuan` (tepat sama dengan acuan tidak dihitung). */
export const lebihDari = (b: Tiga, acuan: number): Baris[] => b.filter((x) => x.n > acuan);
export const kurangDari = (b: Tiga, acuan: number): Baris[] => b.filter((x) => x.n < acuan);

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari data. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "cacah":
      return cara === "kanvas" ? angka(bundelDari(l.n).bundel) : angka(l.n);
    case "salin":
      return angka(l.n);
    case "baca":
      return cara === "klik" ? nama(l.baris[indeksTerbanyak(l.baris)].nama) : cara === "kanvas" ? angka(selisihBanyak(l.baris)) : nama(l.sorot === indeksTerbanyak(l.baris) ? "terbanyak" : "tersedikit");
    case "bundel": {
      const { bundel, sisa } = bundelDari(l.n);
      return cara === "klik" ? nama(`${bundel} bundel dan ${sisa} garis`) : cara === "kanvas" ? angka(sisa) : angka(bundel);
    }
    case "isi":
      return cara === "klik" ? nama("banyak") : angka(jumlahBanyak(l.baris));
    case "tanya":
      return cara === "klik" ? nama(lebihDari(l.baris, l.acuan)[0].nama) : cara === "kanvas" ? angka(kurangDari(l.baris, l.acuan).length) : nama(l.baris[l.sorot].n > l.acuan ? "lebih" : "kurang");
  }
}

/** Apakah tugas langsung siap dijawab? Semua tugas punya jawaban, kecuali Cari kesalahan yang memakai kegiatan lebih dulu. Tidak bergantung pada rupa. */
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
const unik = <T,>(xs: T[]): T[] => xs.filter((x, i) => xs.indexOf(x) === i);

/** Pengecoh bilangan: kesalahan khas (bundel dihitung enam, bundel dihitung satu, selisih sama dengan jumlah), lalu bilangan di dekatnya. */
export function pengecoh(l: Langkah, cara: Cara, awal?: number): number[] {
  const d = dasarDari(l);
  const k = kunciJawab(d, cara);
  const n = k?.jenis === "angka" ? k.n : 0;
  let khas: number[] = [];
  if (d.tipe === "cacah") {
    const { bundel, sisa } = bundelDari(d.n);
    khas = cara === "kanvas" ? [sisa, bundel + 1, bundel - 1] : [bundel * 6 + sisa, bundel + sisa, d.n + 5];
  } else if (d.tipe === "salin") khas = [d.n + 1, d.n - 1];
  else if (d.tipe === "baca") khas = [jumlahBanyak(d.baris), d.baris[indeksTerbanyak(d.baris)].n, d.baris[indeksTersedikit(d.baris)].n];
  else if (d.tipe === "bundel") khas = cara === "kanvas" ? [bundelDari(d.n).bundel, 5 - bundelDari(d.n).sisa] : [bundelDari(d.n).sisa, 5];
  else if (d.tipe === "isi") khas = [d.baris[0].n, d.baris[2].n, n + 5];
  else khas = [lebihDari(d.baris, d.acuan).length, 3 - kurangDari(d.baris, d.acuan).length];
  const calon = [awal ?? -1, ...khas, n + 1, n - 1, n + 2, n - 2, n + 10];
  const hasil: number[] = [];
  for (const c of calon) if (Number.isInteger(c) && c >= 0 && c <= 999 && c !== n && !hasil.includes(c)) hasil.push(c);
  return hasil;
}
/** Bilangan dalam jawaban klik tokoh: "9" menjadi 9. */
const angkaDariTeks = (t: string): number => Number(/\d+/.exec(t)?.[0] ?? -1);

/** Tiga pilihan untuk tugas klik: jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k) return [];
  const d = dasarDari(l);
  if (k.jenis === "angka") {
    const awal = l.tipe === "salah" ? angkaDariTeks(l.jawabTokoh) : undefined;
    const [a, b] = pengecoh(l, "klik", awal);
    return sisipkan(String(k.n), [String(a), String(b)], k.n);
  }
  if (d.tipe === "bundel") {
    const { bundel, sisa } = bundelDari(d.n);
    const lain = unik([`${sisa} bundel dan ${bundel} garis`, `${bundel + 1} bundel dan ${sisa} garis`, `${bundel} bundel dan ${sisa + 1} garis`, `${bundel} bundel dan ${sisa - 1} garis`]).filter((x) => x !== k.nama && !/-/.test(x) && !/(\d+) bundel dan 5 garis/.test(x));
    return sisipkan(k.nama, lain.slice(0, 2), bundel + sisa);
  }
  if (d.tipe === "isi") {
    const lain = unik([l.tipe === "salah" ? l.jawabTokoh : "", "jenis", "turus"].filter((x) => x && x !== k.nama));
    return sisipkan(k.nama, lain.slice(0, 2), k.nama.length);
  }
  const nm = (d.tipe === "baca" || d.tipe === "tanya" ? d.baris : []).map((b) => b.nama).filter((x) => x !== k.nama);
  return sisipkan(k.nama, nm.slice(0, 2), k.nama.length + (d.tipe === "tanya" ? d.acuan : 0));
}
/** Pilihan cadangan untuk tugas suara (kata atau bilangan dalam kata). */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k) return [];
  const d = dasarDari(l);
  if (k.jenis === "angka") {
    const lain: number[] = [];
    for (const x of [...pengecoh(l, cara), k.n + 10, k.n - 10, k.n + 1, k.n - 1]) if (x >= 1 && x <= 999 && x !== k.n && !lain.includes(x)) lain.push(x);
    return sisipkan(kataBil(k.n), lain.slice(0, 2).map(kataBil), k.n);
  }
  if (d.tipe === "baca") return sisipkan(k.nama, ["terbanyak", "tersedikit", "sama"].filter((x) => x !== k.nama), k.nama.length);
  return sisipkan(k.nama, ["lebih", "kurang", "sama"].filter((x) => x !== k.nama), k.nama.length);
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));
/** Teks pilihan klik yang benar (bilangan atau nama). */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  if (!k) return null;
  return k.jenis === "nama" ? k.nama : String(k.n);
}

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : rupa === "benda" ? "papan klub" : "kertas tabel");

export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  const k = kunciJawab(d, cara);
  const n = k?.jenis === "angka" ? k.n : 0;
  switch (d.tipe) {
    case "cacah": {
      const { bundel, sisa } = bundelDari(d.n);
      return cara === "kanvas" ? `Ada ${kataBil(bundel)} bundel lima penuh, jadi banyak bundelnya ${kataBil(bundel)}.` : `Tiap bundel hanya lima garis, empat tegak dan satu miring. ${kataBil(bundel)} bundel berarti ${kataBil(bundel * 5)}, ditambah ${kataBil(sisa)} garis sisa menjadi ${kataBil(d.n)}.`;
    }
    case "salin":
      return `Banyaknya sama dengan jumlah semua garis turus, jadi kolom banyak diisi ${kataBil(n)}.`;
    case "baca":
      return cara === "klik"
        ? `Jenis terbanyak punya angka terbesar pada kolom banyak, yaitu ${d.baris[indeksTerbanyak(d.baris)].nama}.`
        : cara === "kanvas"
          ? `Terbanyak ${kataBil(d.baris[indeksTerbanyak(d.baris)].n)} dikurangi tersedikit ${kataBil(d.baris[indeksTersedikit(d.baris)].n)} sama dengan ${kataBil(n)}.`
          : `Baris yang disorot punya angka ${d.sorot === indeksTerbanyak(d.baris) ? "terbesar" : "terkecil"} pada kolom banyak, jadi ${d.sorot === indeksTerbanyak(d.baris) ? "terbanyak" : "tersedikit"}.`;
    case "bundel": {
      const { bundel, sisa } = bundelDari(d.n);
      return cara === "klik" ? `${kataBil(d.n)} data sama dengan ${kataBil(bundel)} bundel lima dan ${kataBil(sisa)} garis sisa.` : cara === "kanvas" ? `Setelah ${kataBil(bundel)} bundel lima, tersisa ${kataBil(sisa)} garis.` : `${kataBil(d.n)} data memuat ${kataBil(bundel)} bundel lima penuh.`;
    }
    case "isi":
      return cara === "klik" ? "Kolom ketiga memuat angka banyaknya tiap jenis, jadi namanya kolom banyak." : `Jumlah semua banyak adalah ${d.baris.map((b) => kataBil(b.n)).join(" ditambah ")}, yaitu ${kataBil(jumlahBanyak(d.baris))}.`;
    case "tanya":
      return cara === "klik"
        ? `Hanya ${lebihDari(d.baris, d.acuan)[0].nama} yang banyaknya lebih dari ${kataBil(d.acuan)}. Yang tepat sama dengan ${kataBil(d.acuan)} tidak ikut dihitung.`
        : cara === "kanvas"
          ? `Yang kurang dari ${kataBil(d.acuan)} ada ${kataBil(n)} jenis.`
          : `Banyak baris yang disorot dibandingkan dengan ${kataBil(d.acuan)}, jadi ${d.baris[d.sorot].n > d.acuan ? "lebih" : "kurang"} dari acuan.`;
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  const aw = AWALAN[metode];
  const akhir = cara === "klik" ? "Pilih jawabannya." : cara === "kanvas" ? "Tulis satu angka di kanvas." : "Ucapkan bilangannya.";
  switch (l.tipe) {
    case "cacah":
      return cara === "kanvas"
        ? `${aw}: lihat turus pada ${g} ini. Berapa banyak bundel lima yang penuh? ${akhir}`
        : `${aw}: lihat turus pada ${g} ini. Satu bundel punya lima garis. Berapa banyak seluruhnya? ${akhir}`;
    case "salin":
      return `${aw}: lihat satu baris pada ${g} ini. Turusnya sudah ditulis. Berapa angka yang harus diisi pada kolom banyak? ${akhir}`;
    case "baca":
      return cara === "klik"
        ? `${aw}: lihat tabel pada ${g} ini. Baca kolom banyak. Jenis mana yang terbanyak? Pilih jenisnya.`
        : cara === "kanvas"
          ? `${aw}: lihat tabel pada ${g} ini. Berapa selisih antara yang terbanyak dan yang tersedikit? ${akhir}`
          : `${aw}: lihat tabel pada ${g} ini. Baris yang disorot itu terbanyak atau tersedikit? Ucapkan satu kata.`;
    case "bundel":
      return cara === "klik"
        ? `${aw}: ${kataBil(l.n)} data dituliskan dengan turus berlima. Berapa bundel lima dan berapa garis sisa? Pilih jawabannya.`
        : cara === "kanvas"
          ? `${aw}: ${kataBil(l.n)} data dituliskan dengan turus berlima. Berapa garis sisa di luar bundel? ${akhir}`
          : `${aw}: ${kataBil(l.n)} data dituliskan dengan turus berlima. Berapa banyak bundel lima yang penuh? ${akhir}`;
    case "isi":
      return cara === "klik"
        ? `${aw}: tabel pada ${g} ini punya tiga kolom, dan kolom ketiga belum diberi nama. Apa nama kolom ketiga? Pilih namanya.`
        : `${aw}: tabel pada ${g} ini sudah terisi. Berapa jumlah semua banyak dari ketiga baris? ${akhir}`;
    case "tanya":
      return cara === "klik"
        ? `${aw}: tanyakan pada tabel di ${g} ini. Jenis mana yang banyaknya lebih dari ${kataBil(l.acuan)}? Pilih jenisnya.`
        : cara === "kanvas"
          ? `${aw}: tanyakan pada tabel di ${g} ini. Berapa jenis yang banyaknya kurang dari ${kataBil(l.acuan)}? ${akhir}`
          : `${aw}: tanyakan pada tabel di ${g} ini. Baris yang disorot itu lebih atau kurang dari ${kataBil(l.acuan)}? Ucapkan satu kata.`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "cacah":
      return cara === "kanvas" ? "Berapa bundel lima yang penuh?" : "Berapa banyak seluruhnya?";
    case "salin":
      return "Berapa angka pada kolom banyak?";
    case "baca":
      return cara === "klik" ? "Jenis mana yang terbanyak?" : cara === "kanvas" ? "Berapa selisih terbanyak dan tersedikit?" : "Terbanyak atau tersedikit?";
    case "bundel":
      return cara === "klik" ? "Berapa bundel dan berapa garis sisa?" : cara === "kanvas" ? "Berapa garis sisa?" : "Berapa bundel lima yang penuh?";
    case "isi":
      return cara === "klik" ? "Apa nama kolom ketiga?" : "Berapa jumlah semua banyak?";
    case "tanya":
      return cara === "klik" ? `Jenis mana yang lebih dari ${kataBil(d.acuan)}?` : cara === "kanvas" ? `Berapa jenis yang kurang dari ${kataBil(d.acuan)}?` : `Lebih atau kurang dari ${kataBil(d.acuan)}?`;
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya (tanpa digit). `jawab`: kata atau bilangan yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "cacah":
      return cara === "kanvas"
        ? "Satu bundel lima adalah empat garis tegak dan satu coretan miring. Hitung ada berapa bundel yang penuh, bukan garis sisanya."
        : "Satu bundel hanya lima garis, karena coretan miring sudah termasuk. Hitung bundelnya dikali lima, lalu tambahkan garis sisa.";
    case "salin":
      return "Kolom banyak berisi jumlah semua garis turus. Hitung tiap bundel lima, lalu tambahkan garis sisa.";
    case "baca":
      return cara === "klik"
        ? "Lihat kolom banyak, bukan kolom turus. Yang terbanyak punya angka paling besar."
        : cara === "kanvas"
          ? "Kurangkan angka terkecil dari angka terbesar pada kolom banyak."
          : "Bandingkan angka baris yang disorot dengan baris lain. Angka paling besar berarti terbanyak, angka paling kecil berarti tersedikit.";
    case "bundel":
      return cara === "klik"
        ? "Tiap lima data menjadi satu bundel dengan coretan miring. Sisa data yang kurang dari lima ditulis sebagai garis tegak lepas."
        : cara === "kanvas"
          ? "Bagi data dengan lima. Bundel penuhnya dihitung dulu, sisa yang kurang dari lima adalah garis lepas."
          : "Hitung berapa kali lima ada di dalam banyak data. Itulah banyak bundel yang penuh.";
    case "isi":
      return cara === "klik"
        ? "Tabel punya tiga kolom: jenis, turus, dan satu kolom lagi untuk angka. Kolom angka itu bernama banyak."
        : "Jumlahkan angka pada kolom banyak ketiga baris, bukan turusnya.";
    case "tanya":
      return cara === "klik"
        ? "Lebih dari berarti angkanya harus lebih besar dari acuan. Angka yang tepat sama dengan acuan belum lebih dari acuan."
        : cara === "kanvas"
          ? "Kurang dari berarti angkanya harus lebih kecil dari acuan. Angka yang tepat sama dengan acuan tidak ikut dihitung."
          : "Bandingkan angka baris yang disorot dengan acuan. Lebih besar berarti lebih, lebih kecil berarti kurang.";
  }
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
/** Baris tabel dalam kata dan angka (tanpa emoji), untuk kartu tahap Abstract. */
export const barisTabelKata = (b: Tiga, tampilBanyak = true): string[] => b.map((x) => `${x.nama}: ${teksTurus(x.n)}${tampilBanyak ? `, banyak ${x.n}` : ""}`);
/** Isi kartu kata untuk tahap Abstract (kata dan angka, tanpa emoji). */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  switch (l.tipe) {
    case "cacah":
      return [`benda: ${l.benda}`, `turus: ${teksTurus(l.n)}`, cara === "kanvas" ? "bundel penuh: ?" : "banyak seluruhnya: ?"];
    case "salin":
      return [`benda: ${l.benda}`, `turus: ${teksTurus(l.n)}`, "banyak: ?"];
    case "baca":
      return [...l.baris.map((x, i) => `${i === l.sorot && cara === "suara" ? "> " : ""}${x.nama}: banyak ${x.n}`), cara === "klik" ? "jenis terbanyak: ?" : cara === "kanvas" ? "selisih terbanyak dan tersedikit: ?" : "baris yang ditandai: terbanyak atau tersedikit?"];
    case "bundel":
      return [`benda: ${l.benda}`, `banyak data: ${l.n}`, cara === "klik" ? "turus berlima: ? bundel dan ? garis" : cara === "kanvas" ? "garis sisa: ?" : "bundel lima penuh: ?"];
    case "isi":
      return [...barisTabelKata(l.baris, cara !== "klik"), cara === "klik" ? "kolom ketiga: ?" : "jumlah semua banyak: ?"];
    case "tanya":
      return [...l.baris.map((x, i) => `${i === l.sorot && cara === "suara" ? "> " : ""}${x.nama}: banyak ${x.n}`), `acuan: ${l.acuan}`, cara === "klik" ? "jenis yang lebih dari acuan: ?" : cara === "kanvas" ? "banyak jenis yang kurang dari acuan: ?" : "baris yang ditandai: lebih atau kurang?"];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
