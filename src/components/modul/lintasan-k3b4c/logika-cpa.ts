/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 4 Sub-Bab C "Lintasan Pak Samsul" (garis tegak lurus, garis sejajar, dan bangun datar sederhana), akhir cerita Festival Layang-layang Kampung:
 * jenis tugas, kunci, pilihan, instruksi (tanpa digit dan tanpa lambang), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-lintasan-k3b4c.mjs.
 * Jawaban beragam: memilih pernyataan (klik), menulis SATU angka di kanvas (jarak petak, banyak pasang tegak lurus, banyak sisi atau sudut, banyak bangun), dan mengucapkan satu kata (sejajar, tegak lurus, nama bangun) atau bilangan pendek.
 * Kunci dihitung dari data, bukan kunci tetap. Gambar garis, sudut, dan bangun digambar tepat sesuai data (sudut sungguh sebesar derajatnya, jarak garis sejajar sungguh sama).
 * Empat metode tiap misi: IGIL (Cek Jarak, Cek Pojok, Sebut Ciri), Grid Paper Check (Cek Kertas Petak), Fold and Match (Lipat dan Cocokkan), dan Shape Sort (Pilah Bangun).
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { ejaK3B4, kataBil } from "../eja-k3b4";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";
export { kataBil };

export type Rupa = "benda" | "diagram" | "lambang";
const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);
export const kata = kataBil;

/* ------------------------------ Benda festival (Concrete) ------------------------------ */
export type Benda = "bendera" | "layang" | "benang" | "pita" | "balon" | "kertas";
export const EMOJI_BENDA: Record<Benda, string> = { bendera: "\u{1F6A9}", layang: "\u{1FA81}", benang: "\u{1F9F5}", pita: "\u{1F380}", balon: "\u{1F388}", kertas: "\u{1F4C4}" };

/* ------------------------------ Bangun datar ------------------------------ */
export type Bentuk = "segitiga" | "persegi" | "persegiPanjang" | "lingkaran";
export const NAMA_BENTUK: Record<Bentuk, string> = { segitiga: "segitiga", persegi: "persegi", persegiPanjang: "persegi panjang", lingkaran: "lingkaran" };
export const SISI: Record<Bentuk, number> = { segitiga: 3, persegi: 4, persegiPanjang: 4, lingkaran: 0 };
/** Banyak sudut siku-siku (segitiga yang digambar bukan segitiga siku-siku). */
export const SIKU: Record<Bentuk, number> = { segitiga: 0, persegi: 4, persegiPanjang: 4, lingkaran: 0 };
export type Ciri = "tigaSisi" | "empatSisi" | "sisiSama" | "tanpaSudut";
export const cocokCiri = (b: Bentuk, c: Ciri): boolean => (c === "tigaSisi" ? b === "segitiga" : c === "empatSisi" ? b === "persegi" || b === "persegiPanjang" : c === "sisiSama" ? b === "persegi" : b === "lingkaran");
export const KALIMAT_CIRI: Record<Ciri, string> = {
  tigaSisi: "punya tiga sisi",
  empatSisi: "punya empat sisi dan empat sudut siku-siku",
  sisiSama: "punya empat sisi yang sama panjang",
  tanpaSudut: "dibatasi garis lengkung dan tidak punya sudut",
};
export const LABEL_CIRI: Record<Ciri, string> = { tigaSisi: "3 sisi", empatSisi: "4 sisi, 4 sudut siku-siku", sisiSama: "4 sisi sama panjang", tanpaSudut: "garis lengkung, tanpa sudut" };

/* ------------------------------ Jenis tugas ------------------------------ */
export type Huruf4 = [string, string, string, string];
/** Sudut pertemuan dua garis yang dipakai tugas pojok kertas (derajat): hanya 90 yang siku-siku. */
export const SUDUT_SAH = [45, 60, 90, 120, 135] as const;
export const jenisSudut = (d: number): "lancip" | "siku-siku" | "tumpul" => (d < 90 ? "lancip" : d === 90 ? "siku-siku" : "tumpul");

