/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 3 Sub-Bab B "Pita Pak Wayan" (hubungan sentimeter dan meter), Kebun Binatang Mini:
 * jenis tugas, kunci, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-pita-k3b3b.mjs.
 * Lima jenis tugas dalam empat metode: IGIL (kali seratus ke sentimeter, bagi seratus ke meter: "kali"), Ratio Table (Tabel Perbandingan: "tabel"),
 * Number Line (Garis Bilangan: "jarak" dan "banding"), dan Split Strategy (Cara Memecah: "pecah"). Ukuran selalu bersatuan (cm atau m).
 * Jawaban beragam: memilih ukuran (klik), menulis SATU angka di kanvas (angka satu bilangan, banyak meter, banyak ratusan, banyak lompatan, nomor pita),
 * dan mengucapkan satu kata (kali, bagi, tambah, kurang) atau bilangan pendek. Kunci dihitung dari data, bukan kunci tetap. Ukuran paling panjang sembilan ratus sembilan puluh sembilan sentimeter.
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
export const ratusan = (n: number): number => Math.floor(n / 100) % 10;
export const puluhan = (n: number): number => Math.floor(n / 10) % 10;
export const satuan = (n: number): number => n % 10;

/* ------------------------------ Benda ------------------------------ */
export type Benda = "kelinci" | "kura" | "kambing" | "beo" | "rusa";
export const EMOJI_BENDA: Record<Benda, string> = { kelinci: "\u{1F407}", kura: "\u{1F422}", kambing: "\u{1F410}", beo: "\u{1F99C}", rusa: "\u{1F98C}" };

/* ------------------------------ Satuan dan ukuran ------------------------------ */
export type Satuan = "cm" | "m" | "";
const NAMA_SATUAN: Record<Satuan, string> = { cm: "sentimeter", m: "meter", "": "" };
/** Ukuran untuk layar: "600 cm", "6 m", atau bilangan saja bila tanpa satuan. */
export const labelBil = (n: number, s: Satuan): string => (s ? `${n} ${s}` : String(n));
/** Ukuran dalam kata (tanpa digit): "enam ratus sentimeter". */
export const kataBilSatuan = (n: number, s: Satuan): string => (s ? `${kataBil(n)} ${NAMA_SATUAN[s]}` : kataBil(n));
export const totalCm = (m: number, c: number): number => m * 100 + c;
/** Ukuran sentimeter `cm` untuk layar: bentuk meter dan sentimeter bersama ("3 m 5 cm", "3 m") atau sentimeter saja. */
export const labelUkuran = (cm: number, bersama: boolean): string => {
  if (!bersama) return `${cm} cm`;
  const m = Math.floor(cm / 100);
  const c = cm % 100;
  return c === 0 ? `${m} m` : `${m} m ${c} cm`;
};
/** Ukuran meter dan sentimeter: "2 m 60 cm". */
export const labelMc = (m: number, c: number): string => (c === 0 ? `${m} m` : m === 0 ? `${c} cm` : `${m} m ${c} cm`);
/** Ukuran dalam kata (tanpa digit): "dua meter enam puluh sentimeter". */
export const kataMc = (m: number, c: number): string => (c === 0 ? `${kataBil(m)} meter` : m === 0 ? `${kataBil(c)} sentimeter` : `${kataBil(m)} meter ${kataBil(c)} sentimeter`);

/* ------------------------------ Jenis tugas ------------------------------ */
/** Bagian bilangan yang ditulis di kanvas: seluruhnya (harus satu angka), atau angka ratusan, puluhan, atau satuan. */
export type Digit = "hilang" | "ratusan" | "puluhan" | "satuan";
const ambil = (n: number, d: Digit): number => (d === "hilang" ? n : d === "ratusan" ? ratusan(n) : d === "puluhan" ? puluhan(n) : satuan(n));

