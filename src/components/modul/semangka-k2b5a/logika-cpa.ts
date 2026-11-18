/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 2 Bab 5 Sub-Bab A "Semangka Raksasa Pak Danu" (setengah dari benda utuh): jenis tugas, kunci,
 * pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-semangka-k2b5a.mjs.
 * Jawaban bukan hanya angka: memilih kata (setengah, bukan, dua, tiga, empat, sama, beda), mengetuk gambar, garis, atau potongan pita, dan satu angka di kanvas.
 * Luas bagian dihitung program dari bagian.ts, bukan kunci tetap.
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { kata } from "../lemari-k1b1a/logika";
import { banyakBagian, bagianWarna, kotakBagian, kotakTotal, semuaSama, setengah, simetri, arahGaris, type Bentuk, type Garis, type Gbr } from "./bagian";

export { IKON_CARA, NAMA_CARA, URUT_CARA, kata, type Cara } from "../lemari-k1b1a/logika";
export type { Bentuk, Garis, Gbr } from "./bagian";

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);
export const HURUF = ["A", "B", "C", "D", "E", "F"] as const;

/* ------------------------------ Kata jawaban ------------------------------ */
export type KataJ = "setengah" | "bukan" | "dua" | "tiga" | "empat" | "sama" | "beda";
export const GRUP_KATA: KataJ[][] = [
  ["setengah", "bukan"],
  ["dua", "tiga", "empat"],
  ["sama", "beda"],
];
const BILANGAN_KATA: Record<number, KataJ> = { 2: "dua", 3: "tiga", 4: "empat" };

/** Benda untuk rupa Concrete (emoji paling tinggi U+1FA95). Berbeda dari data Story (semangka, ember, gelas, labu, kertas). */
export const OBJEK = [
  { nama: "melon", emoji: "\u{1F348}", warna: "#BEF264", warna2: "#86EFAC", garis: "#3F6212" },
  { nama: "pizza", emoji: "\u{1F355}", warna: "#FDBA74", warna2: "#FCA5A5", garis: "#9A3412" },
  { nama: "roti tawar", emoji: "\u{1F35E}", warna: "#FDE68A", warna2: "#FCD34D", garis: "#92400E" },
  { nama: "cokelat batang", emoji: "\u{1F36B}", warna: "#D6A57A", warna2: "#B9835A", garis: "#451A03" },
  { nama: "sandwich", emoji: "\u{1F96A}", warna: "#FEF08A", warna2: "#BBF7D0", garis: "#713F12" },
  { nama: "wafel", emoji: "\u{1F9C7}", warna: "#FCD9A0", warna2: "#F5B96B", garis: "#78350F" },
] as const;

/* ------------------------------ Langkah ------------------------------ */
/** Metode IGIL "Dua Bagian, Sama Besar, Setengah": tiga pertanyaan Dika. hitung: banyak gambar yang setengah; nilai: satu gambar, setengah atau bukan. */
export type LIgil = { tipe: "igil"; mode: "hitung" | "nilai"; figs: Gbr[] };
/** Fair Sharing (Berbagi Adil): satu bentuk dengan beberapa garis calon (klik: ketuk garis yang adil; kanvas: hitung garis yang adil) atau semua garis sekaligus (suara: berapa bagian sama besar). */
export type LAdil = { tipe: "adil"; b: Bentuk; o?: number; garis: Garis[] };
/** Mirror Test (Uji Cermin): garis calon tempat cermin. Garis yang tidak adil memang sengaja tidak sama besar, supaya jawabannya tidak rancu. */
export type LCermin = { tipe: "cermin"; b: Bentuk; o?: number; garis: Garis[] };
/** Fraction Strips (Pita Pecahan): pita utuh `n` kotak; `potong` adalah panjang potongan (klik: empat calon; suara: dua potongan; kanvas: tidak dipakai). */
export type LPita = { tipe: "pita"; n: number; potong: number[]; o?: number };
export type LangkahDasar = LIgil | LAdil | LCermin | LPita;
/** Cari kesalahan: tokoh sudah menjawab tentang gambar `dasar` (igil, mode nilai). Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LIgil;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh?: KataJ;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "adil" | "cermin" | "pita";
export const URUT_METODE: Metode[] = ["igil", "adil", "cermin", "pita"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Dua Bagian, Sama Besar, Setengah",
  adil: "Fair Sharing: Berbagi Adil",
  cermin: "Mirror Test: Uji Cermin",
  pita: "Fraction Strips: Pita Pecahan",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F4D0}", adil: "\u{1F91D}", cermin: "\u{2194}", pita: "\u{1F380}" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);
export const metodeLangkah = (l: Langkah): Metode => (l.tipe === "salah" ? "igil" : l.tipe);

/* ------------------------------ Hitungan dari data ------------------------------ */
/** Gambar satu garis calon (Berbagi Adil dan Uji Cermin klik dan kanvas). */
export const gbrGaris = (l: LAdil | LCermin, i: number): Gbr => ({ b: l.b, o: l.o, g: [l.garis[i]] });
/** Gambar dengan semua garis sekaligus (Berbagi Adil suara). */
export const gbrSemua = (l: LAdil | LCermin): Gbr => ({ b: l.b, o: l.o, g: l.garis });
export const garisAdil = (l: LAdil): number[] => l.garis.map((_, i) => i).filter((i) => setengah(gbrGaris(l, i)));
export const garisCermin = (l: LCermin): number[] => l.garis.map((_, i) => i).filter((i) => simetri(gbrGaris(l, i)));
export const gambarSetengah = (figs: readonly Gbr[]): number[] => figs.map((_, i) => i).filter((i) => setengah(figs[i]));
export const setengahPita = (l: LPita): number => l.n / 2;
export const potonganSetengah = (l: LPita): number[] => l.potong.map((_, i) => i).filter((i) => l.potong[i] * 2 === l.n);

