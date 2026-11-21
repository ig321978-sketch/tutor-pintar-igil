/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 5 Bab 1 Sub-Bab C "Bundel Tiket Bu Lestari" (menguraikan bilangan, menukar bundel, menyusun kembali):
 * jenis tugas, jawaban benar, pilihan, instruksi (tanpa digit), petunjuk salah, dan kartu data. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-bundel-k5b1c.mjs.
 * Jawaban beragam: memilih (klik), menulis satu angka di kanvas, dan mengucapkan satu kata (rekam suara dengan pilihan ketuk). Jawaban benar dihitung dari data (logika-data.ts).
 * Empat metode tiap misi: IGIL "Urai Bilangan, Tukar Bundel, Susun Kembali" (membaca bundel), Break It Apart (Urai Bilangan), Swap Bundles (Tukar Bundel), Build It Back (Susun Kembali).
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { ejaK5B1, kataK5B1 } from "../eja-k5b1";
import {
  KOLOM,
  NAMA_BUNDEL,
  NAMA_TEMPAT,
  banyakNol,
  bilanganNolBergeser,
  bilanganTanpaNol,
  kolomNol,
  lambang,
  susunanDari,
  teksSusunan,
  teksUraian,
  tukarNaik,
  tukarTurun,
  uraianGeserKiri,
  uraianKurangNol,
  type Susunan,
} from "./logika-data";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
export const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

/** Nama bilangan dalam kata (tanpa digit). */
export const kataBil = (n: number): string => kataK5B1(n);
export const kata = kataBil;
/** Angka dan tanda menjadi ucapan tanpa digit: "24.350" menjadi "dua puluh empat ribu tiga ratus lima puluh". */
export const ucapkan = (t: string): string => ejaK5B1(t).replace(/\s+/g, " ").trim();

/* ------------------------------ Jenis tugas ------------------------------ */
/** Metode IGIL: membaca bundel. Klik = banyak tiket dalam satu bundel kolom `j`, kanvas = banyak bundel kolom `j`, suara = nama bundel yang berisi sekian tiket. */
export type LIgil = { tipe: "igil"; n: number; j: number; satuan: string };
/** Break It Apart (Urai Bilangan): bilangan `n`. Klik = uraian yang tepat, kanvas = angka di kolom `j`, suara = bundel yang tidak dipakai (tepat satu kolom nol). */
export type LUrai = { tipe: "urai"; n: number; j: number; satuan: string };
/** Swap Bundles (Tukar Bundel): susunan `s`, tukar kolom `i` dan `i + 1`. Klik = susunan baru, kanvas = bundel yang tersisa, suara = nama bundel lawan tukar. */
export type LTukar = { tipe: "tukar"; s: Susunan; i: number; arah: "turun" | "naik"; satuan: string };
/** Build It Back (Susun Kembali): uraian bilangan `n`. Klik = bilangan biasa, kanvas = banyak angka nol, suara = kolom yang diisi nol (tepat satu). */
export type LSusun = { tipe: "susun"; n: number; satuan: string };
export type LangkahDasar = LIgil | LUrai | LTukar | LSusun;
/** Cari kesalahan: tokoh sudah menjawab dari `dasar` (klik). Anak memutuskan benar atau salah, memilih alasan, lalu menjawab sendiri. `jawabTokoh` adalah teks pilihan klik tokoh. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LUrai | LTukar | LSusun;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
  /** Posisi alasan benar pada tampilan (0 sampai 2); bila kosong dihitung dari teks. */
  posisi?: number;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "urai" | "tukar" | "susun";
export const URUT_METODE: Metode[] = ["igil", "urai", "tukar", "susun"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Urai Bilangan, Tukar Bundel, Susun Kembali",
  urai: "Break It Apart: Urai Bilangan",
  tukar: "Swap Bundles: Tukar Bundel",
  susun: "Build It Back: Susun Kembali",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F3AB}", urai: "\u{1F50D}", tukar: "\u{1F501}", susun: "\u{1F4E6}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", urai: "Break It Apart", tukar: "Swap Bundles", susun: "Build It Back" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/* ------------------------------ Hitungan dasar ------------------------------ */
