/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 5 Sub-Bab A "Etalase Keramik Bu Dewi" (ciri-ciri bangun datar):
 * jenis tugas, jawaban benar, pilihan, instruksi (tanpa digit), petunjuk salah, dan kartu ciri. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-etalase-k4b5a.mjs.
 * Jawaban beragam: memilih nama bangun (klik), menulis satu angka di kanvas, dan mengucapkan satu kata (rekam suara dengan pilihan ketuk). Jawaban benar dihitung dari koordinat bangun (logika-bangun.ts).
 * Empat metode tiap misi: IGIL "Pilah Keramik, Sisi dan Sudut, Pohon Keluarga Bentuk" (mengenali segi banyak), Sort the Tiles (Pilah Keramik), Sides and Corners (Sisi dan Sudut), Shape Family Tree (Pohon Keluarga Bentuk).
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { ejaK4B5, kataBilK4B5 } from "../eja-k4b5";
import { banyakSejajar, banyakSiku, banyakSisi, banyakSisiSamaSegitiga, bangun, beraturan, hitungSudut, jenisBangun, jenisSegitigaSisi, jenisSegitigaSudut, kataSisiSama, namaDari, namaSegi, semuaSisiSama, type Ciri } from "./logika-bangun";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

/** Nama bilangan dalam kata (tanpa digit): empat, enam. */
export const kataBil = (n: number): string => kataBilK4B5(n);
export const kata = kataBil;
/** Angka dan tanda menjadi ucapan tanpa digit: "4 sisi" menjadi "empat sisi". */
export const ucapkan = (t: string): string => ejaK4B5(t).replace(/\s+/g, " ").trim();

/* ------------------------------ Pohon keluarga bentuk ------------------------------ */
/** Satu anak anak-tangga keluarga: bangun induk diberi satu ciri tambahan menjadi bangun anak. Tiap pasangan diuji dari koordinat. */
/** `khusus`: hasilnya juga memenuhi nama lain menurut hubungan bangun (persegi juga belah ketupat), jadi soal klik meminta nama yang paling khusus. */
export type AnakPohon = { induk: string; indukKunci: string; tambah: string; ciriTambah: Ciri; hasil: string; lain: [string, string]; khusus?: true };
export const ANAK: AnakPohon[] = [
  { induk: "jajargenjang", indukKunci: "jajargenjang", tambah: "empat sudut siku-siku", ciriTambah: "siku-empat", hasil: "persegi-panjang", lain: ["belah ketupat", "trapesium"] },
  { induk: "jajargenjang", indukKunci: "jajargenjang", tambah: "empat sisi sama panjang", ciriTambah: "sisi-sama", hasil: "belah-ketupat", lain: ["persegi panjang", "trapesium"] },
  { induk: "persegi panjang", indukKunci: "persegi-panjang", tambah: "empat sisi sama panjang", ciriTambah: "sisi-sama", hasil: "persegi", lain: ["belah ketupat", "jajargenjang"], khusus: true },
  { induk: "belah ketupat", indukKunci: "belah-ketupat", tambah: "empat sudut siku-siku", ciriTambah: "siku-empat", hasil: "persegi", lain: ["persegi panjang", "layang-layang"], khusus: true },
  { induk: "segiempat", indukKunci: "segiempat-sembarang", tambah: "tepat sepasang sisi sejajar", ciriTambah: "sejajar-satu", hasil: "trapesium", lain: ["jajargenjang", "layang-layang"] },
  { induk: "segiempat", indukKunci: "segiempat-sembarang", tambah: "dua pasang sisi sejajar", ciriTambah: "sejajar-dua", hasil: "jajargenjang", lain: ["trapesium", "layang-layang"] },
  { induk: "segiempat", indukKunci: "segiempat-sembarang", tambah: "dua pasang sisi bersebelahan sama panjang", ciriTambah: "sebelah-sama", hasil: "layang-layang", lain: ["jajargenjang", "trapesium"] },
  /* Menurut buku, belah ketupat juga layang-layang: layang-layang yang keempat sisinya sama panjang. */
  { induk: "layang-layang", indukKunci: "layang-layang", tambah: "empat sisi sama panjang", ciriTambah: "sisi-sama", hasil: "belah-ketupat", lain: ["persegi panjang", "trapesium"] },
];
/** Ciri yang sudah dimiliki tiap bangun induk (untuk uji: bangun anak punya semua ciri induknya ditambah ciri baru). */
export const CIRI_INDUK: Record<string, Ciri[]> = {
  jajargenjang: ["sejajar-dua"],
  "persegi panjang": ["sejajar-dua", "siku-empat"],
  "belah ketupat": ["sejajar-dua", "sisi-sama"],
  segiempat: [],
  "layang-layang": [],
};

