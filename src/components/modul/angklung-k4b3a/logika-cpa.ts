/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 4 Bab 3 Sub-Bab A "Deret Angklung Bu Ratri" (pola gambar: deret yang membesar atau mengecil dengan selisih tetap,
 * tabel selisih, melanjutkan deret, deret ke-n, susunan per lima): jenis tugas, jawaban benar, pilihan, instruksi (tanpa digit), petunjuk salah, dan geometri gambar
 * (titik tiap deret dan susunan per lima). Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-angklung-k4b3a.mjs.
 * Jawaban beragam: memilih jenis pola, selisih, atau banyaknya (klik), menulis satu angka di kanvas, dan mengucapkan satu kata atau satu bilangan (rekam suara dengan pilihan ketuk).
 * Jawaban benar dihitung dari data. Empat metode tiap misi: IGIL "Gambar Berikutnya, Tabel Selisih, Susun Per Lima", Draw the Next (Gambar Berikutnya),
 * Difference Table (Tabel Selisih), Group by Five (Susun Per Lima).
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { ejaK4B3, kataBilK4B3 } from "../eja-k4b3";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

/* ------------------------------ Bilangan, pola, dan kata ------------------------------ */
/** Nama bilangan dalam kata (tanpa digit): sembilan. */
export const kataBil = (n: number): string => kataBilK4B3(n);
export const kata = kataBil;
/** Tanda dan bilangan bertanda menjadi ucapan tanpa digit: "+3" menjadi "tambah tiga", "12" menjadi "dua belas". */
export const ucapkan = (t: string): string => ejaK4B3(t).replace(/\s+/g, " ").trim();

/** Pola deret: `a` banyak pada deret pertama, `d` selisih bertanda antara dua deret berurutan (tambah bila positif, kurang bila negatif). */
export type Pola = { a: number; d: number };
/** Banyak pada deret ke-n: n - 1 lompatan dari deret pertama. */
export const banyakKe = (p: Pola, n: number): number => p.a + (n - 1) * p.d;
/** Banyak pada deret pertama sampai ke-`jumlah`. */
export const deretKe = (p: Pola, jumlah: number): number[] => Array.from({ length: jumlah }, (_, i) => banyakKe(p, i + 1));
/** Selisih bertanda dalam teks: 3 menjadi "+3", -3 menjadi "−3" (tanda minus sungguhan). */
export const teksBeda = (d: number): string => (d > 0 ? `+${d}` : `−${Math.abs(d)}`);
/** Jenis pola ditentukan arah perubahannya, bukan besar kecil angkanya. */
export const jenisPola = (d: number): "membesar" | "mengecil" => (d > 0 ? "membesar" : "mengecil");
/** Kata urutan: 1 menjadi "pertama", 4 menjadi "keempat". */
export const urutan = (n: number): string => (n === 1 ? "pertama" : `ke${kataBil(n)}`);

/* ------------------------------ Geometri gambar (diuji) ------------------------------ */
/** n titik dalam satu baris: jarak sama, rata di tengah daerah [x0, x0 + lebar], jarak paling lebar `langkahMaks`. */
export function titikBaris(n: number, x0: number, lebar: number, langkahMaks: number): { x: number; langkah: number }[] {
  const langkah = Math.min(langkahMaks, lebar / Math.max(n, 1));
  const mulai = x0 + (lebar - langkah * n) / 2;
  return Array.from({ length: n }, (_, i) => ({ x: mulai + langkah * (i + 0.5), langkah }));
}
/** Susunan per lima: tiap baris berisi paling banyak lima, hanya baris terakhir yang boleh kurang dari lima. */
export function barisLima(n: number): number[] {
  const baris: number[] = [];
  for (let sisa = n; sisa > 0; sisa -= 5) baris.push(Math.min(5, sisa));
  return baris;
}
/** n titik susunan per lima: baris dari atas, tiap baris lima kolom dari kiri. */
export function titikLima(n: number, x0: number, y0: number, dx: number, dy: number): { x: number; y: number; baris: number; kolom: number }[] {
  return Array.from({ length: n }, (_, i) => ({ x: x0 + (i % 5) * dx, y: y0 + Math.floor(i / 5) * dy, baris: Math.floor(i / 5), kolom: i % 5 }));
}

