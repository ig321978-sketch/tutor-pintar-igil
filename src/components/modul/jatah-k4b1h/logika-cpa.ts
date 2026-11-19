/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 1 Sub-Bab H "Papan Jatah Bu Ratna" (pembagian bilangan sampai seratus oleh satu angka: bagi rata, kurang berulang, bagi susun, sisa),
 * cerita Penginapan Pulau Karang Indah: jenis tugas, jawaban benar, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-jatah-k4b1h.mjs.
 * Jawaban beragam: memilih bilangan (klik), menulis satu angka di kanvas, dan mengucapkan satu kata (habis atau sisa) atau bilangan pendek.
 * Jawaban benar dihitung dari data. Empat metode tiap misi: IGIL "Bagi Rata, Kurang Berulang, Bagi Susun", Equal Sharing (Bagi Rata), Repeated Subtraction (Kurang Berulang), Long Division (Bagi Susun).
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
/** Ubah teks berangka menjadi ucapan tanpa digit: "56 : 4 = 14" menjadi "lima puluh enam dibagi empat sama dengan empat belas". */
export function ucapkan(t: string): string {
  return t
    .replace(/ : /g, " dibagi ")
    .replace(/ [−-] /g, " dikurangi ")
    .replace(/ \+ /g, " ditambah ")
    .replace(/ [×x] /g, " kali ")
    .replace(/ = /g, " sama dengan ")
    .replace(/\d+/g, (d) => ` ${kataBil(Number(d))} `)
    .replace(/\s+/g, " ")
    .trim();
}

/* ------------------------------ Data ------------------------------ */
/** bagi = tugas IGIL (hasil bagi); rata = Equal Sharing; kurang = Repeated Subtraction; susun = Long Division. */
export type Tipe = "bagi" | "rata" | "kurang" | "susun";
/**
 * Yang ditanyakan:
 * hasil = hasil bagi seluruhnya, tiap = banyak benda di tiap wadah, sisa = sisa pembagian, kali = banyak pengurangan sampai habis,
 * q1 = hasil membagi angka puluhan, s1 = sisa dari puluhan, turun = angka satuan yang diturunkan, gabung = bilangan setelah angka satuan diturunkan,
 * q2 = hasil membagi bilangan yang diturunkan, habis = kata "habis" atau "sisa" (hanya suara).
 */
export type Tanya = "hasil" | "tiap" | "sisa" | "kali" | "q1" | "s1" | "turun" | "gabung" | "q2" | "habis";
/** Bilangan yang dibagi `n` (dua angka, 10 sampai 99) dibagi pembagi `d` (satu angka, 2 sampai 9). */
export type LDasar = { tipe: Tipe; benda: string; n: number; d: number; tanya: Tanya };
/** Cari kesalahan: tokoh sudah menjawab dari `dasar`. Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. `jawabTokoh` memakai angka sebagai teks ("7"). */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LDasar;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LDasar | LangkahSalah;
export type Metode = "igil" | "rata" | "kurang" | "susun";
export const URUT_METODE: Metode[] = ["igil", "rata", "kurang", "susun"];
/** Jenis tugas dasar tiap metode. */
export const TIPE_METODE: Record<Metode, Tipe> = { igil: "bagi", rata: "rata", kurang: "kurang", susun: "susun" };
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Bagi Rata, Kurang Berulang, Bagi Susun",
  rata: "Equal Sharing: Bagi Rata",
  kurang: "Repeated Subtraction: Kurang Berulang",
  susun: "Long Division: Bagi Susun",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F522}", rata: "\u{1F9FA}", kurang: "\u{1F501}", susun: "\u{1F4DD}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", rata: "Equal Sharing", kurang: "Repeated Subtraction", susun: "Long Division" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LDasar => (l.tipe === "salah" ? l.dasar : l);

/* ------------------------------ Hitungan ------------------------------ */
export const hasilBagi = (d: { n: number; d: number }): number => Math.floor(d.n / d.d);
export const sisaBagi = (d: { n: number; d: number }): number => d.n % d.d;
/** Angka puluhan dari bilangan yang dibagi. */
export const puluhanDari = (d: { n: number }): number => Math.floor(d.n / 10);
export const satuanDari = (d: { n: number }): number => d.n % 10;
/** Hasil membagi angka puluhan. */
export const hasilPuluhan = (d: { n: number; d: number }): number => Math.floor(puluhanDari(d) / d.d);
/** Sisa dari puluhan: angka puluhan dibagi pembagi. */
export const sisaPuluhan = (d: { n: number; d: number }): number => puluhanDari(d) % d.d;
/** Bilangan setelah angka satuan diturunkan di samping sisa puluhan. */
export const gabungan = (d: { n: number; d: number }): number => sisaPuluhan(d) * 10 + satuanDari(d);
/** Hasil membagi bilangan yang diturunkan. */
export const hasilSatuan = (d: { n: number; d: number }): number => Math.floor(gabungan(d) / d.d);
/** Banyak pengurangan penuh sampai sisa kurang dari pembagi. */
export const banyakKurang = hasilBagi;