/** Grid Paper Check dan Cek Jarak: dua tali pada kertas petak. Tali kedua berjarak dKiri petak di ujung kiri dan dKanan petak di ujung kanan; tali atas turun `miring` petak ke kanan. Sejajar bila dKiri sama dengan dKanan. */
export type LSejajar = { tipe: "sejajar"; hrf: Huruf4; dKiri: number; dKanan: number; miring: number; benda: Benda; kanvas: "kiri" | "kanan" | "selisih"; suara: "hubungan" | "jarak" };
/** Fold and Match dan Cek Pojok: titik temu dua garis dengan sudut tertentu; pojok kertas lipat dicocokkan di tiap titik. Tegak lurus hanya bila pojok pas (90). */
export type LTegak = { tipe: "tegak"; sudut: number[]; benda: Benda; suara: "hubungan" | "banyak" };
/** Sebut Ciri: satu bangun dan cirinya. klik: nama bangun; kanvas: banyak sisi, sudut, atau sudut siku-siku; suara: nama bangun. */
export type LBangun = { tipe: "bangun"; bentuk: Bentuk; benda: Benda; kanvas: "sisi" | "sudut" | "siku" };
/** Shape Sort: beberapa bangun dipilah menurut ciri. klik: nomor bangun yang cocok (tepat satu); kanvas: banyak bangun yang cocok; suara: nama bangun yang paling banyak. */
export type LPilah = { tipe: "pilah"; bentuk: Bentuk[]; ciri: Ciri; benda: Benda };
/** Cek Jarak dan Cek Pojok ditulis dengan lambang: sejajar (dua garis miring) atau tegak lurus (T terbalik). klik: pilih lambang; suara: ucapkan namanya. */
export type LLambang = { tipe: "lambang"; rel: "tegak" | "sejajar"; hrf: Huruf4; benda: Benda };
export type LangkahDasar = LSejajar | LTegak | LBangun | LPilah | LLambang;
/** Cari kesalahan: tokoh sudah menjawab pada tugas `dasar` (klik). Anak menilai benar atau salah, memilih alasan, lalu menjawab sendiri. */
export type LangkahSalah = {
  tipe: "salah";
  dasar: LSejajar | LBangun | LLambang;
  tokoh: string;
  kataTokoh: string;
  jawabTokoh: string;
  alasan: [string, string, string];
  benar: number;
  keliru: string;
  betul?: boolean;
};
export type Langkah = LangkahDasar | LangkahSalah;
export type Metode = "igil" | "petak" | "lipat" | "pilah";
export const URUT_METODE: Metode[] = ["igil", "petak", "lipat", "pilah"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Cek Jarak, Cek Pojok, Sebut Ciri",
  petak: "Grid Paper Check: Cek Kertas Petak",
  lipat: "Fold and Match: Lipat dan Cocokkan",
  pilah: "Shape Sort: Pilah Bangun",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F4DD}", petak: "\u{1F4D0}", lipat: "\u{1F4C4}", pilah: "\u{1F9E9}" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar => (l.tipe === "salah" ? l.dasar : l);

/* ------------------------------ Nilai turunan ------------------------------ */
export const sejajarBenar = (l: LSejajar): boolean => l.dKiri === l.dKanan;
export const banyakSiku = (l: LTegak): number => l.sudut.filter((s) => s === 90).length;
export const titikSiku = (l: LTegak): number => l.sudut.findIndex((s) => s === 90);
export const banyakCocok = (l: LPilah): number => l.bentuk.filter((b) => cocokCiri(b, l.ciri)).length;
export const nomorCocok = (l: LPilah): number => l.bentuk.findIndex((b) => cocokCiri(b, l.ciri));
/** Bangun yang paling banyak muncul; null bila seri. */
export function terbanyak(bentuk: readonly Bentuk[]): Bentuk | null {
  const hitung = new Map<Bentuk, number>();
  for (const b of bentuk) hitung.set(b, (hitung.get(b) ?? 0) + 1);
  const urut = [...hitung.entries()].sort((p, q) => q[1] - p[1]);
  if (urut.length === 0) return null;
  return urut.length > 1 && urut[0][1] === urut[1][1] ? null : urut[0][0];
}

