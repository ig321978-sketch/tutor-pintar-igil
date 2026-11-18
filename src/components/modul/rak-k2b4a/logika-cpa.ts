/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 2 Bab 4 Sub-Bab A "Rak Pameran Pak Hasan" (posisi benda): jenis soal, kunci, pilihan,
 * instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-rak-k2b4a.mjs.
 * Jawaban bukan hanya angka: kata posisi (pilih atau ucapkan), mengetuk kotak tempat benda, mengetuk benda yang cocok dengan gabungan petunjuk,
 * dan satu angka di kanvas (urutan dari kiri, banyak benda, nomor baris atau kolom).
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { IKON_CARA, NAMA_CARA, URUT_CARA, kata, type Cara } from "../lemari-k1b1a/logika";
import { kata } from "../lemari-k1b1a/logika";

/** Bilangan tingkat baku: pertama, kedua, ketiga, dan seterusnya. */
const urutKata = (n: number): string => (n === 1 ? "pertama" : `ke${kata(n)}`);
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

export type Rupa = "benda" | "diagram" | "lambang";

/* ------------------------------ Kata posisi ------------------------------ */
export type Kata = "atas" | "bawah" | "depan" | "belakang" | "kiri" | "kanan";
export type Arah = "atas" | "bawah" | "kiri" | "kanan";
export const URUT_KATA: Kata[] = ["atas", "bawah", "depan", "belakang", "kiri", "kanan"];
export const LAWAN: Record<Kata, Kata> = { atas: "bawah", bawah: "atas", depan: "belakang", belakang: "depan", kiri: "kanan", kanan: "kiri" };
/** Frasa kata posisi dalam kalimat. */
export const FRASA: Record<Kata, string> = { atas: "di atas", bawah: "di bawah", depan: "di depan", belakang: "di belakang", kiri: "di sebelah kiri", kanan: "di sebelah kanan" };
export const DX: Record<Arah, number> = { atas: 0, bawah: 0, kiri: -1, kanan: 1 };
export const DY: Record<Arah, number> = { atas: -1, bawah: 1, kiri: 0, kanan: 0 };

/* ------------------------------ Benda dan adegan ------------------------------ */
/** Nama delapan benda tiap rupa: benda pameran (Concrete dan Abstract) dan bangun polos berwarna (Pictorial). Berbeda dari data Story. */
export const NAMA_BENDA: Record<Rupa, string[]> = {
  benda: ["payung kertas", "keranjang", "topi anyaman", "bunga kertas", "layang-layang", "lonceng", "kerang", "kupu-kupu"],
  diagram: ["lingkaran biru", "persegi merah", "segitiga hijau", "lingkaran kuning", "persegi biru", "segitiga kuning", "lingkaran merah", "persegi hijau"],
  lambang: ["payung kertas", "keranjang", "topi anyaman", "bunga kertas", "layang-layang", "lonceng", "kerang", "kupu-kupu"],
};
export const EMOJI_BENDA: string[] = ["\u{1F302}", "\u{1F9FA}", "\u{1F452}", "\u{1F338}", "\u{1FA81}", "\u{1F514}", "\u{1F41A}", "\u{1F98B}"];
export type Bentuk = "lingkaran" | "persegi" | "segitiga";
export const BENTUK_BENDA: { bentuk: Bentuk; warna: string }[] = [
  { bentuk: "lingkaran", warna: "#60A5FA" },
  { bentuk: "persegi", warna: "#F87171" },
  { bentuk: "segitiga", warna: "#4ADE80" },
  { bentuk: "lingkaran", warna: "#FDE047" },
  { bentuk: "persegi", warna: "#2563EB" },
  { bentuk: "segitiga", warna: "#FACC15" },
  { bentuk: "lingkaran", warna: "#DC2626" },
  { bentuk: "persegi", warna: "#16A34A" },
];
export const namaBenda = (rupa: Rupa, k: number): string => NAMA_BENDA[rupa][k];

/** Satu benda di papan: `k` kode benda (0 sampai 7), letak kolom dan baris (mulai nol), `dep` 0 = di depan, 1 = di belakang (dua benda dalam satu petak). */
export type Benda = { k: number; kol: number; bar: number; dep?: 0 | 1 };
/** Papan berpetak `kol` kolom dan `bar` baris. Baris nol paling atas, kolom nol paling kiri (dilihat dari kita). */
export type Adegan = { kol: number; bar: number; isi: Benda[] };