/**
 * Metode IGIL (Kali Seratus ke Sentimeter, Bagi Seratus ke Meter).
 * ke-cm: m meter (dan c sentimeter) dijadikan sentimeter; ke-m: 100 m sentimeter dijadikan meter (c = 0); pisah: total sentimeter ditulis meter dan sentimeter bersama (bagian yang ditanya).
 * klik: ukuran; kanvas: satu angka; suara: operasi (kali atau bagi) atau bilangannya.
 */
export type LKali = { tipe: "kali"; arah: "ke-cm" | "ke-m" | "pisah"; m: number; c: number; bagian: "meter" | "cm"; benda: Benda; kanvas: Digit; suara: "operasi" | "hasil" };
/** Ratio Table (Tabel Perbandingan): dua kolom dikenal (meter), satu kolom kosong di baris meter (tanya "m") atau baris sentimeter (tanya "cm"). */
export type LTabel = { tipe: "tabel"; dikenal: [number, number]; m: number; tanya: "cm" | "m"; benda: Benda; kanvas: Digit; suara: "hasil" };
/** Number Line (Garis Bilangan), jarak: dua titik pada garis, dari `dari` meter ke `ke` meter. klik: jarak sentimeter; kanvas: banyak lompatan seratus; suara: jarak sentimeter. */
export type LJarak = { tipe: "jarak"; dari: number; ke: number; benda: Benda; kanvas: "lompat"; suara: "jarak" };
/** Number Line (Garis Bilangan), membandingkan: tiga ukuran (sentimeter), `bentuk` = ditulis meter dan sentimeter bersama. klik: ukuran terpanjang; kanvas dan suara: nomor pita terpanjang. */
export type LBanding = { tipe: "banding"; ukuran: [number, number, number]; bentuk: [boolean, boolean, boolean]; benda: Benda; kanvas: "nomor"; suara: "nomor" };
/** Split Strategy (Cara Memecah): jumlah atau selisih dua ukuran, bagian meter dan bagian sentimeter dihitung sendiri. tanya: bagian meter atau bagian sentimeter hasilnya. */
export type LPecah = { tipe: "pecah"; op: "tambah" | "kurang"; a: [number, number]; b: [number, number]; tanya: "meter" | "cm"; benda: Benda; kanvas: Digit; suara: "hasil" | "operasi" };
export type LangkahDasar = LKali | LTabel | LJarak | LBanding | LPecah;
/** Cari kesalahan: tokoh sudah menjawab pada `dasar`. Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. `jawabTokoh` = ukuran seperti tampil di pilihan ("90 cm"). */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LKali | LPecah;
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
  igil: "Metode IGIL: Kali Seratus ke Sentimeter, Bagi Seratus ke Meter",
  tabel: "Ratio Table: Tabel Perbandingan",
  garis: "Number Line: Garis Bilangan",
  pecah: "Split Strategy: Cara Memecah",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F4DD}", tabel: "\u{1F4CA}", garis: "\u{1F4CF}", pecah: "\u{1F9E9}" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/* ------------------------------ Nilai turunan ------------------------------ */
/** Ukuran hasil pecah: [meter, sentimeter]. */
export function hasilPecah(l: LPecah): [number, number] {
  const t = l.op === "tambah" ? totalCm(l.a[0], l.a[1]) + totalCm(l.b[0], l.b[1]) : totalCm(l.a[0], l.a[1]) - totalCm(l.b[0], l.b[1]);
  return [Math.floor(t / 100), t % 100];
}
/** Apakah hasil pecah memakai tukar seratus sentimeter menjadi satu meter (tambah) atau meminjam satu meter (kurang)? */
export const adaTukar = (l: LPecah): boolean => (l.op === "tambah" ? l.a[1] + l.b[1] >= 100 : l.a[1] < l.b[1]);
/** Bilangan yang ditanya pada tugas Metode IGIL. */
export function nilaiKali(l: LKali): number {
  if (l.arah === "ke-cm") return totalCm(l.m, l.c);
  if (l.arah === "ke-m") return l.m;
  return l.bagian === "meter" ? l.m : l.c;
}
export const satuanKali = (l: LKali): Satuan => (l.arah === "ke-cm" ? "cm" : l.arah === "ke-m" ? "m" : l.bagian === "meter" ? "m" : "cm");
export const nilaiTabel = (l: LTabel): number => (l.tanya === "cm" ? l.m * 100 : l.m);
export const nilaiPecah = (l: LPecah): number => (l.tanya === "meter" ? hasilPecah(l)[0] : hasilPecah(l)[1]);
export const satuanPecah = (l: LPecah): Satuan => (l.tanya === "meter" ? "m" : "cm");
export const jarakCm = (l: LJarak): number => (l.ke - l.dari) * 100;
/** Nomor (mulai satu) ukuran terpanjang. */
export const nomorTerpanjang = (l: LBanding): number => l.ukuran.indexOf(Math.max(...l.ukuran)) + 1;
export const terpanjang = (l: LBanding): number => Math.max(...l.ukuran);

