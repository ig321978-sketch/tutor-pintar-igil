/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract K4 Bab 2 Sub-Bab B "Bak Warna Pak Joyo" (membandingkan dan mengurutkan pecahan berpenyebut sama):
 * jenis tugas, jawaban benar, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-warna-k4b2b.mjs.
 * Jawaban beragam: memilih tanda, pecahan, atau urutan (klik), menulis satu angka di kanvas (pembilang, selisih, banyak bagian, tanda ke berapa), dan mengucapkan satu kata
 * (kurang dari, lebih dari, sama dengan, pembilang, penyebut, atas, bawah, terkecil, terbesar). Jawaban benar dihitung dari data.
 * Empat metode tiap misi: IGIL "Banding Pembilang, Batang Pecahan, Urut di Garis", Compare Numerators (Banding Pembilang), Fraction Bars (Batang Pecahan), Order on Line (Urut di Garis).
 * Umpan balik tidak menyebut gambar, petak, atau kisi (supaya cocok untuk tahap Abstract) dan tidak membocorkan jawaban sebelum tugas benar.
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { ejaK4B2, kataBilK4B2 } from "../eja-k4b2";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

/* ------------------------------ Bilangan, pecahan, dan kata ------------------------------ */
/** Nama bilangan 0 sampai 9.999 dalam kata (tanpa digit). */
export const kataBil = (n: number): string => kataBilK4B2(n);
export const kata = kataBil;
/** Pecahan tertulis: 3 dan 8 menjadi "3/8". */
export const pec = (p: number, q: number): string => `${p}/${q}`;
/** Pecahan dalam kata: "tiga per delapan". */
export const sebutPec = (p: number, q: number): string => `${kata(p)} per ${kata(q)}`;
/** Ubah teks berangka menjadi ucapan tanpa digit: "3/8, 5/8" menjadi kata, tanda tunggal "<" menjadi "kurang dari". */
export function ucapkan(t: string): string {
  const s = t.trim();
  if (s === "<") return "kurang dari";
  if (s === ">") return "lebih dari";
  if (s === "=") return "sama dengan";
  return ejaK4B2(s).replace(/\s+/g, " ").trim();
}

/* ------------------------------ Data ------------------------------ */
export type Arah = "naik" | "turun";
export type Ujung = "kecil" | "besar";
export type Tanda = "<" | ">" | "=";
export const NAMA_TANDA: Record<Tanda, string> = { "<": "kurang dari", ">": "lebih dari", "=": "sama dengan" };
export const tandaDari = (a: number, b: number): Tanda => (a < b ? "<" : a > b ? ">" : "=");
export const urutkan = (d: readonly number[], arah: Arah = "naik"): number[] => [...d].sort((a, b) => (arah === "naik" ? a - b : b - a));
export const teksUrut = (d: readonly number[], q: number, arah: Arah): string => urutkan(d, arah).map((n) => pec(n, q)).join(", ");