/* ------------------------------ Jenis tugas ------------------------------ */
/** Metode IGIL: tiga deret berurutan; klik = jenis pola, kanvas = selisih, suara = tambah atau kurang. */
export type LJenis = { tipe: "jenis"; p: Pola };
/** Draw the Next (Gambar Berikutnya): tiga deret, deret keempat belum ada; klik dan kanvas = banyaknya, suara = lebih banyak atau lebih sedikit. */
export type LGambar = { tipe: "gambar"; p: Pola };
/** Difference Table (Tabel Selisih): klik = selisih bertanda, kanvas = banyak deret kelima, suara = membesar atau mengecil. */
export type LTabel = { tipe: "tabel"; p: Pola };
/** Group by Five (Susun Per Lima): deret ke-k disusun per lima; klik dan suara = banyak seluruhnya, kanvas = sisa pada baris terakhir. */
export type LLima = { tipe: "lima"; p: Pola; k: number };
export type LangkahDasar = LJenis | LGambar | LTabel | LLima;
/** Cari kesalahan: tokoh sudah menjawab dari `dasar` (Gambar Berikutnya, klik). Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. `jawabTokoh` adalah teks pilihan klik tokoh. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LGambar;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "gambar" | "tabel" | "lima";
export const URUT_METODE: Metode[] = ["igil", "gambar", "tabel", "lima"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Gambar Berikutnya, Tabel Selisih, Susun Per Lima",
  gambar: "Draw the Next: Gambar Berikutnya",
  tabel: "Difference Table: Tabel Selisih",
  lima: "Group by Five: Susun Per Lima",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F3B6}", gambar: "\u{1F3A8}", tabel: "\u{1F4CB}", lima: "\u{270B}" };
const AWALAN: Record<Metode, string> = { igil: "Metode IGIL", gambar: "Draw the Next", tabel: "Difference Table", lima: "Group by Five" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/** Banyak seluruhnya pada tugas Susun Per Lima. */
export const banyakLima = (l: LLima): number => banyakKe(l.p, l.k);

/* ------------------------------ Jawaban benar ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });

/** Jawaban benar tiap jenis tugas menurut caranya, dihitung dari data. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "jenis":
      return cara === "klik" ? nama(jenisPola(l.p.d)) : cara === "kanvas" ? angka(Math.abs(l.p.d)) : nama(l.p.d > 0 ? "tambah" : "kurang");
    case "gambar":
      return cara === "suara" ? nama(l.p.d > 0 ? "banyak" : "sedikit") : cara === "klik" ? nama(String(banyakKe(l.p, 4))) : angka(banyakKe(l.p, 4));
    case "tabel":
      return cara === "klik" ? nama(teksBeda(l.p.d)) : cara === "kanvas" ? angka(banyakKe(l.p, 5)) : nama(jenisPola(l.p.d));
    case "lima": {
      const n = banyakLima(l);
      return cara === "klik" ? nama(String(n)) : cara === "kanvas" ? angka(n % 5) : angka(n);
    }
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
const banyakSah = (n: number): boolean => n >= 1 && n <= 20;

/** Tiga pilihan untuk tugas klik: jawaban benar tidak pernah di tombol pertama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k || k.jenis !== "nama") return [];
  const d = dasarDari(l);
  switch (d.tipe) {
    case "jenis": {
      const lain = unik<string>(["membesar", "mengecil", "sama banyak"], [k.nama]);
      return sisipkan(k.nama, lain, d.p.a + Math.abs(d.p.d) + 1);
    }
    case "gambar": {
      const n3 = banyakKe(d.p, 3);
      const n4 = banyakKe(d.p, 4);
      const calon = [n3 - d.p.d, n3, n4 + 1, n4 - 1, n4 + 2].filter(banyakSah).map(String);
      return sisipkan(k.nama, unik(calon, [k.nama]).slice(0, 2), d.p.a + n4);
    }
    case "tabel": {
      const calon = [teksBeda(-d.p.d), teksBeda(d.p.d + 1), teksBeda(d.p.d - 1), teksBeda(d.p.d + 2)].filter((t) => t !== "+0" && t !== "−0");
      return sisipkan(k.nama, unik(calon, [k.nama]).slice(0, 2), d.p.a);
    }
    case "lima": {
      const n = banyakLima(d);
      const calon = [n - 5, n + 1, n - 1, n + 5].filter(banyakSah).map(String);
      return sisipkan(k.nama, unik(calon, [k.nama]).slice(0, 2), n + 1);
    }
  }
}
/** Pilihan cadangan untuk tugas suara (kata atau bilangan dalam kata). Jawaban benar tidak pernah di tempat pertama. */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  if (cara !== "suara") return [];
  const k = kunciJawab(l, cara);
  if (!k) return [];
  const d = dasarDari(l);
  if (k.jenis === "angka") {
    if (d.tipe !== "lima") return [];
    const n = banyakLima(d);
    const lain = unik([n - 1, n + 1, n - 2, n + 2].filter((x) => x >= 1 && x <= 9), [n]).slice(0, 2).map(kataBil);
    return sisipkan(kataBil(n), lain, d.p.a + n);
  }
  const semua: string[] = d.tipe === "jenis" ? ["tambah", "kurang", "selisih"] : d.tipe === "gambar" ? ["banyak", "sedikit", "sama"] : ["membesar", "mengecil", "sama"];
  return sisipkan(k.nama, unik(semua, [k.nama]), d.p.a + Math.abs(d.p.d));
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : kataBil(k.n));
/** Teks pilihan klik yang benar. */
export function teksKunciKlik(l: Langkah): string | null {
  const k = kunciJawab(l, "klik");
  return k && k.jenis === "nama" ? k.nama : null;
}

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : "gambar");
const ubahTeks = (d: number): string => (d > 0 ? "bertambah" : "berkurang");