/** Ciri tiap segiempat dalam kata (digit dieja oleh ucapkan). */
export const CIRI_TEKS: Record<string, string> = {
  persegi: "4 sisi sama panjang dan 4 sudut siku-siku",
  "persegi panjang": "2 pasang sisi sama panjang dan 4 sudut siku-siku",
  jajargenjang: "2 pasang sisi sejajar dan sisi berhadapan sama panjang",
  "belah ketupat": "4 sisi sama panjang dan 2 pasang sisi sejajar",
  "layang-layang": "2 pasang sisi bersebelahan yang sama panjang",
  trapesium: "tepat sepasang sisi sejajar",
  segiempat: "tidak ada sisi yang sama panjang",
};
/** Bangun yang mudah tertukar dengan tiap segiempat (pilihan klik dan suara). */
export const CAMPUR: Record<string, [string, string]> = {
  persegi: ["belah ketupat", "persegi panjang"],
  "persegi panjang": ["belah ketupat", "trapesium"],
  jajargenjang: ["persegi panjang", "belah ketupat"],
  "belah ketupat": ["trapesium", "persegi panjang"],
  "layang-layang": ["belah ketupat", "trapesium"],
  trapesium: ["jajargenjang", "layang-layang"],
  segiempat: ["trapesium", "layang-layang"],
};

