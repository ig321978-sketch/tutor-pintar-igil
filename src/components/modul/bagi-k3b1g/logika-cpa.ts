/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 3 Bab 1 Sub-Bab G "Pesta Hari Jadi Toko" (pembagian sampai seratus), akhir cerita Toko Kelontong Pak Joko:
 * jenis tugas, kunci, pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-bagi-k3b1g.mjs.
 * Jawaban tidak hanya angka: memilih angka atau kata, mengetuk hasil tiap pengurangan berurutan, menyusun langkah membagi rata, satu angka di kanvas,
 * dan satu kata atau bilangan pendek yang diucapkan. Semua kunci dihitung dari data (tanpa sisa pembagian), bukan kunci tetap.
 */
import type { Cara } from "../lemari-k1b1a/logika";

export { IKON_CARA, NAMA_CARA, URUT_CARA, type Cara } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
export type Nama = "dibagi" | "pembagi" | "hasil" | "cocok" | "tidak";
export const URUT_NAMA: Nama[] = ["dibagi", "pembagi", "hasil", "cocok", "tidak"];
/** Tulisan tombol untuk tiap kata jawaban. */
export const LABEL_NAMA: Record<Nama, string> = {
  dibagi: "bilangan yang dibagi",
  pembagi: "pembagi",
  hasil: "hasil bagi",
  cocok: "cocok",
  tidak: "tidak cocok",
};
/** Warna tiap bagian pada diagram (dipisahkan jelas, tidak ada dua warna yang nyaris sama). */
export const WARNA_BAGIAN = ["#EF4444", "#F59E0B", "#16A34A", "#3B82F6", "#A855F7", "#EC4899", "#0D9488", "#78350F", "#475569"] as const;

/* ------------------------------ Kata bilangan ------------------------------ */
const SATUAN = ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"];
const PULUHAN = ["", "", "dua puluh", "tiga puluh", "empat puluh", "lima puluh", "enam puluh", "tujuh puluh", "delapan puluh", "sembilan puluh"];
/** Bilangan nol sampai seratus dalam kata (tanpa digit). */
export function kata(n: number): string {
  if (n < 10) return SATUAN[n] ?? String(n);
  if (n === 10) return "sepuluh";
  if (n === 11) return "sebelas";
  if (n < 20) return `${SATUAN[n - 10]} belas`;
  if (n < 100) return `${PULUHAN[Math.floor(n / 10)]}${n % 10 ? ` ${SATUAN[n % 10]}` : ""}`;
  if (n === 100) return "seratus";
  return String(n);
}

/* ------------------------------ Langkah ------------------------------ */
/** Benda dibagi rata: n benda ke g bagian; berapa isi tiap bagian (klik, kanvas, suara = bilangan)? */
export type LBagi = { tipe: "bagi"; n: number; g: number; ikon?: string };
/** Kurangi n dengan g berulang sampai nol; berapa kali dikurangi (klik, kanvas, suara = bilangan)? */
export type LKurang = { tipe: "kurang"; n: number; g: number; ikon?: string };
/** n benda, tiap bagian berisi q; berapa bagian (klik, kanvas, suara = bilangan)? */
export type LIsi = { tipe: "isi"; n: number; q: number; ikon?: string };
/** g dikali berapa sama dengan n? (klik, kanvas, suara = bilangan) */
export type LPasang = { tipe: "pasang"; g: number; n: number; ikon?: string };
/** a dikali b sama dengan hasil kali; berapa hasil kali dibagi a (klik, kanvas, suara = bilangan)? */
export type LBalik = { tipe: "balik"; a: number; b: number; ikon?: string };
/** n dibagi g kata tokoh sama dengan `dikira`; periksa dengan kali: cocok atau tidak (klik dan suara = kata)? */
export type LPeriksa = { tipe: "periksa"; n: number; g: number; dikira: number; ikon?: string };
/** Bagian kalimat n : g = q yang ditandai disebut apa (klik dan suara = kata)? */
export type LIstilah = { tipe: "istilah"; n: number; g: number; sorot: "dibagi" | "pembagi" | "hasil" };
/** Ketuk hasil tiap pengurangan berurutan, mulai dari yang pertama (klik). */
export type LDeret = { tipe: "deret"; n: number; g: number; ikon?: string };
/** Susun langkah membagi rata dengan mengetuk (klik). */
export type LUrutLangkah = { tipe: "urutlangkah"; n: number; g: number; ikon?: string };
export type LangkahDasar = LBagi | LKurang | LIsi | LPasang | LBalik | LPeriksa | LIstilah | LDeret | LUrutLangkah;
/**
 * Klaim tokoh pada tugas Cari kesalahan. `hasil`: tokoh bilang n dibagi g sama dengan `dikira`.
 * `periksa`: tokoh memeriksa hasil bagi `dikira` dengan kali dan bilang `bilang` (cocok atau tidak).
 */
