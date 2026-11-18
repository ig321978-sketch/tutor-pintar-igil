/**
 * Logika murni Kelas 2 Bab 2 Sub-Bab C "Pesanan Besar Pak Budi" (cerita hitungan penjumlahan dan pengurangan), akhir cerita
 * Toko Seragam dan Alat Tulis Sekolah, untuk tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract.
 * Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-pembukaan-k2b2c.mjs. Bilangan, operan, dan hasil paling besar dua puluh.
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { acak, cocok, cocokKelompok, kelompokLabel, labelDari, IKON_CARA, NAMA_CARA, URUT_CARA, type Cara, type Label, type Tempat } from "../lemari-k1b1a/logika";

export const BATAS = 20;

/* ------------------------------ Kata bilangan sampai dua puluh ------------------------------ */
const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"] as const;
/** Nama bilangan nol sampai dua puluh (tanpa digit). */
export function kata(n: number): string {
  if (n >= 0 && n <= 9) return SATUAN[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n >= 12 && n <= 19) return `${SATUAN[n - 10]} belas`;
  if (n === 20) return "dua puluh";
  return String(n);
}
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

/* ------------------------------ Metode ------------------------------ */
export type Metode = "igil" | "bagian" | "peragakan" | "mundur";
export const URUT_METODE: Metode[] = ["igil", "bagian", "peragakan", "mundur"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Empat Langkah Cerita",
  bagian: "Part-Part-Whole: Bagian dan Utuh",
  peragakan: "Act It Out: Peragakan Cerita",
  mundur: "Work Backwards: Berpikir Mundur",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F4DD}", bagian: "\u{1F9E9}", peragakan: "\u{1F3AD}", mundur: "\u{23EA}" };

export type Rupa = "benda" | "diagram" | "lambang";

/* ------------------------------ Benda alat tulis dan seragam (Concrete dan Simulasi) ------------------------------ */
export type Benda = { nama: string; emoji: string; warna: string };
/** Sepuluh jenis benda untuk Concrete (emoji berwarna). Pictorial memakai petak polos, Abstract memakai kata dan angka. */
export const BENDA: Benda[] = [
  { nama: "pensil", emoji: "\u{270F}\u{FE0F}", warna: "#FDE68A" },
  { nama: "penggaris", emoji: "\u{1F4CF}", warna: "#BFDBFE" },
  { nama: "pensil warna", emoji: "\u{1F58D}\u{FE0F}", warna: "#FBCFE8" },
  { nama: "topi", emoji: "\u{1F9E2}", warna: "#FECACA" },
  { nama: "baju", emoji: "\u{1F455}", warna: "#BBF7D0" },
  { nama: "tas", emoji: "\u{1F392}", warna: "#FED7AA" },
  { nama: "gunting", emoji: "\u{2702}\u{FE0F}", warna: "#DDD6FE" },
  { nama: "kotak pensil", emoji: "\u{1F4E6}", warna: "#FDE68A" },
  { nama: "dasi", emoji: "\u{1F454}", warna: "#BAE6FD" },
  { nama: "klip", emoji: "\u{1F4CE}", warna: "#E5E7EB" },
];
/** Pasangan benda untuk cerita dua benda: benda kedua yang cocok dengan benda pertama (nomor benda pertama sebagai indeks). */
export const PASANGAN = [1, 0, 7, 8, 3, 7, 9, 2, 3, 6] as const;
export const bendaKe = (benda: number, i: number): number => (i === 0 ? benda : PASANGAN[benda]);

