/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 5 Bab 2 Sub-Bab B "Dua Lonceng Pak Tarno" (kelipatan persekutuan dan KPK).
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-jadwal-k5b2b.mjs.
 * Jawaban benar DIHITUNG dari bilangan tugas (logika-data.ts): KPK, kelipatan persekutuan, anggota daftar, banyak pertemuan, dan kebenaran pernyataan.
 * Empat metode tiap misi: IGIL "Daftar Keduanya, Cari yang Sama, Bertemu Lagi" (KPK umum), List Both (Daftar Keduanya), Spot the Match (Cari yang Sama),
 * dan Meet Again (Bertemu Lagi). Jawaban: memilih (klik), menulis satu angka 1 sampai 9 di kanvas, dan mengucapkan satu kata (benar, salah, mungkin, atau nama daftar).
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { kataK5B1 } from "../eja-k5b1";
import { SK } from "./skenario";
import { anggotaDaftar, fmt, kaliBersamaLagi, kelipatan, kelipatanPersekutuan, kpk, persekutuan, tulisDaftar } from "./logika-data";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";
export { fmt };

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

/** Nama bilangan dalam kata (tanpa digit). */
export const kata = (n: number): string => kataK5B1(n);

/** Ubah teks berangka menjadi ucapan tanpa digit: "24 detik lagi" menjadi "dua puluh empat detik lagi". Tanpa spasi sebelum tanda baca. */
export function ucapkan(t: string): string {
  return t
    .replace(/\d{1,3}(?:\.\d{3})+|\d+/g, (m) => kata(Number(m.replace(/\./g, ""))))
    .replace(/\s+([.,!?;:])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/* ------------------------------ Jenis tugas ------------------------------ */
type S3 = [string, string, string];
export type Tipe = "kpk" | "kpkSatu" | "klaimKpk" | "persekutuan" | "banyakSama" | "adaDi" | "terkecil" | "kelipatanKe" | "klaimSama" | "bertemu" | "kaliBertemu" | "klaimWaktu";
/**
 * Satu tugas. s = latar (skenario.ts), a dan b (dan c untuk tiga bilangan) = jarak ulang jadwal, w = batas daftar yang ditampilkan
 * (untuk kaliBertemu dan klaimWaktu: lamanya waktu yang ditinjau), n = bilangan yang ditanyakan atau diklaim, pil = tiga pilihan klik.
 */
export type LangkahDasar = { tipe: Tipe; s: string; a: number; b: number; c?: number; w: number; n?: number; pil?: S3 };
/** Tugas yang boleh dibungkus Cari kesalahan (jawaban tokoh adalah salah satu pilihan klik). */
export type DasarSalah = LangkahDasar & { tipe: "kpk" | "persekutuan" | "terkecil" | "bertemu" };
export type LangkahSalah = { tipe: "salah"; dasar: DasarSalah; tokoh: string; kataTokoh: string; jawabTokoh: string; alasan: [string, string, string]; benar: number; betul?: boolean; posisi?: number };
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "daftar" | "sama" | "ulang";
export const URUT_METODE: Metode[] = ["igil", "daftar", "sama", "ulang"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Daftar Keduanya, Cari yang Sama, Bertemu Lagi",
  daftar: "List Both: Daftar Keduanya",
  sama: "Spot the Match: Cari yang Sama",
  ulang: "Meet Again: Bertemu Lagi",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F522}", daftar: "\u{1F4DD}", sama: "\u{1F50D}", ulang: "\u{1F501}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", daftar: "List Both", sama: "Spot the Match", ulang: "Meet Again" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };
export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/** Cara menjawab tiap jenis tugas. */
export const CARA_TIPE: Record<Tipe, Cara> = {
  kpk: "klik",
  kpkSatu: "kanvas",
  klaimKpk: "suara",
  persekutuan: "klik",
  banyakSama: "kanvas",
  adaDi: "suara",
  terkecil: "klik",
  kelipatanKe: "kanvas",
  klaimSama: "suara",
  bertemu: "klik",
  kaliBertemu: "kanvas",
  klaimWaktu: "suara",
};
/** Bilangan-bilangan yang berulang pada tugas (dua atau tiga). */
export const angkaTugas = (d: LangkahDasar): number[] => (d.c === undefined ? [d.a, d.b] : [d.a, d.b, d.c]);
export const KPK_TUGAS = (d: LangkahDasar): number => kpk(angkaTugas(d));
const sat = (d: LangkahDasar): string => SK[d.s].satuan;

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const sebutan = (s: string): Kunci => ({ jenis: "nama", nama: s });
const benarSalah = (b: boolean): Kunci => sebutan(b ? "benar" : "salah");
/** Teks pilihan "bertemu lagi": "24 detik lagi". */
export const teksLagi = (d: LangkahDasar, n: number): string => `${n} ${sat(d)} lagi`;

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari bilangan tugas. null untuk kombinasi yang tidak dipakai. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  if (CARA_TIPE[l.tipe] !== cara) return null;
  const an = angkaTugas(l);
  switch (l.tipe) {
    case "kpk":
    case "terkecil":
      return sebutan(String(kpk(an)));
    case "kpkSatu":
      return angka(kpk(an));
    case "klaimKpk":
      return benarSalah(kpk(an) === l.n);
    case "persekutuan": {
      const umum = (l.pil ?? []).filter((p) => kelipatanPersekutuan(an, Number(p)));
      return umum.length === 1 ? sebutan(umum[0]) : null;
    }
    case "banyakSama":
      return angka(persekutuan(an, l.w).length);
    case "adaDi":
      return sebutan(anggotaDaftar(l.a, l.b, l.n ?? 0));
    case "kelipatanKe":
      return angka(kpk(an) / l.a);
    case "klaimSama":
    case "klaimWaktu":
      return benarSalah(kelipatanPersekutuan(an, l.n ?? 0));
    case "bertemu":
      return sebutan(teksLagi(l, kpk(an)));
    case "kaliBertemu":
      return angka(kaliBersamaLagi(an, l.w));
  }
}
/** Apakah tugas langsung siap dijawab? Semua tugas, kecuali Cari kesalahan. */
export function siapLangsung(l: Langkah, rupa: Rupa, cara: Cara): boolean {
  void rupa;
  if (l.tipe === "salah") return false;
  return kunciJawab(l, cara) !== null;
}

/* ------------------------------ Pilihan ------------------------------ */
/** Pilihan klik: tiga pilihan dari data tugas (jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh pada Cari kesalahan selalu ikut). */
export function pilihanKlik(l: Langkah): string[] {
  const d = dasarDari(l);
  return d.pil ? [...d.pil] : [];
}
const KATA_KLAIM = ["benar", "salah", "mungkin"];
const KATA_DAFTAR = ["pertama", "kedua", "keduanya"];
/** Pilihan cadangan untuk tugas suara (kata): jawaban benar di posisi kedua atau ketiga. */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k || k.jenis !== "nama") return [];
  const d = dasarDari(l);
  const semua = d.tipe === "adaDi" ? KATA_DAFTAR : KATA_KLAIM;
  const lain = semua.filter((x) => x !== k.nama);
  const p = 1 + ((d.a + d.b + (d.n ?? 0)) % 2);
  return [...lain.slice(0, p), k.nama, ...lain.slice(p)];
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kata(k.n));
/** Teks pilihan klik yang benar. */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  if (!k) return null;
  return k.jenis === "nama" ? k.nama : String(k.n);
}
/** Pilihan klik ditampilkan berhuruf awal kapital untuk kata (bilangan dan "24 detik lagi" tetap). */
export const tampilPilihan = (t: string): string => (/^\d/.test(t) ? t : kapital(t));

