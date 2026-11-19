/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 2 Sub-Bab B "Botol Air Pak Darto" (kalimat Matematika pengurangan):
 * jenis tugas, kunci, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-botol-k3b2b.mjs.
 * Jawaban beragam: memilih bilangan (klik), menulis SATU angka di kanvas (bilangan yang belum diketahui atau satu angkanya, langkah naik, lompatan, satuan),
 * dan mengucapkan satu kata (tambah, kurang, mundur) atau bilangan pendek. Kunci dihitung dari data (awal, dikurangkan, sisa), bukan kunci tetap.
 * Bilangan awal tidak lebih dari seratus.
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

/* ------------------------------ Kata bilangan ------------------------------ */
const SAT = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"] as const;
/** Nama bilangan 0 sampai 999 dalam kata (tanpa digit): seratus, lima puluh lima, tiga belas. */
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
export const puluhan = (n: number): number => Math.floor(n / 10) % 10;
export const satuan = (n: number): number => n % 10;

/* ------------------------------ Benda ------------------------------ */
export type Benda = "botol" | "biskuit" | "kaleng" | "apel" | "roti";
export const EMOJI_BENDA: Record<Benda, string> = { botol: "\u{1F37C}", biskuit: "\u{1F36A}", kaleng: "\u{1F96B}", apel: "\u{1F34E}", roti: "\u{1F35E}" };
export const EMOJI_KRAT = "\u{1F4E6}";

/* ------------------------------ Jenis tugas ------------------------------ */
/** Yang belum diketahui pada kalimat pengurangan: bilangan yang dikurangkan (awal dikurangi sisa) atau bilangan awal (dikurangkan ditambah sisa). */
export type Hilang = "kurang" | "awal";
/** Bagian bilangan yang ditulis di kanvas: bilangan seluruhnya (harus satu angka), angka puluhan, atau angka satuan. */
export type Digit = "hilang" | "puluhan" | "satuan";

/** Metode IGIL: kalimat pengurangan dengan titik-titik. awal = kurang + sisa. klik: bilangan yang belum diketahui; kanvas: bilangan atau satu angkanya; suara: operasi (tambah atau kurang) atau bilangannya. */
export type LKalimat = { tipe: "kalimat"; awal: number; kurang: number; sisa: number; hilang: Hilang; benda: Benda; kanvas: Digit; suara: "operasi" | "hilang" };
/** Metode IGIL: memeriksa hasil dengan mengurangkan lagi (awal dikurangi dikurangkan harus sama dengan sisa). klik: hasilnya; kanvas: satu angka hasil; suara: cara memeriksa (kurang) atau hasilnya. */
export type LPeriksa = { tipe: "periksa"; awal: number; kurang: number; sisa: number; benda: Benda; kanvas: "puluhan" | "satuan"; suara: "operasi" | "hasil" };
/** Fact Family (Keluarga Fakta): awal = b1 + b2, satu dari tiga bilangan hilang. */
export type LFakta = { tipe: "fakta"; awal: number; b1: number; b2: number; hilang: "awal" | "b1" | "b2"; benda: Benda; kanvas: Digit; suara: "operasi" | "hilang" };
/** Counting Up (Menghitung Naik): dari sisa naik ke puluhan terdekat, lalu naik puluhan sampai awal (awal kelipatan sepuluh). klik dan suara: jarak seluruhnya; kanvas: langkah pertama atau banyak lompatan puluhan. */
export type LNaik = { tipe: "naik"; awal: number; sisa: number; benda: Benda; kanvas: "langkah" | "puluh"; suara: "jarak" };
/** Number Line (Garis Bilangan): dari awal melompat mundur sebesar dikurangkan. klik: tempat mendarat; kanvas: lompatan puluhan atau satuan; suara: arah (mundur) atau tempat mendarat. */
export type LGaris = { tipe: "garis"; awal: number; kurang: number; benda: Benda; kanvas: "puluh" | "satuan"; suara: "arah" | "sisa" };
export type LangkahDasar = LKalimat | LPeriksa | LFakta | LNaik | LGaris;
/** Cari kesalahan: tokoh sudah menjawab bilangan yang belum diketahui pada `dasar`. Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LKalimat;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "fakta" | "naik" | "garis";
export const URUT_METODE: Metode[] = ["igil", "fakta", "naik", "garis"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Awal Dikurangi Sisa, Dikurangkan Ditambah Sisa",
  fakta: "Fact Family: Keluarga Fakta",
  naik: "Counting Up: Menghitung Naik",
  garis: "Number Line: Garis Bilangan",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F4DD}", fakta: "\u{1F46A}", naik: "\u{1F4C8}", garis: "\u{1F4CF}" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/* ------------------------------ Nilai turunan ------------------------------ */