/* ------------------------------ Cerita hitungan ------------------------------ */
export type KataPetunjuk = "lebihnya" | "kurangnya" | "selisih" | "jumlah";
export const URUT_KATA: KataPetunjuk[] = ["lebihnya", "kurangnya", "selisih", "jumlah"];
export type Tanda = "tambah" | "kurang";
/** Tanda hitung yang cocok untuk tiap kata petunjuk: lebihnya dan jumlah menambah, kurangnya dan selisih mengurangi. */
export const tandaKata = (k: KataPetunjuk): Tanda => (k === "lebihnya" || k === "jumlah" ? "tambah" : "kurang");
/** Cerita dua benda: `a` banyak benda pertama, `b` banyak benda kedua (kurangnya dan lebihnya: selisihnya dari benda pertama). `benda` = nomor benda pertama. */
export type CeritaHitung = { kata: KataPetunjuk; a: number; b: number; benda: number };
export function hasilCerita(c: CeritaHitung): number {
  return tandaKata(c.kata) === "tambah" ? c.a + c.b : c.a - c.b;
}
/** Cerita sah: bilangan satu sampai dua puluh, hasil satu sampai dua puluh, dan benda pertama lebih banyak untuk kurangnya dan selisih. */
export const ceritaSah = (c: CeritaHitung): boolean => c.a >= 1 && c.b >= 1 && c.a <= BATAS && c.b <= BATAS && hasilCerita(c) >= 1 && hasilCerita(c) <= BATAS;

/** Kalimat cerita untuk layar (boleh memuat digit). */
export function kalimatCerita(c: CeritaHitung): string[] {
  const x = BENDA[c.benda].nama;
  const y = BENDA[bendaKe(c.benda, 1)].nama;
  if (c.kata === "kurangnya") return [`${besar(x)} ada ${c.a}.`, `${besar(y)} ${c.b} kurangnya dari ${x}.`];
  if (c.kata === "lebihnya") return [`${besar(x)} ada ${c.a}.`, `${besar(y)} ${c.b} lebihnya dari ${x}.`];
  return [`${besar(x)} ada ${c.a}.`, `${besar(y)} ada ${c.b}.`];
}
/** Kalimat tanya cerita untuk layar. */
export function tanyaCerita(c: CeritaHitung): string {
  const y = BENDA[bendaKe(c.benda, 1)].nama;
  if (c.kata === "selisih") return "Berapa selisihnya?";
  if (c.kata === "jumlah") return "Berapa jumlah keduanya?";
  return `Berapa ${y}?`;
}
/** Kalimat hitungan solusi untuk layar, mis. "13 − 4 = 9". */
export function solusiCerita(c: CeritaHitung): string {
  return `${c.a} ${tandaKata(c.kata) === "tambah" ? "+" : "−"} ${c.b} = ${hasilCerita(c)}`;
}
/** Kalimat cerita tanpa digit untuk suara. */
export function suaraCerita(c: CeritaHitung): string {
  const x = BENDA[c.benda].nama;
  const y = BENDA[bendaKe(c.benda, 1)].nama;
  if (c.kata === "kurangnya") return `${besar(x)} ada ${kata(c.a)}. ${besar(y)} ${kata(c.b)} kurangnya dari ${x}.`;
  if (c.kata === "lebihnya") return `${besar(x)} ada ${kata(c.a)}. ${besar(y)} ${kata(c.b)} lebihnya dari ${x}.`;
  return `${besar(x)} ada ${kata(c.a)}. ${besar(y)} ada ${kata(c.b)}.`;
}

/* ------------------------------ Langkah soal ------------------------------ */
/** Metode IGIL "Empat Langkah Cerita": cerita dengan kata petunjuk. Kegiatan: urutkan empat langkah (Klik), pilih tanda (Kanvas). Jawab: hasil cerita. */
export type LangkahEmpat = { tipe: "empat"; c: CeritaHitung };
/**
 * Part-Part-Whole: dua bagian dan satu utuh (utuh = a + b). `cari` "utuh": kedua bagian diketahui; `cari` "bagian": utuh dan satu bagian (a) diketahui, bagian lain (b) dicari.
 * `tukar`: bagian yang dicari ada di kiri. `angka` false: cukup menunjuk yang dicari (tanpa jawaban angka).
 */