/* ------------------------------ Kalimat ------------------------------ */
const sebutBidang = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : rupa === "benda" ? "papan jadwal" : "diagram");
/** Awal tiap kalimat berhuruf kapital. */
const kapKal = (t: string): string => t.replace(/(^|[.?!]\s+)([a-z])/g, (_m, a: string, b: string) => a + b.toUpperCase());
/** Konteks tugas: tiap pengulang dan jarak ulangnya. */
export function konteks(d: LangkahDasar): string {
  const S = SK[d.s];
  const an = angkaTugas(d);
  return an.map((x, i) => `${S.nama[i]} ${S.kerja} tiap ${x} ${S.satuan}`).join(", ").replace(/, ([^,]+)$/, ", dan $1");
}
const dan = (an: number[]): string => (an.length === 2 ? `${an[0]} dan ${an[1]}` : `${an.slice(0, -1).join(", ")}, dan ${an[an.length - 1]}`);

export function kalimatKunci(l: Langkah, cara: Cara): string {
  void cara;
  return kapKal(ucapkan(kalimatKunciMentah(l)));
}
function kalimatKunciMentah(l: Langkah): string {
  const d = dasarDari(l);
  const an = angkaTugas(d);
  const K = kpk(an);
  const s = sat(d);
  switch (d.tipe) {
    case "kpk":
      return `Bilangan pertama yang muncul di semua daftar kelipatan ${dan(an)} adalah ${K}, jadi KPK-nya ${K}.`;
    case "kpkSatu":
      return `Kelipatan ${d.a} dan kelipatan ${d.b} pertama kali sama di ${K}, jadi KPK-nya ${K}.`;
    case "klaimKpk":
      return K === d.n ? `KPK ${dan(an)} memang ${K}, bilangan pertama yang ada di kedua daftar kelipatan.` : `KPK ${dan(an)} adalah ${K}, bukan ${d.n}, karena ${K} bilangan pertama yang ada di kedua daftar kelipatan.`;
    case "persekutuan": {
      const n = Number(teksKunciKlik(l));
      return `${n} ada di daftar kelipatan ${d.a} dan di daftar kelipatan ${d.b}, jadi ${n} kelipatan persekutuan.`;
    }
    case "banyakSama":
      return `Sampai ${d.w}, bilangan yang ada di kedua daftar adalah ${tulisDaftar(persekutuan(an, d.w))}, jadi ada ${persekutuan(an, d.w).length} bilangan.`;
    case "adaDi": {
      const a = anggotaDaftar(d.a, d.b, d.n ?? 0);
      const ket = a === "keduanya" ? `${d.n} kelipatan ${d.a} dan juga kelipatan ${d.b}, jadi ada di keduanya.` : a === "pertama" ? `${d.n} hanya kelipatan ${d.a}, jadi hanya ada di daftar pertama.` : `${d.n} hanya kelipatan ${d.b}, jadi hanya ada di daftar kedua.`;
      return ket;
    }
    case "terkecil":
      return `Dari semua kelipatan persekutuan ${dan(an)}, yang paling kecil adalah ${K}, itulah KPK-nya.`;
    case "kelipatanKe":
      return `KPK ${dan(an)} adalah ${K}, yaitu ${K / d.a} kali ${d.a}, jadi kelipatan ke ${K / d.a} dari ${d.a}.`;
    case "klaimSama": {
      const ya = kelipatanPersekutuan(an, d.n ?? 0);
      return ya ? `${d.n} ada di daftar kelipatan ${d.a} dan di daftar kelipatan ${d.b}, jadi pernyataan itu benar.` : `${d.n} tidak ada di kedua daftar kelipatan, jadi bukan kelipatan persekutuan ${dan(an)}.`;
    }
    case "bertemu":
      return `Keduanya bersama lagi sesudah ${K} ${s}, sebanyak KPK ${dan(an)}.`;
    case "kaliBertemu":
      return `KPK ${dan(an)} adalah ${K}, jadi dalam ${d.w} ${s} keduanya bersama lagi pada ${tulisDaftar(persekutuan(an, d.w))}, yaitu ${kaliBersamaLagi(an, d.w)} kali.`;
    case "klaimWaktu": {
      const ya = kelipatanPersekutuan(an, d.n ?? 0);
      return ya ? `${d.n} ${s} kelipatan ${K}, jadi keduanya bersama lagi saat itu.` : `${d.n} bukan kelipatan ${K}, jadi keduanya tidak bersama pada ${d.n} ${s}.`;
    }
  }
}
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  return kapKal(ucapkan(instruksiMentah(l, rupa, cara, metode)));
}
function instruksiMentah(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebutBidang(rupa);
  const aw = AWALAN[metode];
  const an = angkaTugas(l);
  const ko = konteks(l);
  const akhir = cara === "klik" ? "Pilih jawabannya." : cara === "kanvas" ? "Tulis satu angka di kanvas." : "Ucapkan satu kata.";
  const lihat = `${aw}: lihat ${g} ini. ${ko}.`;
  switch (l.tipe) {
    case "kpk":
      return `${lihat} Berapa KPK dari ${dan(an)}? ${akhir}`;
    case "kpkSatu":
      return `${lihat} Berapa KPK dari ${dan(an)}? ${akhir}`;
    case "klaimKpk":
      return `${lihat} Pernyataan: KPK ${dan(an)} adalah ${l.n}. Benar, salah, atau mungkin? ${akhir}`;
    case "persekutuan":
      return `${lihat} Bilangan mana yang ada di kedua daftar kelipatan? ${akhir}`;
    case "banyakSama":
      return `${lihat} Ada berapa bilangan yang sama di kedua daftar sampai ${l.w}? ${akhir}`;
    case "adaDi":
      return `${lihat} Bilangan ${l.n} ada di daftar pertama, daftar kedua, atau keduanya? ${akhir}`;
    case "terkecil":
      return `${lihat} Bilangan mana yang kelipatan persekutuan terkecil dari ${dan(an)}? ${akhir}`;
    case "kelipatanKe":
      return `${lihat} KPK ${dan(an)} adalah kelipatan ke berapa dari ${l.a}? ${akhir}`;
    case "klaimSama":
      return `${lihat} Pernyataan: ${l.n} adalah kelipatan persekutuan ${dan(an)}. Benar, salah, atau mungkin? ${akhir}`;
    case "bertemu":
      return `${lihat} Pada awal keduanya bersama. Kapan keduanya bersama lagi untuk pertama kali? ${akhir}`;
    case "kaliBertemu":
      return `${lihat} Pada awal keduanya bersama. Dalam ${l.w} ${sat(l)}, berapa kali keduanya bersama lagi? ${akhir}`;
    case "klaimWaktu":
      return `${lihat} Pada awal keduanya bersama. Pernyataan: keduanya bersama lagi pada ${l.n} ${sat(l)}. Benar, salah, atau mungkin? ${akhir}`;
  }
}
/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  void cara;
  return kapKal(ucapkan(kalimatTanyaMentah(dasarDari(l))));
}
function kalimatTanyaMentah(d: LangkahDasar): string {
  switch (d.tipe) {
    case "kpk":
    case "kpkSatu":
      return "Berapa KPK-nya?";
    case "klaimKpk":
    case "klaimSama":
    case "klaimWaktu":
      return "Pernyataan itu benar, salah, atau mungkin?";
    case "persekutuan":
      return "Bilangan mana yang ada di kedua daftar?";
    case "banyakSama":
      return "Ada berapa bilangan yang sama di kedua daftar?";
    case "adaDi":
      return "Bilangan itu ada di daftar mana?";
    case "terkecil":
      return "Bilangan mana yang terkecil?";
    case "kelipatanKe":
      return "KPK itu kelipatan ke berapa?";
    case "bertemu":
      return "Kapan keduanya bersama lagi?";
    case "kaliBertemu":
      return "Berapa kali keduanya bersama lagi?";
  }
}
/** Petunjuk saat jawaban salah: mengarahkan tanpa menyebut hasil benar. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. Pikirkan lagi apa yang ${l.tokoh} lakukan.`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "kpk":
    case "kpkSatu":
    case "terkecil":
      return "Tulis kelipatan tiap bilangan, cari bilangan yang sama, lalu ambil yang paling kecil.";
    case "klaimKpk":
      return "Periksa dulu apakah bilangan itu ada di kedua daftar, lalu apakah ada yang lebih kecil.";
    case "persekutuan":
      return "Periksa tiap pilihan: bilangan itu harus ada di daftar pertama dan juga di daftar kedua.";
    case "banyakSama":
      return "Tandai bilangan yang muncul di kedua daftar, lalu hitung tandanya.";
    case "adaDi":
      return "Periksa dulu di daftar pertama, lalu di daftar kedua, dan lihat apakah bilangan itu muncul di salah satu atau keduanya.";
    case "kelipatanKe":
      return "Bagilah KPK dengan bilangan pertama, atau hitung berapa kali bilangan itu dijumlahkan sampai KPK.";
    case "klaimSama":
      return "Periksa bilangan itu di daftar pertama, lalu di daftar kedua.";
    case "bertemu":
      return "Jarak sampai bertemu lagi adalah bilangan pertama yang ada di kedua daftar, bukan salah satu bilangan awal.";
    case "kaliBertemu":
      return "Cari dulu jarak antara dua pertemuan, lalu hitung berapa kali jarak itu muat dalam waktunya.";
    case "klaimWaktu":
      return "Keduanya bersama hanya pada kelipatan jarak pertemuan. Periksa apakah waktu itu termasuk kelipatannya.";
  }
}

/* ------------------------------ Gambar dan kartu ------------------------------ */
/** Batas daftar yang digambar: nilai w tugas (cukup untuk memuat semua bilangan yang ditanyakan). */
export const batasGambar = (d: LangkahDasar): number => d.w;
/** Daftar kelipatan tiap bilangan sampai batas gambar. */
export const daftarTugas = (d: LangkahDasar): number[][] => angkaTugas(d).map((x) => kelipatan(x, batasGambar(d)));
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);

