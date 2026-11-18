/**
 * Logika murni tahap Concrete, Pictorial, dan Abstract Kelas 2 Bab 5 Sub-Bab C "Panen Raya Pak Joko" (seperempat dari benda utuh): jenis tugas, kunci,
 * pilihan, instruksi (tanpa digit), dan petunjuk salah. Tanpa React dan tanpa jaringan, diuji di Node: scripts/uji-panen-k2b5c.mjs.
 * Jawaban bukan hanya angka: memilih pembagian yang adil, menarik dua garis, mewarnai seperempat, menyusun pita, mengurutkan langkah, memilih angka,
 * satu angka di kanvas, dan satu kata atau bilangan yang diucapkan (setengah, seperempat, utuh, sama besar, bukan, atau bilangan).
 * Luas bagian dihitung program dari geometri.ts, bukan kunci tetap.
 */
import type { Cara } from "../lemari-k1b1a/logika";
import { bagiBangun, empatSama, semuaSama, type Bangun, type Potong } from "./geometri";

export { IKON_CARA, NAMA_CARA, URUT_CARA, kata, type Cara } from "../lemari-k1b1a/logika";
import { kata } from "../lemari-k1b1a/logika";

export type Rupa = "benda" | "diagram" | "lambang";
export type Nama = "setengah" | "seperempat" | "utuh" | "sama besar" | "bukan";
export const URUT_NAMA: Nama[] = ["setengah", "seperempat", "utuh", "sama besar", "bukan"];

const kapital = (t: string): string => t.charAt(0).toUpperCase() + t.slice(1);

/* ------------------------------ Satuan pecahan ------------------------------ */
export type Satuan = "seperempat" | "setengah" | "utuh";
/** Panjang tiap satuan dalam satuan seperempat. */
export const UKURAN_SATUAN: Record<Satuan, number> = { seperempat: 1, setengah: 2, utuh: 4 };
/** Nama pita yang panjangnya `u` seperempat (hanya satu, dua, atau empat). */
export const namaSatuan = (u: number): Nama | null => (u === 1 ? "seperempat" : u === 2 ? "setengah" : u === 4 ? "utuh" : null);
/** Banyak pita `kecil` yang sama panjang dengan satu pita `besar`. */
export const rasio = (kecil: Satuan, besar: Satuan): number => UKURAN_SATUAN[besar] / UKURAN_SATUAN[kecil];
/** Banyak pita pada tiga baris dinding: utuh, setengah, seperempat. */
export const PITA_BARIS = [1, 2, 4] as const;
export const NAMA_BARIS = ["pertama", "kedua", "ketiga"] as const;

/* ------------------------------ Benda ------------------------------ */
/** Benda Concrete (beremoji) berbeda dari data Story (labu, petak tanah, kertas dan lingkaran di tanah, kupu-kupu). */
export const BENDA: Record<string, { nama: string; emoji: string; warna: string; bangun: Bangun }> = {
  pai: { nama: "pai apel", emoji: "\u{1F967}", warna: "#FDBA74", bangun: "lingkaran" },
  roti: { nama: "roti bundar", emoji: "\u{1F35E}", warna: "#FCD34D", bangun: "lingkaran" },
  kue: { nama: "kue lapis", emoji: "\u{1F370}", warna: "#FBCFE8", bangun: "persegi" },
  kertas: { nama: "kertas persegi", emoji: "\u{1F4C4}", warna: "#FEF9C3", bangun: "persegi" },
  taplak: { nama: "kain taplak", emoji: "\u{1F9F5}", warna: "#BAE6FD", bangun: "persegi" },
};

/* ------------------------------ Langkah ------------------------------ */
/** Metode IGIL "Setengah dari Setengah": hitungan dan kata. */
export type LHitung =
  | { tipe: "hitung"; jenis: "potong"; benda: string; n: number; p: 2 | 4 }
  | { tipe: "hitung"; jenis: "lipatan"; benda: string; n: number }
  | { tipe: "hitung"; jenis: "dinding"; baris: number[] }
  | { tipe: "hitung"; jenis: "sisa"; benda: string; berwarna: number }
  | { tipe: "hitung"; jenis: "fakta"; kecil: Satuan; besar: Satuan }
  | { tipe: "hitung"; jenis: "kali"; bagian: number };