/** Bilangan yang belum diketahui pada kalimat. */
export const nilaiKalimat = (l: LKalimat): number => (l.hilang === "kurang" ? l.kurang : l.awal);
export const nilaiFakta = (l: LFakta): number => (l.hilang === "awal" ? l.awal : l.hilang === "b1" ? l.b1 : l.b2);
/** Puluhan terdekat di atas sisa pada Menghitung Naik. */
export const puluhanTerdekat = (sisa: number): number => Math.ceil((sisa + 1) / 10) * 10;
export const langkahPertama = (l: LNaik): number => puluhanTerdekat(l.sisa) - l.sisa;
export const lompatPuluh = (l: LNaik): number => (l.awal - puluhanTerdekat(l.sisa)) / 10;
export const jarakNaik = (l: LNaik): number => l.awal - l.sisa;
export const sisaGaris = (l: LGaris): number => l.awal - l.kurang;
export const hasilPeriksa = (l: LPeriksa): number => l.awal - l.kurang;
const ambil = (n: number, d: Digit): number => (d === "hilang" ? n : d === "puluhan" ? puluhan(n) : satuan(n));

/** Apakah data satu tugas konsisten dan sesuai batas (awal paling banyak seratus; jawaban kanvas satu angka dari satu sampai sembilan)? */
export function dataSah(l: LangkahDasar): boolean {
  const antara = (n: number, a: number, b: number) => Number.isInteger(n) && n >= a && n <= b;
  switch (l.tipe) {
    case "kalimat":
      return l.awal === l.kurang + l.sisa && antara(l.awal, 2, 100) && antara(l.kurang, 1, 99) && antara(l.sisa, 1, 99) && antara(ambil(nilaiKalimat(l), l.kanvas), 1, 9);
    case "periksa":
      return l.sisa === l.awal - l.kurang && antara(l.awal, 2, 100) && antara(l.kurang, 1, 99) && antara(l.sisa, 1, 99) && antara(ambil(l.sisa, l.kanvas), 1, 9);
    case "fakta":
      return l.awal === l.b1 + l.b2 && antara(l.awal, 2, 100) && antara(l.b1, 1, 99) && antara(l.b2, 1, 99) && antara(ambil(nilaiFakta(l), l.kanvas), 1, 9);
    case "naik":
      return l.awal % 10 === 0 && l.sisa % 10 !== 0 && antara(l.awal, 20, 100) && antara(l.sisa, 1, 99) && l.sisa < l.awal && puluhanTerdekat(l.sisa) < l.awal && antara(l.kanvas === "langkah" ? langkahPertama(l) : lompatPuluh(l), 1, 9);
    case "garis":
      return antara(l.awal, 20, 100) && antara(l.kurang, 11, 99) && l.kurang < l.awal && l.kurang % 10 !== 0 && antara(l.kanvas === "puluh" ? Math.floor(l.kurang / 10) : l.kurang % 10, 1, 9) && antara(l.awal - l.kurang, 1, 99);
  }
}