export type LangkahBagian = { tipe: "bagian"; a: number; b: number; cari: "utuh" | "bagian"; tukar: boolean; angka: boolean; benda: number };
/** Act It Out: `a` benda di meja, lalu `b` datang (tambah) atau diambil (ambil). Kegiatan: peragakan satu per satu. Jawab: banyak benda sekarang. */
export type LangkahPeragakan = { tipe: "peragakan"; a: number; b: number; arah: "tambah" | "ambil"; benda: number };
/** Work Backwards: tinggal `akhir` setelah `b` diambil (ambil: mula-mula = akhir + b) atau jadi `akhir` setelah `b` ditambah (tambah: mula-mula = akhir - b). */
export type LangkahMundur = { tipe: "mundur"; akhir: number; b: number; arah: "tambah" | "ambil"; benda: number };
export type LangkahDasar = LangkahEmpat | LangkahBagian | LangkahPeragakan | LangkahMundur;
/**
 * Cari kesalahan: seorang tokoh sudah menjawab soal `dasar`. Anak memutuskan benar atau salah, memilih alasan yang benar dari tiga,
 * lalu menjawab bilangan yang benar. `betul`: tokoh sebenarnya benar (anak memilih "benar", alasan menjelaskan mengapa benar).
 */
export type LangkahSalah = { tipe: "salah"; dasar: LangkahDasar; tokoh: string; jawabTokoh?: number; kataTokoh: string; alasan: [string, string, string]; benar: number; keliru: string; betul?: boolean };
export type Langkah = LangkahDasar | LangkahSalah;

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);
export function metodeLangkah(l: Langkah): Metode {
  const d = dasarDari(l);
  return d.tipe === "empat" ? "igil" : d.tipe;
}

/** Jawaban benar tiap langkah, dihitung dari datanya. Null bila soalnya hanya meminta menunjuk tanpa angka jawaban. */
export function kunciLangkah(l: Langkah): number | null {
  switch (l.tipe) {
    case "salah":
      return kunciLangkah(l.dasar);
    case "empat":
      return hasilCerita(l.c);
    case "bagian":
      return l.angka ? (l.cari === "utuh" ? l.a + l.b : l.b) : null;
    case "peragakan":
      return l.arah === "tambah" ? l.a + l.b : l.a - l.b;
    case "mundur":
      return l.arah === "ambil" ? l.akhir + l.b : l.akhir - l.b;
  }
}
export const angkaJawab = kunciLangkah;

/** Tanda yang cocok untuk soal pilih tanda: cerita Metode IGIL (menurut kata petunjuk) dan Berpikir Mundur (membalik langkah). Null untuk jenis lain. */
export function tandaBenar(l: LangkahDasar): Tanda | null {
  if (l.tipe === "empat") return tandaKata(l.c.kata);
  if (l.tipe === "mundur") return l.arah === "ambil" ? "tambah" : "kurang";
  return null;
}

/** Zona bagian dan utuh yang harus ditunjuk (yang belum diketahui): "utuh", "kiri", atau "kanan". */
export type Zona = "utuh" | "kiri" | "kanan";
export const URUT_ZONA: Zona[] = ["utuh", "kiri", "kanan"];
export function zonaDicari(l: LangkahBagian): Zona {
  return l.cari === "utuh" ? "utuh" : l.tukar ? "kiri" : "kanan";
}
/** Isi tiga zona (utuh, kiri, kanan). Zona yang dicari diisi nilai sebenarnya; layar menyembunyikannya dengan tanda tanya. */
export function isiZona(l: LangkahBagian): Record<Zona, number> {
  const utuh = l.a + l.b;
  return l.tukar ? { utuh, kiri: l.b, kanan: l.a } : { utuh, kiri: l.a, kanan: l.b };
}

/**
 * Empat langkah cerita: Diketahui, Ditanya, Solusi, Kesimpulan, dengan isinya untuk satu cerita (layar boleh memuat digit).
 * Urutan benar adalah urutan daftar ini.
 */
export const NAMA_LANGKAH = ["Diketahui", "Ditanya", "Solusi", "Kesimpulan"] as const;
export function isiLangkah(c: CeritaHitung): string[] {
  const x = BENDA[c.benda].nama;
  const y = BENDA[bendaKe(c.benda, 1)].nama;
  const diketahui = c.kata === "kurangnya" || c.kata === "lebihnya" ? `${x} ${c.a}, ${y} ${c.b} ${c.kata}` : `${x} ${c.a}, ${y} ${c.b}`;
  const ditanya = c.kata === "selisih" ? "selisih keduanya" : c.kata === "jumlah" ? "jumlah keduanya" : `banyak ${y}`;
  const hitung = `${c.a} ${tandaKata(c.kata) === "tambah" ? "+" : "−"} ${c.b}`;
  return [diketahui, ditanya, hitung, `jadi ${c.kata === "selisih" ? "selisihnya" : c.kata === "jumlah" ? "jumlahnya" : y} ${hasilCerita(c)}`];
}

