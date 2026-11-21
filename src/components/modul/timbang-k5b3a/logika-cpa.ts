/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 5 Bab 3 Sub-Bab A "Tiga Kantong Tepung Bu Ratna" (membandingkan dan mengurutkan pecahan):
 * jenis tugas, jawaban benar, pilihan, instruksi (tanpa digit), petunjuk salah, dan kartu data. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-timbang-k5b3a.mjs.
 * Jawaban beragam: memilih (klik), menulis SATU angka di kanvas (1 sampai 9), dan mengucapkan satu kata atau satu angka (rekam suara dengan pilihan ketuk).
 * Jawaban benar dihitung dari bilangan (logika-data.ts). Empat metode tiap misi: IGIL "Garis Bilangan, Penyebut Sama, Campuran ke Biasa" (membandingkan dua pecahan dengan tanda),
 * Number Line (Garis Bilangan), Common Denominator (Penyebut Sama), Mixed to Improper (Campuran ke Biasa).
 */
import type { Cara } from "../lemari-k1b1a/logika";
import {
  banding,
  dariBiasa,
  eja,
  kaliBulat,
  kapital,
  kata,
  keBiasa,
  kpk,
  pembilangSama,
  sebutPec,
  tandaBanding,
  teksPec,
  type Pec,
} from "./logika-data";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";
export { kapital, kata } from "./logika-data";

export type Rupa = "benda" | "diagram" | "lambang";
export const kataBil = kata;
/** Angka, pecahan, dan tanda menjadi ucapan tanpa digit. */
export const ucapkan = (t: string): string => eja(t);

/* ------------------------------ Jenis tugas ------------------------------ */
/** Metode IGIL: bandingkan dua pecahan. Klik = kalimat dengan tanda yang benar, kanvas = bilangan bulat pada pecahan yang lebih besar, suara = besar, kecil, atau sama. */
export type LIgil = { tipe: "igil"; a: Pec; b: Pec; satuan: string };
/** Number Line: garis bilangan 0 sampai `maks`, tiap satuan dibagi q bagian. Klik = pecahan titik n/q, kanvas = q, suara = kiri atau kanan untuk pecahan yang lebih kecil atau lebih besar (titik n dan titik m). */
export type LGaris = { tipe: "garis"; q: number; maks: number; n: number; m: number; tanya: "kecil" | "besar"; satuan: string };
/** Common Denominator: dua pecahan biasa disamakan penyebutnya dengan KPK. Klik = pecahan pertama dengan penyebut KPK, kanvas = KPK, suara = pengali penyebut pertama. */
export type LPenyebut = { tipe: "penyebut"; a: Pec; b: Pec; satuan: string };
/** Mixed to Improper: campuran diubah menjadi biasa. Klik = pecahan biasa, kanvas = bilangan bulat dikali penyebut, suara = penyebut tetap. */
export type LCampuran = { tipe: "campuran"; f: Pec; satuan: string };
export type LangkahDasar = LIgil | LGaris | LPenyebut | LCampuran;
/** Cari kesalahan: tokoh sudah menjawab dari `dasar` (klik). Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LangkahDasar;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
  /** Posisi alasan benar pada tampilan (0 sampai 2). */
  posisi?: number;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "garis" | "penyebut" | "campuran";
export const URUT_METODE: Metode[] = ["igil", "garis", "penyebut", "campuran"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Garis Bilangan, Penyebut Sama, Campuran ke Biasa",
  garis: "Number Line: Garis Bilangan",
  penyebut: "Common Denominator: Penyebut Sama",
  campuran: "Mixed to Improper: Campuran ke Biasa",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F35E}", garis: "\u{1F4CF}", penyebut: "\u{1F522}", campuran: "\u{1F504}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", garis: "Number Line", penyebut: "Common Denominator", campuran: "Mixed to Improper" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/* ------------------------------ Hitungan dasar tiap jenis ------------------------------ */