/* ------------------------------ Jenis tugas ------------------------------ */
/** Metode IGIL: mengenali segi banyak; klik = nama menurut banyak sisi, kanvas = banyak sisi, suara = kata "beraturan" (bangun beraturan) atau, bila `tanya` = "nama", nama menurut banyak sisi. */
export type LKenali = { tipe: "kenali"; b: string; tanya?: "nama" };
/** Sort the Tiles (Pilah Keramik): keramik digolongkan menurut banyak sisi `n`; klik = nama satu keramik yang tidak segolongan, kanvas = banyak keramik bersisi n, suara = nama golongan bersisi n. */
export type LPilah = { tipe: "pilah"; daftar: string[]; n: number };
/** Sides and Corners (Sisi dan Sudut): klik dan suara = nama segiempat, kanvas = banyak sudut siku-siku atau banyak pasang sisi sejajar. */
export type LSisi = { tipe: "sisi"; b: string; tanya: "siku" | "sejajar" };
/** Shape Family Tree (Pohon Keluarga Bentuk): `i` nomor di ANAK; klik = nama bangun anak, kanvas = banyak pasang sisi sejajar bangun anak, suara = nama bangun induk. */
export type LPohon = { tipe: "pohon"; i: number };
/** Jenis segitiga menurut buku: menurut sisinya (sama sisi, sama kaki, sembarang) atau menurut sudutnya (siku-siku, lancip, tumpul). Klik dan suara = nama jenis menurut `menurut`, kanvas = banyak sudut lancip. */
export type LJenis = { tipe: "jenis"; b: string; menurut: "sisi" | "sudut" };
export type LangkahDasar = LKenali | LPilah | LSisi | LPohon | LJenis;
/** Cari kesalahan: tokoh sudah menjawab dari `dasar` (klik). Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. `jawabTokoh` adalah teks pilihan klik tokoh. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LSisi | LPohon;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "pilah" | "sisi" | "pohon";
export const URUT_METODE: Metode[] = ["igil", "pilah", "sisi", "pohon"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Pilah Keramik, Sisi dan Sudut, Pohon Keluarga Bentuk",
  pilah: "Sort the Tiles: Pilah Keramik",
  sisi: "Sides and Corners: Sisi dan Sudut",
  pohon: "Shape Family Tree: Pohon Keluarga Bentuk",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F3FA}", pilah: "\u{1F537}", sisi: "\u{1F4D0}", pohon: "\u{1F333}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", pilah: "Sort the Tiles", sisi: "Sides and Corners", pohon: "Shape Family Tree" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const JENIS_SISI = ["sama sisi", "sama kaki", "sembarang"] as const;
export const JENIS_SUDUT = ["siku-siku", "lancip", "tumpul"] as const;
const jenisSegitiga = (l: LJenis): string => (l.menurut === "sisi" ? jenisSegitigaSisi(bangun(l.b).titik) : jenisSegitigaSudut(bangun(l.b).titik));

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });
const titikDari = (b: string) => bangun(b).titik;

/** Banyak sisi keramik b. */
export const sisiDari = (b: string): number => banyakSisi(titikDari(b));
/** Kunci satu keramik yang banyak sisinya berbeda dari yang lain; "" bila tidak tepat satu. */
export function ganjilKunci(daftar: string[]): string {
  const n = daftar.map(sisiDari);
  const g = daftar.filter((_, i) => n.filter((x) => x === n[i]).length === 1);
  return g.length === 1 ? g[0] : "";
}
/** Nama keramik yang tidak segolongan. */
export const ganjil = (daftar: string[]): string => {
  const k = ganjilKunci(daftar);
  return k ? namaDari(k) : "";
};
/** Banyak keramik dalam daftar yang bersisi n. */
export const banyakBersisi = (daftar: string[], n: number): number => daftar.filter((k) => sisiDari(k) === n).length;

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari koordinat bangun. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "kenali":
      return cara === "klik" ? nama(namaSegi(sisiDari(l.b))) : cara === "kanvas" ? angka(sisiDari(l.b)) : l.tanya === "nama" ? nama(namaSegi(sisiDari(l.b))) : nama("beraturan");
    case "pilah":
      return cara === "klik" ? nama(ganjil(l.daftar)) : cara === "kanvas" ? angka(banyakBersisi(l.daftar, l.n)) : nama(namaSegi(l.n));
    case "sisi":
      return cara === "kanvas" ? angka(l.tanya === "siku" ? banyakSiku(titikDari(l.b)) : banyakSejajar(titikDari(l.b))) : nama(jenisBangun(titikDari(l.b)));
    case "pohon": {
      const a = ANAK[l.i];
      return cara === "klik" ? nama(namaDari(a.hasil)) : cara === "kanvas" ? angka(banyakSejajar(titikDari(a.hasil))) : nama(a.induk);
    }
    case "jenis":
      return cara === "kanvas" ? angka(hitungSudut(titikDari(l.b)).lancip) : nama(jenisSegitiga(l));
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
const nomorKatalog = (b: string): number => b.split("").reduce((t, c) => t + c.charCodeAt(0), 0);