/** Apakah data satu tugas konsisten dan sesuai batas (ukuran paling panjang 999 cm; jawaban kanvas satu angka dari satu sampai sembilan)? */
export function dataSah(l: LangkahDasar): boolean {
  const antara = (n: number, a: number, b: number) => Number.isInteger(n) && n >= a && n <= b;
  switch (l.tipe) {
    case "kali": {
      if (!antara(l.m, 1, 9) || !antara(l.c, 0, 99)) return false;
      if (l.arah === "ke-m") return l.c === 0 && (l.kanvas === "hilang") && antara(l.m, 1, 9);
      if (l.arah === "pisah") return l.c >= 11 && (l.bagian === "meter" ? l.kanvas === "hilang" : l.kanvas !== "hilang" && l.kanvas !== "ratusan" && antara(ambil(l.c, l.kanvas), 1, 9));
      return l.kanvas !== "hilang" && antara(ambil(totalCm(l.m, l.c), l.kanvas), 1, 9) && (l.suara !== "operasi" || l.c === 0) && (l.kanvas !== "ratusan" || true);
    }
    case "tabel":
      return antara(l.m, 1, 9) && l.dikenal.every((d) => antara(d, 1, 9) && d !== l.m) && l.dikenal[0] !== l.dikenal[1] && (l.tanya === "cm" ? l.kanvas === "ratusan" : l.kanvas === "hilang");
    case "jarak":
      return antara(l.dari, 0, 8) && antara(l.ke, 1, 9) && l.ke > l.dari && antara(l.ke - l.dari, 1, 9) && l.kanvas === "lompat";
    case "banding": {
      const u = l.ukuran;
      const maks = Math.max(...u);
      return u.every((x) => antara(x, 101, 999)) && new Set(u).size === 3 && u.filter((x) => x === maks).length === 1 && u.indexOf(maks) !== 0 && new Set(u.map((x, i) => labelUkuran(x, l.bentuk[i]))).size === 3 && l.bentuk.some((b) => b) && l.kanvas === "nomor";
    }
    case "pecah": {
      const [m, c] = hasilPecah(l);
      const tA = totalCm(l.a[0], l.a[1]);
      const tB = totalCm(l.b[0], l.b[1]);
      const baik = l.a.every((x, i) => antara(x, i === 0 ? 1 : 1, i === 0 ? 9 : 99)) && l.b.every((x, i) => antara(x, 1, i === 0 ? 9 : 99)) && (l.op === "tambah" ? tA + tB <= 999 : tA > tB && m >= 1);
      if (!baik) return false;
      if (l.tanya === "meter") return l.kanvas === "hilang" && antara(m, 1, 9);
      return l.kanvas !== "hilang" && l.kanvas !== "ratusan" && antara(c, 11, 99) && antara(ambil(c, l.kanvas), 1, 9);
    }
  }
}

/* ------------------------------ Kunci ------------------------------ */
export type Kunci = { jenis: "angka"; n: number; satuan: Satuan } | { jenis: "nama"; nama: string };
const angka = (n: number, satuan: Satuan = ""): Kunci => ({ jenis: "angka", n, satuan });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });
export const KATA_OPERASI = ["kali", "bagi", "tambah", "kurang"] as const;

