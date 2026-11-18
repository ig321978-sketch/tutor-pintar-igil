/**
 * Logika murni Kelas 2 Bab 2 Sub-Bab B "Rak Seragam Diserbu" (pengurangan sampai dua puluh), tengah cerita Toko Seragam dan Alat Tulis Sekolah,
 * untuk tahap Mind-map, Infografis, Simulasi, Concrete, Pictorial, dan Abstract. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-stok-k2b2b.mjs.
 * Bilangan, operan, dan hasil paling besar dua puluh. Barang di rak: satu puluhan = satu ikat sepuluh, satuan = barang lepas.
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { acak } from "../ikan-k1b5a/logika";

export { acak, cocok, cocokKelompok, kelompokLabel, labelDari, IKON_CARA, NAMA_CARA, URUT_CARA, type Cara, type Label, type Tempat } from "../lemari-k1b1a/logika";

export const BATAS = 20;

/* ------------------------------ Kata bilangan sampai dua puluh (tanpa digit) ------------------------------ */
const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"] as const;
export function kata(n: number): string {
  if (!Number.isInteger(n) || n < 0 || n > BATAS) return String(n);
  if (n <= 9) return SATUAN[n];
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n === 20) return "dua puluh";
  return `${SATUAN[n - 10]} belas`;
}
const besar = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

/* ------------------------------ Metode ------------------------------ */
export type Metode = "igil" | "pikir" | "keluarga" | "sepuluh";
export const URUT_METODE: Metode[] = ["igil", "pikir", "keluarga", "sepuluh"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Susun dan Periksa",
  pikir: "Think Addition: Berpikir Penjumlahan",
  keluarga: "Fact Family: Keluarga Bilangan",
  sepuluh: "Subtract from Ten: Kurangi dari Sepuluh",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F4CB}", pikir: "\u{1F9E0}", keluarga: "\u{1F46A}", sepuluh: "\u{1F51F}" };

export type Rupa = "benda" | "diagram" | "lambang";

/* ------------------------------ Langkah tugas ------------------------------ */
/** Metode IGIL, Susun dan Periksa: a dikurangi b. Satu puluhan = satu ikat sepuluh. Bila satuan a kurang dari b, ikat dibuka dulu. */
export type LangkahSusun = { tipe: "susun"; set: string; a: number; b: number; benih: number };
/** Think Addition: b ditambah berapa sama dengan a? Jawab a dikurangi b. */
export type LangkahPikir = { tipe: "pikir"; set: string; a: number; b: number; benih: number };
/** Fact Family: tiga bilangan x, y, dan z = x + y. `kalimat`: pilih keempat kalimat satu keluarga (tanpa jawaban angka). `kurang`: z dikurangi x. `kurang2`: z dikurangi y. `tambah`: x ditambah y. */
export type TanyaKeluarga = "kalimat" | "kurang" | "kurang2" | "tambah";
export type LangkahKeluarga = { tipe: "keluarga"; set: string; x: number; y: number; tanya: TanyaKeluarga; benih: number };
/** Subtract from Ten: a dikurangi b lewat sepuluh dikurangi b, lalu ditambah (a dikurangi sepuluh). a antara sebelas dan sembilan belas, b paling besar sepuluh. */
export type LangkahSepuluh = { tipe: "sepuluh"; set: string; a: number; b: number; benih: number };
/** Membandingkan dua cara untuk a dikurangi b: mundur satu-satu atau Kurangi dari Sepuluh. Memilih yang lebih mudah (tanpa jawaban angka). */
export type LangkahBanding = { tipe: "banding"; set: string; a: number; b: number; benih: number };
export type LangkahDasar = LangkahSusun | LangkahPikir | LangkahKeluarga | LangkahSepuluh | LangkahBanding;
/**
 * Cari kesalahan: seorang tokoh sudah menjawab tugas `dasar` dengan salah paham yang umum. Anak memutuskan benar atau salah,
 * memilih alasan yang benar dari tiga, lalu menjawab bilangan yang benar.
 */
export type LangkahSalah = { tipe: "salah"; dasar: LangkahDasar; tokoh: string; jawabTokoh?: number; kataTokoh: string; alasan: [string, string, string]; benar: number; keliru: string };
export type Langkah = LangkahDasar | LangkahSalah;

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);
export function metodeLangkah(l: Langkah): Metode {
  const d = dasarDari(l);
  return d.tipe === "susun" ? "igil" : d.tipe === "pikir" ? "pikir" : d.tipe === "keluarga" ? "keluarga" : "sepuluh";
}

