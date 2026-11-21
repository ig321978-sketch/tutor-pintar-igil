/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 1 Sub-Bab G "Baris Perahu Bu Marni" (perkalian sampai seratus), cerita Penginapan Pulau Karang Indah:
 * jenis tugas, jawaban benar, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-perahu-k4b1g.mjs.
 * Jawaban beragam: memilih hasil, penjumlahan berulang, uraian, atau cara menulis dan menyimpan (klik), menulis satu angka di kanvas, dan mengucapkan bilangan pendek atau satu kata (simpan).
 * Jawaban benar dihitung dari data. Empat metode tiap misi: IGIL "Tambah Berulang, Urai Lalu Kali, Kali Susun" (hitung hasil kali dua angka dengan satu angka),
 * Repeated Addition (Tambah Berulang), Split and Multiply (Urai Lalu Kali), dan Column Multiply (Kali Susun).
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
/** Ubah teks berangka menjadi ucapan tanpa digit: "tulis 4, simpan 2" menjadi "tulis empat, simpan dua". */
export function ucapkan(t: string): string {
  return t
    .replace(/×/g, " kali ")
    .replace(/\+/g, " ditambah ")
    .replace(/\d+/g, (d) => ` ${kataBil(Number(d))} `)
    .replace(/\s+/g, " ")
    .replace(/\s+,/g, ",")
    .trim();
}

/** Bagian-bagian perkalian a x b (a dua angka, b satu angka): puluhan, satuan, hasil kali puluhan dan satuan, angka yang ditulis dan disimpan, hasil. */
export const bagian = (a: number, b: number) => {
  const t = Math.floor(a / 10);
  const u = a % 10;
  const p = u * b;
  return { t, u, puluhan: t * 10 * b, satuan: p, simpan: Math.floor(p / 10), tulis: p % 10, hasil: a * b };
};
/** Apakah kali susun a x b memakai simpanan (hasil kali satuan sepuluh atau lebih)? Acuan kurikulum memuat dua jenis: tanpa menyimpan (12 x 4) dan dengan menyimpan (14 x 5). */
export const adaSimpanan = (a: number, b: number): boolean => bagian(a, b).simpan > 0;
/** Penjumlahan berulang: `a` dijumlahkan `b` kali, misalnya "17 + 17 + 17". */
export const teksUlang = (a: number, b: number): string => Array.from({ length: b }, () => String(a)).join(" + ");
export const teksSusun = (a: number, b: number): string => {
  const g = bagian(a, b);
  return `tulis ${g.tulis}, simpan ${g.simpan}`;
};