/**
 * Apakah soal langsung siap dijawab (tanpa kegiatan lebih dulu) pada rupa dan cara ini? Abstract (lambang) selalu langsung, kecuali menunjuk bagian atau utuh
 * tanpa angka jawaban. Concrete dan Pictorial: hanya Rekam suara. `diam` (gambar bahan Cari kesalahan) tidak pernah langsung.
 */
export function siapLangsung(l: LangkahDasar, rupa: Rupa, cara: Cara, diam = false): boolean {
  if (diam) return false;
  if (rupa === "lambang") return l.tipe === "bagian" ? l.angka : true;
  return cara === "suara";
}

/** Tiga pilihan di sekitar jawaban (nol sampai dua puluh), memuat pengecoh dari tanda yang keliru dan jawaban tokoh bila ada. */
export function pilihanDari(l: Langkah): number[] {
  const k = kunciLangkah(l) ?? 0;
  const ada: number[] = [k];
  if (l.tipe === "salah" && l.jawabTokoh !== undefined && !ada.includes(l.jawabTokoh)) ada.push(l.jawabTokoh);
  const d = dasarDari(l);
  const [p, q] = d.tipe === "empat" ? [d.c.a, d.c.b] : d.tipe === "mundur" ? [d.akhir, d.b] : [d.a, d.b];
  const pengecoh = [p + q, Math.abs(p - q), p, q, k + 1, k - 1, k + 2, k - 2];
  for (const c of pengecoh) if (ada.length < 3 && c >= 0 && c <= BATAS && !ada.includes(c)) ada.push(c);
  for (let n = 0; ada.length < 3 && n <= BATAS; n += 1) if (!ada.includes(n)) ada.push(n);
  return ada.sort((m, n) => m - n);
}

/* ------------------------------ Kalimat untuk Abstract dan jawaban ------------------------------ */
const penyebut = (k: KataPetunjuk) => (k === "kurangnya" ? "kurangnya berarti lebih sedikit, jadi dikurangi" : k === "lebihnya" ? "lebihnya berarti lebih banyak, jadi ditambah" : k === "selisih" ? "selisih berarti beda banyaknya, jadi dikurangi" : "jumlah berarti digabung, jadi ditambah");
/** Kalimat yang menjelaskan jawaban benar (tanpa digit). */
export function kalimatKunci(l: LangkahDasar): string {
  const k = kunciLangkah(l);
  switch (l.tipe) {
    case "empat":
      return `Kata petunjuknya ${penyebut(l.c.kata)}. Jadi jawabannya ${kata(k as number)}.`;
    case "bagian":
      return l.cari === "utuh" ? "Utuh adalah gabungan kedua bagian, jadi yang dicari adalah utuhnya." : "Utuh sudah diketahui, jadi yang dicari adalah satu bagiannya.";
    case "peragakan":
      return `Setelah benda ${l.arah === "tambah" ? "datang" : "diambil"}, ada ${kata(k as number)} benda sekarang.`;
    case "mundur":
      return `Balik langkahnya: yang tadi ${l.arah === "ambil" ? "diambil kita kembalikan" : "ditambah kita kurangi"}. Mula-mula ada ${kata(k as number)}.`;
  }
}

/* ------------------------------ Instruksi (templat, tanpa digit) ------------------------------ */
const AKHIR: Record<Cara, string> = { klik: "Lalu pilih jawabannya.", kanvas: "Lalu tulis angkanya di kanvas.", suara: "Lalu ucapkan jawabannya." };