export type Klaim = { jenis: "hasil"; n: number; g: number; dikira: number; ikon?: string } | { jenis: "periksa"; n: number; g: number; dikira: number; bilang: "cocok" | "tidak"; ikon?: string };
export type LangkahSalah = { tipe: "salah"; tokoh: string; klaim: Klaim; kataTokoh: string; alasan: [string, string, string]; benar: number; keliru: string };
export type Langkah = LangkahDasar | LangkahSalah;

export type Metode = "igil" | "rata" | "kurang" | "keluarga";
export const URUT_METODE: Metode[] = ["igil", "rata", "kurang", "keluarga"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Bagi Rata, Periksa dengan Kali",
  rata: "Fair Share: Bagi Rata",
  kurang: "Repeated Subtraction: Kurang Berulang",
  keluarga: "Fact Family: Keluarga Fakta",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F381}", rata: "\u{1F9FA}", kurang: "\u{2796}", keluarga: "\u{1F46A}" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar | null => (l.tipe === "salah" ? null : l);

/** Langkah membagi rata (urutan benar). */
export const LANGKAH_BAGI = ["Siapkan benda dan bagian", "Bagikan satu-satu bergiliran", "Hitung isi tiap bagian", "Periksa dengan kali"] as const;
export const urutanBagi = (): number[] => [0, 1, 2, 3];

/** Urutan acak tetap (bukan urutan benar) bagi sejumlah kartu. */
export function acakTetap(n: number, benar: number[]): number[] {
  const dasar = Array.from({ length: n }, (_, i) => i);
  for (let geser = 1; geser < n + 3; geser += 1) {
    const kandidat = dasar.map((i) => (i * 2 + geser) % n);
    if (new Set(kandidat).size === n && kandidat.some((v, i) => v !== benar[i])) return kandidat;
  }
  return dasar.map((i) => (i + 1) % n);
}

/* ------------------------------ Hitungan dari data ------------------------------ */
/** Hasil bagi n dibagi g (tanpa sisa). */
export const hasilBagi = (n: number, g: number): number => n / g;
/** Hasil tiap pengurangan berurutan: n - g, n - 2g, ..., 0. */
export const deretNilai = (n: number, g: number): number[] => Array.from({ length: n / g }, (_, i) => n - g * (i + 1));
/** Klaim tokoh benar? */
export function klaimBenar(k: Klaim): boolean {
  if (k.jenis === "hasil") return k.dikira * k.g === k.n;
  return (k.g * k.dikira === k.n) === (k.bilang === "cocok");
}
/** Hasil periksa dengan kali: cocok bila pembagi kali hasil bagi dugaan sama dengan bilangan yang dibagi. */
export const periksaKali = (l: LPeriksa): "cocok" | "tidak" => (l.g * l.dikira === l.n ? "cocok" : "tidak");

export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: Nama };

/** Kunci tiap tugas, dihitung dari data. Null bila tugas selesai lewat kegiatan (mengetuk, menyusun, memilih alasan). */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  void cara;
  switch (l.tipe) {
    case "salah":
    case "deret":
    case "urutlangkah":
      return null;
    case "bagi":
    case "kurang":
    case "pasang":
      return { jenis: "angka", n: hasilBagi(l.n, l.g) };
    case "isi":
      return { jenis: "angka", n: hasilBagi(l.n, l.q) };
    case "balik":
      return { jenis: "angka", n: l.b };
    case "periksa":
      return { jenis: "nama", nama: periksaKali(l) };
    case "istilah":
      return { jenis: "nama", nama: l.sorot };
  }
}

/**
 * Apakah tugas langsung siap dijawab (tanpa kegiatan lebih dulu)? Kanvas dan suara: ya. Klik: bila tugas punya jawaban pilihan;
 * tugas lain memakai kegiatan. Tidak bergantung pada rupa, sehingga tombol tidak macet pada lambang.
 */
export function siapLangsung(l: Langkah, _rupa: Rupa, cara: Cara): boolean {
  if (cara !== "klik") return true;
  return kunciJawab(l, cara) !== null;
}