/* ------------------------------ Jenis tugas ------------------------------ */
/** Tambah Berulang, Urai Lalu Kali, Kali Susun (IGIL): `b` perahu masing-masing `a` penumpang; hitung jumlah (klik, suara) atau angka puluhan hasil (kanvas). */
export type LKali = { tipe: "kali"; benda: string; a: number; b: number };
/** Repeated Addition: perkalian a x b ditulis sebagai penjumlahan berulang; pilih penjumlahan (klik), banyak suku (kanvas), jumlah dua suku pertama (suara). */
export type LTambah = { tipe: "tambah"; benda: string; a: number; b: number };
/** Split and Multiply: a diurai menjadi puluhan dan satuan; pilih uraian hasil (klik), hasil kali satuan (kanvas, satu angka), hasil kali puluhan (suara). */
export type LUrai = { tipe: "urai"; benda: string; a: number; b: number };
/** Column Multiply: kalikan satuan dulu; pilih cara menulis dan menyimpan (klik), angka yang disimpan (kanvas), angka puluhan hasil atau kata simpan (suara). */
export type LSusun = { tipe: "susun"; benda: string; a: number; b: number; kata?: boolean };
export type LangkahDasar = LKali | LTambah | LUrai | LSusun;
/** Cari kesalahan: tokoh sudah menjawab dari `dasar`. Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. `jawabTokoh` adalah salah satu pilihan klik. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LKali | LUrai | LSusun;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "ulang" | "urai" | "susun";
export const URUT_METODE: Metode[] = ["igil", "ulang", "urai", "susun"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Tambah Berulang, Urai Lalu Kali, Kali Susun",
  ulang: "Repeated Addition: Tambah Berulang",
  urai: "Split and Multiply: Urai Lalu Kali",
  susun: "Column Multiply: Kali Susun",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F9EE}", ulang: "\u{2795}", urai: "\u{2702}", susun: "\u{2716}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", ulang: "Repeated Addition", urai: "Split and Multiply", susun: "Column Multiply" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari data. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  const g = bagian(l.a, l.b);
  switch (l.tipe) {
    case "kali":
      return cara === "kanvas" ? angka(Math.floor(g.hasil / 10)) : angka(g.hasil);
    case "tambah":
      return cara === "klik" ? nama(teksUlang(l.a, l.b)) : cara === "kanvas" ? angka(l.b) : angka(2 * l.a);
    case "urai":
      return cara === "klik" ? nama(`${g.puluhan} + ${g.satuan}`) : cara === "kanvas" ? angka(g.satuan) : angka(g.puluhan);
    case "susun":
      return cara === "klik" ? nama(teksSusun(l.a, l.b)) : cara === "kanvas" ? angka(g.simpan > 0 ? g.simpan : g.tulis) : l.kata ? nama("simpan") : angka(Math.floor(g.hasil / 10));
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

/** Pengecoh bilangan: kesalahan khas (hanya puluhan dikali lalu satuan ditambah, jumlah bukan hasil kali), lalu bilangan di dekatnya. */
export function pengecoh(l: Langkah, cara: Cara, awal?: number): number[] {
  const d = dasarDari(l);
  const k = kunciJawab(d, cara);
  const n = k?.jenis === "angka" ? k.n : 0;
  const g = bagian(d.a, d.b);
  let khas: number[] = [];
  if (d.tipe === "kali") khas = cara === "kanvas" ? [Math.floor(g.hasil / 10) + 1, g.simpan] : [g.t * 10 * d.b + g.u, d.a + d.b, g.hasil + 10];
  else if (d.tipe === "tambah") khas = cara === "kanvas" ? [d.b + 1, d.b - 1] : [d.a + d.b, 3 * d.a];
  else if (d.tipe === "urai") khas = cara === "kanvas" ? [g.u, g.satuan + 1] : [g.t * d.b, g.puluhan + 10];
  else khas = cara === "kanvas" ? (g.simpan > 0 ? [g.tulis, g.simpan + 1] : [g.t, g.tulis + 1]) : [g.t * d.b, Math.floor(g.hasil / 10) - 1];
  const calon = [awal ?? -1, ...khas, n + 1, n - 1, n + 2, n - 2, n + 10];
  const hasil: number[] = [];
  for (const c of calon) if (Number.isInteger(c) && c >= 0 && c <= 999 && c !== n && !hasil.includes(c)) hasil.push(c);
  return hasil;
}
/** Bilangan dalam jawaban klik tokoh: "35" menjadi 35. */
const angkaDariTeks = (t: string): number => Number(/\d+/.exec(t)?.[0] ?? -1);

/** Tiga pilihan untuk tugas klik: jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k) return [];
  const d = dasarDari(l);
  const tokoh = l.tipe === "salah" && l.jawabTokoh !== (k.jenis === "nama" ? k.nama : String(k.n)) ? [l.jawabTokoh] : [];
  if (k.jenis === "angka") {
    const awal = l.tipe === "salah" ? angkaDariTeks(l.jawabTokoh) : undefined;
    const [a, b] = pengecoh(l, "klik", awal);
    return sisipkan(String(k.n), [String(a), String(b)], k.n);
  }
  const g = bagian(d.a, d.b);
  let lain: string[] = [];
  if (d.tipe === "tambah") lain = [teksUlang(d.a, d.b + 1), d.b > 2 ? teksUlang(d.a, d.b - 1) : teksUlang(d.a, d.b + 2), teksUlang(d.a, d.b + 2)];
  else if (d.tipe === "urai") lain = [`${g.puluhan} + ${g.u}`, `${g.t * d.b} + ${g.satuan}`, `${g.puluhan} + ${g.satuan * 10}`];
  else lain = [`tulis ${g.simpan}, simpan ${g.tulis}`, `tulis ${g.satuan}, simpan 0`, `tulis ${g.tulis}, simpan ${g.simpan + 1}`];
  const bersih = unik([...tokoh, ...lain]).filter((x) => x !== k.nama);
  return sisipkan(k.nama, bersih.slice(0, 2), d.a + d.b);
}
/** Pilihan cadangan untuk tugas suara (kata atau bilangan dalam kata). */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k) return [];
  if (k.jenis === "angka") {
    const lain: number[] = [];
    for (const x of [...pengecoh(l, cara), k.n + 10, k.n - 10, k.n + 1, k.n - 1]) if (x >= 1 && x <= 99 && x !== k.n && !lain.includes(x)) lain.push(x);
    return sisipkan(kataBil(k.n), lain.slice(0, 2).map(kataBil), k.n);
  }
  return sisipkan(k.nama, ["tulis", "simpan", "kali"].filter((x) => x !== k.nama), k.nama.length);
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));
/** Teks pilihan klik yang benar (bilangan atau nama). */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  if (!k) return null;
  return k.jenis === "nama" ? k.nama : String(k.n);
}

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : rupa === "benda" ? "dermaga" : "kertas kotak");

