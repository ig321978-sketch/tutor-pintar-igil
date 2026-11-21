/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 2 Sub-Bab C "Meja Jahit Kak Sekar" (pecahan yang sama besar: mengalikan atau membagi pembilang dan penyebut dengan bilangan sama, menyederhanakan):
 * jenis tugas, jawaban benar, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-jahit-k4b2c.mjs.
 * Jawaban beragam: memilih pecahan atau alasan (klik), menulis satu angka di kanvas, dan mengucapkan satu kata (sama, besar, kecil) atau bilangan pendek. Jawaban benar dihitung dari data.
 * Empat metode tiap misi: IGIL "Cocokkan Daerah, Kali Bentuk Satu, Bagi Keduanya", Area Model Match (Cocokkan Daerah), Multiply by One (Kali Bentuk Satu), Divide Both (Bagi Keduanya).
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { ejaK4B2, kataBilK4B2 } from "../eja-k4b2";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

/* ------------------------------ Bilangan dan pecahan ------------------------------ */
/** Nama bilangan 0 sampai 9.999 dalam kata (tanpa digit). */
export const kataBil = (n: number): string => kataBilK4B2(n);
export const kata = kataBil;
/** Ubah teks berangka menjadi ucapan tanpa digit: "3/7" menjadi "tiga per tujuh", "2 = 2" menjadi "dua sama dengan dua". */
export const ucapkan = (t: string): string => ejaK4B2(t).replace(/\s+/g, " ").trim();
/** Tulisan pecahan: pec(3, 7) menjadi "3/7". */
export const pec = (p: number, q: number): string => `${p}/${q}`;
export const fpb = (a: number, b: number): number => (b === 0 ? a : fpb(b, a % b));
/** Pecahan paling sederhana dari p/q. */
export const sederhana = (p: number, q: number): [number, number] => {
  const g = fpb(p, q);
  return [p / g, q / g];
};

export type Banding = "sama" | "besar" | "kecil";
export const NAMA_BANDING: readonly Banding[] = ["sama", "besar", "kecil"];
/** Besar pecahan a/b dibanding c/d. */
export const bandingkan = (a: number, b: number, c: number, d: number): Banding => (a * d === c * b ? "sama" : a * d > c * b ? "besar" : "kecil");

/* ------------------------------ Jenis tugas ------------------------------ */
/** IGIL: pecahan p/q menjadi pecahan yang sama besar dengan pembilang dan penyebut dikali m (klik = pecahan, kanvas = pembilang baru, suara = pengali). */
export type LEkuiv = { tipe: "ekuiv"; p: number; q: number; m: number };
/** Area Model Match: kain atas p/q dan kain bawah dibagi r bagian (klik = pecahan arsiran, kanvas = banyak bagian arsiran, suara = sama, besar, atau kecil bila bagian bawah berarsir t). */
export type LDaerah = { tipe: "daerah"; p: number; q: number; r: number; t?: number };
/** Multiply by One: p/q dikali m/m (klik = bentuk satu yang dipakai, kanvas = pengali, suara = penyebut baru). */
export type LKali = { tipe: "kali"; p: number; q: number; m: number };
/** Divide Both: P/Q dibagi d/d (klik = pecahan hasil, kanvas = penyebut hasil, suara = pembilang hasil). */
export type LBagi = { tipe: "bagi"; P: number; Q: number; d: number };
export type LangkahDasar = LEkuiv | LDaerah | LKali | LBagi;
/** Cari kesalahan: tokoh sudah menjawab dari `dasar`. Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. `jawabTokoh` adalah teks pilihan klik tokoh. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LEkuiv;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "daerah" | "kali" | "bagi";
export const URUT_METODE: Metode[] = ["igil", "daerah", "kali", "bagi"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Cocokkan Daerah, Kali Bentuk Satu, Bagi Keduanya",
  daerah: "Area Model Match: Cocokkan Daerah",
  kali: "Multiply by One: Kali Bentuk Satu",
  bagi: "Divide Both: Bagi Keduanya",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F9F5}", daerah: "\u{1F4D0}", kali: "\u{1F380}", bagi: "\u{1F4CF}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", daerah: "Area Model Match", kali: "Multiply by One", bagi: "Divide Both" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/** Pecahan hasil tiap jenis tugas (untuk gambar, kalimat, dan uji). */
