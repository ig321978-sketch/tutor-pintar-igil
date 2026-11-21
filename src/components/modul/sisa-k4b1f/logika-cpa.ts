/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 1 Sub-Bab F "Papan Sisa Pak Usman" (pengurangan bersusun sampai seribu: dari satuan ke kiri, mengambil, hitung maju, periksa dengan tambah):
 * jenis tugas, jawaban benar, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-sisa-k4b1f.mjs.
 * Jawaban beragam: memilih bilangan atau nama tempat angka (klik), menulis satu angka di kanvas, dan mengucapkan bilangan pendek atau satu kata (satuan, puluhan, ratusan, sama, berbeda).
 * Jawaban benar dihitung dari data. Empat metode tiap misi: IGIL "Susun dan Pinjam, Hitung Maju, Periksa dengan Tambah", Column Subtract (Susun dan Pinjam), Count Up (Hitung Maju), Add Check (Periksa dengan Tambah).
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
/** Ubah teks berangka menjadi ucapan tanpa digit: "612 − 275 = 337" menjadi "enam ratus dua belas dikurangi dua ratus tujuh puluh lima sama dengan tiga ratus tiga puluh tujuh". */
export function ucapkan(t: string): string {
  return t
    .replace(/ [−-] /g, " dikurangi ")
    .replace(/ \+ /g, " ditambah ")
    .replace(/ = /g, " sama dengan ")
    .replace(/\d+/g, (d) => ` ${kataBil(Number(d))} `)
    .replace(/\s+/g, " ")
    .trim();
}

/* ------------------------------ Tempat angka dan hitungan ------------------------------ */
export type Tempat = "satuan" | "puluhan" | "ratusan";
/** Urutan dari satuan ke kiri: indeks 0 satuan, 1 puluhan, 2 ratusan. */
export const URUT_TEMPAT: Tempat[] = ["satuan", "puluhan", "ratusan"];
/** Angka bilangan `n` pada tempat `t` (n sampai 999). */
export const angkaDi = (n: number, t: Tempat): number => (t === "satuan" ? n % 10 : t === "puluhan" ? Math.floor(n / 10) % 10 : Math.floor(n / 100));
const digitAsc = (n: number): number[] => [angkaDi(n, "satuan"), angkaDi(n, "puluhan"), angkaDi(n, "ratusan")];
export const hasilKurang = (a: number, b: number): number => a - b;
/** Uraian bilangan ke ratusan, puluhan, satuan (hanya bagian yang bukan nol): 265 menjadi "200 + 60 + 5". */
export const uraian = (n: number): string => [angkaDi(n, "ratusan") * 100, angkaDi(n, "puluhan") * 10, angkaDi(n, "satuan")].filter((v) => v > 0).join(" + ");
/** Uraian dalam kata (tanpa digit): "dua ratus ditambah enam puluh ditambah lima". */
export const uraianKata = (n: number): string => [angkaDi(n, "ratusan") * 100, angkaDi(n, "puluhan") * 10, angkaDi(n, "satuan")].filter((v) => v > 0).map(kataBil).join(" ditambah ");
/** Banyak kali mengambil dalam kata: "tanpa mengambil", "satu kali mengambil", "dua kali mengambil". */
export const kataAmbil = (a: number, b: number): string => {
  const m = tempatAmbil(a, b).filter(Boolean).length;
  return m === 0 ? "tanpa mengambil" : m === 1 ? "satu kali mengambil" : "dua kali mengambil";
};
/** Tempat yang harus mengambil dari tempat di kirinya (dari satuan ke kiri, memperhitungkan angka yang sudah diambil): indeks 0 satuan sampai 2 ratusan. */
export function tempatAmbil(a: number, b: number): boolean[] {
  const da = digitAsc(a);
  const db = digitAsc(b);
  let pinjam = 0;
  return [0, 1, 2].map((i) => {
    const ambil = da[i] - pinjam < db[i];
    pinjam = ambil ? 1 : 0;
    return ambil;
  });
}
export const banyakAmbil = (a: number, b: number): number => tempatAmbil(a, b).filter(Boolean).length;
/** Tempat pertama (dari satuan ke kiri) yang harus mengambil, atau null bila tidak ada. */
export const ambilPertama = (a: number, b: number): Tempat | null => {
  const i = tempatAmbil(a, b).indexOf(true);
  return i < 0 ? null : URUT_TEMPAT[i];
};
/** Kesalahan Satria: tiap tempat dikurangi dengan menaruh angka besar di atas angka kecil (tanpa mengambil). */
export function hasilTukar(a: number, b: number): number {
  const da = digitAsc(a);
  const db = digitAsc(b);
  return [0, 1, 2].reduce((t, i) => t + Math.abs(da[i] - db[i]) * 10 ** i, 0);
}
/** Kesalahan lupa mengurangi tempat yang sudah diambil: hasil benar ditambah sepuluh pangkat tempat kiri tiap kali mengambil. */
export function hasilLupa(a: number, b: number): number {
  return tempatAmbil(a, b).reduce((t, m, i) => t + (m ? 10 ** (i + 1) : 0), a - b);
}
/** Titik hitung maju: dari b ke puluhan bulat berikutnya, ke ratusan bulat bila masih di bawah a (atau puluhan bulat milik a), lalu ke a. */
export function ruteMaju(a: number, b: number): number[] {
  const titik = [b];
  let p = b;
  const t = Math.ceil(b / 10) * 10;
  if (t > p && t <= a) {
    titik.push(t);
    p = t;
  }
  const h = Math.ceil(p / 100) * 100;
  if (h > p && h <= a) {
    titik.push(h);
    p = h;
  } else {
    const f = Math.floor(a / 10) * 10;
    if (f > p) {
      titik.push(f);
      p = f;
    }
  }
  if (a > p) titik.push(a);
  return titik;
}
export const lompatMaju = (a: number, b: number): number[] => {
  const r = ruteMaju(a, b);
  return r.slice(1).map((v, i) => v - r[i]);
};
/** Lompatan pertama: sampai puluhan bulat berikutnya (satu sampai sembilan). */
export const lompatPertama = (b: number): number => (b % 10 === 0 ? 0 : 10 - (b % 10));