/** Kalimat pertanyaan jawaban bilangan untuk sebuah soal dasar. */
export function kalimatTanya(l: LangkahDasar): string {
  switch (l.tipe) {
    case "empat": {
      const y = BENDA[bendaKe(l.c.benda, 1)].nama;
      if (l.c.kata === "selisih") return "Berapa selisihnya?";
      if (l.c.kata === "jumlah") return "Berapa jumlah keduanya?";
      return `Berapa banyak ${y}?`;
    }
    case "bagian":
      return l.cari === "utuh" ? "Berapa utuhnya?" : "Berapa bagian yang belum diketahui?";
    case "peragakan":
      return `Berapa banyak ${BENDA[l.benda].nama} sekarang?`;
    case "mundur":
      return `Berapa banyak ${BENDA[l.benda].nama} mula-mula?`;
  }
}

/** Instruksi lengkap satu langkah (suara dan judul soal), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu pilih jawaban yang benar.`;
  const akhir = AKHIR[cara];
  switch (l.tipe) {
    case "empat":
      if (rupa === "lambang") return `Baca cerita hitungannya. Tulis diketahui dan ditanya, lalu hitung solusinya. ${akhir}`;
      if (cara === "klik") return `Urutkan empat langkah cerita: diketahui, ditanya, solusi, dan kesimpulan. Ketuk kartunya berurutan. ${akhir}`;
      if (cara === "kanvas") return `Baca ceritanya dan lihat kata petunjuknya. Lingkari tanda hitung yang cocok, tambah atau kurang. ${akhir}`;
      return `Baca ceritanya pelan-pelan: diketahui, ditanya, lalu solusinya. ${akhir}`;
    case "bagian":
      if (rupa === "lambang") return l.angka ? `Ada dua bagian dan satu utuh. Cari yang belum diketahui. ${akhir}` : "Ada dua bagian dan satu utuh. Pilih yang belum diketahui.";
      if (cara === "klik") return l.angka ? `Lihat bagian dan utuh. Ketuk yang belum diketahui, tandanya tanda tanya. ${akhir}` : "Lihat bagian dan utuh. Ketuk yang belum diketahui, tandanya tanda tanya.";
      if (cara === "kanvas") return l.angka ? `Lihat bagian dan utuh. Lingkari yang belum diketahui, tandanya tanda tanya. ${akhir}` : "Lihat bagian dan utuh. Lingkari yang belum diketahui, tandanya tanda tanya.";
      return `Lihat bagian dan utuh. Cari yang belum diketahui. ${akhir}`;
    case "peragakan": {
      const unit = rupa === "diagram" ? "petak" : "benda";
      const kerja = l.arah === "tambah" ? "yang datang" : "yang diambil";
      if (rupa === "lambang") return `Baca ceritanya, lalu peragakan dalam pikiran: benda ${l.arah === "tambah" ? "datang" : "diambil"}. ${akhir}`;
      if (cara === "klik") return `Peragakan ceritanya. Ketuk ${unit} ${kerja}, satu per satu, sampai semuanya selesai. ${akhir}`;
      if (cara === "kanvas") return `Peragakan ceritanya dalam pikiran. Lingkari ${unit} ${kerja}. ${akhir}`;
      return `Lihat peragaan ceritanya: ${unit} ${l.arah === "tambah" ? "datang" : "diambil"}. ${akhir}`;
    }
    case "mundur":
      if (rupa === "lambang") return `Berpikir mundur: balik langkahnya dari hasil akhir untuk mencari bilangan mula-mula. ${akhir}`;
      if (cara === "klik") return `Berpikir mundur: mulai dari hasil akhir. Ketuk tanda yang cocok untuk membalik langkahnya. ${akhir}`;
      if (cara === "kanvas") return `Berpikir mundur: mulai dari hasil akhir. Lingkari tanda yang cocok untuk membalik langkahnya. ${akhir}`;
      return `Berpikir mundur: balik langkahnya dari hasil akhir. ${akhir}`;
  }
}

/* ------------------------------ Petunjuk saat jawaban salah (menunjuk kesalahannya, tanpa digit) ------------------------------ */
/** Petunjuk saat memilih tanda yang keliru. */
export function petunjukTanda(l: LangkahDasar, dipilih: Tanda): string {
  if (l.tipe === "empat") return `Tanda itu belum cocok. Kata petunjuknya: ${penyebut(l.c.kata)}.`;
  if (l.tipe === "mundur") return dipilih === "kurang" ? "Yang tadi diambil, jadi kita kembalikan dengan menambah." : "Yang tadi ditambah, jadi kita kurangi untuk kembali.";
  return "Tanda itu belum cocok. Baca ceritanya lagi.";
}
/** Petunjuk saat menunjuk zona bagian atau utuh yang keliru. */
export const petunjukZona = (l: LangkahBagian): string => (l.cari === "utuh" ? "Bagian itu sudah diketahui. Yang belum diketahui adalah utuhnya, tandanya tanda tanya." : "Itu sudah diketahui. Cari yang bertanda tanya.");