/** Tiga pilihan untuk tugas klik: jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k || k.jenis !== "nama") return [];
  const d = dasarDari(l);
  switch (d.tipe) {
    case "kenali": {
      const n = sisiDari(d.b);
      const lain = unik([n - 1, n + 1, n + 2, n - 2].filter((x) => x >= 3 && x <= 6 && x !== n).map(namaSegi), [k.nama]).slice(0, 2);
      return sisipkan(k.nama, lain, n);
    }
    case "pilah": {
      const lain = unik(d.daftar.map(namaDari), [k.nama]).slice(0, 2);
      return sisipkan(k.nama, lain, d.daftar.length);
    }
    case "sisi":
      return sisipkan(k.nama, [...CAMPUR[k.nama]], nomorKatalog(d.b));
    case "pohon":
      return sisipkan(k.nama, [...ANAK[d.i].lain], d.i);
    case "jenis":
      return sisipkan(k.nama, unik([...(d.menurut === "sisi" ? JENIS_SISI : JENIS_SUDUT)], [k.nama]), nomorKatalog(d.b));
  }
}
const SEMUA_SEGI = ["segitiga", "segiempat", "segilima", "segienam"];
/** Pilihan cadangan untuk tugas suara (kata). Jawaban benar tidak pernah di tempat pertama. */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  if (cara !== "suara") return [];
  const k = kunciJawab(l, cara);
  if (!k || k.jenis !== "nama") return [];
  const d = dasarDari(l);
  switch (d.tipe) {
    case "kenali":
      return d.tanya === "nama" ? sisipkan(k.nama, unik(SEMUA_SEGI, [k.nama]).slice(0, 2), sisiDari(d.b)) : sisipkan(k.nama, ["sejajar", "tumpul"], sisiDari(d.b));
    case "pilah":
      return sisipkan(k.nama, unik(SEMUA_SEGI, [k.nama]).slice(0, 2), d.n);
    case "sisi":
      return sisipkan(k.nama, [...CAMPUR[k.nama]], nomorKatalog(d.b));
    case "pohon":
      return sisipkan(k.nama, [...ANAK[d.i].lain], d.i);
    case "jenis":
      return sisipkan(k.nama, unik([...(d.menurut === "sisi" ? JENIS_SISI : JENIS_SUDUT)], [k.nama]), nomorKatalog(d.b) + 1);
  }
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));
/** Teks pilihan klik yang benar. */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  return k && k.jenis === "nama" ? k.nama : null;
}

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : "gambar");