/** Kunci tiap tugas menurut caranya, dihitung dari data. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "kali":
      if (cara === "klik") return angka(nilaiKali(l), satuanKali(l));
      if (cara === "kanvas") return angka(ambil(nilaiKali(l), l.kanvas));
      return l.suara === "operasi" ? nama(l.arah === "ke-cm" ? "kali" : "bagi") : angka(nilaiKali(l), satuanKali(l));
    case "tabel":
      if (cara === "klik") return angka(nilaiTabel(l), l.tanya);
      if (cara === "kanvas") return angka(ambil(nilaiTabel(l), l.kanvas));
      return angka(nilaiTabel(l), l.tanya);
    case "jarak":
      if (cara === "kanvas") return angka(l.ke - l.dari);
      return angka(jarakCm(l), "cm");
    case "banding":
      if (cara === "klik") return angka(terpanjang(l), "cm");
      return angka(nomorTerpanjang(l));
    case "pecah":
      if (cara === "klik") return angka(nilaiPecah(l), satuanPecah(l));
      if (cara === "kanvas") return angka(ambil(nilaiPecah(l), l.kanvas));
      return l.suara === "operasi" ? nama(l.op) : angka(nilaiPecah(l), satuanPecah(l));
  }
}

/** Semua tugas punya kunci, kecuali Cari kesalahan yang memakai kegiatan lebih dulu. Tidak bergantung pada rupa. */
export function siapLangsung(l: Langkah, rupa: Rupa, cara: Cara): boolean {
  void rupa;
  if (l.tipe === "salah") return false;
  return kunciJawab(l, cara) !== null;
}

/** Ukuran yang cocok dengan kunci klik, seperti tampil di pilihan. */
export function labelKlik(l: Langkah): string {
  const d = dasarDari(l);
  const k = kunciJawab(l, "klik");
  if (!k || k.jenis !== "angka") return "";
  if (d.tipe === "banding") return labelUkuran(k.n, d.bentuk[d.ukuran.indexOf(k.n)]);
  return labelBil(k.n, k.satuan);
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBilSatuan(k.n, k.satuan));

