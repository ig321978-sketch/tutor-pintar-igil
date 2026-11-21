/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 2 Sub-Bab A "Kain Lipat Bu Wulan" (pecahan berpembilang satu dari daerah arsir, membandingkan dan mengurutkan pecahan berpembilang satu, garis pecahan):
 * jenis tugas, jawaban benar, pilihan, instruksi (tanpa digit), petunjuk salah, dan geometri gambar (bagian sama besar, bagian berarsir, tanda pada garis). Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-lipat-k4b2a.mjs.
 * Jawaban beragam: memilih pecahan, tanda, atau urutan (klik), menulis satu angka di kanvas (penyebut, banyak garis lipatan), dan mengucapkan satu kata (pembilang, penyebut, atas, bawah, besar, kecil, kiri, kanan).
 * Jawaban benar dihitung dari data. Empat metode tiap misi: IGIL "Pita Pecahan, Lipat Kertas, Garis Pecahan", Unit Fraction Strip (Pita Pecahan), Fold the Paper (Lipat Kertas), Fraction Number Line (Garis Pecahan).
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { ejaK4B2, kataBilK4B2 } from "../eja-k4b2";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

/* ------------------------------ Bilangan, pecahan, dan kata ------------------------------ */
/** Nama bilangan dalam kata (tanpa digit): sembilan. */
export const kataBil = (n: number): string => kataBilK4B2(n);
export const kata = kataBil;
/** Tanda banding dan pecahan menjadi ucapan tanpa digit: "1/4" menjadi "satu per empat", ">" menjadi "lebih dari". */
export const ucapkan = (t: string): string => {
  const s = t.trim();
  if (s === ">") return "lebih dari";
  if (s === "<") return "kurang dari";
  if (s === "=") return "sama dengan";
  return ejaK4B2(t).replace(/\s+/g, " ").trim();
};
/** Pecahan berpembilang satu: 5 menjadi "1/5". */
export const pec = (n: number): string => `1/${n}`;
/** Pecahan berpembilang satu dalam kata: 5 menjadi "satu per lima". */
export const kataPec = (n: number): string => `satu per ${kataBil(n)}`;
export type Tanda = ">" | "<" | "=";
/** Tanda yang tepat antara 1/a dan 1/b: penyebut lebih kecil berarti pecahan lebih besar. */
export const tandaBanding = (a: number, b: number): Tanda => (a === b ? "=" : a < b ? ">" : "<");
/** Urutan dari yang terkecil: penyebut terbesar lebih dulu. */
export const urutTerkecil = (dens: readonly number[]): number[] => [...dens].sort((x, y) => y - x);
export const teksUrut = (dens: readonly number[]): string => dens.map(pec).join(" < ");

/* ------------------------------ Geometri gambar (diuji) ------------------------------ */
export type Potongan = { x: number; w: number; arsir: boolean };
/** Membagi lebar `lebar` mulai x0 menjadi n bagian sama besar; bagian dengan nomor di `arsir` (mulai nol) berarsir. */
export function potongBagian(n: number, x0: number, lebar: number, arsir: readonly number[]): Potongan[] {
  const w = lebar / n;
  return Array.from({ length: n }, (_, i) => ({ x: x0 + i * w, w, arsir: arsir.includes(i) }));
}
/** Posisi n + 1 tanda pada garis dari nol (x0) sampai satu (x0 + lebar), jaraknya sama. */
export function tandaGaris(n: number, x0: number, lebar: number): number[] {
  return Array.from({ length: n + 1 }, (_, i) => x0 + (i * lebar) / n);
}
/** Posisi pecahan 1/n pada garis dari nol sampai satu. */
export const letakPecahan = (n: number, x0: number, lebar: number): number => x0 + lebar / n;
/** Posisi garis lipatan di dalam: n - 1 garis. */
export const garisLipat = (n: number, x0: number, lebar: number): number[] => tandaGaris(n, x0, lebar).slice(1, -1);

