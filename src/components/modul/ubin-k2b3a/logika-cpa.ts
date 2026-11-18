/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 2 Bab 3 Sub-Bab A "Ubin untuk Taman Bermain" (bangun datar): jenis soal, kunci, pilihan,
 * instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-cpa-ubin-k2b3a.mjs.
 * Jawaban bukan hanya angka: nama bentuk (pilih atau ucapkan), satu angka banyak sisi (kanvas), memilah ke diagram Venn, dan mengetuk benda.
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { IKON_CARA, NAMA_CARA, URUT_CARA, kata, type Cara } from "../lemari-k1b1a/logika";
import { kata } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";

/* ------------------------------ Bentuk ------------------------------ */
export type Kind = "segitiga" | "segiempat" | "segilima" | "segienam" | "segitujuh" | "segidelapan" | "lingkaran" | "telur" | "separuh";
export const INFO: Record<Kind, { nama: string; sisi: number; lengkung: boolean }> = {
  segitiga: { nama: "segitiga", sisi: 3, lengkung: false },
  segiempat: { nama: "segi empat", sisi: 4, lengkung: false },
  segilima: { nama: "segi lima", sisi: 5, lengkung: false },
  segienam: { nama: "segi enam", sisi: 6, lengkung: false },
  segitujuh: { nama: "segi tujuh", sisi: 7, lengkung: false },
  segidelapan: { nama: "segi delapan", sisi: 8, lengkung: false },
  lingkaran: { nama: "lingkaran", sisi: 0, lengkung: true },
  telur: { nama: "bentuk lengkung", sisi: 0, lengkung: true },
  separuh: { nama: "bentuk lengkung", sisi: 0, lengkung: true },
};
export const KIND_SISI: Record<number, Kind> = { 3: "segitiga", 4: "segiempat", 5: "segilima", 6: "segienam", 7: "segitujuh", 8: "segidelapan" };
export const namaSisi = (n: number): string => INFO[KIND_SISI[n]].nama;
/** Urutan nama untuk pilihan jawaban. */
export const URUT_NAMA = ["segitiga", "segi empat", "segi lima", "segi enam", "segi tujuh", "segi delapan", "lingkaran", "bentuk lengkung"] as const;
export const sisiDariNama = (nama: string): number => (Object.values(INFO).find((i) => i.nama === nama && i.sisi > 0)?.sisi ?? 0);

/** Nama benda taman untuk tiap bentuk (berbeda dari Story). */
export const BENDA: Record<Kind, string[]> = {
  segitiga: ["bendera kecil", "atap tenda", "papan petunjuk"],
  segiempat: ["papan tulis kecil", "pintu pos", "bangku taman"],
  segilima: ["tanda arah", "papan nama", "rumah kelinci"],
  segienam: ["tutup baut", "meja bunga", "lampu taman"],
  segitujuh: ["papan hias", "kotak kayu", "pagar bunga"],
  segidelapan: ["papan berhenti", "tutup sumur", "payung taman"],
  lingkaran: ["roda ayunan", "tutup kaleng", "bola karet"],
  telur: ["kolam ikan", "bantal bulat", "telur hias"],
  separuh: ["tenda kubah", "pintu lengkung", "jendela atas"],
};
export const EMOJI_BENDA: Record<Kind, string> = {
  segitiga: "\u{1F6A9}",
  segiempat: "\u{1F6AA}",
  segilima: "\u{1F3E0}",
  segienam: "\u{1F36F}",
  segitujuh: "\u{1F4E6}",
  segidelapan: "\u{1F6D1}",
  lingkaran: "\u{26BD}",
  telur: "\u{1F95A}",
  separuh: "\u{1F319}",
};
/** Nama benda ke-i dalam sebuah daftar bentuk (kemunculan ke berapa untuk bentuk itu). */
export function namaBendaKe(isi: readonly Kind[], i: number): string {
  const ke = isi.slice(0, i).filter((k) => k === isi[i]).length;
  const d = BENDA[isi[i]];
  return d[ke % d.length];
}