/* ------------------------------ Pilihan ------------------------------ */
/** Kesalahan khas tiap tugas (mengalikan sepuluh, tidak menukar, dan sebagainya), dipakai sebagai pengecoh bilangan. */
function ekstraKeliru(l: LangkahDasar): number[] {
  switch (l.tipe) {
    case "kali":
      if (l.arah === "ke-cm") return [l.m * 10 + l.c];
      if (l.arah === "ke-m") return [l.m * 10];
      return l.bagian === "meter" ? [Math.floor(totalCm(l.m, l.c) / 10)] : [totalCm(l.m, l.c) - l.m * 10];
    case "tabel":
      return [l.m * 10];
    case "jarak":
      return [(l.ke - l.dari) * 10, l.ke * 100];
    case "banding":
      return [];
    case "pecah":
      return l.tanya === "meter" ? [l.a[0] + l.b[0], Math.abs(l.a[0] - l.b[0])] : [l.op === "tambah" ? l.a[1] + l.b[1] : Math.abs(l.a[1] - l.b[1])];
  }
}
/** Pengecoh khas untuk bilangan `n`: kesalahan operasi, selisih seratus, sepuluh, atau satu. Berurut, tanpa kembar, 1 sampai 999. */
export function pengecoh(n: number, awal?: number, ekstra: number[] = []): number[] {
  const calon = [awal ?? -1, ...ekstra, n + 100, n - 100, n + 10, n - 10, n + 1, n - 1, n + 2, n - 2];
  const hasil: number[] = [];
  for (const c of calon) if (Number.isInteger(c) && c >= 1 && c <= 999 && c !== n && !hasil.includes(c)) hasil.push(c);
  return hasil;
}
/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisipkan(benar: string, lain: string[], geser: number): string[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}
/** Tiga pilihan untuk tugas klik (ukuran bersatuan): jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const d = dasarDari(l);
  if (d.tipe === "banding") return d.ukuran.map((u, i) => labelUkuran(u, d.bentuk[i]));
  const k = kunciJawab(l, "klik");
  if (!k || k.jenis !== "angka") return [];
  const tokoh = l.tipe === "salah" ? Number.parseInt(l.jawabTokoh, 10) : undefined;
  const [a, b] = pengecoh(k.n, Number.isFinite(tokoh) ? tokoh : undefined, ekstraKeliru(d));
  return sisipkan(labelBil(k.n, k.satuan), [labelBil(a, k.satuan), labelBil(b, k.satuan)], k.n);
}
/** Pilihan cadangan untuk tugas suara (kata atau bilangan dalam kata) dan tugas kanvas berjawaban satu angka. */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k) return [];
  const d = dasarDari(l);
  if (k.jenis === "angka") {
    if (d.tipe === "banding") return sisipkan(kataBil(k.n), [1, 2, 3].filter((x) => x !== k.n).map(kataBil), k.n);
    const lain =
      cara === "kanvas" || k.satuan === ""
        ? [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((x) => x !== k.n && Math.abs(x - k.n) <= 2).slice(0, 2)
        : pengecoh(k.n, undefined, ekstraKeliru(d)).slice(0, 2);
    return sisipkan(kataBilSatuan(k.n, cara === "kanvas" ? "" : k.satuan), lain.map((x) => kataBilSatuan(x, cara === "kanvas" ? "" : k.satuan)), k.n);
  }
  const semua: string[] = k.nama === "tambah" || k.nama === "kurang" ? ["tambah", "kurang", "bagi"] : ["kali", "bagi", "tambah"];
  return sisipkan(k.nama, semua.filter((x) => x !== k.nama), k.nama.length);
}

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : "gambar");
const tempatDigit = (d: Digit): string => (d === "ratusan" ? "ratusan" : d === "puluhan" ? "puluhan" : "satuan");

