/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 3 Sub-Bab A "Ukuran Kandang Kak Tari" (mengukur panjang dengan satuan baku):
 * jenis tugas, kunci, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-ukur-k3b3a.mjs.
 * Jawaban beragam: memilih ukuran bersatuan atau nama alat dan satuan (klik), menulis satu angka (angka hasil baca, selisih, banyak kuku) di kanvas,
 * dan mengucapkan satu kata (penggaris, meteran, sentimeter, meter, dekat, jauh) atau bilangan pendek. Kunci dihitung dari data, bukan kunci tetap.
 * Empat metode tiap misi: IGIL "Nol di Ujung, Baca Ujung Lain" (membaca penggaris, alat ukur), Estimate and Check (Perkirakan dan Periksa),
 * Benchmark Measuring (Ukuran Acuan: lebar kuku jari), Strip Ruler (Pita Penggaris: pita bergaris, selisih, satuan).
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);
export const HURUF = ["A", "B", "C", "D", "E", "F"] as const;
export const huruf = (i: number): string => HURUF[i] ?? "?";

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
/** Ubah teks berangka dan bersatuan menjadi ucapan tanpa digit: "8 cm" menjadi "delapan sentimeter", "6 m" menjadi "enam meter". */
export function ucapkan(t: string): string {
  return t
    .replace(/\d+/g, (d) => ` ${kataBil(Number(d))} `)
    .replace(/\bcm\b/g, " sentimeter ")
    .replace(/\bm\b/g, " meter ")
    .replace(/\s+/g, " ")
    .trim();
}

/* ------------------------------ Jenis tugas ------------------------------ */
export type Sat = "cm" | "m";
export const kataSat = (s: Sat): string => (s === "m" ? "meter" : "sentimeter");
/** Membaca penggaris: ujung kiri benda di `mulai` (0 bila tepat di nol), ujung kanan di `ujung`. Panjang = ujung - mulai. */
export type LBaca = { tipe: "baca"; benda: string; mulai: number; ujung: number; sat?: Sat };
/** Memilih alat ukur: benda sepanjang `panjang` `sat`. cm berarti penggaris, m berarti meteran. */
export type LAlat = { tipe: "alat"; benda: string; panjang: number; sat: Sat };
/** Estimate and Check: perkiraan dulu `perkiraan` cm, lalu diukur `ukur` cm. klik: hasil ukur; kanvas: selisih; suara: dekat (selisih paling banyak dua) atau jauh. */
export type LKira = { tipe: "kira"; benda: string; perkiraan: number; ukur: number };
/** Benchmark Measuring: lebar kuku jari kira-kira satu sentimeter; benda selebar `kuku` kuku, jadi panjangnya kira-kira `kuku` cm. */
export type LAcuan = { tipe: "acuan"; benda: string; kuku: number };
/** Strip Ruler: ujung pita bergaris ditempel di ujung benda; angka di ujung benda yang lain adalah panjangnya. */
export type LPita = { tipe: "pita"; benda: string; panjang: number; sat: Sat };
/** Selisih dua panjang `a` dan `b` (a lebih besar) yang diukur dengan pita. */
export type LSelisih = { tipe: "selisih"; benda: string; a: number; b: number; sat: Sat };
/** Memilih satuan yang tepat (sentimeter atau meter) untuk benda sepanjang `panjang` `sat`. */
export type LSatuan = { tipe: "satuan"; benda: string; panjang: number; sat: Sat };
export type LangkahDasar = LBaca | LAlat | LKira | LAcuan | LPita | LSelisih | LSatuan;
/** Cari kesalahan: tokoh sudah menjawab dari `dasar`. Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. `jawabTokoh` memakai satuan ("11 cm") atau nama alat. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LBaca | LAlat;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "kira" | "acuan" | "pita";
export const URUT_METODE: Metode[] = ["igil", "kira", "acuan", "pita"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Nol di Ujung, Baca Ujung Lain",
  kira: "Estimate and Check: Perkirakan dan Periksa",
  acuan: "Benchmark Measuring: Ukuran Acuan",
  pita: "Strip Ruler: Pita Penggaris",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F4CF}", kira: "\u{1F50D}", acuan: "\u{1F463}", pita: "\u{1F380}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", kira: "Estimate and Check", acuan: "Benchmark Measuring", pita: "Strip Ruler" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/** Angka hasil hitung tugas (panjang, selisih, atau banyak kuku). Tugas alat dan satuan tidak punya angka. */