/* ------------------------------ Jenis tugas ------------------------------ */
/** Column Subtract: a dikurangi b bersusun; `tempat` = tempat angka hasil yang ditanyakan pada tugas kanvas. */
export type LSusun = { tipe: "susun"; benda: string; a: number; b: number; tempat: Tempat; /** Susun panjang: kedua bilangan ditampilkan terurai (265 = 200 + 60 + 5) dan dikurangkan tiap tempat. Tanpa tanda: susun pendek. */ panjang?: boolean };
/** Tempat angka yang harus mengambil: yang pertama (klik dan suara) atau banyaknya (kanvas). */
export type LAmbil = { tipe: "ambil"; benda: string; a: number; b: number };
/** Count Up: hitung maju dari b sampai a; selisih (klik dan suara) atau lompatan pertama (kanvas). */
export type LMaju = { tipe: "maju"; benda: string; a: number; b: number };
/** Add Check: hasil yang dicatat (`klaim`) ditambah b dibandingkan dengan a. */
export type LCek = { tipe: "cek"; benda: string; a: number; b: number; klaim: number; tempat: Tempat };
export type LangkahDasar = LSusun | LAmbil | LMaju | LCek;
/** Cari kesalahan: tokoh sudah menjawab dari `dasar`. Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. `jawabTokoh` memakai angka sebagai teks ("335"). */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LSusun | LCek;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "susun" | "maju" | "cek";
export const URUT_METODE: Metode[] = ["igil", "susun", "maju", "cek"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Susun dan Pinjam, Hitung Maju, Periksa dengan Tambah",
  susun: "Column Subtract: Susun dan Pinjam",
  maju: "Count Up: Hitung Maju",
  cek: "Add Check: Periksa dengan Tambah",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F522}", susun: "\u{1F4DD}", maju: "\u{27A1}", cek: "\u{2705}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", susun: "Column Subtract", maju: "Count Up", cek: "Add Check" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/** Angka hasil hitung tugas menurut caranya; null bila jawabannya kata (nama tempat angka, sama atau berbeda). */