/** Susunan sesudah satu penukaran (turun atau naik). */
export function susunanBaru(d: LTukar): Susunan {
  const hasil = d.arah === "turun" ? tukarTurun(d.s, d.i) : tukarNaik(d.s, d.i);
  if (!hasil) throw new Error("Penukaran tidak mungkin untuk tugas ini");
  return hasil;
}
/** Satu-satunya kolom nol pada bilangan, atau -1 bila tidak tepat satu. */
export const kolomNolTunggal = (n: number): number => {
  const z = kolomNol(n);
  return z.length === 1 ? z[0] : -1;
};
/** Bundel yang tersisa sesudah penukaran: kolom besar (turun) atau kolom kecil (naik). */
export const sisaTukar = (d: LTukar): number => (d.arah === "turun" ? d.s[d.i] - 1 : d.s[d.i + 1] - 10);

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });
const teksIsi = (j: number, satuan: string): string => `${lambang(KOLOM[j].bobot)} ${satuan}`;

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari data. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "igil":
      return cara === "klik" ? nama(teksIsi(l.j, l.satuan)) : cara === "kanvas" ? angka(susunanDari(l.n)[l.j]) : nama(KOLOM[l.j].bundel);
    case "urai":
      return cara === "klik" ? nama(teksUraian(l.n)) : cara === "kanvas" ? angka(susunanDari(l.n)[l.j]) : nama(KOLOM[kolomNolTunggal(l.n)].bundel);
    case "tukar":
      return cara === "klik" ? nama(teksSusunan(susunanBaru(l))) : cara === "kanvas" ? angka(sisaTukar(l)) : nama(KOLOM[l.arah === "turun" ? l.i + 1 : l.i].bundel);
    case "susun":
      return cara === "klik" ? nama(lambang(l.n)) : cara === "kanvas" ? angka(banyakNol(l.n)) : nama(KOLOM[kolomNolTunggal(l.n)].tempat);
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
const unik = <T,>(daftar: T[]): T[] => daftar.filter((x, i, a) => a.indexOf(x) === i);

/** Dua susunan keliru untuk penukaran: hanya satu bundel yang bertambah, dan bundel besar yang tidak berkurang atau tidak bertambah. */
function susunanKeliru(d: LTukar): string[] {
  const { s, i } = d;
  const k = i + 1;
  const ubah = (a: number, b: number): Susunan => s.map((c, j) => (j === i ? c + a : j === k ? c + b : c));
  return d.arah === "turun" ? [teksSusunan(ubah(-1, 1)), teksSusunan(ubah(0, 10))] : [teksSusunan(ubah(1, -1)), teksSusunan(ubah(1, 0))];
}

/** Pilihan untuk tugas klik: jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k || k.jenis !== "nama") return [];
  const d = dasarDari(l);
  let hasil: string[];
  switch (d.tipe) {
    case "igil": {
      const lain = [d.j - 1, d.j + 1, d.j + 2, d.j - 2].filter((x) => x >= 0 && x < KOLOM.length).slice(0, 2).map((x) => teksIsi(x, d.satuan));
      hasil = sisipkan(k.nama, lain, d.j + d.n);
      break;
    }
    case "urai":
      hasil = sisipkan(k.nama, unik([uraianGeserKiri(d.n), uraianKurangNol(d.n)]).filter((x) => x !== k.nama), d.n);
      break;
    case "tukar":
      hasil = sisipkan(k.nama, unik(susunanKeliru(d)).filter((x) => x !== k.nama), d.i + d.s[0] + d.s[2]);
      break;
    case "susun":
      hasil = sisipkan(k.nama, unik([lambang(bilanganTanpaNol(d.n)), lambang(bilanganNolBergeser(d.n))]).filter((x) => x !== k.nama), d.n);
      break;
  }
  if (l.tipe === "salah" && !hasil.includes(l.jawabTokoh)) {
    const ganti = hasil.map((x, i) => (x !== k.nama ? i : -1)).filter((i) => i >= 0).pop() ?? -1;
    hasil = hasil.map((x, i) => (i === ganti ? l.jawabTokoh : x));
  }
  return hasil;
}
/** Pilihan cadangan untuk tugas suara (nama bundel atau nama tempat). Jawaban benar tidak pernah di tempat pertama. */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  if (cara !== "suara") return [];
  const k = kunciJawab(l, cara);
  if (!k || k.jenis !== "nama") return [];
  const keluarga: readonly string[] = NAMA_BUNDEL.includes(k.nama) ? NAMA_BUNDEL : NAMA_TEMPAT.filter((t) => !t.includes(" "));
  const lain = keluarga.filter((x) => x !== k.nama);
  const geser = k.nama.length + keluarga.indexOf(k.nama);
  const mulai = geser % lain.length;
  const dua = [lain[mulai], lain[(mulai + 1) % lain.length]];
  return sisipkan(k.nama, dua, geser);
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));
/** Teks pilihan klik yang benar. */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  return k && k.jenis === "nama" ? k.nama : null;
}

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : rupa === "diagram" ? "bagan bundel" : "rak gudang");
const bundelKe = (j: number): string => KOLOM[j].bundel;
const tempatKe = (j: number): string => KOLOM[j].tempat;