/* ------------------------------ Jenis tugas ------------------------------ */
export type Istilah = "pembilang" | "penyebut";
/** Metode IGIL: kain dibagi n bagian sama besar dan satu bagian diarsir. klik = pecahan, kanvas = banyak bagian, suara = nama angka atas atau bawah. */
export type LArsir = { tipe: "arsir"; n: number; istilah: Istilah };
/** Unit Fraction Strip: dua pita 1/a (atas) dan 1/b (bawah). klik = tanda, kanvas = penyebut pecahan yang lebih besar, suara = atas atau bawah yang lebih besar. */
export type LPita = { tipe: "pita"; a: number; b: number };
/** Fold the Paper: kertas pertama dilipat p bagian, kertas kedua q bagian. klik = pecahan satu bagian kertas kedua, kanvas = banyak garis lipatan kertas kedua, suara = bagian kertas kedua besar atau kecil. */
export type LLipat = { tipe: "lipat"; p: number; q: number };
/** Fraction Number Line: tiga pecahan pada garis dari nol sampai satu; klik = urutan dari yang terkecil. */
export type LGarisUrut = { tipe: "garisUrut"; urut: [number, number, number] };
/** Fraction Number Line: garis dibagi n bagian sama panjang, satu titik di 1/n; kanvas = penyebut. */
export type LGarisBagi = { tipe: "garisBagi"; n: number };
/** Fraction Number Line: titik di 1/a; suara = pecahan 1/b letaknya di kiri atau kanan titik itu. */
export type LGarisSisi = { tipe: "garisSisi"; a: number; b: number };
export type LangkahDasar = LArsir | LPita | LLipat | LGarisUrut | LGarisBagi | LGarisSisi;
/** Cari kesalahan: tokoh sudah menjawab dari `dasar`. Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. `jawabTokoh` adalah teks pilihan klik tokoh. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LPita | LLipat;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "pita" | "lipat" | "garis";
export const URUT_METODE: Metode[] = ["igil", "pita", "lipat", "garis"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Pita Pecahan, Lipat Kertas, Garis Pecahan",
  pita: "Unit Fraction Strip: Pita Pecahan",
  lipat: "Fold the Paper: Lipat Kertas",
  garis: "Fraction Number Line: Garis Pecahan",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F9F5}", pita: "\u{1F4CF}", lipat: "\u{1F4C4}", garis: "\u{1F9F7}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", pita: "Unit Fraction Strip", lipat: "Fold the Paper", garis: "Fraction Number Line" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari data. Null bila jenis itu tidak dipakai pada cara tersebut. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "arsir":
      return cara === "klik" ? nama(pec(l.n)) : cara === "kanvas" ? angka(l.n) : nama(l.istilah);
    case "pita":
      return cara === "klik" ? nama(tandaBanding(l.a, l.b)) : cara === "kanvas" ? angka(Math.min(l.a, l.b)) : nama(l.a < l.b ? "atas" : "bawah");
    case "lipat":
      return cara === "klik" ? nama(pec(l.q)) : cara === "kanvas" ? angka(l.q - 1) : nama(l.q < l.p ? "besar" : "kecil");
    case "garisUrut":
      return cara === "klik" ? nama(teksUrut(urutTerkecil(l.urut))) : null;
    case "garisBagi":
      return cara === "kanvas" ? angka(l.n) : null;
    case "garisSisi":
      return cara === "suara" ? nama(l.b > l.a ? "kiri" : "kanan") : null;
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

/** Tiga pilihan untuk tugas klik: jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k || k.jenis !== "nama") return [];
  const d = dasarDari(l);
  switch (d.tipe) {
    case "arsir": {
      const lain = unik([pec(d.n - 1), pec(d.n + 1), pec(d.n + 2)], [k.nama]).slice(0, 2);
      return sisipkan(k.nama, lain, d.n);
    }
    case "pita": {
      const lain = unik<string>([">", "<", "="], [k.nama]);
      return sisipkan(k.nama, lain, d.a);
    }
    case "lipat": {
      const lain = unik([pec(d.p), pec(d.q + 1), pec(d.q - 1)], [k.nama]).slice(0, 2);
      return sisipkan(k.nama, lain, d.p);
    }
    case "garisUrut": {
      const benar = urutTerkecil(d.urut);
      const lain = unik([teksUrut([...benar].reverse()), teksUrut(d.urut), teksUrut([benar[1], benar[0], benar[2]]), teksUrut([benar[0], benar[2], benar[1]])], [k.nama]).slice(0, 2);
      return sisipkan(k.nama, lain, d.urut[0]);
    }
    default:
      return [];
  }
}
/** Pilihan cadangan untuk tugas suara (kata). */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k) return [];
  const d = dasarDari(l);
  if (k.jenis === "angka") return [];
  const geser = d.tipe === "arsir" ? d.n : d.tipe === "pita" ? d.a + d.b : d.tipe === "lipat" ? d.p + d.q : d.tipe === "garisSisi" ? d.a + d.b : 1;
  const semua: string[] = d.tipe === "arsir" ? ["pembilang", "penyebut", "per"] : d.tipe === "pita" ? ["atas", "bawah", "sama"] : d.tipe === "lipat" ? ["besar", "kecil", "sama"] : ["kiri", "kanan", "tengah"];
  return sisipkan(k.nama, unik(semua, [k.nama]), geser);
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));
/** Teks pilihan klik yang benar. */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  return k && k.jenis === "nama" ? k.nama : null;
}

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : "gambar");
/** Kata untuk kertas yang dilipat: tahap lambang tidak punya benda. */
const benda = (rupa: Rupa): string => (rupa === "lambang" ? "pembagian" : "kertas");