/** Angka hasil hitung tugas. Tugas kata (habis atau sisa) tidak punya angka. */
export function angkaTugas(l: LDasar): number | null {
  switch (l.tanya) {
    case "hasil":
    case "tiap":
    case "kali":
      return hasilBagi(l);
    case "sisa":
      return sisaBagi(l);
    case "q1":
      return hasilPuluhan(l);
    case "s1":
      return sisaPuluhan(l);
    case "turun":
      return satuanDari(l);
    case "gabung":
      return gabungan(l);
    case "q2":
      return hasilSatuan(l);
    case "habis":
      return null;
  }
}

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });

/** Jawaban benar tiap tugas, dihitung dari data. Cari kesalahan dijawab sendiri lewat tugas dasarnya. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  void cara;
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  if (l.tanya === "habis") return nama(sisaBagi(l) === 0 ? "habis" : "sisa");
  return angka(angkaTugas(l) ?? 0);
}

/** Apakah tugas langsung siap dijawab? Semua tugas punya jawaban, kecuali Cari kesalahan yang memakai kegiatan lebih dulu. Tidak bergantung pada rupa. */
export function siapLangsung(l: Langkah, rupa: Rupa, cara: Cara): boolean {
  void rupa;
  if (l.tipe === "salah") return false;
  return kunciJawab(l, cara) !== null;
}