/** Penulisan hubungan dua garis: "EF // GH" atau "EF ⊥ GH". */
export const tulisHubungan = (hrf: Huruf4, rel: "tegak" | "sejajar"): string => `${hrf[0]}${hrf[1]} ${rel === "tegak" ? "⊥" : "//"} ${hrf[2]}${hrf[3]}`;
export const namaGaris = (a: string, b: string): string => `${a}${b}`;
/** Ucapan teks bergambar: huruf titik dipisah, lambang dan satuan dieja ("EF // GH" menjadi "E F sejajar G H"). */
export const ucap = (t: string): string => ejaK3B4(t.replace(/\b([A-Z])([A-Z])\b/g, "$1 $2").replace(/\b([A-Z]) ([A-Z])( |$)/g, "$1 $2$3")).replace(/ = /g, " sama dengan ");

/** Angka kanvas tiap tugas (jawaban yang ditulis di kanvas). */
export function angkaKanvas(l: LangkahDasar): number {
  switch (l.tipe) {
    case "sejajar":
      return l.kanvas === "kiri" ? l.dKiri : l.kanvas === "kanan" ? l.dKanan : Math.abs(l.dKanan - l.dKiri);
    case "tegak":
      return banyakSiku(l);
    case "bangun":
      return l.kanvas === "sisi" || l.kanvas === "sudut" ? SISI[l.bentuk] : SIKU[l.bentuk];
    case "pilah":
      return banyakCocok(l);
    case "lambang":
      return 0;
  }
}

/** Apakah data satu tugas konsisten dan sesuai batas untuk caranya (jawaban kanvas satu angka dari satu sampai sembilan, gambar muat di kanvas, kunci tunggal)? */
export function dataSah(l: LangkahDasar, cara: Cara): boolean {
  const antara = (n: number, a: number, b: number) => Number.isInteger(n) && n >= a && n <= b;
  const huruf = (h: readonly string[]) => h.every((x) => /^[A-Z]$/.test(x)) && new Set(h).size === h.length;
  if (cara === "kanvas" && !antara(angkaKanvas(l), 1, 9)) return false;
  switch (l.tipe) {
    case "sejajar": {
      if (!huruf(l.hrf) || !antara(l.dKiri, 1, 5) || !antara(l.dKanan, 1, 5) || !antara(l.miring, 0, 2)) return false;
      if (l.dKiri + l.miring > 6 || l.dKanan + l.miring > 6 || l.dKiri + l.dKanan + l.miring < 2) return false;
      if (cara === "kanvas") return l.kanvas === "selisih" ? !sejajarBenar(l) : sejajarBenar(l);
      if (cara === "suara") return sejajarBenar(l);
      return true;
    }
    case "tegak": {
      const n = l.sudut.length;
      if (n < 2 || n > 4 || !l.sudut.every((s) => (SUDUT_SAH as readonly number[]).includes(s))) return false;
      if (cara === "klik") return n === 3 && banyakSiku(l) === 1;
      if (cara === "kanvas") return n >= 3 && antara(banyakSiku(l), 1, 4);
      return banyakSiku(l) >= 1 && (l.suara === "hubungan" || antara(banyakSiku(l), 1, 4));
    }
    case "bangun":
      if (cara === "kanvas") return l.bentuk !== "lingkaran" && (l.kanvas !== "siku" || SIKU[l.bentuk] > 0);
      return true;
    case "pilah": {
      const n = l.bentuk.length;
      if (!antara(n, 3, 6)) return false;
      if (cara === "klik") return n === 3 && new Set(l.bentuk).size === 3 && banyakCocok(l) === 1;
      if (cara === "kanvas") return n >= 4 && banyakCocok(l) >= 2;
      const t = terbanyak(l.bentuk);
      return n >= 4 && t !== null && l.bentuk.filter((b) => b === t).length >= 2;
    }
    case "lambang":
      return cara !== "kanvas" && huruf(l.hrf);
  }
}

/* ------------------------------ Kunci ------------------------------ */
export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: string } | { jenis: "pilih"; teks: string; kata: string };
const angka = (n: number): Kunci => ({ jenis: "angka", n });
const nama = (s: string): Kunci => ({ jenis: "nama", nama: s });
const pilih = (teks: string): Kunci => ({ jenis: "pilih", teks, kata: ucap(teks) });
export const KATA_HUBUNGAN = ["sejajar", "tegak lurus", "bukan keduanya"] as const;
export const KATA_BANGUN = ["segitiga", "persegi", "persegi panjang", "lingkaran"] as const;