/** Satu kata yang diucapkan. */
export type LNama =
  | { tipe: "nama"; jenis: "sebut"; benda: string; bangun: Bangun; potong: Potong[]; warna: number[] }
  | { tipe: "nama"; jenis: "adil"; benda: string; bangun: Bangun; potong: Potong[] }
  | { tipe: "nama"; jenis: "satuan"; n: number }
  | { tipe: "nama"; jenis: "setengahSetengah" }
  | { tipe: "nama"; jenis: "bagian"; n: number };
/** Pilih pembagian yang menghasilkan empat bagian sama besar dari beberapa gambar. */
export type LAdil = { tipe: "adil"; benda: string; bangun: Bangun; pilihan: Potong[][] };
/** Ketuk dua dari beberapa garis sampai terbentuk empat bagian sama besar. */
export type LGaris = { tipe: "garis"; benda: string; bangun: Bangun; kandidat: Potong[] };
/** Ketuk bagian sampai yang diwarnai tepat seperempat dari seluruhnya. */
export type LWarnai = { tipe: "warnai"; benda: string; bangun: Bangun; potong: Potong[] };
/** Susun pita seperempat (dan setengah bila `izinSetengah`) sampai sama panjang dengan pita `sasaran`. */
export type LSusun = { tipe: "susun"; sasaran: Satuan; izinSetengah: boolean };
/** Urutkan langkah; `langkah` ditulis dalam urutan yang benar, `petunjuk` menjelaskan kesalahan memilih langkah yang belum waktunya. */
export type LUrut = { tipe: "urut"; langkah: string[]; petunjuk: string[] };
/** Pilih angka. */
export type LPilih = { tipe: "pilih"; jenis: "fakta"; kecil: Satuan; besar: Satuan } | { tipe: "pilih"; jenis: "lipat"; kali: number };
export type LangkahDasar = LHitung | LNama | LAdil | LGaris | LWarnai | LSusun | LUrut | LPilih;
/** Klaim tokoh pada tugas Cari kesalahan: tentang gambar (apakah empat bagian sama besar) atau tentang kesetaraan pecahan. */
export type Klaim =
  | { jenis: "gambar"; benda: string; bangun: Bangun; potong: Potong[] }
  | { jenis: "fakta"; n: number; kecil: Satuan; besar: Satuan };
export type LangkahSalah = { tipe: "salah"; tokoh: string; klaim: Klaim; kataTokoh: string; alasan: [string, string, string]; benar: number; keliru: string };
export type Langkah = LangkahDasar | LangkahSalah;

export type Metode = "igil" | "belah" | "dinding" | "lipat";
export const URUT_METODE: Metode[] = ["igil", "belah", "dinding", "lipat"];
export const NAMA_METODE: Record<Metode, string> = {
  igil: "Metode IGIL: Setengah dari Setengah",
  belah: "Halving Twice: Belah Dua Kali",
  dinding: "Fraction Wall: Dinding Pecahan",
  lipat: "Fold and Shade: Lipat dan Warnai",
};
export const IKON_METODE: Record<Metode, string> = { igil: "\u{1F33F}", belah: "\u{1F52A}", dinding: "\u{1F9F1}", lipat: "\u{1F58C}" };

export type LangkahSoal = { metode: Metode; cara: Cara; judul: string; suara: string; langkah: Langkah };
export type SoalMisi = { nomor: number; judul: string; cerita: string; cara: Cara; langkah: LangkahSoal[] };

export const dasarDari = (l: Langkah): LangkahDasar | null => (l.tipe === "salah" ? null : l);