export function petunjukSalah(l: Langkah, m: number): string {
  if (l.tipe === "salah") {
    if (l.jawabTokoh !== undefined && m === l.jawabTokoh) return `Itu jawaban ${l.tokoh} yang keliru. ${l.keliru}`;
    return petunjukSalah(l.dasar, m);
  }
  switch (l.tipe) {
    case "empat": {
      const lawan = tandaKata(l.c.kata) === "tambah" ? l.c.a - l.c.b : l.c.a + l.c.b;
      return m === lawan ? `Itu hasil dari tanda yang keliru. Kata petunjuknya: ${penyebut(l.c.kata)}.` : "Hitung lagi dengan tanda yang cocok dengan kata petunjuknya.";
    }
    case "bagian":
      if (l.cari === "utuh") return m === Math.abs(l.a - l.b) ? "Utuh adalah gabungan kedua bagian, jadi ditambah." : "Gabungkan kedua bagian untuk mendapat utuhnya.";
      return m === l.a + l.b ? "Itu utuhnya, sudah diketahui. Yang dicari adalah bagian lain, jadi utuh dikurangi bagian yang diketahui." : "Kurangi utuh dengan bagian yang diketahui.";
    case "peragakan":
      return l.arah === "tambah" ? (m === l.a - l.b ? "Benda datang, jadi bertambah. Hitung semuanya." : "Hitung benda di meja, lalu benda yang datang.") : m === l.a + l.b ? "Benda diambil, jadi berkurang." : "Hitung benda yang tersisa di meja.";
    case "mundur":
      return l.arah === "ambil" ? (m === l.akhir - l.b ? "Yang tadi diambil kita kembalikan, jadi ditambah." : "Kembalikan benda yang tadi diambil.") : m === l.akhir + l.b ? "Yang tadi ditambah kita kurangi, bukan ditambah lagi." : "Kurangi benda yang tadi ditambah.";
  }
}

/* ------------------------------ Simulasi Meja Pesanan ------------------------------ */
/** Kertas pesanan di meja (berbeda dari Story): kata petunjuk, dua benda, dan banyaknya. */
export type SlipSim = { kata: KataPetunjuk; a: number; b: number; benda: number };
/** Tiga bilangan yang dijumlahkan di mode Tiga (dua bilangan dulu, lalu bilangan ketiga). */
export type TigaSim = { benda: number; isi: [number, number, number] };
/** Bilangan awal di mode Awal: tinggal `akhir` setelah `b` diambil atau jadi `akhir` setelah `b` ditambah. */
export type AwalSim = { benda: number; akhir: number; b: number; arah: "tambah" | "ambil" };