/* ------------------------------ Langkah ------------------------------ */
/** Metode IGIL: bentuk bertanda awal; hitung sisinya berputar. `awal`: sisi yang bertanda (dari nol). */
export type LHitung = { tipe: "hitung"; bentuk: Kind; awal: number };
/** Geoboard: karet melewati paku (kolom, baris) berurutan lalu kembali ke paku pertama. Banyak sisi = banyak paku. */
export type LPapan = { tipe: "papan"; paku: [number, number][] };
export type ItemVenn = { bentuk: Kind; merah: boolean };
/** Venn Diagram: lingkaran kiri "segi banyak", lingkaran kanan warna. */
export type LVenn = { tipe: "venn"; isi: ItemVenn[] };
/** Shape Hunt: benda di taman. `sasaran`: bentuk yang diburu. `sorot`: benda yang ditunjuk panah (untuk jawaban suara). */
export type LBuru = { tipe: "buru"; isi: Kind[]; sasaran: Kind; sorot: number };
export type LangkahDasar = LHitung | LPapan | LVenn | LBuru;
/** Cari kesalahan: tokoh sudah menjawab nama bentuk. Anak memutuskan benar atau salah, memilih alasan, lalu menjawab sendiri. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LHitung | LPapan;
  tokoh: string;
  kataTokoh: string;
  /** Nama yang disebut tokoh (bila salah). */
  jawabTokoh?: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "papan" | "venn" | "buru";
export const URUT_METODE: Metode[] = ["igil", "papan", "venn", "buru"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Tandai Awal, Hitung Berputar",
  papan: "Geoboard: Papan Paku",
  venn: "Venn Diagram: Diagram Venn",
  buru: "Shape Hunt: Berburu Bentuk",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F6A9}", papan: "\u{1F4CC}", venn: "\u{2B55}", buru: "\u{1F50D}" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);
export const metodeLangkah = (l: Langkah): Metode => {
  const t = dasarDari(l).tipe;
  return t === "hitung" ? "igil" : t;
};

/* ------------------------------ Hitungan dari data ------------------------------ */
export const sisiHitung = (l: LHitung): number => INFO[l.bentuk].sisi;
export type Zona = "kiri" | "tengah" | "kanan" | "luar";
/** Letak benda pada diagram Venn: kiri = hanya segi banyak, kanan = hanya merah, tengah = keduanya. */
export const zonaVenn = (it: ItemVenn): Zona => {
  const a = !INFO[it.bentuk].lengkung;
  return a && it.merah ? "tengah" : a ? "kiri" : it.merah ? "kanan" : "luar";
};
export const NAMA_ZONA: Record<Zona, string> = { kiri: "hanya segi banyak", tengah: "kedua ciri", kanan: "hanya merah", luar: "di luar kedua ciri" };
export const jumlahSasaran = (l: LBuru): number => l.isi.filter((k) => k === l.sasaran).length;
export const jumlahTengah = (l: LVenn): number => l.isi.filter((it) => zonaVenn(it) === "tengah").length;

/** Banyak sisi karet pada papan paku. */
export const sisiPapan = (l: LPapan): number => l.paku.length;
export const bentukPapan = (l: LPapan): Kind => KIND_SISI[l.paku.length];

export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string };

/** Kunci tiap soal menurut caranya, dihitung dari data. Null bila soal selesai lewat kegiatan (memilah atau mengetuk benda). */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, cara);
  switch (l.tipe) {
    case "hitung":
      return cara === "kanvas" ? { jenis: "angka", n: sisiHitung(l) } : { jenis: "nama", nama: INFO[l.bentuk].nama };
    case "papan":
      return cara === "kanvas" ? { jenis: "angka", n: sisiPapan(l) } : { jenis: "nama", nama: INFO[bentukPapan(l)].nama };
    case "venn":
      if (cara === "klik") return null;
      if (cara === "kanvas") return { jenis: "angka", n: jumlahTengah(l) };
      return { jenis: "nama", nama: INFO[l.isi.find((it) => zonaVenn(it) === "tengah")?.bentuk ?? "segilima"].nama };
    case "buru":
      if (cara === "klik") return null;
      if (cara === "kanvas") return { jenis: "angka", n: jumlahSasaran(l) };
      return { jenis: "nama", nama: INFO[l.isi[l.sorot]].nama };
  }
}

