/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 4 Sub-Bab A "Rangka Layang-layang Bu Ratih" (jenis garis, ruas garis diukur dari nol dalam cm dan mm, sisi bangun datar):
 * jenis tugas, jawaban benar, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-bilah-k3b4a.mjs.
 * Jawaban beragam: memilih nama jenis garis, ukuran bersatuan (mm, cm), atau nama sisi (klik), menulis satu angka di kanvas, dan mengucapkan satu kata (nama jenis, sama, berbeda) atau bilangan pendek.
 * Jawaban benar dihitung dari data. Empat metode tiap misi: IGIL "Kenali, Ukur dari Nol, Beri Nama Huruf", Odd One Out (Cari yang Beda), Measure Twice (Ukur Dua Kali), Label and Name (Beri Nama Huruf).
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
/** Ubah teks berangka dan bersatuan menjadi ucapan tanpa digit: "45 mm" menjadi "empat puluh lima milimeter", "7 cm" menjadi "tujuh sentimeter". */
export function ucapkan(t: string): string {
  return t
    .replace(/\d+/g, (d) => ` ${kataBil(Number(d))} `)
    .replace(/\bcm\b/g, " sentimeter ")
    .replace(/\bmm\b/g, " milimeter ")
    .replace(/\s+/g, " ")
    .trim();
}

/* ------------------------------ Jenis tugas ------------------------------ */
export type Sat = "mm" | "cm" | "sisi";
export const kataSat = (s: Sat): string => (s === "mm" ? "milimeter" : s === "cm" ? "sentimeter" : "sisi");
export type Jenis = "sinar garis" | "garis" | "ruas garis" | "kurva";
export const DAFTAR_JENIS: Jenis[] = ["sinar garis", "garis", "ruas garis", "kurva"];
export type NamaBangun = "segitiga" | "persegi" | "persegi panjang" | "segilima" | "segienam" | "lingkaran";
/** Bangun datar bernama huruf: `huruf` titik sudutnya berurutan (kosong untuk lingkaran, yang tidak punya sisi lurus). */
export type Bangun = { nama: NamaBangun; huruf: string[] };
/** Mengenali jenis garis dari satu gambar. */
export type LJenis = { tipe: "jenis"; benda: string; jenis: Jenis };
/** Membaca penggaris bergaris milimeter: ujung kiri ruas garis di `mulai` mm (0 bila tepat di nol), ujung kanan di `ujung` mm. Jawaban dalam `sat` (mm, atau cm bila panjang sentimeter penuh). */
export type LBaca = { tipe: "baca"; benda: string; mulai: number; ujung: number; sat: "mm" | "cm" };
/** Mengubah `cm` sentimeter menjadi milimeter (satu sentimeter sama dengan sepuluh milimeter). */
export type LUbah = { tipe: "ubah"; benda: string; cm: number };
/** Odd One Out: empat gambar, tiga sejenis dan yang ke-`beda` (mulai dari nol) berbeda. */
export type LBeda = { tipe: "beda"; benda: string; gambar: [Jenis, Jenis, Jenis, Jenis]; beda: number };
/** Measure Twice: ruas garis sepanjang `panjang` mm diukur dua kali; ukuran kedua dimulai dari `awal` mm (nol berarti dimulai dari nol juga, jadi hasilnya sama). */
export type LDua = { tipe: "dua"; benda: string; panjang: number; awal: number };
/** Label and Name: bangun datar dengan huruf pada titik sudut; menyebut sisi dan menghitung banyak sisi. */
export type LSisi = { tipe: "sisi"; benda: string; bangun: Bangun };
export type LangkahDasar = LJenis | LBaca | LUbah | LBeda | LDua | LSisi;
/** Cari kesalahan: tokoh sudah menjawab dari `dasar`. Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. `jawabTokoh` memakai satuan ("400 mm"), nama jenis, atau "1 sisi". */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LJenis | LBaca | LSisi;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "beda" | "dua" | "huruf";
export const URUT_METODE: Metode[] = ["igil", "beda", "dua", "huruf"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Kenali, Ukur dari Nol, Beri Nama Huruf",
  beda: "Odd One Out: Cari yang Beda",
  dua: "Measure Twice: Ukur Dua Kali",
  huruf: "Label and Name: Beri Nama Huruf",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F4CF}", beda: "\u{1F50D}", dua: "\u{1F501}", huruf: "\u{1F3F7}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", beda: "Odd One Out", dua: "Measure Twice", huruf: "Label and Name" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/** Banyak sisi bangun datar (lingkaran dan benda bundar tidak punya sisi lurus). */