/**
 * Letak benda `b` terhadap acuan `a` (dilihat dari kita yang melihat gambar): satu petak berdua menurut kedalaman, satu kolom menurut baris,
 * satu baris menurut kolom. Null bila tidak sejalur.
 */
export function hubungan(ad: Adegan, b: number, a: number): Kata | null {
  const x = ad.isi[b];
  const y = ad.isi[a];
  if (x.kol === y.kol && x.bar === y.bar) return (x.dep ?? 0) === (y.dep ?? 0) ? null : (x.dep ?? 0) < (y.dep ?? 0) ? "depan" : "belakang";
  if (x.kol === y.kol) return x.bar < y.bar ? "atas" : "bawah";
  if (x.bar === y.bar) return x.kol < y.kol ? "kiri" : "kanan";
  return null;
}
/** Apakah benda `i` berada di sisi `kata` dari acuan `a` (setengah bidang: boleh beda baris atau kolom). */
export const sisiCocok = (ad: Adegan, i: number, a: number, kata: Arah): boolean => {
  const x = ad.isi[i];
  const y = ad.isi[a];
  return kata === "atas" ? x.bar < y.bar : kata === "bawah" ? x.bar > y.bar : kata === "kiri" ? x.kol < y.kol : x.kol > y.kol;
};

/* ------------------------------ Langkah ------------------------------ */
/** Metode IGIL "Acuan, Kata, Kalimat": benda `t` yang diceritakan dan benda acuan `a` (nomor dalam `ad.isi`). `tanya` "a": letak acuan terhadap benda yang diceritakan (lawan kata). */
export type LAcuan = { tipe: "acuan"; ad: Adegan; t: number; a: number; tanya?: "t" | "a" };
/** Simon Says: Simon berkata "taruh benda `t` di `kata` acuan `a`". Klik: benda `t` ada di baki dan anak mengetuk petak tujuan; suara: lawan kata. */
export type LSimon = { tipe: "simon"; ad: Adegan; a: number; kata: Arah; t: number };
/** Treasure Map: peta berpetak, bintang di `mulai` (kolom, baris), lalu geser satu petak per petunjuk; harta di petak terakhir. */
export type LPeta = { tipe: "peta"; kol: number; bar: number; mulai: [number, number]; arah: Arah[]; hitung: "baris" | "kolom" };
/** Satu petunjuk Permainan Sekat: baris (tingkat) atas atau bawah, atau sisi terhadap benda acuan. */
export type Petunjuk = { j: "tingkat"; bar: number } | { j: "rel"; kata: Arah; a: number };
/** Barrier Game: dua petunjuk digabung sampai tinggal satu benda (`sasaran`). */
export type LSekat = { tipe: "sekat"; ad: Adegan; petunjuk: [Petunjuk, Petunjuk]; sasaran: number };
export type LangkahDasar = LAcuan | LSimon | LPeta | LSekat;
/** Cari kesalahan: tokoh sudah menjawab kata posisi. Anak memutuskan benar atau salah, memilih alasan, lalu menjawab sendiri. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LAcuan;
  tokoh: string;
  kataTokoh: string;
  /** Kata yang disebut tokoh (bila salah). */
  jawabTokoh?: Kata;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "simon" | "peta" | "sekat";
export const URUT_METODE: Metode[] = ["igil", "simon", "peta", "sekat"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Acuan, Kata, Kalimat",
  simon: "Simon Says: Simon Berkata",
  peta: "Treasure Map: Peta Harta Karun",
  sekat: "Barrier Game: Permainan Sekat",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F4CD}", simon: "\u{1F4AC}", peta: "\u{1F5FA}", sekat: "\u{1F6A7}" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);
export const metodeLangkah = (l: Langkah): Metode => {
  const t = dasarDari(l).tipe;
  return t === "acuan" ? "igil" : t;
};

