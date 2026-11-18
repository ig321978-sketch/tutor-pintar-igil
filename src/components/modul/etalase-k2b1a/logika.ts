/**
 * Logika murni Kelas 2 Bab 1 Sub-Bab A "Kue Kiriman dari Dapur" (menghitung, membaca, dan menulis bilangan sampai lima puluh), awal cerita Kue di Kantin Sekolah,
 * untuk tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-etalase-k2b1a.mjs.
 * Empat metode: Metode IGIL (Hitung dan Kemas Sepuluh), Ten Frame (Bingkai Sepuluh), Skip Counting (Hitung Meloncat), dan Counting On (Hitung Lanjut).
 * Bilangan paling besar lima puluh.
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { acak, cocok, cocokKelompok, kelompokLabel, labelDari, IKON_CARA, NAMA_CARA, URUT_CARA, type Cara, type Label, type Tempat } from "../lemari-k1b1a/logika";

export const BATAS = 50;

/* ------------------------------ Kata bilangan sampai lima puluh ------------------------------ */
const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
export function kata(n: number): string {
  if (n >= 0 && n <= 9) return SATUAN[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n >= 12 && n <= 19) return `${SATUAN[n - 10]} belas`;
  if (n >= 20 && n <= 50) {
    const p = `${SATUAN[Math.floor(n / 10)]} puluh`;
    return n % 10 === 0 ? p : `${p} ${SATUAN[n % 10]}`;
  }
  return String(n);
}
export const besar = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

export type Metode = "igil" | "bingkai" | "loncat" | "lanjut";
export const URUT_METODE: Metode[] = ["igil", "bingkai", "loncat", "lanjut"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Hitung dan Kemas Sepuluh",
  bingkai: "Ten Frame: Bingkai Sepuluh",
  loncat: "Skip Counting: Hitung Meloncat",
  lanjut: "Counting On: Hitung Lanjut",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F4E6}", bingkai: "\u{1F51F}", loncat: "\u{1F438}", lanjut: "\u{1F449}" };

export type Rupa = "benda" | "diagram" | "lambang";

/* ------------------------------ Langkah soal ------------------------------ */
/** Metode IGIL: kue lepas dipindahkan satu per satu ke kotak kue isi sepuluh (Klik), atau kotak dan kue lepas dibaca. Jawab: banyak seluruhnya `n`. */
export type LangkahKemas = { tipe: "kemas"; set: string; n: number };
/** Ten Frame: bingkai sepuluh sudah terisi. Bingkai penuh berarti sepuluh; bingkai terakhir terisi sebagian. Jawab: banyak seluruhnya `n` (tidak kelipatan sepuluh). */
export type LangkahBingkai = { tipe: "bingkai"; set: string; n: number };
/** Skip Counting: `k` kotak penuh dihitung meloncat sepuluh-sepuluh, lalu `r` yang lepas. Jawab: sepuluh kali k ditambah r. */
export type LangkahLoncat = { tipe: "loncat"; set: string; k: number; r: number };
/** Counting On: banyak di nampan sudah diketahui (`awal`), lalu `b` kue lepas disambung (maju) atau diambil (`mundur`). Jawab: awal tambah atau kurang b. */
export type LangkahLanjut = { tipe: "lanjut"; set: string; awal: number; b: number; mundur?: boolean };
export type LangkahDasar = LangkahKemas | LangkahBingkai | LangkahLoncat | LangkahLanjut;
/**
 * Cari kesalahan: seorang tokoh sudah menjawab soal `dasar` dengan salah paham yang umum. Anak memutuskan benar atau salah,
 * memilih alasan yang benar dari tiga, lalu menjawab bilangan yang benar. `jawabTokoh` kosong bila salahnya pada kata yang dipakai.
 */
export type LangkahSalah = { tipe: "salah"; dasar: LangkahDasar; tokoh: string; jawabTokoh?: number; kataTokoh: string; alasan: [string, string, string]; benar: number; keliru: string };
export type Langkah = LangkahDasar | LangkahSalah;

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);
export function metodeLangkah(l: Langkah): Metode {
  const d = dasarDari(l);
  return d.tipe === "kemas" ? "igil" : d.tipe === "bingkai" ? "bingkai" : d.tipe === "loncat" ? "loncat" : "lanjut";
}

