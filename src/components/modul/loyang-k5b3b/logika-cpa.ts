/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 5 Bab 3 Sub-Bab B "Roti Isi Pak Seno" (penjumlahan pecahan: penyebut sama, KPK, campuran, disederhanakan):
 * jenis tugas, jawaban benar, pilihan, instruksi (tanpa digit), petunjuk salah, dan kartu data. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-loyang-k5b3b.mjs.
 * Jawaban beragam: memilih (klik), menulis satu angka di kanvas, dan mengucapkan satu bilangan satu angka (rekam suara dengan pilihan ketuk). Jawaban benar dihitung dari data (logika-data.ts).
 * Empat metode tiap misi: IGIL "Jumlahkan Pembilang, Samakan Penyebut, Bulat Lalu Pecahan" (menggabung bagian loyang), Add the Tops (Jumlahkan Pembilang),
 * Match the Bottoms (Samakan Penyebut), Whole Then Part (Bulat Lalu Pecahan).
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { kataK5B3 } from "../eja-k5b3";
import { bentuk, hasilKeliru, jumlah, keBiasa, keCampur, kpk, satuanBahan, tCamp, tPec, type BarisBar, type Camp, type Pec } from "./logika-data";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
export const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

/** Nama bilangan dalam kata (tanpa digit). */
export const kataBil = (n: number): string => kataK5B3(n);
export const kata = kataBil;
/** Pecahan biasa dalam kata: "tiga per empat". */
export const kataPec = (n: number, d: number): string => `${kataBil(n)} per ${kataBil(d)}`;
/** Pecahan campuran dalam kata: "dua bulat tiga per empat". */
export const kataCamp = (c: Camp): string => (c.w === 0 ? kataPec(c.n, c.d) : c.n === 0 ? kataBil(c.w) : `${kataBil(c.w)} bulat ${kataPec(c.n, c.d)}`);
/** Angka, pecahan, dan tanda menjadi ucapan tanpa digit: "2 3/4 + 1/4 = 3" menjadi "dua bulat tiga per empat ditambah satu per empat sama dengan tiga". */
export const ucapkan = (t: string): string =>
  t
    .replace(/(\d+) (\d+)\/(\d+)/g, (_m, w: string, n: string, d: string) => kataCamp({ w: Number(w), n: Number(n), d: Number(d) }))
    .replace(/(\d+)\/(\d+)/g, (_m, n: string, d: string) => kataPec(Number(n), Number(d)))
    .replace(/\bKPK\b/g, "kelipatan persekutuan terkecil")
    .replace(/ \+ /g, " ditambah ")
    .replace(/ [−-] /g, " dikurangi ")
    .replace(/ = /g, " sama dengan ")
    .replace(/\d{1,3}(?:\.\d{3})+(?!\d)/g, (d) => kataBil(Number(d.replace(/\./g, ""))))
    .replace(/\d+/g, (d) => kataBil(Number(d)))
    .replace(/\s+/g, " ")
    .trim();

/* ------------------------------ Jenis tugas ------------------------------ */
/** Metode IGIL: menggabung dua bagian dari satu loyang yang dipotong `d` bagian sama besar (penyebut sama, jumlah kurang dari satu, hasil sudah sederhana). */
export type LIgil = { tipe: "igil"; a: number; b: number; d: number; bahan: string };
/** Add the Tops (Jumlahkan Pembilang): penyebut sama `d`; hasil disederhanakan (bisa lebih dari satu: pecahan campuran). */
export type LAtas = { tipe: "atas"; a: number; b: number; d: number; bahan: string };
/** Match the Bottoms (Samakan Penyebut): a/p + b/q dengan p dan q berbeda, disamakan lewat KPK. */
export type LBawah = { tipe: "bawah"; a: number; p: number; b: number; q: number; bahan: string };
/** Whole Then Part (Bulat Lalu Pecahan): dua pecahan campuran w1 n1/d1 + w2 n2/d2 (penyebut sama atau beda). */
export type LBulat = { tipe: "bulat"; w1: number; n1: number; d1: number; w2: number; n2: number; d2: number; bahan: string };
export type LangkahDasar = LIgil | LAtas | LBawah | LBulat;
/** Cari kesalahan: tokoh sudah menjawab dari `dasar` (klik). Anak memutuskan benar atau salah, memilih alasan, lalu menjawab sendiri. `jawabTokoh` adalah teks pilihan klik tokoh. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LAtas | LBawah | LBulat;
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
export type Metode = "igil" | "atas" | "bawah" | "bulat";
export const URUT_METODE: Metode[] = ["igil", "atas", "bawah", "bulat"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Jumlahkan Pembilang, Samakan Penyebut, Bulat Lalu Pecahan",
  atas: "Add the Tops: Jumlahkan Pembilang",
  bawah: "Match the Bottoms: Samakan Penyebut",
  bulat: "Whole Then Part: Bulat Lalu Pecahan",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F35E}", atas: "\u{2795}", bawah: "\u{1F517}", bulat: "\u{1F9C1}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", atas: "Add the Tops", bawah: "Match the Bottoms", bulat: "Whole Then Part" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/* ------------------------------ Hitungan ------------------------------ */