const kalimatTidakSejajar = (l: LSejajar): string => `${namaGaris(l.hrf[0], l.hrf[1])} dan ${namaGaris(l.hrf[2], l.hrf[3])} tidak sejajar`;
const teksSejajar = (l: LSejajar): string => (sejajarBenar(l) ? tulisHubungan(l.hrf, "sejajar") : kalimatTidakSejajar(l));
const teksTitik = (i: number): string => `titik ${i + 1}`;
const teksNomor = (i: number): string => `nomor ${i + 1}`;

/** Kunci tiap tugas menurut caranya, dihitung dari data. */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return kunciJawab(l.dasar, "klik");
  if (cara === "kanvas") return angka(angkaKanvas(l));
  switch (l.tipe) {
    case "sejajar":
      if (cara === "klik") return pilih(teksSejajar(l));
      return l.suara === "hubungan" ? nama("sejajar") : angka(l.dKiri);
    case "tegak":
      if (cara === "klik") return pilih(teksTitik(titikSiku(l)));
      return l.suara === "hubungan" ? nama("tegak lurus") : angka(banyakSiku(l));
    case "bangun":
      return cara === "klik" ? pilih(NAMA_BENTUK[l.bentuk]) : nama(NAMA_BENTUK[l.bentuk]);
    case "pilah": {
      if (cara === "klik") return pilih(teksNomor(nomorCocok(l)));
      const t = terbanyak(l.bentuk);
      return t === null ? null : nama(NAMA_BENTUK[t]);
    }
    case "lambang":
      return cara === "klik" ? pilih(tulisHubungan(l.hrf, l.rel)) : nama(l.rel === "tegak" ? "tegak lurus" : "sejajar");
  }
}

/** Semua tugas punya kunci, kecuali Cari kesalahan yang memakai kegiatan lebih dulu. Tidak bergantung pada rupa. */
export function siapLangsung(l: Langkah, rupa: Rupa, cara: Cara): boolean {
  void rupa;
  if (l.tipe === "salah") return false;
  return kunciJawab(l, cara) !== null;
}

/* ------------------------------ Pilihan ------------------------------ */
const PENGECOH_BENTUK: Record<Bentuk, [Bentuk, Bentuk]> = {
  segitiga: ["persegi", "lingkaran"],
  persegi: ["persegiPanjang", "segitiga"],
  persegiPanjang: ["persegi", "lingkaran"],
  lingkaran: ["segitiga", "persegi"],
};
/** Sisipkan jawaban benar di tempat yang bukan pertama (deterministik). */
function sisipkan(benar: string, lain: string[], geser: number): string[] {
  const p = 1 + (geser % Math.max(1, lain.length));
  return [...lain.slice(0, p), benar, ...lain.slice(p)];
}
/** Tiga pilihan untuk tugas klik: kunci tidak pernah di tombol pertama pada pilihan bernama, dan jawaban tokoh (Cari kesalahan) selalu ikut. */
export function pilihanKlik(l: Langkah): string[] {
  const k = kunciJawab(l, "klik");
  if (!k || k.jenis !== "pilih") return [];
  const d = dasarDari(l);
  let lain: string[] = [];
  switch (d.tipe) {
    case "sejajar":
      lain = sejajarBenar(d) ? [tulisHubungan(d.hrf, "tegak"), kalimatTidakSejajar(d)] : [tulisHubungan(d.hrf, "sejajar"), tulisHubungan(d.hrf, "tegak")];
      break;
    case "tegak":
      return d.sudut.map((_, i) => teksTitik(i));
    case "bangun":
      lain = PENGECOH_BENTUK[d.bentuk].map((b) => NAMA_BENTUK[b]);
      break;
    case "pilah":
      return d.bentuk.map((_, i) => teksNomor(i));
    case "lambang":
      lain = d.rel === "tegak" ? [tulisHubungan(d.hrf, "sejajar"), `${d.hrf[0]}${d.hrf[1]} = ${d.hrf[2]}${d.hrf[3]}`] : [tulisHubungan(d.hrf, "tegak"), `${d.hrf[0]}${d.hrf[1]} = ${d.hrf[2]}${d.hrf[3]}`];
      break;
  }
  const awal = l.tipe === "salah" && l.jawabTokoh !== k.teks ? [l.jawabTokoh] : [];
  const sisa = [...awal, ...lain.filter((c) => !awal.includes(c))].slice(0, 2);
  return sisipkan(k.teks, sisa, k.teks.length);
}