export type ModePembukaan = "kata" | "langkah" | "tiga" | "awal" | "buat";
export type KeadaanPembukaan = {
  alat: "pembukaan";
  mode: ModePembukaan;
  /** Kertas pesanan yang sedang dibuka (nomor dalam daftar). */
  slip: number;
  /** Kata petunjuk yang sudah dipasangkan dengan tanda hitung yang benar, dan banyak tanda yang salah. */
  kataBenar: KataPetunjuk[];
  tandaSalah: number;
  /** Langkah yang sudah diketuk berurutan pada kertas yang dibuka (nomor langkah), banyak susunan tuntas, dan banyak urutan yang keliru. */
  urut: number[];
  langkahTuntas: number;
  urutSalah: number;
  /** Tiga bilangan: bilangan yang dipilih untuk dijumlahkan lebih dulu (nomor, paling banyak dua), banyak tiga bilangan yang tuntas, dan tuntas dimulai dari dua bilangan berjumlah sepuluh. */
  tiga: number[];
  tigaTuntas: number;
  tigaMudah: boolean;
  /** Bilangan awal: tanda hitung yang dipilih untuk membalik langkah (null belum), banyak yang tuntas. */
  awalTanda: Tanda | null;
  awalTuntas: number;
  /** Cerita hitungan buatan sendiri: pilihan sekarang, banyak cerita sah yang sudah disusun, dan kata petunjuk yang sudah dipakai. */
  buat: CeritaHitung;
  buatTuntas: number;
  kataBuat: KataPetunjuk[];
};

export const awalPembukaan = (): KeadaanPembukaan => ({
  alat: "pembukaan",
  mode: "kata",
  slip: 0,
  kataBenar: [],
  tandaSalah: 0,
  urut: [],
  langkahTuntas: 0,
  urutSalah: 0,
  tiga: [],
  tigaTuntas: 0,
  tigaMudah: false,
  awalTanda: null,
  awalTuntas: 0,
  buat: { kata: "lebihnya", a: 6, b: 3, benda: 0 },
  buatTuntas: 0,
  kataBuat: [],
});
export const pilihModePembukaan = (k: KeadaanPembukaan, mode: ModePembukaan): KeadaanPembukaan => ({ ...k, mode });
export const mulaiLagiPembukaan = (): KeadaanPembukaan => awalPembukaan();

/** Pilih kertas pesanan; susunan langkah dikosongkan. */
export function bukaSlip(k: KeadaanPembukaan, i: number, d: readonly SlipSim[]): KeadaanPembukaan {
  if (i < 0 || i >= d.length || i === k.slip) return k;
  return { ...k, slip: i, urut: [] };
}
/** Pasangkan tanda hitung dengan kata petunjuk kertas yang dibuka. Benar bila sesuai `tandaKata`. */
export function pasangTanda(k: KeadaanPembukaan, tanda: Tanda, d: readonly SlipSim[]): { k: KeadaanPembukaan; ok: boolean } {
  const s = d[k.slip];
  if (!s) return { k, ok: false };
  if (tandaKata(s.kata) !== tanda) return { k: { ...k, tandaSalah: k.tandaSalah + 1 }, ok: false };
  return { k: k.kataBenar.includes(s.kata) ? k : { ...k, kataBenar: [...k.kataBenar, s.kata] }, ok: true };
}
/** Ketuk langkah berurutan (0 sampai 3). Salah urutan tidak mengubah susunan. Langkah keempat yang benar menuntaskan susunan. */
export function ketukLangkah(k: KeadaanPembukaan, n: number): { k: KeadaanPembukaan; ok: boolean } {
  if (n < 0 || n > 3 || k.urut.includes(n)) return { k, ok: false };
  if (n !== k.urut.length) return { k: { ...k, urutSalah: k.urutSalah + 1 }, ok: false };
  const urut = [...k.urut, n];
  return { k: { ...k, urut, langkahTuntas: urut.length === 4 ? k.langkahTuntas + 1 : k.langkahTuntas }, ok: true };
}
export const ulangLangkah = (k: KeadaanPembukaan): KeadaanPembukaan => ({ ...k, urut: [] });
/** Pilih bilangan (nomor 0 sampai 2) untuk dijumlahkan lebih dulu; pilihan ketiga memulai pilihan baru. */
export function pilihTiga(k: KeadaanPembukaan, i: number): KeadaanPembukaan {
  if (i < 0 || i > 2) return k;
  if (k.tiga.includes(i)) return { ...k, tiga: k.tiga.filter((x) => x !== i) };
  if (k.tiga.length >= 2) return { ...k, tiga: [i] };
  return { ...k, tiga: [...k.tiga, i] };
}
/** Jumlahkan dua bilangan terpilih, lalu bilangan ketiga: tuntas. Mudah bila kedua bilangan itu berjumlah sepuluh. */
export function jumlahTiga(k: KeadaanPembukaan, t: TigaSim): KeadaanPembukaan {
  if (k.tiga.length !== 2) return k;
  const jumlah = t.isi[k.tiga[0]] + t.isi[k.tiga[1]];
  return { ...k, tigaTuntas: k.tigaTuntas + 1, tigaMudah: k.tigaMudah || jumlah === 10 };
}
/** Pilih tanda hitung untuk membalik langkah pada bilangan awal. Benar: yang diambil dikembalikan (tambah), yang ditambah dikurangi (kurang). */
export function balikAwal(k: KeadaanPembukaan, tanda: Tanda, a: AwalSim): { k: KeadaanPembukaan; ok: boolean } {
  const benar: Tanda = a.arah === "ambil" ? "tambah" : "kurang";
  if (tanda !== benar) return { k: { ...k, awalTanda: null, tandaSalah: k.tandaSalah + 1 }, ok: false };
  return { k: { ...k, awalTanda: tanda, awalTuntas: k.awalTanda === tanda ? k.awalTuntas : k.awalTuntas + 1 }, ok: true };
}
export const awalDari = (a: AwalSim): number => (a.arah === "ambil" ? a.akhir + a.b : a.akhir - a.b);
/** Ubah cerita buatan sendiri. */
export const ubahBuat = (k: KeadaanPembukaan, perubahan: Partial<CeritaHitung>): KeadaanPembukaan => ({ ...k, buat: { ...k.buat, ...perubahan } });
/** Susun cerita buatan sendiri: sah bila bilangan dan hasilnya dalam batas. Mengembalikan hasilnya. */
export function susunBuat(k: KeadaanPembukaan): { k: KeadaanPembukaan; ok: boolean } {
  if (!ceritaSah(k.buat)) return { k, ok: false };
  return { k: { ...k, buatTuntas: k.buatTuntas + 1, kataBuat: k.kataBuat.includes(k.buat.kata) ? k.kataBuat : [...k.kataBuat, k.buat.kata] }, ok: true };
}