/** Pecahan pada tanda ke-i garis bilangan dengan tiap satuan dibagi q bagian. */
export const pecGaris = (i: number, q: number): Pec => dariBiasa(i, q, true);
/** Tulisan titik garis: bilangan bulat bila pas, selain itu pecahan campuran atau biasa. */
export const teksTitik = (i: number, q: number): string => (i % q === 0 ? String(i / q) : teksPec(pecGaris(i, q)));
export const kpkPenyebut = (d: LPenyebut): number => kpk(d.a.q, d.b.q);
export const pengaliPertama = (d: LPenyebut): number => kpkPenyebut(d) / d.a.q;
export const pembilangBaru = (d: LPenyebut): number => pembilangSama(d.a, kpkPenyebut(d));
export const kataBandingan = (a: Pec, b: Pec): "besar" | "kecil" | "sama" => (banding(a, b) > 0 ? "besar" : banding(a, b) < 0 ? "kecil" : "sama");
export const pecahanBesar = (d: LIgil): Pec => (banding(d.a, d.b) >= 0 ? d.a : d.b);
export const kalimatBanding = (d: LIgil): string => `${teksPec(d.a)} ${tandaBanding(d.a, d.b)} ${teksPec(d.b)}`;
export const biasaTeks = (f: Pec): string => `${keBiasa(f).p}/${f.q}`;

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari bilangan. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "igil":
      return cara === "klik" ? nama(kalimatBanding(l)) : cara === "kanvas" ? angka(pecahanBesar(l).w) : nama(kataBandingan(l.a, l.b));
    case "garis":
      return cara === "klik" ? nama(teksTitik(l.n, l.q)) : cara === "kanvas" ? angka(l.q) : nama(l.tanya === "kecil" ? "kiri" : "kanan");
    case "penyebut":
      return cara === "klik" ? nama(`${pembilangBaru(l)}/${kpkPenyebut(l)}`) : cara === "kanvas" ? angka(kpkPenyebut(l)) : angka(pengaliPertama(l));
    case "campuran":
      return cara === "klik" ? nama(biasaTeks(l.f)) : cara === "kanvas" ? angka(kaliBulat(l.f)) : nama("tetap");
  }
}

/** Apakah tugas langsung siap dijawab? Semua kecuali Cari kesalahan. */
export function siapLangsung(l: Langkah, rupa: Rupa, cara: Cara): boolean {
  void rupa;
  if (l.tipe === "salah") return false;
  return kunciJawab(l, cara) !== null;
}

/* ------------------------------ Pilihan ------------------------------ */
/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisipkan<T>(benar: T, lain: T[], geser: number): T[] {
  const jejak = `${geser}|${String(benar)}|${lain.map(String).join("|")}`;
  let h = 7;
  for (const c of jejak) h = (h * 31 + c.charCodeAt(0)) % 100003;
  const p = 1 + (h % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}
const unik = <T,>(daftar: T[]): T[] => daftar.filter((x, i, a) => a.indexOf(x) === i);

/** Tiga pilihan klik; jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k || k.jenis !== "nama") return [];
  const d = dasarDari(l);
  let hasil: string[];
  switch (d.tipe) {
    case "igil": {
      const lain = (["<", ">", "="] as const).map((t) => `${teksPec(d.a)} ${t} ${teksPec(d.b)}`).filter((x) => x !== k.nama);
      hasil = sisipkan(k.nama, lain, d.a.p + d.b.q);
      break;
    }
    case "garis": {
      const maks = d.maks * d.q;
      const calon = unik([d.n + 1, d.n - 1, d.n + 2, d.n - 2].filter((x) => x >= 1 && x <= maks && x !== d.n).map((x) => teksTitik(x, d.q))).filter((x) => x !== k.nama);
      hasil = sisipkan(k.nama, calon.slice(0, 2), d.n + d.q);
      break;
    }
    case "penyebut": {
      const L = kpkPenyebut(d);
      const benar = pembilangBaru(d);
      const calon = unik([d.a.p, d.a.p + L / d.a.q, benar + 1, benar - 1].filter((x) => x >= 1 && x !== benar).map((x) => `${x}/${L}`));
      hasil = sisipkan(k.nama, calon.slice(0, 2), d.a.q + d.b.q);
      break;
    }
    case "campuran": {
      const f = d.f;
      const benar = keBiasa(f).p;
      const calon = unik([f.w + f.p, f.w * f.p + f.q, benar + 1, benar - 1].filter((x) => x >= 1 && x !== benar).map((x) => `${x}/${f.q}`));
      hasil = sisipkan(k.nama, calon.slice(0, 2), f.w + f.q);
      break;
    }
  }
  if (l.tipe === "salah" && !hasil.includes(l.jawabTokoh)) {
    const ganti = hasil.map((x, i) => (x !== k.nama ? i : -1)).filter((i) => i >= 0).pop() ?? -1;
    hasil = hasil.map((x, i) => (i === ganti ? l.jawabTokoh : x));
  }
  return hasil;
}

/** Pilihan cadangan untuk tugas suara (kata, atau kata bilangan bila jawabannya angka). Jawaban benar tidak pernah di tempat pertama. */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  if (cara !== "suara") return [];
  const k = kunciJawab(l, cara);
  if (!k) return [];
  const d = dasarDari(l);
  if (k.jenis === "angka") {
    const lain = unik([k.n + 1, k.n - 1, k.n + 2, k.n - 2].filter((x) => x >= 1 && x <= 9 && x !== k.n)).slice(0, 2);
    return sisipkan(kata(k.n), lain.map(kata), k.n);
  }
  switch (d.tipe) {
    case "igil":
      return sisipkan(k.nama, ["besar", "kecil", "sama"].filter((x) => x !== k.nama), d.a.q + d.b.q);
    case "garis":
      return sisipkan(k.nama, ["kiri", "kanan", "tengah"].filter((x) => x !== k.nama), d.n);
    default:
      return sisipkan(k.nama, ["berubah", "tetap", "hilang"].filter((x) => x !== k.nama), 1);
  }
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kata(k.n));
/** Teks pilihan klik yang benar. */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  return k && k.jenis === "nama" ? k.nama : null;
}

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (d: LangkahDasar, rupa: Rupa): string => {
  if (rupa === "lambang") return "kartu";
  const diagram = rupa === "diagram";
  switch (d.tipe) {
    case "igil":
      return diagram ? "dua susunan bar" : "dua susunan loyang roti";
    case "garis":
      return diagram ? "garis bilangan" : "tali bilangan roti";
    case "penyebut":
      return diagram ? "dua bar pecahan" : "dua loyang roti";
    case "campuran":
      return diagram ? "bar pecahan" : "loyang roti";
  }
};