/** Bilangan pengecoh untuk jawaban bilangan: satu sampai sembilan berdekatan. */
function angkaLain(n: number): number[] {
  const hasil: number[] = [];
  for (const c of [n + 1, n - 1, n + 2, n - 2, n + 3]) if (Number.isInteger(c) && c >= 1 && c <= 9 && c !== n && !hasil.includes(c)) hasil.push(c);
  return hasil.slice(0, 2);
}
/** Pilihan cadangan untuk tugas suara (kata atau bilangan dalam kata). */
export function pilihanSuara(l: Langkah, cara: Cara): string[] {
  const k = kunciJawab(l, cara);
  if (!k || k.jenis === "pilih") return [];
  if (k.jenis === "angka") return sisipkan(kataBil(k.n), angkaLain(k.n).map(kataBil), k.n);
  const semua: string[] = (KATA_HUBUNGAN as readonly string[]).includes(k.nama) ? [...KATA_HUBUNGAN] : [...KATA_BANGUN];
  const lain = semua.filter((x) => x !== k.nama).slice(0, 2);
  return sisipkan(k.nama, lain, k.nama.length);
}
export const teksKunciPilihan = (k: Kunci): string => (k.jenis === "nama" ? k.nama : k.jenis === "pilih" ? k.teks : kataBil(k.n));

/* ------------------------------ Kalimat ------------------------------ */
const sebut = (rupa: Rupa): string => (rupa === "lambang" ? "kartu" : "gambar");
const sebutPetak = (n: number): string => `${kataBil(n)} petak`;
const sebutNama = (a: string, b: string): string => `${a} ${b}`;
const ciriBentuk = (b: Bentuk): string =>
  b === "segitiga"
    ? "Segitiga punya tiga sisi dan tiga sudut."
    : b === "persegi"
      ? "Persegi punya empat sisi yang sama panjang dan empat sudut siku-siku."
      : b === "persegiPanjang"
        ? "Persegi panjang punya empat sisi dan empat sudut siku-siku."
        : "Lingkaran dibatasi satu garis lengkung, tidak punya sisi lurus dan tidak punya sudut.";

const rumus = (l: LangkahDasar): string => {
  switch (l.tipe) {
    case "sejajar":
      return sejajarBenar(l)
        ? `Jarak di ujung kiri ${sebutPetak(l.dKiri)} dan di ujung kanan ${sebutPetak(l.dKanan)}. Jaraknya sama di kedua ujung, jadi kedua tali sejajar.`
        : `Jarak di ujung kiri ${sebutPetak(l.dKiri)} dan di ujung kanan ${sebutPetak(l.dKanan)}. Jaraknya berbeda, jadi kedua tali tidak sejajar.`;
    case "tegak": {
      const n = banyakSiku(l);
      return `Pojok kertas lipat hanya pas di ${kataBil(n)} titik, yaitu di titik tempat sudutnya siku-siku. Di titik itu kedua garis tegak lurus.`;
    }
    case "bangun":
      return ciriBentuk(l.bentuk);
    case "pilah":
      return `Pilah bangunnya dengan melihat sisi dan sudutnya. Ada ${kataBil(banyakCocok(l))} bangun yang ${KALIMAT_CIRI[l.ciri]}.`;
    case "lambang":
      return l.rel === "tegak" ? "Garis tegak lurus ditulis dengan lambang yang seperti huruf T terbalik." : "Garis sejajar ditulis dengan dua garis miring.";
  }
};
const aturanKanvas = (l: LangkahDasar, n: number): string => {
  switch (l.tipe) {
    case "sejajar":
      return l.kanvas === "selisih" ? ` Selisih kedua jarak ada ${sebutPetak(n)}.` : ` Jaraknya ada ${sebutPetak(n)}.`;
    case "tegak":
      return ` Banyak pasang garis yang tegak lurus ada ${kataBil(n)}.`;
    case "bangun":
      return l.kanvas === "siku" ? ` Banyak sudut siku-siku ada ${kataBil(n)}.` : l.kanvas === "sudut" ? ` Banyak sudutnya ada ${kataBil(n)}.` : ` Banyak sisinya ada ${kataBil(n)}.`;
    case "pilah":
      return ` Banyak bangun yang cocok ada ${kataBil(n)}.`;
    case "lambang":
      return "";
  }
};