/* ------------------------------ Hitungan dari data ------------------------------ */
/** Bagian hasil pembagian suatu benda dengan garis tertentu. */
export const bagianDari = (bangun: Bangun, potong: readonly Potong[]) => bagiBangun(bangun, potong);
/** Apakah pembagian ini menghasilkan tepat empat bagian sama besar? */
export const adilEmpat = (bangun: Bangun, potong: readonly Potong[]): boolean => empatSama(bagiBangun(bangun, potong));
/** Jumlah luas bagian yang diwarnai (indeks bagian) dibanding seluruh bangun. */
export const luasWarna = (bangun: Bangun, potong: readonly Potong[], warna: readonly number[]): number => {
  const b = bagiBangun(bangun, potong);
  return Math.round(warna.reduce((s, i) => s + (b[i]?.luas ?? 0), 0) * 1e6) / 1e6;
};
/** Bagian berwarna sama dengan seperempat. */
export const seperempat = (bangun: Bangun, potong: readonly Potong[], warna: readonly number[]): boolean => Math.abs(luasWarna(bangun, potong, warna) - 0.25) < 1e-6;
/** Nama bagian pada gambar: setengah (dua bagian sama besar), seperempat (empat bagian sama besar), atau bukan. */
export function namaBagian(bangun: Bangun, potong: readonly Potong[]): Nama {
  const b = bagiBangun(bangun, potong);
  if (!semuaSama(b)) return "bukan";
  return b.length === 4 ? "seperempat" : b.length === 2 ? "setengah" : "bukan";
}
/** Pasangan garis yang diketuk membuat empat bagian sama besar? */
export const garisSah = (l: LGaris, i: number, j: number): boolean => i !== j && adilEmpat(l.bangun, [l.kandidat[i], l.kandidat[j]]);
/** Banyak pilihan yang adil (harus tepat satu). */
export const pilihanAdil = (l: LAdil): number[] => l.pilihan.map((p, i) => (adilEmpat(l.bangun, p) ? i : -1)).filter((i) => i >= 0);
/** Banyak bagian yang harus diwarnai agar sama dengan seperempat bila semua bagian sama besar (tepat). */
export const jumlahWarna = (l: LWarnai): number => {
  const b = bagiBangun(l.bangun, l.potong);
  return semuaSama(b) ? Math.round(0.25 / b[0].luas) : 0;
};
/** Klaim tokoh benar? */
export function klaimBenar(k: Klaim): boolean {
  if (k.jenis === "gambar") return adilEmpat(k.bangun, k.potong);
  return k.n === rasio(k.kecil, k.besar);
}
/** Urutan acak tetap (bukan urutan benar) untuk kartu langkah. */
export function urutanKartu(n: number): number[] {
  const dasar = Array.from({ length: n }, (_, i) => i);
  const geser = dasar.map((i) => (i * 2 + 1) % n);
  const unik = new Set(geser);
  const kandidat = unik.size === n ? geser : dasar.map((i) => (i + 2) % n);
  return kandidat.every((v, i) => v === i) ? dasar.map((i) => (i + 1) % n) : kandidat;
}

export type Kunci = { jenis: "angka"; n: number } | { jenis: "nama"; nama: Nama };

/** Banyak benda atau bilangan jawaban sebuah tugas hitung. */
export function nilaiHitung(l: LHitung): number {
  switch (l.jenis) {
    case "potong":
      return l.n * l.p;
    case "lipatan":
      return l.n * 2;
    case "dinding":
      return l.baris.reduce((s, b) => s + PITA_BARIS[b], 0);
    case "sisa":
      return 4 - l.berwarna;
    case "fakta":
      return rasio(l.kecil, l.besar);
    case "kali":
      return Math.round(Math.log2(l.bagian));
  }
}
/** Jawaban tugas Pilih. */
export const nilaiPilih = (l: LPilih): number => (l.jenis === "fakta" ? rasio(l.kecil, l.besar) : 2 ** l.kali);
/** Nama jawaban tugas Nama. */
export function namaKunci(l: LNama): Nama {
  switch (l.jenis) {
    case "sebut":
      return namaBagian(l.bangun, l.potong);
    case "adil":
      return semuaSama(bagiBangun(l.bangun, l.potong)) ? "sama besar" : "bukan";
    case "satuan":
      return namaSatuan(l.n) ?? "bukan";
    case "setengahSetengah":
      return namaSatuan(UKURAN_SATUAN.setengah / 2) ?? "bukan";
    case "bagian":
      return l.n === 4 ? "seperempat" : "bukan";
  }
}