/* ------------------------------ Pilihan ------------------------------ */
/** Pengecoh khas untuk jawaban bilangan, menurut yang ditanyakan (kesalahan yang lazim). */
export function pengecoh(l: Langkah, cara: Cara, awal?: number): number[] {
  void cara;
  const d = dasarDari(l);
  const n = angkaTugas(d) ?? 0;
  let khas: number[] = [];
  switch (d.tanya) {
    case "hasil":
      khas = [hasilPuluhan(d) > 0 ? hasilPuluhan(d) : n + 2, n + 1, n - 1, d.n - d.d];
      break;
    case "tiap":
      khas = [d.d, n + 1, n - 1, d.n - d.d];
      break;
    case "kali":
      khas = [d.d, n + 1, n - 1, sisaBagi(d) > 0 ? sisaBagi(d) : n + 2];
      break;
    case "sisa":
      khas = [d.d, hasilBagi(d), n + 1, d.d - n];
      break;
    case "q1":
      khas = [hasilBagi(d), n + 1, n - 1, d.d];
      break;
    case "s1":
      khas = [hasilPuluhan(d), n + 1, d.d, n - 1];
      break;
    case "turun":
      khas = [puluhanDari(d), n + 1, n - 1, sisaPuluhan(d)];
      break;
    case "gabung":
      khas = [sisaPuluhan(d), satuanDari(d), puluhanDari(d), n + 1, n - 1];
      break;
    case "q2":
      khas = [hasilPuluhan(d), n + 1, n - 1, d.d];
      break;
    case "habis":
      break;
  }
  const calon = [awal ?? -1, ...khas, n + 2, n - 2, n + 10];
  const hasil: number[] = [];
  for (const c of calon) if (Number.isInteger(c) && c >= 1 && c <= 99 && c !== n && !hasil.includes(c)) hasil.push(c);
  return hasil;
}
/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisipkan<T>(benar: T, lain: T[], geser: number): T[] {
  const p = 1 + (geser % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}
/** Bilangan dalam jawaban klik tokoh: "7" menjadi 7. */
const angkaDariTeks = (t: string): number => Number(/\d+/.exec(t)?.[0] ?? -1);

/** Tiga pilihan untuk tugas klik: jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k || k.jenis !== "angka") return [];
  const awal = l.tipe === "salah" ? angkaDariTeks(l.jawabTokoh) : undefined;
  const [a, b] = pengecoh(l, "klik", awal);
  return sisipkan(String(k.n), [String(a), String(b)], k.n);
}
/** Pilihan cadangan untuk tugas suara (kata atau bilangan dalam kata). */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k) return [];
  if (k.jenis === "angka") {
    const lain = pengecoh(l, cara).slice(0, 2);
    return sisipkan(kataBil(k.n), lain.map(kataBil), k.n);
  }
  return [k.nama === "habis" ? "sisa" : "habis", k.nama];
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));
/** Teks pilihan klik yang benar (bilangan). */
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
  const bagi = `${kapital(kataBil(d.n))} dibagi ${kataBil(d.d)}`;
  switch (d.tanya) {
    case "hasil":
      return `${bagi} sama dengan ${kataBil(n)}${sisaBagi(d) > 0 ? ` sisa ${kataBil(sisaBagi(d))}` : ""}.`;
    case "tiap":
      return `Dibagi rata ke ${kataBil(d.d)} wadah, tiap wadah mendapat ${kataBil(n)} benda${sisaBagi(d) > 0 ? `, dan tersisa ${kataBil(sisaBagi(d))}` : ""}.`;
    case "sisa":
      return `${bagi} sama dengan ${kataBil(hasilBagi(d))} sisa ${kataBil(n)}, dan sisa selalu lebih kecil daripada pembagi.`;
    case "kali":
      return `${kapital(kataBil(d.n))} dikurangi ${kataBil(d.d)} berulang kali sampai habis atau tersisa kurang dari pembagi, ada ${kataBil(n)} pengurangan, itulah hasil baginya.`;
    case "q1":
      return `Angka puluhan ${kataBil(puluhanDari(d))} dibagi ${kataBil(d.d)} sama dengan ${kataBil(n)}.`;
    case "s1":
      return `Angka puluhan ${kataBil(puluhanDari(d))} dibagi ${kataBil(d.d)} sama dengan ${kataBil(hasilPuluhan(d))}, sisanya ${kataBil(n)}.`;
    case "turun":
      return `Angka satuan dari ${kataBil(d.n)} adalah ${kataBil(n)}, jadi angka itulah yang diturunkan.`;
    case "gabung":
      return `Sisa ${kataBil(sisaPuluhan(d))} puluhan menjadi ${kataBil(sisaPuluhan(d) * 10)} satuan, ditambah angka satuan ${kataBil(satuanDari(d))} sama dengan ${kataBil(n)}.`;
    case "q2":
      return `${kapital(kataBil(gabungan(d)))} dibagi ${kataBil(d.d)} sama dengan ${kataBil(n)}.`;
    case "habis":
      return sisaBagi(d) === 0 ? "Semua benda terbagi sama banyak dan tidak ada yang tersisa, jadi habis." : "Masih ada benda yang tersisa dan tidak cukup untuk satu putaran, jadi ada sisa.";
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  const aw = AWALAN[metode];
  const akhir = cara === "klik" ? "Pilih jawabannya." : cara === "kanvas" ? "Tulis satu angka di kanvas." : l.tanya === "habis" ? "Ucapkan satu kata." : "Ucapkan bilangannya.";
  switch (l.tipe) {
    case "bagi":
      return `${aw}: lihat bilangan dan pembagi pada ${g} ini. Bagilah bilangan itu dengan pembaginya. Berapa hasil baginya? ${akhir}`;
    case "rata":
      if (l.tanya === "habis") return `${aw}: lihat ${g} ini. Benda dibagikan satu per satu, bergiliran, ke semua wadah. Apakah semua benda habis terbagi atau ada sisa? ${akhir}`;
      return l.tanya === "sisa"
        ? `${aw}: lihat ${g} ini. Benda dibagikan satu per satu, bergiliran, ke semua wadah sampai tidak cukup untuk satu putaran. Berapa benda yang tersisa? ${akhir}`
        : `${aw}: lihat ${g} ini. Benda dibagikan satu per satu, bergiliran, ke semua wadah sampai habis. Berapa benda di tiap wadah? ${akhir}`;
    case "kurang":
      return l.tanya === "sisa"
        ? `${aw}: lihat ${g} ini. Bilangan awal dikurangi pembagi berulang kali sampai sisanya kurang dari pembagi. Berapa sisanya? ${akhir}`
        : `${aw}: lihat ${g} ini. Bilangan awal dikurangi pembagi berulang kali sampai habis. Berapa kali pengurangan itu? ${akhir}`;
    case "susun":
      switch (l.tanya) {
        case "q1":
          return `${aw}: lihat ${g} ini. Bagilah dari puluhan. Berapa hasil membagi angka puluhannya? ${akhir}`;
        case "s1":
          return `${aw}: lihat ${g} ini. Bagilah dari puluhan. Berapa sisa dari puluhan setelah dibagi? ${akhir}`;
        case "turun":
          return `${aw}: lihat ${g} ini. Setelah puluhan dibagi, satu angka diturunkan. Angka satuan berapa yang diturunkan? ${akhir}`;
        case "gabung":
          return `${aw}: lihat ${g} ini. Sisa dari puluhan menjadi satuan, lalu angka satuan diturunkan di sampingnya. Bilangan berapa yang dibagi berikutnya? ${akhir}`;
        case "q2":
          return `${aw}: lihat ${g} ini. Setelah angka satuan diturunkan, bilangan baru dibagi lagi. Berapa hasil membagi bilangan baru itu? ${akhir}`;
        default:
          return `${aw}: lihat ${g} ini. Bagilah dari puluhan ke satuan. Berapa hasil baginya seluruhnya? ${akhir}`;
      }
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  void cara;
  const d = dasarDari(l);
  switch (d.tanya) {
    case "hasil":
      return "Berapa hasil baginya?";
    case "tiap":
      return "Berapa benda di tiap wadah?";
    case "sisa":
      return d.tipe === "kurang" ? "Berapa sisanya setelah dikurangi berulang?" : "Berapa benda yang tersisa?";
    case "kali":
      return "Berapa kali pengurangannya?";
    case "q1":
      return "Berapa hasil membagi angka puluhan?";
    case "s1":
      return "Berapa sisa dari puluhan?";
    case "turun":
      return "Angka satuan berapa yang diturunkan?";
    case "gabung":
      return "Bilangan berapa yang dibagi berikutnya?";
    case "q2":
      return "Berapa hasil membagi bilangan baru?";
    case "habis":
      return "Habis atau ada sisa?";
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya (tanpa digit). `jawab`: kata atau bilangan yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tanya) {
    case "hasil":
      return "Bagi dari puluhan ke satuan: bagi angka puluhan, turunkan angka satuan, lalu bagi lagi sampai habis. Jangan berhenti sebelum angka satuan dibagi.";
    case "tiap":
      return "Bagikan satu per satu, bergiliran, ke semua wadah. Banyak benda di satu wadah adalah hasil bagi, bukan banyak wadahnya.";
    case "sisa":
      return l.tipe === "kurang"
        ? "Kurangi bilangan awal dengan pembagi berulang kali. Berhenti ketika sisanya kurang dari pembagi, dan sisa itulah jawabannya."
        : "Sisa adalah benda yang tidak cukup untuk satu putaran penuh, jadi selalu lebih kecil daripada banyak wadah.";
    case "kali":
      return "Hitung berapa kali pembagi dikurangkan sampai bilangan habis. Banyak pengurangan itulah hasil bagi, bukan angka pembaginya.";
    case "q1":
      return "Bagi angka puluhannya saja lebih dulu, dengan pembagi yang tertera. Angka satuan belum ikut dibagi.";
    case "s1":
      return "Sisa dari puluhan didapat dari angka puluhan dikurangi hasil kali pembagi dengan hasil bagi puluhan.";
    case "turun":
      return "Yang diturunkan adalah angka satuan dari bilangan yang dibagi, yaitu angka paling kanan.";
    case "gabung":
      return "Sisa dari puluhan menjadi satuan, lalu angka satuan diturunkan di sampingnya. Baca keduanya sebagai satu bilangan.";
    case "q2":
      return "Bagi bilangan baru hasil penurunan dengan pembagi yang sama, bukan bilangan yang awal.";
    case "habis":
      return "Bandingkan banyak benda dengan kelipatan pembagi. Bila semua benda terpakai ucapkan habis, bila ada yang tersisa ucapkan sisa.";
  }
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
/** Isi kartu kata untuk tahap Abstract (kata dan angka, tanpa emoji). */
export function barisKartu(l: LDasar, cara?: Cara): string[] {
  void cara;
  switch (l.tipe) {
    case "bagi":
      return [`bilangan yang dibagi: ${l.n}`, `pembagi: ${l.d}`, `${l.n} : ${l.d} = ?`];
    case "rata":
      return [`jumlah benda: ${l.n}`, `jumlah wadah: ${l.d}`, "dibagi satu per satu, bergiliran", l.tanya === "sisa" ? "benda yang tersisa: ?" : l.tanya === "habis" ? "habis atau ada sisa?" : "benda di tiap wadah: ?"];
    case "kurang":
      return [`bilangan awal: ${l.n}`, `dikurangi ${l.d} berulang kali`, l.tanya === "sisa" ? "sisa akhir: ?" : "banyak pengurangan: ?"];
    case "susun": {
      const tanya = l.tanya === "q1" ? "hasil puluhan: ?" : l.tanya === "s1" ? "sisa puluhan: ?" : l.tanya === "turun" ? "angka yang diturunkan: ?" : l.tanya === "gabung" ? "bilangan setelah turun: ?" : l.tanya === "q2" ? "hasil satuan: ?" : "hasil bagi: ?";
      return [`bilangan yang dibagi: ${l.n}`, `pembagi: ${l.d}`, "bagi dari puluhan ke satuan", tanya];
    }
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