export function angkaTugas(l: LangkahDasar, cara?: Cara): number | null {
  switch (l.tipe) {
    case "susun":
      return cara === "kanvas" ? angkaDi(l.a - l.b, l.tempat) : l.a - l.b;
    case "ambil":
      return cara === "kanvas" ? banyakAmbil(l.a, l.b) : null;
    case "maju":
      return cara === "kanvas" ? lompatPertama(l.b) : l.a - l.b;
    case "cek":
      return cara === "kanvas" ? angkaDi(l.a - l.b, l.tempat) : cara === "suara" ? null : l.klaim + l.b;
  }
}

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari data. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "ambil":
      return cara === "kanvas" ? angka(banyakAmbil(l.a, l.b)) : nama(ambilPertama(l.a, l.b) ?? "satuan");
    case "cek":
      return cara === "suara" ? nama(l.klaim + l.b === l.a ? "sama" : "berbeda") : angka(angkaTugas(l, cara) ?? 0);
    default:
      return angka(angkaTugas(l, cara) ?? 0);
  }
}

/** Apakah tugas langsung siap dijawab? Semua tugas punya jawaban, kecuali Cari kesalahan yang memakai kegiatan lebih dulu. */
export function siapLangsung(l: Langkah, rupa: Rupa, cara: Cara): boolean {
  void rupa;
  if (l.tipe === "salah") return false;
  return kunciJawab(l, cara) !== null;
}

/* ------------------------------ Pilihan ------------------------------ */
const NAMA_PILIHAN_TEMPAT: string[] = ["satuan", "puluhan", "ratusan"];
/** Pengecoh khas untuk jawaban bilangan, menurut jenis tugas (kesalahan yang lazim). */
export function pengecoh(l: Langkah, cara: Cara, awal?: number): number[] {
  const d = dasarDari(l);
  const n = angkaTugas(d, cara) ?? 0;
  let khas: number[] = [];
  switch (d.tipe) {
    case "susun":
      khas = [hasilTukar(d.a, d.b), hasilLupa(d.a, d.b)];
      break;
    case "maju": {
      const j = lompatMaju(d.a, d.b);
      khas = [n - j[0], n + 10, n - 10];
      break;
    }
    case "cek":
      khas = cara === "kanvas" ? [] : [d.a, d.klaim, n + 10, n - 10];
      break;
    case "ambil":
      khas = [];
      break;
  }
  const calon = [awal ?? -1, ...khas, n + 1, n - 1, n + 10, n - 10, n + 2];
  const hasil: number[] = [];
  for (const c of calon) if (Number.isInteger(c) && c >= 1 && c <= 999 && c !== n && !hasil.includes(c)) hasil.push(c);
  return hasil;
}
/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisipkan<T>(benar: T, lain: T[], geser: number): T[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}
/** Bilangan dalam jawaban klik tokoh: "335" menjadi 335. */
const angkaDariTeks = (t: string): number => Number(/\d+/.exec(t)?.[0] ?? -1);