export function angkaTugas(l: LangkahDasar, cara?: Cara): number | null {
  switch (l.tipe) {
    case "baca":
      return l.ujung - l.mulai;
    case "kira":
      return cara === "kanvas" ? Math.abs(l.ukur - l.perkiraan) : l.ukur;
    case "acuan":
      return l.kuku;
    case "pita":
      return l.panjang;
    case "selisih":
      return l.a - l.b;
    default:
      return null;
  }
}
/** Selisih perkiraan dan hasil ukur. */
export const selisihKira = (l: LKira): number => Math.abs(l.ukur - l.perkiraan);
/** Perkiraan disebut dekat bila selisihnya paling banyak dua sentimeter. */
export const BATAS_DEKAT = 2;
/** Satuan hasil ukur pada tugas. */
export function satuanDari(l: LangkahDasar): Sat {
  switch (l.tipe) {
    case "baca":
      return l.sat ?? "cm";
    case "kira":
    case "acuan":
      return "cm";
    default:
      return l.sat;
  }
}
export const teksUkuran = (n: number, s: Sat): string => `${n} ${s}`;
/** Skala penggaris (sentimeter) atau meteran (meter) yang cukup untuk panjang `v`. */
export const maksSkala = (v: number, sat: Sat): number => (sat === "m" ? [4, 6, 8, 10] : [10, 12, 15, 20, 25, 30, 35, 40]).find((m) => m >= v) ?? v;
/** Angka pada skala diberi tiap berapa satuan. */
export const tiapSkala = (maks: number, sat: Sat): number => (sat === "m" || maks <= 20 ? 1 : 5);

/* ------------------------------ Kunci ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });
export const namaAlat = (sat: Sat): string => (sat === "m" ? "meteran" : "penggaris");
export const namaSatuan = (sat: Sat): string => kataSat(sat);

/** Kunci tiap jenis tugas menurut caranya, dihitung dari data. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "alat":
      return nama(namaAlat(l.sat));
    case "satuan":
      return nama(namaSatuan(l.sat));
    case "kira":
      if (cara === "suara") return nama(selisihKira(l) <= BATAS_DEKAT ? "dekat" : "jauh");
      return angka(angkaTugas(l, cara) ?? 0);
    default:
      return angka(angkaTugas(l, cara) ?? 0);
  }
}

/** Apakah tugas langsung siap dijawab? Semua tugas punya kunci, kecuali Cari kesalahan yang memakai kegiatan lebih dulu. Tidak bergantung pada rupa. */
export function siapLangsung(l: Langkah, rupa: Rupa, cara: Cara): boolean {
  void rupa;
  if (l.tipe === "salah") return false;
  return kunciJawab(l, cara) !== null;
}