/** Kalimat keadaan untuk suara (tanpa digit). */
export function kalimatPembukaan(k: KeadaanPembukaan, d: readonly SlipSim[], t: TigaSim, a: AwalSim): string {
  if (k.mode === "langkah") {
    if (k.urut.length === 0) return "Ketuk langkah pertama, lalu langkah berikutnya sampai kesimpulan.";
    if (k.urut.length < 4) return `Sudah ${kata(k.urut.length)} langkah. Ketuk langkah berikutnya.`;
    return "Keempat langkah sudah berurutan: diketahui, ditanya, solusi, dan kesimpulan.";
  }
  if (k.mode === "tiga") {
    if (k.tiga.length < 2) return "Ketuk dua bilangan untuk dijumlahkan lebih dulu, lalu jumlahkan dengan bilangan ketiga.";
    const jumlah = t.isi[k.tiga[0]] + t.isi[k.tiga[1]];
    return jumlah === 10 ? "Kedua bilangan itu berjumlah sepuluh, awal yang paling mudah. Tekan jumlahkan." : "Dua bilangan sudah dipilih. Tekan jumlahkan.";
  }
  if (k.mode === "awal") {
    return k.awalTanda ? `Betul. Yang tadi ${a.arah === "ambil" ? "diambil kita kembalikan" : "ditambah kita kurangi"}. Bilangan awalnya ${kata(awalDari(a))}.` : `Hasil akhirnya ${kata(a.akhir)}. Pilih tanda untuk membalik langkahnya.`;
  }
  if (k.mode === "buat") {
    return ceritaSah(k.buat) ? `Ceritamu: kata petunjuknya ${k.buat.kata}. Tekan susun untuk melihat jawabannya.` : "Ceritamu belum sah. Hasilnya harus satu sampai dua puluh.";
  }
  const s = d[k.slip];
  return s ? `Kata petunjuk kertas ini: ${s.kata}. Pilih tanda hitung yang cocok.` : "Pilih satu kertas pesanan.";
}