/** Hasil penjumlahan dalam bentuk paling sederhana. */
export function hasilDari(l: LangkahDasar): Pec {
  switch (l.tipe) {
    case "igil":
    case "atas":
      return jumlah({ n: l.a, d: l.d }, { n: l.b, d: l.d });
    case "bawah":
      return jumlah({ n: l.a, d: l.p }, { n: l.b, d: l.q });
    case "bulat":
      return jumlah(keBiasa({ w: l.w1, n: l.n1, d: l.d1 }), keBiasa({ w: l.w2, n: l.n2, d: l.d2 }));
  }
}
/** Hasil keliru "penyebut ikut dijumlahkan" (kesalahan Fajar), tampak masuk akal. */
function gabungKeliru(l: LangkahDasar): Camp | null {
  switch (l.tipe) {
    case "igil":
    case "atas":
      return { w: 0, n: l.a + l.b, d: l.d * 2 };
    case "bawah":
      return { w: 0, n: l.a + l.b, d: l.p + l.q };
    case "bulat":
      return { w: l.w1 + l.w2, n: l.n1 + l.n2, d: l.d1 + l.d2 };
  }
}
/** Tugas ini memuat dua pecahan berpenyebut sama atau beda? */
export const penyebutBeda = (l: LangkahDasar): boolean => (l.tipe === "bawah" ? l.p !== l.q : l.tipe === "bulat" ? l.d1 !== l.d2 : false);

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari data. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  const h = hasilDari(l);
  if (cara === "klik") return nama(bentuk(h));
  switch (l.tipe) {
    case "igil":
      return cara === "kanvas" ? angka(l.a + l.b) : angka(l.d - (l.a + l.b));
    case "atas":
      return cara === "kanvas" ? angka(l.a + l.b) : angka(l.d);
    case "bawah":
      return cara === "kanvas" ? angka(kpk(l.p, l.q)) : angka(h.n);
    case "bulat":
      return cara === "kanvas" ? angka(keCampur(h).w) : angka(keCampur(h).n);
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

/** Pilihan untuk tugas klik: jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k || k.jenis !== "nama") return [];
  const d = dasarDari(l);
  const lain = hasilKeliru(hasilDari(d), gabungKeliru(d)).filter((x) => x !== k.nama).slice(0, 2);
  /** Tempat jawaban benar berganti menurut jenis tugas (tengah, lalu terakhir), tidak pernah pertama. */
  const geser = ["igil", "atas", "bawah", "bulat"].indexOf(d.tipe);
  let hasil = sisipkan(k.nama, lain, geser);
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
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : rupa === "diagram" ? "bar" : "loyang");

/** Kalimat pembenaran setelah jawaban benar (diawali huruf kapital, tanpa menyebut gambar atau kotak pada tahap Abstract). */
export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  const h = hasilDari(d);
  switch (d.tipe) {
    case "igil": {
      const s = d.a + d.b;
      return cara === "klik"
        ? `Bagian yang diambil ${tPec(d.a, d.d)} + ${tPec(d.b, d.d)} = ${tPec(s, d.d)}, karena penyebutnya tetap.`
        : cara === "kanvas"
          ? `Terambil ${d.a} bagian dan ${d.b} bagian, jadi ${s} bagian dari ${d.d}.`
          : `Dari ${d.d} bagian, ${s} sudah terambil, jadi yang belum terambil ada ${d.d - s} bagian.`;
    }
    case "atas":
      return cara === "klik"
        ? `Pembilang ${d.a} + ${d.b} = ${d.a + d.b} dan penyebut tetap ${d.d}, jadi hasilnya ${bentuk(h)}.`
        : cara === "kanvas"
          ? `Jumlah pembilangnya ${d.a} + ${d.b} = ${d.a + d.b}.`
          : `Penyebut tidak berubah, tetap ${d.d}.`;
    case "bawah": {
      const m = kpk(d.p, d.q);
      return cara === "klik"
        ? `KPK ${d.p} dan ${d.q} adalah ${m}, jadi ${tPec((d.a * m) / d.p, m)} + ${tPec((d.b * m) / d.q, m)} = ${bentuk(h)}.`
        : cara === "kanvas"
          ? `KPK ${d.p} dan ${d.q} adalah ${m}.`
          : `Hasilnya ${bentuk(h)}, jadi pembilangnya ${h.n}.`;
    }
    case "bulat": {
      const c = keCampur(h);
      return cara === "klik"
        ? `Bilangan bulat ${d.w1} + ${d.w2} dan pecahan ${tPec(d.n1, d.d1)} + ${tPec(d.n2, d.d2)} digabung, hasilnya ${bentuk(h)}.`
        : cara === "kanvas"
          ? `Hasilnya ${bentuk(h)}, jadi bilangan bulatnya ${c.w}.`
          : `Hasilnya ${bentuk(h)}, jadi pembilang pecahannya ${c.n}.`;
    }
  }
}