/** Tiga pilihan untuk tugas klik: jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k) return [];
  if (k.jenis === "nama") {
    const lain = NAMA_PILIHAN_TEKS(k.nama);
    const d = dasarDari(l);
    return sisipkan(k.nama, lain, d.tipe === "ambil" ? d.a + d.b : 0);
  }
  const awal = l.tipe === "salah" ? angkaDariTeks(l.jawabTokoh) : undefined;
  const [a, b] = pengecoh(l, "klik", awal);
  return sisipkan(String(k.n), [String(a), String(b)], k.n);
}
/** Dua nama tempat angka selain jawaban benar. */
const NAMA_PILIHAN_TEKS = (benar: string): string[] => NAMA_PILIHAN_TEMPAT.filter((x) => x !== benar);
/** Pilihan cadangan untuk tugas suara (kata atau bilangan dalam kata). */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k) return [];
  if (k.jenis === "angka") {
    const lain = pengecoh(l, cara).slice(0, 2);
    return sisipkan(kataBil(k.n), lain.map(kataBil), k.n);
  }
  if (NAMA_PILIHAN_TEMPAT.includes(k.nama)) {
    const d = dasarDari(l);
    return sisipkan(k.nama, NAMA_PILIHAN_TEKS(k.nama), d.tipe === "ambil" ? d.a : 1);
  }
  const pasangan = k.nama === "sama" ? "berbeda" : "sama";
  return [pasangan, k.nama];
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));
/** Teks pilihan klik yang benar (bilangan atau nama tempat angka). */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  if (!k) return null;
  return k.jenis === "nama" ? k.nama : String(k.n);
}

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : "gambar");