/** Pernyataan yang diklaim (hanya tugas klaim), untuk kartu. */
function klaimTeks(d: LangkahDasar): string {
  const an = angkaTugas(d);
  if (d.tipe === "klaimKpk") return `KPK ${dan(an)} adalah ${d.n}`;
  if (d.tipe === "klaimSama") return `${d.n} kelipatan persekutuan ${dan(an)}`;
  return `keduanya bersama lagi pada ${d.n} ${sat(d)}`;
}
const TANYA: Record<Tipe, string> = {
  kpk: "KPK: ?",
  kpkSatu: "KPK: ?",
  klaimKpk: "pernyataan itu (benar, salah, atau mungkin): ?",
  persekutuan: "bilangan yang ada di kedua daftar: ?",
  banyakSama: "banyak bilangan yang sama di kedua daftar: ?",
  adaDi: "ada di daftar (pertama, kedua, atau keduanya): ?",
  terkecil: "kelipatan persekutuan terkecil: ?",
  kelipatanKe: "KPK adalah kelipatan ke (dari bilangan pertama): ?",
  klaimSama: "pernyataan itu (benar, salah, atau mungkin): ?",
  bertemu: "bersama lagi sesudah: ?",
  kaliBertemu: "banyak pertemuan lagi: ?",
  klaimWaktu: "pernyataan itu (benar, salah, atau mungkin): ?",
};
/** Isi kartu kata untuk tahap Abstract (kata dan angka, tanpa emoji dan tanpa menyebut gambar). Baris terakhir juga menjadi keterangan gambar Concrete dan Pictorial. */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  void cara;
  const S = SK[l.s];
  const an = angkaTugas(l);
  const judul = `kartu jadwal pengelola pasar: ${S.judul.toLowerCase()}`;
  const keadaan = an.map((x, i) => `${S.nama[i]} ${S.kerja} tiap ${x} ${S.satuan}`);
  const daftar = daftarTugas(l).map((d, i) => `kelipatan ${an[i]}: ${tulisDaftar(d)}`);
  const tanya = TANYA[l.tipe];
  const klaim = l.tipe === "klaimKpk" || l.tipe === "klaimSama" || l.tipe === "klaimWaktu" ? [`pernyataan: ${klaimTeks(l)}`] : [];
  const awal = l.tipe === "bertemu" || l.tipe === "kaliBertemu" || l.tipe === "klaimWaktu" ? ["pada awal keduanya bersama"] : [];
  const batas = l.tipe === "kaliBertemu" ? [`lama waktu: ${l.w} ${S.satuan}`] : [];
  const tengah = l.tipe === "adaDi" ? [`bilangan yang diperiksa: ${l.n}`] : [];
  return [judul, ...keadaan, ...awal, ...batas, ...daftar, ...klaim, ...tengah, tanya];
}
/** Keterangan di bawah gambar Concrete dan Pictorial: judul latar dan hal yang dicari. */
export function ketGambar(d: LangkahDasar, cara?: Cara): string[] {
  const kartu = barisKartu(d, cara);
  const S = SK[d.s];
  const tambahan = d.tipe === "klaimKpk" || d.tipe === "klaimSama" || d.tipe === "klaimWaktu" ? [`pernyataan: ${klaimTeks(d)}`] : d.tipe === "adaDi" ? [`bilangan yang diperiksa: ${d.n}`] : [];
  return [`${S.judul} (${S.satuan})`, ...tambahan, kartu[kartu.length - 1]];
}
export const namaPengulang = (d: LangkahDasar): string[] => angkaTugas(d).map((_, i) => SK[d.s].nama[i]);