/* ------------------------------ Hitungan dari data ------------------------------ */
/** Benda yang cocok dengan satu petunjuk Permainan Sekat. */
export const cocokPetunjuk = (ad: Adegan, i: number, p: Petunjuk): boolean => (p.j === "tingkat" ? ad.isi[i].bar === p.bar : sisiCocok(ad, i, p.a, p.kata));
/** Semua benda yang cocok dengan kedua petunjuk (harus tinggal satu: `sasaran`). */
export const sisaSekat = (l: LSekat): number[] => l.ad.isi.map((_, i) => i).filter((i) => cocokPetunjuk(l.ad, i, l.petunjuk[0]) && cocokPetunjuk(l.ad, i, l.petunjuk[1]));
/** Banyak benda yang cocok dengan petunjuk pertama saja. */
export const jumlahPetunjukSatu = (l: LSekat): number => l.ad.isi.filter((_, i) => cocokPetunjuk(l.ad, i, l.petunjuk[0])).length;
/** Petak peta setelah semua petunjuk digeser dari bintang. */
export function petakHarta(l: LPeta): [number, number] {
  let [x, y] = l.mulai;
  for (const a of l.arah) {
    x += DX[a];
    y += DY[a];
  }
  return [x, y];
}
/** Jalur petak dari bintang sampai harta (termasuk bintang). */
export function jalurPeta(l: LPeta): [number, number][] {
  let [x, y] = l.mulai;
  const out: [number, number][] = [[x, y]];
  for (const a of l.arah) {
    x += DX[a];
    y += DY[a];
    out.push([x, y]);
  }
  return out;
}
/** Petak kosong yang sah untuk perintah Simon (satu jalur dengan acuan, di sisi yang disebut, tanpa benda lain). Harus tepat satu. */
export function petakSimon(l: LSimon): [number, number][] {
  const y = l.ad.isi[l.a];
  const hasil: [number, number][] = [];
  for (let b = 0; b < l.ad.bar; b += 1)
    for (let c = 0; c < l.ad.kol; c += 1) {
      const lurus = l.kata === "atas" ? c === y.kol && b < y.bar : l.kata === "bawah" ? c === y.kol && b > y.bar : l.kata === "kiri" ? b === y.bar && c < y.kol : b === y.bar && c > y.kol;
      const terisi = l.ad.isi.some((x, i) => i !== l.t && x.kol === c && x.bar === b);
      if (lurus && !terisi) hasil.push([c, b]);
    }
  return hasil;
}
/** Banyak benda lain di sisi yang disebut Simon (setengah bidang). */
export const jumlahSimon = (l: LSimon): number => l.ad.isi.filter((_, i) => i !== l.a && sisiCocok(l.ad, i, l.a, l.kata)).length;
/** Kata posisi benda yang diceritakan terhadap acuan (atau sebaliknya bila `tanya` "a"). */
export const kataAcuan = (l: LAcuan): Kata => {
  const h = l.tanya === "a" ? hubungan(l.ad, l.a, l.t) : hubungan(l.ad, l.t, l.a);
  return h ?? "atas";
};

export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: Kata };

/** Kunci tiap soal menurut caranya, dihitung dari data. Null bila soal selesai lewat kegiatan (mengetuk petak atau benda). */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, cara);
  switch (l.tipe) {
    case "acuan":
      return cara === "kanvas" ? { jenis: "angka", n: l.ad.isi[l.t].kol + 1 } : { jenis: "nama", nama: kataAcuan(l) };
    case "simon":
      if (cara === "klik") return null;
      if (cara === "kanvas") return { jenis: "angka", n: jumlahSimon(l) };
      return { jenis: "nama", nama: LAWAN[l.kata] };
    case "peta": {
      if (cara === "klik") return null;
      const [x, y] = petakHarta(l);
      if (cara === "kanvas") return { jenis: "angka", n: l.hitung === "baris" ? y + 1 : x + 1 };
      return { jenis: "nama", nama: LAWAN[l.arah[0]] };
    }
    case "sekat":
      if (cara === "klik") return null;
      if (cara === "kanvas") return { jenis: "angka", n: jumlahPetunjukSatu(l) };
      return { jenis: "nama", nama: (l.petunjuk[1] as { kata: Arah }).kata };
  }
}

/**
 * Apakah soal langsung siap dijawab (tanpa kegiatan lebih dulu)? Kanvas dan suara: ya (gambar sudah jadi). Klik: hanya soal Acuan (memilih kata).
 * Cari kesalahan, mengetuk petak, dan mengetuk benda selalu memakai kegiatan. Tidak bergantung pada rupa, sehingga tombol tidak macet pada lambang.
 */