/** Awal tiap kalimat berhuruf kapital (kata bilangan dieja huruf kecil di tengah teks). */
const kapKal = (t: string): string => t.replace(/(^|[.?!]\s+)([a-z])/g, (_m, a: string, b: string) => a + b.toUpperCase());

export function kalimatKunci(l: Langkah, cara: Cara): string {
  return kapKal(kalimatKunciMentah(l, cara));
}

function kalimatKunciMentah(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  const g = bagian(d.a, d.b);
  switch (d.tipe) {
    case "kali":
      return cara === "kanvas" ? `${kataBil(d.a)} kali ${kataBil(d.b)} sama dengan ${kataBil(g.hasil)}, jadi angka puluhannya ${kataBil(Math.floor(g.hasil / 10))}.` : `${kataBil(d.a)} kali ${kataBil(d.b)} sama dengan ${kataBil(g.hasil)}.`;
    case "tambah":
      return cara === "klik" ? `${kataBil(d.a)} dijumlahkan ${kataBil(d.b)} kali, sesuai banyak perahu.` : cara === "kanvas" ? `${kataBil(d.a)} dijumlahkan sebanyak perahu, yaitu ${kataBil(d.b)} kali.` : `Dua suku pertama: ${kataBil(d.a)} ditambah ${kataBil(d.a)} sama dengan ${kataBil(2 * d.a)}.`;
    case "urai":
      return cara === "klik"
        ? `${kataBil(d.a)} diurai menjadi ${kataBil(g.t * 10)} dan ${kataBil(g.u)}. ${kataBil(g.t * 10)} kali ${kataBil(d.b)} sama dengan ${kataBil(g.puluhan)}, dan ${kataBil(g.u)} kali ${kataBil(d.b)} sama dengan ${kataBil(g.satuan)}.`
        : cara === "kanvas"
          ? `${kataBil(g.u)} kali ${kataBil(d.b)} sama dengan ${kataBil(g.satuan)}.`
          : `${kataBil(g.t * 10)} kali ${kataBil(d.b)} sama dengan ${kataBil(g.puluhan)}.`;
    case "susun":
      if (g.simpan === 0)
        return cara === "klik"
          ? `${kataBil(g.u)} kali ${kataBil(d.b)} sama dengan ${kataBil(g.satuan)}, hanya satu angka, jadi tulis ${kataBil(g.tulis)} dan simpan nol.`
          : cara === "kanvas"
            ? `Hasil kali satuan ${kataBil(g.satuan)}, hanya satu angka, jadi seluruhnya ditulis di bawah satuan.`
            : `Tidak ada simpanan, jadi puluhan ${kataBil(g.t)} kali ${kataBil(d.b)} sama dengan ${kataBil(Math.floor(g.hasil / 10))}.`;
      return cara === "klik"
        ? `${kataBil(g.u)} kali ${kataBil(d.b)} sama dengan ${kataBil(g.satuan)}, jadi tulis ${kataBil(g.tulis)} dan simpan ${kataBil(g.simpan)}.`
        : cara === "kanvas"
          ? `Hasil kali satuan ${kataBil(g.satuan)}, puluhannya ${kataBil(g.simpan)} disimpan.`
          : d.kata
            ? "Angka puluhan dari hasil kali satuan tidak ditulis, tetapi disimpan."
            : `Puluhan ${kataBil(g.t)} kali ${kataBil(d.b)} ditambah simpanan ${kataBil(g.simpan)} sama dengan ${kataBil(Math.floor(g.hasil / 10))}.`;
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  return kapKal(instruksiMentah(l, rupa, cara, metode));
}

function instruksiMentah(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  const aw = AWALAN[metode];
  const akhir = cara === "klik" ? "Pilih jawabannya." : cara === "kanvas" ? "Tulis satu angka di kanvas." : "Ucapkan jawabannya.";
  switch (l.tipe) {
    case "kali":
      return cara === "kanvas"
        ? `${aw}: lihat ${g} ini. Ada ${kataBil(l.b)} perahu, tiap perahu ${kataBil(l.a)} penumpang. Berapa angka puluhan jumlah penumpang? ${akhir}`
        : `${aw}: lihat ${g} ini. Ada ${kataBil(l.b)} perahu, tiap perahu ${kataBil(l.a)} penumpang. Berapa jumlah penumpang seluruhnya? ${akhir}`;
    case "tambah":
      return cara === "klik"
        ? `${aw}: ${kataBil(l.a)} kali ${kataBil(l.b)} ditulis sebagai penjumlahan berulang. Mana penjumlahannya? ${akhir}`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. Satu bilangan dijumlahkan berulang sebanyak perahu. Berapa kali bilangan itu dijumlahkan? ${akhir}`
          : `${aw}: ${kataBil(l.a)} kali ${kataBil(l.b)} ditulis sebagai penjumlahan berulang. Berapa jumlah dua suku pertama? ${akhir}`;
    case "urai":
      return cara === "klik"
        ? `${aw}: ${kataBil(l.a)} kali ${kataBil(l.b)}. Bilangan pertama diurai menjadi puluhan dan satuan. Mana hasil kali kedua bagiannya? ${akhir}`
        : cara === "kanvas"
          ? `${aw}: ${kataBil(l.a)} diurai menjadi puluhan dan satuan. Berapa hasil kali satuannya dengan ${kataBil(l.b)}? ${akhir}`
          : `${aw}: ${kataBil(l.a)} diurai menjadi puluhan dan satuan. Berapa hasil kali puluhannya dengan ${kataBil(l.b)}? ${akhir}`;
    case "susun":
      return cara === "klik"
        ? `${aw}: ${kataBil(l.a)} kali ${kataBil(l.b)} ditulis ke bawah. Satuan dikalikan dulu. Mana cara menulis dan menyimpannya? ${akhir}`
        : cara === "kanvas"
          ? adaSimpanan(l.a, l.b)
            ? `${aw}: ${kataBil(l.a)} kali ${kataBil(l.b)} ditulis ke bawah. Satuan dikalikan dulu. Berapa angka yang disimpan? ${akhir}`
            : `${aw}: ${kataBil(l.a)} kali ${kataBil(l.b)} ditulis ke bawah. Satuan dikalikan dulu. Berapa angka yang ditulis di bawah satuan? ${akhir}`
          : l.kata
            ? `${aw}: ${kataBil(l.a)} kali ${kataBil(l.b)} ditulis ke bawah. Hasil kali satuan lebih dari sembilan. Angka puluhannya ditulis atau disimpan? Ucapkan satu kata.`
            : `${aw}: ${kataBil(l.a)} kali ${kataBil(l.b)} ditulis ke bawah. Berapa angka puluhan hasil akhirnya? ${akhir}`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "kali":
      return cara === "kanvas" ? "Berapa angka puluhan hasilnya?" : "Berapa jumlah penumpang seluruhnya?";
    case "tambah":
      return cara === "klik" ? "Mana penjumlahan berulangnya?" : cara === "kanvas" ? "Berapa kali dijumlahkan?" : "Berapa jumlah dua suku pertama?";
    case "urai":
      return cara === "klik" ? "Mana hasil kali kedua bagiannya?" : cara === "kanvas" ? "Berapa hasil kali satuan?" : "Berapa hasil kali puluhan?";
    case "susun":
      return cara === "klik" ? "Mana cara menulis dan menyimpannya?" : cara === "kanvas" ? (adaSimpanan(d.a, d.b) ? "Berapa angka yang disimpan?" : "Berapa angka yang ditulis di satuan?") : d.kata ? "Ditulis atau disimpan?" : "Berapa angka puluhan hasil akhir?";
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya (tanpa digit). `jawab`: kata atau bilangan yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "kali":
      return cara === "kanvas"
        ? "Hitung dulu jumlah seluruhnya, lalu lihat angka puluhannya, yaitu angka di sebelah kiri."
        : "Kalikan semua bagian bilangan pertama, bukan hanya puluhannya. Uraikan atau susun supaya tidak ada bagian yang terlewat.";
    case "tambah":
      return cara === "klik"
        ? "Penjumlahan berulang menulis bilangan yang sama sebanyak pengali. Hitung dulu ada berapa bilangan yang dijumlahkan."
        : cara === "kanvas"
          ? "Banyak bilangan yang dijumlahkan sama dengan banyak perahu."
          : "Jumlahkan hanya dua bilangan pertama, bukan semuanya.";
    case "urai":
      return cara === "klik"
        ? "Kedua bagian harus dikalikan dengan pengali. Puluhan dikalikan sebagai puluhan, dan satuan juga dikalikan, bukan hanya ditambahkan."
        : cara === "kanvas"
          ? "Kalikan angka satuan dengan pengali. Jangan memakai angka puluhannya."
          : "Kalikan puluhan dengan pengali, lalu beri nol di belakang karena yang dikalikan adalah puluhan.";
    case "susun":
      if (!adaSimpanan(l.a, l.b))
        return cara === "klik"
          ? "Hasil kali satuan hanya satu angka, jadi seluruhnya ditulis di bawah satuan dan tidak ada yang disimpan."
          : cara === "kanvas"
            ? "Kalikan satuan dulu. Hasilnya hanya satu angka, dan angka itulah yang ditulis di bawah satuan."
            : "Kalikan puluhan dengan pengali. Tidak ada simpanan, jadi hasil kali itu langsung menjadi angka puluhan hasil akhir.";
      return cara === "klik"
        ? "Hasil kali satuan terdiri dari dua angka. Angka satuan ditulis di bawah, angka puluhannya disimpan di atas kolom puluhan."
        : cara === "kanvas"
          ? "Kalikan satuan dulu. Angka puluhan dari hasil itulah yang disimpan."
          : l.kata
            ? "Hasil kali satuan lebih dari sembilan, jadi ada angka puluhan yang tidak ditulis di bawah satuan."
            : "Kalikan puluhan dengan pengali, tambahkan simpanan, lalu lihat angka puluhan hasil akhirnya.";
  }
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
/** Isi kartu kata untuk tahap Abstract (kata dan angka, tanpa emoji). */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  const g = bagian(l.a, l.b);
  switch (l.tipe) {
    case "kali":
      return [`banyak perahu: ${l.b}`, `penumpang tiap perahu: ${l.a}`, cara === "kanvas" ? "angka puluhan jumlah penumpang: ?" : "jumlah penumpang: ?"];
    case "tambah":
      return [`perkalian: ${l.a} × ${l.b}`, cara === "klik" ? "penjumlahan berulang: ?" : cara === "kanvas" ? "banyak bilangan yang dijumlahkan: ?" : "jumlah dua suku pertama: ?"];
    case "urai":
      return [`perkalian: ${l.a} × ${l.b}`, `uraian: ${l.a} = ${g.t * 10} + ${g.u}`, cara === "klik" ? "hasil: ? + ?" : cara === "kanvas" ? "hasil kali satuan: ?" : "hasil kali puluhan: ?"];
    case "susun":
      return [`perkalian: ${l.a} × ${l.b}`, `satuan: ${g.u} × ${l.b}`, cara === "klik" ? "tulis ?, simpan ?" : cara === "kanvas" ? (adaSimpanan(l.a, l.b) ? "angka yang disimpan: ?" : "angka yang ditulis di satuan: ?") : l.kata ? "angka puluhan: ditulis atau disimpan?" : "angka puluhan hasil akhir: ?"];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
