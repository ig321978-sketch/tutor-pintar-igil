/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 3 Sub-Bab D "Bandul Dokter Hana" (hubungan kilogram, ons, dan gram), akhir cerita Kebun Binatang Mini:
 * jenis tugas, kunci, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-bandul-k3b3d.mjs.
 * Jawaban beragam: memilih ukuran bersatuan (klik), menulis SATU angka di kanvas (angka tempat atau banyak kilogram), dan mengucapkan satu kata (kali, bagi, tambah, kurang, kilogram, gram) atau bilangan pendek.
 * Kunci dihitung dari data (berat dalam gram), bukan kunci tetap. Berat paling banyak sembilan ribu sembilan ratus sembilan puluh sembilan gram.
 * Empat metode tiap misi: IGIL (Kali Seribu ke Gram, Ambil Seribu ke Kilogram), Place Value Chart, Double Number Line, dan Chunking.
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

/* ------------------------------ Kata bilangan ------------------------------ */
const SAT = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"] as const;
/** Nama bilangan 0 sampai 99.999 dalam kata (tanpa digit): seratus, seribu dua ratus, tiga ribu. */
export function kataBil(n: number): string {
  if (n < 0 || n > 99999 || !Number.isInteger(n)) return String(n);
  if (n < 10) return SAT[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SAT[n - 10]} belas`;
  if (n < 100) {
    const p = Math.floor(n / 10);
    const s = n % 10;
    return s === 0 ? `${SAT[p]} puluh` : `${SAT[p]} puluh ${SAT[s]}`;
  }
  if (n < 1000) {
    const r = Math.floor(n / 100);
    const sisa = n % 100;
    const ratus = r === 1 ? "seratus" : `${SAT[r]} ratus`;
    return sisa === 0 ? ratus : `${ratus} ${kataBil(sisa)}`;
  }
  const ribu = Math.floor(n / 1000);
  const sisa = n % 1000;
  const depan = ribu === 1 ? "seribu" : `${kataBil(ribu)} ribu`;
  return sisa === 0 ? depan : `${depan} ${kataBil(sisa)}`;
}
export const kata = kataBil;

/* ------------------------------ Tampilan ukuran ------------------------------ */
/** Bilangan dengan titik ribuan: 1.200. */
export const ribuan = (n: number): string => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
export const fmtG = (g: number): string => `${ribuan(g)} g`;
/** Kilogram dan gram bersama: 1 kg 250 g, atau 3 kg bila gramnya nol. */
export const fmtKg = (kg: number, g: number): string => (g === 0 ? `${kg} kg` : kg === 0 ? `${g} g` : `${kg} kg ${g} g`);
export const fmtBerat = (t: number): string => fmtKg(Math.floor(t / 1000), t % 1000);
/** Ucapan berat tanpa digit: tiga kilogram dua ratus gram. */
export const sebutKg = (kg: number, g: number): string => (g === 0 ? `${kataBil(kg)} kilogram` : kg === 0 ? `${kataBil(g)} gram` : `${kataBil(kg)} kilogram ${kataBil(g)} gram`);
export const sebutBerat = (t: number): string => sebutKg(Math.floor(t / 1000), t % 1000);
export const sebutG = (g: number): string => `${kataBil(g)} gram`;
const digit = (n: number, d: "ribu" | "ratus" | "puluh" | "satuan"): number => (d === "ribu" ? Math.floor(n / 1000) % 10 : d === "ratus" ? Math.floor(n / 100) % 10 : d === "puluh" ? Math.floor(n / 10) % 10 : n % 10);
const tempat = (d: string): string => (d === "ribu" ? "ribuan" : d === "ratus" ? "ratusan" : d === "puluh" ? "puluhan" : "satuan");

/* ------------------------------ Benda dan bandul ------------------------------ */
export type Benda = "wortel" | "apel" | "jagung" | "telur" | "kaleng" | "karung";
export const EMOJI_BENDA: Record<Benda, string> = { wortel: "\u{1F955}", apel: "\u{1F34E}", jagung: "\u{1F33D}", telur: "\u{1F95A}", kaleng: "\u{1F96B}", karung: "\u{1F6CD}\u{FE0F}" };

/** Banyak bandul tiap jenis: setengah ons, satu ons, dua ons, setengah kilogram, satu kilogram. */
export type SetBandul = [number, number, number, number, number];
export const BERAT_BANDUL = [50, 100, 200, 500, 1000] as const;
export const LABEL_BANDUL = ["1/2 ons", "1 ons", "2 ons", "1/2 kg", "1 kg"] as const;
export const NAMA_BANDUL = ["setengah ons", "satu ons", "dua ons", "setengah kilogram", "satu kilogram"] as const;
export const beratSet = (s: readonly number[]): number => s.reduce((t, n, i) => t + n * (BERAT_BANDUL[i] ?? 0), 0);
export const banyakBandul = (s: readonly number[]): number => s.reduce((t, n) => t + n, 0);
/** Susunan bandul paling sedikit untuk berat `t` (kelipatan lima puluh gram). */
export function setDari(t: number): SetBandul {
  const s: SetBandul = [0, 0, 0, 0, 0];
  let sisa = t;
  for (let i = 4; i >= 0; i -= 1) {
    s[i] = Math.floor(sisa / BERAT_BANDUL[i]);
    sisa -= s[i] * BERAT_BANDUL[i];
  }
  return s;
}

/* ------------------------------ Jenis tugas ------------------------------ */
/** Bagian bilangan yang ditulis di kanvas (harus satu angka): angka tempat ribuan, ratusan, puluhan, atau banyak kilogram penuh. */
export type DigitUbah = "ribu" | "ratus" | "puluh" | "kg";

/** Metode IGIL: mengubah kilogram ke gram (kali seribu) atau gram ke kilogram (ambil tiap seribu). T = kg x 1.000 + g. klik: ukurannya; kanvas: satu angka; suara: kata operasi atau banyak kilogram. */
export type LUbah = { tipe: "ubah"; arah: "kg-g" | "g-kg"; kg: number; g: number; benda: Benda; kanvas: DigitUbah; suara: "operasi" | "hasil" };
/** Metode IGIL: menjumlahkan atau mengurangkan dua berat dengan mengubah ke gram dulu. a dan b dalam gram. */
export type LGabung = { tipe: "gabung"; op: "tambah" | "kurang"; a: number; b: number; benda: Benda; kanvas: "kg" | "ratus" | "puluh"; suara: "operasi" | "hasil" };
/** Metode IGIL: menghitung berat sekumpulan bandul timbangan kodok. suara: berat satu ons (gram) atau banyak ons dalam satu kilogram. */
export type LBandul = { tipe: "bandul"; set: SetBandul; benda: Benda; kanvas: "ribu" | "ratus" | "puluh"; suara: "satuOns" | "kgOns" };
/** Metode IGIL: kilogram dan ons (satu kilogram sama dengan sepuluh ons) atau ons dan gram (satu ons sama dengan seratus gram). */
export type LOns = { tipe: "ons"; arah: "kg-ons" | "ons-g"; n: number; benda: Benda; kanvas: "puluh" | "ratus"; suara: "hasil" };
/** Place Value Chart (Tabel Tempat Angka): kolom kilogram (ribuan gram), ratusan, puluhan, dan satuan gram. kanvas: kolom yang disembunyikan; suara: banyak kilogram atau nama satuan kolom. */
export type LTabel = { tipe: "tabel"; kg: number; g: number; benda: Benda; kanvas: "ratus" | "puluh" | "satuan"; suara: "kg" | "nKg" | "nGram" };
/** Double Number Line (Garis Bilangan Ganda): garis atas kilogram dan garis bawah gram. setengah = ditambah lima ratus gram. */
export type LGaris = { tipe: "garis"; arah: "kg-g" | "g-kg"; kg: number; setengah: boolean; benda: Benda; kanvas: "lompat" | "ratus"; suara: "atas" | "bawah" | "hasil" };
/** Chunking (Pecah Seribu-Seribu): gram dipecah menjadi potongan seribu gram (kilogram) dan sisa. */
export type LPecah = { tipe: "pecah"; total: number; benda: Benda; kanvas: "potong" | "ratus" | "puluh"; suara: "hasil" | "nama" };
export type LangkahDasar = LUbah | LGabung | LBandul | LOns | LTabel | LGaris | LPecah;
/** Cari kesalahan: tokoh sudah menjawab pada tugas `dasar` (ubah). Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LUbah;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "tabel" | "garis" | "pecah";
export const URUT_METODE: Metode[] = ["igil", "tabel", "garis", "pecah"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Kali Seribu ke Gram, Ambil Seribu ke Kilogram",
  tabel: "Place Value Chart: Tabel Tempat Angka",
  garis: "Double Number Line: Garis Bilangan Ganda",
  pecah: "Chunking: Pecah Seribu-Seribu",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F4DD}", tabel: "\u{1F522}", garis: "\u{1F4CF}", pecah: "\u{1F9E9}" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/* ------------------------------ Nilai turunan ------------------------------ */
export const totalUbah = (l: LUbah): number => l.kg * 1000 + l.g;
export const totalTabel = (l: LTabel): number => l.kg * 1000 + l.g;
export const totalGaris = (l: LGaris): number => l.kg * 1000 + (l.setengah ? 500 : 0);
export const hasilGabung = (l: LGabung): number => (l.op === "tambah" ? l.a + l.b : l.a - l.b);
export const totalBandul = (l: LBandul): number => beratSet(l.set);
export const potongan = (total: number): { k: number; r: number } => ({ k: Math.floor(total / 1000), r: total % 1000 });
export const kolomTabel = (l: LTabel): [number, number, number, number] => [l.kg, digit(l.g, "ratus"), digit(l.g, "puluh"), digit(l.g, "satuan")];

/** Angka kanvas tiap tugas. */
function angkaKanvas(l: LangkahDasar): number {
  switch (l.tipe) {
    case "ubah":
      return l.kanvas === "kg" ? Math.floor(totalUbah(l) / 1000) : digit(totalUbah(l), l.kanvas);
    case "gabung": {
      const r = hasilGabung(l);
      return l.kanvas === "kg" ? Math.floor(r / 1000) : digit(r, l.kanvas);
    }
    case "bandul":
      return digit(totalBandul(l), l.kanvas);
    case "ons":
      return l.n;
    case "tabel":
      return digit(l.g, l.kanvas === "ratus" ? "ratus" : l.kanvas === "puluh" ? "puluh" : "satuan");
    case "garis":
      return l.kanvas === "lompat" ? Math.floor(totalGaris(l) / 1000) : digit(totalGaris(l), "ratus");
    case "pecah": {
      const { k, r } = potongan(l.total);
      return l.kanvas === "potong" ? k : digit(r, l.kanvas);
    }
  }
}

/** Apakah data satu tugas konsisten dan sesuai batas (berat paling banyak 9.999 g; jawaban kanvas satu angka dari satu sampai sembilan)? */
export function dataSah(l: LangkahDasar): boolean {
  const antara = (n: number, a: number, b: number) => Number.isInteger(n) && n >= a && n <= b;
  if (!antara(angkaKanvas(l), 1, 9)) return false;
  switch (l.tipe) {
    case "ubah":
      return antara(l.kg, 1, 9) && antara(l.g, 0, 990) && l.g % 10 === 0 && (l.suara === "operasi" || l.arah === "g-kg") && (l.arah === "g-kg" ? l.kanvas === "kg" : l.kanvas !== "kg");
    case "gabung":
      return antara(l.a, 100, 9000) && antara(l.b, 100, 9000) && l.a % 50 === 0 && l.b % 50 === 0 && (l.op === "tambah" ? hasilGabung(l) <= 9999 : l.a > l.b && hasilGabung(l) >= 100) && (l.suara === "operasi" || antara(Math.floor(hasilGabung(l) / 1000), 1, 9));
    case "bandul":
      return l.set.length === 5 && l.set.every((n) => antara(n, 0, 5)) && l.set.filter((n) => n > 0).length >= 2 && banyakBandul(l.set) >= 3 && totalBandul(l) <= 9999;
    case "ons":
      return antara(l.n, 1, 9);
    case "tabel":
      return antara(l.kg, 1, 9) && antara(l.g, 0, 999) && l.g % 10 === 0 && (l.suara !== "kg" || antara(l.kg, 1, 9));
    case "garis":
      return antara(l.kg, 1, 8) && (l.kanvas === "lompat" || l.setengah) && (l.suara !== "hasil" || antara(Math.floor(totalGaris(l) / 1000), 1, 9));
    case "pecah":
      return antara(l.total, 1000, 9999) && l.total % 10 === 0 && (l.suara !== "hasil" || antara(potongan(l.total).k, 1, 9));
  }
}

/* ------------------------------ Kunci ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string } | { jenis: "ukuran"; teks: string; kata: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });
type Ukuran = Extract<Kunci, { jenis: "ukuran" }>;
const ukG = (g: number): Ukuran => ({ jenis: "ukuran", teks: fmtG(g), kata: sebutG(g) });
const ukKg = (kg: number, g: number): Ukuran => ({ jenis: "ukuran", teks: fmtKg(kg, g), kata: sebutKg(kg, g) });
const ukBerat = (t: number): Ukuran => (t < 1000 ? ukG(t) : ukKg(Math.floor(t / 1000), t % 1000));
export const KATA_OPERASI = ["kali", "bagi", "tambah", "kurang"] as const;
export const KATA_SATUAN = ["gram", "kilogram", "ons"] as const;

/** Kunci tiap tugas menurut caranya, dihitung dari data. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  if (cara === "kanvas") return angka(angkaKanvas(l));
  switch (l.tipe) {
    case "ubah":
      if (cara === "klik") return l.arah === "kg-g" ? ukG(totalUbah(l)) : ukKg(l.kg, l.g);
      return l.suara === "operasi" ? nama(l.arah === "kg-g" ? "kali" : "bagi") : angka(l.kg);
    case "gabung":
      if (cara === "klik") return ukBerat(hasilGabung(l));
      return l.suara === "operasi" ? nama(l.op) : angka(Math.floor(hasilGabung(l) / 1000));
    case "bandul":
      if (cara === "klik") return ukG(totalBandul(l));
      return angka(l.suara === "satuOns" ? 100 : 10);
    case "ons":
      if (cara === "klik") return l.arah === "kg-ons" ? { jenis: "ukuran", teks: `${l.n * 10} ons`, kata: `${kataBil(l.n * 10)} ons` } : ukG(l.n * 100);
      return angka(l.arah === "kg-ons" ? l.n * 10 : l.n * 100);
    case "tabel":
      if (cara === "klik") return ukG(totalTabel(l));
      return l.suara === "kg" ? angka(l.kg) : nama(l.suara === "nKg" ? "kilogram" : "gram");
    case "garis":
      if (cara === "klik") return l.arah === "kg-g" ? ukG(totalGaris(l)) : ukKg(l.kg, l.setengah ? 500 : 0);
      return l.suara === "atas" ? nama("kilogram") : l.suara === "bawah" ? nama("gram") : angka(l.kg);
    case "pecah": {
      const { k, r } = potongan(l.total);
      if (cara === "klik") return ukKg(k, r);
      return l.suara === "hasil" ? angka(k) : nama("kilogram");
    }
  }
}

/** Semua tugas punya kunci, kecuali Cari kesalahan yang memakai kegiatan lebih dulu. Tidak bergantung pada rupa. */
export function siapLangsung(l: Langkah, rupa: Rupa, cara: Cara): boolean {
  void rupa;
  if (l.tipe === "salah") return false;
  return kunciJawab(l, cara) !== null;
}

/* ------------------------------ Pilihan ------------------------------ */
/** Ukuran bersatuan pengecoh menurut kesalahan khas tiap tugas, urut dari yang paling khas. */
function calonKlik(l: LangkahDasar, kunci: string): string[] {
  const g = (n: number): string => fmtG(n);
  const kgs = (kg: number, s: number): string => fmtKg(kg, s);
  let calon: string[] = [];
  switch (l.tipe) {
    case "ubah": {
      const t = totalUbah(l);
      calon = l.arah === "kg-g" ? [g(l.kg * 100 + l.g), g(l.kg * 10000 + l.g), g(t + 100), g(t - 100), g(t + 1000), g(t - 1000)] : [kgs(Math.floor(t / 100), t % 100), kgs(l.kg + 1, l.g), kgs(l.kg, (l.g + 100) % 1000), kgs(l.kg - 1, l.g), kgs(l.kg + 2, l.g)];
      break;
    }
    case "gabung": {
      const r = hasilGabung(l);
      const kurang = l.op === "kurang";
      calon = [kurang ? ukBerat(l.a + l.b).teks : ukBerat(Math.abs(l.a - l.b)).teks, ukBerat(r + 100).teks, ukBerat(r - 100).teks, ukBerat(r + 1000).teks, ukBerat(r - 1000).teks, ukBerat(r + 500).teks];
      break;
    }
    case "bandul": {
      const t = totalBandul(l);
      calon = [g(banyakBandul(l.set) * 100), g(t + 100), g(t - 100), g(t + 500), g(t - 500), g(t + 50)];
      break;
    }
    case "ons": {
      calon = l.arah === "kg-ons" ? [`${l.n * 100} ons`, `${l.n} ons`, `${l.n * 10 + 10} ons`, `${l.n * 10 - 10} ons`, `${l.n * 5} ons`] : [g(l.n * 10), g(l.n * 1000), g(l.n * 100 + 100), g(l.n * 100 - 100), g(l.n * 50)];
      break;
    }
    case "tabel": {
      const t = totalTabel(l);
      calon = [g(l.kg * 100 + l.g), g(t + 100), g(t - 100), g(t + 1000), g(t - 1000), g(l.kg * 10000 + l.g)];
      break;
    }
    case "garis": {
      const t = totalGaris(l);
      const s = l.setengah ? 500 : 0;
      calon = l.arah === "kg-g" ? [g(t + 1000), g(t - 1000), g(t / 10), g(t + 500), g(t - 500), g(t * 10)] : [kgs(l.kg + 1, s), kgs(l.kg, s === 0 ? 500 : 0), kgs(l.kg - 1, s), kgs(Math.floor(t / 100), t % 100), kgs(l.kg + 2, s)];
      break;
    }
    case "pecah": {
      const { k, r } = potongan(l.total);
      calon = [kgs(k, (r + 100) % 1000), kgs(k + 1, r), kgs(k - 1, r), kgs(Math.floor(l.total / 100), l.total % 100), kgs(k, (r + 900) % 1000), kgs(k + 2, r)];
      break;
    }
  }
  const hasil: string[] = [];
  for (const c of calon) if (c !== kunci && !hasil.includes(c) && !/^0 |\bNaN\b|-|^ /.test(c) && !/^0$/.test(c)) hasil.push(c);
  return hasil;
}
/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisipkan(benar: string, lain: string[], geser: number): string[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}
/** Tiga pilihan untuk tugas klik (ukuran bersatuan): kunci tidak pernah di tombol pertama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k || k.jenis !== "ukuran") return [];
  const d = dasarDari(l);
  const calon = calonKlik(d, k.teks);
  const awal = l.tipe === "salah" && l.jawabTokoh !== k.teks ? [l.jawabTokoh] : [];
  const lain = [...awal, ...calon.filter((c) => !awal.includes(c))].slice(0, 2);
  return sisipkan(k.teks, lain, k.teks.length);
}

/** Bilangan pengecoh untuk jawaban bilangan (kanvas atau suara): satu sampai sembilan berdekatan, atau kelipatan sepuluh dan seratus. */
function angkaLain(n: number): number[] {
  const calon = n <= 9 ? [n + 1, n - 1, n + 2, n - 2, n + 3] : n % 100 === 0 ? [n + 100, n - 100, n / 10, n + 200] : n % 10 === 0 ? [n + 10, n - 10, n * 10, n + 20] : [n + 10, n - 10, n + 1];
  const hasil: number[] = [];
  for (const c of calon) if (Number.isInteger(c) && c >= 1 && c <= 999 && c !== n && !hasil.includes(c)) hasil.push(c);
  return hasil.slice(0, 2);
}
/** Pilihan cadangan untuk tugas suara (kata atau bilangan dalam kata) dan tugas kanvas berjawaban satu angka. */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k || k.jenis === "ukuran") return [];
  if (k.jenis === "angka") return sisipkan(kataBil(k.n), angkaLain(k.n).map(kataBil), k.n);
  const semua: string[] = (KATA_OPERASI as readonly string[]).includes(k.nama) ? [...KATA_OPERASI] : [...KATA_SATUAN];
  const lain = semua.filter((x) => x !== k.nama).slice(0, 2);
  return sisipkan(k.nama, lain.length === 2 ? lain : semua.filter((x) => x !== k.nama), k.nama.length);
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : k.jenis === "ukuran" ? k.teks : kataBil(k.n));

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : "gambar");
const sebutBandulSet = (s: SetBandul): string =>
  s
    .map((n, i) => (n > 0 ? `${kataBil(n)} bandul ${NAMA_BANDUL[i]}` : ""))
    .filter(Boolean)
    .join(", ");

const rumus = (l: LangkahDasar): string => {
  switch (l.tipe) {
    case "ubah":
      return l.arah === "kg-g"
        ? `Kilogram diubah ke gram dengan dikalikan seribu: ${kataBil(l.kg)} kali seribu sama dengan ${kataBil(l.kg * 1000)}${l.g > 0 ? `, ditambah ${kataBil(l.g)} menjadi ${kataBil(totalUbah(l))}` : ""} gram.`
        : `Gram diubah ke kilogram dengan mengambil tiap seribu gram sebagai satu kilogram: ${sebutG(totalUbah(l))} sama dengan ${sebutKg(l.kg, l.g)}.`;
    case "gabung":
      return `Ubah dulu ke gram: ${sebutG(l.a)} ${l.op === "tambah" ? "ditambah" : "dikurangi"} ${sebutG(l.b)} sama dengan ${sebutG(hasilGabung(l))}, yaitu ${sebutBerat(hasilGabung(l))}.`;
    case "bandul":
      return `Jumlahkan berat semua bandul: ${sebutBandulSet(l.set)}. Beratnya ${sebutG(totalBandul(l))}, yaitu ${sebutBerat(totalBandul(l))}.`;
    case "ons":
      return l.arah === "kg-ons" ? `Satu kilogram sama dengan sepuluh ons, jadi ${kataBil(l.n)} kilogram sama dengan ${kataBil(l.n * 10)} ons.` : `Satu ons sama dengan seratus gram, jadi ${kataBil(l.n)} ons sama dengan ${kataBil(l.n * 100)} gram.`;
    case "tabel":
      return `Angka di kolom kilogram mewakili ribuan gram. Dibaca dari kiri, tabel itu menunjukkan ${sebutG(totalTabel(l))}, yaitu ${sebutKg(l.kg, l.g)}.`;
    case "garis":
      return `Satu kilogram di garis atas sejajar dengan seribu gram di garis bawah, jadi ${sebutBerat(totalGaris(l))} sejajar dengan ${sebutG(totalGaris(l))}.`;
    case "pecah": {
      const { k, r } = potongan(l.total);
      return `Pecah ${sebutG(l.total)} menjadi ${kataBil(k)} potongan seribu gram, yaitu ${kataBil(k)} kilogram${r > 0 ? `, dengan sisa ${sebutG(r)}` : ""}.`;
    }
  }
};
const aturanKanvas = (l: LangkahDasar, n: number): string => {
  switch (l.tipe) {
    case "ubah":
      return l.kanvas === "kg" ? ` Banyak kilogram penuh ada ${kataBil(n)}.` : ` Angka di tempat ${tempat(l.kanvas)} adalah ${kataBil(n)}.`;
    case "gabung":
      return l.kanvas === "kg" ? ` Banyak kilogram hasilnya ada ${kataBil(n)}.` : ` Angka di tempat ${tempat(l.kanvas)} dari sisa gramnya adalah ${kataBil(n)}.`;
    case "bandul":
      return ` Angka di tempat ${tempat(l.kanvas)} adalah ${kataBil(n)}.`;
    case "ons":
      return l.arah === "kg-ons" ? ` Angka di tempat puluhan adalah ${kataBil(n)}.` : ` Angka di tempat ratusan adalah ${kataBil(n)}.`;
    case "tabel":
      return ` Angka di kolom ${l.kanvas === "ratus" ? "ratusan" : l.kanvas === "puluh" ? "puluhan" : "satuan"} gram adalah ${kataBil(n)}.`;
    case "garis":
      return l.kanvas === "lompat" ? ` Lompatan seribu gram ada ${kataBil(n)}.` : ` Angka di tempat ratusan adalah ${kataBil(n)}.`;
    case "pecah":
      return l.kanvas === "potong" ? ` Potongan seribu gram ada ${kataBil(n)}.` : ` Angka di tempat ${l.kanvas === "ratus" ? "ratusan" : "puluhan"} dari sisanya adalah ${kataBil(n)}.`;
  }
};

/** Penjelasan setelah jawaban benar (tanpa digit). */
export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  const k = kunciJawab(l, cara);
  const n = k?.jenis === "angka" ? k.n : 0;
  if (cara === "kanvas") return `${rumus(d)}${aturanKanvas(d, n)}`;
  return k?.jenis === "nama" ? `Jawabannya ${k.nama}. ${rumus(d)}` : rumus(d);
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  const tanya = (d: string, sasaran: string): string => `Berapa angka di tempat ${tempat(d)} dari ${sasaran}? Tulis satu angka di kanvas.`;
  switch (l.tipe) {
    case "ubah": {
      if (l.arah === "kg-g") {
        if (cara === "klik") return `Metode IGIL: berat pada ${g} ini ${sebutKg(l.kg, l.g)}. Ubah ke gram. Berapa gramnya? Pilih ukurannya.`;
        if (cara === "kanvas") return `Metode IGIL: berat pada ${g} ini ${sebutKg(l.kg, l.g)}. Ubah ke gram. ${l.kanvas === "kg" ? "Berapa kilogram penuh? Tulis satu angka di kanvas." : tanya(l.kanvas, "berat dalam gram")}`;
        return `Metode IGIL: berat pada ${g} ini ${sebutKg(l.kg, l.g)}. Untuk mengubah kilogram ke gram, kita mengalikan atau membagi dengan seribu? Ucapkan satu kata.`;
      }
      if (cara === "klik") return `Metode IGIL: berat pada ${g} ini ${sebutG(totalUbah(l))}. Ubah ke kilogram dan gram. Berapa ukurannya? Pilih ukurannya.`;
      if (cara === "kanvas") return `Metode IGIL: berat pada ${g} ini ${sebutG(totalUbah(l))}. Ubah ke kilogram dan gram. ${l.kanvas === "kg" ? "Berapa kilogram penuh? Tulis satu angka di kanvas." : tanya(l.kanvas, "berat dalam gram")}`;
      return l.suara === "operasi"
        ? `Metode IGIL: berat pada ${g} ini ${sebutG(totalUbah(l))}. Untuk mengubah gram ke kilogram, kita mengalikan atau membagi dengan seribu? Ucapkan satu kata.`
        : `Metode IGIL: berat pada ${g} ini ${sebutG(totalUbah(l))}. Berapa kilogram penuhnya? Ucapkan bilangannya.`;
    }
    case "gabung": {
      const kata1 = l.op === "tambah" ? "dicampur dengan" : "dikurangi";
      const dasar = `Metode IGIL: pada ${g} ini ada berat ${sebutBerat(l.a)} yang ${kata1} ${sebutBerat(l.b)}.`;
      if (cara === "klik") return `${dasar} Berapa beratnya sekarang? Pilih ukurannya.`;
      if (cara === "kanvas") return `${dasar} ${l.kanvas === "kg" ? "Berapa kilogram penuh hasilnya? Tulis satu angka di kanvas." : `Berapa angka di tempat ${tempat(l.kanvas)} dari sisa gram hasilnya? Tulis satu angka di kanvas.`}`;
      return l.suara === "operasi" ? `${dasar} Untuk mencari hasilnya, kita menambah atau mengurangi? Ucapkan satu kata.` : `${dasar} Berapa kilogram penuh hasilnya? Ucapkan bilangannya.`;
    }
    case "bandul": {
      const dasar = `Metode IGIL: lihat bandul timbangan kodok pada ${g} ini.`;
      if (cara === "klik") return `${dasar} Berapa gram berat seluruh bandul? Pilih ukurannya.`;
      if (cara === "kanvas") return `${dasar} ${tanya(l.kanvas, "berat seluruh bandul dalam gram")}`;
      return l.suara === "satuOns" ? `${dasar} Satu bandul satu ons beratnya berapa gram? Ucapkan bilangannya.` : `${dasar} Satu kilogram sama dengan berapa ons? Ucapkan bilangannya.`;
    }
    case "ons": {
      if (l.arah === "kg-ons") {
        const dasar = `Metode IGIL: ada ${kataBil(l.n)} bandul satu kilogram pada ${g} ini, dan satu kilogram sama dengan sepuluh ons.`;
        if (cara === "klik") return `${dasar} Berapa ons seluruhnya? Pilih ukurannya.`;
        if (cara === "kanvas") return `${dasar} ${tanya("puluh", "banyak ons seluruhnya")}`;
        return `${dasar} Berapa ons seluruhnya? Ucapkan bilangannya.`;
      }
      const dasar = `Metode IGIL: ada ${kataBil(l.n)} bandul satu ons pada ${g} ini, dan satu ons sama dengan seratus gram.`;
      if (cara === "klik") return `${dasar} Berapa gram seluruhnya? Pilih ukurannya.`;
      if (cara === "kanvas") return `${dasar} ${tanya("ratus", "berat seluruhnya dalam gram")}`;
      return `${dasar} Berapa gram seluruhnya? Ucapkan bilangannya.`;
    }
    case "tabel": {
      const dasar = `Place Value Chart: lihat tabel tempat angka pada ${g} ini, dengan kolom kilogram, ratusan gram, puluhan gram, dan satuan gram.`;
      if (cara === "klik") return `${dasar} Berapa gram beratnya? Pilih ukurannya.`;
      if (cara === "kanvas") return `${dasar} Berat seluruhnya ${sebutG(totalTabel(l))}. Berapa angka yang cocok di kolom ${l.kanvas === "ratus" ? "ratusan" : l.kanvas === "puluh" ? "puluhan" : "satuan"} gram yang tertutup? Tulis satu angka di kanvas.`;
      if (l.suara === "kg") return `${dasar} Berapa angka di kolom kilogram? Ucapkan bilangannya.`;
      return l.suara === "nKg" ? `${dasar} Kolom paling kiri memakai satuan apa? Ucapkan satu kata.` : `${dasar} Tiga kolom di kanan memakai satuan apa? Ucapkan satu kata.`;
    }
    case "garis": {
      const dasar = `Double Number Line: dua garis sejajar pada ${g} ini, garis atas untuk kilogram dan garis bawah untuk gram.`;
      if (cara === "klik") return l.arah === "kg-g" ? `${dasar} Titik ditandai di garis atas pada ${sebutBerat(totalGaris(l))}. Berapa gram di garis bawah? Pilih ukurannya.` : `${dasar} Titik ditandai di garis bawah pada ${sebutG(totalGaris(l))}. Berapa ukuran di garis atas? Pilih ukurannya.`;
      if (cara === "kanvas") return l.kanvas === "lompat" ? `${dasar} Titik ditandai pada ${sebutBerat(totalGaris(l))}. Berapa lompatan seribu gram dari nol sampai kilogram penuh? Tulis satu angka di kanvas.` : `${dasar} Titik ditandai pada ${sebutG(totalGaris(l))}. ${tanya("ratus", "berat dalam gram")}`;
      if (l.suara === "atas") return `${dasar} Garis atas memakai satuan apa? Ucapkan satu kata.`;
      return l.suara === "bawah" ? `${dasar} Garis bawah memakai satuan apa? Ucapkan satu kata.` : `${dasar} Titik ditandai pada ${sebutG(totalGaris(l))}. Berapa kilogram penuhnya? Ucapkan bilangannya.`;
    }
    case "pecah": {
      const dasar = `Chunking: pecah berat pada ${g} ini, yaitu ${sebutG(l.total)}, menjadi potongan seribu gram dan sisanya.`;
      if (cara === "klik") return `${dasar} Berapa kilogram dan gramnya? Pilih ukurannya.`;
      if (cara === "kanvas") return l.kanvas === "potong" ? `${dasar} Berapa potongan seribu gram? Tulis satu angka di kanvas.` : `${dasar} ${tanya(l.kanvas, "sisanya")}`;
      return l.suara === "hasil" ? `${dasar} Berapa potongan seribu gram? Ucapkan bilangannya.` : `${dasar} Tiap potongan seribu gram sama dengan satu satuan apa? Ucapkan satu kata.`;
    }
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "ubah":
      if (cara === "klik") return d.arah === "kg-g" ? "Berapa gram beratnya?" : "Berapa kilogram dan gramnya?";
      if (cara === "kanvas") return d.kanvas === "kg" ? "Berapa kilogram penuh?" : `Berapa angka di tempat ${tempat(d.kanvas)}?`;
      return d.suara === "operasi" ? "Mengalikan atau membagi dengan seribu?" : "Berapa kilogram penuhnya?";
    case "gabung":
      if (cara === "klik") return "Berapa beratnya sekarang?";
      if (cara === "kanvas") return d.kanvas === "kg" ? "Berapa kilogram penuh hasilnya?" : `Berapa angka di tempat ${tempat(d.kanvas)} dari sisa gramnya?`;
      return d.suara === "operasi" ? "Menambah atau mengurangi?" : "Berapa kilogram penuh hasilnya?";
    case "bandul":
      if (cara === "klik") return "Berapa gram berat seluruh bandul?";
      if (cara === "kanvas") return `Berapa angka di tempat ${tempat(d.kanvas)}?`;
      return d.suara === "satuOns" ? "Satu ons beratnya berapa gram?" : "Satu kilogram sama dengan berapa ons?";
    case "ons":
      if (cara === "klik") return d.arah === "kg-ons" ? "Berapa ons seluruhnya?" : "Berapa gram seluruhnya?";
      if (cara === "kanvas") return d.arah === "kg-ons" ? "Berapa angka di tempat puluhan?" : "Berapa angka di tempat ratusan?";
      return d.arah === "kg-ons" ? "Berapa ons seluruhnya?" : "Berapa gram seluruhnya?";
    case "tabel":
      if (cara === "klik") return "Berapa gram beratnya?";
      if (cara === "kanvas") return `Angka apa di kolom ${d.kanvas === "ratus" ? "ratusan" : d.kanvas === "puluh" ? "puluhan" : "satuan"} yang tertutup?`;
      return d.suara === "kg" ? "Berapa angka di kolom kilogram?" : d.suara === "nKg" ? "Kolom paling kiri memakai satuan apa?" : "Tiga kolom di kanan memakai satuan apa?";
    case "garis":
      if (cara === "klik") return d.arah === "kg-g" ? "Berapa gram di garis bawah?" : "Berapa ukuran di garis atas?";
      if (cara === "kanvas") return d.kanvas === "lompat" ? "Berapa lompatan seribu gram?" : "Berapa angka di tempat ratusan?";
      return d.suara === "atas" ? "Garis atas memakai satuan apa?" : d.suara === "bawah" ? "Garis bawah memakai satuan apa?" : "Berapa kilogram penuhnya?";
    case "pecah":
      if (cara === "klik") return "Berapa kilogram dan gramnya?";
      if (cara === "kanvas") return d.kanvas === "potong" ? "Berapa potongan seribu gram?" : `Berapa angka di tempat ${d.kanvas === "ratus" ? "ratusan" : "puluhan"} dari sisanya?`;
      return d.suara === "hasil" ? "Berapa potongan seribu gram?" : "Tiap potongan seribu gram sama dengan satuan apa?";
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya (tanpa digit). `jawab`: kata atau ukuran yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "ubah":
      if (cara === "suara" && l.suara === "operasi") return l.arah === "kg-g" ? "Gram satuan yang lebih kecil, jadi bilangannya makin besar. Kilogram diubah ke gram dengan dikalikan seribu." : "Dari gram ke kilogram, ambil tiap seribu gram sebagai satu kilogram, yaitu dibagi seribu.";
      return l.arah === "kg-g" ? "Satu kilogram sama dengan seribu gram, bukan seratus gram. Kalikan banyak kilogram dengan seribu, lalu tambahkan gramnya." : "Ambil tiap seribu gram sebagai satu kilogram. Sisa yang kurang dari seribu tetap ditulis sebagai gram.";
    case "gabung":
      if (cara === "suara" && l.suara === "operasi") return l.op === "tambah" ? "Dua berat yang dicampur dijumlahkan, jadi kita menambah." : "Berat yang diambil atau dimakan dikurangkan dari berat semula, jadi kita mengurangi.";
      return "Ubah kedua berat ke gram dulu, baru dijumlahkan atau dikurangkan. Hasilnya boleh dipecah lagi menjadi kilogram dan gram.";
    case "bandul":
      if (cara === "suara") return l.suara === "satuOns" ? "Satu ons sama dengan seratus gram." : "Satu kilogram sama dengan sepuluh ons.";
      return "Jumlahkan berat semua bandul: setengah ons lima puluh gram, satu ons seratus gram, dua ons dua ratus gram, setengah kilogram lima ratus gram, dan satu kilogram seribu gram.";
    case "ons":
      return l.arah === "kg-ons" ? "Satu kilogram sama dengan sepuluh ons, jadi kalikan banyak kilogram dengan sepuluh." : "Satu ons sama dengan seratus gram, jadi kalikan banyak ons dengan seratus.";
    case "tabel":
      if (cara === "suara") return l.suara === "kg" ? "Angka di kolom paling kiri adalah banyak kilogram, yang mewakili ribuan gram." : l.suara === "nKg" ? "Kolom paling kiri memakai satuan kilogram." : "Tiga kolom di kanan memakai satuan gram.";
      return "Angka di kolom kilogram mewakili ribuan gram. Baca dari kiri: ribuan, ratusan, puluhan, lalu satuan.";
    case "garis":
      if (cara === "suara" && l.suara !== "hasil") return l.suara === "atas" ? "Garis atas dipakai untuk kilogram." : "Garis bawah dipakai untuk gram.";
      return "Titik yang sejajar di kedua garis menunjukkan berat yang sama: satu kilogram sejajar dengan seribu gram.";
    case "pecah":
      if (cara === "suara" && l.suara === "nama") return "Tiap seribu gram sama dengan satu kilogram.";
      return "Pecah gram menjadi potongan seribu-seribu. Tiap potongan seribu gram adalah satu kilogram, dan sisanya tetap gram.";
  }
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
/** Isi kartu kata untuk tahap Abstract (kata dan angka). */
export function barisKartu(l: LangkahDasar): string[] {
  switch (l.tipe) {
    case "ubah":
      return l.arah === "kg-g" ? [`${fmtKg(l.kg, l.g)} = … g`, "1 kg = 1.000 g", "kg ke g: kali 1.000"] : [`${fmtG(totalUbah(l))} = … kg … g`, "1.000 g = 1 kg", "g ke kg: ambil tiap 1.000"];
    case "gabung":
      return [`${fmtBerat(l.a)} ${l.op === "tambah" ? "+" : "−"} ${fmtBerat(l.b)} = …`, "ubah ke gram dulu", `${fmtG(l.a)} ${l.op === "tambah" ? "+" : "−"} ${fmtG(l.b)} = …`];
    case "bandul":
      return [`bandul: ${l.set.map((n, i) => (n > 0 ? `${LABEL_BANDUL[i]} x ${n}` : "")).filter(Boolean).join(", ")}`, "berat = jumlah bandul", "berat seluruhnya = … g"];
    case "ons":
      return l.arah === "kg-ons" ? [`${l.n} kg = … ons`, "1 kg = 10 ons"] : [`${l.n} ons = … g`, "1 ons = 100 g"];
    case "tabel": {
      const [a, b, c, d] = kolomTabel(l);
      return [`kg: ${a} | ratusan g: ${b} | puluhan g: ${c} | satuan g: ${d}`, "kg = ribuan g", "berat = … g"];
    }
    case "garis":
      return l.arah === "kg-g" ? [`garis atas: ${fmtBerat(totalGaris(l))}`, "garis bawah: … g", "1 kg sejajar 1.000 g"] : [`garis bawah: ${fmtG(totalGaris(l))}`, "garis atas: … kg … g", "1 kg sejajar 1.000 g"];
    case "pecah":
      return [`berat: ${fmtG(l.total)}`, "pecah seribu-seribu", "… kg … g"];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