export function siapLangsung(l: Langkah, _rupa: Rupa, cara: Cara): boolean {
  if (l.tipe === "salah") return false;
  if (cara !== "klik") return true;
  return l.tipe === "acuan";
}

/** Pilihan kata posisi di sekitar kunci (empat), memuat lawannya dan kata yang disebut tokoh bila ada. */
export function pilihanKataDari(nama: Kata, tambahan?: Kata): Kata[] {
  const ada: Kata[] = [nama, LAWAN[nama]];
  if (tambahan && !ada.includes(tambahan)) ada.push(tambahan);
  for (const k of URUT_KATA) if (ada.length < 4 && !ada.includes(k)) ada.push(k);
  return URUT_KATA.filter((n) => ada.includes(n));
}
export function pilihanKata(l: Langkah): Kata[] {
  const k = kunciJawab(l, "klik");
  return k?.jenis === "nama" ? pilihanKataDari(k.nama, l.tipe === "salah" ? l.jawabTokoh : undefined) : [];
}

/* ------------------------------ Kalimat ------------------------------ */
const frasaPetunjuk = (p: Petunjuk, rupa: Rupa, ad: Adegan): string => (p.j === "tingkat" ? `ada di baris ${p.bar === 0 ? "atas" : "bawah"}` : `ada ${FRASA[p.kata]} ${namaBenda(rupa, ad.isi[p.a].k)}`);
export const kalimatPetunjuk = frasaPetunjuk;
const langkahPeta = (arah: Arah[]): string => arah.map((a, i) => `${i === 0 ? "" : "lalu "}satu kotak ke ${a === "atas" ? "atas" : a === "bawah" ? "bawah" : a}`).join(", ");
export const kalimatLangkahPeta = langkahPeta;

/** Kalimat posisi tiga bagian: benda yang diceritakan, kata posisi, benda acuan. */
export const kalimatPosisi = (rupa: Rupa, ad: Adegan, t: number, a: number, k: Kata): string => `${namaBenda(rupa, ad.isi[t].k)} ${FRASA[k]} ${namaBenda(rupa, ad.isi[a].k)}`;

export function kalimatKunci(l: Langkah, cara: Cara, rupa: Rupa = "benda"): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "acuan": {
      if (cara === "kanvas") return `${kapital(namaBenda(rupa, d.ad.isi[d.t].k))} berada pada urutan ${urutKata(d.ad.isi[d.t].kol + 1)} dari kiri.`;
      const k = kataAcuan(d);
      return d.tanya === "a" ? `${kalimatPosisi(rupa, d.ad, d.a, d.t, k)}.` : `${kalimatPosisi(rupa, d.ad, d.t, d.a, k)}.`;
    }
    case "simon":
      if (cara === "klik") return `${namaBenda(rupa, d.ad.isi[d.t].k)} ${FRASA[d.kata]} ${namaBenda(rupa, d.ad.isi[d.a].k)}, sesuai perintah Simon.`;
      if (cara === "kanvas") return `Ada ${kata(jumlahSimon(d))} benda ${FRASA[d.kata]} ${namaBenda(rupa, d.ad.isi[d.a].k)}.`;
      return `${namaBenda(rupa, d.ad.isi[d.t].k)} ${FRASA[d.kata]} ${namaBenda(rupa, d.ad.isi[d.a].k)}, jadi ${namaBenda(rupa, d.ad.isi[d.a].k)} ${FRASA[LAWAN[d.kata]]} ${namaBenda(rupa, d.ad.isi[d.t].k)}.`;
    case "peta": {
      const [x, y] = petakHarta(d);
      if (cara === "kanvas") return d.hitung === "baris" ? `Harta ada di baris ${urutKata(y + 1)}, dihitung dari atas.` : `Harta ada di kolom ${urutKata(x + 1)}, dihitung dari kiri.`;
      if (cara === "suara") return `Harta ada di ${d.arah[0]} bintang, jadi bintang ada di ${LAWAN[d.arah[0]]} harta.`;
      return "Harta ditemukan dengan menggeser satu kotak untuk tiap petunjuk.";
    }
    case "sekat":
      if (cara === "klik") return `Dua petunjuk digabung, dan tinggal satu benda: ${namaBenda(rupa, d.ad.isi[d.sasaran].k)}.`;
      if (cara === "kanvas") return `Ada ${kata(jumlahPetunjukSatu(d))} benda yang ${frasaPetunjuk(d.petunjuk[0], rupa, d.ad)}.`;
      return `Benda itu ${frasaPetunjuk(d.petunjuk[1], rupa, d.ad)}.`;
  }
}