/** Pilihan nama di sekitar kunci, selalu memuat kunci. */
export function pilihanNamaDari(nama: Nama): Nama[] {
  if (nama === "cocok" || nama === "tidak") return ["cocok", "tidak"];
  return ["dibagi", "pembagi", "hasil"];
}
/** Pilihan angka (empat) selalu memuat kunci, urut naik. Angka satu sampai sembilan: dalam satu sampai sembilan; dua angka: kunci dan sekitarnya. */
export function pilihanAngka(n: number): number[] {
  if (n <= 9) {
    const kandidat = [n - 2, n - 1, n + 1, n + 2, n + 3, n - 3, n + 4].filter((x) => x >= 1 && x <= 9 && x !== n);
    return [n, ...kandidat.slice(0, 3)].sort((a, b) => a - b);
  }
  const kandidat = [n + 10, n - 10, n + 1, n - 1, n + 11, n - 11, n + 2, n - 2].filter((x) => x >= 10 && x <= 99 && x !== n);
  return [n, ...kandidat.slice(0, 3)].sort((a, b) => a - b);
}

/* ------------------------------ Kalimat ------------------------------ */
/** Kalimat yang menjelaskan jawaban benar (tanpa digit). */
export function kalimatKunci(l: Langkah, cara: Cara, rupa: Rupa = "benda"): string {
  void rupa;
  void cara;
  switch (l.tipe) {
    case "salah":
      return klaimBenar(l.klaim) ? `Jawaban ${l.tokoh} memang benar.` : `Jawaban ${l.tokoh} keliru.`;
    case "bagi":
      return `${kata(l.n)} dibagi ${kata(l.g)} sama dengan ${kata(hasilBagi(l.n, l.g))}, jadi tiap bagian berisi ${kata(hasilBagi(l.n, l.g))}.`;
    case "kurang":
      return `${kata(l.n)} dikurangi ${kata(l.g)} berulang sampai nol dilakukan ${kata(hasilBagi(l.n, l.g))} kali, jadi hasil baginya ${kata(hasilBagi(l.n, l.g))}.`;
    case "isi":
      return `${kata(l.n)} dibagi ${kata(l.q)} sama dengan ${kata(hasilBagi(l.n, l.q))}, jadi ada ${kata(hasilBagi(l.n, l.q))} bagian.`;
    case "pasang":
      return `${kata(l.g)} kali ${kata(hasilBagi(l.n, l.g))} sama dengan ${kata(l.n)}, jadi bilangan yang dicari adalah ${kata(hasilBagi(l.n, l.g))}.`;
    case "balik":
      return `${kata(l.a)} kali ${kata(l.b)} sama dengan ${kata(l.a * l.b)}, jadi ${kata(l.a * l.b)} dibagi ${kata(l.a)} sama dengan ${kata(l.b)}.`;
    case "periksa":
      return periksaKali(l) === "cocok"
        ? `${kata(l.g)} kali ${kata(l.dikira)} sama dengan ${kata(l.n)}, jadi hasil baginya cocok.`
        : `${kata(l.g)} kali ${kata(l.dikira)} sama dengan ${kata(l.g * l.dikira)}, bukan ${kata(l.n)}, jadi hasil baginya tidak cocok.`;
    case "istilah":
      return l.sorot === "dibagi"
        ? "Bilangan yang dibagi adalah jumlah seluruhnya, yang ditulis paling kiri."
        : l.sorot === "pembagi"
          ? "Pembagi adalah banyak bagian, atau bilangan yang dikurangkan berulang."
          : "Hasil bagi adalah isi tiap bagian, yang ditulis setelah tanda sama dengan.";
    case "deret":
      return `Hasil tiap pengurangan berturut-turut: ${deretNilai(l.n, l.g).map(kata).join(", ")}.`;
    case "urutlangkah":
      return "Urutannya: siapkan benda dan bagian, bagikan satu-satu, hitung isi tiap bagian, lalu periksa dengan kali.";
  }
}

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  const aksi = cara === "kanvas" ? "Tulis satu angka di kanvas." : cara === "suara" ? "Ucapkan satu bilangan." : "Pilih jawabannya.";
  const lihat = rupa === "benda" ? "Lihat benda di meja pesta." : rupa === "diagram" ? "Lihat diagram di kertas." : "Lihat tulisan di kartu.";
  switch (l.tipe) {
    case "salah":
      return `${l.tokoh} sudah menjawab tentang ${l.klaim.jenis === "hasil" ? "hasil bagi" : "periksa dengan kali"}. Apakah jawabannya benar? Pilih alasan yang tepat.`;
    case "bagi":
      return rupa === "lambang" ? `${lihat} Bilangan itu dibagi rata. Hasil baginya berapa? ${aksi}` : `${lihat} Semua benda dibagi rata ke tiap bagian. Satu bagian berisi berapa? ${aksi}`;
    case "kurang":
      return rupa === "lambang"
        ? `${lihat} Kurangi bilangan itu dengan pembagi berulang sampai nol. Berapa kali dikurangi? ${aksi}`
        : `${lihat} Kurangi jumlah benda dengan pembagi berulang sampai nol. Berapa kali dikurangi? ${aksi}`;
    case "isi":
      return rupa === "lambang"
        ? `${lihat} Bilangan yang dibagi dan hasil baginya sudah diketahui. Pembaginya berapa? ${aksi}`
        : `${lihat} Semua benda dibagi rata dan tiap bagian berisi sama banyak. Ada berapa bagian? ${aksi}`;
    case "pasang":
      return `${lihat} Pasangan perkalian: pembagi dikali berapa sama dengan jumlah seluruhnya? ${aksi}`;
    case "balik":
      return `${lihat} Dari perkalian itu cari pembagiannya. Hasil kali dibagi bilangan pertama, hasil baginya berapa? ${aksi}`;
    case "periksa":
      return cara === "suara"
        ? `${lihat} Periksa hasil bagi dengan perkalian. Cocok atau tidak cocok? Ucapkan cocok, atau tidak.`
        : `${lihat} Periksa hasil bagi dengan perkalian. Cocok atau tidak cocok? Pilih kata yang tepat.`;
    case "istilah":
      return cara === "suara"
        ? `${lihat} Bagian yang ditandai disebut apa? Ucapkan dibagi, pembagi, atau hasil.`
        : `${lihat} Bagian yang ditandai disebut apa? Pilih kata yang tepat.`;
    case "deret":
      return `${lihat} Kurangi berulang sampai nol. Ketuk hasil tiap pengurangan satu per satu, mulai dari yang pertama.`;
    case "urutlangkah":
      return "Susun langkah membagi rata. Ketuk langkah pertama sampai terakhir secara berurutan.";
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  if (cara === "kanvas") return "Tulis jawabannya sebagai satu angka.";
  if (cara === "suara") return l.tipe === "istilah" || l.tipe === "periksa" ? "Ucapkan satu kata." : "Ucapkan jawabannya.";
  return "Pilih jawaban yang tepat.";
}