export const hasilEkuiv = (l: LEkuiv): [number, number] => [l.p * l.m, l.q * l.m];
export const arsirBawah = (l: LDaerah): number => (l.p * l.r) / l.q;
export const hasilKali = (l: LKali): [number, number] => [l.p * l.m, l.q * l.m];
export const hasilBagi = (l: LBagi): [number, number] => [l.P / l.d, l.Q / l.d];

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari data. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "ekuiv": {
      const [a, b] = hasilEkuiv(l);
      return cara === "klik" ? nama(pec(a, b)) : cara === "kanvas" ? angka(a) : angka(l.m);
    }
    case "daerah":
      return cara === "klik" ? nama(pec(arsirBawah(l), l.r)) : cara === "kanvas" ? angka(arsirBawah(l)) : nama(bandingkan(l.t ?? 0, l.r, l.p, l.q));
    case "kali": {
      const [, b] = hasilKali(l);
      return cara === "klik" ? nama(pec(l.m, l.m)) : cara === "kanvas" ? angka(l.m) : angka(b);
    }
    case "bagi": {
      const [a, b] = hasilBagi(l);
      return cara === "klik" ? nama(pec(a, b)) : cara === "kanvas" ? angka(b) : angka(a);
    }
  }
}

/** Apakah tugas langsung siap dijawab? Semua tugas punya jawaban, kecuali Cari kesalahan yang memakai kegiatan lebih dulu. */
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
const unik = <T,>(daftar: T[], buang: T[]): T[] => daftar.filter((x, i, a) => !buang.includes(x) && a.indexOf(x) === i);
const pembangkit = (d: LangkahDasar): number => (d.tipe === "bagi" ? d.P + d.Q : d.tipe === "daerah" ? d.p + d.r : d.p + d.q + d.m);

/** Dua pecahan keliru untuk tugas klik: salah umum (menambah, hanya satu bagian yang dikali atau dibagi, bentuk satu yang lain). */
function pecahanKeliru(d: LangkahDasar, benar: string, awal?: string): string[] {
  let calon: string[] = [];
  switch (d.tipe) {
    case "ekuiv":
      calon = [pec(d.p + d.m, d.q + d.m), pec(d.p * d.m, d.q), pec(d.p, d.q * d.m), pec(d.p + 1, d.q + 1)];
      break;
    case "daerah": {
      const a = arsirBawah(d);
      calon = [pec(d.p, d.r), pec(a + 1, d.r), pec(d.r - a, d.r), pec(Math.max(1, a - 1), d.r)];
      break;
    }
    case "kali":
      calon = [pec(d.m + 1, d.m + 1), pec(d.m + 2, d.m + 2), d.m > 2 ? pec(d.m - 1, d.m - 1) : pec(d.m, d.m + 1), pec(d.m * 2, d.m * 2)];
      break;
    case "bagi": {
      const [a, b] = hasilBagi(d);
      calon = [pec(a, d.Q), pec(d.P, b), pec(a + 1, b + 1), pec(a, b + 1)];
      break;
    }
  }
  return unik([awal ?? "", ...calon].filter((x) => x !== ""), [benar]).slice(0, 2);
}

/** Tiga pilihan untuk tugas klik: jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k || k.jenis !== "nama") return [];
  const d = dasarDari(l);
  const awal = l.tipe === "salah" && l.jawabTokoh !== k.nama ? l.jawabTokoh : undefined;
  return sisipkan(k.nama, pecahanKeliru(d, k.nama, awal), pembangkit(d));
}
/** Pilihan cadangan untuk tugas suara (kata atau bilangan dalam kata). */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k) return [];
  const d = dasarDari(l);
  if (k.jenis === "nama") return sisipkan(k.nama, NAMA_BANDING.filter((x) => x !== k.nama), pembangkit(d));
  const lain = unik([k.n + 1, k.n - 1, k.n + 2, k.n - 2, k.n + 3], [k.n]).filter((x) => x >= 1 && x <= 30).slice(0, 2);
  return sisipkan(kataBil(k.n), lain.map(kataBil), pembangkit(d));
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));
/** Teks pilihan klik yang benar. */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  return k && k.jenis === "nama" ? k.nama : null;
}

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : "gambar");
const KATA_BANDING: Record<Banding, string> = { sama: "sama besar dengan", besar: "lebih besar dari", kecil: "lebih kecil dari" };