/** Penjelasan setelah jawaban benar (tanpa digit). */
export function kalimatKunci(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  const k = kunciJawab(l, cara);
  const n = k?.jenis === "angka" ? k.n : 0;
  if (cara === "kanvas") return `${rumus(d)}${aturanKanvas(d, n)}`;
  return k?.jenis === "nama" ? `Jawabannya ${k.nama}. ${rumus(d)}` : rumus(d);
}

const tanyaCiri = (c: Ciri): string => KALIMAT_CIRI[c];

/** Instruksi satu tugas (suara dan judul), tanpa digit dan tanpa lambang. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  if (l.tipe === "salah") return `${l.tokoh} sudah menjawab. Apakah jawabannya benar? Pilih alasan yang tepat, lalu jawab sendiri.`;
  const g = sebut(rupa);
  switch (l.tipe) {
    case "sejajar": {
      const a = sebutNama(l.hrf[0], l.hrf[1]);
      const b = sebutNama(l.hrf[2], l.hrf[3]);
      const dasar = `Grid Paper Check: ${g} ini memperlihatkan dua tali, ${a} dan ${b}, pada kertas petak.`;
      if (cara === "klik") return `${dasar} Hitung jarak kedua tali di ujung kiri dan di ujung kanan. Bagaimana hubungan keduanya? Pilih jawabannya.`;
      if (cara === "kanvas")
        return l.kanvas === "selisih"
          ? `${dasar} Jaraknya berbeda di kedua ujung. Berapa petak selisih jarak di ujung kanan dan ujung kiri? Tulis satu angka di kanvas.`
          : `${dasar} Kedua tali sejajar. Berapa petak jarak kedua tali di ujung ${l.kanvas === "kiri" ? "kiri" : "kanan"}? Tulis satu angka di kanvas.`;
      return l.suara === "hubungan" ? `${dasar} Jaraknya sama di kedua ujung. Kedua tali itu disebut garis apa? Ucapkan satu kata.` : `${dasar} Kedua tali sejajar. Berapa petak jarak kedua tali di ujung kiri? Ucapkan bilangannya.`;
    }
    case "tegak": {
      const dasar = `Fold and Match: lipat kertas dua kali untuk mendapat pojok siku-siku, lalu cocokkan pojok itu pada ${g} ini.`;
      if (cara === "klik") return `${dasar} Ada tiga titik temu dua garis. Di titik nomor berapa kedua garis tegak lurus? Pilih jawabannya.`;
      if (cara === "kanvas") return `${dasar} Ada ${kataBil(l.sudut.length)} titik temu dua garis. Berapa titik yang cocok dengan pojok kertas? Tulis satu angka di kanvas.`;
      return l.suara === "hubungan" ? `${dasar} Dua garis yang bertemu pada sudut siku-siku disebut garis apa? Ucapkan satu kata.` : `${dasar} Berapa titik temu yang pas dengan pojok kertas? Ucapkan bilangannya.`;
    }
    case "bangun": {
      const dasar = `Metode IGIL: lihat bangun datar pada ${g} ini, lalu sebut cirinya.`;
      if (cara === "klik") return `${dasar} Bangun apakah ini? Pilih namanya.`;
      if (cara === "kanvas") return `${dasar} ${l.kanvas === "siku" ? "Berapa sudut siku-siku yang dimilikinya? Tulis satu angka di kanvas." : l.kanvas === "sudut" ? "Berapa sudut yang dimilikinya? Tulis satu angka di kanvas." : "Berapa sisi lurus yang dimilikinya? Tulis satu angka di kanvas."}`;
      return `${dasar} Bangun apakah ini? Ucapkan satu nama.`;
    }
    case "pilah": {
      const dasar = `Shape Sort: pilah bangun datar pada ${g} ini menurut sisi dan sudutnya.`;
      if (cara === "klik") return `${dasar} Ada tiga bangun bernomor. Bangun nomor berapa yang ${tanyaCiri(l.ciri)}? Pilih jawabannya.`;
      if (cara === "kanvas") return `${dasar} Berapa bangun yang ${tanyaCiri(l.ciri)}? Tulis satu angka di kanvas.`;
      return `${dasar} Bangun apa yang paling banyak? Ucapkan satu nama.`;
    }
    case "lambang": {
      const a = sebutNama(l.hrf[0], l.hrf[1]);
      const b = sebutNama(l.hrf[2], l.hrf[3]);
      const dasar = `Metode IGIL: ${l.rel === "tegak" ? `garis ${a} dan garis ${b} bertemu pada sudut siku-siku` : `garis ${a} dan garis ${b} selalu berjarak sama dan tidak pernah bertemu`}.`;
      if (cara === "klik") return `${dasar} Bagaimana cara menuliskannya? Pilih tulisannya.`;
      return `${dasar} Dua garis seperti itu disebut garis apa? Ucapkan satu kata.`;
    }
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  const d = dasarDari(l);
  switch (d.tipe) {
    case "sejajar":
      if (cara === "klik") return "Bagaimana hubungan kedua tali?";
      if (cara === "kanvas") return d.kanvas === "selisih" ? "Berapa petak selisih kedua jarak?" : `Berapa petak jarak di ujung ${d.kanvas}?`;
      return d.suara === "hubungan" ? "Kedua tali itu garis apa?" : "Berapa petak jaraknya di ujung kiri?";
    case "tegak":
      if (cara === "klik") return "Di titik nomor berapa kedua garis tegak lurus?";
      if (cara === "kanvas") return "Berapa titik yang pas dengan pojok kertas?";
      return d.suara === "hubungan" ? "Dua garis itu disebut garis apa?" : "Berapa titik yang pas dengan pojok kertas?";
    case "bangun":
      if (cara === "kanvas") return d.kanvas === "siku" ? "Berapa sudut siku-siku?" : d.kanvas === "sudut" ? "Berapa sudutnya?" : "Berapa sisinya?";
      return "Bangun apakah ini?";
    case "pilah":
      if (cara === "klik") return "Bangun nomor berapa yang cocok?";
      if (cara === "kanvas") return "Berapa bangun yang cocok?";
      return "Bangun apa yang paling banyak?";
    case "lambang":
      return cara === "klik" ? "Bagaimana cara menuliskannya?" : "Dua garis itu disebut garis apa?";
  }
}

/** Petunjuk saat jawaban salah: menunjuk kesalahannya (tanpa digit). `jawab`: pernyataan atau kata yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number): string {
  if (l.tipe === "salah") {
    if (String(jawab) === l.jawabTokoh) return `Itu jawaban ${l.tokoh}${l.betul ? "" : " yang keliru"}. ${l.keliru}`;
    return petunjukSalah(l.dasar, cara, jawab);
  }
  switch (l.tipe) {
    case "sejajar":
      if (cara === "suara" && l.suara === "hubungan") return "Dua garis yang jaraknya selalu sama dan tidak pernah bertemu disebut garis sejajar.";
      if (cara === "kanvas" && l.kanvas === "selisih") return "Hitung jarak di ujung kiri dan di ujung kanan, lalu kurangkan yang besar dengan yang kecil.";
      return "Hitung petak di antara kedua tali, di ujung kiri dan di ujung kanan. Garis sejajar jaraknya selalu sama, di mana pun diukur.";
    case "tegak":
      if (cara === "suara" && l.suara === "hubungan") return "Dua garis yang bertemu pada sudut siku-siku disebut garis tegak lurus.";
      return "Cocokkan pojok kertas lipat di tiap titik temu. Kedua garis tegak lurus hanya di titik yang pojoknya pas.";
    case "bangun":
      if (cara === "kanvas") return "Hitung sisi lurusnya atau pojoknya satu per satu. Persegi dan persegi panjang punya empat, segitiga punya tiga.";
      return "Hitung sisi dan sudutnya. Segitiga punya tiga sisi, persegi dan persegi panjang punya empat sisi dengan sudut siku-siku, dan lingkaran dibatasi garis lengkung.";
    case "pilah":
      if (cara === "suara") return "Hitung dulu tiap jenis bangun, lalu sebut jenis yang paling banyak.";
      return `Periksa tiap bangun: yang cocok ${tanyaCiri(l.ciri)}.`;
    case "lambang":
      return l.rel === "tegak" ? "Garis tegak lurus bertemu pada sudut siku-siku dan ditulis dengan lambang yang seperti huruf T terbalik." : "Garis sejajar jaraknya selalu sama dan ditulis dengan dua garis miring.";
  }
}

/* ------------------------------ Kartu kata (Abstract) ------------------------------ */
/** Isi kartu kata untuk tahap Abstract (kata, huruf titik, angka, dan lambang). Jawaban yang ditanyakan tidak tertulis. */
export function barisKartu(l: LangkahDasar, cara: Cara): string[] {
  switch (l.tipe) {
    case "sejajar": {
      const a = namaGaris(l.hrf[0], l.hrf[1]);
      const b = namaGaris(l.hrf[2], l.hrf[3]);
      const kiri = `jarak kiri: ${cara === "kanvas" && l.kanvas === "kiri" ? "…" : l.dKiri} petak`;
      const kanan = `jarak kanan: ${cara === "kanvas" && l.kanvas === "kanan" ? "…" : l.dKanan} petak`;
      if (cara === "suara") return l.suara === "jarak" ? [`${a} dan ${b} pada kertas petak`, "jarak kiri: … petak", `jarak kanan: ${l.dKanan} petak`, "jaraknya sama"] : [`${a} dan ${b} pada kertas petak`, kiri, kanan, "jaraknya sama di kedua ujung"];
      if (cara === "kanvas") return l.kanvas === "selisih" ? [`${a} dan ${b} pada kertas petak`, kiri, kanan, "selisih jarak: … petak"] : [`${a} dan ${b} pada kertas petak`, kiri, kanan, `${tulisHubungan(l.hrf, "sejajar")}`];
      return [`${a} dan ${b} pada kertas petak`, kiri, kanan, "hubungan: …"];
    }
    case "tegak":
      return [...l.sudut.map((s, i) => `titik ${i + 1}: sudut ${jenisSudut(s)}`), cara === "klik" ? "tegak lurus di titik: …" : cara === "kanvas" ? "banyak titik tegak lurus: …" : l.suara === "hubungan" ? "bertemu pada sudut siku-siku: …" : "banyak titik tegak lurus: …"];
    case "bangun":
      return [cara === "kanvas" ? `bangun: ${NAMA_BENTUK[l.bentuk]}` : "bangun: …", cara === "kanvas" ? `${l.kanvas === "siku" ? "sudut siku-siku" : l.kanvas === "sudut" ? "sudut" : "sisi"}: …` : ciriBangun(l.bentuk)];
    case "pilah":
      return [...l.bentuk.map((b, i) => `${i + 1}. ${NAMA_BENTUK[b]}`), cara === "klik" ? `nomor yang ${tanyaCiri(l.ciri)}: …` : cara === "kanvas" ? `banyak yang ${tanyaCiri(l.ciri)}: …` : "bangun terbanyak: …"];
    case "lambang":
      return [`${namaGaris(l.hrf[0], l.hrf[1])} dan ${namaGaris(l.hrf[2], l.hrf[3])}`, l.rel === "tegak" ? "bertemu pada sudut siku-siku" : "jaraknya selalu sama dan tidak pernah bertemu", cara === "klik" ? "ditulis: …" : "disebut garis: …"];
  }
}
/** Ciri bangun untuk kartu kata. */
export const ciriBangun = (b: Bentuk): string =>
  b === "segitiga" ? "3 sisi, 3 sudut" : b === "persegi" ? "4 sisi sama panjang, 4 sudut siku-siku" : b === "persegiPanjang" ? "4 sisi, 4 sudut siku-siku" : "garis lengkung, tanpa sisi lurus, tanpa sudut";
export const judulKartu = (rupa: Rupa, teks: string): string => (rupa === "lambang" ? kapital(teks) : teks);