export const banyakSisi = (b: Bangun): number => (b.nama === "lingkaran" ? 0 : b.huruf.length);
/** Nama sisi dari titik sudut ke-`i` ke titik sudut berikutnya, misalnya "LM". */
export const namaSisi = (b: Bangun, i: number): string => `${b.huruf[i]}${b.huruf[(i + 1) % b.huruf.length]}`;
/** Ruas garis antara dua titik sudut yang bukan sisi (diagonal), dipakai sebagai pengecoh. Segitiga tidak punya. */
export function diagonal(b: Bangun): string[] {
  const n = b.huruf.length;
  const out: string[] = [];
  for (let i = 0; i < n; i += 1) for (let j = i + 2; j < n; j += 1) if (!(i === 0 && j === n - 1)) out.push(`${b.huruf[i]}${b.huruf[j]}`);
  return out;
}
/** Sisi yang ditanyakan pada tugas klik: sisi kedua dari titik sudut pertama (dari B ke C pada ABC...). */
export const sisiTanya = (b: Bangun): string => namaSisi(b, 1);
/** Tugas Label and Name klik bertanya banyak sisi (bukan nama sisi) bila bangunnya lingkaran. */
const tanyaBanyak = (l: LSisi): boolean => l.bangun.nama === "lingkaran";

/** Angka hasil hitung tugas menurut caranya. Tugas jenis, nama sisi, dan sama atau berbeda tidak punya angka. */
export function angkaTugas(l: LangkahDasar, cara?: Cara): number | null {
  switch (l.tipe) {
    case "baca":
      return l.sat === "cm" ? (l.ujung - l.mulai) / 10 : l.ujung - l.mulai;
    case "ubah":
      return l.cm * 10;
    case "beda":
      return cara === "kanvas" ? l.beda + 1 : null;
    case "dua":
      return cara === "kanvas" ? l.awal / 10 : cara === "klik" ? l.panjang : null;
    case "sisi":
      return cara === "klik" && !tanyaBanyak(l) ? null : banyakSisi(l.bangun);
    default:
      return null;
  }
}
/** Satuan hasil tugas. */
export function satuanDari(l: LangkahDasar, cara?: Cara): Sat {
  switch (l.tipe) {
    case "baca":
      return l.sat;
    case "ubah":
      return "mm";
    case "dua":
      return cara === "kanvas" ? "cm" : "mm";
    default:
      return "sisi";
  }
}
export const teksUkuran = (n: number, s: Sat): string => `${n} ${s}`;
/** Panjang penggaris (sentimeter) yang cukup untuk ujung sejauh `mm` milimeter. */
export const maksSkala = (mm: number): number => [10, 12].find((m) => m * 10 >= mm) ?? Math.ceil(mm / 10);

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari data. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "jenis":
      return nama(l.jenis);
    case "baca":
    case "ubah":
      return angka(angkaTugas(l, cara) ?? 0);
    case "beda":
      return cara === "kanvas" ? angka(l.beda + 1) : nama(l.gambar[l.beda]);
    case "dua":
      return cara === "suara" ? nama(l.awal > 0 ? "berbeda" : "sama") : angka(angkaTugas(l, cara) ?? 0);
    case "sisi":
      if (cara === "klik" && !tanyaBanyak(l)) return nama(sisiTanya(l.bangun));
      return angka(banyakSisi(l.bangun));
  }
}

/** Apakah tugas langsung siap dijawab? Semua tugas punya jawaban, kecuali Cari kesalahan yang memakai kegiatan lebih dulu. Tidak bergantung pada rupa. */
export function siapLangsung(l: Langkah, rupa: Rupa, cara: Cara): boolean {
  void rupa;
  if (l.tipe === "salah") return false;
  return kunciJawab(l, cara) !== null;
}