/* ------------------------------ Pilihan ------------------------------ */
/** Pengecoh khas untuk jawaban bilangan: bacaan di ujung kanan, angka di ujung kiri, jumlah dua angka, perkiraan, atau selisih satu dan dua. */
export function pengecoh(l: Langkah, awal?: number): number[] {
  const d = dasarDari(l);
  const n = angkaTugas(d, d.tipe === "kira" ? "klik" : undefined) ?? 0;
  const khas: number[] =
    d.tipe === "baca"
      ? [d.ujung, d.mulai, d.ujung + d.mulai]
      : d.tipe === "kira"
        ? [d.perkiraan, d.ukur + 2]
        : d.tipe === "acuan"
          ? [d.kuku + 1, d.kuku - 1, d.kuku * 2]
          : d.tipe === "pita"
            ? [d.panjang + 5, d.panjang - 5]
            : d.tipe === "selisih"
              ? [d.a, d.b, d.a + d.b]
              : [];
  const calon = [awal ?? -1, ...khas, n + 1, n - 1, n + 2, n - 2, n + 10];
  const hasil: number[] = [];
  for (const c of calon) if (Number.isInteger(c) && c >= 1 && c <= 99 && c !== n && !hasil.includes(c)) hasil.push(c);
  return hasil;
}
/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisipkan(benar: string, lain: string[], geser: number): string[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}
const DAFTAR_NAMA: Record<string, string[]> = {
  alat: ["penggaris", "meteran", "jengkal"],
  satuan: ["sentimeter", "meter", "jengkal"],
  kira: ["dekat", "jauh", "sama"],
};
/** Bilangan dalam jawaban klik tokoh: "11 cm" menjadi 11. */
const angkaDariTeks = (t: string): number => Number(/\d+/.exec(t)?.[0] ?? -1);
/** Tiga pilihan untuk tugas klik (ukuran bersatuan atau nama alat dan satuan): kunci tidak pernah di tombol pertama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k) return [];
  const d = dasarDari(l);
  if (k.jenis === "nama") {
    const semua = DAFTAR_NAMA[d.tipe] ?? [];
    return sisipkan(k.nama, semua.filter((x) => x !== k.nama), k.nama.length);
  }
  const sat = satuanDari(d);
  const awal = l.tipe === "salah" ? angkaDariTeks(l.jawabTokoh) : undefined;
  const [a, b] = pengecoh(l, awal);
  return sisipkan(teksUkuran(k.n, sat), [teksUkuran(a, sat), teksUkuran(b, sat)], k.n);
}
/** Pilihan cadangan untuk tugas suara (kata atau bilangan dalam kata). */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k) return [];
  if (k.jenis === "angka") {
    const lain: number[] = [];
    for (const x of [...pengecoh(l), k.n + 10, k.n - 10, k.n + 1, k.n - 1]) if (x >= 1 && x <= 99 && x !== k.n && !lain.includes(x)) lain.push(x);
    return sisipkan(kataBil(k.n), lain.slice(0, 2).map(kataBil), k.n);
  }
  const semua = DAFTAR_NAMA[dasarDari(l).tipe] ?? [];
  return sisipkan(k.nama, semua.filter((x) => x !== k.nama), k.nama.length);
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));
/** Teks pilihan klik yang benar (ukuran bersatuan atau nama). */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  if (!k) return null;
  return k.jenis === "nama" ? k.nama : teksUkuran(k.n, satuanDari(dasarDari(l)));
}

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : "gambar");

