/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 5 Bab 3 Sub-Bab C "Sisa Adonan Bu Nani" (pengurangan bilangan pecahan: model arsir,
 * penyebut sama, penyebut beda dengan KPK, pisah bulat dan pecahan, hasil disederhanakan): jenis tugas, jawaban benar, pilihan, instruksi (tanpa digit),
 * petunjuk salah, dan kartu data. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-adonan-k5b3c.mjs.
 * Jawaban beragam: memilih (klik), menulis satu angka di kanvas, dan mengucapkan satu bilangan satu angka (rekam suara dengan pilihan ketuk). Jawaban benar dihitung dari data (logika-data.ts).
 * Empat metode tiap misi: IGIL (membaca model arsir), Take Away the Tops (Kurangi Pembilang), Match and Take Away (Samakan Lalu Kurangi), Split Whole and Part (Pisah Bulat dan Pecahan).
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { kataK5B3 } from "../eja-k5b3";
import {
  keBiasa,
  kpk,
  pengecohIgil,
  pengecohPisah,
  pengecohSama,
  pengecohSamakan,
  sederhana,
  selisihBiasa,
  selisihPisah,
  stripBil,
  teksBil,
  teksPec,
  type Bil,
  type RangkaianBar,
} from "./logika-data";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
export const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

/** Nama bilangan dalam kata (tanpa digit). */
export const kataBil = (n: number): string => kataK5B3(n);
export const kata = kataBil;
/** Pecahan biasa dalam kata: "tiga per empat". */
export const kataPec = (p: number, q: number): string => `${kataBil(p)} per ${kataBil(q)}`;
/** Pecahan campuran dalam kata: "dua bulat tiga per empat". */
export const kataCampuran = (x: Bil): string => (x.p === 0 ? kataBil(x.b) : x.b === 0 ? kataPec(x.p, x.q) : `${kataBil(x.b)} bulat ${kataPec(x.p, x.q)}`);
/** Lambang dan angka menjadi ucapan tanpa digit: "2 3/4 − 1/2" menjadi "dua bulat tiga per empat dikurangi satu per dua". */
export const ucapkan = (t: string): string =>
  t
    .replace(/(\d+) (\d+)\/(\d+)/g, (_m, b: string, p: string, q: string) => `${kataBil(Number(b))} bulat ${kataPec(Number(p), Number(q))}`)
    .replace(/(\d+)\/(\d+)/g, (_m, p: string, q: string) => kataPec(Number(p), Number(q)))
    .replace(/\bKPK\b/g, "kelipatan persekutuan terkecil")
    .replace(/ [−-] /g, " dikurangi ")
    .replace(/ \+ /g, " ditambah ")
    .replace(/ = /g, " sama dengan ")
    .replace(/\d+/g, (d) => kataBil(Number(d)))
    .replace(/\s+/g, " ")
    .trim();

/* ------------------------------ Jenis tugas ------------------------------ */
/** Metode IGIL: membaca model arsir. Loyang dibagi `q` bagian sama besar, `a` bagian berisi, `c` bagian diambil (c < a). `item` memilih emoji kue pada tahap Concrete. */
export type LIgil = { tipe: "igil"; q: number; a: number; c: number; item: string };
/** Take Away the Tops (Kurangi Pembilang): `a` per `q` dikurangi `c` per `q` (penyebut sama). Klik = hasil paling sederhana, kanvas = pembilang hasil, suara = pembilang yang dikurangkan (periksa dengan penjumlahan). */
export type LSama = { tipe: "sama"; q: number; a: number; c: number; satuan: string };
/** Match and Take Away (Samakan Lalu Kurangi): `x` dikurangi `y` dengan penyebut berbeda. Klik = hasil paling sederhana, kanvas = KPK penyebut, suara = pembilang hasil setelah disamakan. */
export type LSamakan = { tipe: "samakan"; x: Bil; y: Bil; satuan: string };
/** Split Whole and Part (Pisah Bulat dan Pecahan): campuran `x` dikurangi campuran `y`. Klik = hasil paling sederhana, kanvas = bilangan bulat hasil, suara = pembilang pecahan hasil. */
export type LPisah = { tipe: "pisah"; x: Bil; y: Bil; satuan: string };
export type LangkahDasar = LIgil | LSama | LSamakan | LPisah;
export type DasarSalah = LSama | LSamakan | LPisah;
/** Cari kesalahan: tokoh sudah menjawab dari `dasar` (klik). Anak memutuskan benar atau salah, memilih alasan, lalu menjawab sendiri. `jawabTokoh` adalah teks pilihan klik tokoh. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: DasarSalah;
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
export type Metode = "igil" | "sama" | "samakan" | "pisah";
export const URUT_METODE: Metode[] = ["igil", "sama", "samakan", "pisah"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Kurangi Pembilang, Samakan Lalu Kurangi, Pisah Bulat dan Pecahan",
  sama: "Take Away the Tops: Kurangi Pembilang",
  samakan: "Match and Take Away: Samakan Lalu Kurangi",
  pisah: "Split Whole and Part: Pisah Bulat dan Pecahan",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F370}", sama: "\u{2796}", samakan: "\u{1F517}", pisah: "\u{2702}\u{FE0F}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", sama: "Take Away the Tops", samakan: "Match and Take Away", pisah: "Split Whole and Part" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/* ------------------------------ Hitungan tugas ------------------------------ */