/** Rumus dan penjelasan setelah jawaban benar (tanpa digit). */
const rumus = (l: LangkahDasar): string => {
  switch (l.tipe) {
    case "kali":
      if (l.arah === "ke-cm") return `Meter ke sentimeter dikalikan dengan seratus: ${kataBil(l.m)} kali seratus sama dengan ${kataBil(l.m * 100)}${l.c > 0 ? `, ditambah ${kataBil(l.c)} sama dengan ${kataBil(totalCm(l.m, l.c))}` : ""} sentimeter.`;
      if (l.arah === "ke-m") return `Sentimeter ke meter dibagi seratus: ${kataBil(l.m * 100)} dibagi seratus sama dengan ${kataBil(l.m)} meter.`;
      return `Tiap seratus sentimeter menjadi satu meter: ${kataBil(totalCm(l.m, l.c))} sentimeter sama dengan ${kataBil(l.m)} meter ${kataBil(l.c)} sentimeter.`;
    case "tabel":
      return l.tanya === "cm" ? `Tiap kolom, meter dikalikan seratus: ${kataBil(l.m)} meter sama dengan ${kataBil(l.m * 100)} sentimeter.` : `Tiap kolom, sentimeter dibagi seratus: ${kataBil(l.m * 100)} sentimeter sama dengan ${kataBil(l.m)} meter.`;
    case "jarak":
      return `Tiap lompatan sepanjang seratus sentimeter. ${kataBil(l.ke - l.dari)} lompatan sama dengan ${kataBil(jarakCm(l))} sentimeter.`;
    case "banding":
      return `Dalam sentimeter ukurannya ${kataBil(l.ukuran[0])}, ${kataBil(l.ukuran[1])}, dan ${kataBil(l.ukuran[2])}. Yang paling jauh dari nol paling panjang, yaitu pita nomor ${kataBil(nomorTerpanjang(l))}.`;
    case "pecah": {
      const [m, c] = hasilPecah(l);
      const awal = l.op === "tambah" ? `Jumlahkan meter dengan meter dan sentimeter dengan sentimeter: ${kataBil(l.a[1])} tambah ${kataBil(l.b[1])} sama dengan ${kataBil(l.a[1] + l.b[1])}.` : `Kurangkan meter dengan meter dan sentimeter dengan sentimeter: ${kataBil(l.a[1])} kurang ${kataBil(l.b[1])}.`;
      const tukar = !adaTukar(l) ? "" : l.op === "tambah" ? " Seratus sentimeter ditukar menjadi satu meter." : " Sentimeternya kurang, jadi pinjam satu meter menjadi seratus sentimeter.";
      return `${awal}${tukar} Hasilnya ${kataMc(m, c)}.`;
    }
  }
};
const aturanKanvas = (l: LangkahDasar, n: number): string => {
  switch (l.tipe) {
    case "kali":
    case "tabel":
    case "pecah": {
      const d = l.kanvas;
      return d === "hilang" ? "" : ` Angka di tempat ${tempatDigit(d)} adalah ${kataBil(n)}.`;
    }
    case "jarak":
      return ` Banyak lompatan ada ${kataBil(n)}.`;
    case "banding":
      return ` Pita terpanjang adalah nomor ${kataBil(n)}.`;
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
  const tulis = "Tulis satu angka di kanvas.";
  switch (l.tipe) {
    case "kali": {
      const dasar = l.arah === "ke-cm" ? `lihat ukuran dalam meter pada ${g} ini` : l.arah === "ke-m" ? `lihat ukuran dalam sentimeter pada ${g} ini` : `lihat ukuran sentimeter pada ${g} ini yang akan ditulis dengan meter dan sentimeter bersama`;
      const pre = `Metode IGIL: ${dasar}.`;
      if (l.arah === "ke-cm") {
        if (cara === "klik") return `${pre} Berapa sentimeternya? Pilih ukurannya.`;
        if (cara === "kanvas") return `${pre} Berapa angka di tempat ${tempatDigit(l.kanvas)} dari ukuran sentimeternya? ${tulis}`;
        return l.suara === "operasi" ? `${pre} Untuk mengubah meter menjadi sentimeter, kita mengalikan atau membagi dengan seratus? Ucapkan satu kata.` : `${pre} Berapa sentimeternya? Ucapkan bilangannya.`;
      }
      if (l.arah === "ke-m") {
        if (cara === "klik") return `${pre} Berapa meternya? Pilih ukurannya.`;
        if (cara === "kanvas") return `${pre} Berapa meternya? ${tulis}`;
        return l.suara === "operasi" ? `${pre} Untuk mengubah sentimeter menjadi meter, kita mengalikan atau membagi dengan seratus? Ucapkan satu kata.` : `${pre} Berapa meternya? Ucapkan bilangannya.`;
      }
      const tanya = l.bagian === "meter" ? "Berapa meternya?" : "Berapa sentimeter sisanya?";
      if (cara === "klik") return `${pre} ${tanya} Pilih ukurannya.`;
      if (cara === "kanvas") return l.bagian === "meter" ? `${pre} ${tanya} ${tulis}` : `${pre} Berapa angka di tempat ${tempatDigit(l.kanvas)} dari sentimeter sisanya? ${tulis}`;
      return l.suara === "operasi" ? `${pre} Untuk mencari banyak meter, kita mengalikan atau membagi dengan seratus? Ucapkan satu kata.` : `${pre} ${tanya} Ucapkan bilangannya.`;
    }
    case "tabel": {
      const pre = `Ratio Table: lihat tabel perbandingan meter dan sentimeter pada ${g} ini.`;
      const tanya = l.tanya === "cm" ? "Berapa sentimeter pada kolom yang kosong?" : "Berapa meter pada kolom yang kosong?";
      if (cara === "klik") return `${pre} ${tanya} Pilih ukurannya.`;
      if (cara === "kanvas") return l.tanya === "cm" ? `${pre} Berapa ratus sentimeter pada kolom yang kosong? ${tulis}` : `${pre} ${tanya} ${tulis}`;
      return `${pre} ${tanya} Ucapkan bilangannya.`;
    }
    case "jarak": {
      const pre = `Number Line: lihat garis bilangan sentimeter pada ${g} ini dengan dua titik yang ditandai.`;
      if (cara === "klik") return `${pre} Berapa sentimeter jarak kedua titik? Pilih ukurannya.`;
      if (cara === "kanvas") return `${pre} Berapa lompatan sepanjang seratus sentimeter dari titik pertama ke titik kedua? ${tulis}`;
      return `${pre} Berapa sentimeter jarak kedua titik? Ucapkan bilangannya.`;
    }
    case "banding": {
      const pre = `Number Line: lihat tiga ukuran pita pada ${g} ini.`;
      if (cara === "klik") return `${pre} Ukuran mana yang paling panjang? Pilih ukurannya.`;
      if (cara === "kanvas") return `${pre} Pita nomor berapa yang paling panjang? ${tulis}`;
      return `${pre} Pita nomor berapa yang paling panjang? Ucapkan nomornya.`;
    }
    case "pecah": {
      const kerja = l.op === "tambah" ? "disambung" : "dikurangi";
      const pre = `Split Strategy: lihat dua ukuran pada ${g} ini yang akan ${kerja}, pecah menjadi bagian meter dan bagian sentimeter.`;
      const tanya = l.tanya === "meter" ? "Berapa meter hasilnya?" : "Berapa sentimeter hasilnya?";
      if (cara === "klik") return `${pre} ${tanya} Pilih ukurannya.`;
      if (cara === "kanvas") return l.tanya === "meter" ? `${pre} ${tanya} ${tulis}` : `${pre} Berapa angka di tempat ${tempatDigit(l.kanvas)} dari sentimeter hasilnya? ${tulis}`;
      return l.suara === "operasi" ? `${pre} Untuk ${l.op === "tambah" ? "menyambung" : "memotong"} pita, kita menambah atau mengurangi? Ucapkan satu kata.` : `${pre} ${tanya} Ucapkan bilangannya.`;
    }
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "kali":
      if (d.arah === "ke-cm") return cara === "klik" ? "Berapa sentimeternya?" : cara === "kanvas" ? `Berapa angka di tempat ${tempatDigit(d.kanvas)} dari ukuran sentimeternya?` : d.suara === "operasi" ? "Mengalikan atau membagi dengan seratus?" : "Berapa sentimeternya?";
      if (d.arah === "ke-m") return cara === "suara" && d.suara === "operasi" ? "Mengalikan atau membagi dengan seratus?" : "Berapa meternya?";
      if (cara === "kanvas" && d.bagian === "cm") return `Berapa angka di tempat ${tempatDigit(d.kanvas)} dari sentimeter sisanya?`;
      return cara === "suara" && d.suara === "operasi" ? "Mengalikan atau membagi dengan seratus?" : d.bagian === "meter" ? "Berapa meternya?" : "Berapa sentimeter sisanya?";
    case "tabel":
      return cara === "kanvas" && d.tanya === "cm" ? "Berapa ratus sentimeter pada kolom yang kosong?" : d.tanya === "cm" ? "Berapa sentimeter pada kolom yang kosong?" : "Berapa meter pada kolom yang kosong?";
    case "jarak":
      return cara === "kanvas" ? "Berapa lompatan sepanjang seratus sentimeter?" : "Berapa sentimeter jarak kedua titik?";
    case "banding":
      return cara === "klik" ? "Ukuran mana yang paling panjang?" : "Pita nomor berapa yang paling panjang?";
    case "pecah":
      if (cara === "suara" && d.suara === "operasi") return "Menambah atau mengurangi?";
      if (cara === "kanvas" && d.tanya === "cm") return `Berapa angka di tempat ${tempatDigit(d.kanvas)} dari sentimeter hasilnya?`;
      return d.tanya === "meter" ? "Berapa meter hasilnya?" : "Berapa sentimeter hasilnya?";
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya (tanpa digit). `jawab`: ukuran, kata, atau bilangan yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "kali":
      if (l.arah === "ke-cm") return cara === "suara" && l.suara === "operasi" ? "Satu meter sama dengan seratus sentimeter, jadi meter ke sentimeter dikalikan seratus." : "Satu meter sama dengan seratus sentimeter. Meter ke sentimeter dikalikan seratus, bukan sepuluh.";
      if (l.arah === "ke-m") return cara === "suara" && l.suara === "operasi" ? "Sentimeter ke meter dibagi seratus, karena seratus sentimeter sama dengan satu meter." : "Sentimeter ke meter dibagi seratus. Cari berapa kali seratus sentimeter ada di dalamnya.";
      return "Tiap seratus sentimeter menjadi satu meter. Ambil dulu banyak meternya, sisanya tetap sentimeter.";
    case "tabel":
      return l.tanya === "cm" ? "Lihat pola tabel: tiap kolom, sentimeter sama dengan meter dikalikan seratus." : "Lihat pola tabel: tiap kolom, meter sama dengan sentimeter dibagi seratus.";
    case "jarak":
      return cara === "kanvas" ? "Satu lompatan sepanjang seratus sentimeter. Hitung banyak lompatan dari titik pertama ke titik kedua." : "Hitung banyak lompatan seratus sentimeter di antara kedua titik, lalu kalikan dengan seratus.";
    case "banding":
      return "Ubah semua ukuran ke sentimeter dulu, lalu lihat mana yang paling jauh dari nol. Satu meter sama dengan seratus sentimeter.";
    case "pecah":
      if (cara === "suara" && l.suara === "operasi") return l.op === "tambah" ? "Menyambung dua pita berarti menjumlahkan: meter dengan meter, sentimeter dengan sentimeter." : "Memotong pita berarti mengurangkan: meter dengan meter, sentimeter dengan sentimeter.";
      if (adaTukar(l)) return l.op === "tambah" ? "Sentimeternya sudah lebih dari seratus. Tukar seratus sentimeter menjadi satu meter, lalu tambahkan ke meternya." : "Sentimeternya kurang. Pinjam satu meter, ubah menjadi seratus sentimeter, lalu kurangkan lagi.";
      return l.op === "tambah" ? "Jumlahkan meter dengan meter dan sentimeter dengan sentimeter, masing-masing sendiri." : "Kurangkan meter dengan meter dan sentimeter dengan sentimeter, masing-masing sendiri.";
  }
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
/** Isi kartu kata untuk tahap Abstract (kata dan angka). */
export function barisKartu(l: LangkahDasar): string[] {
  switch (l.tipe) {
    case "kali":
      if (l.arah === "ke-cm") return [`${labelMc(l.m, l.c)} = … cm`, "1 m = 100 cm"];
      if (l.arah === "ke-m") return [`${totalCm(l.m, 0)} cm = … m`, "1 m = 100 cm"];
      return [`${totalCm(l.m, l.c)} cm = … m … cm`, "1 m = 100 cm"];
    case "tabel": {
      const [a, b] = l.dikenal;
      return [`meter: ${a}, ${b}, ${l.tanya === "m" ? "?" : l.m}`, `sentimeter: ${a * 100}, ${b * 100}, ${l.tanya === "cm" ? "?" : l.m * 100}`];
    }
    case "jarak":
      return [`titik pertama: ${l.dari * 100} cm`, `titik kedua: ${l.ke * 100} cm`, "jarak: ? cm"];
    case "banding":
      return l.ukuran.map((u, i) => `pita ${i + 1}: ${labelUkuran(u, l.bentuk[i])}`);
    case "pecah":
      return [`${labelMc(l.a[0], l.a[1])} ${l.op === "tambah" ? "+" : "−"} ${labelMc(l.b[0], l.b[1])}`, "meter dengan meter, cm dengan cm", "hasil: … m … cm"];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