/** Kalimat pembenaran setelah jawaban benar: diawali huruf kapital, tanpa menyebut gambar. */
export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "ekuiv": {
      const [a, b] = hasilEkuiv(d);
      return cara === "klik"
        ? `Pembilang dan penyebut ${pec(d.p, d.q)} sama-sama dikali ${d.m}, jadi pecahan yang sama besar adalah ${pec(a, b)}.`
        : cara === "kanvas"
          ? `Pembilangnya ${d.p} dikali ${d.m}, yaitu ${a}, jadi ${pec(d.p, d.q)} sama besar dengan ${pec(a, b)}.`
          : `Pecahan ${pec(d.p, d.q)} menjadi ${pec(a, b)} dengan mengalikan pembilang dan penyebut dengan ${d.m}.`;
    }
    case "daerah": {
      const a = arsirBawah(d);
      return cara === "klik"
        ? `Kain bawah dibagi ${d.r} bagian, jadi ${pec(a, d.r)} dari kain bawah sama besar dengan ${pec(d.p, d.q)}.`
        : cara === "kanvas"
          ? `Bagian yang diarsir ada ${a} dari ${d.r} bagian, yaitu ${pec(a, d.r)}, sama besar dengan ${pec(d.p, d.q)}.`
          : `Pecahan ${pec(d.t ?? 0, d.r)} ${KATA_BANDING[bandingkan(d.t ?? 0, d.r, d.p, d.q)]} ${pec(d.p, d.q)}, karena ${pec(d.p, d.q)} diubah dengan pengali atau pembagi yang sama menjadi ${pec(a, d.r)}, sehingga penyebutnya sama, yaitu ${d.r}.`;
    }
    case "kali": {
      const [a, b] = hasilKali(d);
      return cara === "klik"
        ? `Pecahan ${pec(d.p, d.q)} dikali ${pec(d.m, d.m)} menjadi ${pec(a, b)}, dan ${pec(d.m, d.m)} besarnya sama dengan satu.`
        : cara === "kanvas"
          ? `Pembilang dan penyebut dikali ${d.m}, jadi bentuk satunya adalah ${pec(d.m, d.m)}.`
          : `Penyebut baru adalah ${d.q} dikali ${d.m}, yaitu ${b}, sehingga ${pec(d.p, d.q)} sama besar dengan ${pec(a, b)}.`;
    }
    case "bagi": {
      const [a, b] = hasilBagi(d);
      return cara === "klik"
        ? `Pecahan ${pec(d.P, d.Q)} dibagi ${d.d} pada pembilang dan penyebut menjadi ${pec(a, b)}.`
        : cara === "kanvas"
          ? `Penyebut ${d.Q} dibagi ${d.d} menjadi ${b}, sehingga hasilnya ${pec(a, b)}.`
          : `Pembilang ${d.P} dibagi ${d.d} menjadi ${a}, sehingga hasilnya ${pec(a, b)}.`;
    }
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  const aw = AWALAN[metode];
  const akhir = cara === "klik" ? "Pilih jawabannya." : cara === "kanvas" ? "Tulis satu angka di kanvas." : "Ucapkan jawabannya.";
  switch (l.tipe) {
    case "ekuiv":
      return cara === "klik"
        ? `${aw}: lihat ${g} ini. Pembilang dan penyebut dikali bilangan yang sama. Pecahan mana yang sama besar? ${akhir}`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. Pembilang dan penyebut dikali bilangan yang sama. Berapa pembilang yang dicari? ${akhir}`
          : `${aw}: lihat ${g} ini. Dua pecahan itu sama besar. Pembilang dan penyebut dikali berapa? ${akhir}`;
    case "daerah":
      return cara === "klik"
        ? `${aw}: lihat ${g} ini. Pecahan apa dari kain bawah yang arsirannya sama besar dengan kain atas? ${akhir}`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. Berapa bagian kain bawah yang harus diarsir supaya sama besar dengan kain atas? ${akhir}`
          : `${aw}: lihat ${g} ini. Dibanding kain atas, arsiran kain bawah sama besar, lebih besar, atau lebih kecil? Ucapkan sama, besar, atau kecil.`;
    case "kali":
      return cara === "klik"
        ? `${aw}: lihat ${g} ini. Pecahan pertama dikali bentuk satu menjadi pecahan kedua. Bentuk satu yang mana? ${akhir}`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. Pecahan pertama dikali bentuk satu menjadi pecahan kedua. Berapa pengalinya? ${akhir}`
          : `${aw}: lihat ${g} ini. Pecahan itu dikali bentuk satu. Berapa penyebut barunya? ${akhir}`;
    case "bagi":
      return cara === "klik"
        ? `${aw}: lihat ${g} ini. Pembilang dan penyebut dibagi bilangan yang sama. Pecahan apa hasilnya? ${akhir}`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. Pembilang dan penyebut dibagi bilangan yang sama. Berapa penyebut hasilnya? ${akhir}`
          : `${aw}: lihat ${g} ini. Pembilang dan penyebut dibagi bilangan yang sama. Berapa pembilang hasilnya? ${akhir}`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "ekuiv":
      return cara === "klik" ? "Pecahan mana yang sama besar?" : cara === "kanvas" ? "Berapa pembilang yang dicari?" : "Dikali berapa?";
    case "daerah":
      return cara === "klik" ? "Pecahan apa dari kain bawah?" : cara === "kanvas" ? "Berapa bagian yang diarsir?" : "Sama, besar, atau kecil?";
    case "kali":
      return cara === "klik" ? "Bentuk satu yang mana?" : cara === "kanvas" ? "Berapa pengalinya?" : "Berapa penyebut barunya?";
    case "bagi":
      return cara === "klik" ? "Pecahan apa hasilnya?" : cara === "kanvas" ? "Berapa penyebut hasilnya?" : "Berapa pembilang hasilnya?";
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya tanpa membocorkan jawaban (tanpa digit). `jawab`: kata atau pecahan yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "ekuiv":
      return cara === "klik"
        ? "Pembilang dan penyebut harus dikali dengan bilangan yang sama. Periksa kedua angkanya, jangan hanya satu."
        : cara === "kanvas"
          ? "Cari dulu penyebut lama dikali berapa menjadi penyebut baru. Pembilang dikali bilangan yang sama."
          : "Bandingkan penyebut lama dengan penyebut baru. Penyebut lama dikali berapa menjadi penyebut baru?";
    case "daerah":
      return cara === "klik"
        ? "Kain bawah punya bagian yang lebih banyak, jadi bagian arsirannya juga lebih banyak dengan perbandingan yang sama."
        : cara === "kanvas"
          ? "Cari dulu penyebut lama dikali berapa menjadi banyak bagian kain bawah. Banyak arsiran dikali bilangan yang sama."
          : "Samakan dulu penyebut kedua kain, lalu bandingkan banyak bagian yang diarsir.";
    case "kali":
      return cara === "klik"
        ? "Bentuk satu punya pembilang dan penyebut yang sama. Cari bilangan yang mengalikan penyebut lama menjadi penyebut baru."
        : cara === "kanvas"
          ? "Pembilang dan penyebut dikali bilangan yang sama. Bandingkan penyebut lama dan baru untuk menemukannya."
          : "Penyebut baru adalah penyebut lama dikali bilangan yang sama dengan pengali pembilang.";
    case "bagi":
      return cara === "klik"
        ? "Bagi pembilang dan penyebut dengan bilangan yang sama. Jangan lupa membagi keduanya."
        : cara === "kanvas"
          ? "Bagi penyebut lama dengan bilangan yang sama dengan pembagi pembilang."
          : "Bagi pembilang lama dengan bilangan yang sama dengan pembagi penyebut.";
  }
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
/** Isi kartu kata untuk tahap Abstract (kata dan angka, tanpa emoji dan tanpa menyebut gambar). */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  switch (l.tipe) {
    case "ekuiv": {
      const [a, b] = hasilEkuiv(l);
      return cara === "klik"
        ? [`pecahan: ${pec(l.p, l.q)}`, `pembilang dan penyebut dikali ${l.m}`, "pecahan yang sama besar: ?"]
        : cara === "kanvas"
          ? [`${pec(l.p, l.q)} = ?/${b}`, "pembilang dan penyebut dikali bilangan sama", "pembilang yang dicari: ?"]
          : [`${pec(l.p, l.q)} = ${pec(a, b)}`, "pembilang dan penyebut dikali bilangan sama", "dikali berapa: ?"];
    }
    case "daerah":
      return cara === "klik"
        ? [`kain atas: ${pec(l.p, l.q)}`, `kain bawah dibagi ${l.r} bagian`, "pecahan arsiran kain bawah: ?"]
        : cara === "kanvas"
          ? [`kain atas: ${pec(l.p, l.q)}`, `kain bawah dibagi ${l.r} bagian`, "bagian yang diarsir di kain bawah: ?"]
          : [`kain atas: ${pec(l.p, l.q)}`, `kain bawah: ${pec(l.t ?? 0, l.r)}`, "arsiran kain bawah dibanding kain atas: ?"];
    case "kali": {
      const [a, b] = hasilKali(l);
      return cara === "klik"
        ? [`${pec(l.p, l.q)} menjadi ${pec(a, b)}`, "dikali bentuk satu", "bentuk satu yang dipakai: ?"]
        : cara === "kanvas"
          ? [`${pec(l.p, l.q)} menjadi ${pec(a, b)}`, "pembilang dan penyebut dikali bilangan sama", "bilangan pengali: ?"]
          : [`${pec(l.p, l.q)} dikali ${pec(l.m, l.m)}`, `pembilang baru: ${a}`, "penyebut baru: ?"];
    }
    case "bagi": {
      const [a, b] = hasilBagi(l);
      return cara === "klik"
        ? [`${pec(l.P, l.Q)} dibagi ${pec(l.d, l.d)}`, "pembilang dan penyebut dibagi bilangan sama", "pecahan hasil: ?"]
        : cara === "kanvas"
          ? [`${pec(l.P, l.Q)} dibagi ${pec(l.d, l.d)}`, `pembilang hasil: ${a}`, "penyebut hasil: ?"]
          : [`${pec(l.P, l.Q)} dibagi ${pec(l.d, l.d)}`, `penyebut hasil: ${b}`, "pembilang hasil: ?"];
    }
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