/** Kunci tiap tugas menurut caranya, dihitung dari data. Null bila tugas selesai lewat kegiatan (mengetuk, menyusun, mengurutkan, memilih alasan). */
export function kunciJawab(l: Langkah, cara: Cara): Kunci | null {
  if (l.tipe === "salah") return null;
  if (l.tipe === "pilih") return cara === "klik" ? { jenis: "angka", n: nilaiPilih(l) } : null;
  if (l.tipe === "hitung") return cara === "klik" ? null : { jenis: "angka", n: nilaiHitung(l) };
  if (l.tipe === "nama") return cara === "suara" ? { jenis: "nama", nama: namaKunci(l) } : null;
  return null;
}

/**
 * Apakah tugas langsung siap dijawab (tanpa kegiatan lebih dulu)? Kanvas dan suara: ya (gambar sudah jadi). Klik: hanya tugas Pilih angka.
 * Tugas lain memakai kegiatan. Tidak bergantung pada rupa, sehingga tombol tidak macet pada lambang.
 */
export function siapLangsung(l: Langkah, _rupa: Rupa, cara: Cara): boolean {
  if (cara !== "klik") return true;
  return l.tipe === "pilih";
}

/** Pilihan nama di sekitar kunci (empat), selalu memuat kunci. */
export function pilihanNamaDari(nama: Nama): Nama[] {
  const grup: Nama[] = nama === "sama besar" || nama === "bukan" ? ["sama besar", "bukan", "setengah", "seperempat"] : ["setengah", "seperempat", "utuh", "bukan"];
  return grup.includes(nama) ? grup : [nama, ...grup.slice(0, 3)];
}
/** Pilihan angka di sekitar kunci (empat), selalu memuat kunci, urut naik. */
export function pilihanAngka(n: number): number[] {
  const kandidat = [n - 2, n - 1, n + 1, n + 2, n + 3, n - 3].filter((x) => x >= 1 && x <= 9 && x !== n);
  return [n, ...kandidat.slice(0, 3)].sort((a, b) => a - b);
}
export function pilihanDari(l: Langkah): number[] {
  const k = kunciJawab(l, "klik");
  return k?.jenis === "angka" ? pilihanAngka(k.n) : [];
}

/* ------------------------------ Kalimat ------------------------------ */
export const namaBenda = (kode: string): string => BENDA[kode]?.nama ?? kode;
const barisKata = (baris: number[]): string => {
  const n = baris.map((b) => NAMA_BARIS[b]);
  return n.length === 1 ? `baris ${n[0]}` : n.length === 2 ? `baris ${n[0]} dan baris ${n[1]}` : `baris ${n.slice(0, -1).join(", ")}, dan baris ${n[n.length - 1]}`;
};
const potongKata = (benda: string, rupa: Rupa): string => (rupa === "diagram" ? benda : namaBenda(benda));