/* ------------------------------ Pilihan ------------------------------ */
/** Pengecoh khas untuk jawaban bilangan, menurut jenis tugas. */
export function pengecoh(l: Langkah, cara: Cara, awal?: number): number[] {
  const d = dasarDari(l);
  const n = angkaTugas(d, cara === "suara" && d.tipe === "dua" ? "klik" : cara) ?? 0;
  const khas: number[] =
    d.tipe === "baca"
      ? [d.mulai > 0 ? d.ujung : -1, d.mulai > 0 ? d.mulai : -1, n * 10, Math.floor(n / 10)]
      : d.tipe === "ubah"
        ? [d.cm, d.cm * 100, d.cm * 10 + 10]
        : d.tipe === "dua"
          ? cara === "kanvas"
            ? [d.awal, d.awal / 10 + 1, d.awal / 10 - 1]
            : [d.awal + d.panjang, d.awal, d.panjang + 10]
          : d.tipe === "sisi"
            ? [n + 1, n - 1, n + 2]
            : [];
  const calon = [awal ?? -1, ...khas, n + 1, n - 1, n + 2, n - 2, n + 10];
  const hasil: number[] = [];
  for (const c of calon) if (Number.isInteger(c) && c >= (d.tipe === "sisi" ? 0 : 1) && c <= 999 && c !== n && !hasil.includes(c)) hasil.push(c);
  return hasil;
}
/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisipkan<T>(benar: T, lain: T[], geser: number): T[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}
/** Bilangan dalam jawaban klik tokoh: "400 mm" menjadi 400. */
const angkaDariTeks = (t: string): number => Number(/\d+/.exec(t)?.[0] ?? -1);
/** Tiga nama jenis: yang benar, jawaban tokoh (bila ada), dan nama lain. */
function pilihanJenis(benar: string, awal: string | undefined, pasangan?: string): string[] {
  const lain: string[] = [];
  for (const x of [awal ?? "", pasangan ?? "", ...DAFTAR_JENIS]) if (x && x !== benar && !lain.includes(x) && (DAFTAR_JENIS as string[]).includes(x)) lain.push(x);
  return sisipkan(benar, lain.slice(0, 2), benar.length);
}
/** Jenis yang dimiliki tiga gambar sejenis pada tugas Odd One Out. */
export const jenisSama = (l: LBeda): Jenis => l.gambar[(l.beda + 1) % 4];

/** Tiga pilihan untuk tugas klik: jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k) return [];
  const d = dasarDari(l);
  if (k.jenis === "nama") {
    if (d.tipe === "sisi") {
      const dia = diagonal(d.bangun);
      const salah = dia.length >= 2 ? dia : [...dia, `${d.bangun.huruf[0]}Z`, `${d.bangun.huruf[d.bangun.huruf.length - 1]}Z`];
      const lain = [...new Set(salah.filter((x) => x !== k.nama))].slice(0, 2);
      return sisipkan(k.nama, lain, k.nama.charCodeAt(0));
    }
    return pilihanJenis(k.nama, l.tipe === "salah" ? l.jawabTokoh : undefined, d.tipe === "beda" ? jenisSama(d) : undefined);
  }
  const sat = satuanDari(d, "klik");
  const awal = l.tipe === "salah" ? angkaDariTeks(l.jawabTokoh) : undefined;
  const [a, b] = pengecoh(l, "klik", awal);
  return sisipkan(teksUkuran(k.n, sat), [teksUkuran(a, sat), teksUkuran(b, sat)], k.n);
}
/** Pilihan cadangan untuk tugas suara (kata atau bilangan dalam kata). */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k) return [];
  const d = dasarDari(l);
  if (k.jenis === "angka") {
    const lain: number[] = [];
    for (const x of [...pengecoh(l, cara), k.n + 10, k.n - 10, k.n + 1, k.n - 1]) if (x >= (d.tipe === "sisi" ? 0 : 1) && x <= 999 && x !== k.n && !lain.includes(x)) lain.push(x);
    return sisipkan(kataBil(k.n), lain.slice(0, 2).map(kataBil), k.n);
  }
  if (d.tipe === "dua") return sisipkan(k.nama, ["sama", "berbeda"].filter((x) => x !== k.nama), k.nama.length);
  return pilihanJenis(k.nama, undefined, d.tipe === "beda" ? jenisSama(d) : undefined);
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));
/** Teks pilihan klik yang benar (ukuran bersatuan atau nama). */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  if (!k) return null;
  return k.jenis === "nama" ? k.nama : teksUkuran(k.n, satuanDari(dasarDari(l), "klik"));
}

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : "gambar");
const ujungKata = (d: LBaca): string => `${kataBil(d.mulai)} milimeter`;