/* ------------------------------ Jenis tugas (semua pecahan berpenyebut sama `q`, tinggal pembilang) ------------------------------ */
/** Metode IGIL: dua pecahan berpenyebut sama dibandingkan lewat pembilang (klik: tanda, kanvas: pembilang yang lebih besar, suara: kurang dari, lebih dari, atau sama dengan). */
export type LBanding = { tipe: "banding"; benda: string; q: number; a: number; b: number; cerita?: CeritaBanding };
/** Soal cerita seperti di buku (mis. dua tongkat tiga per enam meter dan dua per enam meter): pemilik pecahan pertama dan kedua, kata kerja sebelum pecahan, satuan, dan sifat yang dibandingkan. */
export type CeritaBanding = { a: string; b: string; kerja: string; satuan: string; sifat: string };
/** Kalimat cerita dengan pecahan ditulis "3/6" (untuk layar). */
export const teksCerita = (l: LBanding): string[] => (l.cerita ? [`${l.cerita.a} ${l.cerita.kerja} ${pec(l.a, l.q)} ${l.cerita.satuan}.`, `${l.cerita.b} ${l.cerita.kerja} ${pec(l.b, l.q)} ${l.cerita.satuan}.`] : []);
/** Kalimat cerita untuk suara (pecahan dieja). */
export const suaraCerita = (l: LBanding): string => (l.cerita ? `${l.cerita.a} ${l.cerita.kerja} ${sebutPec(l.a, l.q)} ${l.cerita.satuan}, dan ${l.cerita.b} ${l.cerita.kerja} ${sebutPec(l.b, l.q)} ${l.cerita.satuan}.` : "");
/** Compare Numerators: hanya pembilang yang dibandingkan (klik: pecahan yang lebih besar atau kecil, kanvas: selisih pembilang, suara: kata pembilang). */
export type LPembilang = { tipe: "pembilang"; benda: string; q: number; a: number; b: number; cari: Ujung };
/** Fraction Bars: dua batang sama panjang, bagian berarsir sebanyak pembilang (klik: pecahan batang atas, kanvas: bagian berarsir batang bawah, suara: batang yang lebih banyak arsirannya, atas atau bawah). */
export type LBatang = { tipe: "batang"; benda: string; q: number; a: number; b: number };
/** Order on Line: tiga pecahan pada garis dari nol sampai satu (klik: urutan, kanvas: tanda ke berapa titik yang ditandai, suara: titik bertanda terkecil atau terbesar). `tandai` = indeks titik bertanda. */
export type LGaris = { tipe: "garis"; benda: string; q: number; data: number[]; arah: Arah; tandai: number };
export type LangkahDasar = LBanding | LPembilang | LBatang | LGaris;
/** Cari kesalahan: tokoh sudah menjawab dari `dasar`. Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. `jawabTokoh` memakai teks pilihan klik ("<", "3/8"). */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LBanding;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "pembilang" | "batang" | "garis";
export const URUT_METODE: Metode[] = ["igil", "pembilang", "batang", "garis"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Banding Pembilang, Batang Pecahan, Urut di Garis",
  pembilang: "Compare Numerators: Banding Pembilang",
  batang: "Fraction Bars: Batang Pecahan",
  garis: "Order on Line: Urut di Garis",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F3A8}", pembilang: "\u{1F4A7}", batang: "\u{1F9EA}", garis: "\u{1F9F5}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", pembilang: "Compare Numerators", batang: "Fraction Bars", garis: "Order on Line" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? { ...l.dasar } : l);

export const terkecil = (d: readonly number[]): number => Math.min(...d);
export const terbesar = (d: readonly number[]): number => Math.max(...d);
/** Titik bertanda pada garis adalah terkecil atau terbesar? (hanya salah satu yang boleh dipakai untuk tugas suara). */
export const ujungTandai = (l: LGaris): "terkecil" | "terbesar" | null => (l.data[l.tandai] === terkecil(l.data) ? "terkecil" : l.data[l.tandai] === terbesar(l.data) ? "terbesar" : null);

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari data. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "banding":
      return cara === "klik" ? nama(tandaDari(l.a, l.b)) : cara === "kanvas" ? angka(Math.max(l.a, l.b)) : nama(NAMA_TANDA[tandaDari(l.a, l.b)]);
    case "pembilang":
      return cara === "klik" ? nama(pec(l.cari === "besar" ? Math.max(l.a, l.b) : Math.min(l.a, l.b), l.q)) : cara === "kanvas" ? angka(Math.abs(l.a - l.b)) : nama("pembilang");
    case "batang":
      return cara === "klik" ? nama(pec(l.a, l.q)) : cara === "kanvas" ? angka(l.b) : nama(l.a > l.b ? "atas" : "bawah");
    case "garis": {
      if (cara === "klik") return nama(teksUrut(l.data, l.q, l.arah));
      if (cara === "kanvas") return angka(l.data[l.tandai]);
      const u = ujungTandai(l);
      return u === null ? null : nama(u);
    }
  }
}