/** Hasil tiap tugas, dihitung dari data (lihat logika-data.ts). */
export function hitungTugas(d: LangkahDasar): {
  /** Teks jawaban klik (paling sederhana). */
  teks: string;
  /** Jawaban kanvas. */
  kanvas: number;
  /** Jawaban suara. */
  suara: number;
} {
  switch (d.tipe) {
    case "igil":
      return { teks: teksPec(d.a - d.c, d.q), kanvas: d.a - d.c, suara: d.c };
    case "sama": {
      const s = sederhana(d.a - d.c, d.q);
      return { teks: teksPec(s.P, s.q), kanvas: d.a - d.c, suara: d.c };
    }
    case "samakan": {
      const r = selisihBiasa(d.x, d.y);
      return { teks: teksBil(r.hasil), kanvas: kpk(d.x.q, d.y.q), suara: r.Pn };
    }
    case "pisah": {
      const r = selisihPisah(d.x, d.y);
      return { teks: teksBil(r.hasil), kanvas: r.B, suara: r.n };
    }
  }
}

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari data. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  const h = hitungTugas(l);
  return cara === "klik" ? nama(h.teks) : cara === "kanvas" ? angka(h.kanvas) : angka(h.suara);
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
  const p = 1 + ((Math.imul(geser + 1, 2654435761) >>> 16) % lain.length);
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}
const unik = <T,>(daftar: T[]): T[] => daftar.filter((x, i, a) => a.indexOf(x) === i);

/** Pengecoh klik untuk satu tugas dasar (semuanya beda besar dengan jawaban benar). */
export function pengecohKlik(d: LangkahDasar): string[] {
  switch (d.tipe) {
    case "igil":
      return pengecohIgil(d.q, d.a, d.c);
    case "sama":
      return pengecohSama(d.q, d.a, d.c);
    case "samakan":
      return pengecohSamakan(d.x, d.y);
    case "pisah":
      return pengecohPisah(d.x, d.y);
  }
}
/** Bilangan tetap dari data tugas untuk menggeser letak jawaban benar (deterministik, tanpa acak saat render). */
const kodeTugas = (d: LangkahDasar): number => {
  const h = hitungTugas(d);
  return Array.from(`${d.tipe}${h.teks}`).reduce((t, c) => t + c.charCodeAt(0), h.kanvas);
};

/** Pilihan untuk tugas klik: jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k || k.jenis !== "nama") return [];
  const d = dasarDari(l);
  let hasil = sisipkan(k.nama, pengecohKlik(d).slice(0, 2), kodeTugas(d));
  if (l.tipe === "salah" && !hasil.includes(l.jawabTokoh)) {
    const ganti = hasil.map((x, i) => (x !== k.nama ? i : -1)).filter((i) => i >= 0).pop() ?? -1;
    hasil = hasil.map((x, i) => (i === ganti ? l.jawabTokoh : x));
  }
  return hasil;
}
/** Pilihan cadangan untuk tugas suara (tiga bilangan dalam kata). Jawaban benar tidak pernah di tempat pertama. */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  if (cara !== "suara") return [];
  const k = kunciJawab(l, cara);
  if (!k || k.jenis !== "angka") return [];
  const lain = unik([k.n + 1, k.n - 1, k.n + 2, k.n - 2, k.n + 3, k.n - 3].filter((x) => x >= 1 && x <= 9)).slice(0, 2).map(kataBil);
  return sisipkan(kataBil(k.n), lain, k.n);
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));
/** Teks pilihan klik yang benar. */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  return k && k.jenis === "nama" ? k.nama : null;
}

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : rupa === "diagram" ? "bar pecahan" : "loyang");
const wujud = (rupa: Rupa): string => (rupa === "diagram" ? "Bar" : "Loyang");
const dengan = (x: Bil, satuan: string): string => `${teksBil(x)} ${satuan}`;
const tampilSederhana = (P: number, q: number): string => {
  const s = sederhana(P, q);
  return s.P === P ? "" : `, disederhanakan menjadi ${teksPec(s.P, s.q)}`;
};