export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  const k = kunciJawab(d, cara);
  const n = k?.jenis === "angka" ? k.n : 0;
  switch (d.tipe) {
    case "susun": {
      const sisa = d.a - d.b;
      if (cara === "kanvas") return `Dikurangkan dari satuan ke kiri, hasilnya ${kataBil(sisa)}, dan angka di tempat ${d.tempat} adalah ${kataBil(n)}.`;
      const m = banyakAmbil(d.a, d.b);
      if (d.panjang)
        return `Susun panjang: ${kataBil(d.a)} menjadi ${uraianKata(d.a)}, dan ${kataBil(d.b)} menjadi ${uraianKata(d.b)}. Dikurangkan tiap tempat, hasilnya ${kataBil(sisa)}, ${kataAmbil(d.a, d.b)}.`;
      return `${kapital(kataBil(d.a))} dikurangi ${kataBil(d.b)} sama dengan ${kataBil(sisa)}${m === 0 ? ", tanpa mengambil" : m === 1 ? ", dengan satu kali mengambil" : ", dengan dua kali mengambil"}.`;
    }
    case "ambil": {
      const m = banyakAmbil(d.a, d.b);
      return cara === "kanvas" ? `Ada ${kataBil(n)} tempat angka yang harus mengambil dari tempat di kirinya.` : `Tempat ${ambilPertama(d.a, d.b)} yang pertama harus mengambil, karena angka di atasnya lebih kecil daripada angka di bawahnya${m > 1 ? ", dan tempat di kirinya juga mengambil" : ""}.`;
    }
    case "maju": {
      const j = lompatMaju(d.a, d.b);
      return cara === "kanvas"
        ? `Dari ${kataBil(d.b)} lompatan pertama sampai puluhan bulat berikutnya adalah ${kataBil(n)}.`
        : `Lompatannya ${j.map(kataBil).join(", ")}, dan jumlahnya ${kataBil(d.a - d.b)}, itulah selisih ${kataBil(d.a)} dan ${kataBil(d.b)}.`;
    }
    case "cek":
      if (cara === "klik") return `Hasil yang dicatat ${kataBil(d.klaim)} ditambah ${kataBil(d.b)} sama dengan ${kataBil(n)}.`;
      if (cara === "kanvas") return `Hasil pengurangan yang sebenarnya adalah ${kataBil(d.a - d.b)}, dan angka di tempat ${d.tempat} adalah ${kataBil(n)}.`;
      return d.klaim + d.b === d.a
        ? "Hasil penjumlahan sama dengan bilangan awal, jadi hasil pengurangan yang dicatat benar."
        : "Hasil penjumlahan berbeda dari bilangan awal, jadi hasil pengurangan yang dicatat keliru dan harus dihitung ulang.";
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  const aw = AWALAN[metode];
  const akhir = cara === "klik" ? "Pilih jawabannya." : cara === "kanvas" ? "Tulis satu angka di kanvas." : "Ucapkan jawabannya.";
  switch (l.tipe) {
    case "susun":
      if (l.panjang)
        return cara === "kanvas"
          ? `${aw}: susun panjang pada ${g} ini menguraikan kedua bilangan. Kurangkan tiap tempat dari satuan ke kiri, dan ambil dari tempat di kiri bila perlu. Berapa angka di tempat ${l.tempat} hasilnya? ${akhir}`
          : `${aw}: susun panjang pada ${g} ini menguraikan kedua bilangan. Kurangkan tiap tempat dari satuan ke kiri, dan ambil dari tempat di kiri bila perlu. Berapa hasilnya? ${akhir}`;
      return cara === "kanvas"
        ? `${aw}: lihat pengurangan pada ${g} ini. Kurangkan dari satuan ke kiri, dan ambil dari tempat di kiri bila perlu. Berapa angka di tempat ${l.tempat} hasilnya? ${akhir}`
        : `${aw}: lihat pengurangan pada ${g} ini. Kurangkan dari satuan ke kiri, dan ambil dari tempat di kiri bila perlu. Berapa hasilnya? ${akhir}`;
    case "ambil":
      return cara === "kanvas"
        ? `${aw}: lihat pengurangan pada ${g} ini. Ada berapa tempat angka yang harus mengambil dari tempat di kirinya? ${akhir}`
        : `${aw}: lihat pengurangan pada ${g} ini. Mulai dari satuan, tempat angka mana yang pertama harus mengambil dari tempat di kirinya? ${cara === "klik" ? akhir : "Ucapkan nama tempat angkanya."}`;
    case "maju":
      return cara === "kanvas"
        ? `${aw}: lihat garis ${g} ini. Hitung maju dari bilangan yang kecil. Berapa lompatan pertama sampai puluhan bulat berikutnya? ${akhir}`
        : `${aw}: lihat garis ${g} ini. Hitung maju dari bilangan yang kecil sampai bilangan yang besar. Berapa selisihnya? ${akhir}`;
    case "cek":
      if (cara === "klik") return `${aw}: ${g} ini mencatat bilangan awal, bilangan yang dikurangkan, dan hasil yang dicatat. Tambahkan hasil yang dicatat dengan bilangan yang dikurangkan. Berapa hasilnya? ${akhir}`;
      if (cara === "kanvas") return `${aw}: hasil yang dicatat pada ${g} ini belum tentu benar. Hitung hasil pengurangan yang sebenarnya, lalu cari angka di tempat ${l.tempat}. ${akhir}`;
      return `${aw}: hasil yang dicatat ditambah bilangan yang dikurangkan pada ${g} ini. Apakah hasilnya sama atau berbeda dengan bilangan awal? Ucapkan satu kata.`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "susun":
      return cara === "kanvas" ? `Berapa angka di tempat ${d.tempat} hasilnya?` : "Berapa hasil pengurangannya?";
    case "ambil":
      return cara === "kanvas" ? "Ada berapa tempat angka yang harus mengambil?" : "Tempat angka mana yang pertama harus mengambil?";
    case "maju":
      return cara === "kanvas" ? "Berapa lompatan pertama?" : "Berapa selisihnya?";
    case "cek":
      return cara === "klik" ? "Berapa hasil yang dicatat ditambah bilangan yang dikurangkan?" : cara === "kanvas" ? `Berapa angka di tempat ${d.tempat} hasil yang sebenarnya?` : "Sama atau berbeda dengan bilangan awal?";
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya (tanpa digit). `jawab`: kata atau bilangan yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "susun":
      if (l.panjang) return "Uraikan tiap bilangan menjadi ratusan, puluhan, dan satuan, lalu kurangkan tiap tempat dari satuan ke kiri. Kalau satuan atas lebih kecil, ambil satu puluhan dan tambahkan sepuluh ke satuan.";
      return cara === "kanvas"
        ? "Kurangkan dari satuan ke arah kiri. Kalau angka di atas lebih kecil, ambil satu dari tempat di kirinya, lalu coret dan tulis angka barunya."
        : "Jangan membalik angka. Kalau angka di atas lebih kecil, ambil satu dari tempat di kirinya, dan tempat yang diambil tinggal satu lebih kecil.";
    case "ambil":
      return cara === "kanvas"
        ? "Periksa tiap tempat angka dari satuan ke kiri. Hitung tempat yang angka atasnya lebih kecil daripada angka bawahnya, termasuk setelah ada yang diambil."
        : "Mulai dari satuan. Bandingkan angka atas dengan angka bawah, dan cari tempat pertama yang angka atasnya lebih kecil.";
    case "maju":
      return cara === "kanvas"
        ? "Lompatan pertama sampai puluhan bulat berikutnya. Lihat angka satuan bilangan yang kecil, lalu hitung berapa lagi supaya menjadi sepuluh."
        : "Jumlahkan semua lompatan dari bilangan yang kecil sampai bilangan yang besar: ke puluhan bulat, ke ratusan bulat, lalu sampai tujuan.";
    case "cek":
      return cara === "klik"
        ? "Tambahkan hasil yang dicatat dengan bilangan yang dikurangkan, lalu pilih hasilnya."
        : cara === "kanvas"
          ? "Hitung dulu hasil pengurangan yang sebenarnya, bilangan awal dikurangi bilangan yang dikurangkan. Lalu lihat angka di tempat yang diminta."
          : "Bandingkan hasil penjumlahan dengan bilangan awal. Bila sama ucapkan sama, bila tidak ucapkan berbeda.";
  }
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
/** Isi kartu kata untuk tahap Abstract (kata dan angka, tanpa emoji). */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  switch (l.tipe) {
    case "susun":
      return [`bilangan awal: ${l.a}`, `dikurangkan: ${l.b}`, cara === "kanvas" ? `angka di tempat ${l.tempat} hasilnya: ?` : "hasil pengurangan: ?"];
    case "ambil":
      return [`bilangan awal: ${l.a}`, `dikurangkan: ${l.b}`, cara === "kanvas" ? "banyak tempat yang mengambil: ?" : "tempat pertama yang mengambil: ?"];
    case "maju":
      return [`dari: ${l.b}`, `sampai: ${l.a}`, cara === "kanvas" ? "lompatan pertama ke puluhan bulat: ?" : "selisih: ?"];
    case "cek":
      return [`bilangan awal: ${l.a}`, `dikurangkan: ${l.b}`, `hasil dicatat: ${l.klaim}`, cara === "klik" ? "hasil dicatat + dikurangkan = ?" : cara === "kanvas" ? `angka di tempat ${l.tempat} hasil sebenarnya: ?` : "hasilnya: sama atau berbeda?"];
  }
}
/** Hitung susun tertulis (Abstract): tiga baris teks rata kanan. */
export function barisSusun(l: LangkahDasar): string[] {
  const lebar = (n: number): string => String(n).padStart(4, " ");
  if (l.tipe === "cek") return [` ${lebar(l.klaim)}`, `+${lebar(l.b)}`, "-----"];
  if (l.tipe === "maju") return [];
  if (l.tipe === "susun" && l.panjang) {
    const u = [`  ${l.a} = ${uraian(l.a)}`, `− ${l.b} = ${uraian(l.b)}`];
    return [...u, "-".repeat(Math.max(...u.map((x) => x.length)))];
  }
  return [` ${lebar(l.a)}`, `−${lebar(l.b)}`, "-----"];
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