/** Jawaban tugas yang diselesaikan dengan mengetuk (klik): nomor garis atau potongan yang benar. */
export function nomorKetuk(l: LangkahDasar): number {
  if (l.tipe === "igil") return -1;
  if (l.tipe === "adil") return garisAdil(l)[0] ?? -1;
  if (l.tipe === "cermin") return garisCermin(l)[0] ?? -1;
  return potonganSetengah(l)[0] ?? -1;
}

export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: KataJ };

/** Kunci tiap tugas menurut caranya, dihitung dari data. Null bila tugas selesai lewat kegiatan (mengetuk). */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  switch (l.tipe) {
    case "igil":
      if (l.mode === "nilai") return { jenis: "nama", nama: setengah(l.figs[0]) ? "setengah" : "bukan" };
      return { jenis: "angka", n: gambarSetengah(l.figs).length };
    case "adil":
      if (cara === "klik") return null;
      if (cara === "kanvas") return { jenis: "angka", n: garisAdil(l).length };
      return { jenis: "nama", nama: BILANGAN_KATA[banyakBagian(gbrSemua(l))] ?? "dua" };
    case "cermin":
      if (cara === "klik") return null;
      if (cara === "kanvas") return { jenis: "angka", n: garisCermin(l).length };
      return { jenis: "nama", nama: simetri(gbrGaris(l, 0)) ? "sama" : "beda" };
    case "pita":
      if (cara === "klik") return null;
      if (cara === "kanvas") return { jenis: "angka", n: setengahPita(l) };
      return { jenis: "nama", nama: l.potong[0] * 2 === l.n ? "setengah" : "bukan" };
  }
}

/**
 * Apakah tugas langsung siap dijawab (tanpa kegiatan lebih dulu)? Kanvas dan suara: ya (gambar sudah jadi). Klik: hanya bila punya kunci tanpa kegiatan.
 * Cari kesalahan selalu memakai kegiatan. Tidak bergantung pada rupa, sehingga tidak macet pada lambang.
 */
export function siapLangsung(l: Langkah, rupa: Rupa, cara: Cara): boolean {
  void rupa;
  if (l.tipe === "salah") return false;
  return kunciJawab(l, cara) !== null;
}

/** Pilihan kata di sekitar kunci: seluruh kelompoknya (setengah dan bukan; dua, tiga, empat; sama dan beda). */
export function pilihanKataDari(nama: KataJ): KataJ[] {
  return GRUP_KATA.find((g) => g.includes(nama)) ?? GRUP_KATA[0];
}
export function pilihanKata(l: Langkah): KataJ[] {
  const k = kunciJawab(l, "klik");
  return k?.jenis === "nama" ? pilihanKataDari(k.nama) : [];
}

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : "gambar");
const namaBentuk = (b: Bentuk): string => (b === "panjang" ? "persegi panjang" : b);

/** Penjelasan mengapa sebuah gambar bukan setengah (tanpa digit). */
export function alasanBukan(gb: Gbr): string {
  const n = banyakBagian(gb);
  if (n !== 2) return `Gambar itu dibagi menjadi ${kata(n)} bagian, padahal setengah harus dua bagian.`;
  return "Gambar itu dibagi dua, tetapi kedua bagiannya tidak sama besar, jadi bukan setengah.";
}