/** Kalimat yang menjelaskan jawaban benar. */
export function kalimatKunci(l: Langkah, cara: Cara, rupa: Rupa = "benda"): string {
  switch (l.tipe) {
    case "salah":
      return klaimBenar(l.klaim) ? `Jawaban ${l.tokoh} memang benar.` : `Jawaban ${l.tokoh} keliru.`;
    case "adil":
      return `Dua garis yang saling tegak lurus membuat empat bagian sama besar, dan tiap bagian seperempat.`;
    case "garis":
      return `Dua garis yang saling tegak lurus lewat titik tengah membuat empat bagian sama besar.`;
    case "warnai":
      return `Bagian yang diwarnai tepat satu dari empat bagian sama besar, jadi seperempat.`;
    case "susun":
      return l.sasaran === "setengah" ? "Dua pita seperempat sama panjang dengan satu pita setengah." : "Empat pita seperempat, atau dua pita setengah, sama panjang dengan satu pita utuh.";
    case "urut":
      return "Membagi dua kali: bagi dua sama besar, lalu bagi tiap bagian menjadi dua lagi, dan periksa keempat bagian.";
    case "pilih":
      return l.jenis === "fakta" ? `${kapital(kata(rasio(l.kecil, l.besar)))} ${l.kecil} sama dengan satu ${l.besar}.` : `Dilipat ${kata(l.kali)} kali menghasilkan ${kata(2 ** l.kali)} bagian sama besar.`;
    case "hitung": {
      const n = kata(nilaiHitung(l));
      switch (l.jenis) {
        case "potong":
          return `${kapital(kata(l.n))} ${potongKata(l.benda, rupa)}, tiap-tiapnya ${kata(l.p)} potong, jadi ada ${n} potong.`;
        case "lipatan":
          return `Tiap ${potongKata(l.benda, rupa)} dilipat dua kali, jadi ada ${n} lipatan.`;
        case "dinding":
          return `Pita di ${barisKata(l.baris)} ada ${n} semuanya.`;
        case "sisa":
          return `Empat bagian dikurangi ${kata(l.berwarna)} yang diwarnai, sisanya ${n} bagian.`;
        case "fakta":
          return `${kapital(n)} ${l.kecil} sama dengan satu ${l.besar}.`;
        case "kali":
          return `Membagi dua sebanyak ${n} kali menghasilkan ${kata(l.bagian)} bagian sama besar.`;
      }
      return "";
    }
    case "nama": {
      const nm = namaKunci(l);
      if (l.jenis === "sebut") return nm === "seperempat" ? "Ada empat bagian sama besar, jadi satu bagian disebut seperempat." : "Ada dua bagian sama besar, jadi satu bagian disebut setengah.";
      if (l.jenis === "adil") return nm === "sama besar" ? "Semua bagian sama besar." : "Bagian-bagiannya tidak sama besar.";
      if (l.jenis === "satuan") return rupa === "lambang" ? `${kapital(kata(l.n))} seperempat sama dengan satu ${nm}.` : `${kapital(kata(l.n))} pita seperempat sama panjang dengan satu pita ${nm}.`;
      if (l.jenis === "setengahSetengah") return "Setengah dari setengah disebut seperempat.";
      return nm === "seperempat" ? "Empat bagian sama besar, jadi tiap bagian seperempat." : "Hanya empat bagian sama besar yang disebut seperempat.";
    }
  }
  return cara === "klik" ? "" : "";
}

const frasaPotongan = (n: number): string => `${kata(n)} bagian`;