/** Apakah tugas langsung siap dijawab? Semua tugas punya jawaban, kecuali Cari kesalahan yang memakai kegiatan lebih dulu. Tidak bergantung pada rupa. */
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
/** Dua urutan keliru untuk pilihan klik tugas garis: arah kebalikan, urutan asli (belum diurutkan), atau dua pecahan bertukar. */
function urutanKeliru(l: LGaris): string[] {
  const benar = teksUrut(l.data, l.q, l.arah);
  const lawan = teksUrut(l.data, l.q, l.arah === "naik" ? "turun" : "naik");
  const asli = l.data.map((n) => pec(n, l.q)).join(", ");
  const tukar = (() => {
    const b = urutkan(l.data, l.arah);
    [b[1], b[2]] = [b[2], b[1]];
    return b.map((n) => pec(n, l.q)).join(", ");
  })();
  const hasil: string[] = [];
  for (const s of [lawan, asli, tukar]) if (s !== benar && !hasil.includes(s)) hasil.push(s);
  return hasil.slice(0, 2);
}
/** Dua pecahan keliru untuk pilihan klik tugas batang: bagian yang tidak diwarnai, pecahan batang lain, atau satu bagian lebih. */
function batangKeliru(l: LBatang): string[] {
  const benar = pec(l.a, l.q);
  const hasil: string[] = [];
  for (const s of [pec(l.q - l.a, l.q), pec(l.b, l.q), pec(Math.min(l.a + 1, l.q - 1), l.q), pec(Math.max(l.a - 1, 1), l.q)]) if (s !== benar && !hasil.includes(s)) hasil.push(s);
  return hasil.slice(0, 2);
}

/** Tiga pilihan untuk tugas klik: jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k || k.jenis !== "nama") return [];
  const d = dasarDari(l);
  let pil: string[];
  switch (d.tipe) {
    case "banding":
      /* Tiga tanda: urutan tetap menurut jawaban benar, yang benar di tempat kedua atau ketiga. */
      pil = k.nama === "<" ? [">", "=", "<"] : k.nama === ">" ? ["<", ">", "="] : [">", "=", "<"];
      break;
    case "pembilang": {
      const lain = [pec(d.cari === "besar" ? Math.min(d.a, d.b) : Math.max(d.a, d.b), d.q), "sama besar"];
      pil = sisipkan(k.nama, lain, d.a + d.b);
      break;
    }
    case "batang":
      pil = sisipkan(k.nama, batangKeliru(d), d.a + d.b);
      break;
    case "garis":
      pil = sisipkan(k.nama, urutanKeliru(d), d.data[0] + d.data[1]);
      break;
  }
  if (l.tipe === "salah" && !pil.includes(l.jawabTokoh)) {
    const ganti = pil.findIndex((x) => x !== k.nama);
    pil = pil.map((x, q) => (q === ganti ? l.jawabTokoh : x));
  }
  return pil;
}
/** Pilihan cadangan untuk tugas suara (kata): dua kata (jawaban benar selalu kedua). */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k || k.jenis !== "nama") return [];
  const pasangan =
    k.nama === "kurang dari" ? "lebih dari" : k.nama === "lebih dari" ? "kurang dari" : k.nama === "sama dengan" ? "lebih dari" : k.nama === "pembilang" ? "penyebut" : k.nama === "atas" ? "bawah" : k.nama === "bawah" ? "atas" : k.nama === "terkecil" ? "terbesar" : "terkecil";
  return [pasangan, k.nama];
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));
/** Teks pilihan klik yang benar (tanda, pecahan, atau urutan). */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  if (!k) return null;
  return k.jenis === "nama" ? k.nama : String(k.n);
}

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : "gambar");
const namaArah = (a: Arah): string => (a === "naik" ? "yang terkecil ke yang terbesar" : "yang terbesar ke yang terkecil");