export function kalimatKunci(l: Langkah, cara: Cara, rupa: Rupa = "benda"): string {
  void rupa;
  const d = dasarDari(l);
  const kunci = kunciJawab(l, cara);
  switch (d.tipe) {
    case "igil":
      if (d.mode === "hitung") return `Ada ${kata(kunci?.jenis === "angka" ? kunci.n : 0)} gambar yang menunjukkan setengah.`;
      return kunci?.jenis === "nama" && kunci.nama === "setengah" ? "Dua bagian, sama besar, dan yang ditunjuk satu bagian. Itu setengah." : alasanBukan(d.figs[0]);
    case "adil":
      if (cara === "klik") return "Garis itu membuat dua bagian sama besar, jadi adil untuk dua orang.";
      if (cara === "kanvas") return `Ada ${kata(kunci?.jenis === "angka" ? kunci.n : 0)} garis yang membuat dua bagian sama besar.`;
      return `Benda itu dibagi menjadi ${kunci?.jenis === "nama" ? kunci.nama : "dua"} bagian sama besar.`;
    case "cermin":
      if (cara === "klik") return "Bayangan satu sisi persis menutup sisi yang lain, jadi garis itu membagi sama besar.";
      if (cara === "kanvas") return `Ada ${kata(kunci?.jenis === "angka" ? kunci.n : 0)} garis yang membuat bayangan persis sama.`;
      return kunci?.jenis === "nama" && kunci.nama === "sama" ? "Bayangan kedua sisi persis sama, jadi garisnya membagi sama besar." : "Bayangan tidak menutup sisi yang lain, jadi kedua sisi tidak sama besar.";
    case "pita":
      if (cara === "klik") return "Dua potongan sepanjang itu menutupi pita utuh dengan pas, jadi itu setengah.";
      if (cara === "kanvas") return `Setengah pita itu sama dengan ${kata(setengahPita(d))} kotak.`;
      return kunci?.jenis === "nama" && kunci.nama === "setengah" ? "Dua potongan sama panjang, jadi tiap potongan adalah setengah." : "Kedua potongan tidak sama panjang, jadi bukan setengah.";
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  switch (l.tipe) {
    case "igil":
      if (l.mode === "hitung") return `Periksa semua ${g} dengan tiga pertanyaan Dika. Ada berapa ${g} yang menunjukkan setengah? Tulis satu angka di kanvas.`;
      return `Periksa ${g} ini dengan tiga pertanyaan Dika. Apakah bagian yang ditunjuk adalah setengah? Ucapkan setengah atau bukan.`;
    case "adil":
      if (cara === "klik") return "Berbagi Adil untuk dua orang: ketuk garis potong yang membuat dua bagian sama besar.";
      if (cara === "kanvas") return "Berbagi Adil untuk dua orang: ada berapa garis potong yang membuat dua bagian sama besar? Tulis satu angka di kanvas.";
      return "Benda ini dibagi adil: semua bagiannya sama besar. Dibagi menjadi berapa bagian? Ucapkan satu kata bilangan.";
    case "cermin":
      if (cara === "klik") return "Uji Cermin: letakkan cermin di tiap garis. Ketuk garis yang membuat bayangan satu sisi persis sama dengan sisi yang lain.";
      if (cara === "kanvas") return "Uji Cermin: ada berapa garis yang membuat bayangan persis sama dengan sisi yang lain? Tulis satu angka di kanvas.";
      return "Uji Cermin: cermin ada di garis ini. Bayangan sisi yang satu dan sisi yang lain sama atau beda? Ucapkan satu kata.";
    case "pita":
      if (cara === "klik") return "Pita Pecahan: bandingkan dengan pita utuh. Ketuk potongan pita yang menunjukkan setengah.";
      if (cara === "kanvas") return "Pita Pecahan: lihat pita utuh. Setengah pita itu sama dengan berapa kotak? Tulis satu angka di kanvas.";
      return "Pita Pecahan: pita utuh dipotong menjadi dua. Apakah potongan pertama adalah setengah? Ucapkan setengah atau bukan.";
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  if (d.tipe === "igil") return d.mode === "hitung" ? "Berapa gambar yang menunjukkan setengah?" : "Apakah bagian yang ditunjuk itu setengah?";
  if (d.tipe === "adil") return cara === "kanvas" ? "Berapa garis yang membuat dua bagian sama besar?" : "Dibagi menjadi berapa bagian sama besar?";
  if (d.tipe === "cermin") return cara === "kanvas" ? "Berapa garis yang membuat bayangan persis sama?" : "Bayangannya sama atau beda?";
  return cara === "kanvas" ? "Setengah pita itu sama dengan berapa kotak?" : "Apakah potongan pertama itu setengah?";
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya (tanpa digit). `jawab`: kata yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number, rupa: Rupa = "benda"): string {
  if (l.tipe === "salah") {
    if (typeof jawab === "string" && l.jawabTokoh !== undefined && jawab === l.jawabTokoh) return `Itu jawaban ${l.tokoh} yang keliru. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab, rupa);
  }
  if (typeof jawab === "number") {
    switch (l.tipe) {
      case "igil":
        return `Periksa tiap ${sebut(rupa)} dengan tiga pertanyaan Dika, dan hitung hanya yang lolos ketiganya: dua bagian, sama besar, satu bagian yang ditunjuk.`;
      case "adil":
        return "Hitung hanya garis yang membuat dua bagian sama besar. Garis yang bergeser dari tengah membuat satu bagian besar dan satu bagian kecil.";
      case "cermin":
        return "Hitung hanya garis yang membuat bayangan persis menutup sisi yang lain. Garis yang bergeser dari tengah membuat bayangan menjulur.";
      case "pita":
        return "Setengah pita berarti dua potongan sama panjang menutupi pita utuh. Bagi panjang pita menjadi dua bagian sama.";
    }
  }
  const kunci = kunciJawab(l, cara);
  const k = kunci?.jenis === "nama" ? kunci.nama : null;
  if (k === "bukan" && l.tipe === "igil") return `Periksa dulu. ${alasanBukan(l.figs[0])}`;
  if (k === "setengah" && l.tipe === "igil") return "Dua bagian, sama besar, dan yang ditunjuk satu bagian. Ketiga pertanyaan Dika terpenuhi, jadi itu setengah.";
  if (l.tipe === "pita") return k === "bukan" ? "Panjang kedua potongan berbeda. Dua potongan itu tidak bisa menutupi pita utuh dengan pas, jadi bukan setengah." : "Dua potongan sama panjang dan menutupi pita utuh dengan pas, jadi itu setengah.";
  if (l.tipe === "adil") return "Hitung semua bagian yang dibuat garis, termasuk bagian yang tidak berwarna. Bagian yang sama besar dilihat dari luasnya.";
  if (l.tipe === "cermin") return k === "sama" ? "Kedua sisi saling menutup dengan pas, jadi bayangannya sama." : "Kedua sisi tidak saling menutup, karena satu sisi lebih besar. Jadi bayangannya beda.";
  return "Periksa lagi gambarnya dengan teliti.";
}

/** Petunjuk saat garis yang diketuk keliru pada Berbagi Adil atau Uji Cermin. */
export function petunjukGaris(l: LAdil | LCermin, i: number): string {
  void i;
  if (l.tipe === "adil") return "Garis itu membuat satu bagian lebih besar daripada bagian yang lain, jadi tidak adil untuk dua orang. Cari garis yang tepat di tengah.";
  return "Kalau cermin ada di garis itu, bayangan satu sisi menjulur karena sisi yang satu lebih besar. Cari garis yang membuat bayangan persis menutup.";
}
/** Petunjuk saat potongan pita yang diketuk keliru. */
export function petunjukPotong(l: LPita, i: number): string {
  const p = l.potong[i];
  if (p * 2 < l.n) return "Potongan itu terlalu pendek: dua potongan seperti itu belum menutupi pita utuh.";
  if (p * 2 > l.n) return "Potongan itu terlalu panjang: dua potongan seperti itu melewati pita utuh.";
  return "";
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
/** Baris kartu kata untuk sebuah gambar: bentuk, seluruhnya, luas bagian-bagiannya (banyak bagian dihitung anak), dan yang ditunjuk (angka boleh tampil di layar; suara tidak membacanya). */
export function barisKartu(gb: Gbr): string[] {
  const total = kotakTotal(gb.b);
  const bagi = kotakBagian(gb, total);
  const w = bagianWarna(gb);
  const baris = [`${kapital(namaBentuk(gb.b))}: ${total} kotak`, `Bagian: ${bagi.join(" + ")} kotak`];
  if (w >= 0) baris.push(`Ditunjuk: ${bagi[w]} kotak`);
  return baris;
}
/** Kartu kata satu garis (Berbagi Adil dan Uji Cermin di Abstract): arah garis dan luas kedua bagian. */
export function barisGarisKartu(l: LAdil | LCermin, i: number): string {
  const total = kotakTotal(l.b);
  const bagi = kotakBagian(gbrGaris(l, i), total);
  return `Garis ${arahGaris(l.garis[i])}: ${bagi.join(" dan ")} kotak`;
}
/** Semua bagian sama besar? (dipakai uji dan penjelasan) */
export const sama = semuaSama;