/** Kalimat pembenaran setelah jawaban benar (diawali huruf kapital, tanpa menyebut gambar atau kisi pada tahap Abstract). */
export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "igil": {
      const s = d.a - d.c;
      return cara === "klik"
        ? `Dari ${d.q} bagian, ${d.a} berisi dan ${d.c} diambil, jadi tinggal ${s} bagian, yaitu ${teksPec(s, d.q)}.`
        : cara === "kanvas"
          ? `Bagian berisi ${d.a} dikurangi ${d.c} yang diambil, tinggal ${s} bagian.`
          : `Yang diambil ${d.c} bagian, karena ${s} + ${d.c} = ${d.a}.`;
    }
    case "sama": {
      const s = d.a - d.c;
      return cara === "klik"
        ? `Penyebutnya sama, jadi pembilang dikurangkan: ${d.a} - ${d.c} = ${s}, hasilnya ${teksPec(s, d.q)}${tampilSederhana(s, d.q)}.`
        : cara === "kanvas"
          ? `Pembilangnya ${d.a} - ${d.c} = ${s}, dan penyebut tetap ${d.q}.`
          : `Pembilang yang dikurangkan ${d.c}, karena ${s} + ${d.c} = ${d.a}.`;
    }
    case "samakan": {
      const r = selisihBiasa(d.x, d.y);
      const adaBulat = d.x.b > 0 || d.y.b > 0;
      return cara === "klik"
        ? `${adaBulat ? "Diubah ke pecahan biasa, lalu penyebut" : "Penyebut"} disamakan dengan KPK ${r.m}: ${teksPec(r.Px, r.m)} - ${teksPec(r.Py, r.m)} = ${teksPec(r.Pn, r.m)}${tampilSederhana(r.Pn, r.m)}${r.hasil.b > 0 ? `, yaitu ${teksBil(r.hasil)}` : ""}.`
        : cara === "kanvas"
          ? `KPK dari ${d.x.q} dan ${d.y.q} adalah ${r.m}.`
          : `Setelah penyebut disamakan menjadi ${r.m}, pembilang hasilnya ${r.Px} - ${r.Py} = ${r.Pn}.`;
    }
    case "pisah": {
      const r = selisihPisah(d.x, d.y);
      return cara === "klik"
        ? `Bulatnya ${d.x.b} - ${d.y.b} = ${r.B}, pecahannya menjadi ${teksPec(r.n, r.m)}${tampilSederhana(r.n, r.m)}, jadi hasilnya ${teksBil(r.hasil)}.`
        : cara === "kanvas"
          ? `Bilangan bulatnya ${d.x.b} - ${d.y.b} = ${r.B}.`
          : `Pecahannya disamakan ke penyebut ${r.m}, dan pembilang hasilnya ${r.n}.`;
    }
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit: bilangan ditulis dengan kata. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  return awalKapital(instruksiMentah(l, rupa, cara, metode));
}
/** Awal tiap kalimat berhuruf kapital (bilangan dalam kata muncul di awal kalimat). */
const awalKapital = (t: string): string => t.replace(/(^|[.?!] )([a-z])/g, (_, a: string, b: string) => a + b.toUpperCase());
function instruksiMentah(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const aw = AWALAN[metode];
  const tulis = "Tulis satu angka di kanvas.";
  const ucap = "Sebutkan bilangannya.";
  const awal = `${aw}: lihat ${sebut(rupa)} ini.`;
  const W = wujud(rupa);
  const kb = (x: Bil, u: string): string => `${kataCampuran(x)} ${u}`;
  switch (l.tipe) {
    case "igil": {
      const s = l.a - l.c;
      const dasar = `${W} dibagi ke ${kata(l.q)} bagian sama besar`;
      return cara === "klik"
        ? `${awal} ${dasar}: ${kata(l.a)} bagian berisi, lalu ${kata(l.c)} bagian diambil. Pilih pecahan yang tinggal.`
        : cara === "kanvas"
          ? `${awal} ${dasar}: ${kata(l.a)} bagian berisi, lalu ${kata(l.c)} bagian diambil. Tinggal berapa bagian? ${tulis}`
          : `${awal} ${dasar} dan ${kata(l.a)} bagian berisi. Setelah sebagian diambil, tinggal ${kata(s)} bagian. Berapa bagian yang diambil? ${ucap}`;
    }
    case "sama": {
      const s = l.a - l.c;
      const u = l.satuan;
      return cara === "klik"
        ? `${awal} ${kataPec(l.a, l.q)} ${u} dikurangi ${kataPec(l.c, l.q)} ${u}. Pilih hasilnya dalam bentuk paling sederhana.`
        : cara === "kanvas"
          ? `${awal} ${kataPec(l.a, l.q)} ${u} dikurangi ${kataPec(l.c, l.q)} ${u}. Berapa pembilang hasilnya sebelum disederhanakan? ${tulis}`
          : `${awal} ${kataPec(l.a, l.q)} ${u} dikurangi sebagian, dan hasilnya ${kataPec(s, l.q)} ${u}. Berapa pembilang yang dikurangkan? ${ucap}`;
    }
    case "samakan": {
      const ada = l.x.b > 0 || l.y.b > 0;
      const soal = `${kb(l.x, l.satuan)} dikurangi ${kb(l.y, l.satuan)}`;
      return cara === "klik"
        ? `${awal} ${soal}. ${ada ? "Ubah ke pecahan biasa, lalu samakan penyebutnya" : "Penyebutnya berbeda, jadi samakan dulu"}. Pilih hasilnya dalam bentuk paling sederhana.`
        : cara === "kanvas"
          ? `${awal} ${soal}. Berapa KPK kedua penyebutnya? ${tulis}`
          : `${awal} ${soal}. Setelah penyebutnya disamakan dengan KPK, berapa pembilang hasilnya? ${ucap}`;
    }
    case "pisah": {
      const soal = `${kb(l.x, l.satuan)} dikurangi ${kb(l.y, l.satuan)}`;
      return cara === "klik"
        ? `${awal} ${soal}. Pisahkan bilangan bulat dan pecahannya. Pilih hasilnya dalam bentuk paling sederhana.`
        : cara === "kanvas"
          ? `${awal} ${soal}. Berapa bilangan bulat hasilnya? ${tulis}`
          : `${awal} ${soal}. Setelah penyebut pecahannya disamakan, berapa pembilang pecahan hasilnya? ${ucap}`;
    }
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara, rupa?: Rupa): string {
  void rupa;
  const d = dasarDari(l);
  switch (d.tipe) {
    case "igil":
      return cara === "klik" ? "Pecahan yang tinggal yang mana?" : cara === "kanvas" ? "Tinggal berapa bagian?" : "Berapa bagian yang diambil?";
    case "sama":
      return cara === "klik" ? "Hasil paling sederhana yang mana?" : cara === "kanvas" ? "Berapa pembilang hasilnya?" : "Berapa pembilang yang dikurangkan?";
    case "samakan":
      return cara === "klik" ? "Hasil paling sederhana yang mana?" : cara === "kanvas" ? "Berapa KPK penyebutnya?" : "Berapa pembilang hasilnya?";
    case "pisah":
      return cara === "klik" ? "Hasil paling sederhana yang mana?" : cara === "kanvas" ? "Berapa bilangan bulat hasilnya?" : "Berapa pembilang pecahan hasilnya?";
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya tanpa menyebut jawabannya (tanpa digit, tanpa bilangan dalam kata, tanpa menyebut gambar pada tahap Abstract). `jawab`: pilihan atau kata yang diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "igil":
      return cara === "klik"
        ? "Bagian yang diambil dikurangkan dari bagian yang berisi, dan banyak bagian loyang tidak berubah."
        : cara === "kanvas"
          ? "Kurangkan banyak bagian yang diambil dari banyak bagian yang berisi."
          : "Banyak bagian yang diambil ditambah sisanya harus sama dengan bagian yang berisi.";
    case "sama":
      return cara === "klik"
        ? "Penyebutnya sudah sama, jadi hanya pembilang yang dikurangkan. Jangan lupa menyederhanakan hasilnya."
        : cara === "kanvas"
          ? "Kurangkan pembilang kedua pecahan, karena penyebutnya sudah sama."
          : "Pembilang hasil ditambah pembilang yang dikurangkan harus sama dengan pembilang semula.";
    case "samakan":
      return cara === "klik"
        ? "Samakan dulu penyebutnya dengan KPK, ubah kedua pembilangnya, lalu kurangkan dan sederhanakan."
        : cara === "kanvas"
          ? "KPK adalah kelipatan persekutuan yang paling kecil dari kedua penyebut."
          : "Ubah dulu kedua pembilang ke penyebut yang sama, baru kurangkan.";
    case "pisah":
      return cara === "klik"
        ? "Kurangkan bilangan bulatnya sendiri dan pecahannya sendiri, lalu gabungkan dan sederhanakan."
        : cara === "kanvas"
          ? "Bilangan bulat hasil didapat dari bilangan bulat pertama dikurangi bilangan bulat kedua."
          : "Samakan dulu penyebut kedua pecahan, lalu kurangkan pembilangnya.";
  }
}

/* ------------------------------ Tampilan satu tugas ------------------------------ */
export type TampilanAdonan = { mode: "loyang" | "bar"; rangkaian: RangkaianBar[]; judul: string; item: string };
/** Gambar satu tugas: bar pecahan yang digambar sungguh sesuai data (Concrete memakai kue beremoji, Pictorial memakai bar polos). */
export function tampilan(l: LangkahDasar, rupa: Rupa): TampilanAdonan {
  const mode = rupa === "benda" ? "loyang" : "bar";
  switch (l.tipe) {
    case "igil":
      return { mode, item: l.item, judul: `${mode === "bar" ? "bar" : "loyang"} ${l.q} bagian`, rangkaian: [{ label: "berisi dan dicoret", strip: [{ q: l.q, isi: l.a - l.c, coret: l.c }] }] };
    case "sama":
      return {
        mode,
        item: "kue",
        judul: "persediaan dan pesanan",
        rangkaian: [
          { label: "persediaan", strip: [{ q: l.q, isi: l.a, coret: 0 }] },
          { label: "diambil", strip: [{ q: l.q, isi: l.c, coret: 0, jenis: "ambil" }] },
        ],
      };
    case "samakan":
    case "pisah":
      return {
        mode,
        item: l.tipe === "pisah" ? "roti" : "kue",
        judul: "persediaan dan pesanan",
        rangkaian: [
          { label: "persediaan", strip: stripBil(l.x, "ada") },
          { label: "diambil", strip: stripBil(l.y, "ambil") },
        ],
      };
  }
}

/* ------------------------------ Kartu data (Abstract) ------------------------------ */
/** Isi kartu data untuk tahap Abstract (kata dan angka, tanpa emoji dan tanpa gambar). Tepat satu baris memuat tanda tanya. */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  switch (l.tipe) {
    case "igil": {
      const s = l.a - l.c;
      return cara === "suara"
        ? [`loyang dibagi: ${l.q} bagian`, `bagian berisi: ${l.a}`, `tinggal: ${s} bagian`, "bagian diambil: ?"]
        : [`loyang dibagi: ${l.q} bagian`, `bagian berisi: ${l.a}`, `bagian diambil: ${l.c}`, cara === "kanvas" ? "tinggal: ? bagian" : "pecahan yang tinggal: ?"];
    }
    case "sama": {
      const s = l.a - l.c;
      return cara === "suara"
        ? [`persediaan: ${teksPec(l.a, l.q)} ${l.satuan}`, `hasil: ${teksPec(s, l.q)} ${l.satuan}`, "pembilang yang dikurangkan: ?"]
        : [`persediaan: ${teksPec(l.a, l.q)} ${l.satuan}`, `diambil: ${teksPec(l.c, l.q)} ${l.satuan}`, cara === "kanvas" ? "pembilang hasil: ?" : "hasil paling sederhana: ?"];
    }
    case "samakan": {
      const m = kpk(keBiasa(l.x).q, keBiasa(l.y).q);
      const dasar = [`persediaan: ${dengan(l.x, l.satuan)}`, `diambil: ${dengan(l.y, l.satuan)}`];
      return cara === "kanvas" ? [...dasar, "KPK kedua penyebut: ?"] : cara === "suara" ? [...dasar, `penyebut bersama: ${m}`, "pembilang hasil: ?"] : [...dasar, "hasil paling sederhana: ?"];
    }
    case "pisah": {
      const m = kpk(l.x.q, l.y.q);
      const dasar = [`persediaan: ${dengan(l.x, l.satuan)}`, `diambil: ${dengan(l.y, l.satuan)}`];
      return cara === "kanvas" ? [...dasar, "bilangan bulat hasil: ?"] : cara === "suara" ? [...dasar, `penyebut bersama: ${m}`, "pembilang pecahan hasil: ?"] : [...dasar, "hasil paling sederhana: ?"];
    }
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