/* ------------------------------ Hitungan ------------------------------ */
/** Keluarga bilangan: utuh z = x + y. */
export const utuh = (x: number, y: number): number => x + y;
export const puluhanDari = (n: number): number => Math.floor(n / 10);
export const satuanDari = (n: number): number => n % 10;
/** Perlu membuka satu puluhan: satuan bilangan awal kurang dari yang dikurangkan. */
export const perluBuka = (a: number, b: number): boolean => a % 10 < b % 10;
/** Langkah pertama Kurangi dari Sepuluh: sepuluh dikurangi b. */
export const langkahSatuSepuluh = (b: number): number => 10 - b;
/** Cara yang lebih mudah: yang dikurangkan hampir sepuluh (delapan atau lebih) memakai Kurangi dari Sepuluh, yang kecil (tiga atau kurang) cukup mundur. */
export const caraTermudah = (a: number, b: number): "sepuluh" | "mundur" => (a >= 11 && b >= 8 ? "sepuluh" : "mundur");
/** Kesalahan lazim saat satuan kurang: membalik pengurangan satuan (kecil dikurangi besar menjadi besar dikurangi kecil). */
export const balikSatuan = (a: number, b: number): number => Math.abs((a % 10) - (b % 10));

/** Empat kalimat satu keluarga bilangan, dan tiga kartu yang tampak mirip tetapi salah (semua paling besar dua puluh). */
export function kalimatKeluarga(x: number, y: number): { benar: string[]; salah: string[] } {
  const z = x + y;
  return {
    benar: [`${x} + ${y} = ${z}`, `${y} + ${x} = ${z}`, `${z} − ${x} = ${y}`, `${z} − ${y} = ${x}`],
    salah: [`${x} − ${y} = ${z}`, `${z} − ${y} = ${y}`],
  };
}
/** Enam kartu kalimat (empat benar dan dua salah) diacak tetap menurut benih. */
export function kartuKalimat(x: number, y: number, benih: number): string[] {
  const k = kalimatKeluarga(x, y);
  return acak([...k.benar, ...k.salah], benih);
}

/** Jawaban benar tiap langkah, dihitung dari datanya. Null bila tugasnya memilih atau membandingkan tanpa angka jawaban. */
export function kunciLangkah(l: Langkah): number | null {
  switch (l.tipe) {
    case "salah":
      return kunciLangkah(l.dasar);
    case "susun":
    case "pikir":
    case "sepuluh":
      return l.a - l.b;
    case "keluarga":
      return l.tanya === "kalimat" ? null : l.tanya === "kurang" ? l.y : l.tanya === "kurang2" ? l.x : l.x + l.y;
    case "banding":
      return null;
  }
}
export const angkaJawab = kunciLangkah;

/** Tiga pilihan di sekitar jawaban (nol sampai dua puluh), memuat jawaban tokoh dan kesalahan yang paling lazim. */
export function pilihanDari(l: Langkah): number[] {
  const k = kunciLangkah(l) ?? 0;
  const d = dasarDari(l);
  const ada: number[] = [k];
  const taruh = (c: number) => {
    if (ada.length < 3 && Number.isInteger(c) && c >= 0 && c <= BATAS && !ada.includes(c)) ada.push(c);
  };
  if (l.tipe === "salah" && l.jawabTokoh !== undefined) taruh(l.jawabTokoh);
  let lazim: number[] = [k + 1, k - 1, k + 2];
  if (d.tipe === "susun" || d.tipe === "sepuluh") lazim = [d.a + d.b, balikSatuan(d.a, d.b), 10 - d.b, k + 1, k - 1, d.a - 10];
  else if (d.tipe === "pikir") lazim = [d.a, d.b, k + 1, k - 1];
  else if (d.tipe === "keluarga") lazim = [d.x + d.y, d.x, d.y, k + 1, k - 1];
  for (const c of lazim) taruh(c);
  for (const c of [k + 2, k - 2, k + 3, k - 3, k + 10, k - 10]) taruh(c);
  for (let n = 0; ada.length < 3 && n <= BATAS; n += 1) taruh(n);
  return ada.sort((p, q) => p - q);
}