/* ------------------------------ Hitungan ------------------------------ */
export const puluhan = (n: number): number => Math.floor(n / 10);
export const satuan = (n: number): number => n % 10;

/** Kunci tiap langkah, dihitung dari datanya. */
export function kunciLangkah(l: Langkah): number {
  switch (l.tipe) {
    case "salah":
      return kunciLangkah(l.dasar);
    case "kemas":
    case "bingkai":
      return l.n;
    case "loncat":
      return l.k * 10 + l.r;
    case "lanjut":
      return l.mundur ? l.awal - l.b : l.awal + l.b;
  }
}
export const angkaJawab = kunciLangkah;

/** Tiga pilihan di sekitar kunci (satu sampai lima puluh), memuat jawaban tokoh bila ada. Salah satunya selisih satu puluhan. */
export function pilihanDari(l: Langkah): number[] {
  const k = kunciLangkah(l);
  const ada: number[] = [k];
  if (l.tipe === "salah" && l.jawabTokoh !== undefined && !ada.includes(l.jawabTokoh)) ada.push(l.jawabTokoh);
  for (const c of [k + 10, k - 10, k + 1, k - 1, k + 2, k - 2, k + 3, k - 3]) if (ada.length < 3 && c >= 1 && c <= BATAS && !ada.includes(c)) ada.push(c);
  return ada.sort((p, q) => p - q);
}

/* ------------------------------ Kalimat untuk jawaban dan petunjuk (tanpa digit) ------------------------------ */
/** Kalimat yang menjelaskan jawaban benar. */
export function kalimatKunci(l: LangkahDasar): string {
  const n = kunciLangkah(l);
  switch (l.tipe) {
    case "kemas":
      return satuan(l.n) === 0 ? `Ada ${kata(puluhan(l.n))} kotak penuh, jadi semuanya ${kata(n)}.` : `Ada ${kata(puluhan(l.n))} kotak penuh dan ${kata(satuan(l.n))} kue lepas, jadi semuanya ${kata(n)}.`;
    case "bingkai":
      return `Ada ${kata(puluhan(l.n))} bingkai penuh dan ${kata(satuan(l.n))} kotak terisi di bingkai terakhir, jadi semuanya ${kata(n)}.`;
    case "loncat":
      return l.r === 0 ? `Meloncat sepuluh-sepuluh sampai ${kata(n)}.` : `Meloncat sepuluh-sepuluh sampai ${kata(l.k * 10)}, lalu ditambah ${kata(l.r)} yang lepas, jadi semuanya ${kata(n)}.`;
    case "lanjut":
      return l.mundur ? `Dari ${kata(l.awal)} dihitung mundur ${kata(l.b)} kali, jadi sisanya ${kata(n)}.` : `Dari ${kata(l.awal)} dilanjutkan ${kata(l.b)} hitungan, jadi semuanya ${kata(n)}.`;
  }
}

/* ------------------------------ Instruksi (templat, tanpa digit) ------------------------------ */
const AKHIR: Record<Cara, string> = { klik: "Lalu pilih jawabannya.", kanvas: "Lalu tulis angkanya di kanvas.", suara: "Lalu ucapkan jawabannya." };

/** Pictorial menyebut titik, kotak, dan bingkai (tanpa nama kue). */
export function sesuaikan(t: string, rupa: Rupa): string {
  if (rupa !== "diagram") return t;
  return t.replace(/([Kk])otak kue/g, "$1otak").replace(/\bkue\b/g, "titik").replace(/\bKue\b/g, "Titik");
}

export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  return sesuaikan(instruksiMentah(l, rupa, cara), rupa);
}