const arahGaris = (tanya: "kecil" | "besar"): string => (tanya === "kecil" ? "kiri" : "kanan");

/** Kalimat pembenaran setelah jawaban benar (diawali huruf kapital, tanpa menyebut gambar). */
export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "igil": {
      const L = kpk(biasa1(d.a).q, biasa1(d.b).q);
      const xa = (biasa1(d.a).p * L) / biasa1(d.a).q;
      const xb = (biasa1(d.b).p * L) / biasa1(d.b).q;
      const t = tandaBanding(d.a, d.b);
      return cara === "klik"
        ? `Penyebut disamakan menjadi ${L}: ${xa}/${L} ${t} ${xb}/${L}, jadi ${teksPec(d.a)} ${t} ${teksPec(d.b)}.`
        : cara === "kanvas"
          ? `Bilangan bulat ${d.a.w} dan ${d.b.w}: yang lebih besar ${pecahanBesar(d).w}, jadi pecahan dengan bilangan bulat itu yang lebih besar.`
          : `Pecahan pertama ${kataBandingan(d.a, d.b) === "besar" ? "lebih besar dari" : kataBandingan(d.a, d.b) === "kecil" ? "lebih kecil dari" : "sama besar dengan"} pecahan kedua.`;
    }
    case "garis":
      return cara === "klik"
        ? d.n > d.q
          ? `Titik itu ${d.n} ruas dari nol dan tiap ruas satu per ${kata(d.q)}, jadi pecahannya ${d.n}/${d.q}, yaitu ${teksTitik(d.n, d.q)}.`
          : `Titik itu ${d.n} ruas dari nol dan tiap ruas satu per ${kata(d.q)}, jadi pecahannya ${d.n}/${d.q}.`
        : cara === "kanvas"
          ? `Antara dua bilangan bulat ada ${d.q} ruas sama panjang, jadi tiap satuan dibagi ${d.q} bagian.`
          : `Makin ke kiri makin kecil dan makin ke kanan makin besar, jadi pecahan yang lebih ${d.tanya} ada di sebelah ${arahGaris(d.tanya)}.`;
    case "penyebut": {
      const L = kpkPenyebut(d);
      const m = pengaliPertama(d);
      return cara === "klik"
        ? `KPK ${d.a.q} dan ${d.b.q} adalah ${L}, jadi pembilang dan penyebut ${teksPec(d.a)} dikali ${m}, hasilnya ${pembilangBaru(d)}/${L}.`
        : cara === "kanvas"
          ? `KPK dari ${d.a.q} dan ${d.b.q} adalah ${L}.`
          : `Penyebut ${d.a.q} dikali ${m} menjadi ${L}, jadi pengalinya ${m}.`;
    }
    case "campuran": {
      const b = keBiasa(d.f);
      return cara === "klik"
        ? `${d.f.w} × ${d.f.q} + ${d.f.p} = ${b.p}, jadi ${teksPec(d.f)} = ${b.p}/${b.q}.`
        : cara === "kanvas"
          ? `${d.f.w} × ${d.f.q} = ${kaliBulat(d.f)}, lalu ditambah pembilang pecahannya.`
          : `Penyebut tetap ${d.f.q}, hanya pembilang yang berubah.`;
    }
  }
}
const biasa1 = (f: Pec): { p: number; q: number } => keBiasa(f);

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(l, rupa);
  const aw = AWALAN[metode];
  const tulis = "Tulis satu angka di kanvas.";
  switch (l.tipe) {
    case "igil":
      return cara === "klik"
        ? `${aw}: lihat ${g} ini. Wadah pertama berisi ${sebutPec(l.a)} ${l.satuan}, wadah kedua berisi ${sebutPec(l.b)} ${l.satuan}. Tanda mana yang benar? Pilih jawabannya.`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. Wadah pertama berisi ${sebutPec(l.a)} ${l.satuan}, wadah kedua berisi ${sebutPec(l.b)} ${l.satuan}. Bandingkan bilangan bulatnya dulu. Bilangan bulat pada pecahan yang lebih besar adalah berapa? ${tulis}`
          : `${aw}: lihat ${g} ini. Pecahan pertama ${sebutPec(l.a)} dan pecahan kedua ${sebutPec(l.b)}. Pecahan pertama besar, kecil, atau sama besar dengan yang kedua? Ucapkan satu kata.`;
    case "garis":
      return cara === "klik"
        ? `${aw}: lihat ${g} ini. Tiap satuan dibagi menjadi ${kata(l.q)} bagian sama, dan titik bertanda tanya ada di antara bilangan bulat. Titik itu berada di pecahan berapa? Pilih jawabannya.`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. Garis dari nol sampai ${kata(l.maks)} dibagi menjadi ruas kecil yang sama panjang. Tiap satuan dibagi menjadi berapa bagian sama? ${tulis}`
          : `${aw}: lihat ${g} ini. Titik A dan titik B ada pada garis. Pecahan yang lebih ${l.tanya} ada di sebelah mana titik yang satunya, kiri atau kanan? Ucapkan satu kata.`;
    case "penyebut":
      return cara === "klik"
        ? `${aw}: lihat ${g} ini. Dua pecahan itu ${sebutPec(l.a)} dan ${sebutPec(l.b)} ${l.satuan}. Penyebutnya disamakan dengan KPK. ${kapital(sebutPec(l.a))} menjadi apa? Pilih jawabannya.`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. Dua pecahan itu ${sebutPec(l.a)} dan ${sebutPec(l.b)} ${l.satuan}. Penyebutnya akan disamakan dengan KPK. KPK dari ${kata(l.a.q)} dan ${kata(l.b.q)} adalah berapa? ${tulis}`
          : `${aw}: lihat ${g} ini. KPK dari ${kata(l.a.q)} dan ${kata(l.b.q)} adalah ${kata(kpkPenyebut(l))}. Penyebut ${kata(l.a.q)} dikali berapa supaya menjadi ${kata(kpkPenyebut(l))}? Ucapkan angkanya.`;
    case "campuran":
      return cara === "klik"
        ? `${aw}: lihat ${g} ini. Isinya ${sebutPec(l.f)} ${l.satuan}. Diubah menjadi pecahan biasa, hasilnya berapa? Pilih jawabannya.`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. Isinya ${sebutPec(l.f)} ${l.satuan}. Bilangan bulat dikali penyebut hasilnya berapa? ${tulis}`
          : `${aw}: lihat ${g} ini. Pecahan campuran ${sebutPec(l.f)} diubah menjadi pecahan biasa. Penyebutnya berubah atau tetap? Ucapkan satu kata.`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "igil":
      return cara === "klik" ? "Tanda mana yang benar?" : cara === "kanvas" ? "Bulatnya dibandingkan dulu: bulat pada pecahan terbesar?" : "Pecahan pertama besar, kecil, atau sama?";
    case "garis":
      return cara === "klik" ? "Titik itu berada di pecahan berapa?" : cara === "kanvas" ? "Tiap satuan dibagi menjadi berapa bagian?" : "Kiri atau kanan?";
    case "penyebut":
      return cara === "klik" ? "Menjadi pecahan apa setelah penyebut disamakan?" : cara === "kanvas" ? "KPK kedua penyebut berapa?" : "Penyebut pertama dikali berapa?";
    case "campuran":
      return cara === "klik" ? "Menjadi pecahan biasa berapa?" : cara === "kanvas" ? "Bilangan bulat dikali penyebut berapa?" : "Penyebut berubah atau tetap?";
  }
}