/** Kalimat pembenaran setelah jawaban benar (diawali huruf kapital, netral terhadap rupa). */
export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "arsir":
      return cara === "klik"
        ? `Satu bagian dari ${d.n} bagian sama besar ditulis ${pec(d.n)}.`
        : cara === "kanvas"
          ? `Seluruhnya ada ${d.n} bagian sama besar, jadi penyebutnya ${d.n}.`
          : d.istilah === "penyebut"
            ? "Angka di bawah garis pecahan disebut penyebut, dan ia menunjukkan banyak bagian seluruhnya."
            : "Angka di atas garis pecahan disebut pembilang, dan ia menunjukkan banyak bagian yang diambil.";
    case "pita":
      return cara === "klik"
        ? `Hasilnya ${pec(d.a)} ${tandaBanding(d.a, d.b)} ${pec(d.b)}, karena penyebut yang lebih besar berarti bagian yang lebih kecil.`
        : cara === "kanvas"
          ? `Pecahan yang lebih besar adalah ${pec(Math.min(d.a, d.b))}, jadi penyebutnya ${Math.min(d.a, d.b)}.`
          : `Pecahan ${d.a < d.b ? "atas" : "bawah"} yang lebih besar, karena penyebutnya lebih kecil sehingga tiap bagiannya lebih besar.`;
    case "lipat":
      return cara === "klik"
        ? `Bagian kedua terbagi menjadi ${d.q} bagian sama besar, jadi satu bagian ditulis ${pec(d.q)}.`
        : cara === "kanvas"
          ? `Bagian kedua terbagi menjadi ${d.q} bagian, jadi ada ${d.q - 1} garis lipatan.`
          : `Bagian kedua terbagi menjadi ${d.q} bagian dan yang pertama ${d.p} bagian, jadi satu bagian kedua lebih ${d.q < d.p ? "besar" : "kecil"}.`;
    case "garisUrut":
      return `Urutan dari yang terkecil: ${teksUrut(urutTerkecil(d.urut))}. Makin besar penyebut, makin dekat pecahan ke nol.`;
    case "garisBagi":
      return `Garis terbagi menjadi ${d.n} bagian sama panjang, jadi penyebutnya ${d.n}.`;
    case "garisSisi":
      return `Pecahan ${pec(d.b)} letaknya di sebelah ${d.b > d.a ? "kiri" : "kanan"} ${pec(d.a)}, karena ${d.b > d.a ? "penyebutnya lebih besar sehingga pecahannya lebih kecil" : "penyebutnya lebih kecil sehingga pecahannya lebih besar"}.`;
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  const ob = benda(rupa);
  const aw = AWALAN[metode];
  switch (l.tipe) {
    case "arsir":
      if (cara === "klik") return rupa === "lambang" ? `${aw}: lihat ${g} ini. Satu bagian diambil dari bagian-bagian sama besar. Pecahan apa yang menyatakan bagian itu? Pilih jawabannya.` : `${aw}: lihat ${g} ini. Satu bagian diarsir dari bagian-bagian sama besar. Pecahan apa yang menyatakan bagian berarsir? Pilih jawabannya.`;
      if (cara === "kanvas") return rupa === "lambang" ? `${aw}: lihat ${g} ini. Berapa penyebut pecahan itu? Tulis satu angka di kanvas.` : `${aw}: lihat ${g} ini. Ada berapa bagian sama besar seluruhnya? Tulis satu angka di kanvas.`;
      return `${aw}: lihat ${g} ini. Angka ${l.istilah === "penyebut" ? "di bawah" : "di atas"} garis pecahan ditandai. Apa nama angka itu? Ucapkan satu kata.`;
    case "pita":
      return cara === "klik"
        ? `${aw}: lihat ${g} ini. Dua pecahan dibandingkan, yang atas dan yang bawah. Tanda apa yang tepat di antara keduanya? Pilih jawabannya.`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. Dua pecahan dibandingkan. Tulis penyebut pecahan yang lebih besar. Tulis satu angka di kanvas.`
          : `${aw}: lihat ${g} ini. Pecahan mana yang lebih besar, yang atas atau yang bawah? Ucapkan satu kata.`;
    case "lipat":
      return cara === "klik"
        ? `${aw}: lihat ${g} ini. ${kapital(ob)} pertama dan kedua dibagi menjadi bagian sama besar, dan satu bagian diambil dari tiap ${ob}. Pecahan apa yang menyatakan satu bagian ${ob} kedua? Pilih jawabannya.`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. ${kapital(ob)} kedua dibagi menjadi bagian sama besar lewat garis lipatan. Ada berapa garis lipatan pada ${ob} kedua? Tulis satu angka di kanvas.`
          : `${aw}: lihat ${g} ini. Bandingkan satu bagian ${ob} kedua dengan satu bagian ${ob} pertama. Satu bagian ${ob} kedua lebih besar atau lebih kecil? Ucapkan satu kata.`;
    case "garisUrut":
      return `${aw}: lihat ${g} ini. Tiga pecahan terletak pada garis dari nol sampai satu. Urutkan dari yang terkecil. Pilih jawabannya.`;
    case "garisBagi":
      return `${aw}: lihat ${g} ini. Garis dari nol sampai satu dibagi menjadi bagian sama panjang, dan satu titik ditandai. Titik itu menunjukkan pecahan berpembilang satu. Berapa penyebutnya? Tulis satu angka di kanvas.`;
    case "garisSisi":
      return `${aw}: lihat ${g} ini. Satu titik pada garis dari nol sampai satu ditandai. Pecahan ${kataPec(l.b)} terletak di sebelah kiri atau kanan titik itu? Ucapkan satu kata.`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "arsir":
      return cara === "klik" ? "Pecahan mana yang menyatakan satu bagian itu?" : cara === "kanvas" ? "Berapa banyak bagian sama besar seluruhnya?" : "Apa nama angka yang ditandai?";
    case "pita":
      return cara === "klik" ? "Tanda mana yang tepat?" : cara === "kanvas" ? "Berapa penyebut pecahan yang lebih besar?" : "Pecahan mana yang lebih besar?";
    case "lipat":
      return cara === "klik" ? "Pecahan mana yang menyatakan satu bagian kedua?" : cara === "kanvas" ? "Ada berapa garis lipatan pada yang kedua?" : "Satu bagian kedua lebih besar atau lebih kecil?";
    case "garisUrut":
      return "Urutan mana yang benar dari yang terkecil?";
    case "garisBagi":
      return "Berapa penyebut titik itu?";
    case "garisSisi":
      return "Di sebelah mana letaknya?";
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya tanpa menyebut jawaban (tanpa digit). `jawab`: kata, pecahan, atau tanda yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "arsir":
      return cara === "klik"
        ? "Hitung semua bagian sama besar, lalu tulis satu bagian dari seluruh bagian itu."
        : cara === "kanvas"
          ? "Hitung seluruh bagian sama besar, bukan hanya satu bagian."
          : l.istilah === "penyebut"
            ? "Angka di bawah garis pecahan menunjukkan banyak bagian seluruhnya. Ucapkan namanya."
            : "Angka di atas garis pecahan menunjukkan banyak bagian yang diambil. Ucapkan namanya.";
    case "pita":
      return cara === "klik"
        ? "Lihat penyebut kedua pecahan dan ingat: bagian yang lebih banyak membuat tiap bagian lebih kecil."
        : cara === "kanvas"
          ? "Cari pecahan yang tiap bagiannya lebih besar, lalu tulis penyebutnya."
          : "Bandingkan besar satu bagian pecahan atas dan pecahan bawah, lalu ucapkan satu kata.";
    case "lipat":
      return cara === "klik"
        ? "Hitung semua bagian sama besar pada yang kedua, lalu tulis satu bagian dari seluruh bagian itu."
        : cara === "kanvas"
          ? "Hitung garis lipatan di dalam yang kedua saja, tanpa garis tepi."
          : "Bandingkan banyak bagian yang kedua dengan yang pertama, lalu pikirkan besar tiap bagian.";
    case "garisUrut":
      return "Pecahan yang paling kecil letaknya paling dekat dengan nol. Urutkan dari sana ke kanan.";
    case "garisBagi":
      return "Hitung semua bagian sama panjang pada garis, bukan hanya titiknya.";
    case "garisSisi":
      return "Pecahan yang lebih kecil letaknya lebih dekat ke nol, yaitu di sebelah kiri.";
  }
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
/** Isi kartu kata untuk tahap Abstract (kata dan angka, tanpa emoji). */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  switch (l.tipe) {
    case "arsir":
      return cara === "klik"
        ? [`dibagi: ${l.n} bagian sama besar`, "diambil: 1 bagian", "pecahannya: ?"]
        : cara === "kanvas"
          ? [`pecahan: ${pec(l.n)}`, "penyebutnya: ?"]
          : [`pecahan: ${pec(l.n)}`, `angka di ${l.istilah === "penyebut" ? "bawah" : "atas"} garis pecahan: ?`];
    case "pita":
      return [`pecahan atas: ${pec(l.a)}`, `pecahan bawah: ${pec(l.b)}`, cara === "klik" ? "tanda: ?" : cara === "kanvas" ? "penyebut yang lebih besar: ?" : "yang lebih besar: ?"];
    case "lipat":
      return cara === "klik"
        ? [`pembagian pertama: ${l.p} bagian sama besar`, `pembagian kedua: ${l.q} bagian sama besar`, "satu bagian kedua: ?"]
        : cara === "kanvas"
          ? [`pembagian kedua: ${l.q} bagian sama besar`, "banyak garis lipatan: ?"]
          : [`pembagian pertama: ${l.p} bagian sama besar`, `pembagian kedua: ${l.q} bagian sama besar`, "satu bagian kedua dibanding pertama: ?"];
    case "garisUrut":
      return [`pecahan: ${l.urut.map(pec).join(", ")}`, "urutan dari yang terkecil: ?"];
    case "garisBagi":
      return [`garis dari 0 sampai 1 dibagi ${l.n} bagian sama panjang`, "titik pertama setelah 0 ada di 1/?"];
    case "garisSisi":
      return [`titik: ${pec(l.a)}`, `pecahan lain: ${pec(l.b)}`, "letaknya terhadap titik: ?"];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
