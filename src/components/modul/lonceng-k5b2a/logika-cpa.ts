/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 5 Bab 2 Sub-Bab A "Lonceng Bu Marni" (kelipatan):
 * jenis tugas, jawaban benar, pilihan, instruksi (tanpa digit), petunjuk salah, dan kartu data. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-lonceng-k5b2a.mjs.
 * Jawaban beragam: memilih (klik), menulis SATU angka di kanvas (1 sampai 9), dan mengucapkan satu kata atau satu angka (rekam suara dengan pilihan ketuk).
 * Jawaban benar dihitung dari bilangan (logika-data.ts). Empat metode tiap misi: IGIL "Lompat Hitung, Warnai Tabel, Cek Kali" (kelipatan sebagai hasil kali),
 * Skip Counting (Lompat Hitung), Grid Marking (Warnai Tabel), Times Check (Cek Kali).
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { ejaK5B1 } from "../eja-k5b1";
import { adalahKelipatan, daftarKelipatan, hasilBagi, kapital, kata, lambang, sisaBagi, teksBagi } from "./logika-data";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";
export { kapital, kata } from "./logika-data";

export type Rupa = "benda" | "diagram" | "lambang";
export const kataBil = kata;
/** Angka dan tanda menjadi ucapan tanpa digit. */
export const ucapkan = (t: string): string => ejaK5B1(t).replace(/\s+/g, " ").trim();

/* ------------------------------ Jenis tugas ------------------------------ */
/** Metode IGIL: bunyi ke-p dari lonceng yang berbunyi tiap b satuan jatuh pada n = p kali b. Klik = n, kanvas = p (dari n), suara = kata "kelipatan". */
export type LIgil = { tipe: "igil"; b: number; p: number; satuan: string };
/** Skip Counting: lompat dengan jarak b dari nol. Klik = bilangan ke-p yang hilang, kanvas = jarak tiap lompatan (p lompatan sampai p kali b), suara = pendaratan pertama. */
export type LLompat = { tipe: "lompat"; b: number; p: number; satuan: string };
/** Grid Marking: tabel bilangan satu sampai `sampai`. Klik = bilangan n (kelipatan) yang ikut diwarnai, kanvas = banyak bilangan berwarna, suara = kotak n diwarnai, kosong, atau dicoret. */
export type LTabel = { tipe: "tabel"; b: number; sampai: number; n: number; satuan: string };
/** Times Check: n dibagi b. Klik = hasil pembagian dan kelipatan atau bukan, kanvas = sisa (n bukan kelipatan), suara = kelipatan atau bukan. */
export type LCek = { tipe: "cek"; b: number; n: number; satuan: string };
export type LangkahDasar = LIgil | LLompat | LTabel | LCek;
/** Cari kesalahan: tokoh sudah menjawab dari `dasar` (klik). Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LLompat | LTabel | LCek;
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
export type Metode = "igil" | "lompat" | "tabel" | "cek";
export const URUT_METODE: Metode[] = ["igil", "lompat", "tabel", "cek"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Lompat Hitung, Warnai Tabel, Cek Kali",
  lompat: "Skip Counting: Lompat Hitung",
  tabel: "Grid Marking: Warnai Tabel",
  cek: "Times Check: Cek Kali",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F514}", lompat: "\u{1F463}", tabel: "\u{1F3A8}", cek: "➗" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", lompat: "Skip Counting", tabel: "Grid Marking", cek: "Times Check" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);
/** Kelipatan ke-p (hasil kali) untuk tugas igil dan lompat. */
export const nIgil = (l: LIgil | LLompat): number => l.b * l.p;

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });
export const teksSatuan = (n: number, satuan: string): string => `${lambang(n)} ${satuan}`;
/** Kata jawaban suara untuk kotak tabel: diwarnai bila kelipatan, kosong bila bukan. */
export const nasibKotak = (n: number, b: number): "diwarnai" | "kosong" => (adalahKelipatan(n, b) ? "diwarnai" : "kosong");

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari bilangan. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "igil":
      return cara === "klik" ? nama(teksSatuan(nIgil(l), l.satuan)) : cara === "kanvas" ? angka(l.p) : nama("kelipatan");
    case "lompat":
      return cara === "klik" ? nama(teksSatuan(nIgil(l), l.satuan)) : angka(l.b);
    case "tabel":
      return cara === "klik" ? nama(lambang(l.n)) : cara === "kanvas" ? angka(daftarKelipatan(l.b, l.sampai).length) : nama(nasibKotak(l.n, l.b));
    case "cek":
      return cara === "klik" ? nama(teksBagi(l.n, l.b)) : cara === "kanvas" ? angka(sisaBagi(l.n, l.b)) : nama(adalahKelipatan(l.n, l.b) ? "kelipatan" : "bukan");
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
  const p = 1 + (geser % lain.length);
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
      const n = nIgil(d);
      const lain = unik([d.p + d.b, (d.p - 1) * d.b, (d.p + 1) * d.b + 1].filter((x) => x !== n)).slice(0, 2);
      hasil = sisipkan(k.nama, lain.map((x) => teksSatuan(x, d.satuan)), d.p + d.b);
      break;
    }
    case "lompat": {
      const n = nIgil(d);
      const lain = unik([(d.p - 1) * d.b + 1, (d.p + 1) * d.b, n + 1].filter((x) => x !== n)).slice(0, 2);
      hasil = sisipkan(k.nama, lain.map((x) => teksSatuan(x, d.satuan)), d.p);
      break;
    }
    case "tabel": {
      const lain = d.n + 2 <= d.sampai ? [d.n + 1, d.n + 2] : [d.n - 1, d.n - 2];
      hasil = sisipkan(k.nama, lain.map(lambang), d.n);
      break;
    }
    case "cek": {
      const s = sisaBagi(d.n, d.b);
      const sisaLain = (s % (d.b - 1)) + 1;
      const lain = s === 0 ? unik(["habis, kelipatan", "habis, bukan kelipatan", "bersisa 1, bukan kelipatan"].filter((x) => x !== k.nama)) : ["habis, kelipatan", teksBagi(d.n - s + sisaLain, d.b)];
      hasil = sisipkan(k.nama, lain.slice(0, 2), d.n + d.b);
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
    const lain = [k.n - 1, k.n - 2].filter((x) => x >= 1);
    return sisipkan(kata(k.n), lain.map(kata), k.n);
  }
  switch (d.tipe) {
    case "igil":
      return sisipkan(k.nama, ["sisa", "jumlah"], d.p);
    case "tabel":
      return sisipkan(k.nama, ["diwarnai", "kosong", "dicoret"].filter((x) => x !== k.nama), d.n);
    case "cek":
      return sisipkan(k.nama, [k.nama === "kelipatan" ? "bukan" : "kelipatan"], d.n);
    default:
      return sisipkan(k.nama, [k.nama === "kelipatan" ? "bukan" : "kelipatan"], d.b);
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
      return diagram ? "deret bilangan" : "deret lonceng";
    case "lompat":
      return diagram ? "garis lompat" : "tali lompat";
    case "tabel":
      return diagram ? "tabel bilangan" : "papan bilangan pasar";
    case "cek":
      return diagram ? "pita bagi" : "pita pasar";
  }
};