/** Petunjuk saat jawaban salah: menunjuk arah tanpa menyebut jawaban (tanpa menyebut gambar). */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "igil":
      return cara === "klik"
        ? "Samakan dulu penyebut kedua pecahan dengan KPK, lalu bandingkan pembilangnya. Periksa juga bilangan bulatnya."
        : cara === "kanvas"
          ? "Bandingkan bilangan bulat kedua pecahan, lalu ambil bilangan bulat dari pecahan yang lebih besar."
          : "Bandingkan kedua pecahan setelah penyebutnya sama, atau lihat letaknya pada garis bilangan.";
    case "garis":
      return cara === "klik"
        ? "Hitung ruas kecil dari nol sampai titik itu, lalu bacalah sebagai pecahan dengan penyebut sebanyak bagian pada tiap satuan."
        : cara === "kanvas"
          ? "Hitung ruas kecil di antara dua bilangan bulat yang berurutan."
          : "Pada garis bilangan, makin ke kanan makin besar dan makin ke kiri makin kecil.";
    case "penyebut":
      return cara === "klik"
        ? "Pembilang dan penyebut harus dikali dengan bilangan yang sama. Cari dulu pengali dari penyebut lama ke penyebut baru."
        : cara === "kanvas"
          ? "Tulis kelipatan kedua penyebut, lalu cari yang pertama kali sama."
          : "Cari bilangan pengali yang mengubah penyebut lama menjadi KPK.";
    case "campuran":
      return cara === "klik"
        ? "Kalikan bilangan bulat dengan penyebut, lalu tambahkan pembilang. Penyebutnya tetap."
        : cara === "kanvas"
          ? "Langkah pertama: kalikan bilangan bulat dengan penyebutnya."
          : "Pikirkan satu bilangan bulat yang dipotong menjadi bagian-bagian kecil yang sama.";
  }
}