export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  const k = kunciJawab(d, cara);
  const n = k?.jenis === "angka" ? k.n : 0;
  switch (d.tipe) {
    case "baca":
      return d.mulai === 0
        ? `Ujung kiri benda tepat di angka nol, jadi panjangnya sama dengan angka di ujung kanan, yaitu ${kataBil(d.ujung)} ${kataSat(d.sat ?? "cm")}.`
        : `Ujung kiri di angka ${kataBil(d.mulai)} dan ujung kanan di angka ${kataBil(d.ujung)}, jadi panjangnya ${kataBil(d.ujung)} dikurangi ${kataBil(d.mulai)} sama dengan ${kataBil(n)} ${kataSat(d.sat ?? "cm")}.`;
    case "alat":
      return `${kapital(d.benda)} sepanjang ${kataBil(d.panjang)} ${kataSat(d.sat)}, jadi alat ukur yang tepat adalah ${namaAlat(d.sat)}.`;
    case "kira":
      if (cara === "kanvas") return `Hasil ukur ${kataBil(d.ukur)} dikurangi perkiraan ${kataBil(d.perkiraan)} sama dengan ${kataBil(n)} sentimeter.`;
      if (cara === "suara") return selisihKira(d) <= BATAS_DEKAT ? `Selisihnya ${kataBil(selisihKira(d))} sentimeter, paling banyak dua, jadi perkiraannya dekat.` : `Selisihnya ${kataBil(selisihKira(d))} sentimeter, lebih dari dua, jadi perkiraannya jauh.`;
      return `Hasil ukurnya ${kataBil(d.ukur)} sentimeter, dibaca dari angka di ujung benda pada penggaris. Perkiraannya ${kataBil(d.perkiraan)}, jadi perkiraan itu diperiksa dengan alat ukur.`;
    case "acuan":
      return `Lebar kuku jari kira-kira satu sentimeter. Benda itu selebar ${kataBil(d.kuku)} kuku, jadi panjangnya kira-kira ${kataBil(d.kuku)} sentimeter.`;
    case "pita":
      return `Ujung pita ditempel di ujung benda, jadi angka nol ada di sana. Angka di ujung benda yang lain adalah panjangnya, yaitu ${kataBil(d.panjang)} ${kataSat(d.sat)}.`;
    case "selisih":
      return `${kapital(kataBil(d.a))} dikurangi ${kataBil(d.b)} sama dengan ${kataBil(n)}, jadi selisih panjangnya ${kataBil(n)} ${kataSat(d.sat)}.`;
    case "satuan":
      return `Panjang benda ini ${kataBil(d.panjang)} ${kataSat(d.sat)}. Ukuran sebesar itu cocok dinyatakan dalam ${kataSat(d.sat)}.`;
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  const aw = AWALAN[metode];
  const akhir = cara === "klik" ? "Pilih ukurannya." : cara === "kanvas" ? "Tulis satu angka di kanvas." : "Ucapkan bilangannya.";
  switch (l.tipe) {
    case "baca":
      return `${aw}: lihat penggaris pada ${g} ini. Perhatikan angka di ujung kiri dan angka di ujung kanan benda. Berapa panjang benda itu? ${akhir}`;
    case "alat":
      return `${aw}: lihat panjang benda pada ${g} ini. Alat ukur apa yang paling tepat, penggaris atau meteran? ${cara === "klik" ? "Pilih alatnya." : "Ucapkan satu kata."}`;
    case "kira":
      if (cara === "klik") return `${aw}: benda pada ${g} ini sudah diperkirakan dulu, lalu diukur dengan penggaris. Berapa hasil ukurnya? Pilih ukurannya.`;
      if (cara === "kanvas") return `${aw}: benda pada ${g} ini sudah diperkirakan dulu, lalu diukur dengan penggaris. Berapa selisih perkiraan dan hasil ukur? Tulis satu angka di kanvas.`;
      return `${aw}: benda pada ${g} ini sudah diperkirakan dulu, lalu diukur dengan penggaris. Perkiraan disebut dekat bila selisihnya paling banyak dua sentimeter. Apakah perkiraan itu dekat atau jauh? Ucapkan satu kata.`;
    case "acuan":
      return `${aw}: lebar kuku jari kira-kira satu sentimeter. Benda pada ${g} ini selebar beberapa kuku. Berapa sentimeter panjang benda itu? ${akhir}`;
    case "pita":
      return `${aw}: ujung pita bergaris ditempel di ujung benda pada ${g} ini. Baca angka di ujung benda yang lain. Berapa panjang benda itu? ${akhir}`;
    case "selisih":
      return `${aw}: dua benda diukur dengan pita pada ${g} ini. Berapa selisih panjang kedua benda? ${akhir}`;
    case "satuan":
      return `${aw}: lihat benda pada ${g} ini. Pita bergaris sudah dipakai mengukurnya. Satuan apa yang tepat untuk ukuran sepanjang itu, sentimeter atau meter? Ucapkan satu kata.`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "baca":
    case "pita":
      return "Berapa panjang benda itu?";
    case "alat":
      return "Alat ukur apa yang paling tepat?";
    case "kira":
      return cara === "klik" ? "Berapa hasil ukurnya?" : cara === "kanvas" ? "Berapa selisih perkiraan dan hasil ukur?" : "Dekat atau jauh perkiraannya?";
    case "acuan":
      return "Berapa sentimeter panjang benda itu?";
    case "selisih":
      return "Berapa selisih panjang kedua benda?";
    case "satuan":
      return "Satuan apa yang tepat?";
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya (tanpa digit). `jawab`: kata atau ukuran yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "baca":
      return l.mulai > 0
        ? "Ujung kiri benda tidak di angka nol. Kurangi angka di ujung kanan dengan angka di ujung kiri untuk mendapat panjang benda."
        : "Ujung kiri benda tepat di angka nol, jadi panjang benda sama dengan angka di ujung kanan. Tulis juga satuannya.";
    case "alat":
      return "Penggaris cocok untuk benda pendek dan meteran cocok untuk benda panjang. Lihat satuan panjang benda itu: sentimeter berarti penggaris, meter berarti meteran.";
    case "kira":
      if (cara === "kanvas") return "Selisih didapat dengan mengurangkan bilangan yang lebih besar dengan bilangan yang lebih kecil, yaitu hasil ukur dan perkiraan.";
      if (cara === "suara") return "Perkiraan dekat bila selisih perkiraan dan hasil ukur paling banyak dua sentimeter, dan jauh bila lebih dari itu.";
      return "Perkiraan hanya dugaan. Hasil ukur dibaca dari angka di ujung benda pada penggaris yang diletakkan mulai dari nol.";
    case "acuan":
      return "Satu kuku jari kira-kira satu sentimeter. Hitung banyak kuku yang muat pada benda itu, itulah panjangnya dalam sentimeter.";
    case "pita":
      return "Angka nol ada di ujung pita yang ditempel di ujung benda. Bacalah angka di ujung benda yang lain, dan tulis dengan satuannya.";
    case "selisih":
      return "Selisih didapat dengan mengurangkan panjang yang lebih besar dengan panjang yang lebih kecil.";
    case "satuan":
      return "Sentimeter dipakai untuk benda pendek dan meter untuk benda panjang. Lihat panjang bendanya, lalu pilih satuan yang cocok.";
  }
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
/** Isi kartu kata untuk tahap Abstract (kata dan angka, tanpa emoji). */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  switch (l.tipe) {
    case "baca":
      return [`benda: ${l.benda}`, `ujung kiri di angka: ${l.mulai}`, `ujung kanan di angka: ${l.ujung}`, "panjang benda: ?"];
    case "alat":
      return [`benda: ${l.benda}`, `panjangnya: ${l.panjang} ${l.sat}`, "alat ukur: ?"];
    case "kira":
      return cara === "klik"
        ? [`benda: ${l.benda}`, `perkiraan: ${l.perkiraan} cm`, "ujung kiri di angka: 0", `ujung kanan di angka: ${l.ukur}`, "hasil ukur: ?"]
        : [`benda: ${l.benda}`, `perkiraan: ${l.perkiraan} cm`, `hasil ukur: ${l.ukur} cm`, cara === "kanvas" ? "selisih: ?" : "selisih: ? (dekat atau jauh)"];
    case "acuan":
      return [`benda: ${l.benda}`, "satu kuku jari: 1 cm (acuan)", `lebar benda: ${l.kuku} kuku`, "panjang benda: ? cm"];
    case "pita":
      return [`benda: ${l.benda}`, "ujung pita: 0, di ujung benda", `ujung benda yang lain di angka: ${l.panjang}`, "panjang benda: ?"];
    case "selisih":
      return [`panjang pertama: ${l.a} ${l.sat}`, `panjang kedua: ${l.b} ${l.sat}`, "selisih: ?"];
    case "satuan":
      return [`benda: ${l.benda}`, `ukurannya: ${l.panjang}`, "satuan: ?"];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