/* ------------------------------ Petunjuk salah ------------------------------ */
/** Petunjuk saat ketukan pada tugas Deret atau Urut langkah belum benar. */
export function petunjukKetuk(l: LDeret | LUrutLangkah): string {
  return l.tipe === "deret"
    ? "Mulai dari hasil pengurangan pertama, lalu kurangi lagi dengan pembagi yang sama sampai nol."
    : "Mulai dari menyiapkan benda dan bagian, lalu membagikan satu-satu, menghitung isi tiap bagian, dan terakhir memeriksa dengan kali.";
}

/** Petunjuk saat jawaban angka atau kata salah: menunjuk kesalahannya (tanpa digit). `jawab`: kata yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number, rupa: Rupa = "benda"): string {
  void rupa;
  if (l.tipe === "salah") return `Lihat lagi. ${l.keliru}`;
  if (typeof jawab === "number") {
    const k = kunciJawab(l, cara);
    const kurang = k?.jenis === "angka" && jawab < k.n;
    const arah = kurang ? "Jawabanmu masih kurang." : "Jawabanmu terlalu banyak.";
    switch (l.tipe) {
      case "bagi":
        return `Bagikan benda satu-satu ke tiap bagian sampai habis, lalu hitung isi satu bagian. ${arah}`;
      case "kurang":
        return `Kurangi berulang sampai nol dan hitung berapa kali dikurangi. ${arah}`;
      case "isi":
        return `Bagi jumlah seluruhnya dengan isi tiap bagian, atau kurangi berulang. ${arah}`;
      case "pasang":
        return `Cari bilangan yang jika dikali pembagi hasilnya sama dengan jumlah seluruhnya. ${arah}`;
      case "balik":
        return `Perkalian dan pembagian berkaitan: bagi hasil kali dengan salah satu bilangannya. ${arah}`;
      default:
        return "Periksa lagi dengan teliti.";
    }
  }
  switch (l.tipe) {
    case "periksa":
      return "Kalikan hasil bagi dengan pembagi. Bila hasilnya sama dengan bilangan yang dibagi, hasil baginya cocok.";
    case "istilah":
      return "Bilangan yang dibagi adalah jumlah seluruhnya, pembagi adalah banyak bagian, dan hasil bagi adalah isi tiap bagian.";
    default:
      return "Periksa lagi dengan teliti.";
  }
}