/**
 * Apakah soal langsung siap dijawab (tanpa kegiatan lebih dulu)? Kanvas dan suara: ya (gambar sudah jadi). Klik: hanya Abstract hitung dan papan (kata saja).
 * Cari kesalahan dan memilah atau mengetuk benda selalu memakai kegiatan.
 */
export function siapLangsung(l: Langkah, rupa: Rupa, cara: Cara): boolean {
  if (l.tipe === "salah") return false;
  if (cara !== "klik") return true;
  if (l.tipe === "hitung" || l.tipe === "papan") return rupa === "lambang";
  return false;
}

/** Pilihan nama bentuk di sekitar kunci (empat), memuat nama yang disebut tokoh bila ada. */
export function pilihanNamaDari(nama: string, tambahan?: string): string[] {
  const urut = [...URUT_NAMA] as string[];
  const i = Math.max(0, urut.indexOf(nama));
  const ada = [nama];
  if (tambahan && !ada.includes(tambahan) && urut.includes(tambahan)) ada.push(tambahan);
  for (let d = 1; ada.length < 4 && d < urut.length; d += 1) {
    for (const j of [i + d, i - d]) if (ada.length < 4 && j >= 0 && j < urut.length && !ada.includes(urut[j])) ada.push(urut[j]);
  }
  return urut.filter((n) => ada.includes(n));
}
export function pilihanNama(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  return k?.jenis === "nama" ? pilihanNamaDari(k.nama, l.tipe === "salah" ? l.jawabTokoh : undefined) : [];
}

/* ------------------------------ Kalimat ------------------------------ */
export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "hitung":
      return `Bentuk itu punya ${kata(sisiHitung(d))} sisi, jadi namanya ${INFO[d.bentuk].nama}.`;
    case "papan":
      return `Karet melewati ${kata(sisiPapan(d))} paku, jadi ada ${kata(sisiPapan(d))} sisi lurus dan namanya ${INFO[bentukPapan(d)].nama}.`;
    case "venn":
      return cara === "klik" ? "Semua bentuk sudah di tempatnya. Bagian tengah memuat bentuk yang punya kedua ciri." : `Bagian tengah memuat bentuk yang punya kedua ciri. Ada ${kata(jumlahTengah(d))}.`;
    case "buru":
      return `Ada ${kata(jumlahSasaran(d))} benda berbentuk ${INFO[d.sasaran].nama}.`;
  }
}