/** Dua pecahan tugas dalam kata. */
function duaKata(l: LangkahDasar): [string, string] {
  switch (l.tipe) {
    case "igil":
    case "atas":
      return [kataPec(l.a, l.d), kataPec(l.b, l.d)];
    case "bawah":
      return [kataPec(l.a, l.p), kataPec(l.b, l.q)];
    case "bulat":
      return [kataCamp({ w: l.w1, n: l.n1, d: l.d1 }), kataCamp({ w: l.w2, n: l.n2, d: l.d2 })];
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit: bilangan dan pecahan ditulis dengan kata. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  return awalKapital(instruksiMentah(l, rupa, cara, metode));
}
/** Awal tiap kalimat berhuruf kapital (bilangan dalam kata muncul di awal kalimat). */
const awalKapital = (t: string): string => t.replace(/(^|[.?!] )([a-z])/g, (_, a: string, b: string) => a + b.toUpperCase());
function instruksiMentah(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  const aw = AWALAN[metode];
  const tulis = "Tulis satu angka di kanvas.";
  const ucap = "Sebutkan bilangannya.";
  const u = satuanBahan(l.bahan);
  const [A, B] = duaKata(l);
  const awal = `${aw}: lihat ${g} ini.`;
  switch (l.tipe) {
    case "igil": {
      const dasar = `Satu ${u} dipotong ${kata(l.d)} bagian sama besar. Citra mengambil ${kata(l.a)} dari ${kata(l.d)} bagian dan Bima mengambil ${kata(l.b)} dari ${kata(l.d)} bagian.`;
      return cara === "klik"
        ? `${awal} ${dasar} Pilih pecahan yang menyatakan bagian yang diambil keduanya.`
        : cara === "kanvas"
          ? `${awal} ${dasar} Berapa bagian yang terambil seluruhnya? ${tulis}`
          : `${awal} ${dasar} Berapa bagian yang belum terambil? ${ucap}`;
    }
    case "atas": {
      const dasar = `Pak Seno memakai ${A} ${u}, lalu ${B} ${u} lagi.`;
      return cara === "klik"
        ? `${awal} ${dasar} Pilih jumlahnya, dalam bentuk paling sederhana.`
        : cara === "kanvas"
          ? `${awal} ${dasar} Berapa jumlah kedua pembilangnya? ${tulis}`
          : `${awal} ${dasar} Berapa penyebut hasilnya? ${ucap}`;
    }
    case "bawah": {
      const dasar = `Pak Seno memakai ${A} ${u} dan ${B} ${u}. Penyebutnya berbeda.`;
      return cara === "klik"
        ? `${awal} ${dasar} Pilih jumlahnya, dalam bentuk paling sederhana.`
        : cara === "kanvas"
          ? `${awal} ${dasar} Berapa KPK kedua penyebutnya? ${tulis}`
          : `${awal} ${dasar} Berapa pembilang hasilnya, dalam bentuk paling sederhana? ${ucap}`;
    }
    case "bulat": {
      const dasar = `Pak Seno memakai ${A} ${u} dan ${B} ${u}.`;
      return cara === "klik"
        ? `${awal} ${dasar} Pilih jumlahnya sebagai pecahan campuran paling sederhana.`
        : cara === "kanvas"
          ? `${awal} ${dasar} Berapa bilangan bulat pada hasilnya? ${tulis}`
          : `${awal} ${dasar} Berapa pembilang pecahan pada hasilnya, dalam bentuk paling sederhana? ${ucap}`;
    }
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara, rupa?: Rupa): string {
  void rupa;
  const d = dasarDari(l);
  switch (d.tipe) {
    case "igil":
      return cara === "klik" ? "Bagian yang diambil keduanya yang mana?" : cara === "kanvas" ? "Berapa bagian yang terambil seluruhnya?" : "Berapa bagian yang belum terambil?";
    case "atas":
      return cara === "klik" ? "Jumlahnya yang mana?" : cara === "kanvas" ? "Berapa jumlah kedua pembilang?" : "Berapa penyebut hasilnya?";
    case "bawah":
      return cara === "klik" ? "Jumlahnya yang mana?" : cara === "kanvas" ? "Berapa KPK kedua penyebut?" : "Berapa pembilang hasilnya?";
    case "bulat":
      return cara === "klik" ? "Jumlahnya yang mana?" : cara === "kanvas" ? "Berapa bilangan bulat pada hasilnya?" : "Berapa pembilang pecahan pada hasilnya?";
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya tanpa menyebut jawaban (tanpa digit, tanpa bilangan dalam kata, tanpa menyebut gambar pada tahap Abstract). */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "igil":
      return cara === "klik"
        ? "Penyebut tetap karena ukuran potongan sama. Jumlahkan hanya bagian yang diambil."
        : cara === "kanvas"
          ? "Hitung semua bagian yang terambil, dari Citra dan dari Bima."
          : "Kurangi banyak bagian seluruhnya dengan bagian yang sudah terambil.";
    case "atas":
      return cara === "klik"
        ? "Penyebut yang sama tidak ikut dijumlahkan. Jumlahkan pembilangnya saja, lalu sederhanakan."
        : cara === "kanvas"
          ? "Jumlahkan angka di atas garis pecahan dari kedua pecahan."
          : "Ukuran potongan tidak berubah, jadi lihat lagi penyebut kedua pecahan.";
    case "bawah":
      return cara === "klik"
        ? "Samakan penyebut dengan KPK lebih dulu, lalu jumlahkan pembilangnya."
        : cara === "kanvas"
          ? "KPK adalah kelipatan persekutuan terkecil dari kedua penyebut."
          : "Setelah penyebut sama, jumlahkan pembilangnya, lalu sederhanakan hasilnya.";
    case "bulat":
      return cara === "klik"
        ? "Jumlahkan bilangan bulatnya sendiri dan pecahannya sendiri, lalu gabungkan dan sederhanakan."
        : cara === "kanvas"
          ? "Periksa apakah jumlah pecahannya sudah melebihi seluruhnya. Bila ya, tambahkan ke bilangan bulat."
          : "Sederhanakan pecahan pada hasil lebih dulu sebelum menyebut pembilangnya.";
  }
}

/* ------------------------------ Tampilan satu tugas ------------------------------ */
export type TampilanLoyang = { baris: BarisBar[]; mode: "loyang" | "bar"; judul: string; bahan: string };
/** Baris bar untuk satu tugas: dua pecahan (campuran digambar sebagai bar penuh ditambah satu bar pecahan), mode gambar, dan judul gambar. */
export function tampilan(l: LangkahDasar, cara: Cara, rupa: Rupa): TampilanLoyang {
  void cara;
  const mode = rupa === "benda" ? "loyang" : "bar";
  let baris: BarisBar[];
  switch (l.tipe) {
    case "igil":
    case "atas":
      baris = [
        { label: tPec(l.a, l.d), w: 0, n: l.a, d: l.d },
        { label: tPec(l.b, l.d), w: 0, n: l.b, d: l.d },
      ];
      break;
    case "bawah":
      baris = [
        { label: tPec(l.a, l.p), w: 0, n: l.a, d: l.p },
        { label: tPec(l.b, l.q), w: 0, n: l.b, d: l.q },
      ];
      break;
    case "bulat":
      baris = [
        { label: tCamp({ w: l.w1, n: l.n1, d: l.d1 }), w: l.w1, n: l.n1, d: l.d1 },
        { label: tCamp({ w: l.w2, n: l.n2, d: l.d2 }), w: l.w2, n: l.n2, d: l.d2 },
      ];
      break;
  }
  return { baris, mode, judul: `${l.bahan} ${baris[0].label} + ${baris[1].label}`, bahan: l.bahan };
}

/* ------------------------------ Kartu data (Abstract) ------------------------------ */
/** Isi kartu data untuk tahap Abstract (kata dan angka, tanpa emoji dan tanpa gambar). Tepat satu baris memuat tanda tanya. */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  const [t1, t2] = tampilan(l, "klik", "lambang").baris.map((b) => b.label);
  const dua = [`pecahan pertama: ${t1}`, `pecahan kedua: ${t2}`];
  switch (l.tipe) {
    case "igil":
      return [...dua, cara === "kanvas" ? "bagian terambil: ?" : cara === "suara" ? "bagian belum terambil: ?" : "jumlah bagian terambil: ?"];
    case "atas":
      return [...dua, cara === "kanvas" ? "jumlah pembilang: ?" : cara === "suara" ? "penyebut hasil: ?" : "jumlah disederhanakan: ?"];
    case "bawah":
      return [...dua, cara === "kanvas" ? "KPK penyebut: ?" : cara === "suara" ? "pembilang hasil: ?" : "jumlah disederhanakan: ?"];
    case "bulat":
      return [...dua, cara === "kanvas" ? "bilangan bulat hasil: ?" : cara === "suara" ? "pembilang pecahan hasil: ?" : "jumlah campuran: ?"];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