function instruksiMentah(l: Langkah, rupa: Rupa, cara: Cara): string {
  const akhir = AKHIR[cara];
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu pilih jawaban yang benar.`;
  switch (l.tipe) {
    case "kemas":
      if (rupa === "lambang") return `Bacalah banyak kotak penuh dan kue yang lepas. Satu kotak berisi sepuluh. Berapa banyak kue semuanya? ${akhir}`;
      if (cara === "klik") return `Ketuk tiap kue untuk memindahkannya ke kotak kue. Satu kotak kue muat sepuluh. Berapa banyak kue semuanya? ${akhir}`;
      if (cara === "kanvas") return `Lihat kotak kue yang penuh dan kue yang lepas. Beri tanda pada tiap kue yang lepas. Berapa banyak kue semuanya? ${akhir}`;
      return `Lihat kotak kue yang penuh dan kue yang lepas. Satu kotak kue berisi sepuluh. Berapa banyak kue semuanya? ${akhir}`;
    case "bingkai":
      if (rupa === "lambang") return `Bacalah banyak bingkai penuh dan kotak yang terisi di bingkai terakhir. Berapa banyak semuanya? ${akhir}`;
      if (cara === "klik") return `Ketuk tiap bingkai yang penuh, lalu ketuk tiap kotak yang terisi di bingkai terakhir. Bingkai penuh berarti sepuluh. Berapa banyak semuanya? ${akhir}`;
      if (cara === "kanvas") return `Lihat bingkai sepuluh. Lingkari bingkai yang belum penuh. Berapa banyak semuanya? ${akhir}`;
      return `Lihat bingkai sepuluh. Bingkai penuh berarti sepuluh, tidak perlu dihitung satu-satu. Berapa banyak semuanya? ${akhir}`;
    case "loncat":
      if (rupa === "lambang") return `Bacalah hitungan meloncat sepuluh-sepuluh, lalu tambahkan yang lepas. Berapa banyak semuanya? ${akhir}`;
      if (cara === "klik") return l.r === 0 ? `Hitung meloncat sepuluh-sepuluh. Ketuk tiap kotak penuh. Berapa banyak semuanya? ${akhir}` : `Hitung meloncat sepuluh-sepuluh. Ketuk tiap kotak penuh, lalu ketuk tiap kue yang lepas. Berapa banyak semuanya? ${akhir}`;
      if (cara === "kanvas") return `Hitung meloncat sepuluh-sepuluh. Beri tanda pada tiap kotak penuh. Berapa banyak semuanya? ${akhir}`;
      return `Hitung meloncat sepuluh-sepuluh dari kotak ke kotak, lalu tambahkan kue yang lepas. Berapa banyak semuanya? ${akhir}`;
    case "lanjut":
      if (rupa === "lambang") return l.mundur ? `Bacalah banyak yang sudah diketahui, lalu hitung mundur. Berapa sisanya? ${akhir}` : `Bacalah banyak yang sudah diketahui, lalu hitung lanjut. Berapa banyak semuanya? ${akhir}`;
      if (cara === "klik") return l.mundur ? `Banyak kue di nampan sudah diketahui. Ketuk tiap kue yang diambil, lalu hitung mundur dari bilangan itu. Berapa sisanya? ${akhir}` : `Banyak kue di nampan sudah diketahui. Ketuk tiap kue yang lepas, lalu lanjutkan hitungan dari bilangan itu. Berapa banyak semuanya? ${akhir}`;
      if (cara === "kanvas") return `Banyak kue di nampan sudah diketahui. Beri tanda pada tiap kue yang lepas, lalu lanjutkan hitungan dari bilangan itu. Berapa banyak semuanya? ${akhir}`;
      return l.mundur ? `Banyak kue di nampan sudah diketahui. Sebagian kue diambil. Hitung mundur dari bilangan itu. Berapa sisanya? ${akhir}` : `Banyak kue di nampan sudah diketahui. Lanjutkan hitungan dari bilangan itu. Berapa banyak semuanya? ${akhir}`;
  }
}

export function kalimatTanya(l: LangkahDasar): string {
  return l.tipe === "lanjut" && l.mundur ? "Berapa sisanya?" : "Berapa banyak semuanya?";
}

/* ------------------------------ Petunjuk saat jawaban bilangan salah (menunjuk kesalahannya, tanpa digit) ------------------------------ */
export function petunjukSalah(l: Langkah, m: number): string {
  if (l.tipe === "salah") {
    if (l.jawabTokoh !== undefined && m === l.jawabTokoh) return `Itu jawaban ${l.tokoh} yang keliru. ${l.keliru}`;
    return petunjukSalah(l.dasar, m);
  }
  const k = kunciLangkah(l);
  const lebih = m > k;
  const puluhanSaja = Math.abs(m - k) === 10;
  switch (l.tipe) {
    case "kemas":
      return puluhanSaja ? "Puluhannya keliru. Tiap kotak kue penuh berisi sepuluh, hitung lagi banyak kotaknya." : lebih ? "Ada kue yang terhitung dua kali. Geser tiap kue yang sudah dihitung, lalu hitung lagi." : "Masih ada kue yang belum terhitung. Kemas tiap sepuluh, lalu tambahkan yang lepas.";
    case "bingkai":
      return puluhanSaja ? "Banyak bingkai penuh keliru. Tiap bingkai penuh berarti sepuluh, hitung lagi bingkainya." : lebih ? "Ada kotak yang terhitung dua kali. Bingkai penuh sepuluh, lalu hitung kotak terisi di bingkai terakhir." : "Masih ada kotak yang belum terhitung. Bingkai penuh sepuluh, lalu tambahkan kotak terisi di bingkai terakhir.";
    case "loncat":
      return puluhanSaja ? "Satu kotak penuh, satu loncatan sepuluh. Hitung lagi banyak loncatannya." : lebih ? "Loncatan atau yang lepas terhitung terlalu banyak. Meloncat sepuluh-sepuluh, lalu tambah yang lepas satu-satu." : "Masih ada loncatan atau kue lepas yang belum terhitung. Meloncat sepuluh-sepuluh, lalu tambah yang lepas.";
    case "lanjut":
      return l.mundur
        ? m > k
          ? "Masih ada hitungan mundur yang belum dilakukan. Kurangi satu untuk tiap kue yang diambil."
          : "Hitungan mundur kebanyakan. Kurangi satu untuk tiap kue yang diambil, tidak lebih."
        : m === l.awal
          ? "Itu bilangan awal saja. Lanjutkan hitungan satu untuk tiap kue yang lepas."
          : lebih
            ? "Bilangan awal tidak dihitung lagi. Lanjutkan sesudah bilangan itu, satu untuk tiap kue yang lepas."
            : "Masih ada kue lepas yang belum disambung. Lanjutkan satu untuk tiap kue yang lepas.";
  }
}

/* ------------------------------ Simulasi Kotak Kue ------------------------------ */
export type ModeKotak = "kemas" | "papan" | "antrean" | "urutan" | "kira";
export const NOMOR_MIN = 1;
export const NOMOR_MAX = BATAS;
export type KeadaanEtalase = {
  alat: "etalase";
  mode: ModeKotak;
  /** Kue yang sudah dipindahkan ke kotak kue. */
  dikemas: number;
  /** Semua kue sudah dikemas (sekali tercapai tetap tercatat). */
  selesai: boolean;
  /** Papan catatan dibuka setelah semua kue dikemas. */
  papanDilihat: boolean;
  /** Nomor antrean yang sedang dipanggil, dan banyak panggilan maju dan mundur. */
  nomor: number;
  maju: number;
  mundur: number;
  /** Nomor urutan karcis yang sudah dilengkapi dengan benar. */
  urutanSelesai: number[];
  /** Perkiraan yang dipilih sebelum dikemas, dan banyak perkiraan yang sudah dibuktikan dengan mengemas semuanya. */
  perkiraan: number | null;
  kiraTuntas: number;
};

export const awalEtalase = (nomorAwal: number): KeadaanEtalase => ({ alat: "etalase", mode: "kemas", dikemas: 0, selesai: false, papanDilihat: false, nomor: nomorAwal, maju: 0, mundur: 0, urutanSelesai: [], perkiraan: null, kiraTuntas: 0 });

export const pilihModeKotak = (k: KeadaanEtalase, mode: ModeKotak, total: number): KeadaanEtalase => ({ ...k, mode, papanDilihat: k.papanDilihat || (mode === "papan" && k.dikemas >= total) });

/** Pindahkan satu kue ke kotak kue. Bila semua sudah dikemas, tidak berubah. */
export function kemasSatu(k: KeadaanEtalase, total: number): KeadaanEtalase {
  if (k.dikemas >= total) return k;
  const dikemas = k.dikemas + 1;
  const habis = dikemas === total;
  return { ...k, dikemas, selesai: k.selesai || habis, kiraTuntas: habis && k.perkiraan !== null ? k.kiraTuntas + 1 : k.kiraTuntas };
}
export const majuNomor = (k: KeadaanEtalase): KeadaanEtalase => (k.nomor >= NOMOR_MAX ? k : { ...k, nomor: k.nomor + 1, maju: k.maju + 1 });
export const mundurNomor = (k: KeadaanEtalase): KeadaanEtalase => (k.nomor <= NOMOR_MIN ? k : { ...k, nomor: k.nomor - 1, mundur: k.mundur + 1 });
export const pilihPerkiraan = (k: KeadaanEtalase, p: number): KeadaanEtalase => (k.dikemas >= 1 ? k : { ...k, perkiraan: p });

/** Urutan karcis yang sobek: deretan bilangan berurutan dengan satu yang hilang (`hilang` adalah nomor tempat kosong dalam deret). */
export type UrutanSim = { deret: number[]; hilang: number };
export const jawabanUrutan = (u: UrutanSim): number => u.deret[u.hilang];
export function isiUrutan(k: KeadaanEtalase, nomorUrutan: number, u: UrutanSim, jawab: number): { k: KeadaanEtalase; benar: boolean } {
  if (jawab !== jawabanUrutan(u)) return { k, benar: false };
  return { k: k.urutanSelesai.includes(nomorUrutan) ? k : { ...k, urutanSelesai: [...k.urutanSelesai, nomorUrutan] }, benar: true };
}
/** Tiga pilihan jawaban untuk sebuah urutan (memuat jawaban, selisih satu, dan satu lagi). */
export function pilihanUrutan(u: UrutanSim): number[] {
  const j = jawabanUrutan(u);
  return [j - 1, j, j + 1].filter((v) => v >= 1 && v <= BATAS).length === 3 ? [j - 1, j, j + 1] : [j, j + 1, j + 2];
}

/** Kalimat keadaan untuk suara (tanpa digit). */
export function kalimatKotak(k: KeadaanEtalase, total: number): string {
  if (k.mode === "kemas") return k.dikemas >= total ? `Semua kue sudah dikemas. Ada ${kata(puluhan(total))} kotak penuh dan ${kata(satuan(total))} kue di kotak ketiga.` : `Sudah ${kata(k.dikemas)} kue dikemas. Ketuk kue berikutnya.`;
  if (k.mode === "papan") return k.dikemas === 0 ? "Papan catatan masih kosong. Kemas kue dulu." : `Papan catatan: ${kata(k.dikemas)}, yaitu ${kata(puluhan(k.dikemas))} puluhan dan ${kata(satuan(k.dikemas))} satuan.`;
  if (k.mode === "antrean") return `Nomor antrean sekarang ${kata(k.nomor)}. Maju berarti makin besar, mundur berarti makin kecil.`;
  if (k.mode === "urutan") return `Ada ${kata(k.urutanSelesai.length)} urutan karcis yang sudah dilengkapi.`;
  return k.perkiraan === null ? "Lihat tumpukan kue, lalu pilih perkiraanmu. Kira-kira berapa banyaknya?" : k.dikemas >= total ? "Perkiraan sudah dibuktikan dengan menghitung. Bandingkan perkiraanmu dengan hasilnya." : "Perkiraan sudah dipilih. Sekarang buktikan: kemas semua kue di tab Kemas.";
}