/** Kalimat pembenaran setelah jawaban benar (diawali huruf kapital, tanpa menyebut gambar, kisi, atau kotak). */
export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "igil":
      return cara === "klik"
        ? `Satu ${bundelKe(d.j)} berisi ${lambang(KOLOM[d.j].bobot)} ${d.satuan}.`
        : cara === "kanvas"
          ? `Ada ${susunanDari(d.n)[d.j]} ${bundelKe(d.j)}.`
          : `Bundel ${bundelKe(d.j)} berisi ${lambang(KOLOM[d.j].bobot)} ${d.satuan}.`;
    case "urai":
      return cara === "klik"
        ? `Tiap angka ditulis menurut kolomnya: ${teksUraian(d.n)} = ${lambang(d.n)}.`
        : cara === "kanvas"
          ? `Angka di kolom ${tempatKe(d.j)} adalah ${susunanDari(d.n)[d.j]}, jadi ada ${susunanDari(d.n)[d.j]} ${bundelKe(d.j)}.`
          : `Kolom ${tempatKe(kolomNolTunggal(d.n))} berisi nol, jadi bundel ${bundelKe(kolomNolTunggal(d.n))} tidak dipakai.`;
    case "tukar": {
      const besar = bundelKe(d.i);
      const kecil = bundelKe(d.i + 1);
      return cara === "klik"
        ? `Sepuluh ${kecil} sama dengan satu ${besar}, jadi jumlahnya tetap.`
        : cara === "kanvas"
          ? `Sesudah ditukar, ${d.arah === "turun" ? besar : kecil} tersisa ${sisaTukar(d)}.`
          : `Sepuluh ${kecil} ditukar dengan satu ${besar}.`;
    }
    case "susun":
      return cara === "klik"
        ? `Tiap bagian ditaruh di kolomnya dan kolom kosong diisi nol: ${lambang(d.n)}.`
        : cara === "kanvas"
          ? `Ada ${banyakNol(d.n)} angka nol, karena ${banyakNol(d.n)} kolom kosong diisi nol.`
          : `Kolom ${tempatKe(kolomNolTunggal(d.n))} kosong, jadi diisi nol.`;
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  const aw = AWALAN[metode];
  const tulis = "Tulis satu angka di kanvas.";
  switch (l.tipe) {
    case "igil":
      return cara === "klik"
        ? `${aw}: lihat ${g} ini. Tiap jenis bundel berisi tiket yang berbeda banyaknya. Pilih berapa ${l.satuan} dalam satu ${bundelKe(l.j)}.`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. Berapa ${bundelKe(l.j)} yang dipakai? ${tulis}`
          : `${aw}: lihat ${g} ini. Satu bundel berisi ${kata(KOLOM[l.j].bobot)} ${l.satuan}. Bundel apa itu? Ucapkan namanya.`;
    case "urai":
      return cara === "klik"
        ? `${aw}: lihat ${g} ini. Uraikan bilangannya menurut kolom. Pilih uraian yang tepat.`
        : cara === "kanvas"
          ? rupa === "lambang"
            ? `${aw}: lihat ${g} ini. Berapa angka di kolom ${tempatKe(l.j)}? ${tulis}`
            : `${aw}: lihat ${g} ini. Bilangan itu disusun dari bundel. Berapa ${bundelKe(l.j)} yang dipakai? ${tulis}`
          : `${aw}: lihat ${g} ini. Satu jenis bundel tidak dipakai sama sekali. Bundel apa itu? Ucapkan namanya.`;
    case "tukar": {
      const besar = bundelKe(l.i);
      const kecil = bundelKe(l.i + 1);
      const tukar = l.arah === "turun" ? `Satu ${besar} ditukar dengan sepuluh ${kecil}.` : `Sepuluh ${kecil} ditukar dengan satu ${besar}.`;
      return cara === "klik"
        ? `${aw}: lihat ${g} ini. ${tukar} Pilih susunan yang jumlahnya tetap.`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. ${tukar} Berapa ${l.arah === "turun" ? besar : kecil} yang tersisa? ${tulis}`
          : `${aw}: lihat ${g} ini. ${l.arah === "turun" ? `Satu ${besar} ditukar dengan sepuluh bundel lain.` : `Sepuluh ${kecil} ditukar dengan satu bundel lain.`} Bundel apa itu? Ucapkan namanya.`;
    }
    case "susun":
      return cara === "klik"
        ? `${aw}: lihat ${g} ini. Susun kembali uraiannya menjadi bilangan biasa. Pilih bilangan yang tepat.`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. Susun kembali uraiannya. Berapa angka nol yang harus ditulis? ${tulis}`
          : `${aw}: lihat ${g} ini. Susun kembali uraiannya. Kolom mana yang harus diisi nol? Ucapkan namanya.`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara, rupa?: Rupa): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "igil":
      return cara === "klik" ? `Satu ${bundelKe(d.j)} berisi berapa ${d.satuan}?` : cara === "kanvas" ? `Berapa ${bundelKe(d.j)}?` : "Bundel apa itu?";
    case "urai":
      return cara === "klik" ? "Uraian yang mana?" : cara === "kanvas" ? (rupa === "lambang" ? `Berapa angka di kolom ${tempatKe(d.j)}?` : `Berapa ${bundelKe(d.j)}?`) : "Bundel mana yang tidak dipakai?";
    case "tukar":
      return cara === "klik" ? "Susunan mana yang jumlahnya tetap?" : cara === "kanvas" ? `Berapa ${bundelKe(d.arah === "turun" ? d.i : d.i + 1)} yang tersisa?` : "Bundel apa itu?";
    case "susun":
      return cara === "klik" ? "Bilangan yang mana?" : cara === "kanvas" ? "Berapa angka nol?" : "Kolom mana yang diisi nol?";
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya tanpa menyebut jawaban (tanpa digit, tanpa menyebut gambar atau kisi). `jawab`: pilihan atau kata yang diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "igil":
      return cara === "klik"
        ? "Ingat urutan bundel dari yang paling besar sampai yang paling kecil, lalu cocokkan dengan banyak tiketnya."
        : cara === "kanvas"
          ? "Perhatikan jenis bundel yang ditanya, lalu hitung banyaknya dengan teliti."
          : "Cocokkan banyak tiket yang disebut dengan jenis bundel, dari yang paling besar sampai yang paling kecil.";
    case "urai":
      return cara === "klik"
        ? "Tulis tiap angka menurut kolomnya, lalu periksa apakah tiap bagian berada di kolom yang benar."
        : cara === "kanvas"
          ? "Lihat jenis bundel yang ditanya, lalu baca banyaknya pada bilangan itu."
          : "Cari kolom yang berisi nol. Jenis bundel di kolom itu tidak dipakai.";
    case "tukar":
      return cara === "klik"
        ? "Satu bundel sama dengan sepuluh bundel di kolom sebelah kanannya. Periksa apakah jumlah seluruhnya tetap sama."
        : cara === "kanvas"
          ? "Sebagian bundel pindah ke kolom lain, jadi hitung lagi bundel yang masih tertinggal."
          : "Sepuluh bundel di satu kolom sama dengan satu bundel di kolom sebelah kirinya.";
    case "susun":
      return cara === "klik"
        ? "Taruh tiap bagian ke kolomnya, dan isi nol di kolom yang kosong sebelum menulis angkanya."
        : cara === "kanvas"
          ? "Hitung kolom yang tidak punya bagian pada uraian itu."
          : "Cari kolom yang tidak punya bagian pada uraian itu.";
  }
}

/* ------------------------------ Tampilan satu tugas ------------------------------ */
export type TampilanBundel = { s: Susunan; judul: string; tandai: number[]; legenda: "tampil" | "nama" };
/** Isi rak gudang atau bagan bundel untuk satu tugas: susunan yang digambar sungguh, judul, baris yang disorot, dan apakah isi tiap bundel ditulis. */
export function tampilan(l: LangkahDasar, cara: Cara, rupa: Rupa): TampilanBundel {
  const rak = rupa === "benda" ? "rak gudang tiket" : "bagan bundel";
  switch (l.tipe) {
    case "igil":
      return { s: susunanDari(l.n), judul: rak, tandai: cara === "suara" ? [] : [l.j], legenda: "nama" };
    case "urai":
      return { s: susunanDari(l.n), judul: `bilangan ${lambang(l.n)}`, tandai: cara === "kanvas" ? [l.j] : [], legenda: "tampil" };
    case "tukar":
      return { s: l.s, judul: "susunan sekarang", tandai: [l.i, l.i + 1], legenda: "tampil" };
    case "susun":
      return { s: susunanDari(l.n), judul: `uraian: ${teksUraian(l.n)}`, tandai: [], legenda: "tampil" };
  }
}

/* ------------------------------ Kartu data (Abstract) ------------------------------ */
/** Isi kartu data untuk tahap Abstract (kata dan angka, tanpa emoji dan tanpa gambar). */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  switch (l.tipe) {
    case "igil":
      return cara === "kanvas"
        ? [`bilangan: ${lambang(l.n)}`, `banyak ${bundelKe(l.j)}: ?`]
        : cara === "suara"
          ? [`isi satu bundel: ${lambang(KOLOM[l.j].bobot)} ${l.satuan}`, "nama bundel: ?"]
          : [`jenis bundel: ${bundelKe(l.j)}`, `isi satu ${bundelKe(l.j)}: ? ${l.satuan}`];
    case "urai":
      return cara === "kanvas"
        ? [`bilangan: ${lambang(l.n)}`, `angka di kolom ${tempatKe(l.j)}: ?`]
        : cara === "suara"
          ? [`bilangan: ${lambang(l.n)}`, "bundel yang tidak dipakai: ?"]
          : [`bilangan: ${lambang(l.n)}`, "uraian: ?"];
    case "tukar": {
      const besar = bundelKe(l.i);
      const kecil = bundelKe(l.i + 1);
      const tukar = l.arah === "turun" ? `tukar 1 ${besar} dengan 10 ${kecil}` : `tukar 10 ${kecil} dengan 1 ${besar}`;
      return cara === "kanvas"
        ? [`susunan: ${teksSusunan(l.s)}`, tukar, `sisa ${l.arah === "turun" ? besar : kecil}: ?`]
        : cara === "suara"
          ? [`susunan: ${teksSusunan(l.s)}`, l.arah === "turun" ? `tukar 1 ${besar} dengan 10 bundel lain` : `tukar 10 ${kecil} dengan 1 bundel lain`, "nama bundel lain: ?"]
          : [`susunan: ${teksSusunan(l.s)}`, tukar, "susunan baru: ?"];
    }
    case "susun":
      return cara === "kanvas"
        ? [`uraian: ${teksUraian(l.n)}`, "banyak angka nol: ?"]
        : cara === "suara"
          ? [`uraian: ${teksUraian(l.n)}`, "kolom yang diisi nol: ?"]
          : [`uraian: ${teksUraian(l.n)}`, "bilangan: ?"];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