/** Kalimat pembenaran setelah jawaban benar (diawali huruf kapital, netral terhadap rupa). */
export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "jenis": {
      const b = Math.abs(d.p.d);
      return cara === "klik"
        ? `Tiap deret ${ubahTeks(d.p.d)} ${b}, jadi polanya ${jenisPola(d.p.d)}.`
        : cara === "kanvas"
          ? `Tiap deret ${ubahTeks(d.p.d)} ${b}, jadi selisihnya ${b}.`
          : `Dari deret ke deret banyaknya ${ubahTeks(d.p.d)}, jadi selisihnya kita ${d.p.d > 0 ? "tambah" : "kurang"}.`;
    }
    case "gambar": {
      const n3 = banyakKe(d.p, 3);
      const n4 = banyakKe(d.p, 4);
      const b = Math.abs(d.p.d);
      return cara === "suara"
        ? `Polanya ${jenisPola(d.p.d)}, jadi deret keempat lebih ${d.p.d > 0 ? "banyak" : "sedikit"} daripada deret ketiga.`
        : `Deret keempat berisi ${n4}, karena ${n3} ${d.p.d > 0 ? "ditambah" : "dikurangi"} ${b} sama dengan ${n4}.`;
    }
    case "tabel": {
      const b = Math.abs(d.p.d);
      return cara === "klik"
        ? `Selisih tiap dua deret berurutan selalu ${teksBeda(d.p.d)}.`
        : cara === "kanvas"
          ? `Deret kelima berisi ${banyakKe(d.p, 5)}, karena ${d.p.a} ${d.p.d > 0 ? "ditambah" : "dikurangi"} ${b} sebanyak empat kali.`
          : `Selisih bertanda ${d.p.d > 0 ? "tambah" : "kurang"}, jadi polanya ${jenisPola(d.p.d)}.`;
    }
    case "lima": {
      const n = banyakLima(d);
      const penuh = Math.floor(n / 5);
      return cara === "kanvas"
        ? `Baris penuh berisi lima, jadi ${penuh} baris penuh dan sisa ${n % 5} pada baris terakhir.`
        : `Susunan per lima terdiri dari ${penuh} baris penuh dan sisa ${n % 5}, jadi seluruhnya ${n}.`;
    }
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara, metode: Metode): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  const aw = AWALAN[metode];
  switch (l.tipe) {
    case "jenis":
      return cara === "klik"
        ? `${aw}: lihat ${g} ini. Tiga deret disusun berurutan. Banyaknya tiap deret makin banyak atau makin sedikit? Pilih jenis polanya.`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. Tiga deret disusun berurutan, dan banyaknya berubah dengan selisih yang tetap. Berapa selisihnya? Tulis satu angka di kanvas.`
          : `${aw}: lihat ${g} ini. Dari satu deret ke deret berikutnya, banyaknya kita tambah atau kita kurang? Ucapkan satu kata.`;
    case "gambar":
      return cara === "klik"
        ? `${aw}: lihat ${g} ini. Ada tiga deret, dan deret keempat belum ada. Berapa banyak pada deret keempat? Pilih jawabannya.`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. Ada tiga deret, dan deret keempat belum ada. Berapa banyak pada deret keempat? Tulis satu angka di kanvas.`
          : `${aw}: lihat ${g} ini. Ada tiga deret, dan deret keempat belum ada. Deret keempat lebih banyak atau lebih sedikit daripada deret ketiga? Ucapkan satu kata.`;
    case "tabel":
      return cara === "klik"
        ? `${aw}: lihat ${g} ini. Tabel memuat banyak tiap deret, dan selisihnya belum diisi. Berapa selisih tiap dua deret berurutan? Pilih jawabannya.`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. Selisih tiap dua deret berurutan sudah tertulis di tabel. Berapa banyak pada deret kelima? Tulis satu angka di kanvas.`
          : `${aw}: lihat ${g} ini. Selisih tiap dua deret berurutan sudah tertulis di tabel. Pola itu membesar atau mengecil? Ucapkan satu kata.`;
    case "lima":
      return cara === "klik"
        ? `${aw}: lihat ${g} ini. Satu deret disusun per lima, dan baris yang penuh berisi lima. Berapa banyak seluruhnya? Pilih jawabannya.`
        : cara === "kanvas"
          ? `${aw}: lihat ${g} ini. Satu deret disusun per lima, dan baris yang penuh berisi lima. Berapa sisa pada baris terakhir yang belum penuh? Tulis satu angka di kanvas.`
          : `${aw}: lihat ${g} ini. Satu deret disusun per lima, dan baris yang penuh berisi lima. Berapa banyak seluruhnya? Ucapkan satu bilangan.`;
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "jenis":
      return cara === "klik" ? "Pola apa yang terbentuk?" : cara === "kanvas" ? "Berapa selisih tiap deret?" : "Banyaknya kita tambah atau kita kurang?";
    case "gambar":
      return cara === "suara" ? "Deret keempat lebih banyak atau lebih sedikit?" : "Berapa banyak pada deret keempat?";
    case "tabel":
      return cara === "klik" ? "Berapa selisih tiap dua deret?" : cara === "kanvas" ? "Berapa banyak pada deret kelima?" : "Pola itu membesar atau mengecil?";
    case "lima":
      return cara === "kanvas" ? "Berapa sisa pada baris terakhir?" : "Berapa banyak seluruhnya?";
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya tanpa menyebut jawaban (tanpa digit). `jawab`: kata, bilangan, atau selisih yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "jenis":
      return cara === "klik"
        ? "Bandingkan dua deret yang berdekatan, lalu lihat apakah banyaknya bertambah atau berkurang."
        : cara === "kanvas"
          ? "Cari berapa banyak yang berubah dari satu deret ke deret berikutnya, bukan banyak seluruhnya."
          : "Lihat arah perubahannya dari satu deret ke deret berikutnya, lalu ucapkan satu kata.";
    case "gambar":
      return cara === "suara"
        ? "Bandingkan deret pertama dengan deret kedua, lalu pikirkan arah polanya."
        : "Cari selisih dua deret yang berdekatan, lalu pakai selisih yang sama pada deret ketiga.";
    case "tabel":
      return cara === "klik"
        ? "Bandingkan banyak deret kedua dengan deret pertama, lalu perhatikan tandanya."
        : cara === "kanvas"
          ? "Mulai dari deret ketiga, lalu tambahkan atau kurangkan selisih yang sama sampai deret kelima."
          : "Lihat tanda selisih pada tabel, lalu pikirkan arah polanya.";
    case "lima":
      return cara === "kanvas"
        ? "Hitung hanya isi baris terakhir yang belum penuh."
        : "Hitung semua baris penuh berisi lima, lalu tambahkan sisa pada baris terakhir.";
  }
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
/** Isi kartu kata untuk tahap Abstract (kata dan angka, tanpa emoji). */
export function barisKartu(l: LangkahDasar, cara?: Cara): string[] {
  switch (l.tipe) {
    case "jenis": {
      const [x, y, z] = deretKe(l.p, 3);
      return [`deret pertama: ${x}`, `deret kedua: ${y}`, `deret ketiga: ${z}`, cara === "klik" ? "jenis pola: ?" : cara === "kanvas" ? "selisih tiap deret: ?" : "dari deret ke deret: tambah atau kurang?"];
    }
    case "gambar": {
      const [x, y, z] = deretKe(l.p, 3);
      return [`deret pertama: ${x}`, `deret kedua: ${y}`, `deret ketiga: ${z}`, cara === "suara" ? "deret keempat dibanding ketiga: ?" : "deret keempat: ?"];
    }
    case "tabel": {
      const [x, y, z] = deretKe(l.p, 3);
      const ada = `banyak tiap deret: ${x}, ${y}, ${z}`;
      return cara === "klik" ? [ada, "selisih tiap dua deret: ?"] : cara === "kanvas" ? [ada, `selisih: ${teksBeda(l.p.d)}`, "deret kelima: ?"] : [ada, `selisih: ${teksBeda(l.p.d)}`, "polanya: ?"];
    }
    case "lima": {
      const n = banyakLima(l);
      const penuh = Math.floor(n / 5);
      return cara === "kanvas"
        ? [`deret ke-${l.k}: ${n}`, `baris penuh berisi lima: ${penuh}`, "sisa pada baris terakhir: ?"]
        : [`deret ke-${l.k} disusun per lima`, `baris penuh: ${penuh}`, `sisa pada baris terakhir: ${n % 5}`, "banyak seluruhnya: ?"];
    }
  }
}
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