/** Instruksi satu soal (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const benda = rupa === "benda" ? "ubin" : "gambar";
  const akhirNama = cara === "klik" ? "Lalu pilih namanya." : cara === "kanvas" ? "Lalu tulis banyak sisinya di kanvas." : "Lalu sebutkan namanya.";
  switch (l.tipe) {
    case "hitung":
      if (rupa === "lambang") return `Bacalah ciri bentuk di bawah. Hitung sisinya satu per satu mulai dari tanda awal. ${akhirNama}`;
      if (cara === "klik") return `Ketuk sisi ${benda} satu per satu, mulai dari sisi bertanda awal dan ikuti arah putaran. ${akhirNama}`;
      return `Hitung sisi ${benda} ini mulai dari tanda awal, ikuti arah putaran. ${akhirNama}`;
    case "papan":
      if (rupa === "lambang") return `Bacalah paku yang dilewati karet. Karet kembali ke paku yang pertama. ${akhirNama}`;
      if (cara === "klik") return `Rentangkan karet pada paku sesuai nomornya, satu per satu. ${akhirNama}`;
      return `Karet sudah dipasang pada papan paku. Hitung karet yang lurus. ${akhirNama}`;
    case "venn":
      if (cara === "klik") return rupa === "lambang" ? "Pilah kartu bentuk ke diagram Venn. Ketuk satu kartu, lalu ketuk tempatnya." : "Pilah bentuk ke diagram Venn. Ketuk satu bentuk, lalu ketuk tempatnya.";
      if (cara === "kanvas") return "Lihat diagram Venn. Berapa bentuk yang punya kedua ciri? Tulis banyaknya di kanvas.";
      return "Satu bentuk berada di bagian tengah diagram Venn, karena punya kedua ciri. Sebutkan namanya.";
    case "buru":
      if (cara === "klik") return `Berburu bentuk! Ketuk semua ${rupa === "lambang" ? "benda" : "benda"} yang berbentuk ${INFO[l.sasaran].nama}.`;
      if (cara === "kanvas") return `Hitung semua benda yang berbentuk ${INFO[l.sasaran].nama}. Tulis banyaknya di kanvas.`;
      return rupa === "lambang" ? "Lihat benda yang bertanda panah. Sebutkan nama bentuknya." : "Lihat benda yang ditunjuk panah. Sebutkan nama bentuknya.";
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  if (cara === "kanvas") return d.tipe === "venn" ? "Berapa bentuk di bagian tengah?" : d.tipe === "buru" ? `Berapa benda berbentuk ${INFO[d.sasaran].nama}?` : "Berapa banyak sisinya?";
  if (cara === "suara") return d.tipe === "venn" ? "Bentuk di bagian tengah bernama apa?" : d.tipe === "buru" ? "Bentuk benda itu bernama apa?" : "Bentuk itu bernama apa?";
  return "Bentuk itu bernama apa?";
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya (tanpa digit). `jawab`: nama yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (typeof jawab === "string" && l.jawabTokoh !== undefined && jawab === l.jawabTokoh) return `Itu jawaban ${l.tokoh} yang keliru. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  if (typeof jawab === "number") {
    if (l.tipe === "venn") return "Hitung bentuk yang punya kedua ciri: segi banyak dan merah. Bentuk itu ada di bagian yang bertumpuk.";
    if (l.tipe === "buru") return "Periksa sisi tiap benda satu per satu. Hitung hanya yang bentuknya sama dengan yang diburu.";
    return "Hitung lagi sisinya satu per satu mulai dari tanda awal, sampai kembali ke tanda. Jangan ada sisi yang terhitung dua kali.";
  }
  const m = sisiDariNama(jawab);
  if (l.tipe === "hitung" || l.tipe === "papan") return m > 0 ? `Nama itu untuk bentuk dengan ${kata(m)} sisi. Hitung lagi sisinya mulai dari tanda awal.` : "Bentuk ini bertepi lurus, jadi punya sisi. Hitung sisinya, lalu cari namanya.";
  if (l.tipe === "venn") return "Bentuk di bagian tengah punya dua ciri: tepinya lurus dan warnanya merah. Cari yang punya keduanya.";
  return "Periksa lagi tepi benda itu: lurus atau lengkung, lalu hitung sisinya.";
}

/** Petunjuk saat bentuk dipasang di tempat yang keliru pada diagram Venn. */
export function petunjukVenn(it: ItemVenn, rupa: Rupa): string {
  const a = !INFO[it.bentuk].lengkung;
  const warna = rupa === "diagram" ? (it.merah ? "gelap" : "terang") : it.merah ? "merah" : "bukan merah";
  return `Bentuk ini ${a ? "punya tepi lurus, jadi segi banyak" : "bertepi lengkung, jadi bukan segi banyak"}, dan warnanya ${warna}. Cocokkan dengan kedua ciri.`;
}

/** Petunjuk saat benda yang bukan sasaran diketuk pada Berburu Bentuk. */
export function petunjukBuru(kind: Kind, sasaran: Kind): string {
  const i = INFO[kind];
  return i.lengkung ? `Benda ini bertepi lengkung. Yang diburu berbentuk ${INFO[sasaran].nama}.` : `Benda ini punya ${kata(i.sisi)} sisi, bukan ${INFO[sasaran].nama}. Hitung sisinya.`;
}