/* ------------------------------ Kunci ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });
export const KATA_OPERASI = ["tambah", "kurang", "bagi"] as const;
export const KATA_ARAH = ["mundur", "maju", "diam"] as const;

/** Kunci tiap tugas menurut caranya, dihitung dari data. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "kalimat":
      if (cara === "klik") return angka(nilaiKalimat(l));
      if (cara === "kanvas") return angka(ambil(nilaiKalimat(l), l.kanvas));
      return l.suara === "operasi" ? nama(l.hilang === "kurang" ? "kurang" : "tambah") : angka(nilaiKalimat(l));
    case "periksa":
      if (cara === "klik") return angka(hasilPeriksa(l));
      if (cara === "kanvas") return angka(ambil(hasilPeriksa(l), l.kanvas));
      return l.suara === "operasi" ? nama("kurang") : angka(hasilPeriksa(l));
    case "fakta":
      if (cara === "klik") return angka(nilaiFakta(l));
      if (cara === "kanvas") return angka(ambil(nilaiFakta(l), l.kanvas));
      return l.suara === "operasi" ? nama(l.hilang === "awal" ? "tambah" : "kurang") : angka(nilaiFakta(l));
    case "naik":
      if (cara === "kanvas") return angka(l.kanvas === "langkah" ? langkahPertama(l) : lompatPuluh(l));
      return angka(jarakNaik(l));
    case "garis":
      if (cara === "klik") return angka(sisaGaris(l));
      if (cara === "kanvas") return angka(l.kanvas === "puluh" ? Math.floor(l.kurang / 10) : l.kurang % 10);
      return l.suara === "arah" ? nama("mundur") : angka(sisaGaris(l));
  }
}

/** Semua tugas punya kunci, kecuali Cari kesalahan yang memakai kegiatan lebih dulu. Tidak bergantung pada rupa. */
export function siapLangsung(l: Langkah, rupa: Rupa, cara: Cara): boolean {
  void rupa;
  if (l.tipe === "salah") return false;
  return kunciJawab(l, cara) !== null;
}

/* ------------------------------ Pilihan ------------------------------ */
/** Kesalahan khas tiap tugas (operasi yang keliru), dipakai sebagai pengecoh bilangan. */
function ekstraKeliru(l: LangkahDasar): number[] {
  switch (l.tipe) {
    case "kalimat":
      return l.hilang === "kurang" ? [l.awal + l.sisa] : [Math.abs(l.kurang - l.sisa)];
    case "periksa":
      return [l.awal + l.kurang];
    case "fakta":
      return l.hilang === "awal" ? [Math.abs(l.b1 - l.b2)] : [l.awal + (l.hilang === "b1" ? l.b2 : l.b1)];
    case "naik":
      return [l.awal - puluhanTerdekat(l.sisa), l.awal + l.sisa];
    case "garis":
      return [l.awal + l.kurang];
  }
}
/** Pengecoh khas untuk bilangan `n`: kesalahan operasi, selisih sepuluh atau satu. Berurut, tanpa kembar, 1 sampai 100. */
export function pengecoh(n: number, awal?: number, ekstra: number[] = []): number[] {
  const calon = [awal ?? -1, ...ekstra, n + 10, n - 10, n + 1, n - 1, n + 2, n - 2];
  const hasil: number[] = [];
  for (const c of calon) if (Number.isInteger(c) && c >= 1 && c <= 100 && c !== n && !hasil.includes(c)) hasil.push(c);
  return hasil;
}
/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisipkan(benar: string, lain: string[], geser: number): string[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}
/** Tiga pilihan untuk tugas klik (bilangan): kunci tidak pernah di tombol pertama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k || k.jenis !== "angka") return [];
  const awal = l.tipe === "salah" ? Number(l.jawabTokoh) : undefined;
  const [a, b] = pengecoh(k.n, awal, ekstraKeliru(dasarDari(l)));
  return sisipkan(String(k.n), [String(a), String(b)], k.n);
}
/** Pilihan cadangan untuk tugas suara (kata atau bilangan dalam kata) dan tugas kanvas berjawaban satu angka. */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k) return [];
  const d = dasarDari(l);
  if (k.jenis === "angka") {
    const lain = cara === "kanvas" ? [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((x) => x !== k.n && Math.abs(x - k.n) <= 2).slice(0, 2) : pengecoh(k.n, undefined, ekstraKeliru(d)).slice(0, 2);
    return sisipkan(kataBil(k.n), lain.map(kataBil), k.n);
  }
  const semua: string[] = k.nama === "mundur" || k.nama === "maju" || k.nama === "diam" ? [...KATA_ARAH] : [...KATA_OPERASI];
  return sisipkan(k.nama, semua.filter((x) => x !== k.nama), k.nama.length);
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : "gambar");
const tempatDigit = (d: Digit): string => (d === "puluhan" ? "puluhan" : "satuan");
/** Kalimat Matematika untuk layar (angka boleh), titik-titik untuk yang belum diketahui. */
export const kalimatLayar = (l: LKalimat | LPeriksa): string => (l.tipe === "periksa" ? `${l.awal} − ${l.kurang} = …` : `${l.hilang === "awal" ? "…" : l.awal} − ${l.hilang === "kurang" ? "…" : l.kurang} = ${l.sisa}`);
const rumus = (l: LangkahDasar): string => {
  switch (l.tipe) {
    case "kalimat":
      return l.hilang === "kurang" ? `Bilangan yang dikurangkan dicari dengan awal dikurangi sisa: ${kataBil(l.awal)} dikurangi ${kataBil(l.sisa)} sama dengan ${kataBil(l.kurang)}.` : `Bilangan awal dicari dengan menambah yang dikurangkan dan sisa: ${kataBil(l.kurang)} tambah ${kataBil(l.sisa)} sama dengan ${kataBil(l.awal)}.`;
    case "periksa":
      return `Periksa dengan mengurangkan lagi: ${kataBil(l.awal)} dikurangi ${kataBil(l.kurang)} sama dengan ${kataBil(hasilPeriksa(l))}.`;
    case "fakta":
      return l.hilang === "awal" ? `Bilangan awal adalah jumlah kedua bagian: ${kataBil(l.b1)} tambah ${kataBil(l.b2)} sama dengan ${kataBil(l.awal)}.` : `Bagian yang hilang adalah awal dikurangi bagian yang ada: ${kataBil(l.awal)} dikurangi ${kataBil(l.hilang === "b1" ? l.b2 : l.b1)} sama dengan ${kataBil(nilaiFakta(l))}.`;
    case "naik":
      return `Dari ${kataBil(l.sisa)} naik ${kataBil(langkahPertama(l))} ke ${kataBil(puluhanTerdekat(l.sisa))}, lalu naik ${kataBil(l.awal - puluhanTerdekat(l.sisa))} ke ${kataBil(l.awal)}. Jaraknya ${kataBil(jarakNaik(l))}.`;
    case "garis":
      return `Dari ${kataBil(l.awal)} mundur ${kataBil(l.kurang)} mendarat di ${kataBil(sisaGaris(l))}: puluhan dulu, baru satuan.`;
  }
};
const aturanKanvas = (l: LangkahDasar, n: number): string => {
  switch (l.tipe) {
    case "kalimat":
      return l.kanvas === "hilang" ? "" : ` Angka di tempat ${tempatDigit(l.kanvas)} adalah ${kataBil(n)}.`;
    case "fakta":
      return l.kanvas === "hilang" ? "" : ` Angka di tempat ${tempatDigit(l.kanvas)} adalah ${kataBil(n)}.`;
    case "periksa":
      return ` Angka di tempat ${tempatDigit(l.kanvas)} adalah ${kataBil(n)}.`;
    case "naik":
      return l.kanvas === "langkah" ? ` Langkah pertama ada ${kataBil(n)}.` : ` Lompatan puluhan ada ${kataBil(n)}.`;
    case "garis":
      return l.kanvas === "puluh" ? ` Lompatan puluhan ada ${kataBil(n)}.` : ` Satuan yang dilompati ada ${kataBil(n)}.`;
  }
};