export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  const k = kunciJawab(d, cara);
  const n = k?.jenis === "angka" ? k.n : 0;
  switch (d.tipe) {
    case "jenis":
      return d.jenis === "sinar garis"
        ? `${kapital(d.benda)} berpangkal di satu titik dan hanya menuju satu arah, jadi disebut sinar garis.`
        : d.jenis === "garis"
          ? `${kapital(d.benda)} lurus tanpa ujung ke kedua arah, jadi disebut garis.`
          : d.jenis === "ruas garis"
            ? `${kapital(d.benda)} lurus dan punya dua titik ujung, jadi disebut ruas garis.`
            : `${kapital(d.benda)} melengkung atau berkelok, jadi disebut kurva.`;
    case "baca":
      return d.sat === "cm"
        ? `Ujung kiri tepat di angka nol dan ujung kanan di ${kataBil(d.ujung)} milimeter, jadi panjangnya ${kataBil(n)} sentimeter.`
        : d.mulai === 0
          ? `Ujung kiri tepat di angka nol dan ujung kanan di ${kataBil(d.ujung)} milimeter, jadi panjangnya ${kataBil(d.ujung)} milimeter.`
          : `Ujung kiri di ${ujungKata(d)} dan ujung kanan di ${kataBil(d.ujung)} milimeter, jadi panjangnya ${kataBil(n)} milimeter.`;
    case "ubah":
      return `Satu sentimeter sama dengan sepuluh milimeter, jadi ${kataBil(d.cm)} sentimeter sama dengan ${kataBil(n)} milimeter.`;
    case "beda":
      return cara === "kanvas"
        ? `Tiga gambar berjenis ${jenisSama(d)} dan gambar nomor ${kataBil(n)} berjenis ${d.gambar[d.beda]}, jadi nomor ${kataBil(n)} yang berbeda.`
        : `Tiga gambar berjenis ${jenisSama(d)}, sedangkan satu gambar berjenis ${d.gambar[d.beda]}. Itulah yang berbeda.`;
    case "dua":
      if (cara === "kanvas") return `Bacaan kedua di ujung kanan lebih besar ${kataBil(d.awal)} milimeter, yaitu ${kataBil(n)} sentimeter, karena ujung kirinya tidak di angka nol.`;
      if (cara === "suara") return d.awal > 0 ? "Pengukuran kedua tidak dimulai dari angka nol, jadi bacaannya berbeda dan harus diperiksa." : "Kedua pengukuran dimulai dari angka nol, jadi hasilnya sama.";
      return `Ujung kiri harus di angka nol, jadi panjang ruas garis sama dengan bacaan pertama, yaitu ${kataBil(d.panjang)} milimeter.`;
    case "sisi":
      if (cara === "klik" && !tanyaBanyak(d)) return `Sisi adalah ruas garis antara dua titik sudut yang bersebelahan, jadi ${sisiTanya(d.bangun)} adalah sisi, sedangkan pasangan yang lain berseberangan.`;
      return d.bangun.nama === "lingkaran" ? "Tepi lingkaran berupa kurva, bukan ruas garis lurus, jadi lingkaran tidak punya sisi lurus." : `Bangun ${d.bangun.nama} punya ${kataBil(n)} titik sudut dan ${kataBil(n)} sisi, jadi banyak sisinya ${kataBil(n)}.`;
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  const aw = AWALAN[metode];
  const akhir = cara === "klik" ? "Pilih jawabannya." : cara === "kanvas" ? "Tulis satu angka di kanvas." : "Ucapkan bilangannya.";
  switch (l.tipe) {
    case "jenis":
      return `${aw}: lihat ${g} ini. Apa jenis garis yang digambar? ${cara === "klik" ? "Pilih namanya." : "Ucapkan namanya."}`;
    case "baca":
      return l.sat === "cm"
        ? `${aw}: lihat penggaris pada ${g} ini. Ujung kiri ruas garis tepat di angka nol. Berapa sentimeter panjang ruas garis itu? ${akhir}`
        : `${aw}: lihat penggaris bergaris milimeter pada ${g} ini. Berapa milimeter panjang ruas garis itu? ${akhir}`;
    case "ubah":
      return `${aw}: ${g} ini menunjukkan ruas garis sepanjang beberapa sentimeter. Satu sentimeter sama dengan sepuluh milimeter. Berapa milimeter panjang ruas garis itu? ${akhir}`;
    case "beda":
      return cara === "kanvas"
        ? `${aw}: lihat empat ${g}. Tiga di antaranya sejenis dan satu berbeda. Nomor berapa yang berbeda? ${akhir}`
        : `${aw}: lihat empat ${g}. Tiga di antaranya sejenis dan satu berbeda. Apa jenis ${g} yang berbeda? ${cara === "klik" ? "Pilih namanya." : "Ucapkan namanya."}`;
    case "dua":
      if (cara === "klik") return `${aw}: ruas garis pada ${g} ini diukur dua kali. Pengukuran pertama dimulai dari angka nol, pengukuran kedua dimulai dari angka lain. Berapa panjang ruas garis yang benar? Pilih ukurannya.`;
      if (cara === "kanvas") return `${aw}: ruas garis pada ${g} ini diukur dua kali, dan pengukuran kedua dimulai dari angka lain. Berapa sentimeter selisih kedua bacaan di ujung kanan? ${akhir}`;
      return `${aw}: ruas garis pada ${g} ini diukur dua kali, lalu kedua hasilnya dibandingkan. Apakah kedua hasil ukur sama atau berbeda? Ucapkan satu kata.`;
    case "sisi":
      if (cara === "klik" && !tanyaBanyak(l)) return `${aw}: lihat bangun datar bernama huruf pada ${g} ini. Sisi mana yang benar? Pilih namanya.`;
      if (tanyaBanyak(l)) return `${aw}: lihat bangun datar pada ${g} ini. Berapa banyak sisi lurusnya? ${akhir}`;
      return `${aw}: lihat bangun datar bernama huruf pada ${g} ini. Berapa banyak sisinya? ${akhir}`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "jenis":
      return "Apa jenis garis itu?";
    case "baca":
      return d.sat === "cm" ? "Berapa sentimeter panjang ruas garis itu?" : "Berapa panjang ruas garis itu?";
    case "ubah":
      return "Berapa milimeter panjang ruas garis itu?";
    case "beda":
      return cara === "kanvas" ? "Gambar nomor berapa yang berbeda?" : "Apa jenis yang berbeda?";
    case "dua":
      return cara === "klik" ? "Berapa panjang ruas garis yang benar?" : cara === "kanvas" ? "Berapa sentimeter selisih kedua bacaan?" : "Sama atau berbeda hasilnya?";
    case "sisi":
      return cara === "klik" && !tanyaBanyak(d) ? "Sisi mana yang benar?" : "Berapa banyak sisinya?";
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya (tanpa digit). `jawab`: kata atau ukuran yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "jenis":
      return "Sinar garis berpangkal di satu titik dan menuju satu arah. Garis tidak punya ujung. Ruas garis punya dua ujung. Kurva melengkung atau berkelok.";
    case "baca":
      return l.mulai > 0
        ? "Ujung kiri ruas garis tidak di angka nol. Kurangi angka di ujung kanan dengan angka di ujung kiri untuk mendapat panjangnya."
        : l.sat === "cm"
          ? "Ujung kiri tepat di angka nol, jadi panjang sama dengan angka di ujung kanan. Satu sentimeter sama dengan sepuluh milimeter, jadi hitung sentimeter penuh."
          : "Ujung kiri tepat di angka nol, jadi panjang sama dengan angka di ujung kanan. Satu sentimeter sama dengan sepuluh milimeter, bukan seratus, dan tulis juga satuannya.";
    case "ubah":
      return "Satu sentimeter sama dengan sepuluh milimeter. Kalikan banyak sentimeter dengan sepuluh untuk mendapat milimeter.";
    case "beda":
      return cara === "kanvas"
        ? "Cari tiga gambar yang jenisnya sama, lalu tulis nomor gambar yang jenisnya berbeda."
        : "Cari tiga gambar yang jenisnya sama. Gambar yang jenisnya berbeda itulah yang dicari, dan sebutlah jenisnya.";
    case "dua":
      return cara === "klik"
        ? "Ukuran yang benar dibaca dari pengukuran yang ujung kirinya tepat di angka nol. Bacaan yang ujung kirinya bukan di nol belum panjang ruas garis."
        : cara === "kanvas"
          ? "Selisih dua bacaan didapat dengan mengurangkan yang besar dengan yang kecil, dan satu sentimeter sama dengan sepuluh milimeter."
          : "Bila kedua pengukuran sama-sama dimulai dari angka nol, hasilnya sama. Bila salah satunya tidak dimulai dari nol, hasilnya berbeda.";
    case "sisi":
      return cara === "klik" && !tanyaBanyak(l)
        ? "Sisi adalah ruas garis di antara dua titik sudut yang bersebelahan. Dua titik sudut yang berseberangan bukan sisi."
        : l.bangun.nama === "lingkaran"
          ? "Tepi lingkaran berupa kurva, bukan ruas garis lurus, jadi lingkaran tidak punya sisi lurus."
          : "Hitung ruas garis yang membatasi bangun. Banyak sisi sama dengan banyak titik sudut.";
  }
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
/** Ciri tiap jenis garis untuk kartu kata. */
export const CIRI_JENIS: Record<Jenis, string> = {
  "sinar garis": "berpangkal di satu titik, menuju satu arah",
  garis: "lurus, tanpa ujung, ke dua arah",
  "ruas garis": "lurus, dengan dua titik ujung",
  kurva: "melengkung atau berkelok",
};
/** Isi kartu kata untuk tahap Abstract (kata dan angka, tanpa emoji). */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  switch (l.tipe) {
    case "jenis":
      return [`benda: ${l.benda}`, `ciri: ${CIRI_JENIS[l.jenis]}`, "jenis garis: ?"];
    case "baca":
      return [`benda: ${l.benda}`, `ujung kiri di angka: ${l.mulai} mm`, `ujung kanan di angka: ${l.ujung} mm`, l.sat === "cm" ? "panjang: ? cm" : "panjang: ? mm"];
    case "ubah":
      return [`benda: ${l.benda}`, `panjangnya: ${l.cm} cm`, "1 cm = 10 mm", "panjangnya: ? mm"];
    case "beda":
      return [...l.gambar.map((j, i) => `gambar ${i + 1}: ${CIRI_JENIS[j]}`), cara === "kanvas" ? "nomor yang berbeda: ?" : "jenis yang berbeda: ?"];
    case "dua":
      return [
        `benda: ${l.benda}`,
        "ukuran pertama: ujung kiri di angka 0 mm",
        `ukuran kedua: ujung kiri di angka ${l.awal} mm`,
        `bacaan pertama di ujung kanan: ${l.panjang} mm`,
        `bacaan kedua di ujung kanan: ${l.awal + l.panjang} mm`,
        cara === "klik" ? "panjang ruas garis: ?" : cara === "kanvas" ? "selisih kedua bacaan: ? cm" : "kedua hasil: sama atau berbeda?",
      ];
    case "sisi":
      return l.bangun.nama === "lingkaran"
        ? [`benda: ${l.benda}`, "bangun: lingkaran", "tepinya: satu garis lengkung (kurva)", "banyak sisi lurus: ?"]
        : [`benda: ${l.benda}`, `bangun: ${l.bangun.nama}`, `titik sudut: ${l.bangun.huruf.join(" ")}`, cara === "klik" ? "sisi yang benar: ?" : "banyak sisi: ?"];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