/** Instruksi satu soal (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const nm = (i: number, ad: Adegan) => namaBenda(rupa, ad.isi[i].k);
  switch (l.tipe) {
    case "acuan": {
      const nt = nm(l.t, l.ad);
      const na = nm(l.a, l.ad);
      if (cara === "kanvas") return `Hitung dari kiri, mulai dari benda paling kiri. ${kapital(nt)} berada pada urutan ke berapa dari kiri? Tulis satu angka di kanvas.`;
      const tanya = l.tanya === "a" ? `Di mana ${na} berada terhadap ${nt}?` : `Di mana ${nt} berada terhadap ${na}?`;
      return cara === "klik" ? `${tanya} Lihat papannya, lalu pilih kata posisinya.` : `${tanya} Lihat papannya, lalu ucapkan satu kata posisinya.`;
    }
    case "simon": {
      const nt = nm(l.t, l.ad);
      const na = nm(l.a, l.ad);
      if (cara === "klik") return `Simon berkata: taruh ${nt} ${FRASA[l.kata]} ${na}. Ketuk kotak kosong yang tepat.`;
      if (cara === "kanvas") return `Simon berkata: hitung semua benda yang ada ${FRASA[l.kata]} ${na}. Tulis banyaknya di kanvas.`;
      return `Simon berkata: ${nt} ${FRASA[l.kata]} ${na}. Lalu di mana ${na} berada terhadap ${nt}? Ucapkan satu kata.`;
    }
    case "peta": {
      const langkah = langkahPeta(l.arah);
      if (cara === "klik") return `Peta Harta Karun: mulai dari bintang, geser ${langkah}. Ketuk kotak tempat harta.`;
      if (cara === "kanvas") return `Mulai dari bintang, geser ${langkah}. Harta ada di ${l.hitung === "baris" ? "baris" : "kolom"} ke berapa, dihitung dari ${l.hitung === "baris" ? "atas" : "kiri"}? Tulis satu angka di kanvas.`;
      return `Harta ada ${kata(l.arah.length)} kotak ke arah ${l.arah[0]} dari bintang. Dari harta, di mana bintang berada? Ucapkan satu kata posisi.`;
    }
    case "sekat": {
      const p1 = frasaPetunjuk(l.petunjuk[0], rupa, l.ad);
      const p2 = frasaPetunjuk(l.petunjuk[1], rupa, l.ad);
      if (cara === "klik") return `Permainan Sekat: cari benda yang ${p1}, dan ${p2}. Ketuk satu benda yang cocok dengan kedua petunjuk.`;
      if (cara === "kanvas") return `Petunjuk pertama: benda ${p1}. Hitung semua benda yang cocok dengan petunjuk pertama saja. Tulis banyaknya di kanvas.`;
      const pk = l.petunjuk[1];
      const a2 = pk.j === "rel" ? nm(pk.a, l.ad) : "";
      return `Benda yang bertanda panah ${p1}. Petunjuk kedua tertutup sekat: benda itu ada ... ${a2}. Ucapkan satu kata posisi yang hilang.`;
    }
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  if (cara === "kanvas") {
    if (d.tipe === "acuan") return "Benda itu berada pada urutan ke berapa dari kiri?";
    if (d.tipe === "simon") return "Berapa benda yang cocok dengan perintah Simon?";
    if (d.tipe === "peta") return d.hitung === "baris" ? "Harta ada di baris ke berapa?" : "Harta ada di kolom ke berapa?";
    return "Berapa benda yang cocok dengan petunjuk pertama?";
  }
  return "Pilih kata posisi yang tepat.";
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya (tanpa digit). `jawab`: kata yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number, rupa: Rupa = "benda"): string {
  if (l.tipe === "salah") {
    if (typeof jawab === "string" && l.jawabTokoh !== undefined && jawab === l.jawabTokoh) return `Itu jawaban ${l.tokoh} yang keliru. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab, rupa);
  }
  const kunci = kunciJawab(l, cara);
  if (typeof jawab === "number") {
    switch (l.tipe) {
      case "acuan":
        return "Mulai menghitung dari benda paling kiri pada papan, lalu hitung ke kanan sampai benda yang ditanyakan. Kiri dilihat dari kita.";
      case "simon":
        return `Hitung hanya benda yang ada ${FRASA[l.kata]} ${namaBenda(rupa, l.ad.isi[l.a].k)}, dan jangan menghitung benda acuannya sendiri.`;
      case "peta":
        return l.hitung === "baris" ? "Baris dihitung dari atas dan dimulai dari satu. Ikuti geseran dari bintang satu per satu." : "Kolom dihitung dari kiri dan dimulai dari satu. Ikuti geseran dari bintang satu per satu.";
      case "sekat":
        return "Hitung hanya dengan petunjuk pertama, tanpa memakai petunjuk kedua. Periksa tiap benda satu per satu.";
    }
  }
  const k = kunci?.jenis === "nama" ? kunci.nama : null;
  if (k && typeof jawab === "string") {
    if (jawab === LAWAN[k]) return `${jawab} adalah lawan kata ${k}. Periksa lagi: mana benda yang diceritakan dan mana benda acuannya?`;
    if (k === "kiri" || k === "kanan") return "Kiri dan kanan dihitung dari kita yang melihat gambar, bukan dari benda acuannya.";
    if (k === "depan" || k === "belakang") return "Benda yang menutupi benda lain ada di depan, dan benda yang tertutup ada di belakang.";
    return "Atas dan bawah menunjukkan tinggi rendahnya letak. Lihat baris benda itu dibandingkan acuannya.";
  }
  return "Periksa lagi papannya dengan teliti.";
}

/** Petunjuk saat petak yang diketuk keliru pada perintah Simon. */
export function petunjukPetakSimon(l: LSimon, kol: number, bar: number, rupa: Rupa): string {
  const y = l.ad.isi[l.a];
  if (l.ad.isi.some((x, i) => i !== l.t && x.kol === kol && x.bar === bar)) return "Petak itu sudah terisi benda lain. Pilih petak yang masih kosong.";
  if (kol === y.kol && bar === y.bar) return `Itu petak ${namaBenda(rupa, y.k)} sendiri. Benda yang dipindahkan harus ditaruh ${FRASA[l.kata]} acuannya.`;
  const l2 = kol < y.kol ? "kiri" : kol > y.kol ? "kanan" : bar < y.bar ? "atas" : "bawah";
  return `Petak itu ada ${FRASA[l2 as Kata]} ${namaBenda(rupa, y.k)}, padahal perintahnya ${FRASA[l.kata]}. Kiri dan kanan dilihat dari kita.`;
}
/** Petunjuk saat petak yang diketuk keliru pada Peta Harta Karun. */
export function petunjukPetakPeta(l: LPeta, kol: number, bar: number): string {
  const jalur = jalurPeta(l);
  const i = jalur.findIndex(([x, y]) => x === kol && y === bar);
  if (i === 0) return "Itu petak bintang, tempat mulai. Geser dulu satu kotak untuk tiap petunjuk.";
  if (i > 0) return `Itu baru sampai petunjuk nomor ${kata(i)}. Lanjutkan sampai petunjuk terakhir.`;
  return "Geser satu kotak saja untuk tiap petunjuk, mulai dari bintang, dan jangan melewati petunjuk mana pun.";
}
/** Petunjuk saat benda yang diketuk tidak cocok pada Permainan Sekat. */
export function petunjukBendaSekat(l: LSekat, i: number, rupa: Rupa): string {
  const [p1, p2] = l.petunjuk;
  const c1 = cocokPetunjuk(l.ad, i, p1);
  const c2 = cocokPetunjuk(l.ad, i, p2);
  const nm = namaBenda(rupa, l.ad.isi[i].k);
  if (c1 && !c2) return `${nm} cocok dengan petunjuk pertama, tetapi tidak cocok dengan petunjuk kedua: benda yang dicari ${frasaPetunjuk(p2, rupa, l.ad)}.`;
  if (!c1 && c2) return `${nm} cocok dengan petunjuk kedua, tetapi tidak cocok dengan petunjuk pertama: benda yang dicari ${frasaPetunjuk(p1, rupa, l.ad)}.`;
  return `${nm} tidak cocok dengan kedua petunjuk. Pakai petunjuk pertama dulu untuk menyisihkan, lalu petunjuk kedua.`;
}