const urutDari = (n: number, b: number): number => n / b;

/** Kalimat pembenaran setelah jawaban benar (diawali huruf kapital, tanpa menyebut gambar). */
export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "igil":
      return cara === "klik"
        ? `${d.p} × ${d.b} = ${nIgil(d)}, jadi bunyi ke ${kata(d.p)} jatuh pada ${d.satuan} ke ${lambang(nIgil(d))}.`
        : cara === "kanvas"
          ? `${lambang(nIgil(d))} dibagi ${d.b} sama dengan ${d.p}, jadi itu bunyi ke ${kata(d.p)}.`
          : `${lambang(nIgil(d))} adalah ${d.p} × ${d.b}, hasil kali bilangan bulat dengan ${d.b}, jadi disebut kelipatan ${d.b}.`;
    case "lompat":
      return cara === "klik"
        ? `Tiap lompatan menambah ${d.b}, jadi pendaratan berikutnya ${lambang(nIgil(d))}.`
        : cara === "kanvas"
          ? `${lambang(nIgil(d))} dibagi ${d.p} lompatan sama dengan ${d.b}, jadi tiap lompatan berjarak ${d.b}.`
          : `Lompatan pertama mendarat di ${d.b}, karena lompatan kedua di ${2 * d.b} adalah dua kali jaraknya.`;
    case "tabel":
      return cara === "klik"
        ? `${lambang(d.n)} adalah ${urutDari(d.n, d.b)} × ${d.b}, jadi ikut diwarnai.`
        : cara === "kanvas"
          ? `Ada ${kata(daftarKelipatan(d.b, d.sampai).length)} kelipatan ${d.b} sampai ${d.sampai}.`
          : adalahKelipatan(d.n, d.b)
            ? `${lambang(d.n)} habis dibagi ${d.b}, jadi kotaknya diwarnai.`
            : `${lambang(d.n)} dibagi ${d.b} bersisa ${sisaBagi(d.n, d.b)}, jadi kotaknya dibiarkan kosong.`;
    case "cek": {
      const s = sisaBagi(d.n, d.b);
      return cara === "klik"
        ? s === 0 && d.n > 0
          ? `${lambang(d.n)} dibagi ${d.b} sama dengan ${hasilBagi(d.n, d.b)} tanpa sisa, jadi kelipatan ${d.b}.`
          : s === 0
            ? `Nol dibagi ${d.b} habis, tetapi nol bukan kelipatan.`
            : `${lambang(d.n)} dibagi ${d.b} bersisa ${s}, jadi bukan kelipatan ${d.b}.`
        : cara === "kanvas"
          ? `${lambang(d.n)} dibagi ${d.b} sama dengan ${hasilBagi(d.n, d.b)} dan bersisa ${s}.`
          : adalahKelipatan(d.n, d.b)
            ? `${lambang(d.n)} habis dibagi ${d.b}, jadi kelipatan ${d.b}.`
            : `${lambang(d.n)} dibagi ${d.b} bersisa ${s}, jadi bukan kelipatan ${d.b}.`;
    }
  }
}
/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(l, rupa);
  const aw = AWALAN[metode];
  const tulis = "Tulis satu angka di kanvas.";
  switch (l.tipe) {
    case "igil":
      return cara === "klik"
        ? `${aw}: lihat ${g} ini. Lonceng berbunyi tiap ${kata(l.b)} ${l.satuan}, mulai dari bunyi pertama. Bunyi ke ${kata(l.p)} jatuh pada ${l.satuan} ke berapa? Pilih jawabannya.`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. Lonceng berbunyi tiap ${kata(l.b)} ${l.satuan}, dan bunyi terakhir jatuh pada ${l.satuan} ke ${kata(nIgil(l))}. Itu bunyi ke berapa? ${tulis}`
          : `${aw}: lihat ${g} ini. Bunyi ke ${kata(l.p)} jatuh pada ${l.satuan} ke ${kata(nIgil(l))}, hasil ${kata(l.p)} dikali ${kata(l.b)}. Bilangan seperti itu disebut apa? Ucapkan satu kata.`;
    case "lompat":
      return cara === "klik"
        ? `${aw}: lihat ${g} ini. Tiap lompatan berjarak ${kata(l.b)} ${l.satuan}. Bilangan yang bertanda tanya jatuh di berapa? Pilih jawabannya.`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. Lompatan dari nol sampai ${kata(nIgil(l))} ${l.satuan} dibuat sama panjang. Berapa ${l.satuan} jarak tiap lompatan? ${tulis}`
          : `${aw}: lihat ${g} ini. Lompatan kedua mendarat di ${kata(2 * l.b)}. Lompatan pertama mendarat di bilangan berapa? Ucapkan angkanya.`;
    case "tabel":
      return cara === "klik"
        ? `${aw}: lihat ${g} ini. Kelipatan ${kata(l.b)} akan diwarnai. Bilangan mana yang ikut diwarnai? Pilih jawabannya.`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. Semua kelipatan ${kata(l.b)} sudah diwarnai. Berapa banyak bilangan berwarna? ${tulis}`
          : `${aw}: lihat ${g} ini. Kotak bertanda tanya memuat bilangan ${kata(l.n)}, dan kelipatan ${kata(l.b)} diwarnai. Kotak itu diwarnai, kosong, atau dicoret? Ucapkan satu kata.`;
    case "cek":
      return cara === "klik"
        ? `${aw}: lihat ${g} ini. ${kapital(kata(l.n))} ${l.satuan} dibagi ${kata(l.b)}. Bagaimana hasilnya? Pilih jawaban yang benar.`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. Pita sepanjang ${kata(l.n)} dipotong tiap ${kata(l.b)}. Berapa sisanya? ${tulis}`
          : `${aw}: lihat ${g} ini. Pita sepanjang ${kata(l.n)} dipotong tiap ${kata(l.b)}. Bilangan ${kata(l.n)} kelipatan ${kata(l.b)} atau bukan? Ucapkan satu kata.`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "igil":
      return cara === "klik" ? `Bunyi ke ${kata(d.p)} jatuh pada ${d.satuan} ke berapa?` : cara === "kanvas" ? "Itu bunyi ke berapa?" : "Bilangan itu disebut apa?";
    case "lompat":
      return cara === "klik" ? "Bilangan bertanda tanya itu berapa?" : cara === "kanvas" ? "Berapa jarak tiap lompatan?" : "Lompatan pertama mendarat di bilangan berapa?";
    case "tabel":
      return cara === "klik" ? "Bilangan mana yang ikut diwarnai?" : cara === "kanvas" ? "Berapa banyak bilangan berwarna?" : "Kotak itu diwarnai, kosong, atau dicoret?";
    case "cek":
      return cara === "klik" ? "Bagaimana hasil pembagiannya?" : cara === "kanvas" ? "Berapa sisanya?" : "Kelipatan atau bukan?";
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
        ? "Kelipatan didapat dengan mengalikan bunyi ke berapa dengan jaraknya, bukan menambahkannya."
        : cara === "kanvas"
          ? "Bagi bilangan bunyi terakhir dengan jarak antar bunyi, atau hitung bunyinya satu per satu."
          : "Hasil kali bilangan bulat dengan suatu bilangan punya nama khusus.";
    case "lompat":
      return cara === "klik"
        ? "Tiap lompatan menambah bilangan yang sama pada pendaratan sebelumnya."
        : cara === "kanvas"
          ? "Hitung dulu banyak lompatannya, lalu bagi panjang seluruhnya dengan banyak lompatan itu."
          : "Lompatan kedua sama dengan dua kali jarak lompat. Cari jaraknya dari situ.";
    case "tabel":
      return cara === "klik"
        ? "Bilangan yang diwarnai harus habis dibagi bilangan itu. Periksa tiap pilihan dengan pembagian."
        : cara === "kanvas"
          ? "Hitung satu per satu kotak yang berwarna."
          : "Periksa kotak itu dengan pembagian: ia diwarnai hanya bila habis dibagi tanpa sisa.";
    case "cek":
      return cara === "klik"
        ? "Bagi bilangan itu, lalu lihat apakah ada sisa. Ingat juga bahwa nol bukan kelipatan."
        : cara === "kanvas"
          ? "Potong pita tiap sebesar pembagi sampai sisanya lebih pendek dari satu potongan."
          : "Bilangan itu kelipatan hanya bila habis dibagi tanpa sisa.";
  }
}