/** Penjelasan setelah jawaban benar (tanpa digit). */
export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  const k = kunciJawab(l, cara);
  const n = k?.jenis === "angka" ? k.n : 0;
  if (cara === "klik" || cara === "suara") return k?.jenis === "nama" ? `Jawabannya ${k.nama}. ${rumus(d)}` : rumus(d);
  return `${rumus(d)}${aturanKanvas(d, n)}`;
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  const tanyaDigit = (d: Digit, sasaran: string): string => (d === "hilang" ? `Berapa ${sasaran}? Tulis satu angka di kanvas.` : `Berapa angka di tempat ${tempatDigit(d)} dari ${sasaran}? Tulis satu angka di kanvas.`);
  switch (l.tipe) {
    case "kalimat":
      if (cara === "klik") return `Metode IGIL: lihat kalimat pengurangan dengan titik-titik pada ${g} ini. Bilangan berapa yang belum diketahui? Pilih bilangannya.`;
      if (cara === "kanvas") return `Metode IGIL: lihat kalimat pengurangan dengan titik-titik pada ${g} ini. ${tanyaDigit(l.kanvas, "bilangan yang belum diketahui")}`;
      return l.suara === "operasi"
        ? `Metode IGIL: lihat kalimat pengurangan dengan titik-titik pada ${g} ini. Untuk mencari bilangan yang belum diketahui, kita menambah atau mengurangi? Ucapkan satu kata.`
        : `Metode IGIL: lihat kalimat pengurangan dengan titik-titik pada ${g} ini. Bilangan berapa yang belum diketahui? Ucapkan bilangannya.`;
    case "periksa":
      if (cara === "klik") return `Metode IGIL: periksa dengan mengurangkan lagi pada ${g} ini. Berapa hasil pengurangannya? Pilih bilangannya.`;
      if (cara === "kanvas") return `Metode IGIL: periksa dengan mengurangkan lagi pada ${g} ini. Berapa angka di tempat ${tempatDigit(l.kanvas)} dari hasilnya? Tulis satu angka di kanvas.`;
      return l.suara === "operasi" ? `Metode IGIL: periksa hasil pada ${g} ini. Memeriksa dilakukan dengan menambah atau mengurangkan lagi? Ucapkan satu kata.` : `Metode IGIL: periksa dengan mengurangkan lagi pada ${g} ini. Berapa hasilnya? Ucapkan bilangannya.`;
    case "fakta":
      if (cara === "klik") return `Fact Family: lihat keluarga tiga bilangan pada ${g} ini. Bilangan berapa yang hilang? Pilih bilangannya.`;
      if (cara === "kanvas") return `Fact Family: lihat keluarga tiga bilangan pada ${g} ini. ${tanyaDigit(l.kanvas, "bilangan yang hilang")}`;
      return l.suara === "operasi" ? `Fact Family: lihat keluarga tiga bilangan pada ${g} ini. Untuk mencari bilangan yang hilang, kita menambah atau mengurangi? Ucapkan satu kata.` : `Fact Family: lihat keluarga tiga bilangan pada ${g} ini. Bilangan berapa yang hilang? Ucapkan bilangannya.`;
    case "naik":
      if (cara === "klik") return `Counting Up: naik dari bilangan kecil ke bilangan besar pada ${g} ini. Berapa jarak yang dinaiki seluruhnya? Pilih bilangannya.`;
      if (cara === "kanvas") return l.kanvas === "langkah" ? `Counting Up: naik dari bilangan kecil ke bilangan besar pada ${g} ini. Berapa langkah naik ke puluhan terdekat? Tulis satu angka di kanvas.` : `Counting Up: naik dari bilangan kecil ke bilangan besar pada ${g} ini. Setelah puluhan terdekat, berapa lompatan puluhan sampai tujuan? Tulis satu angka di kanvas.`;
      return `Counting Up: naik dari bilangan kecil ke bilangan besar pada ${g} ini. Berapa jarak yang dinaiki seluruhnya? Ucapkan bilangannya.`;
    case "garis":
      if (cara === "klik") return `Number Line: melompat mundur dari bilangan awal pada ${g} ini. Di bilangan berapa lompatan mendarat? Pilih bilangannya.`;
      if (cara === "kanvas") return l.kanvas === "puluh" ? `Number Line: melompat mundur dari bilangan awal pada ${g} ini. Berapa lompatan puluhan? Tulis satu angka di kanvas.` : `Number Line: melompat mundur dari bilangan awal pada ${g} ini. Setelah lompatan puluhan, berapa satuan yang dilompati lagi? Tulis satu angka di kanvas.`;
      return l.suara === "arah" ? `Number Line: pengurangan pada ${g} ini dilakukan dengan melompat. Melompat ke arah mana? Ucapkan satu kata.` : `Number Line: melompat mundur dari bilangan awal pada ${g} ini. Di bilangan berapa lompatan mendarat? Ucapkan bilangannya.`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  const pilihDigit = (dg: Digit, sasaran: string): string => (dg === "hilang" ? `Berapa ${sasaran}?` : `Berapa angka di tempat ${tempatDigit(dg)} dari ${sasaran}?`);
  switch (d.tipe) {
    case "kalimat":
      return cara === "klik" ? "Bilangan berapa yang belum diketahui?" : cara === "kanvas" ? pilihDigit(d.kanvas, "bilangan yang belum diketahui") : d.suara === "operasi" ? "Menambah atau mengurangi?" : "Bilangan berapa yang belum diketahui?";
    case "periksa":
      return cara === "klik" ? "Berapa hasil pengurangannya?" : cara === "kanvas" ? `Berapa angka di tempat ${tempatDigit(d.kanvas)} dari hasilnya?` : d.suara === "operasi" ? "Memeriksa dengan menambah atau mengurangkan lagi?" : "Berapa hasilnya?";
    case "fakta":
      return cara === "klik" ? "Bilangan berapa yang hilang?" : cara === "kanvas" ? pilihDigit(d.kanvas, "bilangan yang hilang") : d.suara === "operasi" ? "Menambah atau mengurangi?" : "Bilangan berapa yang hilang?";
    case "naik":
      return cara === "kanvas" ? (d.kanvas === "langkah" ? "Berapa langkah naik ke puluhan terdekat?" : "Berapa lompatan puluhan sampai tujuan?") : "Berapa jarak yang dinaiki seluruhnya?";
    case "garis":
      return cara === "klik" ? "Di bilangan berapa lompatan mendarat?" : cara === "kanvas" ? (d.kanvas === "puluh" ? "Berapa lompatan puluhan?" : "Berapa satuan yang dilompati lagi?") : d.suara === "arah" ? "Melompat ke arah mana?" : "Di bilangan berapa lompatan mendarat?";
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya (tanpa digit). `jawab`: kata atau bilangan yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "kalimat":
      if (l.hilang === "kurang") return "Bilangan yang dikurangkan dicari dengan bilangan awal dikurangi sisa. Jangan menambahkan awal dengan sisa.";
      return "Bilangan awal dicari dengan menambahkan yang dikurangkan dan sisa, bukan dikurangkan. Awal itu satu tumpukan penuh sebelum diambil.";
    case "periksa":
      return cara === "suara" && l.suara === "operasi" ? "Memeriksa hasil dilakukan dengan mengurangkan lagi: awal dikurangi yang dikurangkan harus sama dengan sisa." : "Periksa dengan mengurangkan lagi: bilangan awal dikurangi bilangan yang dikurangkan. Hasilnya harus sama dengan sisa.";
    case "fakta":
      return l.hilang === "awal" ? "Awal adalah jumlah dua bagian, jadi bagian ditambah bagian. Jangan dikurangkan." : "Bagian yang hilang dicari dengan awal dikurangi bagian yang diketahui. Awal adalah bilangan terbesar di puncak segitiga.";
    case "naik":
      if (cara === "kanvas") return l.kanvas === "langkah" ? "Naik dulu ke bilangan puluhan terdekat di atas bilangan kecil. Langkah pertama adalah selisih keduanya." : "Setelah puluhan terdekat, naik puluhan demi puluhan sampai tujuan. Hitung banyak lompatan puluhan.";
      return "Jarak seluruhnya adalah langkah ke puluhan terdekat ditambah lompatan puluhan sampai tujuan.";
    case "garis":
      if (cara === "kanvas") return l.kanvas === "puluh" ? "Lompat puluhan dulu. Satu lompatan puluhan mundur sepuluh, jadi hitung berapa kali." : "Setelah puluhan, sisanya dilompati satu-satu sebagai satuan.";
      if (cara === "suara" && l.suara === "arah") return "Mengurangi berarti bergerak ke kiri pada garis bilangan, yaitu mundur.";
      return "Mulai dari bilangan awal, lompat mundur puluhan dulu, lalu satuan. Tempat mendarat adalah sisanya.";
  }
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
/** Isi kartu kata untuk tahap Abstract (kata dan angka). */
export function barisKartu(l: LangkahDasar): string[] {
  switch (l.tipe) {
    case "kalimat":
      return [kalimatLayar(l), "awal − dikurangkan = sisa", `titik-titik: ${l.hilang === "kurang" ? "dikurangkan" : "awal"}`];
    case "periksa":
      return [kalimatLayar(l), "periksa: kurangkan lagi"];
    case "fakta":
      return [`bagian: ${l.hilang === "b1" ? "?" : l.b1} dan ${l.hilang === "b2" ? "?" : l.b2}`, `awal: ${l.hilang === "awal" ? "?" : l.awal}`];
    case "naik":
      return [`dari: ${l.sisa}`, `sampai: ${l.awal}`, `naik ke puluhan: ${puluhanTerdekat(l.sisa)}`];
    case "garis":
      return [`awal: ${l.awal}`, `mundur: ${l.kurang}`, "mendarat: ?"];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