/** Instruksi satu tugas (suara dan judul), tanpa digit. */
export function instruksi(l: Langkah, rupa: Rupa, cara: Cara): string {
  const aksi = cara === "kanvas" ? "Tulis satu angka di kanvas." : cara === "suara" ? "Ucapkan satu bilangan." : "Pilih jawabannya.";
  switch (l.tipe) {
    case "salah":
      return `${l.tokoh} sudah menjawab tentang ${l.klaim.jenis === "gambar" ? potongKata(l.klaim.benda, rupa) : "pecahan"}. Apakah jawabannya benar? Pilih alasan yang tepat.`;
    case "adil":
      return `Pilih pembagian ${rupa === "diagram" ? "bangun" : namaBenda(l.benda)} yang menghasilkan empat bagian sama besar.`;
    case "garis":
      return `${rupa === "diagram" ? "Bangun" : kapital(namaBenda(l.benda))} akan dibagi dengan dua garis. Ketuk dua garis yang membuat empat bagian sama besar.`;
    case "warnai":
      return `${rupa === "diagram" ? "Bangun" : kapital(namaBenda(l.benda))} sudah dibagi. Ketuk bagiannya sampai yang diwarnai tepat seperempat dari seluruhnya, lalu tekan Periksa.`;
    case "susun":
      return l.izinSetengah
        ? "Susun pita sampai panjangnya sama dengan satu pita utuh. Boleh memakai pita seperempat dan pita setengah."
        : `Susun pita seperempat sampai panjangnya sama dengan satu pita ${l.sasaran}. Ketuk pita seperempat sebanyak yang diperlukan.`;
    case "urut":
      return "Urutkan langkah membagi satu benda menjadi empat bagian sama besar dengan membelah dua kali. Ketuk langkah dari yang paling awal.";
    case "pilih":
      return l.jenis === "fakta"
        ? `Berapa ${rupa === "lambang" ? "" : "pita "}${l.kecil} sama ${rupa === "lambang" ? "dengan" : "panjang dengan"} satu ${rupa === "lambang" ? "" : "pita "}${l.besar}? ${aksi}`
        : `Selembar kertas dilipat ${kata(l.kali)} kali, lalu dibuka. Berapa bagian sama besar yang terbentuk? ${aksi}`;
    case "hitung": {
      switch (l.jenis) {
        case "potong":
          return `Ada ${kata(l.n)} ${potongKata(l.benda, rupa)}. Tiap-tiapnya dibagi menjadi ${frasaPotongan(l.p)} sama besar. Berapa potong semuanya? ${aksi}`;
        case "lipatan":
          return `Ada ${kata(l.n)} ${potongKata(l.benda, rupa)}. Tiap-tiapnya dilipat dua kali. Berapa lipatan semuanya? ${aksi}`;
        case "dinding":
          return `Dinding pita: baris pertama satu pita utuh, baris kedua dua pita setengah, baris ketiga empat pita seperempat. Hitung semua pita di ${barisKata(l.baris)} bersama-sama. ${aksi}`;
        case "sisa":
          return `${rupa === "diagram" ? "Bangun" : kapital(namaBenda(l.benda))} dibagi menjadi empat bagian sama besar, dan ${kata(l.berwarna)} bagian diwarnai. Berapa bagian yang belum diwarnai? ${aksi}`;
        case "fakta":
          return `Berapa ${l.kecil} sama dengan satu ${l.besar}? ${aksi}`;
        case "kali":
          return `Seperempat adalah setengah dari setengah. Berapa kali kita membagi dua supaya terbentuk ${frasaPotongan(l.bagian)} sama besar? ${aksi}`;
      }
      return "";
    }
    case "nama":
      switch (l.jenis) {
        case "sebut":
          return `Satu bagian ${potongKata(l.benda, rupa)} diwarnai. Bagian berwarna itu disebut apa? Ucapkan satu kata: setengah atau seperempat.`;
        case "adil":
          return `Lihat semua bagian ${potongKata(l.benda, rupa)} itu. Apakah semuanya sama besar? Ucapkan sama besar, atau bukan.`;
        case "satuan":
          return rupa === "lambang"
            ? `${kapital(kata(l.n))} seperempat sama dengan satu apa? Ucapkan satu kata.`
            : `Susun ${kata(l.n)} pita seperempat berderet. Panjangnya sama dengan satu pita apa? Ucapkan satu kata.`;
        case "setengahSetengah":
          return "Setengah dari setengah disebut apa? Ucapkan satu kata.";
        case "bagian":
          return `Ada ${frasaPotongan(l.n)} sama besar. Apakah tiap bagian disebut seperempat? Ucapkan seperempat, atau bukan.`;
      }
      return "";
  }
}

/** Pertanyaan di atas pilihan atau jawaban (tanpa digit). */
export function kalimatTanya(l: Langkah, cara: Cara): string {
  if (cara === "kanvas") return "Tulis jawabannya sebagai satu angka.";
  if (cara === "suara") return l.tipe === "hitung" ? "Ucapkan jawabannya." : "Ucapkan satu kata.";
  return "Pilih jawaban yang tepat.";
}

/* ------------------------------ Petunjuk salah ------------------------------ */
/** Petunjuk saat pembagian yang dipilih atau dua garis yang diketuk tidak membuat empat bagian sama besar. */
export function petunjukBagi(bangun: Bangun, potong: readonly Potong[]): string {
  const b = bagiBangun(bangun, potong);
  if (b.length !== 4) return `Pembagian itu menghasilkan ${kata(b.length)} bagian, padahal kita perlu empat bagian.`;
  return "Keempat bagiannya tidak sama besar: ada yang lebih besar dan ada yang lebih kecil. Dua garis harus saling tegak lurus.";
}
/** Petunjuk saat Periksa pada tugas Warnai keliru. */
export function petunjukWarnai(l: LWarnai, warna: readonly number[]): string {
  if (warna.length === 0) return "Belum ada bagian yang diwarnai. Ketuk bagian gambar dulu.";
  const w = luasWarna(l.bangun, l.potong, warna);
  const bagian = bagiBangun(l.bangun, l.potong);
  if (!semuaSama(bagian)) return "Bagian-bagian gambar tidak sama besar. Seperempat berarti satu dari empat bagian yang sama besar, jadi ukuran bagian harus diperhatikan.";
  if (w > 0.25 + 1e-6) return "Bagian yang diwarnai terlalu banyak. Seperempat hanya satu dari empat bagian sama besar.";
  return "Bagian yang diwarnai masih terlalu sedikit. Tambah bagian sampai tepat satu dari empat bagian sama besar.";
}
/** Petunjuk saat pita yang disusun belum sama panjang dengan sasaran. */
export function petunjukSusun(l: LSusun, jumlah: number): string {
  const sasaran = UKURAN_SATUAN[l.sasaran];
  if (jumlah === 0) return "Belum ada pita. Ketuk pita seperempat dulu.";
  if (jumlah < sasaran) return `Pita yang disusun masih lebih pendek daripada pita ${l.sasaran}. Tambah pita.`;
  return `Pita yang disusun lebih panjang daripada pita ${l.sasaran}. Ulangi dari awal.`;
}
/** Petunjuk saat langkah yang diketuk belum waktunya. */
export const petunjukUrut = (l: LUrut, ketuk: number): string => l.petunjuk[ketuk] ?? "Itu belum waktunya. Pikirkan langkah yang paling awal.";