/** Penjelasan setelah jawaban benar. Tanpa digit dan tanpa kata gambar, petak, atau kisi. */
export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  const k = kunciJawab(d, cara);
  const n = k?.jenis === "angka" ? k.n : 0;
  switch (d.tipe) {
    case "banding": {
      if (d.a === d.b) return `Penyebutnya sama dan pembilangnya sama, jadi kedua pecahan sama besar. ${kapital(sebutPec(d.a, d.q))} sama dengan ${sebutPec(d.b, d.q)}.`;
      const dasar = `Penyebutnya sama, jadi bagiannya sama besar. Pembilang ${kata(d.a)} ${d.a < d.b ? "lebih kecil" : "lebih besar"} daripada pembilang ${kata(d.b)}.`;
      if (d.cerita && cara === "suara") return `${dasar} Jadi ${d.cerita.sifat} ${d.cerita.a} ${NAMA_TANDA[tandaDari(d.a, d.b)]} ${d.cerita.sifat} ${d.cerita.b}.`;
      return cara === "kanvas" ? `Penyebutnya sama, jadi yang dibandingkan adalah pembilang. Pembilang yang lebih besar adalah ${kata(n)}.` : `${dasar} Jadi pecahan pertama ${NAMA_TANDA[tandaDari(d.a, d.b)]} pecahan kedua.`;
    }
    case "pembilang": {
      const besar = Math.max(d.a, d.b);
      const kecil = Math.min(d.a, d.b);
      return cara === "klik"
        ? `Penyebutnya sama, jadi lihat pembilangnya saja. Pembilang ${kata(besar)} lebih besar daripada ${kata(kecil)}, jadi pecahan yang lebih ${d.cari === "besar" ? "besar" : "kecil"} adalah ${sebutPec(d.cari === "besar" ? besar : kecil, d.q)}.`
        : cara === "kanvas"
          ? `Pembilangnya ${kata(d.a)} dan ${kata(d.b)}. Selisihnya ${kata(n)}.`
          : "Penyebutnya sama, jadi bagiannya sama besar. Yang dibandingkan adalah pembilang.";
    }
    case "batang":
      return cara === "klik"
        ? `Batang atas dibagi ${kata(d.q)} bagian sama besar dan ${kata(d.a)} bagian diwarnai, jadi pecahannya ${sebutPec(d.a, d.q)}.`
        : cara === "kanvas"
          ? `Pada batang bawah ada ${kata(n)} bagian yang diwarnai dari ${kata(d.q)} bagian.`
          : `Batang ${d.a > d.b ? "atas" : "bawah"} lebih banyak bagian yang diwarnai, jadi pecahannya lebih besar.`;
    case "garis":
      return cara === "klik"
        ? `Pecahan yang lebih besar ada lebih ke kanan. Urutan dari ${namaArah(d.arah)}: ${ucapkan(teksUrut(d.data, d.q, d.arah))}.`
        : cara === "kanvas"
          ? `Titik yang ditandai ada di tanda ke ${kata(n)} dari nol, jadi pecahannya ${sebutPec(n, d.q)}.`
          : ujungTandai(d) === "terkecil"
            ? "Titik yang ditandai paling kiri, jadi pecahannya yang terkecil."
            : "Titik yang ditandai paling kanan, jadi pecahannya yang terbesar.";
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  const aw = AWALAN[metode];
  switch (l.tipe) {
    case "banding":
      if (l.cerita && cara === "kanvas") return `${aw}: ${suaraCerita(l)} Penyebutnya sama. Berapa pembilang pecahan yang lebih besar? Tulis satu angka di kanvas.`;
      if (l.cerita && cara === "suara") return `${aw}: ${suaraCerita(l)} Apakah ${l.cerita.sifat} ${l.cerita.a} kurang dari, lebih dari, atau sama dengan ${l.cerita.sifat} ${l.cerita.b}? Ucapkan jawabannya.`;
      return cara === "klik"
        ? `${aw}: lihat dua pecahan pada ${g} ini. Penyebutnya sama. Bandingkan pembilangnya, lalu pilih tanda yang tepat untuk pecahan pertama dan pecahan kedua.`
        : cara === "kanvas"
          ? `${aw}: lihat dua pecahan pada ${g} ini. Penyebutnya sama. Berapa pembilang pecahan yang lebih besar? Tulis satu angka di kanvas.`
          : `${aw}: lihat dua pecahan pada ${g} ini. Apakah pecahan pertama kurang dari, lebih dari, atau sama dengan pecahan kedua? Ucapkan jawabannya.`;
    case "pembilang":
      return cara === "klik"
        ? `${aw}: lihat dua pecahan pada ${g} ini. Penyebutnya sama, jadi lihat pembilangnya. Pilih pecahan yang lebih ${l.cari === "besar" ? "besar" : "kecil"}.`
        : cara === "kanvas"
          ? `${aw}: lihat dua pecahan pada ${g} ini. Berapa selisih pembilang pecahan pertama dan pecahan kedua? Tulis satu angka di kanvas.`
          : `${aw}: lihat dua pecahan pada ${g} ini. Penyebutnya sama. Yang dibandingkan pembilang atau penyebut? Ucapkan satu kata.`;
    case "batang":
      return cara === "klik"
        ? `${aw}: lihat dua batang pada ${g} ini. Semua bagian sama besar. Pilih pecahan untuk batang atas.`
        : cara === "kanvas"
          ? `${aw}: lihat dua batang pada ${g} ini. Berapa bagian yang diwarnai pada batang bawah? Tulis satu angka di kanvas.`
          : `${aw}: lihat dua batang pada ${g} ini. Batang mana yang bagian diwarnainya lebih banyak, atas atau bawah? Ucapkan satu kata.`;
    case "garis":
      return cara === "klik"
        ? `${aw}: lihat garis dari nol sampai satu pada ${g} ini. Urutkan pecahan dari ${namaArah(l.arah)}. Pilih urutan yang benar.`
        : cara === "kanvas"
          ? `${aw}: lihat garis dari nol sampai satu pada ${g} ini. Titik yang ditandai ada di tanda ke berapa dari nol? Tulis satu angka di kanvas.`
          : `${aw}: lihat garis dari nol sampai satu pada ${g} ini. Pecahan di titik yang ditandai itu terkecil atau terbesar? Ucapkan satu kata.`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "banding":
      return cara === "klik" ? "Tanda mana yang tepat?" : cara === "kanvas" ? "Pembilang yang lebih besar berapa?" : "Kurang dari, lebih dari, atau sama dengan?";
    case "pembilang":
      return cara === "klik" ? `Pecahan mana yang lebih ${d.cari === "besar" ? "besar" : "kecil"}?` : cara === "kanvas" ? "Berapa selisih pembilangnya?" : "Pembilang atau penyebut?";
    case "batang":
      return cara === "klik" ? "Pecahan batang atas yang mana?" : cara === "kanvas" ? "Berapa bagian diwarnai pada batang bawah?" : "Atas atau bawah?";
    case "garis":
      return cara === "klik" ? "Urutan mana yang benar?" : cara === "kanvas" ? "Titik bertanda ada di tanda ke berapa?" : "Terkecil atau terbesar?";
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya tanpa menyebut jawaban benar (tanpa digit). `jawab`: kata atau teks yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "banding":
      return cara === "klik"
        ? "Penyebut yang sama berarti bagiannya sama besar. Yang berbeda adalah pembilang, jadi bandingkan pembilang kedua pecahan."
        : cara === "kanvas"
          ? "Bandingkan pembilang kedua pecahan, lalu ambil pembilang yang lebih besar."
          : "Bandingkan pembilangnya. Pembilang yang lebih kecil berarti pecahannya kurang dari, yang lebih besar berarti lebih dari, dan yang sama berarti sama dengan.";
    case "pembilang":
      return cara === "klik"
        ? "Penyebutnya sama, jadi lihat pembilangnya saja. Cari pembilang yang sesuai dengan pertanyaan."
        : cara === "kanvas"
          ? "Selisih adalah hasil pengurangan pembilang yang besar dengan pembilang yang kecil."
          : "Penyebut sama berarti bagiannya sama besar. Pikirkan bagian mana yang berbeda di antara kedua pecahan.";
    case "batang":
      return cara === "klik"
        ? "Pembilang menunjukkan banyak bagian yang diwarnai, dan penyebut menunjukkan banyak bagian seluruhnya. Perhatikan batang atas."
        : cara === "kanvas"
          ? "Hitung bagian yang diwarnai pada batang bawah, bukan seluruh bagiannya."
          : "Bandingkan banyak bagian yang diwarnai pada kedua batang. Semua bagian sama besar.";
    case "garis":
      return cara === "klik"
        ? "Pecahan yang lebih besar ada lebih ke kanan. Perhatikan arah urutan yang diminta."
        : cara === "kanvas"
          ? "Hitung tanda dari nol sampai titik yang ditandai."
          : "Bandingkan titik yang ditandai dengan titik lainnya. Yang paling kiri terkecil, yang paling kanan terbesar.";
  }
}