/* ------------------------------ Kartu data (Abstract) ------------------------------ */
const deretTerbuka = (b: number, p: number): string => [...Array.from({ length: p - 1 }, (_, i) => String((i + 1) * b)), "?"].join(", ");

/** Isi kartu data untuk tahap Abstract (kata dan angka, tanpa emoji dan tanpa menyebut gambar). */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  switch (l.tipe) {
    case "igil":
      return cara === "kanvas"
        ? [`bunyi tiap: ${l.b} ${l.satuan}`, `bunyi terakhir: ${lambang(nIgil(l))} ${l.satuan}`, "bunyi ke: ?"]
        : cara === "suara"
          ? [`${l.p} × ${l.b} = ${nIgil(l)}`, "bilangan itu disebut: ?"]
          : [`bunyi tiap: ${l.b} ${l.satuan}`, `bunyi ke: ${l.p}`, `jatuh pada ${l.satuan} ke: ?`];
    case "lompat":
      return cara === "kanvas"
        ? [`dari 0 sampai ${lambang(nIgil(l))} ${l.satuan}`, `banyak lompatan sama panjang: ${l.p}`, "jarak tiap lompatan: ?"]
        : cara === "suara"
          ? [`lompatan ke-2: ${2 * l.b}`, "lompatan ke-1: ?"]
          : [`jarak tiap lompatan: ${l.b} ${l.satuan}`, `deret: ${deretTerbuka(l.b, l.p)}`, "bilangan bertanda ?: ?"];
    case "tabel":
      return cara === "kanvas"
        ? [`tabel bilangan: 1 sampai ${l.sampai}`, `diwarnai: kelipatan ${l.b}`, "banyak bilangan berwarna: ?"]
        : cara === "suara"
          ? [`kotak bertanda ?: ${lambang(l.n)}`, `diwarnai: kelipatan ${l.b}`, "kotak itu: ?"]
          : [`tabel bilangan: 1 sampai ${l.sampai}`, `diwarnai: kelipatan ${l.b}`, "bilangan ikut diwarnai: ?"];
    case "cek": {
      const dasar = `${lambang(l.n)} ${l.satuan} dibagi ${l.b}`;
      return cara === "kanvas" ? [dasar, `hasil bagi: ${hasilBagi(l.n, l.b)}`, "sisa: ?"] : cara === "suara" ? [dasar, "bilangan itu: ?"] : [dasar, "hasilnya: ?"];
    }
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