/** Petunjuk saat jawaban angka atau kata salah: menunjuk kesalahannya (tanpa digit). `jawab`: kata yang dipilih atau diucapkan, atau angka yang ditulis. */
export function petunjukSalah(l: Langkah, cara: Cara, jawab: string | number, rupa: Rupa = "benda"): string {
  void rupa;
  if (l.tipe === "salah") return `Lihat lagi. ${l.keliru}`;
  if (typeof jawab === "number") {
    const k = kunciJawab(l, cara);
    const kurang = k?.jenis === "angka" && jawab < k.n;
    if (l.tipe === "pilih")
      return l.jenis === "fakta"
        ? `Satu ${l.besar} dipecah menjadi pita ${l.kecil} yang sama panjang. ${kurang ? "Hitungannya masih kurang." : "Hitungannya terlalu banyak."} Bandingkan panjang pita.`
        : `Tiap lipatan membagi dua semua bagian yang sudah ada. ${kurang ? "Hitungannya masih kurang." : "Hitungannya terlalu banyak."}`;
    if (l.tipe === "hitung")
      switch (l.jenis) {
        case "potong":
          return `Hitung banyak potong tiap benda dulu, lalu ulangi sebanyak bendanya. ${kurang ? "Jawabanmu masih terlalu sedikit." : "Jawabanmu terlalu banyak."}`;
        case "lipatan":
          return "Tiap benda dilipat dua kali. Hitung lipatan satu benda, lalu ulangi untuk benda berikutnya.";
        case "dinding":
          return "Hitung pita satu baris dulu, lalu jumlahkan baris yang ditanyakan saja, tidak termasuk baris lain.";
        case "sisa":
          return "Seluruh bagian ada empat. Kurangi dengan bagian yang sudah diwarnai.";
        case "fakta":
          return `Bandingkan panjang pita ${l.kecil} dengan satu pita ${l.besar}: berapa pita ${l.kecil} yang diperlukan?`;
        case "kali":
          return "Tiap kali membagi dua, banyak bagian menjadi dua kali lipat: satu, dua, empat.";
      }
    return "Periksa lagi gambarnya dengan teliti.";
  }
  if (l.tipe === "nama") {
    const nm = namaKunci(l);
    if (jawab === "setengah" && nm === "seperempat") return "Ada empat bagian sama besar, jadi tiap bagian seperempat, bukan setengah.";
    if (jawab === "seperempat" && nm === "setengah") return "Hanya ada dua bagian sama besar, jadi tiap bagian setengah, bukan seperempat.";
    if (jawab === "seperempat" && nm === "bukan") return "Bagian-bagiannya belum empat bagian sama besar, jadi belum bisa disebut seperempat.";
    if (nm === "bukan") return "Periksa ukuran bagian-bagiannya. Bila tidak sama besar, jawabannya bukan.";
    if (nm === "sama besar") return "Semua bagian sama besar. Bandingkan ukuran bagian satu per satu.";
    if (l.jenis === "satuan") return "Bandingkan panjang pita-pita seperempat dengan pita setengah dan pita utuh.";
    return "Periksa lagi gambarnya: ada berapa bagian, dan apakah semuanya sama besar?";
  }
  return "Periksa lagi dengan teliti.";
}