/* ------------------------------ Kartu data (Abstract) ------------------------------ */
/** Isi kartu data untuk tahap Abstract (kata dan angka, tanpa emoji dan tanpa menyebut gambar). */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  switch (l.tipe) {
    case "igil":
      return cara === "kanvas"
        ? [`wadah pertama: ${teksPec(l.a)} ${l.satuan}`, `wadah kedua: ${teksPec(l.b)} ${l.satuan}`, "bandingkan bilangan bulatnya dulu", "bilangan bulat pada yang lebih besar: ?"]
        : cara === "suara"
          ? [`pecahan pertama: ${teksPec(l.a)}`, `pecahan kedua: ${teksPec(l.b)}`, "pecahan pertama: besar, kecil, atau sama?"]
          : [`wadah pertama: ${teksPec(l.a)} ${l.satuan}`, `wadah kedua: ${teksPec(l.b)} ${l.satuan}`, `${teksPec(l.a)} ? ${teksPec(l.b)}`];
    case "garis":
      return cara === "kanvas"
        ? [`garis bilangan: 0 sampai ${l.maks}`, `ruas kecil seluruhnya: ${l.maks * l.q}`, "tiap satuan dibagi: ? bagian"]
        : cara === "suara"
          ? [`titik A: ${teksTitik(l.n, l.q)}`, `titik B: ${teksTitik(l.m, l.q)}`, `pecahan yang lebih ${l.tanya}: kiri atau kanan?`]
          : [`garis bilangan: 0 sampai ${l.maks}`, `tiap satuan dibagi: ${l.q} bagian`, `titik berada pada ruas ke: ${l.n}`, "pecahan titik: ?"];
    case "penyebut": {
      const L = kpkPenyebut(l);
      return cara === "kanvas"
        ? [`pecahan: ${teksPec(l.a)} dan ${teksPec(l.b)}`, `penyebut: ${l.a.q} dan ${l.b.q}`, "KPK: ?"]
        : cara === "suara"
          ? [`KPK ${l.a.q} dan ${l.b.q}: ${L}`, `${l.a.q} × ? = ${L}`]
          : [`pecahan: ${teksPec(l.a)} dan ${teksPec(l.b)}`, `KPK ${l.a.q} dan ${l.b.q}: ${L}`, `${teksPec(l.a)} = ?/${L}`];
    }
    case "campuran":
      return cara === "kanvas"
        ? [`pecahan campuran: ${teksPec(l.f)} ${l.satuan}`, `bilangan bulat × penyebut: ${l.f.w} × ${l.f.q}`, "hasilnya: ?"]
        : cara === "suara"
          ? [`pecahan campuran: ${teksPec(l.f)}`, "diubah menjadi pecahan biasa", "penyebut: berubah atau tetap?"]
          : [`pecahan campuran: ${teksPec(l.f)} ${l.satuan}`, `bilangan bulat × penyebut + pembilang`, `pecahan biasa: ?/${l.f.q}`];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