/** Arahan saat memilih benar atau salah, atau alasan, di Cari kesalahan keliru: hanya mengajak berpikir lagi, tanpa menyebut alasan atau hasil yang benar. */
export const arahCariSalah = (tokoh: string): string => `Pikirkan lagi apa yang ${tokoh} lakukan.`;

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
/** Isi kartu kata untuk tahap Abstract (kata dan angka, tanpa emoji dan tanpa menyebut gambar). */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  switch (l.tipe) {
    case "banding":
      if (l.cerita && cara !== "klik") return [...teksCerita(l), cara === "kanvas" ? "pembilang pecahan yang lebih besar: ?" : `${l.cerita.sifat} ${l.cerita.a} dibanding ${l.cerita.sifat} ${l.cerita.b}: kurang dari, lebih dari, atau sama dengan?`];
      return [`pecahan pertama: ${pec(l.a, l.q)}`, `pecahan kedua: ${pec(l.b, l.q)}`, cara === "klik" ? "tanda yang tepat: ?" : cara === "kanvas" ? "pembilang pecahan yang lebih besar: ?" : "pertama dibanding kedua: kurang dari, lebih dari, atau sama dengan?"];
    case "pembilang":
      return [`pecahan pertama: ${pec(l.a, l.q)}`, `pecahan kedua: ${pec(l.b, l.q)}`, cara === "klik" ? `pecahan yang lebih ${l.cari === "besar" ? "besar" : "kecil"}: ?` : cara === "kanvas" ? "selisih kedua pembilang: ?" : "yang dibandingkan: pembilang atau penyebut?"];
    case "batang":
      return [
        `batang atas: ${l.q} bagian sama besar, ${l.a} bagian diwarnai`,
        cara === "kanvas" ? `batang bawah: ${l.q} bagian sama besar, ${l.q - l.b} bagian tidak diwarnai` : `batang bawah: ${l.q} bagian sama besar, ${l.b} bagian diwarnai`,
        cara === "klik" ? "pecahan batang atas: ?" : cara === "kanvas" ? "bagian diwarnai pada batang bawah: ?" : "batang yang lebih banyak diwarnai: atas atau bawah?",
      ];
    case "garis":
      return cara === "kanvas"
        ? [`garis dari 0 sampai 1: ${l.q} bagian sama besar`, `titik bertanda: tinggal ${l.q - l.data[l.tandai]} bagian lagi sampai 1`, "bagian dari 0 sampai titik bertanda: ?"]
        : cara === "suara"
          ? [`garis dari 0 sampai 1: ${l.q} bagian sama besar`, `titik pada garis: ${l.data.map((n) => pec(n, l.q)).join(", ")}`, `titik bertanda: ${pec(l.data[l.tandai], l.q)}`, "titik bertanda: terkecil atau terbesar?"]
          : [`garis dari 0 sampai 1: ${l.q} bagian sama besar`, `titik pada garis: ${l.data.map((n) => pec(n, l.q)).join(", ")}`, `urutan dari ${l.arah === "naik" ? "terkecil ke terbesar" : "terbesar ke terkecil"}: ?`];
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