/* ------------------------------ Istilah menurut rupa ------------------------------ */
/** Kata untuk satu ikat sepuluh dan barang lepas. Pictorial tanpa nama barang (bingkai dan titik); Abstract hanya puluhan dan satuan. */
export function istilah(rupa: Rupa): { ikat: string; lepas: string } {
  return rupa === "benda" ? { ikat: "ikat sepuluh", lepas: "barang lepas" } : rupa === "diagram" ? { ikat: "bingkai sepuluh", lepas: "titik lepas" } : { ikat: "puluhan", lepas: "satuan" };
}

/** Petunjuk salah menurut rupa: Pictorial tanpa nama barang dan ikat; Abstract hanya puluhan dan satuan. */
export function sesuaikanPetunjuk(t: string, rupa: Rupa): string {
  if (rupa === "benda") return t;
  if (rupa === "diagram") return t.replace(/ikat sepuluh/g, "bingkai sepuluh").replace(/Ikat sepuluh/g, "Bingkai sepuluh").replace(/barang lepas/g, "titik lepas").replace(/Barang lepas/g, "Titik lepas").replace(/\bbarang\b/g, "titik").replace(/\bBarang\b/g, "Titik");
  return t
    .replace(/Buka satu ikat sepuluh/g, "Buka satu puluhan")
    .replace(/ikat sepuluh/g, "puluhan")
    .replace(/Ikat sepuluh/g, "Puluhan")
    .replace(/barang lepas/g, "satuan")
    .replace(/Barang lepas/g, "Satuan")
    .replace(/\bbarang\b/g, "bilangan")
    .replace(/\bBarang\b/g, "Bilangan");
}

/* ------------------------------ Instruksi (tanpa digit) ------------------------------ */
const AKHIR: Record<Cara, string> = { klik: "Lalu pilih jawabannya.", kanvas: "Lalu tulis angkanya di kanvas.", suara: "Lalu ucapkan jawabannya." };

export function kalimatTanya(l: LangkahDasar): string {
  switch (l.tipe) {
    case "susun":
      return "Sisanya berapa?";
    case "pikir":
      return "Bilangan yang harus ditambahkan berapa?";
    case "sepuluh":
      return "Hasil akhirnya berapa?";
    case "keluarga":
      return l.tanya === "tambah" ? "Hasil penjumlahan itu berapa?" : l.tanya === "kalimat" ? "" : "Hasil pengurangan itu berapa?";
    case "banding":
      return "";
  }
}

/** Cara tugas dikerjakan: `langsung` = jawaban langsung tersedia dari gambar, selain itu anak mengerjakan kegiatannya dulu. */
export type ModeLangkah = "langsung" | "ambil" | "sisa" | "total" | "kalimat" | "dua" | "banding";
export function modeLangkah(l: LangkahDasar, rupa: Rupa, cara: Cara): ModeLangkah {
  switch (l.tipe) {
    case "susun":
      return rupa === "lambang" || cara === "suara" ? "langsung" : "ambil";
    case "pikir":
      return rupa === "lambang" || cara === "suara" ? "langsung" : "sisa";
    case "keluarga":
      if (l.tanya === "kalimat") return "kalimat";
      return cara === "kanvas" ? "total" : "langsung";
    case "sepuluh":
      return cara === "suara" ? "langsung" : "dua";
    case "banding":
      return "banding";
  }
}