/** Kalimat pembenaran setelah jawaban benar (diawali huruf kapital, tanpa menyebut gambar, kisi, atau kotak). */
export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "kenali": {
      const n = sisiDari(d.b);
      return cara === "klik" ? `Bangun dengan ${n} sisi disebut ${namaSegi(n)}.` : cara === "kanvas" ? `Bangun ini memiliki ${n} sisi.` : d.tanya === "nama" ? `Bangun dengan ${n} sisi disebut ${namaSegi(n)}.` : "Segi banyak yang semua sisinya sama panjang dan semua sudutnya sama besar disebut beraturan.";
    }
    case "pilah": {
      const n = d.n;
      if (cara === "klik") {
        const gk = ganjilKunci(d.daftar);
        const lain = d.daftar.find((q) => q !== gk) ?? gk;
        return `Keramik ${namaDari(gk)} bersisi ${sisiDari(gk)}, sedangkan keramik yang lain bersisi ${sisiDari(lain)}.`;
      }
      return cara === "kanvas" ? `Ada ${banyakBersisi(d.daftar, n)} keramik yang bersisi ${n}.` : `Keramik yang bersisi ${n} digolongkan sebagai ${namaSegi(n)}.`;
    }
    case "sisi": {
      const nm = jenisBangun(titikDari(d.b));
      if (cara === "kanvas") return d.tanya === "siku" ? `Bangun ini memiliki ${banyakSiku(titikDari(d.b))} sudut siku-siku.` : `Bangun ini memiliki ${banyakSejajar(titikDari(d.b))} pasang sisi sejajar.`;
      return `Bangun ini adalah ${nm}, dengan ciri ${CIRI_TEKS[nm]}.`;
    }
    case "pohon": {
      const a = ANAK[d.i];
      return cara === "klik"
        ? `${kapital(a.induk)} yang diberi tambahan ciri ${a.tambah} menjadi ${namaDari(a.hasil)}.`
        : cara === "kanvas"
          ? `${kapital(namaDari(a.hasil))} memiliki ${banyakSejajar(titikDari(a.hasil))} pasang sisi sejajar.`
          : `${kapital(namaDari(a.hasil))} adalah anak dari ${a.induk}.`;
    }
    case "jenis": {
      const t = titikDari(d.b);
      const jn = jenisSegitiga(d);
      return cara === "kanvas" ? `Segitiga ini memiliki ${hitungSudut(t).lancip} sudut lancip.` : d.menurut === "sisi" ? `Menurut sisinya, segitiga ini disebut segitiga ${jn}.` : `Menurut sudutnya, segitiga ini disebut segitiga ${jn}.`;
    }
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  const aw = AWALAN[metode];
  switch (l.tipe) {
    case "kenali":
      return cara === "klik"
        ? `${aw}: lihat ${g} ini. Tepinya berupa ruas garis lurus dan tertutup rapat. Pilih nama bangunnya menurut banyak sisi.`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. Berapa banyak sisi bangun itu? Tulis satu angka di kanvas.`
          : l.tanya === "nama"
            ? `${aw}: lihat ${g} ini. Bangun ini tertutup dari ruas garis lurus. Namanya menurut banyak sisi disebut apa? Ucapkan satu kata.`
            : `${aw}: lihat ${g} ini. Semua sisinya sama panjang dan semua sudutnya sama besar. Bangun seperti itu disebut segi banyak apa? Ucapkan satu kata.`;
    case "pilah":
      return cara === "klik"
        ? `${aw}: lihat ${g} ini. Keramik digolongkan menurut banyak sisinya, dan satu keramik tidak segolongan dengan yang lain. Pilih namanya.`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. Berapa keramik yang bersisi ${kata(l.n)}? Tulis satu angka di kanvas.`
          : `${aw}: lihat ${g} ini. Keramik yang bersisi ${kata(l.n)} digolongkan menjadi satu golongan. Golongan itu disebut apa? Ucapkan satu kata.`;
    case "sisi":
      return cara === "klik"
        ? `${aw}: lihat ${g} ini. Periksa sisi dan sudutnya, lalu pilih nama bangunnya.`
        : cara === "kanvas"
          ? l.tanya === "siku"
            ? `${aw}: lihat ${g} ini. Berapa banyak sudut siku-siku pada bangun ini? Tulis satu angka di kanvas.`
            : `${aw}: lihat ${g} ini. Berapa pasang sisi yang sejajar pada bangun ini? Tulis satu angka di kanvas.`
          : `${aw}: lihat ${g} ini. Periksa sisi dan sudutnya. Bangun apakah ini? Ucapkan nama bangunnya.`;
    case "pohon": {
      const a = ANAK[l.i];
      return cara === "klik"
        ? `${aw}: ${a.induk} diberi tambahan ciri, yaitu ${a.tambah}. Bangun apa yang terbentuk? ${a.khusus ? "Pilih nama yang paling khusus." : "Pilih namanya."}`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. ${kapital(a.induk)} diberi tambahan ciri, yaitu ${a.tambah}. Berapa pasang sisi sejajar yang dimiliki bangun yang terbentuk? Tulis satu angka di kanvas.`
          : `${aw}: lihat ${g} ini. Bangun ${namaDari(a.hasil)} adalah anak langsung dari satu bangun induk. Induk itu hanya kekurangan ${a.tambah} dibandingkan ${namaDari(a.hasil)}. Bangun induk itu disebut apa? Ucapkan nama bangun induknya.`;
    }
    case "jenis":
      return cara === "klik"
        ? l.menurut === "sisi"
          ? `${aw}: lihat ${g} ini. Segitiga digolongkan menurut sisinya. Pilih jenis segitiga ini menurut sisinya.`
          : `${aw}: lihat ${g} ini. Segitiga digolongkan menurut sudutnya. Pilih jenis segitiga ini menurut sudutnya.`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. Berapa banyak sudut lancip pada segitiga ini? Tulis satu angka di kanvas.`
          : l.menurut === "sisi"
            ? `${aw}: lihat ${g} ini. Periksa panjang ketiga sisinya. Jenis segitiga ini menurut sisinya disebut apa? Ucapkan jenisnya.`
            : `${aw}: lihat ${g} ini. Periksa ketiga sudutnya. Jenis segitiga ini menurut sudutnya disebut apa? Ucapkan jenisnya.`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "kenali":
      return cara === "klik" ? "Bangun apa ini menurut banyak sisinya?" : cara === "kanvas" ? "Berapa banyak sisinya?" : d.tanya === "nama" ? "Apa nama bangun itu menurut banyak sisinya?" : "Bangun itu disebut apa?";
    case "pilah":
      return cara === "klik" ? "Keramik mana yang tidak segolongan?" : cara === "kanvas" ? `Berapa keramik yang bersisi ${kata(d.n)}?` : "Golongan itu disebut apa?";
    case "sisi":
      return cara === "kanvas" ? (d.tanya === "siku" ? "Berapa banyak sudut siku-siku?" : "Berapa pasang sisi yang sejajar?") : "Apa nama bangun ini?";
    case "pohon":
      return cara === "klik" ? (ANAK[d.i].khusus ? "Apa nama yang paling khusus?" : "Bangun apa yang terbentuk?") : cara === "kanvas" ? "Berapa pasang sisi sejajar bangun itu?" : "Apa nama bangun induknya?";
    case "jenis":
      return cara === "kanvas" ? "Berapa banyak sudut lancip?" : d.menurut === "sisi" ? "Apa jenis segitiga ini menurut sisinya?" : "Apa jenis segitiga ini menurut sudutnya?";
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya tanpa menyebut jawaban (tanpa digit, tanpa menyebut gambar atau kisi). `jawab`: pilihan atau kata yang diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "kenali":
      return cara === "klik"
        ? "Hitung banyak ruas garis pada tepi bangun, lalu cocokkan dengan nama menurut banyak sisinya."
        : cara === "kanvas"
          ? "Hitung semua sisi satu per satu mengelilingi bangun itu, tanpa ada yang terlewat."
          : l.tanya === "nama"
            ? "Hitung banyak sisinya, lalu ingat nama yang diawali kata segi dan diikuti banyak sisinya."
            : "Pikirkan nama bagi segi banyak yang serba sama pada sisi dan sudutnya.";
    case "pilah":
      return cara === "klik"
        ? "Hitung banyak sisi tiap keramik, lalu cari satu yang banyak sisinya berbeda dari yang lain."
        : cara === "kanvas"
          ? "Hitung banyak sisi tiap keramik, lalu hitung hanya yang cocok dengan golongan yang ditanyakan."
          : "Banyak sisi menentukan nama golongan: namanya diawali kata segi dan diikuti banyak sisinya.";
    case "sisi":
      return cara === "kanvas"
        ? l.tanya === "siku"
          ? "Periksa tiap sudut satu per satu dengan penyiku, lalu hitung yang pas."
          : "Cari sisi yang tidak akan bertemu sejauh apa pun diperpanjang, lalu hitung pasangannya."
        : "Periksa tiap sisi dan sudutnya dengan teliti, lalu bandingkan dengan ciri bangun yang sudah kamu pelajari.";
    case "pohon":
      return cara === "klik"
        ? "Mulailah dari ciri bangun induk, tambahkan ciri baru, lalu cari nama yang cocok dengan semuanya."
        : cara === "kanvas"
          ? "Tentukan dulu nama bangun yang terbentuk, lalu hitung pasangan sisi yang sejajar."
          : "Bangun induk punya semua ciri anaknya kecuali satu, jadi bayangkan bangun yang lebih umum.";
    case "jenis":
      return cara === "kanvas"
        ? "Periksa tiap sudut dengan penyiku, lalu hitung hanya sudut yang lebih sempit daripada sudut siku-siku."
        : l.menurut === "sisi"
          ? "Bandingkan panjang ketiga sisinya dengan penggaris, lalu hitung berapa yang sama panjang."
          : "Periksa tiap sudut dengan penyiku, lalu lihat apakah ada yang pas, lebih sempit, atau lebih lebar.";
  }
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
/** Ciri bangun dalam kartu kata: nama bangun tampil kecuali `sembunyi` = "nama"; ciri yang ditanyakan tampil "?". Semua dihitung dari koordinat. */
export function barisCiri(kunci: string, sembunyi: "nama" | "siku" | "sejajar" | null): string[] {
  const t = titikDari(kunci);
  const baris: string[] = [];
  if (sembunyi !== "nama") baris.push(`nama bangun: ${namaDari(kunci)}`);
  baris.push(`banyak sisi: ${banyakSisi(t)}`);
  baris.push(`sisi sama panjang: ${t.length === 4 ? kataSisiSama(t) : semuaSisiSama(t) ? "semua" : "tidak semua"}`);
  if (t.length > 4) baris.push(`sudut sama besar: ${beraturan(t) ? "semua" : "tidak semua"}`);
  baris.push(`pasang sisi sejajar: ${sembunyi === "sejajar" ? "?" : banyakSejajar(t)}`);
  baris.push(`sudut siku-siku: ${sembunyi === "siku" ? "?" : banyakSiku(t)}`);
  if (sembunyi === "nama") baris.push("nama bangun: ?");
  return baris;
}
/** Isi kartu kata untuk tahap Abstract (kata dan angka, tanpa emoji dan tanpa gambar). */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  switch (l.tipe) {
    case "kenali":
      return cara === "kanvas"
        ? [`bangun: ${namaDari(l.b)}`, "banyak sisi: ?"]
        : cara === "suara"
          ? l.tanya === "nama"
            ? [`banyak sisi: ${sisiDari(l.b)}`, "nama menurut banyak sisi: ?"]
            : ["semua sisi sama panjang", "semua sudut sama besar", "nama segi banyak itu: ?"]
          : [`banyak sisi: ${sisiDari(l.b)}`, "tepi: ruas garis lurus tertutup", "nama menurut banyak sisi: ?"];
    case "pilah":
      return cara === "suara"
        ? [`banyak sisi: ${l.n}`, "nama golongannya: ?"]
        : [...l.daftar.map((k) => `${namaDari(k)}: ${sisiDari(k)} sisi`), cara === "kanvas" ? `keramik bersisi ${l.n}: ?` : "keramik yang tidak segolongan: ?"];
    case "sisi":
      return barisCiri(l.b, cara === "kanvas" ? l.tanya : "nama");
    case "pohon": {
      const a = ANAK[l.i];
      return cara === "kanvas"
        ? [`induk: ${a.induk}`, `tambahan ciri: ${a.tambah}`, "pasang sisi sejajar bangun itu: ?"]
        : cara === "suara"
          ? [`anak: ${namaDari(a.hasil)}`, `tambahan ciri: ${a.tambah}`, "induknya: ?"]
          : [`induk: ${a.induk}`, `tambahan ciri: ${a.tambah}`, "bangun yang terbentuk: ?"];
    }
    case "jenis": {
      const t = titikDari(l.b);
      const sd = hitungSudut(t);
      const sm = banyakSisiSamaSegitiga(t);
      return cara === "kanvas"
        ? ["banyak sudut: 3", `sudut siku-siku: ${sd.siku}`, `sudut tumpul: ${sd.tumpul}`, "sudut lancip: ?"]
        : l.menurut === "sisi"
          ? ["banyak sisi: 3", `sisi yang sama panjang: ${sm === 0 ? "tidak ada" : sm}`, "jenis menurut sisinya: ?"]
          : ["banyak sudut: 3", `sudut siku-siku: ${sd.siku}`, `sudut tumpul: ${sd.tumpul}`, "jenis menurut sudutnya: ?"];
    }
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