export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  return sesuaikanPetunjuk(instruksiDasar(l, rupa, cara), rupa);
}
function instruksiDasar(l: Langkah, rupa: Rupa, cara: Cara): string {
  const akhir = AKHIR[cara];
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu pilih jawaban yang benar.`;
  const w = istilah(rupa);
  const tanya = kalimatTanya(l);
  const mode = modeLangkah(l, rupa, cara);
  switch (l.tipe) {
    case "susun":
      if (mode === "ambil") return `Ketuk barang yang terjual untuk mengambilnya. Kalau ${w.lepas} tidak cukup, buka dulu satu ${w.ikat}. ${tanya} ${akhir}`;
      if (rupa === "lambang") return `Bacalah tabel puluhan dan satuan. Kalau satuan atas kurang, buka satu puluhan dulu. ${tanya} ${akhir}`;
      return `Lihat barang yang sudah terjual. ${tanya} ${akhir}`;
    case "pikir":
      if (mode === "sisa") return `Ketuk tempat yang masih kosong sampai jumlahnya penuh. ${tanya} ${akhir}`;
      if (rupa === "lambang") return `Bacalah kalimat penjumlahan yang belum lengkap. ${tanya} ${akhir}`;
      return `Lihat tempat yang masih kosong. ${tanya} ${akhir}`;
    case "keluarga":
      if (mode === "kalimat") return "Ketuk empat kalimat yang berasal dari satu keluarga bilangan. Ada kalimat yang menipu.";
      if (mode === "total") return `Ketuk dulu bilangan yang paling besar di keluarga itu. ${tanya} ${akhir}`;
      return `Lihat keluarga bilangannya. ${tanya} ${akhir}`;
    case "sepuluh":
      if (mode === "dua") return `Kurangi dulu dari sepuluh. Lalu tambahkan sisa bilangan awalnya. ${tanya} ${akhir}`;
      return `Kurangi dari sepuluh, lalu tambahkan sisanya. ${tanya} ${akhir}`;
    case "banding":
      return "Bandingkan dua cara. Pilih cara yang lebih mudah untuk pengurangan ini.";
  }
}

/* ------------------------------ Petunjuk saat jawaban bilangan salah (menunjuk kesalahannya, tanpa digit) ------------------------------ */
export function petunjukSalah(l: Langkah, m: number): string {
  if (l.tipe === "salah") {
    if (l.jawabTokoh !== undefined && m === l.jawabTokoh) return `Itu jawaban ${l.tokoh} yang keliru. ${l.keliru}`;
    return petunjukSalah(l.dasar, m);
  }
  const k = kunciLangkah(l) ?? 0;
  const lebih = m > k;
  const sama = (a: number) => m === a;
  switch (l.tipe) {
    case "susun":
      if (sama(l.a + l.b)) return "Itu hasil penjumlahan. Barang yang terjual itu diambil, jadi dikurangkan.";
      if (perluBuka(l.a, l.b) && sama(balikSatuan(l.a, l.b))) return "Satuan yang kecil tidak boleh dibalik dengan yang besar. Buka satu puluhan, lalu kurangkan lagi.";
      return lebih ? "Terlalu besar. Ambil semua barang yang terjual, lalu hitung sisanya." : "Terlalu kecil. Hitung lagi sisa barang setelah yang terjual diambil.";
    case "pikir":
      if (sama(l.a)) return "Itu bilangan awalnya. Yang ditanyakan adalah tambahan yang tadi masih kosong.";
      if (sama(l.b)) return "Itu bilangan yang sudah ada. Hitung tempat yang masih kosong.";
      return lebih ? "Terlalu besar. Hitung hanya tempat yang masih kosong." : "Masih kurang. Hitung lagi tempat yang masih kosong.";
    case "keluarga":
      if (l.tanya === "tambah") return sama(Math.abs(l.x - l.y)) ? "Itu selisihnya. Dua bagian digabung dengan penjumlahan." : lebih ? "Terlalu besar. Gabungkan kedua bagian satu kali." : "Masih kurang. Gabungkan kedua bagian.";
      if (sama(l.x + l.y)) return "Itu bilangan utuhnya. Kurangi utuhnya dengan bagian yang diketahui.";
      return lebih ? "Terlalu besar. Utuh dikurangi satu bagian sama dengan bagian yang lain." : "Terlalu kecil. Utuh dikurangi satu bagian sama dengan bagian yang lain.";
    case "sepuluh":
      if (sama(10 - l.b)) return "Itu baru langkah pertama. Tambahkan sisa bilangan awal yang lebih dari sepuluh.";
      if (sama(l.a + l.b)) return "Itu hasil penjumlahan. Kurangi dari sepuluh, lalu tambahkan sisanya.";
      return lebih ? "Terlalu besar. Sepuluh dikurangi bilangan itu dulu, lalu tambahkan sisanya." : "Terlalu kecil. Jangan lupa menambahkan sisa bilangan awal yang lebih dari sepuluh.";
    case "banding":
      return "Pilih salah satu cara.";
  }
}

/* ------------------------------ Kalimat yang menjelaskan jawaban benar (tanpa digit) ------------------------------ */
export function kalimatKunci(l: LangkahDasar): string {
  switch (l.tipe) {
    case "susun":
      return perluBuka(l.a, l.b)
        ? `Satuan tidak cukup, jadi satu puluhan dibuka. ${besar(kata(l.a))} dikurangi ${kata(l.b)} sama dengan ${kata(l.a - l.b)}. Periksa: ${kata(l.a - l.b)} ditambah ${kata(l.b)} sama dengan ${kata(l.a)}.`
        : `${besar(kata(l.a))} dikurangi ${kata(l.b)} sama dengan ${kata(l.a - l.b)}. Periksa: ${kata(l.a - l.b)} ditambah ${kata(l.b)} sama dengan ${kata(l.a)}.`;
    case "pikir":
      return `${besar(kata(l.b))} ditambah ${kata(l.a - l.b)} sama dengan ${kata(l.a)}, jadi ${kata(l.a)} dikurangi ${kata(l.b)} sama dengan ${kata(l.a - l.b)}.`;
    case "keluarga": {
      const z = l.x + l.y;
      if (l.tanya === "kalimat") return `${besar(kata(l.x))}, ${kata(l.y)}, dan ${kata(z)} satu keluarga: dua penjumlahan dan dua pengurangan.`;
      if (l.tanya === "tambah") return `${besar(kata(l.x))} ditambah ${kata(l.y)} sama dengan ${kata(z)}.`;
      return l.tanya === "kurang" ? `${besar(kata(z))} dikurangi ${kata(l.x)} sama dengan ${kata(l.y)}.` : `${besar(kata(z))} dikurangi ${kata(l.y)} sama dengan ${kata(l.x)}.`;
    }
    case "sepuluh":
      return `${besar(kata(10))} dikurangi ${kata(l.b)} sama dengan ${kata(10 - l.b)}. ${besar(kata(10 - l.b))} ditambah ${kata(l.a - 10)} sama dengan ${kata(l.a - l.b)}.`;
    case "banding":
      return caraTermudah(l.a, l.b) === "sepuluh" ? "Yang dikurangkan hampir sepuluh, jadi Kurangi dari Sepuluh lebih cepat." : "Yang dikurangkan kecil, jadi mundur beberapa langkah lebih cepat.";
  }
}

/** Letak benda ke-i: urutan tetap. */
export const urutan = (n: number): number[] => Array.from({ length: n }, (_, i) => i);

/* ------------------------------ Simulasi Meja Stok ------------------------------ */
export type ModeStok = "pasang" | "kurang" | "periksa" | "keluarga" | "sepuluh";
export type KeadaanStok = {
  alat: "stok";
  mode: ModeStok;
  /** Contoh yang dipilih: a = banyak awal (topi), b = banyak dikurangkan (dasi atau yang terjual). */
  a: number;
  b: number;
  /** Mode pasang: banyak pasangan yang sudah dibuat. */
  pasang: number;
  selisihDilihat: boolean;
  /** Mode kurang: ikat sepuluh (p) dan barang lepas (s) yang tersisa di rak, banyak yang sudah diambil (diambil), dan ikat yang dibuka. */
  p: number;
  s: number;
  diambil: number;
  dibuka: number;
  kurangTuntas: number;
  bukaTuntas: number;
  /** Mode periksa: pemeriksaan dengan penjumlahan yang tuntas. */
  periksaTuntas: number;
  /** Mode keluarga: kalimat yang sudah dibuka (bit 0 sampai 3). */
  keluargaMask: number;
  keluargaTuntas: boolean;
  /** Mode sepuluh: 0 belum mulai, 1 sepuluh dikurangi b sudah dikerjakan, 2 sisa sudah ditambahkan. */
  sepuluhLangkah: 0 | 1 | 2;
  sepuluhTuntas: boolean;
};

/** Contoh stok di meja (berbeda dari Story): a awal dan b yang dikurangkan. */
export const CONTOH_STOK: { a: number; b: number }[] = [
  { a: 18, b: 11 },
  { a: 16, b: 7 },
  { a: 20, b: 6 },
  { a: 13, b: 3 },
];

const mulaiBaris = (a: number, b: number) => ({ a, b, pasang: 0, p: puluhanDari(a), s: satuanDari(a), diambil: 0, dibuka: 0, sepuluhLangkah: 0 as 0 | 1 | 2 });
export const awalStok = (): KeadaanStok => ({
  alat: "stok",
  mode: "pasang",
  ...mulaiBaris(CONTOH_STOK[0].a, CONTOH_STOK[0].b),
  selisihDilihat: false,
  kurangTuntas: 0,
  bukaTuntas: 0,
  periksaTuntas: 0,
  keluargaMask: 0,
  keluargaTuntas: false,
  sepuluhTuntas: false,
});
export const selisihStok = (k: KeadaanStok): number => k.a - k.b;
export const sisaStok = (k: KeadaanStok): number => 10 * k.p + k.s;
export const kartuStokTampil = (k: KeadaanStok): number => sisaStok(k);
export const sudahAmbilSemua = (k: KeadaanStok): boolean => k.diambil >= k.b;

export const pilihModeStok = (k: KeadaanStok, mode: ModeStok): KeadaanStok => ({ ...k, mode });
/** Pilih contoh baru: semua kegiatan per contoh dimulai dari awal (yang sudah tercapai tetap tercatat). */
export const pilihContohStok = (k: KeadaanStok, a: number, b: number): KeadaanStok => (a >= 1 && a <= BATAS && b >= 1 && b <= a ? { ...k, ...mulaiBaris(a, b) } : k);
export const ulangStok = (k: KeadaanStok): KeadaanStok => ({ ...k, ...mulaiBaris(k.a, k.b) });

/** Pasangkan satu topi dengan satu dasi. Paling banyak sebanyak yang dikurangkan. Tuntas bila semua berpasangan. */
export function pasangSatu(k: KeadaanStok): { k: KeadaanStok; ok: boolean } {
  if (k.pasang >= k.b) return { k, ok: false };
  const pasang = k.pasang + 1;
  return { k: { ...k, pasang, selisihDilihat: k.selisihDilihat || pasang === k.b }, ok: true };
}
/** Rak yang dikurangi: p ikat sepuluh dan s barang lepas masih di rak, b yang harus diambil, diambil dan dibuka sejauh ini. */
export type Rak = { b: number; p: number; s: number; diambil: number; dibuka: number };
export const rakAwal = (a: number, b: number): Rak => ({ b, p: puluhanDari(a), s: satuanDari(a), diambil: 0, dibuka: 0 });
/** Ambil satu barang lepas yang terjual. Bila barang lepas habis, buka satu puluhan dulu. */
export function ambilDariRak(r: Rak): { r: Rak; ok: boolean; sebab?: "habis" | "cukup" } {
  if (r.diambil >= r.b) return { r, ok: false, sebab: "cukup" };
  if (r.s <= 0) return { r, ok: false, sebab: "habis" };
  return { r: { ...r, s: r.s - 1, diambil: r.diambil + 1 }, ok: true };
}
/** Buka satu ikat sepuluh menjadi sepuluh barang lepas. Hanya bila ada ikat dan barang lepas kurang dari yang masih harus diambil. */
export function bukaDiRak(r: Rak): { r: Rak; ok: boolean; sebab?: "tanpaIkat" | "cukup" } {
  if (r.p < 1) return { r, ok: false, sebab: "tanpaIkat" };
  if (r.s >= r.b - r.diambil) return { r, ok: false, sebab: "cukup" };
  return { r: { ...r, p: r.p - 1, s: r.s + 10, dibuka: r.dibuka + 1 }, ok: true };
}
export const sisaRak = (r: Rak): number => 10 * r.p + r.s;
export const rakSelesai = (r: Rak): boolean => r.diambil >= r.b;

/** Ambil satu barang yang terjual di meja stok (menghitung tuntasnya pengurangan). */
export function ambilSatu(k: KeadaanStok): { k: KeadaanStok; ok: boolean; sebab?: "habis" | "cukup" } {
  const h = ambilDariRak(k);
  if (!h.ok) return { k, ok: false, sebab: h.sebab };
  const tuntas = rakSelesai(h.r);
  return { k: { ...k, ...h.r, kurangTuntas: k.kurangTuntas + (tuntas ? 1 : 0), bukaTuntas: k.bukaTuntas + (tuntas && h.r.dibuka >= 1 ? 1 : 0) }, ok: true };
}
/** Buka satu ikat sepuluh di meja stok. */
export function bukaPuluhan(k: KeadaanStok): { k: KeadaanStok; ok: boolean; sebab?: "tanpaIkat" | "cukup" } {
  const h = bukaDiRak(k);
  return h.ok ? { k: { ...k, ...h.r }, ok: true } : { k, ok: false, sebab: h.sebab };
}
/** Periksa dengan penjumlahan: sisa ditambah yang diambil harus sama dengan awal. Hanya setelah semua diambil. */
export function periksaStok(k: KeadaanStok): { k: KeadaanStok; ok: boolean } {
  if (!sudahAmbilSemua(k) || k.b < 1) return { k, ok: false };
  return { k: { ...k, periksaTuntas: k.periksaTuntas + 1 }, ok: true };
}
/** Empat kalimat keluarga dari contoh: dua penjumlahan dan dua pengurangan (b + sisa, sisa + b, a - b, a - sisa). */
export function kalimatContoh(k: KeadaanStok): string[] {
  const c = k.a - k.b;
  return [`${k.b} + ${c} = ${k.a}`, `${c} + ${k.b} = ${k.a}`, `${k.a} − ${k.b} = ${c}`, `${k.a} − ${c} = ${k.b}`];
}
export function bukaKalimat(k: KeadaanStok, i: number): KeadaanStok {
  if (i < 0 || i > 3) return k;
  const mask = k.keluargaMask | (1 << i);
  return { ...k, keluargaMask: mask, keluargaTuntas: k.keluargaTuntas || mask === 15 };
}
/** Boleh memakai Kurangi dari Sepuluh: bilangan awal sebelas sampai dua puluh dan yang dikurangkan paling besar sepuluh. */
export const bolehSepuluh = (k: KeadaanStok): boolean => k.a >= 11 && k.a <= BATAS && k.b <= 10;
export function sepuluhMaju(k: KeadaanStok): { k: KeadaanStok; ok: boolean } {
  if (!bolehSepuluh(k) || k.sepuluhLangkah >= 2) return { k, ok: false };
  const langkah = (k.sepuluhLangkah + 1) as 1 | 2;
  return { k: { ...k, sepuluhLangkah: langkah, sepuluhTuntas: k.sepuluhTuntas || langkah === 2 }, ok: true };
}

/** Kalimat keadaan untuk suara (tanpa digit). */
export function kalimatStok(k: KeadaanStok): string {
  const c = k.a - k.b;
  if (k.mode === "pasang") {
    if (k.pasang === 0) return `Ada ${kata(k.a)} topi dan ${kata(k.b)} dasi. Pasangkan satu-satu untuk mencari selisihnya.`;
    if (k.pasang < k.b) return `Sudah ${kata(k.pasang)} pasang. Lanjutkan sampai semua dasi berpasangan.`;
    return `Semua dasi sudah berpasangan. Ada ${kata(c)} topi yang tidak berpasangan. Itulah selisihnya.`;
  }
  if (k.mode === "kurang") {
    if (k.diambil === 0) return `Stok awal ${kata(k.a)}. Ketuk barang yang terjual satu per satu. Kalau barang lepas habis, buka satu puluhan.`;
    if (!sudahAmbilSemua(k)) return `Sudah diambil ${kata(k.diambil)}. Kartu stok menunjukkan ${kata(sisaStok(k))}.`;
    return `Semua yang terjual sudah diambil. Stok sekarang ${kata(sisaStok(k))}. Periksa dengan penjumlahan.`;
  }
  if (k.mode === "periksa") {
    if (!sudahAmbilSemua(k)) return "Kurangi stoknya dulu, lalu periksa dengan penjumlahan.";
    return `${besar(kata(c))} ditambah ${kata(k.b)} sama dengan ${kata(k.a)}. Kartu stok cocok dengan isi rak.`;
  }
  if (k.mode === "keluarga") return `Keluarga bilangan: ${kata(k.b)}, ${kata(c)}, dan ${kata(k.a)}. Buka keempat kalimatnya.`;
  if (!bolehSepuluh(k)) return "Kurangi dari Sepuluh dipakai untuk bilangan awal sebelas sampai dua puluh.";
  if (k.sepuluhLangkah === 0) return `Kurangi dari sepuluh: sepuluh dikurangi ${kata(k.b)}, lalu tambahkan sisa dari ${kata(k.a)}.`;
  if (k.sepuluhLangkah === 1) return `Sepuluh dikurangi ${kata(k.b)} sama dengan ${kata(10 - k.b)}. Sekarang tambahkan ${kata(k.a - 10)}.`;
  return `${besar(kata(10 - k.b))} ditambah ${kata(k.a - 10)} sama dengan ${kata(c)}.`;
}
